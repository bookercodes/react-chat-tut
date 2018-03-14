import React, { Component } from 'react'
import WhatIsYourUsernameScreen from './WhatIsYourUsernameScreen'
import ChatScreen from './ChatScreen'
import axios from 'axios'

class App extends Component {
  constructor() {
    super()
    this.state = {
      currentScreen: 'WhatIsYourUsernameScreen',
      currentUsername: '',
    }
    this.onUsernameSubmitted = this.onUsernameSubmitted.bind(this)
  }

  onUsernameSubmitted(username) {
    axios
      .post('http://localhost:3001/users', { username })
      .then(response => {
        this.setState({
          currentUsername: username,
          currentScreen: 'ChatScreen',
        })
      })
      .catch(error => console.error('error', error))
  }

  render() {
    if (this.state.currentScreen === 'WhatIsYourUsernameScreen') {
      return <WhatIsYourUsernameScreen onSubmit={this.onUsernameSubmitted} />
    }

    if (this.state.currentScreen === 'ChatScreen') {
      return <ChatScreen currentUsername={this.state.currentUsername} />
    }
  }
}

export default App
