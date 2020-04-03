"use strict";
exports.__esModule = true;
var enums_1 = require("../enums");
var __1 = require("../");
var __2 = require("../");
var OrderPair_1 = require("./OrderPair");
var pollenium_buttercup_1 = require("pollenium-buttercup");
var fixtures_1 = require("../fixtures");
var pollenium_uvaursi_1 = require("pollenium-uvaursi");
var salt = pollenium_uvaursi_1.Uu.genRandom(32);
var expiration = new pollenium_buttercup_1.Bytes32(pollenium_uvaursi_1.Uu.genFill({ length: 32, fill: 255 }));
test('InvalidBuyyOrderTypeError', function () {
    var buyyOrder = new __1.Order({
        salt: salt,
        expiration: expiration,
        direction: enums_1.OrderDirection.SELL,
        quotToken: fixtures_1.dai,
        variToken: fixtures_1.weth,
        tokenLimit: pollenium_buttercup_1.Uint256.fromNumber(1),
        priceNumer: pollenium_buttercup_1.Uint256.fromNumber(1),
        priceDenom: pollenium_buttercup_1.Uint256.fromNumber(1)
    });
    var sellOrder = new __1.Order({
        salt: salt,
        expiration: expiration,
        direction: enums_1.OrderDirection.SELL,
        quotToken: fixtures_1.dai,
        variToken: fixtures_1.weth,
        tokenLimit: pollenium_buttercup_1.Uint256.fromNumber(1),
        priceNumer: pollenium_buttercup_1.Uint256.fromNumber(1),
        priceDenom: pollenium_buttercup_1.Uint256.fromNumber(1)
    });
    expect(function () {
        new __2.OrderPair({ buyyOrder: buyyOrder, sellOrder: sellOrder });
    }).toThrow(OrderPair_1.InvalidBuyyOrderTypeError);
});
test('InvalidSellOrderTypeError', function () {
    var buyyOrder = new __1.Order({
        salt: salt,
        expiration: expiration,
        direction: enums_1.OrderDirection.BUYY,
        quotToken: fixtures_1.dai,
        variToken: fixtures_1.weth,
        tokenLimit: pollenium_buttercup_1.Uint256.fromNumber(1),
        priceNumer: pollenium_buttercup_1.Uint256.fromNumber(1),
        priceDenom: pollenium_buttercup_1.Uint256.fromNumber(1)
    });
    var sellOrder = new __1.Order({
        salt: salt,
        expiration: expiration,
        direction: enums_1.OrderDirection.BUYY,
        quotToken: fixtures_1.dai,
        variToken: fixtures_1.weth,
        tokenLimit: pollenium_buttercup_1.Uint256.fromNumber(1),
        priceNumer: pollenium_buttercup_1.Uint256.fromNumber(1),
        priceDenom: pollenium_buttercup_1.Uint256.fromNumber(1)
    });
    expect(function () {
        new __2.OrderPair({ buyyOrder: buyyOrder, sellOrder: sellOrder });
    }).toThrow(OrderPair_1.InvalidSellOrderTypeError);
});
test('QuotTokenMismatchError', function () {
    var buyyOrder = new __1.Order({
        salt: salt,
        expiration: expiration,
        direction: enums_1.OrderDirection.BUYY,
        quotToken: fixtures_1.dai,
        variToken: fixtures_1.weth,
        tokenLimit: pollenium_buttercup_1.Uint256.fromNumber(1),
        priceNumer: pollenium_buttercup_1.Uint256.fromNumber(1),
        priceDenom: pollenium_buttercup_1.Uint256.fromNumber(1)
    });
    var sellOrder = new __1.Order({
        salt: salt,
        expiration: expiration,
        direction: enums_1.OrderDirection.SELL,
        quotToken: fixtures_1.usdc,
        variToken: fixtures_1.weth,
        tokenLimit: pollenium_buttercup_1.Uint256.fromNumber(1),
        priceNumer: pollenium_buttercup_1.Uint256.fromNumber(1),
        priceDenom: pollenium_buttercup_1.Uint256.fromNumber(1)
    });
    expect(function () {
        new __2.OrderPair({ buyyOrder: buyyOrder, sellOrder: sellOrder });
    }).toThrow(OrderPair_1.QuotTokenMismatchError);
});
test('VariTokenMismatchError', function () {
    var buyyOrder = new __1.Order({
        salt: salt,
        expiration: expiration,
        direction: enums_1.OrderDirection.BUYY,
        quotToken: fixtures_1.dai,
        variToken: fixtures_1.weth,
        tokenLimit: pollenium_buttercup_1.Uint256.fromNumber(1),
        priceNumer: pollenium_buttercup_1.Uint256.fromNumber(1),
        priceDenom: pollenium_buttercup_1.Uint256.fromNumber(1)
    });
    var sellOrder = new __1.Order({
        salt: salt,
        expiration: expiration,
        direction: enums_1.OrderDirection.SELL,
        quotToken: fixtures_1.dai,
        variToken: fixtures_1.mkr,
        tokenLimit: pollenium_buttercup_1.Uint256.fromNumber(1),
        priceNumer: pollenium_buttercup_1.Uint256.fromNumber(1),
        priceDenom: pollenium_buttercup_1.Uint256.fromNumber(1)
    });
    expect(function () {
        new __2.OrderPair({ buyyOrder: buyyOrder, sellOrder: sellOrder });
    }).toThrow(OrderPair_1.VariTokenMismatchError);
});
test('PriceConstraintError', function () {
    var buyyOrder = new __1.Order({
        salt: salt,
        expiration: expiration,
        direction: enums_1.OrderDirection.BUYY,
        quotToken: fixtures_1.dai,
        variToken: fixtures_1.weth,
        tokenLimit: pollenium_buttercup_1.Uint256.fromNumber(1),
        priceNumer: pollenium_buttercup_1.Uint256.fromNumber(1),
        priceDenom: pollenium_buttercup_1.Uint256.fromNumber(1)
    });
    var sellOrder = new __1.Order({
        salt: salt,
        expiration: expiration,
        direction: enums_1.OrderDirection.SELL,
        quotToken: fixtures_1.dai,
        variToken: fixtures_1.weth,
        tokenLimit: pollenium_buttercup_1.Uint256.fromNumber(1),
        priceNumer: pollenium_buttercup_1.Uint256.fromNumber(2),
        priceDenom: pollenium_buttercup_1.Uint256.fromNumber(1)
    });
    expect(function () {
        new __2.OrderPair({ buyyOrder: buyyOrder, sellOrder: sellOrder });
    }).toThrow(OrderPair_1.PriceConstraintError);
});
