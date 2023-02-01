import { RadarQuadrant } from '../../types';
import React from 'react';
import { buffer, quadrantInfo } from '../../quadrant-info';

export function Blip({ quadrant, index, title }: { quadrant: RadarQuadrant; index?: number; title?: string }) {
	return (
		<g>
			{title ? <title>{title}</title> : null}
			{quadrantInfo[quadrant].template}
			{index !== undefined ? (
				<text
					fontSize={buffer / 2}
					textAnchor="middle"
					className="fill-white"
					dominantBaseline="middle"
					dy={buffer / 15}>
					{index}
				</text>
			) : null}
		</g>
	);
}
