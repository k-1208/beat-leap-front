"use client";

import React, { useState, useCallback, useRef } from "react";
import { GRID_SIZE, COLORS, ERASER_COLOR } from "@/lib/pixel-editor/constants";
import type { PixelGridType } from "@/lib/pixel-editor/types";

import Header from "./Header";
import Stats from "./Stats";
import ColorPalette from "./ColorPalette";
import PixelGrid from "./PixelGrid";


const createEmptyGrid = (): PixelGridType => {
  return Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(null));
};

// --- Image Processing Helpers ---

// Helper to convert an RGB color component to its 2-digit hex representation
const componentToHex = (c: number): string => {
  const hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
};

// Helper to convert an RGB color to its hex string representation
const rgbToHex = (r: number, g: number, b: number): string => {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};

const UploadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M11 15V9.414l-2.293 2.293-1.414-1.414L12 5.586l4.707 4.707-1.414 1.414L13 9.414V15h-2Z"/>
        <path d="M4 14v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4h-2v4H6v-4H4Z"/>
    </svg>
);
UploadIcon.displayName = 'UploadIcon';


const App: React.FC = () => {
  const [grid, setGrid] = useState<PixelGridType>(createEmptyGrid);
  const [selectedColor, setSelectedColor] = useState<string>(COLORS[0]);
  const [pixelsEdited, setPixelsEdited] = useState<number>(0);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [originalImageGrid, setOriginalImageGrid] = useState<PixelGridType | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State for the custom password prompt
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');


  const handlePixelChange = useCallback((row: number, col: number) => {
    const isErasing = selectedColor === ERASER_COLOR;

    const newColor = isErasing
      ? (originalImageGrid ? originalImageGrid[row][col] : null)
      : selectedColor;

    const oldColor = grid[row][col];
    if (oldColor === newColor) {
      return;
    }

    const newGrid = grid.map((r, rowIndex) =>
      r.map((c, colIndex) => {
        if (rowIndex === row && colIndex === col) {
          return newColor;
        }
        return c;
      })
    );
    setGrid(newGrid);

    const originalColor = originalImageGrid ? originalImageGrid[row][col] : null;

    const wasEditedByUser = oldColor !== originalColor;
    const isNowEditedByUser = newColor !== originalColor;

    if (!wasEditedByUser && isNowEditedByUser) {
      setPixelsEdited((prev) => prev + 1);
    } else if (wasEditedByUser && !isNowEditedByUser) {
      setPixelsEdited((prev) => Math.max(0, prev - 1));
    }
  }, [grid, selectedColor, originalImageGrid]);

  const resetGrid = () => {
    if (isImageUploaded && originalImageGrid) {
      setGrid(originalImageGrid);
      setPixelsEdited(0);
    } else {
      setGrid(createEmptyGrid());
      setPixelsEdited(0);
      setOriginalImageGrid(null);
      setIsImageUploaded(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = GRID_SIZE;
            canvas.height = GRID_SIZE;
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            if (!ctx) return;

            ctx.drawImage(img, 0, 0, GRID_SIZE, GRID_SIZE);
            const imageData = ctx.getImageData(0, 0, GRID_SIZE, GRID_SIZE);
            const data = imageData.data;
            const newGrid: PixelGridType = createEmptyGrid();

            for (let y = 0; y < GRID_SIZE; y++) {
                for (let x = 0; x < GRID_SIZE; x++) {
                    const index = (y * GRID_SIZE + x) * 4;
                    const r = data[index];
                    const g = data[index + 1];
                    const b = data[index + 2];
                    const a = data[index + 3];

                    if (a < 128 || (r > 250 && g > 250 && b > 250)) {
                        newGrid[y][x] = null;
                    } else {
                        newGrid[y][x] = rgbToHex(r, g, b);
                    }
                }
            }
            setGrid(newGrid);
            setOriginalImageGrid(newGrid);
            setPixelsEdited(0);
            setIsImageUploaded(true);
        };
        img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);

    if(event.target) {
      event.target.value = '';
    }
  };

  const handleUploadClick = () => {
    if (isImageUploaded) {
      setPasswordError(''); // Clear previous errors
      setShowPasswordPrompt(true);
    } else {
      fileInputRef.current?.click();
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'vibecodingsudeep') {
      setShowPasswordPrompt(false);
      setPasswordInput('');
      setPasswordError('');
      fileInputRef.current?.click();
    } else {
      setPasswordError('Incorrect password. Please try again.');
      setPasswordInput('');
    }
  };

  const handlePasswordCancel = () => {
    setShowPasswordPrompt(false);
    setPasswordInput('');
    setPasswordError('');
  };

  const handleDownload = () => {
    const downloadSize = 1000;
    const scale = downloadSize / GRID_SIZE;
    const canvas = document.createElement('canvas');
    canvas.width = downloadSize;
    canvas.height = downloadSize;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Disable image smoothing to keep the pixels sharp
    ctx.imageSmoothingEnabled = false;

    // JPG doesn't support transparency, so set a background color
    ctx.fillStyle = '#21142F';
    ctx.fillRect(0, 0, downloadSize, downloadSize);

    grid.forEach((row, y) => {
        row.forEach((color, x) => {
            if (color) {
                ctx.fillStyle = color;
                ctx.fillRect(x * scale, y * scale, scale, scale);
            }
        });
    });

    const link = document.createElement('a');
    link.download = 'pixel-art.jpg';
    link.href = canvas.toDataURL('image/jpeg', 0.9);
    link.click();
  };

  return (
    <div className="w-full text-white flex flex-col items-center p-4 gap-6 ...">
      <main className="flex flex-col items-center gap-6 w-full">

        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start ">
          <div>
            <PixelGrid grid={grid} onPixelChange={handlePixelChange} />
          </div>
          <div className="flex flex-col gap-4 w-full max-w-xs sm:max-w-none sm:w-auto">
             <ColorPalette
              selectedColor={selectedColor}
              onColorSelect={setSelectedColor}
            />
            <Stats count={pixelsEdited} />
             <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              onClick={handleUploadClick}
              className="w-full bg-[#9839B1] hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 text-lg"
              aria-label="Upload an image"
            >
              <UploadIcon className="w-6 h-6" />
              <span>Upload Image</span>
            </button>
            <button
              onClick={handleDownload}
              className="w-full bg-[#11AC7B] hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 text-lg"
            >
              Download JPG
            </button>
            <button
              onClick={resetGrid}
              className="w-full bg-[#EC5E46] hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 text-lg"
            >
              Reset Canvas
            </button>
          </div>
        </div>
      </main>

      {showPasswordPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true" aria-labelledby="password-dialog-title">
          <form onSubmit={handlePasswordSubmit} className="bg-[#21142F] border border-[#9839B1] p-8 rounded-lg shadow-2xl shadow-[#9839B1]/50 flex flex-col gap-4 w-full max-w-sm">
            <h2 id="password-dialog-title" className="text-2xl font-bold text-center text-white">Admin Password Required</h2>
            <p className="text-center text-gray-300 -mt-2">Enter the password to upload a new base image.</p>
            <div className="relative">
                <label htmlFor="password-input" className="sr-only">Password</label>
                <input
                    id="password-input"
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className={`w-full bg-black bg-opacity-30 border ${passwordError ? 'border-red-500' : 'border-transparent focus:border-[#9839B1]'} focus:ring-0 text-white p-2 rounded-lg text-lg text-center transition-all`}
                    placeholder="Password aata bhi hain tujhe idiot?"
                    autoFocus
                    aria-describedby={passwordError ? "password-error" : undefined}
                    aria-invalid={!!passwordError}
                />
                {passwordError && <p id="password-error" className="text-red-500 text-center mt-2 text-sm">{passwordError}</p>}
            </div>
            <div className="flex gap-4 mt-2">
                <button
                type="button"
                onClick={handlePasswordCancel}
                className="w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 text-lg"
                >
                Cancel
                </button>
                <button
                type="submit"
                className="w-full bg-[#9839B1] hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 text-lg"
                >
                Submit
                </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default App;
