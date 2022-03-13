import classNames from 'classnames';
import { ReactNode } from 'react';

const Spaced = ({ className, children }: { className?: string; children: ReactNode }) => (
	<div className={classNames(className, 'max-w-screen-2xl mx-auto')}>{children}</div>
);

export default Spaced;
