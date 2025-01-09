import type { Meta,  StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "./select";

import { ScrollArea } from './scroll-area';

const meta = {
  title: 'Components/Select',
  component: Select,
  args: {
    children: <></>,
    onValueChange: fn()
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="max-w-[375px] w-screen">
      <Select {...args}>
        <SelectTrigger label="label">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
          <SelectContent>
            <ScrollArea className="h-[10rem]">
              <SelectGroup>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
                <SelectItem value="option3">Option 3</SelectItem>
                <SelectItem value="option4">Option 4</SelectItem>
                <SelectItem value="option5">Option 5</SelectItem>
                <SelectItem value="option6">Option 6</SelectItem>
                <SelectItem value="option7">Option 7</SelectItem>
                <SelectItem value="option8">Option 8</SelectItem>
                <SelectItem value="option9">Option 9</SelectItem>
                <SelectItem value="option10">Option 10</SelectItem>
              </SelectGroup>
            </ScrollArea>
          </SelectContent>
      </Select>
    </div>
  ),
};
