import React from 'react'
import { render } from 'react-dom'
import TitleBar from 'frameless-titlebar'
import { SoundCard } from './components/sound-card'
import WebFont from 'webfontloader'

// Import some styles
import './styles/app.scss'
import { SoundList } from './components/sound-list';

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
  render() {
    return (
      <div style={{overflow: 'hidden'}}>
        <div style={{position: 'fixed', width: '100%', zIndex: '1'}}>
          <TitleBar
            app="Electron"
            style={{position: 'fixed'}}
            theme={{
              barTheme: 'dark',
              barBackgroundColor: '#1b3039'
            }}
          />
        </div>
        <div style={{position: 'relative', top: '28px', height: '100vh', overflow: 'scroll'}}>
          <SoundList/>
        </div>
      </div>
    )
  }
}

// Render the application into the DOM, the div inside index.html
render(<App />, document.getElementById('root'))