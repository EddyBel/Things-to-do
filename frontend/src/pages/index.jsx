import React, { useEffect, useState } from "react";
import { Form, Table } from "../components/index";
import { getTasks } from "../services/ApiTasks";

export function Index() {
  const [tasks, setTaks] = useState();

  useEffect(() => {
    setTaks(null);
    getTasks().then((response) => setTaks(response.data));
  }, []);

  // useEffect(() => {
  //   console.log(tasks);
  // }, [tasks]);

  return (
    <div className="d-flex flex-row g-4 p-3">
      <Form setTasksState={setTaks} />
      <Table tasks={tasks} setStateOfTasks={setTaks} />
    </div>
  );
}
