import { twMerge } from 'tailwind-merge';
import { recurse } from '../jsx/recurse';
import { pipeJsx } from '../jsx/pipeJsx';
import { mergeStyles } from '../jsx/mergeStyles';
import { mergeComponent } from '../jsx/mergeComponent';
import { Headings } from '../headings';

const rowTemplate = mergeStyles(
	<tr className="to-white border-b-2 border-white font-info" />
);
const infoFontTemplate = mergeStyles(<i className="font-info" />);

export const components: import('mdx/types').MDXComponents = {
	...Headings.byBaseNumber(1),
	p: mergeComponent(<p className="my-4" />),
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
	a: mergeComponent(<a className="underline" />),
	thead: mergeComponent(<thead />),
	tbody: ({ children, ...props }) => (
		<tbody {...props}>{pipeJsx(<>{children}</>, recurse(rowTemplate))}</tbody>
	),
	td: mergeComponent(<td className="px-2 font-bold align-top" />),
	th: mergeComponent(<th className="px-2 font-bold align-bottom" />),
	ul: mergeComponent(<ul className="list-disc ml-6" />),
	ol: mergeComponent(<ol className="list-decimal ml-6" />),
	li: mergeComponent(<li className="my-1" />),
	hr: mergeComponent(<li className="border-0 my-1.5" />),
	blockquote: ({ children, className, ...props }) => (
		<blockquote
			className={twMerge('bg-gradient-to-r from-gray-300 p-2 my-4', className)}
			style={{ pageBreakInside: 'avoid' }}
			{...props}
		>
			{pipeJsx(<>{children}</>, recurse(infoFontTemplate))}
		</blockquote>
	),
	strong: mergeComponent(<span className="font-bold" />),
	pre: mergeComponent(
		<pre className="bg-gray-800 p-4 overflow-hidden rounded-lg" />
	),
};

export function getComponentsWithMaxHeading(
	headingElementMax: 1 | 2 | 3 | 4 | 5 | 6
) {
	return {
		...components,
		...Headings.byBaseNumber(headingElementMax),
	};
}
