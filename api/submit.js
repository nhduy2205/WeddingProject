
import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://duym5122015:&LFSauxL@cluster0.eld6y.mongodb.net/weeding?retryWrites=true&w=majority';
let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default async (req, res) => {
  if (req.method === 'POST') {
    const { name, message } = req.body;

    try {
      const client = await clientPromise; // Reuse the connection
      const database = client.db('damcuoi'); // Database name
      const collection = database.collection('loichuc'); // Collection name

      // Insert the form data
      await collection.insertOne({ name, message, date: new Date() });

      res.status(200).send('Data has been saved successfully!');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error saving data: ' + error.message);
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
}