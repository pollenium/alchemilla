const Artifactor = require('truffle-artifactor')
const fsExtra = require('fs-extra')

const indexPath = `${__dirname}/../index.js`
const artifactsPath = `${__dirname}/../artifacts`
const artifactor = new Artifactor(artifactsPath)

fsExtra.emptyDirSync(artifactsPath)

const output = require(`${__dirname}/../output`)
const outputJson = JSON.stringify(output, null, 2)

async function save() {
  fsExtra.writeFileSync(indexPath, `module.exports.output = ${outputJson}`)
  const paths = Object.keys(output.contracts)
  for (let i = 0; i < paths.length; i++) {
    const path = paths[i]
    const contractNames = Object.keys(output.contracts[path])
    for (let j = 0; j < contractNames.length; j++) {
      const contractName = contractNames[j]
      console.log(`Saving ${contractName} ...`)
      const contract = output.contracts[path][contractName]
      await artifactor.save({
          contractName: contractName,
          abi: contract.abi,
          unlinked_binary: `0x${contract.evm.bytecode.object}`
      });
      console.log(`Saved ${contractName}`)
    }
  }
}

save().then(() => console.log('Done'))
