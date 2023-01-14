import { type } from '@testing-library/user-event/dist/type';
import React, { useRef, useEffect } from 'react'
import './tableCanvas.css'

let colorMap = {}

function sections(height, width, value) {
    this.height = height;
    this.width = width;
    this.value = value;
  }

const TableCanvas = props => {

    const canvasRef = useRef(null)

    let stepGlo = 0;
    let grid = null;
    let canvasWidthGlo = null

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

    const canvasClick = (event) => {
        event.preventDefault()

        const rect = canvasRef.current.getBoundingClientRect(); // remove slowing down reg
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        const step  = canvasWidthGlo/stepGlo;

        const x = ((event.clientX - rect.left) / (rect.right - rect.left) * canvas.width).toFixed(5) 
        const y = ((event.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height).toFixed(5)

        const cornerX = (x - (x % step)).toFixed(5)
        const cornerY = (y - (y % step)).toFixed(5)

        
        let result = grid.flat().find(item => item.width === cornerX && item.height === cornerY);
        console.log(grid)
        if (colorMap[result.value] === undefined) {
            colorMap[result.value] = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')
        }
        ctx.fillStyle = colorMap[result.value]
        ctx.fillRect(cornerX, cornerY, step, step)

        result.value = result.value + 1
    }

    const convertNumpyArray = (e) => {
        const vals = grid.flat().map(a => a.value);
        const text = vals.toString()
        const copy = `img = np.array([${text}]).reshape(${stepGlo}, ${stepGlo})`
        console.log(copy)
        navigator.clipboard.writeText(copy)
        
    }

    return  <>
                <form onSubmit={(evt) => generateTable(evt)} >
                    <label>
                        Name:
                        <input type="text" name="name" />
                    </label>
                    <input id='rows' type="submit" value="Submit"/>
                </form>
                <button id='convertNum' onClick={convertNumpyArray}>Copy</button>
                <canvas id='tableCanvas' onClick={canvasClick} ref={canvasRef} width={'500px'} height={'500px'} {...props} />
                <h4 id='numpyText'>asdsd</h4>
            </>
  }

export default TableCanvas
