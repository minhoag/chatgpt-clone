import type { JWT } from "next-auth/jwt";

import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth/next";

import db from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
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
          const url = `${process.env.NEXTAUTH_URL}/api/login`;
          const res = await axios({
            method: "POST",
            url: url,
            data: data,
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (res.status === 200 && res.data && res.data.data) {
            return res.data.data;
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
    signIn: `${process.env.NEXTAUTH_URL}/login`,
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
