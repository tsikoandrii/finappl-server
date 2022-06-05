export default (obj, keys = []) => {
  keys.forEach((key) => {
    obj[key] = undefined
  })
  return JSON.parse(JSON.stringify(obj))
}
