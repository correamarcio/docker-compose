const express = require('express')
const restful = require('node-restful')
const server = express()
const mongoose = restful.mongoose
const bodyparser = require('body-parser')
const cors = require('cors')



// Database
mongoose.Promise = global.Promise
mongoose.connect('mongodb://db/mydb')

//Middlewares 
server.use(bodyparser.urlencoded({extended: true}))
server.use(bodyparser.json())
server.use(cors())


// ODM

const Client = restful.model('client', {
    name: {type: String, required: true}
})

// Rest API
Client.methods(['get', 'post', 'put', 'delete'])
Client.updateOptions({new: true, runValidators: true})

//routers
Client.register(server, '/clients')

server.get('/', (req, res, next)=>{
    res.send("Backend")
})

server.listen(3000)