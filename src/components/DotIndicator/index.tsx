import React from "react";

type DotIndicatorProps = {
  steps: number;
  current: number;
  onClick?: (index: number) => void;
};

const DotIndicator = ({ steps, current, onClick }: DotIndicatorProps) => {
  return (
    <div className="flex justify-center gap-3">
      {Array.from({ length: steps }, (_, index) => (
        <button
          key={index}
          onClick={() => onClick && onClick(index)}
          className={`w-[10px] h-[10px] rounded-full transition ${
            index === current
              ? "bg-text-300"
              : "bg-text-300/20 hover:bg-text-300/40"
          }`}
          aria-label={`Go to page ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default DotIndicator;
