const defaultColors = require('tailwindcss/colors');

const colors = {
	transparent: defaultColors.transparent,
	white: {
		DEFAULT: '#FFFFFF',
	},
	black: {
		DEFAULT: '#111',
	},
	blue: defaultColors.blue,
	red: defaultColors.red,
	gray: defaultColors.gray,
	emerald: defaultColors.emerald,
	amber: defaultColors.amber,
	violet: defaultColors.violet,
};

/** @type {import('@types/tailwindcss/tailwind-config.d').TailwindConfig} */
const tailwindConfig = {
	content: ['./src/**/*.{ts,tsx,js,jsx,md,mdx,astro}'],
	theme: {
		extend: {
			width: {
				content: '800px',
			},
			spacing: {
				128: '32rem',
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
};

module.exports = tailwindConfig;
