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
exports.__esModule = true;
var enums_1 = require("../enums");
var Order_1 = require("./Order");
var OrderPair = /** @class */ (function () {
    function OrderPair(struct) {
        this.struct = struct;
        this.buyyOrder = struct.buyyOrder instanceof Order_1.Order ? this.buyyOrder : new Order_1.Order(this.buyyOrder);
        this.sellOrder = struct.sellOrder instanceof Order_1.Order ? this.sellOrder : new Order_1.Order(this.sellOrder);
        Object.assign(this, struct);
        if (this.buyyOrder.type !== enums_1.ORDER_TYPE.BUYY) {
            throw new InvalidBuyyOrderTypeError();
        }
        if (this.sellOrder.type !== enums_1.ORDER_TYPE.SELL) {
            throw new InvalidSellOrderTypeError();
        }
        if (!this.buyyOrder.quotToken.uu.getIsEqual(this.sellOrder.quotToken)) {
            throw new QuotTokenMismatchError();
        }
        if (!this.buyyOrder.variToken.uu.getIsEqual(this.sellOrder.variToken)) {
            throw new VariTokenMismatchError();
        }
        if (this.buyyOrder.priceNumer.opMul(this.sellOrder.priceDenom)
            .compLt(this.buyyOrder.priceDenom.opMul(this.sellOrder.priceNumer))) {
            throw new PriceConstraintError;
        }
        this.quotToken = this.buyyOrder.quotToken,
            this.variToken = this.buyyOrder.variToken;
    }
    OrderPair.prototype.getSolution = function (struct) {
        var quotTokenAvail = this.buyyOrder.getTokenAvail({
            tokenFilled: struct.buyyOrderTokenFilled,
            tokenBalance: struct.buyyOrderTokenBalance
        });
        var variTokenAvail = this.sellOrder.getTokenAvail({
            tokenFilled: struct.sellOrderTokenFilled,
            tokenBalance: struct.sellOrderTokenBalance
        });
        var buyyOrderVariTokenTransMax = quotTokenAvail
            .opMul(this.buyyOrder.priceDenom)
            .opDiv(this.buyyOrder.priceNumer);
        var variTokenTrans = (buyyOrderVariTokenTransMax.compLt(variTokenAvail))
            ? buyyOrderVariTokenTransMax
            : variTokenAvail;
        var quotTokenTrans = variTokenTrans
            .opMul(this.sellOrder.priceNumer)
            .opDiv(this.sellOrder.priceDenom);
        var quotTokenArbit = variTokenTrans
            .opMul(this.buyyOrder.priceNumer)
            .opDiv(this.buyyOrder.priceDenom)
            .opSub(quotTokenTrans);
        return {
            quotTokenTrans: quotTokenTrans,
            quotTokenArbit: quotTokenArbit,
            variTokenTrans: variTokenTrans
        };
    };
    return OrderPair;
}());
exports.OrderPair = OrderPair;
var InvalidBuyyOrderTypeError = /** @class */ (function (_super) {
    __extends(InvalidBuyyOrderTypeError, _super);
    function InvalidBuyyOrderTypeError() {
        var _this = _super.call(this, 'buyyOrder has invalid type') || this;
        Object.setPrototypeOf(_this, InvalidBuyyOrderTypeError.prototype);
        return _this;
    }
    return InvalidBuyyOrderTypeError;
}(Error));
exports.InvalidBuyyOrderTypeError = InvalidBuyyOrderTypeError;
var InvalidSellOrderTypeError = /** @class */ (function (_super) {
    __extends(InvalidSellOrderTypeError, _super);
    function InvalidSellOrderTypeError() {
        var _this = _super.call(this, 'sellOrder has invalid type') || this;
        Object.setPrototypeOf(_this, InvalidSellOrderTypeError.prototype);
        return _this;
    }
    return InvalidSellOrderTypeError;
}(Error));
exports.InvalidSellOrderTypeError = InvalidSellOrderTypeError;
var QuotTokenMismatchError = /** @class */ (function (_super) {
    __extends(QuotTokenMismatchError, _super);
    function QuotTokenMismatchError() {
        var _this = _super.call(this, 'quotToken mismatch') || this;
        Object.setPrototypeOf(_this, QuotTokenMismatchError.prototype);
        return _this;
    }
    return QuotTokenMismatchError;
}(Error));
exports.QuotTokenMismatchError = QuotTokenMismatchError;
var VariTokenMismatchError = /** @class */ (function (_super) {
    __extends(VariTokenMismatchError, _super);
    function VariTokenMismatchError() {
        var _this = _super.call(this, 'variToken mismatch') || this;
        Object.setPrototypeOf(_this, VariTokenMismatchError.prototype);
        return _this;
    }
    return VariTokenMismatchError;
}(Error));
exports.VariTokenMismatchError = VariTokenMismatchError;
var PriceConstraintError = /** @class */ (function (_super) {
    __extends(PriceConstraintError, _super);
    function PriceConstraintError() {
        var _this = _super.call(this, 'buyy order price should not be less than sell order price') || this;
        Object.setPrototypeOf(_this, PriceConstraintError.prototype);
        return _this;
    }
    return PriceConstraintError;
}(Error));
exports.PriceConstraintError = PriceConstraintError;
