import jwt from 'jsonwebtoken'
import config from 'config'
import Token from '../db/models/Token'
import { AuthorizationError } from '../helpers/error-types'

const SECRET = config.get('SECRET')

class TokenService {
  async createToken(user) {
    const { _id, email } = user
    const id = _id.toString()
    const token = new Token({
      user: id,
      refresh: await this.generateToken({ email, id }, '14d'),
    })
    await token.save()
    return { refresh: token.refresh, access: await this.generateToken(user) }
  }

  async generateToken(payload, expiresIn = '24h') {
    return await jwt.sign({ data: payload }, SECRET, { expiresIn })
  }

  verifyToken(token) {
    console.log(token)
    try {
      return jwt.verify(token, SECRET)
    } catch (err) {
      throw new AuthorizationError(
        'Немає авторизації',
        'Помилка верифікації токена'
      )
    }
  }
}

export default new TokenService()
