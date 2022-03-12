import Head from 'next/head';
import { AppProps } from 'next/app';
import './_app.styles.css';

function MyApp({ Component, pageProps }: Pick<AppProps, 'Component' | 'pageProps'>) {
	return (
		<>
			<Head>
				<title>NextJS TailwindCSS TypeScript Starter</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
