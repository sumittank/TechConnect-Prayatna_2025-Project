// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// function ApplicationDetails() {
//     const { id } = useParams();
//     const [application, setApplication] = useState(null);
//     const [status, setStatus] = useState("");

//     useEffect(() => {
//         const fetchApplication = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:5000/api/application/${id}`);
//                 setApplication(response.data);
//                 setStatus(response.data.status || "Pending");
//             } catch (error) {
//                 console.error("Error fetching application details", error);
//             }
//         };

//         fetchApplication();
//     }, [id]);

//     const handleStatusChange = async () => {
//         try {
//             await axios.put(`http://localhost:5000/api/application/${id}/status`, { status });
//             alert("Status updated successfully");
//         } catch (error) {
//             console.error("Error updating status", error);
//         }
//     };

//     if (!application) {
//         return <p>Loading application details...</p>;
//     }

//     console.log(application)

//     return (
//         <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
//             <h2 className="text-2xl font-bold mb-4">Application Details</h2>
//             <p><strong>Owner Name:</strong> {application.ownerName}</p>
//             <p><strong>Email:</strong> {application.email}</p>
//             <p><strong>Contact:</strong> {application.contact}</p>
//             <p><strong>Address:</strong> {application.address}</p>
//             <p><strong>Status:</strong> {application.status}</p>

//             <h3 className="text-xl font-bold mt-4">Building Details</h3>
//             <p><strong>Total Area:</strong> {application.buildingDetails.totalArea}</p>
//             <p><strong>Number of Floors:</strong> {application.buildingDetails.numFloors}</p>
//             <p><strong>Occupancy Type:</strong> {application.buildingDetails.occupancyType}</p>
//             <p><strong>Height:</strong> {application.buildingDetails.height}</p>

//             <h3 className="text-xl font-bold mt-4">Fire Safety Measures</h3>
//             <ul>
//                 {application.fireSafetyMeasures.map((measure, index) => (
//                     <li key={index}>✅ {measure}</li>
//                 ))}
//             </ul>

//             <h3 className="text-xl font-bold mt-4">Uploaded Documents</h3>
//             <div className="grid grid-cols-2 gap-4">
//                 {application.documents &&
//                     Object.entries(application.documents).map(([key, value]) => (
//                         <div key={key} className="border p-2 rounded">
//                             <p><strong>{key.replace(/([A-Z])/g, " $1")}</strong></p>
//                             {value ? (
//                                 <img src={value} alt={key} className="w-full h-32 object-cover" onError={(e) => e.target.style.display = "none"} />
//                             ) : (
//                                 <p className="text-red-500">Image not available</p>
//                             )}
//                         </div>
//                     ))}
//             </div>


//             <h3 className="text-xl font-bold mt-4">Update Status</h3>
//             <select value={status} onChange={(e) => setStatus(e.target.value)} className="border p-2 rounded">
//                 <option value="Pending">Pending</option>
//                 <option value="Approved">Approved</option>
//                 <option value="Rejected">Rejected</option>
//             </select>
//             <button onClick={handleStatusChange} className="bg-green-500 text-white px-4 py-2 rounded ml-4">
//                 Update Status
//             </button>
//         </div>
//     );
// }

// export default ApplicationDetails;





// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// function ApplicationDetails() {
//     const { id } = useParams();
//     const [application, setApplication] = useState(null);
//     const [inspectionData, setInspectionData] = useState(null);
//     const [status, setStatus] = useState("");
//     const [selectedImage, setSelectedImage] = useState(null);

//     useEffect(() => {
//         const fetchApplication = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:5000/api/application/${id}`);
//                 const responseInspection = await axios.get(`http://localhost:5000/api/inspection/${id}`);
//                 setApplication(response.data);
//                 setStatus(response.data.status || "Pending");
//                 setInspectionData(responseInspection.data)
//             } catch (error) {
//                 console.error("Error fetching application details", error);
//             }
//         };

//         fetchApplication();
//     }, [id]);

//     const handleStatusChange = async () => {
//         try {
//             await axios.put(`http://localhost:5000/api/application/${id}/status`, { status });
//             alert("Status updated successfully");
//         } catch (error) {
//             console.error("Error updating status", error);
//         }
//     };

//     const waitCompleted = () =>{
//         alert("wait for Inspection status as completed, then proceed")
//     }

//     if (!application) {
//         return <p>Loading application details...</p>;
//     }

//     return (
//         <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
//             <h2 className="text-2xl font-bold mb-4">Application Details</h2>
//             <p><strong>Owner Name:</strong> {application.ownerName}</p>
//             <p><strong>Email:</strong> {application.email}</p>
//             <p><strong>Contact:</strong> {application.contact}</p>
//             <p><strong>Address:</strong> {application.address}</p>
//             <p><strong>Status:</strong> {application.status}</p>

//             <h3 className="text-xl font-bold mt-4">Building Details</h3>
//             <p><strong>Total Area:</strong> {application.buildingDetails.totalArea}</p>
//             <p><strong>Number of Floors:</strong> {application.buildingDetails.numFloors}</p>
//             <p><strong>Occupancy Type:</strong> {application.buildingDetails.occupancyType}</p>
//             <p><strong>Height:</strong> {application.buildingDetails.height}</p>

//             <h3 className="text-xl font-bold mt-4">Fire Safety Measures</h3>
//             <ul>
//                 {application.fireSafetyMeasures.map((measure, index) => (
//                     <li key={index}>✅ {measure}</li>
//                 ))}
//             </ul>

//             <h3 className="text-xl font-bold mt-4">Inspection Status</h3>
//             <div>
//                 {inspectionData.status}
//             </div>

//             <h3 className="text-xl font-bold mt-4">Update Status</h3>
//             <select value={status} onChange={(e) => setStatus(e.target.value)} className="border p-2 rounded">
//                 <option value="Pending">Pending</option>
//                 <option value="Approved">Approved</option>
//                 <option value="Rejected">Rejected</option>
//             </select>
//             <textarea name="remark" placeholder="give some remark before submitting" className="w-full p-2 border mt-2" required></textarea>
//             {inspectionData.status === 'completed' ? 
//             <button onClick={handleStatusChange} className="bg-green-500 text-white px-4 py-2 rounded">
//             Update Status
//         </button>:

//         <button onClick={waitCompleted} className="bg-gray-500 text-white px-4 py-2 rounded">
//         Update Status
//     </button>  

//         }
            

//             <h3 className="text-xl font-bold mt-4">Uploaded Documents</h3>
//             <div className="grid grid-cols-2 gap-4">
//                 {application.documents &&
//                     Object.entries(application.documents).map(([key, value]) => (
//                         <div key={key} className="border p-2 rounded">
//                             <p><strong>{key.replace(/([A-Z])/g, " $1")}</strong></p>
//                             {value ? (
//                                 <>
//                                     <img 
//                                         src={value} 
//                                         alt={key} 
//                                         className="w-full h-32 object-cover cursor-pointer"
//                                         onClick={() => setSelectedImage(value)} 
//                                         onError={(e) => e.target.style.display = "none"} 
//                                     />
//                                     <button 
//                                         className="bg-blue-500 text-white px-2 py-1 rounded mt-2 w-full"
//                                         onClick={() => setSelectedImage(value)}
//                                     >
//                                         View Full Image
//                                     </button>
//                                 </>
//                             ) : (
//                                 <p className="text-red-500">Image not available</p>
//                             )}
//                         </div>
//                     ))}
//             </div>



//             {/* Full Image Modal */}
//             {selectedImage && (
//                 <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
//                     <div className="relative bg-white p-4 rounded-lg shadow-lg max-w-4xl">
//                         <button 
//                             className="absolute top-2 right-2 bg-white text-white px-2 py-1 rounded-full"
//                             onClick={() => setSelectedImage(null)}
//                         >
//                             ❌
//                         </button>
//                         <img src={selectedImage} alt="Full Size" className="max-w-full max-h-[80vh] mx-auto" />
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default ApplicationDetails;





// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// function ApplicationDetails() {
//     const { id } = useParams();
//     const [application, setApplication] = useState(null);
//     const [inspectionData, setInspectionData] = useState(null);
//     const [status, setStatus] = useState("");
//     const [remark, setRemark] = useState(""); // New state for remarks
//     const [selectedImage, setSelectedImage] = useState(null);

//     useEffect(() => {
//         const fetchApplication = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:5000/api/application/${id}`);
//                 if(response.data.inspectionStatus !== false){
//                     const responseInspection = await axios.get(`http://localhost:5000/api/inspection/${id}`)
//                     setInspectionData(responseInspection.data);
//                 }
//                 else{
//                     setInspectionData("wait, application is not valided by the Inspection Officer");
//                 }
//                 setApplication(response.data);
//                 setStatus(response.data.status || "Pending");
                
//             } catch (error) {
//                 console.error("Error fetching application details", error);
//             }
//         };

//         fetchApplication();
//     }, [id]);

//     const handleStatusChange = async () => {
//         if (!remark.trim()) {
//             alert("Please provide a remark before submitting.");
//             return;
//         }

//         try {
//             await axios.put(`http://localhost:5000/api/application/${id}/status`, { status, remark });
//             alert("Status and remark updated successfully");
//             setRemark(""); // Clear remark after submission
//         } catch (error) {
//             console.error("Error updating status", error);
//         }
//     };

//     const waitCompleted = () => {
//         alert("Wait for Inspection status as completed, then proceed");
//     };

//     if (!application) {
//         return <p>Loading application details...</p>;
//     }

//     return (
//         <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
//             <h2 className="text-2xl font-bold mb-4">Application Details</h2>
//             <p><strong>Owner Name:</strong> {application.ownerName}</p>
//             <p><strong>Email:</strong> {application.email}</p>
//             <p><strong>Contact:</strong> {application.contact}</p>
//             <p><strong>Address:</strong> {application.address}</p>
//             <p><strong>Status:</strong> {application.status}</p>

//             <h3 className="text-xl font-bold mt-4">Building Details</h3>
//             <p><strong>Total Area:</strong> {application.buildingDetails.totalArea}</p>
//             <p><strong>Number of Floors:</strong> {application.buildingDetails.numFloors}</p>
//             <p><strong>Occupancy Type:</strong> {application.buildingDetails.occupancyType}</p>
//             <p><strong>Height:</strong> {application.buildingDetails.height}</p>

//             <h3 className="text-xl font-bold mt-4">Fire Safety Measures</h3>
//             <ul>
//                 {application.fireSafetyMeasures.map((measure, index) => (
//                     <li key={index}>✅ {measure}</li>
//                 ))}
//             </ul>

//             <h3 className="text-xl font-bold mt-4">Inspection Status</h3>
//             <div>{inspectionData.status || inspectionData}</div>

//             <h3 className="text-xl font-bold mt-4">Update Status</h3>
//             <select 
//                 value={status} 
//                 onChange={(e) => setStatus(e.target.value)} 
//                 className="border p-2 rounded"
//             >
//                 <option value="Pending">Pending</option>
//                 <option value="Approved">Approved</option>
//                 <option value="Rejected">Rejected</option>
//             </select>

//             {/* Remark Textarea */}
//             <textarea
//                 name="remark"
//                 placeholder="Give some remark before submitting"
//                 className="w-full p-2 border mt-2"
//                 value={remark}
//                 onChange={(e) => setRemark(e.target.value)}
//                 required
//             ></textarea>

//             {inspectionData.status === "completed" ? (
//                 <button 
//                     onClick={handleStatusChange} 
//                     className="bg-green-500 text-white px-4 py-2 rounded mt-2"
//                 >
//                     Update Status
//                 </button>
//             ) : (
//                 <button 
//                     onClick={waitCompleted} 
//                     className="bg-gray-500 text-white px-4 py-2 rounded mt-2"
//                 >
//                     Update Status
//                 </button>
//             )}

//             <h3 className="text-xl font-bold mt-4">Uploaded Documents</h3>
//             <div className="grid grid-cols-2 gap-4">
//                 {application.documents &&
//                     Object.entries(application.documents).map(([key, value]) => (
//                         <div key={key} className="border p-2 rounded">
//                             <p><strong>{key.replace(/([A-Z])/g, " $1")}</strong></p>
//                             {value ? (
//                                 <>
//                                     <img 
//                                         src={value} 
//                                         alt={key} 
//                                         className="w-full h-32 object-cover cursor-pointer"
//                                         onClick={() => setSelectedImage(value)} 
//                                         onError={(e) => e.target.style.display = "none"} 
//                                     />
//                                     <button 
//                                         className="bg-blue-500 text-white px-2 py-1 rounded mt-2 w-full"
//                                         onClick={() => setSelectedImage(value)}
//                                     >
//                                         View Full Image
//                                     </button>
//                                 </>
//                             ) : (
//                                 <p className="text-red-500">Image not available</p>
//                             )}
//                         </div>
//                     ))}
//             </div>

//             {/* Full Image Modal */}
//             {selectedImage && (
//                 <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
//                     <div className="relative bg-white p-4 rounded-lg shadow-lg max-w-4xl">
//                         <button 
//                             className="absolute top-2 right-2 bg-white text-white px-2 py-1 rounded-full"
//                             onClick={() => setSelectedImage(null)}
//                         >
//                             ❌
//                         </button>
//                         <img src={selectedImage} alt="Full Size" className="max-w-full max-h-[80vh] mx-auto" />
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default ApplicationDetails;



// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import AadhaarUpload from "../../components/AadhaarUpload";
// import AadhaarVerification from "../../components/AadhaarVerification";

// function ApplicationDetails() {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [application, setApplication] = useState(null);
//     const [inspectionData, setInspectionData] = useState(null);
//     const [status, setStatus] = useState("");
//     const [remark, setRemark] = useState("");
//     const [selectedImage, setSelectedImage] = useState(null);

//     useEffect(() => {
//         const fetchApplication = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:5000/api/application/${id}`);
//                 if(response.data.inspectionStatus !== false){
//                     const responseInspection = await axios.get(`http://localhost:5000/api/inspection/${id}`)
//                     setInspectionData(responseInspection.data);
//                 }
//                 else{
//                     setInspectionData("Wait, application is not validated by the Inspection Officer");
//                 }
//                 setApplication(response.data);
//                 setStatus(response.data.status || "Pending");
//             } catch (error) {
//                 console.error("Error fetching application details", error);
//             }
//         };

//         fetchApplication();
//     }, [id]);

//     const handleStatusChange = async () => {
//         if (!remark.trim()) {
//             alert("Please provide a remark before submitting.");
//             return;
//         }

//         try {
//             await axios.put(`http://localhost:5000/api/application/${id}/status`, { status, remark });
//             alert("Status and remark updated successfully");
//             setRemark("");
//         } catch (error) {
//             console.error("Error updating status", error);
//         }
//     };

//     const waitCompleted = () => {
//         alert("Wait for Inspection status as completed, then proceed");
//     };

//     const handleCheckInspection = () => {
//         navigate(`/inspection/${id}`);
//     };

//     if (!application) {
//         return <p>Loading application details...</p>;
//     }

//     return (
//         <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
//             <h2 className="text-2xl font-bold mb-4">Application Details</h2>
//             <p><strong>Owner Name:</strong> {application.ownerName}</p>
//             <p><strong>Business Name:</strong> {application.businessName}</p>
//             <p><strong>Email:</strong> {application.email}</p>
//             <p><strong>Contact:</strong> {application.contact}</p>
//             <p><strong>Address:</strong> {application.address}</p>
//             <p><strong>Status:</strong> {application.status}</p>

//             <h3 className="text-xl font-bold mt-4">Building Details</h3>
//             <p><strong>Total Area:</strong> {application.buildingDetails.totalArea}</p>
//             <p><strong>Number of Floors:</strong> {application.buildingDetails.numFloors}</p>
//             <p><strong>Occupancy Type:</strong> {application.buildingDetails.occupancyType}</p>
//             <p><strong>Height:</strong> {application.buildingDetails.height}</p>

//             <h3 className="text-xl font-bold mt-4">Fire Safety Measures</h3>
//             <ul>
//                 {application.fireSafetyMeasures.map((measure, index) => (
//                     <li key={index}>✅ {measure}</li>
//                 ))}
//             </ul>

//             <h3 className="text-xl font-bold mt-4">Inspection Status</h3>
//             <div>{inspectionData.status || inspectionData}</div>

            // {(inspectionData.status === "pending" || inspectionData.status === "rescheduled" || inspectionData==="Wait, application is not validated by the Inspection Officer") && (
            //     <button 
            //         onClick={handleCheckInspection} 
            //         className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
            //     >
            //         Approved Inspection Now
            //     </button>
            // )}

//             <h3 className="text-xl font-bold mt-4">Update Status</h3>
//             <select 
//                 value={status} 
//                 onChange={(e) => setStatus(e.target.value)} 
//                 className="border p-2 rounded"
//             >
//                 <option value="Pending">Pending</option>
//                 <option value="Approved">Approved</option>
//                 <option value="Rejected">Rejected</option>
//             </select>

//             <textarea
//                 name="remark"
//                 placeholder="Give some remark before submitting"
//                 className="w-full p-2 border mt-2"
//                 value={remark}
//                 onChange={(e) => setRemark(e.target.value)}
//                 required
//             ></textarea>

//             {inspectionData.status === "completed" ? (
//                 <button 
//                     onClick={handleStatusChange} 
//                     className="bg-green-500 text-white px-4 py-2 rounded mt-2"
//                 >
//                     Update Status
//                 </button>
//             ) : (
//                 <button 
//                     onClick={waitCompleted} 
//                     className="bg-gray-500 text-white px-4 py-2 rounded mt-2"
//                 >
//                     Update Status
//                 </button>
//             )}

//             <h3 className="text-xl font-bold mt-4">Uploaded Documents</h3>
//             <div className="grid grid-cols-2 gap-4">
//                 {application.documents &&
//                     Object.entries(application.documents).map(([key, value]) => (
//                         <div key={key} className="border p-2 rounded">
//                             <p><strong>{key.replace(/([A-Z])/g, " $1")}</strong></p>
//                             {value ? (
//                                 <>
//                                     <img 
//                                         src={value} 
//                                         alt={key} 
//                                         className="w-full h-32 object-cover cursor-pointer"
//                                         onClick={() => setSelectedImage(value)} 
//                                         onError={(e) => e.target.style.display = "none"} 
//                                     />
//                                     <button 
//                                         className="bg-blue-500 text-white px-2 py-1 rounded mt-2 w-full"
//                                         onClick={() => setSelectedImage(value)}
//                                     >
//                                         View Full Image
//                                     </button>
//                                 </>
//                             ) : (
//                                 <p className="text-red-500">Image not available</p>
//                             )}
//                         </div>
//                     ))}
//             </div>

//             {selectedImage && (
//                 <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
//                     <div className="relative bg-white p-4 rounded-lg shadow-lg max-w-4xl">
//                         <button 
//                             className="absolute top-2 right-2 bg-white text-white px-2 py-1 rounded-full"
//                             onClick={() => setSelectedImage(null)}
//                         >
//                             ❌
//                         </button>
//                         <img src={selectedImage} alt="Full Size" className="max-w-full max-h-[80vh] mx-auto" />
//                     </div>
//                 </div>
//             )}
//             {/* <AadhaarUpload aadhaarImage={application.documents?.aadhaarCard || ""} /> */}
//             <AadhaarUpload aadhaarImageUrl={application.documents?.aadharCard} />
//             {/* <AadhaarVerification /> */}


//         </div>
//     );
// }

// export default ApplicationDetails;

// import React, { useEffect, useState } from "react"; 
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import AadhaarUpload from "../../components/AadhaarUpload";

// function ApplicationDetails() {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [application, setApplication] = useState(null);
//     const [inspectionData, setInspectionData] = useState(null);
//     const [status, setStatus] = useState("");
//     const [remark, setRemark] = useState("");
//     const [selectedImage, setSelectedImage] = useState(null);

//     useEffect(() => {
//         const fetchApplication = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:5000/api/application/${id}`);
//                 if (response.data.inspectionStatus !== false) {
//                     const responseInspection = await axios.get(`http://localhost:5000/api/inspection/${id}`);
//                     setInspectionData(responseInspection.data);
//                 } else {
//                     setInspectionData("⚠️ Waiting for Inspection Officer's validation...");
//                 }
//                 setApplication(response.data);
//                 setStatus(response.data.status || "Pending");
//             } catch (error) {
//                 console.error("Error fetching application details", error);
//             }
//         };

//         fetchApplication();
//     }, [id]);

//     const handleStatusChange = async () => {
//         if (!remark.trim()) {
//             alert("⚠️ Please provide a remark before submitting.");
//             return;
//         }

//         try {
//             await axios.put(`http://localhost:5000/api/application/${id}/status`, { status, remark });
//             alert("✅ Status and remark updated successfully");
//             setRemark("");
//         } catch (error) {
//             console.error("Error updating status", error);
//         }
//     };

//     const waitCompleted = () => {
//         alert("⏳ Wait for Inspection status as completed before proceeding.");
//     };

//     const handleCheckInspection = () => {
//         navigate(`/inspection/${id}`);
//     };

//     if (!application) {
//         return <p className="text-center text-lg font-semibold">⏳ Loading application details...</p>;
//     }

//     return (
//         <div className="p-6 max-w-4xl mx-auto bg-gray-100 rounded-lg shadow-md">
//             <h2 className="text-2xl font-bold mb-4 text-gray-800">📜 Application Details</h2>
//             <p><strong>👤 Owner Name:</strong> {application.ownerName}</p>
//             <p><strong>🏢 Business Name:</strong> {application.businessName}</p>
//             <p><strong>✉️ Email:</strong> {application.email}</p>
//             <p><strong>📞 Contact:</strong> {application.contact}</p>
//             <p><strong>📍 Address:</strong> {application.address}</p>
//             <p><strong>🔹 Status:</strong> {application.status}</p>

//             <h3 className="text-xl font-bold mt-6 text-gray-800">🏗️ Building Details</h3>
//             <p><strong>📏 Total Area:</strong> {application.buildingDetails.totalArea}</p>
//             <p><strong>🏢 Number of Floors:</strong> {application.buildingDetails.numFloors}</p>
//             <p><strong>⚖️ Occupancy Type:</strong> {application.buildingDetails.occupancyType}</p>
//             <p><strong>📏 Height:</strong> {application.buildingDetails.height}</p>

//             <h3 className="text-xl font-bold mt-6 text-gray-800">🔥 Fire Safety Measures</h3>
//             <ul className="list-disc list-inside">
//                 {application.fireSafetyMeasures.map((measure, index) => (
//                     <li key={index} className="text-green-600">✅ {measure}</li>
//                 ))}
//             </ul>

//             <h3 className="text-xl font-bold mt-6 text-gray-800">📋 Inspection Status</h3>
//             <div className="p-3 bg-white rounded shadow-md">{inspectionData.status || inspectionData}</div>

//             {(inspectionData.status === "pending" || inspectionData.status === "rescheduled" || inspectionData === "⚠️ Waiting for Inspection Officer's validation...") && (
//                 <button 
//                     onClick={handleCheckInspection} 
//                     className="bg-blue-600 text-white px-4 py-2 rounded mt-3"
//                 >
//                     🏢 Approve Inspection Now
//                 </button>
//             )}

//             <h3 className="text-xl font-bold mt-6 text-gray-800">🔄 Update Status</h3>
//             <select 
//                 value={status} 
//                 onChange={(e) => setStatus(e.target.value)} 
//                 className="border p-2 rounded w-full"
//             >
//                 <option value="Pending">⏳ Pending</option>
//                 <option value="Approved">✅ Approved</option>
//                 <option value="Rejected">❌ Rejected</option>
//             </select>

//             <textarea
//                 placeholder="✍️ Add remarks before submitting"
//                 className="w-full p-2 border mt-3 rounded"
//                 value={remark}
//                 onChange={(e) => setRemark(e.target.value)}
//                 required
//             ></textarea>

//             {inspectionData.status === "completed" ? (
//                 <button 
//                     onClick={handleStatusChange} 
//                     className="bg-green-600 text-white px-4 py-2 rounded mt-3"
//                 >
//                     ✅ Update Status
//                 </button>
//             ) : (
//                 <button 
//                     onClick={waitCompleted} 
//                     className="bg-gray-500 text-white px-4 py-2 rounded mt-3"
//                 >
//                     ⏳ Update Status
//                 </button>
//             )}

//             <h3 className="text-xl font-bold mt-6 text-gray-800">📄 Uploaded Documents</h3>
//             <div className="grid grid-cols-2 gap-4">
//                 {application.documents &&
//                     Object.entries(application.documents).map(([key, value]) => (
//                         <div key={key} className="border p-2 rounded bg-white shadow-sm">
//                             <p className="font-semibold">{key.replace(/([A-Z])/g, " $1")}</p>
//                             {value ? (
//                                 <>
//                                     <img 
//                                         src={value} 
//                                         alt={key} 
//                                         className="w-full h-32 object-cover rounded cursor-pointer"
//                                         onClick={() => setSelectedImage(value)} 
//                                     />
//                                     <button 
//                                         className="bg-blue-500 text-white px-2 py-1 rounded mt-2 w-full"
//                                         onClick={() => setSelectedImage(value)}
//                                     >
//                                         🔍 View Full Image
//                                     </button>
//                                 </>
//                             ) : (
//                                 <p className="text-red-500">⚠️ Image not available</p>
//                             )}
//                         </div>
//                     ))}
//             </div>

//             {selectedImage && (
//                 <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
//                     <div className="relative bg-white p-4 rounded-lg shadow-lg max-w-4xl">
//                         <button 
//                             className="absolute top-2 right-2 bg-gray-800 text-white px-2 py-1 rounded-full"
//                             onClick={() => setSelectedImage(null)}
//                         >
//                             ❌
//                         </button>
//                         <img src={selectedImage} alt="Full Size" className="max-w-full max-h-[80vh] mx-auto" />
//                     </div>
//                 </div>
//             )}

//             {/* 🧠 AI-Powered Aadhaar Verification Section */}
//             <div className="mt-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 rounded-lg">
//                 <h3 className="text-lg font-semibold text-yellow-800">🧠 AI-Powered Aadhaar Verification</h3>
//                 <AadhaarUpload aadhaarImageUrl={application.documents?.aadharCard} />
//             </div>
//         </div>
//     );
// }

// export default ApplicationDetails;
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import AadhaarUpload from "../../components/AadhaarUpload";

// function ApplicationDetails() {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [application, setApplication] = useState(null);
//     const [inspectionData, setInspectionData] = useState(null);
//     const [status, setStatus] = useState("");
//     const [remark, setRemark] = useState("");
//     const [selectedImage, setSelectedImage] = useState(null);

//     useEffect(() => {
//         const fetchApplication = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:5000/api/application/${id}`);
//                 if (response.data.inspectionStatus !== false) {
//                     const responseInspection = await axios.get(`http://localhost:5000/api/inspection/${id}`);
//                     setInspectionData(responseInspection.data);
//                 } else {
//                     setInspectionData("⚠️ Waiting for Inspection Officer's validation...");
//                 }
//                 setApplication(response.data);
//                 setStatus(response.data.status || "Pending");
//             } catch (error) {
//                 console.error("Error fetching application details", error);
//             }
//         };
//         fetchApplication();
//     }, [id]);

//     const handleStatusChange = async () => {
//         if (!remark.trim()) {
//             alert("⚠️ Please provide a remark before submitting.");
//             return;
//         }
//         try {
//             await axios.put(`http://localhost:5000/api/application/${id}/status`, { status, remark });
//             alert("✅ Status and remark updated successfully");
//             setRemark("");
//         } catch (error) {
//             console.error("Error updating status", error);
//         }
//     };

//     const handleCheckInspection = () => {
//         navigate(`/inspection/${id}`);
//     };

//     if (!application) {
//         return <p className="text-center text-lg font-semibold">⏳ Loading application details...</p>;
//     }

//     return (
//         <div className="p-6 max-w-5xl mx-auto bg-white rounded-lg shadow-md border border-gray-200">
//             <h2 className="text-3xl font-semibold text-gray-800 mb-6">📜 Application Details</h2>
//             <div className="grid grid-cols-2 gap-6">
//                 <div>
//                     <p><strong>👤 Owner Name:</strong> {application.ownerName}</p>
//                     <p><strong>🏢 Business Name:</strong> {application.businessName}</p>
//                     <p><strong>✉️ Email:</strong> {application.email}</p>
//                     <p><strong>📞 Contact:</strong> {application.contact}</p>
//                     <p><strong>📍 Address:</strong> {application.address}</p>
//                 </div>
//                 <div>
//                     <p><strong>🔹 Status:</strong> <span className={`font-bold ${status === 'Approved' ? 'text-green-600' : status === 'Rejected' ? 'text-red-600' : 'text-yellow-600'}`}>{application.status}</span></p>
//                     <h3 className="text-xl font-semibold text-gray-800 mt-4">🏗️ Building Details</h3>
//                     <p><strong>📏 Total Area:</strong> {application.buildingDetails.totalArea}</p>
//                     <p><strong>🏢 Floors:</strong> {application.buildingDetails.numFloors}</p>
//                     <p><strong>⚖️ Occupancy Type:</strong> {application.buildingDetails.occupancyType}</p>
//                     <p><strong>📏 Height:</strong> {application.buildingDetails.height}</p>
//                 </div>
//             </div>

//             <h3 className="text-xl font-semibold text-gray-800 mt-6">🔥 Fire Safety Measures</h3>
//             <ul className="list-disc list-inside text-green-600">
//                 {application.fireSafetyMeasures.map((measure, index) => (
//                     <li key={index}>✅ {measure}</li>
//                 ))}
//             </ul>

//             <h3 className="text-xl font-semibold text-gray-800 mt-6">📋 Inspection Status</h3>
//             <div className="p-3 bg-gray-100 rounded-md shadow-sm">{inspectionData.status || inspectionData}</div>

//             {inspectionData.status === "pending" && (
//                 <button 
//                     onClick={handleCheckInspection} 
//                     className="bg-blue-600 text-white px-4 py-2 rounded mt-3 hover:bg-blue-700 transition"
//                 >
//                     🏢 Approve Inspection Now
//                 </button>
//             )}

//             <h3 className="text-xl font-semibold text-gray-800 mt-6">🔄 Update Status</h3>
//             <select 
//                 value={status} 
//                 onChange={(e) => setStatus(e.target.value)} 
//                 className="border p-2 rounded w-full mt-2"
//             >
//                 <option value="Pending">⏳ Pending</option>
//                 <option value="Approved">✅ Approved</option>
//                 <option value="Rejected">❌ Rejected</option>
//             </select>
//             <textarea
//                 placeholder="✍️ Add remarks before submitting"
//                 className="w-full p-2 border mt-3 rounded"
//                 value={remark}
//                 onChange={(e) => setRemark(e.target.value)}
//             ></textarea>
//             <button 
//                 onClick={handleStatusChange} 
//                 className={`mt-3 px-4 py-2 rounded text-white transition ${inspectionData.status === 'completed' ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'}`}
//                 disabled={inspectionData.status !== 'completed'}
//             >
//                 ✅ Update Status
//             </button>

//             <h3 className="text-xl font-semibold text-gray-800 mt-6">📄 Uploaded Documents</h3>
//             <div className="grid grid-cols-2 gap-4">
//                 {application.documents && Object.entries(application.documents).map(([key, value]) => (
//                     <div key={key} className="border p-2 rounded bg-white shadow-sm">
//                         <p className="font-semibold">{key.replace(/([A-Z])/g, " $1")}</p>
//                         {value ? (
//                             <img 
//                                 src={value} 
//                                 alt={key} 
//                                 className="w-full h-32 object-cover rounded cursor-pointer"
//                                 onClick={() => setSelectedImage(value)} 
//                             />
//                         ) : (
//                             <p className="text-red-500">⚠️ Image not available</p>
//                         )}
//                     </div>
//                 ))}
//             </div>

//             {selectedImage && (
//                 <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
//                     <div className="relative bg-white p-4 rounded-lg shadow-lg max-w-4xl">
//                         <button 
//                             className="absolute top-2 right-2 bg-gray-800 text-white px-2 py-1 rounded-full"
//                             onClick={() => setSelectedImage(null)}
//                         >❌</button>
//                         <img src={selectedImage} alt="Full Size" className="max-w-full max-h-[80vh] mx-auto" />
//                     </div>
//                 </div>
//             )}

//             <div className="mt-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 rounded-lg">
//                 <h3 className="text-lg font-semibold text-yellow-800">🧠 AI-Powered Aadhaar Verification</h3>
//                 <AadhaarUpload aadhaarImageUrl={application.documents?.aadharCard} />
//             </div>
//         </div>
//     );
// }

// export default ApplicationDetails;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AadhaarUpload from "../../components/AadhaarUpload";

function ApplicationDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [application, setApplication] = useState(null);
    const [inspectionData, setInspectionData] = useState(null);
    const [status, setStatus] = useState("");
    const [remark, setRemark] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchApplication = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/application/${id}`);
                if (response.data.inspectionStatus !== false) {
                    const responseInspection = await axios.get(`http://localhost:5000/api/inspection/${id}`);
                    setInspectionData(responseInspection.data);
                } else {
                    setInspectionData("⚠️ Waiting for Inspection Officer's validation...");
                }
                setApplication(response.data);
                setStatus(response.data.status || "Pending");
            } catch (error) {
                console.error("Error fetching application details", error);
            }
        };
        fetchApplication();
    }, [id]);

    const handleStatusChange = async () => {
        if (!remark.trim()) {
            alert("⚠️ Please provide a remark before submitting.");
            return;
        }
        try {
            await axios.put(`http://localhost:5000/api/application/${id}/status`, { status, remark });
            alert("✅ Status and remark updated successfully");
            setRemark("");
        } catch (error) {
            console.error("Error updating status", error);
        }
    };

    const handleCheckInspection = () => {
        navigate(`/inspection/${id}`);
    };

    if (!application) {
        return <p className="text-center text-lg font-semibold">⏳ Loading application details...</p>;
    }

    return (
        <div className="p-6 max-w-5xl mx-auto bg-white rounded-lg shadow-md border border-gray-200 space-y-6">
            {/* Application Header */}
            <h2 className="text-3xl font-semibold text-gray-800">📜 Application Details</h2>
            
            {/* Application Info */}
            <div className="grid grid-cols-2 gap-6 p-4 bg-gray-100 rounded-md shadow-sm">
                <div>
                    <p><strong>👤 Owner Name:</strong> {application.ownerName}</p>
                    <p><strong>🏢 Business Name:</strong> {application.businessName}</p>
                    <p><strong>✉️ Email:</strong> {application.email}</p>
                    <p><strong>📞 Contact:</strong> {application.contact}</p>
                    <p><strong>📍 Address:</strong> {application.address}</p>
                </div>
                <div>
                    <p><strong>🔹 Status:</strong> <span className={`font-bold ${status === 'Approved' ? 'text-green-600' : status === 'Rejected' ? 'text-red-600' : 'text-yellow-600'}`}>{application.status}</span></p>
                    <h3 className="text-xl font-semibold text-gray-800 mt-4">🏗️ Building Details</h3>
                    <p><strong>📏 Total Area:</strong> {application.buildingDetails.totalArea}</p>
                    <p><strong>🏢 Floors:</strong> {application.buildingDetails.numFloors}</p>
                    <p><strong>⚖️ Occupancy Type:</strong> {application.buildingDetails.occupancyType}</p>
                    <p><strong>📏 Height:</strong> {application.buildingDetails.height}</p>
                </div>
            </div>

            {/* Fire Safety Measures */}
            <div className="p-4 bg-green-100 rounded-md shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800">🔥 Fire Safety Measures</h3>
                <ul className="list-disc list-inside text-green-600">
                    {application.fireSafetyMeasures.map((measure, index) => (
                        <li key={index}>✅ {measure}</li>
                    ))}
                </ul>
            </div>

            {/* Inspection Status */}
            <div className="p-4 bg-gray-100 rounded-md shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800">📋 Inspection Status</h3>
                <p>{inspectionData.status || inspectionData}</p>
                {(inspectionData.status === "pending" || inspectionData.status === "rescheduled" || inspectionData==="Wait, application is not validated by the Inspection Officer") && (
                    <button onClick={handleCheckInspection} className="bg-blue-600 text-white px-4 py-2 rounded mt-3 hover:bg-blue-700 transition">
                        🏢 Approve Inspection Now
                    </button>
                )}
            </div>

            {/* Status Update */}
            <div className="p-4 bg-yellow-100 rounded-md shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800">🔄 Update Status</h3>
                <select value={status} onChange={(e) => setStatus(e.target.value)} className="border p-2 rounded w-full mt-2">
                    <option value="Pending">⏳ Pending</option>
                    <option value="Approved">✅ Approved</option>
                    <option value="Rejected">❌ Rejected</option>
                </select>
                <textarea placeholder="✍️ Add remarks before submitting" className="w-full p-2 border mt-3 rounded" value={remark} onChange={(e) => setRemark(e.target.value)}></textarea>
                <button onClick={handleStatusChange} className={`mt-3 px-4 py-2 rounded text-white transition ${inspectionData.status === 'completed' ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'}`} disabled={inspectionData.status !== 'completed'}>
                    ✅ Update Status
                </button>
            </div>

            {/* Aadhaar Verification */}
            <div className="p-4 bg-yellow-100 border-l-4 border-yellow-500 rounded-lg">
                <h3 className="text-4xl font-semibold text-yellow-800">🧠 AI-Powered Aadhaar Verification</h3>
                <AadhaarUpload aadhaarImageUrl={application.documents?.aadharCard} />
            </div>

            {/* Uploaded Documents */}
            {/* <div className="p-4 bg-white rounded-md shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800">📄 Uploaded Documents</h3>
                <div className="grid grid-cols-2 gap-4">
                    {application.documents && Object.entries(application.documents).map(([key, value]) => (
                        <div key={key} className="border p-2 rounded bg-white shadow-sm">
                            <p className="font-semibold">{key.replace(/([A-Z])/g, " $1")}</p>
                            {value ? (
                                <img src={value} alt={key} className="w-full h-32 object-cover rounded cursor-pointer" onClick={() => setSelectedImage(value)} />
                            ) : (
                                <p className="text-red-500">⚠️ Image not available</p>
                            )}
                        </div>
                    ))}
                </div>
            </div> */}
            <div className="p-4 bg-white rounded-md shadow-sm">
    <h3 className="text-xl font-semibold text-gray-800">📄 Uploaded Documents</h3>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {application.documents && Object.entries(application.documents).map(([key, value]) => (
            <div key={key} className="border p-3 rounded-lg bg-white shadow-md">
                <p className="font-semibold text-gray-700">{key.replace(/([A-Z])/g, " $1")}</p>
                {value ? (
                    <div className="relative group">
                        <img
                            src={value}
                            alt={key}
                            className="w-full h-32 object-cover rounded-md cursor-pointer transition-transform duration-200 hover:scale-105"
                        />
                        <button
                            onClick={() => setSelectedImage(value)}
                            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        >
                            🔍 View
                        </button>
                    </div>
                ) : (
                    <p className="text-red-500">⚠️ Image not available</p>
                )}
            </div>
        ))}
    </div>

    {selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
            <div className="relative bg-white p-4 rounded-lg shadow-lg max-w-4xl">
                <button
                    className="absolute top-2 right-2 bg-gray-800 text-white px-3 py-1 rounded-full text-lg"
                    onClick={() => setSelectedImage(null)}
                >❌</button>
                <img src={selectedImage} alt="Full Size" className="max-w-full max-h-[80vh] mx-auto rounded-md" />
            </div>
        </div>
    )}
</div>


            
        </div>
    );
}

export default ApplicationDetails;
