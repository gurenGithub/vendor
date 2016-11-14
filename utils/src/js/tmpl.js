if (typeof window.xUtils == 'undefined') {
    window.xUtils = {};
}
window.xUtils.tmpl = (function () {


    var members = {

        render: function (tmplId, selector, data)
        {
            if (typeof template === 'undefined') {
                alert('缺少核心组件ArtTemplate.js！');
            }
            var tempHtml = template(tmplId, data);
            $(selector).append(tempHtml);
        }
    };
    return members;
});

if(typeof jQuery !== 'undefined') {
    jQuery.fn.extend({
        tmpl: function (tmplId, data) {
            xUtils.tmpl.render(tmplId, jQuery(this), data);
        }
    });
}

