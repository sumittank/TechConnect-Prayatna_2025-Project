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
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/application/${id}`);
                if (response.data.inspectionStatus !== false) {
                    const responseInspection = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/inspection/${id}`);
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
            await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/application/${id}/status`, { status, remark });
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
