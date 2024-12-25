import { buttonVariants } from '@/components/ui/button'
import { ArrowChatGPT } from '@/components/icon/icon'
import Link from 'next/link'

export default async function GetStartedButton({ link }: { link: string}) {
    return(
        <Link href={link} className={buttonVariants({ size: "lg" })}>
            Get started <ArrowChatGPT props="ml-2" />
        </Link>
    )
}