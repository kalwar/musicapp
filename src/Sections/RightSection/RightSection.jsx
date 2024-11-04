import React, { Children } from 'react'

const RightSection = ({ children, className }) => {
    return (
        <div className={`w-[76%] h-screen d-flex rounded-sm items-center justify-center overflow-x-hidden gap-5 ${className}`}>
            {children}
        </div>
    )
}

export default RightSection



