import express from "express";
import multer from "multer";
import storage from "../middleware/gridfsStorage.js";
import {
  uploadVideo,
  getVideoById,
  deleteVideoById,
  getAllVideos,
} from "../controllers/VideoController.js";

// Initialize router and multer storage
const router = express.Router();
const upload = multer({ storage });

// Define routes using controller methods
router.post("/upload", upload.single("file"), uploadVideo);
router.get("/:id", getVideoById);
router.delete("/:id", deleteVideoById);
router.get("/", getAllVideos);

export default router;
