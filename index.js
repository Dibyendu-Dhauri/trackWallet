const express = require('express')
const cors = require('cors');
const dotenv = require("dotenv");
const { db } = require('./db/db');
const {readdirSync} = require('fs')
const app = express()

dotenv.config();

const PORT = process.env.PORT

//middlewares
app.use(express.json())
app.use(cors())

//routes
readdirSync('./routes').map((route) => app.use('/api/v1/', require('./routes/' + route)))

// error handling middleware
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage =
      err.message || "Something went wrong! Please try after some time.";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
  });
  
  // middleware for no route
  app.use((req, res, next) => {
    res.status(400).json({
      message: "no route found",
    });
  });

const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('listening to port:', PORT)
    })
}

server()