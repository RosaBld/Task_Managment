'use client';

import { UserField } from "@/app/lib/definitions";
import Link from "next/link";
import { createGroup } from '@/app/lib/actions';
import { fetchUsers } from "@/app/lib/data";

export default function Form({
    users,
} : {
    users: UserField[];
}) {    
    return (
        <form action={createGroup}>
            <label>
                Group Name:
                <input type="text" name="groupName" />
            </label>
            <select
                id="user"
                name="userName"
                defaultValue=""
            >
                <option value="" disabled>
                    Select a member
                </option>
                {users.map((user) => (
                    <option key={user.id} value={user.id}>
                        {user.name}
                    </option>
                ))}
            </select>
            <label>
                User member:
            <input type="text" name="userMember" />
            </label>
            <input type="submit" value="Create Group" />
        </form>
    );
}