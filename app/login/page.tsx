'use client'

import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

const formSchema = z.object({
    username: z.string().email('Please enter a valid email address.'),
    password: z.string(),
})

export default function LoginPage() {
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)

        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
        })

        if (response.ok) {
            router.push('/profile')
        } else {
            // Handle errors
        }
    }
    return (
        <div className="max-w-xl mx-auto">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="chatgpt@openai.com"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        required
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Link
                        href="#"
                        className="relative top-2 text-sm hover:underline"
                    >
                        Forgot password?
                    </Link>
                    <div className="flex flex-wrap flex-col items-center gap-3 text-sm md:flex-row md:justify-between">
                        <Button type="submit">Continue</Button>
                        <span>
                            Don&#39;t have an account?
                            <Link href="#" className="ml-2 hover:underline">
                                Sign up.
                            </Link>
                        </span>
                    </div>
                </form>
            </Form>
        </div>
    )
}
