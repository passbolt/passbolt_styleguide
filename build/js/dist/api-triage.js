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
/******/ 		"api-triage": 0
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
/******/ 	deferredModules.push(["./src/react-extension/ApiTriage.entry.js","api-vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/react-extension/ApiTriage.entry.js":
/*!************************************************!*\
  !*** ./src/react-extension/ApiTriage.entry.js ***!
  \************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ApiTriage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ApiTriage */ "./src/react-extension/ApiTriage.js");
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
 * Entry point - Triage application served by the API.
 * This entry point will be used to compile the production code see webpack-api.config.js
 */

var appDomElement = document.createElement("div");
document.body.appendChild(appDomElement);
react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ApiTriage__WEBPACK_IMPORTED_MODULE_2__["default"], null), appDomElement);

/***/ }),

/***/ "./src/react-extension/ApiTriage.js":
/*!******************************************!*\
  !*** ./src/react-extension/ApiTriage.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _contexts_AppContext__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./contexts/AppContext */ "./src/react-extension/contexts/AppContext.js");
/* harmony import */ var _lib_apiClient_apiClientOptions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./lib/apiClient/apiClientOptions */ "./src/react-extension/lib/apiClient/apiClientOptions.js");
/* harmony import */ var _contexts_ApiTriageContext__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./contexts/ApiTriageContext */ "./src/react-extension/contexts/ApiTriageContext.js");
/* harmony import */ var _components_AuthenticationLogin_OrchestrateApiTriage_OrchestrateApiTriage__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/AuthenticationLogin/OrchestrateApiTriage/OrchestrateApiTriage */ "./src/react-extension/components/AuthenticationLogin/OrchestrateApiTriage/OrchestrateApiTriage.js");
/* harmony import */ var _lib_apiClient_apiClient__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./lib/apiClient/apiClient */ "./src/react-extension/lib/apiClient/apiClient.js");
/* harmony import */ var _lib_Settings_SiteSettings__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./lib/Settings/SiteSettings */ "./src/react-extension/lib/Settings/SiteSettings.js");
/* harmony import */ var _components_Footer_Footer__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/Footer/Footer */ "./src/react-extension/components/Footer/Footer.js");








function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(this, result); }; }

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
 * The triage application served by the API.
 */

var ApiTriage = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(ApiTriage, _Component);

  var _super = _createSuper(ApiTriage);

  /**
   * Default constructor
   * @param props The component props
   */
  function ApiTriage(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, ApiTriage);

    _this = _super.call(this, props);
    _this.state = _this.defaultState;
    return _this;
  }
  /**
   * Returns the component default state
   * @return {object}
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(ApiTriage, [{
    key: "componentDidMount",

    /**
     * ComponentDidMount
     * Invoked immediately after component is inserted into the tree
     * @return {void}
     */
    value: function componentDidMount() {
      this.getSiteSettings();
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
      return new _lib_apiClient_apiClientOptions__WEBPACK_IMPORTED_MODULE_9__["ApiClientOptions"]().setBaseUrl(this.state.trustedDomain).setCsrfToken(this.getCsrfToken());
    }
    /**
     * Get csrf token
     * @returns {string}
     */

  }, {
    key: "getCsrfToken",
    value: function getCsrfToken() {
      return document.cookie.split('; ').find(function (row) {
        return row.startsWith('csrfToken');
      }).split('=')[1];
    }
    /**
     * Retrieve the site settings
     * @returns {Promise<SiteSettings>}
     */

  }, {
    key: "getSiteSettings",
    value: function () {
      var _getSiteSettings = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var apiClientOptions, apiClient, _yield$apiClient$find, body, siteSettings;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                apiClientOptions = this.getApiClientOptions().setResourceName("settings");
                apiClient = new _lib_apiClient_apiClient__WEBPACK_IMPORTED_MODULE_12__["ApiClient"](apiClientOptions);
                _context.next = 4;
                return apiClient.findAll();

              case 4:
                _yield$apiClient$find = _context.sent;
                body = _yield$apiClient$find.body;
                siteSettings = new _lib_Settings_SiteSettings__WEBPACK_IMPORTED_MODULE_13__["default"](body);
                _context.next = 9;
                return this.setState({
                  siteSettings: siteSettings
                });

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getSiteSettings() {
        return _getSiteSettings.apply(this, arguments);
      }

      return getSiteSettings;
    }()
    /**
     * Render the component
     * @returns {JSX}
     */

  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_contexts_AppContext__WEBPACK_IMPORTED_MODULE_8__["default"].Provider, {
        value: this.state
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        id: "container",
        className: "container page login"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: "content"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: "header"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: "logo"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("span", {
        className: "visually-hidden"
      }, "Passbolt"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: "login-form"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_contexts_ApiTriageContext__WEBPACK_IMPORTED_MODULE_10__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_components_AuthenticationLogin_OrchestrateApiTriage_OrchestrateApiTriage__WEBPACK_IMPORTED_MODULE_11__["default"], null))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_components_Footer_Footer__WEBPACK_IMPORTED_MODULE_14__["default"], {
        siteSettings: this.state.siteSettings
      }));
    }
  }, {
    key: "defaultState",
    get: function get() {
      return {
        siteSettings: null,
        // The site settings
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

  return ApiTriage;
}(react__WEBPACK_IMPORTED_MODULE_7__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (ApiTriage);

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

/***/ "./src/react-extension/components/Authentication/EnterNameForm/EnterNameForm.js":
/*!**************************************************************************************!*\
  !*** ./src/react-extension/components/Authentication/EnterNameForm/EnterNameForm.js ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);
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
/* harmony import */ var _contexts_AppContext__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../contexts/AppContext */ "./src/react-extension/contexts/AppContext.js");
/* harmony import */ var _contexts_ApiTriageContext__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../contexts/ApiTriageContext */ "./src/react-extension/contexts/ApiTriageContext.js");
/* harmony import */ var _react_components_Common_Inputs_FormSubmitButton_FormSubmitButton__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../react/components/Common/Inputs/FormSubmitButton/FormSubmitButton */ "./src/react/components/Common/Inputs/FormSubmitButton/FormSubmitButton.js");









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






var EnterNameForm = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(EnterNameForm, _Component);

  var _super = _createSuper(EnterNameForm);

  /**
   * Constructor
   * @param {Object} props
   */
  function EnterNameForm(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default()(this, EnterNameForm);

    _this = _super.call(this, props);
    _this.state = _this.defaultState;

    _this.createInputRefs();

    _this.bindEventHandlers();

    return _this;
  }
  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default()(EnterNameForm, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.setState({
        loading: false
      }, function () {
        _this2.firstnameRef.current.focus();
      });
    }
    /**
     * Get default state
     * @returns {*}
     */

  }, {
    key: "bindEventHandlers",

    /**
     * Bind event handlers
     * @returns {void}
     */
    value: function bindEventHandlers() {
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleFormSubmit = this.handleFormSubmit.bind(this);
      this.handleFirstnameInputOnKeyUp = this.handleFirstnameInputOnKeyUp.bind(this);
      this.handleLastnameInputOnKeyUp = this.handleLastnameInputOnKeyUp.bind(this);
    }
    /**
     * Create references
     * @returns {void}
     */

  }, {
    key: "createInputRefs",
    value: function createInputRefs() {
      this.firstnameRef = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createRef();
      this.lastnameRef = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createRef();
    }
    /**
     * Handle form input changes.
     * @params {ReactEvent} The react event
     * @returns {void}
     */

  }, {
    key: "handleInputChange",
    value: function handleInputChange(event) {
      var target = event.target;
      var value = target.value;
      var name = target.name;
      this.setState(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()({}, name, value));
    }
    /**
     * Handle firstname input keyUp event.
     */

  }, {
    key: "handleFirstnameInputOnKeyUp",
    value: function handleFirstnameInputOnKeyUp() {
      if (this.state.hasAlreadyBeenValidated) {
        var state = this.validateFirstnameInput();
        this.setState(state);
      }
    }
    /**
     * Handle firstname input keyUp event.
     */

  }, {
    key: "handleLastnameInputOnKeyUp",
    value: function handleLastnameInputOnKeyUp() {
      if (this.state.hasAlreadyBeenValidated) {
        var state = this.validateLastnameInput();
        this.setState(state);
      }
    }
    /**
     * Handle form submit event.
     * @params {ReactEvent} The react event
     * @returns {void}
     */

  }, {
    key: "handleFormSubmit",
    value: function () {
      var _handleFormSubmit = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(event) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // Avoid the form to be submitted.
                event.preventDefault();
                _context.next = 3;
                return this.setState({
                  hasAlreadyBeenValidated: true
                });

              case 3:
                if (this.state.processing) {
                  _context.next = 15;
                  break;
                }

                _context.next = 6;
                return this.toggleProcessing();

              case 6:
                _context.next = 8;
                return this.validate();

              case 8:
                if (!this.hasValidationError()) {
                  _context.next = 13;
                  break;
                }

                _context.next = 11;
                return this.toggleProcessing();

              case 11:
                this.focusFirstFieldError();
                return _context.abrupt("return");

              case 13:
                _context.next = 15;
                return this.props.apiTriageContext.onRegistrationRequested(this.state.firstname, this.state.lastname);

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function handleFormSubmit(_x) {
        return _handleFormSubmit.apply(this, arguments);
      }

      return handleFormSubmit;
    }()
    /**
     * Toggle processing state
     * @returns {Promise<void>}
     */

  }, {
    key: "toggleProcessing",
    value: function () {
      var _toggleProcessing = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        var prev;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                prev = this.state.processing;
                return _context2.abrupt("return", this.setState({
                  processing: !prev
                }));

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function toggleProcessing() {
        return _toggleProcessing.apply(this, arguments);
      }

      return toggleProcessing;
    }()
    /**
     * Validate the form.
     * @returns {Promise<boolean>}
     */

  }, {
    key: "validate",
    value: function () {
      var _validate = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return Promise.all([this.validateFirstnameInput(), this.validateLastnameInput()]);

              case 2:
                return _context3.abrupt("return", this.hasValidationError());

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function validate() {
        return _validate.apply(this, arguments);
      }

      return validate;
    }()
    /**
     * Validate the firstname input.
     * @returns {Promise<void>}
     */

  }, {
    key: "validateFirstnameInput",
    value: function () {
      var _validateFirstnameInput = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4() {
        var firstnameError, firstname;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                firstnameError = null;
                firstname = this.state.firstname.trim();

                if (!firstname.length) {
                  firstnameError = "A first name is required.";
                }

                return _context4.abrupt("return", this.setState({
                  firstnameError: firstnameError
                }));

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function validateFirstnameInput() {
        return _validateFirstnameInput.apply(this, arguments);
      }

      return validateFirstnameInput;
    }()
    /**
     * Validate the firstname input.
     * @returns {Promise<void>}
     */

  }, {
    key: "validateLastnameInput",
    value: function () {
      var _validateLastnameInput = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee5() {
        var lastnameError, lastname;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                lastnameError = null;
                lastname = this.state.lastname.trim();

                if (!lastname.length) {
                  lastnameError = "A last name is required.";
                }

                return _context5.abrupt("return", this.setState({
                  lastnameError: lastnameError
                }));

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function validateLastnameInput() {
        return _validateLastnameInput.apply(this, arguments);
      }

      return validateLastnameInput;
    }()
    /**
     * Focus the first field of the form which is in error state.
     * @returns {void}
     */

  }, {
    key: "focusFirstFieldError",
    value: function focusFirstFieldError() {
      if (this.state.firstnameError) {
        this.firstnameRef.current.focus();
      } else if (this.state.lastnameError) {
        this.lastnameRef.current.focus();
      }
    }
    /**
     * Return true if the form has some validation error
     * @returns {boolean}
     */

  }, {
    key: "hasValidationError",
    value: function hasValidationError() {
      return this.state.firstnameError !== null || this.state.lastnameError !== null;
    }
    /**
     * Should input be disabled? True if state is loading or processing
     * @returns {boolean}
     */

  }, {
    key: "hasAllInputDisabled",
    value: function hasAllInputDisabled() {
      return this.state.processing || this.state.loading;
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: "enter-name"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("h1", null, "New here? Enter your email to get started."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("form", {
        acceptCharset: "utf-8",
        onSubmit: this.handleFormSubmit,
        noValidate: true
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: "input text required ".concat(this.state.firstnameError ? "error" : "")
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("label", {
        htmlFor: "firstname"
      }, "First Name"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("input", {
        id: "firstname-input",
        type: "text",
        name: "firstname",
        ref: this.firstnameRef,
        value: this.state.firstname,
        onKeyUp: this.handleFirstnameInputOnKeyUp,
        onChange: this.handleInputChange,
        disabled: this.hasAllInputDisabled(),
        placeholder: "first name",
        required: "required"
      }), this.state.firstnameError && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: "error-message"
      }, this.state.firstnameError)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: "input text required ".concat(this.state.lastnameError ? "error" : "")
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("label", {
        htmlFor: "lastname"
      }, "Last Name"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("input", {
        id: "lastname-input",
        type: "text",
        name: "lastname",
        ref: this.lastnameRef,
        value: this.state.lastname,
        onKeyUp: this.handleLastnameInputOnKeyUp,
        onChange: this.handleInputChange,
        disabled: this.hasAllInputDisabled(),
        placeholder: "last name",
        required: "required"
      }), this.state.lastnameError && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: "error-message"
      }, this.state.lastnameError)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: "form-actions"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_react_components_Common_Inputs_FormSubmitButton_FormSubmitButton__WEBPACK_IMPORTED_MODULE_12__["default"], {
        disabled: this.hasAllInputDisabled(),
        big: true,
        processing: this.state.processing,
        value: "Register"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("a", {
        href: "".concat(this.props.context.trustedDomain, "/auth/login")
      }, "I already have an account"))));
    }
  }, {
    key: "defaultState",
    get: function get() {
      return {
        loading: true,
        processing: false,
        firstname: "",
        firstnameError: null,
        lastname: "",
        lastnameError: null,
        hasAlreadyBeenValidated: false // True if the form has already been submitted once

      };
    }
  }]);

  return EnterNameForm;
}(react__WEBPACK_IMPORTED_MODULE_8__["Component"]);

EnterNameForm.propTypes = {
  apiTriageContext: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.object,
  // The api triage context
  context: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.any // The application context provider

};
/* harmony default export */ __webpack_exports__["default"] = (Object(_contexts_AppContext__WEBPACK_IMPORTED_MODULE_10__["withAppContext"])(Object(_contexts_ApiTriageContext__WEBPACK_IMPORTED_MODULE_11__["withApiTriageContext"])(EnterNameForm)));

/***/ }),

/***/ "./src/react-extension/components/Authentication/EnterUsernameForm/EnterUsernameForm.js":
/*!**********************************************************************************************!*\
  !*** ./src/react-extension/components/Authentication/EnterUsernameForm/EnterUsernameForm.js ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
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
/* harmony import */ var xregexp__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! xregexp */ "./node_modules/xregexp/lib/index.js");
/* harmony import */ var xregexp__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(xregexp__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _contexts_AppContext__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../contexts/AppContext */ "./src/react-extension/contexts/AppContext.js");
/* harmony import */ var _contexts_ApiTriageContext__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../contexts/ApiTriageContext */ "./src/react-extension/contexts/ApiTriageContext.js");
/* harmony import */ var _react_components_Common_Inputs_FormSubmitButton_FormSubmitButton__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../react/components/Common/Inputs/FormSubmitButton/FormSubmitButton */ "./src/react/components/Common/Inputs/FormSubmitButton/FormSubmitButton.js");









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







var EnterUsernameForm = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(EnterUsernameForm, _Component);

  var _super = _createSuper(EnterUsernameForm);

  /**
   * Constructor
   * @param {Object} props
   */
  function EnterUsernameForm(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default()(this, EnterUsernameForm);

    _this = _super.call(this, props);
    _this.state = _this.defaultState;

    _this.createInputRefs();

    _this.bindEventHandlers();

    return _this;
  }
  /**
   * Get default state
   * @returns {*}
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default()(EnterUsernameForm, [{
    key: "componentDidMount",

    /**
     * ComponentDidMount
     * Invoked immediately after component is inserted into the tree
     * @return {void}
     */
    value: function componentDidMount() {
      var _this2 = this;

      if (this.props.context.siteSettings !== null) {
        this.setState({
          loading: false
        }, function () {
          _this2.usernameRef.current.focus();
        });
      }
    }
    /**
     * componentDidUpdate
     * Invoked immediately after component is updated
     * @param {object} previousProps The previous props
     * @return {void}
     */

  }, {
    key: "componentDidUpdate",
    value: function () {
      var _componentDidUpdate = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee() {
        var _this3 = this;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // If the component is still marked as loading when the site settings are retrieved, mark it as loaded and put the focus on the username field
                if (this.state.loading && this.props.context.siteSettings !== null) {
                  this.setState({
                    loading: false
                  }, function () {
                    _this3.usernameRef.current.focus();
                  });
                }

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentDidUpdate() {
        return _componentDidUpdate.apply(this, arguments);
      }

      return componentDidUpdate;
    }()
    /**
     * Bind event handlers
     * @returns {void}
     */

  }, {
    key: "bindEventHandlers",
    value: function bindEventHandlers() {
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleFormSubmit = this.handleFormSubmit.bind(this);
      this.handleUsernameInputOnKeyUp = this.handleUsernameInputOnKeyUp.bind(this);
    }
    /**
     * Create references
     * @returns {void}
     */

  }, {
    key: "createInputRefs",
    value: function createInputRefs() {
      this.usernameRef = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createRef();
    }
    /**
     * Handle form input changes.
     * @params {ReactEvent} The react event
     * @returns {void}
     */

  }, {
    key: "handleInputChange",
    value: function handleInputChange(event) {
      var target = event.target;
      var value = target.type === "checkbox" ? target.checked : target.value;
      var name = target.name;
      this.setState(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, name, value));
    }
    /**
     * Handle username/email input keyUp event.
     */

  }, {
    key: "handleUsernameInputOnKeyUp",
    value: function handleUsernameInputOnKeyUp() {
      if (this.state.hasAlreadyBeenValidated) {
        var state = this.validateUsernameInput();
        this.setState(state);
      }
    }
    /**
     * Handle form submit event.
     * @params {ReactEvent} The react event
     * @returns {void}
     */

  }, {
    key: "handleFormSubmit",
    value: function () {
      var _handleFormSubmit = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee2(event) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                // Avoid the form to be submitted.
                event.preventDefault();
                _context2.next = 3;
                return this.setState({
                  hasAlreadyBeenValidated: true
                });

              case 3:
                if (this.state.processing) {
                  _context2.next = 13;
                  break;
                }

                _context2.next = 6;
                return this.toggleProcessing();

              case 6:
                _context2.next = 8;
                return this.validate();

              case 8:
                if (!this.hasValidationError()) {
                  _context2.next = 12;
                  break;
                }

                _context2.next = 11;
                return this.toggleProcessing();

              case 11:
                return _context2.abrupt("return");

              case 12:
                this.props.apiTriageContext.onTriageRequested(this.state.username);

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function handleFormSubmit(_x) {
        return _handleFormSubmit.apply(this, arguments);
      }

      return handleFormSubmit;
    }()
    /**
     * Toggle processing state
     * @returns {Promise<void>}
     */

  }, {
    key: "toggleProcessing",
    value: function () {
      var _toggleProcessing = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee3() {
        var prev;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                prev = this.state.processing;
                return _context3.abrupt("return", this.setState({
                  processing: !prev
                }));

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function toggleProcessing() {
        return _toggleProcessing.apply(this, arguments);
      }

      return toggleProcessing;
    }()
    /**
     * Validate the form.
     * @returns {Promise<boolean>}
     */

  }, {
    key: "validate",
    value: function () {
      var _validate = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee4() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return Promise.all([this.validateUsernameInput(), this.validateAgreedTerms()]);

              case 2:
                return _context4.abrupt("return", this.hasValidationError());

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function validate() {
        return _validate.apply(this, arguments);
      }

      return validate;
    }()
    /**
     * Validate the username input.
     * @returns {Promise<void>}
     */

  }, {
    key: "validateUsernameInput",
    value: function () {
      var _validateUsernameInput = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee5() {
        var usernameError, username;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                usernameError = null;
                username = this.state.username.trim();

                if (!username.length) {
                  usernameError = "A username is required.";
                } else if (!this.isEmail(username)) {
                  usernameError = "The username should be a valid username address.";
                }

                return _context5.abrupt("return", this.setState({
                  username: username,
                  usernameError: usernameError
                }));

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function validateUsernameInput() {
        return _validateUsernameInput.apply(this, arguments);
      }

      return validateUsernameInput;
    }()
    /**
     * Check that a username is a valid email
     * @param {string }username the username to test
     */

  }, {
    key: "isEmail",
    value: function isEmail(username) {
      var hostnameRegexp = "(?:[_\\p{L}0-9][-_\\p{L}0-9]*\\.)*(?:[\\p{L}0-9][-\\p{L}0-9]{0,62})\\.(?:(?:[a-z]{2}\\.)?[a-z]{2,})";
      var emailRegexp = "^[\\p{L}0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[\\p{L}0-9!#$%&'*+/=?^_`{|}~-]+)*@".concat(hostnameRegexp, "$");
      var xregexp = xregexp__WEBPACK_IMPORTED_MODULE_9___default()(emailRegexp);
      return xregexp.test(username);
    }
    /**
     * Validate the agreed terms checkbox.
     * @returns {Promise<void>}
     */

  }, {
    key: "validateAgreedTerms",
    value: function () {
      var _validateAgreedTerms = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee6() {
        var agreedTermsError, mustValidateTerms, agreedTerms;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                agreedTermsError = null;
                mustValidateTerms = this.privacyLink || this.termsLink;
                agreedTerms = this.state.agreedTerms;

                if (mustValidateTerms && !agreedTerms) {
                  agreedTermsError = "You have to accept it.";
                }

                return _context6.abrupt("return", this.setState({
                  agreedTermsError: agreedTermsError
                }));

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function validateAgreedTerms() {
        return _validateAgreedTerms.apply(this, arguments);
      }

      return validateAgreedTerms;
    }()
    /**
     * Return true if the form has some validation error
     * @returns {boolean}
     */

  }, {
    key: "hasValidationError",
    value: function hasValidationError() {
      return this.state.usernameError !== null || this.state.agreedTermsError !== null;
    }
    /**
     * Should input be disabled? True if state is loading or processing
     * @returns {boolean}
     */

  }, {
    key: "hasAllInputDisabled",
    value: function hasAllInputDisabled() {
      return this.state.processing || this.state.loading;
    }
    /**
     * Get the privacy link.
     * @returns {string|boolean} false if no privacy link
     */

  }, {
    key: "render",

    /**
     * Render
     * @returns {JSX.Element}
     */
    value: function render() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: "enter-username"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("h1", null, "Please enter your email to continue."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("form", {
        acceptCharset: "utf-8",
        onSubmit: this.handleFormSubmit,
        noValidate: true
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: "input text required ".concat(this.state.usernameError ? "error" : "")
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("label", {
        htmlFor: "username"
      }, "Email (username)"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("input", {
        id: "username-input",
        type: "text",
        ref: this.usernameRef,
        name: "username",
        value: this.state.username,
        onKeyUp: this.handleUsernameInputOnKeyUp,
        onChange: this.handleInputChange,
        placeholder: "you@organization.com",
        required: "required",
        disabled: this.hasAllInputDisabled()
      }), this.state.usernameError && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: "error-message"
      }, this.state.usernameError)), (this.privacyLink || this.termsLink) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: "input checkbox"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("input", {
        type: "checkbox",
        name: "agreedTerms",
        value: this.state.agreedTerms,
        onChange: this.handleInputChange,
        id: "checkbox-terms",
        disabled: this.hasAllInputDisabled()
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("label", {
        htmlFor: "checkbox-terms"
      }, (this.privacyLink || this.termsLink) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("span", null, "I accept the\xA0", this.termsLink && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("a", {
        href: this.termsLink,
        target: "_blank",
        rel: "noopener noreferrer"
      }, "terms"), this.termsLink && this.privacyLink && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("span", null, " and "), this.privacyLink && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("a", {
        href: this.privacyLink,
        target: "_blank",
        rel: "noopener noreferrer"
      }, "privacy policy"), ".")), this.state.agreedTermsError && !this.state.agreedTerms && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: "error-message"
      }, this.state.agreedTermsError)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: "form-actions"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_react_components_Common_Inputs_FormSubmitButton_FormSubmitButton__WEBPACK_IMPORTED_MODULE_13__["default"], {
        disabled: this.hasAllInputDisabled(),
        big: true,
        processing: this.state.processing,
        value: "Next"
      }))));
    }
  }, {
    key: "defaultState",
    get: function get() {
      return {
        loading: true,
        processing: false,
        username: "",
        usernameError: null,
        agreedTerms: false,
        agreedTermsError: null,
        hasAlreadyBeenValidated: false // True if the form has already been submitted once

      };
    }
  }, {
    key: "privacyLink",
    get: function get() {
      if (this.props.context.siteSettings) {
        return this.props.context.siteSettings.privacyLink;
      }

      return false;
    }
    /**
     * Get the terms link
     * @returns {string|boolean} false if no terms
     */

  }, {
    key: "termsLink",
    get: function get() {
      if (this.props.context.siteSettings) {
        return this.props.context.siteSettings.termsLink;
      }

      return false;
    }
  }]);

  return EnterUsernameForm;
}(react__WEBPACK_IMPORTED_MODULE_8__["Component"]);

EnterUsernameForm.propTypes = {
  apiTriageContext: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.object,
  // The api triage context
  context: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.any // The application context provider

};
/* harmony default export */ __webpack_exports__["default"] = (Object(_contexts_AppContext__WEBPACK_IMPORTED_MODULE_11__["withAppContext"])(Object(_contexts_ApiTriageContext__WEBPACK_IMPORTED_MODULE_12__["withApiTriageContext"])(EnterUsernameForm)));

/***/ }),

/***/ "./src/react-extension/components/AuthenticationLogin/OrchestrateApiTriage/OrchestrateApiTriage.js":
/*!*********************************************************************************************************!*\
  !*** ./src/react-extension/components/AuthenticationLogin/OrchestrateApiTriage/OrchestrateApiTriage.js ***!
  \*********************************************************************************************************/
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
/* harmony import */ var _contexts_ApiTriageContext__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../contexts/ApiTriageContext */ "./src/react-extension/contexts/ApiTriageContext.js");
/* harmony import */ var _Authentication_EnterUsernameForm_EnterUsernameForm__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../Authentication/EnterUsernameForm/EnterUsernameForm */ "./src/react-extension/components/Authentication/EnterUsernameForm/EnterUsernameForm.js");
/* harmony import */ var _Authentication_EnterNameForm_EnterNameForm__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../Authentication/EnterNameForm/EnterNameForm */ "./src/react-extension/components/Authentication/EnterNameForm/EnterNameForm.js");
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
 * The component orchestrates the api triage workflow.
 */

var OrchestrateApiTriage = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(OrchestrateApiTriage, _Component);

  var _super = _createSuper(OrchestrateApiTriage);

  function OrchestrateApiTriage() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, OrchestrateApiTriage);

    return _super.apply(this, arguments);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(OrchestrateApiTriage, [{
    key: "componentDidMount",

    /**
     * Whenever the component is initialized
     */
    value: function componentDidMount() {
      this.initializeTriage();
    }
    /**
     * Initialize the triage.
     */

  }, {
    key: "initializeTriage",
    value: function initializeTriage() {
      var _this = this;

      setTimeout(function () {
        return _this.props.apiTriageContext.onInitializeTriageRequested();
      }, 1000);
    }
    /**
     * Render the component
     * @returns {JSX}
     */

  }, {
    key: "render",
    value: function render() {
      switch (this.props.apiTriageContext.state) {
        case _contexts_ApiTriageContext__WEBPACK_IMPORTED_MODULE_8__["ApiTriageContextState"].USERNAME_STATE:
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_Authentication_EnterUsernameForm_EnterUsernameForm__WEBPACK_IMPORTED_MODULE_9__["default"], null);

        case _contexts_ApiTriageContext__WEBPACK_IMPORTED_MODULE_8__["ApiTriageContextState"].CHECK_MAILBOX_STATE:
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_Authentication_CheckMailBox_CheckMailBox__WEBPACK_IMPORTED_MODULE_11__["default"], null);

        case _contexts_ApiTriageContext__WEBPACK_IMPORTED_MODULE_8__["ApiTriageContextState"].NAME_STATE:
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_Authentication_EnterNameForm_EnterNameForm__WEBPACK_IMPORTED_MODULE_10__["default"], null);

        case _contexts_ApiTriageContext__WEBPACK_IMPORTED_MODULE_8__["ApiTriageContextState"].ERROR_STATE:
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_Authentication_DisplayError_DisplayError__WEBPACK_IMPORTED_MODULE_12__["default"], null);

        default:
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_react_components_Common_Loading_LoadingSpinner_LoadingSpinner__WEBPACK_IMPORTED_MODULE_7__["default"], null);
      }
    }
  }]);

  return OrchestrateApiTriage;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);

OrchestrateApiTriage.propTypes = {
  apiTriageContext: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.object // The api setup context

};
/* harmony default export */ __webpack_exports__["default"] = (Object(_contexts_ApiTriageContext__WEBPACK_IMPORTED_MODULE_8__["withApiTriageContext"])(OrchestrateApiTriage));

/***/ }),

/***/ "./src/react-extension/components/Footer/Footer.js":
/*!*********************************************************!*\
  !*** ./src/react-extension/components/Footer/Footer.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
/* harmony import */ var _Common_Icons_Icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Common/Icons/Icon */ "./src/react/components/Common/Icons/Icon.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_8__);







function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, result); }; }

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



var CREDITS_URL = "https://www.passbolt.com/credits";
var UNSAFE_URL = "https://help.passbolt.com/faq/hosting/why-unsafe";
/**
 * The application footer
 */

var Footer = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(Footer, _Component);

  var _super = _createSuper(Footer);

  function Footer() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, Footer);

    return _super.apply(this, arguments);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(Footer, [{
    key: "render",

    /**
     * Render the component
     * @return {JSX}
     */
    value: function render() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("footer", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
        className: "footer"
      }, this.isReady && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("ul", {
        className: "footer-links"
      }, this.isUnsafeMode && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("li", {
        className: "error message"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("a", {
        title: "terms of service",
        href: this.unsafeUrl,
        target: "_blank",
        rel: "noopener noreferrer"
      }, "Unsafe mode")), this.termsUrl && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("a", {
        href: this.termsUrl,
        target: "_blank",
        rel: "noopener noreferrer"
      }, "Terms")), this.privacyUrl && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("a", {
        href: this.privacyUrl,
        target: "_blank",
        rel: "noopener noreferrer"
      }, "Privacy")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("a", {
        href: this.creditsUrl,
        target: "_blank",
        rel: "noopener noreferrer"
      }, "Credits")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("a", _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
        href: this.creditsUrl,
        className: "tooltip-left"
      }, this.versions && {
        "data-tooltip": this.versions
      }, {
        target: "_blank",
        rel: "noopener noreferrer"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_Common_Icons_Icon__WEBPACK_IMPORTED_MODULE_7__["default"], {
        name: "heart-o"
      }))))));
    }
  }, {
    key: "isReady",

    /**
     * Returns true if the component is ready to be displayed
     */
    get: function get() {
      return this.props.siteSettings;
    }
    /**
     * Returns the terms link url
     */

  }, {
    key: "privacyUrl",
    get: function get() {
      return this.props.siteSettings.privacyLink;
    }
    /**
     * Returns the credits link url
     */

  }, {
    key: "creditsUrl",
    get: function get() {
      return CREDITS_URL;
    }
    /**
     * Returns the unsafe url.
     */

  }, {
    key: "unsafeUrl",
    get: function get() {
      return UNSAFE_URL;
    }
    /**
     * Returns the privacy link url
     */

  }, {
    key: "termsUrl",
    get: function get() {
      return this.props.siteSettings.termsLink;
    }
    /**
     * Return the server (if available) and browser extension version.
     * i.e. SERVER_VERSION / BROWSER_EXTENSION_VERSION
     */

  }, {
    key: "versions",
    get: function get() {
      var versions = [];
      var serverVersion = this.props.siteSettings.version;

      if (serverVersion) {
        versions.push(serverVersion);
      }

      if (this.props.extensionVersion) {
        versions.push(this.props.extensionVersion);
      }

      return versions.join(' / ');
    }
    /**
     * Returns true if the application is in an unsafe mode
     */

  }, {
    key: "isUnsafeMode",
    get: function get() {
      var debug = this.props.siteSettings.debug;
      var isHttpMode = this.props.siteSettings.url.startsWith('http://');
      return debug || isHttpMode;
    }
  }]);

  return Footer;
}(react__WEBPACK_IMPORTED_MODULE_6__["Component"]);

Footer.propTypes = {
  siteSettings: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.object,
  // The site settings
  extensionVersion: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.string // The extension version

};
/* harmony default export */ __webpack_exports__["default"] = (Footer);

/***/ }),

/***/ "./src/react-extension/contexts/ApiTriageContext.js":
/*!**********************************************************!*\
  !*** ./src/react-extension/contexts/ApiTriageContext.js ***!
  \**********************************************************/
/*! exports provided: ApiTriageContext, default, withApiTriageContext, ApiTriageContextState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiTriageContext", function() { return ApiTriageContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withApiTriageContext", function() { return withApiTriageContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiTriageContextState", function() { return ApiTriageContextState; });
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
 * The Api triage context.
 * @type {React.Context<object>}
 */

var ApiTriageContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createContext({
  state: null,
  // The current triage workflow state
  onInitializeTriageRequested: function onInitializeTriageRequested() {},
  // Whenever the initialization of the triage is requested.
  onTriageRequested: function onTriageRequested() {},
  // Whenever the user wants to submit their username for triage
  onRegistrationRequested: function onRegistrationRequested() {} // Whenever the user wants to register

});
/**
 * The related context provider
 */

var ApiTriageContextProvider = /*#__PURE__*/function (_React$Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(ApiTriageContextProvider, _React$Component);

  var _super = _createSuper(ApiTriageContextProvider);

  /**
   * Default constructor
   * @param props The component props
   */
  function ApiTriageContextProvider(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default()(this, ApiTriageContextProvider);

    _this = _super.call(this, props);
    _this.state = Object.assign(_this.defaultState, props.value);
    return _this;
  }
  /**
   * Returns the default component state
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default()(ApiTriageContextProvider, [{
    key: "onInitializeTriageRequested",

    /**
     * Initialize the triage
     * @return {Promise<void>}
     */
    value: function () {
      var _onInitializeTriageRequested = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", this.setState({
                  state: ApiTriageContextState.USERNAME_STATE
                }));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onInitializeTriageRequested() {
        return _onInitializeTriageRequested.apply(this, arguments);
      }

      return onInitializeTriageRequested;
    }()
    /**
     * When the user want to submit their username for triage
     * @param {string} username The username
     * @returns {Promise<void>}
     */

  }, {
    key: "onTriageRequested",
    value: function () {
      var _onTriageRequested = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee2(username) {
        var _this2 = this;

        var triageDto, apiClientOptions, apiClient;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                triageDto = {
                  username: username
                };
                apiClientOptions = this.props.context.getApiClientOptions();
                apiClientOptions.setResourceName("users/recover");
                apiClient = new _lib_apiClient_apiClient__WEBPACK_IMPORTED_MODULE_11__["ApiClient"](apiClientOptions);
                _context2.next = 6;
                return apiClient.create(triageDto).then(this.handleTriageSuccess.bind(this))["catch"](function (error) {
                  return _this2.handleTriageError(error, username);
                });

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function onTriageRequested(_x) {
        return _onTriageRequested.apply(this, arguments);
      }

      return onTriageRequested;
    }()
    /**
     * Handle send username success.
     */

  }, {
    key: "handleTriageSuccess",
    value: function () {
      var _handleTriageSuccess = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee3() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", this.setState({
                  state: ApiTriageContextState.CHECK_MAILBOX_STATE
                }));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function handleTriageSuccess() {
        return _handleTriageSuccess.apply(this, arguments);
      }

      return handleTriageSuccess;
    }()
    /**
     * Handle send username error.
     */

  }, {
    key: "handleTriageError",
    value: function () {
      var _handleTriageError = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee4(error, username) {
        var userNotFound, isRegistrationPublic;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                userNotFound = error.data && error.data.code === 404;

                if (userNotFound) {
                  isRegistrationPublic = this.props.context.siteSettings.registrationPublic;

                  if (isRegistrationPublic) {
                    this.setState({
                      username: username,
                      state: ApiTriageContextState.NAME_STATE
                    });
                  } else {
                    this.setState({
                      username: username,
                      state: ApiTriageContextState.ERROR_STATE
                    });
                  }
                }
                /*
                 * @todo handle unexpected error.
                 * else {
                 *   console.log(error);
                 *   await this.props.actionFeedbackContext.displayError("There was an unexpected error, please retry later...");
                 *   await this.toggleProcessing();
                 * }
                 */


              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function handleTriageError(_x2, _x3) {
        return _handleTriageError.apply(this, arguments);
      }

      return handleTriageError;
    }()
    /**
     * When the user wants to register
     * @param {string} firstName The user first name
     * @param {string} lastName The user last name
     * @returns {Promise<Object>}
     */

  }, {
    key: "onRegistrationRequested",
    value: function () {
      var _onRegistrationRequested = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee5(firstName, lastName) {
        var registrationDto, apiClientOptions, apiClient;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                registrationDto = {
                  username: this.state.username,
                  profile: {
                    first_name: firstName,
                    last_name: lastName
                  }
                };
                apiClientOptions = this.props.context.getApiClientOptions().setResourceName("users/register");
                apiClient = new _lib_apiClient_apiClient__WEBPACK_IMPORTED_MODULE_11__["ApiClient"](apiClientOptions);
                _context5.next = 5;
                return apiClient.create(registrationDto).then(this.handleRegistrationSuccess.bind(this))["catch"](this.handleRegistrationError.bind(this));

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function onRegistrationRequested(_x4, _x5) {
        return _onRegistrationRequested.apply(this, arguments);
      }

      return onRegistrationRequested;
    }()
    /**
     * Handle registration success
     */

  }, {
    key: "handleRegistrationSuccess",
    value: function () {
      var _handleRegistrationSuccess = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee6() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                return _context6.abrupt("return", this.setState({
                  state: ApiTriageContextState.CHECK_MAILBOX_STATE
                }));

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function handleRegistrationSuccess() {
        return _handleRegistrationSuccess.apply(this, arguments);
      }

      return handleRegistrationSuccess;
    }()
    /**
     * Handle registration error
     * @returns {Promise<void>}
     */

  }, {
    key: "handleRegistrationError",
    value: function () {
      var _handleRegistrationError = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee7() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                this.setState({
                  state: ApiTriageContextState.ERROR_STATE
                });

              case 1:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function handleRegistrationError() {
        return _handleRegistrationError.apply(this, arguments);
      }

      return handleRegistrationError;
    }()
    /**
     * Render the component
     * @returns {JSX}
     */

  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(ApiTriageContext.Provider, {
        value: this.state
      }, this.props.children);
    }
  }, {
    key: "defaultState",
    get: function get() {
      return {
        state: ApiTriageContextState.INITIAL_STATE,
        onInitializeTriageRequested: this.onInitializeTriageRequested.bind(this),
        onTriageRequested: this.onTriageRequested.bind(this),
        onRegistrationRequested: this.onRegistrationRequested.bind(this)
      };
    }
  }]);

  return ApiTriageContextProvider;
}(react__WEBPACK_IMPORTED_MODULE_8___default.a.Component);

ApiTriageContextProvider.propTypes = {
  context: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.any,
  // The application context
  value: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.any,
  // The initial value of the context
  children: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.any // The children components

};
/* harmony default export */ __webpack_exports__["default"] = (Object(_AppContext__WEBPACK_IMPORTED_MODULE_10__["withAppContext"])(ApiTriageContextProvider));
/**
 * API Triage Context Consumer HOC
 * @param WrappedComponent
 */

function withApiTriageContext(WrappedComponent) {
  return /*#__PURE__*/function (_React$Component2) {
    _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(withApiTriageContext, _React$Component2);

    var _super2 = _createSuper(withApiTriageContext);

    function withApiTriageContext() {
      _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default()(this, withApiTriageContext);

      return _super2.apply(this, arguments);
    }

    _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default()(withApiTriageContext, [{
      key: "render",
      value: function render() {
        var _this3 = this;

        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(ApiTriageContext.Consumer, null, function (context) {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(WrappedComponent, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
            apiTriageContext: context
          }, _this3.props));
        });
      }
    }]);

    return withApiTriageContext;
  }(react__WEBPACK_IMPORTED_MODULE_8___default.a.Component);
}
/**
 * The triage types of state
 */

var ApiTriageContextState = {
  INITIAL_STATE: 'Initial State',
  USERNAME_STATE: 'Enter username state',
  CHECK_MAILBOX_STATE: 'Check mailbox state',
  NAME_STATE: 'Enter name state',
  NAME_ERROR: 'Error state'
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

/***/ "./src/react-extension/lib/Settings/SiteSettings.js":
/*!**********************************************************!*\
  !*** ./src/react-extension/lib/Settings/SiteSettings.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SiteSettings; });
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _react_lib_Common_Object_getPropValue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../react/lib/Common/Object/getPropValue */ "./src/react/lib/Common/Object/getPropValue.js");
/* harmony import */ var _Common_Sanitize_sanitizeUrl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Common/Sanitize/sanitizeUrl */ "./src/react/lib/Common/Sanitize/sanitizeUrl.js");




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



var SiteSettings = /*#__PURE__*/function () {
  function SiteSettings(settings) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, SiteSettings);

    this.settings = settings;
  }
  /**
   * Check if the user can use a capability.
   * @param {string} name The capability name
   * @returns {boolean}
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(SiteSettings, [{
    key: "canIUse",
    value: function canIUse(name) {
      var result = false;
      var configPath = "passbolt.plugins.".concat(name);
      var pluginSettings = Object(_react_lib_Common_Object_getPropValue__WEBPACK_IMPORTED_MODULE_3__["default"])(this.settings, configPath) || null;
      /*
       * For now each capability is represented by a plugin.
       * A capability is then considered as enabled when:
       * - The plugin settings exist but the enabled flag is missing (old API version);
       * - The plugin setting exist and the flag is set to true
       * In any other case the capability is considered as disabled.
       */

      if (pluginSettings && _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(pluginSettings) === "object") {
        var pluginEnabled = Object(_react_lib_Common_Object_getPropValue__WEBPACK_IMPORTED_MODULE_3__["default"])(pluginSettings, "enabled");

        if (typeof pluginEnabled === "undefined" || pluginEnabled === true) {
          result = true;
        }
      }

      return result;
    }
    /**
     * Retrieve the settings of a plugin.
     * @param {string} name The plugin name
     * @returns {object|null}
     */

  }, {
    key: "getPluginSettings",
    value: function getPluginSettings(name) {
      var configPath = "passbolt.plugins.".concat(name);
      return Object(_react_lib_Common_Object_getPropValue__WEBPACK_IMPORTED_MODULE_3__["default"])(this.settings, configPath);
    }
    /**
     * Retrieve the remember me options
     * @returns {object}
     */

  }, {
    key: "getRememberMeOptions",
    value: function getRememberMeOptions() {
      var pluginSettings = this.getPluginSettings('rememberMe');
      return pluginSettings.options;
    }
    /**
     * Check if the remember options include the "until I logout" options
     * @return {boolean}
     */

  }, {
    key: "getServerTimezone",

    /**
     * Get the server timezone
     * @returns {string|null}
     */
    value: function getServerTimezone() {
      return Object(_react_lib_Common_Object_getPropValue__WEBPACK_IMPORTED_MODULE_3__["default"])(this.settings, "passbolt.app.server_timezone");
    }
    /**
     * Get terms and condition links if any
     * @returns {string|boolean}
     */

  }, {
    key: "hasRememberMeUntilILogoutOption",
    get: function get() {
      var options = this.getRememberMeOptions() || {};
      return typeof options[-1] !== "undefined";
    }
  }, {
    key: "termsLink",
    get: function get() {
      var termsLink = Object(_react_lib_Common_Object_getPropValue__WEBPACK_IMPORTED_MODULE_3__["default"])(this.settings, "passbolt.legal.terms.url");

      if (termsLink) {
        return Object(_Common_Sanitize_sanitizeUrl__WEBPACK_IMPORTED_MODULE_4__["default"])(termsLink);
      }

      return false;
    }
    /**
     * Get privacy link if any
     * @returns {string|boolean}
     */

  }, {
    key: "privacyLink",
    get: function get() {
      var privacyLink = Object(_react_lib_Common_Object_getPropValue__WEBPACK_IMPORTED_MODULE_3__["default"])(this.settings, "passbolt.legal.privacy_policy.url");

      if (privacyLink) {
        return Object(_Common_Sanitize_sanitizeUrl__WEBPACK_IMPORTED_MODULE_4__["default"])(privacyLink);
      }

      return false;
    }
    /**
     * Get registration public
     * @returns {boolean}
     */

  }, {
    key: "registrationPublic",
    get: function get() {
      var registrationPublic = Object(_react_lib_Common_Object_getPropValue__WEBPACK_IMPORTED_MODULE_3__["default"])(this.settings, "passbolt.registration.public");
      return registrationPublic === true;
    }
    /**
     * Get debug mode
     * @returns {boolean}
     */

  }, {
    key: "debug",
    get: function get() {
      var debug = Object(_react_lib_Common_Object_getPropValue__WEBPACK_IMPORTED_MODULE_3__["default"])(this.settings, "app.debug");
      return debug === true;
    }
    /**
     * Get app url
     * @returns {boolean}
     */

  }, {
    key: "url",
    get: function get() {
      return Object(_react_lib_Common_Object_getPropValue__WEBPACK_IMPORTED_MODULE_3__["default"])(this.settings, "app.url") || "";
    }
    /**
     * Get app version
     * @returns {string}
     */

  }, {
    key: "version",
    get: function get() {
      return Object(_react_lib_Common_Object_getPropValue__WEBPACK_IMPORTED_MODULE_3__["default"])(this.settings, "app.version.number");
    }
  }]);

  return SiteSettings;
}();



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

/***/ "./src/react/components/Common/Icons/Icon.js":
/*!***************************************************!*\
  !*** ./src/react/components/Common/Icons/Icon.js ***!
  \***************************************************/
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
 * This file contains icons from FontAwesome v3
 * by Dave Gandy - http://fontawesome.io.
 *
 * The Font Awesome font is licensed under the SIL OFL 1.1:
 * http://scripts.sil.org/OFL
 *
 * Font-Awesome-SVG-PNG is licensed under the MIT license
 * Copyright (c) 2014 Code Charm Ltd
 * https://github.com/encharm/Font-Awesome-SVG-PNG
 */



var Icon = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(Icon, _Component);

  var _super = _createSuper(Icon);

  function Icon() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Icon);

    return _super.apply(this, arguments);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Icon, [{
    key: "getClassName",

    /**
     * Get icon classname
     * @returns {string}
     */
    value: function getClassName() {
      var className = "svg-icon ".concat(this.props.name);

      if (this.props.big) {
        className += ' icon-only';
      }

      if (this.props.baseline) {
        className += ' baseline';
      }

      return className;
    }
    /**
     * Render the component
     * @return {JSX}
     */

  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("span", {
        className: this.getClassName(),
        onClick: this.props.onClick
      }, this.props.name === 'ban' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("svg", {
        width: "1792",
        height: "1792",
        viewBox: "0 0 1792 1792",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("path", {
        d: "M1440 893q0-161-87-295l-754 753q137 89 297 89 111 0 211.5-43.5t173.5-116.5 116-174.5 43-212.5zm-999 299l755-754q-135-91-300-91-148 0-273 73t-198 199-73 274q0 162 89 299zm1223-299q0 157-61 300t-163.5 246-245 164-298.5 61-298.5-61-245-164-163.5-246-61-300 61-299.5 163.5-245.5 245-164 298.5-61 298.5 61 245 164 163.5 245.5 61 299.5z"
      })), this.props.name === 'camera' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("svg", {
        width: "2048",
        height: "1792",
        viewBox: "0 0 2048 1792",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("path", {
        d: "M1024 672q119 0 203.5 84.5t84.5 203.5-84.5 203.5-203.5 84.5-203.5-84.5-84.5-203.5 84.5-203.5 203.5-84.5zm704-416q106 0 181 75t75 181v896q0 106-75 181t-181 75h-1408q-106 0-181-75t-75-181v-896q0-106 75-181t181-75h224l51-136q19-49 69.5-84.5t103.5-35.5h512q53 0 103.5 35.5t69.5 84.5l51 136h224zm-704 1152q185 0 316.5-131.5t131.5-316.5-131.5-316.5-316.5-131.5-316.5 131.5-131.5 316.5 131.5 316.5 316.5 131.5z"
      })), this.props.name === 'caret-right' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("svg", {
        width: "1792",
        height: "1792",
        viewBox: "0 0 1792 1792",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("path", {
        d: "M1152 896q0 26-19 45l-448 448q-19 19-45 19t-45-19-19-45v-896q0-26 19-45t45-19 45 19l448 448q19 19 19 45z"
      })), this.props.name === 'caret-down' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("svg", {
        width: "1792",
        height: "1792",
        viewBox: "0 0 1792 1792",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("path", {
        d: "M1408 704q0 26-19 45l-448 448q-19 19-45 19t-45-19l-448-448q-19-19-19-45t19-45 45-19h896q26 0 45 19t19 45z"
      })), this.props.name === 'caret-up' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("svg", {
        width: "1792",
        height: "1792",
        viewBox: "0 0 1792 1792",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("path", {
        d: "M1408 1216q0 26-19 45t-45 19h-896q-26 0-45-19t-19-45 19-45l448-448q19-19 45-19t45 19l448 448q19 19 19 45z"
      })), this.props.name === 'chevron-left' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("svg", {
        width: "1792",
        height: "1792",
        viewBox: "0 0 1792 1792",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("path", {
        d: "M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"
      })), this.props.name === 'chevron-right' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("svg", {
        width: "1792",
        height: "1792",
        viewBox: "0 0 1792 1792",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("path", {
        d: "M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"
      })), this.props.name === 'close' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("svg", {
        width: "1792",
        height: "1792",
        viewBox: "0 0 1792 1792",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("path", {
        d: "M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z"
      })), this.props.name === 'close-circle' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("svg", {
        width: "1792",
        height: "1792",
        viewBox: "0 0 1792 1792",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("path", {
        d: "M1277 1122q0-26-19-45l-181-181 181-181q19-19 19-45 0-27-19-46l-90-90q-19-19-46-19-26 0-45 19l-181 181-181-181q-19-19-45-19-27 0-46 19l-90 90q-19 19-19 46 0 26 19 45l181 181-181 181q-19 19-19 45 0 27 19 46l90 90q19 19 46 19 26 0 45-19l181-181 181 181q19 19 45 19 27 0 46-19l90-90q19-19 19-46zm387-226q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"
      })), this.props.name === 'copy-to-clipboard' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("svg", {
        width: "1792",
        height: "1792",
        viewBox: "0 0 1792 1792",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("path", {
        d: "M768 1664h896v-640h-416q-40 0-68-28t-28-68v-416h-384v1152zm256-1440v-64q0-13-9.5-22.5t-22.5-9.5h-704q-13 0-22.5 9.5t-9.5 22.5v64q0 13 9.5 22.5t22.5 9.5h704q13 0 22.5-9.5t9.5-22.5zm256 672h299l-299-299v299zm512 128v672q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-160h-544q-40 0-68-28t-28-68v-1344q0-40 28-68t68-28h1088q40 0 68 28t28 68v328q21 13 36 28l408 408q28 28 48 76t20 88z"
      })), this.props.name === 'download' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("svg", {
        width: "1792",
        height: "1792",
        viewBox: "0 0 1792 1792",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("path", {
        d: "M1344 1344q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm256 0q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm128-224v320q0 40-28 68t-68 28h-1472q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h465l135 136q58 56 136 56t136-56l136-136h464q40 0 68 28t28 68zm-325-569q17 41-14 70l-448 448q-18 19-45 19t-45-19l-448-448q-31-29-14-70 17-39 59-39h256v-448q0-26 19-45t45-19h256q26 0 45 19t19 45v448h256q42 0 59 39z"
      })), this.props.name === 'edit' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("svg", {
        width: "1792",
        height: "1792",
        viewBox: "0 0 1792 1792",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("path", {
        d: "M888 1184l116-116-152-152-116 116v56h96v96h56zm440-720q-16-16-33 1l-350 350q-17 17-1 33t33-1l350-350q17-17 1-33zm80 594v190q0 119-84.5 203.5t-203.5 84.5h-832q-119 0-203.5-84.5t-84.5-203.5v-832q0-119 84.5-203.5t203.5-84.5h832q63 0 117 25 15 7 18 23 3 17-9 29l-49 49q-14 14-32 8-23-6-45-6h-832q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113v-126q0-13 9-22l64-64q15-15 35-7t20 29zm-96-738l288 288-672 672h-288v-288zm444 132l-92 92-288-288 92-92q28-28 68-28t68 28l152 152q28 28 28 68t-28 68z"
      })), this.props.name === 'eye-open' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("svg", {
        width: "1792",
        height: "1792",
        viewBox: "0 0 1792 1792",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("path", {
        d: "M1664 960q-152-236-381-353 61 104 61 225 0 185-131.5 316.5t-316.5 131.5-316.5-131.5-131.5-316.5q0-121 61-225-229 117-381 353 133 205 333.5 326.5t434.5 121.5 434.5-121.5 333.5-326.5zm-720-384q0-20-14-34t-34-14q-125 0-214.5 89.5t-89.5 214.5q0 20 14 34t34 14 34-14 14-34q0-86 61-147t147-61q20 0 34-14t14-34zm848 384q0 34-20 69-140 230-376.5 368.5t-499.5 138.5-499.5-139-376.5-368q-20-35-20-69t20-69q140-229 376.5-368t499.5-139 499.5 139 376.5 368q20 35 20 69z"
      })), this.props.name === 'eye-close' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("svg", {
        width: "1792",
        height: "1792",
        viewBox: "0 0 1792 1792",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("path", {
        d: "M555 1335l78-141q-87-63-136-159t-49-203q0-121 61-225-229 117-381 353 167 258 427 375zm389-759q0-20-14-34t-34-14q-125 0-214.5 89.5t-89.5 214.5q0 20 14 34t34 14 34-14 14-34q0-86 61-147t147-61q20 0 34-14t14-34zm363-191q0 7-1 9-106 189-316 567t-315 566l-49 89q-10 16-28 16-12 0-134-70-16-10-16-28 0-12 44-87-143-65-263.5-173t-208.5-245q-20-31-20-69t20-69q153-235 380-371t496-136q89 0 180 17l54-97q10-16 28-16 5 0 18 6t31 15.5 33 18.5 31.5 18.5 19.5 11.5q16 10 16 27zm37 447q0 139-79 253.5t-209 164.5l280-502q8 45 8 84zm448 128q0 35-20 69-39 64-109 145-150 172-347.5 267t-419.5 95l74-132q212-18 392.5-137t301.5-307q-115-179-282-294l63-112q95 64 182.5 153t144.5 184q20 34 20 69z"
      })), this.props.name === 'external-link' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("svg", {
        width: "1792",
        height: "1792",
        viewBox: "0 0 1792 1792",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("path", {
        d: "M1408 928v-480q0-26-19-45t-45-19h-480q-42 0-59 39-17 41 14 70l144 144-534 534q-19 19-19 45t19 45l102 102q19 19 45 19t45-19l534-534 144 144q18 19 45 19 12 0 25-5 39-17 39-59zm256-512v960q0 119-84.5 203.5t-203.5 84.5h-960q-119 0-203.5-84.5t-84.5-203.5v-960q0-119 84.5-203.5t203.5-84.5h960q119 0 203.5 84.5t84.5 203.5z"
      })), this.props.name === 'folder' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("svg", {
        width: "1792",
        height: "1792",
        viewBox: "0 0 1792 1792",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("path", {
        d: "M1728 608v704q0 92-66 158t-158 66h-1216q-92 0-158-66t-66-158v-960q0-92 66-158t158-66h320q92 0 158 66t66 158v32h672q92 0 158 66t66 158z"
      })), this.props.name === 'folder-shared' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("svg", {
        viewBox: "2 2 20 20",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("path", {
        d: "M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-5 3c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm4 8h-8v-1c0-1.33 2.67-2 4-2s4 .67 4 2v1z"
      })), this.props.name === 'heart' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("svg", {
        width: "1792",
        height: "1792",
        viewBox: "0 0 1792 1792",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("path", {
        d: "M896 1664q-26 0-44-18l-624-602q-10-8-27.5-26t-55.5-65.5-68-97.5-53.5-121-23.5-138q0-220 127-344t351-124q62 0 126.5 21.5t120 58 95.5 68.5 76 68q36-36 76-68t95.5-68.5 120-58 126.5-21.5q224 0 351 124t127 344q0 221-229 450l-623 600q-18 18-44 18z"
      })), this.props.name === 'heart-o' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 512 512"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("path", {
        d: "M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"
      })), this.props.name === 'heartbeat' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("svg", {
        width: "1792",
        height: "1792",
        viewBox: "0 0 1792 1792",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("path", {
        d: "M1280 1024h305q-5 6-10 10.5t-9 7.5l-3 4-623 600q-18 18-44 18t-44-18l-624-602q-5-2-21-20h369q22 0 39.5-13.5t22.5-34.5l70-281 190 667q6 20 23 33t39 13q21 0 38-13t23-33l146-485 56 112q18 35 57 35zm512-428q0 145-103 300h-369l-111-221q-8-17-25.5-27t-36.5-8q-45 5-56 46l-129 430-196-686q-6-20-23.5-33t-39.5-13-39 13.5-22 34.5l-116 464h-423q-103-155-103-300 0-220 127-344t351-124q62 0 126.5 21.5t120 58 95.5 68.5 76 68q36-36 76-68t95.5-68.5 120-58 126.5-21.5q224 0 351 124t127 344z"
      })), this.props.name === 'info-circle' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("svg", {
        width: "1792",
        height: "1792",
        viewBox: "0 0 1792 1792",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("path", {
        d: "M1152 1376v-160q0-14-9-23t-23-9h-96v-512q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v160q0 14 9 23t23 9h96v320h-96q-14 0-23 9t-9 23v160q0 14 9 23t23 9h448q14 0 23-9t9-23zm-128-896v-160q0-14-9-23t-23-9h-192q-14 0-23 9t-9 23v160q0 14 9 23t23 9h192q14 0 23-9t9-23zm640 416q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"
      })), this.props.name === 'key' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("svg", {
        width: "512",
        height: "512",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 512 512"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("path", {
        fill: "currentColor",
        d: "M512 176.001C512 273.203 433.202 352 336 352c-11.22 0-22.19-1.062-32.827-3.069l-24.012 27.014A23.999 23.999 0 0 1 261.223 384H224v40c0 13.255-10.745 24-24 24h-40v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24v-78.059c0-6.365 2.529-12.47 7.029-16.971l161.802-161.802C163.108 213.814 160 195.271 160 176 160 78.798 238.797.001 335.999 0 433.488-.001 512 78.511 512 176.001zM336 128c0 26.51 21.49 48 48 48s48-21.49 48-48-21.49-48-48-48-48 21.49-48 48z"
      })), this.props.name === 'link' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("svg", {
        width: "1792",
        height: "1792",
        viewBox: "0 0 1792 1792",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("path", {
        d: "M1520 1216q0-40-28-68l-208-208q-28-28-68-28-42 0-72 32 3 3 19 18.5t21.5 21.5 15 19 13 25.5 3.5 27.5q0 40-28 68t-68 28q-15 0-27.5-3.5t-25.5-13-19-15-21.5-21.5-18.5-19q-33 31-33 73 0 40 28 68l206 207q27 27 68 27 40 0 68-26l147-146q28-28 28-67zm-703-705q0-40-28-68l-206-207q-28-28-68-28-39 0-68 27l-147 146q-28 28-28 67 0 40 28 68l208 208q27 27 68 27 42 0 72-31-3-3-19-18.5t-21.5-21.5-15-19-13-25.5-3.5-27.5q0-40 28-68t68-28q15 0 27.5 3.5t25.5 13 19 15 21.5 21.5 18.5 19q33-31 33-73zm895 705q0 120-85 203l-147 146q-83 83-203 83-121 0-204-85l-206-207q-83-83-83-203 0-123 88-209l-88-88q-86 88-208 88-120 0-204-84l-208-208q-84-84-84-204t85-203l147-146q83-83 203-83 121 0 204 85l206 207q83 83 83 203 0 123-88 209l88 88q86-88 208-88 120 0 204 84l208 208q84 84 84 204z"
      })), this.props.name === 'lock' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("svg", {
        width: "1792",
        height: "1792",
        viewBox: "0 0 1792 1792",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("path", {
        d: "M640 768h512v-192q0-106-75-181t-181-75-181 75-75 181v192zm832 96v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-192q0-184 132-316t316-132 316 132 132 316v192h32q40 0 68 28t28 68z"
      })), this.props.name === 'lock-open' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("svg", {
        width: "1792",
        height: "1792",
        viewBox: "0 0 1792 1792",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("path", {
        d: "M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z"
      })), this.props.name === 'magic-wand' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("svg", {
        width: "1792",
        height: "1792",
        viewBox: "0 0 1792 1792",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("path", {
        d: "M1254 581l293-293-107-107-293 293zm447-293q0 27-18 45l-1286 1286q-18 18-45 18t-45-18l-198-198q-18-18-18-45t18-45l1286-1286q18-18 45-18t45 18l198 198q18 18 18 45zm-1351-190l98 30-98 30-30 98-30-98-98-30 98-30 30-98zm350 162l196 60-196 60-60 196-60-196-196-60 196-60 60-196zm930 478l98 30-98 30-30 98-30-98-98-30 98-30 30-98zm-640-640l98 30-98 30-30 98-30-98-98-30 98-30 30-98z"
      })), this.props.name === 'plus-circle' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("svg", {
        width: "1792",
        height: "1792",
        viewBox: "0 0 1792 1792",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("path", {
        d: "M1344 960v-128q0-26-19-45t-45-19h-256v-256q0-26-19-45t-45-19h-128q-26 0-45 19t-19 45v256h-256q-26 0-45 19t-19 45v128q0 26 19 45t45 19h256v256q0 26 19 45t45 19h128q26 0 45-19t19-45v-256h256q26 0 45-19t19-45zm320-64q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"
      })), this.props.name === 'plus-square' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("svg", {
        width: "1792",
        height: "1792",
        viewBox: "0 0 448 512",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("path", {
        d: "M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-32 252c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92H92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"
      })), this.props.name === 'filter' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("svg", {
        width: "1792",
        height: "1792",
        viewBox: "0 0 512 512",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("path", {
        d: "M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z"
      })), this.props.name === 'life-ring' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("svg", {
        width: "1792",
        height: "1792",
        viewBox: "0 0 512 512",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("path", {
        d: "M256 504c136.967 0 248-111.033 248-248S392.967 8 256 8 8 119.033 8 256s111.033 248 248 248zm-103.398-76.72l53.411-53.411c31.806 13.506 68.128 13.522 99.974 0l53.411 53.411c-63.217 38.319-143.579 38.319-206.796 0zM336 256c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80zm91.28 103.398l-53.411-53.411c13.505-31.806 13.522-68.128 0-99.974l53.411-53.411c38.319 63.217 38.319 143.579 0 206.796zM359.397 84.72l-53.411 53.411c-31.806-13.505-68.128-13.522-99.973 0L152.602 84.72c63.217-38.319 143.579-38.319 206.795 0zM84.72 152.602l53.411 53.411c-13.506 31.806-13.522 68.128 0 99.974L84.72 359.398c-38.319-63.217-38.319-143.579 0-206.796z"
      })), this.props.name === 'plug' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("svg", {
        width: "1792",
        height: "1792",
        viewBox: "0 0 384 512",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("path", {
        d: "M320,32a32,32,0,0,0-64,0v96h64Zm48,128H16A16,16,0,0,0,0,176v32a16,16,0,0,0,16,16H32v32A160.07,160.07,0,0,0,160,412.8V512h64V412.8A160.07,160.07,0,0,0,352,256V224h16a16,16,0,0,0,16-16V176A16,16,0,0,0,368,160ZM128,32a32,32,0,0,0-64,0v96h64Z"
      })), this.props.name === 'printer' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("svg", {
        width: "1792",
        height: "1792",
        viewBox: "0 0 1792 1792",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("path", {
        d: "M448 1536h896v-256h-896v256zm0-640h896v-384h-160q-40 0-68-28t-28-68v-160h-640v640zm1152 64q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm128 0v416q0 13-9.5 22.5t-22.5 9.5h-224v160q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-160h-224q-13 0-22.5-9.5t-9.5-22.5v-416q0-79 56.5-135.5t135.5-56.5h64v-544q0-40 28-68t68-28h672q40 0 88 20t76 48l152 152q28 28 48 76t20 88v256h64q79 0 135.5 56.5t56.5 135.5z"
      })), this.props.name === 'refresh' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("svg", {
        width: "1792",
        height: "1792",
        viewBox: "0 0 512 512",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("path", {
        d: "M370.72 133.28C339.458 104.008 298.888 87.962 255.848 88c-77.458.068-144.328 53.178-162.791 126.85-1.344 5.363-6.122 9.15-11.651 9.15H24.103c-7.498 0-13.194-6.807-11.807-14.176C33.933 94.924 134.813 8 256 8c66.448 0 126.791 26.136 171.315 68.685L463.03 40.97C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.749zM32 296h134.059c21.382 0 32.09 25.851 16.971 40.971l-41.75 41.75c31.262 29.273 71.835 45.319 114.876 45.28 77.418-.07 144.315-53.144 162.787-126.849 1.344-5.363 6.122-9.15 11.651-9.15h57.304c7.498 0 13.194 6.807 11.807 14.176C478.067 417.076 377.187 504 256 504c-66.448 0-126.791-26.136-171.315-68.685L48.97 471.03C33.851 486.149 8 475.441 8 454.059V320c0-13.255 10.745-24 24-24z"
      })), this.props.name === 'question-circle' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("svg", {
        width: "1792",
        height: "1792",
        viewBox: "0 0 1792 1792",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("path", {
        d: "M1024 1376v-192q0-14-9-23t-23-9h-192q-14 0-23 9t-9 23v192q0 14 9 23t23 9h192q14 0 23-9t9-23zm256-672q0-88-55.5-163t-138.5-116-170-41q-243 0-371 213-15 24 8 42l132 100q7 6 19 6 16 0 25-12 53-68 86-92 34-24 86-24 48 0 85.5 26t37.5 59q0 38-20 61t-68 45q-63 28-115.5 86.5t-52.5 125.5v36q0 14 9 23t23 9h192q14 0 23-9t9-23q0-19 21.5-49.5t54.5-49.5q32-18 49-28.5t46-35 44.5-48 28-60.5 12.5-81zm384 192q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"
      })), this.props.name === 'search' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("svg", {
        width: "1792",
        height: "1792",
        viewBox: "0 0 1792 1792",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("path", {
        d: "M1216 832q0-185-131.5-316.5t-316.5-131.5-316.5 131.5-131.5 316.5 131.5 316.5 316.5 131.5 316.5-131.5 131.5-316.5zm512 832q0 52-38 90t-90 38q-54 0-90-38l-343-342q-179 124-399 124-143 0-273.5-55.5t-225-150-150-225-55.5-273.5 55.5-273.5 150-225 225-150 273.5-55.5 273.5 55.5 225 150 150 225 55.5 273.5q0 220-124 399l343 343q37 37 37 90z"
      })), this.props.name === 'share' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("svg", {
        width: "1792",
        height: "1792",
        viewBox: "0 0 1792 1792",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("path", {
        d: "M1764 11q33 24 27 64l-256 1536q-5 29-32 45-14 8-31 8-11 0-24-5l-453-185-242 295q-18 23-49 23-13 0-22-4-19-7-30.5-23.5t-11.5-36.5v-349l864-1059-1069 925-395-162q-37-14-40-55-2-40 32-59l1664-960q15-9 32-9 20 0 36 11z"
      })), this.props.name === 'star' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("svg", {
        width: "1792",
        height: "1792",
        viewBox: "0 0 1792 1792",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("path", {
        d: "M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
      })), this.props.name === 'save' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("svg", {
        width: "1792",
        height: "1792",
        viewBox: "0 0 448 512",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("path", {
        d: "M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM272 80v80H144V80h128zm122 352H54a6 6 0 0 1-6-6V86a6 6 0 0 1 6-6h42v104c0 13.255 10.745 24 24 24h176c13.255 0 24-10.745 24-24V83.882l78.243 78.243a6 6 0 0 1 1.757 4.243V426a6 6 0 0 1-6 6zM224 232c-48.523 0-88 39.477-88 88s39.477 88 88 88 88-39.477 88-88-39.477-88-88-88zm0 128c-22.056 0-40-17.944-40-40s17.944-40 40-40 40 17.944 40 40-17.944 40-40 40z"
      })), this.props.name === 'trash' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("svg", {
        width: "1792",
        height: "1792",
        viewBox: "0 0 1792 1792",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("path", {
        d: "M704 1376v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm256 0v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm256 0v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm-544-992h448l-48-117q-7-9-17-11h-317q-10 2-17 11zm928 32v64q0 14-9 23t-23 9h-96v948q0 83-47 143.5t-113 60.5h-832q-66 0-113-58.5t-47-141.5v-952h-96q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h309l70-167q15-37 54-63t79-26h320q40 0 79 26t54 63l70 167h309q14 0 23 9t9 23z"
      })), this.props.name === 'upload' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("svg", {
        width: "2048",
        height: "1792",
        viewBox: "0 0 2048 1792",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("path", {
        d: "M1344 864q0-14-9-23l-352-352q-9-9-23-9t-23 9l-351 351q-10 12-10 24 0 14 9 23t23 9h224v352q0 13 9.5 22.5t22.5 9.5h192q13 0 22.5-9.5t9.5-22.5v-352h224q13 0 22.5-9.5t9.5-22.5zm640 288q0 159-112.5 271.5t-271.5 112.5h-1088q-185 0-316.5-131.5t-131.5-316.5q0-130 70-240t188-165q-2-30-2-43 0-212 150-362t362-150q156 0 285.5 87t188.5 231q71-62 166-62 106 0 181 75t75 181q0 76-41 138 130 31 213.5 135.5t83.5 238.5z"
      })), this.props.name === "upload-a" && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("svg", {
        "aria-hidden": "true",
        focusable: "false",
        "data-prefix": "fas",
        "data-icon": "upload",
        className: "svg-inline--fa fa-upload fa-w-16",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 512 512"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("path", {
        fill: "currentColor",
        d: "M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
      })), this.props.name === 'user' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("svg", {
        width: "448",
        height: "512",
        viewBox: "0 0 448 512",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("path", {
        fill: "currentColor",
        d: "M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z",
        className: ""
      })), this.props.name === 'users' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("svg", {
        width: "640",
        height: "512",
        viewBox: "0 0 640 512",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("path", {
        fill: "currentColor",
        d: "M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"
      })), this.props.name === 'warning' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("svg", {
        width: "1792",
        height: "1792",
        viewBox: "0 0 1792 1792",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("path", {
        d: "M1024 1375v-190q0-14-9.5-23.5t-22.5-9.5h-192q-13 0-22.5 9.5t-9.5 23.5v190q0 14 9.5 23.5t22.5 9.5h192q13 0 22.5-9.5t9.5-23.5zm-2-374l18-459q0-12-10-19-13-11-24-11h-220q-11 0-24 11-10 7-10 21l17 457q0 10 10 16.5t24 6.5h185q14 0 23.5-6.5t10.5-16.5zm-14-934l768 1408q35 63-2 126-17 29-46.5 46t-63.5 17h-1536q-34 0-63.5-17t-46.5-46q-37-63-2-126l768-1408q17-31 47-49t65-18 65 18 47 49z"
      })));
    }
  }]);

  return Icon;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);

Icon.defaultProps = {
  big: false,
  baseline: false,
  onClick: function onClick() {}
};
Icon.propTypes = {
  name: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.string,
  big: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.bool,
  baseline: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.bool,
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.func
};
/* harmony default export */ __webpack_exports__["default"] = (Icon);

/***/ }),

/***/ "./src/react/components/Common/Inputs/FormSubmitButton/FormSubmitButton.js":
/*!*********************************************************************************!*\
  !*** ./src/react/components/Common/Inputs/FormSubmitButton/FormSubmitButton.js ***!
  \*********************************************************************************/
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



var FormSubmitButton = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(FormSubmitButton, _Component);

  var _super = _createSuper(FormSubmitButton);

  /**
   * Constructor
   * @param {Object} props
   */
  function FormSubmitButton(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, FormSubmitButton);

    _this = _super.call(this, props);

    _this.bindCallbacks();

    return _this;
  }
  /**
   * Bind callbacks methods
   * @return {void}
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(FormSubmitButton, [{
    key: "bindCallbacks",
    value: function bindCallbacks() {
      this.getClassName = this.getClassName.bind(this);
    }
    /**
     * Get the input button classname
     * @returns {string}
     */

  }, {
    key: "getClassName",
    value: function getClassName() {
      var name = 'button primary';

      if (this.props.warning) {
        name += ' warning';
      }

      if (this.props.disabled) {
        name += ' disabled';
      }

      if (this.props.processing) {
        name += ' processing';
      }

      if (this.props.big) {
        name += ' big';
      }

      return name;
    }
    /**
     * Render the component
     * @return {JSX}
     */

  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("input", {
        type: "submit",
        className: this.getClassName(),
        disabled: this.props.disabled,
        value: this.props.value || 'Save'
      });
    }
  }]);

  return FormSubmitButton;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);

FormSubmitButton.defaultProps = {
  warning: false
};
FormSubmitButton.propTypes = {
  processing: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.bool,
  disabled: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.bool,
  value: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.string,
  warning: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.bool,
  big: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.bool
};
/* harmony default export */ __webpack_exports__["default"] = (FormSubmitButton);

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

/***/ }),

/***/ "./src/react/lib/Common/Sanitize/sanitizeUrl.js":
/*!******************************************************!*\
  !*** ./src/react/lib/Common/Sanitize/sanitizeUrl.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SARL (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SARL (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.0.0
 */

/**
 * Sanitize a URI
 * Return 'safe' string or False if uri is not valid
 * Note that javascript: URI are never allowed
 *
 * @param {string} uri
 * @param {array<string>} [whitelistedProtocols] optional default ['https:','http:']
 * @returns {string|boolean}
 */
/* harmony default export */ __webpack_exports__["default"] = (function (uri, whitelistedProtocols) {
  // Wrong format.
  if (typeof uri === 'undefined' || typeof uri !== "string" || !uri.length) {
    return false;
  }

  if (!whitelistedProtocols || !Array.isArray(whitelistedProtocols)) {
    whitelistedProtocols = ['http:', 'https:'];
  }

  var blacklistedProtocols = ['javascript:'];

  try {
    var url = new URL(uri);

    if (blacklistedProtocols.includes(url.protocol)) {
      return false;
    }

    if (!whitelistedProtocols.includes(url.protocol)) {
      return false;
    }

    return url.href;
  } catch (error) {
    return false;
  }
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlYWN0LWV4dGVuc2lvbi9BcGlUcmlhZ2UuZW50cnkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlYWN0LWV4dGVuc2lvbi9BcGlUcmlhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlYWN0LWV4dGVuc2lvbi9jb21wb25lbnRzL0F1dGhlbnRpY2F0aW9uL0NoZWNrTWFpbEJveC9DaGVja01haWxCb3guanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlYWN0LWV4dGVuc2lvbi9jb21wb25lbnRzL0F1dGhlbnRpY2F0aW9uL0Rpc3BsYXlFcnJvci9EaXNwbGF5RXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlYWN0LWV4dGVuc2lvbi9jb21wb25lbnRzL0F1dGhlbnRpY2F0aW9uL0VudGVyTmFtZUZvcm0vRW50ZXJOYW1lRm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVhY3QtZXh0ZW5zaW9uL2NvbXBvbmVudHMvQXV0aGVudGljYXRpb24vRW50ZXJVc2VybmFtZUZvcm0vRW50ZXJVc2VybmFtZUZvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlYWN0LWV4dGVuc2lvbi9jb21wb25lbnRzL0F1dGhlbnRpY2F0aW9uTG9naW4vT3JjaGVzdHJhdGVBcGlUcmlhZ2UvT3JjaGVzdHJhdGVBcGlUcmlhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlYWN0LWV4dGVuc2lvbi9jb21wb25lbnRzL0Zvb3Rlci9Gb290ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlYWN0LWV4dGVuc2lvbi9jb250ZXh0cy9BcGlUcmlhZ2VDb250ZXh0LmpzIiwid2VicGFjazovLy8uL3NyYy9yZWFjdC1leHRlbnNpb24vY29udGV4dHMvQXBwQ29udGV4dC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVhY3QtZXh0ZW5zaW9uL2xpYi9FcnJvci9wYXNzYm9sdEFwaUZldGNoRXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlYWN0LWV4dGVuc2lvbi9saWIvRXJyb3IvcGFzc2JvbHRCYWRSZXNwb25zZUVycm9yLmpzIiwid2VicGFjazovLy8uL3NyYy9yZWFjdC1leHRlbnNpb24vbGliL0Vycm9yL3Bhc3Nib2x0U2VydmljZVVuYXZhaWxhYmxlRXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlYWN0LWV4dGVuc2lvbi9saWIvU2V0dGluZ3MvU2l0ZVNldHRpbmdzLmpzIiwid2VicGFjazovLy8uL3NyYy9yZWFjdC1leHRlbnNpb24vbGliL2FwaUNsaWVudC9hcGlDbGllbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlYWN0LWV4dGVuc2lvbi9saWIvYXBpQ2xpZW50L2FwaUNsaWVudE9wdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlYWN0LWV4dGVuc2lvbi9saWIvYXBpQ2xpZW50L2NzcmZUb2tlbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVhY3QvY29tcG9uZW50cy9Db21tb24vSWNvbnMvSWNvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVhY3QvY29tcG9uZW50cy9Db21tb24vSW5wdXRzL0Zvcm1TdWJtaXRCdXR0b24vRm9ybVN1Ym1pdEJ1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVhY3QvY29tcG9uZW50cy9Db21tb24vTG9hZGluZy9Mb2FkaW5nU3Bpbm5lci9Mb2FkaW5nU3Bpbm5lci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVhY3QvbGliL0NvbW1vbi9PYmplY3QvZ2V0UHJvcFZhbHVlLmpzIiwid2VicGFjazovLy8uL3NyYy9yZWFjdC9saWIvQ29tbW9uL1Nhbml0aXplL3Nhbml0aXplVXJsLmpzIl0sIm5hbWVzIjpbImFwcERvbUVsZW1lbnQiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJSZWFjdERPTSIsInJlbmRlciIsIkFwaVRyaWFnZSIsInByb3BzIiwic3RhdGUiLCJkZWZhdWx0U3RhdGUiLCJnZXRTaXRlU2V0dGluZ3MiLCJBcGlDbGllbnRPcHRpb25zIiwic2V0QmFzZVVybCIsInRydXN0ZWREb21haW4iLCJzZXRDc3JmVG9rZW4iLCJnZXRDc3JmVG9rZW4iLCJjb29raWUiLCJzcGxpdCIsImZpbmQiLCJyb3ciLCJzdGFydHNXaXRoIiwiYXBpQ2xpZW50T3B0aW9ucyIsImdldEFwaUNsaWVudE9wdGlvbnMiLCJzZXRSZXNvdXJjZU5hbWUiLCJhcGlDbGllbnQiLCJBcGlDbGllbnQiLCJmaW5kQWxsIiwic2l0ZVNldHRpbmdzIiwiU2l0ZVNldHRpbmdzIiwic2V0U3RhdGUiLCJiYXNlVXJsIiwiYmluZCIsImJhc2VFbGVtZW50IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJhdHRyaWJ1dGVzIiwiaHJlZiIsInZhbHVlIiwicmVwbGFjZSIsImNvbnNvbGUiLCJlcnJvciIsIkNvbXBvbmVudCIsIkNoZWNrTWFpbEJveCIsIkRpc3BsYXlFcnJvciIsImNvbnRleHQiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJhbnkiLCJ3aXRoQXBwQ29udGV4dCIsIkVudGVyTmFtZUZvcm0iLCJjcmVhdGVJbnB1dFJlZnMiLCJiaW5kRXZlbnRIYW5kbGVycyIsImxvYWRpbmciLCJmaXJzdG5hbWVSZWYiLCJjdXJyZW50IiwiZm9jdXMiLCJoYW5kbGVJbnB1dENoYW5nZSIsImhhbmRsZUZvcm1TdWJtaXQiLCJoYW5kbGVGaXJzdG5hbWVJbnB1dE9uS2V5VXAiLCJoYW5kbGVMYXN0bmFtZUlucHV0T25LZXlVcCIsIlJlYWN0IiwiY3JlYXRlUmVmIiwibGFzdG5hbWVSZWYiLCJldmVudCIsInRhcmdldCIsIm5hbWUiLCJoYXNBbHJlYWR5QmVlblZhbGlkYXRlZCIsInZhbGlkYXRlRmlyc3RuYW1lSW5wdXQiLCJ2YWxpZGF0ZUxhc3RuYW1lSW5wdXQiLCJwcmV2ZW50RGVmYXVsdCIsInByb2Nlc3NpbmciLCJ0b2dnbGVQcm9jZXNzaW5nIiwidmFsaWRhdGUiLCJoYXNWYWxpZGF0aW9uRXJyb3IiLCJmb2N1c0ZpcnN0RmllbGRFcnJvciIsImFwaVRyaWFnZUNvbnRleHQiLCJvblJlZ2lzdHJhdGlvblJlcXVlc3RlZCIsImZpcnN0bmFtZSIsImxhc3RuYW1lIiwicHJldiIsIlByb21pc2UiLCJhbGwiLCJmaXJzdG5hbWVFcnJvciIsInRyaW0iLCJsZW5ndGgiLCJsYXN0bmFtZUVycm9yIiwiaGFzQWxsSW5wdXREaXNhYmxlZCIsIm9iamVjdCIsIndpdGhBcGlUcmlhZ2VDb250ZXh0IiwiRW50ZXJVc2VybmFtZUZvcm0iLCJ1c2VybmFtZVJlZiIsImhhbmRsZVVzZXJuYW1lSW5wdXRPbktleVVwIiwidHlwZSIsImNoZWNrZWQiLCJ2YWxpZGF0ZVVzZXJuYW1lSW5wdXQiLCJvblRyaWFnZVJlcXVlc3RlZCIsInVzZXJuYW1lIiwidmFsaWRhdGVBZ3JlZWRUZXJtcyIsInVzZXJuYW1lRXJyb3IiLCJpc0VtYWlsIiwiaG9zdG5hbWVSZWdleHAiLCJlbWFpbFJlZ2V4cCIsInhyZWdleHAiLCJYUmVnRXhwIiwidGVzdCIsImFncmVlZFRlcm1zRXJyb3IiLCJtdXN0VmFsaWRhdGVUZXJtcyIsInByaXZhY3lMaW5rIiwidGVybXNMaW5rIiwiYWdyZWVkVGVybXMiLCJPcmNoZXN0cmF0ZUFwaVRyaWFnZSIsImluaXRpYWxpemVUcmlhZ2UiLCJzZXRUaW1lb3V0Iiwib25Jbml0aWFsaXplVHJpYWdlUmVxdWVzdGVkIiwiQXBpVHJpYWdlQ29udGV4dFN0YXRlIiwiVVNFUk5BTUVfU1RBVEUiLCJDSEVDS19NQUlMQk9YX1NUQVRFIiwiTkFNRV9TVEFURSIsIkVSUk9SX1NUQVRFIiwiQ1JFRElUU19VUkwiLCJVTlNBRkVfVVJMIiwiRm9vdGVyIiwiaXNSZWFkeSIsImlzVW5zYWZlTW9kZSIsInVuc2FmZVVybCIsInRlcm1zVXJsIiwicHJpdmFjeVVybCIsImNyZWRpdHNVcmwiLCJ2ZXJzaW9ucyIsInNlcnZlclZlcnNpb24iLCJ2ZXJzaW9uIiwicHVzaCIsImV4dGVuc2lvblZlcnNpb24iLCJqb2luIiwiZGVidWciLCJpc0h0dHBNb2RlIiwidXJsIiwic3RyaW5nIiwiQXBpVHJpYWdlQ29udGV4dCIsImNyZWF0ZUNvbnRleHQiLCJBcGlUcmlhZ2VDb250ZXh0UHJvdmlkZXIiLCJPYmplY3QiLCJhc3NpZ24iLCJ0cmlhZ2VEdG8iLCJjcmVhdGUiLCJ0aGVuIiwiaGFuZGxlVHJpYWdlU3VjY2VzcyIsImhhbmRsZVRyaWFnZUVycm9yIiwidXNlck5vdEZvdW5kIiwiZGF0YSIsImNvZGUiLCJpc1JlZ2lzdHJhdGlvblB1YmxpYyIsInJlZ2lzdHJhdGlvblB1YmxpYyIsImZpcnN0TmFtZSIsImxhc3ROYW1lIiwicmVnaXN0cmF0aW9uRHRvIiwicHJvZmlsZSIsImZpcnN0X25hbWUiLCJsYXN0X25hbWUiLCJoYW5kbGVSZWdpc3RyYXRpb25TdWNjZXNzIiwiaGFuZGxlUmVnaXN0cmF0aW9uRXJyb3IiLCJjaGlsZHJlbiIsIklOSVRJQUxfU1RBVEUiLCJXcmFwcGVkQ29tcG9uZW50IiwiTkFNRV9FUlJPUiIsIkFwcENvbnRleHQiLCJ1c2VyIiwidXNlcnMiLCJyb2xlcyIsInJlbWVtYmVyTWVPcHRpb25zIiwicmVzb3VyY2VzIiwicmVzb3VyY2UiLCJzaGFyZVJlc291cmNlcyIsInNlbGVjdGVkUmVzb3VyY2VzIiwic2VsZWN0ZWRVc2VyIiwiZm9sZGVycyIsInJlc291cmNlQ29tbWVudElkIiwibXVzdFJlZnJlc2hDb21tZW50cyIsInVzZXJTZXR0aW5ncyIsIlBhc3Nib2x0QXBpRmV0Y2hFcnJvciIsIm1lc3NhZ2UiLCJFcnJvciIsIlBhc3Nib2x0QmFkUmVzcG9uc2VFcnJvciIsIlBhc3Nib2x0U2VydmljZVVuYXZhaWxhYmxlRXJyb3IiLCJzZXR0aW5ncyIsInJlc3VsdCIsImNvbmZpZ1BhdGgiLCJwbHVnaW5TZXR0aW5ncyIsImdldFByb3BWYWx1ZSIsInBsdWdpbkVuYWJsZWQiLCJnZXRQbHVnaW5TZXR0aW5ncyIsIm9wdGlvbnMiLCJnZXRSZW1lbWJlck1lT3B0aW9ucyIsInNhbml0aXplVXJsIiwiZ2V0QmFzZVVybCIsIlR5cGVFcnJvciIsImdldFJlc291cmNlTmFtZSIsInJhd0Jhc2VVcmwiLCJ0b1N0cmluZyIsImVuZHNXaXRoIiwic2xpY2UiLCJVUkwiLCJ0eXBlRXJyb3IiLCJhcGlWZXJzaW9uIiwiY3JlZGVudGlhbHMiLCJoZWFkZXJzIiwiZ2V0RGVmYXVsdEhlYWRlcnMiLCJnZXRIZWFkZXJzIiwiaWQiLCJ1cmxPcHRpb25zIiwiYXNzZXJ0VmFsaWRJZCIsImJ1aWxkVXJsIiwiZmV0Y2hBbmRIYW5kbGVSZXNwb25zZSIsImRyeVJ1biIsImJvZHlTdHJpbmciLCJidWlsZEJvZHkiLCJtZXRob2QiLCJzdXBwb3J0ZWRNZXRob2RzIiwiaW5kZXhPZiIsIkpTT04iLCJzdHJpbmdpZnkiLCJ1cmxPYmoiLCJrZXkiLCJzZWFyY2hQYXJhbXMiLCJhcHBlbmQiLCJBcnJheSIsImlzQXJyYXkiLCJmb3JFYWNoIiwidiIsImVudHJpZXMiLCJhc3NlcnRVcmwiLCJhc3NlcnRNZXRob2QiLCJhc3NlcnRCb2R5IiwiZmV0Y2hPcHRpb25zIiwiYnVpbGRGZXRjaE9wdGlvbnMiLCJmZXRjaCIsInJlc3BvbnNlIiwianNvbiIsInJlc3BvbnNlSnNvbiIsIm9rIiwiaGVhZGVyIiwic3RhdHVzIiwiZSIsImNzcmZUb2tlbiIsIkNzcmZUb2tlbiIsInJlc291cmNlTmFtZSIsInRvRmV0Y2hIZWFkZXJzIiwidG9rZW4iLCJzZXRUb2tlbiIsIkljb24iLCJjbGFzc05hbWUiLCJiaWciLCJiYXNlbGluZSIsImdldENsYXNzTmFtZSIsIm9uQ2xpY2siLCJkZWZhdWx0UHJvcHMiLCJib29sIiwiZnVuYyIsIkZvcm1TdWJtaXRCdXR0b24iLCJiaW5kQ2FsbGJhY2tzIiwid2FybmluZyIsImRpc2FibGVkIiwiTG9hZGluZ1NwaW5uZXIiLCJ0aXRsZSIsIm9iaiIsInJlZHVjZSIsImFjY3VtdWxhdG9yIiwieCIsInVuZGVmaW5lZCIsInVyaSIsIndoaXRlbGlzdGVkUHJvdG9jb2xzIiwiYmxhY2tsaXN0ZWRQcm90b2NvbHMiLCJpbmNsdWRlcyIsInByb3RvY29sIl0sIm1hcHBp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LFFBQU12SSxHQUFHLEdBQUcsSUFBSWlFLEdBQUosQ0FBUW9FLEdBQVIsQ0FBWjs7QUFDQSxRQUFJRSxvQkFBb0IsQ0FBQ0MsUUFBckIsQ0FBOEJ4SSxHQUFHLENBQUN5SSxRQUFsQyxDQUFKLEVBQWlEO0FBQy9DLGFBQU8sS0FBUDtBQUNEOztBQUNELFFBQUksQ0FBQ0gsb0JBQW9CLENBQUNFLFFBQXJCLENBQThCeEksR0FBRyxDQUFDeUksUUFBbEMsQ0FBTCxFQUFrRDtBQUNoRCxhQUFPLEtBQVA7QUFDRDs7QUFDRCxXQUFPekksR0FBRyxDQUFDcEcsSUFBWDtBQUNELEdBVEQsQ0FTRSxPQUFPSSxLQUFQLEVBQWM7QUFDZCxXQUFPLEtBQVA7QUFDRDtBQUNGLENBdkJELEUiLCJmaWxlIjoiYXBpLXRyaWFnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJhcGktdHJpYWdlXCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goW1wiLi9zcmMvcmVhY3QtZXh0ZW5zaW9uL0FwaVRyaWFnZS5lbnRyeS5qc1wiLFwiYXBpLXZlbmRvcnNcIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCIvKipcbiAqIFBhc3Nib2x0IH4gT3BlbiBzb3VyY2UgcGFzc3dvcmQgbWFuYWdlciBmb3IgdGVhbXNcbiAqIENvcHlyaWdodCAoYykgMjAyMCBQYXNzYm9sdCBTQSAoaHR0cHM6Ly93d3cucGFzc2JvbHQuY29tKVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSB2ZXJzaW9uIDMgb2YgdGhlIG9yIGFueSBsYXRlciB2ZXJzaW9uLlxuICogRm9yIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2Ugc2VlIHRoZSBMSUNFTlNFLnR4dFxuICogUmVkaXN0cmlidXRpb25zIG9mIGZpbGVzIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLlxuICpcbiAqIEBjb3B5cmlnaHQgICAgIENvcHlyaWdodCAoYykgMjAyMCBQYXNzYm9sdCBTQSAoaHR0cHM6Ly93d3cucGFzc2JvbHQuY29tKVxuICogQGxpY2Vuc2UgICAgICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9BR1BMLTMuMCBBR1BMIExpY2Vuc2VcbiAqIEBsaW5rICAgICAgICAgIGh0dHBzOi8vd3d3LnBhc3Nib2x0LmNvbSBQYXNzYm9sdCh0bSlcbiAqL1xuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIjtcbmltcG9ydCBBcGlUcmlhZ2UgZnJvbSBcIi4vQXBpVHJpYWdlXCI7XG5cbi8qKlxuICogRW50cnkgcG9pbnQgLSBUcmlhZ2UgYXBwbGljYXRpb24gc2VydmVkIGJ5IHRoZSBBUEkuXG4gKiBUaGlzIGVudHJ5IHBvaW50IHdpbGwgYmUgdXNlZCB0byBjb21waWxlIHRoZSBwcm9kdWN0aW9uIGNvZGUgc2VlIHdlYnBhY2stYXBpLmNvbmZpZy5qc1xuICovXG5jb25zdCBhcHBEb21FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYXBwRG9tRWxlbWVudCk7XG5SZWFjdERPTS5yZW5kZXIoPEFwaVRyaWFnZS8+LCBhcHBEb21FbGVtZW50KTtcbiIsIi8qKlxuICogUGFzc2JvbHQgfiBPcGVuIHNvdXJjZSBwYXNzd29yZCBtYW5hZ2VyIGZvciB0ZWFtc1xuICogQ29weXJpZ2h0IChjKSAyMDIwIFBhc3Nib2x0IFNBIChodHRwczovL3d3dy5wYXNzYm9sdC5jb20pXG4gKlxuICogTGljZW5zZWQgdW5kZXIgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIHZlcnNpb24gMyBvZiB0aGUgb3IgYW55IGxhdGVyIHZlcnNpb24uXG4gKiBGb3IgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSBzZWUgdGhlIExJQ0VOU0UudHh0XG4gKiBSZWRpc3RyaWJ1dGlvbnMgb2YgZmlsZXMgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UuXG4gKlxuICogQGNvcHlyaWdodCAgICAgQ29weXJpZ2h0IChjKSAyMDIwIFBhc3Nib2x0IFNBIChodHRwczovL3d3dy5wYXNzYm9sdC5jb20pXG4gKiBAbGljZW5zZSAgICAgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL0FHUEwtMy4wIEFHUEwgTGljZW5zZVxuICogQGxpbmsgICAgICAgICAgaHR0cHM6Ly93d3cucGFzc2JvbHQuY29tIFBhc3Nib2x0KHRtKVxuICogQHNpbmNlICAgICAgICAgMy4wLjBcbiAqL1xuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBBcHBDb250ZXh0IGZyb20gXCIuL2NvbnRleHRzL0FwcENvbnRleHRcIjtcbmltcG9ydCB7QXBpQ2xpZW50T3B0aW9uc30gZnJvbSBcIi4vbGliL2FwaUNsaWVudC9hcGlDbGllbnRPcHRpb25zXCI7XG5pbXBvcnQgQXBpVHJpYWdlQ29udGV4dFByb3ZpZGVyIGZyb20gXCIuL2NvbnRleHRzL0FwaVRyaWFnZUNvbnRleHRcIjtcbmltcG9ydCBPcmNoZXN0cmF0ZUFwaVRyaWFnZSBmcm9tIFwiLi9jb21wb25lbnRzL0F1dGhlbnRpY2F0aW9uTG9naW4vT3JjaGVzdHJhdGVBcGlUcmlhZ2UvT3JjaGVzdHJhdGVBcGlUcmlhZ2VcIjtcbmltcG9ydCB7QXBpQ2xpZW50fSBmcm9tIFwiLi9saWIvYXBpQ2xpZW50L2FwaUNsaWVudFwiO1xuaW1wb3J0IFNpdGVTZXR0aW5ncyBmcm9tIFwiLi9saWIvU2V0dGluZ3MvU2l0ZVNldHRpbmdzXCI7XG5pbXBvcnQgRm9vdGVyIGZyb20gXCIuL2NvbXBvbmVudHMvRm9vdGVyL0Zvb3RlclwiO1xuXG4vKipcbiAqIFRoZSB0cmlhZ2UgYXBwbGljYXRpb24gc2VydmVkIGJ5IHRoZSBBUEkuXG4gKi9cbmNsYXNzIEFwaVRyaWFnZSBleHRlbmRzIENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBwcm9wcyBUaGUgY29tcG9uZW50IHByb3BzXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0gdGhpcy5kZWZhdWx0U3RhdGU7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY29tcG9uZW50IGRlZmF1bHQgc3RhdGVcbiAgICogQHJldHVybiB7b2JqZWN0fVxuICAgKi9cbiAgZ2V0IGRlZmF1bHRTdGF0ZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc2l0ZVNldHRpbmdzOiBudWxsLCAvLyBUaGUgc2l0ZSBzZXR0aW5nc1xuICAgICAgdHJ1c3RlZERvbWFpbjogdGhpcy5iYXNlVXJsLCAvLyBUaGUgc2l0ZSBkb21haW4gKHVzZSB0cnVzdGVkIGRvbWFpbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIGJyb3dzZXIgZXh0ZW5zaW9uIGFwcGxpY2F0aW9ucylcbiAgICAgIGdldEFwaUNsaWVudE9wdGlvbnM6IHRoaXMuZ2V0QXBpQ2xpZW50T3B0aW9ucy5iaW5kKHRoaXMpLCAvLyBHZXQgdGhlIGFwaSBjbGllbnQgb3B0aW9uc1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ29tcG9uZW50RGlkTW91bnRcbiAgICogSW52b2tlZCBpbW1lZGlhdGVseSBhZnRlciBjb21wb25lbnQgaXMgaW5zZXJ0ZWQgaW50byB0aGUgdHJlZVxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5nZXRTaXRlU2V0dGluZ3MoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGFwcGxpY2F0aW9uIGJhc2UgdXJsXG4gICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICovXG4gIGdldCBiYXNlVXJsKCkge1xuICAgIGNvbnN0IGJhc2VFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2Jhc2UnKSAmJiBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYmFzZScpWzBdO1xuICAgIGlmIChiYXNlRWxlbWVudCkge1xuICAgICAgcmV0dXJuIGJhc2VFbGVtZW50LmF0dHJpYnV0ZXMuaHJlZi52YWx1ZS5yZXBsYWNlKC9cXC8qJC9nLCAnJyk7XG4gICAgfVxuICAgIGNvbnNvbGUuZXJyb3IoXCJVbmFibGUgdG8gcmV0cmlldmUgdGhlIHBhZ2UgYmFzZSB0YWdcIik7XG4gICAgcmV0dXJuIFwiXCI7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBBUEkgY2xpZW50IG9wdGlvbnNcbiAgICogQHJldHVybnMge0FwaUNsaWVudE9wdGlvbnN9XG4gICAqL1xuICBnZXRBcGlDbGllbnRPcHRpb25zKCkge1xuICAgIHJldHVybiBuZXcgQXBpQ2xpZW50T3B0aW9ucygpXG4gICAgICAuc2V0QmFzZVVybCh0aGlzLnN0YXRlLnRydXN0ZWREb21haW4pXG4gICAgICAuc2V0Q3NyZlRva2VuKHRoaXMuZ2V0Q3NyZlRva2VuKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBjc3JmIHRva2VuXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBnZXRDc3JmVG9rZW4oKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNvb2tpZVxuICAgICAgLnNwbGl0KCc7ICcpXG4gICAgICAuZmluZChyb3cgPT4gcm93LnN0YXJ0c1dpdGgoJ2NzcmZUb2tlbicpKVxuICAgICAgLnNwbGl0KCc9JylbMV07XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmUgdGhlIHNpdGUgc2V0dGluZ3NcbiAgICogQHJldHVybnMge1Byb21pc2U8U2l0ZVNldHRpbmdzPn1cbiAgICovXG4gIGFzeW5jIGdldFNpdGVTZXR0aW5ncygpIHtcbiAgICBjb25zdCBhcGlDbGllbnRPcHRpb25zID0gdGhpcy5nZXRBcGlDbGllbnRPcHRpb25zKClcbiAgICAgIC5zZXRSZXNvdXJjZU5hbWUoXCJzZXR0aW5nc1wiKTtcbiAgICBjb25zdCBhcGlDbGllbnQgPSBuZXcgQXBpQ2xpZW50KGFwaUNsaWVudE9wdGlvbnMpO1xuICAgIGNvbnN0IHtib2R5fSA9IGF3YWl0IGFwaUNsaWVudC5maW5kQWxsKCk7XG4gICAgY29uc3Qgc2l0ZVNldHRpbmdzID0gbmV3IFNpdGVTZXR0aW5ncyhib2R5KTtcbiAgICBhd2FpdCB0aGlzLnNldFN0YXRlKHtzaXRlU2V0dGluZ3N9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW5kZXIgdGhlIGNvbXBvbmVudFxuICAgKiBAcmV0dXJucyB7SlNYfVxuICAgKi9cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8QXBwQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17dGhpcy5zdGF0ZX0+XG4gICAgICAgIDxkaXYgaWQ9XCJjb250YWluZXJcIiBjbGFzc05hbWU9XCJjb250YWluZXIgcGFnZSBsb2dpblwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXJcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsb2dvXCI+PHNwYW4gY2xhc3NOYW1lPVwidmlzdWFsbHktaGlkZGVuXCI+UGFzc2JvbHQ8L3NwYW4+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibG9naW4tZm9ybVwiPlxuICAgICAgICAgICAgICA8QXBpVHJpYWdlQ29udGV4dFByb3ZpZGVyPlxuICAgICAgICAgICAgICAgIDxPcmNoZXN0cmF0ZUFwaVRyaWFnZS8+XG4gICAgICAgICAgICAgIDwvQXBpVHJpYWdlQ29udGV4dFByb3ZpZGVyPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8Rm9vdGVyIHNpdGVTZXR0aW5ncz17dGhpcy5zdGF0ZS5zaXRlU2V0dGluZ3N9Lz5cbiAgICAgIDwvQXBwQ29udGV4dC5Qcm92aWRlcj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFwaVRyaWFnZTtcbiIsIi8qKlxuICogUGFzc2JvbHQgfiBPcGVuIHNvdXJjZSBwYXNzd29yZCBtYW5hZ2VyIGZvciB0ZWFtc1xuICogQ29weXJpZ2h0IChjKSAyMDIwIFBhc3Nib2x0IFNBIChodHRwczovL3d3dy5wYXNzYm9sdC5jb20pXG4gKlxuICogTGljZW5zZWQgdW5kZXIgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIHZlcnNpb24gMyBvZiB0aGUgb3IgYW55IGxhdGVyIHZlcnNpb24uXG4gKiBGb3IgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSBzZWUgdGhlIExJQ0VOU0UudHh0XG4gKiBSZWRpc3RyaWJ1dGlvbnMgb2YgZmlsZXMgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UuXG4gKlxuICogQGNvcHlyaWdodCAgICAgQ29weXJpZ2h0IChjKSAyMDIwIFBhc3Nib2x0IFNBIChodHRwczovL3d3dy5wYXNzYm9sdC5jb20pXG4gKiBAbGljZW5zZSAgICAgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL0FHUEwtMy4wIEFHUEwgTGljZW5zZVxuICogQGxpbmsgICAgICAgICAgaHR0cHM6Ly93d3cucGFzc2JvbHQuY29tIFBhc3Nib2x0KHRtKVxuICogQHNpbmNlICAgICAgICAgMy4wLjBcbiAqL1xuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tIFwicmVhY3RcIjtcblxuY2xhc3MgQ2hlY2tNYWlsQm94IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIFJlbmRlciB0aGUgY29tcG9uZW50XG4gICAqIEByZXR1cm5zIHtKU1h9XG4gICAqL1xuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZW1haWwtc2VudC1pbnN0cnVjdGlvbnNcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJlbWFpbC1zZW50LWJnXCI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8aDE+Q2hlY2sgeW91ciBtYWlsYm94ITwvaDE+XG4gICAgICAgIDxwPldlIHNlbmQgeW91IGEgbGluayB0byB2ZXJpZnkgeW91ciBlbWFpbC48YnIvPlxuICAgICAgICAgIENoZWNrIHlvdXIgc3BhbSBmb2xkZXIgaWYgeW91IGRvIG5vdCBzZWUgaGVhciBmcm9tIHVzIGFmdGVyIGEgd2hpbGUuPC9wPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDaGVja01haWxCb3g7XG4iLCIvKipcbiAqIFBhc3Nib2x0IH4gT3BlbiBzb3VyY2UgcGFzc3dvcmQgbWFuYWdlciBmb3IgdGVhbXNcbiAqIENvcHlyaWdodCAoYykgMjAyMCBQYXNzYm9sdCBTQSAoaHR0cHM6Ly93d3cucGFzc2JvbHQuY29tKVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSB2ZXJzaW9uIDMgb2YgdGhlIG9yIGFueSBsYXRlciB2ZXJzaW9uLlxuICogRm9yIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2Ugc2VlIHRoZSBMSUNFTlNFLnR4dFxuICogUmVkaXN0cmlidXRpb25zIG9mIGZpbGVzIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLlxuICpcbiAqIEBjb3B5cmlnaHQgICAgIENvcHlyaWdodCAoYykgMjAyMCBQYXNzYm9sdCBTQSAoaHR0cHM6Ly93d3cucGFzc2JvbHQuY29tKVxuICogQGxpY2Vuc2UgICAgICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9BR1BMLTMuMCBBR1BMIExpY2Vuc2VcbiAqIEBsaW5rICAgICAgICAgIGh0dHBzOi8vd3d3LnBhc3Nib2x0LmNvbSBQYXNzYm9sdCh0bSlcbiAqIEBzaW5jZSAgICAgICAgIDMuMC4wXG4gKi9cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQge3dpdGhBcHBDb250ZXh0fSBmcm9tIFwiLi4vLi4vLi4vY29udGV4dHMvQXBwQ29udGV4dFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuXG5jbGFzcyBEaXNwbGF5RXJyb3IgZXh0ZW5kcyBDb21wb25lbnQge1xuICAvKipcbiAgICogUmVuZGVyIHRoZSBjb21wb25lbnRcbiAgICogQHJldHVybnMge0pTWH1cbiAgICovXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZXR1cC1lcnJvclwiPlxuICAgICAgICA8aDE+QWNjZXNzIHRvIHRoaXMgc2VydmljZSByZXF1aXJlcyBhbiBpbnZpdGF0aW9uLjwvaDE+XG4gICAgICAgIDxwPlRoaXMgZW1haWwgaXMgbm90IGFzc29jaWF0ZWQgd2l0aCBhbnkgYXBwcm92ZWQgdXNlcnMgb24gdGhpcyBkb21haW4uIFBsZWFzZSBjb250YWN0IHlvdXIgYWRtaW5pc3RyYXRvciB0byByZXF1ZXN0IGFuIGludml0YXRpb24gbGluay48L3A+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1hY3Rpb25zXCI+XG4gICAgICAgICAgPGEgaHJlZj17YCR7dGhpcy5wcm9wcy5jb250ZXh0LnRydXN0ZWREb21haW59L3VzZXJzL3JlY292ZXJgfSBjbGFzc05hbWU9XCJidXR0b24gcHJpbWFyeSBiaWdcIiByb2xlPVwiYnV0dG9uXCI+VHJ5IHdpdGggYW5vdGhlciBlbWFpbDwvYT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkRpc3BsYXlFcnJvci5wcm9wVHlwZXMgPSB7XG4gIGNvbnRleHQ6IFByb3BUeXBlcy5hbnksIC8vIFRoZSBhcHBsaWNhdGlvbiBjb250ZXh0XG59O1xuZXhwb3J0IGRlZmF1bHQgd2l0aEFwcENvbnRleHQoRGlzcGxheUVycm9yKTtcbiIsIi8qKlxuICogUGFzc2JvbHQgfiBPcGVuIHNvdXJjZSBwYXNzd29yZCBtYW5hZ2VyIGZvciB0ZWFtc1xuICogQ29weXJpZ2h0IChjKSAyMDIwIFBhc3Nib2x0IFNBIChodHRwczovL3d3dy5wYXNzYm9sdC5jb20pXG4gKlxuICogTGljZW5zZWQgdW5kZXIgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIHZlcnNpb24gMyBvZiB0aGUgb3IgYW55IGxhdGVyIHZlcnNpb24uXG4gKiBGb3IgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSBzZWUgdGhlIExJQ0VOU0UudHh0XG4gKiBSZWRpc3RyaWJ1dGlvbnMgb2YgZmlsZXMgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UuXG4gKlxuICogQGNvcHlyaWdodCAgICAgQ29weXJpZ2h0IChjKSAyMDIwIFBhc3Nib2x0IFNBIChodHRwczovL3d3dy5wYXNzYm9sdC5jb20pXG4gKiBAbGljZW5zZSAgICAgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL0FHUEwtMy4wIEFHUEwgTGljZW5zZVxuICogQGxpbmsgICAgICAgICAgaHR0cHM6Ly93d3cucGFzc2JvbHQuY29tIFBhc3Nib2x0KHRtKVxuICogQHNpbmNlICAgICAgICAgMy4wLjBcbiAqL1xuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCB7d2l0aEFwcENvbnRleHR9IGZyb20gXCIuLi8uLi8uLi9jb250ZXh0cy9BcHBDb250ZXh0XCI7XG5pbXBvcnQge3dpdGhBcGlUcmlhZ2VDb250ZXh0fSBmcm9tIFwiLi4vLi4vLi4vY29udGV4dHMvQXBpVHJpYWdlQ29udGV4dFwiO1xuaW1wb3J0IEZvcm1TdWJtaXRCdXR0b24gZnJvbSBcIi4uLy4uLy4uLy4uL3JlYWN0L2NvbXBvbmVudHMvQ29tbW9uL0lucHV0cy9Gb3JtU3VibWl0QnV0dG9uL0Zvcm1TdWJtaXRCdXR0b25cIjtcblxuY2xhc3MgRW50ZXJOYW1lRm9ybSBleHRlbmRzIENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHNcbiAgICovXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB0aGlzLmRlZmF1bHRTdGF0ZTtcbiAgICB0aGlzLmNyZWF0ZUlucHV0UmVmcygpO1xuICAgIHRoaXMuYmluZEV2ZW50SGFuZGxlcnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21wb25lbnREaWRNb3VudFxuICAgKiBJbnZva2VkIGltbWVkaWF0ZWx5IGFmdGVyIGNvbXBvbmVudCBpcyBpbnNlcnRlZCBpbnRvIHRoZSB0cmVlXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtsb2FkaW5nOiBmYWxzZX0sICgpID0+IHtcbiAgICAgIHRoaXMuZmlyc3RuYW1lUmVmLmN1cnJlbnQuZm9jdXMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgZGVmYXVsdCBzdGF0ZVxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIGdldCBkZWZhdWx0U3RhdGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGxvYWRpbmc6IHRydWUsXG4gICAgICBwcm9jZXNzaW5nOiBmYWxzZSxcblxuICAgICAgZmlyc3RuYW1lOiBcIlwiLFxuICAgICAgZmlyc3RuYW1lRXJyb3I6IG51bGwsXG4gICAgICBsYXN0bmFtZTogXCJcIixcbiAgICAgIGxhc3RuYW1lRXJyb3I6IG51bGwsXG5cbiAgICAgIGhhc0FscmVhZHlCZWVuVmFsaWRhdGVkOiBmYWxzZSAvLyBUcnVlIGlmIHRoZSBmb3JtIGhhcyBhbHJlYWR5IGJlZW4gc3VibWl0dGVkIG9uY2VcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEJpbmQgZXZlbnQgaGFuZGxlcnNcbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuICBiaW5kRXZlbnRIYW5kbGVycygpIHtcbiAgICB0aGlzLmhhbmRsZUlucHV0Q2hhbmdlID0gdGhpcy5oYW5kbGVJbnB1dENoYW5nZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlRm9ybVN1Ym1pdCA9IHRoaXMuaGFuZGxlRm9ybVN1Ym1pdC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlRmlyc3RuYW1lSW5wdXRPbktleVVwID0gdGhpcy5oYW5kbGVGaXJzdG5hbWVJbnB1dE9uS2V5VXAuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZUxhc3RuYW1lSW5wdXRPbktleVVwID0gdGhpcy5oYW5kbGVMYXN0bmFtZUlucHV0T25LZXlVcC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSByZWZlcmVuY2VzXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cbiAgY3JlYXRlSW5wdXRSZWZzKCkge1xuICAgIHRoaXMuZmlyc3RuYW1lUmVmID0gUmVhY3QuY3JlYXRlUmVmKCk7XG4gICAgdGhpcy5sYXN0bmFtZVJlZiA9IFJlYWN0LmNyZWF0ZVJlZigpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZSBmb3JtIGlucHV0IGNoYW5nZXMuXG4gICAqIEBwYXJhbXMge1JlYWN0RXZlbnR9IFRoZSByZWFjdCBldmVudFxuICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICovXG4gIGhhbmRsZUlucHV0Q2hhbmdlKGV2ZW50KSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgIGNvbnN0IHZhbHVlID0gdGFyZ2V0LnZhbHVlO1xuICAgIGNvbnN0IG5hbWUgPSB0YXJnZXQubmFtZTtcbiAgICB0aGlzLnNldFN0YXRlKHtbbmFtZV06IHZhbHVlfSk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlIGZpcnN0bmFtZSBpbnB1dCBrZXlVcCBldmVudC5cbiAgICovXG4gIGhhbmRsZUZpcnN0bmFtZUlucHV0T25LZXlVcCgpIHtcbiAgICBpZiAodGhpcy5zdGF0ZS5oYXNBbHJlYWR5QmVlblZhbGlkYXRlZCkge1xuICAgICAgY29uc3Qgc3RhdGUgPSB0aGlzLnZhbGlkYXRlRmlyc3RuYW1lSW5wdXQoKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGUgZmlyc3RuYW1lIGlucHV0IGtleVVwIGV2ZW50LlxuICAgKi9cbiAgaGFuZGxlTGFzdG5hbWVJbnB1dE9uS2V5VXAoKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUuaGFzQWxyZWFkeUJlZW5WYWxpZGF0ZWQpIHtcbiAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy52YWxpZGF0ZUxhc3RuYW1lSW5wdXQoKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGUgZm9ybSBzdWJtaXQgZXZlbnQuXG4gICAqIEBwYXJhbXMge1JlYWN0RXZlbnR9IFRoZSByZWFjdCBldmVudFxuICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICovXG4gIGFzeW5jIGhhbmRsZUZvcm1TdWJtaXQoZXZlbnQpIHtcbiAgICAvLyBBdm9pZCB0aGUgZm9ybSB0byBiZSBzdWJtaXR0ZWQuXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIGF3YWl0IHRoaXMuc2V0U3RhdGUoe2hhc0FscmVhZHlCZWVuVmFsaWRhdGVkOiB0cnVlfSk7XG5cbiAgICAvLyBEbyBub3QgcmUtc3VibWl0IGFuIGFscmVhZHkgcHJvY2Vzc2luZyBmb3JtXG4gICAgaWYgKCF0aGlzLnN0YXRlLnByb2Nlc3NpbmcpIHtcbiAgICAgIGF3YWl0IHRoaXMudG9nZ2xlUHJvY2Vzc2luZygpO1xuICAgICAgYXdhaXQgdGhpcy52YWxpZGF0ZSgpO1xuXG4gICAgICBpZiAodGhpcy5oYXNWYWxpZGF0aW9uRXJyb3IoKSkge1xuICAgICAgICBhd2FpdCB0aGlzLnRvZ2dsZVByb2Nlc3NpbmcoKTtcbiAgICAgICAgdGhpcy5mb2N1c0ZpcnN0RmllbGRFcnJvcigpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGF3YWl0IHRoaXMucHJvcHMuYXBpVHJpYWdlQ29udGV4dC5vblJlZ2lzdHJhdGlvblJlcXVlc3RlZCh0aGlzLnN0YXRlLmZpcnN0bmFtZSwgdGhpcy5zdGF0ZS5sYXN0bmFtZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZSBwcm9jZXNzaW5nIHN0YXRlXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuICAgKi9cbiAgYXN5bmMgdG9nZ2xlUHJvY2Vzc2luZygpIHtcbiAgICBjb25zdCBwcmV2ID0gdGhpcy5zdGF0ZS5wcm9jZXNzaW5nO1xuICAgIHJldHVybiB0aGlzLnNldFN0YXRlKHtwcm9jZXNzaW5nOiAhcHJldn0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFZhbGlkYXRlIHRoZSBmb3JtLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxib29sZWFuPn1cbiAgICovXG4gIGFzeW5jIHZhbGlkYXRlKCkge1xuICAgIGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIHRoaXMudmFsaWRhdGVGaXJzdG5hbWVJbnB1dCgpLFxuICAgICAgdGhpcy52YWxpZGF0ZUxhc3RuYW1lSW5wdXQoKSxcbiAgICBdKTtcbiAgICByZXR1cm4gdGhpcy5oYXNWYWxpZGF0aW9uRXJyb3IoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWYWxpZGF0ZSB0aGUgZmlyc3RuYW1lIGlucHV0LlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAgICovXG4gIGFzeW5jIHZhbGlkYXRlRmlyc3RuYW1lSW5wdXQoKSB7XG4gICAgbGV0IGZpcnN0bmFtZUVycm9yID0gbnVsbDtcbiAgICBjb25zdCBmaXJzdG5hbWUgPSB0aGlzLnN0YXRlLmZpcnN0bmFtZS50cmltKCk7XG4gICAgaWYgKCFmaXJzdG5hbWUubGVuZ3RoKSB7XG4gICAgICBmaXJzdG5hbWVFcnJvciA9IFwiQSBmaXJzdCBuYW1lIGlzIHJlcXVpcmVkLlwiO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5zZXRTdGF0ZSh7Zmlyc3RuYW1lRXJyb3J9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWYWxpZGF0ZSB0aGUgZmlyc3RuYW1lIGlucHV0LlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAgICovXG4gIGFzeW5jIHZhbGlkYXRlTGFzdG5hbWVJbnB1dCgpIHtcbiAgICBsZXQgbGFzdG5hbWVFcnJvciA9IG51bGw7XG4gICAgY29uc3QgbGFzdG5hbWUgPSB0aGlzLnN0YXRlLmxhc3RuYW1lLnRyaW0oKTtcbiAgICBpZiAoIWxhc3RuYW1lLmxlbmd0aCkge1xuICAgICAgbGFzdG5hbWVFcnJvciA9IFwiQSBsYXN0IG5hbWUgaXMgcmVxdWlyZWQuXCI7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnNldFN0YXRlKHtsYXN0bmFtZUVycm9yfSk7XG4gIH1cblxuICAvKipcbiAgICogRm9jdXMgdGhlIGZpcnN0IGZpZWxkIG9mIHRoZSBmb3JtIHdoaWNoIGlzIGluIGVycm9yIHN0YXRlLlxuICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICovXG4gIGZvY3VzRmlyc3RGaWVsZEVycm9yKCkge1xuICAgIGlmICh0aGlzLnN0YXRlLmZpcnN0bmFtZUVycm9yKSB7XG4gICAgICB0aGlzLmZpcnN0bmFtZVJlZi5jdXJyZW50LmZvY3VzKCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnN0YXRlLmxhc3RuYW1lRXJyb3IpIHtcbiAgICAgIHRoaXMubGFzdG5hbWVSZWYuY3VycmVudC5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgZm9ybSBoYXMgc29tZSB2YWxpZGF0aW9uIGVycm9yXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgaGFzVmFsaWRhdGlvbkVycm9yKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLmZpcnN0bmFtZUVycm9yICE9PSBudWxsIHx8IHRoaXMuc3RhdGUubGFzdG5hbWVFcnJvciAhPT0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG91bGQgaW5wdXQgYmUgZGlzYWJsZWQ/IFRydWUgaWYgc3RhdGUgaXMgbG9hZGluZyBvciBwcm9jZXNzaW5nXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgaGFzQWxsSW5wdXREaXNhYmxlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5wcm9jZXNzaW5nIHx8IHRoaXMuc3RhdGUubG9hZGluZztcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJlbnRlci1uYW1lXCI+XG4gICAgICAgIDxoMT5OZXcgaGVyZT8gRW50ZXIgeW91ciBlbWFpbCB0byBnZXQgc3RhcnRlZC48L2gxPlxuICAgICAgICA8Zm9ybSBhY2NlcHRDaGFyc2V0PVwidXRmLThcIiBvblN1Ym1pdD17dGhpcy5oYW5kbGVGb3JtU3VibWl0fSBub1ZhbGlkYXRlPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgaW5wdXQgdGV4dCByZXF1aXJlZCAke3RoaXMuc3RhdGUuZmlyc3RuYW1lRXJyb3IgPyBcImVycm9yXCIgOiBcIlwifWB9PlxuICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJmaXJzdG5hbWVcIj5GaXJzdCBOYW1lPC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCBpZD1cImZpcnN0bmFtZS1pbnB1dFwiIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImZpcnN0bmFtZVwiIHJlZj17dGhpcy5maXJzdG5hbWVSZWZ9IHZhbHVlPXt0aGlzLnN0YXRlLmZpcnN0bmFtZX1cbiAgICAgICAgICAgICAgb25LZXlVcD17dGhpcy5oYW5kbGVGaXJzdG5hbWVJbnB1dE9uS2V5VXB9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUlucHV0Q2hhbmdlfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5oYXNBbGxJbnB1dERpc2FibGVkKCl9IHBsYWNlaG9sZGVyPVwiZmlyc3QgbmFtZVwiIHJlcXVpcmVkPVwicmVxdWlyZWRcIi8+XG4gICAgICAgICAgICB7dGhpcy5zdGF0ZS5maXJzdG5hbWVFcnJvciAmJlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJlcnJvci1tZXNzYWdlXCI+e3RoaXMuc3RhdGUuZmlyc3RuYW1lRXJyb3J9PC9kaXY+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BpbnB1dCB0ZXh0IHJlcXVpcmVkICR7dGhpcy5zdGF0ZS5sYXN0bmFtZUVycm9yID8gXCJlcnJvclwiIDogXCJcIn1gfT5cbiAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwibGFzdG5hbWVcIj5MYXN0IE5hbWU8L2xhYmVsPlxuICAgICAgICAgICAgPGlucHV0IGlkPVwibGFzdG5hbWUtaW5wdXRcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJsYXN0bmFtZVwiIHJlZj17dGhpcy5sYXN0bmFtZVJlZn0gdmFsdWU9e3RoaXMuc3RhdGUubGFzdG5hbWV9XG4gICAgICAgICAgICAgIG9uS2V5VXA9e3RoaXMuaGFuZGxlTGFzdG5hbWVJbnB1dE9uS2V5VXB9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUlucHV0Q2hhbmdlfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5oYXNBbGxJbnB1dERpc2FibGVkKCl9IHBsYWNlaG9sZGVyPVwibGFzdCBuYW1lXCIgcmVxdWlyZWQ9XCJyZXF1aXJlZFwiLz5cbiAgICAgICAgICAgIHt0aGlzLnN0YXRlLmxhc3RuYW1lRXJyb3IgJiZcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZXJyb3ItbWVzc2FnZVwiPnt0aGlzLnN0YXRlLmxhc3RuYW1lRXJyb3J9PC9kaXY+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWFjdGlvbnNcIj5cbiAgICAgICAgICAgIDxGb3JtU3VibWl0QnV0dG9uIGRpc2FibGVkPXt0aGlzLmhhc0FsbElucHV0RGlzYWJsZWQoKX0gYmlnPXt0cnVlfSBwcm9jZXNzaW5nPXt0aGlzLnN0YXRlLnByb2Nlc3Npbmd9IHZhbHVlPVwiUmVnaXN0ZXJcIi8+XG4gICAgICAgICAgICA8YSBocmVmPXtgJHt0aGlzLnByb3BzLmNvbnRleHQudHJ1c3RlZERvbWFpbn0vYXV0aC9sb2dpbmB9PkkgYWxyZWFkeSBoYXZlIGFuIGFjY291bnQ8L2E+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZm9ybT5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuRW50ZXJOYW1lRm9ybS5wcm9wVHlwZXMgPSB7XG4gIGFwaVRyaWFnZUNvbnRleHQ6IFByb3BUeXBlcy5vYmplY3QsIC8vIFRoZSBhcGkgdHJpYWdlIGNvbnRleHRcbiAgY29udGV4dDogUHJvcFR5cGVzLmFueSwgLy8gVGhlIGFwcGxpY2F0aW9uIGNvbnRleHQgcHJvdmlkZXJcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhBcHBDb250ZXh0KHdpdGhBcGlUcmlhZ2VDb250ZXh0KEVudGVyTmFtZUZvcm0pKTtcbiIsIi8qKlxuICogUGFzc2JvbHQgfiBPcGVuIHNvdXJjZSBwYXNzd29yZCBtYW5hZ2VyIGZvciB0ZWFtc1xuICogQ29weXJpZ2h0IChjKSAyMDIwIFBhc3Nib2x0IFNBIChodHRwczovL3d3dy5wYXNzYm9sdC5jb20pXG4gKlxuICogTGljZW5zZWQgdW5kZXIgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIHZlcnNpb24gMyBvZiB0aGUgb3IgYW55IGxhdGVyIHZlcnNpb24uXG4gKiBGb3IgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSBzZWUgdGhlIExJQ0VOU0UudHh0XG4gKiBSZWRpc3RyaWJ1dGlvbnMgb2YgZmlsZXMgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UuXG4gKlxuICogQGNvcHlyaWdodCAgICAgQ29weXJpZ2h0IChjKSAyMDIwIFBhc3Nib2x0IFNBIChodHRwczovL3d3dy5wYXNzYm9sdC5jb20pXG4gKiBAbGljZW5zZSAgICAgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL0FHUEwtMy4wIEFHUEwgTGljZW5zZVxuICogQGxpbmsgICAgICAgICAgaHR0cHM6Ly93d3cucGFzc2JvbHQuY29tIFBhc3Nib2x0KHRtKVxuICogQHNpbmNlICAgICAgICAgMy4wLjBcbiAqL1xuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBYUmVnRXhwIGZyb20gXCJ4cmVnZXhwXCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQge3dpdGhBcHBDb250ZXh0fSBmcm9tIFwiLi4vLi4vLi4vY29udGV4dHMvQXBwQ29udGV4dFwiO1xuaW1wb3J0IHt3aXRoQXBpVHJpYWdlQ29udGV4dH0gZnJvbSBcIi4uLy4uLy4uL2NvbnRleHRzL0FwaVRyaWFnZUNvbnRleHRcIjtcbmltcG9ydCBGb3JtU3VibWl0QnV0dG9uIGZyb20gXCIuLi8uLi8uLi8uLi9yZWFjdC9jb21wb25lbnRzL0NvbW1vbi9JbnB1dHMvRm9ybVN1Ym1pdEJ1dHRvbi9Gb3JtU3VibWl0QnV0dG9uXCI7XG5cbmNsYXNzIEVudGVyVXNlcm5hbWVGb3JtIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wc1xuICAgKi9cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHRoaXMuZGVmYXVsdFN0YXRlO1xuICAgIHRoaXMuY3JlYXRlSW5wdXRSZWZzKCk7XG4gICAgdGhpcy5iaW5kRXZlbnRIYW5kbGVycygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBkZWZhdWx0IHN0YXRlXG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgZ2V0IGRlZmF1bHRTdGF0ZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbG9hZGluZzogdHJ1ZSxcbiAgICAgIHByb2Nlc3Npbmc6IGZhbHNlLFxuICAgICAgdXNlcm5hbWU6IFwiXCIsXG4gICAgICB1c2VybmFtZUVycm9yOiBudWxsLFxuICAgICAgYWdyZWVkVGVybXM6IGZhbHNlLFxuICAgICAgYWdyZWVkVGVybXNFcnJvcjogbnVsbCxcbiAgICAgIGhhc0FscmVhZHlCZWVuVmFsaWRhdGVkOiBmYWxzZSAvLyBUcnVlIGlmIHRoZSBmb3JtIGhhcyBhbHJlYWR5IGJlZW4gc3VibWl0dGVkIG9uY2VcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIENvbXBvbmVudERpZE1vdW50XG4gICAqIEludm9rZWQgaW1tZWRpYXRlbHkgYWZ0ZXIgY29tcG9uZW50IGlzIGluc2VydGVkIGludG8gdGhlIHRyZWVcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGlmICh0aGlzLnByb3BzLmNvbnRleHQuc2l0ZVNldHRpbmdzICE9PSBudWxsKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtsb2FkaW5nOiBmYWxzZX0sICgpID0+IHtcbiAgICAgICAgdGhpcy51c2VybmFtZVJlZi5jdXJyZW50LmZvY3VzKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogY29tcG9uZW50RGlkVXBkYXRlXG4gICAqIEludm9rZWQgaW1tZWRpYXRlbHkgYWZ0ZXIgY29tcG9uZW50IGlzIHVwZGF0ZWRcbiAgICogQHBhcmFtIHtvYmplY3R9IHByZXZpb3VzUHJvcHMgVGhlIHByZXZpb3VzIHByb3BzXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuICBhc3luYyBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgLy8gSWYgdGhlIGNvbXBvbmVudCBpcyBzdGlsbCBtYXJrZWQgYXMgbG9hZGluZyB3aGVuIHRoZSBzaXRlIHNldHRpbmdzIGFyZSByZXRyaWV2ZWQsIG1hcmsgaXQgYXMgbG9hZGVkIGFuZCBwdXQgdGhlIGZvY3VzIG9uIHRoZSB1c2VybmFtZSBmaWVsZFxuICAgIGlmICh0aGlzLnN0YXRlLmxvYWRpbmcgJiYgdGhpcy5wcm9wcy5jb250ZXh0LnNpdGVTZXR0aW5ncyAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7bG9hZGluZzogZmFsc2V9LCAoKSA9PiB7XG4gICAgICAgIHRoaXMudXNlcm5hbWVSZWYuY3VycmVudC5mb2N1cygpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEJpbmQgZXZlbnQgaGFuZGxlcnNcbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuICBiaW5kRXZlbnRIYW5kbGVycygpIHtcbiAgICB0aGlzLmhhbmRsZUlucHV0Q2hhbmdlID0gdGhpcy5oYW5kbGVJbnB1dENoYW5nZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlRm9ybVN1Ym1pdCA9IHRoaXMuaGFuZGxlRm9ybVN1Ym1pdC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlVXNlcm5hbWVJbnB1dE9uS2V5VXAgPSB0aGlzLmhhbmRsZVVzZXJuYW1lSW5wdXRPbktleVVwLmJpbmQodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIHJlZmVyZW5jZXNcbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuICBjcmVhdGVJbnB1dFJlZnMoKSB7XG4gICAgdGhpcy51c2VybmFtZVJlZiA9IFJlYWN0LmNyZWF0ZVJlZigpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZSBmb3JtIGlucHV0IGNoYW5nZXMuXG4gICAqIEBwYXJhbXMge1JlYWN0RXZlbnR9IFRoZSByZWFjdCBldmVudFxuICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICovXG4gIGhhbmRsZUlucHV0Q2hhbmdlKGV2ZW50KSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgIGNvbnN0IHZhbHVlID0gdGFyZ2V0LnR5cGUgPT09IFwiY2hlY2tib3hcIiA/IHRhcmdldC5jaGVja2VkIDogdGFyZ2V0LnZhbHVlO1xuICAgIGNvbnN0IG5hbWUgPSB0YXJnZXQubmFtZTtcbiAgICB0aGlzLnNldFN0YXRlKHtbbmFtZV06IHZhbHVlfSk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlIHVzZXJuYW1lL2VtYWlsIGlucHV0IGtleVVwIGV2ZW50LlxuICAgKi9cbiAgaGFuZGxlVXNlcm5hbWVJbnB1dE9uS2V5VXAoKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUuaGFzQWxyZWFkeUJlZW5WYWxpZGF0ZWQpIHtcbiAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy52YWxpZGF0ZVVzZXJuYW1lSW5wdXQoKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGUgZm9ybSBzdWJtaXQgZXZlbnQuXG4gICAqIEBwYXJhbXMge1JlYWN0RXZlbnR9IFRoZSByZWFjdCBldmVudFxuICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICovXG4gIGFzeW5jIGhhbmRsZUZvcm1TdWJtaXQoZXZlbnQpIHtcbiAgICAvLyBBdm9pZCB0aGUgZm9ybSB0byBiZSBzdWJtaXR0ZWQuXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIGF3YWl0IHRoaXMuc2V0U3RhdGUoe2hhc0FscmVhZHlCZWVuVmFsaWRhdGVkOiB0cnVlfSk7XG5cbiAgICAvLyBEbyBub3QgcmUtc3VibWl0IGFuIGFscmVhZHkgcHJvY2Vzc2luZyBmb3JtXG4gICAgaWYgKCF0aGlzLnN0YXRlLnByb2Nlc3NpbmcpIHtcbiAgICAgIGF3YWl0IHRoaXMudG9nZ2xlUHJvY2Vzc2luZygpO1xuICAgICAgYXdhaXQgdGhpcy52YWxpZGF0ZSgpO1xuXG4gICAgICBpZiAodGhpcy5oYXNWYWxpZGF0aW9uRXJyb3IoKSkge1xuICAgICAgICBhd2FpdCB0aGlzLnRvZ2dsZVByb2Nlc3NpbmcoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5wcm9wcy5hcGlUcmlhZ2VDb250ZXh0Lm9uVHJpYWdlUmVxdWVzdGVkKHRoaXMuc3RhdGUudXNlcm5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUb2dnbGUgcHJvY2Vzc2luZyBzdGF0ZVxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAgICovXG4gIGFzeW5jIHRvZ2dsZVByb2Nlc3NpbmcoKSB7XG4gICAgY29uc3QgcHJldiA9IHRoaXMuc3RhdGUucHJvY2Vzc2luZztcbiAgICByZXR1cm4gdGhpcy5zZXRTdGF0ZSh7cHJvY2Vzc2luZzogIXByZXZ9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWYWxpZGF0ZSB0aGUgZm9ybS5cbiAgICogQHJldHVybnMge1Byb21pc2U8Ym9vbGVhbj59XG4gICAqL1xuICBhc3luYyB2YWxpZGF0ZSgpIHtcbiAgICBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICB0aGlzLnZhbGlkYXRlVXNlcm5hbWVJbnB1dCgpLFxuICAgICAgdGhpcy52YWxpZGF0ZUFncmVlZFRlcm1zKClcbiAgICBdKTtcbiAgICByZXR1cm4gdGhpcy5oYXNWYWxpZGF0aW9uRXJyb3IoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWYWxpZGF0ZSB0aGUgdXNlcm5hbWUgaW5wdXQuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuICAgKi9cbiAgYXN5bmMgdmFsaWRhdGVVc2VybmFtZUlucHV0KCkge1xuICAgIGxldCB1c2VybmFtZUVycm9yID0gbnVsbDtcbiAgICBjb25zdCB1c2VybmFtZSA9IHRoaXMuc3RhdGUudXNlcm5hbWUudHJpbSgpO1xuICAgIGlmICghdXNlcm5hbWUubGVuZ3RoKSB7XG4gICAgICB1c2VybmFtZUVycm9yID0gXCJBIHVzZXJuYW1lIGlzIHJlcXVpcmVkLlwiO1xuICAgIH0gZWxzZSBpZiAoIXRoaXMuaXNFbWFpbCh1c2VybmFtZSkpIHtcbiAgICAgIHVzZXJuYW1lRXJyb3IgPSBcIlRoZSB1c2VybmFtZSBzaG91bGQgYmUgYSB2YWxpZCB1c2VybmFtZSBhZGRyZXNzLlwiO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5zZXRTdGF0ZSh7dXNlcm5hbWUsIHVzZXJuYW1lRXJyb3J9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayB0aGF0IGEgdXNlcm5hbWUgaXMgYSB2YWxpZCBlbWFpbFxuICAgKiBAcGFyYW0ge3N0cmluZyB9dXNlcm5hbWUgdGhlIHVzZXJuYW1lIHRvIHRlc3RcbiAgICovXG4gIGlzRW1haWwodXNlcm5hbWUpIHtcbiAgICBjb25zdCBob3N0bmFtZVJlZ2V4cCA9IFwiKD86W19cXFxccHtMfTAtOV1bLV9cXFxccHtMfTAtOV0qXFxcXC4pKig/OltcXFxccHtMfTAtOV1bLVxcXFxwe0x9MC05XXswLDYyfSlcXFxcLig/Oig/OlthLXpdezJ9XFxcXC4pP1thLXpdezIsfSlcIjtcbiAgICBjb25zdCBlbWFpbFJlZ2V4cCA9IGBeW1xcXFxwe0x9MC05ISMkJSYnKitcXC89P15fXFxge3x9fi1dKyg/OlxcXFwuW1xcXFxwe0x9MC05ISMkJSYnKitcXC89P15fXFxge3x9fi1dKykqQCR7aG9zdG5hbWVSZWdleHB9JGA7XG4gICAgY29uc3QgeHJlZ2V4cCA9IFhSZWdFeHAoZW1haWxSZWdleHApO1xuICAgIHJldHVybiB4cmVnZXhwLnRlc3QodXNlcm5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFZhbGlkYXRlIHRoZSBhZ3JlZWQgdGVybXMgY2hlY2tib3guXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuICAgKi9cbiAgYXN5bmMgdmFsaWRhdGVBZ3JlZWRUZXJtcygpIHtcbiAgICBsZXQgYWdyZWVkVGVybXNFcnJvciA9IG51bGw7XG4gICAgY29uc3QgbXVzdFZhbGlkYXRlVGVybXMgPSB0aGlzLnByaXZhY3lMaW5rIHx8IHRoaXMudGVybXNMaW5rO1xuICAgIGNvbnN0IGFncmVlZFRlcm1zID0gdGhpcy5zdGF0ZS5hZ3JlZWRUZXJtcztcbiAgICBpZiAobXVzdFZhbGlkYXRlVGVybXMgJiYgIWFncmVlZFRlcm1zKSB7XG4gICAgICBhZ3JlZWRUZXJtc0Vycm9yID0gXCJZb3UgaGF2ZSB0byBhY2NlcHQgaXQuXCI7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnNldFN0YXRlKHthZ3JlZWRUZXJtc0Vycm9yfSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRydWUgaWYgdGhlIGZvcm0gaGFzIHNvbWUgdmFsaWRhdGlvbiBlcnJvclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIGhhc1ZhbGlkYXRpb25FcnJvcigpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS51c2VybmFtZUVycm9yICE9PSBudWxsIHx8IHRoaXMuc3RhdGUuYWdyZWVkVGVybXNFcnJvciAhPT0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG91bGQgaW5wdXQgYmUgZGlzYWJsZWQ/IFRydWUgaWYgc3RhdGUgaXMgbG9hZGluZyBvciBwcm9jZXNzaW5nXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgaGFzQWxsSW5wdXREaXNhYmxlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5wcm9jZXNzaW5nIHx8IHRoaXMuc3RhdGUubG9hZGluZztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHByaXZhY3kgbGluay5cbiAgICogQHJldHVybnMge3N0cmluZ3xib29sZWFufSBmYWxzZSBpZiBubyBwcml2YWN5IGxpbmtcbiAgICovXG4gIGdldCBwcml2YWN5TGluaygpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5jb250ZXh0LnNpdGVTZXR0aW5ncykge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHMuY29udGV4dC5zaXRlU2V0dGluZ3MucHJpdmFjeUxpbms7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHRlcm1zIGxpbmtcbiAgICogQHJldHVybnMge3N0cmluZ3xib29sZWFufSBmYWxzZSBpZiBubyB0ZXJtc1xuICAgKi9cbiAgZ2V0IHRlcm1zTGluaygpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5jb250ZXh0LnNpdGVTZXR0aW5ncykge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHMuY29udGV4dC5zaXRlU2V0dGluZ3MudGVybXNMaW5rO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogUmVuZGVyXG4gICAqIEByZXR1cm5zIHtKU1guRWxlbWVudH1cbiAgICovXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJlbnRlci11c2VybmFtZVwiPlxuICAgICAgICA8aDE+UGxlYXNlIGVudGVyIHlvdXIgZW1haWwgdG8gY29udGludWUuPC9oMT5cbiAgICAgICAgPGZvcm0gYWNjZXB0Q2hhcnNldD1cInV0Zi04XCIgb25TdWJtaXQ9e3RoaXMuaGFuZGxlRm9ybVN1Ym1pdH0gbm9WYWxpZGF0ZT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGlucHV0IHRleHQgcmVxdWlyZWQgJHt0aGlzLnN0YXRlLnVzZXJuYW1lRXJyb3IgPyBcImVycm9yXCIgOiBcIlwifWB9PlxuICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJ1c2VybmFtZVwiPkVtYWlsICh1c2VybmFtZSk8L2xhYmVsPlxuICAgICAgICAgICAgPGlucHV0IGlkPVwidXNlcm5hbWUtaW5wdXRcIiB0eXBlPVwidGV4dFwiIHJlZj17dGhpcy51c2VybmFtZVJlZn0gbmFtZT1cInVzZXJuYW1lXCIgdmFsdWU9e3RoaXMuc3RhdGUudXNlcm5hbWV9XG4gICAgICAgICAgICAgIG9uS2V5VXA9e3RoaXMuaGFuZGxlVXNlcm5hbWVJbnB1dE9uS2V5VXB9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUlucHV0Q2hhbmdlfSBwbGFjZWhvbGRlcj1cInlvdUBvcmdhbml6YXRpb24uY29tXCJcbiAgICAgICAgICAgICAgcmVxdWlyZWQ9XCJyZXF1aXJlZFwiIGRpc2FibGVkPXt0aGlzLmhhc0FsbElucHV0RGlzYWJsZWQoKX0vPlxuICAgICAgICAgICAge3RoaXMuc3RhdGUudXNlcm5hbWVFcnJvciAmJlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJlcnJvci1tZXNzYWdlXCI+e3RoaXMuc3RhdGUudXNlcm5hbWVFcnJvcn08L2Rpdj5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICB7KHRoaXMucHJpdmFjeUxpbmsgfHwgdGhpcy50ZXJtc0xpbmspICYmXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnB1dCBjaGVja2JveFwiPlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5hbWU9XCJhZ3JlZWRUZXJtc1wiIHZhbHVlPXt0aGlzLnN0YXRlLmFncmVlZFRlcm1zfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVJbnB1dENoYW5nZX1cbiAgICAgICAgICAgICAgaWQ9XCJjaGVja2JveC10ZXJtc1wiIGRpc2FibGVkPXt0aGlzLmhhc0FsbElucHV0RGlzYWJsZWQoKX0vPlxuICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJjaGVja2JveC10ZXJtc1wiPlxuICAgICAgICAgICAgICB7KHRoaXMucHJpdmFjeUxpbmsgfHwgdGhpcy50ZXJtc0xpbmspICYmXG4gICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgIEkgYWNjZXB0IHRoZSZuYnNwO1xuICAgICAgICAgICAgICAgIHt0aGlzLnRlcm1zTGluayAmJiA8YSBocmVmPXt0aGlzLnRlcm1zTGlua30gdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiPnRlcm1zPC9hPn1cbiAgICAgICAgICAgICAgICB7KHRoaXMudGVybXNMaW5rICYmIHRoaXMucHJpdmFjeUxpbmspICYmIDxzcGFuPiBhbmQgPC9zcGFuPn1cbiAgICAgICAgICAgICAgICB7dGhpcy5wcml2YWN5TGluayAmJlxuICAgICAgICAgICAgICAgIDxhIGhyZWY9e3RoaXMucHJpdmFjeUxpbmt9IHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIj5wcml2YWN5IHBvbGljeTwvYT59LlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICB7dGhpcy5zdGF0ZS5hZ3JlZWRUZXJtc0Vycm9yICYmICF0aGlzLnN0YXRlLmFncmVlZFRlcm1zICYmXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImVycm9yLW1lc3NhZ2VcIj57dGhpcy5zdGF0ZS5hZ3JlZWRUZXJtc0Vycm9yfTwvZGl2PlxuICAgICAgICAgICAgfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIH1cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tYWN0aW9uc1wiPlxuICAgICAgICAgICAgPEZvcm1TdWJtaXRCdXR0b24gZGlzYWJsZWQ9e3RoaXMuaGFzQWxsSW5wdXREaXNhYmxlZCgpfSBiaWc9e3RydWV9IHByb2Nlc3Npbmc9e3RoaXMuc3RhdGUucHJvY2Vzc2luZ30gdmFsdWU9XCJOZXh0XCIvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Zvcm0+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkVudGVyVXNlcm5hbWVGb3JtLnByb3BUeXBlcyA9IHtcbiAgYXBpVHJpYWdlQ29udGV4dDogUHJvcFR5cGVzLm9iamVjdCwgLy8gVGhlIGFwaSB0cmlhZ2UgY29udGV4dFxuICBjb250ZXh0OiBQcm9wVHlwZXMuYW55LCAvLyBUaGUgYXBwbGljYXRpb24gY29udGV4dCBwcm92aWRlclxufTtcblxuZXhwb3J0IGRlZmF1bHQgd2l0aEFwcENvbnRleHQod2l0aEFwaVRyaWFnZUNvbnRleHQoRW50ZXJVc2VybmFtZUZvcm0pKTtcbiIsIi8qKlxuICogUGFzc2JvbHQgfiBPcGVuIHNvdXJjZSBwYXNzd29yZCBtYW5hZ2VyIGZvciB0ZWFtc1xuICogQ29weXJpZ2h0IChjKSAyMDIwIFBhc3Nib2x0IFNBIChodHRwczovL3d3dy5wYXNzYm9sdC5jb20pXG4gKlxuICogTGljZW5zZWQgdW5kZXIgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIHZlcnNpb24gMyBvZiB0aGUgb3IgYW55IGxhdGVyIHZlcnNpb24uXG4gKiBGb3IgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSBzZWUgdGhlIExJQ0VOU0UudHh0XG4gKiBSZWRpc3RyaWJ1dGlvbnMgb2YgZmlsZXMgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UuXG4gKlxuICogQGNvcHlyaWdodCAgICAgQ29weXJpZ2h0IChjKSAyMDIwIFBhc3Nib2x0IFNBIChodHRwczovL3d3dy5wYXNzYm9sdC5jb20pXG4gKiBAbGljZW5zZSAgICAgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL0FHUEwtMy4wIEFHUEwgTGljZW5zZVxuICogQGxpbmsgICAgICAgICAgaHR0cHM6Ly93d3cucGFzc2JvbHQuY29tIFBhc3Nib2x0KHRtKVxuICogQHNpbmNlICAgICAgICAgMy4wLjBcbiAqL1xuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCBMb2FkaW5nU3Bpbm5lciBmcm9tIFwiLi4vLi4vLi4vLi4vcmVhY3QvY29tcG9uZW50cy9Db21tb24vTG9hZGluZy9Mb2FkaW5nU3Bpbm5lci9Mb2FkaW5nU3Bpbm5lclwiO1xuaW1wb3J0IHtBcGlUcmlhZ2VDb250ZXh0U3RhdGUsIHdpdGhBcGlUcmlhZ2VDb250ZXh0fSBmcm9tIFwiLi4vLi4vLi4vY29udGV4dHMvQXBpVHJpYWdlQ29udGV4dFwiO1xuaW1wb3J0IEVudGVyVXNlcm5hbWVGb3JtIGZyb20gXCIuLi8uLi9BdXRoZW50aWNhdGlvbi9FbnRlclVzZXJuYW1lRm9ybS9FbnRlclVzZXJuYW1lRm9ybVwiO1xuaW1wb3J0IEVudGVyTmFtZUZvcm0gZnJvbSBcIi4uLy4uL0F1dGhlbnRpY2F0aW9uL0VudGVyTmFtZUZvcm0vRW50ZXJOYW1lRm9ybVwiO1xuaW1wb3J0IENoZWNrTWFpbEJveCBmcm9tIFwiLi4vLi4vQXV0aGVudGljYXRpb24vQ2hlY2tNYWlsQm94L0NoZWNrTWFpbEJveFwiO1xuaW1wb3J0IERpc3BsYXlFcnJvciBmcm9tIFwiLi4vLi4vQXV0aGVudGljYXRpb24vRGlzcGxheUVycm9yL0Rpc3BsYXlFcnJvclwiO1xuXG4vKipcbiAqIFRoZSBjb21wb25lbnQgb3JjaGVzdHJhdGVzIHRoZSBhcGkgdHJpYWdlIHdvcmtmbG93LlxuICovXG5jbGFzcyBPcmNoZXN0cmF0ZUFwaVRyaWFnZSBleHRlbmRzIENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBXaGVuZXZlciB0aGUgY29tcG9uZW50IGlzIGluaXRpYWxpemVkXG4gICAqL1xuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLmluaXRpYWxpemVUcmlhZ2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSB0cmlhZ2UuXG4gICAqL1xuICBpbml0aWFsaXplVHJpYWdlKCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5wcm9wcy5hcGlUcmlhZ2VDb250ZXh0Lm9uSW5pdGlhbGl6ZVRyaWFnZVJlcXVlc3RlZCgpLCAxMDAwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW5kZXIgdGhlIGNvbXBvbmVudFxuICAgKiBAcmV0dXJucyB7SlNYfVxuICAgKi9cbiAgcmVuZGVyKCkge1xuICAgIHN3aXRjaCAodGhpcy5wcm9wcy5hcGlUcmlhZ2VDb250ZXh0LnN0YXRlKSB7XG4gICAgICBjYXNlIEFwaVRyaWFnZUNvbnRleHRTdGF0ZS5VU0VSTkFNRV9TVEFURTpcbiAgICAgICAgcmV0dXJuIDxFbnRlclVzZXJuYW1lRm9ybS8+O1xuICAgICAgY2FzZSBBcGlUcmlhZ2VDb250ZXh0U3RhdGUuQ0hFQ0tfTUFJTEJPWF9TVEFURTpcbiAgICAgICAgcmV0dXJuIDxDaGVja01haWxCb3gvPjtcbiAgICAgIGNhc2UgQXBpVHJpYWdlQ29udGV4dFN0YXRlLk5BTUVfU1RBVEU6XG4gICAgICAgIHJldHVybiA8RW50ZXJOYW1lRm9ybS8+O1xuICAgICAgY2FzZSBBcGlUcmlhZ2VDb250ZXh0U3RhdGUuRVJST1JfU1RBVEU6XG4gICAgICAgIHJldHVybiA8RGlzcGxheUVycm9yLz47XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gPExvYWRpbmdTcGlubmVyLz47XG4gICAgfVxuICB9XG59XG5cbk9yY2hlc3RyYXRlQXBpVHJpYWdlLnByb3BUeXBlcyA9IHtcbiAgYXBpVHJpYWdlQ29udGV4dDogUHJvcFR5cGVzLm9iamVjdCwgLy8gVGhlIGFwaSBzZXR1cCBjb250ZXh0XG59O1xuXG5leHBvcnQgZGVmYXVsdCB3aXRoQXBpVHJpYWdlQ29udGV4dChPcmNoZXN0cmF0ZUFwaVRyaWFnZSk7XG4iLCIvKipcbiAqIFBhc3Nib2x0IH4gT3BlbiBzb3VyY2UgcGFzc3dvcmQgbWFuYWdlciBmb3IgdGVhbXNcbiAqIENvcHlyaWdodCAoYykgMjAyMCBQYXNzYm9sdCBTQSAoaHR0cHM6Ly93d3cucGFzc2JvbHQuY29tKVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSB2ZXJzaW9uIDMgb2YgdGhlIG9yIGFueSBsYXRlciB2ZXJzaW9uLlxuICogRm9yIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2Ugc2VlIHRoZSBMSUNFTlNFLnR4dFxuICogUmVkaXN0cmlidXRpb25zIG9mIGZpbGVzIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLlxuICpcbiAqIEBjb3B5cmlnaHQgICAgIENvcHlyaWdodCAoYykgMjAyMCBQYXNzYm9sdCBTQSAoaHR0cHM6Ly93d3cucGFzc2JvbHQuY29tKVxuICogQGxpY2Vuc2UgICAgICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9BR1BMLTMuMCBBR1BMIExpY2Vuc2VcbiAqIEBsaW5rICAgICAgICAgIGh0dHBzOi8vd3d3LnBhc3Nib2x0LmNvbSBQYXNzYm9sdCh0bSlcbiAqIEBzaW5jZSAgICAgICAgIDIuMTMuMFxuICovXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IEljb24gZnJvbSBcIi4uL0NvbW1vbi9JY29ucy9JY29uXCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5cbmNvbnN0IENSRURJVFNfVVJMID0gXCJodHRwczovL3d3dy5wYXNzYm9sdC5jb20vY3JlZGl0c1wiO1xuY29uc3QgVU5TQUZFX1VSTCA9IFwiaHR0cHM6Ly9oZWxwLnBhc3Nib2x0LmNvbS9mYXEvaG9zdGluZy93aHktdW5zYWZlXCI7XG5cbi8qKlxuICogVGhlIGFwcGxpY2F0aW9uIGZvb3RlclxuICovXG5jbGFzcyBGb290ZXIgZXh0ZW5kcyBDb21wb25lbnQge1xuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBjb21wb25lbnQgaXMgcmVhZHkgdG8gYmUgZGlzcGxheWVkXG4gICAqL1xuICBnZXQgaXNSZWFkeSgpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5zaXRlU2V0dGluZ3M7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdGVybXMgbGluayB1cmxcbiAgICovXG4gIGdldCBwcml2YWN5VXJsKCkge1xuICAgIHJldHVybiB0aGlzLnByb3BzLnNpdGVTZXR0aW5ncy5wcml2YWN5TGluaztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjcmVkaXRzIGxpbmsgdXJsXG4gICAqL1xuICBnZXQgY3JlZGl0c1VybCgpIHtcbiAgICByZXR1cm4gQ1JFRElUU19VUkw7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdW5zYWZlIHVybC5cbiAgICovXG4gIGdldCB1bnNhZmVVcmwoKSB7XG4gICAgcmV0dXJuIFVOU0FGRV9VUkw7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcHJpdmFjeSBsaW5rIHVybFxuICAgKi9cbiAgZ2V0IHRlcm1zVXJsKCkge1xuICAgIHJldHVybiB0aGlzLnByb3BzLnNpdGVTZXR0aW5ncy50ZXJtc0xpbms7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBzZXJ2ZXIgKGlmIGF2YWlsYWJsZSkgYW5kIGJyb3dzZXIgZXh0ZW5zaW9uIHZlcnNpb24uXG4gICAqIGkuZS4gU0VSVkVSX1ZFUlNJT04gLyBCUk9XU0VSX0VYVEVOU0lPTl9WRVJTSU9OXG4gICAqL1xuICBnZXQgdmVyc2lvbnMoKSB7XG4gICAgY29uc3QgdmVyc2lvbnMgPSBbXTtcbiAgICBjb25zdCBzZXJ2ZXJWZXJzaW9uID0gdGhpcy5wcm9wcy5zaXRlU2V0dGluZ3MudmVyc2lvbjtcbiAgICBpZiAoc2VydmVyVmVyc2lvbikge1xuICAgICAgdmVyc2lvbnMucHVzaChzZXJ2ZXJWZXJzaW9uKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuZXh0ZW5zaW9uVmVyc2lvbikge1xuICAgICAgdmVyc2lvbnMucHVzaCh0aGlzLnByb3BzLmV4dGVuc2lvblZlcnNpb24pO1xuICAgIH1cblxuICAgIHJldHVybiB2ZXJzaW9ucy5qb2luKCcgLyAnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGFwcGxpY2F0aW9uIGlzIGluIGFuIHVuc2FmZSBtb2RlXG4gICAqL1xuICBnZXQgaXNVbnNhZmVNb2RlKCkge1xuICAgIGNvbnN0IGRlYnVnID0gdGhpcy5wcm9wcy5zaXRlU2V0dGluZ3MuZGVidWc7XG4gICAgY29uc3QgaXNIdHRwTW9kZSA9IHRoaXMucHJvcHMuc2l0ZVNldHRpbmdzLnVybC5zdGFydHNXaXRoKCdodHRwOi8vJyk7XG4gICAgcmV0dXJuIGRlYnVnIHx8IGlzSHR0cE1vZGU7XG4gIH1cblxuICAvKipcbiAgICogUmVuZGVyIHRoZSBjb21wb25lbnRcbiAgICogQHJldHVybiB7SlNYfVxuICAgKi9cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8Zm9vdGVyPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvb3RlclwiPlxuICAgICAgICAgIHt0aGlzLmlzUmVhZHkgJiZcbiAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiZm9vdGVyLWxpbmtzXCI+XG4gICAgICAgICAgICB7dGhpcy5pc1Vuc2FmZU1vZGUgJiZcbiAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJlcnJvciBtZXNzYWdlXCI+XG4gICAgICAgICAgICAgIDxhXG4gICAgICAgICAgICAgICAgdGl0bGU9XCJ0ZXJtcyBvZiBzZXJ2aWNlXCJcbiAgICAgICAgICAgICAgICBocmVmPXt0aGlzLnVuc2FmZVVybH1cbiAgICAgICAgICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub29wZW5lciBub3JlZmVycmVyXCI+XG4gICAgICAgICAgICAgICAgVW5zYWZlIG1vZGVcbiAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHt0aGlzLnRlcm1zVXJsICYmXG4gICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgIDxhIGhyZWY9e3RoaXMudGVybXNVcmx9XG4gICAgICAgICAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcbiAgICAgICAgICAgICAgICByZWw9XCJub29wZW5lciBub3JlZmVycmVyXCI+XG4gICAgICAgICAgICAgICAgVGVybXNcbiAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHt0aGlzLnByaXZhY3lVcmwgJiZcbiAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgPGEgaHJlZj17dGhpcy5wcml2YWN5VXJsfVxuICAgICAgICAgICAgICAgIHRhcmdldD1cIl9ibGFua1wiXG4gICAgICAgICAgICAgICAgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiPlxuICAgICAgICAgICAgICAgIFByaXZhY3lcbiAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgPGEgaHJlZj17dGhpcy5jcmVkaXRzVXJsfVxuICAgICAgICAgICAgICAgIHRhcmdldD1cIl9ibGFua1wiXG4gICAgICAgICAgICAgICAgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiPlxuICAgICAgICAgICAgICAgIENyZWRpdHNcbiAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgICBocmVmPXt0aGlzLmNyZWRpdHNVcmx9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidG9vbHRpcC1sZWZ0XCJcbiAgICAgICAgICAgICAgICB7Li4uKHRoaXMudmVyc2lvbnMgJiYge1wiZGF0YS10b29sdGlwXCI6IHRoaXMudmVyc2lvbnN9KX1cbiAgICAgICAgICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIlxuICAgICAgICAgICAgICAgIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIj5cbiAgICAgICAgICAgICAgICA8SWNvbiBuYW1lPVwiaGVhcnQtb1wiLz5cbiAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICA8L3VsPlxuICAgICAgICAgIH1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Zvb3Rlcj5cbiAgICApO1xuICB9XG59XG5cbkZvb3Rlci5wcm9wVHlwZXMgPSB7XG4gIHNpdGVTZXR0aW5nczogUHJvcFR5cGVzLm9iamVjdCwgLy8gVGhlIHNpdGUgc2V0dGluZ3NcbiAgZXh0ZW5zaW9uVmVyc2lvbjogUHJvcFR5cGVzLnN0cmluZyAvLyBUaGUgZXh0ZW5zaW9uIHZlcnNpb25cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEZvb3RlcjtcbiIsIi8qKlxuICogUGFzc2JvbHQgfiBPcGVuIHNvdXJjZSBwYXNzd29yZCBtYW5hZ2VyIGZvciB0ZWFtc1xuICogQ29weXJpZ2h0IChjKSAyMDIwIFBhc3Nib2x0IFNBIChodHRwczovL3d3dy5wYXNzYm9sdC5jb20pXG4gKlxuICogTGljZW5zZWQgdW5kZXIgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIHZlcnNpb24gMyBvZiB0aGUgb3IgYW55IGxhdGVyIHZlcnNpb24uXG4gKiBGb3IgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSBzZWUgdGhlIExJQ0VOU0UudHh0XG4gKiBSZWRpc3RyaWJ1dGlvbnMgb2YgZmlsZXMgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UuXG4gKlxuICogQGNvcHlyaWdodCAgICAgQ29weXJpZ2h0IChjKSAyMDIwIFBhc3Nib2x0IFNBIChodHRwczovL3d3dy5wYXNzYm9sdC5jb20pXG4gKiBAbGljZW5zZSAgICAgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL0FHUEwtMy4wIEFHUEwgTGljZW5zZVxuICogQGxpbmsgICAgICAgICAgaHR0cHM6Ly93d3cucGFzc2JvbHQuY29tIFBhc3Nib2x0KHRtKVxuICogQHNpbmNlICAgICAgICAgMy4wLjBcbiAqL1xuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IHt3aXRoQXBwQ29udGV4dH0gZnJvbSBcIi4vQXBwQ29udGV4dFwiO1xuaW1wb3J0IHtBcGlDbGllbnR9IGZyb20gXCIuLi9saWIvYXBpQ2xpZW50L2FwaUNsaWVudFwiO1xuXG4vKipcbiAqIFRoZSBBcGkgdHJpYWdlIGNvbnRleHQuXG4gKiBAdHlwZSB7UmVhY3QuQ29udGV4dDxvYmplY3Q+fVxuICovXG5leHBvcnQgY29uc3QgQXBpVHJpYWdlQ29udGV4dCA9IFJlYWN0LmNyZWF0ZUNvbnRleHQoe1xuICBzdGF0ZTogbnVsbCwgLy8gVGhlIGN1cnJlbnQgdHJpYWdlIHdvcmtmbG93IHN0YXRlXG4gIG9uSW5pdGlhbGl6ZVRyaWFnZVJlcXVlc3RlZDogKCkgPT4ge1xuICB9LCAvLyBXaGVuZXZlciB0aGUgaW5pdGlhbGl6YXRpb24gb2YgdGhlIHRyaWFnZSBpcyByZXF1ZXN0ZWQuXG4gIG9uVHJpYWdlUmVxdWVzdGVkOiAoKSA9PiB7XG4gIH0sIC8vIFdoZW5ldmVyIHRoZSB1c2VyIHdhbnRzIHRvIHN1Ym1pdCB0aGVpciB1c2VybmFtZSBmb3IgdHJpYWdlXG4gIG9uUmVnaXN0cmF0aW9uUmVxdWVzdGVkOiAoKSA9PiB7XG4gIH0sIC8vIFdoZW5ldmVyIHRoZSB1c2VyIHdhbnRzIHRvIHJlZ2lzdGVyXG59KTtcblxuLyoqXG4gKiBUaGUgcmVsYXRlZCBjb250ZXh0IHByb3ZpZGVyXG4gKi9cbmNsYXNzIEFwaVRyaWFnZUNvbnRleHRQcm92aWRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBwcm9wcyBUaGUgY29tcG9uZW50IHByb3BzXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0gT2JqZWN0LmFzc2lnbih0aGlzLmRlZmF1bHRTdGF0ZSwgcHJvcHMudmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGRlZmF1bHQgY29tcG9uZW50IHN0YXRlXG4gICAqL1xuICBnZXQgZGVmYXVsdFN0YXRlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0ZTogQXBpVHJpYWdlQ29udGV4dFN0YXRlLklOSVRJQUxfU1RBVEUsXG4gICAgICBvbkluaXRpYWxpemVUcmlhZ2VSZXF1ZXN0ZWQ6IHRoaXMub25Jbml0aWFsaXplVHJpYWdlUmVxdWVzdGVkLmJpbmQodGhpcyksXG4gICAgICBvblRyaWFnZVJlcXVlc3RlZDogdGhpcy5vblRyaWFnZVJlcXVlc3RlZC5iaW5kKHRoaXMpLFxuICAgICAgb25SZWdpc3RyYXRpb25SZXF1ZXN0ZWQ6IHRoaXMub25SZWdpc3RyYXRpb25SZXF1ZXN0ZWQuYmluZCh0aGlzKSxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhlIHRyaWFnZVxuICAgKiBAcmV0dXJuIHtQcm9taXNlPHZvaWQ+fVxuICAgKi9cbiAgYXN5bmMgb25Jbml0aWFsaXplVHJpYWdlUmVxdWVzdGVkKCkge1xuICAgIHJldHVybiB0aGlzLnNldFN0YXRlKHtzdGF0ZTogQXBpVHJpYWdlQ29udGV4dFN0YXRlLlVTRVJOQU1FX1NUQVRFfSk7XG4gIH1cblxuICAvKipcbiAgICogV2hlbiB0aGUgdXNlciB3YW50IHRvIHN1Ym1pdCB0aGVpciB1c2VybmFtZSBmb3IgdHJpYWdlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VybmFtZSBUaGUgdXNlcm5hbWVcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gICAqL1xuICBhc3luYyBvblRyaWFnZVJlcXVlc3RlZCh1c2VybmFtZSkge1xuICAgIGNvbnN0IHRyaWFnZUR0byA9IHt1c2VybmFtZX07XG4gICAgY29uc3QgYXBpQ2xpZW50T3B0aW9ucyA9IHRoaXMucHJvcHMuY29udGV4dC5nZXRBcGlDbGllbnRPcHRpb25zKCk7XG4gICAgYXBpQ2xpZW50T3B0aW9ucy5zZXRSZXNvdXJjZU5hbWUoXCJ1c2Vycy9yZWNvdmVyXCIpO1xuICAgIGNvbnN0IGFwaUNsaWVudCA9IG5ldyBBcGlDbGllbnQoYXBpQ2xpZW50T3B0aW9ucyk7XG4gICAgYXdhaXQgYXBpQ2xpZW50LmNyZWF0ZSh0cmlhZ2VEdG8pXG4gICAgICAudGhlbih0aGlzLmhhbmRsZVRyaWFnZVN1Y2Nlc3MuYmluZCh0aGlzKSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmhhbmRsZVRyaWFnZUVycm9yKGVycm9yLCB1c2VybmFtZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZSBzZW5kIHVzZXJuYW1lIHN1Y2Nlc3MuXG4gICAqL1xuICBhc3luYyBoYW5kbGVUcmlhZ2VTdWNjZXNzKCkge1xuICAgIHJldHVybiB0aGlzLnNldFN0YXRlKHtzdGF0ZTogQXBpVHJpYWdlQ29udGV4dFN0YXRlLkNIRUNLX01BSUxCT1hfU1RBVEV9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGUgc2VuZCB1c2VybmFtZSBlcnJvci5cbiAgICovXG4gIGFzeW5jIGhhbmRsZVRyaWFnZUVycm9yKGVycm9yLCB1c2VybmFtZSkge1xuICAgIGNvbnN0IHVzZXJOb3RGb3VuZCA9IGVycm9yLmRhdGEgJiYgZXJyb3IuZGF0YS5jb2RlID09PSA0MDQ7XG4gICAgaWYgKHVzZXJOb3RGb3VuZCkge1xuICAgICAgY29uc3QgaXNSZWdpc3RyYXRpb25QdWJsaWMgPSB0aGlzLnByb3BzLmNvbnRleHQuc2l0ZVNldHRpbmdzLnJlZ2lzdHJhdGlvblB1YmxpYztcbiAgICAgIGlmIChpc1JlZ2lzdHJhdGlvblB1YmxpYykge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHt1c2VybmFtZSwgc3RhdGU6IEFwaVRyaWFnZUNvbnRleHRTdGF0ZS5OQU1FX1NUQVRFfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHt1c2VybmFtZSwgc3RhdGU6IEFwaVRyaWFnZUNvbnRleHRTdGF0ZS5FUlJPUl9TVEFURX0pO1xuICAgICAgfVxuICAgIH1cbiAgICAvKlxuICAgICAqIEB0b2RvIGhhbmRsZSB1bmV4cGVjdGVkIGVycm9yLlxuICAgICAqIGVsc2Uge1xuICAgICAqICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAqICAgYXdhaXQgdGhpcy5wcm9wcy5hY3Rpb25GZWVkYmFja0NvbnRleHQuZGlzcGxheUVycm9yKFwiVGhlcmUgd2FzIGFuIHVuZXhwZWN0ZWQgZXJyb3IsIHBsZWFzZSByZXRyeSBsYXRlci4uLlwiKTtcbiAgICAgKiAgIGF3YWl0IHRoaXMudG9nZ2xlUHJvY2Vzc2luZygpO1xuICAgICAqIH1cbiAgICAgKi9cbiAgfVxuXG4gIC8qKlxuICAgKiBXaGVuIHRoZSB1c2VyIHdhbnRzIHRvIHJlZ2lzdGVyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBmaXJzdE5hbWUgVGhlIHVzZXIgZmlyc3QgbmFtZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gbGFzdE5hbWUgVGhlIHVzZXIgbGFzdCBuYW1lXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPE9iamVjdD59XG4gICAqL1xuICBhc3luYyBvblJlZ2lzdHJhdGlvblJlcXVlc3RlZChmaXJzdE5hbWUsIGxhc3ROYW1lKSB7XG4gICAgY29uc3QgcmVnaXN0cmF0aW9uRHRvID0ge1xuICAgICAgdXNlcm5hbWU6IHRoaXMuc3RhdGUudXNlcm5hbWUsXG4gICAgICBwcm9maWxlOiB7XG4gICAgICAgIGZpcnN0X25hbWU6IGZpcnN0TmFtZSxcbiAgICAgICAgbGFzdF9uYW1lOiBsYXN0TmFtZVxuICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgYXBpQ2xpZW50T3B0aW9ucyA9IHRoaXMucHJvcHMuY29udGV4dC5nZXRBcGlDbGllbnRPcHRpb25zKClcbiAgICAgIC5zZXRSZXNvdXJjZU5hbWUoXCJ1c2Vycy9yZWdpc3RlclwiKTtcbiAgICBjb25zdCBhcGlDbGllbnQgPSBuZXcgQXBpQ2xpZW50KGFwaUNsaWVudE9wdGlvbnMpO1xuICAgIGF3YWl0IGFwaUNsaWVudC5jcmVhdGUocmVnaXN0cmF0aW9uRHRvKVxuICAgICAgLnRoZW4odGhpcy5oYW5kbGVSZWdpc3RyYXRpb25TdWNjZXNzLmJpbmQodGhpcykpXG4gICAgICAuY2F0Y2godGhpcy5oYW5kbGVSZWdpc3RyYXRpb25FcnJvci5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGUgcmVnaXN0cmF0aW9uIHN1Y2Nlc3NcbiAgICovXG4gIGFzeW5jIGhhbmRsZVJlZ2lzdHJhdGlvblN1Y2Nlc3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2V0U3RhdGUoe3N0YXRlOiBBcGlUcmlhZ2VDb250ZXh0U3RhdGUuQ0hFQ0tfTUFJTEJPWF9TVEFURX0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZSByZWdpc3RyYXRpb24gZXJyb3JcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gICAqL1xuICBhc3luYyBoYW5kbGVSZWdpc3RyYXRpb25FcnJvcigpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtzdGF0ZTogQXBpVHJpYWdlQ29udGV4dFN0YXRlLkVSUk9SX1NUQVRFfSk7XG4gIH1cblxuICAvKipcbiAgICogUmVuZGVyIHRoZSBjb21wb25lbnRcbiAgICogQHJldHVybnMge0pTWH1cbiAgICovXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPEFwaVRyaWFnZUNvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3RoaXMuc3RhdGV9PlxuICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgIDwvQXBpVHJpYWdlQ29udGV4dC5Qcm92aWRlcj5cbiAgICApO1xuICB9XG59XG5cbkFwaVRyaWFnZUNvbnRleHRQcm92aWRlci5wcm9wVHlwZXMgPSB7XG4gIGNvbnRleHQ6IFByb3BUeXBlcy5hbnksIC8vIFRoZSBhcHBsaWNhdGlvbiBjb250ZXh0XG4gIHZhbHVlOiBQcm9wVHlwZXMuYW55LCAvLyBUaGUgaW5pdGlhbCB2YWx1ZSBvZiB0aGUgY29udGV4dFxuICBjaGlsZHJlbjogUHJvcFR5cGVzLmFueSAvLyBUaGUgY2hpbGRyZW4gY29tcG9uZW50c1xufTtcbmV4cG9ydCBkZWZhdWx0IHdpdGhBcHBDb250ZXh0KEFwaVRyaWFnZUNvbnRleHRQcm92aWRlcik7XG5cbi8qKlxuICogQVBJIFRyaWFnZSBDb250ZXh0IENvbnN1bWVyIEhPQ1xuICogQHBhcmFtIFdyYXBwZWRDb21wb25lbnRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHdpdGhBcGlUcmlhZ2VDb250ZXh0KFdyYXBwZWRDb21wb25lbnQpIHtcbiAgcmV0dXJuIGNsYXNzIHdpdGhBcGlUcmlhZ2VDb250ZXh0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICByZW5kZXIoKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8QXBpVHJpYWdlQ29udGV4dC5Db25zdW1lcj5cbiAgICAgICAgICB7XG4gICAgICAgICAgICBjb250ZXh0ID0+IDxXcmFwcGVkQ29tcG9uZW50IGFwaVRyaWFnZUNvbnRleHQ9e2NvbnRleHR9IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICAgIH1cbiAgICAgICAgPC9BcGlUcmlhZ2VDb250ZXh0LkNvbnN1bWVyPlxuICAgICAgKTtcbiAgICB9XG4gIH07XG59XG5cbi8qKlxuICogVGhlIHRyaWFnZSB0eXBlcyBvZiBzdGF0ZVxuICovXG5leHBvcnQgY29uc3QgQXBpVHJpYWdlQ29udGV4dFN0YXRlID0ge1xuICBJTklUSUFMX1NUQVRFOiAnSW5pdGlhbCBTdGF0ZScsXG4gIFVTRVJOQU1FX1NUQVRFOiAnRW50ZXIgdXNlcm5hbWUgc3RhdGUnLFxuICBDSEVDS19NQUlMQk9YX1NUQVRFOiAnQ2hlY2sgbWFpbGJveCBzdGF0ZScsXG4gIE5BTUVfU1RBVEU6ICdFbnRlciBuYW1lIHN0YXRlJyxcbiAgTkFNRV9FUlJPUjogJ0Vycm9yIHN0YXRlJyxcbn07XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbmNvbnN0IEFwcENvbnRleHQgPSAgUmVhY3QuY3JlYXRlQ29udGV4dCh7XG4gIHVzZXI6IG51bGwsXG4gIHVzZXJzOiBudWxsLFxuICByb2xlczogbnVsbCxcbiAgcmVtZW1iZXJNZU9wdGlvbnM6IHt9LFxuICByZXNvdXJjZXM6IG51bGwsXG4gIHJlc291cmNlOiBudWxsLFxuICBzaGFyZVJlc291cmNlczogbnVsbCxcbiAgc2VsZWN0ZWRSZXNvdXJjZXM6IG51bGwsXG4gIHNlbGVjdGVkVXNlcjogbnVsbCxcbiAgZm9sZGVyczogbnVsbCxcbiAgcmVzb3VyY2VDb21tZW50SWQ6IG51bGwsXG4gIG11c3RSZWZyZXNoQ29tbWVudHM6IGZhbHNlLFxuICBzaXRlU2V0dGluZ3M6IG51bGwsXG4gIHVzZXJTZXR0aW5nczogbnVsbCxcbn0pO1xuXG5cbi8qKlxuICogQXBwIENvbnRleHQgQ29uc3VtZXIgSE9DXG4gKiBAcGFyYW0gV3JhcHBlZENvbXBvbmVudFxuICovXG5leHBvcnQgZnVuY3Rpb24gd2l0aEFwcENvbnRleHQoV3JhcHBlZENvbXBvbmVudCkge1xuICByZXR1cm4gY2xhc3Mgd2l0aEFwcENvbnRleHQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHJlbmRlcigpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxBcHBDb250ZXh0LkNvbnN1bWVyPlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIEFwcENvbnRleHQgPT4gPFdyYXBwZWRDb21wb25lbnQgY29udGV4dD17QXBwQ29udGV4dH0gey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICAgfVxuICAgICAgICA8L0FwcENvbnRleHQuQ29uc3VtZXI+XG4gICAgICApO1xuICAgIH1cbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBwQ29udGV4dDtcbiIsIi8qKlxuICogQXBwbGljYXRpb24gZXJyb3JcbiAqXG4gKiBAY29weXJpZ2h0IChjKSAyMDE5IFBhc3Nib2x0IFNBXG4gKiBAbGljZW5jZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzL2FncGwtMy4wLmVuLmh0bWxcbiAqL1xuXG5jbGFzcyBQYXNzYm9sdEFwaUZldGNoRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIGRhdGEpIHtcbiAgICBzdXBlcihtZXNzYWdlKTtcbiAgICB0aGlzLm5hbWUgPSAnUGFzc2JvbHRBcGlGZXRjaEVycm9yJztcbiAgICB0aGlzLmRhdGEgPSBkYXRhIHx8IHt9O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBhc3Nib2x0QXBpRmV0Y2hFcnJvcjtcbiIsIi8qKlxuICogQmFkIHJlc3BvbnNlXG4gKlxuICogQGNvcHlyaWdodCAoYykgMjAxOSBQYXNzYm9sdCBTQVxuICogQGxpY2VuY2UgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy9hZ3BsLTMuMC5lbi5odG1sXG4gKi9cbmNsYXNzIFBhc3Nib2x0QmFkUmVzcG9uc2VFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoXCJBbiBpbnRlcm5hbCBlcnJvciBvY2N1cnJlZC4gVGhlIHNlcnZlciByZXNwb25zZSBjb3VsZCBub3QgYmUgcGFyc2VkLiBQbGVhc2UgY29udGFjdCB5b3VyIGFkbWluaXN0cmF0b3IuXCIpO1xuICAgIHRoaXMubmFtZSA9ICdQYXNzYm9sdEJhZFJlc3BvbnNlRXJyb3InO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBhc3Nib2x0QmFkUmVzcG9uc2VFcnJvcjtcbiIsIi8qKlxuICogTmV0d29yayBlcnJvclxuICpcbiAqIEBjb3B5cmlnaHQgKGMpIDIwMTkgUGFzc2JvbHQgU0FcbiAqIEBsaWNlbmNlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvYWdwbC0zLjAuZW4uaHRtbFxuICovXG5cbmNsYXNzIFBhc3Nib2x0U2VydmljZVVuYXZhaWxhYmxlRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yKG1lc3NhZ2UpIHtcbiAgICBtZXNzYWdlID0gbWVzc2FnZSB8fCBcIlRoZSBzZXJ2aWNlIGlzIHVuYXZhaWxhYmxlXCI7XG4gICAgc3VwZXIobWVzc2FnZSk7XG4gICAgdGhpcy5uYW1lID0gJ1Bhc3Nib2x0U2VydmljZVVuYXZhaWxhYmxlRXJyb3InO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBhc3Nib2x0U2VydmljZVVuYXZhaWxhYmxlRXJyb3I7XG4iLCIvKipcbiAqIFBhc3Nib2x0IH4gT3BlbiBzb3VyY2UgcGFzc3dvcmQgbWFuYWdlciBmb3IgdGVhbXNcbiAqIENvcHlyaWdodCAoYykgMjAyMCBQYXNzYm9sdCBTQSAoaHR0cHM6Ly93d3cucGFzc2JvbHQuY29tKVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSB2ZXJzaW9uIDMgb2YgdGhlIG9yIGFueSBsYXRlciB2ZXJzaW9uLlxuICogRm9yIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2Ugc2VlIHRoZSBMSUNFTlNFLnR4dFxuICogUmVkaXN0cmlidXRpb25zIG9mIGZpbGVzIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLlxuICpcbiAqIEBjb3B5cmlnaHQgICAgIENvcHlyaWdodCAoYykgMjAyMCBQYXNzYm9sdCBTQSAoaHR0cHM6Ly93d3cucGFzc2JvbHQuY29tKVxuICogQGxpY2Vuc2UgICAgICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9BR1BMLTMuMCBBR1BMIExpY2Vuc2VcbiAqIEBsaW5rICAgICAgICAgIGh0dHBzOi8vd3d3LnBhc3Nib2x0LmNvbSBQYXNzYm9sdCh0bSlcbiAqIEBzaW5jZSAgICAgICAgIDMuMC4wXG4gKi9cbmltcG9ydCBnZXRQcm9wVmFsdWUgZnJvbSBcIi4uLy4uLy4uL3JlYWN0L2xpYi9Db21tb24vT2JqZWN0L2dldFByb3BWYWx1ZVwiO1xuaW1wb3J0IHNhbml0aXplVXJsIGZyb20gXCIuLi9Db21tb24vU2FuaXRpemUvc2FuaXRpemVVcmxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2l0ZVNldHRpbmdzIHtcbiAgY29uc3RydWN0b3Ioc2V0dGluZ3MpIHtcbiAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgdGhlIHVzZXIgY2FuIHVzZSBhIGNhcGFiaWxpdHkuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBjYXBhYmlsaXR5IG5hbWVcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBjYW5JVXNlKG5hbWUpIHtcbiAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgY29uc3QgY29uZmlnUGF0aCA9IGBwYXNzYm9sdC5wbHVnaW5zLiR7bmFtZX1gO1xuICAgIGNvbnN0IHBsdWdpblNldHRpbmdzID0gZ2V0UHJvcFZhbHVlKHRoaXMuc2V0dGluZ3MsIGNvbmZpZ1BhdGgpIHx8IG51bGw7XG5cbiAgICAvKlxuICAgICAqIEZvciBub3cgZWFjaCBjYXBhYmlsaXR5IGlzIHJlcHJlc2VudGVkIGJ5IGEgcGx1Z2luLlxuICAgICAqIEEgY2FwYWJpbGl0eSBpcyB0aGVuIGNvbnNpZGVyZWQgYXMgZW5hYmxlZCB3aGVuOlxuICAgICAqIC0gVGhlIHBsdWdpbiBzZXR0aW5ncyBleGlzdCBidXQgdGhlIGVuYWJsZWQgZmxhZyBpcyBtaXNzaW5nIChvbGQgQVBJIHZlcnNpb24pO1xuICAgICAqIC0gVGhlIHBsdWdpbiBzZXR0aW5nIGV4aXN0IGFuZCB0aGUgZmxhZyBpcyBzZXQgdG8gdHJ1ZVxuICAgICAqIEluIGFueSBvdGhlciBjYXNlIHRoZSBjYXBhYmlsaXR5IGlzIGNvbnNpZGVyZWQgYXMgZGlzYWJsZWQuXG4gICAgICovXG4gICAgaWYgKHBsdWdpblNldHRpbmdzICYmIHR5cGVvZiBwbHVnaW5TZXR0aW5ncyA9PT0gXCJvYmplY3RcIikge1xuICAgICAgY29uc3QgcGx1Z2luRW5hYmxlZCA9IGdldFByb3BWYWx1ZShwbHVnaW5TZXR0aW5ncywgXCJlbmFibGVkXCIpO1xuICAgICAgaWYgKHR5cGVvZiBwbHVnaW5FbmFibGVkID09PSBcInVuZGVmaW5lZFwiIHx8IHBsdWdpbkVuYWJsZWQgPT09IHRydWUpIHtcbiAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlIHRoZSBzZXR0aW5ncyBvZiBhIHBsdWdpbi5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIHBsdWdpbiBuYW1lXG4gICAqIEByZXR1cm5zIHtvYmplY3R8bnVsbH1cbiAgICovXG4gIGdldFBsdWdpblNldHRpbmdzKG5hbWUpIHtcbiAgICBjb25zdCBjb25maWdQYXRoID0gYHBhc3Nib2x0LnBsdWdpbnMuJHtuYW1lfWA7XG4gICAgcmV0dXJuIGdldFByb3BWYWx1ZSh0aGlzLnNldHRpbmdzLCBjb25maWdQYXRoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZSB0aGUgcmVtZW1iZXIgbWUgb3B0aW9uc1xuICAgKiBAcmV0dXJucyB7b2JqZWN0fVxuICAgKi9cbiAgZ2V0UmVtZW1iZXJNZU9wdGlvbnMoKSB7XG4gICAgY29uc3QgcGx1Z2luU2V0dGluZ3MgPSB0aGlzLmdldFBsdWdpblNldHRpbmdzKCdyZW1lbWJlck1lJyk7XG4gICAgcmV0dXJuIHBsdWdpblNldHRpbmdzLm9wdGlvbnM7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgdGhlIHJlbWVtYmVyIG9wdGlvbnMgaW5jbHVkZSB0aGUgXCJ1bnRpbCBJIGxvZ291dFwiIG9wdGlvbnNcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIGdldCBoYXNSZW1lbWJlck1lVW50aWxJTG9nb3V0T3B0aW9uKCkge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmdldFJlbWVtYmVyTWVPcHRpb25zKCkgfHwge307XG4gICAgcmV0dXJuIHR5cGVvZiBvcHRpb25zWy0xXSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHNlcnZlciB0aW1lem9uZVxuICAgKiBAcmV0dXJucyB7c3RyaW5nfG51bGx9XG4gICAqL1xuICBnZXRTZXJ2ZXJUaW1lem9uZSgpIHtcbiAgICByZXR1cm4gZ2V0UHJvcFZhbHVlKHRoaXMuc2V0dGluZ3MsIFwicGFzc2JvbHQuYXBwLnNlcnZlcl90aW1lem9uZVwiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGVybXMgYW5kIGNvbmRpdGlvbiBsaW5rcyBpZiBhbnlcbiAgICogQHJldHVybnMge3N0cmluZ3xib29sZWFufVxuICAgKi9cbiAgZ2V0IHRlcm1zTGluaygpIHtcbiAgICBjb25zdCB0ZXJtc0xpbmsgPSBnZXRQcm9wVmFsdWUodGhpcy5zZXR0aW5ncywgXCJwYXNzYm9sdC5sZWdhbC50ZXJtcy51cmxcIik7XG4gICAgaWYgKHRlcm1zTGluaykge1xuICAgICAgcmV0dXJuIHNhbml0aXplVXJsKHRlcm1zTGluayk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgcHJpdmFjeSBsaW5rIGlmIGFueVxuICAgKiBAcmV0dXJucyB7c3RyaW5nfGJvb2xlYW59XG4gICAqL1xuICBnZXQgcHJpdmFjeUxpbmsoKSB7XG4gICAgY29uc3QgcHJpdmFjeUxpbmsgPSBnZXRQcm9wVmFsdWUodGhpcy5zZXR0aW5ncywgXCJwYXNzYm9sdC5sZWdhbC5wcml2YWN5X3BvbGljeS51cmxcIik7XG4gICAgaWYgKHByaXZhY3lMaW5rKSB7XG4gICAgICByZXR1cm4gc2FuaXRpemVVcmwocHJpdmFjeUxpbmspO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHJlZ2lzdHJhdGlvbiBwdWJsaWNcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBnZXQgcmVnaXN0cmF0aW9uUHVibGljKCkge1xuICAgIGNvbnN0IHJlZ2lzdHJhdGlvblB1YmxpYyA9IGdldFByb3BWYWx1ZSh0aGlzLnNldHRpbmdzLCBcInBhc3Nib2x0LnJlZ2lzdHJhdGlvbi5wdWJsaWNcIik7XG4gICAgcmV0dXJuIHJlZ2lzdHJhdGlvblB1YmxpYyA9PT0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgZGVidWcgbW9kZVxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIGdldCBkZWJ1ZygpIHtcbiAgICBjb25zdCBkZWJ1ZyA9IGdldFByb3BWYWx1ZSh0aGlzLnNldHRpbmdzLCBcImFwcC5kZWJ1Z1wiKTtcbiAgICByZXR1cm4gZGVidWcgPT09IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGFwcCB1cmxcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBnZXQgdXJsKCkge1xuICAgIHJldHVybiBnZXRQcm9wVmFsdWUodGhpcy5zZXR0aW5ncywgXCJhcHAudXJsXCIpIHx8IFwiXCI7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGFwcCB2ZXJzaW9uXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBnZXQgdmVyc2lvbigpIHtcbiAgICByZXR1cm4gZ2V0UHJvcFZhbHVlKHRoaXMuc2V0dGluZ3MsIFwiYXBwLnZlcnNpb24ubnVtYmVyXCIpO1xuICB9XG59XG4iLCIvKipcbiAqIFBhc3Nib2x0IH4gT3BlbiBzb3VyY2UgcGFzc3dvcmQgbWFuYWdlciBmb3IgdGVhbXNcbiAqIENvcHlyaWdodCAoYykgUGFzc2JvbHQgU0EgKGh0dHBzOi8vd3d3LnBhc3Nib2x0LmNvbSlcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgdmVyc2lvbiAzIG9mIHRoZSBvciBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqIEZvciBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHNlZSB0aGUgTElDRU5TRS50eHRcbiAqIFJlZGlzdHJpYnV0aW9ucyBvZiBmaWxlcyBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZS5cbiAqXG4gKiBAY29weXJpZ2h0ICAgICBDb3B5cmlnaHQgKGMpIFBhc3Nib2x0IFNBIChodHRwczovL3d3dy5wYXNzYm9sdC5jb20pXG4gKiBAbGljZW5zZSAgICAgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL0FHUEwtMy4wIEFHUEwgTGljZW5zZVxuICogQGxpbmsgICAgICAgICAgaHR0cHM6Ly93d3cucGFzc2JvbHQuY29tIFBhc3Nib2x0KHRtKVxuICogQHNpbmNlICAgICAgICAgMi4xMy4wXG4gKi9cbmltcG9ydCBQYXNzYm9sdEFwaUZldGNoRXJyb3IgZnJvbSBcIi4uL0Vycm9yL3Bhc3Nib2x0QXBpRmV0Y2hFcnJvclwiO1xuaW1wb3J0IFBhc3Nib2x0QmFkUmVzcG9uc2VFcnJvciBmcm9tIFwiLi4vRXJyb3IvcGFzc2JvbHRCYWRSZXNwb25zZUVycm9yXCI7XG5pbXBvcnQgUGFzc2JvbHRTZXJ2aWNlVW5hdmFpbGFibGVFcnJvciBmcm9tIFwiLi4vRXJyb3IvcGFzc2JvbHRTZXJ2aWNlVW5hdmFpbGFibGVFcnJvclwiO1xuXG5leHBvcnQgY2xhc3MgQXBpQ2xpZW50IHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yXG4gICAqXG4gICAqIEBwYXJhbSB7QXBpQ2xpZW50T3B0aW9uc30gb3B0aW9uc1xuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IGlmIGJhc2VVcmwgaXMgZW1wdHkgb3Igbm90IGEgc3RyaW5nXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIGlmICghdGhpcy5vcHRpb25zLmdldEJhc2VVcmwoKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXBpQ2xpZW50IGNvbnN0cnVjdG9yIGVycm9yOiBiYXNlVXJsIGlzIHJlcXVpcmVkLicpO1xuICAgIH1cbiAgICBpZiAoIXRoaXMub3B0aW9ucy5nZXRSZXNvdXJjZU5hbWUoKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXBpQ2xpZW50IGNvbnN0cnVjdG9yIGVycm9yOiByZXNvdXJjZU5hbWUgaXMgcmVxdWlyZWQuJyk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICBsZXQgcmF3QmFzZVVybCA9IHRoaXMub3B0aW9ucy5nZXRCYXNlVXJsKCkudG9TdHJpbmcoKTtcbiAgICAgIGlmIChyYXdCYXNlVXJsLmVuZHNXaXRoKCcvJykpIHtcbiAgICAgICAgcmF3QmFzZVVybCA9IHJhd0Jhc2VVcmwuc2xpY2UoMCwgLTEpO1xuICAgICAgfVxuICAgICAgdGhpcy5iYXNlVXJsID0gYCR7cmF3QmFzZVVybH0vJHt0aGlzLm9wdGlvbnMuZ2V0UmVzb3VyY2VOYW1lKCl9YDtcbiAgICAgIHRoaXMuYmFzZVVybCA9IG5ldyBVUkwodGhpcy5iYXNlVXJsKTtcbiAgICB9IGNhdGNoICh0eXBlRXJyb3IpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FwaUNsaWVudCBjb25zdHJ1Y3RvciBlcnJvcjogYi4nKTtcbiAgICB9XG5cbiAgICB0aGlzLmFwaVZlcnNpb24gPSAnYXBpLXZlcnNpb249djInO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGZldGNoT3B0aW9ucy5oZWFkZXJzXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBnZXREZWZhdWx0SGVhZGVycygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGZldGNoT3B0aW9uc1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgYnVpbGRGZXRjaE9wdGlvbnMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgICBoZWFkZXJzOiB7Li4udGhpcy5nZXREZWZhdWx0SGVhZGVycygpLCAuLi50aGlzLm9wdGlvbnMuZ2V0SGVhZGVycygpfVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogRmluZCBhIHJlc291cmNlIGJ5IGlkXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZCBtb3N0IGxpa2VseSBhIHV1aWRcbiAgICogQHBhcmFtIHtPYmplY3R9IFt1cmxPcHRpb25zXSBPcHRpb25hbCB1cmwgcGFyYW1ldGVycyBmb3IgZXhhbXBsZSB7XCJjb250YWluW3NvbWV0aGluZ11cIjogXCIxXCJ9XG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gaWYgaWQgaXMgZW1wdHkgb3Igbm90IGEgc3RyaW5nXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gaWYgdXJsT3B0aW9ucyBrZXkgb3IgdmFsdWVzIGFyZSBub3QgYSBzdHJpbmdcbiAgICogQHRocm93cyB7UGFzc2JvbHRTZXJ2aWNlVW5hdmFpbGFibGVFcnJvcn0gaWYgc2VydmljZSBpcyBub3QgcmVhY2hhYmxlXG4gICAqIEB0aHJvd3Mge1Bhc3Nib2x0QmFkUmVzcG9uc2VFcnJvcn0gaWYgcGFzc2JvbHQgQVBJIHJlc3BvbmRlZCB3aXRoIG5vbiBwYXJzYWJsZSBKU09OXG4gICAqIEB0aHJvd3Mge1Bhc3Nib2x0QXBpRmV0Y2hFcnJvcn0gaWYgcGFzc2JvbHQgQVBJIHJlc3BvbnNlIGlzIG5vdCBPSyAobm9uIDJ4eCBzdGF0dXMpXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPCo+fVxuICAgKiBAcHVibGljXG4gICAqL1xuICBhc3luYyBnZXQoaWQsIHVybE9wdGlvbnMpIHtcbiAgICB0aGlzLmFzc2VydFZhbGlkSWQoaWQpO1xuICAgIGNvbnN0IHVybCA9IHRoaXMuYnVpbGRVcmwoYCR7dGhpcy5iYXNlVXJsfS8ke2lkfWAsIHVybE9wdGlvbnMgfHwge30pO1xuICAgIHJldHVybiB0aGlzLmZldGNoQW5kSGFuZGxlUmVzcG9uc2UoJ0dFVCcsIHVybCk7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlIGEgcmVzb3VyY2UgYnkgaWRcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkIG1vc3QgbGlrZWx5IGEgdXVpZFxuICAgKiBAcGFyYW0ge09iamVjdH0gW2JvZHldICh3aWxsIGJlIGNvbnZlcnRlZCB0byBKYXZhU2NyaXB0IE9iamVjdCBOb3RhdGlvbiAoSlNPTikgc3RyaW5nKVxuICAgKiBAcGFyYW0ge09iamVjdH0gW3VybE9wdGlvbnNdIE9wdGlvbmFsIHVybCBwYXJhbWV0ZXJzIGZvciBleGFtcGxlIHtcImNvbnRhaW5bc29tZXRoaW5nXVwiOiBcIjFcIn1cbiAgICogQHBhcmFtIHtCb29sZWFufSBbZHJ5UnVuXSBvcHRpb25hbCwgZGVmYXVsdCBmYWxzZSwgY2hlY2tzIGlmIHRoZSB2YWxpZGl0eSBvZiB0aGUgb3BlcmF0aW9uIHByaW9yIHJlYWwgZGVsZXRlXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gaWYgaWQgaXMgZW1wdHkgb3Igbm90IGEgc3RyaW5nXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gaWYgdXJsT3B0aW9ucyBrZXkgb3IgdmFsdWVzIGFyZSBub3QgYSBzdHJpbmdcbiAgICogQHRocm93cyB7UGFzc2JvbHRTZXJ2aWNlVW5hdmFpbGFibGVFcnJvcn0gaWYgc2VydmljZSBpcyBub3QgcmVhY2hhYmxlXG4gICAqIEB0aHJvd3Mge1Bhc3Nib2x0QmFkUmVzcG9uc2VFcnJvcn0gaWYgcGFzc2JvbHQgQVBJIHJlc3BvbmRlZCB3aXRoIG5vbiBwYXJzYWJsZSBKU09OXG4gICAqIEB0aHJvd3Mge1Bhc3Nib2x0QXBpRmV0Y2hFcnJvcn0gaWYgcGFzc2JvbHQgQVBJIHJlc3BvbnNlIGlzIG5vdCBPSyAobm9uIDJ4eCBzdGF0dXMpXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPCo+fVxuICAgKiBAcHVibGljXG4gICAqL1xuICBhc3luYyBkZWxldGUoaWQsIGJvZHksIHVybE9wdGlvbnMsIGRyeVJ1bikge1xuICAgIHRoaXMuYXNzZXJ0VmFsaWRJZChpZCk7XG4gICAgbGV0IHVybDtcbiAgICBpZiAodHlwZW9mIGRyeVJ1biA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGRyeVJ1biA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAoIWRyeVJ1bikge1xuICAgICAgdXJsID0gdGhpcy5idWlsZFVybChgJHt0aGlzLmJhc2VVcmx9LyR7aWR9YCwgdXJsT3B0aW9ucyB8fCB7fSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHVybCA9IHRoaXMuYnVpbGRVcmwoYCR7dGhpcy5iYXNlVXJsfS8ke2lkfS9kcnktcnVuYCwgdXJsT3B0aW9ucyB8fCB7fSk7XG4gICAgfVxuICAgIGxldCBib2R5U3RyaW5nID0gbnVsbDtcbiAgICBpZiAoYm9keSkge1xuICAgICAgYm9keVN0cmluZyA9IHRoaXMuYnVpbGRCb2R5KGJvZHkpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5mZXRjaEFuZEhhbmRsZVJlc3BvbnNlKCdERUxFVEUnLCB1cmwsIGJvZHlTdHJpbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgYWxsIHRoZSByZXNvdXJjZXNcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IFt1cmxPcHRpb25zXSBPcHRpb25hbCB1cmwgcGFyYW1ldGVycyBmb3IgZXhhbXBsZSB7XCJjb250YWluW3NvbWV0aGluZ11cIjogXCIxXCJ9XG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gaWYgdXJsT3B0aW9ucyBrZXkgb3IgdmFsdWVzIGFyZSBub3QgYSBzdHJpbmdcbiAgICogQHRocm93cyB7UGFzc2JvbHRTZXJ2aWNlVW5hdmFpbGFibGVFcnJvcn0gaWYgc2VydmljZSBpcyBub3QgcmVhY2hhYmxlXG4gICAqIEB0aHJvd3Mge1Bhc3Nib2x0QmFkUmVzcG9uc2VFcnJvcn0gaWYgcGFzc2JvbHQgQVBJIHJlc3BvbmRlZCB3aXRoIG5vbiBwYXJzYWJsZSBKU09OXG4gICAqIEB0aHJvd3Mge1Bhc3Nib2x0QXBpRmV0Y2hFcnJvcn0gaWYgcGFzc2JvbHQgQVBJIHJlc3BvbnNlIGlzIG5vdCBPSyAobm9uIDJ4eCBzdGF0dXMpXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPCo+fVxuICAgKiBAcHVibGljXG4gICAqL1xuICBhc3luYyBmaW5kQWxsKHVybE9wdGlvbnMpIHtcbiAgICBjb25zdCB1cmwgPSB0aGlzLmJ1aWxkVXJsKHRoaXMuYmFzZVVybC50b1N0cmluZygpLCB1cmxPcHRpb25zIHx8IHt9KTtcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5mZXRjaEFuZEhhbmRsZVJlc3BvbnNlKCdHRVQnLCB1cmwpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIHJlc291cmNlXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBib2R5ICh3aWxsIGJlIGNvbnZlcnRlZCB0byBKYXZhU2NyaXB0IE9iamVjdCBOb3RhdGlvbiAoSlNPTikgc3RyaW5nKVxuICAgKiBAcGFyYW0ge09iamVjdH0gW3VybE9wdGlvbnNdIE9wdGlvbmFsIHVybCBwYXJhbWV0ZXJzIGZvciBleGFtcGxlIHtcImNvbnRhaW5bc29tZXRoaW5nXVwiOiBcIjFcIn1cbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBpZiBib2R5IGlzIGVtcHR5IG9yIGNhbm5vdCBjb252ZXJ0ZWQgdG8gdmFsaWQgSlNPTiBzdHJpbmdcbiAgICogQHRocm93cyB7UGFzc2JvbHRTZXJ2aWNlVW5hdmFpbGFibGVFcnJvcn0gaWYgc2VydmljZSBpcyBub3QgcmVhY2hhYmxlXG4gICAqIEB0aHJvd3Mge1Bhc3Nib2x0QmFkUmVzcG9uc2VFcnJvcn0gaWYgcGFzc2JvbHQgQVBJIHJlc3BvbmRlZCB3aXRoIG5vbiBwYXJzYWJsZSBKU09OXG4gICAqIEB0aHJvd3Mge1Bhc3Nib2x0QXBpRmV0Y2hFcnJvcn0gaWYgcGFzc2JvbHQgQVBJIHJlc3BvbnNlIGlzIG5vdCBPSyAobm9uIDJ4eCBzdGF0dXMpXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPCo+fVxuICAgKiBAcHVibGljXG4gICAqL1xuICBhc3luYyBjcmVhdGUoYm9keSwgdXJsT3B0aW9ucykge1xuICAgIGNvbnN0IHVybCA9IHRoaXMuYnVpbGRVcmwodGhpcy5iYXNlVXJsLnRvU3RyaW5nKCksIHVybE9wdGlvbnMgfHwge30pO1xuICAgIGNvbnN0IGJvZHlTdHJpbmcgPSB0aGlzLmJ1aWxkQm9keShib2R5KTtcbiAgICByZXR1cm4gdGhpcy5mZXRjaEFuZEhhbmRsZVJlc3BvbnNlKCdQT1NUJywgdXJsLCBib2R5U3RyaW5nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgYSByZXNvdXJjZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgbW9zdCBsaWtlbHkgYSB1dWlkXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBib2R5ICh3aWxsIGJlIGNvbnZlcnRlZCB0byBKYXZhU2NyaXB0IE9iamVjdCBOb3RhdGlvbiAoSlNPTikgc3RyaW5nKVxuICAgKiBAcGFyYW0ge09iamVjdH0gW3VybE9wdGlvbnNdIE9wdGlvbmFsIHVybCBwYXJhbWV0ZXJzIGZvciBleGFtcGxlIHtcImNvbnRhaW5bc29tZXRoaW5nXVwiOiBcIjFcIn1cbiAgICogQHBhcmFtIHtCb29sZWFuP30gW2RyeVJ1bl0gb3B0aW9uYWwsIGRlZmF1bHQgZmFsc2UsIGNoZWNrcyBpZiB0aGUgdmFsaWRpdHkgb2YgdGhlIG9wZXJhdGlvbiBwcmlvciByZWFsIHVwZGF0ZVxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IGlmIGlkIGlzIGVtcHR5IG9yIG5vdCBhIHN0cmluZ1xuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IGlmIGJvZHkgaXMgZW1wdHkgb3IgY2Fubm90IGNvbnZlcnRlZCB0byB2YWxpZCBKU09OIHN0cmluZ1xuICAgKiBAdGhyb3dzIHtQYXNzYm9sdFNlcnZpY2VVbmF2YWlsYWJsZUVycm9yfSBpZiBzZXJ2aWNlIGlzIG5vdCByZWFjaGFibGVcbiAgICogQHRocm93cyB7UGFzc2JvbHRCYWRSZXNwb25zZUVycm9yfSBpZiBwYXNzYm9sdCBBUEkgcmVzcG9uZGVkIHdpdGggbm9uIHBhcnNhYmxlIEpTT05cbiAgICogQHRocm93cyB7UGFzc2JvbHRBcGlGZXRjaEVycm9yfSBpZiBwYXNzYm9sdCBBUEkgcmVzcG9uc2UgaXMgbm90IE9LIChub24gMnh4IHN0YXR1cylcbiAgICogQHJldHVybnMge1Byb21pc2U8Kj59XG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGFzeW5jIHVwZGF0ZShpZCwgYm9keSwgdXJsT3B0aW9ucywgZHJ5UnVuKSB7XG4gICAgdGhpcy5hc3NlcnRWYWxpZElkKGlkKTtcbiAgICBsZXQgdXJsO1xuICAgIGlmICh0eXBlb2YgZHJ5UnVuID09PSAndW5kZWZpbmVkJykge1xuICAgICAgZHJ5UnVuID0gZmFsc2U7XG4gICAgfVxuICAgIGlmICghZHJ5UnVuKSB7XG4gICAgICB1cmwgPSB0aGlzLmJ1aWxkVXJsKGAke3RoaXMuYmFzZVVybH0vJHtpZH1gLCB1cmxPcHRpb25zIHx8IHt9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdXJsID0gdGhpcy5idWlsZFVybChgJHt0aGlzLmJhc2VVcmx9LyR7aWR9L2RyeS1ydW5gLCB1cmxPcHRpb25zIHx8IHt9KTtcbiAgICB9XG4gICAgbGV0IGJvZHlTdHJpbmcgPSBudWxsO1xuICAgIGlmIChib2R5KSB7XG4gICAgICBib2R5U3RyaW5nID0gdGhpcy5idWlsZEJvZHkoYm9keSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmZldGNoQW5kSGFuZGxlUmVzcG9uc2UoJ1BVVCcsIHVybCwgYm9keVN0cmluZyk7XG4gIH1cblxuICAvKipcbiAgICogQXNzZXJ0IHRoYXQgYW4gaWQgaXMgYSB2YWxpZCBub24gZW1wdHkgc3RyaW5nXG4gICAqXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gaWYgaWQgaXMgZW1wdHkgb3Igbm90IGEgc3RyaW5nXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKiBAcHVibGljXG4gICAqL1xuICBhc3NlcnRWYWxpZElkKGlkKSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXBpQ2xpZW50LmFzc2VydFZhbGlkSWQgZXJyb3I6IGlkIGNhbm5vdCBiZSBlbXB0eScpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGlkICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXBpQ2xpZW50LmFzc2VydFZhbGlkSWQgZXJyb3I6IGlkIHNob3VsZCBiZSBhIHN0cmluZycpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAdGhyb3cgVHlwZUVycm9yXG4gICAqIEBwYXJhbSBtZXRob2RcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGFzc2VydE1ldGhvZChtZXRob2QpIHtcbiAgICBpZiAodHlwZW9mIG1ldGhvZCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIG5ldyBUeXBlRXJyb3IoJ0FwaUNsaWVudC5hc3NlcnRWYWxpZE1ldGhvZCBtZXRob2Qgc2hvdWxkIGJlIGEgc3RyaW5nLicpO1xuICAgIH1cbiAgICBjb25zdCBzdXBwb3J0ZWRNZXRob2RzID0gWydHRVQnLCAnUE9TVCcsICdQVVQnLCAnREVMRVRFJ107XG4gICAgaWYgKHN1cHBvcnRlZE1ldGhvZHMuaW5kZXhPZihtZXRob2QpIDwgMCkge1xuICAgICAgbmV3IFR5cGVFcnJvcihgQXBpQ2xpZW50LmFzc2VydFZhbGlkTWV0aG9kIGVycm9yOiBtZXRob2QgJHttZXRob2R9IGlzIG5vdCBzdXBwb3J0ZWQuYCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVybCBwYXJhbXRlciBhc3NlcnRpb25cbiAgICogQHBhcmFtIHsqfSB1cmxcbiAgICogQHRocm93IFR5cGVFcnJvclxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgYXNzZXJ0VXJsKHVybCkge1xuICAgIGlmICghdXJsKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcGxpQ2xpZW50LmFzc2VydFVybCBlcnJvcjogdXJsIGlzIHJlcXVpcmVkLicpO1xuICAgIH1cbiAgICBpZiAoISh1cmwgaW5zdGFuY2VvZiBVUkwpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcGxpQ2xpZW50LmFzc2VydFVybCBlcnJvcjogdXJsIHNob3VsZCBiZSBhIHZhbGlkIFVSTCBvYmplY3QuJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEJvZHkgcGFyYW1ldGVyIGFzc2VydGlvblxuICAgKiBAcGFyYW0gYm9keVxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IGlmIGJvZHkgaXMgbm90IGEgc3RyaW5nXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBhc3NlcnRCb2R5KGJvZHkpIHtcbiAgICBpZiAodHlwZW9mIGJvZHkgIT09ICdzdHJpbmcnKSB7XG4gICAgICBuZXcgVHlwZUVycm9yKGBBcGlDbGllbnQuYXNzZXJ0Qm9keSBlcnJvcjogYm9keSBzaG91bGQgYmUgYSBzdHJpbmcuYCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEJ1aWxkIGJvZHkgb2JqZWN0XG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBib2R5XG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gaWYgYm9keSBpcyBlbXB0eSBvciBjYW5ub3QgY29udmVydGVkIHRvIHZhbGlkIEpTT04gc3RyaW5nXG4gICAqIEByZXR1cm4ge3N0cmluZ30gSmF2YVNjcmlwdCBPYmplY3QgTm90YXRpb24gKEpTT04pIHN0cmluZ1xuICAgKiBAcHVibGljXG4gICAqL1xuICBidWlsZEJvZHkoYm9keSkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShib2R5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYSBVUkwgb2JqZWN0IGZyb20gc3RyaW5nIHVybCBhbmQgdGhpcy5iYXNlVXJsIGFuZCB0aGlzLmFwaVZlcnNpb25cbiAgICogT3B0aW9uYWxseSBhcHBlbmQgdXJsT3B0aW9ucyB0byB0aGUgVVJMIG9iamVjdFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ3xVUkx9IHVybFxuICAgKiBAcGFyYW0ge09iamVjdH0gW3VybE9wdGlvbnNdIE9wdGlvbmFsIHVybCBwYXJhbWV0ZXJzIGZvciBleGFtcGxlIHtcImNvbnRhaW5bc29tZXRoaW5nXVwiOiBcIjFcIn1cbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBpZiB1cmxPcHRpb25zIGtleSBvciB2YWx1ZXMgYXJlIG5vdCBhIHN0cmluZ1xuICAgKiBAcmV0dXJucyB7VVJMfVxuICAgKiBAcHVibGljXG4gICAqL1xuICBidWlsZFVybCh1cmwsIHVybE9wdGlvbnMpIHtcbiAgICBpZiAodHlwZW9mIHVybCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FwaUNsaWVudC5idWlsZFVybCBlcnJvcjogdXJsIHNob3VsZCBiZSBhIHN0cmluZy4nKTtcbiAgICB9XG4gICAgY29uc3QgdXJsT2JqID0gbmV3IFVSTChgJHt1cmx9Lmpzb24/JHt0aGlzLmFwaVZlcnNpb259YCk7XG5cbiAgICB1cmxPcHRpb25zID0gdXJsT3B0aW9ucyB8fCB7fTtcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyh1cmxPcHRpb25zKSkge1xuICAgICAgaWYgKHR5cGVvZiBrZXkgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FwaUNsaWVudC5idWlsZFVybCBlcnJvcjogdXJsT3B0aW9ucyBrZXkgc2hvdWxkIGJlIGEgc3RyaW5nLicpO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgLy8gRXhhbXBsZSBcImZpbHRlcltoYXMtdGFnXVwiOiBcIjxzdHJpbmc+XCJcbiAgICAgICAgdXJsT2JqLnNlYXJjaFBhcmFtcy5hcHBlbmQoa2V5LCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBFeGFtcGxlIFwiZmlsdGVyW2hhcy1pZF1bXVwiOiBcIjx1dWlkPlwiXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgIHZhbHVlLmZvckVhY2godiA9PiB7XG4gICAgICAgICAgICB1cmxPYmouc2VhcmNoUGFyYW1zLmFwcGVuZChrZXksIHYpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FwaUNsaWVudC5idWlsZFVybCBlcnJvcjogdXJsT3B0aW9ucyB2YWx1ZSBzaG91bGQgYmUgYSBzdHJpbmcgb3IgYXJyYXkuJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHVybE9iajtcbiAgfVxuXG4gIC8qKlxuICAgKiBmZXRjaEFuZEhhbmRsZVJlc3BvbnNlXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2QgZXhhbXBsZSAnR0VUJywgJ1BPU1QnXG4gICAqIEBwYXJhbSB7VVJMfSB1cmwgb2JqZWN0XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbYm9keV0gKG9wdGlvbmFsKVxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIChvcHRpb25hbCkgbW9yZSBmZXRjaCBvcHRpb25zXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gaWYgbWV0aG9kLCB1cmwgYXJlIG5vdCBkZWZpbmVkIG9yIG9mIHRoZSB3cm9uZyB0eXBlXG4gICAqIEB0aHJvd3Mge1Bhc3Nib2x0U2VydmljZVVuYXZhaWxhYmxlRXJyb3J9IGlmIHNlcnZpY2UgaXMgbm90IHJlYWNoYWJsZVxuICAgKiBAdGhyb3dzIHtQYXNzYm9sdEJhZFJlc3BvbnNlRXJyb3J9IGlmIHBhc3Nib2x0IEFQSSByZXNwb25kZWQgd2l0aCBub24gcGFyc2FibGUgSlNPTlxuICAgKiBAdGhyb3dzIHtQYXNzYm9sdEFwaUZldGNoRXJyb3J9IGlmIHBhc3Nib2x0IEFQSSByZXNwb25zZSBpcyBub3QgT0sgKG5vbiAyeHggc3RhdHVzKVxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTwqPn1cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgYXN5bmMgZmV0Y2hBbmRIYW5kbGVSZXNwb25zZShtZXRob2QsIHVybCwgYm9keSwgb3B0aW9ucykge1xuICAgIHRoaXMuYXNzZXJ0VXJsKHVybCk7XG4gICAgdGhpcy5hc3NlcnRNZXRob2QobWV0aG9kKTtcbiAgICBpZiAoYm9keSkge1xuICAgICAgdGhpcy5hc3NlcnRCb2R5KGJvZHkpO1xuICAgIH1cblxuICAgIGxldCByZXNwb25zZSwgcmVzcG9uc2VKc29uO1xuICAgIGNvbnN0IGZldGNoT3B0aW9ucyA9IHsuLi50aGlzLmJ1aWxkRmV0Y2hPcHRpb25zKCksIC4uLm9wdGlvbnN9O1xuICAgIGZldGNoT3B0aW9ucy5tZXRob2QgPSBtZXRob2Q7XG4gICAgaWYgKGJvZHkpIHtcbiAgICAgIGZldGNoT3B0aW9ucy5ib2R5ID0gYm9keTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLnRvU3RyaW5nKCksIGZldGNoT3B0aW9ucyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIC8vIENhdGNoIE5ldHdvcmsgZXJyb3Igc3VjaCBhcyBjb25uZWN0aW9uIGxvc3QuXG4gICAgICB0aHJvdyBuZXcgUGFzc2JvbHRTZXJ2aWNlVW5hdmFpbGFibGVFcnJvcihlcnJvci5tZXNzYWdlKTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgcmVzcG9uc2VKc29uID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAvKlxuICAgICAgICogSWYgdGhlIHJlc3BvbnNlIGNhbm5vdCBiZSBwYXJzZWQsIGl0J3Mgbm90IGEgUGFzc2JvbHQgQVBJIHJlc3BvbnNlLlxuICAgICAgICogSXQgY2FuIGJlIGEgZm9yIGV4YW1wbGUgYSBwcm94eSB0aW1lb3V0IGVycm9yICg1MDQpLlxuICAgICAgICovXG4gICAgICB0aHJvdyBuZXcgUGFzc2JvbHRCYWRSZXNwb25zZUVycm9yKCk7XG4gICAgfVxuXG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IHJlc3BvbnNlSnNvbi5oZWFkZXIubWVzc2FnZTtcbiAgICAgIHRocm93IG5ldyBQYXNzYm9sdEFwaUZldGNoRXJyb3IobWVzc2FnZSwge1xuICAgICAgICBjb2RlOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAgIGJvZHk6IHJlc3BvbnNlSnNvbi5ib2R5XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzcG9uc2VKc29uO1xuICB9XG59XG4iLCIvKipcbiAqIFBhc3Nib2x0IH4gT3BlbiBzb3VyY2UgcGFzc3dvcmQgbWFuYWdlciBmb3IgdGVhbXNcbiAqIENvcHlyaWdodCAoYykgMjAyMCBQYXNzYm9sdCBTQSAoaHR0cHM6Ly93d3cucGFzc2JvbHQuY29tKVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSB2ZXJzaW9uIDMgb2YgdGhlIG9yIGFueSBsYXRlciB2ZXJzaW9uLlxuICogRm9yIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2Ugc2VlIHRoZSBMSUNFTlNFLnR4dFxuICogUmVkaXN0cmlidXRpb25zIG9mIGZpbGVzIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLlxuICpcbiAqIEBjb3B5cmlnaHQgICAgIENvcHlyaWdodCAoYykgMjAyMCBQYXNzYm9sdCBTQSAoaHR0cHM6Ly93d3cucGFzc2JvbHQuY29tKVxuICogQGxpY2Vuc2UgICAgICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9BR1BMLTMuMCBBR1BMIExpY2Vuc2VcbiAqIEBsaW5rICAgICAgICAgIGh0dHBzOi8vd3d3LnBhc3Nib2x0LmNvbSBQYXNzYm9sdCh0bSlcbiAqL1xuaW1wb3J0IHtDc3JmVG9rZW59IGZyb20gXCIuL2NzcmZUb2tlblwiO1xuXG5leHBvcnQgY2xhc3MgQXBpQ2xpZW50T3B0aW9ucyB7XG4gIC8qKlxuICAgKiBTZXQgYmFzZSB1cmxcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd8VVJMfSBiYXNlVXJsXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gaWYgYmFzZVVybCBpcyBlbXB0eSwgb3Igbm90IGEgc3RyaW5nIG9yIHZhbGlkIFVSTFxuICAgKiBAcmV0dXJucyB7QXBpQ2xpZW50T3B0aW9uc31cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgc2V0QmFzZVVybChiYXNlVXJsKSB7XG4gICAgaWYgKCFiYXNlVXJsKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcGlDbGllbnRPcHRpb24gYmFzZVVybCBpcyByZXF1aXJlZC4nKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBiYXNlVXJsID09PSAnc3RyaW5nJykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5iYXNlVXJsID0gbmV3IFVSTChiYXNlVXJsKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXBpQ2xpZW50T3B0aW9uIGJhc2VVcmwgaXMgaW52YWxpZC4nKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGJhc2VVcmwgaW5zdGFuY2VvZiBVUkwpIHtcbiAgICAgICAgdGhpcy5iYXNlVXJsID0gYmFzZVVybDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FwaUNsaWVudE9wdGlvbnMgYmFzZXVybCBzaG91bGQgYmUgYSBzdHJpbmcgb3IgVVJMJyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBDU1JGIFRva2VuXG4gICAqXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gaWYgY3NyZlRva2VuIGlzIGVtcHR5IG9yIG5vdCBhIHN0cmluZyBvciBDc3JmVG9rZW4gb2JqZWN0XG4gICAqIEBwYXJhbSB7c3RyaW5nfENzcmZUb2tlbn0gY3NyZlRva2VuXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIHNldENzcmZUb2tlbihjc3JmVG9rZW4pIHtcbiAgICBpZiAoIWNzcmZUb2tlbikge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXBpQ2xpZW50T3B0aW9uIGNzcmZUb2tlbiBpcyByZXF1aXJlZC4nKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBjc3JmVG9rZW4gPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLmNzcmZUb2tlbiA9IG5ldyBDc3JmVG9rZW4oY3NyZlRva2VuKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGNzcmZUb2tlbiBpbnN0YW5jZW9mIENzcmZUb2tlbikge1xuICAgICAgICB0aGlzLmNzcmZUb2tlbiA9IGNzcmZUb2tlbjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FwaUNsaWVudE9wdGlvbiBjc3JmVG9rZW4gc2hvdWxkIGJlIGEgc3RyaW5nIG9yIGEgdmFsaWQgQ3NyZlRva2VuLicpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIHJlc291cmNlIG5hbWVcbiAgICpcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBpZiByZXNvdXJjZU5hbWUgaXMgZW1wdHksIG9yIG5vdCBhIHN0cmluZ1xuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVzb3VyY2VOYW1lIG5hbWVcbiAgICogQHJldHVybnMge0FwaUNsaWVudE9wdGlvbnN9XG4gICAqIEBwdWJsaWNcbiAgICovXG4gIHNldFJlc291cmNlTmFtZShyZXNvdXJjZU5hbWUpIHtcbiAgICBpZiAoIXJlc291cmNlTmFtZSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXBpQ2xpZW50T3B0aW9ucy5zZXRSZXNvdXJjZU5hbWUgcmVzb3VyY2VOYW1lIGlzIHJlcXVpcmVkLicpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHJlc291cmNlTmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FwaUNsaWVudE9wdGlvbnMuc2V0UmVzb3VyY2VOYW1lIHJlc291cmNlTmFtZSBzaG91bGQgYmUgYSB2YWxpZCBzdHJpbmcuJyk7XG4gICAgfVxuICAgIHRoaXMucmVzb3VyY2VOYW1lID0gcmVzb3VyY2VOYW1lO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtVUkx9IGJhc2VVcmxcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgZ2V0QmFzZVVybCgpIHtcbiAgICByZXR1cm4gdGhpcy5iYXNlVXJsO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IHJlc291cmNlTmFtZVxuICAgKiBAcHVibGljXG4gICAqL1xuICBnZXRSZXNvdXJjZU5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVzb3VyY2VOYW1lO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJlbGV2YW50IGNsaWVudCBvcHRpb25zIGFzIGZldGNoIG9wdGlvbnMgaGVhZGVyc1xuICAgKlxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIGdldEhlYWRlcnMoKSB7XG4gICAgaWYgKHRoaXMuY3NyZlRva2VuKSB7XG4gICAgICByZXR1cm4gdGhpcy5jc3JmVG9rZW4udG9GZXRjaEhlYWRlcnMoKTtcbiAgICB9XG4gIH1cbn1cbiIsIi8qKlxuICogUGFzc2JvbHQgfiBPcGVuIHNvdXJjZSBwYXNzd29yZCBtYW5hZ2VyIGZvciB0ZWFtc1xuICogQ29weXJpZ2h0IChjKSAyMDIwIFBhc3Nib2x0IFNBIChodHRwczovL3d3dy5wYXNzYm9sdC5jb20pXG4gKlxuICogTGljZW5zZWQgdW5kZXIgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIHZlcnNpb24gMyBvZiB0aGUgb3IgYW55IGxhdGVyIHZlcnNpb24uXG4gKiBGb3IgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSBzZWUgdGhlIExJQ0VOU0UudHh0XG4gKiBSZWRpc3RyaWJ1dGlvbnMgb2YgZmlsZXMgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UuXG4gKlxuICogQGNvcHlyaWdodCAgICAgQ29weXJpZ2h0IChjKSAyMDIwIFBhc3Nib2x0IFNBIChodHRwczovL3d3dy5wYXNzYm9sdC5jb20pXG4gKiBAbGljZW5zZSAgICAgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL0FHUEwtMy4wIEFHUEwgTGljZW5zZVxuICogQGxpbmsgICAgICAgICAgaHR0cHM6Ly93d3cucGFzc2JvbHQuY29tIFBhc3Nib2x0KHRtKVxuICovXG5leHBvcnQgY2xhc3MgQ3NyZlRva2VuIHtcbiAgLyoqXG4gICAqIENzcmZUb2tlbiBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge3N0cmluZ30gdG9rZW5cbiAgICovXG4gIGNvbnN0cnVjdG9yKHRva2VuKSB7XG4gICAgdGhpcy5zZXRUb2tlbih0b2tlbik7XG4gIH1cblxuICAvKipcbiAgICogVmFsaWRhdGVcbiAgICpcbiAgICogQHBhcmFtIHRva2VuXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gaWYgdG9rZW4gaXMgbm90IGEgc3RyaW5nIG9yIGlzIHVuZGVmaW5lZFxuICAgKiBAcHVibGljXG4gICAqL1xuICBzZXRUb2tlbih0b2tlbikge1xuICAgIHRoaXMudmFsaWRhdGUodG9rZW4pO1xuICAgIHRoaXMudG9rZW4gPSB0b2tlbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBWYWxpZGF0ZVxuICAgKlxuICAgKiBAcGFyYW0gdG9rZW5cbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBpZiB0b2tlbiBpcyBub3QgYSBzdHJpbmcgb3IgaXMgdW5kZWZpbmVkXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIHZhbGlkYXRlKHRva2VuKSB7XG4gICAgaWYgKCF0b2tlbikge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ1NSRiB0b2tlbiBjYW5ub3QgYmUgZW1wdHkuJyk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdG9rZW4gIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDU1JGIHRva2VuIHNob3VsZCBiZSBhIHN0cmluZy4nKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdG9rZW4gYXMga2V5IHZhbHVlIGhlYWRlclxuICAgKlxuICAgKiBAcmV0dXJucyB7e1wiWC1DU1JGLVRva2VuXCI6IHN0cmluZ319XG4gICAqL1xuICB0b0ZldGNoSGVhZGVycygpIHtcbiAgICByZXR1cm4geydYLUNTUkYtVG9rZW4nOiB0aGlzLnRva2VufTtcbiAgfVxufVxuIiwiLyoqXG4gKiBQYXNzYm9sdCB+IE9wZW4gc291cmNlIHBhc3N3b3JkIG1hbmFnZXIgZm9yIHRlYW1zXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgUGFzc2JvbHQgU0EgKGh0dHBzOi8vd3d3LnBhc3Nib2x0LmNvbSlcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgdmVyc2lvbiAzIG9mIHRoZSBvciBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqIEZvciBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHNlZSB0aGUgTElDRU5TRS50eHRcbiAqIFJlZGlzdHJpYnV0aW9ucyBvZiBmaWxlcyBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZS5cbiAqXG4gKiBAY29weXJpZ2h0ICAgICBDb3B5cmlnaHQgKGMpIDIwMjAgUGFzc2JvbHQgU0EgKGh0dHBzOi8vd3d3LnBhc3Nib2x0LmNvbSlcbiAqIEBsaWNlbnNlICAgICAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvQUdQTC0zLjAgQUdQTCBMaWNlbnNlXG4gKiBAbGluayAgICAgICAgICBodHRwczovL3d3dy5wYXNzYm9sdC5jb20gUGFzc2JvbHQodG0pXG4gKiBAc2luY2UgICAgICAgICAyLjEzLjBcbiAqL1xuLyoqXG4gKiBUaGlzIGZpbGUgY29udGFpbnMgaWNvbnMgZnJvbSBGb250QXdlc29tZSB2M1xuICogYnkgRGF2ZSBHYW5keSAtIGh0dHA6Ly9mb250YXdlc29tZS5pby5cbiAqXG4gKiBUaGUgRm9udCBBd2Vzb21lIGZvbnQgaXMgbGljZW5zZWQgdW5kZXIgdGhlIFNJTCBPRkwgMS4xOlxuICogaHR0cDovL3NjcmlwdHMuc2lsLm9yZy9PRkxcbiAqXG4gKiBGb250LUF3ZXNvbWUtU1ZHLVBORyBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoYykgMjAxNCBDb2RlIENoYXJtIEx0ZFxuICogaHR0cHM6Ly9naXRodWIuY29tL2VuY2hhcm0vRm9udC1Bd2Vzb21lLVNWRy1QTkdcbiAqL1xuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcblxuY2xhc3MgSWNvbiBleHRlbmRzIENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBHZXQgaWNvbiBjbGFzc25hbWVcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIGdldENsYXNzTmFtZSgpIHtcbiAgICBsZXQgY2xhc3NOYW1lID0gYHN2Zy1pY29uICR7dGhpcy5wcm9wcy5uYW1lfWA7XG4gICAgaWYgKHRoaXMucHJvcHMuYmlnKSB7XG4gICAgICBjbGFzc05hbWUgKz0gJyBpY29uLW9ubHknO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5iYXNlbGluZSkge1xuICAgICAgY2xhc3NOYW1lICs9ICcgYmFzZWxpbmUnO1xuICAgIH1cbiAgICByZXR1cm4gY2xhc3NOYW1lO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbmRlciB0aGUgY29tcG9uZW50XG4gICAqIEByZXR1cm4ge0pTWH1cbiAgICovXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPHNwYW4gY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzTmFtZSgpfSBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQ2xpY2t9PlxuICAgICAgICB7dGhpcy5wcm9wcy5uYW1lID09PSAnYmFuJyAmJlxuICAgICAgICA8c3ZnIHdpZHRoPVwiMTc5MlwiIGhlaWdodD1cIjE3OTJcIiB2aWV3Qm94PVwiMCAwIDE3OTIgMTc5MlwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICA8cGF0aCBkPVwiTTE0NDAgODkzcTAtMTYxLTg3LTI5NWwtNzU0IDc1M3ExMzcgODkgMjk3IDg5IDExMSAwIDIxMS41LTQzLjV0MTczLjUtMTE2LjUgMTE2LTE3NC41IDQzLTIxMi41em0tOTk5IDI5OWw3NTUtNzU0cS0xMzUtOTEtMzAwLTkxLTE0OCAwLTI3MyA3M3QtMTk4IDE5OS03MyAyNzRxMCAxNjIgODkgMjk5em0xMjIzLTI5OXEwIDE1Ny02MSAzMDB0LTE2My41IDI0Ni0yNDUgMTY0LTI5OC41IDYxLTI5OC41LTYxLTI0NS0xNjQtMTYzLjUtMjQ2LTYxLTMwMCA2MS0yOTkuNSAxNjMuNS0yNDUuNSAyNDUtMTY0IDI5OC41LTYxIDI5OC41IDYxIDI0NSAxNjQgMTYzLjUgMjQ1LjUgNjEgMjk5LjV6XCIvPlxuICAgICAgICA8L3N2Zz5cbiAgICAgICAgfVxuICAgICAgICB7dGhpcy5wcm9wcy5uYW1lID09PSAnY2FtZXJhJyAmJlxuICAgICAgICA8c3ZnIHdpZHRoPVwiMjA0OFwiIGhlaWdodD1cIjE3OTJcIiB2aWV3Qm94PVwiMCAwIDIwNDggMTc5MlwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICA8cGF0aCBkPVwiTTEwMjQgNjcycTExOSAwIDIwMy41IDg0LjV0ODQuNSAyMDMuNS04NC41IDIwMy41LTIwMy41IDg0LjUtMjAzLjUtODQuNS04NC41LTIwMy41IDg0LjUtMjAzLjUgMjAzLjUtODQuNXptNzA0LTQxNnExMDYgMCAxODEgNzV0NzUgMTgxdjg5NnEwIDEwNi03NSAxODF0LTE4MSA3NWgtMTQwOHEtMTA2IDAtMTgxLTc1dC03NS0xODF2LTg5NnEwLTEwNiA3NS0xODF0MTgxLTc1aDIyNGw1MS0xMzZxMTktNDkgNjkuNS04NC41dDEwMy41LTM1LjVoNTEycTUzIDAgMTAzLjUgMzUuNXQ2OS41IDg0LjVsNTEgMTM2aDIyNHptLTcwNCAxMTUycTE4NSAwIDMxNi41LTEzMS41dDEzMS41LTMxNi41LTEzMS41LTMxNi41LTMxNi41LTEzMS41LTMxNi41IDEzMS41LTEzMS41IDMxNi41IDEzMS41IDMxNi41IDMxNi41IDEzMS41elwiLz5cbiAgICAgICAgPC9zdmc+XG4gICAgICAgIH1cblxuICAgICAgICB7dGhpcy5wcm9wcy5uYW1lID09PSAnY2FyZXQtcmlnaHQnICYmXG4gICAgICAgIDxzdmcgd2lkdGg9XCIxNzkyXCIgaGVpZ2h0PVwiMTc5MlwiIHZpZXdCb3g9XCIwIDAgMTc5MiAxNzkyXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgIDxwYXRoIGQ9XCJNMTE1MiA4OTZxMCAyNi0xOSA0NWwtNDQ4IDQ0OHEtMTkgMTktNDUgMTl0LTQ1LTE5LTE5LTQ1di04OTZxMC0yNiAxOS00NXQ0NS0xOSA0NSAxOWw0NDggNDQ4cTE5IDE5IDE5IDQ1elwiLz5cbiAgICAgICAgPC9zdmc+XG4gICAgICAgIH1cbiAgICAgICAge3RoaXMucHJvcHMubmFtZSA9PT0gJ2NhcmV0LWRvd24nICYmXG4gICAgICAgIDxzdmcgd2lkdGg9XCIxNzkyXCIgaGVpZ2h0PVwiMTc5MlwiIHZpZXdCb3g9XCIwIDAgMTc5MiAxNzkyXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgIDxwYXRoIGQ9XCJNMTQwOCA3MDRxMCAyNi0xOSA0NWwtNDQ4IDQ0OHEtMTkgMTktNDUgMTl0LTQ1LTE5bC00NDgtNDQ4cS0xOS0xOS0xOS00NXQxOS00NSA0NS0xOWg4OTZxMjYgMCA0NSAxOXQxOSA0NXpcIi8+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgICB9XG4gICAgICAgIHt0aGlzLnByb3BzLm5hbWUgPT09ICdjYXJldC11cCcgJiZcbiAgICAgICAgPHN2ZyB3aWR0aD1cIjE3OTJcIiBoZWlnaHQ9XCIxNzkyXCIgdmlld0JveD1cIjAgMCAxNzkyIDE3OTJcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgPHBhdGggZD1cIk0xNDA4IDEyMTZxMCAyNi0xOSA0NXQtNDUgMTloLTg5NnEtMjYgMC00NS0xOXQtMTktNDUgMTktNDVsNDQ4LTQ0OHExOS0xOSA0NS0xOXQ0NSAxOWw0NDggNDQ4cTE5IDE5IDE5IDQ1elwiLz5cbiAgICAgICAgPC9zdmc+XG4gICAgICAgIH1cbiAgICAgICAge3RoaXMucHJvcHMubmFtZSA9PT0gJ2NoZXZyb24tbGVmdCcgJiZcbiAgICAgICAgPHN2ZyB3aWR0aD1cIjE3OTJcIiBoZWlnaHQ9XCIxNzkyXCIgdmlld0JveD1cIjAgMCAxNzkyIDE3OTJcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgPHBhdGggZD1cIk0xNDI3IDMwMWwtNTMxIDUzMSA1MzEgNTMxcTE5IDE5IDE5IDQ1dC0xOSA0NWwtMTY2IDE2NnEtMTkgMTktNDUgMTl0LTQ1LTE5bC03NDItNzQycS0xOS0xOS0xOS00NXQxOS00NWw3NDItNzQycTE5LTE5IDQ1LTE5dDQ1IDE5bDE2NiAxNjZxMTkgMTkgMTkgNDV0LTE5IDQ1elwiLz5cbiAgICAgICAgPC9zdmc+XG4gICAgICAgIH1cbiAgICAgICAge3RoaXMucHJvcHMubmFtZSA9PT0gJ2NoZXZyb24tcmlnaHQnICYmXG4gICAgICAgIDxzdmcgd2lkdGg9XCIxNzkyXCIgaGVpZ2h0PVwiMTc5MlwiIHZpZXdCb3g9XCIwIDAgMTc5MiAxNzkyXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgIDxwYXRoIGQ9XCJNMTM2MyA4NzdsLTc0MiA3NDJxLTE5IDE5LTQ1IDE5dC00NS0xOWwtMTY2LTE2NnEtMTktMTktMTktNDV0MTktNDVsNTMxLTUzMS01MzEtNTMxcS0xOS0xOS0xOS00NXQxOS00NWwxNjYtMTY2cTE5LTE5IDQ1LTE5dDQ1IDE5bDc0MiA3NDJxMTkgMTkgMTkgNDV0LTE5IDQ1elwiLz5cbiAgICAgICAgPC9zdmc+XG4gICAgICAgIH1cbiAgICAgICAge3RoaXMucHJvcHMubmFtZSA9PT0gJ2Nsb3NlJyAmJlxuICAgICAgICA8c3ZnIHdpZHRoPVwiMTc5MlwiIGhlaWdodD1cIjE3OTJcIiB2aWV3Qm94PVwiMCAwIDE3OTIgMTc5MlwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICA8cGF0aCBkPVwiTTE0OTAgMTMyMnEwIDQwLTI4IDY4bC0xMzYgMTM2cS0yOCAyOC02OCAyOHQtNjgtMjhsLTI5NC0yOTQtMjk0IDI5NHEtMjggMjgtNjggMjh0LTY4LTI4bC0xMzYtMTM2cS0yOC0yOC0yOC02OHQyOC02OGwyOTQtMjk0LTI5NC0yOTRxLTI4LTI4LTI4LTY4dDI4LTY4bDEzNi0xMzZxMjgtMjggNjgtMjh0NjggMjhsMjk0IDI5NCAyOTQtMjk0cTI4LTI4IDY4LTI4dDY4IDI4bDEzNiAxMzZxMjggMjggMjggNjh0LTI4IDY4bC0yOTQgMjk0IDI5NCAyOTRxMjggMjggMjggNjh6XCIvPlxuICAgICAgICA8L3N2Zz5cbiAgICAgICAgfVxuICAgICAgICB7dGhpcy5wcm9wcy5uYW1lID09PSAnY2xvc2UtY2lyY2xlJyAmJlxuICAgICAgICA8c3ZnIHdpZHRoPVwiMTc5MlwiIGhlaWdodD1cIjE3OTJcIiB2aWV3Qm94PVwiMCAwIDE3OTIgMTc5MlwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICA8cGF0aCBkPVwiTTEyNzcgMTEyMnEwLTI2LTE5LTQ1bC0xODEtMTgxIDE4MS0xODFxMTktMTkgMTktNDUgMC0yNy0xOS00NmwtOTAtOTBxLTE5LTE5LTQ2LTE5LTI2IDAtNDUgMTlsLTE4MSAxODEtMTgxLTE4MXEtMTktMTktNDUtMTktMjcgMC00NiAxOWwtOTAgOTBxLTE5IDE5LTE5IDQ2IDAgMjYgMTkgNDVsMTgxIDE4MS0xODEgMTgxcS0xOSAxOS0xOSA0NSAwIDI3IDE5IDQ2bDkwIDkwcTE5IDE5IDQ2IDE5IDI2IDAgNDUtMTlsMTgxLTE4MSAxODEgMTgxcTE5IDE5IDQ1IDE5IDI3IDAgNDYtMTlsOTAtOTBxMTktMTkgMTktNDZ6bTM4Ny0yMjZxMCAyMDktMTAzIDM4NS41dC0yNzkuNSAyNzkuNS0zODUuNSAxMDMtMzg1LjUtMTAzLTI3OS41LTI3OS41LTEwMy0zODUuNSAxMDMtMzg1LjUgMjc5LjUtMjc5LjUgMzg1LjUtMTAzIDM4NS41IDEwMyAyNzkuNSAyNzkuNSAxMDMgMzg1LjV6XCIvPlxuICAgICAgICA8L3N2Zz5cbiAgICAgICAgfVxuICAgICAgICB7dGhpcy5wcm9wcy5uYW1lID09PSAnY29weS10by1jbGlwYm9hcmQnICYmXG4gICAgICAgIDxzdmcgd2lkdGg9XCIxNzkyXCIgaGVpZ2h0PVwiMTc5MlwiIHZpZXdCb3g9XCIwIDAgMTc5MiAxNzkyXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgIDxwYXRoIGQ9XCJNNzY4IDE2NjRoODk2di02NDBoLTQxNnEtNDAgMC02OC0yOHQtMjgtNjh2LTQxNmgtMzg0djExNTJ6bTI1Ni0xNDQwdi02NHEwLTEzLTkuNS0yMi41dC0yMi41LTkuNWgtNzA0cS0xMyAwLTIyLjUgOS41dC05LjUgMjIuNXY2NHEwIDEzIDkuNSAyMi41dDIyLjUgOS41aDcwNHExMyAwIDIyLjUtOS41dDkuNS0yMi41em0yNTYgNjcyaDI5OWwtMjk5LTI5OXYyOTl6bTUxMiAxMjh2NjcycTAgNDAtMjggNjh0LTY4IDI4aC05NjBxLTQwIDAtNjgtMjh0LTI4LTY4di0xNjBoLTU0NHEtNDAgMC02OC0yOHQtMjgtNjh2LTEzNDRxMC00MCAyOC02OHQ2OC0yOGgxMDg4cTQwIDAgNjggMjh0MjggNjh2MzI4cTIxIDEzIDM2IDI4bDQwOCA0MDhxMjggMjggNDggNzZ0MjAgODh6XCIvPlxuICAgICAgICA8L3N2Zz5cbiAgICAgICAgfVxuICAgICAgICB7dGhpcy5wcm9wcy5uYW1lID09PSAnZG93bmxvYWQnICYmXG4gICAgICAgIDxzdmcgd2lkdGg9XCIxNzkyXCIgaGVpZ2h0PVwiMTc5MlwiIHZpZXdCb3g9XCIwIDAgMTc5MiAxNzkyXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgIDxwYXRoIGQ9XCJNMTM0NCAxMzQ0cTAtMjYtMTktNDV0LTQ1LTE5LTQ1IDE5LTE5IDQ1IDE5IDQ1IDQ1IDE5IDQ1LTE5IDE5LTQ1em0yNTYgMHEwLTI2LTE5LTQ1dC00NS0xOS00NSAxOS0xOSA0NSAxOSA0NSA0NSAxOSA0NS0xOSAxOS00NXptMTI4LTIyNHYzMjBxMCA0MC0yOCA2OHQtNjggMjhoLTE0NzJxLTQwIDAtNjgtMjh0LTI4LTY4di0zMjBxMC00MCAyOC02OHQ2OC0yOGg0NjVsMTM1IDEzNnE1OCA1NiAxMzYgNTZ0MTM2LTU2bDEzNi0xMzZoNDY0cTQwIDAgNjggMjh0MjggNjh6bS0zMjUtNTY5cTE3IDQxLTE0IDcwbC00NDggNDQ4cS0xOCAxOS00NSAxOXQtNDUtMTlsLTQ0OC00NDhxLTMxLTI5LTE0LTcwIDE3LTM5IDU5LTM5aDI1NnYtNDQ4cTAtMjYgMTktNDV0NDUtMTloMjU2cTI2IDAgNDUgMTl0MTkgNDV2NDQ4aDI1NnE0MiAwIDU5IDM5elwiLz5cbiAgICAgICAgPC9zdmc+XG4gICAgICAgIH1cbiAgICAgICAge3RoaXMucHJvcHMubmFtZSA9PT0gJ2VkaXQnICYmXG4gICAgICAgIDxzdmcgd2lkdGg9XCIxNzkyXCIgaGVpZ2h0PVwiMTc5MlwiIHZpZXdCb3g9XCIwIDAgMTc5MiAxNzkyXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgIDxwYXRoIGQ9XCJNODg4IDExODRsMTE2LTExNi0xNTItMTUyLTExNiAxMTZ2NTZoOTZ2OTZoNTZ6bTQ0MC03MjBxLTE2LTE2LTMzIDFsLTM1MCAzNTBxLTE3IDE3LTEgMzN0MzMtMWwzNTAtMzUwcTE3LTE3IDEtMzN6bTgwIDU5NHYxOTBxMCAxMTktODQuNSAyMDMuNXQtMjAzLjUgODQuNWgtODMycS0xMTkgMC0yMDMuNS04NC41dC04NC41LTIwMy41di04MzJxMC0xMTkgODQuNS0yMDMuNXQyMDMuNS04NC41aDgzMnE2MyAwIDExNyAyNSAxNSA3IDE4IDIzIDMgMTctOSAyOWwtNDkgNDlxLTE0IDE0LTMyIDgtMjMtNi00NS02aC04MzJxLTY2IDAtMTEzIDQ3dC00NyAxMTN2ODMycTAgNjYgNDcgMTEzdDExMyA0N2g4MzJxNjYgMCAxMTMtNDd0NDctMTEzdi0xMjZxMC0xMyA5LTIybDY0LTY0cTE1LTE1IDM1LTd0MjAgMjl6bS05Ni03MzhsMjg4IDI4OC02NzIgNjcyaC0yODh2LTI4OHptNDQ0IDEzMmwtOTIgOTItMjg4LTI4OCA5Mi05MnEyOC0yOCA2OC0yOHQ2OCAyOGwxNTIgMTUycTI4IDI4IDI4IDY4dC0yOCA2OHpcIi8+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgICB9XG4gICAgICAgIHt0aGlzLnByb3BzLm5hbWUgPT09ICdleWUtb3BlbicgJiZcbiAgICAgICAgPHN2ZyB3aWR0aD1cIjE3OTJcIiBoZWlnaHQ9XCIxNzkyXCIgdmlld0JveD1cIjAgMCAxNzkyIDE3OTJcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgPHBhdGggZD1cIk0xNjY0IDk2MHEtMTUyLTIzNi0zODEtMzUzIDYxIDEwNCA2MSAyMjUgMCAxODUtMTMxLjUgMzE2LjV0LTMxNi41IDEzMS41LTMxNi41LTEzMS41LTEzMS41LTMxNi41cTAtMTIxIDYxLTIyNS0yMjkgMTE3LTM4MSAzNTMgMTMzIDIwNSAzMzMuNSAzMjYuNXQ0MzQuNSAxMjEuNSA0MzQuNS0xMjEuNSAzMzMuNS0zMjYuNXptLTcyMC0zODRxMC0yMC0xNC0zNHQtMzQtMTRxLTEyNSAwLTIxNC41IDg5LjV0LTg5LjUgMjE0LjVxMCAyMCAxNCAzNHQzNCAxNCAzNC0xNCAxNC0zNHEwLTg2IDYxLTE0N3QxNDctNjFxMjAgMCAzNC0xNHQxNC0zNHptODQ4IDM4NHEwIDM0LTIwIDY5LTE0MCAyMzAtMzc2LjUgMzY4LjV0LTQ5OS41IDEzOC41LTQ5OS41LTEzOS0zNzYuNS0zNjhxLTIwLTM1LTIwLTY5dDIwLTY5cTE0MC0yMjkgMzc2LjUtMzY4dDQ5OS41LTEzOSA0OTkuNSAxMzkgMzc2LjUgMzY4cTIwIDM1IDIwIDY5elwiLz5cbiAgICAgICAgPC9zdmc+XG4gICAgICAgIH1cbiAgICAgICAge3RoaXMucHJvcHMubmFtZSA9PT0gJ2V5ZS1jbG9zZScgJiZcbiAgICAgICAgPHN2ZyB3aWR0aD1cIjE3OTJcIiBoZWlnaHQ9XCIxNzkyXCIgdmlld0JveD1cIjAgMCAxNzkyIDE3OTJcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgPHBhdGggZD1cIk01NTUgMTMzNWw3OC0xNDFxLTg3LTYzLTEzNi0xNTl0LTQ5LTIwM3EwLTEyMSA2MS0yMjUtMjI5IDExNy0zODEgMzUzIDE2NyAyNTggNDI3IDM3NXptMzg5LTc1OXEwLTIwLTE0LTM0dC0zNC0xNHEtMTI1IDAtMjE0LjUgODkuNXQtODkuNSAyMTQuNXEwIDIwIDE0IDM0dDM0IDE0IDM0LTE0IDE0LTM0cTAtODYgNjEtMTQ3dDE0Ny02MXEyMCAwIDM0LTE0dDE0LTM0em0zNjMtMTkxcTAgNy0xIDktMTA2IDE4OS0zMTYgNTY3dC0zMTUgNTY2bC00OSA4OXEtMTAgMTYtMjggMTYtMTIgMC0xMzQtNzAtMTYtMTAtMTYtMjggMC0xMiA0NC04Ny0xNDMtNjUtMjYzLjUtMTczdC0yMDguNS0yNDVxLTIwLTMxLTIwLTY5dDIwLTY5cTE1My0yMzUgMzgwLTM3MXQ0OTYtMTM2cTg5IDAgMTgwIDE3bDU0LTk3cTEwLTE2IDI4LTE2IDUgMCAxOCA2dDMxIDE1LjUgMzMgMTguNSAzMS41IDE4LjUgMTkuNSAxMS41cTE2IDEwIDE2IDI3em0zNyA0NDdxMCAxMzktNzkgMjUzLjV0LTIwOSAxNjQuNWwyODAtNTAycTggNDUgOCA4NHptNDQ4IDEyOHEwIDM1LTIwIDY5LTM5IDY0LTEwOSAxNDUtMTUwIDE3Mi0zNDcuNSAyNjd0LTQxOS41IDk1bDc0LTEzMnEyMTItMTggMzkyLjUtMTM3dDMwMS41LTMwN3EtMTE1LTE3OS0yODItMjk0bDYzLTExMnE5NSA2NCAxODIuNSAxNTN0MTQ0LjUgMTg0cTIwIDM0IDIwIDY5elwiLz5cbiAgICAgICAgPC9zdmc+XG4gICAgICAgIH1cbiAgICAgICAge3RoaXMucHJvcHMubmFtZSA9PT0gJ2V4dGVybmFsLWxpbmsnICYmXG4gICAgICAgIDxzdmcgd2lkdGg9XCIxNzkyXCIgaGVpZ2h0PVwiMTc5MlwiIHZpZXdCb3g9XCIwIDAgMTc5MiAxNzkyXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgIDxwYXRoIGQ9XCJNMTQwOCA5Mjh2LTQ4MHEwLTI2LTE5LTQ1dC00NS0xOWgtNDgwcS00MiAwLTU5IDM5LTE3IDQxIDE0IDcwbDE0NCAxNDQtNTM0IDUzNHEtMTkgMTktMTkgNDV0MTkgNDVsMTAyIDEwMnExOSAxOSA0NSAxOXQ0NS0xOWw1MzQtNTM0IDE0NCAxNDRxMTggMTkgNDUgMTkgMTIgMCAyNS01IDM5LTE3IDM5LTU5em0yNTYtNTEydjk2MHEwIDExOS04NC41IDIwMy41dC0yMDMuNSA4NC41aC05NjBxLTExOSAwLTIwMy41LTg0LjV0LTg0LjUtMjAzLjV2LTk2MHEwLTExOSA4NC41LTIwMy41dDIwMy41LTg0LjVoOTYwcTExOSAwIDIwMy41IDg0LjV0ODQuNSAyMDMuNXpcIi8+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgICB9XG4gICAgICAgIHt0aGlzLnByb3BzLm5hbWUgPT09ICdmb2xkZXInICYmXG4gICAgICAgIDxzdmcgd2lkdGg9XCIxNzkyXCIgaGVpZ2h0PVwiMTc5MlwiIHZpZXdCb3g9XCIwIDAgMTc5MiAxNzkyXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgIDxwYXRoIGQ9XCJNMTcyOCA2MDh2NzA0cTAgOTItNjYgMTU4dC0xNTggNjZoLTEyMTZxLTkyIDAtMTU4LTY2dC02Ni0xNTh2LTk2MHEwLTkyIDY2LTE1OHQxNTgtNjZoMzIwcTkyIDAgMTU4IDY2dDY2IDE1OHYzMmg2NzJxOTIgMCAxNTggNjZ0NjYgMTU4elwiLz5cbiAgICAgICAgPC9zdmc+XG4gICAgICAgIH1cbiAgICAgICAge3RoaXMucHJvcHMubmFtZSA9PT0gJ2ZvbGRlci1zaGFyZWQnICYmXG4gICAgICAgIDxzdmcgdmlld0JveD1cIjIgMiAyMCAyMFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICA8cGF0aCBkPVwiTTIwIDZoLThsLTItMkg0Yy0xLjEgMC0xLjk5LjktMS45OSAyTDIgMThjMCAxLjEuOSAyIDIgMmgxNmMxLjEgMCAyLS45IDItMlY4YzAtMS4xLS45LTItMi0yem0tNSAzYzEuMSAwIDIgLjkgMiAycy0uOSAyLTIgMi0yLS45LTItMiAuOS0yIDItMnptNCA4aC04di0xYzAtMS4zMyAyLjY3LTIgNC0yczQgLjY3IDQgMnYxelwiLz5cbiAgICAgICAgPC9zdmc+XG4gICAgICAgIH1cbiAgICAgICAge3RoaXMucHJvcHMubmFtZSA9PT0gJ2hlYXJ0JyAmJlxuICAgICAgICA8c3ZnIHdpZHRoPVwiMTc5MlwiIGhlaWdodD1cIjE3OTJcIiB2aWV3Qm94PVwiMCAwIDE3OTIgMTc5MlwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICA8cGF0aCBkPVwiTTg5NiAxNjY0cS0yNiAwLTQ0LTE4bC02MjQtNjAycS0xMC04LTI3LjUtMjZ0LTU1LjUtNjUuNS02OC05Ny41LTUzLjUtMTIxLTIzLjUtMTM4cTAtMjIwIDEyNy0zNDR0MzUxLTEyNHE2MiAwIDEyNi41IDIxLjV0MTIwIDU4IDk1LjUgNjguNSA3NiA2OHEzNi0zNiA3Ni02OHQ5NS41LTY4LjUgMTIwLTU4IDEyNi41LTIxLjVxMjI0IDAgMzUxIDEyNHQxMjcgMzQ0cTAgMjIxLTIyOSA0NTBsLTYyMyA2MDBxLTE4IDE4LTQ0IDE4elwiLz5cbiAgICAgICAgPC9zdmc+XG4gICAgICAgIH1cbiAgICAgICAge3RoaXMucHJvcHMubmFtZSA9PT0gJ2hlYXJ0LW8nICYmXG4gICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiPlxuICAgICAgICAgIDxwYXRoIGQ9XCJNNDU4LjQgNjQuM0M0MDAuNiAxNS43IDMxMS4zIDIzIDI1NiA3OS4zIDIwMC43IDIzIDExMS40IDE1LjYgNTMuNiA2NC4zLTIxLjYgMTI3LjYtMTAuNiAyMzAuOCA0MyAyODUuNWwxNzUuNCAxNzguN2MxMCAxMC4yIDIzLjQgMTUuOSAzNy42IDE1LjkgMTQuMyAwIDI3LjYtNS42IDM3LjYtMTUuOEw0NjkgMjg1LjZjNTMuNS01NC43IDY0LjctMTU3LjktMTAuNi0yMjEuM3ptLTIzLjYgMTg3LjVMMjU5LjQgNDMwLjVjLTIuNCAyLjQtNC40IDIuNC02LjggMEw3Ny4yIDI1MS44Yy0zNi41LTM3LjItNDMuOS0xMDcuNiA3LjMtMTUwLjcgMzguOS0zMi43IDk4LjktMjcuOCAxMzYuNSAxMC41bDM1IDM1LjcgMzUtMzUuN2MzNy44LTM4LjUgOTcuOC00My4yIDEzNi41LTEwLjYgNTEuMSA0My4xIDQzLjUgMTEzLjkgNy4zIDE1MC44elwiLz5cbiAgICAgICAgPC9zdmc+XG4gICAgICAgIH1cbiAgICAgICAge3RoaXMucHJvcHMubmFtZSA9PT0gJ2hlYXJ0YmVhdCcgJiZcbiAgICAgICAgPHN2ZyB3aWR0aD1cIjE3OTJcIiBoZWlnaHQ9XCIxNzkyXCIgdmlld0JveD1cIjAgMCAxNzkyIDE3OTJcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgPHBhdGggZD1cIk0xMjgwIDEwMjRoMzA1cS01IDYtMTAgMTAuNXQtOSA3LjVsLTMgNC02MjMgNjAwcS0xOCAxOC00NCAxOHQtNDQtMThsLTYyNC02MDJxLTUtMi0yMS0yMGgzNjlxMjIgMCAzOS41LTEzLjV0MjIuNS0zNC41bDcwLTI4MSAxOTAgNjY3cTYgMjAgMjMgMzN0MzkgMTNxMjEgMCAzOC0xM3QyMy0zM2wxNDYtNDg1IDU2IDExMnExOCAzNSA1NyAzNXptNTEyLTQyOHEwIDE0NS0xMDMgMzAwaC0zNjlsLTExMS0yMjFxLTgtMTctMjUuNS0yN3QtMzYuNS04cS00NSA1LTU2IDQ2bC0xMjkgNDMwLTE5Ni02ODZxLTYtMjAtMjMuNS0zM3QtMzkuNS0xMy0zOSAxMy41LTIyIDM0LjVsLTExNiA0NjRoLTQyM3EtMTAzLTE1NS0xMDMtMzAwIDAtMjIwIDEyNy0zNDR0MzUxLTEyNHE2MiAwIDEyNi41IDIxLjV0MTIwIDU4IDk1LjUgNjguNSA3NiA2OHEzNi0zNiA3Ni02OHQ5NS41LTY4LjUgMTIwLTU4IDEyNi41LTIxLjVxMjI0IDAgMzUxIDEyNHQxMjcgMzQ0elwiLz5cbiAgICAgICAgPC9zdmc+XG4gICAgICAgIH1cbiAgICAgICAge3RoaXMucHJvcHMubmFtZSA9PT0gJ2luZm8tY2lyY2xlJyAmJlxuICAgICAgICA8c3ZnIHdpZHRoPVwiMTc5MlwiIGhlaWdodD1cIjE3OTJcIiB2aWV3Qm94PVwiMCAwIDE3OTIgMTc5MlwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICA8cGF0aCBkPVwiTTExNTIgMTM3NnYtMTYwcTAtMTQtOS0yM3QtMjMtOWgtOTZ2LTUxMnEwLTE0LTktMjN0LTIzLTloLTMyMHEtMTQgMC0yMyA5dC05IDIzdjE2MHEwIDE0IDkgMjN0MjMgOWg5NnYzMjBoLTk2cS0xNCAwLTIzIDl0LTkgMjN2MTYwcTAgMTQgOSAyM3QyMyA5aDQ0OHExNCAwIDIzLTl0OS0yM3ptLTEyOC04OTZ2LTE2MHEwLTE0LTktMjN0LTIzLTloLTE5MnEtMTQgMC0yMyA5dC05IDIzdjE2MHEwIDE0IDkgMjN0MjMgOWgxOTJxMTQgMCAyMy05dDktMjN6bTY0MCA0MTZxMCAyMDktMTAzIDM4NS41dC0yNzkuNSAyNzkuNS0zODUuNSAxMDMtMzg1LjUtMTAzLTI3OS41LTI3OS41LTEwMy0zODUuNSAxMDMtMzg1LjUgMjc5LjUtMjc5LjUgMzg1LjUtMTAzIDM4NS41IDEwMyAyNzkuNSAyNzkuNSAxMDMgMzg1LjV6XCIvPlxuICAgICAgICA8L3N2Zz5cbiAgICAgICAgfVxuICAgICAgICB7dGhpcy5wcm9wcy5uYW1lID09PSAna2V5JyAmJlxuICAgICAgICA8c3ZnIHdpZHRoPVwiNTEyXCIgaGVpZ2h0PVwiNTEyXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiPlxuICAgICAgICAgIDxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTUxMiAxNzYuMDAxQzUxMiAyNzMuMjAzIDQzMy4yMDIgMzUyIDMzNiAzNTJjLTExLjIyIDAtMjIuMTktMS4wNjItMzIuODI3LTMuMDY5bC0yNC4wMTIgMjcuMDE0QTIzLjk5OSAyMy45OTkgMCAwIDEgMjYxLjIyMyAzODRIMjI0djQwYzAgMTMuMjU1LTEwLjc0NSAyNC0yNCAyNGgtNDB2NDBjMCAxMy4yNTUtMTAuNzQ1IDI0LTI0IDI0SDI0Yy0xMy4yNTUgMC0yNC0xMC43NDUtMjQtMjR2LTc4LjA1OWMwLTYuMzY1IDIuNTI5LTEyLjQ3IDcuMDI5LTE2Ljk3MWwxNjEuODAyLTE2MS44MDJDMTYzLjEwOCAyMTMuODE0IDE2MCAxOTUuMjcxIDE2MCAxNzYgMTYwIDc4Ljc5OCAyMzguNzk3LjAwMSAzMzUuOTk5IDAgNDMzLjQ4OC0uMDAxIDUxMiA3OC41MTEgNTEyIDE3Ni4wMDF6TTMzNiAxMjhjMCAyNi41MSAyMS40OSA0OCA0OCA0OHM0OC0yMS40OSA0OC00OC0yMS40OS00OC00OC00OC00OCAyMS40OS00OCA0OHpcIi8+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgICB9XG4gICAgICAgIHt0aGlzLnByb3BzLm5hbWUgPT09ICdsaW5rJyAmJlxuICAgICAgICA8c3ZnIHdpZHRoPVwiMTc5MlwiIGhlaWdodD1cIjE3OTJcIiB2aWV3Qm94PVwiMCAwIDE3OTIgMTc5MlwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICA8cGF0aCBkPVwiTTE1MjAgMTIxNnEwLTQwLTI4LTY4bC0yMDgtMjA4cS0yOC0yOC02OC0yOC00MiAwLTcyIDMyIDMgMyAxOSAxOC41dDIxLjUgMjEuNSAxNSAxOSAxMyAyNS41IDMuNSAyNy41cTAgNDAtMjggNjh0LTY4IDI4cS0xNSAwLTI3LjUtMy41dC0yNS41LTEzLTE5LTE1LTIxLjUtMjEuNS0xOC41LTE5cS0zMyAzMS0zMyA3MyAwIDQwIDI4IDY4bDIwNiAyMDdxMjcgMjcgNjggMjcgNDAgMCA2OC0yNmwxNDctMTQ2cTI4LTI4IDI4LTY3em0tNzAzLTcwNXEwLTQwLTI4LTY4bC0yMDYtMjA3cS0yOC0yOC02OC0yOC0zOSAwLTY4IDI3bC0xNDcgMTQ2cS0yOCAyOC0yOCA2NyAwIDQwIDI4IDY4bDIwOCAyMDhxMjcgMjcgNjggMjcgNDIgMCA3Mi0zMS0zLTMtMTktMTguNXQtMjEuNS0yMS41LTE1LTE5LTEzLTI1LjUtMy41LTI3LjVxMC00MCAyOC02OHQ2OC0yOHExNSAwIDI3LjUgMy41dDI1LjUgMTMgMTkgMTUgMjEuNSAyMS41IDE4LjUgMTlxMzMtMzEgMzMtNzN6bTg5NSA3MDVxMCAxMjAtODUgMjAzbC0xNDcgMTQ2cS04MyA4My0yMDMgODMtMTIxIDAtMjA0LTg1bC0yMDYtMjA3cS04My04My04My0yMDMgMC0xMjMgODgtMjA5bC04OC04OHEtODYgODgtMjA4IDg4LTEyMCAwLTIwNC04NGwtMjA4LTIwOHEtODQtODQtODQtMjA0dDg1LTIwM2wxNDctMTQ2cTgzLTgzIDIwMy04MyAxMjEgMCAyMDQgODVsMjA2IDIwN3E4MyA4MyA4MyAyMDMgMCAxMjMtODggMjA5bDg4IDg4cTg2LTg4IDIwOC04OCAxMjAgMCAyMDQgODRsMjA4IDIwOHE4NCA4NCA4NCAyMDR6XCIvPlxuICAgICAgICA8L3N2Zz5cbiAgICAgICAgfVxuICAgICAgICB7dGhpcy5wcm9wcy5uYW1lID09PSAnbG9jaycgJiZcbiAgICAgICAgPHN2ZyB3aWR0aD1cIjE3OTJcIiBoZWlnaHQ9XCIxNzkyXCIgdmlld0JveD1cIjAgMCAxNzkyIDE3OTJcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgPHBhdGggZD1cIk02NDAgNzY4aDUxMnYtMTkycTAtMTA2LTc1LTE4MXQtMTgxLTc1LTE4MSA3NS03NSAxODF2MTkyem04MzIgOTZ2NTc2cTAgNDAtMjggNjh0LTY4IDI4aC05NjBxLTQwIDAtNjgtMjh0LTI4LTY4di01NzZxMC00MCAyOC02OHQ2OC0yOGgzMnYtMTkycTAtMTg0IDEzMi0zMTZ0MzE2LTEzMiAzMTYgMTMyIDEzMiAzMTZ2MTkyaDMycTQwIDAgNjggMjh0MjggNjh6XCIvPlxuICAgICAgICA8L3N2Zz5cbiAgICAgICAgfVxuICAgICAgICB7dGhpcy5wcm9wcy5uYW1lID09PSAnbG9jay1vcGVuJyAmJlxuICAgICAgICA8c3ZnIHdpZHRoPVwiMTc5MlwiIGhlaWdodD1cIjE3OTJcIiB2aWV3Qm94PVwiMCAwIDE3OTIgMTc5MlwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICA8cGF0aCBkPVwiTTEzNzYgNzY4cTQwIDAgNjggMjh0MjggNjh2NTc2cTAgNDAtMjggNjh0LTY4IDI4aC05NjBxLTQwIDAtNjgtMjh0LTI4LTY4di01NzZxMC00MCAyOC02OHQ2OC0yOGgzMnYtMzIwcTAtMTg1IDEzMS41LTMxNi41dDMxNi41LTEzMS41IDMxNi41IDEzMS41IDEzMS41IDMxNi41cTAgMjYtMTkgNDV0LTQ1IDE5aC02NHEtMjYgMC00NS0xOXQtMTktNDVxMC0xMDYtNzUtMTgxdC0xODEtNzUtMTgxIDc1LTc1IDE4MXYzMjBoNzM2elwiLz5cbiAgICAgICAgPC9zdmc+XG4gICAgICAgIH1cbiAgICAgICAge3RoaXMucHJvcHMubmFtZSA9PT0gJ21hZ2ljLXdhbmQnICYmXG4gICAgICAgIDxzdmcgd2lkdGg9XCIxNzkyXCIgaGVpZ2h0PVwiMTc5MlwiIHZpZXdCb3g9XCIwIDAgMTc5MiAxNzkyXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgIDxwYXRoIGQ9XCJNMTI1NCA1ODFsMjkzLTI5My0xMDctMTA3LTI5MyAyOTN6bTQ0Ny0yOTNxMCAyNy0xOCA0NWwtMTI4NiAxMjg2cS0xOCAxOC00NSAxOHQtNDUtMThsLTE5OC0xOThxLTE4LTE4LTE4LTQ1dDE4LTQ1bDEyODYtMTI4NnExOC0xOCA0NS0xOHQ0NSAxOGwxOTggMTk4cTE4IDE4IDE4IDQ1em0tMTM1MS0xOTBsOTggMzAtOTggMzAtMzAgOTgtMzAtOTgtOTgtMzAgOTgtMzAgMzAtOTh6bTM1MCAxNjJsMTk2IDYwLTE5NiA2MC02MCAxOTYtNjAtMTk2LTE5Ni02MCAxOTYtNjAgNjAtMTk2em05MzAgNDc4bDk4IDMwLTk4IDMwLTMwIDk4LTMwLTk4LTk4LTMwIDk4LTMwIDMwLTk4em0tNjQwLTY0MGw5OCAzMC05OCAzMC0zMCA5OC0zMC05OC05OC0zMCA5OC0zMCAzMC05OHpcIi8+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgICB9XG4gICAgICAgIHt0aGlzLnByb3BzLm5hbWUgPT09ICdwbHVzLWNpcmNsZScgJiZcbiAgICAgICAgPHN2ZyB3aWR0aD1cIjE3OTJcIiBoZWlnaHQ9XCIxNzkyXCIgdmlld0JveD1cIjAgMCAxNzkyIDE3OTJcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgPHBhdGggZD1cIk0xMzQ0IDk2MHYtMTI4cTAtMjYtMTktNDV0LTQ1LTE5aC0yNTZ2LTI1NnEwLTI2LTE5LTQ1dC00NS0xOWgtMTI4cS0yNiAwLTQ1IDE5dC0xOSA0NXYyNTZoLTI1NnEtMjYgMC00NSAxOXQtMTkgNDV2MTI4cTAgMjYgMTkgNDV0NDUgMTloMjU2djI1NnEwIDI2IDE5IDQ1dDQ1IDE5aDEyOHEyNiAwIDQ1LTE5dDE5LTQ1di0yNTZoMjU2cTI2IDAgNDUtMTl0MTktNDV6bTMyMC02NHEwIDIwOS0xMDMgMzg1LjV0LTI3OS41IDI3OS41LTM4NS41IDEwMy0zODUuNS0xMDMtMjc5LjUtMjc5LjUtMTAzLTM4NS41IDEwMy0zODUuNSAyNzkuNS0yNzkuNSAzODUuNS0xMDMgMzg1LjUgMTAzIDI3OS41IDI3OS41IDEwMyAzODUuNXpcIi8+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgICB9XG4gICAgICAgIHt0aGlzLnByb3BzLm5hbWUgPT09ICdwbHVzLXNxdWFyZScgJiZcbiAgICAgICAgPHN2ZyB3aWR0aD1cIjE3OTJcIiBoZWlnaHQ9XCIxNzkyXCIgdmlld0JveD1cIjAgMCA0NDggNTEyXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgIDxwYXRoIGQ9XCJNNDAwIDMySDQ4QzIxLjUgMzIgMCA1My41IDAgODB2MzUyYzAgMjYuNSAyMS41IDQ4IDQ4IDQ4aDM1MmMyNi41IDAgNDgtMjEuNSA0OC00OFY4MGMwLTI2LjUtMjEuNS00OC00OC00OHptLTMyIDI1MmMwIDYuNi01LjQgMTItMTIgMTJoLTkydjkyYzAgNi42LTUuNCAxMi0xMiAxMmgtNTZjLTYuNiAwLTEyLTUuNC0xMi0xMnYtOTJIOTJjLTYuNiAwLTEyLTUuNC0xMi0xMnYtNTZjMC02LjYgNS40LTEyIDEyLTEyaDkydi05MmMwLTYuNiA1LjQtMTIgMTItMTJoNTZjNi42IDAgMTIgNS40IDEyIDEydjkyaDkyYzYuNiAwIDEyIDUuNCAxMiAxMnY1NnpcIi8+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgICB9XG4gICAgICAgIHt0aGlzLnByb3BzLm5hbWUgPT09ICdmaWx0ZXInICYmXG4gICAgICAgIDxzdmcgd2lkdGg9XCIxNzkyXCIgaGVpZ2h0PVwiMTc5MlwiIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICA8cGF0aCBkPVwiTTQ4Ny45NzYgMEgyNC4wMjhDMi43MSAwLTguMDQ3IDI1Ljg2NiA3LjA1OCA0MC45NzFMMTkyIDIyNS45NDFWNDMyYzAgNy44MzEgMy44MjEgMTUuMTcgMTAuMjM3IDE5LjY2Mmw4MCA1NS45OEMyOTguMDIgNTE4LjY5IDMyMCA1MDcuNDkzIDMyMCA0ODcuOThWMjI1Ljk0MWwxODQuOTQ3LTE4NC45N0M1MjAuMDIxIDI1Ljg5NiA1MDkuMzM4IDAgNDg3Ljk3NiAwelwiLz5cbiAgICAgICAgPC9zdmc+XG4gICAgICAgIH1cbiAgICAgICAge3RoaXMucHJvcHMubmFtZSA9PT0gJ2xpZmUtcmluZycgJiZcbiAgICAgICAgPHN2ZyB3aWR0aD1cIjE3OTJcIiBoZWlnaHQ9XCIxNzkyXCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgIDxwYXRoIGQ9XCJNMjU2IDUwNGMxMzYuOTY3IDAgMjQ4LTExMS4wMzMgMjQ4LTI0OFMzOTIuOTY3IDggMjU2IDggOCAxMTkuMDMzIDggMjU2czExMS4wMzMgMjQ4IDI0OCAyNDh6bS0xMDMuMzk4LTc2LjcybDUzLjQxMS01My40MTFjMzEuODA2IDEzLjUwNiA2OC4xMjggMTMuNTIyIDk5Ljk3NCAwbDUzLjQxMSA1My40MTFjLTYzLjIxNyAzOC4zMTktMTQzLjU3OSAzOC4zMTktMjA2Ljc5NiAwek0zMzYgMjU2YzAgNDQuMTEyLTM1Ljg4OCA4MC04MCA4MHMtODAtMzUuODg4LTgwLTgwIDM1Ljg4OC04MCA4MC04MCA4MCAzNS44ODggODAgODB6bTkxLjI4IDEwMy4zOThsLTUzLjQxMS01My40MTFjMTMuNTA1LTMxLjgwNiAxMy41MjItNjguMTI4IDAtOTkuOTc0bDUzLjQxMS01My40MTFjMzguMzE5IDYzLjIxNyAzOC4zMTkgMTQzLjU3OSAwIDIwNi43OTZ6TTM1OS4zOTcgODQuNzJsLTUzLjQxMSA1My40MTFjLTMxLjgwNi0xMy41MDUtNjguMTI4LTEzLjUyMi05OS45NzMgMEwxNTIuNjAyIDg0LjcyYzYzLjIxNy0zOC4zMTkgMTQzLjU3OS0zOC4zMTkgMjA2Ljc5NSAwek04NC43MiAxNTIuNjAybDUzLjQxMSA1My40MTFjLTEzLjUwNiAzMS44MDYtMTMuNTIyIDY4LjEyOCAwIDk5Ljk3NEw4NC43MiAzNTkuMzk4Yy0zOC4zMTktNjMuMjE3LTM4LjMxOS0xNDMuNTc5IDAtMjA2Ljc5NnpcIi8+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgICB9XG4gICAgICAgIHt0aGlzLnByb3BzLm5hbWUgPT09ICdwbHVnJyAmJlxuICAgICAgICA8c3ZnIHdpZHRoPVwiMTc5MlwiIGhlaWdodD1cIjE3OTJcIiB2aWV3Qm94PVwiMCAwIDM4NCA1MTJcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgPHBhdGggZD1cIk0zMjAsMzJhMzIsMzIsMCwwLDAtNjQsMHY5Nmg2NFptNDgsMTI4SDE2QTE2LDE2LDAsMCwwLDAsMTc2djMyYTE2LDE2LDAsMCwwLDE2LDE2SDMydjMyQTE2MC4wNywxNjAuMDcsMCwwLDAsMTYwLDQxMi44VjUxMmg2NFY0MTIuOEExNjAuMDcsMTYwLjA3LDAsMCwwLDM1MiwyNTZWMjI0aDE2YTE2LDE2LDAsMCwwLDE2LTE2VjE3NkExNiwxNiwwLDAsMCwzNjgsMTYwWk0xMjgsMzJhMzIsMzIsMCwwLDAtNjQsMHY5Nmg2NFpcIi8+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgICB9XG4gICAgICAgIHt0aGlzLnByb3BzLm5hbWUgPT09ICdwcmludGVyJyAmJlxuICAgICAgICA8c3ZnIHdpZHRoPVwiMTc5MlwiIGhlaWdodD1cIjE3OTJcIiB2aWV3Qm94PVwiMCAwIDE3OTIgMTc5MlwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICA8cGF0aCBkPVwiTTQ0OCAxNTM2aDg5NnYtMjU2aC04OTZ2MjU2em0wLTY0MGg4OTZ2LTM4NGgtMTYwcS00MCAwLTY4LTI4dC0yOC02OHYtMTYwaC02NDB2NjQwem0xMTUyIDY0cTAtMjYtMTktNDV0LTQ1LTE5LTQ1IDE5LTE5IDQ1IDE5IDQ1IDQ1IDE5IDQ1LTE5IDE5LTQ1em0xMjggMHY0MTZxMCAxMy05LjUgMjIuNXQtMjIuNSA5LjVoLTIyNHYxNjBxMCA0MC0yOCA2OHQtNjggMjhoLTk2MHEtNDAgMC02OC0yOHQtMjgtNjh2LTE2MGgtMjI0cS0xMyAwLTIyLjUtOS41dC05LjUtMjIuNXYtNDE2cTAtNzkgNTYuNS0xMzUuNXQxMzUuNS01Ni41aDY0di01NDRxMC00MCAyOC02OHQ2OC0yOGg2NzJxNDAgMCA4OCAyMHQ3NiA0OGwxNTIgMTUycTI4IDI4IDQ4IDc2dDIwIDg4djI1Nmg2NHE3OSAwIDEzNS41IDU2LjV0NTYuNSAxMzUuNXpcIi8+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgICB9XG4gICAgICAgIHt0aGlzLnByb3BzLm5hbWUgPT09ICdyZWZyZXNoJyAmJlxuICAgICAgICA8c3ZnIHdpZHRoPVwiMTc5MlwiIGhlaWdodD1cIjE3OTJcIiB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgPHBhdGggZD1cIk0zNzAuNzIgMTMzLjI4QzMzOS40NTggMTA0LjAwOCAyOTguODg4IDg3Ljk2MiAyNTUuODQ4IDg4Yy03Ny40NTguMDY4LTE0NC4zMjggNTMuMTc4LTE2Mi43OTEgMTI2Ljg1LTEuMzQ0IDUuMzYzLTYuMTIyIDkuMTUtMTEuNjUxIDkuMTVIMjQuMTAzYy03LjQ5OCAwLTEzLjE5NC02LjgwNy0xMS44MDctMTQuMTc2QzMzLjkzMyA5NC45MjQgMTM0LjgxMyA4IDI1NiA4YzY2LjQ0OCAwIDEyNi43OTEgMjYuMTM2IDE3MS4zMTUgNjguNjg1TDQ2My4wMyA0MC45N0M0NzguMTQ5IDI1Ljg1MSA1MDQgMzYuNTU5IDUwNCA1Ny45NDFWMTkyYzAgMTMuMjU1LTEwLjc0NSAyNC0yNCAyNEgzNDUuOTQxYy0yMS4zODIgMC0zMi4wOS0yNS44NTEtMTYuOTcxLTQwLjk3MWw0MS43NS00MS43NDl6TTMyIDI5NmgxMzQuMDU5YzIxLjM4MiAwIDMyLjA5IDI1Ljg1MSAxNi45NzEgNDAuOTcxbC00MS43NSA0MS43NWMzMS4yNjIgMjkuMjczIDcxLjgzNSA0NS4zMTkgMTE0Ljg3NiA0NS4yOCA3Ny40MTgtLjA3IDE0NC4zMTUtNTMuMTQ0IDE2Mi43ODctMTI2Ljg0OSAxLjM0NC01LjM2MyA2LjEyMi05LjE1IDExLjY1MS05LjE1aDU3LjMwNGM3LjQ5OCAwIDEzLjE5NCA2LjgwNyAxMS44MDcgMTQuMTc2QzQ3OC4wNjcgNDE3LjA3NiAzNzcuMTg3IDUwNCAyNTYgNTA0Yy02Ni40NDggMC0xMjYuNzkxLTI2LjEzNi0xNzEuMzE1LTY4LjY4NUw0OC45NyA0NzEuMDNDMzMuODUxIDQ4Ni4xNDkgOCA0NzUuNDQxIDggNDU0LjA1OVYzMjBjMC0xMy4yNTUgMTAuNzQ1LTI0IDI0LTI0elwiLz5cbiAgICAgICAgPC9zdmc+XG4gICAgICAgIH1cbiAgICAgICAge3RoaXMucHJvcHMubmFtZSA9PT0gJ3F1ZXN0aW9uLWNpcmNsZScgJiZcbiAgICAgICAgPHN2ZyB3aWR0aD1cIjE3OTJcIiBoZWlnaHQ9XCIxNzkyXCIgdmlld0JveD1cIjAgMCAxNzkyIDE3OTJcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgPHBhdGggZD1cIk0xMDI0IDEzNzZ2LTE5MnEwLTE0LTktMjN0LTIzLTloLTE5MnEtMTQgMC0yMyA5dC05IDIzdjE5MnEwIDE0IDkgMjN0MjMgOWgxOTJxMTQgMCAyMy05dDktMjN6bTI1Ni02NzJxMC04OC01NS41LTE2M3QtMTM4LjUtMTE2LTE3MC00MXEtMjQzIDAtMzcxIDIxMy0xNSAyNCA4IDQybDEzMiAxMDBxNyA2IDE5IDYgMTYgMCAyNS0xMiA1My02OCA4Ni05MiAzNC0yNCA4Ni0yNCA0OCAwIDg1LjUgMjZ0MzcuNSA1OXEwIDM4LTIwIDYxdC02OCA0NXEtNjMgMjgtMTE1LjUgODYuNXQtNTIuNSAxMjUuNXYzNnEwIDE0IDkgMjN0MjMgOWgxOTJxMTQgMCAyMy05dDktMjNxMC0xOSAyMS41LTQ5LjV0NTQuNS00OS41cTMyLTE4IDQ5LTI4LjV0NDYtMzUgNDQuNS00OCAyOC02MC41IDEyLjUtODF6bTM4NCAxOTJxMCAyMDktMTAzIDM4NS41dC0yNzkuNSAyNzkuNS0zODUuNSAxMDMtMzg1LjUtMTAzLTI3OS41LTI3OS41LTEwMy0zODUuNSAxMDMtMzg1LjUgMjc5LjUtMjc5LjUgMzg1LjUtMTAzIDM4NS41IDEwMyAyNzkuNSAyNzkuNSAxMDMgMzg1LjV6XCIvPlxuICAgICAgICA8L3N2Zz5cbiAgICAgICAgfVxuICAgICAgICB7dGhpcy5wcm9wcy5uYW1lID09PSAnc2VhcmNoJyAmJlxuICAgICAgICA8c3ZnIHdpZHRoPVwiMTc5MlwiIGhlaWdodD1cIjE3OTJcIiB2aWV3Qm94PVwiMCAwIDE3OTIgMTc5MlwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICA8cGF0aCBkPVwiTTEyMTYgODMycTAtMTg1LTEzMS41LTMxNi41dC0zMTYuNS0xMzEuNS0zMTYuNSAxMzEuNS0xMzEuNSAzMTYuNSAxMzEuNSAzMTYuNSAzMTYuNSAxMzEuNSAzMTYuNS0xMzEuNSAxMzEuNS0zMTYuNXptNTEyIDgzMnEwIDUyLTM4IDkwdC05MCAzOHEtNTQgMC05MC0zOGwtMzQzLTM0MnEtMTc5IDEyNC0zOTkgMTI0LTE0MyAwLTI3My41LTU1LjV0LTIyNS0xNTAtMTUwLTIyNS01NS41LTI3My41IDU1LjUtMjczLjUgMTUwLTIyNSAyMjUtMTUwIDI3My41LTU1LjUgMjczLjUgNTUuNSAyMjUgMTUwIDE1MCAyMjUgNTUuNSAyNzMuNXEwIDIyMC0xMjQgMzk5bDM0MyAzNDNxMzcgMzcgMzcgOTB6XCIvPlxuICAgICAgICA8L3N2Zz5cbiAgICAgICAgfVxuICAgICAgICB7dGhpcy5wcm9wcy5uYW1lID09PSAnc2hhcmUnICYmXG4gICAgICAgIDxzdmcgd2lkdGg9XCIxNzkyXCIgaGVpZ2h0PVwiMTc5MlwiIHZpZXdCb3g9XCIwIDAgMTc5MiAxNzkyXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgIDxwYXRoIGQ9XCJNMTc2NCAxMXEzMyAyNCAyNyA2NGwtMjU2IDE1MzZxLTUgMjktMzIgNDUtMTQgOC0zMSA4LTExIDAtMjQtNWwtNDUzLTE4NS0yNDIgMjk1cS0xOCAyMy00OSAyMy0xMyAwLTIyLTQtMTktNy0zMC41LTIzLjV0LTExLjUtMzYuNXYtMzQ5bDg2NC0xMDU5LTEwNjkgOTI1LTM5NS0xNjJxLTM3LTE0LTQwLTU1LTItNDAgMzItNTlsMTY2NC05NjBxMTUtOSAzMi05IDIwIDAgMzYgMTF6XCIvPlxuICAgICAgICA8L3N2Zz5cbiAgICAgICAgfVxuICAgICAgICB7dGhpcy5wcm9wcy5uYW1lID09PSAnc3RhcicgJiZcbiAgICAgICAgPHN2ZyB3aWR0aD1cIjE3OTJcIiBoZWlnaHQ9XCIxNzkyXCIgdmlld0JveD1cIjAgMCAxNzkyIDE3OTJcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgPHBhdGggZD1cIk0xNzI4IDY0N3EwIDIyLTI2IDQ4bC0zNjMgMzU0IDg2IDUwMHExIDcgMSAyMCAwIDIxLTEwLjUgMzUuNXQtMzAuNSAxNC41cS0xOSAwLTQwLTEybC00NDktMjM2LTQ0OSAyMzZxLTIyIDEyLTQwIDEyLTIxIDAtMzEuNS0xNC41dC0xMC41LTM1LjVxMC02IDItMjBsODYtNTAwLTM2NC0zNTRxLTI1LTI3LTI1LTQ4IDAtMzcgNTYtNDZsNTAyLTczIDIyNS00NTVxMTktNDEgNDktNDF0NDkgNDFsMjI1IDQ1NSA1MDIgNzNxNTYgOSA1NiA0NnpcIi8+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgICB9XG4gICAgICAgIHt0aGlzLnByb3BzLm5hbWUgPT09ICdzYXZlJyAmJlxuICAgICAgICA8c3ZnIHdpZHRoPVwiMTc5MlwiIGhlaWdodD1cIjE3OTJcIiB2aWV3Qm94PVwiMCAwIDQ0OCA1MTJcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgPHBhdGggZD1cIk00MzMuOTQxIDEyOS45NDFsLTgzLjg4Mi04My44ODJBNDggNDggMCAwIDAgMzE2LjExOCAzMkg0OEMyMS40OSAzMiAwIDUzLjQ5IDAgODB2MzUyYzAgMjYuNTEgMjEuNDkgNDggNDggNDhoMzUyYzI2LjUxIDAgNDgtMjEuNDkgNDgtNDhWMTYzLjg4MmE0OCA0OCAwIDAgMC0xNC4wNTktMzMuOTQxek0yNzIgODB2ODBIMTQ0VjgwaDEyOHptMTIyIDM1Mkg1NGE2IDYgMCAwIDEtNi02Vjg2YTYgNiAwIDAgMSA2LTZoNDJ2MTA0YzAgMTMuMjU1IDEwLjc0NSAyNCAyNCAyNGgxNzZjMTMuMjU1IDAgMjQtMTAuNzQ1IDI0LTI0VjgzLjg4Mmw3OC4yNDMgNzguMjQzYTYgNiAwIDAgMSAxLjc1NyA0LjI0M1Y0MjZhNiA2IDAgMCAxLTYgNnpNMjI0IDIzMmMtNDguNTIzIDAtODggMzkuNDc3LTg4IDg4czM5LjQ3NyA4OCA4OCA4OCA4OC0zOS40NzcgODgtODgtMzkuNDc3LTg4LTg4LTg4em0wIDEyOGMtMjIuMDU2IDAtNDAtMTcuOTQ0LTQwLTQwczE3Ljk0NC00MCA0MC00MCA0MCAxNy45NDQgNDAgNDAtMTcuOTQ0IDQwLTQwIDQwelwiLz5cbiAgICAgICAgPC9zdmc+XG4gICAgICAgIH1cbiAgICAgICAge3RoaXMucHJvcHMubmFtZSA9PT0gJ3RyYXNoJyAmJlxuICAgICAgICA8c3ZnIHdpZHRoPVwiMTc5MlwiIGhlaWdodD1cIjE3OTJcIiB2aWV3Qm94PVwiMCAwIDE3OTIgMTc5MlwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICA8cGF0aCBkPVwiTTcwNCAxMzc2di03MDRxMC0xNC05LTIzdC0yMy05aC02NHEtMTQgMC0yMyA5dC05IDIzdjcwNHEwIDE0IDkgMjN0MjMgOWg2NHExNCAwIDIzLTl0OS0yM3ptMjU2IDB2LTcwNHEwLTE0LTktMjN0LTIzLTloLTY0cS0xNCAwLTIzIDl0LTkgMjN2NzA0cTAgMTQgOSAyM3QyMyA5aDY0cTE0IDAgMjMtOXQ5LTIzem0yNTYgMHYtNzA0cTAtMTQtOS0yM3QtMjMtOWgtNjRxLTE0IDAtMjMgOXQtOSAyM3Y3MDRxMCAxNCA5IDIzdDIzIDloNjRxMTQgMCAyMy05dDktMjN6bS01NDQtOTkyaDQ0OGwtNDgtMTE3cS03LTktMTctMTFoLTMxN3EtMTAgMi0xNyAxMXptOTI4IDMydjY0cTAgMTQtOSAyM3QtMjMgOWgtOTZ2OTQ4cTAgODMtNDcgMTQzLjV0LTExMyA2MC41aC04MzJxLTY2IDAtMTEzLTU4LjV0LTQ3LTE0MS41di05NTJoLTk2cS0xNCAwLTIzLTl0LTktMjN2LTY0cTAtMTQgOS0yM3QyMy05aDMwOWw3MC0xNjdxMTUtMzcgNTQtNjN0NzktMjZoMzIwcTQwIDAgNzkgMjZ0NTQgNjNsNzAgMTY3aDMwOXExNCAwIDIzIDl0OSAyM3pcIi8+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgICB9XG4gICAgICAgIHt0aGlzLnByb3BzLm5hbWUgPT09ICd1cGxvYWQnICYmXG4gICAgICAgIDxzdmcgd2lkdGg9XCIyMDQ4XCIgaGVpZ2h0PVwiMTc5MlwiIHZpZXdCb3g9XCIwIDAgMjA0OCAxNzkyXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgIDxwYXRoIGQ9XCJNMTM0NCA4NjRxMC0xNC05LTIzbC0zNTItMzUycS05LTktMjMtOXQtMjMgOWwtMzUxIDM1MXEtMTAgMTItMTAgMjQgMCAxNCA5IDIzdDIzIDloMjI0djM1MnEwIDEzIDkuNSAyMi41dDIyLjUgOS41aDE5MnExMyAwIDIyLjUtOS41dDkuNS0yMi41di0zNTJoMjI0cTEzIDAgMjIuNS05LjV0OS41LTIyLjV6bTY0MCAyODhxMCAxNTktMTEyLjUgMjcxLjV0LTI3MS41IDExMi41aC0xMDg4cS0xODUgMC0zMTYuNS0xMzEuNXQtMTMxLjUtMzE2LjVxMC0xMzAgNzAtMjQwdDE4OC0xNjVxLTItMzAtMi00MyAwLTIxMiAxNTAtMzYydDM2Mi0xNTBxMTU2IDAgMjg1LjUgODd0MTg4LjUgMjMxcTcxLTYyIDE2Ni02MiAxMDYgMCAxODEgNzV0NzUgMTgxcTAgNzYtNDEgMTM4IDEzMCAzMSAyMTMuNSAxMzUuNXQ4My41IDIzOC41elwiLz5cbiAgICAgICAgPC9zdmc+XG4gICAgICAgIH1cbiAgICAgICAge3RoaXMucHJvcHMubmFtZSA9PT0gXCJ1cGxvYWQtYVwiICYmXG4gICAgICAgIDxzdmdcbiAgICAgICAgICBhcmlhLWhpZGRlbj1cInRydWVcIiBmb2N1c2FibGU9XCJmYWxzZVwiIGRhdGEtcHJlZml4PVwiZmFzXCIgZGF0YS1pY29uPVwidXBsb2FkXCJcbiAgICAgICAgICBjbGFzc05hbWU9XCJzdmctaW5saW5lLS1mYSBmYS11cGxvYWQgZmEtdy0xNlwiIHJvbGU9XCJpbWdcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcbiAgICAgICAgICB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIj5cbiAgICAgICAgICA8cGF0aFxuICAgICAgICAgICAgZmlsbD1cImN1cnJlbnRDb2xvclwiXG4gICAgICAgICAgICBkPVwiTTI5NiAzODRoLTgwYy0xMy4zIDAtMjQtMTAuNy0yNC0yNFYxOTJoLTg3LjdjLTE3LjggMC0yNi43LTIxLjUtMTQuMS0zNC4xTDI0Mi4zIDUuN2M3LjUtNy41IDE5LjgtNy41IDI3LjMgMGwxNTIuMiAxNTIuMmMxMi42IDEyLjYgMy43IDM0LjEtMTQuMSAzNC4xSDMyMHYxNjhjMCAxMy4zLTEwLjcgMjQtMjQgMjR6bTIxNi04djExMmMwIDEzLjMtMTAuNyAyNC0yNCAyNEgyNGMtMTMuMyAwLTI0LTEwLjctMjQtMjRWMzc2YzAtMTMuMyAxMC43LTI0IDI0LTI0aDEzNnY4YzAgMzAuOSAyNS4xIDU2IDU2IDU2aDgwYzMwLjkgMCA1Ni0yNS4xIDU2LTU2di04aDEzNmMxMy4zIDAgMjQgMTAuNyAyNCAyNHptLTEyNCA4OGMwLTExLTktMjAtMjAtMjBzLTIwIDktMjAgMjAgOSAyMCAyMCAyMCAyMC05IDIwLTIwem02NCAwYzAtMTEtOS0yMC0yMC0yMHMtMjAgOS0yMCAyMCA5IDIwIDIwIDIwIDIwLTkgMjAtMjB6XCI+PC9wYXRoPlxuICAgICAgICA8L3N2Zz5cbiAgICAgICAgfVxuICAgICAgICB7dGhpcy5wcm9wcy5uYW1lID09PSAndXNlcicgJiZcbiAgICAgICAgPHN2ZyB3aWR0aD1cIjQ0OFwiIGhlaWdodD1cIjUxMlwiIHZpZXdCb3g9XCIwIDAgNDQ4IDUxMlwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICA8cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0yMjQgMjU2YzcwLjcgMCAxMjgtNTcuMyAxMjgtMTI4UzI5NC43IDAgMjI0IDAgOTYgNTcuMyA5NiAxMjhzNTcuMyAxMjggMTI4IDEyOHptODkuNiAzMmgtMTYuN2MtMjIuMiAxMC4yLTQ2LjkgMTYtNzIuOSAxNnMtNTAuNi01LjgtNzIuOS0xNmgtMTYuN0M2MC4yIDI4OCAwIDM0OC4yIDAgNDIyLjRWNDY0YzAgMjYuNSAyMS41IDQ4IDQ4IDQ4aDM1MmMyNi41IDAgNDgtMjEuNSA0OC00OHYtNDEuNmMwLTc0LjItNjAuMi0xMzQuNC0xMzQuNC0xMzQuNHpcIiBjbGFzc05hbWU9XCJcIi8+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgICB9XG4gICAgICAgIHt0aGlzLnByb3BzLm5hbWUgPT09ICd1c2VycycgJiZcbiAgICAgICAgPHN2ZyB3aWR0aD1cIjY0MFwiIGhlaWdodD1cIjUxMlwiIHZpZXdCb3g9XCIwIDAgNjQwIDUxMlwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICA8cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk05NiAyMjRjMzUuMyAwIDY0LTI4LjcgNjQtNjRzLTI4LjctNjQtNjQtNjQtNjQgMjguNy02NCA2NCAyOC43IDY0IDY0IDY0em00NDggMGMzNS4zIDAgNjQtMjguNyA2NC02NHMtMjguNy02NC02NC02NC02NCAyOC43LTY0IDY0IDI4LjcgNjQgNjQgNjR6bTMyIDMyaC02NGMtMTcuNiAwLTMzLjUgNy4xLTQ1LjEgMTguNiA0MC4zIDIyLjEgNjguOSA2MiA3NS4xIDEwOS40aDY2YzE3LjcgMCAzMi0xNC4zIDMyLTMydi0zMmMwLTM1LjMtMjguNy02NC02NC02NHptLTI1NiAwYzYxLjkgMCAxMTItNTAuMSAxMTItMTEyUzM4MS45IDMyIDMyMCAzMiAyMDggODIuMSAyMDggMTQ0czUwLjEgMTEyIDExMiAxMTJ6bTc2LjggMzJoLTguM2MtMjAuOCAxMC00My45IDE2LTY4LjUgMTZzLTQ3LjYtNi02OC41LTE2aC04LjNDMTc5LjYgMjg4IDEyOCAzMzkuNiAxMjggNDAzLjJWNDMyYzAgMjYuNSAyMS41IDQ4IDQ4IDQ4aDI4OGMyNi41IDAgNDgtMjEuNSA0OC00OHYtMjguOGMwLTYzLjYtNTEuNi0xMTUuMi0xMTUuMi0xMTUuMnptLTIyMy43LTEzLjRDMTYxLjUgMjYzLjEgMTQ1LjYgMjU2IDEyOCAyNTZINjRjLTM1LjMgMC02NCAyOC43LTY0IDY0djMyYzAgMTcuNyAxNC4zIDMyIDMyIDMyaDY1LjljNi4zLTQ3LjQgMzQuOS04Ny4zIDc1LjItMTA5LjR6XCIvPlxuICAgICAgICA8L3N2Zz5cbiAgICAgICAgfVxuICAgICAgICB7dGhpcy5wcm9wcy5uYW1lID09PSAnd2FybmluZycgJiZcbiAgICAgICAgPHN2ZyB3aWR0aD1cIjE3OTJcIiBoZWlnaHQ9XCIxNzkyXCIgdmlld0JveD1cIjAgMCAxNzkyIDE3OTJcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgPHBhdGggZD1cIk0xMDI0IDEzNzV2LTE5MHEwLTE0LTkuNS0yMy41dC0yMi41LTkuNWgtMTkycS0xMyAwLTIyLjUgOS41dC05LjUgMjMuNXYxOTBxMCAxNCA5LjUgMjMuNXQyMi41IDkuNWgxOTJxMTMgMCAyMi41LTkuNXQ5LjUtMjMuNXptLTItMzc0bDE4LTQ1OXEwLTEyLTEwLTE5LTEzLTExLTI0LTExaC0yMjBxLTExIDAtMjQgMTEtMTAgNy0xMCAyMWwxNyA0NTdxMCAxMCAxMCAxNi41dDI0IDYuNWgxODVxMTQgMCAyMy41LTYuNXQxMC41LTE2LjV6bS0xNC05MzRsNzY4IDE0MDhxMzUgNjMtMiAxMjYtMTcgMjktNDYuNSA0NnQtNjMuNSAxN2gtMTUzNnEtMzQgMC02My41LTE3dC00Ni41LTQ2cS0zNy02My0yLTEyNmw3NjgtMTQwOHExNy0zMSA0Ny00OXQ2NS0xOCA2NSAxOCA0NyA0OXpcIi8+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgICB9XG4gICAgICA8L3NwYW4+XG4gICAgKTtcbiAgfVxufVxuXG5JY29uLmRlZmF1bHRQcm9wcyA9IHtcbiAgYmlnOiBmYWxzZSxcbiAgYmFzZWxpbmU6IGZhbHNlLFxuICBvbkNsaWNrOiAoKSA9PiB7XG4gIH1cbn07XG5cbkljb24ucHJvcFR5cGVzID0ge1xuICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBiaWc6IFByb3BUeXBlcy5ib29sLFxuICBiYXNlbGluZTogUHJvcFR5cGVzLmJvb2wsXG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jXG59O1xuXG5leHBvcnQgZGVmYXVsdCBJY29uO1xuIiwiLyoqXG4gKiBQYXNzYm9sdCB+IE9wZW4gc291cmNlIHBhc3N3b3JkIG1hbmFnZXIgZm9yIHRlYW1zXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgUGFzc2JvbHQgU0EgKGh0dHBzOi8vd3d3LnBhc3Nib2x0LmNvbSlcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgdmVyc2lvbiAzIG9mIHRoZSBvciBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqIEZvciBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHNlZSB0aGUgTElDRU5TRS50eHRcbiAqIFJlZGlzdHJpYnV0aW9ucyBvZiBmaWxlcyBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZS5cbiAqXG4gKiBAY29weXJpZ2h0ICAgICBDb3B5cmlnaHQgKGMpIDIwMjAgUGFzc2JvbHQgU0EgKGh0dHBzOi8vd3d3LnBhc3Nib2x0LmNvbSlcbiAqIEBsaWNlbnNlICAgICAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvQUdQTC0zLjAgQUdQTCBMaWNlbnNlXG4gKiBAbGluayAgICAgICAgICBodHRwczovL3d3dy5wYXNzYm9sdC5jb20gUGFzc2JvbHQodG0pXG4gKiBAc2luY2UgICAgICAgICAyLjEzLjBcbiAqL1xuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcblxuY2xhc3MgRm9ybVN1Ym1pdEJ1dHRvbiBleHRlbmRzIENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHNcbiAgICovXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuYmluZENhbGxiYWNrcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEJpbmQgY2FsbGJhY2tzIG1ldGhvZHNcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIGJpbmRDYWxsYmFja3MoKSB7XG4gICAgdGhpcy5nZXRDbGFzc05hbWUgPSB0aGlzLmdldENsYXNzTmFtZS5iaW5kKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgaW5wdXQgYnV0dG9uIGNsYXNzbmFtZVxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgZ2V0Q2xhc3NOYW1lKCkge1xuICAgIGxldCBuYW1lID0gJ2J1dHRvbiBwcmltYXJ5JztcbiAgICBpZiAodGhpcy5wcm9wcy53YXJuaW5nKSB7XG4gICAgICBuYW1lICs9ICcgd2FybmluZyc7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLmRpc2FibGVkKSB7XG4gICAgICBuYW1lICs9ICcgZGlzYWJsZWQnO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5wcm9jZXNzaW5nKSB7XG4gICAgICBuYW1lICs9ICcgcHJvY2Vzc2luZyc7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLmJpZykge1xuICAgICAgbmFtZSArPSAnIGJpZyc7XG4gICAgfVxuICAgIHJldHVybiBuYW1lO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbmRlciB0aGUgY29tcG9uZW50XG4gICAqIEByZXR1cm4ge0pTWH1cbiAgICovXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGlucHV0IHR5cGU9XCJzdWJtaXRcIlxuICAgICAgICBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3NOYW1lKCl9XG4gICAgICAgIGRpc2FibGVkPXt0aGlzLnByb3BzLmRpc2FibGVkfVxuICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy52YWx1ZSB8fCAnU2F2ZSd9XG4gICAgICAvPlxuICAgICk7XG4gIH1cbn1cblxuRm9ybVN1Ym1pdEJ1dHRvbi5kZWZhdWx0UHJvcHMgPSB7XG4gIHdhcm5pbmc6IGZhbHNlXG59O1xuXG5Gb3JtU3VibWl0QnV0dG9uLnByb3BUeXBlcyA9IHtcbiAgcHJvY2Vzc2luZzogUHJvcFR5cGVzLmJvb2wsXG4gIGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgdmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIHdhcm5pbmc6IFByb3BUeXBlcy5ib29sLFxuICBiaWc6IFByb3BUeXBlcy5ib29sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBGb3JtU3VibWl0QnV0dG9uO1xuIiwiLyoqXG4gKiBQYXNzYm9sdCB+IE9wZW4gc291cmNlIHBhc3N3b3JkIG1hbmFnZXIgZm9yIHRlYW1zXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgUGFzc2JvbHQgU0EgKGh0dHBzOi8vd3d3LnBhc3Nib2x0LmNvbSlcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgdmVyc2lvbiAzIG9mIHRoZSBvciBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqIEZvciBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHNlZSB0aGUgTElDRU5TRS50eHRcbiAqIFJlZGlzdHJpYnV0aW9ucyBvZiBmaWxlcyBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZS5cbiAqXG4gKiBAY29weXJpZ2h0ICAgICBDb3B5cmlnaHQgKGMpIDIwMjAgUGFzc2JvbHQgU0EgKGh0dHBzOi8vd3d3LnBhc3Nib2x0LmNvbSlcbiAqIEBsaWNlbnNlICAgICAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvQUdQTC0zLjAgQUdQTCBMaWNlbnNlXG4gKiBAbGluayAgICAgICAgICBodHRwczovL3d3dy5wYXNzYm9sdC5jb20gUGFzc2JvbHQodG0pXG4gKiBAc2luY2UgICAgICAgICAyLjEzLjBcbiAqL1xuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuXG4vKipcbiAqIFRoaXMgY29tcG9uZW50IGRpc3BsYXlzIGEgd2FpdGluZyBsb2FkaW5nIHNwaW5uZXJcbiAqL1xuY2xhc3MgTG9hZGluZ1NwaW5uZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAvKipcbiAgICogUmVuZGVyIHRoZSBjb21wb25lbnRcbiAgICovXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPD5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcm9jZXNzaW5nLXdyYXBwZXJcIj5cbiAgICAgICAgICA8ZGl2ICBjbGFzc05hbWU9XCJwcm9jZXNzaW5nLXRleHRcIj5cbiAgICAgICAgICAgIHt0aGlzLnByb3BzLnRpdGxlICYmXG4gICAgICAgICAgICAgIDxoMj5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy50aXRsZX1cbiAgICAgICAgICAgICAgPC9oMj5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDxoMj5cbiAgICAgICAgICAgICAgUGxlYXNlIHdhaXQuLi5cbiAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC8+XG4gICAgKTtcbiAgfVxufVxuXG5Mb2FkaW5nU3Bpbm5lci5wcm9wVHlwZXMgPSB7XG4gIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLCAvLyBBIGN1c3RvbSBzdHJpbmdcbn07XG5cbmV4cG9ydCBkZWZhdWx0IExvYWRpbmdTcGlubmVyO1xuXG4iLCJleHBvcnQgZGVmYXVsdCAob2JqLCBrZXkpID0+IGtleS5zcGxpdCgnLicpXG4gIC5yZWR1Y2UoKGFjY3VtdWxhdG9yLCB4KSA9PlxuICAgIGFjY3VtdWxhdG9yID09PSB1bmRlZmluZWQgPyBhY2N1bXVsYXRvciA6IGFjY3VtdWxhdG9yW3hdXG4gICwgb2JqKTtcbiIsIi8qKlxuICogUGFzc2JvbHQgfiBPcGVuIHNvdXJjZSBwYXNzd29yZCBtYW5hZ2VyIGZvciB0ZWFtc1xuICogQ29weXJpZ2h0IChjKSBQYXNzYm9sdCBTQVJMIChodHRwczovL3d3dy5wYXNzYm9sdC5jb20pXG4gKlxuICogTGljZW5zZWQgdW5kZXIgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIHZlcnNpb24gMyBvZiB0aGUgb3IgYW55IGxhdGVyIHZlcnNpb24uXG4gKiBGb3IgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSBzZWUgdGhlIExJQ0VOU0UudHh0XG4gKiBSZWRpc3RyaWJ1dGlvbnMgb2YgZmlsZXMgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UuXG4gKlxuICogQGNvcHlyaWdodCAgICAgQ29weXJpZ2h0IChjKSBQYXNzYm9sdCBTQVJMIChodHRwczovL3d3dy5wYXNzYm9sdC5jb20pXG4gKiBAbGljZW5zZSAgICAgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL0FHUEwtMy4wIEFHUEwgTGljZW5zZVxuICogQGxpbmsgICAgICAgICAgaHR0cHM6Ly93d3cucGFzc2JvbHQuY29tIFBhc3Nib2x0KHRtKVxuICogQHNpbmNlICAgICAgICAgMy4wLjBcbiAqL1xuLyoqXG4gKiBTYW5pdGl6ZSBhIFVSSVxuICogUmV0dXJuICdzYWZlJyBzdHJpbmcgb3IgRmFsc2UgaWYgdXJpIGlzIG5vdCB2YWxpZFxuICogTm90ZSB0aGF0IGphdmFzY3JpcHQ6IFVSSSBhcmUgbmV2ZXIgYWxsb3dlZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmlcbiAqIEBwYXJhbSB7YXJyYXk8c3RyaW5nPn0gW3doaXRlbGlzdGVkUHJvdG9jb2xzXSBvcHRpb25hbCBkZWZhdWx0IFsnaHR0cHM6JywnaHR0cDonXVxuICogQHJldHVybnMge3N0cmluZ3xib29sZWFufVxuICovXG5leHBvcnQgZGVmYXVsdCAodXJpLCB3aGl0ZWxpc3RlZFByb3RvY29scykgPT4ge1xuICAvLyBXcm9uZyBmb3JtYXQuXG4gIGlmICh0eXBlb2YgdXJpID09PSAndW5kZWZpbmVkJyB8fCB0eXBlb2YgdXJpICE9PSBcInN0cmluZ1wiIHx8ICF1cmkubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKCF3aGl0ZWxpc3RlZFByb3RvY29scyB8fCAhQXJyYXkuaXNBcnJheSh3aGl0ZWxpc3RlZFByb3RvY29scykpIHtcbiAgICB3aGl0ZWxpc3RlZFByb3RvY29scyA9IFsnaHR0cDonLCAnaHR0cHM6J107XG4gIH1cbiAgY29uc3QgYmxhY2tsaXN0ZWRQcm90b2NvbHMgPSBbJ2phdmFzY3JpcHQ6J107XG5cbiAgdHJ5IHtcbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHVyaSk7XG4gICAgaWYgKGJsYWNrbGlzdGVkUHJvdG9jb2xzLmluY2x1ZGVzKHVybC5wcm90b2NvbCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKCF3aGl0ZWxpc3RlZFByb3RvY29scy5pbmNsdWRlcyh1cmwucHJvdG9jb2wpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB1cmwuaHJlZjtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG4iXSwic291cmNlUm9vdCI6IiJ9