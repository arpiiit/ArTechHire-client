import React, { useContext, useEffect, useState } from "react";
import { assets, viewApplicationsPageData } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

const ViewApplications = () => {
  const { backendUrl, companyToken } = useContext(AppContext);
  const [applicants, setApplicants] = useState(false);

  //function to fetch applicants data

  const fetchApplicants = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/company/applicants", {
        headers: { token: companyToken },
      });
      if (data.success) {
        setApplicants(data.applications.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //function to fetch applicants data on component mount
  const changeJobAppliationStatus = async (id, status) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/company/change-status`,
        { id, status },
        {
          headers: { token: companyToken },
        }
      );
      if (data.success) {
        toast.success(data.message);
        fetchApplicants();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to change application status: " + error.message);
    }
  };

  useEffect(() => {
    if (companyToken) {
      fetchApplicants();
    }
  }, [companyToken]);
  return applicants ? (
    applicants.length === 0 ? (
      <div className="flex items-center justify-center h-screen">
        <p className="text-2xl">No Applicants</p>
      </div>
    ) : (
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
              {applicants
                .filter((item) => item.jobId && item.userId)
                .map((applicant, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition">
                    <td className="py-4 px-5 text-center font-medium text-gray-700">
                      {index + 1}
                    </td>

                    <td className="py-4 px-5 flex items-center gap-3">
                      <img
                        className="w-10 h-10 rounded-full object-cover max-sm:hidden"
                        src={applicant.userId.image}
                        alt={applicant.userId.name}
                      />
                      <span className="text-gray-800 font-medium">
                        {applicant.userId.name}
                      </span>
                    </td>

                    <td className="py-4 px-5 max-sm:hidden">
                      {applicant.jobId.title}
                    </td>
                    <td className="py-4 px-5 max-sm:hidden">
                      {applicant.jobId.location}
                    </td>

                    <td className="py-4 px-5">
                      <a
                        href={applicant.userId.resume}
                        target="_blank"
                        className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-3 py-1 rounded hover:bg-blue-200 transition"
                      >
                        Resume
                        <img
                          src={assets.resume_download_icon}
                          alt="Download"
                          className="w-4 h-4"
                        />
                      </a>
                    </td>

                    <td className="py-4 px-5 relative">
                      {applicant.status === "Pending" ? (
                        <div className="relative inline-block text-left group">
                          <button className="text-gray-600 text-xl font-bold px-2 py-1 rounded hover:bg-gray-100">
                            •••
                          </button>
                          <div className="hidden group-hover:block absolute right-0 top-8 w-32 bg-white border border-gray-200 rounded shadow-md z-10">
                            <button
                              onClick={() =>
                                changeJobAppliationStatus(
                                  applicant._id,
                                  "Accepted"
                                )
                              }
                              className="block w-full text-left px-4 py-2 text-green-600 hover:bg-gray-100"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() =>
                                changeJobAppliationStatus(
                                  applicant._id,
                                  "Rejected"
                                )
                              }
                              className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>{applicant.status}</div>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  ) : (
    <Loading />
  );
};

export default ViewApplications;
