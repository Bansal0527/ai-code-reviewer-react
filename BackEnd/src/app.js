const express = require('express');
const { cookieParser, csrfProtection } = require("./csrf-middleware");
const aiRoutes = require('./routes/ai.routes')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(cookieParser());
app.use(csrfProtection);


app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use('/ai', aiRoutes)

module.exports = app