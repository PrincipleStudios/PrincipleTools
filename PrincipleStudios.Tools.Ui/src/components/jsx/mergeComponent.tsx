import { twMerge } from 'tailwind-merge';

/**
 * Creates a new React FunctionComponent that mimics a standard html
 * element, but merges in extra styles and classes while allowing them
 * to be overridden in the final component.
 */
export function mergeComponent<
	T extends keyof JSX.IntrinsicElements = keyof JSX.IntrinsicElements
>(
	{
		type: Type,
		props: {
			className: templateClassName,
			style: templateStyle,
			...templateProps
		},
	}: JSX.Element,
	name: string | null = null
): React.FunctionComponent<JSX.IntrinsicElements[T]> {
	function MergedComponent({
		className,
		style,
		...props
	}: JSX.IntrinsicElements[T]) {
		return (
			<Type
				className={twMerge(templateClassName, className)}
				style={templateStyle && style ? { ...templateStyle, style } : undefined}
				{...templateProps}
				{...props}
			/>
		);
	}
	if (name) MergedComponent.displayName = name;
	return MergedComponent;
}
