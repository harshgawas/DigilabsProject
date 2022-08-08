import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import adminRoutes from "./routes/admin";
import noticeRoutes from "./routes/notice";
import contactRoutes from "./routes/contact";
import galleryRoutes from "./routes/gallery";

dotenv.config();

const app = express();

//Importing Routes

//Database Connect
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//My routes
app.use("/api/admin", adminRoutes);
app.use("/api/notice", noticeRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/gallery", galleryRoutes);

//Error handling and returning error as a variable error
app.use(function (err, req, res, next) {
  console.log(err);
  res.status(err.statusCode).json({ error: err.message });
});

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`App fired at ${port}`);
});
