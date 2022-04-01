import { ComponentStory, ComponentMeta } from '@storybook/react';
import Page from './jsx.page';

export default {
	title: 'Pages/Index',
	component: Page,
} as ComponentMeta<typeof Page>;

const Template: ComponentStory<typeof Page> = () => <Page />;

export const Primary = Template.bind({});
Primary.args = {};
