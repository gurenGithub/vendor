(function() {
    (function(root, factory) {
        if (typeof define === 'function' && define.amd) {
            return define(function() {
                return factory();
            });
        } else if (typeof exports === 'object') {
            return module.exports = factory();
        } else {
            return root.ifvisible = factory();
        }
    })(this, function() {
        var addEvent, customEvent, doc, fireEvent, hidden, idleStartedTime, idleTime, ie, ifvisible, init, initialized, status, trackIdleStatus, visibilityChange;
        ifvisible = {};
        doc = document;
        initialized = false;
        status = "active";
        idleTime = 60000;
        idleStartedTime = false;
        customEvent = (function() {
            var S4, addCustomEvent, cgid, fireCustomEvent, guid, listeners, removeCustomEvent;
            S4 = function() {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            };
            guid = function() {
                return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
            };
            listeners = {};
            cgid = '__ceGUID';
            addCustomEvent = function(obj, event, callback) {
                obj[cgid] = undefined;
                if (!obj[cgid]) {
                    obj[cgid] = "ifvisible.object.event.identifier";
                }
                if (!listeners[obj[cgid]]) {
                    listeners[obj[cgid]] = {};
                }
                if (!listeners[obj[cgid]][event]) {
                    listeners[obj[cgid]][event] = [];
                }
                return listeners[obj[cgid]][event].push(callback);
            };
            fireCustomEvent = function(obj, event, memo) {
                var ev, j, len, ref, results;
                if (obj[cgid] && listeners[obj[cgid]] && listeners[obj[cgid]][event]) {
                    ref = listeners[obj[cgid]][event];
                    results = [];
                    for (j = 0, len = ref.length; j < len; j++) {
                        ev = ref[j];
                        results.push(ev(memo || {}));
                    }
                    return results;
                }
            };
            removeCustomEvent = function(obj, event, callback) {
                var cl, i, j, len, ref;
                if (callback) {
                    if (obj[cgid] && listeners[obj[cgid]] && listeners[obj[cgid]][event]) {
                        ref = listeners[obj[cgid]][event];
                        for (i = j = 0, len = ref.length; j < len; i = ++j) {
                            cl = ref[i];
                            if (cl === callback) {
                                listeners[obj[cgid]][event].splice(i, 1);
                                return cl;
                            }
                        }
                    }
                } else {
                    if (obj[cgid] && listeners[obj[cgid]] && listeners[obj[cgid]][event]) {
                        return delete listeners[obj[cgid]][event];
                    }
                }
            };
            return {
                add: addCustomEvent,
                remove: removeCustomEvent,
                fire: fireCustomEvent
            };
        })();
        addEvent = (function() {
            var setListener;
            setListener = false;
            return function(el, ev, fn) {
                if (!setListener) {
                    if (el.addEventListener) {
                        setListener = function(el, ev, fn) {
                            return el.addEventListener(ev, fn, false);
                        };
                    } else if (el.attachEvent) {
                        setListener = function(el, ev, fn) {
                            return el.attachEvent('on' + ev, fn, false);
                        };
                    } else {
                        setListener = function(el, ev, fn) {
                            return el['on' + ev] = fn;
                        };
                    }
                }
                return setListener(el, ev, fn);
            };
        })();
        fireEvent = function(element, event) {
            var evt;
            if (doc.createEventObject) {
                return element.fireEvent('on' + event, evt);
            } else {
                evt = doc.createEvent('HTMLEvents');
                evt.initEvent(event, true, true);
                return !element.dispatchEvent(evt);
            }
        };
        ie = (function() {
            var all, check, div, undef, v;
            undef = void 0;
            v = 3;
            div = doc.createElement("div");
            all = div.getElementsByTagName("i");
            check = function() {
                return (div.innerHTML = "<!--[if gt IE " + (++v) + "]><i></i><![endif]-->", all[0]);
            };
            while (check()) {
                continue;
            }
            if (v > 4) {
                return v;
            } else {
                return undef;
            }
        })();
        hidden = false;
        visibilityChange = void 0;
        if (typeof doc.hidden !== "undefined") {
            hidden = "hidden";
            visibilityChange = "visibilitychange";
        } else if (typeof doc.mozHidden !== "undefined") {
            hidden = "mozHidden";
            visibilityChange = "mozvisibilitychange";
        } else if (typeof doc.msHidden !== "undefined") {
            hidden = "msHidden";
            visibilityChange = "msvisibilitychange";
        } else if (typeof doc.webkitHidden !== "undefined") {
            hidden = "webkitHidden";
            visibilityChange = "webkitvisibilitychange";
        }
        trackIdleStatus = function() {
            var timer, wakeUp;
            timer = false;
            wakeUp = function() {
                clearTimeout(timer);
                if (status !== "active") {
                    ifvisible.wakeup();
                }
                idleStartedTime = +(new Date());
                return timer = setTimeout(function() {
                    if (status === "active") {
                        return ifvisible.idle();
                    }
                }, idleTime);
            };
            wakeUp();
            addEvent(doc, "mousemove", wakeUp);
            addEvent(doc, "keyup", wakeUp);
            addEvent(window, "scroll", wakeUp);
            ifvisible.focus(wakeUp);
            return ifvisible.wakeup(wakeUp);
        };
        init = function() {
            var blur;
            if (initialized) {
                return true;
            }
            if (hidden === false) {
                blur = "blur";
                if (ie < 9) {
                    blur = "focusout";
                }
                addEvent(window, blur, function() {
                    return ifvisible.blur();
                });
                addEvent(window, "focus", function() {
                    return ifvisible.focus();
                });
            } else {
                addEvent(doc, visibilityChange, function() {
                    if (doc[hidden]) {
                        return ifvisible.blur();
                    } else {
                        return ifvisible.focus();
                    }
                }, false);
            }
            initialized = true;
            return trackIdleStatus();
        };
        ifvisible = {
            setIdleDuration: function(seconds) {
                return idleTime = seconds * 1000;
            },
            getIdleDuration: function() {
                return idleTime;
            },
            getIdleInfo: function() {
                var now, res;
                now = +(new Date());
                res = {};
                if (status === "idle") {
                    res.isIdle = true;
                    res.idleFor = now - idleStartedTime;
                    res.timeLeft = 0;
                    res.timeLeftPer = 100;
                } else {
                    res.isIdle = false;
                    res.idleFor = now - idleStartedTime;
                    res.timeLeft = (idleStartedTime + idleTime) - now;
                    res.timeLeftPer = (100 - (res.timeLeft * 100 / idleTime)).toFixed(2);
                }
                return res;
            },
            focus: function(callback) {
                if (typeof callback === "function") {
                    return this.on("focus", callback);
                }
                status = "active";
                customEvent.fire(this, "focus");
                customEvent.fire(this, "wakeup");
                return customEvent.fire(this, "statusChanged", {
                    status: status
                });
            },
            blur: function(callback) {
                if (typeof callback === "function") {
                    return this.on("blur", callback);
                }
                status = "hidden";
                customEvent.fire(this, "blur");
                customEvent.fire(this, "idle");
                return customEvent.fire(this, "statusChanged", {
                    status: status
                });
            },
            idle: function(callback) {
                if (typeof callback === "function") {
                    return this.on("idle", callback);
                }
                status = "idle";
                customEvent.fire(this, "idle");
                return customEvent.fire(this, "statusChanged", {
                    status: status
                });
            },
            wakeup: function(callback) {
                if (typeof callback === "function") {
                    return this.on("wakeup", callback);
                }
                status = "active";
                customEvent.fire(this, "wakeup");
                return customEvent.fire(this, "statusChanged", {
                    status: status
                });
            },
            on: function(name, callback) {
                init();
                return customEvent.add(this, name, callback);
            },
            off: function(name, callback) {
                init();
                return customEvent.remove(this, name, callback);
            },
            onEvery: function(seconds, callback) {
                var paused, t;
                init();
                paused = false;
                if (callback) {
                    t = setInterval(function() {
                        if (status === "active" && paused === false) {
                            return callback();
                        }
                    }, seconds * 1000);
                }
                return {
                    stop: function() {
                        return clearInterval(t);
                    },
                    pause: function() {
                        return paused = true;
                    },
                    resume: function() {
                        return paused = false;
                    },
                    code: t,
                    callback: callback
                };
            },
            now: function(check) {
                init();
                return status === (check || "active");
            }
        };
        return ifvisible;
    });

}).call(this);


/*Copyright (c) 2015 Jason Zissman
Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/* 
	Notice!  This project requires ifvisible.js to run.  You can get a copy from
	the ifinvisible.js github (https://github.com/serkanyersen/ifvisible.js) or 
	by running "bower install timeme.js", which will install both TimeMe.js and ifvisible.js.
*/

(function(ifvisible) {

	TimeMe = {
		startStopTimes: {},
		
		idleTimeout: 60,
		
		currentPageName: "default-page-name",
		
		getIfVisibleHandle: function(){
			if (typeof ifvisible === 'object') {
				return ifvisible;
			} else {
				if (typeof console !== "undefined") {
					console.log("Required dependency (ifvisible.js) not found.  Make sure it has been included.");
				}
				throw {
					name: "MissingDependencyException",
					message: "Required dependency (ifvisible.js) not found.  Make sure it has been included."
				};			
			}
		},
		
		startTimer: function() {
			var pageName = TimeMe.currentPageName;
			if (TimeMe.startStopTimes[pageName] === undefined){
				TimeMe.startStopTimes[pageName] = [];
			} else {
				var arrayOfTimes = TimeMe.startStopTimes[pageName];
				var latestStartStopEntry = arrayOfTimes[arrayOfTimes.length -1];
				if (latestStartStopEntry !== undefined && latestStartStopEntry.stopTime === undefined) {
					// Can't start new timer until previous finishes.
					return;
				}
			}
			TimeMe.startStopTimes[pageName].push({
				"startTime": new Date(),
				"stopTime": undefined
			});
		},
		
		stopTimer: function() {
			var pageName = TimeMe.currentPageName;
			var arrayOfTimes = TimeMe.startStopTimes[pageName];
			if (arrayOfTimes === undefined || arrayOfTimes.length === 0){
				// Can't stop timer before you've started it.
				return;
			}
			if (arrayOfTimes[arrayOfTimes.length -1].stopTime === undefined) {
				arrayOfTimes[arrayOfTimes.length -1].stopTime = new Date();				
			}
		},
		
		getTimeOnCurrentPageInSeconds : function() {
			return TimeMe.getTimeOnPageInSeconds(TimeMe.currentPageName);
		},
		
		getTimeOnPageInSeconds: function(pageName) {

			var totalTimeOnPage = 0;

			var arrayOfTimes = TimeMe.startStopTimes[pageName];
			if (arrayOfTimes === undefined){
				// Can't get time on page before you've started the timer.
				return;
			}
			
			var timeSpentOnPageInSeconds = 0;
			for(var i=0; i < arrayOfTimes.length; i++) {
				var startTime = arrayOfTimes[i].startTime;
				var stopTime = arrayOfTimes[i].stopTime;
				if (stopTime === undefined){
					stopTime = new Date();
				}
				var difference = stopTime - startTime;
				timeSpentOnPageInSeconds += (difference / 1000);
			}

			totalTimeOnPage = Number(timeSpentOnPageInSeconds);
			return totalTimeOnPage;
		},
		
		getTimeOnAllPagesInSeconds: function() {
			var allTimes = [];
			var pageNames = Object.keys(TimeMe.startStopTimes);
			for (var i=0; i < pageNames.length; i++){
				var pageName = pageNames[i];
				var timeOnPage = TimeMe.getTimeOnPageInSeconds(pageName);
				allTimes.push({
					"pageName": pageName, 
					"timeOnPage": timeOnPage
				});
			}
			return allTimes;
		},
		
		setIdleDurationInSeconds: function(duration) {
			var durationFloat = parseFloat(duration);
			if (isNaN(durationFloat) === false){
				TimeMe.getIfVisibleHandle().setIdleDuration(durationFloat);
				TimeMe.idleTimeout = durationFloat;
			} else {
				throw {
					name: "InvalidDurationException",
					message: "An invalid duration time (" + duration + ") was provided."
				};
			}
		},
		
		setCurrentPageName: function(pageName) {
			TimeMe.currentPageName = pageName;
		},
				
		resetRecordedPageTime: function(pageName) {
			delete TimeMe.startStopTimes[pageName];
		},
		
		resetAllRecordedPageTimes: function() {
			var pageNames = Object.keys(TimeMe.startStopTimes);
			for (var i=0; i < pageNames.length; i++){
				TimeMe.resetRecordedPageTime(pageNames[i]);
			}
		},
		
		listenForVisibilityEvents: function(){
			TimeMe.getIfVisibleHandle().on("blur", function(){
				TimeMe.stopTimer();
			});

			TimeMe.getIfVisibleHandle().on("focus", function(){
				TimeMe.startTimer();
			});

			TimeMe.getIfVisibleHandle().on("idle", function(){		
				if (TimeMe.idleTimeout > 0){
					TimeMe.stopTimer();
				}
			});

			TimeMe.getIfVisibleHandle().on("wakeup", function(){		
				if (TimeMe.idleTimeout > 0){
					TimeMe.startTimer();
				}
			});							
		},
		
		initialize: function (){
			TimeMe.listenForVisibilityEvents();
			TimeMe.startTimer();
		}
	};
		
	if (typeof define === "function" && define.amd) {
		define(function() {
			return TimeMe;
		});
	} else {
		window.TimeMe = TimeMe;
	}
})(this.ifvisible);
