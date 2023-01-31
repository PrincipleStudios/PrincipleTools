import { useMemo } from 'react';
import { useTooltipData } from './internals/useTooltipData';

export function TooltipDisplay() {
	const data = useTooltipData();
	const positioning = useMemo(() => {
		if (!data) return {};

		const bounds = data.target.getBoundingClientRect();
		const offset = getDocumentOffset(data.target);

		return { top: offset.top, left: offset.left + bounds.width / 2 };
	}, [data]);

	return data ? (
		<div
			className="absolute flex flex-col items-center -mt-1 pointer-events-none transform -translate-x-1/2 -translate-y-full"
			style={positioning}>
			<span className="relative p-2 text-xs leading-none whitespace-no-wrap bg-black text-white shadow-sm rounded-sm border border-blue">
				{data.content}
			</span>
		</div>
	) : null;
}

const isSvgElement = (target: Element): target is SVGElement => 'ownerSVGElement' in target;
const isHtmlElement = (target: Element): target is HTMLElement => 'offsetParent' in target;

function getDocumentOffset(target: Element): { left: number; top: number } {
	if (!isHtmlElement(target) && !isSvgElement(target)) {
		throw new Error('Not supported - pass either an SVG or an HTML element for the tooltip hook');
	}
	if (isSvgElement(target)) {
		const parent = target.ownerSVGElement ?? target.parentElement;
		if (!parent) throw new Error('Not supported - please make sure your element is mounted');
		const bounds = target.getBoundingClientRect();
		const parentBounds = parent.getBoundingClientRect();

		const parentOffset = getDocumentOffset(parent);
		return { left: bounds.x - parentBounds.x + parentOffset.left, top: bounds.y - parentBounds.y + parentOffset.top };
	}

	// eslint-disable-next-line no-restricted-globals
	if (target.offsetParent === null || target.offsetParent === document.body) {
		return { left: target.offsetLeft, top: target.offsetTop };
	}

	const { left, top } = getDocumentOffset(target.offsetParent);
	return { top: target.offsetTop + top, left: target.offsetLeft + left };
}
