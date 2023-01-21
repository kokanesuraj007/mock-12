require("dotenv").config()
const express = require("express")
const cors= require("cors")
const connection = require("./config/dbconnect");
const app = express();
const PORT = process.env.PORT
const userRouter = require("./features/Users/UserRoute")

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/',userRouter)

app.get("/", async (req, res) => {
    res.send("New Backend for Mock_12 routes are 1./signup   2. /login")
});

app.listen(PORT, async () => {
    await connection()
    console.log(`http://localhost:${PORT}`)
})