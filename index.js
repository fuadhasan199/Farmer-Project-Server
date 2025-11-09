require('dotenv').config();  

const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


const port = process.env.PORT || 5000;
const uri = process.env.MONGO_URI;  
const dbName = process.env.DB_NAME;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

async function run() {
  try {
    await client.connect();
    const db = client.db(dbName);
    const FarmerCollection = db.collection('farmers');

    app.get('/farmers', async (req, res) => {
      const result = await FarmerCollection.find().toArray();
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(" Connected to MongoDB successfully!");
  } catch (err) {
    console.error(" MongoDB Connection Error:", err);
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(` Server running on port ${port}`);
});
