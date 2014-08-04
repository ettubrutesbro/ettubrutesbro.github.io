

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
	

	if(expando[0]!=undefined&&expando[0]!=""){
	console.log(expando);
	itemExpand('.' + expando[0]);
	}

	if(resolution>700){ //if res is above mobile / minimum
		$('nav').removeClass('mobileNav');
		$('.about').css('text-align', 'right').css('width', '');
		$('b').css('display', 'none');
	} else { //if res is mobile or below
		$('b').css({display: "inline"});
		varHt = 250;
		$('#cont').css('margin-right', '450px');
		$('body').css('width', '450');
		$('nav').addClass('mobileNav');
		$('.about').css('text-align', 'left').css('width', '320px').css('margin-left', '30px');
		$('figure').css('margin-left', '0px');
		$('.about video').css('position', 'relative');

		if(toggleCv){
			$('#cvp em').css({display: "none"});
			$('nav ul').css({top:"20px"});
			$('#cvp').css({display:"inline-block", left: "3px", top: "20px"});
		}
	}

	if(resolution>1024){
		varHt = 100;
		$('#abouttext').css('width', '');
		$('.about video').css('position','absolute');
		if(parseInt($('.about').css('height'), 10) > 100){
			$('.about').css('height','100px');
		}
		if(toggleCv){
			$('#cvp em').css({display: "inline"});
			$('#cvp').css({display:"inline",left: "0px", top: "20px"});
			$('nav ul').css({top:"20px"});
		}
	} 

	if (resolution <=1024){
		$('.about video').css('width', '320px');
		$('#abouttext').css('width', '320px');
		
	}

	if (resolution<=1440){
		$('.about').css('font-size', '12pt');
	}
	
	if(resolution>1440){
		editCss(1440, 30, 380);
		$('.about video').css('width', '400px');
		$('.about').css('font-size', '14pt');
	}else if(resolution<=1440&&resolution>1024){
		editCss(1280, 230, 580);
		$('.about video').css('width', '250px');
	}else if(resolution<=1024&&resolution>700){
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
		if(resolution>1024){ // 4-wide and 3-wide
			$('#cvp em').css({display: "inline"})
			$('#cvp').css({display:"inline"});
			$('#cvp').animate({opacity: 1, left:"0px"});
		}else if(resolution<=1024&&resolution>700){ //med. screen width: 2-wide
			$('#cvp em').css({display: "inline"})
			$('#cvp').css({display:"block",left: "0px"});
			$('nav ul').css({top:"0px"}, function(){});	
			$('#cvp').animate({opacity: 1, top: "0px"});
		}else if(resolution<=700){ //mobile screen width 1-wide
			//shorten text, rollout to the side
			$('#cvp em').css({display: "none"}) // special: removes everything but links
			$('#cvp').css({display:"inline", left: "100px"});	
			$('#cvp').animate({left: "3px", opacity: 1});
			$('b').css({display: "inline"});
		}
	toggleCv=true;
	}else if(toggleCv){
		if(resolution>1024){ //4-wide and 3-wide
			$('#cvp').animate({opacity: 0, left:"120px", top: "20px"}, function(){
				$('nav ul').css({top:"20px"});
				$('#cvp').css({display:"none"});
			});
		}else if(resolution<=1024&&resolution>700){ //2-wide 
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

$('#cvp b').click(function(){ // LIL GREY ARROW COLLAPSE
	$('#cvp').animate({opacity: 0, left: "100px"}, function(){
				$('#cvp').css({display:"none"});
				toggleCv=false;
			});
})

$('#con').click(function(){ //CONTACT ROLLOUT
	if(!toggleContact){
		$('#contact').css({display: "block"});
		$('#contact').animate({opacity: 1, marginTop:"-15px"});
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
	window.location.hash = '';
})
	

// ITEM SELECTION ---------------------------------------------------------------------------
// to do: unselection? returning to unfiltered or filtered state without one thing being big



$('article').click(function(event){ //SELECTION
	console.log(this);
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

	console.log(target);
	var quadDims = new Array();
	$(target + ' div').each(function(){
		quadDims.push($(this).data('dimension').split(",")) //populates quadDims into nested array: [0] = quadOne data-dimension
	})
	

	var itemHeights = new Array() //testing out using itemheights instead to automate responsive height...replace itemheight
	itemHeights.push($(target).data('itemheights').split(","));

	var quadMargins = new Array()
	$(target + ' div').each(function(){
		quadMargins.push($(this).data('margin').split(","))
	})
	
	for (var i = 0; i < quadMargins.length; i++) {
		var shit = quadMargins[i].length
		for (var d = 0; d < shit; d++){
			quadMargins[i][d] = quadMargins[i][d].split(/\s+/).map(Number)
		}
	}

	

	//$('article .title').css({width: "", marginTop: "", textAlign: ""});
	
	$(target + ' .quad0').addClass('expanded'); //facilitates bg-img changes on expansion

	var resolution = $(window).width(); //window width determines article height, quad sizes
	// try a switch statement here instead of repeating resolution over and over

	if(resolution>1440){ 
		$(target).css({width:"1380px", height: itemHeights[0][0] + "px", marginRight: "10%"});
		for (var i = 0; i < quadDims.length; i++) {
			$(target + ' .quad' + i).css({width: (quadDims[i][0] + "px"), height: (quadDims[i][1] + "px"), 
			margin: (quadMargins[i][0][0]+"px "+quadMargins[i][0][1]+"px "+quadMargins[i][0][2]+"px "+quadMargins[i][0][3]+"px ")
		})

	};
	} else if(resolution<=1440&&resolution>1024){
		$(target).css({width:"1100px", height: itemHeights[0][1] + "px", marginRight: "10%"});
		for (var i = 0; i < quadDims.length; i++) {
			$(target + ' .quad' + i).css({width: (quadDims[i][2] + "px"), height: (quadDims[i][3] + "px"),
			margin: (quadMargins[i][1][0]+"px "+quadMargins[i][1][1]+"px "+quadMargins[i][1][2]+"px "+quadMargins[i][1][3]+"px ")
		})
	};
	} else if(resolution<=1024&&resolution>700){
		$(target).css({width:"800px", height: itemHeights[0][2] + "px", marginRight: "10%"});
		for (var i = 0; i < quadDims.length; i++) {
			$(target + ' .quad' + i).css({width: (quadDims[i][4] + "px"), height: (quadDims[i][5] + "px"),
			margin: (quadMargins[i][2][0]+"px "+quadMargins[i][2][1]+"px "+quadMargins[i][2][2]+"px "+quadMargins[i][2][3]+"px ")
		})
		}
	} else if(resolution<=700){
		$(target).css({width:"400px", height: itemHeights[0][3] + "px", marginRight: "10%", paddingBottom: "1%"});
		$(target + ' div').css({width: "400px", height: "auto", margin: "0px 0px 0px 0px"});
	}

	//for videos: check if there is any} html content inside quad0 - if yes, then play (hacky)
	if($(target + ' .quad0').hasClass("playme")){
		$(target + ' .quad0 video').get(0).play();
	} 

		//array gets all videos within article divs, then sets their widths to match the parent div width

		var vidArray = new Array()
		$(target + ' video').each(function(){
			vidArray.push($(this))
		})
		for (var i = 0; i < vidArray.length; i++){
			var parentWidth = ($(vidArray[i]).parent().css('width'))
			$(vidArray[i]).css({width: parentWidth})
		}
}

function revert(){ 
	$('.quad0').removeClass('expanded');

	$('article').sort(function (prev, next) {
    return parseInt(next.dataset.sort) - parseInt(prev.dataset.sort);
	}).appendTo('#portfolio');
	$('article').css({width:"320px", height:"230px", margin:"30px 0px 0px 30px", padding: "0"})
	$('article div').css({margin: "0px"});
	$('.quad0').css({width: "100%", height: "200px"});
	$('article .title').css({width: "100%", marginTop: "5px", textAlign: "center"});
	//all article divs not .quad0 or .title are display: none? 
	$('article div').not('.quad0, .title').hide(); 

	//video reversion behaviors

	var sources = $('.quad0 video source').get();
	sources.forEach(function(element){
		console.log(element.src);
		
	})
	
	
		

	
		
	

	
}


// CATEGORICAL FILTERING ----------------------------------------------------------------------

	$(window).on('hashchange', function() { //reads hash value on hash change and puts it in a var
		revert();
		expando.length = 0;
		var hash = window.location.hash.substr(1);
		$('article').sort(function (prev, next) {
    return parseInt(next.dataset.sort) - parseInt(prev.dataset.sort);
	}).appendTo('#portfolio');
		$('.' + hash).show();
		$('.' + hash).css(
			{width:"320px", height:"240px", margin:"30px 0px 0px 30px"}
			);
		
			$('article').not($('.'+ hash)).hide();
			
	})


	})