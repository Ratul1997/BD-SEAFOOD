"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_fast_image_1 = require("react-native-fast-image");
function CacheImageComponent(_a) {
    var url = _a.url, styles = _a.styles, _b = _a.resizeMode, resizeMode = _b === void 0 ? react_native_fast_image_1["default"].resizeMode.cover : _b;
    return (react_1["default"].createElement(react_native_fast_image_1["default"], { style: styles, source: {
            uri: url,
            priority: react_native_fast_image_1["default"].priority.normal,
            cache: react_native_fast_image_1["default"].cacheControl.immutable
        }, resizeMode: resizeMode }));
}
exports["default"] = CacheImageComponent;
