import Link from "next/link";
import React, { AnchorHTMLAttributes } from "react";
import Button from "../button/page";

type PixelButtonProps = {
  children: React.ReactNode; //for the name
  href?: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
  size?: "sm" | "md" | "lg";
};

export default function PixelButton({
  children,
  href,
  className = "",
  variant = "primary",
  size = "md",
  ...props
}: PixelButtonProps) {
  //This will be the base class for button
  const baseClass =
    "cursor-pointer  uppercase shadow-[4px_4px_0px_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed";

  const styles = {
    primary:
      "border-2 border-black bg-[#222]  tracking-wider text-white uppercase shadow-[4px_4px_0px_#000] ",
    secondary:
      "rounded-full font-bold text-white shadow-[4px_4px_0px_#000] transition-all",
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-8 py-3 text-4xl",
  };
  // if want to add some call to our for that
  const combinedClass = `${baseClass} ${styles[variant]} ${sizes[size]}   ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClass} {...props}>
        {children}
      </Link>
    );
  }
  // If no `href` is provided, render a standard <button>.
  return (
    <button className={combinedClass} {...props}>
      {children}
    </button>
  );
}
