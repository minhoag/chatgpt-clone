import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import bcrypt from "bcryptjs";

import db from "@/lib/prisma";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const checkEnvironment = () => {
  return process.env.NEXT_PUBLIC_RUNTIME === "production"
    ? process.env.NEXT_PUBLIC_URL!
    : "http://localhost:3000";
};

export function verifyPassword(password: string, hash: string) {
  return bcrypt.compareSync(password, hash);
}

export function getUserById(id: string) {
  return db.user.findFirst({
    where: {
      id: id,
    },
    select: {
      email: true,
      firstname: true,
      lastname: true,
      passwordHash: true,
      conversations: true,
    },
  });
}

export function getUserFromDb(email: string) {
  return db.user.findFirst({
    where: {
      email: email,
    },
    select: {
      email: true,
      firstname: true,
      lastname: true,
      passwordHash: true,
      conversations: true,
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
