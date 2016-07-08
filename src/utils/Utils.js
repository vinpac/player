export function isPlainObj(o) {
  return typeof o == 'object' && o.constructor == Object;
}

export function ArrayToObject(arr, key){
  if (!arr || !key) return arr;
  const obj = {};
  arr.forEach( el => obj[el[key]] = el)
  return obj;
}

export function str_pad_left(string, pad, length) {
  return (new Array(length+1).join(pad)+string).slice(-length);
}

export function parseSongDuration(time) {
  let minutes;
  let seconds;
  if (time > 60) {
    minutes = Math.floor(time / 60);
    seconds = time - minutes * 60;
  } else {
    minutes = 0;
    seconds = time;
  }

  return str_pad_left(minutes, '0', 2) + ":" + str_pad_left(seconds, '0', 2)
}
