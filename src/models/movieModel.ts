import mongoose, { Document, Schema } from "mongoose";

export interface IMovie extends Document {
  title: string;
  releaseDate: Date;
  trailerLink: string;
  poster: string;
  genres: string[];
}

const MovieSchema: Schema = new Schema({
  title: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  trailerLink: { type: String, required: true },
  poster: { type: String, required: true },
  genres: { type: [String], required: true },
});

export default mongoose.model<IMovie>("Movie", MovieSchema);
