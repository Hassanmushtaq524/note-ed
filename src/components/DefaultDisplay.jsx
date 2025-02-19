import React from 'react'

const DefaultDisplay = ({ children }) => {
  return (
    <div className="w-full max-h-fit min-h-dvh flex items-center justify-center p-[24px]">
        {children}
    </div>
  )
}

export default DefaultDisplay;