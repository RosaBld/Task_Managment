import { lusitana } from "../fonts";
import clsx from "clsx";
import { fetchTasks } from "@/app/lib/data";
import { formatDateToLocal } from "@/app/lib/utils";

export default async function PendingTasks() {
    const allTasks = await fetchTasks();

    return (
        <div className="flex flex-col">
            <h2 className="text-center">
                Pending Tasks
            </h2>
            {allTasks.filter(task => !task.status).map((tasks) => {
                return (
                    <div 
                        className="rounded-xl bg-gray-50 p-2 shadow-sm"
                        key={tasks.id}
                    >
                        <div className="">
                            <div className="">
                                {/* liste des groupes et des shared */}
                            </div>

                            <div className="">
                                <h3>{tasks.name}</h3>
                                <div className="">
                                    <p className="">
                                        {tasks.priority}
                                    </p>
                                    <p className="">
                                        {formatDateToLocal(tasks.deadline)}
                                    </p>
                                </div>
                                <div>
                                    <h4 className="">
                                        {tasks.details}
                                    </h4>
                                </div>
                            </div>
                            <div className="">
                                {tasks.status ?
                                    <p>Done</p>    
                                :
                                    <p>Pending</p>
                                }
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
