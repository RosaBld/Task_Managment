import CardWrapper from "@/app/ui/dashboard/cards";
import PendingTasks from "@/app/ui/dashboard/pendingTasks"; 

export default function Page() {
  return (
    <main>
      <div className="flex justify-around">
        <CardWrapper />
      </div>

      <div className="mt-8">
        <PendingTasks />
      </div>
    </main>
  );
}