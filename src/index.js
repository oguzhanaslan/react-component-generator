#!/usr/bin / env node
'use strict'

import figlet from 'figlet'
import program from 'commander'
const createComponent = require('./question')

console.log(
  figlet.textSync('React Generator', {
    horizontalLayout: 'fitted',
  }),
)

program.version('0.01', '-v, --version').description('Vue Component Generator')

program
  .command('create-component')
  .alias('cc')
  .action(function() {
    createComponent()
  })

/*****************************************/

// allow commander to parse `process.argv`
program.parse(process.argv)

/*****************************************/

let NO_COMMAND_SPECIFIED = program.args.length === 0

// Handle it however you like
if (NO_COMMAND_SPECIFIED) {
  // e.g. display usage
  program.help()
}
