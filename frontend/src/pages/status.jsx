import React, { useEffect, useState } from "react";
import { getTasks } from "../services/ApiTasks";

export function Status() {
  const [tasks, setTasks] = useState();

  useEffect(() => {
    getTasks().then((response) => setTasks(response.data));
  }, []);

  return (
    <div className="container mt-5">
      <h2>History of all tasks</h2>
      <p>Save all created tasks</p>
      <table className="table table-striped table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>LEVEL</th>
            <th>STATE</th>
          </tr>
        </thead>
        <tbody>
          {!tasks ? (
            <h1 className="m-auto" key={`loading-status`}>
              Loading ....
            </h1>
          ) : (
            tasks.map((task) => (
              <tr key={`item-status-${task.name}`}>
                <th>{task.id}</th>
                <th>{task.name}</th>
                <th>{task.level}</th>
                <th>{task.status ? "Complete" : "Incomplete"}</th>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
