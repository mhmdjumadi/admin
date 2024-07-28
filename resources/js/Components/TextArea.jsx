import { forwardRef, useEffect, useRef } from 'react';

const TextArea = forwardRef(function TextArea({ className = '', isFocused = false, ...props }, ref) {
    const textareaRef = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            textareaRef.current.focus();
        }
    }, [isFocused]);

    return (
        <textarea
            {...props}
            className={
                'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' +
                className
            }
            ref={textareaRef}
        />
    );
});

export default TextArea;
