import React, { Component } from 'react';
import Card from './Card';

class SidePanel extends Component {
  render() {
    const names = ['Jim', 'Kordel', 'Sid', 'Julie', 'Carolyn'];
    return (
      <div style={{backgroundColor: 'blue', width: 250, height: '100%'}}>
        {names.map(name => (<Card name={name} />))}
      </div>
    );
  }
}

export default SidePanel;