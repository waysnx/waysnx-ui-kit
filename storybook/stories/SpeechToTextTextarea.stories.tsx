import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SpeechToTextTextarea } from '@waysnx/ui-core';
import { TestBadge } from './TestBadge';

const meta = {
  title: 'Components/SpeechToTextTextarea',
  component: SpeechToTextTextarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the textarea',
    },
    rows: {
      control: 'number',
      description: 'Number of rows',
    },
  },
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="SpeechToTextTextarea" />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SpeechToTextTextarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Click microphone to start speaking...',
    rows: 4,
  },
};

export const WithValue: Story = {
  args: {
    placeholder: 'Click microphone to start speaking...',
    rows: 4,
    defaultValue: 'This is a sample transcribed text from speech',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Click microphone to start speaking...',
    rows: 4,
    disabled: true,
    defaultValue: 'This textarea is disabled',
  },
};

export const LargeTextarea: Story = {
  args: {
    placeholder: 'Click microphone to start speaking...',
    rows: 8,
  },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '400px' }}>
        <SpeechToTextTextarea
          placeholder="Click microphone to start speaking..."
          rows={4}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: '#666' }}>
          <p>Characters: {value.length}</p>
          <p>Words: {value.split(/\s+/).filter(w => w.length > 0).length}</p>
        </div>
        <p style={{ fontSize: '12px', color: '#999' }}>
          💡 Tip: Click the microphone icon to start voice recording
        </p>
      </div>
    );
  },
};

export const WithNotes: Story = {
  render: () => {
    const [notes, setNotes] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '400px' }}>
        <label style={{ fontWeight: 'bold', fontSize: '14px' }}>Meeting Notes</label>
        <SpeechToTextTextarea
          placeholder="Click microphone to record meeting notes..."
          rows={6}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <div style={{ fontSize: '12px', color: '#666', padding: '8px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
          <strong>Preview:</strong>
          <p>{notes || 'Your notes will appear here...'}</p>
        </div>
      </div>
    );
  },
};
