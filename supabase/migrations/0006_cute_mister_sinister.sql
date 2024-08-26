ALTER TABLE "entries" ADD COLUMN "owner" text;--> statement-breakpoint
ALTER TABLE "entries" ADD COLUMN "private" boolean DEFAULT true;