import { PositionedRadarBlip } from '../../types';
import React from 'react';
import { radarRelativeSize } from '../constants';
import { Blip } from './blip';

export function PositionedBlip({ x, y, frontmatter: { title, quadrant }, index }: PositionedRadarBlip) {
	return (
		<g
			transform={`translate(${x * radarRelativeSize} ${y * radarRelativeSize}) scale(${radarRelativeSize})`}
			data-title={title}>
			<Blip quadrant={quadrant} index={index} />
		</g>
	);
}
