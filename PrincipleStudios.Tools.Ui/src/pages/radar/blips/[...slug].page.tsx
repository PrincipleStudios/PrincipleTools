import { GetStaticPathsResult, GetStaticProps, GetStaticPropsResult } from 'next';
import { useMDXComponents } from '@mdx-js/react';
import { Headings } from 'src/components/headings';
import Layout from 'src/components/layouts/article-layout';
import { getAllRadarBlips, getBlipBySlug } from '../../../radar/load';
import { RadarBlip } from '../../../radar/types';
import { MdxComponentFromCode } from 'src/components/mdx';

type BlipProps = {
	blip: RadarBlip;
};

export default function RadarBlipComponent({ blip }: BlipProps) {
	const components = useMDXComponents();
	return (
		<Layout>
			<Headings.h1>{blip.frontmatter.title}</Headings.h1>
			<MdxComponentFromCode code={blip.code} components={components} />
		</Layout>
	);
}

export const getStaticProps: GetStaticProps<BlipProps, { slug: string }> = async ({
	params,
}): Promise<GetStaticPropsResult<BlipProps>> => {
	if (!params) throw new Error('Params not provided to get static props');
	const blip = await getBlipBySlug(params.slug);

	return {
		props: {
			blip,
		},
	};
};

export const getStaticPaths = async (): Promise<GetStaticPathsResult> => {
	const blips = await getAllRadarBlips();
	const result = {
		paths: blips.map((blip) => ({
			params: { slug: blip.slug.split('/') },
		})),
		fallback: false,
	};
	return result;
};
