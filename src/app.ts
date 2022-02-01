const express = require('express')
const routes = require('./routes')

class App {
  public readonly express
  constructor() {
    this.express = express()
    
  }

  middlewares() {
    this.express.use(express.json())
  }

  routes() {
    this.express.use(routes)
  }
}

module.exports = new App().express