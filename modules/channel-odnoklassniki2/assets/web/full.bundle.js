botpress = typeof botpress === "object" ? botpress : {}; botpress["basic-module"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/modules/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/views/full/index.tsx":
/*!**********************************!*\
  !*** ./src/views/full/index.tsx ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ui_1 = __webpack_require__(/*! botpress/ui */ "botpress/ui");
var react_1 = __importDefault(__webpack_require__(/*! react */ "react"));
// This view is a sample including all the features of Botpress UI
var MyMainView = /** @class */ (function (_super) {
    __extends(MyMainView, _super);
    function MyMainView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            selectedId: 1,
            loaded: false
        };
        _this.handleItemSelected = function (item) { return console.log('Selected object:', item); };
        _this.handleSearchChanged = function (value) { return console.log(value); };
        _this.handleSearchClicked = function () { return console.log('Search clicked'); };
        _this.handleContextClicked = function (item) { return console.log('Item: ', item); };
        _this.test = function () { return console.log('clicked button'); };
        return _this;
    }
    MyMainView.prototype.render = function () {
        var _this = this;
        var actions = [
            {
                label: 'File',
                icon: 'add',
                items: [
                    { label: 'Open', icon: 'folder-open', onClick: this.test },
                    { label: 'New', icon: 'folder-new', onClick: this.test },
                    { label: 'Save', icon: 'floppy-disk', onClick: this.test },
                    { type: 'divider' },
                    { label: 'Delete', icon: 'trash', onClick: this.test }
                ]
            }
        ];
        var items = [
            {
                label: 'My element',
                value: { id: 1, something: '/' },
                selected: this.state.selectedId === 1,
                actions: [
                    {
                        tooltip: 'Create new',
                        icon: 'add',
                        onClick: this.test
                    }
                ],
                contextMenu: [{ label: 'Some action', onClick: function () { return _this.handleContextClicked({ id: 1 }); } }]
            },
            {
                label: 'My second element',
                value: { id: 2, name: 'lalal' },
                selected: this.state.selectedId === 2
            }
            // ...
        ];
        return (react_1.default.createElement(ui_1.Container, null,
            react_1.default.createElement(ui_1.SidePanel, null,
                react_1.default.createElement(ui_1.SearchBar, { onChange: this.handleSearchChanged, onButtonClick: this.handleSearchClicked }),
                react_1.default.createElement(ui_1.SidePanelSection, { label: 'My Files', actions: actions },
                    react_1.default.createElement(ui_1.ItemList, { items: items, onElementClicked: this.handleItemSelected }),
                    "Some other stuff here ",
                    react_1.default.createElement(ui_1.InfoTooltip, { text: "Hello! Some info" })),
                react_1.default.createElement(ui_1.SidePanelSection, { label: 'Actions', actions: [{ icon: 'add', tooltip: 'New!', onClick: this.test }] }, "Some other stuff")),
            this.state.loaded ? (react_1.default.createElement("div", null, "Your module stuff here")) : (react_1.default.createElement(ui_1.SplashScreen, { icon: "code", title: 'My Module', description: "This module is awesome for creating a basic template" },
                react_1.default.createElement(ui_1.KeyboardShortcut, { label: "Save file", keys: ['ACTION', 's'] }),
                react_1.default.createElement(ui_1.KeyboardShortcut, { label: "New file", keys: ['ACTION', 'alt', 'n'] }),
                "Add any other kind of content as child of splash screen"))));
    };
    return MyMainView;
}(react_1.default.Component));
exports.default = MyMainView;


/***/ }),

/***/ 0:
/*!****************************************!*\
  !*** multi ./src/views/full/index.tsx ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/views/full/index.tsx */"./src/views/full/index.tsx");


/***/ }),

/***/ "botpress/ui":
/*!*****************************!*\
  !*** external "BotpressUI" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = BotpressUI;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = React;

/***/ })

/******/ });
//# sourceMappingURL=full.bundle.js.map