$(document).ready(function(){

	var toggle = false;
	var mobile;
	var varHt;
	var big = false;

	adjust($(window).width());

	

	$(window).resize(function(){
		adjust($(window).width());
	})
	


	$(window).on('hashchange', function() { //reads hash value on hash change and puts it in a var
		var hash = window.location.hash.substr(1);
		if(hash == "interactive" || hash == "3d" || hash == "animation" || hash == "illustration"){
		$('.' + hash).show();
		$('.' + hash).animate(
			{width:"320px", height:"240px", margin:"30px 0px 0px 30px"}
			, 500, function(){

			});


		$('article').not($('.'+ hash)).animate(
			{width:"0px", height:"0px", margin:"0px"}
			, 500, function(){
				$('article').not($('.'+ hash)).hide();
			});
	} 
	})
	

	$('#abt').click(function(){
	
			if(!toggle){
				aboutExpand('.about', varHt);
			} else {
				aboutCollapse('.about');
			}
		
	})


$('article a').click(function(){
	
	var expando = $(this).parents("article").attr('class').split(' ')[0]; //gets the project title class to variable
	console.log(expando);
	if(!big){
		$('article').not('.' + expando).hide(500, function(){
		$('.' + expando).animate({width:"80%", height:"65%", marginLeft:"10%", marginRight:"10%"});
		$('.' + expando + ' p').animate({fontSize:"16pt", letterSpacing:"0.1em"});	
	});
} else if(big){

		$('.' + expando).stop(true,true).animate({width:"320px", height:"240px", marginLeft:"30px", marginRight:"0px"}, 500, function(){
			$('article').not('.' + expando).show(500);
		});
		$('.' + expando + ' p').stop(true,true).animate({fontSize:"12pt", letterSpacing:"0em"}, {queue:false});	
}
big=!big;
		
		

})

function itemConceal(target){ //targeted elements will shrink, then disappear (FILTER, UNSELECTED)
	$(target).animate({width:"0px", height:"0px", margin: "0px", opacity: 0}, 500, function(){
		$(target).hide();
	})
}

function itemShow(target){ //targeted items will re-appear then resize on call, if hidden (FILTER)
	$(target).show(function(){
		$(target).animate({width:"320px", height:"240px", margin:"30px 0px 0px 30px", opacity: 1});
	})
}

function itemExpand(target){ //targeted element will appear, expand and its accessory text will become visible (SELECT)
	$(target).show(function(){
		$(target).animate({width:"80%", height:"700px",opacity:1}, 500, function(){
			//nested callback
		})		
	})
	
}

function itemRevert(target){ //targeted element will revert to a normal 320x240 (SELECT 2X, ON FILTER)
	$(target).stop(true,true).animate({width:"320px", height:"240px", margin:"30px 0px 0px 30px"})
}



function aboutExpand(whichOne, ht){
	$(whichOne).css('display', 'block');
	$(whichOne).animate({
		height: ht,
		opacity: 1,
		paddingTop: '20px'
	}, 400, function(){
		if (whichOne == '.about'){
			toggle=true;
		}
	})
}

function aboutCollapse(whichOne){
	$(whichOne).animate({
		height: 0,
		opacity: 0,
		paddingTop: '0px'
	}, 400, function(){
		$(whichOne).css('display', 'none');
		if (whichOne == '.about'){
			toggle=false;
		}
	})
}
	
function adjust(resolution){
	if(resolution>700){
		$('nav').removeClass('mobileNav');
		$('.about').css('text-align', 'right').css('width', '');
	} else {
		varHt = 250;
		$('body').css('width', '450');
		$('nav').addClass('mobileNav');
		$('.about').css('text-align', 'left').css('width', '320px').css('margin-left', '30px');
		$('figure').css('margin-left', '0px');
		$('video').css('position', 'relative')
	}

	if(resolution>1150){
		varHt = 100;
		$('#abouttext').css('width', '');
		$('video').css('position','absolute');
		if(parseInt($('.about').css('height'), 10) > 100){
		$('.about').css('height','100px');
		}
	} 

	if (resolution <=1150){
		$('video').css('width', '320px');
		
	}

	if (resolution<=1440){
		$('.about').css('font-size', '12pt');
	}
	if(resolution<=1150){
		$('#abouttext').css('width', '320px');
	}
	if(resolution>1440){
		editCss(1440, 30);
		$('video').css('width', '400px');
		$('.about').css('font-size', '14pt');
	}else if(resolution<=1440&&resolution>1150){
		editCss(1280, 230);
		$('video').css('width', '250px');
	}else if(resolution<=1150&&resolution>700){
		editCss(900, 200);
		varHt = 175;
		if(parseInt($('.about').css('height'), 10) > 175){
		$('.about').css('height','175px');
		}
	}
}

function editCss(body, nav){
	$('body').css('width', body);
	$('nav').css('margin-right', nav);
	$('.about').css('margin-right', nav);
}

})