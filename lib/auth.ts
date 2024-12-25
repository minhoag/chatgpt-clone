import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserFromDb, verifyPassword } from "@/lib/utils";
import { formSchema } from "@/app/login/zod";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          let user = null;
          const { email, password } = await formSchema.parseAsync(credentials);
          user = await getUserFromDb(email);
          if (!user) return null;
          const passwordOk =
            user && verifyPassword(password, user.passwordHash);
          if (!passwordOk) {
            return null;
          }
          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.email = user.email;
        token.name = user.name;
        token.token = "1";
      }
      return token;
    },
  },
});
