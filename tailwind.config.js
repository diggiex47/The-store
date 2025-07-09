/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],


plugin: [require("daisyui")],
daisyui: {
  themes: [
    {
      dark: {
        "color-scheme": "dark",
        "base-100": "oklch(14% 0.005 285.823)",
        "base-200": "oklch(21% 0.006 285.885)",
        "base-300": "oklch(27% 0.006 286.033)",
        "base-content": "oklch(96% 0.001 286.375)",
        "primary": "oklch(71% 0.203 305.504)",
        "primary-content": "oklch(29% 0.149 302.717)",
        "secondary": "oklch(77% 0.152 181.912)",
        "secondary-content": "oklch(27% 0.046 192.524)",
        "accent": "oklch(70% 0.183 293.541)",
        "accent-content": "oklch(28% 0.141 291.089)",
        "neutral": "oklch(27% 0.006 286.033)",
        "neutral-content": "oklch(98% 0 0)",
        "info": "oklch(58% 0.158 241.966)",
        "info-content": "oklch(97% 0.013 236.62)",
        "success": "oklch(64% 0.2 131.684)",
        "success-content": "oklch(98% 0.031 120.757)",
        "warning": "oklch(66% 0.179 58.318)",
        "warning-content": "oklch(98% 0.022 95.277)",
        "error": "oklch(58% 0.253 17.585)",
        "error-content": "oklch(96% 0.015 12.422)",
        "--radius-selector": "1rem",
        "--radius-field": "2rem",
        "--radius-box": "2rem",
        "--size-selector": "0.25rem",
        "--size-field": "0.25rem",
        "--border": "1px",
        "--depth": "1",
        "--noise": "0"
      },
    },
  ],
},
}
