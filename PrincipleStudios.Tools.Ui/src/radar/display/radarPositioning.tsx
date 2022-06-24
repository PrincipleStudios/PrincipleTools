import { RadarQuadrant, RadarRing } from '../types';

export const buffer = 0.07; // Based on the size of the largest template
export const quadrantMapping: Record<
	RadarQuadrant,
	{ range: [number, number]; template: JSX.Element; direction: [x: number, y: number] }
> = {
	tools: {
		range: [0, Math.PI * 0.5],
		template: <circle r={0.025} className="fill-emerald-500" />,
		direction: [-1, 1],
	},
	techniques: {
		range: [Math.PI * 0.5, Math.PI * 1],
		template: <rect x={-0.02} y={-0.02} width={0.04} height={0.04} className="fill-blue-700" />,
		direction: [1, 1],
	},
	platforms: {
		range: [Math.PI * 1, Math.PI * 1.5],
		// Uses essentially a 0.6 radius for calculations to make a triangle
		template: <path d="M0,-0.030L0.025,0.015L-0.025,0.015Z" className="fill-amber-700" />,
		direction: [1, -1],
	},
	'languages-and-frameworks': {
		range: [Math.PI * 1.5, Math.PI * 2],
		template: (
			<rect x={-0.02} y={-0.02} width={0.04} height={0.04} transform="rotate(45)" className="fill-violet-600" />
		),
		direction: [-1, -1],
	},
};

export const ringMapping: Record<RadarRing, { range: [number, number] }> = {
	hold: { range: [0.75, 0.995] },
	assess: { range: [0.5, 0.75] },
	trial: { range: [0.25, 0.5] },
	adopt: { range: [0, 0.25] },
};
