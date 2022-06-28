import Head from 'next/head';
import { AppProps } from 'next/app';
import './_app.styles.css';
import { TooltipDisplay } from 'src/radar/display/components/hover-info/display';
import { PullRequestToast } from 'src/components/pull-request-toast';

function MyApp({ Component, pageProps }: Pick<AppProps, 'Component' | 'pageProps'>) {
	const prId = Number(process.env.NEXT_PUBLIC_PR_ID);
	return (
		<>
			<Head>
				<title>NextJS TailwindCSS TypeScript Starter</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<link rel="shortcut icon" href="/favicon.ico" />
			</Head>
			<Component {...pageProps} />
			<TooltipDisplay />
			{isNaN(prId) ? null : <PullRequestToast prId={prId} />}
		</>
	);
}

export default MyApp;
