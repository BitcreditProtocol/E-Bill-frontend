import IdentityAvatar from "@/components/IdentityAvatar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useIdentity } from "@/context/identity/IdentityContext";
import type { Identity } from "@/types/identity";

type IdentityOptionProps = Pick<
  Identity,
  "type" | "name" | "postal_address" | "node_id"
>;

export default function IdentityOption({
  type,
  name,
  postal_address,
  node_id,
}: IdentityOptionProps) {
  const { identity, setIdentity } = useIdentity();
  const isSelected = identity.node_id === node_id;

  return (
    <div
      className="flex items-center justify-between h-[74px] py-4 px-3 border border-divider-75 rounded-lg cursor-pointer"
      onClick={() => {
        setIdentity(node_id);
      }}
    >
      <div className="flex gap-3">
        <IdentityAvatar name={name} picture="" identityType={type} size="md" />

        <div className="flex flex-col">
          <span className="text-base font-medium text-text-300 leading-6">
            {name}
          </span>
          <span className="text-xs text-text-200 leading-[18px]">
            {postal_address}
          </span>
        </div>
      </div>

      <RadioGroup>
        <RadioGroupItem value={name} checked={isSelected} />
      </RadioGroup>
    </div>
  );
}
