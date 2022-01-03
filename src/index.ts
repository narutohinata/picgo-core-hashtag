import picgo from 'picgo'
import { createHash } from 'crypto'
import path from 'path'

export = (ctx: picgo) => {
  const register = () => {
    ctx.helper.beforeUploadPlugins.register('picgo-core-unique_file', {
      handle (ctx: picgo) {
        ctx.output.map(output => {
          const hash = createHash('sha256')
          hash.update(output.buffer)
          let hashTag = hash.digest('hex')
          if (output.fileName) {
            let extName = path.extname(output.fileName)
            let baseName = path.basename(output.fileName, extName)
            output.fileName = `${baseName}-${hashTag}${extName}`
          }
        })
      }
    })
  }
  return {
    register
  }
}
