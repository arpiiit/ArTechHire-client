import React, { useContext, useEffect, useState } from "react";
import { manageJobsData } from "../assets/assets";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../components/Loading"; // ✅ Ensure this exists

const Manage = () => {
  const navigate = useNavigate();
  const { backendUrl, companyToken } = useContext(AppContext);

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ loading state

  // ✅ Fetch company job data
  const fetchCompanyJobs = async () => {
    setLoading(true); // Start loading
    try {
      const { data } = await axios.get(`${backendUrl}/api/company/list-jobs`, {
        headers: { token: companyToken },
      });

      if (data.success) {
        setJobs(data.jobs.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Error fetching jobs.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // ✅ Toggle job visibility
  const handleVisibilityChange = async (jobId, visible) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/company/change-visibility`,
        { id: jobId, visible },
        { headers: { token: companyToken } }
      );

      if (data.success) {
        toast.success(data.message);
        fetchCompanyJobs(); // Refresh job list
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Error updating visibility.");
    }
  };

  // ✅ Fetch jobs on mount
  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobs();
    }
  }, [companyToken]);

  // ✅ Show loading
  if (loading) return <Loading />;

  // ✅ Show "No jobs found"
  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-2xl">No jobs found</p>
      </div>
    );
  }

  // ✅ Render job table
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
            {jobs.map((job, index) => (
              <tr key={index} className="hover:bg-gray-50 transition">
                <td className="py-3 px-5 font-medium text-center max-sm:hidden">
                  {index + 1}
                </td>
                <td className="py-3 px-5">{job.title}</td>
                <td className="py-3 px-5 max-sm:hidden">
                  {moment(job.date).format("DD MMM YYYY")}
                </td>
                <td className="py-3 px-5 max-sm:hidden">{job.location}</td>
                <td className="py-3 px-5">{job.applicants}</td>
                <td className="py-3 px-5">
                  <input
                    onChange={(e) =>
                      handleVisibilityChange(job._id, e.target.checked)
                    }
                    className="scale-125 ml-4"
                    type="checkbox"
                    checked={job.visible}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={() => {
            navigate("/dashboard/add-job");
            scrollTo(0, 0);
          }}
          className="bg-purple-600 text-white px-4 sm:px-9 py-2 rounded cursor-pointer hover:bg-blue-700 transition-all duration-300"
        >
          Add new job
        </button>
      </div>
    </div>
  );
};

export default Manage;
