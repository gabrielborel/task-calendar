import { Tag } from "../contexts/TagsContext";

export interface ITask {
  _id?: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  tags: Tag[];
  completed: boolean;
}
