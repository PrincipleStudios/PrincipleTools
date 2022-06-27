import React from 'react';
import classNames from 'classnames';
import { useId } from '../../utils/useId';

export function SvgBorderedBox({
	className,
	width,
	height,
	children,
}: {
	className?: string;
	width: number;
	height: number;
	children?: React.ReactNode;
}) {
	const id = useId();
	return (
		<svg className={classNames(className ?? 'w-128 h-128')} viewBox={`${-1} ${-1} ${width + 2} ${height + 2}`}>
			<defs>
				<mask id={`${id}-mask`}>
					<rect className="fill-white" x={0} y={0} width={width} height={height} />
				</mask>
			</defs>
			<g mask={`url(#${id}-mask)`}>
				<rect className="fill-gray-200" x={0} y={0} width={width} height={height} />
				{children}
				<rect fill="none" className="stroke-black stroke-1" x={0} y={0} width={width} height={height} />
			</g>
		</svg>
	);
}
