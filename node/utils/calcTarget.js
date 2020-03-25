"use strict";
exports.__esModule = true;
var pollenium_buttercup_1 = require("pollenium-buttercup");
function calcTarget(struct) {
    var originalBlockNumber = new pollenium_buttercup_1.Uint256(struct.originalBlockNumber);
    var currentBlockNumber = new pollenium_buttercup_1.Uint256(struct.currentBlockNumber);
    var latency = struct.latency;
    return originalBlockNumber.opAdd(currentBlockNumber.opSub(originalBlockNumber).opDiv(latency).opAdd(1).opMul(latency));
}
exports.calcTarget = calcTarget;
