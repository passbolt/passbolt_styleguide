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
/******/ 		"api-setup": 0
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
/******/ 	deferredModules.push(["./src/react-extension/ApiSetup.entry.js","api-vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/react-extension/ApiSetup.entry.js":
/*!***********************************************!*\
  !*** ./src/react-extension/ApiSetup.entry.js ***!
  \***********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ApiSetup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ApiSetup */ "./src/react-extension/ApiSetup.js");
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
 * Entry point - Setup application served by the API.
 * This entry point will be used to compile the production code see webpack-api.config.js
 */

var appDomElement = document.createElement("div");
document.body.appendChild(appDomElement);
react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ApiSetup__WEBPACK_IMPORTED_MODULE_2__["default"], null), appDomElement);

/***/ }),

/***/ "./src/react-extension/ApiSetup.js":
/*!*****************************************!*\
  !*** ./src/react-extension/ApiSetup.js ***!
  \*****************************************/
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
/* harmony import */ var _contexts_ApiSetupContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./contexts/ApiSetupContext */ "./src/react-extension/contexts/ApiSetupContext.js");
/* harmony import */ var _lib_apiClient_apiClientOptions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./lib/apiClient/apiClientOptions */ "./src/react-extension/lib/apiClient/apiClientOptions.js");
/* harmony import */ var _components_AuthenticationSetup_OrchestrateApiSetup_OrchestrateApiSetup__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/AuthenticationSetup/OrchestrateApiSetup/OrchestrateApiSetup */ "./src/react-extension/components/AuthenticationSetup/OrchestrateApiSetup/OrchestrateApiSetup.js");






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
 * The setup application served by the API.
 */

var ApiSetup = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(ApiSetup, _Component);

  var _super = _createSuper(ApiSetup);

  /**
   * Default constructor
   * @param props The component props
   */
  function ApiSetup(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, ApiSetup);

    _this = _super.call(this, props);
    _this.state = _this.defaultState;
    _this.userId = null; // The setup user id

    _this.token = null; // The setup token

    _this.initializeProperties();

    return _this;
  }
  /**
   * Returns the component default state
   * @return {object}
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(ApiSetup, [{
    key: "initializeProperties",

    /**
     * Initialize properties
     */
    value: function initializeProperties() {
      var uuidRegex = "[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[0-5][a-fA-F0-9]{3}-[089aAbB][a-fA-F0-9]{3}-[a-fA-F0-9]{12}";
      var setupBootstrapRegex = "setup/install/(".concat(uuidRegex, ")/(").concat(uuidRegex, ")$");
      var regex = new RegExp(setupBootstrapRegex);
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
      return new _lib_apiClient_apiClientOptions__WEBPACK_IMPORTED_MODULE_8__["ApiClientOptions"]().setBaseUrl(this.state.trustedDomain);
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
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_contexts_ApiSetupContext__WEBPACK_IMPORTED_MODULE_7__["default"], {
        value: {
          userId: this.userId,
          token: this.token
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_components_AuthenticationSetup_OrchestrateApiSetup_OrchestrateApiSetup__WEBPACK_IMPORTED_MODULE_9__["default"], null))))));
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

  return ApiSetup;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (ApiSetup);

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

/***/ "./src/react-extension/components/AuthenticationSetup/OrchestrateApiSetup/OrchestrateApiSetup.js":
/*!*******************************************************************************************************!*\
  !*** ./src/react-extension/components/AuthenticationSetup/OrchestrateApiSetup/OrchestrateApiSetup.js ***!
  \*******************************************************************************************************/
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
/* harmony import */ var _contexts_ApiSetupContext__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../contexts/ApiSetupContext */ "./src/react-extension/contexts/ApiSetupContext.js");
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
 * The component orchestrates the api setup authentication workflow.
 */

var OrchestrateApiSetup = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(OrchestrateApiSetup, _Component);

  var _super = _createSuper(OrchestrateApiSetup);

  function OrchestrateApiSetup() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, OrchestrateApiSetup);

    return _super.apply(this, arguments);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(OrchestrateApiSetup, [{
    key: "componentDidMount",

    /**
     * Whenever the component is initialized
     */
    value: function componentDidMount() {
      this.initializeSetup();
    }
    /**
     * Initialize the setup.
     */

  }, {
    key: "initializeSetup",
    value: function initializeSetup() {
      var _this = this;

      setTimeout(function () {
        return _this.props.apiSetupContext.onInitializeSetupRequested();
      }, 1000);
    }
    /**
     * Render the component
     * @returns {JSX}
     */

  }, {
    key: "render",
    value: function render() {
      switch (this.props.apiSetupContext.state) {
        case _contexts_ApiSetupContext__WEBPACK_IMPORTED_MODULE_8__["ApiSetupContextState"].INSTALL_EXTENSION_STATE:
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_Authentication_InstallExtension_InstallExtension__WEBPACK_IMPORTED_MODULE_9__["default"], null);

        case _contexts_ApiSetupContext__WEBPACK_IMPORTED_MODULE_8__["ApiSetupContextState"].DOWNLOAD_SUPPORTED_BROWSER_STATE:
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_Authentication_DisplayBrowserNotSupported_DisplayBrowserNotSupported__WEBPACK_IMPORTED_MODULE_10__["default"], null);

        case _contexts_ApiSetupContext__WEBPACK_IMPORTED_MODULE_8__["ApiSetupContextState"].CHECK_MAILBOX_STATE:
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_Authentication_CheckMailBox_CheckMailBox__WEBPACK_IMPORTED_MODULE_11__["default"], null);

        case _contexts_ApiSetupContext__WEBPACK_IMPORTED_MODULE_8__["ApiSetupContextState"].ERROR_STATE:
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_Authentication_DisplayError_DisplayError__WEBPACK_IMPORTED_MODULE_12__["default"], null);

        default:
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_react_components_Common_Loading_LoadingSpinner_LoadingSpinner__WEBPACK_IMPORTED_MODULE_7__["default"], null);
      }
    }
  }]);

  return OrchestrateApiSetup;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);

OrchestrateApiSetup.propTypes = {
  apiSetupContext: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.object // The api setup context

};
/* harmony default export */ __webpack_exports__["default"] = (Object(_contexts_ApiSetupContext__WEBPACK_IMPORTED_MODULE_8__["withApiSetupContext"])(OrchestrateApiSetup));

/***/ }),

/***/ "./src/react-extension/contexts/ApiSetupContext.js":
/*!*********************************************************!*\
  !*** ./src/react-extension/contexts/ApiSetupContext.js ***!
  \*********************************************************/
/*! exports provided: ApiSetupContext, default, withApiSetupContext, ApiSetupContextState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiSetupContext", function() { return ApiSetupContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withApiSetupContext", function() { return withApiSetupContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiSetupContextState", function() { return ApiSetupContextState; });
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
 * The Api setup context.
 * @type {React.Context<object>}
 */

var ApiSetupContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createContext({
  userId: null,
  // The setup user id
  token: null,
  // The setup token
  state: null,
  // The current setup workflow state
  // Whenever the initialization of the setup is requested.
  onInitializeSetupRequested: function onInitializeSetupRequested() {}
});
/**
 * The related context provider
 */

var ApiSetupContextProvider = /*#__PURE__*/function (_React$Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(ApiSetupContextProvider, _React$Component);

  var _super = _createSuper(ApiSetupContextProvider);

  /**
   * Default constructor
   * @param props The component props
   */
  function ApiSetupContextProvider(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default()(this, ApiSetupContextProvider);

    _this = _super.call(this, props);
    _this.state = Object.assign(_this.defaultState, props.value);
    return _this;
  }
  /**
   * Returns the default component state
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default()(ApiSetupContextProvider, [{
    key: "onInitializeSetupRequested",

    /**
     * Initialize the setup
     * @return {Promise<void>}
     */
    value: function () {
      var _onInitializeSetupRequested = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(!this.state.userId || !this.state.token)) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return", this.setState({
                  state: ApiSetupContextState.ERROR_STATE
                }));

              case 2:
                if (this.isBrowserSupported()) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return", this.setState({
                  state: ApiSetupContextState.DOWNLOAD_SUPPORTED_BROWSER_STATE
                }));

              case 4:
                _context.next = 6;
                return this.verifySetupInfo().then(this.handleSetupVerifySuccess.bind(this))["catch"](this.handleSetupVerifyError.bind(this));

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onInitializeSetupRequested() {
        return _onInitializeSetupRequested.apply(this, arguments);
      }

      return onInitializeSetupRequested;
    }()
    /**
     * When the setup info are valid.
     * @return {void}
     */

  }, {
    key: "handleSetupVerifySuccess",
    value: function handleSetupVerifySuccess() {
      this.setState({
        state: ApiSetupContextState.INSTALL_EXTENSION_STATE
      });
    }
    /**
     * When the setup info didn't validate
     * @return {void}
     */

  }, {
    key: "handleSetupVerifyError",
    value: function handleSetupVerifyError(error) {
      if (error instanceof _lib_Error_passboltApiFetchError__WEBPACK_IMPORTED_MODULE_13__["default"]) {
        var isTokenExpired = Object(_lib_Common_Object_getPropValue__WEBPACK_IMPORTED_MODULE_14__["default"])(error, "data.body.token.expired");

        if (isTokenExpired) {
          return this.setState({
            state: ApiSetupContextState.CHECK_MAILBOX_STATE
          });
        }
      }

      return this.setState({
        state: ApiSetupContextState.ERROR_STATE
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
     * Verify the setup information.
     * @returns {Promise<object>}
     */

  }, {
    key: "verifySetupInfo",
    value: function () {
      var _verifySetupInfo = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee2() {
        var apiClientOptions, apiClient, _yield$apiClient$get, body;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                apiClientOptions = this.props.context.getApiClientOptions();
                apiClientOptions.setResourceName("setup");
                apiClient = new _lib_apiClient_apiClient__WEBPACK_IMPORTED_MODULE_11__["ApiClient"](apiClientOptions);
                _context2.next = 5;
                return apiClient.get("install/".concat(this.state.userId, "/").concat(this.state.token));

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

      function verifySetupInfo() {
        return _verifySetupInfo.apply(this, arguments);
      }

      return verifySetupInfo;
    }()
    /**
     * Render the component
     * @returns {JSX}
     */

  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(ApiSetupContext.Provider, {
        value: this.state
      }, this.props.children);
    }
  }, {
    key: "defaultState",
    get: function get() {
      return {
        userId: null,
        token: null,
        state: ApiSetupContextState.INITIAL_STATE,
        onInitializeSetupRequested: this.onInitializeSetupRequested.bind(this)
      };
    }
  }]);

  return ApiSetupContextProvider;
}(react__WEBPACK_IMPORTED_MODULE_8___default.a.Component);

ApiSetupContextProvider.propTypes = {
  context: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.any,
  // The application context
  value: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.any,
  // The initial value of the context
  children: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.any // The children components

};
/* harmony default export */ __webpack_exports__["default"] = (Object(_AppContext__WEBPACK_IMPORTED_MODULE_10__["withAppContext"])(ApiSetupContextProvider));
/**
 * API Setup Context Consumer HOC
 * @param WrappedComponent
 */

function withApiSetupContext(WrappedComponent) {
  return /*#__PURE__*/function (_React$Component2) {
    _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(withApiSetupContext, _React$Component2);

    var _super2 = _createSuper(withApiSetupContext);

    function withApiSetupContext() {
      _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default()(this, withApiSetupContext);

      return _super2.apply(this, arguments);
    }

    _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default()(withApiSetupContext, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(ApiSetupContext.Consumer, null, function (context) {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(WrappedComponent, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
            apiSetupContext: context
          }, _this2.props));
        });
      }
    }]);

    return withApiSetupContext;
  }(react__WEBPACK_IMPORTED_MODULE_8___default.a.Component);
}
/**
 * The setup types of state
 */

var ApiSetupContextState = {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlYWN0LWV4dGVuc2lvbi9BcGlTZXR1cC5lbnRyeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVhY3QtZXh0ZW5zaW9uL0FwaVNldHVwLmpzIiwid2VicGFjazovLy8uL3NyYy9yZWFjdC1leHRlbnNpb24vY29tcG9uZW50cy9BdXRoZW50aWNhdGlvbi9DaGVja01haWxCb3gvQ2hlY2tNYWlsQm94LmpzIiwid2VicGFjazovLy8uL3NyYy9yZWFjdC1leHRlbnNpb24vY29tcG9uZW50cy9BdXRoZW50aWNhdGlvbi9EaXNwbGF5QnJvd3Nlck5vdFN1cHBvcnRlZC9EaXNwbGF5QnJvd3Nlck5vdFN1cHBvcnRlZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVhY3QtZXh0ZW5zaW9uL2NvbXBvbmVudHMvQXV0aGVudGljYXRpb24vRGlzcGxheUVycm9yL0Rpc3BsYXlFcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVhY3QtZXh0ZW5zaW9uL2NvbXBvbmVudHMvQXV0aGVudGljYXRpb24vSW5zdGFsbEV4dGVuc2lvbi9JbnN0YWxsRXh0ZW5zaW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9yZWFjdC1leHRlbnNpb24vY29tcG9uZW50cy9BdXRoZW50aWNhdGlvblNldHVwL09yY2hlc3RyYXRlQXBpU2V0dXAvT3JjaGVzdHJhdGVBcGlTZXR1cC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVhY3QtZXh0ZW5zaW9uL2NvbnRleHRzL0FwaVNldHVwQ29udGV4dC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVhY3QtZXh0ZW5zaW9uL2NvbnRleHRzL0FwcENvbnRleHQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlYWN0LWV4dGVuc2lvbi9saWIvQnJvd3Nlci9kZXRlY3RCcm93c2VyTmFtZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVhY3QtZXh0ZW5zaW9uL2xpYi9FcnJvci9wYXNzYm9sdEFwaUZldGNoRXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlYWN0LWV4dGVuc2lvbi9saWIvRXJyb3IvcGFzc2JvbHRCYWRSZXNwb25zZUVycm9yLmpzIiwid2VicGFjazovLy8uL3NyYy9yZWFjdC1leHRlbnNpb24vbGliL0Vycm9yL3Bhc3Nib2x0U2VydmljZVVuYXZhaWxhYmxlRXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlYWN0LWV4dGVuc2lvbi9saWIvYXBpQ2xpZW50L2FwaUNsaWVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVhY3QtZXh0ZW5zaW9uL2xpYi9hcGlDbGllbnQvYXBpQ2xpZW50T3B0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVhY3QtZXh0ZW5zaW9uL2xpYi9hcGlDbGllbnQvY3NyZlRva2VuLmpzIiwid2VicGFjazovLy8uL3NyYy9yZWFjdC9jb21wb25lbnRzL0NvbW1vbi9Mb2FkaW5nL0xvYWRpbmdTcGlubmVyL0xvYWRpbmdTcGlubmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9yZWFjdC9saWIvQ29tbW9uL09iamVjdC9nZXRQcm9wVmFsdWUuanMiXSwibmFtZXMiOlsiYXBwRG9tRWxlbWVudCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsIlJlYWN0RE9NIiwicmVuZGVyIiwiQXBpU2V0dXAiLCJwcm9wcyIsInN0YXRlIiwiZGVmYXVsdFN0YXRlIiwidXNlcklkIiwidG9rZW4iLCJpbml0aWFsaXplUHJvcGVydGllcyIsInV1aWRSZWdleCIsInNldHVwQm9vdHN0cmFwUmVnZXgiLCJyZWdleCIsIlJlZ0V4cCIsIm1hdGNoIiwid2luZG93IiwibG9jYXRpb24iLCJwYXRobmFtZSIsImNvbnNvbGUiLCJlcnJvciIsIkFwaUNsaWVudE9wdGlvbnMiLCJzZXRCYXNlVXJsIiwidHJ1c3RlZERvbWFpbiIsImJhc2VVcmwiLCJnZXRBcGlDbGllbnRPcHRpb25zIiwiYmluZCIsImJhc2VFbGVtZW50IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJhdHRyaWJ1dGVzIiwiaHJlZiIsInZhbHVlIiwicmVwbGFjZSIsIkNvbXBvbmVudCIsIkNoZWNrTWFpbEJveCIsIkRPV05MT0FEX0ZJUkVGT1hfVVJMIiwiRGlzcGxheUJyb3dzZXJOb3RTdXBwb3J0ZWQiLCJjb250ZXh0IiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwiYW55Iiwid2l0aEFwcENvbnRleHQiLCJEaXNwbGF5RXJyb3IiLCJDSFJPTUVfU1RPUkVfQlJPV1NFUl9FWFRFTlNJT05fVVJMIiwiRklSRUZPWF9TVE9SRV9CUk9XU0VSX0VYVEVOU0lPTl9VUkwiLCJJbnN0YWxsRXh0ZW5zaW9uIiwiZ2V0RGVmYXVsdFN0YXRlIiwiYmluZENhbGxiYWNrcyIsImJyb3dzZXJOYW1lIiwiZGV0ZWN0QnJvd3Nlck5hbWUiLCJoYW5kbGVSZWZyZXNoQ2xpY2siLCJyZWxvYWQiLCJzdG9yZVVybCIsInN0b3JlQ2xhc3NOYW1lIiwiYnJvd3NlclN0b3JlVGh1bWJuYWlsVXJsIiwiQlJPV1NFUl9OQU1FUyIsIkNIUk9NRSIsIkZJUkVGT1giLCJPcmNoZXN0cmF0ZUFwaVNldHVwIiwiaW5pdGlhbGl6ZVNldHVwIiwic2V0VGltZW91dCIsImFwaVNldHVwQ29udGV4dCIsIm9uSW5pdGlhbGl6ZVNldHVwUmVxdWVzdGVkIiwiQXBpU2V0dXBDb250ZXh0U3RhdGUiLCJJTlNUQUxMX0VYVEVOU0lPTl9TVEFURSIsIkRPV05MT0FEX1NVUFBPUlRFRF9CUk9XU0VSX1NUQVRFIiwiQ0hFQ0tfTUFJTEJPWF9TVEFURSIsIkVSUk9SX1NUQVRFIiwib2JqZWN0Iiwid2l0aEFwaVNldHVwQ29udGV4dCIsIkFwaVNldHVwQ29udGV4dCIsIlJlYWN0IiwiY3JlYXRlQ29udGV4dCIsIkFwaVNldHVwQ29udGV4dFByb3ZpZGVyIiwiT2JqZWN0IiwiYXNzaWduIiwic2V0U3RhdGUiLCJpc0Jyb3dzZXJTdXBwb3J0ZWQiLCJ2ZXJpZnlTZXR1cEluZm8iLCJ0aGVuIiwiaGFuZGxlU2V0dXBWZXJpZnlTdWNjZXNzIiwiaGFuZGxlU2V0dXBWZXJpZnlFcnJvciIsIlBhc3Nib2x0QXBpRmV0Y2hFcnJvciIsImlzVG9rZW5FeHBpcmVkIiwiZ2V0UHJvcFZhbHVlIiwic3VwcG9ydGVkQnJvd3Nlck5hbWVzIiwiaW5jbHVkZXMiLCJhcGlDbGllbnRPcHRpb25zIiwic2V0UmVzb3VyY2VOYW1lIiwiYXBpQ2xpZW50IiwiQXBpQ2xpZW50IiwiZ2V0IiwiY2hpbGRyZW4iLCJJTklUSUFMX1NUQVRFIiwiV3JhcHBlZENvbXBvbmVudCIsIkFwcENvbnRleHQiLCJ1c2VyIiwidXNlcnMiLCJyb2xlcyIsInJlbWVtYmVyTWVPcHRpb25zIiwicmVzb3VyY2VzIiwicmVzb3VyY2UiLCJzaGFyZVJlc291cmNlcyIsInNlbGVjdGVkUmVzb3VyY2VzIiwic2VsZWN0ZWRVc2VyIiwiZm9sZGVycyIsInJlc291cmNlQ29tbWVudElkIiwibXVzdFJlZnJlc2hDb21tZW50cyIsInNpdGVTZXR0aW5ncyIsInVzZXJTZXR0aW5ncyIsIkVER0UiLCJJTlRFUk5FVF9FWFBMT1JFUiIsIk9QRVJBIiwiU0FGQVJJIiwiU0FNU1VORyIsIlVOS05PV04iLCJ1c2VyQWdlbnQiLCJuYXZpZ2F0b3IiLCJ0b0xvd2VyQ2FzZSIsImluZGV4T2YiLCJtZXNzYWdlIiwiZGF0YSIsIm5hbWUiLCJFcnJvciIsIlBhc3Nib2x0QmFkUmVzcG9uc2VFcnJvciIsIlBhc3Nib2x0U2VydmljZVVuYXZhaWxhYmxlRXJyb3IiLCJvcHRpb25zIiwiZ2V0QmFzZVVybCIsIlR5cGVFcnJvciIsImdldFJlc291cmNlTmFtZSIsInJhd0Jhc2VVcmwiLCJ0b1N0cmluZyIsImVuZHNXaXRoIiwic2xpY2UiLCJVUkwiLCJ0eXBlRXJyb3IiLCJhcGlWZXJzaW9uIiwiY3JlZGVudGlhbHMiLCJoZWFkZXJzIiwiZ2V0RGVmYXVsdEhlYWRlcnMiLCJnZXRIZWFkZXJzIiwiaWQiLCJ1cmxPcHRpb25zIiwiYXNzZXJ0VmFsaWRJZCIsInVybCIsImJ1aWxkVXJsIiwiZmV0Y2hBbmRIYW5kbGVSZXNwb25zZSIsImRyeVJ1biIsImJvZHlTdHJpbmciLCJidWlsZEJvZHkiLCJtZXRob2QiLCJzdXBwb3J0ZWRNZXRob2RzIiwiSlNPTiIsInN0cmluZ2lmeSIsInVybE9iaiIsImtleSIsInNlYXJjaFBhcmFtcyIsImFwcGVuZCIsIkFycmF5IiwiaXNBcnJheSIsImZvckVhY2giLCJ2IiwiZW50cmllcyIsImFzc2VydFVybCIsImFzc2VydE1ldGhvZCIsImFzc2VydEJvZHkiLCJmZXRjaE9wdGlvbnMiLCJidWlsZEZldGNoT3B0aW9ucyIsImZldGNoIiwicmVzcG9uc2UiLCJqc29uIiwicmVzcG9uc2VKc29uIiwib2siLCJoZWFkZXIiLCJjb2RlIiwic3RhdHVzIiwiZSIsImNzcmZUb2tlbiIsIkNzcmZUb2tlbiIsInJlc291cmNlTmFtZSIsInRvRmV0Y2hIZWFkZXJzIiwic2V0VG9rZW4iLCJ2YWxpZGF0ZSIsIkxvYWRpbmdTcGlubmVyIiwidGl0bGUiLCJzdHJpbmciLCJvYmoiLCJzcGxpdCIsInJlZHVjZSIsImFjY3VtdWxhdG9yIiwieCIsInVuZGVmaW5lZCJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsUUFBUSxvQkFBb0I7UUFDNUI7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxpQkFBaUIsNEJBQTRCO1FBQzdDO1FBQ0E7UUFDQSxrQkFBa0IsMkJBQTJCO1FBQzdDO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7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QUEsSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7SUFDTThLLGM7Ozs7Ozs7Ozs7Ozs7O0FBQ0o7QUFDRjtBQUNBOzZCQUNXO0FBQ1AsMEJBQ0UscUlBQ0U7QUFBSyxpQkFBUyxFQUFDO0FBQWYsc0JBQ0U7QUFBTSxpQkFBUyxFQUFDO0FBQWhCLFNBQ0csS0FBS2xMLEtBQUwsQ0FBV21MLEtBQVgsaUJBQ0MsdUVBQ0csS0FBS25MLEtBQUwsQ0FBV21MLEtBRGQsQ0FGSixlQU1FLHdGQU5GLENBREYsQ0FERixDQURGO0FBZ0JEOzs7O0VBckIwQmpILDRDQUFLLENBQUN0QyxTOztBQXdCbkNzSixjQUFjLENBQUNqSixTQUFmLEdBQTJCO0FBQ3pCa0osT0FBSyxFQUFFakosaURBQVMsQ0FBQ2tKLE1BRFEsQ0FDQTs7QUFEQSxDQUEzQjtBQUllRiw2RUFBZixFOzs7Ozs7Ozs7Ozs7QUMvQ0E7QUFBZSx5RUFBQ0csR0FBRCxFQUFNL0IsR0FBTjtBQUFBLFNBQWNBLEdBQUcsQ0FBQ2dDLEtBQUosQ0FBVSxHQUFWLEVBQzFCQyxNQUQwQixDQUNuQixVQUFDQyxXQUFELEVBQWNDLENBQWQ7QUFBQSxXQUNORCxXQUFXLEtBQUtFLFNBQWhCLEdBQTRCRixXQUE1QixHQUEwQ0EsV0FBVyxDQUFDQyxDQUFELENBRC9DO0FBQUEsR0FEbUIsRUFHekJKLEdBSHlCLENBQWQ7QUFBQSxDQUFmLEUiLCJmaWxlIjoiYXBpLXNldHVwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG4gXHRcdHZhciBleGVjdXRlTW9kdWxlcyA9IGRhdGFbMl07XG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuIFx0XHRkZWZlcnJlZE1vZHVsZXMucHVzaC5hcHBseShkZWZlcnJlZE1vZHVsZXMsIGV4ZWN1dGVNb2R1bGVzIHx8IFtdKTtcblxuIFx0XHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIGFsbCBjaHVua3MgcmVhZHlcbiBcdFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4gXHR9O1xuIFx0ZnVuY3Rpb24gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKSB7XG4gXHRcdHZhciByZXN1bHQ7XG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG4gXHRcdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG4gXHRcdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcbiBcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuIFx0XHRcdH1cbiBcdFx0XHRpZihmdWxmaWxsZWQpIHtcbiBcdFx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcbiBcdFx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdHJldHVybiByZXN1bHQ7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcImFwaS1zZXR1cFwiOiAwXG4gXHR9O1xuXG4gXHR2YXIgZGVmZXJyZWRNb2R1bGVzID0gW107XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBhZGQgZW50cnkgbW9kdWxlIHRvIGRlZmVycmVkIGxpc3RcbiBcdGRlZmVycmVkTW9kdWxlcy5wdXNoKFtcIi4vc3JjL3JlYWN0LWV4dGVuc2lvbi9BcGlTZXR1cC5lbnRyeS5qc1wiLFwiYXBpLXZlbmRvcnNcIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCIvKipcbiAqIFBhc3Nib2x0IH4gT3BlbiBzb3VyY2UgcGFzc3dvcmQgbWFuYWdlciBmb3IgdGVhbXNcbiAqIENvcHlyaWdodCAoYykgMjAyMCBQYXNzYm9sdCBTQSAoaHR0cHM6Ly93d3cucGFzc2JvbHQuY29tKVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSB2ZXJzaW9uIDMgb2YgdGhlIG9yIGFueSBsYXRlciB2ZXJzaW9uLlxuICogRm9yIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2Ugc2VlIHRoZSBMSUNFTlNFLnR4dFxuICogUmVkaXN0cmlidXRpb25zIG9mIGZpbGVzIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLlxuICpcbiAqIEBjb3B5cmlnaHQgICAgIENvcHlyaWdodCAoYykgMjAyMCBQYXNzYm9sdCBTQSAoaHR0cHM6Ly93d3cucGFzc2JvbHQuY29tKVxuICogQGxpY2Vuc2UgICAgICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9BR1BMLTMuMCBBR1BMIExpY2Vuc2VcbiAqIEBsaW5rICAgICAgICAgIGh0dHBzOi8vd3d3LnBhc3Nib2x0LmNvbSBQYXNzYm9sdCh0bSlcbiAqIEBzaW5jZSAgICAgICAgIDMuMC4wXG4gKi9cbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCI7XG5pbXBvcnQgQXBpU2V0dXAgZnJvbSBcIi4vQXBpU2V0dXBcIjtcblxuLyoqXG4gKiBFbnRyeSBwb2ludCAtIFNldHVwIGFwcGxpY2F0aW9uIHNlcnZlZCBieSB0aGUgQVBJLlxuICogVGhpcyBlbnRyeSBwb2ludCB3aWxsIGJlIHVzZWQgdG8gY29tcGlsZSB0aGUgcHJvZHVjdGlvbiBjb2RlIHNlZSB3ZWJwYWNrLWFwaS5jb25maWcuanNcbiAqL1xuY29uc3QgYXBwRG9tRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGFwcERvbUVsZW1lbnQpO1xuUmVhY3RET00ucmVuZGVyKDxBcGlTZXR1cC8+LCBhcHBEb21FbGVtZW50KTtcbiIsIi8qKlxuICogUGFzc2JvbHQgfiBPcGVuIHNvdXJjZSBwYXNzd29yZCBtYW5hZ2VyIGZvciB0ZWFtc1xuICogQ29weXJpZ2h0IChjKSAyMDIwIFBhc3Nib2x0IFNBIChodHRwczovL3d3dy5wYXNzYm9sdC5jb20pXG4gKlxuICogTGljZW5zZWQgdW5kZXIgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIHZlcnNpb24gMyBvZiB0aGUgb3IgYW55IGxhdGVyIHZlcnNpb24uXG4gKiBGb3IgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSBzZWUgdGhlIExJQ0VOU0UudHh0XG4gKiBSZWRpc3RyaWJ1dGlvbnMgb2YgZmlsZXMgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UuXG4gKlxuICogQGNvcHlyaWdodCAgICAgQ29weXJpZ2h0IChjKSAyMDIwIFBhc3Nib2x0IFNBIChodHRwczovL3d3dy5wYXNzYm9sdC5jb20pXG4gKiBAbGljZW5zZSAgICAgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL0FHUEwtMy4wIEFHUEwgTGljZW5zZVxuICogQGxpbmsgICAgICAgICAgaHR0cHM6Ly93d3cucGFzc2JvbHQuY29tIFBhc3Nib2x0KHRtKVxuICogQHNpbmNlICAgICAgICAgMy4wLjBcbiAqL1xuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBBcHBDb250ZXh0IGZyb20gXCIuL2NvbnRleHRzL0FwcENvbnRleHRcIjtcbmltcG9ydCBBcGlTZXR1cENvbnRleHRQcm92aWRlciBmcm9tIFwiLi9jb250ZXh0cy9BcGlTZXR1cENvbnRleHRcIjtcbmltcG9ydCB7QXBpQ2xpZW50T3B0aW9uc30gZnJvbSBcIi4vbGliL2FwaUNsaWVudC9hcGlDbGllbnRPcHRpb25zXCI7XG5pbXBvcnQgT3JjaGVzdHJhdGVBcGlTZXR1cCBmcm9tIFwiLi9jb21wb25lbnRzL0F1dGhlbnRpY2F0aW9uU2V0dXAvT3JjaGVzdHJhdGVBcGlTZXR1cC9PcmNoZXN0cmF0ZUFwaVNldHVwXCI7XG5cbi8qKlxuICogVGhlIHNldHVwIGFwcGxpY2F0aW9uIHNlcnZlZCBieSB0aGUgQVBJLlxuICovXG5jbGFzcyBBcGlTZXR1cCBleHRlbmRzIENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBwcm9wcyBUaGUgY29tcG9uZW50IHByb3BzXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0gdGhpcy5kZWZhdWx0U3RhdGU7XG4gICAgdGhpcy51c2VySWQgPSBudWxsOyAvLyBUaGUgc2V0dXAgdXNlciBpZFxuICAgIHRoaXMudG9rZW4gPSBudWxsOyAvLyBUaGUgc2V0dXAgdG9rZW5cbiAgICB0aGlzLmluaXRpYWxpemVQcm9wZXJ0aWVzKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY29tcG9uZW50IGRlZmF1bHQgc3RhdGVcbiAgICogQHJldHVybiB7b2JqZWN0fVxuICAgKi9cbiAgZ2V0IGRlZmF1bHRTdGF0ZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHJ1c3RlZERvbWFpbjogdGhpcy5iYXNlVXJsLCAvLyBUaGUgc2l0ZSBkb21haW4gKHVzZSB0cnVzdGVkIGRvbWFpbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIGJyb3dzZXIgZXh0ZW5zaW9uIGFwcGxpY2F0aW9ucylcbiAgICAgIGdldEFwaUNsaWVudE9wdGlvbnM6IHRoaXMuZ2V0QXBpQ2xpZW50T3B0aW9ucy5iaW5kKHRoaXMpLCAvLyBHZXQgdGhlIGFwaSBjbGllbnQgb3B0aW9uc1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSBwcm9wZXJ0aWVzXG4gICAqL1xuICBpbml0aWFsaXplUHJvcGVydGllcygpIHtcbiAgICBjb25zdCB1dWlkUmVnZXggPSBcIlthLWZBLUYwLTldezh9LVthLWZBLUYwLTldezR9LVswLTVdW2EtZkEtRjAtOV17M30tWzA4OWFBYkJdW2EtZkEtRjAtOV17M30tW2EtZkEtRjAtOV17MTJ9XCI7XG4gICAgY29uc3Qgc2V0dXBCb290c3RyYXBSZWdleCA9IGBzZXR1cFxcL2luc3RhbGxcXC8oJHt1dWlkUmVnZXh9KVxcLygke3V1aWRSZWdleH0pJGA7XG4gICAgY29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKHNldHVwQm9vdHN0cmFwUmVnZXgpO1xuICAgIGNvbnN0IG1hdGNoID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLm1hdGNoKHJlZ2V4KTtcbiAgICBpZiAoIW1hdGNoKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiVW5hYmxlIHRvIHJldHJpZXZlIHRoZSB1c2VyIGlkIGFuZCB0b2tlbiBmcm9tIHRoZSB1cmxcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMudXNlcklkID0gbWF0Y2hbMV07XG4gICAgdGhpcy50b2tlbiA9IG1hdGNoWzJdO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgYXBwbGljYXRpb24gYmFzZSB1cmxcbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKi9cbiAgZ2V0IGJhc2VVcmwoKSB7XG4gICAgY29uc3QgYmFzZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYmFzZScpICYmIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdiYXNlJylbMF07XG4gICAgaWYgKGJhc2VFbGVtZW50KSB7XG4gICAgICByZXR1cm4gYmFzZUVsZW1lbnQuYXR0cmlidXRlcy5ocmVmLnZhbHVlLnJlcGxhY2UoL1xcLyokL2csICcnKTtcbiAgICB9XG4gICAgY29uc29sZS5lcnJvcihcIlVuYWJsZSB0byByZXRyaWV2ZSB0aGUgcGFnZSBiYXNlIHRhZ1wiKTtcbiAgICByZXR1cm4gXCJcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIEFQSSBjbGllbnQgb3B0aW9uc1xuICAgKiBAcmV0dXJucyB7QXBpQ2xpZW50T3B0aW9uc31cbiAgICovXG4gIGdldEFwaUNsaWVudE9wdGlvbnMoKSB7XG4gICAgcmV0dXJuIG5ldyBBcGlDbGllbnRPcHRpb25zKClcbiAgICAgIC5zZXRCYXNlVXJsKHRoaXMuc3RhdGUudHJ1c3RlZERvbWFpbik7XG4gIH1cblxuICAvKipcbiAgICogUmVuZGVyIHRoZSBjb21wb25lbnRcbiAgICogQHJldHVybnMge0pTWH1cbiAgICovXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPEFwcENvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3RoaXMuc3RhdGV9PlxuICAgICAgICA8ZGl2IGlkPVwiY29udGFpbmVyXCIgY2xhc3NOYW1lPVwiY29udGFpbmVyIHBhZ2UgbG9naW5cIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibG9nb1wiPjxzcGFuIGNsYXNzTmFtZT1cInZpc3VhbGx5LWhpZGRlblwiPlBhc3Nib2x0PC9zcGFuPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxvZ2luLWZvcm1cIj5cbiAgICAgICAgICAgICAgPEFwaVNldHVwQ29udGV4dFByb3ZpZGVyIHZhbHVlPXt7dXNlcklkOiB0aGlzLnVzZXJJZCwgdG9rZW46IHRoaXMudG9rZW59fT5cbiAgICAgICAgICAgICAgICA8T3JjaGVzdHJhdGVBcGlTZXR1cC8+XG4gICAgICAgICAgICAgIDwvQXBpU2V0dXBDb250ZXh0UHJvdmlkZXI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L0FwcENvbnRleHQuUHJvdmlkZXI+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBcGlTZXR1cDtcbiIsIi8qKlxuICogUGFzc2JvbHQgfiBPcGVuIHNvdXJjZSBwYXNzd29yZCBtYW5hZ2VyIGZvciB0ZWFtc1xuICogQ29weXJpZ2h0IChjKSAyMDIwIFBhc3Nib2x0IFNBIChodHRwczovL3d3dy5wYXNzYm9sdC5jb20pXG4gKlxuICogTGljZW5zZWQgdW5kZXIgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIHZlcnNpb24gMyBvZiB0aGUgb3IgYW55IGxhdGVyIHZlcnNpb24uXG4gKiBGb3IgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSBzZWUgdGhlIExJQ0VOU0UudHh0XG4gKiBSZWRpc3RyaWJ1dGlvbnMgb2YgZmlsZXMgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UuXG4gKlxuICogQGNvcHlyaWdodCAgICAgQ29weXJpZ2h0IChjKSAyMDIwIFBhc3Nib2x0IFNBIChodHRwczovL3d3dy5wYXNzYm9sdC5jb20pXG4gKiBAbGljZW5zZSAgICAgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL0FHUEwtMy4wIEFHUEwgTGljZW5zZVxuICogQGxpbmsgICAgICAgICAgaHR0cHM6Ly93d3cucGFzc2JvbHQuY29tIFBhc3Nib2x0KHRtKVxuICogQHNpbmNlICAgICAgICAgMy4wLjBcbiAqL1xuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tIFwicmVhY3RcIjtcblxuY2xhc3MgQ2hlY2tNYWlsQm94IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIFJlbmRlciB0aGUgY29tcG9uZW50XG4gICAqIEByZXR1cm5zIHtKU1h9XG4gICAqL1xuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZW1haWwtc2VudC1pbnN0cnVjdGlvbnNcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJlbWFpbC1zZW50LWJnXCI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8aDE+Q2hlY2sgeW91ciBtYWlsYm94ITwvaDE+XG4gICAgICAgIDxwPldlIHNlbmQgeW91IGEgbGluayB0byB2ZXJpZnkgeW91ciBlbWFpbC48YnIvPlxuICAgICAgICAgIENoZWNrIHlvdXIgc3BhbSBmb2xkZXIgaWYgeW91IGRvIG5vdCBzZWUgaGVhciBmcm9tIHVzIGFmdGVyIGEgd2hpbGUuPC9wPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDaGVja01haWxCb3g7XG4iLCIvKipcbiAqIFBhc3Nib2x0IH4gT3BlbiBzb3VyY2UgcGFzc3dvcmQgbWFuYWdlciBmb3IgdGVhbXNcbiAqIENvcHlyaWdodCAoYykgMjAyMCBQYXNzYm9sdCBTQSAoaHR0cHM6Ly93d3cucGFzc2JvbHQuY29tKVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSB2ZXJzaW9uIDMgb2YgdGhlIG9yIGFueSBsYXRlciB2ZXJzaW9uLlxuICogRm9yIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2Ugc2VlIHRoZSBMSUNFTlNFLnR4dFxuICogUmVkaXN0cmlidXRpb25zIG9mIGZpbGVzIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLlxuICpcbiAqIEBjb3B5cmlnaHQgICAgIENvcHlyaWdodCAoYykgMjAyMCBQYXNzYm9sdCBTQSAoaHR0cHM6Ly93d3cucGFzc2JvbHQuY29tKVxuICogQGxpY2Vuc2UgICAgICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9BR1BMLTMuMCBBR1BMIExpY2Vuc2VcbiAqIEBsaW5rICAgICAgICAgIGh0dHBzOi8vd3d3LnBhc3Nib2x0LmNvbSBQYXNzYm9sdCh0bSlcbiAqIEBzaW5jZSAgICAgICAgIDMuMC4wXG4gKi9cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQge3dpdGhBcHBDb250ZXh0fSBmcm9tIFwiLi4vLi4vLi4vY29udGV4dHMvQXBwQ29udGV4dFwiO1xuXG5jb25zdCBET1dOTE9BRF9GSVJFRk9YX1VSTCA9IFwiaHR0cHM6Ly93d3cubW96aWxsYS5vcmcvZmlyZWZveC9kb3dubG9hZC90aGFua3MvXCI7XG5cbmNsYXNzIERpc3BsYXlCcm93c2VyTm90U3VwcG9ydGVkIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIFJlbmRlciB0aGUgY29tcG9uZW50XG4gICAqIEByZXR1cm5zIHtKU1h9XG4gICAqL1xuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnJvd3Nlci1ub3Qtc3VwcG9ydGVkXCI+XG4gICAgICAgIDxoMT5Tb3JyeSwgeW91ciBicm93c2VyIGlzIG5vdCBzdXBwb3J0ZWQuPC9oMT5cbiAgICAgICAgPHA+UGxlYXNlIGRvd25sb2FkIGNocm9tZSBvciBmaXJlZm94IHRvIGdldCBzdGFydGVkIHdpdGggcGFzc2JvbHQuPC9wPlxuICAgICAgICA8YSBocmVmPXtgJHtET1dOTE9BRF9GSVJFRk9YX1VSTH1gfSBjbGFzc05hbWU9XCJicm93c2VyXCIgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiPlxuICAgICAgICAgIDxpbWcgc3JjPXtgJHt0aGlzLnByb3BzLmNvbnRleHQudHJ1c3RlZERvbWFpbn0vaW1nL3RoaXJkX3BhcnR5L2ZpcmVmb3hfbG9nby5wbmdgfSAvPlxuICAgICAgICA8L2E+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1hY3Rpb25zXCI+XG4gICAgICAgICAgPGEgaHJlZj17RE9XTkxPQURfRklSRUZPWF9VUkx9IGNsYXNzTmFtZT1cImJ1dHRvbiBwcmltYXJ5IGJpZ1wiIHJvbGU9XCJidXR0b25cIiB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub29wZW5lciBub3JlZmVycmVyXCI+RG93bmxvYWQgZmlyZWZveDwvYT5cbiAgICAgICAgICB7Lyo8YSByb2xlPVwiYnV0dG9uXCI+V2h5IGlzIG15IGJyb3dzZXIgbm90IHN1cHBvcnRlZD88L2E+Ki99XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5EaXNwbGF5QnJvd3Nlck5vdFN1cHBvcnRlZC5wcm9wVHlwZXMgPSB7XG4gIGNvbnRleHQ6IFByb3BUeXBlcy5hbnksIC8vIFRoZSBhcHBsaWNhdGlvbiBjb250ZXh0XG59O1xuZXhwb3J0IGRlZmF1bHQgd2l0aEFwcENvbnRleHQoRGlzcGxheUJyb3dzZXJOb3RTdXBwb3J0ZWQpO1xuIiwiLyoqXG4gKiBQYXNzYm9sdCB+IE9wZW4gc291cmNlIHBhc3N3b3JkIG1hbmFnZXIgZm9yIHRlYW1zXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgUGFzc2JvbHQgU0EgKGh0dHBzOi8vd3d3LnBhc3Nib2x0LmNvbSlcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgdmVyc2lvbiAzIG9mIHRoZSBvciBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqIEZvciBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHNlZSB0aGUgTElDRU5TRS50eHRcbiAqIFJlZGlzdHJpYnV0aW9ucyBvZiBmaWxlcyBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZS5cbiAqXG4gKiBAY29weXJpZ2h0ICAgICBDb3B5cmlnaHQgKGMpIDIwMjAgUGFzc2JvbHQgU0EgKGh0dHBzOi8vd3d3LnBhc3Nib2x0LmNvbSlcbiAqIEBsaWNlbnNlICAgICAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvQUdQTC0zLjAgQUdQTCBMaWNlbnNlXG4gKiBAbGluayAgICAgICAgICBodHRwczovL3d3dy5wYXNzYm9sdC5jb20gUGFzc2JvbHQodG0pXG4gKiBAc2luY2UgICAgICAgICAzLjAuMFxuICovXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHt3aXRoQXBwQ29udGV4dH0gZnJvbSBcIi4uLy4uLy4uL2NvbnRleHRzL0FwcENvbnRleHRcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcblxuY2xhc3MgRGlzcGxheUVycm9yIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIFJlbmRlciB0aGUgY29tcG9uZW50XG4gICAqIEByZXR1cm5zIHtKU1h9XG4gICAqL1xuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2V0dXAtZXJyb3JcIj5cbiAgICAgICAgPGgxPkFjY2VzcyB0byB0aGlzIHNlcnZpY2UgcmVxdWlyZXMgYW4gaW52aXRhdGlvbi48L2gxPlxuICAgICAgICA8cD5UaGlzIGVtYWlsIGlzIG5vdCBhc3NvY2lhdGVkIHdpdGggYW55IGFwcHJvdmVkIHVzZXJzIG9uIHRoaXMgZG9tYWluLiBQbGVhc2UgY29udGFjdCB5b3VyIGFkbWluaXN0cmF0b3IgdG8gcmVxdWVzdCBhbiBpbnZpdGF0aW9uIGxpbmsuPC9wPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tYWN0aW9uc1wiPlxuICAgICAgICAgIDxhIGhyZWY9e2Ake3RoaXMucHJvcHMuY29udGV4dC50cnVzdGVkRG9tYWlufS91c2Vycy9yZWNvdmVyYH0gY2xhc3NOYW1lPVwiYnV0dG9uIHByaW1hcnkgYmlnXCIgcm9sZT1cImJ1dHRvblwiPlRyeSB3aXRoIGFub3RoZXIgZW1haWw8L2E+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5EaXNwbGF5RXJyb3IucHJvcFR5cGVzID0ge1xuICBjb250ZXh0OiBQcm9wVHlwZXMuYW55LCAvLyBUaGUgYXBwbGljYXRpb24gY29udGV4dFxufTtcbmV4cG9ydCBkZWZhdWx0IHdpdGhBcHBDb250ZXh0KERpc3BsYXlFcnJvcik7XG4iLCIvKipcbiAqIFBhc3Nib2x0IH4gT3BlbiBzb3VyY2UgcGFzc3dvcmQgbWFuYWdlciBmb3IgdGVhbXNcbiAqIENvcHlyaWdodCAoYykgMjAyMCBQYXNzYm9sdCBTQSAoaHR0cHM6Ly93d3cucGFzc2JvbHQuY29tKVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSB2ZXJzaW9uIDMgb2YgdGhlIG9yIGFueSBsYXRlciB2ZXJzaW9uLlxuICogRm9yIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2Ugc2VlIHRoZSBMSUNFTlNFLnR4dFxuICogUmVkaXN0cmlidXRpb25zIG9mIGZpbGVzIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLlxuICpcbiAqIEBjb3B5cmlnaHQgICAgIENvcHlyaWdodCAoYykgMjAyMCBQYXNzYm9sdCBTQSAoaHR0cHM6Ly93d3cucGFzc2JvbHQuY29tKVxuICogQGxpY2Vuc2UgICAgICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9BR1BMLTMuMCBBR1BMIExpY2Vuc2VcbiAqIEBsaW5rICAgICAgICAgIGh0dHBzOi8vd3d3LnBhc3Nib2x0LmNvbSBQYXNzYm9sdCh0bSlcbiAqIEBzaW5jZSAgICAgICAgIDMuMC4wXG4gKi9cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQge0JST1dTRVJfTkFNRVMsIGRldGVjdEJyb3dzZXJOYW1lfSBmcm9tIFwiLi4vLi4vLi4vbGliL0Jyb3dzZXIvZGV0ZWN0QnJvd3Nlck5hbWVcIjtcbmltcG9ydCB7d2l0aEFwcENvbnRleHR9IGZyb20gXCIuLi8uLi8uLi9jb250ZXh0cy9BcHBDb250ZXh0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5cbmNvbnN0IENIUk9NRV9TVE9SRV9CUk9XU0VSX0VYVEVOU0lPTl9VUkwgPSBcImh0dHBzOi8vY2hyb21lLmdvb2dsZS5jb20vd2Vic3RvcmUvZGV0YWlsL3Bhc3Nib2x0LWV4dGVuc2lvbi9kaWRlZ2ltaGFmaXBjZW9uaGplcGFjb2NhZmZtb3BwZlwiO1xuY29uc3QgRklSRUZPWF9TVE9SRV9CUk9XU0VSX0VYVEVOU0lPTl9VUkwgPSBcImh0dHBzOi8vYWRkb25zLm1vemlsbGEub3JnL2ZyL2ZpcmVmb3gvYWRkb24vcGFzc2JvbHRcIjtcblxuY2xhc3MgSW5zdGFsbEV4dGVuc2lvbiBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB0aGlzLmdldERlZmF1bHRTdGF0ZSgpO1xuICAgIHRoaXMuYmluZENhbGxiYWNrcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGRlZmF1bHQgY29tcG9uZW50IHN0YXRlXG4gICAqL1xuICBnZXREZWZhdWx0U3RhdGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGJyb3dzZXJOYW1lOiBkZXRlY3RCcm93c2VyTmFtZSgpXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCaW5kIGNhbGxiYWNrcyBtZXRob2RzXG4gICAqL1xuICBiaW5kQ2FsbGJhY2tzKCkge1xuICAgIHRoaXMuaGFuZGxlUmVmcmVzaENsaWNrID0gdGhpcy5oYW5kbGVSZWZyZXNoQ2xpY2suYmluZCh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGJyb3dzZXIgc3RvcmUgdGh1bWJuYWlsIHVybFxuICAgKiBCeSBkZWZhdWx0IGlmIHVua25vd24sIHJldHVybiB0aGUgY2hyb21lIGltYWdlLlxuICAgKiBAdG9kbyBoYW5kbGUgdW5rbm93biBicm93c2VyIGNhc2VcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIGdldCBicm93c2VyU3RvcmVUaHVtYm5haWxVcmwoKSB7XG4gICAgc3dpdGNoICh0aGlzLnN0YXRlLmJyb3dzZXJOYW1lKSB7XG4gICAgICBjYXNlIEJST1dTRVJfTkFNRVMuQ0hST01FOlxuICAgICAgICByZXR1cm4gYCR7dGhpcy5wcm9wcy5jb250ZXh0LnRydXN0ZWREb21haW59L2ltZy90aGlyZF9wYXJ0eS9DaHJvbWVXZWJTdG9yZV9ibGFjay5wbmdgOyAvLyBAdG9kbyBfd2hpdGUgaWYgdGhlbWUgbWlkZ2FyXG4gICAgICBjYXNlIEJST1dTRVJfTkFNRVMuRklSRUZPWDpcbiAgICAgICAgcmV0dXJuIGAke3RoaXMucHJvcHMuY29udGV4dC50cnVzdGVkRG9tYWlufS9pbWcvdGhpcmRfcGFydHkvRmlyZWZveEFNT19ibGFjay5zdmdgOyAvLyBAdG9kbyBfd2hpdGUgaWYgdGhlbWUgbWlkZ2FyXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gYCR7dGhpcy5wcm9wcy5jb250ZXh0LnRydXN0ZWREb21haW59L2ltZy90aGlyZF9wYXJ0eS9DaHJvbWVXZWJTdG9yZV9ibGFjay5wbmdgO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGJyb3dzZXIgc3RvcmUgdXJsLlxuICAgKiBCeSBkZWZhdWx0IGlmIHVua25vd24sIHJldHVybiB0aGUgY2hyb21lIHdlYnN0b3JlIHVybC5cbiAgICogQHRvZG8gaGFuZGxlIHVua25vd24gYnJvd3NlciBjYXNlXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBnZXQgc3RvcmVVcmwoKSB7XG4gICAgc3dpdGNoICh0aGlzLnN0YXRlLmJyb3dzZXJOYW1lKSB7XG4gICAgICBjYXNlIEJST1dTRVJfTkFNRVMuQ0hST01FOlxuICAgICAgICByZXR1cm4gQ0hST01FX1NUT1JFX0JST1dTRVJfRVhURU5TSU9OX1VSTDtcbiAgICAgIGNhc2UgQlJPV1NFUl9OQU1FUy5GSVJFRk9YOlxuICAgICAgICByZXR1cm4gRklSRUZPWF9TVE9SRV9CUk9XU0VSX0VYVEVOU0lPTl9VUkw7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gQ0hST01FX1NUT1JFX0JST1dTRVJfRVhURU5TSU9OX1VSTDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBzdG9yZSBjbGFzc25hbWVcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIGdldCBzdG9yZUNsYXNzTmFtZSgpIHtcbiAgICByZXR1cm4gYGJyb3dzZXItd2Vic3RvcmUgJHt0aGlzLnN0YXRlLmJyb3dzZXJOYW1lfWA7XG4gIH1cblxuICAvKipcbiAgICogUmVmcmVzaCB0aGUgcGFnZVxuICAgKi9cbiAgaGFuZGxlUmVmcmVzaENsaWNrKCkge1xuICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW5kZXIgdGhlIGNvbXBvbmVudFxuICAgKiBAcmV0dXJucyB7SlNYfVxuICAgKi9cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImluc3RhbGwtZXh0ZW5zaW9uXCI+XG4gICAgICAgIDxoMT5QbGVhc2UgaW5zdGFsbCB0aGUgYnJvd3NlciBleHRlbnNpb24uPC9oMT5cbiAgICAgICAgPHA+UGxlYXNlIGRvd25sb2FkIHRoZSBicm93c2VyIGV4dGVuc2lvbiBhbmQgcmVmcmVzaCB0aGlzIHBhZ2UgdG8gY29udGludWUuPC9wPlxuICAgICAgICB7dGhpcy5zdGF0ZS5icm93c2VyTmFtZSAmJlxuICAgICAgICA8YSBocmVmPXt0aGlzLnN0b3JlVXJsfSBjbGFzc05hbWU9e3RoaXMuc3RvcmVDbGFzc05hbWV9IHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIj5cbiAgICAgICAgICA8aW1nIHNyYz17dGhpcy5icm93c2VyU3RvcmVUaHVtYm5haWxVcmx9Lz5cbiAgICAgICAgPC9hPlxuICAgICAgICB9XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1hY3Rpb25zXCI+XG4gICAgICAgICAgPGEgaHJlZj17dGhpcy5zdG9yZVVybH0gY2xhc3NOYW1lPVwiYnV0dG9uIHByaW1hcnkgYmlnXCIgcm9sZT1cImJ1dHRvblwiIHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIj5Eb3dubG9hZCBleHRlbnNpb248L2E+XG4gICAgICAgICAgPGEgb25DbGljaz17dGhpcy5oYW5kbGVSZWZyZXNoQ2xpY2t9IHJvbGU9XCJidXR0b25cIj5SZWZyZXNoIHRvIGRldGVjdCBleHRlbnNpb248L2E+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5JbnN0YWxsRXh0ZW5zaW9uLnByb3BUeXBlcyA9IHtcbiAgY29udGV4dDogUHJvcFR5cGVzLmFueSwgLy8gVGhlIGFwcGxpY2F0aW9uIGNvbnRleHRcbn07XG5leHBvcnQgZGVmYXVsdCB3aXRoQXBwQ29udGV4dChJbnN0YWxsRXh0ZW5zaW9uKTtcbiIsIi8qKlxuICogUGFzc2JvbHQgfiBPcGVuIHNvdXJjZSBwYXNzd29yZCBtYW5hZ2VyIGZvciB0ZWFtc1xuICogQ29weXJpZ2h0IChjKSAyMDIwIFBhc3Nib2x0IFNBIChodHRwczovL3d3dy5wYXNzYm9sdC5jb20pXG4gKlxuICogTGljZW5zZWQgdW5kZXIgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIHZlcnNpb24gMyBvZiB0aGUgb3IgYW55IGxhdGVyIHZlcnNpb24uXG4gKiBGb3IgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSBzZWUgdGhlIExJQ0VOU0UudHh0XG4gKiBSZWRpc3RyaWJ1dGlvbnMgb2YgZmlsZXMgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UuXG4gKlxuICogQGNvcHlyaWdodCAgICAgQ29weXJpZ2h0IChjKSAyMDIwIFBhc3Nib2x0IFNBIChodHRwczovL3d3dy5wYXNzYm9sdC5jb20pXG4gKiBAbGljZW5zZSAgICAgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL0FHUEwtMy4wIEFHUEwgTGljZW5zZVxuICogQGxpbmsgICAgICAgICAgaHR0cHM6Ly93d3cucGFzc2JvbHQuY29tIFBhc3Nib2x0KHRtKVxuICogQHNpbmNlICAgICAgICAgMy4wLjBcbiAqL1xuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCBMb2FkaW5nU3Bpbm5lciBmcm9tIFwiLi4vLi4vLi4vLi4vcmVhY3QvY29tcG9uZW50cy9Db21tb24vTG9hZGluZy9Mb2FkaW5nU3Bpbm5lci9Mb2FkaW5nU3Bpbm5lclwiO1xuaW1wb3J0IHtBcGlTZXR1cENvbnRleHRTdGF0ZSwgd2l0aEFwaVNldHVwQ29udGV4dH0gZnJvbSBcIi4uLy4uLy4uL2NvbnRleHRzL0FwaVNldHVwQ29udGV4dFwiO1xuaW1wb3J0IEluc3RhbGxFeHRlbnNpb24gZnJvbSBcIi4uLy4uL0F1dGhlbnRpY2F0aW9uL0luc3RhbGxFeHRlbnNpb24vSW5zdGFsbEV4dGVuc2lvblwiO1xuaW1wb3J0IERpc3BsYXlCcm93c2VyTm90U3VwcG9ydGVkIGZyb20gXCIuLi8uLi9BdXRoZW50aWNhdGlvbi9EaXNwbGF5QnJvd3Nlck5vdFN1cHBvcnRlZC9EaXNwbGF5QnJvd3Nlck5vdFN1cHBvcnRlZFwiO1xuaW1wb3J0IENoZWNrTWFpbEJveCBmcm9tIFwiLi4vLi4vQXV0aGVudGljYXRpb24vQ2hlY2tNYWlsQm94L0NoZWNrTWFpbEJveFwiO1xuaW1wb3J0IERpc3BsYXlFcnJvciBmcm9tIFwiLi4vLi4vQXV0aGVudGljYXRpb24vRGlzcGxheUVycm9yL0Rpc3BsYXlFcnJvclwiO1xuXG4vKipcbiAqIFRoZSBjb21wb25lbnQgb3JjaGVzdHJhdGVzIHRoZSBhcGkgc2V0dXAgYXV0aGVudGljYXRpb24gd29ya2Zsb3cuXG4gKi9cbmNsYXNzIE9yY2hlc3RyYXRlQXBpU2V0dXAgZXh0ZW5kcyBDb21wb25lbnQge1xuICAvKipcbiAgICogV2hlbmV2ZXIgdGhlIGNvbXBvbmVudCBpcyBpbml0aWFsaXplZFxuICAgKi9cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5pbml0aWFsaXplU2V0dXAoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSBzZXR1cC5cbiAgICovXG4gIGluaXRpYWxpemVTZXR1cCgpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucHJvcHMuYXBpU2V0dXBDb250ZXh0Lm9uSW5pdGlhbGl6ZVNldHVwUmVxdWVzdGVkKCksIDEwMDApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbmRlciB0aGUgY29tcG9uZW50XG4gICAqIEByZXR1cm5zIHtKU1h9XG4gICAqL1xuICByZW5kZXIoKSB7XG4gICAgc3dpdGNoICh0aGlzLnByb3BzLmFwaVNldHVwQ29udGV4dC5zdGF0ZSkge1xuICAgICAgY2FzZSBBcGlTZXR1cENvbnRleHRTdGF0ZS5JTlNUQUxMX0VYVEVOU0lPTl9TVEFURTpcbiAgICAgICAgcmV0dXJuIDxJbnN0YWxsRXh0ZW5zaW9uLz47XG4gICAgICBjYXNlIEFwaVNldHVwQ29udGV4dFN0YXRlLkRPV05MT0FEX1NVUFBPUlRFRF9CUk9XU0VSX1NUQVRFOlxuICAgICAgICByZXR1cm4gPERpc3BsYXlCcm93c2VyTm90U3VwcG9ydGVkLz47XG4gICAgICBjYXNlIEFwaVNldHVwQ29udGV4dFN0YXRlLkNIRUNLX01BSUxCT1hfU1RBVEU6XG4gICAgICAgIHJldHVybiA8Q2hlY2tNYWlsQm94Lz47XG4gICAgICBjYXNlIEFwaVNldHVwQ29udGV4dFN0YXRlLkVSUk9SX1NUQVRFOlxuICAgICAgICByZXR1cm4gPERpc3BsYXlFcnJvci8+O1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIDxMb2FkaW5nU3Bpbm5lci8+O1xuICAgIH1cbiAgfVxufVxuXG5PcmNoZXN0cmF0ZUFwaVNldHVwLnByb3BUeXBlcyA9IHtcbiAgYXBpU2V0dXBDb250ZXh0OiBQcm9wVHlwZXMub2JqZWN0LCAvLyBUaGUgYXBpIHNldHVwIGNvbnRleHRcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhBcGlTZXR1cENvbnRleHQoT3JjaGVzdHJhdGVBcGlTZXR1cCk7XG4iLCIvKipcbiAqIFBhc3Nib2x0IH4gT3BlbiBzb3VyY2UgcGFzc3dvcmQgbWFuYWdlciBmb3IgdGVhbXNcbiAqIENvcHlyaWdodCAoYykgMjAyMCBQYXNzYm9sdCBTQSAoaHR0cHM6Ly93d3cucGFzc2JvbHQuY29tKVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSB2ZXJzaW9uIDMgb2YgdGhlIG9yIGFueSBsYXRlciB2ZXJzaW9uLlxuICogRm9yIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2Ugc2VlIHRoZSBMSUNFTlNFLnR4dFxuICogUmVkaXN0cmlidXRpb25zIG9mIGZpbGVzIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLlxuICpcbiAqIEBjb3B5cmlnaHQgICAgIENvcHlyaWdodCAoYykgMjAyMCBQYXNzYm9sdCBTQSAoaHR0cHM6Ly93d3cucGFzc2JvbHQuY29tKVxuICogQGxpY2Vuc2UgICAgICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9BR1BMLTMuMCBBR1BMIExpY2Vuc2VcbiAqIEBsaW5rICAgICAgICAgIGh0dHBzOi8vd3d3LnBhc3Nib2x0LmNvbSBQYXNzYm9sdCh0bSlcbiAqIEBzaW5jZSAgICAgICAgIDMuMC4wXG4gKi9cbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCB7d2l0aEFwcENvbnRleHR9IGZyb20gXCIuL0FwcENvbnRleHRcIjtcbmltcG9ydCB7QXBpQ2xpZW50fSBmcm9tIFwiLi4vbGliL2FwaUNsaWVudC9hcGlDbGllbnRcIjtcbmltcG9ydCB7QlJPV1NFUl9OQU1FUywgZGV0ZWN0QnJvd3Nlck5hbWV9IGZyb20gXCIuLi9saWIvQnJvd3Nlci9kZXRlY3RCcm93c2VyTmFtZVwiO1xuaW1wb3J0IFBhc3Nib2x0QXBpRmV0Y2hFcnJvciBmcm9tIFwiLi4vbGliL0Vycm9yL3Bhc3Nib2x0QXBpRmV0Y2hFcnJvclwiO1xuaW1wb3J0IGdldFByb3BWYWx1ZSBmcm9tIFwiLi4vbGliL0NvbW1vbi9PYmplY3QvZ2V0UHJvcFZhbHVlXCI7XG5cbi8qKlxuICogVGhlIEFwaSBzZXR1cCBjb250ZXh0LlxuICogQHR5cGUge1JlYWN0LkNvbnRleHQ8b2JqZWN0Pn1cbiAqL1xuZXhwb3J0IGNvbnN0IEFwaVNldHVwQ29udGV4dCA9IFJlYWN0LmNyZWF0ZUNvbnRleHQoe1xuICB1c2VySWQ6IG51bGwsIC8vIFRoZSBzZXR1cCB1c2VyIGlkXG4gIHRva2VuOiBudWxsLCAvLyBUaGUgc2V0dXAgdG9rZW5cbiAgc3RhdGU6IG51bGwsIC8vIFRoZSBjdXJyZW50IHNldHVwIHdvcmtmbG93IHN0YXRlXG4gIC8vIFdoZW5ldmVyIHRoZSBpbml0aWFsaXphdGlvbiBvZiB0aGUgc2V0dXAgaXMgcmVxdWVzdGVkLlxuICBvbkluaXRpYWxpemVTZXR1cFJlcXVlc3RlZDogKCkgPT4ge1xuICB9XG59KTtcblxuLyoqXG4gKiBUaGUgcmVsYXRlZCBjb250ZXh0IHByb3ZpZGVyXG4gKi9cbmNsYXNzIEFwaVNldHVwQ29udGV4dFByb3ZpZGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERlZmF1bHQgY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHByb3BzIFRoZSBjb21wb25lbnQgcHJvcHNcbiAgICovXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSBPYmplY3QuYXNzaWduKHRoaXMuZGVmYXVsdFN0YXRlLCBwcm9wcy52YWx1ZSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBjb21wb25lbnQgc3RhdGVcbiAgICovXG4gIGdldCBkZWZhdWx0U3RhdGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVzZXJJZDogbnVsbCxcbiAgICAgIHRva2VuOiBudWxsLFxuICAgICAgc3RhdGU6IEFwaVNldHVwQ29udGV4dFN0YXRlLklOSVRJQUxfU1RBVEUsXG4gICAgICBvbkluaXRpYWxpemVTZXR1cFJlcXVlc3RlZDogdGhpcy5vbkluaXRpYWxpemVTZXR1cFJlcXVlc3RlZC5iaW5kKHRoaXMpXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSBzZXR1cFxuICAgKiBAcmV0dXJuIHtQcm9taXNlPHZvaWQ+fVxuICAgKi9cbiAgYXN5bmMgb25Jbml0aWFsaXplU2V0dXBSZXF1ZXN0ZWQoKSB7XG4gICAgaWYgKCF0aGlzLnN0YXRlLnVzZXJJZCB8fCAhdGhpcy5zdGF0ZS50b2tlbikge1xuICAgICAgcmV0dXJuIHRoaXMuc2V0U3RhdGUoe3N0YXRlOiBBcGlTZXR1cENvbnRleHRTdGF0ZS5FUlJPUl9TVEFURX0pO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuaXNCcm93c2VyU3VwcG9ydGVkKCkpIHtcbiAgICAgIHJldHVybiB0aGlzLnNldFN0YXRlKHtzdGF0ZTogQXBpU2V0dXBDb250ZXh0U3RhdGUuRE9XTkxPQURfU1VQUE9SVEVEX0JST1dTRVJfU1RBVEV9KTtcbiAgICB9XG5cbiAgICBhd2FpdCB0aGlzLnZlcmlmeVNldHVwSW5mbygpXG4gICAgICAudGhlbih0aGlzLmhhbmRsZVNldHVwVmVyaWZ5U3VjY2Vzcy5iaW5kKHRoaXMpKVxuICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlU2V0dXBWZXJpZnlFcnJvci5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXaGVuIHRoZSBzZXR1cCBpbmZvIGFyZSB2YWxpZC5cbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIGhhbmRsZVNldHVwVmVyaWZ5U3VjY2VzcygpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtzdGF0ZTogQXBpU2V0dXBDb250ZXh0U3RhdGUuSU5TVEFMTF9FWFRFTlNJT05fU1RBVEV9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXaGVuIHRoZSBzZXR1cCBpbmZvIGRpZG4ndCB2YWxpZGF0ZVxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cbiAgaGFuZGxlU2V0dXBWZXJpZnlFcnJvcihlcnJvcikge1xuICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIFBhc3Nib2x0QXBpRmV0Y2hFcnJvcikge1xuICAgICAgY29uc3QgaXNUb2tlbkV4cGlyZWQgPSBnZXRQcm9wVmFsdWUoZXJyb3IsIFwiZGF0YS5ib2R5LnRva2VuLmV4cGlyZWRcIik7XG4gICAgICBpZiAoaXNUb2tlbkV4cGlyZWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0U3RhdGUoe3N0YXRlOiBBcGlTZXR1cENvbnRleHRTdGF0ZS5DSEVDS19NQUlMQk9YX1NUQVRFfSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnNldFN0YXRlKHtzdGF0ZTogQXBpU2V0dXBDb250ZXh0U3RhdGUuRVJST1JfU1RBVEV9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB0aGUgYnJvd3NlciBpcyBzdXBwb3J0ZWQuXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgaXNCcm93c2VyU3VwcG9ydGVkKCkge1xuICAgIGNvbnN0IGJyb3dzZXJOYW1lID0gZGV0ZWN0QnJvd3Nlck5hbWUoKTtcbiAgICBjb25zdCBzdXBwb3J0ZWRCcm93c2VyTmFtZXMgPSBbQlJPV1NFUl9OQU1FUy5DSFJPTUUsIEJST1dTRVJfTkFNRVMuRklSRUZPWF07XG4gICAgcmV0dXJuIHN1cHBvcnRlZEJyb3dzZXJOYW1lcy5pbmNsdWRlcyhicm93c2VyTmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogVmVyaWZ5IHRoZSBzZXR1cCBpbmZvcm1hdGlvbi5cbiAgICogQHJldHVybnMge1Byb21pc2U8b2JqZWN0Pn1cbiAgICovXG4gIGFzeW5jIHZlcmlmeVNldHVwSW5mbygpIHtcbiAgICBjb25zdCBhcGlDbGllbnRPcHRpb25zID0gdGhpcy5wcm9wcy5jb250ZXh0LmdldEFwaUNsaWVudE9wdGlvbnMoKTtcbiAgICBhcGlDbGllbnRPcHRpb25zLnNldFJlc291cmNlTmFtZShcInNldHVwXCIpO1xuICAgIGNvbnN0IGFwaUNsaWVudCA9IG5ldyBBcGlDbGllbnQoYXBpQ2xpZW50T3B0aW9ucyk7XG4gICAgY29uc3Qge2JvZHl9ID0gYXdhaXQgYXBpQ2xpZW50LmdldChgaW5zdGFsbC8ke3RoaXMuc3RhdGUudXNlcklkfS8ke3RoaXMuc3RhdGUudG9rZW59YCk7XG4gICAgcmV0dXJuIGJvZHk7XG4gIH1cblxuICAvKipcbiAgICogUmVuZGVyIHRoZSBjb21wb25lbnRcbiAgICogQHJldHVybnMge0pTWH1cbiAgICovXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPEFwaVNldHVwQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17dGhpcy5zdGF0ZX0+XG4gICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgPC9BcGlTZXR1cENvbnRleHQuUHJvdmlkZXI+XG4gICAgKTtcbiAgfVxufVxuXG5BcGlTZXR1cENvbnRleHRQcm92aWRlci5wcm9wVHlwZXMgPSB7XG4gIGNvbnRleHQ6IFByb3BUeXBlcy5hbnksIC8vIFRoZSBhcHBsaWNhdGlvbiBjb250ZXh0XG4gIHZhbHVlOiBQcm9wVHlwZXMuYW55LCAvLyBUaGUgaW5pdGlhbCB2YWx1ZSBvZiB0aGUgY29udGV4dFxuICBjaGlsZHJlbjogUHJvcFR5cGVzLmFueSAvLyBUaGUgY2hpbGRyZW4gY29tcG9uZW50c1xufTtcbmV4cG9ydCBkZWZhdWx0IHdpdGhBcHBDb250ZXh0KEFwaVNldHVwQ29udGV4dFByb3ZpZGVyKTtcblxuLyoqXG4gKiBBUEkgU2V0dXAgQ29udGV4dCBDb25zdW1lciBIT0NcbiAqIEBwYXJhbSBXcmFwcGVkQ29tcG9uZW50XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3aXRoQXBpU2V0dXBDb250ZXh0KFdyYXBwZWRDb21wb25lbnQpIHtcbiAgcmV0dXJuIGNsYXNzIHdpdGhBcGlTZXR1cENvbnRleHQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHJlbmRlcigpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxBcGlTZXR1cENvbnRleHQuQ29uc3VtZXI+XG4gICAgICAgICAge1xuICAgICAgICAgICAgY29udGV4dCA9PiA8V3JhcHBlZENvbXBvbmVudCBhcGlTZXR1cENvbnRleHQ9e2NvbnRleHR9IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICAgIH1cbiAgICAgICAgPC9BcGlTZXR1cENvbnRleHQuQ29uc3VtZXI+XG4gICAgICApO1xuICAgIH1cbiAgfTtcbn1cblxuLyoqXG4gKiBUaGUgc2V0dXAgdHlwZXMgb2Ygc3RhdGVcbiAqL1xuZXhwb3J0IGNvbnN0IEFwaVNldHVwQ29udGV4dFN0YXRlID0ge1xuICBJTklUSUFMX1NUQVRFOiAnSW5pdGlhbCBTdGF0ZScsXG4gIElOU1RBTExfRVhURU5TSU9OX1NUQVRFOiAnSW5zdGFsbCBleHRlbnNpb24nLFxuICBET1dOTE9BRF9TVVBQT1JURURfQlJPV1NFUl9TVEFURTogJ0Rvd25sb2FkIHN1cHBvcnRlZCBicm93c2VyJyxcbiAgQ0hFQ0tfTUFJTEJPWF9TVEFURTogJ0NoZWNrIG1haWxib3gnLFxuICBFUlJPUl9TVEFURTogJ0Vycm9yJyxcbn07XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbmNvbnN0IEFwcENvbnRleHQgPSAgUmVhY3QuY3JlYXRlQ29udGV4dCh7XG4gIHVzZXI6IG51bGwsXG4gIHVzZXJzOiBudWxsLFxuICByb2xlczogbnVsbCxcbiAgcmVtZW1iZXJNZU9wdGlvbnM6IHt9LFxuICByZXNvdXJjZXM6IG51bGwsXG4gIHJlc291cmNlOiBudWxsLFxuICBzaGFyZVJlc291cmNlczogbnVsbCxcbiAgc2VsZWN0ZWRSZXNvdXJjZXM6IG51bGwsXG4gIHNlbGVjdGVkVXNlcjogbnVsbCxcbiAgZm9sZGVyczogbnVsbCxcbiAgcmVzb3VyY2VDb21tZW50SWQ6IG51bGwsXG4gIG11c3RSZWZyZXNoQ29tbWVudHM6IGZhbHNlLFxuICBzaXRlU2V0dGluZ3M6IG51bGwsXG4gIHVzZXJTZXR0aW5nczogbnVsbCxcbn0pO1xuXG5cbi8qKlxuICogQXBwIENvbnRleHQgQ29uc3VtZXIgSE9DXG4gKiBAcGFyYW0gV3JhcHBlZENvbXBvbmVudFxuICovXG5leHBvcnQgZnVuY3Rpb24gd2l0aEFwcENvbnRleHQoV3JhcHBlZENvbXBvbmVudCkge1xuICByZXR1cm4gY2xhc3Mgd2l0aEFwcENvbnRleHQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHJlbmRlcigpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxBcHBDb250ZXh0LkNvbnN1bWVyPlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIEFwcENvbnRleHQgPT4gPFdyYXBwZWRDb21wb25lbnQgY29udGV4dD17QXBwQ29udGV4dH0gey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICAgfVxuICAgICAgICA8L0FwcENvbnRleHQuQ29uc3VtZXI+XG4gICAgICApO1xuICAgIH1cbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBwQ29udGV4dDtcbiIsIi8qKlxuICogUGFzc2JvbHQgfiBPcGVuIHNvdXJjZSBwYXNzd29yZCBtYW5hZ2VyIGZvciB0ZWFtc1xuICogQ29weXJpZ2h0IChjKSAyMDIwIFBhc3Nib2x0IFNBIChodHRwczovL3d3dy5wYXNzYm9sdC5jb20pXG4gKlxuICogTGljZW5zZWQgdW5kZXIgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIHZlcnNpb24gMyBvZiB0aGUgb3IgYW55IGxhdGVyIHZlcnNpb24uXG4gKiBGb3IgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSBzZWUgdGhlIExJQ0VOU0UudHh0XG4gKiBSZWRpc3RyaWJ1dGlvbnMgb2YgZmlsZXMgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UuXG4gKlxuICogQGNvcHlyaWdodCAgICAgQ29weXJpZ2h0IChjKSAyMDIwIFBhc3Nib2x0IFNBIChodHRwczovL3d3dy5wYXNzYm9sdC5jb20pXG4gKiBAbGljZW5zZSAgICAgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL0FHUEwtMy4wIEFHUEwgTGljZW5zZVxuICogQGxpbmsgICAgICAgICAgaHR0cHM6Ly93d3cucGFzc2JvbHQuY29tIFBhc3Nib2x0KHRtKVxuICogQHNpbmNlICAgICAgICAgMy4wLjBcbiAqL1xuXG5leHBvcnQgY29uc3QgQlJPV1NFUl9OQU1FUyA9IHtcbiAgQ0hST01FOiBcImNocm9tZVwiLFxuICBFREdFOiBcImVkZ2VcIixcbiAgRklSRUZPWDogXCJmaXJlZm94XCIsXG4gIElOVEVSTkVUX0VYUExPUkVSOiBcImludGVybmV0LWV4cGxvcmVyXCIsXG4gIE9QRVJBOiBcIm9wZXJhXCIsXG4gIFNBRkFSSTogXCJzYWZhcmlcIixcbiAgU0FNU1VORzogXCJzYW1zdW5nXCIsXG4gIFVOS05PV046IFwidW5rbm93blwiLFxufTtcblxuLyoqXG4gKiBEZXRlY3QgdGhlIGJyb3dzZXIgbmFtZS5cbiAqIENvZGUgYmFzZWQgb246IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9XaW5kb3cvbmF2aWdhdG9yI0V4YW1wbGVfMV9Ccm93c2VyX2RldGVjdF9hbmRfcmV0dXJuX2Ffc3RyaW5nXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZGV0ZWN0QnJvd3Nlck5hbWUoKSB7XG4gIGNvbnN0IHVzZXJBZ2VudCA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCk7XG4gIGxldCBicm93c2VyTmFtZTtcblxuICBpZiAodXNlckFnZW50LmluZGV4T2YoXCJmaXJlZm94XCIpID4gLTEpIHtcbiAgICBicm93c2VyTmFtZSA9IEJST1dTRVJfTkFNRVMuRklSRUZPWDtcbiAgICAvLyBcIk1vemlsbGEvNS4wIChYMTE7IFVidW50dTsgTGludXggeDg2XzY0OyBydjo2MS4wKSBHZWNrby8yMDEwMDEwMSBGaXJlZm94LzYxLjBcIlxuICB9IGVsc2UgaWYgKHVzZXJBZ2VudC5pbmRleE9mKFwic2Ftc3VuZ2Jyb3dzZXJcIikgPiAtMSkge1xuICAgIGJyb3dzZXJOYW1lID0gQlJPV1NFUl9OQU1FUy5TQU1TVU5HO1xuICAgIC8vIFwiTW96aWxsYS81LjAgKExpbnV4OyBBbmRyb2lkIDk7IFNBTVNVTkcgU00tRzk1NUYgQnVpbGQvUFBSMS4xODA2MTAuMDExKSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBTYW1zdW5nQnJvd3Nlci85LjQgQ2hyb21lLzY3LjAuMzM5Ni44NyBNb2JpbGUgU2FmYXJpLzUzNy4zNlxuICB9IGVsc2UgaWYgKHVzZXJBZ2VudC5pbmRleE9mKFwib3BlcmFcIikgPiAtMSB8fCB1c2VyQWdlbnQuaW5kZXhPZihcIm9wclwiKSA+IC0xKSB7XG4gICAgYnJvd3Nlck5hbWUgPSBCUk9XU0VSX05BTUVTLk9QRVJBO1xuICAgIC8vIFwiTW96aWxsYS81LjAgKE1hY2ludG9zaDsgSW50ZWwgTWFjIE9TIFggMTBfMTRfMCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzcwLjAuMzUzOC4xMDIgU2FmYXJpLzUzNy4zNiBPUFIvNTcuMC4zMDk4LjEwNlwiXG4gIH0gZWxzZSBpZiAodXNlckFnZW50LmluZGV4T2YoXCJ0cmlkZW50XCIpID4gLTEpIHtcbiAgICBicm93c2VyTmFtZSA9IEJST1dTRVJfTkFNRVMuSU5URVJORVRfRVhQTE9SRVI7XG4gICAgLy8gXCJNb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXT1c2NDsgVHJpZGVudC83LjA7IC5ORVQ0LjBDOyAuTkVUNC4wRTsgWm9vbSAzLjYuMDsgd2J4IDEuMC4wOyBydjoxMS4wKSBsaWtlIEdlY2tvXCJcbiAgfSBlbHNlIGlmICh1c2VyQWdlbnQuaW5kZXhPZihcImVkZ2VcIikgPiAtMSkge1xuICAgIGJyb3dzZXJOYW1lID0gQlJPV1NFUl9OQU1FUy5FREdFO1xuICAgIC8vIFwiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzU4LjAuMzAyOS4xMTAgU2FmYXJpLzUzNy4zNiBFZGdlLzE2LjE2Mjk5XCJcbiAgfSBlbHNlIGlmICh1c2VyQWdlbnQuaW5kZXhPZihcImNocm9tZVwiKSA+IC0xKSB7XG4gICAgYnJvd3Nlck5hbWUgPSBCUk9XU0VSX05BTUVTLkNIUk9NRTtcbiAgICAvLyBcIk1vemlsbGEvNS4wIChYMTE7IExpbnV4IHg4Nl82NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgVWJ1bnR1IENocm9taXVtLzY2LjAuMzM1OS4xODEgQ2hyb21lLzY2LjAuMzM1OS4xODEgU2FmYXJpLzUzNy4zNlwiXG4gIH0gZWxzZSBpZiAodXNlckFnZW50LmluZGV4T2YoXCJzYWZhcmlcIikgPiAtMSkge1xuICAgIGJyb3dzZXJOYW1lID0gQlJPV1NFUl9OQU1FUy5TQUZBUkk7XG4gICAgLy8gXCJNb3ppbGxhLzUuMCAoaVBob25lOyBDUFUgaVBob25lIE9TIDExXzQgbGlrZSBNYWMgT1MgWCkgQXBwbGVXZWJLaXQvNjA1LjEuMTUgKEtIVE1MLCBsaWtlIEdlY2tvKSBWZXJzaW9uLzExLjAgTW9iaWxlLzE1RTE0OCBTYWZhcmkvNjA0LjEgOTgweDEzMDZcIlxuICB9IGVsc2Uge1xuICAgIGJyb3dzZXJOYW1lID0gQlJPV1NFUl9OQU1FUy5VTktOT1dOO1xuICB9XG5cbiAgcmV0dXJuIGJyb3dzZXJOYW1lO1xufVxuIiwiLyoqXG4gKiBBcHBsaWNhdGlvbiBlcnJvclxuICpcbiAqIEBjb3B5cmlnaHQgKGMpIDIwMTkgUGFzc2JvbHQgU0FcbiAqIEBsaWNlbmNlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvYWdwbC0zLjAuZW4uaHRtbFxuICovXG5cbmNsYXNzIFBhc3Nib2x0QXBpRmV0Y2hFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IobWVzc2FnZSwgZGF0YSkge1xuICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgIHRoaXMubmFtZSA9ICdQYXNzYm9sdEFwaUZldGNoRXJyb3InO1xuICAgIHRoaXMuZGF0YSA9IGRhdGEgfHwge307XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGFzc2JvbHRBcGlGZXRjaEVycm9yO1xuIiwiLyoqXG4gKiBCYWQgcmVzcG9uc2VcbiAqXG4gKiBAY29weXJpZ2h0IChjKSAyMDE5IFBhc3Nib2x0IFNBXG4gKiBAbGljZW5jZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzL2FncGwtMy4wLmVuLmh0bWxcbiAqL1xuY2xhc3MgUGFzc2JvbHRCYWRSZXNwb25zZUVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihcIkFuIGludGVybmFsIGVycm9yIG9jY3VycmVkLiBUaGUgc2VydmVyIHJlc3BvbnNlIGNvdWxkIG5vdCBiZSBwYXJzZWQuIFBsZWFzZSBjb250YWN0IHlvdXIgYWRtaW5pc3RyYXRvci5cIik7XG4gICAgdGhpcy5uYW1lID0gJ1Bhc3Nib2x0QmFkUmVzcG9uc2VFcnJvcic7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGFzc2JvbHRCYWRSZXNwb25zZUVycm9yO1xuIiwiLyoqXG4gKiBOZXR3b3JrIGVycm9yXG4gKlxuICogQGNvcHlyaWdodCAoYykgMjAxOSBQYXNzYm9sdCBTQVxuICogQGxpY2VuY2UgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy9hZ3BsLTMuMC5lbi5odG1sXG4gKi9cblxuY2xhc3MgUGFzc2JvbHRTZXJ2aWNlVW5hdmFpbGFibGVFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IobWVzc2FnZSkge1xuICAgIG1lc3NhZ2UgPSBtZXNzYWdlIHx8IFwiVGhlIHNlcnZpY2UgaXMgdW5hdmFpbGFibGVcIjtcbiAgICBzdXBlcihtZXNzYWdlKTtcbiAgICB0aGlzLm5hbWUgPSAnUGFzc2JvbHRTZXJ2aWNlVW5hdmFpbGFibGVFcnJvcic7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGFzc2JvbHRTZXJ2aWNlVW5hdmFpbGFibGVFcnJvcjtcbiIsIi8qKlxuICogUGFzc2JvbHQgfiBPcGVuIHNvdXJjZSBwYXNzd29yZCBtYW5hZ2VyIGZvciB0ZWFtc1xuICogQ29weXJpZ2h0IChjKSBQYXNzYm9sdCBTQSAoaHR0cHM6Ly93d3cucGFzc2JvbHQuY29tKVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSB2ZXJzaW9uIDMgb2YgdGhlIG9yIGFueSBsYXRlciB2ZXJzaW9uLlxuICogRm9yIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2Ugc2VlIHRoZSBMSUNFTlNFLnR4dFxuICogUmVkaXN0cmlidXRpb25zIG9mIGZpbGVzIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLlxuICpcbiAqIEBjb3B5cmlnaHQgICAgIENvcHlyaWdodCAoYykgUGFzc2JvbHQgU0EgKGh0dHBzOi8vd3d3LnBhc3Nib2x0LmNvbSlcbiAqIEBsaWNlbnNlICAgICAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvQUdQTC0zLjAgQUdQTCBMaWNlbnNlXG4gKiBAbGluayAgICAgICAgICBodHRwczovL3d3dy5wYXNzYm9sdC5jb20gUGFzc2JvbHQodG0pXG4gKiBAc2luY2UgICAgICAgICAyLjEzLjBcbiAqL1xuaW1wb3J0IFBhc3Nib2x0QXBpRmV0Y2hFcnJvciBmcm9tIFwiLi4vRXJyb3IvcGFzc2JvbHRBcGlGZXRjaEVycm9yXCI7XG5pbXBvcnQgUGFzc2JvbHRCYWRSZXNwb25zZUVycm9yIGZyb20gXCIuLi9FcnJvci9wYXNzYm9sdEJhZFJlc3BvbnNlRXJyb3JcIjtcbmltcG9ydCBQYXNzYm9sdFNlcnZpY2VVbmF2YWlsYWJsZUVycm9yIGZyb20gXCIuLi9FcnJvci9wYXNzYm9sdFNlcnZpY2VVbmF2YWlsYWJsZUVycm9yXCI7XG5cbmV4cG9ydCBjbGFzcyBBcGlDbGllbnQge1xuICAvKipcbiAgICogQ29uc3RydWN0b3JcbiAgICpcbiAgICogQHBhcmFtIHtBcGlDbGllbnRPcHRpb25zfSBvcHRpb25zXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gaWYgYmFzZVVybCBpcyBlbXB0eSBvciBub3QgYSBzdHJpbmdcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuZ2V0QmFzZVVybCgpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcGlDbGllbnQgY29uc3RydWN0b3IgZXJyb3I6IGJhc2VVcmwgaXMgcmVxdWlyZWQuJyk7XG4gICAgfVxuICAgIGlmICghdGhpcy5vcHRpb25zLmdldFJlc291cmNlTmFtZSgpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcGlDbGllbnQgY29uc3RydWN0b3IgZXJyb3I6IHJlc291cmNlTmFtZSBpcyByZXF1aXJlZC4nKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIGxldCByYXdCYXNlVXJsID0gdGhpcy5vcHRpb25zLmdldEJhc2VVcmwoKS50b1N0cmluZygpO1xuICAgICAgaWYgKHJhd0Jhc2VVcmwuZW5kc1dpdGgoJy8nKSkge1xuICAgICAgICByYXdCYXNlVXJsID0gcmF3QmFzZVVybC5zbGljZSgwLCAtMSk7XG4gICAgICB9XG4gICAgICB0aGlzLmJhc2VVcmwgPSBgJHtyYXdCYXNlVXJsfS8ke3RoaXMub3B0aW9ucy5nZXRSZXNvdXJjZU5hbWUoKX1gO1xuICAgICAgdGhpcy5iYXNlVXJsID0gbmV3IFVSTCh0aGlzLmJhc2VVcmwpO1xuICAgIH0gY2F0Y2ggKHR5cGVFcnJvcikge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXBpQ2xpZW50IGNvbnN0cnVjdG9yIGVycm9yOiBiLicpO1xuICAgIH1cblxuICAgIHRoaXMuYXBpVmVyc2lvbiA9ICdhcGktdmVyc2lvbj12Mic7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMge09iamVjdH0gZmV0Y2hPcHRpb25zLmhlYWRlcnNcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGdldERlZmF1bHRIZWFkZXJzKCkge1xuICAgIHJldHVybiB7XG4gICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMge09iamVjdH0gZmV0Y2hPcHRpb25zXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBidWlsZEZldGNoT3B0aW9ucygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICAgIGhlYWRlcnM6IHsuLi50aGlzLmdldERlZmF1bHRIZWFkZXJzKCksIC4uLnRoaXMub3B0aW9ucy5nZXRIZWFkZXJzKCl9XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIGEgcmVzb3VyY2UgYnkgaWRcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkIG1vc3QgbGlrZWx5IGEgdXVpZFxuICAgKiBAcGFyYW0ge09iamVjdH0gW3VybE9wdGlvbnNdIE9wdGlvbmFsIHVybCBwYXJhbWV0ZXJzIGZvciBleGFtcGxlIHtcImNvbnRhaW5bc29tZXRoaW5nXVwiOiBcIjFcIn1cbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBpZiBpZCBpcyBlbXB0eSBvciBub3QgYSBzdHJpbmdcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBpZiB1cmxPcHRpb25zIGtleSBvciB2YWx1ZXMgYXJlIG5vdCBhIHN0cmluZ1xuICAgKiBAdGhyb3dzIHtQYXNzYm9sdFNlcnZpY2VVbmF2YWlsYWJsZUVycm9yfSBpZiBzZXJ2aWNlIGlzIG5vdCByZWFjaGFibGVcbiAgICogQHRocm93cyB7UGFzc2JvbHRCYWRSZXNwb25zZUVycm9yfSBpZiBwYXNzYm9sdCBBUEkgcmVzcG9uZGVkIHdpdGggbm9uIHBhcnNhYmxlIEpTT05cbiAgICogQHRocm93cyB7UGFzc2JvbHRBcGlGZXRjaEVycm9yfSBpZiBwYXNzYm9sdCBBUEkgcmVzcG9uc2UgaXMgbm90IE9LIChub24gMnh4IHN0YXR1cylcbiAgICogQHJldHVybnMge1Byb21pc2U8Kj59XG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGFzeW5jIGdldChpZCwgdXJsT3B0aW9ucykge1xuICAgIHRoaXMuYXNzZXJ0VmFsaWRJZChpZCk7XG4gICAgY29uc3QgdXJsID0gdGhpcy5idWlsZFVybChgJHt0aGlzLmJhc2VVcmx9LyR7aWR9YCwgdXJsT3B0aW9ucyB8fCB7fSk7XG4gICAgcmV0dXJuIHRoaXMuZmV0Y2hBbmRIYW5kbGVSZXNwb25zZSgnR0VUJywgdXJsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGUgYSByZXNvdXJjZSBieSBpZFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgbW9zdCBsaWtlbHkgYSB1dWlkXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbYm9keV0gKHdpbGwgYmUgY29udmVydGVkIHRvIEphdmFTY3JpcHQgT2JqZWN0IE5vdGF0aW9uIChKU09OKSBzdHJpbmcpXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbdXJsT3B0aW9uc10gT3B0aW9uYWwgdXJsIHBhcmFtZXRlcnMgZm9yIGV4YW1wbGUge1wiY29udGFpbltzb21ldGhpbmddXCI6IFwiMVwifVxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtkcnlSdW5dIG9wdGlvbmFsLCBkZWZhdWx0IGZhbHNlLCBjaGVja3MgaWYgdGhlIHZhbGlkaXR5IG9mIHRoZSBvcGVyYXRpb24gcHJpb3IgcmVhbCBkZWxldGVcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBpZiBpZCBpcyBlbXB0eSBvciBub3QgYSBzdHJpbmdcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBpZiB1cmxPcHRpb25zIGtleSBvciB2YWx1ZXMgYXJlIG5vdCBhIHN0cmluZ1xuICAgKiBAdGhyb3dzIHtQYXNzYm9sdFNlcnZpY2VVbmF2YWlsYWJsZUVycm9yfSBpZiBzZXJ2aWNlIGlzIG5vdCByZWFjaGFibGVcbiAgICogQHRocm93cyB7UGFzc2JvbHRCYWRSZXNwb25zZUVycm9yfSBpZiBwYXNzYm9sdCBBUEkgcmVzcG9uZGVkIHdpdGggbm9uIHBhcnNhYmxlIEpTT05cbiAgICogQHRocm93cyB7UGFzc2JvbHRBcGlGZXRjaEVycm9yfSBpZiBwYXNzYm9sdCBBUEkgcmVzcG9uc2UgaXMgbm90IE9LIChub24gMnh4IHN0YXR1cylcbiAgICogQHJldHVybnMge1Byb21pc2U8Kj59XG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGFzeW5jIGRlbGV0ZShpZCwgYm9keSwgdXJsT3B0aW9ucywgZHJ5UnVuKSB7XG4gICAgdGhpcy5hc3NlcnRWYWxpZElkKGlkKTtcbiAgICBsZXQgdXJsO1xuICAgIGlmICh0eXBlb2YgZHJ5UnVuID09PSAndW5kZWZpbmVkJykge1xuICAgICAgZHJ5UnVuID0gZmFsc2U7XG4gICAgfVxuICAgIGlmICghZHJ5UnVuKSB7XG4gICAgICB1cmwgPSB0aGlzLmJ1aWxkVXJsKGAke3RoaXMuYmFzZVVybH0vJHtpZH1gLCB1cmxPcHRpb25zIHx8IHt9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdXJsID0gdGhpcy5idWlsZFVybChgJHt0aGlzLmJhc2VVcmx9LyR7aWR9L2RyeS1ydW5gLCB1cmxPcHRpb25zIHx8IHt9KTtcbiAgICB9XG4gICAgbGV0IGJvZHlTdHJpbmcgPSBudWxsO1xuICAgIGlmIChib2R5KSB7XG4gICAgICBib2R5U3RyaW5nID0gdGhpcy5idWlsZEJvZHkoYm9keSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmZldGNoQW5kSGFuZGxlUmVzcG9uc2UoJ0RFTEVURScsIHVybCwgYm9keVN0cmluZyk7XG4gIH1cblxuICAvKipcbiAgICogRmluZCBhbGwgdGhlIHJlc291cmNlc1xuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gW3VybE9wdGlvbnNdIE9wdGlvbmFsIHVybCBwYXJhbWV0ZXJzIGZvciBleGFtcGxlIHtcImNvbnRhaW5bc29tZXRoaW5nXVwiOiBcIjFcIn1cbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBpZiB1cmxPcHRpb25zIGtleSBvciB2YWx1ZXMgYXJlIG5vdCBhIHN0cmluZ1xuICAgKiBAdGhyb3dzIHtQYXNzYm9sdFNlcnZpY2VVbmF2YWlsYWJsZUVycm9yfSBpZiBzZXJ2aWNlIGlzIG5vdCByZWFjaGFibGVcbiAgICogQHRocm93cyB7UGFzc2JvbHRCYWRSZXNwb25zZUVycm9yfSBpZiBwYXNzYm9sdCBBUEkgcmVzcG9uZGVkIHdpdGggbm9uIHBhcnNhYmxlIEpTT05cbiAgICogQHRocm93cyB7UGFzc2JvbHRBcGlGZXRjaEVycm9yfSBpZiBwYXNzYm9sdCBBUEkgcmVzcG9uc2UgaXMgbm90IE9LIChub24gMnh4IHN0YXR1cylcbiAgICogQHJldHVybnMge1Byb21pc2U8Kj59XG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGFzeW5jIGZpbmRBbGwodXJsT3B0aW9ucykge1xuICAgIGNvbnN0IHVybCA9IHRoaXMuYnVpbGRVcmwodGhpcy5iYXNlVXJsLnRvU3RyaW5nKCksIHVybE9wdGlvbnMgfHwge30pO1xuICAgIHJldHVybiBhd2FpdCB0aGlzLmZldGNoQW5kSGFuZGxlUmVzcG9uc2UoJ0dFVCcsIHVybCk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgcmVzb3VyY2VcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGJvZHkgKHdpbGwgYmUgY29udmVydGVkIHRvIEphdmFTY3JpcHQgT2JqZWN0IE5vdGF0aW9uIChKU09OKSBzdHJpbmcpXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbdXJsT3B0aW9uc10gT3B0aW9uYWwgdXJsIHBhcmFtZXRlcnMgZm9yIGV4YW1wbGUge1wiY29udGFpbltzb21ldGhpbmddXCI6IFwiMVwifVxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IGlmIGJvZHkgaXMgZW1wdHkgb3IgY2Fubm90IGNvbnZlcnRlZCB0byB2YWxpZCBKU09OIHN0cmluZ1xuICAgKiBAdGhyb3dzIHtQYXNzYm9sdFNlcnZpY2VVbmF2YWlsYWJsZUVycm9yfSBpZiBzZXJ2aWNlIGlzIG5vdCByZWFjaGFibGVcbiAgICogQHRocm93cyB7UGFzc2JvbHRCYWRSZXNwb25zZUVycm9yfSBpZiBwYXNzYm9sdCBBUEkgcmVzcG9uZGVkIHdpdGggbm9uIHBhcnNhYmxlIEpTT05cbiAgICogQHRocm93cyB7UGFzc2JvbHRBcGlGZXRjaEVycm9yfSBpZiBwYXNzYm9sdCBBUEkgcmVzcG9uc2UgaXMgbm90IE9LIChub24gMnh4IHN0YXR1cylcbiAgICogQHJldHVybnMge1Byb21pc2U8Kj59XG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGFzeW5jIGNyZWF0ZShib2R5LCB1cmxPcHRpb25zKSB7XG4gICAgY29uc3QgdXJsID0gdGhpcy5idWlsZFVybCh0aGlzLmJhc2VVcmwudG9TdHJpbmcoKSwgdXJsT3B0aW9ucyB8fCB7fSk7XG4gICAgY29uc3QgYm9keVN0cmluZyA9IHRoaXMuYnVpbGRCb2R5KGJvZHkpO1xuICAgIHJldHVybiB0aGlzLmZldGNoQW5kSGFuZGxlUmVzcG9uc2UoJ1BPU1QnLCB1cmwsIGJvZHlTdHJpbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBhIHJlc291cmNlXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZCBtb3N0IGxpa2VseSBhIHV1aWRcbiAgICogQHBhcmFtIHtPYmplY3R9IGJvZHkgKHdpbGwgYmUgY29udmVydGVkIHRvIEphdmFTY3JpcHQgT2JqZWN0IE5vdGF0aW9uIChKU09OKSBzdHJpbmcpXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbdXJsT3B0aW9uc10gT3B0aW9uYWwgdXJsIHBhcmFtZXRlcnMgZm9yIGV4YW1wbGUge1wiY29udGFpbltzb21ldGhpbmddXCI6IFwiMVwifVxuICAgKiBAcGFyYW0ge0Jvb2xlYW4/fSBbZHJ5UnVuXSBvcHRpb25hbCwgZGVmYXVsdCBmYWxzZSwgY2hlY2tzIGlmIHRoZSB2YWxpZGl0eSBvZiB0aGUgb3BlcmF0aW9uIHByaW9yIHJlYWwgdXBkYXRlXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gaWYgaWQgaXMgZW1wdHkgb3Igbm90IGEgc3RyaW5nXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gaWYgYm9keSBpcyBlbXB0eSBvciBjYW5ub3QgY29udmVydGVkIHRvIHZhbGlkIEpTT04gc3RyaW5nXG4gICAqIEB0aHJvd3Mge1Bhc3Nib2x0U2VydmljZVVuYXZhaWxhYmxlRXJyb3J9IGlmIHNlcnZpY2UgaXMgbm90IHJlYWNoYWJsZVxuICAgKiBAdGhyb3dzIHtQYXNzYm9sdEJhZFJlc3BvbnNlRXJyb3J9IGlmIHBhc3Nib2x0IEFQSSByZXNwb25kZWQgd2l0aCBub24gcGFyc2FibGUgSlNPTlxuICAgKiBAdGhyb3dzIHtQYXNzYm9sdEFwaUZldGNoRXJyb3J9IGlmIHBhc3Nib2x0IEFQSSByZXNwb25zZSBpcyBub3QgT0sgKG5vbiAyeHggc3RhdHVzKVxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTwqPn1cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgYXN5bmMgdXBkYXRlKGlkLCBib2R5LCB1cmxPcHRpb25zLCBkcnlSdW4pIHtcbiAgICB0aGlzLmFzc2VydFZhbGlkSWQoaWQpO1xuICAgIGxldCB1cmw7XG4gICAgaWYgKHR5cGVvZiBkcnlSdW4gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBkcnlSdW4gPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKCFkcnlSdW4pIHtcbiAgICAgIHVybCA9IHRoaXMuYnVpbGRVcmwoYCR7dGhpcy5iYXNlVXJsfS8ke2lkfWAsIHVybE9wdGlvbnMgfHwge30pO1xuICAgIH0gZWxzZSB7XG4gICAgICB1cmwgPSB0aGlzLmJ1aWxkVXJsKGAke3RoaXMuYmFzZVVybH0vJHtpZH0vZHJ5LXJ1bmAsIHVybE9wdGlvbnMgfHwge30pO1xuICAgIH1cbiAgICBsZXQgYm9keVN0cmluZyA9IG51bGw7XG4gICAgaWYgKGJvZHkpIHtcbiAgICAgIGJvZHlTdHJpbmcgPSB0aGlzLmJ1aWxkQm9keShib2R5KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZmV0Y2hBbmRIYW5kbGVSZXNwb25zZSgnUFVUJywgdXJsLCBib2R5U3RyaW5nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBc3NlcnQgdGhhdCBhbiBpZCBpcyBhIHZhbGlkIG5vbiBlbXB0eSBzdHJpbmdcbiAgICpcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBpZiBpZCBpcyBlbXB0eSBvciBub3QgYSBzdHJpbmdcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGFzc2VydFZhbGlkSWQoaWQpIHtcbiAgICBpZiAoIWlkKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcGlDbGllbnQuYXNzZXJ0VmFsaWRJZCBlcnJvcjogaWQgY2Fubm90IGJlIGVtcHR5Jyk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgaWQgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcGlDbGllbnQuYXNzZXJ0VmFsaWRJZCBlcnJvcjogaWQgc2hvdWxkIGJlIGEgc3RyaW5nJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEB0aHJvdyBUeXBlRXJyb3JcbiAgICogQHBhcmFtIG1ldGhvZFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgYXNzZXJ0TWV0aG9kKG1ldGhvZCkge1xuICAgIGlmICh0eXBlb2YgbWV0aG9kICE9PSAnc3RyaW5nJykge1xuICAgICAgbmV3IFR5cGVFcnJvcignQXBpQ2xpZW50LmFzc2VydFZhbGlkTWV0aG9kIG1ldGhvZCBzaG91bGQgYmUgYSBzdHJpbmcuJyk7XG4gICAgfVxuICAgIGNvbnN0IHN1cHBvcnRlZE1ldGhvZHMgPSBbJ0dFVCcsICdQT1NUJywgJ1BVVCcsICdERUxFVEUnXTtcbiAgICBpZiAoc3VwcG9ydGVkTWV0aG9kcy5pbmRleE9mKG1ldGhvZCkgPCAwKSB7XG4gICAgICBuZXcgVHlwZUVycm9yKGBBcGlDbGllbnQuYXNzZXJ0VmFsaWRNZXRob2QgZXJyb3I6IG1ldGhvZCAke21ldGhvZH0gaXMgbm90IHN1cHBvcnRlZC5gKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVXJsIHBhcmFtdGVyIGFzc2VydGlvblxuICAgKiBAcGFyYW0geyp9IHVybFxuICAgKiBAdGhyb3cgVHlwZUVycm9yXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBhc3NlcnRVcmwodXJsKSB7XG4gICAgaWYgKCF1cmwpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FwbGlDbGllbnQuYXNzZXJ0VXJsIGVycm9yOiB1cmwgaXMgcmVxdWlyZWQuJyk7XG4gICAgfVxuICAgIGlmICghKHVybCBpbnN0YW5jZW9mIFVSTCkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FwbGlDbGllbnQuYXNzZXJ0VXJsIGVycm9yOiB1cmwgc2hvdWxkIGJlIGEgdmFsaWQgVVJMIG9iamVjdC4nKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQm9keSBwYXJhbWV0ZXIgYXNzZXJ0aW9uXG4gICAqIEBwYXJhbSBib2R5XG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gaWYgYm9keSBpcyBub3QgYSBzdHJpbmdcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGFzc2VydEJvZHkoYm9keSkge1xuICAgIGlmICh0eXBlb2YgYm9keSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIG5ldyBUeXBlRXJyb3IoYEFwaUNsaWVudC5hc3NlcnRCb2R5IGVycm9yOiBib2R5IHNob3VsZCBiZSBhIHN0cmluZy5gKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQnVpbGQgYm9keSBvYmplY3RcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGJvZHlcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBpZiBib2R5IGlzIGVtcHR5IG9yIGNhbm5vdCBjb252ZXJ0ZWQgdG8gdmFsaWQgSlNPTiBzdHJpbmdcbiAgICogQHJldHVybiB7c3RyaW5nfSBKYXZhU2NyaXB0IE9iamVjdCBOb3RhdGlvbiAoSlNPTikgc3RyaW5nXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGJ1aWxkQm9keShib2R5KSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGJvZHkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhIFVSTCBvYmplY3QgZnJvbSBzdHJpbmcgdXJsIGFuZCB0aGlzLmJhc2VVcmwgYW5kIHRoaXMuYXBpVmVyc2lvblxuICAgKiBPcHRpb25hbGx5IGFwcGVuZCB1cmxPcHRpb25zIHRvIHRoZSBVUkwgb2JqZWN0XG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfFVSTH0gdXJsXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbdXJsT3B0aW9uc10gT3B0aW9uYWwgdXJsIHBhcmFtZXRlcnMgZm9yIGV4YW1wbGUge1wiY29udGFpbltzb21ldGhpbmddXCI6IFwiMVwifVxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IGlmIHVybE9wdGlvbnMga2V5IG9yIHZhbHVlcyBhcmUgbm90IGEgc3RyaW5nXG4gICAqIEByZXR1cm5zIHtVUkx9XG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGJ1aWxkVXJsKHVybCwgdXJsT3B0aW9ucykge1xuICAgIGlmICh0eXBlb2YgdXJsICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXBpQ2xpZW50LmJ1aWxkVXJsIGVycm9yOiB1cmwgc2hvdWxkIGJlIGEgc3RyaW5nLicpO1xuICAgIH1cbiAgICBjb25zdCB1cmxPYmogPSBuZXcgVVJMKGAke3VybH0uanNvbj8ke3RoaXMuYXBpVmVyc2lvbn1gKTtcblxuICAgIHVybE9wdGlvbnMgPSB1cmxPcHRpb25zIHx8IHt9O1xuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHVybE9wdGlvbnMpKSB7XG4gICAgICBpZiAodHlwZW9mIGtleSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXBpQ2xpZW50LmJ1aWxkVXJsIGVycm9yOiB1cmxPcHRpb25zIGtleSBzaG91bGQgYmUgYSBzdHJpbmcuJyk7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAvLyBFeGFtcGxlIFwiZmlsdGVyW2hhcy10YWddXCI6IFwiPHN0cmluZz5cIlxuICAgICAgICB1cmxPYmouc2VhcmNoUGFyYW1zLmFwcGVuZChrZXksIHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEV4YW1wbGUgXCJmaWx0ZXJbaGFzLWlkXVtdXCI6IFwiPHV1aWQ+XCJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgdmFsdWUuZm9yRWFjaCh2ID0+IHtcbiAgICAgICAgICAgIHVybE9iai5zZWFyY2hQYXJhbXMuYXBwZW5kKGtleSwgdik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXBpQ2xpZW50LmJ1aWxkVXJsIGVycm9yOiB1cmxPcHRpb25zIHZhbHVlIHNob3VsZCBiZSBhIHN0cmluZyBvciBhcnJheS4nKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdXJsT2JqO1xuICB9XG5cbiAgLyoqXG4gICAqIGZldGNoQW5kSGFuZGxlUmVzcG9uc2VcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IG1ldGhvZCBleGFtcGxlICdHRVQnLCAnUE9TVCdcbiAgICogQHBhcmFtIHtVUkx9IHVybCBvYmplY3RcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtib2R5XSAob3B0aW9uYWwpXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gKG9wdGlvbmFsKSBtb3JlIGZldGNoIG9wdGlvbnNcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBpZiBtZXRob2QsIHVybCBhcmUgbm90IGRlZmluZWQgb3Igb2YgdGhlIHdyb25nIHR5cGVcbiAgICogQHRocm93cyB7UGFzc2JvbHRTZXJ2aWNlVW5hdmFpbGFibGVFcnJvcn0gaWYgc2VydmljZSBpcyBub3QgcmVhY2hhYmxlXG4gICAqIEB0aHJvd3Mge1Bhc3Nib2x0QmFkUmVzcG9uc2VFcnJvcn0gaWYgcGFzc2JvbHQgQVBJIHJlc3BvbmRlZCB3aXRoIG5vbiBwYXJzYWJsZSBKU09OXG4gICAqIEB0aHJvd3Mge1Bhc3Nib2x0QXBpRmV0Y2hFcnJvcn0gaWYgcGFzc2JvbHQgQVBJIHJlc3BvbnNlIGlzIG5vdCBPSyAobm9uIDJ4eCBzdGF0dXMpXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPCo+fVxuICAgKiBAcHVibGljXG4gICAqL1xuICBhc3luYyBmZXRjaEFuZEhhbmRsZVJlc3BvbnNlKG1ldGhvZCwgdXJsLCBib2R5LCBvcHRpb25zKSB7XG4gICAgdGhpcy5hc3NlcnRVcmwodXJsKTtcbiAgICB0aGlzLmFzc2VydE1ldGhvZChtZXRob2QpO1xuICAgIGlmIChib2R5KSB7XG4gICAgICB0aGlzLmFzc2VydEJvZHkoYm9keSk7XG4gICAgfVxuXG4gICAgbGV0IHJlc3BvbnNlLCByZXNwb25zZUpzb247XG4gICAgY29uc3QgZmV0Y2hPcHRpb25zID0gey4uLnRoaXMuYnVpbGRGZXRjaE9wdGlvbnMoKSwgLi4ub3B0aW9uc307XG4gICAgZmV0Y2hPcHRpb25zLm1ldGhvZCA9IG1ldGhvZDtcbiAgICBpZiAoYm9keSkge1xuICAgICAgZmV0Y2hPcHRpb25zLmJvZHkgPSBib2R5O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwudG9TdHJpbmcoKSwgZmV0Y2hPcHRpb25zKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgLy8gQ2F0Y2ggTmV0d29yayBlcnJvciBzdWNoIGFzIGNvbm5lY3Rpb24gbG9zdC5cbiAgICAgIHRocm93IG5ldyBQYXNzYm9sdFNlcnZpY2VVbmF2YWlsYWJsZUVycm9yKGVycm9yLm1lc3NhZ2UpO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICByZXNwb25zZUpzb24gPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIC8qXG4gICAgICAgKiBJZiB0aGUgcmVzcG9uc2UgY2Fubm90IGJlIHBhcnNlZCwgaXQncyBub3QgYSBQYXNzYm9sdCBBUEkgcmVzcG9uc2UuXG4gICAgICAgKiBJdCBjYW4gYmUgYSBmb3IgZXhhbXBsZSBhIHByb3h5IHRpbWVvdXQgZXJyb3IgKDUwNCkuXG4gICAgICAgKi9cbiAgICAgIHRocm93IG5ldyBQYXNzYm9sdEJhZFJlc3BvbnNlRXJyb3IoKTtcbiAgICB9XG5cbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gcmVzcG9uc2VKc29uLmhlYWRlci5tZXNzYWdlO1xuICAgICAgdGhyb3cgbmV3IFBhc3Nib2x0QXBpRmV0Y2hFcnJvcihtZXNzYWdlLCB7XG4gICAgICAgIGNvZGU6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgYm9keTogcmVzcG9uc2VKc29uLmJvZHlcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiByZXNwb25zZUpzb247XG4gIH1cbn1cbiIsIi8qKlxuICogUGFzc2JvbHQgfiBPcGVuIHNvdXJjZSBwYXNzd29yZCBtYW5hZ2VyIGZvciB0ZWFtc1xuICogQ29weXJpZ2h0IChjKSAyMDIwIFBhc3Nib2x0IFNBIChodHRwczovL3d3dy5wYXNzYm9sdC5jb20pXG4gKlxuICogTGljZW5zZWQgdW5kZXIgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIHZlcnNpb24gMyBvZiB0aGUgb3IgYW55IGxhdGVyIHZlcnNpb24uXG4gKiBGb3IgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSBzZWUgdGhlIExJQ0VOU0UudHh0XG4gKiBSZWRpc3RyaWJ1dGlvbnMgb2YgZmlsZXMgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UuXG4gKlxuICogQGNvcHlyaWdodCAgICAgQ29weXJpZ2h0IChjKSAyMDIwIFBhc3Nib2x0IFNBIChodHRwczovL3d3dy5wYXNzYm9sdC5jb20pXG4gKiBAbGljZW5zZSAgICAgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL0FHUEwtMy4wIEFHUEwgTGljZW5zZVxuICogQGxpbmsgICAgICAgICAgaHR0cHM6Ly93d3cucGFzc2JvbHQuY29tIFBhc3Nib2x0KHRtKVxuICovXG5pbXBvcnQge0NzcmZUb2tlbn0gZnJvbSBcIi4vY3NyZlRva2VuXCI7XG5cbmV4cG9ydCBjbGFzcyBBcGlDbGllbnRPcHRpb25zIHtcbiAgLyoqXG4gICAqIFNldCBiYXNlIHVybFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ3xVUkx9IGJhc2VVcmxcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBpZiBiYXNlVXJsIGlzIGVtcHR5LCBvciBub3QgYSBzdHJpbmcgb3IgdmFsaWQgVVJMXG4gICAqIEByZXR1cm5zIHtBcGlDbGllbnRPcHRpb25zfVxuICAgKiBAcHVibGljXG4gICAqL1xuICBzZXRCYXNlVXJsKGJhc2VVcmwpIHtcbiAgICBpZiAoIWJhc2VVcmwpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FwaUNsaWVudE9wdGlvbiBiYXNlVXJsIGlzIHJlcXVpcmVkLicpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGJhc2VVcmwgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLmJhc2VVcmwgPSBuZXcgVVJMKGJhc2VVcmwpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcGlDbGllbnRPcHRpb24gYmFzZVVybCBpcyBpbnZhbGlkLicpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoYmFzZVVybCBpbnN0YW5jZW9mIFVSTCkge1xuICAgICAgICB0aGlzLmJhc2VVcmwgPSBiYXNlVXJsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXBpQ2xpZW50T3B0aW9ucyBiYXNldXJsIHNob3VsZCBiZSBhIHN0cmluZyBvciBVUkwnKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogU2V0IENTUkYgVG9rZW5cbiAgICpcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBpZiBjc3JmVG9rZW4gaXMgZW1wdHkgb3Igbm90IGEgc3RyaW5nIG9yIENzcmZUb2tlbiBvYmplY3RcbiAgICogQHBhcmFtIHtzdHJpbmd8Q3NyZlRva2VufSBjc3JmVG9rZW5cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgc2V0Q3NyZlRva2VuKGNzcmZUb2tlbikge1xuICAgIGlmICghY3NyZlRva2VuKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcGlDbGllbnRPcHRpb24gY3NyZlRva2VuIGlzIHJlcXVpcmVkLicpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGNzcmZUb2tlbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMuY3NyZlRva2VuID0gbmV3IENzcmZUb2tlbihjc3JmVG9rZW4pO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoY3NyZlRva2VuIGluc3RhbmNlb2YgQ3NyZlRva2VuKSB7XG4gICAgICAgIHRoaXMuY3NyZlRva2VuID0gY3NyZlRva2VuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXBpQ2xpZW50T3B0aW9uIGNzcmZUb2tlbiBzaG91bGQgYmUgYSBzdHJpbmcgb3IgYSB2YWxpZCBDc3JmVG9rZW4uJyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgcmVzb3VyY2UgbmFtZVxuICAgKlxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IGlmIHJlc291cmNlTmFtZSBpcyBlbXB0eSwgb3Igbm90IGEgc3RyaW5nXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZXNvdXJjZU5hbWUgbmFtZVxuICAgKiBAcmV0dXJucyB7QXBpQ2xpZW50T3B0aW9uc31cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgc2V0UmVzb3VyY2VOYW1lKHJlc291cmNlTmFtZSkge1xuICAgIGlmICghcmVzb3VyY2VOYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcGlDbGllbnRPcHRpb25zLnNldFJlc291cmNlTmFtZSByZXNvdXJjZU5hbWUgaXMgcmVxdWlyZWQuJyk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgcmVzb3VyY2VOYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXBpQ2xpZW50T3B0aW9ucy5zZXRSZXNvdXJjZU5hbWUgcmVzb3VyY2VOYW1lIHNob3VsZCBiZSBhIHZhbGlkIHN0cmluZy4nKTtcbiAgICB9XG4gICAgdGhpcy5yZXNvdXJjZU5hbWUgPSByZXNvdXJjZU5hbWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMge1VSTH0gYmFzZVVybFxuICAgKiBAcHVibGljXG4gICAqL1xuICBnZXRCYXNlVXJsKCkge1xuICAgIHJldHVybiB0aGlzLmJhc2VVcmw7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMge3N0cmluZ30gcmVzb3VyY2VOYW1lXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGdldFJlc291cmNlTmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5yZXNvdXJjZU5hbWU7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcmVsZXZhbnQgY2xpZW50IG9wdGlvbnMgYXMgZmV0Y2ggb3B0aW9ucyBoZWFkZXJzXG4gICAqXG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgZ2V0SGVhZGVycygpIHtcbiAgICBpZiAodGhpcy5jc3JmVG9rZW4pIHtcbiAgICAgIHJldHVybiB0aGlzLmNzcmZUb2tlbi50b0ZldGNoSGVhZGVycygpO1xuICAgIH1cbiAgfVxufVxuIiwiLyoqXG4gKiBQYXNzYm9sdCB+IE9wZW4gc291cmNlIHBhc3N3b3JkIG1hbmFnZXIgZm9yIHRlYW1zXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgUGFzc2JvbHQgU0EgKGh0dHBzOi8vd3d3LnBhc3Nib2x0LmNvbSlcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgdmVyc2lvbiAzIG9mIHRoZSBvciBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqIEZvciBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHNlZSB0aGUgTElDRU5TRS50eHRcbiAqIFJlZGlzdHJpYnV0aW9ucyBvZiBmaWxlcyBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZS5cbiAqXG4gKiBAY29weXJpZ2h0ICAgICBDb3B5cmlnaHQgKGMpIDIwMjAgUGFzc2JvbHQgU0EgKGh0dHBzOi8vd3d3LnBhc3Nib2x0LmNvbSlcbiAqIEBsaWNlbnNlICAgICAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvQUdQTC0zLjAgQUdQTCBMaWNlbnNlXG4gKiBAbGluayAgICAgICAgICBodHRwczovL3d3dy5wYXNzYm9sdC5jb20gUGFzc2JvbHQodG0pXG4gKi9cbmV4cG9ydCBjbGFzcyBDc3JmVG9rZW4ge1xuICAvKipcbiAgICogQ3NyZlRva2VuIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0b2tlblxuICAgKi9cbiAgY29uc3RydWN0b3IodG9rZW4pIHtcbiAgICB0aGlzLnNldFRva2VuKHRva2VuKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWYWxpZGF0ZVxuICAgKlxuICAgKiBAcGFyYW0gdG9rZW5cbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBpZiB0b2tlbiBpcyBub3QgYSBzdHJpbmcgb3IgaXMgdW5kZWZpbmVkXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIHNldFRva2VuKHRva2VuKSB7XG4gICAgdGhpcy52YWxpZGF0ZSh0b2tlbik7XG4gICAgdGhpcy50b2tlbiA9IHRva2VuO1xuICB9XG5cbiAgLyoqXG4gICAqIFZhbGlkYXRlXG4gICAqXG4gICAqIEBwYXJhbSB0b2tlblxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IGlmIHRva2VuIGlzIG5vdCBhIHN0cmluZyBvciBpcyB1bmRlZmluZWRcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgdmFsaWRhdGUodG9rZW4pIHtcbiAgICBpZiAoIXRva2VuKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDU1JGIHRva2VuIGNhbm5vdCBiZSBlbXB0eS4nKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB0b2tlbiAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0NTUkYgdG9rZW4gc2hvdWxkIGJlIGEgc3RyaW5nLicpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB0b2tlbiBhcyBrZXkgdmFsdWUgaGVhZGVyXG4gICAqXG4gICAqIEByZXR1cm5zIHt7XCJYLUNTUkYtVG9rZW5cIjogc3RyaW5nfX1cbiAgICovXG4gIHRvRmV0Y2hIZWFkZXJzKCkge1xuICAgIHJldHVybiB7J1gtQ1NSRi1Ub2tlbic6IHRoaXMudG9rZW59O1xuICB9XG59XG4iLCIvKipcbiAqIFBhc3Nib2x0IH4gT3BlbiBzb3VyY2UgcGFzc3dvcmQgbWFuYWdlciBmb3IgdGVhbXNcbiAqIENvcHlyaWdodCAoYykgMjAyMCBQYXNzYm9sdCBTQSAoaHR0cHM6Ly93d3cucGFzc2JvbHQuY29tKVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSB2ZXJzaW9uIDMgb2YgdGhlIG9yIGFueSBsYXRlciB2ZXJzaW9uLlxuICogRm9yIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2Ugc2VlIHRoZSBMSUNFTlNFLnR4dFxuICogUmVkaXN0cmlidXRpb25zIG9mIGZpbGVzIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLlxuICpcbiAqIEBjb3B5cmlnaHQgICAgIENvcHlyaWdodCAoYykgMjAyMCBQYXNzYm9sdCBTQSAoaHR0cHM6Ly93d3cucGFzc2JvbHQuY29tKVxuICogQGxpY2Vuc2UgICAgICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9BR1BMLTMuMCBBR1BMIExpY2Vuc2VcbiAqIEBsaW5rICAgICAgICAgIGh0dHBzOi8vd3d3LnBhc3Nib2x0LmNvbSBQYXNzYm9sdCh0bSlcbiAqIEBzaW5jZSAgICAgICAgIDIuMTMuMFxuICovXG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5cbi8qKlxuICogVGhpcyBjb21wb25lbnQgZGlzcGxheXMgYSB3YWl0aW5nIGxvYWRpbmcgc3Bpbm5lclxuICovXG5jbGFzcyBMb2FkaW5nU3Bpbm5lciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBSZW5kZXIgdGhlIGNvbXBvbmVudFxuICAgKi9cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByb2Nlc3Npbmctd3JhcHBlclwiPlxuICAgICAgICAgIDxkaXYgIGNsYXNzTmFtZT1cInByb2Nlc3NpbmctdGV4dFwiPlxuICAgICAgICAgICAge3RoaXMucHJvcHMudGl0bGUgJiZcbiAgICAgICAgICAgICAgPGgyPlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLnRpdGxlfVxuICAgICAgICAgICAgICA8L2gyPlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgPGgyPlxuICAgICAgICAgICAgICBQbGVhc2Ugd2FpdC4uLlxuICAgICAgICAgICAgPC9oMj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8Lz5cbiAgICApO1xuICB9XG59XG5cbkxvYWRpbmdTcGlubmVyLnByb3BUeXBlcyA9IHtcbiAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcsIC8vIEEgY3VzdG9tIHN0cmluZ1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTG9hZGluZ1NwaW5uZXI7XG5cbiIsImV4cG9ydCBkZWZhdWx0IChvYmosIGtleSkgPT4ga2V5LnNwbGl0KCcuJylcbiAgLnJlZHVjZSgoYWNjdW11bGF0b3IsIHgpID0+XG4gICAgYWNjdW11bGF0b3IgPT09IHVuZGVmaW5lZCA/IGFjY3VtdWxhdG9yIDogYWNjdW11bGF0b3JbeF1cbiAgLCBvYmopO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==