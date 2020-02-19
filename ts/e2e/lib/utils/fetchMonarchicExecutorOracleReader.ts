import { MonarchicExecutorOracleReader } from '../../../'
import { fetchOrDeployMonarchicExecutorOracleAddress } from './fetchOrDeployMonarchicExecutorOracleAddress'
import { gaillardia } from '../gaillardia'

let monarchicExecutorOracleReader

export async function fetchMonarchicExecutorOracleReader(): Promise<MonarchicExecutorOracleReader> {
  if (monarchicExecutorOracleReader) {
    return monarchicExecutorOracleReader
  }
  const monarchicExecutorOracleAddress = await fetchOrDeployMonarchicExecutorOracleAddress()
  monarchicExecutorOracleReader = new MonarchicExecutorOracleReader({
    provider: gaillardia.ethersWeb3Provider,
    address: monarchicExecutorOracleAddress
  })
  return monarchicExecutorOracleReader
}
