import { Suspense } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { FormattedMessage } from "react-intl";
import Page from "@/components/wrappers/Page";
import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import PageTitle from "@/components/typography/PageTitle";
import { Skeleton } from "@/components/ui/skeleton";
import { backupSeedPhrase } from "@/services/identity_v2";

function Loader() {
  return (
    <div className="grid grid-cols-2 grid-rows-6 gap-x-4 gap-y-2">
      <Skeleton className="h-12 bg-elevation-200 rounded-lg" />
      <Skeleton className="h-12 bg-elevation-200 rounded-lg" />
      <Skeleton className="h-12 bg-elevation-200 rounded-lg" />
      <Skeleton className="h-12 bg-elevation-200 rounded-lg" />
      <Skeleton className="h-12 bg-elevation-200 rounded-lg" />
      <Skeleton className="h-12 bg-elevation-200 rounded-lg" />
      <Skeleton className="h-12 bg-elevation-200 rounded-lg" />
      <Skeleton className="h-12 bg-elevation-200 rounded-lg" />
      <Skeleton className="h-12 bg-elevation-200 rounded-lg" />
      <Skeleton className="h-12 bg-elevation-200 rounded-lg" />
      <Skeleton className="h-12 bg-elevation-200 rounded-lg" />
      <Skeleton className="h-12 bg-elevation-200 rounded-lg" />
    </div>
  );
}

function WordsList() {
  const { data } = useSuspenseQuery({
    queryFn: () => backupSeedPhrase(),
    queryKey: ["identity", "seed-phrase"],
  });

  return (
    <div className="grid grid-cols-2 grid-rows-6 gap-x-4 gap-y-2">
      {data.seed_phrase.split(" ").map((word: string, index: number) => (
        <div
          key={index}
          className="flex items-center gap-2 px-2 h-12 bg-elevation-200 text-text-300 text-sm font-medium leading-5 border border-divider-50 rounded-lg"
        >
          <div className="flex items-center justify-center h-[30px] w-[30px] bg-elevation-300 rounded-[4px]">
            {index}
          </div>
          <span>{word}</span>
        </div>
      ))}
    </div>
  );
}

export default function SeedPhrase() {
  return (
    <Page className="gap-6">
      <Topbar
        lead={<NavigateBack />}
        middle={
          <PageTitle>
            <FormattedMessage
              id="settings.security.recoveryPhrase.title"
              defaultMessage="Security"
              description="Recovery phrase backup security title"
            />
          </PageTitle>
        }
      />

      <div className="flex flex-col items-center gap-2">
        <h1 className="text-text-300 text-2xl font-medium leading-8">
          <FormattedMessage
            id="settings.security.recoveryPhrase"
            defaultMessage="Recovery phrase"
            description="Recovery phrase backup title"
          />
        </h1>
        <span className="text-text-200 text-base font-normal text-center leading-normal mx-6">
          <FormattedMessage
            id="settings.security.recoveryPhrase.description"
            defaultMessage="Never share this phrase with anyone, do not store electronically"
            description="Recovery phrase backup description"
          />
        </span>
      </div>

      <Suspense fallback={<Loader />}>
        <WordsList />
      </Suspense>
    </Page>
  );
}
