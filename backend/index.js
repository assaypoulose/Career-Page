const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');



const port = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(cors());


const uri = process.env.MONGODB_URL;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //create db
    const db = client.db("mernCareerPage");
    const jobCollections = db.collection("demoJobs");

    app.post("/post-job", async (req,res) => {
        const data = req.body;
        data.createdAt = new Date();
        //console.log(body);
        const result = await jobCollections.insertOne(data);
        if(result.insertedId){
            return res.status(200).send(result);
        }else{
            return res.status(404).send({message:"cannot instert the details, try again later.", status: false});
        }
    });

    //get all jobs
    app.get("/all-jobs", async (req,res) => {
        const jobs = await jobCollections.find({}).toArray();
        res.send(jobs);
    })

    //get single job
    app.get("/all-jobs/:id", async (req,res) => {
      const id = req.params.id;
      const job = await jobCollections.findOne({
        _id: new ObjectId(id)
      })
      res.send(job);
    })

    //get jobs by email
    app.get("/myJobs/:email", async (req,res) => {
      //console.log(req.params.email);
      const job = await jobCollections.find({postedBy: req.params.email}).toArray();
      res.send(job)
    })

    //delete a job
    app.delete("/job/:id", async (req,res) => {
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const results = await jobCollections.deleteOne(filter);
      res.send(results);
    })

    //update a job
    app.patch("/update-job/:id", async (req,res) => {
      const id = req.params.id;
      const jobData = req.body;
      const filter = {_id: new ObjectId(id)};
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          ...jobData
        },
      };
      const result = await jobCollections.updateOne(filter, updateDoc, options);
      res.send(result);
    })


    await client.db("admin").command({ ping: 1});
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
}finally {
    //close the mongodb client connection
    //await client.close();
}
}
run().catch(console.dir);
    


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


//m41HbfLjy0l7KrJs  - sooraj16