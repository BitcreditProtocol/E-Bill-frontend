import { FormattedMessage, useIntl } from "react-intl";

function Property({
  label,
  value,
}: {
  label: string;
  value: string | React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-text-200 text-xs font-normal leading-[18px]">
        {label}
      </span>
      {typeof value === "string" ? (
        <span className="text-text-300 text-sm font-medium leading-5">
          {value}
        </span>
      ) : (
        value
      )}
    </div>
  );
}

export default function Preview() {
  const intl = useIntl();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-text-300 font-medium text-2xl leading-8">
          <FormattedMessage
            id="Preview company"
            defaultMessage="Preview company"
            description="Header title for preview company page"
          />
        </h1>

        <span className="text-text-200 text-base text-center leading-6 mx-3">
          <FormattedMessage
            id="Make it easier to create bills with colleagues from your company"
            defaultMessage="Make it easier to create bills with colleagues from your company"
            description="Header subtitle for create company page"
          />
        </span>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4"></div>

        <div className="flex flex-col gap-3 py-6 px-5 border border-divider-75 rounded-xl">
          <Property
            label={intl.formatMessage({
              id: "Email address",
              defaultMessage: "Email address",
              description: "Label for email address",
            })}
            value={"gg@gg.com"}
          />
        </div>
      </div>
    </div>
  );
}
