const defaultColors = require('tailwindcss/colors');

const colors = {
	white: {
		DEFAULT: '#FFFFFF',
	},
	black: {
		DEFAULT: '#111',
	},
	blue: defaultColors.blue,
	red: defaultColors.red,
};

/** @type {import('@types/tailwindcss/tailwind-config.d').TailwindConfig} */
const tailwindConfig = {
  content: [
    './src/components/**/*.{ts,tsx,js,jsx}',
    './src/pages/**/*.{ts,tsx,js,jsx}'
  ],
	theme: {
		extend: {
			width: {
				content: '800px',
			},
		},
		colors,
		fontFamily: {
			base: ['Helvetica Neue', 'Arial', 'sans-serif'],
		},
	},
	variants: {
		extend: {
			borderColor: ['hover', 'focus'],
			textColor: ['group-focus'],
		},
	},
  plugins: [],
}

module.exports = tailwindConfig;
