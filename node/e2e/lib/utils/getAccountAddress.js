"use strict";
exports.__esModule = true;
var getKeypair_1 = require("./getKeypair");
function getAccountAddress(accountName) {
    return getKeypair_1.getKeypair(accountName).getAddress();
}
exports.getAccountAddress = getAccountAddress;
