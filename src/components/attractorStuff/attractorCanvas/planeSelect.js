import React, {useState} from 'react';
import Attractor from './attractor';

import './planeSelect.css';

function PlaneSelect() {
  let [colourVal, setColourVal] = useState('blue');

  let [plotPlane, setPlotPlane] = useState('xy');
  let [attractorType, setattractorType] = useState('Lorenz');

  return (
    <>
      <div id='colorSelect' >
          <label id="colorSelectLabel">Colour options:   </label>
          <select name="Colour Options" id="ColourSelector" value={colourVal} onChange={e=>setColourVal(e.target.value)}>
            <option value="red">Red</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
            <option value="Orange">Orange</option>
          </select>
      </div>
      <div id='planeSelect' >
          <label id="planeSelectLabel" >Plane options: </label>
          <select name="Plane Options" id="Planeelector" value={plotPlane} onChange={e=>setPlotPlane(e.target.value)}>
            <option value="xy">xy</option>
            <option value="zy">zy</option>
            <option value="zx">zx</option>
          </select>
      </div>
      <div id='attractorSelect' >
          <label id="attractorSelectLabel" >Attractor options: </label>
          <select name="attractor Options" id="Attractorelector" value={attractorType} onChange={e=>setattractorType(e.target.value)}>
            <option value="Lorenz">Lorenz</option>
            <option value="Sprout">Sprout</option>
            <option value="Four Wings">Four Wings</option>
          </select>
      </div>
      <Attractor colour={colourVal} plane={plotPlane} attractorp={attractorType}/>
    </>
  )
}

export default PlaneSelect