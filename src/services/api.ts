import axios from "axios";

export const api = axios.create({
  baseURL: "https://task-calendar-api.herokuapp.com/",
});
