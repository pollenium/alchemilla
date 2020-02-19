import { TokenWriter } from 'pollenium-toadflax';
import { AccountNames, TokenNames } from '../fixtures';
export declare function fetchTokenWriter(struct: {
    accountName: AccountNames;
    tokenName: TokenNames;
}): Promise<TokenWriter>;
