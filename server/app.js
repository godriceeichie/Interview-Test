import mongoose from 'mongoose'
import express from 'express'
import dotenv from 'dotenv'
import router from './routes/route.js'
import cors from 'cors'

dotenv.config()
const app = express()
const port = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected to database')
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    })
    .catch(err => console.log(err))

app.use('/api', router)