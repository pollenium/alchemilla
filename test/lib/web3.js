const Web3 = require('web3')
const provider = require('./provider')

const web3 = new Web3(provider)
web3.currentProvider.sendAsync = web3.currentProvider.send

module.exports = web3
