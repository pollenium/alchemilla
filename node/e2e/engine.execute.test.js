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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var gaillardia_1 = require("./lib/gaillardia");
var utils_1 = require("./lib/utils");
var pollenium_buttercup_1 = require("pollenium-buttercup");
var pollenium_frangipani_1 = __importDefault(require("pollenium-frangipani"));
var fixtures_1 = require("./lib/fixtures");
var ts_enum_util_1 = require("ts-enum-util");
var __1 = require("../");
require('./deposit.test');
var snapshotId;
var engineReader;
function arrayOf(length, callback) {
    var array = [];
    for (var i = 0; i < length; i++) {
        array.push(callback(i));
    }
    return array;
}
test('fetch engineReader', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, utils_1.fetchEngineReader()];
            case 1:
                engineReader = _a.sent();
                return [2 /*return*/];
        }
    });
}); });
test('snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, gaillardia_1.gaillardia.takeSnapshot()];
            case 1:
                snapshotId = _a.sent();
                return [2 /*return*/];
        }
    });
}); });
pollenium_frangipani_1["default"].forEach(function (fixture, index) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        describe("fixture " + index, function () {
            var quotTokenTrans = pollenium_buttercup_1.Uint256.fromNumber(fixture.solution.quotTokenTrans);
            var variTokenTrans = pollenium_buttercup_1.Uint256.fromNumber(fixture.solution.variTokenTrans);
            var quotTokenArbit = pollenium_buttercup_1.Uint256.fromNumber(fixture.solution.quotTokenArbit);
            var quotTokenTotal = quotTokenTrans.opAdd(quotTokenArbit);
            fixtures_1.traderNames.forEach(function (traderName) {
                ts_enum_util_1.$enum(fixtures_1.TokenNames).forEach(function (tokenName) {
                    test(traderName + "'s " + tokenName + " balance should be startBalance", function () { return __awaiter(void 0, void 0, void 0, function () {
                        var balance, _a, _b, _c;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0: return [4 /*yield*/, gaillardia_1.gaillardia.restoreSnapshot(snapshotId)];
                                case 1:
                                    _d.sent();
                                    return [4 /*yield*/, gaillardia_1.gaillardia.takeSnapshot()];
                                case 2:
                                    snapshotId = _d.sent();
                                    _b = (_a = engineReader).fetchBalance;
                                    _c = {
                                        holder: utils_1.getAccountAddress(traderName)
                                    };
                                    return [4 /*yield*/, utils_1.fetchOrDeployTokenAddress(tokenName)];
                                case 3: return [4 /*yield*/, _b.apply(_a, [(_c.token = _d.sent(),
                                            _c)])];
                                case 4:
                                    balance = _d.sent();
                                    expect(balance.uu.getIsEqual(fixtures_1.startBalance.uu)).toBe(true);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                });
                test('execute', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var prevBlockHash, buyyOrder, _a, _b, sellOrder, _c, _d, signedBuyyOrder, signedSellOrder, engineWriter;
                    return __generator(this, function (_e) {
                        switch (_e.label) {
                            case 0: return [4 /*yield*/, gaillardia_1.gaillardia.restoreSnapshot(snapshotId)];
                            case 1:
                                _e.sent();
                                return [4 /*yield*/, gaillardia_1.gaillardia.takeSnapshot()];
                            case 2:
                                snapshotId = _e.sent();
                                return [4 /*yield*/, gaillardia_1.gaillardia.fetchLatestBlockHash()];
                            case 3:
                                prevBlockHash = _e.sent();
                                _a = __1.Order.bind;
                                _b = {
                                    prevBlockHash: prevBlockHash,
                                    type: __1.ORDER_TYPE.BUYY
                                };
                                return [4 /*yield*/, utils_1.fetchOrDeployTokenAddress(fixtures_1.TokenNames.DAI)];
                            case 4:
                                _b.quotToken = _e.sent();
                                return [4 /*yield*/, utils_1.fetchOrDeployTokenAddress(fixtures_1.TokenNames.WETH)];
                            case 5:
                                buyyOrder = new (_a.apply(__1.Order, [void 0, (_b.variToken = _e.sent(),
                                        _b.tokenLimit = pollenium_buttercup_1.Uint256.fromNumber(fixture.orders.buyy.tokenLimit),
                                        _b.priceNumer = pollenium_buttercup_1.Uint256.fromNumber(fixture.orders.buyy.priceNumer),
                                        _b.priceDenom = pollenium_buttercup_1.Uint256.fromNumber(fixture.orders.buyy.priceDenom),
                                        _b)]))();
                                _c = __1.Order.bind;
                                _d = {
                                    prevBlockHash: prevBlockHash,
                                    type: __1.ORDER_TYPE.SELL
                                };
                                return [4 /*yield*/, utils_1.fetchOrDeployTokenAddress(fixtures_1.TokenNames.DAI)];
                            case 6:
                                _d.quotToken = _e.sent();
                                return [4 /*yield*/, utils_1.fetchOrDeployTokenAddress(fixtures_1.TokenNames.WETH)];
                            case 7:
                                sellOrder = new (_c.apply(__1.Order, [void 0, (_d.variToken = _e.sent(),
                                        _d.tokenLimit = pollenium_buttercup_1.Uint256.fromNumber(fixture.orders.sell.tokenLimit),
                                        _d.priceNumer = pollenium_buttercup_1.Uint256.fromNumber(fixture.orders.sell.priceNumer),
                                        _d.priceDenom = pollenium_buttercup_1.Uint256.fromNumber(fixture.orders.sell.priceDenom),
                                        _d)]))();
                                signedBuyyOrder = new __1.SignedOrder({
                                    order: buyyOrder,
                                    signature: utils_1.getKeypair(fixtures_1.AccountNames.ALICE).getSignature(buyyOrder.getSugmaHash())
                                });
                                signedSellOrder = new __1.SignedOrder({
                                    order: sellOrder,
                                    signature: utils_1.getKeypair(fixtures_1.AccountNames.BOB).getSignature(sellOrder.getSugmaHash())
                                });
                                return [4 /*yield*/, utils_1.fetchEngineWriter(fixtures_1.AccountNames.MONARCH_HOT)];
                            case 8:
                                engineWriter = _e.sent();
                                return [4 /*yield*/, engineWriter.execute({
                                        prevBlockHash: prevBlockHash,
                                        buyyOrders: [signedBuyyOrder],
                                        sellOrders: [signedSellOrder],
                                        exchanges: [
                                            {
                                                signedBuyyOrderIndex: pollenium_buttercup_1.Uint8.fromNumber(0),
                                                signedSellOrderIndex: pollenium_buttercup_1.Uint8.fromNumber(0),
                                                quotTokenTrans: quotTokenTrans,
                                                variTokenTrans: variTokenTrans,
                                                quotTokenArbit: quotTokenArbit
                                            }
                                        ]
                                    })];
                            case 9:
                                _e.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                test('should have transferred DAI from ALICE to BOB and MONARCH_COLD', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var balanceAlice, _a, _b, _c, balanceBob, _d, _e, _f, balanceMonarchCold, _g, _h, _j;
                    return __generator(this, function (_k) {
                        switch (_k.label) {
                            case 0:
                                _b = (_a = engineReader).fetchBalance;
                                _c = {
                                    holder: utils_1.getAccountAddress(fixtures_1.AccountNames.ALICE)
                                };
                                return [4 /*yield*/, utils_1.fetchOrDeployTokenAddress(fixtures_1.TokenNames.DAI)];
                            case 1: return [4 /*yield*/, _b.apply(_a, [(_c.token = _k.sent(),
                                        _c)])];
                            case 2:
                                balanceAlice = _k.sent();
                                _e = (_d = engineReader).fetchBalance;
                                _f = {
                                    holder: utils_1.getAccountAddress(fixtures_1.AccountNames.BOB)
                                };
                                return [4 /*yield*/, utils_1.fetchOrDeployTokenAddress(fixtures_1.TokenNames.DAI)];
                            case 3: return [4 /*yield*/, _e.apply(_d, [(_f.token = _k.sent(),
                                        _f)])];
                            case 4:
                                balanceBob = _k.sent();
                                _h = (_g = engineReader).fetchBalance;
                                _j = {
                                    holder: utils_1.getAccountAddress(fixtures_1.AccountNames.MONARCH_COLD)
                                };
                                return [4 /*yield*/, utils_1.fetchOrDeployTokenAddress(fixtures_1.TokenNames.DAI)];
                            case 5: return [4 /*yield*/, _h.apply(_g, [(_j.token = _k.sent(),
                                        _j)])];
                            case 6:
                                balanceMonarchCold = _k.sent();
                                expect(balanceAlice.toNumber()).toBe(fixtures_1.startBalance.opSub(quotTokenTotal).toNumber());
                                expect(balanceBob.toNumber()).toBe(fixtures_1.startBalance.opAdd(quotTokenTrans).toNumber());
                                expect(balanceMonarchCold.toNumber()).toBe(quotTokenArbit.toNumber());
                                return [2 /*return*/];
                        }
                    });
                }); });
                test('should have transferred WETH from BOB to ALICE', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var balanceAlice, _a, _b, _c, balanceBob, _d, _e, _f;
                    return __generator(this, function (_g) {
                        switch (_g.label) {
                            case 0:
                                _b = (_a = engineReader).fetchBalance;
                                _c = {
                                    holder: utils_1.getAccountAddress(fixtures_1.AccountNames.ALICE)
                                };
                                return [4 /*yield*/, utils_1.fetchOrDeployTokenAddress(fixtures_1.TokenNames.WETH)];
                            case 1: return [4 /*yield*/, _b.apply(_a, [(_c.token = _g.sent(),
                                        _c)])];
                            case 2:
                                balanceAlice = _g.sent();
                                _e = (_d = engineReader).fetchBalance;
                                _f = {
                                    holder: utils_1.getAccountAddress(fixtures_1.AccountNames.BOB)
                                };
                                return [4 /*yield*/, utils_1.fetchOrDeployTokenAddress(fixtures_1.TokenNames.WETH)];
                            case 3: return [4 /*yield*/, _e.apply(_d, [(_f.token = _g.sent(),
                                        _f)])];
                            case 4:
                                balanceBob = _g.sent();
                                expect(balanceAlice.toNumber()).toBe(fixtures_1.startBalance.opAdd(variTokenTrans).toNumber());
                                expect(balanceBob.toNumber()).toBe(fixtures_1.startBalance.opSub(variTokenTrans).toNumber());
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        });
        return [2 /*return*/];
    });
}); });
describe('multis', function () {
    var multisFixtures = [
        {
            buyyOrdersCount: 1,
            buyyOrderTokenLimit: 1,
            sellOrdersCount: 1,
            sellOrderTokenLimit: 1,
            exchanges: [{
                    buyyOrderIndex: 0,
                    sellOrderIndex: 0
                }]
        },
        {
            buyyOrdersCount: 1,
            buyyOrderTokenLimit: 5,
            sellOrdersCount: 5,
            sellOrderTokenLimit: 1,
            exchanges: arrayOf(5, function (i) {
                return {
                    buyyOrderIndex: 0,
                    sellOrderIndex: i
                };
            })
        }
    ];
    multisFixtures.forEach(function (multisFixture, index) {
        /*TODO: Add back */
        return;
        describe("multisFixture #" + index + ": [" + multisFixture.buyyOrdersCount + ", " + multisFixture.sellOrdersCount + ", " + multisFixture.exchanges.length + "]", function () {
            it("should execute batch of orders", function () { return __awaiter(void 0, void 0, void 0, function () {
                var prevBlockHash, buyyOrder, _a, _b, sellOrder, _c, _d, signedBuyyOrder, signedSellOrder, signedBuyyOrders, signedSellOrders, exchanges, i, i, i, exchangeFixture, engineWriter;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0: return [4 /*yield*/, gaillardia_1.gaillardia.restoreSnapshot(snapshotId)];
                        case 1:
                            _e.sent();
                            return [4 /*yield*/, gaillardia_1.gaillardia.takeSnapshot()];
                        case 2:
                            snapshotId = _e.sent();
                            return [4 /*yield*/, gaillardia_1.gaillardia.fetchLatestBlockHash()];
                        case 3:
                            prevBlockHash = _e.sent();
                            _a = __1.Order.bind;
                            _b = {
                                prevBlockHash: prevBlockHash,
                                type: __1.ORDER_TYPE.BUYY
                            };
                            return [4 /*yield*/, utils_1.fetchOrDeployTokenAddress(fixtures_1.TokenNames.DAI)];
                        case 4:
                            _b.quotToken = _e.sent();
                            return [4 /*yield*/, utils_1.fetchOrDeployTokenAddress(fixtures_1.TokenNames.WETH)];
                        case 5:
                            buyyOrder = new (_a.apply(__1.Order, [void 0, (_b.variToken = _e.sent(),
                                    _b.tokenLimit = pollenium_buttercup_1.Uint256.fromNumber(multisFixture.buyyOrderTokenLimit),
                                    _b.priceNumer = pollenium_buttercup_1.Uint256.fromNumber(1),
                                    _b.priceDenom = pollenium_buttercup_1.Uint256.fromNumber(1),
                                    _b)]))();
                            _c = __1.Order.bind;
                            _d = {
                                prevBlockHash: prevBlockHash,
                                type: __1.ORDER_TYPE.SELL
                            };
                            return [4 /*yield*/, utils_1.fetchOrDeployTokenAddress(fixtures_1.TokenNames.DAI)];
                        case 6:
                            _d.quotToken = _e.sent();
                            return [4 /*yield*/, utils_1.fetchOrDeployTokenAddress(fixtures_1.TokenNames.WETH)];
                        case 7:
                            sellOrder = new (_c.apply(__1.Order, [void 0, (_d.variToken = _e.sent(),
                                    _d.tokenLimit = pollenium_buttercup_1.Uint256.fromNumber(multisFixture.sellOrderTokenLimit),
                                    _d.priceNumer = pollenium_buttercup_1.Uint256.fromNumber(1),
                                    _d.priceDenom = pollenium_buttercup_1.Uint256.fromNumber(1),
                                    _d)]))();
                            signedBuyyOrder = new __1.SignedOrder({
                                order: buyyOrder,
                                signature: utils_1.getKeypair(fixtures_1.AccountNames.ALICE).getSignature(buyyOrder.getSugmaHash())
                            });
                            signedSellOrder = new __1.SignedOrder({
                                order: sellOrder,
                                signature: utils_1.getKeypair(fixtures_1.AccountNames.BOB).getSignature(sellOrder.getSugmaHash())
                            });
                            signedBuyyOrders = [];
                            signedSellOrders = [];
                            exchanges = [];
                            for (i = 0; i < multisFixture.buyyOrdersCount; i++) {
                                signedBuyyOrders.push(signedBuyyOrder);
                            }
                            for (i = 0; i < multisFixture.sellOrdersCount; i++) {
                                signedSellOrders.push(signedSellOrder);
                            }
                            for (i = 0; i < multisFixture.exchanges.length; i++) {
                                exchangeFixture = multisFixture.exchanges[i];
                                exchanges.push({
                                    signedBuyyOrderIndex: pollenium_buttercup_1.Uint8.fromNumber(exchangeFixture.buyyOrderIndex),
                                    signedSellOrderIndex: pollenium_buttercup_1.Uint8.fromNumber(exchangeFixture.sellOrderIndex),
                                    quotTokenTrans: pollenium_buttercup_1.Uint256.fromNumber(1),
                                    variTokenTrans: pollenium_buttercup_1.Uint256.fromNumber(1),
                                    quotTokenArbit: pollenium_buttercup_1.Uint256.fromNumber(0)
                                });
                            }
                            return [4 /*yield*/, utils_1.fetchEngineWriter(fixtures_1.AccountNames.MONARCH_HOT)];
                        case 8:
                            engineWriter = _e.sent();
                            return [4 /*yield*/, engineWriter.execute({
                                    prevBlockHash: prevBlockHash,
                                    buyyOrders: signedBuyyOrders,
                                    sellOrders: signedSellOrders,
                                    exchanges: exchanges
                                })];
                        case 9:
                            _e.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
});
