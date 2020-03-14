"use strict";
exports.__esModule = true;
var AccountNames;
(function (AccountNames) {
    AccountNames["ALICE"] = "alice";
    AccountNames["BOB"] = "bob";
    AccountNames["DEPLOYER"] = "deployer";
    AccountNames["ADMIN"] = "admin";
    AccountNames["ATTACKER"] = "attacker";
    AccountNames["MONARCH_HOT"] = "monarchHot";
    AccountNames["MONARCH_COLD"] = "monarchCold";
    AccountNames["COINBASE"] = "coinbase";
    AccountNames["SWEEPER"] = "sweeper";
})(AccountNames = exports.AccountNames || (exports.AccountNames = {}));
exports.traderNames = [
    AccountNames.ALICE,
    AccountNames.BOB
];
var TokenNames;
(function (TokenNames) {
    TokenNames["DAI"] = "dai";
    TokenNames["USDC"] = "usdc";
    TokenNames["WETH"] = "weth";
    TokenNames["MKR"] = "mkr";
})(TokenNames = exports.TokenNames || (exports.TokenNames = {}));
// export const traderNames = ['alice', 'bob']
// // const accountNames = ['deployer', 'admin', 'attacker', 'monarchHot', 'monarchCold', ...traderNames]
// // const tokenNames = ['dai', 'usdc', 'weth', 'mkr']
//
// const nullAddress = Address.genNull()
// const uint256Zero = Uint256.fromNumber(0)
//
exports.startBalance = 1000;
exports.totalSupply = exports.startBalance * exports.traderNames.length;
//
// const addresses = {}
// accountNames.forEach((accountName) => {
//   keypairs[accountName] = Keypair.generate()
//   addresses[accountName] = keypairs[accountName].getAddress()
// })
// export {
//   keypairs,
//   addresses,
//   nullAddress,
//   uint256Zero,
//   startBalance,
//   totalSupply
// }
