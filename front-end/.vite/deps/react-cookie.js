import {
  require_react
} from "./chunk-FQO5W7GE.js";
import {
  require_react_is
} from "./chunk-JM2272QT.js";
import {
  __commonJS,
  __toESM
} from "./chunk-ZS7NZCD4.js";

// node_modules/cookie/index.js
var require_cookie = __commonJS({
  "node_modules/cookie/index.js"(exports) {
    "use strict";
    exports.parse = parse2;
    exports.serialize = serialize2;
    var __toString = Object.prototype.toString;
    var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    function parse2(str, options) {
      if (typeof str !== "string") {
        throw new TypeError("argument str must be a string");
      }
      var obj = {};
      var opt = options || {};
      var dec = opt.decode || decode;
      var index = 0;
      while (index < str.length) {
        var eqIdx = str.indexOf("=", index);
        if (eqIdx === -1) {
          break;
        }
        var endIdx = str.indexOf(";", index);
        if (endIdx === -1) {
          endIdx = str.length;
        } else if (endIdx < eqIdx) {
          index = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        var key = str.slice(index, eqIdx).trim();
        if (void 0 === obj[key]) {
          var val = str.slice(eqIdx + 1, endIdx).trim();
          if (val.charCodeAt(0) === 34) {
            val = val.slice(1, -1);
          }
          obj[key] = tryDecode(val, dec);
        }
        index = endIdx + 1;
      }
      return obj;
    }
    function serialize2(name, val, options) {
      var opt = options || {};
      var enc = opt.encode || encode;
      if (typeof enc !== "function") {
        throw new TypeError("option encode is invalid");
      }
      if (!fieldContentRegExp.test(name)) {
        throw new TypeError("argument name is invalid");
      }
      var value = enc(val);
      if (value && !fieldContentRegExp.test(value)) {
        throw new TypeError("argument val is invalid");
      }
      var str = name + "=" + value;
      if (null != opt.maxAge) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge) || !isFinite(maxAge)) {
          throw new TypeError("option maxAge is invalid");
        }
        str += "; Max-Age=" + Math.floor(maxAge);
      }
      if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain)) {
          throw new TypeError("option domain is invalid");
        }
        str += "; Domain=" + opt.domain;
      }
      if (opt.path) {
        if (!fieldContentRegExp.test(opt.path)) {
          throw new TypeError("option path is invalid");
        }
        str += "; Path=" + opt.path;
      }
      if (opt.expires) {
        var expires = opt.expires;
        if (!isDate(expires) || isNaN(expires.valueOf())) {
          throw new TypeError("option expires is invalid");
        }
        str += "; Expires=" + expires.toUTCString();
      }
      if (opt.httpOnly) {
        str += "; HttpOnly";
      }
      if (opt.secure) {
        str += "; Secure";
      }
      if (opt.partitioned) {
        str += "; Partitioned";
      }
      if (opt.priority) {
        var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError("option priority is invalid");
        }
      }
      if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch (sameSite) {
          case true:
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError("option sameSite is invalid");
        }
      }
      return str;
    }
    function decode(str) {
      return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
    }
    function encode(val) {
      return encodeURIComponent(val);
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]" || val instanceof Date;
    }
    function tryDecode(str, decode2) {
      try {
        return decode2(str);
      } catch (e) {
        return str;
      }
    }
  }
});

// node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js
var require_hoist_non_react_statics_cjs = __commonJS({
  "node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js"(exports, module) {
    "use strict";
    var reactIs = require_react_is();
    var REACT_STATICS = {
      childContextTypes: true,
      contextType: true,
      contextTypes: true,
      defaultProps: true,
      displayName: true,
      getDefaultProps: true,
      getDerivedStateFromError: true,
      getDerivedStateFromProps: true,
      mixins: true,
      propTypes: true,
      type: true
    };
    var KNOWN_STATICS = {
      name: true,
      length: true,
      prototype: true,
      caller: true,
      callee: true,
      arguments: true,
      arity: true
    };
    var FORWARD_REF_STATICS = {
      "$$typeof": true,
      render: true,
      defaultProps: true,
      displayName: true,
      propTypes: true
    };
    var MEMO_STATICS = {
      "$$typeof": true,
      compare: true,
      defaultProps: true,
      displayName: true,
      propTypes: true,
      type: true
    };
    var TYPE_STATICS = {};
    TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
    TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;
    function getStatics(component) {
      if (reactIs.isMemo(component)) {
        return MEMO_STATICS;
      }
      return TYPE_STATICS[component["$$typeof"]] || REACT_STATICS;
    }
    var defineProperty = Object.defineProperty;
    var getOwnPropertyNames = Object.getOwnPropertyNames;
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    var getPrototypeOf = Object.getPrototypeOf;
    var objectPrototype = Object.prototype;
    function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
      if (typeof sourceComponent !== "string") {
        if (objectPrototype) {
          var inheritedComponent = getPrototypeOf(sourceComponent);
          if (inheritedComponent && inheritedComponent !== objectPrototype) {
            hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
          }
        }
        var keys = getOwnPropertyNames(sourceComponent);
        if (getOwnPropertySymbols) {
          keys = keys.concat(getOwnPropertySymbols(sourceComponent));
        }
        var targetStatics = getStatics(targetComponent);
        var sourceStatics = getStatics(sourceComponent);
        for (var i = 0; i < keys.length; ++i) {
          var key = keys[i];
          if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
            var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
            try {
              defineProperty(targetComponent, key, descriptor);
            } catch (e) {
            }
          }
        }
      }
      return targetComponent;
    }
    module.exports = hoistNonReactStatics;
  }
});

// node_modules/universal-cookie/esm/index.mjs
var cookie = __toESM(require_cookie(), 1);
function hasDocumentCookie() {
  const testingValue = typeof global === "undefined" ? void 0 : global.TEST_HAS_DOCUMENT_COOKIE;
  if (typeof testingValue === "boolean") {
    return testingValue;
  }
  return typeof document === "object" && typeof document.cookie === "string";
}
function parseCookies(cookies) {
  if (typeof cookies === "string") {
    return cookie.parse(cookies);
  } else if (typeof cookies === "object" && cookies !== null) {
    return cookies;
  } else {
    return {};
  }
}
function readCookie(value, options = {}) {
  const cleanValue = cleanupCookieValue(value);
  if (!options.doNotParse) {
    try {
      return JSON.parse(cleanValue);
    } catch (e) {
    }
  }
  return value;
}
function cleanupCookieValue(value) {
  if (value && value[0] === "j" && value[1] === ":") {
    return value.substr(2);
  }
  return value;
}
var Cookies = class {
  constructor(cookies, defaultSetOptions = {}) {
    this.changeListeners = [];
    this.HAS_DOCUMENT_COOKIE = false;
    this.update = () => {
      if (!this.HAS_DOCUMENT_COOKIE) {
        return;
      }
      const previousCookies = this.cookies;
      this.cookies = cookie.parse(document.cookie);
      this._checkChanges(previousCookies);
    };
    const domCookies = typeof document === "undefined" ? "" : document.cookie;
    this.cookies = parseCookies(cookies || domCookies);
    this.defaultSetOptions = defaultSetOptions;
    this.HAS_DOCUMENT_COOKIE = hasDocumentCookie();
  }
  _emitChange(params) {
    for (let i = 0; i < this.changeListeners.length; ++i) {
      this.changeListeners[i](params);
    }
  }
  _checkChanges(previousCookies) {
    const names = new Set(Object.keys(previousCookies).concat(Object.keys(this.cookies)));
    names.forEach((name) => {
      if (previousCookies[name] !== this.cookies[name]) {
        this._emitChange({
          name,
          value: readCookie(this.cookies[name])
        });
      }
    });
  }
  _startPolling() {
    this.pollingInterval = setInterval(this.update, 300);
  }
  _stopPolling() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
    }
  }
  get(name, options = {}) {
    if (!options.doNotUpdate) {
      this.update();
    }
    return readCookie(this.cookies[name], options);
  }
  getAll(options = {}) {
    if (!options.doNotUpdate) {
      this.update();
    }
    const result = {};
    for (let name in this.cookies) {
      result[name] = readCookie(this.cookies[name], options);
    }
    return result;
  }
  set(name, value, options) {
    if (options) {
      options = Object.assign(Object.assign({}, this.defaultSetOptions), options);
    } else {
      options = this.defaultSetOptions;
    }
    const stringValue = typeof value === "string" ? value : JSON.stringify(value);
    this.cookies = Object.assign(Object.assign({}, this.cookies), { [name]: stringValue });
    if (this.HAS_DOCUMENT_COOKIE) {
      document.cookie = cookie.serialize(name, stringValue, options);
    }
    this._emitChange({ name, value, options });
  }
  remove(name, options) {
    const finalOptions = options = Object.assign(Object.assign(Object.assign({}, this.defaultSetOptions), options), { expires: new Date(1970, 1, 1, 0, 0, 1), maxAge: 0 });
    this.cookies = Object.assign({}, this.cookies);
    delete this.cookies[name];
    if (this.HAS_DOCUMENT_COOKIE) {
      document.cookie = cookie.serialize(name, "", finalOptions);
    }
    this._emitChange({ name, value: void 0, options });
  }
  addChangeListener(callback) {
    this.changeListeners.push(callback);
    if (this.HAS_DOCUMENT_COOKIE && this.changeListeners.length === 1) {
      if (typeof window === "object" && "cookieStore" in window) {
        window.cookieStore.addEventListener("change", this.update);
      } else {
        this._startPolling();
      }
    }
  }
  removeChangeListener(callback) {
    const idx = this.changeListeners.indexOf(callback);
    if (idx >= 0) {
      this.changeListeners.splice(idx, 1);
    }
    if (this.HAS_DOCUMENT_COOKIE && this.changeListeners.length === 0) {
      if (typeof window === "object" && "cookieStore" in window) {
        window.cookieStore.removeEventListener("change", this.update);
      } else {
        this._stopPolling();
      }
    }
  }
};

// node_modules/react-cookie/esm/index.mjs
var React = __toESM(require_react(), 1);
var import_react = __toESM(require_react(), 1);
var import_hoist_non_react_statics = __toESM(require_hoist_non_react_statics_cjs(), 1);
var CookiesContext = React.createContext(new Cookies());
var { Provider, Consumer } = CookiesContext;
var CookiesProvider = class extends React.Component {
  constructor(props) {
    super(props);
    if (props.cookies) {
      this.cookies = props.cookies;
    } else {
      this.cookies = new Cookies(void 0, props.defaultSetOptions);
    }
  }
  render() {
    return React.createElement(Provider, { value: this.cookies }, this.props.children);
  }
};
function __rest(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
}
function withCookies(WrappedComponent) {
  const name = WrappedComponent.displayName || WrappedComponent.name;
  class CookieWrapper extends React.Component {
    constructor() {
      super(...arguments);
      this.onChange = () => {
        this.forceUpdate();
      };
    }
    listen() {
      this.props.cookies.addChangeListener(this.onChange);
    }
    unlisten(cookies) {
      (cookies || this.props.cookies).removeChangeListener(this.onChange);
    }
    componentDidMount() {
      this.listen();
    }
    componentDidUpdate(prevProps) {
      if (prevProps.cookies !== this.props.cookies) {
        this.unlisten(prevProps.cookies);
        this.listen();
      }
    }
    componentWillUnmount() {
      this.unlisten();
    }
    render() {
      const _a = this.props, { forwardedRef, cookies } = _a, restProps = __rest(_a, ["forwardedRef", "cookies"]);
      const allCookies = cookies.getAll();
      return React.createElement(WrappedComponent, Object.assign({}, restProps, { ref: forwardedRef, cookies, allCookies }));
    }
  }
  CookieWrapper.displayName = `withCookies(${name})`;
  CookieWrapper.WrappedComponent = WrappedComponent;
  const ForwardedComponent = React.forwardRef((props, ref) => {
    return React.createElement(Consumer, null, (cookies) => React.createElement(CookieWrapper, Object.assign({ cookies }, props, { forwardedRef: ref })));
  });
  ForwardedComponent.displayName = CookieWrapper.displayName;
  ForwardedComponent.WrappedComponent = CookieWrapper.WrappedComponent;
  return (0, import_hoist_non_react_statics.default)(ForwardedComponent, WrappedComponent);
}
function isInBrowser() {
  return typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
}
function useCookies(dependencies) {
  const cookies = (0, import_react.useContext)(CookiesContext);
  if (!cookies) {
    throw new Error("Missing <CookiesProvider>");
  }
  const [allCookies, setCookies] = (0, import_react.useState)(() => cookies.getAll());
  if (isInBrowser()) {
    (0, import_react.useLayoutEffect)(() => {
      function onChange() {
        const newCookies = cookies.getAll({
          doNotUpdate: true
        });
        if (shouldUpdate(dependencies || null, newCookies, allCookies)) {
          setCookies(newCookies);
        }
      }
      cookies.addChangeListener(onChange);
      return () => {
        cookies.removeChangeListener(onChange);
      };
    }, [cookies, allCookies]);
  }
  const setCookie = (0, import_react.useMemo)(() => cookies.set.bind(cookies), [cookies]);
  const removeCookie = (0, import_react.useMemo)(() => cookies.remove.bind(cookies), [cookies]);
  const updateCookies = (0, import_react.useMemo)(() => cookies.update.bind(cookies), [cookies]);
  return [allCookies, setCookie, removeCookie, updateCookies];
}
function shouldUpdate(dependencies, newCookies, oldCookies) {
  if (!dependencies) {
    return true;
  }
  for (let dependency of dependencies) {
    if (newCookies[dependency] !== oldCookies[dependency]) {
      return true;
    }
  }
  return false;
}
export {
  Cookies,
  CookiesProvider,
  useCookies,
  withCookies
};
/*! Bundled license information:

cookie/index.js:
  (*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)
*/
//# sourceMappingURL=react-cookie.js.map
