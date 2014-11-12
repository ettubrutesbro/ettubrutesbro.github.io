

var stateArray = [dataMorning, dataNoon, dataEvening, dataMidnight, dataTweets]
var currentSet = 1

var mainSvg = Snap("#mainSvg")

var ht = window.screen.availHeight
var wid = window.screen.availWidth





$('#metric').text('height ' + ht)
$('#targeted').text('width ' + wid)


Snap.load("sesemeiso2.svg", function(svgFile){
	var g
	g = svgFile.select("svg")
	mainSvg.append(g)


	/*g.attr({ //scale viewbox to available screen res
		viewBox: "0 0 "+ ht + " " + wid
	})*/
	g.attr({
		viewBox: "-50 " + ht/4 + " 1080 1920"
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

	function moveToData(dataSet){
		pillarArray.forEach(function(ele,i){
			console.log(dataSet[i])
			movePillar(ele,(dataSet[i].height)*5,0)
		})

	}

	function unselectPillars(speed){
		strokerArray = [a.select('#a_body'),b.select('#b_body'),c.select('#c_body'),d.select('#d_body')]
		offsetArray = [-1600,-1600,1600,1600]
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
		},(amount*1.5)+150,mina.easeinout)
		
		mask.animate({
			transform: "t 0 " + -amount
		},(amount*1.5)+150,mina.easeinout)


	}

	

	$("#dataChanger").click(function(){
	if(currentSet==stateArray.length-1){
		currentSet = 0
	} else{
	currentSet+=1
	}
	console.log(currentSet + ": " + stateArray[currentSet])
	moveToData(stateArray[currentSet])
})

	
})

