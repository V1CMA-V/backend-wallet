import dotenv from 'dotenv'
import express from 'express'
import rateLimiter from './middleware/rateLimiter.js'

import { initDB } from './config/db.js'

import transactionsRoute from './routes/transactionsRoute.js'

dotenv.config()

const app = express()

// Middleware
app.use(rateLimiter) // Apply rate limiting middleware to all routes
app.use(express.json())

const PORT = process.env.PORT || 5001

app.use('/api/transactions', transactionsRoute)
// app.use("/api/products", transactions)

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
})
