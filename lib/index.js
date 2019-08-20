const pipe = (x, ...fns) =>
  fns.reduce((x, fn) => fn(x), x)

const pipeline = (...fns) =>
  fns.reduce((f, g) => (...args) => g(f(...args)))

Object.defineProperty(exports, '__esModule', { value: true })
Object.assign(exports, { pipe, pipeline })
