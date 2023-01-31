import { twMerge } from 'tailwind-merge';
import { recurse } from '../jsx/recurse';
import { pipeJsx } from '../jsx/pipeJsx';
import { mergeStyles } from '../jsx/mergeStyles';
import { Headings } from '../headings';

const rowTemplate = mergeStyles(
	<tr className="to-white border-b-2 border-white font-info" />
);
const infoFontTemplate = mergeStyles(<i className="font-info" />);

export const headingsByBaseNumber = (n: number) => ({
	h1: Headings.byNumber(n + 0),
	h2: Headings.byNumber(n + 1),
	h3: Headings.byNumber(n + 2),
	h4: Headings.byNumber(n + 3),
	h5: Headings.byNumber(n + 4),
	h6: Headings.byNumber(n + 5),
});

export const components: import('mdx/types').MDXComponents = {
	...headingsByBaseNumber(1),
	code: ({ children, className, ...props }) => (
		<code
			className={twMerge(
				'bg-gray-200 inline-block border border-gray-400 rounded-sm',
				className
			)}
			{...props}
		>
			{children}
		</code>
	),
	p: ({ children, className, ...props }) => (
		<p className={twMerge('my-2', className)} {...props}>
			{children}
		</p>
	),
	table: ({ children, className, ...props }) => (
		<div
			className="overflow-auto print:overflow-visible my-2"
			style={{ breakInside: 'avoid' }}
		>
			<table
				className={twMerge('w-full border-collapse', className)}
				style={{ breakInside: 'avoid' }}
				{...props}
			>
				{children}
			</table>
		</div>
	),
	a: ({ children, className, ...props }) => (
		<a className={twMerge('underline', className)} {...props}>
			{children}
		</a>
	),
	thead: ({ children, className, ...props }) => (
		<thead className={twMerge(className)} {...props}>
			{children}
		</thead>
	),
	tbody: ({ children, ...props }) => (
		<tbody {...props}>{pipeJsx(<>{children}</>, recurse(rowTemplate))}</tbody>
	),
	td: ({ children, className, ...props }) => (
		<td className={twMerge('px-2 font-bold align-top', className)} {...props}>
			{children}
		</td>
	),
	th: ({ children, className, ...props }) => (
		<th
			className={twMerge('px-2 font-bold align-bottom', className)}
			{...props}
		>
			{children}
		</th>
	),
	ul: ({ children, className, ...props }) => (
		<ul className={twMerge('list-disc ml-6', className)} {...props}>
			{children}
		</ul>
	),
	ol: ({ children, className, ...props }) => (
		<ul className={twMerge('list-decimal ml-6', className)} {...props}>
			{children}
		</ul>
	),
	li: ({ children, className, ...props }) => (
		<li className={twMerge('my-1', className)} {...props}>
			{children}
		</li>
	),
	hr: ({ className, ...props }) => (
		<hr className={twMerge('border-0 my-1.5', className)} {...props} />
	),
	blockquote: ({ children, className, ...props }) => (
		<blockquote
			className={twMerge('bg-gradient-to-r from-gray-300 p-2 my-4', className)}
			style={{ pageBreakInside: 'avoid' }}
			{...props}
		>
			{pipeJsx(<>{children}</>, recurse(infoFontTemplate))}
		</blockquote>
	),
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	img: ({ src, alt, placeholder, ...props }) =>
		src ? <img src={src} alt={alt} {...props} /> : <></>,
	strong: ({ children, ...props }) => (
		<span className="font-bold" {...props}>
			{children}
		</span>
	),
};
