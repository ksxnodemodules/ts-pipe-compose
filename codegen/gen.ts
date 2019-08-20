function typeParams (quantity: number) {
  return Array(quantity)
    .fill(null)
    .map((_, i) => '    T' + i)
    .join(',\n')
}

function pipeValParams (quantity: number) {
  const sig = (arg: number, res: number) =>
    `(x: T${arg}) => T${res}`

  const tail = Array(quantity - 1)
    .fill(null)
    .map((_, i) => `    f${i + 1}: ${sig(i, i + 1)}`)
    .join(',\n')

  return tail
}

function retVal (quantity: number) {
  return `T${quantity - 1}`
}

function retFunc (quantity: number) {
  return `(...args: Args) => T${quantity - 1}`
}

interface Gen {
  (quantity: number, name: string): string
}

function mkgen (fn: Gen): Gen {
  return (quantity, name) => Array(quantity)
    .fill(null)
    .map((_, i) => fn(i + 1, name))
    .join('\n')
}

export function genPipeValOverload (quantity: number, name: string) {
  const types = typeParams(quantity)
  const vals = pipeValParams(quantity)
  const rets = retVal(quantity)
  return [
    `export declare function ${name} <`,
    types,
    '> (',
    '    x0: T0,',
    vals,
    `): ${rets};`
  ].join('\n')
}

export const genPipeVal = mkgen(genPipeValOverload)

export function genPipeFuncOverload (quantity: number, name: string) {
  const types = typeParams(quantity)
  const vals = pipeValParams(quantity)
  const rets = retFunc(quantity)
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

export const genPipeFunc = mkgen(genPipeFuncOverload)
