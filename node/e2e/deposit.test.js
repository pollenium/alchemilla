"use strict";
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
var fixtures_1 = require("./lib/fixtures");
var ts_enum_util_1 = require("ts-enum-util");
var utils_1 = require("./lib/utils");
var pollenium_uvaursi_1 = require("pollenium-uvaursi");
var pollenium_ursinia_1 = require("pollenium-ursinia");
var __1 = require("../");
require('./engine.test');
require('./tokens.test');
var engine;
var engineReader;
var depositSalt;
var withdrawSalt;
var withdrawAndNotifySalt;
test('should fetch engine/engineReader/salts', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, utils_1.fetchOrDeployEngineAddress()];
            case 1:
                engine = _a.sent();
                return [4 /*yield*/, utils_1.fetchEngineReader()];
            case 2:
                engineReader = _a.sent();
                return [4 /*yield*/, engineReader.fetchDepositSalt()];
            case 3:
                depositSalt = _a.sent();
                return [4 /*yield*/, engineReader.fetchWithdrawSalt()];
            case 4:
                withdrawSalt = _a.sent();
                return [4 /*yield*/, engineReader.fetchWithdrawAndNotifySalt()];
            case 5:
                withdrawAndNotifySalt = _a.sent();
                return [2 /*return*/];
        }
    });
}); });
ts_enum_util_1.$enum(fixtures_1.TokenNames).forEach(function (tokenName) {
    test("deployer should allow engine to transfer " + tokenName, function () { return __awaiter(void 0, void 0, void 0, function () {
        var tokenWriter;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, utils_1.fetchTokenWriter({
                        accountName: fixtures_1.AccountNames.DEPLOYER,
                        tokenName: tokenName
                    })];
                case 1:
                    tokenWriter = _a.sent();
                    return [4 /*yield*/, tokenWriter.setAllowance({
                            spender: engine,
                            amount: fixtures_1.startBalance * fixtures_1.traderNames.length
                        })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    fixtures_1.traderNames.forEach(function (traderName) {
        test("deployer should depositViaNative " + tokenName + " to " + traderName, function () { return __awaiter(void 0, void 0, void 0, function () {
            var engineWriter, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, utils_1.fetchEngineWriter(fixtures_1.AccountNames.DEPLOYER)];
                    case 1:
                        engineWriter = _d.sent();
                        _b = (_a = engineWriter).depositViaNative;
                        _c = {
                            to: utils_1.getAccountAddress(traderName)
                        };
                        return [4 /*yield*/, utils_1.fetchOrDeployTokenAddress(tokenName)];
                    case 2: return [4 /*yield*/, _b.apply(_a, [(_c.token = _d.sent(),
                                _c.amount = fixtures_1.startBalance,
                                _c)])];
                    case 3:
                        _d.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    test("engine's " + tokenName + " balance should be " + fixtures_1.startBalance * fixtures_1.traderNames.length, function () { return __awaiter(void 0, void 0, void 0, function () {
        var tokenReader, balance;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, utils_1.fetchTokenReader(tokenName)];
                case 1:
                    tokenReader = _a.sent();
                    return [4 /*yield*/, tokenReader.fetchBalance(engine)];
                case 2:
                    balance = _a.sent();
                    expect(balance.compEq(fixtures_1.startBalance * fixtures_1.traderNames.length)).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
    test("deployer's engine balance of " + tokenName + " should be 0", function () { return __awaiter(void 0, void 0, void 0, function () {
        var balance, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _b = (_a = engineReader).fetchBalance;
                    _c = {
                        holder: utils_1.getAccountAddress(fixtures_1.AccountNames.DEPLOYER)
                    };
                    return [4 /*yield*/, utils_1.fetchOrDeployTokenAddress(tokenName)];
                case 1: return [4 /*yield*/, _b.apply(_a, [(_c.token = _d.sent(),
                            _c)])];
                case 2:
                    balance = _d.sent();
                    expect(balance.toNumber()).toBe(0);
                    return [2 /*return*/];
            }
        });
    }); });
    fixtures_1.traderNames.forEach(function (traderName) {
        test(traderName + "'s engine balance of " + tokenName + " should be " + fixtures_1.startBalance, function () { return __awaiter(void 0, void 0, void 0, function () {
            var balance, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _b = (_a = engineReader).fetchBalance;
                        _c = {
                            holder: utils_1.getAccountAddress(traderName)
                        };
                        return [4 /*yield*/, utils_1.fetchOrDeployTokenAddress(tokenName)];
                    case 1: return [4 /*yield*/, _b.apply(_a, [(_c.token = _d.sent(),
                                _c)])];
                    case 2:
                        balance = _d.sent();
                        expect(balance.toNumber()).toBe(fixtures_1.startBalance);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    fixtures_1.traderNames.forEach(function (traderName) {
        test(traderName + " should withdrawViaNative 10 " + tokenName + " to coinbase", function () { return __awaiter(void 0, void 0, void 0, function () {
            var engineWriter, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, utils_1.fetchEngineWriter(traderName)];
                    case 1:
                        engineWriter = _d.sent();
                        _b = (_a = engineWriter).withdrawViaNative;
                        _c = {
                            to: utils_1.getAccountAddress(fixtures_1.AccountNames.COINBASE)
                        };
                        return [4 /*yield*/, utils_1.fetchOrDeployTokenAddress(tokenName)];
                    case 2: return [4 /*yield*/, _b.apply(_a, [(_c.token = _d.sent(),
                                _c.amount = 10,
                                _c)])];
                    case 3:
                        _d.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    test("coinbases's " + tokenName + " balance should be " + fixtures_1.traderNames.length * 10, function () { return __awaiter(void 0, void 0, void 0, function () {
        var tokenReader, balance;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, utils_1.fetchTokenReader(tokenName)];
                case 1:
                    tokenReader = _a.sent();
                    return [4 /*yield*/, tokenReader.fetchBalance(utils_1.getAccountAddress(fixtures_1.AccountNames.COINBASE))];
                case 2:
                    balance = _a.sent();
                    expect(balance.toNumber()).toBe(fixtures_1.traderNames.length * 10);
                    return [2 /*return*/];
            }
        });
    }); });
    fixtures_1.traderNames.forEach(function (traderName) {
        test(traderName + "'s' engine balance of " + tokenName + " should be " + (fixtures_1.startBalance - 10), function () { return __awaiter(void 0, void 0, void 0, function () {
            var balance, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _b = (_a = engineReader).fetchBalance;
                        _c = {
                            holder: utils_1.getAccountAddress(traderName)
                        };
                        return [4 /*yield*/, utils_1.fetchOrDeployTokenAddress(tokenName)];
                    case 1: return [4 /*yield*/, _b.apply(_a, [(_c.token = _d.sent(),
                                _c)])];
                    case 2:
                        balance = _d.sent();
                        expect(balance.toNumber()).toBe(fixtures_1.startBalance - 10);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    fixtures_1.traderNames.forEach(function (traderName) {
        test("coinbase should transfer 10 " + tokenName + " to " + traderName, function () { return __awaiter(void 0, void 0, void 0, function () {
            var tokenWriter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, utils_1.fetchTokenWriter({
                            accountName: fixtures_1.AccountNames.COINBASE,
                            tokenName: tokenName
                        })];
                    case 1:
                        tokenWriter = _a.sent();
                        return [4 /*yield*/, tokenWriter.transfer({
                                to: utils_1.getAccountAddress(traderName),
                                amount: 10
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    fixtures_1.traderNames.forEach(function (traderName) {
        test(traderName + "'s " + tokenName + " balance should be 10", function () { return __awaiter(void 0, void 0, void 0, function () {
            var tokenReader, balance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, utils_1.fetchTokenReader(tokenName)];
                    case 1:
                        tokenReader = _a.sent();
                        return [4 /*yield*/, tokenReader.fetchBalance(utils_1.getAccountAddress(traderName))];
                    case 2:
                        balance = _a.sent();
                        expect(balance.compEq(10)).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    fixtures_1.traderNames.forEach(function (traderName) {
        test(traderName + " should approve engine to transfer 10 " + tokenName, function () { return __awaiter(void 0, void 0, void 0, function () {
            var tokenWriter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, utils_1.fetchTokenWriter({
                            accountName: traderName,
                            tokenName: tokenName
                        })];
                    case 1:
                        tokenWriter = _a.sent();
                        return [4 /*yield*/, tokenWriter.setAllowance({
                                spender: engine,
                                amount: 10
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    fixtures_1.traderNames.forEach(function (traderName) {
        test("sweeper should depositViaSignature 10 of " + traderName + "'s " + tokenName + "'", function () { return __awaiter(void 0, void 0, void 0, function () {
            var actionViaSignatureStruct, _a, _b, engineWriter;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = __1.genActionViaSignatureStruct;
                        _b = {
                            fromPrivateKey: utils_1.getKeypair(traderName).privateKey,
                            to: utils_1.getAccountAddress(traderName)
                        };
                        return [4 /*yield*/, utils_1.fetchOrDeployTokenAddress(tokenName)];
                    case 1:
                        actionViaSignatureStruct = _a.apply(void 0, [(_b.token = _c.sent(),
                                _b.amount = 10,
                                _b.expiration = new Date().getTime() + (10 * pollenium_ursinia_1.THOUSAND),
                                _b.nonce = pollenium_uvaursi_1.Uu.genRandom(32),
                                _b.actionSalt = depositSalt,
                                _b)]);
                        return [4 /*yield*/, utils_1.fetchEngineWriter(fixtures_1.AccountNames.SWEEPER)];
                    case 2:
                        engineWriter = _c.sent();
                        return [4 /*yield*/, engineWriter.depositViaSignature(actionViaSignatureStruct)];
                    case 3:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    fixtures_1.traderNames.forEach(function (traderName) {
        test(traderName + "'s " + tokenName + " balance should be 0", function () { return __awaiter(void 0, void 0, void 0, function () {
            var tokenReader, balance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, utils_1.fetchTokenReader(tokenName)];
                    case 1:
                        tokenReader = _a.sent();
                        return [4 /*yield*/, tokenReader.fetchBalance(utils_1.getAccountAddress(traderName))];
                    case 2:
                        balance = _a.sent();
                        expect(balance.toNumber()).toBe(0);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    fixtures_1.traderNames.forEach(function (traderName) {
        test(traderName + "'s engine balance of " + tokenName + " should be " + fixtures_1.startBalance, function () { return __awaiter(void 0, void 0, void 0, function () {
            var balance, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _b = (_a = engineReader).fetchBalance;
                        _c = {
                            holder: utils_1.getAccountAddress(traderName)
                        };
                        return [4 /*yield*/, utils_1.fetchOrDeployTokenAddress(tokenName)];
                    case 1: return [4 /*yield*/, _b.apply(_a, [(_c.token = _d.sent(),
                                _c)])];
                    case 2:
                        balance = _d.sent();
                        expect(balance.toNumber()).toBe(fixtures_1.startBalance);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    fixtures_1.traderNames.forEach(function (traderName) {
        test("sweeper should withdrawViaSignature 10 of " + traderName + "'s " + tokenName + "'", function () { return __awaiter(void 0, void 0, void 0, function () {
            var actionViaSignatureStruct, _a, _b, engineWriter;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = __1.genActionViaSignatureStruct;
                        _b = {
                            fromPrivateKey: utils_1.getKeypair(traderName).privateKey,
                            to: utils_1.getAccountAddress(traderName)
                        };
                        return [4 /*yield*/, utils_1.fetchOrDeployTokenAddress(tokenName)];
                    case 1:
                        actionViaSignatureStruct = _a.apply(void 0, [(_b.token = _c.sent(),
                                _b.amount = 10,
                                _b.expiration = new Date().getTime() + (10 * pollenium_ursinia_1.THOUSAND),
                                _b.nonce = pollenium_uvaursi_1.Uu.genRandom(32),
                                _b.actionSalt = withdrawSalt,
                                _b)]);
                        return [4 /*yield*/, utils_1.fetchEngineWriter(fixtures_1.AccountNames.SWEEPER)];
                    case 2:
                        engineWriter = _c.sent();
                        return [4 /*yield*/, engineWriter.withdrawViaSignature(actionViaSignatureStruct)];
                    case 3:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    fixtures_1.traderNames.forEach(function (traderName) {
        test(traderName + "'s " + tokenName + " balance should be 10", function () { return __awaiter(void 0, void 0, void 0, function () {
            var tokenReader, balance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, utils_1.fetchTokenReader(tokenName)];
                    case 1:
                        tokenReader = _a.sent();
                        return [4 /*yield*/, tokenReader.fetchBalance(utils_1.getAccountAddress(traderName))];
                    case 2:
                        balance = _a.sent();
                        expect(balance.toNumber()).toBe(10);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    fixtures_1.traderNames.forEach(function (traderName) {
        test(traderName + "'s engine balance of " + tokenName + " should be " + (fixtures_1.startBalance - 10), function () { return __awaiter(void 0, void 0, void 0, function () {
            var balance, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _b = (_a = engineReader).fetchBalance;
                        _c = {
                            holder: utils_1.getAccountAddress(traderName)
                        };
                        return [4 /*yield*/, utils_1.fetchOrDeployTokenAddress(tokenName)];
                    case 1: return [4 /*yield*/, _b.apply(_a, [(_c.token = _d.sent(),
                                _c)])];
                    case 2:
                        balance = _d.sent();
                        expect(balance.toNumber()).toBe(fixtures_1.startBalance - 10);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    fixtures_1.traderNames.forEach(function (traderName) {
        test(traderName + " should approve engine to transfer 10 " + tokenName, function () { return __awaiter(void 0, void 0, void 0, function () {
            var tokenWriter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, utils_1.fetchTokenWriter({
                            accountName: traderName,
                            tokenName: tokenName
                        })];
                    case 1:
                        tokenWriter = _a.sent();
                        return [4 /*yield*/, tokenWriter.setAllowance({
                                spender: engine,
                                amount: 10
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    fixtures_1.traderNames.forEach(function (traderName) {
        test("sweeper should depositViaSignature 10 of " + traderName + "'s " + tokenName + "'", function () { return __awaiter(void 0, void 0, void 0, function () {
            var actionViaSignatureStruct, _a, _b, engineWriter;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = __1.genActionViaSignatureStruct;
                        _b = {
                            fromPrivateKey: utils_1.getKeypair(traderName).privateKey,
                            to: utils_1.getAccountAddress(traderName)
                        };
                        return [4 /*yield*/, utils_1.fetchOrDeployTokenAddress(tokenName)];
                    case 1:
                        actionViaSignatureStruct = _a.apply(void 0, [(_b.token = _c.sent(),
                                _b.amount = 10,
                                _b.expiration = new Date().getTime() + (10 * pollenium_ursinia_1.THOUSAND),
                                _b.nonce = pollenium_uvaursi_1.Uu.genRandom(32),
                                _b.actionSalt = depositSalt,
                                _b)]);
                        return [4 /*yield*/, utils_1.fetchEngineWriter(fixtures_1.AccountNames.SWEEPER)];
                    case 2:
                        engineWriter = _c.sent();
                        return [4 /*yield*/, engineWriter.depositViaSignature(actionViaSignatureStruct)];
                    case 3:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    fixtures_1.traderNames.forEach(function (traderName) {
        test(traderName + "'s " + tokenName + " balance should be 0", function () { return __awaiter(void 0, void 0, void 0, function () {
            var tokenReader, balance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, utils_1.fetchTokenReader(tokenName)];
                    case 1:
                        tokenReader = _a.sent();
                        return [4 /*yield*/, tokenReader.fetchBalance(utils_1.getAccountAddress(traderName))];
                    case 2:
                        balance = _a.sent();
                        expect(balance.toNumber()).toBe(0);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    fixtures_1.traderNames.forEach(function (traderName) {
        test(traderName + "'s' engine balance of " + tokenName + " should be " + fixtures_1.startBalance, function () { return __awaiter(void 0, void 0, void 0, function () {
            var balance, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _b = (_a = engineReader).fetchBalance;
                        _c = {
                            holder: utils_1.getAccountAddress(traderName)
                        };
                        return [4 /*yield*/, utils_1.fetchOrDeployTokenAddress(tokenName)];
                    case 1: return [4 /*yield*/, _b.apply(_a, [(_c.token = _d.sent(),
                                _c)])];
                    case 2:
                        balance = _d.sent();
                        expect(balance.toNumber()).toBe(fixtures_1.startBalance);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
