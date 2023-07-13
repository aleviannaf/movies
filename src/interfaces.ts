interface IMovies {
    id: Number,
    name: string,
    description?: string | undefined,
    duration: number,
    price: number
}

type IMoviesRequest = Omit<IMovies, "id">

type IMoviesUpdate = Partial<IMoviesRequest>;

interface Pagination {
    prevPage: string | null,
    nextPage: string | null,
    currentPage: number,
    totalItens: number,
    data: Array<IMovies>
}



export { IMovies, IMoviesRequest, Pagination, IMoviesUpdate}