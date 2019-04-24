import React from 'react'
import {Fab} from '@rmwc/fab'
import {Slider} from '@rmwc/slider'
import {Card, CardMedia, CardMediaContent} from '@rmwc/card'
import { Typography } from '@rmwc/typography'
import { Select } from '@rmwc/select'
import {Button} from '@rmwc/button'
import { TextField } from '@rmwc/textfield'
import { Dialog, DialogTitle, DialogActions, DialogContent, DialogButton } from '@rmwc/dialog'
import { Ripple } from '@rmwc/ripple'
import { CircularProgress } from '@rmwc/circular-progress'

var sound = require.context('./../resources', true);

export class SoundCard extends React.Component {
  constructor(props) {
    super(props)
    this.checkLoop = this.checkLoop.bind(this);
    this.playButton = this.playButton.bind(this);
    this.createVisualization = this.createVisualization.bind(this);
    this.state = {
      mp3: sound(`./${this.props.fname}`),
      duration: 0,
      currentTime: 0,
      paused: true,
      isMoving: false,
      loopDialogOpen: false,
      isLooping: false,
      upper: 0,
      lower: 0,
      loopTime: 0,
      loopCount: 0,
      editName: false,
      name: this.props.name,
      delay: 0,
      ctx: new AudioContext()
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    let audioCtx = this.state.ctx;
    let audio = this.refs.audio;
    let track = audioCtx.createMediaElementSource(audio);

    this.createVisualization(audioCtx, track)
    this.timerID = setInterval(
      () => {
        this.checkLoop(audioCtx);
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

  checkLoop(ctx) {
    const max = Number(this.state.upper);
    const min = Number(this.state.lower);

  this.setState({ isLooping: max >= min && max > 0})

    if (this.state.isLooping) {
      if (this.state.loopTime <= ctx.currentTime && this.state.paused) {
        if (this.state.loopCount == 0) {
          const delay = Math.random() * (max - min) + min;
          this.setState({
            loopTime: ctx.currentTime + delay,
            loopCount: 1,
            delay: delay
          });
          console.log(delay);

        } else {
          this.refs.audio.play();
          this.setState({ loopCount: 0 });
        }
      }
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div>
        <Card
          outline='true'
          style={{ width: '100%', maxWidth: '20rem' }}
        >
          <CardMedia
            style={{
              height: '6rem',
              background: '#9a0007'
            }}
          >
            <CardMediaContent>
              <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                <canvas ref="analyzerCanvas" width="500" height="150"/>
              </div>

              <Fab
                icon={this.state.paused ? "play_arrow" : "pause"}
                ref="button"
                onClick={this.playButton}
                theme={['secondaryBg', 'onSecondary']}
                data-playing="false"
                style={{
                  margin: '-28px auto',
                  bottom: '0',
                  left: '0',
                  right: '0',
                  position: 'absolute',
                }}
              />

              <Dialog
                open={this.state.loopDialogOpen}
                onClose={evt => {
                  // console.log(evt.detail.action);
                  if (evt.detail.action == "cancel") {
                    this.setState({upper: 0, lower: 0})
                  }
                  this.setState({ loopDialogOpen: false });
                }}
              >
                <DialogTitle>Set Loop Interval:</DialogTitle>
                <DialogContent>
                  <Typography>
                    Loop Every
                    <TextField min="0" step="any" type="number" ref="lowerLoop"
                      name="lower"
                      value={this.state.lower}
                      onChange={this.handleInputChange}
                      style={{ width: '80px', margin: "5px" }}
                    />
                    to
                    <TextField min="0" step="any" type="number" ref="upperLoop"
                      name="upper"
                      value={this.state.upper}
                      onChange={this.handleInputChange}
                      style={{ width: '80px', margin: "5px" }}
                    />
                    seconds.
                    </Typography>
                  {/* <Select label="Time Unit" defaultValue="1">
                    <option value="1">Seconds</option>
                    <option value="2">Minutes</option>
                    <option value="3">Hours</option>
                  </Select> */}
                </DialogContent>
                <DialogActions>
                  <DialogButton action="cancel" isDefaultAction>
                    Stop
                  </DialogButton>
                  <DialogButton action="apply" >Apply</DialogButton>
                </DialogActions>
              </Dialog>

              <Fab
                mini
                icon={ this.loopIcon() }
                onClick={() =>
                  this.setState({ loopDialogOpen: true })}
                ref="loopButton"
                theme={['secondaryBg', 'onSecondary']}
                data-looping="false"
                style={{
                  margin: '-20px auto',
                  bottom: '0',
                  left: '110px',
                  right: '0',
                  position: 'absolute',
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
            {/* <Typography onClick={() => this.setState({ editName: true })}
              use="headline6"
              tag="h2"
              style={{ textAlign: 'center' }}
            >
              {this.props.name}
            </Typography> */}

            {this.checkName()}

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
            <Typography
              use="caption"
              theme="textSecondaryOnBackground"
              style={{
                margin: '0',
                float: 'left'
              }}
            >{this.converTime(this.state.currentTime)}</Typography>
            <Typography
              use="caption"
              theme="textSecondaryOnBackground"
              style={{
                margin: '0',
                float: 'right'
              }}
            >{this.converTime(this.state.duration)}
            </Typography>
          </div>
        </Card>
      </div>
    );
  }

  checkName() {
    if (this.state.editName)
      return (
        <div style={{marginTop: '30px', marginBottom: '30px'}}>
          <TextField
            fullwidth
            name="name"
            defaultValue={this.state.name}
            onChange={this.handleInputChange}
          />
          <Button
            raised
            style={{ margin: '10px auto', clear: 'right' }}
            onClick={() => this.setState({ editName: false })}>
            Rename
          </Button>
        </div>
      )
    else 
      return (
        <Ripple>
          <Typography onClick={() => this.setState({ editName: true })}
            use="headline6"
            tag="h2"
            style={{ textAlign: 'center' }}
          >
            {this.state.name}
          </Typography>
        </Ripple>
      )
  }

  playButton() {
    let audio = this.refs.audio;
    if (this.state.paused) {
      audio.play()
    } else {
      audio.pause()
    }
  }

  loopIcon() {
    const remaining = this.state.loopTime - this.state.ctx.currentTime;

    if (!this.state.isLooping)
      return "loop"
    else
      return (
        <CircularProgress
        progress={remaining / this.state.delay}
        style={{ color: 'white' }} />
      )
  }

  createVisualization(context, audioSrc) {
    // https://stackoverflow.com/questions/1255512/how-to-draw-a-rounded-rectangle-on-html-canvas
    CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
      if (w < 2 * r) r = w / 2;
      if (h < 2 * r) r = h / 2;
      this.beginPath();
      this.moveTo(x + r, y);
      this.arcTo(x + w, y, x + w, y + h, r);
      this.arcTo(x + w, y + h, x, y + h, r);
      this.arcTo(x, y + h, x, y, r);
      this.arcTo(x, y, x + w, y, r);
      this.closePath();
      return this;
    }
    
    let analyser = context.createAnalyser();
    let canvas = this.refs.analyzerCanvas;
    let ctx = canvas.getContext('2d');
    audioSrc.connect(analyser);
    audioSrc.connect(context.destination);
    analyser.connect(context.destination);
    ctx.imageSmoothingEnabled = true;

    function renderFrame(){
      let freqData = new Uint8Array(analyser.frequencyBinCount)
      requestAnimationFrame(renderFrame)
      analyser.getByteFrequencyData(freqData)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      // console.log(freqData)
      ctx.fillStyle = '#ff6659';
      let bars = 27;
      for (var i = 0; i < bars; i++) {
        let bar_x = i * 12;
        let bar_width = 8;
        let bar_height = freqData[i] / 3;
        ctx.roundRect(
          bar_x,
          canvas.height / 2 - bar_height / 2 - 30,
          bar_width,
          bar_height + 8,
          20
        ).fill()
        // ctx.roundRect(35, 10, 225, 110, 20).fill()
      }
    };
    renderFrame()
  }

  converTime(time) {
    const min = "0" + Math.floor(time / 60);
    const sec = "0" + Math.floor(time % 60);

    return min.substr(min.length-2) + ':' + sec.substr(sec.length-2)
  }
}