import { Request, Response, request } from "express"
import { moviesServices } from "../services"
import { IMovies} from "../interfaces"

const createMovies = async (request: Request, response: Response): Promise<Response> => {

    const movies: IMovies = await moviesServices.createMovies(request.body)

    return response.status(201).json(movies)
}

const listMovies = async (request: Request, response: Response): Promise<Response> => {

    const moviesPagination = await moviesServices.listMovies(request.query)

    return response.status(200).json(moviesPagination)
}

const updateMovies = async (request: Request, response: Response): Promise<Response> => {

    const moviesData: IMovies = await moviesServices.updateMovies(request.body, request.params.id)

    return response.status(200).json(moviesData)
}



const deleteMovies = async (request: Request, response: Response): Promise<Response> => {

    await moviesServices.deleteMovies(request.params.id)

    return response.status(204).send()
}

export default { createMovies, listMovies, updateMovies, deleteMovies }