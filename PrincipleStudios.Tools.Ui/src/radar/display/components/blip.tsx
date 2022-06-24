import { PositionedRadarBlip } from '../../types';
import React from 'react';
import { quadrantMapping } from '../radarPositioning';
import { radarRelativeSize } from '../constants';

export function Blip({ x, y, frontmatter: { title, quadrant } }: PositionedRadarBlip) {
	return (
		<g
			transform={`translate(${x * radarRelativeSize} ${y * radarRelativeSize}) scale(${radarRelativeSize})`}
			data-title={title}>
			{quadrantMapping[quadrant].template}
		</g>
	);
}
