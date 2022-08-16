import { Task as TaskComp } from "../components/Task";
import { Tag, useTags } from "../contexts/TagsContext";
import { Task, useTasks } from "../contexts/TasksContext";
import { MagnifyingGlass, Check } from "phosphor-react";
import { useEffect, useState } from "react";
import { ITask } from "../interfaces/ITask";

export default function App() {
  const { openCreateTagModal, tags } = useTags();
  const { tasks, openCreateTaskModal } = useTasks();

  const [filteredTasks, setFilteredTasks] = useState<Task[]>();
  const [selectedTagsToFilter, setSelectedTagsToFilter] = useState<Tag[]>([]);
  const [tagsToFilter, setTagsToFilter] = useState<Tag[]>(tags);
  const [nameToSearch, setNameToSearch] = useState("");

  useEffect(() => {
    setTagsToFilter(tags);
  }, [tags, tasks]);

  useEffect(() => {
    const filteredByName = tasks.filter((task) =>
      task.title.toLowerCase().includes(nameToSearch)
    );

    const filteredByTag: ITask[] = [];
    tasks.forEach((task) => {
      task.tags.forEach((tag, id) => {
        if ((tag as unknown as string) === selectedTagsToFilter[id]?._id!) {
          console.log(task);
          filteredByTag.push(task);
          console.log(filteredByTag);
          return;
        }
      });
    });

    console.log(filteredByTag);

    const ultimateTest = [...new Set([...filteredByName, ...filteredByTag])];

    setFilteredTasks(ultimateTest);
  }, [nameToSearch, selectedTagsToFilter, tasks, tags]);

  return (
    <section className="mt-6">
      <div className="flex justify-between gap-24">
        <div className="h-[150px]">
          <button
            onClick={openCreateTaskModal}
            className="border-2  w-[110px] font-semibold hover:bg-blue-400 hover:text-neutral-50 transition-colors rounded-sm text-blue-500 mr-4 border-blue-400 p-2"
          >
            Criar Tarefa
          </button>

          <button
            onClick={openCreateTagModal}
            className="rounded-sm w-[110px] mr-4 font-semibold hover:bg-neutral-50 hover:text-blue-600 transition-colors bg-blue-400 border-2 border-blue-400 text-neutral-50 p-2"
          >
            Criar Tag
          </button>

          <div className="mt-6 relative">
            <span className="font-semibold text-xl">Filtar por nome</span>
            <div className="flex items-center">
              <MagnifyingGlass
                className="absolute opacity-30 left-3"
                weight="bold"
                size={16}
              />
              <input
                value={nameToSearch}
                onChange={(e) => setNameToSearch(e.target.value)}
                type="text"
                placeholder="Digite para buscar"
                className="bg-neutral-200 border-2 pl-10 border-neutral-100 px-3 py-[6px] block shadow-sm rounded-sm"
              />
            </div>
          </div>
        </div>

        <div className="hidden md:block flex-1 bg-neutral-200 px-2 py-1 rounded-sm shadow-sm border-2 border-neutral-100">
          <span className="font-semibold text-xl h-full">Filtrar por Tag</span>
          <div className="flex flex-wrap gap-6 p-3">
            {selectedTagsToFilter.map((tag) => (
              <span
                onClick={() => {
                  setTagsToFilter((prevTags) => [...prevTags, tag]);
                  setSelectedTagsToFilter((prevTags) =>
                    prevTags.filter((prevTag) => prevTag._id !== tag._id)
                  );
                }}
                key={tag._id}
                className={`bg-${tag.color} relative px-3 py-1 cursor-pointer transition-transform rounded-sm uppercase text-sm font-bold opacity-90`}
              >
                {tag.name}

                <Check
                  className="absolute inset-0 -top-3 -left-3 bg-green-200 border-2 border-green-100"
                  weight="bold"
                  size={22}
                />
              </span>
            ))}

            {tagsToFilter.map((tag) => (
              <span
                onClick={() => {
                  setSelectedTagsToFilter((prevTags) => [...prevTags, tag]);
                  setTagsToFilter((prevTags) =>
                    prevTags.filter((prevTag) => prevTag._id !== tag._id)
                  );
                }}
                key={tag._id}
                className={`bg-${tag.color} px-3 py-1 cursor-pointer transition-transform rounded-sm uppercase text-sm font-bold opacity-90`}
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full h-[1px] static bg-neutral-300 my-6 opacity-50" />

      <div className="flex flex-wrap justify-evenly gap-4 md:gap-10">
        {filteredTasks?.map((task, id) => (
          <TaskComp task={task} key={id} />
        ))}
      </div>
    </section>
  );
}
