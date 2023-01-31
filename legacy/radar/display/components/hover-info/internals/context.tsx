import { createContext, useContext, useCallback } from 'react';
import { BehaviorSubject } from 'rxjs';

type TooltipData = { content: React.ReactNode; target: Element };
export const tooltipServiceContext = createContext(new BehaviorSubject<null | TooltipData>(null));

export function useTooltipService() {
	const subject = useContext(tooltipServiceContext);
	return [
		useCallback((content: TooltipData) => subject.next(content), [subject]),
		useCallback(() => subject.next(null), [subject]),
	] as const;
}
