export const pipe = (x, ...fns) =>
  fns.reduce((x, fn) => fn(x), x)

export const pipeline = (...fns) =>
  fns.reduce((f, g) => (...args) => g(f(...args)))

export const compose = (...fns) =>
  fns.reduce((f, g) => (...args) => f(g(...args)))

export const pipelineUnary = (...fns) =>
  fns.reduce((f, g) => x => g(f(x)))

export const composeUnary = (...fns) =>
  fns.reduce((f, g) => x => f(g(x)))

export { pipeline as composeRight }
export { pipelineUnary as composeUnaryRight }
