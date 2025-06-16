import { FilterQuery } from "mongoose";
import movieModel, { IMovie } from "../models/movieModel";

export const getAllMovies = async () => {
  return await movieModel.find();
};

export const getMoviesById = async (id: string) => {
  return await movieModel.findById(id);
};

export const createMovie = async (movieData: IMovie) => {
  const movie = new movieModel(movieData);
  return await movie.save();
};

export const updateMovie = async (id: string, updateData: Partial<IMovie>) => {
  return await movieModel.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteMovie = async (id: string) => {
  return await movieModel.findByIdAndDelete(id);
};

export const searchMovies = async (
  search: string,
  sortBy: string,
  page: number,
  limit: number
) => {
  const query: FilterQuery<IMovie> = {};
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { genres: { $regex: search, $options: "i" } },
    ];
  }
  const sortByOptions: Record<string, 1 | -1> = {};
  if (sortBy) {
    sortByOptions[sortBy] = 1;
  } else {
    sortByOptions["releaseDate"] = -1;
  }

  const skip = (page - 1) * limit;

  const movies = await movieModel
    .find(query)
    .sort(sortByOptions)
    .skip(skip)
    .limit(limit);

  return movies;
};
