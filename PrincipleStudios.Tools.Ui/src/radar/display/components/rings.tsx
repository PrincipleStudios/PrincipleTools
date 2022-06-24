import React from 'react';
import { ringMapping } from '../radarPositioning';
import { radarRelativeSize } from '../constants';

export function Rings() {
	return (
		<g className="fill-white stroke-black stroke-1">
			<circle cx={0} cy={0} r={ringMapping.hold.range[1] * radarRelativeSize} />
			<circle cx={0} cy={0} r={ringMapping.assess.range[1] * radarRelativeSize} />
			<circle cx={0} cy={0} r={ringMapping.trial.range[1] * radarRelativeSize} />
			<circle cx={0} cy={0} r={ringMapping.adopt.range[1] * radarRelativeSize} />
		</g>
	);
}
