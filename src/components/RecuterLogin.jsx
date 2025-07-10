import React from "react";

import { useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RecuterLogin = () => {
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [image, setImage] = useState(false);

  const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false);

  const {setShowRecruiterLogin}=useContext(AppContext);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (state === "Sign Up" && !isTextDataSubmitted) {
      setIsTextDataSubmitted(true);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <form onSubmit={onSubmitHandler} className="relative bg-white p-10 rounded-xl text-slate-500">
        <h1 className="text-2xl text-center text-neutral-700 font-medium">
          Recruter {state}
        </h1>
        <p className="text-sm">Welcome back! Please sign in to continue</p>
        {state === "Sign Up" && isTextDataSubmitted ? (
          <>
          <div className="flex item-center gap-4 my-10">
            <label htmlFor="image" >
              <img className="w-16 roungded-full" src={image ? URL.createObjectURL(image) : assets.upload_area} alt=""/>
              <input onChange={e=>setImage(e.target.files[0])} type="file" id="image" hidden/> 
            </label>
            <p className="text-sm text-center mt-2">
              upload your company logo here. <br />
              <span className="text-blue-600">logo</span>
            </p>
          </div>
          </>
        ) : (
          <>
            {state !== "Login" && (
              <div className="border px-4 py-2 flex items-center gap-2 rounded-lg mt-5">
                <img src={assets.person_icon} alt="" />
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  placeholder="Company Name"
                  required
                  className="outline-none text-sm"
                />
              </div>
            )}

            <div className="border px-4 py-2 flex items-center gap-2 rounded-lg mt-5">
              <img src={assets.email_icon} alt="" />
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="E-mail"
                required
                className="outline-none text-sm"
              />
            </div>
            <div className="border px-4 py-2 flex items-center gap-2 rounded-lg mt-5">
              <img src={assets.lock_icon} alt="" />
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
                required
                className="outline-none text-sm"
              />
            </div>
          </>
        )}
       {state==="Login" &&  <p className="text-sm text-blue-600 mt-4 cursor-pointer">Forgot Password
        </p>}
          
        <button type='submit' className="bg-blue-600 mt-4 cursor-pointer w-full text-white py-2 rounded-lg">
          {state === "Login" ? "Login" : isTextDataSubmitted ? "Create Account" : "Next"}
        </button>
        {state == "Login" ? (
          <p className="text-sm mt-5">
            Don't have an account?{" "}
            <span
              className="cursor-pointer text-blue-600"
              onClick={() => setState("Sign Up")}
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p className="text-sm mt-5">
            Already have an account?{" "}
            <span
              className="cursor-pointer text-blue-600"
              onClick={() => setState("Login")}
            >
              Login
            </span>
          </p>
        )}
      <img onClick={e=>setShowRecruiterLogin(false)} className="absolute top-5 right-5 cursor-pointer" src={assets.cross_icon}/>
      </form>

    </div>
  );
};

export default RecuterLogin;
