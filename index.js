import express from "express";
import mongoose from "mongoose";
import videoRoutes from "./routes/video.js";

// Initialize the app
const app = express();
app.use(express.urlencoded({ extended: true }));

// MongoDB URI
const mongoURI =
  "mongodb+srv://siranjivi:sivi@learncluster.aquo3ks.mongodb.net/UploadVideo";

// MongoDB connection and GridFS initialization
mongoose.connect(mongoURI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});
const conn = mongoose.connection;

let gfs;
conn.once("open", () => {
  // Initialize GridFSBucket
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads",
  });
  console.log("DB Connected and GridFS initialized");
  app.locals.gfs = gfs; // Store gfs in app.locals to access in routes
});

// Use Routes
app.use("/api/videos", videoRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
