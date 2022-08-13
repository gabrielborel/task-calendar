import { useState } from "react";
import { CreateTagModal } from "./CreateTagModal";

export const CreateTagButton = () => {
  const [isCreateTagModalOpen, setCreateTagModalStatus] = useState(false);

  return (
    <>
      <button
        onClick={() => setCreateTagModalStatus(true)}
        className="rounded-sm w-[110px] hover:bg-neutral-50 hover:text-blue-600 transition-colors bg-blue-400 border-2 border-blue-400 text-neutral-50 p-2"
      >
        Criar Tag
      </button>

      <CreateTagModal
        isVisible={isCreateTagModalOpen}
        setCreateTagModalStatus={setCreateTagModalStatus}
      />
    </>
  );
};
