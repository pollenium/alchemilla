import { EngineReader } from '../../../'
import { fetchOrDeployEngineAddress } from './fetchOrDeployEngineAddress'
import { gaillardia } from '../gaillardia'

let engineReader

export async function fetchEngineReader(): Promise<EngineReader> {
  if (engineReader) {
    return engineReader
  }
  const engineAddress = await fetchOrDeployEngineAddress()
  engineReader = new EngineReader({
    provider: gaillardia.ethersWeb3Provider,
    address: engineAddress
  })
  return engineReader
}
