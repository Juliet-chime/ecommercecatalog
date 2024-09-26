import React from 'react'

export const Footer = () => {
  return (
    <div className='mt-10 py-4 border-t-[0.5px] border-[#cccccc]'>
        <div className='flex items-center justify-between'>
            <p>LOGO</p>
            <p className='font-medium text-sm'>Made with ❤ by Chime Juliet</p>
            <p>©{new Date().getFullYear()}</p>
         
        </div>
    </div>
  )
}
