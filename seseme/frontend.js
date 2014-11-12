
var mainSvg = Snap("#mainSvg")

var ht = window.screen.availHeight
var wid = window.screen.availWidth

$('#metric').text('height ' + ht)
$('#targeted').text('width ' + wid)


Snap.load("sesemeiso2.svg", function(svgFile){
	var g
	g = svgFile.select("svg")
	mainSvg.append(g)

	var a = g.select("#A_pillar")
	var b = g.select("#B_pillar")
	var c = g.select("#C_pillar")
	var d = g.select("#D_pillar")

	

	//amount, speed, delay...finally modifies a global value var per pillar

	var maska = g.select("#maska").select("#maskA")
	var maskb = g.select("#maskb").select("#maskB")
	var maskc = g.select("#maskc").select("#maskC")
	var maskd = g.select("#maskd").select("#maskD")

	g.attr({
		viewBox: "0 0 "+ ht + " " + wid
	})


	//movePillar(a, maska, 500, 30)
	movePillar(b, maskb, 300, 30)
	movePillar(c, maskc, 100, 30)
	movePillar(d, maskd, 200, 30)

	a.click(function(){
		console.log(body)
		var body = a.select("#A_body")
		body.animate({
			strokeDashoffset: 0
		},600)
	})

	function movePillar(pillar, mask, amount, delay){
		//set delay 
	
		pillar.animate({
			transform: "t 0 " + amount
		},(amount*1.5)+150,mina.easeinout)
		
		mask.animate({
			transform: "t 0 " + -amount
		},(amount*1.5)+150,mina.easeinout)


	}
	
})

