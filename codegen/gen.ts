function typeParams (quantity: number) {
  return Array
    .from({ length: quantity })
    .map((_, i) => '    T' + i)
    .join(',\n')
}

function pipeValParams (quantity: number) {
  const sig = (arg: number, res: number) =>
    `(x: T${arg}) => T${res}`

  const params = Array
    .from({ length: quantity - 1 })
    .map((_, i) => `    f${i + 1}: ${sig(i, i + 1)}`)
    .join(',\n')

  return params
}

function composeValParams (quantity: number) {
  const sig = (arg: number, res: number) =>
    `(x: T${arg}) => T${res}`

  const begin = Array
    .from({ length: quantity - 1 })
    .map((_, i) => `    f${i}: ${sig(i + 1, i)}`)
    .join(',\n')

  const last = `    f${quantity}: (...args: Args) => T${quantity - 1}`

  return [begin, last].filter(Boolean).join(',\n')
}

function pipeRetVal (quantity: number) {
  return `T${quantity - 1}`
}

function pipeRetFunc (quantity: number) {
  return `(...args: Args) => T${quantity - 1}`
}

interface Gen {
  (quantity: number, name: string): string
}

interface GenTail {
  (name: string): string | readonly string[]
}

function mkgen (fn: Gen, tail: GenTail): Gen {
  return (quantity, name) => Array
    .from({ length: quantity })
    .map((_, i) => fn(i + 1, name))
    .concat(tail(name))
    .join('\n')
}

export function genPipeValOverload (quantity: number, name: string) {
  const types = typeParams(quantity)
  const vals = pipeValParams(quantity)
  const rets = pipeRetVal(quantity)
  return [
    `export declare function ${name} <`,
    types,
    '> (',
    '    x0: T0,',
    vals,
    `): ${rets};`
  ].join('\n')
}

export const genPipeVal = mkgen(
  genPipeValOverload,
  name => `export declare function ${name} <T> (x: T, ...fns: ((x: T) => T)[]): T;`
)

export function genPipeFuncOverload (quantity: number, name: string) {
  const types = typeParams(quantity)
  const vals = pipeValParams(quantity)
  const rets = pipeRetFunc(quantity)
  return [
    `export declare function ${name} <`,
    '    Args extends any[],',
    types,
    '> (',
    '    f0: (...args: Args) => T0,',
    vals,
    `): ${rets};`
  ].join('\n')
}

export const genPipeFunc = mkgen(
  genPipeFuncOverload,
  name => [
    `export declare function ${name} <`,
    '    T,',
    '    Args extends any[]',
    '> (',
    '    f0: (...args: Args) => T,',
    '    ...fns: ((x: T) => T)[]',
    '): (...args: Args) => T;'
  ]
)

export function genComposeFuncOverload (quantity: number, name: string) {
  const types = typeParams(quantity)
  const vals = composeValParams(quantity)
  return [
    `export declare function ${name} <`,
    types + ',',
    '    Args extends any[]',
    '> (',
    vals,
    '): (...args: Args) => T0;'
  ].join('\n')
}

export const genComposeFunc = mkgen(
  genComposeFuncOverload,
  () => []
)
