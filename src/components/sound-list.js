import React, { Component } from 'react'
import { SoundCard } from './sound-card'
import { ImageList, ImageListItem } from '@rmwc/image-list'

export class SoundList extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
       
    }
  }

  render() {
    const fs = require('fs')
    const sounds = fs.readdirSync('./src/resources')

    return (
      <div>
        <ImageList style={{ margin: '20px' }}>
          {sounds.map((sound, index) => {
            return (
              <ImageListItem key={sound} style={{ margin: '20px' }}>
                <SoundCard name={sound} fname={sound} />
              </ImageListItem>
            )
          })}
        </ImageList>
      </div>
    )
  }
}