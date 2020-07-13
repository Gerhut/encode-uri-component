const { Transform } = require('stream')

class EncodeURIComponent extends Transform {
  _transform (chunk, encoding, callback) {
    const input = chunk.toString('utf8')
    try {
      const output = encodeURIComponent(input)
      callback(null, Buffer.from(output, 'utf8'))
    } catch (error) {
      callback(error)
    }
  }
}

exports = module.exports = EncodeURIComponent
exports.EncodeURIComponent = EncodeURIComponent
