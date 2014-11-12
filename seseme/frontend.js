
var mainSvg = Snap("#mainSvg")

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



	movePillar(a, maska, 500, 600, 30)
	movePillar(b, maskb, 300, 600, 30)
	movePillar(c, maskc, 100, 600, 30)
	movePillar(d, maskd, 200, 600, 30)

	function movePillar(pillar, mask, amount, speed, delay){
		//set delay 
	
		pillar.animate({
			transform: "t 0 " + amount
		},speed)
		
		mask.animate({
			transform: "t 0 " + -amount
		},speed)


	}
	
})

