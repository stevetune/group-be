const express = require('express')
const serveIndex = require('serve-index')


const app = express()


const basePath = __dirname + '/src/properties/'

app.use( express.static( basePath ) )
app.use('/', serveIndex( basePath ));


app.listen(5000, () => console.info('\r\nNow running at\r\nhttp://10.0.0.5:5000\r\n'))