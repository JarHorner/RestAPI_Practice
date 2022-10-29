const express = require('express')
const bodyParser = require("body-parser")
const v1WorkoutRouter = require('./v1/routes/workoutRoutes')
const { swaggerDocs: V1SwaggerDocs} = require("./v1/swagger")

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use("/api/v1/workouts", v1WorkoutRouter)

app.listen(port, () => {
    console.log(`API is listening on port ${port}`)

    V1SwaggerDocs(app, port)
})