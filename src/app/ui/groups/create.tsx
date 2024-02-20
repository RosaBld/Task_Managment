'use client';

import React, { useState } from 'react';

export default function CreateGroupForm() {
    const [groupName, setGroupName] = useState('');
    const [adminName, setAdminName] = useState('');
    const [userName, setUserName] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const groupData = { groupName, adminName };

        const response = await fetch('/api/createGroup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(groupData),
        });

        if (response.ok) {
            console.log('Group created successfully');
        } else {
            console.error('Failed to create group');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Group Name:
                <input type="text" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
            </label>
            <label>
                Admin Name:
                <input type="text" value={adminName} onChange={(e) => setAdminName(e.target.value)} />
            </label>
            <label>
                User Name:
            <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
            </label>
            <input type="submit" value="Create Group" />
        </form>
    );
}