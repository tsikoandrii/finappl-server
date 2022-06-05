import config from 'config'
import { body } from 'express-validator'
import validateExpander from '../helpers/validate-expander'
import { ClientError } from '../helpers/error-types'
import removeUndefined from '../helpers/remove-undefined'

import Operation from '../db/models/Operation'
import Category from '../db/models/Category'
import Account from '../db/models/Account'

const OPERATIONS = config.get('OPERATION_TYPES')

const create = async (req) => {
  const { type, account, value, currency, description, category } = req.body
  const { user } = req

  const accountInstance = await Account.findById(account)
  if (accountInstance?.user.toString() !== user) {
    console.log(accountInstance.user === user)
    throw new ClientError(['Немає прав на дії з цим рахунком'])
  }

  const categoryInstance = await Category.findById(category)
  if (!categoryInstance) {
    throw new ClientError(['Такої категорії не існує'])
  }

  const operation = new Operation({
    user,
    type,
    account,
    value,
    currency,
    description,
    category,
  })

  return await operation.save()
}

const change = async (req) => {
  const data = removeUndefined(req.body, ['account'])
  const { id } = req.params

  const operation = await Operation.findOneAndUpdate(
    {
      _id: id,
      user: req.user,
    },
    { ...data },
    {
      new: true,
    }
  )

  if (!operation) throw new ClientError(['Вказаної операції не існує'])

  return operation
}

const del = async (req) => {
  const { id } = req.params

  const operation = await Operation.findOneAndDelete({
    _id: id,
    user: req.user,
  })

  if (!operation) throw new ClientError(['Вказаної операції не існує'])
  return true
}

// validate
const validate = (method) => {
  switch (method) {
    case 'create':
      return validateExpander([
        body('type').custom((value) => {
          if (!OPERATIONS.includes(value)) {
            throw new Error('Некоректний тип операції')
          }
          return true
        }),
        body('value').custom((value) => {
          if (value < 0) {
            throw new Error('Значення не може бути від’ємним')
          }
          return true
        }),
        body(
          'description',
          'Опис операції може бути не менше 10 та не більше 256 символів'
        ).isLength({ min: 10, max: 256 }),
      ])

    case 'change':
      return validateExpander([
        body('type')
          .optional()
          .custom((value) => {
            if (!OPERATIONS.includes(value)) {
              throw new Error('Некоректний тип операції')
            }
            return true
          }),
        body('value')
          .optional()
          .custom((value) => {
            if (value < 0) {
              throw new Error('Значення не може бути від’ємним')
            }
            return true
          }),
        body(
          'description',
          'Опис операції може бути не менше 10 та не більше 256 символів'
        )
          .optional()
          .isLength({ min: 10, max: 256 }),
      ])
  }
}

export { create, del, change, validate }
