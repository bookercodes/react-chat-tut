import React, { Component } from 'react'

class ChatScreen extends Component {
  render() {
    const styles = {
      container: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'tomato',
      },
      header: {
        padding: 20,
      },
      chatContainer: {
        display: 'flex',
        flex: 1,
        backgroundColor: 'red',
      },
      whosOnlineListContainer: {
        width: '15%',
        padding: 20,
      },
      chatListContainer: {
        width: '85%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'papayawhip',
        padding: 20,
      },
    }
    return (
      <div style={styles.container}>
        <header style={styles.header}>
          <h2>Chatly</h2>
        </header>
        <div style={styles.chatContainer}>
          <aside style={styles.whosOnlineListContainer}>
            <p>Who's online</p>
          </aside>
          <section style={styles.chatListContainer}>
            <p>Chat</p>
          </section>
        </div>
      </div>
    )
  }
}

export default ChatScreen
