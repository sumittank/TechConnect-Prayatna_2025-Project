// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function InspectionSchedule() {
//   const [inspections, setInspections] = useState([]);
//   const [filteredInspections, setFilteredInspections] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [currentPage, setCurrentPage] = useState(1);
//   const inspectionsPerPage = 6;

//   // Fetch Inspections
//   useEffect(() => {
//     const fetchInspections = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/inspection");
//         setInspections(response.data);
//         setFilteredInspections(response.data);
//       } catch (err) {
//         setError("Error fetching inspections");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchInspections();
//   }, []);

//   // Update Inspection Status
//   const updateStatus = async (id, status) => {
//     try {
//       await axios.put(`http://localhost:5000/api/inspection/${id}/status`, { status });
//       const updatedInspections = inspections.map((insp) =>
//         insp._id === id ? { ...insp, status } : insp
//       );
//       setInspections(updatedInspections);
//       filterInspections(updatedInspections);
//     } catch (err) {
//       setError("Error updating status");
//     }
//   };

//   // Handle Search & Filter
//   useEffect(() => {
//     filterInspections(inspections);
//   }, [searchQuery, statusFilter]);

//   const filterInspections = (data) => {
//     let filtered = data;

//     if (searchQuery) {
//       filtered = filtered.filter((insp) =>
//         insp.applicationId.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     if (statusFilter !== "all") {
//       filtered = filtered.filter((insp) => insp.status === statusFilter);
//     }

//     setFilteredInspections(filtered);
//   };

//   // Pagination
//   const indexOfLastInspection = currentPage * inspectionsPerPage;
//   const indexOfFirstInspection = indexOfLastInspection - inspectionsPerPage;
//   const currentInspections = filteredInspections.slice(indexOfFirstInspection, indexOfLastInspection);

//   const totalPages = Math.ceil(filteredInspections.length / inspectionsPerPage);

//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-3xl font-bold mb-6 text-center">Inspection Schedule</h2>

//       {/* Search & Filter Section */}
//       <div className="flex flex-wrap justify-between items-center mb-4">
//         <input
//           type="text"
//           placeholder="Search by Application ID"
//           className="p-2 border rounded-md w-64"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />

//         <select
//           className="p-2 border rounded-md"
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//         >
//           <option value="all">All</option>
//           <option value="pending">Pending</option>
//           <option value="completed">Completed</option>
//           <option value="rescheduled">Rescheduled</option>
//         </select>
//       </div>

//       {/* Loading & Error Handling */}
//       {loading && <p className="text-center">Loading...</p>}
//       {error && <p className="text-red-500 text-center">{error}</p>}

//       {/* Inspections List */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {currentInspections.length > 0 ? (
//           currentInspections.map((inspection) => (
//             <div key={inspection._id} className="p-5 border rounded-lg shadow-md bg-white">
//               <p><strong>Application ID:</strong> {inspection.applicationId}</p>
//               <p><strong>Inspector:</strong> {inspection.inspector || "Not Assigned"}</p>
//               <p><strong>Date:</strong> {inspection.date || "Not Scheduled"}</p>
//               <p><strong>Time:</strong> {inspection.time || "Not Scheduled"}</p>
//               <p><strong>Reason:</strong> {inspection.reason || "No Reason Provided"}</p>
//               <p><strong>Status:</strong> 
//                 <span className={`ml-2 px-2 py-1 text-white text-sm rounded 
//                   ${inspection.status === "pending" ? "bg-yellow-500" : ""}
//                   ${inspection.status === "completed" ? "bg-green-500" : ""}
//                   ${inspection.status === "rescheduled" ? "bg-blue-500" : ""}`}>
//                   {inspection.status}
//                 </span>
//               </p>

//               {inspection.status === "pending" && (
//                 <div className="mt-4 flex gap-2">
//                   <button
//                     className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
//                     onClick={() => updateStatus(inspection._id, "completed")}
//                   >
//                     Mark Completed
//                   </button>
//                   <button
//                     className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
//                     onClick={() => updateStatus(inspection._id, "rescheduled")}
//                   >
//                     Reschedule
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))
//         ) : (
//           <p className="text-center col-span-3">No inspections found.</p>
//         )}
//       </div>

//       {/* Pagination Controls */}
//       {totalPages > 1 && (
//         <div className="flex justify-center mt-6">
//           <button
//             className="px-3 py-1 bg-gray-300 rounded-l-md"
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage(currentPage - 1)}
//           >
//             Prev
//           </button>
//           <span className="px-4 py-1 bg-gray-200">{currentPage} / {totalPages}</span>
//           <button
//             className="px-3 py-1 bg-gray-300 rounded-r-md"
//             disabled={currentPage === totalPages}
//             onClick={() => setCurrentPage(currentPage + 1)}
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default InspectionSchedule;






// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function InspectionSchedule() {
//   const [inspections, setInspections] = useState([]);
//   const [filteredInspections, setFilteredInspections] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [currentPage, setCurrentPage] = useState(1);
//   const inspectionsPerPage = 6;
//   const navigate = useNavigate();

//   // Fetch Inspections
//   useEffect(() => {
//     const fetchInspections = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/inspection");
//         setInspections(response.data);
//         setFilteredInspections(response.data);
//       } catch (err) {
//         setError("Error fetching inspections");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchInspections();
//   }, []);

//   // Update Inspection Status
//   const updateStatus = async (id, status) => {
//     try {
//       await axios.put(`http://localhost:5000/api/inspection/${id}/status`, { status });
//       const updatedInspections = inspections.map((insp) =>
//         insp._id === id ? { ...insp, status } : insp
//       );
//       setInspections(updatedInspections);
//       filterInspections(updatedInspections);
//     } catch (err) {
//       setError("Error updating status");
//     }
//   };

//   // Handle Search & Filter
//   useEffect(() => {
//     filterInspections(inspections);
//   }, [searchQuery, statusFilter]);

//   const filterInspections = (data) => {
//     let filtered = data;

//     if (searchQuery) {
//       filtered = filtered.filter((insp) =>
//         insp.applicationId.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     if (statusFilter !== "all") {
//       filtered = filtered.filter((insp) => insp.status === statusFilter);
//     }

//     setFilteredInspections(filtered);
//   };

//   // Pagination
//   const indexOfLastInspection = currentPage * inspectionsPerPage;
//   const indexOfFirstInspection = indexOfLastInspection - inspectionsPerPage;
//   const currentInspections = filteredInspections.slice(indexOfFirstInspection, indexOfLastInspection);

//   const totalPages = Math.ceil(filteredInspections.length / inspectionsPerPage);

//   // Redirect to Check Inspection Page
//   const handleRescheduleNow = (applicationId) => {
//     navigate(`/inspection/${applicationId}`);
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-3xl font-bold mb-6 text-center">Inspection Schedule</h2>

//       {/* Search & Filter Section */}
//       <div className="flex flex-wrap justify-between items-center mb-4">
//         <input
//           type="text"
//           placeholder="Search by Application ID"
//           className="p-2 border rounded-md w-64"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />

//         <select
//           className="p-2 border rounded-md"
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//         >
//           <option value="all">All</option>
//           <option value="pending">Pending</option>
//           <option value="completed">Completed</option>
//           <option value="rescheduled">Rescheduled</option>
//         </select>
//       </div>

//       {/* Loading & Error Handling */}
//       {loading && <p className="text-center">Loading...</p>}
//       {error && <p className="text-red-500 text-center">{error}</p>}

//       {/* Inspections List */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {currentInspections.length > 0 ? (
//           currentInspections.map((inspection) => (
//             <div key={inspection._id} className="p-5 border rounded-lg shadow-md bg-white">
//               <p><strong>Application ID:</strong> {inspection.applicationId}</p>
//               <p><strong>Inspector:</strong> {inspection.inspector || "Not Assigned"}</p>
//               <p><strong>Date:</strong> {inspection.date || "Not Scheduled"}</p>
//               <p><strong>Time:</strong> {inspection.time || "Not Scheduled"}</p>
//               <p><strong>Reason:</strong> {inspection.reason || "No Reason Provided"}</p>
//               <p><strong>Status:</strong> 
//                 <span className={`ml-2 px-2 py-1 text-white text-sm rounded 
//                   ${inspection.status === "pending" ? "bg-yellow-500" : ""}
//                   ${inspection.status === "completed" ? "bg-green-500" : ""}
//                   ${inspection.status === "rescheduled" ? "bg-blue-500" : ""}`}>
//                   {inspection.status}
//                 </span>
//               </p>

//               {inspection.status === "pending" && (
//                 <div className="mt-4 flex gap-2">
//                   <button
//                     className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
//                     onClick={() => updateStatus(inspection._id, "completed")}
//                   >
//                     Mark Completed
//                   </button>
//                   <button
//                     className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
//                     onClick={() => updateStatus(inspection._id, "rescheduled")}
//                   >
//                     Reschedule
//                   </button>
//                 </div>
//               )}

//               {inspection.status === "rescheduled" && (
//                 <div className="mt-4">
//                   <button
//                     className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
//                     onClick={() => handleRescheduleNow(inspection.applicationId)}
//                   >
//                     Reschedule Now
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))
//         ) : (
//           <p className="text-center col-span-3">No inspections found.</p>
//         )}
//       </div>

//       {/* Pagination Controls */}
//       {totalPages > 1 && (
//         <div className="flex justify-center mt-6">
//           <button
//             className="px-3 py-1 bg-gray-300 rounded-l-md"
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage(currentPage - 1)}
//           >
//             Prev
//           </button>
//           <span className="px-4 py-1 bg-gray-200">{currentPage} / {totalPages}</span>
//           <button
//             className="px-3 py-1 bg-gray-300 rounded-r-md"
//             disabled={currentPage === totalPages}
//             onClick={() => setCurrentPage(currentPage + 1)}
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default InspectionSchedule;





// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function InspectionSchedule() {
//   const [inspections, setInspections] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [currentPage, setCurrentPage] = useState(1);
//   const inspectionsPerPage = 6;
//   const navigate = useNavigate();

//   // Fetch Inspections
//   useEffect(() => {
//     const fetchInspections = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/inspection");
//         setInspections(response.data);
//       } catch (err) {
//         setError("Error fetching inspections");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchInspections();
//   }, []);

//   // Toggle Status Function
//   const toggleStatus = async (id, currentStatus) => {
//     const statusOrder = ["pending", "completed", "rescheduled"];
//     const nextStatus = statusOrder[(statusOrder.indexOf(currentStatus) + 1) % statusOrder.length];

//     try {
//       await axios.put(`http://localhost:5000/api/inspection/${id}/status`, { status: nextStatus });
//       setInspections(inspections.map((insp) => (insp._id === id ? { ...insp, status: nextStatus } : insp)));
//     } catch (err) {
//       setError("Error updating status");
//     }
//   };

//   // Redirect to Check Inspection Page
//   const handleRescheduleNow = (applicationId) => {
//     navigate(`/inspection/${applicationId}`);
//   };

//   // Pagination Logic
//   const indexOfLastInspection = currentPage * inspectionsPerPage;
//   const indexOfFirstInspection = indexOfLastInspection - inspectionsPerPage;
//   const currentInspections = inspections.slice(indexOfFirstInspection, indexOfLastInspection);
//   const totalPages = Math.ceil(inspections.length / inspectionsPerPage);

//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-3xl font-bold mb-6 text-center">Inspection Schedule</h2>

//       {/* Search & Filter Section */}
//       <div className="flex flex-wrap justify-between items-center mb-4">
//         <input
//           type="text"
//           placeholder="Search by Application ID"
//           className="p-2 border rounded-md w-64"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />

//         <select
//           className="p-2 border rounded-md"
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//         >
//           <option value="all">All</option>
//           <option value="pending">Pending</option>
//           <option value="completed">Completed</option>
//           <option value="rescheduled">Rescheduled</option>
//         </select>
//       </div>

//       {/* Loading & Error Handling */}
//       {loading && <p className="text-center">Loading...</p>}
//       {error && <p className="text-red-500 text-center">{error}</p>}

//       {/* Inspections List */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {currentInspections.length > 0 ? (
//           currentInspections.map((inspection) => (
//             <div key={inspection._id} className="p-5 border rounded-lg shadow-md bg-white">
//               <p><strong>Application ID:</strong> {inspection.applicationId}</p>
//               <p><strong>Inspector:</strong> {inspection.inspector || "Not Assigned"}</p>
//               <p><strong>Date:</strong> {inspection.date || "Not Scheduled"}</p>
//               <p><strong>Time:</strong> {inspection.time || "Not Scheduled"}</p>
//               <p><strong>Reason:</strong> {inspection.reason || "No Reason Provided"}</p>
//               <p><strong>Status:</strong> 
//                 <span className={`ml-2 px-2 py-1 text-white text-sm rounded 
//                   ${inspection.status === "pending" ? "bg-yellow-500" : ""}
//                   ${inspection.status === "completed" ? "bg-green-500" : ""}
//                   ${inspection.status === "rescheduled" ? "bg-blue-500" : ""}`}>
//                   {inspection.status}
//                 </span>
//               </p>

//               {/* Toggle Status Button */}
//               <button
//                 className="mt-4 px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-900 transition"
//                 onClick={() => toggleStatus(inspection._id, inspection.status)}
//               >
//                 Change Status
//               </button>

//               {/* Show 'Reschedule Now' button only when status is 'rescheduled' */}
//               {inspection.status === "rescheduled" && (
//                 <div className="mt-4">
//                   <button
//                     className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
//                     onClick={() => handleRescheduleNow(inspection.applicationId)}
//                   >
//                     Reschedule Now
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))
//         ) : (
//           <p className="text-center col-span-3">No inspections found.</p>
//         )}
//       </div>

//       {/* Pagination Controls */}
//       {totalPages > 1 && (
//         <div className="flex justify-center mt-6">
//           <button
//             className="px-3 py-1 bg-gray-300 rounded-l-md"
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage(currentPage - 1)}
//           >
//             Prev
//           </button>
//           <span className="px-4 py-1 bg-gray-200">{currentPage} / {totalPages}</span>
//           <button
//             className="px-3 py-1 bg-gray-300 rounded-r-md"
//             disabled={currentPage === totalPages}
//             onClick={() => setCurrentPage(currentPage + 1)}
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default InspectionSchedule;












import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function InspectionSchedule() {
    const [inspections, setInspections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const inspectionsPerPage = 6;
    const navigate = useNavigate();

    // Fetch Inspections
    useEffect(() => {
        const fetchInspections = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/inspection");
                setInspections(response.data);
            } catch (err) {
                setError("Error fetching inspections");
            } finally {
                setLoading(false);
            }
        };
        fetchInspections();
    }, []);

    // Toggle Status Function
    const toggleStatus = async (id, currentStatus) => {
        const statusOrder = ["pending", "completed", "rescheduled" , "rejected", "in progress"];
        const nextStatus = statusOrder[(statusOrder.indexOf(currentStatus) + 1) % statusOrder.length];

        try {
            await axios.put(`http://localhost:5000/api/inspection/${id}/status`, { status: nextStatus });
            setInspections(inspections.map((insp) => (insp._id === id ? { ...insp, status: nextStatus } : insp)));
        } catch (err) {
            setError("Error updating status");
        }
    };

    // Mark as "All Done" & Save to Database
    const handleAllDone = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/inspection/${id}/finalize`);
            setInspections(inspections.map((insp) => (insp._id === id ? { ...insp, statusFinalized: true } : insp)));
        } catch (err) {
            setError("Error finalizing status");
        }
    };

    // Redirect to Reschedule Page
    const handleRescheduleNow = (applicationId) => {
        navigate(`/inspection/${applicationId}`);
    };

    // Pagination Logic
    const indexOfLastInspection = currentPage * inspectionsPerPage;
    const indexOfFirstInspection = indexOfLastInspection - inspectionsPerPage;
    const currentInspections = inspections.slice(indexOfFirstInspection, indexOfLastInspection);
    const totalPages = Math.ceil(inspections.length / inspectionsPerPage);

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-center">Inspection Schedule</h2>

            {/* Search & Filter Section */}
            <div className="flex flex-wrap justify-between items-center mb-4">
                <input
                    type="text"
                    placeholder="Search by Application ID"
                    className="p-2 border rounded-md w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                <select
                    className="p-2 border rounded-md"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="rescheduled">Rescheduled</option>
                    <option value="rejected">rejected</option>
                    <option value="in progress">in progress</option>
                </select>
            </div>

            {/* Loading & Error Handling */}
            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* Inspections List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {inspections.length > 0 ? (
                    [...inspections].reverse().map((inspection) => (
                        <div key={inspection._id} className="p-5 border rounded-lg shadow-md bg-white">
                            <p><strong>Application ID:</strong> {inspection.applicationId}</p>
                            <p><strong>Inspector:</strong> {inspection.inspector || "Not Assigned"}</p>
                            <p><strong>Date:</strong> {inspection.date || "Not Scheduled"}</p>
                            <p><strong>Time:</strong> {inspection.time || "Not Scheduled"}</p>
                            <p><strong>Reason:</strong> {inspection.reason || "No Reason Provided"}</p>
                            <p><strong>Status:</strong>
                                <span className={`ml-2 px-2 py-1 text-white text-sm rounded 
                  ${inspection.status === "pending" ? "bg-gray-500" : ""}
                  ${inspection.status === "completed" ? "bg-green-500" : ""}
                  ${inspection.status === "rescheduled" ? "bg-yellow-500" : ""}
                  ${inspection.status === "rejected" ? "bg-red-500" : ""}
                  ${inspection.status === "in progress" ? "bg-purple-500" : ""}
                  `}> 
                                    {inspection.status}
                                </span>
                            </p>

                            {/* Hide 'Change Status' if 'All Done' was clicked before */}
                            {!inspection.statusFinalized && (
                                <button
                                    className="mt-4 px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-900 transition"
                                    onClick={() => toggleStatus(inspection._id, inspection.status)}
                                >
                                    Change Status
                                </button>
                            )}

                            {/* Show 'All Done' button only when status is 'completed' and not finalized */}
                            {(inspection.status === "completed" || inspection.status === "rejected") && !inspection.statusFinalized && (
                                <button
                                    className="mt-2 ml-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-800 transition"
                                    onClick={() => handleAllDone(inspection._id)}
                                    title="After clicking this button, you won't be able to make any changes further"
                                >
                                    All Done
                                </button>

                            )}

                            {/* Show 'Reschedule Now' button only when status is 'rescheduled' */}
                            {inspection.status === "rescheduled" && (
                                <button
                                    className="mt-2 ml-1 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                                    onClick={() => handleRescheduleNow(inspection.applicationId)}
                                >
                                    RescheduleNow
                                </button>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-center col-span-3">No inspections found.</p>
                )}
            </div>
        </div>
    );
}

export default InspectionSchedule;


