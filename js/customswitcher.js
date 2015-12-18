$(document).ready(function() {
	
	var switcherHeaderHeight = $('.switcher_header').outerHeight() + 20;
	var viewPortheight = $(window).height() - $('.header').height();
	$('.switcher_content').css('padding-top', switcherHeaderHeight);
	$('.switcher_content').height(viewPortheight - switcherHeaderHeight);
	$(window).resize(function() {
		var viewPort = $(window).width();
			var switcherParent = $('.switcher').hasClass('active');
			var switcherHeaderHeight = $('.switcher_header').outerHeight() + 20;
			$('.switcher_content').css('padding-top', switcherHeaderHeight);
			var viewPortheight = $(window).height() - $('.header').height();
			if (viewPort < 768 && switcherParent == true) {
				$('.switcher_content').height(viewPortheight - switcherHeaderHeight);
				$('html').addClass('no_scroll');
			}else{
				$('html').removeClass('no_scroll');
			}
	});
	
	$('#switcherTrigger').on('click',function(){
		var viewPort = $(window).width();
		var switcherParent = $('.switcher').hasClass('active');
		var viewPortheight = $(window).height() - $('.header').height();
		if (!(switcherParent == true)) {
				$('.switcher_content').show();
				$('.switcher').addClass('active');
				if (viewPort < 768) {
					$('.switcher_content').height(viewPortheight - switcherHeaderHeight);
					$('html').addClass('no_scroll');
				}
			}else{
				$('.switcher_content').hide();
				$('.switcher').removeClass('active');
				$('html').removeClass('no_scroll');
		}
	});
	
	
	
});