import { body } from 'express-validator'
import validateExpander from '../helpers/validate-expander'
import removeUndefined from '../helpers/remove-undefined'

import { ClientError } from '../helpers/error-types'

import Account from '../db/models/Account'

const create = async (req) => {
  const { name, balance, background } = req.body
  const { user } = req

  const account = new Account({ user, name, balance, theme: { background } })
  await account.save()

  return account
}

const change = async (req) => {
  const data = removeUndefined(req.body)
  const { id } = req.params

  const account = await Account.findOneAndUpdate(
    {
      _id: id,
      user: req.user,
    },
    { ...data },
    {
      new: true,
    }
  )

  if (!account) throw new ClientError(['Вказаного рахунку не існує'])

  return account
}

const remove = async (req) => {
  const { id } = req.params

  const account = await Account.findOneAndDelete({
    _id: id,
    user: req.user,
  })

  if (!account) throw new ClientError(['Вказаного рахунку не існує'])
  return true
}

// Validate
const validate = (method) => {
  switch (method) {
    case 'create':
      return validateExpander([
        body('name', 'Назва рахунку повинна бути більше 2 символів')
          .exists()
          .isLength({ min: 2 }),
        body('balance').custom((value) => {
          if (value < 0) {
            throw new Error('Баланс не може бути від’ємним')
          }
          return true
        }),
      ])
    case 'change':
      return validateExpander([
        body('name', 'Назва рахунку повинна бути більше 2 символів')
          .optional()
          .isLength({ min: 2 }),
      ])
  }
}

export { create, change, remove, validate }
