// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function PendingRejectApp() {
//   const [applications, setApplications] = useState([]);

//   useEffect(() => {
//     const fetchApplications = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/all-applications");
//         const filteredApplications = response.data.filter(
//           (app) => app.status === "Pending" || app.status === "Rejected"
//         );
//         setApplications([...filteredApplications].reverse());
//       } catch (error) {
//         console.error("Error fetching applications", error);
//       }
//     };

//     fetchApplications();
//   }, []);

//   return (
//     <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-4">Pending & Rejected Applications</h2>
//       {applications.length === 0 ? (
//         <p>No pending or rejected applications found.</p>
//       ) : (
//         <ul>
//           {applications.map((app) => (
//             <li key={app._id} className="border p-4 rounded mb-4">
//               <p><strong>Application ID:</strong> {app._id}</p>
//               <p><strong>Owner Name:</strong> {app.ownerName}</p>
//               <p><strong>Status:</strong> {app.status}</p>
//               <p><strong>Inspection Status:</strong> {app.inspectionStatus ? "Completed" : "Pending"}</p>
//               <p><strong>Remark:</strong> {app.remark || "No remark provided"}</p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default PendingRejectApp;





import React, { useEffect, useState } from "react";
import axios from "axios";

function PendingRejectApp() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/all-applications");
        const filteredApplications = response.data.filter(
          (app) => app.status === "Pending" || app.status === "Rejected"
        );
        setApplications([...filteredApplications].reverse());
      } catch (error) {
        console.error("Error fetching applications", error);
      }
    };

    fetchApplications();
  }, []);

  // ✅ Function to get status background color
  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
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
      <h2 className="text-2xl font-bold mb-4">Pending & Rejected Applications</h2>
      {applications.length === 0 ? (
        <p>No pending or rejected applications found.</p>
      ) : (
        <ul>
          {applications.map((app) => (
            <li key={app._id} className="border p-4 rounded mb-4">
              <p><strong>Application ID:</strong> {app._id}</p>
              <p><strong>Business Name:</strong> {app.businessName}</p>
              <p><strong>Owner Name:</strong> {app.ownerName}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span className={getStatusClass(app.status)}>{app.status}</span>
              </p>
              
              <p>
                <strong>Inspection Status:</strong>{" "}
                <span className={app.inspectionStatus ? "bg-green-600 text-white px-2 py-1 rounded" : "bg-blue-600 text-white px-2 py-1 rounded"}>
                  {app.inspectionStatus ? "Completed" : "Pending"}
                </span>
              </p>
              <p className="my-3"><strong>AI Risk Score:</strong> {<span className={`font-bold ${getRiskStatus(app.riskScore).className}`}>{app.riskScore} ({getRiskStatus(app.riskScore).label})</span>}</p>
              <p><strong>Remark:</strong> {app.remark || "No remark provided"}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PendingRejectApp;


