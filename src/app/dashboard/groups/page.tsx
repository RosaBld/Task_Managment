import Form from "@/app/ui/groups/create";
import Breadcrumbs from "@/app/ui/newTasks/breadcrumbs";
import GroupList from "@/app/ui/groups/list";
import { CreateGroup } from "@/app/ui/groups/buttons";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Groups',
};

export default function Groups() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          {label: 'Groups', href: '/dashboard/groups/'},                   
        ]}
      />
      <CreateGroup />
      <h2 className="font-bold text-2xl text-sky-900">
        Groups you are sharing tasks with
      </h2>
      <div className="grid grid-cols-2 mt-4">
        <GroupList />
      </div>
    </main>
  )
}