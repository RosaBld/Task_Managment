import Form from "@/app/ui/groups/create";
import Breadcrumbs from "@/app/ui/newTasks/breadcrumbs";
import { fetchUsers } from "@/app/lib/data";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Create Groups',
};

export default async function Page() {
  const users = await fetchUsers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          {label: 'Groups', href: '/dashboard/groups/'},
          {
            label: 'Create Groups',
            href: '/dashboard/groups/create',
            active:true,
          },
        ]}
      />
      
      <Form users={users} />

    </main>
  )
}