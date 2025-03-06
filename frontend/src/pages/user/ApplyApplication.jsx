// import React, { useState } from "react";
// import axios from "axios";

// function ApplyApplication() {
//   const [formData, setFormData] = useState({
//     ownerName: "",
//     email: "",
//     contact: "",
//     address: "",
//     buildingDetails: {
//       totalArea: "",
//       numFloors: "",
//       occupancyType: "",
//       height: "",
//     },
//     fireSafetyMeasures: [],
//     waterStorage: "",
//     nearestFireStation: "",
//     ownerPhoto: null,
//     buildingPhoto: null,
//     extinguisherPhoto: null,
//     businessCert: null,
//     aadharCard: null,
//   });

//   const [progress, setProgress] = useState(0);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name in formData.buildingDetails) {
//       setFormData((prev) => ({
//         ...prev,
//         buildingDetails: { ...prev.buildingDetails, [name]: value },
//       }));
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleCheckboxChange = (e) => {
//     const { checked, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       fireSafetyMeasures: checked
//         ? [...prev.fireSafetyMeasures, value]
//         : prev.fireSafetyMeasures.filter((item) => item !== value),
//     }));
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.files[0] });
//   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     // Validation
// //     for (let key in formData) {
// //       if (!formData[key] && key !== "fireSafetyMeasures") {
// //         alert(`Please fill out ${key.replace(/([A-Z])/g, " $1")}`);
// //         return;
// //       }
// //     }

// //     const form = new FormData();
// //     Object.keys(formData).forEach((key) => {
// //       if (typeof formData[key] === "object" && key !== "fireSafetyMeasures") {
// //         if (formData[key] instanceof File) {
// //           form.append(key, formData[key]); // Append files
// //         } else {
// //           form.append(key, JSON.stringify(formData[key])); // Convert objects to string
// //         }
// //       } else {
// //         form.append(key, formData[key]);
// //       }
// //     });

// //     try {
// //       setProgress(25);
// //       await axios.post("http://localhost:5000/api/apply", form, {
// //         headers: { "Content-Type": "multipart/form-data" },
// //       });
// //       setProgress(100);
// //       alert("Application submitted successfully!");
// //     } catch (error) {
// //       alert("Error submitting application");
// //       setProgress(0);
// //     }
// //   };

// const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     // Validation: Ensure required fields are filled
//     for (let key in formData) {
//       if (!formData[key] && key !== "fireSafetyMeasures") {
//         alert(`Please fill out ${key.replace(/([A-Z])/g, " $1")}`);
//         return;
//       }
//     }
  
//     // ✅ Prepare FormData for submission
//     const form = new FormData();
//     Object.keys(formData).forEach((key) => {
//       if (key === "buildingDetails" || key === "fireSafetyMeasures") {
//         form.append(key, JSON.stringify(formData[key])); // Convert objects/arrays to JSON strings
//       } else if (formData[key] instanceof File) {
//         form.append(key, formData[key]); // Append files
//       } else {
//         form.append(key, formData[key]);
//       }
//     });
  
//     try {
//       setProgress(25);
//       await axios.post("http://localhost:5000/api/apply", form, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setProgress(100);
//       alert("Application submitted successfully!");
//     } catch (error) {
//       alert("Error submitting application");
//       setProgress(0);
//     }
//   };

//   return (
//     <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-4">Apply for Fire NOC</h2>
//       <form onSubmit={handleSubmit} className="space-y-3">
//         <input type="text" name="ownerName" placeholder="Owner Name" value={formData.ownerName} onChange={handleChange} className="w-full p-2 border" required />
//         <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border" required />
//         <input type="text" name="contact" placeholder="Contact Number" value={formData.contact} onChange={handleChange} className="w-full p-2 border" required />
//         <textarea name="address" placeholder="Full Address" value={formData.address} onChange={handleChange} className="w-full p-2 border" required></textarea>

//         <h3 className="font-bold mt-3">Building Details</h3>
//         <input type="text" name="totalArea" placeholder="Total Area" value={formData.buildingDetails.totalArea} onChange={handleChange} className="w-full p-2 border" required />
//         <input type="number" name="numFloors" placeholder="Number of Floors" value={formData.buildingDetails.numFloors} onChange={handleChange} className="w-full p-2 border" required />
//         <input type="text" name="occupancyType" placeholder="Occupancy Type (Residential, Commercial, etc.)" value={formData.buildingDetails.occupancyType} onChange={handleChange} className="w-full p-2 border" required />
//         <input type="text" name="height" placeholder="Building Height" value={formData.buildingDetails.height} onChange={handleChange} className="w-full p-2 border" required />

//         <h3 className="font-bold mt-3">Fire Safety Measures</h3>
//         {["Fire Extinguishers", "Smoke Detectors", "Fire Alarms", "Sprinklers", "Emergency Exits"].map((item) => (
//           <label key={item} className="block">
//             <input type="checkbox" value={item} onChange={handleCheckboxChange} className="mr-2" /> {item}
//           </label>
//         ))}

//         <h3 className="font-bold mt-3">Fire Safety Infrastructure</h3>
//         <input type="text" name="waterStorage" placeholder="Water Storage (Fire hydrants, water tanks, hose reels)" value={formData.waterStorage} onChange={handleChange} className="w-full p-2 border" required />
//         <input type="text" name="nearestFireStation" placeholder="Nearest Fire Station" value={formData.nearestFireStation} onChange={handleChange} className="w-full p-2 border" required />

//         <h3 className="font-bold mt-3">Upload Required Documents</h3>
//         <input type="file" name="ownerPhoto" onChange={handleFileChange} className="w-full p-2 border" required />
//         <input type="file" name="buildingPhoto" onChange={handleFileChange} className="w-full p-2 border" required />
//         <input type="file" name="extinguisherPhoto" onChange={handleFileChange} className="w-full p-2 border" required />
//         <input type="file" name="businessCert" onChange={handleFileChange} className="w-full p-2 border" required />
//         <input type="file" name="aadharCard" onChange={handleFileChange} className="w-full p-2 border" required />

//         <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Submit</button>
//       </form>

//       {progress > 0 && <div className="mt-4">Progress: {progress}%</div>}
//     </div>
//   );
// }

// export default ApplyApplication;


// import React, { useState } from "react";
// import axios from "axios";

// function ApplyApplication() {
//   const [formData, setFormData] = useState({
//     ownerName: "",
//     email: "",
//     contact: "",
//     address: "",
//     businessName: "", // ✅ New field for business name
//     buildingDetails: {
//       totalArea: "",
//       numFloors: "",
//       occupancyType: "",
//       height: "",
//     },
//     fireSafetyMeasures: [],
//     waterStorage: "",
//     nearestFireStation: "",
//     ownerPhoto: null,
//     buildingPhoto: null,
//     extinguisherPhoto: null,
//     businessCert: null,
//     aadharCard: null,
//   });

//   const [progress, setProgress] = useState(0);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name in formData.buildingDetails) {
//       setFormData((prev) => ({
//         ...prev,
//         buildingDetails: { ...prev.buildingDetails, [name]: value },
//       }));
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleCheckboxChange = (e) => {
//     const { checked, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       fireSafetyMeasures: checked
//         ? [...prev.fireSafetyMeasures, value]
//         : prev.fireSafetyMeasures.filter((item) => item !== value),
//     }));
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // ✅ Generate Timestamp
//     const currentTimestamp = new Date().toISOString();

//     // ✅ Prepare FormData for submission
//     const form = new FormData();
//     Object.keys(formData).forEach((key) => {
//       if (key === "buildingDetails" || key === "fireSafetyMeasures") {
//         form.append(key, JSON.stringify(formData[key])); // Convert objects/arrays to JSON strings
//       } else if (formData[key] instanceof File) {
//         form.append(key, formData[key]); // Append files
//       } else {
//         form.append(key, formData[key]);
//       }
//     });

//     form.append("timestamp", currentTimestamp); // ✅ Add timestamp field

//     try {
//       setProgress(25);
//       await axios.post("http://localhost:5000/api/apply", form, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setProgress(100);
//       alert("Application submitted successfully!");
//     } catch (error) {
//       alert("Error submitting application");
//       setProgress(0);
//     }
//   };

//   return (
//     <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-4">Apply for Fire NOC</h2>
//       <form onSubmit={handleSubmit} className="space-y-3">
//         <input type="text" name="ownerName" placeholder="Owner Name" value={formData.ownerName} onChange={handleChange} className="w-full p-2 border" required />
//         <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border" required />
//         <input type="text" name="contact" placeholder="Contact Number" value={formData.contact} onChange={handleChange} className="w-full p-2 border" required />
//         <textarea name="address" placeholder="Full Address" value={formData.address} onChange={handleChange} className="w-full p-2 border" required></textarea>

//         <h3 className="font-bold mt-3">Business Details</h3>
//         <input type="text" name="businessName" placeholder="Business Name" value={formData.businessName} onChange={handleChange} className="w-full p-2 border" required /> {/* ✅ Added */}

//         <h3 className="font-bold mt-3">Building Details</h3>
//         <input type="text" name="totalArea" placeholder="Total Area" value={formData.buildingDetails.totalArea} onChange={handleChange} className="w-full p-2 border" required />
//         <input type="number" name="numFloors" placeholder="Number of Floors" value={formData.buildingDetails.numFloors} onChange={handleChange} className="w-full p-2 border" required />
//         <input type="text" name="occupancyType" placeholder="Occupancy Type (Residential, Commercial, etc.)" value={formData.buildingDetails.occupancyType} onChange={handleChange} className="w-full p-2 border" required />
//         <input type="text" name="height" placeholder="Building Height" value={formData.buildingDetails.height} onChange={handleChange} className="w-full p-2 border" required />

//         <h3 className="font-bold mt-3">Fire Safety Measures</h3>
//         {["Fire Extinguishers", "Smoke Detectors", "Fire Alarms", "Sprinklers", "Emergency Exits"].map((item) => (
//           <label key={item} className="block">
//             <input type="checkbox" value={item} onChange={handleCheckboxChange} className="mr-2" /> {item}
//           </label>
//         ))}

//         <h3 className="font-bold mt-3">Fire Safety Infrastructure</h3>
//         <input type="text" name="waterStorage" placeholder="Water Storage (Fire hydrants, water tanks, hose reels)" value={formData.waterStorage} onChange={handleChange} className="w-full p-2 border" required />
//         <input type="text" name="nearestFireStation" placeholder="Nearest Fire Station" value={formData.nearestFireStation} onChange={handleChange} className="w-full p-2 border" required />

//         <h3 className="font-bold mt-3">Upload Required Documents</h3>
//         <input type="file" name="ownerPhoto" onChange={handleFileChange} className="w-full p-2 border" required />
//         <input type="file" name="buildingPhoto" onChange={handleFileChange} className="w-full p-2 border" required />
//         <input type="file" name="extinguisherPhoto" onChange={handleFileChange} className="w-full p-2 border" required />
//         <input type="file" name="businessCert" onChange={handleFileChange} className="w-full p-2 border" required />
//         <input type="file" name="aadharCard" onChange={handleFileChange} className="w-full p-2 border" required />

//         <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Submit</button>
//       </form>

//       {progress > 0 && <div className="mt-4">Progress: {progress}%</div>}
//     </div>
//   );
// }

// export default ApplyApplication;



// import React, { useState } from "react";
// import axios from "axios";

// function ApplyApplication() {
//   const [formData, setFormData] = useState({
//     ownerName: "",
//     email: "",
//     contact: "",
//     address: "",
//     businessName: "",
//     buildingDetails: {
//       totalArea: "",
//       numFloors: "",
//       occupancyType: "",  // Changed to dropdown
//       height: "",
//     },
//     fireSafetyMeasures: [],
//     waterStorage: "", // Changed to dropdown
//     nearestFireStation: "", // Changed to dropdown
//     ownerPhoto: null,
//     buildingPhoto: null,
//     extinguisherPhoto: null,
//     businessCert: null,
//     aadharCard: null,
//   });

//   const [progress, setProgress] = useState(0);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name in formData.buildingDetails) {
//       setFormData((prev) => ({
//         ...prev,
//         buildingDetails: { ...prev.buildingDetails, [name]: value },
//       }));
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleCheckboxChange = (e) => {
//     const { checked, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       fireSafetyMeasures: checked
//         ? [...prev.fireSafetyMeasures, value]
//         : prev.fireSafetyMeasures.filter((item) => item !== value),
//     }));
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const currentTimestamp = new Date().toISOString();

//     const form = new FormData();
//     Object.keys(formData).forEach((key) => {
//       if (key === "buildingDetails" || key === "fireSafetyMeasures") {
//         form.append(key, JSON.stringify(formData[key]));
//       } else if (formData[key] instanceof File) {
//         form.append(key, formData[key]);
//       } else {
//         form.append(key, formData[key]);
//       }
//     });

//     form.append("timestamp", currentTimestamp);

//     try {
//       setProgress(25);
//       await axios.post("http://localhost:5000/api/apply", form, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setProgress(100);
//       alert("Application submitted successfully!");
//     } catch (error) {
//       alert("Error submitting application");
//       setProgress(0);
//     }
//   };

//   return (
//     <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-4">Apply for Fire NOC</h2>
//       <form onSubmit={handleSubmit} className="space-y-3">
//         <input type="text" name="ownerName" placeholder="Owner Name" value={formData.ownerName} onChange={handleChange} className="w-full p-2 border" required />
//         <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border" required />
//         <input type="text" name="contact" placeholder="Contact Number" value={formData.contact} onChange={handleChange} className="w-full p-2 border" required />
//         <textarea name="address" placeholder="Full Address" value={formData.address} onChange={handleChange} className="w-full p-2 border" required></textarea>

//         <h3 className="font-bold mt-3">Business Details</h3>
//         <input type="text" name="businessName" placeholder="Business Name" value={formData.businessName} onChange={handleChange} className="w-full p-2 border" required />

//         <h3 className="font-bold mt-3">Building Details</h3>
//         <input type="text" name="totalArea" placeholder="Total Area" value={formData.buildingDetails.totalArea} onChange={handleChange} className="w-full p-2 border" required />
//         <input type="number" name="numFloors" placeholder="Number of Floors" value={formData.buildingDetails.numFloors} onChange={handleChange} className="w-full p-2 border" required />

//         {/* Occupancy Type Dropdown */}
//         <label className="block font-bold">Occupancy Type:</label>
//         <select name="occupancyType" value={formData.buildingDetails.occupancyType} onChange={handleChange} className="w-full p-2 border" required>
//           <option value="">Select Occupancy</option>
//           <option value="Commercial">Commercial</option>
//           <option value="Residential">Residential</option>
//           <option value="Industrial">Industrial</option>
//         </select>

//         <input type="text" name="height" placeholder="Building Height" value={formData.buildingDetails.height} onChange={handleChange} className="w-full p-2 border" required />

//         <h3 className="font-bold mt-3">Fire Safety Measures</h3>
//         {["Fire Extinguishers", "Smoke Detectors", "Fire Alarms", "Sprinklers", "Emergency Exits"].map((item) => (
//           <label key={item} className="block">
//             <input type="checkbox" value={item} onChange={handleCheckboxChange} className="mr-2" /> {item}
//           </label>
//         ))}

//         {/* Water Storage Dropdown */}
//         <label className="block font-bold">Water Storage:</label>
//         <select name="waterStorage" value={formData.waterStorage} onChange={handleChange} className="w-full p-2 border" required>
//           <option value="">Select Water Storage</option>
//           <option value="Fire Hydrants">Fire Hydrants</option>
//           <option value="Water Tank">Water Tank</option>
//           <option value="None">None</option>
//         </select>

//         {/* Nearest Fire Station Dropdown */}
//         <label className="block font-bold">Nearest Fire Station:</label>
//         <select name="nearestFireStation" value={formData.nearestFireStation} onChange={handleChange} className="w-full p-2 border" required>
//           <option value="">Select Distance</option>
//           <option value="0-2Km">0-2Km</option>
//           <option value="2-5Km">2-5Km</option>
//           <option value="5Km-10Km">5Km-10Km</option>
//           <option value="More than 10Km">More than 10Km</option>
//         </select>

//         <h3 className="font-bold mt-3">Upload Required Documents</h3>
//         <input type="file" name="ownerPhoto" onChange={handleFileChange} className="w-full p-2 border" required />
//         <input type="file" name="buildingPhoto" onChange={handleFileChange} className="w-full p-2 border" required />
//         <input type="file" name="extinguisherPhoto" onChange={handleFileChange} className="w-full p-2 border" required />
//         <input type="file" name="businessCert" onChange={handleFileChange} className="w-full p-2 border" required />
//         <input type="file" name="aadharCard" onChange={handleFileChange} className="w-full p-2 border" required />

//         <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Submit</button>
//       </form>

//       {progress > 0 && <div className="mt-4">Progress: {progress}%</div>}
//     </div>
//   );
// }

// export default ApplyApplication;





import React, { useState } from "react";
import axios from "axios";

function ApplyApplication() {
  const [formData, setFormData] = useState({
    ownerName: "",
    email: localStorage.getItem("email") || "",
    contact: "",
    address: "",
    businessName: "",
    buildingDetails: {
      totalArea: "",
      numFloors: "",
      occupancyType: "",
      height: "",
    },
    fireSafetyMeasures: [],
    waterStorage: "",
    nearestFireStation: "",
    ownerPhoto: null,
    buildingPhoto: null,
    extinguisherPhoto: null,
    businessCert: null,
    aadharCard: null,
  });

  const [progress, setProgress] = useState(0);
  const [suggestedHeight, setSuggestedHeight] = useState(null);

  // Function to calculate suggested height
  const calculateSuggestedHeight = (floors, type) => {
    if (!floors || !type) return null;

    let heightPerFloor = 3; // Default for Residential

    if (type === "Commercial") heightPerFloor = 3.5;
    else if (type === "Industrial") heightPerFloor = 4.5;

    return floors * heightPerFloor;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name in formData.buildingDetails) {
      const updatedBuildingDetails = { ...formData.buildingDetails, [name]: value };

      if (name === "numFloors" || name === "occupancyType") {
        const suggested = calculateSuggestedHeight(updatedBuildingDetails.numFloors, updatedBuildingDetails.occupancyType);
        setSuggestedHeight(suggested);
      }

      setFormData((prev) => ({ ...prev, buildingDetails: updatedBuildingDetails }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCheckboxChange = (e) => {
    const { checked, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      fireSafetyMeasures: checked
        ? [...prev.fireSafetyMeasures, value]
        : prev.fireSafetyMeasures.filter((item) => item !== value),
    }));
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentTimestamp = new Date().toISOString();
    const form = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "buildingDetails" || key === "fireSafetyMeasures") {
        form.append(key, JSON.stringify(formData[key]));
      } else if (formData[key] instanceof File) {
        form.append(key, formData[key]);
      } else {
        form.append(key, formData[key]);
      }
    });

    form.append("timestamp", currentTimestamp);

    try {
      setProgress(25);
      await axios.post("http://localhost:5000/api/apply", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProgress(100);
      alert("Application submitted successfully!");
    } catch (error) {
      alert("Error submitting application");
      setProgress(0);
    }
  };

  
  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Apply for Fire NOC</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" name="ownerName" placeholder="Owner Name" value={formData.ownerName} onChange={handleChange} className="w-full p-2 border" required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border bg-gray-100 cursor-not-allowed" readOnly required />
        <input type="text" name="contact" placeholder="Contact Number" value={formData.contact} onChange={handleChange} className="w-full p-2 border" required />
        <textarea name="address" placeholder="Full Address" value={formData.address} onChange={handleChange} className="w-full p-2 border" required></textarea>

        <h3 className="font-bold mt-3">Business Details</h3>
        <input type="text" name="businessName" placeholder="Business Name" value={formData.businessName} onChange={handleChange} className="w-full p-2 border" required />

        <h3 className="font-bold mt-3">Building Details</h3>
        <input type="text" name="totalArea" placeholder="Total Area" value={formData.buildingDetails.totalArea} onChange={handleChange} className="w-full p-2 border" required />
        <input type="number" name="numFloors" placeholder="Number of Floors" value={formData.buildingDetails.numFloors} onChange={handleChange} className="w-full p-2 border" required />

        <label className="block font-bold">Occupancy Type:</label>
        <select name="occupancyType" value={formData.buildingDetails.occupancyType} onChange={handleChange} className="w-full p-2 border" required>
          <option value="">Select Occupancy</option>
          <option value="Commercial">Commercial</option>
          <option value="Residential">Residential</option>
          <option value="Industrial">Industrial</option>
        </select>

        <input type="text" name="height" placeholder="Building Height" value={formData.buildingDetails.height} onChange={handleChange} className="w-full p-2 border" required />

        {/* Display suggested height */}
        {suggestedHeight !== null && (
          <p className="text-gray-500 text-sm">Suggested Height: {suggestedHeight} meters</p>
        )}

        <h3 className="font-bold mt-3">Fire Safety Measures</h3>
        {["Fire Extinguishers", "Smoke Detectors", "Fire Alarms", "Sprinklers", "Emergency Exits"].map((item) => (
          <label key={item} className="block">
            <input type="checkbox" value={item} onChange={handleCheckboxChange} className="mr-2" /> {item}
          </label>
        ))}

        <label className="block font-bold">Water Storage:</label>
        <select name="waterStorage" value={formData.waterStorage} onChange={handleChange} className="w-full p-2 border" required>
          <option value="">Select Water Storage</option>
          <option value="Fire Hydrants">Fire Hydrants</option>
          <option value="Water Tank">Water Tank</option>
          <option value="None">None</option>
        </select>

        <label className="block font-bold">Nearest Fire Station:</label>
        <select name="nearestFireStation" value={formData.nearestFireStation} onChange={handleChange} className="w-full p-2 border" required>
          <option value="">Select Distance</option>
          <option value="0-2Km">0-2Km</option>
          <option value="2-5Km">2-5Km</option>
          <option value="5Km-10Km">5Km-10Km</option>
          <option value="More than 10Km">More than 10Km</option>
        </select>

        <h3 className="font-bold mt-3">Upload Required Documents</h3>
        {/* {["ownerPhoto", "buildingPhoto", "extinguisherPhoto", "businessCert", "aadharCard"].map((name) => (
          <input key={name} type="file" name={name} onChange={handleFileChange} className="w-full p-2 border" required />
        ))} */}
        {["ownerPhoto", "buildingPhoto", "extinguisherPhoto", "businessCert", "aadharCard"].map((name) => (
  <div key={name} className="mb-2"> {/* Optional: Add some spacing between inputs */}
    <label htmlFor={name} className="block mb-1 font-semibold">{name}:</label>
    <input
      type="file"
      name={name}
      id={name} // Add an id matching the label's htmlFor
      onChange={handleFileChange}
      className="w-full p-2 border"
      required
    />
  </div>
))}

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Submit</button>
      </form>

      {progress > 0 && <div className="mt-4">Progress: {progress}%</div>}
    </div>
  );
}

export default ApplyApplication;













