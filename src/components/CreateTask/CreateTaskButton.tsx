import { useTasks } from "../../contexts/TasksContext";

export const CreateTaskButton = () => {
  const { openCreateTaskModal } = useTasks();

  return (
    <button
      onClick={openCreateTaskModal}
      className="border-2  w-[110px] font-semibold hover:bg-blue-400 hover:text-neutral-50 transition-colors rounded-sm text-blue-500 mr-4 border-blue-400 p-2"
    >
      Criar Tarefa
    </button>
  );
};
