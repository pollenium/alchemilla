const solc = require('solc')
const fs = require('fs')
const path = require('path')

const contractsDir = `${__dirname}/../contracts`
const zeppelinDir = path.dirname(require.resolve('openzeppelin-solidity/package.json'))
const zeppelinContractsDir = `${zeppelinDir}/contracts`

const sourcePaths = {
  'math/SafeMath.sol': `${zeppelinContractsDir}/math/SafeMath.sol`,
  'utils/Address.sol': `${zeppelinContractsDir}/utils/Address.sol`,
  'introspection/IERC165.sol': `${zeppelinContractsDir}/introspection/IERC165.sol`,
  'introspection/ERC165.sol': `${zeppelinContractsDir}/introspection/ERC165.sol`,
  'ownership/Ownable.sol': `${zeppelinContractsDir}/ownership/Ownable.sol`,
  'GSN/Context.sol': `${zeppelinContractsDir}/GSN/Context.sol`,
  'token/ERC20/IERC20.sol': `${zeppelinContractsDir}/token/ERC20/IERC20.sol`,
  'token/ERC20/ERC20.sol': `${zeppelinContractsDir}/token/ERC20/ERC20.sol`,
  'ExecutorOracle.interface.sol': `${contractsDir}/ExecutorOracle.interface.sol`,
  'MonarchicExecutorOracle.sol': `${contractsDir}/MonarchicExecutorOracle.sol`,
  'Engine.sol': `${contractsDir}/Engine.sol`,
  'Token.sol': `${contractsDir}/Token.sol`,
}

const sources = {}

Object.keys(sourcePaths).forEach((key) => {
  const content = fs.readFileSync(sourcePaths[key], 'utf8')
  sources[key] = { content }
})

const input = {
  language: 'Solidity',
  sources: sources,
  settings: {
    optimizer: { 'enabled': true },
    outputSelection: {
      '*': {
        '*': ['abi', 'evm.bytecode.object'],
        '': ['ast']
      }
    }
  }
}

const outputJson = solc.compile(JSON.stringify(input))
const output = JSON.parse(outputJson)

if (output.errors && output.errors.length > 0) {
  const solcErrorishes = output.errors.filter((solcErrorish) => {
    if (solcErrorish.formattedMessage.indexOf('Warning:') >= 0) {
      console.log(solcErrorish.formattedMessage)
      return false
    }
    return true
  })
  if (solcErrorishes.length > 0) {
    const errorMessage = solcErrorishes.map((solcErrorish) => {
      return `[solc]: ${solcErrorish.formattedMessage}`
    }).join('\r\n')
    throw new Error(errorMessage)
  }
}
module.exports = output
