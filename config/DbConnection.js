import mongoose from "mongoose";
// MongoDB URI
const mongoURI =
  "mongodb+srv://siranjivi:sivi@learncluster.aquo3ks.mongodb.net/UploadVideo";
// MongoDB connection and GridFS initialization
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoURI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("MongoDB connected");

    const gfs = new mongoose.mongo.GridFSBucket(conn.connection.db, {
      bucketName: "uploads",
    });
    // Return both the connection and the GridFS instance
    return { conn, gfs };
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
