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
exports.__esModule = true;
var pollenium_buttercup_1 = require("pollenium-buttercup");
var OrderPair_1 = require("./OrderPair");
function calcTokenAvail(struct) {
    var unfill = new pollenium_buttercup_1.Uint256(struct.limit).opSub(struct.fill);
    if (unfill.compLt(struct.balance)) {
        return unfill;
    }
    else {
        return new pollenium_buttercup_1.Uint256(struct.balance);
    }
}
var SignedOrderPair = /** @class */ (function (_super) {
    __extends(SignedOrderPair, _super);
    function SignedOrderPair(struct) {
        var _this = _super.call(this, { buyyOrder: struct.signedBuyyOrder, sellOrder: struct.signedSellOrder }) || this;
        _this.signedBuyyOrder = struct.signedBuyyOrder;
        _this.signedSellOrder = struct.signedSellOrder;
        return _this;
    }
    SignedOrderPair.prototype.calcSolution = function (stateFetcher) {
        return __awaiter(this, void 0, void 0, function () {
            var quotTokenAvail, _a, _b, variTokenAvail, _c, _d, buyyOrderVariTokenTransMax, variTokenTrans, quotTokenTrans, quotTokenArbit;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = calcTokenAvail;
                        _b = {
                            limit: this.buyyOrder.tokenLimit
                        };
                        return [4 /*yield*/, stateFetcher.fetchFill(this.signedBuyyOrder.getSignatureHash())];
                    case 1:
                        _b.fill = _e.sent();
                        return [4 /*yield*/, stateFetcher.fetchBalance({
                                holder: this.signedBuyyOrder.getTrader(),
                                token: this.quotToken
                            })];
                    case 2:
                        quotTokenAvail = _a.apply(void 0, [(_b.balance = _e.sent(),
                                _b)]);
                        _c = calcTokenAvail;
                        _d = {
                            limit: this.sellOrder.tokenLimit
                        };
                        return [4 /*yield*/, stateFetcher.fetchFill(this.signedSellOrder.getSignatureHash())];
                    case 3:
                        _d.fill = _e.sent();
                        return [4 /*yield*/, stateFetcher.fetchBalance({
                                holder: this.signedSellOrder.getTrader(),
                                token: this.variToken
                            })];
                    case 4:
                        variTokenAvail = _c.apply(void 0, [(_d.balance = _e.sent(),
                                _d)]);
                        buyyOrderVariTokenTransMax = quotTokenAvail
                            .opMul(this.buyyOrder.priceDenom)
                            .opDiv(this.buyyOrder.priceNumer);
                        variTokenTrans = (buyyOrderVariTokenTransMax.compLt(variTokenAvail))
                            ? buyyOrderVariTokenTransMax
                            : variTokenAvail;
                        quotTokenTrans = variTokenTrans
                            .opMul(this.sellOrder.priceNumer)
                            .opDiv(this.sellOrder.priceDenom);
                        quotTokenArbit = variTokenTrans
                            .opMul(this.buyyOrder.priceNumer)
                            .opDiv(this.buyyOrder.priceDenom)
                            .opSub(quotTokenTrans);
                        return [2 /*return*/, {
                                quotTokenTrans: quotTokenTrans,
                                quotTokenArbit: quotTokenArbit,
                                variTokenTrans: variTokenTrans
                            }];
                }
            });
        });
    };
    return SignedOrderPair;
}(OrderPair_1.OrderPair));
exports.SignedOrderPair = SignedOrderPair;
