import { useRef, useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';
import { Head, router, useForm } from '@inertiajs/react';
import FlashAlert from '@/Components/FlashAlert';
import BluebirdButton from '@/Components/BluebirdButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Currency from '@/Components/Currency';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import Date from '@/Components/Date';
import SelectDropdown from '@/Components/SelectDropDown';
import ListBox from '@/Components/ListBox';

const people = [
    { id: 1, name: 'Wade Cooper' },
    { id: 2, name: 'Arlene Mccoy' },
    { id: 3, name: 'Devon Webb' },
    { id: 4, name: 'Tom Cook' },
    { id: 5, name: 'Tanya Fox' },
    { id: 6, name: 'Hellen Schmidt' },
    { id: 7, name: 'Caroline Schultz' },
    { id: 8, name: 'Mason Heaney' },
    { id: 9, name: 'Claudie Smitham' },
    { id: 10, name: 'Emil Schaefer' },
];

export default function Invoice({ auth, invoices, flash, className = '' }) {
    const [open, setOpen] = useState(false);
    const invoiceNameInput = useRef();
    const invoiceDateInput = useRef();
    const amountInput = useRef();
    const descriptionInput = useRef();
    const projectIDInput = useRef();
    const [options, setOptions] = useState([]);

    const [selected, setSelected] = useState(null);

    const {
        data,
        setData,
        delete: destroy,
        post,
        processing,
        reset,
        errors,
    } = useForm({
        project_id: '',
        invoice_date: '',
        invoice_name: '',
        amount: '',
        description: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(data)

        post(route('invoices.store'), {
            onSuccess: closeModal(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setOpen(false);

        reset();
    };

    const openModal = async () => {
        try {
            const response = await fetch('/api/projects');
            const data = await response.json();

            const formattedOptions = data.map(project => ({
                value: project.id,
                label: project.project_name
            }));

            setOptions(formattedOptions);
            setOpen(true);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    }

    const deleteInvoice = async (id) => {
        try {
            destroy(`/invoices/${id}`, {
                onBefore: () => confirm('Are you sure you want to delete this user?'),
            })
        } catch (error) {
            console.error('Error deleting invoice:', error);
        }
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setData({ project_id: value });
        setSelected(options.find(option => option.id === value));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Project</h2>}
        >
            <Head title="Invoice" />

            <div className='bg-white rounded-lg p-8'>
                <FlashAlert flash={flash} />

                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-base font-semibold leading-6 text-gray-900">Invoices</h1>
                        <p className="mt-2 text-sm text-gray-700">
                            A list of all the invoices in your project.
                        </p>
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <BluebirdButton className="ms-3" onClick={openModal}>
                            Add invoice
                        </BluebirdButton>
                    </div>
                </div>
                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead>
                                    <tr>
                                        <th scope="col" className="py-3.5 text-left text-sm font-medium text-gray-900">
                                            Number
                                        </th>
                                        <th scope="col" className="py-3.5 text-left text-sm font-medium text-gray-900 sm:pl-0">
                                            Invoice Name
                                        </th>
                                        <th scope="col" className="py-3.5 text-left text-sm font-medium text-gray-900 sm:pl-0">
                                            Project Name
                                        </th>
                                        <th scope="col" className="py-3.5 text-left text-sm font-medium text-gray-900">
                                            Invoice Date
                                        </th>
                                        <th scope="col" className="py-3.5 text-left text-sm font-medium text-gray-900">
                                            Amount
                                        </th>
                                        <th scope="col" className="py-3.5 text-left text-sm font-medium text-gray-900">
                                            Description
                                        </th>
                                        <th scope="col" className="py-3.5 text-left text-sm font-medium text-gray-900">
                                            Created
                                        </th>
                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {invoices && invoices.map((invoice) => (
                                        <tr key={invoice.id}>
                                            <td className="whitespace-nowrap py-4 pr-3 text-sm text-gray-500">{invoice.invoice_no}</td>
                                            <td className="whitespace-nowrap py-4 pr-3 text-sm text-gray-900 sm:pl-0">
                                                {invoice.invoice_name}
                                            </td>
                                            <td className="whitespace-nowrap py-4 pr-3 text-sm text-gray-900 sm:pl-0">
                                                {invoice.project && invoice.project.project_name}
                                            </td>
                                            <td className="whitespace-nowrap py-4 text-sm text-gray-500"><Date date={invoice.invoice_date} format="DD-MM-YYYY" /></td>
                                            <td className="whitespace-nowrap py-4 text-sm text-gray-500"><Currency amount={invoice.amount} currency="idr" /></td>
                                            <td className="whitespace-nowrap py-4 text-sm text-gray-500">{invoice.description}</td>
                                            <td className="whitespace-nowrap py-4 text-sm text-gray-500"><Date date={invoice.created_at} format="DD-MM-YYYY" /></td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                                <button className="text-red-600 hover:text-red-900 ml-4" onClick={() => deleteInvoice(invoice.id)}>
                                                    Delete<span className="sr-only">, {invoice.name}</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <Modal show={open} onClose={closeModal}>
                    <form onSubmit={handleSubmit} className="p-6">
                        <h2 className="text-lg font-medium text-gray-900">
                            Add Invoice
                        </h2>

                        <p className="mt-1 text-sm text-gray-600">
                            Add your invoices project.
                        </p>
                        <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 gap-4 mt-6">
                            <div>
                                <InputLabel htmlFor="invoice_date" value="Invoice Date" />

                                <TextInput
                                    id="invoice_date"
                                    type="date"
                                    name="invoice_date"
                                    ref={invoiceDateInput}
                                    value={data.invoice_date}
                                    onChange={(e) => setData('invoice_date', e.target.value)}
                                    className="mt-1 w-full text-sm"
                                    required
                                    placeholder="Invoice Date"
                                />

                                <InputError message={errors.invoice_date} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="invoice_name" value="Invoice Name" />

                                <TextInput
                                    id="invoice_name"
                                    type="text"
                                    name="invoice_name"
                                    ref={invoiceNameInput}
                                    value={data.invoice_name}
                                    onChange={(e) => setData('invoice_name', e.target.value)}
                                    className="mt-1 w-full text-sm"
                                    required
                                    placeholder="Invoice Name"
                                />

                                <InputError message={errors.invoice_name} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="amount" value="Amount" />

                                <TextInput
                                    id="amount"
                                    type="text"
                                    name="amount"
                                    ref={amountInput}
                                    value={data.amount}
                                    onChange={(e) => setData('amount', e.target.value)}
                                    className="mt-1 w-full text-sm"
                                    required
                                    placeholder="0"
                                />

                                <InputError message={errors.amount} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="project" value="Project" />

                                <ListBox
                                    id="project_id"
                                    type="text"
                                    name="project_id"
                                    ref={projectIDInput}
                                    options={options}
                                    className="w-full"
                                    required
                                    value={data.project_id}
                                    onChange={(e) => setData(e.target.name, e.target.value)}
                                />

                                <InputError message={errors.project_id} className="mt-2" />
                            </div>
                        </div>
                        <div className='mt-6'>
                            <InputLabel htmlFor="description" value="Description" />

                            <TextArea
                                id="description"
                                type="text"
                                name="description"
                                ref={descriptionInput}
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="mt-1 w-full text-sm"
                                required
                                placeholder="Description"
                            />

                            <InputError message={errors.description} className="mt-2" />
                        </div>


                        <div className="mt-6 flex justify-end">
                            <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                            <BluebirdButton className="ms-3" disabled={processing}>
                                Add Invoice
                            </BluebirdButton>
                        </div>
                    </form>
                </Modal>
            </div>
        </AuthenticatedLayout>
    );
}
