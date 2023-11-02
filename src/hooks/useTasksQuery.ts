import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { Task } from "@/types";

const QUERY_KEY = ["tasks"];
const TASK_GET_URL = import.meta.env.VITE_TASK_GET_URL;

const fetcher = () => axios.get<Task[]>(TASK_GET_URL).then(({ data }) => data);
const useTasksQuery = () => {
  return useQuery({ queryKey: QUERY_KEY, queryFn: fetcher });
};

export default useTasksQuery;
