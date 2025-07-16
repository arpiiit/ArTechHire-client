import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom';

const JobCard = ({job}) => {
  const navigate=useNavigate();
  return (
    <div className='border p-6 shadow rounded'>
      <div className='flex justify-between items-center'>
        <img className='h-8' src={job.companyId.image} alt=""/>
      </div>
      <h4 className='font-medium text-xl mt-2'>{job.title}</h4>
      <div className='flex items-center gap-4 text-gray-500 mt-2'>
        <span className='bg-blue-50 border border-blue-200 px-4 py-1.5 rounded'>{job.location}</span>
        <span className='bg-red-50 border border-red-200 px-4 py-1.5 rounded'>{job.level}</span>
      </div>
      <p className='text-gray-600 mt-2 text-sm' dangerouslySetInnerHTML={{__html: job.description.slice(0, 150)}}></p>
      <div className='flex justify-between items-center mt-4'>
        <button onClick={()=>{navigate(`/apply-job/${job._id}`); scrollTo(0,0)}} className='bg-purple-600 text-white px-4 sm:px-9 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-all duration-300'>Apply now</button>
        <button onClick={()=>{navigate(`/apply-job/${job._id}`); scrollTo(0,0)}} className='text-gray-600 border-gray-400 rounded-2xl cursor-pointer hover:text-gray-800 transition-all duration-300'>Learn more..</button>
      </div>
    </div>
  )
}

export default JobCard
