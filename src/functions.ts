import { Request, Response, request } from "express"
import format from "pg-format"
import { IMovies, IMoviesRequest } from "./interfaces"
import { QueryConfig, QueryResult } from "pg"
import { client } from "./database"
import { countMovies } from "./utils"

const createMovies = async(request: Request, response: Response): Promise<Response> =>{

    const movieData: IMoviesRequest = request.body

    const queryString: string = format(`
        INSERT INTO 
            movies (%I) 
        VALUES 
            (%L)
        RETURNING *;
    `,
        Object.keys(movieData),
        Object.values(movieData)
    )

    const queryResult: QueryResult<IMovies> = await client.query(queryString);

    
    return response.status(201).json(queryResult.rows[0])
}

const listMovies = async (request: Request, response: Response): Promise<Response> => {
    
    let page = Number(request.query.page) || 1
    let perPage = Number(request.query.perPage) || 5

    const total = await countMovies()

    const queryString: string = `
        SELECT 
            *
        FROM
            movies
        OFFSET
            $1
        LIMIT
            $2;
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [ perPage * (page - 1), perPage]
    }

    const queryResult: QueryResult<IMovies> = await client.query(queryConfig)



    const baseUrl: string = `http://localhost:3000/movies`
    const prevPage: string | null = page == 1 ? null : `${baseUrl}?page=${page - 1}&perPage=${perPage}`
    const nextPage: string | null = page >= total/perPage ? null : `${baseUrl}?page=${page + 1}&perPage=${perPage}`

    

    const pagination = {
        prevPage,
        nextPage,
        currentPage: page,
        totalItens: total,
        data: queryResult.rows
    }


    return response.status(200).json(pagination)
}


const updateMovies = async (request: Request, response: Response): Promise<Response> =>{
    const id = parseInt(request.params.id)
    const movieData: IMoviesRequest = request.body

    const queryString: string = format(`
        UPDATE
            movies
            SET(%I) = ROW(%L)
        WHERE
            id = $1
        RETURNING *;
    `,
        Object.keys(movieData),
        Object.values(movieData)
    )

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id]
    }

    const queryResult: QueryResult<IMovies> = await client.query(queryConfig)

    return response.status(200).json(queryResult.rows[0])
}

export {createMovies, listMovies, updateMovies}