export function isPlainObj(o) {
  return typeof o == 'object' && o.constructor == Object;
}

export function ArrayToObject(arr, key){
  if (!arr || !key) return arr;
  const obj = {};
  arr.forEach( el => obj[el[key]] = el)
  return obj;
}
