import { readFileSync } from 'fs';
import glob from 'glob';
import { join } from 'path';

const osEntriesFsRoot = join(process.cwd(), 'src/pages/open-source');

export type OpenSourcePackageSummary = {
	title: string;
	language: string;
	url: string;
	badgeUrl: string;
};

export async function getAllPackages(): Promise<OpenSourcePackageSummary[]> {
	const matchingFiles = await globAsPromise('**/*.json', { cwd: osEntriesFsRoot });
	return await Promise.all(matchingFiles.map((path) => summarize(path)));
}

async function summarize(path: string): Promise<OpenSourcePackageSummary> {
	const absolutePath = join(osEntriesFsRoot, path);
	const fileContent = readFileSync(absolutePath).toString();
	const packageInfo = JSON.parse(fileContent) as Record<
		'packageUrl' | 'projectUrl' | 'badge' | 'title' | 'language',
		string
	>;

	return {
		title: packageInfo.title,
		language: packageInfo.language,
		url: packageInfo.packageUrl,
		badgeUrl: packageInfo.badge,
	};
}

function globAsPromise(pattern: string, options: glob.IOptions) {
	return new Promise<string[]>((resolve, reject) =>
		glob(pattern, options, function (err, matches) {
			if (err) {
				reject(err);
			} else {
				resolve(matches);
			}
		})
	);
}
