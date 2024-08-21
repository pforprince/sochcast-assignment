import { FC } from "react";

type RangeInputProps = {
  value: number;
  onChange: (value: number) => void;
  max: number;
  className?: string;
};

const RangeInput: FC<RangeInputProps> = ({
  value,
  onChange,
  max,
  className = "",
}) => {
  return (
    <input
      value={value}
      max={max}
      onChange={(e) => onChange(+e.target.value)}
      type="range"
      step="0.01"
      className={`w-full hidden mb-3 lg:block accent-primary h-1 outline-none bg-gray-100 rounded-lg cursor-pointer ${className}`}
    />
  );
};

export default RangeInput;
