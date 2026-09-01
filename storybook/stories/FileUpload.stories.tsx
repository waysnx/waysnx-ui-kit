import type { Meta, StoryObj } from '@storybook/react';
import { FileUpload } from '@waysnx/ui-core';
import { TestBadge } from './TestBadge';

const meta = {
  title: 'Components/FileUpload',
  component: FileUpload,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    accept: {
      control: 'text',
      description: 'Accepted file types',
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple files',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the upload',
    },
  },
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="FileUpload" />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    accept: '*',
  },
};

export const ImageOnly: Story = {
  args: {
    accept: 'image/*',
  },
};

export const Multiple: Story = {
  args: {
    accept: '*',
    multiple: true,
  },
};

export const Disabled: Story = {
  args: {
    accept: '*',
    disabled: true,
  },
};

export const PDFOnly: Story = {
  args: {
    accept: '.pdf',
  },
};
