import { createClient } from 'redis'

class RedisService {
  constructor() {
    this.client = createClient()
    this.client.on('error', (err) => console.log('Redis Client Error', err))
    this.connect().catch((err) => console.log(err))
  }

  async connect() {
    await this.client.connect()
  }

  async get(key) {
    return await this.client.get(key)
  }

  async set(key, value) {
    return await this.client.set(key, value)
  }
}

export default new RedisService()
