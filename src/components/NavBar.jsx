import React from 'react'

export default function NavBar() {
  return (
  <nav className=' h-12 bg-purple-200 flex  justify-between items-center px-4'>
    <div className='logo font-bold text-2xl'>
      <span className='text-purple-500'> &lt; Pas</span>
      <span>s Mana</span>
      <span className='text-purple-500'>ger /&gt;</span>
      </div>
    {/* <ul>
        <li className='flex gap-4'>
            <a className='hover:font-bold' href='/'>Home</a>
            <a className='hover:font-bold' href='#'>About us</a>
            <a className='hover:font-bold' href='#'>Contact us </a>
        </li>
    </ul> */}
    <button className='bg-purple-600 my-5 rounded-full flex gap-4 justify-between items-center ring-white ring-1'>
      <img className="w-10  py-1 px-2" src="/icons/github.png" alt="github" />
      <span className='font-bold text-white px-4'>Github</span>
    </button>
  </nav>
  )
}
