import React, { Component } from 'react';


import SidePanel from './SidePanel';
import MainPanel from './MainPanel';
import MyAppBar from './MyAppBar';

class App extends Component {

  render() {
    return (
      <div style={{height: '100%', width: '100%', position: 'absolute'}}>
        <MyAppBar />
        <div style={{display: 'flex', height: '100%'}}>
          <SidePanel />
          <MainPanel />
        </div>
      </div>
    );
  }
}

export default App;
