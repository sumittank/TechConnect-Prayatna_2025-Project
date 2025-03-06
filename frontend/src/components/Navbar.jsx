// import React from "react";
// import { Link } from "react-router-dom";
// import LogoutButton from "./LogoutButton";

// function Navbar() {
//     const isAuthenticated = localStorage.getItem("authToken"); // Check if logged in

//     return (
//         <nav className="p-4 bg-gray-800 text-white flex justify-between">
//             <h1 className="text-xl font-bold">🔥 Fire Department</h1>

//             <ul className="flex gap-6">
//                 {!isAuthenticated ? (
//                     <>
//                         <li><Link to="/register">Register</Link></li>
//                         <li><Link to="/login">Login</Link></li>
//                     </>
//                 ) : (
//                     <>
//                         <li><LogoutButton /></li>
//                         <li><Link to="/homeuser">Home</Link></li>
//                     </>

//                 )}
//             </ul>
//         </nav>
//     );
// }

// export default Navbar;









// import React from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import LogoutButton from "./LogoutButton";

// function Navbar() {
//   const { isAuthenticated, userRole } = useAuth();

//   return (
//     <nav className="p-4 bg-gray-800 text-white flex justify-between">
//       <h1 className="text-xl font-bold">🔥 Fire Department</h1>

//       <ul className="flex gap-6">
//         {!isAuthenticated ? (
//           <>
//             <li><Link to="/register">Register</Link></li>
//             <li><Link to="/login">Login</Link></li>
//           </>
//         ) : (
//           <>
//             {userRole === "applicant" && <li><Link to="/homeuser">Home</Link></li>}
//             {userRole === "officer" && <li><Link to="/homeofficer">Home</Link></li>}
//             {userRole === "admin" && <li><Link to="/homeadmin">Home</Link></li>}
//             <li><LogoutButton /></li>
//           </>
//         )}
//       </ul>
//     </nav>
//   );
// }

// export default Navbar;









import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LogoutButton from "./LogoutButton";

function Navbar() {
  const { isAuthenticated, userRole } = useAuth();

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <h1 className="text-xl font-bold">🔥 Fire Department</h1>

      <ul className="flex gap-6">
        {!isAuthenticated ? (
          <>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
          </>
        ) : (
          <>
            {/* Applicant Navigation */}
            {userRole === "applicant" && (
              <>
                <li><Link to="/homeuser">Home</Link></li>
                <li><Link to="/application-status">Application Status</Link></li>
                <li><Link to="/apply-application">Apply for Application</Link></li>
                <li><Link to="/inspection-details">Inspection Details</Link></li>
                <li><Link to="/noc-generated">Noc Generated</Link></li>
              </>
            )}

            {/* Officer Navigation */}
            {userRole === "officer" && (
              <>
                <li><Link to="/homeofficer">Home</Link></li>
                <li><Link to="/ai-risk-analysis">AI Risk Analysis</Link></li>
                <li><Link to="/all-users">All Registered</Link></li>
                <li><Link to="/all-applications">All Applications</Link></li>
                <li><Link to="/inspection-schedule">Inspection Schedule</Link></li>
                <li><Link to="/pending-reject-applications">Pending & Rejected Applications</Link></li>
                <li><Link to="/approved-applications">Approved Applications</Link></li>
                <li><Link to="/monthly-analytics">Monthly Analytics</Link></li>
                <li><Link to="/violation-alerts">Violation Alerts</Link></li>
              </>
            )}

            {/* Admin Navigation */}
            {userRole === "admin" && (
              <>
                <li><Link to="/homeadmin">Home</Link></li>
                <li><Link to="/all-officer">All Officers</Link></li>
                <li><Link to="/business-register">Business Register</Link></li>
              </>
            )}

            <li><LogoutButton /></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
