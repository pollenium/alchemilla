import { AccountNames, TokenNames, totalSupply } from '../fixtures'
import { getWallet } from './getWallet'
import { TokenDeployer } from 'pollenium-toadflax'
import { Address } from 'pollenium-buttercup'

const tokenAddresses: Record<string, Address> = {}

export async function fetchOrDeployTokenAddress(tokenName: TokenNames): Promise<Address> {
  if (tokenAddresses[tokenName]) {
    return tokenAddresses[tokenName]
  }
  const tokenContractDeployer = new TokenDeployer({
    signer: getWallet(AccountNames.DEPLOYER)
  })
  const { address } = await tokenContractDeployer.deploy({ totalSupply })
  tokenAddresses[tokenName] = new Address(address)
  return tokenAddresses[tokenName]
}
