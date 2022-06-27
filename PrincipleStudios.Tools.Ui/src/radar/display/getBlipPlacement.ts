import { forceCenter, forceCollide, forceSimulation } from 'd3-force';
import { clamp, groupBy, zip } from 'lodash/fp';
import { buffer, quadrantInfo } from '../quadrant-info';
import { PositionedRadarBlip, RadarBlipSummary, RadarQuadrant, RadarRing } from '../types';
import { ringMapping } from './radarPositioning';

export function getBlipPlacement(blips: RadarBlipSummary[]): PositionedRadarBlip[] {
	const quadrants = Object.entries(
		groupBy(({ frontmatter }) => `${frontmatter.quadrant} ${frontmatter.ring}`, blips)
	) as [`${RadarQuadrant} ${RadarRing}`, RadarBlipSummary[]][];

	const results = quadrants
		.map(([quadrantRing, blipsInQuadrant]) => {
			const [quadrant, ring] = quadrantRing.split(' ') as [RadarQuadrant, RadarRing];
			const { range: quadrantRange } = quadrantInfo[quadrant];
			const { range: ringRange } = ringMapping[ring];
			const quadrantValue = (quadrantRange[0] + quadrantRange[1]) / 2;
			const ringValue = (ringRange[0] + ringRange[1]) / 2;

			const blipNodes = blipsInQuadrant.map(() => {
				const x = quadrantValue;
				const y = ringValue;
				return { x, y };
			});
			const xBounds = clamp(quadrantRange[0], quadrantRange[1]);
			const yBounds = clamp(ringRange[0] + buffer, ringRange[1] - buffer);

			forceSimulation(blipNodes)
				.force('charge', forceCollide(buffer))
				.force('bounds', () => {
					for (const node of blipNodes) {
						node.x = xBounds(node.x);
						node.y = yBounds(node.y);
					}
				})
				.force('center', forceCenter(quadrantValue, ringValue))
				.tick(100);

			return zip(blipNodes, blipsInQuadrant).map(([node, blip]) => {
				if (!node) throw new Error('Somehow had a mismatch of blips');
				const { x: radians, y: radius } = node;
				return {
					x: Math.cos(radians) * radius,
					y: -Math.sin(radians) * radius,
					...blip,
				} as PositionedRadarBlip;
			});
		})
		.flat();

	return results;
}
