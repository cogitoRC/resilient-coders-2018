import React, { Component } from 'react';


import SidePanel from './SidePanel';
import MainPanel from './MainPanel';
import MyAppBar from './MyAppBar';

class App extends Component {
  state = {
    response: '',
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  }

  render() {
    console.log(this.state.response);
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
