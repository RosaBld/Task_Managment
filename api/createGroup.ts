// // /api/createGroup.ts
// import { sql } from '@vercel/postgres';

// import type { NextApiRequest, NextApiResponse } from 'next'

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method === 'POST') {
//         // Get the group data from the request body
//         const { groupName, adminName, userName } = req.body;

//         try {
//             await sql`
//                 INSERT INTO user_groups (admin, name)
//                 VALUES (${adminName}, ${groupName})
//             `;
//             await sql`
//                 INSERT INTO group_memebers (member_id)
//                 VALUES (${userName})
//             `;
//         } catch (error) {
//             res.status(500).json({ message: 'Database Error: Failed to create group.' });
//             return;
//         }
//         // TODO: Add code here to create a group in the database with groupName and adminName

//         // Send a response
//         res.status(200).json({ message: 'Group created successfully' });
//     } else {
//         // Handle any other HTTP method
//         res.setHeader('Allow', ['POST']);
//         res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
// }