import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { Task } from "@/types";

export interface GroupedTasksByDoneDate {
  doneAt: string;
  tasks: Task[];
  count: number;
}

const DONE_TASK_QUERY_KEY = ["doneTasks"];
const DONE_TASKS_URL = import.meta.env.VITE_DONE_TASKS_URL;

export const doneTasksfetcher = () =>
  axios.get<GroupedTasksByDoneDate[]>(DONE_TASKS_URL).then(({ data }) => data);

const useDoneTasksQuery = () => {
  return useQuery({ queryKey: DONE_TASK_QUERY_KEY, queryFn: doneTasksfetcher });
};

export default useDoneTasksQuery;
