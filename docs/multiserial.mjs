var img$1 = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='600' height='372' viewBox='0 0 600 372'%3e%3crect width='600' height='372' fill='%23E9EDF1'/%3e%3cg fill='none' stroke='%235C6E80' stroke-width='6' stroke-linecap='round'%3e%3cpath d='M150 66 C260 66 260 166 370 166'/%3e%3cpath d='M150 146 C260 146 260 176 370 176'/%3e%3cpath d='M150 226 C260 226 260 196 370 196'/%3e%3cpath d='M150 306 C260 306 260 206 370 206'/%3e%3c/g%3e%3cg fill='%235C6E80' stroke='%23455360' stroke-width='4'%3e%3crect x='60' y='40' width='90' height='52' rx='8'/%3e%3crect x='60' y='120' width='90' height='52' rx='8'/%3e%3crect x='60' y='200' width='90' height='52' rx='8'/%3e%3crect x='60' y='280' width='90' height='52' rx='8'/%3e%3crect x='370' y='116' width='170' height='130' rx='12'/%3e%3c/g%3e%3cg fill='white' font-family='sans-serif' font-size='30' font-weight='bold' text-anchor='middle'%3e%3ctext x='105' y='77'%3e1%3c/text%3e%3ctext x='105' y='157'%3e2%3c/text%3e%3ctext x='105' y='237'%3e3%3c/text%3e%3ctext x='105' y='317'%3e4%3c/text%3e%3c/g%3e%3crect x='390' y='136' width='130' height='80' rx='6' fill='%23E9EDF1'/%3e%3crect x='430' y='246' width='50' height='20' fill='%23455360'/%3e%3crect x='400' y='266' width='110' height='14' rx='7' fill='%23455360'/%3e%3c/svg%3e";

var img = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 40 40'%3e%3ccircle cx='20' cy='20' r='19' fill='%235C6E80' stroke='%23455360' stroke-width='2'/%3e%3cg transform='translate(6 6) scale(0.7)'%3e%3cg fill='none' stroke='white' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3e%3crect x='4' y='5' width='10' height='7' rx='1.5'/%3e%3crect x='4' y='16.5' width='10' height='7' rx='1.5'/%3e%3crect x='4' y='28' width='10' height='7' rx='1.5'/%3e%3cpath d='M14 8.5 C19 8.5 19 17 24 17'/%3e%3cpath d='M14 20 L24 20'/%3e%3cpath d='M14 31.5 C19 31.5 19 23 24 23'/%3e%3crect x='24' y='13' width='12' height='14' rx='2'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e";

var en = {
	"multiSerial.entry.name": "Multi Serial Connection",
	"multiSerial.entry.description": "Receive data from several serial ports at once. Chrome, Edge or Firefox is required."
};
var ja = {
	"multiSerial.entry.name": "マルチシリアル接続",
	"multiSerial.entry.description": "いくつものシリアルポートから同時にデータを受け取ります。Chrome・Edge・Firefox のどれかが必要です。"
};
var translations = {
	en: en,
	ja: ja,
	"ja-Hira": {
	"multiSerial.entry.name": "マルチシリアルせつぞく",
	"multiSerial.entry.description": "いくつもの シリアルポートから どうじに データを うけとります。Chrome・Edge・Firefox の どれかが ひつようです。"
}
};

var version$1 = "0.3.0";

/**
 * Xcratch の拡張機能一覧に出す情報。
 *
 * 作りは scratch3-uiapduino の xcratch/src/gui/lib/libraries/extensions/entry/createEntry.js と同じ。
 * Xcratch は読み込み時に setFormatMessage で自分の formatMessage を渡してくるので、
 * 名前と説明は getter にして、そのときの言語で返す。
 *
 * デスクトップ版の scratch-gui/src/lib/libraries/extensions/index.jsx に相当する。
 * 向こうは React 要素 (FormattedMessage) を返すが、こちらは文字列で作る。
 *
 * 絵は仮のもの (docs/xcratch-multi-serial-blocks-spec.md の「9. ファイル構成」)。
 * デスクトップ版と同じ scratch-gui/src/lib/libraries/extensions/multiserial/ のものを直接参照している。
 * rollup の image プラグインが data URI に変換して .mjs に埋め込むので、複製は要らない。
 */

var version = "v".concat(version$1);

/**
 * 訳文を引く関数。読み込み時に Xcratch のものへ差し替わる。
 * 差し替わるまでは defaultMessage をそのまま返す。
 * @param {object} messageData - format-message へ渡す形
 * @returns {string} 現在の言語の文字列
 */
var formatMessage$2 = function formatMessage(messageData) {
  return messageData.defaultMessage;
};
var entry = {
  get name() {
    return formatMessage$2({
      id: 'multiSerial.entry.name',
      defaultMessage: 'Multi Serial Connection',
      description: 'name of the extension'
    });
  },
  // ⚠ scratch-vm/src/extensions/scratch3_multiserial/index.js の EXTENSION_ID と同じ値。
  //   作品に書き込まれるので、公開したら二度と変えられない。
  extensionId: 'multiSerial',
  // ⚠ 同じく EXTENSION_URL と同じ値。公開したら二度と変えられない。
  extensionURL: 'https://tarosay.github.io/xcratch-multi-serial/multiserial.mjs',
  collaborator: 'tarosay',
  iconURL: img$1,
  insetIconURL: img,
  get description() {
    // 対応ブラウザを書いておくのは、Safari などでも拡張は追加できてブロックも並び、
    // 開始のときに初めて使えないと分かるため (お手本の createEntry.js と同じ理由)。
    return "".concat(formatMessage$2({
      id: 'multiSerial.entry.description',
      defaultMessage: 'Receive data from several serial ports at once. Chrome, Edge or Firefox is required.',
      description: 'description of the extension'
    }), " (").concat(version, ")");
  },
  tags: ['hardware', 'serial'],
  featured: true,
  disabled: false,
  bluetoothRequired: false,
  internetConnectionRequired: false,
  // 接続モーダルは使わない。開始はブロックだけで行う
  // (仕様書の「ステータスボタン『！』と接続モーダルは使わない」)。
  launchPeripheralConnectionFlow: false,
  useAutoScan: false,
  helpLink: 'https://github.com/tarosay/xcratch-multi-serial#readme',
  setFormatMessage: function setFormatMessage(formatter) {
    formatMessage$2 = formatter;
  },
  translationMap: translations
};

function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value;
  } catch (n) {
    return void e(n);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments;
    return new Promise(function (r, o) {
      var a = n.apply(t, e);
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
      }
      _next(void 0);
    });
  };
}

function _classCallCheck$1(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}

function _typeof$1(o) {
  "@babel/helpers - typeof";

  return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof$1(o);
}

function toPrimitive(t, e) {
  if ("object" != _typeof$1(t) || !t) return t;
  var r;
  if ("undefined" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) {
    var i = r.call(t, e);
    if ("object" != _typeof$1(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (String )(t);
}

function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof$1(i) ? i : i + "";
}

function _defineProperties$1(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, toPropertyKey(o.key), o);
  }
}
function _createClass$1(e, r, t) {
  return r && _defineProperties$1(e.prototype, r), t && _defineProperties$1(e, t), Object.defineProperty(e, "prototype", {
    writable: false
  }), e;
}

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var regeneratorRuntime$1 = {exports: {}};

var OverloadYield = {exports: {}};

var hasRequiredOverloadYield;

function requireOverloadYield () {
	if (hasRequiredOverloadYield) return OverloadYield.exports;
	hasRequiredOverloadYield = 1;
	(function (module) {
		function _OverloadYield(e, d) {
		  this.v = e, this.k = d;
		}
		module.exports = _OverloadYield, module.exports.__esModule = true, module.exports["default"] = module.exports; 
	} (OverloadYield));
	return OverloadYield.exports;
}

var regenerator$1 = {exports: {}};

var regeneratorDefine = {exports: {}};

var hasRequiredRegeneratorDefine;

function requireRegeneratorDefine () {
	if (hasRequiredRegeneratorDefine) return regeneratorDefine.exports;
	hasRequiredRegeneratorDefine = 1;
	(function (module) {
		function _regeneratorDefine(e, r, n, t) {
		  var i = Object.defineProperty;
		  try {
		    i({}, "", {});
		  } catch (e) {
		    i = 0;
		  }
		  module.exports = _regeneratorDefine = function regeneratorDefine(e, r, n, t) {
		    function o(r, n) {
		      _regeneratorDefine(e, r, function (e) {
		        return this._invoke(r, n, e);
		      });
		    }
		    r ? i ? i(e, r, {
		      value: n,
		      enumerable: !t,
		      configurable: !t,
		      writable: !t
		    }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2));
		  }, module.exports.__esModule = true, module.exports["default"] = module.exports, _regeneratorDefine(e, r, n, t);
		}
		module.exports = _regeneratorDefine, module.exports.__esModule = true, module.exports["default"] = module.exports; 
	} (regeneratorDefine));
	return regeneratorDefine.exports;
}

var hasRequiredRegenerator$1;

function requireRegenerator$1 () {
	if (hasRequiredRegenerator$1) return regenerator$1.exports;
	hasRequiredRegenerator$1 = 1;
	(function (module) {
		var regeneratorDefine = requireRegeneratorDefine();
		function _regenerator() {
		  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
		  var e,
		    t,
		    r = "function" == typeof Symbol ? Symbol : {},
		    n = r.iterator || "@@iterator",
		    o = r.toStringTag || "@@toStringTag";
		  function i(r, n, o, i) {
		    var c = n && n.prototype instanceof Generator ? n : Generator,
		      u = Object.create(c.prototype);
		    return regeneratorDefine(u, "_invoke", function (r, n, o) {
		      var i,
		        c,
		        u,
		        f = 0,
		        p = o || [],
		        y = false,
		        G = {
		          p: 0,
		          n: 0,
		          v: e,
		          a: d,
		          f: d.bind(e, 4),
		          d: function d(t, r) {
		            return i = t, c = 0, u = e, G.n = r, a;
		          }
		        };
		      function d(r, n) {
		        for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) {
		          var o,
		            i = p[t],
		            d = G.p,
		            l = i[2];
		          r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0));
		        }
		        if (o || r > 1) return a;
		        throw y = true, n;
		      }
		      return function (o, p, l) {
		        if (f > 1) throw TypeError("Generator is already running");
		        for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) {
		          i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u);
		          try {
		            if (f = 2, i) {
		              if (c || (o = "next"), t = i[o]) {
		                if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object");
		                if (!t.done) return t;
		                u = t.value, c < 2 && (c = 0);
		              } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1);
		              i = e;
		            } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break;
		          } catch (t) {
		            i = e, c = 1, u = t;
		          } finally {
		            f = 1;
		          }
		        }
		        return {
		          value: t,
		          done: y
		        };
		      };
		    }(r, o, i), true), u;
		  }
		  var a = {};
		  function Generator() {}
		  function GeneratorFunction() {}
		  function GeneratorFunctionPrototype() {}
		  t = Object.getPrototypeOf;
		  var c = [][n] ? t(t([][n]())) : (regeneratorDefine(t = {}, n, function () {
		      return this;
		    }), t),
		    u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c);
		  function f(e) {
		    return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, regeneratorDefine(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e;
		  }
		  return GeneratorFunction.prototype = GeneratorFunctionPrototype, regeneratorDefine(u, "constructor", GeneratorFunctionPrototype), regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", regeneratorDefine(GeneratorFunctionPrototype, o, "GeneratorFunction"), regeneratorDefine(u), regeneratorDefine(u, o, "Generator"), regeneratorDefine(u, n, function () {
		    return this;
		  }), regeneratorDefine(u, "toString", function () {
		    return "[object Generator]";
		  }), (module.exports = _regenerator = function _regenerator() {
		    return {
		      w: i,
		      m: f
		    };
		  }, module.exports.__esModule = true, module.exports["default"] = module.exports)();
		}
		module.exports = _regenerator, module.exports.__esModule = true, module.exports["default"] = module.exports; 
	} (regenerator$1));
	return regenerator$1.exports;
}

var regeneratorAsync = {exports: {}};

var regeneratorAsyncGen = {exports: {}};

var regeneratorAsyncIterator = {exports: {}};

var hasRequiredRegeneratorAsyncIterator;

function requireRegeneratorAsyncIterator () {
	if (hasRequiredRegeneratorAsyncIterator) return regeneratorAsyncIterator.exports;
	hasRequiredRegeneratorAsyncIterator = 1;
	(function (module) {
		var OverloadYield = requireOverloadYield();
		var regeneratorDefine = requireRegeneratorDefine();
		function AsyncIterator(t, e) {
		  function n(r, o, i, f) {
		    try {
		      var c = t[r](o),
		        u = c.value;
		      return u instanceof OverloadYield ? e.resolve(u.v).then(function (t) {
		        n("next", t, i, f);
		      }, function (t) {
		        n("throw", t, i, f);
		      }) : e.resolve(u).then(function (t) {
		        c.value = t, i(c);
		      }, function (t) {
		        return n("throw", t, i, f);
		      });
		    } catch (t) {
		      f(t);
		    }
		  }
		  var r;
		  this.next || (regeneratorDefine(AsyncIterator.prototype), regeneratorDefine(AsyncIterator.prototype, "function" == typeof Symbol && Symbol.asyncIterator || "@asyncIterator", function () {
		    return this;
		  })), regeneratorDefine(this, "_invoke", function (t, o, i) {
		    function f() {
		      return new e(function (e, r) {
		        n(t, i, e, r);
		      });
		    }
		    return r = r ? r.then(f, f) : f();
		  }, true);
		}
		module.exports = AsyncIterator, module.exports.__esModule = true, module.exports["default"] = module.exports; 
	} (regeneratorAsyncIterator));
	return regeneratorAsyncIterator.exports;
}

var hasRequiredRegeneratorAsyncGen;

function requireRegeneratorAsyncGen () {
	if (hasRequiredRegeneratorAsyncGen) return regeneratorAsyncGen.exports;
	hasRequiredRegeneratorAsyncGen = 1;
	(function (module) {
		var regenerator = requireRegenerator$1();
		var regeneratorAsyncIterator = requireRegeneratorAsyncIterator();
		function _regeneratorAsyncGen(r, e, t, o, n) {
		  return new regeneratorAsyncIterator(regenerator().w(r, e, t, o), n || Promise);
		}
		module.exports = _regeneratorAsyncGen, module.exports.__esModule = true, module.exports["default"] = module.exports; 
	} (regeneratorAsyncGen));
	return regeneratorAsyncGen.exports;
}

var hasRequiredRegeneratorAsync;

function requireRegeneratorAsync () {
	if (hasRequiredRegeneratorAsync) return regeneratorAsync.exports;
	hasRequiredRegeneratorAsync = 1;
	(function (module) {
		var regeneratorAsyncGen = requireRegeneratorAsyncGen();
		function _regeneratorAsync(n, e, r, t, o) {
		  var a = regeneratorAsyncGen(n, e, r, t, o);
		  return a.next().then(function (n) {
		    return n.done ? n.value : a.next();
		  });
		}
		module.exports = _regeneratorAsync, module.exports.__esModule = true, module.exports["default"] = module.exports; 
	} (regeneratorAsync));
	return regeneratorAsync.exports;
}

var regeneratorKeys = {exports: {}};

var hasRequiredRegeneratorKeys;

function requireRegeneratorKeys () {
	if (hasRequiredRegeneratorKeys) return regeneratorKeys.exports;
	hasRequiredRegeneratorKeys = 1;
	(function (module) {
		function _regeneratorKeys(e) {
		  var n = Object(e),
		    r = [];
		  for (var t in n) r.unshift(t);
		  return function e() {
		    for (; r.length;) if ((t = r.pop()) in n) return e.value = t, e.done = false, e;
		    return e.done = true, e;
		  };
		}
		module.exports = _regeneratorKeys, module.exports.__esModule = true, module.exports["default"] = module.exports; 
	} (regeneratorKeys));
	return regeneratorKeys.exports;
}

var regeneratorValues = {exports: {}};

var _typeof = {exports: {}};

var hasRequired_typeof;

function require_typeof () {
	if (hasRequired_typeof) return _typeof.exports;
	hasRequired_typeof = 1;
	(function (module) {
		function _typeof(o) {
		  "@babel/helpers - typeof";

		  return module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
		    return typeof o;
		  } : function (o) {
		    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
		  }, module.exports.__esModule = true, module.exports["default"] = module.exports, _typeof(o);
		}
		module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports; 
	} (_typeof));
	return _typeof.exports;
}

var hasRequiredRegeneratorValues;

function requireRegeneratorValues () {
	if (hasRequiredRegeneratorValues) return regeneratorValues.exports;
	hasRequiredRegeneratorValues = 1;
	(function (module) {
		var _typeof = require_typeof()["default"];
		function _regeneratorValues(e) {
		  if (null != e) {
		    var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"],
		      r = 0;
		    if (t) return t.call(e);
		    if ("function" == typeof e.next) return e;
		    if (!isNaN(e.length)) return {
		      next: function next() {
		        return e && r >= e.length && (e = void 0), {
		          value: e && e[r++],
		          done: !e
		        };
		      }
		    };
		  }
		  throw new TypeError(_typeof(e) + " is not iterable");
		}
		module.exports = _regeneratorValues, module.exports.__esModule = true, module.exports["default"] = module.exports; 
	} (regeneratorValues));
	return regeneratorValues.exports;
}

var hasRequiredRegeneratorRuntime;

function requireRegeneratorRuntime () {
	if (hasRequiredRegeneratorRuntime) return regeneratorRuntime$1.exports;
	hasRequiredRegeneratorRuntime = 1;
	(function (module) {
		var OverloadYield = requireOverloadYield();
		var regenerator = requireRegenerator$1();
		var regeneratorAsync = requireRegeneratorAsync();
		var regeneratorAsyncGen = requireRegeneratorAsyncGen();
		var regeneratorAsyncIterator = requireRegeneratorAsyncIterator();
		var regeneratorKeys = requireRegeneratorKeys();
		var regeneratorValues = requireRegeneratorValues();
		function _regeneratorRuntime() {

		  var r = regenerator(),
		    e = r.m(_regeneratorRuntime),
		    t = (Object.getPrototypeOf ? Object.getPrototypeOf(e) : e.__proto__).constructor;
		  function n(r) {
		    var e = "function" == typeof r && r.constructor;
		    return !!e && (e === t || "GeneratorFunction" === (e.displayName || e.name));
		  }
		  var o = {
		    "throw": 1,
		    "return": 2,
		    "break": 3,
		    "continue": 3
		  };
		  function a(r) {
		    var e, t;
		    return function (n) {
		      e || (e = {
		        stop: function stop() {
		          return t(n.a, 2);
		        },
		        "catch": function _catch() {
		          return n.v;
		        },
		        abrupt: function abrupt(r, e) {
		          return t(n.a, o[r], e);
		        },
		        delegateYield: function delegateYield(r, o, a) {
		          return e.resultName = o, t(n.d, regeneratorValues(r), a);
		        },
		        finish: function finish(r) {
		          return t(n.f, r);
		        }
		      }, t = function t(r, _t, o) {
		        n.p = e.prev, n.n = e.next;
		        try {
		          return r(_t, o);
		        } finally {
		          e.next = n.n;
		        }
		      }), e.resultName && (e[e.resultName] = n.v, e.resultName = void 0), e.sent = n.v, e.next = n.n;
		      try {
		        return r.call(this, e);
		      } finally {
		        n.p = e.prev, n.n = e.next;
		      }
		    };
		  }
		  return (module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
		    return {
		      wrap: function wrap(e, t, n, o) {
		        return r.w(a(e), t, n, o && o.reverse());
		      },
		      isGeneratorFunction: n,
		      mark: r.m,
		      awrap: function awrap(r, e) {
		        return new OverloadYield(r, e);
		      },
		      AsyncIterator: regeneratorAsyncIterator,
		      async: function async(r, e, t, o, u) {
		        return (n(e) ? regeneratorAsyncGen : regeneratorAsync)(a(r), e, t, o, u);
		      },
		      keys: regeneratorKeys,
		      values: regeneratorValues
		    };
		  }, module.exports.__esModule = true, module.exports["default"] = module.exports)();
		}
		module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports; 
	} (regeneratorRuntime$1));
	return regeneratorRuntime$1.exports;
}

var regenerator;
var hasRequiredRegenerator;

function requireRegenerator () {
	if (hasRequiredRegenerator) return regenerator;
	hasRequiredRegenerator = 1;
	// TODO(Babel 8): Remove this file.

	var runtime = requireRegeneratorRuntime()();
	regenerator = runtime;

	// Copied from https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js#L736=
	try {
	  regeneratorRuntime = runtime;
	} catch (accidentalStrictMode) {
	  if (typeof globalThis === "object") {
	    globalThis.regeneratorRuntime = runtime;
	  } else {
	    Function("r", "regeneratorRuntime = r")(runtime);
	  }
	}
	return regenerator;
}

var regeneratorExports = requireRegenerator();
var _regeneratorRuntime = /*@__PURE__*/getDefaultExportFromCjs(regeneratorExports);

/**
 * Block argument types
 * @enum {string}
 */
var argumentType;
var hasRequiredArgumentType;
function requireArgumentType() {
  if (hasRequiredArgumentType) return argumentType;
  hasRequiredArgumentType = 1;
  var ArgumentType = {
    /**
     * Numeric value with angle picker
     */
    ANGLE: 'angle',
    /**
     * Boolean value with hexagonal placeholder
     */
    BOOLEAN: 'Boolean',
    /**
     * Numeric value with color picker
     */
    COLOR: 'color',
    /**
     * Numeric value with text field
     */
    NUMBER: 'number',
    /**
     * String value with text field
     */
    STRING: 'string',
    /**
     * String value with matrix field
     */
    MATRIX: 'matrix',
    /**
     * MIDI note number with note picker (piano) field
     */
    NOTE: 'note',
    /**
     * Inline image on block (as part of the label)
     */
    IMAGE: 'image'
  };
  argumentType = ArgumentType;
  return argumentType;
}

var argumentTypeExports = requireArgumentType();
var ArgumentType = /*@__PURE__*/getDefaultExportFromCjs(argumentTypeExports);

/**
 * Types of block
 * @enum {string}
 */
var blockType;
var hasRequiredBlockType;
function requireBlockType() {
  if (hasRequiredBlockType) return blockType;
  hasRequiredBlockType = 1;
  var BlockType = {
    /**
     * Boolean reporter with hexagonal shape
     */
    BOOLEAN: 'Boolean',
    /**
     * A button (not an actual block) for some special action, like making a variable
     */
    BUTTON: 'button',
    /**
     * Command block
     */
    COMMAND: 'command',
    /**
     * Specialized command block which may or may not run a child branch
     * The thread continues with the next block whether or not a child branch ran.
     */
    CONDITIONAL: 'conditional',
    /**
     * Specialized hat block with no implementation function
     * This stack only runs if the corresponding event is emitted by other code.
     */
    EVENT: 'event',
    /**
     * Hat block which conditionally starts a block stack
     */
    HAT: 'hat',
    /**
     * Specialized command block which may or may not run a child branch
     * If a child branch runs, the thread evaluates the loop block again.
     */
    LOOP: 'loop',
    /**
     * General reporter with numeric or string value
     */
    REPORTER: 'reporter'
  };
  blockType = BlockType;
  return blockType;
}

var blockTypeExports = requireBlockType();
var BlockType = /*@__PURE__*/getDefaultExportFromCjs(blockTypeExports);

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var color;
var hasRequiredColor;
function requireColor() {
  if (hasRequiredColor) return color;
  hasRequiredColor = 1;
  var Color = /*#__PURE__*/function () {
    function Color() {
      _classCallCheck(this, Color);
    }
    return _createClass(Color, null, [{
      key: "RGB_BLACK",
      get:
      /**
       * @typedef {object} RGBObject - An object representing a color in RGB format.
       * @property {number} r - the red component, in the range [0, 255].
       * @property {number} g - the green component, in the range [0, 255].
       * @property {number} b - the blue component, in the range [0, 255].
       */

      /**
       * @typedef {object} HSVObject - An object representing a color in HSV format.
       * @property {number} h - hue, in the range [0-359).
       * @property {number} s - saturation, in the range [0,1].
       * @property {number} v - value, in the range [0,1].
       */

      /** @type {RGBObject} */
      function get() {
        return {
          r: 0,
          g: 0,
          b: 0
        };
      }

      /** @type {RGBObject} */
    }, {
      key: "RGB_WHITE",
      get: function get() {
        return {
          r: 255,
          g: 255,
          b: 255
        };
      }

      /**
       * Convert a Scratch decimal color to a hex string, #RRGGBB.
       * @param {number} decimal RGB color as a decimal.
       * @return {string} RGB color as #RRGGBB hex string.
       */
    }, {
      key: "decimalToHex",
      value: function decimalToHex(decimal) {
        if (decimal < 0) {
          decimal += 0xFFFFFF + 1;
        }
        var hex = Number(decimal).toString(16);
        hex = "#".concat('000000'.substr(0, 6 - hex.length)).concat(hex);
        return hex;
      }

      /**
       * Convert a Scratch decimal color to an RGB color object.
       * @param {number} decimal RGB color as decimal.
       * @return {RGBObject} rgb - {r: red [0,255], g: green [0,255], b: blue [0,255]}.
       */
    }, {
      key: "decimalToRgb",
      value: function decimalToRgb(decimal) {
        var a = decimal >> 24 & 0xFF;
        var r = decimal >> 16 & 0xFF;
        var g = decimal >> 8 & 0xFF;
        var b = decimal & 0xFF;
        return {
          r: r,
          g: g,
          b: b,
          a: a > 0 ? a : 255
        };
      }

      /**
       * Convert a hex color (e.g., F00, #03F, #0033FF) to an RGB color object.
       * CC-BY-SA Tim Down:
       * https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
       * @param {!string} hex Hex representation of the color.
       * @return {RGBObject} null on failure, or rgb: {r: red [0,255], g: green [0,255], b: blue [0,255]}.
       */
    }, {
      key: "hexToRgb",
      value: function hexToRgb(hex) {
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function (m, r, g, b) {
          return r + r + g + g + b + b;
        });
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : null;
      }

      /**
       * Convert an RGB color object to a hex color.
       * @param {RGBObject} rgb - {r: red [0,255], g: green [0,255], b: blue [0,255]}.
       * @return {!string} Hex representation of the color.
       */
    }, {
      key: "rgbToHex",
      value: function rgbToHex(rgb) {
        return Color.decimalToHex(Color.rgbToDecimal(rgb));
      }

      /**
       * Convert an RGB color object to a Scratch decimal color.
       * @param {RGBObject} rgb - {r: red [0,255], g: green [0,255], b: blue [0,255]}.
       * @return {!number} Number representing the color.
       */
    }, {
      key: "rgbToDecimal",
      value: function rgbToDecimal(rgb) {
        return (rgb.r << 16) + (rgb.g << 8) + rgb.b;
      }

      /**
      * Convert a hex color (e.g., F00, #03F, #0033FF) to a decimal color number.
      * @param {!string} hex Hex representation of the color.
      * @return {!number} Number representing the color.
      */
    }, {
      key: "hexToDecimal",
      value: function hexToDecimal(hex) {
        return Color.rgbToDecimal(Color.hexToRgb(hex));
      }

      /**
       * Convert an HSV color to RGB format.
       * @param {HSVObject} hsv - {h: hue [0,360), s: saturation [0,1], v: value [0,1]}
       * @return {RGBObject} rgb - {r: red [0,255], g: green [0,255], b: blue [0,255]}.
       */
    }, {
      key: "hsvToRgb",
      value: function hsvToRgb(hsv) {
        var h = hsv.h % 360;
        if (h < 0) h += 360;
        var s = Math.max(0, Math.min(hsv.s, 1));
        var v = Math.max(0, Math.min(hsv.v, 1));
        var i = Math.floor(h / 60);
        var f = h / 60 - i;
        var p = v * (1 - s);
        var q = v * (1 - s * f);
        var t = v * (1 - s * (1 - f));
        var r;
        var g;
        var b;
        switch (i) {
          default:
          case 0:
            r = v;
            g = t;
            b = p;
            break;
          case 1:
            r = q;
            g = v;
            b = p;
            break;
          case 2:
            r = p;
            g = v;
            b = t;
            break;
          case 3:
            r = p;
            g = q;
            b = v;
            break;
          case 4:
            r = t;
            g = p;
            b = v;
            break;
          case 5:
            r = v;
            g = p;
            b = q;
            break;
        }
        return {
          r: Math.floor(r * 255),
          g: Math.floor(g * 255),
          b: Math.floor(b * 255)
        };
      }

      /**
       * Convert an RGB color to HSV format.
       * @param {RGBObject} rgb - {r: red [0,255], g: green [0,255], b: blue [0,255]}.
       * @return {HSVObject} hsv - {h: hue [0,360), s: saturation [0,1], v: value [0,1]}
       */
    }, {
      key: "rgbToHsv",
      value: function rgbToHsv(rgb) {
        var r = rgb.r / 255;
        var g = rgb.g / 255;
        var b = rgb.b / 255;
        var x = Math.min(Math.min(r, g), b);
        var v = Math.max(Math.max(r, g), b);

        // For grays, hue will be arbitrarily reported as zero. Otherwise, calculate
        var h = 0;
        var s = 0;
        if (x !== v) {
          var f = r === x ? g - b : g === x ? b - r : r - g;
          var i = r === x ? 3 : g === x ? 5 : 1;
          h = (i - f / (v - x)) * 60 % 360;
          s = (v - x) / v;
        }
        return {
          h: h,
          s: s,
          v: v
        };
      }

      /**
       * Linear interpolation between rgb0 and rgb1.
       * @param {RGBObject} rgb0 - the color corresponding to fraction1 <= 0.
       * @param {RGBObject} rgb1 - the color corresponding to fraction1 >= 1.
       * @param {number} fraction1 - the interpolation parameter. If this is 0.5, for example, mix the two colors equally.
       * @return {RGBObject} the interpolated color.
       */
    }, {
      key: "mixRgb",
      value: function mixRgb(rgb0, rgb1, fraction1) {
        if (fraction1 <= 0) return rgb0;
        if (fraction1 >= 1) return rgb1;
        var fraction0 = 1 - fraction1;
        return {
          r: fraction0 * rgb0.r + fraction1 * rgb1.r,
          g: fraction0 * rgb0.g + fraction1 * rgb1.g,
          b: fraction0 * rgb0.b + fraction1 * rgb1.b
        };
      }
    }]);
  }();
  color = Color;
  return color;
}

var cast;
var hasRequiredCast;
function requireCast() {
  if (hasRequiredCast) return cast;
  hasRequiredCast = 1;
  var Color = requireColor();

  /**
   * @fileoverview
   * Utilities for casting and comparing Scratch data-types.
   * Scratch behaves slightly differently from JavaScript in many respects,
   * and these differences should be encapsulated below.
   * For example, in Scratch, add(1, join("hello", world")) -> 1.
   * This is because "hello world" is cast to 0.
   * In JavaScript, 1 + Number("hello" + "world") would give you NaN.
   * Use when coercing a value before computation.
   */
  var Cast = /*#__PURE__*/function () {
    function Cast() {
      _classCallCheck(this, Cast);
    }
    return _createClass(Cast, null, [{
      key: "toNumber",
      value:
      /**
       * Scratch cast to number.
       * Treats NaN as 0.
       * In Scratch 2.0, this is captured by `interp.numArg.`
       * @param {*} value Value to cast to number.
       * @return {number} The Scratch-casted number value.
       */
      function toNumber(value) {
        // If value is already a number we don't need to coerce it with
        // Number().
        if (typeof value === 'number') {
          // Scratch treats NaN as 0, when needed as a number.
          // E.g., 0 + NaN -> 0.
          if (Number.isNaN(value)) {
            return 0;
          }
          return value;
        }
        var n = Number(value);
        if (Number.isNaN(n)) {
          // Scratch treats NaN as 0, when needed as a number.
          // E.g., 0 + NaN -> 0.
          return 0;
        }
        return n;
      }

      /**
       * Scratch cast to boolean.
       * In Scratch 2.0, this is captured by `interp.boolArg.`
       * Treats some string values differently from JavaScript.
       * @param {*} value Value to cast to boolean.
       * @return {boolean} The Scratch-casted boolean value.
       */
    }, {
      key: "toBoolean",
      value: function toBoolean(value) {
        // Already a boolean?
        if (typeof value === 'boolean') {
          return value;
        }
        if (typeof value === 'string') {
          // These specific strings are treated as false in Scratch.
          if (value === '' || value === '0' || value.toLowerCase() === 'false') {
            return false;
          }
          // All other strings treated as true.
          return true;
        }
        // Coerce other values and numbers.
        return Boolean(value);
      }

      /**
       * Scratch cast to string.
       * @param {*} value Value to cast to string.
       * @return {string} The Scratch-casted string value.
       */
    }, {
      key: "toString",
      value: function toString(value) {
        return String(value);
      }

      /**
       * Cast any Scratch argument to an RGB color array to be used for the renderer.
       * @param {*} value Value to convert to RGB color array.
       * @return {Array.<number>} [r,g,b], values between 0-255.
       */
    }, {
      key: "toRgbColorList",
      value: function toRgbColorList(value) {
        var color = Cast.toRgbColorObject(value);
        return [color.r, color.g, color.b];
      }

      /**
       * Cast any Scratch argument to an RGB color object to be used for the renderer.
       * @param {*} value Value to convert to RGB color object.
       * @return {RGBOject} [r,g,b], values between 0-255.
       */
    }, {
      key: "toRgbColorObject",
      value: function toRgbColorObject(value) {
        var color;
        if (typeof value === 'string' && value.substring(0, 1) === '#') {
          color = Color.hexToRgb(value);

          // If the color wasn't *actually* a hex color, cast to black
          if (!color) color = {
            r: 0,
            g: 0,
            b: 0,
            a: 255
          };
        } else {
          color = Color.decimalToRgb(Cast.toNumber(value));
        }
        return color;
      }

      /**
       * Determine if a Scratch argument is a white space string (or null / empty).
       * @param {*} val value to check.
       * @return {boolean} True if the argument is all white spaces or null / empty.
       */
    }, {
      key: "isWhiteSpace",
      value: function isWhiteSpace(val) {
        return val === null || typeof val === 'string' && val.trim().length === 0;
      }

      /**
       * Compare two values, using Scratch cast, case-insensitive string compare, etc.
       * In Scratch 2.0, this is captured by `interp.compare.`
       * @param {*} v1 First value to compare.
       * @param {*} v2 Second value to compare.
       * @returns {number} Negative number if v1 < v2; 0 if equal; positive otherwise.
       */
    }, {
      key: "compare",
      value: function compare(v1, v2) {
        var n1 = Number(v1);
        var n2 = Number(v2);
        if (n1 === 0 && Cast.isWhiteSpace(v1)) {
          n1 = NaN;
        } else if (n2 === 0 && Cast.isWhiteSpace(v2)) {
          n2 = NaN;
        }
        if (isNaN(n1) || isNaN(n2)) {
          // At least one argument can't be converted to a number.
          // Scratch compares strings as case insensitive.
          var s1 = String(v1).toLowerCase();
          var s2 = String(v2).toLowerCase();
          if (s1 < s2) {
            return -1;
          } else if (s1 > s2) {
            return 1;
          }
          return 0;
        }
        // Handle the special case of Infinity
        if (n1 === Infinity && n2 === Infinity || n1 === -Infinity && n2 === -Infinity) {
          return 0;
        }
        // Compare as numbers.
        return n1 - n2;
      }

      /**
       * Determine if a Scratch argument number represents a round integer.
       * @param {*} val Value to check.
       * @return {boolean} True if number looks like an integer.
       */
    }, {
      key: "isInt",
      value: function isInt(val) {
        // Values that are already numbers.
        if (typeof val === 'number') {
          if (isNaN(val)) {
            // NaN is considered an integer.
            return true;
          }
          // True if it's "round" (e.g., 2.0 and 2).
          return val === parseInt(val, 10);
        } else if (typeof val === 'boolean') {
          // `True` and `false` always represent integer after Scratch cast.
          return true;
        } else if (typeof val === 'string') {
          // If it contains a decimal point, don't consider it an int.
          return val.indexOf('.') < 0;
        }
        return false;
      }
    }, {
      key: "LIST_INVALID",
      get: function get() {
        return 'INVALID';
      }
    }, {
      key: "LIST_ALL",
      get: function get() {
        return 'ALL';
      }

      /**
       * Compute a 1-based index into a list, based on a Scratch argument.
       * Two special cases may be returned:
       * LIST_ALL: if the block is referring to all of the items in the list.
       * LIST_INVALID: if the index was invalid in any way.
       * @param {*} index Scratch arg, including 1-based numbers or special cases.
       * @param {number} length Length of the list.
       * @param {boolean} acceptAll Whether it should accept "all" or not.
       * @return {(number|string)} 1-based index for list, LIST_ALL, or LIST_INVALID.
       */
    }, {
      key: "toListIndex",
      value: function toListIndex(index, length, acceptAll) {
        if (typeof index !== 'number') {
          if (index === 'all') {
            return acceptAll ? Cast.LIST_ALL : Cast.LIST_INVALID;
          }
          if (index === 'last') {
            if (length > 0) {
              return length;
            }
            return Cast.LIST_INVALID;
          } else if (index === 'random' || index === 'any') {
            if (length > 0) {
              return 1 + Math.floor(Math.random() * length);
            }
            return Cast.LIST_INVALID;
          }
        }
        index = Math.floor(Cast.toNumber(index));
        if (index < 1 || index > length) {
          return Cast.LIST_INVALID;
        }
        return index;
      }
    }]);
  }();
  cast = Cast;
  return cast;
}

var castExports = requireCast();
var Cast = /*@__PURE__*/getDefaultExportFromCjs(castExports);

var formatMessage$1 = {exports: {}};

var formatMessageParse = {exports: {}};

var hasRequiredFormatMessageParse;

function requireFormatMessageParse () {
	if (hasRequiredFormatMessageParse) return formatMessageParse.exports;
	hasRequiredFormatMessageParse = 1;
	(function (module, exports) {

		/*::
		export type AST = Element[]
		export type Element = string | Placeholder
		export type Placeholder = Plural | Styled | Typed | Simple
		export type Plural = [ string, 'plural' | 'selectordinal', number, SubMessages ]
		export type Styled = [ string, string, string | SubMessages ]
		export type Typed = [ string, string ]
		export type Simple = [ string ]
		export type SubMessages = { [string]: AST }
		export type Token = [ TokenType, string ]
		export type TokenType = 'text' | 'space' | 'id' | 'type' | 'style' | 'offset' | 'number' | 'selector' | 'syntax'
		type Context = {|
		  pattern: string,
		  index: number,
		  tagsType: ?string,
		  tokens: ?Token[]
		|}
		*/

		var ARG_OPN = '{';
		var ARG_CLS = '}';
		var ARG_SEP = ',';
		var NUM_ARG = '#';
		var TAG_OPN = '<';
		var TAG_CLS = '>';
		var TAG_END = '</';
		var TAG_SELF_CLS = '/>';
		var ESC = '\'';
		var OFFSET = 'offset:';
		var simpleTypes = [
		  'number',
		  'date',
		  'time',
		  'ordinal',
		  'duration',
		  'spellout'
		];
		var submTypes = [
		  'plural',
		  'select',
		  'selectordinal'
		];

		/**
		 * parse
		 *
		 * Turns this:
		 *  `You have { numBananas, plural,
		 *       =0 {no bananas}
		 *      one {a banana}
		 *    other {# bananas}
		 *  } for sale`
		 *
		 * into this:
		 *  [ "You have ", [ "numBananas", "plural", 0, {
		 *       "=0": [ "no bananas" ],
		 *      "one": [ "a banana" ],
		 *    "other": [ [ '#' ], " bananas" ]
		 *  } ], " for sale." ]
		 *
		 * tokens:
		 *  [
		 *    [ "text", "You have " ],
		 *    [ "syntax", "{" ],
		 *    [ "space", " " ],
		 *    [ "id", "numBananas" ],
		 *    [ "syntax", ", " ],
		 *    [ "space", " " ],
		 *    [ "type", "plural" ],
		 *    [ "syntax", "," ],
		 *    [ "space", "\n     " ],
		 *    [ "selector", "=0" ],
		 *    [ "space", " " ],
		 *    [ "syntax", "{" ],
		 *    [ "text", "no bananas" ],
		 *    [ "syntax", "}" ],
		 *    [ "space", "\n    " ],
		 *    [ "selector", "one" ],
		 *    [ "space", " " ],
		 *    [ "syntax", "{" ],
		 *    [ "text", "a banana" ],
		 *    [ "syntax", "}" ],
		 *    [ "space", "\n  " ],
		 *    [ "selector", "other" ],
		 *    [ "space", " " ],
		 *    [ "syntax", "{" ],
		 *    [ "syntax", "#" ],
		 *    [ "text", " bananas" ],
		 *    [ "syntax", "}" ],
		 *    [ "space", "\n" ],
		 *    [ "syntax", "}" ],
		 *    [ "text", " for sale." ]
		 *  ]
		 **/
		exports = module.exports = function parse (
		  pattern/*: string */,
		  options/*:: ?: { tagsType?: string, tokens?: Token[] } */
		)/*: AST */ {
		  return parseAST({
		    pattern: String(pattern),
		    index: 0,
		    tagsType: (options && options.tagsType) || null,
		    tokens: (options && options.tokens) || null
		  }, '')
		};

		function parseAST (current/*: Context */, parentType/*: string */)/*: AST */ {
		  var pattern = current.pattern;
		  var length = pattern.length;
		  var elements/*: AST */ = [];
		  var start = current.index;
		  var text = parseText(current, parentType);
		  if (text) elements.push(text);
		  if (text && current.tokens) current.tokens.push(['text', pattern.slice(start, current.index)]);
		  while (current.index < length) {
		    if (pattern[current.index] === ARG_CLS) {
		      if (!parentType) throw expected(current)
		      break
		    }
		    if (parentType && current.tagsType && pattern.slice(current.index, current.index + TAG_END.length) === TAG_END) break
		    elements.push(parsePlaceholder(current));
		    start = current.index;
		    text = parseText(current, parentType);
		    if (text) elements.push(text);
		    if (text && current.tokens) current.tokens.push(['text', pattern.slice(start, current.index)]);
		  }
		  return elements
		}

		function parseText (current/*: Context */, parentType/*: string */)/*: string */ {
		  var pattern = current.pattern;
		  var length = pattern.length;
		  var isHashSpecial = (parentType === 'plural' || parentType === 'selectordinal');
		  var isAngleSpecial = !!current.tagsType;
		  var isArgStyle = (parentType === '{style}');
		  var text = '';
		  while (current.index < length) {
		    var char = pattern[current.index];
		    if (
		      char === ARG_OPN || char === ARG_CLS ||
		      (isHashSpecial && char === NUM_ARG) ||
		      (isAngleSpecial && char === TAG_OPN) ||
		      (isArgStyle && isWhitespace(char.charCodeAt(0)))
		    ) {
		      break
		    } else if (char === ESC) {
		      char = pattern[++current.index];
		      if (char === ESC) { // double is always 1 '
		        text += char;
		        ++current.index;
		      } else if (
		        // only when necessary
		        char === ARG_OPN || char === ARG_CLS ||
		        (isHashSpecial && char === NUM_ARG) ||
		        (isAngleSpecial && char === TAG_OPN) ||
		        isArgStyle
		      ) {
		        text += char;
		        while (++current.index < length) {
		          char = pattern[current.index];
		          if (char === ESC && pattern[current.index + 1] === ESC) { // double is always 1 '
		            text += ESC;
		            ++current.index;
		          } else if (char === ESC) { // end of quoted
		            ++current.index;
		            break
		          } else {
		            text += char;
		          }
		        }
		      } else { // lone ' is just a '
		        text += ESC;
		        // already incremented
		      }
		    } else {
		      text += char;
		      ++current.index;
		    }
		  }
		  return text
		}

		function isWhitespace (code/*: number */)/*: boolean */ {
		  return (
		    (code >= 0x09 && code <= 0x0D) ||
		    code === 0x20 || code === 0x85 || code === 0xA0 || code === 0x180E ||
		    (code >= 0x2000 && code <= 0x200D) ||
		    code === 0x2028 || code === 0x2029 || code === 0x202F || code === 0x205F ||
		    code === 0x2060 || code === 0x3000 || code === 0xFEFF
		  )
		}

		function skipWhitespace (current/*: Context */)/*: void */ {
		  var pattern = current.pattern;
		  var length = pattern.length;
		  var start = current.index;
		  while (current.index < length && isWhitespace(pattern.charCodeAt(current.index))) {
		    ++current.index;
		  }
		  if (start < current.index && current.tokens) {
		    current.tokens.push(['space', current.pattern.slice(start, current.index)]);
		  }
		}

		function parsePlaceholder (current/*: Context */)/*: Placeholder */ {
		  var pattern = current.pattern;
		  if (pattern[current.index] === NUM_ARG) {
		    if (current.tokens) current.tokens.push(['syntax', NUM_ARG]);
		    ++current.index; // move passed #
		    return [NUM_ARG]
		  }

		  var tag = parseTag(current);
		  if (tag) return tag

		  /* istanbul ignore if should be unreachable if parseAST and parseText are right */
		  if (pattern[current.index] !== ARG_OPN) throw expected(current, ARG_OPN)
		  if (current.tokens) current.tokens.push(['syntax', ARG_OPN]);
		  ++current.index; // move passed {
		  skipWhitespace(current);

		  var id = parseId(current);
		  if (!id) throw expected(current, 'placeholder id')
		  if (current.tokens) current.tokens.push(['id', id]);
		  skipWhitespace(current);

		  var char = pattern[current.index];
		  if (char === ARG_CLS) { // end placeholder
		    if (current.tokens) current.tokens.push(['syntax', ARG_CLS]);
		    ++current.index; // move passed }
		    return [id]
		  }

		  if (char !== ARG_SEP) throw expected(current, ARG_SEP + ' or ' + ARG_CLS)
		  if (current.tokens) current.tokens.push(['syntax', ARG_SEP]);
		  ++current.index; // move passed ,
		  skipWhitespace(current);

		  var type = parseId(current);
		  if (!type) throw expected(current, 'placeholder type')
		  if (current.tokens) current.tokens.push(['type', type]);
		  skipWhitespace(current);
		  char = pattern[current.index];
		  if (char === ARG_CLS) { // end placeholder
		    if (current.tokens) current.tokens.push(['syntax', ARG_CLS]);
		    if (type === 'plural' || type === 'selectordinal' || type === 'select') {
		      throw expected(current, type + ' sub-messages')
		    }
		    ++current.index; // move passed }
		    return [id, type]
		  }

		  if (char !== ARG_SEP) throw expected(current, ARG_SEP + ' or ' + ARG_CLS)
		  if (current.tokens) current.tokens.push(['syntax', ARG_SEP]);
		  ++current.index; // move passed ,
		  skipWhitespace(current);

		  var arg;
		  if (type === 'plural' || type === 'selectordinal') {
		    var offset = parsePluralOffset(current);
		    skipWhitespace(current);
		    arg = [id, type, offset, parseSubMessages(current, type)];
		  } else if (type === 'select') {
		    arg = [id, type, parseSubMessages(current, type)];
		  } else if (simpleTypes.indexOf(type) >= 0) {
		    arg = [id, type, parseSimpleFormat(current)];
		  } else { // custom placeholder type
		    var index = current.index;
		    var format/*: string | SubMessages */ = parseSimpleFormat(current);
		    skipWhitespace(current);
		    if (pattern[current.index] === ARG_OPN) {
		      current.index = index; // rewind, since should have been submessages
		      format = parseSubMessages(current, type);
		    }
		    arg = [id, type, format];
		  }

		  skipWhitespace(current);
		  if (pattern[current.index] !== ARG_CLS) throw expected(current, ARG_CLS)
		  if (current.tokens) current.tokens.push(['syntax', ARG_CLS]);
		  ++current.index; // move passed }
		  return arg
		}

		function parseTag (current/*: Context */)/*: ?Placeholder */ {
		  var tagsType = current.tagsType;
		  if (!tagsType || current.pattern[current.index] !== TAG_OPN) return

		  if (current.pattern.slice(current.index, current.index + TAG_END.length) === TAG_END) {
		    throw expected(current, null, 'closing tag without matching opening tag')
		  }
		  if (current.tokens) current.tokens.push(['syntax', TAG_OPN]);
		  ++current.index; // move passed <

		  var id = parseId(current, true);
		  if (!id) throw expected(current, 'placeholder id')
		  if (current.tokens) current.tokens.push(['id', id]);
		  skipWhitespace(current);

		  if (current.pattern.slice(current.index, current.index + TAG_SELF_CLS.length) === TAG_SELF_CLS) {
		    if (current.tokens) current.tokens.push(['syntax', TAG_SELF_CLS]);
		    current.index += TAG_SELF_CLS.length;
		    return [id, tagsType]
		  }
		  if (current.pattern[current.index] !== TAG_CLS) throw expected(current, TAG_CLS)
		  if (current.tokens) current.tokens.push(['syntax', TAG_CLS]);
		  ++current.index; // move passed >

		  var children = parseAST(current, tagsType);

		  var end = current.index;
		  if (current.pattern.slice(current.index, current.index + TAG_END.length) !== TAG_END) throw expected(current, TAG_END + id + TAG_CLS)
		  if (current.tokens) current.tokens.push(['syntax', TAG_END]);
		  current.index += TAG_END.length;
		  var closeId = parseId(current, true);
		  if (closeId && current.tokens) current.tokens.push(['id', closeId]);
		  if (id !== closeId) {
		    current.index = end; // rewind for better error message
		    throw expected(current, TAG_END + id + TAG_CLS, TAG_END + closeId + TAG_CLS)
		  }
		  skipWhitespace(current);
		  if (current.pattern[current.index] !== TAG_CLS) throw expected(current, TAG_CLS)
		  if (current.tokens) current.tokens.push(['syntax', TAG_CLS]);
		  ++current.index; // move passed >

		  return [id, tagsType, { children: children }]
		}

		function parseId (current/*: Context */, isTag/*:: ?: boolean */)/*: string */ {
		  var pattern = current.pattern;
		  var length = pattern.length;
		  var id = '';
		  while (current.index < length) {
		    var char = pattern[current.index];
		    if (
		      char === ARG_OPN || char === ARG_CLS || char === ARG_SEP ||
		      char === NUM_ARG || char === ESC || isWhitespace(char.charCodeAt(0)) ||
		      (isTag && (char === TAG_OPN || char === TAG_CLS || char === '/'))
		    ) break
		    id += char;
		    ++current.index;
		  }
		  return id
		}

		function parseSimpleFormat (current/*: Context */)/*: string */ {
		  var start = current.index;
		  var style = parseText(current, '{style}');
		  if (!style) throw expected(current, 'placeholder style name')
		  if (current.tokens) current.tokens.push(['style', current.pattern.slice(start, current.index)]);
		  return style
		}

		function parsePluralOffset (current/*: Context */)/*: number */ {
		  var pattern = current.pattern;
		  var length = pattern.length;
		  var offset = 0;
		  if (pattern.slice(current.index, current.index + OFFSET.length) === OFFSET) {
		    if (current.tokens) current.tokens.push(['offset', 'offset'], ['syntax', ':']);
		    current.index += OFFSET.length; // move passed offset:
		    skipWhitespace(current);
		    var start = current.index;
		    while (current.index < length && isDigit(pattern.charCodeAt(current.index))) {
		      ++current.index;
		    }
		    if (start === current.index) throw expected(current, 'offset number')
		    if (current.tokens) current.tokens.push(['number', pattern.slice(start, current.index)]);
		    offset = +pattern.slice(start, current.index);
		  }
		  return offset
		}

		function isDigit (code/*: number */)/*: boolean */ {
		  return (code >= 0x30 && code <= 0x39)
		}

		function parseSubMessages (current/*: Context */, parentType/*: string */)/*: SubMessages */ {
		  var pattern = current.pattern;
		  var length = pattern.length;
		  var options/*: SubMessages */ = {};
		  while (current.index < length && pattern[current.index] !== ARG_CLS) {
		    var selector = parseId(current);
		    if (!selector) throw expected(current, 'sub-message selector')
		    if (current.tokens) current.tokens.push(['selector', selector]);
		    skipWhitespace(current);
		    options[selector] = parseSubMessage(current, parentType);
		    skipWhitespace(current);
		  }
		  if (!options.other && submTypes.indexOf(parentType) >= 0) {
		    throw expected(current, null, null, '"other" sub-message must be specified in ' + parentType)
		  }
		  return options
		}

		function parseSubMessage (current/*: Context */, parentType/*: string */)/*: AST */ {
		  if (current.pattern[current.index] !== ARG_OPN) throw expected(current, ARG_OPN + ' to start sub-message')
		  if (current.tokens) current.tokens.push(['syntax', ARG_OPN]);
		  ++current.index; // move passed {
		  var message = parseAST(current, parentType);
		  if (current.pattern[current.index] !== ARG_CLS) throw expected(current, ARG_CLS + ' to end sub-message')
		  if (current.tokens) current.tokens.push(['syntax', ARG_CLS]);
		  ++current.index; // move passed }
		  return message
		}

		function expected (current/*: Context */, expected/*:: ?: ?string */, found/*:: ?: ?string */, message/*:: ?: string */) {
		  var pattern = current.pattern;
		  var lines = pattern.slice(0, current.index).split(/\r?\n/);
		  var offset = current.index;
		  var line = lines.length;
		  var column = lines.slice(-1)[0].length;
		  found = found || (
		    (current.index >= pattern.length) ? 'end of message pattern'
		      : (parseId(current) || pattern[current.index])
		  );
		  if (!message) message = errorMessage(expected, found);
		  message += ' in ' + pattern.replace(/\r?\n/g, '\n');
		  return new SyntaxError(message, expected, found, offset, line, column)
		}

		function errorMessage (expected/*: ?string */, found/* string */) {
		  if (!expected) return 'Unexpected ' + found + ' found'
		  return 'Expected ' + expected + ' but found ' + found
		}

		/**
		 * SyntaxError
		 *  Holds information about bad syntax found in a message pattern
		 **/
		function SyntaxError (message/*: string */, expected/*: ?string */, found/*: ?string */, offset/*: number */, line/*: number */, column/*: number */) {
		  Error.call(this, message);
		  this.name = 'SyntaxError';
		  this.message = message;
		  this.expected = expected;
		  this.found = found;
		  this.offset = offset;
		  this.line = line;
		  this.column = column;
		}
		SyntaxError.prototype = Object.create(Error.prototype);
		exports.SyntaxError = SyntaxError; 
	} (formatMessageParse, formatMessageParse.exports));
	return formatMessageParse.exports;
}

var formatMessageInterpret = {exports: {}};

var formatMessageFormats;
var hasRequiredFormatMessageFormats;

function requireFormatMessageFormats () {
	if (hasRequiredFormatMessageFormats) return formatMessageFormats;
	hasRequiredFormatMessageFormats = 1;
	// @flow
	var LONG = 'long';
	var SHORT = 'short';
	var NARROW = 'narrow';
	var NUMERIC = 'numeric';
	var TWODIGIT = '2-digit';

	/**
	 * formatting information
	 **/
	formatMessageFormats = {
	  number: {
	    decimal: {
	      style: 'decimal'
	    },
	    integer: {
	      style: 'decimal',
	      maximumFractionDigits: 0
	    },
	    currency: {
	      style: 'currency',
	      currency: 'USD'
	    },
	    percent: {
	      style: 'percent'
	    },
	    default: {
	      style: 'decimal'
	    }
	  },
	  date: {
	    short: {
	      month: NUMERIC,
	      day: NUMERIC,
	      year: TWODIGIT
	    },
	    medium: {
	      month: SHORT,
	      day: NUMERIC,
	      year: NUMERIC
	    },
	    long: {
	      month: LONG,
	      day: NUMERIC,
	      year: NUMERIC
	    },
	    full: {
	      month: LONG,
	      day: NUMERIC,
	      year: NUMERIC,
	      weekday: LONG
	    },
	    default: {
	      month: SHORT,
	      day: NUMERIC,
	      year: NUMERIC
	    }
	  },
	  time: {
	    short: {
	      hour: NUMERIC,
	      minute: NUMERIC
	    },
	    medium: {
	      hour: NUMERIC,
	      minute: NUMERIC,
	      second: NUMERIC
	    },
	    long: {
	      hour: NUMERIC,
	      minute: NUMERIC,
	      second: NUMERIC,
	      timeZoneName: SHORT
	    },
	    full: {
	      hour: NUMERIC,
	      minute: NUMERIC,
	      second: NUMERIC,
	      timeZoneName: SHORT
	    },
	    default: {
	      hour: NUMERIC,
	      minute: NUMERIC,
	      second: NUMERIC
	    }
	  },
	  duration: {
	    default: {
	      hours: {
	        minimumIntegerDigits: 1,
	        maximumFractionDigits: 0
	      },
	      minutes: {
	        minimumIntegerDigits: 2,
	        maximumFractionDigits: 0
	      },
	      seconds: {
	        minimumIntegerDigits: 2,
	        maximumFractionDigits: 3
	      }
	    }
	  },
	  parseNumberPattern: function (pattern/*: ?string */) {
	    if (!pattern) return
	    var options = {};
	    var currency = pattern.match(/\b[A-Z]{3}\b/i);
	    var syms = pattern.replace(/[^¤]/g, '').length;
	    if (!syms && currency) syms = 1;
	    if (syms) {
	      options.style = 'currency';
	      options.currencyDisplay = syms === 1 ? 'symbol' : syms === 2 ? 'code' : 'name';
	      options.currency = currency ? currency[0].toUpperCase() : 'USD';
	    } else if (pattern.indexOf('%') >= 0) {
	      options.style = 'percent';
	    }
	    if (!/[@#0]/.test(pattern)) return options.style ? options : undefined
	    options.useGrouping = pattern.indexOf(',') >= 0;
	    if (/E\+?[@#0]+/i.test(pattern) || pattern.indexOf('@') >= 0) {
	      var size = pattern.replace(/E\+?[@#0]+|[^@#0]/gi, '');
	      options.minimumSignificantDigits = Math.min(Math.max(size.replace(/[^@0]/g, '').length, 1), 21);
	      options.maximumSignificantDigits = Math.min(Math.max(size.length, 1), 21);
	    } else {
	      var parts = pattern.replace(/[^#0.]/g, '').split('.');
	      var integer = parts[0];
	      var n = integer.length - 1;
	      while (integer[n] === '0') --n;
	      options.minimumIntegerDigits = Math.min(Math.max(integer.length - 1 - n, 1), 21);
	      var fraction = parts[1] || '';
	      n = 0;
	      while (fraction[n] === '0') ++n;
	      options.minimumFractionDigits = Math.min(Math.max(n, 0), 20);
	      while (fraction[n] === '#') ++n;
	      options.maximumFractionDigits = Math.min(Math.max(n, 0), 20);
	    }
	    return options
	  },
	  parseDatePattern: function (pattern/*: ?string */) {
	    if (!pattern) return
	    var options = {};
	    for (var i = 0; i < pattern.length;) {
	      var current = pattern[i];
	      var n = 1;
	      while (pattern[++i] === current) ++n;
	      switch (current) {
	        case 'G':
	          options.era = n === 5 ? NARROW : n === 4 ? LONG : SHORT;
	          break
	        case 'y':
	        case 'Y':
	          options.year = n === 2 ? TWODIGIT : NUMERIC;
	          break
	        case 'M':
	        case 'L':
	          n = Math.min(Math.max(n - 1, 0), 4);
	          options.month = [NUMERIC, TWODIGIT, SHORT, LONG, NARROW][n];
	          break
	        case 'E':
	        case 'e':
	        case 'c':
	          options.weekday = n === 5 ? NARROW : n === 4 ? LONG : SHORT;
	          break
	        case 'd':
	        case 'D':
	          options.day = n === 2 ? TWODIGIT : NUMERIC;
	          break
	        case 'h':
	        case 'K':
	          options.hour12 = true;
	          options.hour = n === 2 ? TWODIGIT : NUMERIC;
	          break
	        case 'H':
	        case 'k':
	          options.hour12 = false;
	          options.hour = n === 2 ? TWODIGIT : NUMERIC;
	          break
	        case 'm':
	          options.minute = n === 2 ? TWODIGIT : NUMERIC;
	          break
	        case 's':
	        case 'S':
	          options.second = n === 2 ? TWODIGIT : NUMERIC;
	          break
	        case 'z':
	        case 'Z':
	        case 'v':
	        case 'V':
	          options.timeZoneName = n === 1 ? SHORT : LONG;
	          break
	      }
	    }
	    return Object.keys(options).length ? options : undefined
	  }
	};
	return formatMessageFormats;
}

var lookupClosestLocale;
var hasRequiredLookupClosestLocale;

function requireLookupClosestLocale () {
	if (hasRequiredLookupClosestLocale) return lookupClosestLocale;
	hasRequiredLookupClosestLocale = 1;
	// @flow
	// "lookup" algorithm http://tools.ietf.org/html/rfc4647#section-3.4
	// assumes normalized language tags, and matches in a case sensitive manner
	lookupClosestLocale = function lookupClosestLocale (locale/*: string | string[] | void */, available/*: { [string]: any } */)/*: ?string */ {
	  if (typeof locale === 'string' && available[locale]) return locale
	  var locales = [].concat(locale || []);
	  for (var l = 0, ll = locales.length; l < ll; ++l) {
	    var current = locales[l].split('-');
	    while (current.length) {
	      var candidate = current.join('-');
	      if (available[candidate]) return candidate
	      current.pop();
	    }
	  }
	};
	return lookupClosestLocale;
}

var plurals;
var hasRequiredPlurals;

function requirePlurals () {
	if (hasRequiredPlurals) return plurals;
	hasRequiredPlurals = 1;

	/*:: export type Rule = 'zero' | 'one' | 'two' | 'few' | 'many' | 'other' */
	var zero = 'zero', one = 'one', two = 'two', few = 'few', many = 'many', other = 'other';
	var f = [
	  function (s/*: string | number */)/*: Rule */ {
	    var n = +s;
	    return n === 1 ? one
	      : other
	  },
	  function (s/*: string | number */)/*: Rule */ {
	    var n = +s;
	    return 0 <= n && n <= 1 ? one
	      : other
	  },
	  function (s/*: string | number */)/*: Rule */ {
	    var i = Math.floor(Math.abs(+s));
	    var n = +s;
	    return i === 0 || n === 1 ? one
	      : other
	  },
	  function (s/*: string | number */)/*: Rule */ {
	    var n = +s;
	    return n === 0 ? zero
	      : n === 1 ? one
	      : n === 2 ? two
	      : 3 <= n % 100 && n % 100 <= 10 ? few
	      : 11 <= n % 100 && n % 100 <= 99 ? many
	      : other
	  },
	  function (s/*: string | number */)/*: Rule */ {
	    var i = Math.floor(Math.abs(+s));
	    var v = (s + '.').split('.')[1].length;
	    return i === 1 && v === 0 ? one
	      : other
	  },
	  function (s/*: string | number */)/*: Rule */ {
	    var n = +s;
	    return n % 10 === 1 && n % 100 !== 11 ? one
	      : (2 <= n % 10 && n % 10 <= 4) && (n % 100 < 12 || 14 < n % 100) ? few
	      : n % 10 === 0 || (5 <= n % 10 && n % 10 <= 9) || (11 <= n % 100 && n % 100 <= 14) ? many
	      : other
	  },
	  function (s/*: string | number */)/*: Rule */ {
	    var n = +s;
	    return n % 10 === 1 && (n % 100 !== 11 && n % 100 !== 71 && n % 100 !== 91) ? one
	      : n % 10 === 2 && (n % 100 !== 12 && n % 100 !== 72 && n % 100 !== 92) ? two
	      : ((3 <= n % 10 && n % 10 <= 4) || n % 10 === 9) && ((n % 100 < 10 || 19 < n % 100) && (n % 100 < 70 || 79 < n % 100) && (n % 100 < 90 || 99 < n % 100)) ? few
	      : n !== 0 && n % 1000000 === 0 ? many
	      : other
	  },
	  function (s/*: string | number */)/*: Rule */ {
	    var i = Math.floor(Math.abs(+s));
	    var v = (s + '.').split('.')[1].length;
	    var f = +(s + '.').split('.')[1];
	    return v === 0 && i % 10 === 1 && i % 100 !== 11 || f % 10 === 1 && f % 100 !== 11 ? one
	      : v === 0 && (2 <= i % 10 && i % 10 <= 4) && (i % 100 < 12 || 14 < i % 100) || (2 <= f % 10 && f % 10 <= 4) && (f % 100 < 12 || 14 < f % 100) ? few
	      : other
	  },
	  function (s/*: string | number */)/*: Rule */ {
	    var i = Math.floor(Math.abs(+s));
	    var v = (s + '.').split('.')[1].length;
	    return i === 1 && v === 0 ? one
	      : (2 <= i && i <= 4) && v === 0 ? few
	      : v !== 0 ? many
	      : other
	  },
	  function (s/*: string | number */)/*: Rule */ {
	    var n = +s;
	    return n === 0 ? zero
	      : n === 1 ? one
	      : n === 2 ? two
	      : n === 3 ? few
	      : n === 6 ? many
	      : other
	  },
	  function (s/*: string | number */)/*: Rule */ {
	    var i = Math.floor(Math.abs(+s));
	    var t = +('' + s).replace(/^[^.]*.?|0+$/g, '');
	    var n = +s;
	    return n === 1 || t !== 0 && (i === 0 || i === 1) ? one
	      : other
	  },
	  function (s/*: string | number */)/*: Rule */ {
	    var i = Math.floor(Math.abs(+s));
	    var v = (s + '.').split('.')[1].length;
	    var f = +(s + '.').split('.')[1];
	    return v === 0 && i % 100 === 1 || f % 100 === 1 ? one
	      : v === 0 && i % 100 === 2 || f % 100 === 2 ? two
	      : v === 0 && (3 <= i % 100 && i % 100 <= 4) || (3 <= f % 100 && f % 100 <= 4) ? few
	      : other
	  },
	  function (s/*: string | number */)/*: Rule */ {
	    var i = Math.floor(Math.abs(+s));
	    return i === 0 || i === 1 ? one
	      : other
	  },
	  function (s/*: string | number */)/*: Rule */ {
	    var i = Math.floor(Math.abs(+s));
	    var v = (s + '.').split('.')[1].length;
	    var f = +(s + '.').split('.')[1];
	    return v === 0 && (i === 1 || i === 2 || i === 3) || v === 0 && (i % 10 !== 4 && i % 10 !== 6 && i % 10 !== 9) || v !== 0 && (f % 10 !== 4 && f % 10 !== 6 && f % 10 !== 9) ? one
	      : other
	  },
	  function (s/*: string | number */)/*: Rule */ {
	    var n = +s;
	    return n === 1 ? one
	      : n === 2 ? two
	      : 3 <= n && n <= 6 ? few
	      : 7 <= n && n <= 10 ? many
	      : other
	  },
	  function (s/*: string | number */)/*: Rule */ {
	    var n = +s;
	    return n === 1 || n === 11 ? one
	      : n === 2 || n === 12 ? two
	      : ((3 <= n && n <= 10) || (13 <= n && n <= 19)) ? few
	      : other
	  },
	  function (s/*: string | number */)/*: Rule */ {
	    var i = Math.floor(Math.abs(+s));
	    var v = (s + '.').split('.')[1].length;
	    return v === 0 && i % 10 === 1 ? one
	      : v === 0 && i % 10 === 2 ? two
	      : v === 0 && (i % 100 === 0 || i % 100 === 20 || i % 100 === 40 || i % 100 === 60 || i % 100 === 80) ? few
	      : v !== 0 ? many
	      : other
	  },
	  function (s/*: string | number */)/*: Rule */ {
	    var i = Math.floor(Math.abs(+s));
	    var v = (s + '.').split('.')[1].length;
	    var n = +s;
	    return i === 1 && v === 0 ? one
	      : i === 2 && v === 0 ? two
	      : v === 0 && (n < 0 || 10 < n) && n % 10 === 0 ? many
	      : other
	  },
	  function (s/*: string | number */)/*: Rule */ {
	    var i = Math.floor(Math.abs(+s));
	    var t = +('' + s).replace(/^[^.]*.?|0+$/g, '');
	    return t === 0 && i % 10 === 1 && i % 100 !== 11 || t !== 0 ? one
	      : other
	  },
	  function (s/*: string | number */)/*: Rule */ {
	    var n = +s;
	    return n === 1 ? one
	      : n === 2 ? two
	      : other
	  },
	  function (s/*: string | number */)/*: Rule */ {
	    var n = +s;
	    return n === 0 ? zero
	      : n === 1 ? one
	      : other
	  },
	  function (s/*: string | number */)/*: Rule */ {
	    var i = Math.floor(Math.abs(+s));
	    var n = +s;
	    return n === 0 ? zero
	      : (i === 0 || i === 1) && n !== 0 ? one
	      : other
	  },
	  function (s/*: string | number */)/*: Rule */ {
	    var f = +(s + '.').split('.')[1];
	    var n = +s;
	    return n % 10 === 1 && (n % 100 < 11 || 19 < n % 100) ? one
	      : (2 <= n % 10 && n % 10 <= 9) && (n % 100 < 11 || 19 < n % 100) ? few
	      : f !== 0 ? many
	      : other
	  },
	  function (s/*: string | number */)/*: Rule */ {
	    var v = (s + '.').split('.')[1].length;
	    var f = +(s + '.').split('.')[1];
	    var n = +s;
	    return n % 10 === 0 || (11 <= n % 100 && n % 100 <= 19) || v === 2 && (11 <= f % 100 && f % 100 <= 19) ? zero
	      : n % 10 === 1 && n % 100 !== 11 || v === 2 && f % 10 === 1 && f % 100 !== 11 || v !== 2 && f % 10 === 1 ? one
	      : other
	  },
	  function (s/*: string | number */)/*: Rule */ {
	    var i = Math.floor(Math.abs(+s));
	    var v = (s + '.').split('.')[1].length;
	    var f = +(s + '.').split('.')[1];
	    return v === 0 && i % 10 === 1 && i % 100 !== 11 || f % 10 === 1 && f % 100 !== 11 ? one
	      : other
	  },
	  function (s/*: string | number */)/*: Rule */ {
	    var i = Math.floor(Math.abs(+s));
	    var v = (s + '.').split('.')[1].length;
	    var n = +s;
	    return i === 1 && v === 0 ? one
	      : v !== 0 || n === 0 || n !== 1 && (1 <= n % 100 && n % 100 <= 19) ? few
	      : other
	  },
	  function (s/*: string | number */)/*: Rule */ {
	    var n = +s;
	    return n === 1 ? one
	      : n === 0 || (2 <= n % 100 && n % 100 <= 10) ? few
	      : 11 <= n % 100 && n % 100 <= 19 ? many
	      : other
	  },
	  function (s/*: string | number */)/*: Rule */ {
	    var i = Math.floor(Math.abs(+s));
	    var v = (s + '.').split('.')[1].length;
	    return i === 1 && v === 0 ? one
	      : v === 0 && (2 <= i % 10 && i % 10 <= 4) && (i % 100 < 12 || 14 < i % 100) ? few
	      : v === 0 && i !== 1 && (0 <= i % 10 && i % 10 <= 1) || v === 0 && (5 <= i % 10 && i % 10 <= 9) || v === 0 && (12 <= i % 100 && i % 100 <= 14) ? many
	      : other
	  },
	  function (s/*: string | number */)/*: Rule */ {
	    var i = Math.floor(Math.abs(+s));
	    return 0 <= i && i <= 1 ? one
	      : other
	  },
	  function (s/*: string | number */)/*: Rule */ {
	    var i = Math.floor(Math.abs(+s));
	    var v = (s + '.').split('.')[1].length;
	    return v === 0 && i % 10 === 1 && i % 100 !== 11 ? one
	      : v === 0 && (2 <= i % 10 && i % 10 <= 4) && (i % 100 < 12 || 14 < i % 100) ? few
	      : v === 0 && i % 10 === 0 || v === 0 && (5 <= i % 10 && i % 10 <= 9) || v === 0 && (11 <= i % 100 && i % 100 <= 14) ? many
	      : other
	  },
	  function (s/*: string | number */)/*: Rule */ {
	    var i = Math.floor(Math.abs(+s));
	    var n = +s;
	    return i === 0 || n === 1 ? one
	      : 2 <= n && n <= 10 ? few
	      : other
	  },
	  function (s/*: string | number */)/*: Rule */ {
	    var i = Math.floor(Math.abs(+s));
	    var f = +(s + '.').split('.')[1];
	    var n = +s;
	    return (n === 0 || n === 1) || i === 0 && f === 1 ? one
	      : other
	  },
	  function (s/*: string | number */)/*: Rule */ {
	    var i = Math.floor(Math.abs(+s));
	    var v = (s + '.').split('.')[1].length;
	    return v === 0 && i % 100 === 1 ? one
	      : v === 0 && i % 100 === 2 ? two
	      : v === 0 && (3 <= i % 100 && i % 100 <= 4) || v !== 0 ? few
	      : other
	  },
	  function (s/*: string | number */)/*: Rule */ {
	    var n = +s;
	    return (0 <= n && n <= 1) || (11 <= n && n <= 99) ? one
	      : other
	  },
	  function (s/*: string | number */)/*: Rule */ {
	    var n = +s;
	    return n === 1 || n === 5 || n === 7 || n === 8 || n === 9 || n === 10 ? one
	      : n === 2 || n === 3 ? two
	      : n === 4 ? few
	      : n === 6 ? many
	      : other
	  },
	  function (s/*: string | number */)/*: Rule */ {
	    var i = Math.floor(Math.abs(+s));
	    return (i % 10 === 1 || i % 10 === 2 || i % 10 === 5 || i % 10 === 7 || i % 10 === 8) || (i % 100 === 20 || i % 100 === 50 || i % 100 === 70 || i % 100 === 80) ? one
	      : (i % 10 === 3 || i % 10 === 4) || (i % 1000 === 100 || i % 1000 === 200 || i % 1000 === 300 || i % 1000 === 400 || i % 1000 === 500 || i % 1000 === 600 || i % 1000 === 700 || i % 1000 === 800 || i % 1000 === 900) ? few
	      : i === 0 || i % 10 === 6 || (i % 100 === 40 || i % 100 === 60 || i % 100 === 90) ? many
	      : other
	  },
	  function (s/*: string | number */)/*: Rule */ {
	    var n = +s;
	    return (n % 10 === 2 || n % 10 === 3) && (n % 100 !== 12 && n % 100 !== 13) ? few
	      : other
	  },
	  function (s/*: string | number */)/*: Rule */ {
	    var n = +s;
	    return n === 1 || n === 3 ? one
	      : n === 2 ? two
	      : n === 4 ? few
	      : other
	  },
	  function (s/*: string | number */)/*: Rule */ {
	    var n = +s;
	    return n === 0 || n === 7 || n === 8 || n === 9 ? zero
	      : n === 1 ? one
	      : n === 2 ? two
	      : n === 3 || n === 4 ? few
	      : n === 5 || n === 6 ? many
	      : other
	  },
	  function (s/*: string | number */)/*: Rule */ {
	    var n = +s;
	    return n % 10 === 1 && n % 100 !== 11 ? one
	      : n % 10 === 2 && n % 100 !== 12 ? two
	      : n % 10 === 3 && n % 100 !== 13 ? few
	      : other
	  },
	  function (s/*: string | number */)/*: Rule */ {
	    var n = +s;
	    return n === 1 || n === 11 ? one
	      : n === 2 || n === 12 ? two
	      : n === 3 || n === 13 ? few
	      : other
	  },
	  function (s/*: string | number */)/*: Rule */ {
	    var n = +s;
	    return n === 1 ? one
	      : n === 2 || n === 3 ? two
	      : n === 4 ? few
	      : n === 6 ? many
	      : other
	  },
	  function (s/*: string | number */)/*: Rule */ {
	    var n = +s;
	    return n === 1 || n === 5 ? one
	      : other
	  },
	  function (s/*: string | number */)/*: Rule */ {
	    var n = +s;
	    return n === 11 || n === 8 || n === 80 || n === 800 ? many
	      : other
	  },
	  function (s/*: string | number */)/*: Rule */ {
	    var i = Math.floor(Math.abs(+s));
	    return i === 1 ? one
	      : i === 0 || ((2 <= i % 100 && i % 100 <= 20) || i % 100 === 40 || i % 100 === 60 || i % 100 === 80) ? many
	      : other
	  },
	  function (s/*: string | number */)/*: Rule */ {
	    var n = +s;
	    return n % 10 === 6 || n % 10 === 9 || n % 10 === 0 && n !== 0 ? many
	      : other
	  },
	  function (s/*: string | number */)/*: Rule */ {
	    var i = Math.floor(Math.abs(+s));
	    return i % 10 === 1 && i % 100 !== 11 ? one
	      : i % 10 === 2 && i % 100 !== 12 ? two
	      : (i % 10 === 7 || i % 10 === 8) && (i % 100 !== 17 && i % 100 !== 18) ? many
	      : other
	  },
	  function (s/*: string | number */)/*: Rule */ {
	    var n = +s;
	    return n === 1 ? one
	      : n === 2 || n === 3 ? two
	      : n === 4 ? few
	      : other
	  },
	  function (s/*: string | number */)/*: Rule */ {
	    var n = +s;
	    return 1 <= n && n <= 4 ? one
	      : other
	  },
	  function (s/*: string | number */)/*: Rule */ {
	    var n = +s;
	    return (n === 1 || n === 5 || (7 <= n && n <= 9)) ? one
	      : n === 2 || n === 3 ? two
	      : n === 4 ? few
	      : n === 6 ? many
	      : other
	  },
	  function (s/*: string | number */)/*: Rule */ {
	    var n = +s;
	    return n === 1 ? one
	      : n % 10 === 4 && n % 100 !== 14 ? many
	      : other
	  },
	  function (s/*: string | number */)/*: Rule */ {
	    var n = +s;
	    return (n % 10 === 1 || n % 10 === 2) && (n % 100 !== 11 && n % 100 !== 12) ? one
	      : other
	  },
	  function (s/*: string | number */)/*: Rule */ {
	    var n = +s;
	    return (n % 10 === 6 || n % 10 === 9) || n === 10 ? few
	      : other
	  },
	  function (s/*: string | number */)/*: Rule */ {
	    var n = +s;
	    return n % 10 === 3 && n % 100 !== 13 ? few
	      : other
	  }
	];

	plurals = {
	  af: { cardinal: f[0] },
	  ak: { cardinal: f[1] },
	  am: { cardinal: f[2] },
	  ar: { cardinal: f[3] },
	  ars: { cardinal: f[3] },
	  as: { cardinal: f[2], ordinal: f[34] },
	  asa: { cardinal: f[0] },
	  ast: { cardinal: f[4] },
	  az: { cardinal: f[0], ordinal: f[35] },
	  be: { cardinal: f[5], ordinal: f[36] },
	  bem: { cardinal: f[0] },
	  bez: { cardinal: f[0] },
	  bg: { cardinal: f[0] },
	  bh: { cardinal: f[1] },
	  bn: { cardinal: f[2], ordinal: f[34] },
	  br: { cardinal: f[6] },
	  brx: { cardinal: f[0] },
	  bs: { cardinal: f[7] },
	  ca: { cardinal: f[4], ordinal: f[37] },
	  ce: { cardinal: f[0] },
	  cgg: { cardinal: f[0] },
	  chr: { cardinal: f[0] },
	  ckb: { cardinal: f[0] },
	  cs: { cardinal: f[8] },
	  cy: { cardinal: f[9], ordinal: f[38] },
	  da: { cardinal: f[10] },
	  de: { cardinal: f[4] },
	  dsb: { cardinal: f[11] },
	  dv: { cardinal: f[0] },
	  ee: { cardinal: f[0] },
	  el: { cardinal: f[0] },
	  en: { cardinal: f[4], ordinal: f[39] },
	  eo: { cardinal: f[0] },
	  es: { cardinal: f[0] },
	  et: { cardinal: f[4] },
	  eu: { cardinal: f[0] },
	  fa: { cardinal: f[2] },
	  ff: { cardinal: f[12] },
	  fi: { cardinal: f[4] },
	  fil: { cardinal: f[13], ordinal: f[0] },
	  fo: { cardinal: f[0] },
	  fr: { cardinal: f[12], ordinal: f[0] },
	  fur: { cardinal: f[0] },
	  fy: { cardinal: f[4] },
	  ga: { cardinal: f[14], ordinal: f[0] },
	  gd: { cardinal: f[15], ordinal: f[40] },
	  gl: { cardinal: f[4] },
	  gsw: { cardinal: f[0] },
	  gu: { cardinal: f[2], ordinal: f[41] },
	  guw: { cardinal: f[1] },
	  gv: { cardinal: f[16] },
	  ha: { cardinal: f[0] },
	  haw: { cardinal: f[0] },
	  he: { cardinal: f[17] },
	  hi: { cardinal: f[2], ordinal: f[41] },
	  hr: { cardinal: f[7] },
	  hsb: { cardinal: f[11] },
	  hu: { cardinal: f[0], ordinal: f[42] },
	  hy: { cardinal: f[12], ordinal: f[0] },
	  ia: { cardinal: f[4] },
	  io: { cardinal: f[4] },
	  is: { cardinal: f[18] },
	  it: { cardinal: f[4], ordinal: f[43] },
	  iu: { cardinal: f[19] },
	  iw: { cardinal: f[17] },
	  jgo: { cardinal: f[0] },
	  ji: { cardinal: f[4] },
	  jmc: { cardinal: f[0] },
	  ka: { cardinal: f[0], ordinal: f[44] },
	  kab: { cardinal: f[12] },
	  kaj: { cardinal: f[0] },
	  kcg: { cardinal: f[0] },
	  kk: { cardinal: f[0], ordinal: f[45] },
	  kkj: { cardinal: f[0] },
	  kl: { cardinal: f[0] },
	  kn: { cardinal: f[2] },
	  ks: { cardinal: f[0] },
	  ksb: { cardinal: f[0] },
	  ksh: { cardinal: f[20] },
	  ku: { cardinal: f[0] },
	  kw: { cardinal: f[19] },
	  ky: { cardinal: f[0] },
	  lag: { cardinal: f[21] },
	  lb: { cardinal: f[0] },
	  lg: { cardinal: f[0] },
	  ln: { cardinal: f[1] },
	  lt: { cardinal: f[22] },
	  lv: { cardinal: f[23] },
	  mas: { cardinal: f[0] },
	  mg: { cardinal: f[1] },
	  mgo: { cardinal: f[0] },
	  mk: { cardinal: f[24], ordinal: f[46] },
	  ml: { cardinal: f[0] },
	  mn: { cardinal: f[0] },
	  mo: { cardinal: f[25], ordinal: f[0] },
	  mr: { cardinal: f[2], ordinal: f[47] },
	  mt: { cardinal: f[26] },
	  nah: { cardinal: f[0] },
	  naq: { cardinal: f[19] },
	  nb: { cardinal: f[0] },
	  nd: { cardinal: f[0] },
	  ne: { cardinal: f[0], ordinal: f[48] },
	  nl: { cardinal: f[4] },
	  nn: { cardinal: f[0] },
	  nnh: { cardinal: f[0] },
	  no: { cardinal: f[0] },
	  nr: { cardinal: f[0] },
	  nso: { cardinal: f[1] },
	  ny: { cardinal: f[0] },
	  nyn: { cardinal: f[0] },
	  om: { cardinal: f[0] },
	  or: { cardinal: f[0], ordinal: f[49] },
	  os: { cardinal: f[0] },
	  pa: { cardinal: f[1] },
	  pap: { cardinal: f[0] },
	  pl: { cardinal: f[27] },
	  prg: { cardinal: f[23] },
	  ps: { cardinal: f[0] },
	  pt: { cardinal: f[28] },
	  'pt-PT': { cardinal: f[4] },
	  rm: { cardinal: f[0] },
	  ro: { cardinal: f[25], ordinal: f[0] },
	  rof: { cardinal: f[0] },
	  ru: { cardinal: f[29] },
	  rwk: { cardinal: f[0] },
	  saq: { cardinal: f[0] },
	  sc: { cardinal: f[4], ordinal: f[43] },
	  scn: { cardinal: f[4], ordinal: f[43] },
	  sd: { cardinal: f[0] },
	  sdh: { cardinal: f[0] },
	  se: { cardinal: f[19] },
	  seh: { cardinal: f[0] },
	  sh: { cardinal: f[7] },
	  shi: { cardinal: f[30] },
	  si: { cardinal: f[31] },
	  sk: { cardinal: f[8] },
	  sl: { cardinal: f[32] },
	  sma: { cardinal: f[19] },
	  smi: { cardinal: f[19] },
	  smj: { cardinal: f[19] },
	  smn: { cardinal: f[19] },
	  sms: { cardinal: f[19] },
	  sn: { cardinal: f[0] },
	  so: { cardinal: f[0] },
	  sq: { cardinal: f[0], ordinal: f[50] },
	  sr: { cardinal: f[7] },
	  ss: { cardinal: f[0] },
	  ssy: { cardinal: f[0] },
	  st: { cardinal: f[0] },
	  sv: { cardinal: f[4], ordinal: f[51] },
	  sw: { cardinal: f[4] },
	  syr: { cardinal: f[0] },
	  ta: { cardinal: f[0] },
	  te: { cardinal: f[0] },
	  teo: { cardinal: f[0] },
	  ti: { cardinal: f[1] },
	  tig: { cardinal: f[0] },
	  tk: { cardinal: f[0], ordinal: f[52] },
	  tl: { cardinal: f[13], ordinal: f[0] },
	  tn: { cardinal: f[0] },
	  tr: { cardinal: f[0] },
	  ts: { cardinal: f[0] },
	  tzm: { cardinal: f[33] },
	  ug: { cardinal: f[0] },
	  uk: { cardinal: f[29], ordinal: f[53] },
	  ur: { cardinal: f[4] },
	  uz: { cardinal: f[0] },
	  ve: { cardinal: f[0] },
	  vo: { cardinal: f[0] },
	  vun: { cardinal: f[0] },
	  wa: { cardinal: f[1] },
	  wae: { cardinal: f[0] },
	  xh: { cardinal: f[0] },
	  xog: { cardinal: f[0] },
	  yi: { cardinal: f[4] },
	  zu: { cardinal: f[2] },
	  lo: { ordinal: f[0] },
	  ms: { ordinal: f[0] },
	  vi: { ordinal: f[0] }
	};
	return plurals;
}

var hasRequiredFormatMessageInterpret;

function requireFormatMessageInterpret () {
	if (hasRequiredFormatMessageInterpret) return formatMessageInterpret.exports;
	hasRequiredFormatMessageInterpret = 1;
	(function (module, exports) {
		var formats = requireFormatMessageFormats();
		var lookupClosestLocale = requireLookupClosestLocale();
		var plurals = requirePlurals();

		/*::
		import type {
		  AST,
		  SubMessages
		} from '../format-message-parse'
		type Locale = string
		type Locales = Locale | Locale[]
		type Placeholder = any[] // https://github.com/facebook/flow/issues/4050
		export type Type = (Placeholder, Locales) => (any, ?Object) => any
		export type Types = { [string]: Type }
		*/

		exports = module.exports = function interpret (
		  ast/*: AST */,
		  locale/*:: ?: Locales */,
		  types/*:: ?: Types */
		)/*: (args?: Object) => string */ {
		  return interpretAST(ast, null, locale || 'en', types || {}, true)
		};

		exports.toParts = function toParts (
		  ast/*: AST */,
		  locale/*:: ?: Locales */,
		  types/*:: ?: Types */
		)/*: (args?: Object) => any[] */ {
		  return interpretAST(ast, null, locale || 'en', types || {}, false)
		};

		function interpretAST (
		  elements/*: any[] */,
		  parent/*: ?Placeholder */,
		  locale/*: Locales */,
		  types/*: Types */,
		  join/*: boolean */
		)/*: Function */ {
		  var parts = elements.map(function (element) {
		    return interpretElement(element, parent, locale, types, join)
		  });

		  if (!join) {
		    return function format (args) {
		      return parts.reduce(function (parts, part) {
		        return parts.concat(part(args))
		      }, [])
		    }
		  }

		  if (parts.length === 1) return parts[0]
		  return function format (args) {
		    var message = '';
		    for (var e = 0; e < parts.length; ++e) {
		      message += parts[e](args);
		    }
		    return message
		  }
		}

		function interpretElement (
		  element/*: Placeholder */,
		  parent/*: ?Placeholder */,
		  locale/*: Locales */,
		  types/*: Types */,
		  join/*: boolean */
		)/*: Function */ {
		  if (typeof element === 'string') {
		    var value/*: string */ = element;
		    return function format () { return value }
		  }

		  var id = element[0];
		  var type = element[1];

		  if (parent && element[0] === '#') {
		    id = parent[0];
		    var offset = parent[2];
		    var formatter = (types.number || defaults.number)([id, 'number'], locale);
		    return function format (args) {
		      return formatter(getArg(id, args) - offset, args)
		    }
		  }

		  // pre-process children
		  var children;
		  if (type === 'plural' || type === 'selectordinal') {
		    children = {};
		    Object.keys(element[3]).forEach(function (key) {
		      children[key] = interpretAST(element[3][key], element, locale, types, join);
		    });
		    element = [element[0], element[1], element[2], children];
		  } else if (element[2] && typeof element[2] === 'object') {
		    children = {};
		    Object.keys(element[2]).forEach(function (key) {
		      children[key] = interpretAST(element[2][key], element, locale, types, join);
		    });
		    element = [element[0], element[1], children];
		  }

		  var getFrmt = type && (types[type] || defaults[type]);
		  if (getFrmt) {
		    var frmt = getFrmt(element, locale);
		    return function format (args) {
		      return frmt(getArg(id, args), args)
		    }
		  }

		  return join
		    ? function format (args) { return String(getArg(id, args)) }
		    : function format (args) { return getArg(id, args) }
		}

		function getArg (id/*: string */, args/*: ?Object */)/*: any */ {
		  if (args && (id in args)) return args[id]
		  var parts = id.split('.');
		  var a = args;
		  for (var i = 0, ii = parts.length; a && i < ii; ++i) {
		    a = a[parts[i]];
		  }
		  return a
		}

		function interpretNumber (element/*: Placeholder */, locales/*: Locales */) {
		  var style = element[2];
		  var options = formats.number[style] || formats.parseNumberPattern(style) || formats.number.default;
		  return new Intl.NumberFormat(locales, options).format
		}

		function interpretDuration (element/*: Placeholder */, locales/*: Locales */) {
		  var style = element[2];
		  var options = formats.duration[style] || formats.duration.default;
		  var fs = new Intl.NumberFormat(locales, options.seconds).format;
		  var fm = new Intl.NumberFormat(locales, options.minutes).format;
		  var fh = new Intl.NumberFormat(locales, options.hours).format;
		  var sep = /^fi$|^fi-|^da/.test(String(locales)) ? '.' : ':';

		  return function (s, args) {
		    s = +s;
		    if (!isFinite(s)) return fs(s)
		    var h = ~~(s / 60 / 60); // ~~ acts much like Math.trunc
		    var m = ~~(s / 60 % 60);
		    var dur = (h ? (fh(Math.abs(h)) + sep) : '') +
		      fm(Math.abs(m)) + sep + fs(Math.abs(s % 60));
		    return s < 0 ? fh(-1).replace(fh(1), dur) : dur
		  }
		}

		function interpretDateTime (element/*: Placeholder */, locales/*: Locales */) {
		  var type = element[1];
		  var style = element[2];
		  var options = formats[type][style] || formats.parseDatePattern(style) || formats[type].default;
		  return new Intl.DateTimeFormat(locales, options).format
		}

		function interpretPlural (element/*: Placeholder */, locales/*: Locales */) {
		  var type = element[1];
		  var pluralType = type === 'selectordinal' ? 'ordinal' : 'cardinal';
		  var offset = element[2];
		  var children = element[3];
		  var pluralRules;
		  if (Intl.PluralRules && Intl.PluralRules.supportedLocalesOf(locales).length > 0) {
		    pluralRules = new Intl.PluralRules(locales, { type: pluralType });
		  } else {
		    var locale = lookupClosestLocale(locales, plurals);
		    var select = (locale && plurals[locale][pluralType]) || returnOther;
		    pluralRules = { select: select };
		  }

		  return function (value, args) {
		    var clause =
		      children['=' + +value] ||
		      children[pluralRules.select(value - offset)] ||
		      children.other;
		    return clause(args)
		  }
		}

		function returnOther (/*:: n:number */) { return 'other' }

		function interpretSelect (element/*: Placeholder */, locales/*: Locales */) {
		  var children = element[2];
		  return function (value, args) {
		    var clause = children[value] || children.other;
		    return clause(args)
		  }
		}

		var defaults/*: Types */ = {
		  number: interpretNumber,
		  ordinal: interpretNumber, // TODO: support rbnf
		  spellout: interpretNumber, // TODO: support rbnf
		  duration: interpretDuration,
		  date: interpretDateTime,
		  time: interpretDateTime,
		  plural: interpretPlural,
		  selectordinal: interpretPlural,
		  select: interpretSelect
		};
		exports.types = defaults; 
	} (formatMessageInterpret, formatMessageInterpret.exports));
	return formatMessageInterpret.exports;
}

var hasRequiredFormatMessage;

function requireFormatMessage () {
	if (hasRequiredFormatMessage) return formatMessage$1.exports;
	hasRequiredFormatMessage = 1;
	(function (module, exports) {
		var parse = requireFormatMessageParse();
		var interpret = requireFormatMessageInterpret();
		var plurals = requirePlurals();
		var lookupClosestLocale = requireLookupClosestLocale();
		var origFormats = requireFormatMessageFormats();

		/*::
		import type { Types } from 'format-message-interpret'
		type Locale = string
		type Locales = Locale | Locale[]
		type Message = string | {|
		  id?: string,
		  default: string,
		  description?: string
		|}
		type Translations = { [string]: ?{ [string]: string | Translation } }
		type Translation = {
		  message: string,
		  format?: (args?: Object) => string,
		  toParts?: (args?: Object) => any[],
		}
		type Replacement = ?string | (string, string, locales?: Locales) => ?string
		type GenerateId = (string) => string
		type MissingTranslation = 'ignore' | 'warning' | 'error'
		type FormatObject = { [string]: * }
		type Options = {
		  locale?: Locales,
		  translations?: ?Translations,
		  generateId?: GenerateId,
		  missingReplacement?: Replacement,
		  missingTranslation?: MissingTranslation,
		  formats?: {
		    number?: FormatObject,
		    date?: FormatObject,
		    time?: FormatObject
		  },
		  types?: Types
		}
		type Setup = {|
		  locale: Locales,
		  translations: Translations,
		  generateId: GenerateId,
		  missingReplacement: Replacement,
		  missingTranslation: MissingTranslation,
		  formats: {
		    number: FormatObject,
		    date: FormatObject,
		    time: FormatObject
		  },
		  types: Types
		|}
		type FormatMessage = {
		  (msg: Message, args?: Object, locales?: Locales): string,
		  rich (msg: Message, args?: Object, locales?: Locales): any[],
		  setup (opt?: Options): Setup,
		  number (value: number, style?: string, locales?: Locales): string,
		  date (value: number | Date, style?: string, locales?: Locales): string,
		  time (value: number | Date, style?: string, locales?: Locales): string,
		  select (value: any, options: Object): any,
		  custom (placeholder: any[], locales: Locales, value: any, args: Object): any,
		  plural (value: number, offset: any, options: any, locale: any): any,
		  selectordinal (value: number, offset: any, options: any, locale: any): any,
		  namespace (): FormatMessage
		}
		*/

		function assign/*:: <T: Object> */ (target/*: T */, source/*: Object */) {
		  Object.keys(source).forEach(function (key) { target[key] = source[key]; });
		  return target
		}

		function namespace ()/*: FormatMessage */ {
		  var formats = assign({}, origFormats);
		  var currentLocales/*: Locales */ = 'en';
		  var translations/*: Translations */ = {};
		  var generateId/*: GenerateId */ = function (pattern) { return pattern };
		  var missingReplacement/*: Replacement */ = null;
		  var missingTranslation/*: MissingTranslation */ = 'warning';
		  var types/*: Types */ = {};

		  function formatMessage (msg/*: Message */, args/*:: ?: Object */, locales/*:: ?: Locales */) {
		    var pattern = typeof msg === 'string' ? msg : msg.default;
		    var id = (typeof msg === 'object' && msg.id) || generateId(pattern);
		    var translated = translate(pattern, id, locales || currentLocales);
		    var format = translated.format || (
		      translated.format = interpret(parse(translated.message), locales || currentLocales, types)
		    );
		    return format(args)
		  }

		  formatMessage.rich = function rich (msg/*: Message */, args/*:: ?: Object */, locales/*:: ?: Locales */) {
		    var pattern = typeof msg === 'string' ? msg : msg.default;
		    var id = (typeof msg === 'object' && msg.id) || generateId(pattern);
		    var translated = translate(pattern, id, locales || currentLocales);
		    var format = translated.toParts || (
		      translated.toParts = interpret.toParts(parse(translated.message, { tagsType: tagsType }), locales || currentLocales, types)
		    );
		    return format(args)
		  };

		  var tagsType = '<>';
		  function richType (node/*: any[] */, locales/*: Locales */) {
		    var style = node[2];
		    return function (fn, args) {
		      var props = typeof style === 'object' ? mapObject(style, args) : style;
		      return typeof fn === 'function' ? fn(props) : fn
		    }
		  }
		  types[tagsType] = richType;

		  function mapObject (object/* { [string]: (args?: Object) => any } */, args/*: ?Object */) {
		    return Object.keys(object).reduce(function (mapped, key) {
		      mapped[key] = object[key](args);
		      return mapped
		    }, {})
		  }

		  function translate (pattern/*: string */, id/*: string */, locales/*: Locales */)/*: Translation */ {
		    var locale = lookupClosestLocale(locales, translations) || 'en';
		    var messages = translations[locale] || (translations[locale] = {});
		    var translated = messages[id];
		    if (typeof translated === 'string') {
		      translated = messages[id] = { message: translated };
		    }
		    if (!translated) {
		      var message = 'Translation for "' + id + '" in "' + locale + '" is missing';
		      if (missingTranslation === 'warning') {
		        /* istanbul ignore else */
		        if (typeof console !== 'undefined') console.warn(message);
		      } else if (missingTranslation !== 'ignore') { // 'error'
		        throw new Error(message)
		      }
		      var replacement = typeof missingReplacement === 'function'
		        ? missingReplacement(pattern, id, locale) || pattern
		        : missingReplacement || pattern;
		      translated = messages[id] = { message: replacement };
		    }
		    return translated
		  }

		  formatMessage.setup = function setup (opt/*:: ?: Options */) {
		    opt = opt || {};
		    if (opt.locale) currentLocales = opt.locale;
		    if ('translations' in opt) translations = opt.translations || {};
		    if (opt.generateId) generateId = opt.generateId;
		    if ('missingReplacement' in opt) missingReplacement = opt.missingReplacement;
		    if (opt.missingTranslation) missingTranslation = opt.missingTranslation;
		    if (opt.formats) {
		      if (opt.formats.number) assign(formats.number, opt.formats.number);
		      if (opt.formats.date) assign(formats.date, opt.formats.date);
		      if (opt.formats.time) assign(formats.time, opt.formats.time);
		    }
		    if (opt.types) {
		      types = opt.types;
		      types[tagsType] = richType;
		    }
		    return {
		      locale: currentLocales,
		      translations: translations,
		      generateId: generateId,
		      missingReplacement: missingReplacement,
		      missingTranslation: missingTranslation,
		      formats: formats,
		      types: types
		    }
		  };

		  formatMessage.number = function (value/*: number */, style/*:: ?: string */, locales/*:: ?: Locales */) {
		    var options = (style && formats.number[style]) ||
		      formats.parseNumberPattern(style) ||
		      formats.number.default;
		    return new Intl.NumberFormat(locales || currentLocales, options).format(value)
		  };

		  formatMessage.date = function (value/*:: ?: number | Date */, style/*:: ?: string */, locales/*:: ?: Locales */) {
		    var options = (style && formats.date[style]) ||
		      formats.parseDatePattern(style) ||
		      formats.date.default;
		    return new Intl.DateTimeFormat(locales || currentLocales, options).format(value)
		  };

		  formatMessage.time = function (value/*:: ?: number | Date */, style/*:: ?: string */, locales/*:: ?: Locales */) {
		    var options = (style && formats.time[style]) ||
		      formats.parseDatePattern(style) ||
		      formats.time.default;
		    return new Intl.DateTimeFormat(locales || currentLocales, options).format(value)
		  };

		  formatMessage.select = function (value/*: any */, options/*: Object */) {
		    return options[value] || options.other
		  };

		  formatMessage.custom = function (placeholder/*: any[] */, locales/*: Locales */, value/*: any */, args/*: Object */) {
		    if (!(placeholder[1] in types)) return value
		    return types[placeholder[1]](placeholder, locales)(value, args)
		  };

		  formatMessage.plural = plural.bind(null, 'cardinal');
		  formatMessage.selectordinal = plural.bind(null, 'ordinal');
		  function plural (
		    pluralType/*: 'cardinal' | 'ordinal' */,
		    value/*: number */,
		    offset/*: any */,
		    options/*: any */,
		    locale/*: any */
		  ) {
		    if (typeof offset === 'object' && typeof options !== 'object') { // offset is optional
		      locale = options;
		      options = offset;
		      offset = 0;
		    }
		    var closest = lookupClosestLocale(locale || currentLocales, plurals);
		    var plural = (closest && plurals[closest][pluralType]) || returnOther;
		    return options['=' + +value] || options[plural(value - offset)] || options.other
		  }
		  function returnOther (/*:: n:number */) { return 'other' }

		  formatMessage.namespace = namespace;

		  return formatMessage
		}

		module.exports = namespace(); 
	} (formatMessage$1));
	return formatMessage$1.exports;
}

var formatMessageExports = requireFormatMessage();
var defaultFormatMessage = /*@__PURE__*/getDefaultExportFromCjs(formatMessageExports);

function _createForOfIteratorHelper$1(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray$1(r)) || e) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: true } : { done: false, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = true, u = false; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = true, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray$1(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray$1(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$1(r, a) : void 0; } }
function _arrayLikeToArray$1(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
// xcratch-multi-serial / serialChannel.js
//
// 「シリアル通信 1」〜「シリアル通信 8」の 1 つぶん。
// 開いた SerialPort から読み続け、行に区切って溜めておく。
// 届いたバイトも、文字に戻す前の形で別に溜めておく (「1バイト読む」用)。
//
// どのポートを開くか (ダイアログ・番号どうしの重複) はここでは決めない。
// それは index.js の仕事で、ここは渡されたポートを開いて読むだけ。
//
// 決め事の出典はすべて docs/xcratch-multi-serial-blocks-spec.md の「4. 受信の作り」。

/**
 * 区切り終わった行をいくつまで溜めるか。上限に達したら古い方から捨てる。
 * @type {number}
 */
var LINE_LIMIT = 1000;

/**
 * 区切りが来ないまま溜まった文字列の上限。超えたら古い方から捨てる。
 * @type {number}
 */
var PENDING_LIMIT = 4096;

/**
 * 読んでいないバイトをいくつまで溜めるか。超えたら古い方から捨てる。
 * @type {number}
 */
var BYTE_LIMIT = 4096;

/**
 * 行の区切りが「改行」であることを表す値。
 * 改行だけは LF・CR・CR+LF のどれも 1 つの行の終わりとして扱うので、文字ではなく印で持つ。
 * @type {string}
 */
var NEWLINE = 'NEWLINE';
var SerialChannel = /*#__PURE__*/function () {
  /**
   * @param {Function} onLost - 開いている途中で切れたとき (ケーブルを抜いたなど) に呼ぶ
   */
  function SerialChannel(onLost) {
    _classCallCheck$1(this, SerialChannel);
    this._onLost = onLost;

    /**
     * 開いているあいだの持ち物 (ポート・リーダ・読み出しのループ)。閉じていれば null。
     *
     * 1 回開くごとに作り直す。抜けた直後にすぐ開始し直すと、古いポートの後始末と
     * 新しいポートの読み出しが重なるので、互いの持ち物を取り違えないよう分けておく。
     * @type {?{port: SerialPort, reader: ?ReadableStreamDefaultReader, loop: ?Promise, stopping: boolean}}
     */
    this._session = null;

    /** @type {string} 行の区切り。NEWLINE か、区切りに使う文字列 */
    this.delimiter = NEWLINE;
    this.clear();
  }

  /**
   * 受信済みのものをすべて捨てる。
   * @returns {void}
   */
  return _createClass$1(SerialChannel, [{
    key: "clear",
    value: function clear() {
      /** @type {Array<string>} 区切り終わった行。古い順 */
      this.lines = [];
      /** @type {string} 最後に区切り終わった行 */
      this.latest = '';
      /** @type {Map<string, string>} 「名前:値」の表。名前は小文字にして持つ */
      this.values = new Map();
      /** @type {Array<number>} 読んでいないバイト (0〜255)。古い順。行とは別に溜める */
      this.bytes = [];
      this._pending = '';
      this._skipLF = false;
    }

    /**
     * @returns {?SerialPort} 開いているポート。閉じていれば null
     */
  }, {
    key: "port",
    get: function get() {
      return this._session ? this._session.port : null;
    }

    /**
     * @returns {boolean} 開いて読んでいる最中なら true
     */
  }, {
    key: "isOpen",
    value: function isOpen() {
      return this._session !== null;
    }

    /**
     * ポートを開いて読み始める。失敗したら投げる (呼んだ側が状態を決める)。
     * @param {SerialPort} port - 開くポート
     * @param {number} baudRate - ボーレート
     * @returns {Promise<void>} 開き終わったら解決する
     */
  }, {
    key: "start",
    value: (function () {
      var _start = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee(port, baudRate) {
        var session;
        return _regeneratorRuntime.wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 1;
              return port.open({
                baudRate: baudRate,
                dataBits: 8,
                stopBits: 1,
                parity: 'none',
                flowControl: 'none'
              });
            case 1:
              this._pending = '';
              this._skipLF = false;
              // 開いた直後の最初の行は捨てる。相手が送っている途中に開くと、
              // 最初の行は途中から始まって壊れた値になるため。
              this._discardFirst = true;
              // 日本語などの文字が受信の切れ目で 2 回に分かれても化けないよう、
              // stream: true で続きを持ち越しながら文字へ戻す。
              this._decoder = new TextDecoder('utf-8');
              session = {
                port: port,
                reader: null,
                loop: null,
                stopping: false
              };
              this._session = session;
              session.loop = this._readLoop(session);
            case 2:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function start(_x, _x2) {
        return _start.apply(this, arguments);
      }
      return start;
    }()
    /**
     * 読むのをやめてポートを閉じる。受信済みのものは残す。
     * @returns {Promise<void>} 閉じ終わったら解決する
     */
    )
  }, {
    key: "stop",
    value: (function () {
      var _stop = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
        var session;
        return _regeneratorRuntime.wrap(function (_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              session = this._session;
              if (session) {
                _context2.next = 1;
                break;
              }
              return _context2.abrupt("return");
            case 1:
              this._session = null;
              _context2.next = 2;
              return this._release(session);
            case 2:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function stop() {
        return _stop.apply(this, arguments);
      }
      return stop;
    }()
    /**
     * そのポートが切れたことを知らせる (navigator.serial の disconnect イベントから)。
     * 開いているのが別のポートなら何もしない。
     * @param {SerialPort} port - 切れたポート
     * @returns {void}
     */
    )
  }, {
    key: "portLost",
    value: function portLost(port) {
      if (this._session && this._session.port === port) this._lost(this._session);
    }

    /**
     * 開いている途中で切れた。後始末をして知らせる。
     * disconnect イベントと読み出しのループの終わりの両方から来るので、2 回目は何もしない。
     * @param {object} session - 切れたときの持ち物
     * @returns {void}
     */
  }, {
    key: "_lost",
    value: function _lost(session) {
      if (this._session !== session) return;
      this._session = null;
      this._onLost();
      this._release(session);
    }

    /**
     * 読み出しを止めてポートを閉じる。
     * @param {object} session - 閉じる持ち物
     * @returns {Promise<void>} 閉じ終わったら解決する
     */
  }, {
    key: "_release",
    value: (function () {
      var _release2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee3(session) {
        return _regeneratorRuntime.wrap(function (_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              session.stopping = true;
              if (!session.reader) {
                _context3.next = 4;
                break;
              }
              _context3.prev = 1;
              _context3.next = 2;
              return session.reader.cancel();
            case 2:
              _context3.next = 4;
              break;
            case 3:
              _context3.prev = 3;
              _context3["catch"](1);
            case 4:
              if (!session.loop) {
                _context3.next = 5;
                break;
              }
              _context3.next = 5;
              return session.loop;
            case 5:
              _context3.prev = 5;
              _context3.next = 6;
              return session.port.close();
            case 6:
              _context3.next = 8;
              break;
            case 7:
              _context3.prev = 7;
              _context3["catch"](5);
            case 8:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[1, 3], [5, 7]]);
      }));
      function _release(_x3) {
        return _release2.apply(this, arguments);
      }
      return _release;
    }()
    /**
     * 行の区切りを変える。それより後に区切る分から効く。
     * @param {string} delimiter - NEWLINE か、区切りに使う文字列
     * @returns {void}
     */
    )
  }, {
    key: "setDelimiter",
    value: function setDelimiter(delimiter) {
      this.delimiter = delimiter || NEWLINE;
      this._skipLF = false;
    }

    /**
     * 溜まっている行を古い方から 1 つ取り出す。
     * @returns {string} 行。無ければ空文字
     */
  }, {
    key: "takeLine",
    value: function takeLine() {
      return this.lines.length > 0 ? this.lines.shift() : '';
    }

    /**
     * 溜まっているバイトを古い方から 1 つ取り出す。
     * @returns {number} 0〜255。無ければ -1 (0 と見分けられるように。C の Serial.read() と同じ)
     */
  }, {
    key: "takeByte",
    value: function takeByte() {
      return this.bytes.length > 0 ? this.bytes.shift() : -1;
    }

    /**
     * 「名前:値」の値を引く。
     * @param {string} name - 名前。大文字と小文字は区別しない
     * @returns {string} 値。まだ届いていなければ空文字
     */
  }, {
    key: "valueOf",
    value: function valueOf(name) {
      var value = this.values.get(name.trim().toLowerCase());
      return typeof value === 'undefined' ? '' : value;
    }

    /**
     * 読み出しのループ。止められるか、ポートが使えなくなるまで回る。
     *
     * パリティ誤りなどの軽いエラーでは port.readable が作り直されるので、
     * リーダを取り直して続ける。抜けたときは port.readable が null になって抜ける。
     * @param {object} session - 読む持ち物
     * @returns {Promise<void>} ループが終わったら解決する
     */
  }, {
    key: "_readLoop",
    value: (function () {
      var _readLoop2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee4(session) {
        var port, _yield$session$reader, value, done, _t3;
        return _regeneratorRuntime.wrap(function (_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              port = session.port;
            case 1:
              if (!(port.readable && !session.stopping)) {
                _context4.next = 11;
                break;
              }
              session.reader = port.readable.getReader();
              _context4.prev = 2;
            case 3:
              _context4.next = 4;
              return session.reader.read();
            case 4:
              _yield$session$reader = _context4.sent;
              value = _yield$session$reader.value;
              done = _yield$session$reader.done;
              if (!done) {
                _context4.next = 5;
                break;
              }
              return _context4.abrupt("continue", 7);
            case 5:
              // 止めにかかった後に届いた分は、次に開いたポートのものと混ざるので捨てる
              if (value && !session.stopping) {
                this._feedBytes(value);
                this._feed(this._decoder.decode(value, {
                  stream: true
                }));
              }
            case 6:
              _context4.next = 3;
              break;
            case 7:
              _context4.next = 9;
              break;
            case 8:
              _context4.prev = 8;
              _t3 = _context4["catch"](2);
              if (!session.stopping) console.warn('[multiSerial] read error:', _t3);
            case 9:
              _context4.prev = 9;
              session.reader.releaseLock();
              session.reader = null;
              return _context4.finish(9);
            case 10:
              _context4.next = 1;
              break;
            case 11:
              // 止めたのではないのに抜けた = 切れた
              if (!session.stopping) this._lost(session);
            case 12:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this, [[2, 8, 9, 10]]);
      }));
      function _readLoop(_x4) {
        return _readLoop2.apply(this, arguments);
      }
      return _readLoop;
    }()
    /**
     * 届いたバイトをそのまま溜める。行と違い、開始した直後にも捨てない
     * (バイナリには区切りが無く、どこまで捨てればよいか決められないため)。
     * @param {Uint8Array} chunk - 届いたバイト
     * @returns {void}
     */
    )
  }, {
    key: "_feedBytes",
    value: function _feedBytes(chunk) {
      var _iterator = _createForOfIteratorHelper$1(chunk),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var byte = _step.value;
          this.bytes.push(byte);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      if (this.bytes.length > BYTE_LIMIT) this.bytes.splice(0, this.bytes.length - BYTE_LIMIT);
    }

    /**
     * 届いた文字列を区切って溜める。
     * @param {string} text - 届いた文字列
     * @returns {void}
     */
  }, {
    key: "_feed",
    value: function _feed(text) {
      var delimiter = this.delimiter;
      var _iterator2 = _createForOfIteratorHelper$1(text),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var ch = _step2.value;
          if (delimiter === NEWLINE) {
            // CR+LF を 1 つの行の終わりにする。CR と LF が別々の受信に
            // 分かれて届いても空行ができないよう、CR の後かどうかを持ち越す。
            if (this._skipLF) {
              this._skipLF = false;
              if (ch === '\n') continue;
            }
            if (ch === '\r' || ch === '\n') {
              this._skipLF = ch === '\r';
              this._endLine();
              continue;
            }
            this._pending += ch;
          } else {
            this._pending += ch;
            if (this._pending.endsWith(delimiter)) {
              this._pending = this._pending.slice(0, -delimiter.length);
              this._endLine();
              continue;
            }
          }
          if (this._pending.length > PENDING_LIMIT) {
            this._pending = this._pending.slice(-PENDING_LIMIT);
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }

    /**
     * 途中の文字列を 1 行として確定する。
     * @returns {void}
     */
  }, {
    key: "_endLine",
    value: function _endLine() {
      // 末尾の空白は取り除く。MakeCode の「1行書き出す」は、行を 32 バイトの区切りに
      // 揃えるため末尾に空白を詰めて送るので、残すと (1行読む) = A が成り立たない。
      var line = this._pending.replace(/ +$/, '');
      this._pending = '';
      if (this._discardFirst) {
        this._discardFirst = false;
        return;
      }
      this.lines.push(line);
      if (this.lines.length > LINE_LIMIT) this.lines.shift();
      this.latest = line;
      this._parseValue(line);
    }

    /**
     * 「名前:値」「名前=値」の形なら表を更新する。最初に現れた : か = で分ける。
     * @param {string} line - 行
     * @returns {void}
     */
  }, {
    key: "_parseValue",
    value: function _parseValue(line) {
      var at = line.search(/[:=]/);
      if (at < 0) return;
      var name = line.slice(0, at).trim().toLowerCase();
      if (name === '') return;
      this.values.set(name, line.slice(at + 1).trim());
    }
  }]);
}();

// このファイルは xcratch/scripts/embed-icons.mjs が作る。手で直さない。
//
// 中身は scratch-gui/src/lib/libraries/extensions/multiserial/ の SVG を
// base64 の data URI にしたもの。SVG を直したら、xcratch/ で
//   node ./scripts/embed-icons.mjs
// を走らせ、この生成物と docs/multiserial.mjs を一緒にコミットすること。

/**
 * ブロックの頭の絵。元は block-icon.svg。
 * @type {string}
 */
var blockIconURI = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIH' + 'dpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48ZyBmaWxsPSJub25lIiBzdH' + 'Jva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm' + '9rZS1saW5lam9pbj0icm91bmQiPjxyZWN0IHg9IjQiIHk9IjUiIHdpZHRoPSIxMCIgaGVpZ2h0PSI3Ii' + 'ByeD0iMS41Ii8+PHJlY3QgeD0iNCIgeT0iMTYuNSIgd2lkdGg9IjEwIiBoZWlnaHQ9IjciIHJ4PSIxLj' + 'UiLz48cmVjdCB4PSI0IiB5PSIyOCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjciIHJ4PSIxLjUiLz48cGF0aC' + 'BkPSJNMTQgOC41IEMxOSA4LjUgMTkgMTcgMjQgMTciLz48cGF0aCBkPSJNMTQgMjAgTDI0IDIwIi8+PH' + 'BhdGggZD0iTTE0IDMxLjUgQzE5IDMxLjUgMTkgMjMgMjQgMjMiLz48cmVjdCB4PSIyNCIgeT0iMTMiIH' + 'dpZHRoPSIxMiIgaGVpZ2h0PSIxNCIgcng9IjIiLz48L2c+PC9zdmc+Cg==';

/**
 * カテゴリ一覧の絵。元は menu-icon.svg。
 * @type {string}
 */
var menuIconURI = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIH' + 'dpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48Y2lyY2xlIGN4PSIyMCIgY3' + 'k9IjIwIiByPSIxOSIgZmlsbD0iIzVDNkU4MCIgc3Ryb2tlPSIjNDU1MzYwIiBzdHJva2Utd2lkdGg9Ij' + 'IiLz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2IDYpIHNjYWxlKDAuNykiPjxnIGZpbGw9Im5vbmUiIH' + 'N0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIyLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3' + 'Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHJlY3QgeD0iNCIgeT0iNSIgd2lkdGg9IjEwIiBoZWlnaHQ9Ij' + 'ciIHJ4PSIxLjUiLz48cmVjdCB4PSI0IiB5PSIxNi41IiB3aWR0aD0iMTAiIGhlaWdodD0iNyIgcng9Ij' + 'EuNSIvPjxyZWN0IHg9IjQiIHk9IjI4IiB3aWR0aD0iMTAiIGhlaWdodD0iNyIgcng9IjEuNSIvPjxwYX' + 'RoIGQ9Ik0xNCA4LjUgQzE5IDguNSAxOSAxNyAyNCAxNyIvPjxwYXRoIGQ9Ik0xNCAyMCBMMjQgMjAiLz' + '48cGF0aCBkPSJNMTQgMzEuNSBDMTkgMzEuNSAxOSAyMyAyNCAyMyIvPjxyZWN0IHg9IjI0IiB5PSIxMy' + 'Igd2lkdGg9IjEyIiBoZWlnaHQ9IjE0IiByeD0iMiIvPjwvZz48L2c+PC9zdmc+Cg==';

function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: true } : { done: false, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = true, u = false; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = true, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }

/**
 * 拡張 ID。次の 3 つと同じ値にすること。
 *   - Xcratch 版の entry の extensionId (xcratch/src/gui/lib/libraries/extensions/entry/index.jsx)
 *   - デスクトップ版の builtinExtensions のキー (scratch-vm/src/extension-support/extension-manager.js)
 *   - デスクトップ版のカードの extensionId (scratch-gui/src/lib/libraries/extensions/index.jsx)
 *
 * ⚠ 作品に書き込まれるので、公開したら二度と変えられない。
 *   ハットブロックの opcode (`multiSerial_whenReceived`) の頭にも付く。
 * @type {string}
 */
var EXTENSION_ID = 'multiSerial';

/**
 * このモジュールの公開 URL。Xcratch 版の entry の extensionURL と同じ値。
 * デスクトップ版では使わない (拡張は本体に組み込まれていて、URL から読まない)。
 *
 * ⚠ 公開したら二度と変えられない。Xcratch は作品にこの URL を書き込み、
 *   次に開くときここから読み直す。変えると、変える前に保存された作品が開けなくなる。
 * @type {string}
 */
var EXTENSION_URL = 'https://tarosay.github.io/xcratch-multi-serial/multiserial.mjs';

/**
 * 同時に扱えるシリアル通信の数。番号は 1 からこの数まで。
 * @type {number}
 */
var CHANNEL_COUNT = 8;

/**
 * ハットブロックを起こしに行く間隔 (ms)。Scratch の 1 フレーム (約 33ms) と同じ程度。
 * 見るのは手元に溜まった行だけなので、通信は起きない。
 * @type {number}
 */
var HAT_INTERVAL_MS = 33;

/**
 * ブロックの色 [本体, 入力欄・メニュー, 枠線]。
 *
 * 本体の #5C6E80 は打ち合わせで決めた色。残りの 2 つは、scratch-vm の既定の緑
 * (#0FBD8C → #0DA57A → #0B8E69) と同じ比率 (0.873 倍・0.751 倍) で暗くした。
 * @type {Array<string>}
 */
var COLORS = ['#5C6E80', '#506070', '#455360'];

/**
 * ボーレートのメニュー。よく使うものを並べているだけで、変数から任意の値も渡せる。
 * @type {Array<string>}
 */
var BAUD_ITEMS = ['1200', '2400', '4800', '9600', '19200', '38400', '57600', '115200'];

/**
 * 区切りのメニューの値と、その中身。NEWLINE は serialChannel.js が特別に扱う。
 * メニューに無い値 (はめ込んだ変数など) は、その文字列をそのまま区切りに使う。
 * @type {object}
 */
var DELIMITER_CHARS = {
  NEWLINE: NEWLINE,
  COMMA: ',',
  TAB: '\t',
  SPACE: ' ',
  COLON: ':',
  SEMICOLON: ';'
};

/**
 * 表示中の言語を知るための formatMessage。
 * Xcratch は読み込み時に自分の formatMessage を渡してくるので、来たら差し替える
 * (お手本の index.js と同じ。拡張の中の format-message は GUI のものと別物なので)。
 * @type {Function}
 */
var formatMessage = defaultFormatMessage;

/**
 * 文言。キーごとに ja / ja-Hira / en を持つ。
 * @type {object}
 */
var message = {
  // カテゴリの見出し。Xcratch 版の entry の訳文 (translations.json) と、
  // デスクトップ版のカードの訳文 (scratch-gui/.../multiserial/messages.js) と同じ文言
  extensionName: {
    'ja': 'マルチシリアル接続',
    'ja-Hira': 'マルチシリアルせつぞく',
    'en': 'Multi Serial Connection'
  },
  openChannel: {
    'ja': 'シリアル通信 [CH] を ボーレート [BAUD] で開始する',
    'ja-Hira': 'シリアルつうしん [CH] を ボーレート [BAUD] で かいしする',
    'en': 'start serial [CH] at [BAUD] baud'
  },
  closeChannel: {
    'ja': 'シリアル通信 [CH] を終了する',
    'ja-Hira': 'シリアルつうしん [CH] を しゅうりょうする',
    'en': 'stop serial [CH]'
  },
  isOpen: {
    'ja': 'シリアル通信 [CH] は開始されている',
    'ja-Hira': 'シリアルつうしん [CH] は かいし されている',
    'en': 'serial [CH] started?'
  },
  channelState: {
    'ja': 'シリアル通信 [CH] の状態',
    'ja-Hira': 'シリアルつうしん [CH] の じょうたい',
    'en': 'state of serial [CH]'
  },
  // 行が届いたときだけ動くことが分かるよう「1行」を入れている (バイトでは動かない)
  whenReceived: {
    'ja': 'シリアル通信 [CH] で1行受け取ったとき',
    'ja-Hira': 'シリアルつうしん [CH] で 1ぎょう うけとったとき',
    'en': 'when serial [CH] receives a line'
  },
  readLine: {
    'ja': 'シリアル通信 [CH] から1行読む',
    'ja-Hira': 'シリアルつうしん [CH] から 1ぎょう よむ',
    'en': 'read a line from serial [CH]'
  },
  latestLine: {
    'ja': 'シリアル通信 [CH] の最新の行',
    'ja-Hira': 'シリアルつうしん [CH] の さいしんの ぎょう',
    'en': 'latest line of serial [CH]'
  },
  namedValue: {
    'ja': 'シリアル通信 [CH] の [NAME] の値',
    'ja-Hira': 'シリアルつうしん [CH] の [NAME] の あたい',
    'en': 'value of [NAME] from serial [CH]'
  },
  // 「バイトが届いている」と取り違えないよう「1行」を入れている。
  // もとは「受信データがある」で、実際に取り違えた (仕様書「2. ブロック」の受信)
  hasData: {
    'ja': 'シリアル通信 [CH] に1行届いている',
    'ja-Hira': 'シリアルつうしん [CH] に 1ぎょう とどいている',
    'en': 'serial [CH] has a line?'
  },
  hasByte: {
    'ja': 'シリアル通信 [CH] にバイトが届いている',
    'ja-Hira': 'シリアルつうしん [CH] に バイトが とどいている',
    'en': 'serial [CH] has bytes?'
  },
  readByte: {
    'ja': 'シリアル通信 [CH] から1バイト読む',
    'ja-Hira': 'シリアルつうしん [CH] から 1バイト よむ',
    'en': 'read a byte from serial [CH]'
  },
  clearData: {
    'ja': 'シリアル通信 [CH] の受信データを捨てる',
    'ja-Hira': 'シリアルつうしん [CH] の じゅしんデータを すてる',
    'en': 'clear received data of serial [CH]'
  },
  setLineDelimiter: {
    'ja': 'シリアル通信 [CH] の行の区切りを [DELIM] にする',
    'ja-Hira': 'シリアルつうしん [CH] の ぎょうの くぎりを [DELIM] にする',
    'en': 'set line delimiter of serial [CH] to [DELIM]'
  },
  itemOf: {
    'ja': '[TEXT] を [DELIM] で区切った [N] 番目',
    'ja-Hira': '[TEXT] を [DELIM] で くぎった [N] ばんめ',
    'en': 'item [N] of [TEXT] split by [DELIM]'
  },
  itemCount: {
    'ja': '[TEXT] を [DELIM] で区切った項目の数',
    'ja-Hira': '[TEXT] を [DELIM] で くぎった こうもくの かず',
    'en': 'number of items in [TEXT] split by [DELIM]'
  },
  numberIn: {
    'ja': '[TEXT] の中の数値',
    'ja-Hira': '[TEXT] の なかの すうち',
    'en': 'number in [TEXT]'
  },
  splitToList: {
    'ja': '[TEXT] を [DELIM] で区切ってリスト [LIST] に入れる',
    'ja-Hira': '[TEXT] を [DELIM] で くぎって リスト [LIST] に いれる',
    'en': 'split [TEXT] by [DELIM] into list [LIST]'
  },
  // ── 区切りのメニュー ──
  delimNewline: {
    'ja': '改行',
    'ja-Hira': 'かいぎょう',
    'en': 'newline'
  },
  delimComma: {
    'ja': 'カンマ',
    'ja-Hira': 'カンマ',
    'en': 'comma'
  },
  delimTab: {
    'ja': 'タブ',
    'ja-Hira': 'タブ',
    'en': 'tab'
  },
  delimSpace: {
    'ja': 'スペース',
    'ja-Hira': 'スペース',
    'en': 'space'
  },
  delimColon: {
    'ja': 'コロン',
    'ja-Hira': 'コロン',
    'en': 'colon'
  },
  delimSemicolon: {
    'ja': 'セミコロン',
    'ja-Hira': 'セミコロン',
    'en': 'semicolon'
  },
  // 作品にリストが 1 つも無いとき、メニューに出す案内
  listNone: {
    'ja': '(リストがありません)',
    'ja-Hira': '(リストが ありません)',
    'en': '(no list)'
  },
  // ── 状態 (仕様書「3. 開始・終了の動き」の表) ──
  stateNotStarted: {
    'ja': '開始していません',
    'ja-Hira': 'かいし していません',
    'en': 'not started'
  },
  stateChoosing: {
    'ja': 'ポートを選んでいます',
    'ja-Hira': 'ポートを えらんでいます',
    'en': 'choosing a port'
  },
  stateReceiving: {
    'ja': '受信中',
    'ja-Hira': 'じゅしんちゅう',
    'en': 'receiving'
  },
  stateCancelled: {
    'ja': '選ばれませんでした',
    'ja-Hira': 'えらばれませんでした',
    'en': 'no port was chosen'
  },
  stateNeedClick: {
    'ja': '画面をクリックしてください',
    'ja-Hira': 'がめんを クリックして ください',
    'en': 'click anywhere on the page'
  },
  stateDuplicate: {
    'ja': 'ほかの番号で使っています',
    'ja-Hira': 'ほかの ばんごうで つかっています',
    'en': 'in use by another number'
  },
  stateOpenFailed: {
    'ja': '開けませんでした',
    'ja-Hira': 'ひらけませんでした',
    'en': 'could not open the port'
  },
  stateDisconnected: {
    'ja': '切れました',
    'ja-Hira': 'きれました',
    'en': 'disconnected'
  },
  stateUnsupported: {
    'ja': 'このブラウザでは使えません',
    'ja-Hira': 'このブラウザでは つかえません',
    'en': 'not supported in this browser'
  }
};

/**
 * 状態の値と、その文言のキー。
 * @type {object}
 */
var STATE_TEXT = {
  notStarted: 'stateNotStarted',
  choosing: 'stateChoosing',
  receiving: 'stateReceiving',
  cancelled: 'stateCancelled',
  needClick: 'stateNeedClick',
  duplicate: 'stateDuplicate',
  openFailed: 'stateOpenFailed',
  disconnected: 'stateDisconnected',
  unsupported: 'stateUnsupported'
};
var Scratch3MultiSerial = /*#__PURE__*/function () {
  function Scratch3MultiSerial(runtime) {
    var _this = this;
    _classCallCheck$1(this, Scratch3MultiSerial);
    /**
     * The runtime instantiating this block package.
     * @type {Runtime}
     */
    this.runtime = runtime;

    // Xcratch の runtime は自分の formatMessage を持っている。
    if (runtime.formatMessage) {
      formatMessage = runtime.formatMessage;
    }

    /** @type {string} 文言の言語。getInfo() で決まる */
    this.locale = 'en';

    /**
     * シリアル通信 1〜8。添字は番号 - 1。
     * @type {Array<SerialChannel>}
     */
    this.channels = [];
    /**
     * 番号ごとの状態 (STATE_TEXT のキー)。
     * @type {Array<string>}
     */
    this.states = [];
    /**
     * 番号ごとに、開始の処理 (ダイアログ〜開く) をしている最中か。
     * 同じ番号の開始が重なると、どちらのポートが残るか分からなくなるので弾く。
     * @type {Array<boolean>}
     */
    this.busy = [];
    var _loop = function _loop(i) {
      _this.channels.push(new SerialChannel(function () {
        _this.states[i] = 'disconnected';
      }));
      _this.states.push('notStarted');
      _this.busy.push(false);
    };
    for (var i = 0; i < CHANNEL_COUNT; i++) {
      _loop(i);
    }

    // ケーブルを抜いたことを知る。イベントは抜けたポートから navigator.serial へ届き、
    // target が抜けたポートになる。
    if (typeof navigator !== 'undefined' && navigator.serial) {
      navigator.serial.addEventListener('disconnect', function (event) {
        _this.channels.forEach(function (channel) {
          return channel.portLost(event.target);
        });
      });
    }

    /**
     * ダイアログを出せずに、次のクリックを待っている「開始する」。待ち始めた順。
     * (仕様書「ダイアログを出せなかったら、次のクリックを待つ」)
     * @type {Array<{index: number, baudRate: number, resolve: Function}>}
     */
    this._clickWaiters = [];

    /**
     * まだどの「開始する」もダイアログに使っていないクリックがあるか。
     *
     * 1 回のクリックにつき、ダイアログは 1 回しか出そうとしない。1 つ目のダイアログを
     * 閉じた直後に 2 つ目を出そうとすると、実機では失敗の仕方が当てにならなかった
     * (キャンセル扱いになったり、1 つ目と同じポートが返ったりした。仕様書
     * 「ダイアログを出せなかったら、次のクリックを待つ」)。
     * @type {boolean}
     */
    this._clickUnused = false;

    // ページのどこかがクリックされたら覚えておき、待っている「開始する」があれば
    // そのダイアログを 1 つ出す。緑の旗や「開始する」ブロックのクリックもここを通る。
    //
    // capture で拾うのは、ページの部品が伝わりを止めても取りこぼさないため。
    // setTimeout(0) で一拍おくのは、止めるボタンのクリックだった場合に、
    // そちらの処理 (PROJECT_STOP_ALL で待ちを取り消す) を先に済ませるため。
    // ダイアログは操作の直後なら出せるので、一拍おいても間に合う。
    if (typeof window !== 'undefined') {
      window.addEventListener('click', function () {
        _this._clickUnused = true;
        setTimeout(function () {
          return _this._serveClickWaiter();
        }, 0);
      }, true);
    }
    // 止めるボタンで待ちを取り消す。通信そのものは閉じない (仕様書「止めるボタン」)。
    runtime.on('PROJECT_STOP_ALL', function () {
      return _this._cancelClickWaiters();
    });

    // ハットブロックは isEdgeActivated: false なので、VM は見に来ない。
    // 読まれていない行がある番号のハットを、ここから起こす。
    if (typeof setInterval === 'function') {
      setInterval(function () {
        return _this._fireHats();
      }, HAT_INTERVAL_MS);
    }
  }
  return _createClass$1(Scratch3MultiSerial, [{
    key: "_getText",
    value: function _getText(key) {
      return message[key][this.locale] || message[key].en;
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
  }, {
    key: "getInfo",
    value: function getInfo() {
      var currentLocale = formatMessage.setup().locale;
      this.locale = currentLocale in message.openChannel ? currentLocale : 'en';
      var channelArg = {
        type: ArgumentType.STRING,
        defaultValue: '1',
        menu: 'CH'
      };
      return {
        id: EXTENSION_ID,
        // Xcratch が作品に保存する読み込み元。
        extensionURL: this.constructor.extensionURL,
        name: this._getText('extensionName'),
        menuIconURI: menuIconURI,
        blockIconURI: blockIconURI,
        color1: COLORS[0],
        color2: COLORS[1],
        color3: COLORS[2],
        // ステータスボタン「！」は出さない。開始はブロックだけで行う
        // (仕様書「ステータスボタン『！』と接続モーダルは使わない」)。
        showStatusButton: false,
        blocks: [{
          opcode: 'openChannel',
          text: this._getText('openChannel'),
          blockType: BlockType.COMMAND,
          arguments: {
            CH: channelArg,
            BAUD: {
              type: ArgumentType.STRING,
              defaultValue: '115200',
              menu: 'BAUD'
            }
          }
        }, {
          opcode: 'closeChannel',
          text: this._getText('closeChannel'),
          blockType: BlockType.COMMAND,
          arguments: {
            CH: channelArg
          }
        }, {
          opcode: 'isOpen',
          text: this._getText('isOpen'),
          blockType: BlockType.BOOLEAN,
          arguments: {
            CH: channelArg
          }
        }, {
          opcode: 'channelState',
          text: this._getText('channelState'),
          blockType: BlockType.REPORTER,
          arguments: {
            CH: channelArg
          }
        }, '---', {
          // isEdgeActivated: false なので VM は毎フレーム見に来ない。
          // 起こすのは _fireHats() だけ。
          //
          // ⚠ 番号のメニューは acceptReporters: false (CH_FIELD) でなければならない。
          //   true にすると入力欄になり、startHats() の照合 (フィールドしか見ない) が効かない。
          opcode: 'whenReceived',
          text: this._getText('whenReceived'),
          blockType: BlockType.HAT,
          isEdgeActivated: false,
          arguments: {
            CH: {
              type: ArgumentType.STRING,
              defaultValue: '1',
              menu: 'CH_FIELD'
            }
          }
        }, {
          opcode: 'readLine',
          text: this._getText('readLine'),
          blockType: BlockType.REPORTER,
          arguments: {
            CH: channelArg
          }
        }, {
          opcode: 'latestLine',
          text: this._getText('latestLine'),
          blockType: BlockType.REPORTER,
          arguments: {
            CH: channelArg
          }
        }, {
          opcode: 'namedValue',
          text: this._getText('namedValue'),
          blockType: BlockType.REPORTER,
          arguments: {
            CH: channelArg,
            NAME: {
              type: ArgumentType.STRING,
              defaultValue: 'x'
            }
          }
        }, {
          opcode: 'hasData',
          text: this._getText('hasData'),
          blockType: BlockType.BOOLEAN,
          arguments: {
            CH: channelArg
          }
        }, {
          opcode: 'hasByte',
          text: this._getText('hasByte'),
          blockType: BlockType.BOOLEAN,
          arguments: {
            CH: channelArg
          }
        }, {
          // 値のブロックにしている。拡張機能の引数には変数を選ぶ種類が無いので、
          // URB Block Lab の「シリアルから [データ] に読み込む」の形にはできない
          opcode: 'readByte',
          text: this._getText('readByte'),
          blockType: BlockType.REPORTER,
          arguments: {
            CH: channelArg
          }
        }, {
          opcode: 'clearData',
          text: this._getText('clearData'),
          blockType: BlockType.COMMAND,
          arguments: {
            CH: channelArg
          }
        }, {
          opcode: 'setLineDelimiter',
          text: this._getText('setLineDelimiter'),
          blockType: BlockType.COMMAND,
          arguments: {
            CH: channelArg,
            DELIM: {
              type: ArgumentType.STRING,
              defaultValue: 'NEWLINE',
              menu: 'LINE_DELIM'
            }
          }
        }, '---', {
          opcode: 'itemOf',
          text: this._getText('itemOf'),
          blockType: BlockType.REPORTER,
          arguments: {
            TEXT: {
              type: ArgumentType.STRING,
              defaultValue: '12,34,56'
            },
            DELIM: {
              type: ArgumentType.STRING,
              defaultValue: 'COMMA',
              menu: 'ITEM_DELIM'
            },
            N: {
              type: ArgumentType.NUMBER,
              defaultValue: 2
            }
          }
        }, {
          opcode: 'itemCount',
          text: this._getText('itemCount'),
          blockType: BlockType.REPORTER,
          arguments: {
            TEXT: {
              type: ArgumentType.STRING,
              defaultValue: '12,34,56'
            },
            DELIM: {
              type: ArgumentType.STRING,
              defaultValue: 'COMMA',
              menu: 'ITEM_DELIM'
            }
          }
        }, {
          opcode: 'numberIn',
          text: this._getText('numberIn'),
          blockType: BlockType.REPORTER,
          arguments: {
            TEXT: {
              type: ArgumentType.STRING,
              defaultValue: 'temp=23.5'
            }
          }
        }, {
          opcode: 'splitToList',
          text: this._getText('splitToList'),
          blockType: BlockType.COMMAND,
          arguments: {
            TEXT: {
              type: ArgumentType.STRING,
              defaultValue: '12,34,56'
            },
            DELIM: {
              type: ArgumentType.STRING,
              defaultValue: 'COMMA',
              menu: 'ITEM_DELIM'
            },
            LIST: {
              type: ArgumentType.STRING,
              // ⚠ 既定値を空にしてはいけない。scratch-vm は defaultValue が
              //   空だと <field> ごと出さず、ドロップダウンが消える (お手本の
              //   serialWriteList と同じ)。今ある先頭のリストを既定にする。
              defaultValue: this.getListItems()[0].value,
              menu: 'LIST'
            }
          }
        }],
        menus: {
          CH: {
            acceptReporters: true,
            items: this._channelItems()
          },
          // ハット専用。中身は CH と同じだが acceptReporters を false にしてある。
          // 理由は whenReceived のコメント。
          CH_FIELD: {
            acceptReporters: false,
            items: this._channelItems()
          },
          BAUD: {
            acceptReporters: true,
            items: BAUD_ITEMS
          },
          LINE_DELIM: {
            acceptReporters: true,
            items: [{
              text: this._getText('delimNewline'),
              value: 'NEWLINE'
            }, {
              text: this._getText('delimComma'),
              value: 'COMMA'
            }, {
              text: this._getText('delimTab'),
              value: 'TAB'
            }, {
              text: this._getText('delimSpace'),
              value: 'SPACE'
            }, {
              text: this._getText('delimSemicolon'),
              value: 'SEMICOLON'
            }]
          },
          ITEM_DELIM: {
            acceptReporters: true,
            items: [{
              text: this._getText('delimComma'),
              value: 'COMMA'
            }, {
              text: this._getText('delimSpace'),
              value: 'SPACE'
            }, {
              text: this._getText('delimTab'),
              value: 'TAB'
            }, {
              text: this._getText('delimColon'),
              value: 'COLON'
            }, {
              text: this._getText('delimSemicolon'),
              value: 'SEMICOLON'
            }]
          },
          // 作品にあるリストの一覧。作るたびに変わるので関数で作る。
          LIST: {
            acceptReporters: false,
            items: 'getListItems'
          }
        }
      };
    }

    /**
     * @returns {Array<string>} 番号のメニュー ('1'〜'8')
     */
  }, {
    key: "_channelItems",
    value: function _channelItems() {
      var items = [];
      for (var i = 1; i <= CHANNEL_COUNT; i++) items.push(String(i));
      return items;
    }

    /**
     * 作品にあるリストの一覧。ステージとスプライトの両方から集める。
     * メニューは空にできないので、1 つも無ければ案内を 1 行だけ出す。
     * @returns {Array<{text: string, value: string}>} メニュー項目
     */
  }, {
    key: "getListItems",
    value: function getListItems() {
      var names = new Set();
      var _iterator = _createForOfIteratorHelper(this.runtime.targets),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var target = _step.value;
          if (!target.isOriginal) continue;
          for (var _i = 0, _Object$keys = Object.keys(target.variables || {}); _i < _Object$keys.length; _i++) {
            var id = _Object$keys[_i];
            var variable = target.variables[id];
            if (variable.type === 'list') names.add(variable.name);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      if (names.size === 0) {
        // 値を空にしないこと。空だとブロックのフィールドが出ない。
        return [{
          text: this._getText('listNone'),
          value: '-'
        }];
      }
      return Array.from(names).sort().map(function (name) {
        return {
          text: name,
          value: name
        };
      });
    }

    // ── 引数の読み替え ──────────────────────────────────────────────────

    /**
     * 番号の引数から、その番号の添字を得る。
     *
     * 変数から渡すブロックでも 1〜8 に揃える (仕様書「2. ブロック」の引数)。
     * ハットは 1〜8 しか選べないので、ほかのブロックだけ 9 以上を受け付けると混乱するため。
     * @param {*} value - 番号の引数
     * @returns {number} 添字 (0〜7)。範囲外なら -1
     */
  }, {
    key: "_index",
    value: function _index(value) {
      var n = Cast.toNumber(value);
      if (!Number.isInteger(n) || n < 1 || n > CHANNEL_COUNT) return -1;
      return n - 1;
    }

    /**
     * 区切りの引数を、区切りに使う文字列にする。
     * @param {*} value - メニューの値か、はめ込まれた文字列
     * @param {string} fallback - 空のときに使う区切り
     * @returns {string} 区切り (NEWLINE か文字列)
     */
  }, {
    key: "_delimiter",
    value: function _delimiter(value, fallback) {
      var text = Cast.toString(value);
      if (Object.prototype.hasOwnProperty.call(DELIMITER_CHARS, text)) return DELIMITER_CHARS[text];
      return text === '' ? fallback : text;
    }

    /**
     * 文字列を項目に分ける (仕様書「5. 取り出しの作り」)。
     *
     * 区切りがスペースのときだけ、続いた空白を 1 つとみなす。
     * それ以外では空の項目も 1 つと数える (`1,,3` は 3 項目)。
     * 各項目の前後の空白は除く。空白だけの文字列は 0 項目。
     * @param {*} text - 分ける文字列
     * @param {*} delimiterArg - 区切りの引数
     * @returns {Array<string>} 項目
     */
  }, {
    key: "_split",
    value: function _split(text, delimiterArg) {
      var source = Cast.toString(text);
      if (source.trim() === '') return [];
      var delimiter = this._delimiter(delimiterArg, ',');
      if (delimiter === ' ') return source.trim().split(/ +/);
      // 項目の区切りに改行は選べないが、念のため改行どれでも区切れるようにしておく
      var parts = delimiter === NEWLINE ? source.split(/\r\n|\r|\n/) : source.split(delimiter);
      return parts.map(function (item) {
        return item.trim();
      });
    }

    // ── 開始・終了 ──────────────────────────────────────────────────────

    /**
     * ダイアログでポートを選ばせ、この番号に割り当てて開く (仕様書「3. 開始・終了の動き」)。
     *
     * 受信中の番号では何もしない。「受け取ったとき」や「ずっと」の中に置かれると
     * くり返し呼ばれるので、そのたびにダイアログを出すと使えなくなる。
     *
     * ⚠ requestPort() より前に await を置かないこと。ダイアログは利用者の操作の直後
     *   (transient activation) にしか出せないので、待つとその間に切れるおそれがある。
     * @param {object} args - CH, BAUD
     * @returns {Promise<void>|undefined} 終わったら解決する
     */
  }, {
    key: "openChannel",
    value: function openChannel(args) {
      var _this2 = this;
      var index = this._index(args.CH);
      if (index < 0 || this.busy[index] || this.channels[index].isOpen()) return;
      if (typeof navigator === 'undefined' || !navigator.serial) {
        this.states[index] = 'unsupported';
        return;
      }
      var baudRate = Cast.toNumber(args.BAUD);
      if (!Number.isInteger(baudRate) || baudRate <= 0) {
        console.warn("[multiSerial] invalid baud rate: ".concat(args.BAUD));
        this.states[index] = 'openFailed';
        return;
      }
      this.busy[index] = true;
      return this._choosePort(index, baudRate).catch(function (error) {
        // ここで拾わないと busy が戻らず、その番号を二度と開始できなくなる
        console.warn('[multiSerial] openChannel failed:', error);
      }).then(function () {
        _this2.busy[index] = false;
      });
    }

    /**
     * ダイアログを出して、選ばれたポートを開く。
     * ダイアログを出せなければ、次のクリックを待ってからやり直す。
     * @param {number} index - 添字
     * @param {number} baudRate - ボーレート
     * @returns {Promise<void>} 開き終わるか、あきらめたら解決する
     */
  }, {
    key: "_choosePort",
    value: function _choosePort(index, baudRate) {
      var _this3 = this;
      // 前のクリックをほかの「開始する」が使った。ダイアログを出そうとせずに次のクリックを待つ。
      // 緑の旗の下に「開始する」を 2 つ置くと、2 つ目はここに来る。
      if (!this._clickUnused) return this._waitForClick(index, baudRate);
      this._clickUnused = false;
      this.states[index] = 'choosing';
      return navigator.serial.requestPort().then(function (port) {
        return _this3._assign(index, port, baudRate);
      }, function (error) {
        // キャンセルは NotFoundError
        if (error && error.name === 'NotFoundError') {
          _this3.states[index] = 'cancelled';
          return;
        }
        // クリックから時間が経っていると SecurityError (「〇秒待つ」の後など)。
        // 次のクリックを待つ。
        if (error && error.name === 'SecurityError') return _this3._waitForClick(index, baudRate);
        console.warn('[multiSerial] requestPort failed:', error);
        _this3.states[index] = 'openFailed';
      });
    }

    /**
     * 次のクリックを待つ。クリックされたら _serveClickWaiter() がダイアログを出す。
     * @param {number} index - 添字
     * @param {number} baudRate - ボーレート
     * @returns {Promise<void>} 開き終わるか、あきらめたら解決する
     */
  }, {
    key: "_waitForClick",
    value: function _waitForClick(index, baudRate) {
      var _this4 = this;
      this.states[index] = 'needClick';
      return new Promise(function (resolve) {
        _this4._clickWaiters.push({
          index: index,
          baudRate: baudRate,
          resolve: resolve
        });
      });
    }

    /**
     * クリックされた。待っている「開始する」の先頭について、ダイアログを出し直す。
     * 1 クリックで出せるダイアログは 1 つなので、1 つだけ出す。
     * @returns {void}
     */
  }, {
    key: "_serveClickWaiter",
    value: function _serveClickWaiter() {
      var waiter = this._clickWaiters.shift();
      if (!waiter) return;
      this._choosePort(waiter.index, waiter.baudRate).then(waiter.resolve, waiter.resolve);
    }

    /**
     * 待っている「開始する」をすべてやめる (止めるボタン)。
     * @returns {void}
     */
  }, {
    key: "_cancelClickWaiters",
    value: function _cancelClickWaiters() {
      var _this5 = this;
      var waiters = this._clickWaiters;
      this._clickWaiters = [];
      waiters.forEach(function (waiter) {
        _this5.states[waiter.index] = 'notStarted';
        waiter.resolve();
      });
    }

    /**
     * 選ばれたポートをこの番号で開く。
     * @param {number} index - 添字
     * @param {SerialPort} port - 選ばれたポート
     * @param {number} baudRate - ボーレート
     * @returns {Promise<void>} 終わったら解決する
     */
  }, {
    key: "_assign",
    value: (function () {
      var _assign2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee(index, port, baudRate) {
        var _t;
        return _regeneratorRuntime.wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!this.channels.some(function (other, i) {
                return i !== index && other.port === port;
              })) {
                _context.next = 1;
                break;
              }
              console.warn("[multiSerial] the port is already used by another number (serial ".concat(index + 1, ")"));
              this.states[index] = 'duplicate';
              return _context.abrupt("return");
            case 1:
              _context.prev = 1;
              _context.next = 2;
              return this.channels[index].start(port, baudRate);
            case 2:
              this.states[index] = 'receiving';
              _context.next = 4;
              break;
            case 3:
              _context.prev = 3;
              _t = _context["catch"](1);
              // ほかのアプリ (MakeCode やシリアルモニタなど) が使っていると、ここで失敗する
              console.warn("[multiSerial] could not open the port (serial ".concat(index + 1, "):"), _t);
              this.states[index] = 'openFailed';
            case 4:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[1, 3]]);
      }));
      function _assign(_x, _x2, _x3) {
        return _assign2.apply(this, arguments);
      }
      return _assign;
    }())
  }, {
    key: "closeChannel",
    value: function closeChannel(args) {
      var _this6 = this;
      var index = this._index(args.CH);
      if (index < 0) return;
      // クリックを待っている「開始する」も取り消す。残すと、次のクリックでダイアログが出てしまう
      this._clickWaiters = this._clickWaiters.filter(function (waiter) {
        if (waiter.index !== index) return true;
        waiter.resolve();
        return false;
      });
      return this.channels[index].stop().then(function () {
        _this6.states[index] = 'notStarted';
      });
    }
  }, {
    key: "isOpen",
    value: function isOpen(args) {
      var index = this._index(args.CH);
      return index >= 0 && this.channels[index].isOpen();
    }
  }, {
    key: "channelState",
    value: function channelState(args) {
      var index = this._index(args.CH);
      if (index < 0) return '';
      return this._getText(STATE_TEXT[this.states[index]]);
    }

    // ── 受信 ────────────────────────────────────────────────────────────

    /**
     * 読まれていない行がある番号のハットを起こす。
     * startHats() は同じハットのスクリプトが動いている間は起こし直さないので、重ならない。
     * @returns {void}
     */
  }, {
    key: "_fireHats",
    value: function _fireHats() {
      var _this7 = this;
      this.channels.forEach(function (channel, i) {
        if (channel.lines.length === 0) return;
        _this7.runtime.startHats("".concat(EXTENSION_ID, "_whenReceived"), {
          CH: String(i + 1)
        });
      });
    }

    /**
     * ハットブロック。起こすのは _fireHats() だけで、番号の照合も済んでいる。
     * @returns {boolean} 常に true
     */
  }, {
    key: "whenReceived",
    value: function whenReceived() {
      return true;
    }
  }, {
    key: "readLine",
    value: function readLine(args) {
      var index = this._index(args.CH);
      return index < 0 ? '' : this.channels[index].takeLine();
    }
  }, {
    key: "latestLine",
    value: function latestLine(args) {
      var index = this._index(args.CH);
      return index < 0 ? '' : this.channels[index].latest;
    }
  }, {
    key: "namedValue",
    value: function namedValue(args) {
      var index = this._index(args.CH);
      return index < 0 ? '' : this.channels[index].valueOf(Cast.toString(args.NAME));
    }
  }, {
    key: "hasData",
    value: function hasData(args) {
      var index = this._index(args.CH);
      return index >= 0 && this.channels[index].lines.length > 0;
    }
  }, {
    key: "hasByte",
    value: function hasByte(args) {
      var index = this._index(args.CH);
      return index >= 0 && this.channels[index].bytes.length > 0;
    }
  }, {
    key: "readByte",
    value: function readByte(args) {
      var index = this._index(args.CH);
      return index < 0 ? '' : this.channels[index].takeByte();
    }
  }, {
    key: "clearData",
    value: function clearData(args) {
      var index = this._index(args.CH);
      if (index >= 0) this.channels[index].clear();
    }
  }, {
    key: "setLineDelimiter",
    value: function setLineDelimiter(args) {
      var index = this._index(args.CH);
      if (index >= 0) this.channels[index].setDelimiter(this._delimiter(args.DELIM, NEWLINE));
    }

    // ── 取り出し ────────────────────────────────────────────────────────
  }, {
    key: "itemOf",
    value: function itemOf(args) {
      var items = this._split(args.TEXT, args.DELIM);
      var at = Cast.toListIndex(args.N, items.length, false);
      return at === Cast.LIST_INVALID ? '' : items[at - 1];
    }
  }, {
    key: "itemCount",
    value: function itemCount(args) {
      return this._split(args.TEXT, args.DELIM).length;
    }
  }, {
    key: "numberIn",
    value: function numberIn(args) {
      var found = Cast.toString(args.TEXT).match(/[-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?/);
      return found ? Number(found[0]) : '';
    }
  }, {
    key: "splitToList",
    value: function splitToList(args, util) {
      var list = this._findList(Cast.toString(args.LIST), util);
      if (!list) return;
      list.value = this._split(args.TEXT, args.DELIM);
      // リストのモニター (ステージの表示) に、中身が変わったことを知らせる。
      // scratch-vm の src/blocks/scratch3_data.js と同じやり方。
      list._monitorUpToDate = false;
    }

    /**
     * 名前からリストを探す。スプライト側を先に見る。
     * @param {string} name - リスト名
     * @param {object} util - ブロックの実行文脈 (target を持つ)
     * @returns {?object} 見つかったリストの変数。無ければ null
     */
  }, {
    key: "_findList",
    value: function _findList(name, util) {
      var targets = [];
      if (util && util.target) targets.push(util.target);
      var stage = this.runtime.getTargetForStage();
      if (stage) targets.push(stage);
      for (var _i2 = 0, _targets = targets; _i2 < _targets.length; _i2++) {
        var target = _targets[_i2];
        for (var _i3 = 0, _Object$keys2 = Object.keys(target.variables || {}); _i3 < _Object$keys2.length; _i3++) {
          var id = _Object$keys2[_i3];
          var variable = target.variables[id];
          if (variable.type === 'list' && variable.name === name) return variable;
        }
      }
      return null;
    }
  }], [{
    key: "formatMessage",
    set:
    /**
     * Xcratch がモジュール読み込み時に呼ぶ。GUI の formatMessage を受け取る。
     * @param {Function} formatter - GUI 側の formatMessage
     */
    function set(formatter) {
      if (formatter) formatMessage = formatter;
    }

    /**
     * Xcratch がモジュール読み込み時に、実際に読み込んだ URL を書き込む。
     * getInfo() で返すと、作品に「どこから読めばよいか」が残る。
     * @param {string} url - このモジュールの URL
     */
  }, {
    key: "extensionURL",
    get:
    /**
     * @returns {string} このモジュールの URL。書き込まれていなければ公開 URL
     */
    function get() {
      return this._extensionURL || EXTENSION_URL;
    },
    set: function set(url) {
      if (url) this._extensionURL = url;
    }
  }]);
}(); // rollup の multi-entry が entry と束ねるとき、名前付き export しか拾えない

export { Scratch3MultiSerial as blockClass, entry };
//# sourceMappingURL=multiserial.mjs.map
