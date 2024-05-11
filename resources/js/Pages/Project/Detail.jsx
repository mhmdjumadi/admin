import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import UpdateProjectForm from './Partials/UpdateProjectForm';
import Invoice from './Partials/Invoice';


const DetailProject = ({ auth, project, flash }) => {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Detail Project</h2>}
        >
            <Head title="Project" />

            <div className='bg-white rounded-lg p-8'>
                <UpdateProjectForm project={project} flash={flash} className='' />
            </div>

            <div className='bg-white rounded-lg p-8 mt-5'>
                <Invoice project={project} flash={flash} className='' />
            </div>
        </AuthenticatedLayout>
    )
}

export default DetailProject