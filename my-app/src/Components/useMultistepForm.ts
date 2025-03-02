import { ReactElement, useState } from "react";

//This is a hook
export function useMultistepForm(steps: ReactElement[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  function next() {
    setCurrentStepIndex((i) => {
      return i >= steps.length - 1 ? i : i + 1; //increment unless you are at the last step
    });
  }

  function back() {
    setCurrentStepIndex((i) => {
      return i <= 0 ? i : i - 1; //decrement unless you are at the first step
    });
  }

  function goTo(index: number) {
    setCurrentStepIndex(index);
  }
  return {
    currentStepIndex,
    step: steps[currentStepIndex], //step is the current step
    steps,
    isFirstStep: currentStepIndex === 1, // starting from first question not index 0
    isLastStep: currentStepIndex === steps.length - 1,
    goTo,
    next,
    back,
  };
}
