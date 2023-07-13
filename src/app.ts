import express, { json, Application, Request, Response } from "express";
import { startDatabade } from "./database";
import { createMovies, listMovies } from "./functions";
import { validNameMovies } from "./middlewares";

const app: Application = express();
app.use(json());

app.get("/movies", listMovies)
app.post("/movies", validNameMovies, createMovies)

app.listen(3000, async () => {
    await startDatabade()
    console.log("Server running on http://localhost:3000")
})