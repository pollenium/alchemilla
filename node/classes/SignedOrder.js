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
var pollenium_ilex_2 = require("pollenium-ilex");
var web3_utils_1 = require("web3-utils");
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
            this.expiration.uu.toPhex(),
            this.priceNumer.uu.toPhex(),
            this.priceDenom.uu.toPhex(),
            this.tokenLimit.uu.toPhex(),
            this.signature.r.uu.toPhex(),
            this.signature.s.uu.toPhex(),
            this.getSignatureHash().uu.toPhex(),
            this.getTrader().uu.toPhex(),
            this.quotToken.uu.toPhex(),
            this.variToken.uu.toPhex(),
            pollenium_buttercup_1.Uint8.fromNumber(this.direction).uu.toPhex(),
            this.signature.v.toNumber(),
        ];
    };
    SignedOrder.prototype.getLigma = function () {
        if (this.ligma) {
            return this.ligma;
        }
        this.ligma = pollenium_uvaursi_1.Uu.genConcat([
            this.salt,
            this.expiration,
            pollenium_buttercup_1.Uint8.fromNumber(this.direction),
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
        var salt = new pollenium_buttercup_1.Uint256(ligma.u.slice(0, 32));
        var expiration = new pollenium_buttercup_1.Uint256(ligma.u.slice(32, 64));
        var direction = ligma.u[64];
        var quotToken = new pollenium_buttercup_1.Address(ligma.u.slice(65, 85));
        var variToken = new pollenium_buttercup_1.Address(ligma.u.slice(85, 105));
        var priceNumer = new pollenium_buttercup_1.Uint256(ligma.u.slice(105, 137));
        var priceDenom = new pollenium_buttercup_1.Uint256(ligma.u.slice(137, 169));
        var tokenLimit = new pollenium_buttercup_1.Uint256(ligma.u.slice(169, 201));
        var signatureV = new pollenium_buttercup_1.Uint8(ligma.u.slice(201, 202));
        var signatureR = new pollenium_buttercup_1.Bytes32(ligma.u.slice(202, 234));
        var signatureS = new pollenium_buttercup_1.Bytes32(ligma.u.slice(234, 266));
        var orderStruct = {
            salt: salt,
            expiration: expiration,
            direction: direction,
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
    SignedOrder.prototype.getSignatureHash = function () {
        if (this.signatureHash) {
            return this.signatureHash;
        }
        this.signatureHash = new pollenium_buttercup_1.Bytes32(pollenium_uvaursi_1.Uu.fromHexish(web3_utils_1.soliditySha3({
            t: 'bytes',
            v: this.signature.getEncoding().toHex()
        })));
        return this.signatureHash;
    };
    SignedOrder.prototype.getPriority = function () {
        if (this.priority) {
            return this.priority;
        }
        this.priority = new pollenium_buttercup_1.Uint256(this.getSignatureHash().u.slice().reverse());
        return this.priority;
    };
    SignedOrder.gen = function (struct) {
        var keypair = new pollenium_ilex_2.Keypair(struct.privateKey);
        var order = new Order_1.Order(struct.order);
        return new SignedOrder({
            order: order,
            signature: keypair.getSignature(order.getSugmaHash())
        });
    };
    return SignedOrder;
}(Order_1.Order));
exports.SignedOrder = SignedOrder;
