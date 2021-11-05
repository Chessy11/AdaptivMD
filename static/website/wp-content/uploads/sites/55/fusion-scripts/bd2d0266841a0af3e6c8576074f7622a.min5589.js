var cssua = function(e, o, i) {
    "use strict";
    var s = " ua-",
        r = /\s*([\-\w ]+)[\s\/\:]([\d_]+\b(?:[\-\._\/]\w+)*)/,
        n = /([\w\-\.]+[\s\/][v]?[\d_]+\b(?:[\-\._\/]\w+)*)/g,
        a = /\b(?:(blackberry\w*|bb10)|(rim tablet os))(?:\/(\d+\.\d+(?:\.\w+)*))?/,
        b = /\bsilk-accelerated=true\b/,
        t = /\bfluidapp\b/,
        l = /(\bwindows\b|\bmacintosh\b|\blinux\b|\bunix\b)/,
        p = /(\bandroid\b|\bipad\b|\bipod\b|\bwindows phone\b|\bwpdesktop\b|\bxblwp7\b|\bzunewp7\b|\bwindows ce\b|\bblackberry\w*|\bbb10\b|\brim tablet os\b|\bmeego|\bwebos\b|\bpalm|\bsymbian|\bj2me\b|\bdocomo\b|\bpda\b|\bchtml\b|\bmidp\b|\bcldc\b|\w*?mobile\w*?|\w*?phone\w*?)/,
        c = /(\bxbox\b|\bplaystation\b|\bnintendo\s+\w+)/,
        d = {
            parse: function(e, o) {
                var i = {};
                if (o && (i.standalone = o), !(e = ("" + e).toLowerCase())) return i;
                for (var s, d, m = e.split(/[()]/), w = 0, _ = m.length; w < _; w++)
                    if (w % 2) {
                        var u = m[w].split(";");
                        for (s = 0, d = u.length; s < d; s++)
                            if (r.exec(u[s])) {
                                var f = RegExp.$1.split(" ").join("_"),
                                    v = RegExp.$2;
                                (!i[f] || parseFloat(i[f]) < parseFloat(v)) && (i[f] = v)
                            }
                    } else {
                        var x = m[w].match(n);
                        if (x)
                            for (s = 0, d = x.length; s < d; s++) {
                                var g = x[s].split(/[\/\s]+/);
                                g.length && "mozilla" !== g[0] && (i[g[0].split(" ").join("_")] = g.slice(1).join("-"))
                            }
                    }
                if (p.exec(e)) i.mobile = RegExp.$1, a.exec(e) && (delete i[i.mobile], i.blackberry = i.version || RegExp.$3 || RegExp.$2 || RegExp.$1, RegExp.$1 ? i.mobile = "blackberry" : "0.0.1" === i.version && (i.blackberry = "7.1.0.0"));
                else if (l.exec(e)) i.desktop = RegExp.$1;
                else if (c.exec(e)) {
                    i.game = RegExp.$1;
                    var h = i.game.split(" ").join("_");
                    i.version && !i[h] && (i[h] = i.version)
                }
                return i.intel_mac_os_x ? (i.mac_os_x = i.intel_mac_os_x.split("_").join("."), delete i.intel_mac_os_x) : i.cpu_iphone_os ? (i.ios = i.cpu_iphone_os.split("_").join("."), delete i.cpu_iphone_os) : i.cpu_os ? (i.ios = i.cpu_os.split("_").join("."), delete i.cpu_os) : "iphone" !== i.mobile || i.ios || (i.ios = "1"), i.opera && i.version ? (i.opera = i.version, delete i.blackberry) : b.exec(e) ? i.silk_accelerated = !0 : t.exec(e) && (i.fluidapp = i.version), i.applewebkit ? (i.webkit = i.applewebkit, delete i.applewebkit, i.opr && (i.opera = i.opr, delete i.opr, delete i.chrome), i.safari && (i.chrome || i.crios || i.opera || i.silk || i.fluidapp || i.phantomjs || i.mobile && !i.ios ? delete i.safari : i.version && !i.rim_tablet_os ? i.safari = i.version : i.safari = { 419: "2.0.4", 417: "2.0.3", 416: "2.0.2", 412: "2.0", 312: "1.3", 125: "1.2", 85: "1.0" }[parseInt(i.safari, 10)] || i.safari)) : i.msie || i.trident ? (i.opera || (i.ie = i.msie || i.rv), delete i.msie, i.windows_phone_os ? (i.windows_phone = i.windows_phone_os, delete i.windows_phone_os) : "wpdesktop" !== i.mobile && "xblwp7" !== i.mobile && "zunewp7" !== i.mobile || (i.mobile = "windows desktop", i.windows_phone = +i.ie < 9 ? "7.0" : +i.ie < 10 ? "7.5" : "8.0", delete i.windows_nt)) : (i.gecko || i.firefox) && (i.gecko = i.rv), i.rv && delete i.rv, i.version && delete i.version, i
            },
            format: function(e) {
                function o(e, o) {
                    e = e.split(".").join("-");
                    var i = s + e;
                    if ("string" == typeof o) {
                        for (var r = (o = o.split(" ").join("_").split(".").join("-")).indexOf("-"); r > 0;) i += s + e + "-" + o.substring(0, r), r = o.indexOf("-", r + 1);
                        i += s + e + "-" + o
                    }
                    return i
                }
                var i = "";
                for (var r in e) r && e.hasOwnProperty(r) && (i += o(r, e[r]));
                return i
            },
            encode: function(e) { var o = ""; for (var i in e) i && e.hasOwnProperty(i) && (o && (o += "&"), o += encodeURIComponent(i) + "=" + encodeURIComponent(e[i])); return o }
        };
    d.userAgent = d.ua = d.parse(o, i);
    var m = d.format(d.ua) + " js";
    return e.className ? e.className = e.className.replace(/\bno-js\b/g, "") + m : e.className = m.substr(1), d
}(document.documentElement, navigator.userAgent, navigator.standalone);
! function(e, t, n) {
    var r = [],
        o = [],
        a = {
            _version: "3.5.0",
            _config: { classPrefix: "", enableClasses: !0, enableJSClass: !0, usePrefixes: !0 },
            _q: [],
            on: function(e, t) {
                var n = this;
                setTimeout(function() { t(n[e]) }, 0)
            },
            addTest: function(e, t, n) { o.push({ name: e, fn: t, options: n }) },
            addAsyncTest: function(e) { o.push({ name: null, fn: e }) }
        },
        i = function() {};
    i.prototype = a, (i = new i).addTest("applicationcache", "applicationCache" in e), i.addTest("geolocation", "geolocation" in navigator), i.addTest("history", function() { var t = navigator.userAgent; return (-1 === t.indexOf("Android 2.") && -1 === t.indexOf("Android 4.0") || -1 === t.indexOf("Mobile Safari") || -1 !== t.indexOf("Chrome") || -1 !== t.indexOf("Windows Phone") || "file:" === location.protocol) && (e.history && "pushState" in e.history) }), i.addTest("postmessage", "postMessage" in e);
    var s = !1;
    try { s = "WebSocket" in e && 2 === e.WebSocket.CLOSING } catch (e) {}
    i.addTest("websockets", s), i.addTest("localstorage", function() { var e = "modernizr"; try { return localStorage.setItem(e, e), localStorage.removeItem(e), !0 } catch (e) { return !1 } }), i.addTest("sessionstorage", function() { var e = "modernizr"; try { return sessionStorage.setItem(e, e), sessionStorage.removeItem(e), !0 } catch (e) { return !1 } }), i.addTest("websqldatabase", "openDatabase" in e), i.addTest("webworkers", "Worker" in e);
    var l = a._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : ["", ""];

    function c(e, t) { return typeof e === t }
    a._prefixes = l;
    var d = t.documentElement,
        u = "svg" === d.nodeName.toLowerCase();

    function f(e) {
        var t = d.className,
            n = i._config.classPrefix || "";
        if (u && (t = t.baseVal), i._config.enableJSClass) {
            var r = new RegExp("(^|\\s)" + n + "no-js(\\s|$)");
            t = t.replace(r, "$1" + n + "js$2")
        }
        i._config.enableClasses && (t += " " + n + e.join(" " + n), u ? d.className.baseVal = t : d.className = t)
    }
    var p, g, m = a._config.usePrefixes ? "Moz O ms Webkit".toLowerCase().split(" ") : [];

    function h(e, t) {
        if ("object" == typeof e)
            for (var n in e) p(e, n) && h(n, e[n]);
        else {
            var r = (e = e.toLowerCase()).split("."),
                o = i[r[0]];
            if (2 == r.length && (o = o[r[1]]), void 0 !== o) return i;
            t = "function" == typeof t ? t() : t, 1 == r.length ? i[r[0]] = t : (!i[r[0]] || i[r[0]] instanceof Boolean || (i[r[0]] = new Boolean(i[r[0]])), i[r[0]][r[1]] = t), f([(t && 0 != t ? "" : "no-") + r.join("-")]), i._trigger(e, t)
        }
        return i
    }

    function v() { return "function" != typeof t.createElement ? t.createElement(arguments[0]) : u ? t.createElementNS.call(t, "http://www.w3.org/2000/svg", arguments[0]) : t.createElement.apply(t, arguments) }
    a._domPrefixes = m, p = c(g = {}.hasOwnProperty, "undefined") || c(g.call, "undefined") ? function(e, t) { return t in e && c(e.constructor.prototype[t], "undefined") } : function(e, t) { return g.call(e, t) }, a._l = {}, a.on = function(e, t) { this._l[e] || (this._l[e] = []), this._l[e].push(t), i.hasOwnProperty(e) && setTimeout(function() { i._trigger(e, i[e]) }, 0) }, a._trigger = function(e, t) {
        if (this._l[e]) {
            var n = this._l[e];
            setTimeout(function() { var e; for (e = 0; e < n.length; e++)(0, n[e])(t) }, 0), delete this._l[e]
        }
    }, i._q.push(function() { a.addTest = h });
    var y = function() { var e = !("onblur" in t.documentElement); return function(t, r) { var o; return !!t && (r && "string" != typeof r || (r = v(r || "div")), !(o = (t = "on" + t) in r) && e && (r.setAttribute || (r = v("div")), r.setAttribute(t, ""), o = "function" == typeof r[t], r[t] !== n && (r[t] = n), r.removeAttribute(t)), o) } }();

    function b(e) { return e.replace(/([a-z])-([a-z])/g, function(e, t, n) { return t + n.toUpperCase() }).replace(/^-/, "") }
    a.hasEvent = y, i.addTest("hashchange", function() { return !1 !== y("hashchange", e) && (t.documentMode === n || t.documentMode > 7) }), i.addTest("audio", function() {
        var e = v("audio"),
            t = !1;
        try {
            (t = !!e.canPlayType) && ((t = new Boolean(t)).ogg = e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), t.mp3 = e.canPlayType('audio/mpeg; codecs="mp3"').replace(/^no$/, ""), t.opus = e.canPlayType('audio/ogg; codecs="opus"') || e.canPlayType('audio/webm; codecs="opus"').replace(/^no$/, ""), t.wav = e.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), t.m4a = (e.canPlayType("audio/x-m4a;") || e.canPlayType("audio/aac;")).replace(/^no$/, ""))
        } catch (e) {}
        return t
    }), i.addTest("canvas", function() { var e = v("canvas"); return !(!e.getContext || !e.getContext("2d")) }), i.addTest("canvastext", function() { return !1 !== i.canvas && "function" == typeof v("canvas").getContext("2d").fillText }), i.addTest("video", function() {
        var e = v("video"),
            t = !1;
        try {
            (t = !!e.canPlayType) && ((t = new Boolean(t)).ogg = e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), t.h264 = e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), t.webm = e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ""), t.vp9 = e.canPlayType('video/webm; codecs="vp9"').replace(/^no$/, ""), t.hls = e.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/, ""))
        } catch (e) {}
        return t
    }), i.addTest("webgl", function() {
        var t = v("canvas"),
            n = "probablySupportsContext" in t ? "probablySupportsContext" : "supportsContext";
        return n in t ? t[n]("webgl") || t[n]("experimental-webgl") : "WebGLRenderingContext" in e
    }), i.addTest("cssgradients", function() {
        for (var e, t = "background-image:", n = "", r = 0, o = l.length - 1; r < o; r++) e = 0 === r ? "to " : "", n += t + l[r] + "linear-gradient(" + e + "left top, #9f9, white);";
        i._config.usePrefixes && (n += t + "-webkit-gradient(linear,left top,right bottom,from(#9f9),to(white));");
        var a = v("a").style;
        return a.cssText = n, ("" + a.backgroundImage).indexOf("gradient") > -1
    }), i.addTest("multiplebgs", function() { var e = v("a").style; return e.cssText = "background:url(https://),url(https://),red url(https://)", /(url\s*\(.*?){3}/.test(e.background) }), i.addTest("opacity", function() { var e = v("a").style; return e.cssText = l.join("opacity:.55;"), /^0.55$/.test(e.opacity) }), i.addTest("rgba", function() { var e = v("a").style; return e.cssText = "background-color:rgba(150,255,150,.5)", ("" + e.backgroundColor).indexOf("rgba") > -1 }), i.addTest("inlinesvg", function() { var e = v("div"); return e.innerHTML = "<svg/>", "http://www.w3.org/2000/svg" == ("undefined" != typeof SVGRect && e.firstChild && e.firstChild.namespaceURI) });
    var T = v("input"),
        x = "autocomplete autofocus list placeholder max min multiple pattern required step".split(" "),
        w = {};
    i.input = function(t) { for (var n = 0, r = t.length; n < r; n++) w[t[n]] = !!(t[n] in T); return w.list && (w.list = !(!v("datalist") || !e.HTMLDataListElement)), w }(x);
    var S = "search tel url email datetime date month week time datetime-local number range color".split(" "),
        C = {};

    function P(e, t) { return !!~("" + e).indexOf(t) }
    i.inputtypes = function(e) { for (var r, o, a, i = e.length, s = 0; s < i; s++) T.setAttribute("type", r = e[s]), (a = "text" !== T.type && "style" in T) && (T.value = "1)", T.style.cssText = "position:absolute;visibility:hidden;", /^range$/.test(r) && T.style.WebkitAppearance !== n ? (d.appendChild(T), a = (o = t.defaultView).getComputedStyle && "textfield" !== o.getComputedStyle(T, null).WebkitAppearance && 0 !== T.offsetHeight, d.removeChild(T)) : /^(search|tel)$/.test(r) || (a = /^(url|email)$/.test(r) ? T.checkValidity && !1 === T.checkValidity() : "1)" != T.value)), C[e[s]] = !!a; return C }(S), i.addTest("hsla", function() { var e = v("a").style; return e.cssText = "background-color:hsla(120,40%,100%,.5)", P(e.backgroundColor, "rgba") || P(e.backgroundColor, "hsla") });
    var k = "CSS" in e && "supports" in e.CSS,
        _ = "supportsCSS" in e;
    i.addTest("supports", k || _);
    var z = {}.toString;

    function E(e, n, r, o) {
        var a, i, s, l, c = "modernizr",
            f = v("div"),
            p = function() { var e = t.body; return e || ((e = v(u ? "svg" : "body")).fake = !0), e }();
        if (parseInt(r, 10))
            for (; r--;)(s = v("div")).id = o ? o[r] : c + (r + 1), f.appendChild(s);
        return (a = v("style")).type = "text/css", a.id = "s" + c, (p.fake ? p : f).appendChild(a), p.appendChild(f), a.styleSheet ? a.styleSheet.cssText = e : a.appendChild(t.createTextNode(e)), f.id = c, p.fake && (p.style.background = "", p.style.overflow = "hidden", l = d.style.overflow, d.style.overflow = "hidden", d.appendChild(p)), i = n(f, e), p.fake ? (p.parentNode.removeChild(p), d.style.overflow = l, d.offsetHeight) : f.parentNode.removeChild(f), !!i
    }
    i.addTest("svgclippaths", function() { return !!t.createElementNS && /SVGClipPath/.test(z.call(t.createElementNS("http://www.w3.org/2000/svg", "clipPath"))) }), i.addTest("smil", function() { return !!t.createElementNS && /SVGAnimate/.test(z.call(t.createElementNS("http://www.w3.org/2000/svg", "animate"))) });
    var A, O = (A = e.matchMedia || e.msMatchMedia) ? function(e) { var t = A(e); return t && t.matches || !1 } : function(t) { var n = !1; return E("@media " + t + " { #modernizr { position: absolute; } }", function(t) { n = "absolute" == (e.getComputedStyle ? e.getComputedStyle(t, null) : t.currentStyle).position }), n };
    a.mq = O;
    var $, R, L, N = a.testStyles = E;
    i.addTest("touchevents", function() {
        var n;
        if ("ontouchstart" in e || e.DocumentTouch && t instanceof DocumentTouch) n = !0;
        else {
            var r = ["@media (", l.join("touch-enabled),("), "heartz", ")", "{#modernizr{top:9px;position:absolute}}"].join("");
            N(r, function(e) { n = 9 === e.offsetTop })
        }
        return n
    }), ($ = navigator.userAgent, R = $.match(/w(eb)?osbrowser/gi), L = $.match(/windows phone/gi) && $.match(/iemobile\/([0-9])+/gi) && parseFloat(RegExp.$1) >= 9, R || L) ? i.addTest("fontface", !1) : N('@font-face {font-family:"font";src:url("https://")}', function(e, n) {
        var r = t.getElementById("smodernizr"),
            o = r.sheet || r.styleSheet,
            a = o ? o.cssRules && o.cssRules[0] ? o.cssRules[0].cssText : o.cssText || "" : "",
            s = /src/i.test(a) && 0 === a.indexOf(n.split(" ")[0]);
        i.addTest("fontface", s)
    }), N('#modernizr{font:0/0 a}#modernizr:after{content:":)";visibility:hidden;font:7px/1 a}', function(e) { i.addTest("generatedcontent", e.offsetHeight >= 6) });
    var j = a._config.usePrefixes ? "Moz O ms Webkit".split(" ") : [];
    a._cssomPrefixes = j;
    var M = function(t) {
        var r, o = l.length,
            a = e.CSSRule;
        if (void 0 === a) return n;
        if (!t) return !1;
        if ((r = (t = t.replace(/^@/, "")).replace(/-/g, "_").toUpperCase() + "_RULE") in a) return "@" + t;
        for (var i = 0; i < o; i++) { var s = l[i]; if (s.toUpperCase() + "_" + r in a) return "@-" + s.toLowerCase() + "-" + t }
        return !1
    };

    function I(e, t) { return function() { return e.apply(t, arguments) } }
    a.atRule = M;
    var W = { elem: v("modernizr") };
    i._q.push(function() { delete W.elem });
    var q = { style: W.elem.style };

    function V(e) { return e.replace(/([A-Z])/g, function(e, t) { return "-" + t.toLowerCase() }).replace(/^ms-/, "-ms-") }

    function B(t, r) {
        var o = t.length;
        if ("CSS" in e && "supports" in e.CSS) {
            for (; o--;)
                if (e.CSS.supports(V(t[o]), r)) return !0;
            return !1
        }
        if ("CSSSupportsRule" in e) {
            for (var a = []; o--;) a.push("(" + V(t[o]) + ":" + r + ")");
            return E("@supports (" + (a = a.join(" or ")) + ") { #modernizr { position: absolute; } }", function(t) {
                return "absolute" == function(t, n, r) {
                    var o;
                    if ("getComputedStyle" in e) {
                        o = getComputedStyle.call(e, t, n);
                        var a = e.console;
                        null !== o ? r && (o = o.getPropertyValue(r)) : a && a[a.error ? "error" : "log"].call(a, "getComputedStyle returning null, its possible modernizr test results are inaccurate")
                    } else o = !n && t.currentStyle && t.currentStyle[r];
                    return o
                }(t, null, "position")
            })
        }
        return n
    }

    function U(e, t, r, o) {
        if (o = !c(o, "undefined") && o, !c(r, "undefined")) { var a = B(e, r); if (!c(a, "undefined")) return a }
        for (var i, s, l, d, u, f = ["modernizr", "tspan", "samp"]; !q.style && f.length;) i = !0, q.modElem = v(f.shift()), q.style = q.modElem.style;

        function p() { i && (delete q.style, delete q.modElem) }
        for (l = e.length, s = 0; s < l; s++)
            if (d = e[s], u = q.style[d], P(d, "-") && (d = b(d)), q.style[d] !== n) { if (o || c(r, "undefined")) return p(), "pfx" != t || d; try { q.style[d] = r } catch (e) {} if (q.style[d] != u) return p(), "pfx" != t || d }
        return p(), !1
    }
    i._q.unshift(function() { delete q.style });
    var H = a.testProp = function(e, t, r) { return U([e], n, t, r) };

    function G(e, t, n, r, o) {
        var a = e.charAt(0).toUpperCase() + e.slice(1),
            i = (e + " " + j.join(a + " ") + a).split(" ");
        return c(t, "string") || c(t, "undefined") ? U(i, t, r, o) : function(e, t, n) {
            var r;
            for (var o in e)
                if (e[o] in t) return !1 === n ? e[o] : c(r = t[e[o]], "function") ? I(r, n || t) : r;
            return !1
        }(i = (e + " " + m.join(a + " ") + a).split(" "), t, n)
    }
    i.addTest("textshadow", H("textShadow", "1px 1px")), a.testAllProps = G;
    a.prefixed = function(e, t, n) { return 0 === e.indexOf("@") ? M(e) : (-1 != e.indexOf("-") && (e = b(e)), t ? G(e, t, n) : G(e, "pfx")) };

    function D(e, t, r) { return G(e, n, n, t, r) }
    a.testAllProps = D, i.addTest("cssanimations", D("animationName", "a", !0)), i.addTest("backgroundsize", D("backgroundSize", "100%", !0)), i.addTest("borderimage", D("borderImage", "url() 1", !0)), i.addTest("borderradius", D("borderRadius", "0px", !0)), i.addTest("boxshadow", D("boxShadow", "1px 1px", !0)), i.addTest("flexbox", D("flexBasis", "1px", !0)), i.addTest("cssreflections", D("boxReflect", "above", !0)), i.addTest("csstransforms", function() { return -1 === navigator.userAgent.indexOf("Android 2.") && D("transform", "scale(1)", !0) }), i.addTest("csstransforms3d", function() {
            var e = !!D("perspective", "1px", !0),
                t = i._config.usePrefixes;
            if (e && (!t || "webkitPerspective" in d.style)) {
                var n;
                i.supports ? n = "@supports (perspective: 1px)" : (n = "@media (transform-3d)", t && (n += ",(-webkit-transform-3d)")), N("#modernizr{width:0;height:0}" + (n += "{#modernizr{width:7px;height:18px;margin:0;padding:0;border:0}}"), function(t) { e = 7 === t.offsetWidth && 18 === t.offsetHeight })
            }
            return e
        }), i.addTest("csstransitions", D("transition", "all", !0)),
        function() {
            var e, t, n, a, s, l;
            for (var d in o)
                if (o.hasOwnProperty(d)) {
                    if (e = [], (t = o[d]).name && (e.push(t.name.toLowerCase()), t.options && t.options.aliases && t.options.aliases.length))
                        for (n = 0; n < t.options.aliases.length; n++) e.push(t.options.aliases[n].toLowerCase());
                    for (a = c(t.fn, "function") ? t.fn() : t.fn, s = 0; s < e.length; s++) 1 === (l = e[s].split(".")).length ? i[l[0]] = a : (!i[l[0]] || i[l[0]] instanceof Boolean || (i[l[0]] = new Boolean(i[l[0]])), i[l[0]][l[1]] = a), r.push((a ? "" : "no-") + l.join("-"))
                }
        }(), f(r), delete a.addTest, delete a.addAsyncTest;
    for (var J = 0; J < i._q.length; J++) i._q[J]();
    e.Modernizr = i
}(window, document);
! function(t) {
    t.fn.countTo = function(e) {
        return e = t.extend({}, t.fn.countTo.defaults, e || {}), t(this).each(function() {
            var a = t.extend({}, e, { from: parseFloat(t(this).attr("data-from") || e.from), to: parseFloat(t(this).attr("data-to") || e.to), speed: parseInt(t(this).attr("data-speed") || e.speed, 10), refreshInterval: parseInt(t(this).attr("data-refresh-interval") || e.refreshInterval, 10), decimals: parseInt(t(this).attr("data-decimals") || e.decimals, 10) }),
                r = Math.ceil(a.speed / a.refreshInterval),
                n = (a.to - a.from) / r,
                o = this,
                l = 0,
                s = a.from,
                f = setInterval(function() {
                    l++, d(s += n), "function" == typeof a.onUpdate && a.onUpdate.call(o, s);
                    l >= r && (clearInterval(f), s = a.to, "function" == typeof a.onComplete && a.onComplete.call(o, s))
                }, a.refreshInterval);

            function d(e) {
                var r = a.formatter.call(o, e, a);
                t(o).html(r)
            }
            d(s)
        })
    }, t.fn.countTo.defaults = { from: 0, to: 0, speed: 1e3, refreshInterval: 100, decimals: 0, formatter: function(t, e) { return t.toFixed(e.decimals) }, onUpdate: null, onComplete: null }
}(jQuery);
jQuery(document).ready(function() {
    jQuery(".fusion-vertical-menu-widget .current_page_item, .fusion-vertical-menu-widget .current-menu-item").each(function() {
        var e = jQuery(this),
            n = e.parent();
        e.find(".children, .sub-menu").length && e.find("> .children, > .sub-menu").show("slow"), n.hasClass("fusion-vertical-menu-widget") && e.find("ul").show("slow"), (n.hasClass("children") || n.hasClass("sub-menu")) && e.closest("ul").show("slow")
    })
}), jQuery(window).on("load", function() {
    jQuery(".fusion-vertical-menu-widget.click li a .arrow").on("click", function(e) {
        var n = jQuery(this).parent(),
            i = n.parent(),
            t = i.find("> .children, > .sub-menu");
        if (e.preventDefault(), (i.hasClass("page_item_has_children") || i.hasClass("menu-item-has-children")) && (t.length && !t.is(":visible") ? t.stop(!0, !0).slideDown("slow") : t.stop(!0, !0).slideUp("slow")), n.parent(".page_item_has_children.current_page_item, .menu-item-has-children.current-menu-item").length) return !1
    }), jQuery(".fusion-vertical-menu-widget.hover li").each(function() {
        var e;
        jQuery(this).hover(function() {
            var n = jQuery(this).find("> .children, > .sub-menu");
            clearTimeout(e), e = setTimeout(function() { n.length && n.stop(!0, !0).slideDown("slow") }, 500)
        }, function() {
            var n = jQuery(this),
                i = n.find("> .children, > .sub-menu");
            clearTimeout(e), e = setTimeout(function() {
                (0 === n.find(".current_page_item").length && !1 === n.hasClass("current_page_item") || 0 === n.find(".current-menu-item").length && !1 === n.hasClass("current-menu-item")) && i.stop(!0, !0).slideUp("slow")
            }, 500)
        })
    })
});
// Handle the opening/closing of the demo selector.
jQuery(document).ready(function() {
    jQuery('.fss-wrapper').each(function() {
        var wrapper = jQuery(this);

        if (wrapper.hasClass('fss-wrapper-static')) {
            wrapper.addClass('fss-open');
            wrapper.setStickySidebar();
        } else {

            // Open the demo selector.
            wrapper.find('.fss-toggle-demos').on('click', function(e) {
                var mainWrapper = jQuery(this).closest('.fss-wrapper');
                e.preventDefault();

                mainWrapper.toggleClass('fss-open');

                if (mainWrapper.hasClass('fss-open')) {
                    mainWrapper.find('.fss-demo-tag-search').val('');
                    mainWrapper.find('.fss-demo-tag-filters > li').first().find('.fss-demo-tag-filter').removeClass('fss-filter-current').trigger('click');
                }

                // Timeout needed because of CSS transitions.
                setTimeout(function() {
                    wrapper.setStickySidebar();
                }, 610);

            });

            // On resize the sidebar height needs recalculated.
            jQuery(window).on('resize', function() {
                wrapper.setStickySidebar();
            });

            // Close the demo selector on click on overlay.
            jQuery('body').on('click', '.fss-wrapper.fss-open', function(e) {
                if (jQuery(e.target).hasClass('fss-open')) {
                    jQuery(e.target).find('.fss-toggle-demos').trigger('click');
                }
            });

            // Close the demo selector on esc key.
            jQuery(document).on('keyup', function(e) {
                if (27 === e.keyCode && wrapper.hasClass('fss-open')) {
                    wrapper.find('.fss-toggle-demos').trigger('click');
                }
            });
        }
    });
});

// Handle the filter toggle clicks.
jQuery(document).ready(function() {
    jQuery('.fss-filters-toggle').on('click', function(e) {
        var toggle = jQuery(this),
            wrapper = toggle.closest('.fss-wrapper');

        e.preventDefault();

        toggle.toggleClass('fss-collapsed');
        toggle.next().children().slideToggle(300);

        if (!wrapper.hasClass('fss-wrapper-static')) {
            setTimeout(function() {
                wrapper.setStickySidebar();
            }, 300);
        }
    });
});

// Handle the filter clicks.
jQuery(document).ready(function() {
    var timeouts = [],
        hash = window.location.hash,
        path = window.location.pathname,
        cat = hash.substr(5),
        wrapper = -1 !== path.indexOf('prebuilt-websites') ? jQuery('.fss-wrapper-static') : jQuery('.fss-wrapper-modal');

    // Auto-open and auto-select filter based on URL hash.
    if ('' !== hash && 0 === hash.indexOf('#fps_')) {
        wrapper.find('.fss-filters input').each(function(index) {
            var filter = jQuery(this),
                wrapper = filter.closest('.fss-wrapper-modal');

            if (cat === filter.val().replace(/ /g, '_').replace(/-/g, '_')) {
                wrapper.find('.fss-toggle-demos').trigger('click');

                setTimeout(function() {
                    filter.parent().trigger('click');
                }, 50);
            }
        });
    }

    jQuery('.fusion-button').on('click', function(e) {
        var path = window.location.pathname,
            href = jQuery(this).attr('href'),
            cat = href.substr(5),
            wrapper = -1 !== path.indexOf('prebuilt-websites') ? jQuery('.fss-wrapper-static') : jQuery('.fss-wrapper-modal'),
            filterGroups = wrapper.find('.fss-filters');

        // Auto-open and auto-select filter based on URL hash.
        if ('' !== href && 0 === href.indexOf('#fps_')) {
            e.preventDefault();

            wrapper.find('.fss-filters input').each(function(index) {
                var filter = jQuery(this),
                    wrapper = filter.closest('.fss-wrapper-modal');

                if (cat === filter.val().replace(/ /g, '_').replace(/-/g, '_')) {
                    wrapper.find('.fss-toggle-demos').trigger('click');

                    setTimeout(function() {
                        filterGroups.find('.fss-filter-current').each(function() {
                            jQuery(this).trigger('click');
                        });

                        filter.parent().trigger('click');
                    }, 50);
                }
            });
        }
    });

    jQuery('.fss-wrapper .fss-filters input').on('change', function(e) {
        var wrapper = jQuery(this).closest('.fss-wrapper'),
            demos = wrapper.find('.fss-demo'),
            filterGroups = wrapper.find('.fss-filters'),
            selections = {},
            counter = 1;

        e.preventDefault();

        filterGroups.find('label').removeClass('fss-filter-current');

        // Loop through all filter groups.
        filterGroups.each(function(e) {
            var filterWrapper = jQuery(this),
                filterType = filterWrapper.data('type'),
                selected = new Array();

            // Get currently checked filters.
            filterWrapper.find('input:checked').each(function() {

                // If all selector is used, it will always be first and then there is no need add filter at all.
                if ('all' === this.value) {
                    return false;
                }

                selected.push(this.value);
                jQuery(this).parent().addClass('fss-filter-current');
            });

            // Add to the main selctions object.
            if (0 < selected.length) {
                selections[filterType] = selected;
            }
        });

        // Clear all timeouts to prevent animations still running.
        jQuery.each(timeouts, function(index, value) {
            clearTimeout(value);
        });

        // Hide all demos.
        demos.hide().addClass('fss-demo-hidden');

        // Fade correct demos in.
        demos.each(function() {
            var demo = jQuery(this),
                compareData = demo.data(),
                selectionCount = 0;

            delete compareData['imageSource'];
            delete compareData['colorsHex'];
            delete compareData['new'];

            // Loop through all compara data fields.
            jQuery.each(compareData, function(filterType, selected) {
                var selectedString;

                // Return early if the data field is not present in the filter selection.
                if ('undefined' === typeof selections[filterType]) {
                    return;
                }

                // Return early if selected is empty.
                if ('' === selected) {
                    return;
                } else if (-1 === selected.indexOf(',')) {

                    // Add , to make sure we get an array.
                    selected += ',';
                }

                selectedString = selected.split(',');

                // Loop through each value per data field.
                jQuery.each(selectedString, function(index, value) {
                    if (-1 !== jQuery.inArray(value, selections[filterType])) {
                        selectionCount++;
                        return false;
                    }
                });
            });

            // If there was a match for all data creteria, fade demo in.
            if (selectionCount === Object.keys(selections).length) {
                demo.show();
                timeouts.push(
                    setTimeout(function() {
                        demo.removeClass('fss-demo-hidden');
                    }, counter * 50)
                );
                counter++;
            }
        });

        //setStickySidebar();
    });

    jQuery('.fss-demo-tag-search').on('change keyup', function(e) {
        var wrapper = jQuery(this).closest('.fss-wrapper'),
            demos = wrapper.find('.fss-demo'),
            filterGroups = wrapper.find('.fss-filters'),
            serachInput = e.target.value.toLowerCase();
        counter = 1;

        e.preventDefault();

        filterGroups.find('label').removeClass('fss-filter-current');
        filterGroups.find('input').removeAttr('checked');

        // Clear all timeouts to prevent animations still running.
        jQuery.each(timeouts, function(index, value) {
            clearTimeout(value);
        });

        // Hide all demos.
        demos.hide().addClass('fss-demo-hidden');

        // Fade correct demos in.
        demos.each(function() {
            var demo = jQuery(this),
                compareData = demo.data(),
                selectionCount = 0;

            delete compareData['imageSource'];
            delete compareData['colorsHex'];
            delete compareData['new'];

            // Loop through all compara data fields.
            jQuery.each(compareData, function(filterType, selected) {
                var selectedString;

                // Return early if selected is empty.
                if ('' === selected) {
                    return;
                } else if (-1 === selected.indexOf(',')) {

                    // Add , to make sure we get an array.
                    selected += ',';
                }

                selectedString = selected.split(',');

                // Loop through each value per data field.
                jQuery.each(selectedString, function(index, value) {

                    // If there was a match for all data creteria, fade demo in.
                    if (-1 !== value.toLowerCase().indexOf(serachInput)) {
                        demo.show();

                        timeouts.push(
                            setTimeout(function() {
                                demo.removeClass('fss-demo-hidden');
                            }, counter * 50)
                        );
                        counter++;
                        return false;
                    }
                });
            });
        });

        // Move the category filter to "All Demos".
        wrapper.find('.fss-demo-tag-filters').find('button').removeClass('fss-filter-current');
        wrapper.find('.fss-demo-tag-filters').find('button[data-tag=all]').addClass('fss-filter-current');

        //setStickySidebar();
    });
});

// Do the image lazy loading.
jQuery(document).ready(function() {
    jQuery('.fss-wrapper').each(function() {
        var demoImages = jQuery(this).find('.fss-demo-grid .fss-lazy-load'),
            options = {
                root: jQuery(this).hasClass('fss-wrapper-modal') ? jQuery(this)[0] : null,
                rootMargin: '0px',
                threshold: 0
            };

        if ('IntersectionObserver' in window) {
            var imageObserver = new IntersectionObserver(function(entries, observer) {
                jQuery.each(entries, function(key, entry) {
                    var demo = jQuery(entry.target),
                        image = demo.find('img');

                    if (entry.isIntersecting) {
                        image.attr('srcset', image.data('srcset'));
                        image.attr('src', image.data('src'));

                        // Wait 500ms as estimation for the image to load.
                        setTimeout(function() {
                            demo.removeClass('fss-lazy-load').addClass('fss-lazy-loaded');
                            image.attr('alt', image.data('alt'));
                        }, 500);
                        imageObserver.unobserve(entry.target);
                    }
                });
            }, options);

            demoImages.each(function() {
                imageObserver.observe(this);
            });

        } else {

            // IE11 fallback.
            demoImages.each(function() {
                var demo = jQuery(this),
                    image = demo.find('img');

                image.attr('src', image.data('src'));

                setTimeout(function() {
                    demo.removeClass('fss-lazy-load').addClass('fss-lazy-loaded');
                    image.attr('alt', image.data('alt'));
                }, 500);
            });
        }
    });
});

// Calculate all needed values for the sidebar to be sticky.
jQuery.fn.setStickySidebar = function() {
    var mainWrapper = jQuery(this),
        mainWrapperClasses = mainWrapper.attr('class'),
        contentWrapper = mainWrapper.find('.fss-content'),
        contentWrapperHeight = 0,
        sidebarWrapper = contentWrapper.find('.fss-sidebar')
    sidebarContent = contentWrapper.find('.fss-sidebar-content'),
        filtersWrapper = sidebarContent.find('.fss-filters-wrapper'),
        images = contentWrapper.find('.fss-lazy-load img'),
        firstImage = '',
        originalWidth = 0,
        originaHeight = 0,
        imageWidth = 0;

    // Only do calcs if the demo selector is visible.
    if (!mainWrapper.hasClass('fss-open')) {
        return false;
    }

    // Remove the min height style tag for the images that still need lazy loaded.
    mainWrapper.find('.fss-style-tag').remove();

    // Set the min height for the images that have not been loaded yet, to get accurate overall height.
    if (images.length) {
        firstImage = contentWrapper.find('.fss-demo-thumb:visible').first();
        imageWidth = firstImage.width();

        if ('previewImage' === firstImage.parent().data('image-source')) {
            originalWidth = 880;
            originalHeight = 660;
        } else if ('previewImageDetailed' === firstImage.parent().data('image-source')) {
            originalWidth = 880;
            originalHeight = 660;
        } else {
            originalWidth = 600;
            originalHeight = 450;
        }

        mainWrapperClasses = '.' + mainWrapperClasses.replace(/ /g, '.');

        mainWrapper.append('<style class="fss-style-tag">' + mainWrapperClasses + ' .fss-lazy-load img { min-height: ' + (imageWidth / originalWidth * originalHeight) + 'px; }</style>');
    }

    // If the selector is not a modal, no need to calc the fake height.
    if (mainWrapper.hasClass('fss-wrapper-static')) {
        return false;
    }

    // Remove all style attributes for correct initial calcs.
    sidebarWrapper.removeAttr('style');
    sidebarContent.removeAttr('style');
    filtersWrapper.removeAttr('style');

    if (sidebarContent.height() <= sidebarWrapper.height()) {

        // Scroll the whole sidebar.
        sidebarContent.css('position', 'sticky');
    } else if (filtersWrapper.height() <= sidebarWrapper.height()) {

        // Only scroll the filters section.
        sidebarContent.css('height', '100%');
        filtersWrapper.css('position', 'sticky');
    }

    // Set the height of the sidebar to the height of the demo grid to make position: sticky work.
    contentWrapperHeight = contentWrapper.height();
    contentWrapper.css('height', 'auto');
    sidebarWrapper.height(mainWrapper.find('.fss-demo-grid').height());
    contentWrapper.removeAttr('style');
}
var fusionJSVars = { "visibility_small": "640", "visibility_medium": "1024" };
var fusion = {
    fusionResizeWidth: 0,
    fusionResizeHeight: 0,
    toBool: function(e) { return 1 === e || "1" === e || !0 === e || "true" === e || "on" === e },
    restArguments: function(e, t) {
        return t = null == t ? e.length - 1 : +t,
            function() {
                for (var n, i = Math.max(arguments.length - t, 0), o = Array(i), r = 0; r < i; r++) o[r] = arguments[r + t];
                switch (t) {
                    case 0:
                        return e.call(this, o);
                    case 1:
                        return e.call(this, arguments[0], o);
                    case 2:
                        return e.call(this, arguments[0], arguments[1], o)
                }
                for (n = Array(t + 1), r = 0; r < t; r++) n[r] = arguments[r];
                return n[t] = o, e.apply(this, n)
            }
    },
    debounce: function(e, t, n) { var i, o, r, s, u, a = this; return r = function(t, n) { i = null, n && (o = e.apply(t, n)) }, (s = this.restArguments(function(s) { return i && clearTimeout(i), n ? (u = !i, i = setTimeout(r, t), u && (o = e.apply(this, s))) : i = a.delay(r, t, this, s), o })).cancel = function() { clearTimeout(i), i = null }, s },
    isSmall: function() { return Modernizr.mq("only screen and (max-width:" + fusionJSVars.visibility_small + "px)") },
    isMedium: function() { return Modernizr.mq("only screen and (min-width:" + (parseInt(fusionJSVars.visibility_small) + 1) + "px) and (max-width:" + parseInt(fusionJSVars.visibility_medium) + "px)") },
    isLarge: function() { return Modernizr.mq("only screen and (min-width:" + (parseFloat(fusionJSVars.visibility_medium) + 1) + "px)") },
    getHeight: function(e, t) { var n = 0; return "number" == typeof e ? n = e : "string" == typeof e && (e.includes(".") || e.includes("#")) ? (t = void 0 !== t && t, jQuery(e).each(function() { n += jQuery(this).outerHeight(t) })) : n = parseFloat(e), n },
    getAdminbarHeight: function() { var e = jQuery("#wpadminbar").length ? parseInt(jQuery("#wpadminbar").height()) : 0; return e += jQuery(".fusion-fixed-top").length ? parseInt(jQuery(".fusion-fixed-top").height()) : 0 },
    isWindow: function(e) { return null != e && e === e.window },
    getObserverSegmentation: function(e) { var t = {}; return e.each(function() { jQuery(this).data("animationoffset") || jQuery(this).attr("data-animationoffset", "top-into-view") }), t = { "top-into-view": e.filter('[data-animationoffset="top-into-view"]'), "top-mid-of-view": e.filter('[data-animationoffset="top-mid-of-view"]'), "bottom-in-view": e.filter('[data-animationoffset="bottom-in-view"]') }, jQuery.each(t, function(e, n) { n.length || delete t[e] }), 0 === Object.keys(t).length && (t["top-into-view"] = e), t },
    getAnimationIntersectionData: function(e) {
        var t = "",
            n = 0,
            i = "0px 0px 0px 0px";
        return "string" == typeof e ? t = e : void 0 !== e.data("animationoffset") && (t = e.data("animationoffset")), "top-mid-of-view" === t ? i = "0px 0px -50% 0px" : "bottom-in-view" === t && (n = [0, .2, .4, .6, .7, .8, .9, 1]), { root: null, rootMargin: i, threshold: n }
    },
    shouldObserverEntryAnimate: function(e, t) {
        var n = !1,
            i = 1;
        return 1 < t.thresholds.length ? e.boundingClientRect.height > e.rootBounds.height ? (i = e.rootBounds.height / e.boundingClientRect.height, t.thresholds.filter(function(t) { return t >= e.intersectionRatio && t <= i }).length || (n = !0)) : e.isIntersecting && 1 === e.intersectionRatio && (n = !0) : e.isIntersecting && (n = !0), n
    }
};
fusion.delay = fusion.restArguments(function(e, t, n) { return setTimeout(function() { return e.apply(null, n) }, t) }), fusion.ready = function(e) { if ("function" == typeof e) return "complete" === document.readyState ? e() : void document.addEventListener("DOMContentLoaded", e, !1) }, fusion.passiveSupported = function() {
    var e, t;
    if (void 0 === fusion.supportsPassive) {
        try { t = {get passive() { e = !0 } }, window.addEventListener("test", t, t), window.removeEventListener("test", t, t) } catch (t) { e = !1 }
        fusion.supportsPassive = !!e && { passive: !0 }
    }
    return fusion.supportsPassive
}, fusion.getElements = function(e) { var t = []; return e ? ("object" == typeof e ? Object.keys(e).forEach(function(n) { Element.prototype.isPrototypeOf(e[n]) && t.push(e[n]) }) : "string" == typeof e && (t = document.querySelectorAll(e), t = Array.prototype.slice.call(t)), t) : [] }, Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector), Element.prototype.closest || (Element.prototype.closest = function(e) {
    var t = this;
    do {
        if (t.matches(e)) return t;
        t = t.parentElement || t.parentNode
    } while (null !== t && 1 === t.nodeType);
    return null
}), jQuery(document).ready(function() {
    var e;
    void 0 === jQuery.migrateVersion && 2 < parseInt(jQuery.fn.jquery) && jQuery(window.document).triggerHandler("ready"), e = fusion.debounce(function() { fusion.fusionResizeWidth !== jQuery(window).width() && (window.dispatchEvent(new Event("fusion-resize-horizontal", { bubbles: !0, cancelable: !0 })), fusion.fusionResizeWidth = jQuery(window).width()), fusion.fusionResizeHeight !== jQuery(window).height() && (jQuery(window).trigger("fusion-resize-vertical"), fusion.fusionResizeHeight = jQuery(window).height()) }, 250), fusion.fusionResizeWidth = jQuery(window).width(), fusion.fusionResizeHeight = jQuery(window).height(), jQuery(window).on("resize", e)
});
! function(t, e) { "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function(i) { return e(t, i) }) : "object" == typeof module && module.exports ? module.exports = e(t, require("jquery")) : t.jQueryBridget = e(t, t.jQuery) }(window, function(t, e) {
    "use strict";
    var i = Array.prototype.slice,
        o = t.console,
        n = void 0 === o ? function() {} : function(t) { o.error(t) };

    function s(o, s, a) {
        (a = a || e || t.jQuery) && (s.prototype.option || (s.prototype.option = function(t) { a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t)) }), a.fn[o] = function(t) {
            var e;
            return "string" == typeof t ? function(t, e, i) {
                var s, r = "$()." + o + '("' + e + '")';
                return t.each(function(t, u) {
                    var h = a.data(u, o);
                    if (h) {
                        var d = h[e];
                        if (d && "_" != e.charAt(0)) {
                            var l = d.apply(h, i);
                            s = void 0 === s ? l : s
                        } else n(r + " is not a valid method")
                    } else n(o + " not initialized. Cannot call methods, i.e. " + r)
                }), void 0 !== s ? s : t
            }(this, t, i.call(arguments, 1)) : (e = t, this.each(function(t, i) {
                var n = a.data(i, o);
                n ? (n.option(e), n._init()) : (n = new s(i, e), a.data(i, o, n))
            }), this)
        }, r(a))
    }

    function r(t) {!t || t && t.bridget || (t.bridget = s) }
    return r(e || t.jQuery), s
}),
function(t, e) { "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e() }("undefined" != typeof window ? window : this, function() {
    function t() {}
    var e = t.prototype;
    return e.on = function(t, e) {
        if (t && e) {
            var i = this._events = this._events || {},
                o = i[t] = i[t] || [];
            return -1 == o.indexOf(e) && o.push(e), this
        }
    }, e.once = function(t, e) { if (t && e) { this.on(t, e); var i = this._onceEvents = this._onceEvents || {}; return (i[t] = i[t] || {})[e] = !0, this } }, e.off = function(t, e) { var i = this._events && this._events[t]; if (i && i.length) { var o = i.indexOf(e); return -1 != o && i.splice(o, 1), this } }, e.emitEvent = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var o = 0,
                n = i[o];
            e = e || [];
            for (var s = this._onceEvents && this._onceEvents[t]; n;) {
                var r = s && s[n];
                r && (this.off(t, n), delete s[n]), n.apply(this, e), n = i[o += r ? 0 : 1]
            }
            return this
        }
    }, t
}),
function(t, e) { "use strict"; "function" == typeof define && define.amd ? define("get-size/get-size", [], function() { return e() }) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e() }(window, function() {
    "use strict";

    function t(t) { var e = parseFloat(t); return -1 == t.indexOf("%") && !isNaN(e) && e }
    var e = "undefined" == typeof console ? function() {} : function(t) {},
        i = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
        o = i.length;

    function n(t) { var i = getComputedStyle(t); return i || e("Style returned " + i + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), i }
    var s, r = !1;

    function a(e) {
        if (function() {
                if (!r) {
                    r = !0;
                    var e = document.createElement("div");
                    e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style.boxSizing = "border-box";
                    var i = document.body || document.documentElement;
                    i.appendChild(e);
                    var o = n(e);
                    a.isBoxSizeOuter = s = 200 == t(o.width), i.removeChild(e)
                }
            }(), "string" == typeof e && (e = document.querySelector(e)), e && "object" == typeof e && e.nodeType) {
            var u = n(e);
            if ("none" == u.display) return function() { for (var t = { width: 0, height: 0, innerWidth: 0, innerHeight: 0, outerWidth: 0, outerHeight: 0 }, e = 0; e < o; e++) t[i[e]] = 0; return t }();
            var h = {};
            h.width = e.offsetWidth, h.height = e.offsetHeight;
            for (var d = h.isBorderBox = "border-box" == u.boxSizing, l = 0; l < o; l++) {
                var f = i[l],
                    c = u[f],
                    m = parseFloat(c);
                h[f] = isNaN(m) ? 0 : m
            }
            var p = h.paddingLeft + h.paddingRight,
                y = h.paddingTop + h.paddingBottom,
                g = h.marginLeft + h.marginRight,
                v = h.marginTop + h.marginBottom,
                _ = h.borderLeftWidth + h.borderRightWidth,
                I = h.borderTopWidth + h.borderBottomWidth,
                z = d && s,
                x = t(u.width);
            !1 !== x && (h.width = x + (z ? 0 : p + _));
            var S = t(u.height);
            return !1 !== S && (h.height = S + (z ? 0 : y + I)), h.innerWidth = h.width - (p + _), h.innerHeight = h.height - (y + I), h.outerWidth = h.width + g, h.outerHeight = h.height + v, h
        }
    }
    return a
}),
function(t, e) { "use strict"; "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e() }(window, function() { "use strict"; var t = function() { var t = window.Element.prototype; if (t.matches) return "matches"; if (t.matchesSelector) return "matchesSelector"; for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) { var o = e[i] + "MatchesSelector"; if (t[o]) return o } }(); return function(e, i) { return e[t](i) } }),
function(t, e) { "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function(i) { return e(t, i) }) : "object" == typeof module && module.exports ? module.exports = e(t, require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.matchesSelector) }(window, function(t, e) {
    var i = {
            extend: function(t, e) { for (var i in e) t[i] = e[i]; return t },
            modulo: function(t, e) { return (t % e + e) % e },
            makeArray: function(t) {
                var e = [];
                if (Array.isArray(t)) e = t;
                else if (t && "object" == typeof t && "number" == typeof t.length)
                    for (var i = 0; i < t.length; i++) e.push(t[i]);
                else e.push(t);
                return e
            },
            removeFrom: function(t, e) { var i = t.indexOf(e); - 1 != i && t.splice(i, 1) },
            getParent: function(t, i) {
                for (; t.parentNode && t != document.body;)
                    if (t = t.parentNode, e(t, i)) return t
            },
            getQueryElement: function(t) { return "string" == typeof t ? document.querySelector(t) : t },
            handleEvent: function(t) {
                var e = "on" + t.type;
                this[e] && this[e](t)
            },
            filterFindElements: function(o, n) {
                var s = [];
                return (o = i.makeArray(o)).forEach(function(i) {
                    if (i instanceof t.parent.HTMLElement || i instanceof t.HTMLElement)
                        if (n) { e(i, n) && s.push(i); for (var o = i.querySelectorAll(n), r = 0; r < o.length; r++) s.push(o[r]) } else s.push(i)
                }), s
            },
            debounceMethod: function(t, e, i) {
                var o = t.prototype[e],
                    n = e + "Timeout";
                t.prototype[e] = function() {
                    var t = this[n];
                    t && clearTimeout(t);
                    var e = arguments,
                        s = this;
                    this[n] = setTimeout(function() { o.apply(s, e), delete s[n] }, i || 100)
                }
            },
            docReady: function(t) { var e = document.readyState; "complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t) },
            toDashed: function(t) { return t.replace(/(.)([A-Z])/g, function(t, e, i) { return e + "-" + i }).toLowerCase() }
        },
        o = t.console;
    return i.htmlInit = function(e, n) {
        i.docReady(function() {
            var s = i.toDashed(n),
                r = "data-" + s,
                a = document.querySelectorAll("[" + r + "]"),
                u = document.querySelectorAll(".js-" + s),
                h = i.makeArray(a).concat(i.makeArray(u)),
                d = r + "-options",
                l = t.jQuery;
            h.forEach(function(t) {
                var i, s = t.getAttribute(r) || t.getAttribute(d);
                try { i = s && JSON.parse(s) } catch (e) { return void(o && o.error("Error parsing " + r + " on " + t.className + ": " + e)) }
                var a = new e(t, i);
                l && l.data(t, n, a)
            })
        })
    }, i
}),
function(t, e) { "function" == typeof define && define.amd ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("ev-emitter"), require("get-size")) : (t.Outlayer = {}, t.Outlayer.Item = e(t.EvEmitter, t.getSize)) }(window, function(t, e) {
    "use strict";
    var i = document.documentElement.style,
        o = "string" == typeof i.transition ? "transition" : "WebkitTransition",
        n = "string" == typeof i.transform ? "transform" : "WebkitTransform",
        s = { WebkitTransition: "webkitTransitionEnd", transition: "transitionend" }[o],
        r = { transform: n, transition: o, transitionDuration: o + "Duration", transitionProperty: o + "Property", transitionDelay: o + "Delay" };

    function a(t, e) { t && (this.element = t, this.layout = e, this.position = { x: 0, y: 0 }, this._create()) }
    var u = a.prototype = Object.create(t.prototype);
    u.constructor = a, u._create = function() { this._transn = { ingProperties: {}, clean: {}, onEnd: {} }, this.css({ position: "absolute" }) }, u.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, u.getSize = function() { this.size = e(this.element) }, u.css = function(t) { var e = this.element.style; for (var i in t) { e[r[i] || i] = t[i] } }, u.getPosition = function() {
        var t = getComputedStyle(this.element),
            e = this.layout._getOption("originLeft"),
            i = this.layout._getOption("originTop"),
            o = t[e ? "left" : "right"],
            n = t[i ? "top" : "bottom"],
            s = this.layout.size,
            r = -1 != o.indexOf("%") ? parseFloat(o) / 100 * s.width : parseInt(o, 10),
            a = -1 != n.indexOf("%") ? parseFloat(n) / 100 * s.height : parseInt(n, 10);
        r = isNaN(r) ? 0 : r, a = isNaN(a) ? 0 : a, r -= e ? s.paddingLeft : s.paddingRight, a -= i ? s.paddingTop : s.paddingBottom, this.position.x = r, this.position.y = a
    }, u.layoutPosition = function() {
        var t = this.layout.size,
            e = {},
            i = this.layout._getOption("originLeft"),
            o = this.layout._getOption("originTop"),
            n = i ? "paddingLeft" : "paddingRight",
            s = i ? "left" : "right",
            r = i ? "right" : "left",
            a = this.position.x + t[n];
        e[s] = this.getXValue(a), e[r] = "";
        var u = o ? "paddingTop" : "paddingBottom",
            h = o ? "top" : "bottom",
            d = o ? "bottom" : "top",
            l = this.position.y + t[u];
        e[h] = this.getYValue(l), e[d] = "", this.css(e), this.emitEvent("layout", [this])
    }, u.getXValue = function(t) { var e = this.layout._getOption("horizontal"); return this.layout.options.percentPosition && !e ? t / this.layout.size.width * 100 + "%" : t + "px" }, u.getYValue = function(t) { var e = this.layout._getOption("horizontal"); return this.layout.options.percentPosition && e ? t / this.layout.size.height * 100 + "%" : t + "px" }, u._transitionTo = function(t, e) {
        this.getPosition();
        var i = this.position.x,
            o = this.position.y,
            n = parseInt(t, 10),
            s = parseInt(e, 10),
            r = n === this.position.x && s === this.position.y;
        if (this.setPosition(t, e), !r || this.isTransitioning) {
            var a = t - i,
                u = e - o,
                h = {};
            h.transform = this.getTranslate(a, u), this.transition({ to: h, onTransitionEnd: { transform: this.layoutPosition }, isCleaning: !0 })
        } else this.layoutPosition()
    }, u.getTranslate = function(t, e) {
        var i = this.layout._getOption("originLeft"),
            o = this.layout._getOption("originTop");
        return "translate3d(" + (t = i ? t : -t) + "px, " + (e = o ? e : -e) + "px, 0)"
    }, u.goTo = function(t, e) { this.setPosition(t, e), this.layoutPosition() }, u.moveTo = u._transitionTo, u.setPosition = function(t, e) { this.position.x = parseInt(t, 10), this.position.y = parseInt(e, 10) }, u._nonTransition = function(t) { for (var e in this.css(t.to), t.isCleaning && this._removeStyles(t.to), t.onTransitionEnd) t.onTransitionEnd[e].call(this) }, u.transition = function(t) {
        if (parseFloat(this.layout.options.transitionDuration)) {
            var e = this._transn;
            for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
            for (i in t.to) e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0);
            if (t.from) {
                this.css(t.from);
                this.element.offsetHeight;
                null
            }
            this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0
        } else this._nonTransition(t)
    };
    var h = "opacity," + n.replace(/([A-Z])/g, function(t) { return "-" + t.toLowerCase() });
    u.enableTransition = function() {
        if (!this.isTransitioning) {
            var t = this.layout.options.transitionDuration;
            t = "number" == typeof t ? t + "ms" : t, this.css({ transitionProperty: h, transitionDuration: t, transitionDelay: this.staggerDelay || 0 }), this.element.addEventListener(s, this, !1)
        }
    }, u.onwebkitTransitionEnd = function(t) { this.ontransitionend(t) }, u.onotransitionend = function(t) { this.ontransitionend(t) };
    var d = { "-webkit-transform": "transform" };
    u.ontransitionend = function(t) {
        if (t.target === this.element) {
            var e = this._transn,
                i = d[t.propertyName] || t.propertyName;
            if (delete e.ingProperties[i], function(t) { for (var e in t) return !1; return !0 }(e.ingProperties) && this.disableTransition(), i in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[i]), i in e.onEnd) e.onEnd[i].call(this), delete e.onEnd[i];
            this.emitEvent("transitionEnd", [this])
        }
    }, u.disableTransition = function() { this.removeTransitionStyles(), this.element.removeEventListener(s, this, !1), this.isTransitioning = !1 }, u._removeStyles = function(t) {
        var e = {};
        for (var i in t) e[i] = "";
        this.css(e)
    };
    var l = { transitionProperty: "", transitionDuration: "", transitionDelay: "" };
    return u.removeTransitionStyles = function() { this.css(l) }, u.stagger = function(t) { t = isNaN(t) ? 0 : t, this.staggerDelay = t + "ms" }, u.removeElem = function() { this.element.parentNode.removeChild(this.element), this.css({ display: "" }), this.emitEvent("remove", [this]) }, u.remove = function() { o && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function() { this.removeElem() }), this.hide()) : this.removeElem() }, u.reveal = function() {
        delete this.isHidden, this.css({ display: "" });
        var t = this.layout.options,
            e = {};
        e[this.getHideRevealTransitionEndProperty("visibleStyle")] = this.onRevealTransitionEnd, this.transition({ from: t.hiddenStyle, to: t.visibleStyle, isCleaning: !0, onTransitionEnd: e })
    }, u.onRevealTransitionEnd = function() { this.isHidden || this.emitEvent("reveal") }, u.getHideRevealTransitionEndProperty = function(t) { var e = this.layout.options[t]; if (e.opacity) return "opacity"; for (var i in e) return i }, u.hide = function() {
        this.isHidden = !0, this.css({ display: "" });
        var t = this.layout.options,
            e = {};
        e[this.getHideRevealTransitionEndProperty("hiddenStyle")] = this.onHideTransitionEnd, this.transition({ from: t.visibleStyle, to: t.hiddenStyle, isCleaning: !0, onTransitionEnd: e })
    }, u.onHideTransitionEnd = function() { this.isHidden && (this.css({ display: "none" }), this.emitEvent("hide")) }, u.destroy = function() { this.css({ position: "", left: "", right: "", top: "", bottom: "", transition: "", transform: "" }) }, a
}),
function(t, e) { "use strict"; "function" == typeof define && define.amd ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function(i, o, n, s) { return e(t, i, o, n, s) }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : t.Outlayer = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, t.Outlayer.Item) }(window, function(t, e, i, o, n) {
    "use strict";
    var s = t.console,
        r = t.jQuery,
        a = function() {},
        u = 0,
        h = {};

    function d(t, e) {
        var i = o.getQueryElement(t);
        if (i) {
            this.element = i, r && (this.$element = r(this.element)), this.options = o.extend({}, this.constructor.defaults), this.option(e);
            var n = ++u;
            this.element.outlayerGUID = n, h[n] = this, this._create(), this._getOption("initLayout") && this.layout()
        } else s && s.error("Bad element for " + this.constructor.namespace + ": " + (i || t))
    }
    d.namespace = "outlayer", d.Item = n, d.defaults = { containerStyle: { position: "relative" }, initLayout: !0, originLeft: !0, originTop: !0, resize: !0, resizeContainer: !0, transitionDuration: "0.4s", hiddenStyle: { opacity: 0, transform: "scale(0.001)" }, visibleStyle: { opacity: 1, transform: "scale(1)" } };
    var l = d.prototype;

    function f(t) {
        function e() { t.apply(this, arguments) }
        return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e
    }
    o.extend(l, e.prototype), l.option = function(t) { o.extend(this.options, t) }, l._getOption = function(t) { var e = this.constructor.compatOptions[t]; return e && void 0 !== this.options[e] ? this.options[e] : this.options[t] }, d.compatOptions = { initLayout: "isInitLayout", horizontal: "isHorizontal", layoutInstant: "isLayoutInstant", originLeft: "isOriginLeft", originTop: "isOriginTop", resize: "isResizeBound", resizeContainer: "isResizingContainer" }, l._create = function() { this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), o.extend(this.element.style, this.options.containerStyle), this._getOption("resize") && this.bindResize() }, l.reloadItems = function() { this.items = this._itemize(this.element.children) }, l._itemize = function(t) {
        for (var e = this._filterFindItemElements(t), i = this.constructor.Item, o = [], n = 0; n < e.length; n++) {
            var s = new i(e[n], this);
            o.push(s)
        }
        return o
    }, l._filterFindItemElements = function(t) { return o.filterFindElements(t, this.options.itemSelector) }, l.getItemElements = function() { return this.items.map(function(t) { return t.element }) }, l.layout = function() {
        this._resetLayout(), this._manageStamps();
        var t = this._getOption("layoutInstant"),
            e = void 0 !== t ? t : !this._isLayoutInited;
        this.layoutItems(this.items, e), this._isLayoutInited = !0
    }, l._init = l.layout, l._resetLayout = function() { this.getSize() }, l.getSize = function() { this.size = i(this.element) }, l._getMeasurement = function(t, e) {
        var o, n = this.options[t];
        n ? ("string" == typeof n ? o = this.element.querySelector(n) : n instanceof HTMLElement && (o = n), this[t] = o ? i(o)[e] : n) : this[t] = 0
    }, l.layoutItems = function(t, e) { t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout() }, l._getItemsForLayout = function(t) { return t.filter(function(t) { return !t.isIgnored }) }, l._layoutItems = function(t, e) {
        if (this._emitCompleteOnItems("layout", t), t && t.length) {
            var i = [];
            t.forEach(function(t) {
                var o = this._getItemLayoutPosition(t);
                o.item = t, o.isInstant = e || t.isLayoutInstant, i.push(o)
            }, this), this._processLayoutQueue(i)
        }
    }, l._getItemLayoutPosition = function() { return { x: 0, y: 0 } }, l._processLayoutQueue = function(t) { this.updateStagger(), t.forEach(function(t, e) { this._positionItem(t.item, t.x, t.y, t.isInstant, e) }, this) }, l.updateStagger = function() {
        var t = this.options.stagger;
        if (null !== t && void 0 !== t) return this.stagger = function(t) {
            if ("number" == typeof t) return t;
            var e = t.match(/(^\d*\.?\d*)(\w*)/),
                i = e && e[1],
                o = e && e[2];
            if (!i.length) return 0;
            i = parseFloat(i);
            var n = c[o] || 1;
            return i * n
        }(t), this.stagger;
        this.stagger = 0
    }, l._positionItem = function(t, e, i, o, n) { o ? t.goTo(e, i) : (t.stagger(n * this.stagger), t.moveTo(e, i)) }, l._postLayout = function() { this.resizeContainer() }, l.resizeContainer = function() {
        if (this._getOption("resizeContainer")) {
            var t = this._getContainerSize();
            t && (this._setContainerMeasure(t.width, !0), this._setContainerMeasure(t.height, !1))
        }
    }, l._getContainerSize = a, l._setContainerMeasure = function(t, e) {
        if (void 0 !== t) {
            var i = this.size;
            i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px"
        }
    }, l._emitCompleteOnItems = function(t, e) {
        var i = this;

        function o() { i.dispatchEvent(t + "Complete", null, [e]) }
        var n = e.length;
        if (e && n) {
            var s = 0;
            e.forEach(function(e) { e.once(t, r) })
        } else o();

        function r() {++s == n && o() }
    }, l.dispatchEvent = function(t, e, i) {
        var o = e ? [e].concat(i) : i;
        if (this.emitEvent(t, o), r)
            if (this.$element = this.$element || r(this.element), e) {
                var n = r.Event(e);
                n.type = t, this.$element.trigger(n, i)
            } else this.$element.trigger(t, i)
    }, l.ignore = function(t) {
        var e = this.getItem(t);
        e && (e.isIgnored = !0)
    }, l.unignore = function(t) {
        var e = this.getItem(t);
        e && delete e.isIgnored
    }, l.stamp = function(t) {
        (t = this._find(t)) && (this.stamps = this.stamps.concat(t), t.forEach(this.ignore, this))
    }, l.unstamp = function(t) {
        (t = this._find(t)) && t.forEach(function(t) { o.removeFrom(this.stamps, t), this.unignore(t) }, this)
    }, l._find = function(t) { if (t) return "string" == typeof t && (t = this.element.querySelectorAll(t)), t = o.makeArray(t) }, l._manageStamps = function() { this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this)) }, l._getBoundingRect = function() {
        var t = this.element.getBoundingClientRect(),
            e = this.size;
        this._boundingRect = { left: t.left + e.paddingLeft + e.borderLeftWidth, top: t.top + e.paddingTop + e.borderTopWidth, right: t.right - (e.paddingRight + e.borderRightWidth), bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth) }
    }, l._manageStamp = a, l._getElementOffset = function(t) {
        var e = t.getBoundingClientRect(),
            o = this._boundingRect,
            n = i(t);
        return { left: e.left - o.left - n.marginLeft, top: e.top - o.top - n.marginTop, right: o.right - e.right - n.marginRight, bottom: o.bottom - e.bottom - n.marginBottom }
    }, l.handleEvent = o.handleEvent, l.bindResize = function() { t.addEventListener("resize", this), this.isResizeBound = !0 }, l.unbindResize = function() { t.removeEventListener("resize", this), this.isResizeBound = !1 }, l.onresize = function() { this.resize() }, o.debounceMethod(d, "onresize", 100), l.resize = function() { this.isResizeBound && this.needsResizeLayout() && this.layout() }, l.needsResizeLayout = function() { var t = i(this.element); return this.size && t && t.innerWidth !== this.size.innerWidth }, l.addItems = function(t) { var e = this._itemize(t); return e.length && (this.items = this.items.concat(e)), e }, l.appended = function(t) {
        var e = this.addItems(t);
        e.length && (this.layoutItems(e, !0), this.reveal(e))
    }, l.prepended = function(t) {
        var e = this._itemize(t);
        if (e.length) {
            var i = this.items.slice(0);
            this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i)
        }
    }, l.reveal = function(t) {
        if (this._emitCompleteOnItems("reveal", t), t && t.length) {
            var e = this.updateStagger();
            t.forEach(function(t, i) { t.stagger(i * e), t.reveal() })
        }
    }, l.hide = function(t) {
        if (this._emitCompleteOnItems("hide", t), t && t.length) {
            var e = this.updateStagger();
            t.forEach(function(t, i) { t.stagger(i * e), t.hide() })
        }
    }, l.revealItemElements = function(t) {
        var e = this.getItems(t);
        this.reveal(e)
    }, l.hideItemElements = function(t) {
        var e = this.getItems(t);
        this.hide(e)
    }, l.getItem = function(t) { for (var e = 0; e < this.items.length; e++) { var i = this.items[e]; if (i.element == t) return i } }, l.getItems = function(t) {
        var e = [];
        return (t = o.makeArray(t)).forEach(function(t) {
            var i = this.getItem(t);
            i && e.push(i)
        }, this), e
    }, l.remove = function(t) {
        var e = this.getItems(t);
        this._emitCompleteOnItems("remove", e), e && e.length && e.forEach(function(t) { t.remove(), o.removeFrom(this.items, t) }, this)
    }, l.destroy = function() {
        var t = this.element.style;
        t.height = "", t.position = "", t.width = "", this.items.forEach(function(t) { t.destroy() }), this.unbindResize();
        var e = this.element.outlayerGUID;
        delete h[e], delete this.element.outlayerGUID, r && r.removeData(this.element, this.constructor.namespace)
    }, d.data = function(t) { var e = (t = o.getQueryElement(t)) && t.outlayerGUID; return e && h[e] }, d.create = function(t, e) { var i = f(d); return i.defaults = o.extend({}, d.defaults), o.extend(i.defaults, e), i.compatOptions = o.extend({}, d.compatOptions), i.namespace = t, i.data = d.data, i.Item = f(n), o.htmlInit(i, t), r && r.bridget && r.bridget(t, i), i };
    var c = { ms: 1, s: 1e3 };
    return d.Item = n, d
}),
function(t, e) { "function" == typeof define && define.amd ? define("isotope/js/item", ["outlayer/outlayer"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.Item = e(t.Outlayer)) }(window, function(t) {
    "use strict";

    function e() { t.Item.apply(this, arguments) }
    var i = e.prototype = Object.create(t.Item.prototype),
        o = i._create;
    i._create = function() { this.id = this.layout.itemGUID++, o.call(this), this.sortData = {} }, i.updateSortData = function() {
        if (!this.isIgnored) {
            this.sortData.id = this.id, this.sortData["original-order"] = this.id, this.sortData.random = Math.random();
            var t = this.layout.options.getSortData,
                e = this.layout._sorters;
            for (var i in t) {
                var o = e[i];
                this.sortData[i] = o(this.element, this)
            }
        }
    };
    var n = i.destroy;
    return i.destroy = function() { n.apply(this, arguments), this.css({ display: "" }) }, e
}),
function(t, e) { "function" == typeof define && define.amd ? define("isotope/js/layout-mode", ["get-size/get-size", "outlayer/outlayer"], e) : "object" == typeof module && module.exports ? module.exports = e(require("get-size"), require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.LayoutMode = e(t.getSize, t.Outlayer)) }(window, function(t, e) {
    "use strict";

    function i(t) { this.isotope = t, t && (this.options = t.options[this.namespace], this.element = t.element, this.items = t.filteredItems, this.size = t.size) }
    var o = i.prototype;
    return ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout", "_getOption"].forEach(function(t) { o[t] = function() { return e.prototype[t].apply(this.isotope, arguments) } }), o.needsVerticalResizeLayout = function() { var e = t(this.isotope.element); return this.isotope.size && e && e.innerHeight != this.isotope.size.innerHeight }, o._getMeasurement = function() { this.isotope._getMeasurement.apply(this, arguments) }, o.getColumnWidth = function() { this.getSegmentSize("column", "Width") }, o.getRowHeight = function() { this.getSegmentSize("row", "Height") }, o.getSegmentSize = function(t, e) {
        var i = t + e,
            o = "outer" + e;
        if (this._getMeasurement(i, o), !this[i]) {
            var n = this.getFirstItemSize();
            this[i] = n && n[o] || this.isotope.size["inner" + e]
        }
    }, o.getFirstItemSize = function() { var e = this.isotope.filteredItems[0]; return e && e.element && t(e.element) }, o.layout = function() { this.isotope.layout.apply(this.isotope, arguments) }, o.getSize = function() { this.isotope.getSize(), this.size = this.isotope.size }, i.modes = {}, i.create = function(t, e) {
        function n() { i.apply(this, arguments) }
        return n.prototype = Object.create(o), n.prototype.constructor = n, e && (n.options = e), n.prototype.namespace = t, i.modes[t] = n, n
    }, i
}),
function(t, e) { "function" == typeof define && define.amd ? define("masonry/masonry", ["outlayer/outlayer", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer"), require("get-size")) : t.Masonry = e(t.Outlayer, t.getSize) }(window, function(t, e) {
    var i = t.create("masonry");
    i.compatOptions.fitWidth = "isFitWidth";
    var o = i.prototype;
    return o._resetLayout = function() {
        this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(), this.colYs = [];
        for (var t = 0; t < this.cols; t++) this.colYs.push(0);
        this.maxY = 0, this.horizontalColIndex = 0
    }, o.measureColumns = function() {
        if (this.getContainerWidth(), !this.columnWidth) {
            var t = this.items[0],
                i = t && t.element;
            this.columnWidth = i && e(i).outerWidth || this.containerWidth
        }
        var o = this.columnWidth += this.gutter,
            n = this.containerWidth + this.gutter,
            s = n / o,
            r = o - n % o;
        s = Math[r && r < 1 ? "round" : "floor"](s), this.cols = Math.max(s, 1)
    }, o.getContainerWidth = function() {
        var t = this._getOption("fitWidth") ? this.element.parentNode : this.element,
            i = e(t);
        this.containerWidth = i && i.innerWidth
    }, o._getItemLayoutPosition = function(t) {
        t.getSize();
        var e = t.size.outerWidth % this.columnWidth,
            i = Math[e && e < 1 ? "round" : "ceil"](t.size.outerWidth / this.columnWidth);
        i = Math.min(i, this.cols);
        for (var o = this[this.options.horizontalOrder ? "_getHorizontalColPosition" : "_getTopColPosition"](i, t), n = { x: this.columnWidth * o.col, y: o.y }, s = o.y + t.size.outerHeight, r = i + o.col, a = o.col; a < r; a++) this.colYs[a] = s;
        return n
    }, o._getTopColPosition = function(t) {
        var e = this._getTopColGroup(t),
            i = Math.min.apply(Math, e);
        return { col: e.indexOf(i), y: i }
    }, o._getTopColGroup = function(t) { if (t < 2) return this.colYs; for (var e = [], i = this.cols + 1 - t, o = 0; o < i; o++) e[o] = this._getColGroupY(o, t); return e }, o._getColGroupY = function(t, e) { if (e < 2) return this.colYs[t]; var i = this.colYs.slice(t, t + e); return Math.max.apply(Math, i) }, o._getHorizontalColPosition = function(t, e) {
        var i = this.horizontalColIndex % this.cols;
        i = t > 1 && i + t > this.cols ? 0 : i;
        var o = e.size.outerWidth && e.size.outerHeight;
        return this.horizontalColIndex = o ? i + t : this.horizontalColIndex, { col: i, y: this._getColGroupY(i, t) }
    }, o._manageStamp = function(t) {
        var i = e(t),
            o = this._getElementOffset(t),
            n = this._getOption("originLeft") ? o.left : o.right,
            s = n + i.outerWidth,
            r = Math.floor(n / this.columnWidth);
        r = Math.max(0, r);
        var a = Math.floor(s / this.columnWidth);
        a -= s % this.columnWidth ? 0 : 1, a = Math.min(this.cols - 1, a);
        for (var u = (this._getOption("originTop") ? o.top : o.bottom) + i.outerHeight, h = r; h <= a; h++) this.colYs[h] = Math.max(u, this.colYs[h])
    }, o._getContainerSize = function() { this.maxY = Math.max.apply(Math, this.colYs); var t = { height: this.maxY }; return this._getOption("fitWidth") && (t.width = this._getContainerFitWidth()), t }, o._getContainerFitWidth = function() { for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];) t++; return (this.cols - t) * this.columnWidth - this.gutter }, o.needsResizeLayout = function() { var t = this.containerWidth; return this.getContainerWidth(), t != this.containerWidth }, i
}),
function(t, e) { "function" == typeof define && define.amd ? define("isotope/js/layout-modes/masonry", ["../layout-mode", "masonry/masonry"], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode"), require("masonry-layout")) : e(t.Isotope.LayoutMode, t.Masonry) }(window, function(t, e) {
    "use strict";
    var i = t.create("masonry"),
        o = i.prototype,
        n = { _getElementOffset: !0, layout: !0, _getMeasurement: !0 };
    for (var s in e.prototype) n[s] || (o[s] = e.prototype[s]);
    var r = o.measureColumns;
    o.measureColumns = function() { this.items = this.isotope.filteredItems, r.call(this) };
    var a = o._getOption;
    return o._getOption = function(t) { return "fitWidth" == t ? void 0 !== this.options.isFitWidth ? this.options.isFitWidth : this.options.fitWidth : a.apply(this.isotope, arguments) }, i
}),
function(t, e) { "function" == typeof define && define.amd ? define("isotope/js/layout-modes/fit-rows", ["../layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode) }(window, function(t) {
    "use strict";
    var e = t.create("fitRows"),
        i = e.prototype;
    return i._resetLayout = function() { this.x = 0, this.y = 0, this.maxY = 0, this._getMeasurement("gutter", "outerWidth") }, i._getItemLayoutPosition = function(t) {
        t.getSize();
        var e = t.size.outerWidth + this.gutter - .01,
            i = this.isotope.size.innerWidth + this.gutter;
        0 !== this.x && e + this.x > i && (this.x = 0, this.y = this.maxY);
        var o = { x: this.x, y: this.y };
        return this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight), this.x += e, o
    }, i._getContainerSize = function() { return { height: this.maxY } }, e
}),
function(t, e) { "function" == typeof define && define.amd ? define("isotope/js/layout-modes/vertical", ["../layout-mode"], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode) }(window, function(t) {
    "use strict";
    var e = t.create("vertical", { horizontalAlignment: 0 }),
        i = e.prototype;
    return i._resetLayout = function() { this.y = 0 }, i._getItemLayoutPosition = function(t) {
        t.getSize();
        var e = (this.isotope.size.innerWidth - t.size.outerWidth) * this.options.horizontalAlignment,
            i = this.y;
        return this.y += t.size.outerHeight, { x: e, y: i }
    }, i._getContainerSize = function() { return { height: this.y } }, e
}),
function(t, e) { "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "desandro-matches-selector/matches-selector", "fizzy-ui-utils/utils", "isotope/js/item", "isotope/js/layout-mode", "isotope/js/layout-modes/masonry", "isotope/js/layout-modes/fit-rows", "isotope/js/layout-modes/vertical"], function(i, o, n, s, r, a) { return e(t, i, o, n, s, r, a) }) : "object" == typeof module && module.exports ? module.exports = e(t, require("outlayer"), require("get-size"), require("desandro-matches-selector"), require("fizzy-ui-utils"), require("isotope/js/item"), require("isotope/js/layout-mode"), require("isotope/js/layout-modes/masonry"), require("isotope/js/layout-modes/fit-rows"), require("isotope/js/layout-modes/vertical")) : t.Isotope = e(t, t.Outlayer, t.getSize, t.matchesSelector, t.fizzyUIUtils, t.Isotope.Item, t.Isotope.LayoutMode) }(window, function(t, e, i, o, n, s, r) {
    var a = t.jQuery,
        u = String.prototype.trim ? function(t) { return t.trim() } : function(t) { return t.replace(/^\s+|\s+$/g, "") },
        h = e.create("isotope", { layoutMode: "masonry", isJQueryFiltering: !0, sortAscending: !0 });
    h.Item = s, h.LayoutMode = r;
    var d = h.prototype;
    d._create = function() { for (var t in this.itemGUID = 0, this._sorters = {}, this._getSorters(), e.prototype._create.call(this), this.modes = {}, this.filteredItems = this.items, this.sortHistory = ["original-order"], r.modes) this._initLayoutMode(t) }, d.reloadItems = function() { this.itemGUID = 0, e.prototype.reloadItems.call(this) }, d._itemize = function() { for (var t = e.prototype._itemize.apply(this, arguments), i = 0; i < t.length; i++) { t[i].id = this.itemGUID++ } return this._updateItemsSortData(t), t }, d._initLayoutMode = function(t) {
        var e = r.modes[t],
            i = this.options[t] || {};
        this.options[t] = e.options ? n.extend(e.options, i) : i, this.modes[t] = new e(this)
    }, d.layout = function() { this._isLayoutInited || !this._getOption("initLayout") ? this._layout() : this.arrange() }, d._layout = function() {
        var t = this._getIsInstant();
        this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, t), this._isLayoutInited = !0
    }, d.arrange = function(t) {
        this.option(t), this._getIsInstant();
        var e = this._filter(this.items);
        this.filteredItems = e.matches, this._bindArrangeComplete(), this._isInstant ? this._noTransition(this._hideReveal, [e]) : this._hideReveal(e), this._sort(), this._layout()
    }, d._init = d.arrange, d._hideReveal = function(t) { this.reveal(t.needReveal), this.hide(t.needHide) }, d._getIsInstant = function() {
        var t = this._getOption("layoutInstant"),
            e = void 0 !== t ? t : !this._isLayoutInited;
        return this._isInstant = e, e
    }, d._bindArrangeComplete = function() {
        var t, e, i, o = this;

        function n() { t && e && i && o.dispatchEvent("arrangeComplete", null, [o.filteredItems]) }
        this.once("layoutComplete", function() { t = !0, n() }), this.once("hideComplete", function() { e = !0, n() }), this.once("revealComplete", function() { i = !0, n() })
    }, d._filter = function(t) {
        var e = this.options.filter;
        e = e || "*";
        for (var i = [], o = [], n = [], s = this._getFilterTest(e), r = 0; r < t.length; r++) {
            var a = t[r];
            if (!a.isIgnored) {
                var u = s(a);
                u && i.push(a), u && a.isHidden ? o.push(a) : u || a.isHidden || n.push(a)
            }
        }
        return { matches: i, needReveal: o, needHide: n }
    }, d._getFilterTest = function(t) { return a && this.options.isJQueryFiltering ? function(e) { return a(e.element).is(t) } : "function" == typeof t ? function(e) { return t(e.element) } : function(e) { return o(e.element, t) } }, d.updateSortData = function(t) {
        var e;
        t ? (t = n.makeArray(t), e = this.getItems(t)) : e = this.items, this._getSorters(), this._updateItemsSortData(e)
    }, d._getSorters = function() {
        var t = this.options.getSortData;
        for (var e in t) {
            var i = t[e];
            this._sorters[e] = l(i)
        }
    }, d._updateItemsSortData = function(t) { for (var e = t && t.length, i = 0; e && i < e; i++) { t[i].updateSortData() } };
    var l = function() {
        return function(t) {
            if ("string" != typeof t) return t;
            var e = u(t).split(" "),
                i = e[0],
                o = i.match(/^\[(.+)\]$/),
                n = function(t, e) { return t ? function(e) { return e.getAttribute(t) } : function(t) { var i = t.querySelector(e); return i && i.textContent } }(o && o[1], i),
                s = h.sortDataParsers[e[1]];
            return t = s ? function(t) { return t && s(n(t)) } : function(t) { return t && n(t) }
        }
    }();
    h.sortDataParsers = { parseInt: function(t) { return parseInt(t, 10) }, parseFloat: function(t) { return parseFloat(t) } }, d._sort = function() {
        if (this.options.sortBy) {
            var t = n.makeArray(this.options.sortBy);
            this._getIsSameSortBy(t) || (this.sortHistory = t.concat(this.sortHistory));
            var e = function(t, e) {
                return function(i, o) {
                    for (var n = 0; n < t.length; n++) {
                        var s = t[n],
                            r = i.sortData[s],
                            a = o.sortData[s];
                        if (r > a || r < a) {
                            var u = void 0 !== e[s] ? e[s] : e,
                                h = u ? 1 : -1;
                            return (r > a ? 1 : -1) * h
                        }
                    }
                    return 0
                }
            }(this.sortHistory, this.options.sortAscending);
            this.filteredItems.sort(e)
        }
    }, d._getIsSameSortBy = function(t) {
        for (var e = 0; e < t.length; e++)
            if (t[e] != this.sortHistory[e]) return !1;
        return !0
    }, d._mode = function() {
        var t = this.options.layoutMode,
            e = this.modes[t];
        if (!e) throw new Error("No layout mode: " + t);
        return e.options = this.options[t], e
    }, d._resetLayout = function() { e.prototype._resetLayout.call(this), this._mode()._resetLayout() }, d._getItemLayoutPosition = function(t) { return this._mode()._getItemLayoutPosition(t) }, d._manageStamp = function(t) { this._mode()._manageStamp(t) }, d._getContainerSize = function() { return this._mode()._getContainerSize() }, d.needsResizeLayout = function() { return this._mode().needsResizeLayout() }, d.appended = function(t) {
        var e = this.addItems(t);
        if (e.length) {
            var i = this._filterRevealAdded(e);
            this.filteredItems = this.filteredItems.concat(i)
        }
    }, d.prepended = function(t) {
        var e = this._itemize(t);
        if (e.length) {
            this._resetLayout(), this._manageStamps();
            var i = this._filterRevealAdded(e);
            this.layoutItems(this.filteredItems), this.filteredItems = i.concat(this.filteredItems), this.items = e.concat(this.items)
        }
    }, d._filterRevealAdded = function(t) { var e = this._filter(t); return this.hide(e.needHide), this.reveal(e.matches), this.layoutItems(e.matches, !0), e.matches }, d.insert = function(t) {
        var e = this.addItems(t);
        if (e.length) {
            var i, o, n = e.length;
            for (i = 0; i < n; i++) o = e[i], this.element.appendChild(o.element);
            var s = this._filter(e).matches;
            for (i = 0; i < n; i++) e[i].isLayoutInstant = !0;
            for (this.arrange(), i = 0; i < n; i++) delete e[i].isLayoutInstant;
            this.reveal(s)
        }
    };
    var f = d.remove;
    return d.remove = function(t) {
        t = n.makeArray(t);
        var e = this.getItems(t);
        f.call(this, t);
        for (var i = e && e.length, o = 0; i && o < i; o++) {
            var s = e[o];
            n.removeFrom(this.filteredItems, s)
        }
    }, d.shuffle = function() {
        for (var t = 0; t < this.items.length; t++) { this.items[t].sortData.random = Math.random() }
        this.options.sortBy = "random", this._sort(), this._layout()
    }, d._noTransition = function(t, e) {
        var i = this.options.transitionDuration;
        this.options.transitionDuration = 0;
        var o = t.apply(this, e);
        return this.options.transitionDuration = i, o
    }, d.getFilteredItemElements = function() { return this.filteredItems.map(function(t) { return t.element }) }, h
});
! function(t, e) { "function" == typeof define && define.amd ? define("packery/js/rect", e) : "object" == typeof module && module.exports ? module.exports = e() : (t.Packery = t.Packery || {}, t.Packery.Rect = e()) }(window, function() {
    function t(e) { for (var i in t.defaults) this[i] = t.defaults[i]; for (i in e) this[i] = e[i] }
    t.defaults = { x: 0, y: 0, width: 0, height: 0 };
    var e = t.prototype;
    return e.contains = function(t) {
        var e = t.width || 0,
            i = t.height || 0;
        return this.x <= t.x && this.y <= t.y && this.x + this.width >= t.x + e && this.y + this.height >= t.y + i
    }, e.overlaps = function(t) {
        var e = this.x + this.width,
            i = this.y + this.height,
            s = t.x + t.width,
            r = t.y + t.height;
        return this.x < s && e > t.x && this.y < r && i > t.y
    }, e.getMaximalFreeRects = function(e) {
        if (!this.overlaps(e)) return !1;
        var i, s = [],
            r = Math.round(this.x),
            n = Math.round(this.y),
            h = Math.round(this.width),
            o = Math.round(this.height),
            a = Math.round(e.x),
            c = Math.round(e.y),
            u = r + h,
            d = n + o,
            g = a + Math.round(e.width),
            l = c + Math.round(e.height);
        return n < c && (i = new t({ x: r, y: n, width: h, height: c - n }), s.push(i)), u > g && (i = new t({ x: g, y: n, width: u - g, height: o }), s.push(i)), d > l && (i = new t({ x: r, y: l, width: h, height: d - l }), s.push(i)), r < a && (i = new t({ x: r, y: n, width: a - r, height: o }), s.push(i)), s
    }, e.canFit = function(t) { return this.width >= t.width && this.height >= t.height }, t
}),
function(t, e) {
    if ("function" == typeof define && define.amd) define("packery/js/packer", ["./rect"], e);
    else if ("object" == typeof module && module.exports) module.exports = e(require("./rect"));
    else {
        var i = t.Packery = t.Packery || {};
        i.Packer = e(i.Rect)
    }
}(window, function(t) {
    function e(t, e, i) { this.width = t || 0, this.height = e || 0, this.sortDirection = i || "downwardLeftToRight", this.reset() }
    var i = e.prototype;
    i.reset = function() {
        this.spaces = [];
        var e = new t({ x: 0, y: 0, width: this.width, height: this.height });
        this.spaces.push(e), this.sorter = s[this.sortDirection] || s.downwardLeftToRight
    }, i.pack = function(t) { for (var e = 0; e < this.spaces.length; e++) { var i = this.spaces[e]; if (i.canFit(t)) { this.placeInSpace(t, i); break } } }, i.columnPack = function(t) { for (var e = 0; e < this.spaces.length; e++) { var i = this.spaces[e]; if (i.x <= t.x && i.x + i.width >= t.x + t.width && i.height >= t.height - .01) { t.y = i.y, this.placed(t); break } } }, i.rowPack = function(t) { for (var e = 0; e < this.spaces.length; e++) { var i = this.spaces[e]; if (i.y <= t.y && i.y + i.height >= t.y + t.height && i.width >= t.width - .01) { t.x = i.x, this.placed(t); break } } }, i.placeInSpace = function(t, e) { t.x = e.x, t.y = e.y, this.placed(t) }, i.placed = function(t) {
        for (var e = [], i = 0; i < this.spaces.length; i++) {
            var s = this.spaces[i],
                r = s.getMaximalFreeRects(t);
            r ? e.push.apply(e, r) : e.push(s)
        }
        if ("object" == typeof e) {
            var n = [],
                h = [];
            e.forEach(function(t) {
                if (1 < t.width) {
                    var e = t.y + 1,
                        i = t.y - 1; - 1 !== jQuery.inArray(e, h) && (t.y = e), -1 !== jQuery.inArray(i, h) && (t.y = i), h.push(t.y), n.push(t)
                }
            }), e = n
        }
        this.spaces = e, this.mergeSortSpaces()
    }, i.mergeSortSpaces = function() { e.mergeRects(this.spaces), this.spaces.sort(this.sorter) }, i.addSpace = function(t) { this.spaces.push(t), this.mergeSortSpaces() }, e.mergeRects = function(t) {
        var e = 0,
            i = t[e];
        t: for (; i;) {
            for (var s = 0, r = t[e + s]; r;) {
                if (r == i) s++;
                else {
                    if (r.contains(i)) { t.splice(e, 1), i = t[e]; continue t }
                    i.contains(r) ? t.splice(e + s, 1) : s++
                }
                r = t[e + s]
            }
            i = t[++e]
        }
        return t
    };
    var s = { downwardLeftToRight: function(t, e) { return t.y - e.y || t.x - e.x }, rightwardTopToBottom: function(t, e) { return t.x - e.x || t.y - e.y } };
    return e
}),
function(t, e) { "function" == typeof define && define.amd ? define("packery/js/item", ["outlayer/outlayer", "./rect"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer"), require("./rect")) : t.Packery.Item = e(t.Outlayer, t.Packery.Rect) }(window, function(t, e) {
    var i = "string" == typeof document.documentElement.style.transform ? "transform" : "WebkitTransform",
        s = function() { t.Item.apply(this, arguments) },
        r = s.prototype = Object.create(t.Item.prototype),
        n = r._create;
    r._create = function() { n.call(this), this.rect = new e };
    var h = r.moveTo;
    return r.moveTo = function(t, e) {
        var i = Math.abs(this.position.x - t),
            s = Math.abs(this.position.y - e);
        this.layout.dragItemCount && !this.isPlacing && !this.isTransitioning && i < 1 && s < 1 ? this.goTo(t, e) : h.apply(this, arguments)
    }, r.enablePlacing = function() { this.removeTransitionStyles(), this.isTransitioning && i && (this.element.style[i] = "none"), this.isTransitioning = !1, this.getSize(), this.layout._setRectSize(this.element, this.rect), this.isPlacing = !0 }, r.disablePlacing = function() { this.isPlacing = !1 }, r.removeElem = function() { this.element.parentNode.removeChild(this.element), this.layout.packer.addSpace(this.rect), this.emitEvent("remove", [this]) }, r.showDropPlaceholder = function() {
        var t = this.dropPlaceholder;
        t || ((t = this.dropPlaceholder = document.createElement("div")).className = "packery-drop-placeholder", t.style.position = "absolute"), t.style.width = this.size.width + "px", t.style.height = this.size.height + "px", this.positionDropPlaceholder(), this.layout.element.appendChild(t)
    }, r.positionDropPlaceholder = function() { this.dropPlaceholder.style[i] = "translate(" + this.rect.x + "px, " + this.rect.y + "px)" }, r.hideDropPlaceholder = function() { this.layout.element.removeChild(this.dropPlaceholder) }, s
}),
function(t, e) { "function" == typeof define && define.amd ? define("packery/js/packery", ["get-size/get-size", "outlayer/outlayer", "./rect", "./packer", "./item"], e) : "object" == typeof module && module.exports ? module.exports = e(require("get-size"), require("outlayer"), require("./rect"), require("./packer"), require("./item")) : t.Packery = e(t.getSize, t.Outlayer, t.Packery.Rect, t.Packery.Packer, t.Packery.Item) }(window, function(t, e, i, s, r) {
    i.prototype.canFit = function(t) { return this.width >= t.width - 2 && this.height >= t.height - 2 };
    var n = e.create("packery");
    n.Item = r;
    var h = n.prototype;

    function o(t, e) { return t.position.y - e.position.y || t.position.x - e.position.x }

    function a(t, e) { return t.position.x - e.position.x || t.position.y - e.position.y }
    h._create = function() {
        e.prototype._create.call(this), this.packer = new s, this.shiftPacker = new s, this.isEnabled = !0, this.dragItemCount = 0;
        var t = this;
        this.handleDraggabilly = { dragStart: function() { t.itemDragStart(this.element) }, dragMove: function() { t.itemDragMove(this.element, this.position.x, this.position.y) }, dragEnd: function() { t.itemDragEnd(this.element) } }, this.handleUIDraggable = { start: function(e, i) { i && t.itemDragStart(e.currentTarget) }, drag: function(e, i) { i && t.itemDragMove(e.currentTarget, i.position.left, i.position.top) }, stop: function(e, i) { i && t.itemDragEnd(e.currentTarget) } }
    }, h._resetLayout = function() {
        var t, e, i;
        this.getSize(), this._getMeasurements(), this._getOption("horizontal") ? (t = 1 / 0, e = this.size.innerHeight + this.gutter, i = "rightwardTopToBottom") : (t = this.size.innerWidth + this.gutter, e = 1 / 0, i = "downwardLeftToRight"), this.packer.width = this.shiftPacker.width = t, this.packer.height = this.shiftPacker.height = e, this.packer.sortDirection = this.shiftPacker.sortDirection = i, this.packer.reset(), this.maxY = 0, this.maxX = 0
    }, h._getMeasurements = function() { this._getMeasurement("columnWidth", "width"), this._getMeasurement("rowHeight", "height"), this._getMeasurement("gutter", "width") }, h._getItemLayoutPosition = function(t) {
        if (this._setRectSize(t.element, t.rect), this.isShifting || this.dragItemCount > 0) {
            var e = this._getPackMethod();
            this.packer[e](t.rect)
        } else this.packer.pack(t.rect);
        return this._setMaxXY(t.rect), t.rect
    }, h.shiftLayout = function() { this.isShifting = !0, this.layout(), delete this.isShifting }, h._getPackMethod = function() { return this._getOption("horizontal") ? "rowPack" : "columnPack" }, h._setMaxXY = function(t) { this.maxX = Math.max(t.x + t.width, this.maxX), this.maxY = Math.max(t.y + t.height, this.maxY) }, h._setRectSize = function(e, i) {
        window.currentPackeryElement = e;
        var s = t(e),
            r = s.outerWidth,
            n = s.outerHeight;
        (r || n) && (r = this._applyGridGutter(r, this.columnWidth), n = this._applyGridGutter(n, this.rowHeight)), i.width = Math.min(r, this.packer.width), i.height = Math.min(n, this.packer.height)
    }, h._applyGridGutter = function(t, e) { if (!e) return t + this.gutter; var i = t % (e += this.gutter); return t = Math[i && i < 1 ? "round" : "ceil"](t / e) * e }, h._getContainerSize = function() { return this._getOption("horizontal") ? { width: this.maxX - this.gutter } : { height: this.maxY - this.gutter } }, h._manageStamp = function(t) {
        var e, s = this.getItem(t);
        if (s && s.isPlacing) e = s.rect;
        else {
            var r = this._getElementOffset(t);
            e = new i({ x: this._getOption("originLeft") ? r.left : r.right, y: this._getOption("originTop") ? r.top : r.bottom })
        }
        this._setRectSize(t, e), this.packer.placed(e), this._setMaxXY(e)
    }, h.sortItemsByPosition = function() {
        var t = this._getOption("horizontal") ? a : o;
        this.items.sort(t)
    }, h.fit = function(t, e, i) {
        var s = this.getItem(t);
        s && (this.stamp(s.element), s.enablePlacing(), this.updateShiftTargets(s), e = void 0 === e ? s.rect.x : e, i = void 0 === i ? s.rect.y : i, this.shift(s, e, i), this._bindFitEvents(s), s.moveTo(s.rect.x, s.rect.y), this.shiftLayout(), this.unstamp(s.element), this.sortItemsByPosition(), s.disablePlacing())
    }, h._bindFitEvents = function(t) {
        var e = this,
            i = 0;

        function s() { 2 == ++i && e.dispatchEvent("fitComplete", null, [t]) }
        t.once("layout", s), this.once("layoutComplete", s)
    }, h.resize = function() { this.isResizeBound && this.needsResizeLayout() && (this.options.shiftPercentResize ? this.resizeShiftPercentLayout() : this.layout()) }, h.needsResizeLayout = function() {
        var e = t(this.element),
            i = this._getOption("horizontal") ? "innerHeight" : "innerWidth";
        return e[i] != this.size[i]
    }, h.resizeShiftPercentLayout = function() {
        var e = this._getItemsForLayout(this.items),
            i = this._getOption("horizontal"),
            s = i ? "y" : "x",
            r = i ? "height" : "width",
            n = i ? "rowHeight" : "columnWidth",
            h = i ? "innerHeight" : "innerWidth",
            o = this[n];
        if (o = o && o + this.gutter) {
            this._getMeasurements();
            var a = this[n] + this.gutter;
            e.forEach(function(t) {
                var e = Math.round(t.rect[s] / o);
                t.rect[s] = e * a
            })
        } else {
            var c = t(this.element)[h] + this.gutter,
                u = this.packer[r];
            e.forEach(function(t) { t.rect[s] = t.rect[s] / u * c })
        }
        this.shiftLayout()
    }, h.itemDragStart = function(t) {
        if (this.isEnabled) {
            this.stamp(t);
            var e = this.getItem(t);
            e && (e.enablePlacing(), e.showDropPlaceholder(), this.dragItemCount++, this.updateShiftTargets(e))
        }
    }, h.updateShiftTargets = function(t) {
        this.shiftPacker.reset(), this._getBoundingRect();
        var e = this._getOption("originLeft"),
            s = this._getOption("originTop");
        this.stamps.forEach(function(t) {
            var r = this.getItem(t);
            if (!r || !r.isPlacing) {
                var n = this._getElementOffset(t),
                    h = new i({ x: e ? n.left : n.right, y: s ? n.top : n.bottom });
                this._setRectSize(t, h), this.shiftPacker.placed(h)
            }
        }, this);
        var r, n = this._getOption("horizontal"),
            h = n ? "rowHeight" : "columnWidth",
            o = n ? "height" : "width";
        this.shiftTargetKeys = [], this.shiftTargets = [];
        var a = this[h];
        if (a = a && a + this.gutter) {
            var c = Math.ceil(t.rect[o] / a),
                u = Math.floor((this.shiftPacker[o] + this.gutter) / a);
            r = (u - c) * a;
            for (var d = 0; d < u; d++) this._addShiftTarget(d * a, 0, r)
        } else r = this.shiftPacker[o] + this.gutter - t.rect[o], this._addShiftTarget(0, 0, r);
        var g = this._getItemsForLayout(this.items),
            l = this._getPackMethod();
        g.forEach(function(t) {
            var e = t.rect;
            this._setRectSize(t.element, e), this.shiftPacker[l](e), this._addShiftTarget(e.x, e.y, r);
            var i = n ? e.x + e.width : e.x,
                s = n ? e.y : e.y + e.height;
            if (this._addShiftTarget(i, s, r), a)
                for (var h = Math.round(e[o] / a), c = 1; c < h; c++) {
                    var u = n ? i : e.x + a * c,
                        d = n ? e.y + a * c : s;
                    this._addShiftTarget(u, d, r)
                }
        }, this)
    }, h._addShiftTarget = function(t, e, i) { var s = this._getOption("horizontal") ? e : t; if (!(0 !== s && s > i)) { var r = t + "," + e; - 1 != this.shiftTargetKeys.indexOf(r) || (this.shiftTargetKeys.push(r), this.shiftTargets.push({ x: t, y: e })) } }, h.shift = function(t, e, i) {
        var s, r = 1 / 0,
            n = { x: e, y: i };
        this.shiftTargets.forEach(function(t) {
            var e, i, h, o, a = (h = (i = n).x - (e = t).x, o = i.y - e.y, Math.sqrt(h * h + o * o));
            a < r && (s = t, r = a)
        }), t.rect.x = s.x, t.rect.y = s.y
    };
    h.itemDragMove = function(t, e, i) {
        var s = this.isEnabled && this.getItem(t);
        if (s) {
            e -= this.size.paddingLeft, i -= this.size.paddingTop;
            var r = this,
                n = new Date;
            this._itemDragTime && n - this._itemDragTime < 120 ? (clearTimeout(this.dragTimeout), this.dragTimeout = setTimeout(h, 120)) : (h(), this._itemDragTime = n)
        }

        function h() { r.shift(s, e, i), s.positionDropPlaceholder(), r.layout() }
    }, h.itemDragEnd = function(t) {
        var e = this.isEnabled && this.getItem(t);
        if (e) {
            clearTimeout(this.dragTimeout), e.element.classList.add("is-positioning-post-drag");
            var i = 0,
                s = this;
            e.once("layout", r), this.once("layoutComplete", r), e.moveTo(e.rect.x, e.rect.y), this.layout(), this.dragItemCount = Math.max(0, this.dragItemCount - 1), this.sortItemsByPosition(), e.disablePlacing(), this.unstamp(e.element)
        }

        function r() { 2 == ++i && (e.element.classList.remove("is-positioning-post-drag"), e.hideDropPlaceholder(), s.dispatchEvent("dragItemPositioned", null, [e])) }
    }, h.bindDraggabillyEvents = function(t) { this._bindDraggabillyEvents(t, "on") }, h.unbindDraggabillyEvents = function(t) { this._bindDraggabillyEvents(t, "off") }, h._bindDraggabillyEvents = function(t, e) {
        var i = this.handleDraggabilly;
        t[e]("dragStart", i.dragStart), t[e]("dragMove", i.dragMove), t[e]("dragEnd", i.dragEnd)
    }, h.bindUIDraggableEvents = function(t) { this._bindUIDraggableEvents(t, "on") }, h.unbindUIDraggableEvents = function(t) { this._bindUIDraggableEvents(t, "off") }, h._bindUIDraggableEvents = function(t, e) {
        var i = this.handleUIDraggable;
        t[e]("dragstart", i.start)[e]("drag", i.drag)[e]("dragstop", i.stop)
    };
    var c = h.destroy;
    return h.destroy = function() { c.apply(this, arguments), this.isEnabled = !1 }, n.Rect = i, n.Packer = s, n
}),
function(t, e) { "function" == typeof define && define.amd ? define(["isotope/js/layout-mode", "packery/js/packery"], e) : "object" == typeof module && module.exports ? module.exports = e(require("isotope-layout/js/layout-mode"), require("packery")) : e(t.Isotope.LayoutMode, t.Packery) }(window, function(t, e) {
    var i = t.create("packery"),
        s = i.prototype,
        r = { _getElementOffset: !0, _getMeasurement: !0 };
    for (var n in e.prototype) r[n] || (s[n] = e.prototype[n]);
    var h = s._resetLayout;
    s._resetLayout = function() { this.packer = this.packer || new e.Packer, this.shiftPacker = this.shiftPacker || new e.Packer, h.apply(this, arguments) };
    var o = s._getItemLayoutPosition;
    s._getItemLayoutPosition = function(t) { return t.rect = t.rect || new e.Rect, o.call(this, t) };
    var a = s.needsResizeLayout;
    s.needsResizeLayout = function() { return this._getOption("horizontal") ? this.needsVerticalResizeLayout() : a.call(this) };
    var c = s._getOption;
    return s._getOption = function(t) { return "horizontal" == t ? void 0 !== this.options.isHorizontal ? this.options.isHorizontal : this.options.horizontal : c.apply(this.isotope, arguments) }, i
});
! function(n) {
    "use strict";
    n.fn.emulateTransitionEnd = function(t) {
        var i = !1,
            r = this;
        n(this).one("bsTransitionEnd", function() { i = !0 });
        return setTimeout(function() { i || n(r).trigger(n.support.transition.end) }, t), this
    }, n(function() {
        n.support.transition = function() {
            var n = document.createElement("bootstrap"),
                t = { WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd otransitionend", transition: "transitionend" };
            for (var i in t)
                if (void 0 !== n.style[i]) return { end: t[i] };
            return !1
        }(), n.support.transition && (n.event.special.bsTransitionEnd = { bindType: n.support.transition.end, delegateType: n.support.transition.end, handle: function(t) { if (n(t.target).is(this)) return t.handleObj.handler.apply(this, arguments) } })
    })
}(jQuery);
! function(t) {
    "use strict";
    var e = ["sanitize", "whiteList", "sanitizeFn"],
        i = ["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"],
        o = { "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i], a: ["target", "href", "title", "rel"], area: [], b: [], br: [], col: [], code: [], div: [], em: [], hr: [], h1: [], h2: [], h3: [], h4: [], h5: [], h6: [], i: [], img: ["src", "alt", "title", "width", "height"], li: [], ol: [], p: [], pre: [], s: [], small: [], span: [], sub: [], sup: [], strong: [], u: [], ul: [] },
        n = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,
        s = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;

    function r(e, o) {
        var r = e.nodeName.toLowerCase();
        if (-1 !== t.inArray(r, o)) return -1 === t.inArray(r, i) || Boolean(e.nodeValue.match(n) || e.nodeValue.match(s));
        for (var a = t(o).filter(function(t, e) { return e instanceof RegExp }), l = 0, p = a.length; l < p; l++)
            if (r.match(a[l])) return !0;
        return !1
    }

    function a(e, i, o) {
        if (0 === e.length) return e;
        if (o && "function" == typeof o) return o(e);
        if (!document.implementation || !document.implementation.createHTMLDocument) return e;
        var n = document.implementation.createHTMLDocument("sanitization");
        n.body.innerHTML = e;
        for (var s = t.map(i, function(t, e) { return e }), a = t(n.body).find("*"), l = 0, p = a.length; l < p; l++) {
            var h = a[l],
                f = h.nodeName.toLowerCase();
            if (-1 !== t.inArray(f, s))
                for (var u = t.map(h.attributes, function(t) { return t }), c = [].concat(i["*"] || [], i[f] || []), d = 0, m = u.length; d < m; d++) r(u[d], c) || h.removeAttribute(u[d].nodeName);
            else h.parentNode.removeChild(h)
        }
        return n.body.innerHTML
    }
    var l = function(t, e) { this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", t, e) };
    l.VERSION = "3.3.5", l.TRANSITION_DURATION = 150, l.DEFAULTS = { animation: !0, placement: "top", selector: !1, template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>', trigger: "hover focus", title: "", delay: 0, html: !1, container: !1, viewport: { selector: "body", padding: 0 }, sanitize: !0, sanitizeFn: null, whiteList: o }, l.prototype.init = function(e, i, o) {
        if (this.enabled = !0, this.type = e, this.$element = t(i), this.options = this.getOptions(o), this.$viewport = this.options.viewport && t(document).find(t.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = { click: !1, hover: !1, focus: !1 }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var n = this.options.trigger.split(" "), s = n.length; s--;) {
            var r = n[s];
            if ("click" == r) this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this));
            else if ("manual" != r) {
                var a = "hover" == r ? "mouseenter" : "focusin",
                    l = "hover" == r ? "mouseleave" : "focusout";
                this.$element.on(a + "." + this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(l + "." + this.type, this.options.selector, t.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = t.extend({}, this.options, { trigger: "manual", selector: "" }) : this.fixTitle()
    }, l.prototype.getDefaults = function() { return l.DEFAULTS }, l.prototype.getOptions = function(i) { var o = this.$element.data(); for (var n in o) o.hasOwnProperty(n) && -1 !== t.inArray(n, e) && delete o[n]; return (i = t.extend({}, this.getDefaults(), this.$element.data(), i)).delay && "number" == typeof i.delay && (i.delay = { show: i.delay, hide: i.delay }), i.sanitize && (i.template = a(i.template, i.whiteList, i.sanitizeFn)), i }, l.prototype.getDelegateOptions = function() {
        var e = {},
            i = this.getDefaults();
        return this._options && t.each(this._options, function(t, o) { i[t] != o && (e[t] = o) }), e
    }, l.prototype.enter = function(e) {
        var i = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        if (i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i)), e instanceof t.Event && (i.inState["focusin" == e.type ? "focus" : "hover"] = !0), i.tip().hasClass("in") || "in" == i.hoverState) i.hoverState = "in";
        else {
            if (clearTimeout(i.timeout), i.hoverState = "in", !i.options.delay || !i.options.delay.show) return i.show();
            i.timeout = setTimeout(function() { "in" == i.hoverState && i.show() }, i.options.delay.show)
        }
    }, l.prototype.isInStateTrue = function() {
        for (var t in this.inState)
            if (this.inState[t]) return !0;
        return !1
    }, l.prototype.leave = function(e) {
        var i = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        if (i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i)), e instanceof t.Event && (i.inState["focusout" == e.type ? "focus" : "hover"] = !1), !i.isInStateTrue()) {
            if (clearTimeout(i.timeout), i.hoverState = "out", !i.options.delay || !i.options.delay.hide) return i.hide();
            i.timeout = setTimeout(function() { "out" == i.hoverState && i.hide() }, i.options.delay.hide)
        }
    }, l.prototype.show = function() {
        var e = t.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(e);
            var i = t.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (e.isDefaultPrevented() || !i) return;
            var o = this,
                n = this.tip(),
                s = this.getUID(this.type);
            this.setContent(), n.attr("id", s), this.$element.attr("aria-describedby", s), this.options.animation && n.addClass("fade");
            var r = "function" == typeof this.options.placement ? this.options.placement.call(this, n[0], this.$element[0]) : this.options.placement,
                a = /\s?auto?\s?/i,
                p = a.test(r);
            p && (r = r.replace(a, "") || "top"), n.detach().css({ top: 0, left: 0, display: "block" }).addClass(r).data("bs." + this.type, this).addClass(this.$element.data("class")), this.options.container ? n.appendTo(t(document).find(this.options.container)) : n.insertAfter(this.$element), this.$element.trigger("inserted.bs." + this.type);
            var h = this.getPosition(),
                f = n[0].offsetWidth,
                u = n[0].offsetHeight;
            if (p) {
                var c = r,
                    d = this.getPosition(this.$viewport);
                r = "bottom" == r && h.bottom + u > d.bottom ? "top" : "top" == r && h.top - u < d.top ? "bottom" : "right" == r && h.right + f > d.width ? "left" : "left" == r && h.left - f < d.left ? "right" : r, n.removeClass(c).addClass(r)
            }
            var m = this.getCalculatedOffset(r, h, f, u);
            this.applyPlacement(m, r);
            var g = function() {
                var t = o.hoverState;
                o.$element.trigger("shown.bs." + o.type), o.hoverState = null, "out" == t && o.leave(o)
            };
            t.support.transition && this.$tip.hasClass("fade") ? n.one("bsTransitionEnd", g).emulateTransitionEnd(l.TRANSITION_DURATION) : g()
        }
    }, l.prototype.applyPlacement = function(e, i) {
        var o = this.tip(),
            n = o[0].offsetWidth,
            s = o[0].offsetHeight,
            r = parseInt(o.css("margin-top"), 10),
            a = parseInt(o.css("margin-left"), 10);
        isNaN(r) && (r = 0), isNaN(a) && (a = 0), e.top += r, e.left += a, t.offset.setOffset(o[0], t.extend({ using: function(t) { o.css({ top: Math.round(t.top), left: Math.round(t.left) }) } }, e), 0), o.addClass("in");
        var l = o[0].offsetWidth,
            p = o[0].offsetHeight;
        "top" == i && p != s && (e.top = e.top + s - p);
        var h = this.getViewportAdjustedDelta(i, e, l, p);
        h.left ? e.left += h.left : e.top += h.top;
        var f = /top|bottom/.test(i),
            u = f ? 2 * h.left - n + l : 2 * h.top - s + p,
            c = f ? "offsetWidth" : "offsetHeight";
        o.offset(e), this.replaceArrow(u, o[0][c], f)
    }, l.prototype.replaceArrow = function(t, e, i) { this.arrow().css(i ? "left" : "top", 50 * (1 - t / e) + "%").css(i ? "top" : "left", "") }, l.prototype.setContent = function() {
        var t = this.tip(),
            e = this.getTitle();
        this.options.html ? (this.options.sanitize && (e = a(e, this.options.whiteList, this.options.sanitizeFn)), t.find(".tooltip-inner").html(e)) : t.find(".tooltip-inner").text(e), t.removeClass("fade in top bottom left right")
    }, l.prototype.hide = function(e) {
        var i = this,
            o = t(this.$tip),
            n = t.Event("hide.bs." + this.type);

        function s() { "in" != i.hoverState && o.detach(), i.$element.removeAttr("aria-describedby").trigger("hidden.bs." + i.type), e && e() }
        if (this.$element.trigger(n), !n.isDefaultPrevented()) return o.removeClass("in"), t.support.transition && o.hasClass("fade") ? o.one("bsTransitionEnd", s).emulateTransitionEnd(l.TRANSITION_DURATION) : s(), this.hoverState = null, this
    }, l.prototype.fixTitle = function() {
        var t = this.$element;
        (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
    }, l.prototype.hasContent = function() { return this.getTitle() }, l.prototype.getPosition = function(e) {
        var i = (e = e || this.$element)[0],
            o = "BODY" == i.tagName,
            n = i.getBoundingClientRect();
        null == n.width && (n = t.extend({}, n, { width: n.right - n.left, height: n.bottom - n.top }));
        var s = o ? { top: 0, left: 0 } : e.offset(),
            r = { scroll: o ? document.documentElement.scrollTop || document.body.scrollTop : e.scrollTop() },
            a = o ? { width: t(window).width(), height: t(window).height() } : null;
        return t.extend({}, n, r, a, s)
    }, l.prototype.getCalculatedOffset = function(t, e, i, o) { return "bottom" == t ? { top: e.top + e.height, left: e.left + e.width / 2 - i / 2 } : "top" == t ? { top: e.top - o, left: e.left + e.width / 2 - i / 2 } : "left" == t ? { top: e.top + e.height / 2 - o / 2, left: e.left - i } : { top: e.top + e.height / 2 - o / 2, left: e.left + e.width } }, l.prototype.getViewportAdjustedDelta = function(t, e, i, o) {
        var n = { top: 0, left: 0 };
        if (!this.$viewport) return n;
        var s = this.options.viewport && this.options.viewport.padding || 0,
            r = this.getPosition(this.$viewport);
        if (/right|left/.test(t)) {
            var a = e.top - s - r.scroll,
                l = e.top + s - r.scroll + o;
            a < r.top ? n.top = r.top - a : l > r.top + r.height && (n.top = r.top + r.height - l)
        } else {
            var p = e.left - s,
                h = e.left + s + i;
            p < r.left ? n.left = r.left - p : h > r.right && (n.left = r.left + r.width - h)
        }
        return n
    }, l.prototype.getTitle = function() {
        var t = this.$element,
            e = this.options;
        return t.attr("data-original-title") || ("function" == typeof e.title ? e.title.call(t[0]) : e.title)
    }, l.prototype.getUID = function(t) { do { t += ~~(1e6 * Math.random()) } while (document.getElementById(t)); return t }, l.prototype.tip = function() { if (!this.$tip && (this.$tip = t(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!"); return this.$tip }, l.prototype.arrow = function() { return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow") }, l.prototype.enable = function() { this.enabled = !0 }, l.prototype.disable = function() { this.enabled = !1 }, l.prototype.toggleEnabled = function() { this.enabled = !this.enabled }, l.prototype.toggle = function(e) {
        var i = this;
        e && ((i = t(e.currentTarget).data("bs." + this.type)) || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i))), e ? (i.inState.click = !i.inState.click, i.isInStateTrue() ? i.enter(i) : i.leave(i)) : i.tip().hasClass("in") ? i.leave(i) : i.enter(i)
    }, l.prototype.destroy = function() {
        var t = this;
        clearTimeout(this.timeout), this.hide(function() { t.$element.off("." + t.type).removeData("bs." + t.type), t.$tip && t.$tip.detach(), t.$tip = null, t.$arrow = null, t.$viewport = null })
    }, l.prototype.sanitizeHtml = function(t) { return a(t, this.options.whiteList, this.options.sanitizeFn) };
    var p = t.fn.tooltip;
    t.fn.tooltip = function(e) {
        return this.each(function() {
            var i = t(this),
                o = i.data("bs.tooltip"),
                n = "object" == typeof e && e;
            !o && /destroy|hide/.test(e) || (o || i.data("bs.tooltip", o = new l(this, n)), "string" == typeof e && "function" == typeof o[e] && o[e]())
        })
    }, t.fn.tooltip.Constructor = l, t.fn.tooltip.noConflict = function() { return t.fn.tooltip = p, this }
}(jQuery);
! function(e, n, t) {
    for (var i, a = 0, m = function(e) { i && (n.requestAnimationFrame(m, e), jQuery.fx.tick()) }, r = ["ms", "moz", "webkit", "o"], o = 0, u = r.length; o < u && !n.requestAnimationFrame; ++o) n.requestAnimationFrame = n[r[o] + "RequestAnimationFrame"], n.cancelAnimationFrame = n[r[o] + "CancelAnimationFrame"] || n[r[o] + "CancelRequestAnimationFrame"];
    n.requestAnimationFrame || (n.requestAnimationFrame = function(e, t) {
        var i = (new Date).getTime(),
            m = i - a,
            r = Math.max(0, 16 - m),
            o = n.setTimeout(function() { e(i + r) }, r);
        return a = i + r, o
    }), n.cancelAnimationFrame || (n.cancelAnimationFrame = function(e) { clearTimeout(e) }), jQuery.fx.timer = function(e) { e() && jQuery.timers.push(e) && !i && (i = !0, m(e.elem)) }, jQuery.fx.stop = function() { i = !1 }
}(jQuery, this);
! function($) {
    function sc_setScroll(t, e, s) { return "transition" == s.transition && "swing" == e && (e = "ease"), { anims: [], duration: t, orgDuration: t, easing: e, startTime: getTime() } }

    function sc_startScroll(t, e) {
        for (var s = 0, i = t.anims.length; s < i; s++) {
            var o = t.anims[s];
            o && o[0][e.transition](o[1], t.duration, t.easing, o[2])
        }
    }

    function sc_stopScroll(t, e) {
        is_boolean(e) || (e = !0), is_object(t.pre) && sc_stopScroll(t.pre, e);
        for (var s = 0, i = t.anims.length; s < i; s++) {
            var o = t.anims[s];
            o[0].stop(!0), e && (o[0].css(o[1]), is_function(o[2]) && o[2]())
        }
        is_object(t.post) && sc_stopScroll(t.post, e)
    }

    function sc_afterScroll(t, e, s) {
        switch (e && e.remove(), s.fx) {
            case "fade":
            case "crossfade":
            case "cover-fade":
            case "uncover-fade":
                t.css("opacity", 1), t.css("filter", "")
        }
    }

    function sc_fireCallbacks(t, e, s, i, o) {
        if (e[s] && e[s].call(t, i), o[s].length)
            for (var n = 0, r = o[s].length; n < r; n++) o[s][n].call(t, i);
        return []
    }

    function sc_fireQueue(t, e, s) { return e.length && (t.trigger(cf_e(e[0][0], s), e[0][1]), e.shift()), e }

    function sc_hideHiddenItems(t) {
        t.each(function() {
            var t = $(this);
            t.data("_cfs_isHidden", t.is(":hidden")).hide()
        })
    }

    function sc_showHiddenItems(t) {
        t && t.each(function() {
            var t = $(this);
            t.data("_cfs_isHidden") || t.show()
        })
    }

    function sc_clearTimers(t) { return t.auto && clearTimeout(t.auto), t.progress && clearInterval(t.progress), t }

    function sc_mapCallbackArguments(t, e, s, i, o, n, r) { return { width: r.width, height: r.height, items: { old: t, skipped: e, visible: s }, scroll: { items: i, direction: o, duration: n } } }

    function sc_getDuration(t, e, s, i) { var o = t.duration; return "none" == t.fx ? 0 : ("auto" == o ? o = e.scroll.duration / e.scroll.items * s : o < 10 && (o = i / o), o < 1 ? 0 : ("fade" == t.fx && (o /= 2), Math.round(o))) }

    function nv_showNavi(t, e, s) {
        var i = is_number(t.items.minimum) ? t.items.minimum : t.items.visible + 1;
        if ("show" == e || "hide" == e) var o = e;
        else if (i > e) {
            debug(s, "Not enough items (" + e + " total, " + i + " needed): Hiding navigation.");
            o = "hide"
        } else o = "show";
        var n = "show" == o ? "removeClass" : "addClass",
            r = cf_c("hidden", s);
        t.auto.button && t.auto.button[o]()[n](r), t.prev.button && t.prev.button[o]()[n](r), t.next.button && t.next.button[o]()[n](r), t.pagination.container && t.pagination.container[o]()[n](r)
    }

    function nv_enableNavi(t, e, s) {
        if (!t.circular && !t.infinite) {
            var i = ("removeClass" == e || "addClass" == e) && e,
                o = cf_c("disabled", s);
            if (t.auto.button && i && t.auto.button[i](o), t.prev.button) {
                var n = i || 0 == e ? "addClass" : "removeClass";
                t.prev.button[n](o)
            }
            if (t.next.button) {
                n = i || e == t.items.visible ? "addClass" : "removeClass";
                t.next.button[n](o)
            }
        }
    }

    function go_getObject(t, e) { return is_function(e) ? e = e.call(t) : is_undefined(e) && (e = {}), e }

    function go_getItemsObject(t, e) { return is_number(e = go_getObject(t, e)) ? e = { visible: e } : "variable" == e ? e = { visible: e, width: e, height: e } : is_object(e) || (e = {}), e }

    function go_getScrollObject(t, e) { return is_number(e = go_getObject(t, e)) ? e = e <= 50 ? { items: e } : { duration: e } : is_string(e) ? e = { easing: e } : is_object(e) || (e = {}), e }

    function go_getNaviObject(t, e) {
        if (is_string(e = go_getObject(t, e))) {
            var s = cf_getKeyCode(e);
            e = -1 == s ? $(e) : s
        }
        return e
    }

    function go_getAutoObject(t, e) { return is_jquery(e = go_getNaviObject(t, e)) ? e = { button: e } : is_boolean(e) ? e = { play: e } : is_number(e) && (e = { timeoutDuration: e }), e.progress && (is_string(e.progress) || is_jquery(e.progress)) && (e.progress = { bar: e.progress }), e }

    function go_complementAutoObject(t, e) { return is_function(e.button) && (e.button = e.button.call(t)), is_string(e.button) && (e.button = $(e.button)), is_boolean(e.play) || (e.play = !0), is_number(e.delay) || (e.delay = 0), is_undefined(e.pauseOnEvent) && (e.pauseOnEvent = !0), is_boolean(e.pauseOnResize) || (e.pauseOnResize = !0), is_number(e.timeoutDuration) || (e.timeoutDuration = e.duration < 10 ? 2500 : 5 * e.duration), e.progress && (is_function(e.progress.bar) && (e.progress.bar = e.progress.bar.call(t)), is_string(e.progress.bar) && (e.progress.bar = $(e.progress.bar)), e.progress.bar ? (is_function(e.progress.updater) || (e.progress.updater = $.fn.carouFredSel.progressbarUpdater), is_number(e.progress.interval) || (e.progress.interval = 50)) : e.progress = !1), e }

    function go_getPrevNextObject(t, e) { return is_jquery(e = go_getNaviObject(t, e)) ? e = { button: e } : is_number(e) && (e = { key: e }), e }

    function go_complementPrevNextObject(t, e) { return is_function(e.button) && (e.button = e.button.call(t)), is_string(e.button) && (e.button = $(e.button)), is_string(e.key) && (e.key = cf_getKeyCode(e.key)), e }

    function go_getPaginationObject(t, e) { return is_jquery(e = go_getNaviObject(t, e)) ? e = { container: e } : is_boolean(e) && (e = { keys: e }), e }

    function go_complementPaginationObject(t, e) { return is_function(e.container) && (e.container = e.container.call(t)), is_string(e.container) && (e.container = $(e.container)), is_number(e.items) || (e.items = !1), is_boolean(e.keys) || (e.keys = !1), is_function(e.anchorBuilder) || is_false(e.anchorBuilder) || (e.anchorBuilder = $.fn.carouFredSel.pageAnchorBuilder), is_number(e.deviation) || (e.deviation = 0), e }

    function go_getSwipeObject(t, e) { return is_function(e) && (e = e.call(t)), is_undefined(e) && (e = { onTouch: !1 }), is_true(e) ? e = { onTouch: e } : is_number(e) && (e = { items: e }), e }

    function go_complementSwipeObject(t, e) { return is_boolean(e.onTouch) || (e.onTouch = !0), is_boolean(e.onMouse) || (e.onMouse = !1), is_object(e.options) || (e.options = {}), is_boolean(e.options.triggerOnTouchEnd) || (e.options.triggerOnTouchEnd = !1), e }

    function go_getMousewheelObject(t, e) { return is_function(e) && (e = e.call(t)), is_true(e) ? e = {} : is_number(e) ? e = { items: e } : is_undefined(e) && (e = !1), e }

    function go_complementMousewheelObject(t, e) { return e }

    function gn_getItemIndex(t, e, s, i, o) { if (is_string(t) && (t = $(t, o)), is_object(t) && (t = $(t, o)), is_jquery(t) ? (t = o.children().index(t), is_boolean(s) || (s = !1)) : is_boolean(s) || (s = !0), is_number(t) || (t = 0), is_number(e) || (e = 0), s && (t += i.first), t += e, i.total > 0) { for (; t >= i.total;) t -= i.total; for (; t < 0;) t += i.total } return t }

    function gn_getVisibleItemsPrev(t, e, s) {
        for (var i = 0, o = 0, n = s; n >= 0; n--) {
            var r = t.eq(n);
            if ((i += r.is(":visible") ? r[e.d.outerWidth](!0) : 0) > e.maxDimension) return o;
            0 == n && (n = t.length), o++
        }
    }

    function gn_getVisibleItemsPrevFilter(t, e, s) { return gn_getItemsPrevFilter(t, e.items.filter, e.items.visibleConf.org, s) }

    function gn_getScrollItemsPrevFilter(t, e, s, i) { return gn_getItemsPrevFilter(t, e.items.filter, i, s) }

    function gn_getItemsPrevFilter(t, e, s, i) {
        for (var o = 0, n = 0, r = i, c = t.length; r >= 0; r--) {
            if (++n == c) return n;
            if (t.eq(r).is(e) && ++o == s) return n;
            0 == r && (r = c)
        }
    }

    function gn_getVisibleOrg(t, e) { return e.items.visibleConf.org || t.children().slice(0, e.items.visible).filter(e.items.filter).length }

    function gn_getVisibleItemsNext(t, e, s) {
        for (var i = 0, o = 0, n = s, r = t.length - 1; n <= r; n++) {
            var c = t.eq(n);
            if ((i += c.is(":visible") ? c[e.d.outerWidth](!0) : 0) > e.maxDimension) return o;
            if (++o == r + 1) return o;
            n == r && (n = -1)
        }
    }

    function gn_getVisibleItemsNextTestCircular(t, e, s, i) { var o = gn_getVisibleItemsNext(t, e, s); return e.circular || s + o > i && (o = i - s), o }

    function gn_getVisibleItemsNextFilter(t, e, s) { return gn_getItemsNextFilter(t, e.items.filter, e.items.visibleConf.org, s, e.circular) }

    function gn_getScrollItemsNextFilter(t, e, s, i) { return gn_getItemsNextFilter(t, e.items.filter, i + 1, s, e.circular) - 1 }

    function gn_getItemsNextFilter(t, e, s, i, o) {
        for (var n = 0, r = 0, c = i, a = t.length - 1; c <= a; c++) {
            if (++r >= a) return r;
            if (t.eq(c).is(e) && ++n == s) return r;
            c == a && (c = -1)
        }
    }

    function gi_getCurrentItems(t, e) { return t.slice(0, e.items.visible) }

    function gi_getOldItemsPrev(t, e, s) { return t.slice(s, e.items.visibleConf.old + s) }

    function gi_getNewItemsPrev(t, e) { return t.slice(0, e.items.visible) }

    function gi_getOldItemsNext(t, e) { return t.slice(0, e.items.visibleConf.old) }

    function gi_getNewItemsNext(t, e, s) { return t.slice(s, e.items.visible + s) }

    function sz_storeMargin(t, e, s) {
        e.usePadding && (is_string(s) || (s = "_cfs_origCssMargin"), t.each(function() {
            var t = $(this),
                i = parseInt(t.css(e.d.marginRight), 10);
            is_number(i) || (i = 0), t.data(s, i)
        }))
    }

    function sz_resetMargin(t, e, s) {
        if (e.usePadding) {
            var i = !!is_boolean(s) && s;
            is_number(s) || (s = 0), sz_storeMargin(t, e, "_cfs_tempCssMargin"), t.each(function() {
                var t = $(this);
                t.css(e.d.marginRight, i ? t.data("_cfs_tempCssMargin") : s + t.data("_cfs_origCssMargin"))
            })
        }
    }

    function sz_storeOrigCss(t) {
        t.each(function() {
            var t = $(this);
            t.data("_cfs_origCss", t.attr("style") || "")
        })
    }

    function sz_restoreOrigCss(t) {
        t.each(function() {
            var t = $(this);
            t.attr("style", t.data("_cfs_origCss") || "")
        })
    }

    function sz_setResponsiveSizes(t, e) {
        t.items.visible;
        var s = t.items[t.d.width],
            i = t[t.d.height],
            o = is_percentage(i);
        e.each(function() {
            var e = $(this),
                n = s - ms_getPaddingBorderMargin(e, t, "Width");
            e[t.d.width](n), o && e[t.d.height](ms_getPercentage(n, i))
        })
    }

    function sz_setSizes(t, e) {
        var s = t.parent(),
            i = t.children(),
            o = gi_getCurrentItems(i, e),
            n = cf_mapWrapperSizes(ms_getSizes(o, e, !0), e, !1);
        if (s.css(n), e.usePadding) {
            var r = e.padding,
                c = r[e.d[1]];
            e.align && c < 0 && (c = 0);
            var a = o.last();
            a.css(e.d.marginRight, a.data("_cfs_origCssMargin") + c), t.css(e.d.top, r[e.d[0]]), t.css(e.d.left, r[e.d[3]])
        }
        return t.css(e.d.width, n[e.d.width] + 2 * ms_getTotalSize(i, e, "width")), t.css(e.d.height, ms_getLargestSize(i, e, "height")), e.centerVertically && t.css("line-height", n.height + "px"), n
    }

    function ms_getSizes(t, e, s) { return [ms_getTotalSize(t, e, "width", s), ms_getLargestSize(t, e, "height", s)] }

    function ms_getLargestSize(t, e, s, i) { return is_boolean(i) || (i = !1), is_number(e[e.d[s]]) && i ? e[e.d[s]] : is_number(e.items[e.d[s]]) ? e.items[e.d[s]] : ms_getTrueLargestSize(t, e, s = s.toLowerCase().indexOf("width") > -1 ? "outerWidth" : "outerHeight") }

    function ms_getTrueLargestSize(t, e, s) {
        for (var i = 0, o = 0, n = t.length; o < n; o++) {
            var r = t.eq(o).find(".fusion-carousel-item-wrapper"),
                c = r.is(":visible") ? r[e.d[s]](!0) : 0;
            i < c && (i = c)
        }
        return i
    }

    function ms_getTotalSize(t, e, s, i) {
        if (is_boolean(i) || (i = !1), is_number(e[e.d[s]]) && i) return e[e.d[s]];
        if (is_number(e.items[e.d[s]])) return e.items[e.d[s]] * t.length;
        for (var o = s.toLowerCase().indexOf("width") > -1 ? "outerWidth" : "outerHeight", n = 0, r = 0, c = t.length; r < c; r++) {
            var a = t.eq(r);
            n += a.is(":visible") ? a[e.d[o]](!0) : 0
        }
        return n
    }

    function ms_getParentSize(t, e, s) {
        var i = t.is(":visible");
        i && t.hide();
        var o = t.parent()[e.d[s]]();
        return i && t.show(), o
    }

    function ms_getMaxDimension(t, e) { return is_number(t[t.d.width]) ? t[t.d.width] : e }

    function ms_hasVariableSizes(t, e, s) {
        for (var i = !1, o = !1, n = 0, r = t.length; n < r; n++) {
            var c = t.eq(n),
                a = c.is(":visible") ? c[e.d[s]](!0) : 0;
            !1 === i ? i = a : i != a && (o = !0), 0 == i && (o = !0)
        }
        return o
    }

    function ms_getPaddingBorderMargin(t, e, s) { return t[e.d["outer" + s]](!0) - t[e.d[s.toLowerCase()]]() }

    function ms_getPercentage(t, e) {
        if (is_percentage(e)) {
            if (!is_number(e = parseInt(e.slice(0, -1), 10))) return t;
            t *= e / 100
        }
        return t
    }

    function cf_e(t, e, s, i, o) { return is_boolean(s) || (s = !0), is_boolean(i) || (i = !0), is_boolean(o) || (o = !1), s && (t = e.events.prefix + t), i && (t = t + "." + e.events.namespace), i && o && (t += e.serialNumber), t }

    function cf_c(t, e) { return is_string(e.classnames[t]) ? e.classnames[t] : t }

    function cf_mapWrapperSizes(t, e, s) {
        is_boolean(s) || (s = !0);
        var i = e.usePadding && s ? e.padding : [0, 0, 0, 0],
            o = {};
        return o[e.d.width] = t[0] + i[1] + i[3], o[e.d.height] = t[1] + i[0] + i[2], o
    }

    function cf_sortParams(t, e) {
        for (var s = [], i = 0, o = t.length; i < o; i++)
            for (var n = 0, r = e.length; n < r; n++)
                if (e[n].indexOf(typeof t[i]) > -1 && is_undefined(s[n])) { s[n] = t[i]; break }
        return s
    }

    function cf_getPadding(t) {
        if (is_undefined(t)) return [0, 0, 0, 0];
        if (is_number(t)) return [t, t, t, t];
        if (is_string(t) && (t = t.split("px").join("").split("em").join("").split(" ")), !is_array(t)) return [0, 0, 0, 0];
        for (var e = 0; e < 4; e++) t[e] = parseInt(t[e], 10);
        switch (t.length) {
            case 0:
                return [0, 0, 0, 0];
            case 1:
                return [t[0], t[0], t[0], t[0]];
            case 2:
                return [t[0], t[1], t[0], t[1]];
            case 3:
                return [t[0], t[1], t[2], t[1]];
            default:
                return [t[0], t[1], t[2], t[3]]
        }
    }

    function cf_getAlignPadding(t, e) {
        var s = is_number(e[e.d.width]) ? Math.ceil(e[e.d.width] - ms_getTotalSize(t, e, "width")) : 0;
        switch (e.align) {
            case "left":
                return [0, s];
            case "right":
                return [s, 0];
            case "center":
            default:
                return [Math.ceil(s / 2), Math.floor(s / 2)]
        }
    }

    function cf_getDimensions(t) {
        for (var e = [
                ["width", "innerWidth", "outerWidth", "height", "innerHeight", "outerHeight", "left", "top", "marginRight", 0, 1, 2, 3],
                ["height", "innerHeight", "outerHeight", "width", "innerWidth", "outerWidth", "top", "left", "marginBottom", 3, 2, 1, 0]
            ], s = e[0].length, i = "right" == t.direction || "left" == t.direction ? 0 : 1, o = {}, n = 0; n < s; n++) o[e[0][n]] = e[i][n];
        return o
    }

    function cf_getAdjust(t, e, s, i) {
        var o = t;
        if (is_function(s)) o = s.call(i, o);
        else if (is_string(s)) {
            var n = s.split("+"),
                r = s.split("-");
            if (r.length > n.length) var c = !0,
                a = r[0],
                f = r[1];
            else c = !1, a = n[0], f = n[1];
            switch (a) {
                case "even":
                    o = t % 2 == 1 ? t - 1 : t;
                    break;
                case "odd":
                    o = t % 2 == 0 ? t - 1 : t;
                    break;
                default:
                    o = t
            }
            is_number(f = parseInt(f, 10)) && (c && (f = -f), o += f)
        }
        return (!is_number(o) || o < 1) && (o = 1), o
    }

    function cf_getItemsAdjust(t, e, s, i) { return cf_getItemAdjustMinMax(cf_getAdjust(t, e, s, i), e.items.visibleConf) }

    function cf_getItemAdjustMinMax(t, e) { return is_number(e.min) && t < e.min && (t = e.min), is_number(e.max) && t > e.max && (t = e.max), t < 1 && (t = 1), t }

    function cf_getSynchArr(t) {
        is_array(t) || (t = [
            [t]
        ]), is_array(t[0]) || (t = [t]);
        for (var e = 0, s = t.length; e < s; e++) is_string(t[e][0]) && (t[e][0] = $(t[e][0])), is_boolean(t[e][1]) || (t[e][1] = !0), is_boolean(t[e][2]) || (t[e][2] = !0), is_number(t[e][3]) || (t[e][3] = 0);
        return t
    }

    function cf_getKeyCode(t) { return "right" == t ? 39 : "left" == t ? 37 : "up" == t ? 38 : "down" == t ? 40 : -1 }

    function cf_setCookie(t, e, s) {
        if (t) {
            var i = e.triggerHandler(cf_e("currentPosition", s));
            $.fn.carouFredSel.cookie.set(t, i)
        }
    }

    function cf_getCookie(t) { var e = $.fn.carouFredSel.cookie.get(t); return "" == e ? 0 : e }

    function in_mapCss(t, e) { for (var s = {}, i = 0, o = e.length; i < o; i++) s[e[i]] = t.css(e[i]); return s }

    function in_complementItems(t, e, s, i) { return is_object(t.visibleConf) || (t.visibleConf = {}), is_object(t.sizesConf) || (t.sizesConf = {}), 0 == t.start && is_number(i) && (t.start = i), is_object(t.visible) ? (t.visibleConf.min = t.visible.min, t.visibleConf.max = t.visible.max, t.visible = !1) : is_string(t.visible) ? ("variable" == t.visible ? t.visibleConf.variable = !0 : t.visibleConf.adjust = t.visible, t.visible = !1) : is_function(t.visible) && (t.visibleConf.adjust = t.visible, t.visible = !1), is_string(t.filter) || (t.filter = s.filter(":hidden").length > 0 ? ":visible" : "*"), t[e.d.width] || (e.responsive ? (debug(!0, "Set a " + e.d.width + " for the items!"), t[e.d.width] = ms_getTrueLargestSize(s, e, "outerWidth")) : t[e.d.width] = ms_hasVariableSizes(s, e, "outerWidth") ? "variable" : s[e.d.outerWidth](!0)), t[e.d.height] || (t[e.d.height] = ms_hasVariableSizes(s, e, "outerHeight") ? "variable" : s[e.d.outerHeight](!0)), t.sizesConf.width = t.width, t.sizesConf.height = t.height, t }

    function in_complementVisibleItems(t, e) { return "variable" == t.items[t.d.width] && (t.items.visibleConf.variable = !0), t.items.visibleConf.variable || (is_number(t[t.d.width]) ? t.items.visible = Math.floor(t[t.d.width] / t.items[t.d.width]) : (t.items.visible = Math.floor(e / t.items[t.d.width]), t[t.d.width] = t.items.visible * t.items[t.d.width], t.items.visibleConf.adjust || (t.align = !1)), ("Infinity" == t.items.visible || t.items.visible < 1) && (debug(!0, 'Not a valid number of visible items: Set to "variable".'), t.items.visibleConf.variable = !0)), t }

    function in_complementPrimarySize(t, e, s) { return "auto" == t && (t = ms_getTrueLargestSize(s, e, "outerWidth")), t }

    function in_complementSecondarySize(t, e, s) { return "auto" == t && (t = ms_getTrueLargestSize(s, e, "outerHeight")), t || (t = e.items[e.d.height]), t }

    function in_getAlignPadding(t, e) { var s = cf_getAlignPadding(gi_getCurrentItems(e, t), t); return t.padding[t.d[1]] = s[1], t.padding[t.d[3]] = s[0], t }

    function in_getResponsiveValues(t, e, s) {
        var i = cf_getItemAdjustMinMax(Math.ceil(t[t.d.width] / t.items[t.d.width]), t.items.visibleConf);
        i > e.length && (i = e.length);
        var o = Math.floor(t[t.d.width] / i);
        return t.items.visible = i, t.items[t.d.width] = o, t[t.d.width] = i * o, t
    }

    function bt_pauseOnHoverConfig(t) {
        if (is_string(t)) var e = t.indexOf("immediate") > -1,
            s = t.indexOf("resume") > -1;
        else e = s = !1;
        return [e, s]
    }

    function bt_mousesheelNumber(t) { return is_number(t) ? t : null }

    function is_null(t) { return null === t }

    function is_undefined(t) { return is_null(t) || void 0 === t || "" === t || "undefined" === t }

    function is_array(t) { return t instanceof Array }

    function is_jquery(t) { return t instanceof jQuery }

    function is_object(t) { return (t instanceof Object || "object" == typeof t) && !is_null(t) && !is_jquery(t) && !is_array(t) && !is_function(t) }

    function is_number(t) { return (t instanceof Number || "number" == typeof t) && !isNaN(t) }

    function is_string(t) { return (t instanceof String || "string" == typeof t) && !is_undefined(t) && !is_true(t) && !is_false(t) }

    function is_function(t) { return t instanceof Function || "function" == typeof t }

    function is_boolean(t) { return t instanceof Boolean || "boolean" == typeof t || is_true(t) || is_false(t) }

    function is_true(t) { return !0 === t || "true" === t }

    function is_false(t) { return !1 === t || "false" === t }

    function is_percentage(t) { return is_string(t) && "%" == t.slice(-1) }

    function getTime() { return (new Date).getTime() }

    function deprecated(t, e) { debug(!0, t + " is DEPRECATED, support for it will be removed. Use " + e + " instead.") }

    function debug(t, e) {
        if (!is_undefined(window.console) && !is_undefined(window.console.log)) {
            if (is_object(t)) {
                var s = " (" + t.selector + ")";
                t = t.debug
            } else s = "";
            if (!t) return !1;
            e = is_string(e) ? "carouFredSel" + s + ": " + e : ["carouFredSel" + s + ":", e], window.console.log(e)
        }
        return !1
    }
    $.fn.carouFredSel || ($.fn.caroufredsel = $.fn.carouFredSel = function(options, configs) {
        if (0 == this.length) return debug(!0, 'No element found for "' + this.selector + '".'), this;
        if (this.length > 1) return this.each(function() { $(this).carouFredSel(options, configs) });
        var $cfs = this,
            $tt0 = this[0],
            starting_position = !1;
        $cfs.data("_cfs_isCarousel") && (starting_position = $cfs.triggerHandler("_cfs_triggerEvent", "currentPosition"), $cfs.trigger("_cfs_triggerEvent", ["destroy", !0]));
        var FN = {
            _init: function(t, e, s) {
                (t = go_getObject($tt0, t)).items = go_getItemsObject($tt0, t.items), t.scroll = go_getScrollObject($tt0, t.scroll), t.auto = go_getAutoObject($tt0, t.auto), t.prev = go_getPrevNextObject($tt0, t.prev), t.next = go_getPrevNextObject($tt0, t.next), t.pagination = go_getPaginationObject($tt0, t.pagination), t.swipe = go_getSwipeObject($tt0, t.swipe), t.mousewheel = go_getMousewheelObject($tt0, t.mousewheel), e && (opts_orig = $.extend(!0, {}, $.fn.carouFredSel.defaults, t)), (opts = $.extend(!0, {}, $.fn.carouFredSel.defaults, t)).d = cf_getDimensions(opts), crsl.direction = "up" == opts.direction || "left" == opts.direction ? "next" : "prev";
                var i = $cfs.children(),
                    o = ms_getParentSize($wrp, opts, "width");
                if (is_true(opts.cookie) && (opts.cookie = "caroufredsel_cookie_" + conf.serialNumber), opts.maxDimension = ms_getMaxDimension(opts, o), opts.items = in_complementItems(opts.items, opts, i, s), opts[opts.d.width] = in_complementPrimarySize(opts[opts.d.width], opts, i), opts[opts.d.height] = in_complementSecondarySize(opts[opts.d.height], opts, i), opts.responsive && (is_percentage(opts[opts.d.width]) || (opts[opts.d.width] = "100%")), is_percentage(opts[opts.d.width]) && (crsl.upDateOnWindowResize = !0, crsl.primarySizePercentage = opts[opts.d.width], opts[opts.d.width] = ms_getPercentage(o, crsl.primarySizePercentage), opts.items.visible || (opts.items.visibleConf.variable = !0)), opts.responsive ? (opts.usePadding = !1, opts.padding = [0, 0, 0, 0], opts.align = !1, opts.items.visibleConf.variable = !1) : (opts.items.visible || (opts = in_complementVisibleItems(opts, o)), opts[opts.d.width] || (!opts.items.visibleConf.variable && is_number(opts.items[opts.d.width]) && "*" == opts.items.filter ? (opts[opts.d.width] = opts.items.visible * opts.items[opts.d.width], opts.align = !1) : opts[opts.d.width] = "variable"), is_undefined(opts.align) && (opts.align = !!is_number(opts[opts.d.width]) && "center"), opts.items.visibleConf.variable && (opts.items.visible = gn_getVisibleItemsNext(i, opts, 0))), "*" == opts.items.filter || opts.items.visibleConf.variable || (opts.items.visibleConf.org = opts.items.visible, opts.items.visible = gn_getVisibleItemsNextFilter(i, opts, 0)), opts.items.visible = cf_getItemsAdjust(opts.items.visible, opts, opts.items.visibleConf.adjust, $tt0), opts.items.visibleConf.old = opts.items.visible, opts.responsive) opts.items.visibleConf.min || (opts.items.visibleConf.min = opts.items.visible), opts.items.visibleConf.max || (opts.items.visibleConf.max = opts.items.visible), opts = in_getResponsiveValues(opts, i, o);
                else switch (opts.padding = cf_getPadding(opts.padding), "top" == opts.align ? opts.align = "left" : "bottom" == opts.align && (opts.align = "right"), opts.align) {
                    case "center":
                    case "left":
                    case "right":
                        "variable" != opts[opts.d.width] && ((opts = in_getAlignPadding(opts, i)).usePadding = !0);
                        break;
                    default:
                        opts.align = !1, opts.usePadding = 0 != opts.padding[0] || 0 != opts.padding[1] || 0 != opts.padding[2] || 0 != opts.padding[3]
                }
                is_number(opts.scroll.duration) || (opts.scroll.duration = 500), is_undefined(opts.scroll.items) && (opts.scroll.items = opts.responsive || opts.items.visibleConf.variable || "*" != opts.items.filter ? "visible" : opts.items.visible), opts.auto = $.extend(!0, {}, opts.scroll, opts.auto), opts.prev = $.extend(!0, {}, opts.scroll, opts.prev), opts.next = $.extend(!0, {}, opts.scroll, opts.next), opts.pagination = $.extend(!0, {}, opts.scroll, opts.pagination), opts.auto = go_complementAutoObject($tt0, opts.auto), opts.prev = go_complementPrevNextObject($tt0, opts.prev), opts.next = go_complementPrevNextObject($tt0, opts.next), opts.pagination = go_complementPaginationObject($tt0, opts.pagination), opts.swipe = go_complementSwipeObject($tt0, opts.swipe), opts.mousewheel = go_complementMousewheelObject($tt0, opts.mousewheel), opts.synchronise && (opts.synchronise = cf_getSynchArr(opts.synchronise)), opts.auto.onPauseStart && (opts.auto.onTimeoutStart = opts.auto.onPauseStart, deprecated("auto.onPauseStart", "auto.onTimeoutStart")), opts.auto.onPausePause && (opts.auto.onTimeoutPause = opts.auto.onPausePause, deprecated("auto.onPausePause", "auto.onTimeoutPause")), opts.auto.onPauseEnd && (opts.auto.onTimeoutEnd = opts.auto.onPauseEnd, deprecated("auto.onPauseEnd", "auto.onTimeoutEnd")), opts.auto.pauseDuration && (opts.auto.timeoutDuration = opts.auto.pauseDuration, deprecated("auto.pauseDuration", "auto.timeoutDuration"))
            },
            _build: function() {
                $cfs.data("_cfs_isCarousel", !0);
                var t = $cfs.children(),
                    e = in_mapCss($cfs, ["textAlign", "float", "position", "top", "right", "bottom", "left", "zIndex", "width", "height", "marginTop", "marginRight", "marginBottom", "marginLeft"]),
                    s = "relative";
                switch (e.position) {
                    case "absolute":
                    case "fixed":
                        s = e.position
                }
                "parent" == conf.wrapper ? sz_storeOrigCss($wrp) : $wrp.css(e), $wrp.css({ overflow: "hidden", position: s }), sz_storeOrigCss($cfs), $cfs.data("_cfs_origCssZindex", e.zIndex), $cfs.css({ textAlign: "left", float: "none", position: "absolute", top: 0, right: "auto", bottom: "auto", left: 0, marginTop: 0, marginRight: 0, marginBottom: 0, marginLeft: 0 }), sz_storeMargin(t, opts), sz_storeOrigCss(t), opts.responsive && sz_setResponsiveSizes(opts, t)
            },
            _bind_events: function() {
                FN._unbind_events(), $cfs.on(cf_e("stop", conf), function(t, e) { return t.stopPropagation(), crsl.isStopped || opts.auto.button && opts.auto.button.addClass(cf_c("stopped", conf)), crsl.isStopped = !0, opts.auto.play && (opts.auto.play = !1, $cfs.trigger(cf_e("pause", conf), e)), !0 }), $cfs.on(cf_e("finish", conf), function(t) { return t.stopPropagation(), crsl.isScrolling && sc_stopScroll(scrl), !0 }), $cfs.on(cf_e("pause", conf), function(t, e, s) {
                    if (t.stopPropagation(), tmrs = sc_clearTimers(tmrs), e && crsl.isScrolling) {
                        scrl.isStopped = !0;
                        var i = getTime() - scrl.startTime;
                        scrl.duration -= i, scrl.pre && (scrl.pre.duration -= i), scrl.post && (scrl.post.duration -= i), sc_stopScroll(scrl, !1)
                    }
                    if (crsl.isPaused || crsl.isScrolling || s && (tmrs.timePassed += getTime() - tmrs.startTime), crsl.isPaused || opts.auto.button && opts.auto.button.addClass(cf_c("paused", conf)), crsl.isPaused = !0, opts.auto.onTimeoutPause) {
                        var o = opts.auto.timeoutDuration - tmrs.timePassed,
                            n = 100 - Math.ceil(100 * o / opts.auto.timeoutDuration);
                        opts.auto.onTimeoutPause.call($tt0, n, o)
                    }
                    return !0
                }), $cfs.on(cf_e("play", conf), function(t, e, s, i) {
                    t.stopPropagation(), tmrs = sc_clearTimers(tmrs);
                    var o = cf_sortParams([e, s, i], ["string", "number", "boolean"]);
                    if (e = o[0], s = o[1], i = o[2], "prev" != e && "next" != e && (e = crsl.direction), is_number(s) || (s = 0), is_boolean(i) || (i = !1), i && (crsl.isStopped = !1, opts.auto.play = !0), !opts.auto.play) return t.stopImmediatePropagation(), debug(conf, "Carousel stopped: Not scrolling.");
                    crsl.isPaused && opts.auto.button && (opts.auto.button.removeClass(cf_c("stopped", conf)), opts.auto.button.removeClass(cf_c("paused", conf))), crsl.isPaused = !1, tmrs.startTime = getTime();
                    var n = opts.auto.timeoutDuration + s;
                    return dur2 = n - tmrs.timePassed, perc = 100 - Math.ceil(100 * dur2 / n), opts.auto.progress && (tmrs.progress = setInterval(function() {
                        var t = getTime() - tmrs.startTime + tmrs.timePassed,
                            e = Math.ceil(100 * t / n);
                        opts.auto.progress.updater.call(opts.auto.progress.bar[0], e)
                    }, opts.auto.progress.interval)), tmrs.auto = setTimeout(function() { opts.auto.progress && opts.auto.progress.updater.call(opts.auto.progress.bar[0], 100), opts.auto.onTimeoutEnd && opts.auto.onTimeoutEnd.call($tt0, perc, dur2), crsl.isScrolling ? $cfs.trigger(cf_e("play", conf), e) : $cfs.trigger(cf_e(e, conf), opts.auto) }, dur2), opts.auto.onTimeoutStart && opts.auto.onTimeoutStart.call($tt0, perc, dur2), !0
                }), $cfs.on(cf_e("resume", conf), function(t) { return t.stopPropagation(), scrl.isStopped ? (scrl.isStopped = !1, crsl.isPaused = !1, crsl.isScrolling = !0, scrl.startTime = getTime(), sc_startScroll(scrl, conf)) : $cfs.trigger(cf_e("play", conf)), !0 }), $cfs.on(cf_e("prev", conf) + " " + cf_e("next", conf), function(t, e, s, i, o) {
                    if (t.stopPropagation(), crsl.isStopped || $cfs.is(":hidden")) return t.stopImmediatePropagation(), debug(conf, "Carousel stopped or hidden: Not scrolling.");
                    var n = is_number(opts.items.minimum) ? opts.items.minimum : opts.items.visible + 1;
                    if (n > itms.total) return t.stopImmediatePropagation(), debug(conf, "Not enough items (" + itms.total + " total, " + n + " needed): Not scrolling.");
                    e = (a = cf_sortParams([e, s, i, o], ["object", "number/string", "function", "boolean"]))[0], s = a[1], i = a[2], o = a[3];
                    var r = t.type.slice(conf.events.prefix.length);
                    if (is_object(e) || (e = {}), is_function(i) && (e.onAfter = i), is_boolean(o) && (e.queue = o), (e = $.extend(!0, {}, opts[r], e)).conditions && !e.conditions.call($tt0, r)) return t.stopImmediatePropagation(), debug(conf, 'Callback "conditions" returned false.');
                    if (!is_number(s)) {
                        if ("*" != opts.items.filter) s = "visible";
                        else
                            for (var c = [s, e.items, opts[r].items], a = 0, f = c.length; a < f; a++)
                                if (is_number(c[a]) || "page" == c[a] || "visible" == c[a]) { s = c[a]; break } switch (s) {
                            case "page":
                                return t.stopImmediatePropagation(), $cfs.triggerHandler(cf_e(r + "Page", conf), [e, i]);
                            case "visible":
                                opts.items.visibleConf.variable || "*" != opts.items.filter || (s = opts.items.visible)
                        }
                    }
                    if (scrl.isStopped) return $cfs.trigger(cf_e("resume", conf)), $cfs.trigger(cf_e("queue", conf), [r, [e, s, i]]), t.stopImmediatePropagation(), debug(conf, "Carousel resumed scrolling.");
                    if (e.duration > 0 && crsl.isScrolling) return e.queue && ("last" == e.queue && (queu = []), "first" == e.queue && 0 != queu.length || $cfs.trigger(cf_e("queue", conf), [r, [e, s, i]])), t.stopImmediatePropagation(), debug(conf, "Carousel currently scrolling.");
                    if (tmrs.timePassed = 0, $cfs.trigger(cf_e("slide_" + r, conf), [e, s]), opts.synchronise) {
                        var l = opts.synchronise,
                            p = [e, s],
                            u = 0;
                        for (f = l.length; u < f; u++) {
                            var g = r;
                            l[u][2] || (g = "prev" == g ? "next" : "prev"), l[u][1] || (p[0] = l[u][0].triggerHandler("_cfs_triggerEvent", ["configuration", g])), p[1] = s + l[u][3], l[u][0].trigger("_cfs_triggerEvent", ["slide_" + g, p])
                        }
                    }
                    return !0
                }), $cfs.on(cf_e("slide_prev", conf), function(t, e, s) {
                    t.stopPropagation();
                    var i = $cfs.children();
                    if (!opts.circular && 0 == itms.first) return opts.infinite && $cfs.trigger(cf_e("next", conf), itms.total - 1), t.stopImmediatePropagation();
                    if (sz_resetMargin(i, opts), !is_number(s)) {
                        if (opts.items.visibleConf.variable) s = gn_getVisibleItemsPrev(i, opts, itms.total - 1);
                        else if ("*" != opts.items.filter) {
                            var o = is_number(e.items) ? e.items : gn_getVisibleOrg($cfs, opts);
                            s = gn_getScrollItemsPrevFilter(i, opts, itms.total - 1, o)
                        } else s = opts.items.visible;
                        s = cf_getAdjust(s, opts, e.items, $tt0)
                    }
                    if (opts.circular || itms.total - s < itms.first && (s = itms.total - itms.first), opts.items.visibleConf.old = opts.items.visible, opts.items.visibleConf.variable) {
                        var n = cf_getItemsAdjust(gn_getVisibleItemsNext(i, opts, itms.total - s), opts, opts.items.visibleConf.adjust, $tt0);
                        opts.items.visible + s <= n && s < itms.total && (s++, n = cf_getItemsAdjust(gn_getVisibleItemsNext(i, opts, itms.total - s), opts, opts.items.visibleConf.adjust, $tt0)), opts.items.visible = n
                    } else if ("*" != opts.items.filter) {
                        n = gn_getVisibleItemsNextFilter(i, opts, itms.total - s);
                        opts.items.visible = cf_getItemsAdjust(n, opts, opts.items.visibleConf.adjust, $tt0)
                    }
                    if (sz_resetMargin(i, opts, !0), 0 == s) return t.stopImmediatePropagation(), debug(conf, "0 items to scroll: Not scrolling.");
                    for (debug(conf, "Scrolling " + s + " items backward."), itms.first += s; itms.first >= itms.total;) itms.first -= itms.total;
                    opts.circular || (0 == itms.first && e.onEnd && e.onEnd.call($tt0, "prev"), opts.infinite || nv_enableNavi(opts, itms.first, conf)), $cfs.children().slice(itms.total - s, itms.total).prependTo($cfs), itms.total < opts.items.visible + s && $cfs.children().slice(0, opts.items.visible + s - itms.total).clone(!0).appendTo($cfs);
                    var r = gi_getOldItemsPrev(i = $cfs.children(), opts, s),
                        c = gi_getNewItemsPrev(i, opts),
                        a = i.eq(s - 1),
                        f = r.last(),
                        l = c.last();
                    sz_resetMargin(i, opts);
                    var p = 0,
                        u = 0;
                    if (opts.align) {
                        var g = cf_getAlignPadding(c, opts);
                        p = g[0], u = g[1]
                    }
                    var d = p < 0 ? opts.padding[opts.d[3]] : 0,
                        m = !1,
                        _ = $();
                    if (opts.items.visible < s && (_ = i.slice(opts.items.visibleConf.old, s), "directscroll" == e.fx)) {
                        var v = opts.items[opts.d.width];
                        a = l, sc_hideHiddenItems(m = _), opts.items[opts.d.width] = "variable"
                    }
                    var b = !1,
                        h = ms_getTotalSize(i.slice(0, s), opts, "width"),
                        w = cf_mapWrapperSizes(ms_getSizes(c, opts, !0), opts, !opts.usePadding),
                        P = 0,
                        x = {},
                        C = {},
                        S = {},
                        y = {},
                        I = {},
                        z = {},
                        j = {},
                        k = sc_getDuration(e, opts, s, h);
                    switch (e.fx) {
                        case "cover":
                        case "cover-fade":
                            P = ms_getTotalSize(i.slice(0, opts.items.visible), opts, "width")
                    }
                    m && (opts.items[opts.d.width] = v), sz_resetMargin(i, opts, !0), u >= 0 && sz_resetMargin(f, opts, opts.padding[opts.d[1]]), p >= 0 && sz_resetMargin(a, opts, opts.padding[opts.d[3]]), opts.align && (opts.padding[opts.d[1]] = u, opts.padding[opts.d[3]] = p), z[opts.d.left] = -(h - d), j[opts.d.left] = -(P - d), C[opts.d.left] = w[opts.d.width];
                    var N, O, T, M = function() {},
                        A = function() {},
                        F = function() {},
                        H = function() {},
                        q = function() {},
                        D = function() {},
                        V = function() {},
                        R = function() {};
                    switch (e.fx) {
                        case "crossfade":
                        case "cover":
                        case "cover-fade":
                        case "uncover":
                        case "uncover-fade":
                            b = $cfs.clone(!0).appendTo($wrp)
                    }
                    switch (e.fx) {
                        case "crossfade":
                        case "uncover":
                        case "uncover-fade":
                            b.children().slice(0, s).remove(), b.children().slice(opts.items.visibleConf.old).remove();
                            break;
                        case "cover":
                        case "cover-fade":
                            b.children().slice(opts.items.visible).remove(), b.css(j)
                    }
                    if ($cfs.css(z), scrl = sc_setScroll(k, e.easing, conf), x[opts.d.left] = opts.usePadding ? opts.padding[opts.d[3]] : 0, opts.centerVertically && (x["line-height"] = w.height + "px"), "variable" != opts[opts.d.width] && "variable" != opts[opts.d.height] || (M = function() { $wrp.css(w) }, A = function() { scrl.anims.push([$wrp, w]) }), opts.usePadding) {
                        switch (l.not(a).length && (S[opts.d.marginRight] = a.data("_cfs_origCssMargin"), p < 0 ? a.css(S) : (V = function() { a.css(S) }, R = function() { scrl.anims.push([a, S]) })), e.fx) {
                            case "cover":
                            case "cover-fade":
                                b.children().eq(s - 1).css(S)
                        }
                        l.not(f).length && (y[opts.d.marginRight] = f.data("_cfs_origCssMargin"), F = function() { f.css(y) }, H = function() { scrl.anims.push([f, y]) }), u >= 0 && (I[opts.d.marginRight] = l.data("_cfs_origCssMargin") + opts.padding[opts.d[1]], q = function() { l.css(I) }, D = function() { scrl.anims.push([l, I]) })
                    }
                    T = function() { $cfs.css(x) };
                    var E = opts.items.visible + s - itms.total;
                    O = function() {
                        if (E > 0 && ($cfs.children().slice(itms.total).remove(), r = $($cfs.children().slice(itms.total - (opts.items.visible - E)).get().concat($cfs.children().slice(0, E).get()))), sc_showHiddenItems(m), opts.usePadding) {
                            var t = $cfs.children().eq(opts.items.visible + s - 1);
                            t.css(opts.d.marginRight, t.data("_cfs_origCssMargin"))
                        }
                    };
                    var W = sc_mapCallbackArguments(r, _, c, s, "prev", k, w);
                    switch (N = function() { sc_afterScroll($cfs, b, e), crsl.isScrolling = !1, clbk.onAfter = sc_fireCallbacks($tt0, e, "onAfter", W, clbk), queu = sc_fireQueue($cfs, queu, conf), crsl.isPaused || $cfs.trigger(cf_e("play", conf)) }, crsl.isScrolling = !0, tmrs = sc_clearTimers(tmrs), clbk.onBefore = sc_fireCallbacks($tt0, e, "onBefore", W, clbk), e.fx) {
                        case "none":
                            $cfs.css(x), M(), F(), q(), V(), T(), O(), N();
                            break;
                        case "fade":
                            scrl.anims.push([$cfs, { opacity: 0 }, function() { M(), F(), q(), V(), T(), O(), (scrl = sc_setScroll(k, e.easing, conf)).anims.push([$cfs, { opacity: 1 }, N]), sc_startScroll(scrl, conf) }]);
                            break;
                        case "crossfade":
                            $cfs.css({ opacity: 0 }), scrl.anims.push([b, { opacity: 0 }]), scrl.anims.push([$cfs, { opacity: 1 }, N]), A(), F(), q(), V(), T(), O();
                            break;
                        case "cover":
                            scrl.anims.push([b, x, function() { F(), q(), V(), T(), O(), N() }]), A();
                            break;
                        case "cover-fade":
                            scrl.anims.push([$cfs, { opacity: 0 }]), scrl.anims.push([b, x, function() { F(), q(), V(), T(), O(), N() }]), A();
                            break;
                        case "uncover":
                            scrl.anims.push([b, C, N]), A(), F(), q(), V(), T(), O();
                            break;
                        case "uncover-fade":
                            $cfs.css({ opacity: 0 }), scrl.anims.push([$cfs, { opacity: 1 }]), scrl.anims.push([b, C, N]), A(), F(), q(), V(), T(), O();
                            break;
                        default:
                            scrl.anims.push([$cfs, x, function() { O(), N() }]), A(), H(), D(), R()
                    }
                    return sc_startScroll(scrl, conf), cf_setCookie(opts.cookie, $cfs, conf), $cfs.trigger(cf_e("updatePageStatus", conf), [!1, w]), !0
                }), $cfs.on(cf_e("slide_next", conf), function(t, e, s) {
                    t.stopPropagation();
                    var i = $cfs.children();
                    if (!opts.circular && itms.first == opts.items.visible) return opts.infinite && $cfs.trigger(cf_e("prev", conf), itms.total - 1), t.stopImmediatePropagation();
                    if (sz_resetMargin(i, opts), !is_number(s)) {
                        if ("*" != opts.items.filter) {
                            var o = is_number(e.items) ? e.items : gn_getVisibleOrg($cfs, opts);
                            s = gn_getScrollItemsNextFilter(i, opts, 0, o)
                        } else s = opts.items.visible;
                        s = cf_getAdjust(s, opts, e.items, $tt0)
                    }
                    var n = 0 == itms.first ? itms.total : itms.first;
                    if (!opts.circular) {
                        if (opts.items.visibleConf.variable) {
                            var r = gn_getVisibleItemsNext(i, opts, s);
                            o = gn_getVisibleItemsPrev(i, opts, n - 1)
                        } else r = opts.items.visible, o = opts.items.visible;
                        s + r > n && (s = n - o)
                    }
                    if (opts.items.visibleConf.old = opts.items.visible, opts.items.visibleConf.variable) {
                        for (r = cf_getItemsAdjust(gn_getVisibleItemsNextTestCircular(i, opts, s, n), opts, opts.items.visibleConf.adjust, $tt0); opts.items.visible - s >= r && s < itms.total;) r = cf_getItemsAdjust(gn_getVisibleItemsNextTestCircular(i, opts, ++s, n), opts, opts.items.visibleConf.adjust, $tt0);
                        opts.items.visible = r
                    } else if ("*" != opts.items.filter) {
                        r = gn_getVisibleItemsNextFilter(i, opts, s);
                        opts.items.visible = cf_getItemsAdjust(r, opts, opts.items.visibleConf.adjust, $tt0)
                    }
                    if (sz_resetMargin(i, opts, !0), 0 == s) return t.stopImmediatePropagation(), debug(conf, "0 items to scroll: Not scrolling.");
                    for (debug(conf, "Scrolling " + s + " items forward."), itms.first -= s; itms.first < 0;) itms.first += itms.total;
                    opts.circular || (itms.first == opts.items.visible && e.onEnd && e.onEnd.call($tt0, "next"), opts.infinite || nv_enableNavi(opts, itms.first, conf)), itms.total < opts.items.visible + s && $cfs.children().slice(0, opts.items.visible + s - itms.total).clone(!0).appendTo($cfs);
                    var c = gi_getOldItemsNext(i = $cfs.children(), opts),
                        a = gi_getNewItemsNext(i, opts, s),
                        f = i.eq(s - 1),
                        l = c.last(),
                        p = a.last();
                    sz_resetMargin(i, opts);
                    var u = 0,
                        g = 0;
                    if (opts.align) {
                        var d = cf_getAlignPadding(a, opts);
                        u = d[0], g = d[1]
                    }
                    var m = !1,
                        _ = $();
                    if (opts.items.visibleConf.old < s && (_ = i.slice(opts.items.visibleConf.old, s), "directscroll" == e.fx)) {
                        var v = opts.items[opts.d.width];
                        f = l, sc_hideHiddenItems(m = _), opts.items[opts.d.width] = "variable"
                    }
                    var b = !1,
                        h = ms_getTotalSize(i.slice(0, s), opts, "width"),
                        w = cf_mapWrapperSizes(ms_getSizes(a, opts, !0), opts, !opts.usePadding),
                        P = 0,
                        x = {},
                        C = {},
                        S = {},
                        y = {},
                        I = {},
                        z = sc_getDuration(e, opts, s, h);
                    switch (e.fx) {
                        case "uncover":
                        case "uncover-fade":
                            P = ms_getTotalSize(i.slice(0, opts.items.visibleConf.old), opts, "width")
                    }
                    m && (opts.items[opts.d.width] = v), opts.align && opts.padding[opts.d[1]] < 0 && (opts.padding[opts.d[1]] = 0), sz_resetMargin(i, opts, !0), sz_resetMargin(l, opts, opts.padding[opts.d[1]]), opts.align && (opts.padding[opts.d[1]] = g, opts.padding[opts.d[3]] = u), I[opts.d.left] = opts.usePadding ? opts.padding[opts.d[3]] : 0;
                    var j, k, N, O = function() {},
                        T = function() {},
                        M = function() {},
                        A = function() {},
                        F = function() {},
                        H = function() {};
                    switch (e.fx) {
                        case "crossfade":
                        case "cover":
                        case "cover-fade":
                        case "uncover":
                        case "uncover-fade":
                            (b = $cfs.clone(!0).appendTo($wrp)).children().slice(opts.items.visibleConf.old).remove()
                    }
                    switch (e.fx) {
                        case "crossfade":
                        case "cover":
                        case "cover-fade":
                            $cfs.css("zIndex", 1), b.css("zIndex", 0)
                    }
                    if (scrl = sc_setScroll(z, e.easing, conf), x[opts.d.left] = -h, opts.centerVertically && (x["line-height"] = w.height + "px"), C[opts.d.left] = -P, u < 0 && (x[opts.d.left] += u), "variable" != opts[opts.d.width] && "variable" != opts[opts.d.height] || (O = function() { $wrp.css(w) }, T = function() { scrl.anims.push([$wrp, w]) }), opts.usePadding) {
                        var q = p.data("_cfs_origCssMargin");
                        g >= 0 && (q += opts.padding[opts.d[1]]), p.css(opts.d.marginRight, q), f.not(l).length && (y[opts.d.marginRight] = l.data("_cfs_origCssMargin")), M = function() { l.css(y) }, A = function() { scrl.anims.push([l, y]) };
                        var D = f.data("_cfs_origCssMargin");
                        u > 0 && (D += opts.padding[opts.d[3]]), S[opts.d.marginRight] = D, F = function() { f.css(S) }, H = function() { scrl.anims.push([f, S]) }
                    }
                    N = function() { $cfs.css(I) };
                    var V = opts.items.visible + s - itms.total;
                    k = function() {
                        V > 0 && $cfs.children().slice(itms.total).remove();
                        var t = $cfs.children().slice(0, s).appendTo($cfs).last();
                        if (V > 0 && (a = gi_getCurrentItems(i, opts)), sc_showHiddenItems(m), opts.usePadding) {
                            if (itms.total < opts.items.visible + s) {
                                var e = $cfs.children().eq(opts.items.visible - 1);
                                e.css(opts.d.marginRight, e.data("_cfs_origCssMargin") + opts.padding[opts.d[1]])
                            }
                            t.css(opts.d.marginRight, t.data("_cfs_origCssMargin"))
                        }
                    };
                    var R = sc_mapCallbackArguments(c, _, a, s, "next", z, w);
                    switch (j = function() { $cfs.css("zIndex", $cfs.data("_cfs_origCssZindex")), sc_afterScroll($cfs, b, e), crsl.isScrolling = !1, clbk.onAfter = sc_fireCallbacks($tt0, e, "onAfter", R, clbk), queu = sc_fireQueue($cfs, queu, conf), crsl.isPaused || $cfs.trigger(cf_e("play", conf)) }, crsl.isScrolling = !0, tmrs = sc_clearTimers(tmrs), clbk.onBefore = sc_fireCallbacks($tt0, e, "onBefore", R, clbk), e.fx) {
                        case "none":
                            $cfs.css(x), O(), M(), F(), N(), k(), j();
                            break;
                        case "fade":
                            scrl.anims.push([$cfs, { opacity: 0 }, function() { O(), M(), F(), N(), k(), (scrl = sc_setScroll(z, e.easing, conf)).anims.push([$cfs, { opacity: 1 }, j]), sc_startScroll(scrl, conf) }]);
                            break;
                        case "crossfade":
                            $cfs.css({ opacity: 0 }), scrl.anims.push([b, { opacity: 0 }]), scrl.anims.push([$cfs, { opacity: 1 }, j]), T(), M(), F(), N(), k();
                            break;
                        case "cover":
                            $cfs.css(opts.d.left, $wrp[opts.d.width]()), scrl.anims.push([$cfs, I, j]), T(), M(), F(), k();
                            break;
                        case "cover-fade":
                            $cfs.css(opts.d.left, $wrp[opts.d.width]()), scrl.anims.push([b, { opacity: 0 }]), scrl.anims.push([$cfs, I, j]), T(), M(), F(), k();
                            break;
                        case "uncover":
                            scrl.anims.push([b, C, j]), T(), M(), F(), N(), k();
                            break;
                        case "uncover-fade":
                            $cfs.css({ opacity: 0 }), scrl.anims.push([$cfs, { opacity: 1 }]), scrl.anims.push([b, C, j]), T(), M(), F(), N(), k();
                            break;
                        default:
                            scrl.anims.push([$cfs, x, function() { N(), k(), j() }]), T(), A(), H()
                    }
                    return sc_startScroll(scrl, conf), cf_setCookie(opts.cookie, $cfs, conf), $cfs.trigger(cf_e("updatePageStatus", conf), [!1, w]), !0
                }), $cfs.on(cf_e("slideTo", conf), function(t, e, s, i, o, n, r) { t.stopPropagation(); var c = cf_sortParams([e, s, i, o, n, r], ["string/number/object", "number", "boolean", "object", "string", "function"]); return o = c[3], n = c[4], r = c[5], 0 != (e = gn_getItemIndex(c[0], c[1], c[2], itms, $cfs)) && (is_object(o) || (o = !1), "prev" != n && "next" != n && (n = opts.circular ? e <= itms.total / 2 ? "next" : "prev" : 0 == itms.first || itms.first > e ? "next" : "prev"), "prev" == n && (e = itms.total - e), $cfs.trigger(cf_e(n, conf), [o, e, r]), !0) }), $cfs.on(cf_e("prevPage", conf), function(t, e, s) { t.stopPropagation(); var i = $cfs.triggerHandler(cf_e("currentPage", conf)); return $cfs.triggerHandler(cf_e("slideToPage", conf), [i - 1, e, "prev", s]) }), $cfs.on(cf_e("nextPage", conf), function(t, e, s) { t.stopPropagation(); var i = $cfs.triggerHandler(cf_e("currentPage", conf)); return $cfs.triggerHandler(cf_e("slideToPage", conf), [i + 1, e, "next", s]) }), $cfs.on(cf_e("slideToPage", conf), function(t, e, s, i, o) {
                    t.stopPropagation(), is_number(e) || (e = $cfs.triggerHandler(cf_e("currentPage", conf)));
                    var n = opts.pagination.items || opts.items.visible,
                        r = Math.ceil(itms.total / n) - 1;
                    return e < 0 && (e = r), e > r && (e = 0), $cfs.triggerHandler(cf_e("slideTo", conf), [e * n, 0, !0, s, i, o])
                }), $cfs.on(cf_e("jumpToStart", conf), function(t, e) {
                    if (t.stopPropagation(), e = e ? gn_getItemIndex(e, 0, !0, itms, $cfs) : 0, 0 != (e += itms.first)) {
                        if (itms.total > 0)
                            for (; e > itms.total;) e -= itms.total;
                        $cfs.prepend($cfs.children().slice(e, itms.total))
                    }
                    return !0
                }), $cfs.on(cf_e("synchronise", conf), function(t, e) {
                    if (t.stopPropagation(), e) e = cf_getSynchArr(e);
                    else {
                        if (!opts.synchronise) return debug(conf, "No carousel to synchronise.");
                        e = opts.synchronise
                    }
                    for (var s = $cfs.triggerHandler(cf_e("currentPosition", conf)), i = !0, o = 0, n = e.length; o < n; o++) e[o][0].triggerHandler(cf_e("slideTo", conf), [s, e[o][3], !0]) || (i = !1);
                    return i
                }), $cfs.on(cf_e("queue", conf), function(t, e, s) { return t.stopPropagation(), is_function(e) ? e.call($tt0, queu) : is_array(e) ? queu = e : is_undefined(e) || queu.push([e, s]), queu }), $cfs.on(cf_e("insertItem", conf), function(t, e, s, i, o) {
                    t.stopPropagation();
                    var n = cf_sortParams([e, s, i, o], ["string/object", "string/number/object", "boolean", "number"]);
                    if (e = n[0], s = n[1], i = n[2], o = n[3], is_object(e) && !is_jquery(e) ? e = $(e) : is_string(e) && (e = $(e)), !is_jquery(e) || 0 == e.length) return debug(conf, "Not a valid object.");
                    is_undefined(s) && (s = "end"), sz_storeMargin(e, opts), sz_storeOrigCss(e);
                    var r = s,
                        c = "before";
                    "end" == s ? i ? (0 == itms.first ? (s = itms.total - 1, c = "after") : (s = itms.first, itms.first += e.length), s < 0 && (s = 0)) : (s = itms.total - 1, c = "after") : s = gn_getItemIndex(s, o, i, itms, $cfs);
                    var a = $cfs.children().eq(s);
                    return a.length ? a[c](e) : (debug(conf, "Correct insert-position not found! Appending item to the end."), $cfs.append(e)), "end" == r || i || s < itms.first && (itms.first += e.length), itms.total = $cfs.children().length, itms.first >= itms.total && (itms.first -= itms.total), $cfs.trigger(cf_e("updateSizes", conf)), $cfs.trigger(cf_e("linkAnchors", conf)), !0
                }), $cfs.on(cf_e("removeItem", conf), function(t, e, s, i) {
                    t.stopPropagation();
                    var o = cf_sortParams([e, s, i], ["string/number/object", "boolean", "number"]);
                    e = o[0], s = o[1], i = o[2];
                    if (e instanceof $ && e.length > 1) return n = $(), e.each(function(t, e) {
                        var o = $cfs.trigger(cf_e("removeItem", conf), [$(this), s, i]);
                        o && (n = n.add(o))
                    }), n;
                    if (is_undefined(e) || "end" == e) n = $cfs.children().last();
                    else {
                        e = gn_getItemIndex(e, i, s, itms, $cfs);
                        var n = $cfs.children().eq(e);
                        n.length && e < itms.first && (itms.first -= n.length)
                    }
                    return n && n.length && (n.detach(), itms.total = $cfs.children().length, $cfs.trigger(cf_e("updateSizes", conf))), n
                }), $cfs.on(cf_e("onBefore", conf) + " " + cf_e("onAfter", conf), function(t, e) { t.stopPropagation(); var s = t.type.slice(conf.events.prefix.length); return is_array(e) && (clbk[s] = e), is_function(e) && clbk[s].push(e), clbk[s] }), $cfs.on(cf_e("currentPosition", conf), function(t, e) {
                    if (t.stopPropagation(), 0 == itms.first) var s = 0;
                    else s = itms.total - itms.first;
                    return is_function(e) && e.call($tt0, s), s
                }), $cfs.on(cf_e("currentPage", conf), function(t, e) {
                    t.stopPropagation();
                    var s, i = opts.pagination.items || opts.items.visible,
                        o = Math.ceil(itms.total / i - 1);
                    return (s = 0 == itms.first ? 0 : itms.first < itms.total % i ? 0 : itms.first != i || opts.circular ? Math.round((itms.total - itms.first) / i) : o) < 0 && (s = 0), s > o && (s = o), is_function(e) && e.call($tt0, s), s
                }), $cfs.on(cf_e("currentVisible", conf), function(t, e) { t.stopPropagation(); var s = gi_getCurrentItems($cfs.children(), opts); return is_function(e) && e.call($tt0, s), s }), $cfs.on(cf_e("slice", conf), function(t, e, s, i) { if (t.stopPropagation(), 0 == itms.total) return !1; var o = cf_sortParams([e, s, i], ["number", "number", "function"]); if (e = is_number(o[0]) ? o[0] : 0, s = is_number(o[1]) ? o[1] : itms.total, i = o[2], e += itms.first, s += itms.first, items.total > 0) { for (; e > itms.total;) e -= itms.total; for (; s > itms.total;) s -= itms.total; for (; e < 0;) e += itms.total; for (; s < 0;) s += itms.total } var n, r = $cfs.children(); return n = s > e ? r.slice(e, s) : $(r.slice(e, itms.total).get().concat(r.slice(0, s).get())), is_function(i) && i.call($tt0, n), n }), $cfs.on(cf_e("isPaused", conf) + " " + cf_e("isStopped", conf) + " " + cf_e("isScrolling", conf), function(t, e) {
                    t.stopPropagation();
                    var s = t.type.slice(conf.events.prefix.length),
                        i = crsl[s];
                    return is_function(e) && e.call($tt0, i), i
                }), $cfs.on(cf_e("configuration", conf), function(e, a, b, c) {
                    e.stopPropagation();
                    var reInit = !1;
                    if (is_function(a)) a.call($tt0, opts);
                    else if (is_object(a)) opts_orig = $.extend(!0, {}, opts_orig, a), !1 !== b ? reInit = !0 : opts = $.extend(!0, {}, opts, a);
                    else if (!is_undefined(a))
                        if (is_function(b)) {
                            var val = eval("opts." + a);
                            is_undefined(val) && (val = ""), b.call($tt0, val)
                        } else { if (is_undefined(b)) return eval("opts." + a); "boolean" != typeof c && (c = !0), eval("opts_orig." + a + " = b"), !1 !== c ? reInit = !0 : eval("opts." + a + " = b") }
                    if (reInit) {
                        sz_resetMargin($cfs.children(), opts), FN._init(opts_orig), FN._bind_buttons();
                        var sz = sz_setSizes($cfs, opts);
                        $cfs.trigger(cf_e("updatePageStatus", conf), [!0, sz])
                    }
                    return opts
                }), $cfs.on(cf_e("linkAnchors", conf), function(t, e, s) {
                    return t.stopPropagation(), is_undefined(e) ? e = $("body") : is_string(e) && (e = $(e)), is_jquery(e) && 0 != e.length ? (is_string(s) || (s = "a.caroufredsel"), e.find(s).each(function() {
                        var t = this.hash || "";
                        t.length > 0 && -1 != $cfs.children().index($(t)) && $(this).off("click").click(function(e) { e.preventDefault(), $cfs.trigger(cf_e("slideTo", conf), t) })
                    }), !0) : debug(conf, "Not a valid object.")
                }), $cfs.on(cf_e("updatePageStatus", conf), function(t, e, s) {
                    if (t.stopPropagation(), opts.pagination.container) {
                        var i = opts.pagination.items || opts.items.visible,
                            o = Math.ceil(itms.total / i);
                        e && (opts.pagination.anchorBuilder && (opts.pagination.container.children().remove(), opts.pagination.container.each(function() {
                            for (var t = 0; t < o; t++) {
                                var e = $cfs.children().eq(gn_getItemIndex(t * i, 0, !0, itms, $cfs));
                                $(this).append(opts.pagination.anchorBuilder.call(e[0], t + 1))
                            }
                        })), opts.pagination.container.each(function() { $(this).children().off(opts.pagination.event).each(function(t) { $(this).on(opts.pagination.event, function(e) { e.preventDefault(), $cfs.trigger(cf_e("slideTo", conf), [t * i, -opts.pagination.deviation, !0, opts.pagination]) }) }) }));
                        var n = $cfs.triggerHandler(cf_e("currentPage", conf)) + opts.pagination.deviation;
                        return n >= o && (n = 0), n < 0 && (n = o - 1), opts.pagination.container.each(function() { $(this).children().removeClass(cf_c("selected", conf)).eq(n).addClass(cf_c("selected", conf)) }), !0
                    }
                }), $cfs.on(cf_e("updateSizes", conf), function(t) {
                    var e = opts.items.visible,
                        s = $cfs.children(),
                        i = ms_getParentSize($wrp, opts, "width");
                    if (itms.total = s.length, crsl.primarySizePercentage ? (opts.maxDimension = i, opts[opts.d.width] = ms_getPercentage(i, crsl.primarySizePercentage)) : opts.maxDimension = ms_getMaxDimension(opts, i), opts.responsive ? (opts.items.width = opts.items.sizesConf.width, opts.items.height = opts.items.sizesConf.height, e = (opts = in_getResponsiveValues(opts, s, i)).items.visible, sz_setResponsiveSizes(opts, s)) : opts.items.visibleConf.variable ? e = gn_getVisibleItemsNext(s, opts, 0) : "*" != opts.items.filter && (e = gn_getVisibleItemsNextFilter(s, opts, 0)), !opts.circular && 0 != itms.first && e > itms.first) {
                        if (opts.items.visibleConf.variable) var o = gn_getVisibleItemsPrev(s, opts, itms.first) - itms.first;
                        else if ("*" != opts.items.filter) o = gn_getVisibleItemsPrevFilter(s, opts, itms.first) - itms.first;
                        else o = opts.items.visible - itms.first;
                        debug(conf, "Preventing non-circular: sliding " + o + " items backward."), $cfs.trigger(cf_e("prev", conf), o)
                    }
                    opts.items.visible = cf_getItemsAdjust(e, opts, opts.items.visibleConf.adjust, $tt0), opts.items.visibleConf.old = opts.items.visible, opts = in_getAlignPadding(opts, s);
                    var n = sz_setSizes($cfs, opts);
                    return $cfs.trigger(cf_e("updatePageStatus", conf), [!0, n]), nv_showNavi(opts, itms.total, conf), nv_enableNavi(opts, itms.first, conf), n
                }), $cfs.on(cf_e("destroy", conf), function(t, e) { return t.stopPropagation(), tmrs = sc_clearTimers(tmrs), $cfs.data("_cfs_isCarousel", !1), $cfs.trigger(cf_e("finish", conf)), e && $cfs.trigger(cf_e("jumpToStart", conf)), sz_restoreOrigCss($cfs.children()), sz_restoreOrigCss($cfs), FN._unbind_events(), FN._unbind_buttons(), "parent" == conf.wrapper ? sz_restoreOrigCss($wrp) : $wrp.replaceWith($cfs), !0 }), $cfs.on(cf_e("debug", conf), function(t) { return debug(conf, "Carousel width: " + opts.width), debug(conf, "Carousel height: " + opts.height), debug(conf, "Item widths: " + opts.items.width), debug(conf, "Item heights: " + opts.items.height), debug(conf, "Number of items visible: " + opts.items.visible), opts.auto.play && debug(conf, "Number of items scrolled automatically: " + opts.auto.items), opts.prev.button && debug(conf, "Number of items scrolled backward: " + opts.prev.items), opts.next.button && debug(conf, "Number of items scrolled forward: " + opts.next.items), conf.debug }), $cfs.on("_cfs_triggerEvent", function(t, e, s) { return t.stopPropagation(), $cfs.triggerHandler(cf_e(e, conf), s) })
            },
            _unbind_events: function() { $cfs.off(cf_e("", conf)), $cfs.off(cf_e("", conf, !1)), $cfs.off("_cfs_triggerEvent") },
            _bind_buttons: function() {
                if (FN._unbind_buttons(), nv_showNavi(opts, itms.total, conf), nv_enableNavi(opts, itms.first, conf), opts.auto.pauseOnHover) {
                    var t = bt_pauseOnHoverConfig(opts.auto.pauseOnHover);
                    $wrp.on(cf_e("mouseenter", conf, !1), function() { $cfs.trigger(cf_e("pause", conf), t) }).on(cf_e("mouseleave", conf, !1), function() { $cfs.trigger(cf_e("resume", conf)) })
                }
                if (opts.auto.button && opts.auto.button.on(cf_e(opts.auto.event, conf, !1), function(t) {
                        t.preventDefault();
                        var e = !1,
                            s = null;
                        crsl.isPaused ? e = "play" : opts.auto.pauseOnEvent && (e = "pause", s = bt_pauseOnHoverConfig(opts.auto.pauseOnEvent)), e && $cfs.trigger(cf_e(e, conf), s)
                    }), opts.prev.button && (opts.prev.button.on(cf_e(opts.prev.event, conf, !1), function(t) { t.preventDefault(), $cfs.trigger(cf_e("prev", conf)) }), opts.prev.pauseOnHover)) {
                    t = bt_pauseOnHoverConfig(opts.prev.pauseOnHover);
                    opts.prev.button.on(cf_e("mouseenter", conf, !1), function() { $cfs.trigger(cf_e("pause", conf), t) }).on(cf_e("mouseleave", conf, !1), function() { $cfs.trigger(cf_e("resume", conf)) })
                }
                if (opts.next.button && (opts.next.button.on(cf_e(opts.next.event, conf, !1), function(t) { t.preventDefault(), $cfs.trigger(cf_e("next", conf)) }), opts.next.pauseOnHover)) {
                    t = bt_pauseOnHoverConfig(opts.next.pauseOnHover);
                    opts.next.button.on(cf_e("mouseenter", conf, !1), function() { $cfs.trigger(cf_e("pause", conf), t) }).on(cf_e("mouseleave", conf, !1), function() { $cfs.trigger(cf_e("resume", conf)) })
                }
                if (opts.pagination.container && opts.pagination.pauseOnHover) {
                    t = bt_pauseOnHoverConfig(opts.pagination.pauseOnHover);
                    opts.pagination.container.on(cf_e("mouseenter", conf, !1), function() { $cfs.trigger(cf_e("pause", conf), t) }).on(cf_e("mouseleave", conf, !1), function() { $cfs.trigger(cf_e("resume", conf)) })
                }
                if ((opts.prev.key || opts.next.key) && $(document).on(cf_e("keyup", conf, !1, !0, !0), function(t) {
                        var e = t.keyCode;
                        e == opts.next.key && (t.preventDefault(), $cfs.trigger(cf_e("next", conf))), e == opts.prev.key && (t.preventDefault(), $cfs.trigger(cf_e("prev", conf)))
                    }), opts.pagination.keys && $(document).on(cf_e("keyup", conf, !1, !0, !0), function(t) {
                        var e = t.keyCode;
                        e >= 49 && e < 58 && (e = (e - 49) * opts.items.visible) <= itms.total && (t.preventDefault(), $cfs.trigger(cf_e("slideTo", conf), [e, 0, !0, opts.pagination]))
                    }), $.fn.swipe) {
                    var e = "ontouchstart" in window;
                    if (e && opts.swipe.onTouch || !e && opts.swipe.onMouse) {
                        var s = $.extend(!0, {}, opts.prev, opts.swipe),
                            i = $.extend(!0, {}, opts.next, opts.swipe),
                            o = function() { $cfs.trigger(cf_e("prev", conf), [s]) },
                            n = function() { $cfs.trigger(cf_e("next", conf), [i]) };
                        switch (opts.direction) {
                            case "up":
                            case "down":
                                opts.swipe.options.swipeUp = n, opts.swipe.options.swipeDown = o;
                                break;
                            default:
                                opts.swipe.options.swipeLeft = n, opts.swipe.options.swipeRight = o
                        }
                        crsl.swipe && $cfs.swipe("destroy"), $wrp.swipe(opts.swipe.options), crsl.swipe = !0
                    }
                }
                if ($.fn.mousewheel && opts.mousewheel) {
                    var r = $.extend(!0, {}, opts.prev, opts.mousewheel),
                        c = $.extend(!0, {}, opts.next, opts.mousewheel);
                    crsl.mousewheel && $wrp.off(cf_e("mousewheel", conf, !1)), $wrp.on(cf_e("mousewheel", conf, !1), function(t, e) { t.preventDefault(), e > 0 ? $cfs.trigger(cf_e("prev", conf), [r]) : $cfs.trigger(cf_e("next", conf), [c]) }), crsl.mousewheel = !0
                }
                if (opts.auto.play && $cfs.trigger(cf_e("play", conf), opts.auto.delay), crsl.upDateOnWindowResize) {
                    var a = function(t) { $cfs.trigger(cf_e("finish", conf)), opts.auto.pauseOnResize && !crsl.isPaused && $cfs.trigger(cf_e("play", conf)), sz_resetMargin($cfs.children(), opts), $cfs.trigger(cf_e("updateSizes", conf)) },
                        f = $(window),
                        l = null;
                    if ($.debounce && "debounce" == conf.onWindowResize) l = $.debounce(200, a);
                    else if ($.throttle && "throttle" == conf.onWindowResize) l = $.throttle(300, a);
                    else {
                        var p = 0,
                            u = 0;
                        l = function() {
                            var t = f.width(),
                                e = f.height();
                            t == p && e == u || (a(), p = t, u = e)
                        }
                    }
                    f.on(cf_e("resize", conf, !1, !0, !0), l)
                }
            },
            _unbind_buttons: function() {
                cf_e("", conf);
                var t = cf_e("", conf, !1);
                ns3 = cf_e("", conf, !1, !0, !0), $(document).off(ns3), $(window).off(ns3), $wrp.off(t), opts.auto.button && opts.auto.button.off(t), opts.prev.button && opts.prev.button.off(t), opts.next.button && opts.next.button.off(t), opts.pagination.container && (opts.pagination.container.off(t), opts.pagination.anchorBuilder && opts.pagination.container.children().remove()), crsl.swipe && ($cfs.swipe("destroy"), crsl.swipe = !1), crsl.mousewheel && (crsl.mousewheel = !1), nv_showNavi(opts, "hide", conf), nv_enableNavi(opts, "removeClass", conf)
            }
        };
        is_boolean(configs) && (configs = { debug: configs });
        var crsl = { direction: "next", isPaused: !0, isScrolling: !1, isStopped: !1, mousewheel: !1, swipe: !1 },
            itms = { total: $cfs.children().length, first: 0 },
            tmrs = { auto: null, progress: null, startTime: getTime(), timePassed: 0 },
            scrl = { isStopped: !1, duration: 0, startTime: 0, easing: "", anims: [] },
            clbk = { onBefore: [], onAfter: [] },
            queu = [],
            conf = $.extend(!0, {}, $.fn.carouFredSel.configs, configs),
            opts = {},
            opts_orig = $.extend(!0, {}, options),
            $wrp = "parent" == conf.wrapper ? $cfs.parent() : $cfs.wrap("<" + conf.wrapper.element + ' class="' + conf.wrapper.classname + '" />').parent();
        if (conf.selector = $cfs.selector, conf.serialNumber = $.fn.carouFredSel.serialNumber++, conf.transition = conf.transition && $.fn.transition ? "transition" : "animate", FN._init(opts_orig, !0, starting_position), FN._build(), FN._bind_events(), FN._bind_buttons(), is_array(opts.items.start)) var start_arr = opts.items.start;
        else {
            var start_arr = [];
            0 != opts.items.start && start_arr.push(opts.items.start)
        }
        if (opts.cookie && start_arr.unshift(parseInt(cf_getCookie(opts.cookie), 10)), start_arr.length > 0)
            for (var a = 0, l = start_arr.length; a < l; a++) { var s = start_arr[a]; if (0 != s) { if (!0 === s) { if (s = window.location.hash, s.length < 1) continue } else "random" === s && (s = Math.floor(Math.random() * itms.total)); if ($cfs.triggerHandler(cf_e("slideTo", conf), [s, 0, !0, { fx: "none" }])) break } }
        var siz = sz_setSizes($cfs, opts),
            itm = gi_getCurrentItems($cfs.children(), opts);
        return opts.onCreate && opts.onCreate.call($tt0, { width: siz.width, height: siz.height, items: itm }), $cfs.trigger(cf_e("updatePageStatus", conf), [!0, siz]), $cfs.trigger(cf_e("linkAnchors", conf)), conf.debug && $cfs.trigger(cf_e("debug", conf)), $cfs
    }, $.fn.carouFredSel.serialNumber = 1, $.fn.carouFredSel.defaults = { synchronise: !1, infinite: !0, circular: !0, responsive: !1, centerVertically: !1, direction: "left", items: { start: 0 }, scroll: { easing: "swing", duration: 500, pauseOnHover: !1, event: "click", queue: !1 } }, $.fn.carouFredSel.configs = { debug: !1, transition: !1, onWindowResize: "throttle", events: { prefix: "", namespace: "cfs" }, wrapper: { element: "div", classname: "caroufredsel_wrapper" }, classnames: {} }, $.fn.carouFredSel.pageAnchorBuilder = function(t) { return '<a href="#"><span>' + t + "</span></a>" }, $.fn.carouFredSel.progressbarUpdater = function(t) { $(this).css("width", t + "%") }, $.fn.carouFredSel.cookie = {
        get: function(t) {
            t += "=";
            for (var e = document.cookie.split(";"), s = 0, i = e.length; s < i; s++) {
                for (var o = e[s];
                    " " == o.charAt(0);) o = o.slice(1);
                if (0 == o.indexOf(t)) return o.slice(t.length)
            }
            return 0
        },
        set: function(t, e, s) {
            var i = "";
            if (s) {
                var o = new Date;
                o.setTime(o.getTime() + 24 * s * 60 * 60 * 1e3), i = "; expires=" + o.toGMTString()
            }
            document.cookie = t + "=" + e + i + "; path=/"
        },
        remove: function(t) { $.fn.carouFredSel.cookie.set(t, "", -1) }
    }, $.extend($.easing, { quadratic: function(t) { var e = t * t; return t * (-e * t + 4 * e - 6 * t + 4) }, cubic: function(t) { return t * (4 * t * t - 9 * t + 6) }, elastic: function(t) { var e = t * t; return t * (33 * e * e - 106 * e * t + 126 * e - 67 * t + 15) } }))
}(jQuery);
! function(n) { "function" == typeof define && define.amd ? define(["jquery"], function(e) { return n(e) }) : "object" == typeof module && "object" == typeof module.exports ? exports = n(require("jquery")) : n(jQuery) }(function(n) {
    n.easing.jswing = n.easing.swing;
    var e = Math.pow,
        t = Math.sqrt,
        u = Math.sin,
        r = Math.cos,
        i = Math.PI,
        a = 1.70158,
        c = 1.525 * a,
        o = 2 * i / 3,
        s = 2 * i / 4.5;

    function f(n) {
        var e = 7.5625,
            t = 2.75;
        return n < 1 / t ? e * n * n : n < 2 / t ? e * (n -= 1.5 / t) * n + .75 : n < 2.5 / t ? e * (n -= 2.25 / t) * n + .9375 : e * (n -= 2.625 / t) * n + .984375
    }
    n.extend(n.easing, { def: "easeOutQuad", swing: function(e) { return n.easing[n.easing.def](e) }, easeInQuad: function(n) { return n * n }, easeOutQuad: function(n) { return 1 - (1 - n) * (1 - n) }, easeInOutQuad: function(n) { return n < .5 ? 2 * n * n : 1 - e(-2 * n + 2, 2) / 2 }, easeInCubic: function(n) { return n * n * n }, easeOutCubic: function(n) { return 1 - e(1 - n, 3) }, easeInOutCubic: function(n) { return n < .5 ? 4 * n * n * n : 1 - e(-2 * n + 2, 3) / 2 }, easeInQuart: function(n) { return n * n * n * n }, easeOutQuart: function(n) { return 1 - e(1 - n, 4) }, easeInOutQuart: function(n) { return n < .5 ? 8 * n * n * n * n : 1 - e(-2 * n + 2, 4) / 2 }, easeInQuint: function(n) { return n * n * n * n * n }, easeOutQuint: function(n) { return 1 - e(1 - n, 5) }, easeInOutQuint: function(n) { return n < .5 ? 16 * n * n * n * n * n : 1 - e(-2 * n + 2, 5) / 2 }, easeInSine: function(n) { return 1 - r(n * i / 2) }, easeOutSine: function(n) { return u(n * i / 2) }, easeInOutSine: function(n) { return -(r(i * n) - 1) / 2 }, easeInExpo: function(n) { return 0 === n ? 0 : e(2, 10 * n - 10) }, easeOutExpo: function(n) { return 1 === n ? 1 : 1 - e(2, -10 * n) }, easeInOutExpo: function(n) { return 0 === n ? 0 : 1 === n ? 1 : n < .5 ? e(2, 20 * n - 10) / 2 : (2 - e(2, -20 * n + 10)) / 2 }, easeInCirc: function(n) { return 1 - t(1 - e(n, 2)) }, easeOutCirc: function(n) { return t(1 - e(n - 1, 2)) }, easeInOutCirc: function(n) { return n < .5 ? (1 - t(1 - e(2 * n, 2))) / 2 : (t(1 - e(-2 * n + 2, 2)) + 1) / 2 }, easeInElastic: function(n) { return 0 === n ? 0 : 1 === n ? 1 : -e(2, 10 * n - 10) * u((10 * n - 10.75) * o) }, easeOutElastic: function(n) { return 0 === n ? 0 : 1 === n ? 1 : e(2, -10 * n) * u((10 * n - .75) * o) + 1 }, easeInOutElastic: function(n) { return 0 === n ? 0 : 1 === n ? 1 : n < .5 ? -e(2, 20 * n - 10) * u((20 * n - 11.125) * s) / 2 : e(2, -20 * n + 10) * u((20 * n - 11.125) * s) / 2 + 1 }, easeInBack: function(n) { return 2.70158 * n * n * n - a * n * n }, easeOutBack: function(n) { return 1 + 2.70158 * e(n - 1, 3) + a * e(n - 1, 2) }, easeInOutBack: function(n) { return n < .5 ? e(2 * n, 2) * (7.189819 * n - c) / 2 : (e(2 * n - 2, 2) * ((c + 1) * (2 * n - 2) + c) + 2) / 2 }, easeInBounce: function(n) { return 1 - f(1 - n) }, easeOutBounce: f, easeInOutBounce: function(n) { return n < .5 ? (1 - f(1 - 2 * n)) / 2 : (1 + f(2 * n - 1)) / 2 } })
});
! function(t) {
    "use strict";
    t.fn.fitVids = function(e) {
        var i = { customSelector: null, ignore: null };
        if (!document.getElementById("fit-vids-style")) {
            var r = document.head || document.getElementsByTagName("head")[0],
                a = document.createElement("div");
            a.innerHTML = '<p>x</p><style id="fit-vids-style">.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}</style>', r.appendChild(a.childNodes[1])
        }
        return e && t.extend(i, e), this.each(function() {
            var e = ['iframe[src*="player.vimeo.com"]', 'iframe[src*="youtube.com"]', 'iframe[src*="youtube-nocookie.com"]', 'iframe[src*="kickstarter.com"][src*="video.html"]', "object", "embed"];
            i.customSelector && e.push(i.customSelector);
            var r = ".fitvidsignore";
            i.ignore && (r = r + ", " + i.ignore);
            var a = t(this).find(e.join(","));
            (a = (a = a.not("object object")).not(r)).each(function() {
                var e = t(this);
                if (!(e.parents(r).length > 0 || "embed" === this.tagName.toLowerCase() && e.parent("object").length || e.parent(".fluid-width-video-wrapper").length)) {
                    e.css("height") || e.css("width") || !isNaN(e.attr("height")) && !isNaN(e.attr("width")) || (e.attr("height", 9), e.attr("width", 16));
                    var i = ("object" === this.tagName.toLowerCase() || e.attr("height") && !isNaN(parseInt(e.attr("height"), 10)) ? parseInt(e.attr("height"), 10) : e.height()) / (isNaN(parseInt(e.attr("width"), 10)) ? e.width() : parseInt(e.attr("width"), 10));
                    if (!e.attr("name")) {
                        var a = "fitvid" + t.fn.fitVids._count;
                        e.attr("name", a), t.fn.fitVids._count++
                    }
                    e.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top", 100 * i + "%"), e.removeAttr("height").removeAttr("width")
                }
            })
        })
    }, t.fn.fitVids._count = 0
}(window.jQuery || window.Zepto);
! function(e) {
    var t = !0;
    e.flexslider = function(a, n) {
        var i = e(a);
        void 0 === n.rtl && "rtl" == e("html").attr("dir") && (n.rtl = !0), i.vars = e.extend({}, e.flexslider.defaults, n);
        var s, r = i.vars.namespace,
            o = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
            l = ("ontouchstart" in window || o || window.DocumentTouch && document instanceof DocumentTouch) && i.vars.touch,
            c = "click touchend MSPointerUp keyup",
            d = "",
            u = "vertical" === i.vars.direction,
            v = i.vars.reverse,
            p = i.vars.itemWidth > 0,
            m = "fade" === i.vars.animation,
            f = "" !== i.vars.asNavFor,
            h = {};
        e.data(a, "flexslider", i), h = {
            init: function() {
                i.animating = !1, i.currentSlide = parseInt(i.vars.startAt ? i.vars.startAt : 0, 10), isNaN(i.currentSlide) && (i.currentSlide = 0), i.animatingTo = i.currentSlide, i.atEnd = 0 === i.currentSlide || i.currentSlide === i.last, i.containerSelector = i.vars.selector.substr(0, i.vars.selector.search(" ")), i.slides = e(i.vars.selector, i), i.container = e(i.containerSelector, i), i.count = i.slides.length, i.syncExists = e(i.vars.sync).length > 0, "slide" === i.vars.animation && (i.vars.animation = "swing"), i.prop = u ? "top" : i.vars.rtl ? "marginRight" : "marginLeft", i.args = {}, i.manualPause = !1, i.stopped = !1, i.started = !1, i.startTimeout = null, i.transitions = !i.vars.video && !m && i.vars.useCSS && function() {
                    var e = document.createElement("div"),
                        t = ["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
                    for (var a in t)
                        if (void 0 !== e.style[t[a]]) return i.pfx = t[a].replace("Perspective", "").toLowerCase(), i.prop = "-" + i.pfx + "-transform", !0;
                    return !1
                }(), i.isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1, i.ensureAnimationEnd = "", "" !== i.vars.controlsContainer && (i.controlsContainer = e(i.vars.controlsContainer).length > 0 && e(i.vars.controlsContainer)), "" !== i.vars.manualControls && (i.manualControls = e(i.vars.manualControls).length > 0 && e(i.vars.manualControls)), "" !== i.vars.customDirectionNav && (i.customDirectionNav = 2 === e(i.vars.customDirectionNav).length && e(i.vars.customDirectionNav)), i.vars.randomize && (i.slides.sort(function() { return Math.round(Math.random()) - .5 }), i.container.empty().append(i.slides)), i.doMath(), i.setup("init"), i.vars.controlNav && h.controlNav.setup(), i.vars.directionNav && h.directionNav.setup(), i.vars.keyboard && (1 === e(i.containerSelector).length || i.vars.multipleKeyboard) && e(document).on("keyup", function(e) {
                    var t = e.keyCode;
                    if (!i.animating && (39 === t || 37 === t)) {
                        var a = i.vars.rtl ? 37 === t ? i.getTarget("next") : 39 === t && i.getTarget("prev") : 39 === t ? i.getTarget("next") : 37 === t && i.getTarget("prev");
                        i.flexAnimate(a, i.vars.pauseOnAction)
                    }
                }), i.vars.mousewheel && i.on("mousewheel", function(e, t, a, n) {
                    e.preventDefault();
                    var s = t < 0 ? i.getTarget("next") : i.getTarget("prev");
                    i.flexAnimate(s, i.vars.pauseOnAction)
                }), i.vars.pausePlay && h.pausePlay.setup(), i.vars.slideshow && i.vars.pauseInvisible && h.pauseInvisible.init(), i.vars.slideshow && (i.vars.pauseOnHover && i.hover(function() { i.manualPlay || i.manualPause || i.pause() }, function() { i.manualPause || i.manualPlay || i.stopped || i.play() }), i.vars.pauseInvisible && h.pauseInvisible.isHidden() || (i.vars.initDelay > 0 ? i.startTimeout = setTimeout(i.play, i.vars.initDelay) : i.play())), f && h.asNav.setup(), l && i.vars.touch && h.touch(), (!m || m && i.vars.smoothHeight) && e(window).on("resize orientationchange focus", h.resize), i.find("img").attr("draggable", "false"), setTimeout(function() { i.vars.start(i) }, 200)
            },
            asNav: {
                setup: function() {
                    i.asNav = !0, i.animatingTo = Math.floor(i.currentSlide / i.move), i.currentItem = i.currentSlide, i.slides.removeClass(r + "active-slide").eq(i.currentItem).addClass(r + "active-slide"), o ? (a._slider = i, i.slides.each(function() {
                        this._gesture = new MSGesture, this._gesture.target = this, this.addEventListener("MSPointerDown", function(e) { e.preventDefault(), e.currentTarget._gesture && e.currentTarget._gesture.addPointer(e.pointerId) }, !1), this.addEventListener("MSGestureTap", function(t) {
                            t.preventDefault();
                            var a = e(this),
                                n = a.index();
                            e(i.vars.asNavFor).data("flexslider").animating || a.hasClass("active") || (i.direction = i.currentItem < n ? "next" : "prev", i.flexAnimate(n, i.vars.pauseOnAction, !1, !0, !0))
                        })
                    })) : i.slides.on(c, function(t) {
                        t.preventDefault();
                        var a = e(this),
                            n = a.index();
                        (i.vars.rtl ? -1 * (a.offset().right - e(i).scrollLeft()) : a.offset().left - e(i).scrollLeft()) <= 0 && a.hasClass(r + "active-slide") ? i.flexAnimate(i.getTarget("prev"), !0) : e(i.vars.asNavFor).data("flexslider").animating || a.hasClass(r + "active-slide") || (i.direction = i.currentItem < n ? "next" : "prev", i.flexAnimate(n, i.vars.pauseOnAction, !1, !0, !0))
                    })
                }
            },
            controlNav: {
                setup: function() { i.manualControls ? h.controlNav.setupManual() : h.controlNav.setupPaging() },
                setupPaging: function() {
                    var t, a, n = "thumbnails" === i.vars.controlNav ? "control-thumbs" : "control-paging",
                        s = 1;
                    if (i.controlNavScaffold = e('<ol class="' + r + "control-nav " + r + n + '"></ol>'), i.pagingCount > 1)
                        for (var o = 0; o < i.pagingCount; o++) {
                            if (void 0 === (a = i.slides.eq(o)).attr("data-thumb-alt") && a.attr("data-thumb-alt", ""), t = e("<a></a>").attr("href", "#").text(s), "thumbnails" === i.vars.controlNav && (t = e("<img/>").attr("src", a.attr("data-thumb"))), "" !== a.attr("data-thumb-alt") && t.attr("alt", a.attr("data-thumb-alt")), "thumbnails" === i.vars.controlNav && !0 === i.vars.thumbCaptions) {
                                var l = a.attr("data-thumbcaption");
                                if ("" !== l && void 0 !== l) {
                                    var u = e("<span></span>").addClass(r + "caption").text(l);
                                    t.append(u)
                                }
                            }
                            var v = e("<li>");
                            t.appendTo(v), v.append("</li>"), i.controlNavScaffold.append(v), s++
                        }
                    i.controlsContainer ? e(i.controlsContainer).append(i.controlNavScaffold) : i.append(i.controlNavScaffold), h.controlNav.set(), h.controlNav.active(), i.controlNavScaffold.on(c, "a, img", function(t) {
                        if (t.preventDefault(), "" === d || d === t.type) {
                            var a = e(this),
                                n = i.controlNav.index(a);
                            a.hasClass(r + "active") || (i.direction = n > i.currentSlide ? "next" : "prev", i.flexAnimate(n, i.vars.pauseOnAction))
                        }
                        "" === d && (d = t.type), h.setToClearWatchedEvent()
                    })
                },
                setupManual: function() {
                    i.controlNav = i.manualControls, h.controlNav.active(), i.controlNav.on(c, function(t) {
                        if (t.preventDefault(), "" === d || d === t.type) {
                            var a = e(this),
                                n = i.controlNav.index(a);
                            a.hasClass(r + "active") || (n > i.currentSlide ? i.direction = "next" : i.direction = "prev", i.flexAnimate(n, i.vars.pauseOnAction))
                        }
                        "" === d && (d = t.type), h.setToClearWatchedEvent()
                    })
                },
                set: function() {
                    var t = "thumbnails" === i.vars.controlNav ? "img" : "a";
                    i.controlNav = e("." + r + "control-nav li " + t, i.controlsContainer ? i.controlsContainer : i)
                },
                active: function() { i.controlNav.removeClass(r + "active").eq(i.animatingTo).addClass(r + "active") },
                update: function(t, a) { i.pagingCount > 1 && "add" === t ? i.controlNavScaffold.append(e('<li><a href="#">' + i.count + "</a></li>")) : 1 === i.pagingCount ? i.controlNavScaffold.find("li").remove() : i.controlNav.eq(a).closest("li").remove(), h.controlNav.set(), i.pagingCount > 1 && i.pagingCount !== i.controlNav.length ? i.update(a, t) : h.controlNav.active() }
            },
            directionNav: {
                setup: function() {
                    var t = e('<ul class="' + r + 'direction-nav"><li class="' + r + 'nav-prev"><a class="' + r + 'prev" href="#">' + i.vars.prevText + '</a></li><li class="' + r + 'nav-next"><a class="' + r + 'next" href="#">' + i.vars.nextText + "</a></li></ul>");
                    i.customDirectionNav ? i.directionNav = i.customDirectionNav : i.controlsContainer ? (e(i.controlsContainer).append(t), i.directionNav = e("." + r + "direction-nav li a", i.controlsContainer)) : (i.append(t), i.directionNav = e("." + r + "direction-nav li a", i)), h.directionNav.update(), i.directionNav.on(c, function(t) {
                        var a;
                        t.preventDefault(), "" !== d && d !== t.type || (a = e(this).hasClass(r + "next") ? i.getTarget("next") : i.getTarget("prev"), i.flexAnimate(a, i.vars.pauseOnAction)), "" === d && (d = t.type), h.setToClearWatchedEvent()
                    })
                },
                update: function() {
                    var e = r + "disabled";
                    1 === i.pagingCount ? i.directionNav.addClass(e).attr("tabindex", "-1") : i.vars.animationLoop ? i.directionNav.removeClass(e).removeAttr("tabindex") : 0 === i.animatingTo ? i.directionNav.removeClass(e).filter("." + r + "prev").addClass(e).attr("tabindex", "-1") : i.animatingTo === i.last ? i.directionNav.removeClass(e).filter("." + r + "next").addClass(e).attr("tabindex", "-1") : i.directionNav.removeClass(e).removeAttr("tabindex")
                }
            },
            pausePlay: {
                setup: function() {
                    var t = e('<div class="' + r + 'pauseplay"><a href="#"></a></div>');
                    i.controlsContainer ? (i.controlsContainer.append(t), i.pausePlay = e("." + r + "pauseplay a", i.controlsContainer)) : (i.append(t), i.pausePlay = e("." + r + "pauseplay a", i)), h.pausePlay.update(i.vars.slideshow ? r + "pause" : r + "play"), i.pausePlay.on(c, function(t) { t.preventDefault(), "" !== d && d !== t.type || (e(this).hasClass(r + "pause") ? (i.manualPause = !0, i.manualPlay = !1, i.pause()) : (i.manualPause = !1, i.manualPlay = !0, i.play())), "" === d && (d = t.type), h.setToClearWatchedEvent() })
                },
                update: function(e) { "play" === e ? i.pausePlay.removeClass(r + "pause").addClass(r + "play").html(i.vars.playText) : i.pausePlay.removeClass(r + "play").addClass(r + "pause").html(i.vars.pauseText) }
            },
            touch: function() {
                var e, t, n, s, r, l, c, d, f, h = !1,
                    g = 0,
                    x = 0;
                if (o) {} else c = function(r) { i.animating ? r.preventDefault() : (window.navigator.msPointerEnabled || 1 === r.touches.length) && (i.pause(), s = u ? i.h : i.w, l = Number(new Date), g = r.touches[0].pageX, x = r.touches[0].pageY, n = p && v && i.animatingTo === i.last ? 0 : p && v ? i.limit - (i.itemW + i.vars.itemMargin) * i.move * i.animatingTo : p && i.currentSlide === i.last ? i.limit : p ? (i.itemW + i.vars.itemMargin) * i.move * i.currentSlide : v ? (i.last - i.currentSlide + i.cloneOffset) * s : (i.currentSlide + i.cloneOffset) * s, e = u ? x : g, t = u ? g : x, a.addEventListener("touchmove", d, !1), a.addEventListener("touchend", f, !1)) }, d = function(a) {
                    g = a.touches[0].pageX, x = a.touches[0].pageY, r = u ? e - x : (i.vars.rtl ? -1 : 1) * (e - g);
                    (!(h = u ? Math.abs(r) < Math.abs(g - t) : Math.abs(r) < Math.abs(x - t)) || Number(new Date) - l > 500) && (a.preventDefault(), !m && i.transitions && (i.vars.animationLoop || (r /= 0 === i.currentSlide && r < 0 || i.currentSlide === i.last && r > 0 ? Math.abs(r) / s + 2 : 1), i.setProps(n + r, "setTouch")))
                }, f = function(o) {
                    if (a.removeEventListener("touchmove", d, !1), i.animatingTo === i.currentSlide && !h && null !== r) {
                        var c = v ? -r : r,
                            u = c > 0 ? i.getTarget("next") : i.getTarget("prev");
                        i.canAdvance(u) && (Number(new Date) - l < 550 && Math.abs(c) > 50 || Math.abs(c) > s / 2) ? i.flexAnimate(u, i.vars.pauseOnAction) : !m && i.canAdvance(u) && i.flexAnimate(i.currentSlide, i.vars.pauseOnAction, !0)
                    }
                    a.removeEventListener("touchend", f, !1), i.vars.slideshow && null !== r && 50 > Math.abs(c) && i.play(), e = null, t = null, r = null, n = null
                }, a.addEventListener("touchstart", c, { passive: !0, capture: !1 })
            },
            resize: function() {!i.animating && i.is(":visible") && (p || i.doMath(), m ? h.smoothHeight() : p ? (i.slides.width(i.computedW), i.update(i.pagingCount), i.setProps()) : u ? (i.viewport.height(i.h), i.setProps(i.h, "setTotal")) : (i.vars.smoothHeight && h.smoothHeight(), i.newSlides.width(i.computedW), i.setProps(i.computedW, "setTotal"))) },
            smoothHeight: function(e) {
                if (!u || m) {
                    var t = m ? i : i.viewport;
                    e ? t.animate({ height: i.slides.eq(i.animatingTo).innerHeight() }, e) : t.innerHeight(i.slides.eq(i.animatingTo).innerHeight())
                }
            },
            sync: function(t) {
                var a = e(i.vars.sync).data("flexslider"),
                    n = i.animatingTo;
                switch (t) {
                    case "animate":
                        a.flexAnimate(n, i.vars.pauseOnAction, !1, !0);
                        break;
                    case "play":
                        a.playing || a.asNav || a.play();
                        break;
                    case "pause":
                        a.pause()
                }
            },
            uniqueID: function(t) {
                return t.filter("[id]").add(t.find("[id]")).each(function() {
                    var t = e(this);
                    t.attr("id", t.attr("id") + "_clone")
                }), t
            },
            pauseInvisible: {
                visProp: null,
                init: function() {
                    var e = h.pauseInvisible.getHiddenProp();
                    if (e) {
                        var t = e.replace(/[H|h]idden/, "") + "visibilitychange";
                        document.addEventListener(t, function() { h.pauseInvisible.isHidden() ? i.startTimeout ? clearTimeout(i.startTimeout) : i.pause() : i.started ? i.play() : i.vars.initDelay > 0 ? setTimeout(i.play, i.vars.initDelay) : i.play() })
                    }
                },
                isHidden: function() { var e = h.pauseInvisible.getHiddenProp(); return !!e && document[e] },
                getHiddenProp: function() {
                    var e = ["webkit", "moz", "ms", "o"];
                    if ("hidden" in document) return "hidden";
                    for (var t = 0; t < e.length; t++)
                        if (e[t] + "Hidden" in document) return e[t] + "Hidden";
                    return null
                }
            },
            setToClearWatchedEvent: function() { clearTimeout(s), s = setTimeout(function() { d = "" }, 3e3) }
        }, i.flexAnimate = function(t, a, n, s, o) {
            if (i.vars.animationLoop || t === i.currentSlide || (i.direction = t > i.currentSlide ? "next" : "prev"), f && 1 === i.pagingCount && (i.direction = i.currentItem < t ? "next" : "prev"), !i.animating && (i.canAdvance(t, o) || n) && i.is(":visible")) {
                if (f && s) {
                    var c = e(i.vars.asNavFor).data("flexslider");
                    if (i.atEnd = 0 === t || t === i.count - 1, c.flexAnimate(t, !0, !1, !0, o), i.direction = i.currentItem < t ? "next" : "prev", c.direction = i.direction, Math.ceil((t + 1) / i.visible) - 1 === i.currentSlide || 0 === t) return i.currentItem = t, i.slides.removeClass(r + "active-slide").eq(t).addClass(r + "active-slide"), !1;
                    i.currentItem = t, i.slides.removeClass(r + "active-slide").eq(t).addClass(r + "active-slide"), t = Math.floor(t / i.visible)
                }
                if (i.animating = !0, i.animatingTo = t, a && i.pause(), i.vars.before(i), i.syncExists && !o && h.sync("animate"), i.vars.controlNav && h.controlNav.active(), p || i.slides.removeClass(r + "active-slide").eq(t).addClass(r + "active-slide"), i.atEnd = 0 === t || t === i.last, i.vars.directionNav && h.directionNav.update(), t === i.last && (i.vars.end(i), i.vars.animationLoop || i.pause()), m) l ? (i.slides.eq(i.currentSlide).css({ opacity: 0, zIndex: 1 }), i.slides.eq(t).css({ opacity: 1, zIndex: 2 }), i.wrapup(y)) : (i.slides.eq(i.currentSlide).css({ zIndex: 1 }).animate({ opacity: 0 }, i.vars.animationSpeed, i.vars.easing), i.slides.eq(t).css({ zIndex: 2 }).animate({ opacity: 1 }, i.vars.animationSpeed, i.vars.easing, i.wrapup));
                else {
                    var d, g, x, y = u ? i.slides.filter(":first").height() : i.computedW;
                    p ? (d = i.vars.itemMargin, g = (x = (i.itemW + d) * i.move * i.animatingTo) > i.limit && 1 !== i.visible ? i.limit : x) : g = 0 === i.currentSlide && t === i.count - 1 && i.vars.animationLoop && "next" !== i.direction ? v ? (i.count + i.cloneOffset) * y : 0 : i.currentSlide === i.last && 0 === t && i.vars.animationLoop && "prev" !== i.direction ? v ? 0 : (i.count + 1) * y : v ? (i.count - 1 - t + i.cloneOffset) * y : (t + i.cloneOffset) * y, i.setProps(g, "", i.vars.animationSpeed), i.transitions ? (i.vars.animationLoop && i.atEnd || (i.animating = !1, i.currentSlide = i.animatingTo), i.container.off("webkitTransitionEnd transitionend"), i.container.on("webkitTransitionEnd transitionend", function() { clearTimeout(i.ensureAnimationEnd), i.wrapup(y) }), clearTimeout(i.ensureAnimationEnd), i.ensureAnimationEnd = setTimeout(function() { i.wrapup(y) }, i.vars.animationSpeed + 100)) : i.container.animate(i.args, i.vars.animationSpeed, i.vars.easing, function() { i.wrapup(y) })
                }
                i.vars.smoothHeight && h.smoothHeight(i.vars.animationSpeed)
            }
        }, i.wrapup = function(e) { m || p || (0 === i.currentSlide && i.animatingTo === i.last && i.vars.animationLoop ? i.setProps(e, "jumpEnd") : i.currentSlide === i.last && 0 === i.animatingTo && i.vars.animationLoop && i.setProps(e, "jumpStart")), i.animating = !1, i.currentSlide = i.animatingTo, i.vars.after(i) }, i.animateSlides = function() {!i.animating && t && i.flexAnimate(i.getTarget("next")) }, i.pause = function() { clearInterval(i.animatedSlides), i.animatedSlides = null, i.playing = !1, i.vars.pausePlay && h.pausePlay.update("play"), i.syncExists && h.sync("pause") }, i.play = function() { i.playing && clearInterval(i.animatedSlides), i.animatedSlides = i.animatedSlides || setInterval(i.animateSlides, i.vars.slideshowSpeed), i.started = i.playing = !0, i.vars.pausePlay && h.pausePlay.update("pause"), i.syncExists && h.sync("play") }, i.stop = function() { i.pause(), i.stopped = !0 }, i.canAdvance = function(e, t) { var a = f ? i.pagingCount - 1 : i.last; return !!t || (!(!f || i.currentItem !== i.count - 1 || 0 !== e || "prev" !== i.direction) || (!f || 0 !== i.currentItem || e !== i.pagingCount - 1 || "next" === i.direction) && (!(e === i.currentSlide && !f) && (!!i.vars.animationLoop || (!i.atEnd || 0 !== i.currentSlide || e !== a || "next" === i.direction) && (!i.atEnd || i.currentSlide !== a || 0 !== e || "next" !== i.direction)))) }, i.getTarget = function(e) { return i.direction = e, "next" === e ? i.currentSlide === i.last ? 0 : i.currentSlide + 1 : 0 === i.currentSlide ? i.last : i.currentSlide - 1 }, i.setProps = function(e, t, a) {
            var n, s = (n = e || (i.itemW + i.vars.itemMargin) * i.move * i.animatingTo, function() {
                if (p) return "setTouch" === t ? e : v && i.animatingTo === i.last ? 0 : v ? i.limit - (i.itemW + i.vars.itemMargin) * i.move * i.animatingTo : i.animatingTo === i.last ? i.limit : n;
                switch (t) {
                    case "setTotal":
                        return v ? (i.count - 1 - i.currentSlide + i.cloneOffset) * e : (i.currentSlide + i.cloneOffset) * e;
                    case "setTouch":
                        return e;
                    case "jumpEnd":
                        return v ? e : i.count * e;
                    case "jumpStart":
                        return v ? i.count * e : e;
                    default:
                        return e
                }
            }() * (i.vars.rtl ? 1 : -1) + "px");
            i.transitions && (s = i.isFirefox ? u ? "translate3d(0," + s + ",0)" : "translate3d(" + parseInt(s) + "px,0,0)" : u ? "translate3d(0," + s + ",0)" : "translate3d(" + (i.vars.rtl ? -1 : 1) * parseInt(s) + "px,0,0)", a = void 0 !== a ? a / 1e3 + "s" : "0s", i.container.css("-" + i.pfx + "-transition-duration", a), i.container.css("transition-duration", a)), i.args[i.prop] = s, (i.transitions || void 0 === a) && i.container.css(i.args), i.container.css("transform", s)
        }, i.setup = function(t) {
            var a, n;
            m ? (i.vars.rtl ? i.slides.css({ width: "100%", float: "right", marginLeft: "-100%", position: "relative" }) : i.slides.css({ width: "100%", float: "left", marginRight: "-100%", position: "relative" }), "init" === t && (l ? i.slides.css({ opacity: 0, display: "block", webkitTransition: "opacity " + i.vars.animationSpeed / 1e3 + "s ease", zIndex: 1 }).eq(i.currentSlide).css({ opacity: 1, zIndex: 2 }) : 0 == i.vars.fadeFirstSlide ? i.slides.css({ opacity: 0, display: "block", zIndex: 1 }).eq(i.currentSlide).css({ zIndex: 2 }).css({ opacity: 1 }) : i.slides.css({ opacity: 0, display: "block", zIndex: 1 }).eq(i.currentSlide).css({ zIndex: 2 }).animate({ opacity: 1 }, i.vars.animationSpeed, i.vars.easing)), i.vars.smoothHeight && h.smoothHeight()) : ("init" === t && (i.viewport = e('<div class="' + r + 'viewport"></div>').css({ overflow: "hidden", position: "relative" }).appendTo(i).append(i.container), i.cloneCount = 0, i.cloneOffset = 0, v && (n = e.makeArray(i.slides).reverse(), i.slides = e(n), i.container.empty().append(i.slides))), i.vars.animationLoop && !p && (i.cloneCount = 2, i.cloneOffset = 1, "init" !== t && i.container.find(".clone").remove(), h.uniqueID(i.slides.first().clone().addClass("clone").attr("aria-hidden", "true")).appendTo(i.container), h.uniqueID(i.slides.last().clone().addClass("clone").attr("aria-hidden", "true")).prependTo(i.container)), i.newSlides = e(i.vars.selector, i), a = v ? i.count - 1 - i.currentSlide + i.cloneOffset : i.currentSlide + i.cloneOffset, u && !p ? (i.container.height(200 * (i.count + i.cloneCount) + "%").css("position", "absolute").width("100%"), setTimeout(function() { i.newSlides.css({ display: "block" }), i.doMath(), i.viewport.height(i.h), i.setProps(a * i.h, "init") }, "init" === t ? 100 : 0)) : (i.container.width(200 * (i.count + i.cloneCount) + "%"), i.setProps(a * i.computedW, "init"), setTimeout(function() { i.is(":visible") && i.doMath(), i.vars.rtl && i.isFirefox ? i.newSlides.css({ width: i.computedW, marginRight: i.computedM, float: "right", display: "block" }) : i.newSlides.css({ width: i.computedW, marginRight: i.computedM, float: "left", display: "block" }), i.vars.smoothHeight && h.smoothHeight() }, "init" === t ? 100 : 0)));
            p || i.slides.removeClass(r + "active-slide").eq(i.currentSlide).addClass(r + "active-slide"), i.vars.init(i)
        }, i.doMath = function() {
            var e = i.slides.first(),
                t = i.vars.itemMargin,
                a = i.vars.minItems,
                n = i.vars.maxItems;
            i.w = void 0 === i.viewport ? i.width() : i.viewport.width(), i.isFirefox && (i.w = i.width()), i.h = e.height(), i.boxPadding = e.outerWidth() - e.width(), p ? (i.itemT = i.vars.itemWidth + t, i.itemM = t, i.minW = a ? a * i.itemT : i.w, i.maxW = n ? n * i.itemT - t : i.w, i.itemW = i.minW > i.w ? (i.w - t * (a - 1)) / a : i.maxW < i.w ? (i.w - t * (n - 1)) / n : i.vars.itemWidth > i.w ? i.w : i.vars.itemWidth, i.visible = Math.floor(i.w / (i.itemW + t)), i.move = i.vars.move > 0 && i.vars.move < i.visible ? i.vars.move : i.visible, i.pagingCount = Math.ceil((i.count - i.visible) / i.move + 1), i.last = i.pagingCount - 1, i.limit = 1 === i.pagingCount ? 0 : i.vars.itemWidth > i.w ? i.itemW * (i.count - 1) + t * (i.count - 1) : (i.itemW + t) * i.count - i.w - t) : (i.itemW = i.w, jQuery(i).children(".flex-viewport").length && i.w !== jQuery(i).children(".flex-viewport").width() && (i.itemW = jQuery(i).children(".flex-viewport").width()), i.itemM = t, i.pagingCount = i.count, i.last = i.count - 1), i.computedW = i.itemW - i.boxPadding, i.computedM = i.itemM
        }, i.update = function(e, t) { i.doMath(), p || (e < i.currentSlide ? i.currentSlide += 1 : e <= i.currentSlide && 0 !== e && (i.currentSlide -= 1), i.animatingTo = i.currentSlide), i.vars.controlNav && !i.manualControls && ("add" === t && !p || i.pagingCount > i.controlNav.length ? h.controlNav.update("add") : ("remove" === t && !p || i.pagingCount < i.controlNav.length) && (p && i.currentSlide > i.last && (i.currentSlide -= 1, i.animatingTo -= 1), h.controlNav.update("remove", i.last))), i.vars.directionNav && h.directionNav.update() }, i.addSlide = function(t, a) {
            var n = e(t);
            i.count += 1, i.last = i.count - 1, u && v ? void 0 !== a ? i.slides.eq(i.count - a).after(n) : i.container.prepend(n) : void 0 !== a ? i.slides.eq(a).before(n) : i.container.append(n), i.update(a, "add"), i.slides = e(i.vars.selector + ":not(.clone)", i), i.setup(), i.vars.added(i)
        }, i.removeSlide = function(t) {
            var a = isNaN(t) ? i.slides.index(e(t)) : t;
            i.count -= 1, i.last = i.count - 1, isNaN(t) ? e(t, i.slides).remove() : u && v ? i.slides.eq(i.last).remove() : i.slides.eq(t).remove(), i.doMath(), i.update(a, "remove"), i.slides = e(i.vars.selector + ":not(.clone)", i), i.setup(), i.vars.removed(i)
        }, i.destroy = function() {
            var t = "." + i.vars.namespace;
            i.vars.controlNav && i.controlNav.closest(t + "control-nav").remove(), i.vars.directionNav && i.directionNav.closest(t + "direction-nav").remove(), i.vars.pausePlay && i.pausePlay.closest(t + "pauseplay").remove(), i.find(".clone").remove(), i.off(i.vars.eventNamespace), "fade" != i.vars.animation && i.container.unwrap(), i.container.removeAttr("style"), i.container.off(i.vars.eventNamespace), i.slides.removeAttr("style"), i.slides.filter(t + "active-slide").removeClass(i.vars.namespace + "active-slide"), i.slides.off(i.vars.eventNamespace), e(document).off(i.vars.eventNamespace + "-" + i.id), e(window).off(i.vars.eventNamespace + "-" + i.id), i.stop(), i.removeData("flexslider")
        }, h.init()
    }, e(window).on({ blur: function(e) { t = !1 }, focus: function(e) { t = !0 } }), e.flexslider.defaults = { namespace: "flex-", selector: ".slides > li", animation: "fade", easing: "swing", direction: "horizontal", reverse: !1, animationLoop: !0, smoothHeight: !1, startAt: 0, slideshow: !0, slideshowSpeed: 7e3, animationSpeed: 600, initDelay: 0, randomize: !1, fadeFirstSlide: !0, thumbCaptions: !1, pauseOnAction: !0, pauseOnHover: !1, pauseInvisible: !0, useCSS: !0, touch: !0, video: !1, controlNav: !0, directionNav: !0, prevText: "&#xf104;", nextText: "&#xf105;", keyboard: !0, multipleKeyboard: !1, mousewheel: !1, pausePlay: !1, pauseText: "Pause", playText: "Play", controlsContainer: "", manualControls: "", customDirectionNav: "", sync: "", asNavFor: "", itemWidth: 0, itemMargin: 0, minItems: 1, maxItems: 0, move: 0, allowOneSlide: !0, isFirefox: !1, start: function() {}, before: function() {}, after: function() {}, end: function() {}, added: function() {}, removed: function() {}, init: function() {}, rtl: !1 }, e.fn.flexslider = function(t) {
        if (void 0 === t && (t = {}), "object" == typeof t) return this.each(function() {
            var a = e(this),
                n = t.selector ? t.selector : ".slides > li",
                i = a.find(n);
            1 === i.length && !1 === t.allowOneSlide || 0 === i.length ? (i.fadeIn(400), t.start && t.start(a)) : void 0 === a.data("flexslider") && new e.flexslider(this, t)
        });
        var a = e(this).data("flexslider");
        switch (t) {
            case "play":
                a.play();
                break;
            case "pause":
                a.pause();
                break;
            case "stop":
                a.stop();
                break;
            case "next":
                a.flexAnimate(a.getTarget("next"), !0);
                break;
            case "prev":
            case "previous":
                a.flexAnimate(a.getTarget("prev"), !0);
                break;
            case "destroy":
                a.destroy();
                break;
            default:
                "number" == typeof t && a.flexAnimate(t, !0)
        }
    }
}(jQuery);
var fusionMapsVars = { "admin_ajax": "https:\/\/avada.theme-fusion.com\/construction\/wp-admin\/admin-ajax.php" };
! function(e, s, t, o) {
    "use strict";
    var n = "fusion_maps",
        i = { addresses: {}, address_pin: !0, animations: !0, delay: 10, infobox_background_color: !1, infobox_styling: "default", infobox_text_color: !1, map_style: "default", map_type: "roadmap", marker_icon: !1, overlay_color: !1, overlay_color_hsl: {}, pan_control: !0, show_address: !0, scale_control: !0, scrollwheel: !0, zoom: 9, zoom_control: !0 };

    function a(s, t) { this.element = s, this.settings = e.extend({}, i, t), this._defaults = i, this._name = n, this.geocoder = new google.maps.Geocoder, this.next_address = 0, this.infowindow = new google.maps.InfoWindow, this.markers = [], this.query_sent = !1, this.last_cache_index = "none", this.bounds = new google.maps.LatLngBounds, this.init() }
    e.extend(a.prototype, {
        init: function() {
            var e, s, t, o = { zoom: this.settings.zoom, mapTypeId: this.settings.map_type, scrollwheel: this.settings.scrollwheel, scaleControl: this.settings.scale_control, panControl: this.settings.pan_control, zoomControl: this.settings.zoom_control },
                n = this;
            this.settings.scrollwheel || (o.gestureHandling = "cooperative", delete o.scrollwheel), this.settings.address_pin || (this.settings.addresses = [this.settings.addresses[0]]), jQuery.each(this.settings.addresses, function(e) {!1 === this.cache && (n.last_cache_index = e) }), this.settings.addresses[0].coordinates && (e = new google.maps.LatLng(this.settings.addresses[0].latitude, this.settings.addresses[0].longitude), o.center = e), this.map = new google.maps.Map(this.element, o), this.settings.overlay_color && "custom" === this.settings.map_style && (s = [{ stylers: [{ hue: this.settings.overlay_color }, { lightness: 2 * this.settings.overlay_color_hsl.lum - 100 }, { saturation: 2 * this.settings.overlay_color_hsl.sat - 100 }] }, { featureType: "road", elementType: "geometry", stylers: [{ visibility: "simplified" }] }, { featureType: "road", elementType: "labels" }], this.map.setOptions({ styles: s })), t = google.maps.event.addListener(this.map, "bounds_changed", function() {
                var e = new google.maps.LatLng(n.settings.addresses[0].latitude, n.settings.addresses[0].longitude);
                n.map.setZoom(n.settings.zoom), n.map.setCenter(e), google.maps.event.removeListener(t)
            }), this.next_geocode_request()
        },
        geocode_address: function(e, s) {
            var t, o, n, i, a, d = this,
                r = !0;
            "object" == typeof e && !1 === e.cache ? (r = !1, o = !0 === e.coordinates ? { latLng: t = new google.maps.LatLng(e.latitude, e.longitude) } : { address: e.address }, this.geocoder.geocode(o, function(o, n) {
                var i, a, l, g;
                n === google.maps.GeocoderStatus.OK ? (!0 === e.coordinates ? (l = t, i = jQuery.trim(e.latitude), a = jQuery.trim(e.longitude)) : (i = (l = o[0].geometry.location).lat(), a = l.lng()), d.settings.addresses[s].latitude = i, d.settings.addresses[s].longitude = a, !0 === e.coordinates && "" === e.infobox_content && (e.geocoded_address = o[0].formatted_address), 1 !== d.next_address && "1" !== d.next_address && !0 !== d.next_address || e.coordinates || d.map.setCenter(l), d.settings.address_pin && d.create_marker(e, i, a, s), 0 !== d.next_address && "0" !== d.next_address && !1 !== d.next_address || d.map.setCenter(l)) : n === google.maps.GeocoderStatus.OVER_QUERY_LIMIT && (d.next_address--, d.settings.delay++), !1 === r && !1 === d.query_sent && d.last_cache_index === s && "undefined" != typeof fusionMapNonce && (g = { action: "fusion_cache_map", addresses: d.settings.addresses, security: fusionMapNonce }, jQuery.post(fusionMapsVars.admin_ajax, g), d.query_sent = !0), d.next_geocode_request()
            })) : "object" == typeof e && !0 === e.cache && (n = jQuery.trim(e.latitude), i = jQuery.trim(e.longitude), a = new google.maps.LatLng(n, i), !0 === e.coordinates && "" === e.infobox_content && (e.geocoded_address = e.geocoded_address), d.settings.address_pin && d.create_marker(e, n, i, s), 0 !== d.next_address && "0" !== d.next_address && !1 !== d.next_address || d.map.setCenter(a), d.next_geocode_request())
        },
        create_marker: function(e, s, t, o) {
            var n, i, a = { position: new google.maps.LatLng(s, t), map: this.map };
            this.bounds.extend(a.position), e.infobox_content ? n = e.infobox_content : (n = e.address, !0 === e.coordinates && e.geocoded_address && (n = e.geocoded_address)), this.settings.animations && (a.animation = google.maps.Animation.DROP), "custom" === this.settings.map_style && "theme" === this.settings.marker_icon ? a.icon = new google.maps.MarkerImage(e.marker, null, null, null, new google.maps.Size(37, 55)) : "custom" === this.settings.map_style && e.marker && (a.icon = e.marker), i = new google.maps.Marker(a), this.markers.push(i), this.create_infowindow(n, i), o + 1 >= this.settings.addresses.length && this.map.setCenter(this.bounds.getCenter()), this.map.setZoom(this.settings.zoom)
        },
        create_infowindow: function(e, s) {
            var o, n, i, a, d = { anchor: s, shouldFocus: !1 },
                r = this;
            "custom" === this.settings.infobox_styling && "custom" === this.settings.map_style ? (a = { content: i = t.createElement("div"), disableAutoPan: !0, maxWidth: 150, pixelOffset: new google.maps.Size(-125, 10), zIndex: null, boxStyle: { background: "none", opacity: 1, width: "250px" }, closeBoxMargin: "2px 2px 2px 2px", closeBoxURL: "//www.google.com/intl/en_us/mapfiles/close.gif", infoBoxClearance: new google.maps.Size(1, 1) }, i.className = "fusion-info-box", i.style.cssText = "background-color:" + this.settings.infobox_background_color + ";color:" + this.settings.infobox_text_color + ";", i.innerHTML = e, n = new InfoBox(a), this.settings.show_address && n.open(this.map, s), google.maps.event.addListener(s, "click", function() {
                var e = n.getMap();
                null === e || void 0 === e ? n.open(r.map, this) : n.close()
            })) : (o = new google.maps.InfoWindow({ disableAutoPan: !0, content: e }), this.settings.show_address && (o.show = !0, o.open(d)), google.maps.event.addListener(s, "click", function() {
                var e = o.getMap();
                null === e || void 0 === e ? o.open(r.map, this) : o.close()
            }))
        },
        next_geocode_request: function() {
            var e = this;
            e.next_address < e.settings.addresses.length && setTimeout(function() { e.geocode_address(e.settings.addresses[e.next_address], e.next_address), e.next_address++ }, e.settings.delay)
        }
    }), e.fn[n] = function(s) { return this.each(function() { e.data(this, "plugin_" + n) || e.data(this, "plugin_" + n, new a(this, s)) }), this }
}(jQuery, window, document);
var fusionLightboxVideoVars = { "lightbox_video_width": "1280", "lightbox_video_height": "720" };
! function($, window, undefined) {
    var extensions = { flash: ["swf"], image: ["bmp", "gif", "jpeg", "jpg", "png", "tiff", "tif", "jfif", "jpe", "webp"], iframe: ["asp", "aspx", "cgi", "cfm", "htm", "html", "jsp", "php", "pl", "php3", "php4", "php5", "phtml", "rb", "rhtml", "shtml", "txt"], video: ["avi", "mov", "mpg", "mpeg", "movie", "mp4", "webm", "ogv", "ogg", "3gp", "m4v"] },
        $win = $(window),
        $doc = $(document),
        browser, transform, gpuAcceleration, fullScreenApi = "",
        userAgent = navigator.userAgent || navigator.vendor || window.opera,
        supportTouch = "ontouchstart" in window || navigator.msMaxTouchPoints,
        isMobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(userAgent.substr(0, 4)),
        clickEvent = supportTouch ? "click itap" : "click",
        touchStartEvent = supportTouch ? "mousedown.iLightBox touchstart.iLightBox" : "mousedown.iLightBox",
        touchStopEvent = supportTouch ? "mouseup.iLightBox touchend.iLightBox" : "mouseup.iLightBox",
        touchMoveEvent = supportTouch ? "mousemove.iLightBox touchmove.iLightBox" : "mousemove.iLightBox",
        abs = Math.abs,
        sqrt = Math.sqrt,
        round = Math.round,
        max = Math.max,
        min = Math.min,
        floor = Math.floor,
        random = Math.random,
        pluginspages = { quicktime: "http://www.apple.com/quicktime/download", flash: "http://www.adobe.com/go/getflash" },
        iLightBox = function(e, t, o, i) {
            var n = this;
            if (n.options = t, n.selector = e.selector || e, n.context = e.context, n.instant = i, o.length < 1 ? n.attachItems() : n.items = o, n.vars = { total: n.items.length, start: 0, current: null, next: null, prev: null, BODY: $("body"), loadRequests: 0, overlay: $('<div class="ilightbox-overlay"></div>'), loader: $('<div class="ilightbox-loader"><div></div></div>'), toolbar: $('<div class="ilightbox-toolbar"></div>'), innerToolbar: $('<div class="ilightbox-inner-toolbar"></div>'), title: $('<div class="ilightbox-title"></div>'), closeButton: $('<a class="ilightbox-close" role="button" title="' + n.options.text.close + '"></a>'), fullScreenButton: $('<a class="ilightbox-fullscreen" role="button" title="' + n.options.text.enterFullscreen + '"></a>'), innerPlayButton: $('<a class="ilightbox-play" role="button" title="' + n.options.text.slideShow + '"></a>'), innerNextButton: $('<a class="ilightbox-next-button" role="button" title="' + n.options.text.next + '"></a>'), innerPrevButton: $('<a class="ilightbox-prev-button" role="button" title="' + n.options.text.previous + '"></a>'), holder: $('<div class="ilightbox-holder' + (supportTouch ? " supportTouch" : "") + '" ondragstart="return false;"><div class="ilightbox-container"></div></div>'), nextPhoto: $('<div class="ilightbox-holder' + (supportTouch ? " supportTouch" : "") + ' ilightbox-next" ondragstart="return false;"><div class="ilightbox-container"></div></div>'), prevPhoto: $('<div class="ilightbox-holder' + (supportTouch ? " supportTouch" : "") + ' ilightbox-prev" ondragstart="return false;"><div class="ilightbox-container"></div></div>'), nextButton: $('<a class="ilightbox-button ilightbox-next-button" role="button" ondragstart="return false;" title="' + n.options.text.next + '"><span></span></a>'), prevButton: $('<a class="ilightbox-button ilightbox-prev-button" role="button" ondragstart="return false;" title="' + n.options.text.previous + '"><span></span></a>'), thumbnails: $('<div class="ilightbox-thumbnails" ondragstart="return false;"><div class="ilightbox-thumbnails-container"><a class="ilightbox-thumbnails-dragger"></a><div class="ilightbox-thumbnails-grid"></div></div></div>'), thumbs: !1, nextLock: !1, prevLock: !1, hashLock: !1, isMobile: !1, mobileMaxWidth: 980, isInFullScreen: !1, isSwipe: !1, mouseID: 0, cycleID: 0, isPaused: 0 }, n.vars.hideableElements = n.vars.nextButton.add(n.vars.prevButton), n.normalizeItems(), n.availPlugins(), n.options.startFrom = n.options.startFrom > 0 && n.options.startFrom >= n.vars.total ? n.vars.total - 1 : n.options.startFrom, n.options.startFrom = n.options.randomStart ? floor(random() * n.vars.total) : n.options.startFrom, n.vars.start = n.options.startFrom, i ? n.instantCall() : n.patchItemsEvents(), n.options.linkId && (n.hashChangeHandler(), $win.iLightBoxHashChange(function() { n.hashChangeHandler() })), supportTouch) {
                var a = /(click|mouseenter|mouseleave|mouseover|mouseout)/gi;
                n.options.caption.show = n.options.caption.show.replace(a, "itap"), n.options.caption.hide = n.options.caption.hide.replace(a, "itap"), n.options.social.show = n.options.social.show.replace(a, "itap"), n.options.social.hide = n.options.social.hide.replace(a, "itap")
            }
            n.options.controls.arrows && $.extend(n.options.styles, { nextOffsetX: 0, prevOffsetX: 0, nextOpacity: 0, prevOpacity: 0 })
        };

    function getPixel(e, t) { return parseInt(e.css(t), 10) || 0 }

    function within(e, t, o) { return e < t ? t : e > o ? o : e }

    function getViewport() {
        var e = window,
            t = "inner";
        return "innerWidth" in window || (t = "client", e = document.documentElement || document.body), { width: e[t + "Width"], height: e[t + "Height"] }
    }

    function removeHash() {
        var e = getScrollXY();
        window.location.hash = "", window.scrollTo(e.x, e.y)
    }

    function doAjax(e, t) {
        e = "//ilightbox.net/getSource/jsonp.php?url=" + encodeURIComponent(e).replace(/!/g, "%21").replace(/'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/\*/g, "%2A");
        $.ajax({ url: e, dataType: "jsonp" }), iLCallback = function(e) { t.call(this, e) }
    }

    function findImageInElement(e) {
        var t = $("*", e),
            o = new Array;
        return t.each(function() {
            var e = "";
            if ("none" != $(this).css("background-image") ? e = $(this).css("background-image") : void 0 !== $(this).attr("src") && "img" == this.nodeName.toLowerCase() && (e = $(this).attr("src")), -1 == e.indexOf("gradient"))
                for (var t = (e = (e = (e = (e = e.replace(/url\(\"/g, "")).replace(/url\(/g, "")).replace(/\"\)/g, "")).replace(/\)/g, "")).split(","), i = 0; i < t.length; i++)
                    if (t[i].length > 0 && -1 == $.inArray(t[i], o)) {
                        var n = "";
                        browser.msie && browser.version < 9 && (n = "?" + floor(3e3 * random())), o.push(t[i] + n)
                    }
        }), o
    }

    function getExtension(e) {
        var t = e.split(".").pop().toLowerCase(),
            o = -1 !== t.indexOf("?") ? "?" + t.split("?").pop() : "";
        return t.replace(o, "")
    }

    function getTypeByExtension(e) { var t = getExtension(e); return -1 !== extensions.image.indexOf(t) ? "image" : -1 !== extensions.flash.indexOf(t) ? "flash" : -1 !== extensions.video.indexOf(t) ? "video" : "iframe" }

    function percentToValue(e, t) { return parseInt(t / 100 * e) }

    function parseURI(e) { var t = String(e).replace(/^\s+|\s+$/g, "").match(/^([^:\/?#]+:)?(\/\/(?:[^:@]*(?::[^:@]*)?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/); return t ? { href: t[0] || "", protocol: t[1] || "", authority: t[2] || "", host: t[3] || "", hostname: t[4] || "", port: t[5] || "", pathname: t[6] || "", search: t[7] || "", hash: t[8] || "" } : null }

    function absolutizeURI(e, t) { var o, i; return t = parseURI(t || ""), e = parseURI(e || ""), t && e ? (t.protocol || e.protocol) + (t.protocol || t.authority ? t.authority : e.authority) + (o = t.protocol || t.authority || "/" === t.pathname.charAt(0) ? t.pathname : t.pathname ? (e.authority && !e.pathname ? "/" : "") + e.pathname.slice(0, e.pathname.lastIndexOf("/") + 1) + t.pathname : e.pathname, i = [], o.replace(/^(\.\.?(\/|$))+/, "").replace(/\/(\.(\/|$))+/g, "/").replace(/\/\.\.$/, "/../").replace(/\/?[^\/]*/g, function(e) { "/.." === e ? i.pop() : i.push(e) }), i.join("").replace(/^\//, "/" === o.charAt(0) ? "/" : "")) + (t.protocol || t.authority || t.pathname ? t.search : t.search || e.search) + t.hash : null }

    function version_compare(e, t, o) {
        this.php_js = this.php_js || {}, this.php_js.ENV = this.php_js.ENV || {};
        var i, n = 0,
            a = 0,
            r = { dev: -6, alpha: -5, a: -5, beta: -4, b: -4, RC: -3, rc: -3, "#": -2, p: 1, pl: 1 },
            s = function(e) { return (e = (e = ("" + e).replace(/[_\-+]/g, ".")).replace(/([^.\d]+)/g, ".$1.").replace(/\.{2,}/g, ".")).length ? e.split(".") : [-8] },
            l = function(e) { return e ? isNaN(e) ? r[e] || -7 : parseInt(e, 10) : 0 };
        for (e = s(e), t = s(t), i = max(e.length, t.length), n = 0; n < i; n++)
            if (e[n] != t[n]) { if (e[n] = l(e[n]), t[n] = l(t[n]), e[n] < t[n]) { a = -1; break } if (e[n] > t[n]) { a = 1; break } }
        if (!o) return a;
        switch (o) {
            case ">":
            case "gt":
                return a > 0;
            case ">=":
            case "ge":
                return a >= 0;
            case "<=":
            case "le":
                return a <= 0;
            case "==":
            case "=":
            case "eq":
                return 0 === a;
            case "<>":
            case "!=":
            case "ne":
                return 0 !== a;
            case "":
            case "<":
            case "lt":
                return a < 0;
            default:
                return null
        }
    }

    function getScrollXY() {
        var e = 0,
            t = 0;
        return "number" == typeof window.pageYOffset ? (t = window.pageYOffset, e = window.pageXOffset) : document.body && (document.body.scrollLeft || document.body.scrollTop) ? (t = document.body.scrollTop, e = document.body.scrollLeft) : document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop) && (t = document.documentElement.scrollTop, e = document.documentElement.scrollLeft), { x: e, y: t }
    }
    iLightBox.prototype = {
            showLoader: function() {
                var e = this;
                e.vars.loadRequests += 1, "horizontal" == e.options.path.toLowerCase() ? e.vars.loader.addClass("ilightbox-show").stop().animate({ top: "-30px" }, e.options.show.speed, "easeOutCirc") : e.vars.loader.addClass("ilightbox-show").stop().animate({ left: "-30px" }, e.options.show.speed, "easeOutCirc")
            },
            hideLoader: function() {
                var e = this;
                e.vars.loadRequests -= 1, e.vars.loadRequests = e.vars.loadRequests < 0 ? 0 : e.vars.loadRequests, "horizontal" == e.options.path.toLowerCase() ? e.vars.loadRequests <= 0 && e.vars.loader.removeClass("ilightbox-show").stop().animate({ top: "-192px" }, e.options.show.speed, "easeInCirc") : e.vars.loadRequests <= 0 && e.vars.loader.removeClass("ilightbox-show").stop().animate({ left: "-192px" }, e.options.show.speed, "easeInCirc")
            },
            createUI: function() {
                var e = this;
                e.ui = { currentElement: e.vars.holder, nextElement: e.vars.nextPhoto, prevElement: e.vars.prevPhoto, currentItem: e.vars.current, nextItem: e.vars.next, prevItem: e.vars.prev, hide: function() { e.closeAction() }, refresh: function() { arguments.length > 0 ? e.repositionPhoto(!0) : e.repositionPhoto() }, fullscreen: function() { e.fullScreenAction() } }
            },
            attachItems: function() {
                var iL = this,
                    itemsObject = new Array,
                    items = new Array;
                $(iL.selector, iL.context).each(function() {
                    var t = $(this),
                        URL = t.attr(iL.options.attr) || null,
                        options = t.data("options") && eval("({" + t.data("options") + "})") || {},
                        caption = t.data("caption"),
                        title = t.data("title"),
                        type = t.data("type") || getTypeByExtension(URL);
                    items.push({ URL: URL, caption: caption, title: title, type: type, options: options }), iL.instant || itemsObject.push(t)
                }), iL.items = items, iL.itemsObject = itemsObject, iL.vars && (iL.vars.total = items.length)
            },
            normalizeItems: function() {
                var e = this,
                    t = new Array;
                $.each(e.items, function(o, i) {
                    "string" == typeof i && (i = { url: i });
                    var n = i.url || i.URL || null,
                        a = i.options || {},
                        r = i.caption || null,
                        s = i.title || null,
                        l = i.type ? i.type.toLowerCase() : getTypeByExtension(n),
                        c = "object" != typeof n ? getExtension(n) : "";
                    if (a.thumbnail = a.thumbnail || ("image" == l ? n : null), a.videoType = a.videoType || null, a.skin = a.skin || e.options.skin, a.width = a.width || null, a.height = a.height || null, a.mousewheel = void 0 === a.mousewheel || a.mousewheel, a.swipe = void 0 === a.swipe || a.swipe, a.social = void 0 !== a.social ? a.social : e.options.social.buttons && $.extend({}, {}, e.options.social.buttons), "video" == l && (a.html5video = void 0 !== a.html5video ? a.html5video : {}, a.html5video.webm = a.html5video.webm || a.html5video.WEBM || null, a.html5video.controls = void 0 !== a.html5video.controls ? a.html5video.controls : "controls", a.html5video.preload = a.html5video.preload || "metadata", a.html5video.autoplay = void 0 !== a.html5video.autoplay && a.html5video.autoplay), "iframe" === l)
                        if (-1 !== n.indexOf("youtube.com")) {
                            var u = n.match(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/);
                            u && 11 === u[7].length && (a.thumbnail = "//img.youtube.com/vi/" + u[7] + "/mqdefault.jpg")
                        } else if (-1 !== n.indexOf("vimeo.com") && -1 === n.indexOf("preview=0")) {
                        var h = n.split(/[?#]/)[0];
                        h.replace(/[^\d]/g, "");
                        $.getJSON("https://vimeo.com/api/oembed.json?url=" + h, { format: "json" }, function(e) { a.thumbnail = e.thumbnail_url })
                    }
                    a.width && a.height || "video" !== l && "iframe" !== l && "flash" !== l || (a.width = parseInt(fusionLightboxVideoVars.lightbox_video_width), a.height = parseInt(fusionLightboxVideoVars.lightbox_video_height)), delete i.url, i.index = o, i.URL = n, i.caption = r, i.title = s, i.type = l, i.options = a, i.ext = c, t.push(i)
                }), e.items = t
            },
            instantCall: function() {
                var e = this,
                    t = e.vars.start;
                e.vars.current = t, e.vars.next = e.items[t + 1] ? t + 1 : null, e.vars.prev = e.items[t - 1] ? t - 1 : null, e.addContents(), e.patchEvents()
            },
            addContents: function() {
                var e = this,
                    t = e.vars,
                    o = e.options,
                    i = getViewport(),
                    n = o.path.toLowerCase(),
                    a = t.total > 0 && e.items.filter(function(e, t, i) { return -1 === ["image", "flash", "video"].indexOf(e.type) && void 0 === e.recognized && (o.smartRecognition || e.options.smartRecognition) }),
                    r = a.length > 0;
                o.mobileOptimizer && !o.innerToolbar && (t.isMobile = i.width <= t.mobileMaxWidth), t.overlay.addClass(o.skin).hide().css("opacity", o.overlay.opacity), o.linkId && t.overlay[0].setAttribute("linkid", o.linkId), o.controls.toolbar && (t.toolbar.addClass(o.skin).append(t.closeButton), o.controls.fullscreen && t.toolbar.append(t.fullScreenButton), o.controls.slideshow && t.toolbar.append(t.innerPlayButton), t.total > 1 && t.toolbar.append(t.innerPrevButton).append(t.innerNextButton)), t.BODY.addClass("ilightbox-noscroll").append(t.overlay).append(t.loader).append(t.holder).append(t.nextPhoto).append(t.prevPhoto), o.innerToolbar || t.BODY.append(t.toolbar), o.controls.arrows && t.BODY.append(t.nextButton).append(t.prevButton), o.controls.thumbnail && t.total > 1 && (t.BODY.append(t.thumbnails), t.thumbnails.addClass(o.skin).addClass("ilightbox-" + n), $("div.ilightbox-thumbnails-grid", t.thumbnails).empty(), t.thumbs = !0);
                var s = "horizontal" == o.path.toLowerCase() ? { left: parseInt(i.width / 2 - t.loader.outerWidth() / 2) } : { top: parseInt(i.height / 2 - t.loader.outerHeight() / 2) };
                t.loader.addClass(o.skin).css(s), t.nextButton.add(t.prevButton).addClass(o.skin), "horizontal" == n && t.loader.add(t.nextButton).add(t.prevButton).addClass("horizontal"), t.BODY[t.isMobile ? "addClass" : "removeClass"]("isMobile"), o.infinite || (t.prevButton.add(t.prevButton).add(t.innerPrevButton).add(t.innerNextButton).removeClass("disabled"), 0 == t.current && t.prevButton.add(t.innerPrevButton).addClass("disabled"), t.current >= t.total - 1 && t.nextButton.add(t.innerNextButton).addClass("disabled")), o.show.effect ? (t.overlay.stop().fadeIn(o.show.speed), t.toolbar.stop().fadeIn(o.show.speed)) : (t.overlay.show(), t.toolbar.show());
                var l = a.length;
                r ? (e.showLoader(), $.each(a, function(i, n) {
                    e.ogpRecognition(this, function(i) {
                        var n = -1,
                            a = (e.items.filter(function(e, t, o) { return e.URL == i.url && (n = t), e.URL == i.url }), e.items[n]);
                        i && $.extend(!0, a, { URL: i.source, type: i.type, recognized: !0, options: { html5video: i.html5video, width: "image" == i.type ? 0 : i.width || a.width, height: "image" == i.type ? 0 : i.height || a.height, thumbnail: a.options.thumbnail || i.thumbnail } }), 0 == --l && (e.hideLoader(), t.dontGenerateThumbs = !1, e.generateThumbnails(), o.show.effect ? setTimeout(function() { e.generateBoxes() }, o.show.speed) : e.generateBoxes())
                    })
                })) : o.show.effect ? setTimeout(function() { e.generateBoxes() }, o.show.speed) : e.generateBoxes(), e.createUI(), window.iLightBox = { close: function() { e.closeAction() }, fullscreen: function() { e.fullScreenAction() }, moveNext: function() { e.moveTo("next") }, movePrev: function() { e.moveTo("prev") }, goTo: function(t) { e.goTo(t) }, refresh: function() { e.refresh() }, reposition: function() { arguments.length > 0 ? e.repositionPhoto(!0) : e.repositionPhoto() }, setOption: function(t) { e.setOption(t) }, destroy: function() { e.closeAction(), e.dispatchItemsEvents() } }, o.linkId && (t.hashLock = !0, window.location.hash = o.linkId + "/" + t.current, setTimeout(function() { t.hashLock = !1 }, 55)), o.slideshow.startPaused || (e.resume(), t.innerPlayButton.removeClass("ilightbox-play").addClass("ilightbox-pause")), "function" == typeof e.options.callback.onOpen && e.options.callback.onOpen.call(e)
            },
            loadContent: function(e, t, o) {
                var i, n, a = this;
                switch (a.createUI(), e.speed = o || a.options.effects.loadedFadeSpeed, "current" == t && (e.options.mousewheel ? a.vars.lockWheel = !1 : a.vars.lockWheel = !0, e.options.swipe ? a.vars.lockSwipe = !1 : a.vars.lockSwipe = !0), t) {
                    case "current":
                        i = a.vars.holder, n = a.vars.current;
                        break;
                    case "next":
                        i = a.vars.nextPhoto, n = a.vars.next;
                        break;
                    case "prev":
                        i = a.vars.prevPhoto, n = a.vars.prev
                }
                if (i.removeAttr("style class").addClass("ilightbox-holder" + (supportTouch ? " supportTouch" : "")).addClass(e.options.skin), $("div.ilightbox-inner-toolbar", i).remove(), e.title || a.options.innerToolbar) {
                    var r = a.vars.innerToolbar.clone();
                    if (e.title && a.options.show.title) {
                        var s = a.vars.title.clone();
                        s.empty().html(e.title), r.append(s)
                    }
                    a.options.innerToolbar && r.append(a.vars.total > 1 ? a.vars.toolbar.clone() : a.vars.toolbar), i.prepend(r)
                }
                a.loadSwitcher(e, i, n, t)
            },
            loadSwitcher: function(e, t, o, i) {
                var n = this,
                    a = n.options,
                    r = { element: t, position: o };
                switch (e.type) {
                    case "image":
                        "function" == typeof a.callback.onBeforeLoad && a.callback.onBeforeLoad.call(n, n.ui, o), "function" == typeof e.options.onBeforeLoad && e.options.onBeforeLoad.call(n, r), n.loadImage(e.URL, function(s) {
                            "function" == typeof a.callback.onAfterLoad && a.callback.onAfterLoad.call(n, n.ui, o), "function" == typeof e.options.onAfterLoad && e.options.onAfterLoad.call(n, r);
                            var l = s ? s.width : 400,
                                c = s ? s.height : 200;
                            t.data({ naturalWidth: l, naturalHeight: c }), $("div.ilightbox-container", t).empty().append(s ? '<img src="' + e.URL + '" class="ilightbox-image" />' : '<span class="ilightbox-alert">' + a.errors.loadImage + "</span>"), "function" == typeof a.callback.onRender && a.callback.onRender.call(n, n.ui, o), "function" == typeof e.options.onRender && e.options.onRender.call(n, r), n.configureHolder(e, i, t)
                        });
                        break;
                    case "video":
                        t.data({ naturalWidth: e.options.width, naturalHeight: e.options.height }), n.addContent(t, e), "function" == typeof a.callback.onRender && a.callback.onRender.call(n, n.ui, o), "function" == typeof e.options.onRender && e.options.onRender.call(n, r), n.configureHolder(e, i, t);
                        break;
                    case "iframe":
                        for (var s = e.URL.substring(e.URL.indexOf("?") + 1).split("&"), l = {}, c = 0; c < s.length; ++c) {
                            var u = s[c].split("=");
                            2 == u.length && ("w" == u[0] && (u[0] = "width"), "h" == u[0] && (u[0] = "height"), l[u[0]] = decodeURIComponent(u[1].replace(/\+/g, " ")))
                        }
                        n.showLoader(), t.data({ naturalWidth: e.options.width, naturalHeight: e.options.height });
                        var h = n.addContent(t, e);
                        "function" == typeof a.callback.onRender && a.callback.onRender.call(n, n.ui, o), "function" == typeof e.options.onRender && e.options.onRender.call(n, r), "function" == typeof a.callback.onBeforeLoad && a.callback.onBeforeLoad.call(n, n.ui, o), "function" == typeof e.options.onBeforeLoad && e.options.onBeforeLoad.call(n, r), n.configureHolder(e, i, t), h.on("load", function() { "function" == typeof a.callback.onAfterLoad && a.callback.onAfterLoad.call(n, n.ui, o), "function" == typeof e.options.onAfterLoad && e.options.onAfterLoad.call(n, r), n.hideLoader(), h.off("load") });
                        break;
                    case "inline":
                        h = $(e.URL);
                        var d = n.addContent(t, e),
                            p = findImageInElement(t);
                        t.data({ naturalWidth: n.items[o].options.width || h.outerWidth(), naturalHeight: n.items[o].options.height || h.outerHeight() }), d.children().eq(0).show(), "function" == typeof a.callback.onRender && a.callback.onRender.call(n, n.ui, o), "function" == typeof e.options.onRender && e.options.onRender.call(n, r), "function" == typeof a.callback.onBeforeLoad && a.callback.onBeforeLoad.call(n, n.ui, o), "function" == typeof e.options.onBeforeLoad && e.options.onBeforeLoad.call(n, r), n.loadImage(p, function() { "function" == typeof a.callback.onAfterLoad && a.callback.onAfterLoad.call(n, n.ui, o), "function" == typeof e.options.onAfterLoad && e.options.onAfterLoad.call(n, r), n.configureHolder(e, i, t) });
                        break;
                    case "flash":
                        h = n.addContent(t, e);
                        t.data({ naturalWidth: n.items[o].options.width || h.outerWidth(), naturalHeight: n.items[o].options.height || h.outerHeight() }), "function" == typeof a.callback.onRender && a.callback.onRender.call(n, n.ui, o), "function" == typeof e.options.onRender && e.options.onRender.call(n, r), n.configureHolder(e, i, t);
                        break;
                    case "ajax":
                        var f = e.options.ajax || {};
                        "function" == typeof a.callback.onBeforeLoad && a.callback.onBeforeLoad.call(n, n.ui, o), "function" == typeof e.options.onBeforeLoad && e.options.onBeforeLoad.call(n, r), n.showLoader(), $.ajax({ url: e.URL || a.ajaxSetup.url, data: f.data || null, dataType: f.dataType || "html", type: f.type || a.ajaxSetup.type, cache: f.cache || a.ajaxSetup.cache, crossDomain: f.crossDomain || a.ajaxSetup.crossDomain, global: f.global || a.ajaxSetup.global, ifModified: f.ifModified || a.ajaxSetup.ifModified, username: f.username || a.ajaxSetup.username, password: f.password || a.ajaxSetup.password, beforeSend: f.beforeSend || a.ajaxSetup.beforeSend, complete: f.complete || a.ajaxSetup.complete }).done(function(s, l, c) {
                            n.hideLoader();
                            var u = $(s),
                                h = $("div.ilightbox-container", t),
                                d = n.items[o].options.width || parseInt(u[0].getAttribute("width")),
                                p = n.items[o].options.height || parseInt(u[0].getAttribute("height")),
                                g = u[0].getAttribute("width") && u[0].getAttribute("height") ? { overflow: "hidden" } : {};
                            h.empty().append($('<div class="ilightbox-wrapper"></div>').css(g).html(u)), t.show().data({ naturalWidth: d || h.outerWidth(), naturalHeight: p || h.outerHeight() }).hide(), "function" == typeof a.callback.onRender && a.callback.onRender.call(n, n.ui, o), "function" == typeof e.options.onRender && e.options.onRender.call(n, r);
                            var m = findImageInElement(t);
                            n.loadImage(m, function() { "function" == typeof a.callback.onAfterLoad && a.callback.onAfterLoad.call(n, n.ui, o), "function" == typeof e.options.onAfterLoad && e.options.onAfterLoad.call(n, r), n.configureHolder(e, i, t) }), a.ajaxSetup.success(s, l, c), "function" == typeof f.success && f.success(s, l, c)
                        }).fail(function(s, l, c) { "function" == typeof a.callback.onAfterLoad && a.callback.onAfterLoad.call(n, n.ui, o), "function" == typeof e.options.onAfterLoad && e.options.onAfterLoad.call(n, r), n.hideLoader(), $("div.ilightbox-container", t).empty().append('<span class="ilightbox-alert">' + a.errors.loadContents + "</span>"), n.configureHolder(e, i, t), a.ajaxSetup.error(s, l, c), "function" == typeof f.error && f.error(s, l, c) });
                        break;
                    case "html":
                        var g = e.URL;
                        if (container = $("div.ilightbox-container", t), g[0].nodeName) h = g.clone();
                        else {
                            var m = $(g);
                            h = m.selector ? $("<div>" + m + "</div>") : m
                        }
                        var v = n.items[o].options.width || parseInt(h.attr("width")),
                            b = n.items[o].options.height || parseInt(h.attr("height"));
                        n.addContent(t, e), h.appendTo(document.documentElement).hide(), "function" == typeof a.callback.onRender && a.callback.onRender.call(n, n.ui, o), "function" == typeof e.options.onRender && e.options.onRender.call(n, r);
                        p = findImageInElement(t);
                        "function" == typeof a.callback.onBeforeLoad && a.callback.onBeforeLoad.call(n, n.ui, o), "function" == typeof e.options.onBeforeLoad && e.options.onBeforeLoad.call(n, r), n.loadImage(p, function() { "function" == typeof a.callback.onAfterLoad && a.callback.onAfterLoad.call(n, n.ui, o), "function" == typeof e.options.onAfterLoad && e.options.onAfterLoad.call(n, r), t.show().data({ naturalWidth: v || container.outerWidth(), naturalHeight: b || container.outerHeight() }).hide(), h.remove(), n.configureHolder(e, i, t) })
                }
            },
            configureHolder: function(e, t, o) {
                var i = this,
                    n = i.vars,
                    a = i.options;
                if ("current" != t && ("next" == t ? o.addClass("ilightbox-next") : o.addClass("ilightbox-prev")), "current" == t) var r = n.current;
                else if ("next" == t) {
                    var s = a.styles.nextOpacity;
                    r = n.next
                } else s = a.styles.prevOpacity, r = n.prev;
                var l = { element: o, position: r };
                i.items[r].options.width = i.items[r].options.width || 0, i.items[r].options.height = i.items[r].options.height || 0, "current" == t ? a.show.effect ? o.css(transform, gpuAcceleration).fadeIn(e.speed, function() {
                    if (o.css(transform, ""), e.caption) {
                        i.setCaption(e, o);
                        var t = $("div.ilightbox-caption", o),
                            n = parseInt(t.outerHeight() / o.outerHeight() * 100);
                        a.caption.start & n <= 50 && t.fadeIn(a.effects.fadeSpeed)
                    }
                    var s = e.options.social;
                    s && (i.setSocial(s, e.URL, o), a.social.start && $("div.ilightbox-social", o).fadeIn(a.effects.fadeSpeed)), i.generateThumbnails(), "function" == typeof a.callback.onShow && a.callback.onShow.call(i, i.ui, r), "function" == typeof e.options.onShow && e.options.onShow.call(i, l)
                }) : (o.show(), i.generateThumbnails(), "function" == typeof a.callback.onShow && a.callback.onShow.call(i, i.ui, r), "function" == typeof e.options.onShow && e.options.onShow.call(i, l)) : a.show.effect ? o.fadeTo(e.speed, s, function() { "next" == t ? n.nextLock = !1 : n.prevLock = !1, i.generateThumbnails(), "function" == typeof a.callback.onShow && a.callback.onShow.call(i, i.ui, r), "function" == typeof e.options.onShow && e.options.onShow.call(i, l) }) : (o.css({ opacity: s }).show(), "next" == t ? n.nextLock = !1 : n.prevLock = !1, i.generateThumbnails(), "function" == typeof a.callback.onShow && a.callback.onShow.call(i, i.ui, r), "function" == typeof e.options.onShow && e.options.onShow.call(i, l)), setTimeout(function() { i.repositionPhoto() }, 0)
            },
            generateBoxes: function() {
                var e = this,
                    t = e.vars,
                    o = e.options;
                o.infinite && t.total >= 3 ? (t.current == t.total - 1 && (t.next = 0), 0 == t.current && (t.prev = t.total - 1)) : o.infinite = !1, e.loadContent(e.items[t.current], "current", o.show.speed), e.items[t.next] && e.loadContent(e.items[t.next], "next", o.show.speed), e.items[t.prev] && e.loadContent(e.items[t.prev], "prev", o.show.speed)
            },
            generateThumbnails: function() {
                var e = this,
                    t = e.vars,
                    o = e.options,
                    i = null;
                if (t.thumbs && !e.vars.dontGenerateThumbs) {
                    var n = t.thumbnails,
                        a = $("div.ilightbox-thumbnails-container", n),
                        r = $("div.ilightbox-thumbnails-grid", a),
                        s = 0;
                    r.removeAttr("style").empty(), $.each(e.items, function(l, c) {
                        var u = t.current == l ? "ilightbox-active" : "",
                            h = t.current == l ? o.thumbnails.activeOpacity : o.thumbnails.normalOpacity,
                            d = c.options.thumbnail,
                            p = $('<div class="ilightbox-thumbnail"></div>'),
                            f = $('<div class="ilightbox-thumbnail-icon"></div>');
                        p.css({ opacity: 0 }).addClass(u), "video" != c.type && "flash" != c.type || void 0 !== c.options.icon ? c.options.icon && (f.addClass("ilightbox-thumbnail-" + c.options.icon), p.append(f)) : (f.addClass("ilightbox-thumbnail-video"), p.append(f)), d && e.loadImage(d, function(t) { s++, t ? p.data({ naturalWidth: t.width, naturalHeight: t.height }).append('<img src="' + d + '" border="0" />') : p.data({ naturalWidth: o.thumbnails.maxWidth, naturalHeight: o.thumbnails.maxHeight }), clearTimeout(i), i = setTimeout(function() { e.positionThumbnails(n, a, r) }, 20), setTimeout(function() { p.fadeTo(o.effects.loadedFadeSpeed, h) }, 20 * s) }), r.append(p)
                    }), e.vars.dontGenerateThumbs = !0
                }
            },
            positionThumbnails: function(e, t, o) {
                var i = this,
                    n = i.vars,
                    a = i.options,
                    r = getViewport(),
                    s = a.path.toLowerCase();
                e || (e = n.thumbnails), t || (t = $("div.ilightbox-thumbnails-container", e)), o || (o = $("div.ilightbox-thumbnails-grid", t));
                var l = $(".ilightbox-thumbnail", o),
                    c = "horizontal" == s ? r.width - a.styles.pageOffsetX : l.eq(0).outerWidth() - a.styles.pageOffsetX,
                    u = "horizontal" == s ? l.eq(0).outerHeight() - a.styles.pageOffsetY : r.height - a.styles.pageOffsetY,
                    h = "horizontal" == s ? 0 : c,
                    d = "horizontal" == s ? u : 0,
                    p = $(".ilightbox-active", o),
                    f = {};
                arguments.length < 3 && (l.css({ opacity: a.thumbnails.normalOpacity }), p.css({ opacity: a.thumbnails.activeOpacity })), l.each(function(e) {
                    var t = $(this),
                        o = t.data(),
                        n = "horizontal" == s ? 0 : a.thumbnails.maxWidth;
                    height = "horizontal" == s ? a.thumbnails.maxHeight : 0, dims = i.getNewDimenstions(n, height, o.naturalWidth, o.naturalHeight, !0), t.css({ width: dims.width, height: dims.height }), "horizontal" == s && t.css({ float: "left" }), "horizontal" == s ? h += t.outerWidth(!0) : d += t.outerHeight()
                }), f = { width: h, height: d }, o.css(f), f = {};
                var g = o.offset(),
                    m = p.length ? p.offset() : { top: parseInt(u / 2), left: parseInt(c / 2) };
                g.top = g.top - $doc.scrollTop(), g.left = g.left - $doc.scrollLeft(), m.top = m.top - g.top - $doc.scrollTop(), m.left = m.left - g.left - $doc.scrollLeft(), "horizontal" == s ? (f.top = 0, f.left = parseInt(c / 2 - m.left - p.outerWidth() / 2)) : (f.top = parseInt(u / 2 - m.top - p.outerHeight() / 2), f.left = 0), arguments.length < 3 ? o.stop().animate(f, a.effects.repositionSpeed, "easeOutCirc") : o.css(f)
            },
            loadImage: function(e, t) {
                Array.isArray(e) || (e = [e]);
                var o = this,
                    i = e.length;
                i > 0 ? (o.showLoader(), $.each(e, function(n, a) {
                    var r = new Image;
                    r.onload = function() { 0 == (i -= 1) && (o.hideLoader(), t(r)) }, r.onerror = r.onabort = function() { 0 == (i -= 1) && (o.hideLoader(), t(!1)) }, r.src = e[n]
                })) : t(!1)
            },
            patchItemsEvents: function() {
                var e = this,
                    t = e.vars,
                    o = supportTouch ? "click.iL itap.iL" : "click.iL",
                    i = supportTouch ? "click.iL itap.iL" : "itap.iL";
                if (e.context && e.selector) {
                    var n = $(e.selector, e.context);
                    $(e.context).on(o, e.selector, function() {
                        var o = $(this),
                            i = n.index(o);
                        return t.current = i, t.next = e.items[i + 1] ? i + 1 : null, t.prev = e.items[i - 1] ? i - 1 : null, e.addContents(), e.patchEvents(), !1
                    }).on(i, e.selector, function() { return !1 })
                } else $.each(e.itemsObject, function(n, a) { a.on(o, function() { return t.current = n, t.next = e.items[n + 1] ? n + 1 : null, t.prev = e.items[n - 1] ? n - 1 : null, e.addContents(), e.patchEvents(), !1 }).on(i, function() { return !1 }) })
            },
            dispatchItemsEvents: function() {
                var e = this;
                e.vars, e.options;
                e.context && e.selector ? $(e.context).off(".iL", e.selector) : $.each(e.itemsObject, function(e, t) { t.off(".iL") })
            },
            refresh: function() { this.dispatchItemsEvents(), this.attachItems(), this.normalizeItems(), this.patchItemsEvents() },
            patchEvents: function() {
                var e = this,
                    t = e.vars,
                    o = e.options,
                    i = o.path.toLowerCase(),
                    n = $(".ilightbox-holder"),
                    a = fullScreenApi.fullScreenEventName + ".iLightBox",
                    r = verticalDistanceThreshold = 100,
                    s = [t.nextButton[0], t.prevButton[0], t.nextButton[0].firstChild, t.prevButton[0].firstChild];
                $win.on("resize.iLightBox", function() {
                    var i = getViewport();
                    o.mobileOptimizer && !o.innerToolbar && (t.isMobile = i.width <= t.mobileMaxWidth), t.BODY[t.isMobile ? "addClass" : "removeClass"]("isMobile"), t.nextLock || t.prevLock || e.repositionPhoto(null), supportTouch && (clearTimeout(t.setTime), t.setTime = setTimeout(function() {
                        var e = getScrollXY().y;
                        window.scrollTo(0, e - 30), window.scrollTo(0, e + 30), window.scrollTo(0, e)
                    }, 2e3)), t.thumbs && e.positionThumbnails()
                }).on("keydown.iLightBox", function(i) {
                    if (o.controls.keyboard) switch (i.keyCode) {
                        case 13:
                            i.shiftKey && o.keyboard.shift_enter && e.fullScreenAction();
                            break;
                        case 27:
                            o.keyboard.esc && e.closeAction();
                            break;
                        case 37:
                            o.keyboard.left && !t.lockKey && e.moveTo("prev");
                            break;
                        case 38:
                            o.keyboard.up && !t.lockKey && e.moveTo("prev");
                            break;
                        case 39:
                            o.keyboard.right && !t.lockKey && e.moveTo("next");
                            break;
                        case 40:
                            o.keyboard.down && !t.lockKey && e.moveTo("next")
                    }
                }), fullScreenApi.supportsFullScreen && $win.on(a, function() { e.doFullscreen() });
                var l = [o.caption.show + ".iLightBox", o.caption.hide + ".iLightBox", o.social.show + ".iLightBox", o.social.hide + ".iLightBox"].filter(function(e, t, o) { return o.lastIndexOf(e) === t }),
                    c = "";
                $.each(l, function(e, t) { 0 != e && (c += " "), c += t }), $doc.on(clickEvent, ".ilightbox-overlay", function() { o.overlay.blur && e.closeAction() }).on(clickEvent, ".ilightbox-next, .ilightbox-next-button", function() { e.moveTo("next") }).on(clickEvent, ".ilightbox-prev, .ilightbox-prev-button", function() { e.moveTo("prev") }).on(clickEvent, ".ilightbox-thumbnail", function() {
                    var o = $(this),
                        i = $(".ilightbox-thumbnail", t.thumbnails).index(o);
                    i != t.current && e.goTo(i)
                }).on(c, ".ilightbox-holder:not(.ilightbox-next, .ilightbox-prev)", function(e) {
                    var i = $("div.ilightbox-caption", t.holder),
                        n = $("div.ilightbox-social", t.holder),
                        a = o.effects.fadeSpeed;
                    t.nextLock || t.prevLock ? (e.type != o.caption.show || i.is(":visible") ? e.type == o.caption.hide && i.is(":visible") && i.fadeOut(a) : i.fadeIn(a), e.type != o.social.show || n.is(":visible") ? e.type == o.social.hide && n.is(":visible") && n.fadeOut(a) : n.fadeIn(a)) : (e.type != o.caption.show || i.is(":visible") ? e.type == o.caption.hide && i.is(":visible") && i.stop().fadeOut(a) : i.stop().fadeIn(a), e.type != o.social.show || n.is(":visible") ? e.type == o.social.hide && n.is(":visible") && n.stop().fadeOut(a) : n.stop().fadeIn(a))
                }).on("mouseenter.iLightBox mouseleave.iLightBox", ".ilightbox-wrapper", function(e) { "mouseenter" == e.type ? t.lockWheel = !0 : t.lockWheel = !1 }).on(clickEvent, ".ilightbox-toolbar a.ilightbox-close, .ilightbox-toolbar a.ilightbox-fullscreen, .ilightbox-toolbar a.ilightbox-play, .ilightbox-toolbar a.ilightbox-pause", function() {
                    var t = $(this);
                    t.hasClass("fusion-updated") || (t.hasClass("ilightbox-fullscreen") ? e.fullScreenAction() : t.hasClass("ilightbox-play") ? (e.resume(), t.addClass("ilightbox-pause").removeClass("ilightbox-play")) : t.hasClass("ilightbox-pause") ? (e.pause(), t.addClass("ilightbox-play").removeClass("ilightbox-pause")) : e.closeAction(), t.addClass("fusion-updated"), setTimeout(function() { t.removeClass("fusion-updated") }, 100))
                }).on(touchMoveEvent, ".ilightbox-overlay, .ilightbox-thumbnails-container", function(e) { e.preventDefault() }), o.controls.arrows && !supportTouch && $doc.on("mousemove.iLightBox", function(e) { t.isMobile || (t.mouseID || t.hideableElements.show(), t.mouseID = clearTimeout(t.mouseID), -1 === s.indexOf(e.target) && (t.mouseID = setTimeout(function() { t.hideableElements.hide(), t.mouseID = clearTimeout(t.mouseID) }, 3e3))) }), o.controls.slideshow && o.slideshow.pauseOnHover && $doc.on("mouseenter.iLightBox mouseleave.iLightBox", ".ilightbox-holder:not(.ilightbox-next, .ilightbox-prev)", function(o) { "mouseenter" == o.type && t.cycleID ? e.pause() : "mouseleave" == o.type && t.isPaused && e.resume() });
                var u = $(".ilightbox-overlay, .ilightbox-holder, .ilightbox-thumbnails");
                o.controls.mousewheel && u.on("mousewheel.iLightBox", function(o, i) { t.lockWheel || (o.preventDefault(), i < 0 ? e.moveTo("next") : i > 0 && e.moveTo("prev")) }), o.controls.swipe && n.on(touchStartEvent, function(a) {
                    if (!(t.nextLock || t.prevLock || 1 == t.total || t.lockSwipe)) {
                        t.BODY.addClass("ilightbox-closedhand");
                        var s, l = a.originalEvent.touches ? a.originalEvent.touches[0] : a,
                            c = $doc.scrollTop(),
                            u = $doc.scrollLeft(),
                            h = [n.eq(0).offset(), n.eq(1).offset(), n.eq(2).offset()],
                            d = [{ top: h[0].top - c, left: h[0].left - u }, { top: h[1].top - c, left: h[1].left - u }, { top: h[2].top - c, left: h[2].left - u }],
                            p = { time: (new Date).getTime(), coords: [l.pageX - u, l.pageY - c] };
                        n.on(touchMoveEvent, g), $doc.one(touchStopEvent, function(a) { n.off(touchMoveEvent, g), t.BODY.removeClass("ilightbox-closedhand"), p && s && ("horizontal" == i && s.time - p.time < 1e3 && abs(p.coords[0] - s.coords[0]) > r && abs(p.coords[1] - s.coords[1]) < verticalDistanceThreshold ? p.coords[0] > s.coords[0] ? t.current != t.total - 1 || o.infinite ? (t.isSwipe = !0, e.moveTo("next")) : m() : 0 != t.current || o.infinite ? (t.isSwipe = !0, e.moveTo("prev")) : m() : "vertical" == i && s.time - p.time < 1e3 && abs(p.coords[1] - s.coords[1]) > r && abs(p.coords[0] - s.coords[0]) < verticalDistanceThreshold ? p.coords[1] > s.coords[1] ? t.current != t.total - 1 || o.infinite ? (t.isSwipe = !0, e.moveTo("next")) : m() : 0 != t.current || o.infinite ? (t.isSwipe = !0, e.moveTo("prev")) : m() : m()), p = s = undefined })
                    }

                    function f(e) {
                        var t = $(this),
                            o = d[e],
                            n = [p.coords[0] - s.coords[0], p.coords[1] - s.coords[1]];
                        t[0].style["horizontal" == i ? "left" : "top"] = ("horizontal" == i ? o.left - n[0] : o.top - n[1]) + "px"
                    }

                    function g(e) {
                        if (p) {
                            var t = e.originalEvent.touches ? e.originalEvent.touches[0] : e;
                            s = { time: (new Date).getTime(), coords: [t.pageX - u, t.pageY - c] }, n.each(f), e.preventDefault()
                        }
                    }

                    function m() {
                        n.each(function() {
                            var e = $(this),
                                t = e.data("offset") || { top: e.offset().top - c, left: e.offset().left - u },
                                o = t.top,
                                i = t.left;
                            e.css(transform, gpuAcceleration).stop().animate({ top: o, left: i }, 500, "easeOutCirc", function() { e.css(transform, "") })
                        })
                    }
                })
            },
            goTo: function(e) {
                var t = this,
                    o = t.vars,
                    i = t.options,
                    n = e - o.current;
                if (i.infinite && (e == o.total - 1 && 0 == o.current && (n = -1), o.current == o.total - 1 && 0 == e && (n = 1)), 1 == n) t.moveTo("next");
                else if (-1 == n) t.moveTo("prev");
                else { if (o.nextLock || o.prevLock) return !1; "function" == typeof i.callback.onBeforeChange && i.callback.onBeforeChange.call(t, t.ui), i.linkId && (o.hashLock = !0, window.location.hash = i.linkId + "/" + e), t.items[e] && (t.items[e].options.mousewheel ? t.vars.lockWheel = !1 : o.lockWheel = !0, t.items[e].options.swipe ? o.lockSwipe = !1 : o.lockSwipe = !0), $.each([o.holder, o.nextPhoto, o.prevPhoto], function(e, t) { t.css(transform, gpuAcceleration).fadeOut(i.effects.loadedFadeSpeed) }), o.current = e, o.next = e + 1, o.prev = e - 1, t.createUI(), setTimeout(function() { t.generateBoxes() }, i.effects.loadedFadeSpeed + 50), $(".ilightbox-thumbnail", o.thumbnails).removeClass("ilightbox-active").eq(e).addClass("ilightbox-active"), t.positionThumbnails(), i.linkId && setTimeout(function() { o.hashLock = !1 }, 55), i.infinite || (o.nextButton.add(o.prevButton).add(o.innerPrevButton).add(o.innerNextButton).removeClass("disabled"), 0 == o.current && o.prevButton.add(o.innerPrevButton).addClass("disabled"), o.current >= o.total - 1 && o.nextButton.add(o.innerNextButton).addClass("disabled")), t.resetCycle(), "function" == typeof i.callback.onAfterChange && i.callback.onAfterChange.call(t, t.ui) }
            },
            moveTo: function(e) {
                var t = this,
                    o = t.vars,
                    i = t.options,
                    n = i.path.toLowerCase(),
                    a = getViewport(),
                    r = i.effects.switchSpeed,
                    s = t.vars.holder,
                    l = s.find("iframe").length ? s.find("iframe").attr("src") : "";
                if (l && -1 !== l.indexOf("vimeo.com") && s.find("iframe").attr("src", l), o.nextLock || o.prevLock) return !1;
                var c = "next" == e ? o.next : o.prev;
                if (i.linkId && c && (o.hashLock = !0, window.location.hash = i.linkId + "/" + c), "next" == e) {
                    if (!t.items[c]) return !1;
                    var u = o.nextPhoto,
                        h = o.holder,
                        d = o.prevPhoto,
                        p = "ilightbox-prev",
                        f = "ilightbox-next"
                } else if ("prev" == e) {
                    if (!t.items[c]) return !1;
                    u = o.prevPhoto, h = o.holder, d = o.nextPhoto, p = "ilightbox-next", f = "ilightbox-prev"
                }
                "function" == typeof i.callback.onBeforeChange && i.callback.onBeforeChange.call(t, t.ui), "next" == e ? o.nextLock = !0 : o.prevLock = !0;
                var g = $("div.ilightbox-caption", h),
                    m = $("div.ilightbox-social", h);
                if (g.length && g.stop().fadeOut(r, function() { $(this).remove() }), m.length && m.stop().fadeOut(r, function() { $(this).remove() }), t.items[c].caption) {
                    t.setCaption(t.items[c], u);
                    var v = $("div.ilightbox-caption", u),
                        b = parseInt(v.outerHeight() / u.outerHeight() * 100);
                    i.caption.start && b <= 50 && v.fadeIn(r)
                }
                var x = t.items[c].options.social;
                x && (t.setSocial(x, t.items[c].URL, u), i.social.start && $("div.ilightbox-social", u).fadeIn(i.effects.fadeSpeed)), $.each([u, h, d], function(e, t) { t.removeClass("ilightbox-next ilightbox-prev") });
                var w = u.data("offset"),
                    y = a.width - i.styles.pageOffsetX,
                    k = a.height - i.styles.pageOffsetY,
                    S = w.newDims.width,
                    L = w.newDims.height,
                    T = w.thumbsOffset,
                    A = w.diff,
                    I = parseInt(k / 2 - L / 2 - A.H - T.H / 2),
                    C = parseInt(y / 2 - S / 2 - A.W - T.W / 2);
                u.css(transform, gpuAcceleration).animate({ top: I, left: C, opacity: 1 }, r, o.isSwipe ? "easeOutCirc" : "easeInOutCirc", function() { u.css(transform, "") }), $("div.ilightbox-container", u).animate({ width: S, height: L }, r, o.isSwipe ? "easeOutCirc" : "easeInOutCirc");
                var O = h.data("offset"),
                    B = O.object;
                A = O.diff, S = O.newDims.width, L = O.newDims.height, S = parseInt(S * i.styles["next" == e ? "prevScale" : "nextScale"]), L = parseInt(L * i.styles["next" == e ? "prevScale" : "nextScale"]), I = "horizontal" == n ? parseInt(k / 2 - B.offsetY - L / 2 - A.H - T.H / 2) : parseInt(k - B.offsetX - A.H - T.H / 2), "prev" == e ? C = "horizontal" == n ? parseInt(y - B.offsetX - A.W - T.W / 2) : parseInt(y / 2 - S / 2 - A.W - B.offsetY - T.W / 2) : (I = "horizontal" == n ? I : parseInt(B.offsetX - A.H - L - T.H / 2), C = "horizontal" == n ? parseInt(B.offsetX - A.W - S - T.W / 2) : parseInt(y / 2 - B.offsetY - S / 2 - A.W - T.W / 2)), $("div.ilightbox-container", h).animate({ width: S, height: L }, r, o.isSwipe ? "easeOutCirc" : "easeInOutCirc"), h.addClass(p).css(transform, gpuAcceleration).animate({ top: I, left: C, opacity: i.styles.prevOpacity }, r, o.isSwipe ? "easeOutCirc" : "easeInOutCirc", function() { h.css(transform, ""), $(".ilightbox-thumbnail", o.thumbnails).removeClass("ilightbox-active").eq(c).addClass("ilightbox-active"), t.positionThumbnails(), t.items[c] && (t.items[c].options.mousewheel ? o.lockWheel = !1 : o.lockWheel = !0, t.items[c].options.swipe ? o.lockSwipe = !1 : o.lockSwipe = !0), o.isSwipe = !1, "next" == e ? (o.nextPhoto = d, o.prevPhoto = h, o.holder = u, o.nextPhoto.hide(), o.next = o.next + 1, o.prev = o.current, o.current = o.current + 1, i.infinite && (o.current > o.total - 1 && (o.current = 0), o.current == o.total - 1 && (o.next = 0), 0 == o.current && (o.prev = o.total - 1)), t.createUI(), t.items[o.next] ? t.loadContent(t.items[o.next], "next") : o.nextLock = !1) : (o.prevPhoto = d, o.nextPhoto = h, o.holder = u, o.prevPhoto.hide(), o.next = o.current, o.current = o.prev, o.prev = o.current - 1, i.infinite && (o.current == o.total - 1 && (o.next = 0), 0 == o.current && (o.prev = o.total - 1)), t.createUI(), t.items[o.prev] ? t.loadContent(t.items[o.prev], "prev") : o.prevLock = !1), i.linkId && setTimeout(function() { o.hashLock = !1 }, 55), i.infinite || (o.nextButton.add(o.prevButton).add(o.innerPrevButton).add(o.innerNextButton).removeClass("disabled"), 0 == o.current && o.prevButton.add(o.innerPrevButton).addClass("disabled"), o.current >= o.total - 1 && o.nextButton.add(o.innerNextButton).addClass("disabled")), t.repositionPhoto(), t.resetCycle(), "function" == typeof i.callback.onAfterChange && i.callback.onAfterChange.call(t, t.ui) }), I = "horizontal" == n ? getPixel(d, "top") : "next" == e ? parseInt(-k / 2 - d.outerHeight()) : parseInt(2 * I), C = "horizontal" == n ? "next" == e ? parseInt(-y / 2 - d.outerWidth()) : parseInt(2 * C) : getPixel(d, "left"), d.css(transform, gpuAcceleration).animate({ top: I, left: C, opacity: i.styles.nextOpacity }, r, o.isSwipe ? "easeOutCirc" : "easeInOutCirc", function() { d.css(transform, "") }).addClass(f)
            },
            setCaption: function(e, t) {
                var o = $('<div class="ilightbox-caption"></div>');
                e.caption && (o.html(e.caption), $("div.ilightbox-container", t).append(o))
            },
            normalizeSocial: function(e, t) {
                this.vars;
                var o = this.options,
                    i = window.location.href;
                return $.each(e, function(n, a) {
                    if (!a) return !0;
                    var r, s;
                    switch (n.toLowerCase()) {
                        case "facebook":
                            r = "http://www.facebook.com/share.php?v=4&src=bm&u={URL}", s = "Share on Facebook";
                            break;
                        case "twitter":
                            r = "http://twitter.com/home?status={URL}", s = "Share on Twitter";
                            break;
                        case "delicious":
                            r = "http://delicious.com/post?url={URL}", s = "Share on Delicious";
                            break;
                        case "digg":
                            r = "http://digg.com/submit?phase=2&url={URL}", s = "Share on Digg";
                            break;
                        case "reddit":
                            r = "http://reddit.com/submit?url={URL}", s = "Share on reddit"
                    }
                    e[n] = { URL: a.URL && absolutizeURI(i, a.URL) || o.linkId && window.location.href || "string" != typeof t && i || t && absolutizeURI(i, t) || i, source: a.source || r || a.URL && absolutizeURI(i, a.URL) || t && absolutizeURI(i, t), text: a.text || s || "Share on " + n, width: void 0 === a.width || isNaN(a.width) ? 640 : parseInt(a.width), height: a.height || 360 }
                }), e
            },
            setSocial: function(e, t, o) {
                var i = $('<div class="ilightbox-social"></div>'),
                    n = "<ul>";
                e = this.normalizeSocial(e, t), $.each(e, function(e, t) {
                    e.toLowerCase();
                    var o = t.source.replace(/\{URL\}/g, encodeURIComponent(t.URL).replace(/!/g, "%21").replace(/'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/\*/g, "%2A").replace(/%20/g, "+")),
                        i = "mail" === e ? "" : 'onclick="javascript:window.open(this.href' + (t.width <= 0 || t.height <= 0 ? "" : ", '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=" + t.height + ",width=" + t.width + ",left=40,top=40'") + ');return false;"';
                    n += '<li class="' + e + '"><a class="awb-icon-' + e + '" href="' + o + '"' + i + ' title="' + t.text + '" target="_blank" role="button"></a></li>'
                }), n += "</ul>", i.html(n), $("div.ilightbox-container", o).append(i)
            },
            fullScreenAction: function() {
                this.vars;
                fullScreenApi.supportsFullScreen ? fullScreenApi.isFullScreen() ? fullScreenApi.cancelFullScreen(document.documentElement) : fullScreenApi.requestFullScreen(document.documentElement) : this.doFullscreen()
            },
            doFullscreen: function() {
                var e = this,
                    t = e.vars,
                    o = getViewport(),
                    i = e.options;
                if (i.fullAlone) {
                    var n = t.holder,
                        a = e.items[t.current],
                        r = o.width,
                        s = o.height,
                        l = [n, t.nextPhoto, t.prevPhoto, t.nextButton, t.prevButton, t.overlay, t.toolbar, t.thumbnails, t.loader],
                        c = [t.loader, t.thumbnails];
                    if (t.isInFullScreen) t.isInFullScreen = t.lockKey = t.lockWheel = t.lockSwipe = !1, t.overlay.css({ opacity: e.options.overlay.opacity }), $.each(c, function(e, t) { t.show() }), t.fullScreenButton.attr("title", i.text.enterFullscreen), n.data({ naturalWidth: n.data("naturalWidthOld"), naturalHeight: n.data("naturalHeightOld"), naturalWidthOld: null, naturalHeightOld: null }), $.each(l, function(e, t) { t.removeClass("ilightbox-fullscreen") }), "function" == typeof i.callback.onExitFullScreen && i.callback.onExitFullScreen.call(e, e.ui);
                    else {
                        if (t.isInFullScreen = t.lockKey = t.lockWheel = t.lockSwipe = !0, t.overlay.css({ opacity: 1 }), $.each(c, function(e, t) { t.hide() }), t.fullScreenButton.attr("title", i.text.exitFullscreen), -1 != i.fullStretchTypes.indexOf(a.type)) n.data({ naturalWidthOld: n.data("naturalWidth"), naturalHeightOld: n.data("naturalHeight"), naturalWidth: r, naturalHeight: s });
                        else {
                            o = a.options.fullViewPort || i.fullViewPort || "";
                            var u = r,
                                h = s,
                                d = n.data("naturalWidth"),
                                p = n.data("naturalHeight");
                            if ("fill" == o.toLowerCase())(h = u / d * p) < s && (u = s / p * d, h = s);
                            else if ("fit" == o.toLowerCase()) { u = (f = e.getNewDimenstions(u, h, d, p, !0)).width, h = f.height } else if ("stretch" == o.toLowerCase()) u = u, h = h;
                            else {
                                var f, g = d > u || p > h;
                                u = (f = e.getNewDimenstions(u, h, d, p, g)).width, h = f.height
                            }
                            n.data({ naturalWidthOld: n.data("naturalWidth"), naturalHeightOld: n.data("naturalHeight"), naturalWidth: u, naturalHeight: h })
                        }
                        $.each(l, function(e, t) { t.addClass("ilightbox-fullscreen") }), "function" == typeof i.callback.onEnterFullScreen && i.callback.onEnterFullScreen.call(e, e.ui)
                    }
                } else t.isInFullScreen ? t.isInFullScreen = !1 : t.isInFullScreen = !0;
                e.repositionPhoto(!0)
            },
            closeAction: function() {
                var e = this.vars,
                    t = this.options;
                $win.off(".iLightBox"), $doc.off(".iLightBox"), $doc.off(clickEvent, ".ilightbox-overlay"), $doc.off(clickEvent, ".ilightbox-next, .ilightbox-next-button"), $doc.off(clickEvent, ".ilightbox-prev, .ilightbox-prev-button"), $doc.off(clickEvent, ".ilightbox-thumbnail"), $doc.off(clickEvent, ".ilightbox-toolbar a.ilightbox-close, .ilightbox-toolbar a.ilightbox-fullscreen, .ilightbox-toolbar a.ilightbox-play, .ilightbox-toolbar a.ilightbox-pause"), e.isInFullScreen && fullScreenApi.cancelFullScreen(document.documentElement), $(".ilightbox-overlay, .ilightbox-holder, .ilightbox-thumbnails").off(".iLightBox"), t.hide.effect ? e.overlay.stop().fadeOut(t.hide.speed, function() { e.overlay.remove(), e.BODY.removeClass("ilightbox-noscroll").off(".iLightBox") }) : (e.overlay.remove(), e.BODY.removeClass("ilightbox-noscroll").off(".iLightBox"));
                var o = [e.toolbar, e.holder, e.nextPhoto, e.prevPhoto, e.nextButton, e.prevButton, e.loader, e.thumbnails];
                $.each(o, function(e, t) { t.removeAttr("style").remove() }), e.prevButton.removeClass("disabled"), e.nextButton.removeClass("disabled"), e.dontGenerateThumbs = e.isInFullScreen = !1, window.iLightBox = null, t.linkId && (e.hashLock = !0, removeHash(), setTimeout(function() { e.hashLock = !1 }, 55)), "function" == typeof t.callback.onHide && t.callback.onHide.call(this, this.ui)
            },
            repositionPhoto: function() {
                var e = this,
                    t = e.vars,
                    o = e.options,
                    i = o.path.toLowerCase(),
                    n = getViewport(),
                    a = n.width,
                    r = n.height,
                    s = t.isInFullScreen && o.fullAlone || t.isMobile ? 0 : "horizontal" == i ? 0 : t.thumbnails.outerWidth(),
                    l = t.isMobile ? t.toolbar.outerHeight() : t.isInFullScreen && o.fullAlone ? 0 : "horizontal" == i ? t.thumbnails.outerHeight() : 0,
                    c = t.isInFullScreen && o.fullAlone ? a : a - o.styles.pageOffsetX,
                    u = t.isInFullScreen && o.fullAlone ? r : r - o.styles.pageOffsetY,
                    h = "horizontal" == i ? parseInt(e.items[t.next] || e.items[t.prev] ? 2 * (o.styles.nextOffsetX + o.styles.prevOffsetX) : c / 10 <= 30 ? 30 : c / 10) : parseInt(c / 10 <= 30 ? 30 : c / 10) + s,
                    d = "horizontal" == i ? parseInt(u / 10 <= 30 ? 30 : u / 10) + l : parseInt(e.items[t.next] || e.items[t.prev] ? 2 * (o.styles.nextOffsetX + o.styles.prevOffsetX) : u / 10 <= 30 ? 30 : u / 10),
                    p = { type: "current", width: c, height: u, item: e.items[t.current], offsetW: h, offsetH: d, thumbsOffsetW: s, thumbsOffsetH: l, animate: arguments.length, holder: t.holder };
                e.repositionEl(p), e.items[t.next] && (p = $.extend(p, { type: "next", item: e.items[t.next], offsetX: o.styles.nextOffsetX, offsetY: o.styles.nextOffsetY, holder: t.nextPhoto }), e.repositionEl(p)), e.items[t.prev] && (p = $.extend(p, { type: "prev", item: e.items[t.prev], offsetX: o.styles.prevOffsetX, offsetY: o.styles.prevOffsetY, holder: t.prevPhoto }), e.repositionEl(p));
                var f = "horizontal" == i ? { left: parseInt(c / 2 - t.loader.outerWidth() / 2) } : { top: parseInt(u / 2 - t.loader.outerHeight() / 2) };
                t.loader.css(f)
            },
            repositionEl: function(e) {
                var t = this.vars,
                    o = this.options,
                    i = o.path.toLowerCase(),
                    n = "current" == e.type && t.isInFullScreen && o.fullAlone ? e.width : e.width - e.offsetW,
                    a = "current" == e.type && t.isInFullScreen && o.fullAlone ? e.height : e.height - e.offsetH,
                    r = e.item,
                    s = e.item.options,
                    l = e.holder,
                    c = e.offsetX || 0,
                    u = e.offsetY || 0,
                    h = e.thumbsOffsetW,
                    d = e.thumbsOffsetH;
                "current" == e.type ? ("number" == typeof s.width && s.width && (n = t.isInFullScreen && o.fullAlone && (-1 != o.fullStretchTypes.indexOf(r.type) || s.fullViewPort || o.fullViewPort) ? n : s.width > n ? n : s.width), "number" == typeof s.height && s.height && (a = t.isInFullScreen && o.fullAlone && (-1 != o.fullStretchTypes.indexOf(r.type) || s.fullViewPort || o.fullViewPort) ? a : s.height > a ? a : s.height)) : ("number" == typeof s.width && s.width && (n = s.width > n ? n : s.width), "number" == typeof s.height && s.height && (a = s.height > a ? a : s.height)), $(".ilightbox-inner-toolbar", l).length && (a = parseInt(a - $(".ilightbox-inner-toolbar", l).outerHeight()));
                var p = "string" == typeof s.width && -1 != s.width.indexOf("%") ? percentToValue(parseInt(s.width.replace("%", "")), e.width) : l.data("naturalWidth"),
                    f = "string" == typeof s.height && -1 != s.height.indexOf("%") ? percentToValue(parseInt(s.height.replace("%", "")), e.height) : l.data("naturalHeight"),
                    g = "string" == typeof s.width && -1 != s.width.indexOf("%") || "string" == typeof s.height && -1 != s.height.indexOf("%") ? { width: p, height: f } : this.getNewDimenstions(n, a, p, f),
                    m = $.extend({}, g, {});
                "prev" == e.type || "next" == e.type ? (p = parseInt(g.width * ("next" == e.type ? o.styles.nextScale : o.styles.prevScale)), f = parseInt(g.height * ("next" == e.type ? o.styles.nextScale : o.styles.prevScale))) : (p = g.width, f = g.height);
                var v = parseInt((getPixel(l, "padding-left") + getPixel(l, "padding-right") + getPixel(l, "border-left-width") + getPixel(l, "border-right-width")) / 2),
                    b = parseInt((getPixel(l, "padding-top") + getPixel(l, "padding-bottom") + getPixel(l, "border-top-width") + getPixel(l, "border-bottom-width") + ($(".ilightbox-inner-toolbar", l).outerHeight() || 0)) / 2);
                switch (e.type) {
                    case "current":
                        var x = parseInt(e.height / 2 - f / 2 - b - d / 2),
                            w = parseInt(e.width / 2 - p / 2 - v - h / 2);
                        break;
                    case "next":
                        x = "horizontal" == i ? parseInt(e.height / 2 - u - f / 2 - b - d / 2) : parseInt(e.height - c - b - d / 2), w = "horizontal" == i ? parseInt(e.width - c - v - h / 2) : parseInt(e.width / 2 - p / 2 - v - u - h / 2);
                        break;
                    case "prev":
                        x = "horizontal" == i ? parseInt(e.height / 2 - u - f / 2 - b - d / 2) : parseInt(c - b - f - d / 2), w = "horizontal" == i ? parseInt(c - v - p - h / 2) : parseInt(e.width / 2 - u - p / 2 - v - h / 2)
                }
                l.data("offset", { top: x, left: w, newDims: m, diff: { W: v, H: b }, thumbsOffset: { W: h, H: d }, object: e }), e.animate > 0 && o.effects.reposition ? (l.css(transform, gpuAcceleration).stop().animate({ top: x, left: w }, o.effects.repositionSpeed, "easeOutCirc", function() { l.css(transform, "") }), $("div.ilightbox-container", l).stop().animate({ width: p, height: f }, o.effects.repositionSpeed, "easeOutCirc"), $("div.ilightbox-inner-toolbar", l).stop().animate({ width: p }, o.effects.repositionSpeed, "easeOutCirc", function() { $(this).css("overflow", "visible") })) : (l.css({ top: x, left: w }), $("div.ilightbox-container", l).css({ width: p, height: f }), $("div.ilightbox-inner-toolbar", l).css({ width: p }))
            },
            resume: function(e) {
                var t = this,
                    o = t.vars,
                    i = t.options;
                !i.slideshow.pauseTime || i.controls.slideshow && o.total <= 1 || e < o.isPaused || (o.isPaused = 0, o.cycleID && (o.cycleID = clearTimeout(o.cycleID)), o.cycleID = setTimeout(function() { o.current == o.total - 1 ? t.goTo(0) : t.moveTo("next") }, i.slideshow.pauseTime))
            },
            pause: function(e) {
                var t = this.vars;
                this.options;
                e < t.isPaused || (t.isPaused = e || 100, t.cycleID && (t.cycleID = clearTimeout(t.cycleID)))
            },
            resetCycle: function() {
                var e = this.vars;
                this.options.controls.slideshow && e.cycleID && !e.isPaused && this.resume()
            },
            getNewDimenstions: function(e, t, o, i, n) { var a = this; return factor = e ? t ? min(e / o, t / i) : e / o : t / i, n || (factor > a.options.maxScale ? factor = a.options.maxScale : factor < a.options.minScale && (factor = a.options.minScale)), { width: a.options.keepAspectRatio ? round(o * factor) : e, height: a.options.keepAspectRatio ? round(i * factor) : t, ratio: factor } },
            setOption: function(e) { this.options = $.extend(!0, this.options, e || {}), this.refresh() },
            availPlugins: function() {
                var e = document.createElement("video");
                this.plugins = { flash: !isMobile, quicktime: parseInt(PluginDetect.getVersion("QuickTime")) >= 0, html5H264: !(!e.canPlayType || !e.canPlayType("video/mp4").replace(/no/, "")), html5WebM: !(!e.canPlayType || !e.canPlayType("video/webm").replace(/no/, "")), html5Vorbis: !(!e.canPlayType || !e.canPlayType("video/ogg").replace(/no/, "")), html5QuickTime: !(!e.canPlayType || !e.canPlayType("video/quicktime").replace(/no/, "")) }
            },
            addContent: function(e, t) {
                var o = this;
                switch (t.type) {
                    case "video":
                        var i = !1,
                            n = t.videoType,
                            a = t.options.html5video;
                        ("video/mp4" == n || "mp4" == t.ext || "m4v" == t.ext || a.h264) && o.plugins.html5H264 ? (t.ext = "mp4", t.URL = a.h264 || t.URL) : a.webm && o.plugins.html5WebM ? (t.ext = "webm", t.URL = a.webm || t.URL) : a.ogg && o.plugins.html5Vorbis && (t.ext = "ogv", t.URL = a.ogg || t.URL), !o.plugins.html5H264 || "video/mp4" != n && "mp4" != t.ext && "m4v" != t.ext ? !o.plugins.html5WebM || "video/webm" != n && "webm" != t.ext ? !o.plugins.html5Vorbis || "video/ogg" != n && "ogv" != t.ext ? !o.plugins.html5QuickTime || "video/quicktime" != n && "mov" != t.ext && "qt" != t.ext || (i = !0, n = "video/quicktime") : (i = !0, n = "video/ogg") : (i = !0, n = "video/webm") : (i = !0, n = "video/mp4"), i ? m = $("<video />", { width: "100%", height: "100%", preload: a.preload, autoplay: a.autoplay, poster: a.poster, controls: a.controls }).append($("<source />", { src: t.URL, type: n })) : o.plugins.quicktime ? (m = $("<object />", { type: "video/quicktime", pluginspage: pluginspages.quicktime }).attr({ data: t.URL, width: "100%", height: "100%" }).append($("<param />", { name: "src", value: t.URL })).append($("<param />", { name: "autoplay", value: "false" })).append($("<param />", { name: "loop", value: "false" })).append($("<param />", { name: "scale", value: "tofit" })), browser.msie && (m = QT_GenerateOBJECTText(t.URL, "100%", "100%", "", "SCALE", "tofit", "AUTOPLAY", "false", "LOOP", "false"))) : m = $("<span />", { class: "ilightbox-alert", html: o.options.errors.missingPlugin.replace("{pluginspage}", pluginspages.quicktime).replace("{type}", "QuickTime") });
                        break;
                    case "flash":
                        if (o.plugins.flash) {
                            var r = "",
                                s = 0;
                            t.options.flashvars ? $.each(t.options.flashvars, function(e, t) { 0 != s && (r += "&"), r += e + "=" + encodeURIComponent(t), s++ }) : r = null, m = $("<embed />").attr({ type: "application/x-shockwave-flash", src: t.URL, width: "number" == typeof t.options.width && t.options.width && "1" == o.options.minScale && "1" == o.options.maxScale ? t.options.width : "100%", height: "number" == typeof t.options.height && t.options.height && "1" == o.options.minScale && "1" == o.options.maxScale ? t.options.height : "100%", quality: "high", bgcolor: "#000000", play: "true", loop: "true", menu: "true", wmode: "transparent", scale: "showall", allowScriptAccess: "always", allowFullScreen: "true", flashvars: r, fullscreen: "yes" })
                        } else m = $("<span />", { class: "ilightbox-alert", html: o.options.errors.missingPlugin.replace("{pluginspage}", pluginspages.flash).replace("{type}", "Adobe Flash player") });
                        break;
                    case "iframe":
                        var l = t.URL.substring(t.URL.indexOf("?") + 1).split("&"),
                            c = "?";
                        if (-1 != t.URL.indexOf("vimeo.com")) { var u = /http(s?):\/\/(www\.)?vimeo.com\/(\d+)/; if (p = t.URL.match(u)) { c = "?title=0&amp;byline=0&amp;portrait=0"; for (var h = 0; h < l.length; ++h) { 1 < (f = l[h].split("="))[0].length && 2 === f.length && -1 === c.indexOf(f[0]) && (c += "&" + f[0] + "=" + decodeURIComponent(f[1].replace(/\+/g, " "))) } var d = "//player.vimeo.com/video/" + p[3] + c } else d = t.URL } else {
                            var p;
                            u = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
                            if (p = t.URL.match(u)) {
                                c = "?enablejsapi=1";
                                for (h = 0; h < l.length; ++h) {
                                    var f;
                                    1 < (f = l[h].split("="))[0].length && 2 === f.length && -1 === c.indexOf(f[0]) && (c += "&" + f[0] + "=" + decodeURIComponent(f[1].replace(/\+/g, " ")))
                                }
                                d = "//www.youtube.com/embed/" + p[7] + c
                            } else d = t.URL
                        }
                        var g = ""; - 1 !== c.indexOf("autoplay=1") && (g += "autoplay"), m = $("<iframe />").attr({ width: "number" == typeof t.options.width && t.options.width && "1" == o.options.minScale && "1" == o.options.maxScale ? t.options.width : "100%", height: "number" == typeof t.options.height && t.options.height && "1" == o.options.minScale && "1" == o.options.maxScale ? t.options.height : "100%", src: d, frameborder: 0, hspace: 0, vspace: 0, scrolling: supportTouch ? "auto" : "scroll", webkitAllowFullScreen: "", mozallowfullscreen: "", allowFullScreen: "", allow: g });
                        break;
                    case "inline":
                        m = $('<div class="ilightbox-wrapper"></div>').html($(t.URL).clone(!0));
                        break;
                    case "html":
                        var m, v = t.URL;
                        if (v[0].nodeName) m = $('<div class="ilightbox-wrapper"></div>').html(v);
                        else {
                            var b = $(t.URL),
                                x = b.selector ? $("<div>" + b + "</div>") : b;
                            m = $('<div class="ilightbox-wrapper"></div>').html(x)
                        }
                }
                return $("div.ilightbox-container", e).empty().html(m), "video" === m[0].tagName.toLowerCase() && browser.webkit && setTimeout(function() {
                    var e = m[0].currentSrc + "?" + floor(3e4 * random());
                    m[0].currentSrc = e, m[0].src = e
                }), m
            },
            ogpRecognition: function(e, t) {
                var o = this,
                    i = e.URL;
                o.showLoader(), doAjax(i, function(e) {
                    if (o.hideLoader(), e) {
                        var i = new Object;
                        if (i.length = !1, i.url = e.url, 200 == e.status) {
                            for (var n = e.results, a = n.type, r = n.source, s = n.url.substring(n.url.indexOf("?") + 1).split("&"), l = r.src, c = 0; c < s.length; ++c) - 1 === l.indexOf(s[c]) && (l += "&" + s[c]);
                            i.source = l, i.width = r.width && parseInt(r.width) || 0, i.height = r.height && parseInt(r.height) || 0, i.type = a, i.thumbnail = r.thumbnail || n.images[0], i.html5video = n.html5video || {}, i.length = !0, "application/x-shockwave-flash" == r.type ? i.type = "flash" : -1 != r.type.indexOf("video/") ? i.type = "video" : -1 != r.type.indexOf("/html") ? i.type = "iframe" : -1 != r.type.indexOf("image/") && (i.type = "image")
                        } else if (void 0 !== e.response) throw e.response;
                        t.call(this, !!i.length && i)
                    }
                })
            },
            hashChangeHandler: function(e) {
                var t = this,
                    o = t.vars,
                    i = t.options,
                    n = parseURI(e || window.location.href).hash,
                    a = n.split("/"),
                    r = a[1];
                if (!(o.hashLock || "#" + i.linkId != a[0] && n.length > 1))
                    if (r) {
                        var s = a[1] || 0;
                        if (t.items[s])(l = $(".ilightbox-overlay")).length && l.attr("linkid") == i.linkId ? t.goTo(s) : t.itemsObject[s].trigger(supportTouch ? "click itap" : "click");
                        else(l = $(".ilightbox-overlay")).length && t.closeAction()
                    } else {
                        var l;
                        (l = $(".ilightbox-overlay")).length && t.closeAction()
                    }
            }
        }, $.fn.iLightBox = function() {
            var e = arguments,
                t = $.isPlainObject(e[0]) ? e[0] : e[1],
                o = Array.isArray(e[0]) || "string" == typeof e[0] ? e[0] : e[1];
            t || (t = {});
            var i = $.extend(!0, { attr: "href", path: "vertical", skin: "dark", linkId: !1, infinite: !1, startFrom: 0, randomStart: !1, keepAspectRatio: !0, maxScale: 1, minScale: .2, innerToolbar: !1, smartRecognition: !1, mobileOptimizer: !0, fullAlone: !0, fullViewPort: null, fullStretchTypes: "flash, video", overlay: { blur: !0, opacity: .85 }, controls: { arrows: !1, slideshow: !1, toolbar: !0, fullscreen: !0, thumbnail: !0, keyboard: !0, mousewheel: !0, swipe: !0 }, keyboard: { left: !0, right: !0, up: !0, down: !0, esc: !0, shift_enter: !0 }, show: { effect: !0, speed: 300, title: !0 }, hide: { effect: !0, speed: 300 }, caption: { start: !0, show: "mouseenter", hide: "mouseleave" }, social: { start: !0, show: "mouseenter", hide: "mouseleave", buttons: !1 }, styles: { pageOffsetX: 0, pageOffsetY: 0, nextOffsetX: 45, nextOffsetY: 0, nextOpacity: 1, nextScale: 1, prevOffsetX: 45, prevOffsetY: 0, prevOpacity: 1, prevScale: 1 }, thumbnails: { maxWidth: 120, maxHeight: 80, normalOpacity: 1, activeOpacity: .6 }, effects: { reposition: !0, repositionSpeed: 200, switchSpeed: 500, loadedFadeSpeed: 180, fadeSpeed: 200 }, slideshow: { pauseTime: 5e3, pauseOnHover: !1, startPaused: !0 }, text: { close: "Press Esc to close", enterFullscreen: "Enter Fullscreen (Shift+Enter)", exitFullscreen: "Exit Fullscreen (Shift+Enter)", slideShow: "Slideshow", next: "Next", previous: "Previous" }, errors: { loadImage: "An error occurred when trying to load photo.", loadContents: "An error occurred when trying to load contents.", missingPlugin: "The content your are attempting to view requires the <a href='{pluginspage}' role='button' target='_blank'>{type} plugin</a>." }, ajaxSetup: { url: "", beforeSend: function(e, t) {}, cache: !1, complete: function(e, t) {}, crossDomain: !1, error: function(e, t, o) {}, success: function(e, t, o) {}, global: !0, ifModified: !1, username: null, password: null, type: "GET" }, callback: {} }, t),
                n = !(!Array.isArray(o) && "string" != typeof o);
            if (o = Array.isArray(o) ? o : new Array, "string" == typeof e[0] && (o[0] = e[0]), version_compare($.fn.jquery, "1.8", ">=")) { var a = new iLightBox($(this), i, o, n); return { close: function() { a.closeAction() }, fullscreen: function() { a.fullScreenAction() }, moveNext: function() { a.moveTo("next") }, movePrev: function() { a.moveTo("prev") }, goTo: function(e) { a.goTo(e) }, refresh: function() { a.refresh() }, reposition: function() { arguments.length > 0 ? a.repositionPhoto(!0) : a.repositionPhoto() }, setOption: function(e) { a.setOption(e) }, destroy: function() { a.closeAction(), $win.off("iLightBoxHashChange"), a.dispatchItemsEvents() } } }
            throw "The jQuery version that was loaded is too old. iLightBox requires jQuery 1.8+"
        }, $.iLightBox = function() { return $.fn.iLightBox(arguments[0], arguments[1]) }, $.extend($.easing, { easeInCirc: function(e, t, o, i, n) { return -i * (sqrt(1 - (t /= n) * t) - 1) + o }, easeOutCirc: function(e, t, o, i, n) { return i * sqrt(1 - (t = t / n - 1) * t) + o }, easeInOutCirc: function(e, t, o, i, n) { return (t /= n / 2) < 1 ? -i / 2 * (sqrt(1 - t * t) - 1) + o : i / 2 * (sqrt(1 - (t -= 2) * t) + 1) + o } }),
        function() {
            $.each("touchstart touchmove touchend tap taphold swipeleft swiperight scrollstart scrollstop".split(" "), function(e, t) { $.fn[t] = function(e) { return e ? this.on(t, e) : this.trigger(t) } });
            var e = "touchstart.iTap",
                t = "touchend.iTap";
            $.event.special.itap = {
                setup: function() {
                    var o, i, n = this,
                        a = $(this);
                    a.on(e, function(e) {
                        o = getScrollXY(), a.one(t, function(e) {
                            i = getScrollXY();
                            var t = e || window.event;
                            (e = $.event.fix(t)).type = "itap", o && i && o.x == i.x && o.y == i.y && ($.event.dispatch || $.event.handle).call(n, e), o = i = undefined
                        })
                    })
                },
                teardown: function() { $(this).off(e) }
            }
        }(),
        function() {
            if (fullScreenApi = { supportsFullScreen: !1, isFullScreen: function() { return !1 }, requestFullScreen: function() {}, cancelFullScreen: function() {}, fullScreenEventName: "", prefix: "" }, browserPrefixes = "webkit moz o ms khtml".split(" "), void 0 !== document.cancelFullScreen) fullScreenApi.supportsFullScreen = !0;
            else
                for (var e = 0, t = browserPrefixes.length; e < t; e++)
                    if (fullScreenApi.prefix = browserPrefixes[e], void 0 !== document[fullScreenApi.prefix + "CancelFullScreen"]) { fullScreenApi.supportsFullScreen = !0; break }
            fullScreenApi.supportsFullScreen && (fullScreenApi.fullScreenEventName = fullScreenApi.prefix + "fullscreenchange", fullScreenApi.isFullScreen = function() {
                switch (this.prefix) {
                    case "":
                        return document.fullScreen;
                    case "webkit":
                        return document.webkitIsFullScreen;
                    default:
                        return document[this.prefix + "FullScreen"]
                }
            }, fullScreenApi.requestFullScreen = function(e) { return "" === this.prefix ? e.requestFullScreen() : e[this.prefix + "RequestFullScreen"]() }, fullScreenApi.cancelFullScreen = function(e) { return "" === this.prefix ? document.cancelFullScreen() : document[this.prefix + "CancelFullScreen"]() })
        }(),
        function() {
            var e = function(e) { e = e.toLowerCase(); var t = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || []; return { browser: t[1] || "", version: t[2] || "0" } }(navigator.userAgent);
            browser = {}, e.browser && (browser[e.browser] = !0, browser.version = e.version), browser.chrome ? browser.webkit = !0 : browser.webkit && (browser.safari = !0)
        }(),
        function() {
            var e = ["", "webkit", "moz", "ms", "o"],
                t = document.createElement("div");

            function o(o) { for (var i = 0, n = e.length; i < n; i++) { var a = e[i] ? e[i] + o.charAt(0).toUpperCase() + o.slice(1) : o; if (t.style[a] !== undefined) return a } }
            transform = o("transform") || "", gpuAcceleration = o("perspective") ? "translateZ(0) " : ""
        }();
    var PluginDetect = {
        version: "0.7.9",
        name: "PluginDetect",
        handler: function(e, t, o) { return function() { e(t, o) } },
        openTag: "<",
        isDefined: function(e) { return void 0 !== e },
        isArray: function(e) { return /array/i.test(Object.prototype.toString.call(e)) },
        isFunc: function(e) { return "function" == typeof e },
        isString: function(e) { return "string" == typeof e },
        isNum: function(e) { return "number" == typeof e },
        isStrNum: function(e) { return "string" == typeof e && /\d/.test(e) },
        getNumRegx: /[\d][\d\.\_,-]*/,
        splitNumRegx: /[\.\_,-]/g,
        getNum: function(e, t) {
            var o = this,
                i = o.isStrNum(e) ? (o.isDefined(t) ? new RegExp(t) : o.getNumRegx).exec(e) : null;
            return i ? i[0] : null
        },
        compareNums: function(e, t, o) {
            var i, n, a, r = this,
                s = parseInt;
            if (r.isStrNum(e) && r.isStrNum(t)) { if (r.isDefined(o) && o.compareNums) return o.compareNums(e, t); for (i = e.split(r.splitNumRegx), n = t.split(r.splitNumRegx), a = 0; a < min(i.length, n.length); a++) { if (s(i[a], 10) > s(n[a], 10)) return 1; if (s(i[a], 10) < s(n[a], 10)) return -1 } }
            return 0
        },
        formatNum: function(e, t) { var o, i, n = this; if (!n.isStrNum(e)) return null; for (n.isNum(t) || (t = 4), t--, i = e.replace(/\s/g, "").split(n.splitNumRegx).concat(["0", "0", "0", "0"]), o = 0; o < 4; o++) /^(0+)(.+)$/.test(i[o]) && (i[o] = RegExp.$2), (o > t || !/\d/.test(i[o])) && (i[o] = "0"); return i.slice(0, 4).join(",") },
        $$hasMimeType: function(e) {
            return function(t) {
                if (!e.isIE && t) {
                    var o, i, n, a = e.isArray(t) ? t : e.isString(t) ? [t] : [];
                    for (n = 0; n < a.length; n++)
                        if (e.isString(a[n]) && /[^\s]/.test(a[n]) && (i = (o = navigator.mimeTypes[a[n]]) ? o.enabledPlugin : 0) && (i.name || i.description)) return o
                }
                return null
            }
        },
        findNavPlugin: function(e, t, o) {
            var i, n, a, r = new RegExp(e, "i"),
                s = !this.isDefined(t) || t ? /\d/ : 0,
                l = o ? new RegExp(o, "i") : 0,
                c = navigator.plugins;
            for (i = 0; i < c.length; i++)
                if (a = c[i].description || "", n = c[i].name || "", (r.test(a) && (!s || s.test(RegExp.leftContext + RegExp.rightContext)) || r.test(n) && (!s || s.test(RegExp.leftContext + RegExp.rightContext))) && (!l || !l.test(a) && !l.test(n))) return c[i];
            return null
        },
        getMimeEnabledPlugin: function(e, t, o) {
            var i, n, a, r, s = new RegExp(t, "i"),
                l = o ? new RegExp(o, "i") : 0,
                c = this.isString(e) ? [e] : e;
            for (r = 0; r < c.length; r++)
                if ((i = this.hasMimeType(c[r])) && (i = i.enabledPlugin) && (a = i.description || "", n = i.name || "", (s.test(a) || s.test(n)) && (!l || !l.test(a) && !l.test(n)))) return i;
            return 0
        },
        getPluginFileVersion: function(e, t) {
            var o, i, n, a, r = this,
                s = -1;
            if (r.OS > 2 || !e || !e.version || !(o = r.getNum(e.version))) return t;
            if (!t) return o;
            for (o = r.formatNum(o), i = (t = r.formatNum(t)).split(r.splitNumRegx), n = o.split(r.splitNumRegx), a = 0; a < i.length; a++) { if (s > -1 && a > s && "0" != i[a]) return t; if (n[a] != i[a] && (-1 == s && (s = a), "0" != i[a])) return t }
            return o
        },
        AXO: window.ActiveXObject,
        getAXO: function(e) { var t = null; try { t = new this.AXO(e) } catch (e) {} return t },
        convertFuncs: function(e) {
            var t, o, i = /^[\$][\$]/;
            for (t in e)
                if (i.test(t)) try {
                    (o = t.slice(2)).length > 0 && !e[o] && (e[o] = e[t](e), delete e[t])
                } catch (e) {}
        },
        initObj: function(e, t, o) {
            var i, n;
            if (e) {
                if (1 == e[t[0]] || o)
                    for (i = 0; i < t.length; i += 2) e[t[i]] = t[i + 1];
                for (i in e)(n = e[i]) && 1 == n[t[0]] && this.initObj(n, t)
            }
        },
        initScript: function() {
            var e = this,
                t = navigator,
                o = document,
                i = t.userAgent || "",
                n = t.vendor || "",
                a = t.platform || "",
                r = t.product || "";
            for (u in e.initObj(e, ["$", e]), e.Plugins) e.Plugins[u] && e.initObj(e.Plugins[u], ["$", e, "$$", e.Plugins[u]], 1);
            if (e.convertFuncs(e), e.OS = 100, a) {
                var s = ["Win", 1, "Mac", 2, "Linux", 3, "FreeBSD", 4, "iPhone", 21.1, "iPod", 21.2, "iPad", 21.3, "Win.*CE", 22.1, "Win.*Mobile", 22.2, "Pocket\\s*PC", 22.3, "", 100];
                for (u = s.length - 2; u >= 0; u -= 2)
                    if (s[u] && new RegExp(s[u], "i").test(a)) { e.OS = s[u + 1]; break }
            }
            if (e.head = o.getElementsByTagName("head")[0] || o.getElementsByTagName("body")[0] || o.body || null, e.isIE = new Function("return/*@cc_on!@*/!1")(), e.verIE = e.isIE && /MSIE\s*(\d+\.?\d*)/i.test(i) ? parseFloat(RegExp.$1, 10) : null, e.verIEfull = null, e.docModeIE = null, e.isIE) {
                var l, c = document.createElement("div");
                try { c.style.behavior = "url(#default#clientcaps)", e.verIEfull = c.getComponentVersion("{89820200-ECBD-11CF-8B85-00AA005B4383}", "componentid").replace(/,/g, ".") } catch (e) {}
                l = parseFloat(e.verIEfull || "0", 10), e.docModeIE = o.documentMode || (/back/i.test(o.compatMode || "") ? 5 : l) || e.verIE, e.verIE = l || e.docModeIE
            }
            if (e.ActiveXEnabled = !1, e.isIE) {
                var u, h = ["Msxml2.XMLHTTP", "Msxml2.DOMDocument", "Microsoft.XMLDOM", "ShockwaveFlash.ShockwaveFlash", "TDCCtl.TDCCtl", "Shell.UIHelper", "Scripting.Dictionary", "wmplayer.ocx"];
                for (u = 0; u < h.length; u++)
                    if (e.getAXO(h[u])) { e.ActiveXEnabled = !0; break }
            }
            e.isGecko = /Gecko/i.test(r) && /Gecko\s*\/\s*\d/i.test(i), e.verGecko = e.isGecko ? e.formatNum(/rv\s*\:\s*([\.\,\d]+)/i.test(i) ? RegExp.$1 : "0.9") : null, e.isChrome = /Chrome\s*\/\s*(\d[\d\.]*)/i.test(i), e.verChrome = e.isChrome ? e.formatNum(RegExp.$1) : null, e.isSafari = (/Apple/i.test(n) || !n && !e.isChrome) && /Safari\s*\/\s*(\d[\d\.]*)/i.test(i), e.verSafari = e.isSafari && /Version\s*\/\s*(\d[\d\.]*)/i.test(i) ? e.formatNum(RegExp.$1) : null, e.isOpera = /Opera\s*[\/]?\s*(\d+\.?\d*)/i.test(i), e.verOpera = e.isOpera && (/Version\s*\/\s*(\d+\.?\d*)/i.test(i), 1) ? parseFloat(RegExp.$1, 10) : null, e.addWinEvent("load", e.handler(e.runWLfuncs, e))
        },
        init: function(e) {
            var t, o = this,
                i = { status: -3, plugin: 0 };
            return o.isString(e) ? 1 == e.length ? (o.getVersionDelimiter = e, i) : (e = e.toLowerCase().replace(/\s/g, ""), (t = o.Plugins[e]) && t.getVersion ? (i.plugin = t, o.isDefined(t.installed) || (t.installed = null, t.version = null, t.version0 = null, t.getVersionDone = null, t.pluginName = e), o.garbage = !1, o.isIE && !o.ActiveXEnabled && "java" !== e ? (i.status = -2, i) : (i.status = 1, i)) : i) : i
        },
        fPush: function(e, t) {
            var o = this;
            o.isArray(t) && (o.isFunc(e) || o.isArray(e) && e.length > 0 && o.isFunc(e[0])) && t.push(e)
        },
        callArray: function(e) {
            var t;
            if (this.isArray(e))
                for (t = 0; t < e.length; t++) {
                    if (null === e[t]) return;
                    this.call(e[t]), e[t] = null
                }
        },
        call: function(e) {
            var t = this,
                o = t.isArray(e) ? e.length : -1;
            o > 0 && t.isFunc(e[0]) ? e[0](t, o > 1 ? e[1] : 0, o > 2 ? e[2] : 0, o > 3 ? e[3] : 0) : t.isFunc(e) && e(t)
        },
        getVersionDelimiter: ",",
        $$getVersion: function(e) { return function(t, o, i) { var n, a, r = e.init(t); return r.status < 0 ? null : (1 != (n = r.plugin).getVersionDone && (n.getVersion(null, o, i), null === n.getVersionDone && (n.getVersionDone = 1)), e.cleanup(), a = (a = n.version || n.version0) ? a.replace(e.splitNumRegx, e.getVersionDelimiter) : a) } },
        cleanup: function() { this.garbage && this.isDefined(window.CollectGarbage) && window.CollectGarbage() },
        isActiveXObject: function(e, t) {
            var o = this,
                i = !1,
                n = '<object width="1" height="1" style="display:none" ' + e.getCodeBaseVersion(t) + ">" + e.HTML + o.openTag + "/object>";
            if (!o.head) return i;
            o.head.insertBefore(document.createElement("object"), o.head.firstChild), o.head.firstChild.outerHTML = n;
            try { o.head.firstChild.classid = e.classID } catch (e) {}
            try { o.head.firstChild.object && (i = !0) } catch (e) {}
            try { i && o.head.firstChild.readyState < 4 && (o.garbage = !0) } catch (e) {}
            return o.head.removeChild(o.head.firstChild), i
        },
        codebaseSearch: function(e, t) {
            var o = this;
            if (!o.ActiveXEnabled || !e) return null;
            e.BIfuncs && e.BIfuncs.length && null !== e.BIfuncs[e.BIfuncs.length - 1] && o.callArray(e.BIfuncs);
            var i, n = e.SEARCH;
            if (o.isStrNum(t)) return !!(n.match && n.min && o.compareNums(t, n.min) <= 0) || !(n.match && n.max && o.compareNums(t, n.max) >= 0) && ((i = o.isActiveXObject(e, t)) && (!n.min || o.compareNums(t, n.min) > 0) && (n.min = t), i || n.max && !(o.compareNums(t, n.max) < 0) || (n.max = t), i);
            var a, r, s, l, c, u = [0, 0, 0, 0],
                h = [].concat(n.digits),
                d = n.min ? 1 : 0,
                p = function(t, i) { var n = [].concat(u); return n[t] = i, o.isActiveXObject(e, n.join(",")) };
            if (n.max) {
                for (l = n.max.split(o.splitNumRegx), a = 0; a < l.length; a++) l[a] = parseInt(l[a], 10);
                l[0] < h[0] && (h[0] = l[0])
            }
            if (n.min) {
                for (c = n.min.split(o.splitNumRegx), a = 0; a < c.length; a++) c[a] = parseInt(c[a], 10);
                c[0] > u[0] && (u[0] = c[0])
            }
            if (c && l)
                for (a = 1; a < c.length && c[a - 1] == l[a - 1]; a++) l[a] < h[a] && (h[a] = l[a]), c[a] > u[a] && (u[a] = c[a]);
            if (n.max)
                for (a = 1; a < h.length; a++)
                    if (l[a] > 0 && 0 == h[a] && h[a - 1] < n.digits[a - 1]) { h[a - 1] += 1; break }
            for (a = 0; a < h.length; a++) { for (s = {}, r = 0; r < 20 && !(h[a] - u[a] < 1) && !s["a" + (i = round((h[a] + u[a]) / 2))]; r++) s["a" + i] = 1, p(a, i) ? (u[a] = i, d = 1) : h[a] = i; if (h[a] = u[a], !d && p(a, u[a]) && (d = 1), !d) break }
            return d ? u.join(",") : null
        },
        addWinEvent: function(e, t) {
            var o, i = window;
            this.isFunc(t) && (i.addEventListener ? i.addEventListener(e, t, !1) : i.attachEvent ? i.attachEvent("on" + e, t) : (o = i["on" + e], i["on" + e] = this.winHandler(t, o)))
        },
        winHandler: function(e, t) { return function() { e(), "function" == typeof t && t() } },
        WLfuncs0: [],
        WLfuncs: [],
        runWLfuncs: function(e) { e.winLoaded = !0, e.callArray(e.WLfuncs0), e.callArray(e.WLfuncs), e.onDoneEmptyDiv && e.onDoneEmptyDiv() },
        winLoaded: !1,
        $$onWindowLoaded: function(e) { return function(t) { e.winLoaded ? e.call(t) : e.fPush(t, e.WLfuncs) } },
        div: null,
        divID: "plugindetect",
        divWidth: 50,
        pluginSize: 1,
        emptyDiv: function() {
            var e, t, o, i, n, a = this;
            if (a.div && a.div.childNodes)
                for (e = a.div.childNodes.length - 1; e >= 0; e--) {
                    if ((o = a.div.childNodes[e]) && o.childNodes)
                        for (t = o.childNodes.length - 1; t >= 0; t--) { n = o.childNodes[t]; try { o.removeChild(n) } catch (e) {} }
                    if (o) try { a.div.removeChild(o) } catch (e) {}
                }
            if (a.div || (i = document.getElementById(a.divID)) && (a.div = i), a.div && a.div.parentNode) {
                try { a.div.parentNode.removeChild(a.div) } catch (e) {}
                a.div = null
            }
        },
        DONEfuncs: [],
        onDoneEmptyDiv: function() {
            var e, t, o = this;
            if (o.winLoaded && (!o.WLfuncs || !o.WLfuncs.length || null === o.WLfuncs[o.WLfuncs.length - 1])) {
                for (e in o)
                    if ((t = o[e]) && t.funcs) { if (3 == t.OTF) return; if (t.funcs.length && null !== t.funcs[t.funcs.length - 1]) return }
                for (e = 0; e < o.DONEfuncs.length; e++) o.callArray(o.DONEfuncs);
                o.emptyDiv()
            }
        },
        getWidth: function(e) { if (e) { var t = e.scrollWidth || e.offsetWidth; if (this.isNum(t)) return t } return -1 },
        getTagStatus: function(e, t, o, i) {
            var n = this,
                a = e.span,
                r = n.getWidth(a),
                s = o.span,
                l = n.getWidth(s),
                c = t.span,
                u = n.getWidth(c);
            if (!(a && s && c && n.getDOMobj(e))) return -2;
            if (l < u || r < 0 || l < 0 || u < 0 || u <= n.pluginSize || n.pluginSize < 1) return 0;
            if (r >= u) return -1;
            try { if (r == n.pluginSize && (!n.isIE || 4 == n.getDOMobj(e).readyState)) { if (!e.winLoaded && n.winLoaded) return 1; if (e.winLoaded && n.isNum(i) && (n.isNum(e.count) || (e.count = i), i - e.count >= 10)) return 1 } } catch (e) {}
            return 0
        },
        getDOMobj: function(e, t) {
            var o = e ? e.span : 0,
                i = o && o.firstChild ? 1 : 0;
            try { i && t && this.div.focus() } catch (e) {}
            return i ? o.firstChild : null
        },
        setStyle: function(e, t) {
            var o, i = e.style;
            if (i && t)
                for (o = 0; o < t.length; o += 2) try { i[t[o]] = t[o + 1] } catch (e) {}
        },
        insertDivInBody: function(e, t) {
            var o = "pd33993399",
                i = null,
                n = t ? window.top.document : window.document,
                a = n.getElementsByTagName("body")[0] || n.body;
            if (!a) try { n.write('<div id="' + o + '">.' + this.openTag + "/div>"), i = n.getElementById(o) } catch (e) {}(a = n.getElementsByTagName("body")[0] || n.body) && (a.insertBefore(e, a.firstChild), i && a.removeChild(i))
        },
        insertHTML: function(e, t, o, i, n) {
            var a, r, s, l = document,
                c = this,
                u = l.createElement("span"),
                h = ["outlineStyle", "none", "borderStyle", "none", "padding", "0px", "margin", "0px", "visibility", "visible"];
            if (c.isDefined(i) || (i = ""), c.isString(e) && /[^\s]/.test(e)) {
                for (e = e.toLowerCase().replace(/\s/g, ""), a = c.openTag + e + ' width="' + c.pluginSize + '" height="' + c.pluginSize + '" ', a += 'style="outline-style:none;border-style:none;padding:0px;margin:0px;visibility:visible;display:inline;" ', r = 0; r < t.length; r += 2) /[^\s]/.test(t[r + 1]) && (a += t[r] + '="' + t[r + 1] + '" ');
                for (a += ">", r = 0; r < o.length; r += 2) /[^\s]/.test(o[r + 1]) && (a += c.openTag + 'param name="' + o[r] + '" value="' + o[r + 1] + '" />');
                a += i + c.openTag + "/" + e + ">"
            } else a = i;
            if (c.div || ((s = l.getElementById(c.divID)) ? c.div = s : (c.div = l.createElement("div"), c.div.id = c.divID), c.setStyle(c.div, h.concat(["width", c.divWidth + "px", "height", c.pluginSize + 3 + "px", "fontSize", c.pluginSize + 3 + "px", "lineHeight", c.pluginSize + 3 + "px", "verticalAlign", "baseline", "display", "block"])), s || (c.setStyle(c.div, ["position", "absolute", "right", "0px", "top", "0px"]), c.insertDivInBody(c.div))), c.div && c.div.parentNode) { c.setStyle(u, h.concat(["fontSize", c.pluginSize + 3 + "px", "lineHeight", c.pluginSize + 3 + "px", "verticalAlign", "baseline", "display", "inline"])); try { u.innerHTML = a } catch (e) {} try { c.div.appendChild(u) } catch (e) {} return { span: u, winLoaded: c.winLoaded, tagName: e, outerHTML: a } }
            return { span: null, winLoaded: c.winLoaded, tagName: "", outerHTML: a }
        },
        Plugins: {
            quicktime: {
                mimeType: ["video/quicktime", "application/x-quicktimeplayer", "image/x-macpaint", "image/x-quicktime"],
                progID: "QuickTimeCheckObject.QuickTimeCheck.1",
                progID0: "QuickTime.QuickTime",
                classID: "clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B",
                minIEver: 7,
                HTML: '<param name="src" value="" /><param name="controller" value="false" />',
                getCodeBaseVersion: function(e) { return 'codebase="#version=' + e + '"' },
                SEARCH: { min: 0, max: 0, match: 0, digits: [16, 128, 128, 0] },
                getVersion: function(e) {
                    var t, o = this,
                        i = o.$,
                        n = null,
                        a = null;
                    if (i.isIE) {
                        if (i.isStrNum(e) && ((t = e.split(i.splitNumRegx)).length > 3 && parseInt(t[3], 10) > 0 && (t[3] = "9999"), e = t.join(",")), i.isStrNum(e) && i.verIE >= o.minIEver && o.canUseIsMin() > 0) return o.installed = o.isMin(e), void(o.getVersionDone = 0);
                        o.getVersionDone = 1, !n && i.verIE >= o.minIEver && (n = o.CDBASE2VER(i.codebaseSearch(o))), n || (a = i.getAXO(o.progID)) && a.QuickTimeVersion && (n = a.QuickTimeVersion.toString(16), n = parseInt(n.charAt(0), 16) + "." + parseInt(n.charAt(1), 16) + "." + parseInt(n.charAt(2), 16))
                    } else i.hasMimeType(o.mimeType) && (a = 3 != i.OS ? i.findNavPlugin("QuickTime.*Plug-?in", 0) : null) && a.name && (n = i.getNum(a.name));
                    o.installed = n ? 1 : a ? 0 : -1, o.version = i.formatNum(n, 3)
                },
                cdbaseUpper: ["7,60,0,0", "0,0,0,0"],
                cdbaseLower: ["7,50,0,0", null],
                cdbase2ver: [function(e, t) { var o = t.split(e.$.splitNumRegx); return [o[0], o[1].charAt(0), o[1].charAt(1), o[2]].join(",") }, null],
                CDBASE2VER: function(e) {
                    var t, o = this,
                        i = o.$,
                        n = o.cdbaseUpper,
                        a = o.cdbaseLower;
                    if (e)
                        for (e = i.formatNum(e), t = 0; t < n.length; t++)
                            if (n[t] && i.compareNums(e, n[t]) < 0 && a[t] && i.compareNums(e, a[t]) >= 0 && o.cdbase2ver[t]) return o.cdbase2ver[t](o, e);
                    return e
                },
                canUseIsMin: function() {
                    var e, t = this,
                        o = t.$,
                        i = t.canUseIsMin,
                        n = t.cdbaseUpper,
                        a = t.cdbaseLower;
                    if (!i.value)
                        for (i.value = -1, e = 0; e < n.length; e++) { if (n[e] && o.codebaseSearch(t, n[e])) { i.value = 1; break } if (a[e] && o.codebaseSearch(t, a[e])) { i.value = -1; break } }
                    return t.SEARCH.match = 1 == i.value ? 1 : 0, i.value
                },
                isMin: function(e) { return this.$.codebaseSearch(this, e) ? .7 : -1 }
            },
            flash: {
                mimeType: "application/x-shockwave-flash",
                progID: "ShockwaveFlash.ShockwaveFlash",
                classID: "clsid:D27CDB6E-AE6D-11CF-96B8-444553540000",
                getVersion: function() {
                    var e, t, o, i, n = function(e) { if (!e) return null; var t = /[\d][\d\,\.\s]*[rRdD]{0,1}[\d\,]*/.exec(e); return t ? t[0].replace(/[rRdD\.]/g, ",").replace(/\s/g, "") : null },
                        a = this,
                        r = a.$,
                        s = null,
                        l = null,
                        c = null;
                    if (r.isIE) {
                        for (e = 15; e > 2; e--)
                            if (l = r.getAXO(a.progID + "." + e)) { c = e.toString(); break }
                        if (l || (l = r.getAXO(a.progID)), "6" == c) try { l.AllowScriptAccess = "always" } catch (e) { return "6,0,21,0" }
                        try { s = n(l.GetVariable("$version")) } catch (e) {}!s && c && (s = c)
                    } else {
                        if (o = r.hasMimeType(a.mimeType)) { t = r.getDOMobj(r.insertHTML("object", ["type", a.mimeType], [], "", a)); try { s = r.getNum(t.GetVariable("$version")) } catch (e) {} }
                        s || ((i = o ? o.enabledPlugin : null) && i.description && (s = n(i.description)), s && (s = r.getPluginFileVersion(i, s)))
                    }
                    return a.installed = s ? 1 : -1, a.version = r.formatNum(s), !0
                }
            },
            shockwave: {
                mimeType: "application/x-director",
                progID: "SWCtl.SWCtl",
                classID: "clsid:166B1BCA-3F9C-11CF-8075-444553540000",
                getVersion: function() {
                    var e, t = null,
                        o = null,
                        i = this,
                        n = i.$;
                    if (n.isIE) {
                        try { o = n.getAXO(i.progID).ShockwaveVersion("") } catch (e) {}
                        n.isString(o) && o.length > 0 ? t = n.getNum(o) : n.getAXO(i.progID + ".8") ? t = "8" : n.getAXO(i.progID + ".7") ? t = "7" : n.getAXO(i.progID + ".1") && (t = "6")
                    } else(e = n.findNavPlugin("Shockwave\\s*for\\s*Director")) && e.description && n.hasMimeType(i.mimeType) && (t = n.getNum(e.description)), t && (t = n.getPluginFileVersion(e, t));
                    i.installed = t ? 1 : -1, i.version = n.formatNum(t)
                }
            },
            zz: 0
        }
    };
    PluginDetect.initScript();
    var gArgCountErr = 'The "%%" function requires an even number of arguments.\nArguments should be in the form "atttributeName", "attributeValue", ...',
        gTagAttrs = null,
        gQTGeneratorVersion = 1;

    function AC_QuickTimeVersion() { return gQTGeneratorVersion }

    function _QTComplain(e, t) { t = t.replace("%%", e), alert(t) }

    function _QTAddAttribute(e, t, o) { var i; return null == (i = gTagAttrs[e + t]) && (i = gTagAttrs[t]), null != i ? (0 == t.indexOf(e) && null == o && (o = t.substring(e.length)), null == o && (o = t), o + '="' + i + '" ') : "" }

    function _QTAddObjectAttr(e, t) { return 0 == e.indexOf("emb#") ? "" : (0 == e.indexOf("obj#") && null == t && (t = e.substring(4)), _QTAddAttribute("obj#", e, t)) }

    function _QTAddEmbedAttr(e, t) { return 0 == e.indexOf("obj#") ? "" : (0 == e.indexOf("emb#") && null == t && (t = e.substring(4)), _QTAddAttribute("emb#", e, t)) }

    function _QTAddObjectParam(e, t) {
        var o, i = "",
            n = t ? " />" : ">";
        return -1 == e.indexOf("emb#") && (null == (o = gTagAttrs["obj#" + e]) && (o = gTagAttrs[e]), 0 == e.indexOf("obj#") && (e = e.substring(4)), null != o && (i = '  <param name="' + e + '" value="' + o + '"' + n + "\n")), i
    }

    function _QTDeleteTagAttrs() {
        for (var e = 0; e < arguments.length; e++) {
            var t = arguments[e];
            delete gTagAttrs[t], delete gTagAttrs["emb#" + t], delete gTagAttrs["obj#" + t]
        }
    }

    function _QTGenerate(e, t, o) {
        if (4 > o.length || 0 != o.length % 2) return _QTComplain(e, gArgCountErr), "";
        (gTagAttrs = []).src = o[0], gTagAttrs.width = o[1], gTagAttrs.height = o[2], gTagAttrs.classid = "clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B", gTagAttrs.pluginspage = "http://www.apple.com/quicktime/download/", null != (e = o[3]) && "" != e || (e = "6,0,2,0"), gTagAttrs.codebase = "http://www.apple.com/qtactivex/qtplugin.cab#version=" + e;
        for (var i, n = 4; n < o.length; n += 2) i = o[n].toLowerCase(), e = o[n + 1], "name" == i || "id" == i ? gTagAttrs.name = e : gTagAttrs[i] = e;
        for (i in o = "<object " + _QTAddObjectAttr("classid") + _QTAddObjectAttr("width") + _QTAddObjectAttr("height") + _QTAddObjectAttr("codebase") + _QTAddObjectAttr("name", "id") + _QTAddObjectAttr("tabindex") + _QTAddObjectAttr("hspace") + _QTAddObjectAttr("vspace") + _QTAddObjectAttr("border") + _QTAddObjectAttr("align") + _QTAddObjectAttr("class") + _QTAddObjectAttr("title") + _QTAddObjectAttr("accesskey") + _QTAddObjectAttr("noexternaldata") + ">\n" + _QTAddObjectParam("src", t), n = "  <embed " + _QTAddEmbedAttr("src") + _QTAddEmbedAttr("width") + _QTAddEmbedAttr("height") + _QTAddEmbedAttr("pluginspage") + _QTAddEmbedAttr("name") + _QTAddEmbedAttr("align") + _QTAddEmbedAttr("tabindex"), _QTDeleteTagAttrs("src", "width", "height", "pluginspage", "classid", "codebase", "name", "tabindex", "hspace", "vspace", "border", "align", "noexternaldata", "class", "title", "accesskey"), gTagAttrs) null != (e = gTagAttrs[i]) && (n += _QTAddEmbedAttr(i), o += _QTAddObjectParam(i, t));
        return o + n + "> </embed>\n</object>"
    }

    function QT_GenerateOBJECTText() { return _QTGenerate("QT_GenerateOBJECTText", !1, arguments) }! function() {
        function e(e) { return "#" + (e = e || location.href).replace(/^[^#]*#?(.*)$/, "$1") }
        var t, o = document,
            i = $.event.special,
            n = o.documentMode,
            a = "oniLightBoxHashChange" in window && (void 0 === n || 7 < n);
        $.fn.iLightBoxHashChange = function(e) { return e ? this.on("iLightBoxHashChange", e) : this.trigger("iLightBoxHashChange") }, $.fn.iLightBoxHashChange.delay = 50, i.iLightBoxHashChange = $.extend(i.iLightBoxHashChange, {
            setup: function() {
                if (a) return !1;
                $(t.start)
            },
            teardown: function() {
                if (a) return !1;
                $(t.stop)
            }
        }), t = function() {
            function t() {
                var o = e(),
                    n = h(l);
                o !== l ? (u(l = o, n), $(window).trigger("iLightBoxHashChange")) : n !== l && (location.href = location.href.replace(/#.*/, "") + n), i = setTimeout(t, $.fn.iLightBoxHashChange.delay)
            }
            var i, n, r, s = {},
                l = e(),
                c = function(e) { return e },
                u = c,
                h = c;
            return s.start = function() { i || t() }, s.stop = function() { i && clearTimeout(i), i = void 0 }, browser.msie && !a && (s.start = function() { n || (r = (r = $.fn.iLightBoxHashChange.src) && r + e(), n = $('<iframe tabindex="-1" title="empty"/>').hide().one("load", function() { r || u(e()), t() }).attr("src", r || "javascript:0").insertAfter("body")[0].contentWindow, o.onpropertychange = function() { try { "title" === event.propertyName && (n.document.title = o.title) } catch (e) {} }) }, s.stop = c, h = function() { return e(n.location.href) }, u = function(e, t) {
                var i = n.document,
                    a = $.fn.iLightBoxHashChange.domain;
                e !== t && (i.title = o.title, i.open(), a && i.write('<script>document.domain="' + a + '"<\/script>'), i.close(), n.location.hash = e)
            }), s
        }()
    }(), Array.prototype.filter || (Array.prototype.filter = function(e) {
        "use strict";
        if (null == this) throw new TypeError;
        var t = Object(this),
            o = t.length >>> 0;
        if ("function" != typeof e) throw new TypeError;
        for (var i = [], n = arguments[1], a = 0; a < o; a++)
            if (a in t) {
                var r = t[a];
                e.call(n, r, a, t) && i.push(r)
            }
        return i
    }), Array.prototype.indexOf || (Array.prototype.indexOf = function(e, t) {
        var o;
        if (null == this) throw new TypeError('"this" is null or not defined');
        var i = Object(this),
            n = i.length >>> 0;
        if (0 === n) return -1;
        var a = +t || 0;
        if (abs(a) === 1 / 0 && (a = 0), a >= n) return -1;
        for (o = max(a >= 0 ? a : n - abs(a), 0); o < n;) {
            if (o in i && i[o] === e) return o;
            o++
        }
        return -1
    }), Array.prototype.lastIndexOf || (Array.prototype.lastIndexOf = function(e) {
        "use strict";
        if (null == this) throw new TypeError;
        var t = Object(this),
            o = t.length >>> 0;
        if (0 === o) return -1;
        var i = o;
        arguments.length > 1 && ((i = Number(arguments[1])) != i ? i = 0 : 0 != i && i != 1 / 0 && i != -1 / 0 && (i = (i > 0 || -1) * floor(abs(i))));
        for (var n = i >= 0 ? min(i, o - 1) : o - abs(i); n >= 0; n--)
            if (n in t && t[n] === e) return n;
        return -1
    })
}(jQuery, this);
! function(e) { "function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery) }(function(e, i) {
    "use strict";
    e.infinitescroll = function(i, t, o) { this.element = e(o), this._create(i, t) || (this.failed = !0) }, e.infinitescroll.defaults = { loading: { finished: i, finishedMsg: "<em>Congratulations, you've reached the end of the internet.</em>", img: "data:image/gif;base64,R0lGODlh3AATAPQeAPDy+MnQ6LW/4N3h8MzT6rjC4sTM5r/I5NHX7N7j8c7U6tvg8OLl8uXo9Ojr9b3G5MfP6Ovu9tPZ7PT1+vX2+tbb7vf4+8/W69jd7rC73vn5/O/x+K243ai02////wAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQECgD/ACwAAAAA3AATAAAF/6AnjmRpnmiqrmzrvnAsz3Rt33iu73zv/8CgcEj0BAScpHLJbDqf0Kh0Sq1ar9isdioItAKGw+MAKYMFhbF63CW438f0mg1R2O8EuXj/aOPtaHx7fn96goR4hmuId4qDdX95c4+RBIGCB4yAjpmQhZN0YGYGXitdZBIVGAsLoq4BBKQDswm1CQRkcG6ytrYKubq8vbfAcMK9v7q7EMO1ycrHvsW6zcTKsczNz8HZw9vG3cjTsMIYqQkCLBwHCgsMDQ4RDAYIqfYSFxDxEfz88/X38Onr16+Bp4ADCco7eC8hQYMAEe57yNCew4IVBU7EGNDiRn8Z831cGLHhSIgdFf9chIeBg7oA7gjaWUWTVQAGE3LqBDCTlc9WOHfm7PkTqNCh54rePDqB6M+lR536hCpUqs2gVZM+xbrTqtGoWqdy1emValeXKzggYBBB5y1acFNZmEvXAoN2cGfJrTv3bl69Ffj2xZt3L1+/fw3XRVw4sGDGcR0fJhxZsF3KtBTThZxZ8mLMgC3fRatCbYMNFCzwLEqLgE4NsDWs/tvqdezZf13Hvk2A9Szdu2X3pg18N+68xXn7rh1c+PLksI/Dhe6cuO3ow3NfV92bdArTqC2Ebd3A8vjf5QWfH6Bg7Nz17c2fj69+fnq+8N2Lty+fuP78/eV2X13neIcCeBRwxorbZrA1ANoCDGrgoG8RTshahQ9iSKEEzUmYIYfNWViUhheCGJyIP5E4oom7WWjgCeBFAJNv1DVV01MAdJhhjdkplWNzO/5oXI846njjVEIqR2OS2B1pE5PVscajkxhMycqLJghQSwT40PgfAl4GqNSXYdZXJn5gSkmmmmJu1aZYb14V51do+pTOCmA40AqVCIhG5IJ9PvYnhIFOxmdqhpaI6GeHCtpooisuutmg+Eg62KOMKuqoTaXgicQWoIYq6qiklmoqFV0UoeqqrLbq6quwxirrrLTWauutJ4QAACH5BAUKABwALAcABADOAAsAAAX/IPd0D2dyRCoUp/k8gpHOKtseR9yiSmGbuBykler9XLAhkbDavXTL5k2oqFqNOxzUZPU5YYZd1XsD72rZpBjbeh52mSNnMSC8lwblKZGwi+0QfIJ8CncnCoCDgoVnBHmKfByGJimPkIwtiAeBkH6ZHJaKmCeVnKKTHIihg5KNq4uoqmEtcRUtEREMBggtEr4QDrjCuRC8h7/BwxENeicSF8DKy82pyNLMOxzWygzFmdvD2L3P0dze4+Xh1Arkyepi7dfFvvTtLQkZBC0T/FX3CRgCMOBHsJ+EHYQY7OinAGECgQsB+Lu3AOK+CewcWjwxQeJBihtNGHSoQOE+iQ3//4XkwBBhRZMcUS6YSXOAwIL8PGqEaSJCiYt9SNoCmnJPAgUVLChdaoFBURN8MAzl2PQphwQLfDFd6lTowglHve6rKpbjhK7/pG5VinZP1qkiz1rl4+tr2LRwWU64cFEihwEtZgbgR1UiHaMVvxpOSwBA37kzGz9e8G+B5MIEKLutOGEsAH2ATQwYfTmuX8aETWdGPZmiZcccNSzeTCA1Sw0bdiitC7LBWgu8jQr8HRzqgpK6gX88QbrB14z/kF+ELpwB8eVQj/JkqdylAudji/+ts3039vEEfK8Vz2dlvxZKG0CmbkKDBvllRd6fCzDvBLKBDSCeffhRJEFebFk1k/Mv9jVIoIJZSeBggwUaNeB+Qk34IE0cXlihcfRxkOAJFFhwGmKlmWDiakZhUJtnLBpnWWcnKaAZcxI0piFGGLBm1mc90kajSCveeBVWKeYEoU2wqeaQi0PetoE+rr14EpVC7oAbAUHqhYExbn2XHHsVqbcVew9tx8+XJKk5AZsqqdlddGpqAKdbAYBn1pcczmSTdWvdmZ17c1b3FZ99vnTdCRFM8OEcAhLwm1NdXnWcBBSMRWmfkWZqVlsmLIiAp/o1gGV2vpS4lalGYsUOqXrddcKCmK61aZ8SjEpUpVFVoCpTj4r661Km7kBHjrDyc1RAIQAAIfkEBQoAGwAsBwAEAM4ACwAABf/gtmUCd4goQQgFKj6PYKi0yrrbc8i4ohQt12EHcal+MNSQiCP8gigdz7iCioaCIvUmZLp8QBzW0EN2vSlCuDtFKaq4RyHzQLEKZNdiQDhRDVooCwkbfm59EAmKi4SGIm+AjIsKjhsqB4mSjT2IOIOUnICeCaB/mZKFNTSRmqVpmJqklSqskq6PfYYCDwYHDC4REQwGCBLGxxIQDsHMwhAIX8bKzcENgSLGF9PU1j3Sy9zX2NrgzQziChLk1BHWxcjf7N046tvN82715czn9Pryz6Ilc4ACj4EBOCZM8KEnAYYADBRKnACAYUMFv1wotIhCEcaJCisqwJFgAUSQGyX/kCSVUUTIdKMwJlyo0oXHlhskwrTJciZHEXsgaqS4s6PJiCAr1uzYU8kBBSgnWFqpoMJMUjGtDmUwkmfVmVypakWhEKvXsS4nhLW5wNjVroJIoc05wSzTr0PtiigpYe4EC2vj4iWrFu5euWIMRBhacaVJhYQBEFjA9jHjyQ0xEABwGceGAZYjY0YBOrRLCxUp29QM+bRkx5s7ZyYgVbTqwwti2ybJ+vLtDYpycyZbYOlptxdx0kV+V7lC5iJAyyRrwYKxAdiz82ng0/jnAdMJFz0cPi104Ec1Vj9/M6F173vKL/feXv156dw11tlqeMMnv4V5Ap53GmjQQH97nFfg+IFiucfgRX5Z8KAgbUlQ4IULIlghhhdOSB6AgX0IVn8eReghen3NRIBsRgnH4l4LuEidZBjwRpt6NM5WGwoW0KSjCwX6yJSMab2GwwAPDXfaBCtWpluRTQqC5JM5oUZAjUNS+VeOLWpJEQ7VYQANW0INJSZVDFSnZphjSikfmzE5N4EEbQI1QJmnWXCmHulRp2edwDXF43txukenJwvI9xyg9Q26Z3MzGUcBYFEChZh6DVTq34AU8Iflh51Sd+CnKFYQ6mmZkhqfBKfSxZWqA9DZanWjxmhrWwi0qtCrt/43K6WqVjjpmhIqgEGvculaGKklKstAACEAACH5BAUKABwALAcABADOAAsAAAX/ICdyQmaMYyAUqPgIBiHPxNpy79kqRXH8wAPsRmDdXpAWgWdEIYm2llCHqjVHU+jjJkwqBTecwItShMXkEfNWSh8e1NGAcLgpDGlRgk7EJ/6Ae3VKfoF/fDuFhohVeDeCfXkcCQqDVQcQhn+VNDOYmpSWaoqBlUSfmowjEA+iEAEGDRGztAwGCDcXEA60tXEiCrq8vREMEBLIyRLCxMWSHMzExnbRvQ2Sy7vN0zvVtNfU2tLY3rPgLdnDvca4VQS/Cpk3ABwSLQkYAQwT/P309vcI7OvXr94jBQMJ/nskkGA/BQBRLNDncAIAiDcG6LsxAWOLiQzmeURBKWSLCQbv/1F0eDGinJUKR47YY1IEgQASKk7Yc7ACRwZm7mHweRJoz59BJUogisKCUaFMR0x4SlJBVBFTk8pZivTR0K73rN5wqlXEAq5Fy3IYgHbEzQ0nLy4QSoCjXLoom96VOJEeCosK5n4kkFfqXjl94wa+l1gvAcGICbewAOAxY8l/Ky/QhAGz4cUkGxu2HNozhwMGBnCUqUdBg9UuW9eUynqSwLHIBujePef1ZGQZXcM+OFuEBeBhi3OYgLyqcuaxbT9vLkf4SeqyWxSQpKGB2gQpm1KdWbu72rPRzR9Ne2Nu9Kzr/1Jqj0yD/fvqP4aXOt5sW/5qsXXVcv1Nsp8IBUAmgswGF3llGgeU1YVXXKTN1FlhWFXW3gIE+DVChApysACHHo7Q4A35lLichh+ROBmLKAzgYmYEYDAhCgxKGOOMn4WR4kkDaoBBOxJtdNKQxFmg5JIWIBnQc07GaORfUY4AEkdV6jHlCEISSZ5yTXpp1pbGZbkWmcuZmQCaE6iJ0FhjMaDjTMsgZaNEHFRAQVp3bqXnZED1qYcECOz5V6BhSWCoVJQIKuKQi2KFKEkEFAqoAo7uYSmO3jk61wUUMKmknJ4SGimBmAa0qVQBhAAAIfkEBQoAGwAsBwAEAM4ACwAABf/gJm5FmRlEqhJC+bywgK5pO4rHI0D3pii22+Mg6/0Ej96weCMAk7cDkXf7lZTTnrMl7eaYoy10JN0ZFdco0XAuvKI6qkgVFJXYNwjkIBcNBgR8TQoGfRsJCRuCYYQQiI+ICosiCoGOkIiKfSl8mJkHZ4U9kZMbKaI3pKGXmJKrngmug4WwkhA0lrCBWgYFCCMQFwoQDRHGxwwGCBLMzRLEx8iGzMMO0cYNeCMKzBDW19lnF9DXDIY/48Xg093f0Q3s1dcR8OLe8+Y91OTv5wrj7o7B+7VNQqABIoRVCMBggsOHE36kSoCBIcSH3EbFangxogJYFi8CkJhqQciLJEf/LDDJEeJIBT0GsOwYUYJGBS0fjpQAMidGmyVP6sx4Y6VQhzs9VUwkwqaCCh0tmKoFtSMDmBOf9phg4SrVrROuasRQAaxXpVUhdsU6IsECZlvX3kwLUWzRt0BHOLTbNlbZG3vZinArge5Dvn7wbqtQkSYAAgtKmnSsYKVKo2AfW048uaPmG386i4Q8EQMBAIAnfB7xBxBqvapJ9zX9WgRS2YMpnvYMGdPK3aMjt/3dUcNI4blpj7iwkMFWDXDvSmgAlijrt9RTR78+PS6z1uAJZIe93Q8g5zcsWCi/4Y+C8bah5zUv3vv89uft30QP23punGCx5954oBBwnwYaNCDY/wYrsYeggnM9B2Fpf8GG2CEUVWhbWAtGouEGDy7Y4IEJVrbSiXghqGKIo7z1IVcXIkKWWR361QOLWWnIhwERpLaaCCee5iMBGJQmJGyPFTnbkfHVZGRtIGrg5HALEJAZbu39BuUEUmq1JJQIPtZilY5hGeSWsSk52G9XqsmgljdIcABytq13HyIM6RcUA+r1qZ4EBF3WHWB29tBgAzRhEGhig8KmqKFv8SeCeo+mgsF7YFXa1qWSbkDpom/mqR1PmHCqJ3fwNRVXjC7S6CZhFVCQ2lWvZiirhQq42SACt25IK2hv8TprriUV1usGgeka7LFcNmCldMLi6qZMgFLgpw16Cipb7bC1knXsBiEAACH5BAUKABsALAcABADOAAsAAAX/4FZsJPkUmUGsLCEUTywXglFuSg7fW1xAvNWLF6sFFcPb42C8EZCj24EJdCp2yoegWsolS0Uu6fmamg8n8YYcLU2bXSiRaXMGvqV6/KAeJAh8VgZqCX+BexCFioWAYgqNi4qAR4ORhRuHY408jAeUhAmYYiuVlpiflqGZa5CWkzc5fKmbbhIpsAoQDRG8vQwQCBLCwxK6vb5qwhfGxxENahvCEA7NzskSy7vNzzzK09W/PNHF1NvX2dXcN8K55cfh69Luveol3vO8zwi4Yhj+AQwmCBw4IYclDAAJDlQggVOChAoLKkgFkSCAHDwWLKhIEOONARsDKryogFPIiAUb/95gJNIiw4wnI778GFPhzBKFOAq8qLJEhQpiNArjMcHCmlTCUDIouTKBhApELSxFWiGiVKY4E2CAekPgUphDu0742nRrVLJZnyrFSqKQ2ohoSYAMW6IoDpNJ4bLdILTnAj8KUF7UeENjAKuDyxIgOuGiOI0EBBMgLNew5AUrDTMGsFixwBIaNCQuAXJB57qNJ2OWm2Aj4skwCQCIyNkhhtMkdsIuodE0AN4LJDRgfLPtn5YDLdBlraAByuUbBgxQwICxMOnYpVOPej074OFdlfc0TqC62OIbcppHjV4o+LrieWhfT8JC/I/T6W8oCl29vQ0XjLdBaA3s1RcPBO7lFvpX8BVoG4O5jTXRQRDuJ6FDTzEWF1/BCZhgbyAKE9qICYLloQYOFtahVRsWYlZ4KQJHlwHS/IYaZ6sZd9tmu5HQm2xi1UaTbzxYwJk/wBF5g5EEYOBZeEfGZmNdFyFZmZIR4jikbLThlh5kUUVJGmRT7sekkziRWUIACABk3T4qCsedgO4xhgGcY7q5pHJ4klBBTQRJ0CeHcoYHHUh6wgfdn9uJdSdMiebGJ0zUPTcoS286FCkrZxnYoYYKWLkBowhQoBeaOlZAgVhLidrXqg2GiqpQpZ4apwSwRtjqrB3muoF9BboaXKmshlqWqsWiGt2wphJkQbAU5hoCACH5BAUKABsALAcABADOAAsAAAX/oGFw2WZuT5oZROsSQnGaKjRvilI893MItlNOJ5v5gDcFrHhKIWcEYu/xFEqNv6B1N62aclysF7fsZYe5aOx2yL5aAUGSaT1oTYMBwQ5VGCAJgYIJCnx1gIOBhXdwiIl7d0p2iYGQUAQBjoOFSQR/lIQHnZ+Ue6OagqYzSqSJi5eTpTxGcjcSChANEbu8DBAIEsHBChe5vL13G7fFuscRDcnKuM3H0La3EA7Oz8kKEsXazr7Cw9/Gztar5uHHvte47MjktznZ2w0G1+D3BgirAqJmJMAQgMGEgwgn5Ei0gKDBhBMALGRYEOJBb5QcWlQo4cbAihZz3GgIMqFEBSM1/4ZEOWPAgpIIJXYU+PIhRG8ja1qU6VHlzZknJNQ6UanCjQkWCIGSUGEjAwVLjc44+DTqUQtPPS5gejUrTa5TJ3g9sWCr1BNUWZI161StiQUDmLYdGfesibQ3XMq1OPYthrwuA2yU2LBs2cBHIypYQPPlYAKFD5cVvNPtW8eVGbdcQADATsiNO4cFAPkvHpedPzc8kUcPgNGgZ5RNDZG05reoE9s2vSEP79MEGiQGy1qP8LA4ZcdtsJE48ONoLTBtTV0B9LsTnPceoIDBDQvS7W7vfjVY3q3eZ4A339J4eaAmKqU/sV58HvJh2RcnIBsDUw0ABqhBA5aV5V9XUFGiHfVeAiWwoFgJJrIXRH1tEMiDFV4oHoAEGlaWhgIGSGBO2nFomYY3mKjVglidaNYJGJDkWW2xxTfbjCbVaOGNqoX2GloR8ZeTaECS9pthRGJH2g0b3Agbk6hNANtteHD2GJUucfajCQBy5OOTQ25ZgUPvaVVQmbKh9510/qQpwXx3SQdfk8tZJOd5b6JJFplT3ZnmmX3qd5l1eg5q00HrtUkUn0AKaiGjClSAgKLYZcgWXwocGRcCFGCKwSB6ceqphwmYRUFYT/1WKlOdUpipmxW0mlCqHjYkAaeoZlqrqZ4qd+upQKaapn/AmgAegZ8KUtYtFAQQAgAh+QQFCgAbACwHAAQAzgALAAAF/+C2PUcmiCiZGUTrEkKBis8jQEquKwU5HyXIbEPgyX7BYa5wTNmEMwWsSXsqFbEh8DYs9mrgGjdK6GkPY5GOeU6ryz7UFopSQEzygOGhJBjoIgMDBAcBM0V/CYqLCQqFOwobiYyKjn2TlI6GKC2YjJZknouaZAcQlJUHl6eooJwKooobqoewrJSEmyKdt59NhRKFMxLEEA4RyMkMEAjDEhfGycqAG8TQx9IRDRDE3d3R2ctD1RLg0ttKEnbY5wZD3+zJ6M7X2RHi9Oby7u/r9g38UFjTh2xZJBEBMDAboogAgwkQI07IMUORwocSJwCgWDFBAIwZOaJIsOBjRogKJP8wTODw5ESVHVtm3AhzpEeQElOuNDlTZ0ycEUWKWFASqEahGwYUPbnxoAgEdlYSqDBkgoUNClAlIHbSAoOsqCRQnQHxq1axVb06FWFxLIqyaze0Tft1JVqyE+pWXMD1pF6bYl3+HTqAWNW8cRUFzmih0ZAAB2oGKukSAAGGRHWJgLiR6AylBLpuHKKUMlMCngMpDSAa9QIUggZVVvDaJobLeC3XZpvgNgCmtPcuwP3WgmXSq4do0DC6o2/guzcseECtUoO0hmcsGKDgOt7ssBd07wqesAIGZC1YIBa7PQHvb1+SFo+++HrJSQfB33xfav3i5eX3Hnb4CTJgegEq8tH/YQEOcIJzbm2G2EoYRLgBXFpVmFYDcREV4HIcnmUhiGBRouEMJGJGzHIspqgdXxK0yCKHRNXoIX4uorCdTyjkyNtdPWrA4Up82EbAbzMRxxZRR54WXVLDIRmRcag5d2R6ugl3ZXzNhTecchpMhIGVAKAYpgJjjsSklBEd99maZoo535ZvdamjBEpusJyctg3h4X8XqodBMx0tiNeg/oGJaKGABpogS40KSqiaEgBqlQWLUtqoVQnytekEjzo0hHqhRorppOZt2p923M2AAV+oBtpAnnPNoB6HaU6mAAIU+IXmi3j2mtFXuUoHKwXpzVrsjcgGOauKEjQrwq157hitGq2NoWmjh7z6Wmxb0m5w66+2VRAuXN/yFUAIACH5BAUKABsALAcABADOAAsAAAX/4CZuRiaM45MZqBgIRbs9AqTcuFLE7VHLOh7KB5ERdjJaEaU4ClO/lgKWjKKcMiJQ8KgumcieVdQMD8cbBeuAkkC6LYLhOxoQ2PF5Ys9PKPBMen17f0CCg4VSh32JV4t8jSNqEIOEgJKPlkYBlJWRInKdiJdkmQlvKAsLBxdABA4RsbIMBggtEhcQsLKxDBC2TAS6vLENdJLDxMZAubu8vjIbzcQRtMzJz79S08oQEt/guNiyy7fcvMbh4OezdAvGrakLAQwyABsELQkY9BP+//ckyPDD4J9BfAMh1GsBoImMeQUN+lMgUJ9CiRMa5msxoB9Gh/o8GmxYMZXIgxtR/yQ46S/gQAURR0pDwYDfywoyLPip5AdnCwsMFPBU4BPFhKBDi444quCmDKZOfwZ9KEGpCKgcN1jdALSpPqIYsabS+nSqvqplvYqQYAeDPgwKwjaMtiDl0oaqUAyo+3TuWwUAMPpVCfee0cEjVBGQq2ABx7oTWmQk4FglZMGN9fGVDMCuiH2AOVOu/PmyxM630gwM0CCn6q8LjVJ8GXvpa5Uwn95OTC/nNxkda1/dLSK475IjCD6dHbK1ZOa4hXP9DXs5chJ00UpVm5xo2qRpoxptwF2E4/IbJpB/SDz9+q9b1aNfQH08+p4a8uvX8B53fLP+ycAfemjsRUBgp1H20K+BghHgVgt1GXZXZpZ5lt4ECjxYR4ScUWiShEtZqBiIInRGWnERNnjiBglw+JyGnxUmGowsyiiZg189lNtPGACjV2+S9UjbU0JWF6SPvEk3QZEqsZYTk3UAaRSUnznJI5LmESCdBVSyaOWUWLK4I5gDUYVeV1T9l+FZClCAUVA09uSmRHBCKAECFEhW51ht6rnmWBXkaR+NjuHpJ40D3DmnQXt2F+ihZxlqVKOfQRACACH5BAUKABwALAcABADOAAsAAAX/ICdyUCkUo/g8mUG8MCGkKgspeC6j6XEIEBpBUeCNfECaglBcOVfJFK7YQwZHQ6JRZBUqTrSuVEuD3nI45pYjFuWKvjjSkCoRaBUMWxkwBGgJCXspQ36Bh4EEB0oKhoiBgyNLjo8Ki4QElIiWfJqHnISNEI+Ql5J9o6SgkqKkgqYihamPkW6oNBgSfiMMDQkGCBLCwxIQDhHIyQwQCGMKxsnKVyPCF9DREQ3MxMPX0cu4wt7J2uHWx9jlKd3o39MiuefYEcvNkuLt5O8c1ePI2tyELXGQwoGDAQf+iEC2xByDCRAjTlAgIUWCBRgCPJQ4AQBFXAs0coT40WLIjRxL/47AcHLkxIomRXL0CHPERZkpa4q4iVKiyp0tR/7kwHMkTUBBJR5dOCEBAVcKKtCAyOHpowXCpk7goABqBZdcvWploACpBKkpIJI1q5OD2rIWE0R1uTZu1LFwbWL9OlKuWb4c6+o9i3dEgw0RCGDUG9KlRw56gDY2qmCByZBaASi+TACA0TucAaTteCcy0ZuOK3N2vJlx58+LRQyY3Xm0ZsgjZg+oPQLi7dUcNXi0LOJw1pgNtB7XG6CBy+U75SYfPTSQAgZTNUDnQHt67wnbZyvwLgKiMN3oCZB3C76tdewpLFgIP2C88rbi4Y+QT3+8S5USMICZXWj1pkEDeUU3lOYGB3alSoEiMIjgX4WlgNF2EibIwQIXauWXSRg2SAOHIU5IIIMoZkhhWiJaiFVbKo6AQEgQXrTAazO1JhkBrBG3Y2Y6EsUhaGn95hprSN0oWpFE7rhkeaQBchGOEWnwEmc0uKWZj0LeuNV3W4Y2lZHFlQCSRjTIl8uZ+kG5HU/3sRlnTG2ytyadytnD3HrmuRcSn+0h1dycexIK1KCjYaCnjCCVqOFFJTZ5GkUUjESWaUIKU2lgCmAKKQIUjHapXRKE+t2og1VgankNYnohqKJ2CmKplso6GKz7WYCgqxeuyoF8u9IQAgA7", msg: null, msgText: "<em>Loading the next set of posts...</em>", selector: null, speed: "fast", start: i }, state: { isDuringAjax: !1, isInvalidPage: !1, isDestroyed: !1, isDone: !1, isPaused: !1, isBeyondMaxPage: !1, currPage: 1 }, debug: !1, behavior: i, binder: e(window), nextSelector: "div.navigation a:first", navSelector: "div.navigation", contentSelector: null, extraScrollPx: 150, itemSelector: "div.post", animate: !1, pathParse: i, dataType: "html", appendCallback: !0, bufferPx: 40, errorCallback: function() {}, infid: 0, pixelsFromNavToBottom: i, path: i, prefill: !1, maxPage: i }, e.infinitescroll.prototype = {
        _binding: function(e) {
            var t = this,
                o = t.options;
            if (o.v = "2.0b2.120520", o.behavior && this["_binding_" + o.behavior] !== i) this["_binding_" + o.behavior].call(this);
            else { if ("bind" !== e && "unbind" !== e) return this._debug("Binding value  " + e + " not valid"), !1; "unbind" === e ? this.options.binder.off("smartscroll.infscr." + t.options.infid) : this.options.binder.on("smartscroll.infscr." + t.options.infid, function() { t.scroll() }), this._debug("Binding", e) }
        },
        _create: function(t, o) {
            var n = e.extend(!0, {}, e.infinitescroll.defaults, t);
            this.options = n;
            var a = e(window);
            if (!this._validate(t)) return !1;
            var s = e(n.nextSelector).attr("href");
            if (!s) return this._debug("Navigation selector not found"), !1;
            n.path = n.path || this._determinepath(s), n.contentSelector = n.contentSelector || this.element, n.loading.selector = n.loading.selector || n.contentSelector, n.loading.msg = n.loading.msg || e('<div id="infscr-loading"><img alt="Loading..." src="' + n.loading.img + '" /><div>' + n.loading.msgText + "</div></div>"), (new Image).src = n.loading.img, n.pixelsFromNavToBottom === i && (n.pixelsFromNavToBottom = e(document).height() - e(n.navSelector).offset().top, this._debug("pixelsFromNavToBottom: " + n.pixelsFromNavToBottom));
            var r = this;
            return n.loading.start = n.loading.start || function() { e(n.navSelector).hide(), n.loading.msg.insertAfter(n.loading.selector).show(n.loading.speed, e.proxy(function() { this.beginAjax(n) }, r)) }, n.loading.finished = n.loading.finished || function() { n.state.isBeyondMaxPage || n.loading.msg.fadeOut(n.loading.speed) }, n.callback = function(t, s, r) { n.behavior && t["_callback_" + n.behavior] !== i && t["_callback_" + n.behavior].call(e(n.contentSelector)[0], s, r), o && o.call(e(n.contentSelector)[0], s, n, r), n.prefill && a.on("resize.infinite-scroll", t._prefill) }, t.debug && (!Function.prototype.bind || "object" != typeof console && "function" != typeof console || "object" != typeof console.log || ["log", "info", "warn", "error", "assert", "dir", "clear", "profile", "profileEnd"].forEach(function(e) { console[e] = this.call(console[e], console) }, Function.prototype.bind)), this._setup(), n.prefill && this._prefill(), !0
        },
        _prefill: function() {
            var i = this,
                t = e(window);

            function o() { return e(i.options.contentSelector).height() <= t.height() }
            this._prefill = function() { o() && i.scroll(), t.on("resize.infinite-scroll", function() { o() && (t.off("resize.infinite-scroll"), i.scroll()) }) }, this._prefill()
        },
        _debug: function() {!0 === this.options.debug && ("undefined" != typeof console && "function" == typeof console.log ? 1 === Array.prototype.slice.call(arguments).length && Array.prototype.slice.call(arguments)[0] : Function.prototype.on || "undefined" == typeof console || "object" != typeof console.log || Function.prototype.call.call(console.log, console, Array.prototype.slice.call(arguments))) },
        _determinepath: function(e) {
            var t = this.options;
            if (t.behavior && this["_determinepath_" + t.behavior] !== i) return this["_determinepath_" + t.behavior].call(this, e);
            if (t.pathParse) return this._debug("pathParse manual"), t.pathParse(e, this.options.state.currPage + 1);
            if (e.match(/^(.*2?)\b2\b(.*?$)/)) e = e.match(/^(.*2?)\b2\b(.*?$)/).slice(1);
            else if (e.match(/^(.*?)\b2\b(.*?$)/)) e = e.match(/^(.*?)\b2\b(.*?$)/).slice(1);
            else if (e.match(/^(.*?)2(.*?$)/)) {
                if (e.match(/^(.*?page=)2(\/.*|$)/)) return e = e.match(/^(.*?page=)2(\/.*|$)/).slice(1);
                e = e.match(/^(.*?)2(.*?$)/).slice(1)
            } else {
                if (e.match(/^(.*?page=)1(\/.*|$)/)) return e = e.match(/^(.*?page=)1(\/.*|$)/).slice(1);
                this._debug("Sorry, we couldn't parse your Next (Previous Posts) URL. Verify your the css selector points to the correct A tag. If you still get this error: yell, scream, and kindly ask for help at infinite-scroll.com."), t.state.isInvalidPage = !0
            }
            return this._debug("determinePath", e), e
        },
        _error: function(e) {
            var t = this.options;
            t.behavior && this["_error_" + t.behavior] !== i ? this["_error_" + t.behavior].call(this, e) : ("destroy" !== e && "end" !== e && (e = "unknown"), this._debug("Error", e), ("end" === e || t.state.isBeyondMaxPage) && this._showdonemsg(), t.state.isDone = !0, t.state.currPage = 1, t.state.isPaused = !1, t.state.isBeyondMaxPage = !1, this._binding("unbind"))
        },
        _loadcallback: function(t, o, n) {
            var a, s = this.options,
                r = this.options.callback,
                l = s.state.isDone ? "done" : s.appendCallback ? "append" : "no-append";
            if (s.behavior && this["_loadcallback_" + s.behavior] !== i) this["_loadcallback_" + s.behavior].call(this, t, o, n);
            else {
                switch (l) {
                    case "done":
                        return this._showdonemsg(), !1;
                    case "no-append":
                        if ("html" === s.dataType && (o = e(o = "<div>" + o + "</div>").find(s.itemSelector)), 0 === o.length) return this._error("end");
                        break;
                    case "append":
                        var c = t.children();
                        if (0 === c.length) return this._error("end");
                        for (a = document.createDocumentFragment(); t[0].firstChild;) a.appendChild(t[0].firstChild);
                        this._debug("contentSelector", e(s.contentSelector)[0]), e(s.contentSelector)[0].appendChild(a), o = c.get()
                }
                if (s.loading.finished.call(e(s.contentSelector)[0], s), s.animate) {
                    var h = e(window).scrollTop() + e(s.loading.msg).height() + s.extraScrollPx + "px";
                    e("html,body").animate({ scrollTop: h }, 800, function() { s.state.isDuringAjax = !1 })
                }
                s.animate || (s.state.isDuringAjax = !1), r(this, o, n), s.prefill && this._prefill()
            }
        },
        _nearbottom: function() {
            var t = this.options,
                o = 0 + e(document).height() - t.binder.scrollTop() - e(window).height();
            return t.behavior && this["_nearbottom_" + t.behavior] !== i ? this["_nearbottom_" + t.behavior].call(this) : (this._debug("math:", o, t.pixelsFromNavToBottom), o - t.bufferPx < t.pixelsFromNavToBottom)
        },
        _pausing: function(e) {
            var t = this.options;
            if (!t.behavior || this["_pausing_" + t.behavior] === i) {
                switch ("pause" !== e && "resume" !== e && null !== e && this._debug("Invalid argument. Toggling pause value instead"), e = !e || "pause" !== e && "resume" !== e ? "toggle" : e) {
                    case "pause":
                        t.state.isPaused = !0;
                        break;
                    case "resume":
                        t.state.isPaused = !1;
                        break;
                    case "toggle":
                        t.state.isPaused = !t.state.isPaused
                }
                return this._debug("Paused", t.state.isPaused), !1
            }
            this["_pausing_" + t.behavior].call(this, e)
        },
        _setup: function() {
            var e = this.options;
            if (!e.behavior || this["_setup_" + e.behavior] === i) return this._binding("bind"), !1;
            this["_setup_" + e.behavior].call(this)
        },
        _showdonemsg: function() {
            var t = this.options;
            t.behavior && this["_showdonemsg_" + t.behavior] !== i ? this["_showdonemsg_" + t.behavior].call(this) : (t.loading.msg.find(".fusion-loading-spinner").hide().parent().find(".fusion-loading-msg").html(t.loading.finishedMsg).animate({ opacity: 1 }, 2e3, function() { e(this).parent().fadeOut(t.loading.speed), e(this).parent().parent().find(".fusion-load-more-button").fadeOut(t.loading.speed) }), t.errorCallback.call(e(t.contentSelector)[0], "done"))
        },
        _validate: function(i) {
            for (var t in i)
                if (t.indexOf && t.indexOf("Selector") > -1 && 0 === e(i[t]).length) return this._debug("Your " + t + " found no elements."), !1;
            return !0
        },
        bind: function() { this._binding("bind") },
        destroy: function() { return this.options.state.isDestroyed = !0, this.options.loading.finished(), this._error("destroy") },
        pause: function() { this._pausing("pause") },
        resume: function() { this._pausing("resume") },
        beginAjax: function(t) {
            var o, n, a, s, r = this,
                l = t.path;
            if (t.state.currPage++, t.maxPage !== i && t.state.currPage > t.maxPage) return t.state.isBeyondMaxPage = !0, void this.destroy();
            switch (l = "string" == typeof l ? [l] : l, o = e(t.contentSelector).is("table, tbody") ? e("<tbody/>") : e("<div/>"), n = "function" == typeof l ? l(t.state.currPage) : l.join(t.state.currPage), r._debug("heading into ajax", n), a = "html" === t.dataType || "json" === t.dataType ? t.dataType : "html+callback", t.appendCallback && "html" === t.dataType && (a += "+callback"), a) {
                case "html+callback":
                    r._debug("Using HTML via .load() method"), o.load(n + " " + t.itemSelector, i, function(e) { r._loadcallback(o, e, n) });
                    break;
                case "html":
                    r._debug("Using " + a.toUpperCase() + " via $.ajax() method"), e.ajax({
                        url: n,
                        dataType: t.dataType,
                        complete: function(e, i) {
                            (s = void 0 !== e.isResolved ? e.isResolved() : "success" === i || "notmodified" === i) ? r._loadcallback(o, e.responseText, n): r._error("end")
                        }
                    });
                    break;
                case "json":
                    r._debug("Using " + a.toUpperCase() + " via $.ajax() method"), e.ajax({ dataType: "json", type: "GET", url: n }).done(function(e, a, l) {
                        if (s = void 0 !== l.isResolved ? l.isResolved() : "success" === a || "notmodified" === a, t.appendCallback)
                            if (t.template !== i) {
                                var c = t.template(e);
                                o.append(c), s ? r._loadcallback(o, c) : r._error("end")
                            } else r._debug("template must be defined."), r._error("end");
                        else s ? r._loadcallback(o, e, n) : r._error("end")
                    }).fail(function() { r._debug("JSON ajax request failed."), r._error("end") })
            }
        },
        retrieve: function(t) {
            t = t || null;
            var o = this.options;
            if (o.behavior && this["retrieve_" + o.behavior] !== i) this["retrieve_" + o.behavior].call(this, t);
            else {
                if (o.state.isDestroyed) return this._debug("Instance is destroyed"), !1;
                o.state.isDuringAjax = !0, o.loading.start.call(e(o.contentSelector)[0], o)
            }
        },
        scroll: function() {
            var e = this.options,
                t = e.state;
            e.behavior && this["scroll_" + e.behavior] !== i ? this["scroll_" + e.behavior].call(this) : t.isDuringAjax || t.isInvalidPage || t.isDone || t.isDestroyed || t.isPaused || this._nearbottom() && this.retrieve()
        },
        toggle: function() { this._pausing() },
        unbind: function() { this._binding("unbind") },
        update: function(i) { e.isPlainObject(i) && (this.options = e.extend(!0, this.options, i)) }
    }, e.fn.infinitescroll = function(i, t) {
        switch (typeof i) {
            case "string":
                var o = Array.prototype.slice.call(arguments, 1);
                this.each(function() { var t = e.data(this, "infinitescroll"); return !!t && (!(!e.isFunction(t[i]) || "_" === i.charAt(0)) && void t[i].apply(t, o)) });
                break;
            case "object":
                this.each(function() {
                    var o = e.data(this, "infinitescroll");
                    o ? o.update(i) : (o = new e.infinitescroll(i, t, this)).failed || e.data(this, "infinitescroll", o)
                })
        }
        return this
    };
    var t, o = e.event;
    o.special.smartscroll = {
        setup: function() { e(this).on("scroll", o.special.smartscroll.handler) },
        teardown: function() { e(this).off("scroll", o.special.smartscroll.handler) },
        handler: function(i, o) {
            var n = this,
                a = arguments;
            i.type = "smartscroll", t && clearTimeout(t), t = setTimeout(function() { e(n).trigger("smartscroll", a) }, "execAsap" === o ? 0 : 100)
        }
    }, e.fn.smartscroll = function(e) { return e ? this.on("smartscroll", e) : this.trigger("smartscroll", ["execAsap"]) }
});
! function(e) { "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? module.exports = e : e(jQuery) }(function(e) {
    var t, i, n = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
        o = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
        l = Array.prototype.slice;
    if (e.event.fixHooks)
        for (var s = n.length; s;) e.event.fixHooks[n[--s]] = e.event.mouseHooks;
    var a = e.event.special.mousewheel = {
        version: "3.1.12",
        setup: function() {
            if (this.addEventListener)
                for (var t = o.length; t;) this.addEventListener(o[--t], h, { passive: !0, capture: !1 });
            else this.onmousewheel = h;
            e.data(this, "mousewheel-line-height", a.getLineHeight(this)), e.data(this, "mousewheel-page-height", a.getPageHeight(this))
        },
        teardown: function() {
            if (this.removeEventListener)
                for (var t = o.length; t;) this.removeEventListener(o[--t], h, !1);
            else this.onmousewheel = null;
            e.removeData(this, "mousewheel-line-height"), e.removeData(this, "mousewheel-page-height")
        },
        getLineHeight: function(t) {
            var i = e(t),
                n = i["offsetParent" in e.fn ? "offsetParent" : "parent"]();
            return n.length || (n = e("body")), parseInt(n.css("fontSize"), 10) || parseInt(i.css("fontSize"), 10) || 16
        },
        getPageHeight: function(t) { return e(t).height() },
        settings: { adjustOldDeltas: !0, normalizeOffset: !0 }
    };

    function h(n) {
        var o, s = n || window.event,
            h = l.call(arguments, 1),
            f = 0,
            d = 0,
            c = 0,
            m = 0,
            g = 0;
        if ((n = e.event.fix(s)).type = "mousewheel", "detail" in s && (c = -1 * s.detail), "wheelDelta" in s && (c = s.wheelDelta), "wheelDeltaY" in s && (c = s.wheelDeltaY), "wheelDeltaX" in s && (d = -1 * s.wheelDeltaX), "axis" in s && s.axis === s.HORIZONTAL_AXIS && (d = -1 * c, c = 0), f = 0 === c ? d : c, "deltaY" in s && (f = c = -1 * s.deltaY), "deltaX" in s && (d = s.deltaX, 0 === c && (f = -1 * d)), 0 !== c || 0 !== d) {
            if (1 === s.deltaMode) {
                var w = e.data(this, "mousewheel-line-height");
                f *= w, c *= w, d *= w
            } else if (2 === s.deltaMode) {
                var v = e.data(this, "mousewheel-page-height");
                f *= v, c *= v, d *= v
            }
            if (o = Math.max(Math.abs(c), Math.abs(d)), (!i || o < i) && (i = o, u(s, o) && (i /= 40)), u(s, o) && (f /= 40, d /= 40, c /= 40), f = Math[f >= 1 ? "floor" : "ceil"](f / i), d = Math[d >= 1 ? "floor" : "ceil"](d / i), c = Math[c >= 1 ? "floor" : "ceil"](c / i), a.settings.normalizeOffset && this.getBoundingClientRect) {
                var p = this.getBoundingClientRect();
                m = n.clientX - p.left, g = n.clientY - p.top
            }
            return n.deltaX = d, n.deltaY = c, n.deltaFactor = i, n.offsetX = m, n.offsetY = g, n.deltaMode = 0, h.unshift(n, f, d, c), t && clearTimeout(t), t = setTimeout(r, 200), (e.event.dispatch || e.event.handle).apply(this, h)
        }
    }

    function r() { i = null }

    function u(e, t) { return a.settings.adjustOldDeltas && "mousewheel" === e.type && t % 120 == 0 }
    e.fn.extend({ mousewheel: function(e) { return e ? this.bind("mousewheel", e) : this.trigger("mousewheel") }, unmousewheel: function(e) { return this.unbind("mousewheel", e) } })
});
! function(e, a, t) {
    var l, r, o = "placeholder" in a.createElement("input"),
        d = "placeholder" in a.createElement("textarea"),
        c = t.fn,
        i = t.valHooks,
        h = t.propHooks;

    function n(e, a) {
        var l = t(this);
        if (this.value == l.attr("placeholder") && l.hasClass("placeholder"))
            if (l.data("placeholder-password")) {
                if (l = l.hide().next().show().attr("id", l.removeAttr("id").data("placeholder-id")), !0 === e) return l[0].value = a;
                l.focus()
            } else this.value = "", l.removeClass("placeholder"), this == u() && this.select()
    }

    function s() {
        var e, a, l, r, o = t(this),
            d = this.id;
        if ("" == this.value) {
            if ("password" == this.type) {
                if (!o.data("placeholder-textinput")) {
                    try { e = o.clone().attr({ type: "text" }) } catch (o) { e = t("<input>").attr(t.extend((a = this, l = {}, r = /^jQuery\d+$/, t.each(a.attributes, function(e, a) { a.specified && !r.test(a.name) && (l[a.name] = a.value) }), l), { type: "text" })) }
                    e.removeAttr("name").data({ "placeholder-password": o, "placeholder-id": d }).bind("focus.placeholder", n), o.data({ "placeholder-textinput": e, "placeholder-id": d }).before(e)
                }
                o = o.removeAttr("id").hide().prev().attr("id", d).show()
            }
            o.addClass("placeholder"), o[0].value = o.attr("placeholder")
        } else o.removeClass("placeholder")
    }

    function u() { try { return a.activeElement } catch (e) {} }
    o && d ? (r = c.placeholder = function() { return this }).input = r.textarea = !0 : ((r = c.placeholder = function() { return this.filter((o ? "textarea" : ":input") + "[placeholder]").not(".placeholder").bind({ "focus.placeholder": n, "blur.placeholder": s }).data("placeholder-enabled", !0).trigger("blur.placeholder"), this }).input = o, r.textarea = d, l = {
        get: function(e) {
            var a = t(e),
                l = a.data("placeholder-password");
            return l ? l[0].value : a.data("placeholder-enabled") && a.hasClass("placeholder") ? "" : e.value
        },
        set: function(e, a) {
            var l = t(e),
                r = l.data("placeholder-password");
            return r ? r[0].value = a : l.data("placeholder-enabled") ? ("" == a ? (e.value = a, e != u() && s.call(e)) : l.hasClass("placeholder") && n.call(e, !0, a) || (e.value = a), l) : e.value = a
        }
    }, o || (i.input = l, h.value = l), d || (i.textarea = l, h.value = l), t(function() {
        t(a).delegate("form", "submit.placeholder", function() {
            var e = t(".placeholder", this).each(n);
            setTimeout(function() { e.each(s) }, 10)
        })
    }), t(e).bind("beforeunload.placeholder", function() { t(".placeholder").each(function() { this.value = "" }) }))
}(this, document, jQuery);
! function(e) { "function" == typeof define && define.amd && define.amd.jQuery ? define(["jquery"], e) : e(jQuery) }(function(e) {
    "use strict";
    var t = "left",
        n = "right",
        r = "up",
        i = "down",
        o = "in",
        l = "out",
        a = "none",
        u = "auto",
        s = "swipe",
        c = "pinch",
        h = "tap",
        p = "doubletap",
        f = "longtap",
        g = "horizontal",
        d = "vertical",
        w = "all",
        v = 10,
        T = "start",
        S = "move",
        E = "end",
        b = "cancel",
        m = "ontouchstart" in window,
        y = window.navigator.msPointerEnabled && !window.navigator.pointerEnabled,
        O = window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
        x = "TouchSwipe";
    e.fn.swipe = function(M) {
        var P = e(this),
            L = P.data(x);
        if (L && "string" == typeof M) {
            if (L[M]) return L[M].apply(this, Array.prototype.slice.call(arguments, 1));
            e.error("Method " + M + " does not exist on jQuery.swipe")
        } else if (!(L || "object" != typeof M && M)) return function(M) {
            !M || void 0 !== M.allowPageScroll || void 0 === M.swipe && void 0 === M.swipeStatus || (M.allowPageScroll = a);
            void 0 !== M.click && void 0 === M.tap && (M.tap = M.click);
            M || (M = {});
            return M = e.extend({}, e.fn.swipe.defaults, M), this.each(function() {
                var P = e(this),
                    L = P.data(x);
                L || (L = new function(M, P) {
                    var L = m || O || !P.fallbackToMouseEvents,
                        D = L ? O ? y ? "MSPointerDown" : "pointerdown" : "touchstart" : "mousedown",
                        R = L ? O ? y ? "MSPointerMove" : "pointermove" : "touchmove" : "mousemove",
                        k = L ? O ? y ? "MSPointerUp" : "pointerup" : "touchend" : "mouseup",
                        A = L ? null : "mouseleave",
                        I = O ? y ? "MSPointerCancel" : "pointercancel" : "touchcancel",
                        N = 0,
                        U = null,
                        H = 0,
                        j = 0,
                        _ = 0,
                        Q = 1,
                        C = 0,
                        X = 0,
                        Y = null,
                        q = e(M),
                        W = "start",
                        F = 0,
                        V = null,
                        z = 0,
                        G = 0,
                        Z = 0,
                        B = 0,
                        J = 0,
                        K = null,
                        $ = null;
                    try { q.on(D, ee), q.on(I, re) } catch (t) { e.error("events not supported " + D + "," + I + " on jQuery.swipe") }

                    function ee(o) {
                        if (!0 !== q.data(x + "_intouch") && !(e(o.target).closest(P.excludedElements, q).length > 0)) {
                            var l, a, u = o.originalEvent ? o.originalEvent : o,
                                s = m ? u.touches[0] : u;
                            return W = T, m ? F = u.touches.length : o.preventDefault(), N = 0, U = null, X = null, H = 0, j = 0, _ = 0, Q = 1, C = 0, V = function() { for (var e = [], t = 0; t <= 5; t++) e.push({ start: { x: 0, y: 0 }, end: { x: 0, y: 0 }, identifier: 0 }); return e }(), (a = {})[t] = Le(t), a[n] = Le(n), a[r] = Le(r), a[i] = Le(i), Y = a, me(), !m || F === P.fingers || P.fingers === w || fe() ? (xe(0, s), z = ke(), 2 == F && (xe(1, u.touches[1]), j = _ = Re(V[0].start, V[1].start)), (P.swipeStatus || P.pinchStatus) && (l = ae(u, W))) : l = !1, !1 === l ? (ae(u, W = b), l) : (P.hold && ($ = setTimeout(e.proxy(function() { q.trigger("hold", [u.target]), P.hold && (l = P.hold.call(q, u, u.target)) }, this), P.longTapThreshold)), Oe(!0), null)
                        }
                    }

                    function te(s) {
                        var c = s.originalEvent ? s.originalEvent : s;
                        if (W !== E && W !== b && !ye()) {
                            var h, p, f, v, T, y, O = m ? c.touches[0] : c,
                                x = Me(O);
                            if (G = ke(), m && (F = c.touches.length), P.hold && clearTimeout($), W = S, 2 == F && (0 == j ? (xe(1, c.touches[1]), j = _ = Re(V[0].start, V[1].start)) : (Me(c.touches[1]), _ = Re(V[0].end, V[1].end), V[0].end, V[1].end, X = Q < 1 ? l : o), Q = (_ / j * 1).toFixed(2), C = Math.abs(j - _)), F === P.fingers || P.fingers === w || !m || fe()) {
                                if (v = x.start, T = x.end, y = function(e, t) {
                                        var n = e.x - t.x,
                                            r = t.y - e.y,
                                            i = Math.atan2(r, n),
                                            o = Math.round(180 * i / Math.PI);
                                        return o < 0 && (o = 360 - Math.abs(o)), o
                                    }(v, T), function(e, o) {
                                        if (P.allowPageScroll === a || fe()) e.preventDefault();
                                        else {
                                            var l = P.allowPageScroll === u;
                                            switch (o) {
                                                case t:
                                                    (P.swipeLeft && l || !l && P.allowPageScroll != g) && e.preventDefault();
                                                    break;
                                                case n:
                                                    (P.swipeRight && l || !l && P.allowPageScroll != g) && e.preventDefault();
                                                    break;
                                                case r:
                                                    (P.swipeUp && l || !l && P.allowPageScroll != d) && e.preventDefault();
                                                    break;
                                                case i:
                                                    (P.swipeDown && l || !l && P.allowPageScroll != d) && e.preventDefault()
                                            }
                                        }
                                    }(s, U = y <= 45 && y >= 0 ? t : y <= 360 && y >= 315 ? t : y >= 135 && y <= 225 ? n : y > 45 && y < 135 ? i : r), N = function(e, t) { return Math.round(Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2))) }(x.start, x.end), H = De(), function(e, t) { t = Math.max(t, Pe(e)), Y[e].distance = t }(U, N), (P.swipeStatus || P.pinchStatus) && (h = ae(c, W)), !P.triggerOnTouchEnd || P.triggerOnTouchLeave) {
                                    var M = !0;
                                    if (P.triggerOnTouchLeave) {
                                        var L = { left: (f = (p = e(p = this)).offset()).left, right: f.left + p.outerWidth(), top: f.top, bottom: f.top + p.outerHeight() };
                                        M = function(e, t) { return e.x > t.left && e.x < t.right && e.y > t.top && e.y < t.bottom }(x.end, L)
                                    }!P.triggerOnTouchEnd && M ? W = le(S) : P.triggerOnTouchLeave && !M && (W = le(E)), W != b && W != E || ae(c, W)
                                }
                            } else ae(c, W = b);
                            !1 === h && ae(c, W = b)
                        }
                    }

                    function ne(e) { var t = e.originalEvent; return m && t.touches.length > 0 ? (be(), !0) : (ye() && (F = B), G = ke(), H = De(), ce() || !se() ? ae(t, W = b) : P.triggerOnTouchEnd || 0 == P.triggerOnTouchEnd && W === S ? (e.preventDefault(), ae(t, W = E)) : !P.triggerOnTouchEnd && Te() ? ue(t, W = E, h) : W === S && ae(t, W = b), Oe(!1), null) }

                    function re() { F = 0, G = 0, z = 0, j = 0, _ = 0, Q = 1, me(), Oe(!1) }

                    function ie(e) {
                        var t = e.originalEvent;
                        P.triggerOnTouchLeave && (W = le(E), ae(t, W))
                    }

                    function oe() { q.off(D, ee), q.off(I, re), q.off(R, te), q.off(k, ne), A && q.off(A, ie), Oe(!1) }

                    function le(e) {
                        var t = e,
                            n = he(),
                            r = se(),
                            i = ce();
                        return !n || i ? t = b : !r || e != S || P.triggerOnTouchEnd && !P.triggerOnTouchLeave ? !r && e == E && P.triggerOnTouchLeave && (t = b) : t = E, t
                    }

                    function ae(e, t) { var n = void 0; return ge() && de() || de() ? n = ue(e, t, s) : (pe() && fe() || fe()) && !1 !== n && (n = ue(e, t, c)), Ee() && Se() && !1 !== n ? n = ue(e, t, p) : H > P.longTapThreshold && N < v && P.longTap && !1 !== n ? n = ue(e, t, f) : 1 !== F && m || !(isNaN(N) || N < P.threshold) || !Te() || !1 === n || (n = ue(e, t, h)), t === b && re(), t === E && (m ? 0 == e.touches.length && re() : re()), n }

                    function ue(a, u, g) {
                        var d = void 0;
                        if (g == s) {
                            if (q.trigger("swipeStatus", [u, U || null, N || 0, H || 0, F, V]), P.swipeStatus && !1 === (d = P.swipeStatus.call(q, a, u, U || null, N || 0, H || 0, F, V))) return !1;
                            if (u == E && ge()) {
                                if (q.trigger("swipe", [U, N, H, F, V]), P.swipe && !1 === (d = P.swipe.call(q, a, U, N, H, F, V))) return !1;
                                switch (U) {
                                    case t:
                                        q.trigger("swipeLeft", [U, N, H, F, V]), P.swipeLeft && (d = P.swipeLeft.call(q, a, U, N, H, F, V));
                                        break;
                                    case n:
                                        q.trigger("swipeRight", [U, N, H, F, V]), P.swipeRight && (d = P.swipeRight.call(q, a, U, N, H, F, V));
                                        break;
                                    case r:
                                        q.trigger("swipeUp", [U, N, H, F, V]), P.swipeUp && (d = P.swipeUp.call(q, a, U, N, H, F, V));
                                        break;
                                    case i:
                                        q.trigger("swipeDown", [U, N, H, F, V]), P.swipeDown && (d = P.swipeDown.call(q, a, U, N, H, F, V))
                                }
                            }
                        }
                        if (g == c) {
                            if (q.trigger("pinchStatus", [u, X || null, C || 0, H || 0, F, Q, V]), P.pinchStatus && !1 === (d = P.pinchStatus.call(q, a, u, X || null, C || 0, H || 0, F, Q, V))) return !1;
                            if (u == E && pe()) switch (X) {
                                case o:
                                    q.trigger("pinchIn", [X || null, C || 0, H || 0, F, Q, V]), P.pinchIn && (d = P.pinchIn.call(q, a, X || null, C || 0, H || 0, F, Q, V));
                                    break;
                                case l:
                                    q.trigger("pinchOut", [X || null, C || 0, H || 0, F, Q, V]), P.pinchOut && (d = P.pinchOut.call(q, a, X || null, C || 0, H || 0, F, Q, V))
                            }
                        }
                        return g == h ? u !== b && u !== E || (clearTimeout(K), clearTimeout($), Se() && !Ee() ? (J = ke(), K = setTimeout(e.proxy(function() { J = null, q.trigger("tap", [a.target]), P.tap && (d = P.tap.call(q, a, a.target)) }, this), P.doubleTapThreshold)) : (J = null, q.trigger("tap", [a.target]), P.tap && (d = P.tap.call(q, a, a.target)))) : g == p ? u !== b && u !== E || (clearTimeout(K), J = null, q.trigger("doubletap", [a.target]), P.doubleTap && (d = P.doubleTap.call(q, a, a.target))) : g == f && (u !== b && u !== E || (clearTimeout(K), J = null, q.trigger("longtap", [a.target]), P.longTap && (d = P.longTap.call(q, a, a.target)))), d
                    }

                    function se() { var e = !0; return null !== P.threshold && (e = N >= P.threshold), e }

                    function ce() { var e = !1; return null !== P.cancelThreshold && null !== U && (e = Pe(U) - N >= P.cancelThreshold), e }

                    function he() { return !(P.maxTimeThreshold && H >= P.maxTimeThreshold) }

                    function pe() {
                        var e = we(),
                            t = ve(),
                            n = null === P.pinchThreshold || C >= P.pinchThreshold;
                        return e && t && n
                    }

                    function fe() { return !!(P.pinchStatus || P.pinchIn || P.pinchOut) }

                    function ge() {
                        var e = he(),
                            t = se(),
                            n = we(),
                            r = ve(),
                            i = ce(),
                            o = !i && r && n && t && e;
                        return o
                    }

                    function de() { return !!(P.swipe || P.swipeStatus || P.swipeLeft || P.swipeRight || P.swipeUp || P.swipeDown) }

                    function we() { return F === P.fingers || P.fingers === w || !m }

                    function ve() { return 0 !== V[0].end.x }

                    function Te() { return !!P.tap }

                    function Se() { return !!P.doubleTap }

                    function Ee() { if (null == J) return !1; var e = ke(); return Se() && e - J <= P.doubleTapThreshold }

                    function be() { Z = ke(), B = event.touches.length + 1 }

                    function me() { Z = 0, B = 0 }

                    function ye() {
                        var e = !1;
                        if (Z) {
                            var t = ke() - Z;
                            t <= P.fingerReleaseThreshold && (e = !0)
                        }
                        return e
                    }

                    function Oe(e) {!0 === e ? (q.on(R, te), q.on(k, ne), A && q.on(A, ie)) : (q.off(R, te, !1), q.off(k, ne, !1), A && q.off(A, ie, !1)), q.data(x + "_intouch", !0 === e) }

                    function xe(e, t) { var n = void 0 !== t.identifier ? t.identifier : 0; return V[e].identifier = n, V[e].start.x = V[e].end.x = t.pageX || t.clientX, V[e].start.y = V[e].end.y = t.pageY || t.clientY, V[e] }

                    function Me(e) {
                        var t = void 0 !== e.identifier ? e.identifier : 0,
                            n = function(e) {
                                for (var t = 0; t < V.length; t++)
                                    if (V[t].identifier == e) return V[t]
                            }(t);
                        return n.end.x = e.pageX || e.clientX, n.end.y = e.pageY || e.clientY, n
                    }

                    function Pe(e) { if (Y[e]) return Y[e].distance }

                    function Le(e) { return { direction: e, distance: 0 } }

                    function De() { return G - z }

                    function Re(e, t) {
                        var n = Math.abs(e.x - t.x),
                            r = Math.abs(e.y - t.y);
                        return Math.round(Math.sqrt(n * n + r * r))
                    }

                    function ke() { var e = new Date; return e.getTime() }
                    this.enable = function() { return q.on(D, ee), q.on(I, re), q }, this.disable = function() { return oe(), q }, this.destroy = function() { return oe(), q.data(x, null), q }, this.option = function(t, n) {
                        if (void 0 !== P[t]) {
                            if (void 0 === n) return P[t];
                            P[t] = n
                        } else e.error("Option " + t + " does not exist on jQuery.swipe.options");
                        return null
                    }
                }(this, M), P.data(x, L))
            })
        }.apply(this, arguments);
        return P
    }, e.fn.swipe.defaults = { fingers: 1, threshold: 75, cancelThreshold: null, pinchThreshold: 20, maxTimeThreshold: null, fingerReleaseThreshold: 250, longTapThreshold: 500, doubleTapThreshold: 200, swipe: null, swipeLeft: null, swipeRight: null, swipeUp: null, swipeDown: null, swipeStatus: null, pinchIn: null, pinchOut: null, pinchStatus: null, click: null, tap: null, doubleTap: null, longTap: null, hold: null, triggerOnTouchEnd: !0, triggerOnTouchLeave: !1, allowPageScroll: "auto", fallbackToMouseEvents: !0, excludedElements: "label, button, input, select, textarea, a, .noSwipe" }, e.fn.swipe.phases = { PHASE_START: T, PHASE_MOVE: S, PHASE_END: E, PHASE_CANCEL: b }, e.fn.swipe.directions = { LEFT: t, RIGHT: n, UP: r, DOWN: i, IN: o, OUT: l }, e.fn.swipe.pageScroll = { NONE: a, HORIZONTAL: g, VERTICAL: d, AUTO: u }, e.fn.swipe.fingers = { ONE: 1, TWO: 2, THREE: 3, ALL: w }
});
! function(t) {
    "use strict";
    t.fn.fusionScroller = function(e) {
        var f = t.extend({ type: "opacity", offset: 0, endOffset: "" }, e);
        t(this).each(function() {
            var e, i, r, o = this;
            t(window).on("scroll", function() {
                var s, l, p, c;
                e = t(o).offset().top, t("body").hasClass("admin-bar") && (e = t(o).offset().top - t("#wpadminbar").outerHeight()), 0 < f.offset && (e = t(o).offset().top - f.offset), i = t(o).outerHeight(), r = e + i, f.endOffset && t(f.endOffset).length && (r = t(f.endOffset).offset().top), (s = t(this).scrollTop()) >= e && s <= r && (l = (r - s) / i * 100, "opacity" === f.type ? (p = l / 100 * 1, t(o).css({ opacity: p })) : "blur" === f.type ? (c = "blur(" + (l = 100 - l) / 100 * 50 + "px)", t(o).css({ "-webkit-filter": c, "-ms-filter": c, "-o-filter": c, "-moz-filter": c, filter: c })) : "fading_blur" === f.type && (p = l / 100 * 1, c = "blur(" + (l = 100 - l) / 100 * 50 + "px)", t(o).css({ "-webkit-filter": c, "-ms-filter": c, "-o-filter": c, "-moz-filter": c, filter: c, opacity: p }))), s < e && ("opacity" === f.type ? t(o).css({ opacity: 1 }) : "blur" === f.type ? (c = "blur(0px)", t(o).css({ "-webkit-filter": c, "-ms-filter": c, "-o-filter": c, "-moz-filter": c, filter: c })) : "fading_blur" === f.type && (c = "blur(0px)", t(o).css({ opacity: 1, "-webkit-filter": c, "-ms-filter": c, "-o-filter": c, "-moz-filter": c, filter: c })))
            })
        })
    }
}(jQuery);
(function() {
    function e() {}
    var t = e.prototype,
        n = this,
        i = n.EventEmitter;

    function r(e, t) {
        for (var n = e.length; n--;)
            if (e[n].listener === t) return n;
        return -1
    }

    function o(e) { return function() { return this[e].apply(this, arguments) } }
    t.getListeners = function(e) {
        var t, n, i = this._getEvents();
        if ("object" == typeof e)
            for (n in t = {}, i) i.hasOwnProperty(n) && e.test(n) && (t[n] = i[n]);
        else t = i[e] || (i[e] = []);
        return t
    }, t.flattenListeners = function(e) { var t, n = []; for (t = 0; t < e.length; t += 1) n.push(e[t].listener); return n }, t.getListenersAsObject = function(e) { var t, n = this.getListeners(e); return n instanceof Array && ((t = {})[e] = n), t || n }, t.addListener = function(e, t) {
        var n, i = this.getListenersAsObject(e),
            o = "object" == typeof t;
        for (n in i) i.hasOwnProperty(n) && -1 === r(i[n], t) && i[n].push(o ? t : { listener: t, once: !1 });
        return this
    }, t.on = o("addListener"), t.addOnceListener = function(e, t) { return this.addListener(e, { listener: t, once: !0 }) }, t.once = o("addOnceListener"), t.defineEvent = function(e) { return this.getListeners(e), this }, t.defineEvents = function(e) { for (var t = 0; t < e.length; t += 1) this.defineEvent(e[t]); return this }, t.removeListener = function(e, t) { var n, i, o = this.getListenersAsObject(e); for (i in o) o.hasOwnProperty(i) && -1 !== (n = r(o[i], t)) && o[i].splice(n, 1); return this }, t.off = o("removeListener"), t.addListeners = function(e, t) { return this.manipulateListeners(!1, e, t) }, t.removeListeners = function(e, t) { return this.manipulateListeners(!0, e, t) }, t.manipulateListeners = function(e, t, n) {
        var i, r, o = e ? this.removeListener : this.addListener,
            s = e ? this.removeListeners : this.addListeners;
        if ("object" != typeof t || t instanceof RegExp)
            for (i = n.length; i--;) o.call(this, t, n[i]);
        else
            for (i in t) t.hasOwnProperty(i) && (r = t[i]) && ("function" == typeof r ? o.call(this, i, r) : s.call(this, i, r));
        return this
    }, t.removeEvent = function(e) {
        var t, n = typeof e,
            i = this._getEvents();
        if ("string" === n) delete i[e];
        else if ("object" === n)
            for (t in i) i.hasOwnProperty(t) && e.test(t) && delete i[t];
        else delete this._events;
        return this
    }, t.removeAllListeners = o("removeEvent"), t.emitEvent = function(e, t) {
        var n, i, r, o = this.getListenersAsObject(e);
        for (r in o)
            if (o.hasOwnProperty(r))
                for (i = o[r].length; i--;) !0 === (n = o[r][i]).once && this.removeListener(e, n.listener), n.listener.apply(this, t || []) === this._getOnceReturnValue() && this.removeListener(e, n.listener);
        return this
    }, t.trigger = o("emitEvent"), t.emit = function(e) { var t = Array.prototype.slice.call(arguments, 1); return this.emitEvent(e, t) }, t.setOnceReturnValue = function(e) { return this._onceReturnValue = e, this }, t._getOnceReturnValue = function() { return !this.hasOwnProperty("_onceReturnValue") || this._onceReturnValue }, t._getEvents = function() { return this._events || (this._events = {}) }, e.noConflict = function() { return n.EventEmitter = i, e }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function() { return e }) : "object" == typeof module && module.exports ? module.exports = e : this.EventEmitter = e
}).call(this),
    function(e) {
        var t = document.documentElement,
            n = function() {};

        function i(t) { var n = e.event; return n.target = n.target || n.srcElement || t, n }
        t.addEventListener ? n = function(e, t, n) { e.addEventListener(t, n, !1) } : t.attachEvent && (n = function(e, t, n) {
            e[t + n] = n.handleEvent ? function() {
                var t = i(e);
                n.handleEvent.call(n, t)
            } : function() {
                var t = i(e);
                n.call(e, t)
            }, e.attachEvent("on" + t, e[t + n])
        });
        var r = function() {};
        t.removeEventListener ? r = function(e, t, n) { e.removeEventListener(t, n, !1) } : t.detachEvent && (r = function(e, t, n) { e.detachEvent("on" + t, e[t + n]); try { delete e[t + n] } catch (i) { e[t + n] = void 0 } });
        var o = { bind: n, unbind: r };
        "function" == typeof define && define.amd ? define("eventie/eventie", o) : e.eventie = o
    }(this),
    function(e, t) { "function" == typeof define && define.amd ? define(["eventEmitter/EventEmitter", "eventie/eventie"], function(n, i) { return t(e, n, i) }) : "object" == typeof exports ? module.exports = t(e, require("wolfy87-eventemitter"), require("eventie")) : e.imagesLoaded = t(e, e.EventEmitter, e.eventie) }(window, function(e, t, n) {
        var i = e.jQuery,
            r = e.console,
            o = void 0 !== r;

        function s(e, t) { for (var n in t) e[n] = t[n]; return e }
        var f = Object.prototype.toString;

        function c(e) {
            var t = [];
            if (function(e) { return "[object Array]" === f.call(e) }(e)) t = e;
            else if ("number" == typeof e.length)
                for (var n = 0, i = e.length; n < i; n++) t.push(e[n]);
            else t.push(e);
            return t
        }

        function a(e, t, n) {
            if (!(this instanceof a)) return new a(e, t);
            "string" == typeof e && (e = document.querySelectorAll(e)), this.elements = c(e), this.options = s({}, this.options), "function" == typeof t ? n = t : s(this.options, t), n && this.on("always", n), this.getImages(), i && (this.jqDeferred = new i.Deferred);
            var r = this;
            setTimeout(function() { r.check() })
        }

        function h(e) { this.img = e }
        a.prototype = new t, a.prototype.options = {}, a.prototype.getImages = function() {
            this.images = [];
            for (var e = 0, t = this.elements.length; e < t; e++) {
                var n = this.elements[e];
                "IMG" === n.nodeName && this.addImage(n);
                var i = n.nodeType;
                if (i && (1 === i || 9 === i || 11 === i))
                    for (var r = n.querySelectorAll("img"), o = 0, s = r.length; o < s; o++) {
                        var f = r[o];
                        this.addImage(f)
                    }
            }
        }, a.prototype.addImage = function(e) {
            var t = new h(e);
            this.images.push(t)
        }, a.prototype.check = function() {
            var e = this,
                t = 0,
                n = this.images.length;
            if (this.hasAnyBroken = !1, n)
                for (var i = 0; i < n; i++) {
                    var s = this.images[i];
                    s.on("confirm", f), s.check()
                } else this.complete();

            function f(i, s) { return e.options.debug && o && r.log("confirm", i, s), e.progress(i), ++t === n && e.complete(), !0 }
        }, a.prototype.progress = function(e) {
            this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded;
            var t = this;
            setTimeout(function() { t.emit("progress", t, e), t.jqDeferred && t.jqDeferred.notify && t.jqDeferred.notify(t, e) })
        }, a.prototype.complete = function() {
            var e = this.hasAnyBroken ? "fail" : "done";
            this.isComplete = !0;
            var t = this;
            setTimeout(function() {
                if (t.emit(e, t), t.emit("always", t), t.jqDeferred) {
                    var n = t.hasAnyBroken ? "reject" : "resolve";
                    t.jqDeferred[n](t)
                }
            })
        }, i && (i.fn.imagesLoaded = function(e, t) { return new a(this, e, t).jqDeferred.promise(i(this)) }), h.prototype = new t, h.prototype.check = function() {
            var e = u[this.img.src] || new d(this.img.src);
            if (e.isConfirmed) this.confirm(e.isLoaded, "cached was confirmed");
            else if (this.img.complete && void 0 !== this.img.naturalWidth) this.confirm(0 !== this.img.naturalWidth, "naturalWidth");
            else {
                var t = this;
                e.on("confirm", function(e, n) { return t.confirm(e.isLoaded, n), !0 }), e.check()
            }
        }, h.prototype.confirm = function(e, t) { this.isLoaded = e, this.emit("confirm", this, t) };
        var u = {};

        function d(e) { this.src = e, u[e] = this }
        return d.prototype = new t, d.prototype.check = function() {
            if (!this.isChecked) {
                var e = new Image;
                n.bind(e, "load", this), n.bind(e, "error", this), e.src = this.src, this.isChecked = !0
            }
        }, d.prototype.handleEvent = function(e) {
            var t = "on" + e.type;
            this[t] && this[t](e)
        }, d.prototype.onload = function(e) { this.confirm(!0, "onload"), this.unbindProxyEvents(e) }, d.prototype.onerror = function(e) { this.confirm(!1, "onerror"), this.unbindProxyEvents(e) }, d.prototype.confirm = function(e, t) { this.isConfirmed = !0, this.isLoaded = e, this.emit("confirm", this, t) }, d.prototype.unbindProxyEvents = function(e) { n.unbind(e.target, "load", this), n.unbind(e.target, "error", this) }, a
    });
var fusionEqualHeightVars = { "content_break_point": "800" };
! function(t) {
    "use strict";
    t.fn.equalHeights = function(i, n) {
        var e, s = t(this).parents().find(".fusion-portfolio-wrapper"),
            o = t(this).closest(".fusion-row").hasClass("fusion-builder-row-inner") ? ".fusion-column-content-centered" : ".fusion-column-content-centered:not(.fusion-builder-row-inner .fusion-column-content-centered)";
        if (e = i = i || 0, this.each(function() { t(this).css({ "min-height": "0", height: "auto" }), t(this).find(o).css({ "min-height": "0", height: "auto" }) }), Modernizr.mq("only screen and (min-width: " + (parseInt(fusionEqualHeightVars.content_break_point, 10) + 1) + "px)") || Modernizr.mq("only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: portrait)")) {
            if (t(this).parents("#main").length && t("body").hasClass("tax-portfolio_category")) return;
            return this.each(function() { e = Math.max(t(this).outerHeight(), e) }), n && (e = Math.min(n, e)), this.each(function() {
                var i = e,
                    n = t(this).find(o);
                0 === parseInt(i, 10) && t(this).attr("data-empty-column", "true"), n.length && (i = e - (t(this).outerHeight() - t(this).height())), t(this).css("min-height", i), n.length && n.css("min-height", i), t("body").hasClass("fusion-builder-live") && !t(this).parent().hasClass("fusion-column-no-min-height") && t(this).parent().is(":visible") && t(this).parent().next(".fusion-column-spacer").height(i)
            })
        }
        s.data("isotope") && !s.data("relayout") && (s.isotope("layout"), s.data("relayout", !0))
    }
}(jQuery);

function _fusionRefreshScroll() { window._fusionScrollTop = window.pageYOffset, window._fusionScrollLeft = window.pageXOffset }

function _fusionParallaxAll() { var t; for (_fusionRefreshScroll(), t = 0; t < window._fusionImageParallaxImages.length; t++) window._fusionImageParallaxImages[t].doParallax() }

function _fusionRefreshWindow() { window._fusionScrollTop = window.pageYOffset, window._fusionWindowHeight = jQuery(window).height(), window._fusionScrollLeft = window.pageXOffset, window._fusionWindowWidth = jQuery(window).width() }! function(t) {
    var i;
    i = 0, t.requestAnimationFrame || (t.webkitRequestAnimationFrame && (t.requestAnimationFrame = t.webkitRequestAnimationFrame, t.cancelAnimationFrame = t.webkitCancelAnimationFrame || t.webkitCancelRequestAnimationFrame), t.requestAnimationFrame = function(e) {
        var s = (new Date).getTime(),
            n = Math.max(0, 16 - (s - i)),
            a = t.setTimeout(function() { e(s + n) }, n);
        return i = s + n, a
    }, t.cancelAnimationFrame = function(t) { clearTimeout(t) }), "function" == typeof define && define(function() { return t.requestAnimationFrame })
}(window), void 0 === window._fusionImageParallaxImages && (window._fusionImageParallaxImages = []),
    function(t, i) {
        var e = "fusionImageParallax",
            s = { direction: "up", mobileenabled: !1, mobiledevice: !1, width: "", height: "", align: "center", opacity: "1", velocity: ".3", image: "", target: "", repeat: !1, loopScroll: "", loopScrollTime: "2", removeOrig: !1, complete: function() {} };

        function n(i, n) {
            var a;
            this.element = i, this.settings = t.extend({}, s, n), a = this.settings.align.split(" "), this.settings.xpos = a[0], 2 === a.length ? this.settings.ypos = a[1] : this.settings.ypos = "center", this._defaults = s, this._name = e, this.init()
        }
        t.extend(n.prototype, {
            init: function() { var e; "" === this.settings.target && (this.settings.target = t(this.element)), "" === this.settings.image && void 0 !== t(this.element).css("backgroundImage") && "" !== t(this.element).css("backgroundImage") && (this.settings.image = t(this.element).css("backgroundImage").replace(/url\(|\)|"|'/g, "")), e = i._fusionImageParallaxImages.push(this), jQuery(this.element).attr("data-parallax-index", e - 1), this.setup(), this.settings.complete(), this.containerWidth = 0, this.containerHeight = 0 },
            setup: function() {!1 !== this.settings.removeOrig && t(this.element).remove(), this.resizeParallaxBackground() },
            doParallax: function() {
                var t, e, s, n, a, o, r, g, d = this.settings.target.find(".parallax-inner");
                this.settings.mobiledevice && !this.settings.mobileenabled || this.isInView() && (d.css({ minHeight: "150px" }), t = this.settings.target.width() + parseInt(this.settings.target.css("paddingRight"), 10) + parseInt(this.settings.target.css("paddingLeft"), 10), e = this.settings.target.height() + parseInt(this.settings.target.css("paddingTop"), 10) + parseInt(this.settings.target.css("paddingBottom"), 10), 0 === this.containerWidth || 0 === this.containerHeight || t === this.containerWidth && e === this.containerHeight || this.resizeParallaxBackground(), this.containerWidth = t, this.containerHeight = e, void 0 !== d && 0 !== d.length && (s = (i._fusionScrollTop - this.scrollTopMin) / (this.scrollTopMax - this.scrollTopMin), n = this.moveMax * s, "down" === this.settings.direction && (n *= 1.25), "left" !== this.settings.direction && "up" !== this.settings.direction || (n *= -1), a = "translate3d(", o = "px, -2px, 0px)", r = "translate3d(0, ", g = "px, 0)", jQuery("html").hasClass("ua-safari") && d.parent().find(".fusion-section-separator").length && (a = "translate(", o = "px, 0)", r = "translate(0, ", g = "px)"), "no-repeat" === d.css("background-repeat") && ("down" === this.settings.direction && 0 > n ? n = 0 : "up" === this.settings.direction && 0 < n ? n = 0 : "right" === this.settings.direction && 0 > n ? n = 0 : "left" === this.settings.direction && 0 < n && (n = 0)), "fixed" === this.settings.direction || ("left" === this.settings.direction || "right" === this.settings.direction ? d.css({ webkitTransform: a + n + o, mozTransform: a + n + o, msTransform: a + n + o, oTransform: a + n + o, transform: a + n + o }) : d.css({ webkitTransform: r + n + g, mozTransform: r + n + g, msTransform: r + n + g, oTransform: r + n + g, transform: r + n + g }))))
            },
            isInView: function() { var t, e = this.settings.target; if (void 0 !== e && 0 !== e.length) return !((t = e.offset().top) + (e.height() + parseInt(e.css("paddingTop"), 10) + parseInt(e.css("paddingBottom"), 10)) < i._fusionScrollTop || i._fusionScrollTop + i._fusionWindowHeight < t) },
            setBackgroundStyling: function(t, i) {
                var e = "none" === this.settings.blendMode ? "" : this.settings.blendMode,
                    s = this.settings.backgroundColor;
                t.find(".parallax-inner").css({ "background-color": s, "background-blend-mode": e }), "" !== i && t.find(".parallax-inner").css({ "background-image": i })
            },
            resizeParallaxBackground: function() {
                var t, e, s, n, a, o, r, g, d, l, h, c, u = this.settings.target,
                    p = "";
                void 0 !== u && 0 !== u.length && u.is(":visible") && (c = u.hasClass("lazyload"), t = "true" === this.settings.repeat || !0 === this.settings.repeat || 1 === this.settings.repeat, "" === this.settings.gradientStartColor && "" === this.settings.gradientStartPosition || ("linear" === this.settings.gradientType ? p += "linear-gradient(" + this.settings.gradientAngle + "deg, " : "radial" === this.settings.gradientType && (p += "radial-gradient(circle at " + this.settings.gradientRadialDirection + ", "), p += this.settings.gradientStartColor + " " + this.settings.gradientStartPosition + "%,", p += this.settings.gradientEndColor + " " + this.settings.gradientEndPosition + "%)", "" !== this.settings.image && "none" !== this.settings.image && (p += ",url('" + this.settings.image + "')")), "none" === this.settings.direction ? (e = u.width() + parseInt(u.css("paddingRight"), 10) + parseInt(u.css("paddingLeft"), 10), n = u.offset().left, "center" === this.settings.align ? n = "50% 50%" : "left" === this.settings.align ? n = "0% 50%" : "right" === this.settings.align ? n = "100% 50%" : "top" === this.settings.align ? n = "50% 0%" : "bottom" === this.settings.align && (n = "50% 100%"), u.css({ opacity: Math.abs(parseFloat(this.settings.opacity) / 100), backgroundSize: "cover", backgroundAttachment: "scroll", backgroundPosition: n, backgroundRepeat: "no-repeat" }), "" !== this.settings.image && "none" !== this.settings.image && u.css({ opacity: Math.abs(parseFloat(this.settings.opacity) / 100), backgroundImage: c ? "" : "url(" + this.settings.image + ")" })) : "fixed" === this.settings.direction ? (u.css({ backgroundAttachment: "fixed", backgroundRepeat: "repeat" }), "" !== this.settings.image && "none" !== this.settings.image && u.attr("style", "background-image: url(" + this.settings.image + ") !important;" + u.attr("style"))) : "left" === this.settings.direction || "right" === this.settings.direction ? (e = u.width() + parseInt(u.css("paddingRight"), 10) + parseInt(u.css("paddingLeft"), 10), s = u.height() + 4 + parseInt(u.css("paddingTop"), 10) + parseInt(u.css("paddingBottom"), 10), a = e, e += 400 * Math.abs(parseFloat(this.settings.velocity)), o = 0, "right" === this.settings.direction && (o -= e - a), 1 > u.find(".parallax-inner").length && u.prepend('<div class="parallax-inner"></div>'), u.css({ position: "relative", overflow: "hidden", zIndex: 1, "background-image": "none" }).attr("style", u.attr("style")).find(".parallax-inner").css({ pointerEvents: "none", width: e, height: s, position: "absolute", zIndex: -1, top: 0, left: o, opacity: Math.abs(parseFloat(this.settings.opacity) / 100), backgroundPosition: t ? "0 0 " : this.settings.xpos + " " + this.settings.ypos, backgroundRepeat: t ? "repeat" : "no-repeat", backgroundSize: t ? "auto" : "cover" }), "" !== this.settings.image && "none" !== this.settings.image && (u.find(".parallax-inner").css({ opacity: Math.abs(parseFloat(this.settings.opacity) / 100), backgroundImage: c ? "" : "url(" + this.settings.image + ")" }), this.setBackgroundStyling(u, p)), g = 0, u.offset().top > i._fusionWindowHeight && (g = u.offset().top - i._fusionWindowHeight), d = u.offset().top + u.height() + parseInt(u.css("paddingTop"), 10) + parseInt(u.css("paddingBottom"), 10), this.moveMax = e - a, this.scrollTopMin = g, this.scrollTopMax = d) : (r = 900, r = jQuery(i).height(), e = u.width() + parseInt(u.css("paddingRight"), 10) + parseInt(u.css("paddingLeft"), 10), l = s = u.height() + parseInt(u.css("paddingTop"), 10) + parseInt(u.css("paddingBottom"), 10), s += r * Math.abs(parseFloat(this.settings.velocity)), h = 0, "down" === this.settings.direction && (h -= s - l), 1 > u.find(".parallax-inner").length && u.prepend('<div class="parallax-inner"></div>'), u.css({ position: "relative", overflow: "hidden", zIndex: 1, "background-image": "none" }).attr("style", u.attr("style")).find(".parallax-inner").css({ pointerEvents: "none", width: e, height: s, position: "absolute", zIndex: -1, top: h, left: 0, opacity: Math.abs(parseFloat(this.settings.opacity) / 100), backgroundPosition: t ? "0 0 " : this.settings.xpos + " " + this.settings.ypos, backgroundRepeat: t ? "repeat" : "no-repeat", backgroundSize: t ? "auto" : "cover" }), "" !== this.settings.image && "none" !== this.settings.image && (u.find(".parallax-inner").css({ opacity: Math.abs(parseFloat(this.settings.opacity) / 100), backgroundImage: c ? "" : "url(" + this.settings.image + ")" }), this.setBackgroundStyling(u, p)), g = 0, u.offset().top > i._fusionWindowHeight && (g = u.offset().top - i._fusionWindowHeight), d = u.offset().top + u.height() + parseInt(u.css("paddingTop"), 10) + parseInt(u.css("paddingBottom"), 10), this.moveMax = s - l, this.scrollTopMin = g, this.scrollTopMax = d), c && u.find(".parallax-inner").attr("data-bg", this.settings.image).addClass("lazyload"))
            },
            isMobile: function() { return cssua.ua.mobile }
        }), t.fn[e] = function(i) { return this.each(function() { t.data(this, "plugin_" + e) || t.data(this, "plugin_" + e, new n(this, i)) }), this }
    }(jQuery, window, document), jQuery(document).ready(function(t) {
        "use strict";
        t(window).on("scroll touchmove touchstart touchend gesturechange", function() { requestAnimationFrame(_fusionParallaxAll) }), cssua.ua.mobile && requestAnimationFrame(function() { var t; for (_fusionRefreshScroll(), t = 0; t < window._fusionImageParallaxImages.length; t++) window._fusionImageParallaxImages[t].doParallax() }), t(window).on("resize", function() { setTimeout(function() { _fusionRefreshWindow(), jQuery.each(window._fusionImageParallaxImages, function(t, i) { i.resizeParallaxBackground() }) }, 1) }), setTimeout(function() { _fusionRefreshWindow(), jQuery.each(window._fusionImageParallaxImages, function(t, i) { i.resizeParallaxBackground() }) }, 1), setTimeout(function() { _fusionRefreshWindow(), jQuery.each(window._fusionImageParallaxImages, function(t, i) { i.resizeParallaxBackground() }) }, 100)
    }), jQuery(window).on("load", function() { setTimeout(function() { _fusionRefreshWindow(), jQuery.each(window._fusionImageParallaxImages, function(t, i) { i.resizeParallaxBackground() }) }, 1), setTimeout(function() { _fusionRefreshWindow(), jQuery.each(window._fusionImageParallaxImages, function(t, i) { i.resizeParallaxBackground() }) }, 1e3) }), jQuery(document).on("ready fusion-element-render-fusion_builder_container", function(t, i) {
        "use strict";
        var e = void 0 !== i ? jQuery('div[data-cid="' + i + '"]').find(".fusion-bg-parallax") : jQuery(".fusion-bg-parallax");

        function s() { return cssua.ua.mobile }
        s() && jQuery(".fusion-bg-parallax.video > div").remove(), e.next().addClass("bg-parallax-parent"), e.attr("style", "").css("display", "none"), e.each(function() { cssua.ua.mobile && !jQuery(this).data("mobile-enabled") || (jQuery(this).removeData(), jQuery(this).fusionImageParallax({ image: jQuery(this).data("bg-image"), backgroundColor: void 0 !== jQuery(this).data("bg-color") ? jQuery(this).data("bg-color") : "", blendMode: void 0 !== jQuery(this).data("blend-mode") ? jQuery(this).data("blend-mode") : "none", direction: jQuery(this).data("direction"), mobileenabled: jQuery(this).data("mobile-enabled"), mobiledevice: s(), bgAlpha: jQuery(this).data("bg-alpha"), opacity: jQuery(this).data("opacity"), width: jQuery(this).data("bg-width"), height: jQuery(this).data("bg-height"), velocity: jQuery(this).data("velocity"), align: jQuery(this).data("bg-align"), repeat: jQuery(this).data("bg-repeat"), target: jQuery(this).next(), gradientType: void 0 !== jQuery(this).data("bg-gradient-type") ? jQuery(this).data("bg-gradient-type") : "", gradientAngle: void 0 !== jQuery(this).data("bg-gradient-angle") ? jQuery(this).data("bg-gradient-angle") : "", gradientStartColor: void 0 !== jQuery(this).data("bg-gradient-start-color") ? jQuery(this).data("bg-gradient-start-color") : "", gradientStartPosition: void 0 !== jQuery(this).data("bg-gradient-start-position") ? jQuery(this).data("bg-gradient-start-position") : "", gradientEndColor: void 0 !== jQuery(this).data("bg-gradient-end-color") ? jQuery(this).data("bg-gradient-end-color") : "", gradientEndPosition: void 0 !== jQuery(this).data("bg-gradient-end-position") ? jQuery(this).data("bg-gradient-end-position") : "", gradientRadialDirection: void 0 !== jQuery(this).data("bg-radial-direction") ? jQuery(this).data("bg-radial-direction") : "", complete: function() {} })) })
    });
var fusionVideoGeneralVars = { "status_vimeo": "0", "status_yt": "0" };

function playVideoAndPauseOthers(e) {
    var i = jQuery(e).find("[data-youtube-video-id]").find("iframe"),
        t = jQuery(e).data("flexslider").slides.eq(jQuery(e).data("flexslider").currentSlide),
        o = t.find("[data-youtube-video-id]").find("iframe");
    i.each(function() { jQuery(this).attr("id") !== o.attr("id") && void 0 !== window.$youtube_players && void 0 !== window.$youtube_players[jQuery(this).attr("id")] && window.$youtube_players[jQuery(this).attr("id")].stopVideo() }), o.length && ("function" != typeof fusionGetConsent || fusionGetConsent("youtube")) && void 0 !== window.$youtube_players && (!o.parents("li").hasClass("clone") && o.parents("li").hasClass("flex-active-slide") && "yes" === o.parents("li").attr("data-autoplay") && (void 0 === window.$youtube_players || void 0 === window.$youtube_players[o.attr("id")] || void 0 === window.$youtube_players[o.attr("id")].playVideo ? fusionYouTubeTimeout(o.attr("id")) : "slide" === jQuery(e).data("animation") && 0 === e.currentSlide && void 0 === jQuery(e).data("iteration") ? window.$youtube_players[o.attr("id")] && setTimeout(function() { window.$youtube_players[o.attr("id")].playVideo(), jQuery(e).data("iteration", 1), e.stop(), setTimeout(function() { e.play() }, 1e3 * window.$youtube_players[o.attr("id")].getDuration() - 6e3) }, 2e3) : window.$youtube_players[o.attr("id")].playVideo()), "yes" === t.attr("data-mute") && void 0 !== window.$youtube_players[o.attr("id")] && void 0 !== window.$youtube_players[o.attr("id")].mute && window.$youtube_players[o.attr("id")].mute()), Number(fusionVideoGeneralVars.status_vimeo) && ("function" != typeof fusionGetConsent || fusionGetConsent("vimeo")) && setTimeout(function() { jQuery(e).find("[data-vimeo-video-id] > iframe").each(function() { new Vimeo.Player(jQuery(this)[0]).pause() }), 0 !== e.slides.eq(e.currentSlide).find("[data-vimeo-video-id] > iframe").length && ("yes" === jQuery(e.slides.eq(e.currentSlide)).data("autoplay") && new Vimeo.Player(e.slides.eq(e.currentSlide).find("iframe")[0]).play(), "yes" === jQuery(e.slides.eq(e.currentSlide)).data("mute") && new Vimeo.Player(e.slides.eq(e.currentSlide).find("iframe")[0]).setVolume(0)) }, 300), jQuery(e).find("video").each(function() { "function" == typeof jQuery(this)[0].pause && jQuery(this)[0].pause(), !jQuery(this).parents("li").hasClass("clone") && jQuery(this).parents("li").hasClass("flex-active-slide") && "yes" === jQuery(this).parents("li").attr("data-autoplay") && "function" == typeof jQuery(this)[0].play && jQuery(this)[0].play() })
}
jQuery(document).ready(function() {
    var e;
    e = jQuery("iframe"), jQuery.each(e, function(e, i) {
        var t = jQuery(this).attr("src"),
            o = jQuery(this).data("privacy-src"),
            s = !t && o ? o : t;
        s && Number(fusionVideoGeneralVars.status_vimeo) && 1 <= s.indexOf("vimeo") && jQuery(this).attr("id", "player_" + (e + 1))
    }), jQuery("body").hasClass("fusion-builder-live") ? setTimeout(function() { jQuery(".full-video, .video-shortcode, .wooslider .slide-content, .fusion-portfolio-carousel .fusion-video").not("#bbpress-forums .full-video, #bbpress-forums .video-shortcode, #bbpress-forums .wooslider .slide-content, #bbpress-forums .fusion-portfolio-carousel .fusion-video").fitVids(), jQuery("#bbpress-forums").fitVids() }, 350) : (jQuery(".full-video, .video-shortcode, .wooslider .slide-content, .fusion-portfolio-carousel .fusion-video").not("#bbpress-forums .full-video, #bbpress-forums .video-shortcode, #bbpress-forums .wooslider .slide-content, #bbpress-forums .fusion-portfolio-carousel .fusion-video").fitVids(), jQuery("#bbpress-forums").fitVids())
});
var fusionVideoBgVars = { "status_vimeo": "0", "status_yt": "0" };
var $youtubeBGVideos = {};

function _fbRowGetAllElementsWithAttribute(e) {
    var t, i, o = [],
        a = document.getElementsByTagName("*");
    for (t = 0, i = a.length; t < i; t++) a[t].getAttribute(e) && !jQuery(a[t]).parents(".tfs-slider").length && o.push(a[t]);
    return o
}

function _fbRowOnPlayerReady(e) {
    var t, i, o = e.target,
        a = 0,
        n = !0;
    o.playVideo(), o.isMute && o.mute(), 0 !== jQuery("[data-youtube-video-id=" + o.getVideoData().video_id + "]").data("loop") && (t = o.getCurrentTime(), i = +new Date / 1e3, o.loopInterval = setInterval(function() { void 0 !== o.loopTimeout && clearTimeout(o.loopTimeout), t === o.getCurrentTime() ? a = t + (+new Date / 1e3 - i) : (a = o.getCurrentTime(), i = +new Date / 1e3), t = o.getCurrentTime(), a + (n ? .45 : .21) >= o.getDuration() && (o.pauseVideo(), o.seekTo(0), o.playVideo(), n = !1) }, 150))
}

function _fbRowOnPlayerStateChange(e) { e.data === YT.PlayerState.ENDED ? (void 0 !== e.target.loopTimeout && clearTimeout(e.target.loopTimeout), 0 !== jQuery("[data-youtube-video-id=" + e.target.getVideoData().video_id + "]").data("loop") && e.target.seekTo(0)) : e.data === YT.PlayerState.PLAYING && jQuery(e.target.getIframe()).parent().css("opacity", "1") }

function resizeVideo(e) {
    var t, i, o, a, n, d, r, s, u, f, v, c, m, l, p, y = e.parent();
    y.find("iframe").hasClass("fusion-hidden") && y.find("iframe").attr("data-privacy-src") || (null !== y.find("iframe").width() ? ((t = e).css({ width: "auto", height: "auto", left: "auto", top: "auto" }), t.css("position", "absolute"), l = y.find("> div").data("display"), a = y.width(), n = y.height(), i = y.outerWidth(), o = y.outerHeight(), s = [16, 9], void 0 !== e.attr("data-video-aspect-ratio") && -1 !== e.attr("data-video-aspect-ratio").indexOf(":") && ((s = e.attr("data-video-aspect-ratio").split(":"))[0] = parseFloat(s[0]), s[1] = parseFloat(s[1])), r = o, d = s[0] / s[1] * o, "contain" === l ? (y.css("paddingTop", y.parent("li").find(".slide-content-container").css("paddingTop")), r >= o && (u = o, f = s[0] / s[1] * o), f >= i && (f = i, u = s[1] / s[0] * i)) : d >= i && r >= o ? (u = o, f = s[0] / s[1] * o) : (f = i, u = s[1] / s[0] * i), v = -(u - n) / 2, y.hasClass("fusion-flex-container") ? (c = "auto", m = "auto") : (c = -(f - a) / 2, m = "0"), 1 > y.find(".fusion-video-cover").length && y.find("iframe").parent().prepend('<div class="fusion-video-cover">&nbsp;</div>'), y.is(":visible") && (y.find(".fusion-video-cover").css({ "z-index": 0, width: f, height: u, position: "absolute" }), p = "iframe", y.hasClass("video-background") && (p = "iframe.fusion-container-video-bg"), jQuery("body").hasClass("rtl") ? y.find(p).parent().css({ marginRight: c, marginLeft: m, marginTop: v }) : y.find(p).parent().css({ marginRight: m, marginLeft: c, marginTop: v }), y.find(p).css({ width: f, height: u, "z-index": -1 }))) : setTimeout(function() { resizeVideo(e) }, 500))
}

function vimeoReady(e) {
    var t, i = jQuery("#" + e).parents("[data-vimeo-video-id]").first();
    ("function" != typeof fusionGetConsent || fusionGetConsent("vimeo")) && (t = new Vimeo.Player(e), "yes" === i.data("mute") && t.setVolume(0), "no" === i.data("mute") && t.setVolume(1), t.on("timeupdate", function(e) { i.css("opacity", "1"), t.off("timeupdate") }), jQuery("#" + e).attr("data-privacy-src") && resizeVideo(i))
}

function fusionInitVimeoPlayers() {
    var e, t, i, o, a;
    if (("function" != typeof fusionGetConsent || fusionGetConsent("vimeo")) && Number(fusionVideoBgVars.status_vimeo) && 0 < (e = jQuery("[data-vimeo-video-id]")).length)
        for (i = (t = e.find('> iframe, iframe[data-privacy-type="vimeo"]')).length, a = 0; a < i; a++) o = t[a], "function" == typeof vimeoReady && vimeoReady(o.getAttribute("id"))
}
jQuery(document).ready(function(e) {
    e("body").hasClass("vc_editor") || (e(".bg-parallax.video, .fusion-bg-parallax.video").each(function() { e(this).prependTo(e(this).next().addClass("video")), e(this).css({ opacity: Math.abs(parseFloat(e(this).attr("data-opacity")) / 100) }) }), e("[data-youtube-video-id], [data-vimeo-video-id]").parent().css("overflow", "hidden"), e("[data-youtube-video-id], [data-vimeo-video-id]").each(function() {
        var t = e(this);
        setTimeout(function() { resizeVideo(t) }, 100)
    }), e("[data-youtube-video-id], [data-vimeo-video-id]").each(function() {
        var t = e(this);
        setTimeout(function() { resizeVideo(t) }, 1e3)
    }), e(window).on("resize", function() {
        e("[data-youtube-video-id], [data-vimeo-video-id]").each(function() {
            var t = e(this);
            setTimeout(function() { resizeVideo(t) }, 2)
        })
    }), fusionInitVimeoPlayers())
}), jQuery(window).on("load fusion-element-render-fusion_builder_container", function(e, t) {
    var i = void 0 !== t ? jQuery('div[data-cid="' + t + '"]').find("[data-youtube-video-id], [data-vimeo-video-id]") : jQuery("[data-youtube-video-id], [data-vimeo-video-id]");
    void 0 !== t && Number(fusionVideoBgVars.status_yt) && "undefined" != typeof onYouTubeIframeAPIReady && onYouTubeIframeAPIReady(), i.each(function() {
        var e = jQuery(this);
        setTimeout(function() { resizeVideo(e) }, 500)
    })
});
var fusionLightboxVars = { "status_lightbox": "1", "lightbox_gallery": "1", "lightbox_skin": "dark", "lightbox_title": "", "lightbox_arrows": "1", "lightbox_slideshow_speed": "5000", "lightbox_autoplay": "", "lightbox_opacity": "0.90", "lightbox_desc": "", "lightbox_social": "", "lightbox_social_links": { "facebook": { "source": "https:\/\/www.facebook.com\/sharer.php?u={URL}", "text": "Share on Facebook" }, "twitter": { "source": "https:\/\/twitter.com\/share?url={URL}", "text": "Share on Twitter" }, "linkedin": { "source": "https:\/\/www.linkedin.com\/shareArticle?mini=true&url={URL}", "text": "Share on LinkedIn" }, "whatsapp": { "source": "https:\/\/api.whatsapp.com\/send?text={URL}", "text": "Share on WhatsApp" }, "pinterest": { "source": "https:\/\/pinterest.com\/pin\/create\/button\/?url={URL}", "text": "Share on Pinterest" }, "mail": { "source": "mailto:?body={URL}", "text": "Share by Email" } }, "lightbox_deeplinking": "1", "lightbox_path": "horizontal", "lightbox_post_images": "1", "lightbox_animation_speed": "normal", "l10n": { "close": "Press Esc to close", "enterFullscreen": "Enter Fullscreen (Shift+Enter)", "exitFullscreen": "Exit Fullscreen (Shift+Enter)", "slideShow": "Slideshow", "next": "Next", "previous": "Previous" } };

function avadaLightBoxInitializeLightbox() { window.$ilInstances && jQuery.each(window.$ilInstances, function(t, i) { window.$ilInstances[t].destroy() }), window.avadaLightBox.initialize_lightbox() }
window.avadaLightBox = {}, void 0 === window.$ilInstances && (window.$ilInstances = {}), window.avadaLightBox.initialize_lightbox = function() {
    "use strict";
    1 === Number(fusionLightboxVars.status_lightbox) && (window.avadaLightBox.set_title_and_caption(), window.avadaLightBox.activate_lightbox())
}, window.avadaLightBox.activate_lightbox = function(t) {
    "use strict";
    var i, e = [],
        o = 1;
    void 0 === t && (t = jQuery("body")), t.find('[data-rel^="prettyPhoto["], [rel^="prettyPhoto["], [data-rel^="iLightbox["], [rel^="iLightbox["]').each(function() {
        var t, i, o, a, n = ["bmp", "gif", "jpeg", "jpg", "png", "tiff", "tif", "jfif", "jpe", "svg", "mp4", "ogg", "webm", "webp"],
            r = 0,
            s = jQuery(this).attr("href");
        for (void 0 === s && (s = ""), t = 0; t < n.length; t++) r += String(s).toLowerCase().indexOf("." + n[t]);
        i = /http(s?):\/\/(www\.)?vimeo.com\/(\d+)/, s.match(i) && (r = 1), i = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/, s.match(i) && (r = 1), -1 * n.length === parseInt(r, 10) && (jQuery(this).addClass("fusion-no-lightbox"), jQuery(this).removeAttr("data-rel rel")), jQuery(this).hasClass("fusion-no-lightbox") || (null != (o = this.getAttribute("data-rel")) && -1 === jQuery.inArray(o, e) && e.push(o), null != (a = this.getAttribute("data-rel")) && (jQuery(this).parents(".gallery").length && (a = a.replace("postimages", jQuery(this).parents(".gallery").attr("id")), jQuery(this).attr("data-rel", a)), -1 === jQuery.inArray(a, e) && e.push(a)))
    }), i = 1, t.find(".tiled-gallery").each(function() {
        jQuery(this).find(".tiled-gallery-item > a").each(function() {
            var t = this.getAttribute("data-rel");
            null == t && (t = "iLightbox[tiled-gallery-" + i + "]", jQuery(this).attr("data-rel", t)), -1 === jQuery.inArray(t, e) && e.push(t)
        }), i++
    }), jQuery.each(e, function(t, i) { o++, 1 === jQuery('[data-rel="' + i + '"], [rel="' + i + '"]').length ? window.$ilInstances[i] = jQuery('[data-rel="' + i + '"], [rel="' + i + '"]').iLightBox(window.avadaLightBox.prepare_options(i, !1)) : window.$ilInstances[i] = jQuery('[data-rel="' + i + '"], [rel="' + i + '"]').iLightBox(window.avadaLightBox.prepare_options(i)) }), t.find('a[rel="prettyPhoto"], a[data-rel="prettyPhoto"], a[rel="iLightbox"], a[data-rel="iLightbox"]').each(function() { var t = jQuery(this).attr("href"); "" !== t && void 0 !== t && (window.$ilInstances["single_" + o] = jQuery(this).iLightBox(window.avadaLightBox.prepare_options("single")), o++) }), t.find("#lightbox-link, .lightbox-link, .fusion-lightbox-link").each(function() { var t = jQuery(this).attr("href"); "" !== t && void 0 !== t && (window.$ilInstances["single_" + o] = jQuery(this).iLightBox(window.avadaLightBox.prepare_options("single")), o++) }), fusionLightboxVars.lightbox_post_images && t.find(".type-post .post-content a, #posts-container .post .post-content a, .fusion-blog-shortcode .post .post-content a, .type-avada_portfolio .project-content a, .fusion-portfolio .fusion-portfolio-wrapper .fusion-post-content, .summary-container .post-content a, .woocommerce-tabs .post-content a").has("img").each(function() {
        var t, i = ["bmp", "gif", "jpeg", "jpg", "png", "tiff", "tif", "jfif", "jpe", "svg", "mp4", "ogg", "webm", "webp"],
            e = 0;
        for (t = 0; t < i.length; t++) e += String(jQuery(this).attr("href")).toLowerCase().indexOf("." + i[t]); - 1 * i.length === parseInt(e, 10) && (jQuery(this).addClass("fusion-no-lightbox"), jQuery(this).removeAttr("data-rel rel")), -1 !== String(jQuery(this).attr("rel")).indexOf("prettyPhoto") || -1 !== String(jQuery(this).attr("data-rel")).indexOf("prettyPhoto") || -1 !== String(jQuery(this).attr("rel")).indexOf("iLightbox") || -1 !== String(jQuery(this).attr("data-rel")).indexOf("iLightbox") || jQuery(this).hasClass("fusion-no-lightbox") || (jQuery(this).attr("data-caption", jQuery(this).parent().find("p.wp-caption-text").text()), window.$ilInstances["single_" + o] = jQuery(this).iLightBox(window.avadaLightBox.prepare_options("post")), o++)
    })
}, window.avadaLightBox.set_title_and_caption = function() {
    "use strict";
    jQuery('a[rel^="prettyPhoto"], a[data-rel^="prettyPhoto"]').each(function() { jQuery(this).attr("data-caption") || (jQuery(this).attr("title") ? jQuery(this).attr("data-caption", jQuery(this).attr("title")) : jQuery(this).attr("data-caption", jQuery(this).parents(".gallery-item").find(".gallery-caption").text())), jQuery(this).attr("data-title") || jQuery(this).attr("data-title", jQuery(this).find("img").attr("alt")) }), jQuery('a[rel^="iLightbox"], a[data-rel^="iLightbox"]').each(function() { jQuery(this).attr("data-caption") || jQuery(this).attr("data-caption", jQuery(this).parents(".gallery-item").find(".gallery-caption").text()) })
}, window.avadaLightBox.prepare_options = function(t, i) {
    "use strict";
    var e, o, a = !0;
    return void 0 === i && (i = fusionLightboxVars.lightbox_gallery, a = !(!0 === fusionLightboxVars.lightbox_autoplay || "true" === fusionLightboxVars.lightbox_autoplay || 1 === fusionLightboxVars.lightbox_autoplay || "1" === fusionLightboxVars.lightbox_autoplay)), e = { fast: 100, slow: 800, normal: 400 }, o = {
        skin: fusionLightboxVars.lightbox_skin,
        smartRecognition: !1,
        minScale: .075,
        show: { title: fusionLightboxVars.lightbox_title, speed: e[fusionLightboxVars.lightbox_animation_speed.toLowerCase()] },
        path: fusionLightboxVars.lightbox_path,
        controls: { slideshow: i, arrows: fusionLightboxVars.lightbox_arrows },
        slideshow: { pauseTime: fusionLightboxVars.lightbox_slideshow_speed, pauseOnHover: !1, startPaused: a },
        overlay: { opacity: fusionLightboxVars.lightbox_opacity },
        caption: { start: fusionLightboxVars.lightbox_desc, show: "", hide: "" },
        isMobile: !0,
        callback: {
            onShow: function(t, i) {
                var e = jQuery(t.currentElement).find('iframe[src*="youtube.com"]');
                jQuery('.ilightbox-container iframe[src*="youtube.com"]').not(e).each(function() { this.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*") }), jQuery(t.currentElement).trapFocus()
            },
            onAfterChange: function(t) {
                var i = jQuery(t.currentElement).find('iframe[src*="youtube.com"]'),
                    e = i.length ? i.attr("src") : "";
                jQuery('.ilightbox-container iframe[src*="youtube.com"]').not(i).each(function() { this.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*") }), i.length && -1 !== e.indexOf("autoplay=1") && i[0].contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', "*")
            },
            onHide: function(t) { jQuery(document).off(".fusionLightbox") }
        }
    }, fusionLightboxVars.lightbox_social && (o.social = { buttons: fusionLightboxVars.lightbox_social_links }), Number(fusionLightboxVars.lightbox_deeplinking) && (o.linkId = t), o.text = window.fusionLightboxVars.l10n, o
}, window.avadaLightBox.refresh_lightbox = function() {
    "use strict";
    window.avadaLightBox.set_title_and_caption(), jQuery.each(window.$ilInstances, function(t, i) { i.hasOwnProperty("refresh") && i.refresh() })
}, void 0 === window.$ilInstances && (window.$ilInstances = {}), jQuery(document).ajaxComplete(function(t, i, e) { "use strict"; - 1 === e.url.indexOf("https://vimeo.com/api/oembed.json") && window.avadaLightBox.refresh_lightbox() }), jQuery(window).on("load", function() {
    "use strict";
    window.avadaLightBox.initialize_lightbox()
}), jQuery.fn.trapFocus = function() {
    var t, i, e = jQuery(this).find('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    e.length && (t = e[0], i = e[e.length - 1], jQuery(document).on("keydown.fusionLightbox", function(e) {
        ("Tab" === e.key || 9 === e.keyCode) && (e.shiftKey ? t === document.activeElement && (i.focus(), e.preventDefault()) : i === document.activeElement && (t.focus(), e.preventDefault()))
    }), t.focus())
};
(function() {
    var t, i;
    t = this.jQuery || window.jQuery, i = t(window), t.fn.stick_in_parent = function(s) {
        var o, n, e, r, c, a, f, u, l, g, d, k, h, p, y, v, m, b, _, C;
        for (null == s && (s = {}), k = s.sticky_class, a = s.inner_scrolling, d = s.recalc_every, g = s.parent, l = s.offset_top, u = s.spacer, e = s.bottoming, h = void 0 !== s.transition_offset && parseFloat(s.transition_offset), p = void 0 !== s.observer && s.observer, y = void 0 !== s.scroll_transition && parseFloat(s.scroll_transition), v = void 0 !== s.clone && s.clone, m = !1, adminBarHeight = fusion.getAdminbarHeight(), null == l && (l = 0), "fusion-container-stuck" === k && "object" == typeof fusion && "function" == typeof fusion.getHeight && (l = fusion.getHeight(l) + adminBarHeight), null == g && (g = void 0), null == a && (a = !0), null == k && (k = "is_stuck"), o = t(document), null == e && (e = !0), r = function(n, r, c, f, w, x, j, H) {
                var z, I, A, O, Q, B, M, R, T, F, G, S, W;
                if (!n.data("sticky_kit")) {
                    if (n.attr("data-sticky_kit", !0), Q = o.height(), M = n.parent(), null != g && (M = M.closest(g)), !M.length) throw "failed to find stick parent";
                    if (A = !1, z = !1, null != u ? G = u && n.closest(u) : v ? (G = n.clone(!1)).addClass("fusion-sticky-spacer").removeClass("fusion-sticky-transition") : G = jQuery('<div class="fusion-sticky-spacer" />'), G && G.css("position", n.css("position")), overlap = function(t, i) { "object" == typeof t && "object" == typeof t[0] && (t[0].isIntersecting ? n.removeClass("fusion-sticky-transition") : n.addClass("fusion-sticky-transition")) }, p && (W = new IntersectionObserver(overlap, { rootMargin: "0px", threshold: 1 })), e && "function" == typeof ResizeObserver && new ResizeObserver(function(t) {
                            let i = t[0].contentRect;
                            f = i.height, _()
                        }).observe(M[0]), (R = function() { var t, i, s, e; if (!H) return Q = o.height(), t = parseInt(M.css("border-top-width"), 10), i = parseInt(M.css("padding-top"), 10), r = parseInt(M.css("padding-bottom"), 10), c = M.offset().top + t + i, f = M.height(), A && (A = !1, z = !1, null == u && (n.next(".fusion-sticky-spacer").length ? G = n.next(".fusion-sticky-spacer") : n.insertAfter(G)), n.css({ position: "", top: "", width: "", bottom: "" }).removeClass(k), s = !0), w = n.offset().top - (parseInt(n.css("margin-top"), 10) || 0) - l, x = n.outerHeight(!0), j = n.css("float"), G && (e = { width: n.outerWidth(!0), display: n.css("display"), "vertical-align": n.css("vertical-align"), float: j }, v || (e.height = x), G.css(e)), s ? S() : void 0 })(), x !== f) {
                        if (O = void 0, B = l, F = d, S = function() { var t, s, g, v, m, b; if (!H) return g = !1, null != F && 0 >= (F -= 1) && (F = d, R(), g = !0), null == F || g || o.height() === Q || (R(), g = !0), v = i.scrollTop(), null != O && (s = v - O), O = v, A ? (e && (m = v + x + B > f + c, z && !m && (z = !1, n.css({ position: "fixed", bottom: "", top: B }).trigger("sticky_kit:unbottom"))), v < w && (A = !1, B = l, null == u && ("left" !== j && "right" !== j || n.insertAfter(G), G && G.detach()), t = { position: "", width: "", top: "" }, n.css(t).removeClass(k).trigger("sticky_kit:unstick"), "fusion-container-stuck" === k && i.trigger("fusion-sticky-change")), a && (b = i.height(), x + l > b && (z || (B -= s, B = Math.max(b - x, B), B = Math.min(l, B), A && n.css({ top: B + "px" }))))) : v > w && (A = !0, (t = { position: "fixed", top: B }).width = "border-box" === n.css("box-sizing") ? n.outerWidth() + "px" : n.width() + "px", n.css(t).addClass(k), null == u && (n.after(G), "left" !== j && "right" !== j || G.append(n)), n.trigger("sticky_kit:stick"), "fusion-container-stuck" === k && i.trigger("fusion-sticky-change")), !1 === h || p || (!n.is(".fusion-sticky-transition") && v - w > h ? (n.addClass("fusion-sticky-transition"), "fusion-container-stuck" === k && i.trigger("fusion-sticky-transition-change")) : n.is(".fusion-sticky-transition") && v - w <= h && (n.removeClass("fusion-sticky-transition"), "fusion-container-stuck" === k && i.trigger("fusion-sticky-transition-change"))), !1 !== y && 0 !== y && (0 > s ? n.hasClass("fusion-scrolling-up") || (n.addClass("fusion-scrolling-up").removeClass("fusion-scrolling-down"), i.trigger("fusion-sticky-scroll-change")) : n.hasClass("fusion-scrolling-down") || (n.addClass("fusion-scrolling-down").removeClass("fusion-scrolling-up"), i.trigger("fusion-sticky-scroll-change")), !n.is(".fusion-sticky-scroll-transition") && v - w > y ? (n.addClass("fusion-sticky-scroll-transition"), "fusion-container-stuck" === k && i.trigger("fusion-sticky-scroll-change")) : n.is(".fusion-sticky-scroll-transition") && v - w <= y && (n.removeClass("fusion-sticky-scroll-transition"), "fusion-container-stuck" === k && i.trigger("fusion-sticky-scroll-change"))), A && e && (null == m && (m = v + x + B > f + c), !z && m) ? (z = !0, "static" === M.css("position") && M.css({ position: "relative" }), n.css({ position: "absolute", bottom: r, top: "auto" }).trigger("sticky_kit:bottom")) : void 0 }, T = function() { return R(), S() }, _ = function(t) { var i; "object" == typeof fusion && "function" == typeof fusion.getHeight && (l = void 0 === s.offset_top ? 0 : s.offset_top, "fusion-container-stuck" === k ? l = fusion.getHeight(l) + adminBarHeight : "fusion-sidebar-stuck" === k && jQuery(".fusion-tb-header").length && "function" == typeof fusionGetStickyOffset && (i = fusionGetStickyOffset()) && (l = i + adminBarHeight + 50), B = l), T(), void 0 !== t && "string" == typeof t.type && "resize" === t.type && "function" == typeof D && D() }, "object" == typeof fusion && "function" == typeof fusion.debounce) var D = fusion.debounce(_, 350);
                        return C = function(t) { m || (m = !0, _(t), D(), setTimeout(function() { m = !1 }, 100)) }, b = function() { p && W.observe(n.next()[0]) }, I = function() {
                            if (H = !0, i.off("touchmove", S), i.off("scroll", S), i.off("resize", _), t(document.body).off("sticky_kit:recalc", T), "fusion-container-stuck" === k && i.trigger("fusion-sticky-change"), n.off("sticky_kit:detach", I), n.removeData("sticky_kit"), n.removeAttr("data-sticky_kit"), n.css({ position: "", bottom: "", top: "", width: "" }), n.removeClass("fusion-sticky-transition"), M.position("position", ""), A) return null == u && ("left" !== j && "right" !== j || n.insertAfter(G), G.remove()), n.removeClass(k);
                            n.next(".fusion-sticky-spacer").length && n.next(".fusion-sticky-spacer").remove()
                        }, G && G.detach(), "fusion-sidebar-stuck" === k && jQuery(".fusion-tb-header").length && i.on("fusion-sticky-change fusion-sticky-scroll-change fusion-sticky-transition-change", C), i.on("touchmove", S), i.on("scroll", S), i.on("resize", _), t(document.body).on("sticky_kit:recalc", T), n.on("sticky_kit:detach", I), n.on("sticky_kit:stick", b), setTimeout(S, 0)
                    }
                }
            }, c = 0, f = this.length; c < f; c++) n = this[c], r(t(n));
        return this
    }
}).call(this);
! function(t, e) {
    var a = function(t, e, a) {
        "use strict";
        var n, i;
        if (function() { var e, a = { lazyClass: "lazyload", loadedClass: "lazyloaded", loadingClass: "lazyloading", preloadClass: "lazypreload", errorClass: "lazyerror", autosizesClass: "lazyautosizes", fastLoadedClass: "ls-is-cached", iframeLoadMode: 0, srcAttr: "data-orig-src", srcsetAttr: "data-srcset", sizesAttr: "data-sizes", minSize: 40, customMedia: {}, init: !0, expFactor: 1.5, hFac: .8, loadMode: 2, loadHidden: !0, ricTimeout: 0, throttleDelay: 125 }; for (e in i = t.lazySizesConfig || t.lazysizesConfig || {}, a) e in i || (i[e] = a[e]) }(), !e || !e.getElementsByClassName) return { init: function() {}, cfg: i, noSupport: !0 };
        var r = e.documentElement,
            s = t.HTMLPictureElement,
            o = t.addEventListener.bind(t),
            l = t.setTimeout,
            d = t.requestAnimationFrame || l,
            u = t.requestIdleCallback,
            c = /^picture$/i,
            f = ["load", "error", "lazyincluded", "_lazyloaded"],
            g = {},
            m = Array.prototype.forEach,
            v = function(t, e) { return g[e] || (g[e] = new RegExp("(\\s|^)" + e + "(\\s|$)")), g[e].test(t.getAttribute("class") || "") && g[e] },
            y = function(t, e) { v(t, e) || t.setAttribute("class", (t.getAttribute("class") || "").trim() + " " + e) },
            z = function(t, e) {
                var a;
                (a = v(t, e)) && t.setAttribute("class", (t.getAttribute("class") || "").replace(a, " "))
            },
            h = function(t, e, a) {
                var n = a ? "addEventListener" : "removeEventListener";
                a && h(t, e), f.forEach(function(a) { t[n](a, e) })
            },
            b = function(t, a, i, r, s) { var o = e.createEvent("Event"); return i || (i = {}), i.instance = n, o.initEvent(a, !r, !s), o.detail = i, t.dispatchEvent(o), o },
            p = function(e, a) { var n;!s && (n = t.picturefill || i.pf) ? (a && a.src && !e.getAttribute("srcset") && e.setAttribute("srcset", a.src), n({ reevaluate: !0, elements: [e] })) : a && a.src && (e.src = a.src) },
            A = function(t, e) { return (getComputedStyle(t, null) || {})[e] },
            C = function(t, e, a) { for (a = a || t.offsetWidth; a < i.minSize && e && !t._lazysizesWidth;) a = e.offsetWidth, e = e.parentNode; return a },
            E = (R = [], k = [], D = R, H = function() {
                var t = D;
                for (D = R.length ? k : R, T = !0, F = !1; t.length;) t.shift()();
                T = !1
            }, I = function(t, a) { T && !a ? t.apply(this, arguments) : (D.push(t), F || (F = !0, (e.hidden ? l : d)(H))) }, I._lsFlush = H, I),
            _ = function(t, e) {
                return e ? function() { E(t) } : function() {
                    var e = this,
                        a = arguments;
                    E(function() { t.apply(e, a) })
                }
            },
            L = function(t) {
                var e, n, i = function() { e = null, t() },
                    r = function() {
                        var t = a.now() - n;
                        t < 99 ? l(r, 99 - t) : (u || i)(i)
                    };
                return function() { n = a.now(), e || (e = l(r, 99)) }
            },
            w = function() {
                var s, f, g, C, w, N, x, W, S, B, T, F, R, k, D, H, I, O, P, $ = /^img$/i,
                    q = /^iframe$/i,
                    U = "onscroll" in t && !/(gle|ing)bot/.test(navigator.userAgent),
                    j = 0,
                    G = 0,
                    J = -1,
                    K = function(t) { G--, (!t || G < 0 || !t.target) && (G = 0) },
                    Q = function(t) { return null == F && (F = "hidden" == A(e.body, "visibility")), F || !("hidden" == A(t.parentNode, "visibility") && "hidden" == A(t, "visibility")) },
                    V = function(t, a) {
                        var n, i = t,
                            s = Q(t);
                        for (W -= a, T += a, S -= a, B += a; s && (i = i.offsetParent) && i != e.body && i != r;)(s = (A(i, "opacity") || 1) > 0) && "visible" != A(i, "overflow") && (n = i.getBoundingClientRect(), s = B > n.left && S < n.right && T > n.top - 1 && W < n.bottom + 1);
                        return s
                    },
                    X = function() {
                        var t, a, o, l, d, u, c, g, m, v, y, z, h = n.elements;
                        if ((C = i.loadMode) && G < 8 && (t = h.length)) {
                            for (a = 0, J++; a < t; a++)
                                if (h[a] && !h[a]._lazyRace)
                                    if (!U || n.prematureUnveil && n.prematureUnveil(h[a])) it(h[a]);
                                    else if ((g = h[a].getAttribute("data-expand")) && (u = 1 * g) || (u = j), v || (v = !i.expand || i.expand < 1 ? r.clientHeight > 500 && r.clientWidth > 500 ? 500 : 370 : i.expand, n._defEx = v, y = v * i.expFactor, z = i.hFac, F = null, j < y && G < 1 && J > 2 && C > 2 && !e.hidden ? (j = y, J = 0) : j = C > 1 && J > 1 && G < 6 ? v : 0), m !== u && (N = innerWidth + u * z, x = innerHeight + u, c = -1 * u, m = u), o = h[a].getBoundingClientRect(), (T = o.bottom) >= c && (W = o.top) <= x && (B = o.right) >= c * z && (S = o.left) <= N && (T || B || S || W) && (i.loadHidden || Q(h[a])) && (f && G < 3 && !g && (C < 3 || J < 4) || V(h[a], u))) { if (it(h[a]), d = !0, G > 9) break } else !d && f && !l && G < 4 && J < 4 && C > 2 && (s[0] || i.preloadAfterLoad) && (s[0] || !g && (T || B || S || W || "auto" != h[a].getAttribute(i.sizesAttr))) && (l = s[0] || h[a]);
                            l && !d && it(l)
                        }
                    },
                    Y = (R = X, D = 0, H = i.throttleDelay, I = i.ricTimeout, O = function() { k = !1, D = a.now(), R() }, P = u && I > 49 ? function() { u(O, { timeout: I }), I !== i.ricTimeout && (I = i.ricTimeout) } : _(function() { l(O) }, !0), function(t) {
                        var e;
                        (t = !0 === t) && (I = 33), k || (k = !0, (e = H - (a.now() - D)) < 0 && (e = 0), t || e < 9 ? P() : l(P, e))
                    }),
                    Z = function(t) {
                        var e = t.target;
                        e._lazyCache ? delete e._lazyCache : (K(t), y(e, i.loadedClass), z(e, i.loadingClass), h(e, et), b(e, "lazyloaded"))
                    },
                    tt = _(Z),
                    et = function(t) { tt({ target: t.target }) },
                    at = function(t) {
                        var e, a = t.getAttribute(i.srcsetAttr);
                        (e = i.customMedia[t.getAttribute("data-media") || t.getAttribute("media")]) && t.setAttribute("media", e), a && t.setAttribute("srcset", a)
                    },
                    nt = _(function(t, e, a, n, r) {
                        var s, o, d, u, f, v;
                        (f = b(t, "lazybeforeunveil", e)).defaultPrevented || (n && (a ? y(t, i.autosizesClass) : t.setAttribute("sizes", n)), o = t.getAttribute(i.srcsetAttr), s = t.getAttribute(i.srcAttr), r && (d = t.parentNode, u = d && c.test(d.nodeName || "")), v = e.firesLoad || "src" in t && (o || s || u), f = { target: t }, y(t, i.loadingClass), v && (clearTimeout(g), g = l(K, 2500), h(t, et, !0)), u && m.call(d.getElementsByTagName("source"), at), o ? t.setAttribute("srcset", o) : s && !u && (q.test(t.nodeName) ? function(t, e) {
                            var a = t.getAttribute("data-load-mode") || i.iframeLoadMode;
                            0 == a ? t.contentWindow.location.replace(e) : 1 == a && (t.src = e)
                        }(t, s) : t.src = s), r && (o || u) && p(t, { src: s })), t._lazyRace && delete t._lazyRace, z(t, i.lazyClass), E(function() {
                            var e = t.complete && t.naturalWidth > 1;
                            v && !e || (e && y(t, i.fastLoadedClass), Z(f), t._lazyCache = !0, l(function() { "_lazyCache" in t && delete t._lazyCache }, 9)), "lazy" == t.loading && G--
                        }, !0)
                    }),
                    it = function(t) {
                        if (!t._lazyRace) {
                            var e, a = $.test(t.nodeName),
                                n = a && (t.getAttribute(i.sizesAttr) || t.getAttribute("sizes")),
                                r = "auto" == n;
                            (!r && f || !a || !t.getAttribute("src") && !t.srcset || t.complete || v(t, i.errorClass) || !v(t, i.lazyClass)) && (e = b(t, "lazyunveilread").detail, r && M.updateElem(t, !0, t.offsetWidth), t._lazyRace = !0, G++, nt(t, e, r, n, a))
                        }
                    },
                    rt = L(function() { i.loadMode = 3, Y() }),
                    st = function() { 3 == i.loadMode && (i.loadMode = 2), rt() },
                    ot = function() { f || (a.now() - w < 999 ? l(ot, 999) : (f = !0, i.loadMode = 3, Y(), o("scroll", st, !0))) };
                return {
                    _: function() {
                        w = a.now(), n.elements = e.getElementsByClassName(i.lazyClass), s = e.getElementsByClassName(i.lazyClass + " " + i.preloadClass), o("scroll", Y, !0), o("resize", Y, !0), o("pageshow", function(t) {
                            if (t.persisted) {
                                var a = e.querySelectorAll("." + i.loadingClass);
                                a.length && a.forEach && d(function() { a.forEach(function(t) { t.complete && it(t) }) })
                            }
                        }), t.MutationObserver ? new MutationObserver(Y).observe(r, { childList: !0, subtree: !0, attributes: !0 }) : (r.addEventListener("DOMNodeInserted", Y, !0), r.addEventListener("DOMAttrModified", Y, !0), setInterval(Y, 999)), o("hashchange", Y, !0), ["focus", "mouseover", "click", "load", "transitionend", "animationend"].forEach(function(t) { e.addEventListener(t, Y, !0) }), /d$|^c/.test(e.readyState) ? ot() : (o("load", ot), e.addEventListener("DOMContentLoaded", Y), l(ot, 2e4)), n.elements.length ? (X(), E._lsFlush()) : Y()
                    },
                    checkElems: Y,
                    unveil: it,
                    _aLSL: st
                }
            }(),
            M = (W = _(function(t, e, a, n) {
                var i, r, s;
                if (t._lazysizesWidth = n, n += "px", t.setAttribute("sizes", n), c.test(e.nodeName || ""))
                    for (i = e.getElementsByTagName("source"), r = 0, s = i.length; r < s; r++) i[r].setAttribute("sizes", n);
                a.detail.dataAttr || p(t, a.detail)
            }), S = function(t, e, a) {
                var n, i = t.parentNode;
                i && (a = C(t, i, a), (n = b(t, "lazybeforesizes", { width: a, dataAttr: !!e })).defaultPrevented || (a = n.detail.width) && a !== t._lazysizesWidth && W(t, i, n, a))
            }, B = L(function() {
                var t, e = x.length;
                if (e)
                    for (t = 0; t < e; t++) S(x[t])
            }), { _: function() { x = e.getElementsByClassName(i.autosizesClass), o("resize", B) }, checkElems: B, updateElem: S }),
            N = function() {!N.i && e.getElementsByClassName && (N.i = !0, M._(), w._()) };
        var x, W, S, B;
        var T, F, R, k, D, H, I;
        return l(function() { i.init && N() }), n = { cfg: i, autoSizer: M, loader: w, init: N, uP: p, aC: y, rC: z, hC: v, fire: b, gW: C, rAF: E }
    }(t, t.document, Date);
    t.lazySizes = a, "object" == typeof module && module.exports && (module.exports = a)
}("undefined" != typeof window ? window : {}), document.addEventListener("lazybeforeunveil", function(t) {
    var e = t.target.getAttribute("data-bg"),
        a = t.target.getAttribute("data-bg-gradient");
    a && e ? t.target.style.backgroundImage = a + ",url(" + e + ")" : e && (t.target.style.backgroundImage = "url(" + e + ")")
});
jQuery(document).ready(function() { jQuery(".fusion-footer .fusion-footer-widget-area .fusion-column").each(function() { jQuery(this).is(":empty") && jQuery(this).css("margin-bottom", "0") }), jQuery(".fusion-social-links-footer").find(".fusion-social-networks").children().length || (jQuery(".fusion-social-links-footer").hide(), jQuery(".fusion-footer-copyright-area .fusion-copyright-notice").css("padding-bottom", "0")) });

function avadaAddQuantityBoxes(t, a) {
    var e = !1;
    t || (t = ".qty"), a || (a = jQuery("div.quantity:not(.buttons_added), td.quantity:not(.buttons_added)").find(t)), a.length && (jQuery.each(a, function(t, a) { "date" === jQuery(a).prop("type") || "hidden" === jQuery(a).prop("type") || jQuery(a).parent().parent().hasClass("tribe-block__tickets__item__quantity__number") || jQuery(a).parent().hasClass("buttons_added") || (jQuery(a).parent().addClass("buttons_added").prepend('<input type="button" value="-" class="minus" />'), jQuery(a).addClass("input-text").after('<input type="button" value="+" class="plus" />'), e = !0) }), e && (jQuery("input" + t + ":not(.product-quantity input" + t + ")").each(function() {
        var t = parseFloat(jQuery(this).attr("min"));
        t && 0 < t && parseFloat(jQuery(this).val()) < t && jQuery(this).val(t)
    }), jQuery(".plus, .minus").off("click"), jQuery(".plus, .minus").on("click", function() {
        var a = jQuery(this).parent().find(t),
            e = parseFloat(a.val()),
            n = parseFloat(a.attr("max")),
            i = parseFloat(a.attr("min")),
            u = a.attr("step");
        e && "" !== e && "NaN" !== e || (e = 0), "" !== n && "NaN" !== n || (n = ""), "" !== i && "NaN" !== i || (i = 0), "any" !== u && "" !== u && void 0 !== u && "NaN" !== parseFloat(u) || (u = 1), jQuery(this).is(".plus") ? n && (n == e || e > n) ? a.val(n) : a.val(e + parseFloat(u)) : i && (i == e || e < i) ? a.val(i) : 0 < e && a.val(e - parseFloat(u)), a.trigger("change")
    })))
}

function compositeAddQuantityBoxes() { avadaAddQuantityBoxes() }
jQuery(window).on("load fusion-element-render-fusion_tb_woo_cart", function() { avadaAddQuantityBoxes() }), jQuery(document).ajaxComplete(function() { avadaAddQuantityBoxes() }), jQuery(document).ready(function() { jQuery(".yith-wacp-mini-cart-icon").on("click", function() { setTimeout(function() { avadaAddQuantityBoxes() }, 100) }) }), jQuery(".composite_data").length && jQuery(".composite_data").on("wc-composite-initializing", function(t, a) { a.actions.add_action("component_selection_details_updated", compositeAddQuantityBoxes, 10) });

function fusionResizeCrossfadeImagesContainer(e) {
    var i = 0;
    e.find("img").each(function() {
        var e = jQuery(this).height();
        e > i && (i = e)
    }), e.css("height", i)
}
jQuery(window).on("load", function() { jQuery(window).on("resize", function() { jQuery(".crossfade-images").each(function() { fusionResizeCrossfadeImagesContainer(jQuery(this)) }) }), jQuery(".crossfade-images").each(function() { fusionResizeCrossfadeImagesContainer(jQuery(this)) }) });

function calcSelectArrowDimensions(e) {
    var n = ".avada-select-parent .select-arrow, .gravity-select-parent .select-arrow, .wpcf7-select-parent .select-arrow";
    (void 0 !== e ? jQuery(e).find(n) : jQuery(n)).filter(":visible").each(function() { 0 < jQuery(this).prev().innerHeight() && jQuery(this).css({ height: jQuery(this).prev().innerHeight(), width: jQuery(this).prev().innerHeight(), "line-height": jQuery(this).prev().innerHeight() + "px" }) })
}
jQuery(window).on("load fusion-element-render-fusion_tb_woo_cart fusion-element-render-fusion_tb_woo_checkout_tabs fusion-element-render-fusion_tb_woo_checkout_billing fusion-element-render-fusion_tb_woo_checkout_shipping fusion-element-render-fusion_woo_cart_shipping", function() { calcSelectArrowDimensions(), setTimeout(function() { calcSelectArrowDimensions() }, 100) }), jQuery(window).on("fusion-dynamic-content-render", function(e, n) { calcSelectArrowDimensions(n) });
jQuery(document).on("ready fusion-widget-render-Fusion_Widget_Tabs", function() {
    jQuery(".fusion-tabs-widget .fusion-tabs-nav li a").on("click", function(n) {
        var t = jQuery(this).data("link");
        n.preventDefault(), jQuery(this).parents(".fusion-tabs-nav").find("li").removeClass("active"), jQuery(this).parent().addClass("active"), jQuery(this).parents(".fusion-tabs-widget").find(".fusion-tab-content").hide(), jQuery(this).parents(".fusion-tabs-widget").find('.fusion-tab-content[data-name="' + t + '"]').fadeIn()
    })
});
jQuery.fn.limitScrollToContainer = function() {
    var e = 0;
    jQuery(this).on("mousewheel DOMMouseScroll touchmove", function(o) {
        var l = o.wheelDelta || o.originalEvent && o.originalEvent.wheelDelta || -o.detail,
            t = null;
        "mousewheel" === o.type ? t = -.5 * l : "DOMMouseScroll" === o.type ? t = -40 * l : "touchmove" === o.type && (t = 10, o.originalEvent.touches[0].pageY > e && (t = -10), e = o.originalEvent.touches[0].pageY), t && (o.preventDefault(), jQuery(this).scrollTop(t + jQuery(this).scrollTop()))
    })
};
jQuery(document).on("ready fusion-element-render-fusion_alert", function(e, n) {
    (void 0 !== n ? jQuery('div[data-cid="' + n + '"]').find(".fusion-alert .close") : jQuery(".fusion-alert .close")).on("click", function(e) { e.preventDefault(), jQuery(this).parent().slideUp() })
});
var fusionAnimationsVars = { "status_css_animations": "desktop" };

function fusionSetAnimationData(n) { "off" === fusionAnimationsVars.status_css_animations || cssua.ua.mobile && "desktop_and_mobile" !== fusionAnimationsVars.status_css_animations ? jQuery("body").addClass("dont-animate").removeClass("do-animate") : (jQuery("body").addClass("do-animate").removeClass("dont-animate"), void 0 !== n && void 0 !== n.data.custom && jQuery(window).initElementAnimations()) }! function(n) {
    "use strict";
    window.awbAnimationObservers = {}, n.fn.initElementAnimations = function() {
        n.each(window.awbAnimationObservers, function(i, t) { n.each(t[0], function(n, i) { t[1].unobserve(i) }), delete window.awbAnimationObservers[i] }), n.each(fusion.getObserverSegmentation(n(".fusion-animated")), function(i) {
            var t = fusion.getAnimationIntersectionData(i),
                e = new IntersectionObserver(function(i, o) {
                    n.each(i, function(i, o) {
                        var a, s, u, r, d = n(o.target);
                        o.isIntersecting && (r = !0, 0 !== t.threshold && (n(window).height() < d.outerHeight() ? n(window).height() / d.outerHeight() > o.intersectionRatio && (r = !1) : 1 > o.intersectionRatio && (r = !1)), r && (d.parents(".fusion-delayed-animation").length || (d.css("visibility", "visible"), a = d.data("animationtype"), s = d.data("animationduration"), d.addClass(a), s && (d.css("animation-duration", s + "s"), u = d, setTimeout(function() { u.removeClass(a) }, 1e3 * s))), e.unobserve(o.target)))
                    })
                }, t);
            n(this).each(function() { e.observe(this) }), window.awbAnimationObservers[i] = [this, e]
        })
    }
}(jQuery), jQuery(document).ready(function() { fusionSetAnimationData() }), jQuery(window).on("load", function() { jQuery("body").hasClass("fusion-builder-live") || setTimeout(function() { jQuery(window).initElementAnimations() }, 300) }), jQuery(window).on("CSSAnimations", { custom: !0 }, fusionSetAnimationData);
var fusionMenuVars = { "mobile_submenu_open": "Open submenu of %s" };
var fusionNavClickExpandBtn = function(e) {
        var n = jQuery(e).parent();
        n.toggleClass("expanded"), n.attr("aria-expanded", "false" === n.attr("aria-expanded") ? "true" : "false"), n.hasClass("expanded") ? n.find("ul > li").find("> a, > button").removeAttr("tabindex") : n.find("ul > li").find("> a, > button").attr("tabindex", "-1"), fusionNavMobilePosition(n[0])
    },
    fusionNavClickExpandSubmenuBtn = function(e) {
        var n, s = jQuery(e),
            a = s.closest("nav"),
            u = s.parent();
        a.find(".fusion-open-nav-submenu").each(function(n, s) {
            var a = jQuery(s);
            a.parent().find(e).length || (a.attr("aria-expanded", "false"), a.parent("li").removeClass("expanded"))
        }), s.attr("aria-expanded", "false" === s.attr("aria-expanded") ? "true" : "false"), n = "true" === s.attr("aria-expanded"), a.hasClass("collapse-enabled") ? u.children(".fusion-megamenu-wrapper, .sub-menu").slideToggle(400, function() { "none" === jQuery(this).css("display") && jQuery(this).css("display", "") }) : u.children(".fusion-megamenu-wrapper, .sub-menu").css("display", ""), n ? (u.addClass("expanded"), u.hasClass("fusion-megamenu-menu") && "undefined" != typeof fusionNavMegamenuPosition && fusionNavMegamenuPosition(u), a.hasClass("submenu-mode-flyout") && !a.hasClass("collapse-enabled") && (a.addClass("flyout-submenu-expanded"), a.parents(".fusion-row").last().addClass("fusion-row-on-top"), jQuery(document).on("keyup.fusion_flyout", function(e) { "Escape" === e.key && s.trigger("click") }), 0 < u.find(".fusion-search-form-content").length && setTimeout(function() { u.find(".fusion-search-form-content input.s").focus() }, 100), jQuery("body").hasClass("fusion-builder-live") && jQuery("body").hasClass("avada-footer-fx-parallax-effect") && jQuery("body").addClass("avada-flyout-submenu-active"))) : (u.removeClass("expanded"), s.blur(), a.hasClass("submenu-mode-flyout") && (a.removeClass("flyout-submenu-expanded"), a.parents(".fusion-row").last().removeClass("fusion-row-on-top"), jQuery(document).off("keyup.fusion_flyout"), jQuery("body").hasClass("avada-flyout-submenu-active") && jQuery("body").removeClass("avada-flyout-submenu-active"))), fusionNavSubmenuDirection(u)
    },
    fusionNavMobilePosition = function(e) {
        var n = jQuery(e),
            s = n.children("ul");
        n.hasClass("mobile-size-full-absolute") && s.offset({ left: 0 }).css("width", "calc(100vw - " + avadaGetScrollBarWidth() + "px")
    },
    fusionNavSubmenuDirection = function(e) {
        var n, s, a, u, o, t = jQuery(e),
            i = t.closest(".fusion-row"),
            r = i.offset().left,
            l = r + i.width(),
            c = t.closest("nav"),
            f = t.children("ul"),
            d = c.hasClass("direction-row"),
            m = c.hasClass("expand-left"),
            h = t.closest(".fusion-megamenu-wrapper").length,
            p = d && t.parent()[0] === c.children("ul")[0];
        f && !h && !c.hasClass("submenu-mode-flyout") && f.length && (jQuery("body").hasClass("side-header") && 0 < c.closest("#side-header.fusion-tb-header").length || (u = f.css("left"), o = f.css("right"), f.css({ left: "", right: "", transition: "all 0s", opacity: "0" }), a = (n = f.offset().left) + (s = f.width()), m && o !== f.css("right") || !m && u !== f.css("left") ? setTimeout(function() { f.css({ transition: "", opacity: "" }) }, 10) : f.css({ transition: "", opacity: "" }), m && n < r ? p ? f.css("right", -1 * s + f.parent().width()) : f.css("right", -1 * s) : !m && a > l && (p ? f.css("left", -1 * s + f.parent().width()) : f.css("left", -1 * s)), !p && d && t.width() > 2 * f.width() && t.addClass("reposition-arrows")))
    },
    fusionNavSearchOverlay = function(e) {
        var n = jQuery(e).closest("nav");
        n.toggleClass("has-search-overlay"), n.addClass("menu-element-search-transition"), setTimeout(function() { n.removeClass("menu-element-search-transition") }, n.data("transition-time")), n.hasClass("has-search-overlay") ? (n.find("> .fusion-overlay-search input[type=search]").focus(), n.find(".fusion-menu-icon-search").attr("aria-expanded", "true")) : n.find(".fusion-menu-icon-search").attr("aria-expanded", "false")
    },
    fusionNavCloseFlyoutSub = function(e) {
        var n = jQuery(e).parent();
        fusionNavClickExpandSubmenuBtn(n.find(".menu-item-has-children.expanded > .fusion-open-nav-submenu"))
    },
    fusionNavAltArrowsClass = function(e) {
        var n;
        (jQuery(e).hasClass("dropdown-arrows-both") || jQuery(e).hasClass("dropdown-arrows-child")) && ((n = jQuery(e).find("ul.sub-menu li:first-child")).on("mouseenter mouseleave focus", function(e) {
            var n = jQuery(this).closest("ul.sub-menu").parent();
            n.hasClass("custom-menu-search") || jQuery(this).closest("ul.sub-menu").hasClass("avada-custom-menu-item-contents") || ("mouseenter" === e.handleObj.origType ? (n.addClass("alt-arrow-child-color"), n.children("a").addClass("hover")) : "mouseleave" === e.handleObj.origType ? (n.removeClass("alt-arrow-child-color"), n.children("a").removeClass("hover")) : n.toggleClass("alt-arrow-child-color"))
        }), n.each(function(e, n) { jQuery(n).hasClass("current-menu-item") && jQuery(n).closest("ul.sub-menu").parent().toggleClass("alt-arrow-child-color") }))
    },
    fusionNavRunAll = function() {
        var e = jQuery(".fusion-menu-element-wrapper.expand-method-hover:not(.submenu-mode-flyout) .menu-item-has-children:not(.fusion-megamenu-menu)");
        e.each(function() { fusionNavSubmenuDirection(this) }), e.on("mouseenter", function() { fusionNavSubmenuDirection(this) }), jQuery(".fusion-open-nav-submenu-on-click").parent().each(function() { fusionNavSubmenuDirection(this) }), jQuery(".fusion-menu-element-wrapper .custom-menu-search-dropdown .fusion-main-menu-icon").on("click", function(e) {
            var n = jQuery(this),
                s = n.parent();
            e.preventDefault(), n.closest(".fusion-menu-element-wrapper").hasClass("submenu-mode-flyout") ? n.siblings(".fusion-open-nav-submenu-on-click").trigger("click") : (s.toggleClass("expanded"), fusionNavSubmenuDirection(s)), s.hasClass("expanded") ? setTimeout(function() { s.find("input[type=search]").focus() }, 100) : n.blur()
        }), jQuery(".fusion-menu-element-wrapper.submenu-mode-flyout:not(.dropdown-carets-yes) .fusion-custom-menu > li.menu-item-has-children > a:not(.fusion-main-menu-icon)").on("click", function(e) { e && e.preventDefault(), jQuery(this).next(".fusion-open-nav-submenu-on-click").trigger("click") }), jQuery("html").on("mouseenter", ".fusion-no-touch .fusion-menu-element-wrapper.submenu-mode-flyout:not(.collapse-enabled) .sub-menu .menu-item a", function() {
            var e = jQuery(this),
                n = e.parent();
            void 0 !== n.data("item-id") && (e.closest(".fusion-menu").find(".fusion-flyout-menu-backgrounds").addClass("fusion-flyout-menu-backgrounds-active").find("#item-bg-" + n.data("item-id")).addClass("active"), e.closest(".sub-menu").addClass("fusion-transparent-bg"))
        }), jQuery("html").on("mouseleave", ".fusion-no-touch .fusion-menu-element-wrapper.submenu-mode-flyout:not(.collapse-enabled) .sub-menu .menu-item a", function() {
            var e = jQuery(this),
                n = e.parent();
            void 0 !== n.data("item-id") && (e.closest(".fusion-menu").find(".fusion-flyout-menu-backgrounds").removeClass("fusion-flyout-menu-backgrounds-active").find("#item-bg-" + n.data("item-id")).removeClass("active"), e.closest(".sub-menu").removeClass("fusion-transparent-bg"))
        }), jQuery(".fusion-menu-element-wrapper:not(.submenu-mode-flyout) a").on("click", function(e) {
            var n = jQuery(this).closest(".fusion-menu-element-wrapper");
            void 0 !== this.attributes.href && "#" !== this.attributes.href.value || ((n.hasClass("expand-method-click") || n.hasClass("collapse-enabled")) && jQuery(this).siblings(".fusion-open-nav-submenu-on-click").trigger("click"), e.preventDefault())
        }), jQuery(".fusion-menu-element-wrapper").each(function(e, n) {
            var s = jQuery(n);
            s.hasClass("collapse-enabled") && (s.hasClass("mobile-size-full-absolute") || s.hasClass("mobile-size-relative")) && s.hasClass("mobile-mode-collapse-to-button") && jQuery(n).children("ul").offset({ left: 0 })
        }), jQuery('.fusion-menu-element-wrapper a[href^="#"]').on("click", function() {
            var e = jQuery(this.hash),
                n = jQuery(this).closest(".fusion-menu-element-wrapper");
            n.hasClass("collapse-enabled") && (n.hasClass("mobile-size-full-absolute") || n.hasClass("mobile-size-column-absolute")) && e.length && "" !== this.hash.slice(1) && n.find(".avada-menu-mobile-menu-trigger").trigger("click")
        })
    },
    fusionAdjustNavMobilePosition = function() { setTimeout(function() { fusionNavMobilePosition(jQuery('.fusion-menu-element-wrapper.expanded[aria-expanded="true"]')) }, 50) };
jQuery(window).on("load", function() { jQuery(".fusion-menu-element-wrapper").each(function(e, n) { fusionNavAltArrowsClass(n), fusionNavIsCollapsed(n) }), jQuery(".fusion-menu-element-wrapper .fusion-menu-icon-search.trigger-overlay, .fusion-menu-element-wrapper .fusion-close-search").on("click", function(e) { e && e.preventDefault(), fusionNavSearchOverlay(this) }) }), jQuery(window).on("fusion-element-render-fusion_menu", function(e, n) {
    var s = jQuery('[data-cid="' + n + '"] .fusion-menu-element-wrapper');
    fusionNavRunAll(), s.length && fusionNavIsCollapsed(s[0])
}), jQuery(window).on("fusion-mobile-menu-collapsed", function() {
    var e = jQuery('.fusion-menu-element-wrapper.mobile-mode-collapse-to-button.mobile-size-full-absolute[aria-expanded="false"]');
    e.find("ul > li").find("> a, > button").attr("tabindex", "-1"), e.children("ul").offset({ left: 0 })
}), jQuery(document).ready(fusionNavRunAll), jQuery(window).on("fusion-sticky-change fusion-resize-horizontal", fusionAdjustNavMobilePosition), jQuery(document.body).on("wc_fragments_refreshed wc_fragments_loaded", function() { jQuery(".menu-item-type-custom.fusion-menu-cart").each(function() { 0 !== jQuery(this).children("ul.sub-menu").length && (jQuery(this).children("ul.sub-menu").hasClass("avada-custom-menu-item-contents-empty") ? jQuery(this).removeClass("menu-item-has-children").addClass("empty-cart") : (jQuery(this).addClass("menu-item-has-children").removeClass("empty-cart"), fusionNavSubmenuDirection(jQuery(this)))) }) });
var fusionFlexSliderVars = { "status_vimeo": "", "slideshow_autoplay": "1", "slideshow_speed": "7000", "pagination_video_slide": "", "status_yt": "", "flex_smoothHeight": "false" };

function fusionInitPostFlexSlider() {
    jQuery(".fusion-flexslider.fusion-flexslider-loading, .flexslider.fusion-flexslider-loading:not(.tfs-slider)").not(".woocommerce .images #slider").each(function() {
        var e = "false" !== fusionFlexSliderVars.flex_smoothHeight,
            i = Boolean(Number(fusionFlexSliderVars.slideshow_autoplay)),
            s = Number(fusionFlexSliderVars.slideshow_speed),
            r = "fade",
            n = !0;
        2 > jQuery(this).find(".slides li").length || (e = void 0 !== jQuery(this).data("slideshow_smooth_height") ? Boolean(Number(jQuery(this).data("slideshow_smooth_height"))) : e, i = void 0 !== jQuery(this).data("slideshow_autoplay") ? Boolean(Number(jQuery(this).data("slideshow_autoplay"))) : i, s = void 0 !== jQuery(this).data("slideshow_speed") ? Number(jQuery(this).data("slideshow_speed")) : s, r = void 0 !== jQuery(this).data("slideshow_animation") ? String(jQuery(this).data("slideshow_animation")) : r, n = void 0 !== jQuery(this).data("slideshow_control_nav") ? Boolean(Number(jQuery(this).data("slideshow_control_nav"))) : n, jQuery().isotope && 0 < jQuery(this).closest(".fusion-blog-layout-grid").length && (e = !1), jQuery(this).flexslider({ slideshow: i, slideshowSpeed: s, video: !0, smoothHeight: e, pauseOnHover: !1, useCSS: !1, prevText: "&#xf104;", nextText: "&#xf105;", animation: r, controlNav: n, start: function(e) { e.removeClass("fusion-flexslider-loading"), jQuery(window).trigger("resize"), void 0 !== e.slides && 0 !== e.slides.eq(e.currentSlide).find("iframe").length ? (Number(fusionFlexSliderVars.pagination_video_slide) ? jQuery(e).find(".flex-control-nav").css("bottom", "-20px") : jQuery(e).find(".flex-control-nav").hide(), Number(fusionFlexSliderVars.status_yt) && !0 === window.yt_vid_exists && window.YTReady(function() { new YT.Player(e.slides.eq(e.currentSlide).find("iframe").attr("id"), { events: { onStateChange: onPlayerStateChange(e.slides.eq(e.currentSlide).find("iframe").attr("id"), e) } }) })) : Number(fusionFlexSliderVars.pagination_video_slide) ? jQuery(e).find(".flex-control-nav").css("bottom", "0") : jQuery(e).find(".flex-control-nav").show(), jQuery.isFunction(jQuery.fn.initElementAnimations) && jQuery(window).initElementAnimations() }, before: function(e) { 0 !== e.slides.eq(e.currentSlide).find("iframe").length && (Number(fusionFlexSliderVars.status_vimeo) && -1 !== e.slides.eq(e.currentSlide).find("iframe")[0].src.indexOf("vimeo") && (void 0 !== window.fusionVimeoPlayers[e.slides.eq(e.currentSlide).find("iframe")[0].getAttribute("id")] ? window.fusionVimeoPlayers[e.slides.eq(e.currentSlide).find("iframe")[0].getAttribute("id")].pause() : new Vimeo.Player(e.slides.eq(e.currentSlide).find("iframe")[0]).pause()), Number(fusionFlexSliderVars.status_yt) && !0 === window.yt_vid_exists && window.YTReady(function() { new YT.Player(e.slides.eq(e.currentSlide).find("iframe").attr("id"), { events: { onStateChange: onPlayerStateChange(e.slides.eq(e.currentSlide).find("iframe").attr("id"), e) } }) }), playVideoAndPauseOthers(e)) }, after: function(e) { 0 !== e.slides.eq(e.currentSlide).find("iframe").length ? (Number(fusionFlexSliderVars.pagination_video_slide) ? jQuery(e).find(".flex-control-nav").css("bottom", "-20px") : jQuery(e).find(".flex-control-nav").hide(), Number(fusionFlexSliderVars.status_yt) && !0 === window.yt_vid_exists && window.YTReady(function() { new YT.Player(e.slides.eq(e.currentSlide).find("iframe").attr("id"), { events: { onStateChange: onPlayerStateChange(e.slides.eq(e.currentSlide).find("iframe").attr("id"), e) } }) })) : Number(fusionFlexSliderVars.pagination_video_slide) ? jQuery(e).find(".flex-control-nav").css("bottom", "0") : jQuery(e).find(".flex-control-nav").show(), jQuery('[data-spy="scroll"]').each(function() { jQuery(this).scrollspy("refresh") }) } }), e = "false" !== fusionFlexSliderVars.flex_smoothHeight)
    })
}

function fusionDestroyPostFlexSlider() { jQuery(".fusion-flexslider").not(".woocommerce .images #slider").flexslider("destroy") }
jQuery(window).on("load", function() {
    var e, i = "false" !== fusionFlexSliderVars.flex_smoothHeight;
    window.fusionVimeoPlayers = [], jQuery().flexslider && (Number(fusionFlexSliderVars.status_vimeo) && jQuery(".flexslider").find("iframe").each(function() {
        var i = jQuery(this).attr("id"),
            s = jQuery(this).attr("src");
        i && -1 !== s.indexOf("vimeo") && (window.fusionVimeoPlayers[i] = new Vimeo.Player(i), e = jQuery("#" + i).parents("li"), window.fusionVimeoPlayers[i].on("play", function() { jQuery("#" + i).parents("li").parent().parent().flexslider("pause") }), window.fusionVimeoPlayers[i].on("pause", function() { jQuery(e).attr("data-vimeo-paused", "true"), "yes" === jQuery(e).attr("data-loop") ? jQuery("#" + i).parents("li").parent().parent().flexslider("pause") : jQuery("#" + i).parents("li").parent().parent().flexslider("play") }), window.fusionVimeoPlayers[i].on("ended", function() { "yes" !== jQuery(e).attr("data-loop") && "true" !== jQuery(e).attr("data-vimeo-paused") && jQuery("#" + i).parents("li").parent().parent().flexslider("next"), "true" === jQuery(e).attr("data-vimeo-paused", "true") && jQuery(e).attr("data-vimeo-paused", "false") }))
    }), fusionInitPostFlexSlider(), 1 <= jQuery(".flexslider-attachments").length && jQuery.each(jQuery(".flexslider-attachments"), function() { void 0 !== jQuery(this).data("flexslider") && jQuery(this).flexslider("destroy"), jQuery(this).flexslider({ slideshow: Boolean(Number(fusionFlexSliderVars.slideshow_autoplay)), slideshowSpeed: fusionFlexSliderVars.slideshow_speed, video: !1, smoothHeight: i, pauseOnHover: !1, useCSS: !1, prevText: "&#xf104;", nextText: "&#xf105;", controlNav: "thumbnails", start: function(e) { jQuery(e).find(".fusion-slider-loading").remove(), e.removeClass("fusion-flexslider-loading") } }), i && jQuery(this).find(".flex-control-nav").css("position", "absolute") }))
}), jQuery(window).on("fusion-element-render-fusion_recent_posts fusion-element-render-fusion_postslider", function(e, i) {
    (void 0 !== i ? jQuery('div[data-cid="' + i + '"]') : jQuery(document)).find(".fusion-flexslider").not(".woocommerce .images #slider").flexslider()
}), jQuery(window).on("fusion-element-render-fusion_slider", function(e, i) {
    var s = (void 0 !== i ? jQuery('div[data-cid="' + i + '"]') : jQuery(document)).find(".flexslider:not(.tfs-slider)");
    void 0 !== s && s.flexslider()
}), jQuery(window).on("fusion-element-render-fusion_slide", function(e, i) {
    var s = jQuery('li[data-cid="' + i + '"]');
    0 < s.length && void 0 !== s.data("parent-cid") && (void 0 !== s.closest(".flexslider:not(.tfs-slider)").data("flexslider") && jQuery(s.closest(".flexslider:not(.tfs-slider)")).flexslider("destroy"), jQuery(window).trigger("fusion-element-render-fusion_slider", s.data("parent-cid")))
}), jQuery(window).on("fusion-element-render-fusion_post_cards", function(e, i) { fusionInitPostFlexSlider() }), window.addEventListener("fusion-reinit-single-post-slideshow", function() { fusionInitPostFlexSlider() });
! function(t) {
    function e(e, n, i, s) {
        var a = e.text().split(n),
            l = "";
        a.length && (t(a).each(function(t, e) { l += '<span class="' + i + (t + 1) + '">' + e + "</span>" + s }), e.empty().append(l))
    }
    var n = {
        init: function() { return this.each(function() { e(t(this), "", "char", "") }) },
        words: function() { return this.each(function() { e(t(this), " ", "word", " ") }) },
        lines: function() {
            return this.each(function() {
                var n = "eefec303079ad17405c889e092e105b0";
                e(t(this).children("br").replaceWith(n).end(), n, "line", "")
            })
        }
    };
    t.fn.lettering = function(e) { return e && n[e] ? n[e].apply(this, [].slice.call(arguments, 1)) : "letters" !== e && e ? (t.error("Method " + e + " does not exist on jQuery.lettering"), this) : n.init.apply(this, [].slice.call(arguments, 0)) }
}(jQuery),
function(t) {
    "use strict";

    function e(e) { return /In/.test(e) || t.inArray(e, t.fn.textillate.defaults.inEffects) >= 0 }

    function n(e) { return /Out/.test(e) || t.inArray(e, t.fn.textillate.defaults.outEffects) >= 0 }

    function i(t) { return "true" !== t && "false" !== t ? t : "true" === t }

    function s(e) {
        var n = e.attributes || [],
            s = {};
        return n.length ? (t.each(n, function(t, e) { var n = e.nodeName.replace(/delayscale/, "delayScale"); /^data-in-*/.test(n) ? (s.in = s.in || {}, s.in[n.replace(/data-in-/, "")] = i(e.nodeValue)) : /^data-out-*/.test(n) ? (s.out = s.out || {}, s.out[n.replace(/data-out-/, "")] = i(e.nodeValue)) : /^data-*/.test(n) && (s[n.replace(/data-/, "")] = i(e.nodeValue)) }), s) : s
    }

    function a(i, s, a) {
        var l = i.length;
        l ? (s.shuffle && (i = function(t) { for (var e, n, i = t.length; i; e = parseInt(Math.random() * i), n = t[--i], t[i] = t[e], t[e] = n); return t }(i)), s.reverse && (i = i.toArray().reverse()), t.each(i, function(i, o) {
            var c = t(o);

            function r() { e(s.effect) ? "typeOut" === s.effect ? c.css("display", "inline-block") : c.css("visibility", "visible") : n(s.effect) && ("typeOut" === s.effect ? c.css("display", "none") : c.css("visibility", "hidden")), !(l -= 1) && a && a() }
            var u = s.sync ? s.delay : s.delay * i * s.delayScale;
            c.text() ? setTimeout(function() {
                var t, e, n, i;
                t = c, e = s.effect, n = r, i = 0, "clipIn" === e ? (t.css("width", "auto"), i = t.width(), t.css("overflow", "hidden"), t.css("width", "0"), t.css("visibility", "visible"), t.animate({ width: i + .3 * parseFloat(t.css("font-size")) }, 1200, function() { setTimeout(function() { n && n() }, 100) })) : "clipOut" === e ? t.animate({ width: "2px" }, 1200, function() { setTimeout(function() { n && n() }, 100) }) : "typeIn" === e ? t.addClass("fusion-title-animated " + e).show() : t.addClass("fusion-title-animated " + e).css("visibility", "visible").show(), "typeIn" !== e && "typeOut" !== e || !jQuery("html").hasClass("ua-edge") || (t.removeClass("fusion-title-animated " + e).css("visibility", "visible"), n && n()), t.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oAnimationEnd AnimationEnd", function() { t.removeClass("fusion-title-animated " + e), n && n() })
            }, u) : r()
        })) : a && a()
    }
    t.fn.textillate = function(i, l) {
        return this.each(function() {
            var o = t(this),
                c = o.data("textillate"),
                r = t.extend(!0, {}, t.fn.textillate.defaults, s(this), "object" == typeof i && i);
            c ? "string" == typeof i ? c[i].apply(c, [].concat(l)) : c.setOptions.call(c, r) : o.data("textillate", c = new function(i, l) {
                var o = this,
                    c = t(i);
                o.init = function() { o.$texts = c.find(l.selector), o.$texts.length || (o.$texts = t('<ul class="texts"><li>' + c.html() + "</li></ul>"), c.html(o.$texts)), o.$texts.hide(), o.$current = t('<span class="fusion-textillate">').html(o.$texts.find(":first-child").html()).prependTo(c), e(l.in.effect) ? o.$current.css("visibility", "hidden") : n(l.out.effect) && o.$current.css("visibility", "visible"), o.setOptions(l), o.timeoutRun = null, setTimeout(function() { o.options.autoStart && o.start() }, o.options.initialDelay) }, o.setOptions = function(t) { o.options = t }, o.triggerEvent = function(e) { var n = t.Event(e + ".tlt"); return c.trigger(n, o), n }, o.in = function(i, l) {
                    i = i || 0;
                    var r, u = o.$texts.find(":nth-child(" + ((i || 0) + 1) + ")"),
                        f = t.extend(!0, {}, o.options, u.length ? s(u[0]) : {}),
                        d = o.$current.closest(".fusion-animated-texts-wrapper");
                    u.addClass("current"), o.triggerEvent("inAnimationBegin"), c.attr("data-active", u.data("id")), "line" == o.options.length ? o.$current.html(u.html()).lettering("lines") : o.$current.html(u.html()).lettering("words"), "char" == o.options.length && o.$current.find('[class^="word"]').css({ display: "inline-block", "-webkit-transform": "translate3d(0,0,0)", "-moz-transform": "translate3d(0,0,0)", "-o-transform": "translate3d(0,0,0)", transform: "translate3d(0,0,0)" }).each(function() { t(this).lettering() }), r = o.$current.find('[class^="' + o.options.length + '"]').css("display", "inline-block"), e(f.in.effect) ? "typeIn" === f.in.effect ? r.css("display", "none") : r.css("visibility", "hidden") : n(f.in.effect) && r.css("visibility", "visible"), "typeIn" !== f.in.effect && "clipIn" !== f.in.effect || void 0 !== d.attr("style") && -1 !== d.attr("style").indexOf("width") || o.$current.closest(".fusion-animated-texts-wrapper").css("width", "auto"), o.currentIndex = i, a(r, f.in, function() { o.triggerEvent("inAnimationEnd"), f.in.callback && f.in.callback(), l && l(o) })
                }, o.out = function(e) {
                    var n = o.$texts.find(":nth-child(" + ((o.currentIndex || 0) + 1) + ")"),
                        i = o.$current.find('[class^="' + o.options.length + '"]'),
                        l = t.extend(!0, {}, o.options, n.length ? s(n[0]) : {});
                    o.triggerEvent("outAnimationBegin"), a(i, l.out, function() { n.removeClass("current"), o.triggerEvent("outAnimationEnd"), c.removeAttr("data-active"), l.out.callback && l.out.callback(), e && e(o) })
                }, o.start = function(t) {
                    setTimeout(function() {
                        o.triggerEvent("start"),
                            function t(e) {
                                o.in(e, function() {
                                    var n = o.$texts.children().length;
                                    e += 1, !o.options.loop && e >= n ? (o.options.callback && o.options.callback(), o.triggerEvent("end")) : (e %= n, o.timeoutRun = setTimeout(function() { o.out(function() { t(e) }) }, o.options.minDisplayTime))
                                })
                            }(t || 0)
                    }, o.options.initialDelay)
                }, o.stop = function() { o.timeoutRun && (clearInterval(o.timeoutRun), o.timeoutRun = null) }, o.init()
            }(this, r))
        })
    }, t.fn.textillate.defaults = { selector: ".texts", loop: !0, minDisplayTime: 1200, initialDelay: 0, in: { effect: "fadeIn", delayScale: 1.5, delay: 100, sync: !1, reverse: !1, shuffle: !1, callback: function() {} }, out: { effect: "fadeOut", delayScale: 1.5, delay: 100, sync: !1, reverse: !1, shuffle: !1, callback: function() {} }, autoStart: !0, inEffects: [], outEffects: ["hinge"], callback: function() {}, type: "word" }
}(jQuery);
! function(t) {
    "use strict";
    t.fn.awbAnimateTitleHighlightsAndRotations = function() {
        t.each(fusion.getObserverSegmentation(t(this)), function(i) {
            var n = fusion.getAnimationIntersectionData(i),
                e = new IntersectionObserver(function(i, n) {
                    t.each(i, function(i, a) {
                        var o = t(a.target);
                        fusion.shouldObserverEntryAnimate(a, n) && (t(o).hasClass("fusion-title-rotating") && t(o).animateTitleRotations(), t(o).hasClass("fusion-title-highlight") && t(o).animateTitleHighlights(), e.unobserve(a.target))
                    })
                }, n);
            t(this).each(function() { e.observe(this) })
        })
    }, t.fn.animateTitleRotations = function() {
        var i = t(this),
            n = i.find(".fusion-animated-texts-wrapper"),
            e = i.hasClass("fusion-loop-on"),
            a = t(i).closest("[data-animationduration]").data("animationduration"),
            o = void 0 !== a ? 200 * parseFloat(a) : 0;
        n.removeData("textillate"), t(i).find(".fusion-textillate").remove(), t(i).is(".fusion-title-typeIn,.fusion-title-clipIn") || n.awbAnimatedTitleRotationWidth(), n.textillate({ selector: ".fusion-animated-texts", type: n.attr("data-length"), minDisplayTime: n.attr("data-minDisplayTime"), loop: e, initialDelay: o })
    }, t.fn.animateTitleHighlights = function() {
        var i, n = t(this),
            e = { circle: ["M344.6,40.1c0,0-293-3.4-330.7,40.3c-5.2,6-3.5,15.3,3.3,19.4c65.8,39,315.8,42.3,451.2-3 c6.3-2.1,12-6.1,16-11.4C527.9,27,242,16.1,242,16.1"], underline_zigzag: ["M6.1,133.6c0,0,173.4-20.6,328.3-14.5c154.8,6.1,162.2,8.7,162.2,8.7s-262.6-4.9-339.2,13.9 c0,0,113.8-6.1,162.9,6.9"], x: ["M25.8,37.1c0,0,321.2,56.7,435.5,82.3", "M55.8,108.7c0,0,374-78.3,423.6-76.3"], strikethrough: ["M22.2,93.2c0,0,222.1-11.3,298.8-15.8c84.2-4.9,159.1-4.7,159.1-4.7"], curly: ["M9.4,146.9c0,0,54.4-60.2,102.1-11.6c42.3,43.1,84.3-65.7,147.3,0.9c37.6,39.7,79.8-52.6,123.8-14.4 c68.6,59.4,107.2-7,107.2-7"], diagonal_bottom_left: ["M6.5,127.1C10.6,126.2,316.9,24.8,497,23.9"], diagonal_top_left: ["M7.2,28.5c0,0,376.7,64.4,485.2,93.4"], double: ["M21.7,145.7c0,0,192.2-33.7,456.3-14.6", "M13.6,28.2c0,0,296.2-22.5,474.9-5.4"], double_underline: ["M10.3,130.6c0,0,193.9-24.3,475.2-11.2", "M38.9,148.9c0,0,173.8-35.3,423.3-11.8"], underline: ["M8.1,146.2c0,0,240.6-55.6,479-13.8"] }[t(n).data("highlight")],
            a = t();
        "object" == typeof e && e.forEach(function(i) { a = a.add(t("<path>", { d: i })) }), i = t("<svg>", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 500 150", preserveAspectRatio: "none" }).html(a), t(n).find(".fusion-highlighted-text-wrapper svg").remove(), t(n).find(".fusion-highlighted-text").after(i[0].outerHTML)
    }, t.fn.awbAnimatedTitleRotationWidth = function() {
        var i = t(this),
            n = i.find(".fusion-animated-texts"),
            e = 0,
            a = 0,
            o = !1;
        e = parseInt(i.find(".fusion-animated-text").css("font-size")), e *= .6, n.is(":visible") || (o = !0, n.show()), t(i).find(".fusion-animated-text").each(function() {
            var i = t(this).width();
            i > a && (a = i)
        }), o && n.hide(), i.css("width", a + e)
    }, t.fn.awbAnimatedTitleRotationWidthRecalc = function() { t(this).each(function() { t(this).is(".fusion-title-typeIn,.fusion-title-clipIn") || t(this).find(".fusion-animated-texts-wrapper").awbAnimatedTitleRotationWidth() }) }
}(jQuery), jQuery(window).on("load", function() { setTimeout(function() { jQuery(".fusion-title-rotating, .fusion-title-highlight").awbAnimateTitleHighlightsAndRotations() }, 400), jQuery(window).on("fusion-resize-horizontal", function() { jQuery(".fusion-title-rotating").awbAnimatedTitleRotationWidthRecalc() }) }), jQuery(window).on("fusion-column-resized fusion-element-render-fusion_title", function(t, i) {
    var n = jQuery('div[data-cid="' + i + '"]').find(".fusion-title-rotating, .fusion-title-highlight");
    n.length && (n.awbAnimateTitleHighlightsAndRotations(), n.awbAnimatedTitleRotationWidthRecalc())
});
jQuery(window).on("load", function() {
    cssua.ua.ios && 7 === parseInt(cssua.ua.ios, 10) && jQuery(".button-icon-divider-left, .button-icon-divider-right").each(function() {
        var i = jQuery(this).parent().outerHeight();
        jQuery(this).css("height", i)
    })
});
if ("undefined" == typeof LiteVimeo) {
    class e extends HTMLElement {
        constructor() { super() }
        connectedCallback() {
            this.videoId = encodeURIComponent(this.getAttribute("videoid"));
            let { width: t, height: i } = vimeoLiteGetThumbnailDimensions(this.getBoundingClientRect());
            const n = window.devicePixelRatio || 1;
            t = Math.round(t * n), i = Math.round(i * n);
            let o = `https://lite-vimeo-embed.now.sh/thumb/${this.videoId}`;
            o += `.${vimeoLiteCanUseWebP()?"webp":"jpg"}`, o += `?mw=${t}&mh=${i}&q=${n>1?70:85}`, this.style.backgroundImage = `url("${o}")`;
            const d = document.createElement("button");
            d.type = "button", d.classList.add("ltv-playbtn"), this.appendChild(d), this.addEventListener("pointerover", e._warmConnections, { once: !0 }), this.addEventListener("click", () => this._addIframe())
        }
        static _warmConnections() { e.preconnected || (vimeoLiteAddPrefetch("preconnect", "https://player.vimeo.com"), vimeoLiteAddPrefetch("preconnect", "https://i.vimeocdn.com"), vimeoLiteAddPrefetch("preconnect", "https://f.vimeocdn.com"), vimeoLiteAddPrefetch("preconnect", "https://fresnel.vimeocdn.com"), e.preconnected = !0) }
        _addIframe() {
            const e = `\n    <iframe width="640" height="360" frameborder="0"\n    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen\n    src="https://player.vimeo.com/video/${this.videoId}?autoplay=1"\n    ></iframe>`;
            this.insertAdjacentHTML("beforeend", e), this.classList.add("ltv-activated")
        }
    }
    void 0 === customElements.get("lite-vimeo") && customElements.define("lite-vimeo", e)
}

function vimeoLiteAddPrefetch(e, t, i) {
    const n = document.createElement("link");
    n.rel = e, n.href = t, i && (n.as = i), n.crossorigin = !0, document.head.appendChild(n)
}

function vimeoLiteCanUseWebP() { var e = document.createElement("canvas"); return !(!e.getContext || !e.getContext("2d")) && 0 === e.toDataURL("image/webp").indexOf("data:image/webp") }

function vimeoLiteGetThumbnailDimensions({ width: e, height: t }) {
    let i = e = e || 960,
        n = t = t || 540;
    return i % 320 != 0 && (i = 100 * Math.ceil(e / 100), n = Math.round(i / e * t)), { width: i, height: n }
}
if ("undefined" == typeof LiteYTEmbed) {
    class e extends HTMLElement {
        connectedCallback() {
            this.videoId = this.getAttribute("videoid");
            let t = this.querySelector(".lty-playbtn");
            if (this.playLabel = t && t.textContent.trim() || this.getAttribute("playlabel") || "Play", this.style.backgroundImage || (this.posterUrl = `https://i.ytimg.com/vi/${this.videoId}/hqdefault.jpg`, e.addPrefetch("preload", this.posterUrl, "image"), this.style.backgroundImage = `url("${this.posterUrl}")`), t || ((t = document.createElement("button")).type = "button", t.classList.add("lty-playbtn"), this.append(t)), !t.textContent) {
                const e = document.createElement("span");
                e.className = "lyt-visually-hidden", e.textContent = this.playLabel, t.append(e)
            }
            this.addEventListener("pointerover", e.warmConnections, { once: !0 }), this.addEventListener("click", e => this.addIframe())
        }
        static addPrefetch(e, t, n) {
            const o = document.createElement("link");
            o.rel = e, o.href = t, n && (o.as = n), document.head.append(o)
        }
        static warmConnections() { e.preconnected || (e.addPrefetch("preconnect", "https://www.youtube-nocookie.com"), e.addPrefetch("preconnect", "https://www.google.com"), e.addPrefetch("preconnect", "https://googleads.g.doubleclick.net"), e.addPrefetch("preconnect", "https://static.doubleclick.net"), e.preconnected = !0) }
        addIframe() {
            const e = new URLSearchParams(this.getAttribute("params") || []);
            e.append("autoplay", "1");
            const t = document.createElement("iframe");
            t.width = 560, t.height = 315, t.title = this.playLabel, t.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture", t.allowFullscreen = !0, t.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(this.videoId)}?${e.toString()}`, this.append(t), this.classList.add("lyt-activated"), this.querySelector("iframe").focus()
        }
    }
    void 0 === customElements.get("lite-youtube") && customElements.define("lite-youtube", e)
}
var fusionTestimonialVars = { "testimonials_speed": "4000" };
! function(e) {
    "use strict";

    function i(e, i) {
        var t, n = e.children(".review").first(),
            a = e.children(".active-testimonial");
        a.length ? (a.removeClass("active-testimonial"), (t = a.next()).length ? t.addClass("active-testimonial") : n.addClass("active-testimonial")) : n.addClass("active-testimonial"), e.css("height", e.children(".active-testimonial").height()), i.length && (i.removeClass("activeSlide"), i.eq(e.children().index(e.children(".active-testimonial"))).addClass("activeSlide"))
    }
    e.fn.initTestimonials = function() {
        e(this).each(function() {
            var t = fusion.getAnimationIntersectionData(e(this)),
                n = new IntersectionObserver(function(t, a) {
                    e.each(t, function(t, a) {
                        var s = e(a.target),
                            r = s.parent(),
                            o = r.children(".testimonial-pagination"),
                            l = o.length ? o.children() : {};
                        a.isIntersecting && (s.css("height", s.children(".active-testimonial").height()), r.data("speed") && r.attr("data-interval", setInterval(function() { i(s, l) }, r.data("speed"))), l.length && l.on("click", function(t) { t.preventDefault(), l.removeClass("activeSlide"), e(this).addClass("activeSlide"), s.children().removeClass("active-testimonial").eq(l.index(e(this))).addClass("active-testimonial"), s.css("height", s.children(".active-testimonial").height()), r.data("speed") && (clearInterval(parseInt(r.attr("data-interval"))), r.attr("data-interval", setInterval(function() { i(s, l) }, r.data("speed")))) }), n.unobserve(a.target))
                    })
                }, t);
            e(this).each(function() { n.observe(this) })
        })
    }
}(jQuery), jQuery(window).on("load fusion-element-render-fusion_testimonials", function(e, i) {
    var t = void 0 !== i ? jQuery('div[data-cid="' + i + '"]').find(".reviews") : jQuery(".fusion-testimonials .reviews");
    void 0 === i || t.length || (t = jQuery('div[data-cid="' + i + '"]').parents(".fusion-testimonials").first().find(".reviews")), t.initTestimonials(), jQuery(window).on("fusion-resize-horizontal", function() { jQuery(".fusion-testimonials .reviews").each(function() { jQuery(this).css("height", jQuery(this).children(".active-testimonial").height()) }) })
}), jQuery(window).on("fusion-dynamic-content-render", function(e, i) {
    var t = jQuery(i).find(".fusion-testimonials .reviews");
    0 < t.length && t.each(function() { jQuery(this).css("height", jQuery(this).children(".active-testimonial").height()) })
});
var fusionBlogVars = { "infinite_blog_text": "<em>Loading the next set of posts...<\/em>", "infinite_finished_msg": "<em>All items displayed.<\/em>", "slideshow_autoplay": "1", "lightbox_behavior": "all", "blog_pagination_type": "pagination" };
jQuery.fn.fusionCalculateBlogEqualHeights = function() {
    var i = 0,
        e = jQuery(this).find(".fusion-post-grid:visible").not(".invisible-after-ajax").length,
        n = {},
        o = 0;
    0 < e && (i = Math.round(1 / (jQuery(this).children(":visible").first()[0].getBoundingClientRect().width / jQuery(this).width()))), jQuery(this).find(".invisible-after-ajax").hide().removeClass("invisible-after-ajax"), jQuery(this).find(".fusion-post-grid:visible").each(function(e) {
        var s = Math.ceil((e + 1) / i),
            t = jQuery(this).outerHeight();
        (void 0 === n[s] || n[s] < t) && (o += n[s] < t ? t - n[s] : t, n[s] = t)
    }), 1 < i && 1 < e && jQuery(this).find(".fusion-post-grid:visible").each(function(e) {
        var n = parseInt(jQuery(this).css("top"), 10),
            s = 0;
        s = 1 == (e + 1) % i ? jQuery(this).parent().find(".fusion-post-grid:visible:eq(" + (e + i) + ")").length ? parseInt(jQuery(this).parent().find(".fusion-post-grid:visible:eq(" + (e + i) + ")").css("top"), 10) - n : o - n : parseInt(jQuery(this).parent().find(".fusion-post-grid:visible:eq(" + (e - 1) + ")").css("height"), 10), jQuery(this).css("height", s + "px")
    })
}, jQuery(document).ready(function() { window.blogEqualHeightsResizeTimer, jQuery(window).on("resize", function(i, e) { void 0 !== e && !0 !== e || (jQuery(".fusion-blog-equal-heights").each(function() { jQuery(this).find(".fusion-post-grid").css("height", "") }), jQuery(".fusion-blog-equal-heights").length && (clearTimeout(window.blogEqualHeightsResizeTimer), window.blogEqualHeightsResizeTimer = setTimeout(function() { jQuery(".fusion-blog-equal-heights").isotope() }, 50))) }) }), jQuery(window).on("load fusion-element-render-fusion_blog", function() {
    var i, e;
    jQuery().isotope && jQuery(".fusion-blog-layout-grid").each(function() {
        var i = jQuery(this),
            e = ".fusion-post-grid",
            n = "packery";
        jQuery(this).hasClass("fusion-blog-layout-masonry") && (e = ".fusion-post-masonry"), jQuery(this).hasClass("fusion-blog-equal-heights") && (n = "fitRows"), jQuery(this).hasClass("fusion-blog-layout-masonry") && !jQuery(this).hasClass("fusion-blog-layout-masonry-has-vertical") && 0 < jQuery(this).find(".fusion-post-masonry:not(.fusion-grid-sizer)").not(".fusion-element-landscape").length && jQuery(this).addClass("fusion-blog-layout-masonry-has-vertical"), i.data("isotope") && (i.isotope("destroy"), i.removeData("isotope")), i.isotope({ layoutMode: n, itemSelector: e, isOriginLeft: !jQuery("body.rtl").length, resizable: !0, initLayout: !1 }), i.on("layoutComplete", function(i) {
            var e = jQuery(i.target);
            e.hasClass("fusion-blog-equal-heights") && (e.find(".fusion-post-grid").css("height", ""), e.fusionCalculateBlogEqualHeights()), e.css("min-height", "")
        }), i.isotope(), setTimeout(function() { jQuery(window).trigger("resize", [!1]) }, 250)
    }), i = jQuery(".fusion-blog-layout-timeline").find(".fusion-timeline-date").last().text(), e = !0, jQuery(".fusion-blog-layout-timeline").find(".fusion-timeline-date").on("click", function() { jQuery(this).next(".fusion-collapse-month").slideToggle() }), jQuery(".fusion-timeline-icon").find(".awb-icon-bubbles").on("click", function() { e ? (jQuery(this).parent().next(".fusion-blog-layout-timeline").find(".fusion-collapse-month").slideUp(), e = !1) : (jQuery(this).parent().next(".fusion-blog-layout-timeline").find(".fusion-collapse-month").slideDown(), e = !0) }), jQuery(".fusion-posts-container-infinite").each(function(n) {
        var o, s, t, u = jQuery(this),
            a = jQuery(this).find(".post"),
            r = "post",
            l = "";
        jQuery(this).find(".fusion-blog-layout-timeline").length && (u = jQuery(this).find(".fusion-blog-layout-timeline")), o = "", u.closest(".fusion-blog-shortcode").length && (o = "." + u.parents(".fusion-blog-shortcode").attr("class").replace(/\ /g, ".") + " "), u.closest(".fusion-blog-shortcode").parent(".fusion-archives-tb").length && (r = (r = u.closest(".fusion-blog-shortcode").parent(".fusion-archives-tb").data("infinite-post-class")) || ""), jQuery(u).infinitescroll({ navSelector: o + ".fusion-infinite-scroll-trigger", nextSelector: o + "a.pagination-next", itemSelector: o + "div.pagination .current, " + o + "article" + ("" === r ? "" : "." + r) + ":not( .fusion-archive-description ), " + o + ".fusion-collapse-month, " + o + ".fusion-timeline-date", loading: { finishedMsg: fusionBlogVars.infinite_finished_msg, msg: jQuery('<div class="fusion-loading-container fusion-clearfix"><div class="fusion-loading-spinner"><div class="fusion-spinner-1"></div><div class="fusion-spinner-2"></div><div class="fusion-spinner-3"></div></div><div class="fusion-loading-msg">' + fusionBlogVars.infinite_blog_text + "</div>") }, maxPage: u.data("pages") ? u.data("pages") : void 0, infid: "b" + n, errorCallback: function() { u.find(".fusion-post-grid").css("height", ""), jQuery(u).hasClass("isotope") && jQuery(u).isotope() } }, function(n) { jQuery(u).hasClass("fusion-blog-layout-timeline") && (jQuery(n).first(".fusion-timeline-date").text() == i && jQuery(n).first(".fusion-timeline-date").remove(), i = jQuery(u).find(".fusion-timeline-date").last().text(), jQuery(u).find(".fusion-timeline-date").each(function() { jQuery(this).next(".fusion-collapse-month").append(jQuery(this).nextUntil(".fusion-timeline-date", ".fusion-post-timeline")) }), e || setTimeout(function() { jQuery(u).find(".fusion-collapse-month").hide() }, 200), setTimeout(function() { jQuery(u).find(".fusion-collapse-month").each(function() { jQuery(this).children().length || jQuery(this).remove() }) }, 10), jQuery(u).find(".fusion-timeline-date").unbind("click"), jQuery(u).find(".fusion-timeline-date").on("click", function() { jQuery(this).next(".fusion-collapse-month").slideToggle() })), fusionInitPostFlexSlider(), jQuery(u).hasClass("fusion-blog-layout-grid") && jQuery().isotope && (jQuery(n).hide(), imagesLoaded(n, function() { jQuery(n).fadeIn(), jQuery(u).hasClass("isotope") && (u.hasClass("fusion-portfolio-equal-heights") && u.find(".fusion-post-grid").css("height", ""), jQuery(u).isotope("appended", jQuery(n))), jQuery('[data-spy="scroll"]').each(function() { jQuery(this).scrollspy("refresh") }) })), jQuery(n).each(function() { jQuery(this).find(".full-video, .video-shortcode, .wooslider .slide-content").fitVids() }), s = u, jQuery(u).hasClass("fusion-blog-layout-timeline") && (s = jQuery(u).parents(".fusion-posts-container-infinite")), t = s.find(".current").html(), s.find(".current").remove(), s.data("pages") == t && (s.parent().find(".fusion-loading-container").hide(), s.parent().find(".fusion-load-more-button").hide()), jQuery(n).find(".fusion-rollover-gallery").length && ("individual" !== fusionBlogVars.lightbox_behavior && a.find(".fusion-rollover-gallery").length ? (l = a.find(".fusion-rollover-gallery").first().data("rel"), a = u.find(".post"), void 0 !== window.$ilInstances[l] && (window.$ilInstances[l].destroy(), delete window.$ilInstances[l], window.avadaLightBox.activate_lightbox(a))) : (window.avadaLightBox.activate_lightbox(jQuery(n)), a = u.find(".post")), window.avadaLightBox.refresh_lightbox()), setTimeout(function() { jQuery(window).trigger("resize", [!1]) }, 500), jQuery.isFunction(jQuery.fn.initElementAnimations) && jQuery(window).initElementAnimations() }), (jQuery(u).hasClass("fusion-blog-archive") && "load_more_button" === fusionBlogVars.blog_pagination_type || jQuery(u).hasClass("fusion-posts-container-load-more") || jQuery(u).hasClass("fusion-blog-layout-timeline") && jQuery(u).parent().hasClass("fusion-posts-container-load-more")) && (jQuery(u).infinitescroll("unbind"), (jQuery(u).hasClass("fusion-blog-archive") ? jQuery(u).parent().find(".fusion-load-more-button") : jQuery(u).parents(".fusion-blog-archive").find(".fusion-load-more-button")).on("click", function(i) { i.preventDefault(), jQuery(u).infinitescroll("retrieve") })), s = u, jQuery(u).hasClass("fusion-blog-layout-timeline") && jQuery(u).parents(".fusion-blog-layout-timeline-wrapper").length && (s = jQuery(u).parents(".fusion-posts-container-infinite")), 1 === parseInt(s.data("pages"), 10) && (s.parent().find(".fusion-loading-container").hide(), s.parent().find(".fusion-load-more-button").hide())
    })
}), jQuery(window).on("fusion-column-resized", function(i, e) {
    var n = jQuery('div[data-cid="' + e + '"]').find(".fusion-blog-layout-grid");
    n.data("isotope") && n.isotope("layout")
}), jQuery(window).on("fusion-dynamic-content-render", function(i, e) {
    var n = jQuery(e).find(".fusion-blog-shortcode");
    0 < n.length && n.each(function() { jQuery(this).find(".fusion-blog-layout-grid").isotope() })
});
var fusionCarouselVars = { "related_posts_speed": "2500", "carousel_speed": "2500" };
var generateCarousel = function(e) {
    var i = void 0 !== e ? jQuery('div[data-cid="' + e + '"]').find(".fusion-carousel") : jQuery(".fusion-carousel");
    jQuery().carouFredSel && i.each(function() {
        var e = jQuery(this).attr("data-imagesize") ? jQuery(this).data("imagesize") : "fixed",
            i = !jQuery(this).attr("data-metacontent") || "yes" !== jQuery(this).data("metacontent"),
            s = !(!jQuery(this).attr("data-autoplay") || "yes" !== jQuery(this).data("autoplay")),
            t = jQuery(this).parents(".related-posts").length ? fusionCarouselVars.related_posts_speed : fusionCarouselVars.carousel_speed,
            r = jQuery(this).attr("data-scrollfx") ? jQuery(this).data("scrollfx") : "scroll",
            n = jQuery(this).attr("data-scrollitems") ? parseInt(jQuery(this).data("scrollitems")) : null,
            a = !(!jQuery(this).attr("data-touchscroll") || "yes" !== jQuery(this).data("touchscroll")),
            u = a ? " fusion-carousel-swipe" : "",
            o = jQuery(this).attr("data-columns") ? jQuery(this).data("columns") : 6,
            l = jQuery(this).attr("data-itemmargin") ? parseInt(jQuery(this).data("itemmargin"), 10) : 44,
            f = jQuery(this).attr("data-itemwidth") ? parseInt(jQuery(this).data("itemwidth"), 10) + l : 180 + l,
            c = jQuery(this).parent().hasClass("fusion-image-carousel") && "fixed" === e ? "115px" : "variable";
        jQuery(this).find(".fusion-carousel-positioner").css("margin-left", "-" + l + "px"), jQuery(this).find(".fusion-carousel-item").css("margin-left", l + "px"), jQuery(this).find(".fusion-nav-prev").css("margin-left", l + "px"), jQuery(this).find("ul").carouFredSel({
            circular: !0,
            infinite: !0,
            responsive: !0,
            centerVertically: i,
            height: c,
            width: "100%",
            auto: { play: s, timeoutDuration: parseInt(t, 10) },
            items: { height: c, width: f, visible: { min: 1, max: parseInt(o, 10) } },
            scroll: { pauseOnHover: !0, items: n, fx: r },
            swipe: { onTouch: a, onMouse: a, options: { excludedElements: "button, input, select, textarea, a, .noSwipe" } },
            prev: jQuery(this).find(".fusion-nav-prev"),
            next: jQuery(this).find(".fusion-nav-next"),
            onCreate: function() {
                var e = this;
                jQuery(this).find(".fusion-carousel-item-wrapper").css("visibility", "inherit"), jQuery(this).parents(".fusion-carousel").find(".fusion-carousel-nav").css("visibility", "inherit"), jQuery(this).parents(".fusion-woo-featured-products-slider").length && jQuery(this).parent().css("overflow", ""), i && jQuery(this).css("line-height", jQuery(this).parent().height() + "px"), jQuery(this).css("top", "auto"), jQuery(this).parents(".fusion-carousel").find(".fusion-nav-next").each(function() { jQuery(this).css("left", jQuery(this).parents(".fusion-carousel").find(".fusion-carousel-wrapper").width() - jQuery(this).width()) }), jQuery(window).trigger("resize"), jQuery(this).closest(".fusion-carousel-responsive").fusion_responsive_columns_carousel(), jQuery(this).closest(".fusion-megamenu-menu").one("mouseenter focusin", function() { jQuery(e).trigger("updateSizes") })
            },
            currentVisible: function(e) { return e }
        }, { wrapper: { classname: "fusion-carousel-wrapper" + u } })
    })
};
! function(e) {
    "use strict";
    e.fn.fusion_recalculate_carousel = function() {
        e(this).not(".fusion-woo-featured-products-slider").each(function() {
            var i, s, t = e(this),
                r = e(this).data("imagesize");
            setTimeout(function() { t.find(".fusion-nav-next").each(function() { e(this).css("left", t.find(".fusion-carousel-wrapper").width() - e(this).width()) }), "fixed" === r && (i = t.find(".fusion-carousel-item").map(function() { return e(this).find("img").height() }).get(), s = Math.max.apply(null, i), t.find(".fusion-placeholder-image").each(function() { e(this).css("height", s) }), 1 <= e(t).parents(".fusion-image-carousel").length && t.find(".fusion-image-wrapper").each(function() { e(this).css("height", s), e(this).css("width", "100%"), e(this).find("> a").css("line-height", s - 2 + "px") })) }, 5)
        })
    }, e.fn.fusion_responsive_columns_carousel = function() {
        e(this).each(function() {
            var i, s, t = e(this),
                r = ["small", "medium", "large"],
                n = fusion.isLarge() ? "large" : fusion.isMedium() ? "medium" : "small",
                a = [];
            if (e.each(r, function(e, i) { a.push(t.attr("data-columns" + i.replace("large", "")) ? t.data("columns" + i.replace("large", "")) : 0) }), 0 === (s = parseInt(a[r.indexOf(n)])))
                for (i = r.indexOf(n); i < r.length;) {
                    if (0 < parseInt(a[i])) { s = parseInt(a[i]); break }
                    i++
                }
            0 < s && t.find(".fusion-carousel-holder").trigger("finish").trigger("configuration", { items: { visible: { min: 1, max: s } } }).trigger("updateSizes")
        })
    }
}(jQuery), jQuery(window).on("load fusion-reinit-related-posts-carousel fusion-reinit-carousels fusion-element-render-fusion_images fusion-element-render-fusion_featured_products_slider fusion-element-render-fusion_products_slider fusion-element-render-fusion_portfolio fusion-element-render-fusion_tb_related fusion-element-render-fusion_tb_woo_related fusion-element-render-fusion_tb_woo_upsells fusion-element-render-fusion_post_cards fusion-column-resized", function(e, i) { generateCarousel(i) }), jQuery(window).on("fusion-element-render-fusion_images", function(e, i) { var s = !!jQuery('li[data-parent-cid="' + i + '"]').parents(".fusion-carousel").data("itemmargin") && parseFloat(jQuery('li[data-parent-cid="' + i + '"]').parents(".fusion-carousel").data("itemmargin"));!1 !== s && jQuery('li[data-parent-cid="' + i + '"]').css("margin-left", s + "px"), jQuery('li[data-parent-cid="' + i + '"], li[data-parent-cid="' + i + '"] .fusion-carousel-item-wrapper').css("visibility", "inherit") }), jQuery(window).on("fusion-dynamic-content-render", function(e, i) { 0 < jQuery(i).find(".fusion-carousel").length && generateCarousel() }), jQuery(document).ready(function() { jQuery(window).on("fusion-resize-horizontal", function() { jQuery(".fusion-carousel-responsive").fusion_responsive_columns_carousel(), jQuery(".fusion-carousel").fusion_recalculate_carousel() }) });

function fusionInitTooltips() {
    jQuery('[data-toggle="tooltip"]').each(function() {
        var e;
        e = jQuery(this).parents(".fusion-header-wrapper").length ? ".fusion-header-wrapper" : jQuery(this).parents("#side-header").length ? "#side-header" : "body", (!cssua.ua.mobile || cssua.ua.mobile && "_blank" !== jQuery(this).attr("target")) && jQuery(this).tooltip({ container: e })
    })
}
jQuery(window).on("load", function() { fusionInitTooltips() }), jQuery(window).on("fusion-element-render-fusion_text fusion-element-render-fusion_social_links", function(e, t) {
    var i, n = jQuery('div[data-cid="' + t + '"]').find('[data-toggle="tooltip"]');
    i = n.parents(".fusion-header-wrapper").length ? ".fusion-header-wrapper" : n.parents("#side-header").length ? "#side-header" : "body", n.each(function() {
        (!cssua.ua.mobile || cssua.ua.mobile && "_blank" !== jQuery(this).attr("target")) && jQuery(this).tooltip({ container: i })
    })
});
! function(e) {
    "use strict";
    e.fn.reinitializeGoogleMap = function() {
        var i, n, t, r, o = e(this).data("plugin_fusion_maps");
        if (o && (n = (i = o.map).getCenter(), t = o.markers, google.maps.event.trigger(i, "resize"), i.setCenter(n), t))
            for (r = 0; r < t.length; r++) google.maps.event.trigger(t[r], "click"), google.maps.event.trigger(t[r], "click")
    }
}(jQuery), jQuery(window).on("fusion-dynamic-content-render", function(e, i) {
    var n = jQuery(i).find(".shortcode-map");
    0 < n.length && n.each(function() { jQuery(this).reinitializeGoogleMap() })
});
var fusionCarouselVars = { "related_posts_speed": "2500", "carousel_speed": "2500" };
var generateCarousel = function(e) {
    var i = void 0 !== e ? jQuery('div[data-cid="' + e + '"]').find(".fusion-carousel") : jQuery(".fusion-carousel");
    jQuery().carouFredSel && i.each(function() {
        var e = jQuery(this).attr("data-imagesize") ? jQuery(this).data("imagesize") : "fixed",
            i = !jQuery(this).attr("data-metacontent") || "yes" !== jQuery(this).data("metacontent"),
            s = !(!jQuery(this).attr("data-autoplay") || "yes" !== jQuery(this).data("autoplay")),
            t = jQuery(this).parents(".related-posts").length ? fusionCarouselVars.related_posts_speed : fusionCarouselVars.carousel_speed,
            r = jQuery(this).attr("data-scrollfx") ? jQuery(this).data("scrollfx") : "scroll",
            n = jQuery(this).attr("data-scrollitems") ? parseInt(jQuery(this).data("scrollitems")) : null,
            a = !(!jQuery(this).attr("data-touchscroll") || "yes" !== jQuery(this).data("touchscroll")),
            u = a ? " fusion-carousel-swipe" : "",
            o = jQuery(this).attr("data-columns") ? jQuery(this).data("columns") : 6,
            l = jQuery(this).attr("data-itemmargin") ? parseInt(jQuery(this).data("itemmargin"), 10) : 44,
            f = jQuery(this).attr("data-itemwidth") ? parseInt(jQuery(this).data("itemwidth"), 10) + l : 180 + l,
            c = jQuery(this).parent().hasClass("fusion-image-carousel") && "fixed" === e ? "115px" : "variable";
        jQuery(this).find(".fusion-carousel-positioner").css("margin-left", "-" + l + "px"), jQuery(this).find(".fusion-carousel-item").css("margin-left", l + "px"), jQuery(this).find(".fusion-nav-prev").css("margin-left", l + "px"), jQuery(this).find("ul").carouFredSel({
            circular: !0,
            infinite: !0,
            responsive: !0,
            centerVertically: i,
            height: c,
            width: "100%",
            auto: { play: s, timeoutDuration: parseInt(t, 10) },
            items: { height: c, width: f, visible: { min: 1, max: parseInt(o, 10) } },
            scroll: { pauseOnHover: !0, items: n, fx: r },
            swipe: { onTouch: a, onMouse: a, options: { excludedElements: "button, input, select, textarea, a, .noSwipe" } },
            prev: jQuery(this).find(".fusion-nav-prev"),
            next: jQuery(this).find(".fusion-nav-next"),
            onCreate: function() {
                var e = this;
                jQuery(this).find(".fusion-carousel-item-wrapper").css("visibility", "inherit"), jQuery(this).parents(".fusion-carousel").find(".fusion-carousel-nav").css("visibility", "inherit"), jQuery(this).parents(".fusion-woo-featured-products-slider").length && jQuery(this).parent().css("overflow", ""), i && jQuery(this).css("line-height", jQuery(this).parent().height() + "px"), jQuery(this).css("top", "auto"), jQuery(this).parents(".fusion-carousel").find(".fusion-nav-next").each(function() { jQuery(this).css("left", jQuery(this).parents(".fusion-carousel").find(".fusion-carousel-wrapper").width() - jQuery(this).width()) }), jQuery(window).trigger("resize"), jQuery(this).closest(".fusion-carousel-responsive").fusion_responsive_columns_carousel(), jQuery(this).closest(".fusion-megamenu-menu").one("mouseenter focusin", function() { jQuery(e).trigger("updateSizes") })
            },
            currentVisible: function(e) { return e }
        }, { wrapper: { classname: "fusion-carousel-wrapper" + u } })
    })
};
! function(e) {
    "use strict";
    e.fn.fusion_recalculate_carousel = function() {
        e(this).not(".fusion-woo-featured-products-slider").each(function() {
            var i, s, t = e(this),
                r = e(this).data("imagesize");
            setTimeout(function() { t.find(".fusion-nav-next").each(function() { e(this).css("left", t.find(".fusion-carousel-wrapper").width() - e(this).width()) }), "fixed" === r && (i = t.find(".fusion-carousel-item").map(function() { return e(this).find("img").height() }).get(), s = Math.max.apply(null, i), t.find(".fusion-placeholder-image").each(function() { e(this).css("height", s) }), 1 <= e(t).parents(".fusion-image-carousel").length && t.find(".fusion-image-wrapper").each(function() { e(this).css("height", s), e(this).css("width", "100%"), e(this).find("> a").css("line-height", s - 2 + "px") })) }, 5)
        })
    }, e.fn.fusion_responsive_columns_carousel = function() {
        e(this).each(function() {
            var i, s, t = e(this),
                r = ["small", "medium", "large"],
                n = fusion.isLarge() ? "large" : fusion.isMedium() ? "medium" : "small",
                a = [];
            if (e.each(r, function(e, i) { a.push(t.attr("data-columns" + i.replace("large", "")) ? t.data("columns" + i.replace("large", "")) : 0) }), 0 === (s = parseInt(a[r.indexOf(n)])))
                for (i = r.indexOf(n); i < r.length;) {
                    if (0 < parseInt(a[i])) { s = parseInt(a[i]); break }
                    i++
                }
            0 < s && t.find(".fusion-carousel-holder").trigger("finish").trigger("configuration", { items: { visible: { min: 1, max: s } } }).trigger("updateSizes")
        })
    }
}(jQuery), jQuery(window).on("load fusion-reinit-related-posts-carousel fusion-reinit-carousels fusion-element-render-fusion_images fusion-element-render-fusion_featured_products_slider fusion-element-render-fusion_products_slider fusion-element-render-fusion_portfolio fusion-element-render-fusion_tb_related fusion-element-render-fusion_tb_woo_related fusion-element-render-fusion_tb_woo_upsells fusion-element-render-fusion_post_cards fusion-column-resized", function(e, i) { generateCarousel(i) }), jQuery(window).on("fusion-element-render-fusion_images", function(e, i) { var s = !!jQuery('li[data-parent-cid="' + i + '"]').parents(".fusion-carousel").data("itemmargin") && parseFloat(jQuery('li[data-parent-cid="' + i + '"]').parents(".fusion-carousel").data("itemmargin"));!1 !== s && jQuery('li[data-parent-cid="' + i + '"]').css("margin-left", s + "px"), jQuery('li[data-parent-cid="' + i + '"], li[data-parent-cid="' + i + '"] .fusion-carousel-item-wrapper').css("visibility", "inherit") }), jQuery(window).on("fusion-dynamic-content-render", function(e, i) { 0 < jQuery(i).find(".fusion-carousel").length && generateCarousel() }), jQuery(document).ready(function() { jQuery(window).on("fusion-resize-horizontal", function() { jQuery(".fusion-carousel-responsive").fusion_responsive_columns_carousel(), jQuery(".fusion-carousel").fusion_recalculate_carousel() }) });
! function(n) {
    "use strict";
    n.fn.awbAnimateContentBoxes = function() {
        n.each(fusion.getObserverSegmentation(n(".fusion-content-boxes.content-boxes-timeline-layout, .fusion-content-boxes.fusion-delayed-animation")), function(e) {
            var o = fusion.getAnimationIntersectionData(e),
                i = new IntersectionObserver(function(e, o) {
                    n.each(e, function(e, t) {
                        var a, r, s = n(t.target),
                            u = 0;
                        fusion.shouldObserverEntryAnimate(t, o) && (s.find(".content-box-column").each(function() {
                            var e = n(this),
                                o = e.find(".fusion-animated");
                            setTimeout(function() { o.css("visibility", "visible"), a = o.data("animationtype"), r = o.data("animationduration"), o.addClass(a), r && o.css("animation-duration", r + "s"), (s.hasClass("content-boxes-timeline-horizontal") || s.hasClass("content-boxes-timeline-vertical")) && e.addClass("fusion-appear"), setTimeout(function() { o.removeClass(a) }, 1e3 * r) }, u), u += parseInt(s.attr("data-animation-delay"), 10)
                        }), i.unobserve(t.target))
                    })
                }, o);
            n(this).each(function() { i.observe(this) })
        })
    }
}(jQuery), jQuery(window).on("load", function() { "function" == typeof jQuery.fn.equalHeights && (jQuery(".content-boxes-icon-boxed").each(function() { jQuery(this).find(".content-box-column .content-wrapper-boxed").equalHeights(), jQuery(this).find(".content-box-column .content-wrapper-boxed").css("overflow", "visible") }), jQuery(window).on("fusion-resize-horizontal", function() { jQuery(".content-boxes-icon-boxed").each(function() { jQuery(this).find(".content-box-column .content-wrapper-boxed").equalHeights(), jQuery(this).find(".content-box-column .content-wrapper-boxed").css("overflow", "visible") }) }), jQuery(".content-boxes-clean-vertical").each(function() { jQuery(this).find(".content-box-column .col").equalHeights(), jQuery(this).find(".content-box-column .col").css("overflow", "visible") }), jQuery(window).on("fusion-resize-horizontal", function() { jQuery(".content-boxes-clean-vertical").each(function() { jQuery(this).find(".content-box-column .col").equalHeights(), jQuery(this).find(".content-box-column .col").css("overflow", "visible") }) }), jQuery(".content-boxes-clean-horizontal").each(function() { jQuery(this).find(".content-box-column .col").equalHeights(), jQuery(this).find(".content-box-column .col").css("overflow", "visible") }), jQuery(window).on("fusion-resize-horizontal", function() { jQuery(".content-boxes-clean-horizontal").each(function() { jQuery(this).find(".content-box-column .col").equalHeights(), jQuery(this).find(".content-box-column .col").css("overflow", "visible") }) })) }), jQuery(document).ready(function() {
    jQuery(".link-area-box").on("click", function() { jQuery(this).data("link") && ("_blank" === jQuery(this).data("link-target") ? (window.open(jQuery(this).data("link"), "_blank"), jQuery(this).find(".heading-link").removeAttr("href"), jQuery(this).find(".fusion-read-more").removeAttr("href")) : jQuery("body").hasClass("fusion-builder-live") || ("#" === jQuery(this).data("link").substring(0, 1) ? jQuery(this).fusion_scroll_to_anchor_target() : window.location = jQuery(this).data("link")), jQuery(this).find(".heading-link").attr("target", ""), jQuery(this).find(".fusion-read-more").attr("target", "")) }), jQuery(".link-type-button").each(function() {
        var n;
        1 <= jQuery(this).parents(".content-boxes-clean-vertical").length && (n = jQuery(".fusion-read-more-button").outerHeight(), jQuery(this).find(".fusion-read-more-button").css("top", n / 2))
    }), jQuery(".link-area-link-icon .fusion-read-more-button, .link-area-link-icon .fusion-read-more, .link-area-link-icon .heading").on("mouseenter", function() { jQuery(this).parents(".link-area-link-icon").addClass("link-area-link-icon-hover") }), jQuery(".link-area-link-icon .fusion-read-more-button, .link-area-link-icon .fusion-read-more, .link-area-link-icon .heading").on("mouseleave", function() { jQuery(this).parents(".link-area-link-icon").removeClass("link-area-link-icon-hover") }), jQuery(".link-area-box").on("mouseenter", function() { jQuery(this).addClass("link-area-box-hover") }), jQuery(".link-area-box").on("mouseleave", function() { jQuery(this).removeClass("link-area-box-hover") }), jQuery(window).awbAnimateContentBoxes()
});
var avadaPortfolioVars = { "lightbox_behavior": "all", "infinite_finished_msg": "<em>All items displayed.<\/em>", "infinite_blog_text": "<em>Loading the next set of posts...<\/em>", "content_break_point": "800" };
jQuery.fn.fusionCalculatePortfolioEqualHeights = function() {
    var i = jQuery(this).children(":visible").length ? Math.round(1 / (jQuery(this).children(":visible").first()[0].getBoundingClientRect().width / jQuery(this).parent().width())) : 1,
        o = jQuery(this).find(".fusion-portfolio-post:visible").not(".invisible-after-ajax").length;
    jQuery(this).find(".invisible-after-ajax").hide().removeClass("invisible-after-ajax"), 1 < i && 1 < o && jQuery(this).find(".fusion-portfolio-post:visible").each(function(o) {
        var e = parseInt(jQuery(this).css("top"), 10),
            t = 0;
        t = 1 == (o + 1) % i ? jQuery(this).parent().find(".fusion-portfolio-post:visible:eq(" + (o + i) + ")").length ? parseInt(jQuery(this).parent().find(".fusion-portfolio-post:visible:eq(" + (o + i) + ")").css("top"), 10) - e : parseInt(jQuery(this).parent().height(), 10) - e : parseInt(jQuery(this).parent().find(".fusion-portfolio-post:visible:eq(" + (o - 1) + ")").css("height"), 10), jQuery(this).css("height", t + "px")
    })
}, jQuery(document).ready(function() {
    window.portfolioEqualHeightsResizeTimer, jQuery(window).on("resize", function(i, o) { void 0 !== o && !0 !== o || (jQuery(".fusion-portfolio-equal-heights .fusion-portfolio-wrapper").each(function() { jQuery(this).find(".fusion-portfolio-post").css("height", "") }), jQuery(".fusion-portfolio-equal-heights").length && (clearTimeout(window.portfolioEqualHeightsResizeTimer), window.portfolioEqualHeightsResizeTimer = setTimeout(function() { jQuery(".fusion-portfolio-equal-heights").find(".fusion-portfolio-wrapper").isotope() }, 50))) }), jQuery(window).on("fusion-resize-horizontal", function() { jQuery(".fusion-portfolio .fusion-portfolio-wrapper").each(function() { "fixed" === jQuery(this).data("picturesize") && jQuery(this).find(".fusion-placeholder-image").each(function() { jQuery(this).css({ height: jQuery(this).parents(".fusion-portfolio-post").siblings().find("img").first().height(), width: jQuery(this).parents(".fusion-portfolio-post").siblings().find("img").first().width() }) }) }) }), jQuery(".fusion-portfolio .fusion-filters a").on("click", function(i) {
        var o = jQuery(this).data("filter"),
            e = [],
            t = jQuery(this).parents(".fusion-portfolio").data("id");
        i.preventDefault(), t || (t = ""), jQuery(this).parents(".fusion-portfolio-equal-heights").find(".fusion-portfolio-post").css("height", ""), jQuery(this).parents(".fusion-portfolio").find(".fusion-portfolio-wrapper").isotope({ filter: o }), jQuery(this).parents(".fusion-filters").find(".fusion-filter").removeClass("fusion-active"), jQuery(this).parent().addClass("fusion-active"), jQuery(this).parents(".fusion-portfolio").find(".fusion-portfolio-wrapper").find(".fusion-portfolio-post").each(function() { var i, n, r = ""; "individual" === avadaPortfolioVars.lightbox_behavior && jQuery(this).find(".fusion-rollover-gallery").length && (r = jQuery(this).find(".fusion-rollover-gallery").data("id")), 1 < o.length ? n = "iLightbox[" + (i = o.substr(1)) + r + t + "]" : (i = "fusion-portfolio-post", n = "iLightbox[gallery" + r + t + "]"), (jQuery(this).hasClass(i) || 1 === o.length) && (1 < o.length && -1 === jQuery.inArray(i + r + t, e) ? e.push(i + r + t) : 1 === o.length && -1 === jQuery.inArray(r + t, e) && e.push("gallery" + r + t), jQuery(this).find(".fusion-rollover-gallery").attr("data-rel", n), jQuery(this).find(".fusion-portfolio-gallery-hidden a").attr("data-rel", n)) }), "created" !== jQuery(this).data("lightbox") && (jQuery.each(e, function(i, o) { window.$ilInstances["portfolio_" + i] = jQuery('[data-rel="iLightbox[' + o + ']"], [rel="iLightbox[' + o + ']"]').iLightBox(window.avadaLightBox.prepare_options("iLightbox[" + o + "]")) }), jQuery(this).data("lightbox", "created")), window.avadaLightBox.refresh_lightbox(), jQuery(window).trigger("resize")
    }), Modernizr.mq("only screen and (max-width: 479px)") && (jQuery(".fusion-portfolio .fusion-rollover-gallery").each(function() { var i = jQuery(this).attr("href");!0 == (null !== i.match("/.(jpeg|jpg|gif|png)$/")) && jQuery(this).parents(".fusion-image-wrapper").find("> img").attr("src", i).attr("width", "").attr("height", ""), jQuery(this).parents(".fusion-portfolio-post").css("width", "auto"), jQuery(this).parents(".fusion-portfolio-post").css("height", "auto"), jQuery(this).parents(".fusion-portfolio-one:not(.fusion-portfolio-one-text)").find(".fusion-portfolio-post").css("margin", "0") }), jQuery(".fusion-portfolio").length && jQuery(".fusion-portfolio-wrapper").isotope())
}), jQuery(window).on("load fusion-element-render-fusion_portfolio fusion-column-resized", function(i, o) {
    jQuery(".sidebar").is(":visible") && jQuery(".post-content .fusion-portfolio").each(function() {
        var i = jQuery(this).data("columns");
        jQuery(this).addClass("fusion-portfolio-" + i + "-sidebar")
    }), jQuery().isotope && jQuery(".fusion-portfolio .fusion-portfolio-wrapper").length && (void 0 !== o ? jQuery('div[data-cid="' + o + '"]').find(".fusion-portfolio .fusion-portfolio-wrapper") : jQuery(".fusion-portfolio .fusion-portfolio-wrapper")).each(function() {
        var i, o, e, t, n, r, s, a, f, l, u, d, p;
        jQuery(this).next(".fusion-load-more-button").fadeIn(), "fixed" === jQuery(this).data("picturesize") ? jQuery(this).find(".fusion-placeholder-image").each(function() { jQuery(this).css({ height: jQuery(this).parents(".fusion-portfolio-post").siblings().find("img").first().height(), width: jQuery(this).parents(".fusion-portfolio-post").siblings().find("img").first().width() }) }) : jQuery(this).find(".fusion-placeholder-image").each(function() { jQuery(this).css({ width: jQuery(this).parents(".fusion-portfolio-post").siblings().first().find("img").width() }) }), p = "", (i = jQuery(this).parents(".fusion-portfolio").find(".fusion-filters")).length && (o = i.find(".fusion-filter"), e = i.find(".fusion-active"), t = e.children("a"), n = t.length ? t.attr("data-filter").substr(1) : "", r = jQuery(this).find(".fusion-portfolio-post"), s = [], u = !0, o && o.each(function() {
            var o = jQuery(this),
                a = o.children("a").data("filter");
            r && (n.length && r.hide(), jQuery(".fusion-filters").show(), r.each(function() {
                var r, f = jQuery(this),
                    l = f.find(".fusion-rollover-gallery").data("rel");
                f.hasClass(a.substr(1)) && o.hasClass("fusion-hidden") && (o.removeClass("fusion-hidden"), !0 === u && 0 === i.find(".fusion-filter-all").length && (i.find(".fusion-filter").removeClass("fusion-active"), o.addClass("fusion-active"), u = !1, e = i.find(".fusion-active"), t = e.children("a"), n = t.attr("data-filter").substr(1))), n.length && f.hasClass(n) && (f.show(), l && (r = l.replace("gallery", n), f.find(".fusion-rollover-gallery").attr("data-rel", r), "individual" === avadaPortfolioVars.lightbox_behavior && f.find(".fusion-portfolio-gallery-hidden a").attr("data-rel", r), -1 === jQuery.inArray(r, s) && s.push(r)))
            }))
        }), n.length && (p = "." + n, jQuery.each(s, function(i, o) { window.$ilInstances["portfolio_" + i] = jQuery('[data-rel="' + o + '"], [rel="' + o + '"]').iLightBox(window.avadaLightBox.prepare_options(o)) }), window.avadaLightBox.refresh_lightbox(), "individual" !== avadaPortfolioVars.lightbox_behavior && t.data("lightbox", "created"))), jQuery('[data-spy="scroll"]').each(function() { jQuery(this).scrollspy("refresh") }), (f = (a = jQuery(this)).attr("id")) && (a = jQuery("#" + f)), (jQuery(this).parent().hasClass("fusion-portfolio-masonry") || jQuery(this).parent().hasClass("fusion-portfolio-layout-masonry")) && !jQuery(this).parent().hasClass("fusion-masonry-has-vertical") && 0 < jQuery(this).find(".fusion-portfolio-post:not(.fusion-grid-sizer)").not(".fusion-element-landscape").length && jQuery(this).parent().addClass("fusion-masonry-has-vertical"), setTimeout(function() {
            var i, o;
            a.parent().hasClass("fusion-portfolio-one") ? (i = "vertical", o = !1) : (i = a.parent().hasClass("fusion-portfolio-equal-heights") ? "fitRows" : "packery", o = !0), window.$portfolio_isotope = a, window.$portfolio_isotope.data("isotope") && (window.$portfolio_isotope.isotope("destroy"), window.$portfolio_isotope.removeData("isotope")), window.$portfolio_isotope.isotope({ itemSelector: ".fusion-portfolio-post", resizeable: o, layoutMode: i, transformsEnabled: !1, isOriginLeft: !jQuery(".rtl").length, filter: p, initLayout: !1 }), window.$portfolio_isotope.parent().hasClass("fusion-portfolio-equal-heights") && window.$portfolio_isotope.on("layoutComplete", function(i) {
                setTimeout(function() {
                    var o = jQuery(i.target);
                    o.find(".fusion-portfolio-post").css("height", ""), o.fusionCalculatePortfolioEqualHeights()
                }, 10)
            }), window.$portfolio_isotope.isotope()
        }, 1), (l = jQuery(this).find(".fusion-portfolio-post .fusion-placeholder-image")).each(function() { jQuery(this).parents(".fusion-portfolio-content-wrapper, .fusion-image-wrapper").animate({ opacity: 1 }) }), (d = jQuery(this).find(".fusion-portfolio-post .fusion-video")).each(function() { jQuery(this).animate({ opacity: 1 }), jQuery(this).parents(".fusion-portfolio-content-wrapper").animate({ opacity: 1 }) }), d.fitVids(), window.$portfolio_images_index = 0, jQuery(this).imagesLoaded().progress(function(i, o) { 1 <= jQuery(o.img).parents(".fusion-portfolio-content-wrapper").length ? jQuery(o.img, l).parents(".fusion-portfolio-content-wrapper").delay(100 * window.$portfolio_images_index).animate({ opacity: 1 }) : jQuery(o.img, l).parents(".fusion-image-wrapper").delay(100 * window.$portfolio_images_index).animate({ opacity: 1 }), window.$portfolio_images_index++ }), setTimeout(function() { jQuery(window).trigger("resize", [!1]) }, 250)
    }), jQuery(".fusion-portfolio-paging-infinite, .fusion-portfolio-paging-load-more-button").each(function(i) {
        var o = jQuery(this),
            e = "." + o.attr("class").replace(/\ /g, ".").replace(/.fusion\-portfolio\-[a-zA-Z]+\-sidebar/g, "").replace(".fusion-masonry-has-vertical", "") + " ",
            t = o.find(".fusion-portfolio-wrapper").data("pages"),
            n = o.find(".fusion-portfolio-post"),
            r = "";
        o.children(".fusion-portfolio-wrapper").infinitescroll({ navSelector: e + ".fusion-infinite-scroll-trigger", nextSelector: e + ".pagination-next", itemSelector: e + "div.pagination .current, " + e + " .fusion-portfolio-post", loading: { finishedMsg: avadaPortfolioVars.infinite_finished_msg, msg: jQuery('<div class="fusion-loading-container fusion-clearfix"><div class="fusion-loading-spinner"><div class="fusion-spinner-1"></div><div class="fusion-spinner-2"></div><div class="fusion-spinner-3"></div></div><div class="fusion-loading-msg">' + avadaPortfolioVars.infinite_blog_text + "</div>") }, maxPage: t || void 0, infid: "p" + i, errorCallback: function() { o.find(".fusion-portfolio-post").css("height", ""), o.find(".fusion-portfolio-wrapper").isotope() } }, function(i) {
            var e;
            jQuery().isotope && (e = o.find(".fusion-filters").find(".fusion-filter"), (i = jQuery(i)).hide(), imagesLoaded(i, function() {
                var s, a, f, l, u;
                (s = jQuery(i).find(".fusion-placeholder-image")).parents(".fusion-portfolio-content-wrapper, .fusion-image-wrapper").animate({ opacity: 1 }), (a = jQuery(i).find(".fusion-video")).each(function() { jQuery(this).animate({ opacity: 1 }), jQuery(this).parents(".fusion-portfolio-content-wrapper").animate({ opacity: 1 }) }), a.fitVids(), window.$portfolio_images_index = 0, jQuery(i).imagesLoaded().progress(function(i, o) { 1 <= jQuery(o.img).parents(".fusion-portfolio-content-wrapper").length ? jQuery(o.img, s).parents(".fusion-portfolio-content-wrapper").delay(100 * window.$portfolio_images_index).animate({ opacity: 1 }) : jQuery(o.img, s).parents(".fusion-image-wrapper").delay(100 * window.$portfolio_images_index).animate({ opacity: 1 }), window.$portfolio_images_index++ }), e && e.each(function() {
                    var o, e, t = jQuery(this),
                        n = t.children("a").data("filter");
                    i && i.each(function() { jQuery(this).hasClass(n.substr(1)) && t.hasClass("fusion-hidden") && (Modernizr.mq("only screen and (max-width: " + avadaPortfolioVars.content_break_point + "px)") ? t.fadeIn(400, function() { t.removeClass("fusion-hidden") }) : (o = t.css("width"), e = t.css("margin-right"), t.css("width", 0), t.css("margin-right", 0), t.removeClass("fusion-hidden"), t.animate({ width: o, "margin-right": e }, 400, function() { t.removeAttr("style") }))) })
                }), o.find(".fusion-filters").length ? (f = o.find(".fusion-filters").find(".fusion-filter.fusion-active a"), (l = f.attr("data-filter").substr(1)).length ? (i.each(function() {
                    var i = jQuery(this),
                        e = i.find(".fusion-rollover-gallery").data("rel");
                    i.hasClass(l) ? (i.fadeIn(), e && i.find(".fusion-rollover-gallery").attr("data-rel", e.replace("gallery", l))) : o.hasClass("fusion-portfolio-equal-heights") && i.addClass("invisible-after-ajax")
                }), "created" !== f.data("lightbox") && (window.$ilInstances[l] = jQuery('[data-rel^="iLightbox[' + l + ']"]').iLightBox(window.avadaLightBox.prepare_options("iLightbox[" + l + "]")), f.data("lightbox", "created")), window.avadaLightBox.refresh_lightbox()) : i.fadeIn()) : i.fadeIn(), o.find(".fusion-portfolio-post").css("height", ""), o.find(".fusion-portfolio-wrapper").isotope("appended", i), i.each(function() { jQuery(this).find(".full-video, .video-shortcode, .wooslider .slide-content").fitVids() }), jQuery('[data-spy="scroll"]').each(function() { jQuery(this).scrollspy("refresh") }), jQuery(i).find(".fusion-rollover-gallery").length && ("individual" !== avadaPortfolioVars.lightbox_behavior && n.find(".fusion-rollover-gallery").length ? (r = n.find(".fusion-rollover-gallery").first().data("rel"), n = o.find(".fusion-portfolio-post"), void 0 !== window.$ilInstances[r] && (window.$ilInstances[r].destroy(), delete window.$ilInstances[r], window.avadaLightBox.activate_lightbox(n))) : (window.avadaLightBox.activate_lightbox(jQuery(i)), n = o.find(".fusion-portfolio-post")), window.avadaLightBox.refresh_lightbox()), u = o.find(".current").html(), o.find(".current").remove(), t == u && (o.find(".fusion-loading-container").hide(), o.find(".fusion-load-more-button").hide())
            }))
        }), "1" == t && (o.find(".fusion-loading-container").hide(), o.find(".fusion-load-more-button").hide()), o.hasClass("fusion-portfolio-paging-load-more-button") && (o.find(".fusion-portfolio-wrapper").infinitescroll("unbind"), o.find(".fusion-load-more-button").on("click", function(i) { i.preventDefault(), o.find(".fusion-portfolio-wrapper").infinitescroll("retrieve") }))
    })
}), jQuery(window).on("fusion-column-resized", function(i, o) {
    var e = jQuery('div[data-cid="' + o + '"]').find(".fusion-portfolio-wrapper");
    e.length && e.data("isotope") && e.isotope("layout")
}), jQuery(window).on("fusion-dynamic-content-render", function(i, o) {
    var e = jQuery(o).find(".fusion-portfolio");
    0 < e.length && e.each(function() {
        var i = jQuery(this).find(".fusion-portfolio-wrapper"),
            o = i.attr("id");
        o && (i = jQuery("#" + o)), i.isotope()
    })
});
var fusionCountersBox = { "counter_box_speed": "2000" };
! function(e) {
    "use strict";
    e.fn.awbAnimateCounterBoxes = function() {
        e.each(fusion.getObserverSegmentation(e(this)), function(n) {
            var o = fusion.getAnimationIntersectionData(n),
                t = new IntersectionObserver(function(n, o) {
                    e.each(n, function(n, r) {
                        var i = e(r.target),
                            u = i.data("value"),
                            s = i.data("direction"),
                            a = i.data("delimiter"),
                            c = 0,
                            d = u,
                            f = fusionCountersBox.counter_box_speed,
                            b = Math.round(fusionCountersBox.counter_box_speed / 100);
                        fusion.shouldObserverEntryAnimate(r, o) && (a || (a = ""), "down" === s && (c = u, d = 0), i.countTo({ from: c, to: d, refreshInterval: b, speed: f, formatter: function(e, n) { return "-0" === (e = (e = e.toFixed(n.decimals)).replace(/\B(?=(\d{3})+(?!\d))/g, a)) && (e = 0), e } }), t.unobserve(r.target))
                    })
                }, o);
            e(this).find(".display-counter").each(function() { t.observe(this) })
        })
    }
}(jQuery), jQuery(window).on("load fusion-element-render-fusion-counters_box fusion-element-render-fusion_counter_box", function(e, n) {
    (void 0 !== n ? jQuery('div[data-cid="' + n + '"]') : jQuery(".fusion-counter-box")).awbAnimateCounterBoxes()
});
! function(i) {
    "use strict";
    i.fn.fusionCalcFlipBoxesHeight = function() {
        var e, o, n = i(this),
            s = n.find(".flip-box-front"),
            t = n.find(".flip-box-back");
        n.css("min-height", ""), s.css("position", ""), t.css("bottom", ""), e = s.outerHeight(), o = t.outerHeight(), setTimeout(function() { e > o ? n.css("min-height", e) : n.css("min-height", o), s.css("position", "absolute"), t.css("bottom", "0") }, 100)
    }, i.fn.fusionCalcFlipBoxesEqualHeights = function() {
        var e, o = i(this),
            n = [];
        o.find(".flip-box-inner-wrapper").each(function() {
            var e = i(this),
                o = e.find(".flip-box-front"),
                s = e.find(".flip-box-back");
            e.css("min-height", ""), o.css("position", ""), s.css("bottom", ""), n.push(Math.max(o.outerHeight(), s.outerHeight()))
        }), e = Math.max.apply(null, n), o.find(".flip-box-inner-wrapper").each(function() {
            var o = i(this),
                n = o.find(".flip-box-front"),
                s = o.find(".flip-box-back");
            o.css("min-height", e), n.css("position", "absolute"), s.css("bottom", "0")
        })
    }
}(jQuery), jQuery(window).on("load", function() { jQuery(".fusion-flip-boxes.equal-heights").each(function() { jQuery(this).fusionCalcFlipBoxesEqualHeights() }), jQuery(".fusion-flip-boxes").not(".equal-heights").find(".flip-box-inner-wrapper").each(function() { jQuery(this).fusionCalcFlipBoxesHeight() }), jQuery(window).on("fusion-resize-horizontal", function() { jQuery(".fusion-flip-boxes.equal-heights").each(function() { jQuery(this).fusionCalcFlipBoxesEqualHeights() }), jQuery(".fusion-flip-boxes").not(".equal-heights").find(".flip-box-inner-wrapper").each(function() { jQuery(this).fusionCalcFlipBoxesHeight() }) }) }), jQuery(window).on("fusion-element-render-fusion_flip_box fusion-column-resized", function(i, e) {
    var o, n, s;
    void 0 !== i.type && "fusion-column-resized" === i.type ? (o = jQuery('div[data-cid="' + e + '"] .fusion-flip-boxes.equal-heights'), n = jQuery('div[data-cid="' + e + '"] .fusion-flip-boxes').not(".equal-heights").find(".flip-box-inner-wrapper"), s = jQuery('div[data-cid="' + e + '"] .fusion-flip-box')) : (o = jQuery('div[data-cid="' + e + '"]').closest(".fusion-flip-boxes.equal-heights"), n = jQuery('div[data-cid="' + e + '"]').closest(".fusion-flip-boxes").not(".equal-heights").find(".flip-box-inner-wrapper"), s = jQuery('div[data-cid="' + e + '"]').find(".fusion-flip-box")), o.each(function() { jQuery(this).fusionCalcFlipBoxesEqualHeights() }), n.each(function() { jQuery(this).fusionCalcFlipBoxesHeight() }), s.mouseover(function() { jQuery(this).addClass("hover") }), s.mouseout(function() { jQuery(this).removeClass("hover") })
}), jQuery(window).on("fusion-dynamic-content-render", function(i, e) {
    var o = jQuery(e).find(".fusion-flip-boxes").not(".equal-heights").find(".flip-box-inner-wrapper");
    0 < o.length && o.each(function() { jQuery(this).fusionCalcFlipBoxesHeight() }), 0 < (o = jQuery(e).find(".fusion-flip-boxes.equal-heights")).length && o.each(function() { jQuery(this).fusionCalcFlipBoxesEqualHeights() })
});
var fusionFlexSliderVars = { "status_vimeo": "", "slideshow_autoplay": "1", "slideshow_speed": "7000", "pagination_video_slide": "", "status_yt": "", "flex_smoothHeight": "false" };

function fusionInitPostFlexSlider() {
    jQuery(".fusion-flexslider.fusion-flexslider-loading, .flexslider.fusion-flexslider-loading:not(.tfs-slider)").not(".woocommerce .images #slider").each(function() {
        var e = "false" !== fusionFlexSliderVars.flex_smoothHeight,
            i = Boolean(Number(fusionFlexSliderVars.slideshow_autoplay)),
            s = Number(fusionFlexSliderVars.slideshow_speed),
            r = "fade",
            n = !0;
        2 > jQuery(this).find(".slides li").length || (e = void 0 !== jQuery(this).data("slideshow_smooth_height") ? Boolean(Number(jQuery(this).data("slideshow_smooth_height"))) : e, i = void 0 !== jQuery(this).data("slideshow_autoplay") ? Boolean(Number(jQuery(this).data("slideshow_autoplay"))) : i, s = void 0 !== jQuery(this).data("slideshow_speed") ? Number(jQuery(this).data("slideshow_speed")) : s, r = void 0 !== jQuery(this).data("slideshow_animation") ? String(jQuery(this).data("slideshow_animation")) : r, n = void 0 !== jQuery(this).data("slideshow_control_nav") ? Boolean(Number(jQuery(this).data("slideshow_control_nav"))) : n, jQuery().isotope && 0 < jQuery(this).closest(".fusion-blog-layout-grid").length && (e = !1), jQuery(this).flexslider({ slideshow: i, slideshowSpeed: s, video: !0, smoothHeight: e, pauseOnHover: !1, useCSS: !1, prevText: "&#xf104;", nextText: "&#xf105;", animation: r, controlNav: n, start: function(e) { e.removeClass("fusion-flexslider-loading"), jQuery(window).trigger("resize"), void 0 !== e.slides && 0 !== e.slides.eq(e.currentSlide).find("iframe").length ? (Number(fusionFlexSliderVars.pagination_video_slide) ? jQuery(e).find(".flex-control-nav").css("bottom", "-20px") : jQuery(e).find(".flex-control-nav").hide(), Number(fusionFlexSliderVars.status_yt) && !0 === window.yt_vid_exists && window.YTReady(function() { new YT.Player(e.slides.eq(e.currentSlide).find("iframe").attr("id"), { events: { onStateChange: onPlayerStateChange(e.slides.eq(e.currentSlide).find("iframe").attr("id"), e) } }) })) : Number(fusionFlexSliderVars.pagination_video_slide) ? jQuery(e).find(".flex-control-nav").css("bottom", "0") : jQuery(e).find(".flex-control-nav").show(), jQuery.isFunction(jQuery.fn.initElementAnimations) && jQuery(window).initElementAnimations() }, before: function(e) { 0 !== e.slides.eq(e.currentSlide).find("iframe").length && (Number(fusionFlexSliderVars.status_vimeo) && -1 !== e.slides.eq(e.currentSlide).find("iframe")[0].src.indexOf("vimeo") && (void 0 !== window.fusionVimeoPlayers[e.slides.eq(e.currentSlide).find("iframe")[0].getAttribute("id")] ? window.fusionVimeoPlayers[e.slides.eq(e.currentSlide).find("iframe")[0].getAttribute("id")].pause() : new Vimeo.Player(e.slides.eq(e.currentSlide).find("iframe")[0]).pause()), Number(fusionFlexSliderVars.status_yt) && !0 === window.yt_vid_exists && window.YTReady(function() { new YT.Player(e.slides.eq(e.currentSlide).find("iframe").attr("id"), { events: { onStateChange: onPlayerStateChange(e.slides.eq(e.currentSlide).find("iframe").attr("id"), e) } }) }), playVideoAndPauseOthers(e)) }, after: function(e) { 0 !== e.slides.eq(e.currentSlide).find("iframe").length ? (Number(fusionFlexSliderVars.pagination_video_slide) ? jQuery(e).find(".flex-control-nav").css("bottom", "-20px") : jQuery(e).find(".flex-control-nav").hide(), Number(fusionFlexSliderVars.status_yt) && !0 === window.yt_vid_exists && window.YTReady(function() { new YT.Player(e.slides.eq(e.currentSlide).find("iframe").attr("id"), { events: { onStateChange: onPlayerStateChange(e.slides.eq(e.currentSlide).find("iframe").attr("id"), e) } }) })) : Number(fusionFlexSliderVars.pagination_video_slide) ? jQuery(e).find(".flex-control-nav").css("bottom", "0") : jQuery(e).find(".flex-control-nav").show(), jQuery('[data-spy="scroll"]').each(function() { jQuery(this).scrollspy("refresh") }) } }), e = "false" !== fusionFlexSliderVars.flex_smoothHeight)
    })
}

function fusionDestroyPostFlexSlider() { jQuery(".fusion-flexslider").not(".woocommerce .images #slider").flexslider("destroy") }
jQuery(window).on("load", function() {
    var e, i = "false" !== fusionFlexSliderVars.flex_smoothHeight;
    window.fusionVimeoPlayers = [], jQuery().flexslider && (Number(fusionFlexSliderVars.status_vimeo) && jQuery(".flexslider").find("iframe").each(function() {
        var i = jQuery(this).attr("id"),
            s = jQuery(this).attr("src");
        i && -1 !== s.indexOf("vimeo") && (window.fusionVimeoPlayers[i] = new Vimeo.Player(i), e = jQuery("#" + i).parents("li"), window.fusionVimeoPlayers[i].on("play", function() { jQuery("#" + i).parents("li").parent().parent().flexslider("pause") }), window.fusionVimeoPlayers[i].on("pause", function() { jQuery(e).attr("data-vimeo-paused", "true"), "yes" === jQuery(e).attr("data-loop") ? jQuery("#" + i).parents("li").parent().parent().flexslider("pause") : jQuery("#" + i).parents("li").parent().parent().flexslider("play") }), window.fusionVimeoPlayers[i].on("ended", function() { "yes" !== jQuery(e).attr("data-loop") && "true" !== jQuery(e).attr("data-vimeo-paused") && jQuery("#" + i).parents("li").parent().parent().flexslider("next"), "true" === jQuery(e).attr("data-vimeo-paused", "true") && jQuery(e).attr("data-vimeo-paused", "false") }))
    }), fusionInitPostFlexSlider(), 1 <= jQuery(".flexslider-attachments").length && jQuery.each(jQuery(".flexslider-attachments"), function() { void 0 !== jQuery(this).data("flexslider") && jQuery(this).flexslider("destroy"), jQuery(this).flexslider({ slideshow: Boolean(Number(fusionFlexSliderVars.slideshow_autoplay)), slideshowSpeed: fusionFlexSliderVars.slideshow_speed, video: !1, smoothHeight: i, pauseOnHover: !1, useCSS: !1, prevText: "&#xf104;", nextText: "&#xf105;", controlNav: "thumbnails", start: function(e) { jQuery(e).find(".fusion-slider-loading").remove(), e.removeClass("fusion-flexslider-loading") } }), i && jQuery(this).find(".flex-control-nav").css("position", "absolute") }))
}), jQuery(window).on("fusion-element-render-fusion_recent_posts fusion-element-render-fusion_postslider", function(e, i) {
    (void 0 !== i ? jQuery('div[data-cid="' + i + '"]') : jQuery(document)).find(".fusion-flexslider").not(".woocommerce .images #slider").flexslider()
}), jQuery(window).on("fusion-element-render-fusion_slider", function(e, i) {
    var s = (void 0 !== i ? jQuery('div[data-cid="' + i + '"]') : jQuery(document)).find(".flexslider:not(.tfs-slider)");
    void 0 !== s && s.flexslider()
}), jQuery(window).on("fusion-element-render-fusion_slide", function(e, i) {
    var s = jQuery('li[data-cid="' + i + '"]');
    0 < s.length && void 0 !== s.data("parent-cid") && (void 0 !== s.closest(".flexslider:not(.tfs-slider)").data("flexslider") && jQuery(s.closest(".flexslider:not(.tfs-slider)")).flexslider("destroy"), jQuery(window).trigger("fusion-element-render-fusion_slider", s.data("parent-cid")))
}), jQuery(window).on("fusion-element-render-fusion_post_cards", function(e, i) { fusionInitPostFlexSlider() }), window.addEventListener("fusion-reinit-single-post-slideshow", function() { fusionInitPostFlexSlider() });
var fusionContainerVars = { "content_break_point": "800", "container_hundred_percent_height_mobile": "0", "is_sticky_header_transparent": "0", "hundred_percent_scroll_sensitivity": "450" };

function fusionInitStickyContainers() { "function" == typeof jQuery.fn.stick_in_parent && jQuery(".fusion-sticky-container").each(function() { fusionInitSticky(jQuery(this)) }) }

function fusionInitSticky(e) {
    var t = void 0 === e.attr("data-transition-offset") ? 0 : parseFloat(e.attr("data-transition-offset")),
        i = void 0 === e.attr("data-sticky-offset") ? 0 : e.attr("data-sticky-offset"),
        n = void 0 !== e.attr("data-scroll-offset") && parseFloat(e.attr("data-scroll-offset")),
        o = { sticky_class: "fusion-container-stuck", bottoming: !0, offset_top: i, transition_offset: t, clone: !1 },
        s = "data-sticky-medium-visibility";
    jQuery("body").hasClass("fusion-disable-sticky") || jQuery("body").hasClass("fusion-builder-ui-wireframe") ? e.data("sticky_kit") && e.trigger("sticky_kit:detach") : "object" != typeof fusion || "function" != typeof fusion.isLarge || (fusion.isLarge() ? s = "data-sticky-large-visibility" : fusion.isSmall() && (s = "data-sticky-small-visibility"), void 0 !== e.attr(s) && e.attr(s)) ? e.data("sticky_kit") || (n && (o.scroll_transition = n), e.closest(".fusion-tb-header").length || e.closest(".fusion-tb-page-title-bar").length ? (o.parent = "#wrapper", o.bottoming = !1) : e.closest(".fusion-content-tb").length ? o.parent = ".fusion-content-tb" : e.closest(".fusion-builder-live-editor").length ? o.parent = "#fusion_builder_container" : e.parent().parent(".post-content").length ? o.parent = ".post-content" : e.hasClass("awb-sticky-content") && (o.parent = "#wrapper"), "string" == typeof e.attr("data-sticky-parent") && (o.parent = e.attr("data-sticky-parent")), "string" == typeof e.attr("data-sticky-bottoming") && (o.bottoming = e.attr("data-sticky-bottoming")), jQuery("body").hasClass("fusion-builder-live") || void 0 === e.attr("data-sticky-height-transition") || (o.clone = !0), e.stick_in_parent(o)) : e.data("sticky_kit") && e.trigger("sticky_kit:detach")
}

function fusionGetStickyOffset() {
    var e = 0,
        t = jQuery(".fusion-container-stuck:not( .side-header-wrapper )");
    return t.length ? (t.each(function() {
        var t = jQuery(this),
            i = t.position().top + t.outerHeight(!0);
        t.parent("#side-header").length || i > e && (e = i)
    }), e) : e
}

function initScrollingSections() {
    var e, t, i = jQuery("#content").find(".fusion-scroll-section"),
        n = (Number(fusionContainerVars.is_sticky_header_transparent) || "function" != typeof getStickyHeaderHeight ? 0 : getStickyHeaderHeight(!0)) + fusion.getAdminbarHeight();
    window.lastYPosition = 0, window.scrollDisabled = !1, i.length && (jQuery("#content").find(".non-hundred-percent-height-scrolling").length || 1 !== i.length || jQuery.trim(jQuery("#sliders-container").html()) || (i.addClass("active"), i.find(".fusion-scroll-section-nav li:first a").addClass("active"), e = !0), i.each(function() { 1 < jQuery(this).children("div").length && (t = n ? "calc(" + (100 * jQuery(this).children("div").length + 50) + "vh - " + n + "px)" : 100 * jQuery(this).children("div").length + 50 + "vh", jQuery(this).css("height", t), n && (jQuery(this).find(".hundred-percent-height-scrolling").css("height", "calc(100vh - " + n + "px)"), jQuery(this).find(".fusion-scroll-section-nav").css("top", "calc(50% + " + n / 2 + "px)"))) }), window.lastYPosition = jQuery(window).scrollTop(), jQuery(window).on("scroll", function() {
        var t = jQuery(window).scrollTop(),
            i = window.lastYPosition;
        window.scrollDisabled || jQuery(".fusion-scroll-section").each(function() { 1 < jQuery(this).children("div").length && !jQuery(this).hasClass("fusion-scroll-section-mobile-disabled") && jQuery(this).fusionPositionScrollSectionElements(t, e, i) })
    }), jQuery(".fusion-scroll-section-link").on("click", function(e) {
        var t = jQuery(this).parents(".fusion-scroll-section"),
            i = getScrollSectionPositionValues(t),
            n = t.find(".fusion-scroll-section-element"),
            o = n.length,
            s = parseInt(jQuery(this).parents(".fusion-scroll-section-nav").find(".fusion-scroll-section-link.active").data("element"), 10),
            r = parseInt(jQuery(this).data("element"), 10),
            c = Math.abs(r - s);
        e.preventDefault(), 0 < c && (t.data("clicked", r), "fixed" !== n.last().css("position") && n.css({ position: "fixed", top: i.sectionTopOffset, left: i.sectionLeftOffset, padding: "0", width: i.sectionWidth }), 1 === r ? jQuery(window).scrollTop(i.sectionTop + 1) : o === r ? jQuery(window).scrollTop(i.sectionBottom - i.viewportHeight - 1) : r > s ? jQuery(window).scrollTop(i.sectionTop + i.viewportHeight * r - 1) : jQuery(window).scrollTop(i.sectionTop + i.viewportHeight * (r - 1) + 1))
    })), jQuery(".hundred-percent-height").length && (setCorrectResizeValuesForScrollSections(), jQuery(window).on("resize", function() { setCorrectResizeValuesForScrollSections() }))
}

function setCorrectResizeValuesForScrollSections() {
    var e = jQuery("#content").find(".fusion-scroll-section"),
        t = 0,
        i = 0,
        n = fusion.getAdminbarHeight();
    e.length && (jQuery(".fusion-scroll-section.active").find(".fusion-scroll-section-element").css({ left: jQuery("#content").offset().left }), jQuery(".fusion-scroll-section").find(".fusion-scroll-section-element").css({ width: jQuery("#content").width() }), 0 == fusionContainerVars.container_hundred_percent_height_mobile && (Modernizr.mq("only screen and (max-width: " + fusionContainerVars.content_break_point + "px)") ? (jQuery(".fusion-scroll-section").removeClass("active").addClass("fusion-scroll-section-mobile-disabled"), jQuery(".fusion-scroll-section").attr("style", ""), jQuery(".fusion-scroll-section").find(".fusion-scroll-section-element").attr("style", ""), jQuery(".fusion-scroll-section").find(".hundred-percent-height-scrolling").css("height", "auto"), jQuery(".fusion-scroll-section").find(".fusion-fullwidth-center-content").css("height", "auto")) : jQuery(".fusion-scroll-section").hasClass("fusion-scroll-section-mobile-disabled") && (jQuery(".fusion-scroll-section").find(".fusion-fullwidth-center-content").css("height", ""), Number(fusionContainerVars.is_sticky_header_transparent) || "function" != typeof getStickyHeaderHeight || (t = getStickyHeaderHeight(!0)), i = t + n, e.each(function() { 1 < jQuery(this).children("div").length && (jQuery(this).css("height", 100 * jQuery(this).children("div").length + 50 + "vh"), jQuery(this).find(".hundred-percent-height-scrolling").css("height", "calc(100vh - " + i + "px)")) }), scrollToCurrentScrollSection()))), jQuery(".hundred-percent-height.non-hundred-percent-height-scrolling").length && (Number(fusionContainerVars.is_sticky_header_transparent) || "function" != typeof getStickyHeaderHeight || (t = getStickyHeaderHeight(!0)), i = t + n, 0 == fusionContainerVars.container_hundred_percent_height_mobile && (Modernizr.mq("only screen and (max-width: " + fusionContainerVars.content_break_point + "px)") ? (jQuery(".hundred-percent-height.non-hundred-percent-height-scrolling").css("height", "auto"), jQuery(".hundred-percent-height.non-hundred-percent-height-scrolling").find(".fusion-fullwidth-center-content").css("height", "auto")) : (jQuery(".hundred-percent-height.non-hundred-percent-height-scrolling").css("height", "calc(100vh - " + i + "px)"), jQuery(".hundred-percent-height.non-hundred-percent-height-scrolling").find(".fusion-fullwidth-center-content").css("height", ""))))
}

function scrollToCurrentScrollSection() {
    var e = Math.ceil(jQuery(window).scrollTop()),
        t = jQuery(window).height(),
        i = Math.floor(e + t),
        n = Number(fusionContainerVars.is_sticky_header_transparent) || "function" != typeof getStickyHeaderHeight ? 0 : getStickyHeaderHeight(!0),
        o = fusion.getAdminbarHeight();
    e += n + o, jQuery(".fusion-page-load-link").hasClass("fusion-page.load-scroll-section-link") || jQuery(".fusion-scroll-section").each(function() {
        var t = jQuery(this),
            n = Math.ceil(t.offset().top),
            o = Math.ceil(t.outerHeight()),
            s = Math.floor(n + o),
            r = jQuery("html").hasClass("ua-edge") ? "body" : "html";
        n <= e && s >= i ? (t.addClass("active"), jQuery(r).animate({ scrollTop: n - 50 }, { duration: 50, easing: "easeInExpo", complete: function() { jQuery(r).animate({ scrollTop: n }, { duration: 50, easing: "easeOutExpo", complete: function() { Modernizr.mq("only screen and (max-width: " + fusionContainerVars.content_break_point + "px)") || jQuery(".fusion-scroll-section").removeClass("fusion-scroll-section-mobile-disabled") } }) } })) : Modernizr.mq("only screen and (max-width: " + fusionContainerVars.content_break_point + "px)") || jQuery(".fusion-scroll-section").removeClass("fusion-scroll-section-mobile-disabled")
    })
}

function getScrollSectionPositionValues(e) { var t = {}; return t.sectionTop = Math.ceil(e.offset().top), t.sectionHeight = Math.ceil(e.outerHeight()), t.sectionBottom = Math.floor(t.sectionTop + t.sectionHeight), t.viewportTop = Math.ceil(jQuery(window).scrollTop()), t.viewportHeight = jQuery(window).height(), t.viewportBottom = Math.floor(t.viewportTop + t.viewportHeight), t.sectionWidth = jQuery("#content").width(), t.sectionTopOffset = fusion.getAdminbarHeight(), t.sectionLeftOffset = jQuery("#content").offset().left, t.sectionTopOffset += Number(fusionContainerVars.is_sticky_header_transparent) || "function" != typeof getStickyHeaderHeight ? 0 : getStickyHeaderHeight(!0), t.viewportTop += t.sectionTopOffset, t }
jQuery(window).on("load fusion-element-render-fusion_builder_container resize", function(e, t) {
        var i = void 0 !== t ? jQuery('div[data-cid="' + t + '"]').find(".fullwidth-faded") : jQuery(".fullwidth-faded"),
            n = void 0 !== t ? jQuery('div[data-cid="' + t + '"]').find(".hundred-percent-height") : jQuery(".hundred-percent-height"),
            o = Number(fusionContainerVars.is_sticky_header_transparent) || "function" != typeof getStickyHeaderHeight ? 0 : getStickyHeaderHeight(!0),
            s = fusion.getAdminbarHeight(),
            r = jQuery("body").hasClass("fusion-builder-live") && !jQuery("body").hasClass("fusion-builder-preview-mode"),
            c = o + s;
        i.fusionScroller({ type: "fading_blur" }), n.css("min-height", "").css("height", ""), n.find(".fusion-fullwidth-center-content").css("min-height", ""), 0 == fusionContainerVars.container_hundred_percent_height_mobile && Modernizr.mq("only screen and (max-width: " + fusionContainerVars.content_break_point + "px)") ? (n.css("height", "auto"), r && (n.css("min-height", "0"), n.find(".fusion-fullwidth-center-content").css("min-height", "0"))) : (n.css("height", "calc(100vh - " + c + "px)"), r && (n.css("min-height", "calc(100vh - " + c + "px)"), n.find(".fusion-fullwidth-center-content").css("min-height", "calc(100vh - " + c + "px)")))
    }), jQuery(document).ready(function() {
        initScrollingSections(), fusionInitStickyContainers(), Modernizr.mq("only screen and (max-width: " + fusionContainerVars.content_break_point + "px)") && jQuery(".fullwidth-faded").each(function() {
            var e = jQuery(this).css("background-image"),
                t = jQuery(this).css("background-color");
            jQuery(this).parent().css("background-image", e), jQuery(this).parent().css("background-color", t), jQuery(this).remove()
        })
    }), jQuery(window).on("load", function() { jQuery("#content").find(".fusion-scroll-section").length && "#" === jQuery(".fusion-page-load-link").attr("href") && setTimeout(function() { scrollToCurrentScrollSection() }, 400) }), jQuery(window).on("fusion-reinit-sticky", function(e, t) {
        var i = void 0 !== t && jQuery('div[data-cid="' + t + '"] .fusion-fullwidth');
        i && i.length && (i.trigger("sticky_kit:detach"), fusionInitSticky(i))
    }), jQuery(window).on("fusion-sticky-header-reinit fusion-resize-horizontal fusion-wireframe-toggle", function() { fusionInitStickyContainers() }),
    function(e) {
        "use strict";
        var t = "down";

        function i() {
            var e = window.pageYOffset || document.documentElement.scrollTop,
                t = window.pageXOffset || document.documentElement.scrollLeft;
            window.onscroll = function() { window.scrollTo(t, e) }, window.scrollDisabled = !0
        }

        function n() { window.onscroll = function() {}, window.scrollDisabled = !1 }
        e.fn.fusionPositionScrollSectionElements = function(o, s, r) {
            var c = e(this),
                l = c.find(".fusion-scroll-section-element").length,
                a = 0,
                d = getScrollSectionPositionValues(c);
            (s = s || !1) || (d.sectionTop <= d.viewportTop && d.sectionBottom >= d.viewportBottom ? c.addClass("active") : c.removeClass("active")), r < o ? (c.data("clicked") ? (a = c.data("clicked"), c.removeData("clicked"), c.removeAttr("data-clicked")) : a = (a = c.find(".fusion-scroll-section-element.active")).length ? (a = a.data("element") + 1) > l ? l : a : 1, d.sectionTop <= d.viewportTop && d.sectionTop + d.viewportHeight > d.viewportTop ? (c.find(".fusion-scroll-section-element").removeClass("active"), c.children(":nth-child(1)").addClass("active"), c.find(".fusion-scroll-section-nav a").removeClass("active"), c.find('.fusion-scroll-section-nav a[data-element="' + c.children(":nth-child(1)").data("element") + '"] ').addClass("active"), c.find(".fusion-scroll-section-element").css({ position: "fixed", top: d.sectionTopOffset, left: d.sectionLeftOffset, padding: "0", width: d.sectionWidth }), c.children(":nth-child(1)").css("display", "block"), window.scrollDisabled = !0, e(window).scrollTop(d.sectionTop + d.viewportHeight - 1), i(), setTimeout(function() { n() }, fusionContainerVars.hundred_percent_scroll_sensitivity)) : d.sectionBottom <= d.viewportBottom && "absolute" !== c.find(".fusion-scroll-section-element").last().css("position") ? (c.find(".fusion-scroll-section-element").removeClass("active"), c.find(".fusion-scroll-section-element").last().addClass("active"), c.find(".fusion-scroll-section-element").css("position", "absolute"), c.find(".fusion-scroll-section-element").last().css({ top: "auto", left: "0", bottom: "0", padding: "" }), c.find(".fusion-scroll-section-nav a").removeClass("active"), c.find(".fusion-scroll-section-nav a").last().addClass("active")) : 1 < a && "fixed" === c.find(".fusion-scroll-section-element").last().css("position") && (!c.children(":nth-child(" + a + ")").hasClass("active") || "up" === t) && (c.find(".fusion-scroll-section-element").removeClass("active"), c.children(":nth-child(" + a + ")").addClass("active"), c.find(".fusion-scroll-section-nav a").removeClass("active"), c.find('.fusion-scroll-section-nav a[data-element="' + c.children(":nth-child(" + a + ")").data("element") + '"] ').addClass("active"), window.scrollDisabled = !0, a < l ? e(window).scrollTop(d.sectionTop + d.viewportHeight * a - 1) : e(window).scrollTop(d.sectionBottom - d.viewportHeight), i(), setTimeout(function() { n() }, fusionContainerVars.hundred_percent_scroll_sensitivity)), t = "down") : r > o && (c.data("clicked") ? (a = c.data("clicked"), c.removeData("clicked"), c.removeAttr("data-clicked")) : a = (a = c.find(".fusion-scroll-section-element.active")).length ? 1 > (a = a.data("element") - 1) ? 1 : a : 0, d.sectionBottom >= d.viewportBottom && "absolute" === c.find(".fusion-scroll-section-element").last().css("position") ? (c.find(".fusion-scroll-section-element").removeClass("active"), c.find(".fusion-scroll-section-element").last().addClass("active"), c.find(".fusion-scroll-section-nav a").removeClass("active"), c.find('.fusion-scroll-section-nav a[data-element="' + c.find(".fusion-scroll-section-element").last().data("element") + '"] ').addClass("active"), c.find(".fusion-scroll-section-element").css({ position: "fixed", top: d.sectionTopOffset, left: d.sectionLeftOffset, padding: "0", width: d.sectionWidth }), c.find(".fusion-scroll-section-element").last().css("display", "block"), window.scrollDisabled = !0, e(window).scrollTop(d.sectionTop + d.viewportHeight * (l - 1)), i(), setTimeout(function() { n() }, fusionContainerVars.hundred_percent_scroll_sensitivity)) : (d.sectionTop >= d.viewportTop || 0 === e(window).scrollTop() && c.find(".fusion-scroll-section-element").first().hasClass("active")) && "" !== c.find(".fusion-scroll-section-element").first().css("position") ? (c.find(".fusion-scroll-section-element").removeClass("active"), c.find(".fusion-scroll-section-element").first().addClass("active"), c.find(".fusion-scroll-section-element").css("position", ""), c.find(".fusion-scroll-section-element").first().css("padding", ""), c.find(".fusion-scroll-section-nav a").removeClass("active"), c.find(".fusion-scroll-section-nav a").first().addClass("active")) : 0 < a && "fixed" === c.find(".fusion-scroll-section-element").last().css("position") && (!c.children(":nth-child(" + a + ")").hasClass("active") || "down" === t) && (c.find(".fusion-scroll-section-element").removeClass("active"), c.children(":nth-child(" + a + ")").addClass("active"), c.find(".fusion-scroll-section-nav a").removeClass("active"), c.find('.fusion-scroll-section-nav a[data-element="' + c.children(":nth-child(" + a + ")").data("element") + '"] ').addClass("active"), window.scrollDisabled = !0, e(window).scrollTop(d.sectionTop + d.viewportHeight * (a - 1)), i(), setTimeout(function() { n() }, fusionContainerVars.hundred_percent_scroll_sensitivity)), t = "up"), window.lastYPosition = e(window).scrollTop()
        }
    }(jQuery);
var fusionAnimationsVars = { "status_css_animations": "desktop" };

function fusionSetAnimationData(n) { "off" === fusionAnimationsVars.status_css_animations || cssua.ua.mobile && "desktop_and_mobile" !== fusionAnimationsVars.status_css_animations ? jQuery("body").addClass("dont-animate").removeClass("do-animate") : (jQuery("body").addClass("do-animate").removeClass("dont-animate"), void 0 !== n && void 0 !== n.data.custom && jQuery(window).initElementAnimations()) }! function(n) {
    "use strict";
    window.awbAnimationObservers = {}, n.fn.initElementAnimations = function() {
        n.each(window.awbAnimationObservers, function(i, t) { n.each(t[0], function(n, i) { t[1].unobserve(i) }), delete window.awbAnimationObservers[i] }), n.each(fusion.getObserverSegmentation(n(".fusion-animated")), function(i) {
            var t = fusion.getAnimationIntersectionData(i),
                e = new IntersectionObserver(function(i, o) {
                    n.each(i, function(i, o) {
                        var a, s, u, r, d = n(o.target);
                        o.isIntersecting && (r = !0, 0 !== t.threshold && (n(window).height() < d.outerHeight() ? n(window).height() / d.outerHeight() > o.intersectionRatio && (r = !1) : 1 > o.intersectionRatio && (r = !1)), r && (d.parents(".fusion-delayed-animation").length || (d.css("visibility", "visible"), a = d.data("animationtype"), s = d.data("animationduration"), d.addClass(a), s && (d.css("animation-duration", s + "s"), u = d, setTimeout(function() { u.removeClass(a) }, 1e3 * s))), e.unobserve(o.target)))
                    })
                }, t);
            n(this).each(function() { e.observe(this) }), window.awbAnimationObservers[i] = [this, e]
        })
    }
}(jQuery), jQuery(document).ready(function() { fusionSetAnimationData() }), jQuery(window).on("load", function() { jQuery("body").hasClass("fusion-builder-live") || setTimeout(function() { jQuery(window).initElementAnimations() }, 300) }), jQuery(window).on("CSSAnimations", { custom: !0 }, fusionSetAnimationData);
var avadaPrivacyVars = { "name": "privacy_embeds", "days": "30", "path": "\/", "types": ["gmaps"], "defaults": [], "button": "0" };

function fusionGetCookieValue() { var e = fusionGetConsentValues("undefined" != typeof avadaPrivacyVars ? avadaPrivacyVars.name : ""); return "object" != typeof e && (e = []), e }

function fusionGetConsent(e) {
    var a = fusionGetConsentValues("undefined" != typeof avadaPrivacyVars ? avadaPrivacyVars.name : ""),
        i = "undefined" != typeof avadaPrivacyVars ? avadaPrivacyVars.types : [];
    return "undefined" == typeof avadaPrivacyVars || (-1 === jQuery.inArray(e, i) || ("object" != typeof a && (a = []), -1 !== jQuery.inArray(e, a)))
}

function fusionReplacePlaceholder(e) {
    var a, i, n;
    e.is("iframe") || e.is("img") ? (e.attr("src", e.attr("data-privacy-src")), e.removeClass("fusion-hidden"), "gmaps" === e.attr("data-privacy-type") && e.parents(".fusion-maps-static-type").removeClass("fusion-hidden")) : e.attr("data-privacy-video") && e.is("noscript") ? (e.after(e.text()), e.remove(), "undefined" != typeof wp && void 0 !== wp.mediaelement && wp.mediaelement.initialize()) : e.attr("data-privacy-script") && (e.is("span") || e.is("noscript")) && (a = document.createElement("script"), i = void 0 !== e.attr("data-privacy-src") && e.attr("data-privacy-src"), n = "" !== e.text() && e.text(), i && (a.src = i), n && (a.innerHTML = n.replace(/data-privacy-src=/g, "src=")), n && -1 !== n.indexOf("google.maps") || i && -1 !== i.indexOf("infobox_packed") ? fusionMapInsert(a) : document.body.appendChild(a), e.remove())
}

function fusionGetConsentValues(e) { var a = ("; " + decodeURIComponent(document.cookie)).split("; " + e + "="); return 2 === a.length && a.pop().split(";").shift().split(",") }

function fusionMapInsert(e) {
    if ("undefined" != typeof google && (!jQuery('[src*="infobox_packed"], [data-privacy-src*="infobox_packed"]').length || "undefined" != typeof InfoBox)) return document.body.appendChild(e), void jQuery(".fusion-google-map").each(function() { jQuery(this).removeClass("fusion-hidden"), "function" == typeof window["fusion_run_map_" + jQuery(this).attr("id")] && window["fusion_run_map_" + jQuery(this).attr("id")]() });
    setTimeout(function() { fusionMapInsert(e) }, 1e3)
}

function fusionSaveCookieValues(e, a) {
    var i, n = "undefined" != typeof avadaPrivacyVars ? avadaPrivacyVars.name : "",
        r = fusionGetCookieValue(),
        t = "undefined" != typeof avadaPrivacyVars ? avadaPrivacyVars.path : "/",
        o = "undefined" != typeof avadaPrivacyVars ? avadaPrivacyVars.days : "30",
        u = new Date;
    a ? r.push(e) : r = e, u.setTime(u.getTime() + 24 * o * 60 * 60 * 1e3), i = "expires=" + u.toUTCString(), document.cookie = n + "=" + r.join(",") + ";" + i + ";path=" + t
}

function fusionSliderVideoInit(e, a, i) {
    return (e || a) && jQuery(".tfs-slider").each(function() {
        var n;
        (e && jQuery(this).find('[data-privacy-type="vimeo"]').length || a && jQuery(this).find('[data-privacy-type="youtube"]').length) && void 0 !== (n = jQuery(this).data("flexslider")) && (n.resize(), !i && a && "function" == typeof registerYoutubePlayers && jQuery(this).find('[data-privacy-type="youtube"]').length && (registerYoutubePlayers(!0), loadYoutubeIframeAPI(), i = !0), "function" != typeof playVideoAndPauseOthers || a && "function" == typeof registerYoutubePlayers && jQuery(this).find('[data-privacy-type="youtube"]').length || playVideoAndPauseOthers(n))
    }), i
}

function fusionVideoApiInit(e, a, i) { e && "function" == typeof fusionInitVimeoPlayers && fusionInitVimeoPlayers(), a && "function" == typeof onYouTubeIframeAPIReady && !i && (registerYoutubePlayers(), loadYoutubeIframeAPI()) }

function fusionPrivacyBar() {
    var e = fusionGetCookieValue(),
        a = [],
        i = jQuery(".fusion-privacy-bar-acceptance"),
        n = i.data("alt-text"),
        r = i.data("orig-text");
    jQuery.each(e, function(e, a) { jQuery('[data-privacy-type="' + a + '"]').each(function() { fusionReplacePlaceholder(jQuery(this)) }), jQuery(".fusion-privacy-element #" + a + ", #bar-" + a).prop("checked", !0), jQuery('.fusion-privacy-placeholder[data-privacy-type="' + a + '"]').remove() }), jQuery(".fusion-privacy-placeholder").each(function() {
        var e, a = jQuery(this),
            i = a.parent(),
            n = a.prev(),
            r = a.outerWidth(),
            t = a.outerHeight();
        i.width(), i.height();
        n.is("iframe") && !i.hasClass("fusion-background-video-wrapper") && (e = -1 !== a.css("width").indexOf("%") ? t + "px" : t / r * 100 + "%", a.wrap('<div class="fluid-width-video-wrapper" style="padding-top:' + e + '" />'), a.parent().append(n))
    }), jQuery(".fusion-privacy-consent").on("click", function(e) {
        var a = jQuery(this).attr("data-privacy-type"),
            i = fusionGetCookieValue(),
            n = "vimeo" === a,
            r = "youtube" === a,
            t = !1; - 1 === jQuery.inArray(a, i) && fusionSaveCookieValues(a, !0), e.preventDefault(), jQuery('[data-privacy-type="' + a + '"]').each(function() { fusionReplacePlaceholder(jQuery(this)) }), jQuery(".fusion-privacy-element #" + a + ", #bar-" + a).prop("checked", !0), fusionVideoApiInit(n, r, t = fusionSliderVideoInit(n, r, t)), jQuery('.fusion-privacy-placeholder[data-privacy-type="' + a + '"]').remove()
    }), -1 === jQuery.inArray("consent", e) && jQuery(".fusion-privacy-bar").css({ display: "block" }), jQuery(".fusion-privacy-bar-learn-more").on("click", function(e) {
        var a = jQuery(this).parents(".fusion-privacy-bar");
        e.preventDefault(), a.find(".fusion-privacy-bar-full").slideToggle(300), a.toggleClass("fusion-privacy-bar-open"), setTimeout(function() { a.hasClass("fusion-privacy-bar-open") && a.outerHeight() >= jQuery(window).height() ? a.limitScrollToContainer() : a.off("mousewheel DOMMouseScroll touchmove") }, 300), jQuery(this).find(".awb-icon-angle-up").length ? jQuery(this).find(".awb-icon-angle-up").removeClass("awb-icon-angle-up").addClass("awb-icon-angle-down") : jQuery(this).find(".awb-icon-angle-down").length && jQuery(this).find(".awb-icon-angle-down").removeClass("awb-icon-angle-down").addClass("awb-icon-angle-up")
    }), jQuery(".fusion-privacy-bar-acceptance").on("click", function(e) {
        var a = jQuery(this).parents(".fusion-privacy-bar"),
            n = a.find('input[type="checkbox"]'),
            r = ["consent"],
            t = !1,
            o = !1,
            u = !1,
            s = "undefined" != typeof avadaPrivacyVars && 1 == avadaPrivacyVars.button,
            c = "undefined" != typeof avadaPrivacyVars ? avadaPrivacyVars.defaults : [];
        e.preventDefault(), a.find(".fusion-privacy-bar-full").is(":visible") || i.hasClass("fusion-privacy-update") || s ? (jQuery('.fusion-privacy-element input[type="checkbox"]').prop("checked", !1), n.length ? jQuery(n).each(function() {
            var e = jQuery(this).val();
            jQuery(this).is(":checked") && -1 !== jQuery(this).attr("name").indexOf("consents") && (jQuery('[data-privacy-type="' + e + '"]').each(function() { fusionReplacePlaceholder(jQuery(this)) }), jQuery(".fusion-privacy-element #" + e).prop("checked", !0), jQuery('.fusion-privacy-placeholder[data-privacy-type="' + e + '"]').remove(), r.push(e), "youtube" === e && (t = !0), "vimeo" === e && (o = !0))
        }) : s && c.length && jQuery.each(c, function(e, a) { jQuery('[data-privacy-type="' + a + '"]').each(function() { fusionReplacePlaceholder(jQuery(this)) }), jQuery(".fusion-privacy-element #" + a).prop("checked", !0), jQuery('.fusion-privacy-placeholder[data-privacy-type="' + a + '"]').remove(), r.push(a), "youtube" === a && (t = !0), "vimeo" === a && (o = !0) }), fusionSaveCookieValues(r, !1)) : fusionSaveCookieValues("consent", !0), u = fusionSliderVideoInit(o, t, u), fusionVideoApiInit(o, t, u), a.hide()
    }), jQuery('.fusion-privacy-bar-full .fusion-privacy-choices input[type="checkbox"]').on("change", function(e) { var t = jQuery(this).val(); - 1 === jQuery.inArray(t, a) ? a.push(t) : a.splice(a.indexOf(t), 1), 0 !== a.length ? (i.text(n), i.addClass("fusion-privacy-update")) : (i.text(r), i.removeClass("fusion-privacy-update")) })
}
jQuery(document).ready(function() { fusionPrivacyBar() });
var avadaSelectVars = { "avada_drop_down": "1" };

function addAvadaSelectStyles() {
    Number(avadaSelectVars.avada_drop_down) && (jQuery(".tribe-tickets-order_status-row select").length && (jQuery(".tribe-tickets-order_status-row select").addClass("avada-select"), jQuery(".tribe-tickets-order_status-row select").wrap('<div class="avada-select-parent"></div>').after('<div class="select-arrow">&#xe61f;</div>'), jQuery(".tribe-ticket-quantity").on("change", function() { setTimeout(function() { calcSelectArrowDimensions() }, 1) })), jQuery(".tribe-block__tickets__item__attendee__fields__form select").length && jQuery(".tribe-block__tickets__item__attendee__fields__form select").wrap('<div class="avada-select-parent"></div>').after('<div class="select-arrow">&#xe61f;</div>'), jQuery(".woocommerce-billing-fields, .woocommerce-shipping-fields").addClass("avada-select"), jQuery(".woocommerce.widget_product_categories select").length && jQuery(".woocommerce.widget_product_categories select").wrap('<p class="avada-select-parent"></p>').after('<div class="select-arrow">&#xe61f;</div>'), jQuery(".cart-collaterals select#calc_shipping_country, .widget_layered_nav select").wrap('<p class="avada-select-parent"></p>').after('<div class="select-arrow">&#xe61f;</div>'), jQuery(".cart-collaterals select#calc_shipping_state").after('<div class="select-arrow">&#xe61f;</div>'), setTimeout(function() {
        jQuery("#billing_country_field .chosen-container").length || jQuery("#billing_country_field .select2-container").length || (jQuery("#billing_country_field select.country_select").wrap('<p class="avada-select-parent"></p>').after('<span class="select-arrow">&#xe61f;</span>'), !jQuery("#billing_state_field select.state_select").length || jQuery("#billing_state_field .chosen-container").length || jQuery("#billing_state_field .select2-container").length || jQuery("#billing_state_field").addClass("avada-select-parent").append('<div class="select-arrow">&#xe61f;</div>'), jQuery("#billing_country").on("change", function() {
            setTimeout(function() {
                (jQuery("#billing_state_field input#billing_state").length || jQuery("#billing_state_field").is(":hidden")) && (jQuery("#billing_state_field .select-arrow").remove(), jQuery("#billing_state_field").removeClass("avada-select-parent")), jQuery("#billing_state_field select.state_select").length && (jQuery("#billing_state_field").addClass("avada-select-parent"), jQuery("#billing_state_field .select-arrow").length || (jQuery("#billing_state_field").append('<div class="select-arrow">&#xe61f;</div>'), calcSelectArrowDimensions()))
            }, 1)
        })), jQuery("#shipping_country_field .chosen-container").length || jQuery("#shipping_country_field .select2-container").length || (jQuery("#shipping_country_field select.country_select").wrap('<p class="avada-select-parent"></p>').after('<span class="select-arrow">&#xe61f;</span>'), jQuery("#shipping_state_field select.state_select").length && jQuery("#shipping_state_field").addClass("avada-select-parent").append('<div class="select-arrow">&#xe61f;</div>'), jQuery("#shipping_country").on("change", function() {
            setTimeout(function() {
                (jQuery("#shipping_state_field input#shipping_state").length || jQuery("#shipping_state_field").is(":hidden")) && (jQuery("#shipping_state_field .select-arrow").remove(), jQuery("#shipping_state_field").removeClass("avada-select-parent")), jQuery("#shipping_state_field select.state_select").length && (jQuery("#shipping_state_field").addClass("avada-select-parent"), jQuery("#shipping_state_field .select-arrow").length || (jQuery("#shipping_state_field").append('<div class="select-arrow">&#xe61f;</div>'), calcSelectArrowDimensions()))
            }, 1)
        }))
    }, 1), jQuery("#calc_shipping_country").on("change", function() { setTimeout(function() { jQuery(".avada-shipping-calculator-form select#calc_shipping_state").length && !jQuery(".avada-shipping-calculator-form #calc_shipping_state").parent().find(".select-arrow").length && jQuery(".avada-shipping-calculator-form select#calc_shipping_state").after('<div class="select-arrow">&#xe61f;</div>'), (jQuery(".avada-shipping-calculator-form input#calc_shipping_state").length || jQuery(".avada-shipping-calculator-form #calc_shipping_state_field .select2").length) && jQuery(".avada-shipping-calculator-form #calc_shipping_state").parent().children(".select-arrow").remove(), calcSelectArrowDimensions() }, 1) }), jQuery("table.variations select, .variations-table select, .product-addon select").filter(":not(.yith_wccl_custom)").wrap('<div class="avada-select-parent"></div>'), jQuery('<div class="select-arrow">&#xe61f;</div>').appendTo("table.variations .avada-select-parent, .variations-table .avada-select-parent, .product-addon .avada-select-parent"), jQuery(".wpcf7-select:not([multiple])").wrap('<div class="wpcf7-select-parent"></div>'), jQuery('<div class="select-arrow">&#xe61f;</div>').appendTo(".wpcf7-select-parent"), jQuery("#bbp_stick_topic_select, #bbp_topic_status_select, #bbp_forum_id, #bbp_destination_topic, #wpfc_sermon_sorting select").wrap('<div class="avada-select-parent"></div>').after('<div class="select-arrow">&#xe61f;</div>'), jQuery(".variations_form select").on("change", function() { jQuery(".product #slider").length && 1 < jQuery(".product #slider .slides li").length && jQuery(".product #slider").flexslider(0) }), calcSelectArrowDimensions())
}

function removeAvadaSelectStyles() { Number(avadaSelectVars.avada_drop_down) || (jQuery("select").each(function() { jQuery(this).parent().is(".avada-select-parent") && (1 === jQuery(this).closest(".avada-select-parent").attr("class").split(" ").length ? jQuery(this).unwrap() : jQuery(this).closest(".avada-select-parent").removeClass("avada-select-parent")) }), jQuery("select").removeClass("avada-select avada-select-parent wpcf7-select-parent"), jQuery(".select-arrow").remove()) }
jQuery(window).on("load fusion-element-render-fusion_tb_woo_cart  fusion-element-render-fusion_tb_woo_checkout_tabs  fusion-element-render-fusion_tb_woo_checkout_billing fusion-element-render-fusion_tb_woo_checkout_shipping fusion-element-render-fusion_woo_cart_shipping", function() { addAvadaSelectStyles(), jQuery(window).on("DestoryAvadaSelect", removeAvadaSelectStyles), jQuery(window).on("AddAvadaSelect", addAvadaSelectStyles) });
var avadaToTopVars = { "status_totop": "desktop", "totop_position": "right", "totop_scroll_down_only": "0" };

function avadaUpdateToTopPostion() {
    var o = avadaToTopVars.totop_position.split("_");
    o = 2 === o.length ? "to-top-" + o[0] + " to-top-" + o[1] : "to-top-" + o[0], jQuery(".to-top-container").attr("class", "to-top-container"), jQuery(".to-top-container").addClass(o)
}
jQuery(document).ready(function() {
    var o = 0,
        a = jQuery("html").hasClass("ua-edge") || jQuery("html").hasClass("ua-safari-12") || jQuery("html").hasClass("ua-safari-11") || jQuery("html").hasClass("ua-safari-10") ? "body" : "html";
    jQuery(".fusion-top-top-link").on("click", function(o) { o.preventDefault(), (cssua.ua.mobile && -1 !== avadaToTopVars.status_totop.indexOf("mobile") || !cssua.ua.mobile) && jQuery(a).animate({ scrollTop: 0 }, 1200, "easeInOutExpo") }), jQuery(window).on("scroll", function() {
        var a = jQuery(this).scrollTop();
        200 < a && (a >= o || 1 !== parseInt(avadaToTopVars.totop_scroll_down_only)) ? jQuery(".fusion-top-top-link").addClass("fusion-to-top-active") : jQuery(".fusion-top-top-link").removeClass("fusion-to-top-active"), o = a
    }), jQuery(window).on("updateToTopPostion", avadaUpdateToTopPostion)
});

function fusionDisableStickyHeader() {}

function fusionInitStickyHeader() {}

function getStickyHeaderHeight(i) { return 0 }

function moveSideHeaderStylingDivs() {}

function fusionSideHeaderScroll() {}

function fusionGetScrollOffset() {
    var t, e = fusion.getAdminbarHeight(),
        o = "function" == typeof getStickyHeaderHeight ? getStickyHeaderHeight() : 0,
        n = parseInt(e + o + 1, 10);
    return jQuery(".fusion-tb-header").length && "function" == typeof fusionGetStickyOffset ? (t = fusionGetStickyOffset()) ? t + 1 : e : n
}
jQuery(document).ready(function() { jQuery("body").scrollspy({ target: ".fusion-menu", offset: fusionGetScrollOffset() }), jQuery(window).on("load fusion-sticky-change fusion-sticky-scroll-change", function() { jQuery("body").data()["bs.scrollspy"].options.offset = fusionGetScrollOffset() }), jQuery(window).on("fusion-sticky-transition-change", function() { setTimeout(function() { jQuery("body").data()["bs.scrollspy"].options.offset = fusionGetScrollOffset() }, 300) }) });
! function(t) {
    "use strict";

    function s(e, r) {
        var i = t.proxy(this.process, this);
        this.$body = t("body"), this.$scrollElement = t(e).is("body") ? t(window) : t(e), this.options = t.extend({}, s.DEFAULTS, r), this.selector = (this.options.target || "") + " li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", i), this.refresh(), this.process()
    }

    function e(e) {
        return this.each(function() {
            var r = t(this),
                i = r.data("bs.scrollspy"),
                o = "object" == typeof e && e;
            i || r.data("bs.scrollspy", i = new s(this, o)), "string" == typeof e && i[e]()
        })
    }
    s.VERSION = "3.3.2", s.DEFAULTS = { offset: 10 }, s.prototype.getScrollHeight = function() { return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight) }, s.prototype.refresh = function() {
        var s = "offset",
            e = 0;
        fusion.isWindow(this.$scrollElement[0]) || (s = "position", e = this.$scrollElement.scrollTop()), this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight();
        var r = this;
        this.$body.find(this.selector).map(function() {
            var r = t(this),
                i = r.data("target") || r.attr("href"),
                o = /^#./.test(i) && t(i);
            return o && o.length && o.is(":visible") && [
                [o[s]().top + e, i]
            ] || null
        }).sort(function(t, s) { return t[0] - s[0] }).each(function() { r.offsets.push(this[0]), r.targets.push(this[1]) })
    }, s.prototype.process = function() {
        var t, s = this.$scrollElement.scrollTop() + this.options.offset,
            e = this.getScrollHeight(),
            r = this.options.offset + e - this.$scrollElement.height(),
            i = this.offsets,
            o = this.targets,
            l = this.activeTarget;
        if (this.scrollHeight != e && this.refresh(), s >= r) return l != (t = o[o.length - 1]) && this.activate(t);
        if (l && s < i[0]) return this.activeTarget = null, this.clear();
        for (t = i.length; t--;) l != o[t] && s >= i[t] && (!i[t + 1] || s <= i[t + 1]) && this.activate(o[t])
    }, s.prototype.activate = function(s) {
        this.activeTarget = s, this.clear();
        var e = window.location.href.split("#"),
            r = "/" == e[0].charAt(e[0].length - 1) ? e[0] : e[0] + "/",
            i = this.selector + '[data-target="' + s + '"],' + this.selector + '[href="' + s + '"],' + this.selector + '[href="' + r + s + '"]',
            o = t(i).parents("li").addClass("current-menu-item");
        o.parent(".sub-menu").length && (o = o.closest("li.fusion-dropdown-menu").addClass("current-menu-item")), o.trigger("activate.bs.scrollspy"), o && t(this.selector).blur()
    }, s.prototype.clear = function() { t(this.selector).parentsUntil(this.options.target, ".current-menu-item").removeClass("current-menu-item"), t(this.selector).parentsUntil(this.options.target, ".current-menu-parent").removeClass("current-menu-parent") };
    var r = t.fn.scrollspy;
    t.fn.scrollspy = e, t.fn.scrollspy.Constructor = s, t.fn.scrollspy.noConflict = function() { return t.fn.scrollspy = r, this }, t(window).on("load.bs.scrollspy.data-api", function() {
        t('[data-spy="scroll"]').each(function() {
            var s = t(this);
            e.call(s, s.data())
        })
    })
}(jQuery);
var fusionTypographyVars = { "site_width": "1170px", "typography_sensitivity": "0.72", "typography_factor": "1.25", "elements": "h1, h2, h3, h4, h5, h6" };

function fusionCalculateResponsiveTypeValues(e, t, i, n) { fusionSetOriginalTypographyData(n) }

function fusionSetOriginalTypographyData(e) {
    var t = "string" == typeof e && -1 !== e.indexOf("fusion-slider"),
        i = fusion.getElements(e);
    jQuery(i).each(function(e, i) {
        var n, o, s, a, r;
        n = fusionTypographyVars.typography_factor, i.classList.contains("fusion-responsive-typography-calculated") ? i.style.getPropertyValue("--fontSize") && "" !== i.style.getPropertyValue("--fontSize") || i.classList.remove("fusion-responsive-typography-calculated") : null !== i.closest(".fusion-slider-revolution") || null !== i.closest(".rev_slider") || null !== i.closest("#layerslider-container") || null !== i.closest(".ls-avada.ls-container") || null !== i.closest(".fusion-slider-container") && !t || (s = window.getComputedStyle(i), a = !!s["font-size"] && parseFloat(s["font-size"]), r = !!s["line-height"] && parseFloat(s["line-height"]), !1 !== a && !1 !== r && (r = Math.round(r / a * 100) / 100, i.style.setProperty("--fontSize", a), i.setAttribute("data-fontsize", a), i.style.lineHeight = r, i.setAttribute("data-lineheight", s["line-height"]), window.fusionBaseFontSize || (window.fusionBaseFontSize = getComputedStyle(document.documentElement).getPropertyValue("--base-font-size")), t && (void 0 !== (o = jQuery(i).closest(".tfs-slider")).data("typo_factor") && (n = o.data("typo_factor")), i.style.setProperty("--typography_sensitivity", o.data("typo_sensitivity"))), window.fusionBaseFontSize * n > a && i.style.setProperty("--minFontSize", a), jQuery(i.querySelectorAll(".fusion-animated-texts-wrapper")).each(function(e, t) {
            var i = window.getComputedStyle(t),
                n = !!i["font-size"] && parseFloat(i["font-size"]),
                o = !!i["line-height"] && parseFloat(i["line-height"]);
            t.style.fontSize = n / a + "em", t.style.lineHeight = Math.round(o / n * 100) / 100
        }), i.classList.add("fusion-responsive-typography-calculated")))
    })
}

function fusionInitTypography() { window.responsiveTypeElements = fusionTypographyVars.elements, 0 < fusionTypographyVars.typography_sensitivity && fusionSetOriginalTypographyData(window.responsiveTypeElements) }
document.body.classList.contains("fusion-builder-live") ? window.onload = fusionInitTypography : fusion.ready(function() { fusionInitTypography() }), document.body.addEventListener("fusion-typography", function(e) {
    var t, i = e.detail.heading,
        n = e.detail.values,
        o = fusion.getElements(i);
    jQuery(o).each(function(e, i) { t = window.getComputedStyle(i), "" !== i.parentNode.style.fontSize && i.parentNode.classList.contains("fusion-title") ? i.style.fontSize = "1em" : i.parentNode.getAttribute("data-inline-fontsize") && i.getAttribute("data-inline-fontsize") ? i.style.fontSize = i.getAttribute("data-inline-fontsize") : i.style.fontSize = n["font-size"], i.getAttribute("data-inline-lineheight") && i.getAttribute("data-inline-lineheight") ? i.style.lineHeight = i.getAttribute("data-inline-lineheight") : i.style.lineHeight = n["line-height"], i.setAttribute("data-fontsize", parseFloat(t["font-size"])), i.style.setProperty("--fontSize", parseFloat(t["font-size"])), i.classList.add("fusion-responsive-typography-calculated") })
}), jQuery(document).ajaxComplete(function() { 0 < fusionTypographyVars.typography_sensitivity && fusionSetOriginalTypographyData(window.responsiveTypeElements) }), jQuery(window).on("fusion-typography-reset", function(e, t) { "undefined" != typeof fusionTypographyVars && 0 !== parseFloat(fusionTypographyVars.typography_sensitivity) && fusionSetOriginalTypographyData(jQuery('div[data-cid="' + t + '"]').find(window.responsiveTypeElements)) }), document.body.style.setProperty("--viewportWidth", window.screen.width), window.addEventListener("resize", function() { document.body.style.setProperty("--viewportWidth", window.screen.width) });
var fusionScrollToAnchorVars = { "content_break_point": "800", "container_hundred_percent_height_mobile": "0", "hundred_percent_scroll_sensitivity": "450" };
! function(e) {
    "use strict";
    e.fn.fusion_scroll_to_anchor_target = function(t) {
        var o, n, i, s, a, r, l, c = void 0 !== e(this).attr("href") ? e(this).attr("href") : e(this).data("link"),
            u = c.substr(c.indexOf("#")).slice(1),
            f = e("#" + u),
            h = e("html").hasClass("ua-edge") || e("html").hasClass("ua-safari-12") || e("html").hasClass("ua-safari-11") || e("html").hasClass("ua-safari-10") ? "body" : "html",
            d = e(".fusion-tb-header").length,
            p = !1,
            g = !1;
        if (t = void 0 !== t ? t : 0, f.length && "" !== u) { if ((f.parents(".hundred-percent-height-scrolling").length || f.find(".hundred-percent-height-scrolling").length) && (0 != fusionScrollToAnchorVars.container_hundred_percent_height_mobile || !Modernizr.mq("only screen and (max-width: " + fusionScrollToAnchorVars.content_break_point + "px)"))) { if ((l = f.hasClass("fusion-scroll-section-element") ? f : f.parents(".fusion-scroll-section-element")).hasClass("active") && l.offset().top >= e(window).scrollTop() && l.offset().top < e(window).scrollTop() + e(window).height()) return !1; if (location.hash && "#_" === location.hash.substring(0, 2) && e(".fusion-page-load-link").addClass("fusion-page.load-scroll-section-link"), f.parents(".fusion-scroll-section").length) return f.parents(".fusion-scroll-section").hasClass("active") ? f.parents(".fusion-scroll-section").find(".fusion-scroll-section-nav").find(".fusion-scroll-section-link[data-element=" + l.data("element") + "]").trigger("click") : (r = Math.ceil(f.parents(".fusion-scroll-section").offset().top), e(h).animate({ scrollTop: r }, { duration: 400, easing: "easeInExpo", complete: function() { setTimeout(function() { f.parents(".fusion-scroll-section").find(".fusion-scroll-section-nav").find(".fusion-scroll-section-link[data-element=" + l.data("element") + "]").trigger("click"), location.hash && "#_" === location.hash.substring(0, 2) && ("history" in window && "replaceState" in history && history.replaceState("", window.location.href.replace("#_", "#"), window.location.href.replace("#_", "#")), e(".fusion-page-load-link").removeClass("fusion-page.load-scroll-section-link")) }, parseInt(fusionScrollToAnchorVars.hundred_percent_scroll_sensitivity) + 50) } })), !1 } return o = fusion.getAdminbarHeight(), i = e(document).scrollTop(), d ? (e("body").addClass("fusion-scrolling-active"), (p = fusionGetStickyOffset()) || (p = o), s = f.offset().top - p - t) : (n = "function" == typeof getStickyHeaderHeight ? getStickyHeaderHeight() : 0, s = f.offset().top - o - n - t), a = Math.abs(i - s) / 2, r = i > s ? i - a : i + a, e(h).animate({ scrollTop: r }, { duration: 400, easing: "easeInExpo", complete: function() { o = fusion.getAdminbarHeight(), d ? ((p = fusionGetStickyOffset()) || (p = o), s = f.offset().top - p - t) : (n = "function" == typeof getStickyHeaderHeight ? getStickyHeaderHeight() : 0, s = f.offset().top - o - n - t), e(h).animate({ scrollTop: s }, 450, "easeOutExpo", function() { location.hash && "#_" === location.hash.substring(0, 2) && "history" in window && "replaceState" in history && history.replaceState("", window.location.href.replace("#_", "#"), window.location.href.replace("#_", "#")), d && (g = fusionGetStickyOffset(), p !== g && (s = f.offset().top - g - t, e(h).animate({ scrollTop: s }, 450)), e("body").removeClass("fusion-scrolling-active")) }) } }), (f.hasClass("tab-pane") || f.hasClass("tab-link")) && "function" == typeof e.fn.fusionSwitchTabOnLinkClick && setTimeout(function() { f.parents(".fusion-tabs").fusionSwitchTabOnLinkClick() }, 100), !1 }
    }
}(jQuery), jQuery(document).ready(function() {
    jQuery("body").on("click", '.fusion-menu a:not([href="#"], .fusion-megamenu-widgets-container a, .search-link), .fusion-widget-menu a, .fusion-secondary-menu a, .fusion-mobile-nav-item a:not([href="#"], .search-link), .fusion-button:not([href="#"], input, button), .fusion-one-page-text-link:not([href="#"]), .fusion-content-boxes .fusion-read-more:not([href="#"]), .fusion-imageframe > .fusion-no-lightbox, .content-box-wrapper:not(.link-area-box) .heading-link, a.woocommerce-review-link', function(e) {
        var t, o, n, i, s, a, r = jQuery("body").hasClass("fusion-builder-live");
        if (jQuery(this).hasClass("avada-noscroll") || jQuery(this).parent().hasClass("avada-noscroll") || jQuery(this).is(".fusion-content-box-button, .fusion-tagline-button") && jQuery(this).parents(".avada-noscroll").length) return !0;
        if (this.hash) {
            if (a = jQuery(this).attr("target") ? jQuery(this).attr("target") : "_self", i = (n = void 0 !== (o = (t = jQuery(this).attr("href")).split("#"))[1] ? o[1] : "").substring(0, 1), "/" !== (s = o[0]).substring(s.length - 1, s.length) && (s += "/"), "!" === i || "/" === i) return;
            e.preventDefault(), location.pathname.replace(/^\//, "") != this.pathname.replace(/^\//, "") && "#" !== t.charAt(0) || "" !== location.search && -1 === location.search.indexOf("lang=") && -1 === location.search.indexOf("builder=") && !jQuery(this).hasClass("tfs-scroll-down-indicator") && !jQuery(this).hasClass("fusion-same-page-scroll") ? r || ("/" === s && "" !== location.search && (s = location.href.replace(location.search, "")), window.open(s + "#_" + n, a)) : (jQuery(this).fusion_scroll_to_anchor_target(), "history" in window && "replaceState" in history && !r && history.replaceState("", t, t), jQuery(this).parents(".fusion-menu-element-wrapper.flyout-submenu-expanded").length ? jQuery(".fusion-close-flyout").trigger("click") : jQuery(this).parents(".fusion-flyout-menu").length && jQuery(".fusion-flyout-menu-toggle").trigger("click"))
        }
    })
}), location.hash && "#_" === location.hash.substring(0, 2) && (jQuery(".fusion-page-load-link").attr("href", decodeURIComponent("#" + location.hash.substring(2))), jQuery(window).on("load", function() { jQuery(".fusion-blog-shortcode").length ? setTimeout(function() { jQuery(".fusion-page-load-link").fusion_scroll_to_anchor_target() }, 300) : jQuery(".fusion-page-load-link").fusion_scroll_to_anchor_target() }));

function checkHoverTouchState() {
    var e, o = !1;
    document.addEventListener("touchstart", function() { clearTimeout(e), o = !0, jQuery("body").addClass("fusion-touch"), jQuery("body").removeClass("fusion-no-touch"), e = setTimeout(function() { o = !1 }, 500) }, { passive: !0 }), document.addEventListener("mouseover", function() { o || (o = !1, jQuery("body").addClass("fusion-no-touch"), jQuery("body").removeClass("fusion-touch")) })
}
checkHoverTouchState(), jQuery(document).ready(function() { jQuery("input, textarea").placeholder() });
var fusionLightboxVars = { "status_lightbox": "1", "lightbox_gallery": "1", "lightbox_skin": "dark", "lightbox_title": "", "lightbox_arrows": "1", "lightbox_slideshow_speed": "5000", "lightbox_autoplay": "", "lightbox_opacity": "0.90", "lightbox_desc": "", "lightbox_social": "", "lightbox_social_links": { "facebook": { "source": "https:\/\/www.facebook.com\/sharer.php?u={URL}", "text": "Share on Facebook" }, "twitter": { "source": "https:\/\/twitter.com\/share?url={URL}", "text": "Share on Twitter" }, "linkedin": { "source": "https:\/\/www.linkedin.com\/shareArticle?mini=true&url={URL}", "text": "Share on LinkedIn" }, "whatsapp": { "source": "https:\/\/api.whatsapp.com\/send?text={URL}", "text": "Share on WhatsApp" }, "pinterest": { "source": "https:\/\/pinterest.com\/pin\/create\/button\/?url={URL}", "text": "Share on Pinterest" }, "mail": { "source": "mailto:?body={URL}", "text": "Share by Email" } }, "lightbox_deeplinking": "1", "lightbox_path": "horizontal", "lightbox_post_images": "1", "lightbox_animation_speed": "normal", "l10n": { "close": "Press Esc to close", "enterFullscreen": "Enter Fullscreen (Shift+Enter)", "exitFullscreen": "Exit Fullscreen (Shift+Enter)", "slideShow": "Slideshow", "next": "Next", "previous": "Previous" } };
var fusionVideoVars = { "status_vimeo": "0" };
jQuery(document).ready(function() {
    jQuery(".fusion-video").each(function() {!jQuery(this).parents(".fusion-modal").length && 1 == jQuery(this).data("autoplay") && jQuery(this).is(":visible") && jQuery(this).find("iframe").each(function() { jQuery(this).attr("src", jQuery(this).attr("src").replace("autoplay=0", "autoplay=1")) }) }), jQuery(window).on("resize", function() {
        var e, i = document.querySelectorAll("iframe"),
            o = i.length;
        if (jQuery(".fusion-youtube").each(function() { jQuery(this).is(":visible") || jQuery(this).parents(".fusion-modal").length && !jQuery(this).parents(".fusion-modal").is(":visible") || jQuery(this).find("iframe").each(function() { this.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*") }) }), "undefined" != typeof Vimeo)
            for (e = 0; e < o; e++) !(void 0 !== i[e].src && -1 < i[e].src.toLowerCase().indexOf("vimeo")) || jQuery(i[e]).is(":visible") || jQuery(i[e]).data("privacy-src") && jQuery(i[e]).hasClass("fusion-hidden") || jQuery(i[e]).parents(".fusion-modal").length && !jQuery(i[e]).parents(".fusion-modal").is(":visible") || new Vimeo.Player(i[e]).pause()
    }), jQuery(window).on("fusion-element-render-fusion_youtube fusion-element-render-fusion_vimeo", function(e, i) {
        (void 0 !== i ? jQuery('div[data-cid="' + i + '"]') : jQuery("body")).find(".full-video, .video-shortcode, .wooslider .slide-content").fitVids()
    })
}), jQuery(window).on("fusion-dynamic-content-render", function(e, i) {
    var o = jQuery(i).find(".fusion-youtube").find("iframe");
    0 < o.length && o.each(function() {
        var e;
        1 !== jQuery(this).closest(".fusion-video").data("autoplay") && "true" !== jQuery(this).closest(".fusion-video").data("autoplay") || (jQuery(this).closest(".fusion-video").data("autoplay", "false"), e = "playVideo", this.contentWindow.postMessage('{"event":"command","func":"' + e + '","args":""}', "*"))
    }), 0 < (o = jQuery(i).find(".fusion-vimeo").find("iframe")).length && o.each(function() { 1 !== jQuery(this).closest(".fusion-video").data("autoplay") && "true" !== jQuery(this).closest(".fusion-video").data("autoplay") || (jQuery(this).closest(".fusion-video").data("autoplay", "false"), new Vimeo.Player(jQuery(this)[0]).play()) })
});
jQuery(document).ready(function() {
    jQuery(".fusion-image-hovers .hover-type-liftup.fusion-column-inner-bg").on({
        mouseenter: function() {
            var e = jQuery(this).closest(".fusion_builder_column");
            jQuery(this).css("z-index", "4"), jQuery(this).siblings(".fusion-column-wrapper").css("z-index", "5"), "none" !== e.css("filter") && "auto" === e.css("z-index") && (e.css("z-index", "1"), e.attr("data-filter-zindex", "true"))
        },
        mouseleave: function() {
            var e = jQuery(this).closest(".fusion_builder_column");
            jQuery(this).css("z-index", ""), jQuery(this).siblings(".fusion-column-wrapper").css("z-index", ""), "true" === e.data("filter-zindex") && (e.css("z-index", ""), e.removeAttr("data-filter-zindex"))
        }
    })
});