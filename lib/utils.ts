import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs";
import db from "@/lib/prisma";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isUserLoggedIn(token: string | undefined): boolean {
  if (!token) return false;
  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    return true;
  } catch (error) {
    console.error('JWT verification failed:', error);
    return false;
  }
}

export function generateRandomId(length: number) {
  const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomId = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomId += characters.charAt(randomIndex);
  }
  return randomId;
}

export function generateToken(userID: any, res: any) {
    const secret = process.env.JWT_SECRET || 'default_secret';
    const token = jwt.sign({ userID }, secret, {
      expiresIn: "7d",
    });
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    })
    return token;
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
