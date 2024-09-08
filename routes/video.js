const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const storage = require("../config/gridfsStorage");

// Initialize router
const router = express.Router();
const upload = multer({ storage });

// @route POST /api/videos/upload
// @desc Upload video to DB
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    console.log(req.file); // Check if file is available
    res.status(201).json({ file: req.file });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred during file upload" });
  }
});

// @route GET /api/videos/:id
// @desc Get a video by ID
router.get("/:id", async (req, res) => {
  const gfs = req.app.locals.gfs;
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "ID is required" });
  }

  try {
    const _id = new mongoose.Types.ObjectId(id);

    const files = await gfs.find({ _id }).toArray();

    if (!files || files.length === 0) {
      return res.status(404).json({ error: "File not found" });
    }

    res.set({
      "Content-Type": files[0].contentType,
      "Content-Disposition": `attachment; filename="${files[0].filename}"`,
    });

    const readStream = gfs.openDownloadStream(_id);
    readStream.pipe(res); // Stream video file
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while fetching the file" });
  }
});

// @route DELETE /api/videos/:id
// @desc Delete a video by ID
router.delete("/:id", async (req, res) => {
  const gfs = req.app.locals.gfs;
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "ID is required" });
  }

  try {
    const _id = new mongoose.Types.ObjectId(id);

    await gfs.delete(_id);

    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred during deletion" });
  }
});

module.exports = router;
