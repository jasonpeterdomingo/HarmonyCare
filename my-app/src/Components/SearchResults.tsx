import { useState, useEffect } from 'react';
import { FormWrapper } from "./FormWrapper";
import "./SearchResults.css";

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
            .catch(error => console.error('Error fetching doctors:', error)); 
    }, []);

    return (
      <FormWrapper title="Well done! Here are doctors in your area that are ready and able to meet your medical needs:">
        <div className="doctor-cards">
            {doctors.length > 0 ? (
                doctors.map((doctor, index) => (
                    <div key={index}>
                        <p>Dr. {doctor.firstName} {doctor.lastName}</p>  
                        <p>Specializations: {doctor.specializes.join(", ")}</p>
                        <p>Age: {doctor.age} </p>
                        <p>Sex: {doctor.sex} </p>
                        <p>Address: {doctor.address}</p>
                        <p>Phone: {doctor.phone}</p>
                        <p>Email: {doctor.email}</p>
                        <p>Website: {doctor.websites}</p>
                        <p>Rating: {doctor.rating}/5</p>
                        <p>Lanuages: {doctor.spokenLanuages.join(", ")}</p>
                    </div>
                ))
            ) : (
                <p>No doctors found.</p> 
            )}
        </div>

        <button className="return-button">Return to start</button>
        </FormWrapper>
    );
};

export default DoctorList;