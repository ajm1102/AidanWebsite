import example1 from './examples/example1.png'
import './tableExample.css'

function ExampleShowcase(props) {
    return (   
    <>     
    <div class='exampleUseContainer'>         
        <div class='exampleUseContainerItem'>
            <h2>Matplotlib Visualisation</h2>
            <p id='numpyText'>{props.numpyTexttt}</p>
        </div>
        <div class='exampleUseContainerItem'>
            <img id='tablenumpyImg' src={example1}/> 
        </div>
    </div>
    </>
);
}

export default ExampleShowcase;