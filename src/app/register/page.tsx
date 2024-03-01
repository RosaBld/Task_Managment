import TaMaLogo from "@/app/ui/TaMa-logo";
import RegisterForm from '@/app/ui/login-form';
import getServerSession from "next-auth";
import { redirect } from "next/navigation";
import { authConfig } from "../../../auth.config";

export default async function RegisterPage() {

    const session = await getServerSession(authConfig);

    if (!session) {
      redirect("/register");
    }

  return (
    <main className="">
      <div className="">
        <div className="">
          <TaMaLogo />
        </div>
        <RegisterForm />
      </div>
    </main>
  )
}