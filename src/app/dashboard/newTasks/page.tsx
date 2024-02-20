import { fetchTasks } from "@/app/lib/data"
import Form from "@/app/ui/newTasks/create-form"

export default async function NewTasks() {
    
    const user = await fetchTasks();

    return (
        <main>
            <Form user={user} />
        </main>
    )
}