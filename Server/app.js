const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
app.get('/', (req, res) => {
    const { username, password } = req.body
    console.log(username, password)
    res.send("ok!")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})