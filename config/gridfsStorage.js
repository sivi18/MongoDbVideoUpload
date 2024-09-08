const { GridFsStorage } = require("multer-gridfs-storage");
const path = require("path");

// MongoDB URI
const mongoURI =
  "mongodb+srv://siranjivi:sivi@learncluster.aquo3ks.mongodb.net/UploadVideo";

// Create GridFs Storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return {
      filename: `${path.basename(
        file.originalname,
        path.extname(file.originalname)
      )}-${Date.now()}${path.extname(file.originalname)}`,
      bucketName: "uploads", // Ensure the correct bucket name is provided
    };
  },
  options: { useUnifiedTopology: true },
});

storage.on("connection", (db) => {
  console.log("GridFS storage connected to database");
});

storage.on("error", (err) => {
  console.error("GridFS Storage Error:", err);
});

module.exports = storage;
