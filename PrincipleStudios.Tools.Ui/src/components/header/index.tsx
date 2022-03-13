import classNames from 'classnames';
import Link from 'next/link';
import Spaced from '../spaced';
import Logo from './principle-logo.component.svg';

export const Header = ({ className }: { className?: string }) => {
	return (
		<>
			<header className={classNames('fixed top-0 w-full z-10', className)}>
				<Spaced className="flex justify-between">
					<div className="flex">
						<Link href="/">
							<a className="justify-self-end">
								<Logo className="h-20" alt="Home" />
							</a>
						</Link>

						<nav className="flex justify-between items-center ml-3">{/* <span className="px-6">Home</span> */}</nav>
					</div>
				</Spaced>
			</header>
			<div className="h-20" />
		</>
	);
};
