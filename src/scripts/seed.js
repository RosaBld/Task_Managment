const { db } = require('@vercel/postgres');

const {
    users,
    tasks
} = require('../app/lib/placeholder-data.js');

const bcrypt = require('bcrypt');

async function seedUsers(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const createTable=await client.sql`
            CREATE TABLE IF NOT EXISTS users (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL
            );
        `;

        console.log(`Created "users" table` );

        const insertedUsers = await Promise.all(
            users.map(async (user) => {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                return client.sql`
                INSERT INTO users (id, name, email, password)
                VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
                ON CONFLICT (id) DO NOTHING;
            `;
            }) 
        );

        console.log(`Seeded ${insertedUsers.length} users`);

        return {
            createTable,
            users: insertedUsers,
        };
    } catch (error) {
        console.error('Error seeding users:', error);
        throw error;
    }
}

async function seedTasks(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS tasks (
                user_id UUID NOT NULL REFERENCES users(id),
                name VARCHAR(255) NOT NULL,
                priority VARCHAR(255) NOT NULL,
                deadline DATE NOT NULL,
                status BOOLEAN NOT NULL,
                PRIMARY KEY (user_id, name)
            );
        `;

        console.log(`Created "tasks" table` );

        const insertedTasks = await Promise.all(
            tasks.map(async (task) => {
                return client.sql`
                    INSERT INTO tasks (user_id, name, priority, deadline, status)
                    VALUES (${task.user_id}, ${task.name}, ${task.priority}, ${task.deadline}, ${task.status})
                    ON CONFLICT (user_id, name) DO NOTHING;
                `;
            }) 
        );

        console.log(`Seeded ${insertedTasks.length} tasks`);

        return {
            createTable,
            tasks: insertedTasks,
        };
    } catch (error) {
        console.error('Error seeding tasks:', error);
        throw error;
    }
}

async function main() {
    const client = await db.connect();

    await seedUsers(client);
    await seedTasks(client);

    await client.end();
}

main().catch((err) => {
    console.error(
        'An error occurred while attempting to seed the database:',
        err,
    );
});