if (typeof window.xUtils == 'undefined') {
    window.xUtils = {};
}

window.xUtils.dialog = (function () {

    var members = {
        alert: function (title, onClose) {

            var opts = {
                content: title,
                onClose: onClose
            };
            H.alert(opts);
        },
        confirm: function (content, onSure, onCancel)
        {
            var d = H.confirm(title, onSure,onCancel);
            d.show();
        }
       
    };
    return members;

})();


window.xUtils.tips = (function () {


    var members = {
        show: function ($ele, content, trigger, position, theme) {
            $ele.tooltipster({
                position: position || 'top-right',
                theme: theme || 'tooltipster-light',
                maxWidth: 300,
                content: content,
                trigger: trigger || 'hover',
                interactive: true
            });

        },
        dropdown: function ($activeEle, $showEle, offsetX) {
            $activeEle.tooltipster({
                theme: 'tooltipster-light',
                position: 'bottom-right',
                offsetX: offsetX || (-30),
                content: $showEle.clone().show(),
                trigger: 'hover',
                interactive: true
            });

        }
    };
    return members;
})();