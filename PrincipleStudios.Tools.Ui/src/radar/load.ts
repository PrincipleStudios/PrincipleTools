import fs from 'fs';
import path from 'path';
import { bundleMDX } from 'mdx-bundler';
import { remarkMdxImages } from 'remark-mdx-images';
import remarkUnwrapImages from 'remark-unwrap-images';
import rehypeHighlight from 'rehype-highlight';
import { globAsPromise } from 'src/utils/globAsPromise';
import { RadarBlip, RadarBlipSummary, radarQuadrants, radarRings } from './types';

const radarDataFsRoot = path.join(process.cwd(), 'src/radar/data');
const publicBundleFsRoot = path.join(process.cwd(), 'public/radar/blips');
const publicBundlePath = '/radar/blips/';

const suffixes = ['/index.md', '/index.mdx', '.md', '.mdx'];

let allBlipFiles: undefined | string[];

async function getAllBlipFiles() {
	const matchingFiles =
		allBlipFiles ??
		(
			await Promise.all([
				globAsPromise('**/*.md', { cwd: radarDataFsRoot }),
				globAsPromise('**/*.mdx', { cwd: radarDataFsRoot }),
			])
		)
			.flat()
			.sort();
	allBlipFiles = matchingFiles;
	return allBlipFiles;
}

async function indexFromFile(relativePath: string) {
	const all = await getAllBlipFiles();
	const index = all.indexOf(relativePath);
	console.log({ all, relativePath, index });
	return index + 1;
}

function slugToFile(slug: string) {
	const suffix = suffixes.find((suffix) => fs.existsSync(path.join(radarDataFsRoot, slug + suffix)));
	if (!suffix) throw new Error(`Could not find file ${slug} for any expected suffix: ${suffixes}`);
	return slug + suffix;
}

function fileToSlug(relativePath: string) {
	const suffix = suffixes.find((suffix) => relativePath.endsWith(suffix));
	if (!suffix) throw new Error(`Passed file ${relativePath} did not end with an expected suffix: ${suffixes}`);
	const slug = relativePath.substring(0, relativePath.length - suffix.length);
	return slug;
}

export async function getBlipBySlug(slug: string): Promise<RadarBlip> {
	const relativePath = slugToFile(slug);
	return getBlipByFilePath(relativePath);
}

async function getBlipByFilePath(relativePath: string): Promise<RadarBlip> {
	const slug = fileToSlug(relativePath);
	const fsDir = path.dirname(path.join(radarDataFsRoot, relativePath));
	const fileContent = fs.readFileSync(path.join(radarDataFsRoot, relativePath));

	const { code, frontmatter } = await bundleMDX({
		cwd: fsDir,
		bundleDirectory: publicBundleFsRoot,
		bundlePath: publicBundlePath,
		source: fileContent.toString(),
		globals: {
			Figure: 'Figure',
			Figcaption: 'Figcaption',
		},
		mdxOptions(options) {
			options.rehypePlugins = [...(options.rehypePlugins ?? []), [rehypeHighlight, { languages: {} }]];
			options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkUnwrapImages, remarkMdxImages as never];
			return options;
		},
		esbuildOptions: (options) => {
			options.loader = {
				...options.loader,
				'.png': 'file',
				'.svg': 'file',
				'.jpg': 'file',
			};

			return options;
		},
	});

	if (!radarRings.includes(frontmatter.ring)) {
		throw new Error(`Invalid ring found for ${slug}. Got ${frontmatter.ring}, expected one of: ${radarRings}`);
	}
	if (!radarQuadrants.includes(frontmatter.quadrant)) {
		throw new Error(
			`Invalid quadrant found for ${slug}. Got ${frontmatter.quadrant}, expected one of: ${radarQuadrants}`
		);
	}

	return {
		index: await indexFromFile(relativePath),
		slug,
		code,
		frontmatter: {
			title: frontmatter.title,
			ring: frontmatter.ring,
			quadrant: frontmatter.quadrant,
		},
	};
}

export async function getAllRadarBlips() {
	const posts = (await Promise.all((await getAllBlipFiles()).map((relativePath) => getBlipByFilePath(relativePath))))
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		.map(({ code, ...rest }): RadarBlipSummary => rest);

	return posts;
}
