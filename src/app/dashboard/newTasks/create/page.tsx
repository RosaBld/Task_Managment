import Form from '@/app/ui/newTasks/create-form';
import Breadcrumbs from '@/app/ui/newTasks/breadcrumbs';
import { fetchUsers } from '@/app/lib/data';
 
export default async function Page() {
    const user = await fetchUsers();
    
    return (
        <main>
        
        <Breadcrumbs
            breadcrumbs={[
            { label: 'Invoices', href: '/dashboard/invoices' },
            {
                label: 'Create Invoice',
                href: '/dashboard/invoices/create',
                active: true,
            },
            ]}
        />
        <Form user={user} />
        </main>
    );
}