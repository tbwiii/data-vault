import { eq, desc, asc, sql } from "drizzle-orm";
import { boolean, pgTable, serial, text } from "drizzle-orm/pg-core";
import { db } from "@db";
import slugOMatic from '@util/slugOMatic';
import relativeTimeOTron from "@/lib/util/relativeTimeOTron";
import blank from "@/lib/util/blank";

export const entries = pgTable('entries', {
  entryId: serial('entry_id').primaryKey(),
  title: text('title'),
  body: text('body'),
  slug: text('slug'),
  owner: text('owner'),
  private: boolean('private').default(true),
  deleted: boolean('deleted').default(false),
  createdAt: text('created_at'),
  updatedAt: text('updated_at')
});

export const getEntriesColumn = (key:string) => {
  switch (key) {
    case 'entryId':
      return entries.entryId;
    case 'title':
      return entries.title;
    case 'body':
      return entries.body;
    case 'slug':
      return entries.slug;
    case 'owner':
      return entries.owner;
    case 'private':
      return entries.private;
    case 'createdAt':
      return entries.createdAt;
    case 'updatedAt':
      return entries.updatedAt;
    default:
      console.error('Invalid column name: ', key);
  }
}

export type EntryType = typeof entries.$inferSelect;
export const newEntry = blank(entries);
         
function humanizeTimestamps(entries:EntryType[]) {
  return entries.map((entry:EntryType) => {
    entry.createdAt = relativeTimeOTron(entry.createdAt);
    entry.updatedAt = relativeTimeOTron(entry.updatedAt);
    return entry;
  });
}

export async function createEntry(entry:Partial<EntryType>) {
  const timestamp = new Date().toISOString()
  entry.createdAt = timestamp;
  entry.updatedAt = timestamp;

  if (!entry.slug) {
    entry.slug = slugOMatic(entry.title);
  }
  const data = await db.insert(entries).values(entry).returning();

  return { entry: data };
}

export async function getEntryById(entryId:string|number) {
  const data = await db.select()
    .from(entries)
    .where(eq(entries.entryId, Number(entryId)))
    .limit(1);

  return (humanizeTimestamps(data)[0]);
}

export async function getEntryBySlug(slug:string) {
  const query = await db.select()
    .from(entries)
    .where(eq(entries.slug, slug))
    .limit(1);

  return (humanizeTimestamps(query)[0]);
}

// Todo: expand to build helper query and move to helper/util
function whereBuilder(table:any, where:Partial<EntryType>) {
  const keys = Object.keys(where);
  let query = sql``;
  
  // return query;
  return eq(entries.deleted, false);
}

export async function getEntreies(
  { limit = 10, orderBy = 'createdAt', offset = 0, direction = 'asc', where = {} }
  :{ limit?:number, orderBy?: keyof typeof entries, offset?: number, direction?: 'asc'|'desc', where?: Partial<EntryType> }) {

  const orderCol = sql`${(entries[orderBy] || entries.createdAt)}`;

  const dir = (direction === 'asc') ? asc : desc;
  
  const data = await db.select()
    .from(entries)
    .limit(limit)
    .where(whereBuilder(entries, where))
    .orderBy(dir(orderCol))
    .offset(offset);

  return { entries: humanizeTimestamps(data) }; 
}

export async function updateEntry(entry:Partial<EntryType>) {
  try {
    if (!entry.slug) {
      entry.slug = slugOMatic(entry.title);
    }
    entry.updatedAt = new Date().toISOString();
    const data = await db.update(entries).set(entry).where(eq(entries.entryId, entry.entryId!)).returning();
    // Log the data to check its structure
    console.log('Updated entry data:', data);

    // Validate the data before returning
    if (!data || typeof data !== 'object') {
        throw new Error('Invalid data returned from update operation');
    }

    return { entry: humanizeTimestamps(data)[0] };
  } catch (error) {
    console.error(error);
    return error
  }
}

export async function deleteEntry(entryId:number) {
  return db.delete(entries).where(eq(entries.entryId, entryId)).returning();
}