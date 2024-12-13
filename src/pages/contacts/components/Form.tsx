import { useIntl } from "react-intl";
import {
  CalendarIcon,
  GitForkIcon,
  MailIcon,
  MapIcon,
  MapPinIcon,
  ShieldCheckIcon,
  UserPenIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import Upload from "@/components/ui/upload";

export default function Form({ type }: { type: number }) {
  const intl = useIntl();

  return (
    <div className="flex flex-col gap-3 w-full">
      <Input
        icon={<GitForkIcon className="w-5 h-5 text-text-300" strokeWidth={1} />}
        label={intl.formatMessage({
          id: "Node ID",
          defaultMessage: "Node ID",
          description: "Node ID input label",
        })}
        type="text"
        required
      />

      <Input
        icon={<UserPenIcon className="w-5 h-5 text-text-300" strokeWidth={1} />}
        label={intl.formatMessage({
          id: "Name",
          defaultMessage: type === 0 ? "Legal full name" : "Legal company name",
          description: "Name input label",
        })}
        type="text"
        required
      />

      <Input
        icon={<MailIcon className="w-5 h-5 text-text-300" strokeWidth={1} />}
        label={intl.formatMessage({
          id: "Email address",
          defaultMessage: "Email address",
          description: "Email input label",
        })}
        type="email"
        required
      />

      <Input
        icon={<MapPinIcon className="w-5 h-5 text-text-300" strokeWidth={1} />}
        label={intl.formatMessage({
          id: "Postal address",
          defaultMessage: "Postal address",
          description: "Address input label",
        })}
        type="text"
        required
      />

      <Input
        icon={
          <CalendarIcon className="w-5 h-5 text-text-300" strokeWidth={1} />
        }
        label={intl.formatMessage({
          id: "Registration date (MM/DD/YYYY)",
          defaultMessage: "Registration date (MM/DD/YYYY)",
          description: "Registration date in contact form",
        })}
        type="text"
      />

      <Input
        icon={<MapIcon className="w-5 h-5 text-text-300" strokeWidth={1} />}
        label={intl.formatMessage({
          id: "City",
          defaultMessage: type === 0 ? "City of birth" : "City of registration",
          description: "City input label",
        })}
        type="text"
      />

      <Input
        icon={
          <ShieldCheckIcon className="w-5 h-5 text-text-300" strokeWidth={1} />
        }
        label={intl.formatMessage({
          id: "Identification number",
          defaultMessage:
            type === 0 ? "Social security number" : "Registration number",
          description: "Identification number input label",
        })}
        type="text"
      />

      <Upload />
    </div>
  );
}
