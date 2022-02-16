const express = require("express")
const dotenv = require("dotenv").config()
const colors = require("colors")
const connectDb = require("./config/db")
const userRoutes = require("./routes/userRoutes")
const { errorHandler } = require("./middleware/errorMiddleware")
const PORT = process.env.PORT || 5000

connectDb();
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome" })
})

app.use("/api/users", userRoutes)
app.use("/api/tickets", require("./routes/ticketRoutes"))

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))