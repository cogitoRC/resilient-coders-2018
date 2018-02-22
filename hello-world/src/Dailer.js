import React, { Component } from 'react';
import './site.css';
const Twilio = window.Twilio;



class Dailer extends Component {
        componentDidMount() {
            this.callApi()
              .then(res => this.setState({ response: res }))
              .catch(err => console.log(err));
          }
        
          callApi = async () => {
            const speakerDevices = document.getElementById('speaker-devices');
            const ringtoneDevices = document.getElementById('ringtone-devices');
            const outputVolumeBar = document.getElementById('output-volume');
            const inputVolumeBar = document.getElementById('input-volume');
            const volumeIndicators = document.getElementById('volume-indicators');
            const response = await fetch('/token');
            const body = await response.json();
            if (response.status !== 200) {
              throw Error(body.message);
            }

            function log (message) {
                console.log(message);
                const logDiv = document.getElementById('log');
                logDiv.innerHTML += ('<p>&gt;&nbsp;' + message + '</p>');
                logDiv.scrollTop = logDiv.scrollHeight;
              };

            const data = body;

            log('Requesting Capability Token...');

            log('Got a token.');
            console.log('Token: ' + data.token);

            document.getElementById('button-call').onclick = function () {
                // get the phone number to connect the call to
                const params = {
                  To: document.getElementById('phone-number').value
                };
            
                console.log('Calling ' + params.To + '...');
                Twilio.Device.connect(params);
              };
            
              // Bind button to hangup call
              document.getElementById('button-hangup').onclick = function () {
                console.log('Hanging up...');
                Twilio.Device.disconnectAll();
              };

      // Setup Twilio.Device
      Twilio.Device.setup(data.token,{debug: true});

      Twilio.Device.ready(function (device) {
        log('Twilio.Device Ready!');
        document.getElementById('call-controls').style.display = 'block';
      });

      Twilio.Device.error(function (error) {
        log('Twilio.Device Error: ' + error.message);
      });

      function bindVolumeIndicators(connection) {
        connection.volume(function(inputVolume, outputVolume) {
          var inputColor = 'red';
          if (inputVolume < .50) {
            inputColor = 'green';
          } else if (inputVolume < .75) {
            inputColor = 'yellow';
          }
    
          inputVolumeBar.style.width = Math.floor(inputVolume * 300) + 'px';
          inputVolumeBar.style.background = inputColor;
    
          var outputColor = 'red';
          if (outputVolume < .50) {
            outputColor = 'green';
          } else if (outputVolume < .75) {
            outputColor = 'yellow';
          }
    
          outputVolumeBar.style.width = Math.floor(outputVolume * 300) + 'px';
          outputVolumeBar.style.background = outputColor;
        });
      }

      console.log('Attempting to call');

      Twilio.Device.connect(function (conn) {
        log('Successfully established call!');
        document.getElementById('button-call').style.display = 'none';
        document.getElementById('button-hangup').style.display = 'inline';
        volumeIndicators.style.display = 'block';
        bindVolumeIndicators(conn);
      });

      Twilio.Device.disconnect(function (conn) {
        log('Call ended.');
        document.getElementById('button-call').style.display = 'inline';
        document.getElementById('button-hangup').style.display = 'none';
        volumeIndicators.style.display = 'none';
      });

      Twilio.Device.incoming(function (conn) {
        log('Incoming connection from ' + conn.parameters.From);
        var archEnemyPhoneNumber = '+12099517118';

        if (conn.parameters.From === archEnemyPhoneNumber) {
          conn.reject();
          log('It\'s your nemesis. Rejected call.');
        } else {
          // accept the incoming connection and start two-way audio
          conn.accept();
        }
      });

      function setClientNameUI(clientName) {
        var div = document.getElementById('client-name');
        div.innerHTML = 'Your client name: <strong>' + clientName +
          '</strong>';
      }

      setClientNameUI(data.identity);

      function updateDevices(selectEl, selectedDevices) {
        selectEl.innerHTML = '';
        Twilio.Device.audio.availableOutputDevices.forEach(function(device, id) {
          var isActive = (selectedDevices.size === 0 && id === 'default');
          selectedDevices.forEach(function(device) {
            if (device.deviceId === id) { isActive = true; }
          });
      
          var option = document.createElement('option');
          option.label = device.label;
          option.setAttribute('data-id', id);
          if (isActive) {
            option.setAttribute('selected', 'selected');
          }
          selectEl.appendChild(option);
        });
      }

      function updateAllDevices() {
        updateDevices(speakerDevices, Twilio.Device.audio.speakerDevices.get());
        updateDevices(ringtoneDevices, Twilio.Device.audio.ringtoneDevices.get());
      }

      Twilio.Device.audio.on('deviceChange', updateAllDevices);



      // Show audio selection UI if it is supported by the browser.
      if (Twilio.Device.audio.isSelectionSupported) {
        document.getElementById('output-selection').style.display = 'block';
      }

            return body;
          }
          
  render() {
    return (
        <div id="controls">
    <div id="info">
      <p class="instructions">Twilio Client</p>
      <div id="client-name"></div>
      <div id="output-selection">
        <label>Ringtone Devices</label>
        <select id="ringtone-devices" multiple></select>
        <label>Speaker Devices</label>
        <select id="speaker-devices" multiple></select><br/>
        <a id="get-devices">Seeing unknown devices?</a>
      </div>
    </div>
    <div id="call-controls">
      <p class="instructions">Make a Call:</p>
      <input id="phone-number" type="text" placeholder="Enter a phone # or client name" />
      <button id="button-call">Call</button>
      <button id="button-hangup">Hangup</button>
      <div id="volume-indicators">
        <label>Mic Volume</label>
        <div id="input-volume"></div><br/><br/>
        <label>Speaker Volume</label>
        <div id="output-volume"></div>
      </div>
    </div>
    <div id="log"></div>
  </div>
    );
  }
}
export default Dailer;



