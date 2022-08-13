import { CreateTagButton } from "../components/CreateTag/CreateTagButton";
import { CreateTaskButton } from "../components/CreateTask/CreateTaskButton";
import { Header } from "../components/Header";
import { Alarm, Timer, Calendar } from "phosphor-react";

const tasks = [
  {
    title: "Estudar",
    description: "Estudar Typescript para arrumar um emprego",
    date: "25/09/2000",
    time: "19:00",
    duration: "05:00",
    tags: [
      {
        title: "mercado",
        color: "red-400",
      },
      {
        title: "festa",
        color: "blue-400",
      },
      {
        title: "estudos",
        color: "yellow-400",
      },
    ],
  },
  {
    title: "Estudar",
    description: "Estudar Typescript para arrumar um emprego",
    date: "25/09/2000",
    time: "19:00",
    duration: "05:00",
    tags: [
      {
        title: "mercado",
        color: "red-400",
      },
      {
        title: "festa",
        color: "blue-400",
      },
      {
        title: "estudos",
        color: "yellow-400",
      },
    ],
  },
  {
    title: "Estudar",
    description: "Estudar Typescript para arrumar um emprego",
    date: "25/09/2000",
    time: "19:00",
    duration: "05:00",
    tags: [
      {
        title: "mercado",
        color: "red-400",
      },
      {
        title: "festa",
        color: "blue-400",
      },
      {
        title: "estudos",
        color: "yellow-400",
      },
    ],
  },
  {
    title: "Estudar",
    description: "Estudar Typescript para arrumar um emprego",
    date: "25/09/2000",
    time: "19:00",
    duration: "05:00",
    tags: [
      {
        title: "mercado",
        color: "red-400",
      },
      {
        title: "festa",
        color: "blue-400",
      },
      {
        title: "estudos",
        color: "yellow-400",
      },
    ],
  },
  {
    title: "Estudar",
    description: "Estudar Typescript para arrumar um emprego",
    date: "25/09/2000",
    time: "19:00",
    duration: "05:00",
    tags: [
      {
        title: "mercado",
        color: "red-400",
      },
      {
        title: "festa",
        color: "blue-400",
      },
      {
        title: "estudos",
        color: "yellow-400",
      },
    ],
  },
  {
    title: "Estudar",
    description: "Estudar Typescript para arrumar um emprego",
    date: "25/09/2000",
    time: "19:00",
    duration: "05:00",
    tags: [
      {
        title: "mercado",
        color: "red-400",
      },
      {
        title: "festa",
        color: "blue-400",
      },
      {
        title: "estudos",
        color: "yellow-400",
      },
    ],
  },
  {
    title: "Estudar",
    description: "Estudar Typescript para arrumar um emprego",
    date: "25/09/2000",
    time: "19:00",
    duration: "05:00",
    tags: [
      {
        title: "mercado",
        color: "red-400",
      },
      {
        title: "festa",
        color: "blue-400",
      },
      {
        title: "estudos",
        color: "yellow-400",
      },
    ],
  },
  {
    title: "Estudar",
    description: "Estudar Typescript para arrumar um emprego",
    date: "25/09/2000",
    time: "19:00",
    duration: "05:00",
    tags: [
      {
        title: "mercado",
        color: "red-400",
      },
      {
        title: "festa",
        color: "blue-400",
      },
      {
        title: "estudos",
        color: "yellow-400",
      },
    ],
  },
  {
    title: "Estudar",
    description: "Estudar Typescript para arrumar um emprego",
    date: "25/09/2000",
    time: "19:00",
    duration: "05:00",
    tags: [
      {
        title: "mercado",
        color: "red-400",
      },
      {
        title: "festa",
        color: "blue-400",
      },
      {
        title: "estudos",
        color: "yellow-400",
      },
    ],
  },
];

export default function App() {
  return (
    <>
      <Header />

      <main className="max-w-[900px] mx-6 xl:mx-auto bg-neutral-50 mt-28 rounded-md py-12 px-6">
        <CreateTaskButton />

        <CreateTagButton />

        <div className="w-full h-[1px] static bg-neutral-300 my-6 opacity-50" />

        <div className="flex flex-wrap justify-evenly gap-10">
          {tasks.map((task) => (
            <div className="hover:-translate-y-1 transition-transform cursor-pointer flex border-2 border-neutral-100 p-2 w-full max-w-[400px] rounded-sm shadow-sm bg-neutral-200">
              <div className="flex-1">
                <strong className="font-semibold text-2xl">{task.title}</strong>
                <span className="text-lg flex items-center gap-1">
                  <Calendar size={18} /> {task.date}
                </span>
                <div className="flex gap-8">
                  <span className="flex items-center">
                    <Alarm size={16} />
                    {task.time}
                  </span>
                  <span className="flex items-center">
                    <Timer />
                    {task.duration}
                  </span>
                </div>
                <p className="w-[90%] mt-4 leading-tight opacity-70">
                  {task.description}
                </p>
              </div>

              <div className="flex flex-col gap-1">
                {task.tags.map((tag) => (
                  <span
                    className={`text-sm bg-${tag.color} px-2 py-[2px] cursor-pointer transition-transform rounded-sm uppercase text-sm font-bold opacity-90`}
                  >
                    {tag.title}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
