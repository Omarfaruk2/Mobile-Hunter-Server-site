const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const cors = require('cors')
require('dotenv').config()

const port = process.env.PORT || 5000
const app = express()

// assigment
// 6ofrUMieJvrpIJrA

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9tzag.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })

async function run() {
    try {
        await client.connect()
        const mobileCollection = client.db("device").collection("mobile")

        app.get('/inventory', async (req, res) => {
            const query = {}
            const cursor = mobileCollection.find(query)
            const result = await cursor.toArray()
            res.send(result)
        })

        // // Add Items
        app.post('/inventory', async (req, res) => {
            const newItem = req.body
            const result = await mobileCollection.insertOne(newItem)
            res.send(result)
        })

        // details
        app.get('/inventory/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await mobileCollection.findOne(query)
            res.send(result)
        })
        // delevered 
        app.put("/inventory/:id", async (req, res) => {
            const id = req.params.id
            const filter = { _id: ObjectId(id) }
            const updateDoc = {
                $set: {
                    quantity: req.body.updateQuantity
                },
            }
            const result = await mobileCollection.updateOne(filter, updateDoc)
            res.send(result)
        })

        // add Quantity 

        app.put("/inventory/:id", async (req, res) => {
            const id = req.params.id
            const filter = { _id: ObjectId(id) }
            const updateDoc = {
                $set: {
                    quantity: req.body.updateQuantity
                },
            }
            const result = await mobileCollection.updateOne(filter, updateDoc)
            res.send(result)
        })

        // deleted itemms
        app.delete("/inventory/:id", async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await mobileCollection.deleteOne(query)
            res.send(result)
        })


        // My items
        app.get('/myitems', async (req, res) => {
            const email = req.query.email
            const query = { email: email }
            const cursor = mobileCollection.find(query)
            const result = await cursor.toArray()
            res.send(result)
        })


    } finally {

    }
}

run().catch(console.dir)

app.post("/", (req, res) => {
    res.send("Gemus Server Running")
})


// middleware
app.use(cors())
app.use(express.json())


app.get("/", (req, res) => {
    res.send("Running Genius Server hello")
})

app.listen(port, () => {
    console.log("Listening to port", port)
})
