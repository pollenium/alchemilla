"use strict";
exports.__esModule = true;
var fixtures_1 = require("../fixtures");
var Order_1 = require("./Order");
var invalidOrderStructFixtures = [
    {
        error: Order_1.QuotVariTokenMatchError,
        delta: {
            variToken: fixtures_1.usdc
        }
    },
    {
        error: Order_1.NullQuotTokenError,
        delta: {
            quotToken: fixtures_1.nullAddress
        }
    },
    {
        error: Order_1.NullVariTokenError,
        delta: {
            variToken: fixtures_1.nullAddress
        }
    },
    {
        error: Order_1.ZeroTokenLimitError,
        delta: {
            tokenLimit: fixtures_1.uint256Zero
        }
    },
    {
        error: Order_1.ZeroPriceNumerError,
        delta: {
            priceNumer: fixtures_1.uint256Zero
        }
    },
    {
        error: Order_1.ZeroPriceDenomError,
        delta: {
            priceDenom: fixtures_1.uint256Zero
        }
    }
];
test('valid', function () {
    new Order_1.Order(fixtures_1.validOrderStruct);
});
invalidOrderStructFixtures.forEach(function (fixture) {
    test(fixture.error.name, function () {
        expect(function () {
            var orderStruct = Object.assign(Object.assign({}, fixtures_1.validOrderStruct), fixture.delta);
            new Order_1.Order(orderStruct);
        }).toThrow(fixture.error);
    });
});
