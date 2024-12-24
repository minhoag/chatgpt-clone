import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import NextAuthProvider from '@/components/session-provider'
import Navigation from '@/components/navigation'
import './globals.css'
import { getServerSession } from 'next-auth'

const font = Space_Grotesk({ subsets: ['latin'], weight: '400' })

export const metadata: Metadata = {
    title: 'ChatGPT',
    description: 'A website that clone OpenAI based login system frontend',
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const session = await getServerSession()
    return (
        <NextAuthProvider session={session}>
            <html lang="en" suppressHydrationWarning>
                <body className={`${font.className}`} suppressHydrationWarning>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <Navigation />
                        <main className="sm:px-10 px-5">{children}</main>
                    </ThemeProvider>
                </body>
            </html>
        </NextAuthProvider>
    )
}
