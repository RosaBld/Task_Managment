export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
};

export type Tasks = {
    id: string,
    createdBy: string,
    name: string,
    priority: 'Low' | 'Medium' | 'Urgent',
    deadline: string,
    details: string,
    status: 'pending' | 'done',
}

export type Groups = {
    id: string,
    admin: string,
    members: string[],
    name: string,
}

export type SharingPeople = {
    task: string,
    shared : string[],
}

export type SharingGroup = {
    task: string,
    shared : string[],
}