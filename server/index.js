const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/authRouter')

require('dotenv').config();
require("./Models/db");

const PORT = process.env.PORT || 8000;
app.get('/', (req, res) => {
    res.json({
        message: "Server running fine",
        status: "OK"
    });
});

app.get('/ping', (req, res) => {
    res.send('PONG')
});

app.use(bodyParser.json())

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use('/auth' , AuthRouter)


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})