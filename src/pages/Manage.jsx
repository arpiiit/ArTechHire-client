import React from "react";
import { manageJobsData } from "../assets/assets";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Manage = () => {

  const navigate=useNavigate();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Manage Jobs</h2>

      <div className="overflow-x-auto rounded shadow bg-white">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase tracking-wider">
            <tr>
              <th className="py-3 px-5 max-sm:hidden">#</th>
              <th className="py-3 px-5">Job Title</th>
              <th className="py-3 px-5 max-sm:hidden">Date</th>
              <th className="py-3 px-5 max-sm:hidden">Location</th>
              <th className="py-3 px-5">Applicants</th>
              <th className="py-3 px-5">Visibility</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-gray-700">
            {manageJobsData.map((job, index) => (
              <tr key={index} className="hover:bg-gray-50 transition">
                <td className="py-3 px-5 font-medium text-center max-sm:hidden">{index + 1}</td>
                <td className="py-3 px-5">{job.title}</td>
                <td className="py-3 px-5 max-sm:hidden">{moment(job.date).format("DD MMM YYYY")}</td>
                <td className="py-3 px-5 max-sm:hidden">{job.location}</td>
                <td className="py-3 px-5">{job.applicants}</td>
                <td className="py-3 px-5">
                  <input className="scale-125 ml-4" type="checkbox" />
                </td>
              </tr>

            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-end">
        <button onClick={()=>{navigate("/dashboard/add-job"); scrollTo(0,0)}} className="bg-purple-600 text-white px-4 sm:px-9 py-2 rounded cursor-pointer hover:bg-blue-700 transition-all duration-300">Add new job</button>
      </div>
    </div>
  );
};

export default Manage;
