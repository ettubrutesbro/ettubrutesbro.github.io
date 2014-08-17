

$(document).ready(function(){

	var toggleAbout = false
	var toggleCv = false
	var toggleContact = false
	var mobile
	var varHt
	var expando = window.location.hash.substring(1)
	var filters = ["animation", "3d", "illustration","interactive"]
	var hashArr = new Array()

	content()

	$('article .title').css({width: "100%", marginTop: "5px", textAlign: "center"});
	revert();
	adjust($(window).width());

	//RESPONSIVE SCREEN FUNCTIONS / etc. -----------------------------------------------------------

	$(window).resize(function(){
		adjust($(window).width());
	})

	function adjust(resolution){ 
	
	content() //this would be better if it only ran this when there was an actual change of tiers

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
	$('.about video').get(0).play();

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
	setTimeout(function(){
		$('.about video').get(0).pause()	
	},500)
	
}

$('#cv').click(function(){ // CV ROLLOUT
	var resolution = $(window).width()
	if(!toggleCv){
		if(resolution>1024){ // 4-wide and 3-wide

			$('#cvp').css({display:"inline"})
			$('#cvp').animate({opacity: 1, left:"0px"})
		}else if(resolution<=1024&&resolution>700){ //med. screen width: 2-wide

			$('#cvp').css({display:"block",left: "0px"})
			$('nav ul').css({top:"0px"}, function(){})
			$('#cvp').animate({opacity: 1, top: "0px"})
		}else if(resolution<=700){ //mobile screen width 1-wide
			//shorten text, rollout to the side
			
			$('#cvp').css({display:"inline", left: "100px"})
			$('#cvp').animate({left: "3px", opacity: 1})
			$('b').css({display: "inline"})
		}
	toggleCv=true;
	}else if(toggleCv){
		if(resolution>1024){ //4-wide and 3-wide
			$('#cvp').animate({opacity: 0, left:"120px", top: "20px"}, function(){
				$('nav ul').css({top:"20px"})
				$('#cvp').css({display:"none"})
			});
		}else if(resolution<=1024&&resolution>700){ //2-wide 
			$('#cvp').animate({opacity: 0, top:"20px"}, function(){
				$('#cvp').css({display:"none", left:"120px",top:"20px"})
				$('nav ul').css({top:"20px"})
			})
		}else if(resolution<=700){
			$('#cvp').animate({opacity: 0, left: "100px"}, function(){
				$('#cvp').css({display:"none"})
			});
		}
		toggleCv=false

	}

})

$('#cvp b').click(function(){ // LIL GREY ARROW COLLAPSE
	$('#cvp').animate({opacity: 0, left: "100px"}, function(){
				$('#cvp').css({display:"none"})
				toggleCv=false
			});
})

$('#con').click(function(){ //CONTACT ROLLOUT
	if(!toggleContact){
		$('#contact').css({display: "block"})
		$('#contact').animate({opacity: 1, marginTop:"-15px"});
		toggleContact=true
	}else{

		$('#contact').animate({opacity: 0, marginTop:"-30px"}, function(){
			$('#contact').css({display: "none"})
			toggleContact=false
		});
	}
})


$('#jl').click(function(){ //clicking my name resets filtering and selection
	expando = ""
	revert()
	if(toggleAbout){
		aboutCollapse('.about')
	}
	$('article').show();
	window.location.hash = ''
})
	

// ITEM SELECTION ---------------------------------------------------------------------------

$('a.filter').click(function(){ //clicked filter
	window.location.hash = $(this).attr('class').replace("filter","")
})

$('article').click(function(event){ //clicked project item
	window.location.hash = ($(this).attr('class').split(' ')[0])
})

$(window).on('hashchange', function(){
	content()
})

function content(){
	
	hashArr.unshift(window.location.hash.substring(1))
	console.log(hashArr)
	revert()

	if(hashArr[0] === ""){
		$('article').show()
		//don't do anything else if it's blank
	}else if( ($.inArray(hashArr[0], filters)) >= 0 ){ //if expando = a class (filter)
		$('.' + hashArr[0]).show()
		$('article').not($('.'+hashArr[0])).hide()
	}else{ //if expando = article class (project)
		if(!$("article ." + hashArr[0]).hasClass(hashArr[1])){ //project != filter
			$('article').show()
		}
		itemExpand('.' + hashArr[0])
	}
}


function itemExpand(target){ 
	console.log(target)
	$('#portfolio').prepend($(target)); //shifting the selected article to top of stack / first
	$(target + ' div').not('.quad0, .title').show(); //unhiding other divs w/in article 

	//array definition supports precise responsive layout conditions - w, h, margin
	var quadDims = new Array(); //getting dimension data from HTML and populating arr
	$(target + ' div').each(function(){
		quadDims.push($(this).data('dimension').split(",")) //populates quadDims into nested array: [0] = quadOne data-dimension
	})
	
	var itemHeights = new Array() //getting heights data from HTML, populating arr
	itemHeights.push($(target).data('itemheights').split(","));

	var quadMargins = new Array() //getting margins data from HTML, populating arr
	$(target + ' div').each(function(){
		quadMargins.push($(this).data('margin').split(","))
	})
	
	for (var i = 0; i < quadMargins.length; i++) {
		for (var d = 0; d < (quadMargins[i].length); d++){
			quadMargins[i][d] = quadMargins[i][d].split(/\s+/).map(Number)
		}
	}
	
	$(target + ' .quad0').addClass('expanded'); //title image changes once item is expanded

	//resolution-responsive
	var resolution = $(window).width();
	if(resolution>1440){ //4 wide
		$(target).css({width:"1380px", height: itemHeights[0][0] + "px", marginRight: "10%"});
		for (var i = 0; i < quadDims.length; i++) {
			$(target + ' .quad' + i).css({width: (quadDims[i][0] + "px"), height: (quadDims[i][1] + "px"), 
			margin: (quadMargins[i][0][0]+"px "+quadMargins[i][0][1]+"px "+quadMargins[i][0][2]+"px "+quadMargins[i][0][3]+"px ")
		})

	};
	} else if(resolution<=1440&&resolution>1024){ //3 wide
		$(target).css({width:"1100px", height: itemHeights[0][1] + "px", marginRight: "10%"});
		for (var i = 0; i < quadDims.length; i++) {
			$(target + ' .quad' + i).css({width: (quadDims[i][2] + "px"), height: (quadDims[i][3] + "px"),
			margin: (quadMargins[i][1][0]+"px "+quadMargins[i][1][1]+"px "+quadMargins[i][1][2]+"px "+quadMargins[i][1][3]+"px ")
		})
	};
	} else if(resolution<=1024&&resolution>700){ //2 wide
		$(target).css({width:"800px", height: itemHeights[0][2] + "px", marginRight: "10%"});
		for (var i = 0; i < quadDims.length; i++) {
			$(target + ' .quad' + i).css({width: (quadDims[i][4] + "px"), height: (quadDims[i][5] + "px"),
			margin: (quadMargins[i][2][0]+"px "+quadMargins[i][2][1]+"px "+quadMargins[i][2][2]+"px "+quadMargins[i][2][3]+"px ")
		})
		}
	} else if(resolution<=700){ //mobile
		$(target).css({width:"400px", height: itemHeights[0][3] + "px", marginRight: "10%", paddingBottom: "1%"})
		for (var i = 0; i < quadDims.length; i++){
		console.log('quad' + i)
		console.log(quadDims[i][6])
		$(target + ' .quad' + i).css({width: "400px", height: (quadDims[i][6] + "px"), 
			margin: (quadMargins[i][3][0]+"px "+quadMargins[i][3][1]+"px "+quadMargins[i][3][2]+"px "+quadMargins[i][3][3]+"px ")})
		if($(target + ' .quad' + i).hasClass('nonsize')){
			console.log(i)
			console.log(quadDims[i][7])
				$(target + ' .quad' + i).css({width: (quadDims[i][7] + "px")})
			}
		}
}


	//triggered autoplay for videos that begin right away and loop
	if($(target + ' div').hasClass("playme")){
			$(target + ' div.playme video').each(function(i,ele,arr){
				$(target + ' div.playme video').get(i).play()
			})
	} 

	//array gets all videos within article divs, then sets their widths to match the parent div width
		
		var vidArray = new Array()
		$(target + ' video').each(function(){
			vidArray.push($(this)) // all videos within body of project
	
		})
		for (var i = 0; i < vidArray.length; i++){
			var parentWidth = ($(vidArray[i]).parent().css('width')) //videos are always width of container
			$(vidArray[i]).css({width: parentWidth})
		}

		//background-image slideshow functionality
		//series of images on top of bg image that fade in and out
		var imgArray = new Array()

		$(target + ' div.imgArray img').each(function(){
			imgArray.push($(this))
		})
		setInterval(function(){ //every 5s, cycle image in divs classified imgarray
			if(i>imgArray.length){}
		},5000)
		

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
	
	//video stopping...

}

})