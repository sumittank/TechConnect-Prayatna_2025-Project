// import { useState } from "react";
// import axios from "axios";

// const AadhaarUpload = () => {
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [uploadStatus, setUploadStatus] = useState("");
//     const [aadhaarResult, setAadhaarResult] = useState("");

//     // Handle file selection
//     const handleFileChange = (event) => {
//         setSelectedFile(event.target.files[0]);
//         setUploadStatus("");  // Reset previous status
//         setAadhaarResult("");  // Reset result
//     };

//     // Handle file upload
//     const handleUpload = async () => {
//         if (!selectedFile) {
//             alert("Please select an Aadhaar image file to upload.");
//             return;
//         }

//         const formData = new FormData();
//         formData.append("aadhaarImage", selectedFile);

//         try {
//             setUploadStatus("Uploading...");
//             const response = await axios.post("http://localhost:5000/api/validate-aadhaar", formData, {
//                 headers: { "Content-Type": "multipart/form-data" },
//             });

//             setUploadStatus("✅ Upload Successful");
//             setAadhaarResult(response.data.result);
//         } catch (error) {
//             console.error("❌ Error uploading Aadhaar:", error);
//             setUploadStatus("❌ Upload Failed");
//             setAadhaarResult(error.response?.data?.error || "An error occurred");
//         }
//     };

//     return (
//         <div className="container">
//             <h2>Aadhaar Card Validation</h2>
//             <input type="file" accept="image/*" onChange={handleFileChange} />
//             <button onClick={handleUpload}>Upload & Validate</button>

//             {uploadStatus && <p>{uploadStatus}</p>}
//             {aadhaarResult && <p><strong>Result:</strong> {aadhaarResult}</p>}
//         </div>
//     );
// };

// export default AadhaarUpload;


// import { useEffect, useState } from "react";
// import axios from "axios";

// const AadhaarUpload = ({ aadhaarImageUrl }) => {
//     const [uploadStatus, setUploadStatus] = useState("");
//     const [aadhaarResult, setAadhaarResult] = useState("");

//     useEffect(() => {
//         if (aadhaarImageUrl) {
//             handleUpload(aadhaarImageUrl);
//         }
//     }, [aadhaarImageUrl]);

//     const handleUpload = async (imageUrl) => {
//         try {
//             setUploadStatus("Uploading...");
//             const response = await axios.post("http://localhost:5000/api/validate-aadhaar", { imageUrl });

//             setUploadStatus("✅ Upload Successful");
//             setAadhaarResult(response.data.result);
//         } catch (error) {
//             console.error("❌ Error uploading Aadhaar:", error);
//             setUploadStatus("❌ Upload Failed");
//             setAadhaarResult(error.response?.data?.error || "An error occurred");
//         }
//     };

//     return (
//         <div className="container">
//             <h2>Aadhaar Card Validation</h2>
//             {aadhaarImageUrl ? (
//                 <>
//                     <img src={aadhaarImageUrl} alt="Aadhaar Card" className="w-full h-32 object-cover" />
//                     <p>{uploadStatus}</p>
//                     {aadhaarResult && <p><strong>Result:</strong> {aadhaarResult}</p>}
//                 </>
//             ) : (
//                 <p>No Aadhaar image available</p>
//             )}
//         </div>
//     );
// };

// export default AadhaarUpload;

// import { useEffect, useState } from "react";
// import axios from "axios";

// const AadhaarUpload = ({ aadhaarImageUrl }) => {
//     const [uploadStatus, setUploadStatus] = useState("");
//     const [aadhaarResult, setAadhaarResult] = useState("");

//     useEffect(() => {
//         if (aadhaarImageUrl) {
//             fetchAndUploadImage(aadhaarImageUrl);
//         }
//     }, [aadhaarImageUrl]);

//     const fetchAndUploadImage = async (imageUrl) => {
//         try {
//             setUploadStatus("Fetching Aadhaar Image...");
            
//             // Fetch the image and convert it into a Blob
//             const response = await fetch(imageUrl);
//             const blob = await response.blob();
//             const file = new File([blob], "aadhaar.jpg", { type: "image/jpeg" });

//             // Create FormData
//             const formData = new FormData();
//             formData.append("aadhaarImage", file);

//             // Upload to backend
//             setUploadStatus("Uploading...");
//             const uploadResponse = await axios.post("http://localhost:5000/api/validate-aadhaar", formData, {
//                 headers: { "Content-Type": "multipart/form-data" },
//             });

//             setUploadStatus("✅ Upload Successful");
//             setAadhaarResult(uploadResponse.data.result);
//         } catch (error) {
//             console.error("❌ Error uploading Aadhaar:", error);
//             setUploadStatus("❌ Upload Failed");
//             setAadhaarResult(error.response?.data?.error || "An error occurred");
//         }
//     };

//     const extractAadhaarNumber = (summaryText) => {
//         // Split the summary into lines
//         const lines = summaryText.split("\n");
      
//         // Search for the line containing '✅ Aadhaar Number'
//         for (const line of lines) {
//           if (line.startsWith("✅ Aadhaar Number")) {
//             // Extract number using regex (assuming 12-digit format)
//             const match = line.match(/\d{12}/);
//             return match ? match[0] : null;
//           }
//         }
      
//         // Return null if no Aadhaar number found
//         return "Not Aadhaar Card Number is Available";
//       };

//     return (
//         <div className="container">
//             <h2>Aadhaar Card Validation</h2>
//             {aadhaarImageUrl ? (
//                 <>
//                     {/* <img src={aadhaarImageUrl} alt="Aadhaar Card" className="w-full h-32 object-cover" /> */}
//                     <p>{uploadStatus}</p>
//                     {aadhaarResult && <p><strong>Result:</strong> {aadhaarResult}</p>}
//                     {console.log(extractAadhaarNumber(aadhaarResult))}
//                 </>
//             ) : (
//                 <p>No Aadhaar image available</p>
//             )}
//         </div>
//     );
// };

// export default AadhaarUpload;


// import { useEffect, useState } from "react";
// import axios from "axios";

// const AadhaarUpload = ({ aadhaarImageUrl }) => {
//     const [uploadStatus, setUploadStatus] = useState("");
//     const [aadhaarResult, setAadhaarResult] = useState("");
//     const [aadhaarNumber, setAadhaarNumber] = useState("");
//     const [verificationResult, setVerificationResult] = useState("");

//     useEffect(() => {
//         if (aadhaarImageUrl) {
//             fetchAndUploadImage(aadhaarImageUrl);
//         }
//     }, [aadhaarImageUrl]);

//     const fetchAndUploadImage = async (imageUrl) => {
//         try {
//             setUploadStatus("Fetching Aadhaar Image...");
            
//             // Fetch the image and convert it into a Blob
//             const response = await fetch(imageUrl);
//             const blob = await response.blob();
//             const file = new File([blob], "aadhaar.jpg", { type: "image/jpeg" });

//             // Create FormData
//             const formData = new FormData();
//             formData.append("aadhaarImage", file);

//             // Upload to backend
//             setUploadStatus("Uploading...");
//             const uploadResponse = await axios.post("http://localhost:5000/api/validate-aadhaar", formData, {
//                 headers: { "Content-Type": "multipart/form-data" },
//             });

//             setUploadStatus("✅ Upload Successful");
//             setAadhaarResult(uploadResponse.data.result);

//             // Extract Aadhaar Number and set state
//             const extractedNumber = extractAadhaarNumber(uploadResponse.data.result);
//             if (extractedNumber) {
//                 setAadhaarNumber(extractedNumber);
//                 verifyAadhaar(extractedNumber);
//             }
//         } catch (error) {
//             console.error("❌ Error uploading Aadhaar:", error);
//             setUploadStatus("❌ Upload Failed");
//             setAadhaarResult(error.response?.data?.error || "An error occurred");
//         }
//     };

//     const extractAadhaarNumber = (summaryText) => {
//         const match = summaryText.match(/\d{12}/); // Extract 12-digit Aadhaar number
//         return match ? match[0] : "❌ Aadhaar Number Not Found";
//     };

//     const verifyAadhaar = async (aadhaarNumber) => {
//         try {
//             setVerificationResult("🔄 Verifying Aadhaar...");
//             const response = await axios.get(`http://localhost:5000/api/verify-aadhaar/${aadhaarNumber}`);

//             if (response.data.success) {
//                 setVerificationResult(`✅ Verified: ${response.data.data.name}, ${response.data.data.gender}`);
//             } else {
//                 setVerificationResult("❌ Aadhaar Number Not Found in Database");
//             }
//         } catch (error) {
//             setVerificationResult("❌ Verification Failed");
//             console.error("Verification Error:", error);
//         }
//     };

//     return (
//         <div className="container">
//             <h2>Aadhaar Card Validation</h2>
//             {aadhaarImageUrl ? (
//                 <>
//                     {/* <img src={aadhaarImageUrl} alt="Aadhaar Card" className="w-full h-32 object-cover" /> */}
//                     <p>{uploadStatus}</p>
//                     {aadhaarResult && <p><strong>Result:</strong> {aadhaarResult}</p>}
//                     {aadhaarNumber && <p><strong>Extracted Aadhaar Number:</strong> {aadhaarNumber}</p>}
//                     {verificationResult && <p><strong>Verification:</strong> {verificationResult}</p>}
//                 </>
//             ) : (
//                 <p>No Aadhaar image available</p>
//             )}
//         </div>
//     );
// };

// export default AadhaarUpload;


import { useEffect, useState } from "react";
import axios from "axios";

const AadhaarUpload = ({ aadhaarImageUrl }) => {
    const [uploadStatus, setUploadStatus] = useState("");
    const [aadhaarResult, setAadhaarResult] = useState("");
    const [aadhaarNumber, setAadhaarNumber] = useState("");
    const [verificationResult, setVerificationResult] = useState("");

    useEffect(() => {
        if (aadhaarImageUrl) {
            fetchAndUploadImage(aadhaarImageUrl);
        }
    }, [aadhaarImageUrl]);

    const fetchAndUploadImage = async (imageUrl) => {
        try {
            setUploadStatus("Fetching Aadhaar Image...");
            
            // Fetch the image and convert it into a Blob
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const file = new File([blob], "aadhaar.jpg", { type: "image/jpeg" });

            // Create FormData
            const formData = new FormData();
            formData.append("aadhaarImage", file);

            // Upload to backend
            setUploadStatus("Uploading...");
            const uploadResponse = await axios.post("http://localhost:5000/api/validate-aadhaar", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setUploadStatus("✅ Upload Successful");
            setAadhaarResult(uploadResponse.data.result);

            // Extract Aadhaar Number and verify
            const extractedNumber = extractAadhaarNumber(uploadResponse.data.result);
            if (extractedNumber !== "❌ Aadhaar Number Not Found") {
                setAadhaarNumber(extractedNumber);
                verifyAadhaar(extractedNumber);
            }
        } catch (error) {
            console.error("❌ Error uploading Aadhaar:", error);
            setUploadStatus("❌ Upload Failed");
            setAadhaarResult(error.response?.data?.error || "An error occurred");
        }
    };

    const extractAadhaarNumber = (summaryText) => {
        const match = summaryText.match(/\d{4}\s\d{4}\s\d{4}/); // Extract Aadhaar in 4-4-4 format
        return match ? match[0] : "❌ Aadhaar Number Not Found";
    };

    // const verifyAadhaar = async (aadhaarNumber) => {
    //     try {
    //         setVerificationResult("🔄 Verifying Aadhaar...");
    //         const formattedNumber = aadhaarNumber.replace(/\s/g, ""); // Remove spaces for API call
    //         const response = await axios.get(`http://localhost:5000/api/verify-aadhaar/${formattedNumber}`);
    //         console.log(response)
    //         if (response.data.success) {
    //             setVerificationResult(`✅ Verified: ${response.data.data.name}, ${response.data.data.gender}`);
    //         } else {
    //             setVerificationResult("❌ Aadhaar Number Not Found in Database");
    //         }
    //     } catch (error) {
    //         setVerificationResult("❌ Verification Failed");
    //         console.error("Verification Error:", error);
    //     }
    // };

    // const verifyAadhaar = async (aadhaarNumber) => {
    //     try {
    //         setVerificationResult("🔄 Verifying Aadhaar...");
    //         const formattedNumber = aadhaarNumber.replace(/\s/g, ""); // Remove spaces for API call
    
    //         const response = await axios.post("http://localhost:5000/api/verify-aadhaar", { aadhaarNumber: formattedNumber });
    
    //         if (response.data.success) {
    //             setVerificationResult(`✅ Verified: ${response.data.data.name}, ${response.data.data.gender}`);
    //         } else {
    //             setVerificationResult("❌ Aadhaar Number Not Found in Database");
    //         }
    //     } catch (error) {
    //         setVerificationResult("❌ Verification Failed");
    //         console.error("Verification Error:", error);
    //     }
    // };

    const verifyAadhaar = async (aadhaarNumber) => {
        try {
            setVerificationResult("🔄 Verifying Aadhaar...");
            const formattedNumber = aadhaarNumber.replace(/\s/g, ""); // Remove spaces
    
            console.log("Sending Aadhaar Number:", formattedNumber); // ✅ Check before sending
    
            const response = await axios.post(
                "http://localhost:5000/api/verify-aadhaar",
                { aadhaarNumber: formattedNumber },  // ✅ Send as JSON in the request body
                { headers: { "Content-Type": "application/json" } }  // ✅ Ensure correct headers
            );
    
            console.log("Backend Response:", response.data); // ✅ Debug response
    
            if (response.data.success) {
                setVerificationResult(`✅ Verified: ${response.data.data.name}, ${response.data.data.gender}`);
            } else {
                setVerificationResult("❌ Aadhaar Number Not Found in Database");
            }
        } catch (error) {
            setVerificationResult("❌ Verification Failed");
            console.error("Verification Error:", error);
        }
    };
    

    return (
        <div className="container">
            <h2>Aadhaar Card Validation</h2>
            {aadhaarImageUrl ? (
                <>
                    {/* <img src={aadhaarImageUrl} alt="Aadhaar Card" className="w-full h-32 object-cover" /> */}
                    <p>{uploadStatus}</p>
                    {aadhaarResult && <p><strong>Result:</strong> {aadhaarResult}</p>}
                    {aadhaarNumber && <p><strong>Extracted Aadhaar Number:</strong> {aadhaarNumber}</p>}
                    {/* {verificationResult && <p><strong>Verification:</strong> {verificationResult}</p>} */}
                </>
            ) : (
                <p>No Aadhaar image available</p>
            )}
        </div>
    );
};

export default AadhaarUpload;
