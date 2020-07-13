/* eslint-env mocha */

const { Buffer } = require('buffer')
const { EncodeURIComponent } = require('.')

describe('EncodeURIComponent', function () {
  const INPUT = '?foo=bar&baz=qux'
  const OUTPUT = encodeURIComponent(INPUT)

  function getBase64String (string) {
    return Buffer.from(string, 'utf8').toString('base64')
  }

  for (const inputEncoding of ['utf8', 'base64', 'buffer']) {
    for (const outputEncoding of ['utf8', 'base64', 'buffer']) {
      it(`${inputEncoding} -> ${outputEncoding}`, function () {
        const transform = new EncodeURIComponent()
        if (inputEncoding === 'utf8') {
          transform.write(INPUT)
        }
        if (inputEncoding === 'base64') {
          transform.write(getBase64String(INPUT), 'base64')
        }
        if (inputEncoding === 'buffer') {
          transform.write(Buffer.from(INPUT, 'utf8'))
        }

        if (outputEncoding === 'utf8') {
          transform.setEncoding('utf8').read().should.equal(OUTPUT)
        }
        if (outputEncoding === 'base64') {
          transform.setEncoding('base64').read().should.equal(getBase64String(OUTPUT))
        }
        if (outputEncoding === 'buffer') {
          transform.read().toString('utf8').should.equal(OUTPUT)
        }
      })
    }
  }
})
