// const express = require("express");
// const PDFDocument = require("pdfkit");
// const QRCode = require("qrcode");
// const fs = require("fs");
// const path = require("path");
// const cloudinary = require("../config/cloudinary");
// const NOC = require("../models/NOC");
// const Application = require("../models/Application");

// const router = express.Router();

// // Generate and Upload NOC Certificate
// router.post("/generate-noc/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     // ✅ Find the Approved Application
//     const application = await Application.findById(id);
//     if (!application || application.status !== "Approved") {
//       return res.status(404).json({ message: "Approved application not found" });
//     }

//     // ✅ Generate QR Code
//     const qrPath = path.resolve(__dirname, `../temp/qrcode_${id}.png`);
//     const qrData = `Application ID: ${application._id}\nOwner: ${application.ownerName}\nStatus: Approved`;
//     await QRCode.toFile(qrPath, qrData);

//     // ✅ Generate PDF Certificate
//     const pdfPath = path.resolve(__dirname, `../temp/NOC_${id}.pdf`);
//     const doc = new PDFDocument();

//     const pdfStream = fs.createWriteStream(pdfPath);
//     doc.pipe(pdfStream);

//     doc.fontSize(20).text("FIRE SAFETY NOC CERTIFICATE", { align: "center" });
//     doc.moveDown();
//     doc.fontSize(12).text(`Application ID: ${application._id}`);
//     doc.text(`Owner Name: ${application.ownerName}`);
//     doc.text(`Email: ${application.email}`);
//     doc.text(`Contact: ${application.contact}`);
//     doc.text(`Address: ${application.address}`);
//     doc.text(`Issued On: ${new Date().toLocaleDateString()}`);
//     doc.moveDown();
//     doc.text("This is a digitally generated NOC certificate and is valid for legal purposes.", { align: "center" });

//     // Embed QR Code
//     doc.image(qrPath, { fit: [100, 100], align: "center" });

//     doc.end();

//     // ✅ Wait for PDF to Finish Writing
//     await new Promise((resolve) => pdfStream.on("finish", resolve));

//     // ✅ Upload PDF to Cloudinary
//     const uploadResult = await cloudinary.uploader.upload(pdfPath, { resource_type: "raw" });

//     // ✅ Store NOC Details in Database
//     const noc = new NOC({
//       applicationId: application._id,
//       ownerName: application.ownerName,
//       email: application.email,
//       contact: application.contact,
//       nocUrl: uploadResult.secure_url,
//       issuedOn: new Date(),
//     });

//     await noc.save();

//     // ✅ Cleanup Temporary Files
//     fs.unlinkSync(qrPath);
//     fs.unlinkSync(pdfPath);

//     res.status(200).json({ message: "NOC generated and uploaded successfully", nocUrl: uploadResult.secure_url });

//   } catch (error) {
//     console.error("Error generating NOC:", error);
//     res.status(500).json({ message: "Error generating NOC", error });
//   }
// });

// module.exports = router;
// const fs = require("fs");
// const path = require("path");
// const express = require("express");
// const PDFDocument = require("pdfkit");
// const QRCode = require("qrcode");
// const cloudinary = require("../config/cloudinary");
// const NOC = require("../models/NOC");
// const Application = require("../models/Application");

// const router = express.Router();

// // Ensure the temp directory exists
// const tempDir = path.join(__dirname, "../temp");
// if (!fs.existsSync(tempDir)) {
//   fs.mkdirSync(tempDir, { recursive: true });
// }

// // Generate and Upload NOC Certificate
// router.post("/generate-noc/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     console.log("Generating NOC for application ID:", id);

//     // ✅ Find the approved application
//     const application = await Application.findById(id);
//     if (!application) {
//       console.error("Application not found!");
//       return res.status(404).json({ message: "Application not found" });
//     }
//     if (application.status !== "Approved") {
//       console.error("Application not approved!");
//       return res.status(400).json({ message: "Application is not approved" });
//     }

//     // ✅ Define file paths
//     const qrPath = path.join(tempDir, `qrcode_${id}.png`);
//     const pdfPath = path.join(tempDir, `NOC_${id}.pdf`);

//     // ✅ Generate QR Code
//     const qrData = `Application ID: ${application._id}\nOwner: ${application.ownerName}\nStatus: Approved`;
//     console.log("Generating QR Code...");
//     await QRCode.toFile(qrPath, qrData);
//     console.log("QR Code generated successfully!");

//     // ✅ Generate PDF Certificate
//     const doc = new PDFDocument();
//     const pdfStream = fs.createWriteStream(pdfPath);
//     doc.pipe(pdfStream);

//     doc.fontSize(20).text("FIRE SAFETY NOC CERTIFICATE", { align: "center" });
//     doc.moveDown();
//     doc.fontSize(12).text(`Application ID: ${application._id}`);
//     doc.text(`Owner Name: ${application.ownerName}`);
//     doc.text(`Email: ${application.email}`);
//     doc.text(`Contact: ${application.contact}`);
//     doc.text(`Address: ${application.address}`);
//     doc.text(`Issued On: ${new Date().toLocaleDateString()}`);
//     doc.moveDown();
//     doc.text("This is a digitally generated NOC certificate and is valid for legal purposes.", { align: "center" });

//     // Embed QR Code
//     doc.image(qrPath, { fit: [100, 100], align: "center" });

//     doc.end();

//     await new Promise((resolve) => pdfStream.on("finish", resolve));
//     console.log("PDF generated successfully!");

//     // ✅ Upload PDF to Cloudinary
//     console.log("Uploading to Cloudinary...");
//     const uploadResult = await cloudinary.uploader.upload(pdfPath, { resource_type: "raw" });
//     console.log("Upload successful! URL:", uploadResult.secure_url);

//     // ✅ Save NOC in Database
//     const noc = new NOC({
//       applicationId: application._id,
//       ownerName: application.ownerName,
//       email: application.email,
//       contact: application.contact,
//       nocUrl: uploadResult.secure_url,
//       issuedOn: new Date(),
//     });

//     await noc.save();
//     console.log("NOC saved in database!");

//     // ✅ Cleanup
//     fs.unlinkSync(qrPath);
//     fs.unlinkSync(pdfPath);

//     res.status(200).json({ message: "NOC generated and uploaded successfully", nocUrl: uploadResult.secure_url });

//   } catch (error) {
//     console.error("❌ ERROR GENERATING NOC:", error);
//     res.status(500).json({ message: "Error generating NOC", error });
//   }
// });

// module.exports = router;





const express = require("express");
const PDFDocument = require("pdfkit");
const QRCode = require("qrcode");
const fs = require("fs");
const path = require("path");
const cloudinary = require("../config/cloudinary");
const NOC = require("../models/NOC"); // MongoDB model for storing NOC data
const Application = require("../models/Application");

const router = express.Router();

// Ensure temp directory exists
const tempDir = path.join(__dirname, "../temp");
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
}

// Generate and Upload NOC Certificate
// router.post("/generate-noc/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     // 1️⃣ Fetch the approved application from DB
//     const application = await Application.findById(id);
//     if (!application || application.status !== "Approved") {
//       return res.status(404).json({ message: "Approved application not found" });
//     }

//     // 2️⃣ Generate QR Code
//     const qrPath = path.join(tempDir, `qrcode_${id}.png`);
//     const qrData = `Application ID: ${application._id}\nOwner: ${application.ownerName}\nStatus: Approved`;
//     await QRCode.toFile(qrPath, qrData);

//     // 3️⃣ Generate PDF Certificate
//     const pdfPath = path.join(tempDir, `NOC_${id}.pdf`);
//     const doc = new PDFDocument();
//     const stream = fs.createWriteStream(pdfPath);
//     doc.pipe(stream);

//     doc.fontSize(20).text("FIRE SAFETY NOC CERTIFICATE", { align: "center" });
//     doc.moveDown();
//     doc.fontSize(12).text(`Application ID: ${application._id}`);
//     doc.text(`Owner Name: ${application.ownerName}`);
//     doc.text(`Email: ${application.email}`);
//     doc.text(`Contact: ${application.contact}`);
//     doc.text(`Address: ${application.address}`);
//     doc.text(`Issued On: ${new Date().toLocaleDateString()}`);
//     const expiryDate = new Date();
//     expiryDate.setFullYear(expiryDate.getFullYear() + 3);
//     doc.text(`Expiry Date: ${expiryDate.toLocaleDateString()}`);
//     doc.moveDown();
//     doc.text("This is a digitally generated NOC certificate and is valid for legal purposes.", { align: "center" });

//     // Embed QR Code in PDF
//     doc.image(qrPath, { fit: [100, 100], align: "center" });

//     doc.end();

//     // 4️⃣ Wait for PDF to be fully written
//     stream.on("finish", async () => {
//       console.log(`PDF Generated: ${pdfPath}`);

//       // 5️⃣ Respond with local file path (check before uploading)
//       res.status(200).json({
//         message: "NOC generated successfully (stored locally).",
//         pdfPath: pdfPath,
//         qrPath: qrPath
//       });

//     //   🔴 Uncomment below when ready to upload to Cloudinary
//       const cloudResult = await cloudinary.uploader.upload(pdfPath, { resource_type: "raw" });
//       console.log(`Uploaded to Cloudinary: ${cloudResult.secure_url}`);

//       // 🔴 Uncomment to save NOC to DB after Cloud Upload
//       const noc = new NOC({
//         applicationId: application._id,
//         ownerName: application.ownerName,
//         email: application.email,
//         contact: application.contact,
//         nocUrl: cloudResult.secure_url,
//         issuedOn: new Date(),
//       });
//       await noc.save();
//     });

//   } catch (error) {
//     console.error("Error generating NOC:", error);
//     res.status(500).json({ message: "Error generating NOC", error });
//   }
// });

// Generate and Upload NOC Certificate
router.post("/generate-noc/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // ✅ Check if an NOC already exists for this application
        const existingNOC = await NOC.findOne({ applicationId: id });
        if (existingNOC) {
            return res.status(200).json({
                message: "NOC already generated.",
                nocUrl: existingNOC.nocUrl
            });
        }

        // ✅ Fetch the approved application from DB
        const application = await Application.findById(id);
        if (!application || application.status !== "Approved") {
            return res.status(404).json({ message: "Approved application not found" });
        }

        // ✅ Generate QR Code
        const qrPath = path.join(tempDir, `qrcode_${id}.png`);
        const qrData = `Application ID: ${application._id}\nOwner Name: ${application.ownerName}\nBusinessName Name: ${application.businessName}\nStatus: Approved`;
        await QRCode.toFile(qrPath, qrData);

        // ✅ Generate PDF Certificate
        //   const pdfPath = path.join(tempDir, `NOC_${id}.pdf`);
        //   const doc = new PDFDocument();
        //   const stream = fs.createWriteStream(pdfPath);
        //   doc.pipe(stream);

        //   doc.fontSize(20).text("FIRE SAFETY NOC CERTIFICATE", { align: "center" });
        //   doc.fontSize(16).text("GOVERNMENT OF INDIA", { align: "center" });
        //   const logoPath = path.join(__dirname, "../assets/govt_logo.png"); // Make sure this image is in your project directory
        //   doc.image(logoPath, { fit: [80, 80], align: "center" });
        //   doc.moveDown();
        //   doc.moveDown();
        //   doc.fontSize(12).text(`Application ID: ${application._id}`);
        //   doc.text(`Owner Name: ${application.ownerName}`);
        //   doc.text(`Business Name: ${application.businessName}`);
        //   doc.text(`Email: ${application.email}`);
        //   doc.text(`Contact: ${application.contact}`);
        //   doc.text(`Address: ${application.address}`);

        //   doc.text(`Issued On: ${new Date().toLocaleDateString()}`);
        //   const expiryDate = new Date();
        //   expiryDate.setFullYear(expiryDate.getFullYear() + 3);
        //   doc.text(`Expiry Date: ${expiryDate.toLocaleDateString()}`);
        //   doc.text(`This is AI generated Risk Score (so this subject is not generated by human , it might be false): ${application.riskScore}`);
        //   doc.moveDown();
        //   doc.text("This is a digitally generated NOC certificate and is valid for legal purposes.", { align: "center" });

        //   // Embed QR Code in PDF
        //   doc.image(qrPath, { fit: [100, 100], align: "center" });

        //   doc.end();
        const pdfPath = path.join(tempDir, `NOC_${id}.pdf`);
        const doc = new PDFDocument();
        const stream = fs.createWriteStream(pdfPath);
        doc.pipe(stream);

        // Title
        doc.fontSize(20).text("FIRE SAFETY NOC CERTIFICATE", { align: "center" });
        doc.moveDown(0.5);
        doc.fontSize(16).text("GOVERNMENT OF INDIA", { align: "center" });
        doc.moveDown(1);

        // Insert the Government Emblem below the title and center it
        const logoPath = path.join(__dirname, "../assets/govt_logo.png");
        doc.image(logoPath, { width: 80, align: "center" });
        doc.moveDown(5);

        // Application Details
        doc.fontSize(12).text(`Application ID: ${application._id}`, { align: "left" });
        doc.text(`Owner Name: ${application.ownerName}`);
        doc.text(`Business Name: ${application.businessName}`);
        doc.text(`Email: ${application.email}`);
        doc.text(`Contact: ${application.contact}`);
        doc.text(`Address: ${application.address}`);
        doc.moveDown(1);

        // Expiry Details
        doc.text(`Issued On: ${new Date().toLocaleDateString()}`);
        const expiryDate = new Date();
        expiryDate.setFullYear(expiryDate.getFullYear() + 3);
        doc.text(`Expiry Date: ${expiryDate.toLocaleDateString()}`);
        doc.moveDown(1);

        // AI Risk Score Disclaimer
        doc.text(
            `This is AI generated Risk Score (so this subject is not generated by human, it might be false): ${application.riskScore}`
        );
        doc.moveDown(1);

        // Legal Notice
        doc.text("This is a digitally generated NOC certificate and is valid for legal purposes.", {
            align: "center",
        });
        doc.moveDown(1);

        // QR Code
        doc.image(qrPath, { width: 100, align: "center" });

        doc.end();

        stream.on("finish", async () => {
            console.log(`PDF Generated: ${pdfPath}`);

            // ✅ Upload PDF to Cloudinary
            const cloudResult = await cloudinary.uploader.upload(pdfPath, {
                resource_type: "raw",
                format: "pdf",
                public_id: `NOC_${id}`
            });

            console.log("Cloudinary Upload Response:", cloudResult);

            // ✅ Save NOC to DB
            const noc = new NOC({
                applicationId: application._id,
                ownerName: application.ownerName,
                businessName: application.businessName,
                email: application.email,
                contact: application.contact,
                nocUrl: cloudResult.secure_url,
                issuedOn: new Date(),
            });
            await noc.save();

            res.status(200).json({
                message: "NOC generated and uploaded successfully",
                nocUrl: cloudResult.secure_url
            });
        });

    } catch (error) {
        console.error("Error generating NOC:", error);
        res.status(500).json({ message: "Error generating NOC", error });
    }
});


router.get("/status/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const noc = await NOC.findOne({ applicationId: id });

        if (noc) {
            return res.status(200).json({ nocUrl: noc.nocUrl, issuedOn: noc.issuedOn });
        } else {
            return res.status(200).json({ nocUrl: null });
        }
    } catch (error) {
        console.error("Error checking NOC status:", error);
        res.status(500).json({ message: "Error checking NOC status" });
    }
});

// ✅ Fetch NOC details for a specific user based on email
router.get("/user/nocs", async (req, res) => {
    try {
        const { email } = req.query; // Get email from query params

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        // Find all NOCs associated with the given email
        const nocs = await NOC.find({ email });

        if (!nocs.length) {
            return res.status(404).json({ message: "No NOCs found for this user." });
        }

        res.status(200).json(nocs);
    } catch (error) {
        console.error("❌ Error fetching NOCs:", error);
        res.status(500).json({ message: "Error fetching NOCs", error });
    }
});

module.exports = router;
