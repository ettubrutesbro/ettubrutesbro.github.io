$(document).ready(function(){

	var toggleAbout = false;
	var toggleCv = false;
	var toggleContact = false;
	var mobile;
	var varHt;

	//RESPONSIVE SCREEN FUNCTIONS / etc. -----------------------------------------------------------
	adjust($(window).width());

	$(window).resize(function(){
		adjust($(window).width());
	})

	function adjust(resolution){ 
	if(resolution>700){ //if res is above mobile / minimum
		$('nav').removeClass('mobileNav');
		$('.about').css('text-align', 'right').css('width', '');
	} else { //if res is mobile or below
		varHt = 250;
		$('body').css('width', '450');
		$('nav').addClass('mobileNav');
		$('.about').css('text-align', 'left').css('width', '320px').css('margin-left', '30px');
		$('figure').css('margin-left', '0px');
		$('video').css('position', 'relative');
	}

	if(resolution>1150){
		varHt = 100;
		$('#abouttext').css('width', '');
		$('video').css('position','absolute');
		if(parseInt($('.about').css('height'), 10) > 100){
			$('.about').css('height','100px');
		}
		if(toggleCv){
			$('#cvp').css({display:"inline",left: "0px", top: "20px"});
			$('nav ul').css({top:"20px"});
		}
	} 

	if (resolution <=1150){
		$('video').css('width', '320px');
		$('#abouttext').css('width', '320px');
		if(toggleCv){
	
			$('#cvp').css({display:"block",left: "0px", top: "0px"});
			$('nav ul').css({top:"0px"});
		}
	}

	if (resolution<=1440){
		$('.about').css('font-size', '12pt');
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


	

//TOP EXPANDING/COLLAPSING ELEMENTS: ABOUT, CV, CONTACT -----------------------------------------------

$('#abt').click(function(){ //about section rolls out when clicked
		if(!toggleAbout){
				aboutExpand('.about', varHt);
		} else {
				aboutCollapse('.about');
		}
	})

function aboutExpand(whichOne, ht){
	$(whichOne).css('display', 'block');
	$(whichOne).animate({
		height: ht,
		opacity: 1,
		paddingTop: '20px'
	}, 400, function(){
		if (whichOne == '.about'){
			toggleAbout=true;
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
			toggleAbout=false;
		}
	})
}

$('#cv').click(function(){ // CV ROLLOUT
	var resolution = $(window).width();
	if(!toggleCv){
		if(resolution>1150){ // 4-wide only
			$('#cvp').css({display:"inline"});
			$('#cvp').animate({opacity: 1, left:"0px"});
		}else if(resolution<=1150){ //med. screen width
			$('#cvp').css({display:"block",left: "0px"});
			$('nav ul').css({top:"0px"});	
			$('#cvp').animate({opacity: 1, top: "0px"});
		}
	toggleCv=true;
	}else if(toggleCv){
		if(resolution>1150){
			$('#cvp').animate({opacity: 0, left:"120px", top: "20px"}, function(){
				$('nav ul').css({top:"20px"});
				$('#cvp').css({display:"none"});
			});
		}else if(resolution<=1150){
			$('#cvp').animate({opacity: 0, top:"20px"}, function(){
				$('#cvp').css({display:"none", left:"120px",top:"20px"});
				$('nav ul').css({top:"20px"});
			})
		}
		toggleCv=false;

	}

})

$('#cvp b').click(function(){
		toggleCv=false;
})

$('#jl').click(function(){ //clicking my name resets filtering and selection
	revert();
	if(toggleAbout){
		aboutCollapse('.about');
	}
	$('article').show();
})
	

// ITEM SELECTION ---------------------------------------------------------------------------
// to do: unselection? returning to unfiltered or filtered state without one thing being big



$('article').click(function(){ //SELECTION (we should replace <a>)
	var expando = $(this).attr('class').split(' ')[0]; //gets the project title class to variable
	revert();	
	itemExpand('.' + expando);
	
})

function itemShow(target){ //targeted items will re-appear then resize on call, if hidden (FILTER)
		$(target).animate({width:"320px", height:"240px", margin:"30px 0px 0px 30px", opacity: 1});
}

function itemExpand(target){ //targeted element will appear, prepend, expand and its text will show (SELECT)
	$('#portfolio').prepend($(target));
	$(target).css({width:"80%", height: "100%"});
}

function revert(){ 
	$('article').sort(function (prev, next) {
    return parseInt(next.dataset.sort) - parseInt(prev.dataset.sort);
	}).appendTo('#portfolio');
		
	$('article').css({width:"320px", height:"240px", margin:"30px 0px 0px 30px"})
}




// CATEGORICAL FILTERING ----------------------------------------------------------------------

	$(window).on('hashchange', function() { //reads hash value on hash change and puts it in a var
		var hash = window.location.hash.substr(1);
		$('article').sort(function (prev, next) {
    return parseInt(next.dataset.sort) - parseInt(prev.dataset.sort);
	}).appendTo('#portfolio');
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
	})


	})