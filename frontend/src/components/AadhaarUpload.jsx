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
            
            
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const file = new File([blob], "aadhaar.jpg", { type: "image/jpeg" });

            
            const formData = new FormData();
            formData.append("aadhaarImage", file);

            setUploadStatus("Uploading...");
            const uploadResponse = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/validate-aadhaar`, formData, {
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
        const match = summaryText.match(/\d{4}\s\d{4}\s\d{4}/); 
        return match ? match[0] : "❌ Aadhaar Number Not Found";
    };

    const verifyAadhaar = async (aadhaarNumber) => {
        try {
            setVerificationResult("🔄 Verifying Aadhaar...");
            const formattedNumber = aadhaarNumber.replace(/\s/g, "");
    
            console.log("Sending Aadhaar Number:", formattedNumber);
    
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/verify-aadhaar`,
                { aadhaarNumber: formattedNumber }, 
                { headers: { "Content-Type": "application/json" } } 
            );
    
            console.log("Backend Response:", response.data); 
    
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
