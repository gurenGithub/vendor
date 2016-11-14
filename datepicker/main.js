$(function () {


    $.each($('.datePicker-CN'), function (k, v) {
        $(v).Zebra_DatePicker({
            show_icon: false,
            days: ['日', '一', '二', '三', '四', '五', '六'],
            months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            show_select_today: '今天',
            lang_clear_date: "清除",
            offset: [-220, 330],
            onSelect: function () {
                $(v).trigger('change').trigger('blur');
            }
        });
    });

	 $.each($('.datePicker'), function(k, v) {
        $(v).Zebra_DatePicker({
            show_icon: false,
            onSelect: function() {
                $(v).trigger('change').trigger('blur');
            }
        });
    });


    $.each($('.datePickerFuture'), function(k, v){
        $(v).Zebra_DatePicker({
            show_icon: false,
            direction: true,
            onSelect: function() {
                $(v).trigger('change').trigger('blur');
            }
        });
    });

    $.each($('[class*=datePickerBegin]'), function(k, v) {
        var pair = (function() {
            var matched = /.*datePickerBegin(\d+)/.exec($(v).attr('class'));
            if (matched) {
                return matched[1];
            }
            return '';
        })();
        $('.datePickerBegin' + pair).Zebra_DatePicker({
            pair: $('.datePickerEnd' + pair),
            show_icon: false,
            onSelect: function() {
                $(this).trigger('change').trigger('blur');
            }
        });

        $('.datePickerEnd' + pair).Zebra_DatePicker({
            direction: 1,
            show_icon: false,
            show_select_today: false,
            onSelect: function() {
                $(this).trigger('change').trigger('blur');
            }
        });
    });
})