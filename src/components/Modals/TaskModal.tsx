import { X } from "phosphor-react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import cx from "classnames";
import { useEffect } from "react";
import { Tag, useTags } from "../../contexts/TagsContext";
import { Task, useTasks } from "../../contexts/TasksContext";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";

interface TaskModalProps {
  isVisible: boolean;
  closeModal: () => void;
  mode: "create" | "edit";
  task?: Task;
}

type Inputs = {
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  tags: Tag[];
  completed: boolean;
  id: string;
};

const CreateTaskSchema = yup.object().shape({
  title: yup
    .string()
    .required("Título é obrigatório")
    .min(5, "No mínimo 5 caracteres")
    .max(12, "No máximo 12 caracteres"),
  description: yup
    .string()
    .required("Descrição é obrigatório")
    .min(10, "No mínimo 10 caracteres"),
  date: yup
    .string()
    .required("Data é obrigatório")
    .transform((value) => value && format(new Date(value), "MM/dd/yyyy")),
  time: yup.string(),
  duration: yup.string(),
  tags: yup.array(),
  completed: yup.boolean().default(false),
  id: yup.string().uuid().default(uuidv4()),
});

export const TaskModal = ({
  isVisible,
  closeModal,
  mode,
  task,
}: TaskModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<Inputs>({
    resolver: yupResolver(CreateTaskSchema),
  });

  const { tags } = useTags();
  const { createTask } = useTasks();
  const { onChange } = register("tags");

  const loadTags = (): Tag[] => {
    let taskTags: Tag[] = [];

    tags?.forEach((tag, id) => {
      const taskTag = task?.tags[id];
      if (tag.id === (taskTag as unknown as string)) taskTags.push(tag);
    });

    return taskTags;
  };

  useEffect(() => {
    if (mode === "create") {
      reset();
    }

    if (mode === "edit") {
      setValue("title", task?.title!);
      setValue("description", task?.description!);
      setValue("date", format(new Date(task?.date!), "yyyy-MM-dd"));
      setValue("time", task?.time!);
      setValue("duration", task?.duration!);
      setValue("tags", loadTags());
    }
  }, [mode, task]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (mode === "create") {
      createTask(data);
    }

    if (mode === "edit") {
      console.log(data);
    }

    reset();
  };

  const handleCloseModal = () => {
    if (mode === "create") {
      reset();
      closeModal();
    }

    if (mode === "edit") {
      closeModal();
    }
  };

  return (
    <div
      className={cx(
        "inset-0 bg-overlay w-full h-full flex items-center justify-center",
        {
          absolute: isVisible,
          hidden: !isVisible,
        }
      )}
      onClick={handleCloseModal}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit(onSubmit)}
        className="shadow-md w-full max-w-[500px] bg-neutral-50 z-10 rounded-md py-6 px-4"
      >
        <header className="flex justify-between items-center">
          <strong className="text-2xl">
            {mode === "create" ? "Criar" : "Editar"} Tarefa
          </strong>

          <X
            onClick={handleCloseModal}
            size={22}
            className="hover:scale-110 cursor-pointer"
          />
        </header>

        <main className="mt-6 flex flex-col gap-6">
          <div>
            <label htmlFor="title" className="text-lg font-semibold">
              Título
            </label>
            {errors.title && (
              <span className="block text-sm text-red-500">
                {errors.title?.message}
              </span>
            )}
            <input
              {...register("title")}
              type="text"
              id="title"
              placeholder="Insira o título da sua tarefa"
              className="block bg-neutral-200 px-3 py-2 rounded-sm w-full"
            />
          </div>

          <div>
            <label htmlFor="title" className="text-lg font-semibold">
              Descrição
            </label>
            <span className="block text-sm text-red-500">
              {errors.description?.message}
            </span>
            <textarea
              {...register("description")}
              placeholder="Insira a descrição da sua tarefa"
              className="block w-full rounded-sm p-2 bg-neutral-200 h-[100px]"
            />
          </div>

          <div className="flex justify-around sm:justify-between px-1">
            <div>
              <label htmlFor="title" className="text-lg font-semibold">
                Data
              </label>
              <span className="block text-sm text-red-500">
                {errors.date?.message}
              </span>
              <input
                {...register("date")}
                type="date"
                className="bg-neutral-200 p-1 rounded-sm block"
              />
            </div>

            <div className="sm:flex gap-12">
              <div>
                <label htmlFor="title" className="text-lg font-semibold">
                  Horário
                </label>
                <input
                  {...register("time")}
                  type="time"
                  className="block bg-neutral-200 rounded-sm p-1 "
                />
              </div>
              <div>
                <label htmlFor="title" className="text-lg font-semibold">
                  Duração
                </label>
                <input
                  {...register("duration")}
                  type="time"
                  className="block bg-neutral-200 rounded-sm p-1 "
                />
              </div>
            </div>
          </div>

          <div>
            <span className="text-lg font-semibold">Tags</span>
            <div className="bg-neutral-200 p-4 flex flex-wrap justify-start gap-8 rounded-sm">
              {tags?.length ? (
                tags.map(({ color, name, id }) => (
                  <div key={id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={id}
                      {...register("tags")}
                      onChange={(e) => {
                        e.target.value = e.target.id;
                        onChange(e);
                      }}
                      defaultChecked={
                        mode !== "create" && tags.some((tag) => tag.id === id)
                      }
                      className="w-4 h-4 mr-1 cursor-pointer"
                    />
                    <label
                      htmlFor={id}
                      className={`bg-${color} px-2 py-[2px] cursor-pointer transition-transform rounded-sm uppercase text-sm font-bold opacity-90`}
                    >
                      {name}
                    </label>
                  </div>
                ))
              ) : (
                <p className="block mx-auto text-lg opacity-60 font-semibold">
                  Nao há nenhuma tag criada =(
                </p>
              )}
            </div>
          </div>
        </main>

        <footer className="flex items-center justify-center mt-10">
          <button
            type="submit"
            className=" bg-blue-500 text-neutral-50 transition-colors rounded-sm py-3 w-[70%] font-bold text-xl"
          >
            {mode === "create" ? "Criar" : "Salvar"}
          </button>
        </footer>
      </form>
    </div>
  );
};
