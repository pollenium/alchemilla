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
var pollenium_frangipani_1 = __importDefault(require("pollenium-frangipani"));
var enums_1 = require("../enums");
var __1 = require("../");
var pollenium_ilex_1 = require("pollenium-ilex");
var pollenium_buttercup_1 = require("pollenium-buttercup");
var fixtures_1 = require("../fixtures");
var pollenium_uvaursi_1 = require("pollenium-uvaursi");
var salt = pollenium_uvaursi_1.Uu.genRandom(32);
var expiration = new pollenium_buttercup_1.Bytes32(pollenium_uvaursi_1.Uu.genFill({ length: 32, fill: 255 }));
var buyyer = pollenium_ilex_1.Keypair.generate();
var seller = pollenium_ilex_1.Keypair.generate();
var FixtureFetcher = /** @class */ (function (_super) {
    __extends(FixtureFetcher, _super);
    function FixtureFetcher(struct) {
        var _this = _super.call(this) || this;
        _this.fixture = struct.fixture;
        _this.signedBuyyOrder = struct.signedBuyyOrder;
        _this.signedSellOrder = struct.signedSellOrder;
        return _this;
    }
    FixtureFetcher.prototype.fetchBalance = function (struct) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.signedBuyyOrder.getTrader().uu.getIsEqual(struct.holder)) {
                    if (this.signedBuyyOrder.quotToken.uu.getIsEqual(struct.token)) {
                        return [2 /*return*/, pollenium_buttercup_1.Uint256.fromNumber(this.fixture.chainState.buyyOrderTokenBalance)];
                    }
                }
                if (this.signedSellOrder.getTrader().uu.getIsEqual(struct.holder)) {
                    if (this.signedSellOrder.variToken.uu.getIsEqual(struct.token)) {
                        return [2 /*return*/, pollenium_buttercup_1.Uint256.fromNumber(this.fixture.chainState.sellOrderTokenBalance)];
                    }
                }
                throw new Error('Unknown holder/token balance');
            });
        });
    };
    FixtureFetcher.prototype.fetchFill = function (signatureHash) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.signedBuyyOrder.getSignatureHash().uu.getIsEqual(signatureHash)) {
                    return [2 /*return*/, this.fixture.chainState.buyyOrderTokenFilled];
                }
                if (this.signedSellOrder.getSignatureHash().uu.getIsEqual(signatureHash)) {
                    return [2 /*return*/, this.fixture.chainState.sellOrderTokenFilled];
                }
                throw new Error('Unknown fill');
            });
        });
    };
    return FixtureFetcher;
}(__1.StateFetcher));
pollenium_frangipani_1["default"].forEach(function (fixture, index) {
    var buyyOrder = new __1.Order({
        salt: salt,
        expiration: expiration,
        direction: enums_1.OrderDirection.BUYY,
        quotToken: fixtures_1.dai,
        variToken: fixtures_1.weth,
        tokenLimit: pollenium_buttercup_1.Uint256.fromNumber(fixture.orders.buyy.tokenLimit),
        priceNumer: pollenium_buttercup_1.Uint256.fromNumber(fixture.orders.buyy.priceNumer),
        priceDenom: pollenium_buttercup_1.Uint256.fromNumber(fixture.orders.buyy.priceDenom)
    });
    var signedBuyyOrder = new __1.SignedOrder({
        order: buyyOrder,
        signature: buyyer.getSignature(buyyOrder.getSugmaHash())
    });
    var sellOrder = new __1.Order({
        salt: salt,
        expiration: expiration,
        direction: enums_1.OrderDirection.SELL,
        quotToken: fixtures_1.dai,
        variToken: fixtures_1.weth,
        tokenLimit: pollenium_buttercup_1.Uint256.fromNumber(fixture.orders.sell.tokenLimit),
        priceNumer: pollenium_buttercup_1.Uint256.fromNumber(fixture.orders.sell.priceNumer),
        priceDenom: pollenium_buttercup_1.Uint256.fromNumber(fixture.orders.sell.priceDenom)
    });
    var signedSellOrder = new __1.SignedOrder({
        order: sellOrder,
        signature: seller.getSignature(sellOrder.getSugmaHash())
    });
    var signedOrderPair = new __1.SignedOrderPair({ signedBuyyOrder: signedBuyyOrder, signedSellOrder: signedSellOrder });
    var fixtureFetcher = new FixtureFetcher({
        signedBuyyOrder: signedBuyyOrder,
        signedSellOrder: signedSellOrder,
        fixture: fixture
    });
    test("fixture #" + index + " solution", function () { return __awaiter(void 0, void 0, void 0, function () {
        var solution;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, signedOrderPair.calcSolution(fixtureFetcher)];
                case 1:
                    solution = _a.sent();
                    expect(solution.quotTokenTrans.toNumber()).toBe(fixture.solution.quotTokenTrans);
                    expect(solution.variTokenTrans.toNumber()).toBe(fixture.solution.variTokenTrans);
                    expect(solution.quotTokenArbit.toNumber()).toBe(fixture.solution.quotTokenArbit);
                    return [2 /*return*/];
            }
        });
    }); });
});
