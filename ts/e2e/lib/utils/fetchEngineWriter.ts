import { EngineWriter } from '../../../'
import { fetchOrDeployEngineAddress } from './fetchOrDeployEngineAddress'
import { AccountNames } from '../fixtures'
import { getWallet } from './getWallet'

let engineWriters = {}

export async function fetchEngineWriter(accountName: AccountNames): Promise<EngineWriter> {
  if (engineWriters[accountName]) {
    return engineWriters[accountName]
  }
  const engineAddress = await fetchOrDeployEngineAddress()
  engineWriters[accountName] = new EngineWriter({
    signer: getWallet(accountName),
    address: engineAddress
  })
  return engineWriters[accountName]
}
