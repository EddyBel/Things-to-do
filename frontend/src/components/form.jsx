import React, { useState } from "react";
import { sendTask, getTasks } from "../services/ApiTasks";

export function Form({ setTasksState }) {
  /** Name of the task. @type {string|null} */
  const [taskName, setTaskName] = useState(null);
  /** Level of the task. @type {string|null} */
  const [taskLevel, setTaksLevel] = useState(null);
  /** Date of the task. @type {Object|null} */
  const [taskDate, setTaksDate] = useState(null);
  /** Indicates if there is an error in the task name input. @type {boolean} */
  const [errorInput, setInputError] = useState(false);
  /** Indicates if there is an error in the task date input. @type {boolean} */
  const [errorDate, setDateError] = useState(false);

  /**
   * Changes the task name in the application's state.
   * @param {Object} event - Input change event.
   */
  const onChangeHanddleNameTask = (event) => setTaskName(event.target.value);

  const onChangeDate = (event) => {
    const date = new Date();
    const initialDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
    const deadline = event.target.value;
    setTaksDate({
      initialDate: initialDate,
      deadline: deadline,
    });
  };

  /**
   * Selects the task level in the select element.
   * @return {string} Selected value of the select element.
   */
  const selectLevelOption = () => {
    const select = document.getElementById("select-level");
    let value = select.value;
    setTaksLevel(value);
    return value;
  };

  /**
   * Sends the task to the server and updates the task list in the application's state.
   * @param {Object} e - Form submission event.
   */
  const sendData = async (e) => {
    e.preventDefault();
    if (!taskName) setInputError(true);
    else if (!taskDate) setDateError(true);
    else {
      setInputError(false);
      setDateError(false);
      let level = !taskLevel ? selectLevelOption() : taskLevel;
      await sendTask({
        name: taskName,
        level: level,
        initialDate: taskDate.initialDate,
        deadline: taskDate.deadline,
      });
      getTasks().then((response) => setTasksState(response.data));
      resetStates();
    }
  };

  /** Resets the task state and task level state. */
  const resetStates = () => {
    setTaskName(null);
    setTaksLevel(null);
    setTaksDate(null);
    document.getElementById("nameTask").value = "";
    document.getElementById("dateTask").value = "";
  };

  return (
    <form className="w-50 m-5">
      <fieldset>
        <legend>ADD A NEW TASK</legend>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1" className="form-label mt-4">
            What task will you record?
          </label>
          {errorInput ? (
            <>
              <input
                type="text"
                placeholder="Place the task to register"
                className="form-control is-invalid"
                id="inputInvalid"
                onChange={onChangeHanddleNameTask}
              />
              <div className="invalid-feedback">
                You need to fill this name field
              </div>
            </>
          ) : (
            <input
              type="text"
              className="form-control"
              id="nameTask"
              aria-describedby="emailHelp"
              placeholder="Enter your task"
              onChange={onChangeHanddleNameTask}
            />
          )}
          <small id="emailHelp" className="form-text text-muted">
            You have a maximum of 100 characters
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleSelect1" className="form-label mt-4">
            Importance level
          </label>
          <select
            className="form-select"
            id="select-level"
            onChange={selectLevelOption}
          >
            <option>Unimportant</option>
            <option>Important</option>
            <option>Very important</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="exampleSelect1" className="form-label mt-4">
            What is the due date of the task?
          </label>
          {errorDate ? (
            <input
              type="date"
              id="dateTask"
              className="form-control is-invalid"
              onChange={onChangeDate}
            />
          ) : (
            <input
              type="date"
              id="dateTask"
              className="form-control"
              onChange={onChangeDate}
            />
          )}
          <small id="emailHelp" className="form-text text-muted">
            The current date will be taken as the start date.
          </small>
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-4 w-100"
          onClick={sendData}
        >
          Submit
        </button>
      </fieldset>
    </form>
  );
}
