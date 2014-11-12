
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



	var a = g.select("#A_pillar")
	var b = g.select("#B_pillar")
	var c = g.select("#C_pillar")
	var d = g.select("#D_pillar")

	

	//amount, speed, delay...finally modifies a global value var per pillar

	var maska = g.select("#maska").select("#maskA")
	var maskb = g.select("#maskb").select("#maskB")
	var maskc = g.select("#maskc").select("#maskC")
	var maskd = g.select("#maskd").select("#maskD")

	var selectedPillar


	movePillar(a, maska, 500, 30)
	selectPillar(a, "#A_body", 600)
	


	function unselectPillars(pillar1, pillar2, pillar3){
		for(var i = 1; i<4; i++){
			console.log(i)
			var stroker = "pillar" + i

		}
	}

	function selectPillar(pillar, body, speed){
		//var stroker = pillar.select(body)
		stroker.animate({
			strokeDashoffset: 0
		}, speed)
	}

	function movePillar(pillar, mask, amount, delay){
		//set delay 
		
		var mask = "mask" + pillar
		
		console.log(pillar)
		console.log(mask)


		pillar.animate({
			transform: "t 0 " + amount
		},(amount*1.5)+150,mina.easeinout)
		
		mask.animate({
			transform: "t 0 " + -amount
		},(amount*1.5)+150,mina.easeinout)


	}
	
})

