/** @type {import('next').NextConfig} */
const config = {
	pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js', 'page.md', 'page.mdx'],
	// Force the export to add /index.html for each page
	trailingSlash: true,
    webpack(config) {
        const fileLoaderRule = config.module.rules.find(
          (rule) => rule.test && rule.test.test('.svg'),
        );
        fileLoaderRule.exclude = /\.svg$/;
        config.module.rules.push({
          test: /\.svg$/i,
          use: [require.resolve('@svgr/webpack')],
        });
        config.module.rules.push({
          test: /\.svg?url$/i,
          type: 'asset',
          resourceQuery: /url/,
        });
        return config;
    },
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
