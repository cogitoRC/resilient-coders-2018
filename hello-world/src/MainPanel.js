import React, { Component } from 'react';
import MessageList from './MessageList';
import './MainPanel.css';
import MessageForm from './MessageForm';
import Dailer from './Dailer';

class MainPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
    }
  }

  handleNewMessage = (text) => {
    this.setState({
      messages: [...this.state.messages, { me: true, author: "Me", body: text }],
    })
  }

  render() {
    return (
      <div className="MainPanel" style={{width: '100%', height: '100%'}}>
        <MessageList messages={this.state.messages} />
        <MessageForm onMessageSend={this.handleNewMessage} />
        <Dailer />
      </div>
    );
  }
}

export default MainPanel;
