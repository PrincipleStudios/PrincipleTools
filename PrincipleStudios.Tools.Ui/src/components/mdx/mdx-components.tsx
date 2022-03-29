import { MDXProvider } from '@mdx-js/react';
import classNames from 'classnames';
import { recurse } from '../jsx/recurse';
import { pipeJsx } from '../jsx/pipeJsx';
import { mergeStyles } from '../jsx/mergeStyles';
import React from 'react';

const headerTemplate = mergeStyles(
	<i className={classNames('font-header font-bold', 'mt-4 first:mt-0')} style={{ pageBreakAfter: 'avoid' }} />
);

const rowTemplate = mergeStyles(<tr className="to-white border-b-2 border-white font-info" />);
const infoFontTemplate = mergeStyles(<i className="font-info" />);

export const mdxComponents: import('mdx/types').MDXComponents = {
	h1: ({ children, className, ...props }) =>
		pipeJsx(
			<h2 className={classNames(className, 'text-2xl')} {...props}>
				{children}
			</h2>,
			headerTemplate
		),
	h2: ({ children, className, ...props }) =>
		pipeJsx(
			<h3 className={classNames(className, 'text-xl')} {...props}>
				{children}
			</h3>,
			headerTemplate
		),
	h3: ({ children, className, ...props }) =>
		pipeJsx(
			<h4 className={classNames(className, 'text-lg')} {...props}>
				{children}
			</h4>,
			headerTemplate
		),
	h4: ({ children, className, ...props }) =>
		pipeJsx(
			<h5 className={classNames(className, 'text-base')} {...props}>
				{children}
			</h5>,
			headerTemplate
		),
	h5: ({ children, className, ...props }) =>
		pipeJsx(
			<h6 className={classNames(className, 'text-sm')} {...props}>
				{children}
			</h6>,
			headerTemplate
		),
	h6: ({ children, className, ...props }) =>
		pipeJsx(
			<h6 className={classNames(className, 'text-xs')} {...props}>
				{children}
			</h6>,
			headerTemplate
		),
	p: ({ children, className, ...props }) => (
		<p className={classNames(className)} {...props}>
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
