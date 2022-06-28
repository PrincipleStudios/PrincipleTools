import { RadarQuadrant } from '../types';
import ToolsComponent from './tools.mdx';
import TechniquesComponent from './techniques.mdx';
import LanguagesAndFrameworksComponent from './languages-and-frameworks.mdx';
import PlatformsComponent from './platforms.mdx';

export const buffer = 0.07; // Based on the size of the largest template
export const radius = 0.035;

const circleFactor = 5 / 7;
const squareFactor = 9 / 7;
const triangleFactor = 1;
const octFactor = 3 / 4;

const circleRadius = radius * circleFactor;
const squareCorner = squareFactor * radius;
const triangleRadius = triangleFactor * radius;
const triTop = triangleRadius - triangleRadius / 10;
const triLeft = Math.sin((2 / 3) * Math.PI) * triangleRadius;
const triBottom = Math.cos((2 / 3) * Math.PI) * triangleRadius - triangleRadius / 10;

const octRadius = radius * octFactor;
const octLarge = Math.cos(Math.PI / 8) * octRadius;
const octSmall = Math.sin(Math.PI / 8) * octRadius;

export const quadrantInfo: Record<
	RadarQuadrant,
	{
		title: string;
		Component: typeof import('*.mdx')['default'];
		range: [number, number];
		template: JSX.Element;
		direction: [x: number, y: number];
	}
> = {
	tools: {
		title: 'Tools',
		Component: ToolsComponent,
		range: [0, Math.PI * 0.5],
		template: <circle r={circleRadius} className="fill-emerald-500" />,
		direction: [-1, 1],
	},
	techniques: {
		title: 'Techniques',
		Component: TechniquesComponent,
		range: [Math.PI * 0.5, Math.PI * 1],
		template: (
			<rect
				x={-squareCorner / 2}
				y={-squareCorner / 2}
				width={squareCorner}
				height={squareCorner}
				className="fill-blue-700"
			/>
		),
		direction: [1, 1],
	},
	'languages-and-frameworks': {
		title: 'Languages and Frameworks',
		Component: LanguagesAndFrameworksComponent,
		range: [Math.PI * 1.5, Math.PI * 2],
		template: (
			<path
				d={`M${octLarge},${octSmall}L${octSmall},${octLarge}L${-octSmall},${octLarge}L${-octLarge},${octSmall}L${-octLarge},${-octSmall}L${-octSmall},${-octLarge}L${octSmall},${-octLarge}L${octLarge},${-octSmall}z`}
				className="fill-violet-600"
			/>
		),
		direction: [-1, -1],
	},
	platforms: {
		title: 'Platforms',
		Component: PlatformsComponent,
		range: [Math.PI * 1, Math.PI * 1.5],
		template: (
			<path d={`M0,${-triTop}L${triLeft},${-triBottom}L-${triLeft},${-triBottom}Z`} className="fill-amber-700" />
		),
		direction: [1, -1],
	},
};
