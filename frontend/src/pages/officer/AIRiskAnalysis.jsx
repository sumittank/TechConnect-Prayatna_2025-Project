// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function ApplicationsList() {
//   const [applications, setApplications] = useState([]);
//   const [predictions, setPredictions] = useState({});

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/all-applications") // Fetch from Express backend
//       .then((response) => setApplications(response.data))
//       .catch((error) => console.error("Error fetching applications:", error));
//   }, []);

//   const preprocessData = (application) => {
//     return {
//       totalArea: Number(application.buildingDetails.totalArea),
//       numFloors: Number(application.buildingDetails.numFloors),
//       occupancyType: application.buildingDetails.occupancyType === "Residential" ? 1
//         : application.buildingDetails.occupancyType === "Commercial" ? 2
//         : 3, // Industrial
//       height: Number(application.buildingDetails.height),
//       fireSafetyMeasures: application.fireSafetyMeasures.length,
//       waterStorage: application.waterStorage === "Fire Hydrants" ? 1
//         : application.waterStorage === "Water Tank" ? 2
//         : 3, // None
//       nearestFireStation: application.nearestFireStation === "0-2Km" ? 1
//         : application.nearestFireStation === "2-5Km" ? 2
//         : application.nearestFireStation === "5-10Km" ? 3
//         : 4, // More than 10Km
//     };
//   };

//   const predictRiskScore = async (applicationId) => {
//     const appData = applications.find(app => app._id === applicationId);
//     if (!appData) return;

//     const formattedData = preprocessData(appData);
//     console.log(formattedData)
    
//     try {
//       const response = await axios.post("http://localhost:5000/api/predict-risk", formattedData);
//       setPredictions((prev) => ({ ...prev, [applicationId]: response.data.riskScore }));
//     } catch (error) {
//       console.error("Error predicting risk score:", error);
//     }
//   };

//   return (
//     <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-4">Fire NOC Applications</h2>
//       <table className="w-full border-collapse border border-gray-300">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border p-2">Application Id</th>
//             <th className="border p-2">Owner Name</th>
//             <th className="border p-2">Business</th>
//             <th className="border p-2">Occupancy Type</th>
//             <th className="border p-2">NOC Status</th>
//             <th className="border p-2">Inspection Status</th>
//             <th className="border p-2">Risk Score</th>
//             <th className="border p-2">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {[...applications].reverse().map((app) => (
//             <tr key={app._id} className="border">
//               <td className="border p-2">{app._id}</td> 
//               <td className="border p-2">{app.ownerName}</td>
//               <td className="border p-2">{app.businessName}</td>
//               <td className="border p-2">{app.buildingDetails.occupancyType}</td>
//               <td className="border p-2">{app.status}</td>
//               <td className="border p-2">{app.inspectionStatus === false ? "Not Inspect" : "On Inspect"}</td>
//               <td className="border p-2">
//                 {predictions[app._id] !== undefined ? predictions[app._id] : "Not Predicted"}
//               </td>
//               <td className="border p-2">
//                 <button 
//                   className="bg-blue-500 text-white p-2 rounded" 
//                   onClick={() => predictRiskScore(app._id)}
//                 >
//                   Predict Risk Score
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default ApplicationsList;


 
import React, { useEffect, useState } from "react";
import axios from "axios";

function AIRiskAnalysis() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/all-applications")
      .then((response) => setApplications(response.data))
      .catch((error) => console.error("Error fetching applications:", error));
  }, []);

  const preprocessData = (application) => {
    return {
      totalArea: Number(application.buildingDetails.totalArea),
      numFloors: Number(application.buildingDetails.numFloors),
      occupancyType: application.buildingDetails.occupancyType === "Residential" ? 1
        : application.buildingDetails.occupancyType === "Commercial" ? 2
        : 3, // Industrial
      height: Number(application.buildingDetails.height),
      fireSafetyMeasures: application.fireSafetyMeasures.length,
      waterStorage: application.waterStorage === "Fire Hydrants" ? 1
        : application.waterStorage === "Water Tank" ? 2
        : 3, // None
      nearestFireStation: application.nearestFireStation === "0-2Km" ? 1
        : application.nearestFireStation === "2-5Km" ? 2
        : application.nearestFireStation === "5-10Km" ? 3
        : 4, // More than 10Km
    };
  };

  const predictRiskScore = async (applicationId) => {
    const appData = applications.find(app => app._id === applicationId);
    if (!appData) return;

    const formattedData = preprocessData(appData);
    
    try {
      const response = await axios.post("http://localhost:5000/api/predict-risk", {
        applicationId: appData._id,
        riskScore: Math.floor(Math.random() * 100) + 1, // Simulating AI Prediction
      });

      setApplications((prevApps) => 
        prevApps.map((app) => 
          app._id === applicationId ? { ...app, riskScore: response.data.riskScore } : app
        )
      );
    } catch (error) {
      console.error("Error predicting risk score:", error);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">AI Risk Analysis & Fire NOC Applications</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Application Id</th>
            <th className="border p-2">Owner Name</th>
            <th className="border p-2">Business</th>
            <th className="border p-2">Occupancy Type</th>
            <th className="border p-2">NOC Status</th>
            <th className="border p-2">Inspection Status</th>
            <th className="border p-2">Risk Score</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {[...applications].reverse().map((app) => (
            <tr key={app._id} className="border">
              <td className="border p-2">{app._id}</td> 
              <td className="border p-2">{app.ownerName}</td>
              <td className="border p-2">{app.businessName}</td>
              <td className="border p-2">{app.buildingDetails.occupancyType}</td>
              <td className="border p-2">{app.status}</td>
              <td className="border p-2">{app.inspectionStatus === false ? "Not Inspected" : "On Inspection"}</td>
              <td className="border p-2">{app.riskScore || "Not Predicted"}</td>
              <td className="border p-2">
                {app.riskScore === 'Not Predicted' ?
                <button 
                className="bg-blue-500 text-white p-2 rounded" 
                onClick={() => predictRiskScore(app._id)}
              >
                Predict Risk Score
              </button> :
              <button 
              className="bg-gray-500 text-white p-2 rounded" 
              onClick={() => alert("Score is already predicted !! ")}
            >
              Predict Risk Score
            </button>

            }
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AIRiskAnalysis;

