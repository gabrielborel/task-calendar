import { createContext, ReactNode, useContext, useState } from "react";
import { TagModal } from "../components/Modals/TagModal";

interface TagsProviderProps {
  children: ReactNode;
}

interface ITagsContext {
  tags: Tag[];
  openCreateTagModal: () => void;
  openEditTagModal: (tagToEdit: Tag) => void;
  closeModal: () => void;
  createTag: (tagToAdd: Tag) => void;
  setTagToEdit: (tagToEdit: Tag) => void;
  removeTag: (tagToRemove: Tag) => void;
  updateTags: (updatedTags: Tag[]) => void;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}

const TagsContext = createContext({} as ITagsContext);

export const TagsProvider = ({ children }: TagsProviderProps) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [isTagModalOpen, setTagModalStatus] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [tag, setTag] = useState<Tag>();

  const openCreateTagModal = () => {
    setTagModalStatus(true);
    setMode("create");
  };

  const openEditTagModal = (tagToEdit: Tag) => {
    setTagModalStatus(true);
    setTag(tagToEdit);
    setMode("edit");
  };

  const closeModal = () => setTagModalStatus(false);
  const updateTags = (updatedTags: Tag[]) => setTags(updatedTags);
  const setTagToEdit = (tagToEdit: Tag) => setTag(tagToEdit);
  const createTag = (tagToAdd: Tag) => setTags((tags) => [...tags, tagToAdd]);
  const removeTag = (tagToRemove: Tag) =>
    setTags((tags) => tags.filter((tag) => tag.id !== tagToRemove.id));

  return (
    <TagsContext.Provider
      value={{
        tags,
        openEditTagModal,
        openCreateTagModal,
        setTagToEdit,
        createTag,
        removeTag,
        updateTags,
        closeModal,
      }}
    >
      {children}
      <TagModal
        isVisible={isTagModalOpen}
        closeModal={closeModal}
        mode={mode}
        tag={tag}
      />
    </TagsContext.Provider>
  );
};

export const useTags = () => useContext(TagsContext);
