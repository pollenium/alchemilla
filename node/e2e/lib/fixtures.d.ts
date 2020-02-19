import { Uint256 } from 'pollenium-buttercup';
export declare enum AccountNames {
    ALICE = "alice",
    BOB = "bob",
    DEPLOYER = "deployer",
    ADMIN = "admin",
    ATTACKER = "attacker",
    MONARCH_HOT = "monarchHot",
    MONARCH_COLD = "monarchCold",
    COINBASE = "coinbase",
    SWEEPER = "sweeper"
}
export declare const traderNames: Array<AccountNames>;
export declare enum TokenNames {
    DAI = "dai",
    USDC = "usdc",
    WETH = "weth",
    MKR = "mkr"
}
export declare const startBalance: Uint256;
export declare const totalSupply: Uint256;
