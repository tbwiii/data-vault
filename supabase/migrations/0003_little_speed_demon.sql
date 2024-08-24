CREATE TABLE IF NOT EXISTS "users" (
	"user_id" serial PRIMARY KEY NOT NULL,
	"email" text,
	"name" text,
	"image" text
);
