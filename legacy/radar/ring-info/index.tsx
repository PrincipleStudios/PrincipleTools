import { RadarRing } from '../types';

export const ringInfo: Record<RadarRing, { title: string; range: [number, number] }> = {
	hold: {
		title: 'Hold',
		range: [0.75, 0.995],
	},
	assess: {
		title: 'Assess',
		range: [0.5, 0.75],
	},
	trial: {
		title: 'Trial',
		range: [0.25, 0.5],
	},
	adopt: {
		title: 'Adopt',
		range: [0, 0.25],
	},
};
