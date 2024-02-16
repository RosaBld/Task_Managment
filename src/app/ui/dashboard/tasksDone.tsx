import { lusitana } from "../fonts";
import clsx from "clsx";
import { fetchTasks } from "@/app/lib/data";
import { Tasks } from "@/app/lib/definitions";

export default async function TasksDone() {
    const allTasks = await fetchTasks();

    return (
        <>
            <h2 className="">
                Tasks Finished
            </h2>
            {allTasks.filter(task => task.status).map((tasks) => {
                return (
                    <div 
                        className=""
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
                                    {/* <p className="">
                                        {tasks.deadline}
                                    </p> */}
                                </div>
                                <div>
                                    <h4 className="">
                                        {/* {task.details} */}
                                    </h4>
                                </div>
                            </div>
                            <div className="">
                                {/* {task.status ?
                                    <p>Pending</p>    
                                :
                                    <p>Done</p>
                                } */}
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}
