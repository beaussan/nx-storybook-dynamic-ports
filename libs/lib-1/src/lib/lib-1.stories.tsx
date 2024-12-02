import type { Meta, StoryObj } from '@storybook/react';
import { Lib1 } from './lib-1';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof Lib1> = {
  component: Lib1,
  title: 'Lib1',
};
export default meta;
type Story = StoryObj<typeof Lib1>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Lib1!/gi)).toBeTruthy();
  },
};
