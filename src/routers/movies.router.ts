import { Router } from "express"
import { validIdMovies, validNameMovies } from "../middlewares"
import moviesControllers from "../controllers/movies.controllers"

const moviesRouter: Router = Router()

moviesRouter.get("", moviesControllers.listMovies)
moviesRouter.post("", validNameMovies, moviesControllers.createMovies)
moviesRouter.patch("/:id", validIdMovies, validNameMovies, moviesControllers.updateMovies)
moviesRouter.delete("/:id", validIdMovies,moviesControllers.deleteMovies)

export default moviesRouter