const router = require('express').Router()
const WolframAlphaAPI = require('wolfram-alpha-api')
const waApi = WolframAlphaAPI(process.env.APPID)

router.get('/', (req, res) => {
  const input = req.query.input
  const format = req.query.format || 'json'

  // Send a 400 (Bad request http error) in case the client
  // doesn't send the 'input' query parameter or if it is empty
  // of if the 'format' input query is other than 'json' or 'xml'
  if (!input || (format !== 'json' && format !== 'xml')) {
    return res.status(400).send('Bad Request')
  }

  // Call wolfram api with the client input
  // We are setting the includepodid parameter to ['Input', 'Result'] because
  // we are only interested in these two pods.
  waApi.getFull({
    input: input,
    format: 'plainText',
    output: 'json',
    includepodid: ['Input', 'Result']
  }).then(result => {
    let response

    // Handle errors and populate the response object
    if (result.success && !result.error && result.numpods === 2) {
      response = {
        input: input,
        interpretation: result.pods[0].subpods[0].plaintext,
        result: result.pods[1].subpods[0].plaintext
      }
    } else {
      // No results
      response = {
        input: input,
        interpretation: '',
        result: 'No results found'
      }
    }

    // Convert the response object to xml if format was xml
    // and set contentType as 'application/xml'
    if (format === 'xml') {
      res.contentType('application/xml')

      response = `<?xml version='1.0'?>
      <result>
        <input>${input}</input>
        <interpretation>${response.interpretation}</interpretation>
        <result>${response.result}</result>
      </result>
      `
    }

    res.send(response)
  })
})

module.exports = router
