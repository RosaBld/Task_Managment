import { sql } from '@vercel/postgres';
import {
    User,
    Tasks,
    Groups,
    SharedWith
} from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchTasks() {
    noStore()
    try {
        const data = await sql<Tasks>`SELECT * FROM tasks`;

        return data.rows;

    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch tasks data.');
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