import React from "react";

export const LoginIllustration = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 800 600"
    className="auth-illustration"
    style={{ maxWidth: "100%", height: "auto", maxHeight: "300px" }}
  >
    <defs>
      <linearGradient id="mintGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#5FF6D2" />
        <stop offset="100%" stopColor="#3EDABB" />
      </linearGradient>
    </defs>

    {/* Abstract Background Shapes */}
    <circle cx="400" cy="300" r="200" fill="rgba(95, 246, 210, 0.05)" />
    <circle cx="400" cy="300" r="150" fill="rgba(95, 246, 210, 0.1)" />

    {/* Character / Scene (Simplified unDraw style) */}
    <g transform="translate(200, 150)">
      {/* Background Elements */}
      <rect
        x="50"
        y="50"
        width="300"
        height="200"
        rx="10"
        fill="#2a2a2a"
        opacity="0.5"
      />

      {/* Waveforms */}
      <path
        d="M100 150 L120 100 L140 180 L160 120 L180 160 L200 140 L220 150"
        stroke="url(#mintGrad)"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />

      <path
        d="M240 150 L260 110 L280 170 L300 150"
        stroke="#A3A7A9"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* Character Head */}
      <circle cx="0" cy="180" r="40" fill="#e0e0e0" />
      <path
        d="M-40 280 C-40 220 40 220 40 280 L40 300 L-40 300 Z"
        fill="#e0e0e0"
      />

      {/* Headphones */}
      <path
        d="M-45 180 C-45 130 45 130 45 180 V200 H35 V180 C35 140 -35 140 -35 180 V200 H-45 Z"
        fill="#5FF6D2"
      />
      <rect x="-55" y="170" width="20" height="40" rx="10" fill="#3EDABB" />
      <rect x="35" y="170" width="20" height="40" rx="10" fill="#3EDABB" />
    </g>
  </svg>
);

export const SignupIllustration = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 800 600"
    className="auth-illustration"
    style={{ maxWidth: "100%", height: "auto", maxHeight: "300px" }}
  >
    <defs>
      <linearGradient id="mintGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#5FF6D2" />
        <stop offset="100%" stopColor="#38bdf8" />
      </linearGradient>
    </defs>

    {/* Abstract Background */}
    <path
      d="M100 500 Q 400 600 700 500 T 100 500"
      fill="rgba(95, 246, 210, 0.05)"
    />

    {/* Rocket / Launch Theme */}
    <g transform="translate(300, 100)">
      {/* Rocket Body */}
      <path
        d="M100 50 C150 50 150 150 150 150 L100 250 L50 150 C50 150 50 50 100 50 Z"
        fill="#e0e0e0"
      />
      <circle cx="100" cy="120" r="15" fill="#2a2a2a" />

      {/* Fins */}
      <path d="M50 150 L20 250 L100 250 Z" fill="#b0b0b0" />
      <path d="M150 150 L180 250 L100 250 Z" fill="#b0b0b0" />

      {/* Main Thruster */}
      <path d="M100 250 L80 280 L120 280 Z" fill="#5FF6D2" />

      {/* Flame */}
      <path d="M80 280 Q 100 350 120 280" fill="#3EDABB" opacity="0.8">
        <animate
          attributeName="d"
          values="M80 280 Q 100 350 120 280; M80 280 Q 100 320 120 280; M80 280 Q 100 350 120 280"
          dur="0.5s"
          repeatCount="indefinite"
        />
      </path>
    </g>

    {/* Floating Elements */}
    <circle cx="200" cy="200" r="5" fill="#5FF6D2" opacity="0.6">
      <animate
        attributeName="cy"
        values="200;190;200"
        dur="3s"
        repeatCount="indefinite"
      />
    </circle>
    <circle cx="600" cy="150" r="8" fill="#5FF6D2" opacity="0.4">
      <animate
        attributeName="cy"
        values="150;160;150"
        dur="4s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);
