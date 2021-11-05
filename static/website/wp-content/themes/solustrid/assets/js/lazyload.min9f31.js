function _extends() { return (_extends = Object.assign || function(t) { for (var e = 1; e < arguments.length; e++) { var n = arguments[e]; for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]) } return t }).apply(this, arguments) }

function _typeof(t) { return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) { return typeof t } : function(t) { return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t })(t) }! function(t, e) { "object" === ("undefined" == typeof exports ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.LazyLoad = e() }(this, function() {
    "use strict";
    var t = "undefined" != typeof window,
        e = t && !("onscroll" in window) || "undefined" != typeof navigator && /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent),
        n = t && "IntersectionObserver" in window,
        o = t && "classList" in document.createElement("p"),
        r = { elements_selector: "img", container: e || t ? document : null, threshold: 300, thresholds: null, data_src: "src", data_srcset: "srcset", data_sizes: "sizes", data_bg: "bg", class_loading: "loading", class_loaded: "loaded", class_error: "error", load_delay: 0, auto_unobserve: !0, callback_enter: null, callback_exit: null, callback_reveal: null, callback_loaded: null, callback_error: null, callback_finish: null },
        a = function(t, e) { return t.getAttribute("data-" + e) },
        s = function(t, e, n) {
            var o = "data-" + e;
            null !== n ? t.setAttribute(o, n) : t.removeAttribute(o)
        },
        i = function(t) { return "true" === a(t, "was-processed") },
        c = function(t, e) { return s(t, "ll-timeout", e) },
        l = function(t) { return a(t, "ll-timeout") },
        u = function(t, e) {
            var n, o = new t(e);
            try { n = new CustomEvent("LazyLoad::Initialized", { detail: { instance: o } }) } catch (t) {
                (n = document.createEvent("CustomEvent")).initCustomEvent("LazyLoad::Initialized", !1, !1, { instance: o })
            }
            window.dispatchEvent(n)
        };
    var d = function(t, e) { t && t(e) },
        f = function(t, e) { t._loadingCount += e, 0 === t._elements.length && 0 === t._loadingCount && d(t._settings.callback_finish) },
        _ = function(t) { for (var e, n = [], o = 0; e = t.children[o]; o += 1) "SOURCE" === e.tagName && n.push(e); return n },
        v = function(t, e, n) { n && t.setAttribute(e, n) },
        b = function(t, e) { v(t, "sizes", a(t, e.data_sizes)), v(t, "srcset", a(t, e.data_srcset)), v(t, "src", a(t, e.data_src)) },
        g = {
            IMG: function(t, e) {
                var n = t.parentNode;
                n && "PICTURE" === n.tagName && _(n).forEach(function(t) { b(t, e) });
                b(t, e)
            },
            IFRAME: function(t, e) { v(t, "src", a(t, e.data_src)) },
            VIDEO: function(t, e) { _(t).forEach(function(t) { v(t, "src", a(t, e.data_src)) }), v(t, "src", a(t, e.data_src)), t.load() }
        },
        m = function(t, e) {
            var n, o, r = e._settings,
                s = t.tagName,
                i = g[s];
            if (i) return i(t, r), f(e, 1), void(e._elements = (n = e._elements, o = t, n.filter(function(t) { return t !== o })));
            ! function(t, e) {
                var n = a(t, e.data_src),
                    o = a(t, e.data_bg);
                n && (t.style.backgroundImage = 'url("'.concat(n, '")')), o && (t.style.backgroundImage = o)
            }(t, r)
        },
        h = function(t, e) { o ? t.classList.add(e) : t.className += (t.className ? " " : "") + e },
        p = function(t, e, n) { t.addEventListener(e, n) },
        y = function(t, e, n) { t.removeEventListener(e, n) },
        E = function(t, e, n) { y(t, "load", e), y(t, "loadeddata", e), y(t, "error", n) },
        w = function(t, e, n) {
            var r = n._settings,
                a = e ? r.class_loaded : r.class_error,
                s = e ? r.callback_loaded : r.callback_error,
                i = t.target;
            ! function(t, e) { o ? t.classList.remove(e) : t.className = t.className.replace(new RegExp("(^|\\s+)" + e + "(\\s+|$)"), " ").replace(/^\s+/, "").replace(/\s+$/, "") }(i, r.class_loading), h(i, a), d(s, i), f(n, -1)
        },
        k = function(t, e) {
            var n = function n(r) { w(r, !0, e), E(t, n, o) },
                o = function o(r) { w(r, !1, e), E(t, n, o) };
            ! function(t, e, n) { p(t, "load", e), p(t, "loadeddata", e), p(t, "error", n) }(t, n, o)
        },
        I = ["IMG", "IFRAME", "VIDEO"],
        L = function(t, e) {
            var n = e._observer;
            z(t, e), n && e._settings.auto_unobserve && n.unobserve(t)
        },
        x = function(t) {
            var e = l(t);
            e && (clearTimeout(e), c(t, null))
        },
        A = function(t, e) {
            var n = e._settings.load_delay,
                o = l(t);
            o || (o = setTimeout(function() { L(t, e), x(t) }, n), c(t, o))
        },
        z = function(t, e, n) { var o = e._settings;!n && i(t) || (I.indexOf(t.tagName) > -1 && (k(t, e), h(t, o.class_loading)), m(t, e), function(t) { s(t, "was-processed", "true") }(t), d(o.callback_reveal, t), d(o.callback_set, t)) },
        O = function(t) {
            return !!n && (t._observer = new IntersectionObserver(function(e) {
                e.forEach(function(e) {
                    return function(t) { return t.isIntersecting || t.intersectionRatio > 0 }(e) ? function(t, e) {
                        var n = e._settings;
                        d(n.callback_enter, t), n.load_delay ? A(t, e) : L(t, e)
                    }(e.target, t) : function(t, e) {
                        var n = e._settings;
                        d(n.callback_exit, t), n.load_delay && x(t)
                    }(e.target, t)
                })
            }, { root: (e = t._settings).container === document ? null : e.container, rootMargin: e.thresholds || e.threshold + "px" }), !0);
            var e
        },
        N = function(t, e) { this._settings = function(t) { return _extends({}, r, t) }(t), this._loadingCount = 0, O(this), this.update(e) };
    return N.prototype = {
        update: function(t) {
            var n = this,
                o = this._settings,
                r = t || o.container.querySelectorAll(o.elements_selector);
            this._elements = function(t) { return t.filter(function(t) { return !i(t) }) }(Array.prototype.slice.call(r)), !e && this._observer ? this._elements.forEach(function(t) { n._observer.observe(t) }) : this.loadAll()
        },
        destroy: function() {
            var t = this;
            this._observer && (this._elements.forEach(function(e) { t._observer.unobserve(e) }), this._observer = null), this._elements = null, this._settings = null
        },
        load: function(t, e) { z(t, this, e) },
        loadAll: function() {
            var t = this;
            this._elements.forEach(function(e) { L(e, t) })
        }
    }, t && function(t, e) {
        if (e)
            if (e.length)
                for (var n, o = 0; n = e[o]; o += 1) u(t, n);
            else u(t, e)
    }(N, window.lazyLoadOptions), N
});
//# sourceMappingURL=lazyload.min.js.map