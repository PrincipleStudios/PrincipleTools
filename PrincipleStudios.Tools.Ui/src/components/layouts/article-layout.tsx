import { ReactNode } from 'react';
import { MDXProvider } from '@mdx-js/react';

const components = {
	h1: ({ ...props }: JSX.IntrinsicElements['h1']) => <h1 className="text-lg font-bold" {...props} />,
};

function Layout({ children }: { children?: ReactNode }) {
	return (
		<>
			<MDXProvider components={components}>{children}</MDXProvider>
		</>
	);
}

export default Layout;
