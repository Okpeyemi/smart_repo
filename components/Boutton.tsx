import React from "react";

type BouttonProps = {
  text: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const Boutton: React.FC<BouttonProps> = ({ text, className, onClick }) => {
  return (
    <div
      className={`${className} flex items-center justify-center px-5 py-3 w-[596px] h-[90px] text-white text-[40px] font-bold rounded-[18px]`}
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export default Boutton;
