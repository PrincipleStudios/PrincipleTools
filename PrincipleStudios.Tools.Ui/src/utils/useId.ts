import { v4 as uuid } from 'uuid';
import { useRef } from 'react';

export function useId() {
	// TODO - swap this out with React18's useId
	return useRef(uuid()).current;
}
