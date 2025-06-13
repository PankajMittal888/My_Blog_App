


import React, { useId } from 'react'

function Select({
    options,
    label,
    className,
    ...props
}, ref) {
    const id = useId()
    return (
        <div className='w-full'>
            {label && (
                <label 
                    htmlFor={id} 
                    className='block text-sm sm:text-base font-medium text-[#245F73] mb-1'
                >
                    {label}
                </label>
            )}
            <select
                {...props}
                id={id}
                ref={ref}
                className={`px-3 py-2 rounded-lg bg-white text-[#245F73] border border-[#BBBDBC] outline-none focus:bg-[#F2F0EF] duration-200 w-full text-sm sm:text-base ${className}`}
            >
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select)