import { forceCenter, forceCollide, forceSimulation } from 'd3-force';
import { clamp, groupBy } from 'lodash/fp';
import { RadarBlipSummary, RadarQuadrant, RadarRing } from './load';

const quadrantMapping: Record<RadarQuadrant, { range: [number, number]; template: JSX.Element }> = {
	tools: {
		range: [0, Math.PI * 0.5],
		template: <circle r={0.05} className="fill-blue-500" />,
	},
	techniques: {
		range: [Math.PI * 0.5, Math.PI * 1],
		template: <rect x={-0.04} y={-0.04} width={0.08} height={0.08} className="fill-violet-700" />,
	},
	'languages-and-frameworks': {
		range: [Math.PI * 1, Math.PI * 1.5],
		// Uses essentially a 0.6 radius for calculations to make a triangle
		template: <path d="M0,-0.06L0.05,0.03L-0.05,0.03Z" className="fill-emerald-800" />,
	},
	platforms: {
		range: [Math.PI * 1.5, Math.PI * 2],
		template: <rect x={-0.04} y={-0.04} width={0.08} height={0.08} transform="rotate(45)" className="fill-amber-600" />,
	},
};

const ringMapping: Record<RadarRing, { range: [number, number] }> = {
	hold: { range: [0.75, 0.995] },
	assess: { range: [0.5, 0.75] },
	trial: { range: [0.25, 0.5] },
	adopt: { range: [0, 0.25] },
};

function getBlipPlacement(blips: RadarBlipSummary[]) {
	const quadrants = Object.entries(
		groupBy(({ frontmatter }) => `${frontmatter.quadrant} ${frontmatter.ring}`, blips)
	) as [`${RadarQuadrant} ${RadarRing}`, RadarBlipSummary[]][];

	const results = quadrants
		.map(([quadrantRing, blipsInQuadrant]) => {
			const [quadrant, ring] = quadrantRing.split(' ') as [RadarQuadrant, RadarRing];
			const { range: quadrantRange } = quadrantMapping[quadrant];
			const { range: ringRange } = ringMapping[ring];
			const quadrantValue = (quadrantRange[0] + quadrantRange[1]) / 2;
			const ringValue = (ringRange[0] + ringRange[1]) / 2;

			const blipNodes = blipsInQuadrant.map((blip) => {
				const x = quadrantValue;
				const y = ringValue;
				return { x, y, ...blip };
			});
			const xBounds = clamp(quadrantRange[0], quadrantRange[1]);
			const yBounds = clamp(ringRange[0], ringRange[1]);

			forceSimulation(blipNodes)
				.force('charge', forceCollide(0.12))
				.force('bounds', () => {
					for (const node of blipNodes) {
						node.x = xBounds(node.x);
						node.y = yBounds(node.y);
					}
				})
				.force('center', forceCenter(quadrantValue, ringValue))
				.tick(100);

			for (const node of blipNodes) {
				node.x = xBounds(node.x);
				node.y = yBounds(node.y);
				const { x: radians, y: radius } = node;
				node.x = Math.cos(radians) * radius;
				node.y = Math.sin(radians) * radius;
			}

			return blipNodes;
		})
		.flat();

	return results;
}

export type RadarProps = {
	blips: RadarBlipSummary[];
};

export function Radar({ blips }: RadarProps) {
	const results = getBlipPlacement(blips);
	const size = 200;

	return (
		<svg className="w-96 h-96" viewBox={`-${size} -${size} ${size * 2} ${size * 2}`}>
			<g className="fill-white stroke-gray-300 stroke-1">
				<circle cx={0} cy={0} r={ringMapping.hold.range[1] * size} />
				<circle cx={0} cy={0} r={ringMapping.assess.range[1] * size} />
				<circle cx={0} cy={0} r={ringMapping.trial.range[1] * size} />
				<circle cx={0} cy={0} r={ringMapping.adopt.range[1] * size} />
			</g>
			{results.map((blip) => (
				<g
					key={blip.slug}
					transform={`translate(${blip.x * size} ${blip.y * size}) scale(${size})`}
					data-title={blip.frontmatter.title}>
					{quadrantMapping[blip.frontmatter.quadrant].template}
				</g>
			))}
		</svg>
	);
}
