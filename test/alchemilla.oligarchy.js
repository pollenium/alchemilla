const alchemillaPromise = require('./alchemilla')
const tokensPromise = require('./tokens')
const buttercup = require('pollenium-buttercup')
const fixtures = require('./lib/fixtures')
const web3 = require('./lib/web3')
const takeSnapshot = require('./lib/takeSnapshot')
const restoreSnapshot = require('./lib/restoreSnapshot')
const PromiseStub = require('bluebird-stub')

const Uint256 = buttercup.Uint256
const Uint8 = buttercup.Uint8

let alchemilla
let tokens
let targetedOligarchIndex
let initialSnapshotId

const promiseStub = new PromiseStub
module.exports = promiseStub.promise

describe('alchemilla.oligarchy', () => {
    before(async () => {
      alchemilla = await alchemillaPromise
      tokens = await tokensPromise
      initialSnapshotId = await takeSnapshot()
    })
    after(() => {
      promiseStub.resolve(alchemilla)
    })
    it('oligarch0 should be nullAddress with bid of 0', async () => {
      const oligarchStruct = await alchemilla.fetchOligarchStruct(Uint8.fromNumber(0))
      oligarchStruct.address.getIsEqual(fixtures.nullAddress).should.equal(true)
      oligarchStruct.bidAmount.getIsEqual(fixtures.uint256Zero).should.equal(true)
    })
    it('oligarch255 should be nullAddress with bid of 0', async () => {
      const oligarchStruct = await alchemilla.fetchOligarchStruct(Uint8.fromNumber(255))
      oligarchStruct.address.getIsEqual(fixtures.nullAddress).should.equal(true)
      oligarchStruct.bidAmount.getIsEqual(fixtures.uint256Zero).should.equal(true)
    })
    it('should set oligarchIndex', async () => {
      const blockNumber = await web3.eth.getBlockNumber()
      oligarchIndex = Uint8.fromNumber(blockNumber % 256).sub(Uint8.fromNumber(1))
    })
    it('blockNumber should be locked', async () => {
      const blockNumber = await web3.eth.getBlockNumber()
      oligarchIndex = Uint8.fromNumber(blockNumber % 256)
      const oligarchStruct = await alchemilla.fetchOligarchStruct(
        Uint8.fromNumber(blockNumber % 256)
      )
      return oligarchStruct.isLocked.should.equal(true)
    })
    it('blockNumber + 31 should be locked', async () => {
      const blockNumber = await web3.eth.getBlockNumber()
      const oligarchStruct = await alchemilla.fetchOligarchStruct(
        Uint8.fromNumber(blockNumber % 256).add(Uint8.fromNumber(31))
      )
      return oligarchStruct.isLocked.should.equal(true)
    })
    it('blockNumber - 1 should not be locked', async () => {
      const blockNumber = await web3.eth.getBlockNumber()
      const oligarchStruct = await alchemilla.fetchOligarchStruct(
        Uint8.fromNumber(blockNumber % 256).sub(Uint8.fromNumber(1))
      )
      return oligarchStruct.isLocked.should.equal(false)
    })
    it('blockNumber + 32 should not be locked', async () => {
      const blockNumber = await web3.eth.getBlockNumber()
      const oligarchStruct = await alchemilla.fetchOligarchStruct(
        Uint8.fromNumber(blockNumber % 256).add(Uint8.fromNumber(32))
      )
      return oligarchStruct.isLocked.should.equal(false)
    })
    describe('overthrowing targetedOligarch', () => {
      it('should set targetedOligarchIndex', async () => {
        const blockNumber = await web3.eth.getBlockNumber()
        targetedOligarchIndex = Uint8.fromNumber(blockNumber % 256).sub(Uint8.fromNumber(1))
      })
      it('alice should fail to overthrow targetedOligarch with bid of 0', async () => {
        await alchemilla.broadcastOverthrowOligarch(
          fixtures.addresses.alice,
          targetedOligarchIndex,
          Uint256.fromNumber(0)
        ).should.be.rejectedWith(Error)

        const targetedOligarchStruct = await alchemilla.fetchOligarchStruct(targetedOligarchIndex)
        targetedOligarchStruct.address.getIsEqual(fixtures.nullAddress).should.equal(true)
        targetedOligarchStruct.bidAmount.getNumber().should.equal(0)
      })
      it('alice should overthrow targetedOligarch with bid of 1', async () => {
        await alchemilla.broadcastOverthrowOligarch(
          fixtures.addresses.alice,
          targetedOligarchIndex,
          Uint256.fromNumber(1)
        )

        const targetedOligarchStruct = await alchemilla.fetchOligarchStruct(targetedOligarchIndex)
        targetedOligarchStruct.address.getIsEqual(fixtures.addresses.alice).should.equal(true)
        targetedOligarchStruct.bidAmount.getNumber().should.equal(1)

        const biddyBalanceAlice = await tokens.biddy.fetchBalance(fixtures.addresses.alice)
        const biddyBalanceProfiteer = await tokens.biddy.fetchBalance(fixtures.addresses.profiteer)

        biddyBalanceAlice.getNumber().should.equal(fixtures.startBalance.getNumber() - 1)
        biddyBalanceProfiteer.getNumber().should.equal(1)
      })
      it('bob should fail to overthrow targetedOligarch with bid of 1', async () => {
        await alchemilla.broadcastOverthrowOligarch(
          fixtures.addresses.bob,
          targetedOligarchIndex,
          Uint256.fromNumber(1)
        ).should.be.rejectedWith(Error)
        const targetedOligarchStruct = await alchemilla.fetchOligarchStruct(targetedOligarchIndex)
        targetedOligarchStruct.address.getIsEqual(fixtures.addresses.alice).should.equal(true)
        targetedOligarchStruct.bidAmount.getNumber().should.equal(1)
      })
      it('bob should overthrow targetedOligarch with bid of 2', async () => {
        await alchemilla.broadcastOverthrowOligarch(
          fixtures.addresses.bob,
          targetedOligarchIndex,
          Uint256.fromNumber(2)
        )
        const targetedOligarchStruct = await alchemilla.fetchOligarchStruct(targetedOligarchIndex)
        targetedOligarchStruct.address.getIsEqual(fixtures.addresses.bob).should.equal(true)
        targetedOligarchStruct.bidAmount.getNumber().should.equal(2)

        const biddyBalanceAlice = await tokens.biddy.fetchBalance(fixtures.addresses.alice)
        const biddyBalanceBob = await tokens.biddy.fetchBalance(fixtures.addresses.bob)
        const biddyBalanceProfiteer = await tokens.biddy.fetchBalance(fixtures.addresses.profiteer)

        biddyBalanceAlice.getNumber().should.equal(fixtures.startBalance.getNumber())
        biddyBalanceBob.getNumber().should.equal(fixtures.startBalance.getNumber() - 2)
        biddyBalanceProfiteer.getNumber().should.equal(2)
      })
    })
    describe('set alice as all oligarchs', () => {
      before(async () => {
        await restoreSnapshot(initialSnapshotId)
      })
      for (let i = 0; i <= 255; i++) {
        it(`#${i}/255`, async () => {
          const oligarchIndexNumber = (targetedOligarchIndex.getNumber() + i) % 256
          const oligarchIndex = Uint8.fromNumber(oligarchIndexNumber)

          await alchemilla.broadcastOverthrowOligarch(
            fixtures.addresses.alice,
            oligarchIndex,
            Uint256.fromNumber(1)
          )
          const oligarch = await alchemilla.fetchOligarchStruct(oligarchIndex)
          oligarch.address.getIsEqual(fixtures.addresses.alice).should.equal(true)
          oligarch.bidAmount.getNumber().should.equal(1)
        })
      }
    })


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
})
