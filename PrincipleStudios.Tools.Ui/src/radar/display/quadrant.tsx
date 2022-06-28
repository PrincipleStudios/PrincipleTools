import { RadarBlipSummary, RadarQuadrant } from '../types';
import React from 'react';
import classNames from 'classnames';
import { quadrantInfo } from '../quadrant-info';
import { getBlipPlacement } from './getBlipPlacement';
import { radarRelativeSize } from './constants';
import { PositionedBlip } from './components/PositionedBlip';
import { Rings } from './components/rings';
import { SvgBorderedBox } from 'src/components/svg-bordered-box';
import { useTooltip } from './components/hover-info/use-tooltip';

export function Quadrant({
	blips,
	quadrant,
	className,
	showTitle,
	onClickBlip,
}: {
	blips: RadarBlipSummary[];
	quadrant: RadarQuadrant;
	className?: string;
	showTitle?: boolean;
	onClickBlip?: (slug: RadarBlipSummary, ev: React.MouseEvent) => void;
}) {
	const [x, y] = quadrantInfo[quadrant].direction;
	const results = getBlipPlacement(blips.filter((blip) => blip.frontmatter.quadrant === quadrant));

	const left = -radarRelativeSize * Math.max(0, x);
	const top = -radarRelativeSize * Math.max(0, y);

	const applyTooltip = useTooltip();

	return (
		<SvgBorderedBox
			className={classNames(className ?? 'w-128 h-128')}
			width={radarRelativeSize}
			height={radarRelativeSize}>
			<title>Technology Radar: {quadrantInfo[quadrant].title}</title>
			<g transform={`translate(${-left} ${-top})`}>
				{showTitle ? (
					<g transform={`translate(${-radarRelativeSize * x * 0.95} ${-radarRelativeSize * y * 0.95})`}>
						<text
							className="text-sm font-bold"
							dominantBaseline={y > 0 ? 'hanging' : 'bottom'}
							textAnchor={x > 0 ? 'start' : 'end'}>
							{quadrantInfo[quadrant].title}
						</text>
					</g>
				) : null}
				<Rings />
				{results.map((blip) => (
					<g
						key={blip.slug}
						className="cursor-pointer"
						{...applyTooltip(<span>{blip.frontmatter.title}</span>)}
						onClick={onClickBlip ? (ev) => onClickBlip(blip, ev) : undefined}>
						<PositionedBlip {...blip} />
					</g>
				))}
			</g>
		</SvgBorderedBox>
	);
}
