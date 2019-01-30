const express = require('express')
const MongoClient = require('mongodb').MongoClient


const app = express()
const port = 3000

const dbUrl = 'mongodb://root:example@mongo:27017'
const dbName = 'myproject'

MongoClient.connect(dbUrl, function(err, client) {
  if (err) {
    console.log("MONGO ERROR", err)
  } else {
    console.log("Connected successfully to server")
  }

  app.get('/', (req, res) => {
    res.json({ok: true})
  })

  app.get('/add/:name', async (req, res) => {
    const name = req.params.name
    const db = client.db(dbName)

    const collection = db.collection('awesomedocs')
    const update = {name}

    const results = await new Promise((resolve, reject) => {
      collection.update({name}, {name}, {upsert: true}, (err, results) => {
        err ? reject(err) : resolve(results)
      })
    })

    res.json({updated: true})
  })

  app.get('/all', async (req, res) => {
    const name = req.params.name
    const db = client.db(dbName)

    const collection = db.collection('awesomedocs')
    const update = {name}

    const results = await new Promise((resolve, reject) => {
      collection.find({}).toArray((err, results) => {
        console.log("FIND RESULTS", err, results)
        err ? reject(err) : resolve(results)
      })
    })

    res.json(results)
  })

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
