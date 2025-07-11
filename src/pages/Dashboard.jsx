import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Dashboard = () => {
  const navigate = useNavigate();

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

          <div className="flex items-center gap-4 text-sm">
            <span className="hidden sm:inline text-gray-700">
              Welcome, Arpit Mishra
            </span>

            {/* Avatar Dropdown */}
            <div className="relative group">
              <img
                src={assets.company_icon}
                alt="Company Icon"
                className="w-9 h-9 rounded-full cursor-pointer border border-gray-300"
              />
              <div className="absolute top-full right-0 mt-2 w-32 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible transition duration-150 ease-in-out z-30">
                <ul className="text-sm text-gray-700">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Log out
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-56 bg-white border-r min-h-screen pt-6">
          <ul className="flex flex-col space-y-1 text-gray-800 text-sm">
            <NavLink
              to="/dashboard/add-job"
              className={({ isActive }) =>
                `flex items-center px-6 py-3 gap-2 hover:bg-gray-100 transition ${
                  isActive ? "bg-blue-50 border-r-4 border-blue-500 font-medium text-blue-600" : ""
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
                  isActive ? "bg-blue-50 border-r-4 border-blue-500 font-medium text-blue-600" : ""
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
                  isActive ? "bg-blue-50 border-r-4 border-blue-500 font-medium text-blue-600" : ""
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
