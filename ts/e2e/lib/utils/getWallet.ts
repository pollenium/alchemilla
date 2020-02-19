import { AccountNames } from '../fixtures'
import { Wallet } from 'ethers'
import { getKeypair } from './getKeypair'
import { gaillardia } from '../gaillardia'

const wallets = {}

export function getWallet(accountName: AccountNames): Wallet {
  if (wallets[accountName]) {
    return wallets[accountName]
  }
  const keypair = getKeypair(accountName)
  wallets[accountName] = gaillardia.genWallet(keypair.privateKey)
  return wallets[accountName]
}
