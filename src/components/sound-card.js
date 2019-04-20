import React from 'react'
import {Fab} from '@rmwc/fab'
import {Slider} from '@rmwc/slider'
import {Card, CardMedia, CardMediaContent} from '@rmwc/card'
import {Typography} from '@rmwc/typography'

var sound = require.context('./../resources', true);

export class SoundCard extends React.Component {
  constructor(props) {
    super(props)
    this.playButton = this.playButton.bind(this)
    this.state = {
      mp3: sound(`./${this.props.fname}`),
      duration: 0,
      currentTime: 0,
      paused: true,
      isMoving: false,
    }
  }

  componentDidMount(){
    this.playButton()
    let audio = this.refs.audio;
    this.timerID = setInterval(
        () => {
          // console.log(this.state.pos)
          this.state.isMoving ?
            this.setState({
              duration: audio.duration,
              paused: audio.paused
            })
          :
            this.setState({
              currentTime: audio.currentTime,
              duration: audio.duration,
              paused: audio.paused
            })
        },
      100
    );
  }

  render() {
    return (
      <div style={{padding: '1rem 1rem 0 1rem'}}>
        <Card
          outline='true'
          style={{ width: '20rem' }}
        >

          <CardMedia
            style={{
              width: '20rem',
              height: '6rem',
              background: '#9a0007'
            }}
          >
            <CardMediaContent>
              <Fab
                raised='true'
                icon={this.state.paused ? "play_arrow" : "pause"}
                ref="button"
                theme={['secondaryBg', 'onSecondary']}
                data-playing="false"
                style={{
                  margin: '-1.5rem 8rem',
                  bottom: '0',
                  left: '0',
                  right: '0',
                  position: 'absolute'
                }}
              />
            </CardMediaContent>
          </CardMedia>

          
          <audio
            // controls
            ref="audio"
            src={this.state.mp3}
            type="audio/mpeg"
          />

          <div style={{
            padding: '0 1rem 1rem 1rem',
            marginTop: '0.5rem'
          }}>
            <Typography use="headline6" tag="h2" style={{textAlign: 'center'}}>
              {this.props.name}
            </Typography>
            {/* <Typography use="headline6" tag="h2">
              {this.state.currentTime}
            </Typography>
            <Typography use="headline6" tag="h2">
              {this.state.duration}
            </Typography> */}

            <Typography
              use="subtitle2"
              tag="h3"
              theme="textSecondaryOnBackground"
              style={{
                marginTop: '-1rem',
                textAlign: 'center',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {this.props.fname}
            </Typography>
            
            <Slider
              continuous='true'
              value={this.state.currentTime}
              min={0}
              max={this.state.duration}
              onChange={() => this.setState({ isMoving: false }) }
              onInput={evt => {
                this.refs.audio.currentTime = evt.detail.value
                if (!this.state.isMoving) { this.setState({ isMoving: true }) }
                this.setState({currentTime: evt.detail.value})
              }}
              style={{marginTop: '-1.5rem', marginBottom: '-1rem'}}
            />
          </div>     
        </Card>
      </div>
    );
  }

  playButton() {
    let audioCtx = new AudioContext();
    let audioElement = this.refs.audio;
    let track = audioCtx.createMediaElementSource(audioElement);

    track.connect(audioCtx.destination);

    // select our play button
    let playButton = this.refs.button;

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