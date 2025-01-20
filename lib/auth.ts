import { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

import db from "@/lib/prisma";
import { getUserFromDb, verifyPassword } from "@/lib/utils";

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
      ): Promise<any> {
        if (!credentials) return null;
        const data = {
          email: credentials.email,
          password: credentials.password,
        };

        try {
          const user = await getUserFromDb(data.email);

          if (!user) return null;
          const passwordOk =
            user && verifyPassword(data.password, user.passwordHash);

          if (!passwordOk) return null;

          return {
            id: user.id,
            email: user.email,
            name: user.firstname + " " + user.lastname,
          };
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
    jwt: async ({ token, session, trigger }) => {
      if (!token.email) return token;
      if (trigger === "update" && session?.name) {
        token.name = session.name;
        token.picture = session.image;
      }
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
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          name: token.name,
          email: token.email,
          role: token.role,
          limit: token.limit,
          image: token.picture,
        },
      };
    },
  },
};

export async function getUser() {
  return await getServerSession(authOptions);
}
