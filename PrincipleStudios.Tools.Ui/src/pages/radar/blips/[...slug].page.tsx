import { GetStaticPathsResult, GetStaticProps, GetStaticPropsResult } from 'next';
import { getMDXComponent } from 'mdx-bundler/client';
import { useMDXComponents } from '@mdx-js/react';
import { useMemo } from 'react';
import { Headings } from 'src/components/headings';
import Layout from 'src/components/layouts/article-layout';
import { getAllRadarBlips, getBlipBySlug } from '../../../radar/load';
import { RadarBlip } from '../../../radar/types';

type BlipProps = {
	blip: RadarBlip;
};

export default function RadarBlipComponent({ blip }: BlipProps) {
	const components = useMDXComponents();
	const Component = useMemo(() => getMDXComponent(blip.code), [blip.code]);
	return (
		<Layout>
			<Headings.h1>{blip.frontmatter.title}</Headings.h1>
			<div>
				<Component components={components} />
			</div>
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
