import { useMutation } from "@tanstack/react-query";
import { useFormContext, useWatch } from "react-hook-form";
import { z } from "zod";
import { FormattedMessage, useIntl } from "react-intl";
import Upload from "@/components/Upload";
import { uploadFiles } from "@/services/bills";
import type { CreateBillFormSchema } from "./index";

const formSchema = z.object({
  has_selected_file: z.boolean(),
  file_name: z.string(),
  file_size: z.number(),
  file_upload_id: z.string().nullable(),
});

export default function Invoice() {
  const { formatMessage: f } = useIntl();
  const { control, setValue } = useFormContext<CreateBillFormSchema>();
  const invoice = useWatch<CreateBillFormSchema, "invoice">({
    control,
    name: "invoice",
  });

  const { mutate } = useMutation({
    mutationFn: (file: File) => {
      setValue("invoice", {
        ...invoice,
        file_name: file.name,
        file_size: file.size,
      });
      return uploadFiles([file]);
    },
    onSuccess: (data) => {
      setValue("invoice", {
        ...invoice,
        has_selected_file: true,
        file_upload_id: data.file_upload_id,
      });
    },
  });

  const hasSelectedFile = invoice.has_selected_file;

  return (
    <div className="flex flex-col gap-2">
      <Upload
        label={f({
          id: "bills.create.upload.invoice",
          defaultMessage: "Upload invoice",
          description: "Upload invoice label",
        })}
        description={f({
          id: "bills.create.upload.invoice.acceptedFormats",
          defaultMessage: "PDF, PNG or JPG (max. 5mb)",
          description: "Accepted file formats",
        })}
        onAddFile={(file) => {
          mutate(file);
        }}
        onRemoveFile={() => {
          setValue("invoice", {
            has_selected_file: false,
            file_name: "",
            file_size: 0,
            file_upload_id: null,
          });
        }}
      />
      <span className="text-text-300 text-sm font-normal">
        <FormattedMessage
          id="bill.create.invoice.noProtest"
          defaultMessage="No protest."
          description="No protest copy for bill card"
        />{" "}
        {hasSelectedFile && (
          <FormattedMessage
            id="bill.create.invoice.valueReceived"
            defaultMessage="Value received."
            description="Value received label"
          />
        )}
      </span>
    </div>
  );
}

Invoice.formSchema = formSchema;
