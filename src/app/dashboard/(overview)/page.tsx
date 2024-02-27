import CardWrapper from "@/app/ui/dashboard/cards";
import PendingTasks from "@/app/ui/dashboard/pendingTasks";
import { LoginInfo } from "@/app/ui/dashboard/login";

export default function Page() {
  return (
    <main>
      {/* <div>
        <LoginInfo />
      </div> */}
      <div className="flex justify-around">
        <CardWrapper />
      </div>

      <div className="mt-8">
        <PendingTasks />
      </div>
    </main>
  );
}