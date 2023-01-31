import { Headings } from '@/components/headings';

export function Guides() {
	return (
		<>
			<Headings.h2>Guides</Headings.h2>
			<ul className="list-disc ml-6">
				<li className="my-1">
					<a href="/branching/" className="underline">
						Branching Strategies
					</a>
				</li>
			</ul>
		</>
	);
}
