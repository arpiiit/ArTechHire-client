import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='container px-4 2xl:px-20 mx-auto my-20 flex items-center justify-between gap-4 py-3 mt-20'>
                <h2 className='logo font-semibold text-xl cursor-pointer'>Ar<span className='text-purple-600'>TechHire</span></h2>
                <p className='flex-1 border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden'>Copyright @ArTechHire | All right reserved</p>
                <div className='flex items-center gap-2.5'>
                  <Link to="https://www.facebook.com/profile.php?id=100050830013888"><img width={38} src={assets.facebook_icon} alt="" /></Link>  
                  <Link to='https://www.instagram.com/_arpiit.mishra_/'><img width={38} src={assets.instagram_icon} alt="" /></Link>  
                  <Link to='https://www.linkedin.com/in/arpit-mishra-7a4588202/'><img width={38} src='/src/assets/linkedin.png' alt="" /></Link>    
                </div>
    </div>
  )
}

export default Footer
