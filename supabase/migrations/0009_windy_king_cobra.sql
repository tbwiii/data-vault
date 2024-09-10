ALTER TABLE "entries" DROP CONSTRAINT "entries_slug_unique";--> statement-breakpoint
ALTER TABLE "entries" ALTER COLUMN "title" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "entries" ALTER COLUMN "body" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "entries" ALTER COLUMN "slug" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "entries" ALTER COLUMN "owner" DROP NOT NULL;