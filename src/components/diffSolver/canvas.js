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
        ctx.fillStyle = '#ff0db2';
        ctx.beginPath();
        ctx.arc(this.x - mouseLoc.scaleX, this.y - mouseLoc.scaleY , 1, 0, Math.PI * 2)
        ctx.fill();
    }
  }


  const mouseLoc = {
    x: undefined,
    y: undefined,
    scaleX: undefined,
    scaleY: undefined
  }

  const canvasDefault = {
    height: height,
    width: width/1.4
  }

  const canvasRef = useRef(null);


  const handleCanvasClick = (e) => {
    
    const rect = canvasRef.current.getBoundingClientRect();

    mouseLoc.x = e.clientX + rect.left - canvasDefault.width/2;
    mouseLoc.y = e.clientY - rect.top - canvasDefault.height/2;

    mouseLoc.scaleX = rect.left - canvasDefault.width/2;
    mouseLoc.scaleY = rect.left - canvasDefault.height/2;



    console.log(props.eqn1)
    console.log(props.eqn2)

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
    return 
  }
    
  
    return (
      <>
      <button id='resetButton' onClick={clearArrayReset}>Reset</button>
      <canvas ref={canvasRef} id='vectorCanvas' onMouseDown={FixHighlight} onClick={handleCanvasClick} height={canvasDefault.height} width={canvasDefault.width} />
      </>
    )
  }
export default Display