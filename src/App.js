
import React, { useEffect, useState } from 'react'
import {BrowserRouter, Routes, Route } from "react-router-dom";
import HomeCanvas from './components/home/homeCanvas/homeCanvas';
import HomeList from './components/home/homeList/homeList';
import Back from './components/global/back';
import PlotlyPlot from './components/plotly/plotlyPlots/plotlyPlot';
import PlaneSelect from './components/attractorStuff/attractorCanvas/planeSelect';
import TableCanvas from './components/table/table'
import Display from'./components/diffSolver/canvasSubmit'

import './styles/index.css';


function App() {

  const [data, setData] = useState([{}])

  // useEffect( () => {
  //   fetch("/members").then(
  //     res => res.json()
  //   ).then(
  //     data => {
  //       setData(data)
  //       console.log(data)
  //     }
  //   )
  // }, [])

    
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={[<HomeCanvas/>, <HomeList/>]}></Route>
          <Route exact path="/plot" element={[<HomeCanvas/>, <PlotlyPlot/>, <Back/>]}></Route>
          <Route exact path="/LorenzAttractor" element={[<PlaneSelect/>, <Back/>]}></Route>
          <Route exact path="/VectorFields" element={[<Display/>, <Back/>]}></Route>
          <Route exact path="/table" element={[<HomeCanvas/>, <Back/>, <TableCanvas/>]}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App