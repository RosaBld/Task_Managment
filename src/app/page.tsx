import TaMaLogo from "../app/ui/TaMa-logo";
import { lusitana } from "../app/ui/fonts";
import Link from "next/link";
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-25 shrink-0 items-end rounded-lg bg-sky-800 p-4 md:h-30">
        <TaMaLogo />
      </div>
      <div className="flex grow flex-col gap-4 md:flex-row mt-4">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-4 py-6 md:w-3/5 md:px-14">
          <p className={`${lusitana.className} text-lg text-gray-800 md:text-xl md:leading-normal text-justify`}>
            With <strong>TaMa</strong>, stay at the top of your projects!
          </p>
          <Link
            href="/register"
            className="flex items-center justify-between self-start rounded-lg bg-cyan-800 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base w-60"
          >
            <span>Create an Account</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
          <Link
            href="/login"
            className="flex items-center justify-between self-start rounded-lg bg-cyan-800 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base w-60"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-14">
          <p className={`${lusitana.className} text-lg text-gray-800 md:text-xl md:leading-normal text-justify`}>
            Welcome to <strong>TaMa</strong>! This is a Task Managment web page where you can create any task you want, with or without friend to help you achieve your goals!
          </p>
          <p className={`${lusitana.className} text-lg text-gray-800 md:text-xl md:leading-normal text-justify`}>This web app was created by
            <a href="https://portfolio-boulard.vercel.app/"> Rosalie Boulard </a>
            with the help of <a href="https://nextjs.org/learn/"> Next.JS </a>
            and <a href="https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html">Typescript</a>.
          </p>
          <p className={`${lusitana.className} text-lg text-gray-800 md:text-xl md:leading-normal text-justify`}>Enjoy!</p>
        </div>
      </div>
    </main>
  );
}
