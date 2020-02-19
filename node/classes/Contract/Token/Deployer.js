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
var pollenium_buttercup_1 = require("pollenium-buttercup");
var pollenium_clover_1 = require("pollenium-clover");
var pollenium_toadflax_1 = require("pollenium-toadflax");
var TokenDeployer = /** @class */ (function (_super) {
    __extends(TokenDeployer, _super);
    function TokenDeployer(struct) {
        return _super.call(this, __assign(__assign(__assign({}, pollenium_toadflax_1.token), struct), { deployTransformer: function (struct) {
                var totalSupply = new pollenium_buttercup_1.Uint256(struct.totalSupply);
                return [totalSupply.uu.toPhex()];
            } })) || this;
    }
    return TokenDeployer;
}(pollenium_clover_1.ContractDeployer));
exports.TokenDeployer = TokenDeployer;
