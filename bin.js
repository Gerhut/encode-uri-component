#!/usr/bin/env node

const minimist = require('minimist')
const EncodeURIComponent = require('.')
const { name, version } = require('./package.json')

const argv = minimist(process.argv.slice(2), {
  boolean: ['help', 'version'],
  alias: { h: 'help', v: 'version' }
})

if (argv.version) {
  console.log(`${name} ${version}`)
  process.exit(0)
}

if (argv.help) {
  console.log(`

${name} ${version}

Usage: cat <input> | ${name} | tee <output>

Options:
  -h, --help     Show help and exit
  -v, --version  Show version and exit

  `.trim())

  process.exit(0)
}

process.stdin
  .pipe(new EncodeURIComponent())
  .pipe(process.stdout)
