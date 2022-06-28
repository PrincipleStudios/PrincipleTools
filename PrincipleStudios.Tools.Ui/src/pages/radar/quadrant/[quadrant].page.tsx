import { GetStaticPathsResult, GetStaticProps, GetStaticPropsResult } from 'next';
import { useMemo } from 'react';
import { Headings } from 'src/components/headings';
import Layout from 'src/components/layouts/article-layout';
import { getAllRadarBlips, getBlipBySlug } from 'src/radar/load';
import { Quadrant, quadrantInfo, RadarBlip, RadarBlipSummary, RadarQuadrant, radarQuadrants } from 'src/radar';
import { headingsByBaseNumber, MdxComponentFromCode } from 'src/components/mdx';
import { BlipSvg } from 'src/radar/display/components/blip-svg';
import { RingsLabel } from 'src/radar/display/rings-label';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ChevronLeft from '@heroicons/react/solid/ChevronLeftIcon';
import { ringInfo } from 'src/radar/ring-info';
import Head from 'next/head';

type QuadrantStaticProps = {
	quadrant: RadarQuadrant;
};

type QuadrantProps = {
	quadrant: RadarQuadrant;
	blips: RadarBlip[];
};

export default function RadarQuadrantComponent({ quadrant, blips }: QuadrantProps) {
	const router = useRouter();
	const headings = useMemo(() => headingsByBaseNumber(3), []);
	const {
		title,
		Component,
		direction: [dirX, dirY],
	} = quadrantInfo[quadrant];
	return (
		<Layout>
			<Head>
				<title>Principle Studios Technology Radar: {title}</title>
			</Head>
			<div className="lg:relative">
				<div className="lg:sticky lg:top-24 lg:float-right lg:w-128">
					<Headings.h1 className="my-4">Technology Radar: {title}</Headings.h1>
					{dirY < 0 ? (
						<div className="font-bold text-xs">
							<RingsLabel reverse={dirX > 0} className="align-top w-128 mr-4" />
						</div>
					) : null}
					<Quadrant
						blips={blips}
						quadrant={quadrant}
						className="max-w-full lg:w-128 lg:h-128 inline-block"
						onClickBlip={blipClicked}
					/>
					{dirY > 0 ? (
						<div className="font-bold text-xs">
							<RingsLabel reverse={dirX > 0} className="align-top w-128 mr-4" />
						</div>
					) : null}
					<p className="my-4">
						<Link href="..">
							<a>
								<ChevronLeft className="inline-block align-middle h-4 w-4" /> Back to full radar
							</a>
						</Link>
					</p>
					<Component />
				</div>
				<div className="lg:w-1/2">
					{blips.map((b) => (
						<article key={b.slug} className="my-4 relative">
							<div id={b.slug} className="absolute -top-24" />
							<Headings.h2>
								<BlipSvg className="inline-block w-8 -m-1 align-bottom" quadrant={quadrant} index={b.index} />{' '}
								{b.frontmatter.title}
							</Headings.h2>
							<p className="my-2">
								<span className="font-bold">Current Recommendation:</span> {ringInfo[b.frontmatter.ring].title}
							</p>
							<MdxComponentFromCode code={b.code} components={headings} />
						</article>
					))}
				</div>
				<div className="clear-both" />
			</div>
		</Layout>
	);

	function blipClicked(blipSummary: RadarBlipSummary, ev: React.MouseEvent) {
		ev.preventDefault();
		ev.stopPropagation();

		router.push(`#${blipSummary.slug}`);
	}
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
