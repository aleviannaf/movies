import express, { json, Application, Request, Response } from "express";
import { startDatabade } from "./database";
import { createMovies, deleteMovies, listMovies, updateMovies } from "./functions";
import { validIdMovies, validNameMovies } from "./middlewares";

const app: Application = express();
app.use(json());

app.get("/movies", listMovies)
app.post("/movies", validNameMovies, createMovies)
app.patch("/movies/:id", validIdMovies, validNameMovies, updateMovies)
app.delete("/movies/:id", validIdMovies, deleteMovies)

app.listen(3000, async () => {
    await startDatabade()
    console.log("Server running on http://localhost:3000")
})