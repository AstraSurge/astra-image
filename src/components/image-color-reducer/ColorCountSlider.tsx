import React from "react";
import * as Slider from "@radix-ui/react-slider";

type ColorCountSliderProps = {
  value: number;
  onChange: (value: number) => void;
};

const ColorCountSlider: React.FC<ColorCountSliderProps> = (props) => {
  const { value, onChange } = props;
  return (
    <>
      <span className="text-2xl font-bold text-violet-200 md:text-3xl">
        Current Color Count: <span className="font-extrabold">{value}</span>
      </span>
      <form>
        <Slider.Root
          className="center relative flex h-8 w-full touch-none select-none items-center"
          value={[value]}
          onValueChange={(changedValue) => onChange(changedValue[0] || 1)}
          defaultValue={[32]}
          max={100}
          step={1}
          aria-label="Color Count"
        >
          <Slider.Track className="relative h-2 flex-grow rounded-[9999px] bg-violet-950">
            <Slider.Range className="absolute h-full rounded-[9999px] bg-white" />
          </Slider.Track>
          <Slider.Thumb
            className="block h-8 w-8 rounded-2xl bg-white"
            aria-label="Color Count handler"
          />
        </Slider.Root>
      </form>
    </>
  );
};

export default ColorCountSlider;
