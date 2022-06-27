import { RadarRing } from '../types';

export const ringMapping: Record<RadarRing, { range: [number, number] }> = {
	hold: { range: [0.75, 0.995] },
	assess: { range: [0.5, 0.75] },
	trial: { range: [0.25, 0.5] },
	adopt: { range: [0, 0.25] },
};
