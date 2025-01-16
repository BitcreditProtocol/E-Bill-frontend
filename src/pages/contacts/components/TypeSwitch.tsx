import type { Contact } from "@/types/contact";
import TypeFilter from "./TypeFilter";

type TypeSwitchProps = {
  value: Contact['type'];
  onChange: (value: Contact['type']) => void;
};

export default function TypeSwitch({ value, onChange }: TypeSwitchProps) {
  return (<TypeFilter values={[value]} onChange={(values) => { onChange(values[0]) }} />);
}
