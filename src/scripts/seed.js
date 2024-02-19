const { db } = require('@vercel/postgres');

const {
    users,
    user_group,
    tasks,
    sharing_people,
    sharing_group
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

async function seedGroup(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS user_group (
            id UUID NOT NULL,
            admin UUID NOT NULL,
            name VARCHAR(255) NOT NULL,
            PRIMARY KEY (id)
        )`;

        console.log(`Created "user_group" table`);

        const createMembersTable = await client.sql`
        CREATE TABLE IF NOT EXISTS group_members (
            group_id UUID NOT NULL REFERENCES user_group(id),
            member_id UUID NOT NULL,
            PRIMARY KEY (group_id, member_id)
        )`;

        console.log(`Created "group_members" table`);

        const insertedGroup = await Promise.all(
            user_group.map(async (group) => {
                const result = await client.sql`
                    INSERT INTO user_group (id, admin, name)
                    VALUES (${group.id}, ${group.admin}, ${group.name})
                    ON CONFLICT (id) DO NOTHING;
                `;

                await Promise.all(
                    group.members.map(async (memberId) => {
                        return client.sql`
                            INSERT INTO group_members (group_id, member_id)
                            VALUES (${group.id}, ${memberId})
                            ON CONFLICT (group_id, member_id) DO NOTHING;
                        `;
                    })
                );

                return result;
            })
        );

        console.log(`Seeded ${insertedGroup.length} groups`);

        return {
            createTable,
            createMembersTable,
            groups: insertedGroup,
        };
    } catch (error) {
        console.error('Error seeding groups:', error);
        throw error;
    }
}

async function seedTasks(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS tasks (
                id UUID NOT NULL,
                createdBy UUID NOT NULL REFERENCES users(id),
                name VARCHAR(255) NOT NULL,
                priority VARCHAR(255) NOT NULL,
                deadline DATE NOT NULL,
                details VARCHAR(255) NOT NULL,
                status BOOLEAN NOT NULL,
                PRIMARY KEY (id, createdBy, name)
            );
        `;

        console.log(`Created "tasks" table` );

        const insertedTasks = await Promise.all(
            tasks.map(async (task) => {
                return client.sql`
                    INSERT INTO tasks (id, createdBy, name, priority, deadline, details, status)
                    VALUES (${task.id}, ${task.createdBy}, ${task.name}, ${task.priority}, ${task.deadline}, ${task.details}, ${task.status})
                    ON CONFLICT (id, createdBy, name) DO NOTHING;
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

async function seedShared(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS sharing_people (
            task UUID NOT NULL,
            users UUID NOT NULL,
            PRIMARY KEY (task, users)
        )`;

        console.log(`Created "shared with" table`);
        
        const insertedShared = await Promise.all(
            sharing_people.map(async (sharing_people) => {
                return Promise.all(
                    sharing_people.users.map(async (users) => {
                        return client.sql`
                            INSERT INTO sharing_people (task, users)
                            VALUES (${sharing_people.task}, ${users})
                            ON CONFLICT (task, users) DO NOTHING;
                        `;
                    })
                );
            })
        );
        
        console.log(`Seeded ${insertedShared.length} tasks`);

        return {
            createTable,
            tasks: insertedShared,
        };
    } catch (error) {
        console.error('Error seeding tasks:', error);
        throw error;
    }
}

async function seedSharedGroup(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS sharing_group (
            task UUID NOT NULL,
            users UUID NOT NULL,
            PRIMARY KEY (task, users)
        )`;

        console.log(`Created "shared with" table`);
        
        const insertedShared = await Promise.all(
            sharing_group.map(async (sharing_group) => {
                return Promise.all(
                    sharing_group.users.map(async (users) => {
                        return client.sql`
                            INSERT INTO sharing_group (task, users)
                            VALUES (${sharing_group.task}, ${users})
                            ON CONFLICT (task, users) DO NOTHING;
                        `;
                    })
                );
            })
        );
        
        console.log(`Seeded ${insertedShared.length} tasks`);

        return {
            createTable,
            tasks: insertedShared,
        };
    } catch (error) {
        console.error('Error seeding tasks:', error);
        throw error;
    }
}

async function main() {
    const client = await db.connect();

    await seedUsers(client);
    await seedGroup(client, user_group);
    await seedTasks(client);
    await seedShared(client);
    await seedSharedGroup(client);

    await client.end();
}

main().catch((err) => {
    console.error(
        'An error occurred while attempting to seed the database:',
        err,
    );
});