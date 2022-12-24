import './output.css'
import Display from './canvas'
import { MathComponent } from "mathjax-react";



import React, { useState } from 'react'


const Display3D = () => {
    let [eqn1, setEqn1] = useState('10*(y-x)');
    let [eqn2, setEqn2] = useState('x*(28 - z) - y');
    let [eqn3, setEqn3] = useState('x*y-(8/3)*z');
    let [z, setz] = useState('1');
    let [dt, setDt] = useState('0.01');
    let [plotPlane, setPlotPlane] = useState('xy');
    let [plotPlanestr, setPlotPlanestr] = useState('z');

    return (      
    <>
    <div id='eqnInputForm'>
        <label><MathComponent tex={String.raw`\frac{dx}{dt}=`}/></label>
        <input value={eqn1} type="text" placeholder="y-0.5*x" onChange={e=>setEqn1(e.target.value)}/>

        <label><MathComponent tex={String.raw`\frac{dy}{dt}=`}/></label>
        <input value={eqn2} type="text" placeholder="Math.sin(x)" onChange={e=>setEqn2(e.target.value)}/>

        <label><MathComponent tex={String.raw`\frac{dz}{dt}=`}/></label>
        <input value={eqn3} type="text" placeholder="Math.sin(z)" onChange={e=>setEqn3(e.target.value)}/>

        <label><MathComponent tex={String.raw`${plotPlanestr} = `}/></label>
        <input value={z} type="text" placeholder="1" onChange={e=>setz(e.target.value)}/>

        <label><MathComponent tex={String.raw`dt=`}/></label>
        <input value={dt} placeholder="0.01"  onChange={e=>setDt(e.target.value)}/>

        <label><MathComponent tex={String.raw`Plane=`}/></label>
        <select name="Plane Options" id="planeSelector" onChange={e=>{setPlotPlane(e.target.value); 
            if (e.target.value == 'xy'){
                setPlotPlanestr('z')
            } else if (e.target.value == 'zy') {
                setPlotPlanestr('x')
            } else {
                setPlotPlanestr('y')
            }}}>
            <option value="xy">xy</option>
            <option value="zy">zy</option>
            <option value="zx">zx</option>
        </select>
    </div>
    <Display eqn1={eqn1} eqn2={eqn2} eqn3={eqn3} z={z} dt={dt} plane={plotPlane}/>
    </>
    );
}
 
export default Display3D;