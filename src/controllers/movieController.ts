import { Request, Response } from "express";
import * as movieService from "../utils/movieService";

export const getAllMovies = async (req: Request, res: Response) => {
  try {
    const movies = await movieService.getAllMovies();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: "error fetching movies", error});
  }
};

export const searchMovies = async (req: Request, res: Response) => {
  try {
    const { search, sortBy, page = 1, limit = 10 } = req.query;

    const movies = await movieService.searchMovies(
      search as string,
      sortBy as string,
      Number(page),
      Number(limit)
    );
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: "error searching movies", error });
  }
};

export const createMovie = async (req: Request, res: Response) => {
  try {
    const movieData = req.body;
    const newMovie = await movieService.createMovie(movieData);
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(500).json({ message: "error creating movie", error });
  }
};

export const updateMovie = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const updatedMovie = await movieService.updateMovie(id, updateData);

    if (!updatedMovie) {
      res.status(404).json({ message: "movie not found" });
      return;
    }
    res.json(updatedMovie);
  } catch (error) {
    res.status(500).json({ message: "error update movie", error });
  }
};

export const deleteMovie = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const deletedMovie = await movieService.deleteMovie(id);

    if (!deletedMovie) {
      res.status(404).json({ message: "movie not found" });
      return;
    }
    res.json({ message: "movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "error deleting movie", error });
  }
};
