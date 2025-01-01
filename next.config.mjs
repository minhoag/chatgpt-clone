/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXAUTH_URL: process.env.NEXAUTH_URL,
    PUBLIC_URL: process.env.PUBLIC_URL,
  },
};

export default nextConfig;
