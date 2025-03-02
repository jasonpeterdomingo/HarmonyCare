import { FormWrapper } from "./FormWrapper";
import "./Questions.css";
//import bkgd1 from "../assets/bkgd1.png";
// import bkgd2 from "../assets/bkgd2.png"; // Import background image 2

type QuestionsFields = {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  age: string;
  gender: string;
  language: string;
  specialist: string; // Add specialist field
  insurance: string; // Add insurance field
};

type QuestionsProps = QuestionsFields & {
  //a type that is all of the above, and the function below
  updateFields: (fields: Partial<QuestionsFields>) => void; //it is a function that takes in the above and doesn't return anything
};

export function WelcomeMessage({
  setLanguage,
}: {
  setLanguage: (lang: "en" | "es") => void;
}) {
  return (
    <div>
      <h1 className="welcomeTitle">Hello! Welcome to HarmonyCare!</h1>
      <span className="welcomeText">
        Please follow along to be matched with a qualified medical professional
        shortly! To begin, please select your preferred language:
      </span>
      <div id="LangButtonContainer">
        <button
          id="LangButton"
          className="button"
          type="button"
          onClick={() => {
            setLanguage("en");
          }}
        >
          <span className="LangButtonText">English</span>
        </button>
        <button
          id="LangButton"
          type="button"
          className="button"
          onClick={() => {
            setLanguage("es");
          }}
        >
          <span className="LangButtonText">Español</span>
        </button>
      </div>
    </div>
  );
}

export function ZipPage({ zip, updateFields }: QuestionsProps) {
  return (
    <div>
      <h2 className="normalText">
        Perfect! Now, please enter your zip code below so that we can find a
        medical professional in that area:
      </h2>
      <div className="zipContainer">
        <input
          required
          type="string"
          value={zip}
          onChange={(e) => updateFields({ zip: e.target.value })}
          pattern="\d{5}"
          minLength={5}
          maxLength={5}
          className="zipInput"
          placeholder="Enter ZIP Code"
        />
      </div>
    </div>
  );
}

export function Specialists({ specialist, updateFields }: QuestionsProps) {
  const specialistOptions = [
    "Cardiologist",
    "Dermatologist",
    "Pediatrician",
    "Orthopedic Surgeon",
    "Psychiatrist",
    "General Practitioner",
  ];

  return (
    <div className="specialistsBackground">
      <h2 className="normalText">What health specialist do you need?</h2>
      <div className="dropdownContainer">
        <select
          required
          value={specialist}
          onChange={(e) => updateFields({ specialist: e.target.value })}
          className="dropdown"
        >
          <option value="" disabled>
            Select a specialist
          </option>
          {specialistOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export function Insurance({ insurance, updateFields }: QuestionsProps) {
  const insuranceOptions = [
    "Blue Cross Blue Shield",
    "UnitedHealthcare",
    "Humana",
    "Anthem",
    "MediCare",
    "MediCal",
  ];

  return (
    <div className="specialistsBackground">
      <h2 className="normalText">What type of insurance do you have?</h2>
      <div className="dropdownContainer">
        <select
          required
          value={insurance}
          onChange={(e) => updateFields({ insurance: e.target.value })}
          className="dropdown"
        >
          <option value="" disabled>
            Select an insurance
          </option>
          {insuranceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export function DoctorPersonalInfo({
  age,
  gender,
  language,
  updateFields,
}: QuestionsProps) {
  //checkbox options:
  const genderOptions = ["Male", "Female", "No Preference"];
  //handle checkbox change

  return (
    <FormWrapper title="Prefered Doctor Info">
      <label>Age</label>
      <input
        autoFocus
        required
        min={1}
        type="number"
        value={age}
        onChange={(e) => updateFields({ age: e.target.value })}
      />
      <label>Prefered Gender??</label>
      {genderOptions.map((option) => (
        <div key={option}>
          <input
            required
            type="radio"
            name="gender"
            value={option}
            checked={gender === option}
            onChange={(e) => updateFields({ gender: e.target.value })}
          />
          <label>{option}</label>
        </div>
      ))}
      <label>Preferred Language</label>
      <input
        required
        type="text"
        value={language}
        onChange={(e) => updateFields({ language: e.target.value })}
      />
    </FormWrapper>
  );
}
