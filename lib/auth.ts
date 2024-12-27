import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { checkEnvironment } from '@/lib/utils'

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
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

      async authorize(credentials, req) {
        if (!credentials) return null;
        const data = {
          email: credentials.email,
          password: credentials.password,
        };
        try {
          const res = await fetch(checkEnvironment().concat("/api/login"), {
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
            console.error("Authorization failed:", response);
            return null;
          }
        } catch (error) {
          console.error("Authorization error:", error);
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
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
  },
};
