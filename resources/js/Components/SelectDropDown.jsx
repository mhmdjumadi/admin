import React, { forwardRef, useEffect, useRef } from 'react';

const SelectDropdown = forwardRef(function SelectDropdown({ className = '', isFocused = false, options = [], ...props }, ref) {
    const selectRef = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            selectRef.current.focus();
        }
    }, [isFocused]);

    return (
        <div className="relative inline-block w-full">
            <select
                {...props}
                className={
                    'bg-white border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' +
                    className
                }
                ref={selectRef}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
});

export default SelectDropdown;
