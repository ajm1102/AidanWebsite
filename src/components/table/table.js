import { type } from '@testing-library/user-event/dist/type';
import React, { useRef, useEffect } from 'react'
import './tableCanvas.css'


let sectionsArray = [];

const TableCanvas = props => {

    class sections {
        constructor(width, height){
            this.width = width;
            this.height = height;
        }
    }


    const canvasRef = useRef(null)

    let xd = 0;
    let grid = null;

    const generateTable = (event) => {
        sectionsArray = [];
        const form = event.target;
        const columns = parseInt(form.querySelector("input").value);
        xd = columns;
        event.preventDefault()
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
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

            sectionsArray.push(new sections(count))
            count = count + steps;
        }

        grid = Array.from(Array(columns), () => new Array(columns));
        
        let height = 0;
        let width = 0;

        for(var i = 0; i < grid.length; i++) {
            for(var j = 0; j < grid[i].length; j++) {
                grid[i][j]  = new sections(width, height)
                width = width + steps
            }
            width = 0;
            height = height + steps
        }
        console.log(grid)
    }

    const canvasClick = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        const steps  = ctx.canvas.width/xd;

        const arrayLength = sectionsArray.length;

        const widths = [];
        const heights = [];

        const x = (e.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
        const y = (e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
     
        for (var i = 0; i < arrayLength; i++) {
            widths.push(sectionsArray[i].width)
            heights.push(sectionsArray[i].height)
        }


        const closestX = widths.reduce((a, b) => {
           
            return Math.abs(b - x) < Math.abs(a - x) && b < x ? b : a;
        });

        const closestY = widths.reduce((a, b) => {
            return Math.abs(b - y) < Math.abs(a - y) &&  b < y ? b : a;
        });
        console.log(closestX)
        ctx.fillStyle = '#000000'
        ctx.fillRect(closestX, closestY, steps, steps)
    }
    
    return  <>
                <form onSubmit={(evt) => generateTable(evt)} >
                    <label>
                        Name:
                        <input type="text" name="name" />
                    </label>
                    <input id='rows' type="submit" value="Submit"/>
                </form>
                <canvas id='tableCanvas' onClick={canvasClick} ref={canvasRef} width={'500px'} height={'500px'} {...props} />
            </>
  }

export default TableCanvas
