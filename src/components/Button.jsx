import React from 'react'

const Button = ({ text, containerClass, onClick, type, ...rest }) => {
  return (
    <button type={type} onClick={onClick} className={`p-2 bg-primary rounded-xl text-white font-black w-fit cursor-pointer ${containerClass}`}>
        {text}
    </button>
  )
}

export default Button