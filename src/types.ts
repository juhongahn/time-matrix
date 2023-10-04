export type Id = string | number;

export type Task = {
  id: Id;
  quadrantId: number;
  task: string;
  done: boolean;
};