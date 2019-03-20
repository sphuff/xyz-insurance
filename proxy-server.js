const express = require('express')
const request = require('request')
const cors = require('cors')


const server = express()

server.use(express.json())
server.use(express.urlencoded())
server.use(cors())

server.listen(9001, function() {
    console.log('server started')
})

server.post('/api/:url', (req, res) => {
    const url = req.params.url
    if (!url) {
        res.send({ error: 'Must send a url' })
        return
    }
    request.post(url, { headers: { 
        "x-api-key": req.headers['x-api-key'], 
        "content-type": req.headers['content-type']
    }, json: true, body: req.body }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body)
        } else {
            res.status(response.statusCode).send(body)
        }
    })
})