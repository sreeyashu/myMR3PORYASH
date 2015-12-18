$(document).ready(function() {
	$('.info_icon').tooltipster({
			trigger: "click",
			positionTracker: true,
			functionInit: function(){
				return $(this).children('.icon-description').html();
			},
			functionReady: function(){
				$(this).children('.icon-description').attr('aria-hidden', false);
			},
			functionAfter: function(){
				$(this).children('.icon-description').attr('aria-hidden', true);
			}
	 });
	$(".splash_expand").on('click',function(){
		$(this).parent().next('.lngbox_content').slideToggle();
		$(this).parent().toggleClass('expanded');
	});	
	applyTallestHeight('.lng_block .lngbox_lnks');
	 $(window).resize(function() {
                viewPort = $(window).width(); // New width
                if (viewPort > 1024) {
					applyTallestHeight('.lng_block .lngbox_lnks');
				}
	 });
});