"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var pollenium_uvaursi_1 = require("pollenium-uvaursi");
var pollenium_buttercup_1 = require("pollenium-buttercup");
var pollenium_ilex_1 = require("pollenium-ilex");
var ethereumjs_abi_1 = __importDefault(require("ethereumjs-abi"));
var web3_utils_1 = __importDefault(require("web3-utils"));
function genActionViaSignatureStruct(struct) {
    var prehashBuffer = ethereumjs_abi_1["default"].rawEncode([
        'bytes20',
        'bytes20',
        'bytes32',
        'bytes32',
        'bytes32',
        'bytes32'
    ], [
        new pollenium_buttercup_1.Address(struct.to).uu.toPhex(),
        new pollenium_buttercup_1.Address(struct.token).uu.toPhex(),
        new pollenium_buttercup_1.Uint256(struct.amount).uu.toPhex(),
        new pollenium_buttercup_1.Uint256(struct.expiration).uu.toPhex(),
        new pollenium_buttercup_1.Bytes32(struct.nonce).uu.toPhex(),
        new pollenium_buttercup_1.Bytes32(struct.actionSalt).uu.toPhex()
    ]);
    var prehash = new pollenium_uvaursi_1.Uu(prehashBuffer);
    var hashHexish = web3_utils_1["default"].soliditySha3({
        type: 'bytes',
        value: prehash.toPhex()
    });
    var hash = pollenium_uvaursi_1.Uu.fromHexish(hashHexish);
    var keypair = new pollenium_ilex_1.Keypair(struct.fromPrivateKey);
    var signature = keypair.getSignature(hash);
    return __assign(__assign({}, struct), { signature: signature });
}
exports.genActionViaSignatureStruct = genActionViaSignatureStruct;
