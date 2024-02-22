import { fetchGroups } from "@/app/lib/data"
import { UserCircleIcon, UserGroupIcon, UserIcon } from '@heroicons/react/24/outline'

export default async function GroupList() {
  const groups = await fetchGroups();

  return (
    <div className="">
      {groups.filter(user_group => user_group.id).map((user_groups) => { 
        return (
          <div key={user_groups.id}>
            <div className="rounded-t-lg bg-sky-800 p-2 shadow-sm flex flex-row gap-2">
              <UserGroupIcon className="text-white w-3 md:w-5" />
              <h2 className="text-white text-xl">
                {user_groups.name}
              </h2> 
            </div>
            
            <div className="rounded-b-lg bg-gray-50 p-2 shadow-sm">
              <div className="flex flex-row gap-2">
                <UserIcon className="text-sky-800 w-3 md:w-4" />
                {user_groups.admin_name}
              </div>

              {user_groups.users.map((user: string) => (
                <div key={user}
                  className="flex flex-row gap-2"
                >
                  <UserCircleIcon className="text-sky-800 w-3 md:w-4" />
                  <h3>{user}</h3>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}