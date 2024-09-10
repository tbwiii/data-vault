ALTER TABLE "entries" ALTER COLUMN "title" SET DEFAULT 'Untitled';--> statement-breakpoint
ALTER TABLE "entries" ALTER COLUMN "body" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "entries" ALTER COLUMN "slug" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "entries" ALTER COLUMN "owner" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "entries" ADD CONSTRAINT "entries_slug_unique" UNIQUE("slug");