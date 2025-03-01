//import logo from './logo.svg';
import React from 'react';
import './App.css';
import { useMultistepForm } from './useMultistepForm';
import { AddressForm, DoctorPersonalInfo, UserName } from './Questions';

/*
//import logo from './logo.svg';
import './App.css';
import { useMultistepForm } from './useMultistepForm';
import React from 'react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
  */

function App(){
  //implement the hook
  const {
    steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } = useMultistepForm([<UserName/>, <AddressForm/>, <DoctorPersonalInfo/>])
  //other stuff
  return <div style={{
    position: "relative",
    background: "white",
    border: "1px solid black",
    padding: "2rem",
    margin: "1rem",
    borderRadius: ".5rem",
    fontFamily: "Arial"
  }}
  >
    <form>
      <div style={{ position: "absolute", top: ".5rem", right: ".5rem"}} >
        {currentStepIndex + 1} / {steps.length} 
      </div>
      {step}
      <div 
        style={{marginTop: "1rem", display: "flex", gap: ".5rem", justifyContent: "flex-end"

        }}
      >
        {!isFirstStep && <button type="button" onClick={back}>Back</button>}
        <button type="button" onClick={next}>
          {isLastStep ? "Finish" : "Next"}
        </button>
      </div>
    </form>
  </div>
}


export default App;
