import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets, JobCategories, JobLocations } from "../assets/assets";
import JobCard from "./JobCard";

const JobListing = () => {
  const { isSearched, searchFilter, setSearchFilter, jobs } =
    useContext(AppContext);

  const [showFilters, setShowFilters] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);

  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const handleCatagoryChange = (category) => {
    setSelectedCategory((prev) => {
      if (prev.includes(category)) {
        return prev.filter((cat) => cat !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handleLocationChange = (location) => {
    setSelectedLocation((prev) => {
      if (prev.includes(location)) {
        return prev.filter((loc) => loc !== location);
      } else {
        return [...prev, location];
      }
    });
  };

  const handleRemoveTitle = () => {
    setSearchFilter((prev) => ({ ...prev, title: "" }));
  };

  const handleRemoveLocation = () => {
    setSearchFilter((prev) => ({ ...prev, location: "" }));
  };

  useEffect(() => {
    const matchsCategories = (job) =>
      selectedCategory.length === 0 || selectedCategory.includes(job.category);
    const matchsLocations = (job) =>
      selectedLocation.length === 0 || selectedLocation.includes(job.location);
    const matchsSearchTitle = (job) =>
      searchFilter.title === "" ||
      job.title.toLowerCase().includes(searchFilter.title.toLowerCase());
    const matchsSearchLocation = (job) =>
      searchFilter.location === "" ||
      job.location.toLowerCase().includes(searchFilter.location.toLowerCase());
    const filtered = jobs.filter(
      (job) =>
        matchsCategories(job) &&
        matchsLocations(job) &&
        matchsSearchTitle(job) &&
        matchsSearchLocation(job)
    );
    setFilteredJobs(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchFilter, jobs, selectedCategory, selectedLocation]);

  return (
    <div className="container mx-auto px-4 2xl:px-20 py-10 flex flex-col lg:flex-row gap-10">
      {/* Sidebar */}
      <aside className="bg-white shadow-md rounded-lg p-6 w-full lg:max-w-xs space-y-8">
        {/* Filters - only shown if title or location is selected */}
        {isSearched && (searchFilter.title || searchFilter.location) && (
          <div>
            <h3 className="text-lg font-medium mb-4">Current Search</h3>
            <div className="flex flex-wrap gap-2 text-gray-600">
              {searchFilter.title && (
                <span className="inline-flex items-center bg-blue-50 border border-blue-200 px-4 py-1.5 rounded">
                  {searchFilter.title}
                  <img
                    src={assets.cross_icon}
                    alt="Remove"
                    onClick={handleRemoveTitle}
                    className="h-4 w-4 cursor-pointer ml-2"
                  />
                </span>
              )}
              {searchFilter.location && (
                <span className="inline-flex items-center bg-red-50 border border-red-200 px-4 py-1.5 rounded">
                  {searchFilter.location}
                  <img
                    src={assets.cross_icon}
                    alt="Remove"
                    onClick={handleRemoveLocation}
                    className="h-4 w-4 cursor-pointer ml-2"
                  />
                </span>
              )}
            </div>
          </div>
        )}

        <button
          onClick={(e) => setShowFilters((prev) => !prev)}
          className="px-6 py-1.5 rounded border border-gray-400 lg:hidden mb-4"
        >
          {showFilters ? "Close" : "Filters"}
        </button>

        {/* Job Categories */}
        <div className={showFilters ? "" : "max-lg:hidden"}>
          <h4 className="font-medium text-lg py-4 pt-14">
            Search by Categories
          </h4>
          <ul className="space-y-4 text-gray-500">
            {JobCategories.map((category, index) => (
              <li key={index} className="flex items-center gap-3">
                <input
                  className="scale-125"
                  type="checkbox"
                  onChange={() => handleCatagoryChange(category)}
                  checked={selectedCategory.includes(category) ? "checked" : ""}
                />
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Job Locations */}
        <div className={showFilters ? "" : "max-lg:hidden"}>
          <h4 className="font-medium text-lg py-4 pt-14">Search by Location</h4>
          <ul className="space-y-4 text-gray-500">
            {JobLocations.map((location, index) => (
              <li key={index} className="flex items-center gap-3">
                <input
                  className="scale-125"
                  type="checkbox"
                  onChange={() => handleLocationChange(location)}
                  checked={selectedLocation.includes(location) ? "checked" : ""}
                />

                {location}
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Job Listings */}
      <section className="w-full lg:flex-1 text-gray-800">
        <h3 className="font-medium text-3xl py-2" id="job-list">
          Latest Jobs
        </h3>
        <p className="mb-8">Get your desired jobs from top Companies</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Job cards go here */}
          {filteredJobs
            .slice((currentPage - 1) * 6, currentPage * 6)
            .map((job, index) => (
              <JobCard key={index} job={job} />
            ))}
        </div>

        {/* pagination */}
        {filteredJobs.length > 0 && (
          <div className="flex items-center justify-center space-x-2 mt-10">
            <a href="#job-list">
              <img
                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                src={assets.left_arrow_icon}
              />
            </a>
            {Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map(
              (_, index) => (
                <a key={index} href="#job-list">
                  <button
                    onClick={(e) => setCurrentPage(index + 1)}
                    className={`w-10 h-10 flex items-center justify-center rounded border border-gray-400 ${
                      currentPage === index + 1
                        ? "bg-purple-600 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {index + 1}
                  </button>
                </a>
              )
            )}
            <a href="#job-list">
              <img
                onClick={() =>
                  setCurrentPage(
                    Math.min(currentPage + 1, Math.ceil(filteredJobs.length / 6))
                  )
                }
                src={assets.right_arrow_icon}
              />
            </a>
          </div>
        )}
      </section>
    </div>
  );
};

export default JobListing;
