import React from 'react'
import { findDOMNode } from 'react-dom'

class PinToBottom extends React.Component {
  componentWillUpdate() {
    const node = findDOMNode(this)
    const { scrollHeight, clientHeight, scrollTop } = node
    const buffer = 50
    this.pinToBottom = clientHeight + scrollTop + buffer >= scrollHeight
  }

  componentDidUpdate() {
    if (this.pinToBottom) {
      const node = findDOMNode(this)
      node.scrollTop = node.scrollHeight
    }
  }

  render() {
    return <div style={this.props.style}>{this.props.children}</div>
  }
}

export default PinToBottom
