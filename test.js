import { MongoClient } from 'mongodb';
const uri = "mongodb+srv://Abdk4:<Lucarsabdk95>@cluster0.ziky7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  console.log("Connection successful")
  console.log(`Collections object: ${collection}`);
  // perform actions on the collection object
  client.close, 5000;
});