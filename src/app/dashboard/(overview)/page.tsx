import CardWrapper from "@/app/ui/dashboard/cards";
import PendingTasks from "@/app/ui/dashboard/pendingTasks";
import TasksDone from "@/app/ui/dashboard/tasksDone";

export default async function Page() {
    return (
        <main>
            <div className="flex justify-around">
                <CardWrapper />
            </div>
            <div className="flex flex-col lg:flex-row w-full gap-8">
                <PendingTasks />
                <TasksDone />
            </div>
        </main>
    )
}