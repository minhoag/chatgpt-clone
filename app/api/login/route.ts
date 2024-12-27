import { NextRequest, NextResponse } from "next/server";
import { getUserFromDb, verifyPassword } from '@/lib/utils'
import jwt from 'jsonwebtoken'

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        // REMOVE IN PRODUCTION
        console.log(reqBody);

        const user = await getUserFromDb(email);
        if (!user) {
            return NextResponse.json(
                {
                    error: "Invalid credentials",
                },
                { status: 400 },
            );
        }

        // compare hashed password
        const passwordOk =
            user && verifyPassword(password, user.passwordHash);
        if (!passwordOk) {
            return NextResponse.json(
                {
                    error: "Invalid credentials",
                },
                { status: 400 },
            );
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
            expiresIn: '5m',
        })
        return NextResponse.json({
            message: "Logged In successfully! Token generated " + token,
            success: true,
        });
    } catch (error: any) {
        console.log('error', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}