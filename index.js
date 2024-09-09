// index.js
import express from "express";
import connectDB from "./config/DbConnection.js";
import videoRoutes from "./routes/video.js";

// Initialize the app
const app = express();
app.use(express.urlencoded({ extended: true }));

// Initialize MongoDB and GridFS
const initializeDB = async () => {
  const { conn, gfs } = await connectDB(); // Destructure to get gfs

  app.locals.gfs = gfs; // Store gfs in app.locals to access in routes
};

// Initialize the DB
initializeDB();

// Use Routes
app.use("/api/videos", videoRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
