const express = require('express')
const app = express()
var bodyParser = require('body-parser')
var bcrypt = require('bcrypt-nodejs')
var cors = require('cors')
const knex= require('knex')
const signin = require('./controllers/signin.js')
const register = require('./controllers/register.js')
const image = require('./controllers/image.js')
const profile = require('./controllers/profile.js')

const db=knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'anto07march',
    database : 'smartbrain'
  }
});

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/register', (req,res)=> { register.handleRegister(req,res,db,bcrypt) } )

app.post('/signin', (req,res)=> { signin.handleSignin(req,res,db,bcrypt) } )

app.put('/image', (req,res) => { image.handleEntries(req,res,db) } )

app.put('/imageAPI', (req,res) => { image.handleApiCall(req,res) } )

app.get('/profile/:id', (req,res)=> {profile.handleProfile(req,res,db) } )

app.listen(3000, () => console.log('Example app listening on port 3000!'))
