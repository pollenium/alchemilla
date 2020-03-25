"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var calcTarget_1 = require("./calcTarget");
var pollenium_buttercup_1 = require("pollenium-buttercup");
var fixtures = [
    {
        originalBlockNumber: 0,
        currentBlockNumber: 0,
        latency: 2,
        target: 2
    }, {
        originalBlockNumber: 0,
        currentBlockNumber: 1,
        latency: 2,
        target: 2
    }, {
        originalBlockNumber: 0,
        currentBlockNumber: 2,
        latency: 2,
        target: 4
    }, {
        originalBlockNumber: 0,
        currentBlockNumber: 3,
        latency: 2,
        target: 4
    }, {
        originalBlockNumber: 0,
        currentBlockNumber: 4,
        latency: 2,
        target: 6
    },
    {
        originalBlockNumber: 1,
        currentBlockNumber: 1,
        latency: 2,
        target: 3
    }, {
        originalBlockNumber: 1,
        currentBlockNumber: 2,
        latency: 2,
        target: 3
    }, {
        originalBlockNumber: 1,
        currentBlockNumber: 3,
        latency: 2,
        target: 5
    }, {
        originalBlockNumber: 1,
        currentBlockNumber: 4,
        latency: 2,
        target: 5
    }, {
        originalBlockNumber: 1,
        currentBlockNumber: 5,
        latency: 2,
        target: 7
    }, {
        originalBlockNumber: 5,
        currentBlockNumber: 14,
        latency: 4,
        target: 17
    }, {
        originalBlockNumber: 21,
        currentBlockNumber: 32,
        latency: 3,
        target: 33
    }
];
fixtures.forEach(function (fixture) {
    var originalBlockNumber = new pollenium_buttercup_1.Uint256(fixture.originalBlockNumber);
    var currentBlockNumber = new pollenium_buttercup_1.Uint256(fixture.currentBlockNumber);
    var latency = fixture.latency;
    var target = new pollenium_buttercup_1.Uint256(fixture.target);
    test("originalBlockNumber: " + originalBlockNumber.toNumberString(10) + ", currentBlockNumber: " + currentBlockNumber.toNumberString(10) + ", latency: " + latency + ", target: " + target.toNumberString(10), function () {
        expect(calcTarget_1.calcTarget(__assign({}, fixture)).toNumberString(10)).toBe(target.toNumberString(10));
    });
});
