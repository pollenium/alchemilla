const Artifactor = require('truffle-artifactor')

const artifactor = new Artifactor(`${__dirname}/../artifacts`)

const output = require(`${__dirname}/../output`)

console.dir(output)

async function save() {

  Object.keys(output.sources).forEach((key) => {
    console.dir(output.sources[key].ast)
  })
    //
    // for (const key of Object.keys(output.sources)) {
    //   console.log(contract.ast)
    //
    //     console.log(`Saving ${contract} ...`)
    //
    //     await artifactor.save({
    //         contractName: contract.slice(contract.indexOf(':') + 1),
    //         abi: JSON.parse(compile.contracts[contract].interface),
    //         unlinked_binary: `0x${compile.contracts[contract].bytecode}`
    //     });
    //
    //     console.log(`Saved ${contract}`)
    // }
}

save().then(() => console.log('Done'))
