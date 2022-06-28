import Head from 'next/head';
import { AppProps } from 'next/app';
import './_app.styles.css';
import { TooltipDisplay } from 'src/radar/display/components/hover-info/display';

function MyApp({ Component, pageProps }: Pick<AppProps, 'Component' | 'pageProps'>) {
	return (
		<>
			<Head>
				<title>NextJS TailwindCSS TypeScript Starter</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<link rel="shortcut icon" href="/favicon.ico" />
			</Head>
			<Component {...pageProps} />
			<TooltipDisplay />
		</>
	);
}

export default MyApp;
