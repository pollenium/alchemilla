const web3 = require('./web3')

module.exports = async function restoreSnapshot(id) {
  return new Promise((resolve, reject) => {
    web3.currentProvider.sendAsync({
      method: "evm_revert",
      params: [id],
      jsonrpc: "2.0",
      id: new Date().getTime()
    }, (error, res) => {
      if (error) {
        return reject(error)
      } else {
        resolve(res.result)
      }
    })
  })
}
