/*
 * jQuery JavaScript Library v1.7.2
 * http://jquery.com/
 *
 * Copyright 2011, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2011, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Wed Mar 21 12:46:34 2012 -0700
 */
(function(window, undefined) {
    var document = window.document,
        navigator = window.navigator,
        location = window.location;
    var jQuery = (function() {
        var jQuery = function(selector, context) {
                return new jQuery.fn.init(selector, context, rootjQuery)
            },
            _jQuery = window.jQuery,
            _$ = window.$,
            rootjQuery, quickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
            rnotwhite = /\S/,
            trimLeft = /^\s+/,
            trimRight = /\s+$/,
            rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
            rvalidchars = /^[\],:{}\s]*$/,
            rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
            rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
            rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
            rwebkit = /(webkit)[ \/]([\w.]+)/,
            ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/,
            rmsie = /(msie) ([\w.]+)/,
            rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/,
            rdashAlpha = /-([a-z]|[0-9])/ig,
            rmsPrefix = /^-ms-/,
            fcamelCase = function(all, letter) {
                return (letter + "").toUpperCase()
            },
            userAgent = navigator.userAgent,
            browserMatch, readyList, DOMContentLoaded, toString = Object.prototype.toString,
            hasOwn = Object.prototype.hasOwnProperty,
            push = Array.prototype.push,
            slice = Array.prototype.slice,
            trim = String.prototype.trim,
            indexOf = Array.prototype.indexOf,
            class2type = {};
        jQuery.fn = jQuery.prototype = {
            constructor: jQuery,
            init: function(selector, context, rootjQuery) {
                var match, elem, ret, doc;
                if (!selector) {
                    return this
                }
                if (selector.nodeType) {
                    this.context = this[0] = selector;
                    this.length = 1;
                    return this
                }
                if (selector === "body" && !context && document.body) {
                    this.context = document;
                    this[0] = document.body;
                    this.selector = selector;
                    this.length = 1;
                    return this
                }
                if (typeof selector === "string") {
                    if (selector.charAt(0) === "<" && selector.charAt(selector.length - 1) === ">" && selector.length >= 3) {
                        match = [null, selector, null]
                    } else {
                        match = quickExpr.exec(selector)
                    }
                    if (match && (match[1] || !context)) {
                        if (match[1]) {
                            context = context instanceof jQuery ? context[0] : context;
                            doc = (context ? context.ownerDocument || context : document);
                            ret = rsingleTag.exec(selector);
                            if (ret) {
                                if (jQuery.isPlainObject(context)) {
                                    selector = [document.createElement(ret[1])];
                                    jQuery.fn.attr.call(selector, context, true)
                                } else {
                                    selector = [doc.createElement(ret[1])]
                                }
                            } else {
                                ret = jQuery.buildFragment([match[1]], [doc]);
                                selector = (ret.cacheable ? jQuery.clone(ret.fragment) : ret.fragment).childNodes
                            }
                            return jQuery.merge(this, selector)
                        } else {
                            elem = document.getElementById(match[2]);
                            if (elem && elem.parentNode) {
                                if (elem.id !== match[2]) {
                                    return rootjQuery.find(selector)
                                }
                                this.length = 1;
                                this[0] = elem
                            }
                            this.context = document;
                            this.selector = selector;
                            return this
                        }
                    } else {
                        if (!context || context.jquery) {
                            return (context || rootjQuery).find(selector)
                        } else {
                            return this.constructor(context).find(selector)
                        }
                    }
                } else {
                    if (jQuery.isFunction(selector)) {
                        return rootjQuery.ready(selector)
                    }
                }
                if (selector.selector !== undefined) {
                    this.selector = selector.selector;
                    this.context = selector.context
                }
                return jQuery.makeArray(selector, this)
            },
            selector: "",
            jquery: "1.7.2",
            length: 0,
            size: function() {
                return this.length
            },
            toArray: function() {
                return slice.call(this, 0)
            },
            get: function(num) {
                return num == null ? this.toArray() : (num < 0 ? this[this.length + num] : this[num])
            },
            pushStack: function(elems, name, selector) {
                var ret = this.constructor();
                if (jQuery.isArray(elems)) {
                    push.apply(ret, elems)
                } else {
                    jQuery.merge(ret, elems)
                }
                ret.prevObject = this;
                ret.context = this.context;
                if (name === "find") {
                    ret.selector = this.selector + (this.selector ? " " : "") + selector
                } else {
                    if (name) {
                        ret.selector = this.selector + "." + name + "(" + selector + ")"
                    }
                }
                return ret
            },
            each: function(callback, args) {
                return jQuery.each(this, callback, args)
            },
            ready: function(fn) {
                jQuery.bindReady();
                readyList.add(fn);
                return this
            },
            eq: function(i) {
                i = +i;
                return i === -1 ? this.slice(i) : this.slice(i, i + 1)
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            slice: function() {
                return this.pushStack(slice.apply(this, arguments), "slice", slice.call(arguments).join(","))
            },
            map: function(callback) {
                return this.pushStack(jQuery.map(this, function(elem, i) {
                    return callback.call(elem, i, elem)
                }))
            },
            end: function() {
                return this.prevObject || this.constructor(null)
            },
            push: push,
            sort: [].sort,
            splice: [].splice
        };
        jQuery.fn.init.prototype = jQuery.fn;
        jQuery.extend = jQuery.fn.extend = function() {
            var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {},
                i = 1,
                length = arguments.length,
                deep = false;
            if (typeof target === "boolean") {
                deep = target;
                target = arguments[1] || {};
                i = 2
            }
            if (typeof target !== "object" && !jQuery.isFunction(target)) {
                target = {}
            }
            if (length === i) {
                target = this;
                --i
            }
            for (; i < length; i++) {
                if ((options = arguments[i]) != null) {
                    for (name in options) {
                        src = target[name];
                        copy = options[name];
                        if (target === copy) {
                            continue
                        }
                        if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
                            if (copyIsArray) {
                                copyIsArray = false;
                                clone = src && jQuery.isArray(src) ? src : []
                            } else {
                                clone = src && jQuery.isPlainObject(src) ? src : {}
                            }
                            target[name] = jQuery.extend(deep, clone, copy)
                        } else {
                            if (copy !== undefined) {
                                target[name] = copy
                            }
                        }
                    }
                }
            }
            return target
        };
        jQuery.extend({
            noConflict: function(deep) {
                if (window.$ === jQuery) {
                    window.$ = _$
                }
                if (deep && window.jQuery === jQuery) {
                    window.jQuery = _jQuery
                }
                return jQuery
            },
            isReady: false,
            readyWait: 1,
            holdReady: function(hold) {
                if (hold) {
                    jQuery.readyWait++
                } else {
                    jQuery.ready(true)
                }
            },
            ready: function(wait) {
                if ((wait === true && !--jQuery.readyWait) || (wait !== true && !jQuery.isReady)) {
                    if (!document.body) {
                        return setTimeout(jQuery.ready, 1)
                    }
                    jQuery.isReady = true;
                    if (wait !== true && --jQuery.readyWait > 0) {
                        return
                    }
                    readyList.fireWith(document, [jQuery]);
                    if (jQuery.fn.trigger) {
                        jQuery(document).trigger("ready").off("ready")
                    }
                }
            },
            bindReady: function() {
                if (readyList) {
                    return
                }
                readyList = jQuery.Callbacks("once memory");
                if (document.readyState === "complete") {
                    return setTimeout(jQuery.ready, 1)
                }
                if (document.addEventListener) {
                    document.addEventListener("DOMContentLoaded", DOMContentLoaded, false);
                    window.addEventListener("load", jQuery.ready, false)
                } else {
                    if (document.attachEvent) {
                        document.attachEvent("onreadystatechange", DOMContentLoaded);
                        window.attachEvent("onload", jQuery.ready);
                        var toplevel = false;
                        try {
                            toplevel = window.frameElement == null
                        } catch (e) {}
                        if (document.documentElement.doScroll && toplevel) {
                            doScrollCheck()
                        }
                    }
                }
            },
            isFunction: function(obj) {
                return jQuery.type(obj) === "function"
            },
            isArray: Array.isArray || function(obj) {
                return jQuery.type(obj) === "array"
            },
            isWindow: function(obj) {
                return obj != null && obj == obj.window
            },
            isNumeric: function(obj) {
                return !isNaN(parseFloat(obj)) && isFinite(obj)
            },
            type: function(obj) {
                return obj == null ? String(obj) : class2type[toString.call(obj)] || "object"
            },
            isPlainObject: function(obj) {
                if (!obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
                    return false
                }
                try {
                    if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                        return false
                    }
                } catch (e) {
                    return false
                }
                var key;
                for (key in obj) {}
                return key === undefined || hasOwn.call(obj, key)
            },
            isEmptyObject: function(obj) {
                for (var name in obj) {
                    return false
                }
                return true
            },
            error: function(msg) {
                throw new Error(msg)
            },
            parseJSON: function(data) {
                if (typeof data !== "string" || !data) {
                    return null
                }
                data = jQuery.trim(data);
                if (window.JSON && window.JSON.parse) {
                    return window.JSON.parse(data)
                }
                if (rvalidchars.test(data.replace(rvalidescape, "@").replace(rvalidtokens, "]").replace(rvalidbraces, ""))) {
                    return (new Function("return " + data))()
                }
                jQuery.error("Invalid JSON: " + data)
            },
            parseXML: function(data) {
                if (typeof data !== "string" || !data) {
                    return null
                }
                var xml, tmp;
                try {
                    if (window.DOMParser) {
                        tmp = new DOMParser();
                        xml = tmp.parseFromString(data, "text/xml")
                    } else {
                        xml = new ActiveXObject("Microsoft.XMLDOM");
                        xml.async = "false";
                        xml.loadXML(data)
                    }
                } catch (e) {
                    xml = undefined
                }
                if (!xml || !xml.documentElement || xml.getElementsByTagName("parsererror").length) {
                    jQuery.error("Invalid XML: " + data)
                }
                return xml
            },
            noop: function() {},
            globalEval: function(data) {
                if (data && rnotwhite.test(data)) {
                    (window.execScript || function(data) {
                        window["eval"].call(window, data)
                    })(data)
                }
            },
            camelCase: function(string) {
                return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase)
            },
            nodeName: function(elem, name) {
                return elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase()
            },
            each: function(object, callback, args) {
                var name, i = 0,
                    length = object.length,
                    isObj = length === undefined || jQuery.isFunction(object);
                if (args) {
                    if (isObj) {
                        for (name in object) {
                            if (callback.apply(object[name], args) === false) {
                                break
                            }
                        }
                    } else {
                        for (; i < length;) {
                            if (callback.apply(object[i++], args) === false) {
                                break
                            }
                        }
                    }
                } else {
                    if (isObj) {
                        for (name in object) {
                            if (callback.call(object[name], name, object[name]) === false) {
                                break
                            }
                        }
                    } else {
                        for (; i < length;) {
                            if (callback.call(object[i], i, object[i++]) === false) {
                                break
                            }
                        }
                    }
                }
                return object
            },
            trim: trim ? function(text) {
                return text == null ? "" : trim.call(text)
            } : function(text) {
                return text == null ? "" : text.toString().replace(trimLeft, "").replace(trimRight, "")
            },
            makeArray: function(array, results) {
                var ret = results || [];
                if (array != null) {
                    var type = jQuery.type(array);
                    if (array.length == null || type === "string" || type === "function" || type === "regexp" || jQuery.isWindow(array)) {
                        push.call(ret, array)
                    } else {
                        jQuery.merge(ret, array)
                    }
                }
                return ret
            },
            inArray: function(elem, array, i) {
                var len;
                if (array) {
                    if (indexOf) {
                        return indexOf.call(array, elem, i)
                    }
                    len = array.length;
                    i = i ? i < 0 ? Math.max(0, len + i) : i : 0;
                    for (; i < len; i++) {
                        if (i in array && array[i] === elem) {
                            return i
                        }
                    }
                }
                return -1
            },
            merge: function(first, second) {
                var i = first.length,
                    j = 0;
                if (typeof second.length === "number") {
                    for (var l = second.length; j < l; j++) {
                        first[i++] = second[j]
                    }
                } else {
                    while (second[j] !== undefined) {
                        first[i++] = second[j++]
                    }
                }
                first.length = i;
                return first
            },
            grep: function(elems, callback, inv) {
                var ret = [],
                    retVal;
                inv = !!inv;
                for (var i = 0, length = elems.length; i < length; i++) {
                    retVal = !!callback(elems[i], i);
                    if (inv !== retVal) {
                        ret.push(elems[i])
                    }
                }
                return ret
            },
            map: function(elems, callback, arg) {
                var value, key, ret = [],
                    i = 0,
                    length = elems.length,
                    isArray = elems instanceof jQuery || length !== undefined && typeof length === "number" && ((length > 0 && elems[0] && elems[length - 1]) || length === 0 || jQuery.isArray(elems));
                if (isArray) {
                    for (; i < length; i++) {
                        value = callback(elems[i], i, arg);
                        if (value != null) {
                            ret[ret.length] = value
                        }
                    }
                } else {
                    for (key in elems) {
                        value = callback(elems[key], key, arg);
                        if (value != null) {
                            ret[ret.length] = value
                        }
                    }
                }
                return ret.concat.apply([], ret)
            },
            guid: 1,
            proxy: function(fn, context) {
                if (typeof context === "string") {
                    var tmp = fn[context];
                    context = fn;
                    fn = tmp
                }
                if (!jQuery.isFunction(fn)) {
                    return undefined
                }
                var args = slice.call(arguments, 2),
                    proxy = function() {
                        return fn.apply(context, args.concat(slice.call(arguments)))
                    };
                proxy.guid = fn.guid = fn.guid || proxy.guid || jQuery.guid++;
                return proxy
            },
            access: function(elems, fn, key, value, chainable, emptyGet, pass) {
                var exec, bulk = key == null,
                    i = 0,
                    length = elems.length;
                if (key && typeof key === "object") {
                    for (i in key) {
                        jQuery.access(elems, fn, i, key[i], 1, emptyGet, value)
                    }
                    chainable = 1
                } else {
                    if (value !== undefined) {
                        exec = pass === undefined && jQuery.isFunction(value);
                        if (bulk) {
                            if (exec) {
                                exec = fn;
                                fn = function(elem, key, value) {
                                    return exec.call(jQuery(elem), value)
                                }
                            } else {
                                fn.call(elems, value);
                                fn = null
                            }
                        }
                        if (fn) {
                            for (; i < length; i++) {
                                fn(elems[i], key, exec ? value.call(elems[i], i, fn(elems[i], key)) : value, pass)
                            }
                        }
                        chainable = 1
                    }
                }
                return chainable ? elems : bulk ? fn.call(elems) : length ? fn(elems[0], key) : emptyGet
            },
            now: function() {
                return (new Date()).getTime()
            },
            uaMatch: function(ua) {
                ua = ua.toLowerCase();
                var match = rwebkit.exec(ua) || ropera.exec(ua) || rmsie.exec(ua) || ua.indexOf("compatible") < 0 && rmozilla.exec(ua) || [];
                return {
                    browser: match[1] || "",
                    version: match[2] || "0"
                }
            },
            sub: function() {
                function jQuerySub(selector, context) {
                    return new jQuerySub.fn.init(selector, context)
                }
                jQuery.extend(true, jQuerySub, this);
                jQuerySub.superclass = this;
                jQuerySub.fn = jQuerySub.prototype = this();
                jQuerySub.fn.constructor = jQuerySub;
                jQuerySub.sub = this.sub;
                jQuerySub.fn.init = function init(selector, context) {
                    if (context && context instanceof jQuery && !(context instanceof jQuerySub)) {
                        context = jQuerySub(context)
                    }
                    return jQuery.fn.init.call(this, selector, context, rootjQuerySub)
                };
                jQuerySub.fn.init.prototype = jQuerySub.fn;
                var rootjQuerySub = jQuerySub(document);
                return jQuerySub
            },
            browser: {}
        });
        jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
            class2type["[object " + name + "]"] = name.toLowerCase()
        });
        browserMatch = jQuery.uaMatch(userAgent);
        if (browserMatch.browser) {
            jQuery.browser[browserMatch.browser] = true;
            jQuery.browser.version = browserMatch.version
        }
        if (jQuery.browser.webkit) {
            jQuery.browser.safari = true
        }
        if (rnotwhite.test("\xA0")) {
            trimLeft = /^[\s\xA0]+/;
            trimRight = /[\s\xA0]+$/
        }
        rootjQuery = jQuery(document);
        if (document.addEventListener) {
            DOMContentLoaded = function() {
                document.removeEventListener("DOMContentLoaded", DOMContentLoaded, false);
                jQuery.ready()
            }
        } else {
            if (document.attachEvent) {
                DOMContentLoaded = function() {
                    if (document.readyState === "complete") {
                        document.detachEvent("onreadystatechange", DOMContentLoaded);
                        jQuery.ready()
                    }
                }
            }
        }

        function doScrollCheck() {
            if (jQuery.isReady) {
                return
            }
            try {
                document.documentElement.doScroll("left")
            } catch (e) {
                setTimeout(doScrollCheck, 1);
                return
            }
            jQuery.ready()
        }
        return jQuery
    })();
    var flagsCache = {};

    function createFlags(flags) {
        var object = flagsCache[flags] = {},
            i, length;
        flags = flags.split(/\s+/);
        for (i = 0, length = flags.length; i < length; i++) {
            object[flags[i]] = true
        }
        return object
    }
    jQuery.Callbacks = function(flags) {
        flags = flags ? (flagsCache[flags] || createFlags(flags)) : {};
        var list = [],
            stack = [],
            memory, fired, firing, firingStart, firingLength, firingIndex, add = function(args) {
                var i, length, elem, type, actual;
                for (i = 0, length = args.length; i < length; i++) {
                    elem = args[i];
                    type = jQuery.type(elem);
                    if (type === "array") {
                        add(elem)
                    } else {
                        if (type === "function") {
                            if (!flags.unique || !self.has(elem)) {
                                list.push(elem)
                            }
                        }
                    }
                }
            },
            fire = function(context, args) {
                args = args || [];
                memory = !flags.memory || [context, args];
                fired = true;
                firing = true;
                firingIndex = firingStart || 0;
                firingStart = 0;
                firingLength = list.length;
                for (; list && firingIndex < firingLength; firingIndex++) {
                    if (list[firingIndex].apply(context, args) === false && flags.stopOnFalse) {
                        memory = true;
                        break
                    }
                }
                firing = false;
                if (list) {
                    if (!flags.once) {
                        if (stack && stack.length) {
                            memory = stack.shift();
                            self.fireWith(memory[0], memory[1])
                        }
                    } else {
                        if (memory === true) {
                            self.disable()
                        } else {
                            list = []
                        }
                    }
                }
            },
            self = {
                add: function() {
                    if (list) {
                        var length = list.length;
                        add(arguments);
                        if (firing) {
                            firingLength = list.length
                        } else {
                            if (memory && memory !== true) {
                                firingStart = length;
                                fire(memory[0], memory[1])
                            }
                        }
                    }
                    return this
                },
                remove: function() {
                    if (list) {
                        var args = arguments,
                            argIndex = 0,
                            argLength = args.length;
                        for (; argIndex < argLength; argIndex++) {
                            for (var i = 0; i < list.length; i++) {
                                if (args[argIndex] === list[i]) {
                                    if (firing) {
                                        if (i <= firingLength) {
                                            firingLength--;
                                            if (i <= firingIndex) {
                                                firingIndex--
                                            }
                                        }
                                    }
                                    list.splice(i--, 1);
                                    if (flags.unique) {
                                        break
                                    }
                                }
                            }
                        }
                    }
                    return this
                },
                has: function(fn) {
                    if (list) {
                        var i = 0,
                            length = list.length;
                        for (; i < length; i++) {
                            if (fn === list[i]) {
                                return true
                            }
                        }
                    }
                    return false
                },
                empty: function() {
                    list = [];
                    return this
                },
                disable: function() {
                    list = stack = memory = undefined;
                    return this
                },
                disabled: function() {
                    return !list
                },
                lock: function() {
                    stack = undefined;
                    if (!memory || memory === true) {
                        self.disable()
                    }
                    return this
                },
                locked: function() {
                    return !stack
                },
                fireWith: function(context, args) {
                    if (stack) {
                        if (firing) {
                            if (!flags.once) {
                                stack.push([context, args])
                            }
                        } else {
                            if (!(flags.once && memory)) {
                                fire(context, args)
                            }
                        }
                    }
                    return this
                },
                fire: function() {
                    self.fireWith(this, arguments);
                    return this
                },
                fired: function() {
                    return !!fired
                }
            };
        return self
    };
    var sliceDeferred = [].slice;
    jQuery.extend({
        Deferred: function(func) {
            var doneList = jQuery.Callbacks("once memory"),
                failList = jQuery.Callbacks("once memory"),
                progressList = jQuery.Callbacks("memory"),
                state = "pending",
                lists = {
                    resolve: doneList,
                    reject: failList,
                    notify: progressList
                },
                promise = {
                    done: doneList.add,
                    fail: failList.add,
                    progress: progressList.add,
                    state: function() {
                        return state
                    },
                    isResolved: doneList.fired,
                    isRejected: failList.fired,
                    then: function(doneCallbacks, failCallbacks, progressCallbacks) {
                        deferred.done(doneCallbacks).fail(failCallbacks).progress(progressCallbacks);
                        return this
                    },
                    always: function() {
                        deferred.done.apply(deferred, arguments).fail.apply(deferred, arguments);
                        return this
                    },
                    pipe: function(fnDone, fnFail, fnProgress) {
                        return jQuery.Deferred(function(newDefer) {
                            jQuery.each({
                                done: [fnDone, "resolve"],
                                fail: [fnFail, "reject"],
                                progress: [fnProgress, "notify"]
                            }, function(handler, data) {
                                var fn = data[0],
                                    action = data[1],
                                    returned;
                                if (jQuery.isFunction(fn)) {
                                    deferred[handler](function() {
                                        returned = fn.apply(this, arguments);
                                        if (returned && jQuery.isFunction(returned.promise)) {
                                            returned.promise().then(newDefer.resolve, newDefer.reject, newDefer.notify)
                                        } else {
                                            newDefer[action + "With"](this === deferred ? newDefer : this, [returned])
                                        }
                                    })
                                } else {
                                    deferred[handler](newDefer[action])
                                }
                            })
                        }).promise()
                    },
                    promise: function(obj) {
                        if (obj == null) {
                            obj = promise
                        } else {
                            for (var key in promise) {
                                obj[key] = promise[key]
                            }
                        }
                        return obj
                    }
                },
                deferred = promise.promise({}),
                key;
            for (key in lists) {
                deferred[key] = lists[key].fire;
                deferred[key + "With"] = lists[key].fireWith
            }
            deferred.done(function() {
                state = "resolved"
            }, failList.disable, progressList.lock).fail(function() {
                state = "rejected"
            }, doneList.disable, progressList.lock);
            if (func) {
                func.call(deferred, deferred)
            }
            return deferred
        },
        when: function(firstParam) {
            var args = sliceDeferred.call(arguments, 0),
                i = 0,
                length = args.length,
                pValues = new Array(length),
                count = length,
                pCount = length,
                deferred = length <= 1 && firstParam && jQuery.isFunction(firstParam.promise) ? firstParam : jQuery.Deferred(),
                promise = deferred.promise();

            function resolveFunc(i) {
                return function(value) {
                    args[i] = arguments.length > 1 ? sliceDeferred.call(arguments, 0) : value;
                    if (!(--count)) {
                        deferred.resolveWith(deferred, args)
                    }
                }
            }

            function progressFunc(i) {
                return function(value) {
                    pValues[i] = arguments.length > 1 ? sliceDeferred.call(arguments, 0) : value;
                    deferred.notifyWith(promise, pValues)
                }
            }
            if (length > 1) {
                for (; i < length; i++) {
                    if (args[i] && args[i].promise && jQuery.isFunction(args[i].promise)) {
                        args[i].promise().then(resolveFunc(i), deferred.reject, progressFunc(i))
                    } else {
                        --count
                    }
                }
                if (!count) {
                    deferred.resolveWith(deferred, args)
                }
            } else {
                if (deferred !== firstParam) {
                    deferred.resolveWith(deferred, length ? [firstParam] : [])
                }
            }
            return promise
        }
    });
    jQuery.support = (function() {
        var support, all, a, select, opt, input, fragment, tds, events, eventName, i, isSupported, div = document.createElement("div"),
            documentElement = document.documentElement;
        div.setAttribute("className", "t");
        div.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
        all = div.getElementsByTagName("*");
        a = div.getElementsByTagName("a")[0];
        if (!all || !all.length || !a) {
            return {}
        }
        select = document.createElement("select");
        opt = select.appendChild(document.createElement("option"));
        input = div.getElementsByTagName("input")[0];
        support = {
            leadingWhitespace: (div.firstChild.nodeType === 3),
            tbody: !div.getElementsByTagName("tbody").length,
            htmlSerialize: !!div.getElementsByTagName("link").length,
            style: /top/.test(a.getAttribute("style")),
            hrefNormalized: (a.getAttribute("href") === "/a"),
            opacity: /^0.55/.test(a.style.opacity),
            cssFloat: !!a.style.cssFloat,
            checkOn: (input.value === "on"),
            optSelected: opt.selected,
            getSetAttribute: div.className !== "t",
            enctype: !!document.createElement("form").enctype,
            html5Clone: document.createElement("nav").cloneNode(true).outerHTML !== "<:nav></:nav>",
            submitBubbles: true,
            changeBubbles: true,
            focusinBubbles: false,
            deleteExpando: true,
            noCloneEvent: true,
            inlineBlockNeedsLayout: false,
            shrinkWrapBlocks: false,
            reliableMarginRight: true,
            pixelMargin: true
        };
        jQuery.boxModel = support.boxModel = (document.compatMode === "CSS1Compat");
        input.checked = true;
        support.noCloneChecked = input.cloneNode(true).checked;
        select.disabled = true;
        support.optDisabled = !opt.disabled;
        try {
            delete div.test
        } catch (e) {
            support.deleteExpando = false
        }
        if (!div.addEventListener && div.attachEvent && div.fireEvent) {
            div.attachEvent("onclick", function() {
                support.noCloneEvent = false
            });
            div.cloneNode(true).fireEvent("onclick")
        }
        input = document.createElement("input");
        input.value = "t";
        input.setAttribute("type", "radio");
        support.radioValue = input.value === "t";
        input.setAttribute("checked", "checked");
        input.setAttribute("name", "t");
        div.appendChild(input);
        fragment = document.createDocumentFragment();
        fragment.appendChild(div.lastChild);
        support.checkClone = fragment.cloneNode(true).cloneNode(true).lastChild.checked;
        support.appendChecked = input.checked;
        fragment.removeChild(input);
        fragment.appendChild(div);
        if (div.attachEvent) {
            for (i in {
                    submit: 1,
                    change: 1,
                    focusin: 1
                }) {
                eventName = "on" + i;
                isSupported = (eventName in div);
                if (!isSupported) {
                    div.setAttribute(eventName, "return;");
                    isSupported = (typeof div[eventName] === "function")
                }
                support[i + "Bubbles"] = isSupported
            }
        }
        fragment.removeChild(div);
        fragment = select = opt = div = input = null;
        jQuery(function() {
            var container, outer, inner, table, td, offsetSupport, marginDiv, conMarginTop, style, html, positionTopLeftWidthHeight, paddingMarginBorderVisibility, paddingMarginBorder, body = document.getElementsByTagName("body")[0];
            if (!body) {
                return
            }
            conMarginTop = 1;
            paddingMarginBorder = "padding:0;margin:0;border:";
            positionTopLeftWidthHeight = "position:absolute;top:0;left:0;width:1px;height:1px;";
            paddingMarginBorderVisibility = paddingMarginBorder + "0;visibility:hidden;";
            style = "style='" + positionTopLeftWidthHeight + paddingMarginBorder + "5px solid #000;";
            html = "<div " + style + "display:block;'><div style='" + paddingMarginBorder + "0;display:block;overflow:hidden;'></div></div><table " + style + "' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
            container = document.createElement("div");
            container.style.cssText = paddingMarginBorderVisibility + "width:0;height:0;position:static;top:0;margin-top:" + conMarginTop + "px";
            body.insertBefore(container, body.firstChild);
            div = document.createElement("div");
            container.appendChild(div);
            div.innerHTML = "<table><tr><td style='" + paddingMarginBorder + "0;display:none'></td><td>t</td></tr></table>";
            tds = div.getElementsByTagName("td");
            isSupported = (tds[0].offsetHeight === 0);
            tds[0].style.display = "";
            tds[1].style.display = "none";
            support.reliableHiddenOffsets = isSupported && (tds[0].offsetHeight === 0);
            if (window.getComputedStyle) {
                div.innerHTML = "";
                marginDiv = document.createElement("div");
                marginDiv.style.width = "0";
                marginDiv.style.marginRight = "0";
                div.style.width = "2px";
                div.appendChild(marginDiv);
                support.reliableMarginRight = (parseInt((window.getComputedStyle(marginDiv, null) || {
                    marginRight: 0
                }).marginRight, 10) || 0) === 0
            }
            if (typeof div.style.zoom !== "undefined") {
                div.innerHTML = "";
                div.style.width = div.style.padding = "1px";
                div.style.border = 0;
                div.style.overflow = "hidden";
                div.style.display = "inline";
                div.style.zoom = 1;
                support.inlineBlockNeedsLayout = (div.offsetWidth === 3);
                div.style.display = "block";
                div.style.overflow = "visible";
                div.innerHTML = "<div style='width:5px;'></div>";
                support.shrinkWrapBlocks = (div.offsetWidth !== 3)
            }
            div.style.cssText = positionTopLeftWidthHeight + paddingMarginBorderVisibility;
            div.innerHTML = html;
            outer = div.firstChild;
            inner = outer.firstChild;
            td = outer.nextSibling.firstChild.firstChild;
            offsetSupport = {
                doesNotAddBorder: (inner.offsetTop !== 5),
                doesAddBorderForTableAndCells: (td.offsetTop === 5)
            };
            inner.style.position = "fixed";
            inner.style.top = "20px";
            offsetSupport.fixedPosition = (inner.offsetTop === 20 || inner.offsetTop === 15);
            inner.style.position = inner.style.top = "";
            outer.style.overflow = "hidden";
            outer.style.position = "relative";
            offsetSupport.subtractsBorderForOverflowNotVisible = (inner.offsetTop === -5);
            offsetSupport.doesNotIncludeMarginInBodyOffset = (body.offsetTop !== conMarginTop);
            if (window.getComputedStyle) {
                div.style.marginTop = "1%";
                support.pixelMargin = (window.getComputedStyle(div, null) || {
                    marginTop: 0
                }).marginTop !== "1%"
            }
            if (typeof container.style.zoom !== "undefined") {
                container.style.zoom = 1
            }
            body.removeChild(container);
            marginDiv = div = container = null;
            jQuery.extend(support, offsetSupport)
        });
        return support
    })();
    var rbrace = /^(?:\{.*\}|\[.*\])$/,
        rmultiDash = /([A-Z])/g;
    jQuery.extend({
        cache: {},
        uuid: 0,
        expando: "jQuery" + (jQuery.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: true,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: true
        },
        hasData: function(elem) {
            elem = elem.nodeType ? jQuery.cache[elem[jQuery.expando]] : elem[jQuery.expando];
            return !!elem && !isEmptyDataObject(elem)
        },
        data: function(elem, name, data, pvt) {
            if (!jQuery.acceptData(elem)) {
                return
            }
            var privateCache, thisCache, ret, internalKey = jQuery.expando,
                getByName = typeof name === "string",
                isNode = elem.nodeType,
                cache = isNode ? jQuery.cache : elem,
                id = isNode ? elem[internalKey] : elem[internalKey] && internalKey,
                isEvents = name === "events";
            if ((!id || !cache[id] || (!isEvents && !pvt && !cache[id].data)) && getByName && data === undefined) {
                return
            }
            if (!id) {
                if (isNode) {
                    elem[internalKey] = id = ++jQuery.uuid
                } else {
                    id = internalKey
                }
            }
            if (!cache[id]) {
                cache[id] = {};
                if (!isNode) {
                    cache[id].toJSON = jQuery.noop
                }
            }
            if (typeof name === "object" || typeof name === "function") {
                if (pvt) {
                    cache[id] = jQuery.extend(cache[id], name)
                } else {
                    cache[id].data = jQuery.extend(cache[id].data, name)
                }
            }
            privateCache = thisCache = cache[id];
            if (!pvt) {
                if (!thisCache.data) {
                    thisCache.data = {}
                }
                thisCache = thisCache.data
            }
            if (data !== undefined) {
                thisCache[jQuery.camelCase(name)] = data
            }
            if (isEvents && !thisCache[name]) {
                return privateCache.events
            }
            if (getByName) {
                ret = thisCache[name];
                if (ret == null) {
                    ret = thisCache[jQuery.camelCase(name)]
                }
            } else {
                ret = thisCache
            }
            return ret
        },
        removeData: function(elem, name, pvt) {
            if (!jQuery.acceptData(elem)) {
                return
            }
            var thisCache, i, l, internalKey = jQuery.expando,
                isNode = elem.nodeType,
                cache = isNode ? jQuery.cache : elem,
                id = isNode ? elem[internalKey] : internalKey;
            if (!cache[id]) {
                return
            }
            if (name) {
                thisCache = pvt ? cache[id] : cache[id].data;
                if (thisCache) {
                    if (!jQuery.isArray(name)) {
                        if (name in thisCache) {
                            name = [name]
                        } else {
                            name = jQuery.camelCase(name);
                            if (name in thisCache) {
                                name = [name]
                            } else {
                                name = name.split(" ")
                            }
                        }
                    }
                    for (i = 0, l = name.length; i < l; i++) {
                        delete thisCache[name[i]]
                    }
                    if (!(pvt ? isEmptyDataObject : jQuery.isEmptyObject)(thisCache)) {
                        return
                    }
                }
            }
            if (!pvt) {
                delete cache[id].data;
                if (!isEmptyDataObject(cache[id])) {
                    return
                }
            }
            if (jQuery.support.deleteExpando || !cache.setInterval) {
                delete cache[id]
            } else {
                cache[id] = null
            }
            if (isNode) {
                if (jQuery.support.deleteExpando) {
                    delete elem[internalKey]
                } else {
                    if (elem.removeAttribute) {
                        elem.removeAttribute(internalKey)
                    } else {
                        elem[internalKey] = null
                    }
                }
            }
        },
        _data: function(elem, name, data) {
            return jQuery.data(elem, name, data, true)
        },
        acceptData: function(elem) {
            if (elem.nodeName) {
                var match = jQuery.noData[elem.nodeName.toLowerCase()];
                if (match) {
                    return !(match === true || elem.getAttribute("classid") !== match)
                }
            }
            return true
        }
    });
    jQuery.fn.extend({
        data: function(key, value) {
            var parts, part, attr, name, l, elem = this[0],
                i = 0,
                data = null;
            if (key === undefined) {
                if (this.length) {
                    data = jQuery.data(elem);
                    if (elem.nodeType === 1 && !jQuery._data(elem, "parsedAttrs")) {
                        attr = elem.attributes;
                        for (l = attr.length; i < l; i++) {
                            name = attr[i].name;
                            if (name.indexOf("data-") === 0) {
                                name = jQuery.camelCase(name.substring(5));
                                dataAttr(elem, name, data[name])
                            }
                        }
                        jQuery._data(elem, "parsedAttrs", true)
                    }
                }
                return data
            }
            if (typeof key === "object") {
                return this.each(function() {
                    jQuery.data(this, key)
                })
            }
            parts = key.split(".", 2);
            parts[1] = parts[1] ? "." + parts[1] : "";
            part = parts[1] + "!";
            return jQuery.access(this, function(value) {
                if (value === undefined) {
                    data = this.triggerHandler("getData" + part, [parts[0]]);
                    if (data === undefined && elem) {
                        data = jQuery.data(elem, key);
                        data = dataAttr(elem, key, data)
                    }
                    return data === undefined && parts[1] ? this.data(parts[0]) : data
                }
                parts[1] = value;
                this.each(function() {
                    var self = jQuery(this);
                    self.triggerHandler("setData" + part, parts);
                    jQuery.data(this, key, value);
                    self.triggerHandler("changeData" + part, parts)
                })
            }, null, value, arguments.length > 1, null, false)
        },
        removeData: function(key) {
            return this.each(function() {
                jQuery.removeData(this, key)
            })
        }
    });

    function dataAttr(elem, key, data) {
        if (data === undefined && elem.nodeType === 1) {
            var name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();
            data = elem.getAttribute(name);
            if (typeof data === "string") {
                try {
                    data = data === "true" ? true : data === "false" ? false : data === "null" ? null : jQuery.isNumeric(data) ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data
                } catch (e) {}
                jQuery.data(elem, key, data)
            } else {
                data = undefined
            }
        }
        return data
    }

    function isEmptyDataObject(obj) {
        for (var name in obj) {
            if (name === "data" && jQuery.isEmptyObject(obj[name])) {
                continue
            }
            if (name !== "toJSON") {
                return false
            }
        }
        return true
    }

    function handleQueueMarkDefer(elem, type, src) {
        var deferDataKey = type + "defer",
            queueDataKey = type + "queue",
            markDataKey = type + "mark",
            defer = jQuery._data(elem, deferDataKey);
        if (defer && (src === "queue" || !jQuery._data(elem, queueDataKey)) && (src === "mark" || !jQuery._data(elem, markDataKey))) {
            setTimeout(function() {
                if (!jQuery._data(elem, queueDataKey) && !jQuery._data(elem, markDataKey)) {
                    jQuery.removeData(elem, deferDataKey, true);
                    defer.fire()
                }
            }, 0)
        }
    }
    jQuery.extend({
        _mark: function(elem, type) {
            if (elem) {
                type = (type || "fx") + "mark";
                jQuery._data(elem, type, (jQuery._data(elem, type) || 0) + 1)
            }
        },
        _unmark: function(force, elem, type) {
            if (force !== true) {
                type = elem;
                elem = force;
                force = false
            }
            if (elem) {
                type = type || "fx";
                var key = type + "mark",
                    count = force ? 0 : ((jQuery._data(elem, key) || 1) - 1);
                if (count) {
                    jQuery._data(elem, key, count)
                } else {
                    jQuery.removeData(elem, key, true);
                    handleQueueMarkDefer(elem, type, "mark")
                }
            }
        },
        queue: function(elem, type, data) {
            var q;
            if (elem) {
                type = (type || "fx") + "queue";
                q = jQuery._data(elem, type);
                if (data) {
                    if (!q || jQuery.isArray(data)) {
                        q = jQuery._data(elem, type, jQuery.makeArray(data))
                    } else {
                        q.push(data)
                    }
                }
                return q || []
            }
        },
        dequeue: function(elem, type) {
            type = type || "fx";
            var queue = jQuery.queue(elem, type),
                fn = queue.shift(),
                hooks = {};
            if (fn === "inprogress") {
                fn = queue.shift()
            }
            if (fn) {
                if (type === "fx") {
                    queue.unshift("inprogress")
                }
                jQuery._data(elem, type + ".run", hooks);
                fn.call(elem, function() {
                    jQuery.dequeue(elem, type)
                }, hooks)
            }
            if (!queue.length) {
                jQuery.removeData(elem, type + "queue " + type + ".run", true);
                handleQueueMarkDefer(elem, type, "queue")
            }
        }
    });
    jQuery.fn.extend({
        queue: function(type, data) {
            var setter = 2;
            if (typeof type !== "string") {
                data = type;
                type = "fx";
                setter--
            }
            if (arguments.length < setter) {
                return jQuery.queue(this[0], type)
            }
            return data === undefined ? this : this.each(function() {
                var queue = jQuery.queue(this, type, data);
                if (type === "fx" && queue[0] !== "inprogress") {
                    jQuery.dequeue(this, type)
                }
            })
        },
        dequeue: function(type) {
            return this.each(function() {
                jQuery.dequeue(this, type)
            })
        },
        delay: function(time, type) {
            time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
            type = type || "fx";
            return this.queue(type, function(next, hooks) {
                var timeout = setTimeout(next, time);
                hooks.stop = function() {
                    clearTimeout(timeout)
                }
            })
        },
        clearQueue: function(type) {
            return this.queue(type || "fx", [])
        },
        promise: function(type, object) {
            if (typeof type !== "string") {
                object = type;
                type = undefined
            }
            type = type || "fx";
            var defer = jQuery.Deferred(),
                elements = this,
                i = elements.length,
                count = 1,
                deferDataKey = type + "defer",
                queueDataKey = type + "queue",
                markDataKey = type + "mark",
                tmp;

            function resolve() {
                if (!(--count)) {
                    defer.resolveWith(elements, [elements])
                }
            }
            while (i--) {
                if ((tmp = jQuery.data(elements[i], deferDataKey, undefined, true) || (jQuery.data(elements[i], queueDataKey, undefined, true) || jQuery.data(elements[i], markDataKey, undefined, true)) && jQuery.data(elements[i], deferDataKey, jQuery.Callbacks("once memory"), true))) {
                    count++;
                    tmp.add(resolve)
                }
            }
            resolve();
            return defer.promise(object)
        }
    });
    var rclass = /[\n\t\r]/g,
        rspace = /\s+/,
        rreturn = /\r/g,
        rtype = /^(?:button|input)$/i,
        rfocusable = /^(?:button|input|object|select|textarea)$/i,
        rclickable = /^a(?:rea)?$/i,
        rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
        getSetAttribute = jQuery.support.getSetAttribute,
        nodeHook, boolHook, fixSpecified;
    jQuery.fn.extend({
        attr: function(name, value) {
            return jQuery.access(this, jQuery.attr, name, value, arguments.length > 1)
        },
        removeAttr: function(name) {
            return this.each(function() {
                jQuery.removeAttr(this, name)
            })
        },
        prop: function(name, value) {
            return jQuery.access(this, jQuery.prop, name, value, arguments.length > 1)
        },
        removeProp: function(name) {
            name = jQuery.propFix[name] || name;
            return this.each(function() {
                try {
                    this[name] = undefined;
                    delete this[name]
                } catch (e) {}
            })
        },
        addClass: function(value) {
            var classNames, i, l, elem, setClass, c, cl;
            if (jQuery.isFunction(value)) {
                return this.each(function(j) {
                    jQuery(this).addClass(value.call(this, j, this.className))
                })
            }
            if (value && typeof value === "string") {
                classNames = value.split(rspace);
                for (i = 0, l = this.length; i < l; i++) {
                    elem = this[i];
                    if (elem.nodeType === 1) {
                        if (!elem.className && classNames.length === 1) {
                            elem.className = value
                        } else {
                            setClass = " " + elem.className + " ";
                            for (c = 0, cl = classNames.length; c < cl; c++) {
                                if (!~setClass.indexOf(" " + classNames[c] + " ")) {
                                    setClass += classNames[c] + " "
                                }
                            }
                            elem.className = jQuery.trim(setClass)
                        }
                    }
                }
            }
            return this
        },
        removeClass: function(value) {
            var classNames, i, l, elem, className, c, cl;
            if (jQuery.isFunction(value)) {
                return this.each(function(j) {
                    jQuery(this).removeClass(value.call(this, j, this.className))
                })
            }
            if ((value && typeof value === "string") || value === undefined) {
                classNames = (value || "").split(rspace);
                for (i = 0, l = this.length; i < l; i++) {
                    elem = this[i];
                    if (elem.nodeType === 1 && elem.className) {
                        if (value) {
                            className = (" " + elem.className + " ").replace(rclass, " ");
                            for (c = 0, cl = classNames.length; c < cl; c++) {
                                className = className.replace(" " + classNames[c] + " ", " ")
                            }
                            elem.className = jQuery.trim(className)
                        } else {
                            elem.className = ""
                        }
                    }
                }
            }
            return this
        },
        toggleClass: function(value, stateVal) {
            var type = typeof value,
                isBool = typeof stateVal === "boolean";
            if (jQuery.isFunction(value)) {
                return this.each(function(i) {
                    jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal)
                })
            }
            return this.each(function() {
                if (type === "string") {
                    var className, i = 0,
                        self = jQuery(this),
                        state = stateVal,
                        classNames = value.split(rspace);
                    while ((className = classNames[i++])) {
                        state = isBool ? state : !self.hasClass(className);
                        self[state ? "addClass" : "removeClass"](className)
                    }
                } else {
                    if (type === "undefined" || type === "boolean") {
                        if (this.className) {
                            jQuery._data(this, "__className__", this.className)
                        }
                        this.className = this.className || value === false ? "" : jQuery._data(this, "__className__") || ""
                    }
                }
            })
        },
        hasClass: function(selector) {
            var className = " " + selector + " ",
                i = 0,
                l = this.length;
            for (; i < l; i++) {
                if (this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) > -1) {
                    return true
                }
            }
            return false
        },
        val: function(value) {
            var hooks, ret, isFunction, elem = this[0];
            if (!arguments.length) {
                if (elem) {
                    hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
                    if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
                        return ret
                    }
                    ret = elem.value;
                    return typeof ret === "string" ? ret.replace(rreturn, "") : ret == null ? "" : ret
                }
                return
            }
            isFunction = jQuery.isFunction(value);
            return this.each(function(i) {
                var self = jQuery(this),
                    val;
                if (this.nodeType !== 1) {
                    return
                }
                if (isFunction) {
                    val = value.call(this, i, self.val())
                } else {
                    val = value
                }
                if (val == null) {
                    val = ""
                } else {
                    if (typeof val === "number") {
                        val += ""
                    } else {
                        if (jQuery.isArray(val)) {
                            val = jQuery.map(val, function(value) {
                                return value == null ? "" : value + ""
                            })
                        }
                    }
                }
                hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
                if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
                    this.value = val
                }
            })
        }
    });
    jQuery.extend({
        valHooks: {
            option: {
                get: function(elem) {
                    var val = elem.attributes.value;
                    return !val || val.specified ? elem.value : elem.text
                }
            },
            select: {
                get: function(elem) {
                    var value, i, max, option, index = elem.selectedIndex,
                        values = [],
                        options = elem.options,
                        one = elem.type === "select-one";
                    if (index < 0) {
                        return null
                    }
                    i = one ? index : 0;
                    max = one ? index + 1 : options.length;
                    for (; i < max; i++) {
                        option = options[i];
                        if (option.selected && (jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
                            value = jQuery(option).val();
                            if (one) {
                                return value
                            }
                            values.push(value)
                        }
                    }
                    if (one && !values.length && options.length) {
                        return jQuery(options[index]).val()
                    }
                    return values
                },
                set: function(elem, value) {
                    var values = jQuery.makeArray(value);
                    jQuery(elem).find("option").each(function() {
                        this.selected = jQuery.inArray(jQuery(this).val(), values) >= 0
                    });
                    if (!values.length) {
                        elem.selectedIndex = -1
                    }
                    return values
                }
            }
        },
        attrFn: {
            val: true,
            css: true,
            html: true,
            text: true,
            data: true,
            width: true,
            height: true,
            offset: true
        },
        attr: function(elem, name, value, pass) {
            var ret, hooks, notxml, nType = elem.nodeType;
            if (!elem || nType === 3 || nType === 8 || nType === 2) {
                return
            }
            if (pass && name in jQuery.attrFn) {
                return jQuery(elem)[name](value)
            }
            if (typeof elem.getAttribute === "undefined") {
                return jQuery.prop(elem, name, value)
            }
            notxml = nType !== 1 || !jQuery.isXMLDoc(elem);
            if (notxml) {
                name = name.toLowerCase();
                hooks = jQuery.attrHooks[name] || (rboolean.test(name) ? boolHook : nodeHook)
            }
            if (value !== undefined) {
                if (value === null) {
                    jQuery.removeAttr(elem, name);
                    return
                } else {
                    if (hooks && "set" in hooks && notxml && (ret = hooks.set(elem, value, name)) !== undefined) {
                        return ret
                    } else {
                        elem.setAttribute(name, "" + value);
                        return value
                    }
                }
            } else {
                if (hooks && "get" in hooks && notxml && (ret = hooks.get(elem, name)) !== null) {
                    return ret
                } else {
                    ret = elem.getAttribute(name);
                    return ret === null ? undefined : ret
                }
            }
        },
        removeAttr: function(elem, value) {
            var propName, attrNames, name, l, isBool, i = 0;
            if (value && elem.nodeType === 1) {
                attrNames = value.toLowerCase().split(rspace);
                l = attrNames.length;
                for (; i < l; i++) {
                    name = attrNames[i];
                    if (name) {
                        propName = jQuery.propFix[name] || name;
                        isBool = rboolean.test(name);
                        if (!isBool) {
                            jQuery.attr(elem, name, "")
                        }
                        elem.removeAttribute(getSetAttribute ? name : propName);
                        if (isBool && propName in elem) {
                            elem[propName] = false
                        }
                    }
                }
            }
        },
        attrHooks: {
            type: {
                set: function(elem, value) {
                    if (rtype.test(elem.nodeName) && elem.parentNode) {
                        jQuery.error("type property can't be changed")
                    } else {
                        if (!jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input")) {
                            var val = elem.value;
                            elem.setAttribute("type", value);
                            if (val) {
                                elem.value = val
                            }
                            return value
                        }
                    }
                }
            },
            value: {
                get: function(elem, name) {
                    if (nodeHook && jQuery.nodeName(elem, "button")) {
                        return nodeHook.get(elem, name)
                    }
                    return name in elem ? elem.value : null
                },
                set: function(elem, value, name) {
                    if (nodeHook && jQuery.nodeName(elem, "button")) {
                        return nodeHook.set(elem, value, name)
                    }
                    elem.value = value
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function(elem, name, value) {
            var ret, hooks, notxml, nType = elem.nodeType;
            if (!elem || nType === 3 || nType === 8 || nType === 2) {
                return
            }
            notxml = nType !== 1 || !jQuery.isXMLDoc(elem);
            if (notxml) {
                name = jQuery.propFix[name] || name;
                hooks = jQuery.propHooks[name]
            }
            if (value !== undefined) {
                if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
                    return ret
                } else {
                    return (elem[name] = value)
                }
            } else {
                if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
                    return ret
                } else {
                    return elem[name]
                }
            }
        },
        propHooks: {
            tabIndex: {
                get: function(elem) {
                    var attributeNode = elem.getAttributeNode("tabindex");
                    return attributeNode && attributeNode.specified ? parseInt(attributeNode.value, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : undefined
                }
            }
        }
    });
    jQuery.attrHooks.tabindex = jQuery.propHooks.tabIndex;
    boolHook = {
        get: function(elem, name) {
            var attrNode, property = jQuery.prop(elem, name);
            return property === true || typeof property !== "boolean" && (attrNode = elem.getAttributeNode(name)) && attrNode.nodeValue !== false ? name.toLowerCase() : undefined
        },
        set: function(elem, value, name) {
            var propName;
            if (value === false) {
                jQuery.removeAttr(elem, name)
            } else {
                propName = jQuery.propFix[name] || name;
                if (propName in elem) {
                    elem[propName] = true
                }
                elem.setAttribute(name, name.toLowerCase())
            }
            return name
        }
    };
    if (!getSetAttribute) {
        fixSpecified = {
            name: true,
            id: true,
            coords: true
        };
        nodeHook = jQuery.valHooks.button = {
            get: function(elem, name) {
                var ret;
                ret = elem.getAttributeNode(name);
                return ret && (fixSpecified[name] ? ret.nodeValue !== "" : ret.specified) ? ret.nodeValue : undefined
            },
            set: function(elem, value, name) {
                var ret = elem.getAttributeNode(name);
                if (!ret) {
                    ret = document.createAttribute(name);
                    elem.setAttributeNode(ret)
                }
                return (ret.nodeValue = value + "")
            }
        };
        jQuery.attrHooks.tabindex.set = nodeHook.set;
        jQuery.each(["width", "height"], function(i, name) {
            jQuery.attrHooks[name] = jQuery.extend(jQuery.attrHooks[name], {
                set: function(elem, value) {
                    if (value === "") {
                        elem.setAttribute(name, "auto");
                        return value
                    }
                }
            })
        });
        jQuery.attrHooks.contenteditable = {
            get: nodeHook.get,
            set: function(elem, value, name) {
                if (value === "") {
                    value = "false"
                }
                nodeHook.set(elem, value, name)
            }
        }
    }
    if (!jQuery.support.hrefNormalized) {
        jQuery.each(["href", "src", "width", "height"], function(i, name) {
            jQuery.attrHooks[name] = jQuery.extend(jQuery.attrHooks[name], {
                get: function(elem) {
                    var ret = elem.getAttribute(name, 2);
                    return ret === null ? undefined : ret
                }
            })
        })
    }
    if (!jQuery.support.style) {
        jQuery.attrHooks.style = {
            get: function(elem) {
                return elem.style.cssText.toLowerCase() || undefined
            },
            set: function(elem, value) {
                return (elem.style.cssText = "" + value)
            }
        }
    }
    if (!jQuery.support.optSelected) {
        jQuery.propHooks.selected = jQuery.extend(jQuery.propHooks.selected, {
            get: function(elem) {
                var parent = elem.parentNode;
                if (parent) {
                    parent.selectedIndex;
                    if (parent.parentNode) {
                        parent.parentNode.selectedIndex
                    }
                }
                return null
            }
        })
    }
    if (!jQuery.support.enctype) {
        jQuery.propFix.enctype = "encoding"
    }
    if (!jQuery.support.checkOn) {
        jQuery.each(["radio", "checkbox"], function() {
            jQuery.valHooks[this] = {
                get: function(elem) {
                    return elem.getAttribute("value") === null ? "on" : elem.value
                }
            }
        })
    }
    jQuery.each(["radio", "checkbox"], function() {
        jQuery.valHooks[this] = jQuery.extend(jQuery.valHooks[this], {
            set: function(elem, value) {
                if (jQuery.isArray(value)) {
                    return (elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0)
                }
            }
        })
    });
    var rformElems = /^(?:textarea|input|select)$/i,
        rtypenamespace = /^([^\.]*)?(?:\.(.+))?$/,
        rhoverHack = /(?:^|\s)hover(\.\S+)?\b/,
        rkeyEvent = /^key/,
        rmouseEvent = /^(?:mouse|contextmenu)|click/,
        rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
        rquickIs = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,
        quickParse = function(selector) {
            var quick = rquickIs.exec(selector);
            if (quick) {
                quick[1] = (quick[1] || "").toLowerCase();
                quick[3] = quick[3] && new RegExp("(?:^|\\s)" + quick[3] + "(?:\\s|$)")
            }
            return quick
        },
        quickIs = function(elem, m) {
            var attrs = elem.attributes || {};
            return ((!m[1] || elem.nodeName.toLowerCase() === m[1]) && (!m[2] || (attrs.id || {}).value === m[2]) && (!m[3] || m[3].test((attrs["class"] || {}).value)))
        },
        hoverHack = function(events) {
            return jQuery.event.special.hover ? events : events.replace(rhoverHack, "mouseenter$1 mouseleave$1")
        };
    jQuery.event = {
        add: function(elem, types, handler, data, selector) {
            var elemData, eventHandle, events, t, tns, type, namespaces, handleObj, handleObjIn, quick, handlers, special;
            if (elem.nodeType === 3 || elem.nodeType === 8 || !types || !handler || !(elemData = jQuery._data(elem))) {
                return
            }
            if (handler.handler) {
                handleObjIn = handler;
                handler = handleObjIn.handler;
                selector = handleObjIn.selector
            }
            if (!handler.guid) {
                handler.guid = jQuery.guid++
            }
            events = elemData.events;
            if (!events) {
                elemData.events = events = {}
            }
            eventHandle = elemData.handle;
            if (!eventHandle) {
                elemData.handle = eventHandle = function(e) {
                    return typeof jQuery !== "undefined" && (!e || jQuery.event.triggered !== e.type) ? jQuery.event.dispatch.apply(eventHandle.elem, arguments) : undefined
                };
                eventHandle.elem = elem
            }
            types = jQuery.trim(hoverHack(types)).split(" ");
            for (t = 0; t < types.length; t++) {
                tns = rtypenamespace.exec(types[t]) || [];
                type = tns[1];
                namespaces = (tns[2] || "").split(".").sort();
                special = jQuery.event.special[type] || {};
                type = (selector ? special.delegateType : special.bindType) || type;
                special = jQuery.event.special[type] || {};
                handleObj = jQuery.extend({
                    type: type,
                    origType: tns[1],
                    data: data,
                    handler: handler,
                    guid: handler.guid,
                    selector: selector,
                    quick: selector && quickParse(selector),
                    namespace: namespaces.join(".")
                }, handleObjIn);
                handlers = events[type];
                if (!handlers) {
                    handlers = events[type] = [];
                    handlers.delegateCount = 0;
                    if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
                        if (elem.addEventListener) {
                            elem.addEventListener(type, eventHandle, false)
                        } else {
                            if (elem.attachEvent) {
                                elem.attachEvent("on" + type, eventHandle)
                            }
                        }
                    }
                }
                if (special.add) {
                    special.add.call(elem, handleObj);
                    if (!handleObj.handler.guid) {
                        handleObj.handler.guid = handler.guid
                    }
                }
                if (selector) {
                    handlers.splice(handlers.delegateCount++, 0, handleObj)
                } else {
                    handlers.push(handleObj)
                }
                jQuery.event.global[type] = true
            }
            elem = null
        },
        global: {},
        remove: function(elem, types, handler, selector, mappedTypes) {
            var elemData = jQuery.hasData(elem) && jQuery._data(elem),
                t, tns, type, origType, namespaces, origCount, j, events, special, handle, eventType, handleObj;
            if (!elemData || !(events = elemData.events)) {
                return
            }
            types = jQuery.trim(hoverHack(types || "")).split(" ");
            for (t = 0; t < types.length; t++) {
                tns = rtypenamespace.exec(types[t]) || [];
                type = origType = tns[1];
                namespaces = tns[2];
                if (!type) {
                    for (type in events) {
                        jQuery.event.remove(elem, type + types[t], handler, selector, true)
                    }
                    continue
                }
                special = jQuery.event.special[type] || {};
                type = (selector ? special.delegateType : special.bindType) || type;
                eventType = events[type] || [];
                origCount = eventType.length;
                namespaces = namespaces ? new RegExp("(^|\\.)" + namespaces.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
                for (j = 0; j < eventType.length; j++) {
                    handleObj = eventType[j];
                    if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!namespaces || namespaces.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
                        eventType.splice(j--, 1);
                        if (handleObj.selector) {
                            eventType.delegateCount--
                        }
                        if (special.remove) {
                            special.remove.call(elem, handleObj)
                        }
                    }
                }
                if (eventType.length === 0 && origCount !== eventType.length) {
                    if (!special.teardown || special.teardown.call(elem, namespaces) === false) {
                        jQuery.removeEvent(elem, type, elemData.handle)
                    }
                    delete events[type]
                }
            }
            if (jQuery.isEmptyObject(events)) {
                handle = elemData.handle;
                if (handle) {
                    handle.elem = null
                }
                jQuery.removeData(elem, ["events", "handle"], true)
            }
        },
        customEvent: {
            getData: true,
            setData: true,
            changeData: true
        },
        trigger: function(event, data, elem, onlyHandlers) {
            if (elem && (elem.nodeType === 3 || elem.nodeType === 8)) {
                return
            }
            var type = event.type || event,
                namespaces = [],
                cache, exclusive, i, cur, old, ontype, special, handle, eventPath, bubbleType;
            if (rfocusMorph.test(type + jQuery.event.triggered)) {
                return
            }
            if (type.indexOf("!") >= 0) {
                type = type.slice(0, -1);
                exclusive = true
            }
            if (type.indexOf(".") >= 0) {
                namespaces = type.split(".");
                type = namespaces.shift();
                namespaces.sort()
            }
            if ((!elem || jQuery.event.customEvent[type]) && !jQuery.event.global[type]) {
                return
            }
            event = typeof event === "object" ? event[jQuery.expando] ? event : new jQuery.Event(type, event) : new jQuery.Event(type);
            event.type = type;
            event.isTrigger = true;
            event.exclusive = exclusive;
            event.namespace = namespaces.join(".");
            event.namespace_re = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
            ontype = type.indexOf(":") < 0 ? "on" + type : "";
            if (!elem) {
                cache = jQuery.cache;
                for (i in cache) {
                    if (cache[i].events && cache[i].events[type]) {
                        jQuery.event.trigger(event, data, cache[i].handle.elem, true)
                    }
                }
                return
            }
            event.result = undefined;
            if (!event.target) {
                event.target = elem
            }
            data = data != null ? jQuery.makeArray(data) : [];
            data.unshift(event);
            special = jQuery.event.special[type] || {};
            if (special.trigger && special.trigger.apply(elem, data) === false) {
                return
            }
            eventPath = [
                [elem, special.bindType || type]
            ];
            if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
                bubbleType = special.delegateType || type;
                cur = rfocusMorph.test(bubbleType + type) ? elem : elem.parentNode;
                old = null;
                for (; cur; cur = cur.parentNode) {
                    eventPath.push([cur, bubbleType]);
                    old = cur
                }
                if (old && old === elem.ownerDocument) {
                    eventPath.push([old.defaultView || old.parentWindow || window, bubbleType])
                }
            }
            for (i = 0; i < eventPath.length && !event.isPropagationStopped(); i++) {
                cur = eventPath[i][0];
                event.type = eventPath[i][1];
                handle = (jQuery._data(cur, "events") || {})[event.type] && jQuery._data(cur, "handle");
                if (handle) {
                    handle.apply(cur, data)
                }
                handle = ontype && cur[ontype];
                if (handle && jQuery.acceptData(cur) && handle.apply(cur, data) === false) {
                    event.preventDefault()
                }
            }
            event.type = type;
            if (!onlyHandlers && !event.isDefaultPrevented()) {
                if ((!special._default || special._default.apply(elem.ownerDocument, data) === false) && !(type === "click" && jQuery.nodeName(elem, "a")) && jQuery.acceptData(elem)) {
                    if (ontype && elem[type] && ((type !== "focus" && type !== "blur") || event.target.offsetWidth !== 0) && !jQuery.isWindow(elem)) {
                        old = elem[ontype];
                        if (old) {
                            elem[ontype] = null
                        }
                        jQuery.event.triggered = type;
                        elem[type]();
                        jQuery.event.triggered = undefined;
                        if (old) {
                            elem[ontype] = old
                        }
                    }
                }
            }
            return event.result
        },
        dispatch: function(event) {
            event = jQuery.event.fix(event || window.event);
            var handlers = ((jQuery._data(this, "events") || {})[event.type] || []),
                delegateCount = handlers.delegateCount,
                args = [].slice.call(arguments, 0),
                run_all = !event.exclusive && !event.namespace,
                special = jQuery.event.special[event.type] || {},
                handlerQueue = [],
                i, j, cur, jqcur, ret, selMatch, matched, matches, handleObj, sel, related;
            args[0] = event;
            event.delegateTarget = this;
            if (special.preDispatch && special.preDispatch.call(this, event) === false) {
                return
            }
            if (delegateCount && !(event.button && event.type === "click")) {
                jqcur = jQuery(this);
                jqcur.context = this.ownerDocument || this;
                for (cur = event.target; cur != this; cur = cur.parentNode || this) {
                    if (cur.disabled !== true) {
                        selMatch = {};
                        matches = [];
                        jqcur[0] = cur;
                        for (i = 0; i < delegateCount; i++) {
                            handleObj = handlers[i];
                            sel = handleObj.selector;
                            if (selMatch[sel] === undefined) {
                                selMatch[sel] = (handleObj.quick ? quickIs(cur, handleObj.quick) : jqcur.is(sel))
                            }
                            if (selMatch[sel]) {
                                matches.push(handleObj)
                            }
                        }
                        if (matches.length) {
                            handlerQueue.push({
                                elem: cur,
                                matches: matches
                            })
                        }
                    }
                }
            }
            if (handlers.length > delegateCount) {
                handlerQueue.push({
                    elem: this,
                    matches: handlers.slice(delegateCount)
                })
            }
            for (i = 0; i < handlerQueue.length && !event.isPropagationStopped(); i++) {
                matched = handlerQueue[i];
                event.currentTarget = matched.elem;
                for (j = 0; j < matched.matches.length && !event.isImmediatePropagationStopped(); j++) {
                    handleObj = matched.matches[j];
                    if (run_all || (!event.namespace && !handleObj.namespace) || event.namespace_re && event.namespace_re.test(handleObj.namespace)) {
                        event.data = handleObj.data;
                        event.handleObj = handleObj;
                        ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
                        if (ret !== undefined) {
                            event.result = ret;
                            if (ret === false) {
                                event.preventDefault();
                                event.stopPropagation()
                            }
                        }
                    }
                }
            }
            if (special.postDispatch) {
                special.postDispatch.call(this, event)
            }
            return event.result
        },
        props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(event, original) {
                if (event.which == null) {
                    event.which = original.charCode != null ? original.charCode : original.keyCode
                }
                return event
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(event, original) {
                var eventDoc, doc, body, button = original.button,
                    fromElement = original.fromElement;
                if (event.pageX == null && original.clientX != null) {
                    eventDoc = event.target.ownerDocument || document;
                    doc = eventDoc.documentElement;
                    body = eventDoc.body;
                    event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
                    event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0)
                }
                if (!event.relatedTarget && fromElement) {
                    event.relatedTarget = fromElement === event.target ? original.toElement : fromElement
                }
                if (!event.which && button !== undefined) {
                    event.which = (button & 1 ? 1 : (button & 2 ? 3 : (button & 4 ? 2 : 0)))
                }
                return event
            }
        },
        fix: function(event) {
            if (event[jQuery.expando]) {
                return event
            }
            var i, prop, originalEvent = event,
                fixHook = jQuery.event.fixHooks[event.type] || {},
                copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;
            event = jQuery.Event(originalEvent);
            for (i = copy.length; i;) {
                prop = copy[--i];
                event[prop] = originalEvent[prop]
            }
            if (!event.target) {
                event.target = originalEvent.srcElement || document
            }
            if (event.target.nodeType === 3) {
                event.target = event.target.parentNode
            }
            if (event.metaKey === undefined) {
                event.metaKey = event.ctrlKey
            }
            return fixHook.filter ? fixHook.filter(event, originalEvent) : event
        },
        special: {
            ready: {
                setup: jQuery.bindReady
            },
            load: {
                noBubble: true
            },
            focus: {
                delegateType: "focusin"
            },
            blur: {
                delegateType: "focusout"
            },
            beforeunload: {
                setup: function(data, namespaces, eventHandle) {
                    if (jQuery.isWindow(this)) {
                        this.onbeforeunload = eventHandle
                    }
                },
                teardown: function(namespaces, eventHandle) {
                    if (this.onbeforeunload === eventHandle) {
                        this.onbeforeunload = null
                    }
                }
            }
        },
        simulate: function(type, elem, event, bubble) {
            var e = jQuery.extend(new jQuery.Event(), event, {
                type: type,
                isSimulated: true,
                originalEvent: {}
            });
            if (bubble) {
                jQuery.event.trigger(e, null, elem)
            } else {
                jQuery.event.dispatch.call(elem, e)
            }
            if (e.isDefaultPrevented()) {
                event.preventDefault()
            }
        }
    };
    jQuery.event.handle = jQuery.event.dispatch;
    jQuery.removeEvent = document.removeEventListener ? function(elem, type, handle) {
        if (elem.removeEventListener) {
            elem.removeEventListener(type, handle, false)
        }
    } : function(elem, type, handle) {
        if (elem.detachEvent) {
            elem.detachEvent("on" + type, handle)
        }
    };
    jQuery.Event = function(src, props) {
        if (!(this instanceof jQuery.Event)) {
            return new jQuery.Event(src, props)
        }
        if (src && src.type) {
            this.originalEvent = src;
            this.type = src.type;
            this.isDefaultPrevented = (src.defaultPrevented || src.returnValue === false || src.getPreventDefault && src.getPreventDefault()) ? returnTrue : returnFalse
        } else {
            this.type = src
        }
        if (props) {
            jQuery.extend(this, props)
        }
        this.timeStamp = src && src.timeStamp || jQuery.now();
        this[jQuery.expando] = true
    };

    function returnFalse() {
        return false
    }

    function returnTrue() {
        return true
    }
    jQuery.Event.prototype = {
        preventDefault: function() {
            this.isDefaultPrevented = returnTrue;
            var e = this.originalEvent;
            if (!e) {
                return
            }
            if (e.preventDefault) {
                e.preventDefault()
            } else {
                e.returnValue = false
            }
        },
        stopPropagation: function() {
            this.isPropagationStopped = returnTrue;
            var e = this.originalEvent;
            if (!e) {
                return
            }
            if (e.stopPropagation) {
                e.stopPropagation()
            }
            e.cancelBubble = true
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = returnTrue;
            this.stopPropagation()
        },
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse
    };
    jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(orig, fix) {
        jQuery.event.special[orig] = {
            delegateType: fix,
            bindType: fix,
            handle: function(event) {
                var target = this,
                    related = event.relatedTarget,
                    handleObj = event.handleObj,
                    selector = handleObj.selector,
                    ret;
                if (!related || (related !== target && !jQuery.contains(target, related))) {
                    event.type = handleObj.origType;
                    ret = handleObj.handler.apply(this, arguments);
                    event.type = fix
                }
                return ret
            }
        }
    });
    if (!jQuery.support.submitBubbles) {
        jQuery.event.special.submit = {
            setup: function() {
                if (jQuery.nodeName(this, "form")) {
                    return false
                }
                jQuery.event.add(this, "click._submit keypress._submit", function(e) {
                    var elem = e.target,
                        form = jQuery.nodeName(elem, "input") || jQuery.nodeName(elem, "button") ? elem.form : undefined;
                    if (form && !form._submit_attached) {
                        jQuery.event.add(form, "submit._submit", function(event) {
                            event._submit_bubble = true
                        });
                        form._submit_attached = true
                    }
                })
            },
            postDispatch: function(event) {
                if (event._submit_bubble) {
                    delete event._submit_bubble;
                    if (this.parentNode && !event.isTrigger) {
                        jQuery.event.simulate("submit", this.parentNode, event, true)
                    }
                }
            },
            teardown: function() {
                if (jQuery.nodeName(this, "form")) {
                    return false
                }
                jQuery.event.remove(this, "._submit")
            }
        }
    }
    if (!jQuery.support.changeBubbles) {
        jQuery.event.special.change = {
            setup: function() {
                if (rformElems.test(this.nodeName)) {
                    if (this.type === "checkbox" || this.type === "radio") {
                        jQuery.event.add(this, "propertychange._change", function(event) {
                            if (event.originalEvent.propertyName === "checked") {
                                this._just_changed = true
                            }
                        });
                        jQuery.event.add(this, "click._change", function(event) {
                            if (this._just_changed && !event.isTrigger) {
                                this._just_changed = false;
                                jQuery.event.simulate("change", this, event, true)
                            }
                        })
                    }
                    return false
                }
                jQuery.event.add(this, "beforeactivate._change", function(e) {
                    var elem = e.target;
                    if (rformElems.test(elem.nodeName) && !elem._change_attached) {
                        jQuery.event.add(elem, "change._change", function(event) {
                            if (this.parentNode && !event.isSimulated && !event.isTrigger) {
                                jQuery.event.simulate("change", this.parentNode, event, true)
                            }
                        });
                        elem._change_attached = true
                    }
                })
            },
            handle: function(event) {
                var elem = event.target;
                if (this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox")) {
                    return event.handleObj.handler.apply(this, arguments)
                }
            },
            teardown: function() {
                jQuery.event.remove(this, "._change");
                return rformElems.test(this.nodeName)
            }
        }
    }
    if (!jQuery.support.focusinBubbles) {
        jQuery.each({
            focus: "focusin",
            blur: "focusout"
        }, function(orig, fix) {
            var attaches = 0,
                handler = function(event) {
                    jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), true)
                };
            jQuery.event.special[fix] = {
                setup: function() {
                    if (attaches++ === 0) {
                        document.addEventListener(orig, handler, true)
                    }
                },
                teardown: function() {
                    if (--attaches === 0) {
                        document.removeEventListener(orig, handler, true)
                    }
                }
            }
        })
    }
    jQuery.fn.extend({
        on: function(types, selector, data, fn, one) {
            var origFn, type;
            if (typeof types === "object") {
                if (typeof selector !== "string") {
                    data = data || selector;
                    selector = undefined
                }
                for (type in types) {
                    this.on(type, selector, data, types[type], one)
                }
                return this
            }
            if (data == null && fn == null) {
                fn = selector;
                data = selector = undefined
            } else {
                if (fn == null) {
                    if (typeof selector === "string") {
                        fn = data;
                        data = undefined
                    } else {
                        fn = data;
                        data = selector;
                        selector = undefined
                    }
                }
            }
            if (fn === false) {
                fn = returnFalse
            } else {
                if (!fn) {
                    return this
                }
            }
            if (one === 1) {
                origFn = fn;
                fn = function(event) {
                    jQuery().off(event);
                    return origFn.apply(this, arguments)
                };
                fn.guid = origFn.guid || (origFn.guid = jQuery.guid++)
            }
            return this.each(function() {
                jQuery.event.add(this, types, fn, data, selector)
            })
        },
        one: function(types, selector, data, fn) {
            return this.on(types, selector, data, fn, 1)
        },
        off: function(types, selector, fn) {
            if (types && types.preventDefault && types.handleObj) {
                var handleObj = types.handleObj;
                jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
                return this
            }
            if (typeof types === "object") {
                for (var type in types) {
                    this.off(type, selector, types[type])
                }
                return this
            }
            if (selector === false || typeof selector === "function") {
                fn = selector;
                selector = undefined
            }
            if (fn === false) {
                fn = returnFalse
            }
            return this.each(function() {
                jQuery.event.remove(this, types, fn, selector)
            })
        },
        bind: function(types, data, fn) {
            return this.on(types, null, data, fn)
        },
        unbind: function(types, fn) {
            return this.off(types, null, fn)
        },
        live: function(types, data, fn) {
            jQuery(this.context).on(types, this.selector, data, fn);
            return this
        },
        die: function(types, fn) {
            jQuery(this.context).off(types, this.selector || "**", fn);
            return this
        },
        delegate: function(selector, types, data, fn) {
            return this.on(types, selector, data, fn)
        },
        undelegate: function(selector, types, fn) {
            return arguments.length == 1 ? this.off(selector, "**") : this.off(types, selector, fn)
        },
        trigger: function(type, data) {
            return this.each(function() {
                jQuery.event.trigger(type, data, this)
            })
        },
        triggerHandler: function(type, data) {
            if (this[0]) {
                return jQuery.event.trigger(type, data, this[0], true)
            }
        },
        toggle: function(fn) {
            var args = arguments,
                guid = fn.guid || jQuery.guid++,
                i = 0,
                toggler = function(event) {
                    var lastToggle = (jQuery._data(this, "lastToggle" + fn.guid) || 0) % i;
                    jQuery._data(this, "lastToggle" + fn.guid, lastToggle + 1);
                    event.preventDefault();
                    return args[lastToggle].apply(this, arguments) || false
                };
            toggler.guid = guid;
            while (i < args.length) {
                args[i++].guid = guid
            }
            return this.click(toggler)
        },
        hover: function(fnOver, fnOut) {
            return this.mouseenter(fnOver).mouseleave(fnOut || fnOver)
        }
    });
    jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu").split(" "), function(i, name) {
        jQuery.fn[name] = function(data, fn) {
            if (fn == null) {
                fn = data;
                data = null
            }
            return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name)
        };
        if (jQuery.attrFn) {
            jQuery.attrFn[name] = true
        }
        if (rkeyEvent.test(name)) {
            jQuery.event.fixHooks[name] = jQuery.event.keyHooks
        }
        if (rmouseEvent.test(name)) {
            jQuery.event.fixHooks[name] = jQuery.event.mouseHooks
        }
    });
    /*
     * Sizzle CSS Selector Engine
     *  Copyright 2011, The Dojo Foundation
     *  Released under the MIT, BSD, and GPL Licenses.
     *  More information: http://sizzlejs.com/
     */
    (function() {
        var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
            expando = "sizcache" + (Math.random() + "").replace(".", ""),
            done = 0,
            toString = Object.prototype.toString,
            hasDuplicate = false,
            baseHasDuplicate = true,
            rBackslash = /\\/g,
            rReturn = /\r\n/g,
            rNonWord = /\W/;
        [0, 0].sort(function() {
            baseHasDuplicate = false;
            return 0
        });
        var Sizzle = function(selector, context, results, seed) {
            results = results || [];
            context = context || document;
            var origContext = context;
            if (context.nodeType !== 1 && context.nodeType !== 9) {
                return []
            }
            if (!selector || typeof selector !== "string") {
                return results
            }
            var m, set, checkSet, extra, ret, cur, pop, i, prune = true,
                contextXML = Sizzle.isXML(context),
                parts = [],
                soFar = selector;
            do {
                chunker.exec("");
                m = chunker.exec(soFar);
                if (m) {
                    soFar = m[3];
                    parts.push(m[1]);
                    if (m[2]) {
                        extra = m[3];
                        break
                    }
                }
            } while (m);
            if (parts.length > 1 && origPOS.exec(selector)) {
                if (parts.length === 2 && Expr.relative[parts[0]]) {
                    set = posProcess(parts[0] + parts[1], context, seed)
                } else {
                    set = Expr.relative[parts[0]] ? [context] : Sizzle(parts.shift(), context);
                    while (parts.length) {
                        selector = parts.shift();
                        if (Expr.relative[selector]) {
                            selector += parts.shift()
                        }
                        set = posProcess(selector, set, seed)
                    }
                }
            } else {
                if (!seed && parts.length > 1 && context.nodeType === 9 && !contextXML && Expr.match.ID.test(parts[0]) && !Expr.match.ID.test(parts[parts.length - 1])) {
                    ret = Sizzle.find(parts.shift(), context, contextXML);
                    context = ret.expr ? Sizzle.filter(ret.expr, ret.set)[0] : ret.set[0]
                }
                if (context) {
                    ret = seed ? {
                        expr: parts.pop(),
                        set: makeArray(seed)
                    } : Sizzle.find(parts.pop(), parts.length === 1 && (parts[0] === "~" || parts[0] === "+") && context.parentNode ? context.parentNode : context, contextXML);
                    set = ret.expr ? Sizzle.filter(ret.expr, ret.set) : ret.set;
                    if (parts.length > 0) {
                        checkSet = makeArray(set)
                    } else {
                        prune = false
                    }
                    while (parts.length) {
                        cur = parts.pop();
                        pop = cur;
                        if (!Expr.relative[cur]) {
                            cur = ""
                        } else {
                            pop = parts.pop()
                        }
                        if (pop == null) {
                            pop = context
                        }
                        Expr.relative[cur](checkSet, pop, contextXML)
                    }
                } else {
                    checkSet = parts = []
                }
            }
            if (!checkSet) {
                checkSet = set
            }
            if (!checkSet) {
                Sizzle.error(cur || selector)
            }
            if (toString.call(checkSet) === "[object Array]") {
                if (!prune) {
                    results.push.apply(results, checkSet)
                } else {
                    if (context && context.nodeType === 1) {
                        for (i = 0; checkSet[i] != null; i++) {
                            if (checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && Sizzle.contains(context, checkSet[i]))) {
                                results.push(set[i])
                            }
                        }
                    } else {
                        for (i = 0; checkSet[i] != null; i++) {
                            if (checkSet[i] && checkSet[i].nodeType === 1) {
                                results.push(set[i])
                            }
                        }
                    }
                }
            } else {
                makeArray(checkSet, results)
            }
            if (extra) {
                Sizzle(extra, origContext, results, seed);
                Sizzle.uniqueSort(results)
            }
            return results
        };
        Sizzle.uniqueSort = function(results) {
            if (sortOrder) {
                hasDuplicate = baseHasDuplicate;
                results.sort(sortOrder);
                if (hasDuplicate) {
                    for (var i = 1; i < results.length; i++) {
                        if (results[i] === results[i - 1]) {
                            results.splice(i--, 1)
                        }
                    }
                }
            }
            return results
        };
        Sizzle.matches = function(expr, set) {
            return Sizzle(expr, null, null, set)
        };
        Sizzle.matchesSelector = function(node, expr) {
            return Sizzle(expr, null, null, [node]).length > 0
        };
        Sizzle.find = function(expr, context, isXML) {
            var set, i, len, match, type, left;
            if (!expr) {
                return []
            }
            for (i = 0, len = Expr.order.length; i < len; i++) {
                type = Expr.order[i];
                if ((match = Expr.leftMatch[type].exec(expr))) {
                    left = match[1];
                    match.splice(1, 1);
                    if (left.substr(left.length - 1) !== "\\") {
                        match[1] = (match[1] || "").replace(rBackslash, "");
                        set = Expr.find[type](match, context, isXML);
                        if (set != null) {
                            expr = expr.replace(Expr.match[type], "");
                            break
                        }
                    }
                }
            }
            if (!set) {
                set = typeof context.getElementsByTagName !== "undefined" ? context.getElementsByTagName("*") : []
            }
            return {
                set: set,
                expr: expr
            }
        };
        Sizzle.filter = function(expr, set, inplace, not) {
            var match, anyFound, type, found, item, filter, left, i, pass, old = expr,
                result = [],
                curLoop = set,
                isXMLFilter = set && set[0] && Sizzle.isXML(set[0]);
            while (expr && set.length) {
                for (type in Expr.filter) {
                    if ((match = Expr.leftMatch[type].exec(expr)) != null && match[2]) {
                        filter = Expr.filter[type];
                        left = match[1];
                        anyFound = false;
                        match.splice(1, 1);
                        if (left.substr(left.length - 1) === "\\") {
                            continue
                        }
                        if (curLoop === result) {
                            result = []
                        }
                        if (Expr.preFilter[type]) {
                            match = Expr.preFilter[type](match, curLoop, inplace, result, not, isXMLFilter);
                            if (!match) {
                                anyFound = found = true
                            } else {
                                if (match === true) {
                                    continue
                                }
                            }
                        }
                        if (match) {
                            for (i = 0;
                                (item = curLoop[i]) != null; i++) {
                                if (item) {
                                    found = filter(item, match, i, curLoop);
                                    pass = not ^ found;
                                    if (inplace && found != null) {
                                        if (pass) {
                                            anyFound = true
                                        } else {
                                            curLoop[i] = false
                                        }
                                    } else {
                                        if (pass) {
                                            result.push(item);
                                            anyFound = true
                                        }
                                    }
                                }
                            }
                        }
                        if (found !== undefined) {
                            if (!inplace) {
                                curLoop = result
                            }
                            expr = expr.replace(Expr.match[type], "");
                            if (!anyFound) {
                                return []
                            }
                            break
                        }
                    }
                }
                if (expr === old) {
                    if (anyFound == null) {
                        Sizzle.error(expr)
                    } else {
                        break
                    }
                }
                old = expr
            }
            return curLoop
        };
        Sizzle.error = function(msg) {
            throw new Error("Syntax error, unrecognized expression: " + msg)
        };
        var getText = Sizzle.getText = function(elem) {
            var i, node, nodeType = elem.nodeType,
                ret = "";
            if (nodeType) {
                if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
                    if (typeof elem.textContent === "string") {
                        return elem.textContent
                    } else {
                        if (typeof elem.innerText === "string") {
                            return elem.innerText.replace(rReturn, "")
                        } else {
                            for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                                ret += getText(elem)
                            }
                        }
                    }
                } else {
                    if (nodeType === 3 || nodeType === 4) {
                        return elem.nodeValue
                    }
                }
            } else {
                for (i = 0;
                    (node = elem[i]); i++) {
                    if (node.nodeType !== 8) {
                        ret += getText(node)
                    }
                }
            }
            return ret
        };
        var Expr = Sizzle.selectors = {
            order: ["ID", "NAME", "TAG"],
            match: {
                ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
                ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
                TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
                CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
                POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
                PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
            },
            leftMatch: {},
            attrMap: {
                "class": "className",
                "for": "htmlFor"
            },
            attrHandle: {
                href: function(elem) {
                    return elem.getAttribute("href")
                },
                type: function(elem) {
                    return elem.getAttribute("type")
                }
            },
            relative: {
                "+": function(checkSet, part) {
                    var isPartStr = typeof part === "string",
                        isTag = isPartStr && !rNonWord.test(part),
                        isPartStrNotTag = isPartStr && !isTag;
                    if (isTag) {
                        part = part.toLowerCase()
                    }
                    for (var i = 0, l = checkSet.length, elem; i < l; i++) {
                        if ((elem = checkSet[i])) {
                            while ((elem = elem.previousSibling) && elem.nodeType !== 1) {}
                            checkSet[i] = isPartStrNotTag || elem && elem.nodeName.toLowerCase() === part ? elem || false : elem === part
                        }
                    }
                    if (isPartStrNotTag) {
                        Sizzle.filter(part, checkSet, true)
                    }
                },
                ">": function(checkSet, part) {
                    var elem, isPartStr = typeof part === "string",
                        i = 0,
                        l = checkSet.length;
                    if (isPartStr && !rNonWord.test(part)) {
                        part = part.toLowerCase();
                        for (; i < l; i++) {
                            elem = checkSet[i];
                            if (elem) {
                                var parent = elem.parentNode;
                                checkSet[i] = parent.nodeName.toLowerCase() === part ? parent : false
                            }
                        }
                    } else {
                        for (; i < l; i++) {
                            elem = checkSet[i];
                            if (elem) {
                                checkSet[i] = isPartStr ? elem.parentNode : elem.parentNode === part
                            }
                        }
                        if (isPartStr) {
                            Sizzle.filter(part, checkSet, true)
                        }
                    }
                },
                "": function(checkSet, part, isXML) {
                    var nodeCheck, doneName = done++,
                        checkFn = dirCheck;
                    if (typeof part === "string" && !rNonWord.test(part)) {
                        part = part.toLowerCase();
                        nodeCheck = part;
                        checkFn = dirNodeCheck
                    }
                    checkFn("parentNode", part, doneName, checkSet, nodeCheck, isXML)
                },
                "~": function(checkSet, part, isXML) {
                    var nodeCheck, doneName = done++,
                        checkFn = dirCheck;
                    if (typeof part === "string" && !rNonWord.test(part)) {
                        part = part.toLowerCase();
                        nodeCheck = part;
                        checkFn = dirNodeCheck
                    }
                    checkFn("previousSibling", part, doneName, checkSet, nodeCheck, isXML)
                }
            },
            find: {
                ID: function(match, context, isXML) {
                    if (typeof context.getElementById !== "undefined" && !isXML) {
                        var m = context.getElementById(match[1]);
                        return m && m.parentNode ? [m] : []
                    }
                },
                NAME: function(match, context) {
                    if (typeof context.getElementsByName !== "undefined") {
                        var ret = [],
                            results = context.getElementsByName(match[1]);
                        for (var i = 0, l = results.length; i < l; i++) {
                            if (results[i].getAttribute("name") === match[1]) {
                                ret.push(results[i])
                            }
                        }
                        return ret.length === 0 ? null : ret
                    }
                },
                TAG: function(match, context) {
                    if (typeof context.getElementsByTagName !== "undefined") {
                        return context.getElementsByTagName(match[1])
                    }
                }
            },
            preFilter: {
                CLASS: function(match, curLoop, inplace, result, not, isXML) {
                    match = " " + match[1].replace(rBackslash, "") + " ";
                    if (isXML) {
                        return match
                    }
                    for (var i = 0, elem;
                        (elem = curLoop[i]) != null; i++) {
                        if (elem) {
                            if (not ^ (elem.className && (" " + elem.className + " ").replace(/[\t\n\r]/g, " ").indexOf(match) >= 0)) {
                                if (!inplace) {
                                    result.push(elem)
                                }
                            } else {
                                if (inplace) {
                                    curLoop[i] = false
                                }
                            }
                        }
                    }
                    return false
                },
                ID: function(match) {
                    return match[1].replace(rBackslash, "")
                },
                TAG: function(match, curLoop) {
                    return match[1].replace(rBackslash, "").toLowerCase()
                },
                CHILD: function(match) {
                    if (match[1] === "nth") {
                        if (!match[2]) {
                            Sizzle.error(match[0])
                        }
                        match[2] = match[2].replace(/^\+|\s*/g, "");
                        var test = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(match[2] === "even" && "2n" || match[2] === "odd" && "2n+1" || !/\D/.test(match[2]) && "0n+" + match[2] || match[2]);
                        match[2] = (test[1] + (test[2] || 1)) - 0;
                        match[3] = test[3] - 0
                    } else {
                        if (match[2]) {
                            Sizzle.error(match[0])
                        }
                    }
                    match[0] = done++;
                    return match
                },
                ATTR: function(match, curLoop, inplace, result, not, isXML) {
                    var name = match[1] = match[1].replace(rBackslash, "");
                    if (!isXML && Expr.attrMap[name]) {
                        match[1] = Expr.attrMap[name]
                    }
                    match[4] = (match[4] || match[5] || "").replace(rBackslash, "");
                    if (match[2] === "~=") {
                        match[4] = " " + match[4] + " "
                    }
                    return match
                },
                PSEUDO: function(match, curLoop, inplace, result, not) {
                    if (match[1] === "not") {
                        if ((chunker.exec(match[3]) || "").length > 1 || /^\w/.test(match[3])) {
                            match[3] = Sizzle(match[3], null, null, curLoop)
                        } else {
                            var ret = Sizzle.filter(match[3], curLoop, inplace, true ^ not);
                            if (!inplace) {
                                result.push.apply(result, ret)
                            }
                            return false
                        }
                    } else {
                        if (Expr.match.POS.test(match[0]) || Expr.match.CHILD.test(match[0])) {
                            return true
                        }
                    }
                    return match
                },
                POS: function(match) {
                    match.unshift(true);
                    return match
                }
            },
            filters: {
                enabled: function(elem) {
                    return elem.disabled === false && elem.type !== "hidden"
                },
                disabled: function(elem) {
                    return elem.disabled === true
                },
                checked: function(elem) {
                    return elem.checked === true
                },
                selected: function(elem) {
                    if (elem.parentNode) {
                        elem.parentNode.selectedIndex
                    }
                    return elem.selected === true
                },
                parent: function(elem) {
                    return !!elem.firstChild
                },
                empty: function(elem) {
                    return !elem.firstChild
                },
                has: function(elem, i, match) {
                    return !!Sizzle(match[3], elem).length
                },
                header: function(elem) {
                    return (/h\d/i).test(elem.nodeName)
                },
                text: function(elem) {
                    var attr = elem.getAttribute("type"),
                        type = elem.type;
                    return elem.nodeName.toLowerCase() === "input" && "text" === type && (attr === type || attr === null)
                },
                radio: function(elem) {
                    return elem.nodeName.toLowerCase() === "input" && "radio" === elem.type
                },
                checkbox: function(elem) {
                    return elem.nodeName.toLowerCase() === "input" && "checkbox" === elem.type
                },
                file: function(elem) {
                    return elem.nodeName.toLowerCase() === "input" && "file" === elem.type
                },
                password: function(elem) {
                    return elem.nodeName.toLowerCase() === "input" && "password" === elem.type
                },
                submit: function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return (name === "input" || name === "button") && "submit" === elem.type
                },
                image: function(elem) {
                    return elem.nodeName.toLowerCase() === "input" && "image" === elem.type
                },
                reset: function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return (name === "input" || name === "button") && "reset" === elem.type
                },
                button: function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return name === "input" && "button" === elem.type || name === "button"
                },
                input: function(elem) {
                    return (/input|select|textarea|button/i).test(elem.nodeName)
                },
                focus: function(elem) {
                    return elem === elem.ownerDocument.activeElement
                }
            },
            setFilters: {
                first: function(elem, i) {
                    return i === 0
                },
                last: function(elem, i, match, array) {
                    return i === array.length - 1
                },
                even: function(elem, i) {
                    return i % 2 === 0
                },
                odd: function(elem, i) {
                    return i % 2 === 1
                },
                lt: function(elem, i, match) {
                    return i < match[3] - 0
                },
                gt: function(elem, i, match) {
                    return i > match[3] - 0
                },
                nth: function(elem, i, match) {
                    return match[3] - 0 === i
                },
                eq: function(elem, i, match) {
                    return match[3] - 0 === i
                }
            },
            filter: {
                PSEUDO: function(elem, match, i, array) {
                    var name = match[1],
                        filter = Expr.filters[name];
                    if (filter) {
                        return filter(elem, i, match, array)
                    } else {
                        if (name === "contains") {
                            return (elem.textContent || elem.innerText || getText([elem]) || "").indexOf(match[3]) >= 0
                        } else {
                            if (name === "not") {
                                var not = match[3];
                                for (var j = 0, l = not.length; j < l; j++) {
                                    if (not[j] === elem) {
                                        return false
                                    }
                                }
                                return true
                            } else {
                                Sizzle.error(name)
                            }
                        }
                    }
                },
                CHILD: function(elem, match) {
                    var first, last, doneName, parent, cache, count, diff, type = match[1],
                        node = elem;
                    switch (type) {
                        case "only":
                        case "first":
                            while ((node = node.previousSibling)) {
                                if (node.nodeType === 1) {
                                    return false
                                }
                            }
                            if (type === "first") {
                                return true
                            }
                            node = elem;
                        case "last":
                            while ((node = node.nextSibling)) {
                                if (node.nodeType === 1) {
                                    return false
                                }
                            }
                            return true;
                        case "nth":
                            first = match[2];
                            last = match[3];
                            if (first === 1 && last === 0) {
                                return true
                            }
                            doneName = match[0];
                            parent = elem.parentNode;
                            if (parent && (parent[expando] !== doneName || !elem.nodeIndex)) {
                                count = 0;
                                for (node = parent.firstChild; node; node = node.nextSibling) {
                                    if (node.nodeType === 1) {
                                        node.nodeIndex = ++count
                                    }
                                }
                                parent[expando] = doneName
                            }
                            diff = elem.nodeIndex - last;
                            if (first === 0) {
                                return diff === 0
                            } else {
                                return (diff % first === 0 && diff / first >= 0)
                            }
                    }
                },
                ID: function(elem, match) {
                    return elem.nodeType === 1 && elem.getAttribute("id") === match
                },
                TAG: function(elem, match) {
                    return (match === "*" && elem.nodeType === 1) || !!elem.nodeName && elem.nodeName.toLowerCase() === match
                },
                CLASS: function(elem, match) {
                    return (" " + (elem.className || elem.getAttribute("class")) + " ").indexOf(match) > -1
                },
                ATTR: function(elem, match) {
                    var name = match[1],
                        result = Sizzle.attr ? Sizzle.attr(elem, name) : Expr.attrHandle[name] ? Expr.attrHandle[name](elem) : elem[name] != null ? elem[name] : elem.getAttribute(name),
                        value = result + "",
                        type = match[2],
                        check = match[4];
                    return result == null ? type === "!=" : !type && Sizzle.attr ? result != null : type === "=" ? value === check : type === "*=" ? value.indexOf(check) >= 0 : type === "~=" ? (" " + value + " ").indexOf(check) >= 0 : !check ? value && result !== false : type === "!=" ? value !== check : type === "^=" ? value.indexOf(check) === 0 : type === "$=" ? value.substr(value.length - check.length) === check : type === "|=" ? value === check || value.substr(0, check.length + 1) === check + "-" : false
                },
                POS: function(elem, match, i, array) {
                    var name = match[2],
                        filter = Expr.setFilters[name];
                    if (filter) {
                        return filter(elem, i, match, array)
                    }
                }
            }
        };
        var origPOS = Expr.match.POS,
            fescape = function(all, num) {
                return "\\" + (num - 0 + 1)
            };
        for (var type in Expr.match) {
            Expr.match[type] = new RegExp(Expr.match[type].source + (/(?![^\[]*\])(?![^\(]*\))/.source));
            Expr.leftMatch[type] = new RegExp(/(^(?:.|\r|\n)*?)/.source + Expr.match[type].source.replace(/\\(\d+)/g, fescape))
        }
        Expr.match.globalPOS = origPOS;
        var makeArray = function(array, results) {
            array = Array.prototype.slice.call(array, 0);
            if (results) {
                results.push.apply(results, array);
                return results
            }
            return array
        };
        try {
            Array.prototype.slice.call(document.documentElement.childNodes, 0)[0].nodeType
        } catch (e) {
            makeArray = function(array, results) {
                var i = 0,
                    ret = results || [];
                if (toString.call(array) === "[object Array]") {
                    Array.prototype.push.apply(ret, array)
                } else {
                    if (typeof array.length === "number") {
                        for (var l = array.length; i < l; i++) {
                            ret.push(array[i])
                        }
                    } else {
                        for (; array[i]; i++) {
                            ret.push(array[i])
                        }
                    }
                }
                return ret
            }
        }
        var sortOrder, siblingCheck;
        if (document.documentElement.compareDocumentPosition) {
            sortOrder = function(a, b) {
                if (a === b) {
                    hasDuplicate = true;
                    return 0
                }
                if (!a.compareDocumentPosition || !b.compareDocumentPosition) {
                    return a.compareDocumentPosition ? -1 : 1
                }
                return a.compareDocumentPosition(b) & 4 ? -1 : 1
            }
        } else {
            sortOrder = function(a, b) {
                if (a === b) {
                    hasDuplicate = true;
                    return 0
                } else {
                    if (a.sourceIndex && b.sourceIndex) {
                        return a.sourceIndex - b.sourceIndex
                    }
                }
                var al, bl, ap = [],
                    bp = [],
                    aup = a.parentNode,
                    bup = b.parentNode,
                    cur = aup;
                if (aup === bup) {
                    return siblingCheck(a, b)
                } else {
                    if (!aup) {
                        return -1
                    } else {
                        if (!bup) {
                            return 1
                        }
                    }
                }
                while (cur) {
                    ap.unshift(cur);
                    cur = cur.parentNode
                }
                cur = bup;
                while (cur) {
                    bp.unshift(cur);
                    cur = cur.parentNode
                }
                al = ap.length;
                bl = bp.length;
                for (var i = 0; i < al && i < bl; i++) {
                    if (ap[i] !== bp[i]) {
                        return siblingCheck(ap[i], bp[i])
                    }
                }
                return i === al ? siblingCheck(a, bp[i], -1) : siblingCheck(ap[i], b, 1)
            };
            siblingCheck = function(a, b, ret) {
                if (a === b) {
                    return ret
                }
                var cur = a.nextSibling;
                while (cur) {
                    if (cur === b) {
                        return -1
                    }
                    cur = cur.nextSibling
                }
                return 1
            }
        }(function() {
            var form = document.createElement("div"),
                id = "script" + (new Date()).getTime(),
                root = document.documentElement;
            form.innerHTML = "<a name='" + id + "'/>";
            root.insertBefore(form, root.firstChild);
            if (document.getElementById(id)) {
                Expr.find.ID = function(match, context, isXML) {
                    if (typeof context.getElementById !== "undefined" && !isXML) {
                        var m = context.getElementById(match[1]);
                        return m ? m.id === match[1] || typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id").nodeValue === match[1] ? [m] : undefined : []
                    }
                };
                Expr.filter.ID = function(elem, match) {
                    var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
                    return elem.nodeType === 1 && node && node.nodeValue === match
                }
            }
            root.removeChild(form);
            root = form = null
        })();
        (function() {
            var div = document.createElement("div");
            div.appendChild(document.createComment(""));
            if (div.getElementsByTagName("*").length > 0) {
                Expr.find.TAG = function(match, context) {
                    var results = context.getElementsByTagName(match[1]);
                    if (match[1] === "*") {
                        var tmp = [];
                        for (var i = 0; results[i]; i++) {
                            if (results[i].nodeType === 1) {
                                tmp.push(results[i])
                            }
                        }
                        results = tmp
                    }
                    return results
                }
            }
            div.innerHTML = "<a href='#'></a>";
            if (div.firstChild && typeof div.firstChild.getAttribute !== "undefined" && div.firstChild.getAttribute("href") !== "#") {
                Expr.attrHandle.href = function(elem) {
                    return elem.getAttribute("href", 2)
                }
            }
            div = null
        })();
        if (document.querySelectorAll) {
            (function() {
                var oldSizzle = Sizzle,
                    div = document.createElement("div"),
                    id = "__sizzle__";
                div.innerHTML = "<p class='TEST'></p>";
                if (div.querySelectorAll && div.querySelectorAll(".TEST").length === 0) {
                    return
                }
                Sizzle = function(query, context, extra, seed) {
                    context = context || document;
                    if (!seed && !Sizzle.isXML(context)) {
                        var match = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(query);
                        if (match && (context.nodeType === 1 || context.nodeType === 9)) {
                            if (match[1]) {
                                return makeArray(context.getElementsByTagName(query), extra)
                            } else {
                                if (match[2] && Expr.find.CLASS && context.getElementsByClassName) {
                                    return makeArray(context.getElementsByClassName(match[2]), extra)
                                }
                            }
                        }
                        if (context.nodeType === 9) {
                            if (query === "body" && context.body) {
                                return makeArray([context.body], extra)
                            } else {
                                if (match && match[3]) {
                                    var elem = context.getElementById(match[3]);
                                    if (elem && elem.parentNode) {
                                        if (elem.id === match[3]) {
                                            return makeArray([elem], extra)
                                        }
                                    } else {
                                        return makeArray([], extra)
                                    }
                                }
                            }
                            try {
                                return makeArray(context.querySelectorAll(query), extra)
                            } catch (qsaError) {}
                        } else {
                            if (context.nodeType === 1 && context.nodeName.toLowerCase() !== "object") {
                                var oldContext = context,
                                    old = context.getAttribute("id"),
                                    nid = old || id,
                                    hasParent = context.parentNode,
                                    relativeHierarchySelector = /^\s*[+~]/.test(query);
                                if (!old) {
                                    context.setAttribute("id", nid)
                                } else {
                                    nid = nid.replace(/'/g, "\\$&")
                                }
                                if (relativeHierarchySelector && hasParent) {
                                    context = context.parentNode
                                }
                                try {
                                    if (!relativeHierarchySelector || hasParent) {
                                        return makeArray(context.querySelectorAll("[id='" + nid + "'] " + query), extra)
                                    }
                                } catch (pseudoError) {} finally {
                                    if (!old) {
                                        oldContext.removeAttribute("id")
                                    }
                                }
                            }
                        }
                    }
                    return oldSizzle(query, context, extra, seed)
                };
                for (var prop in oldSizzle) {
                    Sizzle[prop] = oldSizzle[prop]
                }
                div = null
            })()
        }(function() {
            var html = document.documentElement,
                matches = html.matchesSelector || html.mozMatchesSelector || html.webkitMatchesSelector || html.msMatchesSelector;
            if (matches) {
                var disconnectedMatch = !matches.call(document.createElement("div"), "div"),
                    pseudoWorks = false;
                try {
                    matches.call(document.documentElement, "[test!='']:sizzle")
                } catch (pseudoError) {
                    pseudoWorks = true
                }
                Sizzle.matchesSelector = function(node, expr) {
                    expr = expr.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
                    if (!Sizzle.isXML(node)) {
                        try {
                            if (pseudoWorks || !Expr.match.PSEUDO.test(expr) && !/!=/.test(expr)) {
                                var ret = matches.call(node, expr);
                                if (ret || !disconnectedMatch || node.document && node.document.nodeType !== 11) {
                                    return ret
                                }
                            }
                        } catch (e) {}
                    }
                    return Sizzle(expr, null, null, [node]).length > 0
                }
            }
        })();
        (function() {
            var div = document.createElement("div");
            div.innerHTML = "<div class='test e'></div><div class='test'></div>";
            if (!div.getElementsByClassName || div.getElementsByClassName("e").length === 0) {
                return
            }
            div.lastChild.className = "e";
            if (div.getElementsByClassName("e").length === 1) {
                return
            }
            Expr.order.splice(1, 0, "CLASS");
            Expr.find.CLASS = function(match, context, isXML) {
                if (typeof context.getElementsByClassName !== "undefined" && !isXML) {
                    return context.getElementsByClassName(match[1])
                }
            };
            div = null
        })();

        function dirNodeCheck(dir, cur, doneName, checkSet, nodeCheck, isXML) {
            for (var i = 0, l = checkSet.length; i < l; i++) {
                var elem = checkSet[i];
                if (elem) {
                    var match = false;
                    elem = elem[dir];
                    while (elem) {
                        if (elem[expando] === doneName) {
                            match = checkSet[elem.sizset];
                            break
                        }
                        if (elem.nodeType === 1 && !isXML) {
                            elem[expando] = doneName;
                            elem.sizset = i
                        }
                        if (elem.nodeName.toLowerCase() === cur) {
                            match = elem;
                            break
                        }
                        elem = elem[dir]
                    }
                    checkSet[i] = match
                }
            }
        }

        function dirCheck(dir, cur, doneName, checkSet, nodeCheck, isXML) {
            for (var i = 0, l = checkSet.length; i < l; i++) {
                var elem = checkSet[i];
                if (elem) {
                    var match = false;
                    elem = elem[dir];
                    while (elem) {
                        if (elem[expando] === doneName) {
                            match = checkSet[elem.sizset];
                            break
                        }
                        if (elem.nodeType === 1) {
                            if (!isXML) {
                                elem[expando] = doneName;
                                elem.sizset = i
                            }
                            if (typeof cur !== "string") {
                                if (elem === cur) {
                                    match = true;
                                    break
                                }
                            } else {
                                if (Sizzle.filter(cur, [elem]).length > 0) {
                                    match = elem;
                                    break
                                }
                            }
                        }
                        elem = elem[dir]
                    }
                    checkSet[i] = match
                }
            }
        }
        if (document.documentElement.contains) {
            Sizzle.contains = function(a, b) {
                return a !== b && (a.contains ? a.contains(b) : true)
            }
        } else {
            if (document.documentElement.compareDocumentPosition) {
                Sizzle.contains = function(a, b) {
                    return !!(a.compareDocumentPosition(b) & 16)
                }
            } else {
                Sizzle.contains = function() {
                    return false
                }
            }
        }
        Sizzle.isXML = function(elem) {
            var documentElement = (elem ? elem.ownerDocument || elem : 0).documentElement;
            return documentElement ? documentElement.nodeName !== "HTML" : false
        };
        var posProcess = function(selector, context, seed) {
            var match, tmpSet = [],
                later = "",
                root = context.nodeType ? [context] : context;
            while ((match = Expr.match.PSEUDO.exec(selector))) {
                later += match[0];
                selector = selector.replace(Expr.match.PSEUDO, "")
            }
            selector = Expr.relative[selector] ? selector + "*" : selector;
            for (var i = 0, l = root.length; i < l; i++) {
                Sizzle(selector, root[i], tmpSet, seed)
            }
            return Sizzle.filter(later, tmpSet)
        };
        Sizzle.attr = jQuery.attr;
        Sizzle.selectors.attrMap = {};
        jQuery.find = Sizzle;
        jQuery.expr = Sizzle.selectors;
        jQuery.expr[":"] = jQuery.expr.filters;
        jQuery.unique = Sizzle.uniqueSort;
        jQuery.text = Sizzle.getText;
        jQuery.isXMLDoc = Sizzle.isXML;
        jQuery.contains = Sizzle.contains
    })();
    var runtil = /Until$/,
        rparentsprev = /^(?:parents|prevUntil|prevAll)/,
        rmultiselector = /,/,
        isSimple = /^.[^:#\[\.,]*$/,
        slice = Array.prototype.slice,
        POS = jQuery.expr.match.globalPOS,
        guaranteedUnique = {
            children: true,
            contents: true,
            next: true,
            prev: true
        };
    jQuery.fn.extend({
        find: function(selector) {
            var self = this,
                i, l;
            if (typeof selector !== "string") {
                return jQuery(selector).filter(function() {
                    for (i = 0, l = self.length; i < l; i++) {
                        if (jQuery.contains(self[i], this)) {
                            return true
                        }
                    }
                })
            }
            var ret = this.pushStack("", "find", selector),
                length, n, r;
            for (i = 0, l = this.length; i < l; i++) {
                length = ret.length;
                jQuery.find(selector, this[i], ret);
                if (i > 0) {
                    for (n = length; n < ret.length; n++) {
                        for (r = 0; r < length; r++) {
                            if (ret[r] === ret[n]) {
                                ret.splice(n--, 1);
                                break
                            }
                        }
                    }
                }
            }
            return ret
        },
        has: function(target) {
            var targets = jQuery(target);
            return this.filter(function() {
                for (var i = 0, l = targets.length; i < l; i++) {
                    if (jQuery.contains(this, targets[i])) {
                        return true
                    }
                }
            })
        },
        not: function(selector) {
            return this.pushStack(winnow(this, selector, false), "not", selector)
        },
        filter: function(selector) {
            return this.pushStack(winnow(this, selector, true), "filter", selector)
        },
        is: function(selector) {
            return !!selector && (typeof selector === "string" ? POS.test(selector) ? jQuery(selector, this.context).index(this[0]) >= 0 : jQuery.filter(selector, this).length > 0 : this.filter(selector).length > 0)
        },
        closest: function(selectors, context) {
            var ret = [],
                i, l, cur = this[0];
            if (jQuery.isArray(selectors)) {
                var level = 1;
                while (cur && cur.ownerDocument && cur !== context) {
                    for (i = 0; i < selectors.length; i++) {
                        if (jQuery(cur).is(selectors[i])) {
                            ret.push({
                                selector: selectors[i],
                                elem: cur,
                                level: level
                            })
                        }
                    }
                    cur = cur.parentNode;
                    level++
                }
                return ret
            }
            var pos = POS.test(selectors) || typeof selectors !== "string" ? jQuery(selectors, context || this.context) : 0;
            for (i = 0, l = this.length; i < l; i++) {
                cur = this[i];
                while (cur) {
                    if (pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors)) {
                        ret.push(cur);
                        break
                    } else {
                        cur = cur.parentNode;
                        if (!cur || !cur.ownerDocument || cur === context || cur.nodeType === 11) {
                            break
                        }
                    }
                }
            }
            ret = ret.length > 1 ? jQuery.unique(ret) : ret;
            return this.pushStack(ret, "closest", selectors)
        },
        index: function(elem) {
            if (!elem) {
                return (this[0] && this[0].parentNode) ? this.prevAll().length : -1
            }
            if (typeof elem === "string") {
                return jQuery.inArray(this[0], jQuery(elem))
            }
            return jQuery.inArray(elem.jquery ? elem[0] : elem, this)
        },
        add: function(selector, context) {
            var set = typeof selector === "string" ? jQuery(selector, context) : jQuery.makeArray(selector && selector.nodeType ? [selector] : selector),
                all = jQuery.merge(this.get(), set);
            return this.pushStack(isDisconnected(set[0]) || isDisconnected(all[0]) ? all : jQuery.unique(all))
        },
        andSelf: function() {
            return this.add(this.prevObject)
        }
    });

    function isDisconnected(node) {
        return !node || !node.parentNode || node.parentNode.nodeType === 11
    }
    jQuery.each({
        parent: function(elem) {
            var parent = elem.parentNode;
            return parent && parent.nodeType !== 11 ? parent : null
        },
        parents: function(elem) {
            return jQuery.dir(elem, "parentNode")
        },
        parentsUntil: function(elem, i, until) {
            return jQuery.dir(elem, "parentNode", until)
        },
        next: function(elem) {
            return jQuery.nth(elem, 2, "nextSibling")
        },
        prev: function(elem) {
            return jQuery.nth(elem, 2, "previousSibling")
        },
        nextAll: function(elem) {
            return jQuery.dir(elem, "nextSibling")
        },
        prevAll: function(elem) {
            return jQuery.dir(elem, "previousSibling")
        },
        nextUntil: function(elem, i, until) {
            return jQuery.dir(elem, "nextSibling", until)
        },
        prevUntil: function(elem, i, until) {
            return jQuery.dir(elem, "previousSibling", until)
        },
        siblings: function(elem) {
            return jQuery.sibling((elem.parentNode || {}).firstChild, elem)
        },
        children: function(elem) {
            return jQuery.sibling(elem.firstChild)
        },
        contents: function(elem) {
            return jQuery.nodeName(elem, "iframe") ? elem.contentDocument || elem.contentWindow.document : jQuery.makeArray(elem.childNodes)
        }
    }, function(name, fn) {
        jQuery.fn[name] = function(until, selector) {
            var ret = jQuery.map(this, fn, until);
            if (!runtil.test(name)) {
                selector = until
            }
            if (selector && typeof selector === "string") {
                ret = jQuery.filter(selector, ret)
            }
            ret = this.length > 1 && !guaranteedUnique[name] ? jQuery.unique(ret) : ret;
            if ((this.length > 1 || rmultiselector.test(selector)) && rparentsprev.test(name)) {
                ret = ret.reverse()
            }
            return this.pushStack(ret, name, slice.call(arguments).join(","))
        }
    });
    jQuery.extend({
        filter: function(expr, elems, not) {
            if (not) {
                expr = ":not(" + expr + ")"
            }
            return elems.length === 1 ? jQuery.find.matchesSelector(elems[0], expr) ? [elems[0]] : [] : jQuery.find.matches(expr, elems)
        },
        dir: function(elem, dir, until) {
            var matched = [],
                cur = elem[dir];
            while (cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery(cur).is(until))) {
                if (cur.nodeType === 1) {
                    matched.push(cur)
                }
                cur = cur[dir]
            }
            return matched
        },
        nth: function(cur, result, dir, elem) {
            result = result || 1;
            var num = 0;
            for (; cur; cur = cur[dir]) {
                if (cur.nodeType === 1 && ++num === result) {
                    break
                }
            }
            return cur
        },
        sibling: function(n, elem) {
            var r = [];
            for (; n; n = n.nextSibling) {
                if (n.nodeType === 1 && n !== elem) {
                    r.push(n)
                }
            }
            return r
        }
    });

    function winnow(elements, qualifier, keep) {
        qualifier = qualifier || 0;
        if (jQuery.isFunction(qualifier)) {
            return jQuery.grep(elements, function(elem, i) {
                var retVal = !!qualifier.call(elem, i, elem);
                return retVal === keep
            })
        } else {
            if (qualifier.nodeType) {
                return jQuery.grep(elements, function(elem, i) {
                    return (elem === qualifier) === keep
                })
            } else {
                if (typeof qualifier === "string") {
                    var filtered = jQuery.grep(elements, function(elem) {
                        return elem.nodeType === 1
                    });
                    if (isSimple.test(qualifier)) {
                        return jQuery.filter(qualifier, filtered, !keep)
                    } else {
                        qualifier = jQuery.filter(qualifier, filtered)
                    }
                }
            }
        }
        return jQuery.grep(elements, function(elem, i) {
            return (jQuery.inArray(elem, qualifier) >= 0) === keep
        })
    }

    function createSafeFragment(document) {
        var list = nodeNames.split("|"),
            safeFrag = document.createDocumentFragment();
        if (safeFrag.createElement) {
            while (list.length) {
                safeFrag.createElement(list.pop())
            }
        }
        return safeFrag
    }
    var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        rinlinejQuery = / jQuery\d+="(?:\d+|null)"/g,
        rleadingWhitespace = /^\s+/,
        rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
        rtagName = /<([\w:]+)/,
        rtbody = /<tbody/i,
        rhtml = /<|&#?\w+;/,
        rnoInnerhtml = /<(?:script|style)/i,
        rnocache = /<(?:script|object|embed|option|style)/i,
        rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
        rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
        rscriptType = /\/(java|ecma)script/i,
        rcleanScript = /^\s*<!(?:\[CDATA\[|\-\-)/,
        wrapMap = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            area: [1, "<map>", "</map>"],
            _default: [0, "", ""]
        },
        safeFragment = createSafeFragment(document);
    wrapMap.optgroup = wrapMap.option;
    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
    wrapMap.th = wrapMap.td;
    if (!jQuery.support.htmlSerialize) {
        wrapMap._default = [1, "div<div>", "</div>"]
    }
    jQuery.fn.extend({
        text: function(value) {
            return jQuery.access(this, function(value) {
                return value === undefined ? jQuery.text(this) : this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(value))
            }, null, value, arguments.length)
        },
        wrapAll: function(html) {
            if (jQuery.isFunction(html)) {
                return this.each(function(i) {
                    jQuery(this).wrapAll(html.call(this, i))
                })
            }
            if (this[0]) {
                var wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
                if (this[0].parentNode) {
                    wrap.insertBefore(this[0])
                }
                wrap.map(function() {
                    var elem = this;
                    while (elem.firstChild && elem.firstChild.nodeType === 1) {
                        elem = elem.firstChild
                    }
                    return elem
                }).append(this)
            }
            return this
        },
        wrapInner: function(html) {
            if (jQuery.isFunction(html)) {
                return this.each(function(i) {
                    jQuery(this).wrapInner(html.call(this, i))
                })
            }
            return this.each(function() {
                var self = jQuery(this),
                    contents = self.contents();
                if (contents.length) {
                    contents.wrapAll(html)
                } else {
                    self.append(html)
                }
            })
        },
        wrap: function(html) {
            var isFunction = jQuery.isFunction(html);
            return this.each(function(i) {
                jQuery(this).wrapAll(isFunction ? html.call(this, i) : html)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                if (!jQuery.nodeName(this, "body")) {
                    jQuery(this).replaceWith(this.childNodes)
                }
            }).end()
        },
        append: function() {
            return this.domManip(arguments, true, function(elem) {
                if (this.nodeType === 1) {
                    this.appendChild(elem)
                }
            })
        },
        prepend: function() {
            return this.domManip(arguments, true, function(elem) {
                if (this.nodeType === 1) {
                    this.insertBefore(elem, this.firstChild)
                }
            })
        },
        before: function() {
            if (this[0] && this[0].parentNode) {
                return this.domManip(arguments, false, function(elem) {
                    this.parentNode.insertBefore(elem, this)
                })
            } else {
                if (arguments.length) {
                    var set = jQuery.clean(arguments);
                    set.push.apply(set, this.toArray());
                    return this.pushStack(set, "before", arguments)
                }
            }
        },
        after: function() {
            if (this[0] && this[0].parentNode) {
                return this.domManip(arguments, false, function(elem) {
                    this.parentNode.insertBefore(elem, this.nextSibling)
                })
            } else {
                if (arguments.length) {
                    var set = this.pushStack(this, "after", arguments);
                    set.push.apply(set, jQuery.clean(arguments));
                    return set
                }
            }
        },
        remove: function(selector, keepData) {
            for (var i = 0, elem;
                (elem = this[i]) != null; i++) {
                if (!selector || jQuery.filter(selector, [elem]).length) {
                    if (!keepData && elem.nodeType === 1) {
                        jQuery.cleanData(elem.getElementsByTagName("*"));
                        jQuery.cleanData([elem])
                    }
                    if (elem.parentNode) {
                        elem.parentNode.removeChild(elem)
                    }
                }
            }
            return this
        },
        empty: function() {
            for (var i = 0, elem;
                (elem = this[i]) != null; i++) {
                if (elem.nodeType === 1) {
                    jQuery.cleanData(elem.getElementsByTagName("*"))
                }
                while (elem.firstChild) {
                    elem.removeChild(elem.firstChild)
                }
            }
            return this
        },
        clone: function(dataAndEvents, deepDataAndEvents) {
            dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
            deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
            return this.map(function() {
                return jQuery.clone(this, dataAndEvents, deepDataAndEvents)
            })
        },
        html: function(value) {
            return jQuery.access(this, function(value) {
                var elem = this[0] || {},
                    i = 0,
                    l = this.length;
                if (value === undefined) {
                    return elem.nodeType === 1 ? elem.innerHTML.replace(rinlinejQuery, "") : null
                }
                if (typeof value === "string" && !rnoInnerhtml.test(value) && (jQuery.support.leadingWhitespace || !rleadingWhitespace.test(value)) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
                    value = value.replace(rxhtmlTag, "<$1></$2>");
                    try {
                        for (; i < l; i++) {
                            elem = this[i] || {};
                            if (elem.nodeType === 1) {
                                jQuery.cleanData(elem.getElementsByTagName("*"));
                                elem.innerHTML = value
                            }
                        }
                        elem = 0
                    } catch (e) {}
                }
                if (elem) {
                    this.empty().append(value)
                }
            }, null, value, arguments.length)
        },
        replaceWith: function(value) {
            if (this[0] && this[0].parentNode) {
                if (jQuery.isFunction(value)) {
                    return this.each(function(i) {
                        var self = jQuery(this),
                            old = self.html();
                        self.replaceWith(value.call(this, i, old))
                    })
                }
                if (typeof value !== "string") {
                    value = jQuery(value).detach()
                }
                return this.each(function() {
                    var next = this.nextSibling,
                        parent = this.parentNode;
                    jQuery(this).remove();
                    if (next) {
                        jQuery(next).before(value)
                    } else {
                        jQuery(parent).append(value)
                    }
                })
            } else {
                return this.length ? this.pushStack(jQuery(jQuery.isFunction(value) ? value() : value), "replaceWith", value) : this
            }
        },
        detach: function(selector) {
            return this.remove(selector, true)
        },
        domManip: function(args, table, callback) {
            var results, first, fragment, parent, value = args[0],
                scripts = [];
            if (!jQuery.support.checkClone && arguments.length === 3 && typeof value === "string" && rchecked.test(value)) {
                return this.each(function() {
                    jQuery(this).domManip(args, table, callback, true)
                })
            }
            if (jQuery.isFunction(value)) {
                return this.each(function(i) {
                    var self = jQuery(this);
                    args[0] = value.call(this, i, table ? self.html() : undefined);
                    self.domManip(args, table, callback)
                })
            }
            if (this[0]) {
                parent = value && value.parentNode;
                if (jQuery.support.parentNode && parent && parent.nodeType === 11 && parent.childNodes.length === this.length) {
                    results = {
                        fragment: parent
                    }
                } else {
                    results = jQuery.buildFragment(args, this, scripts)
                }
                fragment = results.fragment;
                if (fragment.childNodes.length === 1) {
                    first = fragment = fragment.firstChild
                } else {
                    first = fragment.firstChild
                }
                if (first) {
                    table = table && jQuery.nodeName(first, "tr");
                    for (var i = 0, l = this.length, lastIndex = l - 1; i < l; i++) {
                        callback.call(table ? root(this[i], first) : this[i], results.cacheable || (l > 1 && i < lastIndex) ? jQuery.clone(fragment, true, true) : fragment)
                    }
                }
                if (scripts.length) {
                    jQuery.each(scripts, function(i, elem) {
                        if (elem.src) {
                            jQuery.ajax({
                                type: "GET",
                                global: false,
                                url: elem.src,
                                async: false,
                                dataType: "script"
                            })
                        } else {
                            jQuery.globalEval((elem.text || elem.textContent || elem.innerHTML || "").replace(rcleanScript, "/*$0*/"))
                        }
                        if (elem.parentNode) {
                            elem.parentNode.removeChild(elem)
                        }
                    })
                }
            }
            return this
        }
    });

    function root(elem, cur) {
        return jQuery.nodeName(elem, "table") ? (elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody"))) : elem
    }

    function cloneCopyEvent(src, dest) {
        if (dest.nodeType !== 1 || !jQuery.hasData(src)) {
            return
        }
        var type, i, l, oldData = jQuery._data(src),
            curData = jQuery._data(dest, oldData),
            events = oldData.events;
        if (events) {
            delete curData.handle;
            curData.events = {};
            for (type in events) {
                for (i = 0, l = events[type].length; i < l; i++) {
                    jQuery.event.add(dest, type, events[type][i])
                }
            }
        }
        if (curData.data) {
            curData.data = jQuery.extend({}, curData.data)
        }
    }

    function cloneFixAttributes(src, dest) {
        var nodeName;
        if (dest.nodeType !== 1) {
            return
        }
        if (dest.clearAttributes) {
            dest.clearAttributes()
        }
        if (dest.mergeAttributes) {
            dest.mergeAttributes(src)
        }
        nodeName = dest.nodeName.toLowerCase();
        if (nodeName === "object") {
            dest.outerHTML = src.outerHTML
        } else {
            if (nodeName === "input" && (src.type === "checkbox" || src.type === "radio")) {
                if (src.checked) {
                    dest.defaultChecked = dest.checked = src.checked
                }
                if (dest.value !== src.value) {
                    dest.value = src.value
                }
            } else {
                if (nodeName === "option") {
                    dest.selected = src.defaultSelected
                } else {
                    if (nodeName === "input" || nodeName === "textarea") {
                        dest.defaultValue = src.defaultValue
                    } else {
                        if (nodeName === "script" && dest.text !== src.text) {
                            dest.text = src.text
                        }
                    }
                }
            }
        }
        dest.removeAttribute(jQuery.expando);
        dest.removeAttribute("_submit_attached");
        dest.removeAttribute("_change_attached")
    }
    jQuery.buildFragment = function(args, nodes, scripts) {
        var fragment, cacheable, cacheresults, doc, first = args[0];
        if (nodes && nodes[0]) {
            doc = nodes[0].ownerDocument || nodes[0]
        }
        if (!doc.createDocumentFragment) {
            doc = document
        }
        if (args.length === 1 && typeof first === "string" && first.length < 512 && doc === document && first.charAt(0) === "<" && !rnocache.test(first) && (jQuery.support.checkClone || !rchecked.test(first)) && (jQuery.support.html5Clone || !rnoshimcache.test(first))) {
            cacheable = true;
            cacheresults = jQuery.fragments[first];
            if (cacheresults && cacheresults !== 1) {
                fragment = cacheresults
            }
        }
        if (!fragment) {
            fragment = doc.createDocumentFragment();
            jQuery.clean(args, doc, fragment, scripts)
        }
        if (cacheable) {
            jQuery.fragments[first] = cacheresults ? fragment : 1
        }
        return {
            fragment: fragment,
            cacheable: cacheable
        }
    };
    jQuery.fragments = {};
    jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(name, original) {
        jQuery.fn[name] = function(selector) {
            var ret = [],
                insert = jQuery(selector),
                parent = this.length === 1 && this[0].parentNode;
            if (parent && parent.nodeType === 11 && parent.childNodes.length === 1 && insert.length === 1) {
                insert[original](this[0]);
                return this
            } else {
                for (var i = 0, l = insert.length; i < l; i++) {
                    var elems = (i > 0 ? this.clone(true) : this).get();
                    jQuery(insert[i])[original](elems);
                    ret = ret.concat(elems)
                }
                return this.pushStack(ret, name, insert.selector)
            }
        }
    });

    function getAll(elem) {
        if (typeof elem.getElementsByTagName !== "undefined") {
            return elem.getElementsByTagName("*")
        } else {
            if (typeof elem.querySelectorAll !== "undefined") {
                return elem.querySelectorAll("*")
            } else {
                return []
            }
        }
    }

    function fixDefaultChecked(elem) {
        if (elem.type === "checkbox" || elem.type === "radio") {
            elem.defaultChecked = elem.checked
        }
    }

    function findInputs(elem) {
        var nodeName = (elem.nodeName || "").toLowerCase();
        if (nodeName === "input") {
            fixDefaultChecked(elem)
        } else {
            if (nodeName !== "script" && typeof elem.getElementsByTagName !== "undefined") {
                jQuery.grep(elem.getElementsByTagName("input"), fixDefaultChecked)
            }
        }
    }

    function shimCloneNode(elem) {
        var div = document.createElement("div");
        safeFragment.appendChild(div);
        div.innerHTML = elem.outerHTML;
        return div.firstChild
    }
    jQuery.extend({
        clone: function(elem, dataAndEvents, deepDataAndEvents) {
            var srcElements, destElements, i, clone = jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test("<" + elem.nodeName + ">") ? elem.cloneNode(true) : shimCloneNode(elem);
            if ((!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
                cloneFixAttributes(elem, clone);
                srcElements = getAll(elem);
                destElements = getAll(clone);
                for (i = 0; srcElements[i]; ++i) {
                    if (destElements[i]) {
                        cloneFixAttributes(srcElements[i], destElements[i])
                    }
                }
            }
            if (dataAndEvents) {
                cloneCopyEvent(elem, clone);
                if (deepDataAndEvents) {
                    srcElements = getAll(elem);
                    destElements = getAll(clone);
                    for (i = 0; srcElements[i]; ++i) {
                        cloneCopyEvent(srcElements[i], destElements[i])
                    }
                }
            }
            srcElements = destElements = null;
            return clone
        },
        clean: function(elems, context, fragment, scripts) {
            var checkScriptType, script, j, ret = [];
            context = context || document;
            if (typeof context.createElement === "undefined") {
                context = context.ownerDocument || context[0] && context[0].ownerDocument || document
            }
            for (var i = 0, elem;
                (elem = elems[i]) != null; i++) {
                if (typeof elem === "number") {
                    elem += ""
                }
                if (!elem) {
                    continue
                }
                if (typeof elem === "string") {
                    if (!rhtml.test(elem)) {
                        elem = context.createTextNode(elem)
                    } else {
                        elem = elem.replace(rxhtmlTag, "<$1></$2>");
                        var tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase(),
                            wrap = wrapMap[tag] || wrapMap._default,
                            depth = wrap[0],
                            div = context.createElement("div"),
                            safeChildNodes = safeFragment.childNodes,
                            remove;
                        if (context === document) {
                            safeFragment.appendChild(div)
                        } else {
                            createSafeFragment(context).appendChild(div)
                        }
                        div.innerHTML = wrap[1] + elem + wrap[2];
                        while (depth--) {
                            div = div.lastChild
                        }
                        if (!jQuery.support.tbody) {
                            var hasBody = rtbody.test(elem),
                                tbody = tag === "table" && !hasBody ? div.firstChild && div.firstChild.childNodes : wrap[1] === "<table>" && !hasBody ? div.childNodes : [];
                            for (j = tbody.length - 1; j >= 0; --j) {
                                if (jQuery.nodeName(tbody[j], "tbody") && !tbody[j].childNodes.length) {
                                    tbody[j].parentNode.removeChild(tbody[j])
                                }
                            }
                        }
                        if (!jQuery.support.leadingWhitespace && rleadingWhitespace.test(elem)) {
                            div.insertBefore(context.createTextNode(rleadingWhitespace.exec(elem)[0]), div.firstChild)
                        }
                        elem = div.childNodes;
                        if (div) {
                            div.parentNode.removeChild(div);
                            if (safeChildNodes.length > 0) {
                                remove = safeChildNodes[safeChildNodes.length - 1];
                                if (remove && remove.parentNode) {
                                    remove.parentNode.removeChild(remove)
                                }
                            }
                        }
                    }
                }
                var len;
                if (!jQuery.support.appendChecked) {
                    if (elem[0] && typeof(len = elem.length) === "number") {
                        for (j = 0; j < len; j++) {
                            findInputs(elem[j])
                        }
                    } else {
                        findInputs(elem)
                    }
                }
                if (elem.nodeType) {
                    ret.push(elem)
                } else {
                    ret = jQuery.merge(ret, elem)
                }
            }
            if (fragment) {
                checkScriptType = function(elem) {
                    return !elem.type || rscriptType.test(elem.type)
                };
                for (i = 0; ret[i]; i++) {
                    script = ret[i];
                    if (scripts && jQuery.nodeName(script, "script") && (!script.type || rscriptType.test(script.type))) {
                        scripts.push(script.parentNode ? script.parentNode.removeChild(script) : script)
                    } else {
                        if (script.nodeType === 1) {
                            var jsTags = jQuery.grep(script.getElementsByTagName("script"), checkScriptType);
                            ret.splice.apply(ret, [i + 1, 0].concat(jsTags))
                        }
                        fragment.appendChild(script)
                    }
                }
            }
            return ret
        },
        cleanData: function(elems) {
            var data, id, cache = jQuery.cache,
                special = jQuery.event.special,
                deleteExpando = jQuery.support.deleteExpando;
            for (var i = 0, elem;
                (elem = elems[i]) != null; i++) {
                if (elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()]) {
                    continue
                }
                id = elem[jQuery.expando];
                if (id) {
                    data = cache[id];
                    if (data && data.events) {
                        for (var type in data.events) {
                            if (special[type]) {
                                jQuery.event.remove(elem, type)
                            } else {
                                jQuery.removeEvent(elem, type, data.handle)
                            }
                        }
                        if (data.handle) {
                            data.handle.elem = null
                        }
                    }
                    if (deleteExpando) {
                        delete elem[jQuery.expando]
                    } else {
                        if (elem.removeAttribute) {
                            elem.removeAttribute(jQuery.expando)
                        }
                    }
                    delete cache[id]
                }
            }
        }
    });
    var ralpha = /alpha\([^)]*\)/i,
        ropacity = /opacity=([^)]*)/,
        rupper = /([A-Z]|^ms)/g,
        rnum = /^[\-+]?(?:\d*\.)?\d+$/i,
        rnumnonpx = /^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i,
        rrelNum = /^([\-+])=([\-+.\de]+)/,
        rmargin = /^margin/,
        cssShow = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        cssExpand = ["Top", "Right", "Bottom", "Left"],
        curCSS, getComputedStyle, currentStyle;
    jQuery.fn.css = function(name, value) {
        return jQuery.access(this, function(elem, name, value) {
            return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name)
        }, name, value, arguments.length > 1)
    };
    jQuery.extend({
        cssHooks: {
            opacity: {
                get: function(elem, computed) {
                    if (computed) {
                        var ret = curCSS(elem, "opacity");
                        return ret === "" ? "1" : ret
                    } else {
                        return elem.style.opacity
                    }
                }
            }
        },
        cssNumber: {
            fillOpacity: true,
            fontWeight: true,
            lineHeight: true,
            opacity: true,
            orphans: true,
            widows: true,
            zIndex: true,
            zoom: true
        },
        cssProps: {
            "float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(elem, name, value, extra) {
            if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
                return
            }
            var ret, type, origName = jQuery.camelCase(name),
                style = elem.style,
                hooks = jQuery.cssHooks[origName];
            name = jQuery.cssProps[origName] || origName;
            if (value !== undefined) {
                type = typeof value;
                if (type === "string" && (ret = rrelNum.exec(value))) {
                    value = (+(ret[1] + 1) * +ret[2]) + parseFloat(jQuery.css(elem, name));
                    type = "number"
                }
                if (value == null || type === "number" && isNaN(value)) {
                    return
                }
                if (type === "number" && !jQuery.cssNumber[origName]) {
                    value += "px"
                }
                if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value)) !== undefined) {
                    try {
                        style[name] = value
                    } catch (e) {}
                }
            } else {
                if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
                    return ret
                }
                return style[name]
            }
        },
        css: function(elem, name, extra) {
            var ret, hooks;
            name = jQuery.camelCase(name);
            hooks = jQuery.cssHooks[name];
            name = jQuery.cssProps[name] || name;
            if (name === "cssFloat") {
                name = "float"
            }
            if (hooks && "get" in hooks && (ret = hooks.get(elem, true, extra)) !== undefined) {
                return ret
            } else {
                if (curCSS) {
                    return curCSS(elem, name)
                }
            }
        },
        swap: function(elem, options, callback) {
            var old = {},
                ret, name;
            for (name in options) {
                old[name] = elem.style[name];
                elem.style[name] = options[name]
            }
            ret = callback.call(elem);
            for (name in options) {
                elem.style[name] = old[name]
            }
            return ret
        }
    });
    jQuery.curCSS = jQuery.css;
    if (document.defaultView && document.defaultView.getComputedStyle) {
        getComputedStyle = function(elem, name) {
            var ret, defaultView, computedStyle, width, style = elem.style;
            name = name.replace(rupper, "-$1").toLowerCase();
            if ((defaultView = elem.ownerDocument.defaultView) && (computedStyle = defaultView.getComputedStyle(elem, null))) {
                ret = computedStyle.getPropertyValue(name);
                if (ret === "" && !jQuery.contains(elem.ownerDocument.documentElement, elem)) {
                    ret = jQuery.style(elem, name)
                }
            }
            if (!jQuery.support.pixelMargin && computedStyle && rmargin.test(name) && rnumnonpx.test(ret)) {
                width = style.width;
                style.width = ret;
                ret = computedStyle.width;
                style.width = width
            }
            return ret
        }
    }
    if (document.documentElement.currentStyle) {
        currentStyle = function(elem, name) {
            var left, rsLeft, uncomputed, ret = elem.currentStyle && elem.currentStyle[name],
                style = elem.style;
            if (ret == null && style && (uncomputed = style[name])) {
                ret = uncomputed
            }
            if (rnumnonpx.test(ret)) {
                left = style.left;
                rsLeft = elem.runtimeStyle && elem.runtimeStyle.left;
                if (rsLeft) {
                    elem.runtimeStyle.left = elem.currentStyle.left
                }
                style.left = name === "fontSize" ? "1em" : ret;
                ret = style.pixelLeft + "px";
                style.left = left;
                if (rsLeft) {
                    elem.runtimeStyle.left = rsLeft
                }
            }
            return ret === "" ? "auto" : ret
        }
    }
    curCSS = getComputedStyle || currentStyle;

    function getWidthOrHeight(elem, name, extra) {
        var val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
            i = name === "width" ? 1 : 0,
            len = 4;
        if (val > 0) {
            if (extra !== "border") {
                for (; i < len; i += 2) {
                    if (!extra) {
                        val -= parseFloat(jQuery.css(elem, "padding" + cssExpand[i])) || 0
                    }
                    if (extra === "margin") {
                        val += parseFloat(jQuery.css(elem, extra + cssExpand[i])) || 0
                    } else {
                        val -= parseFloat(jQuery.css(elem, "border" + cssExpand[i] + "Width")) || 0
                    }
                }
            }
            return val + "px"
        }
        val = curCSS(elem, name);
        if (val < 0 || val == null) {
            val = elem.style[name]
        }
        if (rnumnonpx.test(val)) {
            return val
        }
        val = parseFloat(val) || 0;
        if (extra) {
            for (; i < len; i += 2) {
                val += parseFloat(jQuery.css(elem, "padding" + cssExpand[i])) || 0;
                if (extra !== "padding") {
                    val += parseFloat(jQuery.css(elem, "border" + cssExpand[i] + "Width")) || 0
                }
                if (extra === "margin") {
                    val += parseFloat(jQuery.css(elem, extra + cssExpand[i])) || 0
                }
            }
        }
        return val + "px"
    }
    jQuery.each(["height", "width"], function(i, name) {
        jQuery.cssHooks[name] = {
            get: function(elem, computed, extra) {
                if (computed) {
                    if (elem.offsetWidth !== 0) {
                        return getWidthOrHeight(elem, name, extra)
                    } else {
                        return jQuery.swap(elem, cssShow, function() {
                            return getWidthOrHeight(elem, name, extra)
                        })
                    }
                }
            },
            set: function(elem, value) {
                return rnum.test(value) ? value + "px" : value
            }
        }
    });
    if (!jQuery.support.opacity) {
        jQuery.cssHooks.opacity = {
            get: function(elem, computed) {
                return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "") ? (parseFloat(RegExp.$1) / 100) + "" : computed ? "1" : ""
            },
            set: function(elem, value) {
                var style = elem.style,
                    currentStyle = elem.currentStyle,
                    opacity = jQuery.isNumeric(value) ? "alpha(opacity=" + value * 100 + ")" : "",
                    filter = currentStyle && currentStyle.filter || style.filter || "";
                style.zoom = 1;
                if (value >= 1 && jQuery.trim(filter.replace(ralpha, "")) === "") {
                    style.removeAttribute("filter");
                    if (currentStyle && !currentStyle.filter) {
                        return
                    }
                }
                style.filter = ralpha.test(filter) ? filter.replace(ralpha, opacity) : filter + " " + opacity
            }
        }
    }
    jQuery(function() {
        if (!jQuery.support.reliableMarginRight) {
            jQuery.cssHooks.marginRight = {
                get: function(elem, computed) {
                    return jQuery.swap(elem, {
                        display: "inline-block"
                    }, function() {
                        if (computed) {
                            return curCSS(elem, "margin-right")
                        } else {
                            return elem.style.marginRight
                        }
                    })
                }
            }
        }
    });
    if (jQuery.expr && jQuery.expr.filters) {
        jQuery.expr.filters.hidden = function(elem) {
            var width = elem.offsetWidth,
                height = elem.offsetHeight;
            return (width === 0 && height === 0) || (!jQuery.support.reliableHiddenOffsets && ((elem.style && elem.style.display) || jQuery.css(elem, "display")) === "none")
        };
        jQuery.expr.filters.visible = function(elem) {
            return !jQuery.expr.filters.hidden(elem)
        }
    }
    jQuery.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(prefix, suffix) {
        jQuery.cssHooks[prefix + suffix] = {
            expand: function(value) {
                var i, parts = typeof value === "string" ? value.split(" ") : [value],
                    expanded = {};
                for (i = 0; i < 4; i++) {
                    expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0]
                }
                return expanded
            }
        }
    });
    var r20 = /%20/g,
        rbracket = /\[\]$/,
        rCRLF = /\r?\n/g,
        rhash = /#.*$/,
        rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
        rinput = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
        rlocalProtocol = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
        rnoContent = /^(?:GET|HEAD)$/,
        rprotocol = /^\/\//,
        rquery = /\?/,
        rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        rselectTextarea = /^(?:select|textarea)/i,
        rspacesAjax = /\s+/,
        rts = /([?&])_=[^&]*/,
        rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,
        _load = jQuery.fn.load,
        prefilters = {},
        transports = {},
        ajaxLocation, ajaxLocParts, allTypes = ["*/"] + ["*"];
    try {
        ajaxLocation = location.href
    } catch (e) {
        ajaxLocation = document.createElement("a");
        ajaxLocation.href = "";
        ajaxLocation = ajaxLocation.href
    }
    ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];

    function addToPrefiltersOrTransports(structure) {
        return function(dataTypeExpression, func) {
            if (typeof dataTypeExpression !== "string") {
                func = dataTypeExpression;
                dataTypeExpression = "*"
            }
            if (jQuery.isFunction(func)) {
                var dataTypes = dataTypeExpression.toLowerCase().split(rspacesAjax),
                    i = 0,
                    length = dataTypes.length,
                    dataType, list, placeBefore;
                for (; i < length; i++) {
                    dataType = dataTypes[i];
                    placeBefore = /^\+/.test(dataType);
                    if (placeBefore) {
                        dataType = dataType.substr(1) || "*"
                    }
                    list = structure[dataType] = structure[dataType] || [];
                    list[placeBefore ? "unshift" : "push"](func)
                }
            }
        }
    }

    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR, dataType, inspected) {
        dataType = dataType || options.dataTypes[0];
        inspected = inspected || {};
        inspected[dataType] = true;
        var list = structure[dataType],
            i = 0,
            length = list ? list.length : 0,
            executeOnly = (structure === prefilters),
            selection;
        for (; i < length && (executeOnly || !selection); i++) {
            selection = list[i](options, originalOptions, jqXHR);
            if (typeof selection === "string") {
                if (!executeOnly || inspected[selection]) {
                    selection = undefined
                } else {
                    options.dataTypes.unshift(selection);
                    selection = inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR, selection, inspected)
                }
            }
        }
        if ((executeOnly || !selection) && !inspected["*"]) {
            selection = inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR, "*", inspected)
        }
        return selection
    }

    function ajaxExtend(target, src) {
        var key, deep, flatOptions = jQuery.ajaxSettings.flatOptions || {};
        for (key in src) {
            if (src[key] !== undefined) {
                (flatOptions[key] ? target : (deep || (deep = {})))[key] = src[key]
            }
        }
        if (deep) {
            jQuery.extend(true, target, deep)
        }
    }
    jQuery.fn.extend({
        load: function(url, params, callback) {
            if (typeof url !== "string" && _load) {
                return _load.apply(this, arguments)
            } else {
                if (!this.length) {
                    return this
                }
            }
            var off = url.indexOf(" ");
            if (off >= 0) {
                var selector = url.slice(off, url.length);
                url = url.slice(0, off)
            }
            var type = "GET";
            if (params) {
                if (jQuery.isFunction(params)) {
                    callback = params;
                    params = undefined
                } else {
                    if (typeof params === "object") {
                        params = jQuery.param(params, jQuery.ajaxSettings.traditional);
                        type = "POST"
                    }
                }
            }
            var self = this;
            jQuery.ajax({
                url: url,
                type: type,
                dataType: "html",
                data: params,
                complete: function(jqXHR, status, responseText) {
                    responseText = jqXHR.responseText;
                    if (jqXHR.isResolved()) {
                        jqXHR.done(function(r) {
                            responseText = r
                        });
                        self.html(selector ? jQuery("<div>").append(responseText.replace(rscript, "")).find(selector) : responseText)
                    }
                    if (callback) {
                        self.each(callback, [responseText, status, jqXHR])
                    }
                }
            });
            return this
        },
        serialize: function() {
            return jQuery.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                return this.elements ? jQuery.makeArray(this.elements) : this
            }).filter(function() {
                return this.name && !this.disabled && (this.checked || rselectTextarea.test(this.nodeName) || rinput.test(this.type))
            }).map(function(i, elem) {
                var val = jQuery(this).val();
                return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function(val, i) {
                    return {
                        name: elem.name,
                        value: val.replace(rCRLF, "\r\n")
                    }
                }) : {
                    name: elem.name,
                    value: val.replace(rCRLF, "\r\n")
                }
            }).get()
        }
    });
    jQuery.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(i, o) {
        jQuery.fn[o] = function(f) {
            return this.on(o, f)
        }
    });
    jQuery.each(["get", "post"], function(i, method) {
        jQuery[method] = function(url, data, callback, type) {
            if (jQuery.isFunction(data)) {
                type = type || callback;
                callback = data;
                data = undefined
            }
            return jQuery.ajax({
                type: method,
                url: url,
                data: data,
                success: callback,
                dataType: type
            })
        }
    });
    jQuery.extend({
        getScript: function(url, callback) {
            return jQuery.get(url, undefined, callback, "script")
        },
        getJSON: function(url, data, callback) {
            return jQuery.get(url, data, callback, "json")
        },
        ajaxSetup: function(target, settings) {
            if (settings) {
                ajaxExtend(target, jQuery.ajaxSettings)
            } else {
                settings = target;
                target = jQuery.ajaxSettings
            }
            ajaxExtend(target, settings);
            return target
        },
        ajaxSettings: {
            url: ajaxLocation,
            isLocal: rlocalProtocol.test(ajaxLocParts[1]),
            global: true,
            type: "GET",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            processData: true,
            async: true,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": allTypes
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": window.String,
                "text html": true,
                "text json": jQuery.parseJSON,
                "text xml": jQuery.parseXML
            },
            flatOptions: {
                context: true,
                url: true
            }
        },
        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),
        ajax: function(url, options) {
            if (typeof url === "object") {
                options = url;
                url = undefined
            }
            options = options || {};
            var s = jQuery.ajaxSetup({}, options),
                callbackContext = s.context || s,
                globalEventContext = callbackContext !== s && (callbackContext.nodeType || callbackContext instanceof jQuery) ? jQuery(callbackContext) : jQuery.event,
                deferred = jQuery.Deferred(),
                completeDeferred = jQuery.Callbacks("once memory"),
                statusCode = s.statusCode || {},
                ifModifiedKey, requestHeaders = {},
                requestHeadersNames = {},
                responseHeadersString, responseHeaders, transport, timeoutTimer, parts, state = 0,
                fireGlobals, i, jqXHR = {
                    readyState: 0,
                    setRequestHeader: function(name, value) {
                        if (!state) {
                            var lname = name.toLowerCase();
                            name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
                            requestHeaders[name] = value
                        }
                        return this
                    },
                    getAllResponseHeaders: function() {
                        return state === 2 ? responseHeadersString : null
                    },
                    getResponseHeader: function(key) {
                        var match;
                        if (state === 2) {
                            if (!responseHeaders) {
                                responseHeaders = {};
                                while ((match = rheaders.exec(responseHeadersString))) {
                                    responseHeaders[match[1].toLowerCase()] = match[2]
                                }
                            }
                            match = responseHeaders[key.toLowerCase()]
                        }
                        return match === undefined ? null : match
                    },
                    overrideMimeType: function(type) {
                        if (!state) {
                            s.mimeType = type
                        }
                        return this
                    },
                    abort: function(statusText) {
                        statusText = statusText || "abort";
                        if (transport) {
                            transport.abort(statusText)
                        }
                        done(0, statusText);
                        return this
                    }
                };

            function done(status, nativeStatusText, responses, headers) {
                if (state === 2) {
                    return
                }
                state = 2;
                if (timeoutTimer) {
                    clearTimeout(timeoutTimer)
                }
                transport = undefined;
                responseHeadersString = headers || "";
                jqXHR.readyState = status > 0 ? 4 : 0;
                var isSuccess, success, error, statusText = nativeStatusText,
                    response = responses ? ajaxHandleResponses(s, jqXHR, responses) : undefined,
                    lastModified, etag;
                if (status >= 200 && status < 300 || status === 304) {
                    if (s.ifModified) {
                        if ((lastModified = jqXHR.getResponseHeader("Last-Modified"))) {
                            jQuery.lastModified[ifModifiedKey] = lastModified
                        }
                        if ((etag = jqXHR.getResponseHeader("Etag"))) {
                            jQuery.etag[ifModifiedKey] = etag
                        }
                    }
                    if (status === 304) {
                        statusText = "notmodified";
                        isSuccess = true
                    } else {
                        try {
                            success = ajaxConvert(s, response);
                            statusText = "success";
                            isSuccess = true
                        } catch (e) {
                            statusText = "parsererror";
                            error = e
                        }
                    }
                } else {
                    error = statusText;
                    if (!statusText || status) {
                        statusText = "error";
                        if (status < 0) {
                            status = 0
                        }
                    }
                }
                jqXHR.status = status;
                jqXHR.statusText = "" + (nativeStatusText || statusText);
                if (isSuccess) {
                    deferred.resolveWith(callbackContext, [success, statusText, jqXHR])
                } else {
                    deferred.rejectWith(callbackContext, [jqXHR, statusText, error])
                }
                jqXHR.statusCode(statusCode);
                statusCode = undefined;
                if (fireGlobals) {
                    globalEventContext.trigger("ajax" + (isSuccess ? "Success" : "Error"), [jqXHR, s, isSuccess ? success : error])
                }
                completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
                if (fireGlobals) {
                    globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
                    if (!(--jQuery.active)) {
                        jQuery.event.trigger("ajaxStop")
                    }
                }
            }
            deferred.promise(jqXHR);
            jqXHR.success = jqXHR.done;
            jqXHR.error = jqXHR.fail;
            jqXHR.complete = completeDeferred.add;
            jqXHR.statusCode = function(map) {
                if (map) {
                    var tmp;
                    if (state < 2) {
                        for (tmp in map) {
                            statusCode[tmp] = [statusCode[tmp], map[tmp]]
                        }
                    } else {
                        tmp = map[jqXHR.status];
                        jqXHR.then(tmp, tmp)
                    }
                }
                return this
            };
            s.url = ((url || s.url) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//");
            s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().split(rspacesAjax);
            if (s.crossDomain == null) {
                parts = rurl.exec(s.url.toLowerCase());
                s.crossDomain = !!(parts && (parts[1] != ajaxLocParts[1] || parts[2] != ajaxLocParts[2] || (parts[3] || (parts[1] === "http:" ? 80 : 443)) != (ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? 80 : 443))))
            }
            if (s.data && s.processData && typeof s.data !== "string") {
                s.data = jQuery.param(s.data, s.traditional)
            }
            inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
            if (state === 2) {
                return false
            }
            fireGlobals = s.global;
            s.type = s.type.toUpperCase();
            s.hasContent = !rnoContent.test(s.type);
            if (fireGlobals && jQuery.active++ === 0) {
                jQuery.event.trigger("ajaxStart")
            }
            if (!s.hasContent) {
                if (s.data) {
                    s.url += (rquery.test(s.url) ? "&" : "?") + s.data;
                    delete s.data
                }
                ifModifiedKey = s.url;
                if (s.cache === false) {
                    var ts = jQuery.now(),
                        ret = s.url.replace(rts, "$1_=" + ts);
                    s.url = ret + ((ret === s.url) ? (rquery.test(s.url) ? "&" : "?") + "_=" + ts : "")
                }
            }
            if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
                jqXHR.setRequestHeader("Content-Type", s.contentType)
            }
            if (s.ifModified) {
                ifModifiedKey = ifModifiedKey || s.url;
                if (jQuery.lastModified[ifModifiedKey]) {
                    jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[ifModifiedKey])
                }
                if (jQuery.etag[ifModifiedKey]) {
                    jqXHR.setRequestHeader("If-None-Match", jQuery.etag[ifModifiedKey])
                }
            }
            jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
            for (i in s.headers) {
                jqXHR.setRequestHeader(i, s.headers[i])
            }
            if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {
                jqXHR.abort();
                return false
            }
            for (i in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) {
                jqXHR[i](s[i])
            }
            transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
            if (!transport) {
                done(-1, "No Transport")
            } else {
                jqXHR.readyState = 1;
                if (fireGlobals) {
                    globalEventContext.trigger("ajaxSend", [jqXHR, s])
                }
                if (s.async && s.timeout > 0) {
                    timeoutTimer = setTimeout(function() {
                        jqXHR.abort("timeout")
                    }, s.timeout)
                }
                try {
                    state = 1;
                    transport.send(requestHeaders, done)
                } catch (e) {
                    if (state < 2) {
                        done(-1, e)
                    } else {
                        throw e
                    }
                }
            }
            return jqXHR
        },
        param: function(a, traditional) {
            var s = [],
                add = function(key, value) {
                    value = jQuery.isFunction(value) ? value() : value;
                    s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value)
                };
            if (traditional === undefined) {
                traditional = jQuery.ajaxSettings.traditional
            }
            if (jQuery.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {
                jQuery.each(a, function() {
                    add(this.name, this.value)
                })
            } else {
                for (var prefix in a) {
                    buildParams(prefix, a[prefix], traditional, add)
                }
            }
            return s.join("&").replace(r20, "+")
        }
    });

    function buildParams(prefix, obj, traditional, add) {
        if (jQuery.isArray(obj)) {
            jQuery.each(obj, function(i, v) {
                if (traditional || rbracket.test(prefix)) {
                    add(prefix, v)
                } else {
                    buildParams(prefix + "[" + (typeof v === "object" ? i : "") + "]", v, traditional, add)
                }
            })
        } else {
            if (!traditional && jQuery.type(obj) === "object") {
                for (var name in obj) {
                    buildParams(prefix + "[" + name + "]", obj[name], traditional, add)
                }
            } else {
                add(prefix, obj)
            }
        }
    }
    jQuery.extend({
        active: 0,
        lastModified: {},
        etag: {}
    });

    function ajaxHandleResponses(s, jqXHR, responses) {
        var contents = s.contents,
            dataTypes = s.dataTypes,
            responseFields = s.responseFields,
            ct, type, finalDataType, firstDataType;
        for (type in responseFields) {
            if (type in responses) {
                jqXHR[responseFields[type]] = responses[type]
            }
        }
        while (dataTypes[0] === "*") {
            dataTypes.shift();
            if (ct === undefined) {
                ct = s.mimeType || jqXHR.getResponseHeader("content-type")
            }
        }
        if (ct) {
            for (type in contents) {
                if (contents[type] && contents[type].test(ct)) {
                    dataTypes.unshift(type);
                    break
                }
            }
        }
        if (dataTypes[0] in responses) {
            finalDataType = dataTypes[0]
        } else {
            for (type in responses) {
                if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                    finalDataType = type;
                    break
                }
                if (!firstDataType) {
                    firstDataType = type
                }
            }
            finalDataType = finalDataType || firstDataType
        }
        if (finalDataType) {
            if (finalDataType !== dataTypes[0]) {
                dataTypes.unshift(finalDataType)
            }
            return responses[finalDataType]
        }
    }

    function ajaxConvert(s, response) {
        if (s.dataFilter) {
            response = s.dataFilter(response, s.dataType)
        }
        var dataTypes = s.dataTypes,
            converters = {},
            i, key, length = dataTypes.length,
            tmp, current = dataTypes[0],
            prev, conversion, conv, conv1, conv2;
        for (i = 1; i < length; i++) {
            if (i === 1) {
                for (key in s.converters) {
                    if (typeof key === "string") {
                        converters[key.toLowerCase()] = s.converters[key]
                    }
                }
            }
            prev = current;
            current = dataTypes[i];
            if (current === "*") {
                current = prev
            } else {
                if (prev !== "*" && prev !== current) {
                    conversion = prev + " " + current;
                    conv = converters[conversion] || converters["* " + current];
                    if (!conv) {
                        conv2 = undefined;
                        for (conv1 in converters) {
                            tmp = conv1.split(" ");
                            if (tmp[0] === prev || tmp[0] === "*") {
                                conv2 = converters[tmp[1] + " " + current];
                                if (conv2) {
                                    conv1 = converters[conv1];
                                    if (conv1 === true) {
                                        conv = conv2
                                    } else {
                                        if (conv2 === true) {
                                            conv = conv1
                                        }
                                    }
                                    break
                                }
                            }
                        }
                    }
                    if (!(conv || conv2)) {
                        jQuery.error("No conversion from " + conversion.replace(" ", " to "))
                    }
                    if (conv !== true) {
                        response = conv ? conv(response) : conv2(conv1(response))
                    }
                }
            }
        }
        return response
    }
    var jsc = jQuery.now(),
        jsre = /(\=)\?(&|$)|\?\?/i;
    jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            return jQuery.expando + "_" + (jsc++)
        }
    });
    jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
        var inspectData = (typeof s.data === "string") && /^application\/x\-www\-form\-urlencoded/.test(s.contentType);
        if (s.dataTypes[0] === "jsonp" || s.jsonp !== false && (jsre.test(s.url) || inspectData && jsre.test(s.data))) {
            var responseContainer, jsonpCallback = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback,
                previous = window[jsonpCallback],
                url = s.url,
                data = s.data,
                replace = "$1" + jsonpCallback + "$2";
            if (s.jsonp !== false) {
                url = url.replace(jsre, replace);
                if (s.url === url) {
                    if (inspectData) {
                        data = data.replace(jsre, replace)
                    }
                    if (s.data === data) {
                        url += (/\?/.test(url) ? "&" : "?") + s.jsonp + "=" + jsonpCallback
                    }
                }
            }
            s.url = url;
            s.data = data;
            window[jsonpCallback] = function(response) {
                responseContainer = [response]
            };
            jqXHR.always(function() {
                window[jsonpCallback] = previous;
                if (responseContainer && jQuery.isFunction(previous)) {
                    window[jsonpCallback](responseContainer[0])
                }
            });
            s.converters["script json"] = function() {
                if (!responseContainer) {
                    jQuery.error(jsonpCallback + " was not called")
                }
                return responseContainer[0]
            };
            s.dataTypes[0] = "json";
            return "script"
        }
    });
    jQuery.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /javascript|ecmascript/
        },
        converters: {
            "text script": function(text) {
                jQuery.globalEval(text);
                return text
            }
        }
    });
    jQuery.ajaxPrefilter("script", function(s) {
        if (s.cache === undefined) {
            s.cache = false
        }
        if (s.crossDomain) {
            s.type = "GET";
            s.global = false
        }
    });
    jQuery.ajaxTransport("script", function(s) {
        if (s.crossDomain) {
            var script, head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
            return {
                send: function(_, callback) {
                    script = document.createElement("script");
                    script.async = "async";
                    if (s.scriptCharset) {
                        script.charset = s.scriptCharset
                    }
                    script.src = s.url;
                    script.onload = script.onreadystatechange = function(_, isAbort) {
                        if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
                            script.onload = script.onreadystatechange = null;
                            if (head && script.parentNode) {
                                head.removeChild(script)
                            }
                            script = undefined;
                            if (!isAbort) {
                                callback(200, "success")
                            }
                        }
                    };
                    head.insertBefore(script, head.firstChild)
                },
                abort: function() {
                    if (script) {
                        script.onload(0, 1)
                    }
                }
            }
        }
    });
    var xhrOnUnloadAbort = window.ActiveXObject ? function() {
            for (var key in xhrCallbacks) {
                xhrCallbacks[key](0, 1)
            }
        } : false,
        xhrId = 0,
        xhrCallbacks;

    function createStandardXHR() {
        try {
            return new window.XMLHttpRequest()
        } catch (e) {}
    }

    function createActiveXHR() {
        try {
            return new window.ActiveXObject("Microsoft.XMLHTTP")
        } catch (e) {}
    }
    jQuery.ajaxSettings.xhr = window.ActiveXObject ? function() {
        return !this.isLocal && createStandardXHR() || createActiveXHR()
    } : createStandardXHR;
    (function(xhr) {
        jQuery.extend(jQuery.support, {
            ajax: !!xhr,
            cors: !!xhr && ("withCredentials" in xhr)
        })
    })(jQuery.ajaxSettings.xhr());
    if (jQuery.support.ajax) {
        jQuery.ajaxTransport(function(s) {
            if (!s.crossDomain || jQuery.support.cors) {
                var callback;
                return {
                    send: function(headers, complete) {
                        var xhr = s.xhr(),
                            handle, i;
                        if (s.username) {
                            xhr.open(s.type, s.url, s.async, s.username, s.password)
                        } else {
                            xhr.open(s.type, s.url, s.async)
                        }
                        if (s.xhrFields) {
                            for (i in s.xhrFields) {
                                xhr[i] = s.xhrFields[i]
                            }
                        }
                        if (s.mimeType && xhr.overrideMimeType) {
                            xhr.overrideMimeType(s.mimeType)
                        }
                        if (!s.crossDomain && !headers["X-Requested-With"]) {
                            headers["X-Requested-With"] = "XMLHttpRequest"
                        }
                        try {
                            for (i in headers) {
                                xhr.setRequestHeader(i, headers[i])
                            }
                        } catch (_) {}
                        xhr.send((s.hasContent && s.data) || null);
                        callback = function(_, isAbort) {
                            var status, statusText, responseHeaders, responses, xml;
                            try {
                                if (callback && (isAbort || xhr.readyState === 4)) {
                                    callback = undefined;
                                    if (handle) {
                                        xhr.onreadystatechange = jQuery.noop;
                                        if (xhrOnUnloadAbort) {
                                            delete xhrCallbacks[handle]
                                        }
                                    }
                                    if (isAbort) {
                                        if (xhr.readyState !== 4) {
                                            xhr.abort()
                                        }
                                    } else {
                                        status = xhr.status;
                                        responseHeaders = xhr.getAllResponseHeaders();
                                        responses = {};
                                        xml = xhr.responseXML;
                                        if (xml && xml.documentElement) {
                                            responses.xml = xml
                                        }
                                        try {
                                            responses.text = xhr.responseText
                                        } catch (_) {}
                                        try {
                                            statusText = xhr.statusText
                                        } catch (e) {
                                            statusText = ""
                                        }
                                        if (!status && s.isLocal && !s.crossDomain) {
                                            status = responses.text ? 200 : 404
                                        } else {
                                            if (status === 1223) {
                                                status = 204
                                            }
                                        }
                                    }
                                }
                            } catch (firefoxAccessException) {
                                if (!isAbort) {
                                    complete(-1, firefoxAccessException)
                                }
                            }
                            if (responses) {
                                complete(status, statusText, responses, responseHeaders)
                            }
                        };
                        if (!s.async || xhr.readyState === 4) {
                            callback()
                        } else {
                            handle = ++xhrId;
                            if (xhrOnUnloadAbort) {
                                if (!xhrCallbacks) {
                                    xhrCallbacks = {};
                                    jQuery(window).unload(xhrOnUnloadAbort)
                                }
                                xhrCallbacks[handle] = callback
                            }
                            xhr.onreadystatechange = callback
                        }
                    },
                    abort: function() {
                        if (callback) {
                            callback(0, 1)
                        }
                    }
                }
            }
        })
    }
    var elemdisplay = {},
        iframe, iframeDoc, rfxtypes = /^(?:toggle|show|hide)$/,
        rfxnum = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
        timerId, fxAttrs = [
            ["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
            ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
            ["opacity"]
        ],
        fxNow;
    jQuery.fn.extend({
        show: function(speed, easing, callback) {
            var elem, display;
            if (speed || speed === 0) {
                return this.animate(genFx("show", 3), speed, easing, callback)
            } else {
                for (var i = 0, j = this.length; i < j; i++) {
                    elem = this[i];
                    if (elem.style) {
                        display = elem.style.display;
                        if (!jQuery._data(elem, "olddisplay") && display === "none") {
                            display = elem.style.display = ""
                        }
                        if ((display === "" && jQuery.css(elem, "display") === "none") || !jQuery.contains(elem.ownerDocument.documentElement, elem)) {
                            jQuery._data(elem, "olddisplay", defaultDisplay(elem.nodeName))
                        }
                    }
                }
                for (i = 0; i < j; i++) {
                    elem = this[i];
                    if (elem.style) {
                        display = elem.style.display;
                        if (display === "" || display === "none") {
                            elem.style.display = jQuery._data(elem, "olddisplay") || ""
                        }
                    }
                }
                return this
            }
        },
        hide: function(speed, easing, callback) {
            if (speed || speed === 0) {
                return this.animate(genFx("hide", 3), speed, easing, callback)
            } else {
                var elem, display, i = 0,
                    j = this.length;
                for (; i < j; i++) {
                    elem = this[i];
                    if (elem.style) {
                        display = jQuery.css(elem, "display");
                        if (display !== "none" && !jQuery._data(elem, "olddisplay")) {
                            jQuery._data(elem, "olddisplay", display)
                        }
                    }
                }
                for (i = 0; i < j; i++) {
                    if (this[i].style) {
                        this[i].style.display = "none"
                    }
                }
                return this
            }
        },
        _toggle: jQuery.fn.toggle,
        toggle: function(fn, fn2, callback) {
            var bool = typeof fn === "boolean";
            if (jQuery.isFunction(fn) && jQuery.isFunction(fn2)) {
                this._toggle.apply(this, arguments)
            } else {
                if (fn == null || bool) {
                    this.each(function() {
                        var state = bool ? fn : jQuery(this).is(":hidden");
                        jQuery(this)[state ? "show" : "hide"]()
                    })
                } else {
                    this.animate(genFx("toggle", 3), fn, fn2, callback)
                }
            }
            return this
        },
        fadeTo: function(speed, to, easing, callback) {
            return this.filter(":hidden").css("opacity", 0).show().end().animate({
                opacity: to
            }, speed, easing, callback)
        },
        animate: function(prop, speed, easing, callback) {
            var optall = jQuery.speed(speed, easing, callback);
            if (jQuery.isEmptyObject(prop)) {
                return this.each(optall.complete, [false])
            }
            prop = jQuery.extend({}, prop);

            function doAnimation() {
                if (optall.queue === false) {
                    jQuery._mark(this)
                }
                var opt = jQuery.extend({}, optall),
                    isElement = this.nodeType === 1,
                    hidden = isElement && jQuery(this).is(":hidden"),
                    name, val, p, e, hooks, replace, parts, start, end, unit, method;
                opt.animatedProperties = {};
                for (p in prop) {
                    name = jQuery.camelCase(p);
                    if (p !== name) {
                        prop[name] = prop[p];
                        delete prop[p]
                    }
                    if ((hooks = jQuery.cssHooks[name]) && "expand" in hooks) {
                        replace = hooks.expand(prop[name]);
                        delete prop[name];
                        for (p in replace) {
                            if (!(p in prop)) {
                                prop[p] = replace[p]
                            }
                        }
                    }
                }
                for (name in prop) {
                    val = prop[name];
                    if (jQuery.isArray(val)) {
                        opt.animatedProperties[name] = val[1];
                        val = prop[name] = val[0]
                    } else {
                        opt.animatedProperties[name] = opt.specialEasing && opt.specialEasing[name] || opt.easing || "swing"
                    }
                    if (val === "hide" && hidden || val === "show" && !hidden) {
                        return opt.complete.call(this)
                    }
                    if (isElement && (name === "height" || name === "width")) {
                        opt.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY];
                        if (jQuery.css(this, "display") === "inline" && jQuery.css(this, "float") === "none") {
                            if (!jQuery.support.inlineBlockNeedsLayout || defaultDisplay(this.nodeName) === "inline") {
                                this.style.display = "inline-block"
                            } else {
                                this.style.zoom = 1
                            }
                        }
                    }
                }
                if (opt.overflow != null) {
                    this.style.overflow = "hidden"
                }
                for (p in prop) {
                    e = new jQuery.fx(this, opt, p);
                    val = prop[p];
                    if (rfxtypes.test(val)) {
                        method = jQuery._data(this, "toggle" + p) || (val === "toggle" ? hidden ? "show" : "hide" : 0);
                        if (method) {
                            jQuery._data(this, "toggle" + p, method === "show" ? "hide" : "show");
                            e[method]()
                        } else {
                            e[val]()
                        }
                    } else {
                        parts = rfxnum.exec(val);
                        start = e.cur();
                        if (parts) {
                            end = parseFloat(parts[2]);
                            unit = parts[3] || (jQuery.cssNumber[p] ? "" : "px");
                            if (unit !== "px") {
                                jQuery.style(this, p, (end || 1) + unit);
                                start = ((end || 1) / e.cur()) * start;
                                jQuery.style(this, p, start + unit)
                            }
                            if (parts[1]) {
                                end = ((parts[1] === "-=" ? -1 : 1) * end) + start
                            }
                            e.custom(start, end, unit)
                        } else {
                            e.custom(start, val, "")
                        }
                    }
                }
                return true
            }
            return optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation)
        },
        stop: function(type, clearQueue, gotoEnd) {
            if (typeof type !== "string") {
                gotoEnd = clearQueue;
                clearQueue = type;
                type = undefined
            }
            if (clearQueue && type !== false) {
                this.queue(type || "fx", [])
            }
            return this.each(function() {
                var index, hadTimers = false,
                    timers = jQuery.timers,
                    data = jQuery._data(this);
                if (!gotoEnd) {
                    jQuery._unmark(true, this)
                }

                function stopQueue(elem, data, index) {
                    var hooks = data[index];
                    jQuery.removeData(elem, index, true);
                    hooks.stop(gotoEnd)
                }
                if (type == null) {
                    for (index in data) {
                        if (data[index] && data[index].stop && index.indexOf(".run") === index.length - 4) {
                            stopQueue(this, data, index)
                        }
                    }
                } else {
                    if (data[index = type + ".run"] && data[index].stop) {
                        stopQueue(this, data, index)
                    }
                }
                for (index = timers.length; index--;) {
                    if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
                        if (gotoEnd) {
                            timers[index](true)
                        } else {
                            timers[index].saveState()
                        }
                        hadTimers = true;
                        timers.splice(index, 1)
                    }
                }
                if (!(gotoEnd && hadTimers)) {
                    jQuery.dequeue(this, type)
                }
            })
        }
    });

    function createFxNow() {
        setTimeout(clearFxNow, 0);
        return (fxNow = jQuery.now())
    }

    function clearFxNow() {
        fxNow = undefined
    }

    function genFx(type, num) {
        var obj = {};
        jQuery.each(fxAttrs.concat.apply([], fxAttrs.slice(0, num)), function() {
            obj[this] = type
        });
        return obj
    }
    jQuery.each({
        slideDown: genFx("show", 1),
        slideUp: genFx("hide", 1),
        slideToggle: genFx("toggle", 1),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(name, props) {
        jQuery.fn[name] = function(speed, easing, callback) {
            return this.animate(props, speed, easing, callback)
        }
    });
    jQuery.extend({
        speed: function(speed, easing, fn) {
            var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
                complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
                duration: speed,
                easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
            };
            opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;
            if (opt.queue == null || opt.queue === true) {
                opt.queue = "fx"
            }
            opt.old = opt.complete;
            opt.complete = function(noUnmark) {
                if (jQuery.isFunction(opt.old)) {
                    opt.old.call(this)
                }
                if (opt.queue) {
                    jQuery.dequeue(this, opt.queue)
                } else {
                    if (noUnmark !== false) {
                        jQuery._unmark(this)
                    }
                }
            };
            return opt
        },
        easing: {
            linear: function(p) {
                return p
            },
            swing: function(p) {
                return (-Math.cos(p * Math.PI) / 2) + 0.5
            }
        },
        timers: [],
        fx: function(elem, options, prop) {
            this.options = options;
            this.elem = elem;
            this.prop = prop;
            options.orig = options.orig || {}
        }
    });
    jQuery.fx.prototype = {
        update: function() {
            if (this.options.step) {
                this.options.step.call(this.elem, this.now, this)
            }(jQuery.fx.step[this.prop] || jQuery.fx.step._default)(this)
        },
        cur: function() {
            if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) {
                return this.elem[this.prop]
            }
            var parsed, r = jQuery.css(this.elem, this.prop);
            return isNaN(parsed = parseFloat(r)) ? !r || r === "auto" ? 0 : r : parsed
        },
        custom: function(from, to, unit) {
            var self = this,
                fx = jQuery.fx;
            this.startTime = fxNow || createFxNow();
            this.end = to;
            this.now = this.start = from;
            this.pos = this.state = 0;
            this.unit = unit || this.unit || (jQuery.cssNumber[this.prop] ? "" : "px");

            function t(gotoEnd) {
                return self.step(gotoEnd)
            }
            t.queue = this.options.queue;
            t.elem = this.elem;
            t.saveState = function() {
                if (jQuery._data(self.elem, "fxshow" + self.prop) === undefined) {
                    if (self.options.hide) {
                        jQuery._data(self.elem, "fxshow" + self.prop, self.start)
                    } else {
                        if (self.options.show) {
                            jQuery._data(self.elem, "fxshow" + self.prop, self.end)
                        }
                    }
                }
            };
            if (t() && jQuery.timers.push(t) && !timerId) {
                timerId = setInterval(fx.tick, fx.interval)
            }
        },
        show: function() {
            var dataShow = jQuery._data(this.elem, "fxshow" + this.prop);
            this.options.orig[this.prop] = dataShow || jQuery.style(this.elem, this.prop);
            this.options.show = true;
            if (dataShow !== undefined) {
                this.custom(this.cur(), dataShow)
            } else {
                this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur())
            }
            jQuery(this.elem).show()
        },
        hide: function() {
            this.options.orig[this.prop] = jQuery._data(this.elem, "fxshow" + this.prop) || jQuery.style(this.elem, this.prop);
            this.options.hide = true;
            this.custom(this.cur(), 0)
        },
        step: function(gotoEnd) {
            var p, n, complete, t = fxNow || createFxNow(),
                done = true,
                elem = this.elem,
                options = this.options;
            if (gotoEnd || t >= options.duration + this.startTime) {
                this.now = this.end;
                this.pos = this.state = 1;
                this.update();
                options.animatedProperties[this.prop] = true;
                for (p in options.animatedProperties) {
                    if (options.animatedProperties[p] !== true) {
                        done = false
                    }
                }
                if (done) {
                    if (options.overflow != null && !jQuery.support.shrinkWrapBlocks) {
                        jQuery.each(["", "X", "Y"], function(index, value) {
                            elem.style["overflow" + value] = options.overflow[index]
                        })
                    }
                    if (options.hide) {
                        jQuery(elem).hide()
                    }
                    if (options.hide || options.show) {
                        for (p in options.animatedProperties) {
                            jQuery.style(elem, p, options.orig[p]);
                            jQuery.removeData(elem, "fxshow" + p, true);
                            jQuery.removeData(elem, "toggle" + p, true)
                        }
                    }
                    complete = options.complete;
                    if (complete) {
                        options.complete = false;
                        complete.call(elem)
                    }
                }
                return false
            } else {
                if (options.duration == Infinity) {
                    this.now = t
                } else {
                    n = t - this.startTime;
                    this.state = n / options.duration;
                    this.pos = jQuery.easing[options.animatedProperties[this.prop]](this.state, n, 0, 1, options.duration);
                    this.now = this.start + ((this.end - this.start) * this.pos)
                }
                this.update()
            }
            return true
        }
    };
    jQuery.extend(jQuery.fx, {
        tick: function() {
            var timer, timers = jQuery.timers,
                i = 0;
            for (; i < timers.length; i++) {
                timer = timers[i];
                if (!timer() && timers[i] === timer) {
                    timers.splice(i--, 1)
                }
            }
            if (!timers.length) {
                jQuery.fx.stop()
            }
        },
        interval: 13,
        stop: function() {
            clearInterval(timerId);
            timerId = null
        },
        speeds: {
            slow: 600,
            fast: 200,
            _default: 400
        },
        step: {
            opacity: function(fx) {
                jQuery.style(fx.elem, "opacity", fx.now)
            },
            _default: function(fx) {
                if (fx.elem.style && fx.elem.style[fx.prop] != null) {
                    fx.elem.style[fx.prop] = fx.now + fx.unit
                } else {
                    fx.elem[fx.prop] = fx.now
                }
            }
        }
    });
    jQuery.each(fxAttrs.concat.apply([], fxAttrs), function(i, prop) {
        if (prop.indexOf("margin")) {
            jQuery.fx.step[prop] = function(fx) {
                jQuery.style(fx.elem, prop, Math.max(0, fx.now) + fx.unit)
            }
        }
    });
    if (jQuery.expr && jQuery.expr.filters) {
        jQuery.expr.filters.animated = function(elem) {
            return jQuery.grep(jQuery.timers, function(fn) {
                return elem === fn.elem
            }).length
        }
    }

    function defaultDisplay(nodeName) {
        if (!elemdisplay[nodeName]) {
            var body = document.body,
                elem = jQuery("<" + nodeName + ">").appendTo(body),
                display = elem.css("display");
            elem.remove();
            if (display === "none" || display === "") {
                if (!iframe) {
                    iframe = document.createElement("iframe");
                    iframe.frameBorder = iframe.width = iframe.height = 0
                }
                body.appendChild(iframe);
                if (!iframeDoc || !iframe.createElement) {
                    iframeDoc = (iframe.contentWindow || iframe.contentDocument).document;
                    iframeDoc.write((jQuery.support.boxModel ? "<!doctype html>" : "") + "<html><body>");
                    iframeDoc.close()
                }
                elem = iframeDoc.createElement(nodeName);
                iframeDoc.body.appendChild(elem);
                display = jQuery.css(elem, "display");
                body.removeChild(iframe)
            }
            elemdisplay[nodeName] = display
        }
        return elemdisplay[nodeName]
    }
    var getOffset, rtable = /^t(?:able|d|h)$/i,
        rroot = /^(?:body|html)$/i;
    if ("getBoundingClientRect" in document.documentElement) {
        getOffset = function(elem, doc, docElem, box) {
            try {
                box = elem.getBoundingClientRect()
            } catch (e) {}
            if (!box || !jQuery.contains(docElem, elem)) {
                return box ? {
                    top: box.top,
                    left: box.left
                } : {
                    top: 0,
                    left: 0
                }
            }
            var body = doc.body,
                win = getWindow(doc),
                clientTop = docElem.clientTop || body.clientTop || 0,
                clientLeft = docElem.clientLeft || body.clientLeft || 0,
                scrollTop = win.pageYOffset || jQuery.support.boxModel && docElem.scrollTop || body.scrollTop,
                scrollLeft = win.pageXOffset || jQuery.support.boxModel && docElem.scrollLeft || body.scrollLeft,
                top = box.top + scrollTop - clientTop,
                left = box.left + scrollLeft - clientLeft;
            return {
                top: top,
                left: left
            }
        }
    } else {
        getOffset = function(elem, doc, docElem) {
            var computedStyle, offsetParent = elem.offsetParent,
                prevOffsetParent = elem,
                body = doc.body,
                defaultView = doc.defaultView,
                prevComputedStyle = defaultView ? defaultView.getComputedStyle(elem, null) : elem.currentStyle,
                top = elem.offsetTop,
                left = elem.offsetLeft;
            while ((elem = elem.parentNode) && elem !== body && elem !== docElem) {
                if (jQuery.support.fixedPosition && prevComputedStyle.position === "fixed") {
                    break
                }
                computedStyle = defaultView ? defaultView.getComputedStyle(elem, null) : elem.currentStyle;
                top -= elem.scrollTop;
                left -= elem.scrollLeft;
                if (elem === offsetParent) {
                    top += elem.offsetTop;
                    left += elem.offsetLeft;
                    if (jQuery.support.doesNotAddBorder && !(jQuery.support.doesAddBorderForTableAndCells && rtable.test(elem.nodeName))) {
                        top += parseFloat(computedStyle.borderTopWidth) || 0;
                        left += parseFloat(computedStyle.borderLeftWidth) || 0
                    }
                    prevOffsetParent = offsetParent;
                    offsetParent = elem.offsetParent
                }
                if (jQuery.support.subtractsBorderForOverflowNotVisible && computedStyle.overflow !== "visible") {
                    top += parseFloat(computedStyle.borderTopWidth) || 0;
                    left += parseFloat(computedStyle.borderLeftWidth) || 0
                }
                prevComputedStyle = computedStyle
            }
            if (prevComputedStyle.position === "relative" || prevComputedStyle.position === "static") {
                top += body.offsetTop;
                left += body.offsetLeft
            }
            if (jQuery.support.fixedPosition && prevComputedStyle.position === "fixed") {
                top += Math.max(docElem.scrollTop, body.scrollTop);
                left += Math.max(docElem.scrollLeft, body.scrollLeft)
            }
            return {
                top: top,
                left: left
            }
        }
    }
    jQuery.fn.offset = function(options) {
        if (arguments.length) {
            return options === undefined ? this : this.each(function(i) {
                jQuery.offset.setOffset(this, options, i)
            })
        }
        var elem = this[0],
            doc = elem && elem.ownerDocument;
        if (!doc) {
            return null
        }
        if (elem === doc.body) {
            return jQuery.offset.bodyOffset(elem)
        }
        return getOffset(elem, doc, doc.documentElement)
    };
    jQuery.offset = {
        bodyOffset: function(body) {
            var top = body.offsetTop,
                left = body.offsetLeft;
            if (jQuery.support.doesNotIncludeMarginInBodyOffset) {
                top += parseFloat(jQuery.css(body, "marginTop")) || 0;
                left += parseFloat(jQuery.css(body, "marginLeft")) || 0
            }
            return {
                top: top,
                left: left
            }
        },
        setOffset: function(elem, options, i) {
            var position = jQuery.css(elem, "position");
            if (position === "static") {
                elem.style.position = "relative"
            }
            var curElem = jQuery(elem),
                curOffset = curElem.offset(),
                curCSSTop = jQuery.css(elem, "top"),
                curCSSLeft = jQuery.css(elem, "left"),
                calculatePosition = (position === "absolute" || position === "fixed") && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
                props = {},
                curPosition = {},
                curTop, curLeft;
            if (calculatePosition) {
                curPosition = curElem.position();
                curTop = curPosition.top;
                curLeft = curPosition.left
            } else {
                curTop = parseFloat(curCSSTop) || 0;
                curLeft = parseFloat(curCSSLeft) || 0
            }
            if (jQuery.isFunction(options)) {
                options = options.call(elem, i, curOffset)
            }
            if (options.top != null) {
                props.top = (options.top - curOffset.top) + curTop
            }
            if (options.left != null) {
                props.left = (options.left - curOffset.left) + curLeft
            }
            if ("using" in options) {
                options.using.call(elem, props)
            } else {
                curElem.css(props)
            }
        }
    };
    jQuery.fn.extend({
        position: function() {
            if (!this[0]) {
                return null
            }
            var elem = this[0],
                offsetParent = this.offsetParent(),
                offset = this.offset(),
                parentOffset = rroot.test(offsetParent[0].nodeName) ? {
                    top: 0,
                    left: 0
                } : offsetParent.offset();
            offset.top -= parseFloat(jQuery.css(elem, "marginTop")) || 0;
            offset.left -= parseFloat(jQuery.css(elem, "marginLeft")) || 0;
            parentOffset.top += parseFloat(jQuery.css(offsetParent[0], "borderTopWidth")) || 0;
            parentOffset.left += parseFloat(jQuery.css(offsetParent[0], "borderLeftWidth")) || 0;
            return {
                top: offset.top - parentOffset.top,
                left: offset.left - parentOffset.left
            }
        },
        offsetParent: function() {
            return this.map(function() {
                var offsetParent = this.offsetParent || document.body;
                while (offsetParent && (!rroot.test(offsetParent.nodeName) && jQuery.css(offsetParent, "position") === "static")) {
                    offsetParent = offsetParent.offsetParent
                }
                return offsetParent
            })
        }
    });
    jQuery.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(method, prop) {
        var top = /Y/.test(prop);
        jQuery.fn[method] = function(val) {
            return jQuery.access(this, function(elem, method, val) {
                var win = getWindow(elem);
                if (val === undefined) {
                    return win ? (prop in win) ? win[prop] : jQuery.support.boxModel && win.document.documentElement[method] || win.document.body[method] : elem[method]
                }
                if (win) {
                    win.scrollTo(!top ? val : jQuery(win).scrollLeft(), top ? val : jQuery(win).scrollTop())
                } else {
                    try {
                        elem[method] = val
                    } catch (err) {}
                }
            }, method, val, arguments.length, null)
        }
    });

    function getWindow(elem) {
        return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 ? elem.defaultView || elem.parentWindow : false
    }
    jQuery.each({
        Height: "height",
        Width: "width"
    }, function(name, type) {
        var clientProp = "client" + name,
            scrollProp = "scroll" + name,
            offsetProp = "offset" + name;
        jQuery.fn["inner" + name] = function() {
            var elem = this[0];
            return elem ? elem.style ? parseFloat(jQuery.css(elem, type, "padding")) : this[type]() : null
        };
        jQuery.fn["outer" + name] = function(margin) {
            var elem = this[0];
            return elem ? elem.style ? parseFloat(jQuery.css(elem, type, margin ? "margin" : "border")) : this[type]() : null
        };
        jQuery.fn[type] = function(value) {
            return jQuery.access(this, function(elem, type, value) {
                var doc, docElemProp, orig, ret;
                if (jQuery.isWindow(elem)) {
                    doc = elem.document;
                    docElemProp = doc.documentElement[clientProp];
                    return jQuery.support.boxModel && docElemProp || doc.body && doc.body[clientProp] || docElemProp
                }
                if (elem.nodeType === 9) {
                    doc = elem.documentElement;
                    if (doc[clientProp] >= doc[scrollProp]) {
                        return doc[clientProp]
                    }
                    return Math.max(elem.body[scrollProp], doc[scrollProp], elem.body[offsetProp], doc[offsetProp])
                }
                if (value === undefined) {
                    orig = jQuery.css(elem, type);
                    ret = parseFloat(orig);
                    return jQuery.isNumeric(ret) ? ret : orig
                }
                jQuery(elem).css(type, value)
            }, type, value, arguments.length, null)
        }
    });
    window.jQuery = window.$ = jQuery;
    if (typeof define === "function" && define.amd && define.amd.jQuery) {
        define("jquery", [], function() {
            return jQuery
        })
    }
})(window);
/* Lazy Load 1.9.3 - MIT license - Copyright 2010-2013 Mika Tuupola */
! function(B, A, E, D) {
    var C = B(A);
    B.fn.lazyload = function(J) {
        function I() {
            var K = 0;
            G.each(function() {
                var L = B(this);
                if (!F.skip_invisible || L.is(":visible")) {
                    if (B.abovethetop(this, F) || B.leftofbegin(this, F)) {} else {
                        if (B.belowthefold(this, F) || B.rightoffold(this, F)) {
                            if (++K > F.failure_limit) {
                                return !1
                            }
                        } else {
                            L.trigger("appear"), K = 0
                        }
                    }
                }
            })
        }
        var H, G = this,
            F = {
                threshold: 0,
                failure_limit: 0,
                event: "scroll",
                effect: "show",
                container: A,
                data_attribute: "original",
                skip_invisible: !0,
                appear: null,
                load: null,
                placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
            };
        return J && (D !== J.failurelimit && (J.failure_limit = J.failurelimit, delete J.failurelimit), D !== J.effectspeed && (J.effect_speed = J.effectspeed, delete J.effectspeed), B.extend(F, J)), H = F.container === D || F.container === A ? C : B(F.container), 0 === F.event.indexOf("scroll") && H.bind(F.event, function() {
            return I()
        }), this.each(function() {
            var K = this,
                L = B(K);
            K.loaded = !1, (L.attr("src") === D || L.attr("src") === !1) && L.is("img") && L.attr("src", F.placeholder), L.one("appear", function() {
                if (!this.loaded) {
                    if (F.appear) {
                        var M = G.length;
                        F.appear.call(K, M, F)
                    }
                    B("<img />").bind("load", function() {
                        var P = L.attr("data-" + F.data_attribute);
                        L.hide(), L.is("img") ? L.attr("src", P) : L.css("background-image", "url('" + P + "')"), L[F.effect](F.effect_speed), K.loaded = !0;
                        var O = B.grep(G, function(Q) {
                            return !Q.loaded
                        });
                        if (G = B(O), F.load) {
                            var N = G.length;
                            F.load.call(K, N, F)
                        }
                    }).attr("src", L.attr("data-" + F.data_attribute))
                }
            }), 0 !== F.event.indexOf("scroll") && L.bind(F.event, function() {
                K.loaded || L.trigger("appear")
            })
        }), C.bind("resize", function() {
            I()
        }), /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion) && C.bind("pageshow", function(K) {
            K.originalEvent && K.originalEvent.persisted && G.each(function() {
                B(this).trigger("appear")
            })
        }), B(E).ready(function() {
            I()
        }), this
    }, B.belowthefold = function(H, G) {
        var F;
        return F = G.container === D || G.container === A ? (A.innerHeight ? A.innerHeight : C.height()) + C.scrollTop() : B(G.container).offset().top + B(G.container).height(), F <= B(H).offset().top - G.threshold
    }, B.rightoffold = function(H, G) {
        var F;
        return F = G.container === D || G.container === A ? C.width() + C.scrollLeft() : B(G.container).offset().left + B(G.container).width(), F <= B(H).offset().left - G.threshold
    }, B.abovethetop = function(H, G) {
        var F;
        return F = G.container === D || G.container === A ? C.scrollTop() : B(G.container).offset().top, F >= B(H).offset().top + G.threshold + B(H).height()
    }, B.leftofbegin = function(H, G) {
        var F;
        return F = G.container === D || G.container === A ? C.scrollLeft() : B(G.container).offset().left, F >= B(H).offset().left + G.threshold + B(H).width()
    }, B.inviewport = function(F, G) {
        return !(B.rightoffold(F, G) || B.leftofbegin(F, G) || B.belowthefold(F, G) || B.abovethetop(F, G))
    }, B.extend(B.expr[":"], {
        "below-the-fold": function(F) {
            return B.belowthefold(F, {
                threshold: 0
            })
        },
        "above-the-top": function(F) {
            return !B.belowthefold(F, {
                threshold: 0
            })
        },
        "right-of-screen": function(F) {
            return B.rightoffold(F, {
                threshold: 0
            })
        },
        "left-of-screen": function(F) {
            return !B.rightoffold(F, {
                threshold: 0
            })
        },
        "in-viewport": function(F) {
            return B.inviewport(F, {
                threshold: 0
            })
        },
        "above-the-fold": function(F) {
            return !B.belowthefold(F, {
                threshold: 0
            })
        },
        "right-of-fold": function(F) {
            return B.rightoffold(F, {
                threshold: 0
            })
        },
        "left-of-fold": function(F) {
            return !B.rightoffold(F, {
                threshold: 0
            })
        }
    })
}(jQuery, window, document);
var Search_Param_Maps = new Object();
var contactFormBeanOnLoad = new Object();
var AUTO_SUGGEST_REFINE_MAP = new Object();
var globalAutoSuggestionVar = new Object();
var refineProjectMap = new Object();
var refineObjectMap = new Object();
var lastRefineProjectMap = new Object();
var lastRefineObjectMap = new Object();
var stopPage = false;
var renderAmenDiv = false;
var globalFlag = false;
var REFINE_DELAY = "0";
var CURRENT_STATE = "0";
var CURRENT_REFINE_STATE = "0";
var moreResultPage = 0;
var pageNumberShowing = 1;
var fetching = false;
var historyMap = new Object();
var TabSearchMap = new Object();
var catName = new Object();
var refineHtml = null;
var userDefaultMobileCountry = "50";
var seachVersion = "";
var sortVersion = "";
var networkTrackCodeForRequirement = "http://ads.networkplay.in/track_lead/25/OPTIONAL_INFORMATION";

function replaceHtml(el, html) {
    var oldEl = typeof el === "string" ? document.getElementById(el) : el;
    /*@cc_on // Pure innerHTML is slightly faster in IE
            oldEl.innerHTML = html;
            return oldEl;
        @*/
    var newEl = oldEl.cloneNode(false);
    newEl.innerHTML = html;
    oldEl.parentNode.replaceChild(newEl, oldEl);
    return newEl
}

function getInternetExplorerVersion() {
    var C = -1;
    if (navigator.appName == "Microsoft Internet Explorer") {
        var A = navigator.userAgent;
        var B = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
        if (B.exec(A) != null) {
            C = parseFloat(RegExp.$1)
        }
    }
    return C
}
if (getInternetExplorerVersion() == 6) {
    REFINE_DELAY = "2000"
}

function removeSpaces(A) {
    A = A.replace(/^\s+/g, "");
    A = A.replace(/\s+$/g, "");
    A = A.replace(/\s+/g, "-");
    return A
}

function loadSearchBar(B, A) {
    A = (A + "").replace(/, /g, ",");
    $.ajax({
        type: "get",
        url: B + "/searchBar.html?newForm=true&" + A,
        cache: true,
        async: true,
        success: function(C) {
            if ($("#internalSearchContent")) {
                $("#internalSearchContent").html(C)
            }
        }
    })
}

function loadEditRefine(A) {
    A = A.replace(/, /g, ",");
    ajaxService.getResponseFromUrl("/editRefineSearch.html?" + A, {
        callback: function(B) {
            if (B) {
                if ($("#refinePanel")) {
                    $("#refinePanel").html(B)
                }
            }
        },
        async: false
    })
}

function clicktrack(H, c, K, d, O, J, Z, R, l, T, W, n, F, L, a, m, o, E, M, P, C, k, B, G) {
    if ((H == 1 && _gaq) || !C) {
        var X = "N";
        var g = "N";
        var Q = "N";
        var j = "";
        var I = "";
        var p = "N";
        var q = "N";
        var V = "N";
        var D = "";
        var e = "";
        var U = "N";
        var S = "N";
        var A = "N";
        var Y = 0;
        var N = "";
        if (k != null && k != "") {
            N = k
        }
        if (a != null && a.indexOf("more") != -1) {
            a = "Multiple"
        }
        if (E != null && E != "") {
            Y = E
        }
        if (o != null && o != "" && o.indexOf(",") != -1) {
            o = o.replace(",", "")
        }
        if (o != null && o != "" && o == "I") {
            A = "Y";
            Y = j
        }
        if (a != null && a != "") {
            S = a
        }
        if (L != null && L != "") {
            U = L + "BHK"
        }
        if (O != null && O != "") {
            g = "Y"
        }
        if (Z != null && Z != "") {
            j = Z
        }
        if (R != null && R != "") {
            I = R
        }
        if (l != null && l != "") {
            p = "Y"
        }
        if (T != null && T != "") {
            p = "Y"
        }
        if ($("#rangeMinLinkbudgetinput").val() != null && $("#rangeMinLinkbudgetinput").val() !== "") {
            p = "Y"
        }
        if ($("#rangeMaxLinkbudgetinput").val() != null && $("#rangeMaxLinkbudgetinput").val() !== "") {
            p = "Y"
        }
        if (J == "Individual") {
            Q = "Y"
        }
        if (W == "Y," || W == "Y" || W == "on") {
            q = "Y"
        }
        if (F == "true") {
            V = "Y"
        }
        if (l == null || l == "") {
            e = "N"
        } else {
            e = l
        }
        if (T == null || T == "") {
            D = "N"
        } else {
            D = T
        }
        if ($("#rangeMinLinkbudgetinput").val() != null && $("#rangeMinLinkbudgetinput").val() !== "") {
            e = $("#rangeMinLinkbudgetinput").val()
        }
        if ($("#rangeMaxLinkbudgetinput").val() != null && $("#rangeMaxLinkbudgetinput").val() !== "") {
            D = $("#rangeMaxLinkbudgetinput").val()
        }
        var b = generateRefineParamString();
        var h = "property";
        if (Search_Param_Maps && Search_Param_Maps.source) {
            h = Search_Param_Maps.source.replace("Search", "")
        }
        var f = "";
        if (C != null && C == true) {
            if (searchType == 1) {
                f = "propSearch=Yes"
            } else {
                if (searchType == 5) {
                    f = "projectSearch=Yes"
                }
            }
            f += ", City=" + I + ", rLoc=" + g + ", rLocValue=" + O + ", rBdgt=" + p + ", Nearby=" + q + ", TotalResult=" + j + ", rBMin=" + e + ", rBMax=" + D + ", nsr=" + V + ", rBr=" + U + ", rTP=" + S + ", tab=" + h + b;
            if (searchType == 1) {
                f += ", TotalownerProp=" + Y + ", rTrans=" + d + ", OnlyOwner=" + A
            }
        } else {
            f = "City=" + I + ", rTrans=" + d + ", rLoc=" + g + ", rLocValue=" + O + ", rBdgt=" + p + ", Nearby=" + q + ", Owner=" + Q + ", TotalResult=" + j + ", rBMin=" + e + ", rBMax=" + D + ", nsr=" + V + ", prc=" + n + ", rBr=" + U + ", rTP=" + S + "," + c + "Property on page-" + H + b
        }
        if (N != "") {
            f = f + ", ver=" + N
        }
        if (B == "Y") {
            f = f + ", keyword=" + B
        }
        f += G + ",pageVersion=" + seachVersion + ", sortVersion=" + sortVersion;
        _gaq.push(["_trackEvent", f, K, sortVersion]);
        if (!(typeof _weq === "undefined") && C != null && C == true) {
            _weq["webengage.survey.customData"] = f.replace(/=/g, ":").split(", ")
        }
    }
}

function clickTrackForTotalResults(H, E) {
    var C = "";
    if (H != null) {
        C = "sessionId=" + H
    }
    if (E != null) {
        if (C == "") {
            C = "searchCount=" + E
        } else {
            C = C + "||searchCount=" + E
        }
    }
    var B = readCookieVal("gaqCompleteCookie");
    if (B != null) {
        var A = B.split("||");
        for (var D = 0; D < A.length; D++) {
            var F = A[D].split("=");
            if ("sequenceNum" == F[0]) {
                var G = parseInt(F[1]);
                if (C == "") {
                    C = "sequenceNum=" + G
                } else {
                    C = C + "||sequenceNum=" + G
                }
            }
        }
    }
    if (B != null) {
        var A = B.split("||");
        for (var D = 0; D < A.length; D++) {
            var F = A[D].split("=");
            if ("universalTimestamp" == F[0]) {
                var G = F[1];
                if (C == "") {
                    C = "universalTimestamp=" + G
                } else {
                    C = C + "||universalTimestamp=" + G
                }
            }
        }
    }
    _gaq.push(["_trackEvent", C, "HomePageSearch"])
}

function clickProjectTrack(A, G, B, F, H, M, I, E, D, C) {
    if (A == 1 && _gaq) {
        var L = "";
        var K = "";
        if (H == null || H == "") {
            K = "No"
        } else {
            K = H
        }
        if (M == null || M == "") {
            L = "No"
        } else {
            L = M
        }
        var J = "projectSearch=Yes, City=" + F + ", BudgetMin=" + K + ", BudgetMax=" + L + ", Locality=" + I + ", PropertyType=" + C + ", BHK=" + D;
        _gaq.push(["_trackEvent", J, B]);
        if (_weq) {
            _weq["webengage.survey.customData"] = J.replace(/=/g, ":").split(", ")
        }
    }
}

function trackPropertyPosition(C, B, E, A) {
    if (_gaq) {
        var F = parseInt((C - 1) * 30) + parseInt(B);
        var D = "PropertyId=" + E;
        var B = "Position=" + F;
        _gaq.push(["_trackEvent", D, A, B])
    }
}

function generateRefineParamString() {
    var B = "N";
    if (Search_Param_Maps.editSearch) {
        B = "Y"
    }
    var A = ", refineFlag=" + B;
    if (Search_Param_Maps.mbTrackSrc) {
        A += ", source=" + Search_Param_Maps.mbTrackSrc
    }
    if (Search_Param_Maps.psmid) {
        A += ", rProj=Y"
    } else {
        A += ", rProj=N"
    }
    if (Search_Param_Maps.pp) {
        A += ", rPostby=" + Search_Param_Maps.pp
    } else {
        A += ", rPostby=N"
    }
    if (Search_Param_Maps.prjPossDate) {
        A += ", rAF=Y"
    } else {
        A += ", rAF=N"
    }
    if (Search_Param_Maps.ac) {
        A += ", rCA=Y"
    } else {
        A += ", rCA=N"
    }
    if (Search_Param_Maps.th) {
        A += ", rST=" + Search_Param_Maps.th
    } else {
        A += ", rST=N"
    }
    if (Search_Param_Maps.laSqFt || Search_Param_Maps.caSqFt) {
        A += ", rAr=Y"
    } else {
        A += ", rAr=N"
    }
    if (Search_Param_Maps.fn) {
        A += ", rFlr=Y"
    } else {
        A += ", rFlr=N"
    }
    if (Search_Param_Maps.furnished) {
        A += ", rFurn=Y"
    } else {
        A += ", rFurn=N"
    }
    if (Search_Param_Maps.amenities) {
        A += ", rAmn=" + Search_Param_Maps.amenities
    } else {
        if (Search_Param_Maps.amenitiesCluster) {
            A += ", rAmn=" + Search_Param_Maps.amenitiesCluster
        } else {
            A += ", rAmn=N"
        }
    }
    if (Search_Param_Maps.listSince) {
        A += ", rLS=Y"
    } else {
        A += ", rLS=N"
    }
    if (Search_Param_Maps.imgVd && Search_Param_Maps.imgVd.indexOf("1") != -1) {
        A += ", rImg=Y"
    } else {
        A += ", rImg=N"
    }
    if (Search_Param_Maps.imgVd && Search_Param_Maps.imgVd.indexOf("2") != -1) {
        A += ", rvd=Y"
    } else {
        A += ", rvd=N"
    }
    if (Search_Param_Maps.bt) {
        A += ", rBath=Y"
    } else {
        A += ", rBath=N"
    }
    if (Search_Param_Maps.dealDesc) {
        A += ", rDeal=Y"
    } else {
        A += ", rDeal=N"
    }
    if (Search_Param_Maps.ctVerifd) {
        A += ", rVer=Y"
    } else {
        A += ", rVer=N"
    }
    if (Search_Param_Maps.bt) {
        A += ", rtrty=Y"
    } else {
        A += ", rtrty=N"
    }
    if (Search_Param_Maps.IP_ADDRESS) {
        A += ", ip=" + Search_Param_Maps.IP_ADDRESS
    }
    return A
}

function renderFPAThroughAjax(A) {
    ajaxService.renderFPAThroughAjax(A.cityRefNo, A, null, null, {
        callback: function(B) {
            if (B && B.length > 500) {
                var C = '<div class="featurdProSec"><div class="hHeading"><strong>Featured Projects </strong></div> <div class="fpContent">' + B + "</div>";
                if ($("#fpaSearchResultDiv")) {
                    $("#fpaSearchResultDiv").html(C)
                }
            }
        },
        async: true
    })
}

function setBudgetList(C, F, A) {
    var B = "";
    var E = "";
    var D = "S";
    if (C && C == "R") {
        D = "R"
    } else {
        if (C && (C == "B" || C == "S")) {
            D == "B"
        } else {
            if (C && (C.value == "B" || C.value == "S")) {
                D == "B"
            } else {
                if (C && (C.value == "R")) {
                    D = "R"
                }
            }
        }
    }
    if (document.getElementById(F)) {
        B = document.getElementById(F).value
    }
    if (document.getElementById(A)) {
        E = document.getElementById(A).value
    }
    if (D == "S" && F && A) {
        ajaxService.getBuyBudgetMap(function(L) {
            DWRUtil.removeAllOptions(F);
            DWRUtil.removeAllOptions(A);
            dwr.util.addOptions(F, [{
                name: "Min",
                id: "-1"
            }], "id", "name");
            dwr.util.addOptions(A, [{
                name: "Max",
                id: "-1"
            }], "id", "name");
            var G = L.length;
            for (var J = 0; J < G; ++J) {
                if (J in L) {
                    var H = L[J];
                    var M = H.split("_");
                    var I = document.createElement("option");
                    var K = document.createElement("option");
                    if (document.getElementById(F)) {
                        document.getElementById(F).options.add(I)
                    }
                    if (document.getElementById(A)) {
                        document.getElementById(A).options.add(K)
                    }
                    if (B && M[0] && M[0] == B) {
                        I.selected = true
                    }
                    if (E && M[0] && M[0] == E) {
                        K.selected = true
                    }
                    I.text = M[1];
                    I.value = M[0];
                    K.text = M[1];
                    K.value = M[0]
                }
            }
        })
    } else {
        if (D == "R" && F && A) {
            ajaxService.getRentBudgetMap(function(L) {
                DWRUtil.removeAllOptions(F);
                DWRUtil.removeAllOptions(A);
                dwr.util.addOptions(F, [{
                    name: "Min",
                    id: "-1"
                }], "id", "name");
                dwr.util.addOptions(A, [{
                    name: "Max",
                    id: "-1"
                }], "id", "name");
                var G = L.length;
                for (var J = 0; J < G; ++J) {
                    if (J in L) {
                        var H = L[J];
                        var M = H.split("_");
                        var I = document.createElement("option");
                        var K = document.createElement("option");
                        document.getElementById(F).options.add(I);
                        document.getElementById(A).options.add(K);
                        if (B && M[0] && M[0] == B) {
                            I.selected = true
                        }
                        if (E && M[0] && M[0] == E) {
                            K.selected = true
                        }
                        I.text = M[1];
                        I.value = M[0];
                        K.text = M[1];
                        K.value = M[0]
                    }
                }
            })
        }
    }
}

function setContactRelatedData(D, I, L, O, G, N, E, F, B, J) {
    var A = "";
    var P = "";
    var K = "50";
    var M = "";
    var H = "50";
    var S = "";
    var C = "";
    var R = "";
    var Q = "";
    if (D) {
        isUserLoggedIn = true;
        A = D;
        P = I;
        K = L;
        M = O;
        H = G;
        S = N;
        C = E;
        Q = F;
        R = J
    } else {
        if (readCookie("userType")) {
            R = readCookie("userType")
        } else {
            if (contactFormBeanOnLoad.userType) {
                R = contactFormBeanOnLoad.userType
            }
        }
        if (readCookie("userName")) {
            A = readCookie("userName").replace(/^"(.*)"$/, "$1")
        } else {
            if (contactFormBeanOnLoad.userName) {
                A = contactFormBeanOnLoad.userName
            }
        }
        if (readCookie("userEmail")) {
            P = readCookie("userEmail");
            if (P) {
                P = P.replace(/^"(.*)"$/, "$1")
            }
        } else {
            if (contactFormBeanOnLoad.userEmail) {
                P = contactFormBeanOnLoad.userEmail;
                if (P) {
                    P = P.replace(/^"(.*)"$/, "$1")
                }
            }
        }
        if (readCookie("userMobileCountry")) {
            K = readCookie("userMobileCountry")
        } else {
            if (contactFormBeanOnLoad.userMobileCountry) {
                K = contactFormBeanOnLoad.userMobileCountry
            } else {
                if (userDefaultMobileCountry) {
                    K = userDefaultMobileCountry
                }
            }
        }
        if (readCookie("userMobile")) {
            M = readCookie("userMobile")
        } else {
            if (contactFormBeanOnLoad.userMobile) {
                M = contactFormBeanOnLoad.userMobile
            }
        }
        if (readCookie("userTelCountry")) {
            H = readCookie("userTelCountry")
        } else {
            if (contactFormBeanOnLoad.userTelCountry) {
                H = contactFormBeanOnLoad.userTelCountry
            }
        }
        if (readCookie("userTelStCode")) {
            S = readCookie("userTelStCode")
        } else {
            if (contactFormBeanOnLoad.userTelStCode) {
                S = contactFormBeanOnLoad.userTelStCode
            }
        }
        if (readCookie("userTel")) {
            C = readCookie("userTel")
        } else {
            if (contactFormBeanOnLoad.userTel) {
                C = contactFormBeanOnLoad.userTel
            }
        }
    }
    contactFormBeanOnLoad = new Object();
    if (A) {
        contactFormBeanOnLoad.userName = A
    } else {
        contactFormBeanOnLoad.userName = "";
        A = ""
    }
    if (B) {
        contactFormBeanOnLoad.contactType = B
    } else {
        contactFormBeanOnLoad.contactType = "";
        B = ""
    }
    if (P) {
        contactFormBeanOnLoad.userEmail = P
    } else {
        contactFormBeanOnLoad.userEmail = "";
        P = ""
    }
    if (M) {
        contactFormBeanOnLoad.userMobile = M
    } else {
        contactFormBeanOnLoad.userMobile = "";
        M = ""
    }
    if (K) {
        contactFormBeanOnLoad.userMobileCountry = K
    } else {
        contactFormBeanOnLoad.userMobileCountry = "";
        K = ""
    }
    if (C) {
        contactFormBeanOnLoad.userTel = C
    } else {
        contactFormBeanOnLoad.userTel = "";
        C = ""
    }
    if (H) {
        contactFormBeanOnLoad.userTelCountry = H
    } else {
        contactFormBeanOnLoad.userTelCountry = "";
        H = ""
    }
    if (S) {
        contactFormBeanOnLoad.userTelStCode = S
    } else {
        contactFormBeanOnLoad.userTelStCode = "";
        S = ""
    }
    if (R) {
        contactFormBeanOnLoad.userType = R
    } else {
        contactFormBeanOnLoad.userType = "";
        R = ""
    }
    if (Q) {
        contactFormBeanOnLoad.userMessage = Q
    }
}

function updateSearchViews(B, A) {
    var C = contextPath + "ajax/updateSearchViews.json?pageNo=" + A;
    $.ajax({
        dataType: "json",
        type: "post",
        data: {
            idList: B
        },
        url: C,
        cache: true,
        async: false,
        success: function(D) {}
    })
}

function updateShortListCount(A) {
    var B = contextPath + "ajax/updateShortListCount.json?idList=" + A;
    $.ajax({
        dataType: "json",
        type: "post",
        url: B,
        cache: true,
        async: false,
        success: function(C) {}
    })
}

function checkIdExistsInPropProjCookie() {
    var F = arguments[0];
    var E = arguments[1];
    var A = false;
    if (readCookie(E) !== null) {
        var D = readCookie(E);
        var C = D.split("|");
        for (var B = 0; B < C.length; B++) {
            if (F == C[B]) {
                A = true
            }
        }
    }
    return A
}
var htmlValForSort = "";

function sortLocalitySearchResult(A) {
    htmlValForSort = $("#resultSortingDiv").html();
    sortBy = A;
    ajax_track_comScore("srp_locality_search_sort_by_" + A);
    populateLocalitySearchResultPage(1, true, A);
    $("#resultSortingDiv").html(htmlValForSort)
}

function populateLocalitySearchResultPage(A, C, B) {
    if (typeof isRefineLoaded == "undefined" || !isRefineLoaded) {
        return
    }
    var D = $("#bar_category").val();
    var E = fullContextPath + "/" + getLocalitySearchControllerName() + "?" + getUrlStringToSearch() + "&sortBy=" + B;
    $.ajax({
        type: "get",
        url: fullContextPath + "/" + getLocalitySearchControllerName() + "?" + getUrlStringToSearch() + "&sortBy=" + B + "&category=" + D,
        success: function(G) {
            if (G) {
                if ($("#resultList")) {
                    $("#resultList").html(G)
                }
                $("#resultSortingDiv").html(htmlValForSort);
                var F = document.getElementById("resultCount");
                if (F && F.innerHTML > 0) {
                    $("#allSelectedRefinedOptions").hide();
                    $(".removeAllNSR").hide();
                    $("#searchOnMapSrp").show();
                    $("#searchOnMapNsr").hide()
                } else {
                    $("#allSelectedRefinedOptions").show();
                    var H = getFiltersSelectedCount();
                    if (H > 0) {
                        $(".removeAllNSR").show()
                    } else {
                        $(".removeAllNSR").hide()
                    }
                    $("#searchOnMapSrp").hide();
                    $("#searchOnMapNsr").show()
                }
                scrollWin()
            }
        }
    })
}

function getLocalitySearchControllerName() {
    var A = "createMapSearchResult.html";
    return A
}

function getOriginalSearchFromLocality() {
    if (typeof previousSearchedUrl !== "undefined" && previousSearchedUrl != null && previousSearchedUrl != "") {
        ajaxService.encodeUrl("/bricks" + getSearchResultPageAndCheckType() + previousSearchedUrl, function(A) {
            A = A.replace("||", "?");
            if (A.indexOf("?") == -1) {
                A = A.replace("&", "?")
            }
            window.location.href = A
        })
    }
}

function getSearchResultPageAndCheckType() {
    var A = "/propertySearch.html?from=submit&breadcrumbTypeEncode=yes&";
    if (previousSearchType == 1) {
        A = "/propertySearch.html?from=submit&breadcrumbTypeEncode=yes&"
    } else {
        if (previousSearchType == 2) {
            A = "/agentSearch.html?from=submit&"
        } else {
            if (previousSearchType == 5) {
                A = "/projectSearch.html?from=submit&"
            } else {
                if (previousSearchType == 13) {
                    A = "/localitySearch.html?from=submit&"
                }
            }
        }
    }
    return A
}

function getCookie(C) {
    var B = C + "=";
    var A = document.cookie.split(";");
    for (var D = 0; D < A.length; D++) {
        var E = A[D];
        while (E.charAt(0) == " ") {
            E = E.substring(1)
        }
        if (E.indexOf(B) != -1) {
            return E.substring(B.length, E.length)
        }
    }
    return ""
}

function validateSearchInfoEmail(B) {
    var A = B.indexOf("@");
    var C = B.lastIndexOf(".");
    if (A < 1 || C < A + 2 || C + 2 >= B.length) {
        return false
    } else {
        return true
    }
}

function saveEmailWithSearchInfoInAlert() {
    $("#errorNameAlert").hide();
    $("#errorEmailAlert").hide();
    $("#errorMobileAlert").hide();
    var H = getUrlStringToSearch();
    var I = $.trim($("#nameBoxAlert").val());
    var C = $.trim($("#emailBoxAlert").val());
    var G = $("#mobileBoxAlert").val();
    var F = $("#codeISD").val();
    if (validateCommonContactForm(null, "nameBoxAlert", "emailBoxAlert", "mobileBoxAlert", null, null, "codeISD", null, null, true, null, "postForm", true, null, "errorNameAlert", "errorEmailAlert", "errorMobileAlert", null, null)) {
        var B = document.cookie;
        H = H.replace(new RegExp("&", "g"), "&&");
        var D = getCookie("userType");
        if (typeof D === "undefined") {
            D = ""
        }
        var K = readCookie("userMobileCountry");
        createCookie("userName", I, 2);
        createCookie("userMobile", G, 2);
        createCookie("userMobileCountry", F, 2);
        createCookie("userEmail", C, 2);
        getMobileVerificationFlag();
        var J = readCookie("verificationFlag");
        if (J && J == "N") {
            var A = "";
            A = "contactID:11111111";
            A = A + ";";
            A = A + "m2:m2";
            $("#alertEmailContainer").hide();
            var E = smsVerifcatioDivCode(G, I, true, "alertSaveForm", "alertSaveFormBtn", A);
            $("#unverifiedSuccess").html(E);
            $("#unverifiedSuccess").show()
        } else {
            $("#alertEmailContainer").hide();
            $("#alertEmailSuccessContainer").show()
        }
        saveAlertForm("/bricks", C, H, I, G, F, D, "Y")
    }
}

function saveEmailWithSearchInfo() {
    $("#invalidEmail").hide();
    $("#blankEmail").hide();
    $("#yourEmail").removeClass("borderErrRed");
    var A = getUrlStringToSearch();
    var C = $.trim($("#yourEmail").val());
    if (C.length != 0) {
        if (validateSearchInfoEmail(C)) {
            var B = document.cookie;
            A = A.replace(new RegExp("&", "g"), "&&");
            var E = getCookie("userName");
            var D = getCookie("userMobile");
            var F = getCookie("userMobileCountry");
            var G = getCookie("userType");
            if (typeof E === "undefined") {
                E = ""
            }
            if (typeof D === "undefined") {
                D = ""
            }
            if (typeof F === "undefined") {
                F = ""
            }
            if (typeof G === "undefined") {
                G = ""
            }
            saveRequiredForm(contextPath, C, A, E, D, F, G);
            dataLayer.push({
                event: "srp_email_id_submit"
            })
        } else {
            $("#invalidEmail").show();
            $("#yourEmail").addClass("borderErrRed")
        }
    } else {
        $("#blankEmail").show();
        $("#yourEmail").addClass("borderErrRed")
    }
}

function saveEmailWithSearchInfoInExitPopUp() {
    $("#exitPopUp").hide();
    $("#blankEmailAlert").hide();
    $("#exitPopUpEmailBoxAlert").removeClass("borderErrRed");
    var A = getUrlStringToSearch();
    var C = $.trim($("#exitPopUpEmailBoxAlert").val());
    if (C.length != 0) {
        if (validateSearchInfoEmail(C)) {
            var B = document.cookie;
            A = A.replace(new RegExp("&", "g"), "&&");
            var E = getCookie("userName");
            var D = getCookie("userMobile");
            var F = getCookie("userMobileCountry");
            var G = getCookie("userType");
            if (typeof E === "undefined") {
                E = ""
            }
            if (typeof D === "undefined") {
                D = ""
            }
            if (typeof F === "undefined") {
                F = ""
            }
            if (typeof G === "undefined") {
                G = ""
            }
            saveExitPopUpForm(contextPath, C, A, E, D, F, G, "Y")
        } else {
            $("#exitPopUpinvalidEmailAlert").show();
            $("#exitPopUpEmailBoxAlert").addClass("borderErrRed")
        }
    } else {
        $("#exitPopUpblankEmailAlert").show();
        $("#exitPopUpyourEmailBoxAlert").addClass("borderErrRed")
    }
}

function getMobileVerificationFlag() {
    var C = readCookie("userMobile");
    var A = readCookie("userMobileCountry");
    var D = null;
    var B = readCookie("tempMobile#" + C);
    if (C && C.length > 0 && A && A == "50") {
        chkMobileVerificationFlag(C, true)
    }
}

function chkMobileVerificationFlag(C, A) {
    try {
        var B = readCookie("userMobileCountry");
        ajaxService.chkMobileVerification(C, B, {
            callback: function(E) {
                if (E.verificationFlag && E.verificationFlag == true) {
                    createCookie("verificationFlag", "Y", 2)
                } else {
                    createCookie("verificationFlag", "N", 2)
                }
            },
            async: false
        })
    } catch (D) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("searchResult", "chkMobileVerification", D)
        }
    }
}

function findDefaultRadiusVal(C) {
    var B = 5;
    if (C != null) {
        var A = C.split(",");
        if (A.length > 2) {
            B = parseInt(A[2]) / 1000
        }
        if (B > 7 || B == 10 || B == "10") {
            $("#radiusVal").val("7 km");
            $("#radius").val(A[0] + "," + A[1] + ",7000");
            return
        } else {
            $("#radiusVal").val(B + " km");
            return
        }
    }
    $("#radiusVal").val(B + " km")
}

function showCertifiedAgent(C, A, D) {
    var B = "";
    if (!isEmpty(D) && typeof D != "undefined") {
        B = B + '<div class="agentPixN"><img src="' + D + '" /></div>'
    }
    B = B + '<div class="agentBriefBlock">';
    if (!isEmpty(A) && typeof A != "undefined") {
        B = B + '<div class="agentBrief">' + A + "</div>"
    }
    if (!isEmpty(C) && typeof C != "undefined") {
        B = B + '<div class="operatingSinceN">Operating Since: <span>' + C + "</span></div>"
    }
    B = B + '</div><div class="clearAll"></div>';
    $(".blueStrip").append(B);
    $(".agentBrfList").append('<ul><li>A Certified Agent agrees:</li><li class="moreList"><ol>Availability of properties</ol><ol>Genuine photos</ol><ol>Correct prices</ol></li><li>Agrees to follow <span class="fBold">Magicbricks guidelines</span></li><li>Undergoes <span class="fBold">regular audits</span></li></ul>')
}

function isEmpty(A) {
    return (A == null || A === "")
}

function callQuickCountForSrp(A) {
    if (iFollowTransType.startsWith("S")) {
        gaQuickLink("SRP", "Quick facts loaded", "Sale-" + A)
    } else {
        gaQuickLink("SRP", "Quick facts loaded", "Rent-" + A)
    }
}

function createAppDownloadGlobleNavigation(A) {
    var B = "/bricks/get-app-download-global-header.html";
    $.ajax({
        url: B,
        type: "get",
        async: "false",
        success: function(C) {
            if (C != "" && C != null) {
                $("#" + A).html(C)
            }
        }
    })
}
var ENABLESKIPACTION = false;
var COOKIEBASEDMOBILEVERIFICATION = false;
var divErrorObj = new Object();

function checkCookieBasedMobileVerifcation() {
    try {
        ajaxService.checkCookieBasedMobileVerifcation({
            callback: function(B) {
                if (B && B == "Y") {
                    COOKIEBASEDMOBILEVERIFICATION = true
                }
            },
            async: false
        })
    } catch (A) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("commonutil", "checkCookieBasedMobileVerifcation", A)
        }
    }
}

function strTemp(A) {
    if (document.getElementById("availabilityStatus") != null) {
        document.getElementById("availabilityStatus").innerHTML = A
    }
}

function Trim(A) {
    if (A.length < 1) {
        return ""
    }
    A = RTrim(A);
    A = LTrim(A);
    if (A == "") {
        return ""
    } else {
        return A
    }
}

function RTrim(C) {
    var D = String.fromCharCode(32);
    var E = C.length;
    var B = "";
    if (E < 0) {
        return ""
    }
    var A = E - 1;
    while (A > -1) {
        if (C.charAt(A) == D) {} else {
            B = C.substring(0, A + 1);
            break
        }
        A = A - 1
    }
    return B
}
var contactHtml = "";

function createContactNRIPopUpForm() {
    $.getJSON("http://freegeoip.net/json/", function(C) {
        var E = C.country_name;
        var D = C.ip;
        var A = readCookie("nriIpAddress");
        if (E.toLowerCase() != "india" && D != A) {
            var B = "/bricks/nriPopupForm.html";
            contactHtml += "<div class='jq-overlay' id='popUpOverlay' style='z-index:10000'></div>";
            contactHtml += "<div class='jq-modal jq-effect' id='nriPopupWindow' style='z-index:20000'>";
            contactHtml += "<div class='close jq-close' style='display:none;' onclick='if(_gaq){_gaq.push([\"_trackEvent\", \"nri-popup-cross-button-click\",\"popup-cross-button\"]);}submitFormOnCrossButton();'>X</div>";
            contactHtml += "<div class='jq-content'>";
            contactHtml += "<iframe src='" + B + "' width='100%' height='100%' frameborder='0' id='nriPopupIframe'></iframe>";
            contactHtml += "</div>";
            contactHtml += "</div>";
            $("body").append(contactHtml);
            $(".jq-overlay").addClass("jq-overlay-show");
            $("#nriPopupWindow").addClass("jq-show");
            createCookie("nriIpAddress", D, 24);
            if (_gaq) {
                _gaq.push(["_trackPageview", "nri-popup-success"])
            }
        }
    })
}

function closeNRIContactForm(A) {
    $(".jq-overlay").removeClass("jq-overlay-show");
    $("#" + A).removeClass("jq-show")
}

function submitFormOnCrossButton() {
    var C = document.getElementById("nriPopupIframe");
    var A = C.contentDocument || C.contentWindow.document;
    var B = A.getElementById("nriPopupForm");
    $.ajax({
        url: context_url + "nriPopupForm.html",
        type: "POST",
        data: $(B).serialize(),
        success: function(D) {
            closeNRIContactForm("nriPopupWindow")
        }
    })
}

function LTrim(C) {
    var D = String.fromCharCode(32);
    if (E < 1) {
        return ""
    }
    var E = C.length;
    var B = "";
    var A = 0;
    while (A < E) {
        if (C.charAt(A) == D) {} else {
            B = C.substring(A, E);
            break
        }
        A = A + 1
    }
    return B
}

function validateOnlyNumericalhyphen(C, B) {
    var E;
    if (C != null) {
        E = Trim(C.value)
    }
    var F = "0123456789/-";
    var D = true;
    var A;
    for (i = 0; i < E.length && D == true; i++) {
        A = E.charAt(i);
        if (F.indexOf(A) == -1) {
            alert(B);
            C.focus();
            D = false
        }
    }
    return D
}

function validateRequired(B, A) {
    var C;
    if (B != null && B.value != "undefined") {
        C = Trim(B.value)
    }
    if (B.value != "undefined" && C != null && C != "") {
        return true
    } else {
        alert(A);
        B.focus();
        return false
    }
}

function validateMinLength(component, minLength, errorMessage) {
    try {
        var componentValue;
        if (component != null) {
            componentValue = Trim(component.value)
        }
        if (eval(componentValue.length) < eval(minLength)) {
            alert(errorMessage);
            component.focus();
            return false
        } else {
            return true
        }
    } catch (err) {
        txt = "There was an error on this page.\n\n";
        txt += "Error description: " + err.description + "\n\n";
        txt += "Click OK to continue.\n\n";
        alert(txt)
    }
}

function validateMaxLength(component, maxLength, errorMessage) {
    try {
        var componentValue;
        if (component != null) {
            componentValue = Trim(component.value)
        }
        if (eval(componentValue.length) > eval(maxLength)) {
            alert(errorMessage);
            component.focus();
            return false
        } else {
            return true
        }
    } catch (err) {
        txt = "There was an error on this page.\n\n";
        txt += "Error description: " + err.description + "\n\n";
        txt += "Click OK to continue.\n\n";
        alert(txt)
    }
}

function disableAnchor(F, D) {
    if (F != null) {
        if (D) {
            var B = F.getAttribute("href");
            var C = F.getAttribute("onclick");
            if (B && B != "" && B != null) {
                F.setAttribute("href_bak", B)
            }
            if (C != null) {
                F.setAttribute("onclick_back", C);
                F.setAttribute("onclick", "void(0);")
            }
            F.removeAttribute("href")
        } else {
            var A = F.getAttribute("href_bak");
            var E = F.getAttribute("onclick_back");
            if (E != null) {
                F.setAttribute("onclick", E);
                F.removeAttribute("onclick_back")
            }
            if (A != null) {
                F.setAttribute("href", A);
                F.removeAttribute("href_bak")
            }
        }
    }
}

function validateEmail(C, B) {
    var D;
    if (C != null) {
        D = Trim(C.value)
    }
    if (D.length <= 0) {
        return true
    }
    var G = D.match("^(.+)@(.+)$");
    if (G == null) {
        alert(B);
        C.focus();
        return false
    }
    if (D.indexOf("..", 0) != -1) {
        alert(B);
        C.focus();
        return false
    }
    if (G[1] != null) {
        var F = /^\"?[\w-_\.]*\"?$/;
        if (G[1].match(F) == null) {
            alert(B);
            C.focus();
            return false
        }
    }
    if (G[2] != null) {
        var E = /^[\w-\.]*\.[A-Za-z]{2,4}$/;
        if (G[2].match(E) == null) {
            var A = /^\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\]$/;
            if (G[2].match(A) == null) {
                alert(B);
                C.focus();
                return false
            }
        }
        return true
    }
    return false
}

function selectOneCat(E) {
    var D = '"",9000,10000,10001,10002,10003,10020,10021,10022,10017,10054';
    var B = '"",9001,10006,10018,10007,10008,10009,10030,10015,10052,10016,10051,10010,10011,10012,10013,10014';
    var H = '"",9002,10004,10005';
    var A = 0;
    var C = 0;
    var G = 0;
    for (i = 0; i < E.options.length; i++) {
        if (E.options[i].selected == true) {
            if (D.indexOf(E.options[i].value) != -1) {
                A = 1
            }
            if (B.indexOf(E.options[i].value) != -1) {
                var C = 1
            }
            if (H.indexOf(E.options[i].value) != -1) {
                G = 1
            }
        }
    }
    var F = A + C + G;
    if (F > 1) {
        alert("Please select one category(Residential Or Commercial Or Agricultural)");
        for (i = 0; i < E.options.length; i++) {
            E.options[i].selected = false
        }
    }
}

function checkSelections(C, D) {
    var B = 0;
    var A = 0;
    for (i = 1; i < C.options.length; i++) {
        if (C.options[0].selected == true && C.options[i].selected == true) {
            A = 1;
            for (i = 1; i < C.options.length; i++) {
                C.options[0].selected = false
            }
            break
        } else {
            if (C.options[i].selected == true) {
                B = B + 1
            }
        }
    }
    if (B > D) {
        alert("You can only select upto " + D + " " + C.id);
        for (i = 0; i < C.options.length; i++) {
            C.options[i].selected = false
        }
    }
}

function textAreaCharacterCounterTrim(A, B, C) {
    if (A != null) {
        if (A.value.length > B) {
            A.value = A.value.substring(0, B)
        } else {
            C.value = B - A.value.length
        }
    }
}

function detectxss(F, D, B) {
    var A = new RegExp("((%3[cC])|<)((%2[Ff])|/)*[A-Za-z0-9%]+((%3[Ee])|>)");
    var E = true;
    if (B == "") {
        for (var C in divErrorObj) {
            if (document.getElementById(divErrorObj[C]) != null) {
                document.getElementById(divErrorObj[C]).style.display = "none"
            }
        }
        for (i = 0; i < F.elements.length; i++) {
            var G = F.elements[i];
            if (G.type == "text" || G.type == "textarea" || G.type == "password") {
                if (A.exec(G.value)) {
                    document.getElementById(divErrorObj[G.id]).innerHTML = "Scripts / Tags are not allowed.";
                    document.getElementById(divErrorObj[G.id]).style.display = "block";
                    E = false
                }
            }
        }
    } else {
        if (document.getElementById(D)) {
            if (A.exec(document.getElementById(D).value)) {
                document.getElementById(B).innerHTML = "Scripts / Tags are not allowed.";
                document.getElementById(B).style.display = "block";
                E = false
            }
        }
    }
    return E
}

function validateContent(D, B) {
    var C = true;
    for (var A in divErrorObj) {
        if (document.getElementById(divErrorObj[A]) != null) {
            document.getElementById(divErrorObj[A]).style.display = "none"
        }
    }
    for (i = 0; i < D.elements.length; i++) {
        var E = D.elements[i];
        if (B.indexOf(E.id) >= 0 && document.getElementById(divErrorObj[E.id])) {
            if (!isValidContent(E.value)) {
                document.getElementById(divErrorObj[E.id]).innerHTML = "Email / Phone / Web URL are not allowed.";
                document.getElementById(divErrorObj[E.id]).style.display = "block";
                C = false
            }
        }
    }
    return C
}

function isValidContent(B) {
    if (B == null || B == "") {
        return true
    }
    var A = new RegExp("[0-9, \\(\\)\\[\\].\\+\\-_':;!@#$%&]{10}");
    if (A.test(B)) {
        return false
    }
    A = new RegExp("[a-z0-9_-]+(?:\\.[a-z0-9_-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?", "i");
    if (A.test(B)) {
        return false
    }
    A = new RegExp("([a-z0-9.-_//:]*)(\\.|dot)(com|info|net|org|me|mobi|us|biz|mx|ca|ws|ag|comco|netco|nomco|comag|netag|fr|orgag|am|asia|at|be|bz|combz|netbz|netbr|combr|cc|de|es|comes|nomes|orges|eu|fm|gs|coin|firmin|genin|indin|netin|orgin|jobs|jp|ms|commx|nl|nu|conz|netnz|orgnz|tc|tk|tv|tw|comtw|orgtw|idvtw|couk|meuk|orguk|vg|name|co|bike|blue|builders|buzz|bz|cab|camera|camp|careers|center|clothing|codes|coffee|company|computer|construction|contractors|diamonds|directory|domains|education|email|enterprises|equipment|estate|farm|florist|gallery|gift|glass|graphics|guitars|guru|holdings|holiday|house|institute|international|kim|kitchen|la|land|limo|link|management|marketing|menu|photo|photography|photos|pics|plumbing|recipes|red|repair|sexy|shoes|singles|solar|solutions|support|systems|tattoo|technology|tel|tips|today|training|xxx)", "i");
    if (A.test(B)) {
        return false
    }
    return true
}

function showMultiSelect(E, C) {
    var D = "<b>You have selected:</b><br>";
    var G = 0;
    var F = "";
    var B = 0;
    alert("element=" + E + "divId=" + C);
    if (E != undefined) {
        if (E[0] != undefined && E[0].type == "checkbox") {
            for (var A = 0; A < E.length; A++) {
                if (E[A] != undefined && E[A].checked == true) {
                    B = (E[A].title).indexOf("|");
                    if (B > 0) {
                        F = (E[A].title).substr(0, B)
                    } else {
                        F = E[A].title
                    }
                    G++;
                    D += F + "<br>"
                } else {
                    if (E.type == "checkbox" && E.checked == true) {
                        G++;
                        D += E.title + "<br>";
                        break
                    }
                }
            }
        }
    }
    if (C == "locSel") {
        displayOther(E, "textLocationOther")
    }
    if (C == "industrySel") {
        displayOther(E, "textInstitute1Other")
    }
    if (C == "industry2Sel") {
        displayOther(E, "textInstitute2Other")
    }
    if (G <= 0) {
        D = ""
    }
    writeContent(C, D)
}

function displayOther(C, A) {
    if (C != undefined && C != null) {
        for (var B = 0; B < C.length; B++) {
            if (C[B] != undefined && C[B].checked == true && C[B].title.indexOf("Other") != -1) {
                document.getElementById(A).style.display = "inline";
                if (document.getElementById(A + "disp") != undefined) {
                    document.getElementById(A + "disp").style.display = "inline"
                }
            }
        }
    }
}

function writeContent(D, C) {
    var A = browser(D);
    var B = C;
    if (A != null) {
        if (nn4) {
            A.document.open();
            A.document.write(B);
            A.document.close();
            A.visibility = "visible"
        } else {
            A.innerHTML = B;
            A.style.visibility = "visible"
        }
    }
}
var nn4 = (document.layers) ? true : false;
var ie = (document.all) ? true : false;

function browser(B) {
    var A = (nn4) ? document.layers[B] : (ie) ? document.all[B] : document.getElementById(B);
    return A
}

function ForceNumbersOnly(E, C, B) {
    var A;
    var D;
    if (window.event) {
        A = window.event.keyCode
    } else {
        if (C) {
            A = C.which
        } else {
            return true
        }
    }
    if (A == 43 && B == "C") {
        return true
    }
    if (A == 46 && B == "D") {
        if (E.value.indexOf(".") == -1) {
            return true
        } else {
            return false
        }
    }
    if (A != 44 && A > 31 && (A < 48 || A > 57) && A != 47) {
        return false
    } else {
        if ((A == 44 || A == 47) && (B == "P" || B == "D")) {
            return false
        }
        if (A == 47 && B == "L") {
            return false
        }
        return true
    }
}

function forceAlphaNumeric(C, B) {
    if (B.keyCode == 8 || B.keyCode == 46) {
        return true
    }
    var A = String.fromCharCode(B.keyCode || B.charCode);
    if (A.match(/^[a-z0-9]+$/i)) {
        return true
    }
    return false
}

function resetDivContent(A) {
    for (var B in A) {
        if (document.getElementById(A[B]) != null) {
            document.getElementById(A[B]).innerHTML = "";
            document.getElementById(A[B]).style.display = "none"
        }
    }
}

function toggleDisplayById(B, C) {
    if (B != null && B != "" && B != "undefined" && B != "null") {
        for (var A in B) {
            if (document.getElementById(B[A]) != null) {
                document.getElementById(B[A]).style.display = ""
            }
        }
    }
    if (C != null && C != "" && C != "undefined" && C != "null") {
        for (var A in C) {
            if (document.getElementById(C[A]) != null) {
                document.getElementById(C[A]).style.display = "none"
            }
        }
    }
}

function track_comScoreAlt(A) {}

function track_comScoreAlt_new(A) {
    _comscore = [];
    _comscore.push({
        c1: "2",
        c2: "6036484",
        c3: "",
        c4: domainUrl + "/bricks/" + A
    });
    var B = document.createElement("script");
    B.setAttribute("type", "text/javascript");
    B.setAttribute("src", jsPath + "comScore.js");
    document.getElementsByTagName("head")[0].appendChild(B)
}

function ajax_track_comScoreAlt(B) {
    try {
        track_comScoreAlt_new(B)
    } catch (A) {}
    _comscore = [];
    _comscore.push({
        c1: "2",
        c2: "6036484",
        c3: "",
        c4: "<%=DmsConstant.PREVIEW_URL_DOMAIN%>/bricks/" + B
    });
    var C = document.createElement("script");
    C.setAttribute("type", "text/javascript");
    C.setAttribute("src", jsPath + "ajaxComScore.js?" + new Date());
    document.getElementsByTagName("head")[0].appendChild(C)
}

function eraseCookie(A) {
    createCookie(A, "", -1)
}

function createCookie(D, E, B) {
    var A = "";
    if (D == "userType" && E.indexOf(",") > 0) {
        E = E.substring(0, E.indexOf(","))
    }
    if (B) {
        var C = new Date();
        C.setTime(C.getTime() + (B * 60 * 60 * 1000));
        A = "";
        if (D == "userType" || D == "userName" || D == "userEmail" || D == "userMobile" || D == "userTel" || D == "userMobileCountry" || D == "userTelCountry" || D == "userTelStCode" || D == "verificationFlag") {
            C.setTime(C.getTime() + (30 * 24 * 60 * 60 * 1000));
            A = "; expires=" + C.toGMTString()
        } else {
            if (D.indexOf("userMobile#") != -1) {
                C.setTime(C.getTime() + (30 * 24 * 60 * 60 * 1000));
                A = "; expires=" + C.toGMTString()
            }
        }
        if (D == "_no_stay_sign_") {
            A = C.toGMTString();
            document.cookie = D + "=" + E + "; expires=" + A + "; path=/"
        } else {
            document.cookie = D + "=" + E + A + "; path=/"
        }
    } else {
        document.cookie = D + "=" + E + A + "; path=/"
    }
}

function readCookie(B) {
    var A = document.cookie.split(";");
    var D = B + "=";
    for (var C = 0; C < A.length; C++) {
        var E = A[C];
        while (E.charAt(0) == " ") {
            E = E.substring(1, E.length)
        }
        if (E.indexOf(D) == 0) {
            retVal = E.substring(D.length, E.length);
            if (B == "userType" && retVal.indexOf(",") > 0) {
                return retVal.substring(0, retVal.indexOf(","))
            } else {
                if (B == "userEmail") {
                    return retVal.replace(/^"(.\*)"$/, "$1")
                } else {
                    if (B == "userName") {
                        return retVal.replace(/^"(.\*)"$/, "$1")
                    } else {
                        return retVal
                    }
                }
            }
        }
    }
    return null
}

function captureData(D, B) {
    var A = readCookie("mbUserUUID");
    try {
        ajaxService.trackMBData(A, D, B, {
            callback: function(E) {
                if (!A) {
                    createCookieExpiresInDay("mbUserUUID", E, 30)
                }
            },
            async: true
        })
    } catch (C) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("commonutil", "captureData", C)
        }
    }
    if (B == "C") {
        createPersonalisedContactCookie(D)
    }
}

function createPersonalisedContactCookie(Z) {
    var N = Z.indexOf("propertyId");
    var Q = Z.substring(parseInt(N) + parseInt(11), Z.indexOf("|", N));
    var U = "id-" + Q;
    var L = readCookie("repUser");
    if (L != null && L.indexOf("id-" + Q) > -1) {
        console.log("Returning");
        return
    }
    var Y = parseInt(Z.indexOf("category")) + parseInt(9);
    var O = Z.indexOf("|", Y);
    var G = Z.substring(Y, O);
    U = U + "|th-" + G;
    var M = Z.indexOf("reqBedrooms");
    var E = Z.substring(parseInt(M) + parseInt(12), Z.indexOf("|", M));
    U = U + "|bd-" + E;
    var X = Z.indexOf("cityrfnum");
    var F = Z.substring(parseInt(X) + parseInt(10), Z.indexOf("|", X));
    U = U + "|ct-" + F;
    var J = Z.indexOf("localityrfnum");
    var H = Z.substring(parseInt(J) + parseInt(14), Z.indexOf("|", J));
    U = U + "|lt-" + H;
    var K = Z.indexOf("propType");
    var S = Z.substring(parseInt(K) + parseInt(9), Z.indexOf("|", K));
    U = U + "|pr-" + S;
    var V = Z.indexOf("minBudget");
    var D = Z.substring(parseInt(V) + parseInt(10), Z.indexOf("|", V));
    U = U + "|bg-" + D;
    U = U.replace(/ /g, "_");
    U = U.replace(/:/g, "-");
    var W = readCookie("repUser");
    var I = 0;
    if (W != null) {
        I = (W.match(/id-/g) || []).length
    }
    if (Q && Q != null) {
        if (I == 1) {
            var R = W.indexOf("id-");
            var C = W.substring(parseInt(R) + parseInt(3), W.indexOf("|", R));
            if (Q != C) {
                U = U + "|" + W
            }
        } else {
            if (parseInt(I) > 1) {
                var T = W.indexOf("|id-", 5);
                var P = W.indexOf("id-", 0);
                var B = W.substring(parseInt(P) + parseInt(3), W.indexOf("|", P));
                var A = W.substring(parseInt(T) + parseInt(3), W.indexOf("|", T));
                if ((parseInt(Q) != parseInt(B)) && (parseInt(Q) != parseInt(A))) {
                    W = W.substring(0, T);
                    U = U + "|" + W
                } else {
                    U = W
                }
            }
        }
        createCookieExpiresInDay("repUser", U, 30)
    }
}

function createCookieExpiresInDay(C, D, E) {
    if (E) {
        var B = new Date();
        B.setTime(B.getTime() + (E * 24 * 60 * 60 * 1000));
        var A = "; expires=" + B.toGMTString()
    } else {
        var A = ""
    }
    document.cookie = C + "=" + D + A + "; path=/"
}

function getCapturedData(G, D, C) {
    var F = "";
    var A = "Post";
    if (C == "P") {
        A = "Post"
    } else {
        if (C == "V") {
            A = "View"
        }
    }
    F += "Activity:" + A + "_" + D;
    if (G && G != null) {
        var B = new Object();
        B[D] = G;
        try {
            ajaxService.getDescriptionMapByCode(B, {
                callback: function(L) {
                    if (L) {
                        var I = new Object();
                        if (L[D] && L[D] != "") {
                            I = L[D];
                            for (var K in I) {
                                if (K && I[K]) {
                                    var J = I[K];
                                    var H = F;
                                    if (J.prjName) {
                                        H += "|projectId:" + J.prjName
                                    }
                                    if (J.devName) {
                                        H += "|devName:" + J.devName
                                    }
                                    if (J.cg) {
                                        H += "|category:" + J.cg
                                    } else {
                                        if (category && category != null && category != undefined) {
                                            H += "|category:" + category
                                        }
                                    }
                                    if (J.bd) {
                                        H += "|reqBedrooms:" + J.bd
                                    }
                                    if (J.ct) {
                                        H += "|cityrfnum:" + J.ct
                                    } else {
                                        if (L.ct) {
                                            H += "|cityrfnum:" + L.ct
                                        }
                                    }
                                    if (J.lt) {
                                        H += "|localityrfnum:" + J.lt
                                    } else {
                                        if (L.lt) {
                                            H += "|localityrfnum:" + L.lt
                                        }
                                    }
                                    if (J.pt) {
                                        H += "|propType:" + J.pt
                                    } else {
                                        if (L.pt) {
                                            H += "|propType:" + L.pt
                                        }
                                    }
                                    if (J.bgmn) {
                                        H += "|minBudget:" + J.bgmn
                                    } else {
                                        if (L.bgmn) {
                                            H += "|minBudget:" + L.bgmn
                                        }
                                    }
                                    if (J.bgmx) {
                                        H += "|maxBudget:" + J.bgmx
                                    } else {
                                        if (L.bgmx) {
                                            H += "|maxBudget:" + L.bgmx
                                        }
                                    }
                                    if (H != "") {
                                        H += "|id:" + K;
                                        captureData(H, C);
                                        isLogged = true
                                    }
                                }
                            }
                        } else {
                            if (L.st) {
                                F += "|staterfnum:" + L.st
                            }
                            if (L.ct) {
                                F += "|cityrfnum:" + L.ct
                            }
                            if (L.lt) {
                                F += "|localityrfnum:" + L.lt
                            }
                            if (L.pt) {
                                F += "|propType:" + L.pt
                            }
                            if (L.bgmn) {
                                F += "|minBudget:" + L.bgmn
                            }
                            if (L.bgmx) {
                                F += "|maxBudget:" + L.bgmx
                            }
                            if (L.bd) {
                                F += "|reqBedrooms:" + L.bd
                            }
                        }
                    }
                },
                async: false
            })
        } catch (E) {
            if (!(typeof window.errorHandler === "undefined")) {
                errorHandler("commonutil", "getCapturedData", E)
            }
        }
    }
    if (isLogged == false && !(typeof mbRunstats === "undefined") && F != "") {
        F += "|id:" + key;
        captureData(F, C);
        return true
    }
}

function getCapturedDataForViewProject(F, C, B, E) {
    var D = "";
    var A = "Post";
    if (B == "P") {
        A = "Post"
    } else {
        if (B == "V") {
            A = "View"
        }
    }
    D += "Activity:" + A + "_" + C;
    D += "|ProjectID:" + F;
    D += "|id:" + F;
    D += "|category:B";
    D += "|cityrfnum:" + E;
    captureData(D, B);
    return true
}

function smsMobileVerifcatioDivCode(B, A, I, N, C, E) {
    try {
        var P = false;
        var L = "N";
        var O = readCookie("userMobileCountry");
        var R = false;
        var J = false;
        var G = setVerificationText(N, C);
        J = G.contactAdvertiser;
        R = G.viewPhoneNumber;
        ajaxService.chkMobileVerification(B, O, {
            callback: function(T) {
                if (T.verificationFlag && T.verificationFlag == true) {
                    L = "Y"
                } else {
                    L = "N"
                }
            },
            async: false
        });
        if (J || R) {
            P = true
        }
        var D = true;
        if (N === "buyerdashboardContact" && C === "buyerdashboardContactValue") {
            P = true;
            D = false
        }
        var F = "";
        F = '<div id="smsWrapper" class="buyerWapSms">';
        if (D) {
            F = F + '<div class="head"><div class="posRelBack"><span class="backToForm"></span></div>'
        }
        if (ENABLESKIPACTION) {
            F = F + '<div class="mobileVerTop">Verify your mobile number <div class="closeForm" onclick="stopPage=true;"><a href="javascript:void(0);" onclick="moreContactBuyerPopClose();" class="closePop"></a> </div></div>';
            F = F + '<div class="mobileVerTopadvContact">Enter 3 digit Verification Code sent on <br/><span class="mNumber black">' + B + '</span> <span class="editNo backToForm pencil-ico" onclick="backWithEditPencil()"></span></div>'
        } else {
            if (!P) {
                F = F + '<div class="mobileVerTop">Verify your mobile (<span class="mNumber">' + B + "</span>) to get</div>";
                F = F + '<div class="mobileVerTopadvContact">Contact details of the Advertiser </div>'
            } else {
                if (N === "buyerdashboardContact" && C === "buyerdashboardContactValue") {
                    F = F + '<div class="mobileVerTop">Verify your mobile number <div class="closeForm" onclick="stopPage=true;"><a href="javascript:void(0);" onclick="moreContactBuyerPopClose();" class="closePop"></a> </div></div>';
                    F = F + '<div class="mobileVerTopadvContact">Enter 3 digit Verification Code sent on <br/><span class="mNumber black">' + B + '</span> <span class="editNo backToForm pencil-ico" onclick="backWithEditPencil()"></span></div>'
                } else {
                    if (J) {
                        F = F + '<div class="mobileVerTop">Verify your mobile number <div class="closeForm" onclick="stopPage=true;"><a href="javascript:void(0);" onclick="moreContactBuyerPopClose();" class="closePop"></a> </div></div>';
                        F = F + '<div class="mobileVerTopadvContact">Enter 3 digit Verification Code sent on <br/><span class="mNumber black">' + B + '</span> <span class="editNo backToForm pencil-ico" onclick="backWithEditPencil()"></span></div>'
                    }
                    if (R) {
                        F = F + '<div class="mobileVerTop">Verify your mobile number <div class="closeForm" onclick="stopPage=true;"><a href="javascript:void(0);" onclick="moreContactBuyerPopClose();" class="closePop"></a> </div></div>';
                        F = F + '<div class="mobileVerTopadvContact">Enter 3 digit Verification Code sent on <br/><span class="mNumber black">' + B + '</span> <span class="editNo backToForm pencil-ico" onclick="backWithEditPencil()"></span></div>'
                    }
                }
            }
            var M = setTimeout(function() {
                $("#toCall").val("false");
                if ($("#toCall").val() == "true") {
                    var T = contextPath + "ajax/findLatestOTP.json?mobileNumber=" + B;
                    $.ajax({
                        dataType: "json",
                        type: "get",
                        url: T,
                        cache: true,
                        async: false,
                        success: function(U) {
                            var V = "http://enterprise.internal.knowlarity.com/api/voice/quickCall/?username=shivams&password=123456&ivr_id=1000005053&format=xml&phone_book=" + B + "," + U;
                            $.ajax({
                                dataType: "xml",
                                type: "get",
                                url: V,
                                cache: true,
                                async: false,
                                success: function(W) {}
                            })
                        }
                    })
                }
            }, 35000)
        }
        F = F + "</div>";
        F = F + '<input style="display:none" id="toCall" value="true" />';
        F = F + '<div class="verifyBlock">';
        F = F + '<div class="entBoCont"><input name="smsNo" id ="smsNo" type="text" placeholder="Enter 3 digit Verification Code" class="entNo"/></div>';
        F = F + '<div class="actionBlock mt148"><a href="javascript://"';
        var S = createStringIntoMap(E, ";", ":");
        var H = S.contactID;
        F = F + ' onclick="verifyingMobileNumber(&apos;' + B + "&apos;,&apos;" + H + "&apos;,&apos;" + I + "&apos;,&apos;" + N + "&apos;,&apos;" + C + "&apos;,&apos;" + E + '&apos;)"';
        F = F + ' class="subBtn btn3">Submit</a>';
        if (I && ENABLESKIPACTION) {
            F = F + '<a href="javascript://"';
            F = F + 'onclick="onClickSkipAction(&apos;' + B + "&apos;,&apos;" + I + "&apos;,&apos;" + N + "&apos;,&apos;" + C + "&apos;,&apos;" + E + '&apos;);"';
            F = F + 'class="skipBtn btn4">Skip</a></div>'
        } else {
            F = F + "</div>"
        }
        F = F + '<div class="smsVerifiedMes" id="smsVerifiedMes_' + H + '"></div>';
        if (ENABLESKIPACTION && L != "Y") {
            F = F + '<div class="resemdContHead didnt">Did not get Verification Code?</div>';
            F = F + "<div class='resemdCont' id='smsCodeSent'>";
            F = F + ' <a href="javascript://"';
            F = F + ' onclick="verifyingMobileNumberSMS(&apos;' + B + "&apos;,&apos;" + A + "&apos;,&apos;" + H + '&apos;);"';
            F = F + " >Resend Code</a>";
            F = F + "</div>"
        } else {
            var K = null;
            if (readCookie("userMobileCountry")) {
                K = readCookie("userMobileCountry")
            }
            if (K == null) {
                K = "50"
            }
            if (K == "50" && L != "Y") {
                F = F + '<div class="resemdContHead">Did not get Verification Code?</div>';
                F = F + "<div class='resemdCont rBorder wf' id='smsCodeSent'>";
                F = F + ' <a href="javascript://"';
                F = F + ' onclick="verifyingMobileNumberSMS(&apos;' + B + "&apos;,&apos;" + A + "&apos;,&apos;" + H + '&apos;);_gaq.push([&quot;_trackEvent&quot;, &quot;resend-verification-code-button-click&quot;,&quot;resend-verification-code-button-click&quot;]);"';
                F = F + " >Resend code</a>";
                F = F + "</div>";
                F = F + "<div class='resemdCont ws' id='smsCodeSent'  style='display:none;'>";
                F = F + ' <a href="javascript://"';
                F = F + ' onclick="verifyingMobileNumberCall(&apos;' + B + "&apos;,&apos;" + I + "&apos;,&apos;" + N + "&apos;,&apos;" + C + "&apos;,&apos;" + E + '&apos;);_gaq.push([&quot;_trackEvent&quot;, &quot;request-otp-code-on-call-button-click&quot;,&quot;request-otp-code-on-call-button-click&quot;]);"';
                F = F + " >Request <br> Code on call</a>";
                F = F + "</div>";
                F = F + '<div class="clearAll"></div>';
                F = F + '<div class="resemdCont" id="smsCodeSentUnverifedDiv"></div>'
            } else {
                F = F + "<div style='height: 40px;'></div>"
            }
        }
        F = F + "</div>";
        F = F + "</div>";
        return F
    } catch (Q) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("commonytil", "smsVerifcatioDivCode", Q)
        }
    }
}

function smsVerifcatioDivCode(B, A, I, N, C, E) {
    try {
        var P = false;
        var L = "N";
        var O = readCookie("userMobileCountry");
        var R = false;
        var J = false;
        var G = setVerificationText(N, C);
        J = G.contactAdvertiser;
        R = G.viewPhoneNumber;
        ajaxService.chkMobileVerification(B, O, {
            callback: function(T) {
                if (T.verificationFlag && T.verificationFlag == true) {
                    L = "Y"
                } else {
                    L = "N"
                }
            },
            async: false
        });
        if (J || R) {
            P = true
        }
        var D = true;
        if (N === "buyerdashboardContact" && C === "buyerdashboardContactValue") {
            P = true;
            D = false
        }
        var F = "";
        F = '<div id="smsWrapper">';
        if (D) {
            F = F + '<div class="head"><div class="posRelBack"><span class="backToForm"></span></div>'
        }
        if (ENABLESKIPACTION) {
            F = F + '<div class="popHeader">Verify Mobile Number</div>';
            F = F + '<div class="subPopHeader step3">Advertisers respond quickly to verified numbers</div>';
            F = F + '<div class="subPopHeader agentDetail">Enter the 3 digit verification code sent on <span class="fBold">' + B + "</span></div>"
        } else {
            if (!P) {
                F = F + '<div class="mobileVerTop">Verify your mobile (<span class="mNumber">' + B + "</span>) to get</div>";
                F = F + '<div class="mobileVerTopadvContact">Contact details of the Advertiser </div>'
            } else {
                if (N === "buyerdashboardContact" && C === "buyerdashboardContactValue") {
                    F = F + '<div class="mobileVerTop">Please enter the one time verification</div>';
                    F = F + '<div class="mobileVerTopadvContact"><br>code sent on <span class="mNumber">' + B + '</span> <span class="editNo backToForm"   onClick="moveLeftObj();">Edit</span></div>'
                } else {
                    if (J) {
                        F = F + '<div class="mobileVerTop">Verify your mobile number to contact the advertiser</div>';
                        F = F + '<div class="mobileVerTopadvContact">Please enter the one time verification<br>code sent on <span class="mNumber">' + B + '</span> <span class="editNo backToForm">Edit</span></div>'
                    }
                    if (R) {
                        F = F + '<div class="mobileVerTop">Verify your mobile number to get contact details of the advertiser.</div>';
                        F = F + '<div class="mobileVerTopadvContact">Please enter the one time verification<br>code sent on <span class="mNumber">' + B + '</span> <span class="editNo backToForm">Edit</span></div>'
                    }
                }
            }
            var M = setTimeout(function() {
                $("#toCall").val("false");
                if ($("#toCall").val() == "true") {
                    var T = contextPath + "ajax/findLatestOTP.json?mobileNumber=" + B;
                    $.ajax({
                        dataType: "json",
                        type: "get",
                        url: T,
                        cache: true,
                        async: false,
                        success: function(U) {
                            var V = "http://enterprise.internal.knowlarity.com/api/voice/quickCall/?username=shivams&password=123456&ivr_id=1000005053&format=xml&phone_book=" + B + "," + U;
                            $.ajax({
                                dataType: "xml",
                                type: "get",
                                url: V,
                                cache: true,
                                async: false,
                                success: function(W) {}
                            })
                        }
                    })
                }
            }, 35000)
        }
        F = F + "</div>";
        F = F + '<input style="display:none" id="toCall" value="true" />';
        F = F + '<div class="verifyBlock">';
        F = F + '<div class="entBoCont"><input name="smsNo" id ="smsNo" type="text" placeholder="Enter 3 digit Verification Code" class="entNo"/></div>';
        F = F + '<div class="actionBlock"><a href="javascript://"';
        var S = createStringIntoMap(E, ";", ":");
        var H = S.contactID;
        F = F + ' onclick="verifyingMobileNumber(&apos;' + B + "&apos;,&apos;" + H + "&apos;,&apos;" + I + "&apos;,&apos;" + N + "&apos;,&apos;" + C + "&apos;,&apos;" + E + '&apos;)"';
        F = F + ' class="subBtn btn3">Submit</a>';
        if (I && ENABLESKIPACTION) {
            F = F + '<a href="javascript://"';
            F = F + 'onclick="onClickSkipAction(&apos;' + B + "&apos;,&apos;" + I + "&apos;,&apos;" + N + "&apos;,&apos;" + C + "&apos;,&apos;" + E + '&apos;);"';
            F = F + 'class="skipBtn btn4">Skip</a></div>'
        } else {
            F = F + "</div>"
        }
        F = F + '<div class="smsVerifiedMes" id="smsVerifiedMes_' + H + '"></div>';
        if (ENABLESKIPACTION && L != "Y") {
            F = F + '<div class="resemdContHead">Didn\'t receive SMS?</div>';
            F = F + "<div class='resemdCont' id='smsCodeSent'>";
            F = F + ' <a href="javascript://"';
            F = F + ' onclick="verifyingMobileNumberSMS(&apos;' + B + "&apos;,&apos;" + A + "&apos;,&apos;" + H + '&apos;);"';
            F = F + " >Resend <br> verification code</a>";
            F = F + "</div>"
        } else {
            var K = null;
            if (readCookie("userMobileCountry")) {
                K = readCookie("userMobileCountry")
            }
            if (K == null) {
                K = "50"
            }
            if (K == "50" && L != "Y") {
                F = F + '<div class="resemdContHead">Didn\'t receive SMS?</div>';
                F = F + "<div class='resemdCont rBorder wf' id='smsCodeSent'>";
                F = F + ' <a href="javascript://"';
                F = F + ' onclick="verifyingMobileNumberSMS(&apos;' + B + "&apos;,&apos;" + A + "&apos;,&apos;" + H + '&apos;);_gaq.push([&quot;_trackEvent&quot;, &quot;resend-verification-code-button-click&quot;,&quot;resend-verification-code-button-click&quot;]);"';
                F = F + " >Resend <br> verification code</a>";
                F = F + "</div>";
                F = F + "<div class='resemdCont ws' id='smsCodeSent'>";
                F = F + ' <a href="javascript://"';
                F = F + ' onclick="verifyingMobileNumberCall(&apos;' + B + "&apos;,&apos;" + I + "&apos;,&apos;" + N + "&apos;,&apos;" + C + "&apos;,&apos;" + E + '&apos;);_gaq.push([&quot;_trackEvent&quot;, &quot;request-otp-code-on-call-button-click&quot;,&quot;request-otp-code-on-call-button-click&quot;]);"';
                F = F + " >Request <br> Code on call</a>";
                F = F + "</div>";
                F = F + '<div class="clearAll"></div>';
                F = F + '<div class="resemdCont" id="smsCodeSentUnverifedDiv"></div>'
            } else {
                if (K != "50") {
                    F = F + "<div style='height: 40px;'></div>";
                    F = F + "<div class='newOrBlock'></div>";
                    F = F + "<div class='newSkiptb'><a href='javascript://' onClick='onClickSkipAction(&apos;" + B + "&apos;,&apos;" + I + "&apos;,&apos;" + N + "&apos;,&apos;" + C + "&apos;,&apos;" + E + "&apos;);'>SKIP</div></div>"
                } else {
                    F = F + "<div style='height: 40px;'></div>"
                }
            }
        }
        F = F + "</div>";
        F = F + "</div>";
        return F
    } catch (Q) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("commonytil", "smsVerifcatioDivCode", Q)
        }
    }
}

function setVerificationText(D, B) {
    var E = false;
    var A = false;
    if (D === "propertySearchResultPage" && B === "contactAdvertiser") {
        A = true
    } else {
        if (D === "propertySearchResultPage" && B === "viewPhoneNumber") {
            E = true
        } else {
            if (D === "viewProjectResultPage" && B === "contactNow") {
                E = true
            } else {
                if (D === "projectSearchResultPage" && B === "contactAdvertiser") {
                    A = true
                } else {
                    if (D === "projectSearchResultPage" && B === "viewPhoneNumber") {
                        E = true
                    } else {
                        if (D === "agentSearchResultPage" && B === "contactAgent") {
                            A = true
                        } else {
                            if (D === "agentSearchResultPage" && B === "viewPhoneNumber") {
                                E = true
                            } else {
                                if (D === "projectAlertLandingPage" && B === "viewPhoneNumber") {
                                    E = true
                                } else {
                                    if (D === "agentSearchResultPage" && B === "gdes") {
                                        E = true
                                    } else {
                                        if (D === "viewSearchResultPage" && B === "searchNow") {
                                            A = true
                                        } else {
                                            if (D === "viewSearchResultPage" && B === "searchNow") {
                                                A = true
                                            } else {
                                                if (D === "userProfileListingResultPage" && B === "userProfileNow") {
                                                    A = true
                                                } else {
                                                    if (D === "sendContactDetailsResultPage" && B === "sendContactNow") {
                                                        A = true
                                                    } else {
                                                        if (D === "projectAlertlandingPage" && B === "contactNow") {
                                                            A = true
                                                        } else {
                                                            if (D === "projectAlertLandingPage" && B === "getContactDetail") {
                                                                A = true
                                                            } else {
                                                                if (D === "alertLandingPage" && B === "contactAdvertiser") {
                                                                    A = true
                                                                } else {
                                                                    if (D === "alertLandingPageNew" && B === "contactAdvertiserNew") {
                                                                        A = true
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    var C = new Array();
    C.contactAdvertiser = A;
    C.viewPhoneNumber = E;
    return C
}

function onClickSkipAction(Q, T, O, N, b) {
    $("div.propertySRPSimProp .siteVisitSection").hide();
    decodeMobileNumber(Q, T, O, N, b);
    if (O === "propertySearchResultPage" && N === "contactAdvertiser") {
        map = createStringIntoMap(b, ";", ":");
        var D = map.contactID;
        var g = map.chat;
        var f = map.contactType;
        if (typeof g != "undefined" && g == "Y") {
            var C = map.url;
            var W = parent.document.getElementById("propContactGreyBox_9");
            if (typeof W != "undefined") {
                parent.$("#propContactGreyBox_9,#showMe").hide()
            }
            closePropertyContactForm(D);
            loadAjaxData(C, "#chatIconWindow")
        }
        if ($("#contactHeader") + D) {
            $("#contactHeader" + D).hide()
        }
        if (showmbrecomendation == true) {
            loadNewRecommendationForContact(D, "propertySearch", "contactAdvertiser")
        } else {
            $("#recomLoaderforviewphone").hide()
        }
        $("#internContactFormUppderDiv" + D).hide();
        $("#internContactForm" + D).hide();
        $("#propertyContactFormDiv" + D).slideUp("slow");
        var H = readCookie("userType");
        var G = readCookie("userEmail");
        var U = readCookie("userName");
        var X = readCookie("userMobileIsd");
        var Y = null;
        var e = null;
        if (f && f === "agent") {} else {
            var k = "";
            if ((rightHandSide != "Y")) {
                ajaxService.checkWhetherUserHasPropertyorNot(D, U, X, H, G, Q, e, {
                    callback: function(q) {
                        k = q
                    },
                    async: false
                })
            }
            if (f && f === "agent") {} else {
                ajaxService.checkBrokerConnectCheck(D, H, Q, G, {
                    callback: function(q) {
                        Y = q
                    },
                    async: false
                })
            }
        }
        if (k) {
            var a = false;
            a = showQuestionTag(D, H, Q, G, "firstTime", "");
            if (a) {
                if (Y == "aaCookie") {
                    $(".newSimilarForDetail").addClass("resetForAppD");
                    $("#userNameText").text(U);
                    $("#brokerConnectDiv").show();
                    applogicContact(D)
                } else {
                    if (Y == "aiCookie") {
                        $(".newSimilarForDetail").addClass("resetForAppD");
                        $("#smartDiaryDiv").show()
                    } else {
                        var I = showNriScreen(D);
                        if (!I) {
                            $("#contactForm" + D).slideDown("slow");
                            similarPropertyCall(D);
                            $(".newSimilarForDetail").show()
                        }
                    }
                }
            }
        } else {
            if (Y == "aaCookie") {
                $(".newSimilarForDetail").addClass("resetForAppD");
                $("#userNameText").text(U);
                $("#brokerConnectDiv").show();
                applogicContact(D)
            } else {
                if (Y == "aiCookie") {
                    $(".newSimilarForDetail").addClass("resetForAppD");
                    $("#smartDiaryDiv").show()
                } else {
                    var I = showNriScreen(D);
                    if (!I) {
                        $("#contactForm" + D).slideDown("slow");
                        similarPropertyCall(D);
                        $(".newSimilarForDetail").show()
                    }
                }
            }
        }
        $("#recomLoaderforcontact").show();
        setTimeout(function() {
            $("#recomLoaderforcontact").hide();
            $("#fixedRqmtHelpContentforcontact").hide();
            $("#displayRecommendationsforcontact").show();
            $("#fixedRqmtRecomSliderforcontact").anythingSlider({
                expand: true,
                hashTags: false,
                autoPlay: true
            });
            $("#fixedRqmtRecomSliderforcontact").show();
            $("#fixedRqmtRecomSliderforcontact").animate({
                right: "0px"
            }, "slow")
        }, 2000);
        if (!(f && f === "agent")) {
            pixelfb()
        }
        if (!(f && f === "agent")) {
            setNpsDataForm(D)
        }
    } else {
        if (O === "propertySearchResultPage" && N === "viewPhoneNumber") {
            map = createStringIntoMap(b, ";", ":");
            var D = map.contactID;
            var f = map.contactType;
            $("#internContactFormUppderDiv" + D).hide();
            $("#internContactForm" + D).hide();
            $("#imageDiv" + D).css("display", "none");
            $("#propertyViewPhoneDiv" + D).slideUp("slow");
            var Y = null;
            var H = readCookie("userType");
            var G = readCookie("userEmail");
            var U = readCookie("userName");
            var X = readCookie("userMobileIsd");
            var e = null;
            if (f && f === "agent") {} else {
                var k = "";
                if ((rightHandSide != "Y")) {
                    ajaxService.checkWhetherUserHasPropertyorNot(D, U, X, H, G, Q, e, {
                        callback: function(q) {
                            k = q
                        },
                        async: false
                    })
                }
                if (f && f === "agent") {} else {
                    ajaxService.checkBrokerConnectCheck(D, H, Q, G, {
                        callback: function(q) {
                            Y = q
                        },
                        async: false
                    })
                }
            }
            if (k) {
                var a = false;
                a = showQuestionTag(D, H, Q, G, "firstTime", "");
                if (a) {
                    if (Y == "aaCookie") {
                        $(".newSimilarForDetail").addClass("resetForAppD");
                        $("#userNameText").text(U);
                        $("#brokerConnectDiv").show();
                        applogicContact(D)
                    } else {
                        if (Y == "aiCookie") {
                            $(".newSimilarForDetail").addClass("resetForAppD");
                            $("#smartDiaryDiv").show()
                        } else {
                            var I = showNriScreen(D);
                            if (!I) {
                                $("#agentPhoneForm" + D).slideDown("slow");
                                similarPropertyCall(D);
                                $(".newSimilarForDetail").show()
                            }
                        }
                    }
                }
            } else {
                if (Y == "aaCookie") {
                    $(".newSimilarForDetail").addClass("resetForAppD");
                    $("#userNameText").text(U);
                    $("#brokerConnectDiv").show();
                    applogicContact(D)
                } else {
                    if (Y == "aiCookie") {
                        $("#smartDiaryDiv").show()
                    } else {
                        var I = showNriScreen(D);
                        if (!I) {
                            $("#agentPhoneForm" + D).slideDown("slow");
                            $(".newSimilarForDetail").show()
                        }
                    }
                }
            }
            if (showmbrecomendation == true) {
                loadNewRecommendationForContact(D, "propertySearch", "contactAdvertiser")
            } else {
                $("#recomLoaderforviewphone").hide()
            }
            if (!(f && f === "agent")) {
                pixelfb()
            }
            if (!(f && f === "agent")) {
                setNpsDataForm(D)
            }
        } else {
            if (O === "viewProjectResultPage" && N === "contactNow") {
                map = createStringIntoMap(b, ";", ":");
                var D = map.contactID;
                if ($("#internContactFormUppderDiv" + D)) {
                    $("#internContactFormUppderDiv" + D).hide()
                }
                if ($("#internContactPhoneFormUppderDiv" + D)) {
                    $("#internContactPhoneFormUppderDiv" + D).hide()
                }
                if ($("#viewProjectPhoneDetails" + D)) {
                    $("#viewProjectPhoneDetails" + D).slideDown("slow")
                }
                if ($("#viewProjectPhoneSMSDetail" + D)) {
                    $("#viewProjectPhoneSMSDetail" + D).slideDown("slow")
                }
            } else {
                if (O === "projectSearchResultPage" && (N === "contactAdvertiser" || N === "viewPhoneNumber")) {
                    map = createStringIntoMap(b, ";", ":");
                    var f = map.contactType;
                    var D = map.contactID;
                    if (f == "project" || f == "agent") {
                        $("#internContactFormUppderDiv" + D).hide();
                        $("#internContactForm" + D).hide();
                        $(".contactAdvertiserForm .formContentWrapper").slideUp("slow");
                        $(".contactAdvertiserForm .thanksYouMessage").slideDown("slow");
                        $(".viewPhoneNumber .formContentWrapper").slideUp("slow");
                        $(".viewPhoneNumber .thanksYouMessage").slideDown("slow");
                        $(".downloadBrochure .formContentWrapper").slideUp("slow");
                        $(".downloadBrochure .thanksYouMessage").slideDown("slow")
                    }
                    if (f == "agent") {
                        $(".viewProjectPhone").slideUp("slow");
                        $("#agentInfoId").slideDown("slow")
                    }
                } else {
                    if (O === "agentSearchResultPage" && N === "contactAgent") {
                        map = createStringIntoMap(b, ";", ":");
                        var c = map.contactID;
                        $("#internContactFormUppderDiv" + c).hide();
                        $("#internContactForm" + c).hide();
                        $("#dd1" + c).show();
                        showdetails(c);
                        document.getElementById("thankDiv" + c).style.display = "block";
                        document.getElementById("thankDiv" + c).innerHTML = document.getElementById("thankDiv" + c).innerHTML + status
                    } else {
                        if (O === "agentSearchResultPage" && N === "viewPhoneNumber") {
                            map = createStringIntoMap(b, ";", ":");
                            var c = map.contactID;
                            var V = map.dispContactUpfront;
                            $("#internContactFormUppderDivViewPhoneNumber" + c).hide();
                            if (V == "N") {
                                if (document.getElementById("subDataDiv#" + c)) {
                                    document.getElementById("subDataDiv#" + c).style.display = "block"
                                }
                                if (document.getElementById("subDataDiv2#" + c)) {
                                    document.getElementById("subDataDiv2#" + c).style.display = "block"
                                }
                            } else {
                                if (document.getElementById("thankDivCD1#" + c)) {
                                    document.getElementById("thankDivCD1#" + c).style.display = "block"
                                }
                            }
                        } else {
                            if (O === "projectAlertLandingPage" && N === "viewPhoneNumber") {
                                map = createStringIntoMap(b, ";", ":");
                                var c = map.contactID;
                                var p = map.type;
                                $("#internContactFormUppderDivViewPhoneNumber" + c).hide();
                                if (p == "project" || p == "Project" || p == "project3") {
                                    var Z = "<div id='recomLoader_ViewContact_" + R + "' style='text-align:center;display:none;'><img align='middle' src='" + imgPath + "smallLoader.gif' alt='' />Loading Properties You May Like...</div><div id='displayRecommendations_ViewContact_" + R + "' style='display:none; background:#EBEBEB; padding:16px 0 4px; *padding-bottom:16px;'><div id='agentDetailRecomWidget'><div id='wigPropertySearchResult_ViewContact_" + R + "'><div class='wigInnerWrapper'><div class='wigHeadingNbutton'><div class='wigHeading' id='propSearchContactWigHeading_ViewContact_" + R + "'>Property you May Like</div><div class='wigNumberingNButton'><div class='wigButton'><a href='javascript:showHelpContentDWRContact(\"_ViewContact_" + R + "\")' class='wigHelpBtn' id='wigHelpBtnPropSearchContact_ViewContact_" + R + "'>Help</a><a href='javascript:closeRecomOnPageDWRContact(\"_ViewContact_" + R + "\")' class='wigCloseBtn' id='wigCloseBtnPropSearchContact_ViewContact_" + R + "'>Close</a></div></div><div class='clear'></div></div><div class='wigContent helpContent' id='propSearchContactHelpContent_ViewContact_" + R + "'><a class='wigBackLinkCust' href='javascript:resumeRecomDisplayDWRContact(\"_ViewContact_" + R + "\")'>BACK</a><div class='wigHelp'><ul><li><span><input type='radio' id='prefToSeeRecomPropSearchContact_ViewContact_" + R + "' name='radio' checked /></span>I would like to see recommendations from magicbricks.com.</li><li><span><input type='radio' id='prefToOptOutRecomPropSearchContact_ViewContact_" + R + "' name='radio'/></span>I would like to opt out of recommendations (if you clear your cookies you will have to opt-out again)</li></ul></div><div class='wigBottomBtn'><a href='javascript:captureUserRecomPrefDWRContact(\"_ViewContact_" + R + "\");'>Save</a></div></div><div class='wigContent wigFor' id='propSearchContactContactSuccessDiv_ViewContact_" + R + "'></div><div class='wigContent wigForm'  id='propSearchContactContactForm_ViewContact_" + R + "'></div><div id='propSearchContactRecomWrapper_ViewContact_" + R + "' ><ul id='propSearchContactRecomSlider_ViewContact_" + R + "' ></ul></div></div></div></div></div>";
                                    if (document.getElementById("projRecomGDESDiv#" + R)) {
                                        document.getElementById("projRecomGDESDiv#" + R).innerHTML = "";
                                        document.getElementById("projRecomGDESDiv#" + R).style.display = "none"
                                    }
                                    if (document.getElementById("projRecomViewContactDiv#" + R)) {
                                        document.getElementById("projRecomViewContactDiv#" + R).style.display = "block";
                                        document.getElementById("projRecomViewContactDiv#" + R).innerHTML = Z
                                    }
                                }
                            } else {
                                if (O === "agentSearchResultPage" && N === "gdes") {
                                    map = createStringIntoMap(b, ";", ":");
                                    var c = map.contactID;
                                    $("#internContactFormUppderDivGDES" + c).hide();
                                    displayAdvDetailsSMSVerification(c, "Agent")
                                } else {
                                    if (O === "viewSearchResultPage" && N === "searchNow") {
                                        map = createStringIntoMap(b, ";", ":");
                                        var c = map.contactID;
                                        if ($("#internContactFormIncludeUppderDiv" + c)) {
                                            $("#internContactFormIncludeUppderDiv" + c).hide()
                                        }
                                        document.getElementById("thankDiv" + c).style.display = "block"
                                    } else {
                                        if (O === "viewSearchResultPage" && N === "searchNow") {
                                            map = createStringIntoMap(b, ";", ":");
                                            var c = map.contactID;
                                            if ($("#internContactFormIncludeUppderDiv" + c)) {
                                                $("#internContactFormIncludeUppderDiv" + c).hide()
                                            }
                                            document.getElementById("thankDiv" + c).style.display = "block"
                                        } else {
                                            if (O === "userProfileListingResultPage" && N === "userProfileNow") {
                                                map = createStringIntoMap(b, ";", ":");
                                                var c = map.contactID;
                                                document.getElementById("userIsNotVerified").value = "userIsVerified";
                                                if ($("#userProfileListingIncludeUppderDiv" + c)) {
                                                    $("#userProfileListingIncludeUppderDiv" + c).hide()
                                                }
                                                if (document.getElementById("agentDetailBlockId")) {
                                                    document.getElementById("agentDetailBlockId").style.display = "block"
                                                }
                                                if (document.getElementById("dd1")) {
                                                    document.getElementById("dd1").style.display = "block"
                                                }
                                            } else {
                                                if (O === "sendContactDetailsResultPage" && N === "sendContactNow") {
                                                    map = createStringIntoMap(b, ";", ":");
                                                    var c = map.contactID;
                                                    if ($("#userProfileListingIncludeUppderDiv" + c)) {
                                                        $("#userProfileListingIncludeUppderDiv" + c).hide()
                                                    }
                                                    if (document.getElementById("thankDivCD#" + c)) {
                                                        document.getElementById("thankDivCD#" + c).style.display = "block"
                                                    }
                                                    if (document.getElementById("dd1")) {
                                                        document.getElementById("dd1").style.display = "block"
                                                    }
                                                } else {
                                                    if (O === "projectAlertlandingPage" && N === "contactNow") {
                                                        map = createStringIntoMap(b, ";", ":");
                                                        var c = map.contactID;
                                                        $("#internContactFormUppderDiv" + c).hide();
                                                        showdetails(c)
                                                    } else {
                                                        if (O === "projectAlertLandingPage" && N === "getContactDetail") {
                                                            map = createStringIntoMap(b, ";", ":");
                                                            var R = map.contactID;
                                                            var O = map.source;
                                                            $("#internContactFormUppderDivGDES" + R).hide();
                                                            if (document.getElementById("thankDivCD#" + R)) {
                                                                document.getElementById("thankDivCD#" + R).style.display = "block"
                                                            }
                                                            showdatavalue(R);
                                                            createCookie("GDES", "N", 2);
                                                            var J = "<div id='recomLoader_GDES_" + R + "' style='text-align:center;'><img align='middle' src='" + imgPath + "smallLoader.gif' alt='' />Loading Properties You May Like...</div><div id='displayRecommendations_GDES_" + R + "' style='display:none; background:#ebebeb; padding:16px 0px 4px; *padding-bottom:16px;'><div id='agentDetailRecomWidget'><div id='wigPropertySearchResult_GDES_" + R + "'><div class='wigInnerWrapper'><div class='wigHeadingNbutton'><div class='wigHeading' id='propSearchContactWigHeading_GDES_" + R + "'>Property you May Like</div><div class='wigNumberingNButton'><div class='wigButton'><a href='javascript:showHelpContentDWRContact(\"_GDES_" + R + "\")' class='wigHelpBtn' id='wigHelpBtnPropSearchContact_GDES_" + R + "'>Help</a><a href='javascript:closeRecomOnPageDWRContact(\"_GDES_" + R + "\")' class='wigCloseBtn' id='wigCloseBtnPropSearchContact_GDES_" + R + "'>Close</a></div></div><div class='clear'></div></div><div class='wigContent helpContent' id='propSearchContactHelpContent_GDES_" + R + "'><a class='wigBackLinkCust' href='javascript:resumeRecomDisplayDWRContact(\"_GDES_" + R + "\")'>BACK</a><div class='wigHelp'><ul><li><span><input type='radio' id='prefToSeeRecomPropSearchContact_GDES_" + R + "' name='radio' checked /></span>I would like to see recommendations from magicbricks.com.</li><li><span><input type='radio' id='prefToOptOutRecomPropSearchContact_GDES_" + R + "' name='radio'/></span>I would like to opt out of recommendations (if you clear your cookies you will have to opt-out again)</li></ul></div><div class='wigBottomBtn'><a href='javascript:captureUserRecomPrefDWRContact(\"_GDES_" + R + "\");'>Save</a></div></div><div class='wigContent wigFor' id='propSearchContactContactSuccessDiv_GDES_" + R + "'></div><div class='wigContent wigForm'  id='propSearchContactContactForm_GDES_" + R + "'></div><div id='propSearchContactRecomWrapper_GDES_" + R + "' ><ul id='propSearchContactRecomSlider_GDES_" + R + "' ></ul></div></div></div></div></div>";
                                                            if (document.getElementById("projRecomViewContactDiv#" + R)) {
                                                                document.getElementById("projRecomViewContactDiv#" + R).innerHTML = "";
                                                                document.getElementById("projRecomViewContactDiv#" + R).style.display = "none"
                                                            }
                                                            if (document.getElementById("projRecomGDESDiv#" + R)) {
                                                                document.getElementById("projRecomGDESDiv#" + R).style.display = "block";
                                                                document.getElementById("projRecomGDESDiv#" + R).innerHTML = J
                                                            }
                                                            generateRecomHtml("propSearchContactRecomSlider", "recomLoader", R, "_GDES_");
                                                            displayAdvDetails(R, O);
                                                            showdetails(R)
                                                        } else {
                                                            if (O === "alertLandingPage" && N === "contactAdvertiser") {
                                                                $("#mailerAlertUnverifiedUser").hide();
                                                                if (alertcontactFlag != "true") {
                                                                    showthanksDiv();
                                                                    if ($("#showcommentLinks").length > 0) {
                                                                        $("#showcommentLinks").show()
                                                                    }
                                                                }
                                                                singalOrMultiple();
                                                                pixelfb()
                                                            } else {
                                                                if (O === "dmsRecommendationContactForm" && N === "projectContact") {
                                                                    if ($("#mobileNumberText")) {
                                                                        var K = $("#mobileNumberText").text();
                                                                        ajaxService.decodeKeyword(K, {
                                                                            callback: function(q) {
                                                                                K = q;
                                                                                $("#mobileNumberText").text(K)
                                                                            },
                                                                            async: false
                                                                        })
                                                                    }
                                                                    $("#unverifiedMobileNumber").hide();
                                                                    $("#successPage").show()
                                                                } else {
                                                                    if (O === "alertLandingPageNew" && N === "contactAdvertiserNew") {
                                                                        $("#mailerAlertUnverifiedUser").hide();
                                                                        if (alertcontactFlag != "true") {
                                                                            showthanksDiv();
                                                                            if ($("#showcommentLinks").length > 0) {
                                                                                $("#showcommentLinks").show()
                                                                            }
                                                                            $(".mailerAlertLeftPanel").show()
                                                                        }
                                                                        singalOrMultiple();
                                                                        pixelfb()
                                                                    } else {
                                                                        if (O === "projectSearchResultPageNewPage" && N === "contactAdvertiserNewPage") {
                                                                            contactStripMain();
                                                                            Step = "SeeAdvertiserDetails";
                                                                            var l = 0;
                                                                            $("input:checkbox[name=selectAll]").each(function() {
                                                                                if ($(this).is(":checked")) {
                                                                                    l = l + parseInt("1")
                                                                                }
                                                                            });
                                                                            var m = document.getElementById("newPage");
                                                                            var B = null;
                                                                            if (m) {
                                                                                $("#shareYourDetailsTab").hide();
                                                                                B = "found"
                                                                            }
                                                                            gaTrackEventFunction(PAGE, saleOrRent, city, l, Step, "", B)
                                                                        } else {
                                                                            if (O === "alertSaveForm" && N === "alertSaveFormBtn") {
                                                                                $("#unverifiedSuccess").hide();
                                                                                $("#alertEmailSuccessContainer").show()
                                                                            } else {
                                                                                if (O === "projectSearchResultPageNew" && N === "contactAdvertiserNew") {
                                                                                    var M = $("#source").val();
                                                                                    $("#internContactFormUppderDiv").hide();
                                                                                    $("#contactSuccessPage").show();
                                                                                    if (_gaq) {
                                                                                        if (M) {
                                                                                            _gaq.push(["_trackEvent", "project-details-send-email-sms-OTP-success.html"])
                                                                                        } else {
                                                                                            _gaq.push(["_trackEvent", "project-search-send-contact-details-OTP-success.html"])
                                                                                        }
                                                                                    }
                                                                                    populateOtherRecords();
                                                                                    pixelfb()
                                                                                } else {
                                                                                    if (O === "userProfileMeterdata" && N === "userProfileMeterdata") {
                                                                                        map = createStringIntoMap(b, ";", ":");
                                                                                        var R = map.contactID;
                                                                                        var F = readCookie("userType");
                                                                                        var A = readCookie("userMobile");
                                                                                        var S = readCookie("userEmail");
                                                                                        var n = readCookie("userMobileCountry");
                                                                                        var P = readCookie("verificationFlag");
                                                                                        var d = readCookie("userName");
                                                                                        $("#unverifiedSuccessScreenShow").hide();
                                                                                        $("#unverifiedSuccessScreenShow").html("");
                                                                                        showQuestionTagSearchSide(R, F, A, S, "firstTime", "");
                                                                                        var h = $("#contactIdsearchScoresourceSide").val();
                                                                                        drawTimer(parseInt(h));
                                                                                        if (_gaq) {
                                                                                            _gaq.push(["_trackEvent", "OTP", "Answered", "Verified"])
                                                                                        }
                                                                                    } else {
                                                                                        if (O === "buyerdashboardContact" && N === "buyerdashboardContactValue") {
                                                                                            if ($("#unverifiedSuccessScreen")) {
                                                                                                $("#unverifiedSuccessScreen").hide()
                                                                                            }
                                                                                            if ($("#unverifiedSuccessScreenShow")) {
                                                                                                $("#unverifiedSuccessScreenShow").hide()
                                                                                            }
                                                                                            if ($("#unverifiedAddSuccessScreenShow")) {
                                                                                                $("#unverifiedAddSuccessScreenShow").hide()
                                                                                            }
                                                                                            if ($("#showSuccessScreen")) {
                                                                                                $("#showSuccessScreen").show()
                                                                                            }
                                                                                            if ($("#showAddSuccessScreen")) {
                                                                                                $("#showAddSuccessScreen").show()
                                                                                            }
                                                                                            var o = "/bricks/";
                                                                                            var c = $("#idDataForm").val();
                                                                                            var E = $("#cityCodeData").val();
                                                                                            var L = $("#userEmailData").val();
                                                                                            var j = o + "ajax/loginuserOnDashBoard?id=" + c + "&cityCodeData=" + E + "&userEmailData=" + L;
                                                                                            $.ajax({
                                                                                                dataType: "json",
                                                                                                type: "get",
                                                                                                url: j,
                                                                                                cache: false,
                                                                                                async: true,
                                                                                                success: function(q) {}
                                                                                            })
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function createStringIntoMap(D, B, H) {
    var F = new Object();
    if (D) {
        if (D.indexOf(B)) {
            var A = D.split(B);
            var G = A.length;
            for (var E = 0; E < G; E++) {
                var C = A[E].split(H);
                if (C) {
                    F[C[0]] = C[1]
                }
            }
            return F
        } else {
            var C = D.split(":");
            if (C) {
                F[C[0]] = C[1]
            }
            return F
        }
    } else {
        return null
    }
}

function verifyingMobileNumberSMS(D, B, A) {
    try {
        ajaxService.verifyingMobileNumber(D, A, {
            callback: function(E) {
                if (E) {
                    $("#smsCodeSent").html("Mobile verification code re-sent.")
                }
            },
            async: false
        })
    } catch (C) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("commonutil", "verifyingMobileNumberSMS", C)
        }
    }
}
var verifiedOnCall = false;

function verifyingMobileNumberCall(H, D, F, C, A) {
    var G = createStringIntoMap(A, ";", ":");
    var B = G.id;
    try {
        ajaxService.verifyingMobileNumberOnCall(H, B, {
            callback: function(I) {
                verifiedOnCall = true;
                if (I) {}
            },
            async: true
        })
    } catch (E) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("commonutil", "verifyingMobileNumberCall", E)
        }
    }
}

function unVeriFiedText() {
    $("#smsCodeSentUnverifedDiv").html('<span class="iconWrongNo"></span>Your number is not yet verified')
}

function checkMobileNumberFunction(C) {
    var A = false;
    try {
        ajaxService.checkMobileNumber(C, {
            callback: function(D) {
                if (D === "checked") {
                    A = true
                } else {
                    A = false
                }
            },
            async: false
        })
    } catch (B) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("commonutil", "checkMobileNumberFunction", B)
        }
    }
    return A
}

function verifyingMobileNumber(K, J, I, A, E, F) {
    if (verifiedOnCall && _gaq) {
        _gaq.push(["_trackEvent", "called-verify-mobile-number-after-otp-on-call", "called-verify-mobile-number-after-otp-on-call"]);
        verifiedOnCall = false
    }
    var D = $("#smsNo").val();
    $("#toCall").val("false");
    var H = false;
    var G = readCookie("userName");
    var B = readCookie("userEmail");
    if (D) {
        try {
            ajaxService.verifyingMobileNumberContact(K, D, G, B, {
                callback: function(N) {
                    if (N) {
                        $("#smsVerifiedMes_" + J).html('<div class="smsVerified"><span></span>Mobile number verified</div>');
                        H = true;
                        createCookie("verificationFlag", "Y", 2);
                        createCookie("otpFlage", "Y", -1);
                        createCookie("userMobile#" + K, "Y", 200);
                        var R = readCookie("rgrg");
                        var Q = readCookie("isLoginFound");
                        var M = readCookie("trackCookieType");
                        try {
                            if (Q && M && M == "I") {
                                var O = readCookie("userName");
                                $("#navUserName").html("Hello, " + O + '<span class="fo_14px font-type-4 c_black">My Activity</span>');
                                $("#userLoggedInLi").show();
                                $("#signOutOptionCode").show();
                                $("#userLoggedOffLi").hide()
                            }
                            eraseCookie("trackCookieType");
                            if (_gaq) {
                                if ($("#propertyViewPhoneDiv" + J).length > 0) {
                                    if (parent.document.getElementById("agentBtn" + J) != null || parent.document.getElementById("agentBtnqqq" + J) != null) {
                                        _gaq.push(["_trackPageview", "/property-details-send-email-sms-OTP-success.html"])
                                    } else {
                                        _gaq.push(["_trackPageview", "/property-search-send-email-sms-OTP-success.html"])
                                    }
                                } else {
                                    if ($("#propertyContactFormDiv" + J).length > 0) {
                                        if (parent.document.getElementById("agentBtn" + J) || parent.document.getElementById("agentBtnqqq" + J)) {
                                            _gaq.push(["_trackPageview", "/property-details-send-contact-details-OTP-success.html"])
                                        } else {
                                            _gaq.push(["_trackPageview", "/property-search-send-contact-details-OTP-success.html"])
                                        }
                                    }
                                }
                            }
                        } catch (L) {}
                        var P = readCookie("rgrg");
                        try {
                            if (P && P === "y") {
                                if ($("#mydiv").length > 0) {
                                    $("#contactGlobalAlert").fadeIn();
                                    $("#contactGlobalAlert", parent.document).fadeIn();
                                    setTimeout(function() {
                                        $("#contactGlobalAlert").fadeOut();
                                        $("#contactGlobalAlert", parent.document).fadeOut()
                                    }, 10000)
                                } else {
                                    $("#contactGlobalAlert", parent.document).fadeIn();
                                    setTimeout(function() {
                                        $("#contactGlobalAlert", parent.document).fadeOut()
                                    }, 10000)
                                }
                                eraseCookie("rgrg")
                            }
                            if ($("#downloadReportForm")) {
                                $("#downloadReportForm").submit()
                            }
                        } catch (L) {}
                        onClickSkipAction(K, I, A, E, F);
                        return true
                    } else {
                        $("#smsVerifiedMes_" + J).html('<div class="smsVerifiedErr"><span></span>Please enter the correct code</div>');
                        $("#smsNo").val("");
                        return false
                    }
                },
                async: false
            })
        } catch (C) {
            if (!(typeof window.errorHandler === "undefined")) {
                errorHandler("commonutil", "verifyingMobileNumber", C)
            }
            return false
        }
    } else {
        $("#smsVerifiedMes_" + J).html('<div class="smsVerifiedErr"><span></span>Please enter the code</div>');
        $("#smsNo").val("");
        return false
    }
    return H
}

function intrestedSelect_customCheckBox(B) {
    var A = $(B).attr("checked");
    var D = $(B).parents("#intrestedSelectWrap .pIntrestedcolumn").find("input:checkbox:checked").length - 1;
    var C = $(B).parents("#intrestedSelectWrap .pIntrestedcolumn").find("input:checkbox:checked:first").attr("rel");
    $(B).each(function() {
        A = $(this).attr("checked");
        if ($(this).is(":checked")) {
            $(this).parent().addClass("checked")
        } else {
            $(this).parent().removeClass("checked")
        }
    });
    if (C == undefined) {
        $("#pIntrestedTypeVal").css("display", "none");
        $("#pIntrestedTypeDefault").css("display", "inline")
    } else {
        $("#pIntrestedTypeVal").css("display", "inline");
        $("#pIntrestedTypeDefault").css("display", "none")
    }
    if (D > 0) {
        $("#pIntrestedTypeCount").css("display", "inline");
        $("#pIntrestedTypeCount").addClass("moreProperty")
    } else {
        $("#pIntrestedTypeCount").css("display", "none");
        $("#pIntrestedTypeCount").removeClass("moreProperty")
    }
    $("#pIntrestedTypeVal").text(C);
    $("#pIntrestedTypeCount").text("+" + D)
}

function customSelectAreab2c(C, D, B) {
    var F = $(C).index();
    var A = $(C).text();
    var E = 0;
    $(C).prevAll().each(function() {
        if ($(this).hasClass("optGroup")) {
            E = E + 1
        }
    });
    F = F - E;
    $(C).parents("." + B).find("input[type=button]").val(A);
    $("#" + D).find("option").removeAttr("selected");
    $("#" + D).find("option").eq(F).attr("selected", "selected");
    $("#" + D).trigger("change");
    $(C).parents("." + B).find("ul").parent().css("display", "none")
}

function getCustomAreaOptionsCovered(D, C, F, B) {
    var A = "";
    $(C).parents(F).find("ul").html("");
    var E = $(C).parents(F).find("select").html();
    $(C).parents(F).find("select").find("optgroup").each(function() {
        var H = $(this).val();
        var G = $(this).text();
        A += "<li class='addHead' value=" + H + ">" + G + "</li>"
    });
    $(C).parents(F).find("select").find("option").each(function() {
        var H = $(this).val();
        var G = $(this).text();
        A += "<li onclick=\"customSelectArea(this, '" + B + "', 'formCom')\" value=" + H + ">" + G + "</li>"
    });
    A = E;
    $(".unitBlockAreaDropDown").hide();
    $(C).parents(F).find("ul").html(A);
    $(C).parents(F).find("ul").parent().css("display", "block")
}
$("html").click(function(A) {
    if ($(A.target).is("#convertArea")) {} else {}
});

function customSelectArea(C, D, B) {
    var E = $(C).index();
    var A = $(C).text();
    $(C).parents("." + B).find("input[type=button]").val(A);
    $("#" + D).find("option").removeAttr("selected");
    $("#" + D).find("option").each(function() {
        if ($(this).text() == A) {
            $(this).attr("selected", "selected")
        }
    });
    isTrackingOn = true;
    $("#" + D).focusout();
    $("#" + D).trigger("change");
    $(C).parents("." + B).find("ul").parent().css("display", "none")
}

function getCustomAreaOptionsCoveredb2c(D, C, E, B) {
    var A = "";
    var F = "";
    $(C).parents(E).find("ul").html("");
    $(C).parents(E).find("select").children().each(function() {
        if (this.tagName == "OPTGROUP") {
            F = this.label;
            A += "<li class='optGroup'>" + this.label + "</li>"
        } else {
            var H = $(this).val();
            var G = $(this).text();
            A += "<li onclick=\"customSelectAreab2c(this, '" + B + "', 'formCom'),saveSelectedGroupVal('" + F + "')\" value=" + H + ">" + G + "</li>"
        }
    });
    $(".unitBlockAreaDropDown").hide();
    if ($(C).parents(E).find("ul").html() == " " || $(C).parents(E).find("ul").html() == "") {
        $(C).parents(E).find("ul").html(A)
    }
    $(C).parents(E).find("ul").parent().css("display", "block")
}
$("html").click(function(A) {
    if ($(A.target).is("#convertArea")) {} else {
        $(".unitBlockAreaDropDownHelp").hide()
    }
});

function bothSideTrimB(A) {
    try {
        return A.replace(/^\s+|\s+$/gm, "")
    } catch (B) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("seoHelper", "bothSideTrim", B)
        }
    }
}

function replaceValueInGaqCookie(P, E, M, D, N) {
    try {
        if (typeof E !== "undefined" && E != null) {
            E = bothSideTrimB(E);
            E = E.replace("&amp;", "and");
            E = E.replace(";", "");
            E = E.replace("=", "")
        }
        if (E == "undefined" || E == "null" || E == null || typeof E == "undefined") {
            E = ""
        }
        if (E != null && E.indexOf(">") > -1) {
            var I = E.split(">");
            var L = I.length;
            E = I[L - 1]
        }
        if (E != null) {
            E = bothSideTrimB(E)
        }
        var H = "";
        var C = readCookieVal(M);
        if (C != null) {
            var O = "";
            var B = C.split(D);
            for (var G = 0; G < B.length; G++) {
                var F = B[G].split("=");
                if (P == F[0]) {
                    if (N == "Y") {
                        var J = parseInt(F[1]) + 1;
                        var A = J.toString();
                        H = A;
                        if (O == "") {
                            O = P + "=" + A
                        } else {
                            O = O + D + P + "=" + A
                        }
                    } else {
                        if (O == "") {
                            O = P + "=" + E
                        } else {
                            O = O + D + P + "=" + E
                        }
                        H = E
                    }
                } else {
                    if (O == "") {
                        O = F[0] + "=" + F[1]
                    } else {
                        O = O + D + F[0] + "=" + F[1]
                    }
                }
            }
            createCookieExpiresInTimeInDays(M, O, 200)
        }
        return H
    } catch (K) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("seoHelper", "bothSideTrim", K)
        }
    }
}

function verifyingMobileNumberAsync() {
    var E = "auto";
    var C = readCookie("userName");
    var A = readCookie("userEmail");
    var D = readCookie("userMobile");
    if (D) {
        try {
            ajaxService.verifyingMobileNumberContact(D, E, C, A, {
                callback: function(F) {},
                async: true
            })
        } catch (B) {
            if (!(typeof window.errorHandler === "undefined")) {
                errorHandler("commonutil", "verifyingMobileNumberAsync", B)
            }
        }
    }
}

function verifyingMobileNumberNotAsync() {
    var E = "auto";
    var C = readCookie("userName");
    var A = readCookie("userEmail");
    var D = readCookie("userMobile");
    if (D) {
        try {
            ajaxService.verifyingMobileNumberContact(D, E, C, A, {
                callback: function(F) {},
                async: false
            })
        } catch (B) {
            if (!(typeof window.errorHandler === "undefined")) {
                errorHandler("commonutil", "verifyingMobileNumberNotAsync", B)
            }
        }
    }
}
$(function() {
    $(window).scroll(function() {
        if ($(window).scrollTop() > 155) {
            $(".newPostedProp").addClass("fixNewPostedProp")
        } else {
            $(".newPostedProp").removeClass("fixNewPostedProp")
        }
    });
    $(".showMore").click(function() {
        if (typeof stopPage != "undefined") {
            stopPage = true
        }
        $(this).parents(".desDetail").find(".fullDetail").show();
        $(this).hide()
    });
    $(".hideMore").click(function() {
        if (typeof stopPage != "undefined") {
            stopPage = true
        }
        $(this).parents(".desDetail").find(".fullDetail").hide();
        $(this).parents(".desDetail").find(".showMore").hide()
    })
});

function decodeMobileNumber(L, K, A, F, I) {
    map = createStringIntoMap(I, ";", ":");
    var H = map.contactID;
    var C = map.val;
    if (C) {
        if (C == "a") {
            var J = $("#firstDivRecord").html();
            ajaxService.decodeKeyword(J, {
                callback: function(M) {
                    $("#firstDivRecord").html(M)
                },
                async: false
            })
        }
    } else {
        if (H) {
            if ($("#advMobileId" + H)) {
                advMobileId = $("#advMobileId" + H).val();
                ajaxService.decodeKeywords(advMobileId, {
                    callback: function(M) {
                        advMobileId = M
                    },
                    async: false
                })
            }
            var G = $("#selectCountry_mobile_" + H).val();
            var E = "";
            if ($("#ubicntId" + H)) {
                E = $("#ubicntId" + H).val()
            }
            var B = "";
            if ($("#isdCodeId" + H)) {
                B = $("#isdCodeId" + H).val()
            }
            if (G && E) {
                if (G != E) {
                    if ($("#mobileDivP" + H) && B) {
                        $("#mobileDivP" + H).html("<strong>" + B + "-" + advMobileId + "</strong>")
                    }
                    if ($("#mobileDivPUP" + H) && B) {
                        $("#mobileDivPUP" + H).html("<strong>" + B + "-" + advMobileId + "</strong>")
                    }
                } else {
                    while (advMobileId.indexOf("+91-") != -1) {
                        advMobileId = advMobileId.replace("+91-", "")
                    }
                    if ($("#mobileDivP" + H) && B) {
                        $("#mobileDivP" + H).html("<strong>" + advMobileId + "</strong>")
                    }
                    if ($("#mobileDivPUP" + H) && B) {
                        $("#mobileDivPUP" + H).html("<strong>" + advMobileId + "</strong>")
                    }
                }
            }
            if ($("#svmobileDivP" + H)) {
                $("#svmobileDivP" + H).html("Ph. <span>" + advMobileId + "</span>");
                $("#svmobileDivP" + H).show();
                $("div.propertySRPSimProp .siteVisitSection").hide()
            }
            var D = document.getElementById("maskingNoinContact" + H);
            if (D != null) {
                decodemaskmobilenumber(advMobileId, H)
            }
        }
    }
}

function hideGlobalCont() {
    if ($("#mydiv").length > 0) {
        $("#contactGlobalAlert").fadeIn();
        setTimeout(function() {
            $("#contactGlobalAlert").fadeOut()
        }, 10000)
    } else {
        $("#contactGlobalAlert", parent.document).fadeIn();
        setTimeout(function() {
            $("#contactGlobalAlert", parent.document).fadeOut()
        }, 10000)
    }
    eraseCookie("rgrg")
}
$(".contactGlobalAlert a").click(function() {
    $("#contactGlobalAlert").fadeOut()
});

function limitCheckAlert() {
    var B = "";
    B = "<style>.popContainer{height: 235px; left: 50%; margin-left: -280px; margin-top: -118px; position: fixed; top: 50%; width: 560px; z-index: 9999; }.blueWrap{background-color: #6b86cb; color:#fff;}  .overlay{z-index:8888;position:fixed; top:0; bottom:0px; left:0; right:0; opacity: 0.8; background-color: #000000;}  .phone-ico{background:url(../images/ctcReach.png) no-repeat -1px -176px; width:55px; height:55px; text-align:center; text-indent:-999px; overflow:hidden; display:inline-block;}  .strong{font-family:opensans-bold; font-weight:normal;}      .pupWrap .closeIcon{position:absolute; width:20px; height:20px; background:url(../images/ctcReach.png) no-repeat -130px -99px; right:-26px; top:0px; cursor:pointer;}  .pupWrap .phoneIcon{text-align:center; padding:30px 0 10px 0; margin:0px;}  .pupWrap .mbpopUp{background-color:#fff; text-align:center;}  .pupWrap .centerText{text-align:center; font-family:open_sansregular; font-size:18px; line-height:28px; margin:0; padding:0 0 8px;}  .pupWrap .gplayD-icon{background:url(../images/ctcReach.png) no-repeat 0 0; width: 155px; height:45px;  text-align:center; text-indent:-999px; overflow:hidden; display:inline-block;}    .pupWrap .appstore-icon{background:url(../images/ctcReach.png) no-repeat 0 -49px; width: 155px; height:45px;  text-align:center; text-indent:-999px; overflow:hidden; display:inline-block;}  .pupWrap .imgBlock{padding:16px 0 15px;}  .pupWrap .margLeft10{margin-right:30px;}    .ppWrapMob .closeIcon{position:absolute; width:15px; height:15px; background:url(../images/ctcReach.png) no-repeat -131px -127px; right:10px; top:10px; cursor:pointer;}  .ppWrapMob .phoneIcon{text-align:center; padding:20px 0 7px 0; margin:0px;}    .ppWrapMob .mbpopUp{width:290px; margin:0 auto; position:relative; background-color:#fff; text-align:center;}  .ppWrapMob .centerText{text-align:center; font-family:open_sansregular; font-size:13px; line-height:21px; margin:0; padding:0 0 8px;}    /*for andriod*/  .ppWrapMob .gplayM-icon{background:url(../images/ctcReach.png) no-repeat 0 -97px; width: 123px; height:36px; text-align:center; text-indent:-999px; overflow:hidden; display:inline-block;}    /*for ios*/  .ppWrapMob .appstoreM-icon{background:url(../images/ctcReach.png) no-repeat 0 -137px; width: 123px; height:36px; text-align:center; text-indent:-999px; overflow:hidden; display:inline-block;}    .ppWrapMob .imgBlock{padding:10px 0;}";
    B = B + ".popContainer.limitExceedInside{height: 235px; left: 50%; margin-left: -280px; margin-top: -215px; position: fixed; top: 50%; width: 560px; z-index: 9999; }.limitExceedInside .blueWrap{background-color: #6b86cb; color:#fff;}  .overlay.limitExceedInside{z-index:8888;position:fixed; top:0; bottom:0px; left:0; right:0; opacity: 0.8; background-color: #000000; display: none;}</style>";
    B = B + '<div class="overlay"></div>';
    B = B + '<div class="pupWrap popContainer">';
    B = B + '<div class="mbpopUp">';
    B = B + '<div class="blueWrap">';
    B = B + '<span class="closeIcon"></span>';
    B = B + '<div class="phoneIcon"><span class="phone-ico">Phone</span></div>';
    B = B + '<div class="centerText">';
    B = B + 'Your <span class="strong">Contact Limit is Over</span>! <span class="strong">Worry Not</span>! You can <br /> ';
    B = B + 'still <span class="strong">contact more</span> Simply <span class="strong">Download the App</span>';
    B = B + "</div>";
    B = B + "</div>";
    B = B + '<div class="imgBlock"><a class="margLeft10" target="_blank" href="http://ad.apsalar.com/api/v1/ad?re=0&a=timesinternet&i=com.timesgroup.magicbricks&ca=MB_Android&an=Contact+Limit+Reached&p=Android&pl=WAP&h=3a52e56732d312bf9708116d07cb38a119b9639c" onclick="onPopAppDownloadLinkClick(\'Google_Play_Clicked\');"><span class="gplayD-icon">Google Play</span></a><a target="_blank" href="https://itunes.apple.com/in/app/magicbricks-property-search/id486328406?mt=8" onclick="onPopAppDownloadLinkClick(\'App_Store_Clicked\');"><span class="appstore-icon">App Store</span></a></div>';
    B = B + "</div>";
    B = B + '</div><script src="../scripts/popup.js"><\/script>';
    var A = (window.location != window.parent.location);
    if (A == true) {
        $(".popContainer").addClass("limitExceedInside");
        $(".overlay").addClass("limitExceedInside");
        $(".overlay").hide();
        $(".propContactGreyBox", parent.document).addClass("limitExcedded");
        $(".propContactGreyBox iframe", parent.document).addClass("limitExceddedIframe")
    }
    return B
}

function onPopAppDownloadLinkClick(A) {
    if (_gaq) {
        _gaq.push(["_trackEvent", "_trackAppDownloadLinkClick", A])
    }
}

function createCookieExpiresInTimeInDays(A, B, C) {
    BrowserStorage.set(A, B, C)
}

function readCookieVal(A) {
    return BrowserStorage.get(A)
}

function createAppDownloadUI(B, A, D) {
    var C = "/bricks/get-app-download-ui.html?data=" + B + "&data1=" + A + "&data2=" + D;
    $.ajax({
        url: C,
        type: "get",
        async: "false",
        success: function(E) {
            if (E != "" && E != null) {
                $("#" + A).html(E)
            }
        }
    })
}
var BrowserStorage = (function() {
    var B = (function() {
        try {
            return "localStorage" in window && window.localStorage !== null
        } catch (D) {
            return false
        }
    })();
    var A = function(E) {
        var G = E + "=";
        var D = document.cookie.split(";");
        for (var F = 0; F < D.length; F++) {
            var H = D[F];
            while (H.charAt(0) == " ") {
                H = H.substring(1, H.length)
            }
            if (H.indexOf(G) == 0) {
                return H.substring(G.length, H.length)
            }
        }
        return null
    };
    var C = function(E, F, G) {
        var D = (function() {
            if (G) {
                var H = new Date();
                H.setTime(H.getTime() + (G * 24 * 60 * 60 * 1000));
                return "; expires=" + H.toGMTString()
            } else {
                return ""
            }
        })();
        document.cookie = E + "=" + F + D + "; path=/"
    };
    return {
        set: function(D, E, F) {
            B ? localStorage.setItem(D, E) : C(D, E, F)
        },
        get: function(D) {
            return B ? localStorage.getItem(D) : A(D)
        },
        remove: function(D) {
            B ? localStorage.removeItem(D) : this.set(D, "", -1)
        }
    }
})();

function alertConfirmatioBox() {
    var A = confirm("Press a button!");
    return A
}

function pixelfb() {
    ! function(E, A, F, B, G, C, D) {
        if (E.fbq) {
            return
        }
        G = E.fbq = function() {
            G.callMethod ? G.callMethod.apply(G, arguments) : G.queue.push(arguments)
        };
        if (!E._fbq) {
            E._fbq = G
        }
        G.push = G;
        G.loaded = !0;
        G.version = "2.0";
        G.queue = [];
        C = A.createElement(F);
        C.async = !0;
        C.src = B;
        D = A.getElementsByTagName(F)[0];
        D.parentNode.insertBefore(C, D)
    }(window, document, "script", "//connect.facebook.net/en_US/fbevents.js");
    fbq("init", "172724306425159");
    fbq("track", "PageView");
    fbq("track", "Lead")
}
$(document).ready(function(B) {
    var A = true;
    $("body").on("mouseenter", ".dropContainer", function(F) {
        F.stopPropagation();
        A = false;
        $(".dropContainer").find(".dropDownBox").removeClass("activated active fadeInDown z1");
        var G = $(this);
        var D = G.attr("id");
        var E = "";
        clearTimeout(E);
        var E = setTimeout(function() {
            $(".dropContainer").find(".dropDownBox").removeClass("active fadeInDown z1");
            if (A == false) {
                G.closest(".dropContainer").find(".dropDownBox").addClass("active fadeInDown z1");
                if (D == "buyDrop" || D == "rentDrop") {
                    C(D)
                }
            }
        }, 300)
    });
    $("body").on("mouseleave", ".dropContainer", function(D) {
        D.stopPropagation();
        $(".dropContainer").find(".dropDownBox").removeClass("active fadeInDown z1");
        A = true
    });
    var C = function(D) {
        var F = "#" + D;
        console.log("id::" + F);
        if (!$(F).hasClass("swiperCreated")) {
            var E = new Swiper(F + " .swiper-container", {
                slidesPerView: 1,
                paginationClickable: true,
                spaceBetween: 0,
                initialSlide: 0,
                speed: 300,
                preventClicks: false,
                simulateTouch: true,
                nextButton: F + " .swiper-container .handle_control.next",
                prevButton: F + " .swiper-container .handle_control.prev"
            });
            $(F).addClass("swiperCreated")
        }
    };
    $("body").on("hover", ".dropContainer .form_element_group .cust_select_box select", function(D) {
        D.stopPropagation()
    });
    $("body").on("change", ".cust_select_box select", function() {
        if ($(this).attr("id") == "appMobileIsd10") {
            var D = $(this).children("option:selected").text().split("+");
            $(this).prev(".selected_value").text("+" + D[1]).addClass("chenged")
        } else {
            $(this).prev(".selected_value").text($(this).children("option:selected").text()).addClass("chenged")
        }
    });
    $("body").on("mouseenter", ".getApp", function(D) {
        $(".mobNumber input").focus()
    });
    $("body").on("mouseenter", ".getApp", function(D) {
        $(".mobNumber input").blur()
    });
    $(".menuLinkViewMore").on("click", function() {
        $(this).closest(".row").hide().prev("div").find(".hidden_menuLinks").addClass("show")
    });
    loadDisclaimerAndTrademark()
});

function loadDisclaimerAndTrademark() {
    $("p#disclaimer").html('<span class="disclamer_txt_color font-type-4">Disclaimer :</span> Magicbricks Realty Services Limited is only an intermediary offering its platform to facilitate the transactions between Seller and Customer/Buyer/User and is not and cannot be a party to or control in any manner any transactions between the Seller and the Customer/Buyer/User. Magicbricks Realty Services Limited shall neither be responsible nor liable to mediate or resolve any disputes or disagreements between the Customer/Buyer/User and the Seller and both Seller and Customer/Buyer/User shall settle all such disputes without involving Magicbricks Realty Services Limited in any manner.');
    $("div#trademark").html("All trademarks, logos and names are properties of their respective owners. All Rights Reserved. &#169; Copyright 2017 Magicbricks Realty Services Limited.")
}
var scrollTop = function(A) {
    $("html, body").animate({
        scrollTop: A
    }, 500)
};

function createAppDownloadGlobleNavigation(A) {
    var B = "/bricks/get-app-download-global-header.html";
    $.ajax({
        url: B,
        type: "get",
        async: "false",
        success: function(C) {
            if (C != "" && C != null) {
                $("#" + A).html(C)
            }
        }
    })
}

function createCookieFooterNew(D, E, B) {
    var A = "";
    if (B) {
        var C = new Date();
        C.setTime(C.getTime() + (B * 60 * 60 * 1000));
        A = "; expires=" + C.toGMTString()
    }
    document.cookie = D + "=" + E + A + "; domain=.magicbricks.com; path=/"
}

function createCookieNotification(D, E, B) {
    var A = "";
    if (B) {
        var C = new Date();
        C.setTime(C.getTime() + (B * 60 * 60 * 1000));
        A = "; expires=" + C.toGMTString()
    }
    document.cookie = D + "=" + E + A + "; path=/"
}

function readCookie(B) {
    var A = document.cookie.split(";");
    var D = B + "=";
    for (var C = 0; C < A.length; C++) {
        var E = A[C];
        while (E.charAt(0) == " ") {
            E = E.substring(1, E.length)
        }
        if (E.indexOf(D) == 0) {
            retVal = E.substring(D.length, E.length);
            if (B == "userTypeflSlider" && retVal.indexOf(",") > 0) {
                return retVal.substring(0, retVal.indexOf(","))
            } else {
                if (B == "userEmailflSlider") {
                    return retVal.replace(/^"(.*)"$/, "$1")
                } else {
                    if (B == "userNameflSlider") {
                        return retVal.replace(/^"(.\*)"$/, "$1")
                    } else {
                        return retVal
                    }
                }
            }
        }
    }
    return null
}

function closeslider() {
    createCookieFooterNew("flsliderPopup", "N", 24);
    $("#flslider").hide()
}

function actionTaken() {
    createCookieFooterNew("flsliderPopup", "N", 24);
    $("#flslider").hide()
}

function allowNotification() {
    $("#notification").hide();
    var D;
    var C = 0.45 * screen.width;
    var B = 0.45 * screen.height;
    var A = "toolbar=0,location=1,directories=0,status=1,menubar=0,scrollbars=1,resizable=0,top=0,left=0,width=552,height=452";
    D = window.open("https://jbmb.magicbricks.com/index.html?msg=" + secondScreenMsg, "_notify", A);
    D.focus();
    var E = setInterval(function() {
        var G = readCookie("webpush");
        if (G != null) {
            D.close();
            clearInterval(E);
            notCounter = readCookie("notificationCounter");
            if (G != null && notCounter != "") {
                try {
                    var F = ntrack.getRawDataObject();
                    F.trackingEvent = ntrack.trackingEvent.BrowserNotification;
                    F.Source = ntrack.Source.Web;
                    F.rid = G;
                    F.EventActivityType = ntrack.EventActivityType.Others;
                    ntrack.sendRamTrackEvent(F)
                } catch (H) {
                    console.log(H)
                }
            }
        }
    }, 5000);
    _gaq.push(["_trackEvent", "Click First Popup Allow_${allpagename}", category])
}

function remindMeLater() {
    $("#notification").hide();
    createCookieNotification("notificationFlag", "N", 0);
    _gaq.push(["_trackEvent", "Click First Popup Not Now_${allpagename}", category])
}

function closeNotification() {
    $("#notification").hide();
    createCookieNotification("notificationFlag", "N", 0);
    _gaq.push(["_trackEvent", "Click  First Popup  Close_${allpagename}", category])
}

function trackThisData() {
    _gaq.push(["_trackEvent", "New_Home_Text_UI", "start"])
}
var _weq = _weq || {};
_weq["webengage.licenseCode"] = "~2024c606";
_weq["webengage.widgetVersion"] = "4.0";
_weq["webengage.survey.width"] = 550;
$(function() {
    $(".latestUpdatesSlider").show();
    $("#keyword").on("click", function(B) {
        B.stopPropagation();
        var A = $(".localityKeywordParent:visible").size();
        var C = $(this).val().length;
        if (A <= 0) {
            $(".searchSuggestionsContainer").slideDown()
        }
    });
    $("#keyword").on("keyup", function() {
        var A = $(".localityKeywordParent:visible").size();
        var B = $(this).val().length;
        console.log(B);
        if (B >= 3) {
            $(".searchSuggestionsContainer").slideUp();
            $(".searchSuggestionsContainer").remove()
        }
    })
});

function urlLinkChange(A, B) {
    if (B == "newTab") {
        window.open(A, "_blank")
    } else {
        if (B == "sameTab") {
            window.location = A
        }
    }
}

function updateNavigationData() {
    $.ajax({
        dataType: "html",
        type: "get",
        url: buyerActivityCountUrl,
        cache: false,
        async: true,
        success: function(A) {
            var B = JSON.parse(A);
            if (B.contactData != 0) {
                $("#contactedProp").html(formatNavigationdata(B.contactData))
            } else {
                $("#contactedId").hide()
            }
            if (B.viewData != 0) {
                $("#viewedProp").html(formatNavigationdata(B.viewData))
            } else {
                $("#viewedId").hide()
            }
            if (B.searchData != 0) {
                $("#searchedProp").html(formatNavigationdata(B.searchData))
            } else {
                $("#searchedId").hide()
            }
            $("#propRecommanded").html(formatNavigationdata(B.recommandedData));
            $("#chatCounted").html(formatNavigationdata(B.chatData))
        }
    })
}

function formatNavigationdata(A) {
    if (A == 0 || A == "") {
        return
    }
    return "(" + A + ")"
}

function createCookieNotification(D, E, B) {
    var A = "";
    if (B) {
        var C = new Date();
        C.setTime(C.getTime() + (B * 60 * 60 * 1000));
        A = "; expires=" + C.toGMTString()
    }
    document.cookie = D + "=" + E + A + "; path=/"
}
if ((browserAgent.indexOf("Firefox") != -1) || (browserAgfent.indexOf("Chrome") != -1) || (browserAgfent.indexOf("Safari") != -1)) {
    if (messageType.indexOf("/property-for-sale/") != -1) {
        firstScreenMsg = "Be the first one to know about property deals on Magicbrick";
        secondScreenMsg = "Get Updates about latest Property deals by subscribing to our Notification";
        category = "Sale"
    } else {
        if (messageType.indexOf("/property-for-rent/") != -1) {
            firstScreenMsg = "Instantly get notified when an Owner posts a property";
            secondScreenMsg = "Get Updates about Fresh Owner property by subscribing to our Notification";
            category = "Rent"
        }
    }
    var webpush = readCookie("webpush");
    var notificationFlag = readCookie("notificationFlag");
    var mainwin;
    var intervalId = setInterval(function() {
        webpush = readCookie("webpush");
        var B = readCookie("webpushCookie");
        if (webpush != null && webpush != B) {
            webpush = readCookie("webpush");
            notificationFlag = readCookie("notificationFlag");
            clearInterval(intervalId);
            if (webpush != null) {
                try {
                    var A = ntrack.getRawDataObject();
                    A.trackingEvent = ntrack.trackingEvent.BrowserNotification;
                    A.Source = ntrack.Source.Web;
                    A.rid = webpush;
                    A.EventActivityType = ntrack.EventActivityType.Others;
                    ntrack.sendRamTrackEvent(A)
                } catch (C) {
                    console.log(C)
                }
            }
            createCookieNotification("webpushCookie", webpush, 0)
        }
    }, 5000);
    setTimeout(function() {
        if ((webpush == "" || webpush == null) && (notificationFlag == null || notificationFlag == "")) {
            var A = readCookie("notificationCounter");
            if (A == null || A == "") {
                A = 1;
                createCookieNotification("notificationCounter", A, 24);
                openNotification()
            } else {
                A = parseInt(A) + 1;
                if (parseInt(A) < 3) {
                    createCookieNotification("notificationCounter", A, 0);
                    openNotification()
                } else {
                    createCookieNotification("notificationFlag", "N", 0);
                    eraseCookie("notificationCounter")
                }
            }
        }
    }, 15000)
}

function openNotification() {
    var A = "<iframe id='notficationID' src='https://notification.magicbricks.com/a.html?pagename=${allpagename}&category=" + category + "' height='0' frameborder='0' width='0' scrolling='no' rel = 'noindex, nofollow'></iframe>";
    document.getElementById("notification").innerHTML = A
}

function currentYPosition() {
    var A = 0;
    if (self.pageYOffset) {
        A = self.pageYOffset
    }
    if (document.documentElement && document.documentElement.scrollTop) {
        A = document.documentElement.scrollTop
    }
    if (document.body.scrollTop) {
        A = document.body.scrollTop
    }
    return A
}

function googleAnalyticsLoad() {
    _gaq.push(["_setAccount", "UA-492553-2"]);
    _gaq.push(["_setDomainName", ".magicbricks.com"]);
    _gaq.push(["_addIgnoredOrganic", "magicbricks.com"]);
    _gaq.push(["_addIgnoredOrganic", "magicbricks"]);
    _gaq.push(["_addIgnoredOrganic", "magic brick"]);
    _gaq.push(["_addIgnoredOrganic", "magicbrick"]);
    _gaq.push(["_addIgnoredOrganic", "magic bricks"]);
    _gaq.push(["_addIgnoredOrganic", "http://www.magicbricks.com/"]);
    _gaq.push(["_addIgnoredOrganic", "www.magicbricks.com"]);
    _gaq.push(["_trackPageview"]);
    (function() {
        var B = document.createElement("script");
        B.type = "text/javascript";
        B.async = true;
        B.src = ("https:" == document.location.protocol ? "https://" : "http://") + "stats.g.doubleclick.net/dc.js";
        var A = document.getElementsByTagName("script")[0];
        A.parentNode.insertBefore(B, A)
    })()
}
var seachVersion = "A";
var sortPriceBy = "Lowest Price";
var sortSqftPriceBy = "Lowest Sqft Price";
var propSearchSlider;
var campCodeDwr = false;
var showRecomendation = true;
var notAlertLanding = true;
var propResultPager = null;
var invResultPager = null;
var sortBy = "premiumRecent";
var clusterBlock = new Array("cls_locality", "cls_propertyType", "cls_bedrooms", "cls_advertiser", "cls_category");
var currentSearchMap = null;
var isUserLoggedIn = false;
var SEARCH_TYPE_PAGE = "";
var radius = 0;
var globalAutoSuggestionVar1 = new Object();
var networkTrackCodeForContact = "http://ads.networkplay.in/track_lead/26/OPTIONAL_INFORMATION";
var ieversion = -1;
if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
    ieversion = new Number(RegExp.$1)
}

function readMBCookie(C) {
    var B = null;
    try {
        var F = C + "=";
        var A = document.cookie.split(";");
        for (var D = 0; D < A.length; D = D + 1) {
            var G = A[D];
            while (G.charAt(0) == " ") {
                G = G.substring(1, G.length)
            }
            if (G.indexOf(F) === 0) {
                B = G.substring(F.length, G.length)
            }
        }
    } catch (E) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("searchProperty", "readMBCookie", E)
        }
    }
    return B
}

function processPropertySearchResult(page, sortBy, flag) {
    try {
        pageNumberShowing = page;
        var totalPage = 0;
        if (document.getElementById("pageCount")) {
            totalPage = eval(document.getElementById("pageCount").innerHTML)
        }
        if (totalPage > 0) {
            if (totalPage > 1) {
                if (flag) {
                    var pageCount = eval(document.getElementById("pageCount").innerHTML);
                    propResultPager = new Paginator("propResultPager", "pagination", "", pageCount, populateSearchResultPageOptimized, "_gaq.push(['_trackPageview', '/bricks/propertySearch.html']);");
                    propResultPager.currentPage = page
                }
            }
            if (sortBy && (sortBy == "premiumRecent")) {
                $("#sort0").html($("#sort1").html())
            }
            if (sortBy && (sortBy == "postRecency")) {
                $("#sort0").html($("#sort4").html())
            }
            if (sortBy && (sortBy == "Individual")) {
                $("#sort0").html($("#sort5").html())
            } else {
                if (sortBy && (sortBy == "Lowest Sqft Price" || sortBy == "Highest Sqft Price")) {
                    if (sortBy == "Lowest Sqft Price") {
                        sortSqftPriceBy = "Highest Sqft Price";
                        $("#sort0").html($("#sort6").html())
                    } else {
                        sortSqftPriceBy = "Lowest Sqft Price";
                        $("#sort0").html($("#sort7").html())
                    }
                } else {
                    if (sortBy && (sortBy == "Lowest Price" || sortBy == "Highest Price")) {
                        if (sortBy == "Lowest Price") {
                            sortPriceBy = "Highest Price";
                            $("#sort0").html($("#sort2").html())
                        } else {
                            sortPriceBy = "Lowest Price";
                            $("#sort0").html($("#sort3").html())
                        }
                    }
                }
            }
            if (sortBy && (sortBy == "nearest")) {
                $("#sort0").html($("#sort8").html())
            }
            $("#sort8").css("display", $("#propertiesWithinBar").css("display"))
        }
    } catch (e) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("searchProperty", "processPropertySearchResult", e)
        }
    }
}

function populateSearchResultPageOptimized(A) {
    try {
        editSearchResults(getUrlStringToSearch(), A)
    } catch (B) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("searchProperty", "populateSearchResultPageOptimized", B)
        }
    }
}

function startPageScrollResultLoader() {
    try {
        var A = 0;
        if (document.getElementById("pageCount")) {
            A = document.getElementById("pageCount").innerHTML
        }
        if (currentYPosition() >= 1500) {
            $("#goTop").show()
        } else {
            $("#goTop").hide()
        }
        console.log(moreResultPage + " pageCount-" + A + " isRefineLoaded-" + isRefineLoaded + " fetching-" + fetching + " currentYPosition()-" + currentYPosition() + " bufferzone-" + bufferzone);
        if (moreResultPage < A - 1 && !fetching && (currentYPosition() >= bufferzone) && !(typeof isRefineLoaded === "undefined" || !isRefineLoaded)) {
            bufferzone = bufferzone + 2000;
            moreResultPage = moreResultPage + 1;
            lastPostFunc(moreUrlString);
            console.log("page-" + (pageNumberShowing + moreResultPage) + "    #groupstart-" + $("#groupstart").html() + " #offset -" + $("#offset").html() + " #maxOffset-" + $("#maxOffset").html());
            var B = document.getElementById("sortBy").innerHTML;
            if (moreResultPage == A - 1) {
                $("div#viewMoreButton").hide()
            }
        }
    } catch (C) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("searchProperty", "startPageScrollResultLoader", C)
        }
    }
}

function lastPostFunc(B) {
    try {
        fetching = true;
        $("#moreResult-loader").show();
        $("#groupSortData").remove();
        var A = "";
        if ($("#attractiveIds")) {
            A = "&groupstart=" + $("#groupstart").html() + "&offset=" + $("#offset").html() + "&maxOffset=" + $("#maxOffset").html() + "&attractiveIds=" + $("#attractiveIds").html()
        } else {
            A = "&groupstart=" + $("#groupstart").html() + "&offset=" + $("#offset").html() + "&maxOffset=" + $("#maxOffset").html()
        }
        ajaxService.getMoreSearchResult((pageNumberShowing + moreResultPage), document.getElementById("sortBy").innerHTML, searchPage, B + A, {
            callback: function(D) {
                if (Trim(D).length > 4) {
                    fetching = false;
                    $("div#moreResult").before(D);
                    $(function() {
                        $(".threeNhalfAdBannerSlider").anythingSlider({
                            buildStartStop: false,
                            buildNavigation: false,
                            infiniteSlides: false,
                            stopAtEnd: true,
                            hashTags: false
                        })
                    });
                    $("#moreResult-loader").hide();
                    propertyViewedShow(1);
                    contactedShow(1, "C");
                    contactedShow(1, "V");
                    $("#groupstart").html($("#groupstart_more").html());
                    $("#offset").html($("#offset_more").html());
                    $("#maxOffset").html($("#maxOffset_more").html());
                    ajax_track_comScore("Property_search_page_" + moreResultPage);
                    try {
                        $("img.lazy").lazyload()
                    } catch (E) {}
                } else {
                    fetching = true;
                    $("div#moreResult-loader").hide()
                }
            },
            async: true
        })
    } catch (C) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("searchProperty", "lastPostFunc", C)
        }
    }
}

function currentYPosition() {
    var A = 0;
    if (self.pageYOffset) {
        A = self.pageYOffset
    }
    if (document.documentElement && document.documentElement.scrollTop) {
        A = document.documentElement.scrollTop
    }
    if (document.body.scrollTop) {
        A = document.body.scrollTop
    }
    return A
}

function scrollWin() {
    $("body,html").animate({
        scrollTop: 0
    }, "fast")
}

function moreSearchhResult(B, D) {
    try {
        fetching = true;
        $("div#moreResult-loader").show();
        $("#groupSortData").remove();
        moreResultPage = moreResultPage + 1;
        var A = "";
        if ($("#attractiveIds")) {
            A = "&groupstart=" + $("#groupstart").html() + "&offset=" + $("#offset").html() + "&maxOffset=" + $("#maxOffset").html() + "&attractiveIds=" + $("#attractiveIds").html()
        } else {
            A = "&groupstart=" + $("#groupstart").html() + "&offset=" + $("#offset").html() + "&maxOffset=" + $("#maxOffset").html()
        }
        ajaxService.getMoreSearchResult((pageNumberShowing + moreResultPage), "premiumRecent", B, D + A, {
            callback: function(E) {
                if (Trim(E).length > 4) {
                    fetching = false;
                    if (D.indexOf("category=S") > -1) {
                        $("#comPropFor1Sale").before(E)
                    } else {
                        $("#comPropFor1Lease").before(E)
                    }
                    $("div#moreResult-loader").hide();
                    $("#groupstart").html($("#groupstart_more").html());
                    $("#offset").html($("#offset_more").html());
                    $("#maxOffset").html($("#maxOffset_more").html());
                    ajax_track_comScore("Property_search_page_" + moreResultPage);
                    try {
                        $("img.lazy").lazyload()
                    } catch (F) {}
                } else {
                    fetching = true;
                    $("div#moreResult-loader").hide()
                }
            },
            async: true
        })
    } catch (C) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("searchProperty", "moreSearchhResult", C)
        }
    }
}

function propertyCount(B, A) {
    try {
        propertycounter = B - 10;
        if (propertycounter <= 0) {
            if (A == "S") {
                $("div#showMoreSale").hide()
            }
        }
    } catch (C) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("searchProperty", "propertyCount", C)
        }
    }
}

function propertyCountRent(B, A) {
    try {
        propertycounterrent = B - 10;
        if (propertycounterrent <= 1) {
            if (A == "R") {
                $("div#showMoreRent").hide()
            }
        }
    } catch (C) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("searchProperty", "propertyCountRent", C)
        }
    }
}

function coachInputHighLgt() {
    try {
        $(".coachMarkLayer").fadeIn();
        $(".coachMarkSrp").fadeIn()
    } catch (A) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("searchProperty", "coachInputHighLgt", A)
        }
    }
}

function coachMarkHide() {
    try {
        $(".coachMarkLayer").fadeOut();
        $(".coachMarkSrp").fadeOut();
        $(".refineBudget").removeClass("budgetZindex");
        $(".refineBedroom").removeClass("budgetZindex")
    } catch (A) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("searchProperty", "coachMarkHide", A)
        }
    }
}

function promptBHKBudget(B, H, A, C) {
    try {
        var F = readMBCookie("promptBHKBudget");
        if (F == null) {
            var G = false;
            var D = false;
            if ((B.indexOf("10000") > "-1" || B.indexOf("10006") > "-1" || B.indexOf("10012") > "-1" || B.indexOf("10005") > "-1" || B.indexOf("10007") > "-1" || B.indexOf("10018") > "-1" || B.indexOf("10008") > "-1" || B.indexOf("10009") > "-1" || B.indexOf("10013") > "-1" || B.indexOf("10014") > "-1" || B.indexOf("10011") > "-1") && B.indexOf("10002") == "-1" && B.indexOf("10003") == "-1" && B.indexOf("10021") == "-1" && B.indexOf("10022") == "-1" && B.indexOf("10001") == "-1" && B.indexOf("10017") == "-1" && B.indexOf("10004") == "-1") {
                D = true
            }
            var I = "";
            if (H == "" && A == "" && C == "" && !D) {
                $("#promptBHKBudgetId").html("Get best property matches! Enter<br/><span>budget</span> and <span>bedroom</span>.<div class='btnOkGotIt getBtnBudgetAndBedroom'>Ok Got It</div>");
                $(".refineBudget").addClass("budgetZindex");
                $(".refineBedroom").addClass("budgetZindex");
                I = "budget=Yes,bedroom=Yes";
                G = true
            } else {
                if (H == "" && A == "") {
                    $("#promptBHKBudgetId").html("Get best property matches! <br/>Enter <span>budget</span>.<div class='btnOkGotIt getBtnBudget'>Ok Got It</div>");
                    $(".refineBudget").addClass("budgetZindex");
                    I = "budget=Yes";
                    G = true
                } else {
                    if (C == "" && !D) {
                        $("#promptBHKBudgetId").html("Get best property matches! <br/>Enter <span>bedroom</span>.<div class='btnOkGotIt getBtnBedroom'>Ok Got It</div>");
                        $("#promptBHKBudgetId").addClass("coachForBedroom");
                        $(".refineBedroom").addClass("budgetZindex");
                        I = "bedroom=Yes";
                        G = true
                    }
                }
            }
            if (G) {
                createMBCookie("promptBHKBudget", "Y", "15");
                coachInputHighLgt();
                setTimeout(function() {
                    coachMarkHide()
                }, 10000);
                $(".coachMarkLayer").live("click", function() {
                    coachMarkHide()
                });
                _gaq.push(["_trackEvent", "promptBHKBudget", I])
            }
        }
        $("body").keyup(function() {
            coachMarkHide()
        });
        $(".btnOkGotIt").click(function() {
            coachMarkHide()
        })
    } catch (E) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("searchProperty", "promptBHKBudget", E)
        }
    }
}

function loadSkyScrapper(L, C, I, E, F, M, G, J, A, N, B, D) {
    try {
        var H = contextPath + "ajax/loadSkyScrapper.json?pageName=" + L + "&pType=" + C + "&cityForRadiusSearch=" + I + "&city=" + E + "&geoTargeted=" + F + "&geoCity=" + M + "&transTypeSearch=" + G + "&locName=" + J + "&minBudget=" + A + "&maxBudget=" + N + "&bedrooms=" + B + "&jspPageName=" + D;
        $.ajax({
            dataType: "html",
            type: "get",
            url: H,
            cache: true,
            async: true,
            success: function(O) {
                $("#skyScrapperId").html(O)
            },
            error: function(O) {
                console.log(O)
            }
        })
    } catch (K) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("searchProperty", "loadSkyScrapper", K)
        }
    }
}

function getCitiesPropertiesOfState(B, G, D, A) {
    try {
        var C = getUrlStringToSearch();
        try {
            var F = contextPath + "ajax/getCitiesPropertiesOfState.json?" + C + "&isStateSearch=" + B + "&isCitySearch=" + G;
            $.getJSON(F, function(L) {
                if (L != null && L.length > 0) {
                    $("#cityWiseSearchWrap").show();
                    $("#cityPropBarUl").empty();
                    var J = "";
                    var I = 0;
                    for (var H = 0; H < L.length; H++) {
                        if (I < 15) {
                            var K = L[H];
                            J += "<li> <a onclick='addGaqForSuburb(\"" + K.cityName + "\");' target='_blank' href='" + K.srpUrl + "'><div class='cityWiseSearchBox'><div class='proSearchCity'>" + K.cityName + "(" + K.propertiesCount + ")</div></a></li>";
                            I++
                        }
                    }
                    $("#cityPropBarUl").append(J);
                    $("#cityjcarousel").jcarousel({
                        animation: "slow"
                    })
                } else {
                    $("#cityWiseSearchWrap").hide()
                }
            })
        } catch (E) {
            $("#cityWiseSearchWrap").hide()
        }
    } catch (E) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("searchProperty", "getCitiesPropertiesOfState", E)
        }
    }
}

function callOtherFunctions(B, A) {
    updateSearchViews(B, A);
    if ($.browser.msie && $.browser.version <= 6) {
        handleInIE6()
    }
    $("html").click(function(C) {
        if (!renderAmenDiv) {
            renderAmenDiv = false
        }
    });
    $(".searchDealPopClose a").live("click", function(C) {
        C.preventDefault();
        $(this).parents(".searchDealPop").hide()
    });
    $(".openPropertyPopup").hover(function() {
        $(this).parents(".individualWrapper").find(".searchDealPop").fadeIn("fast")
    });
    $(".searchDetailBody").hover(function() {
        if ($(this).hasClass("dealTemp")) {
            return false
        } else {
            $(this).parents(".individualWrapper").find(".searchDealPop").fadeIn("fast")
        }
        $(this).addClass("dealTemp")
    });
    propertyViewedShow(1);
    contactedShow(1, "C");
    contactedShow(1, "V");
    moveAlreadyContactedToEnd(1)
}

function moveAlreadyContactedToEnd(D) {
    var B = "Properties";
    if (D == 5) {
        B = "Projects"
    } else {
        if (D == 2) {
            B = "Agents"
        }
    }
    var C = readCookie(B + "_C");
    var H = readCookie(B + "_V");
    var F = "";
    var G = 0;
    if (C && C != "") {
        var A = C.split(",");
        for (var E = 0; E < A.length; E++) {
            if ($("#resultBlockWrapper" + A[E]).html() != null) {
                F += $("#resultBlockWrapper" + A[E])[0].outerHTML;
                $("#resultBlockWrapper" + A[E]).remove();
                G++
            }
        }
    }
    if (H && H != "") {
        var A = H.split(",");
        for (var E = 0; E < A.length; E++) {
            if ($("#resultBlockWrapper" + A[E]).html() != null) {
                F += $("#resultBlockWrapper" + A[E])[0].outerHTML;
                $("#resultBlockWrapper" + A[E]).remove();
                G++
            }
        }
    }
    $("div#moreResult").before(F)
}
jQuery.fn.outerHTML = function() {
    return (this[0]) ? this[0].outerHTML : ""
};

function getNSRPropertySearchResult() {
    var A = jsPath.replace("scripts", "css") + "reqPopup.css";
    if (showFlag != true) {
        $("#noResult").show()
    }
    if (document.getElementById("totalPropertyCount") && document.getElementById("totalPropertyCount").innerHTML && document.getElementById("totalPropertyCount").innerHTML.trim() > "0") {
        $("#noSearchResultPageDiv").hide();
        $("#refineFilterText").hide();
        $("#seeRefineText").text("See top " + document.getElementById("totalPropertyCount").innerHTML.trim() + " properties similar to your search criteria");
        $("#seeRefineText").show();
        setTimeout(function() {
            $("#noNSRForm").attr("href", "disabled")
        }, 800)
    } else {
        $("#noNSRForm").attr("href", A);
        setTimeout(function() {
            $("#noSearchResultPageDiv").show();
            $("#refineFilterText").show();
            $("#seeRefineText").hide()
        }, 800)
    }
}

function loadSRPAgentRating(A, B) {
    var C = "/bricks/ajax/getAgentRetingInMagicbox.html?oid=" + A + "&page=" + B;
    $.ajax({
        url: C,
        success: function(D) {
            if (D != "" && D != null) {
                $("#agentRating").css("display", "block");
                $(".agentRatingPopup").css("display", "block");
                $(".agentRatingPopupGrey").css("display", "block");
                createCookie("agentRatingSRP", "Y", 24);
                $("#agentRating").html(D)
            }
        }
    })
}
var rightPanelBorderShow = false;

function showRightPanelBorder() {
    if (!rightPanelBorderShow) {
        if (document.getElementById("rightTopBorder") != null && document.getElementById("rightPanelHeading") != null) {
            if (document.getElementById("rightTopBorder").style.display == "none") {
                document.getElementById("rightTopBorder").style.display = ""
            }
            if (document.getElementById("rightPanelHeading").style.display == "none") {
                document.getElementById("rightPanelHeading").style.display = ""
            }
            rightPanelBorderShow = true
        }
    }
}

function showBorder(A) {
    if (rightPanelBorderShow) {
        if (document.getElementById(A) != null && document.getElementById(A).style.display == "none") {
            document.getElementById(A).style.display = ""
        }
    }
}

function semToggleEvent(A) {
    if (_gaq) {
        _gaq.push(["_trackEvent", "_trackSEMToggle", A])
    }
}

function trackHBF() {
    _gaq.push(["_trackEvent", "_Investment_HotspotsTracking", "propertySRP"])
}

function loadHBFBanner(B, A) {}

function tagIfollowBanner(E, C, D, A, B) {
    loadReMarketingBanner("remarketingHtmlBanners.tiles", "51139", E, C, D, B + "propertySearchResult.jsp", A, "N", "", 0);
    loadReMarketingBanner("remarketingHtmlBanners.tiles", "51139", E, C, D, B + "cityIndexc.jsp", A, "N", "", 0);
    loadReMarketingBanner("remarketingHtmlBanners.tiles", "51139", E, C, D, B + "propertyListing.jsp", A, "N", "", 0)
}

function getData() {
    data = data + "";
    if (data && data.indexOf("HHH") > 0) {
        var B = data.split("HHH");
        if (count > (B.length - 2)) {
            count = 0
        }
        var A = B[count].split("TTT");
        var D = String(document.getElementById("headingdiv").innerHTML);
        var C = String(A[0]);
        if (ltrim(D) == ltrim(C)) {
            count++;
            if (count > (B.length - 2)) {
                count = 0
            }
            A = B[count].split("TTT")
        }
        document.getElementById("headingdiv").innerHTML = "" + A[0];
        document.getElementById("disAndUrl").href = A[1];
        var E = "<marquee scrollamount='2' behavior='scroll' loop='1' onmouseover='javascript:stop();' onmouseout='javascript:start();'><a target='_blank' href='" + A[1] + "' id='disAndUrl'>" + A[2] + " </a> </marquee>";
        document.getElementById("scroller").innerHTML = E;
        count++
    }
}

function ltrim(B) {
    var A = 0;
    while (A < B.length && B[A] == " ") {
        A++
    }
    return B.substring(A, B.length)
}
var pageNameValue = "SRPBuy";
var element = [];
var mcount = 1;
var markpagetype = "searchresults";
var pid1;
var pid2;
var pid3;
var loc1;
var loc2;
var loc3;
var city1;
var city2;
var city3;
var ptype1;
var ptype2;
var ptype3;
var servicetype = "";
var bugmount = 1;
var markbud = [];
var marktrans;
var markprotype;
var markcity;
var markloc;
var markbugmin;

function gtmForSearch(K, B, H, D, C, F, J, A, G, E, I) {
    if (K <= 4) {
        element.push("prop_" + B)
    }
    if (K == 1) {
        pid1 = B;
        loc1 = H;
        city1 = D;
        ptype1 = C
    }
    if (K == 2) {
        pid2 = B;
        loc2 = H;
        city2 = D;
        ptype2 = C
    }
    if (K == 3) {
        pid3 = B;
        loc3 = H;
        city3 = D;
        ptype3 = C
    }
    K = K + 1;
    if (bugmount <= 1) {
        if (E) {
            markbud.push(E)
        }
        if (I) {
            markbud.push(I)
        }
    }
    bugmount = bugmount + 1;
    marktrans = F;
    markprotype = J;
    markcity = A;
    markloc = G;
    markbugmin = E
}

function gtmDataPush() {
    if (markbud.length <= 0) {
        markbud.push("")
    }
    if (marktrans == "Sale") {
        servicetype = "Buy"
    } else {
        servicetype = "Rent"
    }
    dataLayer.push({
        listing_id: element
    });
    dataLayer.push({
        listing_pagetype: markpagetype
    });
    dataLayer.push({
        listing_totalvalue: markbugmin
    });
    dataLayer.push({
        listing_transactiontype: marktrans
    });
    dataLayer.push({
        listing_propertytype: markprotype
    });
    dataLayer.push({
        listing_city: markcity
    });
    dataLayer.push({
        listing_budget: markbud
    });
    dataLayer.push({
        listing_builder: ""
    });
    dataLayer.push({
        listing_locality: markloc
    });
    dataLayer.push({
        type: "search_page"
    });
    dataLayer.push({
        service_type: servicetype
    });
    dataLayer.push({
        pid1: pid1
    });
    dataLayer.push({
        locality1: loc1
    });
    dataLayer.push({
        city1: city1
    });
    dataLayer.push({
        property_type1: ptype1
    });
    dataLayer.push({
        pid2: pid2
    });
    dataLayer.push({
        locality2: loc2
    });
    dataLayer.push({
        city2: city2
    });
    dataLayer.push({
        property_type2: ptype2
    });
    dataLayer.push({
        pid3: pid3
    });
    dataLayer.push({
        locality3: loc3
    });
    dataLayer.push({
        city3: city3
    });
    dataLayer.push({
        property_type3: ptype3
    });
    var A = {
        Mumbai: "Mumbai",
        "Navi Mumbai": "Navi Mumbai",
        "New Delhi": "New Delhi",
        Pune: "Pune",
        Bangalore: "Bangalore",
        Ahmedabad: "Ahmedabad",
        Kolkata: "Kolkata",
        Hyderabad: "Hyderabad",
        Chennai: "Chennai",
        Gurgaon: "Gurgaon",
        Noida: "Noida",
        Thane: "Thane",
        Ghaziabad: "Ghaziabad",
        Faridabad: "Faridabad"
    };
    var B = 0;
    if (markcity != null && markcity != "" && (A[markcity] != undefined)) {
        B = 1
    }
    dataLayer.push({
        city_type: B
    })
}

function intermedairyPageCall(J, K, F, D, C, E, I, G, B, M, H, A) {
    var L = new Object();
    L.city = J;
    L.geoCity = K;
    L.propertyTypeRefNo = F;
    L.pageName1 = D;
    L.campCode = C;
    L.displayBudget = E;
    L.localityName = I;
    L.transTypeSearch = G;
    L.locName = I;
    L.searMinBudget = B;
    L.searMaxBudget = M;
    L.searBedrooms = H;
    L.searchSummary = A;
    leaderboardCallStatus = false;
    ajaxService.loadPostRequirement(L, {
        callback: function(O) {
            if (O != null) {
                $("#searchResultLeaderBoard").html(O);
                if ($.browser.msie && $.browser.version <= 6) {} else {
                    var N = document.getElementById("resultCount").innerHTML;
                    if (N == 0 || N == "0") {
                        document.getElementById("fred").innerHTML = ""
                    } else {
                        lbComScoreGafire();
                        if (readCookie(J + "_LB_SHOWN") == null || readCookie(J + "_LB_SHOWN") != "Y") {
                            createCookie(J + "_LB_SHOWN", "Y", 1);
                            $(window).scroll(function() {
                                if (currentYPosition() >= 500 && !leaderboardCallStatus) {
                                    $("#fred").show();
                                    $("#leaderBoard").show();
                                    leaderboardCallStatus = true
                                }
                            })
                        }
                    }
                }
            }
        },
        async: true
    })
}

function lbComScoreGafire() {
    if ($("#leaderBoard")) {
        $("#leaderBoard").show()
    }
    if ($("#projectLBpopup")) {
        $("#projectLBpopup").show()
    }
    track_comScore("PropertySRP_leaderboard");
    if (readCookie("SHOWSEARCHTEXT") == "") {
        var A = "Default_LB_Property_RHS_Maximize";
        createCookie("defaultLeaderBoard", "D", 1);
        _gaq.push(["_trackEvent", "Leaderboard Post Requirement", A])
    }
}
$(document).ready(function() {
    $("#topLoader div").html('<span><img src="' + imgPath + 'mbLoader.gif" width="45" height="45" alt="Loader" /> Updating Results</span>');
    $(".closeBtnReq").click(function() {
        $("#fred").hide()
    });
    $("img.lazy").lazyload();
    $("body").on("click", ".quickLinkCont .iconClosePop", function() {
        $(this).closest(".quickLinkCont").hide()
    });
    $("body").on("mouseleave", ".quickLinks", function() {
        $(".quickLinkCont").hide()
    })
});

function hideQuickFacts(A) {
    $(A).closest(".quickLinkCont").hide()
}

function showQuickFacts(A) {
    $(".quickLinkCont").hide();
    $(A).find(".quickLinkCont").show()
}

function gaQuickLink(B, C, A) {
    if (_gaq) {
        _gaq.push(["_trackEvent", B, C, A])
    } else {
        initilizeGAQ();
        _gaq.push(["_trackEvent", B, C, A])
    }
}
var commaSeperated = "";
$(document).ready(function() {
    $("span[data-hourtag=hourTag]").each(function() {
        var B = $(this).data("hourvalue");
        if (commaSeperated) {
            commaSeperated = commaSeperated + ","
        }
        commaSeperated = commaSeperated + B
    });
    if (commaSeperated) {
        var A = contextPath + "ajax/applogicLastSync.json?id=" + commaSeperated + "";
        $.ajax({
            dataType: "json",
            type: "get",
            url: A,
            cache: true,
            async: true,
            success: function(B) {
                for (var C in B) {
                    if (B[C] && B[C] === "Online") {
                        $(".hourTag" + C).html(', <span class="onlineA">Online</span>')
                    } else {
                        $(".hourTag" + C).html(", " + B[C])
                    }
                }
            }
        })
    }
});

function loadUserProfileMeter(B) {
    var A = readCookie("userEmail");
    if (A) {
        A = A.replace(/^"(.*)"$/, "$1")
    }
    try {
        $.ajax({
            type: "get",
            url: fullContextPath + "/ajax/showBuyRentQuestion?email=" + A + "&urlMap=" + B,
            cache: true,
            async: true,
            success: function(D) {
                $("#userProfileMeterId").html(D)
            }
        })
    } catch (C) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("editRefineSearch", "loadUserProfileMeter", C)
        }
    }
}
var userMobileMinLength = 10;
var userMobileMaxLength = 12;
var isdMobileWith3digitCodeMinLength = 8;
var mobLengthMinIsd = 8;
var noOfDistnctChars = 2;

function resendAppDownloadUI(D, A, F, C) {
    var B = document.getElementById("appMobileIsd" + C);
    D = document.getElementById("appMobile" + C).value;
    A = B.options[B.options.selectedIndex].value;
    var E = "/bricks/get-app-resend.html?data=" + D + "&data1=" + A + "&data2=" + F;
    $.ajax({
        url: E,
        type: "get",
        async: "false",
        success: function(G) {}
    })
}

function validateUserMobileWithIsdCodeAppDownload(L, H, D) {
    var E = null;
    var C = document.getElementById("appMobileIsd" + D);
    L = document.getElementById("appMobile" + D).value;
    E = C.options[C.options.selectedIndex].value;
    var J = E;
    if (!validateRequiredNewAppDownload(L, "Mobile number", H)) {
        return false
    }
    var I = L;
    var K = /^[0-9]*$/;
    if (!K.exec(I)) {
        alert("Only numbers allowed. Please re-enter.");
        document.getElementById(H).focus();
        return false
    }
    var G = /^[0]/;
    if (G.exec(I)) {
        alert("Mobile Number should not start from 0. Please re-enter.");
        document.getElementById(H).focus();
        return false
    }
    var A = userMobileMinLength;
    var B = 10;
    if (J && J != "50") {
        if (J.charAt(0) == "+") {
            J = J.substring(1, J.length)
        }
        if (J && J.length >= 3) {
            A = isdMobileWith3digitCodeMinLength
        }
        B = 12
    } else {
        var F = /^[^789]/;
        if (F.exec(I)) {
            alert("Invalid Mobile Number. Please re-enter.");
            document.getElementById(H).focus();
            return false
        }
    }
    if (I.length < A && J == "50") {
        alert("Mobile number should have min " + A + " digits. Please enter a valid mobile number");
        document.getElementById(H).focus();
        return false
    } else {
        if (I.length < A && J != "50") {
            alert("Mobile number should have min " + mobLengthMinIsd + " digits. Please enter a valid mobile number");
            document.getElementById(H).focus();
            return false
        }
    }
    if (I.length > B) {
        alert("Mobile number can have max. " + B + " digits. Please enter a valid mobile number");
        document.getElementById(H).focus();
        return false
    }
    if (numOfDistinctChars(I) < noOfDistnctChars) {
        alert("Invalid Mobile Number. Please re-enter.");
        document.getElementById(H).focus();
        return false
    }
    return true
}

function getISDVal(B, C) {
    var A = B.options[B.selectedIndex].text;
    $(C).val(A)
}

function validateRequiredNewAppDownload(B, E, D) {
    var C = B;
    if (C != "undefined" && C != null && C != "") {
        return true
    } else {
        var A = "Compulsory field. Cannot be blank.";
        if (E) {
            A = E + " is compulsory field. Cannot be blank."
        }
        alert(A);
        document.getElementById(D).focus();
        return false
    }
}

function numOfDistinctChars(D) {
    var E = new Object;
    var C = D.length;
    for (var A = 0; A < C; A++) {
        var B = D.charAt(A);
        E[B] = (isNaN(E[B]) ? 1 : E[B] + 1)
    }
    return Object.size(E)
}
Object.size = function(B) {
    var A = 0;
    for (key in B) {
        if (B.hasOwnProperty(key)) {
            A++
        }
    }
    return A
};

function saveAppDownloadUI(D, C, B) {
    var F = "";
    var E = "";
    var I = "";
    var H = "";
    var A = document.getElementById("appMobileIsd" + D);
    F = document.getElementById("appMobile" + D).value;
    E = A.options[A.options.selectedIndex].value;
    I = "thankyoums" + D;
    H = "viewCont" + D;
    $("#mobileData" + D).html(document.getElementById("appMobile" + D).value);
    $("#" + I).css("display", "block");
    $("#" + H).css("display", "none");
    var G = "/bricks/get-app-download-save.html?data=" + F + "&data1=" + E + "&data2=" + C + "&data3=" + B;
    $.ajax({
        url: G,
        type: "get",
        async: "false",
        success: function(J) {}
    });
    if (_gaq) {
        _gaq.push(["_trackEvent", C, "App Download Clock"])
    }
}

function saveAppDownloadGlobalNavigation(C, H, A, E) {
    var G = "";
    var F = "";
    var D = "";
    var L = "";
    var J = "";
    var B = document.getElementById(H);
    var K = document.getElementById(C);
    G = document.getElementById(A).value;
    F = B.options[B.options.selectedIndex].value;
    D = K.options[K.options.selectedIndex].value;
    L = "thankyou" + E;
    $("#mobileData" + E).html(document.getElementById("appMobile" + E).value);
    $("#" + L).css("display", "block");
    $("#homeAppContent").css("display", "none");
    var I = "/bricks/save-app-download-global-header.html?data=" + G + "&data1=" + F + "&data2=" + D;
    $.ajax({
        url: I,
        type: "get",
        async: "false",
        success: function(M) {}
    });
    if (_gaq) {
        _gaq.push(["_trackEvent", D, "App Download Clock"])
    }
}

function resendAppDownloadGlobalNavigation(D, A, G, C) {
    var B = document.getElementById("appMobileIsd" + C);
    var F = document.getElementById(G);
    D = document.getElementById("appMobile" + C).value;
    A = B.options[B.options.selectedIndex].value;
    G = F.options[F.options.selectedIndex].value;
    var E = "/bricks/get-app-resend-Globle-Navigation.html?data=" + D + "&data1=" + A + "&data2=" + G;
    $.ajax({
        url: E,
        type: "get",
        async: "false",
        success: function(H) {}
    })
}
var delayTime = 500;
var slideStyle = "swing";
var refinedFields = "";
var requestMoreDetails = "";
var photpPopup = "";
var priceByCounter = 4;
var showmbrecomendation = true;
var showSimilarPropertyInDetailsPage = "N";
var showAppdownload = "N";
var checkSimilaronSearch = "";
var propertySrp = "N";
var showChatWindow = "N";
var stopSRPScroll = "Y";

function showPropertyContactForm(C, A, E, I, D, F, B, H, G) {
    _showPropertyContactForm(C, A, E, I, D, F, B, H, G, false)
}

function showPropertySiteVisitForm(C, A, E, I, D, F, B, H, G) {
    _showPropertyContactForm(C, A, E, I, D, F, B, H, G, true)
}

function _showPropertyContactForm(F, B, I, O, H, J, D, L, K, N) {
    try {
        var A = arguments[6];
        if (typeof A != "undefined" && A == "PhotpPopup") {
            photpPopup = true
        } else {
            photpPopup = false
        }
        if (typeof J != "undefined" && J == "property" && typeof D != "undefined" && D == "Y") {
            propertySrp = "Y"
        }
        showSimilarPropertyInDetailsPage = D;
        checkCookieBasedMobileVerifcation();
        if (readCookieVal("gaqCompleteCookie") == null) {
            var M = createGaqStringForHome(1, "localityName");
            createCookieExpiresInTimeInDays("gaqCompleteCookie", M, 200)
        }
        createGaqCookieDataForContact(B, I);
        var E = replaceValueInGaqCookie("sequenceNum", null, "gaqCompleteCookie", "||", "Y");
        replaceValueInGaqCookie("universalTimestamp", "" + new Date(), "gaqCompleteCookie", "||", "N");
        gaqCookie = readCookieVal("gaqCompleteCookie");
        if (_gaq && !K) {
            _gaq.push(["_trackEvent", gaqCookie, "Contact Cliked"])
        }
        if ($("#isRadiusSearch").val() == "Y" && !K) {
            if (_gaq) {
                _gaq.push(["_trackEvent", "GooglePOI Contact Now Form Clicked | Place = " + $("#searchLocName").val(), "Contact Now - Google"])
            }
        }
        imgPath = O;
        $(".proBtnRow").find("a").removeClass("activeForm");
        $(".actionButton").find("a").removeClass("activeForm");
        if ($("#" + H + "ContactAgentForm" + B).css("display") == "none") {
            closePropertyContactForm(B, false);
            closePropertyViewPhoneNumber(B, false);
            $(".contactAgentForm").html("");
            $(".contactAgentForm").removeClass("forNRICForm");
            if (F) {
                $(F).addClass("activeForm")
            }
            $(".contGray").css("display", "block");
            $("#" + H + "ContactAgentForm" + B).css("display", "block");
            $("#" + H + "ContactAgentForm" + B).html('<div class="contactformLoader">&nbsp;</div>');
            includePropertyContactWinSv(B, I, H, J, "", "", L, N);
            $(".proBtnRow a").removeClass("activeForm");
            $(".actionButton").find("a").removeClass("activeForm");
            if (F) {
                $(F).addClass("activeForm")
            }
        } else {
            closePropertyContactForm(B, false);
            $(".proBtnRow a").removeClass("activeForm");
            if (F) {
                $(F).removeClass("activeForm")
            }
        }
        if (typeof H != "undefined" && H == "chat" && typeof J != "undefined" && J == "agent") {
            stopSRPScroll = "N"
        } else {
            stopSRPScroll = "Y"
        }
        if (F && stopSRPScroll == "Y") {
            var C = parseInt($(F).offset().top);
            $("html, body").animate({
                scrollTop: C - 105
            }, 500)
        }
        checkCookieBasedMobileVerifcation()
    } catch (G) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("searchResult", "_showPropertyContactForm", G)
        }
    }
}

function getVerificationFlag(E) {
    var C = readCookie("userMobile");
    var A = readCookie("userMobileCountry");
    var D = null;
    var B = readCookie("tempMobile#" + C);
    if (B == "N") {
        saveMobileVerificationData();
        createCookie("verificationFlag", "N", 2)
    } else {
        if (C && C.length > 0) {
            chkMobileVerification(C, true, E)
        }
    }
}

function saveMobileVerificationData() {
    try {
        var C = readCookie("userMobile");
        var B = readCookie("userMobileCountry");
        var A = readCookie("userEmail");
        if (C) {
            ajaxService.saveCookieBasedUnverifedNumber(C, B, A, {
                callback: function(E) {},
                async: false
            })
        }
    } catch (D) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("searchResult", "saveMobileVerificationData", D)
        }
    }
}

function viewPropertyPhoneNumber(E, A, H, L, G, K, I, C, J) {
    try {
        checkCookieBasedMobileVerifcation();
        createGaqCookieDataForContact(A, H);
        if (typeof I != "undefined" && I == "property" && typeof C != "undefined" && C == "Y") {
            propertySrp = "Y"
        }
        var D = replaceValueInGaqCookie("sequenceNum", null, "gaqCompleteCookie", "||", "Y");
        replaceValueInGaqCookie("srpContactButtonOpenedSuccess", "Opened", "gaqCompleteCookie", "||", "N");
        gaqCookie = readCookieVal("gaqCompleteCookie");
        if (_gaq && !J) {
            _gaq.push(["_trackEvent", gaqCookie, "View Phone Clicked"])
        }
        if ($("#isRadiusSearch").val() == "Y" && !J) {
            if (_gaq) {
                _gaq.push(["_trackEvent", "GooglePOI View Phone Form Clicked | Place= " + $("#searchLocName").val(), "View Phone Number - Google POI"])
            }
        }
        showSimilarPropertyInDetailsPage = C;
        imgPath = L;
        if ($("#" + G + "AgentPhoneForm" + A).css("display") == "none") {
            closePropertyContactForm(A, false);
            closePropertyViewPhoneNumber(A, false);
            $(".agentPhoneForm").html("");
            $("#" + G + "AgentPhoneForm" + A).css("display", "block");
            if (E) {
                $(E).addClass("activeForm")
            }
            $("#" + G + "AgentPhoneForm" + A).html('<div class="contactformLoader">&nbsp;</div>');
            $(".contGray").css("display", "block");
            includePropertyViewPhoneNumber(A, H, G, K, I)
        } else {
            closePropertyViewPhoneNumber(A, false);
            if (E) {
                $(E).removeClass("activeForm")
            }
        }
        if (E) {
            var B = parseInt($(E).offset().top);
            $("html, body").animate({
                scrollTop: B - 105
            }, 500)
        }
        checkCookieBasedMobileVerifcation()
    } catch (F) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("searchResult", "viewPropertyPhoneNumber", F)
        }
    }
}

function closePropertyContactForm(F) {
    try {
        if (readCookieVal("gaqCompleteCookie") == null) {
            var D = createGaqStringForHome(1, "localityName");
            createCookieExpiresInTimeInDays("gaqCompleteCookie", D, 200)
        }
        var B = arguments[1];
        if (typeof B == "undefined" || B != false) {
            replaceValueInGaqCookie("srpContactButtonClick", "", "gaqCompleteCookie", "||", "N");
            replaceValueInGaqCookie("srpContactPropertyId", F, "gaqCompleteCookie", "||", "N");
            replaceValueInGaqCookie("srpContactProjectName", "", "gaqCompleteCookie", "||", "N");
            replaceValueInGaqCookie("srpContactPsmId", "", "gaqCompleteCookie", "||", "N");
            replaceValueInGaqCookie("srpContactButtonOpenedSuccess", "Closed", "gaqCompleteCookie", "||", "N");
            replaceValueInGaqCookie("universalTimestamp", "" + new Date(), "gaqCompleteCookie", "||", "N");
            if (typeof srpDetailPageOrNot !== "undefined" && srpDetailPageOrNot == "N") {
                replaceValueInGaqCookie("srpContactDetailPageView", "N", "gaqCompleteCookie", "||", "N")
            } else {
                replaceValueInGaqCookie("srpContactDetailPageView", "Y", "gaqCompleteCookie", "||", "N")
            }
            replaceValueInGaqCookie("srpContactPositionOfProperty", "", "gaqCompleteCookie", "||", "N");
            replaceValueInGaqCookie("srpContactBedroom", "", "gaqCompleteCookie", "||", "N");
            replaceValueInGaqCookie("srpContactPropertyType", "", "gaqCompleteCookie", "||", "N");
            replaceValueInGaqCookie("srpContactArea", "", "gaqCompleteCookie", "||", "N");
            replaceValueInGaqCookie("srpContactPrice", "", "gaqCompleteCookie", "||", "N");
            replaceValueInGaqCookie("srpContactNumberOfImages", "", "gaqCompleteCookie", "||", "N");
            replaceValueInGaqCookie("srpContactLocation", "", "gaqCompleteCookie", "||", "N");
            replaceValueInGaqCookie("srpContactDevName", "", "gaqCompleteCookie", "||", "N");
            replaceValueInGaqCookie("srpContactRatePerSqft", "", "gaqCompleteCookie", "||", "N");
            replaceValueInGaqCookie("srpContactProjPropOrNot", "", "gaqCompleteCookie", "||", "N");
            replaceValueInGaqCookie("srpContactTransaction", "", "gaqCompleteCookie", "||", "N");
            replaceValueInGaqCookie("srpContactFurnishingStatus", "", "gaqCompleteCookie", "||", "N");
            replaceValueInGaqCookie("srpContactFloorDetails", "", "gaqCompleteCookie", "||", "N");
            replaceValueInGaqCookie("srpContactBathrooms", "", "gaqCompleteCookie", "||", "N");
            replaceValueInGaqCookie("srpContactPostedDate", "", "gaqCompleteCookie", "||", "N");
            replaceValueInGaqCookie("srpContactVerified", "", "gaqCompleteCookie", "||", "N");
            replaceValueInGaqCookie("srpContactListingType", "", "gaqCompleteCookie", "||", "N");
            replaceValueInGaqCookie("srpContactCompletionScore", "", "gaqCompleteCookie", "||", "N");
            replaceValueInGaqCookie("srpContactUserType", "", "gaqCompleteCookie", "||", "N");
            var E = replaceValueInGaqCookie("sequenceNum", null, "gaqCompleteCookie", "||", "Y");
            gaqCookie = readCookieVal("gaqCompleteCookie");
            if (_gaq) {
                _gaq.push(["_trackEvent", gaqCookie, "View Phone Clicked"])
            }
        }
        $(".srpBlockLeftBtn li a, .grdBtnBlock li a").removeClass("activeForm");
        $(".contactAgentForm").css("display", "none");
        $(".srpBlockListRow .contactForms .formsWrap").removeClass("showMoreWidth");
        $(".contactAgentForm").html("");
        if ($(".requestDetailsForm")) {
            $(".requestDetailsForm").css("display", "none");
            $(".requestDetailsForm").html("")
        }
        if ($.browser.msie && $.browser.version <= 7) {
            $(".viewAllAmenitiesWrapper").css("position", "relative");
            $(".slidesHolder .images").css("position", "relative");
            $(".moreContactLink").css("position", "relative");
            $("#leaderB8th .fieldWatch").css("position", "relative");
            $(".varifySecResult").css("position", "relative");
            $(".searchResultToolTip").css("position", "relative")
        }
        if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
            var A = new Number(RegExp.$1);
            if (A <= 7) {
                $(".imagesNavigationInner").css("position", "absolute");
                $(".imagesNavigation").css("position", "relative");
                $("#searchResultWrapper .imagesNavigation span").css("position", "relative");
                $(".anythingBase").css("position", "relative");
                $(".lessTenRecom").css("position", "relative");
                $(".anythingSlider").css("position", "relative");
                $(".anythingWindow").css("position", "relative")
            }
        }
        $(".proBtnRow a").removeClass("activeForm");
        $(".actionButton").find("a").removeClass("activeForm");
        $(".contGray").hide();
        $(".btnGotIt").trigger("onclick")
    } catch (C) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("searchResult", "closePropertyContactForm", C)
        }
    }
}

function closePropertyViewPhoneNumber(E) {
    try {
        var B = arguments[1];
        if (typeof B == "undefined" || B != false) {
            replaceValueInGaqCookie("srpContactButtonClick", "", "gaqCompleteCookie", "||", "N");
            replaceValueInGaqCookie("srpContactPropertyId", E, "gaqCompleteCookie", "||", "N");
            replaceValueInGaqCookie("srpContactProjectName", "", "gaqCompleteCookie", "||", "N");
            replaceValueInGaqCookie("srpContactPsmId", "", "gaqCompleteCookie", "||", "N");
            replaceValueInGaqCookie("srpContactButtonOpenedSuccess", "Closed", "gaqCompleteCookie", "||", "N");
            if (typeof srpDetailPageOrNot !== "undefined" && srpDetailPageOrNot == "N") {
                replaceValueInGaqCookie("srpContactDetailPageView", "N", "gaqCompleteCookie", "||", "N")
            } else {
                replaceValueInGaqCookie("srpContactDetailPageView", "Y", "gaqCompleteCookie", "||", "N")
            }
            replaceValueInGaqCookie("srpContactPositionOfProperty", "", "gaqCompleteCookie", "||", "N");
            replaceValueInGaqCookie("srpContactBedroom", "", "gaqCompleteCookie", "||", "N");
            replaceValueInGaqCookie("srpContactPropertyType", "", "gaqCompleteCookie", "||", "N");
            replaceValueInGaqCookie("srpContactArea", "", "gaqCompleteCookie", "||", "N");
            replaceValueInGaqCookie("srpContactPrice", "", "gaqCompleteCookie", "||", "N");
            replaceValueInGaqCookie("srpContactNumberOfImages", "", "gaqCompleteCookie", "||", "N");
            replaceValueInGaqCookie("srpContactLocation", "", "gaqCompleteCookie", "||", "N");
            replaceValueInGaqCookie("srpContactDevName", "", "gaqCompleteCookie", "||", "N");
            replaceValueInGaqCookie("srpContactRatePerSqft", "", "gaqCompleteCookie", "||", "N");
            replaceValueInGaqCookie("srpContactProjPropOrNot", "", "gaqCompleteCookie", "||", "N");
            replaceValueInGaqCookie("srpContactTransaction", "", "gaqCompleteCookie", "||", "N");
            replaceValueInGaqCookie("srpContactFurnishingStatus", "", "gaqCompleteCookie", "||", "N");
            replaceValueInGaqCookie("srpContactFloorDetails", "", "gaqCompleteCookie", "||", "N");
            replaceValueInGaqCookie("srpContactBathrooms", "", "gaqCompleteCookie", "||", "N");
            replaceValueInGaqCookie("srpContactPostedDate", "", "gaqCompleteCookie", "||", "N");
            replaceValueInGaqCookie("srpContactVerified", "", "gaqCompleteCookie", "||", "N");
            replaceValueInGaqCookie("srpContactListingType", "", "gaqCompleteCookie", "||", "N");
            replaceValueInGaqCookie("srpContactCompletionScore", "", "gaqCompleteCookie", "||", "N");
            replaceValueInGaqCookie("srpContactUserType", "", "gaqCompleteCookie", "||", "N");
            replaceValueInGaqCookie("srpContactPostedBy", "", "gaqCompleteCookie", "||", "N");
            replaceValueInGaqCookie("srppostedSince", "", "gaqCompleteCookie", "||", "N");
            var D = replaceValueInGaqCookie("sequenceNum", null, "gaqCompleteCookie", "||", "Y");
            gaqCookie = readCookieVal("gaqCompleteCookie");
            if (_gaq) {
                _gaq.push(["_trackEvent", gaqCookie, "View Phone Clicked"])
            }
        }
        $(".srpBlockLeftBtn li a, .grdBtnBlock li a").removeClass("activeForm");
        $(".viewPhoneForm").css("display", "none");
        $(".viewPhoneForm").html("");
        $(".srpBlock").removeClass("srpBlockActive");
        if ($.browser.msie && $.browser.version <= 7) {
            $(".viewAllAmenitiesWrapper").css("position", "relative");
            $(".slidesHolder .images").css("position", "relative");
            $(".moreContactLink").css("position", "relative");
            $("#leaderB8th .fieldWatch").css("position", "relative");
            $(".varifySecResult").css("position", "relative");
            $(".searchResultToolTip").css("position", "relative")
        }
        if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
            var A = new Number(RegExp.$1);
            if (A <= 7) {
                $(".imagesNavigationInner").css("position", "absolute");
                $(".imagesNavigation").css("position", "relative");
                $("#searchResultWrapper .imagesNavigation span").css("position", "relative");
                $(".anythingBase").css("position", "relative");
                $(".lessTenRecom").css("position", "relative");
                $(".anythingSlider").css("position", "relative");
                $(".anythingWindow").css("position", "relative")
            }
        }
        $(".proBtnRow a").removeClass("activeForm");
        $(".actionButton").find("a").removeClass("activeForm");
        $(".contGray").hide()
    } catch (C) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("searchResult", "closePropertyViewPhoneNumber", C)
        }
    }
    $(".formsWrap").removeClass("addSimilar")
}

function callFromPropertyDetails(G, B, I, M) {
    try {
        var A = "";
        var K = sessionId;
        if (typeof sessionId == "undefined") {
            K = "unkknown"
        }
        if (typeof I == "undefined" || I == null || I == "" || I == "project" || I == "Project") {
            A = "propId-" + B + "-sessionId-" + K + "-" + seachVersion + "-property"
        } else {
            A = "propId-" + B + "-sessionId-" + K + "-" + seachVersion + "-" + I
        }
        if ($("#categoryId" + B)) {
            categoryId = $("#categoryId" + B).val();
            if (categoryId == "S" || categoryId == "s") {
                categoryId = "Sale"
            } else {
                if (categoryId == "R" || categoryId == "r") {
                    categoryId = "Rent"
                }
            }
            _gaq.push(["_setCustomVar", 3, "CD12", categoryId, 3])
        }
        var F = parent.document.getElementsByClassName("propContactGreyBox");
        var D = document.getElementById("Map");
        var E = $("#tracking").val();
        if ((E == null || typeof E === "undefined") && parent.document.getElementById("tracking")) {
            E = parent.document.getElementById("tracking").innerHTML
        }
        if (G == 3 && parent.document.getElementById("btnSiteVisit" + B)) {
            parent.document.getElementById("btnSiteVisit" + B).text = "Site Visit Booked";
            parent.document.getElementById("btnSiteVisit" + B).className = "contactBtn agentBtn contactedAgent contactAdv activeForm btnSiteVisit contactedSiteVisit";
            if (parent.document.getElementById("userTypeForContactJS" + B)) {
                var L = parent.document.getElementById("userTypeForContactJS" + B).getAttribute("value");
                parent.document.getElementById("contactBtn" + B).text = "Contact " + L;
                parent.document.getElementById("contactBtn" + B).className = "contactLi contactBtn agentBtn"
            }
        } else {
            if (E != null && E != "undefined" && E != "") {
                A = "propId-" + B + "-sessionId-" + K + "-" + seachVersion;
                if (E == "B" || E == "Y") {
                    var C = parent.document.getElementById("agentBtn" + B);
                    var H = false;
                    if (C == null || C == undefined) {
                        C = parent.document.getElementById("agentBtnqqq" + B);
                        H = true
                    }
                    if (G == 1 && (parent.document.getElementById("contactBtn" + B) || parent.document.getElementById("agentBtn" + B) || parent.document.getElementById("agentBtnqqq" + B) || parent.document.getElementById("agentBtnat" + B) || parent.document.getElementById("agentBtn2" + B) || parent.document.getElementById("agentBtnt" + B) || parent.document.getElementById("simiContactBtn" + B) || parent.document.getElementById("requestMoreDetails" + B) || parent.document.getElementById("contactBtnProject" + B) || parent.document.getElementById("agentBtnqqq2" + B))) {
                        if (typeof requestMoreDetails != "undefined" && requestMoreDetails == "Y") {
                            if (parent.document.getElementById("requestMoreDetails" + B)) {
                                parent.document.getElementById("requestMoreDetails" + B).text = "Request Send";
                                parent.document.getElementById("requestMoreDetails" + B).className = "contactBtn contactedPhone";
                                if (_gaq) {
                                    _gaq.push(["_trackPageview", A + "property-details-send-contact-details-success.html"]);
                                    if (!(M && M == "N")) {
                                        _gaq.push(["_trackPageview", A + "property-details-send-contact-details-OTP-success.html"])
                                    }
                                }
                            }
                        } else {
                            if (C != null && C != undefined) {
                                if (parent.document.getElementById("agentBtnat" + B)) {
                                    parent.document.getElementById("agentBtnat" + B).text = "Contacted";
                                    parent.document.getElementById("agentBtnat" + B).className = "contactBtn contactBtnGreen"
                                }
                                if (parent.document.getElementById("agentBtnt" + B)) {
                                    parent.document.getElementById("agentBtnt" + B).text = "Contacted";
                                    parent.document.getElementById("agentBtnt" + B).className = "contactBtn contactBtnGreen"
                                }
                                if (parent.document.getElementById("simiContactBtn" + B)) {
                                    parent.document.getElementById("simiContactBtn" + B).text = "Contacted";
                                    parent.document.getElementById("simiContactBtn" + B).className = "contactBtn btn1 contactedPhone"
                                }
                                if (H) {
                                    parent.document.getElementById("agentBtnqqq" + B).text = "Contacted";
                                    parent.document.getElementById("agentBtnqqq" + B).className = "contactBtn agentBtn contactedAgent contactAdv"
                                } else {
                                    parent.document.getElementById("agentBtn" + B).text = "Contacted";
                                    parent.document.getElementById("agentBtn" + B).className = "contactBtn agentBtn contactedAgent contactAdv"
                                }
                                if (typeof checkSimilaronSearch != "undefined" && checkSimilaronSearch == "AA-SimilarContact") {
                                    if (_gaq) {
                                        _gaq.push(["_trackPageview", "/" + A + "-similar-property-search-send-contact-details-success.html"])
                                    }
                                } else {
                                    if (_gaq) {
                                        _gaq.push(["_trackPageview", A + "property-details-send-contact-details-success.html"]);
                                        if (!(M && M == "N")) {
                                            _gaq.push(["_trackPageview", A + "property-details-send-contact-details-OTP-success.html"])
                                        }
                                    }
                                }
                            } else {
                                if (parent.document.getElementById("contactBtnProject" + B)) {
                                    if (parent.document.getElementById("contactBtnProject" + B) != "") {
                                        parent.document.getElementById("contactBtnProject" + B).text = "Contacted";
                                        parent.document.getElementById("contactBtnProject" + B).className = "contactBtn contactBtnGreen"
                                    }
                                    if (_gaq) {
                                        _gaq.push(["_trackPageview", "more-properties-project-details-send-contact-details-success.html"]);
                                        if (!(M && M == "N")) {
                                            _gaq.push(["_trackPageview", "more-properties-project-details-send-contact-details-OTP-success.html"])
                                        }
                                    }
                                } else {
                                    if (parent.document.getElementById("agentBtnat" + B)) {
                                        parent.document.getElementById("agentBtnat" + B).text = "Contacted";
                                        parent.document.getElementById("agentBtnat" + B).className = "contactBtn contactBtnGreen"
                                    }
                                    if (parent.document.getElementById("agentBtnt" + B)) {
                                        parent.document.getElementById("agentBtnt" + B).text = "Contacted";
                                        parent.document.getElementById("agentBtnt" + B).className = "contactBtn contactBtnGreen"
                                    }
                                    if (parent.document.getElementById("agentBtn1" + B)) {
                                        parent.document.getElementById("agentBtn1" + B).text = "Contacted";
                                        parent.document.getElementById("agentBtn1" + B).className = "contactBtn contactBtnGreen"
                                    }
                                    if (parent.document.getElementById("agentBtnqqq2" + B)) {
                                        parent.document.getElementById("agentBtnqqq2" + B).text = "Contacted";
                                        parent.document.getElementById("agentBtnqqq2" + B).className = "contactBtn contactBtnGreen"
                                    }
                                    if (parent.document.getElementById("agentBtn2" + B)) {
                                        parent.document.getElementById("agentBtn2" + B).innerHTML = "Contacted";
                                        parent.document.getElementById("agentBtn2" + B).className = "contactBtn contactBtnGreen"
                                    } else {
                                        parent.document.getElementById("contactBtn" + B).text = "Contacted";
                                        parent.document.getElementById("contactBtn" + B).className = "contactBtn agentBtn contactedAgent contactAdv"
                                    }
                                    if (_gaq) {
                                        _gaq.push(["_trackPageview", A + "property-details-send-contact-details-success.html"]);
                                        if (!(M && M == "N")) {
                                            _gaq.push(["_trackPageview", A + "property-details-send-contact-details-OTP-success.html"])
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        if (G == 2 && (parent.document.getElementById("viewPhoneBtn" + B) || parent.document.getElementById("viewPhoneBtnat" + B) || parent.document.getElementById("SimViewPhoneBtn" + B)) || parent.document.getElementById("viewPhoneBtnat1" + B)) {
                            if (parent.document.getElementById("viewPhoneBtnat" + B)) {
                                if (parent.document.getElementById("viewPhoneBtnat" + B).className.indexOf("unPaidOwnerBtn") != -1) {
                                    parent.document.getElementById("viewPhoneBtnat" + B).text = "No. Sent";
                                    parent.document.getElementById("viewPhoneBtnat" + B).className = "viewPhoneNumber contactBtnGreen unPaidOwnerBtn"
                                } else {
                                    parent.document.getElementById("viewPhoneBtnat" + B).text = "Phone No. Viewed";
                                    parent.document.getElementById("viewPhoneBtnat" + B).className = "viewPhoneNumber contactBtnGreen"
                                }
                            }
                            if (parent.document.getElementById("viewPhoneBtn" + B)) {
                                parent.document.getElementById("viewPhoneBtn" + B).text = "Phone No. Viewed";
                                parent.document.getElementById("viewPhoneBtn" + B).className = "contactBtn viewPhoneBtn contactedPhone"
                            }
                            if (parent.document.getElementById("viewPhoneBtnat1" + B)) {
                                parent.document.getElementById("viewPhoneBtnat1" + B).text = "Phone No. Viewed";
                                parent.document.getElementById("viewPhoneBtnat1" + B).className = "contactBtn viewPhoneBtn contactedPhone"
                            }
                            if (parent.document.getElementById("SimViewPhoneBtn" + B)) {
                                parent.document.getElementById("SimViewPhoneBtn" + B).text = "Phone No. Viewed";
                                parent.document.getElementById("SimViewPhoneBtn" + B).className = "viewPhoneBtn btn2 contactedPhone"
                            }
                            if (C != null && C != undefined) {
                                if (typeof checkSimilaronSearch != "undefined" && checkSimilaronSearch == "AA-SimilarPhone") {
                                    if (_gaq) {
                                        _gaq.push(["_trackPageview", "/" + A + "-similar-property-search-send-email-sms-success.html"])
                                    }
                                } else {
                                    if (_gaq) {
                                        _gaq.push(["_trackPageview", A + "property-details-send-email-sms-success.html"]);
                                        if (!(M && M == "N")) {
                                            _gaq.push(["_trackPageview", A + "property-details-send-email-sms-OTP-success.html"])
                                        }
                                    }
                                }
                            } else {
                                if (_gaq) {
                                    _gaq.push(["_trackPageview", A + "property-details-send-email-sms-success.html"]);
                                    if (!(M && M == "N")) {
                                        _gaq.push(["_trackPageview", A + "property-details-send-email-sms-OTP-success.html"])
                                    }
                                }
                            }
                        } else {
                            if (G == 2 && parent.document.getElementById("viewPhoneBtnProject" + B)) {
                                if (parent.document.getElementById("viewPhoneBtnProject" + B)) {
                                    parent.document.getElementById("viewPhoneBtnProject" + B).text = "Phone No. Viewed";
                                    parent.document.getElementById("viewPhoneBtnProject" + B).className = "viewPhoneBtn btn2 contactedPhone"
                                }
                                if (_gaq) {
                                    _gaq.push(["_trackPageview", "more-properties-project-details-send-email-sms-success.html"]);
                                    if (!(M && M == "N")) {
                                        _gaq.push(["_trackPageview", "more_properties-project-details-send-email-sms-OTP-success.html"])
                                    }
                                }
                            }
                        }
                    }
                } else {
                    if (E == "A") {
                        var C = parent.document.getElementById("agentBtn" + B);
                        var H = false;
                        if (C == null || C == undefined) {
                            C = parent.document.getElementById("agentBtnqqq" + B);
                            H = true
                        }
                        if (G == 1 && (parent.document.getElementById("contactBtn" + B) || parent.document.getElementById("agentBtn" + B) || parent.document.getElementById("agentBtnqqq" + B))) {
                            if (C != null && C != undefined) {
                                if (H) {
                                    parent.document.getElementById("agentBtnqqq" + B).text = "Contacted";
                                    parent.document.getElementById("agentBtnqqq" + B).className = "contactBtn agentBtn contactedAgent contactAdv"
                                } else {
                                    parent.document.getElementById("agentBtn" + B).text = "Contacted";
                                    parent.document.getElementById("agentBtn" + B).className = "contactBtn agentBtn contactedAgent contactAdv"
                                }
                                if (_gaq) {
                                    _gaq.push(["_trackPageview", A + "property-details-send-contact-details-success.html"]);
                                    if (!(M && M == "N")) {
                                        _gaq.push(["_trackPageview", A + "property-details-send-contact-details-OTP-success.html"])
                                    }
                                }
                            } else {
                                parent.document.getElementById("contactBtn" + B).text = "Contacted";
                                parent.document.getElementById("contactBtn" + B).className = "contactBtn agentBtn contactedAgent contactAdv";
                                if (_gaq) {
                                    _gaq.push(["_trackPageview", A + "property-details-send-contact-details-success.html"]);
                                    if (!(M && M == "N")) {
                                        _gaq.push(["_trackPageview", A + "property-details-send-contact-details-OTP-success.html"])
                                    }
                                }
                            }
                        } else {
                            if (G == 2 && parent.document.getElementById("viewPhoneBtn" + B)) {
                                parent.document.getElementById("viewPhoneBtn" + B).text = "Phone No. Viewed";
                                parent.document.getElementById("viewPhoneBtn" + B).className = "contactBtn viewPhoneBtn contactedPhone";
                                if (C != null && C != undefined) {
                                    if (_gaq) {
                                        _gaq.push(["_trackPageview", A + "property-details-send-email-sms-success.html"]);
                                        if (!(M && M == "N")) {
                                            _gaq.push(["_trackPageview", A + "property-details-send-email-sms-OTP-success.html"])
                                        }
                                    }
                                } else {
                                    if (_gaq) {
                                        _gaq.push(["_trackPageview", A + "property-details-send-email-sms-success.html"]);
                                        if (!(M && M == "N")) {
                                            _gaq.push(["_trackPageview", A + "property-details-send-email-sms-OTP-success.html"])
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                if (!(typeof D === "undefined") && D) {
                    if (G == 1) {
                        if (_gaq) {
                            _gaq.push(["_trackPageview", "/AM-Contact-success.html"]);
                            if (!(M && M == "N")) {
                                _gaq.push(["_trackPageview", "/AM-Contact-OTP-success.html"])
                            }
                        }
                    } else {
                        if (_gaq) {
                            _gaq.push(["_trackPageview", "/AM-Phone-success.html"]);
                            if (!(M && M == "N")) {
                                _gaq.push(["_trackPageview", "/AM-Phone-OTP-success.html"])
                            }
                        }
                    }
                } else {
                    if (F != null && F != undefined) {
                        var C = parent.document.getElementById("agentBtn" + B);
                        var H = false;
                        if (C == null || C == undefined) {
                            C = parent.document.getElementById("agentBtnqqq" + B);
                            H = true
                        }
                        if (C == null) {
                            C = document.getElementById("agentBtn" + B);
                            H = false
                        }
                        if (G == 1 && (document.getElementById("agentBtn" + B) || parent.document.getElementById("contactBtn" + B) || parent.document.getElementById("agentBtn" + B) || parent.document.getElementById("agentBtnqqq" + B))) {
                            if (C != null && C != undefined) {
                                if (H) {
                                    parent.document.getElementById("agentBtnqqq" + B).text = "Contacted";
                                    parent.document.getElementById("agentBtnqqq" + B).className = "contactBtn agentBtn contactedAgent contactAdv"
                                } else {
                                    if (parent.document.getElementById("agentBtn" + B)) {
                                        parent.document.getElementById("agentBtn" + B).text = "Contacted";
                                        parent.document.getElementById("agentBtn" + B).className = "contactBtn agentBtn contactedAgent contactAdv"
                                    } else {
                                        $("#agentBtn" + B).html("Contacted");
                                        $("#agentBtn" + B).addClass("contactedAgent")
                                    }
                                }
                                if (_gaq) {
                                    _gaq.push(["_trackPageview", "/" + A + "-details-send-contact-details-success.html"]);
                                    if (!(M && M == "N")) {
                                        _gaq.push(["_trackPageview", "/" + A + "-details-send-contact-details-OTP-success.html"])
                                    }
                                }
                            } else {
                                if (_gaq) {
                                    _gaq.push(["_trackPageview", "/" + A + "-search-send-contact-details-success.html"]);
                                    if (!(M && M == "N")) {
                                        _gaq.push(["_trackPageview", "/" + A + "-search-send-contact-details-OTP-success.html"])
                                    }
                                }
                            }
                        } else {
                            if (G == 2 && parent.document.getElementById("viewPhoneBtn" + B)) {
                                if (C != null && C != undefined) {
                                    parent.document.getElementById("viewPhoneBtn" + B).text = "Phone No. Viewed";
                                    parent.document.getElementById("viewPhoneBtn" + B).className = "contactBtn viewPhoneBtn contactedPhone";
                                    if (_gaq) {
                                        _gaq.push(["_trackPageview", "/" + A + "-details-send-email-sms-success.html"]);
                                        if (!(M && M == "N")) {
                                            _gaq.push(["_trackPageview", "/" + A + "-details-send-email-sms-OTP-success.html"])
                                        }
                                    }
                                } else {
                                    if (_gaq) {
                                        _gaq.push(["_trackPageview", "/" + A + "-search-send-email-sms-success.html"]);
                                        if (!(M && M == "N")) {
                                            _gaq.push(["_trackPageview", "/" + A + "-search-send-email-sms-OTP-success.html"])
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        if (_gaq) {
                            if (G == 1) {
                                _gaq.push(["_trackPageview", "/" + A + "-search-send-email-sms-success.html"]);
                                if (!(M && M == "N")) {
                                    _gaq.push(["_trackPageview", "/" + A + "-search-send-email-sms-OTP-success.html"])
                                }
                            } else {
                                _gaq.push(["_trackPageview", "/" + A + "-search-send-contact-details-success.html"]);
                                if (!(M && M == "N")) {
                                    _gaq.push(["_trackPageview", "/" + A + "-search-send-contact-details-OTP-success.html"])
                                }
                            }
                        }
                    }
                }
            }
        }
    } catch (J) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("searchResult", "callFromPropertyDetails", J)
        }
    }
}

function includePropertyContactWindowForDownloadBrochure(A, F, E, G, J, B, K) {
    try {
        var J = arguments[4];
        var I = "/moreContactFormInclude.html";
        var B = "";
        var C = arguments[6];
        if (typeof C != "undefined" && C == "Y") {
            requestMoreDetails = C
        } else {
            requestMoreDetails = "N"
        }
        if (arguments[5] && arguments[5] != null && arguments[5] != undefined) {
            B = arguments[5]
        }
        var L = A;
        if (G == null || G == "") {
            G = "property"
        }
        if (typeof showChat != "undefined" && showChat == "Y") {
            E = "chat"
        }
        if (E == "chat") {
            I = "/chatContactFormInclude.html";
            showChatWindow = "Y"
        } else {
            showChatWindow = "N"
        }
        ajaxService.includePropertyContactWindowForDownloadBrochure(I + "?id=" + A, L, A, G + "|propertySearch|" + F + "|" + J + "|" + B, C, propertySrp, {
            callback: function(N) {
                var M = E + "ContactAgentForm" + A;
                $("#" + M).html(N);
                hideUserTypeForProperty(A);
                ajax_track_comScore(G + "_search_contact_ajax_" + A + E)
            },
            async: true
        });
        if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
            var H = new Number(RegExp.$1);
            if (H <= 7) {
                $(".imagesNavigationInner").css("position", "static");
                $(".imagesNavigation").css("position", "static");
                $("#searchResultWrapper .imagesNavigation span").css("position", "static");
                $(".anythingBase").css("position", "static");
                $(".lessTenRecom").css("position", "static");
                $(".anythingSlider").css("position", "static");
                $(".anythingWindow").css("position", "static")
            }
        }
    } catch (D) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("searchResult", "includePropertyContactWin", D)
        }
    }
}

function includePropertyContactWin(G, D, A, C, F, B, E) {
    _includePropertyContactWin(G, D, A, C, F, B, E, false)
}

function includePropertyContactWinSv(H, D, A, C, G, B, E, F) {
    _includePropertyContactWin(H, D, A, C, G, B, E, F)
}

function _includePropertyContactWin(B, G, F, H, K, C, L, O) {
    try {
        var K = arguments[4];
        var J = "/moreContactFormInclude.html";
        var C = "";
        var D = arguments[6];
        var A = arguments[7];
        if (typeof D != "undefined" && D == "Y") {
            requestMoreDetails = D
        } else {
            requestMoreDetails = "N"
        }
        if (arguments[5] && arguments[5] != null && arguments[5] != undefined) {
            C = arguments[5]
        }
        var N = B;
        if (H == null || H == "") {
            H = "property"
        }
        if (typeof showChat != "undefined" && showChat == "Y") {
            F = "chat"
        }
        var M = "";
        if (O == true) {
            M = "&siteVisit=y"
        }
        if (F == "chat") {
            J = "/chatContactFormInclude.html";
            showChatWindow = "Y"
        } else {
            showChatWindow = "N"
        }
        if (typeof A != "undefined" && A == "newProperySideContact") {
            D = A
        }
        if (typeof isMobile != "undefined" && isMobile == "Y") {
            D = "isMobile"
        }
        ajaxService.includePropertyContactWindow(J + "?id=" + B + M, N, B, H + "|propertySearch|" + G + "|" + K + "|" + C, D, propertySrp, {
            callback: function(Q) {
                var P = F + "ContactAgentForm" + B;
                $("#" + P).html(Q);
                hideUserTypeForProperty(B);
                ajax_track_comScore(H + "_search_contact_ajax_" + B + F)
            },
            async: true
        });
        if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
            var I = new Number(RegExp.$1);
            if (I <= 7) {
                $(".imagesNavigationInner").css("position", "static");
                $(".imagesNavigation").css("position", "static");
                $("#searchResultWrapper .imagesNavigation span").css("position", "static");
                $(".anythingBase").css("position", "static");
                $(".lessTenRecom").css("position", "static");
                $(".anythingSlider").css("position", "static");
                $(".anythingWindow").css("position", "static")
            }
        }
    } catch (E) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("searchResult", "_includePropertyContactWin", E)
        }
    }
}

function includePropertyViewPhoneNumber(L, A, E, V, C) {
    try {
        var B = L;
        var P = arguments[5];
        var R = arguments[6];
        var J = arguments[7];
        var F = readCookie("userName");
        if (F) {
            F = F.replace(/^"(.*)"$/, "$1")
        }
        var K = readCookie("userEmail");
        if (K) {
            K = K.replace(/^"(.*)"$/, "$1")
        }
        var Q = readCookie("userMobileCountry");
        var U = readCookie("userMobile");
        var H = readCookie("userTelCountry");
        var S = readCookie("userTelStCode");
        var G = readCookie("userTel");
        var M = readCookie("userType");
        if (M && M.indexOf(",") > 0) {
            M = M.substring(0, M.indexOf(","))
        }
        var D = "";
        var I = "";
        var O = "";
        if (C == null || C == "") {
            C = "property"
        }
        if (typeof J != "undefined" && J == "masking") {
            R = J
        }
        if (typeof isMobile != "undefined" && isMobile == "Y") {
            R = "isMobile"
        }
        ajaxService.includePropertyContactWindow("/moreViewPhoneNumberInclude.html?id=" + L, B, L, C + "|propertySearchViewPhone|" + A + "|" + P, R, propertySrp, function(Y) {
            var X = E + "AgentPhoneForm" + L;
            $("#" + X).html(Y);
            hideUserTypeForProperty(L);
            ajax_track_comScore(C + "_search_view_phone_ajax_" + L + E);
            if (V == "Y") {
                var W = $("#ownerId" + L).val();
                if (W) {
                    updatePropertyContactViewed(L, Q, U, D, H, S, G, I, "property", O, V, W)
                }
            }
        });
        if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
            var N = new Number(RegExp.$1);
            if (N <= 7) {
                $(".imagesNavigationInner").css("position", "static");
                $(".imagesNavigation").css("position", "static");
                $("#searchResultWrapper .imagesNavigation span").css("position", "static");
                $(".anythingBase").css("position", "static");
                $(".lessTenRecom").css("position", "static");
                $(".anythingSlider").css("position", "static");
                $(".anythingWindow").css("position", "static")
            }
        }
    } catch (T) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("searchResult", "includePropertyViewPhoneNumber", T)
        }
    }
}

function hideUserTypeForProperty(A) {
    try {
        var D = readCookie("userType");
        if (D && D.indexOf(",") > 0) {
            D = D.substring(0, D.indexOf(","))
        }
        var M = readCookie("userName");
        if (M) {
            M = M.replace(/^"(.*)"$/, "$1")
        }
        var C = readCookie("userEmail");
        if (C) {
            C = C.replace(/^"(.*)"$/, "$1")
        }
        var J = readCookie("userMobileCountry");
        var L = readCookie("userMobile");
        var F = readCookie("userTelCountry");
        var K = readCookie("userTelStCode");
        var H = readCookie("userTel");
        var G = document.getElementById("hasNriForm");
        if (G && D) {
            var I = document.getElementsByName("userType" + A);
            if (I != null && D != null && D != "") {
                for (var E = 0; E < I.length; E++) {
                    if (D == "B") {
                        D = "I"
                    }
                    if (D == I[E].value) {
                        I[E].setAttribute("checked", "checked")
                    }
                }
                $("#userTypeField" + A).parent().hide()
            }
        }
        if (M && C && L && D) {
            var I = document.getElementsByName("userType" + A);
            if (I != null && D != null && D != "") {
                for (var E = 0; E < I.length; E++) {
                    if (D == "B") {
                        D = "I"
                    }
                    if (D == I[E].value) {
                        I[E].setAttribute("checked", "checked")
                    }
                }
                $("#userTypeField" + A).parent().hide()
            }
            if ($("#name" + A) && M) {
                $("#name" + A).val(M)
            }
            if ($("#userName" + A) && M) {
                $("#userName" + A).val(M)
            }
            if ($("#userEmail" + A) && C) {
                $("#userEmail" + A).val(C)
            }
            if ($("#selectCountry_mobile_" + A) && J) {
                $("#selectCountry_mobile_" + A).val(J);
                $("#mobile").val($("#selectCountry_mobile_" + A + " option:selected").text())
            }
            if ($("#userMobile" + A) && L) {
                $("#userMobile" + A).val(L)
            }
            if ($("#userTelephoneIsd" + A) && F) {
                $("#userTelephoneIsd" + A).val(F)
            }
            if ($("#userTelephoneStd" + A) && K && K != "undefined") {
                $("#userTelephoneStd" + A).val(K)
            }
            if ($("#userTelephone" + A) && H && H != "undefined") {
                $("#userTelephone" + A).val(H)
            }
            var B = document.getElementsByName("advertisers" + A);
            if (B != null) {
                for (var E = 0; E < B.length; E++) {
                    B[E].setAttribute("checked", "checked")
                }
            }
        }
    } catch (I) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("searchResult", "hideUserTypeForProperty", I)
        }
    }
}

function createSessionCookie(A, B) {
    document.cookie = A + "=" + encodeURIComponent(B) + "; path=/"
}

function contactPropertyNow(C, D, B, A) {
    _contactPropertyNow(false, C, D, B, A)
}

function contactPropertyNowSv(C, D, B, A) {
    _contactPropertyNow(true, C, D, B, A)
}

function _contactPropertyNow(AM, Ap, R, C, Aq) {
    try {
        if (typeof showChatWindow != "undefined" && showChatWindow == "Y") {
            $("#topLoader").hide()
        }
        var AR = document.getElementById("hasNriForm");
        var AK = "";
        if (AR) {
            AK = $("input:radio[name=nriFieldId" + R + "]:checked").val()
        }
        var H = ($("#parentPropType" + R).val() == 9001);
        var g = false;
        var h = document.getElementById("Map");
        checkSimilaronSearch = readCookie("contactTrackCookie");
        $(".sendEmailSMS").hide();
        $("#sendEmailSMSContact" + R).show();
        var N = $("input:radio[name=userType" + R + "]:checked").val();
        var T = $("#name" + R).val();
        if (T == "") {
            T = $("#userName" + R).val()
        }
        var u = $("#userEmail" + R).val();
        var At = $("#userMobile" + R).val();
        var Ab = $("#selectCountry_mobile_" + R).val();
        var AY = document.getElementById("selectMin" + R);
        var AU = document.getElementById("selectMin" + R);
        var F = document.getElementById("homeLoanCheck1" + R);
        var D = document.getElementById("homeLoanCheck2" + R);
        var B = document.getElementById("homeLoanCheck3" + R);
        var Ah = document.getElementById("userTypeCheckText" + R);
        var t = $("#primaryEmail" + R).val();
        var A2 = $("#fromAgent" + R).val();
        if ($("#userPrice" + R).is(":visible") == true) {
            g = true
        }
        var s = readCookie("trackerCookie");
        var n = readCookie("allianceCookie");
        checkCookieBasedMobileVerifcation();
        var J = readCookie("userMobile#" + At);
        if (T) {
            createCookie("userName", T, 2)
        }
        if (u) {
            createCookie("userEmail", u, 2)
        }
        if (At) {
            var AD = readCookie("userMobile");
            if (At == AD) {
                var Ay = readCookie("otpFlage");
                if (Ay == "N") {
                    createCookie("otpFlage", "N", -1);
                    createCookie("verificationFlag", "N", -1)
                }
                createCookie("userMobile", At, 2)
            } else {
                createCookie("otpFlage", "N", -1);
                createCookie("verificationFlag", "N", -1);
                createCookie("userMobile", At, 2)
            }
        }
        if (N) {
            createCookie("userType", N, 2)
        }
        if (Am) {
            createCookie("userTel", Am, 2)
        }
        if (v) {
            createCookie("userTelCountry", v, 2)
        }
        if (A1) {
            createCookie("userTelStCode", A1, 2)
        }
        if (Ab) {
            createCookie("userMobileCountry", Ab, 2)
        }
        if (COOKIEBASEDMOBILEVERIFICATION && At && (J == "" || J == null)) {
            createCookie("userMobile#" + At, "N", 200);
            createCookie("verificationFlag", "N", 2)
        }
        var AN = null;
        var Am;
        var Y = document.getElementById("propertyContactForm");
        getVerificationFlag(R);
        var A8 = readCookie("verificationFlag");
        var d = getAllContactCookiesCount();
        if (Ah) {
            AN = $("#userTypeCheckText" + R).val()
        }
        if ($("#userTelephone" + R)) {
            Am = $("#userTelephone" + R).val()
        }
        var A1;
        if ($("#userTelephoneStd" + R)) {
            A1 = $("#userTelephoneStd" + R).val()
        }
        var AI;
        if ($("#userPrice" + R) && $("#userPrice" + R).val() != "Quote the price you wish to pay") {
            AI = $("#userPrice" + R).val()
        }
        var Ak;
        if ($("#downloadReport" + R)) {
            Ak = $("#downloadReport" + R).val()
        }
        var v;
        if ($("#userTelephoneIsd" + R)) {
            v = $("#userTelephoneIsd" + R).val()
        }
        var l = "";
        if ($("#message" + R)) {
            l = $("#message" + R).val()
        }
        var AZ = "";
        if ($("#loanLead" + R)) {
            AZ = $("#loanLead" + R).is(":checked")
        }
        var Ao = "";
        if ($("#alertchk" + R)) {
            Ao = $("#alertchk" + R).is(":checked")
        }
        var a = [];
        $("#advertisers" + R + ":checked").each(function() {
            a.push($(this).val())
        });
        var E = "";
        if ($("#palnToBuy" + R)) {
            E = $("#palnToBuy" + R).val()
        }
        var O = "propertyCForm" + R;
        var r = "";
        if ($("#contactType" + R)) {
            r = $("#contactType" + R).val()
        }
        var w = "";
        if ($("#campaignCode" + R)) {
            w = $("#campaignCode" + R).val()
        }
        var Ai = "";
        if ($("#ownerId" + R)) {
            Ai = $("#ownerId" + R).val()
        }
        var Aj = "";
        if ($("#actualOwnerId" + R)) {
            Aj = $("#actualOwnerId" + R).val()
        }
        var A5 = "";
        if ($("#projectId" + R)) {
            A5 = $("#projectId" + R).val()
        }
        var q = "";
        if ($("#viewPhoneId" + R)) {
            q = $("#viewPhoneId" + R).val()
        }
        var A = "";
        if ($("#sendMailnSms" + R)) {
            A = $("#sendMailnSms" + R).is(":checked")
        }
        var W = "";
        if ($("#cityCodeId" + R)) {
            W = $("#cityCodeId" + R).val()
        }
        var AO = "";
        if ($("#cityName" + R)) {
            AO = $("#cityName" + R).val()
        }
        var Aw = "";
        if ($("#categoryId" + R)) {
            Aw = $("#categoryId" + R).val()
        }
        var U = "";
        if ($("#localityName" + R)) {
            U = $("#localityName" + R).val()
        }
        var A7 = "";
        if ($("#price" + R)) {
            A7 = $("#price" + R).val()
        }
        var AT = $("#buySell" + R).val();
        var p = "";
        var b = "";
        var An = "";
        var AT = $("#buySell" + R).val();
        var Af = null;
        var Az = null;
        if (q && q == "VIEWCONTACT") {
            Af = null;
            Az = null
        } else {
            Af = "message" + R;
            Az = "messageError" + R
        }
        var o = "";
        if ($("#advMobileId" + R)) {
            o = $("#advMobileId" + R).val()
        }
        var Ac = "";
        if ($("#isdCodeId" + R)) {
            Ac = $("#isdCodeId" + R).val()
        }
        var Al = "";
        if ($("#ubicntId" + R)) {
            Al = $("#ubicntId" + R).val()
        }
        var AW = "";
        var m = "";
        var AJ = "";
        var P = null;
        var AX = null;
        var M = "";
        var L = "";
        var K = "";
        var Aa = "";
        if (F && D && B) {
            if (isCheckedById(F.id)) {
                M = $("#" + F.id).val();
                Aa = Aa + M
            }
            if (isCheckedById(D.id)) {
                L = $("#" + D.id).val();
                if (Aa != "") {
                    Aa = Aa + ","
                }
                Aa = Aa + L
            }
            if (isCheckedById(B.id)) {
                K = $("#" + B.id).val();
                if (Aa != "") {
                    Aa = Aa + ","
                }
                Aa = Aa + K
            }
            if (!Aa) {
                $(".sendEmailSMS").show();
                $("#sendEmailSMSContact" + R).hide();
                $("#interestedIn" + R).text("Please Enter the Interested in Field");
                return false
            } else {
                $("#interestedIn" + R).text("")
            }
        } else {
            if (D && B) {
                if (isCheckedById(D.id)) {
                    L = $("#" + D.id).val();
                    if (Aa != "") {
                        Aa = Aa + ","
                    }
                    Aa = Aa + L
                }
                if (isCheckedById(B.id)) {
                    K = $("#" + B.id).val();
                    if (Aa != "") {
                        Aa = Aa + ","
                    }
                    Aa = Aa + K
                }
            }
        }
        if (AY && AU) {
            P = readCookie("minBudget");
            AX = readCookie("maxBudget");
            if (P && AX) {
                $("#showBudgetDiv").hide()
            } else {
                P = $("#selectMin" + R).val();
                AX = $("#selectMax" + R).val();
                if (P == "-1" || AX == "-1") {
                    $("#budgetError" + R).text("Ple ase Enter the Budget");
                    $(".sendEmailSMS").show();
                    $("#sendEmailSMSContact" + R).hide();
                    return false
                } else {
                    var y = document.getElementById("selectMin" + R).selectedIndex;
                    var x = document.getElementById("selectMax" + R).selectedIndex;
                    if ((x < y) & (x != 0)) {
                        $(".sendEmailSMS").show();
                        $("#sendEmailSMSContact" + R).hide();
                        $("#budgetError" + R).text("Please select a higher value for Max Budget. It cannot be less than the value for Min Budget.");
                        return false
                    } else {
                        $("#budgetError" + R).text("")
                    }
                }
            }
        }
        if (AM && !validateCommonContactFormSv("userType" + R, "name" + R, "userEmail" + R, "userMobile" + R, Af, null, "selectCountry_mobile_" + R, null, null, true, null, O, true, "userTypeError" + R, "userNameError" + R, "userEmailError" + R, "userMobileError" + R, null, Az)) {
            $(".sendEmailSMS").show();
            $("#sendEmailSMSContact" + R).hide();
            if ($("#contactHeader}" + R)) {
                $("#contactHeader" + R).show()
            }
            return false
        } else {
            if (!validateCommonContactForm("userType" + R, "name" + R, "userEmail" + R, "userMobile" + R, Af, null, "selectCountry_mobile_" + R, null, null, true, null, O, true, "userTypeError" + R, "userNameError" + R, "userEmailError" + R, "userMobileError" + R, null, Az)) {
                $(".sendEmailSMS").show();
                $("#sendEmailSMSContact" + R).hide();
                if ($("#contactHeader}" + R)) {
                    $("#contactHeader" + R).show()
                }
                return false
            } else {
                if (AR) {
                    if (!AK && $("#showNriContactFormObj").is(":visible")) {
                        $("#nriFieldIdError" + R).show();
                        $("#sendEmailSMSContact" + R).hide();
                        return false
                    }
                }
                if ($("#isRadiusSearch").val() == "Y") {
                    if (_gaq) {
                        _gaq.push(["_trackEvent", "ContactID= " + R + "SearchLocName = " + $("#searchLocName").val() + "|SearchLocType = " + $("#searchLocType").val() + "|SearchLocTransMode = " + $("#searchTransMode").val() + "|SearchLocTime = " + $("#searchLocTime").val(), "Contact Search Travel Time"])
                    }
                }
                createGaqCookieDataForContact(R, "projectName" + R);
                createSessionCookie("sessionCookieForContact", "Y");
                var As = replaceValueInGaqCookie("sequenceNum", null, "gaqCompleteCookie", "||", "Y");
                replaceValueInGaqCookie("srpContactButtonOpenedSuccess", "Success", "gaqCompleteCookie", "||", "N");
                gaqCookie = readCookieVal("gaqCompleteCookie");
                try {
                    var k = ntrack.getRawDataObject();
                    if (r) {
                        k.contactType = r
                    }
                    k.actualOwnerId = R;
                    k.trackingEvent = ntrack.trackingEvent.Contact;
                    k.Source = ntrack.Source.Web;
                    ntrack.sendRamTrackEvent(k);
                    if (typeof Aq != "undefined" && typeof mobileUpdUrl != "undefined" && Aq == "Y") {
                        ntrack.updateInMobile()
                    }
                } catch (AE) {
                    console.log(AE)
                }
                if (_gaq) {
                    _gaq.push(["_trackEvent", gaqCookie, "Contact Success"])
                }
                replaceValueInGaqCookie("srpContactButtonClick", "", "gaqCompleteCookie", "||", "N");
                replaceValueInGaqCookie("srpContactPropertyId", R, "gaqCompleteCookie", "||", "N");
                replaceValueInGaqCookie("srpContactProjectName", "", "gaqCompleteCookie", "||", "N");
                replaceValueInGaqCookie("srpContactPsmId", "", "gaqCompleteCookie", "||", "N");
                replaceValueInGaqCookie("srpContactButtonOpenedSuccess", "Closed", "gaqCompleteCookie", "||", "N");
                if (typeof srpDetailPageOrNot !== "undefined" && srpDetailPageOrNot == "N") {
                    replaceValueInGaqCookie("srpContactDetailPageView", "N", "gaqCompleteCookie", "||", "N")
                } else {
                    replaceValueInGaqCookie("srpContactDetailPageView", "Y", "gaqCompleteCookie", "||", "N")
                }
                replaceValueInGaqCookie("srpContactPositionOfProperty", "", "gaqCompleteCookie", "||", "N");
                replaceValueInGaqCookie("srpContactBedroom", "", "gaqCompleteCookie", "||", "N");
                replaceValueInGaqCookie("srpContactPropertyType", "", "gaqCompleteCookie", "||", "N");
                replaceValueInGaqCookie("srpContactArea", "", "gaqCompleteCookie", "||", "N");
                replaceValueInGaqCookie("srpContactPrice", "", "gaqCompleteCookie", "||", "N");
                replaceValueInGaqCookie("srpContactNumberOfImages", "", "gaqCompleteCookie", "||", "N");
                replaceValueInGaqCookie("srpContactLocation", "", "gaqCompleteCookie", "||", "N");
                replaceValueInGaqCookie("srpContactDevName", "", "gaqCompleteCookie", "||", "N");
                replaceValueInGaqCookie("srpContactPostedBy", "", "gaqCompleteCookie", "||", "N");
                replaceValueInGaqCookie("srpContactRatePerSqft", "", "gaqCompleteCookie", "||", "N");
                replaceValueInGaqCookie("srpContactProjPropOrNot", "", "gaqCompleteCookie", "||", "N");
                replaceValueInGaqCookie("srpContactTransaction", "", "gaqCompleteCookie", "||", "N");
                replaceValueInGaqCookie("srpContactFurnishingStatus", "", "gaqCompleteCookie", "||", "N");
                replaceValueInGaqCookie("srpContactFloorDetails", "", "gaqCompleteCookie", "||", "N");
                replaceValueInGaqCookie("srpContactBathrooms", "", "gaqCompleteCookie", "||", "N");
                replaceValueInGaqCookie("srpContactPostedDate", "", "gaqCompleteCookie", "||", "N");
                replaceValueInGaqCookie("srpContactVerified", "", "gaqCompleteCookie", "||", "N");
                replaceValueInGaqCookie("srpContactListingType", "", "gaqCompleteCookie", "||", "N");
                replaceValueInGaqCookie("srpContactCompletionScore", "", "gaqCompleteCookie", "||", "N");
                replaceValueInGaqCookie("srpContactUserType", "", "gaqCompleteCookie", "||", "N");
                replaceValueInGaqCookie("srpContactPostedBy", "", "gaqCompleteCookie", "||", "N");
                replaceValueInGaqCookie("srppostedSince", "", "gaqCompleteCookie", "||", "N");
                if ($("#isRadiusSearch").val() == "Y") {
                    if (_gaq) {
                        _gaq.push(["_trackEvent", "GooglePOI View Phone Form Clicked | Place= " + $("#searchLocName").val(), "View Phone Number - Google POI"])
                    }
                }
                if ($("#isRadiusSearch").val() == "Y") {
                    if (_gaq) {
                        _gaq.push(["_trackEvent", "GooglePOI Contact Submitted | Place= " + $("#searchLocName").val(), "Contact Submitted - Google POI"])
                    }
                }
                var Ar = true;
                if (Ar) {
                    var A6 = "";
                    var f = true;
                    var AA = "";
                    $("#advertisers" + R + ":checked").each(function() {
                        AA = AA + $(this).val() + "$"
                    });
                    if (r && r === "agent") {
                        createCookie("idCookieData", "user#" + AA, 2)
                    } else {
                        if (r && r === "property") {
                            createCookie("idCookieData", "pmt#" + AA, 2)
                        } else {
                            if (r && r === "project") {
                                createCookie("idCookieData", "pmt#" + AA, 2)
                            }
                        }
                    }
                    ajaxService.validateRecomContactSender(T + "######" + AN, u, At, Am, {
                        callback: function(e) {
                            A6 = e
                        },
                        async: false
                    });
                    if (A6 && A6 === "Not the verified mobile Number") {
                        f = false;
                        A6 = ""
                    }
                    if (A6 != "undefined" && A6 != null && A6 != "" && A6 != "") {
                        A6 = A6.substring(A6.indexOf("-") + 1);
                        $(".sendEmailSMS").show();
                        $("#sendEmailSMSContact" + R).hide();
                        var AC = limitCheckAlert();
                        if ($(".pupWrap.popContainer").length < 1) {
                            $(AC).prependTo("body")
                        }
                        if (A6 && A6 == "You have reached the limit of making contacts. Please contact after sometime") {
                            if (_gaq) {
                                var AL = document.referrer;
                                var AP = "";
                                if (r && r === "agent") {
                                    AP = "userLimitReached.html|" + At + "|" + u + "|" + T + "|NULL|" + R + "|NULL"
                                } else {
                                    AP = "userLimitReached.html|" + At + "|" + u + "|" + T + "|" + R + "|NULL|NULL"
                                }
                                if (r && r === "agent") {
                                    var Z = document.location.href;
                                    if (Z) {
                                        if (Z.indexOf("getPropertyContactForm.html") != -1) {
                                            AP = AP + "|" + document.referrer
                                        } else {
                                            AP = AP + "|" + document.location.href
                                        }
                                    }
                                } else {
                                    var Z = document.location.href;
                                    if (Z) {
                                        if (Z.indexOf("getPropertyContactForm.html") != -1) {
                                            AP = AP + "|" + document.referrer
                                        } else {
                                            AP = AP + "|" + document.location.href
                                        }
                                    }
                                }
                                _gaq.push(["_trackPageview", AP])
                            }
                        }
                        return false
                    }
                    var A4 = "B";
                    var V = new Object();
                    V.userType = N;
                    V.userName = T;
                    V.userEmail = u;
                    V.userMobile = At;
                    V.userMobileIsd = Ab;
                    V.userTelephone = Am;
                    V.userTelephoneIsd = v;
                    V.message = l;
                    V.loanLead = AZ;
                    V.alert = Ao;
                    V.advertisers = a;
                    V.userTelephoneStd = A1;
                    V.palnToBuy = E;
                    V.contactType = r;
                    V.campaignCode = w;
                    V.projectId = A5;
                    V.actualOwnerId = Aj;
                    V.ownerId = Ai;
                    V.campaignCode = w;
                    V.sendMailnSms = A;
                    V.cityCode = W;
                    V.maxBudget = AX;
                    V.minBudget = P;
                    V.interestedIn = Aa;
                    V.quotePrice = AI;
                    V.downloadReport = Ak;
                    if (AR && $("#showNriContactFormObj").is(":visible")) {
                        V.isNriCheck = AK
                    }
                    if (AM) {
                        V.siteVisit = true;
                        V.svDate = $("#svDate" + R).val();
                        V.svSlot = $("#svSlot" + R).val();
                        V.svVisitor = $("#svVisitor" + R).val();
                        if (V.svDate && V.svSlot) {
                            try {
                                var AG = "";
                                if (V.svSlot == 1) {
                                    AG = "8 am - 10 am"
                                } else {
                                    if (V.svSlot == 2) {
                                        AG = "10 am - 12 pm"
                                    } else {
                                        if (V.svSlot == 3) {
                                            AG = "12 pm - 2 pm"
                                        } else {
                                            if (V.svSlot == 4) {
                                                AG = "2 pm - 4 pm"
                                            } else {
                                                if (V.svSlot == 5) {
                                                    AG = "4 pm - 6 pm"
                                                } else {
                                                    if (V.svSlot == 6) {
                                                        AG = "6 pm - 8 pm"
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                var AQ = new Array(12);
                                AQ[0] = "January ";
                                AQ[1] = "February ";
                                AQ[2] = "March ";
                                AQ[3] = "April ";
                                AQ[4] = "May ";
                                AQ[5] = "June ";
                                AQ[6] = "July ";
                                AQ[7] = "August ";
                                AQ[8] = "September ";
                                AQ[9] = "October ";
                                AQ[10] = "November ";
                                AQ[11] = "December ";
                                var G = (V.svDate).split("/");
                                var AB = G[1] + "/" + G[0] + "/" + G[2];
                                var A3 = new Date(AB);
                                var A0 = A3.getDate();
                                var AS = AQ[A3.getMonth()];
                                var AV = A3.getFullYear();
                                var Ag = "";
                                if (A0 == 1) {
                                    Ag = "st "
                                } else {
                                    if (A0 == 2) {
                                        Ag = "nd "
                                    } else {
                                        if (A0 == 3) {
                                            Ag = "rd "
                                        } else {
                                            Ag = "th "
                                        }
                                    }
                                }
                                $("#svSchTime" + R).html(A0 + Ag + AS + AV + " between " + AG)
                            } catch (AE) {}
                        } else {
                            $("#svSchTime" + R).hide();
                            $(".siteVisitThanksCont .visitText").html("Site Visit Booked Successfully")
                        }
                    }
                }
                if (T) {
                    createCookie("userName", T, 2);
                    createCookieflslider("userNameflSlider", T, 24)
                }
                if (u) {
                    createCookie("userEmail", u, 2);
                    createCookieflslider("userEmailflSlider", u, 24)
                }
                if (At) {
                    createCookie("userMobile", At, 2);
                    createCookieflslider("userMobileflSlider", At, 24)
                }
                if (N) {
                    createCookie("userType", N, 2);
                    createCookieflslider("userTypeflSlider", N, 24)
                }
                if (Am) {
                    createCookie("userTel", Am, 2)
                }
                if (v) {
                    createCookie("userTelCountry", v, 2)
                }
                if (A1) {
                    createCookie("userTelStCode", A1, 2)
                }
                if (Ab) {
                    createCookie("userMobileCountry", Ab, 2);
                    createCookieflslider("userMobileCountryflSlider", Ab, 24)
                }
                if (P && P != "-1") {
                    createCookie("minBudget", P, 2)
                }
                if (AX && AX != "-1") {
                    createCookie("maxBudget", AX, 2)
                }
                var Ad = readCookie("userMobileCountry");
                if (A8 && A8 == "N") {
                    var Ae = true;
                    var X = "";
                    if (R) {
                        X = "contactID:" + R
                    }
                    if (r) {
                        X = X + ";contactType:" + r
                    }
                    X = X + ";";
                    X = X + "m2:m2";
                    if (typeof showChatWindow != "undefined" && showChatWindow == "Y") {
                        X = X + ";";
                        X = X + "chat:Y";
                        if (t != null && T && u) {
                            var Z = "/bricks/load-chat-window.html?from=" + u + "&to=" + t + "&id=" + R + "&userType=" + N + "&Name=" + T;
                            if (typeof A2 != "undefined" && A2 == "Y") {
                                Z = Z + "&fromAgent=" + A2
                            }
                            X = X + ";";
                            X = X + "url:" + Z
                        }
                    }
                    if (d >= 6) {
                        Ae = false
                    }
                    if (q && q == "VIEWCONTACT") {
                        var AC = "";
                        if (typeof Aq != "undefined" && Aq == "Y") {
                            AC = smsMobileVerifcatioDivCode(V.userMobile, V.userName, Ae, "propertySearchResultPage", "viewPhoneNumber", X)
                        } else {
                            AC = smsVerifcatioDivCode(V.userMobile, V.userName, Ae, "propertySearchResultPage", "viewPhoneNumber", X)
                        }
                        $("#propertyViewPhoneDiv" + R).hide("slow");
                        $("#propertyViewPhoneDiv" + R).css("display", "none");
                        $("#imageDiv" + R).css("display", "none");
                        $("#internContactFormUppderDiv" + R).show();
                        $(".siteVisitSection").hide();
                        $("#internContactForm" + R).html(AC);
                        $("#internContactForm" + R).slideDown("slow");
                        if (g) {
                            $("#internContactFormUppderDiv" + R).next(".newSimilarForDetail").hide()
                        }
                        $("#smsNo").focus()
                    } else {
                        var AC = "";
                        if (typeof Aq != "undefined" && Aq == "Y") {
                            AC = smsMobileVerifcatioDivCode(V.userMobile, V.userName, Ae, "propertySearchResultPage", "contactAdvertiser", X)
                        } else {
                            AC = smsVerifcatioDivCode(V.userMobile, V.userName, Ae, "propertySearchResultPage", "contactAdvertiser", X)
                        }
                        $("#propertyContactFormDiv" + R).hide();
                        $("#internContactFormUppderDiv" + R).show();
                        $(".siteVisitSection").hide();
                        $("#internContactForm" + R).html(AC);
                        $("#internContactForm" + R).slideDown("slow");
                        if (g) {
                            $("#internContactFormUppderDiv" + R).next(".newSimilarForDetail").hide()
                        }
                        trackMultiContact(V, A4, C);
                        $("#smsNo").focus()
                    }
                    if (COOKIEBASEDMOBILEVERIFICATION) {
                        saveMobileVerificationData()
                    }
                } else {
                    if ($("#mobileDivP" + R)) {
                        $("#mobileDivP" + R).hide()
                    }
                    if ($("#mobileDivPUP" + R)) {
                        $("#mobileDivPUP" + R).hide()
                    }
                    if (typeof showChatWindow != "undefined" && showChatWindow == "Y") {
                        if (t != null && T && u) {
                            var S = parent.document.getElementById("propContactGreyBox_9");
                            if (typeof S != "undefined") {
                                parent.$("#propContactGreyBox_9,#showMe").hide()
                            } else {
                                $(".contGray").fadeOut(300);
                                $(".contactForms .contactForm.contactAgentForm.formsWrap.chatContactSection").fadeOut(200);
                                $(".actionButton .contactBtn.showChatBtn.activeForm").removeClass("activeForm")
                            }
                            closePropertyContactForm(R);
                            if (typeof showChatWindow != "undefined" && showChatWindow == "Y") {}
                            var Z = "/bricks/load-chat-window.html?from=" + u + "&to=" + t + "&id=" + R + "&userType=" + N + "&Name=" + T;
                            if (typeof A2 != "undefined" && A2 == "Y") {
                                Z = Z + "&fromAgent=" + A2
                            }
                            loadAjaxData(Z, "#chatIconWindow");
                            if ($("#contactHeader") + R) {
                                $("#contactHeader" + R).hide()
                            }
                        }
                    }
                    if (q && q == "VIEWCONTACT") {
                        var Av = null;
                        if (r && r === "agent") {} else {
                            var I = "";
                            var AH = null;
                            if ((rightHandSide != "Y")) {
                                ajaxService.checkWhetherUserHasPropertyorNot(R, T, Ab, N, u, At, AH, {
                                    callback: function(e) {
                                        I = e
                                    },
                                    async: false
                                })
                            }
                            if (r && r === "agent") {} else {
                                ajaxService.checkBrokerConnectCheck(R, N, At, u, {
                                    callback: function(e) {
                                        Av = e
                                    },
                                    async: false
                                })
                            }
                        }
                        if (I) {
                            var A9 = false;
                            A9 = showQuestionTag(R, N, At, u, "firstTime", "");
                            if (A9) {
                                if (Av == "aaCookie") {
                                    $(".newSimilarForDetail").addClass("resetForAppD");
                                    showVisibleClient(R);
                                    $("#userNameText").text(V.userName);
                                    $("#brokerConnectDiv").show();
                                    applogicContact(R)
                                } else {
                                    if (Av == "aiCookie") {
                                        $(".newSimilarForDetail").addClass("resetForAppD");
                                        $("#smartDiaryDiv").show()
                                    } else {
                                        var Q = showNriScreen(R);
                                        if (!Q) {
                                            $("#agentPhoneForm" + R).slideDown("slow");
                                            similarPropertyCall(R);
                                            showVisibleClient(R);
                                            $(".newSimilarForDetail").show()
                                        }
                                    }
                                }
                            }
                        } else {
                            if (Av == "aaCookie") {
                                $(".newSimilarForDetail").addClass("resetForAppD");
                                $("#userNameText").text(V.userName);
                                $("#brokerConnectDiv").show();
                                applogicContact(R)
                            } else {
                                if (Av == "aiCookie") {
                                    $(".newSimilarForDetail").addClass("resetForAppD");
                                    $("#smartDiaryDiv").show()
                                } else {
                                    if (r && r === "agent") {} else {
                                        showBuyRentprofileOnSuccess(R)
                                    }
                                    var Q = showNriScreen(R);
                                    if (!Q) {
                                        $("#agentPhoneForm" + R).slideDown("slow");
                                        similarPropertyCall(R);
                                        showVisibleClient(R);
                                        $(".newSimilarForDetail").show()
                                    }
                                }
                            }
                        }
                        $("#imageDiv" + R).css("display", "none");
                        $("#propertyViewPhoneDiv" + R).slideUp("slow");
                        $("#propertyViewPhoneDiv" + R).css("display", "none");
                        if (C == "N") {
                            updatePropertyContactViewed(R, Ab, At, AW, v, A1, Am, m, "property", AJ, C, Ai)
                        }
                        if (C == "Y") {
                            V.sendMailnSms = "true"
                        }
                        if (showmbrecomendation == true && r != "agent") {
                            loadNewRecommendationForContact(R, "propertySearch", "contactAdvertiser")
                        } else {
                            $("#recomLoaderforviewphone").hide()
                        }
                    } else {
                        if (showmbrecomendation == true && r != "agent") {
                            loadNewRecommendationForContact(R, "propertySearch", "contactAdvertiser")
                        } else {
                            $("#recomLoaderforviewphone").hide()
                        }
                        $("#propertyContactFormDiv" + R).slideUp("slow");
                        var Av = null;
                        var I = "";
                        var AH = null;
                        if (r && r === "agent") {} else {
                            if ((rightHandSide != "Y")) {
                                ajaxService.checkWhetherUserHasPropertyorNot(R, T, Ab, N, u, At, AH, {
                                    callback: function(e) {
                                        I = e
                                    },
                                    async: false
                                })
                            }
                            if (r && r === "agent") {} else {
                                ajaxService.checkBrokerConnectCheck(R, N, At, u, {
                                    callback: function(e) {
                                        Av = e
                                    },
                                    async: false
                                })
                            }
                        }
                        if (I) {
                            var A9 = false;
                            A9 = showQuestionTag(R, N, At, u, "firstTime", "");
                            if (A9) {
                                if (Av == "aaCookie") {
                                    $(".newSimilarForDetail").addClass("resetForAppD");
                                    $("#userNameText").text(V.userName);
                                    $("#brokerConnectDiv").show();
                                    applogicContact(R)
                                } else {
                                    if (Av == "aiCookie") {
                                        $(".newSimilarForDetail").addClass("resetForAppD");
                                        $("#smartDiaryDiv").show()
                                    } else {
                                        if (Ak != null && Ak != "undefined" && Ak == "Y") {
                                            $("#contactForm" + R).slideDown("slow");
                                            $("#downloadReportForm").submit()
                                        } else {
                                            var Q = showNriScreen(R);
                                            if (!Q) {
                                                $("#contactForm" + R).slideDown("slow");
                                                similarPropertyCall(R);
                                                showVisibleClient(R)
                                            }
                                        }
                                    }
                                }
                            }
                        } else {
                            if (Av == "aaCookie") {
                                $(".newSimilarForDetail").addClass("resetForAppD");
                                $("#userNameText").text(V.userName);
                                $("#brokerConnectDiv").show();
                                applogicContact(R)
                            } else {
                                if (Av == "aiCookie") {
                                    $(".newSimilarForDetail").addClass("resetForAppD");
                                    $("#smartDiaryDiv").show()
                                } else {
                                    if (r && r === "agent") {} else {
                                        if (Ak == null || Ak == "undefined" || Ak != "Y") {
                                            showBuyRentprofileOnSuccess(R)
                                        }
                                    }
                                    if (Ak != null && Ak != "undefined" && Ak == "Y") {
                                        $("#contactForm" + R).slideDown("slow");
                                        $("#downloadReportForm").submit()
                                    } else {
                                        var Q = showNriScreen(R);
                                        if (!Q) {
                                            $("#contactForm" + R).slideDown("slow");
                                            similarPropertyCall(R);
                                            showVisibleClient(R)
                                        }
                                    }
                                }
                            }
                        }
                        $("#recomLoaderforcontact").show();
                        $(".openForm .newSimilarForDetail").show();
                        setTimeout(function() {
                            $("#recomLoaderforcontact").hide();
                            $("#fixedRqmtHelpContentforcontact").hide();
                            $("#displayRecommendationsforcontact").show();
                            $("#fixedRqmtRecomSliderforcontact").anythingSlider({
                                expand: true,
                                hashTags: false,
                                autoPlay: true
                            });
                            $("#fixedRqmtRecomSliderforcontact").show();
                            $("#fixedRqmtRecomSliderforcontact").animate({
                                right: "0px"
                            }, "slow")
                        }, 500)
                    }
                    if (!(r && r === "agent")) {
                        pixelfb()
                    }
                    if (!(r && r === "agent")) {
                        setNpsDataForm(R)
                    }
                    if ($("#advMobileId" + R)) {
                        o = $("#advMobileId" + R).val();
                        $(".siteVisitSection").hide();
                        ajaxService.decodeKeywords(o, {
                            callback: function(e) {
                                o = e
                            },
                            async: false
                        })
                    }
                    if (Ab != Al) {
                        if ($("#mobileDivP" + R) && Ac) {
                            $("#mobileDivP" + R).html("<strong>" + Ac + "-" + o + "</strong>")
                        }
                        if ($("#mobileDivPUP" + R) && Ac) {
                            $("#mobileDivPUP" + R).html("<strong>" + Ac + "-" + o + "</strong>")
                        }
                    } else {
                        while (o.indexOf("+91-") != -1) {
                            o = o.replace("+91-", "")
                        }
                        if ($("#mobileDivP" + R) && Ac) {
                            $("#mobileDivP" + R).html("<strong>" + o + "</strong>")
                        }
                        if ($("#mobileDivPUP" + R) && Ac) {
                            $("#mobileDivPUP" + R).html("<strong>" + o + "</strong>")
                        }
                    }
                    if ($("#svmobileDivP" + R)) {
                        $("#svmobileDivP" + R).html("Ph. <span>" + o + "</span>");
                        $("#svmobileDivP" + R).show();
                        $(".siteVisitSection").hide()
                    }
                    if ($("#mobileDivP" + R)) {
                        $("#mobileDivP" + R).html("<strong>" + o + "</strong>");
                        $("#mobileDivP" + R).show()
                    }
                    if ($("#mobileDivPUP" + R)) {
                        $("#mobileDivPUP" + R).html("<strong>" + o + "</strong>");
                        $("#mobileDivPUP" + R).show()
                    }
                    if ($("#maskingNoinContact" + R)) {
                        decodemaskmobilenumber(o, R)
                    }
                }
                if (typeof showChatWindow != "undefined" && showChatWindow == "Y") {
                    V.fromChat = "Y"
                }
                ajaxService.makePropertyContact(V, {
                    callback: function(e) {},
                    async: true
                });
                if ($("#propertyViewPhoneDiv" + R).length > 0) {
                    if (q && q != "VIEWCONTACT") {
                        if (C == "N") {
                            updatePropertyContactViewed(R, Ab, At, AW, v, A1, Am, m, "property", AJ, C, Ai)
                        }
                    }
                    if (C == "Y") {
                        V.sendMailnSms = "true"
                    }
                    trackMultiContact(V, A4, C);
                    for (var y = 0; y < a.length; y++) {
                        if (r == "property" || r == "project") {
                            addContactedToCookie(a[y], 1, "V")
                        } else {
                            if (r == "agent") {
                                addContactedToCookie(a[y], 2, "V")
                            }
                        }
                    }
                    if (typeof showChatWindow != "undefined" && showChatWindow != "Y") {
                        callFromPropertyDetails("2", R, r, A8)
                    }
                }
                if ($("#propertyContactFormDiv" + R).length > 0) {
                    trackMultiContact(V, A4, C);
                    for (var y = 0; y < a.length; y++) {
                        if (r == "property" || r == "project") {
                            addContactedToCookie(a[y], 1, "C")
                        } else {
                            if (r == "agent") {
                                addContactedToCookie(a[y], 2, "C")
                            }
                        }
                    }
                    if (AM) {
                        callFromPropertyDetails("3", R, r, A8)
                    } else {
                        if (typeof showChatWindow != "undefined" && showChatWindow != "Y") {
                            callFromPropertyDetails("1", R, r, A8)
                        }
                    }
                }
                if (typeof showChatWindow != "undefined" && showChatWindow == "Y") {
                    callChatGASection(R, r, A8)
                }
                if (g && $("#internContactFormUppderDiv" + R).is(":visible") == false) {
                    $(".newSimilarForDetail").show()
                }
                addViewedPropertyToCookie(R, 1);
                contactedProperties(R, 1);
                if (typeof contactForSearch != "undefined" && contactForSearch == "Y") {
                    detailsToBeCapturedForContact(R, "propertyContact")
                }
                var AF = "";
                if (Aw != "S") {
                    AF = "Rent"
                } else {
                    AF = "Buy"
                }
                var Au = new Date();
                var z = "c_" + Au.getHours() + ":" + Au.getMinutes() + ":" + Au.getSeconds() + "." + Au.getMilliseconds();
                if (typeof showChatWindow != "undefined" && showChatWindow == "Y") {
                    dataLayer.push({
                        event: "chat"
                    })
                } else {
                    if (r == "" || r == null || r == "property" || r == "project") {
                        dataLayer.push({
                            contact_id: "prop_" + R
                        });
                        dataLayer.push({
                            contact_price: A7
                        });
                        dataLayer.push({
                            contact_city: AO
                        });
                        dataLayer.push({
                            contact_category: Aw
                        });
                        dataLayer.push({
                            contact_locality: U
                        });
                        if (A8 && A8 == "N") {
                            dataLayer.push({
                                type: "otp_thank_you"
                            })
                        } else {
                            dataLayer.push({
                                type: "thank_you"
                            })
                        }
                        dataLayer.push({
                            oid: z
                        });
                        dataLayer.push({
                            op: A7
                        });
                        dataLayer.push({
                            pid: R
                        });
                        dataLayer.push({
                            service_type: AF
                        });
                        dataLayer.push({
                            city: AO
                        });
                        if (s != null && s.indexOf("yahoo") > -1) {
                            dataLayer.push({
                                event: "yahoo_property_contact"
                            })
                        }
                        if (s != null && s.indexOf("google") > -1) {
                            dataLayer.push({
                                event: "google_property_contact"
                            });
                            if (H) {
                                dataLayer.push({
                                    event: "google_commercial_property_contact"
                                })
                            }
                        }
                        if (s != null && s.indexOf("facebook") > -1) {
                            dataLayer.push({
                                event: "facebook_property_contact"
                            })
                        }
                        if (n != null && n.indexOf("yahoo") > -1) {
                            dataLayer.push({
                                event: "yahoo_alliance_property_contact"
                            })
                        } else {
                            dataLayer.push({
                                event: "except_yahoo_alliance_property_contact"
                            })
                        }
                        dataLayer.push({
                            event: "property_contact"
                        });
                        if (!(typeof h === "undefined") && h) {
                            if (q && q == "VIEWCONTACT") {
                                ajax_track_comScore("AM-Phone_Sueccess_" + R + "_confirmation")
                            } else {
                                ajax_track_comScore("AM-Contact_Success_" + R + "_confirmation")
                            }
                        } else {
                            if (q && q == "VIEWCONTACT") {
                                ajax_track_comScore("property_search_view_contact_" + R + "_confirmation")
                            } else {
                                ajax_track_comScore("property_search_contact_ajax_" + R + "_confirmation")
                            }
                        }
                    } else {
                        if (r == "agent") {
                            dataLayer.push({
                                contact_id: R
                            });
                            dataLayer.push({
                                contact_city: AO
                            });
                            dataLayer.push({
                                contact_locality: U
                            });
                            if (s != null && s.indexOf("yahoo") > -1) {
                                dataLayer.push({
                                    event: "yahoo_agent_contact"
                                })
                            }
                            if (s != null && s.indexOf("google") > -1) {
                                dataLayer.push({
                                    event: "google_agent_contact"
                                })
                            }
                            if (s != null && s.indexOf("facebook") > -1) {
                                dataLayer.push({
                                    event: "facebook_agent_contact"
                                })
                            }
                            if (n != null && n.indexOf("yahoo") > -1) {
                                dataLayer.push({
                                    event: "yahoo_alliance_agent_contact"
                                })
                            } else {
                                dataLayer.push({
                                    event: "except_yahoo_alliance_agent_contact"
                                })
                            }
                            dataLayer.push({
                                event: "agent_contact"
                            });
                            if (q && q == "VIEWCONTACT") {
                                ajax_track_comScore("agent_search_view_contact_" + R + "_confirmation")
                            } else {
                                ajax_track_comScore("agent_search_contact_ajax_" + R + "_confirmation")
                            }
                        }
                    }
                }
                if (readCookie("ecParam") == null || readCookie("ecParam") != "Y") {
                    flslideronContact()
                }
            }
        }
        var Ax = document.getElementById("graphInco");
        var c = document.getElementById("rightFixPro");
        if (N == "A" && c) {
            $("#ï¿½ontactQuestionsTag").hide();
            $("#contactTagQuestioSearchResult").hide();
            $("#contactTagQuestioSearchResult").html("");
            $("#rightFixPro").hide();
            $("#rightFixPro").html("")
        }
    } catch (AE) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("searchResult", "_contactPropertyNow", AE)
        }
    }
}

function flslideronContact() {
    try {
        if (readCookie("flsliderPopup") != null && readCookie("flsliderPopup") == "Y" && readCookie("userTypeflSlider") != null && readCookie("userTypeflSlider") == "A") {
            if (readCookie("sliderToShow") != null && readCookie("sliderToShow") == "true") {
                if (readCookie("agentcatg") == "6") {
                    var A = "";
                    A = '<div class="agentSlider" style="z-index:9999999;">';
                    A += '<div class="agentSliderInner">';
                    A += '<div class="successImg"><span class="freeListImg"></span></div>';
                    A += '<div class="successMes">';
                    if (readCookie("userNameflSlider") != "" && readCookie("userNameflSlider") != null) {
                        A += '<div class="congMes">Hi ' + readCookie("userNameflSlider") + "!!</div>"
                    } else {
                        A += '<div class="congMes">Hi User!!</div>'
                    }
                    A += '<div class="freeList">Register with us & get <strong>25 Free Listings</strong></div>';
                    A += '<div><a href="' + SITE_DOMAIN_URL + 'User-Registration1?src=agentslider" onClick="actionTaken();" target="_blank">Register Now</a></div>';
                    A += '<div class="offer">*Limited Period Offer</div>';
                    A += "</div>";
                    A += '<div><a href="javascript:void(0);" class="closeImg" onClick="closeslider();"></a></div>';
                    A += '<div class="clearAll"></div>';
                    A += "</div>";
                    A += "</div>";
                    if ($("#flslider").size() > 0) {
                        if (document.getElementById("flslider") != null) {
                            document.getElementById("flslider").innerHTML = A
                        }
                    } else {
                        if (window.parent.document.getElementById("flslider") != null) {
                            window.parent.document.getElementById("flslider").innerHTML = A
                        }
                    }
                } else {
                    if (readCookie("agentcatg") == "5") {
                        var A = "";
                        A = '<div class="agentSlider" style="z-index:9999999;">';
                        A += '<div class="agentSliderInner">';
                        A += '<div class="successImg"><span class="thumbImg"></span></div>';
                        A += '<div class="successMes">';
                        if (readCookie("userNameflSlider") != "" && readCookie("userNameflSlider") != null) {
                            A += '<div class="congMes">Congratulations ' + readCookie("userNameflSlider") + "!!</div>"
                        } else {
                            A += '<div class="congMes">Congratulations User!!</div>'
                        }
                        A += '<div class="freeList">We\'ve credited <strong>25 Free Listings</strong> to your account</div>';
                        A += '<div><a href="' + POST_PROPERTY_DOMAIN_URL + 'post-property-for-sale-rent/residential-commercial?src=agentslider" onClick="actionTaken();" target="_blank">Start Posting Now</a></div>';
                        A += '<div class="offer">*Limited Period Offer</div>';
                        A += "</div>";
                        A += '<div><a href="javascript:void(0);" class="closeImg" onClick="closeslider();"></a></div>';
                        A += '<div class="clearAll"></div>';
                        A += "</div>";
                        A += "</div>";
                        if ($("#flslider").size() > 0) {
                            if (document.getElementById("flslider") != null) {
                                document.getElementById("flslider").innerHTML = A
                            }
                        } else {
                            if (window.parent.document.getElementById("flslider") != null) {
                                window.parent.document.getElementById("flslider").innerHTML = A
                            }
                        }
                    } else {
                        if (readCookie("agentcatg") == "4" && readCookie("restunitVal") != "0") {
                            var A = "";
                            A = '<div class="agentSlider" style="z-index:9999999;">';
                            A += '<div class="agentSliderInner">';
                            A += '<div class="successImg"><span class="remainListImg"></span></div>';
                            A += '<div class="successMes">';
                            if (readCookie("userNameflSlider") != "" && readCookie("userNameflSlider") != null) {
                                A += '<div class="congMes">Hi ' + readCookie("userNameflSlider") + "!!</div>"
                            } else {
                                A += '<div class="congMes">Hi User!!</div>'
                            }
                            A += '<div class="freeList">You have <strong>' + readCookie("restunitVal") + " Free Listings</strong> left in your account</div>";
                            A += '<div><a href="' + POST_PROPERTY_DOMAIN_URL + 'post-property-for-sale-rent/residential-commercial?src=agentslider" onClick="actionTaken();" target="_blank">Post Property Now</a></div>';
                            A += '<div class="offer">Listing pack valid till ' + readCookie("validate") + "</div>";
                            A += "</div>";
                            A += '<div><a href="javascript:void(0);" class="closeImg" onClick="closeslider();"></a></div>';
                            A += '<div class="clearAll"></div>';
                            A += "</div>";
                            A += "</div>";
                            if ($("#flslider").size() > 0) {
                                if (document.getElementById("flslider") != null) {
                                    document.getElementById("flslider").innerHTML = A
                                }
                            } else {
                                if (window.parent.document.getElementById("flslider") != null) {
                                    window.parent.document.getElementById("flslider").innerHTML = A
                                }
                            }
                        }
                    }
                }
                if ($("#flslider").size() > 0) {
                    if (document.getElementById("flslider") != null) {
                        $("#flslider").show()
                    }
                } else {
                    if (window.parent.document.getElementById("flslider") != null) {
                        $("#flslider", window.parent.document).show()
                    }
                }
            }
        } else {
            if (readCookie("flsliderPopup") != null && readCookie("flsliderPopup") == "N") {} else {
                if (readCookie("userEmailflSlider") != null && readCookie("userEmailflSlider") != "" && readCookie("userTypeflSlider") != null && readCookie("userTypeflSlider") == "A") {
                    ajaxService.checkingAgentCategoryToChooseDesign(readCookie("userNameflSlider"), readCookie("userEmailflSlider"), {
                        callback: function(D) {
                            if (D) {
                                if (D.showslider != null && D.showslider == "true") {
                                    if (D.catg == "6") {
                                        var C = "";
                                        C = '<div class="agentSlider" style="z-index:9999999;">';
                                        C += '<div class="agentSliderInner">';
                                        C += '<div class="successImg"><span class="freeListImg"></span></div>';
                                        C += '<div class="successMes">';
                                        C += '<div class="congMes">Hi ' + D.name + "!!</div>";
                                        C += '<div class="freeList">Register with us & get <strong>25 Free Listings</strong></div>';
                                        C += '<div><a href="' + SITE_DOMAIN_URL + 'User-Registration1?src=agentslider" onClick="actionTaken();" target="_blank">Register Now</a></div>';
                                        C += '<div class="offer">*Limited Period Offer</div>';
                                        C += "</div>";
                                        C += '<div><a href="javascript:void(0);" class="closeImg" onClick="closeslider();"></a></div>';
                                        C += '<div class="clearAll"></div>';
                                        C += "</div>";
                                        C += "</div>";
                                        if ($("#flslider").size() > 0) {
                                            if (document.getElementById("flslider") != null) {
                                                document.getElementById("flslider").innerHTML = C
                                            }
                                        } else {
                                            if (window.parent.document.getElementById("flslider") != null) {
                                                window.parent.document.getElementById("flslider").innerHTML = C
                                            }
                                        }
                                    } else {
                                        if (D.catg == "5") {
                                            var C = "";
                                            C = '<div class="agentSlider" style="z-index:9999999;">';
                                            C += '<div class="agentSliderInner">';
                                            C += '<div class="successImg"><span class="thumbImg"></span></div>';
                                            C += '<div class="successMes">';
                                            C += '<div class="congMes">Congratulations ' + D.name + "!!</div>";
                                            C += '<div class="freeList">We\'ve credited <strong>25 Free Listings</strong> to your account</div>';
                                            C += '<div><a href="' + POST_PROPERTY_DOMAIN_URL + 'post-property-for-sale-rent/residential-commercial?src=agentslider" onClick="actionTaken();" target="_blank">Start Posting Now</a></div>';
                                            C += '<div class="offer">*Limited Period Offer</div>';
                                            C += "</div>";
                                            C += '<div><a href="javascript:void(0);" class="closeImg" onClick="closeslider();"></a></div>';
                                            C += '<div class="clearAll"></div>';
                                            C += "</div>";
                                            C += "</div>";
                                            if ($("#flslider").size() > 0) {
                                                if (document.getElementById("flslider") != null) {
                                                    document.getElementById("flslider").innerHTML = C
                                                }
                                            } else {
                                                if (window.parent.document.getElementById("flslider") != null) {
                                                    window.parent.document.getElementById("flslider").innerHTML = C
                                                }
                                            }
                                            createCookieflslider("totalunitVal", D.totalunit, 24)
                                        } else {
                                            if (D.catg == "4" && D.restunits != "0") {
                                                var C = "";
                                                C = '<div class="agentSlider" style="z-index:9999999;">';
                                                C += '<div class="agentSliderInner">';
                                                C += '<div class="successImg"><span class="remainListImg"></span></div>';
                                                C += '<div class="successMes">';
                                                C += '<div class="congMes">Hi ' + D.name + "!!</div>";
                                                C += '<div class="freeList">You have <strong>' + D.restunits + " Free Listings</strong> left in your account</div>";
                                                C += '<div><a href="' + POST_PROPERTY_DOMAIN_URL + 'post-property-for-sale-rent/residential-commercial?src=agentslider" onClick="actionTaken();" target="_blank">Post Property Now</a></div>';
                                                C += '<div class="offer">Listing pack valid till ' + D.packValiddate + "</div>";
                                                C += "</div>";
                                                C += '<div><a href="javascript:void(0);" class="closeImg" onClick="closeslider();"></a></div>';
                                                C += '<div class="clearAll"></div>';
                                                C += "</div>";
                                                C += "</div>";
                                                if ($("#flslider").size() > 0) {
                                                    if (document.getElementById("flslider") != null) {
                                                        document.getElementById("flslider").innerHTML = C
                                                    }
                                                } else {
                                                    if (window.parent.document.getElementById("flslider") != null) {
                                                        window.parent.document.getElementById("flslider").innerHTML = C
                                                    }
                                                }
                                                createCookieflslider("validate", D.packValiddate, 24);
                                                createCookieflslider("restunitVal", D.restunits, 24)
                                            }
                                        }
                                    }
                                    createCookieflslider("flsliderPopup", "Y", 24);
                                    createCookieflslider("agentcatg", D.catg, 24);
                                    createCookieflslider("sliderToShow", D.showslider, 24);
                                    if ($("#flslider").size() > 0) {
                                        if (document.getElementById("flslider") != null) {
                                            $("#flslider").show()
                                        }
                                    } else {
                                        if (window.parent.document.getElementById("flslider") != null) {
                                            $("#flslider", window.parent.document).show()
                                        }
                                    }
                                }
                            }
                        },
                        async: true
                    })
                }
            }
        }
        if ($("#flslider").size() > 0) {
            setTimeout(function() {
                $(".agentSlider").animate({
                    right: "0"
                }, 500)
            }, 9500)
        } else {
            if (window.parent.document.getElementById("flslider") != null) {
                setTimeout(function() {
                    $(".agentSlider", window.parent.document).animate({
                        right: "0"
                    }, 500)
                }, 9500)
            }
        }
    } catch (B) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("searchResult", "flslideronContact", B)
        }
    }
}

function closeslider() {
    try {
        createCookieflslider("flsliderPopup", "N", 24);
        if ($("#flslider").size() > 0) {
            if (document.getElementById("flslider") != null) {
                $("#flslider").hide()
            }
        } else {
            if (window.parent.document.getElementById("flslider") != null) {
                $("#flslider", window.parent.document).hide()
            }
        }
    } catch (A) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("searchResult", "closeslider", A)
        }
    }
}

function actionTaken() {
    try {
        createCookieflslider("flsliderPopup", "N", 24);
        if ($("#flslider").size() > 0) {
            if (document.getElementById("flslider") != null) {
                $("#flslider").hide()
            }
        } else {
            if (window.parent.document.getElementById("flslider") != null) {
                $("#flslider", window.parent.document).hide()
            }
        }
    } catch (A) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("searchResult", "actionTaken", A)
        }
    }
}

function createCookieflslider(D, E, B) {
    try {
        var A = "";
        if (B) {
            var C = new Date();
            C.setTime(C.getTime() + (B * 60 * 60 * 1000));
            A = "; expires=" + C.toGMTString()
        }
        document.cookie = D + "=" + E + A + "; domain=.magicbricks.com; path=/"
    } catch (F) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("searchResult", "createCookieflslider", F)
        }
    }
}

function isCheckedById(C) {
    try {
        var A = $("#" + C).prop("checked");
        if (A == 0) {
            return false
        } else {
            return true
        }
    } catch (B) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("searchResult", "isCheckedById", B)
        }
        return false
    }
}

function tellMoreLinkClick(B) {
    try {
        $(B).parent("div").hide();
        $(".tellusmore").show()
    } catch (A) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("searchResult", "tellMoreLinkClick", A)
        }
    }
}

function agentChecboxClick(A) {
    if ($(A).find("input").is(":checked")) {
        $(A).removeClass("agentChecboxChecked");
        $(A).find("input").attr("checked", false);
        return false
    } else {
        $(A).addClass("agentChecboxChecked");
        $(A).find("input").attr("checked", true);
        return false
    }
}

function getLocalitySelectVal(B, C) {
    var D = B.options[B.selectedIndex];
    var A = $(D).text();
    $(C).val(A)
}

function updatePropertyContactViewed(I, G, C, F, J, D, E, H, R, K, Q, A) {
    try {
        var L = "";
        var N = "9999999999";
        var B = "";
        if (I && I.length > 0 && I != " ") {
            B = B + "&pid=" + I
        }
        if (G != null && G.length > 0) {
            B = B + "&mobileIsd=" + G
        } else {
            B = B + "&mobileIsd=50"
        }
        if (C != null && C.length > 0) {
            B = B + "&mobile=" + C
        } else {
            B = B + "&mobile=" + N
        }
        if (F != null && F.length > 0) {
            B = B + "&alternatemobile=" + F
        }
        if (J != null && J.length > 0) {
            B = B + "&phoneIsd=" + J
        }
        if (D != null && D.length > 0) {
            B = B + "&phoneStd=" + D
        }
        if (E != null && E.length > 0) {
            B = B + "&phone=" + E
        }
        if (H != null && H.length > 0) {
            B = B + "&pageId=" + H
        }
        if (L != null && L.length > 0) {
            B = B + "&userMobileCountry=" + L
        }
        if (A != null && A.length > 0) {
            B = B + "&oid=" + A
        }
        if (R && R.length > 0 && R != " ") {
            B = B + "&forWhich=" + R;
            if (K && K.length > 0 && K != " ") {
                B = B + "&topEdge=" + K
            }
        }
        B = B + "&Update=Y";
        var M = readCookie("reqposted" + I);
        if (M != null) {
            var P = M.split("<userData>");
            if (P[2] != "undefined" && P[2] != null && P.length == 3) {
                M = parseInt(P[2], 10)
            }
        }
        setTimeout(function() {
            ajaxService.getContactNumberDWR(B, {
                callback: function(S) {},
                async: false
            })
        }, "500");
        if (!(typeof mbRunstats === "undefined") && mbRunstats != null && I && R) {
            mbRunstats.log({
                action: "Phone View",
                actionParam: "ID:" + I + ",TYPE:" + R,
                nav: "L"
            })
        }
    } catch (O) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("searchResult", "updatePropertyContactViewed", O)
        }
    }
}

function trackMultiContact(L, E, C) {
    try {
        var F = false;
        var M = "";
        var G = L.campaignCode;
        if (L) {
            if (L.userName) {
                M += "|userName:" + L.userName
            }
            if (L.userEmail) {
                M += "|userEmail:" + L.userEmail
            }
            if (L.userMobile) {
                M += "|userMobile:" + L.userMobile
            }
            if (L.userTelephone) {
                M += "|userTel:" + L.userTelephone
            }
            var A = new Object();
            var B = false;
            var K = L.contactType;
            if (K && K == "project") {
                K = "Project"
            } else {
                if (K && K == "agent") {
                    K = "Agent"
                }
            }
            if (G && G == "propertySearchViewPhone" && C && C == "N") {
                G = "Get Contact Details-property3";
                if (K && K == "Project") {
                    K = "Property"
                }
            } else {
                if (G && G == "propertySearchViewPhone") {
                    G = "Get Contact Details-property2";
                    if (K && K == "Project") {
                        K = "Property"
                    }
                } else {
                    if (G && G == "propertySearch" && K && K == "Project") {
                        G = "Send Email & Sms-Microsite";
                        K = "Microsite"
                    } else {
                        if (G && G == "propertySearch") {
                            G = "Send Email & Sms-Property"
                        }
                    }
                }
            }
            if (L.advertisers && L.advertisers != "") {
                var H = L.advertisers;
                for (var D in H) {
                    var J = "";
                    A[K] = H[D];
                    B = true;
                    J = M + "|contactType:" + K;
                    J += "|contactFromPage:" + G;
                    if (B == true) {
                        ajaxService.getDescriptionMapByCode(A, {
                            callback: function(R) {
                                if (R) {
                                    var O = new Object();
                                    if (R[K] && R[K] != "") {
                                        O = R[K];
                                        for (var Q in O) {
                                            if (Q && O[Q]) {
                                                var P = O[Q];
                                                var N = J;
                                                if (P.cg) {
                                                    N += "|category:" + P.cg
                                                } else {
                                                    if (E && E != null && E != undefined) {
                                                        N += "|category:" + E
                                                    }
                                                }
                                                if (P.prjName) {
                                                    N += "|projectId:" + P.prjName
                                                } else {
                                                    if ((K.toLowerCase()).indexOf("project") != -1 && L.projectId && L.projectId != "" && L.projectId != undefined && L.projectId != null) {
                                                        N += "|projectId:" + L.projectId
                                                    }
                                                }
                                                if (P.devName) {
                                                    N += "|devName:" + P.devName
                                                }
                                                if (P.bd) {
                                                    N += "|reqBedrooms:" + P.bd
                                                }
                                                if (P.id && ((K.toLowerCase()).indexOf("property") != -1 || (K.toLowerCase()).indexOf("microsite") != -1)) {
                                                    N += "|propertyId:" + P.id
                                                } else {
                                                    if (P.id && ((K.toLowerCase()).indexOf("agent") != -1 || (K.toLowerCase()).indexOf("builder") != -1)) {
                                                        N += "|ownerId:" + P.id
                                                    } else {
                                                        if (L.ownerId && L.ownerId != undefined && L.ownerId != null) {
                                                            N += "|ownerId:" + L.ownerId
                                                        } else {
                                                            if (L.propertyId && L.propertyId != "") {
                                                                N += "|propertyId:" + L.propertyId
                                                            } else {
                                                                if (P.id && ((K.toLowerCase()).indexOf("requirement") != -1)) {
                                                                    N += "|requirementId:" + P.id
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                if (P.utype) {
                                                    N += "|utype:" + P.utype
                                                }
                                                if (P.st) {
                                                    N += "|staterfnum:" + P.st
                                                } else {
                                                    if (R.st) {
                                                        N += "|staterfnum:" + R.st
                                                    }
                                                }
                                                if (P.ct) {
                                                    N += "|cityrfnum:" + P.ct
                                                } else {
                                                    if (R.ct) {
                                                        N += "|cityrfnum:" + R.ct
                                                    }
                                                }
                                                if (P.lt) {
                                                    N += "|localityrfnum:" + P.lt
                                                } else {
                                                    if (R.lt) {
                                                        N += "|localityrfnum:" + R.lt
                                                    }
                                                }
                                                if (P.pt) {
                                                    N += "|propType:" + P.pt
                                                } else {
                                                    if (R.pt) {
                                                        N += "|propType:" + R.pt
                                                    }
                                                }
                                                if (O.oemail) {
                                                    N += "|oemail:" + O.oemail
                                                } else {
                                                    if (R.oemail) {
                                                        N += "|oemail:" + R.oemail
                                                    }
                                                }
                                                if (P.bgmn) {
                                                    N += "|minBudget:" + P.bgmn
                                                } else {
                                                    if (R.bgmn) {
                                                        N += "|minBudget:" + R.bgmn
                                                    }
                                                }
                                                if (P.bgmx) {
                                                    N += "|maxBudget:" + P.bgmx
                                                } else {
                                                    if (R.bgmx) {
                                                        N += "|maxBudget:" + R.bgmx
                                                    }
                                                }
                                                if (P.cfrom) {
                                                    N += "|coveredFrom:" + P.cfrom
                                                }
                                                if (P.cto) {
                                                    N += "|coveredTo:" + P.cto
                                                }
                                                if (!(typeof mbRunstats === "undefined") && N != "") {
                                                    N += "|id:" + Q;
                                                    mbRunstats.log({
                                                        action: "Contact",
                                                        actionParam: N,
                                                        nav: "C"
                                                    });
                                                    captureData(N, "C");
                                                    F = true
                                                }
                                            }
                                        }
                                    } else {
                                        if (R.st) {
                                            J += "|staterfnum:" + R.st
                                        }
                                        if (R.ct) {
                                            J += "|cityrfnum:" + R.ct
                                        }
                                        if (R.lt) {
                                            J += "|localityrfnum:" + R.lt
                                        }
                                        if (R.pt) {
                                            J += "|propType:" + R.pt
                                        }
                                        if (R.bgmn) {
                                            J += "|minBudget:" + R.bgmn
                                        }
                                        if (R.bgmx) {
                                            J += "|maxBudget:" + R.bgmx
                                        }
                                        if (R.bd) {
                                            J += "|reqBedrooms:" + R.bd
                                        }
                                    }
                                }
                            },
                            async: false
                        })
                    }
                    if (F == false && !(typeof mbRunstats === "undefined") && J != "") {
                        J += "|id:" + H[D];
                        mbRunstats.log({
                            action: "Contact",
                            actionParam: J,
                            nav: "C"
                        });
                        captureData(J, "C")
                    }
                }
            }
        }
        return true
    } catch (I) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("searchResult", "trackMultiContact", I)
        }
        return false
    }
}

function setPropCookiesValues(B, C, J, E, G, F, K) {
    try {
        var A = "";
        var L = "";
        if (E != null && E != "undefined" && E.indexOf("-") != "-1") {
            var H = E.indexOf("-");
            E = E.substring(0, H)
        }
        var I = "listType=" + B + "|propType=" + C + "|locality=" + J + "|city=" + E + "|price=" + G + "|minBudget=" + A + "|maxBudget=" + L + "|bedrooms=" + F;
        createMBCookie("mbRecommendationCookies", I, "30");
        createCookie("GDES", K, 2)
    } catch (D) {
        return 1
    }
}

function loadRecommendationsViewPhone(A, B, D, C) {
    try {
        ajaxService.searchRecommendations(A, B, D, C, {
            callback: function(L) {
                var R = "";
                var O = "";
                if (L) {
                    for (var M in L) {
                        var V = "";
                        var U = L[M];
                        if (U.userType != undefined && U.userType != null && U.userType != "") {
                            userType = U.userType
                        }
                        transType = U.transType;
                        if (U.recomType == "MBRecom_Microsite") {
                            var F = "";
                            var N = "";
                            var I = "";
                            var T = "";
                            var S = "";
                            O = U.recomType;
                            F = "<a ";
                            if (U.projectLink && U.projectLink != null && U.projectLink != "" && U.projectLink != "null") {
                                F += "href='" + U.projectLink + "' target='_blank' "
                            }
                            F += "onclick='javascript:updateRecomCounter(" + U.id + ");'>" + U.punchLine + "</a>";
                            if (U.renderProjectPrice == "Y") {
                                if (U.price && U.price != "0" && U.price.length > 0) {
                                    N = "<li> Price: " + U.price + "</li>"
                                } else {
                                    if (U.priceRange && U.priceRange != "0" && U.priceRange.length > 0) {
                                        N = "<li> Price: " + U.priceRange + "</li>"
                                    }
                                }
                            }
                            I = "<li>";
                            var J = false;
                            if (U.bedrooms && U.bedrooms.length > 0) {
                                I += U.bedrooms;
                                J = true
                            }
                            if (U.propertyType && U.propertyType.length > 0) {
                                if (J == true) {
                                    I += ", "
                                }
                                I += U.propertyType + "</li>"
                            }
                            if (U.coveredArea && U.coveredArea.length > 0) {
                                T = "<li> Area: " + U.coveredArea + "</li>"
                            }
                            if (U.companyName && U.companyName.length > 0) {
                                S = "<li> By: " + U.companyName + "</li>"
                            }
                            R += "<li id=" + U.id + " onmouseover='javascript:updateRecomCounter(" + U.id + ", true, false, false);'><div class='wigContent'><div class='wigProjectHeading'>" + F + "</div><div class='wigFeature'> <a ";
                            if (U.landingPgLink && U.landingPgLink != null && U.landingPgLink != "" && U.landingPgLink != "null") {
                                R += "href='" + U.landingPgLink + "' target='_blank' "
                            }
                            R += " onclick='javascript:updateRecomCounter(" + U.id + ",false,true,false);'><ul class='wigPropertyDetail'>" + N + I + T + S + "</ul></a><div class='clear'></div> </div><div class='wigBottomBtn'><a href=Javascript:void(0); onclick=javascript:displayPrsGDESContactForm(" + U.id + "," + U.ownerId + ",'" + O + "','contact'); 'class='conSNow'>Contact Now</a></div></div> <div id='reqpost#" + U.id + "'>" + V + "</div></li>"
                        } else {
                            if (U.recomType == "MBRecom_Property") {
                                var Q = "";
                                var G = "";
                                var P = "";
                                var K = "";
                                var H = "";
                                var T = "";
                                O = U.recomType;
                                if (U.sqFtPrice && U.sqFtPrice.length > 0 && U.covAreaUnit) {
                                    Q = "<li>Price/ " + U.covAreaUnit + ":" + U.sqFtPrice + "</li>"
                                }
                                if (U.transType && U.transType.length > 0) {
                                    K = "<li>Sale Type: " + U.transType + "</li>"
                                }
                                if (U.furnishing && U.furnishing.length > 0) {
                                    H = "<li>Furnishing: " + U.furnishing + "</li>"
                                }
                                if (U.bathroom && U.bathroom.length > 0) {
                                    G = "<li>Bathroom(s): " + U.bathroom + "</li>"
                                }
                                if (U.balconies && U.balconies.length > 0) {
                                    P = "<li>Balconies: " + U.balconies + "</li>"
                                }
                                if (U.coveredArea && U.coveredArea.length > 0 && U.covAreaUnit) {
                                    T = "<li>Covered Area: " + U.coveredArea + " " + U.covAreaUnit + "</li>"
                                }
                                R += "<li id=" + U.id + " onmouseover='javascript:updateRecomCounter(" + U.id + ", true, false, false);'><div class='wigContent'><div class='wigProjectHeading'><a href='" + U.landingPgLink + "' target='_blank' onclick='javascript:updateRecomCounter(" + U.id + ",false,true,false);'>" + U.punchLine + "</a> </div><div class='wigFeature'> <a href='" + U.landingPgLink + "' target='_blank' onclick='javascript:updateRecomCounter(" + U.id + ",false,true,false);'><ul class='wigPropertyDetail'>" + Q + K + H + G + P + T + "</ul></a>";
                                if (U.isVerified && U.isVerified == "Y") {
                                    R += "<img alt='' src='" + imgPath + "mb-rec-verified-icon.gif' align='right' class='verify-recmon'/>"
                                }
                                R += "<div class='clear'></div></div><div class='wigBottomBtn'><a href=Javascript:void(0); onclick=javascript:displayPrsGDESContactForm(" + U.id + "," + U.ownerId + ",'" + O + "','getDetailsOnEmailAndSMS')>Contact Now</a></div> <div id='reqpost#" + U.id + "'>" + V + "</div></li>"
                            } else {
                                if (U.recomType == "MBRecom_TextAd") {
                                    O = U.recomType;
                                    R += "<li id=" + U.id + " onmouseover='javascript:updateRecomCounter(" + U.id + ", true, false, false);'><div class='wigContent'><div class='wigProjectHeading'><a href='" + U.landingPgLink + "' target='_blank' onclick='javascript:updateRecomCounter(" + U.id + ",false,true,false);'>" + U.punchLine + "</a> </div><div class='wigFeature'> <a href='" + U.landingPgLink + "' target='_blank' onclick='javascript:updateRecomCounter(" + U.id + ",false,true,false);'><ul class='wigPropertyDetail'><li>" + U.briefDesc + "</li></ul></a><div class='clear'></div> </div><div class='wigBottomBtn'><a href=Javascript:void(0); onclick=javascript:displayPrsGDESContactForm(" + U.id + "," + U.ownerId + ",'" + O + "','contact') 'class='conSNow' >View Phone No.</a> </div></div>  <div id='reqpost#" + U.id + "'>" + V + "</div></li>"
                                }
                            }
                        }
                    }
                    if ((typeof R === "undefined") || R == null || R == "") {
                        if (document.getElementById("displayRecommendationsforviewphone")) {
                            document.getElementById("displayRecommendationsforviewphone").innerHTML = ""
                        }
                        if (document.getElementById("recomLoaderforviewphone")) {
                            document.getElementById("recomLoaderforviewphone").innerHTML = ""
                        }
                    } else {
                        if (document.getElementById("prsGDESRecomSlider")) {
                            document.getElementById("prsGDESRecomSlider").innerHTML = R
                        }
                    }
                } else {
                    if (document.getElementById("displayRecommendationsforviewphone")) {
                        document.getElementById("displayRecommendationsforviewphone").innerHTML = ""
                    }
                    if (document.getElementById("recomLoaderforviewphone")) {
                        document.getElementById("recomLoaderforviewphone").innerHTML = ""
                    }
                }
            },
            async: false
        })
    } catch (E) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("searchResult", "loadRecommendationsViewPhone", E)
        }
    }
}

function displayPrsGDESContactForm(K, C, D, N) {
    try {
        var L = K;
        var S;
        var F;
        var A = "";
        if (!(typeof D === "undefined") && D != null && D != "" && D != "") {
            if (D == "MBRecom_Microsite") {
                A = "RECOMMICROSITE";
                S = K
            } else {
                if (D == "MBRecom_Property") {
                    A = "RECOMPROP";
                    F = K
                } else {
                    if (D == "MBRecom_TextAd") {
                        A = "RECOMTEXTAD"
                    }
                }
            }
        }
        var M = "<input type='hidden' id='recomContactId" + L + "' value='" + L + "'><input type='hidden' id='recomContactType" + L + "' value='" + A + "'><input type='hidden' id='recomPropertyId" + L + "' value='" + F + "'><input type='hidden' id='recomProjectId" + L + "' value='" + S + "'>";
        var I = "";
        var P = contactFormBeanRecom.userType;
        var J = readCookie("userType");
        if (J) {
            P = J
        }
        if (typeof contactFormBeanRecom.userName === "undefined" || typeof contactFormBeanRecom.userEmail === "undefined" || typeof contactFormBeanRecom.userMobileCountry === "undefined" || typeof contactFormBeanRecom.userMobile === "undefined") {
            var G = readCookie("userName");
            if (G) {
                contactFormBeanRecom.userName = G.replace(/^"(.*)"$/, "$1")
            }
            var E = readCookie("userEmail");
            if (E) {
                contactFormBeanRecom.userEmail = E.replace(/^"(.*)"$/, "$1")
            }
            var R = readCookie("userMobileCountry");
            if (R) {
                contactFormBeanRecom.userMobileCountry = R
            }
            var H = readCookie("userMobile");
            if (H) {
                contactFormBeanRecom.userMobile = H
            }
        }
        if (P != null && P != "") {
            I += "<li class='userType' style='display:none'>"
        } else {
            I += "<li class='mbrecomendUserType'>"
        }
        I += "<label>I am <span class='wigMandatory'>*</span></label>:";
        I += "<input id='RecomReqType1' name='ReqType" + L + "' value='I' ";
        if (P != null && P == "I") {
            I += " checked='checked'"
        }
        I += " type='radio'><label>Individual</label>";
        I += "<input id='RecomReqType2' name='ReqType" + L + "' value='A' ";
        if (P != null && P == "A") {
            I += " checked='checked'"
        }
        I += "type='radio'><label>Agent</label>";
        I += "<input id='RecomReqType3' name='ReqType" + L + "' value='B' ";
        if (P != null && P == "B") {
            I += " checked='checked'"
        }
        I += "type='radio'><label>Builder</label>";
        I += "<span class='err_msg' id='ReqTypeErrorDiv" + L + "' style='display: none;'></span></li>";
        I += "<li class='clearAll mailerLandingClear'></li>";
        if (document.getElementById("prsGDESRecomWrapper")) {
            document.getElementById("prsGDESRecomWrapper").style.display = "none"
        }
        if (document.getElementById("prsGDESWigHeading")) {
            document.getElementById("prsGDESWigHeading").style.display = "none"
        }
        if (document.getElementById("prsGDESContactSuccessDiv")) {
            document.getElementById("prsGDESContactSuccessDiv").innerHTML = '<img align="middle" src="' + imgPath + 'smallLoader.gif" /> <strong>Processing your request. Please wait...</strong>';
            document.getElementById("prsGDESContactSuccessDiv").style.display = "block"
        }
        var Q = readCookie("reqposted" + K);
        if ((Q == null || Q == "") && setRecomContactRelatedData(C, K, D, N) == true) {
            showPrsGDESRecomSuccessDiv(K, D, N, C)
        } else {
            var B = "<a class='wigBackLinkCust' href='javascript:resumeRecomDisplayPrsGDES();'>BACK</a><div class='wigProjectHeading'><u>Fill in your contact details</u></div><div class='wigContactForm'><ul>" + M + I + "<li><label>Name <span class='wigMandatory'>*</span></label>: <input type='text' id='userNameRecom" + L + "' value='" + contactFormBeanRecom.userName + "' maxlength='" + userNameMaxLength + "' class='wigTxtField'></li><li><label>Email <span class='wigMandatory'>*</span></label>: <input type='text' id='userEmailRecom" + L + "' value='" + contactFormBeanRecom.userEmail + "' maxlength='" + userEmailMaxLength + "' class='wigTxtField'></li><li><label>Mobile <span class='wigMandatory'>*</span></label>: " + mbRecomISDCodesHtml(L) + "<input type='text' id='userMobileRecom" + L + "' value='" + contactFormBeanRecom.userMobile + "' maxlength='" + userMobileMaxLength + "' class='wigTxtField'> </li></ul><div class='clear'></div></div><div class='wigBottomBtnRB'><a id='sendcf" + L + "' onclick=if(validateRecomContactForm(" + K + "," + C + ",'" + D + "','" + N + "','')){showPrsGDESRecomSuccessDiv(" + K + ",'" + D + "','" + N + "','" + C + "');}; 'class='fSubmit'>Submit</a></div><div id='mbDisclaimer'>By sending this contact message, you are agreeing to Magicbricks' <a href='http://property.magicbricks.com/terms/terms.html' target='_blank'>Terms of Use</a>.</div>";
            if (document.getElementById("prsGDESContactForm")) {
                document.getElementById("prsGDESContactForm").innerHTML = B;
                document.getElementById("prsGDESContactForm").style.display = "block"
            }
            setTimeout(function() {
                if (document.getElementById("prsGDESContactSuccessDiv")) {
                    document.getElementById("prsGDESContactSuccessDiv").style.display = "none"
                }
            }, "100");
            ajax_track_comScore("mb_recommends_contact_form")
        }
    } catch (O) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("searchResult", "displayPrsGDESContactForm", O)
        }
    }
}

function showPrsGDESRecomSuccessDiv(A, C, H, J) {
    try {
        if (_gaq) {
            var D = "/" + seachVersion + "-send-email-sms-success_mb_recommends.html";
            _gaq.push(["_trackPageview", D])
        }
        var B = "";
        var I = "";
        var G = readCookie("userMobileCountry");
        if (!(G != undefined && G != null && G != "")) {
            G = "50";
            ajaxService.getUsersISDCountry({
                callback: function(K) {
                    G = K
                }
            })
        }
        ajaxService.getRecomOwnerData(A, J, C, G, {
            callback: function(K) {
                if (K) {
                    B = K[0];
                    I = K[1]
                }
            },
            async: false
        });
        if (document.getElementById("prsGDESRecomWrapper")) {
            document.getElementById("prsGDESRecomWrapper").style.display = "none"
        }
        if (document.getElementById("prsGDESContactForm")) {
            document.getElementById("prsGDESContactForm").style.display = "none"
        }
        if (document.getElementById("prsGDESContactSuccessDiv")) {
            document.getElementById("prsGDESContactSuccessDiv").style.display = "block"
        }
        var F = "<div class='wigContent helpContent' id='prsGDESHelpContent'><a class='wigBackLinkCust' href='javascript:resumeRecomDisplayPrsGDES();'>BACK</a><div class='wigProjectHeading normalHeading'>Your contact details have been shared with the advertiser. He will get in touch with you shortly.</div><div class='wigContactInfo'>";
        if (B != "") {
            F += "Advertiser Name : " + B + "<br>"
        }
        if (I != "") {
            F += "Advertiser contact no. : " + I
        }
        F += "</div><div class='wigBottomBtn'><a href='javascript:showNextPrsSlider();' class='showNextRes'>OK, show me next result</a></div>";
        if (document.getElementById("prsGDESContactSuccessDiv")) {
            document.getElementById("prsGDESContactSuccessDiv").style.display = "block"
        }
        setTimeout(function() {
            if (document.getElementById("prsGDESContactSuccessDiv")) {
                document.getElementById("prsGDESContactSuccessDiv").innerHTML = F
            }
        }, "100");
        updateRecomCounter(A, false, false, true);
        addContactedToCookie(A, 1, "V");
        prsTimeOut = setTimeout("showNextPrsSlider()", 30000);
        ajax_track_comScore("mb_recommends_contact_form_success")
    } catch (E) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("searchResult", "showPrsGDESRecomSuccessDiv", E)
        }
    }
}

function showNextPrsSlider() {
    try {
        resumeRecomDisplayPrsGDES();
        $("#prsGDESRecomSlider").anythingSlider(">>");
        if (!(typeof prsTimeOut === "undefined") && prsTimeOut && prsTimeOut != null) {
            clearTimeout(prsTimeOut)
        }
    } catch (A) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("searchResult", "showNextPrsSlider", A)
        }
    }
}
var showResponse;

function captureUserRecomPrefPrsGDES() {
    var B = document.getElementById("prefToSeeRecomPrsGDES").checked;
    var A = document.getElementById("prefToOptOutRecomPrsGDES").checked;
    if (B) {
        resumeRecomDisplayPrsGDES()
    }
    if (A) {
        optOutRecomInSessionPrsGDES()
    }
}

function resumeRecomDisplayPrsGDES() {
    if (document.getElementById("prsGDESRecomWrapper") != null) {
        document.getElementById("prsGDESRecomWrapper").style.display = "block";
        if (document.getElementById("prsGDESWigHeading")) {
            document.getElementById("prsGDESWigHeading").style.display = "block"
        }
        if (document.getElementById("prsGDESContactForm")) {
            document.getElementById("prsGDESContactForm").style.display = "none"
        }
        if (document.getElementById("prsGDESContactSuccessDiv")) {
            document.getElementById("prsGDESContactSuccessDiv").style.display = "none"
        }
        if (document.getElementById("prsGDESHelpContent")) {
            document.getElementById("prsGDESHelpContent").style.display = "none"
        }
    }
}

function showHelpContentPrsGDES() {
    hideAllPrsGDES();
    if (document.getElementById("prsGDESHelpContent")) {
        document.getElementById("prsGDESHelpContent").style.display = "block"
    }
    if (document.getElementById("prsGDESWigHeading")) {
        document.getElementById("prsGDESWigHeading").style.display = "block"
    }
    if (document.getElementById("wigHelpBtnPrsGDES")) {
        document.getElementById("wigHelpBtnPrsGDES").style.display = "none"
    }
}

function hideAllPrsGDES() {
    if (document.getElementById("prsGDESRecomWrapper")) {
        document.getElementById("prsGDESRecomWrapper").style.display = "none"
    }
    if (document.getElementById("prsGDESWigHeading")) {
        document.getElementById("prsGDESWigHeading").style.display = "none"
    }
    if (document.getElementById("prsGDESContactForm")) {
        document.getElementById("prsGDESContactForm").style.display = "none"
    }
    if (document.getElementById("prsGDESContactSuccessDiv")) {
        document.getElementById("prsGDESContactSuccessDiv").style.display = "none"
    }
    if (document.getElementById("prsGDESHelpContent")) {
        document.getElementById("prsGDESHelpContent").style.display = "none"
    }
    if (document.getElementById("wigHelpBtnPrsGDES")) {
        document.getElementById("wigHelpBtnPrsGDES").style.display = "block"
    }
}

function displayFixedRqmtPropertyContactForm(L, D, E, N) {
    var M = L;
    var R;
    var G;
    var C = "";
    if (!(typeof E === "undefined") && E != null && E != "" && E != "") {
        if (E == "MBRecom_Microsite") {
            C = "RECOMMICROSITE";
            R = L
        } else {
            if (E == "MBRecom_Property") {
                C = "RECOMPROP";
                G = L
            } else {
                if (E == "MBRecom_TextAd") {
                    C = "RECOMTEXTAD"
                }
            }
        }
    }
    var A = "<input type='hidden' id='fixedRecomContactId" + M + "' value='" + M + "'><input type='hidden' id='fixedRecomContactType" + M + "' value='" + C + "'><input type='hidden' id='fixedRecomPropertyId" + M + "' value='" + G + "'><input type='hidden' id='fixedRecomProjectId" + M + "' value='" + R + "'>";
    var J = "";
    var O = contactFormBeanRecom.userType;
    var K = readCookie("userType");
    if (K) {
        O = K
    }
    if (typeof contactFormBeanRecom.userName === "undefined" || typeof contactFormBeanRecom.userEmail === "undefined" || typeof contactFormBeanRecom.userMobileCountry === "undefined" || typeof contactFormBeanRecom.userMobile === "undefined") {
        var H = readCookie("userName").replace(/^"(.*)"$/, "$1");
        if (H) {
            contactFormBeanRecom.userName = H
        }
        var F = readCookie("userEmail");
        if (F) {
            F = F.replace(/^"(.*)"$/, "$1");
            contactFormBeanRecom.userEmail = F
        }
        var Q = readCookie("userMobileCountry");
        if (Q) {
            contactFormBeanRecom.userMobileCountry = Q
        }
        var I = readCookie("userMobile");
        if (I) {
            contactFormBeanRecom.userMobile = I
        }
    }
    if (O != null && O != "") {
        J += "<li class='userType' style='display:none'>"
    } else {
        J += "<li class='mbrecomendUserType'>"
    }
    J += "<label>I am <span class='wigMandatory'>*</span></label>:";
    J += "<input id='RecomReqType1' name='ReqType" + M + "' value='I' ";
    if (O != null && O == "I") {
        J += " checked='checked'"
    }
    J += " type='radio'><label>Individual</label>";
    J += "<input id='RecomReqType2' name='ReqType" + M + "' value='A' ";
    if (O != null && O == "A") {
        J += " checked='checked'"
    }
    J += "type='radio'><label>Agent</label>";
    J += "<input id='RecomReqType3' name='ReqType" + M + "' value='B' ";
    if (O != null && O == "B") {
        J += " checked='checked'"
    }
    J += "type='radio'><label>Builder</label>";
    J += "<span class='err_msg' id='ReqTypeErrorDiv" + M + "' style='display: none;'></span></li>";
    if (document.getElementById("fixedRqmtRecomWrapperforcontact")) {
        document.getElementById("fixedRqmtRecomWrapperforcontact").style.display = "none"
    }
    if (document.getElementById("fixedRqmtWigHeadingforcontact")) {
        document.getElementById("fixedRqmtWigHeadingforcontact").style.display = "none"
    }
    if (document.getElementById("fixedRqmtContactSuccessDivforcontact")) {
        document.getElementById("fixedRqmtContactSuccessDivforcontact").innerHTML = '<img align="middle" src="' + imgPath + 'smallLoader.gif" /> <strong>Processing your request. Please wait...</strong>'
    }
    if (document.getElementById("fixedRqmtContactSuccessDivforcontact")) {
        document.getElementById("fixedRqmtContactSuccessDivforcontact").style.display = "block"
    }
    var P = readCookie("reqposted" + L);
    if ((P == null || P == "") && setRecomContactRelatedData(D, L, E, N) == true) {
        showFixedRqmtRecomSuccessDivForContact(L, E, N, D)
    } else {
        var B = "<div class='wigContent helpContent' id='fixedRqmtHelpContentforcontact'><a class='wigBackLinkCust' href='javascript:resumeRecomDisplayFixedRqmtForConatct();'>BACK</a><div class='wigProjectHeading'><u>Fill in your contact details</u></div><div class='wigContactForm'><ul>" + A + J + "<li><label>Name <span class='wigMandatory'>*</span></label>: <input type='text' id='userNameRecom" + M + "' value='" + contactFormBeanRecom.userName + "' maxlength='" + userNameMaxLength + "' class='wigTxtField'></li><li><label>Email <span class='wigMandatory'>*</span></label>: <input type='text' id='userEmailRecom" + M + "' value='" + contactFormBeanRecom.userEmail + "' maxlength='" + userEmailMaxLength + "' class='wigTxtField'></li><li style='width: 270px;'><label>Mobile <span class='wigMandatory'>*</span></label>: " + mbRecomISDCodesHtml(M) + "<input type='text' id='userMobileRecom" + M + "' value='" + contactFormBeanRecom.userMobile + "' maxlength='" + userMobileMaxLength + "' class='wigTxtField'> </li></ul><div class='clear'></div></div><div class='wigBottomBtn'><a id='sendcf" + M + "' onclick=if(validateRecomContactForm(" + L + "," + D + ",'" + E + "','" + N + "','')){showFixedRqmtRecomSuccessDivForContact(" + L + ",'" + E + "','" + N + "','" + D + "');}; 'class='fSubmit'>Submit</a></div>";
        if (document.getElementById("fixedRqmtContactFormforcontact")) {
            document.getElementById("fixedRqmtContactFormforcontact").innerHTML = B;
            document.getElementById("fixedRqmtContactFormforcontact").style.display = "block"
        }
        setTimeout(function() {
            if (document.getElementById("fixedRqmtContactSuccessDivforcontact")) {
                document.getElementById("fixedRqmtContactSuccessDivforcontact").style.display = "none"
            }
        }, "100")
    }
}

function loadRecommendationsForContact(A, B, D, C) {
    try {
        ajaxService.searchRecommendations(A, B, D, C, {
            callback: function(Y) {
                var T = "";
                var I = "";
                if (Y) {
                    for (var W in Y) {
                        var a = Y[W];
                        var L = "";
                        if (a.userType != undefined && a.userType != null && a.userType != "") {
                            userType = a.userType
                        }
                        if (a.id != null && readCookie("reqposted" + a.id) != null && readCookie("reqposted" + a.id) != "") {
                            var K = readCookie("reqposted" + a.id);
                            L = '<div class="contactProperty" style="margin-left:0px; clear:both;">Already contacted this property today </div>';
                            var S = 1000 * 60 * 60 * 24;
                            var c = K.split("<userData>")[1];
                            var M = new Date(c).getTime();
                            var P = new Date().getTime();
                            var R = P - M;
                            var O = Math.round(R / S);
                            if (O != 0) {
                                L = '<div class="contactProperty" style="margin-left:0px; clear:both;">Already contacted this property ' + O + " day(s) Before</div>"
                            }
                        }
                        transType = a.transType;
                        if (a.recomType == "MBRecom_Microsite") {
                            var V = "";
                            var G = "";
                            var J = "";
                            var Q = "";
                            var Z = "";
                            var H = "";
                            I = a.recomType;
                            V = "<a ";
                            if (a.projectLink && a.projectLink != null && a.projectLink != "" && a.projectLink != "null") {
                                V += "href='" + a.projectLink + "' target='_blank' "
                            }
                            V += "onclick='javascript:updateRecomCounter(" + a.id + ");'>" + a.punchLine + "</a>";
                            if (a.renderProjectPrice == "Y") {
                                if (a.price && a.price != "0" && a.price.length > 0) {
                                    G = "<li> Price: " + a.price + "</li>"
                                } else {
                                    if (a.priceRange && a.priceRange != "0" && a.priceRange.length > 0) {
                                        G = "<li> Price: " + a.priceRange + "</li>"
                                    }
                                }
                            }
                            J = "<li>";
                            var U = false;
                            if (a.bedrooms && a.bedrooms.length > 0) {
                                J += a.bedrooms;
                                U = true
                            }
                            if (a.propertyType && a.propertyType.length > 0) {
                                if (U == true) {
                                    J += ", "
                                }
                                J += a.propertyType + "</li>"
                            }
                            if (a.coveredArea && a.coveredArea.length > 0) {
                                Q = "<li> Area: " + a.coveredArea + "</li>"
                            }
                            if (a.companyName && a.companyName.length > 0) {
                                Z = "<li> By: " + a.companyName + "</li>"
                            }
                            if (a.dealDesc && a.dealDesc.length > 0) {
                                H = "<li><div class='sponsorWindDeal'><div class='sponsorWindInnerDeal'><span>" + a.dealDesc + "</span><div></div></li><br>"
                            }
                            T += "<li id=" + a.id + " onmouseover='javascript:updateRecomCounter(" + a.id + ", true, false, false);'><div class='wigContent'><div class='wigProjectHeading'>" + V + "</div><div class='wigFeature'> <a ";
                            if (a.landingPgLink && a.landingPgLink != null && a.landingPgLink != "" && a.landingPgLink != "null") {
                                T += "href='" + a.landingPgLink + "' target='_blank' "
                            }
                            T += "onclick='javascript:updateRecomCounter(" + a.id + ",false,true,false);'><ul class='wigPropertyDetail'>" + H + G + J + Q + Z + "</ul></a><div class='clear'></div> </div><div class='wigBottomBtn'><a href=Javascript:void(0); onclick=javascript:displayFixedRqmtPropertyContactForm(" + a.id + "," + a.ownerId + ",'" + I + "','contact') 'class='conSNow'>Contact Now</a></div></div>  <div id='reqpost#" + a.id + "'>" + L + "</div></li>"
                        } else {
                            if (a.recomType == "MBRecom_Property") {
                                var N = "";
                                var d = "";
                                var b = "";
                                var F = "";
                                var X = "";
                                var Q = "";
                                var H = "";
                                I = a.recomType;
                                if (a.sqFtPrice && a.sqFtPrice.length > 0 && a.covAreaUnit != null) {
                                    N = "<li>Price/ " + a.covAreaUnit + ":" + a.sqFtPrice + "</li>"
                                }
                                if (a.furnishing && a.furnishing.length > 0) {
                                    X = "<li>Furnishing: " + a.furnishing + "</li>"
                                }
                                if (a.transType && a.transType.length > 0) {
                                    F = "<li>Sale Type: " + a.transType + "</li>"
                                }
                                if (a.bathroom && a.bathroom.length > 0) {
                                    d = "<li>Bathroom(s): " + a.bathroom + "</li>"
                                }
                                if (a.balconies && a.balconies.length > 0) {
                                    b = "<li>Balconies: " + a.balconies + "</li>"
                                }
                                if (a.coveredArea && a.coveredArea.length > 0 && a.covAreaUnit) {
                                    Q = "<li>Covered Area: " + a.coveredArea + " " + a.covAreaUnit + "</li>"
                                }
                                if (a.dealDesc && a.dealDesc.length > 0) {
                                    H = "<li><div class='sponsorWindDeal'><div class='sponsorWindInnerDeal'><span>" + a.dealDesc + "</span><div></div></li><br>"
                                }
                                T += "<li id=" + a.id + " onmouseover='javascript:updateRecomCounter(" + a.id + ", true, false, false);'><div class='wigContent'><div class='wigProjectHeading'><a href='" + a.landingPgLink + "' target='_blank' onclick='javascript:updateRecomCounter(" + a.id + ",false,true,false);'>" + a.punchLine + "</a> </div><div class='wigFeature'> <a href='" + a.landingPgLink + "' target='_blank' onclick='javascript:updateRecomCounter(" + a.id + ",false,true,false);'><ul class='wigPropertyDetail'>" + H + N + F + X + d + b + Q + "</ul></a>";
                                if (a.isVerified && a.isVerified == "Y") {
                                    T += "<img alt='' src='" + imgPath + "mb-rec-verified-icon.gif' align='right' class='verify-recmon'/>"
                                }
                                T += "<div class='clear'></div></div><div class='wigBottomBtn'><a href=Javascript:void(0); onclick=javascript:displayFixedRqmtPropertyContactForm(" + a.id + "," + a.ownerId + ",'" + I + "','getDetailsOnEmailAndSMS') >Contact Now</a></div>  <div id='reqpost#" + a.id + "'>" + L + "</div></li>"
                            } else {
                                if (a.recomType == "MBRecom_TextAd") {
                                    I = a.recomType;
                                    T += "<li id=" + a.id + " onmouseover='javascript:updateRecomCounter(" + a.id + ", true, false, false);'><div class='wigContent'><div class='wigProjectHeading'><a href='" + a.landingPgLink + "' target='_blank' onclick='javascript:updateRecomCounter(" + a.id + ",false,true,false);'>" + a.punchLine + "</a> </div><div class='wigFeature'> <a href='" + a.landingPgLink + "' target='_blank' onclick='javascript:updateRecomCounter(" + a.id + ",false,true,false);'><ul class='wigPropertyDetail'><li>" + a.briefDesc + "</li></ul></a><div class='clear'></div> </div><div class='wigBottomBtn'><a href=Javascript:void(0); onclick=javascript:displayFixedRqmtPropertyContactForm(" + a.id + "," + a.ownerId + ",'" + I + "','contact') 'class='conSNow' >View Phone No.</a></div></div> <div id='reqpost#" + a.id + "'>" + L + "</div></li>"
                                }
                            }
                        }
                    }
                    if ((typeof T === "undefined") || T == null || T == "") {
                        if (document.getElementById("displayRecommendationsforcontact")) {
                            document.getElementById("displayRecommendationsforcontact").innerHTML = ""
                        }
                        if (document.getElementById("recomLoaderforcontact")) {
                            document.getElementById("recomLoaderforcontact").innerHTML = ""
                        }
                        if (document.getElementById("recommendationWrapperContactForm")) {
                            document.getElementById("recommendationWrapperContactForm").innerHTML = ""
                        }
                        if (document.getElementById("recommendationWrapperforcontact")) {
                            document.getElementById("recommendationWrapperforcontact").innerHTML = "";
                            document.getElementById("recommendationWrapperforcontact").style.display = "none"
                        }
                    } else {
                        if (document.getElementById("fixedRqmtRecomSliderforcontact")) {
                            document.getElementById("fixedRqmtRecomSliderforcontact").innerHTML = T
                        }
                    }
                } else {
                    if (document.getElementById("displayRecommendationsforcontact")) {
                        document.getElementById("displayRecommendationsforcontact").innerHTML = ""
                    }
                    if (document.getElementById("recomLoaderforcontact")) {
                        document.getElementById("recomLoaderforcontact").innerHTML = ""
                    }
                    if (document.getElementById("recommendationWrapperforcontact")) {
                        document.getElementById("recommendationWrapperforcontact").innerHTML = "";
                        document.getElementById("recommendationWrapperforcontact").style.display = "none"
                    }
                }
            },
            async: false
        })
    } catch (E) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("searchResult", "loadRecommendationsForContact", E)
        }
    }
}

function showFixedRqmtRecomSuccessDivForContact(A, C, H, J) {
    try {
        if (_gaq) {
            var D = "/" + seachVersion + "-send-email-sms-success_mb_recommends.html";
            _gaq.push(["_trackPageview", D])
        }
        var B = "";
        var I = "";
        var K = "Your contact details have been shared with the advertiser. He will get in touch with you shortly.";
        if (!(typeof H === "undefined") && H == "getDetailsOnEmailAndSMS") {
            K = "Advertiser's contact details have been sent on your email id and mobile"
        }
        var G = readCookie("userMobileCountry");
        if (!(G != undefined && G != null && G != "")) {
            G = "50";
            ajaxService.getUsersISDCountry({
                callback: function(L) {
                    G = L
                }
            })
        }
        ajaxService.getRecomOwnerData(A, J, C, G, {
            callback: function(L) {
                if (L) {
                    B = L[0];
                    I = L[1]
                }
            },
            async: false
        });
        if (document.getElementById("fixedRqmtRecomWrapperforcontact")) {
            document.getElementById("fixedRqmtRecomWrapperforcontact").style.display = "none"
        }
        if (document.getElementById("fixedRqmtContactFormforcontact")) {
            document.getElementById("fixedRqmtContactFormforcontact").style.display = "none"
        }
        var F = "<div class='wigContent helpContent' id='fixedRqmtHelpContentforcontact'><a class='wigBackLinkCust' href='javascript:resumeRecomDisplayFixedRqmtForConatct();'>BACK</a><div class='wigProjectHeading normalHeading'>" + K + "</div><div class='wigContactInfo'>";
        if (B != "") {
            F += "Advertiser Name : " + B + "<br>"
        }
        if (I != "") {
            F += "Advertiser contact no. : " + I
        }
        F += "</div><div class='wigBottomBtn'><a href='javascript:showNextFixedSliderForContact();' class='showNextRes'>OK, show me next result</a></div>";
        setTimeout(function() {
            if (document.getElementById("fixedRqmtContactSuccessDivforcontact")) {
                document.getElementById("fixedRqmtContactSuccessDivforcontact").innerHTML = F;
                document.getElementById("fixedRqmtContactSuccessDivforcontact").style.display = "block"
            }
        }, "100");
        updateRecomCounter(A, false, false, true);
        addContactedToCookie(A, 1, "C");
        nextFixedTimeOut = setTimeout("showNextFixedSliderForContact();", 30000)
    } catch (E) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("searchResult", "showFixedRqmtRecomSuccessDivForContact", E)
        }
    }
}

function captureUserRecomPrefFixedRqmtforcontact() {
    var A = document.getElementById("prefToSeeRecomFixedRqmtforcontact").checked;
    var B = document.getElementById("prefToOptOutRecomFixedRqmtforcontact").checked;
    if (A) {
        resumeRecomDisplayFixedRqmtForConatct()
    }
    if (B) {
        optOutRecomInSessionFixedRqmtforcontact()
    }
}

function resumeRecomDisplayFixedRqmtForConatct() {
    if (document.getElementById("fixedRqmtRecomWrapperforcontact")) {
        document.getElementById("fixedRqmtRecomWrapperforcontact").style.display = "block"
    }
    if (document.getElementById("fixedRqmtWigHeadingforcontact")) {
        document.getElementById("fixedRqmtWigHeadingforcontact").style.display = "block"
    }
    if (document.getElementById("fixedRqmtContactFormforcontact")) {
        document.getElementById("fixedRqmtContactFormforcontact").style.display = "none"
    }
    if (document.getElementById("fixedRqmtContactSuccessDivforcontact")) {
        document.getElementById("fixedRqmtContactSuccessDivforcontact").style.display = "none"
    }
    if (document.getElementById("fixedRqmtHelpContentforcontact")) {
        document.getElementById("fixedRqmtHelpContentforcontact").style.display = "none"
    }
}

function showHelpContentFixedRqmtforcontact() {
    hideAllFixedRqmtforcontact();
    if (document.getElementById("fixedRqmtHelpContentforcontact")) {
        document.getElementById("fixedRqmtHelpContentforcontact").style.display = "block"
    }
    if (document.getElementById("fixedRqmtWigHeadingforcontact")) {
        document.getElementById("fixedRqmtWigHeadingforcontact").style.display = "block"
    }
    if (document.getElementById("wigHelpBtnFixedRqmtforcontact")) {
        document.getElementById("wigHelpBtnFixedRqmtforcontact").style.display = "none"
    }
}

function hideAllFixedRqmtforcontact() {
    if (document.getElementById("fixedRqmtRecomWrapperforcontact")) {
        document.getElementById("fixedRqmtRecomWrapperforcontact").style.display = "none"
    }
    if (document.getElementById("fixedRqmtWigHeadingforcontact")) {
        document.getElementById("fixedRqmtWigHeadingforcontact").style.display = "none"
    }
    if (document.getElementById("fixedRqmtContactFormforcontact")) {
        document.getElementById("fixedRqmtContactFormforcontact").style.display = "none"
    }
    if (document.getElementById("fixedRqmtContactSuccessDivforcontact")) {
        document.getElementById("fixedRqmtContactSuccessDivforcontact").style.display = "none"
    }
    if (document.getElementById("fixedRqmtHelpContentforcontact")) {
        document.getElementById("fixedRqmtHelpContentforcontact").style.display = "none"
    }
    if (document.getElementById("wigHelpBtnFixedRqmtforcontact")) {
        document.getElementById("wigHelpBtnFixedRqmtforcontact").style.display = "block"
    }
}

function displayFixedRqmtContactForm(M, D, E, O) {
    try {
        var N = M;
        var T;
        var G;
        var C = "";
        if (!(typeof E === "undefined") && E != null && E != "" && E != "") {
            if (E == "MBRecom_Microsite") {
                C = "RECOMMICROSITE";
                T = M
            } else {
                if (E == "MBRecom_Property") {
                    C = "RECOMPROP";
                    G = M
                } else {
                    if (E == "MBRecom_TextAd") {
                        C = "RECOMTEXTAD"
                    }
                }
            }
        }
        var A = "<input type='hidden' id='fixedRecomContactId" + N + "' value='" + N + "'><input type='hidden' id='fixedRecomContactType" + N + "' value='" + C + "'><input type='hidden' id='fixedRecomPropertyId" + N + "' value='" + G + "'><input type='hidden' id='fixedRecomProjectId" + N + "' value='" + T + "'>";
        var K = "";
        var Q = contactFormBeanRecom.userType;
        var L = readCookie("userType");
        if (L) {
            Q = L
        }
        if (typeof contactFormBeanRecom.userName === "undefined" || typeof contactFormBeanRecom.userEmail === "undefined" || typeof contactFormBeanRecom.userMobileCountry === "undefined" || typeof contactFormBeanRecom.userMobile === "undefined") {
            var H = readCookie("userName");
            if (H) {
                contactFormBeanRecom.userName = H.replace(/^"(.*)"$/, "$1")
            }
            var F = readCookie("userEmail");
            if (F) {
                contactFormBeanRecom.userEmail = F.replace(/^"(.*)"$/, "$1")
            }
            var S = readCookie("userMobileCountry");
            if (S) {
                contactFormBeanRecom.userMobileCountry = S
            }
            var J = readCookie("userMobile");
            if (J) {
                contactFormBeanRecom.userMobile = J
            }
        }
        if (Q != null && Q != "") {
            K += "<li class='userType' style='display:none'>"
        } else {
            K += "<li class='mbrecomendUserType'>"
        }
        K += "<label>I am <span class='wigMandatory'>*</span></label>:";
        K += "<input id='RecomReqType1' name='ReqType" + N + "' value='I' ";
        if (Q != null && Q == "I") {
            K += " checked='checked'"
        }
        K += " type='radio'><label>Individual</label>";
        K += "<input id='RecomReqType2' name='ReqType" + N + "' value='A' ";
        if (Q != null && Q == "A") {
            K += " checked='checked'"
        }
        K += "type='radio'><label>Agent</label>";
        K += "<input id='RecomReqType3' name='ReqType" + N + "' value='B' ";
        if (Q != null && Q == "B") {
            K += " checked='checked'"
        }
        K += "type='radio'><label>Builder</label>";
        K += "<span class='err_msg' id='ReqTypeErrorDiv" + N + "' style='display: none;'></span></li>";
        if (document.getElementById("fixedRqmtRecomWrapperforcontact")) {
            document.getElementById("fixedRqmtRecomWrapperforcontact").style.display = "none"
        }
        if (document.getElementById("fixedRqmtWigHeadingforcontact")) {
            document.getElementById("fixedRqmtWigHeadingforcontact").style.display = "none"
        }
        var I = "<%=Constant.IMAGEROOTURL%>";
        if (document.getElementById("fixedRqmtContactSuccessDivforcontact")) {
            document.getElementById("fixedRqmtContactSuccessDivforcontact").innerHTML = '<img align="middle" src="' + I + 'smallLoader.gif" /> <strong>Processing your request. Please wait...</strong>';
            document.getElementById("fixedRqmtContactSuccessDivforcontact").style.display = "block"
        }
        var R = readCookie("reqposted" + M);
        if ((R == null || R == "") && setRecomContactRelatedData(D, M, E, O) == true) {
            showFixedRqmtRecomSuccessDivForContact(M, E, O, D)
        } else {
            var B = "<div class='wigContent helpContent' id='fixedRqmtHelpContentforcontact'><a class='wigBackLinkCust' href='javascript:resumeRecomDisplayFixedRqmtForConatct();'>BACK</a><div class='wigProjectHeading'><u>Fill in your contact details</u></div><div class='wigContactForm'><ul>" + A + K + "<li><label>Name <span class='wigMandatory'>*</span></label>: <input type='text' id='userNameRecom" + N + "' value='" + contactFormBeanRecom.userName + "' maxlength='" + userNameMaxLength + "' class='wigTxtField'></li><li><label>Email <span class='wigMandatory'>*</span></label>: <input type='text' id='userEmailRecom" + N + "' value='" + contactFormBeanRecom.userEmail + "' maxlength='" + userEmailMaxLength + "' class='wigTxtField'></li><li style='width: 270px;'><label>Mobile <span class='wigMandatory'>*</span></label>: " + mbRecomISDCodesHtml(N) + "<input type='text' id='userMobileRecom" + N + "' value='" + contactFormBeanRecom.userMobile + "' maxlength='" + userMobileMaxLength + "' class='wigTxtField'> </li></ul><div class='clear'></div></div><div class='wigBottomBtn'><a id='sendcf" + N + "' onclick=if(validateRecomContactForm(" + M + "," + D + ",'" + E + "','" + O + "','')){showFixedRqmtRecomSuccessDivForContact(" + M + ",'" + E + "','" + O + "','" + D + "');}; 'class='fSubmit'>Submit</a></div><div id='mbDisclaimer'>By sending this contact message, you are agreeing to Magicbricks' <a href='http://property.magicbricks.com/terms/terms.html' target='_blank'>Terms of Use</a>.</div>";
            if (document.getElementById("fixedRqmtContactFormforcontact")) {
                document.getElementById("fixedRqmtContactFormforcontact").innerHTML = B;
                document.getElementById("fixedRqmtContactFormforcontact").style.display = "block"
            }
            setTimeout(function() {
                if (document.getElementById("fixedRqmtContactSuccessDivforcontact")) {
                    document.getElementById("fixedRqmtContactSuccessDivforcontact").style.display = "none"
                }
            }, "100")
        }
    } catch (P) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("searchResult", "displayFixedRqmtContactForm", P)
        }
    }
}
var nextFixedTimeOut = null;
var propSearchRecomCtr = 0;

function showNextFixedSliderForContact() {
    resumeRecomDisplayFixedRqmtForConatct();
    $("#fixedRqmtRecomSliderforcontact").anythingSlider(">>");
    if (!(typeof nextFixedTimeOut === "undefined") && nextFixedTimeOut && nextFixedTimeOut != null) {
        clearTimeout(nextFixedTimeOut)
    }
}

function loadNewRecommendationForContact(D, A, B) {
    try {
        loadScript(jsPath + "jquery.anythingslider.js", true);
        setTimeout(function() {
            var E = "";
            if ($("#noLabel").length > 0) {
                E = "_noLabel"
            }
            ajaxService.loadPropertySearchResultRecommendation(D, A + E, B, {
                callback: function(G) {
                    var F = G;
                    if (B === "viewPhoneNumber") {
                        $("#recomLoaderforviewphone").hide();
                        if (F.indexOf("noRecords") != -1) {
                            $("#displayRecommendationsforviewphone").hide()
                        } else {
                            $("#displayRecommendationsforviewphone").show();
                            $("#displayRecommendationsforviewphone").html(G)
                        }
                    } else {
                        if (F.indexOf("noRecords") != -1) {
                            if (document.getElementById("fixedRqmtMbRecomforcontact")) {
                                $("#fixedRqmtMbRecomforcontact").html("");
                                $("#recommendationWrapperforcontact").hide()
                            }
                        } else {
                            if (document.getElementById("fixedRqmtMbRecomforcontact")) {
                                $("#recommendationWrapperforcontact").removeAttr("class");
                                $("#fixedRqmtMbRecomforcontact").html(G)
                            }
                        }
                    }
                },
                async: true
            })
        }, 1000)
    } catch (C) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("searchResult.js", "loadNewRecommendationForContact", C)
        }
    }
}

function propertyVideoModalWindow(B) {
    var G = $("#propertyVideo" + B);
    var D = $("#iframeVideo" + B).attr("src");
    if (D.length == 0) {
        $("#iframeVideo" + B).attr("src", $("#iframeVideo" + B).attr("dt"))
    }
    $("#shoshkeleMask").css({
        width: "100%",
        height: "100%",
        position: "fixed"
    });
    $("#shoshkeleMask").fadeTo("slow", 0.6);
    var E = $(window).height() / 2;
    var C = $(window).width() / 2;
    var F = $(G).height() / 2;
    var A = $(G).width() / 2;
    $(G).css({
        position: "fixed"
    });
    $(G).css("top", E - F - 25);
    $(G).css("left", C - A);
    $(G).fadeIn(1)
}

function hideMW(A) {
    var B = document.getElementById("iframeVideo" + A);
    B.src = B.src;
    var C = $("#propertyVideo" + A);
    $("#shoshkeleMask").fadeOut();
    $(C).fadeOut(1)
}

function hideToolTipHelp(B, A) {
    if (A == "yes") {
        if (document.getElementById("tool_tip_help" + B)) {
            document.getElementById("tool_tip_help" + B).style.display = "none"
        }
    } else {
        if (document.getElementById("tool_tip_help" + B)) {
            document.getElementById("tool_tip_help" + B).style.display = ""
        }
    }
}

function sortResultProperty(A) {
    ajax_track_comScore("property_search_sort_by_" + A.replace(" ", ""));
    $("#propertyIds").html("");
    sortBy = A;
    bufferzone = 2000;
    document.getElementById("sortBy").innerHTML = sortBy;
    document.getElementById("groupstart").innerHTML = "0";
    document.getElementById("offset").innerHTML = "0";
    document.getElementById("maxOffset").innerHTML = "0";
    editSearchResults(getUrlStringToSearch(), 1)
}

function showLeaderboardText() {
    $("#minimize").click(function() {
        document.getElementById("leaderBoardDiv").style.display = "block";
        $("#leaderBoard").fadeOut()
    });
    $("#leaderBoardDiv").click(function() {
        eraseCookie("SHOWSEARCHTEXT");
        document.getElementById("leaderBoardDiv").style.display = "none";
        if ($("#maximize")) {
            $("#maximize").fadeOut()
        }
        if ($("#leaderBoard")) {
            $("#leaderBoard").fadeIn()
        }
        if ($("#projectLBpopup")) {
            $("#projectLBpopup").fadeIn()
        }
    });
    if (readCookie("SHOWSEARCHTEXT") == "B") {
        document.getElementById("leaderBoardDiv").style.display = "block"
    }
}

function displayBusinessCard(D, B, E) {
    try {
        var A = "<div align='center' style='padding-top:50px;'><img id='loadingimg' src='" + imgPath + "/smallLoader.gif' alt=''  align='middle'/></div>";
        ajax_showBussinesscard(A, document.getElementById("cardid#" + B));
        ajaxService.showBusinessCard(D, E, {
            callback: function(F) {
                if (F != null) {
                    ajax_showBussinesscard(F, document.getElementById("cardid#" + B));
                    track_comScore("show_business_card")
                }
            },
            async: true
        })
    } catch (C) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("searchResult", "displayBusinessCard", C)
        }
    }
}

function showFeedbackGrayBoxSES(A, B) {
    GB_showCenter("", "/bricks/propertyFeedback.html?propertyId=" + A + "&title=" + B, 450, 460);
    $(".caption").parents("#GB_window").addClass("propertyDetailGreyBox")
}

function loadAgentRecommendation(A) {
    try {
        ajaxService.getResponseFromUrl("/agentRecommendation.html?" + A, {
            callback: function(C) {
                if (C) {
                    if ($("#agentRecommendation")) {
                        $("#agentRecommendation").html(C)
                    }
                }
            }
        })
    } catch (B) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("searchResult", "loadAgentRecommendation", B)
        }
    }
}

function chkMobileVerification(G, E, A) {
    try {
        var F = readCookie("userMobile");
        var I = readCookie("userMobileCountry");
        if (!I) {
            I = $("#selectCountry_mobile_" + A).val()
        }
        var B = readCookie("userMobile#" + F);
        var H = readCookie("otpFlage");
        if (H == "N") {
            createCookie("verificationFlag", "N", -1);
            if (A) {
                var C = "";
                if ($("#contactType" + A)) {
                    C = $("#contactType" + A).val()
                }
                if (isNumber(G) && G && G.length > 0 && (E || F != G)) {
                    ajaxService.chkMobileVerificationP(G, I, A, C, {
                        callback: function(J) {
                            if (J) {
                                setDatainFields(J, A)
                            }
                        },
                        async: false
                    })
                }
            }
        } else {
            if (COOKIEBASEDMOBILEVERIFICATION && B == "N") {
                createCookie("verificationFlag", "N", 2)
            } else {
                if (A) {
                    if (isNumber(G) && G && G.length > 0 && (E || F != G)) {
                        var C = "";
                        if ($("#contactType" + A)) {
                            C = $("#contactType" + A).val()
                        }
                        ajaxService.chkMobileVerificationP(G, I, A, C, {
                            callback: function(J) {
                                if (J.verificationFlag && J.verificationFlag == true) {
                                    createCookie("verificationFlag", "Y", 2)
                                } else {
                                    createCookie("verificationFlag", "N", 2)
                                }
                                if (J) {
                                    setDatainFields(J, A)
                                }
                            },
                            async: false
                        })
                    }
                } else {
                    if (isNumber(G) && G && G.length > 0 && (E || F != G) && H != "N") {
                        ajaxService.chkMobileVerification(G, I, {
                            callback: function(J) {
                                if (J.verificationFlag && J.verificationFlag == true) {
                                    createCookie("verificationFlag", "Y", 2)
                                } else {
                                    createCookie("verificationFlag", "N", 2)
                                }
                            },
                            async: false
                        })
                    }
                }
            }
        }
    } catch (D) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("searchResult", "chkMobileVerification", D)
        }
    }
}

function isNumber(B) {
    var A = /^\d+$/;
    return A.test(B)
}
$("#photoIframeForm .clsoeIfContact").on("click", function() {
    $("#photoIframeForm").css("display", "none");
    $("#GB_overlay").css("z-index", "1000")
});
$(".srpBlock .crisilTT").live("mouseenter", function() {
    $(this).show()
});
$(".srpBlock .crisilTT").live("mouseleave", function() {
    $(this).hide()
});
$(".srpBlockListRow .crisilTT").live("mouseenter", function() {
    $(this).show()
});
$(".srpBlockListRow .crisilTT").live("mouseleave", function() {
    $(this).hide()
});
$(function() {
    try {
        $(".threeNhalfAdBannerSlider").anythingSlider({
            buildStartStop: false,
            buildNavigation: false,
            infiniteSlides: false,
            stopAtEnd: true,
            hashTags: false
        })
    } catch (A) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("searchResult.js", "threeNhalfAdBannerSlider", A)
        }
        return false
    }
});

function submitFormTrack(C, G) {
    var B = 994415509;
    var I = "en";
    var A = "2";
    var H = "ffffff";
    var E = "FF6vCMWr_FcQlaeW2gM";
    var F = false;
    try {
        trackAdWordsConversionTrack(G);
        trackYahooMarketing();
        return false
    } catch (D) {
        return true
    }
}
var Goal = function(B, A) {
    this.id = B;
    this.label = A
};

function trackAdWordsConversionTrack(C) {
    var B = document.createElement("img");
    var A = "http://www.googleadservices.com/pagead/conversion/" + C.id;
    A += "/?label=" + C.label;
    A += "&guid=ON&script=0";
    B.src = A;
    document.body.appendChild(B)
}

function trackYahooMarketing() {
    var A = document.createElement("iframe");
    A.src = "/bricks/yahooMarketing.jsp";
    A.scrolling = "no";
    A.width = 1;
    A.height = 1;
    A.marginheight = 0;
    A.marginwidth = 0;
    A.frameborder = 0;
    document.body.appendChild(A);
    A.style = "display: none;"
}

function getISDVal(B, C) {
    var A = B.options[B.selectedIndex].text;
    $(C).val(A)
}

function validateField(C, E, G, B) {
    var A = null;
    var D = null;
    if (B && B == "VIEWCONTACT") {
        A = null;
        D = null
    } else {
        A = "message" + G;
        D = "messageError" + G
    }
    var F = "propertyCForm" + G;
    if ("name" + G == C) {
        if (!validateCommonContactForm("", C, "", "", A, null, "", null, null, true, null, F, true, "", E, "", "", null, D)) {
            return false
        }
    } else {
        if ("userMobile" + G == C) {
            if (!validateCommonContactForm("", "", "", C, A, null, "selectCountry_mobile_" + G, null, null, true, null, F, true, "", "", "", E, null, D)) {
                return false
            }
        } else {
            if ("userEmail" + G == C) {
                if (!validateCommonContactForm("", "", C, "", A, null, "", null, null, true, null, F, true, "", "", E, "", null, D)) {
                    return false
                }
            }
        }
    }
}

function detailViewTrack(D) {
    var A = new Object();
    var B = "Property";
    A[B] = D;
    try {
        ajaxService.getDescriptionMapByCode(A, {
            callback: function(I) {
                if (I) {
                    var F = new Object();
                    if (I[B] && I[B] != "") {
                        F = I[B];
                        for (var H in F) {
                            if (H && F[H]) {
                                var G = F[H];
                                var E = "";
                                if (G.cg) {
                                    E += "|category:" + G.cg
                                } else {
                                    if (I.cg) {
                                        E += "|category:" + I.cg
                                    }
                                }
                                if (G.bd) {
                                    E += "|reqBedrooms:" + G.bd
                                }
                                if (G.id && ((B.toLowerCase()).indexOf("property") != -1 || (B.toLowerCase()).indexOf("microsite") != -1)) {
                                    E += "|propertyId:" + G.id
                                }
                                if (G.ct) {
                                    E += "|cityrfnum:" + G.ct
                                } else {
                                    if (I.ct) {
                                        E += "|cityrfnum:" + I.ct
                                    }
                                }
                                if (G.lt) {
                                    E += "|localityrfnum:" + G.lt
                                } else {
                                    if (I.lt) {
                                        E += "|localityrfnum:" + I.lt
                                    }
                                }
                                if (G.pt) {
                                    E += "|propType:" + G.pt
                                } else {
                                    if (I.pt) {
                                        E += "|propType:" + I.pt
                                    }
                                }
                                if (G.bgmn) {
                                    E += "|minBudget:" + G.bgmn
                                } else {
                                    if (I.bgmn) {
                                        E += "|minBudget:" + I.bgmn
                                    }
                                }
                                if (G.bgmx) {
                                    E += "|maxBudget:" + G.bgmx
                                } else {
                                    if (I.bgmx) {
                                        E += "|maxBudget:" + I.bgmx
                                    }
                                }
                                E += "|id:" + H;
                                captureData(E, "C")
                            }
                        }
                    }
                }
            },
            async: false
        });
        return true
    } catch (C) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("searchResult.js", "detailViewTrack", C)
        }
        return false
    }
}

function createGaqCookieDataForContact(H, E) {
    if (readCookieVal("gaqCompleteCookie") == null) {
        var G = createGaqStringForHome(1, "localityName");
        createCookieExpiresInTimeInDays("gaqCompleteCookie", G, 200)
    }
    replaceValueInGaqCookie("srpContactButtonClick", "Y", "gaqCompleteCookie", "||", "N");
    replaceValueInGaqCookie("universalTimestamp", "" + new Date(), "gaqCompleteCookie", "||", "N");
    replaceValueInGaqCookie("srpContactPropertyId", H, "gaqCompleteCookie", "||", "N");
    replaceValueInGaqCookie("srpContactProjectName", E, "gaqCompleteCookie", "||", "N");
    replaceValueInGaqCookie("srpContactPsmId", $("#projectId" + H).val(), "gaqCompleteCookie", "||", "N");
    replaceValueInGaqCookie("srpContactButtonOpenedSuccess", "Opened", "gaqCompleteCookie", "||", "N");
    if (typeof srpDetailPageOrNot !== "undefined" && srpDetailPageOrNot == "N") {
        replaceValueInGaqCookie("srpContactDetailPageView", "N", "gaqCompleteCookie", "||", "N")
    } else {
        replaceValueInGaqCookie("srpContactDetailPageView", "Y", "gaqCompleteCookie", "||", "N")
    }
    var A = $("#propPosition" + H).html();
    var C = $("#pageNo" + H).html();
    if (typeof A !== "undefined" && typeof C !== "undefined" && A != null && C != null) {
        A = A.trim();
        C = C.trim();
        var D = ((parseInt(A)) + ((parseInt(C) - 1) * 20));
        A = "" + D;
        replaceValueInGaqCookie("srpContactPositionOfProperty", A, "gaqCompleteCookie", "||", "N")
    } else {
        replaceValueInGaqCookie("srpContactPositionOfProperty", $("#propPosition" + H).html(), "gaqCompleteCookie", "||", "N")
    }
    replaceValueInGaqCookie("srpContactBedroom", $("#bedroomVal" + H).val(), "gaqCompleteCookie", "||", "N");
    replaceValueInGaqCookie("srpContactPropertyType", $("#propertyTypeCode" + H).val(), "gaqCompleteCookie", "||", "N");
    replaceValueInGaqCookie("srpContactArea", $("#propertyArea" + H).val(), "gaqCompleteCookie", "||", "N");
    var F = $("#pricePropertyVal" + H).html();
    if (typeof F !== "undefined" && F != null && F.indexOf("<") < 0) {
        replaceValueInGaqCookie("srpContactPrice", F.trim(), "gaqCompleteCookie", "||", "N")
    }
    var B = $("#imageCountProperty" + H).html();
    if (typeof B !== "undefined" && B != null && B.indexOf("<") < 0) {
        replaceValueInGaqCookie("srpContactNumberOfImages", B.trim(), "gaqCompleteCookie", "||", "N")
    }
    replaceValueInGaqCookie("srpContactLocation", $("#localityName" + H).html(), "gaqCompleteCookie", "||", "N");
    replaceValueInGaqCookie("srpContactDevName", $("#devName" + H).val(), "gaqCompleteCookie", "||", "N");
    replaceValueInGaqCookie("srpContactRatePerSqft", $("#sqrFtPriceField" + H).html(), "gaqCompleteCookie", "||", "N");
    replaceValueInGaqCookie("srpContactProjPropOrNot", $("#isProject" + H).val(), "gaqCompleteCookie", "||", "N");
    replaceValueInGaqCookie("srpContactTransaction", $("#transactionType" + H).val(), "gaqCompleteCookie", "||", "N");
    replaceValueInGaqCookie("srpContactFurnishingStatus", $("#furnshingStatus" + H).val(), "gaqCompleteCookie", "||", "N");
    replaceValueInGaqCookie("srpContactFloorDetails", $("#floorNo" + H).val(), "gaqCompleteCookie", "||", "N");
    replaceValueInGaqCookie("srpContactBathrooms", $("#bathroom" + H).val(), "gaqCompleteCookie", "||", "N");
    replaceValueInGaqCookie("srpContactPostedDate", $("#postedSince" + H).html(), "gaqCompleteCookie", "||", "N");
    replaceValueInGaqCookie("srpContactVerified", $("#isVerified" + H).val(), "gaqCompleteCookie", "||", "N");
    replaceValueInGaqCookie("srpContactListingType", $("#pkg" + H).val(), "gaqCompleteCookie", "||", "N");
    replaceValueInGaqCookie("srpContactCompletionScore", $("#completionScore" + H).val(), "gaqCompleteCookie", "||", "N");
    replaceValueInGaqCookie("srpContactUserType", $("#userType" + H).val(), "gaqCompleteCookie", "||", "N");
    replaceValueInGaqCookie("srpContactPostedBy", $("#agentDetail" + H).html(), "gaqCompleteCookie", "||", "N");
    replaceValueInGaqCookie("srppostedSince", $("#postedSince" + H).html(), "gaqCompleteCookie", "||", "N");
    replaceValueInGaqCookie("universalTimestamp", "" + new Date(), "gaqCompleteCookie", "||", "N")
}

function openBannerURL(B) {
    var A = $(B).attr("data-url");
    window.open(A, "_blank")
}

function trackSearchResultDetails(B, A, F, C, E) {
    var D = "/bricks/ajax/updateSearchDetails.json?pageNo=" + B + "&position=" + A + "&propertyId=" + F + "&type=" + C + "&city=" + E;
    $.ajax({
        url: D,
        success: function(G) {}
    })
}

function showSavedProperties() {
    var B = new RegExp("sshp([^\\s]*)");
    var C = (" " + document.cookie).match(B).split(";");
    for (var A = 0; A < C.length; A++) {
        alert(A + "element " + C[A])
    }
}
$(function() {
    $(".jcarousel").jcarousel({
        animation: "slow"
    });
    $(".jcarousel-control-prev").on("jcarouselcontrol:active", function() {
        $(this).removeClass("inactive")
    }).on("jcarouselcontrol:inactive", function() {
        $(this).addClass("inactive")
    }).jcarouselControl({
        target: "-=6"
    });
    $(".jcarousel-control-next").on("jcarouselcontrol:active", function() {
        $(this).removeClass("inactive")
    }).on("jcarouselcontrol:inactive", function() {
        $(this).addClass("inactive")
    }).jcarouselControl({
        target: "+=6"
    });
    $(".jcarousel-pagination").on("jcarouselpagination:active", "a", function() {
        $(this).addClass("active")
    }).on("jcarouselpagination:inactive", "a", function() {
        $(this).removeClass("active")
    }).jcarouselPagination()
});

function showPriceBreakUpData(E, D) {
    var C = readCookie("seePriceCount");
    if (_gaq) {
        var B = "Sale";
        if ($("#inputcategory").val() != null && $("#inputcategory").val() != "undefined" && ($("#inputcategory").val().trim() == "Rent" || $("#inputcategory").val().trim() == "rent")) {
            B = "Rent"
        }
        _gaq.push(["_trackEvent", "Category - Price Bifurcation|Action -" + B + "|Label - Property SRP", "Property SRP"])
    }
    $(".allPricePropWorth").hide();
    D.stopPropagation();
    $("#allPricePropWorth" + E).show();
    var A;
    $.each($(".payPlanScroll").find(".tr"), function() {
        var F = 28;
        var G = $("#allPricePropWorth" + E).find(".payPlanScroll").find(".tr").length;
        A = F * G
    });
    $("#allPricePropWorth" + E).find(".payPlanScroll").css({
        height: A
    });
    if (A > 125) {
        $("#allPricePropWorth" + E).find(".payPlanScroll").css({
            height: 125
        });
        $("#allPricePropWorthp" + E).find(".payPlanScroll").nanoScroller({
            preventPageScrolling: true
        });
        $("#allPricePropWorth" + E).find(".payPlanScroll").nanoScroller()
    }
    $("#allPricePropWorth" + E).live("mouseenter", function() {
        $("#allPricePropWorth" + E).show()
    });
    $("#allPricePropWorth" + E).live("mouseleave", function() {
        $("#allPricePropWorth" + E).hide()
    });
    $("a.priceBreakupLink").live("mouseleave", function() {
        $("#allPricePropWorth" + E).hide();
        $("#priceByAppDownload" + E).hide()
    })
}

function closePriceBreakUpData(A) {
    $(".allPricePropWorth").hide();
    A.stopPropagation()
}

function calculationPopup(B) {
    var A = '<span class="calculatorClose" onclick="closeCalculatorForm(' + B + ');"></span><iframe src="' + serverCallPath + "stampDutyCalculator.html?propertyId=" + B + '" width="885px" height="630px" frameborder="no" noresize="noresize" scrolling="no" rel = "noindex, nofollow"></iframe>';
    $("#calculatorWrapper" + B).html("");
    $("#calculatorWrapper" + B).html(A);
    $("body").append('<div class="calculatorOverlay"></div>');
    $("#calculatorWrapper" + B).show()
}
$(".calculatorWrapper").on("click", ".calculatorClose", function() {
    $(this).parent("div").hide();
    $(".calculatorOverlay").remove()
});

function closeCalculatorForm(A) {
    $("#calculatorWrapper" + A).hide();
    $(".calculatorOverlay").remove()
}

function alertMobileContact(H, l, n) {
    var W = document.getElementById("userName" + Id);
    var D = document.getElementById("userEmail" + Id);
    var b = document.getElementById("userMobile" + Id);
    var X = "";
    var q = "";
    if (document.getElementById("selectCountry_mobile_")) {
        mobileNumberIsd = document.getElementById("selectCountry_mobile_" + Id)
    }
    if (document.getElementById("selectCountry_phone_")) {
        telNumberIsd = document.getElementById("selectCountry_phone_" + Id)
    }
    if (document.getElementById("selectCountry_phone_")) {
        telNumberIsd = document.getElementById("selectCountry_phone_" + Id)
    }
    if (W) {
        createCookie("userName", W, 2)
    }
    if (D) {
        createCookie("userEmail", D, 2)
    }
    if (b) {
        createCookie("userMobile", b, 2)
    }
    if (H) {
        createCookie("userType", H, 2)
    }
    if (X) {
        createCookie("userMobileCountry", X, 2)
    }
    var k = "";
    var z = (document.getElementById("contactId" + Id).value).split(",");
    var k = document.getElementById("contactType" + Id).value;
    var o = document.getElementById("campCode" + Id);
    var w = "";
    if (o) {
        w = document.getElementById("campCode" + Id).value
    }
    var a = null;
    if (document.getElementById("ownerId" + Id)) {
        a = document.getElementById("ownerId" + Id).value
    }
    if (document.getElementById("projectId" + Id)) {
        projectId = document.getElementById("projectId" + Id).value
    }
    if (checkNullvalue(projectId)) {
        projectId = null
    }
    var T = null;
    if (document.getElementById("propertyId" + Id)) {
        T = document.getElementById("propertyId" + Id).value
    }
    if (checkNullvalue(T)) {
        T = Id
    }
    var O = "";
    var x = document.getElementsByName("ReqType" + Id);
    if (x != null) {
        for (i = 0; i < x.length; i++) {
            if (x[i].checked) {
                if (O == "") {
                    O = x[i].value
                } else {
                    O = O + "," + x[i].value
                }
            }
        }
    }
    var m = "";
    var h = "";
    var g = "";
    var U = "";
    var y = "";
    var R = "";
    var J = "";
    var I = "";
    var N = "";
    var c = "";
    var s = "";
    var j = "";
    var V = "";
    var G = "";
    j = document.getElementById("propertyContact");
    if (j) {
        V = document.getElementById("propertyContact").value;
        G = readCookie("reqposted" + id)
    }
    if (document.getElementById("userName" + Id)) {
        m = document.getElementById("userName" + Id).value
    }
    if (document.getElementById("userPrice" + Id)) {
        N = document.getElementById("userPrice" + Id).value;
        createCookie("userPrice", N, 2);
        if (N.indexOf("," != -1)) {
            N = N.replace(/,/g, "")
        }
    }
    if (document.getElementById("palnToBuy" + Id)) {
        c = document.getElementById("palnToBuy" + Id).value
    }
    if (document.getElementById("contactFrom" + Id)) {
        s = document.getElementById("contactFrom" + Id).value
    }
    if (document.getElementById("userEmail" + Id)) {
        h = document.getElementById("userEmail" + Id).value
    }
    if (document.getElementById("userMobile" + Id)) {
        U = document.getElementById("userMobile" + Id).value
    }
    if (document.getElementById("selectCountry_mobile_" + Id)) {
        g = document.getElementById("selectCountry_mobile_" + Id).value;
        if (g && g != "undefined" && g != "" && g != "" && g != "50") {
            sendSmsToUser = false
        }
    }
    if (document.getElementById("userMessage" + Id)) {
        I = document.getElementById("userMessage" + Id).value
    }
    if (document.getElementById("userTel" + Id)) {
        J = document.getElementById("userTel" + Id).value
    }
    if (document.getElementById("userTelStCode" + Id)) {
        R = document.getElementById("userTelStCode" + Id).value
    }
    if (document.getElementById("selectCountry_phone_" + Id)) {
        y = document.getElementById("selectCountry_phone_" + Id).value
    }
    var f = document.getElementById("sendcf" + Id);
    var d = document.getElementById("reqCheck" + Id);
    var Z = null;
    var Y = null;
    if (document.getElementById("alertCheck" + Id)) {
        Y = document.getElementById("alertCheck" + Id).checked
    }
    if (document.getElementById("homeLoanCheck" + Id)) {
        Z = document.getElementById("homeLoanCheck" + Id).checked
    }
    var u = document.getElementById("contactType" + Id).value;
    if (!checkNullvalue(projectId)) {
        contactT = "Microsite"
    } else {
        contactT = u
    }
    var P = "";
    if (document.getElementById("cityid") != null && document.getElementById("cityid") != "undefined" && P == null) {
        P = document.getElementById("cityid").value
    }
    var p = document.getElementById("selectMin" + Id);
    var v = document.getElementById("selectMin" + Id);
    var t = "";
    var L = "";
    if (p && v) {
        t = readCookie("minBudget");
        L = readCookie("maxBudget");
        if (t && L) {
            $("#showBudgetDiv").hide()
        } else {
            t = $("#selectMin" + Id).val();
            L = $("#selectMax" + Id).val();
            if (t == "-1" || L == "-1") {
                $("#budgetError" + Id).text("Please Enter the Budget");
                return false
            }
        }
    }
    var C = document.getElementById("homeLoanCheck1" + Id);
    var B = document.getElementById("homeLoanCheck2" + Id);
    var A = document.getElementById("homeLoanCheck3" + Id);
    var M = "";
    var K = "";
    var S = "";
    if (C && B && A) {
        if (isCheckedById(C.id)) {
            homeLoanCheckVal1 = $("#" + C.id).val();
            S = S + homeLoanCheckVal1
        }
        if (isCheckedById(B.id)) {
            M = $("#" + B.id).val();
            if (S != "") {
                S = S + ","
            }
            S = S + M
        }
        if (isCheckedById(A.id)) {
            K = $("#" + A.id).val();
            if (S != "") {
                S = S + ","
            }
            S = S + K
        }
    }
    var r = [];
    r[0] = document.getElementById("contactId" + Id).value;
    ajaxService.validateRecomContactSender(m + "######" + O, h, U, J, {
        callback: function(e) {
            validateSenderError = e
        },
        async: false
    });
    if (validateSenderError != "undefined" && validateSenderError != null && validateSenderError != "" && validateSenderError != "") {
        alert(validateSenderError);
        return false
    }
    var F = "true";
    var E = "B";
    var Q = new Object();
    Q.userType = O;
    Q.userName = m;
    Q.userEmail = h;
    Q.userMobile = U;
    Q.userMobileIsd = g;
    Q.userTelephone = J;
    Q.userTelephoneIsd = y;
    Q.message = I;
    Q.loanLead = null;
    Q.alert = Y;
    Q.advertisers = r;
    Q.userTelephoneStd = R;
    Q.palnToBuy = c;
    Q.contactType = contactT;
    Q.campaignCode = w;
    Q.projectId = projectId;
    Q.actualOwnerId = null;
    Q.ownerId = a;
    Q.campaignCode = w;
    Q.sendMailnSms = F;
    Q.cityCode = P;
    Q.maxBudget = L;
    Q.minBudget = t;
    Q.interestedIn = S;
    ajaxService.makePropertyContact(Q, {
        callback: function(e) {},
        async: true
    })
}

function animateAndShowNewResult() {
    $("#newResult").show();
    if (_gaq) {
        _gaq.push(["_trackEvent", "See New Property Clicked", "Property SRP"])
    }
    callAgainForFalseData = false;
    callAgainForNewData = true;
    $("#seeNewDataDiv").hide();
    $("html, body").animate({
        scrollTop: 0
    }, 600)
}

function animateAndShowNewResult2() {
    $("#newResult2").show();
    callAgainForNewData = true;
    if (_gaq) {
        _gaq.push(["_trackEvent", "See New Property Clicked", "Property SRP"])
    }
    $("#seeNewDataDiv2").hide();
    $("html, body").animate({
        scrollTop: 0
    }, 600)
}

function saveExitPopUpForm(A, B, I, J, H, G, C, E) {
    try {
        var D = A + "ajax/saveRequiredForm.json?emailId=" + B + "&" + I + "&userName=" + J + "&userMobile=" + H + "&userMobileCountry=" + G + "&userType=" + C + "&isAlert=" + E + "&trackingCode=AA-Email";
        $.getJSON(D, function(K) {
            $("#exitPopUpFormContainer").hide();
            $("#exitPopUpSuccessContainer").show();
            _gaq.push(["_trackEvent", "PropertySRP_exitPopUp", "Success"]);
            createCookie("userEmail", B, 2)
        })
    } catch (F) {
        alert("error" + F)
    }
    callAgainForNewData = true;
    $("#seeNewDataDiv").hide()
}
$(document).ready(function() {
    $("a.showMore").live("click", function(A) {
        stopPage = true;
        A.preventDefault();
        $(this).parents(".proDetailsRow").find(".showOneLilner").addClass("showComplete");
        $(this).parents(".proDetailsRow").find(".hideMore").css("display", "inline-block");
        $(this).parents(".proDetailsRow").find(".showHighLightsDiv").show();
        $(this).parents(".societyAndO").find("div.hideMore ").addClass("showComplete");
        $(this).parents(".societyAndO").find("a.hideMore").css("display", "inline-block");
        $(this).parents(".societyAndO").find(".proDetailHightLight").show();
        $(this).hide()
    });
    $("a.hideMore").live("click", function(A) {
        stopPage = true;
        A.preventDefault();
        $(this).parents(".proDetailsRow").find(".showOneLilner").removeClass("showComplete");
        $(this).parents(".proDetailsRow").find(".showMore").css("display", "inline-block");
        $(this).parents(".proDetailsRow").find(".showHighLightsDiv").hide();
        $(this).parents(".societyAndO").find("div.hideMore ").removeClass("showComplete");
        $(this).parents(".societyAndO").find("a.showMore").css("display", "inline-block");
        $(this).parents(".societyAndO").find(".proDetailHightLight").hide();
        $(this).hide()
    });
    $(".srpOverSliderClose").live("click", function(A) {
        $(".srpOverSliderWrap").removeClass("active");
        $("#mask").removeClass("mask");
        $("#mask").hide();
        $(".closeConIcon").trigger("click")
    });
    $(".sampleLink").live("click", function(A) {
        A.stopPropagation();
        $(".srpOverSliderWrap").addClass("active");
        $("#mask").addClass("mask");
        $("#mask").show()
    });
    $("#mask").live("click", function(A) {
        A.stopPropagation();
        $(".srpOverSliderWrap").removeClass("active");
        $("#mask").removeClass("mask");
        $("#mask").hide();
        $(".closeConIcon").trigger("click")
    });
    $(".srpOverContent  .btnWrap .contactBtn, .srpOverContent   .btnWrap .viewPhoneBtn ").live("click", function(A) {
        $("#mask").css("z-index", "96")
    });
    $(".closeConIcon, #mask").live("click", function(A) {
        $("#mask").css("z-index", "92")
    });
    $(".stopParentLink").click(function(A) {
        return false
    });
    $(".rightBotChatList .chatListBlock ul li").live("click", function() {
        $(".rightBotChatBox").hide();
        $(".contForOnlineAgent").show()
    });
    $(".rightBotChatBoxBtn .chatBlock").live("click", function() {
        $(".rightBotChatBox, .rightBotChatList").show();
        $(this).addClass("chatPopOn");
        $(".mck-button-launcher").removeClass("popUpOpened");
        $("#mck-side-panel").hide()
    });
    $(".rightBotChatList .closeChat").live("click", function() {
        $(".rightBotChatList").hide();
        $(".rightBotChatBoxBtn .chatBlock").removeClass("chatPopOn")
    });
    $(".contForOnlineAgent .contBackBtn").live("click", function() {
        $(".rightBotChatBox").show();
        $(".topBlackCont, .contForOnlineAgent .contactAgentForm, .contGray").hide()
    });
    $(".contForOnlineAgent .contClosekBtn").live("click", function() {
        $(".contForOnlineAgent, .contGray").hide();
        $(".rightBotChatBoxBtn .chatBlock").removeClass("chatPopOn")
    })
});

function closecontactHeader(A) {
    if ($("#contactHeader") + A) {
        $("#contactHeader" + A).hide()
    }
}

function openSimilarProperty(E, C, B, A) {
    $("#similarPropertyInSearch").html("");
    if (_gaq) {
        _gaq.push(["_trackEvent", "Similar Property Clicked Proeprty Id :" + E, "Property SRP"])
    }
    $("#similarPropertyInSearch").html('<div align="center" id="similarResult-loader"><div class="loadingRes"><span><img width="45" height="45" alt="Loader" src="' + imgPath + 'mbLoader.gif"> Loading Results</span></div></div>');
    var D = "/bricks/get-similar-property.html?id=" + E + "&similrid=" + C + "&type=" + A + "&pageOptionString=" + B;
    $.ajax({
        url: D,
        success: function(F) {
            if (F != "" && F != null) {
                $("#similarPropertyInSearch").html(F)
            }
        }
    })
}

function createContactForm(F, H, E, C, A) {
    if (E == "" || E == null) {
        if (F == 1) {
            E = "AA-SimilarContact"
        } else {
            if (F == 2) {
                E = "AA-SimilarPhone"
            } else {
                if (F == 3) {
                    E = "AA-DownloadReport"
                }
            }
        }
    }
    var B = null;
    var I = "/bricks/getPropertyContactForm.html?action=" + F + "&id=" + H + "&oneClick=true&contactType=property&trackParam=" + E + "&loader=N&similarProp=N";
    I = I;
    var G = "true";
    if (G) {
        I = I
    }
    $(".propContactGreyBox").remove();
    var D = "";
    D += '<div class="propContactGreyBox" id="propContactGreyBox_' + C + '">';
    D += '<div class="closeConSec"><div class="closeConIcon" onclick="closeContactForm();"></div></div>';
    D += "<iframe src=" + I + ' width="100%" height="400" frameborder="0" scrolling="no" rel = "noindex, nofollow"></iframe>';
    D += "</div>";
    D += '<div class="propContactGreyBoxOverlay" id="showMe"></div>';
    $("body").append(D)
}

function opneContactForm(A, C, B) {
    $(".propContactGreyBox").css({
        display: "none"
    });
    $("#propContactGreyBox_" + A).css({
        display: "block"
    });
    $(".propContactGreyBoxOverlay").css({
        display: "block"
    });
    $(".propContactGreyBox").center();
    $(".propContactGreyBox").css("top", "75px")
}

function closeContactForm() {
    $(".propContactGreyBox").remove();
    $(".propContactGreyBoxOverlay").remove()
}

function createContactFormSimilarProperty(F, H, E, C, A) {
    createCookie("sessionCookieForContact", "Y", -1);
    if (E != null && E != "") {
        E = E
    } else {
        if (F == 1) {
            E = "AA-SimilarContact"
        } else {
            if (F == 2) {
                E = "AA-SimilarPhone"
            }
        }
    }
    var B = null;
    var I = "/bricks/getPropertyContactForm.html?action=" + F + "&id=" + H + "&oneClick=true&contactType=property&trackParam=" + E + "&loader=N&similarProp=N";
    I = I;
    var G = "true";
    if (G) {
        I = I
    }
    $(".propContactGreyBox").remove();
    var D = "";
    D += '<div class="propContactGreyBox" id="propContactGreyBox_' + C + '" style="display:none">';
    D += '<div class="closeConSec"><div class="closeConIcon" onclick="closeContactForm();"></div></div>';
    D += "<iframe src=" + I + ' width="100%" height="400" frameborder="0" scrolling="no" rel = "noindex, nofollow"></iframe>';
    D += "</div>";
    D += '<div class="propContactGreyBoxOverlay" id="showMe"></div>';
    $("body").append(D)
}

function closeContactFormSimilarProperty() {
    $(".propContactGreyBox").remove()
}
jQuery.fn.center = function() {
    this.css("position", "fixed");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft()) + "px");
    return this
};

function callNewPropertiesTimeOutFunctions() {
    timeout1 = setTimeout(function() {
        var A = contextPath + "createNewPropertyData.html?&ecdlVal=" + $("#ecdlVal").val() + "&page=" + searchMapPage + "&" + getUrlStringToSearch();
        $.ajax({
            dataType: "html",
            type: "get",
            url: A,
            cache: true,
            async: true,
            success: function(B) {
                $("div#newResult").html(B)
            }
        });
        setTimeout(function() {
            if ($("#seeNewDataDiv").html() != null && $("#seeNewDataDiv").html() != "null" && $("#seeNewDataDiv").html().length > 1) {
                callAgainForNewData = false;
                callAgainForFalseData = false;
                $("#seeNewDataDiv").show();
                setTimeout(function() {
                    $("#seeNewDataDiv").hide()
                }, 30000)
            } else {
                callAgainForFalseData = true;
                callAgainForNewData = true
            }
        }, 1000)
    }, 28000);
    timeout2 = setTimeout(function() {
        if (callAgainForFalseData == true) {
            callAgainForNewData = false;
            var A = contextPath + "createNewPropertyData.html?&falseData=Y&falseDataStart=" + falseDataStart + "&page=" + searchMapPage + "&" + getUrlStringToSearch() + "&notIds=" + allProperties;
            $.ajax({
                dataType: "html",
                type: "post",
                url: A,
                cache: true,
                async: true,
                success: function(B) {
                    if (callAgainForFalseData == true) {
                        callAgainForFalseData = false;
                        $("div#newResult").html(B);
                        $("img.lazy").lazyload();
                        setTimeout(function() {
                            if ($("#seeNewDataDiv").html() != null && $("#seeNewDataDiv").html() != "null" && $("#seeNewDataDiv").html().length > 1) {
                                callAgainForNewData = false;
                                $("#seeNewDataDiv").show();
                                setTimeout(function() {
                                    $("#seeNewDataDiv").hide()
                                }, 30000)
                            } else {
                                callAgainForNewData = true
                            }
                        }, 1000)
                    }
                }
            })
        }
    }, 58000);
    timeout3 = setTimeout(function() {
        if (callAgainForNewData == true) {
            var A = contextPath + "createNewPropertyData.html?&ecdlVal=" + $("#ecdlVal").val() + "&callNumber=2&page=" + searchMapPage + "&" + getUrlStringToSearch();
            $.ajax({
                dataType: "html",
                type: "get",
                url: A,
                cache: true,
                async: true,
                success: function(B) {
                    if (callAgainForNewData == true) {
                        $("div#newResult2").html(B);
                        $("img.lazy").lazyload();
                        setTimeout(function() {
                            if ($("#seeNewDataDiv2").html() != null && $("#seeNewDataDiv2").html() != "null" && $("#seeNewDataDiv2").html().length > 1) {
                                $("#seeNewDataDiv2").show();
                                setTimeout(function() {
                                    $("#seeNewDataDiv2").hide()
                                }, 30000)
                            }
                        }, 1000)
                    }
                }
            })
        }
    }, 118000)
}

function show(A, B) {
    var C = $(A).position().left;
    if ($("#" + B) != null) {
        $("#" + B).css({
            display: "block"
        });
        if ($(A).find("#" + B).size() == 0) {
            $(A).find("a").after($("#" + B))
        }
    }
}

function hide(A) {
    if (document.getElementById(A) != null) {
        document.getElementById(A).style.display = "none"
    }
}

function currentYPosition() {
    var A = 0;
    if (self.pageYOffset) {
        A = self.pageYOffset
    }
    if (document.documentElement && document.documentElement.scrollTop) {
        A = document.documentElement.scrollTop
    }
    if (document.body.scrollTop) {
        A = document.body.scrollTop
    }
    return A
}

function replaceHtml(C, B) {
    var A = typeof C === "string" ? document.getElementById(C) : C;
    var D = A.cloneNode(false);
    D.innerHTML = B.replace(/\\'/g, "'");
    A.parentNode.replaceChild(D, A);
    return D
}

function doBounce(A, C, D, B) {
    for (i = 0; i < C; i++) {
        A.animate({
            marginLeft: "-=" + D
        }, B).animate({
            marginLeft: "+=" + D
        }, B)
    }
}

function createThankYouMessSimilarProperty(A, H, L, B, G) {
    var D = readCookie("userType");
    var K = readCookie("userName");
    var C = readCookie("userEmail");
    var J = readCookie("userMobile");
    var I = readCookie("userMobileCountry");
    var E = readCookie("userTelCountry");
    var F = "/bricks/get-similar-property-Contact.html?id=" + A + "&contactTy=" + H + "&divId=" + L + "&userType=" + D + "&userName=" + K + "&userEmail=" + C + "&userMobile=" + J + "&userMobileIsd=" + I + "&userTelCountry=" + E;
    $.ajax({
        url: F,
        async: "false",
        success: function(M) {
            if (M != "" && M != null) {
                $("#" + L).html(M)
            }
        },
        complete: function() {
            var M = document.getElementById("showMe");
            if (M) {
                $(".propContactGreyBoxOverlay").remove()
            }
        }
    })
}
$(document).ready(function() {
    $(".donwAppContainer.menu").insertAfter(".srpTabAndSort .srpTabs");
    $(".donwAppContainer.menu").removeClass("menu")
});

function applogicContact(B) {
    var A = contextPath + "ajax/applogicContact.json?id=" + B;
    $.ajax({
        dataType: "xml",
        type: "get",
        url: A,
        cache: true,
        async: false,
        success: function(C) {}
    })
}

function similarPropertyCall(D) {
    if (typeof showSimilarPropertyInDetailsPage != "undefined" && showSimilarPropertyInDetailsPage == "Y" && (typeof gridView === "undefined" || gridView != "Y")) {
        var B = "<div id='DetailsSimilarProp' class='DetailsSimilarPropP1'></div>";
        $("#similarNew").append(B);
        var A = $("#similarPropertyCount" + D).val();
        var C = $("#categoryId" + D).val();
        showSimilarPropertyInexitPopUp(D, categoryCheck, similarCountCheck, null, "exitPopUp", "DetailsSimilarProp", "AC-MBRecommendContact", "Y");
        if (typeof showAppdownload != "undefined" && showAppdownload != "N") {
            setTimeout(function() {
                createAppDownloadUI("N", "moreContactAppDownload", "1")
            }, 200)
        }
    }
}

function showVisibleClient(B) {
    var A = document.getElementById("visibleClient");
    if (typeof(A) != "undefined" && A != null) {
        setInterval(function() {
            $(".formsWrap").addClass("addSimilar");
            $(".formsWrap").addClass("clientVisibility");
            $("#visibleClient").css("display", "inline")
        }, 1000)
    }
}

function showQuestionTag(I, E, L, D, C, G) {
    var F = contextPath + "/ajax/getQuestionTag";
    var K = "";
    var H = true;
    D = D.replace('"', "");
    D = D.replace('"', "");
    if (C) {
        K = "id=" + I + "&userType=" + E + "&email=" + D + "&timer=1"
    } else {
        K = "id=" + I + "&userType=" + E + "&email=" + D + ""
    }
    var B = $("#ansTextCheck").val();
    if (G) {
        K = K + "&qNo=" + G + ""
    }
    if (B == "18260" || B == "18271" || B == "18312") {
        var J = $("#qNo").val();
        J = parseInt(J) + 1;
        K = K + "&qNo=" + J + ""
    }
    if (B == "18476" || B == "18500") {
        var J = $("#qNo").val();
        J = parseInt(J) + 2;
        K = K + "&qNo=" + J + ""
    }
    var M = $("#questionCode").val();
    if (M && (M == "18424" || M == "18444")) {
        var J = $("#qNo").val();
        J = parseInt(J) + 2;
        K = K + "&qNo=" + J + ""
    }
    var A = $("#projectId" + I).val();
    if (A) {
        K = K + "&isProjectProperty=Y"
    }
    $.ajax({
        dataType: "html",
        type: "POST",
        url: F,
        data: K,
        async: false,
        success: function(R) {
            if (R.indexOf("Records not found in question") == -1) {
                $("#contactQuestionDivInnerTag" + I).html(R);
                $(".closeConIcon", parent.document).hide();
                $(".newSimilarForDetail").hide();
                $("#contactQuestionDivTag" + I).show();
                H = false;
                $("#aboveAgentPhoneForm" + I).find(".closeForm").hide();
                $("#aboveContactAgentForm" + I).find(".closeForm").hide();
                $("#siteVisitContactAgentForm" + I).find(".closeForm").hide();
                var Q = $("#name" + I).val();
                var S = $("#questionSuccess").val();
                if (S) {
                    $(".summerBrf").html(S)
                }
                $(".userNamPhone").html(Q + ", " + L);
                if (_gaq) {
                    var P = $("#saleType").val();
                    var O = $("#propTypeQuestionTag").val();
                    var N = $("#questionCode").val();
                    _gaq.push(["_trackEvent", "Q&A_" + P + "_" + O, "Shown", N])
                }
            } else {
                $("#contactQuestionDivTag" + I).hide();
                $("#contactQuestionDivInnerTag" + I).html(R);
                var Q = $("#name" + I).val();
                if ((rightHandSide != "Y")) {
                    $(".sharedDetails").show()
                }
                var S = $("#questionSuccess").val();
                $(".newSimilarForDetail").show();
                if (S) {
                    $(".summerBrf").html(S)
                }
                $(".userNamPhone").html(Q + ", " + L);
                H = true;
                $("#aboveAgentPhoneForm" + I).find(".closeForm").show();
                $("#aboveContactAgentForm" + I).find(".closeForm").show();
                $("#siteVisitContactAgentForm" + I).find(".closeForm").show()
            }
        }
    });
    return H
}

function submitQestionAnser(P) {
    var H = contextPath + "ajax/getAnserTag";
    var A = $("#check").val();
    var D = $("#checkNot").val();
    var N = "";
    var C = "";
    var O = $("#qNo").val();
    var J = $("#questionCode").val();
    var G = $("#num").val();
    var K = $("#contactId").val();
    var F = $("#anserText").val();
    var E = $("input:radio[name=userType" + K + "]:checked").val();
    var M = $("#name" + K).val();
    if (M == "") {
        M = $("#userName" + K).val()
    }
    var B = $("#userEmail" + K).val();
    var L = $("#userMobile" + K).val();
    if (P == "18260" || P == "18271" || P == "18312") {
        $("#ansTextCheck").val(P)
    }
    var I;
    if ($("#downloadReport" + K)) {
        I = $("#downloadReport" + K).val()
    }
    if (A) {
        N = N + "anserCode=" + P + ""
    } else {
        if (D) {
            N = N + "ansText=" + F + ""
        }
    }
    N = N + "&questionCode=" + J + "";
    N = N + "&id=" + G + "";
    if (P == "18331") {
        console.log("userName = " + M + " , userEmail = " + B + " , userMobile = " + L);
        if (M != "" && M != "undefined" && B != "" && B != "undefined" && L != "" && L != "undefined") {
            sendHouseJoyOfferEmailAndSms(M, B, L)
        } else {
            console.log("Not sending house joy message ... ")
        }
    }
    $.ajax({
        dataType: "html",
        type: "POST",
        url: H,
        data: N,
        cache: true,
        async: false,
        success: function(X) {
            var U = $("#userEmail" + K).val();
            var T = $("#userMobile" + K).val();
            ajaxService.checkBrokerConnectCheck(K, E, T, U, {
                callback: function(Y) {
                    checkBrokerConnect = Y
                },
                async: false
            });
            if (_gaq) {
                var W = $("#saleType").val();
                var S = $("#propTypeQuestionTag").val();
                var R = $("#questionCode").val();
                _gaq.push(["_trackEvent", "Q&A_" + W + "_" + S, "Answered", R])
            }
            var Q = showQuestionTag(K, E, T, U, "", "");
            if (Q) {
                if ($("#agentPhoneForm" + K).val() != null) {
                    $("#contactQuestionDivInnerTag" + K).html("");
                    $("#contactQuestionDivTag" + K).hide();
                    if (checkBrokerConnect == "aaCookie") {
                        $(".newSimilarForDetail").addClass("resetForAppD");
                        showVisibleClient(K);
                        $("#userNameText").text(ProjectContactBean.userName);
                        $("#brokerConnectDiv").show();
                        applogicContact(K)
                    } else {
                        if (checkBrokerConnect == "aiCookie") {
                            $(".newSimilarForDetail").addClass("resetForAppD");
                            showVisibleClient(K);
                            $("#smartDiaryDiv").show()
                        } else {
                            var V = showNriScreen(K);
                            if (!V) {
                                $("#agentPhoneForm" + K).slideDown("slow");
                                similarPropertyCall(K);
                                showVisibleClient(K)
                            }
                        }
                    }
                } else {
                    $("#contactQuestionDivInnerTag" + K).html("");
                    $("#contactQuestionDivTag" + K).hide();
                    if (checkBrokerConnect == "aaCookie") {
                        $(".newSimilarForDetail").addClass("resetForAppD");
                        showVisibleClient(K);
                        $("#userNameText").text(ProjectContactBean.userName);
                        $("#brokerConnectDiv").show();
                        applogicContact(K)
                    } else {
                        if (checkBrokerConnect == "aiCookie") {
                            $(".newSimilarForDetail").addClass("resetForAppD");
                            showVisibleClient(K);
                            $("#smartDiaryDiv").show()
                        } else {
                            if (I != null && I != "undefined" && I == "Y") {
                                $("#contactForm" + K).slideDown("slow");
                                $("#downloadReportForm").submit()
                            } else {
                                var V = showNriScreen(K);
                                if (!V) {
                                    $("#contactForm" + K).slideDown("slow");
                                    similarPropertyCall(K);
                                    showVisibleClient(K)
                                }
                            }
                        }
                    }
                }
            }
        }
    })
}

function sendHouseJoyOfferEmailAndSms(C, B, A) {
    var D = contextPath + "ajax/sendHouseJoySMSAndMail";
    var E = "";
    E = E + "userName=" + C + "";
    E = E + "&userEmail=" + B + "";
    E = E + "&userMobile=" + A + "";
    $.ajax({
        dataType: "JSON",
        type: "POST",
        url: D,
        data: E,
        cache: true,
        async: true,
        success: function(F) {
            console.log(F.message)
        }
    })
}

function showNewQuestion() {
    var B = "";
    var J = $("#qNo").val();
    var F = $("#questionCode").val();
    var D = $("#num").val();
    var G = $("#contactId").val();
    var C = $("input:radio[name=userType" + G + "]:checked").val();
    var I = $("#name" + G).val();
    if (I == "") {
        I = $("#userName" + G).val()
    }
    var H = $("#userMobile" + G).val();
    var A = $("#userEmail" + G).val();
    var E = showQuestionTag(G, C, H, A, "", J);
    if (E) {
        showSucesss(G, "")
    }
}

function showSucesss(H, B) {
    var E = $("input:radio[name=userType" + H + "]:checked").val();
    var J = $("#name" + H).val();
    if (J == "") {
        J = $("#userName" + H).val()
    }
    var G;
    if ($("#downloadReport" + H)) {
        G = $("#downloadReport" + H).val()
    }
    var I = $("#userMobile" + H).val();
    var D = $("#userEmail" + H).val();
    ajaxService.checkBrokerConnectCheck(H, E, I, D, {
        callback: function(K) {
            checkBrokerConnect = K
        },
        async: false
    });
    if ($("#agentPhoneForm" + H).val() != null) {
        if (_gaq && B) {
            var C = $("#saleType").val();
            var A = $("#propTypeQuestionTag").val();
            var F = $("#questionCode").val();
            if (!(typeof alertLandingPage === "undefined") && alertLandingPage) {
                _gaq.push(["_trackEvent", "Q&A_" + C + "_" + A + "_ALP", "Skipped" + B, F])
            } else {
                _gaq.push(["_trackEvent", "Q&A_" + C + "_" + A, "Skipped" + B, F])
            }
        }
        $("#contactQuestionDivInnerTag" + H).html("");
        $("#contactQuestionDivTag" + H).hide();
        if (checkBrokerConnect == "aaCookie") {
            $(".newSimilarForDetail").addClass("resetForAppD");
            showVisibleClient(H);
            $("#userNameText").text(ProjectContactBean.userName);
            $("#brokerConnectDiv").show();
            applogicContact(H)
        } else {
            if (checkBrokerConnect == "aiCookie") {
                $(".newSimilarForDetail").addClass("resetForAppD");
                showVisibleClient(H);
                $("#smartDiaryDiv").show()
            } else {
                $("#agentPhoneForm" + H).slideDown("slow");
                $(".newSimilarForDetail").show();
                similarPropertyCall(H);
                showVisibleClient(H);
                $(".newSimilarForDetail").show()
            }
        }
        var J = $("#name" + H).val();
        if ((rightHandSide != "Y")) {
            $(".sharedDetails").show()
        }
        $(".userNamPhone").html(J + "," + I);
        showBuyRentprofileOnSuccess(H)
    } else {
        if (_gaq && B) {
            var C = $("#saleType").val();
            var A = $("#propTypeQuestionTag").val();
            var F = $("#questionCode").val();
            _gaq.push(["_trackEvent", "Q&A_" + C + "_" + A, "Skipped" + B, F])
        }
        $("#contactQuestionDivInnerTag" + H).html("");
        $("#contactQuestionDivTag" + H).hide();
        if (checkBrokerConnect == "aaCookie") {
            $(".newSimilarForDetail").addClass("resetForAppD");
            $("#userNameText").text(ProjectContactBean.userName);
            $("#brokerConnectDiv").show();
            showVisibleClient(H)
        } else {
            if (checkBrokerConnect == "aiCookie") {
                $(".newSimilarForDetail").addClass("resetForAppD");
                $("#smartDiaryDiv").show()
            } else {
                if (G != null && G != "undefined" && G == "Y") {
                    $("#contactForm" + H).slideDown("slow");
                    $("#downloadReportForm").submit()
                } else {
                    $("#contactForm" + H).slideDown("slow");
                    $(".newSimilarForDetail").show();
                    similarPropertyCall(H);
                    showVisibleClient(H);
                    $(".newSimilarForDetail").show()
                }
            }
        }
        var J = $("#name" + H).val();
        if ((rightHandSide != "Y")) {
            $(".sharedDetails").show()
        }
        $(".userNamPhone").html(J + "," + I);
        showBuyRentprofileOnSuccess(H)
    }
    $("#aboveAgentPhoneForm" + H).find(".closeForm").show();
    $("#aboveContactAgentForm" + H).find(".closeForm").show();
    $("#siteVisitContactAgentForm" + H).find(".closeForm").show();
    $(".closeConIcon", parent.document).show()
}

function detailsToBeCapturedForContact(C, D) {
    var B = new Object();
    B.source = "web";
    B.from = "propertySearch";
    B.propId = C;
    B.action = D;
    B.searchId = readCookie("searchId");
    B.userType = readCookie("userType");
    var A = readCookie("searchrfnum");
    ajaxService.saveSearchedCriteriaDetails(B, A, {
        callback: function(E) {},
        async: true
    })
}

function createCookieForSearchTraking(C, D, E) {
    var A = "";
    if (E) {
        var B = new Date();
        B.setTime(B.getTime() + (E * 24 * 60 * 60 * 1000));
        A = "; expires=" + B.toGMTString()
    }
    document.cookie = C + "=" + D + A + "; path=/"
}

function showBuyRentprofileOnSuccess(B) {
    var A = $("#userEmail" + B).val();
    var C = contextPath + "ajax/showUserProfile.json?email=" + A + "&id=" + B + "";
    $.ajax({
        dataType: "json",
        type: "GET",
        url: C,
        async: false,
        success: function(H) {
            for (var D in H) {
                var F = H[D];
                if (D == "status" && F && F == "1") {
                    var G = $("#name" + B).val();
                    var E = $("#userMobile" + B).val();
                    if ((rightHandSide != "Y")) {
                        $(".sharedDetails").show()
                    }
                    $(".userNamPhone").html(G + "," + E)
                }
                if (D == "responseDataMap") {
                    $(".summerBrf").html(F)
                }
            }
        }
    })
}

function loadAjaxData(A, B) {
    if ($(B).html() == null) {
        parent.loadchatdata(A)
    } else {
        $.ajax({
            dataType: "html",
            type: "get",
            url: A,
            cache: false,
            async: true,
            success: function(C) {
                if ($(B).html() != null) {
                    $(B).html("");
                    $(B).html(C)
                }
            }
        })
    }
}

function loadRecommendedAgent(A, B) {
    $.ajax({
        dataType: "html",
        type: "POST",
        url: A,
        cache: false,
        async: true,
        success: function(C) {
            $(B).html(C);
            $(B).show()
        }
    })
}

function loadAjaxDataJeson(A, B) {
    $.ajax({
        dataType: "json",
        type: "get",
        url: A,
        cache: false,
        async: true,
        success: function(E) {
            if (E != null) {
                var F = "" + E.onlineUser;
                if (F.length > 0) {
                    var D = F.split(",");
                    for (var C in D) {
                        $("#" + D[C]).addClass("online_bubble")
                    }
                }
            }
        }
    })
}

function callChatGASection(B, A, C) {
    var D = parent.document.getElementById("propContactGreyBox_9");
    if (typeof D != "undefined" && D != null) {
        if (_gaq) {
            _gaq.push(["_trackPageview", "property-details-send-chat-sms-success.html"])
        }
    } else {
        if (_gaq) {
            _gaq.push(["_trackPageview", "property-search-send-chat-sms-success.html"])
        }
    }
}

function tagIfollow(A) {
    tagIfollowBanner(iFollowCityId, iFollowLocalityId, iFollowTransType, A, remarketPrefix)
}

function decodemaskmobilenumber(C, A) {
    if (C != "" && C != null) {
        var B = C.split(",");
        $("#maskingNoinContact" + A).hide();
        if (parent.document.getElementById("maskmobilenumber")) {
            parent.document.getElementById("maskmobilenumber").innerHTML = B[0]
        }
    } else {
        $("#maskingNoinContact" + A).hide();
        if (parent.document.getElementById("maskmobilenumber")) {
            parent.document.getElementById("maskmobilenumber").hide()
        }
    }
}

function visibilityClientGA(B, C, A) {
    if (_gaq) {
        _gaq.push(["_trackEvent", B, C, A])
    }
}

function checkNriForm(C) {
    var B = $("#" + C.id).val();
    var A = document.getElementById("hasNriForm");
    if (A && B == "50") {
        $("#showNriContactFormObj").show()
    } else {
        $("#showNriContactFormObj").hide()
    }
}

function showContactConfirmation(B, D, C, A) {
    var E = contextPath + "ajax/storeNRIDetails?";
    $.ajax({
        dataType: "json",
        type: "post",
        url: E,
        data: {
            email: B,
            mobile: D,
            isdCode: C,
            name: A,
        },
        async: true,
        success: function(F) {
            console.log(F + "data is submitted")
        }
    })
}

function showNriScreen(G) {
    var A = $("#countryCode" + G).val();
    var K = $("#cityCode" + G).val();
    var J = $("#cityCodeId" + G).val();
    var C = $("#timerCode" + G).val();
    var I = $("#name" + G).val();
    if (I == "") {
        I = $("#userName" + G).val()
    }
    var F = false;
    var B = $("#userEmail" + G).val();
    var H = $("#userMobile" + G).val();
    var E = $("#selectCountry_mobile_" + G).val();
    var D = $("#nriContactFormSuccess" + G).val();
    if (D == "Y" && A.indexOf(E) != -1 && K.indexOf(J) != -1) {
        $("#isNriTimerScreen").show();
        $("#aboveContactAgentForm" + G).addClass("forNRICForm");
        $("#aboveAgentPhoneForm" + G).addClass("forNRICForm");
        timerForNRI_Contact(G);
        showContactConfirmation(B, H, E, I);
        F = true
    }
    return F
}

function timerForNRI_Contact(C) {
    var B = 10 * 60 * 1000;
    var A = setInterval(function() {
        B -= 1000;
        var E = Math.floor(B / (60 * 1000));
        var F = Math.floor((B - (E * 60 * 1000)) / 1000);
        E = checkTime(E);
        F = checkTime(F);
        var D = null;
        D = document.getElementById("countTimeContactUs" + C);
        if (D == null) {
            D = document.getElementById("countTimeViewPhoneNumber" + C)
        }
        if (B < 0) {
            clearInterval(A)
        } else {
            $("#" + D.id).html(E + ":" + F)
        }
    }, 1000)
}

function checkTime(A) {
    if (A < 10) {
        A = "0" + A
    }
    return A
}

function setDatainFields(A, B) {
    if (A.encryptMobile) {
        $("#advMobileId" + B).val(A.encryptMobile)
    }
    if (A.ownerId) {
        $("#ownerId" + B).val(A.ownerId)
    }
    if (A.actualOwner) {
        $("#actualOwnerId" + B).val(A.actualOwner)
    }
}
var isFrameT = false;

function setNpsDataForm(F) {
    var E = $("#name" + F).val();
    if (E == "") {
        E = $("#userName" + F).val()
    }
    var C = $("#userEmail" + F).val();
    var B = $("#userMobile" + F).val();
    var A = $("#selectCountry_mobile_" + F).val();
    var D = $("#fromDetailPage").val();
    if (D) {
        loadJSIframe(npsUrl + "/npsScript/nps.js?" + version);
        setTimeout(function() {
            parent.mbNps.htmlLocation = "mbNps";
            parent.mbNps.comm_n = E;
            parent.mbNps.comm_e = C;
            parent.mbNps.comm_m = B;
            parent.mbNps.comm_mc = A;
            parent.mbNps.provider = npsUrl;
            parent.mbNps.init()
        }, 1000)
    } else {
        loadJS(npsUrl + "/npsScript/nps.js?" + version);
        setTimeout(function() {
            mbNps.htmlLocation = "mbNps";
            mbNps.comm_n = E;
            mbNps.comm_e = C;
            mbNps.comm_m = B;
            mbNps.comm_mc = A;
            mbNps.provider = npsUrl;
            mbNps.init()
        }, 1000)
    }
    if (D) {
        $("body").on("click", $("input[name='npsRating']"), function() {
            $(".btnContinue a").addClass("continue")
        })
    }
}

function loadJS(B) {
    var A = document.createElement("script");
    A.type = "application/javascript";
    A.src = B;
    document.body.appendChild(A)
}

function loadJSIframe(B) {
    var A = window.parent.document.createElement("script");
    A.type = "application/javascript";
    A.src = B;
    window.parent.document.body.appendChild(A)
}
var stopRefine = true;
var mainSearchedUrl = "";
var areaVal;
var globalCityLocKey = "";
var googleOptions;
var googleAutocomplete;
var googleAutocompleteListener;
var toCallSearch = true;
var toCallGoogleAutoSuggest = true;
var isRadiusSearch = "N";

function checkIncludeAll(B, D) {
    var C = 0;
    var A = 0;
    $("input:checkbox[name=" + B + "]").each(function() {
        C++
    });
    $("input:checkbox[name=" + B + "]:checked").each(function() {
        A++
    });
    if (C > 0 && A > 0 && C == A) {
        $("#" + D).prop("checked", true);
        $("#" + D).parent().addClass("checked")
    } else {
        $("#" + D).prop("checked", false);
        $("#" + D).parent().removeClass("checked")
    }
}

function includeAll(A, B) {
    stopRefine = true;
    if ($(B).is(":checked")) {
        $("input:checkbox[name=" + A + "]").each(function() {
            $(this).prop("checked", true);
            $(this).parent().addClass("checked");
            $(this).trigger("onchange")
        })
    } else {
        $("input:checkbox[name=" + A + "]").each(function() {
            $(this).prop("checked", false);
            $(this).parent().removeClass("checked");
            $(this).trigger("onchange")
        })
    }
    stopRefine = false;
    getSearchUrl()
}

function callNanoscroller(C, B, A) {
    $("#" + C + B + "Scrollar.nano, #" + C + A + "Scrollar.nano").show();
    $("#" + C + B + "Scrollar.nano, #" + C + A + "Scrollar.nano").nanoScroller({
        preventPageScrolling: true
    });
    $("#" + C + B + "Scrollar.nano, #" + C + A + "Scrollar.nano").nanoScroller()
}

function loadEditRefineGlobal(A) {
    var C = $(window).width();
    var B = 3;
    if ((C >= 1200 && searchType == 1) || (C >= 1200 && searchType == 2) || (C >= 1200 && searchType == 5)) {
        B = 3;
        $("#refinePanel").parent().parent().css("width", "1200")
    }
    A = A.replace(/, /g, ",");
    $.ajax({
        dataType: "html",
        type: "get",
        url: fullContextPath + "/editRefineSearchGlobal.html?callType=ajax&" + A + "&searchType=" + searchType + "&upfrontFilterSize=" + B,
        cache: false,
        async: false,
        success: function(D) {
            if (D) {
                if ($("#refinePanel")) {
                    $("#refinePanel").html(D);
                    if (B == 8) {
                        $("#srpRefine .wrapper").css("width", "1200")
                    }
                    $("#refinePanel").ready(function() {
                        trackSearchResult(A)
                    })
                }
            }
        }
    })
}

function trackSearchResult(A) {
    try {
        var F = ntrack.getRawDataObject();
        F.rawUrl = A;
        var D = new Object();
        try {
            var I = $("#searchMapFields").val();
            var J = I.split("&");
            if (J != null) {
                for (var E = 0; E < J.length; E++) {
                    var B = J[E];
                    var C = B.split("=");
                    D[C[0]] = C[1]
                }
            }
        } catch (H) {
            console.log("error occured in map creation..")
        }
        F.psm = D.psmid;
        F.trackingEvent = ntrack.trackingEvent.Search;
        F.Source = ntrack.Source.Web;
        ntrack.sendRamTrackEvent(F)
    } catch (G) {
        console.log(G)
    }
}

function resetField(A) {
    $("#allSelectedRefinedOptions .refinedField").each(function() {
        var D = $(this).attr("class");
        var C = D.split(" ");
        var E = C[1];
        var B = E.split("_");
        if (B[0] == A) {
            $(this).click()
        }
    })
}

function resetAllFilters() {
    try {
        $("#allSelectedRefinedOptions .refinedField").each(function() {
            var F = $(this).attr("class");
            var E = F.split(" ");
            var G = E[1];
            var D = G.split("_");
            if (D[0] != "city" && D[0] != "category" && D[0] != "propertyType") {
                $(this).click()
            }
        });
        var C = replaceValueInGaqCookie("sequenceNum", null, "gaqCompleteCookie", "||", "Y");
        replaceValueInGaqCookie("universalTimestamp", "" + new Date(), "gaqCompleteCookie", "||", "N");
        var B = createGaqStringForHome(C, "localityName");
        createCookieExpiresInTimeInDays("gaqCompleteCookie", B, 200);
        if (_gaq) {
            _gaq.push(["_trackEvent", B, "SearchPage"])
        }
    } catch (A) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("editRefineSearch", "srhKeywordDown", A)
        }
    }
}

function validateRangeValue(F, D, A) {
    try {
        var B = $("input:radio[name=" + F + "]").index($("input:radio[name=" + F + "]:checked"));
        var C = $("input:radio[name=" + D + "]").index($("input:radio[name=" + D + "]:checked"));
        if (B >= 0 && C >= 0 && C < B) {
            $("input:radio[name=" + D + "]:checked").prop("checked", false);
            $("#" + A).val($("input:radio[name=" + F + "]:checked").attr("text") + " - Max");
            if (F.indexOf("area") >= 0) {
                $("#inputAreaFront").val($("#" + A).val() + " " + $("#inputareaUnit").val())
            }
            return false
        } else {
            if (B >= 0 && C >= 0) {
                $("#" + A).val($("input:radio[name=" + F + "]:checked").attr("text") + " - " + $("input:radio[name=" + D + "]:checked").attr("text"));
                $("#inputAreaFront").addClass("hintColorChange");
                if (F.indexOf("area") >= 0) {
                    $("#inputAreaFront").val($("#" + A).val() + " " + $("#inputareaUnit").val())
                }
            } else {
                if (B >= 0) {
                    $("#" + A).val($("input:radio[name=" + F + "]:checked").attr("text") + " - Max");
                    $("#inputAreaFront").addClass("hintColorChange");
                    if (F.indexOf("area") >= 0) {
                        $("#inputAreaFront").val($("#" + A).val() + " " + $("#inputareaUnit").val())
                    }
                } else {
                    if (C >= 0) {
                        $("#" + A).val("Up to " + $("input:radio[name=" + D + "]:checked").attr("text"));
                        $("#inputAreaFront").addClass("hintColorChange");
                        if (F.indexOf("area") >= 0) {
                            $("#inputAreaFront").val($("#" + A).val() + " " + $("#inputareaUnit").val())
                        }
                    } else {
                        if (F.indexOf("area") >= 0) {
                            $("#" + A).val("Area");
                            $("#inputAreaFront").val("Area")
                        } else {
                            $("#" + A).val("Floor Number")
                        }
                        $("#inputAreaFront").removeClass("hintColorChange")
                    }
                }
            }
        }
        $("#" + A).addClass("hintColorChange");
        return true
    } catch (E) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("editRefineSearch", "validateRangeValue", E)
        }
        return false
    }
}

function getEnableDisable(A) {
    try {
        stopRefine = true;
        if (A == "10080") {
            $("#ageConstruction").addClass("disable");
            $("#possessionYears").removeClass("disable");
            if ($("#possessionStatus_10080").parent()) {
                $("#possessionStatus_10080").parent().addClass("checked")
            }
            if (!$("#possessionStatus_10080").is(":checked")) {
                $("#possessionYears").addClass("disable");
                $("input:checkbox[name=possessionYears]:checked").each(function() {
                    $(this).click()
                })
            }
        } else {
            if (A == "10081" && $("#possessionStatus_10081").parent()) {
                $("#possessionStatus_10081").parent().addClass("checked")
            }
        }
        stopRefine = false
    } catch (B) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("editRefineSearch", "getEnableDisable", B)
        }
    }
}

function getcomScorePageUrl() {
    if (searchType == 2) {
        return "agent_refine"
    } else {
        if (searchType == 5) {
            return "project_refine"
        }
    }
    if (searchType == 3) {
        return "buyer_refine"
    }
    if (searchType == 1) {
        if (!(typeof mapSearch === "undefined") && mapSearch) {
            return "map-result-page"
        } else {
            return "property_refine"
        }
    }
}

function getGaPageUrl() {
    if (searchType == 2) {
        return "agentRefine"
    } else {
        if (searchType == 5) {
            return "projectRefine"
        }
    }
    if (searchType == 3) {
        return "buyerRefine"
    }
    if (searchType == 1) {
        if (!(typeof mapSearch === "undefined") && mapSearch) {
            return "/bricks/map-result-page.html"
        } else {
            return "/bricks/refined-search.html"
        }
    }
}

function ajax_track_comScore(B) {
    try {
        track_comScore_new(B)
    } catch (A) {}
    _comscore = [];
    _comscore.push({
        c1: "2",
        c2: "6036484",
        c3: "",
        c4: comScoreUrlPath + B
    });
    var C = document.createElement("script");
    C.setAttribute("type", "text/javascript");
    C.setAttribute("src", jsPath + "ajaxComScore.js?" + new Date());
    document.getElementsByTagName("head")[0].appendChild(C)
}

function trackGAComScoreEditRefine(C) {
    try {
        var B = getcomScorePageUrl();
        ajax_track_comScore(B + "_" + C);
        var A = getGaPageUrl();
        _gaq.push(["_trackPageview", A + "_" + C])
    } catch (D) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("editRefineSearch", "trackGAComScoreEditRefine", D)
        }
    }
}

function refineBlockShowHide(C, A) {
    $(".refDDList").hide();
    $(A).slideToggle("fast");
    var B = $(C);
    B.parent().toggleClass("active").siblings().removeClass("active")
}

function getCheckedCount(A) {
    var B = 0;
    $(A).each(function() {
        if ($(this).attr("checked")) {
            B++
        }
    });
    return B
}

function getCheckedVal(A) {
    try {
        var B = $(A).attr("name");
        updateLabel(B);
        getLocValue(A);
        $(A).parents("#refinecategory").find(".tkIco").remove();
        $(A).parents("li").find("label").append("<span class='tkIco'></span>")
    } catch (C) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("editRefineSearch", "getCheckedVal", C)
        }
    }
}

function updateSelection(A, B) {
    var C = $("input:" + B + "[name=" + A + "]:checked").length;
    if (C == 0) {
        $("#" + A + "tick").animate({
            opacity: 0
        })
    } else {
        $("#" + A + "tick").animate({
            opacity: 1
        })
    }
}

function updateCountForBudgetPerSqft(D, E) {
    var C = arguments[3];
    if (D.value != "0" || typeof C == "undefined" || C == "budgetPerSqft") {
        $("#" + E).val(D.value);
        $("#" + E).html(D.innerHTML)
    } else {
        $("#" + E).val("");
        $("#" + E).html("")
    }
    if ((D.value == "1" || D.value == 1)) {
        $("#" + E).val("");
        $("#" + E).html("")
    }
    var A = arguments[2];
    if (E.indexOf("Max") > 0) {
        $("#" + C + "Range").hide()
    }
    if (C == "budgetPerSqft") {
        if (typeof A !== "undefined" && A != "undefined" && A != "") {
            if (E.indexOf("Max") > 0 && parseInt(D.value) < parseInt($("#" + A).val())) {
                $("#" + E).val("");
                $("#" + E).html("")
            } else {
                if (E.indexOf("Min") > 0 && parseInt(D.value) > parseInt($("#" + A).val())) {
                    $("#" + E).val("0");
                    $("#" + E).html("")
                }
            }
        }
        if (E.indexOf("Min") > 0) {
            $("#rangeMaxLink" + C + "input").click();
            $("#rangeMaxLink" + C + "input").focus()
        }
        selectAutosuggest($("#" + E), "budgetPerSqft")
    } else {
        if (C == "budget") {
            if ($("#" + E).val() == "Max" || $("#" + E).val() == "MAX" || $(D).attr("actualval") == "Max" || $(D).attr("actualval") == "MAX") {
                $("#" + E).val("")
            } else {
                if (typeof A !== "undefined" && A != "undefined" && A != "") {
                    if (E.indexOf("Max") > 0 && parseInt(D.value) < parseInt($("#" + A).val())) {
                        $("#" + E).val("");
                        $("#" + E).html("");
                        $("#" + C + "Range").hide()
                    } else {
                        if (E.indexOf("Min") > 0 && parseInt(D.value) > parseInt($("#" + A).val())) {
                            var B = E.replace("Min", "Max");
                            $("#" + B).val("");
                            $("#" + B).html("")
                        }
                    }
                }
            }
            if (E.indexOf("Min") > 0) {
                $("#rangeMaxLink" + C + "input").click();
                $("#rangeMaxLink" + C + "input").focus()
            }
            selectAutosuggest($("#" + E), "budget", "newBudgetField")
        }
    }
    if ($("#inputbudget").val() == "Budget") {
        $("#budgetIco").removeAttr("style")
    } else {
        $("#budgetIco").css({
            opacity: 1
        })
    }
}

function updateLabel(A) {
    try {
        var B = 0;
        $("input:checkbox[name=" + A + "]:checked").each(function() {
            B++
        });
        if (B == 0) {
            B = $("input:radio[name=" + A + "]:checked").length;
            if (B > 0) {
                $("input:radio[name=" + A + "]").each(function() {
                    $(this).parent().removeClass("checked")
                })
            }
        }
        A = A.replace("From", "").replace("To", "").replace("Min", "").replace("Max", "");
        if (B == 0) {
            $("#" + A + "tkIco").animate({
                opacity: 0
            })
        } else {
            $("#" + A + "tkIco").animate({
                opacity: 1
            })
        }
    } catch (C) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("editRefineSearch", "updateLabel", C)
        }
    }
}

function getFiltersSelectedCount() {
    var A = 0;
    $("#moreRefined :input:checked").each(function() {
        if ($(this).attr("name") != "areaUnit") {
            A++
        }
    });
    return A
}

function reloadFilter(A) {
    if (A == "category") {
        $("#allSelectedRefinedOptions ul.clicked").html("");
        $("#rangeMinLinkbudgetinput").val("");
        $("#rangeMaxLinkbudgetinput").val("");
        $("#inputbudget").val("Budget");
        $("#allSelectedRefinedOptions ul.budgetMin").html("");
        $("#allSelectedRefinedOptions ul.budgetMax").html("")
    }
    var B = getUrlStringToSearch();
    if (A != "category") {
        $("#allSelectedRefinedOptions ul.clicked").html("");
        $("#rangeMinLinkbudgetinput").val("");
        $("#rangeMaxLinkbudgetinput").val("");
        $("#inputbudget").val("Budget");
        $("#allSelectedRefinedOptions ul.budgetMin").html("");
        $("#allSelectedRefinedOptions ul.budgetMax").html("")
    }
    $("#allSelectedRefinedOptions ul.fixed").html("");
    $(".bearByBlock").hide();
    $("#topLoader").show();
    loadEditRefineGlobal(B)
}

function getLocValue(A) {
    try {
        if (typeof timeout1 !== "undefined") {
            clearTimeout(timeout1)
        }
        if (typeof timeout2 !== "undefined") {
            clearTimeout(timeout2)
        }
        if (typeof timeout3 !== "undefined") {
            clearTimeout(timeout3)
        }
        var L = $(A).attr("text");
        if (L == undefined || L == "undefined") {
            L = $(A).text()
        }
        var C = $(A).attr("id");
        var B = C.substring(0, C.indexOf("_"));
        if ($("#" + C).parents("#moreRefined") && $("#" + C).parents("#moreRefined").attr("id")) {
            var M = readCookie("moreRefined");
            var F = B.replace("From", "").replace("To", "").replace("Min", "").replace("Max", "").replace("Unit", "");
            if (M && M != "" && M != null && M != "null") {
                var K = M.split("|");
                if (K.length > 1) {
                    K.shift()
                }
                if (M == null || M == "" || M.indexOf(F) == -1) {
                    K.push(F)
                }
                M = K.join()
            } else {
                M = F
            }
            createCookie("moreRefined", M.replaceAll(",", "|"), 2)
        }
        if (C) {
            if (!stopRefine) {
                if (readCookieVal("gaqCompleteCookie") == null) {
                    var N = createGaqStringForHome(1, "localityName");
                    createCookieExpiresInTimeInDays("gaqCompleteCookie", N, 200)
                }
                var H = C.split("_");
                if (H[0] == "areaFrom" || H[0] == "areaTo") {
                    replaceValueInGaqCookie("srp" + H[0], H[1], "gaqCompleteCookie", "||", "N");
                    var E = replaceValueInGaqCookie("sequenceNum", null, "gaqCompleteCookie", "||", "Y");
                    gaqCookie = readCookieVal("gaqCompleteCookie");
                    console.log("gaqCookieDetail " + gaqCookie);
                    if (_gaq) {
                        _gaq.push(["_trackEvent", gaqCookie, "HomePageSearch"])
                    }
                } else {
                    if (H[0] == "category") {
                        replaceValueInGaqCookie("srp" + H[0], H[1], "gaqCompleteCookie", "||", "N")
                    } else {
                        if ($(A).is(":checked")) {
                            if (H[0] == "propertyType") {
                                var K = "";
                                var G = 1;
                                for (G = 1; G < H.length; G++) {
                                    if (K == "") {
                                        K = H[G]
                                    } else {
                                        K = K + "_" + H[G]
                                    }
                                }
                                addValueInGaqCookie("srpPropertyType", K, "gaqCompleteCookie", "||", "*")
                            } else {
                                addValueInGaqCookie("srp" + H[0], H[1], "gaqCompleteCookie", "||", "*")
                            }
                        } else {
                            if (H[0] == "propertyType") {
                                var K = "";
                                var G = 1;
                                for (G = 1; G < H.length; G++) {
                                    if (K == "") {
                                        K = H[G]
                                    } else {
                                        K = K + "_" + H[G]
                                    }
                                }
                                removeValueInGaqCookie("srpPropertyType", K, "gaqCompleteCookie", "||", "*")
                            } else {
                                removeValueInGaqCookie("srp" + H[0], H[1], "gaqCompleteCookie", "||", "*")
                            }
                        }
                    }
                    replaceValueInGaqCookie("universalTimestamp", "" + new Date(), "gaqCompleteCookie", "||", "N");
                    var E = replaceValueInGaqCookie("sequenceNum", null, "gaqCompleteCookie", "||", "Y");
                    gaqCookie = readCookieVal("gaqCompleteCookie");
                    console.log("gaqCookieDetail " + gaqCookie);
                    if (_gaq) {
                        _gaq.push(["_trackEvent", gaqCookie, "PageSearch"])
                    }
                }
                trackGAComScoreEditRefine(C + " " + $(A).is(":checked"))
            }
            if ($(A).is(":checked")) {
                if (!$("#allSelectedRefinedOptions ." + C).attr("class")) {
                    $("#" + C).parent().addClass("checked");
                    if (C.indexOf("bedrooms") != -1) {
                        $("#" + C.replace("bedrooms", "bhk")).addClass("checked")
                    }
                    $("#allSelectedRefinedOptions").css("paddingBottom", "0px");
                    if (C.indexOf("propertyType") != -1 && !stopRefine) {
                        $("<li class='refinedField " + C + "'>" + L + "</li>").appendTo($("#allSelectedRefinedOptions ul." + B));
                        resetField("pType");
                        reloadFilter("propertyType")
                    } else {
                        if (C.indexOf("propertyType") != -1 && stopRefine) {
                            $("<li class='refinedField " + C + "'>" + L + "</li>").appendTo($("#allSelectedRefinedOptions ul." + B))
                        } else {
                            if (C.indexOf("category") != -1 && stopRefine) {
                                $("#allSelectedRefinedOptions ul.category").html("");
                                $("#allSelectedRefinedOptions ul.categoryC").html("");
                                $("<li class='refinedField " + C + "'>" + L + "</li>").appendTo($("#allSelectedRefinedOptions ul." + B));
                                if (C.indexOf("categoryC") != -1) {
                                    $(".buyRentInput").val("Commercial " + L)
                                } else {
                                    $(".buyRentInput").val(L)
                                }
                            } else {
                                if (C.indexOf("category") != -1 && !stopRefine) {
                                    $("#allSelectedRefinedOptions ul.category").html("");
                                    $("#allSelectedRefinedOptions ul.categoryC").html("");
                                    $("<li class='refinedField " + C + "'>" + L + "</li>").appendTo($("#allSelectedRefinedOptions ul." + B));
                                    $("#autoSuggestInputDivrefine_keyword").click();
                                    reloadFilter("category");
                                    if (C.indexOf("categoryC") != -1) {
                                        $(".buyRentInput").val("Commercial " + L)
                                    } else {
                                        $(".buyRentInput").val(L)
                                    }
                                } else {
                                    if (C.indexOf("postedSince") != -1 || C.indexOf("floorNo") != -1 || C.indexOf("areaUnit") != -1) {
                                        $("#allSelectedRefinedOptions ul." + B).html("");
                                        $("<li class='refinedField " + C + "'>" + L + "</li>").appendTo($("#allSelectedRefinedOptions ul." + B));
                                        $(".removeAllNSR").show()
                                    } else {
                                        if (C.indexOf("areaFrom") != -1 || C.indexOf("areaTo") != -1) {
                                            $("#allSelectedRefinedOptions ul." + B).html("");
                                            if (L != "Min") {
                                                if (C.indexOf("areaFrom") != -1) {
                                                    $("<li class='refinedField " + C + "'>Min " + L + "</li>").appendTo($("#allSelectedRefinedOptions ul." + B))
                                                } else {
                                                    $("<li class='refinedField " + C + "'>Max " + L + "</li>").appendTo($("#allSelectedRefinedOptions ul." + B))
                                                }
                                                $(".removeAllNSR").show()
                                            }
                                            if (bothSideTrim($("#allSelectedRefinedOptions ul.areaFrom").html()) == "" && bothSideTrim($("#allSelectedRefinedOptions ul.areaTo").html()) == "") {
                                                $(".areaUnit").hide();
                                                $(".removeAllNSR").hide()
                                            }
                                        } else {
                                            $("<li class='refinedField " + C + "'>" + L + "</li>").appendTo($("#allSelectedRefinedOptions ul." + B));
                                            $(".removeAllNSR").show()
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                $("." + B + "NSR").show()
            } else {
                $("#" + C).parent().removeClass("checked");
                if (C.indexOf("bedrooms") != -1) {
                    $("#" + C.replace("bedrooms", "bhk")).removeClass("checked")
                }
                $("#allSelectedRefinedOptions").find("." + C).remove();
                if (C.indexOf("propertyType") != -1 && !stopRefine) {
                    resetField("pType");
                    reloadFilter("propertyType")
                }
                if (bothSideTrim($("#allSelectedRefinedOptions ul." + B).html()) == "") {
                    var J = B.replace("From", "");
                    J = J.replace("To", "");
                    if (J == "area" || J == "floorNo") {
                        if (($("#allSelectedRefinedOptions ul." + J + "From").html() == null || $("#allSelectedRefinedOptions ul." + J + "From").html() == "") && ($("#allSelectedRefinedOptions ul." + J + "To").html() == null || $("#allSelectedRefinedOptions ul." + J + "To").html() == "")) {
                            $("." + B + "NSR").hide()
                        }
                    } else {
                        $("." + B + "NSR").hide()
                    }
                }
                if ($("#allSelectedRefinedOptions ul.clicked .refinedField").length <= 0) {
                    $(".removeAllNSR").hide()
                }
            }
        }
        var D = getFiltersSelectedCount();
        if (D != 0) {
            $("#moreRefineWraptkIco").animate({
                opacity: 1
            });
            $("#moreDefault").addClass("hintColorChange");
            $(".resetAllFilters").show()
        } else {
            $("#moreRefineWraptkIco").animate({
                opacity: 0
            });
            $("#moreDefault").removeClass("hintColorChange");
            $(".resetAllFilters").hide()
        }
        getSearchUrl();
        $("#inputpostedSince").removeClass("hintColorChange");
        $(".postedSinceList .singleLabel").live("click", function() {
            $("#inputpostedSince").addClass("hintColorChange")
        });
        checkAndCreateDataForTimeTravel()
    } catch (I) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("editRefineSearch", "getLocValue", I)
        }
    }
}
$("#srpRefine .refineBlock").live("click", function() {
    $("#srpRefine .refineBlock").css("z-index", "9");
    $(this).css("z-index", "10")
});

function cleareAll(B) {
    stopRefine = true;
    var A = 0;
    $("#selectedRefinedOptions" + B + " .deleteThis").each(function() {
        $(this).click();
        A++
    });
    stopRefine = false;
    if (A > 0) {
        getSearchUrl()
    }
}

function initCap(F) {
    var C = F.split(" "),
        D, B = [];
    for (D = 0; D < C.length; D++) {
        var A = Trim(C[D]).substring(0, 1).toUpperCase();
        var E = Trim(C[D]).substring(1).toLowerCase();
        B.push(A + E)
    }
    return B.join(" ")
}

function addValueInBudgetMinMax(B) {
    var C = "";
    var A = "";
    if (typeof $("#bar_budget_min_new") !== "undefined" && typeof $("#bar_budget_min_new").val() !== "undefined") {
        C = $("#bar_budget_min_new").val().replace(/^0+/, "")
    }
    if (typeof $("#bar_budget_max_new") !== "undefined" && typeof $("#bar_budget_max_new").val() !== "undefined") {
        A = $("#bar_budget_max_new").val().replace(/^0+/, "")
    }
    if (B == "budgetMin") {
        $("<li class='refinedField budgetMin_" + $("#bar_budget_min_new").val() + "'>Min Budget<span class='budget'></span> " + C + "</li>").appendTo($("#allSelectedRefinedOptions ul.budgetMin"))
    } else {
        $("<li class='refinedField budgetMax_" + $("#bar_budget_max_new").val() + "'>Max Budget<span class='budget'></span> " + A + "</li>").appendTo($("#allSelectedRefinedOptions ul.budgetMax"))
    }
}

function selectAutosuggest(H, F) {
    try {
        var M = arguments[2];
        var E = H.id;
        if ($(H).attr("type") == "text" || $(H).attr("type") == "hidden") {
            if (F == "budget" && typeof M == "undefined") {
                $("#allSelectedRefinedOptions ul.budgetMin").html("");
                $("#allSelectedRefinedOptions ul.budgetMax").html("");
                if ($("#budgetMin").val() != "" || $("#budgetMax").val() != "") {
                    var K = $("#budgetMin").attr("text");
                    var B = $("#budgetMax").attr("text");
                    if ($("#budgetMin").val() != "") {
                        $("<li class='refinedField budgetMin_" + $("#budgetMin").val() + "'>Min Budget <span class='budget'></span> " + K + "</li>").appendTo($("#allSelectedRefinedOptions ul.budgetMin"))
                    }
                    if ($("#budgetMax").val() != "") {
                        $("<li class='refinedField budgetMax_" + $("#budgetMax").val() + "'>Max Budget <span class='budget'></span> " + B + "</li>").appendTo($("#allSelectedRefinedOptions ul.budgetMax"))
                    }
                    if (!stopRefine) {
                        trackGAComScoreEditRefine("budget_" + H.value + " true")
                    }
                } else {
                    if (!stopRefine) {
                        trackGAComScoreEditRefine("budget_" + H.value + " false")
                    }
                }
                getSearchUrl()
            } else {
                if (F == "budget") {
                    $("#allSelectedRefinedOptions ul.budgetMin").html("");
                    $("#allSelectedRefinedOptions ul.budgetMax").html("");
                    if ($("#rangeMinLinkbudgetinput").val() != "" || $("#rangeMaxLinkbudgetinput").val() != "") {
                        var K = $("#rangeMinLinkbudgetinput").attr("text").replace(/^0+/, "");
                        var B = $("#rangeMaxLinkbudgetinput").attr("text").replace(/^0+/, "");
                        $("<li class='refinedField budgetMin_" + $("#rangeMinLinkbudgetinput").val() + "'>Min Budget<span class='budget'></span> " + K + "</li>").appendTo($("#allSelectedRefinedOptions ul.budgetMin"));
                        $("<li class='refinedField budgetMax_" + $("#rangeMaxLinkbudgetinput").val() + "'>Max Budget<span class='budget'></span> " + B + "</li>").appendTo($("#allSelectedRefinedOptions ul.budgetMax"));
                        if (!stopRefine) {
                            trackGAComScoreEditRefine("budget_" + H.value + " true")
                        }
                    }
                    if (typeof previousMaxbudgetVal !== "undefined" && typeof previousMinbudgetVal !== "undefined" && (previousMaxbudgetVal != $("#rangeMaxLinkbudgetinput").val() || previousMinbudgetVal != $("#rangeMinLinkbudgetinput").val())) {
                        previousMaxbudgetVal = $("#rangeMaxLinkbudgetinput").val().replace(/^0+/, "");
                        previousMinbudgetVal = $("#rangeMinLinkbudgetinput").val().replace(/^0+/, "");
                        $("#rangeMinLinkbudgetinput").val(previousMinbudgetVal);
                        $("#rangeMaxLinkbudgetinput").val(previousMaxbudgetVal);
                        previousMaxbudgetHtml = convertBudgetToValueUnits($("#rangeMaxLinkbudgetinput").val().replace(/^0+/, ""));
                        previousMinbudgetHtml = convertBudgetToValueUnits($("#rangeMinLinkbudgetinput").val().replace(/^0+/, ""));
                        if (previousMinbudgetVal != 0 && previousMinbudgetVal != "0" && previousMinbudgetVal != "" && previousMaxbudgetVal != "Max" && previousMaxbudgetVal != "") {
                            $("#inputbudget").val(previousMinbudgetHtml + " - " + previousMaxbudgetHtml)
                        } else {
                            if ((previousMinbudgetVal == "" || previousMinbudgetVal == "0") && (previousMaxbudgetVal == "" || previousMaxbudgetVal == "Max")) {
                                $("#inputbudget").val($("#hiddenActualHeading").val())
                            } else {
                                if (previousMinbudgetVal == "" || previousMinbudgetVal == "0") {
                                    $("#inputbudget").val("Upto " + previousMaxbudgetHtml)
                                } else {
                                    $("#inputbudget").val("Greater than " + previousMinbudgetHtml)
                                }
                            }
                        }
                        replaceValueInGaqCookie("srpBudgetMin", $("#rangeMinLinkbudgetinput").val(), "gaqCompleteCookie", "||", "N");
                        replaceValueInGaqCookie("srpBudgetMax", $("#rangeMaxLinkbudgetinput").val(), "gaqCompleteCookie", "||", "N");
                        replaceValueInGaqCookie("universalTimestamp", "" + new Date(), "gaqCompleteCookie", "||", "N");
                        var G = replaceValueInGaqCookie("sequenceNum", null, "gaqCompleteCookie", "||", "Y");
                        var I = readCookieVal("gaqCompleteCookie");
                        if (I == null) {
                            I = createGaqStringForHome(1, "localityName");
                            createCookieExpiresInTimeInDays("gaqCompleteCookie", I, 200);
                            replaceValueInGaqCookie("srpBudgetMin", $("#rangeMinLinkbudgetinput").val(), "gaqCompleteCookie", "||", "N");
                            replaceValueInGaqCookie("srpBudgetMax", $("#rangeMaxLinkbudgetinput").val(), "gaqCompleteCookie", "||", "N");
                            replaceValueInGaqCookie("universalTimestamp", "" + new Date(), "gaqCompleteCookie", "||", "N");
                            var G = replaceValueInGaqCookie("sequenceNum", null, "gaqCompleteCookie", "||", "Y")
                        }
                        console.log("gaqCookieDetail " + I);
                        if (_gaq) {
                            _gaq.push(["_trackEvent", I, "Budget in Search"])
                        }
                        getSearchUrl()
                    } else {
                        previousMaxbudgetVal = $("#rangeMaxLinkbudgetinput").val();
                        previousMinbudgetVal = $("#rangeMinLinkbudgetinput").val();
                        return
                    }
                } else {
                    if (F == "area") {
                        var C = H.value;
                        if (C.indexOf(",") == C.length - 1) {
                            C = C.substring(0, H.value.length - 1)
                        }
                        C = Trim(initCap(C));
                        var L = $(H).attr("class");
                        var D = L;
                        if (D.includes("areaFrom")) {
                            D = "areaFrom"
                        } else {
                            if (D.includes("areaTo")) {
                                D = "areaTo"
                            }
                        }
                        var E = D + "_" + C;
                        if (C == "") {
                            $(".area" + D).click();
                            return
                        }
                        if (C != "Min" && C != "Max") {
                            C = Math.round(C);
                            $(H).val(C)
                        }
                        $(".area" + D).remove();
                        if ($("#minarea").val() != "Min" && $("#maxarea").val() != "Max" && parseInt($("#minarea").val()) > parseInt($("#maxarea").val())) {
                            $("#maxarea").val("Max");
                            $(".areaareaTo").remove()
                        }
                        C = $(H).val();
                        if (C != "Min" && C != "Max") {
                            var A = (D != null && D.includes("From")) ? "Min " : "Max ";
                            $("<li class='refinedField " + E + " area" + D + "'>" + A + C + "</li>").appendTo($("#allSelectedRefinedOptions ul." + D));
                            $("." + D + "NSR").show()
                        }
                        if (areaVal != C && ($("#minarea").val() != "Min" || $("#maxarea").val() != "Max")) {
                            getSearchUrl();
                            if (!stopRefine) {
                                trackGAComScoreEditRefine(E)
                            }
                        }
                    }
                }
            }
        }
    } catch (J) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("editRefineSearch", "selectAutosuggest", J)
        }
    }
}

function getSearchUrl() {
    try {
        $("#keyword_suggest").hide();
        if (!stopRefine) {
            globalFlag = false;
            trackPageNav();
            $(".formErr").hide();
            if (!validateFieldsSuccess()) {
                return
            }
            if (!(typeof mapSearch === "undefined") && mapSearch) {
                getMapSearchResult()
            } else {
                editSearchResults(getUrlStringToSearch(), 1)
            }
        }
    } catch (A) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("editRefineSearch", "getSearchUrl", A)
        }
    }
}

function validateFieldsSuccess() {
    var C = $("#bar_city").val();
    var B = $("#radius").val();
    if ((C == null || C == "") && B == "" && $("#isRadiusSearch").val() != "Y") {
        $("#errorMessageCity").show();
        if ($("#refine_keyword").val().trim() == "") {
            $("#onlyLocation").show()
        } else {
            $("#validLocation").show()
        }
        _gaq.push(["_trackEvent", "cityFieldError|Input = " + $("#refine_keyword").val(), "Refine"]);
        $("#autoSuggestInputDivrefine_keyword").addClass("borderErrRed");
        $("#topLoader").hide();
        $("#topLoader").removeClass("loaderBG");
        return false
    }
    var A = $("#allSelectedRefinedOptions ul.propertyType li").length;
    if (A == 0) {
        $("#propType_err").show();
        $("#propertyType").addClass("borderErrRed");
        $("#topLoader").hide();
        $("#topLoader").removeClass("loaderBG");
        return false
    } else {
        $("#propType_err").hide();
        $("#propertyType").removeClass("borderErrRed")
    }
    return true
}

function getStringFromMap(A) {
    var B = "";
    try {
        for (var C in A) {
            if (A.hasOwnProperty(C)) {
                if (B == "") {
                    B = C + "=" + A[C]
                } else {
                    B += "&" + C + "=" + A[C]
                }
            }
        }
    } catch (D) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("editRefineSearch", "getStringFromMap", D)
        }
    }
    return B
}

function getUrlStringToSearch() {
    var A = getDataMap();
    var B = getStringFromMap(A);
    B = getFixedParam(B);
    return B
}

function getDataMap() {
    var A = new Object();
    try {
        $("#allSelectedRefinedOptions .refinedField").each(function() {
            var E = $(this).attr("class");
            var D = E.split(" ");
            var F = D[1];
            if (F.indexOf("propertyType") >= 0) {
                var G = F.replace("propertyType_", "");
                F = "propertyType_" + G.replace(/_/g, ",")
            }
            var C = F.split("_");
            if (A[C[0]]) {
                var H = A[C[0]];
                if (C[0] == "propertyType") {
                    A.propertyType = H + "," + (C[1].replace(/,/g, "_"))
                } else {
                    A[C[0]] = H + "," + C[1]
                }
            } else {
                if (C[0] == "propertyType") {
                    A.propertyType = C[1].replace(/,/g, "_")
                } else {
                    A[C[0]] = C[1]
                }
            }
        });
        A.bar_propertyType_new = A.propertyType;
        delete A.propertyType
    } catch (B) {
        alert(B);
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("editRefineSearch", "getDataMap", B)
        }
    }
    return A
}

function getSelectedChecked(F) {
    stopRefine = true;
    try {
        var B = decodeURIComponent(F);
        var E = B.split("&");
        for (var D = 0; D < E.length; D++) {
            var A = E[D].split("=");
            if (A[0] == "bar_propertyType_new") {
                A[0] = "propertyType";
                if (A[1] != null) {
                    A[1] = A[1].replace("9001", "10007_10018,10008_10009,10006_10012,10011,10013,10014");
                    A[1] = A[1].replace("9002", "10005,10004");
                    if (searchType == 5) {
                        A[1] = A[1].replace("9000", "10002_10021_10022_10020,10001_10017,10000")
                    } else {
                        if (B.indexOf("category=R") >= 0 || B.indexOf("category=r") >= 0) {
                            A[1] = A[1].replace("9000", "10002_10003_10021_10022_10020,10001_10017,10050_10053")
                        } else {
                            A[1] = A[1].replace("9000", "10002_10003_10021_10022,10001_10017,10000")
                        }
                    }
                }
            } else {
                if (A[0].indexOf("propertyType") >= 0 || (B.indexOf("categoryC") >= 0 && A[0] == "category")) {
                    continue
                }
            }
            if (A.length > 1) {
                if (A[1].indexOf(",") > 0) {
                    var H = A[1].split(",");
                    for (var C = 0; C < H.length; C++) {
                        if (A[0] == "propertyType") {
                            $("#" + A[0] + "_" + H[C]).attr("checked", true);
                            $("#" + A[0] + "_" + H[C]).trigger("onchange")
                        } else {
                            $("#" + A[0] + "_" + H[C]).attr("checked", true);
                            $("#" + A[0] + "_" + H[C]).trigger("onchange")
                        }
                    }
                } else {
                    if (A[0] == "propertyType") {
                        $("#" + A[0] + "_" + A[1]).attr("checked", true);
                        $("#" + A[0] + "_" + A[1]).trigger("onchange")
                    } else {
                        if (A[0] == "budgetMin") {
                            addValueInBudgetMinMax("budgetMin")
                        } else {
                            if (A[0] == "budgetMax") {
                                addValueInBudgetMinMax("budgetMax")
                            } else {
                                $("#" + A[0] + "_" + A[1]).attr("checked", true);
                                $("#" + A[0] + "_" + A[1]).trigger("onchange")
                            }
                        }
                    }
                }
            }
        }
    } catch (G) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("editRefineSearch", "getSelectedChecked", G)
        }
    }
    stopRefine = false
}

function getSearchControllerName() {
    var A = "createPropertySearchResult.html";
    if (searchType == 1) {
        A = "createPropertySearchResult.html"
    } else {
        if (searchType == 2) {
            A = "createAgentSearchResult.html"
        } else {
            if (searchType == 3) {
                A = "createBuyerSearchResult.html"
            } else {
                if (searchType == 4) {
                    A = "createAgentBuilderSearchResult.html"
                } else {
                    if (searchType == 5) {
                        A = "createProjectSearchResult.html"
                    } else {
                        if (searchType == 13) {
                            A = "createLocalitySearchResult.html"
                        }
                    }
                }
            }
        }
    }
    return A
}

function getSearchResultPage() {
    var A = "/propertySearch.html?from=submit&breadcrumbTypeEncode=yes&";
    if (searchType == 1) {
        A = "/propertySearch.html?from=submit&breadcrumbTypeEncode=yes&"
    } else {
        if (searchType == 2) {
            A = "/agentSearch.html?from=submit&"
        } else {
            if (searchType == 3) {
                A = "/requirementSearch.html?from=submit&"
            } else {
                if (searchType == 4) {
                    A = "/builderSearch.html?from=submit&"
                } else {
                    if (searchType == 5) {
                        A = "/projectSearch.html?from=submit&"
                    } else {
                        if (searchType == 13) {
                            A = "/localitySearch.html?from=submit&"
                        }
                    }
                }
            }
        }
    }
    return A
}

function getTabSwitched(K, I) {
    var B = searchType;
    try {
        var D = "&previousSearchType=" + searchType;
        var J = getDataMap();
        var A = getStringFromMap(J);
        if (K.indexOf("isMapSearch=true") > 0) {
            $("#isMapSearch").val("true")
        } else {
            $("#isMapSearch").val("false");
            mapSearch = false
        }
        var C = removeParameter(mainSearchedUrl, "firstLocalityLinkRender");
        C = removeParameter(C, "isRadiusSearch");
        C = removeParameter(C, "budgetPerSqftMax");
        C = removeParameter(C, "budgetPerSqftMin");
        C = removeParameter(C, "searchLocName");
        C = removeParameter(C, "radius");
        C = removeParameter(C, "city");
        C = removeParameter(C, "state");
        C = removeParameter(C, "category");
        C = removeParameter(C, "categoryC");
        C = removeParameter(C, "searchType");
        C = removeParameter(C, "isMapSearch");
        C = removeParameter(C, "propertyType");
        C = removeParameter(C, "propertyType");
        C = removeParameter(C, "pType");
        C = removeParameter(C, "pType");
        C = removeParameter(C, "bar_propertyType_new");
        C = removeParameter(C, "bar_propertyType_R_new");
        C = removeParameter(C, "bar_propertyType_new");
        C = removeParameter(C, "bar_propertyType_R_new");
        C = removeParameter(C, "projectSocity");
        C = removeParameter(C, "developerName");
        C = removeParameter(C, "bedrooms");
        C = removeParameter(C, "budgetMin");
        C = removeParameter(C, "budgetMax");
        C = removeParameter(C, "BudgetMin");
        C = removeParameter(C, "BudgetMax");
        C = removeParameter(C, "nsrSearchBar");
        C = removeParameter(C, "source");
        C = removeParameter(C, "localityName");
        C = removeParameter(C, "resultPerPage");
        C = removeParameter(C, "mbTrackSrc");
        C = removeParameter(C, "searchType");
        C = removeParameter(C, "pageOption");
        C = removeParameter(C, "pageOption");
        C = removeParameter(C, "searchTransMode");
        C = removeParameter(C, "searchLocTime");
        C = removeParameter(C, "searchLocType");
        C = removeParameter(C, "searchTransMode");
        C = removeParameter(C, "searchLocTime");
        C = removeParameter(C, "searchLocType");
        C = removeParameter(C, "dhfDeals");
        C = removeParameter(C, "dhfDeals");
        if (I == 2 || I == 5 || I == 13) {
            C = removeParameter(C, "areaUnit");
            C = removeParameter(C, "areaFrom");
            C = removeParameter(C, "areaTo");
            C = removeParameter(C, "areaTo")
        }
        if ((I == 1 || I == 5) && searchType == 2) {
            C = removeParameter(C, "criAgents");
            searchType = I;
            if (I == 1) {
                A = A.replace("tab1", "tab1Property")
            } else {
                if (I == 5) {
                    A = A.replace("tab1", "tab1Project")
                }
            }
            var F = $("#isMapSearch").val();
            A = getFixedParam(A);
            C = removeParameter(C, "tab1");
            if (F && F != "false") {
                A += "&isMapSearch=" + F
            }
            A += "&searchType=" + searchType;
            C = removeParameter(C, "tab1");
            A = C + "&" + A
        } else {
            var H = $("#tab1").val();
            A += "&page=1&tab1=" + H;
            if (I == 1) {
                A = A.replace("tab1", "tab1Property")
            } else {
                if (I == 5) {
                    A = A.replace("tab1", "tab1Project")
                } else {
                    if (I == 13) {
                        A = A.replace("tab1", "tab1Locality")
                    } else {
                        A = A.replace("tab1", "tab1Agent")
                    }
                }
            }
            A = removeParameter(A, "city");
            A = getFixedParam(A);
            searchType = I;
            C = removeParameter(C, "tab1");
            A = C + "&" + A
        }
        if (A.indexOf("mbTrackSrc=tabChange") == -1) {
            A += "&mbTrackSrc=tabChange"
        }
        if (A.indexOf("category=B")) {
            A = A.replace("category=B", "category=S")
        }
        if (typeof isRefineLoaded == "undefined" || !isRefineLoaded) {
            return
        }
        if (I == 13) {
            A = removeParameter(A, "searchType");
            var E = "/bricks" + getSearchResultPage() + A + D;
            E = E.replace("||", "?");
            if (E.indexOf("?") == -1) {
                E = E.replace("&", "?")
            }
            if (validateFieldsSuccess()) {
                window.location.href = E.replace("||", "?")
            }
        } else {
            ajaxService.encodeUrl("/bricks" + getSearchResultPage() + A, function(L) {
                L = L.replace("||", "?");
                if (L.indexOf("?") == -1) {
                    L = L.replace("&", "?")
                }
                if (validateFieldsSuccess()) {
                    window.location.href = L.replace("||", "?")
                } else {
                    searchType = B
                }
            })
        }
    } catch (G) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("editRefineSearch", "getTabSwitched", G)
        }
    }
}

function getFixedParam(C) {
    try {
        if ($("#isRadiusSearch").val() == "Y" && $("#radius").val != null && $("#radius").val() != "") {
            C = C + "&isRadiusSearch=Y";
            C = C + "&radius=" + $("#radius").val();
            C = C + "&searchLocName=" + $("#searchLocName").val();
            if ($("#searchLocType").val() != "") {
                C = C + "&searchLocType=" + $("#searchLocType").val()
            }
            if ($("#searchLocTime").val() != "") {
                C = C + "&searchLocTime=" + $("#searchLocTime").val()
            }
            if ($("#searchTransMode").val() != "") {
                C = C + "&searchTransMode=" + $("#searchTransMode").val()
            }
            if ($("#searchLocType").val() == "") {
                C = C + "&searchLocType=time";
                C = C + "&searchLocTime=20";
                C = C + "&searchTransMode=driving"
            }
        } else {
            var G = $("#bar_city").val();
            if (G && G != "") {
                C += "&city=" + G
            }
        }
        console.log("url-" + C);
        if (searchType == 1) {
            var H = $("#criAgents").val();
            if (H && H != "") {
                C += "&criAgents=" + H
            }
        }
        if (searchType == 5 && C.indexOf("category=") == -1) {
            var D = $("#bar_category").val();
            if (D && D != "") {
                C += "&category=" + D
            }
        }
        var L = $("#localityName").val();
        if (L && L != "") {
            C += "&localityName=" + L
        }
        if ($("input:checkbox[name=nearByLoc]:checked").length > 0) {
            C += "&nearByLoc=Y"
        }
        var M = $("#ownerId").val();
        if (M && M != "") {
            C += "&ownerId=" + M
        }
        if (!(typeof mapSearch === "undefined") && mapSearch == true) {
            $("#isMapSearch").val("true")
        }
        var I = $("#isMapSearch").val();
        if (I && I != "false") {
            C += "&isMapSearch=" + I
        }
        var E = $("#transactionTypeRefine").val();
        if (E && E != "") {
            C += "&transactionType=" + E
        }
        var J = $("#refine_keyword").val();
        if (J && J != "Enter Landmark, Location or Project" && J != "Add More...") {
            C += "&keyword=" + J
        }
        var B = $("#projectSocity").val();
        if (B && B != "") {
            C += "&projectSocity=" + B
        }
        var F = $("#developerName").val();
        if (F && F != "") {
            C += "&developerName=" + F
        }
        var A = $("#refine_source").val();
        if (A && A != "") {
            C += "&source=" + A
        }
        C += "&searchType=" + searchType
    } catch (K) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("editRefineSearch", "getFixedParam", K)
        }
    }
    return C
}

function getParameterStringinURL(B, F) {
    try {
        var C = B.indexOf(F + "=");
        var A = B.length;
        if (B.indexOf("&", C) != -1) {
            A = B.indexOf("&", C)
        }
        var E = B.substring(C, A);
        if (B.indexOf(E) == 0) {
            return E
        } else {
            return "&" + E
        }
    } catch (D) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("editRefineSearch", "getParameterStringinURL", D)
        }
    }
}

function removeParameter(A, C) {
    if (A.indexOf(C + "=") == -1) {
        return A
    }
    var B = getParameterStringinURL(A, C);
    A = A.replace(B, "");
    return A
}

function scrollWin() {
    $("body,html").animate({
        scrollTop: 0
    }, "fast")
}

function editSearchResults(C, B) {
    try {
        $(".nosearchHeading").hide();
        var F = $("#tab1").val();
        C += "&page=" + B + "&tab1=" + F + "&sortBy=" + sortBy;
        var E = $(document).height();
        var A = $("#searchContainerMain").offset();
        var G = A.left + 1;
        var D = 0;
        if ($(".srpColumns").offset()) {
            D = $(".srpColumns").offset().top - 5
        }
        $("#topLoader").show();
        $("#noResult").hide();
        createRecCookieForSRP(C);
        $.ajax({
            type: "get",
            url: fullContextPath + "/" + getSearchControllerName() + "?callType=ajax&editSearch=Y&" + C,
            cache: true,
            async: true,
            success: function(K) {
                moreResultPage = B - 1;
                $("#topLoader").hide();
                $("#topLoader").removeClass("loaderBG");
                if ($("#resultDiv")) {
                    $("#resultDiv").html(K);
                    refineNew()
                }
                var I = document.getElementById("Search_Tracker_ID").innerHTML;
                if (searchType == 1) {
                    saveAlertFlag = true;
                    $(".showOnlySave").removeClass("disabledAlert");
                    scrollWin();
                    processPropertySearchResult(B, sortBy, true)
                } else {
                    if (searchType == 2) {
                        saveAlertFlag = true;
                        $(".showOnlySave").removeClass("disabledAlert");
                        processAgentResult(B, sortBy, true)
                    } else {
                        if (searchType == 5) {
                            processProjectResult(B, sortBy, true)
                        }
                    }
                }
                try {
                    var J = ntrack.getRawDataObject();
                    J.rawUrl = C;
                    J.trackingEvent = ntrack.trackingEvent.Search;
                    ntrack.psm = Search_Param_Maps.psmid;
                    J.Source = ntrack.Source.Web;
                    ntrack.sendRamTrackEvent(J)
                } catch (L) {
                    console.log(L)
                }
                $("img.lazy").lazyload();
                $("#topLoader").hide();
                $("#topLoader").removeClass("loaderBG")
            },
            complete: function() {
                setTimeout(function() {
                    if ($(".threeNhalfAdBannerSlider").html()) {
                        $(".threeNhalfAdBannerSlider").anythingSlider({
                            buildStartStop: false,
                            buildNavigation: false,
                            infiniteSlides: false,
                            stopAtEnd: true,
                            hashTags: false
                        })
                    }
                }, 500);
                currentBlockScroll = $(window).scrollTop();
                $(window).unbind("scroll", lockscroll)
            }
        });
        findDefaultRadiusVal($("#radius").val())
    } catch (H) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("editRefineSearch", "editSearchResults", H)
        }
    }
}

function trackPageNav() {
    globalFlag = false;
    CURRENT_STATE = (eval(CURRENT_STATE) + 1) + "";
    if (window.frames.historyframe) {
        if (typeof window.frames.historyframe.location != "undefined" && typeof window.frames.historyframe.location.href != "undefined") {
            window.frames.historyframe.location.href = "/bricks/trackNavigation.html?CURRENT_STATE=" + CURRENT_STATE
        }
        window.frames.historyframe.src = "/bricks/trackNavigation.html?CURRENT_STATE=" + CURRENT_STATE
    }
    var dataString = getUrlStringToSearch();
    historyMap["HISTORY_" + CURRENT_STATE] = dataString
}

function undoChangesByBackButton() {
    try {
        trackGAComScoreEditRefine("backButtonClicked");
        var C = $(document).height();
        var A = $("#searchContainerMain").offset();
        var D = A.left + 1;
        $("#topLoader").show();
        var B = "";
        if (historyMap["HISTORY_" + CURRENT_STATE]) {
            B = historyMap["HISTORY_" + CURRENT_STATE]
        }
        if (B != "") {
            $("#allSelectedRefinedOptions ul.clicked").html("");
            $("#allSelectedRefinedOptions ul.fixed").html("");
            loadEditRefineGlobal(B);
            $(".formErr").hide();
            if (searchType == 1) {
                if (!(typeof mapSearch === "undefined") && mapSearch) {
                    drawOnMap();
                    loadEditRefine(getMapSearchResult())
                } else {
                    document.getElementById("groupstart").innerHTML = "0";
                    document.getElementById("offset").innerHTML = "0";
                    document.getElementById("maxOffset").innerHTML = "0";
                    editSearchResults(B, 1)
                }
            } else {
                editSearchResults(B, 1)
            }
        }
    } catch (E) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("editRefineSearch", "undoChangesByBackButton", E)
        }
    }
}
var plotFlag = false;

function clickOnPropertyType(C, J, G, L, E, M, N, P) {
    try {
        var D = $("#" + J).prop("checked");
        if (D == true) {
            $("#" + C).addClass("checked")
        } else {
            $("#" + C).removeClass("checked")
        }
        var I = -1;
        var O = "";
        var A = "";
        var F = document.getElementsByName(M);
        var H = 0;
        var K = 0;
        plotFlag = false;
        var S = false;
        for (var Q = 0; Q < F.length; Q++) {
            if (F[Q].checked == true) {
                var B = F[Q].value;
                if (B == "10000" || B == "10006_10012" || B == "10005" || B == "10007_10018" || B == "10008_10009" || B == "10013" || B == "10014" || B == "10011") {
                    H++
                } else {
                    K++
                }
                if (I == -1 && B == "10050_10053") {
                    S = true
                } else {
                    S = false
                }
                if (O == "") {
                    O = B
                }
                I++
            }
        }
        if (H > 0 && K == 0) {
            plotFlag = true
        }
        if (searchType == 2) {
            if (plotFlag == true) {
                $(".refinebedrooms").hide();
                $("#bhkDropDownHome").hide();
                $("#bhkDropDownHome .checkBox").removeClass("checked")
            } else {
                $(".refinebedrooms").show();
                $("#bhkDropDownHome").show()
            }
        } else {
            if (plotFlag == true) {
                $("#bhkDropDownHome").hide();
                $("#bhkDropDownHome .checkBox").removeClass("checked")
            } else {
                $("#bhkDropDownHome").show()
            }
        }
        if (S) {
            $("#bhkDropDownHome").hide();
            $("#bhkDropDownHome .checkBox").removeClass("checked");
            $("#inputListings_B").attr("checked", false);
            $("#inputListings_B").parent().removeClass("checked");
            $("#inputListings_B").parents("li").hide();
            var R = $("#inputListings_B").parents("ul").find(".checkBox.checked").length;
            if (R == 0) {
                $("#inputListingstkIco").css("opacity", "0")
            }
        } else {
            $("#inputListings_B").parents("li").show()
        }
        if (O != "") {
            A = $("#" + O).html();
            $("#" + L).removeClass("placeHolderIn");
            $("#" + L).addClass("placeHolderOut")
        } else {
            A = P;
            $("#" + L).addClass("placeHolderIn");
            $("#" + L).removeClass("placeHolderOut")
        }
        $("#" + L).html(A);
        if (I > 0) {
            $("#" + N).html("+" + I);
            $("#" + L).addClass("proTypeWidth");
            $("#" + N).addClass("moreProperty");
            document.getElementById(N).style.display = "inline"
        } else {
            $("#" + N).removeClass("moreProperty");
            $("#" + L).removeClass("proTypeWidth");
            document.getElementById(N).style.display = "none"
        }
        if (I > -1) {
            $("#propTypekIco").animate({
                opacity: 1
            })
        } else {
            $("#propTypekIco").animate({
                opacity: 0
            })
        }
        getLocValue("#" + J)
    } catch (T) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("editRefineSearchNew", "clickOnPropertyType", T)
        }
    }
}

function setDefaultPropType(D, B, A) {
    try {
        $("#" + D).click()
    } catch (C) {
        errorHandler("mbDynamicJS", "setDefaultPropType", C)
    }
}
var clickObjectTriggered = false;

function propertyTypeMethods() {
    try {
        checkAndCreateDataForTimeTravel();
        stickyRefineSearch();
        $("#allSelectedRefinedOptions a,.allSelectedRefinedOptions a").live("click", function() {
            stopRefine = true;
            $("#allSelectedRefinedOptions .refinedField").each(function() {
                var F = $(this).attr("class");
                var E = F.split(" ");
                var G = E[1];
                var D = G.split("_");
                if (D[0] != "city" && D[0] != "category") {
                    if (D[0] == "budgetMin" || D[0] == "budgetMax") {
                        $("input:checkbox[name=budget_new]:checked").each(function() {
                            $(this).click()
                        });
                        $("#rangeMinLinkbudgetinput").val("");
                        $("#rangeMaxLinkbudgetinput").val("");
                        $("#inputbudget").val("Budget");
                        $("#allSelectedRefinedOptions ul.budgetMin").html("");
                        $("#allSelectedRefinedOptions ul.budgetMax").html("")
                    } else {
                        $(this).click()
                    }
                }
            });
            stopRefine = false;
            $(".removeAllNSR").hide();
            getSearchUrl();
            var C = replaceValueInGaqCookie("sequenceNum", null, "gaqCompleteCookie", "||", "Y");
            replaceValueInGaqCookie("universalTimestamp", "" + new Date(), "gaqCompleteCookie", "||", "N");
            var B = createGaqStringForHome(C, "localityName");
            replaceValueInGaqCookie("srpBudgetMin", "", "gaqCompleteCookie", "||", "N");
            replaceValueInGaqCookie("srpBudgetMax", "", "gaqCompleteCookie", "||", "N");
            createCookieExpiresInTimeInDays("gaqCompleteCookie", B, 200);
            console.log("gaqCookieDetail " + B);
            if (_gaq) {
                _gaq.push(["_trackEvent", B, "SearchPage"])
            }
        });
        $("#allSelectedRefinedOptions ul.clicked .refinedField").live("click", function() {
            var D = $(this).attr("class");
            var C = D.split(" ");
            var B = C[1];
            $("." + B).remove();
            if ($("#refinePanel").find("#" + B)) {
                if ($("#refinePanel").find("#" + B).attr("type") == "checkbox") {
                    $("#refinePanel").find("#" + B).click()
                } else {
                    if ($("#refinePanel").find("#" + B).attr("type") == "radio") {
                        $("#" + B).prop("checked", false);
                        $("#" + B).trigger("onchange")
                    }
                }
            }
        });
        $("#refinePanel .selectedRefinedOptions ul .deleteThis").live("click", function() {
            var D = $(this).attr("class");
            var C = D.split(" ");
            var B = C[1];
            $("." + B).remove();
            if ($("#refinePanel").find("#" + B).attr("type") == "checkbox") {
                $("#refinePanel").find("#" + B).click()
            } else {
                getSearchUrl()
            }
        });
        $("#refine_keyword").live("keydown", function(B) {
            try {
                srhKeywordDown(B, "refine_keyword")
            } catch (C) {
                if (!(typeof window.errorHandler === "undefined")) {
                    errorHandler("editRefineSearch", "#keyword keydown", C)
                }
            }
        });
        $("#refine_keyword").live("focus", function(B) {
            if (!B) {
                B = window.event
            }
            B.stopPropagation();
            falg = true;
            if ($(this).val() == "Enter Landmark, Location or Project" || $(this).val() == "Add More...") {
                $(this).val("")
            }
            $("#errorMessageCity").hide();
            $("#onlyLocation").hide();
            $("#validLocation").hide();
            $("#autoSuggestInputDivrefine_keyword").removeClass("borderErrRed");
            $(".toggleList").hide()
        });
        $("#refine_keyword").live("blur", function(B) {
            setTimeout(function() {
                if ($("#isRadiusSearch").val() == "Y") {
                    var D = $("#searchLocName").val();
                    isRadiusSearch = "Y";
                    if (D == globalCityLocKey) {
                        $("#keyword_suggest").hide();
                        return false
                    }
                    var J = $("#searchLocName").val().split(", India");
                    var G = J[0].split(",India");
                    globalCityLocKey = G[0] + ",India";
                    $("#searchLocName").val(G[0] + ",India");
                    reloadFilter("radious");
                    getSearchUrl();
                    return
                }
                isRadiusSearch = "N";
                var F = $("#bar_city").val();
                var K = $("#bar_city_name").val();
                var I = $("#radius").val();
                if ((F == "" || K == "") && I == "" && $("#isRadiusSearch").val() != "Y") {
                    $("#errorMessageCity").show();
                    if ($("#refine_keyword").val().trim() == "") {
                        $("#onlyLocation").show()
                    } else {
                        $("#validLocation").show()
                    }
                    _gaq.push(["_trackEvent", "cityFieldError|Input = " + $("#refine_keyword").val(), "Refine"])
                } else {
                    $("#errorMessageCity").hide();
                    $("#onlyLocation").hide();
                    $("#validLocation").hide()
                }
                if (!B) {
                    B = window.event
                }
                var N = $("div .selectedTextDivrefine_keyword");
                var E = N.length;
                var L = "";
                if (N != null && N.length > 0) {
                    for (var H = 0; H < E; H++) {
                        if (L == "") {
                            L = N.eq(H).html().replace(/,\s*$/, "")
                        } else {
                            L = L + "," + N.eq(H).html().replace(/,\s*$/, "")
                        }
                    }
                }
                if (L == "") {
                    L = $("#refine_keyword").val()
                } else {
                    L = L + "," + $("#refine_keyword").val().replace(/,\s*$/, "")
                }
                L = L.replace(/,\s*$/, "");
                if (L == globalCityLocKey) {
                    $("#keyword_suggest").hide();
                    return false
                }
                globalCityLocKey = L;
                B.stopPropagation();
                falg = true;
                if ($("#refine_keyword").val() == "") {
                    $("#refine_keyword").css("width", "90px");
                    $("#refine_keyword").addClass("helpTextColor");
                    if ($("#refine_keyword").attr("style")) {
                        if ($("#refine_keyword").css("fontSize") == "12px") {
                            $("#refine_keyword").css("width", "60px")
                        }
                        if ($("#refine_keyword").css("fontSize") == "14px") {
                            $("#refine_keyword").css("width", "75px")
                        }
                    }
                    if ($("div .selectedTextDivrefine_keyword").length == 0) {
                        if ($("#bar_category").val() == "R" || $("#bar_category").val() == "r") {
                            $("#refine_keyword").attr("placeholder", "Enter Landmark, Location or Society")
                        } else {
                            $("#refine_keyword").attr("placeholder", "Enter Landmark, Location or Project")
                        }
                        $("#projectSocity").val("");
                        $("#developerName").val("")
                    } else {
                        if ($("#isRadiusSearch").val() != "Y" && $("#localitySrpPage").val() !== "localitySrp") {
                            $("#refine_keyword").attr("placeholder", "Add More...")
                        } else {
                            $("#refine_keyword").attr("placeholder", "")
                        }
                    }
                }
                if ($("#refine_keyword").val().trim() != "Enter Landmark, Location or Project" && $("#refine_keyword").val().trim() != "Add More...") {
                    var C = submitButtonCityCheck("refine_keyword", "bar_city", null);
                    if (C) {
                        $("#allSelectedRefinedOptions ul.showOnly_propertyType").html("");
                        var M = createCommaSeparatedInputInForm("refine_keyword", "localityName", "bar_city");
                        if (!(typeof mapSearch === "undefined") && mapSearch) {
                            clearRadiousSearch();
                            clearPolygonSearch()
                        }
                        if (M == true) {
                            reloadFilter("cityLocality");
                            getSearchUrl();
                            if ($("#localityName").val().trim() != "" && $("#isRadiusSearch").val() != "Y") {
                                $("#nearByLocDisBar").css("display", "block")
                            } else {
                                $("#nearByLocDisBar").css("display", "none")
                            }
                            addProjectsToSpanForRefine("refine_keyword", "localityName");
                            showWholeSearchList("refine_keyword")
                        }
                    }
                }
            }, 1500)
        });
        $("#refine_keyword").live("change", function(B) {
            try {
                makeRunTimeNameContainer(B, "refine_keyword")
            } catch (C) {
                if (!(typeof window.errorHandler === "undefined")) {
                    errorHandler("editRefineSearch", "#keyword change", C)
                }
            }
        });
        initializeLoc("refine_keyword");
        addProjectsToSpan("refine_keyword", "localityName")
    } catch (A) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("editRefineSearch", "propertyTypeMethods", A)
        }
    }
}

function closeAllFilters(B) {
    var A = window.event ? window.event.srcElement.tagName : B.target.nodeName;
    if (A == "DIV") {
        if (!clickObjectTriggered) {
            $(".dropdownList ").hide();
            $(".showHideList").removeClass("focusBorder")
        }
    }
    clickObjectTriggered = false
}

function showDropDown(C, B) {
    clickObjectTriggered = true;
    var A = $(C).parent().find(".toggleList");
    $(".toggleList").not(A).hide();
    A.toggle()
}

function showDropDownMore(C, B) {
    clickObjectTriggered = true;
    var A = $(C).parent().find(".toggleList");
    $(".toggleList").not(A).hide();
    A.toggle()
}

function rangeMinLinkClick(A) {
    clickObjectTriggered = true;
    $(A).parents(".rangeList").find("div").removeClass("active");
    $(A).addClass("active");
    $(A).parents(".rangeList").find(".rangeMax").hide();
    $(A).parents(".rangeList").find(".rangeMin").show();
    if ($("#inputbudget").val() == "Budget") {
        $("#budgetIco").removeAttr("style")
    } else {
        $("#budgetIco").css({
            opacity: 1
        })
    }
}

function rangeMaxLinkClick(A) {
    clickObjectTriggered = true;
    $(A).parents(".rangeList").find("div").removeClass("active");
    $(A).addClass("active");
    $(A).parents(".rangeList").find(".rangeMin").hide();
    $(A).parents(".rangeList").find(".rangeMax").show();
    if ($("#inputbudget").val() == "Budget") {
        $("#budgetIco").removeAttr("style")
    } else {
        $("#budgetIco").css({
            opacity: 1
        })
    }
}

function bothSideTrim(A) {
    try {
        return A.replace(/^\s+|\s+$/gm, "")
    } catch (B) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("editRefineSearchNew", "bothSideTrim", B)
        }
    }
}
var cityName = "";
var localityArray = new Array();
var compShowContainer;
var compHideCaontainer;
var close_clicking = false;
var flag = false;
var ulContainer;
var liContainer;
var divContainer;
var count = 0;
var keywordPosTop;
var keywordPosLeft;
var inputDivInitialLength = 30;

function srhKeywordDown(A, B) {
    $("#errorMessageCity").hide();
    if ($("#topLoader").css("display") != "none") {
        $("#" + B).val("");
        return
    }
    showWholeSearchList(B);
    $("#localityProjectDuplicaterefine_keyword").hide();
    try {
        if (($("#isRadiusSearch").val() == "Y" || ($("#localitySrpPage").val() == "localitySrp" && $("#localityName").val() != "")) && A.keyCode != 8) {
            A.preventDefault();
            $("#" + B).val("");
            return
        }
        if (document.getElementById(B).value == "" || document.getElementById(B).value == "Add More..." || document.getElementById(B).value == "Enter Landmark, Location or Project") {
            if (A.keyCode == 8) {
                $("#" + B).val("");
                var D = $("#" + B).parent().find(".divContainerrefine_keyword:last").find(".selectedTextDivrefine_keyword").attr("data-box");
                if (D != null && D != "" && D.indexOf("--") > -1) {
                    var H = D.split("--");
                    removeDataUsingType(H[1], H[0])
                }
                $("#" + B).parent().find(".divContainerrefine_keyword:last").remove();
                replaceValueInGaqCookie("srpLocality", $("#localityName").val(), "gaqCompleteCookie", "||", "N");
                replaceValueInGaqCookie("srpProject", $("#projectSocity").val(), "gaqCompleteCookie", "||", "N");
                replaceValueInGaqCookie("srpProject", $("#developerName").val(), "gaqCompleteCookie", "||", "N");
                replaceValueInGaqCookie("srpCity", $("#bar_city").val(), "gaqCompleteCookie", "||", "N");
                replaceValueInGaqCookie("srpCityName", $("#bar_city_name").val(), "gaqCompleteCookie", "||", "N");
                replaceValueInGaqCookie("srpLandmark", $("#searchLocName").val(), "gaqCompleteCookie", "||", "N");
                replaceValueInGaqCookie("universalTimestamp", "" + new Date(), "gaqCompleteCookie", "||", "N");
                var C = replaceValueInGaqCookie("sequenceNum", null, "gaqCompleteCookie", "||", "Y");
                gaqCookie = readCookieVal("gaqCompleteCookie");
                console.log("gaqCookieDetail " + gaqCookie);
                if (_gaq) {
                    _gaq.push(["_trackEvent", gaqCookie, "HomePageSearch"])
                }
                if ($("div .selectedTextDivrefine_keyword").length == 0) {
                    if ($("#bar_category").val() == "R" || $("#bar_category").val() == "r") {
                        $("#" + B).attr("placeholder", "Enter Landmark, Location or Society")
                    } else {
                        $("#" + B).attr("placeholder", "Enter Landmark, Location or Project")
                    }
                    $("#" + B).removeAttr("style");
                    $("#nearByLocDisBar").css("display", "none");
                    $("#propertiesWithinBar").css("display", "none");
                    if ($("#sort0").html() == "Nearest") {
                        $("#sort1").click()
                    }
                    $("#sort8").css("display", "none");
                    $("#projectSocity").val("");
                    $("#developerName").val("");
                    $("#isRadiusSearch").val("N");
                    $("#homeTravelTimer").hide();
                    $("#radius").val("")
                }
                var J = $("div .selectedTextDivrefine_keyword");
                var E = J.length;
                var I = "";
                if (J != null && J.length > 0) {
                    for (var F = 0; F < E; F++) {
                        if (I == "") {
                            I = J.eq(F).html().replace(/,\s*$/, "")
                        } else {
                            I = I + "," + J.eq(F).html().replace(/,\s*$/, "")
                        }
                    }
                }
                if (I == "") {
                    I = $("#refine_keyword").val()
                } else {
                    I = I + "," + $("#refine_keyword").val().replace(/,\s*$/, "")
                }
                I = I.replace(/,\s*$/, "");
                globalCityLocKey = I;
                createCommaSeparatedInputInForm("refine_keyword", "localityName", "bar_city");
                if (!(typeof mapSearch === "undefined") && mapSearch) {
                    clearRadiousSearch();
                    clearPolygonSearch()
                }
                if ($(".divContainerrefine_keyword").size() > 0) {
                    reloadFilter("cityLocality");
                    getSearchUrl()
                }
                setCityOnLoadAndChange("refine_keyword", "bar_city");
                $("#" + B).val("");
                setIdWidthAuto(B)
            }
        }
    } catch (G) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("editRefineSearch", "srhKeywordDown", G)
        }
    }
}

function autoSuggestion_advancedNewProj(H, G, I, J, C, B) {
    var D = null;
    if (readCookieVal("mbRecommendationCookies") != null) {
        D = readCookieVal("mbRecommendationCookies")
    }
    var E = "";
    if (D != null && typeof D !== "undefined") {
        var A = createStringIntoMapVal(D, "%7C", "%3D");
        E = A.city
    }
    var F = $("#" + G).val();
    var K = $(H).val();
    if ($("#isRadiusSearch").val() == "Y" && $("div .selectedTextDivkeyword").length == 1) {
        event.preventDefault();
        $("#refine_keyword").val("");
        return
    }
    if (((F && F != "-1") || C) && K.length >= 1 && $("#isRadiusSearch").val() != "Y") {
        autoSuggestObj = new autoKeywordCompleteRevamp($(H)[0], $("#" + J)[0], 12, 12, $("#" + G)[0], I, 25, B, E);
        autoSuggestObj.flagForLandmarkSearch = true
    }
}

function getLatLng(A) {
    try {
        placeService = new google.maps.places.PlacesService(document.createElement("div"));
        placeService.textSearch({
            query: A
        }, function(D, C) {
            if (C == google.maps.GeocoderStatus.OK) {
                $("#isRadiusSearch").val("Y");
                var F = D[0].geometry.location.lat();
                var E = D[0].geometry.location.lng();
                $("#centerLat").val(F);
                $("#centerLong").val(E);
                $("#radius").val(F + "," + E + ",2000");
                toCallSearch = false;
                $("#refine_keyword").parent().find(".divContainerrefine_keyword").remove();
                $("#bar_city").val("");
                $("#bar_city_name").val("");
                createComboDivsProperty(A, "refine_keyword");
                if (A.split(",")[0] != "") {
                    $("#travelTimeSpan2").html("From " + A.split(",")[0])
                }
                $("#searchLocName").val(A);
                $("#isGoogleSearch").val("Y");
                $("#selectedPlace").val($("#searchLoc").val());
                $("#refine_keyword").val("");
                if (googleAutocomplete != null) {
                    $(".pac-container").remove()
                }
            }
        })
    } catch (B) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("searchForm.js", "getLatLng", B)
        }
    }
}

function initialize() {
    try {
        var F = document.getElementById("refine_keyword");
        var B = $("div .selectedTextDivrefine_keyword");
        var A = false;
        var C = $("#bar_city_name").val();
        if (B.length == 0) {
            A = true
        } else {
            if (B.length == 1) {
                var E = B.eq(0).html();
                if (E.toLowerCase() == C.toLowerCase()) {
                    A = true
                }
            }
        }
        if (F.value.length > 2 && $("#isRadiusSearch").val() != "Y" && A) {
            googleAutocomplete = new google.maps.places.Autocomplete(F, googleOptions);
            googleAutocompleteListener = google.maps.event.addListener(googleAutocomplete, "place_changed", function() {
                $("#isRadiusSearch").val("Y");
                if ($("#homeTravelTimer").is(":hidden")) {
                    stopRefine = true;
                    $("#distanceMin20").click();
                    $("#TransModedriving").click();
                    stopRefine = false;
                    $("input[name=TransMode]").parent().removeClass("checked");
                    $("#TransModedriving").parent().addClass("checked");
                    $("input[name=distanceMin]").parent().removeClass("checked");
                    $("#distanceMin20").parent().addClass("checked")
                }
                $("#homeTravelTimer").hide();
                $("#nearByLocDisBar").hide();
                $(".formErr").hide();
                $(".showOnlySave").hide();
                if ($("#isMapSearch").val() != true && $("#isMapSearch").val() != "true") {
                    $("#propertiesWithinBar").css("display", "block");
                    $("#sort8").css("display", "block")
                }
                getLatLng(F.value);
                return false
            })
        }
    } catch (D) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("searchForm.js", "initialize", D)
        }
    }
}

function clearGAS() {
    if (!(typeof googleAutocomplete === "undefined") && googleAutocomplete != null) {
        input = document.getElementById("refine_keyword");
        google.maps.event.clearListeners(input);
        $(".pac-container").remove()
    }
}

function autoSuggestion_propRequirement(F, D, G, H, B, A) {
    try {
        var C = $("#" + D).val();
        var I = $(F).val();
        if (((C && C != "-1") || B) && I.length >= 1) {
            new autoKeywordComplete($(F)[0], $("#" + H)[0], 20, 10, $("#" + D)[0], G, 26, A)
        }
    } catch (E) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("searchForm", "autoSuggestion_advancedNewProj", E)
        }
    }
}

function createMBCookie(C, D, E) {
    var A = "";
    if (E) {
        var B = new Date();
        B.setTime(B.getTime() + (E * 24 * 60 * 60 * 1000));
        A = "; expires=" + B.toGMTString()
    }
    document.cookie = C + "=" + encodeURIComponent(D) + A + "; path=/"
}

function createRecCookieForSRP(B) {
    var A = "pageType=property";
    var F = B.split("&");
    var C = false;
    for (var G in F) {
        var E = F[G];
        if (E.indexOf("=") != -1) {
            var D = E.split("=");
            if (D[0] && D[1]) {
                if (D[0] == "bar_propertyType_new" || D[0] == "bar_propertyType_R_new" || D[0] == "propertyType") {
                    if (C == false) {
                        A += "|propType=" + D[1];
                        C = true
                    }
                } else {
                    if (D[0] == "city") {
                        A += "|city=" + D[1];
                        if (D[1].indexOf("-") != -1) {
                            D[1] = D[1].substring(0, D[1].indexOf("-"))
                        }
                        A += "|completeCityCode=" + D[1]
                    } else {
                        if (D[0] == "category" || D[0] == "categoryC") {
                            A += "|listType=" + D[1]
                        } else {
                            if (D[0] == "bedrooms") {
                                A += "|bedrooms=" + D[1]
                            } else {
                                if (D[0] == "budgetMin") {
                                    A += "|minBudget=" + D[1]
                                } else {
                                    if (D[0] == "budgetMax") {
                                        A += "|maxBudget=" + D[1]
                                    } else {
                                        if (D[0] == "keyword") {
                                            A += "|keyword=" + D[1]
                                        } else {
                                            if (D[0] == "projectSocity") {
                                                A += "|projectSocity=" + D[1]
                                            } else {
                                                if (D[0] == "developerName") {
                                                    A += "|developerName=" + D[1]
                                                } else {
                                                    if (D[0] == "localityName") {
                                                        A += "|locality=" + D[1]
                                                    } else {
                                                        if (D[0] == "nearByLoc") {
                                                            A += "|nearByCheck=" + D[1]
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    if (typeof seachVersion !== "undefined" && seachVersion == "B") {
        A += "|pageOption=B"
    } else {
        A += "|pageOption=A"
    }
    if (typeof isStateSearch === "undefined" || (isStateSearch != true && isCitySearch != true)) {
        createMBCookie("mbRecommendationCookies", A, "30")
    }
}

function convertBudgetToValueUnits(B) {
    var D = B;
    if (D.indexOf("0000000") > -1 && D.lastIndexOf("0000000") == 1 && (parseFloat(D) / 10000000) == parseInt(parseInt(D) / 10000000)) {
        var A = parseInt(D) / 10000000 + "";
        D = "" + A + "-Crores"
    } else {
        if (D.indexOf("000000") > -1 && parseFloat(D.replace("000000", "") / 10) > 1 && (parseFloat(D) / 1000000) == parseInt(parseInt(D) / 1000000)) {
            var C = D.replace("000000", "");
            var A = parseFloat(C) / 10;
            D = "" + A + "-Crores"
        } else {
            if (D.indexOf("00000") > -1 && (parseFloat(D) / 100000) == parseInt(parseInt(D) / 100000)) {
                var A = parseInt(D) / 100000 + "";
                D = "" + A + "-Lacs"
            }
        }
    }
    return D
}

function timeTravel(E, J, B, F) {
    $("#traveltkIco").animate({
        opacity: 1
    });
    if (F == "time") {
        $("#searchLocType").val(F);
        var A = $(E).val();
        $("#searchLocTime").val(A)
    } else {
        if (F == "distance") {
            $("#searchLocType").val(F);
            var I = $(E).val();
            var D = $("#radius").val();
            var C = D.trim().split(",");
            if (C.length >= 3) {
                var G = C[0] + "," + C[1] + "," + I;
                $("#radius").val(G)
            }
            $("#searchTransMode").val("");
            $("#searchLocTime").val("")
        } else {
            if (F == "transMode") {
                var H = $(E).val();
                transModeVal = initCap(H);
                transModeVal = transModeVal.replace("Transit", "Public Transport");
                transModeVal = transModeVal.replace("Driving", "Drive");
                transModeVal = transModeVal.replace("Walking", "Walk");
                $("#searchTransMode").val(H)
            }
        }
    }
    $("input[name=" + J + "]").parent().parent().removeClass("checked");
    $("input[name=" + J + "]").attr("checked", "");
    $(E).attr("checked", "checked");
    $(B).addClass("checked");
    if (J == "TravelDist") {
        removeOther("travelTime")
    } else {
        removeOther("travelDistance")
    }
    getSearchUrl()
}

function removeOther(A) {
    $("." + A).each(function() {
        if ($(this).is(":checked")) {
            $(this).parent().parent().removeClass("checked");
            $(this).attr("checked", "")
        }
    })
}

function checkAndCreateDataForTimeTravel() {
    if ($("#isRadiusSearch").val() == "Y" || $("#isRadiusSearch").val() == "y") {
        var C = $("#searchLocType").val();
        if (C == "") {
            C = "distance"
        }
        stopRefine = true;
        if (C == "distance") {
            $("#tabLinkDistance").click()
        } else {
            if (C == "time") {
                $("#tabLinktime").click()
            }
        }
    }
    if (C == "distance") {
        $("#tabLinkDistance").click();
        var E = $("#radius").val();
        var D = E.split(",");
        if (D.length > 2) {
            var B = D[2].replace("000", "").trim();
            $("#searchLocTime").val(D[2]);
            $("#travelTimeSpan1").html("Properties within " + B + " Km");
            $("#TravelDist" + B).parent().parent().addClass("checked")
        }
    } else {
        if (C == "time") {
            var A = $("#searchTransMode").val();
            if (A == "") {
                A = "driving"
            }
            $("#TransMode" + A).parent(".customRdBtn").addClass("checked");
            A = initCap(A);
            A = A.replace("Transit", "Public Transport");
            A = A.replace("Driving", "Drive");
            A = A.replace("Walking", "Walk");
            $("#travelTimeSpan3").html("by " + A)
        }
    }
}

function createTimeTravelDataByGogle(C, H, G) {
    var F = $("#searchLocType").val();
    var B = "driving";
    if (F == "time") {
        var E = $("#searchLocTime").val().trim();
        searchLocTimeFloatVal = parseFloat(E);
        searchLocTimeFloatInt = Math.round(searchLocTimeFloatVal + 0.2 * searchLocTimeFloatVal);
        var A = new google.maps.DistanceMatrixService();
        var D = google.maps.TravelMode.DRIVING;
        if ($("#searchTransMode").val() == "walking") {
            D = google.maps.TravelMode.WALKING;
            searchLocTimeFloatInt = Math.round(searchLocTimeFloatVal + 360);
            B = "walking"
        } else {
            if ($("#searchTransMode").val() == "transit") {
                D = google.maps.TravelMode.TRANSIT;
                B = "transit"
            }
        }
        A.getDistanceMatrix({
            origins: [G],
            destinations: C,
            travelMode: D
        }, callbackForTime)
    }
}

function callbackForTime(D, F) {
    if (F !== google.maps.DistanceMatrixStatus.OK) {} else {
        var I = $("#searchLocTime").val().trim();
        var G = D.rows[0].elements;
        for (var E = 0; E < G.length; E++) {
            var H = G[E];
            if (typeof H.distance == "undefined") {
                $("#resultBlockWrapper" + pmtIds[E]).hide();
                bufferzone = bufferzone - 250
            } else {
                var A = H.distance.text;
                var C = H.duration.text;
                var J = H.duration.value;
                var B = Math.round(J / (60));
                if (B <= searchLocTimeFloatInt) {
                    if (B > searchLocTimeFloatVal) {
                        C = I + " mins"
                    }
                    $("#resultBlockWrapper" + pmtIds[E]).find(".localitySecond").html('<span class="spanDivider"></span>' + C + " " + travelModeText + " away ")
                } else {
                    $("#resultBlockWrapper" + pmtIds[E]).hide();
                    bufferzone = bufferzone - 250
                }
            }
        }
    }
}

function jqTravelTimeTab(A, B) {
    $(".tab").css("display", "none");
    $("#" + A).css("display", "block");
    $(".tab-pane").removeClass("active");
    $("#" + B.id).addClass("active")
}

function stickyRefineSearch() {
    try {
        if ($(".srpStack").offset()) {
            $(window).scroll(function() {
                var H = $(".srpStack"),
                    G = $(window).scrollTop();
                if (G >= 50) {
                    H.addClass("filterFixed");
                    $(".main-header").addClass("opacity");
                    $("#srpWrapper").css("padding-top", "40px")
                } else {
                    H.removeClass("filterFixed");
                    $(".main-header").removeClass("opacity");
                    $("#srpWrapper").css("padding-top", "0px")
                }
            });
            var E = $(".globalMenu");
            var A = E.outerHeight();
            var D = $("body").height();
            var B = 0;
            var F = "";
            if ($(".globalMenu").length > 0) {
                F = $(".globalMenu").offset().top
            }
            $(window).scroll(function(H) {
                var I = $(".globalMenu").outerHeight();
                D = $("body").height();
                var G = $(this).scrollTop();
                if (G < B && G > F) {
                    if (stickyScroll == 0) {
                        stickyScroll = G
                    }
                    if ((stickyScroll - 40) > B) {
                        E.addClass("searchGlobalFixed");
                        $(".srpStack").css("top", I)
                    }
                } else {
                    stickyScroll = 0;
                    E.removeClass("searchGlobalFixed");
                    $(".srpStack").css("top", "0px")
                }
                B = G
            })
        }
    } catch (C) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("editRefineSearch", "stickyRefineSearch", C)
        }
    }
}
$(document).ready(function() {
    $(".refinecriAgents,.refinefeatured").find(".tkIco").remove();
    $("html").live("click", function(A) {
        if (!(typeof mapSearch === "undefined") && mapSearch == true) {
            if ((typeof $(A.target).attr("class") !== "undefined" && $(A.target).attr("class").indexOf("rangeClass") < 0) && ((typeof $(A.target).parent().attr("class") == "undefined") || ($(A.target).parent().attr("class").indexOf("refineBlock") < 0 && $(A.target).parent().attr("class").indexOf("refineBudgetPerSqft") < 0 && $(A.target).parent().attr("class").indexOf("srpRefineField") < 0 && $(A.target).parent().attr("class").indexOf("shortByBlock") < 0 && $(A.target).parent().attr("class").indexOf("shortByDD") < 0 && $(A.target).parent().attr("class").indexOf("dropDownOptions") < 0 && $(A.target).parent().attr("class").indexOf("rangeOption") < 0 && $(A.target).parent().attr("class").indexOf("mapTabMore") < 0))) {
                if (!clickObjectTriggered) {
                    $(".toggleList").hide();
                    $(".toggleLink").removeClass("focusBorder");
                    $(".dropdownList").hide();
                    $("#moreRefined .showHideList").removeClass("focusBorder");
                    $(".refineAreaSqrt input").removeClass("areaType");
                    $(".refineAreaSize input").removeClass("areaSize")
                }
            }
        } else {
            if (!clickObjectTriggered) {
                $(".toggleList").hide();
                $(".toggleLink").removeClass("focusBorder");
                $(".dropdownList").hide();
                $("#moreRefined .showHideList").removeClass("focusBorder");
                $(".refineAreaSqrt input").removeClass("areaType");
                $(".refineAreaSize input").removeClass("areaSize")
            }
        }
        clickObjectTriggered = false
    });
    $(".closeIcon").live("click", function() {
        $("#moreRefineWrap, .dropdownList").hide()
    });
    $(".dropdownList").live("click", function(A) {
        clickObjectTriggered = true
    });
    $(".toggleList").live("click", function(A) {
        clickObjectTriggered = true
    });
    $("#btnPropertySearch").live("click", function() {
        $("#topLoader").show();
        setTimeout(function() {
            $("#topLoader").hide()
        }, 1500)
    });
    $("input[name='floorNo']").on("click", function() {
        var B = $(this);
        if (B.is(":checked")) {
            var A = "input[name='" + B.attr("name") + "']";
            $("input[name='" + B.attr("name") + "']").each(function(C) {
                if ($(this).is(":checked")) {
                    $(this).prop("checked", false);
                    $(this).parent("span").removeClass("checked");
                    getCheckedVal(this)
                }
            });
            B.prop("checked", true)
        } else {
            B.prop("checked", false)
        }
    });
    $(".areaFrom, .areaTo").focus(function(A) {
        areaVal = $(this).val()
    });
    $(".areaFrom, .areaTo").keydown(function(A) {
        if ($.inArray(A.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 || (A.keyCode == 65 && A.ctrlKey === true) || (A.keyCode >= 35 && A.keyCode <= 39)) {
            return
        }
        if ((A.shiftKey || (A.keyCode < 48 || A.keyCode > 57)) && (A.keyCode < 96 || A.keyCode > 105)) {
            A.preventDefault()
        }
    })
});
var cityLocality = true;
var currentBlockScroll = 0;
var browserNavigator = window.navigator.userAgent;
var msie = browserNavigator.indexOf("MSIE ");
var chrome = browserNavigator.indexOf("Chrome");

function initializeLoc(C) {
    var B = $("#" + C).val();
    var A = B.length;
    $("#" + C).attr("size", A);
    $(document).live("click", function(E) {
        if ($(E.target).is("#autoSuggestInputDiv" + C + ", div .divContainer" + C + ", div .selectedTextDiv" + C + ", div .selectedTextDiv" + C + " img, #refine_keyword,#keyword, .localityProjectKeyword, .localityKewordDropDown, #keyword_suggest, #keyword_suggest div, #keyword_suggest .over, #keyword_suggest div div, #keyword_suggest div div span, #keyword_suggest div .nonSelectEle, .locProjKeyCombineDropDown, #autoSuggestInputDivkeyword, #autoSuggestInputDivkeywordProj, #autoSuggestInputDivkeywordAgent, #propertyLocalityAlert, .localityKewordDropDown, #propertyLocalityAlert, div .compShowDiv" + C + ", div #compSpan" + C + ", .crossIcon, .propertySearch .active a, .projectSearch  .active a, .agentSearch  .active a")) {
            if ($("div .selectedTextDiv" + C).length == 0) {
                $("#projectSocity").val("");
                $("#developerName").val("");
                $("#developerName").val("")
            }
        } else {
            if ($(".selectedTextDiv" + C).length > 1) {
                if (flag == false) {
                    if (localityArray && localityArray.length > 0) {
                        $(localityArray[0]).hide();
                        $(localityArray[1]).hide()
                    }
                    if (parseInt($("#autoSuggestInputDiv" + C).css("height")) > inputDivInitialLength) {
                        for (var D = 0; D < $("div .selectedTextDiv" + C).length; D++) {
                            $("div .selectedTextDiv" + C).parent().slideUp(400)
                        }
                        showCompactView(C)
                    }
                }
            }
        }
    });
    $("#autoSuggestInputDiv" + C).live("click", function(D) {
        D.stopPropagation();
        showWholeSearchList(C);
        setIdWidthAuto(C)
    });
    $("#keyword, #refine_keyword, #keywordProj, #keywordAgent").live({
        blur: function() {
            if ($("div .selectedTextDiv" + C).length < 1) {
                $(this).css("width", "95%")
            }
        }
    });
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./) || chrome > 0) {} else {
        $("#keyword_suggest, .budgetList, #budget").live({
            mouseenter: function() {
                currentBlockScroll = $(window).scrollTop();
                $(window).bind("scroll", lockscroll)
            },
            mouseleave: function() {
                currentBlockScroll = $(window).scrollTop();
                $(window).unbind("scroll", lockscroll)
            }
        })
    }
    calForGhostTextView(C)
}

function makeRunTimeNameContainer(E, G) {
    E.stopPropagation();
    if ($("#" + G) && $("#" + G).val() == "") {
        $("#" + G).css("width", "90px");
        if ($("#" + G).attr("style")) {
            if ($("#isRadiusSearch").val() != "Y" && $("#developerName").val() == "" && ($("#localitySrpPage").val() !== "localitySrp" || $("#localityName").val() == "")) {
                $("#" + G).attr("placeholder", "Add More...");
                $("#keyword").addClass("noPlace")
            } else {
                $("#" + G).attr("placeholder", "")
            }
            if ($("#" + G).css("fontSize") == "12px") {
                $("#" + G).css("width", "60px")
            }
            if ($("#" + G).css("fontSize") == "14px") {
                $("#" + G).css("width", "75px")
            }
        }
        if ($("div .selectedTextDiv" + G).length == 0) {
            if ($("#bar_category").val() == "R" || $("#bar_category").val() == "r") {
                $("#" + G).attr("placeholder", "Enter Landmark, Location or Society")
            } else {
                $("#" + G).attr("placeholder", "Enter Landmark, Location or Project")
            }
        }
        return
    }
    var F = $("#" + G).val();
    if (F == null || F == "Enter Landmark, Location or Project" || F == "" || F == "add-more...") {
        return
    }
    var C = "";
    if (G == "keyword" || G == "refine_keyword") {
        C = document.getElementById("bar_city");
        city = $("#bar_city").val();
        cityInnerHTML = $("#bar_city_name").val()
    } else {
        if (G == "keywordProj") {
            city = $("#project_bar_city").val()
        } else {
            if (G == "keywordAgent") {
                city = $("#agent_bar_city").val()
            } else {
                return
            }
        }
    }
    if (city == "" || city == "*") {
        return
    }
    var B = $("#" + G).val().replace(/,\s*$/, "");
    var A = B.split(",");
    var D = A.length;
    if (A[D - 1].trim() != cityInnerHTML.trim() && D > 1) {
        return
    }
}

function showWholeSearchList(B) {
    if (typeof localityArray !== "undefined" && localityArray.length > 1) {
        $(localityArray[0]).hide();
        $(localityArray[1]).hide()
    }
    flag = false;
    if ($("div .selectedTextDiv" + B).length == 1) {
        setIdWidthAuto(B)
    }
    for (var A = 0; A < $("div .selectedTextDiv" + B).length; A++) {
        $("div .selectedTextDiv" + B).parent().slideDown(400)
    }
}

function showCompactView(G) {
    $(".divContainerCom" + G).remove();
    $(".compShowDiv" + G).remove();
    $("#compSpan" + G).remove();
    localityArray = new Array();
    var F = $("div .selectedTextDiv" + G).eq(0).html();
    compShowContainer = document.createElement("div");
    compShowContainer.className = "divContainerCom" + G + " localityKeywordParent";
    localityArray.push(compShowContainer);
    var A = document.createElement("div");
    A.className = "compShowDiv" + G + " localityKeywordCompact";
    A.innerHTML = F;
    compHideCaontainer = document.createElement("div");
    compHideCaontainer.className = "localityKeywordParent";
    localityArray.push(compHideCaontainer);
    var D = document.createElement("div");
    D.id = "compSpan" + G;
    D.className = "localityAddedOption";
    var E = $("div .selectedTextDiv" + G).length - 1;
    $("div .divContainer" + G).last().after(compHideCaontainer).after(compShowContainer);
    if (document.getElementById(G).value == "") {
        if ($("#" + G).attr("style")) {
            if ($("#isRadiusSearch").val() != "Y" && $("#developerName").val() == "" && ($("#localitySrpPage").val() !== "localitySrp" || $("#localityName").val() == "")) {
                $("#" + G).attr("placeholder", "Add More...");
                $("#keyword").addClass("noPlace")
            } else {
                $("#" + G).attr("placeholder", "")
            }
            if ($("#" + G).css("fontSize") == "12px") {
                $("#" + G).css("width", "60px")
            }
            if ($("#" + G).css("fontSize") == "14px") {
                $("#" + G).css("width", "75px")
            }
        }
        if ($("div .selectedTextDiv" + G).length == 0) {
            if ($("#bar_category").val() == "R" || $("#bar_category").val() == "r") {
                $("#" + G).attr("placeholder", "Enter Landmark, Location or Society")
            } else {
                $("#" + G).attr("placeholder", "Enter Landmark, Location or Project")
            }
        }
    }
    flag = true;
    var C = $(compHideCaontainer).css("marginTop");
    compShowContainer.appendChild(A);
    if (E > 0) {
        var B = "+" + E;
        D.innerHTML = B;
        compHideCaontainer.appendChild(D)
    }
    $(".divContainerCom" + G).css("display", "none").delay(400).slideDown(0);
    $("#compSpan" + G).css("display", "none").delay(400).slideDown(0);
    setTimeout(function() {
        setIdWidthAuto(G)
    }, 410)
}

function validateCity(A, B) {
    setCityIfNotExists(A, B);
    var B = document.getElementById(B).value;
    if (B == "*" || B == "") {
        document.getElementById("bar_cityErrDivMsg").value = "Please enter a city to continue";
        document.getElementById("bar_cityErrDivMsg").innerHTML = "Please enter a city to continue";
        document.getElementById("bar_cityErrDivMsg").style.display = "block";
        return false
    } else {
        document.getElementById("bar_cityErrDivMsg").style.display = "none";
        return true
    }
}

function createCommaSeparatedInputInForm(B, A, F) {
    if (isRadiusSearch == "Y" || $("#isRadiusSearch").val() == "Y") {
        $("#localityName").val("");
        $("#keyword").val("");
        $("#refine_keyword").val("");
        return true
    }
    $("#" + F + "_name").val($("#" + F + "_name").val().replace("&amp;", "and"));
    $("#" + F + "_name").val($("#" + F + "_name").val().replace("&", "and"));
    _gaq.push(["_trackEvent", "UserText = " + $("#" + B).val(), "CityLocality"]);
    var E = "";
    var D = true;
    var C = contextPath + "ajax/findLocalitiesInFreeTextBox.json?freeText=" + $("#" + B).val() + "&cityId=" + $("#" + F).val();
    $.ajax({
        dataType: "json",
        type: "get",
        url: C,
        cache: true,
        async: false,
        success: function(J) {
            if (J != null && J.DUPLICATE_LOCALITY_PROJECT != null) {
                var K = J.DUPLICATE_LOCALITY_PROJECT;
                cityHtml = "<div class='locProjDuplicate' onclick = \"putValInLocProjAndCallSearch('" + K + "','localityName','" + B + "')\">" + K + "    Location</div>";
                cityHtml += "<div class='locProjDuplicate' onclick = \"putValInLocProjAndCallSearch('" + K + "','projectSocity','" + B + "')\">" + K + "    Project</div>";
                if ($(".moreThanOneCity")) {
                    $(".moreThanOneCity").remove()
                }
                if ($(".moreThanOneCityBr")) {
                    $(".moreThanOneCityBr").remove()
                }
                if ($(".locProjDuplicate")) {
                    $(".locProjDuplicate").remove()
                }
                D = false;
                $("#localityProjectDuplicate" + B).append(cityHtml);
                $("#localityProjectDuplicate" + B).show();
                $("#btnPropertySearch").attr("disabled", false);
                $("#btnPropertySearch").val("SEARCH")
            } else {
                if (J != null && J.FINAL_KEYWORD != null) {
                    $("#" + B).val(J.FINAL_KEYWORD);
                    var H = J.LOCALITY_LIST;
                    for (var G = 0; G < H.length; G++) {
                        if (E == "") {
                            E = H[G]
                        } else {
                            E = E + "," + H[G]
                        }
                    }
                    var I = $("#localityName").val();
                    if (I == "") {
                        $("#localityName").val(E)
                    } else {
                        $("#localityName").val(I + "," + E)
                    }
                }
            }
        }
    });
    return D
}

function setCityOnLoadAndChange(C, F) {
    var E = $("div .selectedTextDiv" + C);
    var A = document.getElementById(C).value.trim();
    var D = $("#" + F).val();
    if ((E == null || E.length == 0) && (A == "" || A == "Enter Landmark, Location or Project" || A == "Add More...")) {
        document.getElementById(F).value = "";
        document.getElementById(F + "_name").value = "";
        document.getElementById(C).value = "";
        $("#radius").val("");
        if ($("div .selectedTextDiv" + C).length == 0) {
            $("#projectSocity").val("");
            $("#developerName").val("")
        }
        return
    }
    if (typeof cityName !== "undefined") {
        if (cityName != null && cityName != "") {
            var B = cityName;
            document.getElementById(F + "_name").value = B
        }
    }
}

function addProjectsToSpan(O, N) {
    $("#" + O).parent().find(".divContainer" + O).remove();
    if ($("#isRadiusSearch").val() == "Y") {
        var J = $("#hiddenTextField" + O).val();
        var K = $("#searchLocName").val().split(", India");
        var G = K[0].split(",India");
        createComboDivsProperty(G[0] + ",India", O, "searchLocName");
        $("#searchLocName").val(G[0] + ",India");
        globalCityLocKey = $("#searchLocName").val();
        if ($("#isMapSearch").val() != true && $("#isMapSearch").val() != "true") {
            $("#propertiesWithinBar").css("display", "block");
            $("#sort8").css("display", "block")
        }
        var L = readCookieVal("gaqCompleteCookie");
        if (L == null) {
            var Q = createGaqStringForHome(1, N);
            createCookieExpiresInTimeInDays("gaqCompleteCookie", Q, 200);
            console.log("gaqCookieDetail " + Q);
            if (_gaq) {
                _gaq.push(["_trackEvent", Q, "HomePageSearch"])
            }
        } else {
            var C = replaceValueInGaqCookie("sequenceNum", null, "gaqCompleteCookie", "||", "Y");
            var Q = createGaqStringForHome(C, N);
            createCookieExpiresInTimeInDays("gaqCompleteCookie", Q, 200);
            console.log("gaqCookieDetail " + Q);
            if (_gaq) {
                _gaq.push(["_trackEvent", Q, "HomePageSearch"])
            }
        }
        if (_gaq) {
            _gaq.push(["_trackEvent", "SearchLocName = " + $("#searchLocName").val() + "|SearchLocType = " + $("#searchLocType").val() + "|SearchLocTransMode = " + $("#searchTransMode").val() + "|SearchLocTime = " + $("#searchLocTime").val(), "Search Travel Time"])
        }
        return
    }
    var I = $("#" + N).val().replace(/,\s*$/, "").split(",");
    var B = $("#projectSocity").val().replace(/,\s*$/, "").split(",");
    var F = $("#developerName").val().replace(/,\s*$/, "").split(",");
    if (O == "refine_keyword") {
        var A = 0;
        if ($("#" + N).val().trim() !== "") {
            A = I.length
        }
        var L = readCookieVal("gaqCompleteCookie");
        if (L == null) {
            var Q = createGaqStringForHome(1, N);
            createCookieExpiresInTimeInDays("gaqCompleteCookie", Q, 200);
            console.log("gaqCookieDetail " + Q);
            if (_gaq) {
                _gaq.push(["_trackEvent", Q, "HomePageSearch"])
            }
        } else {
            var C = replaceValueInGaqCookie("sequenceNum", null, "gaqCompleteCookie", "||", "Y");
            var Q = createGaqStringForHome(C, N);
            createCookieExpiresInTimeInDays("gaqCompleteCookie", Q, 200);
            console.log("gaqCookieDetail " + Q);
            if (_gaq) {
                _gaq.push(["_trackEvent", Q, "HomePageSearch"])
            }
        }
        _gaq.push(["_trackEvent", "City = " + $("#bar_city_name").val() + "|LocalityNames = " + $("#" + N).val() + "|LocalityNumber = " + A + "|Projects = " + $("#" + O).val(), "CityLocality"])
    }
    $("#keyword").removeClass("noPlace");
    for (var H = 0; H < B.length; H++) {
        if (B[H] != "Add More..." && B[H] != "Enter Landmark, Location or Project" && B[H].trim() != "") {
            createComboDivsProperty(B[H], O, "projectSocity");
            $("#" + O).addClass("noPlace")
        }
    }
    for (var H = 0; H < F.length; H++) {
        if (F[H] != "Add More..." && F[H] != "Enter Landmark, Location or Project" && F[H].trim() != "") {
            createComboDivsProperty(F[H], O, "developerName");
            $("#" + O).addClass("noPlace")
        }
    }
    for (var E = 0; E < I.length; E++) {
        if (I[E] != "Add More..." && I[E] != "Enter Landmark, Location or Project" && I[E].trim() != "") {
            if ($("#nearByLocDisBar").css("display") == "none" && $("#isRadiusSearch").val() != "Y") {
                $("#nearByLocDisBar").css("display", "block")
            }
            createComboDivsProperty(I[E], O, "localityName");
            $("#" + O).addClass("noPlace")
        }
    }
    if (B.length == 1 && B[0] == "" && I.length == 1 && I[0] == "" && F.length == 1 && F[0] == "" && $("#bar_city_name").val() != null && $("#bar_city_name").val() != "") {
        createComboDivsProperty($("#bar_city_name").val(), O, "bar_city_name");
        $("#" + O).addClass("noPlace")
    }
    if (O == "refine_keyword") {
        var P = $("div .selectedTextDivrefine_keyword");
        var D = P.length;
        var M = "";
        if (P != null && P.length > 0) {
            for (var H = 0; H < D; H++) {
                if (M == "") {
                    M = P.eq(H).html().replace(/,\s*$/, "")
                } else {
                    M = M + "," + P.eq(H).html().replace(/,\s*$/, "")
                }
            }
        }
        if (M == "") {
            M = $("#refine_keyword").val()
        } else {
            M = M + "," + $("#refine_keyword").val().replace(/,\s*$/, "")
        }
        M = M.replace(/,\s*$/, "");
        globalCityLocKey = M
    }
}

function addProjectsToSpanForRefine(M, L) {
    $("#" + M).parent().find(".divContainer" + M).remove();
    if ($("#isRadiusSearch").val() == "Y" && $(".selectedTextDiv" + M).length == 0) {
        var F = $("#hiddenTextField" + M).val();
        var G = $("#searchLocName").val().split(", India");
        var C = G[0].split(",India");
        createComboDivsProperty(C[0] + ",India", M);
        $("#searchLocName").val(C[0] + ",India");
        globalCityLocKey = $("#searchLocName").val();
        if ($("#isMapSearch").val() != true && $("#isMapSearch").val() != "true") {
            $("#propertiesWithinBar").css("display", "block");
            $("#sort8").css("display", "block")
        }
        if (_gaq) {
            _gaq.push(["_trackEvent", "SearchLocName = " + $("#searchLocName").val() + "|SearchLocType = " + $("#searchLocType").val() + "|SearchLocTransMode = " + $("#searchTransMode").val() + "|SearchLocTime = " + $("#searchLocTime").val(), "Search Travel Time"])
        }
        return
    }
    var E = $("#" + L).val().replace(/,\s*$/, "").split(",");
    if (M == "refine_keyword") {
        var A = 0;
        if ($("#" + L).val().trim() !== "") {
            A = E.length
        }
        _gaq.push(["_trackEvent", "Search Result Page|City = " + $("#bar_city_name").val() + "|LocalityNames = " + $("#" + L).val() + "|LocalityNumber = " + A + "|Projects = " + $("#" + M).val() + "|UserText=" + $("#hiddenTextField" + M).val(), "Search Results Page"])
    }
    var I = $("#projectSocity").val().split(",");
    if (I != "" && I[0] != "") {
        for (var D = 0; D < I.length; D++) {
            createComboDivsProperty(I[D], M, "projectSocity")
        }
    }
    var K = $("#developerName").val().split(",");
    if (K != "" && K[0] != "") {
        for (var D = 0; D < K.length; D++) {
            createComboDivsProperty(K[D], M, "developerName")
        }
    }
    if (E != "" && E[0] !== "") {
        for (var D = 0; D < E.length; D++) {
            createComboDivsProperty(E[D], M, "localityName");
            if ($("#isRadiusSearch").val() != "Y") {
                $("#nearByLocDisBar").css("display", "block")
            }
        }
    }
    if (I.length == 1 && I[0] == "" && E.length == 1 && E[0] == "" && K.length == 1 && K[0] == "") {
        if ($("#bar_city_name").val() == "") {
            var H = contextPath + "ajax/getDescriptionFromCode.json?cityCode=" + $("#bar_city").val();
            $.ajax({
                dataType: "json",
                type: "get",
                url: H,
                cache: true,
                async: false,
                success: function(O) {
                    $("#bar_city_name").val(O.DESCRIPTION)
                }
            })
        }
        createComboDivsProperty($("#bar_city_name").val(), M)
    }
    if (M == "refine_keyword") {
        var N = $("div .selectedTextDivrefine_keyword");
        var B = N.length;
        var J = "";
        if (N != null && N.length > 0) {
            for (var D = 0; D < B; D++) {
                if (J == "") {
                    J = N.eq(D).html().replace(/,\s*$/, "")
                } else {
                    J = J + "," + N.eq(D).html().replace(/,\s*$/, "")
                }
            }
        }
        if (J == "") {
            J = $("#refine_keyword").val()
        } else {
            J = J + "," + $("#refine_keyword").val().replace(/,\s*$/, "")
        }
        J = J.replace(/,\s*$/, "");
        globalCityLocKey = J
    }
}

function createComboDivsProperty(D, C, A) {
    try {
        if (D.trim() == "" || D.trim() == "Add More..." || D.trim() == "Enter Landmark, Location or Project") {
            return
        }
        $("#" + C).css("display", "none");
        $("#propertyLocalityAlert").css("display", "none");
        divContainer = document.createElement("div");
        selectedTextDiv = document.createElement("div");
        createCrossDiv = document.createElement("div");
        createCrossDiv.className = "crossIcon";
        createCrossDiv.onclick = function() {
            this.parentElement.parentElement.removeChild(this.parentElement);
            removeDataUsingType(A, D);
            setIdWidthAuto(C);
            if (C == "refine_keyword") {
                replaceValueInGaqCookie("srpLocality", $("#localityName").val(), "gaqCompleteCookie", "||", "N");
                replaceValueInGaqCookie("srpProject", $("#projectSocity").val(), "gaqCompleteCookie", "||", "N");
                replaceValueInGaqCookie("srpDeveloperName", $("#developerName").val(), "gaqCompleteCookie", "||", "N");
                replaceValueInGaqCookie("srpCity", $("#bar_city").val(), "gaqCompleteCookie", "||", "N");
                replaceValueInGaqCookie("srpCityName", $("#bar_city_name").val(), "gaqCompleteCookie", "||", "N");
                replaceValueInGaqCookie("srpLandmark", $("#searchLocName").val(), "gaqCompleteCookie", "||", "N");
                replaceValueInGaqCookie("universalTimestamp", "" + new Date(), "gaqCompleteCookie", "||", "N");
                var I = replaceValueInGaqCookie("sequenceNum", null, "gaqCompleteCookie", "||", "Y");
                gaqCookie = readCookieVal("gaqCompleteCookie");
                console.log("gaqCookieDetail " + gaqCookie);
                if (_gaq) {
                    _gaq.push(["_trackEvent", gaqCookie, "HomePageSearch"])
                }
                var H = $("div .selectedTextDivrefine_keyword");
                var G = H.length;
                var F = "";
                if (H != null && H.length > 0) {
                    for (var E = 0; E < G; E++) {
                        if (F == "") {
                            F = H.eq(E).html().replace(/,\s*$/, "")
                        } else {
                            F = F + "," + H.eq(E).html().replace(/,\s*$/, "")
                        }
                    }
                }
                if (F == "") {
                    F = $("#refine_keyword").val()
                } else {
                    F = F + "," + $("#refine_keyword").val().replace(/,\s*$/, "")
                }
                F = F.replace(/,\s*$/, "");
                globalCityLocKey = F
            }
            if ($("div .selectedTextDiv" + C).length < 1) {
                $("#projectSocity").val("");
                $("#developerName").val("");
                isRadiusSearch = "N";
                $("#isRadiusSearch").val("N");
                $("#homeTravelTimer").hide();
                $("#radius").val("")
            }
            if ($(".divContainer" + C).size() < 1) {
                $("#" + C).removeAttr("style");
                if (!(typeof isRefineLoaded == "undefined") && isRefineLoaded) {
                    $("#allSelectedRefinedOptions ul.showOnly_propertyType").html("");
                    createCommaSeparatedInputInForm("refine_keyword", "localityName", "bar_city")
                }
            } else {
                if (!(typeof isRefineLoaded == "undefined") && isRefineLoaded) {
                    $("#allSelectedRefinedOptions ul.showOnly_propertyType").html("");
                    createCommaSeparatedInputInForm("refine_keyword", "localityName", "bar_city");
                    reloadFilter("cityLocality");
                    getSearchUrl();
                    addProjectsToSpanForRefine("refine_keyword", "localityName")
                }
            }
            if ($("div .selectedTextDiv" + C).length < 1) {
                $("#" + C).removeAttr("style");
                if ($("#bar_category").val() == "R" || $("#bar_category").val() == "r") {
                    $("#" + C).attr("placeholder", "Enter Landmark, Location or Society")
                } else {
                    $("#" + C).attr("placeholder", "Enter Landmark, Location or Project")
                }
                $("#" + C).removeClass("noPlace");
                toCallSearch = true;
                toCallGoogleAutoSuggest = true;
                isRadiusSearch = "N";
                $("#isRadiusSearch").val("N");
                $("#homeTravelTimer").hide();
                $("#propertiesWithinBar").css("display", "none");
                if ($("#sort0").html() == "Nearest") {
                    $("#sort1").click()
                }
                $("#sort8").css("display", "none");
                setCityOnLoadAndChange(C, "bar_city");
                if ($("#" + C).val() == "") {
                    $("#nearByLocDisBar").css("display", "none")
                }
            }
            setIdWidthAuto(C)
        };
        divContainer.className = "divContainer" + C + " localityKeywordParent";
        selectedTextDiv.className = "selectedTextDiv" + C + " localityKeywordNames";
        selectedTextDiv.innerHTML = D.replace(/,\s*$/, "");
        selectedTextDiv.setAttribute("title", D.replace(/,\s*$/, ""));
        selectedTextDiv.setAttribute("data-box", D.replace(/,\s*$/, "") + "--" + A);
        divContainer.appendChild(selectedTextDiv);
        divContainer.appendChild(createCrossDiv);
        $("#autoSuggestInputDiv" + C).append(divContainer).append($("#" + C));
        $("#" + C).css("display", "block");
        keywordPosTop = ($("#" + C).css("marginTop"));
        keywordPosLeft = ($("#" + C).css("marginLeft"));
        $("#" + C).css("width", "90px");
        if ($("#" + C).attr("style")) {
            if ($("#isRadiusSearch").val() != "Y" && $("#developerName").val() == "" && ($("#localitySrpPage").val() !== "localitySrp" || $("#localityName").val() == "")) {
                $("#" + C).attr("placeholder", "Add More...");
                $("#keyword").addClass("noPlace")
            } else {
                $("#" + C).attr("placeholder", "")
            }
            if ($("#" + C).css("fontSize") == "12px") {
                $("#" + C).css("width", "60px")
            }
            if ($("#" + C).css("fontSize") == "14px") {
                $("#" + C).css("width", "75px")
            }
        }
        if (C == "keyword") {
            if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./) || chrome > 0) {
                $("#" + C).trigger("click")
            }
        }
        setIdWidthAuto(C)
    } catch (B) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("cityLocality.js", "createComboDiv", B)
        }
    }
}

function createComboDivsFromKeywordSuggest(B, G, A) {
    $("#keyword_suggest").hide();
    var C = B.split(",");
    var F = C[0].trim();
    $("#refine_keyword").val("");
    $("#" + G).css("display", "none");
    $("#propertyLocalityAlert").css("display", "none");
    B = B.replace("&amp;", "&");
    addDataUsingType(A, F);
    divContainer = document.createElement("div");
    selectedTextDiv = document.createElement("div");
    createCrossDiv = document.createElement("div");
    createCrossDiv.className = "crossIcon";
    createCrossDiv.onclick = function() {
        this.parentElement.parentElement.removeChild(this.parentElement);
        removeDataUsingType(A, F);
        setIdWidthAuto(G);
        if (G == "refine_keyword") {
            var K = $("div .selectedTextDivrefine_keyword");
            var J = K.length;
            var I = "";
            if (K != null && K.length > 0) {
                for (var H = 0; H < J; H++) {
                    if (I == "") {
                        I = K.eq(H).html().replace(/,\s*$/, "")
                    } else {
                        I = I + "," + K.eq(H).html().replace(/,\s*$/, "")
                    }
                }
            }
            if (I == "") {
                I = $("#refine_keyword").val()
            } else {
                I = I + "," + $("#refine_keyword").val().replace(/,\s*$/, "")
            }
            I = I.replace(/,\s*$/, "");
            globalCityLocKey = I
        }
        if ($("div .selectedTextDiv" + G).length < 1) {
            $("#" + G).removeClass("noPlace");
            $("#projectSocity").val("");
            $("#developerName").val("");
            $("#isRadiusSearch").val("N");
            $("#homeTravelTimer").hide();
            $("#radius").val("")
        }
        if ($(".divContainer" + G).size() < 1) {
            $("#" + G).removeAttr("style")
        } else {
            if (!(typeof isRefineLoaded == "undefined") && isRefineLoaded) {
                $("#allSelectedRefinedOptions ul.showOnly_propertyType").html("");
                createCommaSeparatedInputInForm("refine_keyword", "localityName", "bar_city");
                reloadFilter("cityLocality");
                getSearchUrl();
                addProjectsToSpanForRefine("refine_keyword", "localityName")
            }
        }
        if ($("div .selectedTextDiv" + G).length < 1) {
            $("#" + G).removeAttr("style");
            if ($("#bar_category").val() == "R" || $("#bar_category").val() == "r") {
                $("#" + G).attr("placeholder", "Enter Landmark, Location or Society")
            } else {
                $("#" + G).attr("placeholder", "Enter Landmark, Location or Project")
            }
            toCallSearch = true;
            toCallGoogleAutoSuggest = true;
            isRadiusSearch = "N";
            $("#isRadiusSearch").val("N");
            $("#homeTravelTimer").hide();
            $("#propertiesWithinBar").css("display", "none");
            if ($("#sort0").html() == "Nearest") {
                $("#sort1").click()
            }
            $("#sort8").css("display", "none");
            setCityOnLoadAndChange(G, "bar_city");
            if ($("#" + G).val() == "") {
                $("#nearByLocDisBar").css("display", "none")
            }
        }
    };
    divContainer.className = "divContainer" + G + " localityKeywordParent";
    selectedTextDiv.className = "selectedTextDiv" + G + " localityKeywordNames";
    selectedTextDiv.innerHTML = F.replace(/,\s*$/, "");
    selectedTextDiv.setAttribute("title", F.replace(/,\s*$/, ""));
    selectedTextDiv.setAttribute("data-box", F.replace(/,\s*$/, "") + "--" + A);
    divContainer.appendChild(selectedTextDiv);
    divContainer.appendChild(createCrossDiv);
    $("#autoSuggestInputDiv" + G).append(divContainer).append($("#" + G));
    $("#" + G).css("display", "block");
    $("#" + G).css("width", "90px");
    keywordPosTop = ($("#keyword").css("marginTop"));
    keywordPosLeft = ($("#keyword").css("marginLeft"));
    $("#" + G).val("");
    if ($("#isRadiusSearch").val() != "Y" && $("#developerName").val() == "" && ($("#localitySrpPage").val() !== "localitySrp" || $("#localityName").val() == "")) {
        $("#" + G).attr("placeholder", "Add More...");
        $("#keyword").addClass("noPlace")
    } else {
        $("#" + G).attr("placeholder", "")
    }
    if ($("#" + G).css("fontSize") == "12px") {
        $("#" + G).css("width", "60px")
    }
    if ($("#" + G).css("fontSize") == "14px") {
        $("#" + G).css("width", "75px")
    }
    if (G == "keyword") {
        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./) || chrome > 0) {
            $("#" + G).trigger("click")
        }
    }
    var E = typeof InstallTrigger !== "undefined";
    if (!(typeof isRefineLoaded == "undefined") && isRefineLoaded && E) {
        $("#allSelectedRefinedOptions ul.showOnly_propertyType").html("");
        createCommaSeparatedInputInForm("refine_keyword", "localityName", "bar_city");
        reloadFilter("cityLocality");
        getSearchUrl();
        addProjectsToSpanForRefine("refine_keyword", "localityName")
    }
    setIdWidthAuto(G);
    if (G == "refine_keyword") {
        replaceValueInGaqCookie("srpLocality", $("#localityName").val(), "gaqCompleteCookie", "||", "N");
        replaceValueInGaqCookie("srpProject", $("#projectSocity").val(), "gaqCompleteCookie", "||", "N");
        replaceValueInGaqCookie("srpDevelopername", $("#developerName").val(), "gaqCompleteCookie", "||", "N");
        replaceValueInGaqCookie("srpCity", $("#bar_city").val(), "gaqCompleteCookie", "||", "N");
        replaceValueInGaqCookie("srpCityName", $("#bar_city_name").val(), "gaqCompleteCookie", "||", "N");
        replaceValueInGaqCookie("srpLandmark", $("#searchLocName").val(), "gaqCompleteCookie", "||", "N");
        replaceValueInGaqCookie("universalTimestamp", "" + new Date(), "gaqCompleteCookie", "||", "N");
        var D = replaceValueInGaqCookie("sequenceNum", null, "gaqCompleteCookie", "||", "Y");
        gaqCookie = readCookieVal("gaqCompleteCookie");
        console.log("gaqCookieDetail " + gaqCookie);
        if (_gaq) {
            _gaq.push(["_trackEvent", gaqCookie, "HomePageSearch"])
        }
    }
    if (G != "refine_keyword" && A == "bar_city_name" && $(".divContainer" + G).size() == 1) {
        setTimeout(function() {
            createPopularLocalityData()
        }, 30)
    }
}

function createPopularLocalityData() {
    var A = "S";
    if ($("#bar_category").val() == "R" || $("#bar_category").val() == "r") {
        A = "R"
    }
    if (!($(".divContainerkeyword").size() == 1 && $("#localityName").val() == "" && $("#projectSocity").val() == "" && $("#developerName").val() == "" && $("bar_city").val() != "")) {
        return
    }
    var B = contextPath + "ajax/getPopularLocalityData.json?city=" + $("#bar_city").val() + "&category=" + A + "&cityName=" + $("#bar_city_name").val();
    $.ajax({
        dataType: "json",
        type: "get",
        url: B,
        cache: true,
        async: true,
        success: function(F) {
            if (F == null) {
                return
            }
            var E = F.toString();
            var C = E.split(",");
            if (C.length < 2) {
                return
            }
            $("#keyword_suggest").html("");
            $("#keyword_suggest").append('<div class="over"><div class="nonSelectEleLandmark">Popular Localities </div></div>');
            for (var D = 0; D < C.length; D++) {
                if (C[D] != null) {
                    C[D] = bothSideTrimA(C[D]);
                    $("#keyword_suggest").append("<div class='googleSuggest' onclick='createComboDivsFromKeywordSuggest(\"" + C[D] + '","keyword","localityName");\'>' + C[D] + ", " + $("#bar_city_name").val() + "</div>")
                }
            }
            $("#keyword_suggest").show();
            $("#keyword_suggest").css({
                visibility: "visible"
            })
        }
    })
}

function removeDivEmpty(A, B) {
    if (A.keyCode == 8) {
        $("#" + B).parent().find(".divContainer" + B + ":last").remove()
    }
    if ($("div .selectedTextDiv" + B).length < 1) {
        $("#isRadiusSearch").val("N");
        $("#radius").val("");
        $("#projectSocity").val("");
        $("#developerName").val("");
        $("#searchLocName").val("")
    }
}

function removeElementOnTabChange() {
    $(".localityKeywordParent").remove();
    $(".localityProjectKeyword").find("input").removeAttr("style")
}

function setCityIfNotExists(E, D) {
    if (isRadiusSearch == "Y" || $("#isRadiusSearch").val() == "Y") {
        return
    }
    document.getElementById("moreThanOneCityDiv" + E).style.display = "none";
    if (document.getElementById(D).value == "" || document.getElementById(D).value == "*") {
        var B = document.getElementById(E).value;
        var A = B.replace("&amp;", "and");
        A = A.replace("&", "and");
        var C = contextPath + "ajax/getCityParser.json?firstText=" + A;
        $.ajax({
            dataType: "json",
            type: "get",
            url: C,
            cache: true,
            async: false,
            success: function(G) {
                if (G.COUNT == 1) {
                    if (G.CITY_SUBURB_USER_VALUES != null) {
                        document.getElementById(D).value = G.CITY_SUBURB_CODES;
                        var F = contextPath + "ajax/getCNDDescription.json?cityCode=" + G.CITY_SUBURB_CODES;
                        $.ajax({
                            dataType: "json",
                            type: "get",
                            url: F,
                            cache: true,
                            async: false,
                            success: function(H) {
                                if (H) {
                                    document.getElementById(D + "_name").value = H
                                } else {
                                    document.getElementById(D + "_name").value = G.CITY_SUBURB_ACTUAL_VALUES
                                }
                                if (E == "refine_keyword" && $("#prev_city").val() != $("#bar_city").val() && $("#bar_city").val() != "") {
                                    $("#prev_city").val($("#bar_city").val());
                                    stopRefine = true;
                                    resetAllFilters();
                                    stopRefine = false
                                }
                            }
                        })
                    }
                }
            }
        })
    }
}

function setCityIfNotExistsOnFrameClick(A, F, B) {
    if (isRadiusSearch == "Y" || $("#isRadiusSearch").val() == "Y") {
        return
    }
    B = B.trim();
    B = B.replace(/,\s*$/, "");
    B = B.replace("&amp;", "and");
    var I = B.replace(" & ", " and ");
    var G = I.split(",");
    var D = G.length;
    document.getElementById("moreThanOneCityDiv" + A).style.display = "none";
    var H = B;
    var C = H.replace("&amp;", "and");
    C = C.replace("&", "and");
    var E = contextPath + "ajax/getCityParserFromSuggest.json?firstText=" + G[D - 1].trim();
    $.ajax({
        url: E,
        dataType: "json",
        async: false,
        success: function(L) {
            if (L.COUNT == 1) {
                if ($("#" + F).val() != L.CITY_SUBURB_CODES && L.CITY_SUBURB_CODES != null) {
                    var K = $("#" + F).val().split("-");
                    if (K[0] != L.CITY_SUBURB_CODES) {
                        $("#" + A).parent().find(".divContainer" + A).remove();
                        if (L.CITY_SUBURB_USER_VALUES != null) {
                            document.getElementById(F).value = L.CITY_SUBURB_CODES;
                            var J = contextPath + "ajax/getCNDDescription.json?cityCode=" + L.CITY_SUBURB_CODES;
                            $.ajax({
                                dataType: "json",
                                type: "get",
                                url: J,
                                cache: true,
                                async: false,
                                success: function(M) {
                                    if (M) {
                                        document.getElementById(F + "_name").value = M
                                    } else {
                                        document.getElementById(F + "_name").value = L.CITY_SUBURB_ACTUAL_VALUES
                                    }
                                }
                            });
                            if (A == "refine_keyword" && $("#prev_city").val() != $("#bar_city").val() && $("#bar_city").val() != "") {
                                $("#prev_city").val($("#bar_city").val());
                                stopRefine = true;
                                resetAllFilters();
                                stopRefine = false
                            }
                        }
                    }
                }
            }
        }
    })
}

function submitButtonCityCheck(A, H, J) {
    if (isRadiusSearch == "Y" || $("#isRadiusSearch").val() == "Y") {
        return true
    }
    var E = true;
    document.getElementById("moreThanOneCityDiv" + A).style.display = "none";
    document.getElementById("errorMessageCity").style.display = "none";
    document.getElementById("onlyLocation").style.display = "none";
    document.getElementById("validLocation").style.display = "none";
    $("#autoSuggestInputDivkeyword").removeClass("borderErrRed");
    if (document.getElementById(H).value == "" || document.getElementById(H).value == "*") {
        var I = document.getElementById(A).value;
        var K = $("div .selectedTextDiv" + A);
        if (K != null) {
            var D = K.length;
            for (var F = 0; F < D; F++) {
                if (I != "") {
                    I += "," + K.eq(F).html()
                } else {
                    I = K.eq(F).html()
                }
            }
        }
        if (I == null || I == "" || I == "Enter Landmark, Location or Project" || I == "Add More...") {
            if ($("#errorMessageCity").is(":hidden")) {
                document.getElementById("errorMessageCity").style.display = "block";
                $(".orSearchBy").removeClass("moreSpace");
                if ($("#" + A).val().trim() == "") {
                    document.getElementById("onlyLocation").style.display = "block"
                } else {
                    document.getElementById("validLocation").style.display = "block"
                }
            }
            var B = document.getElementById("divIdFoundOnPage");
            if (B) {
                _gaq.push(["_trackEvent", "cityFieldError|Input = " + $("#" + B).val(), "CityLocality", "DetailPage"])
            } else {
                _gaq.push(["_trackEvent", "cityFieldError|Input = " + $("#" + A).val(), "CityLocality", "HomePage"])
            }
            $("#autoSuggestInputDivkeyword").addClass("borderErrRed");
            E = false
        }
        var C = I.replace("&amp;", "and");
        C = C.replace("&", "and");
        var G = contextPath + "ajax/getCityParser.json?firstText=" + C;
        $.ajax({
            dataType: "json",
            type: "get",
            url: G,
            cache: true,
            async: false,
            success: function(Q) {
                if (Q.COUNT == 1) {
                    if (Q.CITY_SUBURB_USER_VALUES != null) {
                        document.getElementById(H).value = Q.CITY_SUBURB_CODES;
                        var S = contextPath + "ajax/getCNDDescription.json?cityCode=" + Q.CITY_SUBURB_CODES;
                        $.ajax({
                            dataType: "json",
                            type: "get",
                            url: S,
                            cache: true,
                            async: true,
                            success: function(W) {
                                if (W) {
                                    document.getElementById(H + "_name").value = W
                                } else {
                                    document.getElementById(H + "_name").value = Q.CITY_SUBURB_ACTUAL_VALUES
                                }
                            }
                        })
                    }
                    E = true
                } else {
                    if (Q.COUNT > 1) {
                        if ($(".moreThanOneCity")) {
                            $(".moreThanOneCity").remove()
                        }
                        if ($(".moreThanOneCityBr")) {
                            $(".moreThanOneCityBr").remove()
                        }
                        if ($(".locProjDuplicate")) {
                            $(".locProjDuplicate").remove()
                        }
                        var L = "";
                        var U = Q.CITY_SUBURB_CODES;
                        var O = [];
                        for (var R = 0; R < U.length; R++) {
                            var T = U[R];
                            var V = "CITY_CODE" + T;
                            var P = "cityList" + U[R];
                            var M = "";
                            if (typeof Q.LOCALITY_NAME !== "undefined") {
                                M = Q.LOCALITY_NAME + ", "
                            }
                            L = "<div class='moreThanOneCity' onmouseout='cityHoverOut(this)' onmouseover='cityHover(this);' onclick=\"callSubmitAfterSettingCity(" + U[R] + ",'" + H + "','" + A + "','" + Q[V] + "')\">" + M + Q[V] + "</div>";
                            $("#moreThanOneCityDiv" + A).append(L)
                        }
                        document.getElementById("moreThanOneCityDiv" + A).style.display = "block";
                        var N = document.getElementById("divIdFoundOnPage");
                        if (N) {
                            _gaq.push(["_trackEvent", "cityField", "Clicked", "DetailPage"])
                        } else {
                            _gaq.push(["_trackEvent", "cityField", "Clicked", "HomePage"])
                        }
                        E = false
                    } else {
                        if ($("#errorMessageCity").is(":hidden")) {
                            document.getElementById("errorMessageCity").style.display = "block";
                            if ($("#" + A).val().trim() == "") {
                                $("#onlyLocation").show()
                            } else {
                                $("#validLocation").show()
                            }
                        }
                        var N = document.getElementById("divIdFoundOnPage");
                        if (N) {
                            _gaq.push(["_trackEvent", "cityFieldError|Input = " + $("#" + N).val(), "CityLocality", "DetailPage"])
                        } else {
                            _gaq.push(["_trackEvent", "cityFieldError|Input = " + $("#" + A).val(), "CityLocality", "HomePage"])
                        }
                        $("#autoSuggestInputDivkeyword").addClass("borderErrRed");
                        E = false
                    }
                }
            }
        })
    } else {
        return E
    }
    return E
}

function cityHover(A) {
    $(A).removeClass("cityHoverOuting");
    $(A).addClass("cityHovering")
}

function cityHoverOut(A) {
    $(A).removeClass("cityHovering");
    $(A).addClass("cityHoverOuting")
}

function callSubmitAfterSettingCity(B, D, C, A) {
    document.getElementById(D).value = B;
    document.getElementById(D + "_name").value = A;
    document.getElementById("moreThanOneCityDiv" + C).style.display = "none";
    $("#" + C).val($("#" + C).val() + "," + A);
    if (!(typeof isRefineLoaded == "undefined") && isRefineLoaded) {
        $("#allSelectedRefinedOptions ul.showOnly_propertyType").html("");
        createCommaSeparatedInputInForm("refine_keyword", "localityName", "bar_city");
        reloadFilter("cityLocality");
        getSearchUrl();
        addProjectsToSpanForRefine("refine_keyword", "localityName")
    }
}

function setCityTitleAndCode(C, A) {
    if (document.getElementById(C) == null) {
        return
    }
    var B = contextPath + "ajax/getDescriptionFromCode.json?cityCode=" + A;
    $.ajax({
        dataType: "json",
        type: "get",
        url: B,
        cache: true,
        async: false,
        success: function(D) {
            document.getElementById(C).value = A;
            document.getElementById(C).innerHTML = D.DESCRIPTION
        }
    })
}

function createStringIntoMapVal(D, B, H) {
    var F = new Object();
    if (D) {
        if (D.indexOf(B)) {
            var A = D.split(B);
            var G = A.length;
            for (var E = 0; E < G; E++) {
                var C = A[E].split(H);
                if (C) {
                    F[C[0]] = C[1]
                }
            }
            return F
        } else {
            var C = A[E].split(":");
            if (C) {
                F[C[0]] = C[1]
            }
            return F
        }
    } else {
        return null
    }
}

function customCheckBox(A) {
    $(A).each(function() {
        getInputCheck = $(this).attr("checked");
        if ($(this).is(":checked")) {
            $(this).parent().addClass("checked")
        } else {
            $(this).parent().removeClass("checked")
        }
    })
}

function lockscroll() {
    $(window).scrollTop(currentBlockScroll)
}

function setIdWidthAuto(H) {
    try {
        var A = $("#" + H).parent().width();
        var G = $("#" + H).parent().find(".localityKeywordParent:visible:last").width();
        var C = 0;
        if ($("#" + H).parent().find(".localityKeywordParent:visible").length > 0) {
            C = $("#" + H).parent().find(".localityKeywordParent:visible:last").position().left
        }
        var B = G + C;
        var D = A - B;
        var F = 90;
        if (H == "refine_keyword") {
            F = 75
        }
        if ((D - 15) > F) {
            $("#" + H).width(D - 15)
        } else {
            $("#" + H).css("width", "95%")
        }
    } catch (E) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("cityLocality.js", "setIdWidthAuto", E)
        }
    }
}

function setRadius(B) {
    var A = "";
    if ($("#radiusVal").val() == B) {
        return false
    }
    if (B != null) {
        $("#radiusVal").val(B);
        A = B.split(" km")[0].trim() + "000";
        var C = $("#radius").val();
        latLongRadiusValSplitted = C.split(",");
        $("#radius").val(latLongRadiusValSplitted[0].trim() + "," + latLongRadiusValSplitted[1].trim() + "," + A);
        return true
    }
    return false
}

function findDefaultRadiusVal(C) {
    var B = 5;
    if (C != null) {
        var A = C.split(",");
        if (A.length > 2) {
            B = parseInt(A[2]) / 1000
        }
        if (B > 7 || B == 10 || B == "10") {
            $("#radiusVal").val("7 km");
            $("#radius").val(A[0] + "," + A[1] + ",7000");
            return
        } else {
            $("#radiusVal").val(B + " km");
            return
        }
    }
    $("#radiusVal").val(B + " km")
}

function removeDataUsingType(B, A) {
    if (B == "localityName" || B == "projectSocity" || B == "developerName") {
        var D = "";
        var C = 0;
        var G = $("#" + B).val();
        var F = G.split(",");
        for (var E = 0; E < F.length; E++) {
            if (C == 0 && F[E] == A) {
                C++
            } else {
                if (D == "") {
                    D = F[E]
                } else {
                    D = D + "," + F[E]
                }
            }
        }
        $("#" + B).val(D)
    }
    if (B == "searchLocName") {
        $("#" + B).val("")
    }
}

function addDataUsingType(A, C) {
    if (A == "localityName" || A == "projectSocity" || A == "developerName") {
        var B = $("#" + A).val();
        if (B == "") {
            B = C
        } else {
            B = B + "," + C
        }
        $("#" + A).val(B)
    }
}

function putValInLocProjAndCallSearch(E, A, F) {
    createComboDivsProperty(E, F, A);
    var B = $("#" + A).val();
    if (B.trim() == "") {
        B = E
    } else {
        B = B + "," + E
    }
    $("#" + A).val(B);
    var C = $("#" + F).val();
    if (C.indexOf(",") > -1) {
        var D = C.substring(C.indexOf(",") + 1);
        $("#" + F).val(D)
    } else {
        $("#" + F).val("")
    }
    $("#localityProjectDuplicate" + F).hide();
    if ($(".locProjDuplicate")) {
        $(".locProjDuplicate").remove()
    }
    if (F == "refine_keyword") {
        showWholeSearchList("refine_keyword");
        reloadFilter("cityLocality");
        getSearchUrl();
        if ($("#localityName").val().trim() != "" && $("#isRadiusSearch").val() != "Y") {
            $("#nearByLocDisBar").css("display", "block")
        } else {
            $("#nearByLocDisBar").css("display", "none")
        }
        addProjectsToSpanForRefine("refine_keyword", "localityName");
        showWholeSearchList("refine_keyword")
    } else {
        showWholeSearchList(F)
    }
}

function bothSideTrimA(A) {
    try {
        return A.replace(/^\s+|\s+$/gm, "")
    } catch (B) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("seoHelper", "bothSideTrim", B)
        }
    }
}

function replaceValueInGaqCookie(P, E, M, D, N) {
    try {
        if (typeof E !== "undefined" && E != null && E != "") {
            E = bothSideTrimA(E);
            E = E.replace("&amp;", "and");
            E = E.replace(";", "");
            E = E.replace("=", "")
        }
        if (E == "undefined" || E == "null" || E == null || typeof E == "undefined") {
            E = ""
        }
        if (E != null && E.indexOf(">") > -1) {
            var I = E.split(">");
            var L = I.length;
            E = I[L - 1]
        }
        if (E != null) {
            E = bothSideTrimA(E)
        }
        var H = "";
        var C = readCookieVal(M);
        if (C != null) {
            var O = "";
            var B = C.split(D);
            for (var G = 0; G < B.length; G++) {
                var F = B[G].split("=");
                if (P == F[0]) {
                    if (N == "Y") {
                        var J = parseInt(F[1]) + 1;
                        var A = J.toString();
                        H = A;
                        if (O == "") {
                            O = P + "=" + A
                        } else {
                            O = O + D + P + "=" + A
                        }
                    } else {
                        if (O == "") {
                            O = P + "=" + E
                        } else {
                            O = O + D + P + "=" + E
                        }
                        H = E
                    }
                } else {
                    if (O == "") {
                        O = F[0] + "=" + F[1]
                    } else {
                        O = O + D + F[0] + "=" + F[1]
                    }
                }
            }
            createCookieExpiresInTimeInDays(M, O, 200)
        }
        return H
    } catch (K) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("seoHelper", "bothSideTrim", K)
        }
    }
}

function addValueInGaqCookie(K, C, H, G, I) {
    if (I == "*") {
        I = ","
    }
    if (typeof C !== "undefined" && C != null) {
        C = C.replace("&amp;", "and")
    }
    if (C == "undefined" || C == "null") {
        C = ""
    }
    var F = "";
    var B = readCookieVal(H);
    if (B != null) {
        var J = "";
        var A = B.split(G);
        for (var E = 0; E < A.length; E++) {
            var D = A[E].split("=");
            if (K == D[0]) {
                if (J == "") {
                    J = K + "=" + D[1] + I + C
                } else {
                    J = J + G + K + "=" + D[1] + I + C
                }
                F = C
            } else {
                if (J == "") {
                    J = D[0] + "=" + D[1]
                } else {
                    J = J + G + D[0] + "=" + D[1]
                }
            }
        }
        createCookieExpiresInTimeInDays(H, J, 200)
    }
    return F
}

function removeValueInGaqCookie(N, M, I, H, J) {
    if (J == "*") {
        J = ","
    }
    if (typeof M !== "undefined" && M != null) {
        M = M.replace("&amp;", "and")
    }
    if (M == "undefined" || M == "null") {
        M = ""
    }
    var G = "";
    var C = readCookieVal(I);
    if (C != null) {
        var K = "";
        var B = C.split(H);
        for (var F = 0; F < B.length; F++) {
            var E = B[F].split("=");
            if (N == E[0]) {
                var A = E[1].split(J);
                var L = "";
                for (var D = 0; D < A.length; D++) {
                    if (A[D] != M) {
                        if (L == "") {
                            L = A[D]
                        } else {
                            L = L + J + A[D]
                        }
                    }
                }
                if (K == "") {
                    K = L
                } else {
                    K = K + H + E[0] + "=" + L
                }
            } else {
                if (K == "") {
                    K = E[0] + "=" + E[1]
                } else {
                    K = K + H + E[0] + "=" + E[1]
                }
            }
        }
        createCookieExpiresInTimeInDays(I, K, 200)
    }
    return G
}

function callRadiusSearchWithDefinedRadius(A) {
    if ($("#isRadiusSearch").val() == "Y" && $("#radius").val() != null && $("#radius").val() != "" && $("div .selectedTextDiv" + A).length == 1) {
        getSearchUrl()
    }
}

function createGaqStringForHome(E, I) {
    var H = readCookieVal("trackerCookie");
    if (typeof H === "undefined" || H == null) {
        H = ""
    }
    if (typeof E == "undefined" || isNaN(E)) {
        E = 1
    }
    var C = $("#sessionIdVal").val();
    if (typeof sessionId !== "undefined") {
        C = sessionId
    }
    if (E != 1 || E != "1") {
        var A = readCookieVal("gaqCompleteCookie");
        if (A != null) {
            var B = A.split("||");
            var F = 0;
            for (F = 0; F < B.length; F++) {
                if (B[F].indexOf("sessionId") > -1) {
                    var J = B[F].split("=");
                    if (J.length > 1) {
                        if (J[1] != C) {
                            E = 1
                        }
                    }
                }
            }
        }
    }
    var G = $("#loginIdVal").val();
    if (typeof loginId !== "undefined") {
        G = loginId
    }
    var D = "A";
    if (!(typeof $("#pageOptionString") == "undefined")) {
        D = $("#pageOptionString").val()
    }
    return "sequenceNum=" + E + "||universalTimestamp=" + new Date() + "||source=" + H + "||sessionId=" + C + "||loginId=" + G + "||homeSearchBuyRent=" + $("#bar_category").val() + "||homeSearchTyped=" + $("#refine_keyword").val() + "||homeSearchCity=" + $("#bar_city").val() + "||homeSearchCityName=" + $("#bar_city_name").val() + "||homeSearchLocality=" + $("#localityName").val() + "||homeSearchProject=" + $("#projectSocity").val() + "||homeSearchLandmark=" + $("#searchLocName").val() + "||homeSearchPropertyType=" + $("#bar_homePropertyType_new").val() + "||homeSearchBudgetMin=" + $("#bar_budget_min_new").val() + "||homeSearchBudgetMax=" + $("#bar_budget_max_new").val() + "||homeSearchbedrooms=" + $("#bar_bedrooms_new").val() + "||srpLandingPage=" + $("#refine_source").val() + "||srpSearchType=" + searchType + "||srpcategory=" + $("#bar_category").val() + "||srpCity=" + $("#bar_city").val() + "||srpCityName=" + $("#bar_city_name").val() + "||srpLocality=" + $("#localityName").val() + "||srpProject=" + $("#projectSocity").val() + "||srpLandmark=" + $("#searchLocName").val() + "||srpPropertyType=" + $("#bar_homePropertyType_new").val() + "||srpBudgetMin=" + $("#bar_budget_min_new").val() + "||srpBudgetMax=" + $("#bar_budget_max_new").val() + "||srpbedrooms=||srpinputListings=||srpsaleType=||srppossessionStatus=||srppossessionYears=||srpageConstruction=||srpfurnished=||srpareaFrom=||srpareaTo=||srppostedSince=||srpamenities=||srpimageVideo=||srpverified=||srpdiscountsOffers=||srppropertiesIn=||srpOtherSortClick=||srpOtherPhotoClick=||srpOtherSuburbClick=||srpOtherShorstlistClick=||srpContactButtonClick=||srpContactDetailPageView=||srpContactPropertyId=||srpContactProjectName=||srpContactPsmId=||srpContactButtonOpenedSuccess=||srpContactPositionOfProperty=||srpContactBedroom=||srpContactPropertyType=||srpContactArea=||srpContactPrice=||srpContactNumberOfImages=||srpContactLocation=||srpContactDevName=||srpContactPostedBy=||srpContactRatePerSqft=||srpContactProjPropOrNot=||srpContactStatus=||srpContactTransaction=||srpContactFurnishingStatus=||srpContactFloorDetails=||srpContactBathrooms=||srpContactApprovals=||srpContactCommissionRate=||srpContactPostedDate=||srpContactVerified=||srpContactListingType=||srpContactCompletionScore=||srpContactIndexScore=||srpContactUserType=||srpDetailPageClickDetailPageView=||srpDetailPageClickPropertyId=||srpDetailPageClickProjectName=||srpDetailPageClickPsmId=||srpDetailPageClickPositionOfProperty=||srpDetailPageClickbedrooms=||srpDetailPageClickPropertyType=||srpDetailPageClickArea=||srpDetailPageClickPrice=||srpDetailPageClickNumberOfImages=||srpDetailPageClickLocation=||srpDetailPageClickDevName=||srpDetailPageClickPostedBy=||srpDetailPageClickRatePerSqft=||srpDetailPageClickProjPropOrNot=||srpDetailPageClickStatus=||srpDetailPageClickTransaction=||srpDetailPageClickFurnishingStatus=||srpDetailPageClickApprovals=||srpDetailPageClickCommissionRate=||srpDetailPageClickPostedDate=||srpDetailPageClickVerified=||srpDetailPageClickListingType=||srpDetailPageClickCompletionScore=||srpDetailPageClickIndexScore=||srpDetailPageClickUserType=||srpDetailPageLocality=||srpDetailPagePropertyType=||srpDetailPageBudget=||searchVersionAB=" + D + ""
}

function addGaqForSuburb(A) {
    var B = readCookieVal("gaqCompleteCookie");
    if (B == null) {
        var C = createGaqStringForHome(1, "refine_keyword");
        replaceValueInGaqCookie("srpOtherSuburbClick", A, "gaqCompleteCookie", "||", "N");
        createCookieExpiresInTimeInDays("gaqCompleteCookie", C, 200);
        C = readCookieVal("gaqCompleteCookie");
        console.log("gaqCookieDetail " + C);
        if (_gaq) {
            _gaq.push(["_trackEvent", C, "HomePageSearch"])
        }
    } else {
        var D = replaceValueInGaqCookie("sequenceNum", null, "gaqCompleteCookie", "||", "Y");
        replaceValueInGaqCookie("srpOtherSuburbClick", A, "gaqCompleteCookie", "||", "N");
        replaceValueInGaqCookie("universalTimestamp", "" + new Date(), "gaqCompleteCookie", "||", "N");
        var C = readCookieVal("gaqCompleteCookie");
        console.log("gaqCookieDetail checkSuburb Click " + C);
        if (_gaq) {
            _gaq.push(["_trackEvent", C, "HomePageSearch"])
        }
    }
}

function callGaqPushCustom(C, A) {
    var B = document.getElementById("divIdFoundOnPage");
    var D = document.getElementById("topnaviagetionSearchVal");
    if (D) {
        _gaq.push(["_trackEvent", "AutoSuggest|SelectedPosition = " + A + "|SelectedValue = " + C + "", "AutoSuggest", "SearchPage"])
    } else {
        if (B) {
            _gaq.push(["_trackEvent", "AutoSuggest|SelectedPosition = " + A + "|SelectedValue = " + C + "", "AutoSuggest", "DetailsPage"])
        } else {
            _gaq.push(["_trackEvent", "AutoSuggest|SelectedPosition = " + A + "|SelectedValue = " + C + "", "AutoSuggest", "HomePage"])
        }
    }
}

function callGaqLastEnteredText(B) {
    var A = document.getElementById("divIdFoundOnPage");
    var C = document.getElementById("topnaviagetionSearchVal");
    if (C) {
        _gaq.push(["_trackEvent", "TextBeforeAutoSuggest=" + B, "UserTextValue", "SearchPage"])
    } else {
        if (A) {
            _gaq.push(["_trackEvent", "TextBeforeAutoSuggest=" + B, "UserTextValue", "DetailsPage"])
        } else {
            _gaq.push(["_trackEvent", "TextBeforeAutoSuggest=" + B, "UserTextValue", "HomePage"])
        }
    }
}

function calForGhostTextView(A) {
    if ($("div .selectedTextDiv" + A).length < 1) {
        $("#keyword, #refine_keyword, #keywordProj, #keywordAgent").css("width", "95%")
    }
}

function createCookieNotification(D, E, B) {
    var A = "";
    if (B) {
        var C = new Date();
        C.setTime(C.getTime() + (B * 60 * 60 * 1000));
        A = "; expires=" + C.toGMTString()
    }
    document.cookie = D + "=" + E + A + "; path=/"
}

function eraseCookie(A) {
    createCookie(A, "", -1)
}

function readCookie(B) {
    var A = document.cookie.split(";");
    var D = B + "=";
    for (var C = 0; C < A.length; C++) {
        var E = A[C];
        while (E.charAt(0) == " ") {
            E = E.substring(1, E.length)
        }
        if (E.indexOf(D) == 0) {
            retVal = E.substring(D.length, E.length);
            if (B == "userTypeflSlider" && retVal.indexOf(",") > 0) {
                return retVal.substring(0, retVal.indexOf(","))
            } else {
                if (B == "userEmailflSlider") {
                    return retVal.replace(/^"(.*)"$/, "$1")
                } else {
                    if (B == "userNameflSlider") {
                        return retVal.replace(/^"(.\*)"$/, "$1")
                    } else {
                        return retVal
                    }
                }
            }
        }
    }
    return null
}

function openNotification() {
    var A = "<iframe id='notficationID' src='https://notification.magicbricks.com/a.html?pagename=${allpagename}&category=" + category + "' height='0' frameborder='0' width='0' scrolling='no' rel = 'noindex, nofollow'></iframe>";
    document.getElementById("notification").innerHTML = A
}

function loadScript(A, D) {
    var B = document.getElementsByTagName("script")[0];
    var C = document.createElement("script");
    C.type = "text/javascript";
    C.async = D;
    C.src = A;
    B.parentNode.insertBefore(C, B)
}

function loadFooterTracking() {
    try {
        createAppDownloadGlobleNavigation("homePageAppDownload")
    } catch (A) {
        if (!(typeof window.errorHandler === "undefined")) {
            errorHandler("FooterNew.jsp", "loadFooterTracking", A)
        }
    }
}
$(document).ready(function(A) {
    loadViewDetails()
});

function loadViewDetails() {
    $(".view-details-link").text(" View Details")
}

function loadSaleTagData(B, C) {
    var A = "";
    if (B == "10197") {
        A = '<div class="prpType titanium">LUXURY</div>'
    } else {
        if (B == "10070" || B == "10179" || B == "10185" || B == "10191") {
            A = '<div class="prpType titanium">TITANIUM</div>'
        } else {
            if (B == "10071" || B == "10180" || B == "10186" || B == "10192") {
                A = '<div class="prpType titanium">PLATINUM</div>'
            } else {
                if (B == "10072" || B == "10181" || B == "10187" || B == "10193") {
                    A = '<div class="prpType titanium">DIAMOND</div>'
                }
            }
        }
    }
    $("#listBlock" + C).html(A)
}

function loadDescription() {
    $(".showMoreLazyLoad").text(" read more");
    $(".hideMoreLazyLoad").text(" read less")
}

function loadRentTagData(C, B, D) {
    var A = "";
    if (C != null && C != "" && C == "Y") {
        A = '<span class="forUrgentSale">For Urgent Rent</span>'
    } else {
        if (C == null || C == "") {
            if (B == "10197") {
                A = '<span class="textLuxury">LUXURY</span>'
            } else {
                if (B == "10070" || B == "10179" || B == "10185" || B == "10191") {
                    A = '<span class="textTitanium">TITANIUM</span>'
                } else {
                    if (B == "10071" || B == "10180" || B == "10186" || B == "10192") {
                        A = '<span class="textTitanium">PLATINUM</span>'
                    } else {
                        if (B == "10072" || B == "10181" || B == "10187" || B == "10193") {
                            A = '<span class="textTitanium">DIAMOND</span>'
                        } else {
                            if (B == "13584") {
                                A = '<div class="veriOnSiteBox">Featured</div>'
                            }
                        }
                    }
                }
            }
        }
    }
    $("#listRentBlock" + D).html(A)
}

function loadPropworth(e, b, o, S, U, A, h, J, Q, K, k, p, D, T, C, E, W, R, I, F, H, P, n, g, Y, f, m, j, l, O, L, M, q, X, B, N, G, a, V) {
    var Z = "";
    Z += '<div class="selectionPatch"></div>';
    Z += '<div class="srpdetailWrap" id="srpdetailWrap' + e + '" onclick="stopPage=true;">';
    Z += '<div class="srpdetail_bgTrans"></div>';
    Z += '<span class="srpdetailArrow"></span>';
    Z += '<span class="srpdetail_close stop-propagation" onclick="closePriceBreakUpData(event);"></span>';
    if (o == "1" && S == "N") {
        Z += '<div class="bg_greyMid">';
        Z += '<div class="tr bold active">';
        Z += '<div class="td">Basic Price</div>';
        Z += '<div class="td">&#8377; ' + U + "</div>";
        Z += '</div><div class="tr active"><div class="td colspan2">Prices as per the details provided by advertiser</div></div></div>'
    } else {
        if (U != null && U != "") {
            Z += '<div class="tr bold"><div class="td">Basic Price</div><div class="td">&#8377; ' + U + "</div></div>"
        }
    }
    if (A != null && A != "") {
        Z += '<div class="total"><div class="tr bold active"><div class="td">Rent</div><div class="td">&#8377; ' + A + "</div></div></div>"
    }
    if (h != null && h != "") {
        Z += '<div class="tr bold grey"><div class="td">Monthly Maintenance</div><div class="td">&#8377; ' + h + "</div></div>"
    }
    if (J != null && J != "") {
        Z += '<div class="bg_greyMid"><div class="tr bold"><div class="td">Monthly Charges';
        if (Q == "Y") {
            Z += "*"
        }
        Z += '</div><div class="td">&#8377; ' + J + "</div></div></div>"
    }
    if (K != null && K != "") {
        Z += '<div class="bg_greyMid"><div class="tr bold active"><div class="td">Monthly Rent';
        if (Q == "Y") {
            Z += "*"
        }
        Z += '</div><div class="td">&#8377; ' + K + "</div></div></div>"
    }
    if (k != null && k != "") {
        Z += '<div class="bg_greyMid"><div class="tr bold active"><div class="td">Total Price*</div><div class="td">&#8377; ' + k + "</div></div>";
        if (p != null && p != "") {
            Z += '<div class="tr active"><div class="td colspan2">' + p + "</div></div>"
        }
        Z += "</div>"
    }
    if (D != null && D != "") {
        Z += '<div class="bg_greyMid"><div class="tr bold active"><div class="td">Resale Price*</div><div class="td">&#8377; ' + D + "</div></div>";
        if (p != null && p != "") {
            Z += '<div class="tr active"><div class="td colspan2">' + p + "</div></div>"
        }
        Z += "</div>"
    }
    Z += '<div class="payPlanScroll"><div class="nano" id="priceBreakupScroller' + e + '"><div class="content scrollContent">';
    if (T != null && T != "") {
        Z += '<div class="tr"><div class="td">Floor PLC</div><div class="td">&#8377; ' + T + "</div></div>"
    }
    if (C != null && C != "") {
        Z += '<div class="tr"><div class="td">Facing PLC</div><div class="td">&#8377; ' + C + "</div></div>"
    }
    if (E != null && E != "") {
        Z += '<div class="tr"><div class="td">Open Car Parking';
        if (W != null && W != "") {
            Z += "(" + W + ")"
        }
        Z += "</div>";
        if (E != "-1") {
            Z += '<div class="td">&#8377; ' + E + "</div>"
        } else {
            Z += '<div class="td"> Free</div>'
        }
        Z += "</div>"
    }
    if (R != null && R == "") {
        Z += '<div class="tr"><div class="td">Covered Car Parking';
        if (I != null && I != "") {
            Z += "(" + I + ")"
        }
        Z += "</div>";
        if (R != "-1") {
            Z += '<div class="td">&#8377; ' + R + "</div>"
        } else {
            Z += '<div class="td"> Free</div>'
        }
        Z += "</div>"
    }
    if (F != null && F != "") {
        Z += '<div class="tr"><div class="td">Club Membership</div><div class="td">';
        if (F != "-1") {
            Z += "&#8377; " + F
        } else {
            Z += "Free "
        }
        Z += "</div></div>"
    }
    if (H != null && H != "") {
        Z += '<div class="tr"><div class="td">Power Backup';
        if (P != null && P != "") {
            Z += "(" + P + ")"
        }
        Z += "</div>";
        if (H != "-1") {
            Z += '<div class="td">&#8377; ' + H + "</div>"
        } else {
            Z += '<div class="td"> Free</div>'
        }
        Z += "</div>"
    }
    if (n != null && n != "") {
        Z += '<div class="tr"><div class="td">Electricity/Water Charges</div>';
        if (n != "-1") {
            Z += '<div class="td">&#8377; ' + n + "</div>"
        } else {
            Z += '<div class="td"> Free</div>'
        }
        Z += "</div>"
    }
    if (g != null && g != "") {
        Z += '<div class="tr"><div class="td">Lease Rent</div><div class="td">&#8377; ' + g + "</div></div>"
    }
    if (Y != null && Y != "") {
        Z += '<div class="tr"><div class="td">IFMS</div><div class="td">&#8377; ' + Y + "</div></div>"
    }
    if (f != null && f != "") {
        Z += '<div class="tr"><div class="td">EEC/EFC</div><div class="td">&#8377; ' + f + "</div></div>"
    }
    if (m != null && m != "") {
        Z += '<div class="tr"><div class="td">Other Charges</div><div class="td">&#8377; ' + m + "</div></div>"
    }
    Z += "</div></div></div>";
    if (O != null && O != "" && l != null && l != "") {
        Z += '<div class="tr bold active"><div class="td">Listed Price*</div><div class="td">&#8377; ' + O + "</div></div>"
    }
    Z += '<div class="applicableCharges">';
    if (L != null && L != "") {
        Z += '<div class="tr"><div class="td">Security Deposit</div><div class="td">&#8377; ' + L + "</div></div>"
    }
    if (M != null && M != "") {
        Z += '<div class="tr"><div class="td">One Time Maintenance</div><div class="td">&#8377; ' + M + "</div></div>"
    }
    if (q != null && q != "") {
        Z += '<div class="tr"><div class="td">Brokerage';
        if (X != null && X != "") {
            Z += "(" + X + ")"
        }
        Z += '</div><div class="td">' + q + "</div></div>"
    }
    if (B != null && B != "") {
        Z += '<div class="tr"><div class="td">Service Tax</div><div class="td">&#8377; ' + B + "</div></div>"
    }
    if (N != null && N != "") {
        Z += '<div class="tr">';
        if (G != null && G != "" && G != "Y") {
            Z += '<div class="td">Approx. Registration Charges</div>'
        } else {
            Z += '<div class="td">Stamp Duty, Registration Charges</div>'
        }
        Z += '<div class="td">&#8377; ' + N + "</div></div>"
    }
    Z += "</div>";
    if (a != null && a != "") {
        Z += '<div class="bdrTop_Btm bg_greyLgt firstMontPay"><div class="tr bold active"><div class="td">First Month Payment</div><div class="td">&#8377; ' + a + "</div></div></div>"
    }
    if (V != null && V != "") {
        Z += '<div class="bdrTop_Btm bg_greyLgt allInclusive"><div class="tr bold active"><div class="td">All Inclusive Price';
        if (l != null && l != "") {
            Z += "*"
        }
        Z += '</div><div class="td">&#8377; ' + V + "</div></div>";
        if (G != null && G != "" && G == "Y") {
            Z += '<div class="tr active"><div class="td colspan2">For calculations of Stamp Duty &amp; Registration Charges <a class="stop-propagation" href="javascript:void(0);" onClick="calculationPopup(' + e + ')">Click here</a></div></div>'
        }
        Z += "</div>"
    }
    if (O != null && O != "" && k != null && k != "" && D != null && D != "" && l != null && l != "") {
        Z += '<div class="tr chargesNote"><p><em>*</em>Charges as per details provided by the advertiser</p></div>'
    }
    if (l != null && l != "") {
        Z += '<div class="tr chargesNote"><p><em>*</em>The price includes Service tax & Registration charges, as per details provided by the advertiser</p></div>'
    }
    if (Q != null && Q != "" && Q == "Y") {
        Z += '<div class="tr chargesNote"><p><em>*</em>Electricity and water charges excluded</p></div>'
    }
    Z += "</div>";
    if (b != null && b != "") {
        var d = b;
        var c = d.replace(".0 ", "");
        Z += '<div id="PWwebPDPhoverstatelink1' + e + '" class="linkPropWorthWrap"><input type="hidden" id="hwpid' + e + '" value="' + j + '" />';
        Z += '<input type="hidden" id="hwprice' + e + '" value="" /><div class="hwdetailWrap"><div class="hwPriceHead">Magicbricks\' <span class="semiBold">Estimated</span> Rent';
        Z += '<div class="propWorthPrice semiBold"><span class="rupee">&#8377;</span>' + c + '</div><div class="plcLabel">Excludes all other charges</div></div>';
        Z += '<div class="hwInnerContent">';
        Z += '<div class="propWorthBottomLeft">Average value based on furnishing, interiors, maintenance of the property etc.</div><div class="propWorthPowered">';
        Z += '<div class="poweredLabel">Powered by:</div><div class="propworthLogo">PropWorth</div></div></div></div></div>'
    }
    $("#allPricePropWorth" + e).html(Z)
}

function loadRentQuickFacts(L, Q, M, F, T, P, H, R, G, B, A, E, O, I, D, U, K, N, C, S) {
    html = '<div class="quickFactsBlock" onclick="stopPage=true;">';
    html += '<div class="quickLinks" onclick="showQuickFacts(this);">';
    html += "<a class=\"stop-propagation\" href=\"javascript:void(0);\" onclick=\"gaQuickLink('SRP','Clicked Quick facts','" + Q + "-" + M + "');\">" + F + " Quick Fact";
    if (F > 1) {
        html += "s</a>"
    }
    var J = F;
    html += '<div class="quickLinkCont">';
    html += '<div class="iconClosePop stop-propagation"></div>';
    html += '<div class="quickLinkBlock">';
    if (Q == "Sale") {
        if (T != null && T != "" && J > 0) {
            J = J - 1;
            html += "<div class=\"quickLi stop-propagation\" onclick=\"gaQuickLink('SRP','Clicked Quick facts item','" + P + "-Price in 6 months');\">";
            html += '<div class="iconBlock ico3"></div>';
            html += '<div class="iconBlockInfo"><div class="fstHead">Expected price in 6 months</div><div class="secValue"><span><span class="rssIcon"></span>';
            html += T.replace(".0 ", "") + "</span></div>";
            if (H != null && H != "") {
                html += "<span>" + H.replace(".0 ", "") + "</span>"
            }
            html += (R) ? '<div class="secLink"><a href="#">More trends</a></div>' : "";
            html += '</div><div class="clearfix"></div></div>'
        }
        if (G != null && G != "" && J > 0) {
            J = J - 1;
            html += "<div class=\"quickLi stop-propagation\" onclick=\"gaQuickLink('SRP','Clicked Quick facts item','" + P + "-Demand for project');\">";
            html += '<div class="iconBlock ico8"></div>';
            html += '<div class="iconBlockInfo"><div class="fstHead">Demand for this project</div>';
            html += '<div class="secValue"><span>' + G.replace(".0 ", "") + "</span></div>";
            html += (R) ? '<div class="secLink">&nbsp;</div>' : "";
            html += '</div><div class="clearfix"></div></div>'
        }
        if (B != null && B != "" && J > 0) {
            J = J - 1;
            html += "<div class=\"quickLi stop-propagation\" onclick=\"gaQuickLink('SRP','Clicked Quick facts item','" + P + "-Possession year');\">";
            html += '<div class="iconBlock ico9"></div><div class="iconBlockInfo"><div class="fstHead">POSSESSION YEAR</div>';
            html += '<div class="secValue"><span>' + B + "</span></div>";
            html += (R) ? '<div class="secLink"><a href="#">More project info</a></div>' : "";
            html += '</div><div class="clearfix"></div></div>'
        }
        if (A != null && A != "" && J > 0) {
            J = J - 1;
            html += "<div class=\"quickLi stop-propagation\" onclick=\"gaQuickLink('SRP','Clicked Quick facts item','" + P + "-Psm rank in locality');\">";
            html += '<div class="iconBlock ico2"></div><div class="iconBlockInfo"><div class="fstHead">Project rank</div>';
            html += '<div class="secValue"><span>' + A + "</span></div>";
            html += (R) ? '<div class="secLink"><a href="#">More locality info</a></div>' : "";
            html += '</div><div class="clearfix"></div></div>'
        }
        if (E != null && E != "" && J > 0) {
            J = J - 1;
            html += "<div class=\"quickLi stop-propagation\" onclick=\"gaQuickLink('SRP','Clicked Quick facts item','" + P + "-Bank Providing loans');\">";
            html += '<div class="iconBlock ico10"></div><div class="iconBlockInfo"><div class="fstHead">Home loans</div>';
            html += '<div class="secValue"><span>' + E + "</span></div>";
            html += (R) ? '<div class="secLink"><a href="#">More project info</a></div>' : "";
            html += '</div><div class="clearfix"></div></div>'
        }
        if (O != null && O != "" && J > 0) {
            J = J - 1;
            html += "<div class=\"quickLi stop-propagation\" onclick=\"gaQuickLink('SRP','Clicked Quick facts item','" + P + "-Rent to expect');\">";
            html += '<div class="iconBlock ico5"></div><div class="iconBlockInfo"><div class="fstHead">Expected rent</div>';
            html += '<div class="secValue"><span><span class="rssIcon"></span>' + O.replace(".0 ", "") + "</span></div>";
            if (I != null && I != "") {
                html += "<span> " + I.replace(".0 ", "") + "</span>"
            }
            html += (R) ? '<div class="secLink">&nbsp;</div>' : "";
            html += '</div><div class="clearfix"></div></div>'
        }
        if (D != null && D != "" && J > 0) {
            J = J - 1;
            html += "<div class=\"quickLi stop-propagation\" onclick=\"gaQuickLink('SRP','Clicked Quick facts item','" + P + "-NearByFacility');\">";
            html += '<div class="iconBlock ico11"></div><div class="iconBlockInfo"><div class="fstHead">FACILITIES WITHIN 1 KM</div>';
            html += '<div class="secValue"><span>' + D + "</span></div>";
            html += '</div><div class="clearfix"></div></div>'
        }
        if (U != null && U != "" && J > 0) {
            J = J - 1;
            html += "<div class=\"quickLi stop-propagation\" onclick=\"gaQuickLink('SRP','Clicked Quick facts item','" + P + "-Price comparison');\">";
            html += '<div class="iconBlock ico7"></div><div class="iconBlockInfo"><div class="fstHead">Price comparison</div>';
            html += '<div class="secValue"><span>' + U.replace(".0 ", "") + "</span></div>";
            html += (R) ? '<div class="secLink"><a href="#">More project info</a></div>' : "";
            html += '</div><div class="clearfix"></div></div>'
        }
        if (K != null && K != "" && J > 0) {
            J = J - 1;
            html += "<div class=\"quickLi stop-propagation\" onclick=\"gaQuickLink('SRP','Clicked Quick facts item','" + P + "-Premium amenities');\">";
            html += '<div class="iconBlock ico12"></div><div class="iconBlockInfo"><div class="fstHead">PREMIUM AMENITIES</div>';
            html += '<div class="secValue"><span>' + K.replace(",", ", ") + "</span></div>";
            html += (R) ? '<div class="secLink"><a href="#">More project info</a></div>' : "";
            html += '</div><div class="clearfix"></div></div>'
        }
        if (N != null && N != "" && J > 0) {
            J = J - 1;
            html += "<div class=\"quickLi stop-propagation\" onclick=\"gaQuickLink('SRP','Clicked Quick facts item','" + P + "-EMI');\">";
            html += '<div class="iconBlock ico4"></div><div class="iconBlockInfo"><div class="fstHead">Monthly emi</div>';
            html += '<div class="secValue"><span><span class="rssIcon"></span>' + N.replace(".0", "") + "</span></div>";
            html += '<div class="secLink"><span class="rssIconSml"></span>';
            html += (C != null && C != "") ? C.replace(".0", "") + "</div>" : "";
            html += '</div><div class="clearfix"></div></div>'
        }
    }
    if (Q == "Rent") {
        if (S != null && S != "" && J > 0) {
            J = J - 1;
            html += "<div class=\"quickLi stop-propagation\" onclick=\"gaQuickLink('SRP','Clicked Quick facts item','" + P + "-PriceComparison');\">";
            html += '<div class="iconBlock ico6"></div><div class="iconBlockInfo"><div class="fstHead">RENT COMPARISON</div>';
            html += '<div class="secValue"><span>' + S.replace(".0", "") + "</span></div>";
            html += '</div><div class="clearfix"></div></div>'
        }
        if (D != null && D != "" && J > 0) {
            J = J - 1;
            html += "<div class=\"quickLi stop-propagation\" onclick=\"gaQuickLink('SRP','Clicked Quick facts item','" + P + "-NearByFacility');\">";
            html += '<div class="iconBlock ico11"></div><div class="iconBlockInfo"><div class="fstHead">FACILITIES WITHIN 1 KM</div>';
            html += '<div class="secValue"><span>' + D.replace(",", "<br/>") + "</span></div>";
            html += '</div><div class="clearfix"></div></div>'
        }
        if (K != null && K != "" && J > 0) {
            J = J - 1;
            html += "<div class=\"quickLi stop-propagation\" onclick=\"gaQuickLink('SRP','Clicked Quick facts item','" + P + "-Premium amenities');\">";
            html += '<div class="iconBlock ico12"></div><div class="iconBlockInfo"><div class="fstHead">PREMIUM AMENITIES</div>';
            html += '<div class="secValue"><span>' + K.replace(",", ", ") + "</span></div>";
            html += (R) ? '<div class="secLink"><a href="#">More project info</a></div>' : "";
            html += '</div><div class="clearfix"></div></div>'
        }
        if (A != null && A != "" && J > 0) {
            J = J - 1;
            html += "<div class=\"quickLi stop-propagation\" onclick=\"gaQuickLink('SRP','Clicked Quick facts item','" + P + "-Psm rank in locality');\">";
            html += '<div class="iconBlock ico2"></div><div class="iconBlockInfo"><div class="fstHead">Project rank</div>';
            html += '<div class="secValue"><span>' + A + "</span></div>";
            html += (R) ? '<div class="secLink"><a href="#">More locality info</a></div>' : "";
            html += '</div><div class="clearfix"></div></div>'
        }
    }
    html += '<div class="poweredByBg">Powered by <span>Magicbricks Research</span></div>';
    html += "</div></div></div></div>";
    $("#quickFactdata" + L).html(html)
};