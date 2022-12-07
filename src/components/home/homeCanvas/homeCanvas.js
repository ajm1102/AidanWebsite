import React, { useRef, useEffect, useCallback } from 'react'
import './homeCanvas.css';


const particlesArray = [];

const canvasSize = {
    height: window.innerHeight,
    width: window.innerWidth ,
}

const mouse = {
    x: undefined,
    y: undefined,
}
class Particle {
  constructor(mouse){
      this.x = mouse.x;
      this.y = mouse.y;
      this.size = 10
      this.speedX = Math.random() * 3 - 1.5
      this.speedY = Math.random() * 3 - 1.5
  }
  update(context){
      this.x += this.speedX
      this.y += this.speedY
      if (this.x > context.canvas.width) {
          this.x = context.canvas.width
          this.speedX = this.speedX * -1
      }
      if (this.x < 0) {
          this.x = 0
          this.speedX = this.speedX * -1
      }
      if (this.y > context.canvas.height) {
          this.y = context.canvas.height
          this.speedY = this.speedY * -1
      }
      if (this.y < 0) {
          this.y = 0
          this.speedY = this.speedY * -1
      }
  }
  draw(ctx){
      ctx.fillStyle = 'grey';
      ctx.beginPath();
      ctx.arc(this.x, this.y, 5, 0, Math.PI * 2)
      ctx.fill();
  }
}
  
const HomeCanvas = props => {

  const canvasRef = useRef(null);

  useEffect(() => {
    function handleResize() {
      const context = canvasRef.current.getContext('2d');
      if (window.innerWidth/4 > 512){
      context.canvas.width  = 512;
      context.canvas.height = window.innerHeight;
      } else {
        context.canvas.width  = window.innerWidth/4;
        context.canvas.height = window.innerHeight;
      }
      handleParticles(context);
      console.log("dsf")
    }

    window.addEventListener('resize', handleResize)
  })

  function handleParticles(context){
    for (let i = 0; i < particlesArray.length; i++){
        particlesArray[i].update(context);
        particlesArray[i].draw(context);
    }
  }
  
  const handleCanvasClick = (e) => {
    console.log(window.innerHeight)
    const rect = canvasRef.current.getBoundingClientRect();
    const context = canvasRef.current.getContext('2d');

    mouse.x = e.clientX + rect.left;
    mouse.y = e.clientY - rect.top;

    particlesArray.push(new Particle(mouse))
  }

  useEffect(() => {
    const rect = canvasRef.current.getBoundingClientRect();
    const context = canvasRef.current.getContext('2d');
    let animationFrameId
    const render = () => {
        context.clearRect(0, 0, 2000, 2000)
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


  
  return <canvas ref={canvasRef} id="homecanvas" onMouseDown={fixHighlight} onClick={handleCanvasClick} height={canvasSize.height-1} width={canvasSize.width/4} {...props}/>
}

export default HomeCanvas