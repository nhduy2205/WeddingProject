import { MongoClient } from 'mongodb';

// MongoDB connection URI
const uri = 'mongodb+srv://duym5122015:&LFSauxL@cluster0.eld6y.mongodb.net/weeding?retryWrites=true&w=majority';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { name, message } = req.body;  // Extract the form data

    // Create a new MongoClient
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
      await client.connect();  // Connect to MongoDB

      const database = client.db('weeding');  // Choose the 'wedding' database
      const collection = database.collection('loichuc');  // Choose the 'loichuc' collection

      // Insert the form data into the collection
      const result = await collection.insertOne({ name, message, date: new Date() });

      res.status(200).send('Data has been saved successfully!');
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    } finally {
      await client.close();  // Close the connection
    }
  } else {
    res.status(405).send(error);
  }
};