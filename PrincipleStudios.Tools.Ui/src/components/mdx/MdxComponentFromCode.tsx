import { useMDXComponents } from '@mdx-js/react';
import { getMDXComponent, MDXContentProps } from 'mdx-bundler/client';
import { useMemo } from 'react';

export function MdxComponentFromCode({ code, components, ...props }: MDXContentProps & { code: string }) {
	const contextComponents = useMDXComponents();
	const resultComponents = useMemo(() => ({ ...contextComponents, ...components }), [contextComponents, components]);

	const Component = useMemo(() => getMDXComponent(code), [code]);
	return <Component components={resultComponents} {...props} />;
}
