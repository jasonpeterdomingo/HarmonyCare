import React, { FormEvent, useState } from "react";
import "./App.css";
import { useMultistepForm } from "./Components/useMultistepForm";
import {
  WelcomeMessage,
  AddressForm,
  DoctorPersonalInfo,
  UserName,
} from "./Components/Questions";

type FormData = {
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

const INITIAL_DATA: FormData = {
  firstName: "",
  lastName: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  age: "",
  gender: "",
  language: "",
};

function App() {
  //create the state
  const [data, setData] = useState(INITIAL_DATA); //stores the data in state, so it is saved between button clicks
  const [language, setLanguage] = useState<"en" | "es" | "">(""); // Store selected language
  //allow fields like name and age to be updated
  //TypeScript allows any fields of a type to be passed in optionally when using Partial<>
  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }
  //implement the hook
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <WelcomeMessage
        setLanguage={(lang) => {
          setLanguage(lang);
          next();
        }}
      />,
      <UserName {...data} updateFields={updateFields} />,
      <AddressForm {...data} updateFields={updateFields} />,
      <DoctorPersonalInfo {...data} updateFields={updateFields} />,
    ]); //each form takes in info

  //handle button submission between pages
  function onSubmit(e: FormEvent) {
    e.preventDefault(); //prevents page from doing an automatic refresh/total form submit option
    if (!isLastStep) return next(); // only go to next page if we aren't on last page
    alert("Successful Submission of Form"); //what to do if the finish button is clicked
  }
  //other stuff
  return (
    <div
      style={{
        position: "relative",
        background: "white",
        border: "1px solid black",
        padding: "2rem",
        margin: "1rem",
        borderRadius: ".5rem",
        fontFamily: "Arial",
        maxWidth: "max-content",
      }}
    >
      <form onSubmit={onSubmit}>
        <div style={{ position: "absolute", top: ".5rem", right: ".5rem" }}>
          {currentStepIndex} / {steps.length - 1}
        </div>
        {step}
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            gap: ".5rem",
            justifyContent: "flex-end",
          }}
        >
          {currentStepIndex >= 0 && (
            <button type="button" onClick={back}>
              Back
            </button>
          )}
          {currentStepIndex > 0 && (
            <button type="submit">{isLastStep ? "Finish" : "Next"}</button>
          )}
        </div>
      </form>
    </div>
  );
}

export default App;
