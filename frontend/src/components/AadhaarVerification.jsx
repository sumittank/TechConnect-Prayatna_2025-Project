import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AadhaarVerification = () => {
    const [aadhaarNumber, setAadhaarNumber] = useState("");
    const [verificationResult, setVerificationResult] = useState(null);

    const verifyAadhaar = async () => {
        if (aadhaarNumber.length !== 12 || isNaN(aadhaarNumber)) {
            toast.error("❌ Invalid Aadhaar Number (Must be 12 digits)");
            return;
        }

        try {
            setVerificationResult("🔄 Verifying Aadhaar...");
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/verify-identity`, { aadhaarNumber });

            if (response.data.success) {
                setVerificationResult(`✅ Verified: ${response.data.data.name}, ${response.data.data.gender}`);
                toast.success(response.data.message);
            } else {
                setVerificationResult("❌ Aadhaar Number Not Found");
                toast.error(response.data.message);
            }
        } catch (error) {
            setVerificationResult("❌ Verification Failed");
            toast.error("Server Error: Could not verify Aadhaar");
            console.error("Verification Error:", error);
        }
    };

    return (
        <div className="container">
            <h2>Aadhaar Verification</h2>
            <input
                type="text"
                placeholder="Enter Aadhaar Number"
                value={aadhaarNumber}
                onChange={(e) => setAadhaarNumber(e.target.value)}
                maxLength="12"
            />
            <button onClick={verifyAadhaar}>Verify</button>
            {verificationResult && <p>{verificationResult}</p>}
            <ToastContainer />
        </div>
    );
};

export default AadhaarVerification;
