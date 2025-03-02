const DBConnection = require('./connect.cjs');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Enable CORS for all requests
app.use(cors());

// Example endpoint
app.get('/api/doctors', async (req, res) => {
    const instance = new DBConnection();
    await instance.connect();

    const db = instance.getDB("harmoniCare");
    const doctorsCollection = db.collection("Doctor");

    const doctors = await doctorsCollection.find().toArray();
    console.log(doctors);
    /*
  const doctors = [
    { doctorID: 1, name: 'Dr. John Doe' },
    { doctorID: 2, name: 'Dr. Jane Smith' },
  ];
  */
  res.json(doctors);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
