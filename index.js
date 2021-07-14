const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require ('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.PASS}@cluster0.r8riy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const app = express()

app.use(bodyParser.json())
app.use(cors());

const port = 5000

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const appointmentsCollection = client.db("doctorsPortal").collection("appointments");

    app.post('/appointment', (req, res) => {
        const appointment = req.body;
        // console.log(appointment)
        appointmentsCollection.insertOne(appointment)
        .then(result => {
            console.log(result)
            res.send(acknowledged = true)
        })
    })

    app.get('/appointments', (req, res) => {
        appointmentsCollection.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })

    app.post('/appointmentsByDate', (req, res) => {
      const date = req.body;
      console.log(date.date)
      appointmentsCollection.find({date: date.date})
      .toArray((err, documents) => {
        res.send(documents);
      })
  })

});
  
  app.listen(process.env.PORT || port)