import { sql } from '@vercel/postgres';
import {
    User,
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
        const data = await sql<Groups>`SELECT * FROM user_group
            JOIN * FROM group_members`;
        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch group data.');
    }
}

export async function fetchUsers() {
    noStore()
    try {
        const data = await sql<User>`SELECT name FROM users`;
        return data;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch user name data.');
    }
}