import { request, response } from "express";
import File from "../models/file.js";

export const uploadImage = async (request, response) => {
  const fileObj = {
    path: request.file.path,
    name: request.file.originalname,
  };

  try {
    const file = await File.create(fileObj);
    response.status(200);
    //   .json({ path: `https://sharenow-du5l.onrender.com/file/${file._id}` });
    response
      .status(200)
      .json({ path: `https://shrnow.onrender.com/file/${file._id}` });
    //   console.log(file);
  } catch (error) {
    console.log("error on image-controler", error.message);
    response.status(500).json({ error: error.message });
  }
};

export const downloadImage = async (request, response) => {
  try {
    const file = await File.findById(request.params.fileId);
    file.downloadContent++;
    await file.save();

    response.download(file.path, file.name);
  } catch (error) {
    console.log("error is download", error.message);
    response.status(500).json({ error: error.message });
  }
};
