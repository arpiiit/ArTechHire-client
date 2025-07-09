import React from "react";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { assets, jobsApplied } from "../assets/assets";
import moment from "moment";
import Footer from "../components/Footer";

const Applications = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [resume, setResume] = useState(null);
  return (
    <>
      <Navbar />
      <div className="container px-4 min-h-[65vh] 2xl:px-20 mx-auto py-10">
        <h2 className="text-xl font-semibold">Your Resume</h2>
        <div className="flex gap-2 mb-6 mt-3">
          {isEditing ? (
            <>
              <label className="flex items-center" htmlFor="resumeUpload">
                <p className="bg-purple-100 text-purple-600 cursor-pointer px-4 py-2 mr-2 rounded-md">
                  Select Resume
                </p>
                <input
                  id="resumeUpload"
                  onChange={(e) => setResume(e.target.files[0])}
                  accept="application/pdf"
                  type="file"
                  hidden
                />
                <img src={assets.profile_upload_icon} />
              </label>
              <button
                onClick={(e) => setIsEditing(false)}
                className="bg-green-100 cursor-pointer border border-green-400 px-4 py-2 rounded-md"
              >
                Save
              </button>
            </>
          ) : (
            <div className="flex gap-2">
              <a
                className="bg-purple-100 text-purple-600 cursor-pointer px-4 py-2 rounded-md"
                href=""
              >
                Resume
              </a>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-gray-100 cursor-pointer border border-gray-500 px-4 py-2 rounded-md"
              >
                Edit
              </button>
            </div>
          )}
        </div>
        <h2 className="text-xl font-semibold mb-4">Jobs Applied</h2>
        <table className="min-w-full bg-white text-black border border-gray-200 rounded-2xl">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b  bg-white text-black border border-gray-200 text-left">
                Company
              </th>
              <th className="py-3 px-4 border-b  bg-white text-black border border-gray-200 text-left">
                Job Title
              </th>
              <th className="py-3 px-4 border-b  bg-white text-black border border-gray-200 text-left max-sm:hidden">
                Location
              </th>
              <th className="py-3 px-4 border-b  bg-white text-black border border-gray-200 text-left max-sm:hidden">
                Date
              </th>
              <th className="py-3 px-4 border-b  bg-white text-black border border-gray-200 text-left">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {jobsApplied.map((job, index) =>
              true ? (
                <tr>
                  <td className="py-3 px-4 border-b bg-white text-black border border-gray-200 flex items-center gap-2">
                    <img className="h-8 w-8" src={job.logo} />
                    {job.company}
                  </td>
                  <td className="py-3 px-4 border-b bg-white text-black border border-gray-200">
                    {job.title}
                  </td>
                  <td className="py-3 px-4 border-b bg-white text-black border border-gray-200 max-sm:hidden">
                    {job.location}
                  </td>
                  <td className="py-3 px-4 border-b bg-white text-black border border-gray-200 max-sm:hidden">
                    {moment(job.date).format("DD-MM-YYYY")}
                  </td>
                  <td className="py-3 px-4 border-b bg-white text-black border border-gray-200">
                    <span
                      className={`${
                        job.status === "Accepted"
                          ? "bg-green-100"
                          : job.status === "Rejected"
                          ? "bg-red-100"
                          : "bg-blue-100"
                      } px-4 py-1.5 rounded`}
                    >
                      {job.status}
                    </span>
                  </td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
      </div>
      <Footer/>
    </>
  );
};

export default Applications;
