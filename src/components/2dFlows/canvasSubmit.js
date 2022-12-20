import './output.css'
import Display from './canvas'
import { MathComponent } from "mathjax-react";



import React, { useState } from 'react'


const EquationEnter = () => {
    let [eqn1, setEqn1] = useState('y-0.5*x');
    let [eqn2, setEqn2] = useState('Math.sin(x)');
    let [dt, setDt] = useState('0.01');

               // <label><MathComponent tex={String.raw`\int_0^1 x^2\ dx`}/></label>

    return (      
    
    <>
    
    <div id='eqnInputForm'>
        <label><MathComponent tex={String.raw`\frac{dx}{dt}=`}/></label>
        <input type="text" placeholder="y-0.5*x" onChange={e=>setEqn1(e.target.value)}/>

        <label><MathComponent tex={String.raw`\frac{dy}{dt}=`}/></label>
        <input type="text" placeholder="Math.sin(x)" onChange={e=>setEqn2(e.target.value)}/>

        <label><MathComponent tex={String.raw`dt=`}/></label>
        <input placeholder="0.01"  onChange={e=>setDt(e.target.value)}/>
    </div>
    <Display eqn1={eqn1} eqn2={eqn2} dt={dt}/>
    </>
    );
}
 
export default EquationEnter;