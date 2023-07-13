import { NextFunction, Request, Response } from "express";
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

export {validNameMovies}