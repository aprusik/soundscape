import React from 'react'
import { render } from 'react-dom'
import TitleBar from 'frameless-titlebar'
import {PlayButton} from './components/play-button'
import WebFont from 'webfontloader'

// Import some styles
import './styles/app.scss'

WebFont.load({
  google: {
    families: ['Material Icons']
  }
})

function Element(props) {
  return <div><h1>Hello, {props.name}!</h1></div>
}

// Create main App component
class App extends React.Component {
  constructor(props){
    super(props)

    this.createVisualization = this.createVisualization.bind(this)
  }

  componentDidMount(){
    this.createVisualization()
  }

  render() {
    return (
      <div>
        <TitleBar
          app="Electron"
          theme={{
            barTheme: 'dark',
            barBackgroundColor: '#1b3039'
          }}
        />
        {
          <div>
            {/* <h1>Hello World!</h1>

            <p>
            We are using node {process.versions.node},<br />
            Chrome {process.versions.chrome},<br />
            and Electron {process.versions.electron}.<br />
            </p>

            <h1>WebAudio</h1>

            {/* <canvas
              ref="analyzerCanvas"
              id="analyzer"
            /> */}

            {/* <Element name="Austin"/> */}
            <PlayButton
              name="An Oath, Until The End"
              fname="Austin Wintory - The Banner Saga 2 - 01 An Oath, Until The End.mp3"
            />
            <PlayButton 
              name="Mischeif Maker"
              fname="mischief-maker-by-kevin-macleod.mp3"
            />

          </div>
        }
      </div>
    )
  }

  createVisualization() {
    // let context = new AudioContext();
    // let analyser = context.createAnalyser();
    // let canvas = this.refs.analyzerCanvas;
    // let ctx = canvas.getContext('2d');
    // let audio = this.refs.audio;
    // audio.crossOrigin = "anonymous";
    // let audioSrc = context.createMediaElementSource(audio);
    // audioSrc.connect(analyser);
    // audioSrc.connect(context.destination);
    // analyser.connect(context.destination);

    // function renderFrame(){
    //     let freqData = new Uint8Array(analyser.frequencyBinCount)
    //     requestAnimationFrame(renderFrame)
    //     analyser.getByteFrequencyData(freqData)
    //     ctx.clearRect(0, 0, canvas.width, canvas.height)
    //     // console.log(freqData)
    //     ctx.fillStyle = '#9933ff';
    //     let bars = 100;
    //     for (var i = 0; i < bars; i++) {
    //         let bar_x = i * 3;
    //         let bar_width = 2;
    //         let bar_height = -(freqData[i] / 2);
    //         ctx.fillRect(bar_x, canvas.height, bar_width, bar_height)
    //     }
    // };
    // renderFrame()
  }
}

// Render the application into the DOM, the div inside index.html
render(<App />, document.getElementById('root'))