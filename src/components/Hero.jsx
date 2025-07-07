import React, { useContext, useRef } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const Hero = () => {

  const {setSearchFilter, setIsSearched} = useContext(AppContext);
 const titleRef=useRef(null);
  const locationRef=useRef(null);

  const onSearch = () => {
    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value,
    });
    setIsSearched(true);  
   
  }
  return (
    <div className="bg-gray-100 relative overflow-hidden z-0">
      <div className="container px-4 2xl:px-20 mx-auto flex flex-col items-center justify-center gap-4 text-center py-4">
        <h2 className="font-extrabold text-4xl sm:text-5xl text-gray-800 leading-tight">
          Over 10,000+ Jobs Available
        </h2>
        <p className="text-gray-600 text-lg sm:text-xl">
          Find your dream job today. Apply now!
        </p>

        {/* Search Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md w-full max-w-4xl flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-6">
          {/* Job Search Input */}
          <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 flex-1">
            <img src={assets.search_icon} alt="Search" className="w-5 h-5" />
            <input
              type="text"
              placeholder="Search for jobs"
              className="text-sm sm:text-base w-full outline-none"
              ref={titleRef}
            />
          </div>

          {/* Location Input */}
          <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 flex-1">
            <img src={assets.location_icon} alt="Location" className="w-5 h-5" />
            <input
              type="text"
              placeholder="Location"
              className="text-sm sm:text-base w-full outline-none"
              ref={locationRef}
            />
          </div>

          {/* Search Button */}
          <button onClick={onSearch} className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300 w-full sm:w-auto">
            Search
          </button>
        </div>
      </div>

      {/* Logos Section */}
      <div className="border-t border-gray-200 mt-12 pt-8 pb-12 px-4">
        <div className="text-center mb-4">
          <p className="text-gray-600 text-sm sm:text-base font-medium">
            Trusted by 10,000+ Companies
          </p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10">
          <img className="h-6 sm:h-8" src={assets.microsoft_logo} alt="Microsoft" />
          <img className="h-6 sm:h-8" src={assets.walmart_logo} alt="Walmart" />
          <img className="h-6 sm:h-8" src={assets.accenture_logo} alt="Accenture" />
          <img className="h-6 sm:h-8" src={assets.adobe_logo} alt="Adobe" />
          <img className="h-6 sm:h-8" src={assets.samsung_logo} alt="Samsung" />
          <img className="h-6 sm:h-8" src={assets.amazon_logo} alt="Amazon" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
