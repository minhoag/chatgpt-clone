'use client'

import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { PropsWithChildren } from 'react'

interface ProviderProps extends PropsWithChildren {
    session: Session | null
}

export default function NextAuthProvider({ children }: ProviderProps) {
    return <SessionProvider>{children}</SessionProvider>
}
