$(function() {   
	  /** ADD if its require for click**/
		var toogle_flag=false;
		var location = $(".ios-switch").width()/32;
		var switch_width=$(".handle").width();
		var parentOffset = $(".state-background").parent().offset(); 
		$(".state-background").click( function(e) {
			 if(!toogle_flag){
					$(".handle").animate({left:+location+"px"});
					$(".ios-switch").removeClass("off");
					$(".ios-switch").addClass("on");
					toogle_flag=true;
				}else{
					$(".handle").animate({left:+location+"px"},350);
					$(".ios-switch").removeClass("on");
					$(".ios-switch").addClass("off");
					toogle_flag=false;
				}
				
		});
		$(".on-background").click( function(e) {
			 if(!toogle_flag){
					$(".handle").animate({left:+location+"px"});
					$(".ios-switch").removeClass("off");
					$(".ios-switch").addClass("on");
					toogle_flag=true;
				}else{
					$(".handle").animate({left:+location+"px"},350);
					$(".ios-switch").removeClass("on");
					$(".ios-switch").addClass("off");
					toogle_flag=false;
				}
		});
		$(".handle").click( function() {
						
			if( !toogle_flag){
				$(".ios-switch").removeClass("off");
				$(".ios-switch").addClass("on");
				$(".handle").animate({left:+location+"px"},350);
				toogle_flag=true;
			}else{
				if(!toogle_flag){
					toogle_flag=true;
				}else{
					toogle_flag=false;
				}
				$(".ios-switch").removeClass("on");
				$(".ios-switch").addClass("off");
				$(".handle").animate({left: "2"}, 350 );
				
			}
		});
    });