import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar";

function HomeAdmin() {
  const [stats, setStats] = useState({ totalUsers: 0, totalApplications: 0, totalInspections: 0, totalNocs: 0 });
  const [searchResults, setSearchResults] = useState([]); 
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const showEmail = { email: localStorage.getItem("email") || "admin@example.com" };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/dashboard/stats`);
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto text-center bg-white rounded-lg shadow-lg p-6">
        <h1 className="mt-12 text-4xl font-extrabold text-center text-gray-900 border-b-4 border-red-500 inline-block mx-auto">
  həˈlō Admin  
</h1>

        <p className="text-center mt-2 text-gray-600">{showEmail.email}</p>

        {loading && <p className="text-center">Loading data...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 mt-8">
            <DashboardCard title="Total Users" count={stats.totalUsers} bgColor="bg-green-200" textColor="text-green-800" buttonColor="bg-green-600" onClick={() => navigate('/all-users')} />
            <DashboardCard title="Total Applications" count={stats.totalApplications} bgColor="bg-blue-200" textColor="text-blue-800" buttonColor="bg-blue-600" onClick={() => navigate('/all-applications')} />
            <DashboardCard title="Total Inspections" count={stats.totalInspections} bgColor="bg-yellow-200" textColor="text-yellow-800" buttonColor="bg-yellow-600" onClick={() => navigate('/inspection-schedule')} />
            <DashboardCard title="Total NOCs Generated" count={stats.totalNocs} bgColor="bg-purple-200" textColor="text-purple-800" buttonColor="bg-purple-600" onClick={() => navigate('/approved-applications')} />
          </div>
        )}

        {/* Search Bar */}
        <SearchBar onSearch={setSearchResults} />

        <span className="text-2xl font-bold text-center">Display Search Results</span>
        {/* Display Search Results */}
<div className="mt-6 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
  {searchResults.length > 0 ? (
    <ul className="divide-y divide-gray-300">
      {searchResults.map((result, index) => (
        <li
          key={index}
          className="py-3 flex justify-between items-center hover:bg-gray-100 transition duration-200 px-4 rounded-lg"
        >
          <div>
            <span className="block text-lg font-semibold text-gray-800">
              {result.type === "User"
                ? result.name
                : result.ownerName + " - " + result.businessName}
            </span>
            <span className="block text-sm text-gray-600">
              {result.email}
            </span>
          </div>
          <span
            className={`text-xs font-medium px-3 py-1 rounded-full ${
              result.type === "User"
                ? "bg-blue-100 text-blue-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {result.type}
          </span>
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-center text-gray-500 text-lg">No results found.</p>
  )}
</div>

      </div>
    </div>
  );
}

const DashboardCard = ({ title, count, bgColor, textColor, buttonColor, onClick }) => {
  return (
    <div className={`${bgColor} p-6 rounded-lg shadow-md text-center hover:scale-105 transform transition duration-300`}> 
      <p className="text-lg font-semibold">{title}</p>
      <p className={`text-3xl font-bold ${textColor}`}>{count}</p>
    </div>
  );
};

export default HomeAdmin;

