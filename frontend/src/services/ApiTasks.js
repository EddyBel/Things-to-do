import Configs from "../web.config";

/**
 * Gets a list of tasks from the API specified in Configs.API.
 * @return {Promise} Promise that resolves with a list of tasks.
 */
export const getTasks = () =>
  fetch(`${Configs.API}/tasks`)
    .then((respose) => respose.json())
    .then((response) => response);

/**
 * Sends a task to the API specified in Configs.API.
 * @param {Object} data - The data for the task to be sent.
 * @return {Promise} Promise that resolves with a success or error message.
 */
export const sendTask = (data) =>
  fetch(`${Configs.API}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((response) => (!response.msg ? response.message : response.msg));

/**
 * Makes a GET request to the '/about' route of the API.
 * @return {Promise} Promise that resolves with the server response.
 */
export const getAbout = () =>
  fetch(`${Configs.API}/about`)
    .then((response) => response.json())
    .then((response) => response);

export const updateTask = (data) =>
  fetch(`${Configs.API}/tasks`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((response) => response);

export const deleteTask = (data) =>
  fetch(`${Configs.API}/tasks`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((response) => response);
