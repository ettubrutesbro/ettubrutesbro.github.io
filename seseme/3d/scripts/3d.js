    
    //3d.js: all three.js code for SESEME UI. 1) DISPLAY   2) ANIMATE   3) INTERACT

    //basic display 
    var container //dom element
    var scene = new THREE.Scene()
    // in the near future this will need to be dependent on 
    // parent container's dimensions not the window
    var aspect = window.innerWidth / window.innerHeight

    var d = 20
    var camera = new THREE.OrthographicCamera( - d * aspect, d * aspect, d, - d, 1, 1000 )
    var loader = new THREE.JSONLoader()
    var renderer
   
    //dividing loaded model into manipulable groups 
    var seseme = new THREE.Group()
    var pedestal, orb
    var pillargroup = new THREE.Group()

    //data array stores all data
    //on user data shift (changing metric/scale),
    //sample requested section of data array and pass to value array
    //value(s) in array interface with the pillars

    var val1, val2, val3, val4
    var valarray = [val1, val2, val3, val4]


    //variables for INTERACT functions
    var raycaster
    var mouseLocation = new THREE.Vector2()
    var mouseTarget
    var myElement //hammer target variable
    var rotationTargetArray = [0, -90, 90, -180]
    var oldSelection //for determining rotation direction


    //variables for ANIMATION
    var currentPosition = {x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0}
    var targetPosition = {x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0}

    var pillarHeights = [{y:0},{y:0},{y:0},{y:0}]
    var pillarTargets = [{y:2},{y:5},{y:1},{y:3}]

    //-----------------------------------------------
    // END GLOBAL VARIABLE DECLARATION
    //-----------------------------------------------


    //core functions setup scene and draw it every frame
    setup()
    animate() //render() is nested in here
    initTouchEvents()

    function setup(){
      camera.position.set( -20, 20, 20 )
      camera.rotation.order = 'YXZ'
      camera.rotation.y = - Math.PI / 4
      camera.rotation.x = Math.atan( - 1 / Math.sqrt( 2 ) )

      //place the renderer(canvas) within DOM element (div)
      container = document.createElement("div")
      document.body.appendChild(container)
      container.id = "containerSESEME"
      renderer = new THREE.WebGLRenderer({antialias: true})
      renderer.setSize( window.innerWidth, window.innerHeight )
      container.appendChild( renderer.domElement )

      //materials for seseme & orb (eventually need multiples for seseme?)
      var sesememtl = new THREE.MeshLambertMaterial(0x0000ff)
      //var sesememtl = new THREE.MeshNormalMaterial(0x0000ff)
      var orbmtl = new THREE.MeshPhongMaterial(0xffffff)
      var outlinemtl = new THREE.MeshBasicMaterial( { color: 0xff0000, linewidth: 4} )

      //LIGHTING
      light = new THREE.PointLight(0xffffff, 0.5)
      light2 = new THREE.AmbientLight(0x1a1a1a, 0)
      light.position.set(0,17,10)
      scene.add(light)
      scene.add(light2)

      // INTERACT setup -- event listener, initializing interact vars
      window.addEventListener( 'mousemove', onMouseMove, false)
      window.addEventListener( 'mouseup', onMouseUp, false)
      window.addEventListener( 'mousedown', onMouseDown, false)
      window.addEventListener( 'deviceorientation', onDeviceOrient, false)

      mouseLocation = { x:0, y:0, z:1 }
      raycaster = new THREE.Raycaster()
      //outline attempts

      
     

      // EXTERNAL LOADING - getting .js 3d models into the canvas
      loader.load("assets/pedestal.js", function(geometry,evt){

        pedestal = new THREE.Mesh(geometry, sesememtl)
        pedestal.applyMatrix( new THREE.Matrix4().makeTranslation(1.5, 0, 1))
        pedestal.scale.set(0.5,0.5,0.5)
        pedestal.name = "pedestal"
        pedestal.overdraw = true
        seseme.add(pedestal)

      }) 

      loader.load("assets/pillarA.js", function(geometry,evt){

         var outTgt = geometry.vertices
         // var outlineGeometry = new THREE.Geometry()
         // outlineGeometry.vertices.push(outTgt[2], outTgt[3], outTgt[0], outTgt[8])
        // var outlineGeometry2 = new THREE.Geometry()
        // outlineGeometry2.vertices.push(outTgt[2], outTgt[1], outTgt[0])
        // var outlineGeometry3 = new THREE.Geometry()
        // outlineGeometry3.vertices.push(outTgt[3], outTgt[5], outTgt[4])
        // var outlineGeometry4 = new THREE.Geometry()
        // outlineGeometry4.vertices.push(outTgt[1], outTgt[6], outTgt[7])
        // var outlineGeometry5 = new THREE.Geometry()
        // outlineGeometry5.vertices.push(outTgt[2], outTgt[9], outTgt[5]) 
        // var outlineGeometry6 = new THREE.Geometry()
        // outlineGeometry6.vertices.push(outTgt[9], outTgt[6])

       var pillar1 = new THREE.Mesh(geometry, sesememtl)
        pillar1.applyMatrix( new THREE.Matrix4().makeTranslation( -5, 0, -5 ) )
        pillar1.scale.set(0.5,0.5,0.5)
        pillar1.overdraw = true
        pillar1.name = "pillar1"
        pillargroup.add(pillar1)

         // var outlineGeometry = new THREE.Geometry()
         // outlineGeometry.vertices = [outTgt[2], outTgt[3], outTgt[3],
         // outTgt[0], outTgt[0], outTgt[1], outTgt[2],outTgt[1],outTgt[0],outTgt[8],outTgt[8],outTgt[4],
         // outTgt[4],outTgt[5], outTgt[5], outTgt[3], outTgt[1],outTgt[6],outTgt[6],outTgt[7]]
         // var line = new THREE.Line(outlineGeometry, outlinemtl)
         // line.type = THREE.LinePieces
         // line.name = "line1"
         // pillar1.add(line)

        
        

      var pillar3 = new THREE.Mesh(geometry, sesememtl)
        pillar3.applyMatrix( new THREE.Matrix4().makeTranslation( 5, 0, -5 ) )
        pillar3.scale.set(0.5,0.5,0.5)
        pillar3.rotation.y = -90 * Math.PI / 180
        pillar3.overdraw = true
        pillar3.name = "pillar3"
        pillargroup.add(pillar3)
      })

      loader.load("assets/pillarB.js", function(geometry,evt){
      var pillar2 = new THREE.Mesh(geometry, sesememtl)
        pillar2.applyMatrix( new THREE.Matrix4().makeTranslation( -5, 0, -5 ) )
        pillar2.scale.set(0.5,0.5,0.5)
        pillar2.overdraw = true
        pillar2.name = "pillar2"
        pillargroup.add(pillar2)

      var pillar4 = new THREE.Mesh(geometry, sesememtl)
        pillar4.applyMatrix( new THREE.Matrix4().makeTranslation( -5, 0, 5 ) )
        pillar4.scale.set(0.5,0.5,0.5)
        pillar4.rotation.y = 90 * Math.PI / 180
        pillar4.overdraw = true
        pillar4.name = "pillar4"
        pillargroup.add(pillar4)

      })

      //the orb is generated here (adjust segments for smooth)
      orb = new THREE.Mesh( new THREE.SphereGeometry( 2.75, 7, 5 ), orbmtl )
      orb.position.set(0,-3,0) //it's down but visible
      seseme.add (orb)

      seseme.add(pillargroup)
      scene.add (seseme)

        // updateValues(1,8,100)
        // updateValues(2,5,50)
        // updateValues(3,1,80)
        // updateValues(4,3,100)

        if(window.DeviceOrientationEvent){
          console.log('shit be supported')
        }
        setTimeout(function(){updateValues()},1000) //no idea why, but this only
        // works with a setTimeout that waits (even 10ms is enough) to fire it

    } //end setup

    function animate(){ //put 3d animations here
        requestAnimationFrame( animate )
     
        render()

        TWEEN.update()

      } // end animate

    function render() { //put frame-by-frame checks and operations here
      //such as RENDERING or checking
        //DISPLAY
        renderer.render( scene, camera )

    } // end render

    function onMouseMove(evt){ //mouse movements update X / Y pos
      evt.preventDefault()
      mouseLocation.x = ( evt.clientX / window.innerWidth ) * 2 - 1;
      mouseLocation.y = - ( evt.clientY / window.innerHeight ) * 2 + 1;

     } // end onMouseMove
     function onMouseDown(evt){
      raycaster.setFromCamera(mouseLocation, camera)
      var intersects = raycaster.intersectObjects(pillargroup.children)
      mouseTarget = intersects[0].object.name
     }
     function onMouseUp(evt){
      raycaster.setFromCamera(mouseLocation, camera)
      var intersects = raycaster.intersectObjects(pillargroup.children)
      if(intersects[0].object.name == mouseTarget){ //did you let go on the same pillar you started on?
        var index = (intersects[0].object.name).replace('pillar','') 
        var oldRotation, newRotation, realRotation 
        //old / new to determine direction, then realRot to make relevant to (>360? rotations)
      currentPosition.ry = scene.rotation.y

      targetPosition.ry = rotationTargetArray[index-1]*(Math.PI / 180)

      console.log('began at ' + scene.rotation.y*(180/Math.PI))
      oldRotation = scene.rotation.y*(180/Math.PI)

      var rotationTween = new TWEEN.Tween(currentPosition)

      var update = function(){
        scene.rotation.y = currentPosition.ry
      }

      rotationTween.to(targetPosition,750) 
      rotationTween.easing(TWEEN.Easing.Quadratic.Out)
      rotationTween.onUpdate(update)
      rotationTween.onComplete(function(){
        console.log('finished at ' + scene.rotation.y*(180/Math.PI))
        newRotation = scene.rotation.y*(180/Math.PI)
         if(oldRotation>newRotation){ //1>2, 2>4, etc
            console.log('you rotated backwards') //reconf. array to go neg
          } else {
            console.log('you rotated forwards')//reconf. array to go pos
          }
      })
      rotationTween.start()

      //>2: -90 to 4, -180 to 3, 90 to 0
      //>3: 90 to 4, 180 to 2, -90 to 0 
      //>4: -90 to 3, 90 to 2, 180 to 0       
      
    
      


      } else { //didn't mousedown on a pillar to begin with
        console.log('no')
      }
      

     }


    function updateValues(){ //valarray[index] is updated,
      // causing pillar[index] to move by change over duration
        console.log('updating values...')
        pillargroup.children.forEach(function(e,i){
        var index = (e.name).replace('pillar','')
        console.log(index)
        //need to convert the above into a number
        var pillarUpd = function(){
          e.position.y = pillarHeights[index-1].y
        }

        var pillarTween = new TWEEN.Tween(pillarHeights[index-1])
        pillarTween.to(pillarTargets[index-1],1200)
        pillarTween.onUpdate(pillarUpd)
        pillarTween.easing(TWEEN.Easing.Quadratic.InOut)

        pillarTween.start()
      })

    }

    function onDeviceOrient(evt){
      console.log(evt.gamma) 
      console.log(evt.beta) 
      console.log(evt.alpha) 
    }

    function initTouchEvents(){
      myElement = document.getElementById('containerSESEME')
      touchEvts = new Hammer(myElement)
      touchEvts.on('pan',function(evt){
        scene.rotation.y-=(evt.velocity)*(Math.PI/90)
      })
      touchEvts.on('panend',function(evt){
       
        var currentSpeed = {speed: evt.velocity}
        var update = function(){
          scene.rotation.y-=currentSpeed.speed * (Math.PI/90)
        }
        rotationDeceleration = new TWEEN.Tween(currentSpeed)
        rotationDeceleration.to({speed: 0},1000)
        rotationDeceleration.onUpdate(update)
        rotationDeceleration.easing(TWEEN.Easing.Exponential.Out)
        rotationDeceleration.onComplete(function(){
           console.log(scene.rotation.y*(180/Math.PI))
        })
        rotationDeceleration.start()
      })
    }



    