import CardWrapper from "@/app/ui/dashboard/cards";
import PendingTasks from "@/app/ui/dashboard/pendingTasks";
import TasksDone from "@/app/ui/dashboard/tasksDone";

export default async function Page() {
    return (
        <main>
            <div className="flex justify-around">
                <CardWrapper />
            </div>
            <div className="mt-8">
                <PendingTasks />
            </div>
        </main>
    )
}