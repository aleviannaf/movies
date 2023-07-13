import { Router } from "express"
import { createMovies, deleteMovies, listMovies, updateMovies } from "../functions"
import { validIdMovies, validNameMovies } from "../middlewares"

const moviesRouter: Router = Router()

moviesRouter.get("", listMovies)
moviesRouter.post("", validNameMovies, createMovies)
moviesRouter.patch("/:id", validIdMovies, validNameMovies, updateMovies)
moviesRouter.delete("/:id", validIdMovies, deleteMovies)

export default moviesRouter