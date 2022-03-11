import { ComponentStory, ComponentMeta } from '@storybook/react';
import Page from './index.page';

export default {
	title: 'Pages/Index',
	component: Page,
} as ComponentMeta<typeof Page>;

const Template: ComponentStory<typeof Page> = (args) => <Page {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
