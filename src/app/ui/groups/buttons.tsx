import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";

export function CreateGroup() {
  return (
    <Link
      href="/dashboard/groups/create"
      className=""
    >
      <span className="">Create Group</span>
      <PlusIcon className="w-3 md:w-4" />
    </Link>
  )
}