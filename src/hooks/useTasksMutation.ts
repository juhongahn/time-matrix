import axios, { AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Task } from "@/types";

export type AddTask = Omit<Task, "id">;
export type FetcherType<T> = (data: T) => Promise<AxiosResponse<T>>;

const TASK_ADD_URL = import.meta.env.VITE_TASK_ADD_URL;
const TASK_DELETE_URL = import.meta.env.VITE_TASK_DELETE_URL;
const TASK_UPDATE_URL = import.meta.env.VITE_TASK_UPDATE_URL;
const TASK_DRAG_OVER_URL = import.meta.env.VITE_TASK_DRAG_OVER_URL;


export const addTaskFetcher = (newTask: AddTask) =>
  axios.post<AddTask>(TASK_ADD_URL, newTask);

export const updateTaskFetcher = (updatedTask: Task) =>
  axios.put(TASK_UPDATE_URL, updatedTask);

export const deleteTaskFetcher = (targetTask: Task) =>
  axios.delete(TASK_DELETE_URL, { data: targetTask });

export const dragEndFetcher = (tasks: Task[]) =>
  axios.post<Task[]>(TASK_DRAG_OVER_URL, tasks);

const useTasksMutation =<T>(fetcher: FetcherType<T>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetcher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export default useTasksMutation;
