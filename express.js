const express = require('express');

const app = express();


const basePath = `${__dirname}/src/`

app.use(express.static(`${basePath}/`))

app.get('/', (req,res) => {
	res.sendFile(`${basePath}/index.html`);
});


app.listen(5000, () => console.info('\r\nNow running at\r\nhttp://10.0.0.5:5000/properties/generic-place\r\n'));