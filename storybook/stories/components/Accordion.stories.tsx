import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionItem } from '@waysnx/ui-layout';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="Accordion" />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Accordion>
      <AccordionItem id="1" title="Item 1">
        Body 1
      </AccordionItem>
      <AccordionItem id="2" title="Item 2">
        Body 2
      </AccordionItem>
    </Accordion>
  ),
};
