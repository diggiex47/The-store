<<<<<<< HEAD
import React from 'react';

export default function Button({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <button className={`btn btn-outline btn-accent ${className || ''}`}>
=======
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
>>>>>>> 69e21060e5c278c3c26577a4a8794e33e2c66ca9
      {children}
    </button>
  );
}
