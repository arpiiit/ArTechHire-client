import { useContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import ApplyJob from "./pages/ApplyJob";
import Applications from "./pages/Applications";
import RecuterLogin from "./components/RecuterLogin";
import { AppContext } from "./context/AppContext";
import Dashboard from "./pages/Dashboard";
import AddJobs from "./pages/AddJobs";
import Manage from "./pages/Manage";
import ViewApplicaions from "./pages/ViewApplicaions";
import "quill/dist/quill.snow.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { showRecruiterLogin, companyToken } = useContext(AppContext);

  return (
    <>
      {showRecruiterLogin && <RecuterLogin />}
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply-job/:id" element={<ApplyJob />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/dashboard" element={<Dashboard />}>
          {companyToken ? (
            <>
              <Route path="add-job" element={<AddJobs/>} />
              <Route path="manage-job" element={<Manage />} />
              <Route path="view-applications" element={<ViewApplicaions />} />
            </>
          ) : null}
        </Route>
      </Routes>
    </>
  );
}

export default App;
