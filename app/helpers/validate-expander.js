import errorChecker from '../middlewares/checker'

const validateExpander = (middlewares) => {
  return [...middlewares, errorChecker]
}

export default validateExpander
