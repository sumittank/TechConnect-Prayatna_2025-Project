import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function InspectionApproval() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [inspectionNeeded, setInspectionNeeded] = useState(false);
  const [noInspection, setNoInspection] = useState(false);
  const [reason, setReason] = useState("");
  const [inspector, setInspector] = useState("");
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const fetchInspectionData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/inspection/${id}`);
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
        await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/application/${id}`, {
            inspectionStatus: true
        });

        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/inspection`, {
            applicationId: id,
            requiresInspection: inspectionNeeded,
            reason,
            inspector,
            date: dateTime.split("T")[0], 
            time: dateTime.split("T")[1],
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
