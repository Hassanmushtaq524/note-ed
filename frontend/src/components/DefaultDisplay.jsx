import React from 'react'

const DefaultDisplay = ({ children, ...rest }) => {
  const { containerClass } = rest;
  return (
    <div className={`w-full max-h-fit min-h-dvh flex items-center justify-center p-[24px] ${containerClass}`}>
        {children}
    </div>
  )
}

export default DefaultDisplay;