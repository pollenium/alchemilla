"use strict";
exports.__esModule = true;
var Order_1 = require("./Order");
var SignedOrder_1 = require("./SignedOrder");
var fixtures_1 = require("../fixtures");
var order = new Order_1.Order(fixtures_1.validOrderStruct);
var signature = fixtures_1.keypair.getSignature(order.getSugmaHash());
test('Order -> SignedOrder', function () {
    new SignedOrder_1.SignedOrder({ order: order, signature: signature });
});
test('getLigma/fromLigma', function () {
    var signedOrder0 = new SignedOrder_1.SignedOrder({ order: order, signature: signature });
    var ligma = signedOrder0.getLigma();
    var signedOrder1 = SignedOrder_1.SignedOrder.fromLigma(ligma);
    expect(signedOrder0.prevBlockHash.uu.getIsEqual(signedOrder1.prevBlockHash.uu)).toBe(true);
    expect(signedOrder0.type).toBe(signedOrder1.type);
    expect(signedOrder0.quotToken.uu.getIsEqual(signedOrder1.quotToken.uu)).toBe(true);
    expect(signedOrder0.variToken.uu.getIsEqual(signedOrder1.variToken.uu)).toBe(true);
    expect(signedOrder0.priceNumer.uu.getIsEqual(signedOrder1.priceNumer.uu)).toBe(true);
    expect(signedOrder0.priceDenom.uu.getIsEqual(signedOrder1.priceDenom.uu)).toBe(true);
    expect(signedOrder0.tokenLimit.uu.getIsEqual(signedOrder1.tokenLimit.uu)).toBe(true);
    expect(signedOrder0.signature.v.uu.getIsEqual(signedOrder1.signature.v)).toBe(true);
    expect(signedOrder0.signature.r.uu.getIsEqual(signedOrder1.signature.r)).toBe(true);
    expect(signedOrder0.signature.s.uu.getIsEqual(signedOrder1.signature.s)).toBe(true);
    expect(signedOrder0.getTrader().uu.getIsEqual(signedOrder1.getTrader().uu)).toBe(true);
    expect(signedOrder0.getTrader().uu.getIsEqual(signedOrder1.getTrader().uu)).toBe(true);
});
