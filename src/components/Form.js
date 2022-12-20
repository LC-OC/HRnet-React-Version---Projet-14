import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import DatePickerFormBirthDate from "./DatePickerFormBirthDate";
import DropdownDepartment from "./DropdownDepartment";
import DropdownStates from "./DropdownStates";
import { addEmployee } from "../redux/employee.slice";
import DatePickerFormStartDate from "./DatePickerFormStartDate";
import states from "states-us";
import { departments } from "../mock/mockDepartment";
import Modal from "@lc-oc/modal-oc/dist/Modal";

const Form = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [startDate, setStartDate] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipcode] = useState("");
  const [errorForm, setErrorForm] = useState(null);

  // Modal
  const [openModal, setOpenModal] = useState();
  const title = "Employee Created !";
  const textButton = "Close Modal";
  const closeModalOnClick = () => {
    setOpenModal(false);
    navigate("/employee-list");
  };

  // get States
  const statesName = [];
  states.forEach((state) => {
    statesName.push(state.name);
  });
  const valueStates = { value: statesName[0], label: statesName[0] };
  const [state, setState] = useState(valueStates);
  //
  // get department
  const valueDepartment = { value: departments[0], label: departments[0] };
  const [department, setDepartment] = useState(valueDepartment);
  //
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const employeeData = {
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth.toLocaleDateString("en-US"),
      startDate: startDate.toLocaleDateString("en-US"),
      street: street,
      city: city,
      zipCode: zipCode,
      state: state.value,
      department: department.value,
    };

    if (
      firstName.length < 3 ||
      lastName.length < 3 ||
      street.length === 0 ||
      city.length === 0 ||
      zipCode.length < 5
    ) {
      setErrorForm("Form invalid.Try again !");
    } else {
      console.log(employeeData);
      dispatch(addEmployee(employeeData));
      setErrorForm(null);
      setOpenModal(true);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleOnSubmit}>
        <label>First Name</label>
        <input id="first-name" onChange={(e) => setFirstName(e.target.value)} />
        <label>Last Name</label>
        <input
          type="text"
          id="last-name"
          onChange={(e) => setLastName(e.target.value)}
        />
        <DatePickerFormBirthDate getDateOfBirth={setDateOfBirth} />{" "}
        <DatePickerFormStartDate getStartDate={setStartDate} />
        <fieldset className="address">
          <legend>Address</legend>

          <label>Street</label>
          <input
            id="street"
            type="text"
            onChange={(e) => setStreet(e.target.value)}
          />

          <label>City</label>
          <input
            id="city"
            type="text"
            onChange={(e) => setCity(e.target.value)}
          />
          <DropdownStates getState={setState} statesName={statesName} />

          <label>Zip Code</label>
          <input
            id="zip-code"
            type="text"
            onChange={(e) => setZipcode(e.target.value)}
          />
        </fieldset>
        <label>Department</label>
        <DropdownDepartment
          getDepartment={setDepartment}
          departments={departments}
        />
        {errorForm && <p>{errorForm}</p>}
        <button type="submit" className="button-submit">
          Click on it
        </button>
      </form>
      <Modal
        openModal={openModal}
        closeModal={closeModalOnClick}
        title={title}
        textButton={textButton}
      />
    </div>
  );
};

export default Form;
