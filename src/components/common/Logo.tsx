// our company's log
import React from "react";

type LogoProps = {
  className?: string;
};

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <svg
      width="491"
      height="495"
      viewBox="0 0 491 495"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M441 251L491 149.259L327.166 259.839L358.23 333.229L401.5 351.5L312 494.5L487 333.229L386.788 287.608L441 251Z"
        fill="#323031"
      />
      <path
        d="M226.962 0L0 323.311L57.6173 408.602L250.649 300.005L96.1959 323.311L207.5 163L250.649 300.005L312 494.5L358.23 333.229L327.166 259.839L226.962 0Z"
        fill="#E71D36"
      />
    </svg>
  );
};

export default Logo;
