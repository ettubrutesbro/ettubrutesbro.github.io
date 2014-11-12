
var socket = io('10.0.1.241:5000')

var stateArray = [dataMorning, dataNoon, dataEvening, dataMidnight, dataTweets]
var currentSet = 1
var valueArray = [[500],[500],[500],[500]]

var mainSvg = Snap("#mainSvg")

var ht = window.screen.availHeight
var wid = window.screen.availWidth






Snap.load("sesemeiso2.svg", function(svgFile){
	var g
	g = svgFile.select("svg")
	mainSvg.append(g)


	/*g.attr({ //scale viewbox to available screen res
		viewBox: "0 0 "+ ht + " " + wid
	})*/
	g.attr({
		viewBox: "250 0 550 1920"
	})


	var a = g.select("#a")
	var b = g.select("#b")
	var c = g.select("#c")
	var d = g.select("#d")

	var pillarArray = [a,b,c,d]

	//amount, speed, delay...finally modifies a global value var per pillar
	
	pillarArray.forEach(function(ele,i){
		ele.click(function(){
			selectPillar(ele,450)
		})
	})	

	g.attr({
		transform: "t 0 30 s 1.1"
	})

	moveToData(stateArray[currentSet])

	function moveToData(dataSet){

		var lightv = 0

		pillarArray.forEach(function(ele,i){
			//console.log(dataSet[i])
			valueArray[i].unshift(500-((dataSet[i].height)*5))
			var translation = valueArray[i][0]
			movePillar(ele,translation,0)
			var nameSlot =  $('#names li').get(i)
			$(nameSlot).text(dataSet[i].name)

			var valSlot =  $('#values li').get(i)
			$(valSlot).text(dataSet[i].value+ " " + dataSet[i].metric)

			lightv += dataSet[i].height
		})

		
		var jsonData = {
				height: dataSet[0].height,
				lightValue: Math.round(lightv/100)
			}
		console.log(JSON.stringify(jsonData))
			
		socket.emit('demo shit', jsonData)

	}

	function unselectPillars(speed){
		strokerArray = [a.select('#a_body'),b.select('#b_body'),c.select('#c_body'),d.select('#d_body')]
		offsetArray = [1600,1600,1600,1600]
		strokerArray.forEach(function(ele,i){
			ele.attr({
				strokeDashoffset: offsetArray[i]
			})			
		})
	}

	function selectPillar(pillar, speed){
		var ltr = pillar.attr('id')
		unselectPillars(450)
		var stroker = pillar.select('#' + ltr + '_body')
		stroker.animate({
			strokeDashoffset: 0
		}, speed)

		selectedPillar = stroker
	}

	function movePillar(pillar, amount, delay){
		//set delay 
		var ltr = pillar.attr('id')
		var mask = g.select("#mask" + ltr ).select("#m" + ltr)

		pillar.animate({
			transform: "t 0 " + amount
		},(amount*2.5)+500,mina.easeinout)
		
		mask.animate({
			transform: "t 0 " + -amount
		},(amount*2.5)+500,mina.easeinout)

	}


	$("#dataChanger").click(function(){
	if(currentSet==stateArray.length-1){
		currentSet = 0
	} else{
	currentSet+=1
	}
	console.log(currentSet + ": " + stateArray[currentSet])
	moveToData(stateArray[currentSet])
	if(currentSet==4){
		$("#metric").text('trending tweets per day')
	}else{
		$("#metric").text('scc energy breakdown')
	}
})

	
})

