import React from 'react'
import {assets} from '../assets/assets'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { Link } from 'react-router-dom';

const Navbar = () => {
    const {openSignIn} = useClerk();
    const {user} = useUser();
  return (
    <div className='shadow py-4 '>
      <div className='container px-4 2xl:px-20 mx-auto justify-between flex items-center'>
        <h2 className='logo font-bold text-2xl cursor-pointer'>Ar<span className='text-purple-600'>TechHire</span></h2>
        {
            user ? (
                <div className='flex items-center gap-4 max-sm:text-xs'>
                    <Link to={'/applications'}>Appied Jobs</Link>
                    <p>|</p>
                    <p className='max-sm:hidden'>Hi, {user.firstName+" "+user.lastName}</p>
                    <UserButton/>
                </div>
            ) : (
                <div className='flex gap-4 max-sm:text-xs'>
            <button className='text-gray-600 cursor-pointer hover:text-gray-800 transition-all duration-300'>
                Recruter Login
            </button>
            <button onClick={e=>openSignIn()} className='bg-purple-600 text-white px-6 sm:px-9 py-2 rounded-xl cursor-pointer hover:bg-blue-700 transition-all duration-300'>
                Candidate Login
            </button>
        </div>
            )
        }
        
      </div>
    </div>
  )
}

export default Navbar
