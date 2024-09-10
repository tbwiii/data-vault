import { EntryType } from "@schema/entries";
import { User } from "next-auth";

export type EntryPropsType = {
  entry: EntryType;
  inferredTitle: string;
  user?: User;
  private?: boolean;
  slug?: string;
};
