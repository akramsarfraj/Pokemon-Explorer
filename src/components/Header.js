import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div>
         <div className='sticky top-0 p-4 flex justify-between items-center h-16 bg-[#50d71e] text-white'>
                <Link to={"/"}><h2 className='font-mono uppercase text-[25px]'>Pokemon Cards</h2></Link>
                <Link to="/favorite"><p className=''>Favorites</p></Link>
        </div>
    </div>
  )
}

export default Header