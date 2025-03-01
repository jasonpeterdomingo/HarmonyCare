import { FormWrapper } from "./FormWrapper"

export function UserName(){
    return(
      <FormWrapper title="Doctor Name">
        <label>First Name</label>
        <input autoFocus required type="text"/>
        <label>Last Name</label>
        <input required type="text"/>
      </FormWrapper>
    )
}

export function AddressForm(){
    return(
      <FormWrapper title="Doctor's Office Address">
        <label>Street</label>
        <input autoFocus required type="text"/>
        <label>City</label>
        <input required type="text"/>
        <label>State</label>
        <input required type="text"/>
        <label>Zip</label>
        <input required type="text"/>
      </FormWrapper>
    )
}

export function DoctorPersonalInfo(){
    return(
      <FormWrapper title="Prefered Doctor Info">
        <label>Age</label>
        <input autoFocus required min={1} type="number"/>
        <label>Prefered Gender??</label>
        <input required type="checkbox"/>
        <label>Preferred Language</label>
        <input required type="text"/>
        </FormWrapper>
    )
}