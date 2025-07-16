import React, { useContext, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { companyData, setCompanyData, setCompanyToken } = useContext(AppContext);

  const logoutHandler = () => {
    setCompanyData(null); 
    localStorage.removeItem("companyToken");
    setCompanyToken(null);
    navigate("/");
  };

  useEffect(() => {
    if (!companyData) {
      navigate("/dashboard/manage-job");
    }
  }, [companyData, navigate]);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 2xl:px-20 flex items-center justify-between">
          <h1
            onClick={() => navigate("/")}
            className="text-2xl font-bold cursor-pointer select-none"
          >
            Ar<span className="text-purple-600">TechHire</span>
          </h1>
          {companyData && (
            <div className="flex items-center gap-4 text-sm">
              <span className="hidden sm:inline text-gray-700">
                Welcome, {companyData.name || "Company"}
              </span>

              {/* Avatar Dropdown */}
              <div className="relative group">
                <img
                  src={companyData.image || assets.company_icon}
                  alt="Company Icon"
                  className="w-9 h-9 rounded-full cursor-pointer border border-gray-300"
                />
                <div className="absolute top-full right-0 mt-3 w-36 bg-white border border-gray-200 rounded-md shadow-xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transform transition-all duration-200 ease-out z-30">
                  <ul className="text-sm text-gray-800">
                    <li onClick={() => navigate("/")} className="px-4 py-2 hover:bg-purple-600 hover:text-white cursor-pointer transition-colors duration-150 rounded-t-md">
                      Profile
                    </li>
                    <li onClick={logoutHandler} className="px-4 py-2 hover:bg-purple-600 hover:text-white cursor-pointer transition-colors duration-150 rounded-b-md">
                      Log out
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-46 bg-white border-r min-h-screen pt-6">
          <ul className="flex flex-col space-y-1 text-gray-800 text-sm">
            <NavLink
              to="/dashboard/add-job"
              className={({ isActive }) =>
                `flex items-center px-6 py-3 gap-2 hover:bg-gray-100 transition ${
                  isActive
                    ? "bg-blue-50 border-r-4 border-blue-500 font-medium text-blue-600"
                    : ""
                }`
              }
            >
              <img className="w-4 h-4" src={assets.add_icon} alt="" />
              <span className="max-sm:hidden">Add Job</span>
            </NavLink>

            <NavLink
              to="/dashboard/manage-job"
              className={({ isActive }) =>
                `flex items-center px-6 py-3 gap-2 hover:bg-gray-100 transition ${
                  isActive
                    ? "bg-blue-50 border-r-4 border-blue-500 font-medium text-blue-600"
                    : ""
                }`
              }
            >
              <img className="w-4 h-4" src={assets.home_icon} alt="" />
              <span className="max-sm:hidden">Manage Job</span>
            </NavLink>

            <NavLink
              to="/dashboard/view-applications"
              className={({ isActive }) =>
                `flex items-center px-6 py-3 gap-2 hover:bg-gray-100 transition ${
                  isActive
                    ? "bg-blue-50 border-r-4 border-blue-500 font-medium text-blue-600"
                    : ""
                }`
              }
            >
              <img className="w-4 h-4" src={assets.person_tick_icon} alt="" />
              <span className="max-sm:hidden">View Applications</span>
            </NavLink>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
