import React, { Component } from 'react'
import { SoundCard } from './sound-card'
import { Grid, GridCell } from '@rmwc/grid'

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
        <Grid align='right'>
          {sounds.map( (sound, index) => { return (
            <GridCell span='4'>
              <SoundCard name={sound} fname={sound}/>
            </GridCell>
          )})}
        </Grid>
      </div>
    )
  }
}