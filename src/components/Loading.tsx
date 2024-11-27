import { FormattedMessage } from "react-intl";

export default function Loading() {
  return <div className="mx-2 my-4">
    <FormattedMessage
      id="commong.loading.loading"
      defaultMessage="Loading…"
      description="Text on loading screen for lazily loaded screens"
    />
  </div>
}
