import type { Meta, StoryObj } from "@storybook/react";
import Search from "@/components/ui/search";

const meta: Meta<typeof Search> = {
  title: "Components/Search",
  component: Search,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg"],
    },
    onSearch: { action: "searched" },
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Search>;

export const ExtraSmall: Story = {
  args: {
    placeholder: "Search...",
    size: "xs",
  },
};

export const Small: Story = {
  args: {
    placeholder: "Search...",
    size: "sm",
  },
};

export const Medium: Story = {
  args: {
    placeholder: "Search...",
    size: "md",
  },
};

export const Large: Story = {
  args: {
    placeholder: "Search...",
    size: "lg",
  },
};

export const Interactive: Story = {
  args: {
    placeholder: "Type and press enter",
    onSearch: () => {
      alert(`Searching`);
    },
  },
};
