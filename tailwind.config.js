/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',

    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        body: ['Poppins', 'sans-serif']
      },
      colors: {
        darkmain: '#232428',
        dark: {
          50: '#919193',
          100: '#7b7b7e',
          200: '#656568',
          300: '#4e4f52',
          400: '#38393d',
          500: '#232428',
          600: '#1f2024',
          700: '#1c1c20',
          800: '#18191c',
          900: '#151518',
          950: '#111214'
        },

        midmain: '#7F7F7F',
        mid: {
          50: '#3f3f3f',
          100: '#4c4c4c',
          200: '#585858',
          300: '#656565',
          400: '#727272',
          500: '#7f7f7f',
          600: '#8b8b8b',
          700: '#989898',
          800: '#a5a5a5',
          900: '#b2b2b2',
          950: '#bfbfbf'
        },

        lightmain: '#E7ECEE',
        light: {
          50: '#737677',
          100: '#8a8d8e',
          200: '#a1a5a6',
          300: '#b8bcbe',
          400: '#cfd4d6',
          500: '#e7ecee',
          600: '#e9edef',
          700: '#ebeff1',
          800: '#eef1f3',
          900: '#f0f3f4',
          950: '#f3f5f6',
        },
      }
    },
  },
  plugins: [
    require("@tailwindcss/typography")
  ]
}
