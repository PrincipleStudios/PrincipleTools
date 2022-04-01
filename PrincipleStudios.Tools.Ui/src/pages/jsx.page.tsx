import Layout from 'src/components/layouts/article-layout';

export default function Home() {
	return (
		<>
			<Layout>
				<h1 className="font-mono text-xl code">
					Welcome to <span className="text-blue-900">Principle.tools</span>
				</h1>
			</Layout>
		</>
	);
}
