const express = require("express");
const router = express.Router();
const multer = require('multer');
const { createResource, getCourseResources } = require("../../controllers/resources");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files"); // folder name where all the files go
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['application/pdf', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'video/mp4', 'video/avi', 'video/mkv', 'video/webm'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit for video files
});

router.post('/upload/resources/:id', upload.single("file"), createResource);

  router.get('/student/get-resources/:id', getCourseResources )

  module.exports = router

