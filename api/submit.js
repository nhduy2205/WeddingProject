const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { name, email } = req.body;

    // Prepare data
    const data = `Name: ${name}, Email: ${email}\n`;

    const filePath = path.join(__dirname, '../data.txt');

    try {
      // Append to file
      fs.appendFileSync(filePath, data);
      res.status(200).send('Data has been saved!');
    } catch (error) {
      res.status(500).send('Unable to save data');
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
};