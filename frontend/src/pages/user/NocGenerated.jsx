import React, { useEffect, useState } from "react";

function NocGenerated() {
  const [nocs, setNocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem("email");

    if (!email) {
      setError("User email not found in localStorage.");
      setLoading(false);
      return;
    }


    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/noc/user/nocs?email=${email}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setError(data.message);
        } else {
          setNocs(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching NOCs. Please try again.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Generated NOCs</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && nocs.length === 0 && <p>No NOCs found.</p>}

      {!loading && !error && nocs.length > 0 && (
        <table className="w-full border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Application ID</th>
              <th className="border p-2">Owner Name</th>
              <th className="border p-2">Contact</th>
              <th className="border p-2">Issued On</th>
              <th className="border p-2">Expired On</th>
              <th className="border p-2">Download NOC</th>
            </tr>
          </thead>
          <tbody>
            {nocs.map((noc) => (
              <tr key={noc._id} className="text-center">
                <td className="border p-2">{noc.applicationId}</td>
                <td className="border p-2">{noc.ownerName}</td>
                <td className="border p-2">{noc.contact}</td>
                <td className="border p-2">{new Date(noc.issuedOn).toLocaleDateString()}</td>
                <td className="border p-2">{new Date(new Date(noc.issuedOn).setFullYear(new Date(noc.issuedOn).getFullYear() + 3)).toLocaleDateString()}</td>
                <td className="border p-2">
                  <a href={noc.nocUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    View / Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default NocGenerated;
