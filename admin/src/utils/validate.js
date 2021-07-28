export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
export function validUsername(str) {
  // const valid_map = ['admin', 'editor']
  return true
}
export function validEmail(mail) {
  if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
    return true
  }
  return false
}
