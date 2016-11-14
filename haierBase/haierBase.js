!function a(b, c, d) { function e(g, h) { if (!c[g]) { if (!b[g]) { var i = "function" == typeof require && require; if (!h && i) return i(g, !0); if (f) return f(g, !0); throw new Error("Cannot find module '" + g + "'") } var j = c[g] = { exports: {} }; b[g][0].call(j.exports, function (a) { var c = b[g][1][a]; return e(c ? c : a) }, j, j.exports, a, b, c, d) } return c[g].exports } for (var f = "function" == typeof require && require, g = 0; g < d.length; g++) e(d[g]); return e }({ 1: [function (a) { !function (b) { var c = a("./modules/Monitor/Monitor"), d = a("./modules/Storage/Storage"), e = a("./modules/ItvEvents/ItvEvents"), f = a("./modules/TplCompiler/TplCompiler"), g = a("./modules/JsLoader/JsLoader"); b.HaierJS = b.HaierJS || {}, HaierJS.Monitor = new c, HaierJS.Storage = new d, HaierJS.ItvEvents = new e, HaierJS.TplCompiler = new f, HaierJS.JsLoader = new g }(window) }, { "./modules/ItvEvents/ItvEvents": 2, "./modules/JsLoader/JsLoader": 3, "./modules/Monitor/Monitor": 6, "./modules/Storage/Storage": 7, "./modules/TplCompiler/TplCompiler": 8 }], 2: [function (a, b) { "use strict"; var c = function () { var a = this; a.lastTriggerTime = {}, a.timeOut = {} }; c.prototype.addEvent = function (a, b, c, d, e) { var f = this; f.lastTriggerTime[c] = +new Date, f.timeOut[c] = null, a.on(b + "." + c, function () { f.itvTrigger(c, d, e, this) }) }, c.prototype.removeEvent = function (a, b, c) { var d = this; delete d.lastTriggerTime[c], d.timeOut[c], a.off(b + "." + c) }, c.prototype.itvTrigger = function (a, b, c, d) { var e = this, f = +new Date; clearTimeout(e.timeOut[a]), f - e.lastTriggerTime[a] > c ? (e.lastTriggerTime[a] = f, b.call(d)) : e.timeOut[a] = setTimeout(function () { b.call(d) }, c) }, b.exports = c }, {}], 3: [function (a, b) { "use strict"; var c = function () { var a = this; a.queue = {}, a.loaded = {} }; c.prototype.get = function () { for (var a = this, b = 0, c = arguments.length; c > b; b++) { var d = $.extend({}, arguments[b]); if (!a.loaded[d.name]) if (a.queue[d.name] = d, $.isArray(d.requires) && d.requires.length > 0) { for (var e = [], f = 0, g = d.requires.length; g > f; f++) e.push("JsLoader_Success_" + d.requires[f]); var h = e.join(","); a.addListen(h, d.name) } else a.execute(d) } return a }, c.prototype.execute = function (a) { var b = this; $.ajax({ url: a.url, dataType: "script", context: { name: a.name }, cache: !0, success: function () { b.loaded[a.name] = 1, delete b.queue[a.name], "undefined" != typeof a.callBack && a.callBack(), Monitor.trigger("JsLoader_Success_" + a.name) } }) }, c.prototype.addListen = function (a, b) { var c = this; Monitor.listen(a, function () { c.execute(c.queue[b]) }) }, b.exports = c }, {}], 4: [function (a, b) { "use strict"; var c = function (a, b) { var c = this; c.func = [], c.conditionCount = b, c.allowCount = 0, c.allowFlag = !1, c.conditionStatusList = {}, c.func.push(a) }; c.prototype.checkStatus = function () { var a = this; return a.allowFlag ? !0 : a.allowCount === a.conditionCount ? (a.allowFlag = !0, !0) : !1 }, b.exports = c }, {}], 5: [function (a, b) { "use strict"; var c = a("./DelayedFunc"), d = function (a) { var b = this; b.parent = a, b.conditionList = {}, b.stockList = {}, b.paramList = {} }; d.prototype.stockPush = function (a, b) { for (var d = this, e = a.length, f = null, g = [], h = "", i = {}, j = d.parent.triggerHash, k = j.length, l = 0; e > l; l++) g.push("^" + a[l] + "^"); for (var l = 0; k > l; l++) -1 != $.inArray(j[l], a) && "undefined" != typeof d.paramList[j[l]] && $.extend(i, d.paramList[j[l]]); if (h = g.join("|@|"), "undefined" == typeof d.stockList[h] ? f = d.stockList[h] = new c(b, e) : (f = d.stockList[h], f.func.push(b)), f.allowFlag) f.func[f.func.length - 1].call(window, i); else { for (var l = 0; e > l; l++) { var m = a[l]; d.conditionList[m] === !0 ? (f.conditionStatusList[m] || f.allowCount++, f.conditionStatusList[m] = !0) : f.conditionStatusList[m] = !1 } f.checkStatus() && f.func[f.func.length - 1].call(window, i) } }, d.prototype.stockTrigger = function (a, b) { var c, d = this; "undefined" != typeof b && b.constructor == Object && (d.paramList[a] = b); for (c in d.stockList) if (-1 !== c.indexOf("^" + a + "^")) { var e = d.stockList[c], f = d.paramList[a]; for (var g in e.conditionStatusList) "undefined" != typeof d.paramList[g] && g != a && (f = $.extend({}, d.paramList[g], f)); if (e.allowFlag) for (var h = 0, i = e.func.length; i > h; h++) e.func[h].call(window, f); else if ("undefined" == typeof e.conditionStatusList[a] || e.conditionStatusList[a] || (e.conditionStatusList[a] || e.allowCount++, e.conditionStatusList[a] = !0), e.checkStatus()) for (var h = 0, i = e.func.length; i > h; h++) e.func[h].call(window, f) } }, d.prototype.stockPop = function (a) { for (var b = this, c = a.length, d = [], e = "", f = 0; c > f; f++) d.push("^" + a[f] + "^"); e = d.join("|@|"), "undefined" != typeof b.stockList[e] && delete b.stockList[e] }, b.exports = d }, { "./DelayedFunc": 4 }], 6: [function (a, b) { "use strict"; var c = a("./FuncDepot"), d = function () { var a = this; a.triggerHash = [], a.funcDepot = new c(a) }; d.prototype.listen = function (a, b) { for (var c = this, d = a.replace(/ /g, "").split(","), e = 0, f = d.length; f > e; e++) { var g = d[e]; c.funcDepot.conditionList[g] || (c.funcDepot.conditionList[g] = !1) } c.funcDepot.stockPush(d, b) }, d.prototype.trigger = function (a, b) { var c = this, d = $.inArray(a, c.triggerHash); -1 != d && c.triggerHash.splice(d, 1), c.triggerHash.push(a), c.funcDepot.conditionList[a] = !0, c.funcDepot.stockTrigger(a, b) }, d.prototype.unListen = function (a) { var b = this, c = a.replace(/ /g, "").split(","); b.funcDepot.stockPop(c) }, b.exports = d }, { "./FuncDepot": 5 }], 7: [function (a, b) { "use strict"; var c = function () { var a = this; if (a.LS_flag = !!window.localStorage, a.LS_flag) a.storage = window.localStorage; else { a.storage = null, a.hostName = "storageForOldBrowser"; try { a.storage = document.createElement("INPUT"), a.storage.type = "hidden", a.storage.style.display = "none", a.storage.addBehavior("#default#userData"), document.body.appendChild(a.storage); var b = new Date; b.setDate(b.getDate() + 365), a.storage.expires = b.toUTCString() } catch (c) { alert("Storage Object create error!") } } }; c.prototype.get = function (a) { var b = this; if (b.storage) { if (b.LS_flag) return b.storage.getItem(a); b.storage.load(b.hostName); var c = b.storage.getAttribute(a); return (null === c || void 0 === c) && (c = ""), c } }, c.prototype.set = function (a, b) { var c = this; c.storage && (c.LS_flag ? c.storage.setItem(a, b) : (c.storage.load(c.hostName), c.storage.setAttribute(a, b), c.storage.save(c.hostName))) }, c.prototype.remove = function (a) { var b = this; b.storage && (b.LS_flag ? b.storage.removeItem(a) : (b.storage.load(b.hostName), b.storage.removeAttribute(a), b.storage.save(b.hostName))) }, b.exports = c }, {}], 8: [function (a, b) { "use strict"; var c = function () { }; c.prototype.process = function (a, b) { var c = this; for (var d in b) if ("object" == typeof b[d]) $.isArray(b[d]) && (a = c._createList(a, d, b[d])); else { var e = RegExp("{\\$" + d + "}", "g"); a = a.replace(e, b[d]) } return a }, c.prototype._createList = function (a, b, c) { for (var d = this, e = [], f = d._cutTemplate(a, b), g = 0, h = c.length; h > g; g++) c[g]["@index"] = g + 1, e.push(d.process(f.section, c[g])); return f.tpl.replace("{#" + b + "#}", e.join("")) }, c.prototype._cutTemplate = function (a, b) { var c, d = a.indexOf("{#" + b + "}") + 3 + b.length, e = a.indexOf("{#/" + b + "}", d); return -1 != e ? (c = a.slice(d, e), a = a.substr(0, d - 3 - b.length) + "{#" + b + "#}" + a.substr(e + 4 + b.length)) : c = "", { tpl: a, section: c } }, b.exports = c }, {}] }, {}, [1]);