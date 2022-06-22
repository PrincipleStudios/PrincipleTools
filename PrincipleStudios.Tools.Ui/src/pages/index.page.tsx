import classNames from 'classnames';
import { GetStaticProps } from 'next';
import Layout from 'src/components/layouts/article-layout';
import { getAllPackages, OpenSourcePackageSummary } from 'src/pages/open-source/summary';
import { OpenSourcePackages } from './index/components/open-source-packages';

type IndexProps = {
	openSourcePackages: OpenSourcePackageSummary[];
};

const IndexPage = ({ openSourcePackages }: IndexProps) => {
	return (
		<Layout>
			<h1 className={classNames('font-header font-bold', 'mt-4 first:mt-0', 'text-3xl')}>Open Source Packages</h1>
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
