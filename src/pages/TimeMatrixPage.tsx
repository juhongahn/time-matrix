import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TaskItemActionsProvider } from "@/contexts/TaskItemActionsContext";
import { TaskDndProvider } from "@/contexts/TaskDndContext";
import { TaskInputProvider } from "@/contexts/TaskInputContext";
import { TasksProvider } from "@/contexts/TasksContext";

import Board from "@/components/board/Board";

const queryClient = new QueryClient();

const TimeMatrixPage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TasksProvider>
        <TaskItemActionsProvider>
          <TaskInputProvider>
            <TaskDndProvider>
              <Board />
            </TaskDndProvider>
          </TaskInputProvider>
        </TaskItemActionsProvider>
      </TasksProvider>
    </QueryClientProvider>
  );
};

export default TimeMatrixPage;
