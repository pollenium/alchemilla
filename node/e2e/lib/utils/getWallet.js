"use strict";
exports.__esModule = true;
var getKeypair_1 = require("./getKeypair");
var gaillardia_1 = require("../gaillardia");
var wallets = {};
function getWallet(accountName) {
    if (wallets[accountName]) {
        return wallets[accountName];
    }
    var keypair = getKeypair_1.getKeypair(accountName);
    wallets[accountName] = gaillardia_1.gaillardia.genWallet(keypair.privateKey);
    return wallets[accountName];
}
exports.getWallet = getWallet;
