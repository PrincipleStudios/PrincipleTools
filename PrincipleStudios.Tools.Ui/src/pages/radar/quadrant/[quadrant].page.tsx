import { GetStaticPathsResult, GetStaticProps, GetStaticPropsResult } from 'next';
import { Fragment, useMemo } from 'react';
import { Headings } from 'src/components/headings';
import Layout from 'src/components/layouts/article-layout';
import { getAllRadarBlips, getBlipBySlug } from 'src/radar/load';
import { Quadrant, quadrantInfo, RadarBlip, RadarQuadrant, radarQuadrants } from 'src/radar';
import { headingsByBaseNumber, MdxComponentFromCode } from 'src/components/mdx';
import { BlipSvg } from 'src/radar/display/components/blip-svg';

type QuadrantStaticProps = {
	quadrant: RadarQuadrant;
};

type QuadrantProps = {
	quadrant: RadarQuadrant;
	blips: RadarBlip[];
};

export default function RadarQuadrantComponent({ quadrant, blips }: QuadrantProps) {
	const headings = useMemo(() => headingsByBaseNumber(3), []);
	const { title, Component } = quadrantInfo[quadrant];
	return (
		<Layout>
			<div className="lg:relative">
				<div className="lg:sticky lg:top-24 lg:float-right lg:w-128">
					<Headings.h1>{title}</Headings.h1>
					<Quadrant blips={blips} quadrant={quadrant} className="max-w-full lg:w-128 lg:h-128 inline-block" />
					<Component />
				</div>
				<div className="lg:w-1/2">
					{blips.map((b) => (
						<Fragment key={b.slug}>
							<Headings.h2>
								<BlipSvg className="inline-block w-8 -m-1 align-bottom" quadrant={quadrant} index={b.index} />{' '}
								{b.frontmatter.title}
							</Headings.h2>
							<MdxComponentFromCode code={b.code} components={headings} />
						</Fragment>
					))}
				</div>
				<div className="clear-both" />
			</div>
		</Layout>
	);
}

export const getStaticProps: GetStaticProps<QuadrantProps, QuadrantStaticProps> = async ({
	params,
}): Promise<GetStaticPropsResult<QuadrantProps>> => {
	if (!params) throw new Error('Params not provided to get static props');
	const blips = await Promise.all(
		(
			await getAllRadarBlips()
		)
			.filter(({ frontmatter: { quadrant } }) => quadrant === params.quadrant)
			.map(({ slug }) => slug)
			.map(getBlipBySlug)
	);

	return {
		props: {
			quadrant: params.quadrant,
			blips,
		},
	};
};

export const getStaticPaths = async (): Promise<GetStaticPathsResult<QuadrantStaticProps>> => {
	const result = {
		paths: radarQuadrants.map((quadrant) => ({
			params: { quadrant },
		})),
		fallback: false,
	};
	return result;
};
