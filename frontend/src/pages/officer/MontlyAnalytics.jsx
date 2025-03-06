// import React from 'react'

// function MontlyAnalytics() {
//   return (
//     <div>
//       hi MontlyAnalytics
//     </div>
//   )
// }

// export default MontlyAnalytics


// import React, { useEffect, useState } from "react";

// function MontlyAnalytics() {
//   const [analytics, setAnalytics] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAnalytics = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/analytics/monthly");
//         if (!response.ok) throw new Error("Failed to fetch analytics");
//         const data = await response.json();
//         setAnalytics(data);
//       } catch (error) {
//         console.error("Error fetching analytics:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAnalytics();
//   }, []);

//   if (loading) return <div>Loading analytics...</div>;

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
//       <h2 style={{ textAlign: "center" }}>📊 Monthly Analytics</h2>
//       {analytics ? (
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "15px", marginTop: "20px" }}>
//           <div style={cardStyle}>Total Inspections: {analytics.totalInspections}</div>
//           <div style={cardStyle}>Completed Inspections: {analytics.completedInspections}</div>
//           <div style={cardStyle}>Pending Inspections: {analytics.pendingInspections}</div>
//           <div style={cardStyle}>Total Follow-Ups: {analytics.totalFollowUps}</div>
//           <div style={cardStyle}>Approved NOCs: {analytics.totalApprovedNOCs}</div>
//         </div>
//       ) : (
//         <p style={{ textAlign: "center", color: "red" }}>Error loading data</p>
//       )}{console.log(analytics)}
//     </div>
    
//   );
// }

// const cardStyle = {
//   padding: "15px",
//   borderRadius: "8px",
//   backgroundColor: "#f4f4f4",
//   textAlign: "center",
//   fontWeight: "bold",
//   boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
// };

// export default MontlyAnalytics;



// import React, { useEffect, useState } from "react";
// import { Bar, Pie } from "react-chartjs-2";
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// const AnalyticsDashboard = () => {
//   const [analytics, setAnalytics] = useState(null);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/analytics/monthly") // Adjust API route as needed
//       .then((response) => response.json())
//       .then((data) => setAnalytics(data))
//       .catch((error) => console.error("Error fetching analytics:", error));
//   }, []);
//   console.log(analytics)
//   if (!analytics) return <p>Loading analytics...</p>;

//   // Data for Inspections Chart
//   const inspectionsData = {
//     labels: ["Total Inspections", "Completed", "Pending"],
//     datasets: [
//       {
//         label: "Inspections",
//         data: [analytics.totalInspections, analytics.completedInspections, analytics.pendingInspections],
//         backgroundColor: ["#36A2EB", "#4CAF50", "#FF9800"],
//       },
//     ],
//   };

//   // Data for Risk Score Distribution Chart
//   const riskScoreData = {
//     labels: analytics.riskScoreDistribution.map((item) => item._id),
//     datasets: [
//       {
//         label: "Risk Score",
//         data: analytics.riskScoreDistribution.map((item) => item.count),
//         backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#8E44AD"],
//       },
//     ],
//   };

//   // Data for Fire Safety Measures Chart
//   const fireSafetyData = {
//     labels: analytics.fireSafetyMeasures.map((item) => item._id),
//     datasets: [
//       {
//         label: "Fire Safety Measures",
//         data: analytics.fireSafetyMeasures.map((item) => item.count),
//         backgroundColor: "#FF5733",
//       },
//     ],
//   };

//   // Data for Nearest Fire Station Distribution
//   const fireStationData = {
//     labels: analytics.nearestFireStationData.map((item) => item._id),
//     datasets: [
//       {
//         label: "Nearest Fire Stations",
//         data: analytics.nearestFireStationData.map((item) => item.count),
//         backgroundColor: ["#FF4500", "#008080", "#32CD32", "#FFD700"],
//       },
//     ],
//   };

//   return (
//     <div>
//       <h2>Fire Department Analytics</h2>
//       <div style={{ width: "60%", margin: "auto" }}>
//         <h3>Inspection Statistics</h3>
//         <Bar data={inspectionsData} />
//       </div>
//       <div style={{ width: "40%", margin: "auto" }}>
//         <h3>Risk Score Distribution</h3>
//         <Pie data={riskScoreData} />
//       </div>
//       <div style={{ width: "60%", margin: "auto" }}>
//         <h3>Fire Safety Measures Count</h3>
//         <Bar data={fireSafetyData} />
//       </div>
//       <div style={{ width: "40%", margin: "auto" }}>
//         <h3>Nearest Fire Station Distribution</h3>
//         <Pie data={fireStationData} />
//       </div>
//       <h3>Total Approved NOCs: {analytics.totalApprovedNOCs}</h3>
//     </div>
//   );
// };

// export default AnalyticsDashboard;



import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/analytics/monthly")
      .then((response) => response.json())
      .then((data) => setAnalytics(data))
      .catch((error) => console.error("Error fetching analytics:", error));
  }, []);

  if (!analytics) return <p className="text-center text-gray-600">Loading analytics...</p>;

  const inspectionsData = {
    labels: ["Total Inspections", "Completed", "Pending"],
    datasets: [
      {
        label: "Inspections",
        data: [analytics.totalInspections, analytics.completedInspections, analytics.pendingInspections],
        backgroundColor: ["#36A2EB", "#4CAF50", "#FF9800"],
      },
    ],
  };

  const riskScoreData = {
    labels: analytics.riskScoreDistribution.map((item) => item._id),
    datasets: [
      {
        label: "Risk Score",
        data: analytics.riskScoreDistribution.map((item) => item.count),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#8E44AD"],
      },
    ],
  };

  const fireSafetyData = {
    labels: analytics.fireSafetyMeasures.map((item) => item._id),
    datasets: [
      {
        label: "Fire Safety Measures",
        data: analytics.fireSafetyMeasures.map((item) => item.count),
        backgroundColor: "#FF5733",
      },
    ],
  };

  const fireStationData = {
    labels: analytics.nearestFireStationData.map((item) => item._id),
    datasets: [
      {
        label: "Nearest Fire Stations",
        data: analytics.nearestFireStationData.map((item) => item.count),
        backgroundColor: ["#FF4500", "#008080", "#32CD32", "#FFD700"],
      },
    ],
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Fire Department Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Inspections Chart */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Inspection Statistics</h3>
          <Bar data={inspectionsData} />
        </div>

        {/* Risk Score Distribution */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Risk Score Distribution</h3>
          <div className="w-[30rem] h-[30rem]">
          <Pie data={riskScoreData} />
          </div>
        </div>

        {/* Fire Safety Measures */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Fire Safety Measures Count</h3>
          <Bar data={fireSafetyData} />
        </div>

        {/* Nearest Fire Station */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Nearest Fire Station Distribution</h3>
          <div className="w-[30rem] h-[30rem]">
          <Pie data={fireStationData} />
          </div>
          
        </div>
      </div>

      {/* Total Approved NOCs */}
      <div className="mt-8 text-center">
        <h3 className="text-3xl font-bold text-gray-700">
          Total Approved NOCs: <span className="text-green-600">{analytics.totalApprovedNOCs}</span>
        </h3>
      </div>
    </div>
  );

  
};

export default AnalyticsDashboard;
