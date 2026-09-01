import type { Meta, StoryObj } from '@storybook/react';
import { SignatureViewer } from '@waysnx/ui-media';
import { TestBadge } from '../TestBadge';

const SAMPLE_SIG = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMTUwIj48cGF0aCBkPSJNMjAgNzAgUTgwIDIwIDE1MCA3MCBUIDI4MCA3MCIgc3Ryb2tlPSIjMWUyOTNiIiBzdHJva2Utd2lkdGg9IjMiIGZpbGw9Im5vbmUiLz48L3N2Zz4=';

const meta = {
  title: 'Media/SignatureViewer',
  component: SignatureViewer,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => (<div><TestBadge componentName="Media" /><Story /></div>)],
} satisfies Meta<typeof SignatureViewer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Verified: Story = { args: { src: SAMPLE_SIG, verified: true, signerName: 'John Doe', signedAt: new Date(), onDownload: () => console.log('Download') } };
export const Unverified: Story = { args: { src: SAMPLE_SIG, verified: false, signerName: 'Jane Smith' } };
export const NoName: Story = { args: { src: SAMPLE_SIG, verified: true } };
