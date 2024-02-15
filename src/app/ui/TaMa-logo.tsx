import Image from "next/image"
import { lusitana } from '@/app/ui/fonts'

export default function TaMaLogo() {
    return (
        <div
            className={`${lusitana.className} flex flex-row items-center leading-none text-white gap-4`}
        >
            <Image 
                src="/logo.svg"
                className="rotate-[-15deg]"
                alt="logo of TaMa"
                width={80}
                height={80}
                color="white"
            />
            <p className="text-[44px]">TaMa</p>
        </div>
    )
}