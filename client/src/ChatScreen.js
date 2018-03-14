import React, { Component } from 'react'
import Chatkit from 'pusher-chatkit-client'
import SendMessageForm from './components/SendMessageForm'
import WhosOnlineList from './components/WhosOnlineList'
import MessagesList from './components/MessagesList'
import TypingIndicator from './components/TypingIndicator'

class ChatScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: {},
      currentRoom: {},
      messages: [],
      usersWhoAreTyping: [],
    }
    this.sendMessage = this.sendMessage.bind(this)
    this.sendTypingEvent = this.sendTypingEvent.bind(this)
  }

  connectToChatkit() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: 'v1:us1:542391ba-ff28-4674-a4ad-a464fd59f9f6',
      userId: this.props.currentUsername,
      tokenProvider: new Chatkit.TokenProvider({
        url: 'http://localhost:3001/authenticate',
      }),
    })

    chatManager
      .connect()
      .then(currentUser => {
        this.setState({ currentUser })
        return currentUser.subscribeToRoom(
          5599364,
          {
            newMessage: message => {
              this.setState({
                messages: [...this.state.messages, message],
              })
            },
            userStartedTyping: user => {
              this.setState({
                usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name],
              })
            },
            userStoppedTyping: user => {
              this.setState({
                usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
                  username => username !== user.name
                ),
              })
            },
            userCameOnline: () => {
              console.log('userCameOnline')
              this.forceUpdate()
            },
            userWentOffline: () => this.forceUpdate(),
            userJoined: user => {
              const currentRoom = this.state.currentUser.rooms.find(
                room => room.id === this.state.currentRoom.id
              )
              this.setState({
                currentRoom,
              })
              this.forceUpdate()
            },
          },
          100
        )
      })
      .then(currentRoom => {
        this.setState({ currentRoom })
      })
      .catch(error => console.error('error', error))
  }

  componentDidMount() {
    this.connectToChatkit()
  }

  sendMessage(text) {
    this.state.currentUser.sendMessage({
      text,
      roomId: this.state.currentRoom.id,
    })
  }

  sendTypingEvent() {
    this.state.currentUser
      .isTypingIn(this.state.currentRoom.id)
      .catch(error => console.error('error', error))
  }

  render() {
    const styles = {
      container: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        color: 'white',
      },
      header: {
        backgroundImage:
          'linear-gradient(to right, #2e646d, #2e646d, #2e646d, #2e646d, #2e646d)',
        padding: 20,
      },
      chatContainer: {
        display: 'flex',
        flex: 1,
      },
      whosOnlineListContainer: {
        width: '15%',
        backgroundColor: '#2b303b',
        backgroundImage:
          'linear-gradient(to bottom, #336f78, #2d6a79, #296579, #296079, #2b5a78)',
        padding: 20,
      },
      chatListContainer: {
        width: '85%',
        display: 'flex',
        flexDirection: 'column',
        backgroundImage:
          'linear-gradient(to bottom, #437f86, #3e7a88, #3c7689, #3c7089, #3f6b88)',
      },
      chatList: {
        padding: 20,
        flex: 1,
      },
    }
    return (
      <div style={styles.container}>
        <header style={styles.header}>
          <h2>Chatly</h2>
        </header>
        <div style={styles.chatContainer}>
          <aside style={styles.whosOnlineListContainer}>
            <WhosOnlineList
              currentUser={this.state.currentUser}
              users={this.state.currentRoom.users}
            />
          </aside>
          <section style={styles.chatListContainer}>
            <MessagesList
              messages={this.state.messages}
              style={styles.chatList}
            />
            <TypingIndicator usersWhoAreTyping={this.state.usersWhoAreTyping} />
            <SendMessageForm
              onSubmit={this.sendMessage}
              onChange={this.sendTypingEvent}
            />
          </section>
        </div>
      </div>
    )
  }
}

export default ChatScreen
