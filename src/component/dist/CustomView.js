"use strict";
exports.__esModule = true;
var react_native_1 = require("react-native");
var react_1 = require("react");
var colors_1 = require("../config/colors");
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
function CustomView(props) {
    return (react_1["default"].createElement(react_native_1.View, { style: { flex: 1, backgroundColor: colors_1.theme.backgroundColor } },
        react_1["default"].createElement(react_native_safe_area_context_1.SafeAreaView, { style: [
                {
                    flex: 1,
                    backgroundColor: colors_1.theme.backgroundColor
                },
                props.style,
            ] }, props.children)));
}
exports["default"] = CustomView;
