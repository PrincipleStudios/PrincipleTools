import type { MDXInstance } from 'astro';
import { join, basename, extname } from 'node:path';
import { exec } from 'node:child_process';
import { uniq } from 'lodash/fp';
import { format } from 'date-fns';

function execAsync(command: string) {
	return new Promise<string>((resolve, reject) =>
		exec(command, (error, stdout, stderr) =>
			error ? reject({ stdout, stderr }) : resolve(stdout)
		)
	);
}

export type AdrFrontmatter = {
	title?: string;
};

export type AdrEntry = {
	title: string;
	slug: string;
	lastModifiedDate: Date | undefined;
	lastModifiedDateText: string;
	authors: string[];
} & MDXInstance<AdrFrontmatter>;

// git log --pretty=format:"%aI %an" -- adr/01-branching-strategies.mdx > temp.txt
export async function getAllAdrs(): Promise<AdrEntry[]> {
	const dirUrl = join(process.cwd(), '../adr');
	const adrs = await Promise.all(
		Object.values(
			import.meta.glob<MDXInstance<AdrFrontmatter>>(`/../adr/*.mdx`)
		).map((v) => v())
	);

	return (
		await Promise.all(
			adrs.map(async (adr) => {
				const slug = basename(
					adr.file?.substring(dirUrl.length + 1),
					extname(adr.file)
				);
				const gitHistory = await execAsync(
					// <date in strict ISO-8601 format> <author name>
					`git log --pretty=format:"%aI %an" -- ../adr/${slug}.mdx`
				);
				const entries = gitHistory.split('\n');
				const commits = entries
					.map((e) => e.split(' '))
					.map(([date, ...author]) => ({ date, author: author.join(' ') }));
				const authors = uniq(commits.map((c) => c.author).reverse());

				const lastModifiedDate = commits[0]?.date
					? new Date(commits[0].date)
					: undefined;

				return {
					title:
						adr.frontmatter?.title ??
						adr.getHeadings()[0]?.text ??
						'No title found',
					lastModifiedDate,
					lastModifiedDateText: lastModifiedDate
						? format(lastModifiedDate, 'MMMM d, yyyy')
						: 'Unknown',
					authors,
					slug,
					...adr,
				};
			})
		)
	).sort((a, b) => a.slug.localeCompare(b.slug));
}
