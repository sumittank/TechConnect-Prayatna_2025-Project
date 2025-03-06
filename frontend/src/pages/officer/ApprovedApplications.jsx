// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function ApprovedApplications() {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [nocUrls, setNocUrls] = useState({});

//   useEffect(() => {
//     const fetchApprovedApplications = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/approved-applications");
//         setApplications(response.data);
//       } catch (err) {
//         setError("Error fetching approved applications");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchApprovedApplications();
//   }, []);

//   // Function to Generate NOC Certificate
//   const generateNOC = async (appId) => {
//     try {
//       const response = await axios.post(`http://localhost:5000/api/noc/generate-noc/${appId}`);
//       setNocUrls((prev) => ({ ...prev, [appId]: response.data.nocUrl }));
//       alert("NOC Generated Successfully!");
//     } catch (error) {
//       alert("Error generating NOC.");
//     }
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-3xl font-bold mb-6 text-center">Approved Applications</h2>

//       {loading && <p className="text-center">Loading...</p>}
//       {error && <p className="text-red-500 text-center">{error}</p>}

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {applications.length > 0 ? (
//           applications.map((app) => (
//             <div key={app._id} className="p-5 border rounded-lg shadow-md bg-white">
//               <p><strong>Application Id:</strong> {app._id}</p>
//               <p><strong>Owner Name:</strong> {app.ownerName}</p>
//               <p><strong>Email:</strong> {app.email}</p>
//               <p><strong>Contact:</strong> {app.contact}</p>
//               <p><strong>Address:</strong> {app.address}</p>
//               <p className="text-green-600 font-semibold">Approved ✅</p>

//               {/* Generate NOC Button */}
//               <button
//                 className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 transition"
//                 onClick={() => generateNOC(app._id)}
//               >
//                 Generate NOC
//               </button>

//               {/* Show Download Link if NOC is generated */}
//               {nocUrls[app._id] && (
//                 <p className="mt-2">
//                   <a href={nocUrls[app._id]} target="_blank" className="text-blue-500 underline">
//                     Download NOC
//                   </a>
//                 </p>
//               )}
//             </div>
//           ))
//         ) : (
//           <p className="text-center col-span-3">No approved applications found.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ApprovedApplications;








// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function ApprovedApplications() {
//   const [applications, setApplications] = useState([]);
//   const [nocStatus, setNocStatus] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchApprovedApplications = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/approved-applications");
//         setApplications(response.data);

//         // ✅ Fetch NOC status for each application
//         const nocData = {};
//         for (let app of response.data) {
//           const nocResponse = await axios.get(`http://localhost:5000/api/noc/status/${app._id}`);
//           if (nocResponse.data.nocUrl) {
//             nocData[app._id] = nocResponse.data.nocUrl;
//           }
//         }
//         setNocStatus(nocData);
//       } catch (err) {
//         setError("Error fetching approved applications");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchApprovedApplications();
//   }, []);

//   // ✅ Generate NOC Function
//   const generateNOC = async (appId) => {
//     try {
//       const response = await axios.post(`http://localhost:5000/api/noc/generate-noc/${appId}`);
//       if (response.data.nocUrl) {
//         setNocStatus((prevStatus) => ({
//           ...prevStatus,
//           [appId]: response.data.nocUrl,
//         }));
//       }
//     } catch (error) {
//       console.error("Error generating NOC:", error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-3xl font-bold mb-6 text-center">Approved Applications</h2>

//       {loading && <p className="text-center">Loading...</p>}
//       {error && <p className="text-red-500 text-center">{error}</p>}

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {applications.length > 0 ? (
//           applications.map((app) => (
//             <div key={app._id} className="p-5 border rounded-lg shadow-md bg-white">
//               <p><strong>Application Id:</strong> {app._id}</p>
//               <p><strong>Owner Name:</strong> {app.ownerName}</p>
//               <p><strong>Email:</strong> {app.email}</p>
//               <p><strong>Contact:</strong> {app.contact}</p>
//               <p><strong>Address:</strong> {app.address}</p>
//               <p className="text-green-600 font-semibold">Approved ✅</p>

//               {nocStatus[app._id] ? (
//                 <div className="mt-3">
//                   <p className="text-blue-600 font-semibold">NOC Generated ✅</p>
//                   <a href={nocStatus[app._id]} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
//                     View NOC Certificate
//                   </a>
//                 </div>
//               ) : (
//                 <button
//                   onClick={() => generateNOC(app._id)}
//                   className="bg-blue-500 text-white px-4 py-2 rounded mt-3 hover:bg-blue-700"
//                 >
//                   Generate NOC
//                 </button>
//               )}
//             </div>
//           ))
//         ) : (
//           <p className="text-center col-span-3">No approved applications found.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ApprovedApplications;






// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function ApprovedApplications() {
//   const [applications, setApplications] = useState([]);
//   const [nocStatus, setNocStatus] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [issuedDate, setIssuedDate] = useState("");

//   useEffect(() => {
//     const fetchApprovedApplications = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/approved-applications");
//         setApplications(response.data);

//         // ✅ Fetch NOC status for each application
//         const nocData = {};
//         for (let app of response.data) {
//           const nocResponse = await axios.get(`http://localhost:5000/api/noc/status/${app._id}`);
//           setIssuedDate(nocResponse.data.issuedOn)
//           if (nocResponse.data.nocUrl) {
//             nocData[app._id] = {
//               nocUrl: nocResponse.data.nocUrl,
//               issuedOn: nocResponse.data.issuedOn, // Store issued date
//             };
//           }
//         }
//         setNocStatus(nocData);
//       } catch (err) {
//         setError("Error fetching approved applications");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchApprovedApplications();
//   }, []);
//   console.log(issuedDate)

//   // ✅ Function to format date & time
//   const formatDateTime = (isoString) => {
//     if (!isoString) return "N/A"; // Handle missing dates
//     const date = new Date(isoString);
//     return date.toLocaleString("en-IN", {
//       timeZone: "Asia/Kolkata",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       second: "2-digit",
//       hour12: true,
//     });
//   };

//   // ✅ Generate NOC Function
//   const generateNOC = async (appId) => {
//     try {
//       const response = await axios.post(`http://localhost:5000/api/noc/generate-noc/${appId}`);
//       if (response.data.nocUrl) {
//         setNocStatus((prevStatus) => ({
//           ...prevStatus,
//           [appId]: {
//             nocUrl: response.data.nocUrl,
//             issuedOn: response.data.issuedOn, // Update issued date after generation
//           },
//         }));
//       }
//     } catch (error) {
//       console.error("Error generating NOC:", error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-3xl font-bold mb-6 text-center">Approved Applications</h2>

//       {loading && <p className="text-center">Loading...</p>}
//       {error && <p className="text-red-500 text-center">{error}</p>}

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {applications.length > 0 ? (
//           [...applications].reverse().map((app) => (
//             <div key={app._id} className="p-5 border rounded-lg shadow-md bg-white">
//               <p><strong>Application Id:</strong> {app._id}</p>
//               <p><strong>Owner Name:</strong> {app.ownerName}</p>
//               <p><strong>Email:</strong> {app.email}</p>
//               <p><strong>Contact:</strong> {app.contact}</p>
//               <p><strong>Address:</strong> {app.address}</p>
//               <p><strong>Submitted On:</strong> {formatDateTime(app.submittedAt)}</p> {/* ✅ Submitted Date */}
//               <p className="text-green-600 font-semibold">Approved ✅</p>
//               {nocStatus[app._id] ? (
//                 <div className="mt-3">
//                   <p className="text-blue-600 font-semibold">NOC Generated ✅</p>
//                   <p><strong>Issued On:</strong> {formatDateTime(nocStatus[app._id].issuedOn)}</p> {/* ✅ Issued Date */}
//                   <a href={nocStatus[app._id].nocUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
//                     View NOC Certificate
//                   </a>
//                 </div>
//               ) : (
//                 <button
//                   onClick={() => generateNOC(app._id)}
//                   className="bg-blue-500 text-white px-4 py-2 rounded mt-3 hover:bg-blue-700"
//                 >
//                   Generate NOC
//                 </button>
//               )}
//             </div>
//           ))
//         ) : (
//           <p className="text-center col-span-3">No approved applications found.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ApprovedApplications;




import React, { useEffect, useState } from "react";
import axios from "axios";

function ApprovedApplications() {
  const [applications, setApplications] = useState([]);
  const [nocStatus, setNocStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApprovedApplications = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/approved-applications");
        setApplications(response.data);

        // ✅ Fetch NOC status for each application
        const nocData = {};
        await Promise.all(
          response.data.map(async (app) => {
            try {
              const nocResponse = await axios.get(`http://localhost:5000/api/noc/status/${app._id}`);
              if (nocResponse.data.nocUrl) {
                nocData[app._id] = {
                  nocUrl: nocResponse.data.nocUrl,
                  issuedOn: nocResponse.data.issuedOn || null, // Handle missing date
                };
              }
            } catch (error) {
              console.error(`Error fetching NOC for ${app._id}:`, error);
            }
          })
        );
        setNocStatus(nocData);
      } catch (err) {
        setError("Error fetching approved applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedApplications();
  }, []);

  // ✅ Function to format date & time
  const formatDateTime = (isoString) => {
    if (!isoString) return "N/A"; // Handle missing dates
    const date = new Date(isoString);
    return date.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  // ✅ Generate NOC Function
  const generateNOC = async (appId) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/noc/generate-noc/${appId}`);
      if (response.data.nocUrl) {
        setNocStatus((prevStatus) => ({
          ...prevStatus,
          [appId]: {
            nocUrl: response.data.nocUrl,
            issuedOn: response.data.issuedOn || new Date().toISOString(), // Set issued date
          },
        }));
      }
    } catch (error) {
      console.error("Error generating NOC:", error);
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
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Approved Applications</h2>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {applications.length > 0 ? (
          [...applications].reverse().map((app) => (
            <div key={app._id} className="p-5 border rounded-lg shadow-md bg-white">
              <p><strong>Application Id:</strong> {app._id}</p>
              <p><strong>Business Name:</strong><span className="bg-blue-500 text-white px-2 py-1 rounded">{app.businessName}</span> </p>
              <p><strong>Owner Name:</strong> {app.ownerName}</p>
              <p><strong>Email:</strong> {app.email}</p>
              <p><strong>Contact:</strong> {app.contact}</p>
              <p><strong>Address:</strong> {app.address}</p>
              <p className="my-3"><strong>AI Risk Score:</strong> {<span className={`font-bold ${getRiskStatus(app.riskScore).className}`}>{app.riskScore} ({getRiskStatus(app.riskScore).label})</span>}</p>
              <p><strong>Submitted On:</strong> {formatDateTime(app.submittedAt)}</p>
              <p className="text-green-600 font-semibold">Approved ✅</p>
              {nocStatus[app._id]?.nocUrl ? (
                <div className="mt-3">
                  <p className="text-blue-600 font-semibold">NOC Generated ✅</p>
                  {nocStatus[app._id]?.issuedOn && (
                    <p><strong>Issued On:</strong> {formatDateTime(nocStatus[app._id].issuedOn)}</p>
                  )}
                  <a href={nocStatus[app._id].nocUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                    View NOC Certificate
                  </a>
                </div>
              ) : (
                <button
                  onClick={() => generateNOC(app._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded mt-3 hover:bg-blue-700"
                >
                  Generate NOC
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-center col-span-3">No approved applications found.</p>
        )}
      </div>
    </div>
  );
}

export default ApprovedApplications;

