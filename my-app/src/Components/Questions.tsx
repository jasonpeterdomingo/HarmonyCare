import { FormWrapper } from "./FormWrapper";
import "./Questions.css";

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
    <FormWrapper title="Home Page">
      <h1 className="welcomeTitle">Hello! Welcome to HarmonyCare!</h1>
      <span className="welcomeMessage">
        Please follow along to be matched with a qualified medical professional
        shortly! To begin, please select your preferred language:
      </span>
      <div className="LanguageButton">
        <button
          type="button"
          onClick={() => {
            setLanguage("en");
          }}
        >
          <span className="LangButtonText">English</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setLanguage("es");
          }}
        >
          <span className="LangButtonText">Spanish</span>
        </button>
      </div>
    </FormWrapper>
  );
}

export function UserName({
  firstName,
  lastName,
  updateFields,
}: QuestionsProps) {
  return (
    <FormWrapper title="Doctor Name">
      <label>First Name</label>
      <input
        autoFocus
        type="text"
        value={firstName}
        onChange={(e) => updateFields({ firstName: e.target.value })}
      />
      <label>Last Name</label>
      <input
        type="text"
        value={lastName}
        onChange={(e) => updateFields({ lastName: e.target.value })}
      />
    </FormWrapper>
  );
}

export function AddressForm({
  street,
  city,
  state,
  zip,
  updateFields,
}: QuestionsProps) {
  return (
    <FormWrapper title="Doctor's Office Address">
      <label>Street</label>
      <input
        autoFocus
        required
        type="text"
        value={street}
        onChange={(e) => updateFields({ street: e.target.value })}
      />
      <label>City</label>
      <input
        required
        type="text"
        value={city}
        onChange={(e) => updateFields({ city: e.target.value })}
      />
      <label>State</label>
      <input
        required
        type="text"
        value={state}
        onChange={(e) => updateFields({ state: e.target.value })}
      />
      <label>Zip</label>
      <input
        required
        type="text"
        value={zip}
        onChange={(e) => updateFields({ zip: e.target.value })}
      />
    </FormWrapper>
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
