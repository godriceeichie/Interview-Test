import mongoose from 'mongoose'
import express from 'express'
import dotenv from 'dotenv'
import router from './routes/route.js'
import cors from 'cors'

// Load environment variables from the .env file
dotenv.config()
const app = express()
const port = process.env.PORT || 4000

// Enable Cross-Origin Resource Sharing for all routes
app.use(cors())

// Parse incoming JSON requests
app.use(express.json())

//Connect to database and start the server
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected to database')
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    })
    .catch(err => console.log(err))

// Use the defined routes under the '/api' endpoint    
app.use('/api', router)