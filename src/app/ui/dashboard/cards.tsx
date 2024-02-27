import { lusitana } from '@/app/ui/fonts';
import { fetchTasksData } from '@/app/lib/data';

export default async function CardWrapper() {
  const {
    numberOfTasks,
    totalCompletedTasks,
    totalPendingTasks
  } = await fetchTasksData();

  return (
    <>
      <Card title="Total of Tasks" value={numberOfTasks} type="tasks" />
      <Card title="Tasks Completed" value={totalCompletedTasks} type="done" />
      <Card title="Tasks Pending" value={totalPendingTasks} type="pending" />
    </>
  )
}

export function Card({
  title,
  value,
  type,
  }: {
  title: string;
  value: number | string;
  type: 'tasks' | 'users' | 'done' | 'pending';
}) {

  return (
    <div className="">
      <div className="rounded-xl bg-gray-50 p-2 shadow-sm w-44">
        <div className="flex p-4">
          {/* {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null} */}
          <h3 className="text-sm font-medium text-center w-full">{title}</h3>
        </div>
        <p className="truncate rounded-xl bg-white px-4 py-8 text-center text-2xl">
          {value}
        </p>
      </div>
    </div>
    )
}