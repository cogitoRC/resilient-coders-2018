const Router = require('express').Router;

const {tokenGenerator, voiceResponse} = require('./handler');

const router = new Router();

/**
 * Generate a Capability Token for a Twilio Client user - it generates a random
 * username for the client requesting a token.
 */
router.get('/token', (req, res) => {
  res.send(tokenGenerator());
});

router.post('/voice', (req, res) => {
  console.log('received incoming voice call');
  res.set('Content-Type', 'text/xml');
  res.send(voiceResponse(req.body.To));
});

router.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

module.exports = router;
