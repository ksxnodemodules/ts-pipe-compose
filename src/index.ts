export const pipe = (x: any, ...fns: any[]) =>
  fns.reduce((x, fn) => fn(x), x)

export const pipeline = (...fns: any[]) =>
  fns.reduce((f, g) => (...args: any[]) => g(f(...args)))

export const compose = (...fns: any[]) =>
  fns.reduce((f, g) => (...args: any[]) => f(g(...args)))

export const composeRight = pipeline
