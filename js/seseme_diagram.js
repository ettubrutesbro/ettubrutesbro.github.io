$(document).ready(function(){

	 var windowHeight = $(window).height(),
     windowWidth = $(window).width();

    

	var s = Snap("#diagram_big");
		Snap.load("assets/seseme/diagram.svg", function(f){
			var g;
			g = f.select("svg");
			s.append(g);

			s.attr({
				width: windowWidth + "px",
				height: windowHeight*(2/3) + "px",
			})

			var building = g.select('#building'), //item level
				brains = g.select('#brains'),
				seseme = g.select('#seseme'),
				phone = g.select('#phone'),
				social = g.select('#social'),
			//group level

				//"extraneous" arrays / vars for disappearing during minification
				buildingExtra = building.select('#extraneous'),
				brainsExtra = brains.selectAll('.extraneous'), //array needns forEach for anim
				sesemeExtra = seseme.selectAll('.extraneous'), //array needns forEach for anim
				phoneExtra = phone.select('#extraneous'),
				socialExtra = social.select('#extraneous'),
				//extras = [buildingExtra, brainsExtra, sesemeExtra, phoneExtra, socialExtra], //can we use this?

			//clicked or no
				buildingClick = false,
				brainsClick = false,
				sesemeClick = false,
				phoneClick = false,
				socialClick = false,
				
				//group components
					// individual paths etc. for drawing
				//building
				sol = building.select('#sun'),
				pointer1 = building.select('#pointer1'),
				pointer2 = building.select('#pointer2'),
				wifi1 = building.select('#wifi1'),
				wifi2 = building.select('#wifi2'),
				wifi3 = building.select('#wifi3'),
				grid = building.select('#grid'), //below are all solid lines and need attr
					d1 = grid.path("M-785 746"), d2 = grid.path("M-621 746"),d3 = grid.path("M-469 746"),d4 = grid.path("M-341 746"),d5 = grid.path("M-214 746"),d6 = grid.path("M -62 746"),d7 = grid.path("M 101 746"),
					h1 = grid.path("M -595 602"),h2 = grid.path("M -630 619"),h3 = grid.path("M -675 641"),h4 = grid.path("M -733 672"),h5 = grid.path("M -811 708"),
					gridlines = [d1,d2,d3,d4,d5,d6,d7,h1,h2,h3,h4,h5];

				windows = building.select('#windows'),	
				buildingFilter = g.select('#gausBlur2'),
				weirdline = building.select('#weirdline'),

				//brains
				stepper = brains.select('#stepper'),
				bigeasydriver = brains.select('#bigeasydriver'),
				beaglebone = brains.select('#beaglebone'),
				usb = brains.select('#usb'),
				nanowifi = brains.select('#nanowifi'),
				pwr = brains.select('#power'),
				inputoutput = brains.select('#IO'),
					wire = brains.select('#wire1'),
				brainsExtra2 = [usb, nanowifi, pwr, inputoutput],

				//seseme
				sesemePillar1 = seseme.select('#Pillar1'),sesemePillar2 = seseme.select('#Pillar2'),sesemePillar3 = seseme.select('#Pillar3'),sesemePillar4 = seseme.select('#Pillar4'),

				//phone
				text1 = phone.select("#text_a"),text2 = phone.select("#text_b"),text3 = phone.select("#text_c"),text4 = phone.select("#text_d"),text5 = phone.select("#text_e"),text6 = phone.select("#text_f"),text7 =phone.select("#text_g"),text8 = phone.select("#text_h"),
				phoneline = phone.path("M 1106,495 L 1131,531 L 1155,531").attr({stroke: "#000", strokeWidth: 5, fill: "none"}), 
				graph = phone.select('#graph'),

				//social
				phoneGuy = social.select("#guy1"),
				otherGuy = social.select("#guy2"),
				sightline = social.select('#sightline'),
				socialFilter = g.select("#gausBlur");

				//sets attributes for arrays of lines
				gridlines.forEach(function(ele){ //grid lines in building attr
					ele.attr({ 
						stroke: "#898989",
						strokeWidth: 5,
					})
				})

				//global timeout vars for clearing and setting
				var timeoutA, timeoutB, timeoutC, timeoutD;

				//text manipulation variables
				var title_1 = g.select("#title_1"),
					title_2 = g.select("#title_2"),
					title_3= g.select("#title_3"),
					title_4 = g.select("#title_4"),
					title_5 = g.select("#title_5"),
					head_1 = g.select("#head_1"),
					head_2 = g.select("#head_2"),
					head_3 = g.select("#head_3"),
					head_4 = g.select("#head_4"),
					head_5 = g.select("#head_5"),
					body_1 = g.select("#body_1"),
					body_2 = g.select("#body_2"),
					body_2a = g.select("#body_2a"),
					body_3 = g.select("#body_3"),
					body_3a = g.select("#body_3a"),
					body_4 = g.select("#body_4"),
					body_5 = g.select("#body_5");

		//ANIMATION

			building.mouseover(function(){
				if(!buildingClick && !brainsClick && !sesemeClick && !phoneClick && !socialClick){
				
				sol.animate({
						transform: "t 80 -100 s 0.75",
						opacity: 0.75
					}, 300)
				windows.animate({
					opacity: 1
				}, 300)
				}
			})
			brains.mouseover(function(){
				if(!buildingClick && !brainsClick && !sesemeClick && !phoneClick && !socialClick){
			
				beaglebone.animate({
					transform: "t -45 0"
				}, 300)
				stepper.animate({
					transform: "t 35 0"
				}, 300)
				}
			})
			seseme.mouseover(function(){
				if(!buildingClick && !brainsClick && !sesemeClick && !phoneClick && !socialClick){
				
				randomizeSeseme();
				}
			})
			phone.mouseover(function(){
				if(!buildingClick && !brainsClick && !sesemeClick && !phoneClick && !socialClick){
				
				var numberArr = [text2, text3, text4, text5, text6, text7, text8];

				numberArr.forEach(function(ele, i){
					ele.animate({
						opacity: 1
					}, 300);
				})

				phoneline.animate({
					path: "M 1106,495 L 1150,515 L 1168,515",
					opacity: 0
				}, 305)
				text1.animate({
					transform: "matrix(0.5 0 0 0.45 1190 518)",
				}, 300)
				text5.animate({ 
					transform: "matrix(1 0 0 1 1095 515)"
				}, 300)
				text6.animate({
					transform: "matrix(1 0 0 1 1095 540)"
				}, 300)
				text7.animate({
					transform: "matrix(1 0 0 1 1095 565)"
				}, 300)
				text8.animate({
					transform: "matrix(1 0 0 1 1095 590)"
				}, 300) 
			}
		})			
			social.mouseover(function(){
				if(!buildingClick && !brainsClick && !sesemeClick && !phoneClick && !socialClick){
				sightline.animate({
					x2: 1640
				}, 300)
				}
			})
			// MOUSE OUT EVENTS - SHOULD PROBABLY ONLY FIRE IF NOT ALREADY EXPANDED...
			building.mouseout(function(){
				if(!buildingClick){
				sol.animate({
					transform: "t 0 0 s 1"
				}, 300)
				windows.animate({
					opacity: 0
				}, 300)
			}
			})
		
			brains.mouseout(function(){
				if(!brainsClick){
				beaglebone.animate({
					transform: "t 0 0"
				}, 300)
				stepper.animate({
					transform: "t 0 0"
				}, 300)
			}
			})
			seseme.mouseout(function(){
				if(!sesemeClick){
					revertSeseme();
				}
			})
			phone.mouseout(function(){
				if(!phoneClick){
					revertPhone();
				}
			})
			social.mouseout(function(){
				if(!socialClick){
					revertSocial();
				}
			})
		
			// CLICK EVENTS - RESULT IN EXPANSION AND REVEAL
			building.click(function(e){
				buildingClick = true;
				restoreText();
					var pathArr = ["M -785 746 L-566 595", "M -621 746 L-530 641", "M -469 746 L-437 641", "M -341 746 L-341 641", "M -214 746 L-247 641", "M -62 746 L-153 641", "M 101 746 L-117 590", "M -595 602 L -87 602", "M -630 619 L -46 619", "M -675 641 L -117 641", "M -733 672 L 46 672", "M -811 708 L 133 708"]

				gridlines.forEach(function(ele, i){
					ele.animate({
						path: pathArr[i]
					}, 300)
				})

				building.animate({
					transform: "t 230 -110 s 1.25"
				},300)

				buildingExtra.animate({
						opacity: 1
				},300);

				buildingFilter.animate({
					stdDeviation: "8"
				},300)

				weirdline.animate({
					path: "M -113 641 L -27 641"
				},300)

				minimize(1,false,true,true,true,true);
				//replicate mouseover
				sol.animate({
					transform: "t 80 -30 s 0.65",
					opacity: 0.55
				}, 300)
				windows.animate({
					opacity: 1
				}, 300)

				timeoutA = window.setTimeout(function(){
					pointer1.animate({
						path: "M-27 641 L -27 420"
					},300)
					pointer2.animate({
						path: "M -267 388 L -120 335"
					},300)
				},400);

				timeoutB = window.setTimeout(function(){
					wifi1.animate({
						opacity: 0.5
					},150)
				},700);

				timeoutC = window.setTimeout(function(){
					wifi2.animate({
						opacity: 0.75
					},150)
				},800);

				timeoutD = window.setTimeout(function(){
					wifi3.animate({
						opacity: 1
					},150)
				},900);
				e.stopPropagation();
				
				title_1.animate({
					opacity: 0
				},300)
				head_1.animate({
					opacity: 1,
					transform: "matrix(1 0 0 1 340 200)"
				},300)
				body_1.animate({
					opacity: 1,
					transform: "matrix(1 0 0 1 420 265)"
				},300)
			})
			brains.click(function(e){
				brainsClick = true;
				restoreText();
				brains.animate({
					transform: "t -120 -35 s 1.35"
				},300);
 				minimize(2, true, false, true,true,true);
 				brainsExtra.forEach(function(ele){
						ele.animate({
							opacity:1
						},300)
					})
 				//replicate mouseover
 				beaglebone.animate({
					transform: "t -45 0"
				}, 300)
				stepper.animate({
					transform: "t 35 0"
				}, 300)

				brainsExtra2.forEach(function(ele){
					ele.animate({
						opacity: 1
					}, 800)
				})

				nanowifi.animate({
					transform: "t 0 63"
				}, 500)

				wire.animate({
					strokeDashoffset: 0
				}, 800)
				e.stopPropagation();

				title_2.animate({
					opacity: 0
				},300)
				head_2.animate({
					transform: "matrix(1 0 0 1 280 190)",
					opacity: 1
				},300)
				body_2.animate({
					transform: "matrix(1 0 0 1 530 265)",
					opacity: 1
				},300)

				timeoutA = window.setTimeout(function(){
					body_2a.animate({
						transform: "matrix(1 0 0 1 560 495)",
						opacity: 1
					},400)
				},400)

			})
			seseme.click(function(e){
				sesemeClick = true;
				restoreText();
				seseme.animate({
					transform: "t -50 -45 s 1.15"
				},300)
				minimize(3, true, true, false, true, true);
					
				sesemeExtra.forEach(function(ele){
					ele.animate({
						opacity:1
					},300)
				})
					randomizeSeseme();
					e.stopPropagation();

				title_3.animate({
					opacity: 0
				},300)
				body_3.animate({
					opacity: 1,
					transform: "matrix(1 0 0 1 40 265)"
				},300)
				body_3a.animate({
					opacity: 1,
					transform: "matrix(1 0 0 1 930 265)"
				},300)
				head_3.animate({
					opacity: 1,
					transform: "matrix(1 0 0 1 90 200)"
				},300)
			})
			phone.click(function(e){
				phoneClick = true;
				restoreText();
				phone.animate({
					transform: "t 130 -30 s 1.3"
				},300)
				minimize(4, true, true, true, false, true);
				phoneExtra.animate({
						opacity: 1
				},300);
				//replicate mouseover
				var numberArr = [text2, text3, text4, text5, text6, text7, text8];
				numberArr.forEach(function(ele, i){
					ele.animate({
						opacity: 1
					}, 300);
				})

				title_4.animate({
					opacity: 0
				},300)

				phoneline.animate({
					path: "M 1106,495 L 1150,515 L 1168,515",
					opacity: 0
				}, 305)
				text1.animate({
					transform: "matrix(0.5 0 0 0.45 1190 518)",
				}, 300)
				text5.animate({ 
					transform: "matrix(1 0 0 1 1095 515)"
				}, 300)
				text6.animate({
					transform: "matrix(1 0 0 1 1095 540)"
				}, 300)
				text7.animate({
					transform: "matrix(1 0 0 1 1095 565)"
				}, 300)
				text8.animate({
					transform: "matrix(1 0 0 1 1095 590)"
				}, 300) 

				head_4.animate({
					opacity: 1
				}, 500)
				body_4.animate({
					opacity: 1
				}, 500)

				e.stopPropagation();

			})
			social.click(function(e){
				socialClick = true;
				restoreText();
				social.animate({
					transform: "t -200 -60 s 1.35"
				},300)
				socialExtra.animate({
						opacity: 0.7
				},300);

				otherGuy.animate({
					transform: "t 100 0"
				},300);

				socialFilter.animate({
					stdDeviation: "4"
				}, 300);
				sightline.animate({
					x2: 1543
				}, 300)
				minimize(5, true, true, true, true, false);
				title_5.animate({
					opacity: 0
				},300)
				head_5.animate({
					opacity: 1
				},300)
				body_5.animate({
					opacity: 1
				}, 300)

				e.stopPropagation();
			})
		
			$(document).click(function(){ //when clicking outside targets

					
					var theBigFive = [building, brains, seseme, phone, social],
					simpleExtras = [buildingExtra, phoneExtra, socialExtra],
					arrayedExtras = [brainsExtra, sesemeExtra];

					theBigFive.forEach(function(ele){ //everything to default coords and scale
						ele.animate({
							transform: "t 0 0 s 1"
						},300)
					})

					simpleExtras.forEach(function(ele){ //non array extras fade in
						ele.animate({
							opacity: 1
						},300)
					})

					arrayedExtras.forEach(function(ele){
						ele.forEach(function(e){
							e.animate({
								opacity:1
							},300)
						})
					})

					revertBuilding();
					revertBrains();
					revertSeseme();
					revertPhone();
					revertSocial();

					restoreText();					
			})

	function randomizeSeseme(){
		var min = -50,
			max = 60,
			h1 = Math.floor(Math.random()*(max - min + 15)) + min, 
			h2 = Math.floor(Math.random()*(max - min + 15)) + min, 
			h3 = Math.floor(Math.random()*(max - min + 15)) + min, 
			h4 = Math.floor(Math.random()*(max - min + 15)) + min;

			sesemePillar1.animate({
				transform: "t 0 " +h1 
			}, 500)
			sesemePillar2.animate({
				transform: "t 0 " + h2
			}, 500)
			sesemePillar3.animate({
				transform: "t 0 " + h3
			}, 500)
			sesemePillar4.animate({
				transform: "t 0 " +h4
				}, 500)
	}
	function revertBuilding(){ 
		clearTimeout(timeoutA);
		clearTimeout(timeoutB);
		clearTimeout(timeoutC);
		clearTimeout(timeoutD);

		buildingClick = false;

		var pathArr = ["M -785 746", "M -621 746", "M -469 746", "M -341 746", "M -214 746", "M -62 746", "M 101 746", "M -595 602", "M -630 619", "M -675 641", "M -733 672", "M -811 708"]
		gridlines.forEach(function(ele, i){
			ele.animate({
				path: pathArr[i]
			}, 300)
		})
		sol.animate({
			transform: "t 0 0 s 1",
			opacity: 1
		}, 300)
		windows.animate({
			opacity: 0
		}, 300)
		weirdline.animate({
			path: "M -113 641"
		},300)
		pointer1.animate({
			path: "M-27 641"
		},300)
		pointer2.animate({
			path: "M -267 388"
		},300)
		wifi1.animate({
			opacity: 0
		},300)
		wifi2.animate({
			opacity: 0
		},300)
		wifi3.animate({
			opacity: 0
		},300)
		buildingFilter.animate({
			stdDeviation: "0"
		},300)
	}

	function revertBrains(){
		brainsClick = false;

		beaglebone.animate({
			transform: "t 0 0"
		}, 300)
		stepper.animate({
			transform: "t 0 0"
		}, 300)

		brainsExtra2.forEach(function(ele){
			ele.animate({
				opacity: 0
			}, 800)
		})

		nanowifi.animate({
			transform: "t 0 0"
		}, 300)
		wire.animate({
			strokeDashoffset: 400
		}, 300)
	}

	function revertPhone(){
		phoneClick = false;
		var numberArr = [text2, text3, text4, text5, text6, text7, text8];
			numberArr.forEach(function(ele, i){
				ele.animate({
					opacity: 0
				}, 300);
			})
		phoneline.animate({
			path: "M 1106,485 L 1131,521 L 1149,521",
			opacity: 1
		}, 300)
		text1.animate({
			transform: "matrix(1 0 0 1 1170 545)",
		}, 300);
		text5.animate({
			transform: "matrix(1 0 0 1 1075 515)"
		}, 300)
		text6.animate({
			transform: "matrix(1 0 0 1 1075 540)"
		}, 300)
		text7.animate({
			transform: "matrix(1 0 0 1 1075 565)"
		}, 300)
		text8.animate({
			transform: "matrix(1 0 0 1 1075 590)"
		}, 300)
	}

	function revertSeseme(){
		sesemeClick = false;
			var pillars = [sesemePillar1, sesemePillar2, sesemePillar3, sesemePillar4];

			pillars.forEach(function(ele){
				ele.animate({
					transform: "t 0 0"
				}, 500)
			})
	}

	function revertSocial(){
		socialClick = false;
		otherGuy.animate({
			transform: "t 0 0"
		},300);
		socialFilter.animate({
			stdDeviation: "0"
		}, 300);
		sightline.animate({
			x2: 1543
		}, 300)
	}

	function restoreText(){
		title_1.animate({
			transform: "matrix(1 0 0 1 -567 740)",
			opacity: 1
		}, 300)
		head_1.animate({
			transform: "matrix(1 0 0 1 140 200)",
			opacity: 0
		}, 300)
		body_1.animate({
			opacity: 0,
			transform: "matrix(1 0 0 1 320 265)"
		}, 300)
		title_2.animate({
			transform: "matrix(1 0 0 1 17 740)",
			opacity: 1
		}, 300)
		head_2.animate({
			transform: "matrix(1 0 0 1 180 290)",
			opacity: 0
		},300)
		body_2.animate({
			transform: "matrix(1 0 0 1 430 265)",
			opacity: 0
		},300)
		body_2a.animate({
			transform: "matrix(1 0 0 1 560 365)",
			opacity: 0
		},300)
		title_3.animate({
			transform: "matrix(1 0 0 1 612 740)",
			opacity: 1
		}, 300)
		body_3.animate({
			opacity: 0,
			transform: "matrix(1 0 0 1 130 265)"
		}, 300)
		body_3a.animate({
			opacity: 0,
			transform: "matrix(1 0 0 1 830 265)"			
		}, 300)

		head_3.animate({
			opacity: 0,
			transform: "matrix(1 0 0 1 300 200)"
		}, 300)

		title_4.animate({
			transform: "matrix(1 0 0 1 998 740)",
			opacity: 1
		}, 300)
		head_4.animate({
			opacity: 0
		},300)
		body_4.animate({
			opacity: 0
		}, 300)
		head_5.animate({
			opacity: 0
		},300)
		body_5.animate({
			opacity: 0
		},300)
		title_5.animate({
			transform: "matrix(1 0 0 1 1443 740)"
		}, 300)
	}

		function minimize(whichOne, build, brain, sesem, phon, socia){ //opacity of extraneous elements + scale of overall item

				//push whichOne into beginning of array, remove [2]....check for [0] == [1] etc.  
				if(build){	
					title_1.animate({
						transform: "matrix(0.7 0 0 0.7 -600 740)"
					},300)

					buildingExtra.animate({
						opacity: 0
					},300);

					building.animate({
						transform: "matrix(0.6,0,0,0.6,-230,290)"
					},300)	
					revertBuilding();
				}
				
				if(brain){	
					brainsExtra.forEach(function(ele){
						ele.animate({
							opacity:0
						},300)
					})
					if(whichOne < 2){ //go right
						brains.animate({
							transform: "t 565 110 s 0.6"
						},300)
						title_2.animate({
							transform: "matrix(0.7 0 0 0.7 650 740)"
						},300)
					}else{ //go left
						brains.animate({
							transform: "t -315 105 s 0.6"
						},300)
						title_2.animate({
							transform: "matrix(0.7 0 0 0.7 -217 740)"
						},300)
					}
					revertBrains();
				}

				if(sesem){
					sesemeExtra.forEach(function(ele){
						ele.animate({
							opacity:0
						},300)
					})
					if(whichOne < 3){ //go right
						title_3.animate({
							transform: "matrix(0.7 0 0 0.7 1000 740)"
						},300)
						seseme.animate({
							transform: "t 475 240 s 0.6"
						},300)
					} else { //go left
						title_3.animate({
							transform: "matrix(0.7 0 0 0.7 170 740)"
						},300)
						seseme.animate({
							transform: "t -355 240 s 0.6"
						},300)
					}
					revertSeseme();
				}
				if(phon){
					phoneClick = false;
					phoneExtra.animate({
						opacity:0
					},300)
					graph.animate({
						strokeWidth: 5
					}, 300)

					if(whichOne < 4){ //go right
						title_4.animate({
							transform: "matrix(.7 0 0 .7 1240 740)"
						},300)
						phone.animate({
							transform: "t 190 155"
						},300)
					} else { //go left
						title_4.animate({
							transform: "matrix(.7 0 0 .7 430 740)"
						},300)
						phone.animate({
							transform: "t -620 155"
						},300)
					}
					revertPhone();
				}

				if(socia){	
					title_5.animate({
						transform: "matrix(.7 0 0 .7 1520 740)"
					},300)
					socialExtra.animate({
						opacity:0
					},300)
					social.animate({
						transform: "t 30 80 s 0.6"
					}, 300)
					revertSocial();
				}
			}
	})
})