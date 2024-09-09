import mongoose from "mongoose";
import asyncHandler from "express-async-handler";

// @desc Upload video to DB
// @route POST /api/videos/upload
const uploadVideo = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: "No file uploaded" });
    return;
  }
  res.status(201).json({ file: req.file });
});

// @desc Get a video by ID
// @route GET /api/videos/:id
const getVideoById = asyncHandler(async (req, res) => {
  const gfs = req.app.locals.gfs;
  const { id } = req.params;

  const _id = new mongoose.Types.ObjectId(id);
  const files = await gfs.find({ _id }).toArray();

  if (!files || files.length === 0) {
    res.status(404).json({ error: "File not found" });
    return;
  }

  res.set({
    "Content-Type": files[0].contentType,
    "Content-Disposition": `attachment; filename="${files[0].filename}"`,
  });

  const readStream = gfs.openDownloadStream(_id);
  readStream.pipe(res);
});

// @desc Delete a video by ID
// @route DELETE /api/videos/:id
const deleteVideoById = asyncHandler(async (req, res) => {
  const gfs = req.app.locals.gfs;
  const { id } = req.params;

  const _id = new mongoose.Types.ObjectId(id);
  await gfs.delete(_id);

  res.status(200).json({ message: "File deleted successfully" });
});

// @desc Get all videos
// @route GET /api/videos
const getAllVideos = asyncHandler(async (req, res) => {
  const gfs = req.app.locals.gfs;
  const files = await gfs.find().toArray();

  if (!files || files.length === 0) {
    res.status(404).json({ error: "No files found" });
    return;
  }

  res.status(200).json(files);
});

export { uploadVideo, getVideoById, deleteVideoById, getAllVideos };
