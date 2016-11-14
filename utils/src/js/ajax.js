
if (typeof window.xUtils == 'undefined') {
    window.xUtils = {};
}
window.xUtils.ajax = (function () {
    var members = {
        get: function (url, data, onsuccess, onerror, onbefore, onCustomeOpts) {
            var opts = {
                url: url,
                type: 'get',
                data: data,
                dataType: 'json',
                timeout: 20e3,
                success: function (data) {

                    if (onsuccess) {
                        onsuccess(data);
                    }
                },
                error: function (e) {
                    if (onerror) {
                        onerror(e);
                    } else {
                        alert(e);
                    }
                },
                before: function () {
                    if (onbefore) {
                        onbefore(e);
                    }
                }
            };
            if (onCustomeOpts) {
                onCustomeOpts(opts);
            }
            $.ajax(opts);
        },
        getList: function (url, data, onsuccess, onFail, onerror, onbefore, onCustomeOpts) {


        },
        /*
         带有成功提示
        */
        postV3: function (url, data, onAlertClosed, onFail, onerror, onbefore, onCustomeOpts) {
            this.postV2(url, data, function (data) {
                var message = data.Message || data.message || data.Msg || data.msg;
                H.alert({
                    content: message, onClose: function () {

                        onAlertClosed && onAlertClosed(data);
                    }
                });
            }, onFail, onerror, onbefore, onCustomeOpts)
        },
        postV2: function (url, data, onsuccess, onFail, onerror, onbefore, onCustomeOpts) {
            this.post(url, data, function (data) {
                var message = data.Message || data.message || data.Msg || data.msg;
                if (data.Result == true || data.result == true) {
                    if (onsuccess) {
                        onsuccess(data);
                        return;
                    }
                    H.alert({ content: message });
                } else {

                    if (onFail) {
                        onFail(data);
                        return;
                    }
                    var alertOpts = {
                        content: message, onClose: function () {
                            if (message == "登录已超时，请重新登录") {
                                window.location.href = "/Account/LogOn?returnUrl=" + window.location.href;
                            }
                        }
                    }
                    H.alert(alertOpts);
                }
            }, onerror, onbefore, onCustomeOpts);
        },
        postV1: function (url, data, onsuccess, onFail, onerror, onbefore, onCustomeOpts) {

            this.post(url, data, function (data) {
                var message = data.Message || data.message || data.Msg || data.msg;

                if (data.Result == true || data.result == true) {
                    var _data = data.Data || data.data;
                    onsuccess(_data, message);
                } else {

                    if (onFail) {
                        onFail(data);
                        return;
                    }
                    var alertOpts = {
                        content: message, onClose: function () {
                            if (message == "登录已超时，请重新登录") {
                                window.location.href = "/Account/LogOn?returnUrl=" + window.location.href;
                            }
                        }
                    }
                    H.alert(alertOpts);
                }
            }, onerror, onbefore, onCustomeOpts);
        },
        post: function (url, data, onsuccess, onerror, onbefore, onCustomeOpts) {
            var opts = {
                url: url,
                type: 'post',
                data: data,
                dataType: 'json',
                timeout: 20e3,
                success: function (data) {

                    if (onsuccess) {
                        onsuccess(data);
                    }
                },
                error: function (e) {
                    if (onerror) {
                        onerror(e);
                    } else {
                        alert(e);
                    }
                },
                before: function () {
                    if (onbefore) {
                        onbefore(e);
                    }
                }
            };
            if (onCustomeOpts) {
                onCustomeOpts(opts);
            }
            $.ajax(opts);
        }
    };
    return members;
})();
