const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const cateRoute = require("./routes/categories");
const cors = require("cors");

// Connect to DB:
dotenv.config();
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to DB!");
    app.listen(5000, () => {
      console.log("Backend is running");
    });
  })
  .catch((err) => console.log(err));

// Middleware:
app.use(express.json());
app.use(cors());

// Routes:
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", cateRoute);
