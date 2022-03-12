/** @type {import('next').NextConfig} */
const config = {
	pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js', 'page.md', 'page.mdx'],
};

const withMDX = require('@next/mdx')({
	extension: /\.mdx?$/,
	options: {
		remarkPlugins: [],
		rehypePlugins: [],
		// If you use `MDXProvider`, uncomment the following line.
		providerImportSource: "@mdx-js/react",
	},
});

module.exports = withMDX(config);
