import { twMerge } from 'tailwind-merge';

export function mergeComponent<
	T extends keyof JSX.IntrinsicElements = keyof JSX.IntrinsicElements
>({
	type: Type,
	props: { className: templateClassName, ...templateProps },
}: JSX.Element) {
	return function MergedComponent({
		className,
		...props
	}: JSX.IntrinsicElements[T]) {
		return (
			<Type
				className={twMerge(templateClassName, className)}
				{...templateProps}
				{...props}
			/>
		);
	};
}
