import { useTags } from "../../contexts/TagsContext";

export const CreateTagButton = () => {
  const { openCreateTagModal } = useTags();

  return (
    <button
      onClick={openCreateTagModal}
      className="rounded-sm w-[110px] font-semibold hover:bg-neutral-50 hover:text-blue-600 transition-colors bg-blue-400 border-2 border-blue-400 text-neutral-50 p-2"
    >
      Criar Tag
    </button>
  );
};
