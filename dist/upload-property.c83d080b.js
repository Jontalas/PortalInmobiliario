// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"common/helpers/element.helpers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onUpdateField = exports.onSubmitForm = exports.onSetValues = exports.onSetFormErrors = exports.onSetError = exports.onAddFile = void 0;
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var onUpdateField = function onUpdateField(id, callback) {
  var element = document.getElementById(id);
  element.oninput = function (event) {
    return callback(event);
  };
  if (element.type !== 'checkbox') {
    element.onblur = function (event) {
      return callback(event);
    };
  }
};
exports.onUpdateField = onUpdateField;
var onSubmitForm = function onSubmitForm(id, callback) {
  var element = document.getElementById(id);
  element.onclick = function (e) {
    e.preventDefault();
    callback();
  };
};
exports.onSubmitForm = onSubmitForm;
var onAddFile = function onAddFile(id, callback) {
  var input = document.getElementById(id);
  input.onchange = function () {
    var file = input.files[0];
    var fileReader = new FileReader();
    fileReader.onloadend = function () {
      callback(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };
};
exports.onAddFile = onAddFile;
var onSetError = function onSetError(id, error) {
  if (error.succeeded) {
    removeElementClass(id);
    setErrorMessage(id, '');
  } else {
    setElementClass(id);
    setErrorMessage(id, error.message);
  }
};
exports.onSetError = onSetError;
var setElementClass = function setElementClass(id) {
  var element = document.getElementById(id);
  if (element) {
    element.classList.add('error');
  }
};
var removeElementClass = function removeElementClass(id) {
  var element = document.getElementById(id);
  if (element) {
    element.classList.remove('error');
  }
};
var setErrorMessage = function setErrorMessage(id, message) {
  var messageElement = document.getElementById("".concat(id, "-error"));
  if (messageElement) {
    messageElement.textContent = message;
  }
};
var onSetFormErrors = function onSetFormErrors(_ref) {
  var fieldErrors = _ref.fieldErrors;
  Object.entries(fieldErrors).forEach(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
      key = _ref3[0],
      value = _ref3[1];
    onSetError(key, value);
  });
};
exports.onSetFormErrors = onSetFormErrors;
var setValue = function setValue(element, value) {
  var elementType = element.tagName.toLowerCase();
  if (elementType === 'select' || elementType === 'input' || elementType === 'textarea') {
    element.value = value;
  } else {
    element.textContent = value;
  }
};
var onSetValue = function onSetValue(id, value) {
  var element = document.getElementById(id);
  console.log({
    element: element
  });
  if (element) {
    setValue(element, value);
  }
};
var onSetValues = function onSetValues(values) {
  Object.entries(values).forEach(function (_ref4) {
    var _ref5 = _slicedToArray(_ref4, 2),
      key = _ref5[0],
      value = _ref5[1];
    return onSetValue(key, value);
  });
};
exports.onSetValues = onSetValues;
},{}],"common/helpers/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _element = require("./element.helpers");
Object.keys(_element).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _element[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _element[key];
    }
  });
});
},{"./element.helpers":"common/helpers/element.helpers.js"}],"../node_modules/axios/lib/helpers/bind.js":[function(require,module,exports) {
'use strict';

module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};

},{}],"../node_modules/axios/lib/utils.js":[function(require,module,exports) {
'use strict';

var bind = require('./helpers/bind');

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function deepMerge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  deepMerge: deepMerge,
  extend: extend,
  trim: trim
};

},{"./helpers/bind":"../node_modules/axios/lib/helpers/bind.js"}],"../node_modules/axios/lib/helpers/buildURL.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

},{"./../utils":"../node_modules/axios/lib/utils.js"}],"../node_modules/axios/lib/core/InterceptorManager.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;

},{"./../utils":"../node_modules/axios/lib/utils.js"}],"../node_modules/axios/lib/core/transformData.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};

},{"./../utils":"../node_modules/axios/lib/utils.js"}],"../node_modules/axios/lib/cancel/isCancel.js":[function(require,module,exports) {
'use strict';

module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

},{}],"../node_modules/axios/lib/helpers/normalizeHeaderName.js":[function(require,module,exports) {
'use strict';

var utils = require('../utils');

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

},{"../utils":"../node_modules/axios/lib/utils.js"}],"../node_modules/axios/lib/core/enhanceError.js":[function(require,module,exports) {
'use strict';

/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};

},{}],"../node_modules/axios/lib/core/createError.js":[function(require,module,exports) {
'use strict';

var enhanceError = require('./enhanceError');

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

},{"./enhanceError":"../node_modules/axios/lib/core/enhanceError.js"}],"../node_modules/axios/lib/core/settle.js":[function(require,module,exports) {
'use strict';

var createError = require('./createError');

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};

},{"./createError":"../node_modules/axios/lib/core/createError.js"}],"../node_modules/axios/lib/helpers/isAbsoluteURL.js":[function(require,module,exports) {
'use strict';

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

},{}],"../node_modules/axios/lib/helpers/combineURLs.js":[function(require,module,exports) {
'use strict';

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};

},{}],"../node_modules/axios/lib/core/buildFullPath.js":[function(require,module,exports) {
'use strict';

var isAbsoluteURL = require('../helpers/isAbsoluteURL');
var combineURLs = require('../helpers/combineURLs');

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};

},{"../helpers/isAbsoluteURL":"../node_modules/axios/lib/helpers/isAbsoluteURL.js","../helpers/combineURLs":"../node_modules/axios/lib/helpers/combineURLs.js"}],"../node_modules/axios/lib/helpers/parseHeaders.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};

},{"./../utils":"../node_modules/axios/lib/utils.js"}],"../node_modules/axios/lib/helpers/isURLSameOrigin.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);

},{"./../utils":"../node_modules/axios/lib/utils.js"}],"../node_modules/axios/lib/helpers/cookies.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);

},{"./../utils":"../node_modules/axios/lib/utils.js"}],"../node_modules/axios/lib/adapters/xhr.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');
var settle = require('./../core/settle');
var buildURL = require('./../helpers/buildURL');
var buildFullPath = require('../core/buildFullPath');
var parseHeaders = require('./../helpers/parseHeaders');
var isURLSameOrigin = require('./../helpers/isURLSameOrigin');
var createError = require('../core/createError');

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = require('./../helpers/cookies');

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

},{"./../utils":"../node_modules/axios/lib/utils.js","./../core/settle":"../node_modules/axios/lib/core/settle.js","./../helpers/buildURL":"../node_modules/axios/lib/helpers/buildURL.js","../core/buildFullPath":"../node_modules/axios/lib/core/buildFullPath.js","./../helpers/parseHeaders":"../node_modules/axios/lib/helpers/parseHeaders.js","./../helpers/isURLSameOrigin":"../node_modules/axios/lib/helpers/isURLSameOrigin.js","../core/createError":"../node_modules/axios/lib/core/createError.js","./../helpers/cookies":"../node_modules/axios/lib/helpers/cookies.js"}],"../node_modules/process/browser.js":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;
function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}
(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }
  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();
function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  }
  // if setTimeout wasn't available but was latter defined
  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }
  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}
function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  }
  // if clearTimeout wasn't available but was latter defined
  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }
  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;
function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }
  draining = false;
  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }
  if (queue.length) {
    drainQueue();
  }
}
function drainQueue() {
  if (draining) {
    return;
  }
  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;
  while (len) {
    currentQueue = queue;
    queue = [];
    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }
    queueIndex = -1;
    len = queue.length;
  }
  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}
process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);
  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }
  queue.push(new Item(fun, args));
  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
};

// v8 likes predictible objects
function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}
Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};
process.title = 'browser';
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};
function noop() {}
process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;
process.listeners = function (name) {
  return [];
};
process.binding = function (name) {
  throw new Error('process.binding is not supported');
};
process.cwd = function () {
  return '/';
};
process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};
process.umask = function () {
  return 0;
};
},{}],"../node_modules/axios/lib/defaults.js":[function(require,module,exports) {
var process = require("process");
'use strict';

var utils = require('./utils');
var normalizeHeaderName = require('./helpers/normalizeHeaderName');

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = require('./adapters/xhr');
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = require('./adapters/http');
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

},{"./utils":"../node_modules/axios/lib/utils.js","./helpers/normalizeHeaderName":"../node_modules/axios/lib/helpers/normalizeHeaderName.js","./adapters/xhr":"../node_modules/axios/lib/adapters/xhr.js","./adapters/http":"../node_modules/axios/lib/adapters/xhr.js","process":"../node_modules/process/browser.js"}],"../node_modules/axios/lib/core/dispatchRequest.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');
var transformData = require('./transformData');
var isCancel = require('../cancel/isCancel');
var defaults = require('../defaults');

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};

},{"./../utils":"../node_modules/axios/lib/utils.js","./transformData":"../node_modules/axios/lib/core/transformData.js","../cancel/isCancel":"../node_modules/axios/lib/cancel/isCancel.js","../defaults":"../node_modules/axios/lib/defaults.js"}],"../node_modules/axios/lib/core/mergeConfig.js":[function(require,module,exports) {
'use strict';

var utils = require('../utils');

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'params', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy'];
  var defaultToConfig2Keys = [
    'baseURL', 'url', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress',
    'maxContentLength', 'validateStatus', 'maxRedirects', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath'
  ];

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, function mergeDeepProperties(prop) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys);

  var otherKeys = Object
    .keys(config2)
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, function otherKeysDefaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  return config;
};

},{"../utils":"../node_modules/axios/lib/utils.js"}],"../node_modules/axios/lib/core/Axios.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');
var buildURL = require('../helpers/buildURL');
var InterceptorManager = require('./InterceptorManager');
var dispatchRequest = require('./dispatchRequest');
var mergeConfig = require('./mergeConfig');

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;

},{"./../utils":"../node_modules/axios/lib/utils.js","../helpers/buildURL":"../node_modules/axios/lib/helpers/buildURL.js","./InterceptorManager":"../node_modules/axios/lib/core/InterceptorManager.js","./dispatchRequest":"../node_modules/axios/lib/core/dispatchRequest.js","./mergeConfig":"../node_modules/axios/lib/core/mergeConfig.js"}],"../node_modules/axios/lib/cancel/Cancel.js":[function(require,module,exports) {
'use strict';

/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;

},{}],"../node_modules/axios/lib/cancel/CancelToken.js":[function(require,module,exports) {
'use strict';

var Cancel = require('./Cancel');

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;

},{"./Cancel":"../node_modules/axios/lib/cancel/Cancel.js"}],"../node_modules/axios/lib/helpers/spread.js":[function(require,module,exports) {
'use strict';

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

},{}],"../node_modules/axios/lib/axios.js":[function(require,module,exports) {
'use strict';

var utils = require('./utils');
var bind = require('./helpers/bind');
var Axios = require('./core/Axios');
var mergeConfig = require('./core/mergeConfig');
var defaults = require('./defaults');

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = require('./cancel/Cancel');
axios.CancelToken = require('./cancel/CancelToken');
axios.isCancel = require('./cancel/isCancel');

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = require('./helpers/spread');

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;

},{"./utils":"../node_modules/axios/lib/utils.js","./helpers/bind":"../node_modules/axios/lib/helpers/bind.js","./core/Axios":"../node_modules/axios/lib/core/Axios.js","./core/mergeConfig":"../node_modules/axios/lib/core/mergeConfig.js","./defaults":"../node_modules/axios/lib/defaults.js","./cancel/Cancel":"../node_modules/axios/lib/cancel/Cancel.js","./cancel/CancelToken":"../node_modules/axios/lib/cancel/CancelToken.js","./cancel/isCancel":"../node_modules/axios/lib/cancel/isCancel.js","./helpers/spread":"../node_modules/axios/lib/helpers/spread.js"}],"../node_modules/axios/index.js":[function(require,module,exports) {
module.exports = require('./lib/axios');
},{"./lib/axios":"../node_modules/axios/lib/axios.js"}],"pages/upload-property/upload-property.api.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setProperty = exports.getSaleTypeList = exports.getProvinceList = exports.getEquipmentsList = void 0;
var _axios = _interopRequireDefault(require("axios"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var saleTypeListUrl = "".concat("http://localhost:3000/api", "/saleTypes");
var getSaleTypeList = function getSaleTypeList() {
  return _axios.default.get(saleTypeListUrl).then(function (_ref) {
    var data = _ref.data;
    return data;
  });
};
exports.getSaleTypeList = getSaleTypeList;
var provinceListUrl = "".concat("http://localhost:3000/api", "/provinces");
var getProvinceList = function getProvinceList() {
  return _axios.default.get(provinceListUrl).then(function (_ref2) {
    var data = _ref2.data;
    return data;
  });
};
exports.getProvinceList = getProvinceList;
var equipmentsListUrl = "".concat("http://localhost:3000/api", "/equipments");
var getEquipmentsList = function getEquipmentsList() {
  return _axios.default.get(equipmentsListUrl).then(function (_ref3) {
    var data = _ref3.data;
    return data;
  });
};
exports.getEquipmentsList = getEquipmentsList;
var propertiesUrl = "".concat("http://localhost:3000/api", "/properties");
var setProperty = function setProperty(property) {
  return _axios.default.post(propertiesUrl, property).then(function (_ref4) {
    var data = _ref4.data;
    return data;
  });
};
exports.setProperty = setProperty;
},{"axios":"../node_modules/axios/index.js"}],"../node_modules/@lemoncode/fonk/dist/@lemoncode/fonk.esm.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseMessageWithCustomArgs = exports.createFormValidation = exports.createDefaultValidationResult = exports.createDefaultRecordValidationResult = exports.createDefaultFormValidationResult = exports.Validators = exports.FormValidation = void 0;
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }
  return _typeof(obj);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;
  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT$1 = 'Expected a function';

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

/** Used as references for various `Number` constants. */
var INFINITY$1 = 1 / 0,
  MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var funcTag$1 = '[object Function]',
  genTag$1 = '[object GeneratorFunction]',
  symbolTag$1 = '[object Symbol]';

/** Used to match property names within property paths. */
var reIsDeepProp$1 = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
  reIsPlainProp$1 = /^\w*$/,
  reLeadingDot$1 = /^\./,
  rePropName$1 = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar$1 = /[\\^$.*+?()[\]{}|]/g;

/** Used to match backslashes in property paths. */
var reEscapeChar$1 = /\\(\\)?/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor$1 = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Detect free variable `global` from Node.js. */
var freeGlobal$1 = _typeof(commonjsGlobal) == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

/** Detect free variable `self`. */
var freeSelf$1 = (typeof self === "undefined" ? "undefined" : _typeof(self)) == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root$1 = freeGlobal$1 || freeSelf$1 || Function('return this')();

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue$1(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject$1(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/** Used for built-in method references. */
var arrayProto$1 = Array.prototype,
  funcProto$1 = Function.prototype,
  objectProto$1 = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData$1 = root$1['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey$1 = function () {
  var uid = /[^.]+$/.exec(coreJsData$1 && coreJsData$1.keys && coreJsData$1.keys.IE_PROTO || '');
  return uid ? 'Symbol(src)_1.' + uid : '';
}();

/** Used to resolve the decompiled source of functions. */
var funcToString$1 = funcProto$1.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString$1 = objectProto$1.toString;

/** Used to detect if a method is native. */
var reIsNative$1 = RegExp('^' + funcToString$1.call(hasOwnProperty$1).replace(reRegExpChar$1, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

/** Built-in value references. */
var _Symbol$1 = root$1.Symbol,
  splice$1 = arrayProto$1.splice;

/* Built-in method references that are verified to be native. */
var Map$1 = getNative$1(root$1, 'Map'),
  nativeCreate$1 = getNative$1(Object, 'create');

/** Used to convert symbols to primitives and strings. */
var symbolProto$1 = _Symbol$1 ? _Symbol$1.prototype : undefined,
  symbolToString$1 = symbolProto$1 ? symbolProto$1.toString : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash$1(entries) {
  var index = -1,
    length = entries ? entries.length : 0;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear$1() {
  this.__data__ = nativeCreate$1 ? nativeCreate$1(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete$1(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet$1(key) {
  var data = this.__data__;
  if (nativeCreate$1) {
    var result = data[key];
    return result === HASH_UNDEFINED$1 ? undefined : result;
  }
  return hasOwnProperty$1.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas$1(key) {
  var data = this.__data__;
  return nativeCreate$1 ? data[key] !== undefined : hasOwnProperty$1.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet$1(key, value) {
  var data = this.__data__;
  data[key] = nativeCreate$1 && value === undefined ? HASH_UNDEFINED$1 : value;
  return this;
}

// Add methods to `Hash`.
Hash$1.prototype.clear = hashClear$1;
Hash$1.prototype['delete'] = hashDelete$1;
Hash$1.prototype.get = hashGet$1;
Hash$1.prototype.has = hashHas$1;
Hash$1.prototype.set = hashSet$1;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache$1(entries) {
  var index = -1,
    length = entries ? entries.length : 0;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear$1() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete$1(key) {
  var data = this.__data__,
    index = assocIndexOf$1(data, key);
  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice$1.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet$1(key) {
  var data = this.__data__,
    index = assocIndexOf$1(data, key);
  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas$1(key) {
  return assocIndexOf$1(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet$1(key, value) {
  var data = this.__data__,
    index = assocIndexOf$1(data, key);
  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache$1.prototype.clear = listCacheClear$1;
ListCache$1.prototype['delete'] = listCacheDelete$1;
ListCache$1.prototype.get = listCacheGet$1;
ListCache$1.prototype.has = listCacheHas$1;
ListCache$1.prototype.set = listCacheSet$1;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache$1(entries) {
  var index = -1,
    length = entries ? entries.length : 0;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear$1() {
  this.__data__ = {
    hash: new Hash$1(),
    map: new (Map$1 || ListCache$1)(),
    string: new Hash$1()
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete$1(key) {
  return getMapData$1(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet$1(key) {
  return getMapData$1(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas$1(key) {
  return getMapData$1(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet$1(key, value) {
  getMapData$1(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache$1.prototype.clear = mapCacheClear$1;
MapCache$1.prototype['delete'] = mapCacheDelete$1;
MapCache$1.prototype.get = mapCacheGet$1;
MapCache$1.prototype.has = mapCacheHas$1;
MapCache$1.prototype.set = mapCacheSet$1;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$1.call(object, key) && eq$1(objValue, value)) || value === undefined && !(key in object)) {
    object[key] = value;
  }
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf$1(array, key) {
  var length = array.length;
  while (length--) {
    if (eq$1(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative$1(value) {
  if (!isObject$1(value) || isMasked$1(value)) {
    return false;
  }
  var pattern = isFunction$2(value) || isHostObject$1(value) ? reIsNative$1 : reIsHostCtor$1;
  return pattern.test(toSource$1(value));
}

/**
 * The base implementation of `_.set`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @param {Function} [customizer] The function to customize path creation.
 * @returns {Object} Returns `object`.
 */
function baseSet(object, path, value, customizer) {
  if (!isObject$1(object)) {
    return object;
  }
  path = isKey$1(path, object) ? [path] : castPath$1(path);
  var index = -1,
    length = path.length,
    lastIndex = length - 1,
    nested = object;
  while (nested != null && ++index < length) {
    var key = toKey$1(path[index]),
      newValue = value;
    if (index != lastIndex) {
      var objValue = nested[key];
      newValue = customizer ? customizer(objValue, key, nested) : undefined;
      if (newValue === undefined) {
        newValue = isObject$1(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {};
      }
    }
    assignValue(nested, key, newValue);
    nested = nested[key];
  }
  return object;
}

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString$1(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol$1(value)) {
    return symbolToString$1 ? symbolToString$1.call(value) : '';
  }
  var result = value + '';
  return result == '0' && 1 / value == -INFINITY$1 ? '-0' : result;
}

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast property path array.
 */
function castPath$1(value) {
  return isArray$1(value) ? value : stringToPath$1(value);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData$1(map, key) {
  var data = map.__data__;
  return isKeyable$1(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative$1(object, key) {
  var value = getValue$1(object, key);
  return baseIsNative$1(value) ? value : undefined;
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length && (typeof value == 'number' || reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
}

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey$1(value, object) {
  if (isArray$1(value)) {
    return false;
  }
  var type = _typeof(value);
  if (type == 'number' || type == 'symbol' || type == 'boolean' || value == null || isSymbol$1(value)) {
    return true;
  }
  return reIsPlainProp$1.test(value) || !reIsDeepProp$1.test(value) || object != null && value in Object(object);
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable$1(value) {
  var type = _typeof(value);
  return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked$1(func) {
  return !!maskSrcKey$1 && maskSrcKey$1 in func;
}

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath$1 = memoize$1(function (string) {
  string = toString$1(string);
  var result = [];
  if (reLeadingDot$1.test(string)) {
    result.push('');
  }
  string.replace(rePropName$1, function (match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar$1, '$1') : number || match);
  });
  return result;
});

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey$1(value) {
  if (typeof value == 'string' || isSymbol$1(value)) {
    return value;
  }
  var result = value + '';
  return result == '0' && 1 / value == -INFINITY$1 ? '-0' : result;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource$1(func) {
  if (func != null) {
    try {
      return funcToString$1.call(func);
    } catch (e) {}
    try {
      return func + '';
    } catch (e) {}
  }
  return '';
}

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize$1(func, resolver) {
  if (typeof func != 'function' || resolver && typeof resolver != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT$1);
  }
  var memoized = function memoized() {
    var args = arguments,
      key = resolver ? resolver.apply(this, args) : args[0],
      cache = memoized.cache;
    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result);
    return result;
  };
  memoized.cache = new (memoize$1.Cache || MapCache$1)();
  return memoized;
}

// Assign cache to `_.memoize`.
memoize$1.Cache = MapCache$1;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq$1(value, other) {
  return value === other || value !== value && other !== other;
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray$1 = Array.isArray;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction$2(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject$1(value) ? objectToString$1.call(value) : '';
  return tag == funcTag$1 || tag == genTag$1;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject$1(value) {
  var type = _typeof(value);
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike$1(value) {
  return !!value && _typeof(value) == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol$1(value) {
  return _typeof(value) == 'symbol' || isObjectLike$1(value) && objectToString$1.call(value) == symbolTag$1;
}

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString$1(value) {
  return value == null ? '' : baseToString$1(value);
}

/**
 * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
 * it's created. Arrays are created for missing index properties while objects
 * are created for all other missing properties. Use `_.setWith` to customize
 * `path` creation.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.set(object, 'a[0].b.c', 4);
 * console.log(object.a[0].b.c);
 * // => 4
 *
 * _.set(object, ['x', '0', 'y', 'z'], 5);
 * console.log(object.x[0].y.z);
 * // => 5
 */
function set(object, path, value) {
  return object == null ? object : baseSet(object, path, value);
}
var set_1 = set;

// TODO: Better naming for this?
var safeArrayLength = function safeArrayLength(collection) {
  return Array.isArray(collection) ? collection.length : 0;
};
var arrayContainsEntries = function arrayContainsEntries(collection) {
  return safeArrayLength(collection) > 0;
};
// https://stackoverflow.com/questions/5999998/check-if-a-variable-is-of-function-type
var isFunction$1 = function isFunction(v) {
  return typeof v === 'function';
};
var isUndefinedOrNull = function isUndefinedOrNull(v) {
  return v === void 0 || v === null;
};
var isPromise = function isPromise(value) {
  return value instanceof Promise;
};
var safeObjectKeys = function safeObjectKeys(value) {
  return Boolean(value) ? Object.keys(value) : [];
};
var reduceAsync = function reduceAsync(collection, callback, defaultResult) {
  return Array.isArray(collection) ? collection.reduce(function (promise, item, index) {
    return promise.then(function (result) {
      return callback(result, item, index);
    });
  }, Promise.resolve(defaultResult)) : Promise.resolve(defaultResult);
};
var isFieldIdInSchema = function isFieldIdInSchema(fieldId, schema) {
  return !isUndefinedOrNull(schema) && !isUndefinedOrNull(schema[fieldId]);
};
var hasFieldIdArrayValidator = function hasFieldIdArrayValidator(fieldId, schema) {
  return /\[.*\]/.test(fieldId) && !isFieldIdInSchema(fieldId, schema);
};
var formatFieldForArrayField = function formatFieldForArrayField(fieldId, value) {
  var formattedValue = set_1({}, fieldId, value);
  var keys = Boolean(fieldId) ? Object.keys(formattedValue) : [''];
  var id = Array.isArray(keys) && keys.length > 0 ? keys[0] : '';
  return {
    id: id,
    value: Array.isArray(formattedValue[id]) ? _toConsumableArray(formattedValue[id]) : formattedValue[id]
  };
};

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** `Object#toString` result references. */
var funcTag = '[object Function]',
  genTag = '[object GeneratorFunction]',
  symbolTag = '[object Symbol]';

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
  reIsPlainProp = /^\w*$/,
  reLeadingDot = /^\./,
  rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Detect free variable `global` from Node.js. */
var freeGlobal = _typeof(commonjsGlobal) == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

/** Detect free variable `self`. */
var freeSelf = (typeof self === "undefined" ? "undefined" : _typeof(self)) == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
  funcProto = Function.prototype,
  objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = function () {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? 'Symbol(src)_1.' + uid : '';
}();

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

/** Built-in value references. */
var _Symbol = root.Symbol,
  splice = arrayProto.splice;

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map'),
  nativeCreate = getNative(Object, 'create');

/** Used to convert symbols to primitives and strings. */
var symbolProto = _Symbol ? _Symbol.prototype : undefined,
  symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
    length = entries ? entries.length : 0;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
    length = entries ? entries.length : 0;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
    index = assocIndexOf(data, key);
  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
    index = assocIndexOf(data, key);
  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
    index = assocIndexOf(data, key);
  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
    length = entries ? entries.length : 0;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    hash: new Hash(),
    map: new (Map || ListCache)(),
    string: new Hash()
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = isKey(path, object) ? [path] : castPath(path);
  var index = 0,
    length = path.length;
  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return index && index == length ? object : undefined;
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = value + '';
  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
}

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value) {
  return isArray(value) ? value : stringToPath(value);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = _typeof(value);
  if (type == 'number' || type == 'symbol' || type == 'boolean' || value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = _typeof(value);
  return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoize(function (string) {
  string = toString(string);
  var result = [];
  if (reLeadingDot.test(string)) {
    result.push('');
  }
  string.replace(rePropName, function (match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : number || match);
  });
  return result;
});

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = value + '';
  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return func + '';
    } catch (e) {}
  }
  return '';
}

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || resolver && typeof resolver != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function memoized() {
    var args = arguments,
      key = resolver ? resolver.apply(this, args) : args[0],
      cache = memoized.cache;
    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result);
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache)();
  return memoized;
}

// Assign cache to `_.memoize`.
memoize.Cache = MapCache;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || value !== value && other !== other;
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = _typeof(value);
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && _typeof(value) == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return _typeof(value) == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
}

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}
var get_1 = get;
var createDefaultValidationResult = function createDefaultValidationResult() {
  return {
    type: '',
    succeeded: true,
    message: ''
  };
};
exports.createDefaultValidationResult = createDefaultValidationResult;
var createDefaultInternalValidationResult = function createDefaultInternalValidationResult() {
  return {
    key: '',
    type: '',
    succeeded: true,
    message: ''
  };
};
var createDefaultRecordValidationResult = function createDefaultRecordValidationResult() {
  return {
    succeeded: true,
    recordErrors: {}
  };
};
exports.createDefaultRecordValidationResult = createDefaultRecordValidationResult;
var createDefaultFormValidationResult = function createDefaultFormValidationResult() {
  return {
    succeeded: true,
    fieldErrors: {},
    recordErrors: {}
  };
};
exports.createDefaultFormValidationResult = createDefaultFormValidationResult;
var createDefaultInternalFormValidationResult = function createDefaultInternalFormValidationResult() {
  return {
    succeeded: true,
    fieldErrors: {},
    recordErrors: {}
  };
};

// Sugar we admit both flavors syncrhonous and asynchronous validators
var convertFieldValidationToAsyncIfNeeded = function convertFieldValidationToAsyncIfNeeded(validation) {
  return function (fieldValidatorArgs) {
    var result = validation ? validation(fieldValidatorArgs) : createDefaultValidationResult();
    return isPromise(result) ? result : Promise.resolve(result);
  };
};
var convertRecordValidationToAsyncIfNeeded = function convertRecordValidationToAsyncIfNeeded(validation) {
  return function (recordValidatorArgs) {
    var result = validation ? validation(recordValidatorArgs) : createDefaultValidationResult();
    return isPromise(result) ? result : Promise.resolve(result);
  };
};
var mapToInternalFieldValidation = function mapToInternalFieldValidation(fieldValidation) {
  return isFunction$1(fieldValidation) ? {
    validator: convertFieldValidationToAsyncIfNeeded(fieldValidation),
    message: void 0,
    customArgs: void 0
  } : {
    validator: convertFieldValidationToAsyncIfNeeded(isFunction$1(fieldValidation.validator) ? fieldValidation.validator : fieldValidation.validator.validator),
    customArgs: fieldValidation.customArgs,
    message: fieldValidation.message
  };
};
var mapToInternalValidationCollection$1 = function mapToInternalValidationCollection(fieldValidations) {
  return Array.isArray(fieldValidations) ? fieldValidations.map(mapToInternalFieldValidation) : [];
};
var buildIntertalSchema$1 = function buildIntertalSchema(internalSchema) {
  return internalSchema.reduce(function (internalFieldValidations, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      fieldId = _ref2[0],
      fieldValidations = _ref2[1];
    internalFieldValidations[fieldId] = fieldValidations;
    return internalFieldValidations;
  }, {});
};
var mapToInternalFieldValidationSchema = function mapToInternalFieldValidationSchema(fieldValidationSchema) {
  var validationSchema = fieldValidationSchema instanceof Object ? fieldValidationSchema : {};
  var internalFieldValidations = Object.entries(validationSchema).map(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
      fielId = _ref4[0],
      fieldValidations = _ref4[1];
    return [fielId, mapToInternalValidationCollection$1(fieldValidations)];
  });
  return buildIntertalSchema$1(internalFieldValidations);
};
var mapToInternalRecordValidation = function mapToInternalRecordValidation(recordValidation) {
  return isFunction$1(recordValidation) ? {
    validator: convertRecordValidationToAsyncIfNeeded(recordValidation),
    message: void 0
  } : {
    validator: convertRecordValidationToAsyncIfNeeded(isFunction$1(recordValidation.validator) ? recordValidation.validator : recordValidation.validator.validator),
    message: recordValidation.message
  };
};
var mapToInternalValidationCollection = function mapToInternalValidationCollection(recordValidations) {
  return Array.isArray(recordValidations) ? recordValidations.map(mapToInternalRecordValidation) : [];
};
var buildIntertalSchema = function buildIntertalSchema(internalSchema) {
  return internalSchema.reduce(function (internalRecordValidations, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      recordId = _ref2[0],
      recordValidations = _ref2[1];
    internalRecordValidations[recordId] = recordValidations;
    return internalRecordValidations;
  }, {});
};
var mapToInternalRecordValidationSchema = function mapToInternalRecordValidationSchema(recordValidationSchema) {
  var validationSchema = recordValidationSchema instanceof Object ? recordValidationSchema : {};
  var internalRecordValidations = Object.entries(validationSchema).map(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
      fielId = _ref4[0],
      recordValidations = _ref4[1];
    return [fielId, mapToInternalValidationCollection(recordValidations)];
  });
  return buildIntertalSchema(internalRecordValidations);
};
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
var renameFieldNameKeys = function renameFieldNameKeys(internalValidationResult, fieldKey, fieldErrors, index) {
  var fieldNames = Object.keys(fieldErrors);
  return fieldNames.reduce(function (result, fieldName) {
    return Object.assign(Object.assign({}, result), _defineProperty({}, "".concat(fieldKey, "[").concat(index, "].").concat(fieldName), fieldErrors[fieldName]));
  }, {});
};
var mapArrayErrorListToValidationResult = function mapArrayErrorListToValidationResult(internalValidationResult, fieldKey) {
  return internalValidationResult.arrayErrors.reduce(function (validationResult, fieldErrors, index) {
    return Object.assign(Object.assign({}, validationResult), renameFieldNameKeys(internalValidationResult, fieldKey, fieldErrors, index));
  }, {});
};
var mapInternalValidationResultToValidationResult = function mapInternalValidationResultToValidationResult(internalValidationResult) {
  return Boolean(internalValidationResult.arrayErrors) ? mapArrayErrorListToValidationResult(internalValidationResult, internalValidationResult.key) : {
    type: internalValidationResult.type,
    message: internalValidationResult.message,
    succeeded: internalValidationResult.succeeded
  };
};
var mapInternalFieldErrorsToFieldErrors = function mapInternalFieldErrorsToFieldErrors(internalFieldErrors) {
  return Object.keys(internalFieldErrors).reduce(function (fieldErrors, field) {
    var validationResult = internalFieldErrors[field];
    var fieldValidationResult = Boolean(validationResult.arrayErrors) ? mapArrayErrorListToValidationResult(validationResult, field) : _defineProperty({}, field, validationResult);
    return Object.assign(Object.assign({}, fieldErrors), fieldValidationResult);
  }, {});
};
var mapInternalFormValidationResultToFormValidationResult = function mapInternalFormValidationResultToFormValidationResult(internalFormValidationResult) {
  return {
    succeeded: internalFormValidationResult.succeeded,
    recordErrors: internalFormValidationResult.recordErrors,
    fieldErrors: mapInternalFieldErrorsToFieldErrors(internalFormValidationResult.fieldErrors)
  };
};
var fireAllFieldsValidations = function fireAllFieldsValidations(fieldIds, values, schema, validateField) {
  return fieldIds.map(function (fieldId) {
    return validateField(fieldId, get_1(values, fieldId, undefined), values, schema);
  });
};
var fireAllRecordsValidations = function fireAllRecordsValidations(recordIds, values, schema, validateRecord) {
  return recordIds.map(function (recordId) {
    return validateRecord(recordId, values, schema);
  });
};
var checkValidationResult$1 = function checkValidationResult(validationResult) {
  var result = validationResult;
  if (!validationResult || isUndefinedOrNull(validationResult.succeeded)) {
    // show a console error, warn the user one of his validators is not well formed
    console.error('form-validators: One of the record validator is returning a non expected value.');
    result = createDefaultInternalValidationResult();
  }
  return result;
};
var fireValidation$1 = function fireValidation(values, internalRecordValidation) {
  return internalRecordValidation.validator({
    values: values,
    message: internalRecordValidation.message
  }).then(checkValidationResult$1);
};
// Sequentially resolve promises with reduce: https://css-tricks.com/why-using-reduce-to-sequentially-resolve-promises-works/
// Example run promises until one succeeds: https://gist.github.com/greggman/0b6eafb335de4bbb557c
var iterateValidationsUntilFailOrAllSucceeded$1 = function iterateValidationsUntilFailOrAllSucceeded(values, internalRecordValidations) {
  return internalRecordValidations.reduce(function (result, next) {
    return result.then(function (validationResult) {
      return validationResult.succeeded ? fireValidation$1(values, next) : validationResult;
    });
  }, fireValidation$1(values, internalRecordValidations[0]) // Initial reduce value
  );
};

var fireSingleRecordValidations = function fireSingleRecordValidations(values, internalRecordValidations) {
  return arrayContainsEntries(internalRecordValidations) ? iterateValidationsUntilFailOrAllSucceeded$1(values, internalRecordValidations) : Promise.resolve(createDefaultInternalValidationResult());
};
var checkValidationResult = function checkValidationResult(validationResult) {
  var result = validationResult;
  if (!validationResult || isUndefinedOrNull(validationResult.succeeded)) {
    // show a console error, warn the user one of his validators is not well formed
    console.error('form-validators: One of the field validator is returning a non expected value.');
    result = createDefaultInternalValidationResult();
  }
  return result;
};
var fireValidation = function fireValidation(value, values, internalFieldValidation) {
  return internalFieldValidation.validator({
    value: value,
    values: values,
    customArgs: internalFieldValidation.customArgs,
    message: internalFieldValidation.message
  }).then(checkValidationResult);
};
// Sequentially resolve promises with reduce: https://css-tricks.com/why-using-reduce-to-sequentially-resolve-promises-works/
// Example run promises until one succeeds: https://gist.github.com/greggman/0b6eafb335de4bbb557c
var iterateValidationsUntilFailOrAllSucceeded = function iterateValidationsUntilFailOrAllSucceeded(value, values, internalFieldValidations) {
  return internalFieldValidations.reduce(function (result, next) {
    return result.then(function (validationResult) {
      return validationResult.succeeded ? fireValidation(value, values, next) : validationResult;
    });
  }, fireValidation(value, values, internalFieldValidations[0]) // Initial reduce value
  );
};

var fireSingleFieldValidations = function fireSingleFieldValidations(value, values, internalFieldValidations) {
  return arrayContainsEntries(internalFieldValidations) ? iterateValidationsUntilFailOrAllSucceeded(value, values, internalFieldValidations) : Promise.resolve(createDefaultInternalValidationResult());
};

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}
var didAllValidationsSucceeded = function didAllValidationsSucceeded(validationResults) {
  return validationResults.every(function (fvr) {
    return fvr.succeeded;
  });
};
var extractErrors = function extractErrors(validationResults) {
  return validationResults.reduce(function (errors, _a) {
    var key = _a.key,
      validationResult = __rest(_a, ["key"]);
    errors[key] = Object.assign({}, validationResult);
    return errors;
  }, {});
};
var buildRecordValidationResult = function buildRecordValidationResult(validationResults) {
  var recordValidationResult = createDefaultRecordValidationResult();
  if (arrayContainsEntries(validationResults)) {
    recordValidationResult.succeeded = didAllValidationsSucceeded(validationResults);
    recordValidationResult.recordErrors = extractErrors(validationResults);
  }
  return recordValidationResult;
};
var buildFormValidationResult = function buildFormValidationResult(fieldValidationResults, recordValidationResults) {
  var formValidationResult = createDefaultInternalFormValidationResult();
  if (arrayContainsEntries(fieldValidationResults)) {
    formValidationResult.succeeded = didAllValidationsSucceeded(fieldValidationResults);
    formValidationResult.fieldErrors = extractErrors(fieldValidationResults);
  }
  if (arrayContainsEntries(recordValidationResults)) {
    var recordResults = buildRecordValidationResult(recordValidationResults);
    formValidationResult.succeeded = formValidationResult.succeeded && recordResults.succeeded;
    formValidationResult.recordErrors = recordResults.recordErrors;
  }
  return formValidationResult;
};
var validateField = function validateField(fieldId, value, values, schema) {
  return !isFieldIdInSchema(fieldId, schema) ? Promise.resolve(createDefaultInternalValidationResult()) : fireSingleFieldValidations(value, values, schema[fieldId]).then(function (validationResult) {
    validationResult.key = fieldId;
    return validationResult;
  })["catch"](function (error) {
    var message = "Validation Exception, field: ".concat(fieldId);
    console.error(message);
    throw error;
  });
};
var validateSingleRecord = function validateSingleRecord(recordId, values, schema) {
  return !isFieldIdInSchema(recordId, schema) ? Promise.resolve(createDefaultInternalValidationResult()) : fireSingleRecordValidations(values, schema[recordId]).then(function (validationResult) {
    validationResult.key = recordId;
    return validationResult;
  })["catch"](function (error) {
    var message = "Validation Exception, record: ".concat(recordId);
    console.error(message);
    throw error;
  });
};
var validateRecord = function validateRecord(values, schema) {
  var promiseValidationResults = fireAllRecordsValidations(safeObjectKeys(schema), values, schema, validateSingleRecord);
  return Promise.all(promiseValidationResults).then(function (validationResults) {
    return buildRecordValidationResult(validationResults);
  })["catch"](function (error) {
    var message = 'Uncontrolled error validating records';
    console.error(message);
    throw error;
  });
};
var validateForm = function validateForm(values, fieldSchema, recordSchema) {
  var promiseFieldValidationResults = fireAllFieldsValidations(safeObjectKeys(fieldSchema), values, fieldSchema, validateField);
  var promiseRecordValidationResults = fireAllRecordsValidations(safeObjectKeys(recordSchema), values, recordSchema, validateSingleRecord);
  return Promise.all(promiseFieldValidationResults).then(function (fieldValidationResults) {
    return Promise.all(promiseRecordValidationResults).then(function (recordValidationResults) {
      return [fieldValidationResults, recordValidationResults];
    });
  }).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      fieldValidationResults = _ref2[0],
      recordValidationResults = _ref2[1];
    return buildFormValidationResult(fieldValidationResults, recordValidationResults);
  })["catch"](function (error) {
    var message = 'Uncontrolled error validating form';
    console.error(message);
    throw error;
  });
};
var FormValidation = function FormValidation(validationSchema) {
  var _this = this;
  _classCallCheck(this, FormValidation);
  this.fieldSchema = {};
  this.recordSchema = {};
  this.setupValidationSchema = function (validationSchema) {
    if (validationSchema && _typeof(validationSchema) === 'object') {
      var record = validationSchema.record,
        field = validationSchema.field;
      if (field && _typeof(field) === 'object') {
        _this.fieldSchema = mapToInternalFieldValidationSchema(validationSchema.field);
      }
      if (record && _typeof(record) === 'object') {
        _this.recordSchema = mapToInternalRecordValidationSchema(validationSchema.record);
      }
    } else {
      console.error('ValidationSchema must be a valid object');
    }
  };
  this.validateField = function (fieldId, value, values) {
    var field = hasFieldIdArrayValidator(fieldId, _this.fieldSchema) ? formatFieldForArrayField(fieldId, value) : {
      id: fieldId,
      value: value
    };
    return validateField(field.id, field.value, values, _this.fieldSchema).then(function (internalValidationResult) {
      var validationResult = mapInternalValidationResultToValidationResult(internalValidationResult);
      return fieldId !== field.id ? get_1(validationResult, fieldId) : validationResult;
    });
  };
  this.validateRecord = function (values) {
    return validateRecord(values, _this.recordSchema);
  };
  this.validateForm = function (values) {
    return validateForm(values, _this.fieldSchema, _this.recordSchema).then(mapInternalFormValidationResultToFormValidationResult);
  };
  this.updateValidationSchema = function (validationSchema) {
    _this.setupValidationSchema(validationSchema);
  };
  this.setupValidationSchema(validationSchema);
};
exports.FormValidation = FormValidation;
var createFormValidation = function createFormValidation(validationSchema) {
  return new FormValidation(validationSchema);
};
exports.createFormValidation = createFormValidation;
var getArgsToParse = function getArgsToParse(message) {
  return message.match(/{{[^{}][\w\.]*}}/g);
};
var getArgPath = function getArgPath(arg) {
  return arg.replace(/[{}]/g, '');
};
var parseMessage = function parseMessage(message, customArgs) {
  var parsableArgs = getArgsToParse(message);
  return Array.isArray(parsableArgs) ? parsableArgs.reduce(function (customMessage, arg) {
    return customMessage.replace(arg, get_1(customArgs, getArgPath(arg), arg));
  }, message) : message;
};
var parseMessageWithCustomArgs = function parseMessageWithCustomArgs(message, customArgs) {
  return message ? parseMessage(message, customArgs) : '';
};
exports.parseMessageWithCustomArgs = parseMessageWithCustomArgs;
var VALIDATOR_TYPE$4 = 'REQUIRED';
var defaultMessage$4 = 'Please fill in this mandatory field.';
var setErrorMessage$4 = function setErrorMessage(message) {
  return defaultMessage$4 = message;
};
var DEFAULT_PARAMS$3 = {
  trim: true
};
var isStringValid = function isStringValid(value, trim) {
  return trim ? value.trim().length > 0 : value.length > 0;
};
var isNonStringValid = function isNonStringValid(value) {
  return value !== void 0 && value !== null;
};
var isValidField$1 = function isValidField(value, trim) {
  return typeof value === 'string' ? isStringValid(value, trim) : isNonStringValid(value);
};
var validator$5 = function validator(fieldValidatorArgs) {
  var value = fieldValidatorArgs.value,
    _fieldValidatorArgs$c = fieldValidatorArgs.customArgs,
    customArgs = _fieldValidatorArgs$c === void 0 ? DEFAULT_PARAMS$3 : _fieldValidatorArgs$c,
    _fieldValidatorArgs$m = fieldValidatorArgs.message,
    message = _fieldValidatorArgs$m === void 0 ? defaultMessage$4 : _fieldValidatorArgs$m;
  var succeeded = isValidField$1(value, Boolean(customArgs.trim));
  return {
    succeeded: succeeded,
    message: succeeded ? '' : parseMessageWithCustomArgs(message, customArgs),
    type: VALIDATOR_TYPE$4
  };
};
var required = /*#__PURE__*/Object.freeze({
  __proto__: null,
  setErrorMessage: setErrorMessage$4,
  validator: validator$5
});
var isEmptyValue = function isEmptyValue(value) {
  return value === null || value === undefined || value === '';
};
var isValidPattern = function isValidPattern(value, pattern) {
  return isEmptyValue(value) ? true : pattern.test(value);
};
var VALIDATOR_TYPE$3 = 'EMAIL';
var defaultMessage$3 = 'Please enter a valid email address.';
var setErrorMessage$3 = function setErrorMessage(message) {
  return defaultMessage$3 = message;
};
// RegExp from http://emailregex.com
var EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var isValidField = function isValidField(value) {
  return isValidPattern(value, EMAIL_PATTERN);
};
var validator$4 = function validator(fieldValidatorArgs) {
  var value = fieldValidatorArgs.value,
    _fieldValidatorArgs$m = fieldValidatorArgs.message,
    message = _fieldValidatorArgs$m === void 0 ? defaultMessage$3 : _fieldValidatorArgs$m;
  var succeeded = isValidField(value);
  return {
    succeeded: succeeded,
    message: succeeded ? '' : message,
    type: VALIDATOR_TYPE$3
  };
};
var email = /*#__PURE__*/Object.freeze({
  __proto__: null,
  setErrorMessage: setErrorMessage$3,
  validator: validator$4
});
var VALIDATOR_TYPE$2 = 'PATTERN';
var defaultMessage$2 = 'Please provide a valid format.';
var setErrorMessage$2 = function setErrorMessage(message) {
  return defaultMessage$2 = message;
};
var BAD_PARAMETER$2 = 'FieldValidationError: pattern option for pattern validation is mandatory. Example: { pattern: /d+/ }.';
var DEFAULT_PARAMS$2 = null;
function getRegExp(pattern) {
  return pattern instanceof RegExp ? pattern : new RegExp(pattern);
}
function parsePattern(_ref) {
  var pattern = _ref.pattern;
  // Avoid RegExp like /true/ /false/ and /null/ without an explicit "true", "false" or "null"
  if (typeof pattern === 'boolean' || pattern === null) {
    throw new Error(BAD_PARAMETER$2);
  }
  return getRegExp(pattern);
}
var validator$3 = function validator(fieldValidatorArgs) {
  if (!fieldValidatorArgs.customArgs) {
    throw new Error(BAD_PARAMETER$2);
  }
  var value = fieldValidatorArgs.value,
    _fieldValidatorArgs$c = fieldValidatorArgs.customArgs,
    customArgs = _fieldValidatorArgs$c === void 0 ? DEFAULT_PARAMS$2 : _fieldValidatorArgs$c,
    _fieldValidatorArgs$m = fieldValidatorArgs.message,
    message = _fieldValidatorArgs$m === void 0 ? defaultMessage$2 : _fieldValidatorArgs$m;
  var pattern = parsePattern(customArgs);
  var succeeded = isValidPattern(value, pattern);
  return {
    succeeded: succeeded,
    message: succeeded ? '' : parseMessageWithCustomArgs(message, customArgs),
    type: VALIDATOR_TYPE$2
  };
};
var pattern = /*#__PURE__*/Object.freeze({
  __proto__: null,
  setErrorMessage: setErrorMessage$2,
  validator: validator$3
});
function parseLengthParams(customParams, errorMessage) {
  var length = customParams.length === null ? NaN : Number(customParams.length);
  if (isNaN(length)) {
    throw new Error(errorMessage);
  }
  return length;
}
function isLengthValid(value, length, validatorFn) {
  // Don't try to validate non string values
  return typeof value === 'string' ? validatorFn(value, length) : true;
}
var VALIDATOR_TYPE$1 = 'MIN_LENGTH';
var defaultMessage$1 = 'The value provided does not fulfill min length.';
var setErrorMessage$1 = function setErrorMessage(message) {
  return defaultMessage$1 = message;
};
var BAD_PARAMETER$1 = 'FieldValidationError: Parameter "length" for minLength in customArgs is mandatory and should be a valid number. Example: { length: 4 }.';
var DEFAULT_PARAMS$1 = null;
var isStringLengthValid$1 = function isStringLengthValid(value, length) {
  return value.length >= length;
};
var validator$2 = function validator(fieldValidatorArgs) {
  if (!fieldValidatorArgs.customArgs) {
    throw new Error(BAD_PARAMETER$1);
  }
  var value = fieldValidatorArgs.value,
    _fieldValidatorArgs$c = fieldValidatorArgs.customArgs,
    customArgs = _fieldValidatorArgs$c === void 0 ? DEFAULT_PARAMS$1 : _fieldValidatorArgs$c,
    _fieldValidatorArgs$m = fieldValidatorArgs.message,
    message = _fieldValidatorArgs$m === void 0 ? defaultMessage$1 : _fieldValidatorArgs$m;
  var length = parseLengthParams(customArgs, BAD_PARAMETER$1);
  var succeeded = isLengthValid(value, length, isStringLengthValid$1);
  return {
    succeeded: succeeded,
    message: succeeded ? '' : parseMessageWithCustomArgs(message, customArgs),
    type: VALIDATOR_TYPE$1
  };
};
var minLength = /*#__PURE__*/Object.freeze({
  __proto__: null,
  setErrorMessage: setErrorMessage$1,
  validator: validator$2
});
var VALIDATOR_TYPE = 'MAX_LENGTH';
var defaultMessage = 'The value provided does not fulfill max length.';
var setErrorMessage = function setErrorMessage(message) {
  return defaultMessage = message;
};
var BAD_PARAMETER = 'FieldValidationError: Parameter "length" for maxLength in customArgs is mandatory and should be a valid number. Example: { length: 4 }.';
var DEFAULT_PARAMS = null;
var isStringLengthValid = function isStringLengthValid(value, length) {
  return value.length <= length;
};
var validator$1 = function validator(fieldValidatorArgs) {
  if (!fieldValidatorArgs.customArgs) {
    throw new Error(BAD_PARAMETER);
  }
  var value = fieldValidatorArgs.value,
    _fieldValidatorArgs$c = fieldValidatorArgs.customArgs,
    customArgs = _fieldValidatorArgs$c === void 0 ? DEFAULT_PARAMS : _fieldValidatorArgs$c,
    _fieldValidatorArgs$m = fieldValidatorArgs.message,
    message = _fieldValidatorArgs$m === void 0 ? defaultMessage : _fieldValidatorArgs$m;
  var length = parseLengthParams(customArgs, BAD_PARAMETER);
  var succeeded = isLengthValid(value, length, isStringLengthValid);
  return {
    succeeded: succeeded,
    message: succeeded ? '' : parseMessageWithCustomArgs(message, customArgs),
    type: VALIDATOR_TYPE
  };
};
var maxLength = /*#__PURE__*/Object.freeze({
  __proto__: null,
  setErrorMessage: setErrorMessage,
  validator: validator$1
});
var createEmptyArrayValidationResult = function createEmptyArrayValidationResult() {
  return {
    succeeded: true,
    arrayErrors: []
  };
};
var validator = function validator(validatorArgs) {
  var value = validatorArgs.value,
    customArgs = validatorArgs.customArgs;
  var formValidation = createFormValidation(customArgs);
  return reduceAsync(value, function (validationResult, item) {
    return formValidation.validateForm(item).then(function (_ref) {
      var fieldErrors = _ref.fieldErrors,
        succeeded = _ref.succeeded;
      return {
        succeeded: validationResult.succeeded && succeeded,
        arrayErrors: [].concat(_toConsumableArray(validationResult.arrayErrors), [fieldErrors])
      };
    });
  }, createEmptyArrayValidationResult()).then(function (arrayValidationResult) {
    return {
      succeeded: arrayValidationResult.succeeded,
      type: 'ARRAY_VALIDATIONS',
      message: null,
      arrayErrors: arrayValidationResult.arrayErrors
    };
  });
};
var array = /*#__PURE__*/Object.freeze({
  __proto__: null,
  validator: validator
});
var index = {
  required: required,
  email: email,
  pattern: pattern,
  minLength: minLength,
  maxLength: maxLength,
  array: array
};
exports.Validators = index;
},{}],"../node_modules/@lemoncode/fonk-array-required-validator/dist/@lemoncode/fonk-array-required-validator.esm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.arrayRequired = void 0;
var _fonk = require("@lemoncode/fonk");
var VALIDATOR_TYPE = 'ARRAY_REQUIRED';
var defaultMessage = 'The list should have items';
var setErrorMessage = function setErrorMessage(message) {
  return defaultMessage = message;
};
var defaultCustomArgs = {
  minLength: 1
};
var validateType = function validateType(value) {
  return Array.isArray(value);
};
var validate = function validate(value, args) {
  return value.length >= args.minLength && (args.maxLength ? value.length <= args.maxLength : true);
};
var isDefined = function isDefined(value) {
  return value !== void 0 && value !== null && value !== '';
};
var validator = function validator(fieldValidatorArgs) {
  var value = fieldValidatorArgs.value,
    _fieldValidatorArgs$m = fieldValidatorArgs.message,
    message = _fieldValidatorArgs$m === void 0 ? defaultMessage : _fieldValidatorArgs$m,
    customArgs = fieldValidatorArgs.customArgs;
  var args = Object.assign(Object.assign({}, defaultCustomArgs), customArgs);
  var succeeded = !isDefined(value) || validateType(value) && validate(value, args);
  return {
    succeeded: succeeded,
    message: succeeded ? '' : (0, _fonk.parseMessageWithCustomArgs)(message || defaultMessage, customArgs),
    type: VALIDATOR_TYPE
  };
};
var validator$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  setErrorMessage: setErrorMessage,
  validator: validator
});
exports.arrayRequired = validator$1;
},{"@lemoncode/fonk":"../node_modules/@lemoncode/fonk/dist/@lemoncode/fonk.esm.js"}],"../node_modules/@lemoncode/fonk-is-url-validator/dist/@lemoncode/fonk-is-url-validator.esm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isUrl = void 0;
var _fonk = require("@lemoncode/fonk");
var VALIDATOR_TYPE = 'IS_URL';
var defaultMessage = 'Provided value is not a valid url';
var setErrorMessage = function setErrorMessage(message) {
  return defaultMessage = message;
};
var isDefined = function isDefined(value) {
  return value !== void 0 && value !== null && value !== '';
};
var regex = /^(?:((?:(?:https?|ftp):\/\/))|(?:www.))+(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/;
var isUrl = function isUrl(url) {
  return regex.test(url);
};
var validator = function validator(fieldValidatorArgs) {
  var value = fieldValidatorArgs.value,
    _fieldValidatorArgs$m = fieldValidatorArgs.message,
    message = _fieldValidatorArgs$m === void 0 ? defaultMessage : _fieldValidatorArgs$m,
    customArgs = fieldValidatorArgs.customArgs;
  var succeeded = !isDefined(value) || isUrl(value);
  return {
    succeeded: succeeded,
    message: succeeded ? '' : (0, _fonk.parseMessageWithCustomArgs)(message || defaultMessage, customArgs),
    type: VALIDATOR_TYPE
  };
};
var validator$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  setErrorMessage: setErrorMessage,
  validator: validator
});
exports.isUrl = validator$1;
},{"@lemoncode/fonk":"../node_modules/@lemoncode/fonk/dist/@lemoncode/fonk.esm.js"}],"pages/upload-property/upload-property.validations.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formValidation = void 0;
var _fonk = require("@lemoncode/fonk");
var _fonkArrayRequiredValidator = require("@lemoncode/fonk-array-required-validator");
var _fonkIsUrlValidator = require("@lemoncode/fonk-is-url-validator");
var validationSchema = {
  field: {
    title: [{
      validator: _fonk.Validators.required,
      message: 'Campo requerido'
    }],
    notes: [{
      validator: _fonk.Validators.required,
      message: 'Campo requerido'
    }],
    email: [{
      validator: _fonk.Validators.required,
      message: 'Campo requerido'
    }, {
      validator: _fonk.Validators.email,
      message: 'Email no válido'
    }],
    phone: [{
      validator: _fonk.Validators.required,
      message: 'Campo requerido'
    }, {
      validator: _fonk.Validators.pattern,
      customArgs: {
        pattern: '^[1-9][0-9]{8}$'
      },
      message: 'Teléfono no válido'
    }],
    price: [{
      validator: _fonk.Validators.required,
      message: 'Campo requerido'
    }, {
      validator: _fonk.Validators.pattern,
      customArgs: {
        pattern: '^[1-9][0-9]*(.[0-9]{1,2})?$'
      },
      message: 'Precio no válido'
    }],
    saleTypes: [{
      validator: _fonk.Validators.required,
      message: 'Campo requerido'
    }],
    address: [{
      validator: _fonk.Validators.required,
      message: 'Campo requerido'
    }],
    city: [{
      validator: _fonk.Validators.required,
      message: 'Campo requerido'
    }],
    province: [{
      validator: _fonk.Validators.required,
      message: 'Campo requerido'
    }],
    squareMeter: [{
      validator: _fonk.Validators.required,
      message: 'Campo requerido'
    }, {
      validator: _fonk.Validators.pattern,
      customArgs: {
        pattern: '^[1-9][0-9]*$'
      },
      message: 'Superficie no válida'
    }],
    rooms: [{
      validator: _fonk.Validators.required,
      message: 'Campo requerido'
    }, {
      validator: _fonk.Validators.pattern,
      customArgs: {
        pattern: '^[1-9][0-9]*$'
      },
      message: 'Cantidad no válida'
    }],
    bathrooms: [{
      validator: _fonk.Validators.required,
      message: 'Campo requerido'
    }, {
      validator: _fonk.Validators.pattern,
      customArgs: {
        pattern: '^[1-9][0-9]*$'
      },
      message: 'Cantidad no válida'
    }],
    locationUrl: [{
      validator: _fonk.Validators.required,
      message: 'Campo requerido'
    }, {
      validator: _fonkIsUrlValidator.isUrl.validator,
      message: 'URL no válida'
    }],
    mainFeatures: [{
      validator: _fonk.Validators.required,
      message: 'Campo requerido'
    }]
  }
};
var formValidation = (0, _fonk.createFormValidation)(validationSchema);
exports.formValidation = formValidation;
},{"@lemoncode/fonk":"../node_modules/@lemoncode/fonk/dist/@lemoncode/fonk.esm.js","@lemoncode/fonk-array-required-validator":"../node_modules/@lemoncode/fonk-array-required-validator/dist/@lemoncode/fonk-array-required-validator.esm.js","@lemoncode/fonk-is-url-validator":"../node_modules/@lemoncode/fonk-is-url-validator/dist/@lemoncode/fonk-is-url-validator.esm.js"}],"pages/upload-property/upload-property.mappers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapPropertyDetailVmToApi = void 0;
var mapPropertyDetailVmToApi = function mapPropertyDetailVmToApi(propertyDetail) {
  return {
    title: propertyDetail.title,
    notes: propertyDetail.notes,
    email: propertyDetail.email,
    phone: propertyDetail.phone,
    price: propertyDetail.price,
    saleTypeIds: propertyDetail.saleTypes,
    address: propertyDetail.address,
    city: propertyDetail.city,
    provinceId: propertyDetail.province,
    squareMeter: propertyDetail.squareMeter,
    rooms: propertyDetail.rooms,
    bathrooms: propertyDetail.bathrooms,
    locationUrl: propertyDetail.locationUrl,
    mainFeatures: propertyDetail.mainFeatures,
    equipmentIds: propertyDetail.equipments,
    images: propertyDetail.images
  };
};
exports.mapPropertyDetailVmToApi = mapPropertyDetailVmToApi;
},{}],"pages/upload-property/upload-property.helpers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setOptionList = exports.setCheckboxList = exports.onRemoveFeature = exports.onAddImage = exports.onAddFeature = exports.formatDeleteFeatureButtonId = exports.formatCheckboxId = void 0;
var formatCheckboxId = function formatCheckboxId(item) {
  return "".concat(item.id, "-").concat(item.name);
};
exports.formatCheckboxId = formatCheckboxId;
var getCheckbox = function getCheckbox(item) {
  var container = document.createElement('label');
  container.classList.add('checkbox-contenedor');
  container.textContent = item.name;
  var input = document.createElement('input');
  input.id = formatCheckboxId(item);
  input.value = item.id;
  input.type = 'checkbox';
  var checkmark = document.createElement('span');
  checkmark.classList.add('checkmark');
  container.appendChild(input);
  container.appendChild(checkmark);
  return container;
};
var setCheckboxList = function setCheckboxList(list, id) {
  var listElement = document.getElementById(id);
  list.forEach(function (item) {
    var checkbox = getCheckbox(item);
    listElement.appendChild(checkbox);
  });
};
exports.setCheckboxList = setCheckboxList;
var getOption = function getOption(item) {
  var option = document.createElement('option');
  option.value = item.id;
  option.textContent = item.name;
  return option;
};
var setOptionList = function setOptionList(list, id) {
  var listElement = document.getElementById(id);
  var defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = 'Provincia';
  listElement.appendChild(defaultOption);
  list.forEach(function (item) {
    var option = getOption(item);
    listElement.appendChild(option);
  });
};
exports.setOptionList = setOptionList;
var formatDeleteFeatureButtonId = function formatDeleteFeatureButtonId(feature) {
  return "delete-".concat(feature, "-button");
};
exports.formatDeleteFeatureButtonId = formatDeleteFeatureButtonId;
var onAddFeature = function onAddFeature(feature) {
  var mainFeaturesElement = document.getElementById('mainFeatures');
  var featureContainer = document.createElement('div');
  featureContainer.id = "delete-".concat(feature);
  featureContainer.classList.add('feature');
  var deleteButton = document.createElement('button');
  deleteButton.id = formatDeleteFeatureButtonId(feature);
  deleteButton.type = 'button';
  var featureElement = document.createElement('span');
  featureElement.textContent = feature;
  featureContainer.appendChild(deleteButton);
  featureContainer.appendChild(featureElement);
  mainFeaturesElement.appendChild(featureContainer);
  var newFeatureElement = document.getElementById('newFeature');
  newFeatureElement.value = '';
};
exports.onAddFeature = onAddFeature;
var onRemoveFeature = function onRemoveFeature(feature) {
  var mainFeaturesElement = document.getElementById('mainFeatures');
  var featureContainer = document.getElementById("delete-".concat(feature));
  mainFeaturesElement.removeChild(featureContainer);
};
exports.onRemoveFeature = onRemoveFeature;
var onAddImage = function onAddImage(image) {
  var imagesElement = document.getElementById('images');
  var addImageButton = document.getElementById('add-image-button');
  var imageContainerElement = document.createElement('div');
  imageContainerElement.classList.add('add_img');
  var imageElement = document.createElement('img');
  imageElement.src = image;
  imageContainerElement.appendChild(imageElement);
  imagesElement.insertBefore(imageContainerElement, addImageButton);
};
exports.onAddImage = onAddImage;
},{}],"pages/upload-property/upload-property.js":[function(require,module,exports) {
"use strict";

var _helpers = require("../../common/helpers");
var _uploadProperty = require("./upload-property.api");
var _uploadProperty2 = require("./upload-property.validations");
var _uploadProperty3 = require("./upload-property.mappers");
var _uploadProperty4 = require("./upload-property.helpers");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
Promise.all([(0, _uploadProperty.getSaleTypeList)(), (0, _uploadProperty.getProvinceList)(), (0, _uploadProperty.getEquipmentsList)()]).then(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 3),
    saleTypeList = _ref2[0],
    provinceList = _ref2[1],
    equipmentsList = _ref2[2];
  (0, _uploadProperty4.setOptionList)(provinceList, 'province');
  (0, _uploadProperty4.setCheckboxList)(saleTypeList, 'saleTypes');
  (0, _uploadProperty4.setCheckboxList)(equipmentsList, 'equipments');
});
var propertyDetail = {
  title: '',
  notes: '',
  email: '',
  phone: '',
  price: '',
  saleTypes: '',
  address: '',
  city: '',
  province: '',
  squareMeter: '',
  rooms: '',
  bathrooms: '',
  locationUrl: '',
  mainFeatures: '',
  equipments: '',
  images: []
};
(0, _helpers.onUpdateField)('title', function (event) {
  var value = event.target.value;
  propertyDetail = _objectSpread(_objectSpread({}, propertyDetail), {}, {
    title: value
  });
  _uploadProperty2.formValidation.validateField('title', propertyDetail.title).then(function (result) {
    (0, _helpers.onSetError)('title', result);
  });
});
(0, _helpers.onUpdateField)('notes', function (event) {
  var value = event.target.value;
  propertyDetail = _objectSpread(_objectSpread({}, propertyDetail), {}, {
    notes: value
  });
  _uploadProperty2.formValidation.validateField('notes', propertyDetail.notes).then(function (result) {
    (0, _helpers.onSetError)('notes', result);
  });
});
(0, _helpers.onUpdateField)('email', function (event) {
  var value = event.target.value;
  propertyDetail = _objectSpread(_objectSpread({}, propertyDetail), {}, {
    email: value
  });
  _uploadProperty2.formValidation.validateField('email', propertyDetail.email).then(function (result) {
    (0, _helpers.onSetError)('email', result);
  });
});
(0, _helpers.onUpdateField)('phone', function (event) {
  var value = event.target.value;
  propertyDetail = _objectSpread(_objectSpread({}, propertyDetail), {}, {
    phone: value
  });
  _uploadProperty2.formValidation.validateField('phone', propertyDetail.phone).then(function (result) {
    (0, _helpers.onSetError)('phone', result);
  });
});
(0, _helpers.onUpdateField)('price', function (event) {
  var value = event.target.value;
  propertyDetail = _objectSpread(_objectSpread({}, propertyDetail), {}, {
    price: value
  });
  _uploadProperty2.formValidation.validateField('price', propertyDetail.price).then(function (result) {
    (0, _helpers.onSetError)('price', result);
  });
});
(0, _helpers.onUpdateField)('saleTypes', function (event) {
  var saleTypeArray = getCheckboxes('saleTypes');
  propertyDetail = _objectSpread(_objectSpread({}, propertyDetail), {}, {
    saleTypes: saleTypeArray
  });
  _uploadProperty2.formValidation.validateField('saleTypes', propertyDetail.saleTypes).then(function (result) {
    (0, _helpers.onSetError)('saleTypes', result);
  });
});
(0, _helpers.onUpdateField)('address', function (event) {
  var value = event.target.value;
  propertyDetail = _objectSpread(_objectSpread({}, propertyDetail), {}, {
    address: value
  });
  _uploadProperty2.formValidation.validateField('address', propertyDetail.address).then(function (result) {
    (0, _helpers.onSetError)('address', result);
  });
});
(0, _helpers.onUpdateField)('city', function (event) {
  var value = event.target.value;
  propertyDetail = _objectSpread(_objectSpread({}, propertyDetail), {}, {
    city: value
  });
  _uploadProperty2.formValidation.validateField('city', propertyDetail.city).then(function (result) {
    (0, _helpers.onSetError)('city', result);
  });
});
(0, _helpers.onUpdateField)('province', function (event) {
  var value = event.target.value;
  propertyDetail = _objectSpread(_objectSpread({}, propertyDetail), {}, {
    province: value
  });
  _uploadProperty2.formValidation.validateField('province', propertyDetail.province).then(function (result) {
    (0, _helpers.onSetError)('province', result);
  });
});
(0, _helpers.onUpdateField)('squareMeter', function (event) {
  var value = event.target.value;
  propertyDetail = _objectSpread(_objectSpread({}, propertyDetail), {}, {
    squareMeter: value
  });
  _uploadProperty2.formValidation.validateField('squareMeter', propertyDetail.squareMeter).then(function (result) {
    (0, _helpers.onSetError)('squareMeter', result);
  });
});
(0, _helpers.onUpdateField)('rooms', function (event) {
  var value = event.target.value;
  propertyDetail = _objectSpread(_objectSpread({}, propertyDetail), {}, {
    rooms: value
  });
  _uploadProperty2.formValidation.validateField('rooms', propertyDetail.rooms).then(function (result) {
    (0, _helpers.onSetError)('rooms', result);
  });
});
(0, _helpers.onUpdateField)('bathrooms', function (event) {
  var value = event.target.value;
  propertyDetail = _objectSpread(_objectSpread({}, propertyDetail), {}, {
    bathrooms: value
  });
  _uploadProperty2.formValidation.validateField('bathrooms', propertyDetail.bathrooms).then(function (result) {
    (0, _helpers.onSetError)('bathrooms', result);
  });
});
(0, _helpers.onUpdateField)('locationUrl', function (event) {
  var value = event.target.value;
  propertyDetail = _objectSpread(_objectSpread({}, propertyDetail), {}, {
    locationUrl: value
  });
  _uploadProperty2.formValidation.validateField('locationUrl', propertyDetail.locationUrl).then(function (result) {
    (0, _helpers.onSetError)('locationUrl', result);
  });
});
(0, _helpers.onUpdateField)('equipments', function (event) {
  var equipmentsArray = getCheckboxes('equipments');
  propertyDetail = _objectSpread(_objectSpread({}, propertyDetail), {}, {
    equipments: equipmentsArray
  });
});
(0, _helpers.onUpdateField)('add-image', function (event) {
  var value = event.target.value;
  (0, _uploadProperty4.onAddImage)(value);
  var imagesArray = getImages('images');
  imagesArray.pop();
  propertyDetail = _objectSpread(_objectSpread({}, propertyDetail), {}, {
    images: imagesArray
  });
});
var getCheckboxes = function getCheckboxes(id) {
  var checkboxes = document.querySelectorAll("#".concat(id, " input[type=\"checkbox\"]"));
  var checkboxMarcados = null;
  checkboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      checkboxMarcados = checkboxMarcados || [];
      checkboxMarcados.push(checkbox.value);
    }
  });
  return checkboxMarcados || '';
};
var insertFeatureButton = document.getElementById('insert-feature-button');
insertFeatureButton.addEventListener('click', function () {
  var newFeature = document.getElementById('newFeature');
  var value = newFeature.value;
  if (value !== '') {
    (0, _uploadProperty4.onAddFeature)(value);
    if (propertyDetail.mainFeatures === '') {
      propertyDetail.mainFeatures = [];
    }
    propertyDetail.mainFeatures.push(value);
    _uploadProperty2.formValidation.validateField('mainFeatures', propertyDetail.mainFeatures).then(function (result) {
      (0, _helpers.onSetError)('mainFeatures', result);
    });
    var deleteButtonId = "delete-".concat(value, "-button");
    var deleteButton = document.getElementById(deleteButtonId);
    deleteButton.addEventListener('click', function () {
      (0, _uploadProperty4.onRemoveFeature)(value);
      removeFromArray(value, propertyDetail.mainFeatures);
      if (propertyDetail.mainFeatures.length === 0) {
        propertyDetail.mainFeatures = '';
      }
      _uploadProperty2.formValidation.validateField('mainFeatures', propertyDetail.mainFeatures).then(function (result) {
        (0, _helpers.onSetError)('mainFeatures', result);
      });
    });
  }
});
var removeFromArray = function removeFromArray(valor, array) {
  var indice = array.indexOf(valor);
  if (indice !== -1) {
    array.splice(indice, 1);
  }
};
var getImages = function getImages(id) {
  var imagenes = document.getElementById(id).getElementsByTagName('img');
  var srcs = [];
  for (var i = 0; i < imagenes.length; i++) {
    srcs.push(imagenes[i].src);
  }
  return srcs;
};
(0, _helpers.onSubmitForm)('save-button', function () {
  _uploadProperty2.formValidation.validateForm(propertyDetail).then(function (result) {
    (0, _helpers.onSetFormErrors)(result);
    if (result.succeeded) {
      var apiPropertyDetail = (0, _uploadProperty3.mapPropertyDetailVmToApi)(propertyDetail);
      (0, _uploadProperty.setProperty)(apiPropertyDetail);
      alert('propiedad enviada correctamente');
      window.location.href = '/pages/upload-property/upload-property.html';
    }
  });
});
},{"../../common/helpers":"common/helpers/index.js","./upload-property.api":"pages/upload-property/upload-property.api.js","./upload-property.validations":"pages/upload-property/upload-property.validations.js","./upload-property.mappers":"pages/upload-property/upload-property.mappers.js","./upload-property.helpers":"pages/upload-property/upload-property.helpers.js"}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50895" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../node_modules/parcel/src/builtins/hmr-runtime.js","pages/upload-property/upload-property.js"], null)
//# sourceMappingURL=/upload-property.c83d080b.js.map