// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// function HomeOfficer() {
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalApplications: 0,
//     totalInspections: 0,
//     totalNocs: 0,
//   });

//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const showEmail = { email: localStorage.getItem("email") || "admin@example.com" };

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/dashboard/stats");
//         if (!response.ok) throw new Error("Failed to fetch data");

//         const data = await response.json();
//         setStats(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, []);

//   const handleClick = (type) => {
//     alert(`Viewing details for: ${type}`);
//   };

//   return (
//     <>
//     <div className="p-6 bg-white rounded-lg shadow-lg">
//       <h1 className="mt-12 text-3xl font-bold text-center text-red-600">həˈlō Officer</h1>
//       <p className="text-center mb-12 text-gray-500">{showEmail.email}</p>

//       {loading && <p className="text-center">Loading data...</p>}
//       {error && <p className="text-center text-red-600">{error}</p>}

//       {!loading && !error && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 px-48">
//           <DashboardCard
//             title="Total Users"
//             count={stats.totalUsers}
//             bgColor="bg-green-100"
//             textColor="text-green-700"
//             buttonColor="bg-green-600 hover:bg-green-700"
//             onClick={()=>navigate('/all-users')}
//           />

//           <DashboardCard
//             title="Total Applications"
//             count={stats.totalApplications}
//             bgColor="bg-blue-100"
//             textColor="text-blue-700"
//             buttonColor="bg-blue-600 hover:bg-blue-700"
//             onClick={()=>navigate('/all-applications')}
//           />

//           <DashboardCard
//             title="Total Inspections"
//             count={stats.totalInspections}
//             bgColor="bg-yellow-100"
//             textColor="text-yellow-700"
//             buttonColor="bg-yellow-600 hover:bg-yellow-700"
//             onClick={()=>navigate('/inspection-schedule')}
//           />

//           <DashboardCard
//             title="Total NOCs Generated"
//             count={stats.totalNocs}
//             bgColor="bg-purple-100"
//             textColor="text-purple-700"
//             buttonColor="bg-purple-600 hover:bg-purple-700"
//             onClick={()=>navigate('/approved-applications')}
//           />
//         </div>
//       )}
//     </div>
//     </>
//   );
// }

// const DashboardCard = ({ title, count, bgColor, textColor, buttonColor, onClick }) => {
//   return (
//     <div className={`${bgColor} p-4 rounded-lg shadow-md text-center hover:scale-105 transform transition duration-300`}>
//       <p className="text-lg font-semibold">{title}</p>
//       <p className={`text-2xl font-bold ${textColor}`}>{count}</p>
//       <button className={`mt-4 px-4 py-2 text-white rounded-lg shadow ${buttonColor}`} onClick={onClick}>
//         View
//       </button>
//     </div>
//   );
// };

// export default HomeOfficer;





// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// function HomeOfficer() {
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalApplications: 0,
//     totalInspections: 0,
//     totalNocs: 0,
//   });

//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const showEmail = { email: localStorage.getItem("email") || "admin@example.com" };

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/dashboard/stats");
//         if (!response.ok) throw new Error("Failed to fetch data");

//         const data = await response.json();
//         setStats(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchStats();
//   }, []);

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
//         <h1 className="mt-12 ml-[23rem] text-4xl font-extrabold text-center text-gray-900 border-b-4 border-red-500 inline-block">
//         həˈlō Officer  
//         </h1>
//         <p className="text-center mt-2 text-gray-600">{showEmail.email}</p>

//         {loading && <p className="text-center">Loading data...</p>}
//         {error && <p className="text-center text-red-600">{error}</p>}

//         {!loading && !error && (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 mt-8">
//             <DashboardCard title="Total Users" count={stats.totalUsers} bgColor="bg-green-200" textColor="text-green-800" buttonColor="bg-green-600" onClick={() => navigate('/all-users')} />
//             <DashboardCard title="Total Applications" count={stats.totalApplications} bgColor="bg-blue-200" textColor="text-blue-800" buttonColor="bg-blue-600" onClick={() => navigate('/all-applications')} />
//             <DashboardCard title="Total Inspections" count={stats.totalInspections} bgColor="bg-yellow-200" textColor="text-yellow-800" buttonColor="bg-yellow-600" onClick={() => navigate('/inspection-schedule')} />
//             <DashboardCard title="Total NOCs Generated" count={stats.totalNocs} bgColor="bg-purple-200" textColor="text-purple-800" buttonColor="bg-purple-600" onClick={() => navigate('/approved-applications')} />
//           </div>
//         )}

        
//       </div>
//       {/* <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="bg-white p-6 rounded-lg shadow-lg">
//             <h2 className="text-2xl font-bold text-gray-800">Efficiency in Fire Department Operations</h2>
//             <p className="text-gray-600 mt-2">
//               Our AI-driven dashboard ensures that applications and inspections are processed swiftly,
//               reducing manual work and improving response times for fire safety compliance.
//             </p>
//           </div>

//           <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
//             <div className="w-24 h-24 relative mx-auto">
//               <svg className="w-full h-full" viewBox="0 0 100 100">
//                 <circle cx="50" cy="50" r="45" stroke="#e5e7eb" strokeWidth="10" fill="none" />
//                 <circle cx="50" cy="50" r="45" stroke="url(#gradient)" strokeWidth="10" fill="none" strokeDasharray="283" strokeDashoffset="120" strokeLinecap="round" transform="rotate(-90 50 50)" />
//                 <text x="50" y="55" textAnchor="middle" className="text-lg font-bold fill-gray-900">59%</text>
//                 <defs>
//                   <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
//                     <stop offset="0%" stopColor="#f97316" />
//                     <stop offset="100%" stopColor="#10b981" />
//                   </linearGradient>
//                 </defs>
//               </svg>
//             </div>
//             <p className="ml-4 text-gray-700 text-lg">
//               "Given 15 minutes, 59% of people prefer engaging content over plain and boring visuals."
//               <br />- Adobe
//             </p>
//           </div>
//         </div> */}
//         {/* 2 */}
//         {/* <div className="mt-12 grid grid-cols-1 md:grid-cols-1 gap-6">
//           <div className="bg-white p-6 rounded-lg shadow-lg">
//             <h2 className="text-2xl font-bold text-gray-800">Efficiency in Fire Department Operations</h2>
//             <p className="text-gray-600 mt-2">
//               Our AI-driven dashboard ensures that applications and inspections are processed swiftly,
//               reducing manual work and improving response times for fire safety compliance.
//             </p>
//           </div>

//           <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
//             <div className="w-24 h-24 relative mx-auto">
//               <svg className="w-full h-full" viewBox="0 0 100 100">
//                 <circle cx="50" cy="50" r="45" stroke="#e5e7eb" strokeWidth="10" fill="none" />
//                 <circle cx="50" cy="50" r="45" stroke="url(#gradient)" strokeWidth="10" fill="none" strokeDasharray="283" strokeDashoffset="120" strokeLinecap="round" transform="rotate(-90 50 50)" />
//                 <text x="50" y="55" textAnchor="middle" className="text-lg font-bold fill-gray-900">59%</text>
//                 <defs>
//                   <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
//                     <stop offset="0%" stopColor="#f97316" />
//                     <stop offset="100%" stopColor="#10b981" />
//                   </linearGradient>
//                 </defs>
//               </svg>
//             </div>
//             <p className="ml-4 text-gray-700 text-lg">
//               "Given 15 minutes, 59% of people prefer engaging content over plain and boring visuals."
//               <br />- Adobe
//             </p>
//           </div>
//         </div> */}
//     </div>
//   );
// }

// const DashboardCard = ({ title, count, bgColor, textColor, buttonColor, onClick }) => {
//   return (
//     <div className={`${bgColor} p-6 rounded-lg shadow-md text-center hover:scale-105 transform transition duration-300`}> 
//       <p className="text-lg font-semibold">{title}</p>
//       <p className={`text-3xl font-bold ${textColor}`}>{count}</p>
//       <button className={`mt-4 px-4 py-2 text-white rounded-lg shadow ${buttonColor}`} onClick={onClick}>
//         View
//       </button>
//     </div>
//   );
// };

// export default HomeOfficer;




// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// function HomeOfficer() {
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalApplications: 0,
//     totalInspections: 0,
//     totalNocs: 0,
//   });

//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [isSearching, setIsSearching] = useState(false);

//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const showEmail = { email: localStorage.getItem("email") || "admin@example.com" };

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/dashboard/stats");
//         if (!response.ok) throw new Error("Failed to fetch data");

//         const data = await response.json();
//         setStats(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchStats();
//   }, []);

//   // 🔍 Handle Search
//   const handleSearch = async (query) => {
//     setSearchQuery(query);
//     if (query.length < 2) {
//       setSearchResults([]);
//       setIsSearching(false);
//       return;
//     }

//     setIsSearching(true);
//     try {
//       const response = await fetch(`http://localhost:5000/api/search?q=${query}`);
//       if (!response.ok) throw new Error("Search failed");

//       const data = await response.json();
//       setSearchResults(data);
//     } catch (err) {
//       console.error(err);
//       setSearchResults([]);
//     } finally {
//       setIsSearching(false);
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
//         <h1 className="mt-12 ml-[23rem] text-4xl font-extrabold text-center text-gray-900 border-b-4 border-red-500 inline-block">
//           həˈlō Officer  
//         </h1>
//         <p className="text-center mt-2 text-gray-600">{showEmail.email}</p>

//         {loading && <p className="text-center">Loading data...</p>}
//         {error && <p className="text-center text-red-600">{error}</p>}

//         {!loading && !error && (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 mt-8">
//             <DashboardCard title="Total Users" count={stats.totalUsers} bgColor="bg-green-200" textColor="text-green-800" buttonColor="bg-green-600" onClick={() => navigate('/all-users')} />
//             <DashboardCard title="Total Applications" count={stats.totalApplications} bgColor="bg-blue-200" textColor="text-blue-800" buttonColor="bg-blue-600" onClick={() => navigate('/all-applications')} />
//             <DashboardCard title="Total Inspections" count={stats.totalInspections} bgColor="bg-yellow-200" textColor="text-yellow-800" buttonColor="bg-yellow-600" onClick={() => navigate('/inspection-schedule')} />
//             <DashboardCard title="Total NOCs Generated" count={stats.totalNocs} bgColor="bg-purple-200" textColor="text-purple-800" buttonColor="bg-purple-600" onClick={() => navigate('/approved-applications')} />
//           </div>
//         )}

//         {/* 🔍 Search Bar */}
//         <div className="mt-10 flex justify-center">
//           <input
//             type="text"
//             placeholder="Search users or applications..."
//             value={searchQuery}
//             onChange={(e) => handleSearch(e.target.value)}
//             className="w-2/3 p-3 rounded-lg border shadow focus:outline-none focus:ring-2 focus:ring-red-500"
//           />
//         </div>

//         {/* Search Results */}
//         {isSearching && <p className="text-center mt-4 text-gray-500">Searching...</p>}
//         {searchResults.length > 0 && (
//           <div className="mt-6 bg-white rounded-lg shadow p-4">
//             <h2 className="text-xl font-bold mb-4">Search Results</h2>
//             <ul>
//               {searchResults.map((item, index) => (
//                 <li key={index} className="border-b p-2 hover:bg-gray-100 cursor-pointer">
//                   {item.name || item.applicationId} - {item.type}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// const DashboardCard = ({ title, count, bgColor, textColor, buttonColor, onClick }) => {
//   return (
//     <div className={`${bgColor} p-6 rounded-lg shadow-md text-center hover:scale-105 transform transition duration-300`}> 
//       <p className="text-lg font-semibold">{title}</p>
//       <p className={`text-3xl font-bold ${textColor}`}>{count}</p>
//       <button className={`mt-4 px-4 py-2 text-white rounded-lg shadow ${buttonColor}`} onClick={onClick}>
//         View
//       </button>
//     </div>
//   );
// };

// export default HomeOfficer;



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar";

function HomeOfficer() {
  const [stats, setStats] = useState({ totalUsers: 0, totalApplications: 0, totalInspections: 0, totalNocs: 0 });
  const [searchResults, setSearchResults] = useState([]); // Store search results
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const showEmail = { email: localStorage.getItem("email") || "admin@example.com" };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/dashboard/stats");
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
        {/* <h1 className="mt-12  text-4xl font-extrabold text-center text-gray-900 border-b-4 border-red-500 inline-block">
          həˈlō Officer  
        </h1> */}
        <h1 className="mt-12 text-4xl font-extrabold text-center text-gray-900 border-b-4 border-sky-500 inline-block mx-auto">
  həˈlō Officer  
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
        {/* <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-md">
          {searchResults.length > 0 ? (
            <ul>
              {searchResults.map((result, index) => (
                <li key={index} className="border-b py-2">
                  <span className="font-semibold">{result.type}:</span>{" "}
                  {result.type === "User" ? `${result.name} (${result.email})` : `${result.ownerName} - ${result.businessName} (${result.email})`}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">No results found.</p>
          )}
        </div> */}
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
      <button className={`mt-4 px-4 py-2 text-white rounded-lg shadow ${buttonColor}`} onClick={onClick}>
        View
      </button>
    </div>
  );
};

export default HomeOfficer;
