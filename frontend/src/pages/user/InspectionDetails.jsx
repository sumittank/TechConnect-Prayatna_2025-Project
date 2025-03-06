import React, { useEffect, useState } from "react";

function InspectionDetails() {
  const [inspections, setInspections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInspections = async () => {
      try {
        // Step 1: Get email from localStorage
        const email = localStorage.getItem("email");
        if (!email) {
          setError("User email not found. Please log in.");
          setLoading(false);
          return;
        }

        // Step 2: Fetch inspection details from backend
        const response = await fetch(`http://localhost:5000/api/inspection/user/inspections?email=${email}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch inspections");
        }

        // Step 3: Set fetched inspections to state
        setInspections(data.inspections);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInspections();
  }, []);

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) { // Ensure case insensitivity
      case "completed":
        return "bg-green-500 text-white px-3 py-1 rounded-md "; // Softer green
      case "rescheduled":
        return "bg-yellow-500 text-black px-3 py-1 rounded-md"; // Bright yellow for warning
      case "pending":
        return "bg-blue-500 text-white px-3 py-1 rounded-md "; // Softer blue
      case "rejected":
        return "bg-red-500 text-white px-3 py-1 rounded-md "; // Softer red
      case "in progress":
        return "bg-purple-500 text-white px-3 py-1 rounded-md "; // Purple for active status
      default:
        return "bg-gray-400 text-black px-3 py-1 rounded-md "; // Gray for unknown status
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Inspection Details</h2>

      {loading && <p className="text-gray-500">Loading inspections...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && inspections.length === 0 && (
        <p className="text-gray-500">No inspections found.</p>
      )}

      {!loading && !error && inspections.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4 border">Application ID</th>
                <th className="py-2 px-4 border">Requires Inspection</th>
                <th className="py-2 px-4 border">Inspector</th>
                <th className="py-2 px-4 border">Remark</th>
                <th className="py-2 px-4 border">Date</th>
                <th className="py-2 px-4 border">Time</th>
                <th className="py-2 px-4 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {inspections.map((inspection) => (
                <tr key={inspection._id} className="border-b text-gray-700">
                  <td className="py-2 px-4 border">{inspection.applicationId}</td>
                  <td className="py-2 px-4 border">
                    {inspection.requiresInspection ? "Yes" : "No"}
                  </td>
                  <td className="py-2 px-4 border">
                    {inspection.inspector || "Not assigned"}
                  </td>
                  <td className="py-2 px-4 border">{inspection.reason || "N/A"}</td>
                  <td className="py-2 px-4 border">{inspection.date || "N/A"}</td>
                  <td className="py-2 px-4 border">{inspection.time || "N/A"}</td>
                  <td className="py-2 px-4 border">
                    <span className={`${getStatusClass(inspection.status)} inline-block w-full text-center`}>
                      {inspection.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default InspectionDetails;