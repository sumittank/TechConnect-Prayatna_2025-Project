// const express = require('express');
// const session = require('express-session');
// const dotenv = require('dotenv');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const multer = require("multer");
// const path = require("path");

// const dashboardRoutes = require("./routes/dashboard");
// const usersRoutes = require("./routes/users");
// const authRoutes = require('./routes/authRoutes');
// const applicationRoutes = require("./routes/applicationRoutes");
// const inspectionRoutes = require("./routes/inspectionRoutes");
// const nocRoutes = require("./routes/nocRoutes");
// const searchRoutes = require("./routes/search");
// const aadhaarRoutes = require("./routes/aadhaarRoutes");
// const analyticsRoutes = require('./routes/analytics');
// const identityRoutes = require("./routes/identityRoutes");
// // const { storeNOC, getNOC } = require('./blockchain/contractService');

// dotenv.config();

// const app = express();


// app.use(cors({
//     origin: 'http://localhost:5173',
//     credentials: true, 
// }));


// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


// app.use(session({
//     secret: process.env.SESSION_SECRET || 'defaultsecret',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false } 
// }));


// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log("✅ MongoDB Connected"))
//     .catch(err => console.log(err));

// const storage = multer.diskStorage({
//     destination: "./uploads/",
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname));
//     },
// });
// const upload = multer({ storage });


// app.use("/api", aadhaarRoutes);


// app.use('/api/auth', authRoutes);
// app.use("/api/users", usersRoutes);
// app.use("/api", applicationRoutes);
// app.use("/api/inspection", inspectionRoutes);
// app.use("/api/noc", nocRoutes);
// app.use("/api/dashboard", dashboardRoutes);
// app.use("/api", searchRoutes);
// app.use("/api/analytics", analyticsRoutes);
// app.use("/api", identityRoutes);



// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));



const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require("multer");
const path = require("path");
const MongoStore = require('connect-mongo');

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

dotenv.config();

const app = express();

https://fire-dept.netlify.app/login

app.use(cors({
    origin: ['https://fire-dept.netlify.app'], // Your Netlify frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const RedisStore = require('connect-redis')(session);
// const redis = require('redis');

// const redisClient = redis.createClient({ url: process.env.REDIS_URL });

// app.use(session({
//     store: new RedisStore({ client: redisClient }),
//     secret: 'your-session-secret',
//     resave: false,
//     saveUninitialized: false,
// }));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.log(err));

// Use in-memory storage for Multer (no disk storage)
const storage = multer.memoryStorage();

// Configure multer to use memory storage
const upload = multer({ storage });

// Example usage of upload middleware for a single file (modify as per your needs):
// app.post('/upload', upload.single('file'), (req, res) => {
//     console.log(req.file.buffer); // This is where you can work with the file buffer
//     res.send("File uploaded successfully");
// });

app.use("/api", aadhaarRoutes);

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
