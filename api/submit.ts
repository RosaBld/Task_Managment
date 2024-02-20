// import type { NextApiRequest, NextApiResponse } from 'next'
// import { createTask } from '../lib/actions';
// import { z } from 'zod';

// const FormSchema = z.object({
//     id: z.string(),
//     title: z.string({
//         invalid_type_error:'Please, enter a title for your task',
//     }),
//     deadline:z.string({
//         invalid_type_error:'Please, chose a deadline date',
//     }),
//     priority:z.enum(['Low', 'Medium', 'Urgent'], {
//         invalid_type_error:'Please, select a priority.',
//     }),
//     share: z.string(),
// })
 
// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse
// ) {
//     const parsed = FormSchema.parse(req.body)
//     const data = req.body
//     const id = await createTask(data)
//     res.status(200).json({ id })
// }
