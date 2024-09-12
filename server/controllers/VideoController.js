import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import connectDB from "../config/DbConnection.js";
import { Readable } from "stream";
import path from "path";

// @desc Upload video to DB
// @route POST /api/videos/upload
const uploadVideo = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const { gfs, conn } = await connectDB();

  const readableStream = Readable.from(req.file.buffer);
  const filename = `${path.basename(
    file.originalname,
    path.extname(file.originalname)
  )}-${Date.now()}${path.extname(file.originalname)}`;

  const uploadStream = gfs.openUploadStream(filename);
  readableStream
    .pipe(uploadStream)
    .on("error", (err) => {
      console.error("Error uploading file:", err);
      return res.status(500).send({ message: "Error uploading file." });
    })
    .on("finish", () => {
      return res.status(201).json({ message: "File uploaded successfully." });
    });
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
