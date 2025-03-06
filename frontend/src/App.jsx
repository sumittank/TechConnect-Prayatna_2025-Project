// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Register from "./pages/auth/Register";
// import Login from "./pages/auth/Login";
// import Navbar from "./components/Navbar";

// function App() {
//   const isAuthenticated = !!localStorage.getItem("authToken");

//   return (
//     <BrowserRouter>
//       <Navbar />
//       <Routes>
//         {/* Redirect logged-in users away from login/register */}
//         <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register />} />
//         <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />

//         {/* Protected route for logged-in users */}
//         <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// function Dashboard() {
//   return <h2 className="text-center mt-10">Welcome to the Fire Department Dashboard 🚒🔥</h2>;
// }

// export default App;






// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { AuthProvider, useAuth } from "./context/AuthContext";
// import Register from "./pages/auth/Register";
// import Login from "./pages/auth/Login";
// import Navbar from "./components/Navbar";
// import HomeUser from "./pages/user/HomeUser";
// import HomeOfficer from "./pages/officer/HomeOfficer";
// import HomeAdmin from "./pages/admin/HomeAdmin";

// const ProtectedRoute = ({ element, roles }) => {
//   const { isAuthenticated, userRole } = useAuth();
  
//   if (!isAuthenticated) {
//     return <Navigate to="/login" />;
//   }

//   if (!roles.includes(userRole)) {
//     return <Navigate to="/" />;
//   }

//   return element;
// };

// function AppRoutes() {
//   const { isAuthenticated, userRole } = useAuth();

//   return (
//     <Routes>
//       {/* Redirect logged-in users away from login/register */}
//       <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register />} />
//       <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />

//       {/* Different dashboards based on roles */}
//       <Route path="/homeuser" element={<ProtectedRoute element={<HomeUser />} roles={["applicant"]} />} />
//       <Route path="/homeofficer" element={<ProtectedRoute element={<HomeOfficer />} roles={["officer"]} />} />
//       <Route path="/homeadmin" element={<ProtectedRoute element={<HomeAdmin />} roles={["admin"]} />} />

//       {/* Redirect to the appropriate home based on role */}
//       <Route path="/" element={
//         isAuthenticated ? (
//           userRole === "applicant" ? <Navigate to="/homeuser" /> :
//           userRole === "officer" ? <Navigate to="/homeofficer" /> :
//           userRole === "admin" ? <Navigate to="/homeadmin" /> :
//           <Navigate to="/login" />
//         ) : <Navigate to="/login" />
//       } />
//     </Routes>
//   );
// }

// function App() {
//   return (
    
//       <BrowserRouter><AuthProvider>
//         <Navbar />
//         <AppRoutes /></AuthProvider>
//       </BrowserRouter>
    
//   );
// }

// export default App;



import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";

// Applicant Pages
import HomeUser from "./pages/user/HomeUser";
import ApplicationStatus from "./pages/user/ApplicationStatus";
import ApplyApplication from "./pages/user/ApplyApplication";
import InspectionDetails from "./pages/user/InspectionDetails";
import NocGenerated from "./pages/user/NocGenerated";

// Officer Pages
import HomeOfficer from "./pages/officer/HomeOfficer";
import AIRiskAnalysis from "./pages/officer/AIRiskAnalysis";
import AllUsers from "./pages/officer/AllUsers";
import AllAplications from "./pages/officer/AllAplications";
import ApplicationDetails from "./pages/officer/ApplicationDetails";
import InspectionApproval from "./pages/officer/InspectionApproval";
import InspectionSchedule from "./pages/officer/InspectionSchedule";
import ApprovedApplications from "./pages/officer/ApprovedApplications";
import PendingRejectApp from "./pages/officer/PendingRejectApp";
import MontlyAnalytics from "./pages/officer/MontlyAnalytics";
import ViolationAlerts from "./pages/officer/ViolationAlerts";

// Admin Pages
import HomeAdmin from "./pages/admin/HomeAdmin";
import AllOfficer from "./pages/admin/AllOfficer";
import BusinessRegister from "./pages/admin/BusinessRegister";

const ProtectedRoute = ({ element, roles }) => {
  const { isAuthenticated, userRole } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!roles.includes(userRole)) {
    return <Navigate to="/" />;
  }

  if (!roles.includes(userRole)) {
    return <Navigate to="/404" />; // Redirect unauthorized users to 404
  }

  return element;
};

function AppRoutes() {
  const { isAuthenticated, userRole } = useAuth();

  return (
    <Routes>
      {/* Redirect logged-in users away from login/register */}
      <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register />} />
      <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />

      {/* Applicant Routes */}
      <Route path="/homeuser" element={<ProtectedRoute element={<HomeUser />} roles={["applicant"]} />} />
      <Route path="/application-status" element={<ProtectedRoute element={<ApplicationStatus />} roles={["applicant"]} />} />
      <Route path="/apply-application" element={<ProtectedRoute element={<ApplyApplication />} roles={["applicant"]} />} />
      <Route path="/inspection-details" element={<ProtectedRoute element={<InspectionDetails />} roles={["applicant"]} />} />
      <Route path="/noc-generated" element={<ProtectedRoute element={<NocGenerated />} roles={["applicant"]} />} />

      {/* Officer Routes */}
      <Route path="/homeofficer" element={<ProtectedRoute element={<HomeOfficer />} roles={["officer"]} />} />
      <Route path="/ai-risk-analysis" element={<ProtectedRoute element={<AIRiskAnalysis />} roles={["officer"]} />} />
      <Route path="/all-users" element={<ProtectedRoute element={<AllUsers />} roles={["officer"]} />} />
      <Route path="/all-applications" element={<ProtectedRoute element={<AllAplications />} roles={["officer"]} />} />
      <Route path="/application/:id" element={<ProtectedRoute element={<ApplicationDetails />} roles={["officer"]} />} />
      <Route path="/inspection/:id" element={<ProtectedRoute element={<InspectionApproval />} roles={["officer"]} />} />
      <Route path="/inspection-schedule" element={<ProtectedRoute element={<InspectionSchedule />} roles={["officer"]} />} />
      <Route path="/approved-applications" element={<ProtectedRoute element={<ApprovedApplications />} roles={["officer"]} />} />
      <Route path="/pending-reject-applications" element={<ProtectedRoute element={<PendingRejectApp />} roles={["officer"]} />} />
      <Route path="/monthly-analytics" element={<ProtectedRoute element={<MontlyAnalytics />} roles={["officer"]} />} />
      <Route path="/violation-alerts" element={<ProtectedRoute element={<ViolationAlerts />} roles={["officer"]} />} />

      {/* Admin Routes */}
      <Route path="/homeadmin" element={<ProtectedRoute element={<HomeAdmin />} roles={["admin"]} />} />
      <Route path="/all-officer" element={<ProtectedRoute element={<AllOfficer />} roles={["admin"]} />} />
      <Route path="/business-register" element={<ProtectedRoute element={<BusinessRegister />} roles={["admin"]} />} />

      {/* Redirect to home based on role */}
      <Route path="/" element={
        isAuthenticated ? (
          userRole === "applicant" ? <Navigate to="/homeuser" /> :
          userRole === "officer" ? <Navigate to="/homeofficer" /> :
          userRole === "admin" ? <Navigate to="/homeadmin" /> :
          <Navigate to="/login" />
        ) : <Navigate to="/login" />
      } />

      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
      <Route path="/404" element={<NotFound />} />

    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <AppRoutes />
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
