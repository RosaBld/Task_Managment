'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { signIn } from '../../../auth';
import { AuthError } from 'next-auth';

const FormSchema = z.object({
  id: z.string(),
  groupName: z.string(),
  adminName: z.string(),
  AdminId: z.string(),
  userMember:z.string(),
  userId: z.string(),
  title:z.string(),
  priority: z.enum(['Low', 'Medium', 'Urgent']),
  share: z.string(),
});

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



const CreateGroup=FormSchema.omit({ id: true, AdminId: true, userId: true });

export async function createGroup(formData: FormData) {
  const { groupName, adminName, userMember } = CreateGroup.parse ({
    groupName: formData.get('groupName'),
  adminName: formData.get('adminName'),
  userMember: formData.get('userMember'),
  });

  const { v4: uuidv4 } = require('uuid');
  const id = uuidv4();
  const userId = uuidv4();

  await sql`
  INSERT INTO user_group (id, name, admin)
  VALUES (${id}, ${groupName}, ${adminName})`;

  await sql`
  INSERT INTO users (id, name)
  VALUES (${userId}, ${userMember})`;

  revalidatePath('/dashboard/groups');
  redirect('/dashboard/groups');
}


export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
      await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}