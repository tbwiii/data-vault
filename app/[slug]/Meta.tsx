import { ReactElement } from "react";
import { EntryFormMeta } from "./EntryForm";

type MetadataItemType = {
  label: string;
  value: string | null;
  icon: ReactElement;
  input?: ReactElement | null;
};

const Item = ({ label, value }: { label: string; value: string | null }) => {
  return (
    <>
      <div>{label}:</div>
      <div>{value}</div>
    </>
  );
};

const Meta = ({
  editing,
  metadataArr,
  className,
  form,
}: {
  editing: boolean;
  metadataArr: MetadataItemType[];
  className: string;
  form: any;
}) => {
  return (
    <>
      {editing && (
        <div className={`${className}`}>
          <EntryFormMeta form={form} />
        </div>
      )}
      {!editing && (
        <ul className={`grid gap-4 ${className}`}>
          {metadataArr.map((m: MetadataItemType, idx: number) => (
            <li key={idx} className="flex gap-2 ms-center items-center">
              {m.icon}
              {editing && m.input ? m.input : <Item key={m.label} {...m} />}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Meta;
