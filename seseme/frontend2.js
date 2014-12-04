
var socket = io('10.0.1.241:5000')

var tag = [tagMorn, tagNoon, tagNite, tagLate], building = [buildingMorn, buildingNoon, buildingNite, buildingLate], school = [schoolMorn, schoolNoon, schoolNite, schoolLate]
var scaleSet = [tag, building, school]
var currentScale = 0, currentTime

var theHour = new Date().getHours()

document.ontouchmove = function(e){
	e.preventDefault()
} //for preventing mobile pan?

//console.log(scaleSet[currentScale][currentTime][0].value)

var valueArray = [[500],[500],[500],[500]]

var mainSvg = Snap("#mainSvg")

var background = mainSvg.rect(0,0,"100%","100%")
background.attr({
	fill: "url(#bggradient)"
})

var ht = window.screen.availHeight
var wid = window.screen.availWidth

//time calculations
if(theHour>=0&&theHour<6){
	currentTime = 3 //late 
}else if(theHour>=6&&theHour<12){
	currentTime = 0 //morn
}else if(theHour>=12&&theHour<19){
	currentTime = 1 //noon
}else{
	currentTime = 2 //nite
}

console.log("the timeset is " +currentTime)
Snap.load("sesemeiso3.svg", function(svgFile){

	var g
	g = svgFile.select("svg")
	mainSvg.append(g) 
 
	myElement = document.getElementById('svgInside')
	//mc.x for touch functions
	var mc = new Hammer(myElement)

	var all = g.select('#all') //entirety select
	//the pillars and their masks
	var a = g.select("#a"), b = g.select("#b"), c = g.select("#c"), d = g.select("#d")
	var amarker = g.select("#a_marker"), bmarker = g.select("#b_marker"), cmarker = g.select("#c_marker"), dmarker = g.select("#d_marker"),
	amarkerclip = g.select("#a_mc"), bmarkerclip = g.select("#b_mc"), cmarkerclip = g.select("#c_mc"), dmarkerclip = g.select("#d_mc")
	var dghost = g.select("#d_ghost"), dghosttop = g.select("#d_ghosttop"), dAmount, bAmount 
	var awrapper = g.select("#awrapper"), bwrapper = g.select("#bwrapper"), cwrapper = g.select("#cwrapper"), dwrapper = g.select("#dwrapper")
	pillarArray = [a,b,c,d]

	//to add: currentCoords for a,b,c,d for preserving position amidst data change

	//var pillarTransformArray = [{xval:0,yval:0,scaleval:0},{xval:0,yval:0,scaleval:0},{xval:0,yval:0,scaleval:0},{xval:0,yval:0,scaleval:0}]

	var themasks = g.select("#themasks")
	//icon highlighting for dataset

	//*****************************************************
	// INIT / SETUP FUNCTIONS GO HERE
	//#####################################################

	 all.attr({
	 	transform: "t -50 -500 s 0.75"
	 })

	themasks.attr({ //these are just off, so this transform fixes their positioning
		transform: "t 200 120"
	})

	// $("#velowrapper").velocity({
	// 	translateY: 300,
	// 	scale: 0.4
	// },400)

	//delay here, hopefully through a callback function of anim setup, will allow intro to work
	moveToData(scaleSet[currentScale][currentTime]) //right away, go to dataset

	//helperFly()
	setTimeout(function(){markerMove(true)},1200) //stopgap


	

	//**********************************************
	// EVENTS
	//**********************************************


	pillarArray.forEach(function(ele,i){ //every pillar when clicked does selectPillar
		ele.click(function(e){
			selectPillar(ele,450)
			e.stopPropagation()
		})
	})	

	dghost.click(function(e){ //clicking the overlay for pillar D also works
		selectPillar(d,450)
		e.stopPropagation()
	})

	$("#names li, #values li").click(function(e){ //clicking data also highlights assoc. pillar
		var i = $(this).index()
		selectPillar(pillarArray[i],450)
		e.stopPropagation()
	})

	//swiping in directions changes the displayed data set
	mc.on("swipeleft", function(ev){
		timeChange("later")
	})
	mc.on("swiperight", function(ev){
		timeChange("earlier")
	})
	mc.on("swipeup", function(ev){
		scaleChange("smaller")
	})
	mc.on("swipedown", function(ev){
		scaleChange("bigger")
	})


	$(document).click(function(){
		unselectPillars(450)
	})



	//**************************************
	// CUSTOM FUNCTION DEFINITIONS
	//*****************************************

	function scaleChange(direction){
		if(direction == "bigger"){
			if(currentScale==scaleSet.length-1){
				currentScale=0
			}else{
				currentScale+=1
			}
			
		}else if(direction == "smaller"){
			if(currentScale==0){
				currentScale=scaleSet.length-1
			}else{
				currentScale-=1
			}
		} // end direction conditionals

		timeChange("none")
	}

	function timeChange(direction){  
		//supply "none" to direction to run shit without affecting time
		if(direction=="earlier"){ //-1
			console.log("earlier")
			if(currentTime==0){
				currentTime = scaleSet[currentScale].length-1
			} else{
			currentTime-=1
			}
		}
		else if(direction=="later"){ //+1
			console.log("later")
			if(currentTime==scaleSet[currentScale].length-1){
				currentTime = 0
			} else{
			currentTime+=1
			}
		} //end of direction conditionals

		moveToData(scaleSet[currentScale][currentTime])

		if(currentTime==0){
				$("#metric").text('morning')
			}else if(currentTime==1){
				$("#metric").text('afternoon')
			}else if(currentTime==2){
				$("#metric").text('evening')
			}else if(currentTime==3){
				$("#metric").text('midnight')
			}

		var listSelect = $("#dataSetIcons li").get(currentTime) //highlights icons
		$("#dataSetIcons li").not($(listSelect )).css('border','0px red solid')
		$(listSelect).css('border','3px red solid')
	
	} //end function metricSwipe


	function moveToData(dataSet){ //new dataset = pillar translation and server msg
		var lightv = 0

		pillarArray.forEach(function(ele,i){
			//console.log(dataSet[i])
			valueArray[i].unshift(500-((dataSet[i].height)*5))
			var translation = valueArray[i][0]
			movePillar(ele,translation,0,false)
			var nameSlot =  $('#names li').get(i)
			$(nameSlot).text(dataSet[i].name) //pushes names into li

			var valSlot =  $('#values li').get(i)
			$(valSlot).html(dataSet[i].value+ " <span class = 'unit'>" + dataSet[i].metric + "</span>") //pushes values into li

			lightv += dataSet[i].height
		})
		
		var jsonData = { //data push to server for pillar movement / light change
			height: dataSet[0].height,
			lightValue: Math.round(lightv/100)
		}
		//console.log(JSON.stringify(jsonData))
		socket.emit('demo shit', jsonData)

	} //end function moveToData

	function movePillar(pillar, amount, delay, horizontal){ //pillar motion function
		if(!horizontal){ //vertical translation:
			//set delay 
			var ltr = pillar.attr('id')
			var mask = g.select("#mask" + ltr ).select("#m" + ltr)
			var strokemask = themasks.select("#strokemask" + ltr).select('rect')



			pillar.animate({
				transform: "t 0 " + amount 
			},(amount*2.5)+500,mina.easeinout)
			
			mask.animate({
				transform: "t 0 " + -amount
			},(amount*2.5)+500,mina.easeinout)

			strokemask.animate({
				transform: "t 0 " + -amount
			},(amount*2.5)+500,mina.easeinout)

			if(ltr == "b"){
				bAmount = amount
			}
			if(ltr == "d"){
				dghosttop.animate({
					transform: "t 0 " + amount
				},(amount*2.5)+500,mina.easeinout)
				dAmount = amount
				if(dAmount>bAmount+100){
					dghost.animate({
						opacity: 0.5
					},800)
				}else{
					dghost.animate({
						opacity: 0
					}, 800)
				}
			}
		}else{ //horizontal movement: 


		}



	}//end function movePillar


	function selectPillar(pillar, speed){ //pillar highlighting function
		var ltr = pillar.attr('id')
		unselectPillars(450)
		var stroker = pillar.select('#' + ltr + '_stroker')
		stroker.animate({
			strokeDashoffset: 0
		}, speed)

		var index = pillarArray.indexOf(pillar)
		console.log(index)
		//corresponding colors, list items, etc.
		var colorArray =['#ffffff','red','yellow','blue']
		var translations = [[-100,0,150,0],[0,100,0,-100],[100,0,-150,0],[0,0,0,200]]

		var wrapperList = ['#awrapper','#bwrapper','#cwrapper','#dwrapper','#dgwrapper']

		var listHilight1 = $('#names li').get(index)
		var listHilight2 = $('#values li').get(index)

		$(wrapperList[index]).velocity({
			translateX: translations[index][0],
			translateY: translations[index][1]
		}, 400)

		wrapperList.splice(index,1)
		console.log(wrapperList)

		wrapperList.forEach(function(ele,i,arr){
			$(ele).velocity({
				translateX: translations[index][2],
				translateY: translations[index][3],
				opacity: 0.5
			},400)
		})

		$('#names li:nth-of-type(n+'+(index+2)+'), #values li:nth-of-type(n+'+(index+2)+')').velocity({
			translateY: 20,
			opacity: 0.4
		}, 250)
		$('#names li:nth-of-type(-n+'+index+'), #values li:nth-of-type(-n+'+index+')').velocity({
			translateY: -20,
			opacity: 0.4
		}, 250)



		$(listHilight1).velocity({
			opacity: 1
		}, 400)
		$(listHilight2).velocity({
			opacity: 1
		}, 400)
		

		// SELECTING SHOULD: 1. separate pillar spatially 2. color highlight
		//  3. dim other pillars (incl. icon) opacity 4. highlight data text
		// 5. remove pillar specific features (overlay for D)


	}//end function selectPillar

	function unselectPillars(speed){ //generic deselect for selecting new pillars
		$('#awrapper, #bwrapper, #cwrapper, #dwrapper, #dgwrapper').velocity({
			translateX: 0,
			translateY: 0,
			opacity: 1
		},400)
		$('#names li, #values li').velocity({
			opacity: 1,
			translateY: 0
		},400)	
		strokerArray = [a.select('#a_stroker'),b.select('#b_stroker'),c.select('#c_stroker'),d.select('#d_stroker')]
		offsetArray = [1600,1600,1600,1600]
		strokerArray.forEach(function(ele,i){
			ele.attr({
				strokeDashoffset: offsetArray[i]
			})			
		})
		
	
		
		

	} //end function unselectPillars


	function helperFly(){ //tophelpertext flies in and goes away
		$('#tophelper').velocity({
			translateX: "60%",
			opacity: 1
		},2400, "easeOutQuad", function(){
			$('#tophelper').velocity({
				translateX: "135%",
				opacity: -0.5
			},400,"easeInSine")
		})	
	} // end function helperFly

	function markerMove(updown){ //false == go down/hide, true == show
		var updownval = 150
		if(!updown){
			updownval !=updownval
		}
		var markerArray = [amarker,bmarker,cmarker,dmarker]
		var markerclipArray = [amarkerclip,bmarkerclip,cmarkerclip,dmarkerclip]
		markerArray.forEach(function(ele,i,arr){
			ele.animate({
				transform: "t 0 " + -updownval
			},600)
			markerclipArray[i].animate({
				transform: "t 0 " + updownval
			},600)
		})
	} // end function markerMove	

	function colorPulse(target,color,speed){ //color pulsing for qual.comm

	}

	function transformPopulate(target){


		 if(target.attr('transform').string !== ''){

		 	

		 	
		 	var transformarray = target.attr('transform').string.split(/[ ,]+/)
		 	
		 	transformarray.forEach(function(ele,i,arr){
		 		ele = ele.replace(/[^\d.-]/g, '');
		 		console.log(ele)
		 		arr[i] = ele
		 	})




		 	pillarTransformArray[pillarArray.indexOf(target)].xval = transformarray[0] 
		 	pillarTransformArray[pillarArray.indexOf(target)].yval = transformarray[1]
		 	pillarTransformArray[pillarArray.indexOf(target)].scaleval = transformarray[2]

		 	console.log(transformarray)
		 }
	}



})

