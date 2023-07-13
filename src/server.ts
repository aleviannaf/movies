import app from "./app"
import { startDatabade } from "./database"

app.listen(3000, async () => {
    await startDatabade()
    console.log("Server running on http://localhost:3000")
})