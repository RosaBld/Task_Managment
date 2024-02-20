import GroupList from "@/app/ui/groups/list";
import CreateGroupForm from "@/app/ui/groups/create";

export default function Groups() {
    return (
        <>
            <CreateGroupForm />
            <h2 className="font-bold text-2xl text-sky-900">
                Groups you are sharing tasks with
            </h2>
            <div className="grid grid-cols-2 mt-4">
                <GroupList />
            </div>
        </>
    )
}