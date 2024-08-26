"use client";

import { EntryType } from "@schema/entries";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

export default function EntriesTable({ entries }: { entries: EntryType[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Slug</TableHead>
          <TableHead>Updated At</TableHead>
          <TableHead>Created At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {entries.map((entry, index) => (
          <TableRow key={index}>
            <TableCell>
              <Link href={`/${entry.slug}`}>{entry.title}</Link>
            </TableCell>
            <TableCell>{entry.slug}</TableCell>
            <TableCell>{entry.updatedAt}</TableCell>
            <TableCell>{entry.createdAt}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
