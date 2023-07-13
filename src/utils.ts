import { QueryResult } from "pg"
import { client } from "./database"
import { IMovies } from "./interfaces"

const countMovies = async() =>{

    const queryString: string = `
    SELECT 
        COUNT(*)
    FROM
        movies;
    `

    const queryResult: QueryResult<IMovies> = await client.query(queryString)

    return parseInt(Object.values(queryResult.rows[0])[0])

}

export {countMovies}