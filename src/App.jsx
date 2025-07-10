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

function App() {
  const { showRecruiterLogin } = useContext(AppContext);

  return (
    <>
      {showRecruiterLogin && <RecuterLogin />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply-job/:id" element={<ApplyJob />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/dashboard" element={<Dashboard />}>
            <Route path='add-job' element={<AddJobs/>}/>
            <Route path='manage-job' element={<Manage/>}/>
            <Route path='view-applications' element={<ViewApplicaions/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
