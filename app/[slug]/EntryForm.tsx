import { EntryType } from "@schema/entries";
import slugOMatic from "@util/slugOMatic";
import { ReactElement } from "react";
import BlurFade from "@/components/magicui/blur-fade";

export const EntryForm = ({
  children,
  form,
  submit,
}: {
  children: ReactElement[];
  form: any;
  submit: Function;
}) => (
  <form
    onSubmit={form.onSubmit((values: Partial<EntryType>) => submit(values))}
  >
    {children}
  </form>
);

export function EntryFormTitle({ form }: { form: any }) {
  return (
    <div className="">
      <input
        className="
          w-full
          text-4xl
          p-4
          bg-opacity-5
          bg-white
          rounded
          font-bold
          focus:outline-none"
        placeholder="title"
        key="title"
        {...form.getInputProps("title")}
      />
    </div>
  );
}

export function EntryFormMeta({ form }: { form: any }) {
  const slugPlaceholder = slugOMatic(form.values?.title);
  return (
    <div className="flex gap-2 items-center grow">
      <label>Slug:</label>
      <input
        className="w-full p-2 rounded shadow focus:outline-none"
        type="text"
        placeholder={slugPlaceholder}
        key="slug"
        preventDefault
        {...form.getInputProps("slug")}
      />
    </div>
  );
}

export function EntryFormBody({
  form,
  className,
}: {
  className?: string;
  form: any;
}) {
  return (
    <div className="grid gap-4">
      <textarea
        className={`
          w-full
          p-8
          bg-transparent
          rounded
          focus:outline-none
          min-h-[calc(100vh-400px)]
          overflow-auto
          ${className}
        `}
        placeholder="[...]"
        key="content"
        {...form.getInputProps("body")}
      />
    </div>
  );
}
