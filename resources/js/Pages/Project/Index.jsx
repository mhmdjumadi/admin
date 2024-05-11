import { useRef, useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import FlashAlert from '@/Components/FlashAlert';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import BluebirdButton from '@/Components/BluebirdButton';
import { Head, router } from '@inertiajs/react';
import Currency from '@/Components/Currency';

export default function Project({ projects, auth, flash }) {
    const [open, setOpen] = useState(false);
    const projectNameInput = useRef();
    const personInput = useRef();
    const companyInput = useRef();
    const emailInput = useRef();
    const phoneInput = useRef();
    const priceInput = useRef();
    const billInput = useRef();

    const {
        data,
        setData,
        post,
        processing,
        reset,
        errors,
    } = useForm({
        project_name: '',
        person: '',
        company: '',
        email: '',
        phone: '',
        price: '',
        bill: ''
    });

    const confirmOpen = () => {
        setOpen(true);
    };

    const submit = async (e) => {
        e.preventDefault();

        post(route('projects.store'), {
            onSuccess: closeModal(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setOpen(false);

        reset();
    };

    const deleteProject = async (id) => {
        try {
            router.delete(`/projects/${id}`);
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Project</h2>}
            >
                <Head title="Project" />

                <div className='bg-white rounded-lg p-8'>
                    <FlashAlert flash={flash} />

                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <h1 className="text-base font-semibold leading-6 text-gray-900">Projects</h1>
                            <p className="mt-2 text-sm text-gray-700">
                                A list of all the users in your account including their name, title, email and role.
                            </p>
                        </div>
                        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                            <button
                                onClick={confirmOpen}
                                type="button"
                                className="block rounded-md bg-bluebird px-5 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Add project
                            </button>
                        </div>
                    </div>
                    <div className="mt-8 flow-root">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                                Name
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Person
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Company
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Email
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Phone
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Price
                                            </th>
                                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                                <span className="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {projects && projects.map((project) => (
                                            <tr key={project.id}>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                                    {project.project_name}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{project.person}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{project.company}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{project.email}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{project.phone}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"><Currency amount={project.price} currency="idr" /></td>
                                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                                    <a href={route('projects.show', project.id)} className="text-indigo-600 hover:text-indigo-900 ml-4">
                                                        View<span className="sr-only">, {project.name}</span>
                                                    </a>
                                                    <button className="text-red-600 hover:text-red-900 ml-4" onClick={() => deleteProject(project.id)}>
                                                        Delete<span className="sr-only">, {project.name}</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal show={open} onClose={closeModal}>
                    <form onSubmit={submit} className="p-6">
                        <h2 className="text-lg font-medium text-gray-900">
                            Add project
                        </h2>

                        <p className="mt-1 text-sm text-gray-600">
                            Once your account is deleted, all of its resources and data will be permanently deleted. Please
                            enter your password to confirm you would like to permanently delete your account.
                        </p>
                        <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 gap-4 mt-6">
                            <div>
                                <InputLabel htmlFor="project_name" value="Project Name" />

                                <TextInput
                                    id="project_name"
                                    type="text"
                                    name="project_name"
                                    ref={projectNameInput}
                                    value={data.project_name}
                                    onChange={(e) => setData('project_name', e.target.value)}
                                    className="mt-1 w-full"
                                    required
                                    placeholder="Project Name"
                                />

                                <InputError message={errors.project_name} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="person" value="Person" />

                                <TextInput
                                    id="person"
                                    type="text"
                                    name="person"
                                    ref={personInput}
                                    value={data.person}
                                    onChange={(e) => setData('person', e.target.value)}
                                    className="mt-1 w-full"
                                    required
                                    placeholder="Person"
                                />

                                <InputError message={errors.person} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="company" value="Company" />

                                <TextInput
                                    id="company"
                                    type="text"
                                    name="company"
                                    ref={companyInput}
                                    value={data.company}
                                    onChange={(e) => setData('company', e.target.value)}
                                    className="mt-1 w-full"
                                    required
                                    placeholder="Company"
                                />

                                <InputError message={errors.company} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="email" value="Email" />

                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    ref={emailInput}
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="mt-1 w-full"
                                    required
                                    placeholder="Email"
                                />

                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="phone" value="Phone" />

                                <TextInput
                                    id="phone"
                                    type="text"
                                    name="phone"
                                    ref={phoneInput}
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    className="mt-1 w-full"
                                    required
                                    placeholder="Phone"
                                />

                                <InputError message={errors.phone} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="price" value="Price" />

                                <TextInput
                                    id="price"
                                    type="text"
                                    name="price"
                                    ref={priceInput}
                                    value={data.Price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    className="mt-1 w-full"
                                    required
                                    placeholder="Price"
                                />

                                <InputError message={errors.price} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="bill" value="Bill" />

                                <TextInput
                                    id="bill"
                                    type="text"
                                    name="bill"
                                    ref={billInput}
                                    value={data.bill}
                                    onChange={(e) => setData('bill', e.target.value)}
                                    className="mt-1 w-full"
                                    required
                                    placeholder="Bill"
                                />

                                <InputError message={errors.bill} className="mt-2" />
                            </div>
                        </div>


                        <div className="mt-6 flex justify-end">
                            <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                            <BluebirdButton className="ms-3" disabled={processing}>
                                Add Project
                            </BluebirdButton>
                        </div>
                    </form>
                </Modal>

            </AuthenticatedLayout>
        </>
    )
}
