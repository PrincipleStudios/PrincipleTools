import { RadarBlipSummary, RadarQuadrant } from '../types';
import React from 'react';
import classNames from 'classnames';
import { quadrantInfo } from '../quadrant-info';
import { getBlipPlacement } from './getBlipPlacement';
import { radarRelativeSize } from './constants';
import { PositionedBlip } from './components/PositionedBlip';
import { Rings } from './components/rings';
import { SvgBorderedBox } from 'src/components/svg-bordered-box';

export function Quadrant({
	blips,
	quadrant,
	className,
}: {
	blips: RadarBlipSummary[];
	quadrant: RadarQuadrant;
	className?: string;
}) {
	const [x, y] = quadrantInfo[quadrant].direction;
	const results = getBlipPlacement(blips);

	const left = -radarRelativeSize * Math.max(0, x);
	const top = -radarRelativeSize * Math.max(0, y);

	return (
		<SvgBorderedBox
			className={classNames(className ?? 'w-128 h-128')}
			width={radarRelativeSize}
			height={radarRelativeSize}>
			<g transform={`translate(${-left} ${-top})`}>
				<Rings />
				{results.map((blip) => (
					<PositionedBlip key={blip.slug} {...blip} />
				))}
			</g>
		</SvgBorderedBox>
	);
}
