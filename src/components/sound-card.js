import React from 'react';

import { Howl, Howler } from 'howler';
import { Button, Slider, Card, Flex, Loader } from '@fluentui/react-northstar'
import { PlayIcon, PauseIcon } from '@fluentui/react-northstar'

export class SoundCard extends React.Component {
  constructor(props) {
    super(props);

    var self = this;

    var howl = new Howl({
      src: ['test.mp3'],
      onload: () => this.setState({loaded: true}),
      onplay: function() {
        console.log("Started Playing")
        requestAnimationFrame(self.step.bind(self))
      },
      onend: function() {
        console.log("Done Playing")
        self.setState({isToggleOn: false})
      }
    })
  
    this.state = {
        loaded: false,
        isToggleOn: false,
        sound: howl,
        curTime: 0
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));

    if (this.state.isToggleOn)
      this.state.sound.pause();
    else {
      this.state.sound.play();
    }
  }

  step() {
    // could optimize this since it seems to move 1 px at a time
    if (this.state.sound.playing()) {
      console.log("now playing...")
      this.setState({
        curTime: this.state.sound.seek()
      })
      this.frameId = window.requestAnimationFrame(this.step.bind(this))
    }
  }

  render() {
    var self = this
    const handleChange = function(e, sliderValue) {
      self.state.sound.pause();
      self.setState({curTime: sliderValue.value})
      self.state.sound.seek(sliderValue.value)
    }
    const handleMouseUp = function(e, sliderValue) {
      if (self.state.isToggleOn) {
        self.state.sound.play();
      } else if (self.state.curTime >= self.state.sound.duration()-0.01) {
        self.state.sound.seek(0);
      }
    }

    return (
      <Flex padding="padding.medium">
        <Card>
          <Card.Footer fitted>
            <Flex vAlign="center" space="around" gap="gap.small">
              <Button 
                iconOnly circular
                onClick={this.toggle}
                icon={this.state.isToggleOn ? <PauseIcon /> : <PlayIcon />}
              />
              <Slider
                fluid
                step="any"
                max={this.state.loaded ? this.state.sound.duration() : <Loader />}
                value={this.state.curTime}
                onChange={handleChange}
                onMouseUp={handleMouseUp}
              />
            </Flex>
          </Card.Footer>
        </Card>
      </Flex>
    );
  }
}