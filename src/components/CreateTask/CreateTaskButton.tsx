import { useState } from "react";
import { CreateTaskModal } from "./CreateTaskModal";

export const CreateTaskButton = () => {
  const [isCreateTaskModalOpen, setCreateTaskModalStatus] = useState(false);

  return (
    <>
      <button
        onClick={() => setCreateTaskModalStatus(true)}
        className="border-2  w-[110px] hover:bg-blue-400 hover:text-neutral-50 transition-colors rounded-sm text-blue-600 mr-4 border-blue-400 p-2"
      >
        Criar Tarefa
      </button>

      <CreateTaskModal
        isVisible={isCreateTaskModalOpen}
        setCreateTaskModalStatus={setCreateTaskModalStatus}
      />
    </>
  );
};
