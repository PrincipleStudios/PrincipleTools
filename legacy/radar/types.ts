export const radarRings = ['hold', 'assess', 'trial', 'adopt'] as const;
export type RadarRing = typeof radarRings[number];

export const radarQuadrants = ['tools', 'techniques', 'languages-and-frameworks', 'platforms'] as const;
export type RadarQuadrant = typeof radarQuadrants[number];

export type RadarBlip = {
	index: number;
	slug: string;
	code: string;
	frontmatter: {
		title: string;
		ring: RadarRing;
		quadrant: RadarQuadrant;
		lastUpdate: string;
	};
};
export type RadarBlipSummary = Omit<RadarBlip, 'code'>;

export type PositionedRadarBlip = RadarBlipSummary & { x: number; y: number };
