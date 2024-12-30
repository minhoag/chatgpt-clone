import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import bcrypt from "bcryptjs";

import db from "@/lib/prisma";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const checkEnvironment = () => {
  return process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://example.com";
};

export function generateRandomId(): number {
  return Date.now() + Math.random();
}

export function verifyPassword(password: string, hash: string) {
  return bcrypt.compareSync(password, hash);
}

export function getUserFromDb(email: string) {
  return db.user.findFirst({
    where: {
      email: email,
    },
  });
}

export function createUser(
  email: string,
  firstname: string,
  lastname: string,
  passwordHash: string,
) {
  return db.user.create({
    data: {
      email: email,
      firstname: firstname,
      lastname: lastname,
      passwordHash: passwordHash,
    },
  });
}
