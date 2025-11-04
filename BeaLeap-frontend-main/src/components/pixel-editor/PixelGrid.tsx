import React, { useState } from 'react';
import type { PixelGridType } from '@/lib/pixel-editor/types';
import { GRID_SIZE } from '@/lib/pixel-editor/constants';

interface PixelGridProps {
  grid: PixelGridType;
  onPixelChange: (row: number, col: number) => void;
}

interface PixelProps {
    color: string | null;
    onMouseDown: () => void;
    onMouseEnter: () => void;
}

const Pixel: React.FC<PixelProps> = React.memo(({ color, onMouseDown, onMouseEnter }) => {
    return (
        <div
            onMouseDown={onMouseDown}
            onMouseEnter={onMouseEnter}
            className="aspect-square"
            style={{ 
                backgroundColor: color || 'transparent',
                boxShadow: 'inset 0 0 0 0.5px rgba(152, 57, 177, 0.25)',
             }}
        />
    );
});
Pixel.displayName = 'Pixel';

const PixelGrid: React.FC<PixelGridProps> = ({ grid, onPixelChange }) => {
  const [isDrawing, setIsDrawing] = useState(false);

  const handleGridMouseUp = () => {
    setIsDrawing(false);
  };
  
  const handleGridMouseLeave = () => {
    setIsDrawing(false);
  };

  return (
    <div className="w-[90vw] h-[90vw] max-w-[500px] max-h-[500px] md:w-[500px] md:h-[500px]">
        <div
            className="w-full h-full p-3.5 bg-[#EC5E46]"
            style={{ 
                boxShadow: '0 0 30px -8px #EC5E46, 0 0 25px -8px #EC5E46',
            }}
        >
            <div
                className="w-full h-full p-1 bg-[#9839B1]"
                style={{
                    boxShadow: '0 0 8px #9839B1, inset 0 0 8px #9839B1',
                }}
            >
                <div
                  className="grid h-full touch-none bg-black bg-opacity-40 cursor-crosshair"
                  style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
                  onMouseUp={handleGridMouseUp}
                  onMouseLeave={handleGridMouseLeave}
                  onDragStart={(e) => e.preventDefault()}
                >
                  {grid.map((row, rowIndex) =>
                    row.map((color, colIndex) => (
                      <Pixel
                        key={`${rowIndex}-${colIndex}`}
                        color={color}
                        onMouseDown={() => {
                            setIsDrawing(true);
                            onPixelChange(rowIndex, colIndex);
                        }}
                        onMouseEnter={() => {
                            if (isDrawing) {
                                onPixelChange(rowIndex, colIndex);
                            }
                        }}
                      />
                    ))
                  )}
                </div>
            </div>
        </div>
    </div>
  );
};

export default PixelGrid;