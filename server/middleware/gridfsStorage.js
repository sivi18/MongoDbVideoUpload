import { GridFsStorage } from "multer-gridfs-storage";
import path from "path";

// MongoDB URI
const mongoURI =
  "mongodb+srv://siranjivi:sivi@learncluster.aquo3ks.mongodb.net/UploadVideo";

// Create GridFs Storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  options: { useUnifiedTopology: true }, // Ensure this is included
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = `${path.basename(
        file.originalname,
        path.extname(file.originalname)
      )}-${Date.now()}${path.extname(file.originalname)}`;
      const fileInfo = {
        filename: filename,
        bucketName: "uploads", // Ensure correct bucket name
      };
      resolve(fileInfo);
    });
  },
});

export default storage;
