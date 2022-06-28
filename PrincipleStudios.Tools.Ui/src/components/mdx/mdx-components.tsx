import { MDXProvider } from '@mdx-js/react';
import classNames from 'classnames';
import { recurse } from '../jsx/recurse';
import { pipeJsx } from '../jsx/pipeJsx';
import { mergeStyles } from '../jsx/mergeStyles';
import React from 'react';
import { Headings } from '../headings';

const rowTemplate = mergeStyles(<tr className="to-white border-b-2 border-white font-info" />);
const infoFontTemplate = mergeStyles(<i className="font-info" />);

export const headingsByBaseNumber = (n: number) => ({
	h1: Headings.byNumber(n + 0),
	h2: Headings.byNumber(n + 1),
	h3: Headings.byNumber(n + 2),
	h4: Headings.byNumber(n + 3),
	h5: Headings.byNumber(n + 4),
	h6: Headings.byNumber(n + 5),
});

export const mdxComponents: import('mdx/types').MDXComponents = {
	...headingsByBaseNumber(1),
	p: ({ children, className, ...props }) => (
		<p className={classNames(className, 'my-2')} {...props}>
			{children}
		</p>
	),
	table: ({ children, className, ...props }) => (
		<div className="overflow-auto print:overflow-visible my-2" style={{ breakInside: 'avoid' }}>
			<table className={classNames(className, 'w-full border-collapse')} style={{ breakInside: 'avoid' }} {...props}>
				{children}
			</table>
		</div>
	),
	a: ({ children, className, ...props }) => (
		<a className={classNames(className, 'underline')} {...props}>
			{children}
		</a>
	),
	thead: ({ children, className, ...props }) => (
		<thead className={classNames(className)} {...props}>
			{children}
		</thead>
	),
	tbody: ({ children, ...props }) => <tbody {...props}>{pipeJsx(<>{children}</>, recurse(rowTemplate))}</tbody>,
	td: ({ children, className, ...props }) => (
		<td className={classNames(className, 'px-2 font-bold align-top')} {...props}>
			{children}
		</td>
	),
	th: ({ children, className, ...props }) => (
		<th className={classNames(className, 'px-2 font-bold align-bottom')} {...props}>
			{children}
		</th>
	),
	ul: ({ children, className, ...props }) => (
		<ul className={classNames(className, 'list-disc ml-6')} {...props}>
			{children}
		</ul>
	),
	ol: ({ children, className, ...props }) => (
		<ul className={classNames(className, 'list-decimal ml-6')} {...props}>
			{children}
		</ul>
	),
	li: ({ children, className, ...props }) => (
		<li className={classNames(className, 'my-1')} {...props}>
			{children}
		</li>
	),
	hr: ({ className, ...props }) => <hr className={classNames(className, 'border-0 my-1.5')} {...props} />,
	blockquote: ({ children, className, ...props }) => (
		<blockquote
			className={classNames(className, 'bg-gradient-to-r from-tan-fading p-2 my-4')}
			style={{ pageBreakInside: 'avoid' }}
			{...props}>
			{pipeJsx(<>{children}</>, recurse(infoFontTemplate))}
		</blockquote>
	),
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	img: ({ src, alt, placeholder, ...props }) => (src ? <img src={src} alt={alt} {...props} /> : <></>),
	strong: ({ children, ...props }) => (
		<span className="font-bold" {...props}>
			{children}
		</span>
	),
};

export const MdxComponents = ({ children }: { children: React.ReactNode }) => (
	<MDXProvider components={mdxComponents}>{children}</MDXProvider>
);
