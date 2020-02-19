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
var pollenium_ilex_1 = require("pollenium-ilex");
var Order_1 = require("./Order");
var pollenium_uvaursi_1 = require("pollenium-uvaursi");
var SignedOrder = /** @class */ (function (_super) {
    __extends(SignedOrder, _super);
    function SignedOrder(struct) {
        var _this = _super.call(this, struct.order instanceof Order_1.Order ? struct.order.struct : struct.order) || this;
        _this.signature = new pollenium_ilex_1.Signature(struct.signature);
        return _this;
    }
    SignedOrder.prototype.getTrader = function () {
        if (this.trader) {
            return this.trader;
        }
        this.trader = new pollenium_buttercup_1.Address(this.signature.getSigner(this.getSugmaHash()));
        return this.trader;
    };
    SignedOrder.prototype.getEthersArg = function () {
        return [
            this.getTrader().uu.toPhex(),
            this.quotToken.uu.toPhex(),
            this.variToken.uu.toPhex(),
            this.priceNumer.uu.toPhex(),
            this.priceDenom.uu.toPhex(),
            this.tokenLimit.uu.toPhex(),
            this.signature.v.toNumber(),
            this.signature.r.uu.toPhex(),
            this.signature.s.uu.toPhex()
        ];
    };
    SignedOrder.prototype.getLigma = function () {
        if (this.ligma) {
            return this.ligma;
        }
        this.ligma = pollenium_uvaursi_1.Uu.genConcat([
            this.prevBlockHash,
            pollenium_buttercup_1.Uint8.fromNumber(this.type),
            this.quotToken,
            this.variToken,
            this.priceNumer,
            this.priceDenom,
            this.tokenLimit,
            this.signature.v,
            this.signature.r,
            this.signature.s
        ]);
        return this.ligma;
    };
    SignedOrder.fromLigma = function (uishLigma) {
        var ligma = pollenium_uvaursi_1.Uu.wrap(uishLigma);
        var prevBlockHash = new pollenium_buttercup_1.Bytes32(ligma.u.slice(0, 32));
        var type = ligma.u[32];
        var quotToken = new pollenium_buttercup_1.Address(ligma.u.slice(33, 53));
        var variToken = new pollenium_buttercup_1.Address(ligma.u.slice(53, 73));
        var priceNumer = new pollenium_buttercup_1.Uint256(ligma.u.slice(73, 105));
        var priceDenom = new pollenium_buttercup_1.Uint256(ligma.u.slice(105, 137));
        var tokenLimit = new pollenium_buttercup_1.Uint256(ligma.u.slice(137, 169));
        var signatureV = new pollenium_buttercup_1.Uint8(ligma.u.slice(169, 170));
        var signatureR = new pollenium_buttercup_1.Bytes32(ligma.u.slice(170, 202));
        var signatureS = new pollenium_buttercup_1.Bytes32(ligma.u.slice(202, 234));
        var orderStruct = {
            prevBlockHash: prevBlockHash,
            type: type,
            quotToken: quotToken,
            variToken: variToken,
            priceNumer: priceNumer,
            priceDenom: priceDenom,
            tokenLimit: tokenLimit
        };
        var signature = new pollenium_ilex_1.Signature({
            v: signatureV,
            r: signatureR,
            s: signatureS
        });
        return new SignedOrder({ order: orderStruct, signature: signature });
    };
    return SignedOrder;
}(Order_1.Order));
exports.SignedOrder = SignedOrder;
