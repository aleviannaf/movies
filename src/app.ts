import express, { json, Application, Request, Response } from "express";
import { moviesRouter } from "./routers";


const app: Application = express()
app.use(json())

app.use("/movies", moviesRouter)

export default app