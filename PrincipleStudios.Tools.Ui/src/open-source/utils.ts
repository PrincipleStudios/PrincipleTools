type OpenSourcePackageJson = {
	title: string;
	language: string;
	packageUrl: string;
	badge: string;
};

export type OpenSourcePackageSummary = {
	title: string;
	language: string;
	url: string;
	badgeUrl: string;
};

export async function getAllPackages(): Promise<OpenSourcePackageSummary[]> {
	const matchingFiles = await Promise.all(
		Object.values(import.meta.glob<OpenSourcePackageJson>('./**/*.json')).map(
			(v) => v()
		)
	);
	return await Promise.all(
		matchingFiles.map((packageInfo) => ({
			title: packageInfo.title,
			language: packageInfo.language,
			url: packageInfo.packageUrl,
			badgeUrl: packageInfo.badge,
		}))
	);
}
