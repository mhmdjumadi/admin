import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { forwardRef } from 'react';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const ListBox = forwardRef(({
    id,
    type,
    name,
    options,
    className,
    required,
    value,
    onChange
}, ref) => {

    return (
        <Listbox value={value} onChange={(val) => onChange({ target: { name, value: val } })}>
            {({ open }) => (
                <>
                    <div className={`relative mt-1 ${className}`}>
                        <ListboxButton
                            id={id}
                            type={type}
                            name={name}
                            ref={ref}
                            required={required}
                            className={
                                `border-gray-300 focus:border-indigo-500 text-left focus:ring-indigo-500 rounded-md shadow-sm ${className}`
                            }
                        >
                            <span className="block truncate text-sm">
                                {value ? options.find(option => option.value === value)?.label : 'Select option'}
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                        </ListboxButton>

                        <Transition
                            show={open}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {options.map((option) => (
                                    <ListboxOption
                                        key={option.value}
                                        value={option.value}
                                        className={({ focus }) =>
                                            classNames(
                                                focus ? 'bg-bluebird text-white' : '',
                                                'relative cursor-default select-none py-2 pl-3 pr-9'
                                            )
                                        }
                                    >
                                        {({ selected, focus }) => (
                                            <>
                                                <span className={classNames(selected ? 'font-medium' : 'font-sm', 'block truncate')}>
                                                    {option.label}
                                                </span>
                                                {selected && (
                                                    <span
                                                        className={classNames(
                                                            focus ? 'text-white' : 'text-bluebird',
                                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                                        )}
                                                    >
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                )}
                                            </>
                                        )}
                                    </ListboxOption>
                                ))}
                            </ListboxOptions>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    );
});

export default ListBox;