export function areAllKeysNotEmpty(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] === "") {
      return false;
    }
  }
  return true;
}
