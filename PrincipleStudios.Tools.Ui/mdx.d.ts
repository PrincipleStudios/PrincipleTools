declare module '*.md?' {
	import { MDXProvider } from '@mdx-js/react';

	declare const component: React.FunctionComponent<React.ComponentProps<MDXProvider>>;
	export default component;
}
