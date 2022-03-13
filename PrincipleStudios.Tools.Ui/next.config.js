/** @type {import('next').NextConfig} */
const config = {
	pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js', 'page.md', 'page.mdx'],
    webpack(config) {
        const fileLoaderRule = config.module.rules.find(
          (rule) => rule.test && rule.test.test('.svg'),
        );
        fileLoaderRule.exclude = /\.svg$/;
        config.module.rules.push({
          test: /\.svg$/,
          loader: require.resolve('@svgr/webpack'),
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
