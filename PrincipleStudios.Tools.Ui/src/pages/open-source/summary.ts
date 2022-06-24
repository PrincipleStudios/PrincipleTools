import { readFileSync } from 'fs';
import { join } from 'path';
import { globAsPromise } from '../../utils/globAsPromise';

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
