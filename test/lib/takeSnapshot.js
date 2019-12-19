const web3 = require('./web3')

module.exports = async function takeSnapshot() {
  return new Promise((resolve, reject) => {
    web3.currentProvider.sendAsync({
      method: "evm_snapshot",
      params: [],
      jsonrpc: "2.0",
      id: new Date().getTime()
    }, (error, res) => {
      if (error) {
        reject(error)
      } else {
        resolve(res.result)
      }
    })
  })
}
