import { TokenReader } from 'pollenium-toadflax'
import { fetchOrDeployTokenAddress } from './fetchOrDeployTokenAddress'
import { gaillardia } from '../gaillardia'
import { TokenNames } from '../fixtures'

const tokenContractReaders = {}

export async function fetchTokenReader(tokenName: TokenNames): Promise<TokenReader> {
  if (tokenContractReaders[tokenName]) {
    return tokenContractReaders[tokenName]
  }
  const tokenAddress = await fetchOrDeployTokenAddress(tokenName)
  const tokenContractReader = new TokenReader({
    provider: gaillardia.ethersWeb3Provider,
    address: tokenAddress
  })
  tokenContractReaders[tokenName] = tokenContractReader
  return tokenContractReader
}
