import { GetStaticProps } from 'next';
import { Headings } from 'src/components/headings';
import Layout from 'src/components/layouts/article-layout';
import { getAllPackages, OpenSourcePackageSummary } from 'src/open-source/summary';
import { OpenSourcePackages } from 'src/page-components/index/components/open-source-packages';
import { TechnologyRadar } from 'src/page-components/index/components/tech-radar';
import { RadarBlipSummary } from 'src/radar';
import { getAllRadarBlips } from '../radar/load';

type IndexProps = {
	openSourcePackages: OpenSourcePackageSummary[];
	blips: RadarBlipSummary[];
};

const IndexPage = ({ openSourcePackages, blips }: IndexProps) => {
	return (
		<Layout>
			<Headings.h1>Principle Studios Tools</Headings.h1>
			<p>A set of resources by and for Principle Studios team members</p>

			<OpenSourcePackages packages={openSourcePackages} />
			<TechnologyRadar blips={blips} />
		</Layout>
	);
};

export default IndexPage;

export const getStaticProps: GetStaticProps<IndexProps> = async () => {
	const openSourcePackages = await getAllPackages();
	const blips = await getAllRadarBlips();
	return {
		props: { openSourcePackages, blips },
	};
};
