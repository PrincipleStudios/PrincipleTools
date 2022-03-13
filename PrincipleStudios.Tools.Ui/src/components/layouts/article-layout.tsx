import { ReactNode } from 'react';
import { Header } from '../header';
import Spaced from '../spaced';
import { MdxComponents } from '../mdx/mdx-components';

function Layout({ children }: { children?: ReactNode }) {
	return (
		<>
			<div className="h-96 bg-black absolute w-full top-0" />
			<Header className="bg-black text-white" />

			<div className="h-10" />

			<MdxComponents>
				<main className="relative">
					<Spaced className="p-8 bg-white shadow-xl">{children}</Spaced>
				</main>
			</MdxComponents>
		</>
	);
}

export default Layout;
