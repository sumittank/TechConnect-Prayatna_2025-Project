// const express = require('express');
// const connectDB = require('./config/db');
// const authRoutes = require('./routes/authRoutes');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();

// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/auth', authRoutes);

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));



// const express = require('express');
// const session = require('express-session');
// const dotenv = require('dotenv');
// const mongoose = require('mongoose');
// const cors = require('cors');


// const dashboardRoutes = require("./routes/dashboard");
// const usersRoutes = require("./routes/users");
// const authRoutes = require('./routes/authRoutes');
// const applicationRoutes = require("./routes/applicationRoutes");
// const inspectionRoutes = require("./routes/inspectionRoutes");
// const nocRoutes = require("./routes/nocRoutes");
// const searchRoutes = require("./routes/search");


// dotenv.config(); // Load environment variables

// const app = express();

// app.use(cors({
//     origin: 'http://localhost:5174',  // Replace with your frontend URL
//     credentials: true,  // Allow cookies & authentication headers
//   }));
// app.use(express.json()); // Middleware for JSON parsing

// // ✅ Fix: Add express-session with a secret key
// app.use(session({
//     secret: process.env.SESSION_SECRET || 'defaultsecret', // Use environment variable or fallback
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false } // Change to true if using HTTPS
// }));

// // Database connection
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log("✅ MongoDB Connected"))
//     .catch(err => console.log(err));

// // Routes
// app.use('/api/auth', authRoutes);
// app.use("/api/users", usersRoutes);
// app.use("/api", applicationRoutes);
// app.use("/api/inspection", inspectionRoutes);
// app.use("/api/noc", nocRoutes);
// app.use("/api/dashboard", dashboardRoutes);
// app.use("/api", searchRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require("multer");
const path = require("path");

const dashboardRoutes = require("./routes/dashboard");
const usersRoutes = require("./routes/users");
const authRoutes = require('./routes/authRoutes');
const applicationRoutes = require("./routes/applicationRoutes");
const inspectionRoutes = require("./routes/inspectionRoutes");
const nocRoutes = require("./routes/nocRoutes");
const searchRoutes = require("./routes/search");
const aadhaarRoutes = require("./routes/aadhaarRoutes");
const analyticsRoutes = require('./routes/analytics');
const identityRoutes = require("./routes/identityRoutes");
// const { storeNOC, getNOC } = require('./blockchain/contractService');

dotenv.config(); // Load environment variables

const app = express();


app.use(cors({
    origin: 'http://localhost:5174',  // Replace with your frontend URL
    credentials: true,  // Allow cookies & authentication headers
}));

// Middleware for JSON parsing
app.use(express.json()); // ✅ Add this to parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // ✅ Parses URL-encoded bodies

// ✅ Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'defaultsecret', // Use environment variable or fallback
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Change to true if using HTTPS
}));

// ✅ Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.log(err));

// ✅ Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage });

// ✅ Aadhaar validation endpoint
app.use("/api", aadhaarRoutes);

// ✅ Existing Routes
app.use('/api/auth', authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api", applicationRoutes);
app.use("/api/inspection", inspectionRoutes);
app.use("/api/noc", nocRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api", searchRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api", identityRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
