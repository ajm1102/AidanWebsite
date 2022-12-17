import './canvas.css'
import FixHighlight  from './functions'
import React, { useRef, useEffect } from 'react'
import { euler } from './euler'
import { useWindowDimensions } from './resize'

const Display = props => {
  const { height, width } = useWindowDimensions();
  let particlesArray = []

  class Particle {
    constructor(mouseLoc){
      this.x = mouseLoc.x
      this.y = mouseLoc.y

    }
    update(context){  
      let cords = euler(this.x, this.y, props) 
      this.x = cords[0]
      this.y = cords[1]

    }
  
    draw(ctx){
        if (isDraggingMove != true ) {
        ctx.fillStyle = '#ff0db2';
        ctx.beginPath();
        ctx.arc((this.x - mouseLoc.scaleX)*cameraZoom, (this.y - mouseLoc.scaleY)*cameraZoom , 1, 0, Math.PI * 2)
        ctx.fill();
        }
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
    width: width/1.4,
    zoomScale: undefined
  }

  const canvasRef = useRef(null);

  let cameraOffset = { x: 0, y: 0}
  
  let cameraZoom = 1

  let MAX_ZOOM = 100000
  let MIN_ZOOM = 0.1
  let SCROLL_SENSITIVITY = 0.0005
  let isDragging = false
  let isDraggingMove = false

  let dragStart = { x: 0, y: 0 }


  const handleCanvasClick = (e) => {
    
    const rect = canvasRef.current.getBoundingClientRect();



    mouseLoc.scaleX = ((((rect.left - canvasDefault.width/2/cameraZoom ) )- cameraOffset.x )) //+ mouseLoc.zoomoffX
    mouseLoc.scaleY = ((((rect.left - canvasDefault.height/2/cameraZoom )) - cameraOffset.y ))// + mouseLoc.zoomoffY

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
    axis()
    return 
  }


  // Gets the relevant location from a mouse or single touch event
  function getEventLocation(e)
  {
      if (e.touches && e.touches.length === 1)
      {
          return { x:e.touches[0].clientX, y: e.touches[0].clientY }
      }
      else if (e.clientX && e.clientY)
      {
          return { x: e.clientX, y: e.clientY }        
      }
  }
  
  
  function onPointerDown(e)
  {
      isDragging = true
      dragStart.x = getEventLocation(e).x/cameraZoom - cameraOffset.x
      dragStart.y = getEventLocation(e).y/cameraZoom - cameraOffset.y
  }
  
  function onPointerUp(e)
  {
      isDragging = false
      lastZoom = cameraZoom
      isDraggingMove = false
  }
  
  function onPointerMove(e)
  {
      if (isDragging)
      {
          isDraggingMove = true
          let ctx = canvasRef.current.getContext('2d');
          ctx.clearRect(0, 0, canvasDefault.width, canvasDefault.height);

          cameraOffset.x = getEventLocation(e).x/cameraZoom - dragStart.x
          cameraOffset.y = getEventLocation(e).y/cameraZoom - dragStart.y


          redrawaxis()

      }
      


  }
  
  let lastZoom = cameraZoom
  
  function adjustZoom(zoomAmount, zoomFactor)
  {
      if (!isDragging)
      {
          if (zoomAmount)
          {
              cameraZoom += zoomAmount
          }
          else if (zoomFactor)
          {
              cameraZoom = zoomFactor*lastZoom
          }
          console.log(cameraZoom)
          cameraZoom = Math.min(cameraZoom, MAX_ZOOM )
          cameraZoom = Math.max( cameraZoom, MIN_ZOOM )
          let ctx = canvasRef.current.getContext('2d');
          ctx.clearRect(0, 0, canvasDefault.width, canvasDefault.height);
          redrawaxis()
        }
  }
  
  
function redrawaxis() {
    let ctx = canvasRef.current.getContext('2d');
    // x axis
    ctx.clearRect(0, 0, canvasDefault.width, canvasDefault.height);
    ctx.beginPath();
    ctx.moveTo(0+cameraOffset.x, (canvasDefault.height/2)+cameraOffset.y);
    ctx.lineTo(canvasDefault.width+cameraOffset.x, (canvasDefault.height/2)+cameraOffset.y);
    ctx.stroke();



  // y axis
  
    ctx.beginPath();
    ctx.moveTo((canvasDefault.width/2)+cameraOffset.x, -101000+cameraOffset.y);

    ctx.lineTo((canvasDefault.width/2)+cameraOffset.x, canvasDefault.height*100000+cameraOffset.y);
    ctx.stroke();


}



function axis() {
  const ctx = canvasRef.current.getContext('2d');
  ctx.clearRect(0, 0, canvasDefault.width, canvasDefault.height);

  // x axis

  ctx.beginPath();
  ctx.moveTo(0, canvasDefault.height/2);
  ctx.lineTo(canvasDefault.width, canvasDefault.height/2);
  ctx.stroke();

  // y axis

  ctx.beginPath();
  ctx.moveTo((canvasDefault.width/2)+cameraOffset.x, 0+cameraOffset.y);

  ctx.lineTo((canvasDefault.width/2)+cameraOffset.x, canvasDefault.height+cameraOffset.y);
  ctx.stroke();


}


useEffect(() => {
  redrawaxis()
});



  return (
    <>
    <button id='resetButton' onClick={clearArrayReset}>Reset</button>
    <canvas ref={canvasRef} id='vectorCanvas' onMouseUp={onPointerUp} onMouseMove={onPointerMove} onMouseDown={onPointerDown} onWheel = {(e) => adjustZoom(e.deltaY*SCROLL_SENSITIVITY)} onClick={handleCanvasClick} height={canvasDefault.height} width={canvasDefault.width} />
    </>
  )
}
export default Display