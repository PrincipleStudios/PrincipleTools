import { GetStaticProps } from 'next';
import Head from 'next/head';
import { Headings } from 'src/components/headings';
import Layout from 'src/components/layouts/article-layout';
import { RadarBlipSummary, TechnologyRadar } from 'src/radar';
import { getAllRadarBlips } from 'src/radar/load';

type IndexProps = {
	blips: RadarBlipSummary[];
};

const IndexPage = ({ blips }: IndexProps) => {
	return (
		<Layout>
			<Head>
				<title>Principle Studios Technology Radar</title>
			</Head>
			<TechnologyRadar blips={blips} Heading={Headings.h1} />
		</Layout>
	);
};

export default IndexPage;

export const getStaticProps: GetStaticProps<IndexProps> = async () => {
	const blips = await getAllRadarBlips();
	return {
		props: { blips },
	};
};
