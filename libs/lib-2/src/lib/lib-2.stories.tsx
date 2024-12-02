import type { Meta, StoryObj } from '@storybook/react';
import { Lib2 } from './lib-2';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof Lib2> = {
  component: Lib2,
  title: 'Lib2',
};
export default meta;
type Story = StoryObj<typeof Lib2>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Lib2!/gi)).toBeTruthy();
  },
};
