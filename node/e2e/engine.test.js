"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var utils_1 = require("./lib/utils");
var fixtures_1 = require("./lib/fixtures");
require('./monarchicExecutorOracle.test');
var engineReader;
test('fetch engineReader', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, utils_1.fetchEngineReader()];
            case 1:
                engineReader = _a.sent();
                return [2 /*return*/];
        }
    });
}); });
test('owner should be DEPLOYER', function () { return __awaiter(void 0, void 0, void 0, function () {
    var owner;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, engineReader.fetchOwner()];
            case 1:
                owner = _a.sent();
                expect(owner.uu.getIsEqual(utils_1.getAccountAddress(fixtures_1.AccountNames.DEPLOYER))).toBe(true);
                return [2 /*return*/];
        }
    });
}); });
test('set owner to ADMIN', function () { return __awaiter(void 0, void 0, void 0, function () {
    var engineWriter;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, utils_1.fetchEngineWriter(fixtures_1.AccountNames.DEPLOYER)];
            case 1:
                engineWriter = _a.sent();
                return [4 /*yield*/, engineWriter.setOwner(utils_1.getAccountAddress(fixtures_1.AccountNames.ADMIN))];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
test('owner should be ADMIN', function () { return __awaiter(void 0, void 0, void 0, function () {
    var owner;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, engineReader.fetchOwner()];
            case 1:
                owner = _a.sent();
                expect(owner.uu.getIsEqual(utils_1.getAccountAddress(fixtures_1.AccountNames.ADMIN))).toBe(true);
                return [2 /*return*/];
        }
    });
}); });
test('set executorOracle to monarchicExecutorOracle', function () { return __awaiter(void 0, void 0, void 0, function () {
    var engineWriter, monarchicExecutorOracle;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, utils_1.fetchEngineWriter(fixtures_1.AccountNames.ADMIN)];
            case 1:
                engineWriter = _a.sent();
                return [4 /*yield*/, utils_1.fetchOrDeployMonarchicExecutorOracleAddress()];
            case 2:
                monarchicExecutorOracle = _a.sent();
                return [4 /*yield*/, engineWriter.setExecutorOracle(monarchicExecutorOracle)];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
test('executorOracle should be monarchicExecutorOracle', function () { return __awaiter(void 0, void 0, void 0, function () {
    var executorOracle, monarchicExecutorOracle;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, engineReader.fetchExecutorOracle()];
            case 1:
                executorOracle = _a.sent();
                return [4 /*yield*/, utils_1.fetchOrDeployMonarchicExecutorOracleAddress()];
            case 2:
                monarchicExecutorOracle = _a.sent();
                expect(executorOracle.uu.getIsEqual(monarchicExecutorOracle)).toBe(true);
                return [2 /*return*/];
        }
    });
}); });
test('owner should be ADMIN', function () { return __awaiter(void 0, void 0, void 0, function () {
    var owner;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, engineReader.fetchOwner()];
            case 1:
                owner = _a.sent();
                expect(owner.uu.getIsEqual(utils_1.getAccountAddress(fixtures_1.AccountNames.ADMIN))).toBe(true);
                return [2 /*return*/];
        }
    });
}); });
test('ATTACKER should not be able to set owner', function () { return __awaiter(void 0, void 0, void 0, function () {
    var engineWriter;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                expect.assertions(1);
                return [4 /*yield*/, utils_1.fetchEngineWriter(fixtures_1.AccountNames.ATTACKER)];
            case 1:
                engineWriter = _a.sent();
                return [2 /*return*/, expect(engineWriter.setOwner(utils_1.getAccountAddress(fixtures_1.AccountNames.ATTACKER))).rejects.toBeInstanceOf(Error)];
        }
    });
}); });
test('owner should be ADMIN', function () { return __awaiter(void 0, void 0, void 0, function () {
    var owner;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, engineReader.fetchOwner()];
            case 1:
                owner = _a.sent();
                expect(owner.uu.getIsEqual(utils_1.getAccountAddress(fixtures_1.AccountNames.ADMIN))).toBe(true);
                return [2 /*return*/];
        }
    });
}); });
