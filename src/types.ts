export type Id = string | number;

export type Task = {
  id: Id;
  quadrantId: string;
  task: string;
  done: boolean;
  createdAt: Date;
  deadLine: Date | null;
  assignedPerson: string | null;
};

export type WarningState = {
  message: string;
  warning: boolean;
};