const pipe = (x, ...fns) =>
  fns.reduce((x, fn) => fn(x), x)

const pipeline = (...fns) =>
  fns.reduce((f, g) => (...args) => g(f(...args)))

const compose = (...fns) =>
  fns.reduce((f, g) => (...args) => f(g(...args)))

const composeRight = pipeline

Object.defineProperty(exports, '__esModule', { value: true })
Object.assign(exports, { pipe, pipeline, compose, composeRight })
