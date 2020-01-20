const fsExtra = require('fs-extra')
const output = require(`./output`)

const indexPath = `${__dirname}/../index.js`
const outputJson = JSON.stringify(output, null, 2)

async function save() {
  fsExtra.writeFileSync(indexPath, `module.exports.output = ${outputJson}`)
}

save().then(() => console.log('Done'))
