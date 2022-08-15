import {
  Alarm,
  Calendar,
  Timer,
  PencilSimpleLine,
  Check,
  Checks,
  X,
} from "phosphor-react";
import cx from "classnames";
import { Tag, useTags } from "../contexts/TagsContext";
import { useTasks } from "../contexts/TasksContext";

export interface TaskProps {
  task: {
    title: string;
    description: string;
    date: string;
    time: string;
    duration: string;
    tags: Tag[];
    completed: boolean;
    id: string;
  };
}

export const Task = ({ task }: TaskProps) => {
  const { openEditTaskModal, handleToggleTaskCompletion } = useTasks();
  const { tags } = useTags();

  const loadTags = (): Tag[] => {
    let taskTags: Tag[] = [];

    tags?.forEach((tag, id) => {
      const taskTag = task?.tags[id];
      if (tag.id === (taskTag as unknown as string)) taskTags.push(tag);
    });

    return taskTags;
  };

  return (
    <div
      className={cx(
        "group relative hover:-translate-y-1 transition-transform cursor-pointer flex border-2 border-neutral-100 p-2 w-full max-w-[400px] rounded-sm shadow-sm bg-neutral-200",
        {
          "border-green-100 border-2 bg-green-200": task.completed,
        }
      )}
    >
      <div className="flex-1">
        <strong className="font-semibold text-2xl">{task.title}</strong>
        <span className="text-lg flex items-center gap-1">
          <Calendar size={18} /> {task.date}
        </span>
        <div className="flex gap-8">
          <span className="flex items-center">
            {!!task.time && (
              <>
                <Alarm size={16} />
                {task.time}
              </>
            )}
          </span>
          <span className="flex items-center">
            {!!task.duration && (
              <>
                <Timer />
                {task.duration}
              </>
            )}
          </span>
        </div>
        <p className="w-[90%] mt-4 leading-tight opacity-70">
          {task.description}
        </p>
      </div>

      <div className="flex flex-col gap-1">
        {loadTags().map((tag, id) => (
          <span
            key={id}
            className={`text-sm bg-${tag.color} px-2 py-[2px] cursor-pointer transition-transform rounded-sm uppercase text-sm font-bold opacity-90`}
          >
            {tag.name}
          </span>
        ))}
      </div>

      {!task.completed && (
        <div className="hidden absolute right-[100px] sm:right-[120px] -top-5 md:right-[140px] group-hover:flex gap-4 items-center sm:-top-3">
          <PencilSimpleLine
            onClick={() => openEditTaskModal(task)}
            size={32}
            weight="duotone"
            className="bg-neutral-200 p-1 rounded-sm shadow-sm hover:-translate-y-1 transition-transform border-2 border-neutral-100"
          />

          <Check
            onClick={() => handleToggleTaskCompletion(task.id)}
            size={32}
            weight="duotone"
            className="bg-green-200 text-green-900 border-green-100 p-1 rounded-sm shadow-sm hover:-translate-y-1 transition-transform border-2"
          />

          <X
            size={32}
            weight="duotone"
            className="bg-red-200 border-red-100 text-red-500 p-1 rounded-sm shadow-sm hover:-translate-y-1 transition-transform border-2"
          />
        </div>
      )}
      {task.completed && (
        <Checks
          size={32}
          className="absolute right-[120px] md:right-[160px] bg-green-200 hover:bg-green-300 border-green-200 -top-2 p-1 rounded-sm shadow-sm hover:-translate-y-1 transition-transform border-2 "
        />
      )}
    </div>
  );
};
