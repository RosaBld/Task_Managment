import { fetchTasks } from "@/app/lib/data"
import Form from "@/app/ui/newTasks/create-form"

export default async function NewTasks() {
    
    const tasks = await fetchTasks();

    return (
        <main>
            <Form tasks={tasks} />
        </main>
    )
}