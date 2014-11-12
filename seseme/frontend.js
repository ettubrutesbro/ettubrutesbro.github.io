
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



	var a = g.select("#a")
	var b = g.select("#b")
	var c = g.select("#c")
	var d = g.select("#d")

	

	//amount, speed, delay...finally modifies a global value var per pillar


	var oldOffsetValue
	var selectedPillar


	
	
	
	a.click(function(){
		selectPillar(a, 450)
	})
	
	b.click(function(){
		selectPillar(b, 450)
	})	
	c.click(function(){
		selectPillar(c, 450)
	})	
	d.click(function(){
		selectPillar(d, 450)
	})



	function unselectPillars(speed){
	
		strokerArray = [a.select('#a_body'),b.select('#b_body'),c.select('#c_body'),d.select('#d_body')]
		offsetArray = [-1600,-1600,1600,1600]
		strokerArray.forEach(function(ele,i){
			ele.animate({
				strokeDashoffset: offsetArray[i]
			}, 450)			
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

	
})

