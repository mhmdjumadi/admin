import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { useForm } from '@inertiajs/react';
import FlashAlert from '@/Components/FlashAlert';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import BluebirdButton from '@/Components/BluebirdButton';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';


const EditProject = ({ auth, project, flash }) => {
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
        put,
        processing,
        reset,
        errors,
    } = useForm({
        project_name: project?.project_name || '',
        person: project?.person || '',
        company: project?.company || '',
        email: project?.email || '',
        phone: project?.phone || '',
        price: project?.price || '',
        bill: project?.bill || '',
    });

    const handleUpdate = (e) => {
        e.preventDefault();

        put(route('projects.update', project.id));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const closeModal = () => {
        setOpen(false);

        reset();
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Detail Project</h2>}
        >
            <Head title="Project" />

            <div className='bg-white rounded-lg p-8'>
                <FlashAlert flash={flash} />

                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-lg font-semibold leading-6 text-gray-900">Projects</h1>
                        <p className="mt-2 text-sm text-gray-700">
                            A list of all the users in your account including their name, title, email and role.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleUpdate}>
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
                    </div>
                    <div className="grid lg:grid-cols-3 md:grid-cols-3 gap-4 mt-4">
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
                                value={data.price}
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
                        {/* <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton> */}

                        <BluebirdButton className="ms-3" disabled={processing}>
                            Update Project
                        </BluebirdButton>
                    </div>
                </form>

            </div>

            <div className='bg-white rounded-lg p-8 mt-5'>
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
                            onClick={() => setOpen(true)}
                            type="button"
                            className="block rounded-md bg-bluebird px-5 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Add Invoice
                        </button>
                    </div>
                </div>
            </div>

            <Modal show={open} onClose={closeModal}>
                <form onSubmit={handleSubmit} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Add Invoice
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
    )
}

export default EditProject