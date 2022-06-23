import { GetStaticProps } from 'next';
import { Headings } from 'src/components/headings';
import Layout from 'src/components/layouts/article-layout';
import { getAllPackages, OpenSourcePackageSummary } from 'src/pages/open-source/summary';
import { OpenSourcePackages } from './index/components/open-source-packages';

type IndexProps = {
	openSourcePackages: OpenSourcePackageSummary[];
};

const IndexPage = ({ openSourcePackages }: IndexProps) => {
	return (
		<Layout>
			<Headings.h1>Principle Studios Tools</Headings.h1>
			<p>A set of resources by and for Principle Studios team members</p>
			<OpenSourcePackages packages={openSourcePackages} />
		</Layout>
	);
};

export default IndexPage;

export const getStaticProps: GetStaticProps<IndexProps> = async () => {
	const openSourcePackages = await getAllPackages();
	return {
		props: { openSourcePackages },
	};
};