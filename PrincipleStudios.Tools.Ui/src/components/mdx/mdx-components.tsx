import { twMerge } from 'tailwind-merge';
import { recurse } from '../jsx/recurse';
import { pipeJsx } from '../jsx/pipeJsx';
import { mergeStyles } from '../jsx/mergeStyles';
import { mergeComponent } from '../jsx/mergeComponent';
import { Headings } from '../headings';
import type { ImageMetadata } from '@astrojs/image/dist/vite-plugin-astro-image';

const rowTemplate = mergeStyles(
	<tr className="to-white border-b-2 border-white font-info" />
);
const infoFontTemplate = mergeStyles(<i className="font-info" />);

export const components: import('mdx/types').MDXComponents = {
	...Headings.byBaseNumber(1),
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
	p: mergeComponent(<p className="my-2" />),
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
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	img: ({ src, ...props }) => {
		if (typeof src === 'string' || typeof src === 'undefined')
			return (
				<span className="relative flex justify-center">
					<img {...props} src={src} />
				</span>
			);
		else {
			// Astro imports images as ImageMetadata instead of strings; this affects image components in MDX.
			const image = src as unknown as ImageMetadata;
			return (
				<span className="relative flex justify-center">
					<img {...props} src={image.src} />
				</span>
			);
		}
	},
	strong: mergeComponent(<span className="font-bold" />),
};

export function getComponentsWithMaxHeading(
	headingElementMax: 1 | 2 | 3 | 4 | 5 | 6
) {
	return {
		...components,
		...Headings.byBaseNumber(headingElementMax),
	};
}
