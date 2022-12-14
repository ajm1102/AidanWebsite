import './output.css'
import Display from './canvas'


import React, { useState } from 'react'


const EquationEnter = () => {
    let [eqn1, setEqn1] = useState('2*x - 0*y');
    let [eqn2, setEqn2] = useState('0*x-y');
    let [dt, setDt] = useState('0.01');


    return (      
    
    <>
        <div id='optionsV'>
            <p>
            <span class="input">
                <input type="text" id='dxdtinput' placeholder="Gradient border focus fun" onChange={e=>setEqn1(e.target.value)}/>
                <span></span>	
            </span>
            </p>
            <p>
            <span class="input2">
                <label></label>
                <input type="text" id='dydtinput' placeholder="Gradient border focus fun" onChange={e=>setEqn2(e.target.value)}/>
                <span></span>	
            </span>
            </p>
        </div> 
        <input id='dtInput' placeholder="0.01"  onChange={e=>setDt(e.target.value)}/>
        <Display eqn1={eqn1} eqn2={eqn2} dt={dt}/>
    </>
    );
}
 
export default EquationEnter;