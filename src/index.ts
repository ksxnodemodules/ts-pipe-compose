export const pipe = (x, ...fns) =>
  fns.reduce((x, fn) => fn(x), x)

export const pipeline = (...fns) =>
  fns.reduce((f, g) => (...args) => g(f(...args)))

export const compose = (...fns) =>
  fns.reduce((f, g) => (...args) => f(g(...args)))

export { pipeline as composeRight }
