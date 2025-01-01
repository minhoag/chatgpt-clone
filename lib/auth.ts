import type { JWT } from "next-auth/jwt";

import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth/next";

import db from "@/lib/prisma";
import { checkEnvironment } from "@/lib/utils";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "test@admin.com",
          value: "test@admin.com",
        },
        password: { label: "Password", type: "password", value: "admin" },
      },

      async authorize(
        credentials: Record<"email" | "password", string> | undefined,
      ) {
        if (!credentials) return null;
        const data = {
          email: credentials.email,
          password: credentials.password,
        };

        try {
          const url = checkEnvironment().concat("/api/login");

          console.log(url);
          const res = await fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          });
          const response = await res.json();

          if (res.ok && response && response.data) {
            return response.data;
          } else {
            return null;
          }
        } catch {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  callbacks: {
    jwt: async ({ token }: { token: JWT }) => {
      if (!token.email) return token;
      const db_user = await db.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (db_user) token.id = db_user.id;

      return token;
    },
    session: ({ session, token }: { session: any; token: JWT }) => {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }

      return session;
    },
  },
};

export async function getUser() {
  return await getServerSession(authOptions);
}
