import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
}

export function Logo({ className = "", size = 40 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="DayRoute logo"
    >
      <path
        d="M24 4C17.3726 4 12 9.37258 12 16C12 24 24 42 24 42C24 42 36 24 36 16C36 9.37258 30.6274 4 24 4Z"
        fill="url(#pinGradient)"
      />
      <path
        d="M2 46
           C6 44, 8 40, 8 36
           C8 32, 12 30, 16 32
           C20 34, 22 32, 24 28
           C26 24, 30 22, 34 20
           C38 18, 40 14, 42 10
           C44 6, 46 4, 48 2"
        stroke="#1db885"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="24" cy="16" r="5" fill="white" />
      <defs>
        <linearGradient id="pinGradient" x1="24" y1="4" x2="24" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="70%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default Logo;
