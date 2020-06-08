const express = require('express');

const app = express();


const basePath = `${__dirname}/src/properties/`
app.use(express.static(`${basePath}/`))

app.get('/', (req,res) => {
	res.sendFile(`${basePath}/index.html`);
});


app.listen(5000, () => console.log('running'));