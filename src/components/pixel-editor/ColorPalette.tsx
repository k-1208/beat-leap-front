
import React from 'react';
import { COLORS, ERASER_COLOR } from '@/lib/pixel-editor/constants';

interface ColorPaletteProps {
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ selectedColor, onColorSelect }) => {
  return (
    <div className="bg-black bg-opacity-30 p-4 rounded-lg flex flex-col gap-4">
        <p className="text-xl text-center text-gray-300">Tools</p>
        <div className="grid grid-cols-3 gap-3">
            {COLORS.map((color) => (
                <button
                    key={color}
                    onClick={() => onColorSelect(color)}
                    className={`w-12 h-12 rounded-full border-2 transition-transform duration-150 transform hover:scale-110 ${
                        selectedColor === color ? 'ring-2 ring-offset-2 ring-offset-[#F18774] ring-white scale-110' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color }}
                    aria-label={`Select color ${color}`}
                />
            ))}
        </div>
        <button
            onClick={() => onColorSelect(ERASER_COLOR)}
            className={`w-full mt-2 flex items-center justify-center gap-2 p-2 rounded-lg text-white transition-colors duration-200 text-lg ${
                selectedColor === ERASER_COLOR ? 'bg-[#EC5E46]' : 'bg-gray-600 hover:bg-gray-500'
            }`}
            aria-label="Select eraser"
        >
            <span>Eraser</span>
        </button>
    </div>
  );
};

export default ColorPalette;