import { AuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import EmailProvider from 'next-auth/providers/email'
import db from './prisma'

export const authOptions: AuthOptions = {
    providers: [
        EmailProvider({
            server: process.env.EMAIL_SERVER,
            from: process.env.EMAIL_FROM,
        }),
    ],
    secret: process.env.AUTH_SECRET,
    adapter: PrismaAdapter(db),
    session: {
        strategy: 'database',
        maxAge: 30 * 24 * 60 * 60,
    },
    pages: {
        signIn: '/auth/signin',
        verifyRequest: '/auth/verify-request',
    },
    callbacks: {
        async session({ session, user }) {
            session.user = user
            return session
        },
    },
    events: {
        async signIn({ user }) {
            console.log('signIn', { user })
        },
    },
} satisfies AuthOptions
