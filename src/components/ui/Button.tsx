import React from "react";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "outline";
}) => {
  const base = "px-4 py-2 rounded font-medium transition duration-200";
  const variants = {
    primary: "bg-[#3277ee] text-white hover:bg-blue-600",
    secondary: "bg-gray-100 text-black hover:bg-gray-200",
    outline: "border border-gray-400 text-gray-700 hover:bg-gray-100",
  };

  return (
    <button onClick={onClick} type={type} className={`${base} ${variants[variant]}`}>
      {children}
    </button>
  );
};

export default Button;
