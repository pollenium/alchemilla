import { TokenNames, AccountNames, traderNames, startBalance } from './lib/fixtures'
import { $enum } from 'ts-enum-util'
import {
  fetchTokenReader,
  fetchTokenWriter,
  fetchEngineReader,
  fetchEngineWriter,
  fetchOrDeployTokenAddress,
  fetchOrDeployEngineAddress,
  getAccountAddress
} from './lib/utils'
import { EngineReader } from '../'
import { Address } from 'pollenium-buttercup'

require('./engine.test')
require('./tokens.test')

let engine: Address
let engineReader: EngineReader

test('should fetch engine/engineReader', async () => {
  engine = await fetchOrDeployEngineAddress()
  engineReader = await fetchEngineReader()
})

$enum(TokenNames).forEach((tokenName) => {

  test(`deployer should allow engine to transfer ${tokenName}`, async () => {
    const tokenWriter = await fetchTokenWriter({
      accountName: AccountNames.DEPLOYER,
      tokenName
    })
    await tokenWriter.setAllowance({
      spender: engine,
      amount: startBalance.opMul(traderNames.length)
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
  test(`engine's ${tokenName} balance should be startBalance * ${traderNames.length}`, async () => {
    const tokenReader = await fetchTokenReader(tokenName)
    const balance = await tokenReader.fetchBalance(engine)
    expect(balance.compEq(startBalance.opMul(traderNames.length))).toBe(true)
  })
  test(`deployer's engine balance of ${tokenName} should be 0`, async () => {
    const balance = await engineReader.fetchBalance({
      holder: getAccountAddress(AccountNames.DEPLOYER),
      token: await fetchOrDeployTokenAddress(tokenName)
    })
    expect(balance.compEq(0)).toBe(true)
  })
  traderNames.forEach((traderName) => {
    test(`${traderName}'s engine balance of ${tokenName} should be startBalance`, async () => {
      const balance = await engineReader.fetchBalance({
        holder: getAccountAddress(traderName),
        token: await fetchOrDeployTokenAddress(tokenName)
      })
      expect(balance.compEq(startBalance)).toBe(true)
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
    expect(balance.compEq(traderNames.length * 10)).toBe(true)
  })
  traderNames.forEach((traderName) => {
    test(`${traderName}'s' engine balance of ${tokenName} should be startBalance - 10`, async () => {
      const balance = await engineReader.fetchBalance({
        holder: getAccountAddress(traderName),
        token: await fetchOrDeployTokenAddress(tokenName)
      })
      expect(balance.compEq(startBalance.opSub(10))).toBe(true)
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
    test(`sweeper should depositViaSweep ${traderName}'s ${tokenName}'`, async () => {
      const engineWriter = await fetchEngineWriter(AccountNames.SWEEPER)
      await engineWriter.depositViaSweep({
        toAndFrom: getAccountAddress(traderName),
        token: await fetchOrDeployTokenAddress(tokenName)
      })
    })
  })
  traderNames.forEach((traderName) => {
    test(`${traderName}'s ${tokenName} balance should be 0`, async () => {
      const tokenReader = await fetchTokenReader(tokenName)
      const balance = await tokenReader.fetchBalance(getAccountAddress(traderName))
      expect(balance.compEq(0)).toBe(true)
    })
  })
  traderNames.forEach((traderName) => {
    test(`${traderName}'s' engine balance of ${tokenName} should be startBalance`, async () => {
      const balance = await engineReader.fetchBalance({
        holder: getAccountAddress(traderName),
        token: await fetchOrDeployTokenAddress(tokenName)
      })
      expect(balance.compEq(startBalance)).toBe(true)
    })
  })

})
