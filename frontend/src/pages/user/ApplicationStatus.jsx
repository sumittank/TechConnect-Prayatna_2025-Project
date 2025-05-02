import React, { useEffect, useState } from "react";
import axios from "axios";

function ApplicationStatus() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userEmail = localStorage.getItem("email"); 

  useEffect(() => {
    const fetchApplications = async () => {
      if (!userEmail) {
        setError("User email not found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/applications?email=${userEmail}`);
        setApplications(response.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
        setError("Failed to load applications.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []); 

  const formatDateTime = (isoString) => {
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

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Your Applications</h2>

      {loading && <p className="text-gray-600">Loading applications...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && applications.length === 0 && (
        <p className="text-gray-600">No applications found.</p>
      )}

      {!loading && applications.length > 0 && (
        <ul className="space-y-4">
          {[...applications].reverse().map((app) => (
            <li key={app._id} className="p-4 border rounded-lg">
              <p><strong>Application ID:</strong> {app._id}</p>
              <p><strong>Business Name:</strong> {app.businessName}</p>
              <p><strong>Owner Name:</strong> {app.ownerName}</p>
              <p><strong>Status:</strong> {app.status || "Pending"}</p>
              <p><small><strong>Time & Date: </strong>{formatDateTime(app.submittedAt)}</small> </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ApplicationStatus;
