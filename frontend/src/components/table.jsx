import React, { useEffect } from "react";
import { updateTask, deleteTask, getTasks } from "../services/ApiTasks";

const date = new Date();

export function Table({ tasks, setStateOfTasks }) {
  useEffect(() => {
    const nodeChecks = document.querySelectorAll(".checkform-task");
    nodeChecks.forEach((node, index) => {
      let status = tasks[index].status;
      node.checked = status;
    });
  }, [tasks]);

  const onChangeChecked = (e) => {
    const element = e.target;
    const parent = element.parentElement;

    const title = element.nextSibling.textContent;
    const id = parent.parentElement.parentElement.lastChild.textContent;

    updateElement({ name: title, id: id, status: element.checked }).then(
      (response) => console.log(response)
    );
  };

  const updateElement = (data) => updateTask(data).then((response) => response);

  const deleteTaskOnClick = async (e) => {
    const element = e.target;
    const parent = element.parentElement;
    const firstChild = parent.firstChild.firstChild;
    const lastChild = firstChild.lastChild;

    const name = lastChild.textContent;
    const id = parent.lastChild.textContent;

    await deleteTask({ name: name, id: id }).then((response) =>
      console.log(response)
    );
    getTasks().then((response) => setStateOfTasks(response.data));
  };

  return (
    <div className="w-50">
      <h4 className="w-100 text-bg-primary p-4">
        <span className="text-muted">TASKS</span>
      </h4>
      {/* <button
        type="submit"
        className="btn btn-primary mb-2 w-100"
        onClick={updateTasks}
      >
        Update
      </button> */}
      <ul className="list-group mb-3 w-100 h-250">
        {!tasks ? (
          <h1 className="m-auto">Loading....</h1>
        ) : tasks.length === 0 ? (
          <h1 className="m-auto">Write your first homework</h1>
        ) : (
          tasks.map((task) => {
            return (
              <li
                className="list-group-item d-flex justify-content-between lh-condensed align-items-center"
                key={`task-${task.name}-${Math.random()}`}
              >
                <div>
                  <div className="d-flex align-items-center gap-3">
                    <input
                      className="checkform-task form-check-input"
                      type="checkbox"
                      id="flexCheckChecked"
                      onChange={onChangeChecked}
                    />
                    <h6 className="my-0">{task.name}</h6>
                  </div>
                  <div className="d-flex align-content-center gap-2 mt-1">
                    <small className="text-muted">{task.level}</small>
                    <small className="text-muted">
                      {`${
                        !task.initialDate
                          ? date.getFullYear()
                          : task.initialDate
                      } -> ${
                        !task.deadline ? date.getFullYear() : task.deadline
                      }`}
                    </small>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={deleteTaskOnClick}
                >
                  Delete
                </button>
                <h6 className="id-task" style={{ display: "none" }}>
                  {task.id}
                </h6>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}

const MoreIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="512"
      height="512"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="2" r="2"></circle>
      <circle cx="12" cy="12" r="2"></circle>
      <circle cx="12" cy="22" r="2"></circle>
    </svg>
  );
};
