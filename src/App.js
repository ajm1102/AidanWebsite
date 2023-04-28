
import React, { useEffect, useState } from 'react'
import {HashRouter , Routes, Route } from "react-router-dom";
import HomeCanvas from './components/home/homeCanvas/homeCanvas';
import HomeList from './components/home/homeList/homeList';
import Back from './components/global/back';
import PlotlyPlot from './components/plotly/plotlyPlots/plotlyPlot';
import PlaneSelect from './components/attractorStuff/attractorCanvas/planeSelect';
import TableCanvas from './components/table/table'
import Display2D from'./components/2dFlows/canvasSubmit'
import Display3D from'./components/3dFlows/canvasSubmit'



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
    <>
      <script type="text/javascript" id="MathJax-script" async
          src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
      </script>
      <HashRouter basename={process.env.PUBLIC_URL}>
          <Routes>
            <Route exact path="/" element={[<HomeCanvas/>, <HomeList/>]}></Route>
            <Route exact path="/plot" element={[<HomeCanvas/>, <PlotlyPlot/>, <Back/>]}></Route>
            <Route exact path="/LorenzAttractor" element={[<PlaneSelect/>, <Back/>]}></Route>
            <Route exact path="/2dflows" element={[<Display2D/>, <Back/>]}></Route>
            <Route exact path="/3dflows" element={[<Display3D/>, <Back/>]}></Route>
            <Route exact path="/table" element={[<HomeCanvas/>, <Back/>, <TableCanvas/>]}></Route>
          </Routes>
      </HashRouter>
    </>
  )
}

export default App