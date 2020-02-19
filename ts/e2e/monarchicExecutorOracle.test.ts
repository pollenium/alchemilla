import { MonarchicExecutorOracleReader } from '../'

import {
  fetchMonarchicExecutorOracleReader,
  fetchMonarchicExecutorOracleWriter,
  getAccountAddress
} from './lib/utils'
import { AccountNames } from './lib/fixtures'

let monarchicExecutorOracleReader: MonarchicExecutorOracleReader

test('fetch monarchicExecutorOracle', async () => {
  monarchicExecutorOracleReader = await fetchMonarchicExecutorOracleReader()
})

test('owner should be DEPLOYER', async () => {
  const owner = await monarchicExecutorOracleReader.fetchOwner()
  expect(
    owner.uu.getIsEqual(getAccountAddress(AccountNames.DEPLOYER))
  ).toBe(true)
})

test('set hot to MONARCH_HOT', async () => {
  const monarchExecutorOracleWriter = await fetchMonarchicExecutorOracleWriter(
    AccountNames.DEPLOYER
  )
  await monarchExecutorOracleWriter.setHot(getAccountAddress(AccountNames.MONARCH_HOT))
})

test('hot should be MONARCH_HOT', async () => {
  const monarchHot = await monarchicExecutorOracleReader.fetchHot()
  expect(
    monarchHot.uu.getIsEqual(getAccountAddress(AccountNames.MONARCH_HOT))
  ).toBe(true)
})


test('set cold to MONARCH_COLD', async () => {
  const monarchExecutorOracleWriter = await fetchMonarchicExecutorOracleWriter(
    AccountNames.DEPLOYER
  )
  await monarchExecutorOracleWriter.setCold(getAccountAddress(AccountNames.MONARCH_COLD))
})

test('cold should be MONARCH_COLD', async () => {
  const monarchCold = await monarchicExecutorOracleReader.fetchCold()
  expect(
    monarchCold.uu.getIsEqual(getAccountAddress(AccountNames.MONARCH_COLD))
  ).toBe(true)
})
