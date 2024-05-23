import { check } from 'express-validator'
import { RestaurantCategory } from '../../models/models.js'

const create = [
  check('name').exists().isString().isLength({ min: 1, max: 255 }).trim().withMessage('Falla 1'),
  check('name').custom(async (value, { req }) => {
    const enUso = await RestaurantCategory.findOne({ where: { name: value } })
    if (enUso != null && enUso !== undefined) {
      return Promise.reject(new Error('No puedes crear una categoria ya existente'))
    }
    return Promise.resolve('Admitido')
  })
]

export { create }
