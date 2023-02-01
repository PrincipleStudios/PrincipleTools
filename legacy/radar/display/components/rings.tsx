import React from 'react';
import { ringInfo } from '../../ring-info';
import { radarRelativeSize } from '../constants';

export function Rings() {
	return (
		<g className="fill-white stroke-black stroke-1">
			<circle cx={0} cy={0} r={ringInfo.hold.range[1] * radarRelativeSize} />
			<circle cx={0} cy={0} r={ringInfo.assess.range[1] * radarRelativeSize} />
			<circle cx={0} cy={0} r={ringInfo.trial.range[1] * radarRelativeSize} />
			<circle cx={0} cy={0} r={ringInfo.adopt.range[1] * radarRelativeSize} />
		</g>
	);
}
