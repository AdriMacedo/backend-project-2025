import fileUpload from "express-fileupload";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute";
import userRouter from "./routes/userRouter";
import movieRouter from "./routes/movieRouter";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

// App creation
const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || "";

// The data format (JSON)
app.use(express.json());


app.use(fileUpload({
  createParentPath: true,
  limits: {fileSize: 5 * 1024 * 1024},
  abortOnLimit: true,
}));

app.use("/posters", express.static(path.resolve(__dirname, "../static/posters")));


app.use("/auth", authRoute);
app.use("/api/users", userRouter);
app.use("/api/movies", movieRouter);

app.get("/", (req, res) => {
  res.send("API de trailers de filmes a funcionar!");
});

//connect to DB
const startApp = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(MONGO_URI);
    console.log("Successfully connected to MongoDB");

    //inicia a app
    app.listen(PORT, () => {
      if (process.env.NODE_ENV === "development") {
        console.log(`Server is running in development mode on port ${PORT}`);
      } else {
        console.log(`Server is running in production mode on port ${PORT}`);
      }
    });
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
};

startApp();
