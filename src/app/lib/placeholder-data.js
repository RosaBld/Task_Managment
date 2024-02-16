const { v4: uuidv4 } = require('uuid');

const users = [
    {
        id: uuidv4(),
        name: 'God',
        email: 'god@nextmail.com',
        password: '123456789',
    },
    {
        id: uuidv4(),
        name: 'Mary',
        email: 'mary@nextmail.com',
        password: '123456789',
    },
    {
        id: uuidv4(),
        name: 'Joseph',
        email: 'joseph@nextmail.com',
        password: '123456789',
    },
    {
        id: uuidv4(),
        name: 'Adam',
        email: 'adam@nextmail.com',
        password: '123456789',
    },
    {
        id: uuidv4(),
        name: 'Eve',
        email: 'eve@nextmail.com',
        password: '123456789',
    },
];

const user_group = [
    {
        id: uuidv4(),
        admin: users[0].id,
        members: [users[1].id, users[2].id],
        name: 'Family',
    }
]

const tasks = [
    {
        id: uuidv4(),
        createdBy: users[0].id,
        name: 'Create an App',
        priority: 'Urgent',
        deadline: '2024-03-01',
        details: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime quo voluptatem ullam aliquam! Quia architecto, mollitia ipsum dicta inventore consequuntur provident, illum eligendi et perferendis molestiae sapiente iusto! Repellendus, voluptatibus?',
        status: false,
    },
    {
        id: uuidv4(),
        createdBy: users[0].id,
        name: 'Try not to Cry',
        priority: 'Urgent',
        deadline: '2024-03-01',
        details: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime quo voluptatem ullam aliquam! Quia architecto, mollitia ipsum dicta inventore consequuntur provident, illum eligendi et perferendis molestiae sapiente iusto! Repellendus, voluptatibus?',
        status: false,
    },
    {
        id: uuidv4(),
        createdBy: users[0].id,
        name: 'Cry in Spanish',
        priority: 'Urgent',
        deadline: '2024-03-01',
        details: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime quo voluptatem ullam aliquam! Quia architecto, mollitia ipsum dicta inventore consequuntur provident, illum eligendi et perferendis molestiae sapiente iusto! Repellendus, voluptatibus?',
        status: false,
    },
];

const sharedWith = [
    {
        task: tasks[0].id,
        shared : [users[2].id, users[4].id],
    },
    {
        task: tasks[1].id,
        shared : [users[1].id, users[2].id],
    },
    {
        task: tasks[2].id,
        shared : [users[4].id, users[3].id, user_group[0].id],
    },
]

module.exports = {
    users,
    user_group,
    tasks,
    sharedWith,
};
