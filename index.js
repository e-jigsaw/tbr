const carlo = require('carlo')
const { readFileSync } = require('fs')

const main = async () => {
  const app = await carlo.launch()
  app.on('exit', () => process.exit())
  app.serveFolder(__dirname)
  await app.exposeFunction('load', () => readFileSync('./data/latest.json').toString())
  await app.load('index.html')
}

main()
