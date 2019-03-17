import React from 'react'
import { render } from 'react-dom'
import TitleBar from 'frameless-titlebar'
import mp3 from './resources/mischief-maker-by-kevin-macleod.mp3'

// Import some styles
import './styles/app.scss'

// Create main App component
class App extends React.Component {
  render() {
    return (
      <div>
        <TitleBar
          app="Electron"
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
            <audio src={mp3}></audio>
            <button class="foo-button mdc-button" data-playing="false">Play/Pause</button>

            <script src="play-button.js"></script>

          </div>
        }
      </div>
    )
  }
}

// Render the application into the DOM, the div inside index.html
render(<App />, document.getElementById('root'))