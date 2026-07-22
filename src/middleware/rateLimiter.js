import rateLimit from '../config/upstash.js'

const rateLimiter = async (req, res, next) => {
  try {
    // Here we just kept it simple
    // in a real world app you'd like ato put the userId or ipAddress as your key
    const { success } = await rateLimit.limit('my-rate-limit')

    if (!success) {
      return res.status(429).json({ error: 'Too many requests' })
    }

    next()
  } catch (error) {
    console.error('Rate limiting error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export default rateLimiter
