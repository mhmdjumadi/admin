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
    const amountInput = useRef();
    const descriptionInput = useRef();

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
        amount: '',
        description: '',
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
                        A list of all the invoices in your project.
                    </p>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-0">
                                        Invoice Name
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-medium text-gray-900">
                                        Invoice Date
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-medium text-gray-900">
                                        Number
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-medium text-gray-900">
                                        Amount
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-medium text-gray-900">
                                        Description
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-medium text-gray-900">
                                        Created
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {project.invoices && project.invoices.map((invoice) => (
                                    <tr key={invoice.id}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                            {invoice.invoice_name}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"><Date date={invoice.invoice_date} format="DD-MM-YYYY" /></td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{invoice.invoice_no}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"><Currency amount={invoice.amount} currency="idr" /></td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{invoice.description}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"><Date date={invoice.created_at} format="DD-MM-YYYY" /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
}
