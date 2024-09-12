import multer from "multer";

// Create GridFs Storage engine
const storage = multer.memoryStorage();

export default storage;
