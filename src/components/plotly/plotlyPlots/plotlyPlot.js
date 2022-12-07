import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

const PlotlyPlot = () => {
    const [plot, setPlot] = useState(0);
    
    useEffect(() => {
      fetch('/plot').then(res => res.json()).then(data => {setPlot(data);});}, []);
      // console.log(plot)
    
    return (
      <div id='plot'>
        <Plot data={plot.data} layout={plot.layout} />
      </div>
    );
};

export default PlotlyPlot;