import classNames from 'classnames';
import { pipeJsx } from '../jsx/pipeJsx';
import { mergeStyles } from '../jsx/mergeStyles';
import React, { createElement } from 'react';
import { clamp } from 'lodash/fp';

const headerTemplate = mergeStyles(
	<i className={classNames('font-header font-bold', 'mt-4 first:mt-0')} style={{ pageBreakAfter: 'avoid' }} />
);

const header =
	(elem: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6', fontSizeClass: string) =>
	({ children, className, ...props }: JSX.IntrinsicElements['h1']) =>
		pipeJsx(
			createElement(
				elem,
				{
					className: classNames(className, fontSizeClass),
					...props,
				},
				children
			),
			headerTemplate
		);

export const Headings = {
	h1: header('h1', 'text-3xl'),
	h2: header('h2', 'text-2xl'),
	h3: header('h3', 'text-xl'),
	h4: header('h4', 'text-lg'),
	h5: header('h5', 'text-base'),
	h6: header('h6', 'text-sm'),
	// h7 to be used because our mdx down-steps all header tags intentionally
	h7: header('h6', 'text-xs'),

	byNumber: (n: number) => Headings[`h${Math.floor(clamp(1, 7, n)) as 1 | 2 | 3 | 4 | 5 | 6 | 7}`],
};
