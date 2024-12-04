import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import cors from 'cors'
import morgan from 'morgan'
import connectDB from './config/db.js'

import todoRouter from './routers/todoRoute.js'

// dotenv configure
dotenv.config()

// database connection
connectDB()

const app = express()


// middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))


// router
app.use('/api/v1/todo', todoRouter);


// rest API
app.get('/', (req, res) => {
    res.send('<h1>Welcome to Todo Application</h1>')
})

// port number
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server Running on mode ${process.env.DEV_MODE}`.bgRed)
    console.log(`http://localhost:${PORT}`.yellow);
})


