import React from 'react'

const Button = ({ text, containerClass, onClick, type, ...rest }) => {
  return (
    <button type={type} onClick={onClick} 
            className={`p-2 bg-primary text-white font-black w-fit cursor-pointer 
                      hover:text-primary hover:bg-white hover:border-[0.5px] hover:border-primary duration-500 ${containerClass}`}>
        {text}
    </button>
  )
}

export default Button