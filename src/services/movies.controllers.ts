import format from "pg-format"
import { IMovies, IMoviesRequest, IMoviesUpdate, Pagination } from "../interfaces";
import { client } from "../database";
import { QueryConfig, QueryResult } from "pg";
import { countMovies } from "../utils";

const createMovies = async (playload: IMoviesRequest): Promise<IMovies> => {

    const movieData: IMoviesRequest = playload

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


    return queryResult.rows[0]
}

const listMovies = async (playload: any): Promise<Pagination> => {

    let page = Number(playload.page) || 1
    let perPage = Number(playload.perPage) || 5

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
        values: [perPage * (page - 1), perPage]
    }

    const queryResult: QueryResult<IMovies> = await client.query(queryConfig)

    const baseUrl: string = `http://localhost:3000/movies`
    const prevPage: string | null = page == 1 ? null : `${baseUrl}?page=${page - 1}&perPage=${perPage}`
    const nextPage: string | null = page >= total / perPage ? null : `${baseUrl}?page=${page + 1}&perPage=${perPage}`

    const pagination: Pagination = {
        prevPage,
        nextPage,
        currentPage: page,
        totalItens: total,
        data: queryResult.rows
    }

    return pagination
}

const updateMovies = async (playload: IMoviesUpdate, id: string): Promise<IMovies> => {
    const idMovies = parseInt(id)
    
    const queryString: string = format(`
        UPDATE
            movies
            SET(%I) = ROW(%L)
        WHERE
            id = $1
        RETURNING *;
    `,
        Object.keys(playload),
        Object.values(playload)
    )

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [idMovies]
    }

    const queryResult: QueryResult<IMovies> = await client.query(queryConfig)

    return queryResult.rows[0]
}

const deleteMovies = async (id: string): Promise<void> => {
    const idMovies = parseInt(id)

    const queryString: string = `
        DELETE FROM 
            movies
        WHERE
            id = $1;
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [idMovies]
    }

    await client.query(queryConfig)
}

export default { createMovies, listMovies, updateMovies, deleteMovies }