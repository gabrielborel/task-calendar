import { CreateTagButton } from "../components/CreateTag/CreateTagButton";
import { CreateTaskButton } from "../components/CreateTask/CreateTaskButton";
import { Task } from "../components/Task";
import { useTags } from "../contexts/TagsContext";
import { useTasks } from "../contexts/TasksContext";

export default function App() {
  const { tags } = useTags();

  const { tasks } = useTasks();

  return (
    <section className="mt-12">
      <CreateTaskButton />

      <CreateTagButton />

      <div className="w-full h-[1px] static bg-neutral-300 my-6 opacity-50" />

      <div className="flex flex-wrap justify-evenly gap-4 md:gap-10">
        {tasks?.map((task, id) => (
          <Task task={task} key={id} />
        ))}
      </div>
    </section>
  );
}
