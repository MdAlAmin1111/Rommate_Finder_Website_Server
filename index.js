require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.2vavvcj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    // console.log(`Example app listening on port ${port}`)
})

async function run() {
    try {
        const database = client.db('findMyRoomieDB');
        const listingsCollection = database.collection('listings');

        // for add data to db
        app.post('/api/listings', async (req, res) => {
            const doc = req.body;
            const result = await listingsCollection.insertOne(doc);
            res.send(result);
        })
        // for get all listings
        app.get('/api/listings', async (req, res) => {
            const cursor = listingsCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        // Get 6 featured roommate posts with availability = "Available"
        app.get('/api/featured-roommates', async (req, res) => {
            const query = { availability: "Available" };
            const cursor = listingsCollection.find(query).limit(6);
            const result = await cursor.toArray();
            res.send(result);
        });


        //for finding my listing data
        app.get('/api/listings/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const cursor = listingsCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })

        // for find particular data by id 
        app.get('/api/listings/id/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await listingsCollection.findOne(query);
            res.send(result);
        })

        // update a listing 
        app.put('/api/listings/update/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            // const option= {upsert:true};
            const toBeUpdatedData = req.body;
            const updatedDoc = { $set: toBeUpdatedData };
            const result = await listingsCollection.updateOne(filter, updatedDoc);
            res.send(result);
        })

        // Update likeCount for listings via PATCH request
        app.patch('/api/listings/like/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const { likeCount } = req.body;
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    likeCount: likeCount
                }
            };
            const result = await listingsCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        })

        // for delete my listing particular data by id
        app.delete('/api/listings/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await listingsCollection.deleteOne(query);
            res.send(result);
        })

        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


