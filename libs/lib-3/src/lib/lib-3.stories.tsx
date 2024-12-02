import type { Meta, StoryObj } from '@storybook/react';
import { Lib3 } from './lib-3';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof Lib3> = {
  component: Lib3,
  title: 'Lib3',
};
export default meta;
type Story = StoryObj<typeof Lib3>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Lib3!/gi)).toBeTruthy();
  },
};
