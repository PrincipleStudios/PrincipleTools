import { useEffect } from 'react';
import { useTooltipService } from './internals/context';

export function useTooltip() {
	const [openTooltip, closeTooltip] = useTooltipService();
	useEffect(() => {
		return () => closeTooltip();
	}, [closeTooltip]);

	return (tooltipContent: React.ReactNode) => ({
		onMouseEnter: (ev: React.MouseEvent) => openTooltip({ content: tooltipContent, target: ev.currentTarget }),
		onMouseLeave: () => closeTooltip(),
		onFocus: (ev: React.FocusEvent) => openTooltip({ content: tooltipContent, target: ev.currentTarget }),
		onBlur: () => closeTooltip(),
		tabIndex: 0,
	});
}
