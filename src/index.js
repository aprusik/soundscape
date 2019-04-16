import React from 'react'
import { render } from 'react-dom'
import TitleBar from 'frameless-titlebar'
import mp3 from './resources/mischief-maker-by-kevin-macleod.mp3'
import {MDCRipple} from '@material/ripple/index';

// Import some styles
import './styles/app.scss'

// Create main App component
class App extends React.Component {
  constructor(props){
    super(props)

    this.createVisualization = this.createVisualization.bind(this)
    this.playButton = this.playButton.bind(this)
  }

  componentDidMount(){
    this.createVisualization()
    this.playButton()
  }

  render() {
    return (
      <div>
        <TitleBar
          app="Electron"
          theme={{
            barTheme: 'dark',
            barBackgroundColor: '#1c313a'
          }}
        />
        {
          <div>
            <h1>Hello World!</h1>

            <p>
            We are using node {process.versions.node},<br />
            Chrome {process.versions.chrome},<br />
            and Electron {process.versions.electron}.<br />
            </p>

            <h1>WebAudio</h1>
            <audio
            // controls
              ref="audio"
              src={mp3}
            />

            {/* <canvas
              ref="analyzerCanvas"
              id="analyzer"
            /> */}

            <button 
              ref="button"
              className="foo-button mdc-button" 
              data-playing="false"
            >
            Play/Pause
            </button>
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

  playButton() {
    let audioCtx = new AudioContext();
    let audioElement = this.refs.audio;
    let track = audioCtx.createMediaElementSource(audioElement);

    track.connect(audioCtx.destination);

    // select our play button
    let playButton = this.refs.button;
    const ripple = new MDCRipple(playButton);

    playButton.addEventListener('click', function() {

      // check if context is in suspended state (autoplay policy)
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      // play or pause track depending on state
      if (this.dataset.playing === 'false') {
        audioElement.play();
        this.dataset.playing = 'true';
      } else if (this.dataset.playing === 'true') {
        audioElement.pause();
        this.dataset.playing = 'false';
      }

    }, false);
  }
}

// Render the application into the DOM, the div inside index.html
render(<App />, document.getElementById('root'))