const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const connDB = require("./config/connectDB");
const data = require("./model/unis.json");
const uniNamesRoutes = require("./routes/api/uninames");
const registerRoutes = require("./routes/api/registerUser");
const userRoutes = require("./routes/api/User");
const loginRoute = require("./routes/api/authentiateUser");
const courseRoutes = require("./routes/api/courses");
const enrollTeacherRoutes = require("./routes/api/enrollTeacher");
const TeacherCourses = require("./model/enrollTeacher");
const corsOptions = require("./config/corsoptions");
const studentEnrollRoutes = require("./routes/api/studentCourses");
const courseRecommendationRoutes = require("./routes/api/courseRecommendations");
const statisticsRoute = require("./routes/api/statistics");
const uploadResourcesRoutes = require('./routes/api/resources')
app.use("/files", express.static("files"));

const PORT = 3000;
require("dotenv").config();
connDB();


app.use(cors(corsOptions));
app.use(express.json());

// connDB();

//ROUTES
//routes for getting university names
app.use("/university", uniNamesRoutes);
//routes for registering users
app.use("/register", registerRoutes);
// routes for loggin in users
app.use("/auth", loginRoute);
//routes for courses
app.use("/admin", courseRoutes);
//  routes for getting all users; teachers and students
app.use("/admin", userRoutes);

//routes for enrolling teachers
app.use("/admin", enrollTeacherRoutes);

app.get("/check", async (req, res) => {
  const show = await TeacherCourses.find({}).populate("course_id");

  // const details = show.map(detail => (
  //   {
  //     teachername: detail.teacher_id.username,
  //     coursename: detail.course_id.coursename
  //   }
  // ))

  res.json(show);
});
// routes for enrolling students
app.use("/students", studentEnrollRoutes);

//routes for recommending courses
app.use("/", courseRecommendationRoutes);

//routes for getting stats
app.use("/admin", statisticsRoute);

//routes for uploading resources
app.use('/teacher', uploadResourcesRoutes)







app.use("/*", (req, res) => {
  res.send("no page like this");
});

mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    console.log(`server running on port ${PORT} and connected to database`);
  });
});
