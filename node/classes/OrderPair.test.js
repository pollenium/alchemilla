"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var pollenium_frangipani_1 = __importDefault(require("pollenium-frangipani"));
var enums_1 = require("../enums");
var __1 = require("../");
var __2 = require("../");
var OrderPair_1 = require("./OrderPair");
var pollenium_buttercup_1 = require("pollenium-buttercup");
var fixtures_1 = require("../fixtures");
pollenium_frangipani_1["default"].forEach(function (fixture, index) {
    var chainState = {
        buyyOrderTokenFilled: pollenium_buttercup_1.Uint256.fromNumber(fixture.chainState.buyyOrderTokenFilled),
        sellOrderTokenFilled: pollenium_buttercup_1.Uint256.fromNumber(fixture.chainState.sellOrderTokenFilled),
        buyyOrderTokenBalance: pollenium_buttercup_1.Uint256.fromNumber(fixture.chainState.buyyOrderTokenBalance),
        sellOrderTokenBalance: pollenium_buttercup_1.Uint256.fromNumber(fixture.chainState.sellOrderTokenBalance)
    };
    var buyyOrder = new __1.Order({
        prevBlockHash: fixtures_1.nullBytes32,
        type: enums_1.ORDER_TYPE.BUYY,
        quotToken: fixtures_1.dai,
        variToken: fixtures_1.weth,
        tokenLimit: pollenium_buttercup_1.Uint256.fromNumber(fixture.orders.buyy.tokenLimit),
        priceNumer: pollenium_buttercup_1.Uint256.fromNumber(fixture.orders.buyy.priceNumer),
        priceDenom: pollenium_buttercup_1.Uint256.fromNumber(fixture.orders.buyy.priceDenom)
    });
    var sellOrder = new __1.Order({
        prevBlockHash: fixtures_1.nullBytes32,
        type: enums_1.ORDER_TYPE.SELL,
        quotToken: fixtures_1.dai,
        variToken: fixtures_1.weth,
        tokenLimit: pollenium_buttercup_1.Uint256.fromNumber(fixture.orders.sell.tokenLimit),
        priceNumer: pollenium_buttercup_1.Uint256.fromNumber(fixture.orders.sell.priceNumer),
        priceDenom: pollenium_buttercup_1.Uint256.fromNumber(fixture.orders.sell.priceDenom)
    });
    var orderPair = new __2.OrderPair({ buyyOrder: buyyOrder, sellOrder: sellOrder });
    var solution = orderPair.getSolution(chainState);
    test("order pair #" + index + ": quotTokenTrans", function () {
        expect(solution.quotTokenTrans.toNumber()).toBe(fixture.solution.quotTokenTrans);
    });
    test("order pair #" + index + ": variTokenTrans", function () {
        expect(solution.variTokenTrans.toNumber()).toBe(fixture.solution.variTokenTrans);
    });
    test("order pair #" + index + ": quotTokenArbit", function () {
        expect(solution.quotTokenArbit.toNumber()).toBe(fixture.solution.quotTokenArbit);
    });
});
test('InvalidBuyyOrderTypeError', function () {
    var buyyOrder = new __1.Order({
        prevBlockHash: fixtures_1.nullBytes32,
        type: enums_1.ORDER_TYPE.SELL,
        quotToken: fixtures_1.dai,
        variToken: fixtures_1.weth,
        tokenLimit: pollenium_buttercup_1.Uint256.fromNumber(1),
        priceNumer: pollenium_buttercup_1.Uint256.fromNumber(1),
        priceDenom: pollenium_buttercup_1.Uint256.fromNumber(1)
    });
    var sellOrder = new __1.Order({
        prevBlockHash: fixtures_1.nullBytes32,
        type: enums_1.ORDER_TYPE.SELL,
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
        prevBlockHash: fixtures_1.nullBytes32,
        type: enums_1.ORDER_TYPE.BUYY,
        quotToken: fixtures_1.dai,
        variToken: fixtures_1.weth,
        tokenLimit: pollenium_buttercup_1.Uint256.fromNumber(1),
        priceNumer: pollenium_buttercup_1.Uint256.fromNumber(1),
        priceDenom: pollenium_buttercup_1.Uint256.fromNumber(1)
    });
    var sellOrder = new __1.Order({
        prevBlockHash: fixtures_1.nullBytes32,
        type: enums_1.ORDER_TYPE.BUYY,
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
        prevBlockHash: fixtures_1.nullBytes32,
        type: enums_1.ORDER_TYPE.BUYY,
        quotToken: fixtures_1.dai,
        variToken: fixtures_1.weth,
        tokenLimit: pollenium_buttercup_1.Uint256.fromNumber(1),
        priceNumer: pollenium_buttercup_1.Uint256.fromNumber(1),
        priceDenom: pollenium_buttercup_1.Uint256.fromNumber(1)
    });
    var sellOrder = new __1.Order({
        prevBlockHash: fixtures_1.nullBytes32,
        type: enums_1.ORDER_TYPE.SELL,
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
        prevBlockHash: fixtures_1.nullBytes32,
        type: enums_1.ORDER_TYPE.BUYY,
        quotToken: fixtures_1.dai,
        variToken: fixtures_1.weth,
        tokenLimit: pollenium_buttercup_1.Uint256.fromNumber(1),
        priceNumer: pollenium_buttercup_1.Uint256.fromNumber(1),
        priceDenom: pollenium_buttercup_1.Uint256.fromNumber(1)
    });
    var sellOrder = new __1.Order({
        prevBlockHash: fixtures_1.nullBytes32,
        type: enums_1.ORDER_TYPE.SELL,
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
        prevBlockHash: fixtures_1.nullBytes32,
        type: enums_1.ORDER_TYPE.BUYY,
        quotToken: fixtures_1.dai,
        variToken: fixtures_1.weth,
        tokenLimit: pollenium_buttercup_1.Uint256.fromNumber(1),
        priceNumer: pollenium_buttercup_1.Uint256.fromNumber(1),
        priceDenom: pollenium_buttercup_1.Uint256.fromNumber(1)
    });
    var sellOrder = new __1.Order({
        prevBlockHash: fixtures_1.nullBytes32,
        type: enums_1.ORDER_TYPE.SELL,
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
