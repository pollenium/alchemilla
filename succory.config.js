const path = require('path')

const zeppelinDir = path.dirname(require.resolve('openzeppelin-solidity/package.json'))

const alchemillaContractsDir = `${__dirname}/contracts`
const zeppelinContractsDir = `${zeppelinDir}/contracts`

const sources = {
  'openzeppelin/math/SafeMath.sol': `${zeppelinContractsDir}/math/SafeMath.sol`,
  'openzeppelin/utils/Address.sol': `${zeppelinContractsDir}/utils/Address.sol`,
  'openzeppelin/introspection/IERC165.sol': `${zeppelinContractsDir}/introspection/IERC165.sol`,
  'openzeppelin/introspection/ERC165.sol': `${zeppelinContractsDir}/introspection/ERC165.sol`,
  'openzeppelin/ownership/Ownable.sol': `${zeppelinContractsDir}/ownership/Ownable.sol`,
  'openzeppelin/GSN/Context.sol': `${zeppelinContractsDir}/GSN/Context.sol`,
  'openzeppelin/token/ERC20/IERC20.sol': `${zeppelinContractsDir}/token/ERC20/IERC20.sol`,
  'openzeppelin/token/ERC20/ERC20.sol': `${zeppelinContractsDir}/token/ERC20/ERC20.sol`,
  'ExecutorOracle.interface.sol': `${alchemillaContractsDir}/ExecutorOracle.interface.sol`,
  'MonarchicExecutorOracle.sol': `${alchemillaContractsDir}/MonarchicExecutorOracle.sol`,
  'Engine.sol': `${alchemillaContractsDir}/Engine.sol`,
}

module.exports = {
  sources,
  outs: [{
    constName: 'engine',
    fileName: 'Engine.sol',
    contractName: 'Engine'
  },{
    constName: 'monarchicExecutorOracle',
    fileName: 'MonarchicExecutorOracle.sol',
    contractName: 'MonarchicExecutorOracle'
  }],
  outPath: './ts/index.ts'
}
