import {
  fetchEngineReader,
  fetchEngineWriter,
  getKeypair,
  getAccountAddress,
  fetchOrDeployMonarchicExecutorOracleAddress
} from './lib/utils'
import { AccountNames } from './lib/fixtures'
import { EngineReader } from '../'

require('./monarchicExecutorOracle.test')

let engineReader: EngineReader

test('fetch engineReader', async () => {
  engineReader = await fetchEngineReader()
})

test('owner should be DEPLOYER', async () => {
  const owner = await engineReader.fetchOwner()
  expect(
    owner.uu.getIsEqual(getAccountAddress(AccountNames.DEPLOYER))
  ).toBe(true)
})

test('set owner to ADMIN', async () => {
  const engineWriter = await fetchEngineWriter(AccountNames.DEPLOYER)
  await engineWriter.setOwner(getAccountAddress(AccountNames.ADMIN))
})

test('owner should be ADMIN', async () => {
  const owner = await engineReader.fetchOwner()
  expect(
    owner.uu.getIsEqual(getAccountAddress(AccountNames.ADMIN))
  ).toBe(true)
})

test('set executorOracle to monarchicExecutorOracle', async () => {
  const engineWriter = await fetchEngineWriter(AccountNames.ADMIN)
  const monarchicExecutorOracle = await fetchOrDeployMonarchicExecutorOracleAddress()
  await engineWriter.setExecutorOracle(monarchicExecutorOracle)
})

test('executorOracle should be monarchicExecutorOracle', async () => {
  const executorOracle = await engineReader.fetchExecutorOracle()
  const monarchicExecutorOracle = await fetchOrDeployMonarchicExecutorOracleAddress()
  expect(
    executorOracle.uu.getIsEqual(monarchicExecutorOracle)
  ).toBe(true)

})

test('owner should be ADMIN', async () => {
  const owner = await engineReader.fetchOwner()
  expect(
    owner.uu.getIsEqual(getAccountAddress(AccountNames.ADMIN))
  ).toBe(true)
})


test('ATTACKER should not be able to set owner', async () => {
  expect.assertions(1)

  const engineWriter = await fetchEngineWriter(AccountNames.ATTACKER)
  return expect(
    engineWriter.setOwner(getAccountAddress(AccountNames.ATTACKER))
  ).rejects.toBeInstanceOf(Error)
})

test('owner should be ADMIN', async () => {
  const owner = await engineReader.fetchOwner()
  expect(
    owner.uu.getIsEqual(getAccountAddress(AccountNames.ADMIN))
  ).toBe(true)
})
