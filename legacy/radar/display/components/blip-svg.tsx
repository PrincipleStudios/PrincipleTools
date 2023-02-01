import { RadarQuadrant } from '../../types';
import React from 'react';
import { radius } from '../../quadrant-info';
import { Blip } from './blip';

export function BlipSvg({
	quadrant,
	className,
	index,
}: {
	quadrant: RadarQuadrant;
	className?: string;
	index?: number;
}) {
	return (
		<svg className={className} viewBox={`${-radius} ${-radius} ${radius * 2} ${radius * 2}`}>
			<Blip quadrant={quadrant} index={index} />
		</svg>
	);
}
