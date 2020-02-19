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
var pollenium_buttercup_1 = require("pollenium-buttercup");
var web3_utils_1 = require("web3-utils");
var pollenium_uvaursi_1 = require("pollenium-uvaursi");
var Order = /** @class */ (function () {
    function Order(struct) {
        this.struct = struct;
        this.type = struct.type,
            this.prevBlockHash = new pollenium_buttercup_1.Bytes32(struct.prevBlockHash);
        this.quotToken = new pollenium_buttercup_1.Address(struct.quotToken);
        this.variToken = new pollenium_buttercup_1.Address(struct.variToken);
        this.tokenLimit = new pollenium_buttercup_1.Uint256(struct.tokenLimit);
        this.priceNumer = new pollenium_buttercup_1.Uint256(struct.priceNumer);
        this.priceDenom = new pollenium_buttercup_1.Uint256(struct.priceDenom);
        if (this.quotToken.uu.getIsEqual(this.variToken.uu)) {
            throw new QuotVariTokenMatchError(this.quotToken);
        }
        if (this.quotToken.getIsNull()) {
            throw new NullQuotTokenError;
        }
        if (this.variToken.getIsNull()) {
            throw new NullVariTokenError;
        }
        if (this.tokenLimit.getIsZero()) {
            throw new ZeroTokenLimitError;
        }
        if (this.priceNumer.getIsZero()) {
            throw new ZeroPriceNumerError;
        }
        if (this.priceDenom.getIsZero()) {
            throw new ZeroPriceDenomError;
        }
    }
    Order.prototype.getSugma = function () {
        if (this.sugma) {
            return this.sugma;
        }
        this.sugma = new pollenium_buttercup_1.Bytes(pollenium_uvaursi_1.Uu.genConcat([
            this.prevBlockHash,
            pollenium_buttercup_1.Uint8.fromNumber(this.type),
            this.quotToken,
            this.variToken,
            this.priceNumer,
            this.priceDenom,
            this.tokenLimit,
        ]));
        return this.sugma;
    };
    Order.prototype.getSugmaHash = function () {
        if (this.sugmaHash) {
            return this.sugmaHash;
        }
        this.sugmaHash = new pollenium_buttercup_1.Bytes32(pollenium_uvaursi_1.Uu.fromHexish(web3_utils_1.soliditySha3({
            t: 'bytes',
            v: this.getSugma().uu.toHex()
        })));
        return this.sugmaHash;
    };
    Order.prototype.getTokenUnfilled = function (tokenFilledUintable) {
        var tokenFilled = new pollenium_buttercup_1.Uint256(tokenFilledUintable);
        return this.tokenLimit.opSub(tokenFilled);
    };
    Order.prototype.getTokenAvail = function (struct) {
        var tokenFilled = new pollenium_buttercup_1.Uint256(struct.tokenFilled);
        var tokenBalance = new pollenium_buttercup_1.Uint256(struct.tokenBalance);
        var tokenUnfilled = this.getTokenUnfilled(tokenFilled);
        if (tokenUnfilled.compLt(tokenBalance)) {
            return tokenUnfilled;
        }
        else {
            return tokenBalance;
        }
    };
    return Order;
}());
exports.Order = Order;
var QuotVariTokenMatchError = /** @class */ (function (_super) {
    __extends(QuotVariTokenMatchError, _super);
    function QuotVariTokenMatchError(token) {
        var _this = _super.call(this, "quotToken and variToken should be different, received " + token.uu.toHex() + " for both") || this;
        Object.setPrototypeOf(_this, QuotVariTokenMatchError.prototype);
        return _this;
    }
    return QuotVariTokenMatchError;
}(Error));
exports.QuotVariTokenMatchError = QuotVariTokenMatchError;
var NullError = /** @class */ (function (_super) {
    __extends(NullError, _super);
    function NullError(variableName) {
        return _super.call(this, variableName + " should not be null") || this;
    }
    return NullError;
}(Error));
var ZeroError = /** @class */ (function (_super) {
    __extends(ZeroError, _super);
    function ZeroError(variableName) {
        return _super.call(this, variableName + " should not be zero") || this;
    }
    return ZeroError;
}(Error));
var NullQuotTokenError = /** @class */ (function (_super) {
    __extends(NullQuotTokenError, _super);
    function NullQuotTokenError() {
        var _this = _super.call(this, 'quotToken') || this;
        Object.setPrototypeOf(_this, NullQuotTokenError.prototype);
        return _this;
    }
    return NullQuotTokenError;
}(NullError));
exports.NullQuotTokenError = NullQuotTokenError;
var NullVariTokenError = /** @class */ (function (_super) {
    __extends(NullVariTokenError, _super);
    function NullVariTokenError() {
        var _this = _super.call(this, 'variToken') || this;
        Object.setPrototypeOf(_this, NullVariTokenError.prototype);
        return _this;
    }
    return NullVariTokenError;
}(NullError));
exports.NullVariTokenError = NullVariTokenError;
var ZeroTokenLimitError = /** @class */ (function (_super) {
    __extends(ZeroTokenLimitError, _super);
    function ZeroTokenLimitError() {
        var _this = _super.call(this, 'tokenLimit') || this;
        Object.setPrototypeOf(_this, ZeroTokenLimitError.prototype);
        return _this;
    }
    return ZeroTokenLimitError;
}(ZeroError));
exports.ZeroTokenLimitError = ZeroTokenLimitError;
var ZeroPriceNumerError = /** @class */ (function (_super) {
    __extends(ZeroPriceNumerError, _super);
    function ZeroPriceNumerError() {
        var _this = _super.call(this, 'priceNumer') || this;
        Object.setPrototypeOf(_this, ZeroPriceNumerError.prototype);
        return _this;
    }
    return ZeroPriceNumerError;
}(ZeroError));
exports.ZeroPriceNumerError = ZeroPriceNumerError;
var ZeroPriceDenomError = /** @class */ (function (_super) {
    __extends(ZeroPriceDenomError, _super);
    function ZeroPriceDenomError() {
        var _this = _super.call(this, 'priceDenom') || this;
        Object.setPrototypeOf(_this, ZeroPriceDenomError.prototype);
        return _this;
    }
    return ZeroPriceDenomError;
}(ZeroError));
exports.ZeroPriceDenomError = ZeroPriceDenomError;
