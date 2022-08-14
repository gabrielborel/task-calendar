import { Alarm, Calendar, Timer } from "phosphor-react";

interface TaskProps {
  task: {
    title: string;
    description: string;
    date: string;
    time: string;
    duration: string;
    tags: Array<{
      title: string;
      color: string;
    }>;
  };
}

export const Task = ({ task }: TaskProps) => {
  return (
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
        {task.tags.map((tag, id) => (
          <span
            key={id}
            className={`text-sm bg-${tag.color} px-2 py-[2px] cursor-pointer transition-transform rounded-sm uppercase text-sm font-bold opacity-90`}
          >
            {tag.title}
          </span>
        ))}
      </div>
    </div>
  );
};
