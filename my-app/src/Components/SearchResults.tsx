import { FormWrapper } from "./FormWrapper";

export function WelcomeMessage({ next }: { next: () => void }) {
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
        <button type="button" onClick={next}>
          English
        </button>
        <button type="button" onClick={next}>
          Spanish
        </button>
      </div>
      <input required type="text" />
    </FormWrapper>
  );
}
