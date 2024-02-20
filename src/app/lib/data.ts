import { sql } from '@vercel/postgres';
import {
    User,
    UserField,
    Tasks,
    Groups,
    SharingPeople,
    SharingGroup
} from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchTasks() {
    noStore()
    try {
        const tasksResult = await sql<Tasks & { username: string }>`
            SELECT tasks.*, users.name AS username
            FROM tasks
            INNER JOIN users ON tasks.CreatedBy = users.id`;

        const sharingResult = await sql<SharingPeople & { sharedtask: string, sharedwith: string[] }>`
            SELECT sharing_people.task AS sharedTask, ARRAY_AGG(users.name) AS sharedWith
            FROM sharing_people
            INNER JOIN users ON sharing_people.users = users.id
            GROUP BY sharing_people.task`;

        const sharingGroupResult = await sql<SharingGroup & { sharedtask: string, sharedwith: string[] }>`
            SELECT sharing_group.task AS sharedtask, ARRAY_AGG(user_group.name) AS sharedwith
            FROM sharing_group
            INNER JOIN user_group ON sharing_group.users = user_group.id
            GROUP BY sharing_group.task`;

        const sharingPeopleMap = sharingResult.rows.reduce<Record<string, string[]>>((map, { sharedtask, sharedwith }) => {
            map[sharedtask] = sharedwith;
            return map;
        }, {});
        
        const sharingGroupMap = sharingGroupResult.rows.reduce<Record<string, string[]>>((map, { sharedtask, sharedwith }) => {
            map[sharedtask] = sharedwith;
            return map;
        }, {});
        
        return tasksResult.rows.map((task: Tasks & { username: string }) => ({
            ...task,
            sharedWithPeople: sharingPeopleMap[task.id] || [],
            sharedWithGroups: sharingGroupMap[task.id] || []
        }));
        

    } catch (error) {
        console.error('Database Error:', error);
        throw error;
    }
}

export async function fetchTasksData() {
    noStore()
    try {
        const taskCountPromise = sql`SELECT COUNT(*) FROM tasks`;        
        const taskStatusPromise = sql`SELECT
            SUM(CASE WHEN status = 'true' THEN 1 ELSE 0 END) AS "done",
            SUM(CASE WHEN status = 'false' THEN 1 ELSE 0 END) AS "pending"
            FROM tasks`;

        const data = await Promise.all([
            taskCountPromise,
            taskStatusPromise,
        ]);

        const numberOfTasks = Number(data[0].rows[0].count ?? '0');
        const totalCompletedTasks = Number(data[1].rows[0].done ?? '0');
        const totalPendingTasks = Number(data[1].rows[0].pending ?? '0');

        return {
            numberOfTasks,
            totalCompletedTasks,
            totalPendingTasks,
        }

    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch tasks data.');
    }
}

export async function fetchGroups() {
    noStore()
    try {
        const groupsResult = await sql<Groups>`
            SELECT user_group.*, users.name AS admin_name FROM user_group
            JOIN group_members
            ON user_group.id = group_members.group_id
            JOIN users
            ON user_group.admin = users.id`;

        const groupUsersResult = await sql<User>`
            SELECT users.id, users.name, group_members.group_id AS groupId
            FROM users
            INNER JOIN group_members ON users.id = group_members.member_id`;

        const groups = groupsResult.rows;
        const groupUsers = groupUsersResult.rows;

        const uniqueGroups = Array.from(new Set(groups.map(group => group.id)))
            .map(id => {
                const group = groups.find(group => group.id === id);
                if (group) {
                    return group;
                } else {
                    throw new Error(`Group with id ${id} not found`);
                }
            });

        const groupsMap = new Map();

        uniqueGroups.forEach((group: Groups) => {
            groupsMap.set(group.id, {
                ...group,
                member_id: [],
                users: [],
            });
        });

        groupUsers.forEach((user: User) => {
            uniqueGroups.forEach((group: Groups) => {
                if (group.id === user.groupid) {
                    const groupEntry = groupsMap.get(group.id);
                    groupEntry.member_id.push(user.id);
                    groupEntry.users.push(user.name);
                }
            });
        });

        return Array.from(groupsMap.values());
        
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch group data.');
    }
}

export async function fetchUsers() {
    noStore()
    try {
        const data = await sql<UserField>`SELECT id, name FROM users`;
        const user = data.rows;
        return user;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch user name data.');
    }
}