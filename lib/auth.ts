import NextAuth from 'next-auth';
import Google, { GoogleProfile } from "next-auth/providers/google";
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@/data';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
})
