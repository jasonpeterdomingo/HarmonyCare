const { MongoClient } = require("mongodb");
require("dotenv").config({path: "./config.env"});

// Singleton Pattern
class DBConnection {
    constructor(){
        if (DBConnection.instance){ // If exist, return the instance
            return DBConnection.instance;
        }
        this.client = null; // If it does not exist, then create an instance
        DBConnection.instance = this;
    } 
    

    // The connection to mongoDB
    async connect(){
        if (!this.client) {
            const uri = process.env.ATLAS_URI; // Get us log into mongoDB
            this.client = new MongoClient(uri)
            await this.client.connect();

            console.log("Created a new MongoDB connect");
        } else {
            console.log("Reusing existing connection.")
        }

        return this.client; 
    }

    getDB(dbName){
        if(!this.client){
            throw new Error("MongoDB client is not initalized.")
        }
        return this.client.db(dbName)
    }

    async dropDB(dbName) {
        if(!this.client){
            throw new Error("MongoDB client is not initalized.")
        }

        const db = this.client.db(dbName);
        const collections = await db.listCollections().toArray() // Retrieve all collections
        
        for (let collection of collections) {
            await db.collection(collection.name).drop();
        }
    }

    close(){
        if(this.client){
            this.client.close();
            this.client = null;
            console.log("MongoDB connection closed.");
        }
    }

}

async function main(){
    const instance = new DBConnection();
    const client = await instance.connect();

    const db = instance.getDB("harmoniCare");
    //const doctorsCollection = db.collection("Doctor"); 

    //console.log(`Document inserted with _id: ${result.insertedId}`);
    populateDB();

    //instance.dropDB("harmoniCare"); // Uncomment to drop database

}

async function populateDB() {
    const instance = new DBConnection();
    await instance.connect();

    const db = instance.getDB("harmoniCare");
    const doctorsCollection = db.collection("Doctor");

    const firstNames = ["Jesus", "Peter", "Luke", "Olivia", "William", "Sophia", "Benjamin", "Ava", "Daniel", "Charlotte"];
    const lastNames = ["Chirst", "Johnson", "Brown", "Davis", "Miller", "Wilson", "Anderson", "Thomas", "Martinez", "Taylor"];
    const addresses = [
        "15 Omega Drive, Building K, Suite 3, Newark, DE",
        "30668 Sussex Highway, Laurel, DE",
        "600 Delaware Avenue, Wilmington, DE",
        "121 Becks Woods Drive, Suite 100, Bear, DE",
        "38 Deak Drive, Smyrna, DE 19977",
        "1113 S State Street, Suite 202, Dover, DE",
        "810 New Burton Road, Suite 3, Dover, DE",
        "204 West Liberty Way, Milford, DE",
        "1409 Savannah Road, Lewes, DE",
        "951 Forrest Street, Dover, DE"
    ];
    const zipcodes = ["19713","19956","19801","19701","19977","19901","19963","19958","19904"]
    const gender = ["male", "female"]
    const ages = [34, 42, 55, 29, 38, 51, 47, 60, 40, 36];
    const phones = ["(302) 555-1234", "(302) 555-5678", "(302) 555-8765", "(302) 555-4321", "(302) 555-1357", "(302) 555-2468", "(302) 555-3690", "(302) 555-5791", "(302) 555-6802", "(302) 555-7913"];
    const websites = ["https://www.healthclinic.com", "https://www.carecenter.com", "https://www.medicalgroup.com", "https://www.specialistcare.com", "https://www.primarycareclinic.com", "https://www.healthfirst.com", "https://www.themedcenter.com", "https://www.clinicnetwork.com", "https://www.doctorhub.com", "https://www.carelink.com"];
    const ratings = [5, 4, 3.5, 2, 4, 4, 4, 4, 4.5, 3];

    const specialties = [
        "Cardiologist",
        "Dermatologist",
        "Pediatrician",
        "Orthopedic Surgeon",
        "Psychiatrist",
        "General Practitioner",
    ];

    const insurances = [
        "Blue Cross Blue Shield",
        "UnitedHealthcare",
        "Humana",
        "Anthem",
        "MediCare",
        "MediCal",
    ];
    
    // Insert Doctor
    for (let i=0; i < 5; i++){
        await doctorsCollection.insertOne({
            "doctorID": i,
            "firstName": firstNames[i],
            "lastName": lastNames[i],
            "address": addresses[i],
            "zip": zipcodes[i],
            "sex": gender[i%2],
            "age": ages[i],
            "email": `dr.${firstNames[i].toLowerCase()}@clinic.org`,
            "phone": phones[i],
            "websites": websites[i],
            "rating": ratings[i],
            "spokenLanuages": ["english", "spanish"],
            "specializes": [specialties[i%6], specialties[(i+1)%6]],
            "acceptedInsurances":[insurances[i%6], insurances[(i+1)%6]]
        });
    }

    for (let i=5; i < 10; i++){
        await doctorsCollection.insertOne({
            "doctorID": i,
            "firstName": firstNames[i],
            "lastName": lastNames[i],
            "address": addresses[i],
            "zip": zipcodes[i],
            "sex": gender[i%2],
            "age": ages[i],
            "email": `dr.${firstNames[i].toLowerCase()}@clinic.org`,
            "phone": phones[i],
            "websites": websites[i],
            "rating": ratings[i],
            "spokenLanuages": ["english"],
            "specializes": [specialties[i%6]],
            "acceptedInsurances":[insurances[i%6]]
        });
    }

    
}

main()