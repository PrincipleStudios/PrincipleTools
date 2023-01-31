import { PositionedRadarBlip } from '../../types';
import React from 'react';
import { radarRelativeSize } from '../constants';
import { Blip } from './blip';
import { quadrantInfo } from 'src/radar/quadrant-info';
import { ringInfo } from 'src/radar/ring-info';

export function PositionedBlip({ x, y, frontmatter: { title, quadrant, ring }, index }: PositionedRadarBlip) {
	return (
		<g transform={`translate(${x * radarRelativeSize} ${y * radarRelativeSize}) scale(${radarRelativeSize})`}>
			<Blip
				quadrant={quadrant}
				index={index}
				title={`${title}: ${quadrantInfo[quadrant].title} / ${ringInfo[ring].title}`}
			/>
		</g>
	);
}
