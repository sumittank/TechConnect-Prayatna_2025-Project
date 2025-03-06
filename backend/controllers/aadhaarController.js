const { spawn } = require("child_process");
const path = require("path");

const validateAadhaar = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    const imagePath = path.resolve(req.file.path);
    console.log(`📂 File uploaded: ${imagePath}`);

    // Call the Python script for Aadhaar validation
    // const pythonProcess = spawn("python", ["./validate_aadhaar.py", imagePath]);
    const pythonProcess = spawn("python", [path.join(__dirname, "../../ml-api/validate_aadhaar.py"), req.file.path]);




    let output = "";
    let errorOutput = "";

    pythonProcess.stdout.on("data", (data) => {
        output += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
        errorOutput += data.toString();
    });

    pythonProcess.on("close", (code) => {
        if (code === 0) {
            console.log(`✅ Aadhaar Validation Result: ${output.trim()}`);
            res.json({ result: output.trim() });
        } else {
            console.error(`❌ Python Error: ${errorOutput}`);
            res.status(500).json({ error: "Error validating Aadhaar card" });
        }
    });
};

module.exports = { validateAadhaar };
