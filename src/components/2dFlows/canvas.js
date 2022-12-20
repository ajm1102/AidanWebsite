import './canvas.css'
import {FixHighlight}  from './functions'
import React, { useRef, useEffect } from 'react'
import { euler } from './euler'
import { useWindowDimensions } from './resize'
import { MathComponent } from "mathjax-react";


const Display = props => {
  const { height, width } = useWindowDimensions();
  let particlesArray = []

  class Particle {
    constructor(mouseLoc){
      this.x = mouseLoc.x
      this.y = mouseLoc.y

    }
    update(){  
      if (isDraggingMove != true ) {
      let cords = euler(this.x, this.y, props) 
      this.x = cords[0]
      this.y = cords[1]
      }
    }
  
    draw(ctx){
        if (isDraggingMove != true ) {
        ctx.fillStyle = '#ff0db2';
        ctx.beginPath();
        ctx.arc((this.x - mouseLoc.scaleX)*cameraZoom, (this.y - mouseLoc.scaleY)*cameraZoom , 1, 0, Math.PI * 2)
        ctx.fill();



        }
        let ctxHidden = canvasRefHidden.current.getContext('2d');

        ctxHidden.fillStyle = '#ff0db2';
        ctxHidden.beginPath();
        ctx.arc((this.x - mouseLoc.scaleX)*cameraZoom, (this.y - mouseLoc.scaleY)*cameraZoom , 1, 0, Math.PI * 2)
        ctxHidden.fill();

    }
  }

  const mouseLoc = {
    x: undefined,
    y: undefined,
    scaleX: undefined,
    scaleY: undefined,
    zoomoffX: undefined,
    zoomoffY: undefined
  }

  const canvasDefault = {
    height: height,
    width: Math.floor(width/1.4),
    zoomScale: undefined
  }

  const canvasRef = useRef(null);
  const canvasRefHidden = useRef(null)

  let cameraZoom =  100
  let MAX_ZOOM = 100000
  let MIN_ZOOM = 0.1
  let SCROLL_SENSITIVITY = 0.0005
  let isDragging = false
  let isDraggingMove = false

  let cameraOffset = { x: 0, y: 0}
  let dragStart = { x: 0, y: 0 }


  const handleCanvasClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();

    mouseLoc.scaleX = ((((rect.left - (canvasDefault.width/2)/cameraZoom ) )- cameraOffset.x/cameraZoom )) //+ mouseLoc.zoomoffX
    mouseLoc.scaleY = ((((rect.left - (canvasDefault.height/2)/cameraZoom )) - cameraOffset.y/cameraZoom ))// + mouseLoc.zoomoffY

    mouseLoc.x = ((e.clientX/cameraZoom + mouseLoc.scaleX) )
    mouseLoc.y = ((e.clientY/cameraZoom + mouseLoc.scaleY))
    
    particlesArray.push(new Particle(mouseLoc))
  }

  function handleParticles(context){
    for (let i = 0; i < particlesArray.length; i++){
        particlesArray[i].draw(context);
        particlesArray[i].update(context);        
    }
  }

  useEffect(() => {
    const context = canvasRef.current.getContext('2d');
    let animationFrameId
    const render = () => {
        handleParticles(context);
        animationFrameId = window.requestAnimationFrame(render);
        
      }
    render()
    return () => {
        window.cancelAnimationFrame(animationFrameId)
      }
  }, [handleParticles])

 function clearArrayReset(e){
    particlesArray.length = 0;
    const context = canvasRef.current.getContext('2d');
    context.clearRect(0, 0, canvasDefault.width, canvasDefault.height)
    redrawaxis()
    return 
  }


  // Gets the relevant location from a mouse or single touch event
  function getEventLocation(e){
      if (e.touches && e.touches.length === 1)
      {
          return { x:e.touches[0].clientX, y: e.touches[0].clientY }
      }
      else if (e.clientX && e.clientY)
      {
          return { x: e.clientX, y: e.clientY }        
      }
  }
  
  
  function onPointerDown(e){
      isDragging = true
      dragStart.x = getEventLocation(e).x*2 - cameraOffset.x
      dragStart.y = getEventLocation(e).y*2 - cameraOffset.y
  }
  
  function onPointerUp(e){
      isDragging = false
      lastZoom = cameraZoom
      isDraggingMove = false
  }
  
  function onPointerMove(e){
      if (isDragging)
      {
          isDraggingMove = true
          cameraOffset.x = getEventLocation(e).x*2 - dragStart.x
          cameraOffset.y = getEventLocation(e).y*2 - dragStart.y 

          redrawaxis()
      }
  }
  
  let lastZoom = cameraZoom
  
  function adjustZoom(zoomAmount){
      if (!isDragging)
      {
          if (zoomAmount)
          {
              cameraZoom += zoomAmount
          }
          const rect = canvasRef.current.getBoundingClientRect();
          let ctx = canvasRef.current.getContext('2d');


          cameraZoom = Math.min(cameraZoom, MAX_ZOOM )
          cameraZoom = Math.max(cameraZoom, MIN_ZOOM )


          mouseLoc.scaleX = ((((rect.left - canvasDefault.width/2/cameraZoom ) )- cameraOffset.x/cameraZoom )) 
          mouseLoc.scaleY = ((((rect.left - canvasDefault.height/2/cameraZoom )) - cameraOffset.y/cameraZoom ))


          ctx.clearRect(0, 0, canvasDefault.width, canvasDefault.height);
          redrawaxis()
        }
  }


function redrawaxis() {
    // axis are drawn off screen will end if go far enough

    let ctx = canvasRef.current.getContext('2d');
    let hiddenCtx = canvasRefHidden.current.getContext('2d');

    let tckStep = 50
    let numOfSmallTcks = Math.floor(canvasDefault.width/tckStep)
    let tckStart = 0 

    ctx.clearRect(0, 0, canvasDefault.width, canvasDefault.height);
    

    console.log()
    //ctx.scale(-cameraZoom, -cameraZoom)


    let img = document.getElementById("hiddenCanvas")
    ctx.save()
    ctx.translate(mouseLoc.scaleX + cameraOffset.x*cameraZoom, mouseLoc.scaleY + cameraOffset.y*cameraZoom)
    ctx.drawImage(img, 0, 0);
    ctx.restore()



    // x axis

    ctx.beginPath();
    ctx.moveTo(0, (canvasDefault.height/2)+cameraOffset.y);
    
    ctx.lineTo(canvasDefault.width, (canvasDefault.height/2)+cameraOffset.y);
    ctx.stroke();

    // x ticks
    let intXTckOffset = Math.floor(cameraOffset.x/tckStep)
    for (let i = 0; i < numOfSmallTcks; i++){
   
      ctx.beginPath();
      ctx.moveTo(tckStart + cameraOffset.x - intXTckOffset*tckStep, (canvasDefault.height/2 + cameraOffset.y) + 4);
      ctx.lineTo(tckStart + cameraOffset.x - intXTckOffset*tckStep, (canvasDefault.height/2 + cameraOffset.y) - 4);
      ctx.stroke(); 

      // Text value at that point
      ctx.font = '9px Arial';
      ctx.textAlign = 'start';
      ctx.fillStyle = "black";
      
      let tickNum = (tckStart - intXTckOffset*tckStep)/cameraZoom - (canvasDefault.width/2)/cameraZoom

      ctx.fillText(Math.round(tickNum*100)/100, tckStart + cameraOffset.x - intXTckOffset*tckStep + 2.5, (canvasDefault.height/2 + cameraOffset.y) + 10);
      tckStart = tckStart + tckStep
    }
    
    // y axis
  
    ctx.beginPath();
    ctx.moveTo((canvasDefault.width/2)+cameraOffset.x, -101000+cameraOffset.y);
    ctx.lineTo((canvasDefault.width/2)+cameraOffset.x, canvasDefault.height*100000+cameraOffset.y);
    ctx.stroke();

    tckStart = 0

    // y ticks
    let intYTckOffset = Math.floor(cameraOffset.y/tckStep)
    for (let i = 0; i < numOfSmallTcks; i++){
   
      ctx.beginPath();
      ctx.moveTo((canvasDefault.width/2 + cameraOffset.x) + 4, tckStart + cameraOffset.y - intYTckOffset*tckStep);
      ctx.lineTo((canvasDefault.width/2 + cameraOffset.x) - 4, tckStart + cameraOffset.y - intYTckOffset*tckStep);
      ctx.stroke();

      // Text value at point
      ctx.font = '9px Arial';
      ctx.textAlign = 'start';
      ctx.fillStyle = "black";
      
      let tickNum = (tckStart - intYTckOffset*tckStep)/cameraZoom - (canvasDefault.height/2)/cameraZoom
      
      ctx.fillText(Math.round(tickNum*100)/100 ,(canvasDefault.width/2 + cameraOffset.x) + 10, tckStart + cameraOffset.y - intYTckOffset*tckStep + 2.5);

      tckStart = tckStart + tckStep
    }
    

}



useEffect(() => {
  redrawaxis()
});



  return (
    <>
    <button id='resetButton' onClick={clearArrayReset}>Reset</button>
    <canvas ref={canvasRefHidden} id='hiddenCanvas' height={canvasDefault.height} width={canvasDefault.width}/>
    <canvas ref={canvasRef} id='vectorCanvas' onMouseUp={onPointerUp} onMouseMove={onPointerMove} onMouseDown={onPointerDown} onWheel = {(e) => adjustZoom(e.deltaY*SCROLL_SENSITIVITY)} onClick={handleCanvasClick} height={canvasDefault.height} width={canvasDefault.width} />
    </>
  )
}
export default Display