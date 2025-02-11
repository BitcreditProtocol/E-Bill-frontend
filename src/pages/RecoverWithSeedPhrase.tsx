import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { CircleXIcon, CopyIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import Page from "@/components/wrappers/Page";
import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import { useMutation } from "@tanstack/react-query";
import { restoreBackupFile, restoreSeedPhrase } from "@/services/identity_v2";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import routes from "@/constants/routes";
import Upload from "@/components/Upload";

type WordFieldProps = {
  id: number;
  value: string;
  onChange: (value: string) => void;
  onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
};

function WordField({ id, value, onChange, onPaste }: WordFieldProps) {
  return (
    <div className="flex justify-center items-center gap-2 h-[46px] bg-elevation-200 py-1 pl-2 pr-4 rounded-[8px] border-[1px] border-[#1B0F0014]">
      <div className="flex justify-center items-center p-3 w-[30px] h-[30px] bg-divider-100 rounded-[4px] font-medium text-[14px]">
        {id}
      </div>
      <input
        className="w-full bg-transparent outline-none text-text-300 text-[14px] font-medium leading-[14px]"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        onPaste={onPaste}
      />
    </div>
  );
}

function SeedPhrase({ goToBackup }: { goToBackup: () => void }) {
  const [seedWords, setSeedWords] = useState(Array<string>(12).fill(""));
  const { formatMessage: f } = useIntl();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      const combinedSeedPhrase = seedWords.join(" ");

      return restoreSeedPhrase({
        seed_phrase: combinedSeedPhrase,
      });
    },
    onSuccess: () => {
      toast({
        title: f({
          id: "identity.restore.success",
          defaultMessage: "Success!",
          description:
            "Toast message title when identity is restored successfully",
        }),
        description: f({
          id: "identity.restore.success.description",
          defaultMessage: "Your identity has been restored successfully",
          description:
            "Toast message description when identity is restored successfully",
        }),
        position: "bottom-center",
      });

      goToBackup();
    },
    onError: () => {
      toast({
        title: f({
          id: "identity.restore.error",
          defaultMessage: "Error!",
          description: "Toast message title when identity restoration fails",
        }),
        description: f({
          id: "identity.restore.error.description",
          defaultMessage: "Failed to restore your identity. Please try again.",
          description:
            "Toast message description when identity restoration fails",
        }),
        position: "bottom-center",
      });
    },
  });

  const handleInputChange = (index: number, newValue: string) => {
    const updatedWords = [...seedWords];
    updatedWords[index] = newValue;
    setSeedWords(updatedWords);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("Text");
    const words = text.split(" ").slice(0, 12);

    const paddedWords = words.concat(Array(12 - words.length).fill(""));
    setSeedWords(paddedWords);
  };

  const pasteFromClipboard = async () => {
    const text = await navigator.clipboard.readText();
    const words = text.split(" ").slice(0, 12);

    const paddedWords = words.concat(Array(12 - words.length).fill(""));
    setSeedWords(paddedWords);
  };

  const clearAllFields = () => {
    setSeedWords(Array(12).fill(""));
  };

  const hasAnyFieldFilled = seedWords.some((word) => word !== "");

  return (
    <div className="flex-1 flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-text-300 text-2xl font-medium leading-8">
          <FormattedMessage
            id="identity.restore.heading"
            defaultMessage="Recover with seed phrase"
            description="Heading copy for the recover with seed phrase page"
          />
        </h1>
        <span className="text-text-200 text-base font-normal leading-6 mx-10">
          <FormattedMessage
            id="identity.restore.description"
            defaultMessage="Please enter your seed phrase to restore your identity"
            description="Description copy for the recover with seed phrase page"
          />
        </span>
      </div>

      <div className="flex flex-col gap-11">
        <div className="grid grid-cols-2 gap-4">
          {seedWords.map((word, i) => (
            <WordField
              key={i}
              id={i + 1}
              value={word}
              onChange={(newValue) => {
                handleInputChange(i, newValue);
              }}
              onPaste={handlePaste}
            />
          ))}
        </div>

        {hasAnyFieldFilled ? (
          <Button
            variant="link"
            className="gap-2 text-[#1B0F0080] text-[14px] font-medium"
            onClick={clearAllFields}
          >
            <CircleXIcon width={20} color="#1B0F0080" strokeWidth={1} />
            <FormattedMessage
              id="Clear all"
              defaultMessage="Clear all"
              description="Button to clear all fields in the recover with seed phrase page"
            />
          </Button>
        ) : (
          <Button
            variant="link"
            className="gap-2 text-[#1B0F0080] text-[14px] font-medium"
            onClick={() => {
              pasteFromClipboard().catch(() => {
                // TODO: handle error
              });
            }}
          >
            <CopyIcon width={20} color="#1B0F0080" strokeWidth={1} />
            <FormattedMessage
              id="identity.restore.paste"
              defaultMessage="Paste from clipboard"
              description="Button to paste seed phrase from clipboard in the recover with seed phrase page"
            />
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-3 mt-auto">
        <Button
          size="md"
          disabled={seedWords.some((word) => word === "") || isPending}
          onClick={() => {
            mutate();
          }}
        >
          <FormattedMessage
            id="identity.restore.button"
            defaultMessage="Restore identity"
            description="Button to restore identity in the recover with seed phrase page"
          />
        </Button>
      </div>
    </div>
  );
}

function RestoreBackupFile() {
  const navigate = useNavigate();
  const { formatMessage: f } = useIntl();
  const { toast } = useToast();

  const { mutate } = useMutation({
    mutationFn: (file: File) => {
      return restoreBackupFile(file);
    },
    onSuccess: () => {
      toast({
        title: f({
          id: "identity.restore.success",
          defaultMessage: "Success!",
          description:
            "Toast message title when identity is restored successfully",
        }),
        description: f({
          id: "identity.restore.success.description",
          defaultMessage: "Your identity has been restored successfully",
          description:
            "Toast message description when identity is restored successfully",
        }),
        position: "bottom-center",
      });

      setTimeout(() => {
        navigate(routes.HOME);
      }, 2000);
    },
    onError: () => {
      toast({
        title: f({
          id: "identity.restore.error",
          defaultMessage: "Error!",
          description: "Toast message title when identity restoration fails",
        }),
        description: f({
          id: "identity.restore.error.description",
          defaultMessage: "Failed to restore your identity. Please try again.",
          description:
            "Toast message description when identity restoration fails",
        }),
        position: "bottom-center",
      });
    },
  });

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex flex-col items-center gap-2">
        <span className="text-text-300 text-xl font-medium leading-8">
          <FormattedMessage
            id="identity.restore.backup.heading"
            defaultMessage="Restore backup file"
            description="Heading copy for the restore backup step"
          />
        </span>
        <span className="text-text-200 text-sm font-normal text-center leading-6 mx-10">
          <FormattedMessage
            id="identity.restore.backup.description"
            defaultMessage="Please upload your backup file to restore your data"
            description="Description copy for the restore backup step"
          />
        </span>
      </div>

      <div className="my-auto">
        <Upload
          label={f({
            id: "identity.restore.backup.label",
            defaultMessage: "Upload backup file",
            description: "Label for the upload backup file input",
          })}
          description={f({
            id: "identity.restore.backup.description",
            defaultMessage: "Select the backup file you want to restore",
            description: "Description for the upload backup file input",
          })}
          onAddFile={(file) => {
            mutate(file);
          }}
        />
      </div>
    </div>
  );
}

export default function RecoverWithSeedPhrase() {
  const [activeTab, setActiveTab] = useState<"seed" | "backup">("seed");

  return (
    <Page className="gap-6">
      <Topbar className="mb-6" lead={<NavigateBack />} />

      {activeTab === "seed" ? (
        <SeedPhrase
          goToBackup={() => {
            setActiveTab("backup");
          }}
        />
      ) : (
        <RestoreBackupFile />
      )}
    </Page>
  );
}
