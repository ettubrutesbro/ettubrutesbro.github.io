

//BIG TO DO: rewrite longwinded conditionals with a switch statement and possibly using
//custom functions....looking at responsive based shits in particular
//potentially re-interpret margins into EM so there's no layout implosion on low brovser zooms <=75%

$(document).ready(function(){

	var toggleAbout = false;
	var toggleCv = false;
	var toggleContact = false;
	var mobile;
	var varHt;
	var expando = new Array; //last expanded item - re-runs itemExpand on res change, clears value on reversion

	$('article .title').css({width: "100%", marginTop: "5px", textAlign: "center"});
	revert();
	adjust($(window).width());

	//RESPONSIVE SCREEN FUNCTIONS / etc. -----------------------------------------------------------
	

	$(window).resize(function(){
		adjust($(window).width());
	})

	function adjust(resolution){ 
	console.log(resolution);

	if(expando[0]!=undefined&&expando[0]!=""){
	console.log(expando);
	itemExpand('.' + expando[0]);
	}

	if(resolution>700){ //if res is above mobile / minimum
		$('nav').removeClass('mobileNav');
		$('.about').css('text-align', 'right').css('width', '');
	} else { //if res is mobile or below
		varHt = 250;
		$('#cont').css('margin-right', '450px');
		$('body').css('width', '450');
		$('nav').addClass('mobileNav');
		$('.about').css('text-align', 'left').css('width', '320px').css('margin-left', '30px');
		$('figure').css('margin-left', '0px');
		$('video').css('position', 'relative');
		if(toggleCv){
			$('#cvp em').css({display: "none"});
			$('nav ul').css({top:"20px"});
			$('#cvp').css({display:"inline-block", left: "10px", top: "20px"});
		}
	}

	if(resolution>1150){
		varHt = 100;
		$('#abouttext').css('width', '');
		$('video').css('position','absolute');
		if(parseInt($('.about').css('height'), 10) > 100){
			$('.about').css('height','100px');
		}
		if(toggleCv){
			$('#cvp em').css({display: "inline"});
			$('#cvp').css({display:"inline",left: "0px", top: "20px"});
			$('nav ul').css({top:"20px"});
		}
	} 

	if (resolution <=1150){
		$('video').css('width', '320px');
		$('#abouttext').css('width', '320px');
		
	}

	if (resolution<=1440){
		$('.about').css('font-size', '12pt');
	}
	
	if(resolution>1440){
		editCss(1440, 30, 380);
		$('video').css('width', '400px');
		$('.about').css('font-size', '14pt');
	}else if(resolution<=1440&&resolution>1150){
		editCss(1280, 230, 580);
		$('video').css('width', '250px');
	}else if(resolution<=1150&&resolution>700){
		editCss(900, 200, 550);
		varHt = 175;
		if(toggleCv){
			$('#cvp').css({display:"block",left: "0px", top: "0px"});
			$('nav ul').css({top:"0px"});
			$('#cvp em').css({display: "inline"});
		}
		if(parseInt($('.about').css('height'), 10) > 175){
		$('.about').css('height','175px');
		}
	}
}

function editCss(body, nav, con){
	$('body').css('width', body);
	$('nav').css('margin-right', nav);
	$('.about').css('margin-right', nav);
	$('#cont').css('margin-right', con);
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
		if(resolution>1150){ // 4-wide and 3-wide
			$('#cvp em').css({display: "inline"})
			$('#cvp').css({display:"inline"});
			$('#cvp').animate({opacity: 1, left:"0px"});
		}else if(resolution<=1150&&resolution>700){ //med. screen width: 2-wide
			$('#cvp em').css({display: "inline"})
			$('#cvp').css({display:"block",left: "0px"});
			$('nav ul').css({top:"0px"}, function(){});	
			$('#cvp').animate({opacity: 1, top: "0px"});
		}else if(resolution<=700){ //mobile screen width 1-wide
			//shorten text, rollout to the side
			$('#cvp em').css({display: "none"}) // special: removes everything but links
			$('#cvp').css({display:"inline", left: "100px"});	
			$('#cvp').animate({left: "10px", opacity: 1});
		}
	toggleCv=true;
	}else if(toggleCv){
		if(resolution>1150){ //4-wide and 3-wide
			$('#cvp').animate({opacity: 0, left:"120px", top: "20px"}, function(){
				$('nav ul').css({top:"20px"});
				$('#cvp').css({display:"none"});
			});
		}else if(resolution<=1150&&resolution>700){ //2-wide 
			$('#cvp').animate({opacity: 0, top:"20px"}, function(){
				$('#cvp').css({display:"none", left:"120px",top:"20px"});
				$('nav ul').css({top:"20px"});
			})
		}else if(resolution<=700){
			$('#cvp').animate({opacity: 0, left: "100px"}, function(){
				$('#cvp').css({display:"none"});
			});
		}
		toggleCv=false;

	}

})

$('#cvp b').click(function(){ // LIL RED ARROW COLLAPSE
		//toggleCv=false;
})

$('#con').click(function(){ //CONTACT ROLLOUT
	if(!toggleContact){
		$('#contact').css({display: "block"});
		$('#contact').animate({opacity: 1, marginTop:"-10px"});
		toggleContact=true;
	}else{

		$('#contact').animate({opacity: 0, marginTop:"-30px"}, function(){
			$('#contact').css({display: "none"});
			toggleContact=false;
		});
	}
})


$('#jl').click(function(){ //clicking my name resets filtering and selection
	expando.length = 0;
	revert();
	if(toggleAbout){
		aboutCollapse('.about');
	}
	$('article').show();
})
	

// ITEM SELECTION ---------------------------------------------------------------------------
// to do: unselection? returning to unfiltered or filtered state without one thing being big



$('article').click(function(event){ //SELECTION
	if($(event.target).attr('class')=="exit"){
		console.log('exit');
		revert();
		expando.length = 0;
	} else{
	expando.unshift($(this).attr('class').split(' ')[0]); //gets the project title class to variable
	console.log(expando);
if(expando[0]!=expando[1]){
	revert();	
	itemExpand('.' + expando[0]);
	} else {
		console.log('shit was the same')
	}
}
})



function itemExpand(target){ //targeted element will appear, prepend, expand and its text will show (SELECT)
	$('#portfolio').prepend($(target)); //shifting the selected article to top of stack
	$(target + ' div').not('.quad0, .title').show(); //unhiding other divs w/in article 
	//$(target + ' div').css({width: "49%", height: "49%"}); //intended default effect after array + loop


	var quadDims = new Array();
	$(target + ' div').each(function(){
		quadDims.push($(this).data('dimension').split(",")); //populates quadDims into nested array: [0] = quadOne data-dimension
	})

	for (var i = 0; i < quadDims.length; i++) {
		$(target + ' .quad' + i).css({width: (quadDims[i][0] + "%"), height: (quadDims[i][1] + "%")});
	};



	var resolution = $(window).width(); //responsive: tiered resolution conditional will vary expand width 
	// try a switch statement here instead of repeating resolution over and over
	if(resolution>1440){
		$(target).css({width:"95%", height: "800px", marginRight: "10%"});
		$(target + ' div').css({margin: "5px"});
	} else if(resolution<=1440&&resolution>1150){
		$(target).css({width:"80%", height: "600px", marginRight: "10%"});
		$(target + ' div').css({margin: "4px"});
	} else if(resolution<=1150&&resolution>700){
		$(target).css({width:"75%", height: "400px", marginRight: "10%"});
		$(target + ' div').css({margin: "2px"});
	} else if(resolution<=700){
		$(target).css({width:"320px", height: "700px", marginRight: "10%"});
		$(target + ' div').css({width: "100%", height: "auto"});
		
	}
}

function revert(){ 
	$('article').sort(function (prev, next) {
    return parseInt(next.dataset.sort) - parseInt(prev.dataset.sort);
	}).appendTo('#portfolio');
	$('article').css({width:"320px", height:"230px", margin:"30px 0px 0px 30px"})
	$('article div').css({margin: "0px"});
	$('.quad0').css({width: "100%", height: "200px"});
	$('article .title').css({width: "100%", marginTop: "5px", textAlign: "center"});
	//all article divs not .quad0 or .title are display: none? 
	$('article div').not('.quad0, .title').hide(); 
	
}

$('.exit').click(function(){
	// we want to revert expando without resetting the whole thing so that filtering is preserved

	
		
})	


// CATEGORICAL FILTERING ----------------------------------------------------------------------

	$(window).on('hashchange', function() { //reads hash value on hash change and puts it in a var
		revert();
		var hash = window.location.hash.substr(1);
		$('article').sort(function (prev, next) {
    return parseInt(next.dataset.sort) - parseInt(prev.dataset.sort);
	}).appendTo('#portfolio');
		$('.' + hash).show();
		$('.' + hash).animate(
			{width:"320px", height:"240px", margin:"30px 0px 0px 30px"}
			, 350, function(){
			});
		$('article').not($('.'+ hash)).animate(
			{width:"0px", height:"0px", margin:"0px"}
			, 350, function(){
				$('article').not($('.'+ hash)).hide();
			});
	})


	})