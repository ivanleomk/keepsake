const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 5000
var cors = require('cors')
const config = require('./config')['development']['database']
const bcrypt = require('bcrypt');

const Pool = require('pg').Pool
const saltRounds = 10;



const pool = new Pool({
    user: config['user'],
    host: config['host'],
    database: config['db'],
    password: config['password'],
    port: config['port'],
  })

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
//TODO: CREATE CARD,SAVE CARD,SHARECARD
app.post('/loadCards', (req, res) => {
    const { email } = req.body
    bcrypt.hash(email, saltRounds, function (err, hash)=> {
        pool.query('SELECT * FROM cards WHERE email = $1', [hash,])
            .then(({ rows }) => res.send(rows))
            .catch(err => res.status(300).send(300))
    })
    
})

app.post('/getCard', (req, res) => {
    const { cardId } = req.body
    pool.query('select * FROM cards WHERE id = $1', [cardId,])
        .then(({ rows }) => res.send(rows))
        .catch((err) => res.send(err))
    
})

app.post('/createCard', (req, res) => {
    const { email } = req.body
    bcrypt.hash(email, saltRounds, function (err, hash)=> {
        pool.query('INSERT INTO cards WHERE email = $1', [hash,])
            .then(({ rows }) => res.send(rows))
            .catch(err => res.status(300).send(300))
    })
   
})

app.post('/saveCard', (req, res) => {
    const { id , metadata } = req.body
    pool.query('UPDATE cards SET metadata = $1 WHERE id = $2', [metadata,id])
            .then(({ rows }) => res.send("Ok"))
            .catch(err => res.status(300).send(err))
    
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    
})