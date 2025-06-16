import { Request, Response } from "express";
import * as movieService from "../services/movieService";
import { UploadedFile } from "express-fileupload";
import path from "path";

export const getAllMovies = async (req: Request, res: Response) => {
  try {
    const movies = await movieService.getAllMovies();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: "error fetching movies", error });
  }
};

export const getMoviesById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const foundMovie = await movieService.getMoviesById(id);

    if (!foundMovie) {
      res.status(404).json({ message: "movie not found" });
      return;
    }
    res.json(foundMovie);
  } catch (error) {
    res.status(500).json({ message: "error fetching movie by id", error });
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
    // verifica o ficheiro
    if (!req.files?.poster) {
      res.status(400).json({ message: "poster file is required" });
      return;
    }
    const posterFile = req.files.poster as UploadedFile;

    // gera um nome unico
    const posterName = posterFile.name;
    const uploadPath = path.resolve(__dirname, "../static/posters", posterName);

    //move o ficheiro p a pasta
    await posterFile.mv(uploadPath);

    //faz o cretae usando o movieservice
    const movieData = { ...req.body, poster: posterName };

    const newMovie = await movieService.createMovie(movieData);
    res.status(201).json({
      message: "movie created successfully",
      movie: newMovie,
    });
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
    res.json({ message: "movie updated successfully", movie: updatedMovie });
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
