import { body } from 'express-validator'
import User from '../db/models/User'
import validateExpander from '../helpers/validate-expander'
import { ClientError } from '../helpers/error-types'
import TokenService from '../services/token.service'

const register = async (req, res, next) => {
  const { email, password } = req.body

  const candidate = await User.findOne({ email })
  if (candidate) throw new ClientError('Користувач з таким e-mail вже існує')

  const user = new User({
    email,
    password,
  })

  const { access, refresh } = await TokenService.createToken(user)

  res.cookie('refresh', refresh)

  return await user
    .save()
    .then(({ _doc }) => {
      return { ..._doc, hashedPassword: undefined, access }
    })
    .catch(next)
}

const login = async (req, res, next) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (!user) throw new ClientError('Користувача не існує')

  const passwordMatch = await user.passwordIsMatch(
    password,
    user.hashedPassword
  )

  if (!passwordMatch) throw new ClientError('Невірний пароль')

  const { access, refresh } = await TokenService.createToken(user)
    .then((data) => data)
    .catch(next)

  res.cookie('refresh', refresh)

  return { access }
}

// validate
const validate = (method) => {
  switch (method) {
    case 'register':
      return validateExpander([
        body('email', 'Некорректний e-mail').exists(),
        body('password', 'Пароль має бути більше 6 символів')
          .exists()
          .isLength({ min: 6 }),
      ])
  }
}

export { register, login, validate }
