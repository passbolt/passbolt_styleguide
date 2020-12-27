/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"api-recover": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/react-extension/ApiRecover.entry.js","api-vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/react-extension/ApiRecover.entry.js":
/*!*************************************************!*\
  !*** ./src/react-extension/ApiRecover.entry.js ***!
  \*************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ApiRecover__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ApiRecover */ "./src/react-extension/ApiRecover.js");
/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 */



/**
 * Entry point - Recover application served by the API.
 * This entry point will be used to compile the production code see webpack-api.config.js
 */

var appDomElement = document.createElement("div");
document.body.appendChild(appDomElement);
react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ApiRecover__WEBPACK_IMPORTED_MODULE_2__["default"], null), appDomElement);

/***/ }),

/***/ "./src/react-extension/ApiRecover.js":
/*!*******************************************!*\
  !*** ./src/react-extension/ApiRecover.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _contexts_AppContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./contexts/AppContext */ "./src/react-extension/contexts/AppContext.js");
/* harmony import */ var _contexts_ApiRecoverContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./contexts/ApiRecoverContext */ "./src/react-extension/contexts/ApiRecoverContext.js");
/* harmony import */ var _components_AuthenticationRecover_OrchestrateApiRecover_OrchestrateApiRecover__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/AuthenticationRecover/OrchestrateApiRecover/OrchestrateApiRecover */ "./src/react-extension/components/AuthenticationRecover/OrchestrateApiRecover/OrchestrateApiRecover.js");
/* harmony import */ var _lib_apiClient_apiClientOptions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./lib/apiClient/apiClientOptions */ "./src/react-extension/lib/apiClient/apiClientOptions.js");






function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.0.0
 */





/**
 * The recover application served by the API.
 */

var ApiRecover = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(ApiRecover, _Component);

  var _super = _createSuper(ApiRecover);

  /**
   * Default constructor
   * @param props The component props
   */
  function ApiRecover(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, ApiRecover);

    _this = _super.call(this, props);
    _this.state = _this.defaultState;
    _this.userId = null; // The recover user id

    _this.token = null; // The recover token

    _this.initializeProperties();

    return _this;
  }
  /**
   * Returns the component default state
   * @return {object}
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(ApiRecover, [{
    key: "initializeProperties",

    /**
     * Initialize properties
     */
    value: function initializeProperties() {
      var uuidRegex = "[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[0-5][a-fA-F0-9]{3}-[089aAbB][a-fA-F0-9]{3}-[a-fA-F0-9]{12}";
      var recoverBootstrapRegex = "setup/recover/(".concat(uuidRegex, ")/(").concat(uuidRegex, ")$");
      var regex = new RegExp(recoverBootstrapRegex);
      var match = window.location.pathname.match(regex);

      if (!match) {
        console.error("Unable to retrieve the user id and token from the url");
        return;
      }

      this.userId = match[1];
      this.token = match[2];
    }
    /**
     * Get the application base url
     * @return {string}
     */

  }, {
    key: "getApiClientOptions",

    /**
     * Get the API client options
     * @returns {ApiClientOptions}
     */
    value: function getApiClientOptions() {
      return new _lib_apiClient_apiClientOptions__WEBPACK_IMPORTED_MODULE_9__["ApiClientOptions"]().setBaseUrl(this.state.trustedDomain);
    }
    /**
     * Render the component
     * @returns {JSX}
     */

  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_contexts_AppContext__WEBPACK_IMPORTED_MODULE_6__["default"].Provider, {
        value: this.state
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        id: "container",
        className: "container page login"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "content"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "header"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "logo"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("span", {
        className: "visually-hidden"
      }, "Passbolt"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "login-form"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_contexts_ApiRecoverContext__WEBPACK_IMPORTED_MODULE_7__["default"], {
        value: {
          userId: this.userId,
          token: this.token
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_components_AuthenticationRecover_OrchestrateApiRecover_OrchestrateApiRecover__WEBPACK_IMPORTED_MODULE_8__["default"], null))))));
    }
  }, {
    key: "defaultState",
    get: function get() {
      return {
        trustedDomain: this.baseUrl,
        // The site domain (use trusted domain for compatibility with browser extension applications)
        getApiClientOptions: this.getApiClientOptions.bind(this) // Get the api client options

      };
    }
  }, {
    key: "baseUrl",
    get: function get() {
      var baseElement = document.getElementsByTagName('base') && document.getElementsByTagName('base')[0];

      if (baseElement) {
        return baseElement.attributes.href.value.replace(/\/*$/g, '');
      }

      console.error("Unable to retrieve the page base tag");
      return "";
    }
  }]);

  return ApiRecover;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (ApiRecover);

/***/ }),

/***/ "./src/react-extension/components/Authentication/CheckMailBox/CheckMailBox.js":
/*!************************************************************************************!*\
  !*** ./src/react-extension/components/Authentication/CheckMailBox/CheckMailBox.js ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);






function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.0.0
 */


var CheckMailBox = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(CheckMailBox, _Component);

  var _super = _createSuper(CheckMailBox);

  function CheckMailBox() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, CheckMailBox);

    return _super.apply(this, arguments);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(CheckMailBox, [{
    key: "render",

    /**
     * Render the component
     * @returns {JSX}
     */
    value: function render() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "email-sent-instructions"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "email-sent-bg"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("h1", null, "Check your mailbox!"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("p", null, "We send you a link to verify your email.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("br", null), "Check your spam folder if you do not see hear from us after a while."));
    }
  }]);

  return CheckMailBox;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (CheckMailBox);

/***/ }),

/***/ "./src/react-extension/components/Authentication/DisplayBrowserNotSupported/DisplayBrowserNotSupported.js":
/*!****************************************************************************************************************!*\
  !*** ./src/react-extension/components/Authentication/DisplayBrowserNotSupported/DisplayBrowserNotSupported.js ***!
  \****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _contexts_AppContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../contexts/AppContext */ "./src/react-extension/contexts/AppContext.js");






function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.0.0
 */



var DOWNLOAD_FIREFOX_URL = "https://www.mozilla.org/firefox/download/thanks/";

var DisplayBrowserNotSupported = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(DisplayBrowserNotSupported, _Component);

  var _super = _createSuper(DisplayBrowserNotSupported);

  function DisplayBrowserNotSupported() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, DisplayBrowserNotSupported);

    return _super.apply(this, arguments);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(DisplayBrowserNotSupported, [{
    key: "render",

    /**
     * Render the component
     * @returns {JSX}
     */
    value: function render() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "browser-not-supported"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("h1", null, "Sorry, your browser is not supported."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("p", null, "Please download chrome or firefox to get started with passbolt."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("a", {
        href: "".concat(DOWNLOAD_FIREFOX_URL),
        className: "browser",
        target: "_blank",
        rel: "noopener noreferrer"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("img", {
        src: "".concat(this.props.context.trustedDomain, "/img/third_party/firefox_logo.png")
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "form-actions"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("a", {
        href: DOWNLOAD_FIREFOX_URL,
        className: "button primary big",
        role: "button",
        target: "_blank",
        rel: "noopener noreferrer"
      }, "Download firefox")));
    }
  }]);

  return DisplayBrowserNotSupported;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);

DisplayBrowserNotSupported.propTypes = {
  context: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.any // The application context

};
/* harmony default export */ __webpack_exports__["default"] = (Object(_contexts_AppContext__WEBPACK_IMPORTED_MODULE_7__["withAppContext"])(DisplayBrowserNotSupported));

/***/ }),

/***/ "./src/react-extension/components/Authentication/DisplayError/DisplayError.js":
/*!************************************************************************************!*\
  !*** ./src/react-extension/components/Authentication/DisplayError/DisplayError.js ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _contexts_AppContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../contexts/AppContext */ "./src/react-extension/contexts/AppContext.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);






function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.0.0
 */




var DisplayError = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(DisplayError, _Component);

  var _super = _createSuper(DisplayError);

  function DisplayError() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, DisplayError);

    return _super.apply(this, arguments);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(DisplayError, [{
    key: "render",

    /**
     * Render the component
     * @returns {JSX}
     */
    value: function render() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "setup-error"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("h1", null, "Access to this service requires an invitation."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("p", null, "This email is not associated with any approved users on this domain. Please contact your administrator to request an invitation link."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "form-actions"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("a", {
        href: "".concat(this.props.context.trustedDomain, "/users/recover"),
        className: "button primary big",
        role: "button"
      }, "Try with another email")));
    }
  }]);

  return DisplayError;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);

DisplayError.propTypes = {
  context: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.any // The application context

};
/* harmony default export */ __webpack_exports__["default"] = (Object(_contexts_AppContext__WEBPACK_IMPORTED_MODULE_6__["withAppContext"])(DisplayError));

/***/ }),

/***/ "./src/react-extension/components/Authentication/InstallExtension/InstallExtension.js":
/*!********************************************************************************************!*\
  !*** ./src/react-extension/components/Authentication/InstallExtension/InstallExtension.js ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _lib_Browser_detectBrowserName__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../lib/Browser/detectBrowserName */ "./src/react-extension/lib/Browser/detectBrowserName.js");
/* harmony import */ var _contexts_AppContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../contexts/AppContext */ "./src/react-extension/contexts/AppContext.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_8__);






function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.0.0
 */




var CHROME_STORE_BROWSER_EXTENSION_URL = "https://chrome.google.com/webstore/detail/passbolt-extension/didegimhafipceonhjepacocaffmoppf";
var FIREFOX_STORE_BROWSER_EXTENSION_URL = "https://addons.mozilla.org/fr/firefox/addon/passbolt";

var InstallExtension = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(InstallExtension, _Component);

  var _super = _createSuper(InstallExtension);

  function InstallExtension(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, InstallExtension);

    _this = _super.call(this, props);
    _this.state = _this.getDefaultState();

    _this.bindCallbacks();

    return _this;
  }
  /**
   * Returns the default component state
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(InstallExtension, [{
    key: "getDefaultState",
    value: function getDefaultState() {
      return {
        browserName: Object(_lib_Browser_detectBrowserName__WEBPACK_IMPORTED_MODULE_6__["detectBrowserName"])()
      };
    }
    /**
     * Bind callbacks methods
     */

  }, {
    key: "bindCallbacks",
    value: function bindCallbacks() {
      this.handleRefreshClick = this.handleRefreshClick.bind(this);
    }
    /**
     * Get the browser store thumbnail url
     * By default if unknown, return the chrome image.
     * @todo handle unknown browser case
     * @returns {string}
     */

  }, {
    key: "handleRefreshClick",

    /**
     * Refresh the page
     */
    value: function handleRefreshClick() {
      window.location.reload();
    }
    /**
     * Render the component
     * @returns {JSX}
     */

  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "install-extension"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("h1", null, "Please install the browser extension."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("p", null, "Please download the browser extension and refresh this page to continue."), this.state.browserName && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("a", {
        href: this.storeUrl,
        className: this.storeClassName,
        target: "_blank",
        rel: "noopener noreferrer"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("img", {
        src: this.browserStoreThumbnailUrl
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "form-actions"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("a", {
        href: this.storeUrl,
        className: "button primary big",
        role: "button",
        target: "_blank",
        rel: "noopener noreferrer"
      }, "Download extension"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("a", {
        onClick: this.handleRefreshClick,
        role: "button"
      }, "Refresh to detect extension")));
    }
  }, {
    key: "browserStoreThumbnailUrl",
    get: function get() {
      switch (this.state.browserName) {
        case _lib_Browser_detectBrowserName__WEBPACK_IMPORTED_MODULE_6__["BROWSER_NAMES"].CHROME:
          return "".concat(this.props.context.trustedDomain, "/img/third_party/ChromeWebStore_black.png");
        // @todo _white if theme midgar

        case _lib_Browser_detectBrowserName__WEBPACK_IMPORTED_MODULE_6__["BROWSER_NAMES"].FIREFOX:
          return "".concat(this.props.context.trustedDomain, "/img/third_party/FirefoxAMO_black.svg");
        // @todo _white if theme midgar

        default:
          return "".concat(this.props.context.trustedDomain, "/img/third_party/ChromeWebStore_black.png");
      }
    }
    /**
     * Get the browser store url.
     * By default if unknown, return the chrome webstore url.
     * @todo handle unknown browser case
     * @returns {string}
     */

  }, {
    key: "storeUrl",
    get: function get() {
      switch (this.state.browserName) {
        case _lib_Browser_detectBrowserName__WEBPACK_IMPORTED_MODULE_6__["BROWSER_NAMES"].CHROME:
          return CHROME_STORE_BROWSER_EXTENSION_URL;

        case _lib_Browser_detectBrowserName__WEBPACK_IMPORTED_MODULE_6__["BROWSER_NAMES"].FIREFOX:
          return FIREFOX_STORE_BROWSER_EXTENSION_URL;

        default:
          return CHROME_STORE_BROWSER_EXTENSION_URL;
      }
    }
    /**
     * Get the store classname
     * @returns {string}
     */

  }, {
    key: "storeClassName",
    get: function get() {
      return "browser-webstore ".concat(this.state.browserName);
    }
  }]);

  return InstallExtension;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);

InstallExtension.propTypes = {
  context: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.any // The application context

};
/* harmony default export */ __webpack_exports__["default"] = (Object(_contexts_AppContext__WEBPACK_IMPORTED_MODULE_7__["withAppContext"])(InstallExtension));

/***/ }),

/***/ "./src/react-extension/components/AuthenticationRecover/OrchestrateApiRecover/OrchestrateApiRecover.js":
/*!*************************************************************************************************************!*\
  !*** ./src/react-extension/components/AuthenticationRecover/OrchestrateApiRecover/OrchestrateApiRecover.js ***!
  \*************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _react_components_Common_Loading_LoadingSpinner_LoadingSpinner__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../react/components/Common/Loading/LoadingSpinner/LoadingSpinner */ "./src/react/components/Common/Loading/LoadingSpinner/LoadingSpinner.js");
/* harmony import */ var _contexts_ApiRecoverContext__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../contexts/ApiRecoverContext */ "./src/react-extension/contexts/ApiRecoverContext.js");
/* harmony import */ var _Authentication_InstallExtension_InstallExtension__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../Authentication/InstallExtension/InstallExtension */ "./src/react-extension/components/Authentication/InstallExtension/InstallExtension.js");
/* harmony import */ var _Authentication_DisplayBrowserNotSupported_DisplayBrowserNotSupported__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../Authentication/DisplayBrowserNotSupported/DisplayBrowserNotSupported */ "./src/react-extension/components/Authentication/DisplayBrowserNotSupported/DisplayBrowserNotSupported.js");
/* harmony import */ var _Authentication_CheckMailBox_CheckMailBox__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../Authentication/CheckMailBox/CheckMailBox */ "./src/react-extension/components/Authentication/CheckMailBox/CheckMailBox.js");
/* harmony import */ var _Authentication_DisplayError_DisplayError__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../Authentication/DisplayError/DisplayError */ "./src/react-extension/components/Authentication/DisplayError/DisplayError.js");






function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.0.0
 */








/**
 * The component orchestrates the api recover authentication workflow.
 */

var OrchestrateApiRecover = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(OrchestrateApiRecover, _Component);

  var _super = _createSuper(OrchestrateApiRecover);

  function OrchestrateApiRecover() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, OrchestrateApiRecover);

    return _super.apply(this, arguments);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(OrchestrateApiRecover, [{
    key: "componentDidMount",

    /**
     * Whenever the component is initialized
     */
    value: function componentDidMount() {
      this.initializeRecover();
    }
    /**
     * Initialize the recover.
     */

  }, {
    key: "initializeRecover",
    value: function initializeRecover() {
      var _this = this;

      setTimeout(function () {
        return _this.props.apiRecoverContext.onInitializeRecoverRequested();
      }, 1000);
    }
    /**
     * Render the component
     * @returns {JSX}
     */

  }, {
    key: "render",
    value: function render() {
      switch (this.props.apiRecoverContext.state) {
        case _contexts_ApiRecoverContext__WEBPACK_IMPORTED_MODULE_8__["ApiRecoverContextState"].INSTALL_EXTENSION_STATE:
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_Authentication_InstallExtension_InstallExtension__WEBPACK_IMPORTED_MODULE_9__["default"], null);

        case _contexts_ApiRecoverContext__WEBPACK_IMPORTED_MODULE_8__["ApiRecoverContextState"].DOWNLOAD_SUPPORTED_BROWSER_STATE:
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_Authentication_DisplayBrowserNotSupported_DisplayBrowserNotSupported__WEBPACK_IMPORTED_MODULE_10__["default"], null);

        case _contexts_ApiRecoverContext__WEBPACK_IMPORTED_MODULE_8__["ApiRecoverContextState"].CHECK_MAILBOX_STATE:
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_Authentication_CheckMailBox_CheckMailBox__WEBPACK_IMPORTED_MODULE_11__["default"], null);

        case _contexts_ApiRecoverContext__WEBPACK_IMPORTED_MODULE_8__["ApiRecoverContextState"].ERROR_STATE:
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_Authentication_DisplayError_DisplayError__WEBPACK_IMPORTED_MODULE_12__["default"], null);

        default:
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_react_components_Common_Loading_LoadingSpinner_LoadingSpinner__WEBPACK_IMPORTED_MODULE_7__["default"], null);
      }
    }
  }]);

  return OrchestrateApiRecover;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);

OrchestrateApiRecover.propTypes = {
  apiRecoverContext: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.object // The api setup context

};
/* harmony default export */ __webpack_exports__["default"] = (Object(_contexts_ApiRecoverContext__WEBPACK_IMPORTED_MODULE_8__["withApiRecoverContext"])(OrchestrateApiRecover));

/***/ }),

/***/ "./src/react-extension/contexts/ApiRecoverContext.js":
/*!***********************************************************!*\
  !*** ./src/react-extension/contexts/ApiRecoverContext.js ***!
  \***********************************************************/
/*! exports provided: ApiRecoverContext, default, withApiRecoverContext, ApiRecoverContextState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiRecoverContext", function() { return ApiRecoverContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withApiRecoverContext", function() { return withApiRecoverContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiRecoverContextState", function() { return ApiRecoverContextState; });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _AppContext__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./AppContext */ "./src/react-extension/contexts/AppContext.js");
/* harmony import */ var _lib_apiClient_apiClient__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../lib/apiClient/apiClient */ "./src/react-extension/lib/apiClient/apiClient.js");
/* harmony import */ var _lib_Browser_detectBrowserName__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../lib/Browser/detectBrowserName */ "./src/react-extension/lib/Browser/detectBrowserName.js");
/* harmony import */ var _lib_Error_passboltApiFetchError__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../lib/Error/passboltApiFetchError */ "./src/react-extension/lib/Error/passboltApiFetchError.js");
/* harmony import */ var _lib_Common_Object_getPropValue__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../lib/Common/Object/getPropValue */ "./src/react/lib/Common/Object/getPropValue.js");









function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.0.0
 */







/**
 * The Api recover context.
 * @type {React.Context<object>}
 */

var ApiRecoverContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createContext({
  userId: null,
  // The recover user id
  token: null,
  // The recover token
  state: null,
  // The current recover workflow state
  // Whenever the initialization of the recover is requested.
  onInitializeRecoverRequested: function onInitializeRecoverRequested() {}
});
/**
 * The related context provider
 */

var ApiRecoverContextProvider = /*#__PURE__*/function (_React$Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(ApiRecoverContextProvider, _React$Component);

  var _super = _createSuper(ApiRecoverContextProvider);

  /**
   * Default constructor
   * @param props The component props
   */
  function ApiRecoverContextProvider(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default()(this, ApiRecoverContextProvider);

    _this = _super.call(this, props);
    _this.state = Object.assign(_this.defaultState, props.value);
    return _this;
  }
  /**
   * Returns the default component state
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default()(ApiRecoverContextProvider, [{
    key: "onInitializeRecoverRequested",

    /**
     * Initialize the recover
     * @return {Promise<void>}
     */
    value: function () {
      var _onInitializeRecoverRequested = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(!this.state.userId || !this.state.token)) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return", this.setState({
                  state: ApiRecoverContextState.ERROR_STATE
                }));

              case 2:
                if (this.isBrowserSupported()) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return", this.setState({
                  state: ApiRecoverContextState.DOWNLOAD_SUPPORTED_BROWSER_STATE
                }));

              case 4:
                _context.next = 6;
                return this.verifyRecoverInfo().then(this.handleRecoverVerifySuccess.bind(this))["catch"](this.handleRecoverVerifyError.bind(this));

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onInitializeRecoverRequested() {
        return _onInitializeRecoverRequested.apply(this, arguments);
      }

      return onInitializeRecoverRequested;
    }()
    /**
     * When the recover info are valid.
     * @return {void}
     */

  }, {
    key: "handleRecoverVerifySuccess",
    value: function handleRecoverVerifySuccess() {
      this.setState({
        state: ApiRecoverContextState.INSTALL_EXTENSION_STATE
      });
    }
    /**
     * When the recover info didn't validate
     * @return {void}
     */

  }, {
    key: "handleRecoverVerifyError",
    value: function handleRecoverVerifyError(error) {
      if (error instanceof _lib_Error_passboltApiFetchError__WEBPACK_IMPORTED_MODULE_13__["default"]) {
        var isTokenExpired = Object(_lib_Common_Object_getPropValue__WEBPACK_IMPORTED_MODULE_14__["default"])(error, "data.body.token.expired");

        if (isTokenExpired) {
          return this.setState({
            state: ApiRecoverContextState.CHECK_MAILBOX_STATE
          });
        }
      }

      return this.setState({
        state: ApiRecoverContextState.ERROR_STATE
      });
    }
    /**
     * Check if the browser is supported.
     * @returns {boolean}
     */

  }, {
    key: "isBrowserSupported",
    value: function isBrowserSupported() {
      var browserName = Object(_lib_Browser_detectBrowserName__WEBPACK_IMPORTED_MODULE_12__["detectBrowserName"])();
      var supportedBrowserNames = [_lib_Browser_detectBrowserName__WEBPACK_IMPORTED_MODULE_12__["BROWSER_NAMES"].CHROME, _lib_Browser_detectBrowserName__WEBPACK_IMPORTED_MODULE_12__["BROWSER_NAMES"].FIREFOX];
      return supportedBrowserNames.includes(browserName);
    }
    /**
     * Verify the recover information.
     * @returns {Promise<object>}
     */

  }, {
    key: "verifyRecoverInfo",
    value: function () {
      var _verifyRecoverInfo = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee2() {
        var apiClientOptions, apiClient, _yield$apiClient$get, body;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                apiClientOptions = this.props.context.getApiClientOptions();
                apiClientOptions.setResourceName("setup");
                apiClient = new _lib_apiClient_apiClient__WEBPACK_IMPORTED_MODULE_11__["ApiClient"](apiClientOptions);
                _context2.next = 5;
                return apiClient.get("recover/".concat(this.state.userId, "/").concat(this.state.token));

              case 5:
                _yield$apiClient$get = _context2.sent;
                body = _yield$apiClient$get.body;
                return _context2.abrupt("return", body);

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function verifyRecoverInfo() {
        return _verifyRecoverInfo.apply(this, arguments);
      }

      return verifyRecoverInfo;
    }()
    /**
     * Render the component
     * @returns {JSX}
     */

  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(ApiRecoverContext.Provider, {
        value: this.state
      }, this.props.children);
    }
  }, {
    key: "defaultState",
    get: function get() {
      return {
        userId: null,
        token: null,
        state: ApiRecoverContextState.INITIAL_STATE,
        onInitializeRecoverRequested: this.onInitializeRecoverRequested.bind(this)
      };
    }
  }]);

  return ApiRecoverContextProvider;
}(react__WEBPACK_IMPORTED_MODULE_8___default.a.Component);

ApiRecoverContextProvider.propTypes = {
  context: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.any,
  // The application context
  value: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.any,
  // The initial value of the context
  children: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.any // The children components

};
/* harmony default export */ __webpack_exports__["default"] = (Object(_AppContext__WEBPACK_IMPORTED_MODULE_10__["withAppContext"])(ApiRecoverContextProvider));
/**
 * API Recover Context Consumer HOC
 * @param WrappedComponent
 */

function withApiRecoverContext(WrappedComponent) {
  return /*#__PURE__*/function (_React$Component2) {
    _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(withApiRecoverContext, _React$Component2);

    var _super2 = _createSuper(withApiRecoverContext);

    function withApiRecoverContext() {
      _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default()(this, withApiRecoverContext);

      return _super2.apply(this, arguments);
    }

    _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default()(withApiRecoverContext, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(ApiRecoverContext.Consumer, null, function (context) {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(WrappedComponent, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
            apiRecoverContext: context
          }, _this2.props));
        });
      }
    }]);

    return withApiRecoverContext;
  }(react__WEBPACK_IMPORTED_MODULE_8___default.a.Component);
}
/**
 * The recover types of state
 */

var ApiRecoverContextState = {
  INITIAL_STATE: 'Initial State',
  INSTALL_EXTENSION_STATE: 'Install extension',
  DOWNLOAD_SUPPORTED_BROWSER_STATE: 'Download supported browser',
  CHECK_MAILBOX_STATE: 'Check mailbox',
  ERROR_STATE: 'Error'
};

/***/ }),

/***/ "./src/react-extension/contexts/AppContext.js":
/*!****************************************************!*\
  !*** ./src/react-extension/contexts/AppContext.js ***!
  \****************************************************/
/*! exports provided: withAppContext, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withAppContext", function() { return withAppContext; });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);







function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }


var AppContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createContext({
  user: null,
  users: null,
  roles: null,
  rememberMeOptions: {},
  resources: null,
  resource: null,
  shareResources: null,
  selectedResources: null,
  selectedUser: null,
  folders: null,
  resourceCommentId: null,
  mustRefreshComments: false,
  siteSettings: null,
  userSettings: null
});
/**
 * App Context Consumer HOC
 * @param WrappedComponent
 */

function withAppContext(WrappedComponent) {
  return /*#__PURE__*/function (_React$Component) {
    _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(withAppContext, _React$Component);

    var _super = _createSuper(withAppContext);

    function withAppContext() {
      _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, withAppContext);

      return _super.apply(this, arguments);
    }

    _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(withAppContext, [{
      key: "render",
      value: function render() {
        var _this = this;

        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(AppContext.Consumer, null, function (AppContext) {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(WrappedComponent, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
            context: AppContext
          }, _this.props));
        });
      }
    }]);

    return withAppContext;
  }(react__WEBPACK_IMPORTED_MODULE_6___default.a.Component);
}
/* harmony default export */ __webpack_exports__["default"] = (AppContext);

/***/ }),

/***/ "./src/react-extension/lib/Browser/detectBrowserName.js":
/*!**************************************************************!*\
  !*** ./src/react-extension/lib/Browser/detectBrowserName.js ***!
  \**************************************************************/
/*! exports provided: BROWSER_NAMES, detectBrowserName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BROWSER_NAMES", function() { return BROWSER_NAMES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "detectBrowserName", function() { return detectBrowserName; });
/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.0.0
 */
var BROWSER_NAMES = {
  CHROME: "chrome",
  EDGE: "edge",
  FIREFOX: "firefox",
  INTERNET_EXPLORER: "internet-explorer",
  OPERA: "opera",
  SAFARI: "safari",
  SAMSUNG: "samsung",
  UNKNOWN: "unknown"
};
/**
 * Detect the browser name.
 * Code based on: https://developer.mozilla.org/en-US/docs/Web/API/Window/navigator#Example_1_Browser_detect_and_return_a_string
 * @returns {string}
 */

function detectBrowserName() {
  var userAgent = window.navigator.userAgent.toLowerCase();
  var browserName;

  if (userAgent.indexOf("firefox") > -1) {
    browserName = BROWSER_NAMES.FIREFOX; // "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:61.0) Gecko/20100101 Firefox/61.0"
  } else if (userAgent.indexOf("samsungbrowser") > -1) {
    browserName = BROWSER_NAMES.SAMSUNG; // "Mozilla/5.0 (Linux; Android 9; SAMSUNG SM-G955F Build/PPR1.180610.011) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/9.4 Chrome/67.0.3396.87 Mobile Safari/537.36
  } else if (userAgent.indexOf("opera") > -1 || userAgent.indexOf("opr") > -1) {
    browserName = BROWSER_NAMES.OPERA; // "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 OPR/57.0.3098.106"
  } else if (userAgent.indexOf("trident") > -1) {
    browserName = BROWSER_NAMES.INTERNET_EXPLORER; // "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; Zoom 3.6.0; wbx 1.0.0; rv:11.0) like Gecko"
  } else if (userAgent.indexOf("edge") > -1) {
    browserName = BROWSER_NAMES.EDGE; // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299"
  } else if (userAgent.indexOf("chrome") > -1) {
    browserName = BROWSER_NAMES.CHROME; // "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/66.0.3359.181 Chrome/66.0.3359.181 Safari/537.36"
  } else if (userAgent.indexOf("safari") > -1) {
    browserName = BROWSER_NAMES.SAFARI; // "Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1 980x1306"
  } else {
    browserName = BROWSER_NAMES.UNKNOWN;
  }

  return browserName;
}

/***/ }),

/***/ "./src/react-extension/lib/Error/passboltApiFetchError.js":
/*!****************************************************************!*\
  !*** ./src/react-extension/lib/Error/passboltApiFetchError.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/wrapNativeSuper */ "./node_modules/@babel/runtime/helpers/wrapNativeSuper.js");
/* harmony import */ var _babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_4__);






function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Application error
 *
 * @copyright (c) 2019 Passbolt SA
 * @licence GNU Affero General Public License http://www.gnu.org/licenses/agpl-3.0.en.html
 */
var PassboltApiFetchError = /*#__PURE__*/function (_Error) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1___default()(PassboltApiFetchError, _Error);

  var _super = _createSuper(PassboltApiFetchError);

  function PassboltApiFetchError(message, data) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, PassboltApiFetchError);

    _this = _super.call(this, message);
    _this.name = 'PassboltApiFetchError';
    _this.data = data || {};
    return _this;
  }

  return PassboltApiFetchError;
}( /*#__PURE__*/_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_4___default()(Error));

/* harmony default export */ __webpack_exports__["default"] = (PassboltApiFetchError);

/***/ }),

/***/ "./src/react-extension/lib/Error/passboltBadResponseError.js":
/*!*******************************************************************!*\
  !*** ./src/react-extension/lib/Error/passboltBadResponseError.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/wrapNativeSuper */ "./node_modules/@babel/runtime/helpers/wrapNativeSuper.js");
/* harmony import */ var _babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_4__);






function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Bad response
 *
 * @copyright (c) 2019 Passbolt SA
 * @licence GNU Affero General Public License http://www.gnu.org/licenses/agpl-3.0.en.html
 */
var PassboltBadResponseError = /*#__PURE__*/function (_Error) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1___default()(PassboltBadResponseError, _Error);

  var _super = _createSuper(PassboltBadResponseError);

  function PassboltBadResponseError() {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, PassboltBadResponseError);

    _this = _super.call(this, "An internal error occurred. The server response could not be parsed. Please contact your administrator.");
    _this.name = 'PassboltBadResponseError';
    return _this;
  }

  return PassboltBadResponseError;
}( /*#__PURE__*/_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_4___default()(Error));

/* harmony default export */ __webpack_exports__["default"] = (PassboltBadResponseError);

/***/ }),

/***/ "./src/react-extension/lib/Error/passboltServiceUnavailableError.js":
/*!**************************************************************************!*\
  !*** ./src/react-extension/lib/Error/passboltServiceUnavailableError.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/wrapNativeSuper */ "./node_modules/@babel/runtime/helpers/wrapNativeSuper.js");
/* harmony import */ var _babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_4__);






function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Network error
 *
 * @copyright (c) 2019 Passbolt SA
 * @licence GNU Affero General Public License http://www.gnu.org/licenses/agpl-3.0.en.html
 */
var PassboltServiceUnavailableError = /*#__PURE__*/function (_Error) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1___default()(PassboltServiceUnavailableError, _Error);

  var _super = _createSuper(PassboltServiceUnavailableError);

  function PassboltServiceUnavailableError(message) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, PassboltServiceUnavailableError);

    message = message || "The service is unavailable";
    _this = _super.call(this, message);
    _this.name = 'PassboltServiceUnavailableError';
    return _this;
  }

  return PassboltServiceUnavailableError;
}( /*#__PURE__*/_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_4___default()(Error));

/* harmony default export */ __webpack_exports__["default"] = (PassboltServiceUnavailableError);

/***/ }),

/***/ "./src/react-extension/lib/apiClient/apiClient.js":
/*!********************************************************!*\
  !*** ./src/react-extension/lib/apiClient/apiClient.js ***!
  \********************************************************/
/*! exports provided: ApiClient */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiClient", function() { return ApiClient; });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _Error_passboltApiFetchError__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Error/passboltApiFetchError */ "./src/react-extension/lib/Error/passboltApiFetchError.js");
/* harmony import */ var _Error_passboltBadResponseError__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Error/passboltBadResponseError */ "./src/react-extension/lib/Error/passboltBadResponseError.js");
/* harmony import */ var _Error_passboltServiceUnavailableError__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Error/passboltServiceUnavailableError */ "./src/react-extension/lib/Error/passboltServiceUnavailableError.js");







function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         2.13.0
 */



var ApiClient = /*#__PURE__*/function () {
  /**
   * Constructor
   *
   * @param {ApiClientOptions} options
   * @throws {TypeError} if baseUrl is empty or not a string
   * @public
   */
  function ApiClient(options) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4___default()(this, ApiClient);

    this.options = options;

    if (!this.options.getBaseUrl()) {
      throw new TypeError('ApiClient constructor error: baseUrl is required.');
    }

    if (!this.options.getResourceName()) {
      throw new TypeError('ApiClient constructor error: resourceName is required.');
    }

    try {
      var rawBaseUrl = this.options.getBaseUrl().toString();

      if (rawBaseUrl.endsWith('/')) {
        rawBaseUrl = rawBaseUrl.slice(0, -1);
      }

      this.baseUrl = "".concat(rawBaseUrl, "/").concat(this.options.getResourceName());
      this.baseUrl = new URL(this.baseUrl);
    } catch (typeError) {
      throw new TypeError('ApiClient constructor error: b.');
    }

    this.apiVersion = 'api-version=v2';
  }
  /**
   * @returns {Object} fetchOptions.headers
   * @private
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5___default()(ApiClient, [{
    key: "getDefaultHeaders",
    value: function getDefaultHeaders() {
      return {
        'Accept': 'application/json',
        'content-type': 'application/json'
      };
    }
    /**
     * @returns {Object} fetchOptions
     * @private
     */

  }, {
    key: "buildFetchOptions",
    value: function buildFetchOptions() {
      return {
        credentials: 'include',
        headers: _objectSpread(_objectSpread({}, this.getDefaultHeaders()), this.options.getHeaders())
      };
    }
    /**
     * Find a resource by id
     *
     * @param {string} id most likely a uuid
     * @param {Object} [urlOptions] Optional url parameters for example {"contain[something]": "1"}
     * @throws {TypeError} if id is empty or not a string
     * @throws {TypeError} if urlOptions key or values are not a string
     * @throws {PassboltServiceUnavailableError} if service is not reachable
     * @throws {PassboltBadResponseError} if passbolt API responded with non parsable JSON
     * @throws {PassboltApiFetchError} if passbolt API response is not OK (non 2xx status)
     * @returns {Promise<*>}
     * @public
     */

  }, {
    key: "get",
    value: function () {
      var _get = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee(id, urlOptions) {
        var url;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.assertValidId(id);
                url = this.buildUrl("".concat(this.baseUrl, "/").concat(id), urlOptions || {});
                return _context.abrupt("return", this.fetchAndHandleResponse('GET', url));

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function get(_x, _x2) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
    /**
     * Delete a resource by id
     *
     * @param {string} id most likely a uuid
     * @param {Object} [body] (will be converted to JavaScript Object Notation (JSON) string)
     * @param {Object} [urlOptions] Optional url parameters for example {"contain[something]": "1"}
     * @param {Boolean} [dryRun] optional, default false, checks if the validity of the operation prior real delete
     * @throws {TypeError} if id is empty or not a string
     * @throws {TypeError} if urlOptions key or values are not a string
     * @throws {PassboltServiceUnavailableError} if service is not reachable
     * @throws {PassboltBadResponseError} if passbolt API responded with non parsable JSON
     * @throws {PassboltApiFetchError} if passbolt API response is not OK (non 2xx status)
     * @returns {Promise<*>}
     * @public
     */

  }, {
    key: "delete",
    value: function () {
      var _delete2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee2(id, body, urlOptions, dryRun) {
        var url, bodyString;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.assertValidId(id);

                if (typeof dryRun === 'undefined') {
                  dryRun = false;
                }

                if (!dryRun) {
                  url = this.buildUrl("".concat(this.baseUrl, "/").concat(id), urlOptions || {});
                } else {
                  url = this.buildUrl("".concat(this.baseUrl, "/").concat(id, "/dry-run"), urlOptions || {});
                }

                bodyString = null;

                if (body) {
                  bodyString = this.buildBody(body);
                }

                return _context2.abrupt("return", this.fetchAndHandleResponse('DELETE', url, bodyString));

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _delete(_x3, _x4, _x5, _x6) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
    /**
     * Find all the resources
     *
     * @param {Object} [urlOptions] Optional url parameters for example {"contain[something]": "1"}
     * @throws {TypeError} if urlOptions key or values are not a string
     * @throws {PassboltServiceUnavailableError} if service is not reachable
     * @throws {PassboltBadResponseError} if passbolt API responded with non parsable JSON
     * @throws {PassboltApiFetchError} if passbolt API response is not OK (non 2xx status)
     * @returns {Promise<*>}
     * @public
     */

  }, {
    key: "findAll",
    value: function () {
      var _findAll = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee3(urlOptions) {
        var url;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                url = this.buildUrl(this.baseUrl.toString(), urlOptions || {});
                _context3.next = 3;
                return this.fetchAndHandleResponse('GET', url);

              case 3:
                return _context3.abrupt("return", _context3.sent);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function findAll(_x7) {
        return _findAll.apply(this, arguments);
      }

      return findAll;
    }()
    /**
     * Create a resource
     *
     * @param {Object} body (will be converted to JavaScript Object Notation (JSON) string)
     * @param {Object} [urlOptions] Optional url parameters for example {"contain[something]": "1"}
     * @throws {TypeError} if body is empty or cannot converted to valid JSON string
     * @throws {PassboltServiceUnavailableError} if service is not reachable
     * @throws {PassboltBadResponseError} if passbolt API responded with non parsable JSON
     * @throws {PassboltApiFetchError} if passbolt API response is not OK (non 2xx status)
     * @returns {Promise<*>}
     * @public
     */

  }, {
    key: "create",
    value: function () {
      var _create = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee4(body, urlOptions) {
        var url, bodyString;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                url = this.buildUrl(this.baseUrl.toString(), urlOptions || {});
                bodyString = this.buildBody(body);
                return _context4.abrupt("return", this.fetchAndHandleResponse('POST', url, bodyString));

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function create(_x8, _x9) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
    /**
     * Update a resource
     *
     * @param {string} id most likely a uuid
     * @param {Object} body (will be converted to JavaScript Object Notation (JSON) string)
     * @param {Object} [urlOptions] Optional url parameters for example {"contain[something]": "1"}
     * @param {Boolean?} [dryRun] optional, default false, checks if the validity of the operation prior real update
     * @throws {TypeError} if id is empty or not a string
     * @throws {TypeError} if body is empty or cannot converted to valid JSON string
     * @throws {PassboltServiceUnavailableError} if service is not reachable
     * @throws {PassboltBadResponseError} if passbolt API responded with non parsable JSON
     * @throws {PassboltApiFetchError} if passbolt API response is not OK (non 2xx status)
     * @returns {Promise<*>}
     * @public
     */

  }, {
    key: "update",
    value: function () {
      var _update = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee5(id, body, urlOptions, dryRun) {
        var url, bodyString;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this.assertValidId(id);

                if (typeof dryRun === 'undefined') {
                  dryRun = false;
                }

                if (!dryRun) {
                  url = this.buildUrl("".concat(this.baseUrl, "/").concat(id), urlOptions || {});
                } else {
                  url = this.buildUrl("".concat(this.baseUrl, "/").concat(id, "/dry-run"), urlOptions || {});
                }

                bodyString = null;

                if (body) {
                  bodyString = this.buildBody(body);
                }

                return _context5.abrupt("return", this.fetchAndHandleResponse('PUT', url, bodyString));

              case 6:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function update(_x10, _x11, _x12, _x13) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
    /**
     * Assert that an id is a valid non empty string
     *
     * @throws {TypeError} if id is empty or not a string
     * @param {string} id
     * @return {void}
     * @public
     */

  }, {
    key: "assertValidId",
    value: function assertValidId(id) {
      if (!id) {
        throw new TypeError('ApiClient.assertValidId error: id cannot be empty');
      }

      if (typeof id !== 'string') {
        throw new TypeError('ApiClient.assertValidId error: id should be a string');
      }
    }
    /**
     * @throw TypeError
     * @param method
     * @private
     */

  }, {
    key: "assertMethod",
    value: function assertMethod(method) {
      if (typeof method !== 'string') {
        new TypeError('ApiClient.assertValidMethod method should be a string.');
      }

      var supportedMethods = ['GET', 'POST', 'PUT', 'DELETE'];

      if (supportedMethods.indexOf(method) < 0) {
        new TypeError("ApiClient.assertValidMethod error: method ".concat(method, " is not supported."));
      }
    }
    /**
     * Url paramter assertion
     * @param {*} url
     * @throw TypeError
     * @private
     */

  }, {
    key: "assertUrl",
    value: function assertUrl(url) {
      if (!url) {
        throw new TypeError('ApliClient.assertUrl error: url is required.');
      }

      if (!(url instanceof URL)) {
        throw new TypeError('ApliClient.assertUrl error: url should be a valid URL object.');
      }
    }
    /**
     * Body parameter assertion
     * @param body
     * @throws {TypeError} if body is not a string
     * @private
     */

  }, {
    key: "assertBody",
    value: function assertBody(body) {
      if (typeof body !== 'string') {
        new TypeError("ApiClient.assertBody error: body should be a string.");
      }
    }
    /**
     * Build body object
     *
     * @param {Object} body
     * @throws {TypeError} if body is empty or cannot converted to valid JSON string
     * @return {string} JavaScript Object Notation (JSON) string
     * @public
     */

  }, {
    key: "buildBody",
    value: function buildBody(body) {
      return JSON.stringify(body);
    }
    /**
     * Return a URL object from string url and this.baseUrl and this.apiVersion
     * Optionally append urlOptions to the URL object
     *
     * @param {string|URL} url
     * @param {Object} [urlOptions] Optional url parameters for example {"contain[something]": "1"}
     * @throws {TypeError} if urlOptions key or values are not a string
     * @returns {URL}
     * @public
     */

  }, {
    key: "buildUrl",
    value: function buildUrl(url, urlOptions) {
      if (typeof url !== 'string') {
        throw new TypeError('ApiClient.buildUrl error: url should be a string.');
      }

      var urlObj = new URL("".concat(url, ".json?").concat(this.apiVersion));
      urlOptions = urlOptions || {};

      var _loop = function _loop() {
        var _Object$entries$_i = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_Object$entries[_i], 2),
            key = _Object$entries$_i[0],
            value = _Object$entries$_i[1];

        if (typeof key !== 'string') {
          throw new TypeError('ApiClient.buildUrl error: urlOptions key should be a string.');
        }

        if (typeof value === 'string') {
          // Example "filter[has-tag]": "<string>"
          urlObj.searchParams.append(key, value);
        } else {
          // Example "filter[has-id][]": "<uuid>"
          if (Array.isArray(value)) {
            value.forEach(function (v) {
              urlObj.searchParams.append(key, v);
            });
          } else {
            throw new TypeError('ApiClient.buildUrl error: urlOptions value should be a string or array.');
          }
        }
      };

      for (var _i = 0, _Object$entries = Object.entries(urlOptions); _i < _Object$entries.length; _i++) {
        _loop();
      }

      return urlObj;
    }
    /**
     * fetchAndHandleResponse
     *
     * @param {string} method example 'GET', 'POST'
     * @param {URL} url object
     * @param {string} [body] (optional)
     * @param {Object} [options] (optional) more fetch options
     * @throws {TypeError} if method, url are not defined or of the wrong type
     * @throws {PassboltServiceUnavailableError} if service is not reachable
     * @throws {PassboltBadResponseError} if passbolt API responded with non parsable JSON
     * @throws {PassboltApiFetchError} if passbolt API response is not OK (non 2xx status)
     * @returns {Promise<*>}
     * @public
     */

  }, {
    key: "fetchAndHandleResponse",
    value: function () {
      var _fetchAndHandleResponse = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee6(method, url, body, options) {
        var response, responseJson, fetchOptions, message;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                this.assertUrl(url);
                this.assertMethod(method);

                if (body) {
                  this.assertBody(body);
                }

                fetchOptions = _objectSpread(_objectSpread({}, this.buildFetchOptions()), options);
                fetchOptions.method = method;

                if (body) {
                  fetchOptions.body = body;
                }

                _context6.prev = 6;
                _context6.next = 9;
                return fetch(url.toString(), fetchOptions);

              case 9:
                response = _context6.sent;
                _context6.next = 15;
                break;

              case 12:
                _context6.prev = 12;
                _context6.t0 = _context6["catch"](6);
                throw new _Error_passboltServiceUnavailableError__WEBPACK_IMPORTED_MODULE_8__["default"](_context6.t0.message);

              case 15:
                _context6.prev = 15;
                _context6.next = 18;
                return response.json();

              case 18:
                responseJson = _context6.sent;
                _context6.next = 24;
                break;

              case 21:
                _context6.prev = 21;
                _context6.t1 = _context6["catch"](15);
                throw new _Error_passboltBadResponseError__WEBPACK_IMPORTED_MODULE_7__["default"]();

              case 24:
                if (response.ok) {
                  _context6.next = 27;
                  break;
                }

                message = responseJson.header.message;
                throw new _Error_passboltApiFetchError__WEBPACK_IMPORTED_MODULE_6__["default"](message, {
                  code: response.status,
                  body: responseJson.body
                });

              case 27:
                return _context6.abrupt("return", responseJson);

              case 28:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[6, 12], [15, 21]]);
      }));

      function fetchAndHandleResponse(_x14, _x15, _x16, _x17) {
        return _fetchAndHandleResponse.apply(this, arguments);
      }

      return fetchAndHandleResponse;
    }()
  }]);

  return ApiClient;
}();

/***/ }),

/***/ "./src/react-extension/lib/apiClient/apiClientOptions.js":
/*!***************************************************************!*\
  !*** ./src/react-extension/lib/apiClient/apiClientOptions.js ***!
  \***************************************************************/
/*! exports provided: ApiClientOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiClientOptions", function() { return ApiClientOptions; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _csrfToken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./csrfToken */ "./src/react-extension/lib/apiClient/csrfToken.js");



/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 */

var ApiClientOptions = /*#__PURE__*/function () {
  function ApiClientOptions() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, ApiClientOptions);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(ApiClientOptions, [{
    key: "setBaseUrl",

    /**
     * Set base url
     *
     * @param {string|URL} baseUrl
     * @throws {TypeError} if baseUrl is empty, or not a string or valid URL
     * @returns {ApiClientOptions}
     * @public
     */
    value: function setBaseUrl(baseUrl) {
      if (!baseUrl) {
        throw new TypeError('ApiClientOption baseUrl is required.');
      }

      if (typeof baseUrl === 'string') {
        try {
          this.baseUrl = new URL(baseUrl);
        } catch (e) {
          throw new TypeError('ApiClientOption baseUrl is invalid.');
        }
      } else {
        if (baseUrl instanceof URL) {
          this.baseUrl = baseUrl;
        } else {
          throw new TypeError('ApiClientOptions baseurl should be a string or URL');
        }
      }

      return this;
    }
    /**
     * Set CSRF Token
     *
     * @throws {TypeError} if csrfToken is empty or not a string or CsrfToken object
     * @param {string|CsrfToken} csrfToken
     * @public
     */

  }, {
    key: "setCsrfToken",
    value: function setCsrfToken(csrfToken) {
      if (!csrfToken) {
        throw new TypeError('ApiClientOption csrfToken is required.');
      }

      if (typeof csrfToken === 'string') {
        this.csrfToken = new _csrfToken__WEBPACK_IMPORTED_MODULE_2__["CsrfToken"](csrfToken);
      } else {
        if (csrfToken instanceof _csrfToken__WEBPACK_IMPORTED_MODULE_2__["CsrfToken"]) {
          this.csrfToken = csrfToken;
        } else {
          throw new TypeError('ApiClientOption csrfToken should be a string or a valid CsrfToken.');
        }
      }

      return this;
    }
    /**
     * Set the resource name
     *
     * @throws {TypeError} if resourceName is empty, or not a string
     * @param {string} resourceName name
     * @returns {ApiClientOptions}
     * @public
     */

  }, {
    key: "setResourceName",
    value: function setResourceName(resourceName) {
      if (!resourceName) {
        throw new TypeError('ApiClientOptions.setResourceName resourceName is required.');
      }

      if (typeof resourceName !== 'string') {
        throw new TypeError('ApiClientOptions.setResourceName resourceName should be a valid string.');
      }

      this.resourceName = resourceName;
      return this;
    }
    /**
     * @returns {URL} baseUrl
     * @public
     */

  }, {
    key: "getBaseUrl",
    value: function getBaseUrl() {
      return this.baseUrl;
    }
    /**
     * @returns {string} resourceName
     * @public
     */

  }, {
    key: "getResourceName",
    value: function getResourceName() {
      return this.resourceName;
    }
    /**
     * Returns the relevant client options as fetch options headers
     *
     * @returns {*}
     */

  }, {
    key: "getHeaders",
    value: function getHeaders() {
      if (this.csrfToken) {
        return this.csrfToken.toFetchHeaders();
      }
    }
  }]);

  return ApiClientOptions;
}();

/***/ }),

/***/ "./src/react-extension/lib/apiClient/csrfToken.js":
/*!********************************************************!*\
  !*** ./src/react-extension/lib/apiClient/csrfToken.js ***!
  \********************************************************/
/*! exports provided: CsrfToken */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CsrfToken", function() { return CsrfToken; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);



/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 */
var CsrfToken = /*#__PURE__*/function () {
  /**
   * CsrfToken constructor
   * @param {string} token
   */
  function CsrfToken(token) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, CsrfToken);

    this.setToken(token);
  }
  /**
   * Validate
   *
   * @param token
   * @throws {TypeError} if token is not a string or is undefined
   * @public
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(CsrfToken, [{
    key: "setToken",
    value: function setToken(token) {
      this.validate(token);
      this.token = token;
    }
    /**
     * Validate
     *
     * @param token
     * @throws {TypeError} if token is not a string or is undefined
     * @public
     */

  }, {
    key: "validate",
    value: function validate(token) {
      if (!token) {
        throw new TypeError('CSRF token cannot be empty.');
      }

      if (typeof token !== 'string') {
        throw new TypeError('CSRF token should be a string.');
      }
    }
    /**
     * Returns the token as key value header
     *
     * @returns {{"X-CSRF-Token": string}}
     */

  }, {
    key: "toFetchHeaders",
    value: function toFetchHeaders() {
      return {
        'X-CSRF-Token': this.token
      };
    }
  }]);

  return CsrfToken;
}();

/***/ }),

/***/ "./src/react/components/Common/Loading/LoadingSpinner/LoadingSpinner.js":
/*!******************************************************************************!*\
  !*** ./src/react/components/Common/Loading/LoadingSpinner/LoadingSpinner.js ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);






function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         2.13.0
 */


/**
 * This component displays a waiting loading spinner
 */

var LoadingSpinner = /*#__PURE__*/function (_React$Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(LoadingSpinner, _React$Component);

  var _super = _createSuper(LoadingSpinner);

  function LoadingSpinner() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, LoadingSpinner);

    return _super.apply(this, arguments);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(LoadingSpinner, [{
    key: "render",

    /**
     * Render the component
     */
    value: function render() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_5___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "processing-wrapper"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "processing-text"
      }, this.props.title && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("h2", null, this.props.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("h2", null, "Please wait..."))));
    }
  }]);

  return LoadingSpinner;
}(react__WEBPACK_IMPORTED_MODULE_5___default.a.Component);

LoadingSpinner.propTypes = {
  title: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.string // A custom string

};
/* harmony default export */ __webpack_exports__["default"] = (LoadingSpinner);

/***/ }),

/***/ "./src/react/lib/Common/Object/getPropValue.js":
/*!*****************************************************!*\
  !*** ./src/react/lib/Common/Object/getPropValue.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (obj, key) {
  return key.split('.').reduce(function (accumulator, x) {
    return accumulator === undefined ? accumulator : accumulator[x];
  }, obj);
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlYWN0LWV4dGVuc2lvbi9BcGlSZWNvdmVyLmVudHJ5LmpzIiwid2VicGFjazovLy8uL3NyYy9yZWFjdC1leHRlbnNpb24vQXBpUmVjb3Zlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVhY3QtZXh0ZW5zaW9uL2NvbXBvbmVudHMvQXV0aGVudGljYXRpb24vQ2hlY2tNYWlsQm94L0NoZWNrTWFpbEJveC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVhY3QtZXh0ZW5zaW9uL2NvbXBvbmVudHMvQXV0aGVudGljYXRpb24vRGlzcGxheUJyb3dzZXJOb3RTdXBwb3J0ZWQvRGlzcGxheUJyb3dzZXJOb3RTdXBwb3J0ZWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlYWN0LWV4dGVuc2lvbi9jb21wb25lbnRzL0F1dGhlbnRpY2F0aW9uL0Rpc3BsYXlFcnJvci9EaXNwbGF5RXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlYWN0LWV4dGVuc2lvbi9jb21wb25lbnRzL0F1dGhlbnRpY2F0aW9uL0luc3RhbGxFeHRlbnNpb24vSW5zdGFsbEV4dGVuc2lvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVhY3QtZXh0ZW5zaW9uL2NvbXBvbmVudHMvQXV0aGVudGljYXRpb25SZWNvdmVyL09yY2hlc3RyYXRlQXBpUmVjb3Zlci9PcmNoZXN0cmF0ZUFwaVJlY292ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlYWN0LWV4dGVuc2lvbi9jb250ZXh0cy9BcGlSZWNvdmVyQ29udGV4dC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVhY3QtZXh0ZW5zaW9uL2NvbnRleHRzL0FwcENvbnRleHQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlYWN0LWV4dGVuc2lvbi9saWIvQnJvd3Nlci9kZXRlY3RCcm93c2VyTmFtZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVhY3QtZXh0ZW5zaW9uL2xpYi9FcnJvci9wYXNzYm9sdEFwaUZldGNoRXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlYWN0LWV4dGVuc2lvbi9saWIvRXJyb3IvcGFzc2JvbHRCYWRSZXNwb25zZUVycm9yLmpzIiwid2VicGFjazovLy8uL3NyYy9yZWFjdC1leHRlbnNpb24vbGliL0Vycm9yL3Bhc3Nib2x0U2VydmljZVVuYXZhaWxhYmxlRXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlYWN0LWV4dGVuc2lvbi9saWIvYXBpQ2xpZW50L2FwaUNsaWVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVhY3QtZXh0ZW5zaW9uL2xpYi9hcGlDbGllbnQvYXBpQ2xpZW50T3B0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVhY3QtZXh0ZW5zaW9uL2xpYi9hcGlDbGllbnQvY3NyZlRva2VuLmpzIiwid2VicGFjazovLy8uL3NyYy9yZWFjdC9jb21wb25lbnRzL0NvbW1vbi9Mb2FkaW5nL0xvYWRpbmdTcGlubmVyL0xvYWRpbmdTcGlubmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9yZWFjdC9saWIvQ29tbW9uL09iamVjdC9nZXRQcm9wVmFsdWUuanMiXSwibmFtZXMiOlsiYXBwRG9tRWxlbWVudCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsIlJlYWN0RE9NIiwicmVuZGVyIiwiQXBpUmVjb3ZlciIsInByb3BzIiwic3RhdGUiLCJkZWZhdWx0U3RhdGUiLCJ1c2VySWQiLCJ0b2tlbiIsImluaXRpYWxpemVQcm9wZXJ0aWVzIiwidXVpZFJlZ2V4IiwicmVjb3ZlckJvb3RzdHJhcFJlZ2V4IiwicmVnZXgiLCJSZWdFeHAiLCJtYXRjaCIsIndpbmRvdyIsImxvY2F0aW9uIiwicGF0aG5hbWUiLCJjb25zb2xlIiwiZXJyb3IiLCJBcGlDbGllbnRPcHRpb25zIiwic2V0QmFzZVVybCIsInRydXN0ZWREb21haW4iLCJiYXNlVXJsIiwiZ2V0QXBpQ2xpZW50T3B0aW9ucyIsImJpbmQiLCJiYXNlRWxlbWVudCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiYXR0cmlidXRlcyIsImhyZWYiLCJ2YWx1ZSIsInJlcGxhY2UiLCJDb21wb25lbnQiLCJDaGVja01haWxCb3giLCJET1dOTE9BRF9GSVJFRk9YX1VSTCIsIkRpc3BsYXlCcm93c2VyTm90U3VwcG9ydGVkIiwiY29udGV4dCIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsImFueSIsIndpdGhBcHBDb250ZXh0IiwiRGlzcGxheUVycm9yIiwiQ0hST01FX1NUT1JFX0JST1dTRVJfRVhURU5TSU9OX1VSTCIsIkZJUkVGT1hfU1RPUkVfQlJPV1NFUl9FWFRFTlNJT05fVVJMIiwiSW5zdGFsbEV4dGVuc2lvbiIsImdldERlZmF1bHRTdGF0ZSIsImJpbmRDYWxsYmFja3MiLCJicm93c2VyTmFtZSIsImRldGVjdEJyb3dzZXJOYW1lIiwiaGFuZGxlUmVmcmVzaENsaWNrIiwicmVsb2FkIiwic3RvcmVVcmwiLCJzdG9yZUNsYXNzTmFtZSIsImJyb3dzZXJTdG9yZVRodW1ibmFpbFVybCIsIkJST1dTRVJfTkFNRVMiLCJDSFJPTUUiLCJGSVJFRk9YIiwiT3JjaGVzdHJhdGVBcGlSZWNvdmVyIiwiaW5pdGlhbGl6ZVJlY292ZXIiLCJzZXRUaW1lb3V0IiwiYXBpUmVjb3ZlckNvbnRleHQiLCJvbkluaXRpYWxpemVSZWNvdmVyUmVxdWVzdGVkIiwiQXBpUmVjb3ZlckNvbnRleHRTdGF0ZSIsIklOU1RBTExfRVhURU5TSU9OX1NUQVRFIiwiRE9XTkxPQURfU1VQUE9SVEVEX0JST1dTRVJfU1RBVEUiLCJDSEVDS19NQUlMQk9YX1NUQVRFIiwiRVJST1JfU1RBVEUiLCJvYmplY3QiLCJ3aXRoQXBpUmVjb3ZlckNvbnRleHQiLCJBcGlSZWNvdmVyQ29udGV4dCIsIlJlYWN0IiwiY3JlYXRlQ29udGV4dCIsIkFwaVJlY292ZXJDb250ZXh0UHJvdmlkZXIiLCJPYmplY3QiLCJhc3NpZ24iLCJzZXRTdGF0ZSIsImlzQnJvd3NlclN1cHBvcnRlZCIsInZlcmlmeVJlY292ZXJJbmZvIiwidGhlbiIsImhhbmRsZVJlY292ZXJWZXJpZnlTdWNjZXNzIiwiaGFuZGxlUmVjb3ZlclZlcmlmeUVycm9yIiwiUGFzc2JvbHRBcGlGZXRjaEVycm9yIiwiaXNUb2tlbkV4cGlyZWQiLCJnZXRQcm9wVmFsdWUiLCJzdXBwb3J0ZWRCcm93c2VyTmFtZXMiLCJpbmNsdWRlcyIsImFwaUNsaWVudE9wdGlvbnMiLCJzZXRSZXNvdXJjZU5hbWUiLCJhcGlDbGllbnQiLCJBcGlDbGllbnQiLCJnZXQiLCJjaGlsZHJlbiIsIklOSVRJQUxfU1RBVEUiLCJXcmFwcGVkQ29tcG9uZW50IiwiQXBwQ29udGV4dCIsInVzZXIiLCJ1c2VycyIsInJvbGVzIiwicmVtZW1iZXJNZU9wdGlvbnMiLCJyZXNvdXJjZXMiLCJyZXNvdXJjZSIsInNoYXJlUmVzb3VyY2VzIiwic2VsZWN0ZWRSZXNvdXJjZXMiLCJzZWxlY3RlZFVzZXIiLCJmb2xkZXJzIiwicmVzb3VyY2VDb21tZW50SWQiLCJtdXN0UmVmcmVzaENvbW1lbnRzIiwic2l0ZVNldHRpbmdzIiwidXNlclNldHRpbmdzIiwiRURHRSIsIklOVEVSTkVUX0VYUExPUkVSIiwiT1BFUkEiLCJTQUZBUkkiLCJTQU1TVU5HIiwiVU5LTk9XTiIsInVzZXJBZ2VudCIsIm5hdmlnYXRvciIsInRvTG93ZXJDYXNlIiwiaW5kZXhPZiIsIm1lc3NhZ2UiLCJkYXRhIiwibmFtZSIsIkVycm9yIiwiUGFzc2JvbHRCYWRSZXNwb25zZUVycm9yIiwiUGFzc2JvbHRTZXJ2aWNlVW5hdmFpbGFibGVFcnJvciIsIm9wdGlvbnMiLCJnZXRCYXNlVXJsIiwiVHlwZUVycm9yIiwiZ2V0UmVzb3VyY2VOYW1lIiwicmF3QmFzZVVybCIsInRvU3RyaW5nIiwiZW5kc1dpdGgiLCJzbGljZSIsIlVSTCIsInR5cGVFcnJvciIsImFwaVZlcnNpb24iLCJjcmVkZW50aWFscyIsImhlYWRlcnMiLCJnZXREZWZhdWx0SGVhZGVycyIsImdldEhlYWRlcnMiLCJpZCIsInVybE9wdGlvbnMiLCJhc3NlcnRWYWxpZElkIiwidXJsIiwiYnVpbGRVcmwiLCJmZXRjaEFuZEhhbmRsZVJlc3BvbnNlIiwiZHJ5UnVuIiwiYm9keVN0cmluZyIsImJ1aWxkQm9keSIsIm1ldGhvZCIsInN1cHBvcnRlZE1ldGhvZHMiLCJKU09OIiwic3RyaW5naWZ5IiwidXJsT2JqIiwia2V5Iiwic2VhcmNoUGFyYW1zIiwiYXBwZW5kIiwiQXJyYXkiLCJpc0FycmF5IiwiZm9yRWFjaCIsInYiLCJlbnRyaWVzIiwiYXNzZXJ0VXJsIiwiYXNzZXJ0TWV0aG9kIiwiYXNzZXJ0Qm9keSIsImZldGNoT3B0aW9ucyIsImJ1aWxkRmV0Y2hPcHRpb25zIiwiZmV0Y2giLCJyZXNwb25zZSIsImpzb24iLCJyZXNwb25zZUpzb24iLCJvayIsImhlYWRlciIsImNvZGUiLCJzdGF0dXMiLCJlIiwiY3NyZlRva2VuIiwiQ3NyZlRva2VuIiwicmVzb3VyY2VOYW1lIiwidG9GZXRjaEhlYWRlcnMiLCJzZXRUb2tlbiIsInZhbGlkYXRlIiwiTG9hZGluZ1NwaW5uZXIiLCJ0aXRsZSIsInN0cmluZyIsIm9iaiIsInNwbGl0IiwicmVkdWNlIiwiYWNjdW11bGF0b3IiLCJ4IiwidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSxRQUFRLG9CQUFvQjtRQUM1QjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLGlCQUFpQiw0QkFBNEI7UUFDN0M7UUFDQTtRQUNBLGtCQUFrQiwyQkFBMkI7UUFDN0M7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFD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LHdCQUFnQixLQUFLdkg7QUFBdEIsT0FBUDtBQUNEO0FBNUNIOztBQUFBO0FBQUEsSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7SUFDTThLLGM7Ozs7Ozs7Ozs7Ozs7O0FBQ0o7QUFDRjtBQUNBOzZCQUNXO0FBQ1AsMEJBQ0UscUlBQ0U7QUFBSyxpQkFBUyxFQUFDO0FBQWYsc0JBQ0U7QUFBTSxpQkFBUyxFQUFDO0FBQWhCLFNBQ0csS0FBS2xMLEtBQUwsQ0FBV21MLEtBQVgsaUJBQ0MsdUVBQ0csS0FBS25MLEtBQUwsQ0FBV21MLEtBRGQsQ0FGSixlQU1FLHdGQU5GLENBREYsQ0FERixDQURGO0FBZ0JEOzs7O0VBckIwQmpILDRDQUFLLENBQUN0QyxTOztBQXdCbkNzSixjQUFjLENBQUNqSixTQUFmLEdBQTJCO0FBQ3pCa0osT0FBSyxFQUFFakosaURBQVMsQ0FBQ2tKLE1BRFEsQ0FDQTs7QUFEQSxDQUEzQjtBQUllRiw2RUFBZixFOzs7Ozs7Ozs7Ozs7QUMvQ0E7QUFBZSx5RUFBQ0csR0FBRCxFQUFNL0IsR0FBTjtBQUFBLFNBQWNBLEdBQUcsQ0FBQ2dDLEtBQUosQ0FBVSxHQUFWLEVBQzFCQyxNQUQwQixDQUNuQixVQUFDQyxXQUFELEVBQWNDLENBQWQ7QUFBQSxXQUNORCxXQUFXLEtBQUtFLFNBQWhCLEdBQTRCRixXQUE1QixHQUEwQ0EsV0FBVyxDQUFDQyxDQUFELENBRC9DO0FBQUEsR0FEbUIsRUFHekJKLEdBSHlCLENBQWQ7QUFBQSxDQUFmLEUiLCJmaWxlIjoiYXBpLXJlY292ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwiYXBpLXJlY292ZXJcIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbXCIuL3NyYy9yZWFjdC1leHRlbnNpb24vQXBpUmVjb3Zlci5lbnRyeS5qc1wiLFwiYXBpLXZlbmRvcnNcIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCIvKipcbiAqIFBhc3Nib2x0IH4gT3BlbiBzb3VyY2UgcGFzc3dvcmQgbWFuYWdlciBmb3IgdGVhbXNcbiAqIENvcHlyaWdodCAoYykgMjAyMCBQYXNzYm9sdCBTQSAoaHR0cHM6Ly93d3cucGFzc2JvbHQuY29tKVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSB2ZXJzaW9uIDMgb2YgdGhlIG9yIGFueSBsYXRlciB2ZXJzaW9uLlxuICogRm9yIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2Ugc2VlIHRoZSBMSUNFTlNFLnR4dFxuICogUmVkaXN0cmlidXRpb25zIG9mIGZpbGVzIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLlxuICpcbiAqIEBjb3B5cmlnaHQgICAgIENvcHlyaWdodCAoYykgMjAyMCBQYXNzYm9sdCBTQSAoaHR0cHM6Ly93d3cucGFzc2JvbHQuY29tKVxuICogQGxpY2Vuc2UgICAgICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9BR1BMLTMuMCBBR1BMIExpY2Vuc2VcbiAqIEBsaW5rICAgICAgICAgIGh0dHBzOi8vd3d3LnBhc3Nib2x0LmNvbSBQYXNzYm9sdCh0bSlcbiAqL1xuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIjtcbmltcG9ydCBBcGlSZWNvdmVyIGZyb20gXCIuL0FwaVJlY292ZXJcIjtcblxuLyoqXG4gKiBFbnRyeSBwb2ludCAtIFJlY292ZXIgYXBwbGljYXRpb24gc2VydmVkIGJ5IHRoZSBBUEkuXG4gKiBUaGlzIGVudHJ5IHBvaW50IHdpbGwgYmUgdXNlZCB0byBjb21waWxlIHRoZSBwcm9kdWN0aW9uIGNvZGUgc2VlIHdlYnBhY2stYXBpLmNvbmZpZy5qc1xuICovXG5jb25zdCBhcHBEb21FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYXBwRG9tRWxlbWVudCk7XG5SZWFjdERPTS5yZW5kZXIoPEFwaVJlY292ZXIvPiwgYXBwRG9tRWxlbWVudCk7XG4iLCIvKipcbiAqIFBhc3Nib2x0IH4gT3BlbiBzb3VyY2UgcGFzc3dvcmQgbWFuYWdlciBmb3IgdGVhbXNcbiAqIENvcHlyaWdodCAoYykgMjAyMCBQYXNzYm9sdCBTQSAoaHR0cHM6Ly93d3cucGFzc2JvbHQuY29tKVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSB2ZXJzaW9uIDMgb2YgdGhlIG9yIGFueSBsYXRlciB2ZXJzaW9uLlxuICogRm9yIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2Ugc2VlIHRoZSBMSUNFTlNFLnR4dFxuICogUmVkaXN0cmlidXRpb25zIG9mIGZpbGVzIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLlxuICpcbiAqIEBjb3B5cmlnaHQgICAgIENvcHlyaWdodCAoYykgMjAyMCBQYXNzYm9sdCBTQSAoaHR0cHM6Ly93d3cucGFzc2JvbHQuY29tKVxuICogQGxpY2Vuc2UgICAgICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9BR1BMLTMuMCBBR1BMIExpY2Vuc2VcbiAqIEBsaW5rICAgICAgICAgIGh0dHBzOi8vd3d3LnBhc3Nib2x0LmNvbSBQYXNzYm9sdCh0bSlcbiAqIEBzaW5jZSAgICAgICAgIDMuMC4wXG4gKi9cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgQXBwQ29udGV4dCBmcm9tIFwiLi9jb250ZXh0cy9BcHBDb250ZXh0XCI7XG5pbXBvcnQgQXBpUmVjb3ZlckNvbnRleHRQcm92aWRlciBmcm9tIFwiLi9jb250ZXh0cy9BcGlSZWNvdmVyQ29udGV4dFwiO1xuaW1wb3J0IE9yY2hlc3RyYXRlQXBpUmVjb3ZlciBmcm9tIFwiLi9jb21wb25lbnRzL0F1dGhlbnRpY2F0aW9uUmVjb3Zlci9PcmNoZXN0cmF0ZUFwaVJlY292ZXIvT3JjaGVzdHJhdGVBcGlSZWNvdmVyXCI7XG5pbXBvcnQge0FwaUNsaWVudE9wdGlvbnN9IGZyb20gXCIuL2xpYi9hcGlDbGllbnQvYXBpQ2xpZW50T3B0aW9uc1wiO1xuXG4vKipcbiAqIFRoZSByZWNvdmVyIGFwcGxpY2F0aW9uIHNlcnZlZCBieSB0aGUgQVBJLlxuICovXG5jbGFzcyBBcGlSZWNvdmVyIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHByb3BzIFRoZSBjb21wb25lbnQgcHJvcHNcbiAgICovXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB0aGlzLmRlZmF1bHRTdGF0ZTtcbiAgICB0aGlzLnVzZXJJZCA9IG51bGw7IC8vIFRoZSByZWNvdmVyIHVzZXIgaWRcbiAgICB0aGlzLnRva2VuID0gbnVsbDsgLy8gVGhlIHJlY292ZXIgdG9rZW5cbiAgICB0aGlzLmluaXRpYWxpemVQcm9wZXJ0aWVzKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY29tcG9uZW50IGRlZmF1bHQgc3RhdGVcbiAgICogQHJldHVybiB7b2JqZWN0fVxuICAgKi9cbiAgZ2V0IGRlZmF1bHRTdGF0ZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHJ1c3RlZERvbWFpbjogdGhpcy5iYXNlVXJsLCAvLyBUaGUgc2l0ZSBkb21haW4gKHVzZSB0cnVzdGVkIGRvbWFpbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIGJyb3dzZXIgZXh0ZW5zaW9uIGFwcGxpY2F0aW9ucylcbiAgICAgIGdldEFwaUNsaWVudE9wdGlvbnM6IHRoaXMuZ2V0QXBpQ2xpZW50T3B0aW9ucy5iaW5kKHRoaXMpLCAvLyBHZXQgdGhlIGFwaSBjbGllbnQgb3B0aW9uc1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSBwcm9wZXJ0aWVzXG4gICAqL1xuICBpbml0aWFsaXplUHJvcGVydGllcygpIHtcbiAgICBjb25zdCB1dWlkUmVnZXggPSBcIlthLWZBLUYwLTldezh9LVthLWZBLUYwLTldezR9LVswLTVdW2EtZkEtRjAtOV17M30tWzA4OWFBYkJdW2EtZkEtRjAtOV17M30tW2EtZkEtRjAtOV17MTJ9XCI7XG4gICAgY29uc3QgcmVjb3ZlckJvb3RzdHJhcFJlZ2V4ID0gYHNldHVwXFwvcmVjb3ZlclxcLygke3V1aWRSZWdleH0pXFwvKCR7dXVpZFJlZ2V4fSkkYDtcbiAgICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAocmVjb3ZlckJvb3RzdHJhcFJlZ2V4KTtcbiAgICBjb25zdCBtYXRjaCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5tYXRjaChyZWdleCk7XG4gICAgaWYgKCFtYXRjaCkge1xuICAgICAgY29uc29sZS5lcnJvcihcIlVuYWJsZSB0byByZXRyaWV2ZSB0aGUgdXNlciBpZCBhbmQgdG9rZW4gZnJvbSB0aGUgdXJsXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnVzZXJJZCA9IG1hdGNoWzFdO1xuICAgIHRoaXMudG9rZW4gPSBtYXRjaFsyXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGFwcGxpY2F0aW9uIGJhc2UgdXJsXG4gICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICovXG4gIGdldCBiYXNlVXJsKCkge1xuICAgIGNvbnN0IGJhc2VFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2Jhc2UnKSAmJiBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYmFzZScpWzBdO1xuICAgIGlmIChiYXNlRWxlbWVudCkge1xuICAgICAgcmV0dXJuIGJhc2VFbGVtZW50LmF0dHJpYnV0ZXMuaHJlZi52YWx1ZS5yZXBsYWNlKC9cXC8qJC9nLCAnJyk7XG4gICAgfVxuICAgIGNvbnNvbGUuZXJyb3IoXCJVbmFibGUgdG8gcmV0cmlldmUgdGhlIHBhZ2UgYmFzZSB0YWdcIik7XG4gICAgcmV0dXJuIFwiXCI7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBBUEkgY2xpZW50IG9wdGlvbnNcbiAgICogQHJldHVybnMge0FwaUNsaWVudE9wdGlvbnN9XG4gICAqL1xuICBnZXRBcGlDbGllbnRPcHRpb25zKCkge1xuICAgIHJldHVybiBuZXcgQXBpQ2xpZW50T3B0aW9ucygpXG4gICAgICAuc2V0QmFzZVVybCh0aGlzLnN0YXRlLnRydXN0ZWREb21haW4pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbmRlciB0aGUgY29tcG9uZW50XG4gICAqIEByZXR1cm5zIHtKU1h9XG4gICAqL1xuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxBcHBDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXt0aGlzLnN0YXRlfT5cbiAgICAgICAgPGRpdiBpZD1cImNvbnRhaW5lclwiIGNsYXNzTmFtZT1cImNvbnRhaW5lciBwYWdlIGxvZ2luXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlclwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxvZ29cIj48c3BhbiBjbGFzc05hbWU9XCJ2aXN1YWxseS1oaWRkZW5cIj5QYXNzYm9sdDwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsb2dpbi1mb3JtXCI+XG4gICAgICAgICAgICAgIDxBcGlSZWNvdmVyQ29udGV4dFByb3ZpZGVyIHZhbHVlPXt7dXNlcklkOiB0aGlzLnVzZXJJZCwgdG9rZW46IHRoaXMudG9rZW59fT5cbiAgICAgICAgICAgICAgICA8T3JjaGVzdHJhdGVBcGlSZWNvdmVyLz5cbiAgICAgICAgICAgICAgPC9BcGlSZWNvdmVyQ29udGV4dFByb3ZpZGVyPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9BcHBDb250ZXh0LlByb3ZpZGVyPlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBpUmVjb3ZlcjtcbiIsIi8qKlxuICogUGFzc2JvbHQgfiBPcGVuIHNvdXJjZSBwYXNzd29yZCBtYW5hZ2VyIGZvciB0ZWFtc1xuICogQ29weXJpZ2h0IChjKSAyMDIwIFBhc3Nib2x0IFNBIChodHRwczovL3d3dy5wYXNzYm9sdC5jb20pXG4gKlxuICogTGljZW5zZWQgdW5kZXIgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIHZlcnNpb24gMyBvZiB0aGUgb3IgYW55IGxhdGVyIHZlcnNpb24uXG4gKiBGb3IgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSBzZWUgdGhlIExJQ0VOU0UudHh0XG4gKiBSZWRpc3RyaWJ1dGlvbnMgb2YgZmlsZXMgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UuXG4gKlxuICogQGNvcHlyaWdodCAgICAgQ29weXJpZ2h0IChjKSAyMDIwIFBhc3Nib2x0IFNBIChodHRwczovL3d3dy5wYXNzYm9sdC5jb20pXG4gKiBAbGljZW5zZSAgICAgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL0FHUEwtMy4wIEFHUEwgTGljZW5zZVxuICogQGxpbmsgICAgICAgICAgaHR0cHM6Ly93d3cucGFzc2JvbHQuY29tIFBhc3Nib2x0KHRtKVxuICogQHNpbmNlICAgICAgICAgMy4wLjBcbiAqL1xuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tIFwicmVhY3RcIjtcblxuY2xhc3MgQ2hlY2tNYWlsQm94IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIFJlbmRlciB0aGUgY29tcG9uZW50XG4gICAqIEByZXR1cm5zIHtKU1h9XG4gICAqL1xuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZW1haWwtc2VudC1pbnN0cnVjdGlvbnNcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJlbWFpbC1zZW50LWJnXCI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8aDE+Q2hlY2sgeW91ciBtYWlsYm94ITwvaDE+XG4gICAgICAgIDxwPldlIHNlbmQgeW91IGEgbGluayB0byB2ZXJpZnkgeW91ciBlbWFpbC48YnIvPlxuICAgICAgICAgIENoZWNrIHlvdXIgc3BhbSBmb2xkZXIgaWYgeW91IGRvIG5vdCBzZWUgaGVhciBmcm9tIHVzIGFmdGVyIGEgd2hpbGUuPC9wPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDaGVja01haWxCb3g7XG4iLCIvKipcbiAqIFBhc3Nib2x0IH4gT3BlbiBzb3VyY2UgcGFzc3dvcmQgbWFuYWdlciBmb3IgdGVhbXNcbiAqIENvcHlyaWdodCAoYykgMjAyMCBQYXNzYm9sdCBTQSAoaHR0cHM6Ly93d3cucGFzc2JvbHQuY29tKVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSB2ZXJzaW9uIDMgb2YgdGhlIG9yIGFueSBsYXRlciB2ZXJzaW9uLlxuICogRm9yIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2Ugc2VlIHRoZSBMSUNFTlNFLnR4dFxuICogUmVkaXN0cmlidXRpb25zIG9mIGZpbGVzIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLlxuICpcbiAqIEBjb3B5cmlnaHQgICAgIENvcHlyaWdodCAoYykgMjAyMCBQYXNzYm9sdCBTQSAoaHR0cHM6Ly93d3cucGFzc2JvbHQuY29tKVxuICogQGxpY2Vuc2UgICAgICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9BR1BMLTMuMCBBR1BMIExpY2Vuc2VcbiAqIEBsaW5rICAgICAgICAgIGh0dHBzOi8vd3d3LnBhc3Nib2x0LmNvbSBQYXNzYm9sdCh0bSlcbiAqIEBzaW5jZSAgICAgICAgIDMuMC4wXG4gKi9cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQge3dpdGhBcHBDb250ZXh0fSBmcm9tIFwiLi4vLi4vLi4vY29udGV4dHMvQXBwQ29udGV4dFwiO1xuXG5jb25zdCBET1dOTE9BRF9GSVJFRk9YX1VSTCA9IFwiaHR0cHM6Ly93d3cubW96aWxsYS5vcmcvZmlyZWZveC9kb3dubG9hZC90aGFua3MvXCI7XG5cbmNsYXNzIERpc3BsYXlCcm93c2VyTm90U3VwcG9ydGVkIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIFJlbmRlciB0aGUgY29tcG9uZW50XG4gICAqIEByZXR1cm5zIHtKU1h9XG4gICAqL1xuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnJvd3Nlci1ub3Qtc3VwcG9ydGVkXCI+XG4gICAgICAgIDxoMT5Tb3JyeSwgeW91ciBicm93c2VyIGlzIG5vdCBzdXBwb3J0ZWQuPC9oMT5cbiAgICAgICAgPHA+UGxlYXNlIGRvd25sb2FkIGNocm9tZSBvciBmaXJlZm94IHRvIGdldCBzdGFydGVkIHdpdGggcGFzc2JvbHQuPC9wPlxuICAgICAgICA8YSBocmVmPXtgJHtET1dOTE9BRF9GSVJFRk9YX1VSTH1gfSBjbGFzc05hbWU9XCJicm93c2VyXCIgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiPlxuICAgICAgICAgIDxpbWcgc3JjPXtgJHt0aGlzLnByb3BzLmNvbnRleHQudHJ1c3RlZERvbWFpbn0vaW1nL3RoaXJkX3BhcnR5L2ZpcmVmb3hfbG9nby5wbmdgfSAvPlxuICAgICAgICA8L2E+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1hY3Rpb25zXCI+XG4gICAgICAgICAgPGEgaHJlZj17RE9XTkxPQURfRklSRUZPWF9VUkx9IGNsYXNzTmFtZT1cImJ1dHRvbiBwcmltYXJ5IGJpZ1wiIHJvbGU9XCJidXR0b25cIiB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub29wZW5lciBub3JlZmVycmVyXCI+RG93bmxvYWQgZmlyZWZveDwvYT5cbiAgICAgICAgICB7Lyo8YSByb2xlPVwiYnV0dG9uXCI+V2h5IGlzIG15IGJyb3dzZXIgbm90IHN1cHBvcnRlZD88L2E+Ki99XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5EaXNwbGF5QnJvd3Nlck5vdFN1cHBvcnRlZC5wcm9wVHlwZXMgPSB7XG4gIGNvbnRleHQ6IFByb3BUeXBlcy5hbnksIC8vIFRoZSBhcHBsaWNhdGlvbiBjb250ZXh0XG59O1xuZXhwb3J0IGRlZmF1bHQgd2l0aEFwcENvbnRleHQoRGlzcGxheUJyb3dzZXJOb3RTdXBwb3J0ZWQpO1xuIiwiLyoqXG4gKiBQYXNzYm9sdCB+IE9wZW4gc291cmNlIHBhc3N3b3JkIG1hbmFnZXIgZm9yIHRlYW1zXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgUGFzc2JvbHQgU0EgKGh0dHBzOi8vd3d3LnBhc3Nib2x0LmNvbSlcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgdmVyc2lvbiAzIG9mIHRoZSBvciBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqIEZvciBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHNlZSB0aGUgTElDRU5TRS50eHRcbiAqIFJlZGlzdHJpYnV0aW9ucyBvZiBmaWxlcyBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZS5cbiAqXG4gKiBAY29weXJpZ2h0ICAgICBDb3B5cmlnaHQgKGMpIDIwMjAgUGFzc2JvbHQgU0EgKGh0dHBzOi8vd3d3LnBhc3Nib2x0LmNvbSlcbiAqIEBsaWNlbnNlICAgICAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvQUdQTC0zLjAgQUdQTCBMaWNlbnNlXG4gKiBAbGluayAgICAgICAgICBodHRwczovL3d3dy5wYXNzYm9sdC5jb20gUGFzc2JvbHQodG0pXG4gKiBAc2luY2UgICAgICAgICAzLjAuMFxuICovXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHt3aXRoQXBwQ29udGV4dH0gZnJvbSBcIi4uLy4uLy4uL2NvbnRleHRzL0FwcENvbnRleHRcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcblxuY2xhc3MgRGlzcGxheUVycm9yIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIFJlbmRlciB0aGUgY29tcG9uZW50XG4gICAqIEByZXR1cm5zIHtKU1h9XG4gICAqL1xuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2V0dXAtZXJyb3JcIj5cbiAgICAgICAgPGgxPkFjY2VzcyB0byB0aGlzIHNlcnZpY2UgcmVxdWlyZXMgYW4gaW52aXRhdGlvbi48L2gxPlxuICAgICAgICA8cD5UaGlzIGVtYWlsIGlzIG5vdCBhc3NvY2lhdGVkIHdpdGggYW55IGFwcHJvdmVkIHVzZXJzIG9uIHRoaXMgZG9tYWluLiBQbGVhc2UgY29udGFjdCB5b3VyIGFkbWluaXN0cmF0b3IgdG8gcmVxdWVzdCBhbiBpbnZpdGF0aW9uIGxpbmsuPC9wPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tYWN0aW9uc1wiPlxuICAgICAgICAgIDxhIGhyZWY9e2Ake3RoaXMucHJvcHMuY29udGV4dC50cnVzdGVkRG9tYWlufS91c2Vycy9yZWNvdmVyYH0gY2xhc3NOYW1lPVwiYnV0dG9uIHByaW1hcnkgYmlnXCIgcm9sZT1cImJ1dHRvblwiPlRyeSB3aXRoIGFub3RoZXIgZW1haWw8L2E+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5EaXNwbGF5RXJyb3IucHJvcFR5cGVzID0ge1xuICBjb250ZXh0OiBQcm9wVHlwZXMuYW55LCAvLyBUaGUgYXBwbGljYXRpb24gY29udGV4dFxufTtcbmV4cG9ydCBkZWZhdWx0IHdpdGhBcHBDb250ZXh0KERpc3BsYXlFcnJvcik7XG4iLCIvKipcbiAqIFBhc3Nib2x0IH4gT3BlbiBzb3VyY2UgcGFzc3dvcmQgbWFuYWdlciBmb3IgdGVhbXNcbiAqIENvcHlyaWdodCAoYykgMjAyMCBQYXNzYm9sdCBTQSAoaHR0cHM6Ly93d3cucGFzc2JvbHQuY29tKVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSB2ZXJzaW9uIDMgb2YgdGhlIG9yIGFueSBsYXRlciB2ZXJzaW9uLlxuICogRm9yIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2Ugc2VlIHRoZSBMSUNFTlNFLnR4dFxuICogUmVkaXN0cmlidXRpb25zIG9mIGZpbGVzIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLlxuICpcbiAqIEBjb3B5cmlnaHQgICAgIENvcHlyaWdodCAoYykgMjAyMCBQYXNzYm9sdCBTQSAoaHR0cHM6Ly93d3cucGFzc2JvbHQuY29tKVxuICogQGxpY2Vuc2UgICAgICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9BR1BMLTMuMCBBR1BMIExpY2Vuc2VcbiAqIEBsaW5rICAgICAgICAgIGh0dHBzOi8vd3d3LnBhc3Nib2x0LmNvbSBQYXNzYm9sdCh0bSlcbiAqIEBzaW5jZSAgICAgICAgIDMuMC4wXG4gKi9cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQge0JST1dTRVJfTkFNRVMsIGRldGVjdEJyb3dzZXJOYW1lfSBmcm9tIFwiLi4vLi4vLi4vbGliL0Jyb3dzZXIvZGV0ZWN0QnJvd3Nlck5hbWVcIjtcbmltcG9ydCB7d2l0aEFwcENvbnRleHR9IGZyb20gXCIuLi8uLi8uLi9jb250ZXh0cy9BcHBDb250ZXh0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5cbmNvbnN0IENIUk9NRV9TVE9SRV9CUk9XU0VSX0VYVEVOU0lPTl9VUkwgPSBcImh0dHBzOi8vY2hyb21lLmdvb2dsZS5jb20vd2Vic3RvcmUvZGV0YWlsL3Bhc3Nib2x0LWV4dGVuc2lvbi9kaWRlZ2ltaGFmaXBjZW9uaGplcGFjb2NhZmZtb3BwZlwiO1xuY29uc3QgRklSRUZPWF9TVE9SRV9CUk9XU0VSX0VYVEVOU0lPTl9VUkwgPSBcImh0dHBzOi8vYWRkb25zLm1vemlsbGEub3JnL2ZyL2ZpcmVmb3gvYWRkb24vcGFzc2JvbHRcIjtcblxuY2xhc3MgSW5zdGFsbEV4dGVuc2lvbiBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB0aGlzLmdldERlZmF1bHRTdGF0ZSgpO1xuICAgIHRoaXMuYmluZENhbGxiYWNrcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGRlZmF1bHQgY29tcG9uZW50IHN0YXRlXG4gICAqL1xuICBnZXREZWZhdWx0U3RhdGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGJyb3dzZXJOYW1lOiBkZXRlY3RCcm93c2VyTmFtZSgpXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCaW5kIGNhbGxiYWNrcyBtZXRob2RzXG4gICAqL1xuICBiaW5kQ2FsbGJhY2tzKCkge1xuICAgIHRoaXMuaGFuZGxlUmVmcmVzaENsaWNrID0gdGhpcy5oYW5kbGVSZWZyZXNoQ2xpY2suYmluZCh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGJyb3dzZXIgc3RvcmUgdGh1bWJuYWlsIHVybFxuICAgKiBCeSBkZWZhdWx0IGlmIHVua25vd24sIHJldHVybiB0aGUgY2hyb21lIGltYWdlLlxuICAgKiBAdG9kbyBoYW5kbGUgdW5rbm93biBicm93c2VyIGNhc2VcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIGdldCBicm93c2VyU3RvcmVUaHVtYm5haWxVcmwoKSB7XG4gICAgc3dpdGNoICh0aGlzLnN0YXRlLmJyb3dzZXJOYW1lKSB7XG4gICAgICBjYXNlIEJST1dTRVJfTkFNRVMuQ0hST01FOlxuICAgICAgICByZXR1cm4gYCR7dGhpcy5wcm9wcy5jb250ZXh0LnRydXN0ZWREb21haW59L2ltZy90aGlyZF9wYXJ0eS9DaHJvbWVXZWJTdG9yZV9ibGFjay5wbmdgOyAvLyBAdG9kbyBfd2hpdGUgaWYgdGhlbWUgbWlkZ2FyXG4gICAgICBjYXNlIEJST1dTRVJfTkFNRVMuRklSRUZPWDpcbiAgICAgICAgcmV0dXJuIGAke3RoaXMucHJvcHMuY29udGV4dC50cnVzdGVkRG9tYWlufS9pbWcvdGhpcmRfcGFydHkvRmlyZWZveEFNT19ibGFjay5zdmdgOyAvLyBAdG9kbyBfd2hpdGUgaWYgdGhlbWUgbWlkZ2FyXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gYCR7dGhpcy5wcm9wcy5jb250ZXh0LnRydXN0ZWREb21haW59L2ltZy90aGlyZF9wYXJ0eS9DaHJvbWVXZWJTdG9yZV9ibGFjay5wbmdgO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGJyb3dzZXIgc3RvcmUgdXJsLlxuICAgKiBCeSBkZWZhdWx0IGlmIHVua25vd24sIHJldHVybiB0aGUgY2hyb21lIHdlYnN0b3JlIHVybC5cbiAgICogQHRvZG8gaGFuZGxlIHVua25vd24gYnJvd3NlciBjYXNlXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBnZXQgc3RvcmVVcmwoKSB7XG4gICAgc3dpdGNoICh0aGlzLnN0YXRlLmJyb3dzZXJOYW1lKSB7XG4gICAgICBjYXNlIEJST1dTRVJfTkFNRVMuQ0hST01FOlxuICAgICAgICByZXR1cm4gQ0hST01FX1NUT1JFX0JST1dTRVJfRVhURU5TSU9OX1VSTDtcbiAgICAgIGNhc2UgQlJPV1NFUl9OQU1FUy5GSVJFRk9YOlxuICAgICAgICByZXR1cm4gRklSRUZPWF9TVE9SRV9CUk9XU0VSX0VYVEVOU0lPTl9VUkw7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gQ0hST01FX1NUT1JFX0JST1dTRVJfRVhURU5TSU9OX1VSTDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBzdG9yZSBjbGFzc25hbWVcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIGdldCBzdG9yZUNsYXNzTmFtZSgpIHtcbiAgICByZXR1cm4gYGJyb3dzZXItd2Vic3RvcmUgJHt0aGlzLnN0YXRlLmJyb3dzZXJOYW1lfWA7XG4gIH1cblxuICAvKipcbiAgICogUmVmcmVzaCB0aGUgcGFnZVxuICAgKi9cbiAgaGFuZGxlUmVmcmVzaENsaWNrKCkge1xuICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW5kZXIgdGhlIGNvbXBvbmVudFxuICAgKiBAcmV0dXJucyB7SlNYfVxuICAgKi9cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImluc3RhbGwtZXh0ZW5zaW9uXCI+XG4gICAgICAgIDxoMT5QbGVhc2UgaW5zdGFsbCB0aGUgYnJvd3NlciBleHRlbnNpb24uPC9oMT5cbiAgICAgICAgPHA+UGxlYXNlIGRvd25sb2FkIHRoZSBicm93c2VyIGV4dGVuc2lvbiBhbmQgcmVmcmVzaCB0aGlzIHBhZ2UgdG8gY29udGludWUuPC9wPlxuICAgICAgICB7dGhpcy5zdGF0ZS5icm93c2VyTmFtZSAmJlxuICAgICAgICA8YSBocmVmPXt0aGlzLnN0b3JlVXJsfSBjbGFzc05hbWU9e3RoaXMuc3RvcmVDbGFzc05hbWV9IHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIj5cbiAgICAgICAgICA8aW1nIHNyYz17dGhpcy5icm93c2VyU3RvcmVUaHVtYm5haWxVcmx9Lz5cbiAgICAgICAgPC9hPlxuICAgICAgICB9XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1hY3Rpb25zXCI+XG4gICAgICAgICAgPGEgaHJlZj17dGhpcy5zdG9yZVVybH0gY2xhc3NOYW1lPVwiYnV0dG9uIHByaW1hcnkgYmlnXCIgcm9sZT1cImJ1dHRvblwiIHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIj5Eb3dubG9hZCBleHRlbnNpb248L2E+XG4gICAgICAgICAgPGEgb25DbGljaz17dGhpcy5oYW5kbGVSZWZyZXNoQ2xpY2t9IHJvbGU9XCJidXR0b25cIj5SZWZyZXNoIHRvIGRldGVjdCBleHRlbnNpb248L2E+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5JbnN0YWxsRXh0ZW5zaW9uLnByb3BUeXBlcyA9IHtcbiAgY29udGV4dDogUHJvcFR5cGVzLmFueSwgLy8gVGhlIGFwcGxpY2F0aW9uIGNvbnRleHRcbn07XG5leHBvcnQgZGVmYXVsdCB3aXRoQXBwQ29udGV4dChJbnN0YWxsRXh0ZW5zaW9uKTtcbiIsIi8qKlxuICogUGFzc2JvbHQgfiBPcGVuIHNvdXJjZSBwYXNzd29yZCBtYW5hZ2VyIGZvciB0ZWFtc1xuICogQ29weXJpZ2h0IChjKSAyMDIwIFBhc3Nib2x0IFNBIChodHRwczovL3d3dy5wYXNzYm9sdC5jb20pXG4gKlxuICogTGljZW5zZWQgdW5kZXIgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIHZlcnNpb24gMyBvZiB0aGUgb3IgYW55IGxhdGVyIHZlcnNpb24uXG4gKiBGb3IgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSBzZWUgdGhlIExJQ0VOU0UudHh0XG4gKiBSZWRpc3RyaWJ1dGlvbnMgb2YgZmlsZXMgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UuXG4gKlxuICogQGNvcHlyaWdodCAgICAgQ29weXJpZ2h0IChjKSAyMDIwIFBhc3Nib2x0IFNBIChodHRwczovL3d3dy5wYXNzYm9sdC5jb20pXG4gKiBAbGljZW5zZSAgICAgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL0FHUEwtMy4wIEFHUEwgTGljZW5zZVxuICogQGxpbmsgICAgICAgICAgaHR0cHM6Ly93d3cucGFzc2JvbHQuY29tIFBhc3Nib2x0KHRtKVxuICogQHNpbmNlICAgICAgICAgMy4wLjBcbiAqL1xuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCBMb2FkaW5nU3Bpbm5lciBmcm9tIFwiLi4vLi4vLi4vLi4vcmVhY3QvY29tcG9uZW50cy9Db21tb24vTG9hZGluZy9Mb2FkaW5nU3Bpbm5lci9Mb2FkaW5nU3Bpbm5lclwiO1xuaW1wb3J0IHtBcGlSZWNvdmVyQ29udGV4dFN0YXRlLCB3aXRoQXBpUmVjb3ZlckNvbnRleHR9IGZyb20gXCIuLi8uLi8uLi9jb250ZXh0cy9BcGlSZWNvdmVyQ29udGV4dFwiO1xuaW1wb3J0IEluc3RhbGxFeHRlbnNpb24gZnJvbSBcIi4uLy4uL0F1dGhlbnRpY2F0aW9uL0luc3RhbGxFeHRlbnNpb24vSW5zdGFsbEV4dGVuc2lvblwiO1xuaW1wb3J0IERpc3BsYXlCcm93c2VyTm90U3VwcG9ydGVkIGZyb20gXCIuLi8uLi9BdXRoZW50aWNhdGlvbi9EaXNwbGF5QnJvd3Nlck5vdFN1cHBvcnRlZC9EaXNwbGF5QnJvd3Nlck5vdFN1cHBvcnRlZFwiO1xuaW1wb3J0IENoZWNrTWFpbEJveCBmcm9tIFwiLi4vLi4vQXV0aGVudGljYXRpb24vQ2hlY2tNYWlsQm94L0NoZWNrTWFpbEJveFwiO1xuaW1wb3J0IERpc3BsYXlFcnJvciBmcm9tIFwiLi4vLi4vQXV0aGVudGljYXRpb24vRGlzcGxheUVycm9yL0Rpc3BsYXlFcnJvclwiO1xuXG4vKipcbiAqIFRoZSBjb21wb25lbnQgb3JjaGVzdHJhdGVzIHRoZSBhcGkgcmVjb3ZlciBhdXRoZW50aWNhdGlvbiB3b3JrZmxvdy5cbiAqL1xuY2xhc3MgT3JjaGVzdHJhdGVBcGlSZWNvdmVyIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIFdoZW5ldmVyIHRoZSBjb21wb25lbnQgaXMgaW5pdGlhbGl6ZWRcbiAgICovXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuaW5pdGlhbGl6ZVJlY292ZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSByZWNvdmVyLlxuICAgKi9cbiAgaW5pdGlhbGl6ZVJlY292ZXIoKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnByb3BzLmFwaVJlY292ZXJDb250ZXh0Lm9uSW5pdGlhbGl6ZVJlY292ZXJSZXF1ZXN0ZWQoKSwgMTAwMCk7XG4gIH1cblxuICAvKipcbiAgICogUmVuZGVyIHRoZSBjb21wb25lbnRcbiAgICogQHJldHVybnMge0pTWH1cbiAgICovXG4gIHJlbmRlcigpIHtcbiAgICBzd2l0Y2ggKHRoaXMucHJvcHMuYXBpUmVjb3ZlckNvbnRleHQuc3RhdGUpIHtcbiAgICAgIGNhc2UgQXBpUmVjb3ZlckNvbnRleHRTdGF0ZS5JTlNUQUxMX0VYVEVOU0lPTl9TVEFURTpcbiAgICAgICAgcmV0dXJuIDxJbnN0YWxsRXh0ZW5zaW9uLz47XG4gICAgICBjYXNlIEFwaVJlY292ZXJDb250ZXh0U3RhdGUuRE9XTkxPQURfU1VQUE9SVEVEX0JST1dTRVJfU1RBVEU6XG4gICAgICAgIHJldHVybiA8RGlzcGxheUJyb3dzZXJOb3RTdXBwb3J0ZWQvPjtcbiAgICAgIGNhc2UgQXBpUmVjb3ZlckNvbnRleHRTdGF0ZS5DSEVDS19NQUlMQk9YX1NUQVRFOlxuICAgICAgICByZXR1cm4gPENoZWNrTWFpbEJveC8+O1xuICAgICAgY2FzZSBBcGlSZWNvdmVyQ29udGV4dFN0YXRlLkVSUk9SX1NUQVRFOlxuICAgICAgICByZXR1cm4gPERpc3BsYXlFcnJvci8+O1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIDxMb2FkaW5nU3Bpbm5lci8+O1xuICAgIH1cbiAgfVxufVxuXG5PcmNoZXN0cmF0ZUFwaVJlY292ZXIucHJvcFR5cGVzID0ge1xuICBhcGlSZWNvdmVyQ29udGV4dDogUHJvcFR5cGVzLm9iamVjdCwgLy8gVGhlIGFwaSBzZXR1cCBjb250ZXh0XG59O1xuXG5leHBvcnQgZGVmYXVsdCB3aXRoQXBpUmVjb3ZlckNvbnRleHQoT3JjaGVzdHJhdGVBcGlSZWNvdmVyKTtcbiIsIi8qKlxuICogUGFzc2JvbHQgfiBPcGVuIHNvdXJjZSBwYXNzd29yZCBtYW5hZ2VyIGZvciB0ZWFtc1xuICogQ29weXJpZ2h0IChjKSAyMDIwIFBhc3Nib2x0IFNBIChodHRwczovL3d3dy5wYXNzYm9sdC5jb20pXG4gKlxuICogTGljZW5zZWQgdW5kZXIgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIHZlcnNpb24gMyBvZiB0aGUgb3IgYW55IGxhdGVyIHZlcnNpb24uXG4gKiBGb3IgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSBzZWUgdGhlIExJQ0VOU0UudHh0XG4gKiBSZWRpc3RyaWJ1dGlvbnMgb2YgZmlsZXMgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UuXG4gKlxuICogQGNvcHlyaWdodCAgICAgQ29weXJpZ2h0IChjKSAyMDIwIFBhc3Nib2x0IFNBIChodHRwczovL3d3dy5wYXNzYm9sdC5jb20pXG4gKiBAbGljZW5zZSAgICAgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL0FHUEwtMy4wIEFHUEwgTGljZW5zZVxuICogQGxpbmsgICAgICAgICAgaHR0cHM6Ly93d3cucGFzc2JvbHQuY29tIFBhc3Nib2x0KHRtKVxuICogQHNpbmNlICAgICAgICAgMy4wLjBcbiAqL1xuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IHt3aXRoQXBwQ29udGV4dH0gZnJvbSBcIi4vQXBwQ29udGV4dFwiO1xuaW1wb3J0IHtBcGlDbGllbnR9IGZyb20gXCIuLi9saWIvYXBpQ2xpZW50L2FwaUNsaWVudFwiO1xuaW1wb3J0IHtCUk9XU0VSX05BTUVTLCBkZXRlY3RCcm93c2VyTmFtZX0gZnJvbSBcIi4uL2xpYi9Ccm93c2VyL2RldGVjdEJyb3dzZXJOYW1lXCI7XG5pbXBvcnQgUGFzc2JvbHRBcGlGZXRjaEVycm9yIGZyb20gXCIuLi9saWIvRXJyb3IvcGFzc2JvbHRBcGlGZXRjaEVycm9yXCI7XG5pbXBvcnQgZ2V0UHJvcFZhbHVlIGZyb20gXCIuLi9saWIvQ29tbW9uL09iamVjdC9nZXRQcm9wVmFsdWVcIjtcblxuLyoqXG4gKiBUaGUgQXBpIHJlY292ZXIgY29udGV4dC5cbiAqIEB0eXBlIHtSZWFjdC5Db250ZXh0PG9iamVjdD59XG4gKi9cbmV4cG9ydCBjb25zdCBBcGlSZWNvdmVyQ29udGV4dCA9IFJlYWN0LmNyZWF0ZUNvbnRleHQoe1xuICB1c2VySWQ6IG51bGwsIC8vIFRoZSByZWNvdmVyIHVzZXIgaWRcbiAgdG9rZW46IG51bGwsIC8vIFRoZSByZWNvdmVyIHRva2VuXG4gIHN0YXRlOiBudWxsLCAvLyBUaGUgY3VycmVudCByZWNvdmVyIHdvcmtmbG93IHN0YXRlXG4gIC8vIFdoZW5ldmVyIHRoZSBpbml0aWFsaXphdGlvbiBvZiB0aGUgcmVjb3ZlciBpcyByZXF1ZXN0ZWQuXG4gIG9uSW5pdGlhbGl6ZVJlY292ZXJSZXF1ZXN0ZWQ6ICgpID0+IHtcbiAgfVxufSk7XG5cbi8qKlxuICogVGhlIHJlbGF0ZWQgY29udGV4dCBwcm92aWRlclxuICovXG5jbGFzcyBBcGlSZWNvdmVyQ29udGV4dFByb3ZpZGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHByb3BzIFRoZSBjb21wb25lbnQgcHJvcHNcbiAgICovXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSBPYmplY3QuYXNzaWduKHRoaXMuZGVmYXVsdFN0YXRlLCBwcm9wcy52YWx1ZSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBjb21wb25lbnQgc3RhdGVcbiAgICovXG4gIGdldCBkZWZhdWx0U3RhdGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVzZXJJZDogbnVsbCxcbiAgICAgIHRva2VuOiBudWxsLFxuICAgICAgc3RhdGU6IEFwaVJlY292ZXJDb250ZXh0U3RhdGUuSU5JVElBTF9TVEFURSxcbiAgICAgIG9uSW5pdGlhbGl6ZVJlY292ZXJSZXF1ZXN0ZWQ6IHRoaXMub25Jbml0aWFsaXplUmVjb3ZlclJlcXVlc3RlZC5iaW5kKHRoaXMpXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSByZWNvdmVyXG4gICAqIEByZXR1cm4ge1Byb21pc2U8dm9pZD59XG4gICAqL1xuICBhc3luYyBvbkluaXRpYWxpemVSZWNvdmVyUmVxdWVzdGVkKCkge1xuICAgIGlmICghdGhpcy5zdGF0ZS51c2VySWQgfHwgIXRoaXMuc3RhdGUudG9rZW4pIHtcbiAgICAgIHJldHVybiB0aGlzLnNldFN0YXRlKHtzdGF0ZTogQXBpUmVjb3ZlckNvbnRleHRTdGF0ZS5FUlJPUl9TVEFURX0pO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuaXNCcm93c2VyU3VwcG9ydGVkKCkpIHtcbiAgICAgIHJldHVybiB0aGlzLnNldFN0YXRlKHtzdGF0ZTogQXBpUmVjb3ZlckNvbnRleHRTdGF0ZS5ET1dOTE9BRF9TVVBQT1JURURfQlJPV1NFUl9TVEFURX0pO1xuICAgIH1cblxuICAgIGF3YWl0IHRoaXMudmVyaWZ5UmVjb3ZlckluZm8oKVxuICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZWNvdmVyVmVyaWZ5U3VjY2Vzcy5iaW5kKHRoaXMpKVxuICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlUmVjb3ZlclZlcmlmeUVycm9yLmJpbmQodGhpcykpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdoZW4gdGhlIHJlY292ZXIgaW5mbyBhcmUgdmFsaWQuXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuICBoYW5kbGVSZWNvdmVyVmVyaWZ5U3VjY2VzcygpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtzdGF0ZTogQXBpUmVjb3ZlckNvbnRleHRTdGF0ZS5JTlNUQUxMX0VYVEVOU0lPTl9TVEFURX0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFdoZW4gdGhlIHJlY292ZXIgaW5mbyBkaWRuJ3QgdmFsaWRhdGVcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIGhhbmRsZVJlY292ZXJWZXJpZnlFcnJvcihlcnJvcikge1xuICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIFBhc3Nib2x0QXBpRmV0Y2hFcnJvcikge1xuICAgICAgY29uc3QgaXNUb2tlbkV4cGlyZWQgPSBnZXRQcm9wVmFsdWUoZXJyb3IsIFwiZGF0YS5ib2R5LnRva2VuLmV4cGlyZWRcIik7XG4gICAgICBpZiAoaXNUb2tlbkV4cGlyZWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0U3RhdGUoe3N0YXRlOiBBcGlSZWNvdmVyQ29udGV4dFN0YXRlLkNIRUNLX01BSUxCT1hfU1RBVEV9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuc2V0U3RhdGUoe3N0YXRlOiBBcGlSZWNvdmVyQ29udGV4dFN0YXRlLkVSUk9SX1NUQVRFfSk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgdGhlIGJyb3dzZXIgaXMgc3VwcG9ydGVkLlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIGlzQnJvd3NlclN1cHBvcnRlZCgpIHtcbiAgICBjb25zdCBicm93c2VyTmFtZSA9IGRldGVjdEJyb3dzZXJOYW1lKCk7XG4gICAgY29uc3Qgc3VwcG9ydGVkQnJvd3Nlck5hbWVzID0gW0JST1dTRVJfTkFNRVMuQ0hST01FLCBCUk9XU0VSX05BTUVTLkZJUkVGT1hdO1xuICAgIHJldHVybiBzdXBwb3J0ZWRCcm93c2VyTmFtZXMuaW5jbHVkZXMoYnJvd3Nlck5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFZlcmlmeSB0aGUgcmVjb3ZlciBpbmZvcm1hdGlvbi5cbiAgICogQHJldHVybnMge1Byb21pc2U8b2JqZWN0Pn1cbiAgICovXG4gIGFzeW5jIHZlcmlmeVJlY292ZXJJbmZvKCkge1xuICAgIGNvbnN0IGFwaUNsaWVudE9wdGlvbnMgPSB0aGlzLnByb3BzLmNvbnRleHQuZ2V0QXBpQ2xpZW50T3B0aW9ucygpO1xuICAgIGFwaUNsaWVudE9wdGlvbnMuc2V0UmVzb3VyY2VOYW1lKFwic2V0dXBcIik7XG4gICAgY29uc3QgYXBpQ2xpZW50ID0gbmV3IEFwaUNsaWVudChhcGlDbGllbnRPcHRpb25zKTtcbiAgICBjb25zdCB7Ym9keX0gPSBhd2FpdCBhcGlDbGllbnQuZ2V0KGByZWNvdmVyLyR7dGhpcy5zdGF0ZS51c2VySWR9LyR7dGhpcy5zdGF0ZS50b2tlbn1gKTtcbiAgICByZXR1cm4gYm9keTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW5kZXIgdGhlIGNvbXBvbmVudFxuICAgKiBAcmV0dXJucyB7SlNYfVxuICAgKi9cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8QXBpUmVjb3ZlckNvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3RoaXMuc3RhdGV9PlxuICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgIDwvQXBpUmVjb3ZlckNvbnRleHQuUHJvdmlkZXI+XG4gICAgKTtcbiAgfVxufVxuXG5BcGlSZWNvdmVyQ29udGV4dFByb3ZpZGVyLnByb3BUeXBlcyA9IHtcbiAgY29udGV4dDogUHJvcFR5cGVzLmFueSwgLy8gVGhlIGFwcGxpY2F0aW9uIGNvbnRleHRcbiAgdmFsdWU6IFByb3BUeXBlcy5hbnksIC8vIFRoZSBpbml0aWFsIHZhbHVlIG9mIHRoZSBjb250ZXh0XG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMuYW55IC8vIFRoZSBjaGlsZHJlbiBjb21wb25lbnRzXG59O1xuZXhwb3J0IGRlZmF1bHQgd2l0aEFwcENvbnRleHQoQXBpUmVjb3ZlckNvbnRleHRQcm92aWRlcik7XG5cbi8qKlxuICogQVBJIFJlY292ZXIgQ29udGV4dCBDb25zdW1lciBIT0NcbiAqIEBwYXJhbSBXcmFwcGVkQ29tcG9uZW50XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3aXRoQXBpUmVjb3ZlckNvbnRleHQoV3JhcHBlZENvbXBvbmVudCkge1xuICByZXR1cm4gY2xhc3Mgd2l0aEFwaVJlY292ZXJDb250ZXh0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICByZW5kZXIoKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8QXBpUmVjb3ZlckNvbnRleHQuQ29uc3VtZXI+XG4gICAgICAgICAge1xuICAgICAgICAgICAgY29udGV4dCA9PiA8V3JhcHBlZENvbXBvbmVudCBhcGlSZWNvdmVyQ29udGV4dD17Y29udGV4dH0gey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICAgfVxuICAgICAgICA8L0FwaVJlY292ZXJDb250ZXh0LkNvbnN1bWVyPlxuICAgICAgKTtcbiAgICB9XG4gIH07XG59XG5cbi8qKlxuICogVGhlIHJlY292ZXIgdHlwZXMgb2Ygc3RhdGVcbiAqL1xuZXhwb3J0IGNvbnN0IEFwaVJlY292ZXJDb250ZXh0U3RhdGUgPSB7XG4gIElOSVRJQUxfU1RBVEU6ICdJbml0aWFsIFN0YXRlJyxcbiAgSU5TVEFMTF9FWFRFTlNJT05fU1RBVEU6ICdJbnN0YWxsIGV4dGVuc2lvbicsXG4gIERPV05MT0FEX1NVUFBPUlRFRF9CUk9XU0VSX1NUQVRFOiAnRG93bmxvYWQgc3VwcG9ydGVkIGJyb3dzZXInLFxuICBDSEVDS19NQUlMQk9YX1NUQVRFOiAnQ2hlY2sgbWFpbGJveCcsXG4gIEVSUk9SX1NUQVRFOiAnRXJyb3InLFxufTtcbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcblxuY29uc3QgQXBwQ29udGV4dCA9ICBSZWFjdC5jcmVhdGVDb250ZXh0KHtcbiAgdXNlcjogbnVsbCxcbiAgdXNlcnM6IG51bGwsXG4gIHJvbGVzOiBudWxsLFxuICByZW1lbWJlck1lT3B0aW9uczoge30sXG4gIHJlc291cmNlczogbnVsbCxcbiAgcmVzb3VyY2U6IG51bGwsXG4gIHNoYXJlUmVzb3VyY2VzOiBudWxsLFxuICBzZWxlY3RlZFJlc291cmNlczogbnVsbCxcbiAgc2VsZWN0ZWRVc2VyOiBudWxsLFxuICBmb2xkZXJzOiBudWxsLFxuICByZXNvdXJjZUNvbW1lbnRJZDogbnVsbCxcbiAgbXVzdFJlZnJlc2hDb21tZW50czogZmFsc2UsXG4gIHNpdGVTZXR0aW5nczogbnVsbCxcbiAgdXNlclNldHRpbmdzOiBudWxsLFxufSk7XG5cblxuLyoqXG4gKiBBcHAgQ29udGV4dCBDb25zdW1lciBIT0NcbiAqIEBwYXJhbSBXcmFwcGVkQ29tcG9uZW50XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3aXRoQXBwQ29udGV4dChXcmFwcGVkQ29tcG9uZW50KSB7XG4gIHJldHVybiBjbGFzcyB3aXRoQXBwQ29udGV4dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPEFwcENvbnRleHQuQ29uc3VtZXI+XG4gICAgICAgICAge1xuICAgICAgICAgICAgQXBwQ29udGV4dCA9PiA8V3JhcHBlZENvbXBvbmVudCBjb250ZXh0PXtBcHBDb250ZXh0fSB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgICB9XG4gICAgICAgIDwvQXBwQ29udGV4dC5Db25zdW1lcj5cbiAgICAgICk7XG4gICAgfVxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBBcHBDb250ZXh0O1xuIiwiLyoqXG4gKiBQYXNzYm9sdCB+IE9wZW4gc291cmNlIHBhc3N3b3JkIG1hbmFnZXIgZm9yIHRlYW1zXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgUGFzc2JvbHQgU0EgKGh0dHBzOi8vd3d3LnBhc3Nib2x0LmNvbSlcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgdmVyc2lvbiAzIG9mIHRoZSBvciBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqIEZvciBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHNlZSB0aGUgTElDRU5TRS50eHRcbiAqIFJlZGlzdHJpYnV0aW9ucyBvZiBmaWxlcyBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZS5cbiAqXG4gKiBAY29weXJpZ2h0ICAgICBDb3B5cmlnaHQgKGMpIDIwMjAgUGFzc2JvbHQgU0EgKGh0dHBzOi8vd3d3LnBhc3Nib2x0LmNvbSlcbiAqIEBsaWNlbnNlICAgICAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvQUdQTC0zLjAgQUdQTCBMaWNlbnNlXG4gKiBAbGluayAgICAgICAgICBodHRwczovL3d3dy5wYXNzYm9sdC5jb20gUGFzc2JvbHQodG0pXG4gKiBAc2luY2UgICAgICAgICAzLjAuMFxuICovXG5cbmV4cG9ydCBjb25zdCBCUk9XU0VSX05BTUVTID0ge1xuICBDSFJPTUU6IFwiY2hyb21lXCIsXG4gIEVER0U6IFwiZWRnZVwiLFxuICBGSVJFRk9YOiBcImZpcmVmb3hcIixcbiAgSU5URVJORVRfRVhQTE9SRVI6IFwiaW50ZXJuZXQtZXhwbG9yZXJcIixcbiAgT1BFUkE6IFwib3BlcmFcIixcbiAgU0FGQVJJOiBcInNhZmFyaVwiLFxuICBTQU1TVU5HOiBcInNhbXN1bmdcIixcbiAgVU5LTk9XTjogXCJ1bmtub3duXCIsXG59O1xuXG4vKipcbiAqIERldGVjdCB0aGUgYnJvd3NlciBuYW1lLlxuICogQ29kZSBiYXNlZCBvbjogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1dpbmRvdy9uYXZpZ2F0b3IjRXhhbXBsZV8xX0Jyb3dzZXJfZGV0ZWN0X2FuZF9yZXR1cm5fYV9zdHJpbmdcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZXRlY3RCcm93c2VyTmFtZSgpIHtcbiAgY29uc3QgdXNlckFnZW50ID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTtcbiAgbGV0IGJyb3dzZXJOYW1lO1xuXG4gIGlmICh1c2VyQWdlbnQuaW5kZXhPZihcImZpcmVmb3hcIikgPiAtMSkge1xuICAgIGJyb3dzZXJOYW1lID0gQlJPV1NFUl9OQU1FUy5GSVJFRk9YO1xuICAgIC8vIFwiTW96aWxsYS81LjAgKFgxMTsgVWJ1bnR1OyBMaW51eCB4ODZfNjQ7IHJ2OjYxLjApIEdlY2tvLzIwMTAwMTAxIEZpcmVmb3gvNjEuMFwiXG4gIH0gZWxzZSBpZiAodXNlckFnZW50LmluZGV4T2YoXCJzYW1zdW5nYnJvd3NlclwiKSA+IC0xKSB7XG4gICAgYnJvd3Nlck5hbWUgPSBCUk9XU0VSX05BTUVTLlNBTVNVTkc7XG4gICAgLy8gXCJNb3ppbGxhLzUuMCAoTGludXg7IEFuZHJvaWQgOTsgU0FNU1VORyBTTS1HOTU1RiBCdWlsZC9QUFIxLjE4MDYxMC4wMTEpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIFNhbXN1bmdCcm93c2VyLzkuNCBDaHJvbWUvNjcuMC4zMzk2Ljg3IE1vYmlsZSBTYWZhcmkvNTM3LjM2XG4gIH0gZWxzZSBpZiAodXNlckFnZW50LmluZGV4T2YoXCJvcGVyYVwiKSA+IC0xIHx8IHVzZXJBZ2VudC5pbmRleE9mKFwib3ByXCIpID4gLTEpIHtcbiAgICBicm93c2VyTmFtZSA9IEJST1dTRVJfTkFNRVMuT1BFUkE7XG4gICAgLy8gXCJNb3ppbGxhLzUuMCAoTWFjaW50b3NoOyBJbnRlbCBNYWMgT1MgWCAxMF8xNF8wKSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvNzAuMC4zNTM4LjEwMiBTYWZhcmkvNTM3LjM2IE9QUi81Ny4wLjMwOTguMTA2XCJcbiAgfSBlbHNlIGlmICh1c2VyQWdlbnQuaW5kZXhPZihcInRyaWRlbnRcIikgPiAtMSkge1xuICAgIGJyb3dzZXJOYW1lID0gQlJPV1NFUl9OQU1FUy5JTlRFUk5FVF9FWFBMT1JFUjtcbiAgICAvLyBcIk1vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdPVzY0OyBUcmlkZW50LzcuMDsgLk5FVDQuMEM7IC5ORVQ0LjBFOyBab29tIDMuNi4wOyB3YnggMS4wLjA7IHJ2OjExLjApIGxpa2UgR2Vja29cIlxuICB9IGVsc2UgaWYgKHVzZXJBZ2VudC5pbmRleE9mKFwiZWRnZVwiKSA+IC0xKSB7XG4gICAgYnJvd3Nlck5hbWUgPSBCUk9XU0VSX05BTUVTLkVER0U7XG4gICAgLy8gXCJNb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXaW42NDsgeDY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvNTguMC4zMDI5LjExMCBTYWZhcmkvNTM3LjM2IEVkZ2UvMTYuMTYyOTlcIlxuICB9IGVsc2UgaWYgKHVzZXJBZ2VudC5pbmRleE9mKFwiY2hyb21lXCIpID4gLTEpIHtcbiAgICBicm93c2VyTmFtZSA9IEJST1dTRVJfTkFNRVMuQ0hST01FO1xuICAgIC8vIFwiTW96aWxsYS81LjAgKFgxMTsgTGludXggeDg2XzY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBVYnVudHUgQ2hyb21pdW0vNjYuMC4zMzU5LjE4MSBDaHJvbWUvNjYuMC4zMzU5LjE4MSBTYWZhcmkvNTM3LjM2XCJcbiAgfSBlbHNlIGlmICh1c2VyQWdlbnQuaW5kZXhPZihcInNhZmFyaVwiKSA+IC0xKSB7XG4gICAgYnJvd3Nlck5hbWUgPSBCUk9XU0VSX05BTUVTLlNBRkFSSTtcbiAgICAvLyBcIk1vemlsbGEvNS4wIChpUGhvbmU7IENQVSBpUGhvbmUgT1MgMTFfNCBsaWtlIE1hYyBPUyBYKSBBcHBsZVdlYktpdC82MDUuMS4xNSAoS0hUTUwsIGxpa2UgR2Vja28pIFZlcnNpb24vMTEuMCBNb2JpbGUvMTVFMTQ4IFNhZmFyaS82MDQuMSA5ODB4MTMwNlwiXG4gIH0gZWxzZSB7XG4gICAgYnJvd3Nlck5hbWUgPSBCUk9XU0VSX05BTUVTLlVOS05PV047XG4gIH1cblxuICByZXR1cm4gYnJvd3Nlck5hbWU7XG59XG4iLCIvKipcbiAqIEFwcGxpY2F0aW9uIGVycm9yXG4gKlxuICogQGNvcHlyaWdodCAoYykgMjAxOSBQYXNzYm9sdCBTQVxuICogQGxpY2VuY2UgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy9hZ3BsLTMuMC5lbi5odG1sXG4gKi9cblxuY2xhc3MgUGFzc2JvbHRBcGlGZXRjaEVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBkYXRhKSB7XG4gICAgc3VwZXIobWVzc2FnZSk7XG4gICAgdGhpcy5uYW1lID0gJ1Bhc3Nib2x0QXBpRmV0Y2hFcnJvcic7XG4gICAgdGhpcy5kYXRhID0gZGF0YSB8fCB7fTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQYXNzYm9sdEFwaUZldGNoRXJyb3I7XG4iLCIvKipcbiAqIEJhZCByZXNwb25zZVxuICpcbiAqIEBjb3B5cmlnaHQgKGMpIDIwMTkgUGFzc2JvbHQgU0FcbiAqIEBsaWNlbmNlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvYWdwbC0zLjAuZW4uaHRtbFxuICovXG5jbGFzcyBQYXNzYm9sdEJhZFJlc3BvbnNlRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKFwiQW4gaW50ZXJuYWwgZXJyb3Igb2NjdXJyZWQuIFRoZSBzZXJ2ZXIgcmVzcG9uc2UgY291bGQgbm90IGJlIHBhcnNlZC4gUGxlYXNlIGNvbnRhY3QgeW91ciBhZG1pbmlzdHJhdG9yLlwiKTtcbiAgICB0aGlzLm5hbWUgPSAnUGFzc2JvbHRCYWRSZXNwb25zZUVycm9yJztcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQYXNzYm9sdEJhZFJlc3BvbnNlRXJyb3I7XG4iLCIvKipcbiAqIE5ldHdvcmsgZXJyb3JcbiAqXG4gKiBAY29weXJpZ2h0IChjKSAyMDE5IFBhc3Nib2x0IFNBXG4gKiBAbGljZW5jZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzL2FncGwtMy4wLmVuLmh0bWxcbiAqL1xuXG5jbGFzcyBQYXNzYm9sdFNlcnZpY2VVbmF2YWlsYWJsZUVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihtZXNzYWdlKSB7XG4gICAgbWVzc2FnZSA9IG1lc3NhZ2UgfHwgXCJUaGUgc2VydmljZSBpcyB1bmF2YWlsYWJsZVwiO1xuICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgIHRoaXMubmFtZSA9ICdQYXNzYm9sdFNlcnZpY2VVbmF2YWlsYWJsZUVycm9yJztcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQYXNzYm9sdFNlcnZpY2VVbmF2YWlsYWJsZUVycm9yO1xuIiwiLyoqXG4gKiBQYXNzYm9sdCB+IE9wZW4gc291cmNlIHBhc3N3b3JkIG1hbmFnZXIgZm9yIHRlYW1zXG4gKiBDb3B5cmlnaHQgKGMpIFBhc3Nib2x0IFNBIChodHRwczovL3d3dy5wYXNzYm9sdC5jb20pXG4gKlxuICogTGljZW5zZWQgdW5kZXIgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIHZlcnNpb24gMyBvZiB0aGUgb3IgYW55IGxhdGVyIHZlcnNpb24uXG4gKiBGb3IgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSBzZWUgdGhlIExJQ0VOU0UudHh0XG4gKiBSZWRpc3RyaWJ1dGlvbnMgb2YgZmlsZXMgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UuXG4gKlxuICogQGNvcHlyaWdodCAgICAgQ29weXJpZ2h0IChjKSBQYXNzYm9sdCBTQSAoaHR0cHM6Ly93d3cucGFzc2JvbHQuY29tKVxuICogQGxpY2Vuc2UgICAgICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9BR1BMLTMuMCBBR1BMIExpY2Vuc2VcbiAqIEBsaW5rICAgICAgICAgIGh0dHBzOi8vd3d3LnBhc3Nib2x0LmNvbSBQYXNzYm9sdCh0bSlcbiAqIEBzaW5jZSAgICAgICAgIDIuMTMuMFxuICovXG5pbXBvcnQgUGFzc2JvbHRBcGlGZXRjaEVycm9yIGZyb20gXCIuLi9FcnJvci9wYXNzYm9sdEFwaUZldGNoRXJyb3JcIjtcbmltcG9ydCBQYXNzYm9sdEJhZFJlc3BvbnNlRXJyb3IgZnJvbSBcIi4uL0Vycm9yL3Bhc3Nib2x0QmFkUmVzcG9uc2VFcnJvclwiO1xuaW1wb3J0IFBhc3Nib2x0U2VydmljZVVuYXZhaWxhYmxlRXJyb3IgZnJvbSBcIi4uL0Vycm9yL3Bhc3Nib2x0U2VydmljZVVuYXZhaWxhYmxlRXJyb3JcIjtcblxuZXhwb3J0IGNsYXNzIEFwaUNsaWVudCB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvclxuICAgKlxuICAgKiBAcGFyYW0ge0FwaUNsaWVudE9wdGlvbnN9IG9wdGlvbnNcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBpZiBiYXNlVXJsIGlzIGVtcHR5IG9yIG5vdCBhIHN0cmluZ1xuICAgKiBAcHVibGljXG4gICAqL1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICBpZiAoIXRoaXMub3B0aW9ucy5nZXRCYXNlVXJsKCkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FwaUNsaWVudCBjb25zdHJ1Y3RvciBlcnJvcjogYmFzZVVybCBpcyByZXF1aXJlZC4nKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuZ2V0UmVzb3VyY2VOYW1lKCkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FwaUNsaWVudCBjb25zdHJ1Y3RvciBlcnJvcjogcmVzb3VyY2VOYW1lIGlzIHJlcXVpcmVkLicpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgbGV0IHJhd0Jhc2VVcmwgPSB0aGlzLm9wdGlvbnMuZ2V0QmFzZVVybCgpLnRvU3RyaW5nKCk7XG4gICAgICBpZiAocmF3QmFzZVVybC5lbmRzV2l0aCgnLycpKSB7XG4gICAgICAgIHJhd0Jhc2VVcmwgPSByYXdCYXNlVXJsLnNsaWNlKDAsIC0xKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuYmFzZVVybCA9IGAke3Jhd0Jhc2VVcmx9LyR7dGhpcy5vcHRpb25zLmdldFJlc291cmNlTmFtZSgpfWA7XG4gICAgICB0aGlzLmJhc2VVcmwgPSBuZXcgVVJMKHRoaXMuYmFzZVVybCk7XG4gICAgfSBjYXRjaCAodHlwZUVycm9yKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcGlDbGllbnQgY29uc3RydWN0b3IgZXJyb3I6IGIuJyk7XG4gICAgfVxuXG4gICAgdGhpcy5hcGlWZXJzaW9uID0gJ2FwaS12ZXJzaW9uPXYyJztcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBmZXRjaE9wdGlvbnMuaGVhZGVyc1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZ2V0RGVmYXVsdEhlYWRlcnMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBmZXRjaE9wdGlvbnNcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGJ1aWxkRmV0Y2hPcHRpb25zKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgICAgaGVhZGVyczogey4uLnRoaXMuZ2V0RGVmYXVsdEhlYWRlcnMoKSwgLi4udGhpcy5vcHRpb25zLmdldEhlYWRlcnMoKX1cbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgYSByZXNvdXJjZSBieSBpZFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgbW9zdCBsaWtlbHkgYSB1dWlkXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbdXJsT3B0aW9uc10gT3B0aW9uYWwgdXJsIHBhcmFtZXRlcnMgZm9yIGV4YW1wbGUge1wiY29udGFpbltzb21ldGhpbmddXCI6IFwiMVwifVxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IGlmIGlkIGlzIGVtcHR5IG9yIG5vdCBhIHN0cmluZ1xuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IGlmIHVybE9wdGlvbnMga2V5IG9yIHZhbHVlcyBhcmUgbm90IGEgc3RyaW5nXG4gICAqIEB0aHJvd3Mge1Bhc3Nib2x0U2VydmljZVVuYXZhaWxhYmxlRXJyb3J9IGlmIHNlcnZpY2UgaXMgbm90IHJlYWNoYWJsZVxuICAgKiBAdGhyb3dzIHtQYXNzYm9sdEJhZFJlc3BvbnNlRXJyb3J9IGlmIHBhc3Nib2x0IEFQSSByZXNwb25kZWQgd2l0aCBub24gcGFyc2FibGUgSlNPTlxuICAgKiBAdGhyb3dzIHtQYXNzYm9sdEFwaUZldGNoRXJyb3J9IGlmIHBhc3Nib2x0IEFQSSByZXNwb25zZSBpcyBub3QgT0sgKG5vbiAyeHggc3RhdHVzKVxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTwqPn1cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgYXN5bmMgZ2V0KGlkLCB1cmxPcHRpb25zKSB7XG4gICAgdGhpcy5hc3NlcnRWYWxpZElkKGlkKTtcbiAgICBjb25zdCB1cmwgPSB0aGlzLmJ1aWxkVXJsKGAke3RoaXMuYmFzZVVybH0vJHtpZH1gLCB1cmxPcHRpb25zIHx8IHt9KTtcbiAgICByZXR1cm4gdGhpcy5mZXRjaEFuZEhhbmRsZVJlc3BvbnNlKCdHRVQnLCB1cmwpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZSBhIHJlc291cmNlIGJ5IGlkXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZCBtb3N0IGxpa2VseSBhIHV1aWRcbiAgICogQHBhcmFtIHtPYmplY3R9IFtib2R5XSAod2lsbCBiZSBjb252ZXJ0ZWQgdG8gSmF2YVNjcmlwdCBPYmplY3QgTm90YXRpb24gKEpTT04pIHN0cmluZylcbiAgICogQHBhcmFtIHtPYmplY3R9IFt1cmxPcHRpb25zXSBPcHRpb25hbCB1cmwgcGFyYW1ldGVycyBmb3IgZXhhbXBsZSB7XCJjb250YWluW3NvbWV0aGluZ11cIjogXCIxXCJ9XG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2RyeVJ1bl0gb3B0aW9uYWwsIGRlZmF1bHQgZmFsc2UsIGNoZWNrcyBpZiB0aGUgdmFsaWRpdHkgb2YgdGhlIG9wZXJhdGlvbiBwcmlvciByZWFsIGRlbGV0ZVxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IGlmIGlkIGlzIGVtcHR5IG9yIG5vdCBhIHN0cmluZ1xuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IGlmIHVybE9wdGlvbnMga2V5IG9yIHZhbHVlcyBhcmUgbm90IGEgc3RyaW5nXG4gICAqIEB0aHJvd3Mge1Bhc3Nib2x0U2VydmljZVVuYXZhaWxhYmxlRXJyb3J9IGlmIHNlcnZpY2UgaXMgbm90IHJlYWNoYWJsZVxuICAgKiBAdGhyb3dzIHtQYXNzYm9sdEJhZFJlc3BvbnNlRXJyb3J9IGlmIHBhc3Nib2x0IEFQSSByZXNwb25kZWQgd2l0aCBub24gcGFyc2FibGUgSlNPTlxuICAgKiBAdGhyb3dzIHtQYXNzYm9sdEFwaUZldGNoRXJyb3J9IGlmIHBhc3Nib2x0IEFQSSByZXNwb25zZSBpcyBub3QgT0sgKG5vbiAyeHggc3RhdHVzKVxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTwqPn1cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgYXN5bmMgZGVsZXRlKGlkLCBib2R5LCB1cmxPcHRpb25zLCBkcnlSdW4pIHtcbiAgICB0aGlzLmFzc2VydFZhbGlkSWQoaWQpO1xuICAgIGxldCB1cmw7XG4gICAgaWYgKHR5cGVvZiBkcnlSdW4gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBkcnlSdW4gPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKCFkcnlSdW4pIHtcbiAgICAgIHVybCA9IHRoaXMuYnVpbGRVcmwoYCR7dGhpcy5iYXNlVXJsfS8ke2lkfWAsIHVybE9wdGlvbnMgfHwge30pO1xuICAgIH0gZWxzZSB7XG4gICAgICB1cmwgPSB0aGlzLmJ1aWxkVXJsKGAke3RoaXMuYmFzZVVybH0vJHtpZH0vZHJ5LXJ1bmAsIHVybE9wdGlvbnMgfHwge30pO1xuICAgIH1cbiAgICBsZXQgYm9keVN0cmluZyA9IG51bGw7XG4gICAgaWYgKGJvZHkpIHtcbiAgICAgIGJvZHlTdHJpbmcgPSB0aGlzLmJ1aWxkQm9keShib2R5KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZmV0Y2hBbmRIYW5kbGVSZXNwb25zZSgnREVMRVRFJywgdXJsLCBib2R5U3RyaW5nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIGFsbCB0aGUgcmVzb3VyY2VzXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbdXJsT3B0aW9uc10gT3B0aW9uYWwgdXJsIHBhcmFtZXRlcnMgZm9yIGV4YW1wbGUge1wiY29udGFpbltzb21ldGhpbmddXCI6IFwiMVwifVxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IGlmIHVybE9wdGlvbnMga2V5IG9yIHZhbHVlcyBhcmUgbm90IGEgc3RyaW5nXG4gICAqIEB0aHJvd3Mge1Bhc3Nib2x0U2VydmljZVVuYXZhaWxhYmxlRXJyb3J9IGlmIHNlcnZpY2UgaXMgbm90IHJlYWNoYWJsZVxuICAgKiBAdGhyb3dzIHtQYXNzYm9sdEJhZFJlc3BvbnNlRXJyb3J9IGlmIHBhc3Nib2x0IEFQSSByZXNwb25kZWQgd2l0aCBub24gcGFyc2FibGUgSlNPTlxuICAgKiBAdGhyb3dzIHtQYXNzYm9sdEFwaUZldGNoRXJyb3J9IGlmIHBhc3Nib2x0IEFQSSByZXNwb25zZSBpcyBub3QgT0sgKG5vbiAyeHggc3RhdHVzKVxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTwqPn1cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgYXN5bmMgZmluZEFsbCh1cmxPcHRpb25zKSB7XG4gICAgY29uc3QgdXJsID0gdGhpcy5idWlsZFVybCh0aGlzLmJhc2VVcmwudG9TdHJpbmcoKSwgdXJsT3B0aW9ucyB8fCB7fSk7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuZmV0Y2hBbmRIYW5kbGVSZXNwb25zZSgnR0VUJywgdXJsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSByZXNvdXJjZVxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gYm9keSAod2lsbCBiZSBjb252ZXJ0ZWQgdG8gSmF2YVNjcmlwdCBPYmplY3QgTm90YXRpb24gKEpTT04pIHN0cmluZylcbiAgICogQHBhcmFtIHtPYmplY3R9IFt1cmxPcHRpb25zXSBPcHRpb25hbCB1cmwgcGFyYW1ldGVycyBmb3IgZXhhbXBsZSB7XCJjb250YWluW3NvbWV0aGluZ11cIjogXCIxXCJ9XG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gaWYgYm9keSBpcyBlbXB0eSBvciBjYW5ub3QgY29udmVydGVkIHRvIHZhbGlkIEpTT04gc3RyaW5nXG4gICAqIEB0aHJvd3Mge1Bhc3Nib2x0U2VydmljZVVuYXZhaWxhYmxlRXJyb3J9IGlmIHNlcnZpY2UgaXMgbm90IHJlYWNoYWJsZVxuICAgKiBAdGhyb3dzIHtQYXNzYm9sdEJhZFJlc3BvbnNlRXJyb3J9IGlmIHBhc3Nib2x0IEFQSSByZXNwb25kZWQgd2l0aCBub24gcGFyc2FibGUgSlNPTlxuICAgKiBAdGhyb3dzIHtQYXNzYm9sdEFwaUZldGNoRXJyb3J9IGlmIHBhc3Nib2x0IEFQSSByZXNwb25zZSBpcyBub3QgT0sgKG5vbiAyeHggc3RhdHVzKVxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTwqPn1cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgYXN5bmMgY3JlYXRlKGJvZHksIHVybE9wdGlvbnMpIHtcbiAgICBjb25zdCB1cmwgPSB0aGlzLmJ1aWxkVXJsKHRoaXMuYmFzZVVybC50b1N0cmluZygpLCB1cmxPcHRpb25zIHx8IHt9KTtcbiAgICBjb25zdCBib2R5U3RyaW5nID0gdGhpcy5idWlsZEJvZHkoYm9keSk7XG4gICAgcmV0dXJuIHRoaXMuZmV0Y2hBbmRIYW5kbGVSZXNwb25zZSgnUE9TVCcsIHVybCwgYm9keVN0cmluZyk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIGEgcmVzb3VyY2VcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkIG1vc3QgbGlrZWx5IGEgdXVpZFxuICAgKiBAcGFyYW0ge09iamVjdH0gYm9keSAod2lsbCBiZSBjb252ZXJ0ZWQgdG8gSmF2YVNjcmlwdCBPYmplY3QgTm90YXRpb24gKEpTT04pIHN0cmluZylcbiAgICogQHBhcmFtIHtPYmplY3R9IFt1cmxPcHRpb25zXSBPcHRpb25hbCB1cmwgcGFyYW1ldGVycyBmb3IgZXhhbXBsZSB7XCJjb250YWluW3NvbWV0aGluZ11cIjogXCIxXCJ9XG4gICAqIEBwYXJhbSB7Qm9vbGVhbj99IFtkcnlSdW5dIG9wdGlvbmFsLCBkZWZhdWx0IGZhbHNlLCBjaGVja3MgaWYgdGhlIHZhbGlkaXR5IG9mIHRoZSBvcGVyYXRpb24gcHJpb3IgcmVhbCB1cGRhdGVcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBpZiBpZCBpcyBlbXB0eSBvciBub3QgYSBzdHJpbmdcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBpZiBib2R5IGlzIGVtcHR5IG9yIGNhbm5vdCBjb252ZXJ0ZWQgdG8gdmFsaWQgSlNPTiBzdHJpbmdcbiAgICogQHRocm93cyB7UGFzc2JvbHRTZXJ2aWNlVW5hdmFpbGFibGVFcnJvcn0gaWYgc2VydmljZSBpcyBub3QgcmVhY2hhYmxlXG4gICAqIEB0aHJvd3Mge1Bhc3Nib2x0QmFkUmVzcG9uc2VFcnJvcn0gaWYgcGFzc2JvbHQgQVBJIHJlc3BvbmRlZCB3aXRoIG5vbiBwYXJzYWJsZSBKU09OXG4gICAqIEB0aHJvd3Mge1Bhc3Nib2x0QXBpRmV0Y2hFcnJvcn0gaWYgcGFzc2JvbHQgQVBJIHJlc3BvbnNlIGlzIG5vdCBPSyAobm9uIDJ4eCBzdGF0dXMpXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPCo+fVxuICAgKiBAcHVibGljXG4gICAqL1xuICBhc3luYyB1cGRhdGUoaWQsIGJvZHksIHVybE9wdGlvbnMsIGRyeVJ1bikge1xuICAgIHRoaXMuYXNzZXJ0VmFsaWRJZChpZCk7XG4gICAgbGV0IHVybDtcbiAgICBpZiAodHlwZW9mIGRyeVJ1biA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGRyeVJ1biA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAoIWRyeVJ1bikge1xuICAgICAgdXJsID0gdGhpcy5idWlsZFVybChgJHt0aGlzLmJhc2VVcmx9LyR7aWR9YCwgdXJsT3B0aW9ucyB8fCB7fSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHVybCA9IHRoaXMuYnVpbGRVcmwoYCR7dGhpcy5iYXNlVXJsfS8ke2lkfS9kcnktcnVuYCwgdXJsT3B0aW9ucyB8fCB7fSk7XG4gICAgfVxuICAgIGxldCBib2R5U3RyaW5nID0gbnVsbDtcbiAgICBpZiAoYm9keSkge1xuICAgICAgYm9keVN0cmluZyA9IHRoaXMuYnVpbGRCb2R5KGJvZHkpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5mZXRjaEFuZEhhbmRsZVJlc3BvbnNlKCdQVVQnLCB1cmwsIGJvZHlTdHJpbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFzc2VydCB0aGF0IGFuIGlkIGlzIGEgdmFsaWQgbm9uIGVtcHR5IHN0cmluZ1xuICAgKlxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IGlmIGlkIGlzIGVtcHR5IG9yIG5vdCBhIHN0cmluZ1xuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgYXNzZXJ0VmFsaWRJZChpZCkge1xuICAgIGlmICghaWQpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FwaUNsaWVudC5hc3NlcnRWYWxpZElkIGVycm9yOiBpZCBjYW5ub3QgYmUgZW1wdHknKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBpZCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FwaUNsaWVudC5hc3NlcnRWYWxpZElkIGVycm9yOiBpZCBzaG91bGQgYmUgYSBzdHJpbmcnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHRocm93IFR5cGVFcnJvclxuICAgKiBAcGFyYW0gbWV0aG9kXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBhc3NlcnRNZXRob2QobWV0aG9kKSB7XG4gICAgaWYgKHR5cGVvZiBtZXRob2QgIT09ICdzdHJpbmcnKSB7XG4gICAgICBuZXcgVHlwZUVycm9yKCdBcGlDbGllbnQuYXNzZXJ0VmFsaWRNZXRob2QgbWV0aG9kIHNob3VsZCBiZSBhIHN0cmluZy4nKTtcbiAgICB9XG4gICAgY29uc3Qgc3VwcG9ydGVkTWV0aG9kcyA9IFsnR0VUJywgJ1BPU1QnLCAnUFVUJywgJ0RFTEVURSddO1xuICAgIGlmIChzdXBwb3J0ZWRNZXRob2RzLmluZGV4T2YobWV0aG9kKSA8IDApIHtcbiAgICAgIG5ldyBUeXBlRXJyb3IoYEFwaUNsaWVudC5hc3NlcnRWYWxpZE1ldGhvZCBlcnJvcjogbWV0aG9kICR7bWV0aG9kfSBpcyBub3Qgc3VwcG9ydGVkLmApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVcmwgcGFyYW10ZXIgYXNzZXJ0aW9uXG4gICAqIEBwYXJhbSB7Kn0gdXJsXG4gICAqIEB0aHJvdyBUeXBlRXJyb3JcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGFzc2VydFVybCh1cmwpIHtcbiAgICBpZiAoIXVybCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXBsaUNsaWVudC5hc3NlcnRVcmwgZXJyb3I6IHVybCBpcyByZXF1aXJlZC4nKTtcbiAgICB9XG4gICAgaWYgKCEodXJsIGluc3RhbmNlb2YgVVJMKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXBsaUNsaWVudC5hc3NlcnRVcmwgZXJyb3I6IHVybCBzaG91bGQgYmUgYSB2YWxpZCBVUkwgb2JqZWN0LicpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBCb2R5IHBhcmFtZXRlciBhc3NlcnRpb25cbiAgICogQHBhcmFtIGJvZHlcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBpZiBib2R5IGlzIG5vdCBhIHN0cmluZ1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgYXNzZXJ0Qm9keShib2R5KSB7XG4gICAgaWYgKHR5cGVvZiBib2R5ICE9PSAnc3RyaW5nJykge1xuICAgICAgbmV3IFR5cGVFcnJvcihgQXBpQ2xpZW50LmFzc2VydEJvZHkgZXJyb3I6IGJvZHkgc2hvdWxkIGJlIGEgc3RyaW5nLmApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBCdWlsZCBib2R5IG9iamVjdFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gYm9keVxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IGlmIGJvZHkgaXMgZW1wdHkgb3IgY2Fubm90IGNvbnZlcnRlZCB0byB2YWxpZCBKU09OIHN0cmluZ1xuICAgKiBAcmV0dXJuIHtzdHJpbmd9IEphdmFTY3JpcHQgT2JqZWN0IE5vdGF0aW9uIChKU09OKSBzdHJpbmdcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgYnVpbGRCb2R5KGJvZHkpIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoYm9keSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGEgVVJMIG9iamVjdCBmcm9tIHN0cmluZyB1cmwgYW5kIHRoaXMuYmFzZVVybCBhbmQgdGhpcy5hcGlWZXJzaW9uXG4gICAqIE9wdGlvbmFsbHkgYXBwZW5kIHVybE9wdGlvbnMgdG8gdGhlIFVSTCBvYmplY3RcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd8VVJMfSB1cmxcbiAgICogQHBhcmFtIHtPYmplY3R9IFt1cmxPcHRpb25zXSBPcHRpb25hbCB1cmwgcGFyYW1ldGVycyBmb3IgZXhhbXBsZSB7XCJjb250YWluW3NvbWV0aGluZ11cIjogXCIxXCJ9XG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gaWYgdXJsT3B0aW9ucyBrZXkgb3IgdmFsdWVzIGFyZSBub3QgYSBzdHJpbmdcbiAgICogQHJldHVybnMge1VSTH1cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgYnVpbGRVcmwodXJsLCB1cmxPcHRpb25zKSB7XG4gICAgaWYgKHR5cGVvZiB1cmwgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcGlDbGllbnQuYnVpbGRVcmwgZXJyb3I6IHVybCBzaG91bGQgYmUgYSBzdHJpbmcuJyk7XG4gICAgfVxuICAgIGNvbnN0IHVybE9iaiA9IG5ldyBVUkwoYCR7dXJsfS5qc29uPyR7dGhpcy5hcGlWZXJzaW9ufWApO1xuXG4gICAgdXJsT3B0aW9ucyA9IHVybE9wdGlvbnMgfHwge307XG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXModXJsT3B0aW9ucykpIHtcbiAgICAgIGlmICh0eXBlb2Yga2V5ICE9PSAnc3RyaW5nJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcGlDbGllbnQuYnVpbGRVcmwgZXJyb3I6IHVybE9wdGlvbnMga2V5IHNob3VsZCBiZSBhIHN0cmluZy4nKTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIC8vIEV4YW1wbGUgXCJmaWx0ZXJbaGFzLXRhZ11cIjogXCI8c3RyaW5nPlwiXG4gICAgICAgIHVybE9iai5zZWFyY2hQYXJhbXMuYXBwZW5kKGtleSwgdmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gRXhhbXBsZSBcImZpbHRlcltoYXMtaWRdW11cIjogXCI8dXVpZD5cIlxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICB2YWx1ZS5mb3JFYWNoKHYgPT4ge1xuICAgICAgICAgICAgdXJsT2JqLnNlYXJjaFBhcmFtcy5hcHBlbmQoa2V5LCB2KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcGlDbGllbnQuYnVpbGRVcmwgZXJyb3I6IHVybE9wdGlvbnMgdmFsdWUgc2hvdWxkIGJlIGEgc3RyaW5nIG9yIGFycmF5LicpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB1cmxPYmo7XG4gIH1cblxuICAvKipcbiAgICogZmV0Y2hBbmRIYW5kbGVSZXNwb25zZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbWV0aG9kIGV4YW1wbGUgJ0dFVCcsICdQT1NUJ1xuICAgKiBAcGFyYW0ge1VSTH0gdXJsIG9iamVjdFxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2JvZHldIChvcHRpb25hbClcbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAob3B0aW9uYWwpIG1vcmUgZmV0Y2ggb3B0aW9uc1xuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IGlmIG1ldGhvZCwgdXJsIGFyZSBub3QgZGVmaW5lZCBvciBvZiB0aGUgd3JvbmcgdHlwZVxuICAgKiBAdGhyb3dzIHtQYXNzYm9sdFNlcnZpY2VVbmF2YWlsYWJsZUVycm9yfSBpZiBzZXJ2aWNlIGlzIG5vdCByZWFjaGFibGVcbiAgICogQHRocm93cyB7UGFzc2JvbHRCYWRSZXNwb25zZUVycm9yfSBpZiBwYXNzYm9sdCBBUEkgcmVzcG9uZGVkIHdpdGggbm9uIHBhcnNhYmxlIEpTT05cbiAgICogQHRocm93cyB7UGFzc2JvbHRBcGlGZXRjaEVycm9yfSBpZiBwYXNzYm9sdCBBUEkgcmVzcG9uc2UgaXMgbm90IE9LIChub24gMnh4IHN0YXR1cylcbiAgICogQHJldHVybnMge1Byb21pc2U8Kj59XG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGFzeW5jIGZldGNoQW5kSGFuZGxlUmVzcG9uc2UobWV0aG9kLCB1cmwsIGJvZHksIG9wdGlvbnMpIHtcbiAgICB0aGlzLmFzc2VydFVybCh1cmwpO1xuICAgIHRoaXMuYXNzZXJ0TWV0aG9kKG1ldGhvZCk7XG4gICAgaWYgKGJvZHkpIHtcbiAgICAgIHRoaXMuYXNzZXJ0Qm9keShib2R5KTtcbiAgICB9XG5cbiAgICBsZXQgcmVzcG9uc2UsIHJlc3BvbnNlSnNvbjtcbiAgICBjb25zdCBmZXRjaE9wdGlvbnMgPSB7Li4udGhpcy5idWlsZEZldGNoT3B0aW9ucygpLCAuLi5vcHRpb25zfTtcbiAgICBmZXRjaE9wdGlvbnMubWV0aG9kID0gbWV0aG9kO1xuICAgIGlmIChib2R5KSB7XG4gICAgICBmZXRjaE9wdGlvbnMuYm9keSA9IGJvZHk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybC50b1N0cmluZygpLCBmZXRjaE9wdGlvbnMpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAvLyBDYXRjaCBOZXR3b3JrIGVycm9yIHN1Y2ggYXMgY29ubmVjdGlvbiBsb3N0LlxuICAgICAgdGhyb3cgbmV3IFBhc3Nib2x0U2VydmljZVVuYXZhaWxhYmxlRXJyb3IoZXJyb3IubWVzc2FnZSk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIHJlc3BvbnNlSnNvbiA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgLypcbiAgICAgICAqIElmIHRoZSByZXNwb25zZSBjYW5ub3QgYmUgcGFyc2VkLCBpdCdzIG5vdCBhIFBhc3Nib2x0IEFQSSByZXNwb25zZS5cbiAgICAgICAqIEl0IGNhbiBiZSBhIGZvciBleGFtcGxlIGEgcHJveHkgdGltZW91dCBlcnJvciAoNTA0KS5cbiAgICAgICAqL1xuICAgICAgdGhyb3cgbmV3IFBhc3Nib2x0QmFkUmVzcG9uc2VFcnJvcigpO1xuICAgIH1cblxuICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSByZXNwb25zZUpzb24uaGVhZGVyLm1lc3NhZ2U7XG4gICAgICB0aHJvdyBuZXcgUGFzc2JvbHRBcGlGZXRjaEVycm9yKG1lc3NhZ2UsIHtcbiAgICAgICAgY29kZTogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgICBib2R5OiByZXNwb25zZUpzb24uYm9keVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3BvbnNlSnNvbjtcbiAgfVxufVxuIiwiLyoqXG4gKiBQYXNzYm9sdCB+IE9wZW4gc291cmNlIHBhc3N3b3JkIG1hbmFnZXIgZm9yIHRlYW1zXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgUGFzc2JvbHQgU0EgKGh0dHBzOi8vd3d3LnBhc3Nib2x0LmNvbSlcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgdmVyc2lvbiAzIG9mIHRoZSBvciBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqIEZvciBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHNlZSB0aGUgTElDRU5TRS50eHRcbiAqIFJlZGlzdHJpYnV0aW9ucyBvZiBmaWxlcyBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZS5cbiAqXG4gKiBAY29weXJpZ2h0ICAgICBDb3B5cmlnaHQgKGMpIDIwMjAgUGFzc2JvbHQgU0EgKGh0dHBzOi8vd3d3LnBhc3Nib2x0LmNvbSlcbiAqIEBsaWNlbnNlICAgICAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvQUdQTC0zLjAgQUdQTCBMaWNlbnNlXG4gKiBAbGluayAgICAgICAgICBodHRwczovL3d3dy5wYXNzYm9sdC5jb20gUGFzc2JvbHQodG0pXG4gKi9cbmltcG9ydCB7Q3NyZlRva2VufSBmcm9tIFwiLi9jc3JmVG9rZW5cIjtcblxuZXhwb3J0IGNsYXNzIEFwaUNsaWVudE9wdGlvbnMge1xuICAvKipcbiAgICogU2V0IGJhc2UgdXJsXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfFVSTH0gYmFzZVVybFxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IGlmIGJhc2VVcmwgaXMgZW1wdHksIG9yIG5vdCBhIHN0cmluZyBvciB2YWxpZCBVUkxcbiAgICogQHJldHVybnMge0FwaUNsaWVudE9wdGlvbnN9XG4gICAqIEBwdWJsaWNcbiAgICovXG4gIHNldEJhc2VVcmwoYmFzZVVybCkge1xuICAgIGlmICghYmFzZVVybCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXBpQ2xpZW50T3B0aW9uIGJhc2VVcmwgaXMgcmVxdWlyZWQuJyk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgYmFzZVVybCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMuYmFzZVVybCA9IG5ldyBVUkwoYmFzZVVybCk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FwaUNsaWVudE9wdGlvbiBiYXNlVXJsIGlzIGludmFsaWQuJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChiYXNlVXJsIGluc3RhbmNlb2YgVVJMKSB7XG4gICAgICAgIHRoaXMuYmFzZVVybCA9IGJhc2VVcmw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcGlDbGllbnRPcHRpb25zIGJhc2V1cmwgc2hvdWxkIGJlIGEgc3RyaW5nIG9yIFVSTCcpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgQ1NSRiBUb2tlblxuICAgKlxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IGlmIGNzcmZUb2tlbiBpcyBlbXB0eSBvciBub3QgYSBzdHJpbmcgb3IgQ3NyZlRva2VuIG9iamVjdFxuICAgKiBAcGFyYW0ge3N0cmluZ3xDc3JmVG9rZW59IGNzcmZUb2tlblxuICAgKiBAcHVibGljXG4gICAqL1xuICBzZXRDc3JmVG9rZW4oY3NyZlRva2VuKSB7XG4gICAgaWYgKCFjc3JmVG9rZW4pIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FwaUNsaWVudE9wdGlvbiBjc3JmVG9rZW4gaXMgcmVxdWlyZWQuJyk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgY3NyZlRva2VuID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5jc3JmVG9rZW4gPSBuZXcgQ3NyZlRva2VuKGNzcmZUb2tlbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChjc3JmVG9rZW4gaW5zdGFuY2VvZiBDc3JmVG9rZW4pIHtcbiAgICAgICAgdGhpcy5jc3JmVG9rZW4gPSBjc3JmVG9rZW47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcGlDbGllbnRPcHRpb24gY3NyZlRva2VuIHNob3VsZCBiZSBhIHN0cmluZyBvciBhIHZhbGlkIENzcmZUb2tlbi4nKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSByZXNvdXJjZSBuYW1lXG4gICAqXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gaWYgcmVzb3VyY2VOYW1lIGlzIGVtcHR5LCBvciBub3QgYSBzdHJpbmdcbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlc291cmNlTmFtZSBuYW1lXG4gICAqIEByZXR1cm5zIHtBcGlDbGllbnRPcHRpb25zfVxuICAgKiBAcHVibGljXG4gICAqL1xuICBzZXRSZXNvdXJjZU5hbWUocmVzb3VyY2VOYW1lKSB7XG4gICAgaWYgKCFyZXNvdXJjZU5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FwaUNsaWVudE9wdGlvbnMuc2V0UmVzb3VyY2VOYW1lIHJlc291cmNlTmFtZSBpcyByZXF1aXJlZC4nKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiByZXNvdXJjZU5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcGlDbGllbnRPcHRpb25zLnNldFJlc291cmNlTmFtZSByZXNvdXJjZU5hbWUgc2hvdWxkIGJlIGEgdmFsaWQgc3RyaW5nLicpO1xuICAgIH1cbiAgICB0aGlzLnJlc291cmNlTmFtZSA9IHJlc291cmNlTmFtZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7VVJMfSBiYXNlVXJsXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGdldEJhc2VVcmwoKSB7XG4gICAgcmV0dXJuIHRoaXMuYmFzZVVybDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSByZXNvdXJjZU5hbWVcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgZ2V0UmVzb3VyY2VOYW1lKCkge1xuICAgIHJldHVybiB0aGlzLnJlc291cmNlTmFtZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByZWxldmFudCBjbGllbnQgb3B0aW9ucyBhcyBmZXRjaCBvcHRpb25zIGhlYWRlcnNcbiAgICpcbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBnZXRIZWFkZXJzKCkge1xuICAgIGlmICh0aGlzLmNzcmZUb2tlbikge1xuICAgICAgcmV0dXJuIHRoaXMuY3NyZlRva2VuLnRvRmV0Y2hIZWFkZXJzKCk7XG4gICAgfVxuICB9XG59XG4iLCIvKipcbiAqIFBhc3Nib2x0IH4gT3BlbiBzb3VyY2UgcGFzc3dvcmQgbWFuYWdlciBmb3IgdGVhbXNcbiAqIENvcHlyaWdodCAoYykgMjAyMCBQYXNzYm9sdCBTQSAoaHR0cHM6Ly93d3cucGFzc2JvbHQuY29tKVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSB2ZXJzaW9uIDMgb2YgdGhlIG9yIGFueSBsYXRlciB2ZXJzaW9uLlxuICogRm9yIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2Ugc2VlIHRoZSBMSUNFTlNFLnR4dFxuICogUmVkaXN0cmlidXRpb25zIG9mIGZpbGVzIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLlxuICpcbiAqIEBjb3B5cmlnaHQgICAgIENvcHlyaWdodCAoYykgMjAyMCBQYXNzYm9sdCBTQSAoaHR0cHM6Ly93d3cucGFzc2JvbHQuY29tKVxuICogQGxpY2Vuc2UgICAgICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9BR1BMLTMuMCBBR1BMIExpY2Vuc2VcbiAqIEBsaW5rICAgICAgICAgIGh0dHBzOi8vd3d3LnBhc3Nib2x0LmNvbSBQYXNzYm9sdCh0bSlcbiAqL1xuZXhwb3J0IGNsYXNzIENzcmZUb2tlbiB7XG4gIC8qKlxuICAgKiBDc3JmVG9rZW4gY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRva2VuXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih0b2tlbikge1xuICAgIHRoaXMuc2V0VG9rZW4odG9rZW4pO1xuICB9XG5cbiAgLyoqXG4gICAqIFZhbGlkYXRlXG4gICAqXG4gICAqIEBwYXJhbSB0b2tlblxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IGlmIHRva2VuIGlzIG5vdCBhIHN0cmluZyBvciBpcyB1bmRlZmluZWRcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgc2V0VG9rZW4odG9rZW4pIHtcbiAgICB0aGlzLnZhbGlkYXRlKHRva2VuKTtcbiAgICB0aGlzLnRva2VuID0gdG9rZW47XG4gIH1cblxuICAvKipcbiAgICogVmFsaWRhdGVcbiAgICpcbiAgICogQHBhcmFtIHRva2VuXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gaWYgdG9rZW4gaXMgbm90IGEgc3RyaW5nIG9yIGlzIHVuZGVmaW5lZFxuICAgKiBAcHVibGljXG4gICAqL1xuICB2YWxpZGF0ZSh0b2tlbikge1xuICAgIGlmICghdG9rZW4pIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0NTUkYgdG9rZW4gY2Fubm90IGJlIGVtcHR5LicpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHRva2VuICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ1NSRiB0b2tlbiBzaG91bGQgYmUgYSBzdHJpbmcuJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHRva2VuIGFzIGtleSB2YWx1ZSBoZWFkZXJcbiAgICpcbiAgICogQHJldHVybnMge3tcIlgtQ1NSRi1Ub2tlblwiOiBzdHJpbmd9fVxuICAgKi9cbiAgdG9GZXRjaEhlYWRlcnMoKSB7XG4gICAgcmV0dXJuIHsnWC1DU1JGLVRva2VuJzogdGhpcy50b2tlbn07XG4gIH1cbn1cbiIsIi8qKlxuICogUGFzc2JvbHQgfiBPcGVuIHNvdXJjZSBwYXNzd29yZCBtYW5hZ2VyIGZvciB0ZWFtc1xuICogQ29weXJpZ2h0IChjKSAyMDIwIFBhc3Nib2x0IFNBIChodHRwczovL3d3dy5wYXNzYm9sdC5jb20pXG4gKlxuICogTGljZW5zZWQgdW5kZXIgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIHZlcnNpb24gMyBvZiB0aGUgb3IgYW55IGxhdGVyIHZlcnNpb24uXG4gKiBGb3IgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSBzZWUgdGhlIExJQ0VOU0UudHh0XG4gKiBSZWRpc3RyaWJ1dGlvbnMgb2YgZmlsZXMgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UuXG4gKlxuICogQGNvcHlyaWdodCAgICAgQ29weXJpZ2h0IChjKSAyMDIwIFBhc3Nib2x0IFNBIChodHRwczovL3d3dy5wYXNzYm9sdC5jb20pXG4gKiBAbGljZW5zZSAgICAgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL0FHUEwtMy4wIEFHUEwgTGljZW5zZVxuICogQGxpbmsgICAgICAgICAgaHR0cHM6Ly93d3cucGFzc2JvbHQuY29tIFBhc3Nib2x0KHRtKVxuICogQHNpbmNlICAgICAgICAgMi4xMy4wXG4gKi9cbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcblxuLyoqXG4gKiBUaGlzIGNvbXBvbmVudCBkaXNwbGF5cyBhIHdhaXRpbmcgbG9hZGluZyBzcGlubmVyXG4gKi9cbmNsYXNzIExvYWRpbmdTcGlubmVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIFJlbmRlciB0aGUgY29tcG9uZW50XG4gICAqL1xuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDw+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJvY2Vzc2luZy13cmFwcGVyXCI+XG4gICAgICAgICAgPGRpdiAgY2xhc3NOYW1lPVwicHJvY2Vzc2luZy10ZXh0XCI+XG4gICAgICAgICAgICB7dGhpcy5wcm9wcy50aXRsZSAmJlxuICAgICAgICAgICAgICA8aDI+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMudGl0bGV9XG4gICAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA8aDI+XG4gICAgICAgICAgICAgIFBsZWFzZSB3YWl0Li4uXG4gICAgICAgICAgICA8L2gyPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvPlxuICAgICk7XG4gIH1cbn1cblxuTG9hZGluZ1NwaW5uZXIucHJvcFR5cGVzID0ge1xuICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZywgLy8gQSBjdXN0b20gc3RyaW5nXG59O1xuXG5leHBvcnQgZGVmYXVsdCBMb2FkaW5nU3Bpbm5lcjtcblxuIiwiZXhwb3J0IGRlZmF1bHQgKG9iaiwga2V5KSA9PiBrZXkuc3BsaXQoJy4nKVxuICAucmVkdWNlKChhY2N1bXVsYXRvciwgeCkgPT5cbiAgICBhY2N1bXVsYXRvciA9PT0gdW5kZWZpbmVkID8gYWNjdW11bGF0b3IgOiBhY2N1bXVsYXRvclt4XVxuICAsIG9iaik7XG4iXSwic291cmNlUm9vdCI6IiJ9