import classNames from 'classnames';
import { groupBy } from 'lodash/fp';
import { Fragment } from 'react';
import { OpenSourcePackageSummary } from 'src/pages/open-source/summary';

export function OpenSourcePackages({ packages: allPackages }: { packages: OpenSourcePackageSummary[] }) {
	const byLanguage = Object.entries(groupBy((pkg) => pkg.language, allPackages));
	return (
		<>
			{byLanguage.map(([language, packages]) => (
				<Fragment key={language}>
					<h2 className={classNames('font-header font-bold', 'mt-4 first:mt-0', 'text-2xl')}>{language}</h2>
					<ul>
						{packages.map((pkg) => (
							<li key={pkg.title}>
								<a href={pkg.url} className="flex items-center gap-1">
									<span className="w-32 flex justify-end">
										<img src={pkg.badgeUrl} alt="To Package Site" />
									</span>
									{pkg.title}
								</a>
							</li>
						))}
					</ul>
				</Fragment>
			))}
		</>
	);
}
