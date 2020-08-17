const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 5000
var cors = require('cors')
const config = require('./config')['development']['database']
const bcrypt = require('bcrypt');
const { json } = require('body-parser')
var ikea = require('ikea-name-generator');


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
    pool.query('SELECT * FROM cards WHERE email = $1', [email,])
    .then(({ rows }) => res.send(rows))
    .catch(err => {
        console.log(err)
        res.status(300).send(300)
    })
    
    
})

app.post('/getCard', (req, res) => {
    const { id } = req.body
    pool.query('select * FROM cards WHERE id = $1', [id,])
        .then(({ rows }) => res.send(rows))
        .catch((err) => res.send(err))
    
})

app.post('/createCard', (req, res) => {
    const { email } = req.body
    const date = new Date()
    const today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    const defaultMetadata = JSON.stringify({ items: [] })
    var name = ikea.getName(false);
    pool.query('INSERT INTO cards (email,metadata,lastModified,name) VALUES ($1,$2,$3,$4) RETURNING id', [email, defaultMetadata,today,name])
        .then((data) => {
            console.log(data)
            res.send(data.rows)
        })
            .catch(err => {
                console.log(err)
                res.status(300).send(300)
            })
})

app.post('/saveCard', (req, res) => {
    const { id, metadata } = req.body
    const data = JSON.stringify({items:metadata})
    pool.query('UPDATE cards SET metadata = $1 WHERE id = $2', [data,id])
            .then(({ rows }) => res.send("Ok"))
            .catch(err => res.status(300).send(err))
    
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    
})