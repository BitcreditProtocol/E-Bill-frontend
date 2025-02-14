import { Suspense, useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";
import { parseISO, isToday, isBefore, startOfToday, format } from "date-fns";
import { FormattedMessage } from "react-intl";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import Page from "@/components/wrappers/Page";
import { Separator } from "@/components/ui/separator";
import { getNotifications } from "@/services/notifications";
import routes from "@/constants/routes";
import createBillIllustration from "@/assets/create-bill-illustration.svg";
import type { Notification, NotificationActionType} from "@/types/notification";
import { FormattedCurrency } from "@/components/FormattedCurrency";
import { Skeleton } from "@/components/ui/skeleton";
import TypeFilter from "./notifications/components/TypeFilter";

type NotificationProps = Pick<
  Notification,
  "id" | "description" | "datetime" | "active" | "payload"
>;

function Notification({
  description,
  datetime,
  active,
  payload,
}: NotificationProps) {
  const navigate = useNavigate();
  const parsedDatetime = format(parseISO(datetime), "dd-MMM-yyyy · HH:mm");

  const handleClick = useCallback(() => {
    navigate(routes.VIEW_BILL.replace(":id", payload.bill_id));
  }, [navigate, payload.bill_id]);

  return (
    <div
      className="flex flex-col gap-2 p-3 bg-elevation-50 border border-divider-75 rounded-xl cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex items-center justify-between">
        <span className="text-signal-success text-sm font-medium leading-5">
          {payload.action_type}
        </span>
        {active && (
          <div className="shrink-0 !h-2 !w-2 bg-[#FF2600] rounded-full" />
        )}
      </div>
      <div className="flex items-end justify-between py-4 px-3 border border-divider-75 rounded-lg">
        <div className="flex flex-col gap-0.5">
          <span className="text-text-300 text-base font-medium leading-normal line-clamp-1">
            {description}
          </span>
          <span className="text-text-200 text-xs font-normal leading-normal">
            {parsedDatetime}
          </span>
        </div>

        <div className="flex items-center gap-1">
          {payload.sum && (
            <FormattedCurrency
              signDisplay="never"
              value={payload.sum}
              className="!text-text-300 text-sm font-normal leading-5"
            />
          )}

          <span className="text-text-300 text-xs font-normal leading-normal">
            sat
          </span>
        </div>
      </div>
    </div>
  );
}

function EmptyNotifications() {
  return (
    <div className="flex flex-col items-center gap-4 mb-5">
      <img src={createBillIllustration} className="h-12 w-12 mb-1" />
      <div className="flex flex-col items-center gap-2">
        <span className="text-text-300 text-xl font-medium leading-normal">
          <FormattedMessage
            id="notifications.empty.title"
            defaultMessage="No notifications"
            description="Empty notifications message"
          />
        </span>
        <span className="text-text-200 text-base font-normal leading-normal text-center mx-12">
          <FormattedMessage
            id="notifications.empty.description"
            defaultMessage="Start creating a bill and distribute it to your contacts"
            description="Description to start creating a bill"
          />
        </span>
      </div>
      <Link to={routes.CREATE_BILL}>
        <button className="flex items-center justify-center w-28 py-2.5 px-4 text-text-300 text-xs font-medium leading-normal border border-text-300 rounded-lg">
          <FormattedMessage
            id="notifications.empty.issueBill"
            defaultMessage="Issue bill"
            description="Action to start creating a bill"
          />
        </button>
      </Link>
    </div>
  );
}

function History({ notifications }: { notifications: NotificationProps[] }) {
  const [displayHistory, setDisplayHistory] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <button
        className="flex items-center gap-1 text-text-300 text-sm font-medium leading-5 mx-auto"
        onClick={() => {
          setDisplayHistory((prev) => !prev);
        }}
      >
        {displayHistory ? (
          <>
            <FormattedMessage
              id="notifications.history.collapse"
              defaultMessage="Collapse history"
              description="Collapse history button"
            />
            <ChevronUpIcon className="text-text-300 h-4 w-4 stroke-1" />
          </>
        ) : (
          <>
            <FormattedMessage
              id="notifications.history.view"
              defaultMessage="See history"
              description="View history button"
            />
            <ChevronDownIcon className="text-text-300 h-4 w-4 stroke-1" />
          </>
        )}
      </button>
      {displayHistory && (
        <>
          <Separator className="bg-divider-75" />
          <div className="flex flex-col gap-3">
            <span className="text-text-300 text-base font-medium leading-normal">
              <FormattedMessage
                id="notifications.list.history"
                defaultMessage="History"
                description="History notifications section title"
              />
            </span>
            {notifications.map((notification) => (
              <Notification key={notification.id} {...notification} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function Loader() {
  return (
    <div className="flex flex-col gap-3 mt-6">
      <Skeleton className="bg-elevation-200 h-6 w-1/3" />

      <Skeleton className="bg-elevation-200 h-24 w-full" />
      <Skeleton className="bg-elevation-200 h-24 w-full" />
      <Skeleton className="bg-elevation-200 h-24 w-full" />
    </div>
  );
}

function List({
  setNotificationsCount,
}: {
  setNotificationsCount: (count: number) => void;
}) {
  const { data } = useSuspenseQuery({
    queryFn: () => getNotifications(),
    queryKey: ["notifications"],
  });

  useEffect(() => {
    setNotificationsCount(data.length);
  }, [data, setNotificationsCount]);

  const today = startOfToday();

  const todayNotifications = data.filter((notification) =>
    isToday(parseISO(notification.datetime))
  );

  const earlierNotifications = data.filter((notification) =>
    isBefore(parseISO(notification.datetime), today)
  );

  // check how to best render the empty list, if only when no data at all, or if no notifications today too
  return (
    <div className="flex flex-col gap-3 h-full pt-10 pb-16">
      {(data.length === 0 || todayNotifications.length === 0) && (
        <EmptyNotifications />
      )}
      {todayNotifications.length > 0 && (
        <div className="flex flex-col gap-3">
          <span className="text-text-300 text-base font-medium leading-normal">
            <FormattedMessage
              id="notifications.list.today"
              defaultMessage="Today"
              description="Today notifications section title"
            />
          </span>
          <div className="flex flex-col gap-3">
            {todayNotifications.map((notification) => (
              <Notification key={notification.id} {...notification} />
            ))}
          </div>
        </div>
      )}
      {earlierNotifications.length > 0 && (
        <History notifications={earlierNotifications} />
      )}
    </div>
  );
}

export default function Notifications() {
  const [notificationsCount, setNotificationsCount] = useState(0);

  const [typeFilters, setTypeFilters] = useState<NotificationActionType[]>([]);

  return (
    <Page displayBottomNavigation>
      <div className="flex flex-col gap-3">
        <div className="flex gap-1 items-center">
          <h2 className="text-text-300 text-xl font-medium leading-normal">
            <FormattedMessage
              id="notifications.list.title"
              defaultMessage="Notifications"
              description="Title for Notifications page"
            />
          </h2>
          <span className="text-text-200 text-xs font-medium leading-none">
            ({notificationsCount})
          </span>
        </div>
        <TypeFilter
          multiple
          values={typeFilters}
          onChange={(types) => {
            setTypeFilters(types);
            // mutate();
          }}
        />
      </div>

      <Suspense fallback={<Loader />}>
        <List setNotificationsCount={setNotificationsCount} />
      </Suspense>
    </Page>
  );
}
