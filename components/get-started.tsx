import { buttonVariants } from '@/components/ui/button'
import { ArrowChatGPT } from '@/components/icon/icon'
import Link from 'next/link'

export default async function GetStartedButton() {
    return(
        <Link href='/chat' className={buttonVariants({ size: "lg" })}>
            Get started <ArrowChatGPT props="ml-2" />
        </Link>
    )
}