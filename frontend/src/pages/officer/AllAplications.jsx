// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function AllApplications() {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchApplications = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/applications/all");
//         setApplications(response.data);
//       } catch (err) {
//         setError("Error fetching applications. Please try again.");
//         console.error("Error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchApplications();
//   }, []);

//   return (
//     <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-4">All Applications</h2>

//       {loading && <p>Loading applications...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       {applications.length === 0 && !loading ? (
//         <p>No applications found.</p>
//       ) : (
//         <ul className="space-y-4">
//           {applications.map((app) => (
//             <li key={app._id} className="p-4 border rounded-lg">
//               <p>
//                 <strong>Application ID:</strong> {app._id}
//               </p>
//               <p>
//                 <strong>Owner Name:</strong> {app.ownerName}
//               </p>
//               <p>
//                 <strong>Email:</strong> {app.email}
//               </p>
//               <p>
//                 <strong>Status:</strong> {app.status || "Pending"}
//               </p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default AllApplications;










// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// function AllApplications() {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchApplications = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/applications/all");
//         setApplications(response.data);
//       } catch (err) {
//         setError("Error fetching applications. Please try again.");
//         console.error("Error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchApplications();
//   }, []);

//   return (
//     <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-4">All Applications</h2>

//       {loading && <p>Loading applications...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       {applications.length === 0 && !loading ? (
//         <p>No applications found.</p>
//       ) : (
//         <ul className="space-y-4">
//           {applications.map((app) => (
//             <li key={app._id} className="p-4 border rounded-lg">
//               <p><strong>Application ID:</strong> {app._id}</p>
//               <p><strong>Owner Name:</strong> {app.ownerName}</p>
//               <p><strong>Email:</strong> {app.email}</p>
//               <p><strong>Status:</strong> {app.status || "Pending"}</p>
//               <Link to={`/application/${app._id}`}>
//                 <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
//                   View Application
//                 </button>
//               </Link>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default AllApplications;





// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// function AllApplications() {
//   const [applications, setApplications] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchApplications = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/all-applications");
//         setApplications(response.data);
//       } catch (error) {
//         console.error("Error fetching applications", error);
//       }
//     };

//     fetchApplications();
//   }, []);

//   return (
//     <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-4">All Applications</h2>
//       {applications.length === 0 ? (
//         <p>No applications found.</p>
//       ) : (
//         <ul className="space-y-4">
//           {applications.map((app) => (
//             <li key={app._id} className="p-4 border rounded-lg flex justify-between items-center">
//               <div>
//                 <p><strong>Application ID:</strong> {app._id}</p>
//                 <p><strong>Owner Name:</strong> {app.ownerName}</p>
//                 <p><strong>Status:</strong> {app.status || "Pending"}</p>
//               </div>
//               <button
//                 onClick={() => navigate(`/application/${app._id}`)}
//                 className="bg-blue-500 text-white px-4 py-2 rounded"
//               >
//                 View Application
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default AllApplications;



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AllApplications() {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/all-applications");
        setApplications(response.data);
      } catch (error) {
        console.error("Error fetching applications", error);
      }
    };

    fetchApplications();
  }, []);

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata", // Ensure it's displayed in IST
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-600 text-white px-2 py-1 rounded";
      case "Rejected":
        return "bg-red-600 text-white px-2 py-1 rounded";
      case "Pending":
      default:
        return "bg-blue-600 text-white px-2 py-1 rounded";
    }
  };

  const getRiskStatus = (riskScore) => {
    if (riskScore >= 75) {
      return { label: "High Risk", className: "bg-red-600 text-white mt-2 px-2 py-1 rounded" };
    } else if (riskScore >= 50) {
      return { label: "Moderate Risk", className: "bg-orange-500 mt-2 text-white px-2 py-1 rounded" };
    } else if (riskScore >= 25) {
      return { label: "Low Risk", className: "bg-yellow-500 text-black mt-2 px-2 py-1 rounded" };
    } else if (riskScore >=0 ){
      return { label: "Very Low Risk", className: "bg-green-600 text-white mt-2 px-2 py-1 rounded" };
    } else {
        return { label: "N/A", className: "bg-gray-500 text-white mt-2 px-2 py-1 rounded" };
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">All Applications</h2>
      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <ul className="space-y-4">
          {[...applications].reverse().map((app) => (
            <li key={app._id} className="p-4 border rounded-lg flex justify-between items-center">
              <div>
                <p><strong>Application ID:</strong> {app._id}</p>
                <p><strong>Business Name:</strong> {app.businessName}</p>
                <p><strong>Owner Name:</strong> {app.ownerName}</p>
                <p><strong>Status:</strong> {<span className={getStatusClass(app.status)}>{app.status}</span> || "Pending"}</p>

                <p className="mt-3"><strong>AI Risk Score:</strong> {<span className={`font-bold ${getRiskStatus(app.riskScore).className}`}>{app.riskScore} ({getRiskStatus(app.riskScore).label})</span>}</p>
                <p><small><strong>Time & Date: </strong>{formatDateTime(app.submittedAt)}</small> </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/application/${app._id}`)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  View Application
                </button>
                <button
                  onClick={() => navigate(`/inspection/${app._id}`)}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Check Inspection
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AllApplications;
