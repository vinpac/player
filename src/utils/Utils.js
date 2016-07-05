export function isPlainObj(o) {
  return typeof o == 'object' && o.constructor == Object;
}
