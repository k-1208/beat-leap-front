import { RotateCcw } from "lucide-react";
import { useState, useEffect } from "react";

export default function Hyperparameter({
  value,
  setValue,
  title,
  default_value,
  step = 1,
  min,
  max,
}: {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  title: string;
  default_value: number;
  step?: number;
  min: number;
  max: number;
}) {
  const [isRandomized, setIsRandomized] = useState(title === "Seed");

  useEffect(() => {
    if (value != 0) setIsRandomized(false);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsRandomized(false);
    setValue(parseFloat(e.target.value ? e.target.value : "0"));
  };

  const handleCheckboxChange = () => {
    setIsRandomized(!isRandomized);
    if (!isRandomized) {
      setValue(0);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 rounded-lg">
      <div className="flex flex-row items-center gap-2 w-full">
        <div className="px-4 py-2 w-full bg-neutral-800/80 rounded-lg">
          <input
            type="range"
            min={min}
            max={max}
            value={
              isRandomized
                ? 0
                : value <= max
                ? value >= min
                  ? value
                  : min
                : max
            }
            id={title}
            step={step}
            onChange={handleChange}
            className="w-full py-1 appearance-none h-3 bg-neutral-800/80 rounded-lg overflow-hidden"
          />
        </div>
        <p className="bg-emerald-400 text-black px-4 py-2 rounded-lg font-bold text-center min-w-32">
          {title}
        </p>
      </div>
      <div
        className={
          "flex flex-row items-center gap-1 w-full" +
          (title === "Seed" ? " justify-between" : " justify-end")
        }
      >
        {title === "Seed" && (
          <div className="flex flex-row items-center gap-1">
            <input
              type="checkbox"
              checked={isRandomized}
              onChange={handleCheckboxChange}
            />
            <span>Randomize seed</span>
          </div>
        )}
        <div className="flex flex-row items-center gap-1">
          <input
            type="number"
            value={isRandomized ? 0 : value}
            onChange={handleChange}
            min={min}
            max={max}
            step={step}
            placeholder={`Enter ${title}`}
            className="bg-gray-200 text-black px-2 py-1 rounded-lg w-36 text-center"
          />
          <button
            onClick={() => {
              setIsRandomized(title === "Seed");
              setValue(default_value);
            }}
            className="bg-gray-300 p-1 rounded-lg"
          >
            <RotateCcw className="text-neutral-800/80" />
          </button>
        </div>
      </div>
    </div>
  );
}
