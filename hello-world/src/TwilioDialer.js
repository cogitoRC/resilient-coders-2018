import React, { Component } from 'react';
import TwilioVideo from 'react-twilio';


class TwilioDialer extends Component {
  constructor(props) {
    super(props);
    this.shadowStyle = {
      border: '1px solid #dcd9d9',
      borderRadius: '4px',
      marginBottom: '15px',
      boxShadow: '5px 5px 5px #e0e3e4',
      fontWeight: 'lighter'
    }
    let obj = { token: "AC673a035766443deae72537fe1c3382a8" }
    this.token = obj.token;
  }
  render() {
    return (
      <div style={{ heigh: '800px', width: '50%' }}>
        <TwilioVideo roomName={'6172857289'} token={this.token} style={{ ...this.shadowStyle, boxShadow: '5px 5px 5px #e0e3e4' }} />
      </div>
    );
  //   return (
  //  <div id="controls">
  //     <div id="preview">
  //       <p class="instructions">Hello Beautiful</p>
  //       <div id="local-conversation"></div>
  //       <button id="button-preview">Preview My Camera</button>
  //     </div>
  //     <div id="invite-controls">
  //       <p class="instructions">Invite another Video Client</p>
  //       <input id="invite-to" type="text" placeholder="Identity to send an invite to" />
  //       <button id="button-invite">Send Invite</button>
  //     </div>
  //     <div id="log">
  //       <p><span id="log-content">Preparing to listen</span>...</p>
  //     </div>
  //   </div>
  // );
  }
}

export default TwilioDialer;