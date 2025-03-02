
//import { FormWrapper } from "./FormWrapper";
//import DBConnection from '../server/connect.cjs';

// /src/Components/DoctorList.tsx
import { useState, useEffect } from 'react';

const DoctorList = () => {
    const [doctors, setDoctors] = useState<any[]>([]); // State to store the fetched doctors data

    useEffect(() => {
        // Make a fetch request to the backend API
        fetch('http://localhost:5000/api/doctors')
            .then(response => response.json())  // Parse the JSON response
            .then(data => {
                console.log('Fetched doctors:', data);  // Log the response data
                setDoctors(data);  // Set the doctors data into state
            })
            .catch(error => console.error('Error fetching doctors:', error));  // Handle errors
    }, []);

    return (
        <div>
            {doctors.length > 0 ? (
                doctors.map((doctor, index) => (
                    <div key={index}>
                        <p>{doctor.firstName}</p>  
                        <p>Doctor ID: {doctor.doctorID}</p>
                    </div>
                ))
            ) : (
                <p>No doctors found.</p> 
            )}
        </div>
    );
};

export default DoctorList;


//export function SearchResults() {
  
  /*
  const client = new DBConnection();

  async function someFunction() {
      try {
          await client.connect();
          const db = client.getDB('myDatabase');
          console.log("Database connected:", db);
      } catch (error) {
          console.error("Error:", error);
      }
  }
  someFunction()
  */

  /*
  return (
    <FormWrapper title="Home Page">
      <p>Hello! Welcome to HarmonyCare!</p>
      <label>Last Name</label>
      <div
        style={{
          marginTop: "1rem",
          display: "flex",
          gap: ".5rem",
          justifyContent: "flex-end",
        }}
      >
      </div>
      <input required type="text" />
    </FormWrapper>
  );
}

*/
