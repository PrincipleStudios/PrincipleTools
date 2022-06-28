import glob from 'glob';

export function globAsPromise(pattern: string, options: glob.IOptions) {
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
