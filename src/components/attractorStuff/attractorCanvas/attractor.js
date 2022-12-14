import React, { useRef, useEffect, useCallback } from 'react'
import { fourWings, Lorenz, Sprout } from './attractorCal/equations';
import './attractor.css'

class Particle {
  constructor(mouse, props){

      if (props.attractorp === 'Lorenz'){
        let getScale = Lorenz(0,0,0);
        this.scaleProps = getScale[3];
      } else if (props.attractorp === 'Sprout'){
        let getScale = Sprout(0,0,0);
        this.scaleProps = getScale[3];
      } else if (props.attractorp === 'Four Wings'){
        let getScale = fourWings(0,0,0);
        this.scaleProps = getScale[3];
      }

      if (props.plane === 'zy'){
        this.z = (mouse.x-this.scaleProps.locX)/(this.scaleProps.scale);
        this.y = (mouse.y-this.scaleProps.locY)/(this.scaleProps.scale);
        this.x = 1;
        this.size = this.scaleProps.globalSize;
        this.colour = props.colour;
        this.Attractor = props.attractorp;
        this.plane = 'zy';
      } else if (props.plane === 'xy') {
        this.x = (mouse.x-this.scaleProps.locX)/(this.scaleProps.scale);
        this.y = (mouse.y-this.scaleProps.locY)/(this.scaleProps.scale);
        this.z = 1;
        this.size = this.scaleProps.globalSize;
        this.colour = props.colour;
        this.Attractor = props.attractorp;
        this.plane = 'xy';
      } else if (props.plane === 'zx') {
        this.x = (mouse.x-this.scaleProps.locX+400)/(this.scaleProps.scale);
        this.z = (mouse.y-this.scaleProps.locY+400)/(this.scaleProps.scale);
        this.y = 1;
        this.size = this.scaleProps.globalSize;
        this.colour = props.colour;
        this.Attractor = props.attractorp;
        this.plane = 'zx';
      }
  }

  update(context){
    let cords = undefined;

    let x = this.x;
    let y = this.y;
    let z = this.z;

    if (this.Attractor === 'Lorenz') {
      cords = Lorenz(x, y, z);
    } else if (this.Attractor === 'Sprout') {
      cords = Sprout(x, y, z);
    } else if (this.Attractor === 'Four Wings') {
      cords = fourWings(x, y, z);
    }
    

    this.x = cords[0];
    this.y = cords[1];
    this.z = cords[2];
    console.log(this.scaleProps);

  }

  draw(ctx, props){
      let scaled_x = undefined;
      let scaled_y = undefined;
      if (this.plane === 'zy') {
        scaled_x = (this.z*this.scaleProps.scale) + this.scaleProps.locX
        scaled_y = (this.y*this.scaleProps.scale) + this.scaleProps.locY
      } else if (this.plane === 'xy') {
        scaled_x = (this.x*this.scaleProps.scale) + this.scaleProps.locX
        scaled_y = (this.y*this.scaleProps.scale) + this.scaleProps.locY
      } else if (this.plane === 'zx') {
        scaled_x = (this.x*this.scaleProps.scale) + this.scaleProps.locX-400
        scaled_y = (this.z*this.scaleProps.scale) + this.scaleProps.locY-400
      }


      ctx.fillStyle = this.colour;
      ctx.beginPath();
      ctx.arc(scaled_x, scaled_y, this.size, 0, Math.PI * 2)
      ctx.fill();
  }
}

const particlesArray = [];

const canvasSize = {
    height: window.innerHeight,
    width: window.innerWidth ,
}

const mouse = {
    x: undefined,
    y: undefined,
}

const Attractor = props => {

  const canvasRef = useRef(null);

  function handleParticles(context){
    for (let i = 0; i < particlesArray.length; i++){
        particlesArray[i].update(context);
        particlesArray[i].draw(context, props);
        console.log(particlesArray[0].x)
    }
  }
  
  const handleCanvasClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();

    mouse.x = e.clientX + rect.left;
    mouse.y = e.clientY - rect.top;

    particlesArray.push(new Particle(mouse, props))
  }

  useEffect(() => {
    //const rect = canvasRef.current.getBoundingClientRect();
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

  function fixHighlight(e){
    e.preventDefault();
    return false
  }

  function clearArrayReset(e){
    particlesArray.length = 0;
    const context = canvasRef.current.getContext('2d');
    context.clearRect(0, 0, canvasSize.width, canvasSize.height)
    return 
  }
  
  return (
    <>
      <button id='resetButton' onClick={clearArrayReset}>Reset</button>
      <canvas ref={canvasRef} id="attractorCanvas" onMouseDown={fixHighlight} onClick={handleCanvasClick} height={canvasSize.height-1} width={canvasSize.width} {...props}/>
    </>
  )
}

export default Attractor