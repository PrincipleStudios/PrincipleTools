import { twMerge } from 'tailwind-merge';
import clamp from 'lodash/fp/clamp';
import { pipeJsx } from '../jsx/pipeJsx';
import { mergeStyles } from '../jsx/mergeStyles';
import { mergeComponent } from '../jsx/mergeComponent';

const headerTemplate = mergeStyles(
	<i
		className={twMerge('font-header font-bold', 'mt-4 first:mt-0')}
		style={{ pageBreakAfter: 'avoid' }}
	/>
);

/** Creates a heading element with the default styles from the above template */
const header = (template: JSX.Element, name: string) =>
	mergeComponent<'h1'>(pipeJsx(template, headerTemplate), name);

const headings = [
	header(<h1 className="text-4xl" />, 'H1'),
	header(<h2 className="text-3xl" />, 'H2'),
	header(<h3 className="text-2xl" />, 'H3'),
	header(<h4 className="text-xl" />, 'H4'),
	header(<h5 className="text-lg" />, 'H5'),
	header(<h6 className="text-base" />, 'H6'),
	// more headings _just in case_ because our mdx down-steps all header tags intentionally
	header(<h6 className="text-sm" />, 'H7'),
	header(<h6 className="text-xs" />, 'H8'),
];

/** Gets a header by number - `1` would give an `h1`, etc. */
function byNumber(n: number) {
	// We clamp to the range of the headings, ensuring an integer... no, we can't get undefined.
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	return headings[clamp(0, headings.length - 1, Math.floor(n) - 1)]!;
}

/** Utility function for down-stepping headers. That is, allow MDX to use
 * `h1` but receive an `h2`.
 */
function byBaseNumber(n: number) {
	return {
		h1: byNumber(n + 0),
		h2: byNumber(n + 1),
		h3: byNumber(n + 2),
		h4: byNumber(n + 3),
		h5: byNumber(n + 4),
		h6: byNumber(n + 5),
	};
}

export const Headings = {
	...byBaseNumber(1),
	byNumber,
	byBaseNumber,
};
