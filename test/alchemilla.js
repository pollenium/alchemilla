const async = require('async')
const fixtures = require('./lib/fixtures')
const fetchArtifact = require('./lib/fetchArtifact')
const Alchemilla = require('./lib/Alchemilla')
const buttercup = require('pollenium-buttercup')
const tokensPromise = require('./tokens')
const PromiseStub = require('bluebird-stub')

const promiseStub = new PromiseStub
module.exports = promiseStub.promise

const Address = buttercup.Address

let alchemilla
let tokens

describe('alchemilla', () => {
  before(async () => {
    tokens = await tokensPromise
  })
  after(() => {
    promiseStub.resolve(alchemilla)
  })
  it('should deploy', async () => {
    const alchemillaArtifact = await fetchArtifact('Alchemilla')
    const web3AlchemillaContract = await alchemillaArtifact.new(
      {
        from: fixtures.addresses.deployer.getHex()
      }
    )
    alchemilla = new Alchemilla(
      Address.fromHexish(web3AlchemillaContract.address)
    )
  })
  describe('approvals', () => {
    fixtures.oligarchAndTraderNames.forEach((accountName) => {
      describe(accountName, () => {
        fixtures.tokenNames.forEach((tokenName) => {
          it(`should approve ${tokenName}`, async () => {
            await tokens[tokenName].broadcastApprove(
              fixtures.addresses[accountName],
              alchemilla.address,
              fixtures.startBalance
            )
          })
        })
      })
    })
  })
  describe('owner', () => {
    it('owner should be deployer', async () => {
      const owner = await alchemilla.fetchOwner()
      owner.getIsEqual(fixtures.addresses.deployer).should.equal(true)
    })
    it('should set owner to admin', async () => {
      await alchemilla.broadcastSetOwner(
        fixtures.addresses.deployer,
        fixtures.addresses.admin
      )
    })
    it('owner should be deployer', async () => {
      const owner = await alchemilla.fetchOwner()
      owner.getIsEqual(fixtures.addresses.admin).should.equal(true)
    })
    it('attacker should NOT be able to set bid owner', async () => {
      await alchemilla.broadcastSetOwner(
        fixtures.addresses.attacker,
        fixtures.addresses.attacker
      ).should.be.rejectedWith(Error)
    })
    it('owner should be admin', async () => {
      const owner = await alchemilla.fetchOwner()
      owner.getIsEqual(fixtures.addresses.admin).should.equal(true)
    })
  })
  describe('oligarchyBidToken', () => {
    it('oligarchyBidToken should be nullAddress', async () => {
      const oligarchyBidToken = await alchemilla.fetchOligarchyBidToken()
      oligarchyBidToken.getIsEqual(fixtures.nullAddress).should.equal(true)
    })
    it('should set oligarchyBidToken', async () => {
      await alchemilla.broadcastSetOligarchBidToken(
        fixtures.addresses.admin,
        tokens.biddy.address
      )
    })
    it('oligarchyBidToken should be biddy', async () => {
      const oligarchyBidToken = await alchemilla.fetchOligarchyBidToken()
      oligarchyBidToken.getIsEqual(tokens.biddy.address).should.equal(true)
    })
    it('attacker should NOT be able to set bid token', async () => {
      await alchemilla.broadcastSetOligarchBidToken(
        fixtures.addresses.attacker,
        tokens.dai.address
      ).should.be.rejectedWith(Error)
    })
    it('oligarchyBidToken should be biddy', async () => {
      const oligarchyBidToken = await alchemilla.fetchOligarchyBidToken()
      oligarchyBidToken.getIsEqual(tokens.biddy.address).should.equal(true)
    })
  })
  describe('oligarchyProfiteer', () => {
    it('oligarchyProfiteer should be nullAddress', async () => {
      const oligarchyProfiteer = await alchemilla.fetchOligarchyProfiteer()
      oligarchyProfiteer.getIsEqual(fixtures.nullAddress).should.equal(true)
    })
    it('should set oligarchyProfiteer', async () => {
      await alchemilla.broadcastSetOligarchyProfiteer(
        fixtures.addresses.admin,
        fixtures.addresses.profiteer
      )
    })
    it('oligarchyProfiteer should be oligarchyProfiteer', async () => {
      const oligarchyProfiteer = await alchemilla.fetchOligarchyProfiteer()
      oligarchyProfiteer.getIsEqual(fixtures.addresses.profiteer).should.equal(true)
    })
    it('attacker should NOT be able to set oligarchyProfiteer', async () => {
      await alchemilla.broadcastSetOligarchyProfiteer(
        fixtures.addresses.attacker,
        fixtures.addresses.attacker
      ).should.be.rejectedWith(Error)
    })
    it('oligarchyProfiteer should be oligarchyProfiteer', async () => {
      const oligarchyProfiteer = await alchemilla.fetchOligarchyProfiteer()
      oligarchyProfiteer.getIsEqual(fixtures.addresses.profiteer).should.equal(true)
    })
  })
})

//
// // Initial deployment of the smart contracts
// const setup = async () => {
//
//   const AlchemillaArtifact = await resolver.require('Alchemilla')
//   AlchemillaArtifact.setProvider(provider)
//   const web3Alchemilla = await AlchemillaArtifact.new({ from: admin.getHex() })
//
//   await alchemilla.setOligarchBidToken(biddy.getAddress(), {
//     from: admin.getHex()
//   })
//
//   await alchemilla.setOligarchyProfiteer(oligarchyProfiteer.getHex(), {
//     from: admin.getHex()
//   })
//
//   testTokens = [biddy, dai, usdc, weth, mkr]
//
//   await async.each(users, async (user) => {
//     await async.each(testTokens, async (testToken) => {
//       await testToken.transfer(user.getHex(), startBalance, {
//         from: admin.getHex()
//       })
//       await testToken.approve(alchemilla.address, startBalance, {
//         from: user.getHex()
//       })
//     })
//   })
// }
//
// // Creates a snapshot with the current state stored in the connected rpc (ganache only method)
// // Returns the id of the snapshot (a snapshot is single use, cannot use an id twice)
// const snapshot = async () => {
//   return new Promise((ok, ko) => {
//     web3.currentProvider.sendAsync({
//       method: "evm_snapshot",
//       params: [],
//       jsonrpc: "2.0",
//       id: new Date().getTime()
//     }, (error, res) => {
//       if (error) {
//         return ko(error)
//       } else {
//         ok(res.result)
//       }
//     })
//   })
// }
//
// // Sends a snapshot id to the rpc, restores state to previsously snapshotted version
// const revert = async (snapId) => {
//   console.log('revert')
//   return new Promise((ok, ko) => {
//     web3.currentProvider.sendAsync({
//       method: "evm_revert",
//       params: [snapId],
//       jsonrpc: "2.0",
//       id: new Date().getTime()
//     }, (error, res) => {
//       if (error) {
//         return ko(error)
//       } else {
//         ok(res.result)
//       }
//     })
//   })
// }
//
// describe('Alchemilla', async () => {
//
//   before(async () => {
//     await setup()
//     this.snapId = await snapshot()
//   })
//
//   beforeEach(async () => {
//     await revert(this.snapId)
//     this.snapId = await snapshot()
//   })
//
//   describe('ownership', () => {
//     it('owner should be accounts[0]', async () => {
//       const owner = Address.fromHexish(await alchemilla.owner())
//       owner.getIsEqual(admin).should.equal(true)
//     })
//   })
//
//   describe('user balances', () => {
//     it('balance should be startBalance', async () => {
//       await async.each(users, async (user) => {
//         await async.each(testTokens, async (testToken) => {
//           Uint256.fromBn(await testToken.balanceOf(user.getHex())).getNumber().should.equal(startBalance)
//         })
//       })
//     })
//     it('allowances should be startBalance', async () => {
//       await async.each(users, async (user) => {
//         await async.each(testTokens, async (testToken) => {
//           Uint256.fromBn(await testToken.allowance(user.getHex(), alchemilla.address)).getNumber().should.equal(startBalance)
//         })
//       })
//     })
//   })
//
//   describe('oligarchs', () => {
//
//     it('oligarchyProfiteer should be oligarchyProfiteer', async () => {
//       const alchemillaProfiteer = Address.fromHexish(await alchemilla.oligarchyProfiteer())
//       oligarchyProfiteer.getIsEqual(oligarchyProfiteer).should.equal(true)
//     })
//
//     it('oligarchyBidToken should be biddy', async () => {
//       const oligarchyBidToken = Address.fromHexish(await alchemilla.oligarchOligarchBidToken())
//       oligarchyBidToken.getIsEqual(Address.fromHexish(biddy.address)).should.equal(true)
//     })
//
//     it('oligarch0 should be nullAddress', async () => {
//       const oligarch0 = Address.fromHexish(await alchemilla.oligarchs(0))
//       oligarch0.getIsEqual(nullAddress).should.equal(true)
//     })
//
//     it('oligarch255 should be nullAddress', async () => {
//       const oligarch255 = Address.fromHexish(await alchemilla.oligarchs(255))
//       oligarch255.getIsEqual(nullAddress).should.equal(true)
//     })
//
//     it('bidAmount0 should be 0', async () => {
//       const bidAmount0 = Uint256.fromBn(await alchemilla.bidAmounts(0))
//       bidAmount0.getIsEqual(uint256Zero).should.equal(true)
//     })
//
//     it('bidAmount255 should be 0', async () => {
//       const bidAmount255 = Uint256.fromBn(await alchemilla.bidAmounts(255))
//       bidAmount255.getIsEqual(uint256Zero).should.equal(true)
//     })
//
//     it('blockNumber should be locked', async () => {
//       const blockNumber = await web3.eth.getBlockNumber()
//       return alchemilla.getOligarchIsLocked(blockNumber, {
//         from: alice.getHex()
//       }).should.eventually.equal(true)
//     })
//
//     it('blockNumber + 31 should be locked', async () => {
//       const blockNumber = await web3.eth.getBlockNumber()
//       return alchemilla.getOligarchIsLocked(blockNumber + 31, {
//         from: alice.getHex()
//       }).should.eventually.equal(true)
//     })
//
//     it('blockNumber - 1 should not be locked', async () => {
//       const blockNumber = await web3.eth.getBlockNumber()
//       return alchemilla.getOligarchIsLocked(blockNumber - 1, {
//         from: alice.getHex()
//       }).should.eventually.equal(false)
//     })
//
//     it('blockNumber + 32 should not be locked', async () => {
//       const blockNumber = await web3.eth.getBlockNumber()
//       return alchemilla.getOligarchIsLocked(blockNumber + 32, {
//         from: alice.getHex()
//       }).should.eventually.equal(false)
//     })
//
//     it('alice should fail to overthrowOligarch 0 with bid of 0', async () => {
//       await alchemilla.overthrowOligarch(0, 0, {
//         from: alice.getHex()
//       }).should.be.rejectedWith(Error)
//     })
//
//     it('alice should overthrowOligarch 0 with bid of 1', async () => {
//       await alchemilla.overthrowOligarch(0, 1, {
//         from: alice.getHex()
//       })
//       const biddyBalanceAlice = Uint256.fromBn(await biddy.balanceOf(alice.getHex()))
//       const biddyBalanceProfiteer = Uint256.fromBn(await biddy.balanceOf(oligarchyProfiteer.getHex()))
//       const oligarch0 = Address.fromHexish(await alchemilla.oligarchs(0))
//       const bidAmount0 = Uint256.fromBn(await alchemilla.bidAmounts(0))
//
//       biddyBalanceAlice.getNumber().should.equal(startBalance - 1)
//       biddyBalanceProfiteer.getNumber().should.equal(1)
//       oligarch0.getIsEqual(alice).should.equal(true)
//       bidAmount0.getNumber().should.equal(1)
//     })
//
//     it('bob should fail to overthrowOligarch 0 with bid of 1', async () => {
//       await alchemilla.overthrowOligarch(0, 1, {
//         from: bob.getHex()
//       }).should.be.rejectedWith(Error)
//     })
//
//     it('bob should overthrowOligarch 0 with bid of 2', async () => {
//       await alchemilla.overthrowOligarch(0, 2, {
//         from: bob.getHex()
//       })
//       const biddyBalanceAlice = Uint256.fromBn(await biddy.balanceOf(alice.getHex()))
//       const biddyBalanceBob = Uint256.fromBn(await biddy.balanceOf(bob.getHex()))
//       const biddyBalanceProfiteer = Uint256.fromBn(await biddy.balanceOf(oligarchyProfiteer.getHex()))
//       const oligarch0 = Address.fromHexish(await alchemilla.oligarchs(0))
//       const bidAmount0 = Uint256.fromBn(await alchemilla.bidAmounts(0))
//
//       biddyBalanceAlice.getNumber().should.equal(startBalance)
//       biddyBalanceBob.getNumber().should.equal(startBalance - 2)
//       biddyBalanceProfiteer.getNumber().should.equal(2)
//       oligarch0.getIsEqual(bob).should.equal(true)
//       bidAmount0.getNumber().should.equal(2)
//     })
//
//
//   })
//
// })
