const { MongoClient } = require('mongodb');

// MongoDB connection URI
const uri = 'mongodb+srv://duym5122015:123456@Aa@cluster0.9x7hy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { name, message } = req.body;  // Extract the form data

    // Create a new MongoClient
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
      await client.connect();  // Connect to MongoDB

      const database = client.db('damcuoi');  // Choose the 'wedding' database
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