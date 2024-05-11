import { useRef, useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { router, useForm } from '@inertiajs/react';
import FlashAlert from '@/Components/FlashAlert';
import BluebirdButton from '@/Components/BluebirdButton';
import Currency from '@/Components/Currency';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import Date from '@/Components/Date';

export default function Invoice({ project, flash, className = '' }) {
    const [open, setOpen] = useState(false);
    const invoiceNameInput = useRef();
    const invoiceDateInput = useRef();
    const totalInput = useRef();

    const {
        data,
        setData,
        post,
        processing,
        reset,
        errors,
    } = useForm({
        project_id: project?.id || '',
        invoice_date: '',
        invoice_name: '',
        total: '',
    });
    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('invoices.store'), {
            onSuccess: closeModal(),
            onFinish: () => reset(),
        });

    };

    const closeModal = () => {
        setOpen(false);

        reset();
    };

    const deleteInvoice = async (id) => {
        try {
            router.delete(`/invoices/${id}`);
        } catch (error) {
            console.error('Error deleting invoice:', error);
        }
    };

    return (
        <section className={className}>
            <FlashAlert flash={flash} />

            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">Invoices</h1>
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
                        Add invoice
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
                                        Invoice Name
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Invoice Date
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Number
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Total
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Created
                                    </th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {project.invoices && project.invoices.map((invoice) => (
                                    <tr key={invoice.id}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                            {invoice.invoice_name}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"><Date date={invoice.invoice_date} format="DD MMMM YYYY" /></td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{invoice.invoice_no}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"><Currency amount={invoice.total} currency="idr" /></td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"><Date date={invoice.created_at} format="DD MMMM YYYY" /></td>
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
                        Once your account is deleted, all of its resources and data will be permanently deleted. Please
                        enter your password to confirm you would like to permanently delete your account.
                    </p>
                    <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3 gap-4 mt-6">
                        <div>
                            <InputLabel htmlFor="invoice_date" value="Invoice Date" />

                            <TextInput
                                id="invoice_date"
                                type="date"
                                name="invoice_date"
                                ref={invoiceDateInput}
                                value={data.invoice_date}
                                onChange={(e) => setData('invoice_date', e.target.value)}
                                className="mt-1 w-full"
                                required
                                placeholder="Invoice Date"
                            />

                            <InputError message={errors.email} className="mt-2" />
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
                                className="mt-1 w-full"
                                required
                                placeholder="Invoice Name"
                            />

                            <InputError message={errors.phone} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="total" value="Total" />

                            <TextInput
                                id="total"
                                type="text"
                                name="total"
                                ref={totalInput}
                                value={data.total}
                                onChange={(e) => setData('total', e.target.value)}
                                className="mt-1 w-full"
                                required
                                placeholder="0"
                            />

                            <InputError message={errors.total} className="mt-2" />
                        </div>
                    </div>


                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                        <BluebirdButton className="ms-3" disabled={processing}>
                            Add Invoice
                        </BluebirdButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
