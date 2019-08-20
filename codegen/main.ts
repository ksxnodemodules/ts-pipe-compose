import path from 'path'
import { writeFile } from 'fs-extra'
import { genPipeVal, genPipeFunc } from './gen-pipe'

export async function main () {
  const filename = path.resolve(__dirname, '../lib/index.d.ts')

  const quantity = 64

  const content = [
    genPipeVal(quantity, 'pipe'),
    genPipeFunc(quantity, 'pipeline')
  ].join('\n\n')

  await writeFile(filename, content)

  return 0
}

export default main
