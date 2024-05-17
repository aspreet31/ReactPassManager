import React from 'react'

export default function Footer() {
  return (
    <div className='bg-purple-200 flex flex-col justify-center  items-center w-full '>
      <div className='logo font-bold text-2xl '>
      <span className='text-purple-500'> &lt; Pas</span>
      <span>s Mana</span>
      <span className='text-purple-500'>ger /&gt;</span>
      </div>
      <div className='flex justify-center items-center' >
        Created with <img src="/icons/heart.png" width={25} alt="heart" /> Aspreet kaur
      </div>
    </div>
  )
}
