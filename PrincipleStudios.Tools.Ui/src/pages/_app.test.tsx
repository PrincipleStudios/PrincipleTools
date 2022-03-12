import App from './_app.page';
import { render } from '@testing-library/react';

describe('app default page layout', () => {
	it('renders children', async () => {
		// arrange
		const Component = () => <div>Children</div>;

		// act
		const { container } = render(<App pageProps={{}} Component={Component} />);

		// assert
		expect(container).toContainHTML(`Children`);
	});
});
