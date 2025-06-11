import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoute from "./routes/authRoute";
import userRouter from './routes/userRouter';
import movieRouter from './routes/movieRouter';

dotenv.config();

// App creation
const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || "";



// The data format (JSON)
app.use(express.json());


app.use("/api/auth", authRoute);
app.use("/api/users", userRouter);
app.use("/api/movies", movieRouter);

// app.use(fileUpload());

// //rota inicial
// app.use('/api', productRouter);

app.get('/', (req, res) => {
    res.send('API de trailers de filmes a funcionar!');
  });
  


//connect to DB
const startApp = async () => {
    try {
      mongoose.set('strictQuery', true);
      await mongoose.connect(MONGO_URI);
      console.log("Successefully connected to MongoDB");
  
      //inicia a app
      app.listen(PORT, () => {
        if (process.env.NODE_ENV === 'development') {
          console.log(`Server is running in development mode on port ${PORT}`);
        } else {
          console.log(`Server is running in production mode on port ${PORT}`);
        }
      });
    } catch (error) {
      console.log('Error connecting to MongoDB:', error);
    }
  }
  
  startApp();