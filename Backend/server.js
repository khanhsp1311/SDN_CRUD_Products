import express from 'express'
import * as dotenv from 'dotenv'
import { userRouter, productRouter, brandRouter, categoryRouter } from './routes/index.js'
import ConnectDB from './database/database.js'
import cors from 'cors';
// Add middleware
import checkToken from './auth/authorization.js'
// Create web server
const app = express()
app.use(express.json()) // Khai bao dinh dang du lieu ma express se lam viec
app.use(cors({
    origin: '*'
}));
// Add middleware to Express server => Kiem soat tat ca cac request di vao server
// app.use(checkToken)

// Load .evn file: config file
dotenv.config()

// Basic routes: Root router
app.get('/', (req, res) => {
    res.send("Hello RESTful API.")
})

app.use('/users', userRouter) // localhost:9999/users
app.use('/products', productRouter)
app.use('/brands', brandRouter)
app.use('/categories', categoryRouter)

const port = process.env.PORT || 8080

app.listen(port, async () => {
    await ConnectDB()
    console.log(`Node RESTful API running on port ${port}`)
})