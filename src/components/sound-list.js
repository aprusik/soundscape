import React, { Component } from 'react'
import { SoundCard } from './sound-card'

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
        {sounds.map( (sound, index) => {
          return <SoundCard name={sound} fname={sound}/>
        })}
      </div>
    )
  }
}
