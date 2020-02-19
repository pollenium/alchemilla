import { MonarchicExecutorOracleWriter } from '../../../'
import { fetchOrDeployMonarchicExecutorOracleAddress } from './fetchOrDeployMonarchicExecutorOracleAddress'
import { AccountNames } from '../fixtures'
import { getWallet } from './getWallet'

let monarchicExecutorOracleWriters = {}

export async function fetchMonarchicExecutorOracleWriter(accountName: AccountNames): Promise<MonarchicExecutorOracleWriter> {
  if (monarchicExecutorOracleWriters[accountName]) {
    return monarchicExecutorOracleWriters[accountName]
  }
  const monarchicExecutorOracleAddress = await fetchOrDeployMonarchicExecutorOracleAddress()
  monarchicExecutorOracleWriters[accountName] = new MonarchicExecutorOracleWriter({
    signer: getWallet(accountName),
    address: monarchicExecutorOracleAddress
  })
  return monarchicExecutorOracleWriters[accountName]
}
