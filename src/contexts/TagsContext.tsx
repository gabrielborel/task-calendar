import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { TagModal } from "../components/Modals/TagModal";
import { api } from "../services/api";
import { useSession } from "./SessionContext";

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
  updateTag: (tagToUpdate: Tag) => void;
}

export interface Tag {
  _id?: string;
  name: string;
  color: string;
}

const TagsContext = createContext({} as ITagsContext);

export const TagsProvider = ({ children }: TagsProviderProps) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [isTagModalOpen, setTagModalStatus] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [tag, setTag] = useState<Tag>();
  const { session } = useSession();

  const loadTags = async () => {
    if (session) {
      const {
        data: { tags },
      } = await api.get(`/tags/${session?.user?.userId}`);

      setTags(tags);
    }
  };

  useEffect(() => {
    loadTags();
  }, [session]);

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
  const setTagToEdit = (tagToEdit: Tag) => setTag(tagToEdit);

  const updateTag = async (tagToUpdate: Tag) => {
    await api.put(`/tags/${tagToUpdate?._id}`, {
      name: tagToUpdate?.name,
      color: tagToUpdate?.color,
    });

    const updatedTags = tags?.map((previousTag) =>
      previousTag._id === tagToUpdate?._id
        ? { ...tag, name: tagToUpdate.name, color: tagToUpdate.color }
        : { ...previousTag }
    );

    setTags(updatedTags);
  };

  const createTag = async (tagToAdd: Tag) => {
    const {
      data: { newTag },
    } = await api.post("/tags", {
      name: tagToAdd.name,
      color: tagToAdd.color,
      userId: session?.user.userId,
    });

    setTags((tags) => [
      ...tags,
      { name: newTag.name, color: newTag.color, _id: newTag._id },
    ]);
  };

  const removeTag = async (tagToRemove: Tag) => {
    await api.delete(`/tags/${tagToRemove?._id}`);

    setTags((tags) => tags.filter((tag) => tag._id !== tagToRemove._id));
  };

  return (
    <TagsContext.Provider
      value={{
        tags,
        openEditTagModal,
        openCreateTagModal,
        setTagToEdit,
        createTag,
        removeTag,
        updateTag,
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
