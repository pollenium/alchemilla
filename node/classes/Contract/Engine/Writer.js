"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var pollenium_buttercup_1 = require("pollenium-buttercup");
var pollenium_clover_1 = require("pollenium-clover");
var __1 = require("../../../");
var pollenium_ilex_1 = require("pollenium-ilex");
var EngineWriter = /** @class */ (function (_super) {
    __extends(EngineWriter, _super);
    function EngineWriter(struct) {
        return _super.call(this, __assign(__assign({}, __1.engineOutput), struct)) || this;
    }
    EngineWriter.prototype.setOwner = function (ownerUish) {
        return __awaiter(this, void 0, void 0, function () {
            var owner;
            return __generator(this, function (_a) {
                owner = new pollenium_buttercup_1.Address(ownerUish);
                return [2 /*return*/, this.genStateChange(this.ethersContract.transferOwnership(owner.uu.toPhex()))];
            });
        });
    };
    EngineWriter.prototype.setExecutorOracle = function (executorOracleUish) {
        return __awaiter(this, void 0, void 0, function () {
            var executorOracle;
            return __generator(this, function (_a) {
                executorOracle = new pollenium_buttercup_1.Address(executorOracleUish);
                return [2 /*return*/, this.genStateChange(this.ethersContract.setExecutorOracle(executorOracle.uu.toPhex()))];
            });
        });
    };
    EngineWriter.prototype.depositViaNative = function (struct) {
        return __awaiter(this, void 0, void 0, function () {
            var to, token, amount;
            return __generator(this, function (_a) {
                to = new pollenium_buttercup_1.Address(struct.to);
                token = new pollenium_buttercup_1.Address(struct.token);
                amount = new pollenium_buttercup_1.Uint256(struct.amount);
                return [2 /*return*/, this.genStateChange(this.ethersContract.depositViaNative(to.uu.toPhex(), token.uu.toPhex(), amount.uu.toPhex()))];
            });
        });
    };
    EngineWriter.prototype.depositViaSignature = function (struct) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.actionViaSignature(this.ethersContract.depositViaSignature, struct)];
            });
        });
    };
    EngineWriter.prototype.withdrawViaNative = function (struct) {
        return __awaiter(this, void 0, void 0, function () {
            var to, token, amount;
            return __generator(this, function (_a) {
                to = new pollenium_buttercup_1.Address(struct.to);
                token = new pollenium_buttercup_1.Address(struct.token);
                amount = new pollenium_buttercup_1.Uint256(struct.amount);
                return [2 /*return*/, this.genStateChange(this.ethersContract.withdrawViaNative(to.uu.toPhex(), token.uu.toPhex(), amount.uu.toPhex()))];
            });
        });
    };
    EngineWriter.prototype.withdrawViaSignature = function (struct) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.actionViaSignature(this.ethersContract.withdrawViaSignature, struct)];
            });
        });
    };
    EngineWriter.prototype.withdrawAndNotifyViaNative = function (struct) {
        return __awaiter(this, void 0, void 0, function () {
            var to, token, amount;
            return __generator(this, function (_a) {
                to = new pollenium_buttercup_1.Address(struct.to);
                token = new pollenium_buttercup_1.Address(struct.token);
                amount = new pollenium_buttercup_1.Uint256(struct.amount);
                return [2 /*return*/, this.genStateChange(this.ethersContract.withdrawAndNotifyViaNative(to.uu.toPhex(), token.uu.toPhex(), amount.uu.toPhex()))];
            });
        });
    };
    EngineWriter.prototype.withdrawAndNotifyViaSignature = function (struct) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.actionViaSignature(this.ethersContract.withdrawAndNotifyViaSignature, struct)];
            });
        });
    };
    EngineWriter.prototype.execute = function (executionRequest) {
        return __awaiter(this, void 0, void 0, function () {
            var args;
            var _a;
            return __generator(this, function (_b) {
                args = [
                    executionRequest.signedOrders.map(function (signedOrder) {
                        return signedOrder.getEthersArg();
                    }),
                    executionRequest.exchanges.map(function (exchange) {
                        var buyyOrderIndex = new pollenium_buttercup_1.Uint8(exchange.signedBuyyOrderIndex);
                        var sellOrderIndex = new pollenium_buttercup_1.Uint8(exchange.signedSellOrderIndex);
                        var quotTokenTrans = new pollenium_buttercup_1.Uint256(exchange.quotTokenTrans);
                        var variTokenTrans = new pollenium_buttercup_1.Uint256(exchange.variTokenTrans);
                        var quotTokenArbit = new pollenium_buttercup_1.Uint256(exchange.quotTokenArbit);
                        return {
                            buyyOrderIndex: buyyOrderIndex.uu.toPhex(),
                            sellOrderIndex: sellOrderIndex.uu.toPhex(),
                            quotTokenTrans: quotTokenTrans.uu.toPhex(),
                            variTokenTrans: variTokenTrans.uu.toPhex(),
                            quotTokenArbit: quotTokenArbit.uu.toPhex()
                        };
                    })
                ];
                return [2 /*return*/, this.genStateChange((_a = this.ethersContract).execute.apply(_a, args))];
            });
        });
    };
    EngineWriter.prototype.actionViaSignature = function (ethersContractFunction, struct) {
        return __awaiter(this, void 0, void 0, function () {
            var to, token, amount, expiration, nonce, signature;
            return __generator(this, function (_a) {
                to = new pollenium_buttercup_1.Address(struct.to);
                token = new pollenium_buttercup_1.Address(struct.token);
                amount = new pollenium_buttercup_1.Uint256(struct.amount);
                expiration = new pollenium_buttercup_1.Uint256(struct.expiration);
                nonce = new pollenium_buttercup_1.Bytes32(struct.nonce);
                signature = new pollenium_ilex_1.Signature(struct.signature);
                return [2 /*return*/, this.genStateChange(ethersContractFunction(to.uu.toPhex(), token.uu.toPhex(), amount.uu.toPhex(), expiration.uu.toPhex(), nonce.uu.toPhex(), signature.v.uu.toPhex(), signature.r.uu.toPhex(), signature.s.uu.toPhex()))];
            });
        });
    };
    return EngineWriter;
}(pollenium_clover_1.ContractWriter));
exports.EngineWriter = EngineWriter;
