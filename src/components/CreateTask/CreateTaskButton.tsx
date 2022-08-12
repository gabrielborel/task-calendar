import { CreateTaskModal } from "./CreateTaskModal";

export const CreateTaskButton = () => {
  return (
    <>
      <button className="border-2  w-[110px] hover:bg-blue-400 hover:text-neutral-50 transition-colors rounded-sm text-blue-600 mr-4 border-blue-400 p-2">
        Criar Tarefa
      </button>

      <CreateTaskModal />
    </>
  );
};
