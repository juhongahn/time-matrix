export type Id = string | number;

export type Task = {
  id: Id;
  quadrantId: string;
  task: string;
  done: boolean;
  doneAt?: string;
  createdAt: string;
  deadLine?: string;
  assignedPerson?: string;
  status: string;
};

export type WarningState = {
  message: string;
  warning: boolean;
};