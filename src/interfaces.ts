interface IMovies {
    id: Number,
    name: string,
    description?: string | undefined,
    duration: number,
    price: number
}

type IMoviesRequest = Omit<IMovies, "id">

export { IMovies, IMoviesRequest}