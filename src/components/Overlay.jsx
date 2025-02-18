import React, { useState } from 'react'

const Overlay = ({ buttonElement, openElement, ...rest }) => {
    const [ open, setOpen ] = useState(false);
    
    return (
        <>
        { open && 
            <div 
                onClick={setOpen(false)}
                className="absolute top-0 left-0 z-50 size-full bg-transparent backdrop-blur-lg flex items-center justify-center"
            >
                <openElement/>
            </div>
        }
        <div onClick={setOpen(true)}>
            <buttonElement />
        </div>
        </>
    )
}

export default Overlay