import React from 'react'

const ContentWrapper = ({ children, className }) => {
    return (
        <div className={className}>
            {children}
        </div>
    )
}

export default ContentWrapper