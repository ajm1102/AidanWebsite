import React, { useRef, useEffect, useState} from 'react'
import './tableCanvas.css'
import './checkbox.css'
import ExampleShowcase from './tableExample.js'


let colorMap = {0: '#213522'}

function sections(height, width, value) {
    this.height = height;
    this.width = width;
    this.value = value;
  }
let grid = null;
let stepGlo = 0;    
let canvasWidthGlo = null


const TableCanvas = props => {

    const canvasRef = useRef(null)


    const generateTable = (event) => {
        event.preventDefault()        
        const form = event.target;
        const columns = parseInt(form.querySelector("input").value);
        stepGlo = columns;

        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        canvasWidthGlo = ctx.canvas.width
        ctx.fillStyle = '#213522'
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        
        const steps  = ctx.canvas.width/columns;
        let count = 0;
        for (let i = 0; i < columns; i++) {
            ctx.beginPath();
            ctx.moveTo(count, 0);
            ctx.lineTo(count, ctx.canvas.height);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(0, count);
            ctx.lineTo(500, count);
            ctx.stroke();

            count = count + steps;
        }

        grid = Array.from(Array(columns), () => new Array(columns));
        
        let height = 0;
        let width = 0;

        for(var i = 0; i < grid.length; i++) {
            for(var j = 0; j < grid[i].length; j++) {
                grid[j][i]  = new sections(width.toFixed(5), height.toFixed(5), 0)
                width = width + steps
            }
            width = 0;
            height = height + steps
        }
    }

    const canvasClick = (e) => {
        e.preventDefault()

        const rect = canvasRef.current.getBoundingClientRect(); // remove slowing down reg
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        const step  = canvasWidthGlo/stepGlo;

        const x = ((e.clientX - rect.left) / (rect.right - rect.left) * canvas.width).toFixed(5) 
        const y = ((e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height).toFixed(5)

        const cornerX = (x - (x % step)).toFixed(5)
        const cornerY = (y - (y % step)).toFixed(5)

        let result = grid.flat().find(item => item.width === cornerX && item.height === cornerY);
     
        console.log(result.value)
        if (decreaseBool === false){
        result.value = result.value + 1
        } else { result.value = result.value - 1}

        if (colorMap[result.value] === undefined) {
            colorMap[result.value] = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')
        }
        ctx.fillStyle = colorMap[result.value]
        ctx.fillRect(cornerX, cornerY, step, step)

        console.log(colorMap)
    }

    const convertNumpyArray = (e) => {
        let vals = grid.flat().map(a => a.value);
        let text = vals.toString()
        let copy = `img = np.array([${text}]).reshape(${stepGlo}, ${stepGlo})`

        setNumpyText(copy)
    }
    let [numpyTextt, setNumpyText] = useState('');
    let [decreaseBool, setdecreaseBool] = useState(false);


    return  <>  
            <div class='overallContainer'>
                <div class='overallContainerItem'>
                    <div class='canvasContainer'>
                        <div class='canvasContainerItem' id='canvasContainerItem1'>
                            <form onSubmit={(evt) => generateTable(evt)} >
                            <label>
                                Name:
                                <input type="text" name="name" />
                            </label>
                            <input id='rows' type="submit" value="Submit"/>
                            </form>
                        </div>
                        <div class='canvasContainerItem' id='canvasContainerItem2'>
                            <button id='convertNum' onClick={convertNumpyArray}>Copy</button>
                        </div>
                        <div class='canvasContainerItem' id='canvasContainerItem3'>
                            <canvas id='tableCanvas' onClick={canvasClick} ref={canvasRef} width={'500px'} height={'500px'} {...props} />
                        </div>
                        <div class='canvasContainerItem' id='canvasContainerItem4'>
                            <label class="container">Decrease
                                <input type="checkbox" onChange={() => decreaseBool === false ? setdecreaseBool(true): decreaseBool === true ? setdecreaseBool(false) : false}></input>
                                <span class="checkmark"></span>
                            </label>
                        </div>
                    </div>
                </div>
                <div class='overallContainerItem'>
                    <ExampleShowcase numpyTexttt={numpyTextt}/>
                </div>
            </div>
            </>
  }

export default TableCanvas
