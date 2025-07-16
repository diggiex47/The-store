/** @type {import('tailwindcss').Config} */


module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],


plugins: ["daisyui"],
daisyui: {
  themes: [
    {
      light: {
        name: "light",
        default: true,
        prefersdark: false,
        'color-scheme': 'dark',
        '--color-base-100': 'oklch(12% 0.042 264.695)',
        '--color-base-200': 'oklch(20% 0.042 265.755)',
        '--color-base-300': 'oklch(27% 0.041 260.031)',
        '--color-base-content': 'oklch(96% 0.007 247.896)',
        '--color-primary': 'oklch(82% 0.119 306.383)',
        '--color-primary-content': 'oklch(29% 0.149 302.717)',
        '--color-secondary': 'oklch(84% 0.143 164.978)',
        '--color-secondary-content': 'oklch(26% 0.051 172.552)',
        '--color-accent': 'oklch(89% 0.196 126.665)',
        '--color-accent-content': 'oklch(27% 0.072 132.109)',
        '--color-neutral': 'oklch(12% 0.042 264.695)',
        '--color-neutral-content': 'oklch(98% 0.003 247.858)',
        '--color-info': 'oklch(68% 0.169 237.323)',
        '--color-info-content': 'oklch(97% 0.013 236.62)',
        '--color-success': 'oklch(72% 0.219 149.579)',
        '--color-success-content': 'oklch(98% 0.018 155.826)',
        '--color-warning': 'oklch(76% 0.188 70.08)',
        '--color-warning-content': 'oklch(98% 0.022 95.277)',
        '--color-error': 'oklch(63% 0.237 25.331)',
        '--color-error-content': 'oklch(97% 0.013 17.38)',
        '--radius-selector': '0.25rem',
        '--radius-field': '1rem',
        '--radius-box': '2rem',
        '--size-selector': '0.25rem',
        '--size-field': '0.25rem',
        '--border': '1px',
        '--depth': '0',
        '--noise': '0',
      }
    }
  ]
},
}
