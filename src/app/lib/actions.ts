'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
    id: z.string(),
    title: z.string({
        invalid_type_error:'Please, enter a title for your task',
    }),
    deadline:z.string({
        invalid_type_error:'Please, chose a deadline date',
    }),
    priority:z.enum(['Low', 'Medium', 'Urgent'], {
        invalid_type_error:'Please, select a priority.',
    }),
    share: z.string(),
})

export type State = {
    errors: {
        title: string[];
        deadline: string[];
        priority: string[];
        share: string[];
    };
    message: string | null;
};

const CreateTask = FormSchema.omit({ id: true });

export async function createTask(formData: FormData) {
    
    const validatedFields = CreateTask.safeParse({
        title: formData.get('title'),
        deadline: formData.get('deadline'),
        priority: formData.get('priority'),
        share: formData.get('share'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        };
    }

    const { title, priority, share } = validatedFields.data;
    const deadline = new Date().toISOString().split('T')[0];

    try {
        await sql`
            INSERT INTO tasks (name, deadline, priority)
            VALUES (${title}, ${deadline}, ${priority})
        `;
        await sql`
            INSERT INTO sharing_people (users)
            VALUES (${share})
        `;
    } catch (error) {
        return {
            message: 'Database Error: Failed to create Task.',
        };
    }

    revalidatePath('/dashboard');
    redirect('/dashboard');
}
