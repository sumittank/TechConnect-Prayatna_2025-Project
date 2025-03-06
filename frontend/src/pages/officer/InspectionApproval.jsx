// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// function InspectionApproval() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [inspectionNeeded, setInspectionNeeded] = useState(false);
//   const [reason, setReason] = useState("");
//   const [inspector, setInspector] = useState("");
//   const [dateTime, setDateTime] = useState("");

//   useEffect(() => {
//     const fetchInspectionData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/inspection/${id}`);
//         if (response.data) {
//             setInspectionNeeded(response.data.requiresInspection);
//           setReason(response.data.reason || "");
//           setInspector(response.data.inspector || "");
//           setDateTime(response.data.dateTime || "");
//         }
//       } catch (error) {
//         console.error("Error fetching inspection details", error);
//       }
//     };

//     fetchInspectionData();
//   }, [id]);

//   const handleSubmit = async () => {
//     try {
//         await axios.post(`http://localhost:5000/api/inspection/${id}`, {
//             requiresInspection: inspectionNeeded,  // Fix field name
//             reason,
//             inspector,
//             date: dateTime.split("T")[0],  // Extract date
//             time: dateTime.split("T")[1]   // Extract time
//         });
//       alert("Inspection details saved successfully!");
//       navigate("/all-applications");
//     } catch (error) {
//       console.error("Error updating inspection details", error);
//     }
//   };

//   return (
//     <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-4">Inspection Approval</h2>
//       <label className="block mb-2">
//         <input 
//           type="checkbox" 
//           checked={inspectionNeeded} 
//           onChange={() => setInspectionNeeded(!inspectionNeeded)}
//         />{" "}
//         Inspection Needed
//       </label>

//       {inspectionNeeded && (
//         <>
//           <label className="block mt-4">
//             Reason for Inspection:
//             <textarea 
//               className="border p-2 w-full rounded" 
//               value={reason} 
//               onChange={(e) => setReason(e.target.value)}
//               required
//             />
//           </label>

//           <label className="block mt-4">
//             Assign Inspector:
//             <input 
//               type="text" 
//               className="border p-2 w-full rounded" 
//               value={inspector} 
//               onChange={(e) => setInspector(e.target.value)}
//               required
//             />
//           </label>

//           <label className="block mt-4">
//             Date & Time:
//             <input 
//               type="datetime-local" 
//               className="border p-2 w-full rounded" 
//               value={dateTime} 
//               onChange={(e) => setDateTime(e.target.value)}
//               required
//             />
//           </label>
//         </>
//       )}

//       <button 
//         onClick={handleSubmit} 
//         className="bg-green-500 text-white px-4 py-2 rounded mt-4 w-full"
//       >
//         Save Inspection Details
//       </button>
//     </div>
//   );
// }

// export default InspectionApproval;




// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// function InspectionApproval() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [inspectionNeeded, setInspectionNeeded] = useState(false);
//   const [reason, setReason] = useState("");
//   const [inspector, setInspector] = useState("");
//   const [dateTime, setDateTime] = useState("");

//   useEffect(() => {
//     const fetchInspectionData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/inspection/${id}`);
//         if (response.data) {
//           setInspectionNeeded(response.data.requiresInspection);
//           setReason(response.data.reason || "");
//           setInspector(response.data.inspector || "");
//           setDateTime(response.data.dateTime || "");
//         }
//       } catch (error) {
//         console.error("Error fetching inspection details", error);
//       }
//     };

//     fetchInspectionData();
//   }, [id]);

//   const handleSubmit = async () => {
//     try {
//       await axios.post(`http://localhost:5000/api/inspection/${id}`, {
//         requiresInspection: inspectionNeeded,
//         reason,
//         inspector,
//         date: dateTime.split("T")[0],  
//         time: dateTime.split("T")[1]   
//       });
//       alert("Inspection details saved successfully!");
//       navigate("/all-applications");
//     } catch (error) {
//       console.error("Error updating inspection details", error);
//     }
//   };

//   const handleNoInspection = async () => {
//     try {
//       await axios.post(`http://localhost:5000/api/inspection/${id}`, {
//         requiresInspection: false,  
//         reason: "",
//         inspector: "",
//         date: "",
//         time: ""
//       });
//       alert("Your response is stored , please save inspection details");
//       setInspectionNeeded(false);
//       setReason("");
//       setInspector("");
//       setDateTime("");
//     } catch (error) {
//       console.error("Error updating inspection details", error);
//     }
//   };

//   return (
//     <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-4">Inspection Approval</h2>
//       <label className="block mb-2">
//         <input 
//           type="checkbox" 
//           checked={inspectionNeeded} 
//           onChange={() => setInspectionNeeded(!inspectionNeeded)}
//         />{" "}
//         Inspection Needed
//       </label>

//       {inspectionNeeded && (
//         <>
//           <label className="block mt-4">
//             Reason for Inspection:
//             <textarea 
//               className="border p-2 w-full rounded" 
//               value={reason} 
//               onChange={(e) => setReason(e.target.value)}
//               required
//             />
//           </label>

//           <label className="block mt-4">
//             Assign Inspector:
//             <input 
//               type="text" 
//               className="border p-2 w-full rounded" 
//               value={inspector} 
//               onChange={(e) => setInspector(e.target.value)}
//               required
//             />
//           </label>

//           <label className="block mt-4">
//             Date & Time:
//             <input 
//               type="datetime-local" 
//               className="border p-2 w-full rounded" 
//               value={dateTime} 
//               onChange={(e) => setDateTime(e.target.value)}
//               required
//             />
//           </label>
//         </>
//       )}
//         <button 
//           onClick={handleNoInspection} 
//           className="bg-red-500 text-white px-4 py-2 rounded w-full"
//         >
//           No Inspection Needed
//         </button>
//       <div className="flex gap-2 mt-4">
//         <button 
//           onClick={handleSubmit} 
//           className="bg-green-500 text-white px-4 py-2 rounded w-full"
//         >
//           Save Inspection Details
//         </button>


//       </div>
//     </div>
//   );
// }

// export default InspectionApproval;








// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// function InspectionApproval() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [inspectionNeeded, setInspectionNeeded] = useState(false);
//   const [noInspection, setNoInspection] = useState(false); // New checkbox state
//   const [reason, setReason] = useState("");
//   const [inspector, setInspector] = useState("");
//   const [dateTime, setDateTime] = useState("");

//   useEffect(() => {
//     const fetchInspectionData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/inspection/${id}`);
//         if (response.data) {
//           setInspectionNeeded(response.data.requiresInspection);
//           setNoInspection(!response.data.requiresInspection); // Toggle based on inspectionNeeded
//           setReason(response.data.reason || "");
//           setInspector(response.data.inspector || "");
//           setDateTime(response.data.dateTime || "");
//         }
//       } catch (error) {
//         console.error("Error fetching inspection details", error);
//       }
//     };

//     fetchInspectionData();
//   }, [id]);

//   // 🔹 Handle checkbox changes
//   const handleInspectionChange = () => {
//     setInspectionNeeded(!inspectionNeeded);
//     setNoInspection(false); // Disable "No Inspection Needed" when "Inspection Needed" is checked
//   };

//   const handleNoInspectionChange = () => {
//     setNoInspection(!noInspection);
//     setInspectionNeeded(false); // Disable "Inspection Needed" when "No Inspection Needed" is checked
//     if (!noInspection) {
//       setReason("");
//       setInspector("");
//       setDateTime("");
//     }
//   };

//   // 🔹 Handle form submission
//   const handleSubmit = async () => {
//     try {
//       await axios.post(`http://localhost:5000/api/inspection/${id}`, {
//         requiresInspection: inspectionNeeded,
//         reason: inspectionNeeded ? reason : "",
//         inspector: inspectionNeeded ? inspector : "",
//         date: inspectionNeeded ? dateTime.split("T")[0] : "",
//         time: inspectionNeeded ? dateTime.split("T")[1] : ""
//       });
//       alert("Inspection details saved successfully!");
//       navigate("/all-applications");
//     } catch (error) {
//       console.error("Error updating inspection details", error);
//     }
//   };

//   return (
//     <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-4">Inspection Approval</h2>

//       {/* ✅ Inspection Needed Checkbox */}
//       <label className="block mb-2">
//         <input 
//           type="checkbox" 
//           checked={inspectionNeeded} 
//           onChange={handleInspectionChange}
//           disabled={noInspection} // Disable if "No Inspection Needed" is checked
//         />{" "}
//         Inspection Needed
//       </label>

//       {/* ✅ No Inspection Needed Checkbox */}
//       <label className="block mb-2">
//         <input 
//           type="checkbox" 
//           checked={noInspection} 
//           onChange={handleNoInspectionChange}
//           disabled={inspectionNeeded} // Disable if "Inspection Needed" is checked
//         />{" "}
//         No Inspection Needed
//       </label>

//       {/* Show fields only if Inspection is needed */}
//       {inspectionNeeded && (
//         <>
//           <label className="block mt-4">
//             Reason for Inspection:
//             <textarea 
//               className="border p-2 w-full rounded" 
//               value={reason} 
//               onChange={(e) => setReason(e.target.value)}
//               required
//             />
//           </label>

//           <label className="block mt-4">
//             Assign Inspector:
//             <input 
//               type="text" 
//               className="border p-2 w-full rounded" 
//               value={inspector} 
//               onChange={(e) => setInspector(e.target.value)}
//               required
//             />
//           </label>

//           <label className="block mt-4">
//             Date & Time:
//             <input 
//               type="datetime-local" 
//               className="border p-2 w-full rounded" 
//               value={dateTime} 
//               onChange={(e) => setDateTime(e.target.value)}
//               required
//             />
//           </label>
//         </>
//       )}

//       {/* ✅ Save Button */}
//       <button 
//         onClick={handleSubmit} 
//         className="bg-green-500 text-white px-4 py-2 rounded mt-4 w-full"
//       >
//         Save Inspection Details
//       </button>
//     </div>
//   );
// }

// export default InspectionApproval;










// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// function InspectionApproval() {
//   const { id } = useParams(); // This is the applicationId
//   const navigate = useNavigate();
//   const [inspectionNeeded, setInspectionNeeded] = useState(false);
//   const [noInspection, setNoInspection] = useState(false);
//   const [reason, setReason] = useState("");
//   const [inspector, setInspector] = useState("");
//   const [dateTime, setDateTime] = useState("");


//   useEffect(() => {
//     const fetchInspectionData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/inspection/${id}`);
//         if (response.data) {
//           setInspectionNeeded(response.data.requiresInspection);
//           setNoInspection(!response.data.requiresInspection);
//           setReason(response.data.reason || "");
//           setInspector(response.data.inspector || "");
//           setDateTime(response.data.dateTime || "");
//         }
//       } catch (error) {
//         console.error("Error fetching inspection details", error);
//       }
//     };

//     fetchInspectionData();
//   }, [id]);

//   // Handle checkbox changes
//   const handleInspectionChange = () => {
//     setInspectionNeeded(!inspectionNeeded);
//     setNoInspection(false);
//   };

//   const handleNoInspectionChange = () => {
//     setNoInspection(!noInspection);
//     setInspectionNeeded(false);
//     if (!noInspection) {
//       setReason("");
//       setInspector("");
//       setDateTime("");
//     }
//   };

//   // 🔹 Save Inspection Data
// //   const handleSubmit = async () => {
// //     try{

// //     }catch(error){}
// //     try {
// //       await axios.post(`http://localhost:5000/api/inspection`, {
// //         applicationId: id, // ✅ Ensure ID is sent!
// //         requiresInspection: inspectionNeeded,
// //         reason,
// //         inspector,
// //         date: dateTime.split("T")[0], // Extract date
// //         time: dateTime.split("T")[1], // Extract time
// //       });
  
// //       alert("Inspection details saved successfully!");
// //       navigate("/all-applications");
// //     } catch (error) {
// //       console.error("Error updating inspection details", error);
// //     }
// //   };


// const handleSubmit = async () => {
//     try {
//         // ✅ First, update the application to set `inspectionStatus` to true
//         await axios.put(`http://localhost:5000/api/application/${id}`, {
//             inspectionStatus: true
//         });

//         // ✅ Then, create a new inspection record
//         await axios.post(`http://localhost:5000/api/inspection`, {
//             applicationId: id, // Ensure ID is sent
//             requiresInspection: inspectionNeeded,
//             reason,
//             inspector,
//             date: dateTime.split("T")[0], // Extract date
//             time: dateTime.split("T")[1], // Extract time
//         });

//         alert("Inspection details saved successfully!");
//         navigate("/all-applications");

//     } catch (error) {
//         console.error("Error updating inspection details", error);
//     }
// };
//   return (
//     <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-4">Inspection Approval</h2>

//       <label className="block mb-2">
//         <input 
//           type="checkbox" 
//           checked={inspectionNeeded} 
//           onChange={handleInspectionChange}
//           disabled={noInspection}
//           required
//         />{" "}
//         Inspection Needed
//       </label>

//       <label className="block mb-2">
//         <input 
//           type="checkbox" 
//           checked={noInspection} 
//           onChange={handleNoInspectionChange}
//           disabled={inspectionNeeded}
//           required
//         />{" "}
//         No Inspection Needed
//       </label>

//       {inspectionNeeded && (
//         <>
//           <label className="block mt-4">
//             Reason for Inspection:
//             <textarea 
//               className="border p-2 w-full rounded" 
//               value={reason} 
//               onChange={(e) => setReason(e.target.value)}
//               required
//             />
//           </label>

//           <label className="block mt-4">
//             Assign Inspector:
//             <input 
//               type="text" 
//               className="border p-2 w-full rounded" 
//               value={inspector} 
//               onChange={(e) => setInspector(e.target.value)}
//               required
//             />
//           </label>

//           <label className="block mt-4">
//             Date & Time:
//             <input 
//               type="datetime-local" 
//               className="border p-2 w-full rounded" 
//               value={dateTime} 
//               onChange={(e) => setDateTime(e.target.value)}
//               required
//             />
//           </label>
//         </>
//       )}

//       <button 
//         onClick={handleSubmit} 
//         className="bg-green-500 text-white px-4 py-2 rounded mt-4 w-full"
//       >
//         Save Inspection Details
//       </button>
//     </div>
//   );

  
// }

// export default InspectionApproval;


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function InspectionApproval() {
  const { id } = useParams(); // This is the applicationId
  const navigate = useNavigate();
  const [inspectionNeeded, setInspectionNeeded] = useState(false);
  const [noInspection, setNoInspection] = useState(false);
  const [reason, setReason] = useState("");
  const [inspector, setInspector] = useState("");
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const fetchInspectionData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/inspection/${id}`);
        if (response.data) {
          setInspectionNeeded(response.data.requiresInspection);
          setNoInspection(!response.data.requiresInspection);
          setReason(response.data.reason || "");
          setInspector(response.data.inspector || "");
          setDateTime(response.data.dateTime || "");
        }
      } catch (error) {
        console.error("Error fetching inspection details", error);
      }
    };

    fetchInspectionData();
  }, [id]);

  const handleInspectionChange = () => {
    setInspectionNeeded(!inspectionNeeded);
    setNoInspection(false);
  };

  const handleNoInspectionChange = () => {
    setNoInspection(!noInspection);
    setInspectionNeeded(false);
    if (!noInspection) {
      setReason("");
      setInspector("");
      setDateTime("");
    }
  };

  const handleSubmit = async () => {
    try {
        await axios.put(`http://localhost:5000/api/application/${id}`, {
            inspectionStatus: true
        });

        await axios.post(`http://localhost:5000/api/inspection`, {
            applicationId: id, // Ensure ID is sent
            requiresInspection: inspectionNeeded,
            reason,
            inspector,
            date: dateTime.split("T")[0], // Extract date
            time: dateTime.split("T")[1], // Extract time
        });

        alert("Inspection details saved successfully!");
        navigate("/all-applications");

    } catch (error) {
        console.error("Error updating inspection details", error);
    }
  };

  return (
    <div className="p-8 my-4 max-w-lg mx-auto bg-white rounded-xl shadow-xl border border-gray-300">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">📝 Inspection Approval</h2>
  
      {/* Inspection Type Selection */}
      <div className="mb-6">
        <p className="font-medium text-gray-700 mb-2">Select Inspection Requirement:</p>
        <div className="flex items-center space-x-6">
          <label className="flex items-center space-x-2 text-gray-800">
            <input 
              type="checkbox" 
              checked={inspectionNeeded} 
              onChange={handleInspectionChange} 
              disabled={noInspection}
              className="accent-blue-500"
            />
            <span>Inspection Needed</span>
          </label>
          
          <label className="flex items-center space-x-2 text-gray-800">
            <input 
              type="checkbox" 
              checked={noInspection} 
              onChange={handleNoInspectionChange} 
              disabled={inspectionNeeded}
              className="accent-blue-500"
            />
            <span>No Inspection Needed</span>
          </label>
        </div>
      </div>
  
      {/* Conditional Inputs for Inspection Needed */}
      {inspectionNeeded && (
        <div className="space-y-6">
          <div>
            <label className="block font-medium text-gray-700 mb-2">Reason for Inspection:</label>
            <textarea 
              className="border rounded-md p-4 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={reason} 
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter reason for inspection"
              required
            />
          </div>
  
          <div>
            <label className="block font-medium text-gray-700 mb-2">Assign Inspector:</label>
            <input 
              type="text" 
              className="border rounded-md p-4 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={inspector} 
              onChange={(e) => setInspector(e.target.value)}
              placeholder="Enter inspector name"
              required
            />
          </div>
  
          <div>
            <label className="block font-medium text-gray-700 mb-2">Date & Time:</label>
            <input 
              type="datetime-local" 
              className="border rounded-md p-4 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={dateTime} 
              onChange={(e) => setDateTime(e.target.value)}
              required
            />
          </div>
        </div>
      )}
  
      {/* Submit Button */}
      <button 
        onClick={handleSubmit} 
        className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-200 ease-in-out"
      >
        ✅ Save Inspection Details
      </button>
    </div>
  );
}

export default InspectionApproval;
