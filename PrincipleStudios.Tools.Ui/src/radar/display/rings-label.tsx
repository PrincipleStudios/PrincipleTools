import classNames from 'classnames';
import { sortBy } from 'lodash';
import { ringInfo } from 'src/radar/ring-info';

export function RingsLabel({ className, reverse }: { className?: string; reverse?: boolean }) {
	return (
		<div className={classNames(className, 'inline-block relative')}>
			{sortBy(Object.entries(ringInfo), ([, info]) => (reverse ? -info.range[0] : info.range[0])).map(([key, info]) => (
				<div
					key={key}
					className="absolute top-0 text-center"
					style={{
						left: `${(reverse ? 1 - info.range[1] : info.range[0]) * 100}%`,
						width: `${(info.range[1] - info.range[0]) * 100}%`,
					}}>
					{info.title}
				</div>
			))}
		</div>
	);
}
