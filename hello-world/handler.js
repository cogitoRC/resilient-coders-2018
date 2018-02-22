const ClientCapability = require('twilio').jwt.ClientCapability;
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const nameGenerator = require('./name_generator');
const config = require('./config');

exports.tokenGenerator = function tokenGenerator() {
  const identity = nameGenerator();
  const capability = new ClientCapability({
    accountSid: config.accountSid,
    authToken: config.authToken,
  });

  capability.addScope(new ClientCapability.IncomingClientScope(identity));
  capability.addScope(new ClientCapability.OutgoingClientScope({
    applicationSid: config.twimlAppSid,
    clientName: identity,
  }));

  // Include identity and token in a JSON response
  return {
    identity: identity,
    token: capability.toJwt(),
  };
};

exports.voiceResponse = function voiceResponse(toNumber) {
  // Create a TwiML voice response
  const twiml = new VoiceResponse();
  console.log(toNumber);

  if(toNumber) {
    // Wrap the phone number or client name in the appropriate TwiML verb
    // if is a valid phone number
    const attr = isAValidPhoneNumber(toNumber) ? 'number' : 'client';
    console.log(`attr: ${attr}`);
    const dial = twiml.dial({
      callerId: config.callerId,
    });
    dial[attr]({}, toNumber);
  } else {
    const say = 'Hey Sid, how do you like my demo?  Both Kordel and Julie have worked so hard on this and it is such exciting work they have done!';
    // const say = 'Thanks for calling Cogito!';
    twiml.say(say);
    // twiml.say('Thanks for calling!');
  }

  return twiml.toString();
};

/**
* Checks if the given value is valid as phone number
* @param {Number|String} number
* @return {Boolean}
*/
function isAValidPhoneNumber(number) {
  return /^[\d\+\-\(\) ]+$/.test(number);
}