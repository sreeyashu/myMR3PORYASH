/*** Easy Banking Web - Public Site - JS ***/
/*** Date: 16 Sep 2015 - Iscroll not defined fix ***/
/*** Time: 3:44 hrs ***/
/*
 * jQuery Shorten plugin 1.0.0
 * Dual licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 */
(function($) {
	if ($("html").find("meta[name='viewport']").length == 0) {
        $("head").prepend('<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" />');
    }
	
    $.fn.shorten = function(settings) {

        var config = {
            showChars: 100,
            ellipsesText: "...",
            moreText: "more",
            lessText: "less"
        };

        if (settings) {
            $.extend(config, settings);
        }

        $(document).off("click", '.morelink');

        $(document).on({
            click: function() {

                var $this = $(this);
                if ($this.hasClass('less')) {
                    $this.removeClass('less');
                    $this.html(config.moreText);
                } else {
                    $this.addClass('less');
                    $this.html(config.lessText);
                }
                $this.parent().prev().toggle();
                $this.prev().toggle();
                return false;
            }
        }, '.morelink');

        return this.each(function() {
            var $this = $(this);
            if ($this.hasClass("shortened")) return;

            $this.addClass("shortened");
            var content = $this.html();
            if (content.length > config.showChars) {
                var c = content.substr(0, config.showChars);
                var h = content.substr(config.showChars, content.length - config.showChars);
                var html = c + '<span class="moreellipses">' + config.ellipsesText + ' </span><span class="morecontent"><span>' + h + '</span> <a href="#" class="morelink lnk_primary">' + config.moreText + '</a></span>';
                $this.html(html);
                $(".morecontent span").hide();
            }
        });

    };

})(jQuery);

/*
$(function() {
    if ($("html").find("meta[name='viewport']").length == 0) {
        $("head").prepend('<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" />');
    }
});
*/

var aPlyrCfgs = aPlyrCfgs || {},
    $html = null;
var PWS = {
    SCREEN: {
        LARGE: 1023,
        MEDIUM: 767
    },
    windowWidth: 0,
    init: function() {

        $html = $("html, body");
        this.windowWidth = window.innerWidth;

        this.setBeforeImage('.product_header');

        /* All features on ready */
        this.iosTouchSupport();
        this.features.productMatrix.removeEmptyColumn();
        this.features.productCarousel.init();
        this.features.FAQ.init();
        this.features.paraListScroller.init();
        this.features.upcomingEvents.init();
        this.features.cardSlider.init();
        this.splashPage.init();
        this.preFooterCustomFeedBack();
        /* if Android version less than 4.1 need to add margin top */
        if (parseFloat(this.getAndroidVersion()) < 4.1) {
            $(".modal-dialog").css("margin-top", "90px");
        }

        /* if HTC mobile Keypad on */
        var hTCNativeBrowser = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/534.24 (KHTML, like Gecko) Chrome/11.0.696.34 Safari/534.24';
        if ((/HTC/i.test(navigator.userAgent)) || (navigator.userAgent === hTCNativeBrowser)) {
            $(".modal .feedback textarea").focus(function() {


                var srollBottom = $(".modal.fade.in .modal-header").outerHeight(true) + $(".modal.fade.in .modal-body").outerHeight(true) + $(".modal.fade.in .feedBack_Slider_wrapper").outerHeight(true) + 500;

                setTimeout(function() {
                    $(".modal.fade.in").scrollTop(srollBottom);
                }, 500);

            });
        }
        /* Pointer events none for IE 9,10 */
        $("[href^='tel']").on("click", function(event) {
            if (PWS.windowWidth > PWS.SCREEN.MEDIUM) {
                if (((navigator.userAgent.indexOf('MSIE') !== -1) && (navigator.appVersion.indexOf("MSIE 9") !== -1)) || ((navigator.userAgent.indexOf('MSIE') !== -1) && (navigator.appVersion.indexOf("MSIE 10") !== -1))) {
                    event.preventDefault();
                }
            }
        });
        /*To enable anchor link in ipad */

    },
    features: { // Features used in PWS.
        lexicon: function() { // Lexicon
            if (typeof showLexicon !== "undefined" && showLexicon !== null) {
                /* showLexicon method return the lexicon value from xsl */
                var lexiconResponseVal = showLexicon(),
                    $elem;
                $(".lexicon").click(function() {
                    $elem = $(this);
                    $("#modelTitleID").html($elem.text().trim());
                    $("#modelContentID").html("");
                    var clickedLexiconItem = $elem.text().trim().toLowerCase();
                    $.each(lexiconResponseVal.lexicon, function(index, item) {
                        if (index.trim().toLowerCase() == clickedLexiconItem) {
                            $("#modelContentID").html(lexiconResponseVal.lexicon[index.trim()]);
                        }
                    });
                });
            }
        },
        featuredGrid: {
            init: function() { // Featured grid
                if ($(".featured_grid").length > 0) {
                    var $elem,
                        $grid_image_block = $(".featured_grid .block_image");
                    $grid_image_block.height("auto"); // Reset the image height to recalculate the height of the grid

                    equalheight(".featured_grid .fg_grid_block"); //Set equal height of each block in same level

                    $grid_image_block.each(function() {
                        $elem = $(this);
                        $elem.height($elem.closest(".fg_grid_content").outerHeight(true));
                    });
                }
            }
        },
        FAQ: { //  FAQ
            feedBack_Div: null,
            feebBack_Wrapper: null,
            feedBack_Slider: null,
            feedBack_Div_count: null,
            /* Initialize the FAQ carousel */
            init: function() {
                this.isFAQCarousel = false;
                this.enableControls = this.enableControls || false;
                this.faqSlider = null;
                this.feedBack_Div = $('.feedBack_Slider .customer_feedback');
                this.feebBack_Wrapper = $('.feedBack_Slider_wrapper');
                this.feedBack_Slider = $(".feedBack_Slider");
                this.feedBack_Div_count = this.feedBack_Div.length;
                this.faqCarousel();
                this.faqLinkClick();
                this.feedBackSlider();
                this.feedbackBtnClick();
            },
            /* Resize the faq carousel */
            resizeCarousel: function() {
                if (this.isFAQCarousel) { // Check if the slider is already created 
                    if ($("#modal_faq").css("display") === "none") {
                        if (this.faqSlider) {
                            this.faqSlider.destroySlider(); // Destroy the slider to create new width
                        }
                        this.faqCarousel(); // Create the slider to calculate new width
                    }
                }
            },
            // Create the slider
            faqCarousel: function() {
                this.isFAQCarousel = ($('#wcm-carousel').length > 0) ? true : false;
                if (this.isFAQCarousel) {
                    if ($('#wcm-carousel li').length > 1) {
                        $("#modal_faq").show();
                        this.faqSlider = $('#wcm-carousel').bxSlider({
                            controls: this.enableControls,
                            mode: 'horizontal',
                            autoDirection: 'next',
                            auto: false,
                            pager: this.enableControls,
                            touchEnabled: this.enableControls,
                            infiniteLoop: false,
                            speed: 500,
                            hideControlOnEnd: true,
                            onSliderLoad: function() { //on slide Load
                                $("#modal_faq").hide();
                            },
                            onSlideBefore: function() { //on slide Before                                          
                                var index = PWS.features.FAQ.faqSlider.getCurrentSlide(),
                                    slideWidth = null,
                                    cus_feedBack_Div = $('.feedBack_Slider .customer_feedback');
                                if (PWS.windowWidth <= PWS.SCREEN.MEDIUM) {
                                    slideWidth = window.innerWidth - 22;
                                } else {
                                    slideWidth = 742;
                                }
                                translationsLeft = "-" + (index * parseInt(slideWidth));
                                cus_feedBack_Div.find(".default_view").show();
                                cus_feedBack_Div.find(".feedback_form_view").hide();
                                cus_feedBack_Div.find(".feedback_thanks_view").hide();

                                //check ie9 and animate the slider                                                                                                                                                  
                                if ((navigator.userAgent.indexOf('MSIE') !== -1) && (navigator.appVersion.indexOf("MSIE 9") !== -1)) {
                                    $(".feedBack_Slider").animate({
                                        left: translationsLeft
                                    }, 500);
                                } else {
                                    $(".feedBack_Slider").css({
                                        '-o-transition-duration': '0.5s',
                                        '-ms-transition-duration': '0.5s',
                                        '-moz-transition-duration': '0.5s',
                                        '-webkit-transition-duration': '0.5s',
                                        'transition-duration': '0.5s',
                                        '-o-transform': 'translate3d(' + translationsLeft + 'px, 0px,0px)',
                                        '-ms-transform': 'translate3d(' + translationsLeft + 'px, 0px,0px)',
                                        '-moz-transform': 'translate3d(' + translationsLeft + 'px, 0px,0px)',
                                        '-webkit-transform': 'translate3d(' + translationsLeft + 'px, 0px,0px)',
                                        'transform': 'translate3d(' + translationsLeft + 'px, 0px,0px)'
                                    });
                                }
                            },
                            onSlideAfter: function() { //on slide After                       

                            }
                        });
                    }
                }
            },
            // FAQ link  click
            faqLinkClick: function() {
                var questionNo = 0;


                $('.faq_block .lnk_primary').on('click', function(e) {
                    e.preventDefault();
                    questionNo = parseInt($(this).parent().index());
                    var scroll_top = $("body").scrollTop();
                    var doc = document.documentElement;
                    this.left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
                    this.top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
                    var scroll_topY = this.top;
                    //$("html,body").addClass("noscroll");                
                    $("html").addClass("noscroll");

                    var isTouchEnabled = (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (
                        navigator.msMaxTouchPoints > 0));
                    var isIE = (navigator.userAgent.indexOf('MSIE') !== -1);
                    if (isIE && !isTouchEnabled) {
                        $("body").css({
                            "position": ""
                        });
                    } else {
                        $("body").css({
                            "position": "fixed"
                        });
                    }
                    $("body").css({
                        "top": "-" + scroll_topY + "px"
                    });

                    if ($('#wcm-carousel li').length > 1) {
                        $("#modal_faq").on("shown.bs.modal", function() {
                            PWS.features.FAQ.faqSlider.goToSlide(questionNo);
                            $('.feedBack_Slider .customer_feedback').eq(questionNo).show();
                        });
                        $("#modal_faq").on("hidden.bs.modal", function() {
                            //$("html,body").removeClass("noscroll"); 
                            $("html").removeClass("noscroll");
                            $("body").css({
                                "position": "",
                                "top": ""
                            });
                            $("body").scrollTop(scroll_topY);
                        });
                    } else {

                        $("#modal_faq").on("shown.bs.modal", function() {
                            $('.feedBack_Slider .customer_feedback').eq(questionNo).show();
                        });
                        $("#modal_faq").on("hidden.bs.modal", function() {
                            //$("html,body").removeClass("noscroll"); 
                            $("html").removeClass("noscroll");
                            $("body").css({
                                "position": "",
                                "top": ""
                            });
                            $("body").scrollTop(scroll_topY);
                        });
                    }
                });
            },
            // Intialize FAQ customer feedback slider 
            feedBackSlider: function() {
                try {
                    if ($('#wcm-carousel li').length > 1) {
                        if (PWS.windowWidth <= PWS.SCREEN.MEDIUM) {
                            if (navigator.userAgent.indexOf("Lumia 925") !== -1) {
                                $('#wcm-carousel > li').width(window.innerWidth - 18);
                            } else {
                                $('#wcm-carousel > li').width(window.innerWidth - 22); /* 22 is the marging left & right*/

                            }
                        }
                        this.feebBack_Wrapper.width($('#wcm-carousel > li').innerWidth());
                        var feebBack_form_padding = parseInt(this.feedBack_Div.css("padding-left")) + parseInt(this.feedBack_Div.css("padding-right")),
                            feebBack_Wrapper_width = this.feebBack_Wrapper.width() - feebBack_form_padding,
                            slidersLi_width = $('#wcm-carousel > li').innerWidth();
                        this.feedBack_Div.width(feebBack_Wrapper_width);
                        this.feedBack_Slider.width(this.feedBack_Div_count * slidersLi_width);
                    } else {
                        if (PWS.windowWidth <= PWS.SCREEN.MEDIUM) {
                            $('.feedBack_Slider_wrapper,.feedBack_Slider').width(window.innerWidth - 22);
                        } else {
                            $('.feedBack_Slider_wrapper,.feedBack_Slider').width(742);
                        }
                    }
                } catch (err) {

                };
            },
            // Click FAQ customer feedback slider 
            feedbackBtnClick: function() {
                var closest_Div = null;
                $(".modal_faq .default_view .btn").on('click', function() {
                    closest_Div = $(this).closest(".customer_feedback");
                    closest_Div.find(".default_view").slideUp();
                    closest_Div.find(".feedback_form_view").slideDown();

                });
                $(".modal_faq .feedback_form_view .btn").on('click', function() {
                    closest_Div = $(this).closest(".customer_feedback");
                    closest_Div.find(".feedback_form_view").slideUp();
                    closest_Div.find(".feedback_thanks_view").slideDown();
                });
            },
            // Resize FAQ customer feedback slider 
            feedBackResize: function() {
                try {
                    var current_index = 0,
                        translationsLeft = 0,

                        feebBack_form_width = parseInt($(".modal-dialog").css("width")) - 2;
                    if (PWS.windowWidth <= PWS.SCREEN.MEDIUM) {
                        feebBack_form_padding = 90;
                        feebBack_form_width = window.innerWidth - 22;
                    } else {
                        feebBack_form_padding = 100;
                        feebBack_form_width = 742;

                    }
                    if ($('#wcm-carousel li').length > 1) {
                        current_index = PWS.features.FAQ.faqSlider.getCurrentSlide();
                    }
                    translationsLeft = "-" + current_index * feebBack_form_width;
                    this.feebBack_Wrapper.width(feebBack_form_width);
                    this.feedBack_Div.width(feebBack_form_width - feebBack_form_padding);
                    this.feedBack_Slider.width(this.feedBack_Div_count * feebBack_form_width);
                    this.feedBack_Slider.css({
                        '-o-transition-duration': '0.5s',
                        '-ms-transition-duration': '0.5s',
                        '-moz-transition-duration': '0.5s',
                        '-webkit-transition-duration': '0.5s',
                        'transition-duration': '0.5s',
                        '-o-transform': 'translate3d(' + translationsLeft + 'px, 0px,0px)',
                        '-ms-transform': 'translate3d(' + translationsLeft + 'px, 0px,0px)',
                        '-moz-transform': 'translate3d(' + translationsLeft + 'px, 0px,0px)',
                        '-webkit-transform': 'translate3d(' + translationsLeft + 'px, 0px,0px)',
                        'transform': 'translate3d(' + translationsLeft + 'px, 0px,0px)'
                    });
                } catch (err) {

                };
            }
        },
        productCarousel: { // product Carousel 
            init: function() {
                if ($('#sliderpws').length > 0) {
                    this.isProductCarouselEnabled = false;
                    this.pcSlider = null;
                    this.controlCarousal();
                }
            },
            /* Create product Carousel */
            controlCarousal: function() {
                try {
                    if ($('#sliderpws').length > 0) {
                        var $sliderBlock = $("#sliderpws > .detail_block");

                        if ($sliderBlock.length < 4) {
                            this.isProductCarouselEnabled = ((($sliderBlock.eq(0).outerWidth(true) * $sliderBlock.length) +
                                    (parseInt($sliderBlock.eq(1).css("margin-left")) * $sliderBlock.length)) >
                                $(".container_fluid").width()) ? true : false;
                        } else {
                            this.isProductCarouselEnabled = true;
                        }

                        if (this.pcSlider) {
                            this.pcSlider.destroySlider();
                        }

                        if (this.isProductCarouselEnabled && PWS.windowWidth <= PWS.SCREEN.LARGE) {

                            var minSlides = 1,
                                maxSlides = 2;
                            slideMargin = 10;

                            if (PWS.windowWidth > PWS.SCREEN.MEDIUM && PWS.windowWidth <= PWS.SCREEN.LARGE) {
                                minSlides = 2;
                                maxSlides = 3;
                                slideMargin = 20;
                            }

                            this.pcSlider = $('#sliderpws').bxSlider({
                                controls: true,
                                mode: 'horizontal',
                                autoDirection: 'next',
                                auto: false,
                                minSlides: minSlides,
                                slideWidth: 280,
                                maxSlides: maxSlides,
                                moveSlides: 1,
                                slideMargin: slideMargin,
                                infiniteLoop: false,
                                oneToOneTouch: false,
                                pager: true,
                                hideControlOnEnd: true
                            });
                        }

                        equalheight('.product_carousel .detail_block .detail_inner h2');
                        equalheight('.product_carousel .detail_block .detail_inner p');
                        equalheight('.product_carousel .detail_block .detail_inner');
                        equalheight('.product_carousel .detail_block > div');
                    }
                } catch (err) {};
            }
        },
        /* Create product Matrix */
        productMatrix: {
            init: function() {
                if ($(".product_matrix").length > 0) {
                    this.pm_slider = [];
                    this.equalHeightMatrix();
                    this.mobileHTML();
                }
            },
            removeEmptyColumn: function() { //Remove Empty Column from product Matrix 
                var $column;
                for (var iterator = 0; iterator < $(".product_matrix").length; iterator++) {
                    $column = $(".product_matrix:eq(" + iterator + ")").find(".pm_slider_wrapper .pm_col");
                    for (var i = 0; i < $column.length; i++) {
                        if ($.trim($column.eq(i).find(".pm_col_header h2").text()).length == 0) {
                            $column.eq(i).remove();
                        }
                    }
                }
            },
            resetSlider: function(iterator) { // Reset the product Matrix Slider
                $(".product_matrix:eq(" + iterator + ") .bx-viewport").removeClass("transitionEnd");
                if (this.pm_slider[iterator]) {
                    this.pm_slider[iterator].destroySlider();
                }
                $(".product_matrix:eq(" + iterator + ") .pm_content").height("auto");
            },
            equalHeightMatrix: function() { // Equalize the height in product Matrix
                try {
                    if ($(".product_matrix").length > 0) {
                        for (var iterator = 0; iterator < $(".product_matrix").length; iterator++) {
                            var row = $(".product_matrix:eq(" + iterator + ") .pm_col:eq(0) .pm_content").length,
                                col = $(".product_matrix:eq(" + iterator + ") .pm_col").length;

                            this.resetSlider(iterator);

                            if (PWS.windowWidth <= PWS.SCREEN.LARGE) {

                                $(".product_matrix:eq(" + iterator + ") .pm_slider_wrapper .pm_col").removeAttr("style");

                                this.pm_slider[iterator] = $(".product_matrix:eq(" + iterator + ") .pm_slider_wrapper").bxSlider({
                                    controls: true,
                                    mode: 'horizontal',
                                    autoDirection: 'next',
                                    auto: false,
                                    pager: true,
                                    infiniteLoop: false,
                                    oneToOneTouch: false,
                                    hideControlOnEnd: true
                                });
                                $(".product_matrix:eq(" + iterator + ") .bx-viewport").addClass("transitionEnd");

                                $(".product_matrix .bx-pager").unbind("click");
                                $(".product_matrix .bx-pager a").on("click", function(e) {
                                    e.preventDefault();
                                });
                            } else {
                                try {
                                    var width = $(".product_matrix:eq(" + iterator + ") .pm_slider_wrapper").width() / $(".product_matrix:eq(" + iterator + ") .pm_slider_wrapper .pm_col").length;
                                    $(".product_matrix:eq(" + iterator + ") .pm_slider_wrapper .pm_col").css({
                                        "width": width + "px",
                                        "max-width": width + "px"
                                    });
                                } catch (err) {

                                };
                            }

                            if (PWS.windowWidth > PWS.SCREEN.MEDIUM) {
                                for (var i = 0; i < row; i++) {
                                    var arr = [];
                                    var maxArr = 0;
                                    for (var j = 0; j < col; j++) {
                                        arr.push($(".product_matrix:eq(" + iterator + ") .pm_col").eq(j).find('.pm_content').eq(i).height());
                                    }
                                    maxArr = Math.max.apply(Math, arr);

                                    for (var j = 0; j < col; j++) {
                                        $(".product_matrix:eq(" + iterator + ") .pm_col").eq(j).find('.pm_content').eq(i).height(maxArr);
                                    }
                                }
                            } else {
                                $(".pm_content").height("auto");
                            }
                        }
                    }
                } catch (err) {}
            },
            mobileHTML: function() { // Generate dynamic HTML for Mobile Accordian view
                for (var iterator = 0; iterator < $(".product_matrix").length; iterator++) {
                    var row = $(".product_matrix:eq(" + iterator + ") .pm_col:eq(0) .pm_content").length,
                        col = $(".product_matrix:eq(" + iterator + ") .pm_col").length;

                    var html = '<div class="col span_12 product_matrix_wrapper product_matrix_small"><div class="panel-group" id="product_matrix_accordion' + iterator + '">';

                    for (i = 1; i < col; i++) {
                        html += '<div class="pm_col panel panel-default">';

                        html += '<div class="pm_content pm_header panel-heading">' +
                            '<div class="pm_col_header">' +
                            '<h2>' +
                            '<a data-parent="#product_matrix_accordion' + iterator + '" class="accordion-toggle' + (i > 1 ? " collapsed" : "") + '" data-toggle="collapse" href="#product_matrix_accordion' + iterator + '_collapse' + i + '">' +
                            $(".product_matrix:eq(" + iterator + ") .pm_slider_wrapper .pm_col:eq(" + (i - 1) + ") .pm_header h2").text() +
                            '<span class="fontcon-arrow-up"></span><span class="fontcon-arrow-down"></span>' +
                            '</a>' +
                            '</h2>' +
                            '</div>' +
                            '</div>'; // Header

                        html += '<div class="pm_content panel-collapse collapse' + (i == 1 ? " in" : "") + '" id="product_matrix_accordion' + iterator + '_collapse' + i + '">'; // Body

                        html += '<div class="pm_hdr_desc">' + $(".product_matrix:eq(" + iterator + ") .pm_slider_wrapper .pm_col:eq(" + (i - 1) + ") .pm_col_content").html() + '</div>';

                        for (j = 1; j < row; j++) {
                            if ($.trim($(".product_matrix:eq(" + iterator + ") .pm_col:eq(" + i + ") .pm_content:eq(" + j + ") .pm_col_content").text()).length > 0) { // Check if content is empty, if false only then bind this to DOM
                                html += '<div class="panel-body">';

                                html += '<div class="pm_content pm_header">' + $(".product_matrix:eq(" + iterator + ") .pm_row_header .pm_content:eq(" + (j) + ")").html() + '</div>';

                                html += '<div class="pm_content">' + $(".product_matrix:eq(" + iterator + ") .pm_col:eq(" + i + ") .pm_content:eq(" + j + ")").html() + '</div>';

                                html += '</div>';
                            }
                        }

                        html += '</div>';

                        html += '</div>';
                    }
                    html += '</div></div>';

                    $(".product_matrix:eq(" + iterator + ")").addClass("product_matrix_large").find(".product_matrix_wrapper").after(html);
                }
                $('.product_matrix .panel-group').on('shown.bs.collapse', function(e) {
                    $html.animate({
                        scrollTop: $(e.target).prev().offset().top
                    });
                });
            }
        },
        paraListScroller: { // document list
            init: function() {
                var $paraListParent = $(".paragraph_list"),
                    $docList = null,
                    $paraDocList = $(".paragraph_doc_list"),
                    $paraText = null;

                if ($paraListParent.length > 0) {
                    this.paraScroll = this.paraScroll || [];
                    var listObj = this;
                    if (PWS.windowWidth >= PWS.SCREEN.MEDIUM) {
                        this.destroyScroller();

                        $paraDocList.removeClass("i-scroll");
                        $paraListParent.removeClass("show_items").each(function(i) {
                            $docList = $(this).find(".paragraph_doc_list");
                            $paraText = $(this).find(".paragraph_doc_text");

                            $docList.height($paraText.height()).attr("id", "doc_list_" + i); // To add dynamic scroll for multiple doc list paragraph.

                            if (PWS.detectIE()) {
                                $paraDocList.addClass("i-scroll");
                            } else {
                                var scrollList = new IScroll("#doc_list_" + i, {
                                    click: true,
                                    tap: true,
                                    scrollbars: true,
                                    mouseWheel: true,
                                    interactiveScrollbars: true,
                                    shrinkScrollbars: 'scale'

                                });

                                listObj.paraScroll.push(scrollList);
                            }
                        });

                    } else {
                        // Destroy IScroll;
                        if (!PWS.detectIE()) {
                            this.destroyScroller();
                        }

                        $paraListParent.removeClass("show_items").each(function(i) {
                            var $parentThat = $(this),
                                $docList = $parentThat.find(".paragraph_doc_list"),
                                listHeight = $paraListParent.find(".paragraph_doc_list").find("li:eq(0)").outerHeight(true);

                            if ($parentThat.find(".list_inner li").length > 2) {

                                $docList.height(listHeight * 2);

                                $parentThat.find(".para_block_btn .show-all").css("display", "block").on("click", function(e) {
                                    e.preventDefault();
                                    var $currentList = $(this),
                                        $listElement = $currentList.closest(".paragraph_list").find(".paragraph_doc_list");

                                    $listElement.stop().animate({
                                        height: listHeight * $listElement.find("li").length
                                    }, 300, function() {
                                        $currentList.closest(".paragraph_list").addClass("show_items")
                                    });
                                });

                                $parentThat.find(".para_block_btn .show-less").css("display", "none").on("click", function(e) {
                                    e.preventDefault();
                                    var $currentList = $(this),
                                        $listElement = $currentList.closest(".paragraph_list").find(".paragraph_doc_list");

                                    $listElement.stop().animate({
                                        height: listHeight * 2
                                    }, 300, function() {
                                        $currentList.closest(".paragraph_list").removeClass("show_items");
                                    });
                                    $("body").stop().animate({
                                        scrollTop: $listElement.offset().top
                                    }, 300);
                                });
                            } else {
                                $parentThat.find(".paragraph_doc_list").height("auto");
                                $parentThat.find(".para_block_btn").hide();
                            }
                        });
                    }
                }
            },
            destroyScroller: function() { // Destroy IScroll;
                if (this.paraScroll.length > 0) {
                    for (var i = 0; i < this.paraScroll.length; i++) {
                        if (this.paraScroll[i]) {
                            this.paraScroll[i].destroy();
                            this.paraScroll[i] = null;
                        }
                    }
                    this.paraScroll = [];
                    $(".paragraph_list").find(".list_inner").removeAttr("style");
                }
            }
        },
        upcomingEvents: { // upcoming events;
            init: function() {
                if ($(".upcoming_event").length > 0) {
                    equalheight('.upcoming_event .detail_inner.upcoming');
                }
            }
        },
        optionalContainer: { // optional Container
            init: function() {
                if ($(".optional_container").length > 0) {
                    equalheight('.optional_content .optional_block');
                }
            }
        },
        cardSlider: { // card Slide
            slideArrayOut: [],
            slideArrayIn: [],
            $cardSlider: null,
            init: function() {
                this.$cardSlider = $(".card_slide .product_btn"),
                    this.initialHeightCard = this.$cardSlider.find(".card_item_1").outerHeight(true);
                if (this.$cardSlider.length > 0) {

                    this.cardDateTimePicker.dateInit();
                    this.cardDateTimePicker.timeInit();

                    cardObj = this;

                    $(".default_input_field").on("click", function() {
                        $(".default_input_field").removeClass("focus");
                        $(this).addClass("focus");
                        cardObj.formValidation.removeError($(this).parent());
                    });

                    $(".cta_card_slideUpward").on("click", function(e) {
                        e.preventDefault();
                        var $card2 = $(".card_item:gt(0)");

                        cardObj.cardAnimation.slideUp($(this).closest(".card_item"), $card2);
                        cardObj.$cardSlider.addClass("cardSlided");
                        if (PWS.windowWidth <= PWS.SCREEN.MEDIUM) {
                            PWS.lastWindowWidth = PWS.windowWidth;
                            cardObj.$cardSlider.find(".card_item_wrapper").stop().animate({
                                height: 350
                            }, 400, function() {
                                $html.animate({
                                    scrollTop: $card2.offset().top - $('.header .nav_header').outerHeight()
                                });
                            });
                        }
                    });

                    $(".cta_slideBackward").on("click", function(e) {
                        e.preventDefault();
                        $(".default_input_field").removeClass("focus");
                        if (cardObj.slideArrayOut.length == 0 && cardObj.slideArrayIn.length == 0) {
                            cardObj.cardAnimation.slideDown($(".card_item:eq(0)"), $(".card_item:gt(0)"));

                            if (PWS.windowWidth <= PWS.SCREEN.MEDIUM) {
                                cardObj.$cardSlider.find(".card_item_wrapper").stop().animate({
                                    height: $(".card_slide .product_btn").find(".card_item_1").outerHeight(true)
                                }, 300, function() {
                                    $html.animate({
                                        scrollTop: $(".card_item:eq(0)").offset().top
                                    });
                                });
                            }
                            $(".cardSlided").removeClass("cardSlided");
                        } else {
                            cardObj.cardAnimation.slideRight(cardObj.slideArrayOut.pop(), cardObj.slideArrayIn.pop());
                        }
                    });

                    $(".cta_slideForward").on("click", function(e) {
                        e.preventDefault();
                        var $el = $(this),
                            classValue = "." + $el.attr("href").substring(1),
                            $card_item = $el.closest(".card_item");

                        cardObj.slideArrayIn.push($(classValue));
                        cardObj.slideArrayOut.push($("." + $card_item.attr("class").split(" ")[1]));

                        cardObj.cardAnimation.slideLeft($card_item, $(classValue));
                    });

                    $(".cta_formValidation").on("click", function(e) {
                        e.preventDefault();
                        var isError = false,
                            $card_item = $(this).closest(".card_item");

                        $("#contact_form input").each(function() {
                            if (cardObj.formValidation.isEmpty($(this))) {
                                $(this).parent().parent().addClass("field_error");
                                isError = true;
                                return;
                            }
                        });

                        cardObj.slideArrayOut.push($card_item);

                        if (isError) {
                            cardObj.cardAnimation.slideLeft($card_item, $(".card_item_6"));
                            cardObj.slideArrayIn.push($(".card_item_6"));
                        } else {
                            cardObj.cardAnimation.slideLeft($card_item, $(".card_item_7"));
                            cardObj.slideArrayIn.push($(".card_item_7"));
                        }
                    });
                    if (PWS.windowWidth <= PWS.SCREEN.MEDIUM) {
                        if ($(".product_header .card_item_1 .btn_default").hasClass("cta_card_slideUpward")) {
                            $(".product_header .card_item_1 .block_btn").css("display", "block");
                            cardObj.$cardSlider.find(".card_item_wrapper").height(59);
                        } else {
                            cardObj.$cardSlider.find(".card_item_wrapper").height(0);
                        }
                        //cardObj.$cardSlider.find(".card_item_wrapper").height(this.$cardSlider.find(".card_item_1 .block_btn").height()+parseInt(this.$cardSlider.find(".card_item_1 .block_btn").css("padding-bottom")));

                        $(".card_item:gt(1)").css({
                            left: this.$cardSlider.width(),
                            bottom: -350
                        });
                    } else {
                        cardObj.$cardSlider.find(".card_item_wrapper").removeAttr("style");
                        $(".product_header .card_item_1 .block_btn").removeAttr("style");
                    }
                }
            },
            resizeCard: function() { // resize card Slide
                try {
                    if (this.$cardSlider.length > 0) {
                        this.initialHeightCard = this.$cardSlider.find(".card_item_1").outerHeight(true);
                        if (PWS.windowWidth <= PWS.SCREEN.MEDIUM) {
                            this.slideArrayIn = [];
                            this.slideArrayOut = [];
                            $(".card_item").css({
                                bottom: 0,
                                left: 0
                            });
                            $(".card_item:gt(0)").css({
                                bottom: -350
                            });
                            $(".card_item:gt(1)").css("left", $(".product_btn").width());
                            this.$cardSlider.css("height", "auto").removeClass("cardSlided");
                            //this.$cardSlider.find(".card_item_wrapper").removeAttr("style");
                            if ($(".product_header .card_item_1 .btn_default").hasClass("cta_card_slideUpward")) {
                                $(".product_header .card_item_1 .block_btn").css("display", "block");
                                this.$cardSlider.find(".card_item_wrapper").height(59);
                            } else {
                                this.$cardSlider.find(".card_item_wrapper").height(0);
                            }
                        } else if (PWS.windowWidth > PWS.SCREEN.MEDIUM && !$(".cardSlided").hasClass("cardSlided")) {
                            this.slideArrayIn = [];
                            this.slideArrayOut = [];
                            $(".card_item").css({
                                bottom: 0,
                                left: 0
                            });
                            $(".card_item:gt(0)").css({
                                bottom: -350
                            });
                            $(".card_item:gt(1)").css({
                                left: 310
                            });
                            this.$cardSlider.find(".card_item_wrapper").removeAttr("style");
                            $(".product_header .card_item_1 .block_btn").removeAttr("style");
                        }
                    }
                } catch (err) {}
            },
            cardAnimation: { // card slide Animation
                DURATION: 400,
                _QUEUE: false,
                slideUp: function($card1, $card2) {
                    var y = "+=" + parseInt($card2.outerHeight(true), 10) + "px"; // Find the height

                    /* Move the card up */
                    $card1.stop().animate({
                        bottom: y
                    }, {
                        duration: this.DURATION,
                        queue: this._QUEUE,
                        easing: 'linear'
                    });

                    $card2.stop().animate({
                        bottom: y
                    }, {
                        duration: this.DURATION,
                        queue: this._QUEUE,
                        easing: 'linear'
                    });
                },
                slideDown: function($card1, $card2) {
                    var y = "-=" + parseInt($card2.outerHeight(true), 10) + "px"; // Find the height

                    /* Move the card down */
                    $card1.stop().animate({
                        bottom: y
                    }, {
                        duration: this.DURATION,
                        queue: this._QUEUE,
                        easing: 'linear'
                    });

                    $card2.stop().animate({
                        bottom: y
                    }, {
                        duration: this.DURATION,
                        queue: this._QUEUE,
                        easing: 'linear'
                    });
                },
                slideLeft: function($card1, $card2) {
                    var x = "-=" + parseInt($card1.outerWidth(true), 10) + "px"; // Find the width

                    /* Move the card left */
                    $card1.stop().animate({
                        left: x
                    }, {
                        duration: this.DURATION,
                        queue: this._QUEUE,
                        easing: 'linear'
                    });

                    $card2.stop().animate({
                        left: x
                    }, {
                        duration: this.DURATION,
                        queue: this._QUEUE,
                        easing: 'linear'
                    });
                },
                slideRight: function($card1, $card2) {
                    var x = "+=" + parseInt($card1.outerWidth(true), 10) + "px"; // Find the width

                    /* Move the card right */
                    $card1.stop().animate({
                        left: x
                    }, {
                        duration: this.DURATION,
                        queue: this._QUEUE,
                        easing: 'linear'
                    });

                    $card2.stop().animate({
                        left: x
                    }, {
                        duration: this.DURATION,
                        queue: this._QUEUE,
                        easing: 'linear'
                    });
                }
            },
            cardDateTimePicker: {
                dateInit: function() {
                    if ($('#cardCalendar').length > 0) {
                        $('#cardCalendar .card_content').datepicker({
                            format: 'dd.mm.yyyy',
                            weekStart: 1,
                            startDate: this.startDate,
                            endDate: this.endDate,
                            autoclose: true
                        }).on('changeDate', function(ev) {
                            $("#card_date").val(ev.format()).next().hide();
                            cardObj.cardAnimation.slideRight(cardObj.slideArrayIn.pop(), cardObj.slideArrayOut.pop());
                        }).data('datepicker');
                    }
                },
                timeInit: function() {
                    if ($('#cardHourPicker').length > 0) {
                        $("#cardHourPicker li").on("click", function() {
                            $("#card_time").val($(this).find("span:eq(0)").text() + "-" + $(this).find("span:eq(2)").text()).next().hide();
                            cardObj.cardAnimation.slideRight(cardObj.slideArrayIn.pop(), cardObj.slideArrayOut.pop());
                        });

                        $("#card_hour_wrapper").height($("#card_hour_wrapper").closest(".card_item").outerHeight(true) - $("#card_hour_wrapper").closest(".card_item").find(".card_header").outerHeight(true) - $(".card_hour_header").outerHeight(true));

                        if (PWS.detectIE()) {
                            $("#card_hour_wrapper").addClass("i-scroll");
                        } else {
                            var cardHourScroller = new IScroll('#card_hour_wrapper', {
                                scrollbars: true,
                                mouseWheel: true,
                                interactiveScrollbars: true,
                                shrinkScrollbars: 'scale',
                                fadeScrollbars: true
                            });
                        }
                    }
                }
            },
            formValidation: {
                isEmpty: function($el) {
                    if ($.trim($el.val()).length == 0 || $.trim($el.val()) === "") {
                        return true;
                    } else {
                        return false;
                    }
                },
                removeError: function($el) {
                    $el.removeClass("field_error");
                }
            }
        },
        homeSlider: { //Home slider
            $homeHeader: null,
            $slider_ul: null,
            $slider_li: null,
            slideCount: null,
            sliderItemWidth: null,
            enableSliderControls: true,
            homeSlider: null,
            curSlide: 0,
            sliderPager: $("#home_header").clone(),
            init: function() {
                if ($(".home_header").length > 0) {
                    this.$homeHeader = $(".home_header");
                    this.$slider_ul = this.$homeHeader.find('ul.slides');
                    this.$slider_li = this.$slider_ul.find('li');
                    this.slideCount = this.$slider_li.length;

                    this.animateSliderText(0, this.$homeHeader.find(".detail_block:eq(0) .home_header_block_text").html());

                    this.buildSlider();
                    this.assignNavEvents();
                }
            },
            assignNavEvents: function() {
                var sliderObj = this;
                sliderObj.$homeHeader.find(".detail_block").on("click", function(e) {
                    e.preventDefault();
                    var $this = $(this),
                        html = $this.find(".home_header_block_text").html(),
                        index = $this.index();
                    if (!$this.hasClass("active")) {
                        sliderObj.$homeHeader.find(".detail_block").removeClass("active");
                        $this.addClass("active");
                        sliderObj.animateSliderText(index, html);
                        sliderObj.homeSlider.goToSlide($this.index());
                    }
                });
            },
            buildSlider: function() { //Intialize Home slider
                if ($(".home_header").length > 0) {
                    var sliderObj = this;
                    sliderObj.resizeSlider();

                    if (sliderObj.homeSlider) {
                        sliderObj.homeSlider.reloadSlider({
                            controls: sliderObj.enableSliderControls,
                            autoDirection: 'next',
                            auto: false,
                            oneToOneTouch: false,
                            pagerCustom: sliderObj.sliderPager,
                            infiniteLoop: false,
                            pager: true,
                            hideControlOnEnd: true,
                            onSlideBefore: function($slideElement, oldIndex, newIndex) {
                                sliderObj.animateSliderText(newIndex, sliderObj.$homeHeader.find(".detail_block").eq(newIndex).find(".home_header_block_text").html());
                                sliderObj.curSlide = newIndex;

                                if (PWS.windowWidth <= PWS.SCREEN.LARGE) {
                                    $(".home_header_text h2").shorten({
                                        moreText: "",
                                        lessText: "",
                                        showChars: 100
                                    });
                                }
                            },
                            onSliderLoad: function() {
                                sliderObj.animateSliderText(sliderObj.curSlide, sliderObj.$homeHeader.find(".detail_block:eq(0) .home_header_block_text").html());
                                sliderObj.homeSlider.goToSlide(sliderObj.curSlide);
                            }
                        });
                    } else {
                        sliderObj.homeSlider = $('.slides').bxSlider({
                            controls: sliderObj.enableSliderControls,
                            mode: 'horizontal',
                            autoDirection: 'next',
                            auto: false,
                            infiniteLoop: false,
                            oneToOneTouch: false,
                            pagerCustom: sliderObj.sliderPager,
                            pager: true,
                            hideControlOnEnd: true,
                            onSlideBefore: function($slideElement, oldIndex, newIndex) {
                                sliderObj.animateSliderText(newIndex, sliderObj.$homeHeader.find(".detail_block").eq(newIndex).find(".home_header_block_text").html());
                                sliderObj.curSlide = newIndex;

                                if (PWS.windowWidth <= PWS.SCREEN.LARGE) {
                                    $(".home_header_text h2").shorten({
                                        moreText: "",
                                        lessText: "",
                                        showChars: 100
                                    });
                                }
                            }
                        });
                    }
                }
            },
            resizeSlider: function() { //Resize Home slider
                this.$homeHeader.find(".detail_block").removeClass("active");
                this.$homeHeader.find(".detail_block:eq(0)").addClass("active");

                if (PWS.windowWidth <= PWS.SCREEN.LARGE) {
                    this.sliderPager = null;
                } else {
                    this.sliderPager = $("#home_header").clone();
                }

            },
            animateSliderText: function(index, html) { //Animate Slider text in Home slider
                this.$homeHeader.find(".block_top_arrow").stop().animate({
                    top: 2
                }, 300);
                this.$homeHeader.find(".block_top_arrow").eq(index).stop().animate({
                    top: -14
                }, 300);

                $(".home_header_text .block_text .sl_wr").css("opacity", 0).animate({
                    opacity: 1
                }, 1000).find(".sl_anim").css("left", $(".home_header_text").outerWidth(true)).stop().animate({
                    left: 0
                }, 600).html(html);
            }
        }
    },
    splashPage: { //Splash Page
        init: function() {
            if ($(".splash-menu").length > 0) {
                this.$splash_menu = $(".splash-menu");
                this.$spash_list_heading = this.$splash_menu.find(".panel-heading");
                this.$spash_list_li = this.$splash_menu.find(" > li");
                this.$spash_list_heading_a = this.$splash_menu.find(".panel-heading a");

                this.listViewEventBinding();
            }
        },
        listViewEventBinding: function() {
            var listView = this;
            listView.$spash_list_li.removeClass("active");
            listView.$splash_menu.find(".in").collapse("hide");

            listView.$spash_list_heading.click(function(event) {

                var $current = $(this);
                if (PWS.windowWidth < PWS.SCREEN.MEDIUM) {
                    event.preventDefault();

                    if (!$current.parent().hasClass('active')) {
                        listView.$splash_menu.find('.active').removeClass("active");
                    }
                    $current.parent().toggleClass("active");

                } else {
                    return false;
                }

            });
            /* listView.$spash_list_heading.on("click", function(e) {
                 if (PWS.windowWidth <= PWS.SCREEN.MEDIUM) {
                     e.preventDefault();
                     listView.$splash_menu.find(".in").on("hidden.bs.collapse", function() {
                         $(this).prev().find('a').closest("li").removeClass("active");
                     }).collapse("toggle");
                     $(this).next().on("show.bs.collapse", function() {
                         $(this).prev().find('a').closest("li").addClass("active");
                     }).collapse("toggle");
                 }
             });*/



            listView.$spash_list_heading.on("mouseover touchstart", function() {
                if (PWS.windowWidth > PWS.SCREEN.MEDIUM) {
                    listView.$spash_list_li.removeClass("active");
                    $(this).closest("li").addClass("active");
                }
            });
            $(document).mousemove(function(e) {
                if (PWS.windowWidth > PWS.SCREEN.MEDIUM) {
                    var clicked = $(e.target) ? $(e.target) : $(event.srcElement);

                    if (clicked.parents().is('.splash-menu') || clicked.parents().is('.splash-menu > li ul')) {
                        return;
                    } else {
                        listView.$spash_list_li.removeClass("active").find(".in").collapse("hide");
                    }
                }
            });
        },
        resizeSet: function() { //Resize Splash Page 
            /*if ($(".splash-menu").length > 0) {
                if (PWS.windowWidth > PWS.SCREEN.MEDIUM) {
                    this.$splash_menu.find(".in").collapse("hide");
                } else {
                    this.$splash_menu.find(".active .collapse").collapse("show");
                }
            }*/
            if ($(".splash-menu").length > 0) {
                if (PWS.windowWidth >= PWS.SCREEN.MEDIUM) {
                    this.$splash_menu.find('.panel-collapse').removeAttr("style");
                }
            }
        }
    },

    legalDisclaimer: function(moreText, lessText) { //legal Disclaimer
        PWS.windowWidth = window.innerWidth;

        this.showMore = this.showMore || moreText;
        this.Less = this.Less || lessText;
        var legal_element = $('.legal_short'),
            that = this,
            legal_text = legal_element.text();
        if (legal_text.length > 250 && PWS.windowWidth <= PWS.SCREEN.MEDIUM) {
            legal_element.each(function() {
                if (!$(this).hasClass("opened")) {
                    legal_text = $(this).text().replace(/(\w+?)$/, '').replace(that.showMore, "").replace("... ", "");
                    var txt_length = legal_text.length,
                        first_sentence = legal_text.slice(0, 250),
                        last_sentence = legal_text.slice(250, txt_length);
                    if (PWS.windowWidth < 600) {
                        first_sentence = legal_text.slice(0, 175);
                        last_sentence = legal_text.slice(175, txt_length)
                    }
                    $(this).html(
                        first_sentence + '<span>... </span><a href="#" class="more lnk_primary">' + that.showMore + '</a>' +
                        '<span style="display:none;">' + last_sentence + ' <a href="#" class="less lnk_primary">' + that.Less + '</a></span>'
                    );
                }
            });
            $('a.more', legal_element).click(function(event) {
                event.preventDefault();
                $(this).parent().addClass('opened');
                $(this).hide().prev().hide();
                $(this).next().show();
            });

            $('a.less', legal_element).click(function(event) {
                event.preventDefault();
                $(this).parent().parent().removeClass('opened');
                $(this).parent().hide().prev().show().prev().show();
            });

        } else {
            legal_element.removeClass('opened');
            legal_text = legal_element.text().replace(this.showMore, "").replace(/(\w+?)$/, '').replace("... ", "");
            legal_element.text(legal_text);
        }

    },
    preFooterCustomFeedBack: function() { //Prefooter customer feedBack
        var $pre_footer = $(".pre_footer_container .customer_feedback");
        $pre_footer.find(".default_view .btn").on('click', function() {
            $pre_footer.find(".default_view").slideUp();
            $pre_footer.find(".feedback_form_view").slideDown();
        });
        $pre_footer.find(".feedback_form_view .btn").on('click', function() {
            $pre_footer.find(".feedback_form_view").slideUp();
            $pre_footer.find(".feedback_thanks_view").slideDown();
        });
    },
    setBeforeImage: function(attrVal) { // Set before image
        var image = $(attrVal).css('background-image');
        $('head').append('<style>' + attrVal + ':before{background-image:' + image + ';}</style>');
        $(attrVal).removeAttr('style');
    },
    detectIE: function() {
        if (navigator.userAgent.toLowerCase().indexOf('msie') !== -1 || navigator.appVersion.toLowerCase().indexOf('trident/') > 0) {
            return true;
        } else {
            return false;
        }
    },
    getAndroidVersion: function() {
        var ua = (ua || navigator.userAgent).toLowerCase();
        var match = ua.match(/android\s([0-9\.]*)/);
        return match ? match[1] : false;
    },
    iosTouchSupport: function() { // Misc function to add hover and touch support
        if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i) || navigator.userAgent.match(/Opera Mini/i) || navigator.userAgent.match(/IEMobile/i)) {
            $(document).on("touchstart", ".bx-controls-direction a,.detail_block a.detail_inner, .featured_grid a.fg_block_link,.home_header_text a", function(e) {
                $(this).addClass("active");
            });
            $(document).on("touchend touchmove", ".bx-controls-direction a,.detail_block a.detail_inner, .featured_grid a.fg_block_link,.home_header_text a", function(e) {
                $(this).removeClass("active");
            });
        } else {
            $(document).on("mouseenter mouseover", ".bx-controls-direction a, .detail_block a.detail_inner, .featured_grid a.fg_block_link,.home_header_text a", function() {
                $(this).addClass("active");
            });
            $(document).on("mouseleave", ".bx-controls-direction a, .detail_block a.detail_inner, .featured_grid a.fg_block_link,.home_header_text a", function() {
                $(this).removeClass("active");
            });
        }
    }
}


//Auto height for image paragraph
equalheight = function(container) {
    var currentTallest = 0,
        currentRowStart = 0,
        rowDivs = new Array(),
        $el,
        topPosition = 0;
    $(container).each(function() {

        $el = $(this);
        $($el).height('auto')
        topPostion = $el.position().top;

        if (currentRowStart != topPostion) {
            for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                rowDivs[currentDiv].height(currentTallest);
            }
            rowDivs.length = 0; // empty the array
            currentRowStart = topPostion;
            currentTallest = $el.height();
            rowDivs.push($el);
        } else {
            rowDivs.push($el);
            currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
        }
        for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
            rowDivs[currentDiv].height(currentTallest);
        }
    });
};

applyTallestHeight = function(container){
	var currentTallest = 0,$el;
	
	$(container).each(function(){
		  if($(this).height()>currentTallest)
		  currentTallest = $(this).height();
		});
		
		$(container).each(function(){
		  $(this).height(currentTallest);
		});
		
	};

$(function() { //On document ready
    setTimeout(function() {
        $(".offcanvas").css('opacity', '0');
    }, 50);
    PWS.init();
    $(window).resize(function() { //On window resize 
        PWS.windowWidth = window.innerWidth;
        PWS.features.FAQ.resizeCarousel();
        PWS.features.FAQ.feedBackResize();
        PWS.features.productCarousel.controlCarousal();
        PWS.features.productMatrix.equalHeightMatrix();
        /* PWS.legalDisclaimer("See More...", "Less"); */
        PWS.features.paraListScroller.init();
        PWS.features.featuredGrid.init();
        PWS.features.upcomingEvents.init();
        PWS.features.optionalContainer.init();
        if (PWS.lastWindowWidth != PWS.windowWidth) {
            PWS.features.cardSlider.resizeCard();
            PWS.lastWindowWidth = PWS.windowWidth;
        }
        PWS.features.homeSlider.buildSlider();
        PWS.splashPage.resizeSet();
        equalheight('.detail_block');
        if (PWS.windowWidth > PWS.SCREEN.MEDIUM) {
            equalheight(".faq_block_inner div");
        } else {
            $(".faq_block_inner div").removeAttr("style");
        }
    });
});

$(window).load(function() { //On window load
    PWS.features.lexicon();
    PWS.features.productMatrix.init();
    PWS.features.featuredGrid.init();
    PWS.features.optionalContainer.init();
    PWS.features.homeSlider.init();
    equalheight('.detail_block');
    if (PWS.windowWidth > PWS.SCREEN.MEDIUM) {
        equalheight(".faq_block_inner div");
    }
    $('p').each(function() {
        if ($(this).html().replace(/\s|&nbsp;/g, '').length == 0) {
            $(this).remove();
        }
    });
	

});