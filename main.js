require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose
  .connect(process.env.DATABASE_URL)
  .then((connection) => {
    const app = express();
app.use(cors())
    // app.use(
    //   cors({
    //     credentials: true,
    //     origin: ["http://127.0.0.1:5501"],
    //     optionsSuccessStatus: 200,
    //   })
    // );

    app.use(express.json());
    
    const authRoute = require("./routes/auth.route");
    const adminRoute = require("./routes/admin.route");
    const passwordRoute = require("./routes/passwordReset.route");
    const studentRoute = require("./routes/student.route");
    const teacherRoute = require("./routes/teacher.route");
    const courseRoute = require("./routes/course.route");


    app.use("/reset", passwordRoute);
    app.use("/auth", authRoute);
    app.use("/api/admin", adminRoute);
    app.use("/api/students", studentRoute);
    app.use("/api/teachers", teacherRoute);
    app.use('/api/courses', courseRoute);


    app.listen(process.env.PORT, () => {
      console.log( `Application listening on http://localhost:${process.env.PORT} `);
    });
  })
  .catch((err) => {
    console.error(err);
  });
