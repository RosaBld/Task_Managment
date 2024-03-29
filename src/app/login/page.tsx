import TaMaLogo from "@/app/ui/TaMa-logo";
import LoginForm from '@/app/ui/login-form';
import getServerSession from "next-auth";
import { redirect } from "next/navigation";
import { authConfig } from "../../../auth.config";


export default async function LoginPage() {

  const session = await getServerSession(authConfig);

  if (!session) {
    redirect("/login")
  }

  return (
    <main className="">
      <div className="">
        <div className="">
          <TaMaLogo />
        </div>
        <LoginForm />
      </div>
    </main>
  )
}