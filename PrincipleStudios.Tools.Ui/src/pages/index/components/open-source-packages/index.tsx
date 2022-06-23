import { groupBy } from 'lodash/fp';
import { Fragment } from 'react';
import { Headings } from 'src/components/headings';
import { OpenSourcePackageSummary } from 'src/pages/open-source/summary';

export function OpenSourcePackages({ packages: allPackages }: { packages: OpenSourcePackageSummary[] }) {
	const byLanguage = Object.entries(groupBy((pkg) => pkg.language, allPackages));
	return (
		<>
			<Headings.h2>Open Source Packages</Headings.h2>
			<p className="max-w-xl my-2">
				Principle Studios creates a wide variety of projects, but we don&apos;t re-invent the wheel on each of them. To
				help our developers and clients be more efficient, we occasionally have the opportunity to roll these into
				packages that can be easily installed.
			</p>
			<p className="max-w-xl my-2">See individual packages for licensing information.</p>
			{byLanguage.map(([language, packages]) => (
				<Fragment key={language}>
					<Headings.h3>{language}</Headings.h3>
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
