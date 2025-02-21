import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Page from "@/components/wrappers/Page";

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  country: z.string().min(1),
  city: z.string().min(1),
  zip: z.string().optional(),
  address: z.string().min(1),
  date_of_birth: z.string().min(1).optional(),
  country_of_birth: z.string().min(2).optional(),
  city_of_birth: z.string().min(1).optional(),
  identification_number: z.string().min(1).optional(),

  profile_picture_preview_url: z.string().optional(),
  profile_picture_file_upload_id: z.string().optional(),
  identity_document_file_upload_id: z.string().optional(),
  identity_document_file_metadata: z
    .object({
      name: z.string(),
      size: z.number(),
    })
    .optional(),
});

export type CreateIdentityFormSchema = z.infer<typeof formSchema>;

export default function Create() {
  return <Page></Page>;
}
