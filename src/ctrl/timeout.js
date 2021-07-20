export const addDelay = (ms) => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(true)
  }, ms)
})