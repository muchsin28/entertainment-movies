const Movies = "http://localhost:4001/"
const Series = "http://localhost:4002/"

const Redis = require('ioredis')
const redis = new Redis()

module.exports = { Movies, Series, redis }
