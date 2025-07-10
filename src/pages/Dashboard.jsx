import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar for recruiter panel */}
      <header className="bg-white shadow-md py-4">
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

            <div className="relative group">
              <img
                src={assets.company_icon}
                alt="Company Icon"
                className="w-9 h-9 rounded-full cursor-pointer border border-gray-300"
              />

              {/* Dropdown Menu */}
              <div className="absolute top-full right-0 mt-2 w-32 bg-white border rounded shadow-lg hidden group-hover:block z-20">
                <ul className="text-sm text-gray-700">
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Log out
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 2xl:px-20 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
