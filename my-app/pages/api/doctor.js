// /pages/api/doctor.js
import DBConnection from '../../server/connect.cjs';

export default async function handler(req, res) {
    const dbInstance = new DBConnection();

    try {
        console.log("Connecting to MongoDB...");
        await dbInstance.connect();
        const db = dbInstance.getDB('harmoniCare');
        const doctorsCollection = db.collection('Doctor');

        console.log("Fetching doctors...");
        const doctors = await doctorsCollection.find({}).toArray();

        console.log("Doctors fetched successfully:", doctors);
        res.status(200).json(doctors);
    } catch (error) {
        console.error("Error fetching doctor data:", error);
        res.status(500).json({ error: 'Failed to retrieve data from MongoDB', message: error.message });
    }
}
