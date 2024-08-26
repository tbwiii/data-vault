"use client";
import Link from "next/link";
import { Pencil2Icon, CalendarIcon, FileTextIcon } from "@radix-ui/react-icons";

import { EntryType } from "@schema/entries";
import { useState, useEffect } from "react";

interface EntryListProps {
  entries: EntryType[];
  createdAt?: boolean;
  updatedAt?: boolean;
}

const EntryList: React.FC<EntryListProps> = ({
  entries,
  createdAt,
  updatedAt,
}) => {
  const [hydratedEntries, setHydratedEntries] = useState<EntryType[]>([]);

  useEffect(() => {
    setHydratedEntries(
      entries.map((entry: EntryType) => {
        return {
          ...entry,
          createdAt: entry.createdAt,
          updatedAt: entry.updatedAt,
        };
      })
    );
  }, [entries]);

  return (
    <div className="grid gap-1">
      {hydratedEntries.map((entry: EntryType) => (
        <Link href={`/${entry.slug}`} key={entry.title}>
          <div
            className="
              hover:dark:bg-azure-500
              hover:dark:bg-opacity-5
            dark:text-azure-600
              relative
              px-3
              py-3
              grid
              gap-2
              overflow-hidden"
          >
            <div className="flex gap-2 items-center">
              <FileTextIcon />
              {entry.title}
            </div>
            <div className=" flex gap-3 text-xs">
              {entry.createdAt && (
                <span className="flex gap-2 items-center">
                  <CalendarIcon />
                  {entry.createdAt}
                </span>
              )}
              {entry.updatedAt && (
                <span className="flex gap-2 items-center">
                  <Pencil2Icon />
                  {entry.updatedAt}
                </span>
              )}
            </div>
            <span
              className="absolute
                            bottom-0
                            left-0
                            w-0
                            h-0.5
                            bg-azure-700
                            group-hover:w-full
                            transition-all"
            ></span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default EntryList;
