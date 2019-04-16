import React from 'react'
import mp3 from './../resources/mischief-maker-by-kevin-macleod.mp3'
import {MDCRipple} from '@material/ripple/index';

export class PlayButton extends React.Component {
  constructor(props) {
    super(props)

    name = "hello"
    this.playButton = this.playButton.bind(this)
  }

  componentDidMount(){
    this.playButton()
  }

  render() {
    return (
      <div>
        <h3>{name}</h3>

        <audio
        // controls
          ref="audio"
          src={mp3}
        />

        <button 
          ref="button"
          className="foo-button mdc-button" 
          data-playing="false"
        >
          Play/Pause
        </button>
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