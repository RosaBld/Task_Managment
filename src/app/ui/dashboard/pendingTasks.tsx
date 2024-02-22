import clsx from "clsx";
import { fetchTasks } from "@/app/lib/data";
import { formatDateToLocal } from "@/app/lib/utils";
import { ClockIcon, CheckCircleIcon, UserCircleIcon, UserGroupIcon, UserIcon } from '@heroicons/react/24/outline'

export default async function PendingTasks() {
	const allTasks = await fetchTasks();

	return (
			<div className="flex flex-col lg:grid lg:grid-cols-2 gap-4">
				{allTasks.filter(task => !task.status).map((tasks) => {               
					return (
						<div 
								// className="rounded-xl bg-gray-50 p-2 shadow-sm"
								key={tasks.id}
						>
							<div className="rounded-t-lg bg-sky-800 p-2 shadow-sm">
								<div className="flex flex-row justify-between">
									<div>
										<div className="flex flex-row gap-1 text-white text-sm">
											<UserCircleIcon className="text-white w-3 md:w-4" /> 
											<p>{tasks.username}</p>
										</div>
									</div>
									<div className="">
										<div className="flex flex-row gap-1 text-white text-sm justify-end">
											{tasks.sharedWithPeople && tasks.sharedWithPeople.length > 0 ?
												<p>{tasks.sharedWithPeople.join(', ')}</p>   
											:
												<p>None</p>
											}
											<UserIcon className="text-white w-3 md:w-4" />
										</div>
											<div className="flex flex-row gap-1 text-white text-sm justify-end"> 
												{tasks.sharedWithGroups && tasks.sharedWithGroups.length > 0 ?
													<p>{tasks.sharedWithGroups.join(', ')}</p>   
												:
													<p>None</p>
												}
												<UserGroupIcon className="text-white w-3 md:w-4" />
											</div>
									</div>
							</div>
							<div className="text-white text-2xl text-center">
								<h3>
									{tasks.name}
								</h3>
							</div>
							<div className="flex flex-row justify-between text-sm">
								<p className={clsx({
									'text-red-400' : tasks.priority === 'Urgent',
									'text-orange-300' : tasks.priority === "Medium",
									'text-green-400' : tasks.priority === 'Low'
								})}>
									{tasks.priority}
								</p>
								<p className="text-white text-sm">
									{formatDateToLocal(tasks.deadline)}
								</p>
							</div>
					</div>

					<div className="rounded-b-lg bg-gray-50 p-2 shadow-sm">
						<div className="py-2">
							<h4 className="text-justify text-sm text-sky-800">
								{tasks.details}
							</h4>
						</div>
							<div className="flex justify-end">
								{tasks.status ?
									<CheckCircleIcon className="w-4 md:w-5 text-gray-600" />    
								:
									<ClockIcon className="w-4 md:w-5 text-gray-600" />
								}
								</div>
							</div>
						</div>
					)
				})}
			</div>
	)
}
