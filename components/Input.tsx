import React from "react";

type InputProps = {
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

const Input:React.FC<InputProps> = ({ placeholder, value, onChange, type }) => {
  return (
    <input
      className="w-[596px] h-[90px] text-[40px] px-5 rounded-[18px]"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
