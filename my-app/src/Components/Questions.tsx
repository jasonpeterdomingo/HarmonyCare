import { FormWrapper } from "./FormWrapper";
import "./Questions.css";
//import bkgd1 from "../assets/bkgd1.png";

type QuestionsFields = {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  age: string;
  gender: string;
  docLanguage: string;
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
    </FormWrapper>
  );
}

const translations = {
  en: {
    title: "Preferred Doctor Info",
    age: "Age",
    gender: "Preferred Gender?",
    options: ["Male", "Female", "No Preference"],
  },
  es: {
    title: "Información del Médico Preferido",
    age: "Edad",
    gender: "¿Género preferido?",
    options: ["Hombre", "Mujer", "Sin preferencia"],
  },
};

export function DoctorPersonalInfo({
  age,
  gender,
  language,
  updateFields,
}: QuestionsProps & { language: "en" | "es" | "" }) {
  //checkbox options:
  const t = translations[language as "en" | "es"] || translations["en"];
  //handle checkbox change

  return (
    <div>
      <h2 title={t.title} className="normalText">
        Perfect! Now, please enter your zip code below so that we can find a
        medical professional in that area:
      </h2>
      <label>{t.age}</label>
      <input
        autoFocus
        required
        min={1}
        type="number"
        value={age}
        onChange={(e) => updateFields({ age: e.target.value })}
      />
      <label>{t.gender}</label>
      {t.options.map((option) => (
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
        onChange={(e) => updateFields({ docLanguage: e.target.value })}
      />
    </div>
  );
}
