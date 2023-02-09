import ExclamationCircle from '@heroicons/react/24/outline/ExclamationCircleIcon';

export function PullRequestToast({ prId }: { prId: number }) {
	return (
		<div className="z-20 bg-white text-black self-start hidden md:block">
			<p className="m-2">
				<ExclamationCircle className="text-amber-600 h-6 w-6 inline-block align-middle mb-1 mr-2" />
				This is a pull request!{' '}
				<a
					className="inline-block bg-emerald-200 border border-emerald-700 py-2 px-3 ml-2"
					href={`https://github.com/PrincipleStudios/PrincipleTools/pull/${prId}`}
					target="_blank"
					rel="noreferrer"
				>
					Approve Me!
				</a>
			</p>
		</div>
	);
}
