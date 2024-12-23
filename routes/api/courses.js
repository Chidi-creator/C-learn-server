const express = require("express");
const router = express.Router();
const multer = require("multer");
const { createCourses, getAllCourses, getSingleCourse } = require("../../controllers/courses");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files"); // folder name where all the files go
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/courses", upload.single("thumbnail"), createCourses);

router.get("/courses", getAllCourses);

router.get('/course/:id', getSingleCourse)

module.exports = router;
