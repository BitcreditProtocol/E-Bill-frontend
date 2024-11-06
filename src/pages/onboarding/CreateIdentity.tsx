import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import defaultAvatar from "@/assets/default-avatar.svg";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

const createIdentityFormSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  dateOfBirth: z.object({
    day: z.string().regex(/^(0?[1-9]|[12][0-9]|3[01])$/, "Invalid day"),
    month: z.string().regex(/^(0?[1-9]|1[0-2])$/, "Invalid month"),
    year: z
      .string()
      .regex(/^\d{4}$/, "Invalid year")
      .refine((val) => parseInt(val) <= new Date().getFullYear()),
  }),
  city: z.string().min(1),
  country: z.string().min(1),
  address: z.string().min(1),
  email: z.string().email(),
  taxId: z.string(),

  identityDocument: z
    .instanceof(File)
    .refine((file) => file.size < 5 * 1024 * 1024),
});

function CreateIdentityForm() {
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [hasAgreedToTerms, setHasAgreedToTerms] = useState(false);

  const form = useForm<z.infer<typeof createIdentityFormSchema>>({
    resolver: zodResolver(createIdentityFormSchema),
    defaultValues: {
      fullName: "",
      dateOfBirth: {
        day: "",
        month: "",
        year: "",
      },
      city: "",
      country: "",
      address: "",
      email: "",
      taxId: "",
    },
  });

  function onSubmit(values: z.infer<typeof createIdentityFormSchema>) {
    console.log(values);

    setIsPreviewing(true);
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-3"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-center gap-2">
          <img
            src={defaultAvatar}
            alt="default-avatar"
            className="w-[50px] h-[50px] mx-auto mt-8"
          />
          <div className="text-sm text-medium">
            {isPreviewing ? "" : "Add photo"}
          </div>
        </div>
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="font-medium text-xs">Full name</FormLabel>
              <FormControl>
                {isPreviewing ? (
                  <div className="text-sm font-semibold text-[#F7931A]">
                    {field.value}
                  </div>
                ) : (
                  <Input {...field} />
                )}
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex flex-row items-end gap-1 max-w-[320px]">
          {isPreviewing ? (
            <div className="flex flex-col">
              <div className="text-xs font-medium">Date of birth</div>
              <div className="text-sm font-semibold text-[#F7931A]">
                {form.watch("dateOfBirth.day")}-
                {form.watch("dateOfBirth.month")}-
                {form.watch("dateOfBirth.year")}
              </div>
            </div>
          ) : (
            <>
              <FormField
                control={form.control}
                name="dateOfBirth.day"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="font-medium text-xs">Date</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="max-w-[48px]"
                        maxLength={2}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateOfBirth.month"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormControl>
                      <Input
                        {...field}
                        className="max-w-[48px]"
                        maxLength={2}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateOfBirth.year"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormControl>
                      <Input
                        {...field}
                        className="max-w-[60px]"
                        maxLength={4}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </>
          )}
        </div>

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="font-medium text-xs">
                City of birth
              </FormLabel>
              <FormControl>
                {isPreviewing ? (
                  <div className="text-sm font-semibold text-[#F7931A]">
                    {field.value}
                  </div>
                ) : (
                  <Input {...field} />
                )}
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="font-medium text-xs">
                Country of birth
              </FormLabel>
              <FormControl>
                {isPreviewing ? (
                  <div className="text-sm font-semibold text-[#F7931A]">
                    {field.value}
                  </div>
                ) : (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="United States of America">
                        United States of America
                      </SelectItem>
                      <SelectItem value="Austria">Austria</SelectItem>
                      <SelectItem value="Brazil">Brazil</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="font-medium text-xs">
                Postal address
              </FormLabel>
              <FormControl>
                {isPreviewing ? (
                  <div className="text-sm font-semibold text-[#F7931A]">
                    {field.value}
                  </div>
                ) : (
                  <Input {...field} />
                )}
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="font-medium text-xs">Email</FormLabel>
              <FormControl>
                {isPreviewing ? (
                  <div className="text-sm font-semibold text-[#F7931A]">
                    {field.value}
                  </div>
                ) : (
                  <Input {...field} />
                )}
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="taxId"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="font-medium text-xs">
                Social security number
              </FormLabel>
              <FormControl>
                {isPreviewing ? (
                  <div className="text-sm font-semibold text-[#F7931A]">
                    {field.value}
                  </div>
                ) : (
                  <Input {...field} />
                )}
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="identityDocument"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Identity document</FormLabel>
              <FormControl>
                {isPreviewing ? (
                  <div className="text-sm font-semibold text-[#F7931A]">
                    {value.name}
                  </div>
                ) : (
                  <Input
                    {...fieldProps}
                    type="file"
                    accept="image/*, application/pdf"
                    onChange={(event) =>
                      onChange(event.target.files && event.target.files[0])
                    }
                  />
                )}
              </FormControl>
            </FormItem>
          )}
        />

        {isPreviewing ? (
          <div className="flex flex-col gap-6">
            <div className="flex items-center space-x-2 my-3">
              <Checkbox
                id="terms-and-conditions"
                className="bg-transparent border-[#18181B]"
                checked={hasAgreedToTerms}
                onClick={() => setHasAgreedToTerms(!hasAgreedToTerms)}
              />
              <label
                htmlFor="terms-and-conditions"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the terms and conditions
              </label>
            </div>
            <div className="flex flex-row gap-2.5">
              <Button
                className="w-full"
                variant="outline"
                onClick={() => setIsPreviewing(false)}
              >
                Back
              </Button>
              <Button className="w-full" disabled={!hasAgreedToTerms}>
                Sign
              </Button>
            </div>
          </div>
        ) : (
          <Button type="submit" disabled={!form.formState.isValid}>
            Preview
          </Button>
        )}
      </form>
    </Form>
  );
}

function CreateIdentity() {
  return (
    <div className="flex flex-col w-full">
      <h1 className="text-center">Create Identity</h1>
      <div className="flex flex-col">
        <CreateIdentityForm />
      </div>
    </div>
  );
}

export default CreateIdentity;
