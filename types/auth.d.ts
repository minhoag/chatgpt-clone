import "next-auth";

declare module "next-auth" {
  interface User {
    email: string;
    name: string;
    access_token: string;
    refresh_token: string;
    expires_on: number;
    exp: number;
    iat: number;
    jti: string;
  }

  interface Session extends DefaultSession {
    user: User;
    role: string;
    limit: number;
    expires_in: string;
    error: string;
  }
}
