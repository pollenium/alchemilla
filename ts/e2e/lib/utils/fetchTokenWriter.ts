import { TokenWriter } from 'pollenium-toadflax'
import { fetchOrDeployTokenAddress } from './fetchOrDeployTokenAddress'
import { ethers } from 'ethers'
import { AccountNames, TokenNames } from '../fixtures'
import { getWallet } from './getWallet'

const tokenContractWriters = {}

export async function fetchTokenWriter(struct: {
  accountName: AccountNames,
  tokenName: TokenNames
}): Promise<TokenWriter> {
  const { accountName, tokenName } = struct
  if (!tokenContractWriters[accountName]) {
    tokenContractWriters[accountName] = {}
  }
  if (tokenContractWriters[accountName][tokenName]) {
    return tokenContractWriters[accountName][tokenName]
  }
  const tokenAddress = await fetchOrDeployTokenAddress(tokenName)
  const tokenContractWriter = new TokenWriter({
    signer: getWallet(accountName),
    address: tokenAddress
  })
  tokenContractWriters[accountName][tokenName] = tokenContractWriter
  return tokenContractWriter
}
