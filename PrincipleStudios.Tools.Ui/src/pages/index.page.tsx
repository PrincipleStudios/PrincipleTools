import { GetStaticProps } from 'next';
import Head from 'next/head';
import { Headings } from 'src/components/headings';
import Layout from 'src/components/layouts/article-layout';
import { getAllPackages, OpenSourcePackageSummary } from 'src/open-source/summary';
import { Guides } from 'src/page-components/index/components/guides';
import { OpenSourcePackages } from 'src/page-components/index/components/open-source-packages';
import { RadarBlipSummary, TechnologyRadar } from 'src/radar';
import { getAllRadarBlips } from '../radar/load';

type IndexProps = {
	openSourcePackages: OpenSourcePackageSummary[];
	blips: RadarBlipSummary[];
};

const IndexPage = ({ openSourcePackages, blips }: IndexProps) => {
	return (
		<Layout>
			<Head>
				<title>Principle Studios Tools</title>
			</Head>
			<Headings.h1>Principle Studios Tools</Headings.h1>
			<p>A set of resources by and for Principle Studios team members</p>

			<Guides />
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
