import React from "react";
import { assets, viewApplicationsPageData } from "../assets/assets";

const ViewApplications = () => {
  return (
    <div className="container mx-auto py-2 px-4">
   <p className="mb-2">Applicants</p>
      <div className="overflow-x-auto shadow rounded-lg border border-gray-200">
        <table className="min-w-full bg-white text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase tracking-wide text-xs">
            <tr>
              <th className="py-3 px-5">#</th>
              <th className="py-3 px-5">User Name</th>
              <th className="py-3 px-5 max-sm:hidden">Job Title</th>
              <th className="py-3 px-5 max-sm:hidden">Location</th>
              <th className="py-3 px-5">Resume</th>
              <th className="py-3 px-5">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {viewApplicationsPageData.map((applicant, index) => (
              <tr key={index} className="hover:bg-gray-50 transition">
                <td className="py-4 px-5 text-center font-medium text-gray-700">{index + 1}</td>

                <td className="py-4 px-5 flex items-center gap-3">
                  <img
                    className="w-10 h-10 rounded-full object-cover max-sm:hidden"
                    src={applicant.imgSrc}
                    alt={applicant.name}
                  />
                  <span className="text-gray-800 font-medium">{applicant.name}</span>
                </td>

                <td className="py-4 px-5 max-sm:hidden">{applicant.jobTitle}</td>
                <td className="py-4 px-5 max-sm:hidden">{applicant.location}</td>

                <td className="py-4 px-5">
                  <a
                    href="#"
                    target="_blank"
                    className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-3 py-1 rounded hover:bg-blue-200 transition"
                  >
                    Resume
                    <img src={assets.resume_download_icon} alt="Download" className="w-4 h-4" />
                  </a>
                </td>

                <td className="py-4 px-5 relative">
                  <div className="relative inline-block text-left group">
                    <button className="text-gray-600 text-xl font-bold px-2 py-1 rounded hover:bg-gray-100">
                      •••
                    </button>
                    <div className="hidden group-hover:block absolute right-0 top-8 w-32 bg-white border border-gray-200 rounded shadow-md z-10">
                      <button className="block w-full text-left px-4 py-2 text-green-600 hover:bg-gray-100">
                        Accept
                      </button>
                      <button className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100">
                        Reject
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewApplications;
