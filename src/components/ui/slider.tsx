import * as React from "react";

interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  className?: string;
  label?: string;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      min = 0,
      max = 100,
      step = 1,
      value,
      defaultValue,
      onChange,
      className = "",
      label,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(
      defaultValue ?? min
    );

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(event.target.value);
      setInternalValue(newValue);
      onChange?.(newValue);
    };

    const percentage = (((value ?? internalValue) - min) / (max - min)) * 100;

    return (
      <div className="relative w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <div className="relative w-full h-6 flex items-center">
          <input
            type="range"
            ref={ref}
            min={min}
            max={max}
            step={step}
            value={value ?? internalValue}
            onChange={handleChange}
            className={`
            w-full h-2 rounded-full appearance-none bg-gray-200 
            focus:outline-none focus:ring-2 focus:ring-blue-500
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:w-4
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-blue-600
            [&::-webkit-slider-thumb]:cursor-pointer
            ${className}
          `}
            {...props}
          />
          <div
            className="absolute pointer-events-none h-2 bg-blue-600 rounded-l-full"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="mt-1 flex justify-between text-xs text-gray-500">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </div>
    );
  }
);

Slider.displayName = "Slider";

export { Slider };
