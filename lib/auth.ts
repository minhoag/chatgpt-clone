import type { JWT } from "next-auth/jwt";

import { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

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
          placeholder: "",
          value: "",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "",
          value: "",
        },
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

          const res = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });

          if (!res.ok) {
            return null;
          }

          const result = await res.json();

          if (result && result.data) {
            return result.data;
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

      if (db_user) {
        token.id = db_user.id;
        token.role = db_user.role;
        token.limit = db_user.limit;
      }

      return token;
    },
    session: ({ session, token }: { session: any; token: JWT }) => {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.limit = token.limit;
        session.user.image = token.picture;
      }

      return session;
    },
  },
};

export async function getUser() {
  return await getServerSession(authOptions);
}
