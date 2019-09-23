import path from 'path'
import { writeFile } from 'fs-extra'

import {
  genPipeVal,
  genPipeFunc,
  genComposeFunc,
  genPipeUnaryFunc,
  genComposeUnaryFunc
} from './gen'

export async function main () {
  const filename = path.resolve(__dirname, '../lib/index.d.ts')

  // WARNING:
  //   Size of index.d.ts increases exponentially as quantity increases:
  //   size = 3 * (1 + quantity) * (quantity / 2)
  const quantity = 64

  const content = [
    genPipeVal(quantity, 'pipe'),
    genPipeFunc(quantity, 'pipeline'),
    genComposeFunc(quantity, 'compose'),
    genPipeUnaryFunc(quantity, 'pipelineUnary'),
    genComposeUnaryFunc(quantity, 'composeUnary'),
    'export { pipeline as composeRight }',
    'export { pipelineUnary as composeUnaryRight }'
  ].join('\n\n')

  await writeFile(filename, content)

  return 0
}

export default main
