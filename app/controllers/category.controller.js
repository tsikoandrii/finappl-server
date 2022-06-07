import config from 'config'
import { body } from 'express-validator'
import validateExpander from '../helpers/validate-expander'
import Category from '../db/models/Category'
import { ClientError } from '../helpers/error-types'
import removeUndefined from '../helpers/remove-undefined'

const OPERATIONS = config.get('OPERATION_TYPES')

const create = async (req) => {
  const { name, type } = req.body
  const { user } = req

  const category = new Category({ user, name, type })
  await category.save()

  return category
}

const change = async (req) => {
  const data = removeUndefined(req.body)
  const { id } = req.params

  const category = await Category.findOneAndUpdate(
    {
      _id: id,
      user: req.user,
    },
    { ...data },
    {
      new: true,
    }
  )

  if (!category) throw new ClientError(['Вказаної категорії не існує'])

  return category
}

const del = async (req) => {
  const { id } = req.params

  const category = await Category.findOneAndDelete({
    _id: id,
    user: req.user,
  })

  if (!category) throw new ClientError(['Вказаної категорії не існує'])
  return true
}

// validate
const validate = (method) => {
  switch (method) {
    case 'create':
      return validateExpander([
        body('name', 'Назва категорії повинна бути більше 2 символів')
          .exists()
          .isLength({ min: 2 }),
        body('type').custom((value) => {
          if (!OPERATIONS.includes(value)) {
            throw new Error('Некоректний тип операції')
          }
          return true
        }),
      ])

    case 'change':
      return validateExpander([
        body('name', 'Назва категорії повинна бути більше 2 символів')
          .optional()
          .isLength({ min: 2 }),
        body('type')
          .optional()
          .custom((value) => {
            if (!OPERATIONS.includes(value)) {
              throw new Error('Некоректний тип операції')
            }
            return true
          }),
      ])
  }
}

export { create, del, change, validate }
