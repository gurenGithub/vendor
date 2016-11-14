!function(i){"use strict";i(jQuery)}(function(){"use strict";var i=window.Slick||{};i=function(){function i(i,t){var o=this,s;o.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:$(i),appendDots:$(i),arrows:!0,asNavFor:null,prevArrow:'<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',nextArrow:'<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(i,e){return'<button type="button" data-role="none" role="button" aria-required="false" tabindex="0">'+(e+1)+"</button>"},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},o.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},$.extend(o,o.initials),o.activeBreakpoint=null,o.animType=null,o.animProp=null,o.breakpoints=[],o.breakpointSettings=[],o.cssTransitions=!1,o.hidden="hidden",o.paused=!1,o.positionProp=null,o.respondTo=null,o.rowCount=1,o.shouldClick=!0,o.$slider=$(i),o.$slidesCache=null,o.transformType=null,o.transitionType=null,o.visibilityChange="visibilitychange",o.windowWidth=0,o.windowTimer=null,s=$(i).data("slick")||{},o.options=$.extend({},o.defaults,s,t),o.currentSlide=o.options.initialSlide,o.originalSettings=o.options,"undefined"!=typeof document.mozHidden?(o.hidden="mozHidden",o.visibilityChange="mozvisibilitychange"):"undefined"!=typeof document.webkitHidden&&(o.hidden="webkitHidden",o.visibilityChange="webkitvisibilitychange"),o.autoPlay=$.proxy(o.autoPlay,o),o.autoPlayClear=$.proxy(o.autoPlayClear,o),o.changeSlide=$.proxy(o.changeSlide,o),o.clickHandler=$.proxy(o.clickHandler,o),o.selectHandler=$.proxy(o.selectHandler,o),o.setPosition=$.proxy(o.setPosition,o),o.swipeHandler=$.proxy(o.swipeHandler,o),o.dragHandler=$.proxy(o.dragHandler,o),o.keyHandler=$.proxy(o.keyHandler,o),o.autoPlayIterator=$.proxy(o.autoPlayIterator,o),o.instanceUid=e++,o.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,o.registerBreakpoints(),o.init(!0),o.checkResponsive(!0)}var e=0;return i}(),i.prototype.addSlide=i.prototype.slickAdd=function(i,e,t){var o=this;if("boolean"==typeof e)t=e,e=null;else if(0>e||e>=o.slideCount)return!1;o.unload(),"number"==typeof e?0===e&&0===o.$slides.length?$(i).appendTo(o.$slideTrack):t?$(i).insertBefore(o.$slides.eq(e)):$(i).insertAfter(o.$slides.eq(e)):t===!0?$(i).prependTo(o.$slideTrack):$(i).appendTo(o.$slideTrack),o.$slides=o.$slideTrack.children(this.options.slide),o.$slideTrack.children(this.options.slide).detach(),o.$slideTrack.append(o.$slides),o.$slides.each(function(i,e){$(e).attr("data-slick-index",i)}),o.$slidesCache=o.$slides,o.reinit()},i.prototype.animateHeight=function(){var i=this;if(1===i.options.slidesToShow&&i.options.adaptiveHeight===!0&&i.options.vertical===!1){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.animate({height:e},i.options.speed)}},i.prototype.animateSlide=function(i,e){var t={},o=this;o.animateHeight(),o.options.rtl===!0&&o.options.vertical===!1&&(i=-i),o.transformsEnabled===!1?o.options.vertical===!1?o.$slideTrack.animate({left:i},o.options.speed,o.options.easing,e):o.$slideTrack.animate({top:i},o.options.speed,o.options.easing,e):o.cssTransitions===!1?(o.options.rtl===!0&&(o.currentLeft=-o.currentLeft),$({animStart:o.currentLeft}).animate({animStart:i},{duration:o.options.speed,easing:o.options.easing,step:function(i){i=Math.ceil(i),o.options.vertical===!1?(t[o.animType]="translate("+i+"px, 0px)",o.$slideTrack.css(t)):(t[o.animType]="translate(0px,"+i+"px)",o.$slideTrack.css(t))},complete:function(){e&&e.call()}})):(o.applyTransition(),i=Math.ceil(i),o.options.vertical===!1?t[o.animType]="translate3d("+i+"px, 0px, 0px)":t[o.animType]="translate3d(0px,"+i+"px, 0px)",o.$slideTrack.css(t),e&&setTimeout(function(){o.disableTransition(),e.call()},o.options.speed))},i.prototype.asNavFor=function(i){var e=this,t=e.options.asNavFor;t&&null!==t&&(t=$(t).not(e.$slider)),null!==t&&"object"==typeof t&&t.each(function(){var e=$(this).slick("getSlick");e.unslicked||e.slideHandler(i,!0)})},i.prototype.applyTransition=function(i){var e=this,t={};e.options.fade===!1?t[e.transitionType]=e.transformType+" "+e.options.speed+"ms "+e.options.cssEase:t[e.transitionType]="opacity "+e.options.speed+"ms "+e.options.cssEase,e.options.fade===!1?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},i.prototype.autoPlay=function(){var i=this;i.autoPlayTimer&&clearInterval(i.autoPlayTimer),i.slideCount>i.options.slidesToShow&&i.paused!==!0&&(i.autoPlayTimer=setInterval(i.autoPlayIterator,i.options.autoplaySpeed))},i.prototype.autoPlayClear=function(){var i=this;i.autoPlayTimer&&clearInterval(i.autoPlayTimer)},i.prototype.autoPlayIterator=function(){var i=this;i.options.infinite===!1?1===i.direction?(i.currentSlide+1===i.slideCount-1&&(i.direction=0),i.slideHandler(i.currentSlide+i.options.slidesToScroll)):(i.currentSlide-1===0&&(i.direction=1),i.slideHandler(i.currentSlide-i.options.slidesToScroll)):i.slideHandler(i.currentSlide+i.options.slidesToScroll)},i.prototype.buildArrows=function(){var i=this;i.options.arrows===!0&&(i.$prevArrow=$(i.options.prevArrow).addClass("slick-arrow"),i.$nextArrow=$(i.options.nextArrow).addClass("slick-arrow"),i.slideCount>i.options.slidesToShow?(i.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),i.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),i.htmlExpr.test(i.options.prevArrow)&&i.$prevArrow.prependTo(i.options.appendArrows),i.htmlExpr.test(i.options.nextArrow)&&i.$nextArrow.appendTo(i.options.appendArrows),i.options.infinite!==!0&&i.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):i.$prevArrow.add(i.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},i.prototype.buildDots=function(){var i=this,e,t;if(i.options.dots===!0&&i.slideCount>i.options.slidesToShow){for(t='<ul class="'+i.options.dotsClass+'">',e=0;e<=i.getDotCount();e+=1)t+="<li>"+i.options.customPaging.call(this,i,e)+"</li>";t+="</ul>",i.$dots=$(t).appendTo(i.options.appendDots),i.$dots.find("li").first().addClass("slick-active").attr("aria-hidden","false")}},i.prototype.buildOut=function(){var i=this;i.$slides=i.$slider.children(i.options.slide+":not(.slick-cloned)").addClass("slick-slide"),i.slideCount=i.$slides.length,i.$slides.each(function(i,e){$(e).attr("data-slick-index",i).data("originalStyling",$(e).attr("style")||"")}),i.$slidesCache=i.$slides,i.$slider.addClass("slick-slider"),i.$slideTrack=0===i.slideCount?$('<div class="slick-track"/>').appendTo(i.$slider):i.$slides.wrapAll('<div class="slick-track"/>').parent(),i.$list=i.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(),i.$slideTrack.css("opacity",0),(i.options.centerMode===!0||i.options.swipeToSlide===!0)&&(i.options.slidesToScroll=1),$("img[data-lazy]",i.$slider).not("[src]").addClass("slick-loading"),i.setupInfinite(),i.buildArrows(),i.buildDots(),i.updateDots(),i.setSlideClasses("number"==typeof i.currentSlide?i.currentSlide:0),i.options.draggable===!0&&i.$list.addClass("draggable")},i.prototype.buildRows=function(){var i=this,e,t,o,s,n,l,r;if(s=document.createDocumentFragment(),l=i.$slider.children(),i.options.rows>1){for(r=i.options.slidesPerRow*i.options.rows,n=Math.ceil(l.length/r),e=0;n>e;e++){var a=document.createElement("div");for(t=0;t<i.options.rows;t++){var d=document.createElement("div");for(o=0;o<i.options.slidesPerRow;o++){var c=e*r+(t*i.options.slidesPerRow+o);l.get(c)&&d.appendChild(l.get(c))}a.appendChild(d)}s.appendChild(a)}i.$slider.html(s),i.$slider.children().children().children().css({width:100/i.options.slidesPerRow+"%",display:"inline-block"})}},i.prototype.checkResponsive=function(i,e){var t=this,o,s,n,l=!1,r=t.$slider.width(),a=window.innerWidth||$(window).width();if("window"===t.respondTo?n=a:"slider"===t.respondTo?n=r:"min"===t.respondTo&&(n=Math.min(a,r)),t.options.responsive&&t.options.responsive.length&&null!==t.options.responsive){s=null;for(o in t.breakpoints)t.breakpoints.hasOwnProperty(o)&&(t.originalSettings.mobileFirst===!1?n<t.breakpoints[o]&&(s=t.breakpoints[o]):n>t.breakpoints[o]&&(s=t.breakpoints[o]));null!==s?null!==t.activeBreakpoint?(s!==t.activeBreakpoint||e)&&(t.activeBreakpoint=s,"unslick"===t.breakpointSettings[s]?t.unslick(s):(t.options=$.extend({},t.originalSettings,t.breakpointSettings[s]),i===!0&&(t.currentSlide=t.options.initialSlide),t.refresh(i)),l=s):(t.activeBreakpoint=s,"unslick"===t.breakpointSettings[s]?t.unslick(s):(t.options=$.extend({},t.originalSettings,t.breakpointSettings[s]),i===!0&&(t.currentSlide=t.options.initialSlide),t.refresh(i)),l=s):null!==t.activeBreakpoint&&(t.activeBreakpoint=null,t.options=t.originalSettings,i===!0&&(t.currentSlide=t.options.initialSlide),t.refresh(i),l=s),i||l===!1||t.$slider.trigger("breakpoint",[t,l])}},i.prototype.changeSlide=function(i,e){var t=this,o=$(i.target),s,n,l;switch(o.is("a")&&i.preventDefault(),o.is("li")||(o=o.closest("li")),l=t.slideCount%t.options.slidesToScroll!==0,s=l?0:(t.slideCount-t.currentSlide)%t.options.slidesToScroll,i.data.message){case"previous":n=0===s?t.options.slidesToScroll:t.options.slidesToShow-s,t.slideCount>t.options.slidesToShow&&t.slideHandler(t.currentSlide-n,!1,e);break;case"next":n=0===s?t.options.slidesToScroll:s,t.slideCount>t.options.slidesToShow&&t.slideHandler(t.currentSlide+n,!1,e);break;case"index":var r=0===i.data.index?0:i.data.index||o.index()*t.options.slidesToScroll;t.slideHandler(t.checkNavigable(r),!1,e),o.children().trigger("focus");break;default:return}},i.prototype.checkNavigable=function(i){var e=this,t,o;if(t=e.getNavigableIndexes(),o=0,i>t[t.length-1])i=t[t.length-1];else for(var s in t){if(i<t[s]){i=o;break}o=t[s]}return i},i.prototype.cleanUpEvents=function(){var i=this;i.options.dots&&null!==i.$dots&&($("li",i.$dots).off("click.slick",i.changeSlide),i.options.pauseOnDotsHover===!0&&i.options.autoplay===!0&&$("li",i.$dots).off("mouseenter.slick",$.proxy(i.setPaused,i,!0)).off("mouseleave.slick",$.proxy(i.setPaused,i,!1))),i.options.arrows===!0&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow&&i.$prevArrow.off("click.slick",i.changeSlide),i.$nextArrow&&i.$nextArrow.off("click.slick",i.changeSlide)),i.$list.off("touchstart.slick mousedown.slick",i.swipeHandler),i.$list.off("touchmove.slick mousemove.slick",i.swipeHandler),i.$list.off("touchend.slick mouseup.slick",i.swipeHandler),i.$list.off("touchcancel.slick mouseleave.slick",i.swipeHandler),i.$list.off("click.slick",i.clickHandler),$(document).off(i.visibilityChange,i.visibility),i.$list.off("mouseenter.slick",$.proxy(i.setPaused,i,!0)),i.$list.off("mouseleave.slick",$.proxy(i.setPaused,i,!1)),i.options.accessibility===!0&&i.$list.off("keydown.slick",i.keyHandler),i.options.focusOnSelect===!0&&$(i.$slideTrack).children().off("click.slick",i.selectHandler),$(window).off("orientationchange.slick.slick-"+i.instanceUid,i.orientationChange),$(window).off("resize.slick.slick-"+i.instanceUid,i.resize),$("[draggable!=true]",i.$slideTrack).off("dragstart",i.preventDefault),$(window).off("load.slick.slick-"+i.instanceUid,i.setPosition),$(document).off("ready.slick.slick-"+i.instanceUid,i.setPosition)},i.prototype.cleanUpRows=function(){var i=this,e;i.options.rows>1&&(e=i.$slides.children().children(),e.removeAttr("style"),i.$slider.html(e))},i.prototype.clickHandler=function(i){var e=this;e.shouldClick===!1&&(i.stopImmediatePropagation(),i.stopPropagation(),i.preventDefault())},i.prototype.destroy=function(i){var e=this;e.autoPlayClear(),e.touchObject={},e.cleanUpEvents(),$(".slick-cloned",e.$slider).detach(),e.$dots&&e.$dots.remove(),e.$prevArrow.length&&(e.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.remove()),e.$nextArrow.length&&(e.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.remove()),e.$slides&&(e.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){$(this).attr("style",$(this).data("originalStyling"))}),e.$slideTrack.children(this.options.slide).detach(),e.$slideTrack.detach(),e.$list.detach(),e.$slider.append(e.$slides)),e.cleanUpRows(),e.$slider.removeClass("slick-slider"),e.$slider.removeClass("slick-initialized"),e.unslicked=!0,i||e.$slider.trigger("destroy",[e])},i.prototype.disableTransition=function(i){var e=this,t={};t[e.transitionType]="",e.options.fade===!1?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},i.prototype.fadeSlide=function(i,e){var t=this;t.cssTransitions===!1?(t.$slides.eq(i).css({zIndex:t.options.zIndex}),t.$slides.eq(i).animate({opacity:1},t.options.speed,t.options.easing,e)):(t.applyTransition(i),t.$slides.eq(i).css({opacity:1,zIndex:t.options.zIndex}),e&&setTimeout(function(){t.disableTransition(i),e.call()},t.options.speed))},i.prototype.fadeSlideOut=function(i){var e=this;e.cssTransitions===!1?e.$slides.eq(i).animate({opacity:0,zIndex:e.options.zIndex-2},e.options.speed,e.options.easing):(e.applyTransition(i),e.$slides.eq(i).css({opacity:0,zIndex:e.options.zIndex-2}))},i.prototype.filterSlides=i.prototype.slickFilter=function(i){var e=this;null!==i&&(e.unload(),e.$slideTrack.children(this.options.slide).detach(),e.$slidesCache.filter(i).appendTo(e.$slideTrack),e.reinit())},i.prototype.getCurrent=i.prototype.slickCurrentSlide=function(){var i=this;return i.currentSlide},i.prototype.getDotCount=function(){var i=this,e=0,t=0,o=0;if(i.options.infinite===!0)for(;e<i.slideCount;)++o,e=t+i.options.slidesToShow,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else if(i.options.centerMode===!0)o=i.slideCount;else for(;e<i.slideCount;)++o,e=t+i.options.slidesToShow,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;return o-1},i.prototype.getLeft=function(i){var e=this,t,o,s=0,n;return e.slideOffset=0,o=e.$slides.first().outerHeight(!0),e.options.infinite===!0?(e.slideCount>e.options.slidesToShow&&(e.slideOffset=e.slideWidth*e.options.slidesToShow*-1,s=o*e.options.slidesToShow*-1),e.slideCount%e.options.slidesToScroll!==0&&i+e.options.slidesToScroll>e.slideCount&&e.slideCount>e.options.slidesToShow&&(i>e.slideCount?(e.slideOffset=(e.options.slidesToShow-(i-e.slideCount))*e.slideWidth*-1,s=(e.options.slidesToShow-(i-e.slideCount))*o*-1):(e.slideOffset=e.slideCount%e.options.slidesToScroll*e.slideWidth*-1,s=e.slideCount%e.options.slidesToScroll*o*-1))):i+e.options.slidesToShow>e.slideCount&&(e.slideOffset=(i+e.options.slidesToShow-e.slideCount)*e.slideWidth,s=(i+e.options.slidesToShow-e.slideCount)*o),e.slideCount<=e.options.slidesToShow&&(e.slideOffset=0,s=0),e.options.centerMode===!0&&e.options.infinite===!0?e.slideOffset+=e.slideWidth*Math.floor(e.options.slidesToShow/2)-e.slideWidth:e.options.centerMode===!0&&(e.slideOffset=0,e.slideOffset+=e.slideWidth*Math.floor(e.options.slidesToShow/2)),t=e.options.vertical===!1?i*e.slideWidth*-1+e.slideOffset:i*o*-1+s,e.options.variableWidth===!0&&(n=e.slideCount<=e.options.slidesToShow||e.options.infinite===!1?e.$slideTrack.children(".slick-slide").eq(i):e.$slideTrack.children(".slick-slide").eq(i+e.options.slidesToShow),t=n[0]?-1*n[0].offsetLeft:0,e.options.centerMode===!0&&(n=e.options.infinite===!1?e.$slideTrack.children(".slick-slide").eq(i):e.$slideTrack.children(".slick-slide").eq(i+e.options.slidesToShow+1),t=n[0]?-1*n[0].offsetLeft:0,t+=(e.$list.width()-n.outerWidth())/2)),t},i.prototype.getOption=i.prototype.slickGetOption=function(i){var e=this;return e.options[i]},i.prototype.getNavigableIndexes=function(){var i=this,e=0,t=0,o=[],s;for(i.options.infinite===!1?s=i.slideCount:(e=-1*i.options.slidesToScroll,t=-1*i.options.slidesToScroll,s=2*i.slideCount);s>e;)o.push(e),e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;return o},i.prototype.getSlick=function(){return this},i.prototype.getSlideCount=function(){var i=this,e,t,o;return o=i.options.centerMode===!0?i.slideWidth*Math.floor(i.options.slidesToShow/2):0,i.options.swipeToSlide===!0?(i.$slideTrack.find(".slick-slide").each(function(e,s){return s.offsetLeft-o+$(s).outerWidth()/2>-1*i.swipeLeft?(t=s,!1):void 0}),e=Math.abs($(t).attr("data-slick-index")-i.currentSlide)||1):i.options.slidesToScroll},i.prototype.goTo=i.prototype.slickGoTo=function(i,e){var t=this;t.changeSlide({data:{message:"index",index:parseInt(i)}},e)},i.prototype.init=function(i){var e=this;$(e.$slider).hasClass("slick-initialized")||($(e.$slider).addClass("slick-initialized"),e.buildRows(),e.buildOut(),e.setProps(),e.startLoad(),e.loadSlider(),e.initializeEvents(),e.updateArrows(),e.updateDots()),i&&e.$slider.trigger("init",[e]),e.options.accessibility===!0&&e.initADA()},i.prototype.initArrowEvents=function(){var i=this;i.options.arrows===!0&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.on("click.slick",{message:"previous"},i.changeSlide),i.$nextArrow.on("click.slick",{message:"next"},i.changeSlide))},i.prototype.initDotEvents=function(){var i=this;i.options.dots===!0&&i.slideCount>i.options.slidesToShow&&$("li",i.$dots).on("click.slick",{message:"index"},i.changeSlide),i.options.dots===!0&&i.options.pauseOnDotsHover===!0&&i.options.autoplay===!0&&$("li",i.$dots).on("mouseenter.slick",$.proxy(i.setPaused,i,!0)).on("mouseleave.slick",$.proxy(i.setPaused,i,!1))},i.prototype.initializeEvents=function(){var i=this;i.initArrowEvents(),i.initDotEvents(),i.$list.on("touchstart.slick mousedown.slick",{action:"start"},i.swipeHandler),i.$list.on("touchmove.slick mousemove.slick",{action:"move"},i.swipeHandler),i.$list.on("touchend.slick mouseup.slick",{action:"end"},i.swipeHandler),i.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},i.swipeHandler),i.$list.on("click.slick",i.clickHandler),$(document).on(i.visibilityChange,$.proxy(i.visibility,i)),i.$list.on("mouseenter.slick",$.proxy(i.setPaused,i,!0)),i.$list.on("mouseleave.slick",$.proxy(i.setPaused,i,!1)),i.options.accessibility===!0&&i.$list.on("keydown.slick",i.keyHandler),i.options.focusOnSelect===!0&&$(i.$slideTrack).children().on("click.slick",i.selectHandler),$(window).on("orientationchange.slick.slick-"+i.instanceUid,$.proxy(i.orientationChange,i)),$(window).on("resize.slick.slick-"+i.instanceUid,$.proxy(i.resize,i)),$("[draggable!=true]",i.$slideTrack).on("dragstart",i.preventDefault),$(window).on("load.slick.slick-"+i.instanceUid,i.setPosition),$(document).on("ready.slick.slick-"+i.instanceUid,i.setPosition)},i.prototype.initUI=function(){var i=this;i.options.arrows===!0&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.show(),i.$nextArrow.show()),i.options.dots===!0&&i.slideCount>i.options.slidesToShow&&i.$dots.show(),i.options.autoplay===!0&&i.autoPlay()},i.prototype.keyHandler=function(i){var e=this;i.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===i.keyCode&&e.options.accessibility===!0?e.changeSlide({data:{message:"previous"}}):39===i.keyCode&&e.options.accessibility===!0&&e.changeSlide({data:{message:"next"}}))},i.prototype.lazyLoad=function(){function i(i){$("img[data-lazy]",i).each(function(){var i=$(this),e=$(this).attr("data-lazy"),t=document.createElement("img");t.onload=function(){i.animate({opacity:0},100,function(){i.attr("src",e).animate({opacity:1},200,function(){i.removeAttr("data-lazy").removeClass("slick-loading")})})},t.src=e})}var e=this,t,o,s,n;e.options.centerMode===!0?e.options.infinite===!0?(s=e.currentSlide+(e.options.slidesToShow/2+1),n=s+e.options.slidesToShow+2):(s=Math.max(0,e.currentSlide-(e.options.slidesToShow/2+1)),n=2+(e.options.slidesToShow/2+1)+e.currentSlide):(s=e.options.infinite?e.options.slidesToShow+e.currentSlide:e.currentSlide,n=s+e.options.slidesToShow,e.options.fade===!0&&(s>0&&s--,n<=e.slideCount&&n++)),t=e.$slider.find(".slick-slide").slice(s,n),i(t),e.slideCount<=e.options.slidesToShow?(o=e.$slider.find(".slick-slide"),i(o)):e.currentSlide>=e.slideCount-e.options.slidesToShow?(o=e.$slider.find(".slick-cloned").slice(0,e.options.slidesToShow),i(o)):0===e.currentSlide&&(o=e.$slider.find(".slick-cloned").slice(-1*e.options.slidesToShow),i(o))},i.prototype.loadSlider=function(){var i=this;i.setPosition(),i.$slideTrack.css({opacity:1}),i.$slider.removeClass("slick-loading"),i.initUI(),"progressive"===i.options.lazyLoad&&i.progressiveLazyLoad()},i.prototype.next=i.prototype.slickNext=function(){var i=this;i.changeSlide({data:{message:"next"}})},i.prototype.orientationChange=function(){var i=this;i.checkResponsive(),i.setPosition()},i.prototype.pause=i.prototype.slickPause=function(){var i=this;i.autoPlayClear(),i.paused=!0},i.prototype.play=i.prototype.slickPlay=function(){var i=this;i.paused=!1,i.autoPlay()},i.prototype.postSlide=function(i){var e=this;e.$slider.trigger("afterChange",[e,i]),e.animating=!1,e.setPosition(),e.swipeLeft=null,e.options.autoplay===!0&&e.paused===!1&&e.autoPlay(),e.options.accessibility===!0&&e.initADA()},i.prototype.prev=i.prototype.slickPrev=function(){var i=this;i.changeSlide({data:{message:"previous"}})},i.prototype.preventDefault=function(i){i.preventDefault()},i.prototype.progressiveLazyLoad=function(){var i=this,e,t;e=$("img[data-lazy]",i.$slider).length,e>0&&(t=$("img[data-lazy]",i.$slider).first(),t.attr("src",t.attr("data-lazy")).removeClass("slick-loading").load(function(){t.removeAttr("data-lazy"),i.progressiveLazyLoad(),i.options.adaptiveHeight===!0&&i.setPosition()}).error(function(){t.removeAttr("data-lazy"),i.progressiveLazyLoad()}))},i.prototype.refresh=function(i){var e=this,t=e.currentSlide;e.destroy(!0),$.extend(e,e.initials,{currentSlide:t}),e.init(),i||e.changeSlide({data:{message:"index",index:t}},!1)},i.prototype.registerBreakpoints=function(){var i=this,e,t,o,s=i.options.responsive||null;if("array"===$.type(s)&&s.length){i.respondTo=i.options.respondTo||"window";for(e in s)if(o=i.breakpoints.length-1,t=s[e].breakpoint,s.hasOwnProperty(e)){for(;o>=0;)i.breakpoints[o]&&i.breakpoints[o]===t&&i.breakpoints.splice(o,1),o--;i.breakpoints.push(t),i.breakpointSettings[t]=s[e].settings}i.breakpoints.sort(function(e,t){return i.options.mobileFirst?e-t:t-e})}},i.prototype.reinit=function(){var i=this;i.$slides=i.$slideTrack.children(i.options.slide).addClass("slick-slide"),i.slideCount=i.$slides.length,i.currentSlide>=i.slideCount&&0!==i.currentSlide&&(i.currentSlide=i.currentSlide-i.options.slidesToScroll),i.slideCount<=i.options.slidesToShow&&(i.currentSlide=0),i.registerBreakpoints(),i.setProps(),i.setupInfinite(),i.buildArrows(),i.updateArrows(),i.initArrowEvents(),i.buildDots(),i.updateDots(),i.initDotEvents(),i.checkResponsive(!1,!0),i.options.focusOnSelect===!0&&$(i.$slideTrack).children().on("click.slick",i.selectHandler),i.setSlideClasses(0),i.setPosition(),i.$slider.trigger("reInit",[i]),i.options.autoplay===!0&&i.focusHandler()},i.prototype.resize=function(){var i=this;$(window).width()!==i.windowWidth&&(clearTimeout(i.windowDelay),i.windowDelay=window.setTimeout(function(){i.windowWidth=$(window).width(),i.checkResponsive(),i.unslicked||i.setPosition()},50))},i.prototype.removeSlide=i.prototype.slickRemove=function(i,e,t){var o=this;return"boolean"==typeof i?(e=i,i=e===!0?0:o.slideCount-1):i=e===!0?--i:i,o.slideCount<1||0>i||i>o.slideCount-1?!1:(o.unload(),t===!0?o.$slideTrack.children().remove():o.$slideTrack.children(this.options.slide).eq(i).remove(),o.$slides=o.$slideTrack.children(this.options.slide),o.$slideTrack.children(this.options.slide).detach(),o.$slideTrack.append(o.$slides),o.$slidesCache=o.$slides,void o.reinit())},i.prototype.setCSS=function(i){var e=this,t={},o,s;e.options.rtl===!0&&(i=-i),o="left"==e.positionProp?Math.ceil(i)+"px":"0px",s="top"==e.positionProp?Math.ceil(i)+"px":"0px",t[e.positionProp]=i,e.transformsEnabled===!1?e.$slideTrack.css(t):(t={},e.cssTransitions===!1?(t[e.animType]="translate("+o+", "+s+")",e.$slideTrack.css(t)):(t[e.animType]="translate3d("+o+", "+s+", 0px)",e.$slideTrack.css(t)))},i.prototype.setDimensions=function(){var i=this;i.options.vertical===!1?i.options.centerMode===!0&&i.$list.css({padding:"0px "+i.options.centerPadding}):(i.$list.height(i.$slides.first().outerHeight(!0)*i.options.slidesToShow),i.options.centerMode===!0&&i.$list.css({padding:i.options.centerPadding+" 0px"})),i.listWidth=i.$list.width(),i.listHeight=i.$list.height(),i.options.vertical===!1&&i.options.variableWidth===!1?(i.slideWidth=Math.ceil(i.listWidth/i.options.slidesToShow),i.$slideTrack.width(Math.ceil(i.slideWidth*i.$slideTrack.children(".slick-slide").length))):i.options.variableWidth===!0?i.$slideTrack.width(5e3*i.slideCount):(i.slideWidth=Math.ceil(i.listWidth),i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0)*i.$slideTrack.children(".slick-slide").length)));var e=i.$slides.first().outerWidth(!0)-i.$slides.first().width();i.options.variableWidth===!1&&i.$slideTrack.children(".slick-slide").width(i.slideWidth-e)},i.prototype.setFade=function(){var i=this,e;i.$slides.each(function(t,o){e=i.slideWidth*t*-1,i.options.rtl===!0?$(o).css({position:"relative",right:e,top:0,zIndex:i.options.zIndex-2,opacity:0}):$(o).css({position:"relative",left:e,top:0,zIndex:i.options.zIndex-2,opacity:0})}),i.$slides.eq(i.currentSlide).css({zIndex:i.options.zIndex-1,opacity:1})},i.prototype.setHeight=function(){var i=this;if(1===i.options.slidesToShow&&i.options.adaptiveHeight===!0&&i.options.vertical===!1){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.css("height",e)}},i.prototype.setOption=i.prototype.slickSetOption=function(i,e,t){var o=this,s,n;if("responsive"===i&&"array"===$.type(e))for(n in e)if("array"!==$.type(o.options.responsive))o.options.responsive=[e[n]];else{for(s=o.options.responsive.length-1;s>=0;)o.options.responsive[s].breakpoint===e[n].breakpoint&&o.options.responsive.splice(s,1),s--;o.options.responsive.push(e[n])}else o.options[i]=e;t===!0&&(o.unload(),o.reinit())},i.prototype.setPosition=function(){var i=this;i.setDimensions(),i.setHeight(),i.options.fade===!1?i.setCSS(i.getLeft(i.currentSlide)):i.setFade(),i.$slider.trigger("setPosition",[i])},i.prototype.setProps=function(){var i=this,e=document.body.style;i.positionProp=i.options.vertical===!0?"top":"left","top"===i.positionProp?i.$slider.addClass("slick-vertical"):i.$slider.removeClass("slick-vertical"),(void 0!==e.WebkitTransition||void 0!==e.MozTransition||void 0!==e.msTransition)&&i.options.useCSS===!0&&(i.cssTransitions=!0),i.options.fade&&("number"==typeof i.options.zIndex?i.options.zIndex<3&&(i.options.zIndex=3):i.options.zIndex=i.defaults.zIndex),void 0!==e.OTransform&&(i.animType="OTransform",i.transformType="-o-transform",i.transitionType="OTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.MozTransform&&(i.animType="MozTransform",i.transformType="-moz-transform",i.transitionType="MozTransition",void 0===e.perspectiveProperty&&void 0===e.MozPerspective&&(i.animType=!1)),void 0!==e.webkitTransform&&(i.animType="webkitTransform",i.transformType="-webkit-transform",i.transitionType="webkitTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.msTransform&&(i.animType="msTransform",i.transformType="-ms-transform",i.transitionType="msTransition",void 0===e.msTransform&&(i.animType=!1)),void 0!==e.transform&&i.animType!==!1&&(i.animType="transform",i.transformType="transform",i.transitionType="transition"),i.transformsEnabled=null!==i.animType&&i.animType!==!1},i.prototype.setSlideClasses=function(i){var e=this,t,o,s,n;o=e.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),e.$slides.eq(i).addClass("slick-current"),e.options.centerMode===!0?(t=Math.floor(e.options.slidesToShow/2),e.options.infinite===!0&&(i>=t&&i<=e.slideCount-1-t?e.$slides.slice(i-t,i+t+1).addClass("slick-active").attr("aria-hidden","false"):(s=e.options.slidesToShow+i,o.slice(s-t+1,s+t+2).addClass("slick-active").attr("aria-hidden","false")),0===i?o.eq(o.length-1-e.options.slidesToShow).addClass("slick-center"):i===e.slideCount-1&&o.eq(e.options.slidesToShow).addClass("slick-center")),e.$slides.eq(i).addClass("slick-center")):i>=0&&i<=e.slideCount-e.options.slidesToShow?e.$slides.slice(i,i+e.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):o.length<=e.options.slidesToShow?o.addClass("slick-active").attr("aria-hidden","false"):(n=e.slideCount%e.options.slidesToShow,s=e.options.infinite===!0?e.options.slidesToShow+i:i,e.options.slidesToShow==e.options.slidesToScroll&&e.slideCount-i<e.options.slidesToShow?o.slice(s-(e.options.slidesToShow-n),s+n).addClass("slick-active").attr("aria-hidden","false"):o.slice(s,s+e.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false")),"ondemand"===e.options.lazyLoad&&e.lazyLoad()},i.prototype.setupInfinite=function(){var i=this,e,t,o;if(i.options.fade===!0&&(i.options.centerMode=!1),i.options.infinite===!0&&i.options.fade===!1&&(t=null,i.slideCount>i.options.slidesToShow)){for(o=i.options.centerMode===!0?i.options.slidesToShow+1:i.options.slidesToShow,e=i.slideCount;e>i.slideCount-o;e-=1)t=e-1,$(i.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t-i.slideCount).prependTo(i.$slideTrack).addClass("slick-cloned");for(e=0;o>e;e+=1)t=e,$(i.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t+i.slideCount).appendTo(i.$slideTrack).addClass("slick-cloned");i.$slideTrack.find(".slick-cloned").find("[id]").each(function(){$(this).attr("id","")})}},i.prototype.setPaused=function(i){var e=this;e.options.autoplay===!0&&e.options.pauseOnHover===!0&&(e.paused=i,i?e.autoPlayClear():e.autoPlay())},i.prototype.selectHandler=function(i){var e=this,t=$(i.target).is(".slick-slide")?$(i.target):$(i.target).parents(".slick-slide"),o=parseInt(t.attr("data-slick-index"));return o||(o=0),e.slideCount<=e.options.slidesToShow?(e.setSlideClasses(o),void e.asNavFor(o)):void e.slideHandler(o)},i.prototype.slideHandler=function(i,e,t){var o,s,n,l,r=null,a=this;return e=e||!1,a.animating===!0&&a.options.waitForAnimate===!0||a.options.fade===!0&&a.currentSlide===i||a.slideCount<=a.options.slidesToShow?void 0:(e===!1&&a.asNavFor(i),o=i,r=a.getLeft(o),l=a.getLeft(a.currentSlide),a.currentLeft=null===a.swipeLeft?l:a.swipeLeft,a.options.infinite===!1&&a.options.centerMode===!1&&(0>i||i>a.getDotCount()*a.options.slidesToScroll)?void(a.options.fade===!1&&(o=a.currentSlide,t!==!0?a.animateSlide(l,function(){a.postSlide(o)}):a.postSlide(o))):a.options.infinite===!1&&a.options.centerMode===!0&&(0>i||i>a.slideCount-a.options.slidesToScroll)?void(a.options.fade===!1&&(o=a.currentSlide,t!==!0?a.animateSlide(l,function(){a.postSlide(o)}):a.postSlide(o))):(a.options.autoplay===!0&&clearInterval(a.autoPlayTimer),s=0>o?a.slideCount%a.options.slidesToScroll!==0?a.slideCount-a.slideCount%a.options.slidesToScroll:a.slideCount+o:o>=a.slideCount?a.slideCount%a.options.slidesToScroll!==0?0:o-a.slideCount:o,a.animating=!0,a.$slider.trigger("beforeChange",[a,a.currentSlide,s]),n=a.currentSlide,
a.currentSlide=s,a.setSlideClasses(a.currentSlide),a.updateDots(),a.updateArrows(),a.options.fade===!0?(t!==!0?(a.fadeSlideOut(n),a.fadeSlide(s,function(){a.postSlide(s)})):a.postSlide(s),void a.animateHeight()):void(t!==!0?a.animateSlide(r,function(){a.postSlide(s)}):a.postSlide(s))))},i.prototype.startLoad=function(){var i=this;i.options.arrows===!0&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.hide(),i.$nextArrow.hide()),i.options.dots===!0&&i.slideCount>i.options.slidesToShow&&i.$dots.hide(),i.$slider.addClass("slick-loading")},i.prototype.swipeDirection=function(){var i,e,t,o,s=this;return i=s.touchObject.startX-s.touchObject.curX,e=s.touchObject.startY-s.touchObject.curY,t=Math.atan2(e,i),o=Math.round(180*t/Math.PI),0>o&&(o=360-Math.abs(o)),45>=o&&o>=0?s.options.rtl===!1?"left":"right":360>=o&&o>=315?s.options.rtl===!1?"left":"right":o>=135&&225>=o?s.options.rtl===!1?"right":"left":s.options.verticalSwiping===!0?o>=35&&135>=o?"left":"right":"vertical"},i.prototype.swipeEnd=function(i){var e=this,t;if(e.dragging=!1,e.shouldClick=e.touchObject.swipeLength>10?!1:!0,void 0===e.touchObject.curX)return!1;if(e.touchObject.edgeHit===!0&&e.$slider.trigger("edge",[e,e.swipeDirection()]),e.touchObject.swipeLength>=e.touchObject.minSwipe)switch(e.swipeDirection()){case"left":t=e.options.swipeToSlide?e.checkNavigable(e.currentSlide+e.getSlideCount()):e.currentSlide+e.getSlideCount(),e.slideHandler(t),e.currentDirection=0,e.touchObject={},e.$slider.trigger("swipe",[e,"left"]);break;case"right":t=e.options.swipeToSlide?e.checkNavigable(e.currentSlide-e.getSlideCount()):e.currentSlide-e.getSlideCount(),e.slideHandler(t),e.currentDirection=1,e.touchObject={},e.$slider.trigger("swipe",[e,"right"])}else e.touchObject.startX!==e.touchObject.curX&&(e.slideHandler(e.currentSlide),e.touchObject={})},i.prototype.swipeHandler=function(i){var e=this;if(!(e.options.swipe===!1||"ontouchend"in document&&e.options.swipe===!1||e.options.draggable===!1&&-1!==i.type.indexOf("mouse")))switch(e.touchObject.fingerCount=i.originalEvent&&void 0!==i.originalEvent.touches?i.originalEvent.touches.length:1,e.touchObject.minSwipe=e.listWidth/e.options.touchThreshold,e.options.verticalSwiping===!0&&(e.touchObject.minSwipe=e.listHeight/e.options.touchThreshold),i.data.action){case"start":e.swipeStart(i);break;case"move":e.swipeMove(i);break;case"end":e.swipeEnd(i)}},i.prototype.swipeMove=function(i){var e=this,t=!1,o,s,n,l,r;return r=void 0!==i.originalEvent?i.originalEvent.touches:null,!e.dragging||r&&1!==r.length?!1:(o=e.getLeft(e.currentSlide),e.touchObject.curX=void 0!==r?r[0].pageX:i.clientX,e.touchObject.curY=void 0!==r?r[0].pageY:i.clientY,e.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(e.touchObject.curX-e.touchObject.startX,2))),e.options.verticalSwiping===!0&&(e.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(e.touchObject.curY-e.touchObject.startY,2)))),s=e.swipeDirection(),"vertical"!==s?(void 0!==i.originalEvent&&e.touchObject.swipeLength>4&&i.preventDefault(),l=(e.options.rtl===!1?1:-1)*(e.touchObject.curX>e.touchObject.startX?1:-1),e.options.verticalSwiping===!0&&(l=e.touchObject.curY>e.touchObject.startY?1:-1),n=e.touchObject.swipeLength,e.touchObject.edgeHit=!1,e.options.infinite===!1&&(0===e.currentSlide&&"right"===s||e.currentSlide>=e.getDotCount()&&"left"===s)&&(n=e.touchObject.swipeLength*e.options.edgeFriction,e.touchObject.edgeHit=!0),e.options.vertical===!1?e.swipeLeft=o+n*l:e.swipeLeft=o+n*(e.$list.height()/e.listWidth)*l,e.options.verticalSwiping===!0&&(e.swipeLeft=o+n*l),e.options.fade===!0||e.options.touchMove===!1?!1:e.animating===!0?(e.swipeLeft=null,!1):void e.setCSS(e.swipeLeft)):void 0)},i.prototype.swipeStart=function(i){var e=this,t;return 1!==e.touchObject.fingerCount||e.slideCount<=e.options.slidesToShow?(e.touchObject={},!1):(void 0!==i.originalEvent&&void 0!==i.originalEvent.touches&&(t=i.originalEvent.touches[0]),e.touchObject.startX=e.touchObject.curX=void 0!==t?t.pageX:i.clientX,e.touchObject.startY=e.touchObject.curY=void 0!==t?t.pageY:i.clientY,void(e.dragging=!0))},i.prototype.unfilterSlides=i.prototype.slickUnfilter=function(){var i=this;null!==i.$slidesCache&&(i.unload(),i.$slideTrack.children(this.options.slide).detach(),i.$slidesCache.appendTo(i.$slideTrack),i.reinit())},i.prototype.unload=function(){var i=this;$(".slick-cloned",i.$slider).remove(),i.$dots&&i.$dots.remove(),i.$prevArrow&&i.htmlExpr.test(i.options.prevArrow)&&i.$prevArrow.remove(),i.$nextArrow&&i.htmlExpr.test(i.options.nextArrow)&&i.$nextArrow.remove(),i.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},i.prototype.unslick=function(i){var e=this;e.$slider.trigger("unslick",[e,i]),e.destroy()},i.prototype.updateArrows=function(){var i=this,e;e=Math.floor(i.options.slidesToShow/2),i.options.arrows===!0&&i.slideCount>i.options.slidesToShow&&!i.options.infinite&&(i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===i.currentSlide?(i.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-i.options.slidesToShow&&i.options.centerMode===!1?(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-1&&i.options.centerMode===!0&&(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},i.prototype.updateDots=function(){var i=this;null!==i.$dots&&(i.$dots.find("li").removeClass("slick-active").attr("aria-hidden","true"),i.$dots.find("li").eq(Math.floor(i.currentSlide/i.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden","false"))},i.prototype.visibility=function(){var i=this;document[i.hidden]?(i.paused=!0,i.autoPlayClear()):i.options.autoplay===!0&&(i.paused=!1,i.autoPlay())},i.prototype.initADA=function(){var i=this;i.$slides.add(i.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),i.$slideTrack.attr("role","listbox"),i.$slides.not(i.$slideTrack.find(".slick-cloned")).each(function(e){$(this).attr({role:"option","aria-describedby":"slick-slide"+i.instanceUid+e})}),null!==i.$dots&&i.$dots.attr("role","tablist").find("li").each(function(e){$(this).attr({role:"presentation","aria-selected":"false","aria-controls":"navigation"+i.instanceUid+e,id:"slick-slide"+i.instanceUid+e})}).first().attr("aria-selected","true").end().find("button").attr("role","button").end().closest("div").attr("role","toolbar"),i.activateADA()},i.prototype.activateADA=function(){var i=this,e=i.$slider.find("*").is(":focus");i.$slideTrack.find(".slick-active").attr({"aria-hidden":"false",tabindex:"0"}).find("a, input, button, select").attr({tabindex:"0"}),e&&i.$slideTrack.find(".slick-active").focus()},i.prototype.focusHandler=function(){var i=this;i.$slider.on("focus.slick blur.slick","*",function(e){e.stopImmediatePropagation();var t=$(this);setTimeout(function(){i.isPlay&&(t.is(":focus")?(i.autoPlayClear(),i.paused=!0):(i.paused=!1,i.autoPlay()))},0)})},$.fn.slick=function(){var e=this,t=arguments[0],o=Array.prototype.slice.call(arguments,1),s=e.length,n=0,l;for(n;s>n;n++)if("object"==typeof t||"undefined"==typeof t?e[n].slick=new i(e[n],t):l=e[n].slick[t].apply(e[n].slick,o),"undefined"!=typeof l)return l;return e}});