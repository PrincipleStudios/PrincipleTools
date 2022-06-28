import { useState, useContext, useEffect } from 'react';
import { tooltipServiceContext } from './context';

export function useTooltipData() {
	const subject = useContext(tooltipServiceContext);
	const [state, setState] = useState(subject.value);

	useEffect(() => {
		const subscription = subject.subscribe((value) => {
			setState(value);
		});
		return () => {
			subscription.unsubscribe();
		};
	}, [subject]);

	return state;
}
