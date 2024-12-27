import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const response = NextResponse.json({
            message: "Logout succefully",
            success: true,
        });
        response.cookies.set("token","",{httpOnly: true, expires: new Date(0)});
        return NextResponse.json({
            message: "Logged In successfully!",
            success: true,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}