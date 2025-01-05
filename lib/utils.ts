import bcrypt from "bcryptjs";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import db from "@/lib/prisma";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const checkEnvironment = () => {
  return process.env.NEXT_PUBLIC_RUNTIME === "production"
    ? process.env.NEXT_PUBLIC_URL ||
        "https://chatgpt-clone-git-dev-wandak3s-projects.vercel.app/"
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
      id: true,
      email: true,
      firstname: true,
      lastname: true,
      role: true,
      limit: true,
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
      role: "user",
      limit: 0,
    },
  });
}

export function updateUserLimit(email: string, newLimit: number) {
  return db.user.update({
    where: { email: email },
    data: { limit: newLimit },
  });
}
