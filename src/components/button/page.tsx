"use client";

import React, { ComponentProps } from "react";
import { useFormStatus, } from "react-dom";

export default function Button(
  { children,
    className,
    ...props
  }: 
  { children: React.ReactNode; className?: string } & ComponentProps<'button'>  ) 
  {
  const { pending } = useFormStatus();
    return (
    <button 
    {...props}
    className={`btn btn-outline btn-accent ${className}`}
    type='submit'
    disabled={pending || props.disabled}
    >
      {pending && <span className="loading loading-spinner loading-sm"></span>}
      {children}
    </button>
  );
}
