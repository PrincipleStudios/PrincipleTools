import type { MDXInstance } from 'astro';
import { join, basename, extname } from 'node:path';

export type AdrFrontmatter = {
	title?: string;
};

export type AdrEntry = {
	title: string;
	slug: string;
} & MDXInstance<AdrFrontmatter>;

export async function getAllAdrs() {
	const dirUrl = join(process.cwd(), '../adr');
	const adrs = await Promise.all(
		Object.values(
			import.meta.glob<MDXInstance<AdrFrontmatter>>(`../../../../adr/*.mdx`)
		).map((v) => v())
	);

	return adrs.map((adr) => ({
		title:
			adr.frontmatter?.title ?? adr.getHeadings()[0]?.text ?? 'No title found',
		slug: basename(adr.file?.substring(dirUrl.length + 1), extname(adr.file)),
		...adr,
	}));
}
