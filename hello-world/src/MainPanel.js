import React, { Component } from 'react';
import TwilioDialer from './TwilioDialer';

class MainPanel extends Component {
  render() {
    return (
      <div style={{width: '100%', height: '100%'}}>
        <TwilioDialer />
      </div>
    );
  }
}

export default MainPanel;
