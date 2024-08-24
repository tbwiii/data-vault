import { eq } from "drizzle-orm";
import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { db } from "@db";
import blank from "@/lib/util/blank";

export const users = pgTable('users', {
    userId: serial('user_id').primaryKey(),
    email: text('email'),
    name: text('name'),
    image: text('image'),
});

export type UserType = typeof users.$inferSelect;
export const newUser = blank(users);

export async function createUser(user:Partial<UserType>) {
    const data = await db.insert(users).values(user).returning();
    return { user: data };
}

export async function getUserById(userId:string|number) {
    const query = await db.select()
        .from(users)
        .where(eq(users.userId, Number(userId)))
        .limit(1);

    return (query[0]);
}

export async function getUserByEmail(email:string) {
    const query = await db.select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

    return (query[0]);
}