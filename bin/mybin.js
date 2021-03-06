#!/usr/bin/env node
const argv        = process.argv.slice(2)
const spawn       = require('child_process').spawn
const packageRoot = require('package.root')
const __root      = packageRoot.path
const path        = require('path')
const bins        = packageRoot.package.bin


if(!argv.length){
  console.log("😓 There are not enough arguments to execute.")
  process.exit(1)
} else {
  const module = bins[argv[0]]
  const args   = argv.slice(1)
  
  if(!module){
    console.log(`😓 Can not find a bin definition called ${argv[0]} in package.json.`)
    process.exit(1)
  }
  
  const nodeArgs = [path.resolve(__root,module)].concat(args)
  
  console.log(`🚀 Execute mybin : ${argv[0]} ${args.join(' ')}`)
  
  const mybin = spawn("node",nodeArgs,{stdio:[ process.stdin, process.stdout, process.stderr ]});
  mybin.on('close', (code)=>{
    console.log(`🥅 Process close mybin [code=${code}]`)
    process.exit(code)
  })
}