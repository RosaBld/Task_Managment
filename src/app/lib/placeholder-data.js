const { v4: uuidv4 } = require('uuid');

const users = [
    {
        id: uuidv4(),
        name: 'God',
        email: 'god@nextmail.com',
        password: '123456789',
    },
];

const tasks = [
    {
        user_id: users[0].id,
        name: 'Create an App',
        priority: 'Urgent',
        deadline: '2024-03-01',
        status: false,
    },
    {
        user_id: users[0].id,
        name: 'Try not to Cry',
        priority: 'Urgent',
        deadline: '2024-03-01',
        status: false,
    },
    {
        user_id: users[0].id,
        name: 'Cry in Spanish',
        priority: 'Urgent',
        deadline: '2024-03-01',
        status: false,
    },
];


module.exports = {
    users,
    tasks
};
