import jwt, { JwtPayload } from 'jsonwebtoken'
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

export async function GET() {
    try {
        const headersInstance = await headers()
        const authHeader = headersInstance.get('authorization')
        if (!authHeader) return NextResponse.json(
            { message: 'Invalid.' },
            {
                status: 500,
            },
        )
        const token = authHeader.split(' ')[1]
        const decoded: JwtPayload | string = jwt.verify(token, process.env.JWT_SECRET!)
        if (!decoded) {
            return NextResponse.json(
                { message: 'Expired' },
                {
                    status: 400,
                },
            )
        } else {
            // If the token is valid, return some protected data.
            return NextResponse.json(
                { data: 'Protected data' },
                {
                    status: 200,
                },
            )
        }
    } catch (error) {
        console.error('Token verification failed', error)
        return NextResponse.json(
            { message: 'Unauthorized' },
            {
                status: 400,
            },
        )
    }
}