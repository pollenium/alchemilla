const PromiseStub = require('bluebird-stub')
const fixtures = require('./lib/fixtures')
const fetchArtifact = require('./lib/fetchArtifact')
const Token = require('./lib/Token')
const buttercup = require('pollenium-buttercup')

const Address = buttercup.Address

const promiseStub = new PromiseStub

module.exports = promiseStub.promise

const tokens = {}

describe('tokens', () => {
  after(() => {
    promiseStub.resolve(tokens)
  })
  fixtures.tokenNames.forEach((tokenName) => {
    describe(tokenName, () => {
      it('should deploy', async () => {
        const tokenArtifact = await fetchArtifact('Token')
        const web3TokenContract = await tokenArtifact.new(
          fixtures.totalSupply.getBn(),
          {
            from: fixtures.addresses.admin.getHex()
          }
        )
        tokens[tokenName] = new Token(
          Address.fromHexish(web3TokenContract.address)
        )
      })
      it(`should have totalSupply of ${fixtures.totalSupply.getNumber()}`, async () => {
        const totalSupply = await tokens[tokenName].fetchTotalSupply()
        totalSupply.getIsEqual(fixtures.totalSupply).should.equal(true)
      })
      fixtures.traderNames.forEach((traderName) => {
        describe(traderName, () => {
          it(`should transfer ${fixtures.startBalance.getNumber()} to ${traderName}`, async () => {
            await tokens[tokenName].broadcastTransfer(
              fixtures.addresses.admin,
              fixtures.addresses[traderName],
              fixtures.startBalance
            )
          })
          it(`should have balance of ${fixtures.startBalance.getNumber()}`, async () => {
            const totalSupply = await tokens[tokenName].fetchTotalSupply()
            totalSupply.getIsEqual(fixtures.totalSupply).should.equal(true)
          })
        })
      })
    })
  })
})
