import React, { useState, useContext, useEffect } from 'react';
import {useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import { assets } from '../assets/assets';
import kconvert from 'k-convert'
import moment from 'moment'
import Footer from '../components/Footer';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '@clerk/clerk-react';


const ApplyJob = () => {
  const { id } = useParams();
  const {getToken} = useAuth();
  const navigate = useNavigate();
  const [jobData, setJobData] = useState(null);
  const [isAlreadyApplied, setIsAlreadyApplied] = useState(false);

  const { jobs, backendUrl, userData, userApplications, fetchUserApplications } = useContext(AppContext);

  const fetchJob =async () => {
    try {
      const {data} =await axios.get(`${backendUrl}/api/jobs/${id}`);
      if (data.success) {
        setJobData(data.job);
      }
      
    } catch (error) {
      toast.error(error.message);
    }
  }

  const applyHandler=async()=>{
    try {
      if(!userData){
        toast.error("Please login to apply for the job");
        return;
      }
      if(!userData.resume){
        navigate('/applications');
        return toast.error("Please upload your resume before applying for the job");
      }   
      const token = await getToken();
      const {data} = await axios.post(`${backendUrl}/api/users/apply`,
        { jobId:id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        } 
      );
      if (data.success) {
        toast.success(data.message);
        await fetchUserApplications();
        navigate('/applications');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);

    }
  }

  const checkIfAlreadyApplied = () => {
    const hasApplied = userApplications.some(application => application.jobId._id === jobData._id);
    setIsAlreadyApplied(hasApplied);
  }

  useEffect(()=>{
 
      fetchJob()
   
  },[id, jobs])

  useEffect(() => {
    if(userApplications.length > 0 && jobData) {
      checkIfAlreadyApplied();
    }
  }, [jobData,userApplications, id]);

  return jobData ? (
    <>
      <Navbar/>
      <div className='min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto'>
        <div className='bg-white text-black rounded-lg w-full'>
          <div className='flex justify-center md:justify-between flex-wrap gap-8 px-14 py-20 mb-6 bg-purple-50 border border-purple-400 rounded-xl'>
            <div className='flex flex-col md:flex-row items-center'>
              <img className='h-24 bg-white rounded-lg p-4 mr-4 max-md:mb-4 border' src={jobData.companyId.image}/>
              <div className='text-center md:text-left text-neutral-700'>
                <h1 className='text-2xl sm:text-4xl font-medium'>{jobData.title}</h1>
                <div className='flex flex-wrap flex-row max-md:justify-center gap-y-2 gap-6 items-center text-gray-600 mt-2'>
                  <span className='flex items-center gap-1'>
                    <img src={assets.suitcase_icon}/>
                    {jobData.companyId.name}
                  </span>
                  <span className='flex items-center gap-1'>
                    <img src={assets.location_icon} />
                    {jobData.location}
                  </span>
                  <span className='flex items-center gap-1'>
                    <img src={assets.person_icon}/>
                    {jobData.level}
                  </span>
                   <span className='flex items-center gap-1'>
                    <img src={assets.money_icon}/>
                   CTC: {kconvert.convertTo(jobData.salary)}
                  </span>
                </div>
              </div>
            </div>

            <div className='flex flex-col juscent-center text-end text-sm max-md:mx-auto max-md:text-center'>
              <button onClick={applyHandler} className='bg-purple-600 text-white px-4 sm:px-9 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-all duration-300'>{isAlreadyApplied ? "Already applied" : "Apply now"}</button>
              <p className='text-gray-500 mt-1 '>Posted {moment(jobData.date).fromNow()}</p>
            </div>
          </div>

          <div className='flex flex-col lg:flex-row justify-between items-start'>
            <div className='w-full lg:w-2/3'>
              <h2 className='font-medium text-2xl mb-4'>Job Description</h2>
              <p className='text-gray-500 ' dangerouslySetInnerHTML={{__html: jobData.description}}></p>
              <button onClick={applyHandler} className='bg-purple-600 mt-10 text-white px-4 sm:px-9 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-all duration-300'>{isAlreadyApplied ? "Already applied" : "Apply now"}</button>
            </div>
            {/* right section for more jobs */}
            <div className='w-full lg:w-1/4 mt-10 lg:mt-0 space-y-5 '>
              <h2 className='font-medium text-2xl'>More Jobs from {jobData.companyId.name}</h2>
              <div className='flex flex-col gap-4 mt-4'>
                {jobs.filter(job=>job.companyId._id==jobData.companyId._id && job._id!=jobData._id).slice(0, 3).map(job=>(
                  <div key={job._id} className='border p-3 shadow rounded'>
                    <div className='flex justify-between items-center'>
                      <img className='h-5' src={assets.company_icon} alt=""/>
                    </div>
                    <h4 className='font-medium text-xl mt-1'>{job.title}</h4>
                    <div className='flex items-center gap-3 text-gray-500 mt-1'>
                      <span className='bg-blue-50 border border-blue-200 px-2 py-1.5 rounded'>{job.location}</span>
                      <span className='bg-red-50 border border-red-200 px-2 py-1.5 rounded'>{job.level}</span>
                    </div>
                    <p className='text-gray-600 mt-1 text-sm' dangerouslySetInnerHTML={{__html: job.description.slice(0, 150)}}></p>
                    <div className='flex justify-between items-center mt-1'>
                      <button onClick={()=>{window.location.href=`/apply-job/${job._id}`; scrollTo(0,0)}} className='bg-purple-600 text-white px-4 sm:px-6 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-all duration-300'>Apply now</button>
                      <button onClick={()=>{window.location.href=`/apply-job/${job._id}`; scrollTo(0,0)}} className='text-gray-600 border-gray-400 rounded-2xl cursor-pointer hover:text-gray-800 transition-all duration-300'>Learn more..</button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  ):(
    <Loading/>
  )
};

export default ApplyJob;
