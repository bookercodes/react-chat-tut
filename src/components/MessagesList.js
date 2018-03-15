import React, { Component } from 'react'
import PinToBottom from './PinToBottom'
import moment from 'moment'

class MessagesList extends Component {
  render() {
    const styles = {
      container: {
        overflowY: 'scroll',
      },
      ul: {
        listStyle: 'none',
      },
      li: {
        marginTop: 13,
        marginBottom: 13,
      },
      senderUsername: {
        fontWeight: 'bold',
      },
      sendDate: {
        fontSize: 11,
        color: '#A3B8C1',
      },
      message: { fontSize: 15 },
    }
    return (
      <PinToBottom
        style={{
          ...this.props.style,
          ...styles.container,
        }}
      >
        <ul style={styles.ul}>
          {this.props.messages.map((message, index) => (
            <li key={index} style={styles.li}>
              <div>
                <span style={styles.senderUsername}>{message.senderId}</span>{' '}
                <span style={styles.sendDate}>
                  {moment(message.createdAt)
                    .format('LT')
                    .toString()}
                </span>
              </div>
              <p style={styles.message}>{message.text}</p>
            </li>
          ))}
        </ul>
      </PinToBottom>
    )
  }
}

export default MessagesList
