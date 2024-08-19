import { eq } from "drizzle-orm";
import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { db } from "@db";
import slugOMatic from '@helpers/slugOMatic';

export const entries = pgTable('entries', {
  entryId: serial('entry_id').primaryKey(),
  title: text('title'),
  body: text('body'),
  slug: text('slug'),
  createdAt: text('created_at'),
  updatedAt: text('updated_at')
});

export type Entry = typeof entries.$inferSelect;

export async function createEntry(entry:Partial<Entry>) {
  entry.createdAt = new Date().toISOString();

  if (!entry.slug) {
    entry.slug = slugOMatic(entry.title);
  }
  return db.insert(entries).values(entry).returning();
}

export async function getEntry(entryId:string|number) {
  const query = await db.select()
    .from(entries)
    .where(eq(entries.entryId, Number(entryId)))
    .limit(1);

  return (query[0]);
}


export async function updateEntry(entry:Partial<Entry>) {
  try {
    if (!entry.slug) {
      entry.slug = slugOMatic(entry.title);
    }
    entry.updatedAt = new Date().toISOString();
    return db.update(entries).set(entry).where(eq(entries.entryId, entry.entryId!)).returning();
  } catch (error) {
    console.error(error);
    return error
  }
}

export async function deleteEntry(entryId:number) {
  return db.delete(entries).where(eq(entries.entryId, entryId)).returning();
}