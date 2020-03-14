import { TokenNames, AccountNames, traderNames, startBalance } from './lib/fixtures'
import { $enum } from 'ts-enum-util'
import {
  fetchTokenReader,
  fetchTokenWriter,
  fetchEngineReader,
  fetchEngineWriter,
  fetchOrDeployTokenAddress,
  fetchOrDeployEngineAddress,
  getAccountAddress,
  getKeypair
} from './lib/utils'
import { EngineReader } from '../'
import { Uu } from 'pollenium-uvaursi'
import { Address, Bytes32 } from 'pollenium-buttercup'
import { THOUSAND } from 'pollenium-ursinia'
import { utils } from '../'

require('./engine.test')
require('./tokens.test')

let engine: Address
let engineReader: EngineReader

let depositSalt: Bytes32
let withdrawSalt: Bytes32
let withdrawAndNotifySalt: Bytes32

test('should fetch engine/engineReader/salts', async () => {
  engine = await fetchOrDeployEngineAddress()
  engineReader = await fetchEngineReader()
  depositSalt = await engineReader.fetchDepositSalt()
  withdrawSalt = await engineReader.fetchWithdrawSalt()
  withdrawAndNotifySalt = await engineReader.fetchWithdrawAndNotifySalt()
})

$enum(TokenNames).forEach((tokenName) => {

  test(`deployer should allow engine to transfer ${tokenName}`, async () => {
    const tokenWriter = await fetchTokenWriter({
      accountName: AccountNames.DEPLOYER,
      tokenName
    })
    await tokenWriter.setAllowance({
      spender: engine,
      amount: startBalance * traderNames.length
    })
  })
  traderNames.forEach((traderName) => {
    test(`deployer should depositViaNative ${tokenName} to ${traderName}`, async () => {
      const engineWriter = await fetchEngineWriter(AccountNames.DEPLOYER)
      await engineWriter.depositViaNative({
        to: getAccountAddress(traderName),
        token: await fetchOrDeployTokenAddress(tokenName),
        amount: startBalance
      })
    })
  })
  test(`engine's ${tokenName} balance should be ${startBalance * traderNames.length}`, async () => {
    const tokenReader = await fetchTokenReader(tokenName)
    const balance = await tokenReader.fetchBalance(engine)
    expect(balance.compEq(startBalance * traderNames.length)).toBe(true)
  })
  test(`deployer's engine balance of ${tokenName} should be 0`, async () => {
    const balance = await engineReader.fetchBalance({
      holder: getAccountAddress(AccountNames.DEPLOYER),
      token: await fetchOrDeployTokenAddress(tokenName)
    })
    expect(balance.toNumber()).toBe(0)
  })
  traderNames.forEach((traderName) => {
    test(`${traderName}'s engine balance of ${tokenName} should be ${startBalance}`, async () => {
      const balance = await engineReader.fetchBalance({
        holder: getAccountAddress(traderName),
        token: await fetchOrDeployTokenAddress(tokenName)
      })
      expect(balance.toNumber()).toBe(startBalance)
    })
  })
  traderNames.forEach((traderName) => {
    test(`${traderName} should withdrawViaNative 10 ${tokenName} to coinbase`, async () => {
      const engineWriter = await fetchEngineWriter(traderName)
      await engineWriter.withdrawViaNative({
        to: getAccountAddress(AccountNames.COINBASE),
        token: await fetchOrDeployTokenAddress(tokenName),
        amount: 10
      })
    })
  })
  test(`coinbases's ${tokenName} balance should be ${traderNames.length * 10}`, async () => {
    const tokenReader = await fetchTokenReader(tokenName)
    const balance = await tokenReader.fetchBalance(getAccountAddress(AccountNames.COINBASE))
    expect(balance.toNumber()).toBe(traderNames.length * 10)
  })
  traderNames.forEach((traderName) => {
    test(`${traderName}'s' engine balance of ${tokenName} should be ${startBalance - 10}`, async () => {
      const balance = await engineReader.fetchBalance({
        holder: getAccountAddress(traderName),
        token: await fetchOrDeployTokenAddress(tokenName)
      })
      expect(balance.toNumber()).toBe(startBalance - 10)
    })
  })
  traderNames.forEach((traderName) => {
    test(`coinbase should transfer 10 ${tokenName} to ${traderName}`, async () => {
      const tokenWriter = await fetchTokenWriter({
        accountName: AccountNames.COINBASE,
        tokenName
      })
      await tokenWriter.transfer({
        to: getAccountAddress(traderName),
        amount: 10
      })
    })
  })
  traderNames.forEach((traderName) => {
    test(`${traderName}'s ${tokenName} balance should be 10`, async () => {
      const tokenReader = await fetchTokenReader(tokenName)
      const balance = await tokenReader.fetchBalance(getAccountAddress(traderName))
      expect(balance.compEq(10)).toBe(true)
    })
  })
  traderNames.forEach((traderName) => {
    test(`${traderName} should approve engine to transfer 10 ${tokenName}`, async () => {
      const tokenWriter = await fetchTokenWriter({
        accountName: traderName,
        tokenName
      })
      await tokenWriter.setAllowance({
        spender: engine,
        amount: 10
      })
    })
  })
  traderNames.forEach((traderName) => {
    test(`sweeper should depositViaSignature 10 of ${traderName}'s ${tokenName}'`, async () => {
      const actionViaSignatureStruct = utils.genActionViaSignatureStruct({
        fromPrivateKey: getKeypair(traderName).privateKey,
        to: getAccountAddress(traderName),
        token: await fetchOrDeployTokenAddress(tokenName),
        amount: 10,
        expiration: new Date().getTime() + (10 * THOUSAND),
        nonce: Uu.genRandom(32),
        actionSalt: depositSalt
      })
      const engineWriter = await fetchEngineWriter(AccountNames.SWEEPER)
      await engineWriter.depositViaSignature(actionViaSignatureStruct)
    })
  })
  traderNames.forEach((traderName) => {
    test(`${traderName}'s ${tokenName} balance should be 0`, async () => {
      const tokenReader = await fetchTokenReader(tokenName)
      const balance = await tokenReader.fetchBalance(getAccountAddress(traderName))
      expect(balance.toNumber()).toBe(0)
    })
  })
  traderNames.forEach((traderName) => {
    test(`${traderName}'s engine balance of ${tokenName} should be ${startBalance}`, async () => {
      const balance = await engineReader.fetchBalance({
        holder: getAccountAddress(traderName),
        token: await fetchOrDeployTokenAddress(tokenName)
      })
      expect(balance.toNumber()).toBe(startBalance)
    })
  })

  traderNames.forEach((traderName) => {
    test(`sweeper should withdrawViaSignature 10 of ${traderName}'s ${tokenName}'`, async () => {
      const actionViaSignatureStruct = utils.genActionViaSignatureStruct({
        fromPrivateKey: getKeypair(traderName).privateKey,
        to: getAccountAddress(traderName),
        token: await fetchOrDeployTokenAddress(tokenName),
        amount: 10,
        expiration: new Date().getTime() + (10 * THOUSAND),
        nonce: Uu.genRandom(32),
        actionSalt: withdrawSalt
      })
      const engineWriter = await fetchEngineWriter(AccountNames.SWEEPER)
      await engineWriter.withdrawViaSignature(actionViaSignatureStruct)
    })
  })
  traderNames.forEach((traderName) => {
    test(`${traderName}'s ${tokenName} balance should be 10`, async () => {
      const tokenReader = await fetchTokenReader(tokenName)
      const balance = await tokenReader.fetchBalance(getAccountAddress(traderName))
      expect(balance.toNumber()).toBe(10)
    })
  })
  traderNames.forEach((traderName) => {
    test(`${traderName}'s engine balance of ${tokenName} should be ${startBalance - 10}`, async () => {
      const balance = await engineReader.fetchBalance({
        holder: getAccountAddress(traderName),
        token: await fetchOrDeployTokenAddress(tokenName)
      })
      expect(balance.toNumber()).toBe(startBalance - 10)
    })
  })
  traderNames.forEach((traderName) => {
    test(`${traderName} should approve engine to transfer 10 ${tokenName}`, async () => {
      const tokenWriter = await fetchTokenWriter({
        accountName: traderName,
        tokenName
      })
      await tokenWriter.setAllowance({
        spender: engine,
        amount: 10
      })
    })
  })
  traderNames.forEach((traderName) => {
    test(`sweeper should depositViaSignature 10 of ${traderName}'s ${tokenName}'`, async () => {
      const actionViaSignatureStruct = utils.genActionViaSignatureStruct({
        fromPrivateKey: getKeypair(traderName).privateKey,
        to: getAccountAddress(traderName),
        token: await fetchOrDeployTokenAddress(tokenName),
        amount: 10,
        expiration: new Date().getTime() + (10 * THOUSAND),
        nonce: Uu.genRandom(32),
        actionSalt: depositSalt
      })
      const engineWriter = await fetchEngineWriter(AccountNames.SWEEPER)
      await engineWriter.depositViaSignature(actionViaSignatureStruct)
    })

  })
  traderNames.forEach((traderName) => {
    test(`${traderName}'s ${tokenName} balance should be 0`, async () => {
      const tokenReader = await fetchTokenReader(tokenName)
      const balance = await tokenReader.fetchBalance(getAccountAddress(traderName))
      expect(balance.toNumber()).toBe(0)
    })
  })
  traderNames.forEach((traderName) => {
    test(`${traderName}'s' engine balance of ${tokenName} should be ${startBalance}`, async () => {
      const balance = await engineReader.fetchBalance({
        holder: getAccountAddress(traderName),
        token: await fetchOrDeployTokenAddress(tokenName)
      })
      expect(balance.toNumber()).toBe(startBalance)
    })
  })

})
