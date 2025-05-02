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
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/analytics/monthly`)
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

        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Inspection Statistics</h3>
          <Bar data={inspectionsData} />
        </div>


        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Risk Score Distribution</h3>
          <div className="w-[30rem] h-[30rem]">
          <Pie data={riskScoreData} />
          </div>
        </div>


        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Fire Safety Measures Count</h3>
          <Bar data={fireSafetyData} />
        </div>

        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Nearest Fire Station Distribution</h3>
          <div className="w-[30rem] h-[30rem]">
          <Pie data={fireStationData} />
          </div>
          
        </div>
      </div>


      <div className="mt-8 text-center">
        <h3 className="text-3xl font-bold text-gray-700">
          Total Approved NOCs: <span className="text-green-600">{analytics.totalApprovedNOCs}</span>
        </h3>
      </div>
    </div>
  );

  
};

export default AnalyticsDashboard;
