import React from 'react'
import {Fab} from '@rmwc/fab'
import {Slider} from '@rmwc/slider'
import {Theme} from '@rmwc/theme'
import {Card, CardPrimaryAction, CardMedia, CardMediaContent} from '@rmwc/card'
import {Typography} from '@rmwc/typography'

var sound = require.context('./../resources', true);

export class PlayButton extends React.Component {
  constructor(props) {
    super(props)
    this.playButton = this.playButton.bind(this)
    this.state = {
      mp3: sound(`./${this.props.fname}`),
      duration: 0,
      currentTime: 0,
      audio: this.refs.audio}
  }

  componentDidMount(){
    this.playButton()
    let audio = this.refs.audio;
    this.timerID = setInterval(
      () => this.setState({
        currentTime: audio.currentTime,
        duration: audio.duration
      }),
      100
    );
  }

  render() {
    return (
      <div style={{padding: '1rem 1rem 1rem 1rem'}}>
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
                icon="play_arrow"
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

          <div style={{ padding: '0 1rem 1rem 1rem' }}>
            <Typography use="headline6" tag="h2">
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
              style={{ marginTop: '-1rem' }}
            >
              {this.props.fname}
            </Typography>
            
            <Slider 
              continuous='true'
              value={this.state.currentTime}
              min={0}
              max={this.state.duration}
              onInput={evt => this.refs.audio.currentTime = evt.detail.value}
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
}