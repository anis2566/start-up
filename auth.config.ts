import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { encode as defaultEncode } from "next-auth/jwt";

import { db } from "./lib/prisma";
import { SignInSchema } from "./app/auth/sign-in/schema";
import { GET_USER_BY_EMAIL, VERIFY_EMAIL } from "./services/user.service";
import { randomUUID } from "crypto";

const adapter = PrismaAdapter(db);

export const authConfig = {
  adapter: adapter,
  session: { strategy: "database" },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  pages: { signIn: "/auth/sign-in", signOut: "/auth/sign-in" },
} satisfies NextAuthConfig;
