import { NextFunction, Request, Response, request } from "express";
import { QueryConfig, QueryResult } from "pg";
import { IMovies } from "./interfaces";
import { client } from "./database";

const validNameMovies = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> =>{
    const nameMovie = request.body.name

    const queryString: string = `
        SELECT 
            * 
        FROM 
            movies 
        WHERE 
            name = $1;
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [nameMovie]
    }

    const queryResult: QueryResult<IMovies> = await client.query(queryConfig)
    
    if(queryResult.rowCount >= 1){
        return response.status(409).json({"message": "Movie already exists."})
    }

    return next()
}

const validIdMovies = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> =>{
    const id = parseInt(request.params.id)

    const queryString: string = `
        SELECT 
            *
        FROM
            movies
        WHERE
            id = $1;
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id]
    }

    const queryResult: QueryResult<IMovies> = await client.query(queryConfig)

    if(queryResult.rowCount === 0){
        return response.status(404).json({"message": `Movie not found.`})
    }

    return next()
}

export {validNameMovies, validIdMovies}